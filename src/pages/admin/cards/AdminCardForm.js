import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { saveAdminCard, updateAdminCard } from "../../../api/admin.card.api";
import RichTextEditor from "../../../components/rich-text-editor/RichTextEditor";
import { useNavigate } from "react-router-dom";

const AdminCardForm = ({
  id,
  subjectId,
  name,
  premium,
  question,
  answer,
  help,
}) => {
  const [cardName, setCardName] = useState(name);
  const [cardPremium, setCardPremium] = useState(premium);
  const [cardQuestion, setCardQuestion] = useState(question);
  const [cardAnswer, setCardAnswer] = useState(answer);
  const [cardHelp, setCardHelp] = useState(help);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSaveCard = async () => {
    setLoading(true);
    try {
      id
        ? await updateAdminCard(id, {
            subjectId: subjectId,
            title: cardName,
            question: cardQuestion,
            answer: cardAnswer,
            help: cardHelp,
            isFree: !cardPremium,
          })
        : await saveAdminCard({
            subjectId: subjectId,
            title: cardName,
            question: cardQuestion,
            answer: cardAnswer,
            help: cardHelp,
            isFree: !cardPremium,
          });
      navigate(`/admin/cards/${subjectId}`, {
        state: {
          result: true,
          message: `Tarjeta ${id ? "modificada" : "creada"} exitosamente!`,
        },
      });
    } catch (error) {
      console.error("Error updating information:", error);
      navigate(`/admin/cards/${subjectId}`, {
        state: {
          result: false,
          message:
            "Hubo un error inesperado al guardar la tarjeta. Por favor, inténtelo más tarde.",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveCard();
  };

  return (
    <Form id="form-save-card" onSubmit={handleSubmit}>
      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Form.Group className="form-group">
            <Form.Label>Nombre de tarjeta</Form.Label>
            <Form.Control
              type="text"
              name="card-name"
              maxLength="100"
              value={cardName}
              required={true}
              onChange={(e) => setCardName(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Form.Group className="form-group">
            <Form.Label>¿Es Premium?</Form.Label>
            <Form.Check
              type="switch"
              id="premium-card-switch"
              className="premium-card-switch"
              label=""
              defaultChecked={cardPremium}
              onChange={setCardPremium}
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Form.Group className="form-group">
            <Form.Label>Pregunta</Form.Label>
            <RichTextEditor value={cardQuestion} setValue={setCardQuestion} />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Form.Group className="form-group">
            <Form.Label>Respuesta</Form.Label>
            <RichTextEditor value={cardAnswer} setValue={setCardAnswer} />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Form.Group className="form-group">
            <Form.Label>Ayuda</Form.Label>
            <RichTextEditor value={cardHelp} setValue={setCardHelp} />
          </Form.Group>
        </Col>
      </Row>
      <div className="mt-3">
        <Button type="submit" variant="main" disabled={loading}>
          {loading ? (
            <Spinner animation="border" variant="white" size="sm" />
          ) : (
            <span>{id ? "Modificar" : "Crear"}</span>
          )}
        </Button>
      </div>
    </Form>
  );
};

export default AdminCardForm;
