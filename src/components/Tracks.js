import React, {useState, useEffect} from 'react'
import {useParams, useLocation, useNavigate} from 'react-router-dom'
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { set } from 'date-fns';


function Tracks({ token, handleFavorites }) {
    const[albumTracks, setAlbumTracks] = useState([])
    // const[dbUser, setDbUser] = useState([])
    const {id} = useParams()
    const location = useLocation();
    const state = location.state
    console.log(state)
    // const usersCollectionRef = collection(db, "users");

    async function getTrack (e) {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '68d338d4e4msh2a64b1c1240872ep17cf20jsn3b7150a8899a',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      };
      
      await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${e.target.innerText}`, options)
        .then(response => response.json())
        .then(response => {
          const example = response.data.find(track=>{
            return track.artist.name === state.album.artists[0].name

          })
          console.log(example)
          let audio = new Audio(example.preview)
          console.log(audio)
          audio.play()
        })
      }
    
    
    // useEffect(() => {
    //     const getUsers = async () => {
    //         const data = await getDocs(collection(db, "users"));
    //         setDbUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //       };
    //     getUsers();
    // }, []);


    useEffect(() => {
        const tracksOptions = {
            method: 'GET',
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + token
            }
        }
        fetch(`https://api.spotify.com/v1/albums/${id}/tracks?market=US`, tracksOptions)
        .then(res => res.json())
        .then(data => setAlbumTracks(data.items))
    },[id, token])
    
  return (
    <div className='container trackListContainer'>
      <div className='col-md-4' style={{width: 'auto'}}>
        <img id="trackAlbum" alt="album"src={state.album.images[1].url}/>
      </div>
      <div className='col-md-8' style={{position: 'relative'}}>
        <h1 id='albumTitle'>{state.album.name}</h1>
        <h2 id='albumArtist'>{state.album.artists[0].name}</h2>
      </div>
      <div className='col-md-12'>
        <ol id='trackListOl'>
    {albumTracks.map(track => {
        return <li 
        key={track.id} 
        className="artistTracks" 
        onClick={(e) => {
          getTrack(e)
        }}
        onContextMenu={handleFavorites}
        > {track.name}  
        <button style={{marginLeft : '20px'}} type="button" class="btn btn-default btn-sm">
        +
        </button></li>
        
    })}</ol>
    </div>

    <div className='col-md-12'>
      <a className='scrollBtn'  style={{ marginLeft: '10px' }}>{`Go back to ${state.album.artists[0].name} albums`}</a>
    </div>
    <div className='col-md-12'>
      {/* <audio controls>
      </audio> */}
    </div>
    
    </div>
  )
  
}

export default Tracks