import React from "react";
import SideBarNav from "../components/SideBarNav";
import Header from "../components/Header";
import calendar from "../assets/images/calender.png";
import RecentProjects from "../components/RecentProjects";
import { useQuery } from "@tanstack/react-query";
import AuthServices from "../services/authservices/AuthServices";

const Dashboard = () => {
  
    return (
        <section className="dashboard">
            <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <SideBarNav />
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                    <div className="dashboard-content">
                        <div className="row">
                            <div className="col-12">
                                <Header />
                            </div>
                            <div className="col-lg-4 col-md-5 col-sm-12">
                                <div className="dashboard-project">
                                    <h5>Recent Projects</h5>
                                    <RecentProjects />
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-7 col-sm-12">
                                <div className="dashboard-calender">
                                    <img src={calendar} alt />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
