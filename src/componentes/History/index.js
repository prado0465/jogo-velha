import React from 'react';

function History({ history, jumpTo }) {
  return (
    <ol>
      {history.map((step, move) => {
        const desc = move ? 'Ir para jogada #' + move : 'Reiniciar jogo';
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        );
      })}
    </ol>
  );
}

export default History;
