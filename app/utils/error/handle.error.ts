import { AxiosResponse } from "axios";
import { ApiError } from "../api/api.error";

export const promiseWithErrorHandling = async <T = unknown>(
  serviceFunction: () => Promise<T>,
  reject: (value: unknown) => void
) => {
  try {
    return await serviceFunction();
  } catch (error) {
    if (error instanceof ApiError) {
      return reject((error as ApiError).message);
    }
    if (error instanceof Error) {
      return reject(error.message || "An unexpected error occurred");
    }
    return reject("An unexpected error occurred");
  }
};

export const requestWithErrorHandling = async (
  serviceFunction: () => Promise<AxiosResponse>
) => {
  const response = await serviceFunction();

  if (!response.data && !response?.status.toString().startsWith("2")) {
    throw new ApiError(500, "Server returned an unexpected response");
  }

  if (!response?.status.toString().startsWith("2")) {
    throw new ApiError(
      response.status,
      response.data.message ||
        response.statusText ||
        "An unexpected error occurred"
    );
  } else {
    return response.data;
  }
};
