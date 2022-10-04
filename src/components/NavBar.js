import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar(){
    return (
        <div>
            <NavLink
                to='/'
                exact
                >
                Welcome
            </NavLink>
            <NavLink
                to='/home'
                exact
                >
                Home
            </NavLink>
        </div>
    )
}

export default NavBar;