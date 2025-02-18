import React from 'react'
import { useNavigate } from 'react-router-dom';
import Projectservices from '../services/projectservices/ProjectServices';
import SideBarNav from '../components/SideBarNav';
import ProjectStatusItems from '../components/ProjectStatusItems';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';

const ProjectStatusList = () => {

    const nav = useNavigate();

    const { data, isLoading } = useQuery(
      ["projectstatuslist"],
      () => {
        return Projectservices.getStatusList();
      },
      {
        refetchOnWindowFocus:false,
        onSuccess: (data) => {
          console.log(data?.data);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.detail || err?.message, { delay: 10 });
        },
      }
    );

  return (
    <>

        <section className="dashboard">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-12">
              <SideBarNav/>
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12">
              <div className="dashboard-content">
                <div className="row">
                  <div className="col-12">
                    <Header/>
                    <div className="project-list-content">
                      <div className="project-list-head">
                        <h4>Project Status List</h4>
                        <button
                          className="btn common-btn"
                          onClick={() => nav("/statusform")}
                        >
                          Create New Project Status
                        </button>
                      </div>
                      {isLoading?<p className='text-danger'>Please Wait..</p>: data?.data?.length == 0 ? (
                        <p className="text-primary">No Data Found</p>
                      ) : (
                        <ProjectStatusItems data={data?.data} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
    </>
  )
}

export default ProjectStatusList