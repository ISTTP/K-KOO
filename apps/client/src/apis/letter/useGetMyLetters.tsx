import { useQuery } from '@tanstack/react-query';
import axiosInstance from '#apis/axios.ts';

async function fetchLetters(page: number) {
  const res = await axiosInstance.get(
    `/letters/me?page=${page}`
  );
  return res.data;
}

export const useGetMyLetters = (page: number) => {
  return useQuery({
    queryKey: ['my-letters', page],
    queryFn: () => fetchLetters(page),
  });
}

