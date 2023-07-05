import { Outlet } from "react-router-dom";
import "./AppOutlet.scss"
import Sidebar from "./Components/Sidebar";
const AppOutlet = () => {
  return (
    <div className="container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default AppOutlet;