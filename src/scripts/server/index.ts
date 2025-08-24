// scripts/server.ts
import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "../../../render"))); // serve HTML, JS, CSS
app.use("/stars", express.static(path.join(__dirname, "../../../scraps/results/stars.json"))); // serve JSON
app.use("/lines", express.static(path.join(__dirname, "../../../scraps/results/lines.json"))); // serve JSON

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
