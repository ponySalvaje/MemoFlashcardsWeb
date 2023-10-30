import { Card } from "react-bootstrap";
import "./CardTopic.css";
import { useNavigate } from "react-router-dom";

const CardTopic = ({
  title,
  freeQuantity,
  premiumQuantity,
  id,
  relatedTopics,
}) => {
  const navigate = useNavigate();

  const goToQuestionnaire = () => {
    navigate("/questionnaire/" + id, {
      state: { topicName: title, relatedTopics: relatedTopics },
    });
  };

  return (
    <Card className="topic-card" onClick={goToQuestionnaire}>
      <Card.Body className="topic-card-body">
        <h5 className="mt-3 card-title">
          <strong>{title}</strong>
        </h5>
        <p>{`${freeQuantity} Tarjetas Gratuitas`}</p>
        <p className="font-weight-bold main-color">
          <b>{`${premiumQuantity} Tarjetas Premium`}</b>
        </p>
      </Card.Body>
    </Card>
  );
};

export default CardTopic;
