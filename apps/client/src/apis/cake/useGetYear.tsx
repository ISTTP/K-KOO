import axiosInstance from "#apis/axios.ts"
import { getUserYearRes } from "@isttp/schemas/all"
import { useSuspenseQuery } from "@tanstack/react-query";

async function fetchYear() {
  const res = await axiosInstance.get<getUserYearRes>('user/year');
  return res.data;
}

export const useGetYear = () => {
  return useSuspenseQuery({
    queryKey: ['get-year'],
    queryFn: () => fetchYear()
  })
}
