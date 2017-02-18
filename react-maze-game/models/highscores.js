// Require Mongoose in this file.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema.
const highScoreSchema = new Schema ({
    score: Number,
    player: String, 
    created_at: Date,
    updated_at: Date
})

highScoreSchema.pre('save', function(next) {
    // Get the current date.
    const currentDate = new Date();

    // Change the updated_at field to current date.
    this.updated_at = currentDate;

    // If created_at doesn't exist, add to that field
    if (!this.created_at) {
        this.created_at = currentDate;
    }

    // Continue.
    next();
});

// Create model using Schema.
const HighScore = mongoose.model('highscore', highScoreSchema);

// Make this available to our Node applications.
module.exports = HighScore;
