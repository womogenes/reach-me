const badges1 = require('./badges1.js');

module.exports = ({ userdb }) => {
  const insertBadge = async ({ userID, badgeName }) => {
    const newBadge = {
      name: badgeName,
      timestamp: Date.now()
    };

    const badges = await userdb.model('Badges').findOne({ userID: userID });
    if (badges) {
      badges.badges.push(newBadge);
      badges.save();

    } else {
      const newBadges = userdb.model('Badges')({
        userID: userID, 
        badges: [ newBadge ]
      });
      newBadges.save();
    }
  };

  // This method is used when a user (userID) has talked to another user (otherID)
  const checkBadges = async (userID, otherID) => {
    const otherTagsObjects = await userdb.model('Tags').findOne({ userID: otherID });
    const otherTagIDs = otherTagsObjects.tags;

    if (!otherTagIDs) {
      return;
    }

    const otherTags = await Promise.all(otherTagIDs.map(async oid => {
      return await userdb.model('ValidTag').findOne({ _id: oid });
    }));

    for (badgeName in badges1) {
      if (badges1[badgeName].check({ otherTags })) {
        insertBadge({ userID, badgeName });
      }
    }
  };

  return checkBadges;
};