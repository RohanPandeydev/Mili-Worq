import React, { useEffect } from 'react'
import SideBarNav from '../components/SideBarNav'
import Header from '../components/Header'
import SalesCreateForm from '../components/SalesCreateForm'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import SalesServices from '../services/salesservices/SalesServices'
import { ToastContainer } from 'react-toastify'


const SalesPersonDetails = () => {
    const { id } = useParams()
    const { data: eachSalesPerson, isLoading } = useQuery(['salespersondetails', id], () => {
        return SalesServices.getDetails({ id })
    }, {
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
                                        <h4> Salesperson Update Form
                                        </h4>
                                    </div>
                                    {
                                        !isLoading && <SalesCreateForm data={eachSalesPerson?.data} />
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

export default SalesPersonDetails