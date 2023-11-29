import React, { useState } from "react";
import axios from "axios";
// this components show a login page at the time of react vapplications mounts
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loggedInUser } from "../Redux/Reducers/Loginreducers";
const Homepage = () => {
  // this is state of the components based on that we will sending the password or some thing to backend
  const [logindata, Setlogindata] = useState({
    username: "",
    passwrd: "",
  });
  const [loading, Setloading] = useState(false); // showing a loading effect at the time of login clicki
  // creting instance of naviag or dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // this is the function wihch will handle all the changes in that compoents
  const HandleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value); // just for debugging
    Setlogindata({ ...logindata, [name]: value });
  };
  // this function wihch will handle data when user cliked on the button login in that compoents
  const handleSubmit = async (e) => {
    e.preventDefault();
    Setloading(true);

    // here making a api call to mysql database and save the data in the local storage as well as redux
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          data: logindata,
        }
      );

      // based on that response it will showt loading effect
      if (response.status === 200) {
        setTimeout(() => {
          toast.success("Login successful");
          Setloading(false);
          // dispatching the role to redux as well as to local storage to make my application persistent state
          localStorage.setItem("role", JSON.stringify(response.data));
          // dispatching the role to to the redux to access gloablly in the whole applicatio
          dispatch(loggedInUser(response.data));
          // navigate to admin page
          navigate("/admin");
        }, 1000);
      }
    } catch (err) {
      if (err && err.response && err.response.status === 400) {
        Setloading(false);
        toast.error("Invalid Credentials");
      }
    }
    // console.log(logindata);
  };
  //   console.log(logindata);
  return (
    <>
      <div className="container-fluid jumbotron">
        <h2 className="text-primary display-3">Admin Pannel</h2>
      </div>
      <div className="container">
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "4rem" }}
        >
          <div className="col-md-6">
            <div class="form-group">
              <input
                name="username"
                type="email"
                class="form-control"
                placeholder="Enter Username"
                onChange={HandleChange}
              ></input>
            </div>
            <div class="form-group">
              <input
                name="passwrd"
                type="password"
                class="form-control"
                placeholder="Password"
                onChange={HandleChange}
              ></input>
            </div>

            <button onClick={handleSubmit} class="btn btn-primary w-100">
              {loading ? "Processing..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
