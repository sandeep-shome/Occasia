import { SpeechData } from "@/types";
import axios from "axios";
import { useState } from "react";

export const useGenerate = () => {
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function getSpeech(speechId: string) {
    setPending(true);
    try {
      const res = await axios.get(`/api/generation/ai/${speechId}`);
      return res.data as SpeechData;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error: something went wrong!");
      }
    } finally {
      setPending(false);
    }
  }

  return { pending, error, getSpeech };
};
