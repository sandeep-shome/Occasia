import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN!);

export const generateMessageUsingHF = async (
  content: string
): Promise<string> => {
  try {
    const chatCompletion = await client.chatCompletion({
      provider: "novita",
      model: "meta-llama/Llama-3.2-3B-Instruct",
      messages: [
        {
          role: "system",
          content: `You are a professional speechwriter AI.
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
        {
          role: "user",
          content: content,
        },
      ],
    });

    return chatCompletion.choices[0].message.content as string;
  } catch (error) {
    return "err: speech not generated";
  }
};
