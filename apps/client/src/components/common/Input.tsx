import styled from 'styled-components';

type InputType = 'invalid' | 'default';

const Input = styled.input<{
  $type: InputType;
}>`
  padding: 18px 20px;
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
