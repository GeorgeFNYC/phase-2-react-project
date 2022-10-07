import React, {useState, useEffect} from 'react'

function Favorites({favorites}){
    return <div style = { {backgroundColor: 'rgba(24, 33, 38, 0.7)' , height: '94vh'} }className='container'>
        <ol >
        {favorites.map(fav => {
        return <li className='myFavorites'>{fav}</li>
    })} </ol></div>
}

export default Favorites;