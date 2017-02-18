// Require Mongoose in this file.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema.
const playerSchema = new Schema ({
    username: String,
    score: [Scores],
    created_at: Date,
    updated_at: Date
})

// Create model using Schema.
const Player = mongoose.model('player', playerSchema);

// Make this available to our Node applications.
module.exports = Player;