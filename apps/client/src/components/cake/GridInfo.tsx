import React, { useState, CSSProperties, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import * as G from '#styles/GridStyle.tsx';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import ReadLetter from '../letter/ReadLetter';
import YearDropdown from '../common/YearDropDown';
import {
  getCakeDataRes,
  getCakeLettersRes,
  getCakeNoDataRes,
  getLetterRes,
} from '@isttp/schemas/all';
import { useGetLetters } from '#apis/cake/useGetGridLetters.tsx';
import { useGetLetter, useGetAllLetter } from '#apis/letter/useGetLetter.tsx';
import { useGetMyLetters } from '#apis/letter/useGetMyLetters.tsx';
import { useQueryClient } from '@tanstack/react-query';
import useIsPc from '#hooks/useIsPc.tsx';

const GRID_PAGE = 24;


const GridInfo: React.FC<{ year: string, handleTotalChange?: (total: number) => void }> = ({ year: init, handleTotalChange }) => {
  const [year, setYear] = useState(init);
  const [cakeData, setCakeData] = useState<getCakeDataRes[]>([]);
  const [page, setPage] = useState(1);
  const [noData, setNoData] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedItem, setSelectedItem] = useState<getLetterRes | null>(null);
  const [selectedLetterId, setSelectedLetterId] = useState<number | null>(null);
  const loaderRef = useRef<InfiniteLoader>(null);
  const { ownerId } = useParams();
  const queryClient = useQueryClient();
  const isPC = useIsPc(800);
  const COLUMN_NUM = isPC ? 5 : 3;
  const COL_WIDTH = isPC ? 155 : 130;
  const WIDTH = isPC ? 155 * 5 : 390;

  const { data, isFetching } = year === 'all'
    ? useGetMyLetters(page)
    : useGetLetters(ownerId!, year, page);

  const { data: letterData } = year === 'all'
    ? useGetAllLetter(selectedLetterId!)
    : useGetLetter(selectedLetterId!);

  useEffect(() => {
    if (data) {
      const noDataResult = getCakeNoDataRes.safeParse(data);
      if (noDataResult.success && noDataResult.data.noData) {
        setNoData(true);
        setHasMore(false);
        setCakeData([]);
        handleTotalChange?.(0);
      } else {
        const result = getCakeLettersRes.parse(data);
        setNoData(false);
        setHasMore(result.data.length >= GRID_PAGE);
        setCakeData((prev) => (page === 1 ? result.data : [...prev, ...result.data]));
        handleTotalChange?.(result.totalPage);
      }
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
    if (loaderRef.current) {
      loaderRef.current.resetloadMoreItemsCache();
    }
  }, [year]);

  useEffect(() => {
    if (letterData) {
      const result = getLetterRes.parse(letterData);
      if (result.isOpen) {
        setSelectedItem(result);
      } else {
        alert('편지는 생일 이후에 확인할 수 있어요.');
        setSelectedLetterId(null);
      }
    }
  }, [letterData]);

  const isItemLoaded = (index: number) => !hasMore || index < cakeData.length;

  const loadMoreItems = useCallback(() => {
    if (hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, isFetching]);

  const openLetter = (index: number) => {
    const item = cakeData[index];
    setSelectedLetterId(item.letterId);
    queryClient.resetQueries({
      queryKey: ['letter', item.letterId],
    });
  };

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: CSSProperties;
  }) => {
    const index = rowIndex * COLUMN_NUM + columnIndex;
    if (index >= cakeData.length) return null;

    const item = cakeData[index];
    return (
      <div
        className={
          columnIndex % 2
            ? rowIndex % 2 === 0
              ? 'GridItemOdd'
              : 'GridItemEven'
            : rowIndex % 2
              ? 'GridItemOdd'
              : 'GridItemEven'
        }
        style={{
          ...style,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onClick={() => openLetter(index)}
      >
        <G.CandleImage src={item.candleImageUrl} alt="장식초" />
        <G.Keyword isPC={isPC}>#{item.keyword}</G.Keyword>
        <G.Nickname>{item.nickname}</G.Nickname>
      </div>
    );
  };

  return (
    <>
      {year !== 'all' && <YearDropdown year={year} handleYear={setYear} />}
      {noData ? (
        <G.NoDataText>받은 편지가 없습니다</G.NoDataText>
      ) : (
        <InfiniteLoader
          ref={loaderRef}
          isItemLoaded={isItemLoaded}
          itemCount={hasMore ? cakeData.length + 1 : cakeData.length}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => {
            const newItemsRendered = (gridData: {
              visibleRowStopIndex: number;
              visibleRowStartIndex: number;
              overscanRowStartIndex: number;
              overscanRowStopIndex: number;
            }) => {
              const {
                visibleRowStopIndex,
                visibleRowStartIndex,
                overscanRowStartIndex,
                overscanRowStopIndex,
              } = gridData;

              if (visibleRowStopIndex >= cakeData.length / COLUMN_NUM - 2) {
                onItemsRendered({
                  visibleStartIndex: visibleRowStartIndex * COLUMN_NUM,
                  visibleStopIndex: visibleRowStopIndex * COLUMN_NUM,
                  overscanStartIndex: overscanRowStartIndex * COLUMN_NUM + 2,
                  overscanStopIndex: overscanRowStopIndex * COLUMN_NUM,
                });
              }
            };

            return (
              <Grid
                style={{ scrollbarWidth: 'none' }}
                columnCount={COLUMN_NUM}
                columnWidth={COL_WIDTH}
                height={590}
                rowCount={Math.ceil(cakeData.length / COLUMN_NUM)}
                rowHeight={150}
                width={WIDTH}
                onItemsRendered={newItemsRendered}
                ref={ref}
              >
                {Cell}
              </Grid>
            );
          }}
        </InfiniteLoader>
      )}
      {isFetching && <div>Loading</div>}
      <ReadLetter
        isOpen={!!selectedItem}
        handleClose={() => setSelectedItem(null)}
        nickname={selectedItem?.nickname ?? ''}
        contents={selectedItem?.contents ?? ''}
        candleImageUrl={selectedItem?.candleImageUrl ?? ''}
        keyword={selectedItem?.keyword ?? ''}
      />
    </>
  );
};

export default GridInfo;
