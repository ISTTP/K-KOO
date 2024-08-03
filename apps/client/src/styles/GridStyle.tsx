import styled from 'styled-components';

export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  background-color: var(--white);
`;

export const CandleImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 4px;
  border-radius: 10px;
  border: 1px solid var(--orange-500 );
  position: relative;
  background: var(--white);

  &:hover {
    border: 3px solid var(--orange-500 );
  }


`;

export const Nickname = styled.p`
  font-size: 14px;
  color: var(--black);
  text-align: center;
  font-family: 'Pretendard';
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 8px;
`;

export const Keyword = styled.p<{ isPC: boolean }>`
  font-size: 14px;
  padding: 4px 12px;
  color: var(--black);
  position: absolute;
  top: 72px;
  left: ${props => (props.isPC ? '27.5px' : '15px')};
  border-radius: 10px;
  background: var(--orange-500);
  color: var(--white, #FFF);
  text-align: center;
  font-family: 'Pretendard';
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const NoDataText = styled.p`
  font-size: 18px;
  padding: 30px;
  margin: 0;
  color: var(--black);
`;
