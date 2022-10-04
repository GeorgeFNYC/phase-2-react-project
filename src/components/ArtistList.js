import React from 'react'

function ArtistList({results}){
    // function selectArtist(e) {
    //     console.log(id)
    //   }
    return (<div>
        {results.map((result, index) => { 
            return (
                <li 
                key={result.id} 
                id={result.id} 
                result={result} 
                onClick={e => {console.log(index)}}
                >
                    {/* <img alt="" src={result.images[2].url}/> */}
                    {result.name} 
                </li>
            )
        })}
    </div>)
}

export default ArtistList;