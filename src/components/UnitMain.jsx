import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UnitTable from "./Subcomponent/UnitTable";
import { useQuery } from '@tanstack/react-query'
import EstimationService from '../services/EstimationService';

const UnitMain = ({ project_id, estimation_id }) => {
  const nav = useNavigate();
  console.warn(project_id, estimation_id,"est");

  const { data, isLoading } = useQuery(
    ["estimations_projects", project_id,estimation_id],
    () => {
      return EstimationService.getDetails({ id: project_id });
    },
    {
      enabled:!!project_id,
      onSuccess: (data) => {
        console.log("====>", data?.data);
      },
      onError: (err) => {
        toast.error(err?.response, { delay: 10 });
      },
    }
  );

  console.log("data", data)

  return (
    <>
      <ToastContainer />

      <div className="esti-info">
        <h4>Estimate Information</h4>
        <button
          type="button"
          onClick={() => nav("/project/estimateinformation/"+estimation_id +"/unit/unitform")}
          className="btn common-btn"
        >
          Add Unit
        </button>
      </div>

      {isLoading ? (
        <p className="text-danger">Please Wait..</p>
      ) : data?.data?.length == 0 ? (
        <p className="text-primary">No Data Found</p>
      ) : (
        <UnitTable estimation_id={estimation_id} project_id={project_id}/>
      )}
    </>
  );
};

export default UnitMain;
