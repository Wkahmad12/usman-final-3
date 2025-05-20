import React, { useState, useEffect } from "react";
import axios from "axios";
import './Song.css';

const CLIENT_ID = "f36eeea65fb34a1ab3c23a9493c4cb84";
const CLIENT_SECRET = "ed081527beb64c9694fb1bcc2eba81e4";

const SpotifyPage = () => {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .post("https://accounts.spotify.com/api/token", "grant_type=client_credentials", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`,
        },
      })
      .then((response) => {
        setToken(response.data.access_token);
        fetchTracks(response.data.access_token);
      })
      .catch((error) => console.error("Error fetching token", error));
  }, []);

  const fetchTracks = (accessToken) => {
    axios
      .get("https://api.spotify.com/v1/browse/new-releases", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setTracks(response.data.albums.items);
      })
      .catch((error) => console.error("Error fetching tracks", error));
  };

  const searchTracks = () => {
    if (!searchQuery) return;
    axios
      .get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTracks(response.data.tracks.items);
      })
      .catch((error) => console.error("Error searching tracks", error));
  };

  return (
    <div className="container">
      <h1>Song Hub</h1>
      <input
        type="text"
        placeholder="Search for a song..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-box"
      />
      <button onClick={searchTracks} className="search-button">Search</button>
      <div className="grid">
        {tracks.map((track) => (
          <div key={track.id} className="card" onClick={() => setSelectedTrack(track)}>
            <img src={track.album?.images[0]?.url} alt={track.name} />
            <h2>{track.name}</h2>
            <p>{track.artists[0].name}</p>
          </div>
        ))}
      </div>
      {selectedTrack && (
        <div className="modal" onClick={() => setSelectedTrack(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setSelectedTrack(null)}>&times;</span>
            <h2>{selectedTrack.name}</h2>
            <iframe
              src={`https://open.spotify.com/embed/track/${selectedTrack.id}`}
              width="300"
              height="380"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifyPage;