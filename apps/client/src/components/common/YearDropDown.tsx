import React, { useState, useEffect } from 'react';
import axiosInstance from '#apis/axios.ts';
import styled from 'styled-components';
import { getUserYearRes } from '@isttp/schemas/all';
import { useGetYear } from '#apis/cake/useGetYear.tsx';

interface YearDropdownProps {
  year: string;
  handleYear: (year: string) => void;
}

const YearDropdown: React.FC<YearDropdownProps> = ({ year, handleYear }) => {
  const [years, setYears] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isError } = useGetYear();

  useEffect(() => {
    if (isError) {
      alert('회원가입 연도 정보를 받아오지 못했습니다');
    }
    const firstYear = data.year;
    const maxYear = Number(year);
    const Options = [];
    for (let list = firstYear; list <= maxYear; list++) {
      Options.push(list.toString());
    }
    setYears(Options);
  }, [data]);

  return (
    <DropdownContainer>
      <DropdownButton
        onClick={() => setIsOpen(!isOpen)}>
        {year}년
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {years.map((list) => (
            <DropdownItem
              key={list}
              onClick={() => {
                handleYear(list);
                setIsOpen(false);
              }}
            >
              {list}년
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default YearDropdown;

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin: 24px 0;
`;

const DropdownButton = styled.button`
  background: var(--white);
  border: 1px solid var(--orange-500);
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  color: #828282;
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  background: var(--white);
  border-left: 1px solid var(--orange-500);
  border-right: 1px solid var(--orange-500);
  border-bottom: 1px solid var(--orange-500);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  width: 100%;
  z-index: 1;
  max-height: 150px;
  overflow-y: auto;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;
