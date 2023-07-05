import { Outlet } from "react-router-dom";
import style from "./Template.module.css"
const Template = () => {
  return (
    <div className={style.templatecontainer}>
      <Outlet />
    </div>
  );
};

export default Template;
