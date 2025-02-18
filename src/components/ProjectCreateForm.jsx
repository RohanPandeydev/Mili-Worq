import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import SalesServices from "../services/salesservices/SalesServices";
import ClientServices from "../services/clientservices/ClientServices";
import Projectservices from "../services/projectservices/ProjectServices";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

const ProjectCreateForm = (prefill) => {
    const queryClient = useQueryClient()
    const nav = useNavigate();
    const [toggleform, setToggleForm] = useState(true);
    const initialValues = {
        id: null,
        name: "",
        address: "",
        city: "",
        zip: "",
        state: "",
        clients_id: "",
        sales_person_id: "",
        project_status_id: "",
        estimated_delivery_date: "",
        estimated_due_date: "",
    };
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, action) => {
            submitHandler(values);
            return;
        },
    });
    const { data: saleslist, isLoading: isLoadSalesPerson } = useQuery(
        ["salesmanlist"],
        () => {
            return SalesServices.getList();
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                console.log("DataSales", data?.data);
                return;
            },
            onError: (err) => {
                toast.error(err?.message);
                return;
            },
        }
    );
    const { data: clientlist, isLoading: isLoadClient } = useQuery(
        ["clientlist"],
        () => {
            return ClientServices.getList();
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                console.log("DataClient", data?.data);
                return;
            },
            onError: (err) => {
                toast.error(err?.message);
                return;
            },
        }
    );
    const { data: status, isLoading: isLoadStatus } = useQuery(
        ["statusList"],
        () => {
            return Projectservices.getStatusList();
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                console.log("data status ", data?.data);
                return;
            },
            onError: (err) => {
                toast.error(err?.message);
                return;
            },
        }
    );
    const submitHandler = (data) => {
        console.log("VV", data)
        const formdata = {

            ...data,
            estimated_delivery_date: data?.estimated_delivery_date,
            estimated_due_date: data?.estimated_due_date,
        };
        const checkprefill = !!prefill?.data
        if (checkprefill) {
            updateProject.mutate(formdata)
            return
        }



        mutation.mutate(formdata);
    };

    const updateProject = useMutation(
        (formdata) => {
            return Projectservices.updteProject(formdata);
        },
        {
            onSuccess: (data) => {
                console.log("Data", data?.data);
                toast?.success("Successfull", { delay: 10 });

                setTimeout(() => {
                    queryClient.invalidateQueries('projectlist')
                    queryClient.refetchQueries('projectlist')
                    nav("/projectlist");
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

    const mutation = useMutation(
        (formdata) => {
            return Projectservices.create(formdata);
        },
        {
            onSuccess: (data) => {
                console.log("Data", data?.data);
                toast?.success("Successfull", { delay: 10 });
                setTimeout(() => {
                    nav("/projectlist");
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
            formik.setFieldValue('address', prefill?.data?.address)
            formik.setFieldValue('city', prefill?.data?.city)
            formik.setFieldValue('zip', prefill?.data?.zip)
            formik.setFieldValue('state', prefill?.data?.state)
            formik.setFieldValue('clients_id', prefill?.data?.clients_id)
            formik.setFieldValue('sales_person_id', prefill?.data?.sales_person_id)
            formik.setFieldValue('project_status_id', prefill?.data?.project_status_id)
            formik.setFieldValue('estimated_delivery_date', prefill?.data?.estimated_delivery_date)
            formik.setFieldValue('estimated_due_date', prefill?.data?.estimated_due_date)
            return
        }
        return

    }, [prefill?.data])

    useEffect(() => {
        console.log("formik values", formik.values.clients_id, toggleform);
        if (formik.values.clients_id != 0) {
            setToggleForm(false);
        }
    }, [formik.values.clients_id]);




    return (
        <div className="project-list-filter">
            <ToastContainer />
            {isLoadSalesPerson || isLoadClient || isLoadStatus ? (
                <p className="text-danger">Please Wait</p>
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-6">
                            <label htmlFor>
                                Client Id <span>*</span>
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                name="clients_id"
                                onChange={formik.handleChange}
                                value={formik.values.clients_id}
                                onBlur={formik.handleBlur}
                            >
                                <option selected value={0}>
                                    Enter Client Id
                                </option>
                                {clientlist.data?.map((each) => {
                                    return <option value={each?.id}>{each?.name}</option>;
                                })}
                            </select>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-12">
                            <label htmlFor>
                                Project Name <span>*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                                disabled={toggleform}
                                placeholder="Project Name"
                                className="form-control py-1 px-3 event-input"
                            />
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <label htmlFor>
                                Street Address <span>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Street Address"
                                name="address"
                                onChange={formik.handleChange}
                                value={formik.values.address}
                                onBlur={formik.handleBlur}
                                disabled={toggleform}
                                className="form-control py-1 px-3 event-input"
                            />
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <label htmlFor>
                                City <span>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="City"
                                name="city"
                                onChange={formik.handleChange}
                                value={formik.values.city}
                                onBlur={formik.handleBlur}
                                disabled={toggleform}
                                className="form-control py-1 px-3 event-input"
                            />
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <label htmlFor>
                                Zip Code<span>*</span>
                            </label>
                            <input
                                type="number"
                                name="zip"
                                onChange={formik.handleChange}
                                value={formik.values.zip}
                                onBlur={formik.handleBlur}
                                placeholder
                                disabled={toggleform}
                                className="form-control py-1 px-3 event-input"
                            />
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <label htmlFor>
                                State <span>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter  State"
                                name="state"
                                onChange={formik.handleChange}
                                value={formik.values.state}
                                onBlur={formik.handleBlur}
                                disabled={toggleform}
                                className="form-control py-1 px-3 event-input"
                            />
                        </div>
                        {/* <div className="col-lg-6 col-md-6 col-sm-6 mb-6">
                            <label htmlFor>
                                Company Name <span>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter company name"
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                                disabled={toggleform}
                                className="form-control py-1 px-3 event-input"
                            />
                        </div> */}
                        <div className="col-lg-6 col-md-6 col-sm-6 mb-6">
                            <label htmlFor>
                                Sales Person <span>*</span>
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                name="sales_person_id"
                                onChange={formik.handleChange}
                                value={formik.values.sales_person_id}
                                onBlur={formik.handleBlur}
                                disabled={toggleform}
                            >
                                <option selected>Enter Sales Person</option>
                                {saleslist?.data.map((each) => {
                                    return <option value={each?.id}>{each?.name}</option>;
                                })}
                            </select>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 mb-6">
                            <label htmlFor>
                                Status <span>*</span>
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                name="project_status_id"
                                onChange={formik.handleChange}
                                value={formik.values.project_status_id}
                                onBlur={formik.handleBlur}
                                disabled={toggleform}
                            >
                                <option selected>Status</option>
                                {status?.data.map((each) => {
                                    return <option value={each?.id}>{each?.name}</option>;
                                })}
                            </select>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 mb-6">
                            <label htmlFor>
                                Estimated Due Date <span>*</span>
                            </label>
                            <input
                                type="datetime-local"
                                onChange={formik.handleChange}
                                value={formik.values.estimated_due_date}
                                onBlur={formik.handleBlur}
                                disabled={toggleform}
                                name="estimated_due_date"
                                className="form-control py-1 px-3 event-input"
                            />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 mb-6">
                            <label htmlFor>
                                Estimated Delivery Date <span>*</span>
                            </label>
                            <input
                                type="datetime-local"
                                onChange={formik.handleChange}
                                value={formik.values.estimated_delivery_date}
                                onBlur={formik.handleBlur}
                                disabled={toggleform}
                                name="estimated_delivery_date"
                                className="form-control py-1 px-3 event-input"
                            />
                        </div>

                        <div className="event-create-btns my-3">
                            <button type="button" className="btn common-btn-white" onClick={()=>nav(-1)}>
                                Cancel
                            </button>
                            <button type="submit" className="btn common-btn" >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ProjectCreateForm;
