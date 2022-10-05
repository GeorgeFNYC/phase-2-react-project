import React, {useState, useEffect} from 'react'
import {useNavigate, useParams, useLocation} from 'react-router-dom'

function Genres({token}){
    const [artistByGenre, setArtistByGenre] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const state = location.state

    useEffect(() => {
        if(!state){
            const artistsGenre = {
                method: 'GET',
                headers: {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + token
                }
            }
            fetch(`https://api.spotify.com/v1/search?q=genre:${id}&type=artist`,artistsGenre)
            .then(res => res.json())
            .then(data => setArtistByGenre(data.artists.items))
        }
    }, [token, id, state])

    return(
        <div>{artistByGenre.slice(0,9).map(artist => {
            return (
                <div key={artist.id} >
                    <img src={artist.images[1].url} alt="artist" />
                    <p>{artist.name}</p>
                </div>
            )
        })}</div>
    )
}

export default Genres;


//onClick={() => {navigate(`/artist/${artist.id}`, {state: {artist}})}}