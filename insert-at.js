module.exports = {
  insertAt(textToModify, index, textToInsert) {
    return (
      textToModify.slice(0, index) + textToInsert + textToModify.slice(index)
    );
  },
};
