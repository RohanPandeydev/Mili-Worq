import React, { useState } from 'react'
import EditUnit from '../components/Subcomponent/EditUnit'
import SideBarNav from '../components/SideBarNav'
import Header from '../components/Header'
import { useNavigate, useParams } from 'react-router-dom'
import UnitCabinet from '../components/UnitCabinet'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import CabinetServices from '../services/cabinetservices/CabinetServices'
import { ToastContainer, toast } from 'react-toastify'
import EstimationCabinetList from '../components/Subcomponent/EstimationCabinetList'
import UnitCabinetForm from '../components/Subcomponent/UnitCabinetForm'
import UnitService from '../services/UnitService'
const UnitDetails = () => {
    const { id } = useParams()
    const [unit_id,setUnitId]=useState({unit:"",id:""})

    const nav = useNavigate()
    const queryClient=useQueryClient()
    const [roomData, setRoomData] = useState({
        kitchen_room: [
            { wall: 'left_wall', cabinet_details: [{ cabinet: '', stoneFt2_1: '', stoneFt2_2: '', stoneFt2_3: '', ssl: '', ssr: '', bs: '' }] },
            { wall: 'right_wall', cabinet_details: [{ cabinet: '', stoneFt2_1: '', stoneFt2_2: '', stoneFt2_3: '', ssl: '', ssr: '', bs: '' }] },
            { wall: 'lower_wall', cabinet_details: [{ cabinet: '', stoneFt2_1: '', stoneFt2_2: '', stoneFt2_3: '', ssl: '', ssr: '', bs: '' }] },
            { wall: 'upper_wall', cabinet_details: [{ cabinet: '', stoneFt2_1: '', stoneFt2_2: '', stoneFt2_3: '', ssl: '', ssr: '', bs: '' }] },

        ],
        Bedroom_Room: [{ wall: '', cabinet_details: [{ cabinet: '', stoneFt2_1: '', stoneFt2_2: '', stoneFt2_3: '', ssl: '', ssr: '', bs: '' }] }],
        Study_Room: [{ wall: '', cabinet_details: [{ cabinet: '', stoneFt2_1: '', stoneFt2_2: '', stoneFt2_3: '', ssl: '', ssr: '', bs: '' }] }],
        Bathroom_Room: [{ wall: '', cabinet_details: [{ cabinet: '', stoneFt2_1: '', stoneFt2_2: '', stoneFt2_3: '', ssl: '', ssr: '', bs: '' }] }],
    });
    // const [formData, setFormData] = useState([
    //     {
    //         // room: "",
    //         wall: "",
    //         cabinet_details: [
    //             {
    //                 cabinet: "",
    //                 stoneFt2_1: "",
    //                 stoneFt2_2: "",
    //                 stoneFt2_3: "",
    //                 ssl: "",
    //                 ssr: "",
    //                 bs: "",
    //             },
    //         ],
    //     },
    // ]);




    const handleChange = (roomName, index, field, value) => {
        setRoomData((prevRoomData) => {
            const updatedData = { ...prevRoomData };
            if (field === 'wall') {
                updatedData[roomName][index].wall = value;
            } else if (field.startsWith('cabinet_details')) {
                const cabinetIndex = parseInt(field.split('_')[1], 10);
                updatedData[roomName][index].cabinet_details[cabinetIndex][field.split('_')[2]] = value;
            }

            console.log("My Value", updatedData)
            return updatedData;
        });
    };

    const handleChangeCabinetDetails = (roomName, index, cabinetIndex, field, value) => {
        setRoomData((prevRoomData) => {
            const updatedData = { ...prevRoomData };
            updatedData[roomName][index].cabinet_details[cabinetIndex][field] = value;
            console.log("My Value", updatedData)
            return updatedData;
        });
    };


    const {data,isLoading}=useQuery(['cabinetList'],()=>CabinetServices.getList(),{
        refetchOnWindowFocus:false,
        onSuccess:(data)=>{
            console.log(data)
        },
            onError: (err) => {
                toast.error(err?.response, { delay: 10 });
            },
        
    })
    const {data:cabinetList,isLoading:isLoad}=useQuery(['unitlistdata'],()=>UnitService.getCabinetList(),{
        refetchOnWindowFocus:false,
        onSuccess:(data)=>{
            console.log("===>",data[0],"===>")
            const existData=data.filter((each)=>each?.unit_id)
            setUnitId({})
        },
            onError: (err) => {
                toast.error(err?.response, { delay: 10 });
            },
        
    })


    const handleSave=(e,name)=>{
        e.preventDefault()
        // const filterOut=[roomData].filter((each)=>each[room])
        // const spred={[name]:{...roomData[name]}}
        // console.log("CC",spred,roomData,JSON.stringify(roomData[name]))
        
        // mutation.mutate({unit_id:id,cabinet_list:JSON.stringify(roomData)})
        return
    }


    const mutation=useMutation((formdata)=>UnitService.createCabinet(formdata),  {
        onSuccess: (data) => {
            console.log("Data", data?.data);
            toast?.success("Successfull", { delay: 10 });

            setTimeout(() => {
                queryClient.invalidateQueries("cabinetdatabaselist");
                queryClient.refetchQueries("cabinetdatabaselist");
                // nav(-1);
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
    })


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
                                    <div className="project-list-head">
                                        <button type='button' onClick={() => nav('/cabinetdatabaseform')}>+</button>
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
                                        
                                            <EstimationCabinetList/>
                                        
                                        
                                        // !isLoad && !isLoading &&<UnitCabinetForm handleSave={handleSave} cabinetList={cabinetList?.data} handleValueChange={handleChange} roomData={roomData} handleChangeCabinetDetails={handleChangeCabinetDetails} data={data?.data} />

                                        

                                    }


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UnitDetails