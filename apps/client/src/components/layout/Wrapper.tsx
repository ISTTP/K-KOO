import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  width: 100%;
  padding: 1rem;

  @media (min-width: 1025px) {
    margin: 0;
    padding: 52px 35px;
  }
`;

export default Wrapper;
