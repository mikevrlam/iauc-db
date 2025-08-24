import fs from "fs";

const FILE_PATH = "./scraps/logs/scrapped.json";

export function loadScrapped() {
  if (!fs.existsSync(FILE_PATH)) return [];
  const content = fs.readFileSync(FILE_PATH, "utf-8");
  try {
    return JSON.parse(content) as string[];
  } catch {
    return [];
  }
}

export function saveScrapped(data: string[]) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function registerIAUAbbr(abbrs: string[]) {
  const scrapped = loadScrapped();

  abbrs.forEach((abbr) => {
    if (!scrapped.includes(abbr)) {
      scrapped.push(abbr);
    }
  });

  saveScrapped(scrapped);
  console.log("Updated scrapped-constellations.json:", scrapped);
}
