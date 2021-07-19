const { containsOverlaps } = require("./repair-overlaps");
const GraphemeBreaker = require("grapheme-breaker");

const overlapError =
  "Overlapping annotations found, use repairOverlaps to fix overlapping annotations before applying them.";

module.exports = {
  annotate(text, annotations) {
    if (containsOverlaps(annotations)) throw overlapError;
    const exploded = GraphemeBreaker.break(text);
    annotations.sort(
      //Sort into right-to-left and nested order
      (a, b) => b.openIndex - a.openIndex || a.closeIndex - b.closeIndex || -1
    );
    annotations.forEach(({ openIndex, closeIndex, openTag, closeTag }) => {
      exploded[openIndex] = openTag + exploded[openIndex];
      exploded[closeIndex - 1] = exploded[closeIndex - 1] + closeTag;
    });
    return exploded.join("");
  },
};
