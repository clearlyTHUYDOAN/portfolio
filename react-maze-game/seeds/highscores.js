const mongoose = require('mongoose');
const HighScore = require('../models/highscores');
const highscoresToSeed = [ // Forms connection.
                            {score: 5759, player: "clearlyTHUYDOAN"}, 
                            {score: 5268, player: "Vexim"}
                        ];

module.exports = () => {
    HighScore.find({}, (err, highscores) => { // Look into Dealership (/models/dealerships) and find all objects.
        if (err) { 
            console.log(err)
        } else { 
            if (highscores.length === 0) { // Only seed if there's nothing in the table to prevent overwriting.
                HighScore.create(highscoresToSeed, (err, highscores) => { //.create + .pres enables you to see time stamps.
                    console.log(highscores)
                })
            }
        }
    })
}

// FOR WHEN USING PLAYERS.JS

// module.exports = () => {
//     HighScore.find({}, (err, highscores) => { // Look into HighScore (/models/highscores) and find all objects.
//         if (err) {
//             console.log(err);
//         } else if (highscores.length === 0) { // Only seed if there's nothing in the table to prevent overwriting data.
//             Player.find({}, (err, players) => { // Now form a connection with User (/models/users).
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     if (players.length < 2) {
//                         console.log('Insufficient users to use for seeding highscores.'); 
//                     } else {
//                         const highscoresToSeed = [ // Forms connection.
//                             {score: 5759, player_id: players[0]._id}, 
//                             {score: 5268, player_id: players[0]._id},
//                             {score: 4999, player_id: players[1]._id}
//                         ];
//                         HighScore.collection.save(highscoresToSeed, (err, highscores) => {
//                             console.log(highscores);
//                         })
//                     }
//                 }
//             })
//         }
//     })
// }