export type SuccessResponse<T> = {
  status: "success";
  data: T;
};

export type ErrorResponse = {
  status: "error";
  message: string;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
