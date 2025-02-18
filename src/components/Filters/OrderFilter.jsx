import React from 'react'

const OrderFilter = () => {
  return (
    <div className="col-lg-6 col-md-12 col-sm-12">
    <div className="search-box">
        <label htmlFor>Order by:</label>
        <input
            type="text"
            placeholder
            className="form-input form-control py-1 px-3"
        />
    </div>
</div>
  )
}

export default OrderFilter