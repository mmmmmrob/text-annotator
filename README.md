# Text Annotator

# Intro

Text Annotator applies an array of annotations to some plain text to create marked-up text.

e.g.

```javascript
const annotations = [
  { openTag: "<zip>", closeTag: "</zip>", openIndex: 0, closeIndex: 3 },
  { openTag: "<zap>", closeTag: "</zap>", openIndex: 16, closeIndex: 19 },
];
annotate("foo bar baz qux qip", annotations);
// <zip>foo</zip> bar baz qux <zap>qip</zap>
```

The need to process this odd structure comes from the [StiboDX CUE Publishing Platform](https://www.stibodx.com/solutions/publishing-platform) and their [annotations](http://docs.cuepublishing.com/ece-syndication-ref/7.9/_annotation.html)
