import moment from "moment/moment";
import React from "react";
import ProjectFilter from "./ProjectFilter";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Projectservices from "../services/projectservices/ProjectServices";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";

const ProjectListItems = ({ data }) => {
    const queryClient = useQueryClient()
    const handleDelete = (id) => {
        swal({
            title: "It will delete permanently",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                return projectDelete.mutate({ id: id })

            } else {
            }
        });
        return
    }
    const projectDelete = useMutation((formdata) => Projectservices.deleteProject(formdata), {
        onSuccess: (data) => {
            console.log("Data", data)
            toast.success("Deleted", { delay: 10 })
            queryClient.invalidateQueries('projectlist')
            queryClient.refetchQueries('projectlist')
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
                            <th scope="col">Project ID</th>
                            <th scope="col">Project Name</th>
                            <th scope="col">Document Status</th>
                            <th scope="col">Project Location</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Customer Contact</th>
                            <th scope="col">Customer Phone</th>
                            <th scope="col">Customer Email</th>
                            <th scope="col">Date Created</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((each, ind) => {
                                return <tr key={ind}>
                                    <td>{ind + 1}</td>
                                    <td>
                                        <Link to={'/projectinfo/' + each?.id}> <p className="id">{each?.id}</p></Link>
                                    </td>
                                    <td>{each?.name}</td>
                                    <td>
                                        <p className="bs">{each?.project_status_id == 1 ? "true" : "false"}</p>
                                    </td>
                                    <td>{`${each?.address}, ${each?.city},${each?.zip}`}</td>
                                    <td>{each?.clients_id == 1 ? "cornor" : "jack"}</td>
                                    <td>Terra Roux</td>
                                    <td>{ind + 1}954675383</td>
                                    <td>Terra.Roux@cornerstonegrp.com</td>
                                    <td>{moment(each?.estimated_delivery_date).format("LL")}</td>
                                    <td className="action">
                                        {/* <a href>
                                            <i className="fa-solid fa-arrow-right-arrow-left" />
                                        </a> */}
                                        <Link to={'/project/details/' + each?.id}>
                                            <i className="fa-solid fa-pen" />
                                        </Link>
                                        <button onClick={() => handleDelete(each?.id)} style={{ backgroundColor: 'transparent' }}>
                                            <i className="fa-solid fa-trash" />
                                        </button>
                                    </td>
                                </tr>

                            })
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectListItems;
