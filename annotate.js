module.exports = {
  annotate(text, annotations) {
    const exploded = [...text];
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
