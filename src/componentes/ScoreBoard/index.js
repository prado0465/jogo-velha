import React from 'react';

function ScoreBoard({ scoreX, scoreO }) {
  return (
    <div className="scoreboard">
      <div>Jogador X: {scoreX}</div>
      <div>Jogador O: {scoreO}</div>
    </div>
  );
}

export default ScoreBoard;
