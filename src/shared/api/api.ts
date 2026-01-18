import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance, mutationOptions } from "./client";
import { apiEnvPath } from "@/shared/api/apiRoute";
import type { ApiMutateOptions } from '@/shared/model/api.ts'

/**
 * @param {ApiMutateOptions} api apiPath.ts에 미리 선언 후 호출
 * @param {ApiMutateOptions} params object 타입 : query parameter 추가
 * @param {ApiMutateOptions} data obejct 타입 : request body 추가
 */
export const useApiMutation = () => {
  return useMutation({
    mutationFn: ({ api, params, data, isApiRoute = false }: ApiMutateOptions) => {
      return axiosInstance({
        url: isApiRoute ? api.url.replace("/exp", "/exc").concat("/") : apiEnvPath(api.url),
        method: api.method,
        params: params, // query parameter
        data: data, // request body
        ...mutationOptions,
      });
    },
  });
};

/**
 * @param {ApiQueryOptions} queryKey string[] 타입 : 쿼리 키
 * @param {ApiQueryOptions} api Api 타입 : apiPath.ts에 미리 선언 후 호출
 * @param {ApiQueryOptions} params obejct 타입 : query parameter 추가
 * @param {ApiQueryOptions} options obejct 타입 : useQuery 옵션 추가
 */
export const useApiQuery = ({ queryKey, api, params, options, isApiRoute = false }: ApiQueryOptions): any => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => {
      return axiosInstance.get(isApiRoute ? api.url.replace("/exp", "/exc").concat("/") : apiEnvPath(api.url), {
        params: params,
      });
    },
    retry: (failureCount, error: any) => {
      // 400에러는 바로 실패, 500번대 에러는 최대 2번 재시도
      if (error?.status >= 400 && error?.status < 500) return false;
      return failureCount < 2;
    },
    ...queryOptions,
    ...options,
  });
};
