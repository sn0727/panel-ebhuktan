import React from 'react';
import ReactPaginate from 'react-paginate';

const PaginationFirst = ({ pageCount, onPageChange }) => {
  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default PaginationFirst;