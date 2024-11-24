import axios from 'axios';
import { useState, useEffect } from 'react';

function Links() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [resolutions, setResolutions] = useState([]);
  const [selectedResolution, setSelectedResolution] = useState("");
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [linkId, setLinkId] = useState(null);
  const [link, setLink] = useState(null);

  const fetchCategories = async() => {
    // Get all categories
    await axios.get('http://localhost:5000/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  };

  const fetchResolutions = async() => {
    await axios.get(`http://localhost:5000/api/resolutions?category=${selectedCategory}`)
      .then(response => setResolutions(response.data))
      .catch(error => console.error('Error fetching resolutions:', error));
  };

  const fetchGames = async() => {
    await axios.get(`http://localhost:5000/api/games?category=${selectedCategory}&resolution=${selectedResolution}`)
      .then(response => setGames(response.data))
      .catch(error => console.error('Error fetching games:', error));
  };

  const fetchLinkId = async() => {
    await axios.get(`http://localhost:5000/api/link_id?category=${selectedCategory}&resolution=${selectedResolution}&game_name=${selectedGame}`)
    .then(response => setLinkId(response.data))
    .catch(error => console.error('Error fetching link id:', error));
  };

  const fetchLinkByLinkId = async() => {
    await axios.get(`http://localhost:5000/api/link?link_id=${linkId}`)
      .then(response => setLink(response.data))
      .catch(error => console.error('Error fetching link:', error));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if(selectedCategory!==null){
        fetchResolutions();
    }
  },[selectedCategory]);

  useEffect(() => {
    if(selectedResolution!==null){
        fetchGames();
    }
  },[selectedResolution]);

  useEffect(() => {
    if(selectedGame!==null){
        fetchLinkId();
    }
  },[selectedGame]);

  useEffect(() => {
    if(linkId!==null){
        fetchLinkByLinkId();
    }
  }, [linkId])


  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedResolution("");
    setSelectedGame("");
    setLink(null);
  };

  const handleResolutionChange = (event) => {
    setSelectedResolution(event.target.value);
    setSelectedGame("");
    setLink(null);
  };

  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
    setLink(null);
  };

  const handleOpenLink = () => {
    if (link) {
      window.open(link, "_blank");
    }
  };


  return (
    <div className='app-container'>
      {/* Dropdown to select sketch */}
      <div className="dropdown-container">
        <label htmlFor="category-select">Choose a Category: </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>-- Categories --</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
                {category}
            </option>
          ))}
        </select>
      </div>
      <div className="dropdown-container">
        <label htmlFor="resolution-select">Choose a Resolution: </label>
        <select
          id="resolution-select"
          value={selectedResolution}
          onChange={handleResolutionChange}
        >
          <option value="" disabled>-- Resolutions --</option>
          {resolutions.map((resolution, index) => (
            <option key={index} value={resolution}>
                {resolution}
            </option>
          ))}
        </select>
      </div>
      <div className="dropdown-container">
        <label htmlFor="game-select">Choose a Game: </label>
        <select
          id="game-select"
          value={selectedGame}
          onChange={handleGameChange}
        >
          <option value="" disabled>-- Games --</option>
          {games.map((game, index) => (
            <option key={index} value={game}>
                {game}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleOpenLink}
        disabled={!link}
        className="open-link-button"
        style={{marginTop:"20px"}}
      >
        {link ? "Open Game Link" : "Link not available"}
      </button>
    </div>
  );
}

export default Links;
