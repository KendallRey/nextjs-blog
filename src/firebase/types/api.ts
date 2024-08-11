type IApiSuccessResponse<T = any> = {
  data: T;
  status: "success";
};

type IApiFailedResponse<T = any> = {
  error: T;
  status: "failed";
  message: string;
};

type IApiResponse<T = any> = IApiSuccessResponse<T> | IApiFailedResponse<T>;
