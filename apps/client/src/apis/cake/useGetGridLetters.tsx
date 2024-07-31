import { useQuery } from '@tanstack/react-query';
import axiosInstance from '#apis/axios.ts';

export const fetchLetters = async (ownerId: string, year: string, page: number) => {
  const res = await axiosInstance.get(`/cake/letters/${ownerId}/${year}?keyword=true&page=${page}`);
  return res.data;
};

export const useGetLetters = (ownerId: string, year: string, page: number) => {
  return useQuery({
    queryKey: ['grid-letters', ownerId, year, page],
    queryFn: () => fetchLetters(ownerId, year, page),
    placeholderData: (previousData) => previousData,
  });
};

