import React, { useEffect } from 'react'
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import CabinetChildrenFields from './Subcomponent/CabinetChildrenFields'

const UnitCabinetModels = ({ data, cabinet_list, handleCabinetsInputChangeModel, handleInputChangeModel, setModal, isModal, onSaveModel, setEditableData }) => {


    useEffect(() => {
    }, [data])
    const handleClose = () => {
        setEditableData(null)
        setModal(!isModal)
    }

    return <Modal isOpen={isModal} size="xl" toggle={handleClose}>
        <ModalHeader toggle={handleClose}>
            <h5 className="text-danger">Update Cabinet List</h5>
        </ModalHeader>

        <ModalBody>
            <Row>


                <div className="mb-3">
                    <label >Select Room </label>
                    <select
                        className="form-select"
                        name="room"
                        value={data[0]?.room}
                        onChange={(e) => handleInputChangeModel(data[0].id, "room", e.target.value)}
                        aria-label="Default select example"
                    >
                        <option selected>Open this select room</option>
                        <option value={'kitchen_room'}>Kitchen Room</option>
                        <option value={'bedroom_room'}>Bedroom Room </option>
                        <option value={'study_room'}>Study Room </option>
                        <option value={'bathroom'}>Bathroom  Room </option>
                    </select>

                    {/* <label htmlFor="exampleInputEmail1" className="form-label">Room</label>
                    <input type="text" className="form-control" name='room' value={data[0]?.room} onChange={(e) => handleInputChangeModel(data[0].id, "room", e.target.value)} /> */}
                </div>
                <div className="mb-3">
                    <div className="col-lg-2 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>Wall </label>
                        <select
                            name='wall'
                            onChange={(e) => handleInputChangeModel(data[0].id, "wall", e.target.value)} value={data[0]?.wall}
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option selected>Open this select wall</option>
                            <option value={'left_wall'}>Wall A</option>
                            <option value={'right_wall'}>Wall B</option>
                            <option value={'lower_wall'}>Wall C</option>
                            <option value={'upper_wall'}>Wall  D</option>
                            <option value={'iland_wall'}>iland</option>
                        </select>
                    </div>
                    {/* <label htmlFor="exampleInputEmail1" className="form-label">Wall</label> */}
                    {/* <input type="text" className="form-control" name='wall' onChange={(e) => handleInputChangeModel(data[0].id, "wall", e.target.value)} value={data[0]?.wall} /> */}
                </div>
                {
                    data[0]?.cabinet_details.map((each, ind) => {
                        return <CabinetChildrenFields each={each} objindex={data[0]?.id} ind={ind} cabinet_list={cabinet_list} handleCabinetsInputChange={handleCabinetsInputChangeModel} />
                    })

                }

            </Row>

            <button className="btn btn1 m-2" onClick={onSaveModel} >
                Save
            </button>
        </ModalBody>
    </Modal>
}

export default UnitCabinetModels