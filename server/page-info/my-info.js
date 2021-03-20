module.exports = async (userID, userdb) => {
  const user = await userdb.model('User').findOne({ 'userID': userID });
  if (!user) { return 500; };
  
  return {
    name: user.name,
    email: user.email,
    picture: user.picture
  };
};