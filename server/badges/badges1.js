// Checks are for a SINGULAR OTHER PERSON'S TAGS

module.exports = {
  'talked-to-freshman': {
    title: 'Talked to a freshman',
    description: 'Talk to one freshman',
    check: otherTags => {
      return otherTags.find(tag => {
        return tag.name === 'freshman' && tag.category === 'grade'
      });
    }
  },
  'talked-to-sophomore': {
    title: 'Talked to a sophomore',
    description: 'Talk to one sophomore',
    check: otherTags => {
      return otherTags.find(tag => {
        return tag.name === 'sophomore' && tag.category === 'grade'
      });
    }
  }
};