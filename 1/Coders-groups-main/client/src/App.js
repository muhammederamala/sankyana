import "./App.css";
import Navbar from "./Components/Pages/Navbar/Nav";
import MainSidebar from "./Components/Pages/Sidebar/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Router from "./Components/Router/Routes";
// getting al the admin roles from redux store
import { useSelector } from "react-redux";
function App() {
  const adminroles = useSelector((state) => state.rootReducers.userLogin);

  return (
    <div className="App">
      {adminroles ? <Navbar></Navbar> : ""}
      <ToastContainer></ToastContainer>
      {adminroles ? <MainSidebar></MainSidebar> : ""}
      <Router></Router>
    </div>
  );
}

export default App;
