"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadScrapped = loadScrapped;
exports.saveScrapped = saveScrapped;
exports.registerIAUAbbr = registerIAUAbbr;
const fs_1 = __importDefault(require("fs"));
const FILE_PATH = "./scraps/logs/scrapped.json";
function loadScrapped() {
    if (!fs_1.default.existsSync(FILE_PATH))
        return [];
    const content = fs_1.default.readFileSync(FILE_PATH, "utf-8");
    try {
        return JSON.parse(content);
    }
    catch {
        return [];
    }
}
function saveScrapped(data) {
    fs_1.default.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}
function registerIAUAbbr(abbrs) {
    const scrapped = loadScrapped();
    abbrs.forEach((abbr) => {
        if (!scrapped.includes(abbr)) {
            scrapped.push(abbr);
        }
    });
    saveScrapped(scrapped);
    console.log("Updated scrapped-constellations.json:", scrapped);
}
