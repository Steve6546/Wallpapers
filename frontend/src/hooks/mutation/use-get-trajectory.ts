import { useMutation } from "@tanstack/react-query";
import AZM AI from "#/api/open-hands";

export const useGetTrajectory = () =>
  useMutation({
    mutationFn: (cid: string) => AZM AI.getTrajectory(cid),
  });
