module.exports = {
  shiftIndexes(annotations, index, amount) {
    annotations.forEach((annotation) => {
      if (annotation.openIndex > index) annotation.openIndex += amount;
      if (annotation.closeIndex >= index) annotation.closeIndex += amount;
    });
  },
};
