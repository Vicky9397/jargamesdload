import React, {useState, useEffect} from "react";

function GameCard({ game }) {

  return (
    <div className="game-card">
      <img src={`https://raw.githubusercontent.com/xlenore/ps2-covers/main/covers/default/${game.serial}.jpg`} sizes="512x736" alt={game.gameName} className="game-cover" />
      <div className="game-info">
        <h3>{game.gameName}</h3>
        <p>ID: {game.gameId}</p>
      </div>
    </div>
  );
}

export default GameCard;