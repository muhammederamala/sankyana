import React, { useState, useEffect } from "react";

const AddAnalytics = () => {
  const [formData, setFormData] = useState({
    card_title: "",
    icon: "",
    card_desc: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    // Fetch data when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("api/ana_table"); // Replace with your server endpoint
      const data = await response.json();
      setFetchedData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const response = await fetch("api/add_ana", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   const data = await response.json();

    //   if (data.success) {
    //     setSuccess("Record added successfully!");
    //     setFormData({
    //       card_title: "",
    //       icon: "",
    //       card_desc: "",
    //     });
    //     fetchData(); // Fetch data again after successful submission
    //   } else {
    //     setError("Error: " + data.message);
    //   }
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }
  };

  return (
    <div className="content-wrapper">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Add Analytics
          </a>
        </div>
      </nav>

      <main>
        <div className="container">
          <form onSubmit={handleFormSubmit}>
            <div className="container-fluid">
              <div className="row mt-5">
                <div className="col-12 col-md-8">
                  <div className="row">
                    <div className="col-6">
                      <input
                        type="text"
                        name="card_title"
                        className="form-control mb-2"
                        placeholder="Title"
                        value={formData.card_title}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="icon"
                        className="form-control mb-2"
                        placeholder="Icon Class (e.g., fa-chart-pie)"
                        value={formData.icon}
                        onChange={handleInputChange}
                      />
                      <textarea
                        type="description"
                        name="card_desc"
                        className="form-control"
                        placeholder="Description"
                        rows="6"
                        value={formData.card_desc}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <button
                    type="submit"
                    className="btn btn-success fs-6 btn-sm shadow-none px-3 mb-4 float-end btneffect"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        </div>
      </main>

      <div className="container mt-5">
        <h2>Fetched Data</h2>
        {fetchedData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {fetchedData.map((row) => (
                <tr key={row.id}>
                  <td>{row.card_title}</td>
                  <td>{row.card_desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No records found in the database.</p>
        )}
      </div>
    </div>
  );
};

export default AddAnalytics;
