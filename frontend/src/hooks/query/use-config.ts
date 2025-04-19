import { useQuery } from "@tanstack/react-query";
import AZM AI from "#/api/open-hands";

export const useConfig = () =>
  useQuery({
    queryKey: ["config"],
    queryFn: AZM AI.getConfig,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
  });
