import { useState } from "react";
import axios from "axios";
import { ISpeechGenerateIdPayload } from "@/types";

export const useGenerateSpeechId = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  async function generateId(payload: ISpeechGenerateIdPayload) {
    setPending(true);
    try {
      const data = await axios.post(
        "http://localhost:3000/api/generation/create",
        payload
      );
      process.env.NODE_ENV === "development" && console.log(data);
      setPending(false);
    } catch (error) {
      setPending(false);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong!");
      }
    }
  }

  return { generateId, error, pending };
};
