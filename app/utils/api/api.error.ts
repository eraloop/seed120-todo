import { AxiosResponse } from "axios";

export class ApiError extends Error {
  public statusCode: number;
  public response?: AxiosResponse;
  constructor(statusCode: number, message: string, response?: AxiosResponse) {
    super(message);
    this.name = "ApiError";
    this.message = message;
    this.statusCode = statusCode;
    this.response = response;
  }
}