import client from "api/client";
import { SuccessResponse } from "api/types";

export const loginRequest = async (email: string, password: string) => {
  const { data } = await client.post<SuccessResponse<any>>("/auth/login", {
    email,
    password,
  });
  return data;
};

export const forgotPassword = async () => {
  const { data } = await client.get<SuccessResponse<any>>(
    "/auth/forgot-password"
  );
  return data;
};
