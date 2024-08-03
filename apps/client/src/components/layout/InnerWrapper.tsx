import styled from 'styled-components';

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  width: 100%;
  padding: 1rem;
  margin: 0 35px;
  
  @media (min-width: 801px) {
    width: 800px;
  }
`;

export default InnerWrapper;
