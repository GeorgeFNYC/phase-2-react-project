import React, {useState, useEffect, useRef} from "react"
import {useLocation, useNavigate, useParams, NavLink} from 'react-router-dom'
import { format } from 'date-fns'

function ArtistInfo({token}){
    const [artistAlbum, setArtistAlbum] = useState([])
    const [artistConcerts, setArtistConcerts] = useState([])
    const[avail, setAvail] = useState()
    const {id} = useParams()
    const location = useLocation();
    const state = location.state
    const navigate = useNavigate()

    const ref = useRef(null)

    const click = () => {
        if(artistConcerts.length > 0) {
            ref.current?.scrollIntoView({behavior:"smooth"})
        }else {
            // console.log('Nothing')
            console.log(ref.current.innerText = 'nothing')
        }
    }
    console.log(ref)

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
        fetch(`https://api.seatgeek.com/2/events/?q=${state.result ? state.result.name : state.artist.name}&client_id=MjkxNzMwOTl8MTY2NDk4MTI0Ny4wNTQ4ODM1`)
        .then(res => res.json())
        .then(data => setArtistConcerts(data.events))
    },[token, id, state])    
    console.log(artistConcerts, 'Hello')

    return (
        <div className="container ">
            {state ? 
            
            <div className="divArtist">
                
                <div id="artistPicDiv">
                    <img id="artistBanner" src={!state.result ? state.artist.images[0].url : state.result.images[0].url} alt=""/>
                    <h1 id="artistName" >{!state.result ? state.artist.name : state.result.name}</h1>
                </div>
                
                <div id="artistDisc">
                    {artistAlbum.map(album => {
                        return <img onClick= {() => {navigate(`/album/${album.id}`, {state: {album}})}} key={album.id} className='albums' src={album.images[1].url} alt="albums" />
                    })}
                </div>
                <div  style={{textAlign: 'center', marginTop: '5px'}}>
                    <a ref = {ref} className = 'scrollBtn' onClick={click}>
                        {`See if ${!state.result ? state.artist.name : state.result.name} is touring now`}
                        </a>
                    <div><i className="arrow down"></i></div>
                </div>


                <div ref={ref} id="concerts">
                    {artistConcerts.map(concert => {
                        return  <div className = 'col-md-4 tourDates' key = { concert.id }>
                                    <h2>{concert.venue.name}</h2>
                                    <hr id="myLine"/>
                                    <h3>{concert.venue.display_location}</h3>
                                    <h4>{format(new Date(concert.datetime_local), 'yyyy/MM/dd')}</h4>
                                    <a id = "ticketBtn" target='_blank' href={concert.url}>{'Buy tickets \u2192'}</a> 
                                </div>
                        //  return <li key={concert.id} style={{color:'white'}}>{concert.short_title}</li>
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

