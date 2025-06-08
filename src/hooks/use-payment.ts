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

export const usePayment = () => {
  const [error, setError] = useState<{
    message: string;
    status: number;
  } | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [data, setData] = useState<{
    message: string;
    tokens: number;
    subscriptionData: Subscription;
  } | null>(null);

  const payment = async (tokens: number = 0, userId: string) => {
    setError(null);
    setPending(true);
    setData(null);
    try {
      const res: AxiosResponse = await axios.post(
        "/api/payment/create-payment",
        {
          tokens,
        }
      );
      const order = await res.data;
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Occasia",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            const res: AxiosResponse = await axios.post(
              "/api/payment/verify-payment",
              {
                ...response,
                tokens,
                userId,
              }
            );
            if (res.statusText === "OK") {
              setData(res.data);
            }
          } catch (err: any) {
            console.log(err);
            setError({
              message: err?.response?.data?.message || "Unknown error occurred",
              status: err?.response?.status || 500,
            });
          }
        },
        theme: {
          color: "#6366F1",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.log(err);
      setError({
        message: err?.response?.data?.message || "Unknown error occurred",
        status: err?.response?.status || 500,
      });
    } finally {
      setPending(false);
    }
  };

  return { pending, error, data, payment };
};
