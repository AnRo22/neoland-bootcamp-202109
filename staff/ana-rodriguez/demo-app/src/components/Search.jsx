function Search ({onSearch,query}) {
    return <div>
        <form className="search" onSubmit={
            (event) => {
                event.preventDefault()
                onSearch(event.target.query.value)
            }
        }>
            <input className="field" type="text" name="query" defaultValue={query} placeholder="search" id="search" />
            <button className="button">🔎 Search</button>
        </form>
    </div>
}

export default Search