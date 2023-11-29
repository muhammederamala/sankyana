import React from "react";
import { Routes, Route } from "react-router-dom";
import ShowMoretraning from "../Pages/ShowMoreTraning/ShowMoretraning";
import AdminDashboard from "../Pages/AdminDahsboard/AdminDahsboard";
import ShowmoreConsultancy from "../Pages/ShowMoreConsultancy/ShowmoreConsultancy";
import Homepage from "../Home/Homepage";
import Alladmins from "../Alladmins/Alladmins";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route
          path="/admin"
          element={<AdminDashboard></AdminDashboard>}
        ></Route>
        <Route
          path="/trainingpage"
          element={<ShowMoretraning></ShowMoretraning>}
        ></Route>
        <Route
          path="/consultingpage"
          element={<ShowmoreConsultancy></ShowmoreConsultancy>}
        ></Route>
        <Route
          path="/admin/alladmins"
          element={<Alladmins></Alladmins>}
        ></Route>
      </Routes>
    </>
  );
};

export default Router;
