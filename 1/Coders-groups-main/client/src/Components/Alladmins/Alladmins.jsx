import React, { useEffect, useState } from "react";
// this components shows all the admins that are created by master admins
import { toast } from "react-toastify";
import axios from "axios";
const Alladmins = () => {
  const [data, Setdata] = useState([]); // handling all the admins data in this state
  const [deletes, Setdeletes] = useState(false);
  const [update, Setupdate] = useState(false);
  // this function will show all the admins that are created by master admin
  const ShowAdmins = async () => {
    // need to call an api function
    try {
      const alladmins = await axios.get(
        `${process.env.REACT_APP_API_URL}/alladmins`
      );
      if (alladmins.status === 200) {
        Setdata(alladmins.data);
        console.log(alladmins);
        // console.log(alladmins.data);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    ShowAdmins();
  }, [deletes]); // this will handle the side effect of the this component
  //   console.log(data); for debugging
  // this function will delete the admis
  const DeleteAdmin = async (id) => {
    Setdeletes(true);
    console.log(id);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/deleteadmin`,
        {
          id: id,
        }
      );
      if (res.status === 200) {
        console.log(res.data);
        Setdata(res.data);
        Setdeletes(false);
        toast.success("Deleted Admin Successfully");
      }
    } catch (error) {
      //   console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <table class="table mt-5 table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">UserName</th>
            <th scope="col">Password</th>
            <th scope="col">Role</th>

            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((admin, index) => (
            <tr key={admin.id}>
              <td className="font-weight-bold">{index + 1}</td>
              <td className="font-weight-bold">{admin.username}</td>
              <td className="font-weight-bold">{admin.password}</td>
              <td className="font-weight-bold">{admin.role}</td>

              <td>
                <button
                  onClick={() => DeleteAdmin(admin.id)}
                  className="btn btn-danger"
                >
                  {deletes ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Alladmins;
