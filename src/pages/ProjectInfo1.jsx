import React from "react";
import SideBarNav from "../components/SideBarNav";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Projectservices from "../services/projectservices/ProjectServices";
import { ToastContainer, toast } from "react-toastify";
import ProjectInfoClient from "../components/Subcomponent/ProjectInfoClient";
import ProjectInfoSales from "../components/Subcomponent/ProjectInfoSales";
import ProjectInfoProject from "../components/Subcomponent/ProjectInfoProject";
import EstimationServices from "../services/estimationservices/EstimationServices";
const ProjectInfo = () => {
    const { id } = useParams();
    const nav = useNavigate();

    const { data, isLoading } = useQuery(
        ["projectinfo", id],
        () => {
            return Projectservices.getProjectInfo({ id });
        },
        {
            onSuccess: (data) => {
                console.log("====>", data?.data);
            },
            onError: (err) => {
                toast.error(err?.response, { delay: 10 });
            },
        }
    );

    const { data: projectEst, isLoading: isLoadEst } = useQuery(['projectest', id], () => EstimationServices.getProjectestList({ id }), {
        onSuccess: (data) => { console.log("data of Project est", data?.data) }, onError: (err) => {
            toast.error(err?.response?.data?.detail || err?.message, { delay: 10 })
            return
        }
    })
    const handleRedirect = (id) => {
        nav("/estimateinformation/" + id)
        return
    }
    return (
        <section className="dashboard">
            <ToastContainer />
            <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <SideBarNav />
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                    <div className="dashboard-content">
                        <div className="row">
                            <div className="col-12">
                                <Header />
                                <div className="project-list-content">
                                    <div className="project-list-head">
                                        <h4>Project Information</h4>
                                    </div>
                                    <div className="row my-3">
                                        <div className="col-lg-4 col-md-12 col-sm-12">
                                            <h5>Client</h5>
                                            <ul className="project-list-info">
                                                {!isLoading && (
                                                    <ProjectInfoClient data={data?.data?.client} />
                                                )}
                                            </ul>
                                        </div>
                                        <div className="col-lg-4 col-md-12 col-sm-12">
                                            <h5>Project</h5>
                                            <ul className="project-list-info">
                                                {!isLoading && (
                                                    <ProjectInfoProject data={data?.data?.project} />
                                                )}
                                            </ul>
                                        </div>
                                        <div className="col-lg-4 col-md-12 col-sm-12">
                                            <h5>Sales</h5>
                                            <ul className="project-list-info">
                                                {!isLoading && (
                                                    <ProjectInfoSales data={data?.data?.salespersons} />
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="project-list-head">
                                        <h4>Project Estimate</h4>
                                        <a href={'/project/estimateinformation/' + id}>
                                        <button className="btn common-btn" >Add Estimate</button>
                                        </a>
                                        
                                    </div>
                                    <div className="table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th scope="col">SL</th>
                                                    <th scope="col">Property</th>
                                                    <th scope="col">Regular Units</th>
                                                    <th scope="col">Mirror Units</th>
                                                    <th scope="col">Total Unit Quantity Date</th>
                                                    <th scope="col">Unit Name</th>

                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    !isLoadEst && projectEst?.data?.length && projectEst?.data?.map((each, index) => {
                                                        return <tr key={each?.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{each?.property}</td>
                                                            <td>{each?.regular_units}</td>
                                                            <td>{each?.mirror_units}</td>
                                                            <td>{each?.total_unit_quantity}</td>
                                                            <td>{each?.unit_name}</td>
                                                            <td className="action">
                                                                <button type="button" className="btn btn-view" onClick={() => handleRedirect(each?.id)}>
                                                                    View
                                                                </button>
                                                                {/* <button type="button" className="btn btn-copy">
                                                                    Copy Estimate
                                                                </button> */}
                                                            </td>
                                                        </tr>
                                                    })
                                                }


                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="project-list-filter">
                                        <form action method>
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-sm-12 my-3">
                                                    <label htmlFor>Notes</label>
                                                    <textarea
                                                        placeholder
                                                        className="form-control py-1 px-3 event-input"
                                                        rows={5}
                                                        cols={30}
                                                        defaultValue={
                                                            "                                            "
                                                        }
                                                    />
                                                </div>
                                                <div className="event-create-btns my-3">
                                                    <button type="submit" className="btn common-btn">
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectInfo;
