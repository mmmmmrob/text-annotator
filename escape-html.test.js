const { escapeHtml } = require(".");

describe("Annotater escapeHtml", () => {
  describe("should escape html special character", () => {
    it.each([
      ["less than", "foo < bar", "foo &lt; bar"],
      ["greater than", "foo > bar", "foo &gt; bar"],
      ["ampersand", "foo & bar", "foo &amp; bar"],
      ["double quote", 'foo " bar', "foo &quot; bar"],
      ["single quote", "foo ' bar", "foo &#039; bar"],
      [
        "all chars",
        "<foo> & bar \"baz\" 'qux'",
        "&lt;foo&gt; &amp; bar &quot;baz&quot; &#039;qux&#039;",
      ],
    ])("%s", (name, plain, escaped) => {
      expect(escapeHtml(plain)).toEqual(escaped);
    });
  });

  describe("should shift a single annotation", () => {
    it("at the beginning", () => {
      const annotations = [
        { openTag: "<zip>", closeTag: "</zip>", openIndex: 0, closeIndex: 5 },
      ];
      const actual = escapeHtml("<foo> bar baz qux qip", annotations);
      //                        "&lt;foo&gt; bar baz qux qip"
      expect(annotations[0]).toMatchObject({ openIndex: 0, closeIndex: 11 });
    });

    it("in the middle", () => {
      const annotations = [
        { openTag: "<zip>", closeTag: "</zip>", openIndex: 10, closeIndex: 13 },
      ];
      const actual = escapeHtml("<foo> bar baz qux qip", annotations);
      //                        "&lt;foo&gt; bar baz qux qip"
      expect(annotations[0]).toMatchObject({ openIndex: 16, closeIndex: 19 });
    });

    it("at the end", () => {
      const annotations = [
        { openTag: "<zip>", closeTag: "</zip>", openIndex: 18, closeIndex: 21 },
      ];
      const actual = escapeHtml("<foo> bar baz qux qip", annotations);
      //                        "&lt;foo&gt; bar baz qux qip"
      expect(annotations[0]).toMatchObject({ openIndex: 24, closeIndex: 27 });
    });
  });
});
