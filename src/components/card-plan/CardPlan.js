import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import "./CardPlan.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function CardPlan({ planName, price, frequency, advantages }) {
  return (
    <Card className="shadow-sm mb-4 card-plan text-center">
      <Card.Header className="card-plan-header text-6 fw-500 border-bottom-0 py-4">
        {planName}
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <div className="mb-auto">
          <h5 className="fw-600 mb-0">S/. {price.toFixed(2)}</h5>
          <p className="card-plan-sticky badge fw-600 rounded-pill">
            {frequency}
          </p>
          <ListGroup variant="flush" className="list-style-2 text-2 text-start">
            {advantages.map((advantage, index) => (
              <ListGroupItem key={index}>
                <FontAwesomeIcon size="lg" icon={faCheck} /> {advantage}
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
        <div className="mt-auto">
          <Button href="/specialties" variant="main" className="btn my-1">
            Comenzar ahora
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardPlan;
