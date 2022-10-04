import React from 'react';
import { NavLink } from 'react-router-dom';
import Search from './Search'
import ArtistList from './ArtistList';

function NavBar({search, setSearch, results}){
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
            <h4 id="userInfo">Username</h4>
            <ArtistList results={results}/>
        </div>
    )
}

export default NavBar;