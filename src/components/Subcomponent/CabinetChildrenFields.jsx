import React from 'react'

const CabinetChildrenFields = ({ each, ind, handleCabinetsInputChange, objindex, cabinet_list }) => {

    return (
        <div className="row align-items-center">
            <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                <label htmlFor>Cabinet</label>
                <select
                    name="cabinet"
                    id={`cabinet-${ind}`}
                    value={each.cabinet}
                    onChange={(e) =>
                        handleCabinetsInputChange(objindex, ind, "cabinet", e.target.value)
                    }
                    className="form-select"
                    aria-label="Default select example"
                >
                    <option selected>Open this select menu</option>
                    {
                        cabinet_list?.data?.map((each) => {
                            return <option value={each?.id}>{each?.item_num}</option>
                        })
                    }
                </select>
            </div>
            <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                <label htmlFor> Stone Ft 2</label>
                <input
                    type="text"
                    name="stoneFt2_1"
                    id={`stoneFt2_1-${ind}`}
                    value={each.stoneFt2_1}
                    onChange={(e) =>
                        handleCabinetsInputChange(objindex, ind, "stoneFt2_1", e.target.value)
                    }
                    className="form-control py-1 px-3 event-input"
                />
            </div>
            <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                <label htmlFor> Stone Ft 2</label>
                <input
                    name="stoneFt2_2"
                    id={`stoneFt2_2-${ind}`}
                    value={each.stoneFt2_2}
                    onChange={(e) =>
                        handleCabinetsInputChange(objindex, ind, "stoneFt2_2", e.target.value)
                    }
                    type="text"
                    className="form-control py-1 px-3 event-input"
                />
            </div>
            <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                <label htmlFor> Stone Ft 2</label>
                <input
                    type="text"
                    name="stoneFt2_3"
                    id={`stoneFt2_3-${ind}`}
                    value={each.stoneFt2_3}
                    onChange={(e) =>
                        handleCabinetsInputChange(objindex, ind, "stoneFt2_3", e.target.value)
                    }
                    className="form-control py-1 px-3 event-input"
                />
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                <div className="row">
                    <div className="col-lg-4">
                        <label htmlFor> SSL</label>
                        <input
                            type="text"
                            name="ssl"
                            id={`ssl-${ind}`}
                            value={each.ssl}
                            onChange={(e) =>
                                handleCabinetsInputChange(objindex, ind, "ssl", e.target.value)
                            }
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-4">
                        <label htmlFor>SSR</label>
                        <input
                            type="text"
                            name="ssr"
                            id={`ssr-${ind}`}
                            value={each.ssr}
                            onChange={(e) =>
                                handleCabinetsInputChange(objindex, ind, "ssr", e.target.value)
                            }
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-4">
                        <label htmlFor> BS</label>
                        <input
                            type="text"
                            name="bs"
                            id={`bs-${ind}`}
                            value={each.bs}
                            onChange={(e) =>
                                handleCabinetsInputChange(objindex, ind, "bs", e.target.value)
                            }
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CabinetChildrenFields