import React from "react";

const EstimationTable = ({ data, handleRemove, handleEdit, setModal }) => {

    console.log(data, "Data====>")
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
                        {data?.length > 0 &&
                            data?.map((each, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td> <div className="row">
                                            <div className="col-lg">
                                                {each?.room || "room"}
                                            </div>
                                            <div className="col-lg">
                                                {each?.wall || "room"}
                                            </div>
                                        </div></td>
                                        <td>
                                            {each?.cabinet_details.map((elem) => {
                                                return (
                                                    <p className="">
                                                        {/* {elem?.cabinet +
                                                            "Base Cabinet ," +
                                                            elem?.stoneFt2_1 +
                                                            "," +
                                                            elem?.stoneFt2_3 +
                                                            "," +
                                                            elem?.ssl +
                                                            "," +
                                                            elem?.ssr +
                                                            "," +
                                                            elem?.bs ||
                                                            `21'' Base Cabinet, 1 door, 1 drawer, 1 adj. shelf - 34.5'' high`} */}

                                                        {
                                                            ` ${elem?.cabinet}'' Base Cabinet, ${elem?.stoneFt2_1} stoneFt2,  ${elem?.stoneFt2_2} stoneFt2_2, ${elem?.stoneFt2_3} stoneFt2_3'' `
                                                        }
                                                    </p>
                                                );
                                            })}
                                        </td>
                                        <td className="action">
                                            {/* <a href>
                                        <i className="fa-solid fa-arrow-up" />
                                    </a> */}
                                            {/* <a href>
                                        <i className="fa-solid fa-arrow-down" />
                                    </a> */}
                                            <a href>
                                                <i
                                                    className="fa-solid fa-pen"
                                                    onClick={() => handleEdit({ ...each, id: index })}
                                                />
                                            </a>

                                            <a href>
                                                <i
                                                    className="fa-solid fa-trash"
                                                    onClick={() => handleRemove(index)}
                                                />
                                            </a>

                                        </td>
                                    </tr>
                                );
                            })}

                        {/* <tr>
                            <td>2</td>
                            <td>B12L</td>
                            <td>
                                12'' Base Cabinet, 1 door, 1 drawer, 1 adj. shelf - 34.5'' high
                            </td>
                            <td className="action">
                                <a href>
                                    <i className="fa-solid fa-arrow-up" />
                                </a>
                                <a href>
                                    <i className="fa-solid fa-arrow-down" />
                                </a>
                                <a href>
                                    <i className="fa-solid fa-pen" />
                                </a>
                                <a href>
                                    <i className="fa-solid fa-trash" />
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>SB36</td>
                            <td>
                                36'' Sink Base Cabinet, 2 doors, 1 drawer panel, 1 open shelf -
                                34.5'' high
                            </td>
                            <td className="action">
                                <a href>
                                    <i className="fa-solid fa-arrow-up" />
                                </a>
                                <a href>
                                    <i className="fa-solid fa-arrow-down" />
                                </a>
                                <a href>
                                    <i className="fa-solid fa-pen" />
                                </a>
                                <a href>
                                    <i className="fa-solid fa-trash" />
                                </a>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EstimationTable;
