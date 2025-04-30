import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  saveAdminMCCard,
  updateAdminMCCard,
} from "../../../api/admin.mccard.api";

const AdminMCCardForm = ({ id, subjectId, question, answers }) => {
  const [cardQuestion, setCardQuestion] = useState(question);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [incorrectAnswers, setIncorrectAnswers] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const correct = answers.find((a) => a.isCorrect);
    const incorrect = answers.filter((a) => !a.isCorrect).map((a) => a.text);
    if (correct) setCorrectAnswer(correct.text);
    if (incorrect.length === 4) setIncorrectAnswers(incorrect);
  }, [answers]);

  const navigate = useNavigate();

  const handleSaveCard = async () => {
    setLoading(true);
    const payload = {
      topicId: subjectId,
      question: cardQuestion,
      answers: [
        { text: correctAnswer, isCorrect: true },
        ...incorrectAnswers.map((text) => ({ text, isCorrect: false })),
      ],
    };

    try {
      if (id) {
        await updateAdminMCCard(id, payload);
      } else {
        await saveAdminMCCard(payload);
      }
      navigate(`/admin/multiple-choice-cards/${subjectId}`, {
        state: {
          result: true,
          message: `Tarjeta ${id ? "modificada" : "creada"} exitosamente!`,
        },
      });
    } catch (error) {
      console.error("Error saving card:", error);
      navigate(`/admin/multiple-choice-cards/${subjectId}`, {
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
        <Col md={12}>
          <Form.Group className="form-group">
            <Form.Label>Pregunta</Form.Label>
            <Form.Control
              type="text"
              name="question"
              maxLength="255"
              value={cardQuestion}
              required={true}
              onChange={(e) => setCardQuestion(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Respuesta correcta</Form.Label>
            <Form.Control
              type="text"
              name="correctAnswer"
              maxLength={255}
              value={correctAnswer}
              required
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
          </Form.Group>
        </Col>

        {incorrectAnswers.map((ans, idx) => (
          <Col md={6} key={idx}>
            <Form.Group className="mb-3">
              <Form.Label>Respuesta incorrecta {idx + 1}</Form.Label>
              <Form.Control
                type="text"
                name={`incorrectAnswer${idx}`}
                maxLength={255}
                value={ans}
                required
                onChange={(e) => {
                  const copy = [...incorrectAnswers];
                  copy[idx] = e.target.value;
                  setIncorrectAnswers(copy);
                }}
              />
            </Form.Group>
          </Col>
        ))}
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

export default AdminMCCardForm;
