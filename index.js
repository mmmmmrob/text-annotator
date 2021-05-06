const { insertAt } = require("./insert-at");
const { shiftIndexes } = require("./shift-indexes");

const findNestedAnnotations = (annotations, annotation) => {
  return annotations.filter((candidate) => {
    return (
      !candidate.started &&
      candidate.openIndex >= annotation.openIndex &&
      candidate.closeIndex <= annotation.closeIndex
    );
  });
};

const applyAnnotation = (text, annotations, annotation) => {
  if (annotation.finished) return text;
  annotation.started = true;
  const nestedAnnotations = findNestedAnnotations(annotations, annotation);
  nestedAnnotations.forEach((nestedAnnotation) => {
    text = applyAnnotation(text, annotations, nestedAnnotation);
  });
  text = insertAt(text, annotation.closeIndex, annotation.closeTag);
  shiftIndexes(annotations, annotation.closeIndex, annotation.closeTag.length);
  text = insertAt(text, annotation.openIndex, annotation.openTag);
  shiftIndexes(annotations, annotation.openIndex, annotation.openTag.length);
  annotation.finished = true;
  return text;
};

module.exports = {
  ...require("./escape-html"),
  ...require("./repair-overlaps"),
  ...require("./annotation-relationship"),
  annotate(text, annotations) {
    annotations.forEach((annotation) => {
      text = applyAnnotation(text, annotations, annotation);
    });
    return text;
  },
};
