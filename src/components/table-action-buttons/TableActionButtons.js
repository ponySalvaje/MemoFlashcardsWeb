import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "react-bootstrap";
import "./TableActionButton.css";

const TableActionButtons = ({
  itemId,
  showView = true,
  handleView,
  handleEdit,
  handleDelete,
}) => {
  return (
    <Row className="justify-content-center text-center">
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
      <Col>
        <FontAwesomeIcon
          onClick={() => handleEdit(itemId)}
          size="lg"
          icon={faEdit}
          className="table-action-button"
        />
      </Col>
      <Col>
        <FontAwesomeIcon
          onClick={() => handleDelete(itemId)}
          size="lg"
          icon={faTrash}
          className="table-action-button"
        />
      </Col>
    </Row>
  );
};

export default TableActionButtons;
