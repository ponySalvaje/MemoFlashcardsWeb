import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // await changePassword(currentPassword, newPassword);
      console.log("password: ", currentPassword, newPassword);
    } catch (error) {
      console.error("Error updating information:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form id="form-change-password" onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        name="username"
        autoComplete="username"
        style={{ display: "none" }}
        aria-hidden="true"
        tabIndex="-1"
      />
      <Form.Group className="form-group" xs={12} sm={12} md={12} lg={12}>
        <Form.Label>Contraseña actual</Form.Label>
        <Form.Control
          type="password"
          name="currentPassword"
          maxLength="100"
          value={currentPassword}
          autoComplete="current-password"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="form-group" xs={12} sm={12} md={12} lg={12}>
        <Form.Label>Contraseña nueva</Form.Label>
        <Form.Control
          type="password"
          name="newPassword"
          maxLength="100"
          value={newPassword}
          autoComplete="new-password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="form-group" xs={12} sm={12} md={12} lg={12}>
        <Form.Label>Confirmar contraseña</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          maxLength="100"
          value={confirmPassword}
          autoComplete="new-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>
      <div className="mt-3">
        <Button type="submit" variant="main" disabled={loading}>
          {loading ? (
            <Spinner animation="border" variant="white" size="sm" />
          ) : (
            <span>Cambiar contraseña</span>
          )}
        </Button>
      </div>
    </Form>
  );
};

export default ChangePassword;
