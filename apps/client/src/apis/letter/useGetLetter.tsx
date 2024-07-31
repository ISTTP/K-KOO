import { useQuery } from '@tanstack/react-query';
import axiosInstance from '#apis/axios.ts';

async function fetchLetter(letterId: number) {
  const res = await axiosInstance.get(`/letter/${letterId}`);
  return res.data;
};

export const useGetLetter = (letterId: number) => {
  return useQuery({
    queryKey: ['letter', letterId],
    queryFn: () => fetchLetter(letterId),
    enabled: !!letterId
  });
}

