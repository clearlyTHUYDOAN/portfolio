import React, { Component } from 'react';

class AudioPlayer extends Component {

    // DEFINE METHODS AND COMPONENT LIFECYCLES. //

    componentDidUpdate() {
    const { start, stop, winner, quit, leaderboard } = this.props; // Provide specificity to prevent song playing when not needed.
    const player = this.refs.player; // Refers to audio tag in render > return.

    if (start === true && stop === false && winner === false && quit === false && leaderboard === false) {  // During a game.
        player.play(); 
    } 
    else if (start === true && stop === true && winner === false && quit === false && leaderboard === false) { // Loss.
        player.play(); // Needed to play songs on song change / view change.
    } 
    else if (start === true && stop === false && winner === true && quit === false && leaderboard === false) { // Win.
        player.play(); // Needed to play songs on song change / view change.
    }
  };

    render () {

        return (
            <div className="AudioPlayer">
                <audio ref="player" src={this.props.song}></audio> 
            </div>
        );

    }
}

export default AudioPlayer;