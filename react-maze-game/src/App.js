import React, { Component } from 'react';
import './App.css';
import mazes from './components/Mazes';
import axios from 'axios';
import AudioPlayer from './components/AudioPlayer'

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: true,
      playername: "",
      start: false,
      stop: false,
      winner: false,
      quit: false,
      submitted: false,
      leaderboard: false,
      highscores: [],
      timer: 3000,
      maxtimers: [3000, 4000, 5000, 15000],
      score: 0,
      mazesIndex: 0,
      mazes: mazes 
    }

    // BIND METHODS THAT NEED ACCESS TO "THIS". //
    this.play = this.play.bind(this);
    this.start = this.start.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.nextMaze = this.nextMaze.bind(this);
    this.restartMaze = this.restartMaze.bind(this);
    this.restartEntireGame = this.restartEntireGame.bind(this);
    this.quitGame = this.quitGame.bind(this);
    this.savePlayerName = this.savePlayerName.bind(this);
    this.addHighScore = this.addHighScore.bind(this);
    this.leaderboard = this.leaderboard.bind(this);
    this.tick = this.tick.bind(this);
  };

  // DEFINE METHODS AND COMPONENT LIFECYCLES. //

  play() {
    this.setState ({
      title: false
    })
  }

  start() {
    this.setState ({
      start: true
    })
    this.tick();
  }

  nextMaze() {
    let oldMazesIndex = this.state.mazesIndex;
    let newMazesIndex = oldMazesIndex + 1;
    let newTimer = this.state.maxtimers[newMazesIndex];
    this.setState({
      start: false,
      stop: false,
      winner: false,
      timer: newTimer,
      mazesIndex: newMazesIndex
    })
  }

  restartMaze() {
    let newTimer = this.state.maxtimers[this.state.mazesIndex];
    this.setState ({
      start: false,
      stop: false,
      winner: false,
      timer: newTimer
    })
  }

  restartEntireGame() {
    let newTimer = this.state.maxtimers[0];
    this.setState ({
      start: false,
      stop: false,
      winner: false,
      quit: false,
      leaderboard: false,
      timer: newTimer,
      score: 0,
      mazesIndex: 0
    })
  }

  quitGame() {
    this.setState ({
      quit: true
    })
  }

  savePlayerName (event) {
    this.setState({
      playername: event.target.value,
    })
  }

  addHighScore() {
    if (this.state.score !== 0 && this.state.score <= 19000 && this.state.playername !== "") {
      axios.post('/highscores', {
      score: this.state.score,
      player: this.state.playername
      })

      this.setState({
        submitted: true
      })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    } else {
      alert("Either you need to submit a player name in order to be added to the leaderboard OR you cheated.");
      console.log("Hold the phone. You've got a cheater on your hands.");
    }
  };

  leaderboard() {
    axios.get('/highscores')
    .then((response) => {
      console.log(response.data);
      this.setState({
        highscores: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    })
    this.setState ({
      timer: 0,
      leaderboard: true
    })
  };

  tick() { // Causes this.state.timer to decrease at a certain speed. Shows player current maze score is decreasing as time goes on.
    const { stop, winner, timer } = this.state;
    let newTimer =  timer - 1;
    if (stop === false && winner === false) { // Start is implied to be true because tick starts when you click start
      this.setState({
        timer: newTimer
      })
      setTimeout(this.tick, 10); 
      if (timer <= 0) {
        this.setState({
          stop: true,
          timer: 0
        })
      }
    }
  }

  handleScore() { // Add current maze score to total maze score for a win. 
    // Implied to run when this.state.winner = true because it runs right after the state changes.
    const { score, timer } = this.state;
    let oldScore = score;
    let newScore = oldScore + timer;
      this.setState ({
        score: newScore
      })
  }

  handleTimer() { // Reset this.state.timer (to the user: current maze score) to 0 for a loss.
      // Implied to run when this.state.stop = true because it runs right after the state changes.
      let newTimer = 0;
      this.setState({
        timer: newTimer
      })
  }

  handleMouseMove(event) { // Maze logic. 

    const { start, stop, winner, mazes, mazesIndex} = this.state; // Fast way of writing ex: start = this.state.start for multiple states.

    if (start === true && stop === false && winner === false) {
      const domMaze = document.getElementById("Maze");
      const offsetLeft = domMaze.offsetLeft;
      const offsetTop = domMaze.offsetTop - window.scrollY; // See notebook diagram.
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      // var coor = "X coords: " + mouseX + ", Y coords: " + mouseY;
      // document.getElementById("Coordinates").innerHTML = coor;

      // Logic for losing.
      let outsidemaze = true;
      let winner = false;
      let lastRect = mazes[mazesIndex].length - 1; // Where the last rect object is the winning area.

      // Go through maze's rect objects and see if the mouse is inside the maze at all.
      for (let i = 0; i < mazes[mazesIndex].length; i++) { 
        if (mouseX >= (mazes[mazesIndex][i].x + offsetLeft) && 
            mouseX <= (mazes[mazesIndex][i].x + mazes[mazesIndex][i].width + offsetLeft) &&
            mouseY >= (mazes[mazesIndex][i].y + offsetTop) && 
            mouseY <= (mazes[mazesIndex][i].y + mazes[mazesIndex][i].height + offsetTop)) {

            outsidemaze = false;

      // If mouse is inside the maze, and therefore the player hasn't lost, check if the mouse is in the winning rect.
        } else if (mouseX >= (mazes[mazesIndex][lastRect].x + offsetLeft) && 
            mouseX <= (mazes[mazesIndex][lastRect].x + mazes[mazesIndex][lastRect].width + offsetLeft) &&
            mouseY >= (mazes[mazesIndex][lastRect].y + offsetTop) && 
            mouseY <= (mazes[mazesIndex][lastRect].y + mazes[mazesIndex][lastRect].height + offsetTop)) {
            
            outsidemaze = false;
            winner = true;
          }
      }
  
      if (outsidemaze === true) {
        this.setState ({
          stop: true
        }, this.handleTimer()) // Resets this.state.timer (to the user: current maze score) to 0 for a loss.
      }

      if (winner === true) {
        this.setState ({
          winner: true
        }, this.handleScore()) // Adds current maze score to total maze score for a win. 
      }

    }
  }

  render() {
  
  // Switch views between titles screen, starting screen, maze, loss, win, quit, and leaderboard. //

  const { title, start, stop, winner, quit, leaderboard, highscores, mazes, mazesIndex } = this.state;

  let mazeState = []
  if (title === true) { // Title screen.
    mazeState = (
      <g>
        <svg xmlns="http://www.w3.org/2000/svg">
        <foreignObject>
            <img className="game-title" alt="contra-title" height="100px" src="/contraiii_title.gif"/>
        </foreignObject>
          <text x="325" y="150" fontFamily="Monospace" fontSize="15" stroke="black" fill="black">INSPIRED</text>
          <text x="310" y="175" fontFamily="Monospace" fontSize="20" stroke="black" fill="black">MAZE GAME</text>
          <rect x="0" y="350" width="80" height="5" fill="white"/>
          <rect x="80" y="250" width="5" height="105" fill="white"/>
          <rect x="80" y="245" width="75" height="5" fill="white"/>
          <rect x="155" y="245" width="5" height="105" fill="white"/>
          <rect x="155" y="350" width="25" height="5" fill="white"/>
          <rect x="180" y="200" width="5" height="155" fill="white"/>
          <rect x="180" y="195" width="75" height="5" fill="white"/>
          <rect x="255" y="195" width="5" height="100" fill="white"/>
          <rect x="255" y="295" width="25" height="5" fill="white"/>
          <rect x="280" y="245" width="5" height="55" fill="white"/>
          <rect x="280" y="240" width="50" height="5" fill="white"/>
          <rect x="330" y="240" width="5" height="110" fill="white"/>
          <rect x="330" y="350" width="50" height="5" fill="white"/>
          <rect x="380" y="270" width="5" height="85" fill="white"/>
          <rect x="380" y="265" width="50" height="5" fill="white"/>
          <rect x="430" y="265" width="5" height="20" fill="white"/>
          <rect x="430" y="285" width="20" height="5" fill="white"/>
          <rect x="450" y="265" width="5" height="25" fill="white"/>
          <rect x="450" y="265" width="50" height="5" fill="white"/>
          <rect x="500" y="265" width="5" height="85" fill="white"/>
          <rect x="500" y="350" width="50" height="5" fill="white"/>
          <rect x="550" y="160" width="5" height="195" fill="white"/>
          <rect x="550" y="155" width="80" height="5" fill="white"/>
          <rect x="630" y="155" width="5" height="195" fill="white"/>
          <rect x="630" y="350" width="60" height="5" fill="white"/>
          <rect x="690" y="347" width="10" height="10" fill="red"/>
          <rect x="295" y="400" width="120" height="40" fill="black"/>
          <text x="310" y="425" fontFamily="Monospace" fontSize="15" fill="silver" className="play-button" onClick={this.play}> START GAME </text>
        </svg>
      </g>
    )
  } else if (title === false && start === false && stop === false && winner === false && quit === false && leaderboard === false) { // Start screen.
    mazeState = (
      <g>
        <svg xmlns="http://www.w3.org/2000/svg">
            <rect x="45" y="35" width="70" height="35" fill="black"/>
            <text x="55" y="58" fontFamily="Monospace" fontSize="15" fill="silver" 
              onClick={this.start} className="start-button"> START </text>
              <text x="260" y="250" fontFamily="Monospace" fontSize="45" stroke="black" fill="red">LEVEL {mazesIndex + 1}</text>
        </svg>
      </g>
    )
  } else if (title === false && start === true && stop === false && winner === false && quit === false && leaderboard === false) { // Draw maze.
      mazeState = mazes[mazesIndex].map((rect, index) => {
          return <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} fill={rect.fill} key={index}/>
      })
  } else if (title === false && start === true && stop === true && winner === false && quit === false && leaderboard === false) { // Loss.
    mazeState = (
      <g>
        <svg xmlns="http://www.w3.org/2000/svg">
          <text x="140" y="250" fontFamily="Monospace" fontSize="75" stroke="red" fill="black">GAME OVER</text>
          <rect x="300" y="300" width="85" height="40" fill="black"/>
          <text x="310" y="325" fontFamily="Monospace" fontSize="15" fill="silver" 
          onClick={this.restartMaze} className="restart-button"> RESTART </text>
        </svg>
      </g>
    )
  } else if (title === false && start === true && stop === false && winner === true && quit === false && leaderboard === false) { // Win.
    mazeState = (
      <g>
        <svg xmlns="http://www.w3.org/2000/svg">
          <text x="60" y="250" fontFamily="Monospace" fontSize="50" stroke="red" fill="black">MISSION ACCOMPLISHED</text>
          <rect x="290" y="300" width="120" height="40" fill="black"/>
          <text x="305" y="325" fontFamily="Monospace" fontSize="15" fill="silver" 
          onClick={this.nextMaze} className="next-maze-button"> NEXT LEVEL </text>
        </svg>
      </g>
    )
  } else if (quit === true && leaderboard === false) { // Quit.
    mazeState = (
      <g>
      <svg xmlns="http://www.w3.org/2000/svg">
        <text x="75" y="230" fontFamily="Monospace" fontSize="60" stroke="red" fill="black">CONGRATULATIONS!</text>
        <text x="165" y="280" fontFamily="Menlo" fontSize="20" stroke="black" fill="black">Your score for this session was {this.state.score}.</text>
        <foreignObject>
            <form>
              <input onChange={this.savePlayerName} className="player-name-input" type="text" maxlength="15" placeholder="Type player name."/>
              <input onClick={this.addHighScore} disabled={this.state.submitted === true} className="submit-player-name" type="button" value="SUBMIT"/>
            </form>
        </foreignObject>
        <rect x="420" y="345" width="135" height="40" fill="black"/>
        <text x="440" y="370" fontFamily="Monospace" fontSize="15" fill="silver" 
          onClick={this.leaderboard} className="leaderboard-button"> LEADERBOARD </text>
      </svg>
    </g>
    )
  } else if (quit === true && leaderboard === true) { // Leaderboard.
    mazeState = (
      <g>
        <svg xmlns="http://www.w3.org/2000/svg">
          <text x="200" y="70" fontFamily="Monospace" fontSize="45" stroke="red" fill="black">LEADERBOARD</text>
          {highscores.map((highscore, index) => {
            let yCalc = index*30+125;
            return (
              <g key={index}>
                <text x="190" y={yCalc} fontFamily="Monospace" fontSize="20" stroke="black" fill="black">{this.state.highscores[index].player}</text>
                <text x="400" y={yCalc} fontFamily="Monospace" fontSize="20" stroke="black" fill="black">{this.state.highscores[index].score} pts</text>
              </g>
            )
          })}
        </svg>
      </g>
    )
  }

  // Logic for which song to play. Result will pass onto AudioPlayer component so logic isn't done in the child component.

  const songs = ['/contraiii_groundzero.mp3', '/contraiii_neokobesteelfactory.mp3', '/contraiii_roadwarriors.mp3', '/contraiii_invasion.mp3']
  
  let music = ""
  if (start === true && stop === false && winner === false) { // During maze levels.
    music = songs[this.state.mazesIndex]
  } else if (start === true && stop === true && winner === false) { // Loss.
    music = "/contraiii_casualtyofwar.mp3"
  } else if (start === true && stop === false && winner === true) { // Win.
    music = "/contraiii_missionaccomplished.mp3"
  };

  // SVG ATTRIBUTES: //
    // DIMENSIONS OF DRAWING AREA.

  // SVG: RECTANGLE ATTRIBUTES: //
    // X & Y = COORDINATES | WIDTH & HEIGHT = DIMENSIONS FROM STARTING COORDS | STROKE = BORDER | FILL = COLOUR //

    return (
      <div className="App">

        <h2>Maze Madness</h2>
        <button onClick={this.restartEntireGame} type="button" className="new-game-button">New Game</button>
        <button onClick={this.quitGame} type="button" className="quit-game-button">Quit Game</button>
        
        <AudioPlayer song={music} start={this.state.start} stop={this.state.stop} winner={this.state.winner} quit={this.state.quit} leaderboard={this.state.leaderboard} mazesIndex={this.state.mazesIndex}/>
        
        <div id="Maze" onMouseMove={this.handleMouseMove}>
          <g>
            <svg width="700" height="500" xmlns="http://www.w3org/2000/svg">
                {mazeState}
            </svg>
          </g>
        </div>

        <h4 id="Coordinates"></h4>
        <div>
          <h3>Maze Score: {this.state.timer}</h3>
          <h3>Total Score: {this.state.score}</h3>
        </div>

        <h4 className="copyright">© All imagery and game music rights belong to Konami. Code by Thuy Doan.</h4>

      </div>
    );
  }
}

export default App;