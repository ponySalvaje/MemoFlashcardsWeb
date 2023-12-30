import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { getAdminTopic } from "../../../api/admin.topic.api";
import AdminTopicForm from "./AdminTopicForm";
import Loading from "../../../components/loading/Loading";

const AdminTopicsSave = () => {
  const [topic, setTopic] = useState();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const location = useLocation();
  const lessonId = location.state && location.state.lessonId;

  useEffect(() => {
    const loadTopic = async (id) => {
      try {
        const topicData = (await getAdminTopic(id)).data;
        console.log("topicData: ", topicData);
        setTopic(topicData);
      } catch (error) {
        console.error("Error loading topics:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadTopic(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <AdminTopicForm
        id={id}
        lessonId={topic ? topic.lessonId : lessonId}
        name={topic ? topic.title : ""}
      />
    </Container>
  );
};

export default AdminTopicsSave;
