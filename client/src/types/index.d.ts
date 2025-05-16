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
