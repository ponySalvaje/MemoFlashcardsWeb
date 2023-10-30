import { Card } from "react-bootstrap";
import "./CardQuestionnaire.css";
import CardAnswer from "../card-answer/CardAnswer";
import CardQuestion from "../card-question/CardQuestion";

function CardQuestionnaire({
  card,
  isFirst,
  suspendCard,
  isFlipped,
  handleFlip,
  onNext,
  onPrevious,
}) {
  const { id, name, question, answer } = card;

  return (
    <Card className={`questionnaire-card ${isFlipped ? "flipped" : ""}`}>
      <Card.Body className="questionnaire-card-body">
        <div className="questionnaire-card-container">
          {!isFlipped ? (
            <CardQuestion
              name={name}
              question={question}
              isFirst={isFirst}
              suspendCard={suspendCard}
              onFlip={handleFlip}
              onPrevious={onPrevious}
            />
          ) : (
            <CardAnswer
              id={id}
              answer={answer}
              onFlip={handleFlip}
              onNext={onNext}
            />
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardQuestionnaire;
