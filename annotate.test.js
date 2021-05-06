const { annotate } = require(".");

describe("Annotater annotate", () => {
  describe("should apply a single annotation", () => {
    it("at the beginning", () => {
      const annotations = [
        { openTag: "<zip>", closeTag: "</zip>", openIndex: 0, closeIndex: 3 },
      ];
      const actual = annotate("foo bar baz qux qip", annotations);
      const expected = "<zip>foo</zip> bar baz qux qip";
      expect(actual).toBe(expected);
    });

    it("in the middle", () => {
      const annotations = [
        { openTag: "<zip>", closeTag: "</zip>", openIndex: 8, closeIndex: 11 },
      ];
      const actual = annotate("foo bar baz qux qip", annotations);
      const expected = "foo bar <zip>baz</zip> qux qip";
      expect(actual).toBe(expected);
    });

    it("at the end", () => {
      const annotations = [
        { openTag: "<zip>", closeTag: "</zip>", openIndex: 16, closeIndex: 19 },
      ];
      const actual = annotate("foo bar baz qux qip", annotations);
      const expected = "foo bar baz qux <zip>qip</zip>";
      expect(actual).toBe(expected);
    });
  });

  describe("should apply distinct annotations", () => {
    it("at the beginning and in the middle", () => {
      const annotations = [
        { openTag: "<zip>", closeTag: "</zip>", openIndex: 0, closeIndex: 3 },
        { openTag: "<zap>", closeTag: "</zap>", openIndex: 8, closeIndex: 11 },
      ];
      const actual = annotate("foo bar baz qux qip", annotations);
      const expected = "<zip>foo</zip> bar <zap>baz</zap> qux qip";
      expect(actual).toBe(expected);
    });

    it("in the middle and at the end", () => {
      const annotations = [
        { openTag: "<zip>", closeTag: "</zip>", openIndex: 8, closeIndex: 11 },
        { openTag: "<zap>", closeTag: "</zap>", openIndex: 16, closeIndex: 19 },
      ];
      const actual = annotate("foo bar baz qux qip", annotations);
      const expected = "foo bar <zip>baz</zip> qux <zap>qip</zap>";
      expect(actual).toBe(expected);
    });

    it("at the beginning and at the end", () => {
      const annotations = [
        { openTag: "<zip>", closeTag: "</zip>", openIndex: 0, closeIndex: 3 },
        { openTag: "<zap>", closeTag: "</zap>", openIndex: 16, closeIndex: 19 },
      ];
      const actual = annotate("foo bar baz qux qip", annotations);
      const expected = "<zip>foo</zip> bar baz qux <zap>qip</zap>";
      expect(actual).toBe(expected);
    });

    it("at the beginning, in the middle, and at the end", () => {
      const annotations = [
        { openTag: "<zip>", closeTag: "</zip>", openIndex: 0, closeIndex: 3 },
        { openTag: "<zap>", closeTag: "</zap>", openIndex: 8, closeIndex: 11 },
        { openTag: "<zop>", closeTag: "</zop>", openIndex: 16, closeIndex: 19 },
      ];
      const actual = annotate("foo bar baz qux qip", annotations);
      const expected = "<zip>foo</zip> bar <zap>baz</zap> qux <zop>qip</zop>";
      expect(actual).toBe(expected);
    });
  });

  describe("should apply perfectly nested annotations", () => {
    it("at the beginning", () => {
      const annotations = [
        { openTag: "<zip>", closeTag: "</zip>", openIndex: 0, closeIndex: 3 },
        { openTag: "<zap>", closeTag: "</zap>", openIndex: 0, closeIndex: 3 },
      ];
      const actual = annotate("foo bar baz qux qip", annotations);
      const expected = "<zip><zap>foo</zap></zip> bar baz qux qip";
      expect(actual).toBe(expected);
    });

    it("in the middle", () => {
      const annotations = [
        { openTag: "<zip>", closeTag: "</zip>", openIndex: 8, closeIndex: 11 },
        { openTag: "<zap>", closeTag: "</zap>", openIndex: 8, closeIndex: 11 },
      ];
      const actual = annotate("foo bar baz qux qip", annotations);
      const expected = "foo bar <zip><zap>baz</zap></zip> qux qip";
      expect(actual).toBe(expected);
    });

    it("at the end", () => {
      const annotations = [
        { openTag: "<zip>", closeTag: "</zip>", openIndex: 16, closeIndex: 19 },
        { openTag: "<zap>", closeTag: "</zap>", openIndex: 16, closeIndex: 19 },
      ];
      const actual = annotate("foo bar baz qux qip", annotations);
      const expected = "foo bar baz qux <zip><zap>qip</zap></zip>";
      expect(actual).toBe(expected);
    });
  });

  describe("should apply imperfectly nested annotations", () => {
    it("at the beginning", () => {
      const annotations = [
        { openTag: "<zip>", closeTag: "</zip>", openIndex: 0, closeIndex: 11 },
        { openTag: "<zap>", closeTag: "</zap>", openIndex: 0, closeIndex: 3 },
      ];
      const actual = annotate("foo bar baz qux qip", annotations);
      const expected = "<zip><zap>foo</zap> bar baz</zip> qux qip";
      expect(actual).toBe(expected);
    });

    it("in the middle", () => {
      const annotations = [
        { openTag: "<zip>", closeTag: "</zip>", openIndex: 4, closeIndex: 15 },
        { openTag: "<zap>", closeTag: "</zap>", openIndex: 8, closeIndex: 11 },
      ];
      const actual = annotate("foo bar baz qux qip", annotations);
      const expected = "foo <zip>bar <zap>baz</zap> qux</zip> qip";
      expect(actual).toBe(expected);
    });

    it("at the end", () => {
      const annotations = [
        { openTag: "<zip>", closeTag: "</zip>", openIndex: 8, closeIndex: 19 },
        { openTag: "<zap>", closeTag: "</zap>", openIndex: 16, closeIndex: 19 },
      ];
      const actual = annotate("foo bar baz qux qip", annotations);
      const expected = "foo bar <zip>baz qux <zap>qip</zap></zip>";
      expect(actual).toBe(expected);
    });
  });

  it.todo("should throw errors");
  it.todo("should cope with out of order");
});
