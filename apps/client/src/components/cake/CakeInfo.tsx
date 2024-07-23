import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axiosInstance from '#apis/axios.ts';
import { CakeColorType } from '@isttp/types/all';
import {
  getCakeDataRes,
  getPageRes,
  getCakeLettersRes,
  getLetterRes,
  getCakeNoDataRes,
} from '@isttp/schemas/all';
import Pagenation from '#components/cake/Pagenation.tsx';
import RenderCake from '#components/cake/RenderCake.tsx';
import ReadLetter from '#components/letter/ReadLetter.tsx';

interface CakeInfoProps {
  year: string;
  sheetColor: CakeColorType | null;
  creamColor: CakeColorType | null;
}

const CakeInfo: React.FC<CakeInfoProps> = ({
  year,
  sheetColor,
  creamColor,
}) => {
  const [cakeData, setCakeData] = useState<getCakeDataRes[]>([]);
  const [pageData, setPageData] = useState<getPageRes>({
    currentPage: 1,
    totalPage: 1,
  });
  const [selectedItem, setSelectedItem] = useState<getLetterRes | null>(null);

  const { ownerId } = useParams();

  async function getLetters(page: number) {
    const res = await axiosInstance.get<getCakeLettersRes>(
      `/cake/letters/${ownerId}/${year}?keyword=false&page=${page}`,
    );
    const noDataResult = getCakeNoDataRes.safeParse(res.data); //정상적으로 data가 있을 경우 error로 작동 멈추지 않도록 safeParse로 처리
    if (noDataResult.success && noDataResult.data.noData) {
      setCakeData([]);
    } else {
      const result = getCakeLettersRes.parse(res.data);
      setCakeData(result.data);
      setPageData({
        currentPage: result.currentPage,
        totalPage:
          result.totalPage === 0 ? result.totalPage + 1 : result.totalPage,
      });
    }
  }

  useEffect(() => {
    getLetters(1);
  }, [ownerId]);

  function changePage(page: number) {
    getLetters(page);
  }

  const openLetter = async (index: number) => {
    const item = cakeData[index];
    const res = await axiosInstance.get<getLetterRes>(
      `/letter/${item.letterId}`,
    );
    const result = getLetterRes.parse(res.data);

    if (result.isOpen) {
      setSelectedItem(result);
    } else {
      alert('편지는 생일 이후에 확인할 수 있어요.');
    }
  };

  const candlePositions = [
    { top: 5, left: 35 },
    { top: 5, left: 65 },
    { top: 35, left: 30 },
    { top: 35, left: 70 },
    { top: 65, left: 15 },
    { top: 65, left: 50 },
    { top: 65, left: 85 },
  ];

  const candles = cakeData.map((cake, index) => ({
    candleImageUrl: cake.candleImageUrl,
    nickname: cake.nickname,
    position: candlePositions[index % candlePositions.length],
  }));

  return (
    <CakeContainer>
      <RenderCake
        sheetColor={sheetColor}
        creamColor={creamColor}
        candles={candles}
        handleClick={openLetter}
      />
      <Pagenation
        currentPage={pageData.currentPage}
        totalPage={pageData.totalPage}
        changePage={changePage}
      />
      {selectedItem && (
        <ReadLetter
          isOpen={!!selectedItem}
          handleClose={() => setSelectedItem(null)}
          nickname={selectedItem?.nickname ?? ''}
          contents={selectedItem?.contents ?? ''}
          candleImageUrl={selectedItem?.candleImageUrl ?? ''}
        />
      )}
    </CakeContainer>
  );
};

export default CakeInfo;

const CakeContainer = styled.div`
  margin-top: 50px;
`;
