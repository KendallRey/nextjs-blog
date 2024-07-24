import { ApiErrorSchema } from "@/model/api";
import { formatToLabel } from "@/components/helper/component";

/**
 * Formatting Redux Throw errors response.
 * @param error Error object from try catch block
 */
export const getApiError = (error: unknown) => {
  const errorResponseValidation = ApiErrorSchema.safeParse(error);
  const errorData = errorResponseValidation.data;

  const apiMessage = errorData?.error || {};
  let errors = {} as Record<string, any>;

  Object.keys(errorData?.error || {}).forEach((key) => {
    const err = apiMessage[key];
    if (typeof err === "object" && "detail" in err) {
      errors = {
        ...errors,
        [key]: formatToLabel(String(err["detail"])),
      };
      return;
    }
    if (!Array.isArray(err)) return;
    if (!err.length) return;
    errors = {
      ...errors,
      [key]: err[0],
    };
  });

  const keys = Object.keys(errorData?.error || {});

  return {
    code: errorData?.status || 400,
    message: errorData?.message || "Something went wrong",
    detail: errors?.detail || errorData?.detail || "Something went wrong",
    hint: errorData?.hint,
    error: errors,
    errors: Object.values(errors).join(", "),
    keys,
    key: !keys.length ? null : keys[0],
  };
};

/**
 * Formatting Axios Throw errors response.
 * @param error Error object from try catch block
 */
export const getAxiosApiError = (error: any) => {
  const apiError = ApiErrorSchema.safeParse(error.response?.data);
  const errorData = apiError.data;

  return {
    code: errorData?.status || 400,
    message: errorData?.message || "Something went wrong",
    detail: errorData?.detail || "Something went wrong",
    hint: errorData?.hint,
  };
};
