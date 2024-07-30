import { DATE } from "@/components/constants/config";
import { IMethod, METHOD } from "@/components/constants/method";
import { REDUX } from "@/redux/constant/slice";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import moment from "moment";
import { SafeParseError } from "zod";

type IData = Record<string, unknown>;

export const transformData = (data: IData, method: IMethod): Partial<unknown> => {
  let infoData: IData = {};

  switch (method) {
    case METHOD.POST:
      infoData = {
        ...infoData,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        deleted_at: null,
        archived: false,
      };
      break;
    case METHOD.PUT:
      infoData = {
        updated_at: serverTimestamp(),
      };
      break;
    case METHOD.DELETE:
      infoData = {
        deleted_at: serverTimestamp(),
        archived: true,
      };
      break;
  }

  const { [REDUX.FIELD.KEY]: lastKey, ...cleanData } = data;

  return {
    ...cleanData,
    ...infoData,
  };
};

export const parseData = <T = any>(data: IData) => {
  const infoData = {
    created_at: Boolean(data.created_at) ? timestampToDate(data.created_at) : null,
    updated_at: Boolean(data.updated_at) ? timestampToDate(data.updated_at) : null,
    deleted_at: Boolean(data.deleted_at) ? timestampToDate(data.deleted_at) : null,
  };
  return {
    ...data,
    ...infoData,
  } as T;
};

export const getCleanFormData = (data: IData) => {
  const { created_at, updated_at, deleted_at, archived, ...cleanData } = data;
  return cleanData;
};

export const timestampToDate = (data: unknown) => {
  if (data instanceof Timestamp) return moment(data.toDate()).format(DATE.FORMAT.FULL);
  return null;
};

export const getValidationErrors = <T>(result: SafeParseError<T>) => {
  const newErrors: Partial<Record<string, string>> = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      issue.path.forEach((path) => (newErrors[path] = issue.message));
    });
  }
  return newErrors;
};
