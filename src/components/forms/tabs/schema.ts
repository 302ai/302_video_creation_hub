import { z } from "zod";

export const videoSchema = z
  .object({
    // 主题
    videoSubject: z.string(),
    // 输出语言
    videoLanguage: z.string(),
    // 文案
    videoScript: z.string(),
    // 关键词
    videoTerms: z.string(),
    // 视频来源
    videoSource: z.string(),
    // 视频拼接模式
    videoConcatMode: z.string(),
    // 视频比例
    videoAspect: z.string(),
    // 每个视频合成片段最大时长（单位：秒）
    videoClipDuration: z.string(),
    // 启动字幕
    subtitleEnabled: z.boolean().default(true),
    // 字幕字体
    subtitleFont: z.string(),
    // 字幕位置
    subtitlePosition: z.string(),
    // 字幕大小
    fontSize: z.number().min(30).max(100).default(60),
    // 描边粗细
    strokeWidth: z.number().min(0).max(10).default(1.5),
    // 字幕颜色
    textForeColor: z.string(),
    // 描边颜色
    strokeColor: z.string(),
    // 语音模型
    modelName: z.string(),
    // 选择音色
    voiceName: z.string(),
    // 朗读音量
    voiceVolume: z.string(),
    // 背景音乐
    bgmType: z.union([z.literal(""), z.string()]),
    // 背景音乐音量
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
