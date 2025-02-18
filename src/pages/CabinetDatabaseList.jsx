import React from 'react'
import SideBarNav from '../components/SideBarNav'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import CabinetServices from '../services/cabinetservices/CabinetServices'
import { toast } from 'react-toastify'
import CabinetDatabaseListItems from '../components/CabinetDatabaseListItems'

const CabinetDatabaseList = () => {
    const nav = useNavigate()
    const { data,isLoading } = useQuery(['cabinetdatabaselist'], () => CabinetServices.getList(), {
        onSuccess: (data) => {
            console.log("Data==>", data?.data)
            // toast.success()
        },
        onError: (err) => {
            console.log(err?.message)
            toast.error(err?.response?.data?.detail || err?.message,{delay:10})
        }
    })
    return (

        <section className="dashboard">
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
                                        <h4>Cabinet Database List</h4>
                                        <button
                                            className="btn common-btn"
                                            onClick={() => nav("/cabinetdatabaseform")}
                                        >
                                            Add New Database
                                        </button>
                                    </div>
                                    {isLoading ? <p className="text-danger">Please Wait..</p> : data?.data?.length == 0 ? (
                                        <p className="text-primary">No Data Found</p>
                                    ) : (
                                        <CabinetDatabaseListItems data={data?.data} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CabinetDatabaseList