import React, { useEffect, useState, CSSProperties } from 'react';
import axiosInstance from '#apis/axios.ts';
import { CakeTypeResponse } from '@isttp/types/all';
import { useParams } from 'react-router-dom';
import * as G from '#components/GridStyle.tsx';
import { FixedSizeGrid as Grid } from 'react-window';

interface yearProp {
  year: string;
}

const GridInfo: React.FC<yearProp> = ({ year }) => {
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

  const [cakeData, setCakeData] = useState<CakeTypeResponse[]>([]);
  const { cakeUserId } = useParams();

  async function getLetters() {
    const res = await axiosInstance.get(
      `/cake/${cakeUserId}/${year}?keyword=true&page=all`,
    );
    setCakeData(res.data.data);
  }
  useEffect(() => {
    getLetters();
  }, []);

  return (
    <>
      <Grid
        columnCount={3} //3xN의 3
        columnWidth={100} //3개가 모두 포함되는 가로 사이즈
        height={500} //렌더링되는 높이
        rowCount={Math.ceil(cakeData.length / 3)} //3xN의 N
        rowHeight={150} //3개가 모두 포함되는 세로 사이즈
        width={300} //렌더링되는 넓이
      >
        {Cell}
      </Grid>
    </>
  );
};

export default GridInfo;
