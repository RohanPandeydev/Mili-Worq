import React from 'react'
import SideBarNav from '../components/SideBarNav'
import Header from '../components/Header'
import SalesCreateForm from '../components/SalesCreateForm'


const CreateSalesPerson = () => {
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
                                <h4>New Salesperson Add Form
</h4>
                            </div>
                            <SalesCreateForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default CreateSalesPerson