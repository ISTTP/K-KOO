import styled from 'styled-components';

export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  background-color: var(--light-orange-color);
`;

export const CandleImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 4px;
  border-radius: 10px;
  border: 1px solid var(--orange-color );
  position: relative;

  &:hover {
    border: 3px solid var(--orange-color );
  }


`;

export const Nickname = styled.p`
  font-size: 14px;
  color: var(--black-color);
  text-align: center;
  font-family: 'Pretendard';
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 8px;
`;

export const Keyword = styled.p`
  font-size: 14px;
  padding: 4px 12px;
  color: var(--black-color);
  position: absolute;
  top: 72px;
  left: 15px;
  border-radius: 10px;
  background: var(--orange-color);
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
  color: var(--black-color);
`;
