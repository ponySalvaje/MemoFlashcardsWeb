import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TableActionButtons from "../../../components/table-action-buttons/TableActionButtons";
import EntityTable from "../../../components/entity-table/EntityTable";
import { getAdminTopic } from "../../../api/admin.topic.api";
import {
  getAdminMCCards,
  removeAdminMCCard,
} from "../../../api/admin.mccard.api";

const AdminMCCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState(location.state);
  const [item, setItem] = useState(0);

  const [lessonId, setLessonId] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    navigate(".", { replace: true });
  }, [navigate]);

  const loadCards = async (id) => {
    try {
      const cardsData = (await getAdminMCCards(id)).data;
      const topicData = (await getAdminTopic(id)).data;
      setCards(cardsData);
      setLessonId(topicData.lessonId);
    } catch (error) {
      console.error("Error loading cards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards(id);
  }, [id]);

  const deleteCard = async () => {
    if (item) {
      try {
        await removeAdminMCCard(item);
        loadCards(id);
        setState({
          result: true,
          message: "Tarjeta eliminada exitosamente!",
        });
      } catch (error) {
        setState({
          result: false,
          message:
            "Hubo un error inesperado al eliminar la tarjeta. Por favor, inténtelo más tarde.",
        });
      }
    }
  };

  const renderCards = (
    page,
    itemsPerPage,
    handleView = () => {},
    handleEdit,
    handleDelete,
    filter
  ) => {
    let filteredCards = cards;

    if (filter && filter.trim() !== "") {
      filteredCards = cards.filter((card) =>
        card.question.toLowerCase().includes(filter.toLowerCase())
      );
    }

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCards = filteredCards.slice(indexOfFirstItem, indexOfLastItem);

    return currentCards.map((card) => (
      <tr key={card.id}>
        <td>{card.id}</td>
        <td>{card.question}</td>
        <td>{card.answer}</td>
        <td>
          <TableActionButtons
            itemId={card.id}
            showView={false}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </td>
      </tr>
    ));
  };

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <EntityTable
            state={state}
            title="Tarjetas"
            goBackAction="Regresar"
            goBackClick={() => navigate(`/admin/topics/${lessonId}`)}
            createAction="Crear Tarjeta"
            createClick={() =>
              navigate(`/admin/multiple-choice-cards/save/`, {
                state: { subjectId: id },
              })
            }
            headers={["#", "Pregunta", "Respuesta", "Acciones"]}
            renderData={renderCards}
            itemsCount={cards.length}
            itemList={cards}
            viewButton={(id) => navigate(`/admin/multiple-choice-cards/${id}`)}
            editButton={(id) =>
              navigate(`/admin/multiple-choice-cards/save/${id}`)
            }
            deleteButton={deleteCard}
            deleteHeader="¿Está seguro que desea eliminar la tarjeta?"
            deleteMessage="Se eliminará la tarjeta seleccionada y no se podrá recuperar la información"
            setItem={setItem}
          />
        </>
      )}
    </Container>
  );
};

export default AdminMCCards;
