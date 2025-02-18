import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Projectservices from "../services/projectservices/ProjectServices";

const StatusCreateForm = (prefill) => {
    const queryClient = useQueryClient()

    const nav = useNavigate();
    const initialValues = {
        id: null,
        name: "",
        short_name: "",
        color: "",
    };
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, action) => {
            console.log("value", values);
            SubmitHandler(values);
            return;
        },
    });
    const SubmitHandler = (data) => {
        console.log("Vale", !!prefill?.data);
        const checkprefill = !!prefill?.data
        if (checkprefill) {
            updateProjectStatus.mutate(data)
            return
        }
        mutation.mutate(data)
        return;
    };
    const mutation = useMutation(
        (formdata) => {
            return Projectservices.createStatus(formdata);
        },
        {
            onSuccess: (data) => {
                console.log("Data", data?.data);
                toast?.success("Successfull", { delay: 10 });
                setTimeout(() => {
                    nav("/projectstatuslist");
                    queryClient.invalidateQueries('projectstatuslist')
                    queryClient.refetchQueries('projectstatuslist')
                    return;
                }, 3000);

                return;
            },
            onError: (err) => {
                console.log(err?.message);
                toast.error(err?.response?.data?.detail || err?.message, {
                    delay: 10,
                });
                return;
            },
        }
    );
    const updateProjectStatus = useMutation(
        (formdata) => {
            return Projectservices.updteStatusProject(formdata);
        },
        {
            onSuccess: (data) => {
                console.log("Data", data?.data);
                toast?.success("Successfull", { delay: 10 });

                setTimeout(() => {
                    queryClient.invalidateQueries('projectstatuslist')
                    queryClient.refetchQueries('projectstatuslist')
                    nav("/projectstatuslist");
                    return;
                }, 3000);

                return;
            },
            onError: (err) => {
                console.log(err?.message);
                toast.error(err?.response?.data?.detail || err?.message, {
                    delay: 10,
                });
                return;
            },
        }
    );


    useEffect(() => {
        if (!!prefill && !!prefill?.data) {
            formik.setFieldValue('id', prefill?.data?.id)
            formik.setFieldValue('name', prefill?.data?.name)
            formik.setFieldValue('short_name', prefill?.data?.short_name)
            formik.setFieldValue('color', prefill?.data?.color)

            return
        }
        return

    }, [prefill?.data])

    return (
        <div className="project-list-filter">
            <ToastContainer />
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Name<span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter  name"
                            className="form-control py-1 px-3 event-input"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <label htmlFor>
                            Short Name <span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter short_name"
                            className="form-control py-1 px-3 event-input"
                            name="short_name"
                            value={formik.values.short_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <label htmlFor>
                            Color <span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter color"
                            className="form-control py-1 px-3 event-input"
                            name="color"
                            value={formik.values.color}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>

                    <div className="event-create-btns my-3">
                        <button type="submit" className="btn common-btn-white">
                            Cancel
                        </button>
                        <button type="submit" className="btn common-btn">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default StatusCreateForm;
