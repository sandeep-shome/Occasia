export interface ISpeechGenerateIdPayload extends GenerationPayload {
  userId: string;
}
export interface GenerationPayload {
  name: string;
  generalPrompt: string;
  internalPrompt: string;
  duration: number;
  lang: string;
}
