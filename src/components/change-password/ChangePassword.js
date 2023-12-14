import { useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { changePassword } from "../../api/profile.api";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState({ success: "", message: [] });
  const [errors, setErrors] = useState([]);

  const [showResult, setShowResult] = useState(false);

  const cleanFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePasswordInformation()) {
      await handleChangePassword();
    } else {
      setResult({
        success: false,
        message: errors,
      });
    }
    setShowResult(true);
  };

  const validatePasswordInformation = () => {
    setErrors([]);
    if (currentPassword === "")
      errors.push("Por favor, ingrese su contraseña actual");
    if (newPassword === "")
      errors.push("Por favor, ingrese una nueva contraseña");
    if (newPassword.length < 8)
      errors.push("La nueva contraseña debe tener al menos 8 caracteres");
    if (confirmPassword === "")
      errors.push("Por favor, confirme su nueva contraseña");
    if (newPassword !== confirmPassword)
      errors.push("Las contraseñas no coinciden");
    return errors.length === 0;
  };

  const handleChangePassword = async () => {
    setLoading(true);
    try {
      await changePassword(currentPassword, newPassword);
      setResult({
        success: true,
        message: [
          "Ahora podrás utilizar tu nueva contraseña para ingresar a la aplicación",
        ],
      });
      cleanFields();
    } catch (error) {
      console.error("Error updating information:", error);
      setResult({
        success: false,
        message: ["La contraseña ingresa no coincide con los registros"],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form id="form-change-password" onSubmit={handleSubmit}>
      {showResult && (
        <Alert
          variant={result.success ? "primary" : "danger"}
          onClose={() => {
            setShowResult(false);
            setErrors([]);
          }}
          dismissible
        >
          <b>
            {result.success
              ? "Contraseña actualizada"
              : "¡Ups! Algo salió mal."}
          </b>
          <br />
          <ul>
            {result.message.map((err) => {
              return <li key={err}>{err}</li>;
            })}
          </ul>
        </Alert>
      )}
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
          autoComplete="new-password"
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
