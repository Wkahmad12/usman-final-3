import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import hero from '../../assets/hero.jpeg';
import TitleCards from '../../components/TitleCards/TitleCards';
import axios from 'axios';  // Make sure axios is installed: `npm install axios`

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');
  const [searchQuery, setSearchQuery] = useState('');  // State for the search query
  const [searchResults, setSearchResults] = useState([]);  // State for search results

  // Function to fetch movies based on search query
  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: 'YOUR_API_KEY', // Replace with your API key
          query: query,
          language: 'en-US',
        }
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results', error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    }
  }, [searchQuery]);

  const openModal = () => {
    setTrailerKey('d1JdAPwT9K0');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTrailerKey('');
  };

  return (
    <div className='home'>
      <Navbar setSearchQuery={setSearchQuery} />
      <div className='hero'>
        <img src={hero} alt="Hero" className='hero_img' />
      </div>

      {/* If search results are available, display them */}
      {searchQuery && searchResults.length > 0 ? (
        <div className="search-results">
          <h2>Search Results:</h2>
          <div className="results-list">
            {searchResults.map(movie => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="hero-title">
          <p>
            "The Avengers" (2012) is a superhero film directed by Joss Whedon, bringing together Marvel's iconic heroes—Iron Man, Captain America, Thor, Hulk, Black Widow, and Hawkeye...
          </p>
          <div className="hero-button">
            <button className='play' onClick={openModal}>Play</button>
            <button className='info'>More Info</button>
          </div>
        </div>
      )}

      {/* Title Cards Sections */}
      <TitleCards title={"Now Playing"} category={"now_playing"} />
      <div className='more-card'>
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on Movie Hub"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Picks For You"} category={"now_playing"} />
      </div>

      <Footer />

      {/* Modal for YouTube trailer */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>X</button>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Avengers 2012 Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
