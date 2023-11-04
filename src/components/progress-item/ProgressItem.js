import { Col, ProgressBar, Row } from "react-bootstrap";
import "./ProgressItem.css";

const ProgressItem = ({ item, onPress }) => {
  return (
    <div className="progress-item">
      <div>
        <Row>
          <div>
            <b>{item.subjectName}</b>
            <span className="free-cards-indicator">
              {item.cardAmount} tarjetas gratuitas
            </span>
          </div>
        </Row>
      </div>
      <div>
        <Row>
          <Col xs={9} md={11}>
            <ProgressBar
              variant="info"
              animated
              now={item.percentageProgress}
            />
          </Col>
          <Col xs={3} md={1} className="percentage-indicator">
            {item.percentageProgress.toFixed(2)}%
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProgressItem;
