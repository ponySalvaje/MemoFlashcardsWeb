import { useState, useEffect } from "react";
import { getAdminCards } from "../../../api/admin.card.api";
import { Container } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminCards.css";
import TableActionButtons from "../../../components/table-action-buttons/TableActionButtons";
import DataTable from "../../../components/data-table/DataTable";
import DataTableTitle from "../../../components/data-table-title/DataTableTitle";

const AdminCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleEdit = (id) => {
    navigate(`/admin/cards/save/${id}`);
  };

  const handleDelete = (id) => {
    console.log("handle delete: ", id);
  };

  const handleCreateCard = () => {
    navigate(`/admin/cards/save/`);
  };

  useEffect(() => {
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

    loadCards(id);
  }, [id]);

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

  const cardsHeaders = [
    "#",
    "Tema",
    "Tipo",
    "Pregunta",
    "Respuesta",
    "Ayuda",
    "Acciones",
  ];

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <DataTableTitle
            title="Tarjetas"
            action="Crear Tarjeta"
            onClick={handleCreateCard}
          />
          <DataTable
            headers={cardsHeaders}
            renderData={renderCards}
            itemsCount={cards.length}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
    </Container>
  );
};

export default AdminCards;
