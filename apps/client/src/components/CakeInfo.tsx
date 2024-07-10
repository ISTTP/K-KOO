import React, { useEffect, useState } from 'react';
import axiosInstance from '#apis/axios.ts';
import { CakeTypeResponse } from '@isttp/types/all';
const CakeInfo = () => {
  const [cakeData, setCakeData] = useState<CakeTypeResponse[]>([]);
  /*이때 year는 해당 페이지를 보고있는 시점 기준 케이크 주인의 올해 생일이 지났다면 내년, 안 지났다면 올해 연도 요청
  page는 pagenation 버튼 선택에 따라 요청*/
  async function getLetters() {
    const res = await axiosInstance.get('/cake/1/2025?keyword=false&page=1');
    setCakeData(res.data.data);
  }
  useEffect(() => {
    getLetters();
  }, []);

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
      <p>페이지네이션</p>
    </>
  );
};

export default CakeInfo;
