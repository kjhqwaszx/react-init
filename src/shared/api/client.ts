import axios, { AxiosError } from "axios";
import { API_ENDPOINT } from "./endpoint";
import { getCookie, setCookie, TIME } from "../lib/utils";
import { apiEnvPath } from "./apiRoute";
import { useButtonDialogStore } from "@/shared/stores";

export const axiosInstance = axios.create({
  timeout: 10000,
  withCredentials: true,
});

export const queryOptions = {
  retry: 1,
  retryDelay: 3000,
};

export const mutationOptions = {
  retry: (failureCount: number, error: AxiosError) => {
    if (failureCount > 0) return false;
    return error.response?.status === 401;
  },
  retryDelay: 3000,
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie("accessToken");

    if (accessToken && !config.url.includes("/refresh-token")) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  // request error!!
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // response success!!
    console.log("$$$ res: ", response.data.data);

    return response?.data;
  },
  // response error!!
  async (error) => {
    const originUrl = error?.config?.url;
    if (error.response && error.response.status === 401 && !originUrl.includes("refresh-token")) {
      // 에러 코드가 401 이고, retry 하지 않은 경우 > reFreshToken 으로 accessToken 갱신
      try {
        const refreshToken = getCookie("refreshToken");

        const result = (await axiosInstance.post(apiEnvPath(API_ENDPOINT.MEMBER.REFRESH_TOKEN.url), {
          refreshToken: refreshToken,
        })) as any;

        if (result?.success) {
          const data = result?.data;
          if (data?.accessToken && data?.refreshToken) {
            setCookie("accessToken", data.accessToken, TIME.MS_EIGHT_MINUTE);
            setCookie("refreshToken", data.refreshToken, TIME.MS_THIRTY_SECOND);
            callNativeSetToken(data.accessToken, data.refreshToken);

            if (error.config) {
              error.config.headers.Authorization = "Bearer" + data.accessToken;
            }

            return await axiosInstance({
              ...error?.config,
              headers: error.config!.headers.toJson(),
            });
          }

          return Promise.reject(error);
        } else {
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // AT 갱신 실패!
        console.error("Token refresh failed: ", refreshError);
        return Promise.reject(refreshError);
      }
    } else if (error.response && error.response.status === 401 && originUrl.includes("refresh-token")) {
      const { setIsOpen } = useButtonDialogStore.getState();
      setIsOpen(true);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
function callNativeSetToken(accessToken: any, refreshToken: any) {
  throw new Error("Function not implemented.");
}
