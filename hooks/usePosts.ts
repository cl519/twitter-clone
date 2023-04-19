import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const usePosts = (userId?: string, offset?: number, limit?: number) => {
  const url = userId
    ? `/api/posts?userId=${userId}`
    : `/api/posts?offset=${offset}&limit=${limit}`;
  // console.log("URL: ", url, " userId: ", userId);
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
