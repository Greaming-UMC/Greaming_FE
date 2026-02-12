import { useQuery } from "@tanstack/react-query";
import { getHome } from "../../../apis/types/home/getHome";

export const useHome = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: getHome,
    staleTime: 1000 * 60 * 5,
  });
};
