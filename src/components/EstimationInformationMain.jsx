import React, { useEffect, useState } from 'react'
import Models from './Models'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import EstimationServices from '../services/estimationservices/EstimationServices'
import { ToastContainer, toast } from 'react-toastify'
import StorageHelper from '../helper/StorageHelper'

const EstimationInformationMain = ({ id }) => {
  const [isModal, setModal] = useState(false)
  const usrData=StorageHelper.getUserData()
  const nav = useNavigate()
  const formik = useFormik({
    initialValues: {
      estimator: "",
      date: "",
      plan_date: "",
      due_date: "",
      revision_notes: "",
      project_id: id
    },
    onSubmit: (values, action) => {
      submitHandler(values)
      return
    }
  })

  const submitHandler = (data) => {
    console.log("Data", data)
    addEstimation.mutate({ ...data,estimate:usrData?.email, date: data?.date + 'T09:22:25.149Z', plan_date: data?.plan_date + 'T09:22:25.149Z', due_date: data?.due_date + 'T09:22:25.149Z', })
  }



  const { data, isLoading } = useQuery(['estimatorlist'], () => EstimationServices.getEstimator(), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("Data", data)
    },
    onError: (err) => {
      console.log(err?.message);
      toast.error(err?.response?.data?.message || err?.message, {
        delay: 10,
      });
      return;
    },
  })

  const addEstimation = useMutation((formdata) => EstimationServices.createEstimation(formdata), {
    onSuccess: (data) => {
      console.log("====>", data?.data)
      toast.success('Created successfully')
      setTimeout(() => {
        nav('/projectinfo/'+id)
      }, 1000);
      // window.location.reload()
      return
    },
    onError: (err) => {
      console.log(err?.message);
      toast.error(err?.response?.data?.message || err?.message, {
        delay: 10,
      });
      return;
    },
  })




  return (
    <div className="project-list-filter">
      <ToastContainer />
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          {
            isModal ? <Models isModal={isModal} setModal={setModal} /> : <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
              <div className='row'>

                <div className="col-lg-11 col-md-12 col-sm-12 mb-3">
                  <label htmlFor>
                    Estimator <span>*</span>
                  </label>
                  <select className="form-select" aria-label="Default select example" name='estimator' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.estimator}>
                    <option selected>.....</option>
                    {
                      !isLoading && data?.data?.length > 0 && data?.data?.map((each) => {
                        return <option value={each?.name}>{each?.name}</option>
                      })
                    }

                  </select>
                </div>
                <div className="col-lg-11 col-md-12 col-sm-12 mb-3">
                  <button type='button' onClick={() => setModal(!isModal)}>Plus</button>
                </div>


              </div>

            </div>
          }
          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
            <label htmlFor>
              Date <span>*</span>
            </label>
            <input
              type="date"
              name='date' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.date}
              className="form-control py-1 px-3 event-input"
            />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <label htmlFor>
              Plan Date <span>*</span>
            </label>
            <input
              type="date"
              name='plan_date' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.plan_date}
              className="form-control py-1 px-3 event-input"
            />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <label htmlFor>
              Due Date <span>*</span>
            </label>
            <input
              type="date"
              name='due_date' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.due_date}
              className="form-control py-1 px-3 event-input"
            />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 my-3">
            <label htmlFor>
              Revision notes
              <span>*</span>
            </label>
            <textarea
              name='revision_notes' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.revision_notes}
              className="form-control py-1 px-3 event-input"
              rows={5}
              cols={30}
              defaultValue={"                                                "}
            />
          </div>
          <div className="event-create-btns my-3">
            <button type="button" className="btn common-btn-white"onClick={()=>nav(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn common-btn">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EstimationInformationMain