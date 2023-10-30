import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function QuestionnaireDetails({
  topicName,
  currentCard,
  cards,
  showHelpContent,
  suspendCardsCount,
}) {
  return (
    <Row>
      <Col xs={12} sm={6} md={6} lg={6}>
        <div className="mb-2 text-center">
          <h3 className="mb-3">Tema: {topicName}</h3>
        </div>
      </Col>
      <Col xs={12} sm={6} md={6} lg={6}>
        <Row className="questionnaire-information">
          <Col>
            {currentCard + 1} / {cards.length} Tarjetas
          </Col>
          <Col>Suspendidas: {suspendCardsCount}</Col>
          <Col className="pointer" onClick={showHelpContent}>
            <FontAwesomeIcon size="lg" icon={faInfoCircle} /> Ayuda
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default QuestionnaireDetails;
