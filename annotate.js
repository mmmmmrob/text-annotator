const { insertAt } = require("./insert-at");
const { shiftIndexes } = require("./shift-indexes");
const {
  annotationRelationship,
  RELATIONSHIPS,
} = require("./annotation-relationship");

const { A_SURROUNDS_B, A_MATCHES_B } = RELATIONSHIPS;

const findNestedAnnotations = (annotations, annotation) => {
  return annotations.filter((candidate) => {
    const rel = annotationRelationship(annotation, candidate);
    return !candidate.started && (rel === A_SURROUNDS_B || rel === A_MATCHES_B);
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
  annotate(text, annotations) {
    annotations.forEach((annotation) => {
      text = applyAnnotation(text, annotations, annotation);
    });
    return text;
  },
};
