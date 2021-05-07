const encodes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;",
};

const shiftIndexes = (annotations, index, amount) => {
  annotations.forEach((annotation) => {
    if (annotation.openIndex > index) annotation.openIndex += amount;
    if (annotation.closeIndex >= index) annotation.closeIndex += amount;
  });
};

module.exports = {
  escapeHtml(text, annotations) {
    text = text.replace(/[&<>"']/g, (m, offset) => {
      if (annotations) {
        shiftIndexes(annotations, offset + 1, encodes[m].length - 1);
      }
      return encodes[m];
    });
    return text;
  },
};
