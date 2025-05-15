export interface ISpeechGenerateIdPayload {
  userId: string;
  name: string;
  generalPrompt: string;
  internalPrompt: string;
  duration: number;
  lang: string;
}
