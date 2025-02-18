import React, { useState } from "react";
import EditUnit from "../components/Subcomponent/EditUnit";
import SideBarNav from "../components/SideBarNav";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import UnitCabinet from "../components/UnitCabinet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CabinetServices from "../services/cabinetservices/CabinetServices";
import { ToastContainer, toast } from "react-toastify";
import EstimationCabinetList from "../components/Subcomponent/EstimationCabinetList";
import UnitCabinetForm from "../components/Subcomponent/UnitCabinetForm";
import UnitService from "../services/UnitService";
import EstimationServices from "../services/estimationservices/EstimationServices";
const UnitDetails = () => {
    const { id } = useParams();
    const [unitId, setUnitId] = useState(null);
    const [editableData, setEditableData] = useState();
    const [isModal, setModal] = useState(true);
    const nav = useNavigate();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState([
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

    // const handleChange = (roomName, index, field, value) => {
    //     setRoomData((prevRoomData) => {
    //         const updatedData = { ...prevRoomData };
    //         if (field === 'wall') {
    //             updatedData[roomName][index].wall = value;
    //         } else if (field.startsWith('cabinet_details')) {
    //             const cabinetIndex = parseInt(field.split('_')[1], 10);
    //             updatedData[roomName][index].cabinet_details[cabinetIndex][field.split('_')[2]] = value;
    //         }

    //         console.log("My Value", updatedData)
    //         return updatedData;
    //     });
    // };

    // const handleChangeCabinetDetails = (roomName, index, cabinetIndex, field, value) => {
    //     setRoomData((prevRoomData) => {
    //         const updatedData = { ...prevRoomData };
    //         updatedData[roomName][index].cabinet_details[cabinetIndex][field] = value;
    //         console.log("My Value", updatedData)
    //         return updatedData;
    //     });
    // };

    // const {data,isLoading}=useQuery(['cabinetList'],()=>CabinetServices.getList(),{
    //     refetchOnWindowFocus:false,
    //     onSuccess:(data)=>{
    //         console.log(data)
    //     },
    //         onError: (err) => {
    //             toast.error(err?.response, { delay: 10 });
    //         },

    // })
    const { data: cabinetList, isLoading: isLoad } = useQuery(
        ["unitlistdata"],
        () => UnitService.getCabinetList({ id: id }),
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                console.log("===>", data, "===>");
                const checkExistUnitId = data?.data?.filter(
                    (elem) => elem.unit_id == id
                );
                console.log(checkExistUnitId, "chdk");
                if (checkExistUnitId.length > 0) {
                    setUnitId(checkExistUnitId[0].id);
                }
            },
            onError: (err) => {
                toast.error(err?.response, { delay: 10 });
            },
        }
    );

    const handleSave = (data) => {
        // e.preventDefault()
        const getValues = Object.values(data);
        const updteobj = Object.values(getValues);
        console.log("==>", updteobj, data);
        if (!!unitId) {
            updteMutation.mutate({
                id: unitId,
                unit_id: id,
                cabinet_list: JSON.stringify(updteobj),
            });
            return;
        }
        mutation.mutate({ unit_id: id, cabinet_list: JSON.stringify(updteobj) });
        return;
    };

    const handleInputChangeModel = (index, field, value) => {
        console.log("==>", index, field, value, editableData);
        const spreadMe = [...editableData];
        spreadMe[0][field] = value;
        setEditableData(spreadMe);
    };
    const handleCabinetsInputChangeModel = (objindex, index, field, value) => {
        console.log(
            "==>=",
            objindex,
            index,
            field,
            value,
            "editableData",
            editableData
        );
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
        const myupdtedataid = editableData[0].id;
        formData[myupdtedataid] = editableData[0];
        console.log("Formdata", formData);
        setFormData(Object.values(formData));
        setModal(false);
        setEditableData(null);
        return;
    };

    const handleRemove = (id) => {
        console.warn("Data", id, 'wereowhehw')
        const updteObj = formData.filter((each, ind) => ind != id)
        console.log("Remove", updteObj)
        setFormData(updteObj)
        // deleteCabinet.mutate({id})
        return
    }

    const mutation = useMutation(
        (formdata) => UnitService.createCabinet(formdata),
        {
            onSuccess: (data) => {
                console.log("Data", data?.data);
                toast?.success("Successfull", { delay: 10 });

                setTimeout(() => {
                    queryClient.invalidateQueries("cabinetdatabaselist");
                    queryClient.refetchQueries("cabinetdatabaselist");
                    window.location.reload()
                    // nav(-1);
                    return;
                }, 2000);

                return;
            },
            onError: (err) => {
                console.log(err?.message);
                toast.error(err?.response?.data?.detail || err?.message, {
                    delay: 10,
                });
                return;
            },
        }
    );
    const updteMutation = useMutation(
        (formdata) => UnitService.updteUnitCabinet(formdata),
        {
            onSuccess: (data) => {
                console.log("Data", data?.data);
                toast?.success("Successfull", { delay: 10 });

                setTimeout(() => {
                    queryClient.invalidateQueries("cabinetdatabaselist");
                    queryClient.refetchQueries("cabinetdatabaselist");
                    // nav(-1);
                    window.location.reload()
                    return;
                }, 3000);

                return;
            },
            onError: (err) => {
                console.log(err?.message);
                toast.error(err?.response?.data?.detail || err?.message, {
                    delay: 10,
                });
                return;
            },
        }
    );

    const deleteCabinet = useMutation(
        (formdata) => UnitService.delete(formdata),
        {
            onSuccess: (data) => {
                console.log("Data", data?.data);
                toast?.success("Successfull", { delay: 10 });

                setTimeout(() => {
                    queryClient.invalidateQueries("cabinetdatabaselist");
                    queryClient.refetchQueries("cabinetdatabaselist");
                    // nav(-1);
                    window.location.reload()
                    return;
                }, 3000);

                return;
            },
            onError: (err) => {
                console.log(err?.message);
                toast.error(err?.response?.data?.detail || err?.message, {
                    delay: 10,
                });
                return;
            },
        }
    );

    return (
        <section className="dashboard">
            <ToastContainer />
            <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <SideBarNav />
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                    <div className="dashboard-content">
                        <div className="row">
                            <div className="col-12">
                                <Header />
                                <div className="project-list-content">
                                    <div className="project-list-head">
                                        <h4>Unit Details</h4>
                                    </div>
                                    <EditUnit />
                                </div>
                                <div className="project-list-content mt-2">
                                    <div className="project-list-head" style={{ justifyContent: 'flex-end' }}>
                                        {/* <div className='action'> */}

                                            <button
                                                type="button" className="btn common-btn-white"
                                                onClick={() => nav("/cabinetdatabaseform")}
                                            >
                                                <i className="fa-solid fa-plus" />
                                            </button>
                                        {/* </div> */}
                                        <span></span>
                                    </div>
                                    {/* {
                                        myRoomList.length && myRoomList.map((each,ind) => {
                                            return <>
                                                <h4>{ind+1}. {each}</h4>

                                                <EstimationCabinetList  handleCabinetsInputChange={handleCabinetsInputChange}wallname={each}  handleInputChange={handleInputChange} formData={formData} setFormData={setFormData} handleSave={handleSave} /> <hr />
                                            </>
                                        })
                                    } */}
                                    {
                                        // <h4>{ind+1} {each}</h4>

                                        !isLoad && (
                                            <EstimationCabinetList
                                                handleCabinetsInputChangeModel={
                                                    handleCabinetsInputChangeModel
                                                }
                                                editableData={editableData}
                                                setEditableData={setEditableData}
                                                isModal={isModal}
                                                setModal={setModal}
                                                onSaveModel={onSaveModel}
                                                handleInputChangeModel={handleInputChangeModel}
                                                formData={formData}
                                                setFormData={setFormData}
                                                handleSave={handleSave}
                                                prefillData={cabinetList && cabinetList}
                                                deleteCabinet={deleteCabinet}
                                                handleRemove={handleRemove}
                                            />
                                        )

                                        // !isLoad && !isLoading &&<UnitCabinetForm handleSave={handleSave} cabinetList={cabinetList?.data} handleValueChange={handleChange} roomData={roomData} handleChangeCabinetDetails={handleChangeCabinetDetails} data={data?.data} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UnitDetails;
