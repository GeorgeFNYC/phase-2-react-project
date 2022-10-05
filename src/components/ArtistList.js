import React from 'react'
import {useNavigate} from 'react-router-dom'

function ArtistList({results, handleClick}){
    const navigate = useNavigate()

    // const handleHide = () => {
    //     results('')
    // }

    return (<div onClick={handleClick} id='searchDrop'>
        {results.map((result, index) => { 
            return (
                <div 
                onClick={() => {navigate(`/artist/${result.id}`, {state: {result}})}} 
                key={result.id} 
                className='artistLinks'
                >
                    <span
                    key={result.id} 
                    id={result.id} 
                    result={result} 
                    >
                        {result.name} 
                    </span>
                </div>
            )
        })}
    </div>)
}

export default ArtistList;