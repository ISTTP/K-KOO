import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '#apis/axios.ts';
import {
  CakeTypeResponse,
  PageTypeResponse,
  CakeColorType,
} from '@isttp/types/all';
import Pagenation from '#components/cake/Pagenation.tsx';
import RenderCake from '#components/RenderCake.tsx';

interface CakeInfoProps {
  year: string;
  sheetColor: CakeColorType;
  creamColor: CakeColorType;
}

const CakeInfo: React.FC<CakeInfoProps> = ({
  year,
  sheetColor,
  creamColor,
}) => {
  const [cakeData, setCakeData] = useState<CakeTypeResponse[]>([]);
  const [pageData, setPageData] = useState<PageTypeResponse>({
    currentPage: 1,
    totalPage: 1,
  });

  const { ownerId } = useParams();

  async function getLetters(page: number) {
    const res = await axiosInstance.get(
      `/cake/letters/${ownerId}/${year}?keyword=false&page=${page}`,
    );
    setCakeData(res.data.data);
    setPageData({
      currentPage: res.data.currentPage,
      totalPage:
        res.data.totalPage === 0 ? res.data.totalPage + 1 : res.data.totalPage,
    });
  }

  useEffect(() => {
    getLetters(1);
  }, [ownerId]);

  function changePage(page: number) {
    getLetters(page);
  }

  return (
    <>
      <RenderCake sheetColor={sheetColor} creamColor={creamColor} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cakeData.map((cake, index) => (
          <div key={index} style={{ margin: '10px', textAlign: 'center' }}>
            <img
              src={cake.candleImageUrl}
              alt={'장식초'}
              style={{ width: '100px', height: '100px' }}
            />
            <p>{cake.nickname}</p>
          </div>
        ))}
      </div>
      <Pagenation
        currentPage={pageData.currentPage}
        totalPage={pageData.totalPage}
        changePage={changePage}
      />
    </>
  );
};

export default CakeInfo;
