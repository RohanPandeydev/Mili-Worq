import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import ClientServices from "../services/clientservices/ClientServices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import SalesServices from "../services/salesservices/SalesServices";

const SalesCreateForm = (prefill) => {
    const queryClient = useQueryClient();

    const nav = useNavigate();
    const initialValues = {
        name: "",
        phone: "",
        email: "",
        person_type: ""
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
        console.log("Vale", data);
        const checkprefill = !!prefill?.data
        if (checkprefill) {
            updateSalesPerson.mutate(data)
            return
        }
        mutation.mutate(data)
        return;
    };
    const mutation = useMutation(
        (formdata) => {
            return SalesServices.create(formdata);
        },
        {
            onSuccess: (data) => {
                console.log("Data", data?.data);
                toast?.success("Successfull", { delay: 10 });
                setTimeout(() => {
                    nav("/salespersonlist");
                    queryClient.invalidateQueries("salespersonlist");
                    queryClient.removeQueries("salespersonlist");
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

    const updateSalesPerson = useMutation(
        (formdata) => {
            return SalesServices.updateSalesPerson(formdata);
        },
        {
            onSuccess: (data) => {
                console.log("Data", data?.data);
                toast?.success("Successfull", { delay: 10 });

                setTimeout(() => {
                    queryClient.invalidateQueries("salespersonlist");
                    queryClient.refetchQueries("salespersonlist");
                    nav("/salespersonlist");
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
            formik.setFieldValue('phone', prefill?.data?.phone)
            formik.setFieldValue('email', prefill?.data?.email)
            formik.setFieldValue('person_type', prefill?.data?.person_type)

            return
        }
        return

    }, [prefill?.data])
    return (
        <div className="project-list-filter">
            <ToastContainer />
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <label htmlFor>
                            Person Type <span>*</span>
                        </label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            name="person_type"
                            onChange={formik.handleChange}
                            value={formik.values.person_type}
                            onBlur={formik.handleBlur}
                        >
                            <option selected>Person Type</option>
                            <option value={'manager'}>Manager</option>;
                            <option value={'salesperson'}>Sales Person </option>;
                        </select>
                    </div>
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
                            Phone <span>*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter phone number"
                            className="form-control py-1 px-3 event-input"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <label htmlFor>
                            Email <span>*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="form-control py-1 px-3 event-input"
                            name="email"
                            value={formik.values.email}
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

export default SalesCreateForm;
