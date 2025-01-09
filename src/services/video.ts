/* eslint-disable camelcase */
import { apiKy } from "@/api";
import { VideoSchemaType } from "@/components/forms/tabs/schema";
import { createScopedLogger } from "@/utils";
import { z } from "zod";
import { env } from "@/env";

const logger = createScopedLogger("VideoApi");

/**
 * generate video script
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
 * generate video script
 * @param params
 * @param params.videoSubject video subject
 * @param params.videoLanguage output language
 * @returns video script
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
 * generate video terms
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
 * get video terms
 * @param params
 * @param params.videoSubject video subject
 * @param params.videoScript video script
 * @param params.videoLanguage output language
 * @returns video terms
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
 * create video task
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
 * create video task
 * @param params
 * @param params.videoSubject video subject
 * @param params.videoScript video script
 * @param params.videoTerms video terms
 * @param params.videoSource video source
 * @param params.videoConcatMode video concat mode
 * @param params.videoAspect video aspect
 * @param params.videoClipDuration video clip duration
 * @param params.subtitleEnabled subtitle enabled
 * @param params.subtitleFont subtitle font
 * @param params.subtitlePosition subtitle position
 * @param params.fontSize font size
 * @param params.strokeWidth stroke width
 * @param params.textForeColor text fore color
 * @param params.strokeColor stroke color
 * @param params.modelName model name
 * @param params.voiceName voice name
 * @param params.voiceVolume voice volume
 * @param params.bgmType bgm type
 * @param params.bgmVolume bgm volume
 * @returns video task
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
    voiceType: voice_type,
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
        voice_type,
        voice_name,
        voice_volume,
        bgm_type: bgm_type === "null" ? "" : bgm_type,
        bgm_volume,
      },
    })
    .json<CreateVideoTaskResponse>();
}

/**
 * poll video task status
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
