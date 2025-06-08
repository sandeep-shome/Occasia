import axios, { AxiosResponse } from "axios";
import { useState } from "react";

export const useSubscription = () => {
  const [error, setError] = useState<{
    message: string;
    status: number;
  } | null>(null);
  const [pending, setPending] = useState<boolean>(true);

  const getSubscriptions = async (userId: string) => {
    setError(null);
    setPending(true);
    try {
      const res: AxiosResponse = await axios.get(
        `/api/fetch/subscription/${userId}`
      );
      return res;
    } catch (error: any) {
      setError({
        message: error.response.data.message,
        status: error.response.status,
      });
    } finally {
      setPending(false);
    }
  };

  return { pending, error, getSubscriptions };
};
