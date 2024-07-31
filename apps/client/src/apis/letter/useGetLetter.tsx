import { useQuery } from '@tanstack/react-query';
import axiosInstance from '#apis/axios.ts';

export const fetchLetter = async (letterId: number) => {
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

