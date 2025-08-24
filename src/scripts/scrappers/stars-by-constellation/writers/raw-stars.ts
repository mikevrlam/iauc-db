import fs from "fs";
import path from "path";

const FILE_PATH = path.resolve("./scraps/results/raw-stars.json");

export type RawStars = Record<string, string[][]>;

export function loadRawStars(): RawStars {
  if (!fs.existsSync(FILE_PATH)) return {};
  const content = fs.readFileSync(FILE_PATH, "utf-8");
  try {
    return JSON.parse(content) as RawStars;
  } catch {
    return {};
  }
}

export function saveRawStars(data: RawStars) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function registerStars(abbr: string, stars: string[][]) {
  const rawStars = loadRawStars();

  if (!rawStars[abbr]) {
    rawStars[abbr] = [];
  }

  // Append new stars (or overwrite if you want fresh scrape)
  rawStars[abbr] = [...rawStars[abbr], ...stars];

  saveRawStars(rawStars);
  console.log(`Saved ${stars.length} stars under ${abbr} to raw-stars.json`);
}
