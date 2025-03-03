import React from "react";
import "./Pagination.css";
import PagIcon from "./PagIcon";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

  const handlePageChange = (page: number) => {
    // Прокрутка страницы вверх
    window.scrollTo(0, 0);
    onPageChange(page);
  };

  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
      <PagIcon />
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button 
          key={i + 1} 
          className={currentPage === i + 1 ? "active" : ""} 
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button className="rotate-right" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
        <PagIcon />
      </button>
    </div>
  );
};

export default Pagination;
