import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { ApiError } from "./api.error";


class ApiService {
  private static instance: ApiService;
  private axiosInstance: AxiosInstance;

  private constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
    });
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          throw new ApiError(
            error.response.status,
            (error.response.data as { message?: string }).message ||
              "An error occurred",
            error.response
          );
        } else {
          throw new ApiError(500, error.message);
        }
      }
    );

    this.axiosInstance.interceptors.request.use(
      async (config) => {
        config.headers = config.headers || {};

        const lang = (typeof window !== 'undefined' && localStorage.getItem('i18nextLng')) || 'en';
        config.headers["X-Language"] = lang; 

        config.headers["Accept"] = "application/json";
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      const url = process.env.NEXT_PUBLIC_BASE_URL ?? "";
      ApiService.instance = new ApiService(url);
    }
    return ApiService.instance;
  }

  public get<T>(
    resource: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get(resource, options);
  }

  public post<T>(
    resource: string,
    data: Record<string, unknown> | unknown,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post(resource, data, options);
  }

  public put<T>(
    resource: string,
    data: Record<string, unknown> | unknown,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put(resource, data, options);
  }

  public delete<T>(
    resource: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete(resource, options);
  }
}

export const apiService = ApiService.getInstance();
