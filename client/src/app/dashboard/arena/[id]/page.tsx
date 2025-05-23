"use client";

import MessageCard from "@/components/message-card";
import MessageError from "@/components/message-error";
import MessageSkeleton from "@/components/message-skeleton";
import { useGenerate } from "@/hooks/use-generate";
import { deductToken } from "@/store/features/token-slice";
import { useAppDispatch } from "@/store/store";
import { AxiosResponse } from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function page() {
  const params = useParams<{ id: string }>();
  const {
    pending,
    error,
    generateSpeech,
    retryToGenerateSpeech,
    regenerateSpeech,
  } = useGenerate();
  const dispatch = useAppDispatch();

  const [speechData, setSpeechData] = useState<AxiosResponse | null>();

  const handleGenerateSpeech = async () => {
    const data = await generateSpeech(params.id);
    setSpeechData(data);
  };

  const handleRetryToGenerateSpeech = async () => {
    const data = await retryToGenerateSpeech(params.id);
    setSpeechData(data);
  };

  const handleRegenerateSpeech = async (
    suggestions: string,
    lang: string,
    duration: number,
    currentMessage: string
  ) => {
    if (speechData != null) {
      const data = await regenerateSpeech(
        params.id,
        currentMessage,
        lang,
        duration,
        suggestions
      );
      setSpeechData(data);
    } else {
      toast.error("Method can't be called!");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (speechData) {
      if (speechData.status === 201) dispatch(deductToken());
    }
  }, [speechData]);

  useEffect(() => {
    handleGenerateSpeech();
  }, []);

  return (
    <>
      <section className="w-full flex items-center justify-center">
        {pending ? (
          <MessageSkeleton />
        ) : error != null ? (
          <MessageError retryHandler={handleRetryToGenerateSpeech} />
        ) : (
          <MessageCard speechData={speechData?.data} />
        )}
      </section>
    </>
  );
}

export default page;
