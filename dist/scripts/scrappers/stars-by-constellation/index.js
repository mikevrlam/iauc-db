"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const iau_constellations_1 = __importDefault(require("./data/iau-constellations"));
const scrapped_1 = require("./writers/scrapped");
const raw_stars_1 = require("./writers/raw-stars");
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const req_headers_1 = __importDefault(require("./req-headers"));
function iauConstellationsNameAndAbbr() {
    return iau_constellations_1.default.map((c) => {
        return {
            name: c.name,
            abbr: c.abbr.iau,
        };
    });
}
function listOfStarsWikipediaUrls(iauConstellationsNameAndAbbr) {
    let urls = {};
    for (const c of iauConstellationsNameAndAbbr) {
        urls[c.abbr] = `https://en.wikipedia.org/wiki/List_of_stars_in_${c.name.replace(" ", "_")}`;
    }
    return urls;
}
async function fetchStarsOfConstellation() {
    const constellations = iauConstellationsNameAndAbbr();
    const urls = listOfStarsWikipediaUrls(constellations);
    const TAKE = 2;
    const scrapped = (0, scrapped_1.loadScrapped)();
    const toScrape = Object.entries(urls)
        .filter(([abbr]) => !scrapped.includes(abbr))
        .slice(0, TAKE);
    console.log("URLs to scrape:", toScrape);
    const responses = await Promise.all(toScrape.map(async ([abbr, url]) => {
        const resp = await axios_1.default.get(url, { headers: req_headers_1.default });
        return { abbr, resp };
    }));
    for (const { abbr, resp } of responses) {
        const $ = cheerio.load(resp.data);
        const table = $("table.wikitable.sortable");
        let tableHeaders = [];
        table.find("th").each((_, th) => {
            const link = $(th).find("a").first();
            if (link.length) {
                tableHeaders.push(link.text().trim());
            }
            else {
                tableHeaders.push($(th).text().trim());
            }
        });
        const essentialTableHeaders = ["Name", "B", "RA", "Dec", "vis.mag."];
        let essentialTableHeaderIndexes = {};
        for (let i = 0; i < tableHeaders.length; i++) {
            if (essentialTableHeaders.includes(tableHeaders[i])) {
                essentialTableHeaderIndexes[tableHeaders[i]] = i;
            }
        }
        console.log("tableHeaders:", tableHeaders);
        console.log("essentialTableHeaderIndexes:", essentialTableHeaderIndexes);
        let stars = [];
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
            stars.push(rowData.filter((_, index) => {
                return essentialTableHeaderIndexes[tableHeaders[index]] !== undefined;
            }));
        });
        stars = stars.filter((row) => {
            return row[essentialTableHeaderIndexes["B"]] !== "";
        });
        console.log("stars:", stars.length);
        (0, raw_stars_1.registerStars)(abbr, stars);
        (0, scrapped_1.registerIAUAbbr)([abbr]);
    }
}
async function main() {
    await fetchStarsOfConstellation();
}
main();
