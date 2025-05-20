import React, { useEffect, useState } from 'react';
import './TV.css';

const TV = () => {
  const [tvShows, setTvShows] = useState([]);
  const [filteredTvShows, setFilteredTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTvShows = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODcwYTdkOGY0MjM5ZTVjZDZhNTE1NDg0YTkzM2Q3MSIsIm5iZiI6MTc0MTI3MjM1OC42MDYwMDAyLCJzdWIiOiI2N2M5YjUyNmJkNzg2MTQ3OGIyNGMxNzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1raOPsJDm6tuIPUrXGG9Mmuip7ayAutVAnlvzNPx9xc'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options);
        const data = await response.json();

        if (data.results) {
          setTvShows(data.results);
          setFilteredTvShows(data.results); // Initially show all results
        } else {
          throw new Error('Invalid API response structure');
        }
      } catch (err) {
        console.error('Error fetching TV shows:', err);
        setError('Failed to load TV shows.');
      } finally {
        setLoading(false);
      }
    };

    fetchTvShows();
  }, []);

  const fetchTrailer = async (id, mediaType) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/videos?language=en-US`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODcwYTdkOGY0MjM5ZTVjZDZhNTE1NDg0YTkzM2Q3MSIsIm5iZiI6MTc0MTI3MjM1OC42MDYwMDAyLCJzdWIiOiI2N2M5YjUyNmJkNzg2MTQ3OGIyNGMxNzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1raOPsJDm6tuIPUrXGG9Mmuip7ayAutVAnlvzNPx9xc'
          }
        }
      );

      const data = await response.json();
      const trailer = data.results.find((vid) => vid.type === 'Trailer' && vid.site === 'YouTube');

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } else {
        setTrailerUrl('');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
      setTrailerUrl('');
    }
  };

  const openModal = (show) => {
    setSelectedShow(show);
    fetchTrailer(show.id, show.media_type);
  };

  const closeModal = () => {
    setSelectedShow(null);
    setTrailerUrl('');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setFilteredTvShows(tvShows); // Show all shows if search is cleared
    } else {
      setFilteredTvShows(
        tvShows.filter((show) =>
          (show.title || show.name).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="tv-container">
      <div className="top-bar">
        {/* Back Button */}
        <button className="back-button" onClick={() => window.history.back()}>Back</button>
        
        {/* Search input on the right */}
        <input
          type="text"
          placeholder="Search for a movie or TV show"
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      <h1>Trending TV Shows & Movies</h1>

      <ul className="tv-show-list">
        {filteredTvShows.map((show) => (
          <li key={show.id} className="tv-show-item" onClick={() => openModal(show)}>
            <img
              src={show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : 'no-poster-available.jpg'}
              alt={show.title || show.name}
              className="tv-show-poster"
              onError={(e) => { e.target.src = 'no-poster-available.jpg'; }} // Fallback for broken images
            />
            <div className="tv-show-info">
              <h3>{show.title || show.name}</h3>
              <p>{show.release_date || show.first_air_date || 'N/A'}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for trailer and details */}
      {selectedShow && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedShow.title || selectedShow.name}</h2>
            <p><strong>Release Date:</strong> {selectedShow.release_date || selectedShow.first_air_date || 'N/A'}</p>
            <p><strong>Overview:</strong> {selectedShow.overview}</p>

            {/* YouTube Trailer */}
            {trailerUrl ? (
              <iframe
                width="100%"
                height="400"
                src={trailerUrl}
                title="YouTube Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <p>No trailer available.</p>
            )}

            {/* Watch Full Movie on FlixHQ */}
            {selectedShow.id ? (
              <div className="movie-buttons">
                <a href={`https://flixhq.ws/watch/${selectedShow.id}`} target="_blank" rel="noopener noreferrer">
                  <button className="watch-full-movie">Watch Full Movie</button>
                </a>
                <a href={`https://flixhq.ws/open/${selectedShow.id}`} target="_blank" rel="noopener noreferrer">
                  <button className="open-full-movie">Open Full Movie</button>
                </a>
              </div>
            ) : (
              <p>Streaming link not available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TV;
