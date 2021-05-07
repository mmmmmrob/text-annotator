const { repairOverlaps } = require(".");

describe("Annotator repairOverlaps", () => {
  it("should not repair distinct annotations", () => {
    const distinctAnnotations = [
      { openTag: "zip", openIndex: 0, closeIndex: 12 },
      { openTag: "zap", openIndex: 12, closeIndex: 99 },
    ];
    expect(repairOverlaps(distinctAnnotations)).toMatchObject(
      distinctAnnotations
    );
  });

  it("should repair two overlapping annotations", () => {
    const overlappingAnnotations = [
      { openTag: "zip", openIndex: 0, closeIndex: 12 },
      { openTag: "zap", openIndex: 3, closeIndex: 17 },
    ];
    const repairedAnnotations = [
      { openTag: "zip", openIndex: 0, closeIndex: 3 },
      { openTag: "zip", openIndex: 3, closeIndex: 12 },
      { openTag: "zap", openIndex: 3, closeIndex: 17 },
    ];
    expect(repairOverlaps(overlappingAnnotations)).toMatchObject(
      repairedAnnotations
    );
  });

  it.todo("should repair several overlapping annotations");

  it.todo("should repair several overlapping annotations when out of order");
});
