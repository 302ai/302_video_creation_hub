/* eslint-disable camelcase */
import { apiKy } from "@/api";
import { VideoSchemaType } from "@/components/forms/tabs/schema";
import { createScopedLogger } from "@/utils";
import { z } from "zod";
import { env } from "@/env";

const logger = createScopedLogger("VideoApi");

/**
 * 生成视频素材文案
 */
const GET_VIDEO_SCRIPT_API = "302/stock-video/api/v1/scripts";

export const VideoScriptResponseSchema = z.object({
  data: z.object({
    video_script: z.string(),
  }),
  message: z.string(),
  status: z.number(),
});
export type VideoScriptResponse = z.infer<typeof VideoScriptResponseSchema>;

/**
 * 生成视频文案
 * @param params 包含视频主题和语言
 * @param params.videoSubject 视频主题
 * @param params.videoLanguage 输出语言
 * @returns 视频文案
 */
export async function generateVideoScript(params: {
  videoSubject: string;
  videoLanguage: string;
}): Promise<VideoScriptResponse> {
  logger.debug("Generating video script:", params);

  return await apiKy
    .post(GET_VIDEO_SCRIPT_API, {
      json: {
        video_subject: params.videoSubject,
        video_language: params.videoLanguage,
        models_name: env.NEXT_PUBLIC_DEFAULT_MODEL_NAME,
      },
    })
    .json<VideoScriptResponse>();
}

/**
 * 生成视频素材搜索词
 */
const GET_VIDEO_TERMS_API = "302/stock-video/api/v1/terms";

export const VideoTermsResponseSchema = z.object({
  data: z.object({
    video_terms: z.array(z.string()),
  }),
  message: z.string(),
  status: z.number(),
});
export type VideoTermsResponse = z.infer<typeof VideoTermsResponseSchema>;

/**
 * 获取视频关键词
 * @param params 包含视频主题、文案和语言
 * @param params.videoSubject 视频主题
 * @param params.videoScript 视频文案
 * @param params.videoLanguage 输出语言
 * @returns 视频关键词
 */
export async function getVideoTerms(params: {
  videoSubject: string;
  videoScript: string;
  videoLanguage: string;
}): Promise<VideoTermsResponse> {
  logger.debug("Getting video terms:", params);

  const {
    videoSubject: video_subject,
    videoScript: video_script,
    videoLanguage: video_language,
  } = params;

  return await apiKy
    .post(GET_VIDEO_TERMS_API, {
      json: {
        video_subject,
        video_script,
        video_language,
        models_name: env.NEXT_PUBLIC_DEFAULT_MODEL_NAME,
      },
    })
    .json<VideoTermsResponse>();
}

/**
 * 创建视频素材生成任务
 */
const CREATE_VIDEO_TASK_API = "302/stock-video/api/v1/videos";

export const CreateVideoTaskResponseSchema = z.object({
  data: z.object({
    task_id: z.string(),
  }),
  message: z.string(),
  status: z.number(),
});
export type CreateVideoTaskResponse = z.infer<
  typeof CreateVideoTaskResponseSchema
>;

/**
 * 创建视频素材生成任务
 * @param params 包含视频主题、文案、关键词、视频源、视频拼接模式、视频分辨率、视频时长、字幕、字幕字体、字幕位置、字体大小、描边粗细、字幕颜色、描边颜色、语音模型、音色、朗读音量、背景音乐、背景音乐音量
 * @returns 视频素材生成任务
 */
export async function createVideoTask(
  params: Omit<VideoSchemaType, "videoLanguage">
): Promise<CreateVideoTaskResponse> {
  logger.debug("Creating video task:", params);

  const {
    videoSubject: video_subject,
    videoScript: video_script,
    videoTerms: video_terms,
    videoSource: video_source,
    videoConcatMode: video_concat_mode,
    videoAspect: video_aspect,
    videoClipDuration: video_clip_duration,
    subtitleEnabled: subtitle_enabled,
    subtitleFont: subtitle_font,
    subtitlePosition: subtitle_position,
    fontSize: font_size,
    strokeWidth: stroke_width,
    textForeColor: text_fore_color,
    strokeColor: stroke_color,
    modelName: models_name,
    voiceName: voice_name,
    voiceVolume: voice_volume,
    bgmType: bgm_type,
    bgmVolume: bgm_volume,
  } = params;

  return await apiKy
    .post(CREATE_VIDEO_TASK_API, {
      json: {
        video_subject,
        video_script,
        video_terms,
        video_source,
        video_concat_mode,
        video_aspect,
        video_clip_duration,
        subtitle_enabled,
        subtitle_font,
        subtitle_position,
        font_size,
        stroke_width,
        text_fore_color,
        stroke_color,
        models_name,
        voice_name,
        voice_volume,
        bgm_type: bgm_type === "null" ? "" : bgm_type,
        bgm_volume,
      },
    })
    .json<CreateVideoTaskResponse>();
}

/**
 * 轮询获取视频素材生成任务状态
 */
const GET_VIDEO_TASK_STATUS_API = "302/stock-video/api/v1/tasks/";

export const TaskStatusSchema = z.object({
  "302_combined_videos": z.array(z.string()).optional(),
  "302_videos": z.array(z.string()).optional(),
  audio_duration: z.number().optional(),
  progress: z.number(),
  state: z.number(),
});
export type TaskStatusType = z.infer<typeof TaskStatusSchema>;

export const VideoTaskStatusResponseSchema = z.object({
  data: z.record(
    z.object({
      "302_combined_videos": z.array(z.string()).optional(),
      "302_videos": z.array(z.string()).optional(),
      audio_duration: z.number().optional(),
      progress: z.number(),
      state: z.number(),
    }) as z.ZodType<TaskStatusType>
  ),
  message: z.string(),
  status: z.number(),
});
export type VideoTaskStatusResponse = z.infer<
  typeof VideoTaskStatusResponseSchema
>;

export async function getVideoTaskStatus(
  task_id?: string
): Promise<TaskStatusType> {
  logger.debug("Querying video task status:", task_id);

  return await apiKy
    .get(GET_VIDEO_TASK_STATUS_API + task_id)
    .json<VideoTaskStatusResponse>()
    .then((res) => res.data[task_id!]);
}
