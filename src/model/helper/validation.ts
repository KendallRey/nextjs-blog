import { SafeParseError } from "zod";

/**
 * Extracts validation error messages from a SafeParseError and maps them to their corresponding paths.
 *
 * @typeParam T - The type of the parsed data.
 * @param result - The SafeParseError object containing validation issues.
 * @returns An object where keys are paths of the errors and values are the corresponding error messages.
 */
export const getValidationErrors = <T>(result: SafeParseError<T>): Partial<Record<string, string>> => {
  const newErrors: Partial<Record<string, string>> = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      issue.path.forEach((path) => (newErrors[path] = issue.message));
    });
  }
  return newErrors;
};