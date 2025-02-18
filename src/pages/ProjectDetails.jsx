import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Projectservices from '../services/projectservices/ProjectServices'
import { toast } from 'react-toastify'
import ProjectCreateForm from '../components/ProjectCreateForm'
import SideBarNav from "../components/SideBarNav";
import Header from '../components/Header'

const ProjectDetails = () => {
  const { id } = useParams()
  const { data: eachProject, isLoading } = useQuery(['projectDetails', id], () => {
    return Projectservices.getDetails({id})
  }, {
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    onSuccess: (data) => {
      console.log("Project Details", data)
      // queryClient.invalidateQueries('projectlist')
      // queryClient.refetchQueries('projectlist')

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
                    <h4>Project Update Form</h4>
                  </div>
                  {
                    !isLoading && <ProjectCreateForm data={eachProject?.data}  />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>)
}

export default ProjectDetails