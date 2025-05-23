import axios from "axios";
import { useState } from "react";

export const useSpeechDelete = () => {
  const [error, setError] = useState<{
    message: string;
    status: number;
  } | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  async function deleteMessage(
    speechId: string,
    userId: string,
    updatedResult: string
  ) {
    setPending(true);
    setError(null);
    try {
      const res = await axios.delete(
        `/api/speech/delete/${userId}/${speechId}`
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
  }

  return { deleteMessage, pending, error };
};
