import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '#apis/axios.ts';
import {
  CakeTypeResponse,
  PageTypeResponse,
  CakeColorType,
} from '@isttp/types/all';
import Pagenation from '#components/cake/Pagenation.tsx';
import RenderCake from '#components/RenderCake.tsx';

type CakeColorState = {
  sheetColor: CakeColorType;
  creamColor: CakeColorType;
};

interface yearProp {
  year: string;
}

const CakeInfo: React.FC<yearProp> = ({ year }) => {
  const navigate = useNavigate();
  const [cakeData, setCakeData] = useState<CakeTypeResponse[]>([]);
  const [cakeColor, setCakeColor] = useState<CakeColorState>({
    sheetColor: 'white',
    creamColor: 'white',
  });
  const [pageData, setPageData] = useState<PageTypeResponse>({
    currentPage: 1,
    totalPage: 1,
  });

  /*이때 year는 해당 페이지를 보고있는 시점 기준 케이크 주인의 올해 생일이 지났다면 내년, 안 지났다면 올해 연도 요청*/
  const { cakeUserId } = useParams();

  async function getLetters(page: number) {
    const res = await axiosInstance.get(
      `/cake/${cakeUserId}/${year}?keyword=false&page=${page}`,
    );
    setCakeData(res.data.data);
    setPageData({
      currentPage: res.data.currentPage,
      totalPage:
        res.data.totalPage === 0 ? res.data.totalPage + 1 : res.data.totalPage,
    });
  }

  async function getColors() {
    try {
      const res = await axiosInstance.get('/cake/color');

      if (!res.data.sheetColor || !res.data.creamColor) {
        navigate('/cake/create');
      }

      setCakeColor({
        sheetColor: res.data.sheetColor,
        creamColor: res.data.creamColor,
      });
    } catch (error) {
      console.log(error);
      // 로그인이 필요합니다 모달, 확인버튼 누르면
      // 로그아웃 시키고 (토큰 삭제)
      // 홈으로 이동
    }
  }

  useEffect(() => {
    getLetters(1);
    getColors();
  }, []);

  function changePage(page: number) {
    getLetters(page);
  }

  return (
    <>
      <div>케이크</div>
      <RenderCake
        sheetColor={cakeColor.sheetColor}
        creamColor={cakeColor.creamColor}
      />
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
