import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MyPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 4rem;
`;

export const HomeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const TitleWrapper = styled.h2`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  gap: 0.5rem;
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
`;

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const EditContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2rem;
`;

export const EditWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  border: 1px solid var(--orange-400);
  margin: 1.6rem 0;
`;

export const Input = styled.input`
  width: 100%;
  height: 3.5rem;
  padding: 0.5rem;
  margin: 0.5rem 0;
  padding: 0 1rem;
  font-size: 1.05rem;
  border-radius: 0.25rem;
  border: 1px solid var(--orange-400);
  background-color: var(--white);
  color: var(--black);

  &:disabled {
    color: var(--gray-500);
  }
`;

export const AccountSettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
`;

export const AccountButton = styled.button`
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-bottom: 1.6rem;

  &:hover {
    opacity: 0.8;
  }
`;

export const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
`;

export const StyledLink = styled(Link)`
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  background-color: transparent;
  color: var(--black);
  cursor: pointer;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: right;
  gap: 1rem;
`;

export const OrangeButton = styled.button`
  background-color: var(--orange-500);
  border: none;
  border-radius: 0.8rem;
  padding: 0.3rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  color: var(--white);

  &:hover {
    opacity: 0.8;
  }
`;

export const WhiteButton = styled.button`
  background-color: var(--white);
  border: 1px solid var(--orange-500);
  border-radius: 0.8rem;
  padding: 0.3rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  color: var(--orange-500);

  &:hover {
    opacity: 0.8;
  }
`;
