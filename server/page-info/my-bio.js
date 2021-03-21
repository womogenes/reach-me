module.exports = async (userID, userdb) => {
  const user = await userdb.model('Bio').findOne({ 'userID': userID });

  if (!user) return null; // Because documents for a user aren't automatically created
  return user.bio;
};