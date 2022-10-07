import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './Home';
import Welcome from './Welcome'
import ArtistInfo from './ArtistInfo';
import NavBar from './NavBar'
import Favorites from './Favorites';
import Genres from './Genres';
import Tracks from './Tracks';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

function App() {
  const navigate = useNavigate()
  const location = useLocation();
  console.log(location.pathname)

  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
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
      setAccessToken(data.access_token)
    })
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

  function displayGenreArtist(e){
    const genreList = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken,
      },
    };
    fetch(`https://api.spotify.com/v1/recommendations?limit=8&market=US&seed_genres=${e.target.innerText}`, genreList)
    .then(res => res.json())
    .then(data => console.log(data.tracks, 'hello'))
    navigate(`/genre/${e.target.innerText}`)
  }

  const displayResults = results.filter(result => {
    if(searchInput.length > 0){
      return result.name.toLowerCase().includes(searchInput.toLowerCase())
    } else {
      return 0;
    }
  })

  const handleHide = () => {
    setSearchInput('')
}

  return (
    <>
      {location.pathname === "/" ?  null : <NavBar search={searchInput} setSearch={searchArtists} results={displayResults} handleClick={handleHide}/>}
      <Routes>
        <Route exact path="/home" element={<Home token={accessToken} handleClick={displayGenreArtist}/>}>
        </Route>
        <Route exact path="/" element={<Welcome />}>
        </Route>
        <Route exact path="/artist/:id" element={<ArtistInfo token={accessToken}/>}>
        </Route>
        <Route exact path="/genre/:id" element={<Genres token={accessToken}/>}></Route>
        <Route exact path="/album/:id" element={<Tracks token={accessToken}/>}></Route>
        <Route exact path="/favorites" element={<Favorites />}>
        </Route>
      </Routes>
    </>
  );
}

export default App;
