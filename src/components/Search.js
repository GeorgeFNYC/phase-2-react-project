function Search({search, setSearch}){
    return (
        <nav className="searchComponent">

            <input id="homeSearch" placeholder="Search here..." type="text" required value={search} onChange={setSearch}>

            </input>
            {/* <a href="google.com">My Fav</a> */}
        </nav>
    )
}

export default Search;