import { describe, it, expect } from "vitest";
import { constellations, rawStars, stars, lines } from "../src/index";

describe("IAUC DB", () => {
  it("Constellations should have 88 keys of IAU Abbreviated Constellation", () => {
    expect(constellations.length).toBe(88);
    for (const constellation of constellations) {
      expect(constellation.abbr.iau.length).toBe(3);
    }
  });

  it("Raw stars should have 88 keys of IAU Abbreviated Constellation, and proper format", () => {
    const keys = Object.keys(rawStars);
    expect(keys.length).toBe(88);
    for (const key of keys) {
      expect(key.length).toBe(3);
      const starsInConstellation = rawStars[key];
      expect(starsInConstellation.length).toBeGreaterThan(0);
      for (const star of starsInConstellation) {
        expect(star.length).toBe(5);
      }
    }
  });

  it("Stars should have 88 keys of IAU Abbreviated Constellation, and proper format", () => {
    const keys = Object.keys(stars);
    expect(keys.length).toBe(88);
    for (const key of keys) {
      expect(key.length).toBe(3);
      const starsInConstellation = stars[key];
      expect(starsInConstellation.length).toBeGreaterThan(0);
      for (const star of starsInConstellation) {
        expect(star.length).toBe(7);
      }
    }
  });

  it("Lines should have 88 keys of IAU Abbreviated Constellation, and proper format", () => {
    const keys = Object.keys(lines);
    expect(keys.length).toBe(88);
    for (const key of keys) {
      expect(key.length).toBe(3);
      const linesInConstellation = lines[key];
      for (const line of linesInConstellation) {
        expect(line.length).toBe(2);
      }
    }
  });
});
