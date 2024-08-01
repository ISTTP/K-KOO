import styled from 'styled-components';

export const MyPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const HomeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const NameWrapper = styled.h2`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

export const Nickname = styled.span`
  color: var(--orange-500);
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0.5rem 0;
`;

export const MyLetterButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;

  &:hover {
    opacity: 0.8;
  }
`;

export const PointWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const PointIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--orange-500);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
`;

export const SubTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

export const Hr = styled.hr`
  width: 100%;
  border: 1.5px solid var(--gray-300);
  margin: 2rem 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid var(--gray-400);
  border-radius: 0.5rem;

  &:disabled {
    background-color: var(--gray-300);
  }
`;

export const AccountSettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  gap: 1rem;
`;

export const AccountButton = styled.button`
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
