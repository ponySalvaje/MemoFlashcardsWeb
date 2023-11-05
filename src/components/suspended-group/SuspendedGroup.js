import { Row, Col, Button } from "react-bootstrap";
import "./SuspendedGroup.css";

const SuspendedGroup = ({ item }) => {
  const unsuspendCard = (cardId) => {};

  return (
    <div className="suspended-group">
      <div>
        <h4>
          <b>{item.subjectName}</b>
        </h4>
      </div>
      {item.suspendedCards.map((card) => {
        return (
          <div key={card.cardId} className="suspended-item">
            <Row key={card.cardId}>
              <Col xs={6} md={6}>
                <span className="suspended-card-name">{card.cardName}</span>
              </Col>
              <Col xs={6} md={6} className="text-center">
                <Button
                  variant="main"
                  onClick={() => unsuspendCard(card.cardId)}
                >
                  Habilitar
                </Button>
              </Col>
            </Row>
          </div>
        );
      })}
    </div>
  );
};

export default SuspendedGroup;
