import { useSuspenseQuery } from '@tanstack/react-query';
import axiosInstance from '#apis/axios.ts';
import { getCakeLettersRes } from '@isttp/schemas/all';

async function fetchCakeLetters(ownerId: string, year: string, page: number) {
  const res = await axiosInstance.get<getCakeLettersRes>(
    `/cake/letters/${ownerId}/${year}?keyword=false&page=${page}`
  );
  return res.data;
}

export function useGetCakeLetters(ownerId: string, year: string, page: number) {
  return useSuspenseQuery({
    queryKey: ['cake-letters', ownerId, year, page],
    queryFn: () => fetchCakeLetters(ownerId, year, page),
  });
}
