import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

export const generateMessageUsingGoogle = async (
  content: string
): Promise<string> => {
  try {
    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: content,
      config: {
        systemInstruction: `You are a professional speechwriter AI.
                Guidelines:
                - Only return the speech content in clean, readable Markdown format (no metadata, preambles, or explanations).
                - The speech must align with the user's context and respect the target language and word count limit (within ±10%).
                - Ensure the speech is logically structured with an introduction, body, and conclusion.
                - Use a tone that matches the occasion (motivational, formal, emotional, humorous, etc.) based on the prompt.
                - Do not use headings like "Introduction" or "Conclusion" unless the speech is for academic purposes.
                - No placeholders, notes, or template language should be left in the output.

                Output Format: Only the speech, in Markdown format.
        `,
      },
    });
    console.log(response.text);
    return response.text as string;
  } catch (err) {
    console.log(err);
    return "err: speech not generated";
  }
};
