var characters = require('../data/wbbcharacters.js');
var friends = require('../data/friends.js');

module.exports = function (app) {
    app.get('/api/wbbcharacters', function (req, res) {
        res.json(characters);
    });

    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req, res) {
        //Store user data into a variable
        var userData = req.body;
        console.log(userData);

        //Store user scores into a separate variable
        var userScores = userData.scores;
        console.log(userScores);

        //Create variable to hold score difference
        var scoreDifference = 0;

        //Create a best match object with a friend difference integer to check the score difference against
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 100
        }

        //Loop through array of friends
        for (var i = 0; i < characters.length; i++) {

            //Reset the score difference to 0 for each friend we loop through
            scoreDifference = 0;

            //Loop through each friend's array of scores
            for (var j = 0; j < characters[i].scores.length; j++) {

                //Calculate the score difference between each user score and each friend score
                scoreDifference += Math.abs(parseInt(userScores[j]) - parseInt(characters[i].scores[j]));
                console.log(scoreDifference);

            };

            //Check if the score difference is less than the current best match in the loop
            if (scoreDifference < bestMatch.friendDifference) {
                bestMatch.name = characters[i].name,
                    bestMatch.photo = characters[i].photo,
                    bestMatch.friendDifference = scoreDifference
            };
        };

        console.log(bestMatch);
        //Push the user data to the friends array
        friends.push(userData);
        //Send the best match in the response
        res.json(bestMatch);
    })
};