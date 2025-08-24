import iauConstellations from "./data/iau-constellations";
import { loadScrapped, registerIAUAbbr } from "./writers/scrapped";
import { registerStars } from "./writers/raw-stars";
import axios from "axios";
import * as cheerio from "cheerio";
import headers from "./req-headers";

function iauConstellationsNameAndAbbr() {
  return iauConstellations.map((c) => {
    return {
      name: c.name,
      abbr: c.abbr.iau,
    };
  });
}

function listOfStarsWikipediaUrls(iauConstellationsNameAndAbbr: { name: string; abbr: string }[]) {
  let urls: Record<string, string> = {};

  for (const c of iauConstellationsNameAndAbbr) {
    urls[c.abbr] = `https://en.wikipedia.org/wiki/List_of_stars_in_${c.name.replace(" ", "_")}`;
  }

  return urls;
}

async function fetchStarsOfConstellation() {
  const constellations = iauConstellationsNameAndAbbr();
  const urls: Record<string, string> = listOfStarsWikipediaUrls(constellations);
  const TAKE: number = 2;

  const scrapped = loadScrapped();
  const toScrape = Object.entries(urls)
    .filter(([abbr]) => !scrapped.includes(abbr))
    .slice(0, TAKE);
  console.log("URLs to scrape:", toScrape);

  const responses = await Promise.all(
    toScrape.map(async ([abbr, url]) => {
      const resp = await axios.get(url, { headers });
      return { abbr, resp };
    }),
  );

  for (const { abbr, resp } of responses) {
    const $ = cheerio.load(resp.data);
    const table = $("table.wikitable.sortable");

    let tableHeaders: string[] = [];
    table.find("th").each((_, th) => {
      const link = $(th).find("a").first();
      if (link.length) {
        tableHeaders.push(link.text().trim());
      } else {
        tableHeaders.push($(th).text().trim());
      }
    });

    const essentialTableHeaders: string[] = ["Name", "B", "RA", "Dec", "vis.mag."];
    let essentialTableHeaderIndexes: Record<string, number> = {};
    for (let i = 0; i < tableHeaders.length; i++) {
      if (essentialTableHeaders.includes(tableHeaders[i])) {
        essentialTableHeaderIndexes[tableHeaders[i]] = i;
      }
    }

    console.log("tableHeaders:", tableHeaders);
    console.log("essentialTableHeaderIndexes:", essentialTableHeaderIndexes);

    let stars: string[][] = [];
    table
      .find("tbody > tr")
      .slice(1)
      .filter((_, row) => {
        const columns = $(row).find("td");
        return columns.length > 2;
      })
      .each((_, row) => {
        const columns = $(row).find("td");
        const rowData = columns
          .map((i, col) => {
            const cell = $(col);

            if (i === 0) {
              const link = cell.find("a").first();
              if (link.length) {
                return link.text().trim();
              }
            }
            return cell.text().trim();
          })
          .map((i, value) => {
            value = value.split("[")[0];
            value = value.replace("−", "-");
            return value;
          })
          .get();

        stars.push(
          rowData.filter((_, index) => {
            return essentialTableHeaderIndexes[tableHeaders[index]] !== undefined;
          }),
        );
      });

    stars = stars.filter((row) => {
      return row[essentialTableHeaderIndexes["B"]] !== "";
    });
    console.log("stars:", stars.length);

    registerStars(abbr, stars);
    registerIAUAbbr([abbr]);
  }
}

async function main() {
  await fetchStarsOfConstellation();
}

main();
