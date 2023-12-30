import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Row, Col } from "react-bootstrap";

const DataTableTitle = ({ title, action, onClick }) => {
  return (
    <Container className="mb-2">
      <Row>
        <Col>
          <h2>{title}</h2>
        </Col>
        <Col>
          <Button variant="main" onClick={onClick}>
            <FontAwesomeIcon icon={faAdd} />
            <span className="m-l-5">{action}</span>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DataTableTitle;
