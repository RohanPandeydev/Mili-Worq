import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Projectservices from '../services/projectservices/ProjectServices'
import { toast } from 'react-toastify'
import ProjectCreateForm from '../components/ProjectCreateForm'
import SideBarNav from "../components/SideBarNav";
import Header from '../components/Header'
import ClientCreateForm from '../components/ClientCreateForm'
import ClientServices from '../services/clientservices/ClientServices'
import CabinetServices from '../services/cabinetservices/CabinetServices'
import CreateCabinetDatabaseForm from '../components/CreateCabinetDatabaseForm'

const CabinetDatabaseDetails = () => {
    const { id } = useParams()
    const { data: eachCabinet, isLoading } = useQuery(['cabinetdetails', id], () => {
        return CabinetServices.getDetails({ id })
    }, {
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        refetchOnMount: false,
        onSuccess: (data) => {
            console.log("Cabinet Details", data)
            // queryClient.invalidateQueries('projectlist')
            // queryClient.refetchQueries('projectlist')

            return

        },
        onError: (err) => {
            console.log(err)
            toast.error(err?.response?.data?.detail || err?.message, { delay: 10 })
            return

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
                                        <h4>Cabinet Database   Update Form</h4>
                                    </div>
                                    {
                                        !isLoading && <CreateCabinetDatabaseForm data={eachCabinet?.data} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
}

export default CabinetDatabaseDetails