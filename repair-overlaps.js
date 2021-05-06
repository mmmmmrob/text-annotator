const {
  annotationRelationship,
  RELATIONSHIPS,
} = require("./annotation-relationship");

const { A_OVERLAPPED_BY_B } = RELATIONSHIPS;

function findFirstOverlap(annotations) {
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
}

module.exports = {
  repairOverlaps(annotations) {
    let overlapPair;
    while ((overlapPair = findFirstOverlap(annotations))) {
      const [a, b] = overlapPair;
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
