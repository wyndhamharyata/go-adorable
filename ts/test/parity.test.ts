import test from "node:test";
import assert from "node:assert/strict";

import { pseudoRandom } from "../src/index.ts";

// Printed by the Go implementation (adorable.PseudoRandom plus the same HKDF
// reads) for each seed: eyes, nose, mouth, background R, G, B.
const VECTORS: Array<[string, number, number, number, [number, number, number]]> = [
  ["Wyndham", 4, 4, 1, [255, 169, 249]],
  ["Squirt Catchy", 1, 6, 4, [0, 136, 255]],
  ["Honey Badger", 7, 6, 7, [0, 191, 141]],
  ["Emit King", 8, 5, 2, [255, 159, 242]],
  ["Abacus Zoom", 2, 7, 6, [188, 111, 24]],
  ["Verdant Thicket", 7, 7, 0, [204, 198, 255]],
  ["Koran", 2, 1, 2, [171, 137, 255]],
  ["mwyndham.dev", 6, 5, 2, [0, 146, 194]],
];

test("matches the Go faces", () => {
  for (const [seed, eyes, nose, mouth, background] of VECTORS) {
    assert.deepEqual(pseudoRandom(seed), { eyes, nose, mouth, background }, seed);
  }
});

test("is stable for byte seeds", () => {
  assert.deepEqual(pseudoRandom(new TextEncoder().encode("Koran")), pseudoRandom("Koran"));
});
