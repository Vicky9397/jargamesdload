import React, {useState, useEffect} from "react";

function GameCard({ game }) {
    const { gameName, gameId, Serial } = game;
  const coverUrl = `https://raw.githubusercontent.com/xlenore/ps2-covers/main/covers/default/${Serial}.jpg`;

  return (
    <div className="game-card">
      <img src={coverUrl} alt={gameName} className="game-cover" />
      <div className="game-info">
        <h3>{gameName}</h3>
        <p>ID: {gameId}</p>
      </div>
    </div>
  );
}

export default GameCard;