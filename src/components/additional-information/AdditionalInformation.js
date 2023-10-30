import { Card } from "react-bootstrap";
import "./AdditionalInformation.css";
import { Flip } from "react-reveal";

function AdditionalInformation({ content }) {
  return (
    <Flip left>
      <Card className="shadow-sm mb-4 text-center">
        <Card.Header className="text-6 card-help-header fw-500 border-bottom-0 py-4">
          Información adicional
        </Card.Header>
        <Card.Body className="d-flex flex-column">
          <div
            className="help-div"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Card.Body>
      </Card>
    </Flip>
  );
}

export default AdditionalInformation;
