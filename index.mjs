
import * as Map from '@rescript/std/lib/es6/belt_MapString.mjs'
import * as fs from "fs"

var words = fs
  .readFileSync("index.mjs", "utf8")
  .split(/[\s\(\)\.]/)
  .filter(Boolean);
var set = Map.empty;

for (let word of words) {
  set = Map.set(set, word, Map.getWithDefault(set, word, 1));
}
console.log(Map.toArray(set));
