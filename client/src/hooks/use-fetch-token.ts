import axios from "axios";
import { useState } from "react";

export const useFetchTokens = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  const getTokens = async () => {
    try {
      const res = await axios.get("");
      return res.data as { token: string };
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      }
      setError("Error: Something went wrong!");
    } finally {
      setPending(false);
    }
  };

  return { pending, error, getTokens };
};
