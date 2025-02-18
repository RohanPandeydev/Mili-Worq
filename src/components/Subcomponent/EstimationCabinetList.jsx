import React, { useEffect, useState } from "react";
import CabinetFieldsDynamic from "./CabinetFieldsAddDynamically";
import EstimationTable from "./EstimationTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import CabinetServices from "../../services/cabinetservices/CabinetServices";
import { ToastContainer, toast } from "react-toastify";
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import UnitCabinetModels from "../UnitCabinetModels";

const EstimationCabinetList = ({handleRemove, isModal, setModal, editableData, setEditableData,onSaveModel,handleInputChangeModel, handleSave, prefillData,formData,setFormData,handleCabinetsInputChangeModel }) => {


//   const handleCabinetsInputChangeModel = (index, field, value) => {
//     console.log("==>=", index, field, value, editableData[0])
//     const stateObj = editableData[0];
//     const objCabinet = stateObj.cabinet_details;
//     const cabinetObj = objCabinet[index];
//     cabinetObj[field] = value;
//     console.log("S", cabinetObj)
//     const newFormData = { ...editableData };
//     newFormData[0].cabinet_details = objCabinet;
//     console.log(newFormData, "------>")
//     setEditableData(Object.values(newFormData));
// };

  // const [formData, setFormData] = useState([
  //   {
  //     room: "",
  //     wall: "",
  //     cabinet_details: [
  //       {
  //         cabinet: "",
  //         stoneFt2_1: "",
  //         stoneFt2_2: "",
  //         stoneFt2_3: "",
  //         ssl: "",
  //         ssr: "",
  //         bs: "",
  //       },
  //     ],
  //   },
  // ]);
  const handleAddMore = () => {
    setFormData([
      ...formData,
      {
        room: "",
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
  const handleInputChange = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);
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
  const handleCabinetsInputChange = (objind, index, field, value) => {
    const stateObj = formData[objind];
    const objCabinet = stateObj.cabinet_details;
    const cabinetObj = objCabinet[index];
    cabinetObj[field] = value;
    const newFormData = { ...formData };
    newFormData[objind].cabinet_details = objCabinet;
    setFormData(Object.values(newFormData));
  };
  
  const handleEdit = (data) => {
    console.log("+==>", data)
    setModal(true)
    setEditableData([{
      ...data

    }],)
    // setFormData([data])
  }
  const storeData = (e) => {
    e.preventDefault()
    handleSave(formData)
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
  // const handleInputChangeModel = (index, field, value) => {
  //   console.log("==>", index, field, value, editableData)
  //   const spreadMe = [...editableData]
  //   spreadMe[0][field] = value
  //   setEditableData(spreadMe);
  // };
  // const handleCabinetsInputChangeModel = (index, field, value) => {
  //   console.log("==>", index, field, value, editableData[0])
  //   const stateObj = editableData[0];
  //   const objCabinet = stateObj.cabinet_details;
  //   const cabinetObj = objCabinet[index];
  //   cabinetObj[field] = value;
  //   console.log("S", cabinetObj)
  //   const newFormData = { ...editableData };
  //   newFormData[0].cabinet_details = objCabinet;
  //   console.log(newFormData, "------>")
  //   setEditableData(Object.values(newFormData));
  // };
  // const onSaveModel = () => {
  //   const myupdtedataid = editableData[0].id
  //   formData[myupdtedataid] = editableData[0]
  //   console.log("Formdata", formData)
  //   setFormData(Object.values(formData))
  //   setModal(false)
  //   setEditableData(null)
  //   return
  // }


  

  useEffect(() => {
    console.log("prefillData",  prefillData?.data)
    if (!!prefillData && !!prefillData?.data[0] && !JSON.parse(prefillData?.data[0]?.cabinet_list) == ' ') {

      if (JSON.parse(prefillData?.data[0]?.cabinet_list) == ' ') {
        return
      }
      setFormData(JSON.parse(prefillData?.data[0]?.cabinet_list))
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
          {!isCabinetLoad && !!editableData ? <UnitCabinetModels setModal={setModal} onSaveModel={onSaveModel} setEditableData={setEditableData} isModal={isModal} data={editableData} handleCabinetsInputChangeModel={handleCabinetsInputChangeModel} handleInputChangeModel={handleInputChangeModel} cabinet_list={cabinet_list} /> : <CabinetFieldsDynamic
            formData={formData}
            setFormData={setFormData}
            handleCabinetsInputChange={handleCabinetsInputChange}
            handleAddCabinetRow={handleAddCabinetRow}
            handleInputChange={handleInputChange}
            cabinet_list={cabinet_list}
          />}
          <div className="event-create-btns my-3">
            <button
              type="button"
              className="btn add-btn"
              onClick={handleAddMore}
            >
              +Add More
            </button>
            <button
              type="button"
              className="btn common-btn"
              onClick={storeData}
            >
              Save
            </button>
          </div>
        </div>
      </form>
      <EstimationTable data={!!prefillData && !!prefillData?.data[0] && JSON.parse(prefillData?.data[0]?.cabinet_list) != ' ' ?  JSON.parse(prefillData?.data[0]?.cabinet_list) : []} handleRemove={handleRemove} setModal={setModal} handleEdit={handleEdit} />
    </>
  );
};

export default EstimationCabinetList;
