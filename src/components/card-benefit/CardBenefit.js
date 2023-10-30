import { useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import "./CardBenefit.css";

function CardBenefit({ title, text, backgroundColor }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const cardElements = document.querySelectorAll(".card-benefit");
    const maxHeight = Math.max(
      ...Array.from(cardElements, (el) => el.offsetHeight)
    );

    cardElements.forEach((el) => {
      el.style.height = `${maxHeight}px`;
    });
  }, []);

  return (
    <Card ref={cardRef} className="card-benefit" style={{ backgroundColor }}>
      <Card.Body className="card-benefit-body">
        <Card.Title className="card-benefit-title">{title}</Card.Title>
        <Card.Text className="card-benefit-text">{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

CardBenefit.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default CardBenefit;
