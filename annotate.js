module.exports = {
  annotate(text, annotations) {
    const exploded = [...text];
    annotations.reverse();
    annotations.forEach(({ openIndex, closeIndex, openTag, closeTag }) => {
      exploded[openIndex] = openTag + exploded[openIndex];
      exploded[closeIndex - 1] = exploded[closeIndex - 1] + closeTag;
    });
    return exploded.join("");
  },
};
