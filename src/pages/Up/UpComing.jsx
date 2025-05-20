import React, { useEffect, useState } from 'react';
import './UpComing.css';


const UpComing = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODcwYTdkOGY0MjM5ZTVjZDZhNTE1NDg0YTkzM2Q3MSIsIm5iZiI6MTc0MTI3MjM1OC42MDYwMDAyLCJzdWIiOiI2N2M5YjUyNmJkNzg2MTQ3OGIyNGMxNzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1raOPsJDm6tuIPUrXGG9Mmuip7ayAutVAnlvzNPx9xc'
      }
    };

    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
      .then((res) => res.json())
      .then((data) => {
        const moviePromises = data.results.map((movie) =>
          fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`, options)
            .then((videoRes) => videoRes.json())
            .then((videoData) => {
              movie.trailer = videoData.results.find((video) => video.site === 'YouTube');
              return movie;
            })
        );

        Promise.all(moviePromises).then((moviesWithTrailers) => {
          setMovies(moviesWithTrailers);
          setFilteredMovies(moviesWithTrailers);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const openModal = (trailerKey) => {
    setTrailerKey(trailerKey);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTrailerKey('');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="upcoming-container">
      <h2 className="upcoming-title">Upcoming Movies</h2>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="movie-list">
        {filteredMovies.map((movie) => (
          <div className="movie-card" key={movie.id} onClick={() => movie.trailer && openModal(movie.trailer.key)}>
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-details">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-release-date">{new Date(movie.release_date).toLocaleDateString()}</p>
              <p className="movie-overview">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for YouTube trailer */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>X</button>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube trailer"
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

export default UpComing;
