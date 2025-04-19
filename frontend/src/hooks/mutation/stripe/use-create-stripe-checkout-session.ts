import { useMutation } from "@tanstack/react-query";
import AZM AI from "#/api/open-hands";

export const useCreateStripeCheckoutSession = () =>
  useMutation({
    mutationFn: async (variables: { amount: number }) => {
      const redirectUrl = await AZM AI.createCheckoutSession(
        variables.amount,
      );
      window.location.href = redirectUrl;
    },
  });
