import { useState, useEffect } from "react";
import { getAdminCards, removeAdminCard } from "../../../api/admin.card.api";
import { Alert, Container } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./AdminCards.css";
import TableActionButtons from "../../../components/table-action-buttons/TableActionButtons";
import DataTable from "../../../components/data-table/DataTable";
import DataTableTitle from "../../../components/data-table-title/DataTableTitle";
import RemoveElementModal from "../../../components/remove-element-modal/RemoveElementModal";

const AdminCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showRemove, setShowRemove] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState(location.state);
  const [item, setItem] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    navigate(".", { replace: true });
  }, [navigate]);

  const loadCards = async (id) => {
    try {
      const cardsData = (await getAdminCards(id)).data;
      setCards(cardsData);
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
    setShowRemove(false);
    if (item) {
      try {
        await removeAdminCard(item);
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
    handleDelete
  ) => {
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCards = cards.slice(indexOfFirstItem, indexOfLastItem);

    return currentCards.map((card) => (
      <tr key={card.id}>
        <td>{card.id}</td>
        <td>{card.title}</td>
        <td>
          <p className="card-type-sticky badge">
            {card.isFree ? "Gratuito" : "Premium"}
          </p>
        </td>
        <td>
          {card.question && (
            <div dangerouslySetInnerHTML={{ __html: card.question }} />
          )}
        </td>
        <td>
          {card.answer && (
            <div dangerouslySetInnerHTML={{ __html: card.answer }} />
          )}
        </td>
        <td>
          {card.help && <div dangerouslySetInnerHTML={{ __html: card.help }} />}
        </td>
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
          {state && (
            <Alert variant={state.result ? "primary" : "danger"} dismissible>
              <b>
                {state.result
                  ? "Operación completada con éxito"
                  : "¡Ups! Algo salió mal."}
              </b>
              <br />
              <span>{state.message}</span>
            </Alert>
          )}
          <DataTableTitle
            title="Tarjetas"
            action="Crear Tarjeta"
            onClick={() =>
              navigate(`/admin/cards/save/`, { state: { subjectId: id } })
            }
          />
          <DataTable
            headers={[
              "#",
              "Tema",
              "Tipo",
              "Pregunta",
              "Respuesta",
              "Ayuda",
              "Acciones",
            ]}
            renderData={renderCards}
            itemsCount={cards.length}
            handleEdit={(id) => navigate(`/admin/cards/save/${id}`)}
            handleDelete={(id) => {
              setItem(id);
              setShowRemove(true);
            }}
          />
          <RemoveElementModal
            showRemoveModal={showRemove}
            handleCloseRemoveModal={() => setShowRemove(false)}
            modalHeader="¿Está seguro que desea eliminar la tarjeta?"
            modalBody="Se eliminará la tarjeta seleccionada y no se podrá recuperar la información"
            removeElement={deleteCard}
          />
        </>
      )}
    </Container>
  );
};

export default AdminCards;
