import OpenAI from "openai";

function getClientConfig() {
  const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "API key is not set. Please add OPENAI_API_KEY or GROQ_API_KEY to your .env.local file."
    );
  }

  const isGroq = apiKey.startsWith("gsk_");

  const client = new OpenAI({
    apiKey,
    baseURL: isGroq ? "https://api.groq.com/openai/v1" : undefined,
  });

  const model = isGroq ? "openai/gpt-oss-120b" : "gpt-4o-mini";

  return { client, model };
}

export async function callLLM(prompt: string): Promise<any> {
  const { client, model } = getClientConfig();

  const response = await client.chat.completions.create({
    model,
    response_format: { type: "json_object" },
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content:
          "You are an expert brand strategy AI. You must return ONLY raw, valid JSON matching the requested schema. No conversational filler.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  let content = response.choices[0].message.content;
  if (!content) throw new Error("No response received from AI model");

  content = content.trim();
  // Strip any accidental markdown fences ```json ... ```
  if (content.startsWith("```json")) {
    content = content.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (content.startsWith("```")) {
    content = content.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  try {
    return JSON.parse(content);
  } catch (err: any) {
    console.error("Failed to parse JSON response:", content);
    throw new Error(`Model returned invalid JSON: ${err.message}`);
  }
}
