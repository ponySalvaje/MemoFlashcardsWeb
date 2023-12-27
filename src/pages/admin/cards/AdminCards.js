import { useState, useEffect } from "react";
import { getAdminCards } from "../../../api/admin.api";
import { Container, Table } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import Paginator from "../../../components/paginator/Paginator";
import { useParams } from "react-router-dom";
import "./AdminCards.css";
import TableActionButtons from "../../../components/table-action-buttons/TableActionButtons";

const AdminCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [maxPagesToShow] = useState(5);

  const { id } = useParams();

  const handleView = (id) => {
    console.log("handle view: ", id);
  };

  const handleEdit = (id) => {
    console.log("handle edit: ", id);
  };

  const handleDelete = (id) => {
    console.log("handle delete: ", id);
  };

  useEffect(() => {
    const loadCards = async (id) => {
      try {
        const cardsData = (await getAdminCards(id)).data;
        setCards(cardsData);
        console.log("cardsData: ", cardsData);
      } catch (error) {
        console.error("Error loading cards:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCards(id);
  }, [id]);

  const renderCards = () => {
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

  const handlePaginationClick = (newPage) => {
    setPage(newPage);
  };

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Tema</th>
                <th>Tipo</th>
                <th>Pregunta</th>
                <th>Respuesta</th>
                <th>Ayuda</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>{renderCards()}</tbody>
          </Table>
          <Paginator
            page={page}
            maxPagesToShow={maxPagesToShow}
            itemsCount={cards.length}
            itemsPerPage={itemsPerPage}
            handlePaginationClick={handlePaginationClick}
          />
        </>
      )}
    </Container>
  );
};

export default AdminCards;
