const { model } = require('mongoose');

const { authCheck } = require('../auth/auth-check.js')();

module.exports = ({ app, userdb, talkedTodb }) => {
  app.post('/talked-to', authCheck, async (req, res) => { 
    const otherID = req.query.userID;
    const { userID } = req.session;

    // User can't say they talked to themselves!
    if (otherID === userID) {
      res.status(400);
      return;
    }

    // Verify that the other user exists
    if (!await userdb/model('User').findOne({ userID: otherID })) {
      res.status(400);
      return;
    }

    // Function to add it
    const addTalkedTo = async (userID, otherID) => {
      const userTalkedTo = await talkedTodb.model('TalkedTo').findOne({ userID: userID });

      if (userTalkedTo) {
        userTalkedTo.talkedTo.push(otherID);
        userTalkedTo.save();

      } else {
        const newUserTalkedTo = talkedTodb.model('TalkedTo')({
          userID: userID,
          talkedTo: [otherID]
        });
        newUserTalkedTo.save();
      }
    };

    const removeClaim = (userID, claims) => {
      const index = claims.talkedToClaims.indexOf(userID);
      claims.talkedToClaims.splice(index);
      claims.save();
    };
    
    // Check if this validates an earlier claim
    const otherTalkedToClaims = await talkedTodb.model('TalkedToClaims').findOne({ userID: otherID });

    if (otherTalkedToClaims && otherTalkedToClaims.talkedToClaims.includes(userID)) {
      // Verified!
      await addTalkedTo(userID, otherID);
      await addTalkedTo(otherID, userID);

      // Remove the claim from other user
      removeClaim(userID, otherTalkedToClaims);

    } else {
      // Otherwise, add the claim to our user's claims
      const talkedToClaims = await talkedTodb.model('TalkedToClaims').findOne({ userID: userID });
      if (talkedToClaims) {
        await talkedTodb.model('TalkedToClaims').updateOne({
          userID: userID
        }, {
          $addToSet: { talkedToClaims: otherID }
        });

      } else {
        const newTalkedToClaims = talkedTodb.model('TalkedToClaims')({
          userID: userID,
          talkedToClaims: [otherID]
        });
        newTalkedToClaims.save();
      }
    }

    res.sendStatus(204); // No Content successful
  });
};