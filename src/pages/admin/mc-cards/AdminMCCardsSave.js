import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import AdminMCCardForm from "./AdminMCCardForm";
import Loading from "../../../components/loading/Loading";
import { getAdminMCCard } from "../../../api/admin.mccard.api";

const AdminMCCardsSave = () => {
  const [card, setCard] = useState();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const location = useLocation();
  const subjectId = location.state && location.state.subjectId;

  useEffect(() => {
    const loadCard = async (id) => {
      try {
        const cardData = (await getAdminMCCard(id)).data;
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
      <AdminMCCardForm
        id={id}
        subjectId={card ? card.subjectId : subjectId}
        question={card ? card.question : ""}
        answers={card ? card.answers : []}
      />
    </Container>
  );
};

export default AdminMCCardsSave;
