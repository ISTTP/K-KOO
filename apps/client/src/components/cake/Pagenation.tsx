import React from 'react';
import styled from 'styled-components';

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
    <PageContainer>
      <div>
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
      </div>
    </PageContainer>
  );
};

export default Pagenation;

const PageContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;
