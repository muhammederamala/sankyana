import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
const ShowMoretraning = () => {
  const [loading, Setloading] = useState(false);
  // this function will; upload the  images to cloudinary cloud and send me back the url to ba uploaded
  const [data, Setdata] = useState({
    title: "",
    description: "",
  });
  const [url, Seturl] = useState("");
  const [preview, Setpreview] = useState(""); // just for showing the image in the ui
  // this function will upload the image or the icons to cloud storage that will access anywhere using the url
  const UloadImagetoCloud = async (e) => {
    try {
      const file = e.target.files[0];
      const previewurl = URL.createObjectURL(file); // create the url of this
      Setpreview(previewurl);
      // uploading to cloudinary
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
      formdata.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
      // making request to cloudinary
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,

        formdata //once i clikc on the signup the photo is uploaded to cloudinary server and give a link that link is added in our datab user collection
      );
      Seturl(res.data.url);
      // console.log(res.data.url); // this will be send to backend
      // console.log(res.data.url); // this is the url of cloudinary
    } catch (error) {
      // console.log(error.message);
      toast.error(`${error.message}`);
    }
  };
  // this function will handle all the changes in the input tag
  const HandleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value); just for debugging
    Setdata({ ...data, [name]: value });
  };
  // this function will will send all the data to backend and calling an api here

  const SubmitData = async (e) => {
    e.preventDefault(); // Prevent the page from being submitted
    Setloading(true); // handling the state
    try {
      // Assuming 'data' and 'url' are variables containing the necessary data
      const dataToSend = {
        data: data,
        url: url,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/tranning`,
        dataToSend
      );

      // Example: Assuming the server responds with a success message
      if (response.data.success) {
        //  for showing some dealy i am using debouncing
        setTimeout(() => {
          Setloading(false);
          toast.success("Course Added Successfully");
        }, 1000);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      Setloading(false);
      // console.error("Error making POST request:", error);
      toast.error("Something went wrong");
      // Handle errors
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid"></div>
      </nav>
      <div className="content-wrapper">
        <div className="row">
          <div className="col d-flex">
            <button
              className="btn btn-outline-primary float-end mx-2"
              href="datascience.php"
            >
              Data Science
            </button>
            <button
              className="btn btn-outline-primary float-end mx-2"
              href="fullstack.php"
            >
              Full Stack
            </button>
            <button
              className="btn btn-outline-primary float-end mx-2"
              href="internship.php"
            >
              Internship
            </button>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-8">
              <h2 className="text-primary">SAS Dashboard</h2>
              <div className="row">
                {/* Sample cards with random data */}
                {/* need to call the api which will show all the data based on the database have */}
                <div className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">Card Title 1</h5>
                        <button type="button" className="btn btn-danger">
                          <FaTrashAlt size={10}></FaTrashAlt>
                        </button>
                      </div>
                      <p className="card-text">Card Description 1</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">Card Title 2</h5>
                        <button type="button" className="btn btn-danger">
                          <FaTrashAlt size={10}></FaTrashAlt>
                        </button>
                      </div>
                      <p className="card-text">Card Description 2</p>
                    </div>
                  </div>
                </div>

                {/* End of sample cards */}
              </div>
            </div>
            <div className="col-md-4">
              {/* conditional rendering of the images and titles  */}
              {preview ? (
                <>
                  <img
                    className="p-3"
                    src={preview}
                    alt="Preview"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      borderRadius: "20px",
                    }}
                  />
                  <button
                    onClick={() => {
                      Setpreview("");
                    }}
                    className="btn text-danger font-weight-bold"
                  >
                    X
                  </button>
                </>
              ) : (
                <h1 className="text-primary">Add Course</h1>
              )}
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    required
                    placeholder="Course Title"
                    onChange={HandleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    required
                    placeholder="Course Description"
                    onChange={HandleChange}
                  />
                </div>
                <label
                  htmlFor="fileInput"
                  className="btn btn-outline-primary btn-block"
                >
                  <input
                    type="file"
                    id="fileInput"
                    hidden
                    onChange={UloadImagetoCloud}
                  />
                  Add Image
                </label>

                <button
                  disabled={
                    data.title.length === 0 ||
                    data.description.length === 0 ||
                    url.length === 0
                  }
                  onClick={SubmitData}
                  type="submit"
                  className="btn btn-outline-primary w-100"
                >
                  {loading ? "...Adding" : "Add Course"}
                </button>
              </form>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowMoretraning;
