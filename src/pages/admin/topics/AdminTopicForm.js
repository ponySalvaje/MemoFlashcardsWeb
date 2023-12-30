import { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import {
  createAdminTopic,
  updateAdminTopic,
} from "../../../api/admin.topic.api";
import { useNavigate } from "react-router-dom";

const AdminTopicForm = ({ id, lessonId, name }) => {
  const [topicName, setTopicName] = useState(name);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSaveTopic = async () => {
    setLoading(true);
    try {
      id
        ? await updateAdminTopic(id, { title: topicName })
        : await createAdminTopic({ lessonId: lessonId, title: topicName });
      navigate(`/admin/topics/${lessonId}`, {
        state: {
          result: true,
          message: `Tema ${id ? "modificado" : "creado"} exitosamente!`,
        },
      });
    } catch (error) {
      console.error("Error updating information:", error);
      navigate(`/admin/topics/${lessonId}`, {
        state: {
          result: false,
          message:
            "Hubo un error inesperado al guardar el tema. Por favor, inténtelo más tarde.",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveTopic();
  };

  return (
    <Form id="form-save-topic" onSubmit={handleSubmit}>
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Form.Group className="form-group">
            <Form.Label>Nombre de tema</Form.Label>
            <Form.Control
              type="text"
              name="topic-name"
              maxLength="100"
              value={topicName}
              required={true}
              onChange={(e) => setTopicName(e.target.value)}
            />
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

export default AdminTopicForm;
