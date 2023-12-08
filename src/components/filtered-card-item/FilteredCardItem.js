import { Card } from "react-bootstrap";
import "./FilteredCardItem.css";
import filteredCardTypes from "../../common/constants/filteredCardTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseMedical,
  faSuitcaseMedical,
} from "@fortawesome/free-solid-svg-icons";

const FilteredCardItem = ({ item, onClick }) => {
  return (
    <Card onClick={onClick} className="search-card-item">
      <Card.Body>
        {item.type === filteredCardTypes.lesson ? (
          <FontAwesomeIcon size="lg" icon={faHouseMedical} />
        ) : item.type === filteredCardTypes.subject ? (
          <FontAwesomeIcon size="lg" icon={faSuitcaseMedical} />
        ) : (
          <></>
        )}
        <span className="search-card-text">{item.name}</span>
      </Card.Body>
    </Card>
  );
};

export default FilteredCardItem;
