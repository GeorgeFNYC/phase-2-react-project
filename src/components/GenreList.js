import React, {useRef} from 'react'

function GenreList({genres, handleClick, handleRandom}){
    const ref = useRef()
    
    return (
    <>
     <button className="randomButton" onClick={handleRandom}>{'\u293E'}</button>
     {genres.slice(0,10).map((genre,index) => {
            return (
                <div key={index} className={`col-md-2 bubble0`} onClick={handleClick}>
                    <p ref={ref} className="genreList">{genre}</p>
                </div>
            )
        })} 
    </>
    )
}

export default GenreList;