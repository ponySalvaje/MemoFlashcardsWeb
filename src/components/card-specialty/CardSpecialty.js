import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CardSpecialty.css";

const CardSpecialty = ({
  imageUrl,
  title,
  freeQuantity,
  premiumQuantity,
  id,
}) => {
  const navigate = useNavigate();

  const goToTopic = () => {
    navigate("/topics/" + id, { state: { specialtyName: title } });
  };

  return (
    <Card className="specialty-card" onClick={goToTopic}>
      <Card.Body className="specialty-card-body">
        <img src={imageUrl} alt={title} width="35px" />
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

export default CardSpecialty;
