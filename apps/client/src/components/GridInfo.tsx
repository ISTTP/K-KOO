import React, { useEffect, useState, CSSProperties, useRef } from 'react';
import axiosInstance from '#apis/axios.ts';
import { useParams } from 'react-router-dom';
import * as G from '#components/GridStyle.tsx';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import ReadLetter from './letter/ReadLetter';
import YearDropdown from './YearDropDown';
import {
  getCakeDataRes,
  getCakeLettersRes,
  getCakeNoDataRes,
  getLetterRes,
} from '@isttp/schemas/all';

interface yearProp {
  year: string;
}

const GridInfo: React.FC<yearProp> = ({ year: init }) => {
  const [year, setYear] = useState(init);
  const [cakeData, setCakeData] = useState<getCakeDataRes[]>([]);
  const [page, setPage] = useState(1);
  const [noData, setNoData] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedItem, setSelectedItem] = useState<getLetterRes | null>(null);
  const loaderRef = useRef<InfiniteLoader>(null);
  const { ownerId } = useParams();
  const GRID_PAGE = 24;
  const COLUMN_NUM = 3;

  async function getLetters(page: number, year: string) {
    try {
      const res = await axiosInstance.get(
        `/cake/letters/${ownerId}/${year}?keyword=true&page=${page}`,
      );
      const noDataResult = getCakeNoDataRes.safeParse(res.data); //정상적으로 data가 있을 경우 error로 작동 멈추지 않도록 safeParse로 처리
      if (noDataResult.success && noDataResult.data.noData) {
        setNoData(true);
        setHasMore(false);
        setCakeData([]);
      } else {
        const result = getCakeLettersRes.parse(res.data);
        setNoData(false);
        setHasMore(result.data.length >= GRID_PAGE);
        setCakeData((prev) =>
          page === 1 ? result.data : [...prev, ...result.data],
        );
      }
    } catch (error) {
      console.error('편지 데이터를 불러오는데 실패했습니다:', error);
    }
  }

  useEffect(() => {
    setPage(1);
    setCakeData([]);
    setHasMore(true);
    getLetters(1, year);
    if (loaderRef.current) {
      loaderRef.current.resetloadMoreItemsCache();
    }
  }, [year]);

  const isItemLoaded = (index: number) => !hasMore || index < cakeData.length;

  const loadMoreItems = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
      getLetters(page + 1, year);
    }
  };

  const openLetter = async (index: number) => {
    const item = cakeData[index];
    const res = await axiosInstance.get(`/letter/${item.letterId}`);
    const result = getLetterRes.parse(res.data);
    if (result.isOpen) {
      setSelectedItem(result);
    } else {
      alert('편지는 생일 이후에 확인할 수 있어요.');
    }
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
        <G.Keyword># {item.keyword}</G.Keyword>
        <G.Nickname>{item.nickname}</G.Nickname>
      </div>
    );
  };

  return (
    <>
      <YearDropdown year={year} handleYear={setYear} />
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
              if (visibleRowStopIndex >= cakeData.length / COLUMN_NUM - 1) {
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
                columnWidth={100}
                height={500}
                rowCount={Math.ceil(cakeData.length / COLUMN_NUM)}
                rowHeight={150}
                width={300}
                onItemsRendered={newItemsRendered}
                ref={ref}
              >
                {Cell}
              </Grid>
            );
          }}
        </InfiniteLoader>
      )}
      <ReadLetter
        isOpen={!!selectedItem}
        handleClose={() => setSelectedItem(null)}
        nickname={selectedItem?.nickname ?? ''}
        contents={selectedItem?.contents ?? ''}
        candleImageUrl={selectedItem?.candleImageUrl ?? ''}
      />
    </>
  );
};

export default GridInfo;
