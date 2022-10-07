import React from 'react';
import { NavLink } from 'react-router-dom';
import Search from './Search'
import ArtistList from './ArtistList';

function NavBar({search, setSearch, results, handleClick}){
    return (
        <div className='navBar'>
            <Search search={search} setSearch={setSearch}/>
            <NavLink className={"links"}
                to='/home'
                >
                Home
            </NavLink>
            <NavLink className={"links"}
                to='/favorites'
                >
                My favorites
            </NavLink>
            <h2 id="userInfo">Heather</h2>
            <ArtistList results={results} handleClick={handleClick}/>
        </div>
    )
}

export default NavBar;