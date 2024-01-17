import { faAdd, faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Row, Col } from "react-bootstrap";

const DataTableTitle = ({
  title,
  goBackAction,
  goBackClick,
  createAction,
  createClick,
}) => {
  return (
    <Container className="mb-2">
      <Row>
        <Col>
          <h2>{title}</h2>
        </Col>
        <Col>
          <Row>
            {goBackAction && (
              <Col>
                <Button variant="second" onClick={goBackClick}>
                  <FontAwesomeIcon icon={faBackward} />
                  <span className="m-l-5">{goBackAction}</span>
                </Button>
              </Col>
            )}
            <Col>
              <Button variant="main" onClick={createClick}>
                <FontAwesomeIcon icon={faAdd} />
                <span className="m-l-5">{createAction}</span>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DataTableTitle;
