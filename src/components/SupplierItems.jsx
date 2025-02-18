import React from "react";
import { Link } from "react-router-dom";
import SupplierFilter from "./SupplierFilter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SupplierService from "../services/supplierservice/SupplierService";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";

const SupplierItems = ({ data }) => {
  const queryClient = useQueryClient();
  const handleDelete = (id) => {
    swal({
      title: "It will delete permanently",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        return supplierDelete.mutate({ id: id });
      } else {
      }
    });

    return;
  };
  const supplierDelete = useMutation(
    (formdata) => SupplierService.delete(formdata),
    {
      onSuccess: (data) => {
        console.log("Data", data);
        toast.success("Deleted", { delay: 10 });
        queryClient.invalidateQueries("supplierlist");
        queryClient.refetchQueries("supplierlist");
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

  return (
    <div className="project-list-filter">
      <ToastContainer />
      <SupplierFilter />
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th scope="col">SL</th>
              <th scope="col">Supplier Name</th>
              <th scope="col">Supplier Type</th>
              <th scope="col">Street Aaddress</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col">Zipcode</th>
              <th scope="col">Phone</th>
              <th scope="col">Fax</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((each, ind) => {
              return (
                <tr key={ind}>
                  <td>{ind + 1}</td>
                  {/* <td>
                    <p className="id">{each?.id}</p>
                  </td> */}
                  <td>{each?.name}</td>
                  <td>{each?.supplier_type}</td>
                  <td>{each?.street_address}</td>
                  <td>{each?.city}</td>
                  <td>{each?.state}</td>
                  <td>{each?.zip}</td>
                  <td>{each?.phone}</td>
                  <td>{each?.fax}</td>
                  <td>{each?.email}</td>
                  <td className="action">
                    <Link to={"/suppliers/details/" + each?.id}>
                      <i className="fa-solid fa-pen" />
                    </Link>
                    <button
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

export default SupplierItems;
