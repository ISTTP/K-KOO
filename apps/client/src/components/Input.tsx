import styled from 'styled-components';

const Input = styled.input`
  padding: 10px 20px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export default Input;
