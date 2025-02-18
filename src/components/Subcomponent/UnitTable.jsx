import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UnitService from '../../services/UnitService';
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";

const UnitTable = ({ estimation_id, project_id }) => {
    console.log("estimation_id", estimation_id);
    const nav = useNavigate();

    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery(
        ["units_estimation", estimation_id],
        () => {
            return UnitService.getByEstimationId({ id: estimation_id });
        },
        {
            enabled:!!estimation_id,
            onSuccess: (data) => {
                console.log("====>", data?.data);
            },
            onError: (err) => {
                toast.error(err?.response, { delay: 10 });
            },
        }
    );

    const handleDelete = (id) => {
        swal({
            title: "It will delete permanently",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                return unitDelete.mutate({ id: id });
            } else {
            }
        });

        return;
    };
    const unitDelete = useMutation(
        (formdata) => UnitService.delete(formdata),
        {
            onSuccess: (data) => {
                console.log("Data", data);
                toast.success("Deleted", { delay: 10 });
                queryClient.invalidateQueries("estimations_projects");
                queryClient.refetchQueries("estimations_projects");
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

    console.log("data", data)

    return (
        <div>
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <td scope="col"># </td>
                            <th scope="col">Unit Type </th>
                            <th scope="col">QTY</th>
                            <th scope="col">Hand</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <td scope="col"># </td>
                        <td scope="col">Unit Type</td>
                        <td scope="col">QTY</td>
                        <td scope="col">Hand</td>
                        <td scope="col">Description</td>
                        <td className="action">
                            {" "}
                            <a href>
                                <i
                                    className="fa-solid fa-pen"
                                    onClick={() =>
                                        nav("/project/estimateinformation/4/unit/5/details")
                                    }
                                />
                            </a>
                            <a href>
                                <i className="fa-solid fa-trash" />
                            </a>
                        </td> */}
                        {/* <a href>
                                        <i className="fa-solid fa-arrow-up" />
                                    </a> */}
                        {/* <a href>
                                        <i className="fa-solid fa-arrow-down" />
                                    </a> */}

                        {!isLoading && data?.data?.map((each, ind) => {
                            return (
                                <tr key={ind}>
                                    <td>{ind + 1}</td>
                                    <td>{each?.name}</td>
                                    <td>{each?.quantity}</td>
                                    <td>{each?.hand}</td>
                                    <td>{each?.description}</td>
                                    <td className="action">
                                        <a href={`/project/estimateinformation/${estimation_id}/unit/${each?.id}/details`}>
                                            <i className="fa-solid fa-pen" />
                                        </a>                                       <button
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

export default UnitTable;
