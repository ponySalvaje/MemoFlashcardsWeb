import { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createAdminUser, updateAdminUser } from "../../../api/admin.user.api";
import { universities } from "../../../common/constants/universities";
import { semesters } from "../../../common/constants/semesters";
import { roles } from "../../../common/constants/roles";
import { userTypes } from "../../../common/constants/userTypes";

const AdminUserForm = ({
  id,
  name,
  email,
  semester,
  university,
  role,
  dueDate,
}) => {
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userSemester, setUserSemester] = useState(semester);
  const [userUniversity, setUserUniversity] = useState(university);
  const [userRole, setUserRole] = useState(role);
  const [userDueDate, setUserDueDate] = useState(dueDate);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSaveUser = async () => {
    setLoading(true);
    try {
      id
        ? await updateAdminUser(id, {
            name: userName,
            email: userEmail,
            type: userRole,
            studentTypeId: userSemester,
            universityId: userUniversity,
            dueDate: userDueDate,
          })
        : await createAdminUser({
            name: userName,
            email: userEmail,
            type: userRole,
            studentTypeId: userSemester,
            universityId: userUniversity,
            dueDate: userDueDate,
          });
      navigate("/admin/users", {
        state: {
          result: true,
          message: `¡Usuario ${id ? "modificado" : "creado"} exitosamente!`,
        },
      });
    } catch (error) {
      console.error("Error updating information:", error);
      navigate("/admin/users", {
        state: {
          result: false,
          message:
            "Hubo un error inesperado al guardar el usuario. Por favor, inténtelo más tarde.",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveUser();
  };

  return (
    <Form id="form-save-specialty" onSubmit={handleSubmit}>
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Form.Group className="form-group">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="user-name"
              maxLength="100"
              value={userName}
              required={true}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Form.Group className="form-group">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              name="user-email"
              value={userEmail}
              required={true}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Form.Group className="form-group">
            <Form.Label>Estudiante de</Form.Label>
            <Form.Control
              as="select"
              name="semester"
              required
              value={userSemester}
              onChange={(e) => setUserSemester(e.target.value)}
            >
              <option value="">Selecciona</option>
              {semesters.map((semesterOption) => (
                <option key={semesterOption.value} value={semesterOption.value}>
                  {semesterOption.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Form.Group className="form-group">
            <Form.Label>Universidad</Form.Label>
            <Form.Control
              as="select"
              name="university"
              required
              value={userUniversity}
              onChange={(e) => setUserUniversity(e.target.value)}
            >
              <option value="">Selecciona</option>
              {universities.map((universityOption) => (
                <option
                  key={universityOption.value}
                  value={universityOption.value}
                >
                  {universityOption.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Form.Group className="form-group">
            <Form.Label>Rol</Form.Label>
            <Form.Control
              as="select"
              name="role"
              required
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="">Selecciona</option>
              {roles.map((roleOption) => (
                <option key={roleOption.value} value={roleOption.value}>
                  {roleOption.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        {userRole === userTypes.pro && (
          <Col xs={12} sm={6} md={6} lg={6}>
            <Form.Group className="form-group">
              <Form.Label>Fecha de vencimiento</Form.Label>
              <Form.Control
                type="date"
                required
                name="user-due-date"
                value={userDueDate}
                onChange={(e) => setUserDueDate(e.target.value)}
              />
            </Form.Group>
          </Col>
        )}
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

export default AdminUserForm;
