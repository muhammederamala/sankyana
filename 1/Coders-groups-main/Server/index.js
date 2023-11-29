// here i create the whole server where my backend is running...
const mongoose = require("mongoose"); // third party modules for node.js
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/auth");
const DatabaseConnection = require("./DatabaseConnection/config");
// import routes...

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // enabling the bodyparser to access as middle warre
app.use(morgan("tiny")); // printing the url or in the console or request.

// using Routes with middleware..
app.use("/", router);

const Port = 4000;
app.listen(Port, () => {
  console.log(`Server is running at the ${Port}`);
});
