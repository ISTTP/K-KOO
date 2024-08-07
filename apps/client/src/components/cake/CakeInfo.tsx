import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';
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
import { useGetCakeLetters } from '#apis/cake/useGetCakeLetters.tsx';
import { useGetLetter } from '#apis/letter/useGetLetter.tsx';
import { useQueryClient } from '@tanstack/react-query';
import Modal from '#components/modal/Modal.tsx';
import Button from '#components/common/Button.tsx';

interface CakeInfoProps {
  year: string;
  sheetColor: CakeColorType | null;
  creamColor: CakeColorType | null;
  isMyCake?: boolean;
}

const CakeInfo: React.FC<CakeInfoProps> = ({
  year,
  sheetColor,
  creamColor,
  isMyCake,
}) => {
  const { ownerId } = useParams();
  const [cakeData, setCakeData] = useState<getCakeDataRes[]>([]);
  const [selectedItem, setSelectedItem] = useState<getLetterRes | null>(null);
  const [selectedLetterId, setSelectedLetterId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [pageData, setPageData] = useState<getPageRes>({
    currentPage: 1,
    totalPage: 1,
  });
  const queryClient = useQueryClient();
  const { data: cakeLettersData } = useGetCakeLetters(ownerId!, year, pageData.currentPage);

  const { data: letterData } = useGetLetter(selectedLetterId!);

  useEffect(() => {
    const noDataResult = getCakeNoDataRes.safeParse(cakeLettersData);
    if (noDataResult.success && noDataResult.data.noData) {
      setCakeData([]);
      setPageData({ currentPage: 1, totalPage: 1 });
    } else {
      const result = getCakeLettersRes.parse(cakeLettersData);
      setCakeData(result.data);
      setPageData({
        currentPage: result.currentPage,
        totalPage: result.totalPage === 0 ? result.totalPage + 1 : result.totalPage,
      });
    }
  }, [cakeLettersData]);

  const changePage = (page: number) => {
    setPageData((prev) => ({ ...prev, currentPage: page }));
  };

  useEffect(() => {
    if (letterData) {
      const result = getLetterRes.parse(letterData);
      if (result.isOpen) {
        setSelectedItem(result);
      } else {
        setOpen(true);
        setSelectedLetterId(null);
      }
    }
  }, [letterData]);

  const openLetter = (index: number) => {
    const item = cakeData[index];
    setSelectedLetterId(item.letterId);
    queryClient.resetQueries({
      queryKey: ['letter', item.letterId],
    });
  };

  const candlePositions = [
    { top: 2, left: 30 },
    { top: 6, left: 50 },
    { top: 2, left: 70 },
    { top: 40, left: 20 },
    { top: 47, left: 40 },
    { top: 47, left: 60 },
    { top: 40, left: 80 },
  ];

  const candles = cakeData.map((cake, index) => ({
    candleImageUrl: cake.candleImageUrl,
    nickname: cake.nickname,
    position: candlePositions[index % candlePositions.length],
  }));

  return (
    <CakeContainer>
      <CakeInfoWrapper isMyCake={isMyCake}>
        <RenderCake
          sheetColor={sheetColor}
          creamColor={creamColor}
          candles={candles}
          handleClick={openLetter}
        />
      </CakeInfoWrapper>
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
          keyword={selectedItem?.keyword ?? ''}
        />
      )}
      <Modal open={open}>
        <span>편지 내용은 생일 이후에 확인할 수 있어요!{'\n'}두근두근...👉👈</span>
        <Button
          type="default"
          onClick={() => {
            setOpen(false);
          }}
        >
          확인
        </Button>
      </Modal>
    </CakeContainer>
  );
};

export default CakeInfo;

const CakeContainer = styled.div`
  margin-top: 50px;
`;

const CakeInfoWrapper = styled.div<{ isMyCake?: boolean }>`
  ${({ isMyCake }) =>
    isMyCake === false &&
    css`
      pointer-events: none;
    `}
`;
