import React from 'react'
import UnitForm from '../components/Subcomponent/UnitForm'
import SideBarNav from '../components/SideBarNav'
import Header from '../components/Header'
import EstimationInformationMain from '../components/EstimationInformationMain'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'

const CreateEst = () => {
    const {pid}=useParams()

    
 

    

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
                                <h4>Estimation Create Form</h4>
                            </div>
                            <EstimationInformationMain id={pid} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default CreateEst