import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { saveDailyChallenge } from "../../../api/admin.daily-challenge.api";

const AdminDailyChallengeForm = ({ question, answers }) => {
  const [cardQuestion, setCardQuestion] = useState(question);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [incorrectAnswers, setIncorrectAnswers] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState(null);

  useEffect(() => {
    const correct = answers.find((a) => a.isCorrect);
    const incorrect = answers.filter((a) => !a.isCorrect).map((a) => a.text);
    if (correct) setCorrectAnswer(correct.text);
    if (incorrect.length === 4) setIncorrectAnswers(incorrect);
  }, [answers]);

  const handleSaveCard = async () => {
    setLoading(true);
    const payload = {
      question: cardQuestion,
      options: [
        { text: correctAnswer, isCorrect: true },
        ...incorrectAnswers.map((text) => ({ text, isCorrect: false })),
      ],
    };

    try {
      saveDailyChallenge(payload);
      setState({ result: true, message: "Pregunta diaria actualizada" });
    } catch (error) {
      console.error("Error saving card:", error);
      setState({
        result: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Error desconocido.",
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
      <Alert
        show={state !== null}
        variant={state?.result ? "primary" : "danger"}
        dismissible
        onClose={() => setState(null)}
      >
        <b>
          {state?.result
            ? "Operación completada con éxito"
            : "¡Ups! Algo salió mal."}
        </b>
        <br />
        <span>{state?.message}</span>
      </Alert>
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
            <span>{"Actualizar"}</span>
          )}
        </Button>
      </div>
    </Form>
  );
};

export default AdminDailyChallengeForm;
