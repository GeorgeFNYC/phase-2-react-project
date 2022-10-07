import React, {useState, useEffect} from 'react'
import {useNavigate, useParams, useLocation} from 'react-router-dom'

function Genres({token}){
    const [artistByGenre, setArtistByGenre] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const state = location.state

    // console.log(state)
    useEffect(() => {
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
    }, [token, id])

    return(
        <div className='container' style={{marginTop: '150px'}}>
            {artistByGenre.slice(0,20).map(artist => {
            return (
                <div className='col-md-3' key={artist.id} onClick={() => {navigate(`/artist/${artist.id}`, {state: {artist}})}} >
                    <div className='artistCards'>
                       {artist.images ? <img className="genreArtist" src={artist.images[2].url} alt="artist" /> : <img className="genreArtist" src='https://www.pngkit.com/png/detail/353-3536328_generic-placeholder-image-question-and-answer-signs.png' alt="artist" />}
                        <p className='artistName'>{artist.name}</p>
                    </div>
                </div>
                ) 
            })} 

        </div>
    )
}

export default Genres;

