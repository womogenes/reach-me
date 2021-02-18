const badges1 = require('./badges1.js');

module.exports = ({ userdb, talkedTodb }) => {
  const insertBadges = async ({ userID, toInsert }) => {
    console.log(userID, toInsert);
    let badges = await userdb.model('Badges').findOne({ userID: userID });

    if (!badges) {
      badges = userdb.model('Badges')({
        userID: userID,
        badges: []
      });
    }

    for (badgeName of toInsert) {
      const newBadge = {
        name: badgeName,
        timestamp: Date.now()
      };
  
      // Only add badge if didn't exist already
      if (!(newBadge in badges.badges)) {
        badges.badges.push(newBadge);
      }
    }

    await badges.save();
  };

  // This method can be used to check for new badges whenever
  const checkBadges = async userID => {
    const otherIDs = await talkedTodb.model('TalkedTo').findOne({ userID });

    if (!otherIDs) return;

    const toInsert = [];

    for (otherObject of otherIDs.talkedTo) {
      const otherTagsObjects = await userdb.model('Tags').findOne({ userID: otherObject.userID });
      const otherTagIDs = otherTagsObjects.tags;
  
      if (!otherTagIDs) {
        continue;
      }
  
      const otherTags = await Promise.all(otherTagIDs.map(async oid => {
        return await userdb.model('ValidTag').findOne({ _id: oid });
      }));
  
      for (badgeName in badges1) {
        if (badges1[badgeName].check(otherTags)) {
          toInsert.push(badgeName);
        }
      }
    }

    insertBadges({ userID, toInsert });
  };

  return checkBadges;
};