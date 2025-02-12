import styled, { css } from 'styled-components';

export const H1 = styled.h1`
  background: linear-gradient(90deg, #FF3E3E 0%, #582599 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-family: "sansita";
  font-size: 2.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
  margin-top: 2rem;
`;

export const CakeContainer = styled.div`
  margin-top: 50px;
`;

export const CakeInfoWrapper = styled.div<{ isMyCake?: boolean }>`
  ${({ isMyCake }) =>
    isMyCake === false &&
    css`
      pointer-events: none;
    `}
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  width: 100%;
`
/*케이크 페이지 헤더*/

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  padding-bottom: 20px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h1`
  font-weight: bold;
`;

export const SubTitle = styled.h2`
  margin-top: 0.5rem;
`;

export const Nickname = styled.p`
  color: var(--orange-500);
  display: inline;
`;

export const Phrase = styled.p`
  display: inline;
`;

export const MyPageButton = styled.button`
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  border-width: 0;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  background-color: transparent;

  &:hover {
    opacity: 0.8;
  }
`;

/* RenderCake */

export const ColorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: rgba(222, 222, 222, 0.5);
  padding: 0.6rem;
  border-radius: 0.5rem;
`;

export const ColorOption = styled.div<{ $color: string; selected: boolean }>`
  display: flex;
  flex-direction: row; 
  justify-content: center;
  align-items: center; 
  width: 2.5rem;
  height: 2.5rem;
  margin: 0.5rem;
  border-radius: 50%;
  background-color: var(--${(props) => props.$color === 'white' ? 'white' : `${props.$color}-100`});
  cursor: pointer;
  transition: border 0.1s;

  &:hover {
    border: 5px solid var(--${(props) => props.$color === 'white' ? 'gray-400' : `${props.$color}-200`});
  }
  
  @media (max-width: 429px) {
    width: 2rem;
    height: 2rem;
    margin: 0.5rem;
  }
`;
