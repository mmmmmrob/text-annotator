const {
  annotationRelationship,
  RELATIONSHIPS,
} = require("./annotation-relationship");

const { A_OVERLAPPED_BY_B } = RELATIONSHIPS;

const findFirstOverlap = (annotations) => {
  const pairs = [];
  annotations.forEach((a) => {
    annotations.forEach((b) => {
      if (a !== b) pairs.push([a, b]);
    });
  });
  const firstOverlappingPair = pairs.find(([a, b]) => {
    return annotationRelationship(a, b) === A_OVERLAPPED_BY_B;
  });
  return firstOverlappingPair;
};

module.exports = {
  containsOverlaps(annotations) {
    return !!findFirstOverlap(annotations);
  },
  repairOverlaps(annotations) {
    let overlapPair;
    while ((overlapPair = findFirstOverlap(annotations))) {
      const [a, b] = overlapPair;
      //Replace a with two annotations, split either side of b, to fix the overlap
      annotations.splice(
        annotations.indexOf(a),
        1,
        { ...a, closeIndex: b.openIndex },
        { ...a, openIndex: b.openIndex }
      );
    }
    return annotations;
  },
};
