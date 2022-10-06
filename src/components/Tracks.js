import React, {useState, useEffect} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";


function Tracks({ token }) {
    const[albumTracks, setAlbumTracks] = useState([])
    const[dbUser, setDbUser] = useState([])
    const {id} = useParams()
    const location = useLocation();
    const state = location.state
    const usersCollectionRef = collection(db, "users");


    
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(collection(db, "users"));
            setDbUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
        getUsers();
    }, []);
    console.log(dbUser)


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
    <div>{albumTracks.map(track => {
        return <li key={track.id} style={{color:"white"}} onClick={() => {
            const userDoc = doc(db, "users", id)
            console.log(userDoc)
            updateDoc(userDoc, {
                favorites : arrayUnion("Hello")
            });
        }}>{track.name}</li>
    })}</div>
  )
}

export default Tracks