import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useNotifications = (userId?: string) => {
  const url = userId ? `/api/notifications/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  // console.log("before useNotifications return: ", Date.now());
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useNotifications;
