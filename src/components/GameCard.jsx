import React, {useState, useEffect} from "react";
import fallbackImg from "../assets/fallback_image.jpg";
import axios from 'axios';

function GameCard({ game }) {

  const [link, setLink] = useState(null);

    const fetchGameLink = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/game_link?game_id=${id}`
      );
      setLink(response.data)
    } catch (error) {
      console.error("Error fetching game link:", error);
      return null
    }
  };

  const handleDownloadClick = () => {
    if(link){
      window.open(link, "_blank");
    }
  }

  return (
    <div className="game-card">
      <img 
        src={`https://raw.githubusercontent.com/xlenore/ps2-covers/main/covers/default/${game.serial}.jpg`} 
        alt={game.gameName} 
        className="game-cover" 
        onError={(e) => { 
          e.target.src = fallbackImg; 
          e.target.style.objectFit = "contain"; 
        }} 
      />
      <div className="game-info">
        <div className="card-text">{game.gameName}</div>
        {
          link === null ? 
          <button 
            className="btn btn-primary" 
            onClick={() => {
              fetchGameLink(game.gameId)
            }}
          >Get Link</button>:
          <button 
        className="btn btn-success" 
        onClick={handleDownloadClick}>Download</button>
        }
      </div>
    </div>
  );
}

export default GameCard;