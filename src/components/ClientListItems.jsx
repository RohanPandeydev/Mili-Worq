import React from "react";
import { Link } from "react-router-dom";
import ClientServices from "../services/clientservices/ClientServices";
import ProjectFilter from "./ProjectFilter";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import swal from "sweetalert";

const ClientListItems = ({ data }) => {
  const queryClient = useQueryClient()

  const handleDelete = (id) => {
    console.log("Id", id)
    swal({
      title: "It will delete permanently",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        return clientDelete.mutate({ id: id })


      } else {
      }
    });


  }
  const clientDelete = useMutation((formdata) => ClientServices.deleteClient(formdata), {
    onSuccess: (data) => {
      console.log("Data", data)
      toast.success("Deleted", { delay: 10 })
      queryClient.invalidateQueries('clientlist')
      queryClient.refetchQueries('clientlist')
      return

    },
    onError: (err) => {
      console.log(err)
      toast.error(err?.response?.data?.detail || err?.message, { delay: 10 })
      return

    }
  })
  return (
    <div className="project-list-filter">
      <ToastContainer />
      <ProjectFilter />

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th scope="col">SL</th>
              <th scope="col">Client ID</th>
              <th scope="col">Client Name</th>
              <th scope="col">Client Address</th>
              <th scope="col">Client Phone</th>
              <th scope="col">Client Email</th>
              {/* <th scope="col">Date Created</th>
              <th scope="col">Action</th> */}
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
                  {/* <td>
                    <p className="bs">
                      {each?.project_status_id == 1 ? "true" : "false"}
                    </p>
                  </td> */}
                  <td>{`${each?.address}, ${each?.city},${each?.zip}`}</td>
                  {/* <td>{each?.clients_id == 1 ? "cornor" : "jack"}</td>
                  <td>Terra Roux</td> */}
                  <td>{each?.phone}</td>
                  <td>{each?.email}</td>
                  {/* <td>{moment(each?.estimated_delivery_date).format("LL")}</td> */}
                  <td className="action">
                    {/* <a href>
                                            <i className="fa-solid fa-arrow-right-arrow-left" />
                                        </a> */}
                    <Link to={'/client/details/' + each?.id}>
                      <i className="fa-solid fa-pen" />
                    </Link>
                    <button onClick={() => handleDelete(each?.id)} style={{ backgroundColor: 'transparent' }}>
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

export default ClientListItems;
