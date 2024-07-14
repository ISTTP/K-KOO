import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

type CandleData = {
  id: number;
  imageUrl: string;
  point: number;
}[];

async function hadleCreateLetter(){
  // 
}

const CreateLetter = () => {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const candle = searchParams.get('candle');

  const [content, setContent] = useState('');

  return (
    <Wrapper>
      <h1>편지 작성</h1>
      <textarea onChange={(e) => setContent(e.target.value)} />
    </Wrapper>
  );
};

export default CreateLetter;
