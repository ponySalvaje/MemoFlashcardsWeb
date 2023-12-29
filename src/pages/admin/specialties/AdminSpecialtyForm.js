import { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { updateAdminSpecialty } from "../../../api/admin.specialty.api";

const AdminSpecialtyForm = ({ id, name }) => {
  const [specialtyName, setSpecialtyName] = useState(name);
  const [loading, setLoading] = useState(false);

  const handleSaveSpecialty = async () => {
    setLoading(true);
    try {
      await updateAdminSpecialty(id, { title: specialtyName });
    } catch (error) {
      console.error("Error updating information:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveSpecialty();
  };

  return (
    <Form id="form-save-specialty" onSubmit={handleSubmit}>
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Form.Group className="form-group">
            <Form.Label>Nombre de especialidad</Form.Label>
            <Form.Control
              type="text"
              name="specialty-name"
              maxLength="100"
              value={specialtyName}
              onChange={(e) => setSpecialtyName(e.target.value)}
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

export default AdminSpecialtyForm;
