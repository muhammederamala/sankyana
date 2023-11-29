const connection = require("../DatabaseConnection/config");
const router = require("../routes/auth");
// this is the api which will save all the data in the database
const TraningData = async (req, res) => {
  const { title, description } = req.body.data; // destructure the data from body
  const imageUrl = req.body.url; // assuming the URL is provided in the body directly
  // console.log(imageUrl, title.description); // just for debugging
  try {
    const sql =
      "INSERT INTO traningdata (Title, Description, URL) VALUES (?, ?, ?)";
    const values = [title, description, imageUrl];

    connection.query(sql, values, (error, result) => {
      if (error) {
        // console.error("Error executing MySQL query: ", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      res.status(200).json({
        // result: result,
        success: true,
      });
    });
  } catch (error) {
    // console.error("Error in Traning controller: ", error);
    res.status(400).json({ error: "Bad Request" });
  }
};

const ConsultingDataa = async (req, res) => {
  const { title, description } = req.body.data; // destructure the data from body
  const imageUrl = req.body.url;
  const id = req.body.id;
  // console.log(title, description, imageUrl, id); just for debugging
  try {
    let sql, values;

    if (id) {
      // If id is present, update the existing record
      sql =
        "INSERT INTO consultingdataa (ID, Title, Description, URL) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE Title=?, Description=?, URL=?";
      values = [id, title, description, imageUrl, title, description, imageUrl];
    } else {
      // If id is not present, insert a new record
      sql =
        "INSERT INTO consultingdataa (Title, Description, URL) VALUES (?, ?, ?)";
      values = [title, description, imageUrl];
    }

    connection.query(sql, values, (error, result) => {
      if (error) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      res.status(200).json({
        success: true,
        message: id
          ? "Data updated successfully"
          : "Data inserted successfully",
      });
    });
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
};

// this api will ftch all the data from the consultansydataa table

// const getAllConsultancyData = async (req, res) => {
//   try {
//     const sql = "SELECT * FROM consultingdataa"; // Change the table name as needed

//     connection.query(sql, (error, results) => {
//       if (error) {
//         // console.error("Error executing MySQL query: ", error);
//         res.status(500).json({ error: "Internal Server Error" });
//         return;
//       }

//       res.status(200).json({
//         success: true,
//         data: results,
//       });
//     });
//   } catch (error) {
//     // console.error("Error in getAllConsultancyData API: ", error);
//     res.status(400).json({ error: "Bad Request" });
//   }
// };
// this api will delete the data based on the index COMING FROM THE CLEINT SIDE
const deleteConsultingData = (req, res) => {
  const consultingId = req.body.id; // finding the id coming from body

  // First, retrieve the data that will be deleted
  const selectSql = "SELECT * FROM consultingdataa WHERE id = ?";
  connection.query(selectSql, [consultingId], (selectErr, selectResult) => {
    if (selectErr) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    } else {
      // Now, delete the data
      const deleteSql = "DELETE FROM consultingdataa WHERE id = ?";
      connection.query(deleteSql, [consultingId], (deleteErr, deleteResult) => {
        if (deleteErr) {
          res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        } else {
          // Retrieve all remaining data after deletion
          const remainingDataSql = "SELECT * FROM consultingdataa";
          connection.query(
            remainingDataSql,
            (remainingErr, remainingResult) => {
              if (remainingErr) {
                res
                  .status(500)
                  .json({ success: false, message: "Internal Server Error" });
              } else {
                res.json({
                  success: true,
                  message: "Consulting data deleted successfully",
                  remainingData: remainingResult, // Send all remaining data
                });
              }
            }
          );
        }
      });
    }
  });
};
// this api will return the data based on the id coming from frontend
const getConsultancyDataById = async (req, res) => {
  const { id } = req.query; // Assuming you pass the id as a URL parameter
  // console.log(id);
  try {
    const sql = "SELECT * FROM consultingdataa WHERE ID = ?"; // Change the column and table name as needed
    const values = [id];

    connection.query(sql, values, (error, result) => {
      if (error) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (result.length === 0) {
        // If no data is found for the specified id
        res.status(404).json({ error: "Data not found" });
        return;
      }

      res.status(200).json({
        success: true,
        data: result[0], // Assuming you expect only one result
      });
    });
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
};
// this api will send all the data to the admins table for login details
const loginData = async (req, res) => {
  const { username, passwrd } = req.body.data;

  try {
    const sql = `SELECT * FROM admins WHERE username='${username}' AND password='${passwrd}'`;
    connection.query(sql, (err, results) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        // if the results are present then send me back the results based on the length
        if (results.length > 0) {
          res.status(200).json(results[0].role); // Sending the role of the admin to frontend
        } else {
          // otherwise return the not found  user
          res.status(400).json({ message: "Invalid username or password" });
        }
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// this function will give all the details to the master admin only that he can add or remove the admins
const allAdmins = async (req, res) => {
  try {
    const sql = "SELECT * FROM admins";
    connection.query(sql, (err, results) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        if (results.length > 0) {
          res.status(200).send(results);
          // console.log(results); // just for debugging
        } else {
          res.status(404).send("No results found");
        }
      }
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
// this method will delete the admins based on the id
// const deleteAdminById = async (req, res) => {
//   try {
//     const adminId = req.body.id; // first finding the id from frontend
//     console.log(adminId);
//     // this will first first find the row from that given tablse based on the id
//     const findAdminQuery = "SELECT * FROM admins WHERE id = ?";
//     const findAdminResult = await connection.query(findAdminQuery, [adminId]);
//     // f no rows are found then return back a response
//     if (findAdminResult.length === 0) {
//       return res.status(404).json({ message: "Admin not found" });
//     }
//     // now deeleting the rows from the given tbalse based on the id
//     const deleteAdminQuery = "DELETE FROM admins WHERE id = ?";
//     await connection.query(deleteAdminQuery, [adminId]);
//     // sending back all the remaning rows that will shown in the frotned
//     const remainingAdminsQuery = "SELECT * FROM admins";
//     const remainingAdmins = await connection.query(remainingAdminsQuery);

//     return res.status(200).json(remainingAdmins);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

module.exports = {
  TraningData,
  ConsultingDataa,
  getAllConsultancyData,
  deleteConsultingData,
  getConsultancyDataById,
  loginData,
  allAdmins,
  deleteAdminById,
};
