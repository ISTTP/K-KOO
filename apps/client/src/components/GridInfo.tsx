import React, { useEffect, useState, CSSProperties } from 'react';
import axiosInstance from '#apis/axios.ts';
import { CakeTypeResponse } from '@isttp/types/all';
import { useParams } from 'react-router-dom';
import * as G from '#components/GridStyle.tsx';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

interface yearProp {
  year: string;
}

const GridInfo: React.FC<yearProp> = ({ year }) => {
  const [cakeData, setCakeData] = useState<CakeTypeResponse[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ownerId } = useParams();

  async function getLetters(page: number) {
    const res = await axiosInstance.get(
      `/cake/letters/${ownerId}/${year}?keyword=true&page=${page}`,
    );
    if (res.data.data.length < 24) {
      setHasMore(false);
    }
    setCakeData((prev) => [...prev, ...res.data.data]);
  }
  useEffect(() => {
    getLetters(1);
  }, []);

  const isItemLoaded = (index: number) => !hasMore || index < cakeData.length;

  const loadMoreItems = () => {
    if (hasMore) {
      setPage(page + 1);
      getLetters(page + 1);
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
    const index = rowIndex * 3 + columnIndex;
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
      >
        <G.CandleImage src={item.candleImageUrl} alt="장식초" />
        <G.Keyword># {item.keyword}</G.Keyword>
        <G.Nickname>{item.nickname}</G.Nickname>
      </div>
    );
  };

  return (
    <InfiniteLoader
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

          if (visibleRowStopIndex >= cakeData.length / 3 - 1) {
            onItemsRendered({
              visibleStartIndex: visibleRowStartIndex * 3,
              visibleStopIndex: visibleRowStopIndex * 3,
              overscanStartIndex: overscanRowStartIndex * 3 + 2,
              overscanStopIndex: overscanRowStopIndex * 3,
            });
          }
        };

        return (
          <Grid
            style={{ scrollbarWidth: 'none' }}
            columnCount={3}
            columnWidth={100}
            height={500}
            rowCount={Math.ceil(cakeData.length / 3)}
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
  );
};

export default GridInfo;
