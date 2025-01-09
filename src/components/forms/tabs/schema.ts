import { z } from "zod";

export const videoSchema = z
  .object({
    videoSubject: z.string(),
    videoLanguage: z.string(),
    videoScript: z.string(),
    videoTerms: z.string(),
    videoSource: z.string(),
    videoConcatMode: z.string(),
    videoAspect: z.string(),
    videoClipDuration: z.string(),
    subtitleEnabled: z.boolean().default(true),
    subtitleFont: z.string(),
    subtitlePosition: z.string(),
    fontSize: z.number().min(30).max(100).default(60),
    strokeWidth: z.number().min(0).max(10).default(1.5),
    textForeColor: z.string(),
    strokeColor: z.string(),
    voiceType: z.string(),
    voiceName: z.string(),
    voiceVolume: z.string(),
    bgmType: z.union([z.literal(""), z.string()]),
    bgmVolume: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.videoSubject || !data.videoSubject.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Video subject is required",
        path: ["videoSubject"],
      });
    }
    if (!data.videoScript || !data.videoScript.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Video script is required",
        path: ["videoScript"],
      });
    }
    if (!data.videoTerms || !data.videoTerms.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Keywords is required",
        path: ["videoTerms"],
      });
    }
  });
export type VideoSchemaType = z.infer<typeof videoSchema>;
