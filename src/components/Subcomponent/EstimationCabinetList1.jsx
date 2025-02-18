import React, { useEffect, useState } from "react";
import CabinetFieldsDynamic from "./CabinetFieldsAddDynamically";
import EstimationTable from "./EstimationTable";
import { useQuery } from "@tanstack/react-query";
import CabinetServices from "../../services/cabinetservices/CabinetServices";
import { ToastContainer, toast } from "react-toastify";
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import Models from "../Models";

const EstimationCabinetList = ({ handleSave, prefillData,handleInputChange,formData, setFormData,wallname,handleCabinetsInputChange}) => {
  const [editableData, setEditableData] = useState()
  const [isModal, setModal] = useState(true)

  
  const handleAddMore = () => {
    setFormData([
      ...formData,
      {
        // room: "",
        wall: "",
        cabinet_details: [
          {
            cabinet: "",
            stoneFt2_1: "",
            stoneFt2_2: "",
            stoneFt2_3: "",
            ssl: "",
            ssr: "",
            bs: "",
          },
        ],
      },
    ]);
  };
 
  const handleAddCabinetRow = (index) => {
    const newFormData = { ...formData };
    newFormData[index].cabinet_details.push({
      cabinet: "",
      stoneFt2_1: "",
      stoneFt2_2: "",
      stoneFt2_3: "",
      ssl: "",
      ssr: "",
      bs: "",
    });
    setFormData(Object.values(newFormData));
    return;
  };
  
  const handleRemove = (id) => {
    const updteObj = formData.filter((each, ind) => ind != id)
    console.log("Remove", updteObj)
    setFormData(updteObj)
    // deleteCabinet.mutate(formData)
    return
  }
  const handleEdit = (data) => {
    console.log("+==>", data)
    setModal(true)
    setEditableData([{
      ...data

    }],)
    // setFormData([data])
  }
  const storeData = (e,wallname) => {
    e.preventDefault()
    handleSave(formData,wallname)
    return
  }
  const { data: cabinet_list, isLoading: isCabinetLoad } = useQuery(['cabinetlist'], () => CabinetServices.getList(), {
    onError: (err) => {
      toast.error(err?.response?.data?.detail || err?.message, { delay: 10 })
    },
    onSuccess: (data) => {
      console.log("===>", data)
    }
  })
  const handleInputChangeModel = (index, field, value) => {
    console.log("==>", index, field, value, editableData)
    const spreadMe = [...editableData]
    spreadMe[0][field] = value
    setEditableData(spreadMe);
  };
  const handleCabinetsInputChangeModel = (index, field, value) => {
    console.log("==>", index, field, value, editableData[0])
    const stateObj = editableData[0];
    const objCabinet = stateObj.cabinet_details;
    const cabinetObj = objCabinet[index];
    cabinetObj[field] = value;
    console.log("S", cabinetObj)
    const newFormData = { ...editableData };
    newFormData[0].cabinet_details = objCabinet;
    console.log(newFormData, "------>")
    setEditableData(Object.values(newFormData));
  };
  const onSaveModel = () => {
    const myupdtedataid = editableData[0].id
    formData[myupdtedataid] = editableData[0]
    console.log("Formdata", formData)
    setFormData(Object.values(formData))
    setModal(false)
    setEditableData(null)
    return
  }
  useEffect(() => {
    console.log("prefillData", !!prefillData?.data?.cabinet_list, prefillData?.data?.cabinet_list.length)
    if (!!prefillData && !!prefillData?.data && !JSON.parse(prefillData?.data?.cabinet_list) == ' ') {
      // setFormData([prefillData?.data])

      if (JSON.parse(prefillData?.data?.cabinet_list) == ' ') {
        return
      }
      setFormData(JSON.parse(prefillData?.data?.cabinet_list))
    }




    return () => { }




  }, [prefillData?.data])
  return (
    <>
      <ToastContainer />
      <div className="esti-info">
        <h4>Cabinet List</h4>
        {/* <button type="button" className="btn common-btn">
          Add Cabinet
        </button> */}
      </div>
      <form>
        <div className="row">
          {!isCabinetLoad && !!editableData ? <Models setModal={setModal} onSaveModel={onSaveModel} setEditableData={setEditableData} isModal={isModal} data={editableData} handleCabinetsInputChangeModel={handleCabinetsInputChangeModel} handleInputChangeModel={handleInputChangeModel} cabinet_list={cabinet_list} /> : <CabinetFieldsDynamic
            formData={formData}
            setFormData={setFormData}
            handleCabinetsInputChange={handleCabinetsInputChange}
            handleAddCabinetRow={handleAddCabinetRow}
            handleInputChange={handleInputChange}
            cabinet_list={cabinet_list}
            wallname={wallname}
          />}
          <div className="event-create-btns my-3">
            {/* <button
              type="button"
              className="btn add-btn"
              onClick={handleAddMore}
            >
              +Add More
            </button> */}
            <button
              type="button"
              className="btn common-btn"
              onClick={(e)=>storeData(e,wallname)}
            >
              Save
            </button>
          </div>
        </div>
      </form>
      <EstimationTable data={!!prefillData && !!prefillData?.data && JSON.parse(prefillData?.data?.cabinet_list) != ' ' ? JSON.parse(prefillData?.data?.cabinet_list) : []} handleRemove={handleRemove} setModal={setModal} handleEdit={handleEdit} />
    </>
  );
};

export default EstimationCabinetList;
