/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

import { closeLoading, showLoading, showNotify } from "@/stores/global";
import type { TypeFunction, TypeFunctionPromise } from "@/types/commons";
import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery as useReactQuery } from "@tanstack/react-query";

type UseQueryProps = {
  queryKey: string[];
  queryFn: TypeFunctionPromise;
  notifySuccess?: any;
  notifyError?: any;
  hasLoading?: boolean;
  onSuccess?: TypeFunction;
  onError?: TypeFunction;
  enabled?: boolean;
} & UseQueryOptions<any, any, any, any>;

const useQuery = <Request, Response>({
  queryKey,
  queryFn,
  notifySuccess,
  notifyError,
  hasLoading,
  onSuccess: handleSuccess,
  onError: handleError,
  ...options
}: UseQueryProps) => {
  const onSuccessRef = useRef(handleSuccess);
  const onErrorsRef = useRef(handleError);
  useEffect(() => {
    onSuccessRef.current = handleSuccess;
    onErrorsRef.current = handleError;
  });

  const queryInfo = useReactQuery<Request, Error, Response, any>({
    ...options,
    queryKey,
    queryFn,
  });

  useEffect(() => {
    if (hasLoading) {
      if (queryInfo.isLoading) {
        showLoading();
      }
      if (queryInfo.isSuccess || queryInfo.isError) {
        closeLoading();
      }
    }
  }, [queryInfo.isLoading, queryInfo.isSuccess, queryInfo.isError, hasLoading]);

  useEffect(() => {
    if (queryInfo.isSuccess) {
      if (notifySuccess) {
        showNotify({
          type: "success",
          message: notifySuccess?.message,
          duration: notifySuccess?.duration,
        });
      }
      if (onSuccessRef.current) {
        onSuccessRef.current(queryInfo.data);
      }
    }
    if (queryInfo.isError) {
      if (notifyError) {
        showNotify({
          type: "error",
          message: notifyError?.message,
          duration: notifyError?.duration,
        });
      }
      if (onErrorsRef.current) {
        onErrorsRef.current(queryInfo.error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryInfo.isSuccess, queryInfo.isError, notifySuccess, notifyError]);

  return queryInfo;
};

// eslint-disable-next-line import/no-default-export
export default useQuery;
