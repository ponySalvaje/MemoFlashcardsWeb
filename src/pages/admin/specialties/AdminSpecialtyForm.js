import { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import {
  createAdminSpecialty,
  updateAdminSpecialty,
} from "../../../api/admin.specialty.api";
import { useNavigate } from "react-router-dom";

const AdminSpecialtyForm = ({ id, name }) => {
  const [specialtyName, setSpecialtyName] = useState(name);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSaveSpecialty = async () => {
    setLoading(true);
    try {
      id
        ? await updateAdminSpecialty(id, { title: specialtyName })
        : await createAdminSpecialty({ title: specialtyName });
      navigate("/admin/specialties", {
        state: {
          result: true,
          message: `¡Especialidad ${
            id ? "modificada" : "creada"
          } exitosamente!`,
        },
      });
    } catch (error) {
      console.error("Error updating information:", error);
      navigate("/admin/specialties", {
        state: {
          result: false,
          message:
            "Hubo un error inesperado al guardar la especialidad. Por favor, inténtelo más tarde.",
        },
      });
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
              required={true}
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
            <span>{id ? "Modificar" : "Crear"}</span>
          )}
        </Button>
      </div>
    </Form>
  );
};

export default AdminSpecialtyForm;
