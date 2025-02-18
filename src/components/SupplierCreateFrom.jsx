import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import SupplierService from "../services/supplierservice/SupplierService";

const SupplierCreateFrom = (prefill) => {
    const queryClient = useQueryClient()

    const nav = useNavigate();
    const initialValues = {
        id: null,
        name: "",
        supplier_type: "",
        street_address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        fax: "",
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
            updateProjectStatus.mutate(data)
            return
        }
        mutation.mutate(data)
        return;
    };
    const mutation = useMutation(
        (formdata) => {
            return SupplierService.create(formdata);
        },
        {
            onSuccess: (data) => {
                console.log("Data", data?.data);
                toast?.success("Successfull", { delay: 10 });
                setTimeout(() => {
                    queryClient.invalidateQueries('supplierlist')
                    queryClient.refetchQueries('supplierlist')
                    nav("/suppliers");
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
            return SupplierService.updte(formdata);
        },
        {
            onSuccess: (data) => {
                console.log("Data", data?.data);
                toast?.success("Successfull", { delay: 10 });

                setTimeout(() => {
                    queryClient.invalidateQueries('supplierlist')
                    queryClient.refetchQueries('supplierlist')
                    nav("/suppliers");
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
            formik.setFieldValue('supplier_type', prefill?.data?.supplier_type)
            formik.setFieldValue('street_address', prefill?.data?.street_address)
            formik.setFieldValue('city', prefill?.data?.city)
            formik.setFieldValue('state', prefill?.data?.state)
            formik.setFieldValue('zip', prefill?.data?.zip)
            formik.setFieldValue('phone', prefill?.data?.phone)
            formik.setFieldValue('fax', prefill?.data?.fax)
            formik.setFieldValue('email', prefill?.data?.email)
        }
        return
    }, [prefill?.data])

    return (
        <div className="project-list-filter">
            <ToastContainer />
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                        <label htmlFor>
                            Supplier Name<span>*</span>
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
                    <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                        <label htmlFor>
                            Supplier Type<span>*</span>
                        </label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            name="supplier_type"
                            onChange={formik.handleChange}
                            value={formik.values.supplier_type}
                            onBlur={formik.handleBlur}
                        >
                            <option selected value={''}>--select--</option>
                            <option selected value={'test'}>test</option>
                            <option selected value={"test1"}>test1</option>
                            <option selected value={"test2"}>test2</option>
                        </select>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
                        <label htmlFor>
                            Street Address <span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter street address"
                            className="form-control py-1 px-3 event-input"
                            name="street_address"
                            value={formik.values.street_address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
                        <label htmlFor>
                            City<span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter city"
                            className="form-control py-1 px-3 event-input"
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
                        <label htmlFor>
                            state<span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter state"
                            className="form-control py-1 px-3 event-input"
                            name="state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
                        <label htmlFor>
                            zip<span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter zip"
                            className="form-control py-1 px-3 event-input"
                            name="zip"
                            value={formik.values.zip}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6 mb-3">
                        <label htmlFor>
                            phone<span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter phone"
                            className="form-control py-1 px-3 event-input"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 mb-3">
                        <label htmlFor>
                            fax<span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter fax"
                            className="form-control py-1 px-3 event-input"
                            name="fax"
                            value={formik.values.fax}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 mb-3">
                        <label htmlFor>
                            email<span>*</span>
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
                        <button type="button" className="btn common-btn-white me-3" onClick={() => nav("/suppliers")}>
                            Back
                        </button>
                        <button type="submit" className="btn common-btn">
                            {formik.values?.id ? "Update" : "Save"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SupplierCreateFrom;
