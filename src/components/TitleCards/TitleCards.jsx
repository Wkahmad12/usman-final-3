import React, { useEffect, useState, useRef } from 'react'; // Added useRef import
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  
  const [apiData, setApiData] = useState([]);
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODcwYTdkOGY0MjM5ZTVjZDZhNTE1NDg0YTkzM2Q3MSIsIm5iZiI6MTc0MTI3MjM1OC42MDYwMDAyLCJzdWIiOiI2N2M5YjUyNmJkNzg2MTQ3OGIyNGMxNzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1raOPsJDm6tuIPUrXGG9Mmuip7ayAutVAnlvzNPx9xc'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(data => setApiData(data.results)) // Corrected to `data.results`
      .catch(err => console.error(err));
  }, [category]); // Adding `category` to the dependency array so the effect re-runs if it changes

  return (
    <div className="titlecard">
      <h2>{title || "Popular On Movie Hub"}</h2> {/* Optionally use the title prop if provided */}
      <div className="card-list">
        {apiData.map((card) => (
          <Link to={`/player/${card.id}`} className="card" key={card.id}> {/* Using `card.id` as key */}
            <img 
              src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`} 
              alt={card.original_title || "Movie thumbnail"} /> {/* Fallback alt text */}
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
