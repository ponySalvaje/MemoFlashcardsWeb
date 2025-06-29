import {
  faCircleCheck,
  faEdit,
  faEye,
  faIdCard,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "react-bootstrap";
import "./TableActionButton.css";

const TableActionButtons = ({
  itemId,
  showView = true,
  handleView,
  handleEdit,
  handleDelete,
  handleCards,
  handleCheck,
}) => {
  return (
    <Row className="justify-content-center text-center no-margin">
      {handleCards && (
        <Col>
          <FontAwesomeIcon
            onClick={() => handleCards(itemId)}
            size="lg"
            icon={faIdCard}
            className="table-action-button"
          />
        </Col>
      )}
      {showView && (
        <Col>
          <FontAwesomeIcon
            onClick={() => handleView(itemId)}
            size="lg"
            icon={faEye}
            className="table-action-button"
          />
        </Col>
      )}
      {handleEdit && (
        <Col>
          <FontAwesomeIcon
            onClick={() => handleEdit(itemId)}
            size="lg"
            icon={faEdit}
            className="table-action-button"
          />
        </Col>
      )}
      {handleDelete && (
        <Col>
          <FontAwesomeIcon
            onClick={() => handleDelete(itemId)}
            size="lg"
            icon={faTrash}
            className="table-action-button"
          />
        </Col>
      )}
      {handleCheck && (
        <Col>
          <FontAwesomeIcon
            onClick={() => handleCheck(itemId)}
            size="lg"
            icon={faCircleCheck}
            className="table-action-button"
          />
        </Col>
      )}
    </Row>
  );
};

export default TableActionButtons;
