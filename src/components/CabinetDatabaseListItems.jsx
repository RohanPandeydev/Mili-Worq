import React from 'react'
import ProjectFilter from './ProjectFilter';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import CabinetServices from '../services/cabinetservices/CabinetServices';
import swal from 'sweetalert';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SearchFilter from './Filters/SearchFilter';

const CabinetDatabaseListItems = ({ data }) => {
    const queryClient = useQueryClient()

  const handleDelete = (id) => {
    swal({
      title: "It will delete permanently",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        return cabinetdatabase.mutate({ id: id })


      } else {
      }
    });


  }
  const cabinetdatabase = useMutation((formdata) => CabinetServices.deleteCabinetDatabase(formdata), {
    onSuccess: (data) => {
      console.log("Data", data)
      toast.success("Deleted", { delay: 10 })
      queryClient.invalidateQueries('cabinetdatabaselist')
      queryClient.refetchQueries('cabinetdatabaselist')
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
            <form action method>
            <div className="row">
                <SearchFilter />
              

                <div className="project-list-btns">
                    <button type="submit" className="btn common-btn-white">
                        Reset
                    </button>
                    <button type="submit" className="btn common-btn">
                        Filter
                    </button>
                </div>
            </div>
        </form>

            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">ID</th>
                            <th scope="col">Item Num</th>
                            <th scope="col">Description</th>
                            <th scope="col">Lbs/Carton</th>
                            <th scope="col">CuFt/Carton</th>
                            <th scope="col">Width</th>
                            <th scope="col">Height</th>
                            <th scope="col">Lower Door</th>
                            <th scope="col">Upper Door</th>
                            <th scope="col">Full Height Door</th>
                            <th scope="col">Drawer Box</th>
                            <th scope="col">Action</th>
                            {/* <th scope="col">Date Created</th>
                  <th scope="col">Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((each, ind) => {
                            return (
                                <tr key={ind}>
                                    <td>{ind + 1}</td>
                                    <td>
                                        <Link to={"/cabinetdatabase/details/"+each?.id}>

                                        
                                        <p className="id">{each?.uid}</p>
                                        </Link>
                                    </td>
                                    <td>{each?.item_num}</td>
                                    <td>{each?.description}</td>
                                    <td>{each?.lbs_carton}</td>
                                    <td>{each?.cuft_carton}</td>
                                    <td>{each?.width}</td>
                                    <td>{each?.height}</td>
                                    <td>{each?.lower_door}</td>
                                    <td>{each?.upper_door}</td>
                                    <td>{each?.full_height_door}</td>
                                    <td>{each?.drawer_box}</td>


                                    <td className="action">
                                        {/* <a href>
                                                <i className="fa-solid fa-arrow-right-arrow-left" />
                                            </a> */}
                                        <Link to={"/cabinetdatabase/details/"+each?.id}>
                                            <i className="fa-solid fa-pen" />
                                        </Link>
                                        <button onClick={() => handleDelete(each?.id)} style={{ backgroundColor: 'transparent' }}>
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
}

export default CabinetDatabaseListItems