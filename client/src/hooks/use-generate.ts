import axios, { AxiosResponse } from "axios";
import { useState } from "react";

export const useGenerate = () => {
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<{
    message: string;
    status: number;
  } | null>(null);

  async function getSpeech(speechId: string) {
    setPending(true);
    setError(null);
    try {
      const res = await axios.get(`/api/generation/ai/${speechId}`);
      return res as AxiosResponse;
    } catch (error: any) {
      setError({
        message: error.response.data.message,
        status: error.response.status,
      });
    } finally {
      setPending(false);
    }
  }

  return { pending, error, getSpeech };
};
