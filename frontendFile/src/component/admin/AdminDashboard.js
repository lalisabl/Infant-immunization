import { FaHandsHoldingChild } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { MdOutlineVaccines } from "react-icons/md";
import logo from "../../assets/images/wubit_logo.png";
import profilePhoto from "../../assets/images/anonymous_person.png";
import InfantManagement from "./AdminInfantList";
import UserManagement from "./AdminUserList";
import VaccineManagement from "./AdminVaccineList";
import Card from "../../component/card/card";
import data from "./data";
import "./admin.css";
const AdminDashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="main__container">
          <MainSide />
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};
const AdminFooter = () => {
  return (
    <footer className="dashboard footer__copyright">
      <small>2023 Lalisa Bula &copy; All Rights Reserved</small>
    </footer>
  );
};
const Navbar = ({ user, onItemClick }) => {
  return (
    <div id="nav">
      <div className="container nav__container">
        <img src={logo} alt="logo_photo" className="logo__photo" />
        <img
          src={profilePhoto}
          alt="profile_photo"
          className="profile__photo"
        />
      </div>
    </div>
  );
};

const Sidebar = ({ onItemClick }) => {
  return (
    <aside className="sidebar">
      <ul>
        <li onClick={() => onItemClick(null)}>
          <FaHome /> Dashboard
        </li>
        <li onClick={() => onItemClick(<InfantManagement />)}>
          <FaHandsHoldingChild /> Infant management
        </li>
        <li onClick={() => onItemClick(<UserManagement />)}>
          <FiUser /> User management
        </li>
        <li onClick={() => onItemClick(<VaccineManagement />)}>
          <MdOutlineVaccines
            onClick={() => {
              onItemClick(<VaccineManagement />);
            }}
          />
          Vaccine management
        </li>
      </ul>
    </aside>
  );
};
const MainSide = () => {
  return (
    <section id="main">
      <h2>Dashboard</h2>
      <div className="container dashboard__contents">
        {data.map((news) => (
          <Card key={news.id} className="info light">
            <div className="info__details">
              <h4>{news.amount}</h4>
              <p>{news.info}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
export default AdminDashboard;
