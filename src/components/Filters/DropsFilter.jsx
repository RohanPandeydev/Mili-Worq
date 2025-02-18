import React from 'react'

const DropsFilter = () => {
    return (
        <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="search-box">
                <label htmlFor>Filter:</label>
                <select
                    className="form-select"
                    aria-label="Default select example"
                >
                    <option selected>Client</option>
                    <option value={1}>Client</option>
                    <option value={2}>Salesperson</option>
                    <option value={3}>Status</option>
                </select>
            </div>
        </div>
    )
}

export default DropsFilter