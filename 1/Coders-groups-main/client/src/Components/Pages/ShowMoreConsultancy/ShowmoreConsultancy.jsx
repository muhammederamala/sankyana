import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const ShowmoreConsultancy = () => {
  const [singleData, SetsingleDate] = useState([]);
  const [id, Setid] = useState();
  const [update, Setupdate] = useState(false); // handling the update state of the cards
  const [alldata, Setalldata] = useState([]); // for  storing all the data
  const [loading, Setloading] = useState(false);
  const [data, Setdata] = useState({
    title: "",
    description: "",
  });
  const [data2, Setdata2] = useState({
    title: "",
    description: "",
  });
  const [preview1, Setpreview1] = useState(""); // just for showing the image in the ui
  const [url1, Seturl1] = useState("");
  const [url, Seturl] = useState("");
  const [preview, Setpreview] = useState(""); // just for showing the image in the ui
  // this function will upload the image or the icons to cloud storage that will access anywhere using the url
  // this function will fetch all the dat from backend
  useEffect(() => {
    getalldata();
  }, [loading]);
  const getalldata = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/getconsultingdata`
      );
      if (response.data.success) {
        //  for showing some dealy i am using debouncing
        Setalldata(response.data.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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
  // this function will upload the imag vafter updates
  const UloadImagetoCloud2 = async (e) => {
    try {
      const file = e.target.files[0];
      const previewurl = URL.createObjectURL(file); // create the url of this
      Setpreview1(previewurl);
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
      Seturl1(res.data.url);
      // console.log(res.data.url); // this will be send to backend
      // console.log(res.data.url); // this is the url of cloudinary
    } catch (error) {
      // console.log(error.message);
      toast.error(`${error.message}`);
    }
  };
  // this function will subit all the data in the backend
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
        `${process.env.REACT_APP_API_URL}/consulting`,
        dataToSend
      );

      // Example: Assuming the server responds with a success message
      if (response.data.success) {
        //  for showing some dealy i am using debouncing
        setTimeout(() => {
          Setloading(false);
          toast.success("Course Added Successfully");
          Setdata({
            title: "",
            description: "",
          });
          Setpreview("");
          Seturl("");
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

  // this function will handle all the changes in the input tag
  const HandleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value); just for debugging
    Setdata({ ...data, [name]: value });
  };
  const HandleChange1 = (e) => {
    const { name, value } = e.target;
    // console.log(name, value); just for debugging
    Setdata2({ ...data2, [name]: value });
  };
  // this function wil deelte the service based on the index
  const deleteService = async (index) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/deleteitem/`,
        {
          id: index,
        }
      );
      // console.log(response.data.remainingData); // Log the response if needed
      Setalldata(response.data.remainingData);
      // Handle success, update your state or perform any other necessary actions
    } catch (error) {
      console.error("Error deleting service:", error.message);
      // Handle the error, show a notification or perform other error-handling actions
    }
  };
  // this method will open a box for editing the previous one
  const OpenModal = async (id) => {
    Setupdate(true); // for showing the box based on this state
    Setid(id);
    Setpreview1("");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/getconsultingdataId/`,
        {
          params: {
            id: id,
          },
        }
      );

      if (response.data.success) {
        //  for showing some delay I am using debouncing
        // SetsingleDate(response.data.data);
        Seturl1(response.data.data.URL);
        Setdata2({
          title: response.data.data.Title,
          description: response.data.data.Description,
        });
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // this function will update the card
  const UpdateService = async (e) => {
    e.preventDefault();
    // making a api call to the backend to particular api
    Setloading(true);
    try {
      const dataToSend = {
        data: data2,
        url: url1,
        id: id,
      };
      // console.log(dataToSend);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/consulting`,
        dataToSend
      );
      if (response.data.success) {
        //  for showing some dealy i am using debouncing
        setTimeout(() => {
          Setloading(false);
          toast.success("Course Updated Successfully");
          Setdata2({
            title: "",
            description: "",
          });
          Setpreview1("");
          Seturl1("");
          Setupdate(false);
        }, 1000);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid"></div>
      </nav>
      <div className="content-wrapper">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-8 ">
              <h2 className="text-primary">Service Dashboard</h2>
              <div className="row">
                {/* Sample cards with random data */}
                {/* need to call the api which will show all the data based on the database have */}
                {/* Use map to dynamically render cards based on alldata */}
                {alldata.map((item) => (
                  <div className="col-md-6 mb-3" key={item.id}>
                    <div className="card  bg-secondary">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <button
                            onClick={() => OpenModal(item.id)}
                            type="button"
                            className="btn btn-warning"
                          >
                            <FaEdit size={10}></FaEdit>
                          </button>
                          <button
                            onClick={() => deleteService(item.id)}
                            type="button"
                            className="btn btn-danger"
                          >
                            <FaTrashAlt size={10}></FaTrashAlt>
                          </button>
                        </div>
                        <div className="mt-2 d-flex justify-content-center ">
                          <h4
                            style={{
                              fontWeight: "bold",
                              color: "black",
                              textDecoration: "underline",
                            }}
                            className="card-title "
                          >
                            {item.Title}
                          </h4>
                        </div>

                        <p className="card-text mt-2">{item.Description}</p>
                      </div>
                    </div>
                  </div>
                ))}

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
                <h1 className="text-primary">Add Service</h1>
              )}
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={data.title}
                    required
                    onChange={HandleChange}
                    placeholder="Add Service Title"
                  />
                </div>
                <div className="mb-3">
                  <input
                    value={data.description}
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    required
                    onChange={HandleChange}
                    placeholder="Add Service Description"
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
                  {loading ? "...Adding" : "Add Service"}
                </button>
              </form>
              <hr />
              {/* showing a inpt box to update the cars */}
              {/* showing only when user clicked on the update button contionally  */}
              {update ? (
                <>
                  <div>
                    {preview1 ? (
                      <>
                        <img
                          className="p-3"
                          src={preview1}
                          alt="Images"
                          style={{
                            maxWidth: "100px",
                            maxHeight: "100px",
                            borderRadius: "20px",
                          }}
                        />
                        <button
                          onClick={() => {
                            Setpreview1("");
                          }}
                          className="btn text-danger font-weight-bold"
                        >
                          X
                        </button>
                      </>
                    ) : (
                      <h1 className="text-primary">Update</h1>
                    )}
                  </div>

                  <form>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={data2.title}
                        required
                        onChange={HandleChange1}
                        placeholder="Add Service Title"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        value={data2.description}
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        required
                        onChange={HandleChange1}
                        placeholder="Add Service Description"
                      />
                    </div>

                    <label
                      htmlFor="fileInputs"
                      className="btn btn-outline-primary btn-block"
                    >
                      <input
                        type="file"
                        id="fileInputs"
                        hidden
                        onChange={UloadImagetoCloud2}
                      />
                      Change Image
                    </label>

                    <button
                      disabled={
                        data2.title.length === 0 ||
                        data2.description.length === 0 ||
                        url1.length === 0
                      }
                      onClick={UpdateService}
                      type="submit"
                      className="btn btn-outline-primary w-100"
                    >
                      {loading ? "...Updating" : "Update Service"}
                    </button>
                  </form>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowmoreConsultancy;
