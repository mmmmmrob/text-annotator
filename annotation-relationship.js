const A_BEFORE_B = "A_BEFORE_B";
const A_AFTER_B = "A_AFTER_B";
const A_MATCHES_B = "A_MATCHES_B";
const A_SURROUNDS_B = "A_SURROUNDS_B";
const A_INSIDE_B = "A_INSIDE_B";
const A_OVERLAPPED_BY_B = "A_OVERLAPPED_BY_B";
const A_OVERLAPS_B = "A_OVERLAPS_B";

const RELATIONSHIPS = {
  A_BEFORE_B,
  A_AFTER_B,
  A_MATCHES_B,
  A_SURROUNDS_B,
  A_INSIDE_B,
  A_OVERLAPPED_BY_B,
  A_OVERLAPS_B,
};

module.exports = {
  annotationRelationship(a, b) {
    const [ao, bo, ac, bc] = [
      a.openIndex,
      b.openIndex,
      a.closeIndex,
      b.closeIndex,
    ];
    if (ac <= bo) return A_BEFORE_B;
    if (ao >= bc) return A_AFTER_B;
    if (ao == bo && ac == bc) return A_MATCHES_B;
    if (ao <= bo && ac >= bc) return A_SURROUNDS_B;
    if (ao >= bo && ac <= bc) return A_INSIDE_B;
    if (ao <= bo && ac <= bc) return A_OVERLAPPED_BY_B;
    if (ao >= bo && ac >= bc) return A_OVERLAPS_B;
    const errorMessage = `Indexes don't match an expected pattern: [[${ao},${ac}],[${bo},${bc}]]`;
    throw new Error(errorMessage);
  },
  RELATIONSHIPS,
};
