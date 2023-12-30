import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SidebarItem.css";

const SidebarItem = ({ name, icon, url, active = false }) => {
  return (
    <li className="nav-item">
      <a
        href={url}
        className={`nav-link ${active ? "active" : ""}`}
        aria-current="page"
      >
        <FontAwesomeIcon icon={icon} />
        <span className="sidebar-item-label">{name}</span>
      </a>
    </li>
  );
};

export default SidebarItem;
