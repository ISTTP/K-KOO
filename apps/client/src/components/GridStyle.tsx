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
  width: 70px;
  height: 70px;
  object-fit: cover;
  margin-bottom: 4px;
`;

export const Nickname = styled.p`
  font-size: 14px;
  padding: 0;
  margin: 0;
  color: var(--black-color);
`;

export const Keyword = styled.p`
  font-size: 14px;
  padding: 0;
  margin: 0;
  color: var(--black-color);
`;

export const NoDataText = styled.p`
  font-size: 18px;
  padding: 30px;
  margin: 0;
  color: var(--black-color);
`;
