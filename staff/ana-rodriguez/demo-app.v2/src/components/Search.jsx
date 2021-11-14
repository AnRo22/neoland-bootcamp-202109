import React from 'react'

function Search ({onSearch,query}) {
    return <div className="containers">
        <form className="search" onSubmit={
            (event) => {
                event.preventDefault()
                onSearch(event.target.query.value)
            }
        }>
            <input className="form__input" type="text" name="query" defaultValue={query} placeholder="search" id="search" />
            <button className="button__slim" type="submit">🔎 Search</button>
        </form>
    </div>
}

export default Search