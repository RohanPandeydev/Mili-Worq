import React, { useState } from "react";
import CabinetChildrenFields from "./CabinetChildrenFields";

const CabinetFieldsDynamic = ({ formData, handleInputChange, handleAddCabinetRow, handleCabinetsInputChange, cabinet_list, wallname }) => {

    return (
        <div>
            {formData.map((field, index) => (
                <div className="row" key={index}>
                    <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                        <label htmlFor={`room-${index}`}>Select Room </label>
                        <select
                            className="form-select"
                            name="room"
                            id={`room-${index}`}
                            value={field.room}
                            onChange={(e) => handleInputChange(index, "room", e.target.value)}
                            aria-label="Default select example"
                        >
                            <option selected>Open this select room</option>
                            <option value={'kitchen_room'}>Kitchen Room</option>
                            <option value={'bedroom_room'}>Bedroom Room </option>
                            <option value={'study_room'}>Study Room </option>
                            <option value={'bathroom'}>Bathroom  Room </option>
                        </select>
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>Wall </label>
                        <select
                            name="wall"
                            id={`wall-${index}`}
                            value={field.wall}
                            onChange={(e) => handleInputChange(index, "wall", e.target.value)}
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option selected>Open this select wall</option>
                            <option value={'left_wall'}>Wall A</option>
                            <option value={'right_wall'}>Wall B</option>
                            <option value={'lower_wall'}>Wall C</option>
                            <option value={'upper_wall'}>Wall  D</option>
                            <option value={'island_wall'}>island</option>
                        </select>
                    </div>
                    <div className="col-12">
                        {
                            field?.cabinet_details.map((each, ind) => {
                                return <CabinetChildrenFields each={each} objindex={index} cabinet_list={cabinet_list} ind={ind} handleCabinetsInputChange={handleCabinetsInputChange} />
                            })
                        }
                        <div className="col-lg-1">
                            <div>
                                <button type="button" className="btn add-btn" onClick={() => handleAddCabinetRow(index)}>
                                    +Add
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default CabinetFieldsDynamic;
