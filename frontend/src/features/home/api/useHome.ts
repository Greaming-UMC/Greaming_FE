import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHome } from "../../../apis/types/home/getHome";
import { useUIStore } from "../../../stores/useUIStore";

export const useHome = () => {
  const setHomeHeader = useUIStore((state) => state.setHomeHeader);
  const query = useQuery({
    queryKey: ["home"],
    queryFn: getHome,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!query.data) return;
    setHomeHeader(query.data);
  }, [query.data, setHomeHeader]);

  return query;
};
