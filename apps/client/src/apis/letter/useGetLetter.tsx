import { useQuery } from '@tanstack/react-query';
import axiosInstance from '#apis/axios.ts';

async function fetchLetter(letterId: number) {
  const res = await axiosInstance.get(`/letter/${letterId}?requirement=true`);
  return res.data;
};

export const useGetLetter = (letterId: number) => {
  return useQuery({
    queryKey: ['letter', letterId],
    queryFn: () => fetchLetter(letterId),
    enabled: !!letterId,
    staleTime: 0,
  });
}

async function fetchAllLetter(letterId: number) {
  const res = await axiosInstance.get(`/letter/${letterId}?requirement=false`);
  return res.data;
};

export const useGetAllLetter = (letterId: number) => {
  return useQuery({
    queryKey: ['letter', letterId],
    queryFn: () => fetchAllLetter(letterId),
    enabled: !!letterId
  });
}

