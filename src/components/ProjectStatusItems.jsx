import React from "react";
import { Link } from "react-router-dom";
import ProjectFilter from "./ProjectFilter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Projectservices from "../services/projectservices/ProjectServices";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";

const ProjectStatusItems = ({ data }) => {
  const queryClient = useQueryClient();
  const handleDelete = (id) => {
    swal({
      title: "It will delete permanently",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        return projectStatusDelete.mutate({ id: id });
      } else {
      }
    });

    return;
  };
  const projectStatusDelete = useMutation(
    (formdata) => Projectservices.deleteStatus(formdata),
    {
      onSuccess: (data) => {
        console.log("Data", data);
        toast.success("Deleted", { delay: 10 });
        queryClient.invalidateQueries("projectstatuslist");
        queryClient.refetchQueries("projectstatuslist");
        return;
      },
      onError: (err) => {
        console.log(err);
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
      <ProjectFilter />
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th scope="col">SL</th>
              <th scope="col">Project Status ID</th>
              <th scope="col">Project Status Name</th>
              <th scope="col">Project Status Short Name</th>
              <th scope="col">Project Status Color</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((each, ind) => {
              return (
                <tr key={ind}>
                  <td>{ind + 1}</td>
                  <td>
                    <p className="id">{each?.id}</p>
                  </td>
                  <td>{each?.name}</td>

                  <td>{each?.short_name}</td>

                  <td>
                    <p className="bs" style={{ backgroundColor: each?.color, color: "black", borderRadius: '50%', height: '20px', width: '20px', display: 'block', margin: 'auto', border: '2px solid black' }}></p>
                    <p>{each?.color}</p>
                  </td>

                  <td className="action">
                    {/* <a href>
                                            <i className="fa-solid fa-arrow-right-arrow-left" />
                                        </a> */}
                    <Link to={"/project/status/details/" + each?.id}>
                      <i className="fa-solid fa-pen" />
                    </Link>
                    <button
                      onClick={() => handleDelete(each?.id)}
                      style={{ backgroundColor: "transparent" }}
                    >
                      <i className="fa-solid fa-trash" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectStatusItems;
