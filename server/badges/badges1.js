module.exports = {
  'talked-to-freshman': {
    tite: 'Talked to a freshman',
    check: ({ otherTags }) => {
      return otherTags.find(tag => {
        return tag.name === 'freshman' && tag.category === 'grade'
      });
    }
  }
};