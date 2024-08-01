import styled from 'styled-components';

const TitleWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-top: 10.25rem;
  gap: 1.5rem;
`;

const Title = styled.h1`
  color: var(--black);
`;

const SubTitle = styled.h2`
  color: var(--orange-500);
`;

const InputWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 1.25rem;
`;

const WarningWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin: 1rem 0;
  gap: 0.25rem;
`;

const Warning = styled.p`
  color: var(--magenta);
  font-size: 0.875rem;
  font-weight: 500;
`;

export {
  InputWrapper,
  WarningWrapper,
  Warning,
  TitleWrapper,
  Title,
  SubTitle,
}
