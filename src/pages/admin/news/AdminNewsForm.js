import { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createAdminNews, updateAdminNews } from "../../../api/admin.news.api";

const AdminNewsForm = ({ id, title, author, message }) => {
  const [newsTitle, setNewsTitle] = useState(title);
  const [newsAuthor, setNewsAuthor] = useState(author);
  const [newsMessage, setNewsMessage] = useState(message);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSaveNews = async () => {
    setLoading(true);
    try {
      const newsBody = {
        title: newsTitle,
        author: newsAuthor,
        message: newsMessage,
      };
      id
        ? await updateAdminNews(id, newsBody)
        : await createAdminNews(newsBody);
      navigate("/admin/news", {
        state: {
          result: true,
          message: `Noticia ${id ? "modificada" : "creada"} exitosamente!`,
        },
      });
    } catch (error) {
      console.error("Error updating information:", error);
      navigate("/admin/news", {
        state: {
          result: false,
          message:
            "Hubo un error inesperado al guardar la noticia. Por favor, inténtelo más tarde.",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveNews();
  };

  return (
    <Form id="form-save-specialty" onSubmit={handleSubmit}>
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Form.Group className="form-group">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="news-title"
              maxLength="255"
              value={newsTitle}
              required={true}
              onChange={(e) => setNewsTitle(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col xs={12} sm={6} md={6} lg={6}>
          <Form.Group className="form-group">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              name="news-author"
              maxLength="255"
              value={newsAuthor}
              required={true}
              onChange={(e) => setNewsAuthor(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col xs={12} sm={12} md={12} lg={12}>
          <Form.Group className="form-group">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="news-message"
              maxLength={2500}
              value={newsMessage}
              required
              onChange={(e) => setNewsMessage(e.target.value)}
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

export default AdminNewsForm;
