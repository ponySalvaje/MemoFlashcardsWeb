import {
  faHouseMedical,
  faMedal,
  faNewspaper,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import whiteLogo from "../../assets/logo/logo_white.png";
import SidebarItem from "../sidebar-item/SidebarItem";
import "./Sidebar.css";
import { useLocation } from "react-router-dom";
import avatarImage from "../../assets/profile-avatar/avatar-1.png";
import { Image } from "react-bootstrap";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";

const Sidebar = ({ element }) => {
  const location = useLocation();

  const { user } = useAuthContext();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark vh-100">
            <a
              href="/"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <img alt="Memo Logo" src={whiteLogo} width={45} height={45} />
              <span className="fs-4 sidebar-label">MEMO</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <SidebarItem
                name="Especialidades"
                icon={faHouseMedical}
                url="/admin/specialties"
                active={isActive("/admin/specialties")}
              />
              <SidebarItem
                name="Usuarios"
                icon={faUsers}
                url="/admin/users"
                active={isActive("/admin/users")}
              />
              <SidebarItem
                name="Noticias"
                icon={faNewspaper}
                url="/admin/news"
                active={isActive("/admin/news")}
              />
              <SidebarItem
                name="Reto diario"
                icon={faMedal}
                url="/admin/daily-challenge"
                active={isActive("/admin/daily-challenge")}
              />
            </ul>
            <hr />
            <div>
              <div className="d-flex align-items-center text-white">
                <Image
                  src={avatarImage}
                  width={32}
                  height={32}
                  alt="Avatar image"
                  className="rounded-circle me-2"
                />
                <strong>{userData && userData[1]}</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="col py-3">{element}</div>
      </div>
    </div>
  );
};

export default Sidebar;
