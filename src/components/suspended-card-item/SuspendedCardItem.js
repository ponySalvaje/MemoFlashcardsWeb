import { Row, Col, Button, Spinner } from "react-bootstrap";
import { postSingleUnsuspend } from "../../api/progress.api";
import { useState } from "react";
import "./SuspendedCardItem.css";

const SuspendedCardItem = ({ card, callback }) => {
  const [loading, setLoading] = useState(false);

  const unsuspendCard = async (cardId) => {
    setLoading(true);
    try {
      await postSingleUnsuspend(cardId);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await callback();
    } catch (error) {
      console.error("Error unsuspending card:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div key={card.cardId} className="suspended-item">
      <Row>
        <Col xs={6} md={6}>
          <span className="suspended-card-name">{card.cardName}</span>
        </Col>
        <Col xs={6} md={6} className="text-center">
          <Button
            variant="main"
            onClick={() => unsuspendCard(card.cardId)}
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" variant="white" size="sm" />
            ) : (
              <span>Habilitar</span>
            )}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SuspendedCardItem;
