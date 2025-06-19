import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import AdminNewsForm from "./AdminNewsForm";
import { getAdminNewsById } from "../../../api/admin.news.api";

const AdminNewsSave = () => {
  const [news, setNews] = useState();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const loadNews = async (id) => {
      try {
        const newsData = (await getAdminNewsById(id)).data;
        setNews(newsData);
      } catch (error) {
        console.error("Error loading topics:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadNews(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <AdminNewsForm
        id={id}
        title={news ? news.title : ""}
        author={news ? news.author : ""}
        message={news ? news.message : ""}
      />
    </Container>
  );
};

export default AdminNewsSave;
