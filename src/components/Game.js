import React, { useState } from 'react';
import "../css/Game.css";

const Game = () => {
    const [player, setPlayer] = useState(0);
    const [computer, setComputer] = useState(0);
    const [playerChoosing, setPlayerChoosing] = useState("rock");
    const [computerChoosing, setComputerChoosing] = useState("rock");
    const [result, setResult] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState("");

    const choices = ["Rock", "Paper", "Scissors"];

    const game = (playerChoice, computerChoice) => {
        if (playerChoice === computerChoice) {
            return "It's a draw!";
        }
        if (
            (playerChoice === "Rock" && computerChoice === "Scissors") ||
            (playerChoice === "Paper" && computerChoice === "Rock") ||
            (playerChoice === "Scissors" && computerChoice === "Paper")
        ) {
            return "Player wins!";
        }
        return "Computer wins!";
    };

    const playerClick = (value) => {
        if (gameOver) return;

        setPlayerChoosing(value);
        computerClick(value);
    };

    const computerClick = (playerChoice) => {
        if (gameOver) return;

        const computerChoose = choices[Math.floor(Math.random() * choices.length)];
        setComputerChoosing(computerChoose);
        const gameResult = game(playerChoice, computerChoose);
        setResult(gameResult);

        if (gameResult === "Player wins!") {
            setPlayer(prev => {
                const newScore = prev + 1;
                if (newScore >= 5) {
                    setGameOver(true);
                    setWinner("Player");
                    setResult("Player wins the game!");
                }
                return newScore;
            });
        } else if (gameResult === "Computer wins!") {
            setComputer(prev => {
                const newScore = prev + 1;
                if (newScore >= 5) {
                    setGameOver(true);
                    setWinner("Computer");
                    setResult("Computer wins the game!");
                }
                return newScore;
            });
        }
    };

    const reset = () => {
        window.location.reload()
    }

    const getBackgroundColor = () => {
        if (!gameOver) return "bisque";
        return winner === "Player" ? "lightblue" : "lightcoral";
    };

    return (
        <div style={{ backgroundColor: getBackgroundColor() }} className='main'>
            <div className='game-area'><h1>Rock Paper Scissors</h1>

<div className='score'>
    <div className='player-score'>Player: {player}</div>
    <div className='computer-score'>Computer: {computer}</div>
</div>

<div className='selections'>
    <button className='player'>
        <img src={`../../images/${playerChoosing}.png`} alt="/" />
    </button>
    <button className='computer'>
        <img src={`../../images/${computerChoosing}(2).png`} alt="/" />
    </button>
</div>

<div className='game'>
    {choices.map((choice, index) => (
        <button
            key={index}
            onClick={() => playerClick(choice)}
            disabled={gameOver}
        >
           <p>{choice}</p> 
        </button>
    ))}
</div>

<div className='result'>
   <p> Result: {result}</p>  
    <div className='button-div'>
        {gameOver &&
            <button className='button' style={{ width: "150px", padding: "15px", borderRadius: "10px" }} onClick={() => reset()}>Restart Game?</button>
        }
    </div>
</div></div>
            
        </div>
    );
};

export default Game;
