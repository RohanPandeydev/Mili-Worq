import React, { useState } from "react";
import EstimationInformationForm from "./Subcomponent/EstimationInformationForm";
import EstimationCabinetList from "./Subcomponent/EstimationCabinetList";
import EstimationTable from "./Subcomponent/EstimationTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EstimationServices from "../services/estimationservices/EstimationServices";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

const EstimationInformationMain = () => {
    const queryClient = useQueryClient();
    const [updte,setUpdte]=useState()
    const nav = useNavigate();
    const { id ,pid} = useParams();
    //Fetch Estimation Info
    const { data: prefillData, isLoading } = useQuery(
        ["estimationinfo"],
        () => EstimationServices.getEstimateDetails({ id }),
        {
            enabled: !!id,
            onSuccess: (data) => {
                console.log("My Data==>", data);
            },
            onError: (err) => {
                console.log(err?.message);
                toast.error(err?.response?.data?.message || err?.message, {
                    delay: 10,
                });
                return;
            },
        }
    );
    const initialValues = {
        project_id: "",
        property: "",
        unit_name: "",
        regular_units: "",
        mirror_units: "",
        total_unit_quantity: "",
        floor_plan: "",
    };
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, action) => {
            submitHandler(values);
            return;
        },
    });


    const submitHandler = (values) => {
        // console.log("Values", values,typeof(values?.floor_plan));
        const formdata = new FormData();
        formdata.append("project_id", values?.project_id || pid);
        formdata.append("property", values?.property);
        formdata.append("unit_name", values?.unit_name);
        formdata.append("regular_units", values?.regular_units);
        formdata.append("mirror_units", values?.mirror_units);
        formdata.append("total_unit_quantity", values?.total_unit_quantity);
        formdata.append("floor_plan",values?.floor_plan);
        formdata.append("cabinet_list", JSON.stringify(""));
        EstInfoForm.mutate(formdata);
    };
    const handleSave = (data) => {
        console.log("RRR",formik.values);
        const getValues = Object.values(data);
        const updteobj = Object.values(getValues);
        console.log("===>", updte);
        // const formdata = new FormData();
        // formdata.append("project_id", formik.values?.project_id || pid);
        // formdata.append("property", formik.values?.property);
        // formdata.append("unit_name", formik.values?.unit_name);
        // formdata.append("regular_units", formik.values?.regular_units);
        // formdata.append("mirror_units", formik.values?.mirror_units);
        // formdata.append("total_unit_quantity", formik.values?.total_unit_quantity);
        // formdata.append("floor_plan", formik.values?.floor_plan);
        // formdata.append("cabinet_list", JSON.stringify(updteobj));
        const formdata = {
            ...formik.values,
            floor_plan:JSON.stringify("image"),
            cabinet_list: JSON.stringify(updteobj),
        };
        EstInfoFormUpdte.mutate(formdata);
        return;
    };
    const EstInfoForm = useMutation(
        (formdata) => {
            return EstimationServices.create(formdata);
        },
        {
            onSuccess: (data) => {
                console.log("Data", data?.data);
                // setId(data?.data?.id)
                // toast?.success("Successfull", { delay: 10 });
                // queryClient.invalidateQueries("estimationinfo");
                // queryClient.removeQueries("estimationinfo");
                nav("/estimateinformation/" + data?.data?.id);
                // setTimeout(() => {
                //     nav("/estimationinfo");
                //     return;
                // }, 3000);

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
    const EstInfoFormUpdte = useMutation(
        (formdata) => {
            return EstimationServices.updateCabinet(formdata);
        },
        {
            onSuccess: (data) => {
                toast?.success("Successfull", { delay: 10 });
                setTimeout(() => {
                    queryClient.invalidateQueries("projectlist");
                    queryClient.removeQueries("projectlist");
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

    // const deleteCabinet=useMutation((formdata)=>{
    //     return EstimationServices.deleteCabinetData(formdata)
    // },{
    //     onSuccess:()=>{
    //         console.log("Data",data)
    //         toast.success("Deleted",{delay:10})
    //         return
    //     },
    //     onError:(err)=>{
    //         toast.error(err?.response?.data?.detail || err?.message,{delay:10})
    //         return
    //     }
    // })
    return (
        <>
            <ToastContainer />

            {<EstimationInformationForm formik={formik} data={!isLoading && prefillData?.data} submitHandler={submitHandler} />}
            {!!id && !isLoading && (
                <EstimationCabinetList
                    handleSave={handleSave}
                    prefillData={prefillData}
                />
            )}
        </>
    );
};

export default EstimationInformationMain;
