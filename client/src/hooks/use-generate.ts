import axios, { AxiosResponse } from "axios";
import { useState } from "react";

export const useGenerate = () => {
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<{
    message: string;
    status: number;
  } | null>(null);

  async function generateSpeech(speechId: string) {
    setPending(true);
    setError(null);
    try {
      const res = await axios.get(`/api/speech/generate/${speechId}`);
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

  async function retryToGenerateSpeech(speechId: string) {
    setPending(true);
    setError(null);
    try {
      const res = await axios.get(`/api/speech/retry/${speechId}`);
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

  async function regenerateSpeech(
    speechId: string,
    currentSpeech: string,
    lang: string,
    duration: number,
    suggestions: string
  ) {
    setPending(true);
    setError(null);
    try {
      const res = await axios.put(`/api/speech/re-generate/${speechId}`, {
        result: currentSpeech,
        suggestions,
        duration,
        lang,
      });
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

  return {
    pending,
    error,
    generateSpeech,
    retryToGenerateSpeech,
    regenerateSpeech,
  };
};
