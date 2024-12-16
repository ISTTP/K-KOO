import React from 'react';
import styled from 'styled-components';
import PrevIcon from '../../assets/icons/PrevIcon';

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
        <PrevIcon />
      </button>
      <span>
        {' '}
        {currentPage} / {totalPage}{' '}
      </span>
      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPage}
        className='next'
      >
        <PrevIcon />
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
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--orange-500);
    font-family: Pretendard;
    color: var(--white);

    &.next{
      transform: rotate(180deg);
    }
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
