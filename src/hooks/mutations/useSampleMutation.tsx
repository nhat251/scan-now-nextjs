import useMutation from "@/hooks/useMutation";
import { axiosBasic } from "@/services/axiosBasic";

type sampleRequest = {
  id: string;
};

export const sampleMutation = async (req: sampleRequest): Promise<void> => {
  await axiosBasic.post("/api/contact", req, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const useSampleMutation = () => {
  return useMutation<sampleRequest, Promise<void>>({
    mutationFn: sampleMutation,
  });
};
