import { Pagination } from "react-bootstrap";

const Paginator = ({
  page,
  maxPagesToShow,
  itemsCount,
  itemsPerPage,
  handlePaginationClick,
}) => {
  const totalPages = Math.ceil(itemsCount / itemsPerPage);

  const calculatePageNumbers = () => {
    const pages = [];
    const startPage = Math.max(
      1,
      Math.min(
        page - Math.floor(maxPagesToShow / 2),
        totalPages - maxPagesToShow + 1
      )
    );

    for (
      let i = startPage;
      i < startPage + maxPagesToShow && i <= totalPages;
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => handlePaginationClick(1)} />
      <Pagination.Prev
        onClick={() => handlePaginationClick(page - 1)}
        disabled={page === 1}
      />

      {page > Math.floor(maxPagesToShow / 2) + 1 && (
        <>
          <Pagination.Item onClick={() => handlePaginationClick(1)}>
            1
          </Pagination.Item>
          <Pagination.Ellipsis />
        </>
      )}

      {calculatePageNumbers().map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === page}
          onClick={() => handlePaginationClick(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>
      ))}

      {page <= totalPages - Math.fround(maxPagesToShow / 2) && (
        <>
          <Pagination.Ellipsis />
          <Pagination.Item onClick={() => handlePaginationClick(totalPages)}>
            {totalPages}
          </Pagination.Item>
        </>
      )}

      <Pagination.Next
        onClick={() => handlePaginationClick(page + 1)}
        disabled={page === totalPages}
      />
      <Pagination.Last onClick={() => handlePaginationClick(totalPages)} />
    </Pagination>
  );
};

export default Paginator;
