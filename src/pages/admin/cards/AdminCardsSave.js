import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getAdminCard } from "../../../api/admin.card.api";
import AdminCardForm from "./AdminCardForm";
import Loading from "../../../components/loading/Loading";

const AdminCardsSave = () => {
  const [card, setCard] = useState();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const loadCard = async (id) => {
      try {
        const cardData = (await getAdminCard(id)).data;
        setCard(cardData);
      } catch (error) {
        console.error("Error loading cards:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCard(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <AdminCardForm
        id={id}
        subjectId={card ? card.subjectId : ""}
        name={card ? card.title : ""}
        premium={card ? !card.isFree : ""}
        question={card ? card.question : ""}
        answer={card ? card.answer : ""}
        help={card ? card.help : ""}
      />
    </Container>
  );
};

export default AdminCardsSave;
