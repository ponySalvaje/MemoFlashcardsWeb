import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import "./CardPlan.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CulqiPaymentGateway from "../culqi-payment-gateway/CulqiPaymentGateway";

function CardPlan({
  id,
  planName,
  price,
  months,
  frequency,
  advantages,
  disabledAdvantages,
  payment = false,
}) {
  const subscriptionUrl = id === 1 ? "/specialties" : `/subscription/${id}`;

  return (
    <Card className="shadow-sm mb-4 card-plan text-center">
      <Card.Header className="card-plan-header text-6 fw-500 border-bottom-0 py-4">
        {planName}
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <div className="mb-auto">
          <h5 className="fw-600 mb-0">S/. {price.toFixed(2)}</h5>
          <p
            className={`card-plan-sticky badge fw-600 rounded-pill ${
              frequency ? "" : "hidden"
            }`}
          >
            {frequency ?? "0"}
          </p>
          <ListGroup variant="flush" className="list-style-2 text-2 text-start">
            {advantages.map((advantage, index) => (
              <ListGroupItem key={index} className="advantage-item">
                <FontAwesomeIcon
                  size="lg"
                  icon={faCircleCheck}
                  className="advantage-icon"
                />
                <span className="advantage-text">{advantage}</span>
              </ListGroupItem>
            ))}
            {disabledAdvantages &&
              disabledAdvantages.map((advantage, index) => (
                <ListGroupItem key={index} className="advantage-item-disabled">
                  <FontAwesomeIcon
                    size="lg"
                    icon={faCircleCheck}
                    className="advantage-icon"
                  />
                  <span className="advantage-text advantage-text-disabled">
                    {advantage}
                  </span>
                </ListGroupItem>
              ))}
          </ListGroup>
        </div>
        <div className="mt-auto">
          {!payment ? (
            <Link to={subscriptionUrl}>
              <Button variant="main" className="btn my-1">
                Comenzar ahora
              </Button>
            </Link>
          ) : (
            <CulqiPaymentGateway amount={price} months={months} />
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardPlan;
