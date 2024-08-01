import styled from 'styled-components';

const Input = styled.input<{
  $isValid: boolean;
}>`
  width: 100%;
  height: 3.5rem;
  padding: 0 1rem;
  font-size: 1.05rem;
  box-sizing: border-box;
  border: 1px solid ${(props) => (props.$isValid ? 'var(--orange-500)' : 'var(--magenta)')};
  border-radius: 0.25rem;
`;

export default Input;
