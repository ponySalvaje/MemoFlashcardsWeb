import { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { updateAdminTopic } from "../../../api/admin.topic.api";

const AdminTopicForm = ({ id, name }) => {
  const [topicName, setTopicName] = useState(name);
  const [loading, setLoading] = useState(false);

  const handleSaveTopic = async () => {
    setLoading(true);
    try {
      await updateAdminTopic(id, { title: topicName });
    } catch (error) {
      console.error("Error updating information:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveTopic();
  };

  return (
    <Form id="form-save-Topic" onSubmit={handleSubmit}>
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Form.Group className="form-group">
            <Form.Label>Nombre de tema</Form.Label>
            <Form.Control
              type="text"
              name="topic-name"
              maxLength="100"
              value={topicName}
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
            <span>Modificar</span>
          )}
        </Button>
      </div>
    </Form>
  );
};

export default AdminTopicForm;
