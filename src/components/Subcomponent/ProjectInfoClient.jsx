import React from 'react'

const ProjectInfoClient = ({data}) => {
  return (
    <div>
  <li className="pli-bg">
    <p className="light">Client</p>
    <p className="dark">{data?.name || 'phillips'}</p>
  </li>
  <li className="pli-bg-light">
    <p className="light">Street Address</p>
    <p className="dark">{data?.address || 'dummy'}</p>
  </li>
  <li className="pli-bg">
    <p className="light">City</p>
    <p className="dark">{data?.city || 'kol'}</p>
  </li>
  <li className="pli-bg-light">
    <p className="light">State</p>
    <p className="dark">{data?.state || 'dummy'}</p>
  </li>
  <li className="pli-bg">
    <p className="light">Zip Code</p>
    <p className="dark">{data?.zip || '0000'}</p>
  </li>
  <li className="pli-bg-light">
    <p className="light">Contact</p>
    <p className="dark">{data?.contact || '464646879'}</p>
  </li>
  <li className="pli-bg">
    <p className="light">Phone</p>
    <p className="dark">{data?.phone || '9546753836'}</p>
  </li>
</div>

  )
}

export default ProjectInfoClient