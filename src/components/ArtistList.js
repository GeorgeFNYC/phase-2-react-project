import React from 'react'
import {useNavigate} from 'react-router-dom'

function ArtistList({results}){
    // function selectArtist(e) {
    //     console.log(id)
    //   }
    const navigate = useNavigate()

    return (<div>
        {results.map((result, index) => { 
            return (
                <li 
                key={result.id} 
                id={result.id} 
                result={result} 
                onClick={() => {navigate(`/artist/${result.name}`, {state: {result}})}}
                style={{color: "white"}}
                >
                    {/* <img alt="" src={result.images[2].url}/> */}
                    {result.name} 
                </li>
            )
        })}
    </div>)
}

export default ArtistList;