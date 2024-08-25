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
    </PageContainer>
  );
};

export default Pagenation;

const PageContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  gap: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  @media (min-width: 801px) {
    margin-bottom: 62px;
  }

  button{
    width: 29px;
    height: 29px;
    border-radius: 50%;
    border: none;
    background: var(--orange-500);
    font-family: Pretendard;
    color: var(--white);
  }

  span{
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
