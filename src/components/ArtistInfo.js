import React from "react"
import {useLocation, useParams} from 'react-router-dom'
import NavBar from "./NavBar";


function ArtistInfo(){
    const location = useLocation();
    const state = location.state

    console.log(state)
    return (
        <div className="artistInfo">
            {/* <img alt="" src={state.images[2].url}></img> */}
            {state ? 
            
            <div className="container divArtist">
                
                <div id="artistPicDiv">
                    <h1 id="artistName"style={{color: "red"}}>Artist Name</h1>
                    <img id="artistBanner" src={"https://via.placeholder.com/200"} alt=""/>
                </div>
                <div id="artistDisc">
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                    <img className='albums'src={'https://via.placeholder.com/150'} alt="albums"/>
                </div>
            </div>
            : 
            <h1 style={{color: 'red', fontSize:'2em'}}>Woops</h1>
            }
        </div>
    )
}

export default ArtistInfo;