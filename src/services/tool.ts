import { toolApiKy } from "@/api/tool";
import { z } from "zod";

const GET_VOICE_MODELS_URL = "api/voice/model?lang=zh";

export const VideoModelResponseSchema = z.object({
  openai: z.array(
    z.object({
      name: z.string(),
      displayName: z.string(),
      gender: z.string(),
      langs: z.array(z.string()),
      sample: z.object({}),
    })
  ),
  azure: z.array(
    z.object({
      name: z.string(),
      displayName: z.string(),
      gender: z.string(),
      locale: z.string(),
      langs: z.array(z.string()),
      sample: z.object({}),
    })
  ),
  minimax: z.array(
    z.object({
      name: z.string(),
      displayName: z.string(),
      gender: z.string(),
      langs: z.array(z.string()),
      sample: z.object({}),
    })
  ),
  doubao: z.array(
    z.object({
      name: z.string(),
      displayName: z.string(),
      gender: z.string(),
      langs: z.array(z.string()),
      sample: z.object({}),
    })
  ),
  fish: z.array(
    z.object({
      name: z.string(),
      displayName: z.string(),
      langs: z.array(z.string()),
      sample: z.object({}),
    })
  ),
});
export type VideoModelResponse = z.infer<typeof VideoModelResponseSchema>;

export async function getVoiceModels(): Promise<VideoModelResponse> {
  return await toolApiKy.get(GET_VOICE_MODELS_URL).json<VideoModelResponse>();
}
