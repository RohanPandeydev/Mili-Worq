import React from 'react'

const SearchFilter = () => {
  return (
    <div className="col-lg-6 col-md-12 col-sm-12 ">
    <div className="search-box">
        <label htmlFor>Search:</label>
        <input
            type="text"
            placeholder="Search by Name or ID"
            className="form-input form-control py-1 px-3"
        />
    </div>
</div>
  )
}

export default SearchFilter