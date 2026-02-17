/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEFAULT_TOAST_MESSAGES } from "@/data/toastMessages";
import { closeLoading, showLoading, showNotify } from "@/stores/global";
import type { TypeFunction, TypeFunctionPromise } from "@/types/commons";
import { useMutation as useReactMutation } from "@tanstack/react-query";

export type UseMutationProps = {
  mutationFn: TypeFunctionPromise;
  hasLoading?: boolean;
  onSuccess?: TypeFunction;
  onError?: TypeFunction;
  options?: any;
};

const useMutation = <Request, Response>({
  mutationFn,
  options,
  hasLoading = false,
  onSuccess: handleSuccess,
  onError: handleError,
}: UseMutationProps) => {
  const mutationInfo = useReactMutation<Response, Error, Request>({
    mutationFn,
    ...options,
    onMutate: () => {
      if (hasLoading) {
        showLoading();
      }
    },
    onSuccess: (data) => {
      handleSuccess?.(data);
    },
    onError: (error) => {
      if (handleError) {
        handleError(error);
        return;
      }

      showNotify({
        type: "error",
        message: DEFAULT_TOAST_MESSAGES.errorMessage,
      });
    },

    onSettled: () => {
      if (hasLoading) {
        closeLoading();
      }
    },
  });

  return mutationInfo;
};

// eslint-disable-next-line import/no-default-export
export default useMutation;
