import React from 'react';

interface PageProps {
  currentPage: number;
  totalPage: number;
  changePage: (page: number) => void;
}

const Pagenation: React.FC<PageProps> = ({
  currentPage,
  totalPage,
  changePage,
}) => {
  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <p>
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <span>
          {' '}
          {currentPage} / {totalPage}{' '}
        </span>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          &gt;
        </button>
      </p>
    </div>
  );
};

export default Pagenation;
