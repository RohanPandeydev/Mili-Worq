import React from 'react'
import UnitCabinetFormTable from './UnitCabinetFormTable'

const UnitCabinetForm = ({ handleValueChange, each, roomData, handleChangeCabinetDetails, data,handleSave,cabinetList }) => {
    return (
        <div>
            <div>

                {Object.keys(roomData).map((roomName) => (
                    <div key={roomName}>
                        <h2>{roomName}</h2>
                        {roomData[roomName].map((room, index) => (
                            <>
                            <div key={index}>
                                <div className="row">

                                    <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                        <label htmlFor>Wall </label>
                                        <select className="form-select" aria-label="Default select example" value={room.wall} disabled
                                            onChange={(e) => handleValueChange(roomName, index, 'wall', e.target.value)}>
                                            <option selected>Open this select menu</option>
                                            <option value={'left_wall'}>Wall A</option>
                                            <option value={'right_wall'}>Wall B</option>
                                            <option value={'lower_wall'}>Wall C</option>
                                            <option value={'upper_wall'}>Wall  D</option>
                                            <option value={'island_wall'}>island</option>
                                        </select>
                                    </div>
                                    {room.cabinet_details.map((row, cabinetIndex) => (
                                        <div className="col-12">
                                            <div className="row align-items-center">
                                                <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                                    <label htmlFor>Cabinet</label>
                                                    <select onChange={(e) => handleChangeCabinetDetails(roomName, index, cabinetIndex, "cabinet", e.target.value)} value={row.cabinet} className="form-select" aria-label="Default select example" >
                                                        <option selected>Open this select menu</option>
                                                        {data?.map((each) => {
                                                            return <option value={each?.item_num}>{each?.item_num}</option>
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                                    <label htmlFor> Stone Ft 2</label>
                                                    <input type="text" className="form-control py-1 px-3 event-input" onChange={(e) => handleChangeCabinetDetails(roomName, index, cabinetIndex, "stoneFt2_1", e.target.value)} value={row.stoneFt2_1} />
                                                </div>
                                                <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                                    <label htmlFor> Stone Ft 2</label>
                                                    <input type="text" onChange={(e) => handleChangeCabinetDetails(roomName, index, cabinetIndex, "stoneFt2_2", e.target.value)} value={row.stoneFt2_2} className="form-control py-1 px-3 event-input" />
                                                </div>
                                                <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                                    <label htmlFor> Stone Ft 2</label>
                                                    <input type="text" onChange={(e) => handleChangeCabinetDetails(roomName, index, cabinetIndex, "stoneFt2_3", e.target.value)} value={row.stoneFt2_3} className="form-control py-1 px-3 event-input" />
                                                </div>
                                                <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                                                    <div className="row">
                                                        <div className="col-lg-4">
                                                            <label htmlFor> SSL</label>
                                                            <input type="text" onChange={(e) => handleChangeCabinetDetails(roomName, index, cabinetIndex, "ssl", e.target.value)} value={row.ssl} className="form-control py-1 px-3 event-input" />
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <label htmlFor>SSR</label>
                                                            <input type="text" onChange={(e) => handleChangeCabinetDetails(roomName, index, cabinetIndex, "ssr", e.target.value)} value={row.ssr} className="form-control py-1 px-3 event-input" />
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <label htmlFor> BS</label>
                                                            <input type="text" onChange={(e) => handleChangeCabinetDetails(roomName, index, cabinetIndex, "bs", e.target.value)} value={row.bs} className="form-control py-1 px-3 event-input" />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))}


                                </div>



                                {/* Render other input fields for cabinet details and handle their changes */}
                            </div>
                            {/* <UnitCabinetFormTable  cabinetList={cabinetList} /> */}

                            </>

                        ))}
                        <div className="row">

                            <div className="event-create-btns my-3">
                                {/* <button type="submit" className="btn add-btn">+Add More</button> */}
                                <button type="button" className="btn common-btn" onClick={(e)=>handleSave(e,roomName)}>Save</button>
                            </div>
                        </div>
                        <UnitCabinetFormTable roomName={roomName} cabinetList={cabinetList} />


                    </div>
                ))}
                {/* <div className="project-list-filter">
                    <div className="row">
                       
                        <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                            <label htmlFor>Wall </label>
                            <select className="form-select" aria-label="Default select example" onChange={() => handleValueChange(each,)}>
                                <option selected>Open this select menu</option>
                                <option value={1}>One</option>
                                <option value={2}>Two</option>
                                <option value={3}>Three</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <div className="row align-items-center">
                                <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor>Cabinet</label>
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Open this select menu</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                    </select>
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor> Stone Ft 2</label>
                                    <input type="text" className="form-control py-1 px-3 event-input" />
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor> Stone Ft 2</label>
                                    <input type="text" className="form-control py-1 px-3 event-input" />
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                                    <label htmlFor> Stone Ft 2</label>
                                    <input type="text" className="form-control py-1 px-3 event-input" />
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <label htmlFor> SSL</label>
                                            <input type="text" className="form-control py-1 px-3 event-input" />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor>SSR</label>
                                            <input type="text" className="form-control py-1 px-3 event-input" />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor> BS</label>
                                            <input type="text" className="form-control py-1 px-3 event-input" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                    <div className="row">

                        <div className="event-create-btns my-3">
                            <button type="button" className="btn common-btn">Save</button>
                        </div>
                    </div>
                </div> */}

            </div>

        </div>
    )
}

export default UnitCabinetForm