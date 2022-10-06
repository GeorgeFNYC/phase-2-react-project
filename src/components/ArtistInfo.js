import React, {useState, useEffect, useRef} from "react"
import {useLocation, useParams} from 'react-router-dom'

function ArtistInfo({token}){
    const [artistAlbum, setArtistAlbum] = useState([])
    const [artistConcerts, setArtistConcerts] = useState([])
    const {id} = useParams()
    const location = useLocation();
    const state = location.state

    if(state === state.result){
        alert("Hello")
    }
    console.log(state)

    const ref = useRef(null)

    const click = () => {
        ref.current?.scrollIntoView({behavior:"smooth"})
    }

    useEffect(() => {
            const albumsOptions = {
                method: 'GET',
                headers: {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + token
                }
            }
            fetch(`https://api.spotify.com/v1/artists/${id}/albums?market=US`, albumsOptions)
            .then(res => res.json())
            .then(data => setArtistAlbum(data.items))
        // fetch(`https://api.seatgeek.com/2/events/?q=${state ? state.result.name : state.artist.name}&client_id=MjkxNzMwOTl8MTY2NDk4MTI0Ny4wNTQ4ODM1`)
        // .then(res => res.json())
        // .then(data => setArtistConcerts(data.events))
    },[token, id, state])    
    console.log(artistAlbum)

    return (
        <div className="container ">
            {state ? 
            
            <div className="divArtist">
                
                <div id="artistPicDiv">
                    <img id="artistBanner" src={state ? state.artist.images[0].url : state.result.images[0].url} alt=""/>
                    <h1 id="artistName"style={{color: "red"}}>{state ? state.artist.name : state.result.name}</h1>
                </div>
                
                <div id="artistDisc">
                    {artistAlbum.map(album => {
                        return <img key={album.id} className='albums' src={album.images[1].url} alt="albums" />
                    })}
                </div>
                <div>
                    <button onClick={click}>Scroll</button>
                </div>
                <div ref={ref}id="concerts">
                    {artistConcerts.map(concert => {
                        return <li key={concert.id} style={{color:'white'}}>{concert.short_title}</li>
                    })}
                </div>
            </div>
            : 
            <h1 style={{color: 'red', fontSize:'2em'}}>Woops</h1>
            }
        </div>
    )
}

export default ArtistInfo;

