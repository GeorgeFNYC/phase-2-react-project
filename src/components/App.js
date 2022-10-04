// import logo from './logo.svg';
// import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home';
import Welcome from './Welcome'
import ArtistInfo from './ArtistInfo';
import NavBar from './NavBar'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

function App() {
  const location = useLocation();
  console.log(location.pathname)

  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [genres, setGenres] = useState([]);
  const [results, setResults] = useState([])
  
  const getGenres = async () => {
    let req = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds",{
        method: "GET",
        headers: {
          "Accept" : "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken,
        },
      }
    )
    let res = await req.json()
    setGenres(res.categories.items)
  }
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
      setAccessToken(data.access_token)
    })
    
    getGenres();
  }, [])


    // Search for artists and/or tracks - async function due to multiple fetches within function
  function searchArtists(e) {
    setSearchInput(e.target.value);
    const artistSearch = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken,
      },
    };
    fetch("https://api.spotify.com/v1/search?q=" + searchInput + "&type=track%2Cartist&market=US", artistSearch)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.artists.items)
        // setResults(data.tracks.items)
      });
  }

  const displayResults = results.filter(result => {
    if(searchInput.length > 0){
      return result.name.toLowerCase().includes(searchInput.toLowerCase())
    } else {
      return 0;
    }
  })


  return (
    <div  className="homeContainer">
      {location.pathname === "/" ?  null : <NavBar search={searchInput} setSearch={searchArtists} results={displayResults}/>}
      <Routes>
        <Route exact path="/home" element={<Home genres={genres}/>}>
        </Route>
        <Route exact path="/" element={<Welcome />}>
        </Route>
        <Route path="/artist/:id" element={<ArtistInfo />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
