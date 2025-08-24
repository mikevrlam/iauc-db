"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stars = exports.lines = exports.rawStars = exports.constellations = exports.version = void 0;
const constellations_1 = __importDefault(require("./data/constellations"));
const raw_stars_1 = __importDefault(require("./data/raw-stars"));
const lines_1 = __importDefault(require("./data/lines"));
const stars_1 = __importDefault(require("./data/stars"));
// temporary placeholder API to verify build/publish works
exports.version = "0.1.0";
exports.constellations = constellations_1.default;
exports.rawStars = raw_stars_1.default;
exports.lines = lines_1.default;
exports.stars = stars_1.default;
