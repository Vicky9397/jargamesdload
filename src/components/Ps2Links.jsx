import axios from 'axios';
import { useState, useEffect } from 'react';

function Ps2Links() {
  const categories = [
    { id: 0, chValue: "a", TxtValue: "A" },
    { id: 1, chValue: "b", TxtValue: "B" },
    { id: 2, chValue: "c", TxtValue: "C" },
    { id: 3, chValue: "d", TxtValue: "D" },
    { id: 4, chValue: "e", TxtValue: "E" },
    { id: 5, chValue: "f", TxtValue: "F" },
    { id: 6, chValue: "g", TxtValue: "G" },
    { id: 7, chValue: "h", TxtValue: "H" },
    { id: 8, chValue: "i", TxtValue: "I" },
    { id: 9, chValue: "j", TxtValue: "J" },
    { id: 10, chValue: "k", TxtValue: "K" },
    { id: 11, chValue: "l", TxtValue: "L" },
    { id: 12, chValue: "m", TxtValue: "M" },
    { id: 13, chValue: "n", TxtValue: "N" },
    { id: 14, chValue: "o", TxtValue: "O" },
    { id: 15, chValue: "p", TxtValue: "P" },
    { id: 16, chValue: "q", TxtValue: "Q" },
    { id: 17, chValue: "r", TxtValue: "R" },
    { id: 18, chValue: "s", TxtValue: "S" },
    { id: 19, chValue: "t", TxtValue: "T" },
    { id: 20, chValue: "u", TxtValue: "U" },
    { id: 21, chValue: "v", TxtValue: "V" },
    { id: 22, chValue: "w", TxtValue: "W" },
    { id: 23, chValue: "x", TxtValue: "X" },
    { id: 24, chValue: "y", TxtValue: "Y" },
    { id: 25, chValue: "z", TxtValue: "Z" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [link, setLink] = useState(null);

  const fetchGames = async () => {
    if (!selectedCategory) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/games_by_letter?letter=${selectedCategory.chValue}`
      );
      setGames(response.data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const fetchGameLink = async () => {
    if (!selectedGame) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/game_link?game_id=${selectedGame.gameId}`
      );
      setLink(response.data);
    } catch (error) {
      console.error("Error fetching game link:", error);
    }
  };

  useEffect(() => {
    setGames([]);
    setSelectedGame(null);
    setLink(null);
    fetchGames();
  }, [selectedCategory]);

  useEffect(() => {
    setLink(null);
    fetchGameLink();
  }, [selectedGame]);

  const handleCategoryChange = (event) => {
    const selected = categories.find((cat) => cat.chValue === event.target.value);
    setSelectedCategory(selected);
  };

  const handleGameChange = (event) => {
    const selected = games.find((game) => game.gameId === parseInt(event.target.value));
    setSelectedGame(selected);
  };

  const handleOpenLink = () => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <div className="app-container">
      <div className="dropdown-container">
        <label htmlFor="category-select">Choose a Letter: </label>
        <select id="category-select" value={selectedCategory?.chValue || ""} onChange={handleCategoryChange}>
          <option value="" disabled>
            -- Categories --
          </option>
          {categories.map((item) => (
            <option key={item.id} value={item.chValue}>
              {item.TxtValue}
            </option>
          ))}
        </select>
      </div>

      <div className="dropdown-container">
        <label htmlFor="game-select">Choose a Game: </label>
        <select id="game-select" value={selectedGame?.gameId || ""} onChange={handleGameChange} disabled={games.length === 0}>
          <option value="" disabled>
            -- Games --
          </option>
          {games.map((game) => (
            <option key={game.gameId} value={game.gameId}>
              {game.gameName}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleOpenLink} disabled={!link} className="open-link-button" style={{ marginTop: "20px" }}>
        {link ? "Open Game Link" : "Link not available"}
      </button>
    </div>
  );
}

export default Ps2Links;