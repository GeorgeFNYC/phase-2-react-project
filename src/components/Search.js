function Search({search, setSearch}){
    return (
        <div>
            <input id="homeSearch" type="text" value={search} onChange={setSearch}></input>
        </div>
    )
}

export default Search;