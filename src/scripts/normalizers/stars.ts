import fs from "fs";
import path from "path";

type CleanStarRow = [string, string, string, number, number, string, number];

const greekToLatin: Record<string, string> = {
  α: "alpha",
  β: "beta",
  γ: "gamma",
  δ: "delta",
  ε: "epsilon",
  ζ: "zeta",
  η: "eta",
  θ: "theta",
  ι: "iota",
  κ: "kappa",
  λ: "lambda",
  μ: "mu",
  ν: "nu",
  ξ: "xi",
  ο: "omicron",
  π: "pi",
  ρ: "rho",
  σ: "sigma",
  τ: "tau",
  υ: "upsilon",
  φ: "phi",
  χ: "chi",
  ψ: "psi",
  ω: "omega",
};

function latinizeBayer(name: string) {
  // replace only the first greek letter if present
  return name.replace(/[\u03B1-\u03C9]/, (match) => greekToLatin[match] || match);
}

function raToDecimalHours(ra: string): number {
  const match = ra.match(/(\d+)h\s*(\d+)m\s*(\d+(?:\.\d+)?)s/);
  if (!match) throw new Error(`Invalid RA format: ${ra}`);
  const hours = parseFloat(match[1]);
  const minutes = parseFloat(match[2]);
  const seconds = parseFloat(match[3]);
  return hours + minutes / 60 + seconds / 3600;
}

function decToDecimalDegrees(dec: string): number {
  dec = dec
    .replace(/−/g, "-")
    .replace(/\u00A0/g, " ")
    .trim();
  const match = dec.match(/([+\-]?\d+)°\s*(\d+)′\s*(\d+(?:\.\d+)?)″/);
  if (!match) throw new Error(`Invalid Dec format: ${dec}`);
  const deg = parseFloat(match[1]);
  const min = parseFloat(match[2]);
  const sec = parseFloat(match[3]);
  const sign = deg < 0 ? -1 : 1;
  return deg + sign * (min / 60 + sec / 3600);
}

function apparentMagnitudeToType(mag: number): number {
  // Scale into 3 types (1 = brightest, 3 = dimmest)
  if (mag <= 2.5) return 1;
  if (mag <= 4.0) return 2;
  return 3;
}

function transformStars(rawStars: Record<string, string[][]>): Record<string, CleanStarRow[]> {
  const result: Record<string, CleanStarRow[]> = {};

  for (const [constellation, stars] of Object.entries(rawStars)) {
    result[constellation] = stars.map((row) => {
      const name = row[0];
      const second = row[1];
      const bayerLatin = latinizeBayer(row[1].split(",")[0]);
      const raDecimal = raToDecimalHours(row[2]);
      const decDecimal = decToDecimalDegrees(row[3]);
      const visMag = parseFloat(row[4]);
      const starType = apparentMagnitudeToType(visMag);

      return [name, second, bayerLatin, raDecimal, decDecimal, row[4], starType];
    });
  }

  return result;
}

const RAW_FILE = path.resolve("./scraps/results/raw-stars.json");
const CLEAN_FILE = path.resolve("./scraps/results/stars.json");

async function main() {
  if (!fs.existsSync(RAW_FILE)) {
    console.error("Raw stars file does not exist:", RAW_FILE);
    return;
  }

  const rawContent = fs.readFileSync(RAW_FILE, "utf-8");
  const rawStars: Record<string, string[][]> = JSON.parse(rawContent);

  const cleanStars = transformStars(rawStars);

  fs.writeFileSync(CLEAN_FILE, JSON.stringify(cleanStars, null, 2), "utf-8");
  console.log("Transformed stars saved to:", CLEAN_FILE);
}

main();
