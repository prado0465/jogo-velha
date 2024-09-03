import React, { useState } from 'react';
import Board from "../componentes/Board/index";

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, Draw: 0 });

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  function handleClick(i) {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    // Se houver um vencedor ou a célula já estiver preenchida, retornar sem fazer nada
    if (winner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);

    // Atualizar o placar
    const newWinner = calculateWinner(squares);
    if (newWinner) {
      const newScore = { ...score };
      newScore[newWinner] += 1;
      setScore(newScore);
    } else if (squares.every(square => square)) {
      const newScore = { ...score, Draw: score.Draw + 1 };
      setScore(newScore);
    }
  }

  function handleRestart() {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  }

  return (
    <div className="game">
      <div className="game-info">
        <div className="scoreboard">
          <div>Placar</div>
          <div>X: {score.X}</div>
          <div>O: {score.O}</div>
          <div>Empates: {score.Draw}</div>
        </div>
        <div>{winner ? 'Vencedor: ' + winner : 'Próximo jogador: ' + (xIsNext ? 'X' : 'O')}</div>
        <button onClick={handleRestart}>Reiniciar Jogo</button>
      </div>
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
