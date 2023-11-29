const express = require("express");
// simply use router to handle all the routes
const router = express.Router();
// import controllers
const {
  TraningData,
  ConsultingDataa,
  getAllConsultancyData,
  deleteConsultingData,
  loginData,
  getConsultancyDataById,
  allAdmins,
  deleteAdminById,
} = require("../controllers/auth");
// this routes will handle all the data coming from the client side this is post route
router.post("/tranning", TraningData);
router.post("/consulting", ConsultingDataa);
router.get("/getconsultingdata", getAllConsultancyData);
router.get("/getconsultingdataId", getConsultancyDataById);
router.post("/deleteitem", deleteConsultingData);
router.post("/login", loginData);
router.get("/alladmins", allAdmins);
router.post("/deleteadmin", deleteAdminById);
module.exports = router;
