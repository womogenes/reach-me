module.exports = async (userID, userdb) => {
  const user = await userdb.model('Tags').findOne({ userID: userID });

  if (!user) return [];
    
  const toReturn = await Promise.all(user.tags.map(async tagID => {
    const tag = await userdb.model('ValidTag').findOne({ _id: tagID });
    return {
      name: tag.name,
      category: tag.category
    };
  }));
  
  return toReturn;
};