import { QUERY_KEY } from "@/constants/queryKeys";
import useQuery from "@/hooks/useQuery";
import { axiosBasic } from "@/services/axiosBasic";

type Request = {
  id: string;
};

type Response = {
  name: string;
};

const getUserChallenges = async () => {
  return await axiosBasic.get("/route");
};

export const useSampleQuery = () => {
  return useQuery<Request, Response>({
    queryKey: [QUERY_KEY.SAMPLE],
    queryFn: () => getUserChallenges(),
    select: (res) => res.data,
  });
};
