import React, { useEffect } from 'react'
import UnitMain from '../components/UnitMain'
import SideBarNav from '../components/SideBarNav'
import Header from '../components/Header'
import { useQuery } from '@tanstack/react-query'
import Projectservices from '../services/projectservices/ProjectServices'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

const EstInfo = () => {
    const { id, eid } = useParams()
    const { data, isLoading, isFetched } = useQuery(
        ["projectinfoestinfo", id, eid],
        () => {
            return Projectservices.getProjectInfo({ id });
        },
        {
            enabled:!!id,
            onSuccess: (data) => {
                console.log("====>", data?.data);
            },
            onError: (err) => {
                toast.error(err?.response, { delay: 10 });
            },
        }
    );





    return (
        <section className="dashboard">
            {
                !isLoading && <div className="row">
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
                                            <h4>Project Name: {data?.data?.project?.name} <br />
                                                Project ID: {data?.data?.project?.id}</h4>
                                        </div>
                                        <UnitMain project_id={id} estimation_id={eid} />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </section>
    )
}

export default EstInfo