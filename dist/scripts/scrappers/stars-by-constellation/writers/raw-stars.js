"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRawStars = loadRawStars;
exports.saveRawStars = saveRawStars;
exports.registerStars = registerStars;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const FILE_PATH = path_1.default.resolve("./scraps/results/raw-stars.json");
function loadRawStars() {
    if (!fs_1.default.existsSync(FILE_PATH))
        return {};
    const content = fs_1.default.readFileSync(FILE_PATH, "utf-8");
    try {
        return JSON.parse(content);
    }
    catch {
        return {};
    }
}
function saveRawStars(data) {
    fs_1.default.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}
function registerStars(abbr, stars) {
    const rawStars = loadRawStars();
    if (!rawStars[abbr]) {
        rawStars[abbr] = [];
    }
    // Append new stars (or overwrite if you want fresh scrape)
    rawStars[abbr] = [...rawStars[abbr], ...stars];
    saveRawStars(rawStars);
    console.log(`Saved ${stars.length} stars under ${abbr} to raw-stars.json`);
}
