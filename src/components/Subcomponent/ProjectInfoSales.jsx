import React from "react";

const ProjectInfoSales = ({data}) => {
    return (
        <div>
            <li className="pli-bg">
                <p className="light">Salesperson</p>
                <p className="dark">{data?.name ||'Jack Greenfield'}</p>
            </li>
            <li className="pli-bg-light">
                <p className="light">Phone</p>
                <p className="dark">{data?.phone || '(954)614-7410'}</p>
            </li>
            <li className="pli-bg">
                <p className="light">Email</p>
                <p className="dark">{data?.email || 'JackGreenfield@bellsouth.net'}</p>
            </li>
        </div>
    );
};

export default ProjectInfoSales;
