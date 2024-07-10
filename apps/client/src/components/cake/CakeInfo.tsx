import React, { useEffect, useState } from 'react';
import axiosInstance from '#apis/axios.ts';
import { CakeTypeResponse, PageTypeResponse } from '@isttp/types/all';
import Pagenation from './Pagenation';

const CakeInfo = () => {
  const [cakeData, setCakeData] = useState<CakeTypeResponse[]>([]);
  const [pageData, setPageData] = useState<PageTypeResponse>({
    currentPage: 1,
    totalPage: 1,
  });

  async function getLetters(page: number) {
    const res = await axiosInstance.get(
      `/cake/ynswmsub2m/2025?keyword=false&page=${page}`,
    );
    setCakeData(res.data.data);
    setPageData({
      currentPage: res.data.currentPage,
      totalPage: res.data.totalPage,
    });
  }
  useEffect(() => {
    getLetters(1);
  }, []);

  function changePage(page: number) {
    getLetters(page);
  }

  return (
    <>
      <div>케이크</div>
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
