import axios, { AxiosResponse } from "axios";
import { useState } from "react";

interface Subscription {
  id: String;
  tokens: number;
  userId: String;
  amount: number;
  successful: Boolean;
  createdAt: Date;
}

export const useSubscription = () => {
  const [error, setError] = useState<{
    message: string;
    status: number;
  } | null>(null);
  const [pending, setPending] = useState<boolean>(true);
  const [data, setData] = useState<Subscription[] | null>(null);

  const getSubscriptions = async (userId: string) => {
    setData(null);
    setError(null);
    setPending(true);
    try {
      const res: AxiosResponse = await axios.get(
        `/api/fetch/subscription/${userId}`
      );
      setData(res.data);
    } catch (error: any) {
      setError({
        message: error.response.data.message,
        status: error.response.status,
      });
    } finally {
      setPending(false);
    }
  };

  return { pending, error, data, getSubscriptions };
};
