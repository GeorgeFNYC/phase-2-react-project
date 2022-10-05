import React, {useState, useEffect} from "react";
import GenreList from "./GenreList";

function Home({token, handleClick}) {
  const genres = ["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock"]
  
  const [genre, setGenre] = useState(genres);

    const randomizeGenres = () => {
        for (let i = genre.length; --i;)  {
            let j = Math.floor(Math.random() * (i + 1));
            [genre[i], genre[j]] = [genre[j], genre[i]]
        }
        setGenre([...genre]);
    }

  return (
    <>
      <div className="container" style={{height : '100vh'}}>
        <GenreList genres={genre} handleClick={handleClick} handleRandom={randomizeGenres}/>
      </div>
    </>
  );
}

export default Home;


