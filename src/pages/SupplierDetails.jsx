import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import SideBarNav from "../components/SideBarNav";
import Header from '../components/Header'
import SupplierCreateFrom from '../components/SupplierCreateFrom'
import SupplierService from '../services/supplierservice/SupplierService'

const SupplierDetails = () => {
    const { id } = useParams()
    const { data: eachClient, isLoading } = useQuery(['supplierDetails', id], () => {
        return SupplierService.getDetails({ id })
    }, {
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        refetchOnMount: false,
        onSuccess: (data) => {
            console.log("Supplier Details", data)
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
                                        <h4>Client  Update Form</h4>
                                    </div>
                                    {
                                        !isLoading && <SupplierCreateFrom data={eachClient?.data} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
}

export default SupplierDetails