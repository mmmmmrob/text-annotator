const {
  annotationRelationship,
  RELATIONSHIPS,
} = require("./annotation-relationship");
const {
  A_BEFORE_B,
  A_AFTER_B,
  A_MATCHES_B,
  A_SURROUNDS_B,
  A_INSIDE_B,
  A_OVERLAPPED_BY_B,
  A_OVERLAPS_B,
} = RELATIONSHIPS;

describe("Annotator annotationRelationship", () => {
  it.each([
    [A_BEFORE_B, [0, 1], [1, 2]],
    [A_AFTER_B, [1, 2], [0, 1]],
    [A_MATCHES_B, [3, 5], [3, 5]],
    [A_SURROUNDS_B, [0, 3], [1, 2]],
    [A_INSIDE_B, [1, 2], [0, 3]],
    [A_INSIDE_B, [0, 3], [0, 4]],
    [A_OVERLAPPED_BY_B, [0, 3], [1, 4]],
    [A_OVERLAPPED_BY_B, [0, 3], [1, 5]],
    [A_OVERLAPPED_BY_B, [0, 12], [3, 17]],
    [A_OVERLAPS_B, [3, 17], [0, 12]],
  ])("should identify %s", (relationship, [ao, ac], [bo, bc]) => {
    const a = { openIndex: ao, closeIndex: ac };
    const b = { openIndex: bo, closeIndex: bc };
    expect(annotationRelationship(a, b)).toEqual(relationship);
  });
});
