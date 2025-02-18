import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import UnitServices from "../../services/UnitService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const UnitForm = ({ eid }) => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const initialValues = {
    id: null,
    name: "",
    hand: null,
    quantityInput: "",
    unit_type: null,
    stone_ft2: null,
    stone_ft22cm: null,
    stone_ft23cm: null,
    description: "",
    estimation_id: 0,
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, action) => {
      quantity: parseInt(values.quantityInput);
      console.log("value", values);
      const payload = {
        name: values.name,
        hand: "",
        unit_type: "",
        stone_ft2: "",
        stone_ft22cm: "",
        stone_ft23cm: "",
        description: values.description,
        estimation_id: eid,
        quantity: parseInt(values.quantityInput),
      };
      console.log("value>>>>", payload);
      SubmitHandler(payload);
      return;
    },
  });

  const SubmitHandler = (data) => {
    // console.log("Vale", !!prefill?.data);
    // const checkprefill = !!prefill?.data
    // if (checkprefill) {
    //     updateClient.mutate(data)
    //     return
    // }
    addUnitMutation.mutate(data);
    return;
  };

  const addUnitMutation = useMutation(
    (formdata) => {
      return UnitServices.create(formdata);
    },
    {
      onSuccess: (data) => {
        console.log("Data", data?.data);
        toast?.success("Successfull", { delay: 10 });
        queryClient.invalidateQueries("estimations_projects");
        queryClient.removeQueries("estimations_projects");
        setTimeout(() => {
          nav(-1);
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
      <ToastContainer/>
      <form action method onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
            <label htmlFor>
              Name <span>*</span>
            </label>
            <input
              type="text"
              placeholder=""
              className="form-control py-1 px-3 event-input"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <label htmlFor>
              Quantity <span>*</span>
            </label>
            <input
              type="text"
              placeholder
              className="form-control py-1 px-3 event-input"
              name="quantityInput"
              value={formik.values.quantityInput}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 my-3">
            <label htmlFor>
              Description
              <span>*</span>
            </label>
            <textarea
              placeholder
              className="form-control py-1 px-3 event-input"
              rows={5}
              cols={30}
              defaultValue={""}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="event-create-btns my-3">
            <button type="button" className="btn common-btn-white" onClick={() => nav(-1)}>
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

export default UnitForm;
