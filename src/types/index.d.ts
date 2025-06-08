export interface ISpeechGenerateIdPayload extends GenerationPayload {
  userId: string;
  name: string;
}
export interface GenerationPayload {
  generalPrompt: string;
  internalPrompt: string;
  duration: number;
  lang: string;
}

export interface SpeechData {
  id: string;
  userId: string;
  name: string;
  liked: boolean;
  disliked: boolean;
  regenerationCount: number;
  duration: number;
  generalPrompt: string;
  internalPrompt: string;
  result: string;
  lang: string;
  isFailed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
