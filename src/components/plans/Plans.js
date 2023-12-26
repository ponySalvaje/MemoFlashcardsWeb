import { Col, Row } from "react-bootstrap";
import CardPlan from "../card-plan/CardPlan";

const Plans = ({ plans, message }) => {
  return (
    <Row className="justify-content-center pt-4">
      {plans.map((plan, index) => (
        <Col key={index} xs={12} sm={6} md={6} lg={6} className="mb-3">
          <CardPlan {...plan} message={message} />
        </Col>
      ))}
    </Row>
  );
};

export default Plans;
