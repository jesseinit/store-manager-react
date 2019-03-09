import React from 'react';

const Pagination = ({ allProps, entity }) => {
  const goToNextPage = () => {
    allProps.goToNextPage(entity.meta.nextPage);
  };

  const goToPrevPage = () => {
    allProps.goToPrevPage(entity.meta.prevPage);
  };

  return (
    <section className="pagination">
      {entity.meta.hasPrevPage ? (
        <button type="button" onClick={goToPrevPage} className="pagination__prev">
          Previous
        </button>
      ) : (
        <button type="button" disabled className="pagination__prev">
          Previous
        </button>
      )}
      <p className="pagination--info">{`Page ${entity.meta.currentPage} of ${entity.meta.totalPages}`}</p>
      {entity.meta.hasNextPage ? (
        <button type="button" onClick={goToNextPage} className="pagination__next">
          Next
        </button>
      ) : (
        <button type="button" disabled className="pagination__next">
          Next
        </button>
      )}
    </section>
  );
};

export default Pagination;
