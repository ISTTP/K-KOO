import styled from 'styled-components';

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;

  @media (min-width: 450px) {
    width: 450px;
  }
`;

export default InnerWrapper;
