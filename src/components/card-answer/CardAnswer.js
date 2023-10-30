import { Button, Col, Row } from "react-bootstrap";
import "./CardAnswer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import scoreGrades from "../../common/constants/scoreGrades";
import { scoreCard } from "../../api/scores.api";

function CardAnswer({ id, answer, onFlip, onNext }) {
  const scoreQuestion = async (grade) => {
    onNext();
    onFlip();
    await scoreCard(id, grade);
  };

  return (
    <div className="card-reverse">
      <div className="flip-icon" onClick={onFlip}>
        <FontAwesomeIcon size="lg" icon={faSync} />
      </div>
      <h5 className="mt-3 card-title">
        <strong>Respuesta:</strong>
      </h5>
      <div
        className="answer-div"
        dangerouslySetInnerHTML={{ __html: answer }}
      />
      <Row className="d-flex w-100">
        <Col>
          <div className="mt-auto">
            <Button
              onClick={() => scoreQuestion(scoreGrades.easy)}
              variant="easy"
              className="btn my-1"
            >
              Fácil
            </Button>
          </div>
        </Col>
        <Col>
          <div className="mt-auto">
            <Button
              onClick={() => scoreQuestion(scoreGrades.medium)}
              variant="medium"
              className="btn my-1"
            >
              Normal
            </Button>
          </div>
        </Col>
        <Col>
          <div className="mt-auto">
            <Button
              onClick={() => scoreQuestion(scoreGrades.hard)}
              variant="hard"
              className="btn my-1"
            >
              Difícil
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CardAnswer;
