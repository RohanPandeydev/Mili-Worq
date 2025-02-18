import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Projectservices from "../../services/projectservices/ProjectServices";

const EstimationInformationForm = ({ submitHandler, data,formik }) => {
  
    const handleImage = (e) => {
        if (e?.target?.files[0].length == 0) {
            return;
        }
        console.log("==>",e?.target?.files[0])
        formik.setFieldValue("floor_plan", e?.target?.files[0]);
        return;
    };
    // const { data:projectlist, isLoading } = useQuery(['projectlistest'], () => { return Projectservices.getList() }, {
    //     onSuccess: (data) => {
    //         console.log(data?.data)
    //     },
    //     onError: (err) => {
    //         toast.error(err?.response?.data?.detail || err?.message, { delay: 10 })
    //     }
    // })

    useEffect(() => {
        // console.log("Datasdfndesifgbdisbfgibi",data)
        if (!!data) {
            formik?.setFieldValue("property", data?.property)
            formik?.setFieldValue("unit_name", data?.unit_name)
            formik?.setFieldValue("regular_units", data?.regular_units)
            formik?.setFieldValue("mirror_units", data?.mirror_units)
            formik?.setFieldValue("total_unit_quantity", data?.total_unit_quantity)
            formik?.setFieldValue("floor_plan", data?.floor_plan)
            formik?.setFieldValue("project_id", data?.project_id)
            formik?.setFieldValue("id", data?.id)
        }

    }, [data])

    return (
        <div className="project-list-filter">
          
            <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                    {/* <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor>Project </label>
                            <select
                                name="project"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.project}
                                className="form-select"
                                aria-label="Default select example"
                            >
                                <option selected>Open this select wall</option>
                                {
                                    projectlist?.data?.map((each)=>{
                                        return <option value={each?.id}>{each?.name}</option>
                                    })
                                }

                            </select>
                        </div> */}
                        <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor>Property:</label>
                            <input
                                type="text"
                                //placeholder="Enter event name"
                                name="property"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.property}
                                className="form-control py-1 px-3 event-input"
                            />
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <label htmlFor>Unit Name:</label>
                            <input
                                type="text"
                                name="unit_name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.unit_name}
                                //placeholder="Enter project name"
                                className="form-control py-1 px-3 event-input"
                            />
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor>Regular Units:</label>
                            <input
                                type="text"
                                //placeholder="Enter event name"
                                name="regular_units"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.regular_units}
                                className="form-control py-1 px-3 event-input"
                            />
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <label htmlFor>Mirror Units:</label>
                            <input
                                type="text"
                                name="mirror_units"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.mirror_units}
                                //placeholder="Enter project name"

                                className="form-control py-1 px-3 event-input"
                            />
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <label htmlFor>Total Unit Quantity:</label>
                            <input
                                type="text"
                                //placeholder="Enter project name"
                                name="total_unit_quantity"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.total_unit_quantity}
                                className="form-control py-1 px-3 event-input"
                            />
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <label htmlFor className="Upload-label">
                                Upload Floor Plan
                            </label>
                            <label
                                htmlFor="upload"
                                className="form-control py-1 px-3 event-input"
                            >
                                <span className="upload-file">
                                    <i className="fa fa-upload" /> Upload
                                </span>
                                <input type="file" id="upload" onChange={handleImage} />
                            </label>
                        </div>
                        <div className="event-create-btns my-3">
                            <button type="submit" className="btn common-btn" disabled={!!data}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            

        </div>
    );
};

export default EstimationInformationForm;
