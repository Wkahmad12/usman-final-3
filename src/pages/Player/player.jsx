import React, { useEffect, useState } from 'react';
import './player.css';
import back_arrow from '../../assets/back.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [videoData, setVideoData] = useState({
        name: '',
        key: '',
        published_at: '',
        type: '',
    });

    const [movieDetails, setMovieDetails] = useState({
        title: '',
        overview: '',
        release_date: '',
        poster_path: ''
    });

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODcwYTdkOGY0MjM5ZTVjZDZhNTE1NDg0YTkzM2Q3MSIsIm5iZiI6MTc0MTI3MjM1OC42MDYwMDAyLCJzdWIiOiI2N2M5YjUyNmJkNzg2MTQ3OGIyNGMxNzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1raOPsJDm6tuIPUrXGG9Mmuip7ayAutVAnlvzNPx9xc',
        },
    };

    useEffect(() => {
        // Fetch Video Data
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(data => {
                if (data.results.length > 0) {
                    const video = data.results[0]; // Get the first video
                    setVideoData({
                        name: video.name,
                        key: video.key,
                        published_at: video.published_at,
                        type: video.type,
                    });
                }
            })
            .catch(err => console.error(err));

        // Fetch Movie Details
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then(res => res.json())
            .then(data => {
                setMovieDetails({
                    title: data.title,
                    overview: data.overview,
                    release_date: data.release_date,
                    poster_path: `https://image.tmdb.org/t/p/w500${data.poster_path}`
                });
            })
            .catch(err => console.error(err));
    }, [id]);

    return (
        <div className="player">
            <img src={back_arrow} alt="Back arrow" onClick={() => navigate(-2)} />
            <iframe
                width="90%"
                height="90%"
                src={`https://www.youtube.com/embed/${videoData.key}`}
                title="trailer"
                frameBorder="0"
                allowFullScreen
            ></iframe>
            <div className="player-info">
                <h2>{movieDetails.title}</h2>
                <img src={movieDetails.poster_path} alt={movieDetails.title} width="200" />
                <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
                <p><strong>Overview:</strong> {movieDetails.overview}</p>
                <p><strong>Published Date:</strong> {videoData.published_at?.slice(0, 10)}</p>
                <p><strong>Video Name:</strong> {videoData.name}</p>
                <p><strong>Type:</strong> {videoData.type}</p>
            </div>
        </div>
    );
};

export default Player;
