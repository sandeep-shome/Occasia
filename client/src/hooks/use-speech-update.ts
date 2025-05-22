import axios from "axios";
import { useState } from "react";

export const useSpeechUpdate = () => {
  const [error, setError] = useState<{
    message: string;
    status: number;
  } | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  async function updateMessage(speechId: string, updatedResult: string) {
    setPending(true);
    setError(null);
    try {
      const res = await axios.put(`/api/speech/update/${speechId}`, {
        message: updatedResult,
      });
      return res;
    } catch (error: any) {
      setError({
        message: error.response.data.message,
        status: error.response.status,
      });
    } finally {
      setPending(false);
    }
  }

  return { updateMessage, pending, error };
};
