import React from 'react'
import UnitForm from '../components/Subcomponent/UnitForm'
import SideBarNav from '../components/SideBarNav'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'

const CreateUnit = () => {
    const {eid}=useParams()
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
                                        <h4>Unit Create Form
                                        </h4>
                                    </div>
                                    <UnitForm eid={eid} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateUnit