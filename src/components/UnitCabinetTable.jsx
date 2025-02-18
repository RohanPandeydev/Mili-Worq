import React from 'react'

const UnitCabinetTable = ({ data = [] }) => {
    return (
        <div>
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.length == 0 ? <p className='text-danger text-center'>No cabinet found.</p> : <tr >
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td className="action">
                                    <a href>
                                        <i className="fa-solid fa-pen"/>
                                    </a>
                                    <a href>
                                        <i className="fa-solid fa-trash"/>
                                    </a>
                                </td>
                            </tr>
                        }






                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UnitCabinetTable