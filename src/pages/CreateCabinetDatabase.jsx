import React from 'react'
import Header from '../components/Header'
import SideBarNav from '../components/SideBarNav'
import CreateCabinetDatabaseForm from '../components/CreateCabinetDatabaseForm'

const CreateCabinetDatabase = () => {
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
                                <h4>New Cabinet Database Add Form</h4>
                            </div>
                            <CreateCabinetDatabaseForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default CreateCabinetDatabase