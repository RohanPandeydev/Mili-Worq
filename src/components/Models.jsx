import React, { useEffect, useState } from 'react'
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import EstimationServices from '../services/estimationservices/EstimationServices'
import { ToastContainer, toast } from 'react-toastify'

const Models = ({ setModal, isModal }) => {
const [modelData,setModelData]=useState('')
const queryClient=useQueryClient()
const onSaveModel=()=>{
    console.log("Dat",modelData)
    addEstimator.mutate({name:modelData})
    return;
}
    const handleClose = () => {
        setModal(!isModal)
    }

    const addEstimator=useMutation((formdata)=>EstimationServices.createEstimator(formdata),{
        onSuccess:(data)=>{
            console.log("====>",data?.data)
            toast.success('Created successfully')
            setModal(false)
            setModelData('')
            queryClient.invalidateQueries('estimatorlist')
            queryClient.refetchQueries('estimatorlist')
            // window.location.reload()
            return
        },
        onError: (err) => {
            console.log(err?.message);
            toast.error(err?.response?.data?.message || err?.message, {
                delay: 10,
            });
            return;
        },
    })

    

    return <Modal isOpen={isModal} size="xl" toggle={handleClose}>
        <ModalHeader toggle={handleClose}>
            <h5 className="text-danger">New Estimator Add Form</h5>
        </ModalHeader>
        <ToastContainer/>
        <ModalBody>
            <Row>
                <Col>
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                        Name <span>*</span>
                        </label>
                        <input
                            type="text"
                            onChange={(e)=>setModelData(e?.target?.value)}
                            
                            placeholder="Enter Estimator Name"
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                </Col>




            </Row>

            <button className="btn btn1 m-2"  onClick={onSaveModel} >
                Save
            </button>
        </ModalBody>
    </Modal>
}

export default Models