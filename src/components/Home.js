import React, { useState, useEffect } from "react";
import Search from "./Search";
import GenreList from "./GenreList";
import ArtistList from "./ArtistList";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [genres, setGenres] = useState([]);
  const [results, setResults] = useState([])

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((res) => res.json())
      .then((data) => {
        setAccessToken(data.access_token);
        // getGenres(data);
      });
  }, []);

  // Get Genres
  function getGenres() {
    fetch("https://api.spotify.com/v1/browse/categories?locale=sv_US", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setGenres(data.categories.items));
  }

  // Search for artists and/or tracks - async function due to multiple fetches within function
  async function searchArtists(e) {
    setSearchInput(e.target.value);
    const artistSearch = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken,
      },
    };
    await fetch("https://api.spotify.com/v1/search?q=" + searchInput + "&type=track%2Cartist&market=US", artistSearch)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.artists.items)
        // setResults(data.tracks.items)
      });
      // console.log(results.images[2].url)
  }
  const displayResults = results.filter(result => {
    if(searchInput.length > 0){
      return result.name.toLowerCase().includes(searchInput.toLowerCase())
    } else {
      return 0;
    }
  })

 

  return (
    <div className="homeBG">
      <div className="container">
        {/* <GenreList genres={genres} /> */}
        <ArtistList results={displayResults}/>
        <Search search={searchInput} setSearch={searchArtists} />
      </div>
    </div>
  );
}

export default Home;
