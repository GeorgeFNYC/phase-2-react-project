import React from 'react'

function GenreList({genres}){
    // The Fisher-Yates Algorithm to randomize the Genres array for every render
    for(let i = genres.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1))
        const temp = genres[i]
        genres[i] = genres[j]
        genres[j] = temp
    }
    

    return (
        <div>{genres.slice(0, 7).map(genre => {
            return <ul key={genre.id}>{genre.name}</ul>
        })}</div>
    )
}

export default GenreList;