"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/server.ts
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, "../../../render"))); // serve HTML, JS, CSS
app.use("/stars", express_1.default.static(path_1.default.join(__dirname, "../../../scraps/results/stars.json"))); // serve JSON
app.use("/lines", express_1.default.static(path_1.default.join(__dirname, "../../../scraps/results/lines.json"))); // serve JSON
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
