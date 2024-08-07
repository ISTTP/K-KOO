import styled from 'styled-components';

export const SideWrapper = styled.div`  
 @media (min-width: 1025px) {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;
    grid-template-columns: 200px 1fr; 
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  width: 100%;
  padding: 1rem;

  @media (min-width: 1025px) {
    margin: 0 auto; 
    padding: 52px 35px;
    grid-column: 2; 
  }
`;

export const Container = styled.aside`
  width: 225px;
  height:100dvh;
  background: var(--orange-200, #FFF2E1);
  display: none;
  padding: 30px 27px;

  @media (min-width: 1025px) {
    display: block;
    position: fixed; 
    left: 0;
    top: 0;
  }

  .logo{
    display: flex;
    align-items: center;
    gap: 13px;
    margin-bottom: 47px;
  }

  .menu{
    margin-bottom: 47px;
    gap: 20px;
    display: flex;
    flex-direction: column;

    text-align: center;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    line-height: normal;

    li{
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      color: var(--black, #000);
      font-weight: 500;

      &:hover{
        font-weight: 700;
      }
    }

    li svg {
      fill: #FFC57C;
      stroke: #FFC57C;
    }

    li.selected {
      color: var(--orange-500, #FFA83C);
      font-weight: 700;
    }

    li.selected svg {
      fill: var(--orange-500, #FFA83C);
      stroke: var(--orange-500, #FFA83C);
    }
  }
`;
