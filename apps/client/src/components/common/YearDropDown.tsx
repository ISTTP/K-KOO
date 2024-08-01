import React, { useState, useEffect } from 'react';
import axiosInstance from '#apis/axios.ts';
import styled from 'styled-components';
import { getUserYearRes } from '@isttp/schemas/all';

interface YearDropdownProps {
  year: string;
  handleYear: (year: string) => void;
}

const YearDropdown: React.FC<YearDropdownProps> = ({ year, handleYear }) => {
  const [years, setYears] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const getYears = async () => {
    try {
      const res = await axiosInstance.get<getUserYearRes>('/user/year');
      const firstYear = res.data.year;

      const maxYear = Number(year);
      const Options = [];
      for (let list = firstYear; list <= maxYear; list++) {
        Options.push(list.toString());
      }
      setYears(Options);
    } catch (error) {
      alert('회원가입 연도 정보를 받아오지 못했습니다' + String(error));
    }
  };

  useEffect(() => {
    getYears();
  }, []);

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>{year}</DropdownButton>
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
              {list}
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
  width: 300px;
`;

const DropdownButton = styled.button`
  background: var(--white);
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  width: 300px;
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 32px;
  left: 0;
  background: var(--white);
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  width: 300px;
  z-index: 1;
  max-height: 150px;
  overflow-y: auto;
  box-sizing: border-box;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;
