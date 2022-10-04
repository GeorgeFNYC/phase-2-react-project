import React, { useState, useEffect } from "react";
import GenreList from "./GenreList";
import NavBar from './NavBar'



function Home({genres}) {
  return (
    <div>
      {/* <NavBar search={searchInput} setSearch={searchArtists} results={displayResults}/> */}
      <div className="container">
        <GenreList genres={genres} />
      </div>
    </div>
  );
}

export default Home;
