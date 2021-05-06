const { shiftIndexes } = require("./shift-indexes");

const encodes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;",
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
