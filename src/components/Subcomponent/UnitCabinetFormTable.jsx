import React, { useEffect, useState } from 'react'

const UnitCabinetFormTable = ({cabinetList,roomName}) => {

    const [tableData,setTableData]=useState([])

    // console.log("===",JSON.parse(cabinetList[0].cabinet_list))


    useEffect(()=>{
        // const filterOut=JSON.parse(cabinetList[0].cabinet_list)
        const parsedData=
            cabinetList.map((each)=>{
                return JSON.parse(each?.cabinet_list)
            })
            setTableData(parsedData)
        
        console.log("Filter",roomName,parsedData)
        



    },[roomName])
  return (
    <div className="table-responsive">
    <table>
        <thead>
         
                    return <tr>
                    <th scope="col">SL</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                </tr>

            
        </thead>
        <tbody>
            {/* {
                cabinetList.map((each)=>{
                    return JSON.parse(each?.cabinet_list)
                })
            } */}
        {/* {
                cabinetList.map((each,ind)=>{

                    return JSON.parse(each?.cabinet_list).map((ele)=>{
                        return ele.kitchen_room.map((elem)=>{
                            return <td>
                                {elem.wall}
                                </td>
                        })
                            
                    }) */}
                  


                {/* })
            } */}

            {/* <tr>
                <td>1</td>
                <td>B21L</td>
                <td>21'' Base Cabinet, 1 door, 1 drawer, 1 adj. shelf - 34.5'' high</td>
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
                <td>2</td>
                <td>B12L</td>
                <td>12'' Base Cabinet, 1 door, 1 drawer, 1 adj. shelf - 34.5'' high</td>
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
                <td>36'' Sink Base Cabinet, 2 doors, 1 drawer panel, 1 open shelf - 34.5'' high</td>
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
  )
}

export default UnitCabinetFormTable