import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import ClientServices from "../services/clientservices/ClientServices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ClientCreateForm = (prefill) => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    const initialValues = {
        id: null,
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        contact: "",
        phone: "",
        email: "",
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
            updateClient.mutate(data)
            return
        }
        mutation.mutate(data);
        return;
    };
    const mutation = useMutation(
        (formdata) => {
            return ClientServices.create(formdata);
        },
        {
            onSuccess: (data) => {
                console.log("Data", data?.data);
                toast?.success("Successfull", { delay: 10 });
                queryClient.invalidateQueries("clientlist");
                queryClient.removeQueries("clientlist");
                setTimeout(() => {
                    nav("/clientlist");
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
    const updateClient = useMutation(
        (formdata) => {
            return ClientServices.updateClients(formdata);
        },
        {
            onSuccess: (data) => {
                console.log("Data", data?.data);
                toast?.success("Successfull", { delay: 10 });

                setTimeout(() => {
                    queryClient.invalidateQueries("clientlist");
                    queryClient.refetchQueries("clientlist");
                    nav("/clientlist");
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
            formik.setFieldValue('state', prefill?.data?.state)
            formik.setFieldValue('zip', prefill?.data?.zip)
            formik.setFieldValue('contact', prefill?.data?.contact)
            formik.setFieldValue('phone', prefill?.data?.phone)
            formik.setFieldValue('email', prefill?.data?.email)
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
                            Client Name<span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter client name"
                            className="form-control py-1 px-3 event-input"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <label htmlFor>
                            City Name <span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter city name"
                            className="form-control py-1 px-3 event-input"
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <label htmlFor>
                            Street Address <span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter address name"
                            className="form-control py-1 px-3 event-input"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <label htmlFor>
                            State Name <span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter state name"
                            className="form-control py-1 px-3 event-input"
                            name="state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <label htmlFor>
                            Zip Code <span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter zip name"
                            className="form-control py-1 px-3 event-input"
                            name="zip"
                            value={formik.values.zip}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <label htmlFor>
                            Contact <span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter contact"
                            className="form-control py-1 px-3 event-input"
                            name="contact"
                            value={formik.values.contact}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <label htmlFor>
                            Phone <span>*</span>
                        </label>
                        <input
                            type="text"
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
                            Client Email <span>*</span>
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

export default ClientCreateForm;
