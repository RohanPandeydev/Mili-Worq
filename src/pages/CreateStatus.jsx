import React from 'react'
import SideBarNav from '../components/SideBarNav'
import Header from '../components/Header'
import StatusCreateForm from '../components/StatusCreateForm'


const CreateStatus = () => {
    
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
                                        <h4>Status Create Form
                                        </h4>
                                    </div>
                                    <StatusCreateForm  />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateStatus