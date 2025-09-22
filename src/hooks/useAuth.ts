import { QueryKeys } from "@constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { forgotPassword, loginRequest } from "api/requests/auth.requests";

// Mutation (login)
export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginRequest(email, password),
  });
};

// Query (profile)
export const useForgotPassword = () => {
  return useQuery({
    queryKey: QueryKeys.ForgotPassword(),
    queryFn: forgotPassword,
  });
};
