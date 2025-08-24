"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const greekToLatin = {
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
function latinizeBayer(name) {
    // replace only the first greek letter if present
    return name.replace(/[\u03B1-\u03C9]/, (match) => greekToLatin[match] || match);
}
function raToDecimalHours(ra) {
    const match = ra.match(/(\d+)h\s*(\d+)m\s*(\d+(?:\.\d+)?)s/);
    if (!match)
        throw new Error(`Invalid RA format: ${ra}`);
    const hours = parseFloat(match[1]);
    const minutes = parseFloat(match[2]);
    const seconds = parseFloat(match[3]);
    return hours + minutes / 60 + seconds / 3600;
}
function decToDecimalDegrees(dec) {
    dec = dec
        .replace(/−/g, "-")
        .replace(/\u00A0/g, " ")
        .trim();
    const match = dec.match(/([+\-]?\d+)°\s*(\d+)′\s*(\d+(?:\.\d+)?)″/);
    if (!match)
        throw new Error(`Invalid Dec format: ${dec}`);
    const deg = parseFloat(match[1]);
    const min = parseFloat(match[2]);
    const sec = parseFloat(match[3]);
    const sign = deg < 0 ? -1 : 1;
    return deg + sign * (min / 60 + sec / 3600);
}
function apparentMagnitudeToType(mag) {
    // Scale into 3 types (1 = brightest, 3 = dimmest)
    if (mag <= 2.5)
        return 1;
    if (mag <= 4.0)
        return 2;
    return 3;
}
function transformStars(rawStars) {
    const result = {};
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
const RAW_FILE = path_1.default.resolve("./scraps/results/raw-stars.json");
const CLEAN_FILE = path_1.default.resolve("./scraps/results/stars.json");
async function main() {
    if (!fs_1.default.existsSync(RAW_FILE)) {
        console.error("Raw stars file does not exist:", RAW_FILE);
        return;
    }
    const rawContent = fs_1.default.readFileSync(RAW_FILE, "utf-8");
    const rawStars = JSON.parse(rawContent);
    const cleanStars = transformStars(rawStars);
    fs_1.default.writeFileSync(CLEAN_FILE, JSON.stringify(cleanStars, null, 2), "utf-8");
    console.log("Transformed stars saved to:", CLEAN_FILE);
}
main();
