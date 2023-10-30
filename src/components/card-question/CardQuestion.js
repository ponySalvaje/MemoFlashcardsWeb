import { useRef } from "react";
import { Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import "./CardQuestion.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

function CardQuestion({
  name,
  question,
  isFirst,
  suspendCard,
  onFlip,
  onPrevious,
}) {
  const refLink = useRef(null);

  const renderTooltip = (title) => <Tooltip>{title}</Tooltip>;

  return (
    <div className="card-front">
      <div className="suspend-icon" onClick={suspendCard}>
        <OverlayTrigger
          target={refLink}
          placement="bottom"
          delay={{ show: 250, hide: 250 }}
          overlay={renderTooltip("Suspender Tarjeta")}
        >
          {({ ref, ...triggerHandler }) => (
            <span ref={ref} {...triggerHandler} onClick={suspendCard}>
              <FontAwesomeIcon size="lg" icon={faBan} />
            </span>
          )}
        </OverlayTrigger>
      </div>
      <h5 className="mt-3 card-title">
        <strong>{name}</strong>
      </h5>
      <div
        className="question-div"
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <Row>
        {!isFirst ? (
          <>
            <Col>
              <div className="mt-auto">
                <Button
                  onClick={onPrevious}
                  variant="second"
                  className="btn my-1"
                >
                  Ver anterior
                </Button>
              </div>
            </Col>
            <Col>
              <div className="mt-auto">
                <Button onClick={onFlip} variant="main" className="btn my-1">
                  Ver respuesta
                </Button>
              </div>
            </Col>
          </>
        ) : (
          <Col>
            <div className="mt-auto">
              <Button onClick={onFlip} variant="main" className="btn my-1">
                Ver respuesta
              </Button>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default CardQuestion;
