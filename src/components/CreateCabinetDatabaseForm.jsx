import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import DynamicFields from "./DynamicGeneratedFields";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CabinetServices from "../services/cabinetservices/CabinetServices";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateCabinetDatabaseForm = (prefill) => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    const [fields, setFields] = useState([{ supplier: "", cabinet_pricing: "" }]);

    const initialValues = {
        id: null,
        uid: "",
        item_num: "",
        description: "",
        lbs_carton: "",
        cuft_carton: "",
        width: "",
        height: "",
        lower_door: "",
        upper_door: "",
        full_height_door: "",
        drawer_box: "",
        drawer_panel: "",
        handles: "",
        open_shelf: "",
        adj_shelf: "",
        box_count: "",
        stone_width: "",
        stone_length: "",
        item_cost: "",
    };
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, action) => {
            SubmitHandler(values);
        },
    });
    const addField = () => {
        setFields([...fields, { supplier: "", cabinet_pricing: "" }]);
    };
    const handleInputChange = (index, field, value) => {
        const updatedFields = [...fields];
        updatedFields[index][field] = value;
        setFields(updatedFields);
    };

    // const makekeyvalue = (data) => {
    //     const transform = data.reduce((acc, current) => {
    //         const { cabinet_pricing, key } = current;

    //         // Check if value and key are not blank
    //         if (cabinet_pricing && key) {
    //             // Use key as key and value as value in the new object
    //             acc[key] = cabinet_pricing;
    //         }

    //         return acc;
    //     }, {});
    //     return transform

    // }

    const filterBlankObj = (array) => {
        const filteredArray = array.filter((obj) => {
            return Object.keys(obj).every((key) => obj[key] !== "" && key !== "");
        });
        return filteredArray;
    };

    const SubmitHandler = (data) => {
        const final_data = filterBlankObj(fields);
        console.log(final_data, fields);
        const formdata = { ...data, supplier_cabinet: JSON.stringify(final_data) };
        if (!!prefill && !!prefill?.data) {
            updateCabinetDatabase.mutate(formdata);
            return;
        }
        mutation.mutate(formdata);
        return;
    };
    const mutation = useMutation(
        (formdata) => {
            return CabinetServices.create(formdata);
        },
        {
            onSuccess: (data) => {
                console.log("Data", data?.data);
                toast?.success("Successfull", { delay: 10 });

                setTimeout(() => {
                    queryClient.invalidateQueries("cabinetdatabaselist");
                    queryClient.refetchQueries("cabinetdatabaselist");
                    nav("/cabinetdatabaselist");
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
    const updateCabinetDatabase = useMutation(
        (formdata) => {
            return CabinetServices.updateCabinet(formdata);
        },
        {
            onSuccess: (data) => {
                console.log("Data", data?.data);
                toast?.success("Successfull", { delay: 10 });

                setTimeout(() => {
                    queryClient.invalidateQueries("cabinetdatabaselist");
                    queryClient.refetchQueries("cabinetdatabaselist");
                    nav("/cabinetdatabaselist");
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
        console.log("FF",prefill)
        if (!!prefill && !!prefill?.data) {
            formik.setFieldValue("id", prefill?.data?.id);
            formik.setFieldValue("uid", prefill?.data?.uid);
            formik.setFieldValue("item_num", prefill?.data?.item_num);
            formik.setFieldValue("description", prefill?.data?.description);
            formik.setFieldValue("lbs_carton", prefill?.data?.lbs_carton);
            formik.setFieldValue("cuft_carton", prefill?.data?.cuft_carton);
            formik.setFieldValue("width", prefill?.data?.width);
            formik.setFieldValue("height", prefill?.data?.height);
            formik.setFieldValue("lower_door", prefill?.data?.lower_door);
            formik.setFieldValue("upper_door", prefill?.data?.upper_door);
            formik.setFieldValue("full_height_door", prefill?.data?.full_height_door);
            formik.setFieldValue("drawer_box", prefill?.data?.drawer_box);
            formik.setFieldValue("drawer_panel", prefill?.data?.drawer_panel);
            formik.setFieldValue("handles", prefill?.data?.handles);
            formik.setFieldValue("open_shelf", prefill?.data?.open_shelf);
            formik.setFieldValue("adj_shelf", prefill?.data?.adj_shelf);
            formik.setFieldValue("box_count", prefill?.data?.box_count);
            formik.setFieldValue("stone_width", prefill?.data?.stone_width);
            formik.setFieldValue("stone_length", prefill?.data?.stone_length);
            formik.setFieldValue("item_cost", prefill?.data?.item_cost);
            formik.setFieldValue("item_cost", prefill?.data?.item_cost);
            setFields( prefill?.data?.supplier_cabinet && JSON.parse(prefill?.data?.supplier_cabinet) ||[{ supplier: "", cabinet_pricing: "" }] );
        }
    }, [prefill?.data]);
    return (
        <div className="project-list-filter">
            <ToastContainer />
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            ID <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="uid"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.uid}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Item Num <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="item_num"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.item_num}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>

                    <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Description <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Lbs Carton <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="lbs_carton"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lbs_carton}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Cuft Carton <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="cuft_carton"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.cuft_carton}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Width <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="width"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.width}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Height <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="height"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.height}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Lower Door <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="lower_door"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lower_door}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Upper Door <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="upper_door"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.upper_door}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Full Height Door <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="full_height_door"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.full_height_door}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Drawer Box <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="drawer_box"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.drawer_box}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Drawer Panel <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="drawer_panel"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.drawer_panel}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Handles <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="handles"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.handles}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Open Shelf <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="open_shelf"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.open_shelf}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Adj. Shelf <span>*</span>
                        </label>
                        <input
                            type="text"
                            name="adj_shelf"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.adj_shelf}
                            // placeholder="Enter event name"
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Box Count <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="box_count"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.box_count}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Stone Width <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="stone_width"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.stone_width}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Stone Length <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="stone_length"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.stone_length}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Item Cost <span>*</span>
                        </label>
                        <input
                            type="text"
                            // placeholder="Enter event name"
                            name="item_cost"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.item_cost}
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <hr />
                    <DynamicFields
                        fields={fields}
                        setFields={setFields}
                        handleInputChange={handleInputChange}
                    />

                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <div className="event-create-btns my-4">
                            <button
                                type="button"
                                className="btn common-btn"
                                onClick={addField}
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    <div className="event-create-btns my-3">
                        <button type="button" className="btn common-btn-white">
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

export default CreateCabinetDatabaseForm;
