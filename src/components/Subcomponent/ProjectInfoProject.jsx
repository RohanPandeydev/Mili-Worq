import React from 'react'

const ProjectInfoProject = ({data}) => {
  return (
    <div>
      <li className="pli-bg">
        <p className="light">Project ID</p>
        <p className="dark">{data?.id || 0}</p>
      </li>
      <li className="pli-bg-light">
        <p className="light">Project Name</p>
        <p className="dark">{data?.name || 'Audubon Square Apartments'}</p>
      </li>
      <li className="pli-bg">
        <p className="light">Street Address</p>
        <p className="dark">{data?.address || '2100 Hollywood Blvd'}</p>
      </li>
      <li className="pli-bg-light">
        <p className="light">City</p>
        <p className="dark">{data?.city ||'Hollywood'}</p>
      </li>
      <li className="pli-bg">
        <p className="light">Zip Code</p>
        <p className="dark">{data?.zip || '33020'}</p>
      </li>
      <li className="pli-bg-light">
        <p className="light">State</p>
        <p className="dark">{data?.state || 'Florida'}</p>
      </li>
    </div>
  );
}

export default ProjectInfoProject