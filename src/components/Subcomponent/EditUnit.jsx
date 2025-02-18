import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UnitService from '../../services/UnitService';
import { useFormik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
// import UnitServices from '../../services/projectservices/unitservices';
import { ToastContainer, toast } from 'react-toastify';

const EditUnit = () => {
    const { eid, id } = useParams()
    const nav = useNavigate()
    const formik = useFormik({
        initialValues: {
            stone_ft2: "",
            stone_ft22cm: "",
            stone_ft23cm: "",
            name: "",
            quantity: "",
            hand: "",
            description: ""
        },
        onSubmit: (values, action) => {
            submitHandler(values)
            return

        }
    })

    const submitHandler = (data) => {
        console.log("Data", data)
        updteMutation.mutate({ ...data, id: id, estimation_id: eid })
    }

    const { data, isLoading } = useQuery(
        ["unitdetails", id],
        () => {
            return UnitService.getDetails({ id: id });
        },
        {
            onSuccess: (data) => {
                // console.log("====>Prefill", data?.data);
                formik.setFieldValue("name", data?.data?.name)
                formik.setFieldValue("stone_ft2", data?.data?.stone_ft2)
                formik.setFieldValue("stone_ft22cm", data?.data?.stone_ft22cm)
                formik.setFieldValue("stone_ft23cm", data?.data?.stone_ft23cm)
                formik.setFieldValue("quantity", data?.data?.quantity)
                formik.setFieldValue("hand", data?.data?.hand)
                formik.setFieldValue("description", data?.data?.description)
            },
            onError: (err) => {
                toast.error(err?.response, { delay: 10 });
            },
        }
    );

    const updteMutation = useMutation(
        (formdata) => {
            return UnitService.updte(formdata);
        },
        {
            onSuccess: (data) => {
                console.log("Data", data?.data);
                toast?.success("Successfull", { delay: 10 });
                // queryClient.invalidateQueries("clientlist");
                // queryClient.removeQueries("clientlist");
                setTimeout(() => {
                    nav(-1);
                    window.location.reload()
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

    return (
        <div className="project-list-filter">
            <ToastContainer />
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Stone Ft<sup>2</sup> <span>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control py-1 px-3 event-input"
                            name='stone_ft2'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.stone_ft2}
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Stone Ft<sup>2</sup> 2cm <span>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control py-1 px-3 event-input"
                            name='stone_ft22cm'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.stone_ft22cm}
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Stone Ft<sup>2</sup> 3cm <span>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control py-1 px-3 event-input"
                            name='stone_ft23cm'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.stone_ft23cm}
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Name <span>*</span>
                        </label>
                        <input
                            type="text"
                            name='name'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <label htmlFor>
                            Quantity <span>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control py-1 px-3 event-input"
                            name='quantity'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.quantity}
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Hand <span>*</span>
                        </label>
                        {/* <input
                            type="text"

                            name='hand'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.hand}
                            className="form-control py-1 px-3 event-input"
                        /> */}
                        <select className="form-select" name='hand'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.hand} aria-label="Default select example">
                            <option selected>Open this select hand</option>
                            <option value={'right'}>Right</option>
                            <option value={'left'}>Left</option>
                        </select>

                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 my-3">
                        <label htmlFor>
                            Description <span>*</span>
                        </label>
                        <textarea
                            placeholder
                            name='description'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            className="form-control py-1 px-3 event-input"
                            rows={5}
                            cols={30}
                            defaultValue={"                                                "}
                        />
                    </div>
                    <div className="event-create-btns my-3">
                        <button type="button" className="btn common-btn-white" onClick={()=>nav(-1)}>
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

export default EditUnit