import React from 'react';
import styles from './pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  title: string;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, pageSize, totalItems, onPageChange, title }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    onPageChange(page);
  };

  return (
    <div className="flex top-0 mb-4 ml-4 mr-4 justify-between items-center rounded-b-2xl text-white bg-gray-800 p-4 shadow-lg">
      <div className="flex w-1/3"></div>
      <div className="flex w-1/3 items-center justify-between space-x-4">
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition duration-300" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>
        <span className="text-lg font-semibold">
          {currentPage === 0 ? currentPage + 1 : currentPage} de {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition duration-300"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
      <div className="m-4 text-lg w-1/3 font-semibold text-right">{`${title} ${totalItems}`}</div>
    </div>
  );
};

export default Pagination;
