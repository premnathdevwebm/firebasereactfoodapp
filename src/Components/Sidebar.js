import { NavLink } from 'react-router-dom';
import "./Sidebar.scss"
const Sidebar = () => {
  return (
    <nav className='containersidebar'>
      <ul className='sidebar'>
        <li>
          <NavLink to="/app" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/app/order" end>
            Order
          </NavLink>
        </li>
        <li>
          <NavLink to="/app/contact" end>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
