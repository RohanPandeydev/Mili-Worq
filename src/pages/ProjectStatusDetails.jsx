import React, { useEffect } from 'react'
import SideBarNav from '../components/SideBarNav'
import Header from '../components/Header'
import StatusCreateForm from '../components/StatusCreateForm'
import { useParams } from 'react-router-dom'
import Projectservices from '../services/projectservices/ProjectServices'
import { useQuery } from '@tanstack/react-query'


const ProjectStatusDetails = () => {
    const { id } = useParams()
    const { data: eachStatus, isLoading } = useQuery(['eachstatusdetails', id], () => {
        return Projectservices.getStatusDetails({ id })
    }, {
        enabled:!!id,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        refetchOnMount: false,
        onSuccess: (data) => {
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
                                        <h4>Status Update Form
                                        </h4>
                                    </div>
                                    {
                                        !isLoading && <StatusCreateForm data={eachStatus?.data} />
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

export default ProjectStatusDetails