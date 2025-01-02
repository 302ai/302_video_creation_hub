/**
 * @fileoverview Global constants and configuration values used throughout the application.
 * @author zpl
 * @created 2024-11-20
 */

export const THEME_COOKIE_NAME = "theme";
export const EMPTY_THEME = "light";
export const TRUE_STRING = "true";
export const FALSE_STRING = "false";
export const CHINA_REGION = "0";
export const OUTSIDE_DEPLOY_MODE = "OUTSIDE";
export const INTERNAL_DEPLOY_MODE = "INTERNAL";
export const SHARE_CODE_URL_PARAM = "pwd";
export const SHARE_CODE_STORE_KEY = "share_code";
export const SHARE_CODE_REMEMBER_KEY = "share_code_remember";

export const GLOBAL = {
  /**
   * Internationalization (i18n) configuration settings.
   * @property {Object} LOCALE - Locale-related constants
   * @property {string[]} LOCALE.SUPPORTED - List of supported language codes:
   *   - 'zh': Chinese
   *   - 'en': English
   *   - 'ja': Japanese
   * @property {string} LOCALE.DEFAULT - Default language code (English)
   */
  LOCALE: {
    SUPPORTED: ["zh", "en", "ja"],
    DEFAULT: "en",
  },
  VIDEOLANGUAGE: {
    SUPPORTED: [
      {
        value: "zh",
        label: "video_language_opts_label.zh",
      },
      {
        value: "en",
        label: "video_language_opts_label.en",
      },

      {
        value: "ja",
        label: "video_language_opts_label.ja",
      },
      {
        value: "ko",
        label: "video_language_opts_label.ko",
      },
      {
        value: "de",
        label: "video_language_opts_label.de",
      },
      {
        value: "fr",
        label: "video_language_opts_label.fr",
      },
    ],
    DEFAULT: {
      value: "zh",
      label: "video_language_opts_label.zh",
    },
  },
  VIDEOSOURCE: {
    SUPPORTED: [
      { value: "pexels", label: "Pexels" },
      { value: "pixabay", label: "Pixabay" },
    ],
    DEFAULT: {
      value: "pexels",
      label: "Pexels",
    },
  },
  VIDEOMODE: {
    SUPPORTED: [
      {
        value: "sequential",
        label: "video_mode_opts_label.sequential",
      },
      {
        value: "random",
        label: "video_mode_opts_label.random",
      },
    ],
    DEFAULT: {
      value: "sequential",
      label: "video_mode_opts_label.sequential",
    },
  },
  VIDEOCLIPDURATION: {
    SUPPORTED: ["2", "3", "4", "5", "6"],
    DEFAULT: "3",
  },
  VIDEORATIO: {
    SUPPORTED: [
      {
        value: "16:9",
        label: "video_ratio_opts_label.xigua",
      },
      {
        value: "9:16",
        label: "video_ratio_opts_label.tikTok",
      },
    ],
    DEFAULT: {
      value: "16:9",
      label: "video_ratio_opts_label.xigua",
    },
  },
  SUBTITLEFONT: {
    SUPPORTED: [
      "华文黑体-中等粗细",
      "小赖字体SC-常规体",
      "小赖等宽字体SC-常规体",
      "阿里巴巴普惠体-中等粗细",
      "阿里巴巴普惠体-常规体",
      "思源黑体-中等粗细",
      "思源黑体-常规体",
      "STHeitiLight",
      "STHeitiMedium",
      "UTM Kabel KT",
    ],
    DEFAULT: "华文黑体-中等粗细",
  },
  SUBTITLEPOSITION: {
    SUPPORTED: [
      {
        value: "top",
        label: "subtitle_position_opts_label.top",
      },
      {
        value: "middle",
        label: "subtitle_position_opts_label.middle",
      },
      {
        value: "bottom",
        label: "subtitle_position_opts_label.bottom",
      },
    ],
    DEFAULT: {
      value: "bottom",
      label: "subtitle_position_opts_label.bottom",
    },
  },
  MODELSNAME: {
    // SUPPORTED: ["Azure", "豆包", "Fish Audio", "Minimax", "OpenAI"],
    SUPPORTED: ["Azure"], // 暂时只支持Azure
    DEFAULT: "Azure",
  },
  VOICENAME: {
    SUPPORTED1: [
      "zh-CN-XiaoxiaoMultilingualNeural-V2-Female",
      // "zh-CN-XiaoxiaoNeural-Female",
      // "zh-CN-XiaoyiNeural-Female",
      // "zh-CN-YunjianNeural-Male",
      // "zh-CN-YunxiNeural-Male",
      // "zh-CN-YunxiaNeural-Male",
      // "zh-CN-YunyangNeural-Male",
      // "zh-CN-liaoning-XiaobeiNeural-Female",
      // "zh-CN-shaanxi-XiaoniNeural-Female",
      // "zh-HK-HiuGaaiNeural-Female",
      // "zh-HK-HiuMaanNeural-Female",
      // "zh-HK-WanLungNeural-Male",
      // "zh-TW-HsiaoChenNeural-Female",
      // "zh-TW-HsiaoYuNeural-Female",
      // "zh-TW-YunJheNeural-Male",
      // "en-US-AnaNeural-Female",
      "en-US-AndrewMultilingualNeural-V2-Male",
      // "en-US-AndrewNeural-Male",
      // "en-US-AriaNeural-Female",
      "en-US-AvaMultilingualNeural-V2-Female",
      // "en-US-AvaNeural-Female",
      "en-US-BrianMultilingualNeural-V2-Male",
      // "en-US-BrianNeural-Male",
      // "en-US-ChristopherNeural-Male",
      "en-US-EmmaMultilingualNeural-V2-Female",
      // "en-US-EmmaNeural-Female",
      // "en-US-EricNeural-Male",
      // "en-US-GuyNeural-Male",
      // "en-US-JennyNeural-Female",
      // "en-US-MichelleNeural-Female",
      // "en-US-RogerNeural-Male",
      // "en-US-SteffanNeural-Male",
      // "en-US-AvaMultilingualNeural-V2",
      // "en-US-AndrewMultilingualNeural-V2",
      // "en-US-EmmaMultilingualNeural-V2",
      // "en-US-BrianMultilingualNeural-V2",
      // "de-DE-FlorianMultilingualNeural-V2",
      // "de-DE-SeraphinaMultilingualNeural-V2",
      // "de-DE-AmalaNeural-Female",
      // "de-DE-ConradNeural-Male",
      // "de-DE-FlorianMultilingualNeural-Male",
      "de-DE-FlorianMultilingualNeural-V2-Male",
      // "de-DE-KillianNeural-Male",
      // "de-DE-SeraphinaMultilingualNeural-Female",
      "de-DE-SeraphinaMultilingualNeural-V2-Female",
      // "fr-FR-RemyMultilingualNeural-V2",
      // "fr-FR-VivienneMultilingualNeural-V2",
      // "fr-FR-DeniseNeural-Female",
      // "fr-FR-EloiseNeural-Female",
      // "fr-FR-HenriNeural-Male",
      // "fr-FR-RemyMultilingualNeural-Male",
      "fr-FR-RemyMultilingualNeural-V2-Male",
      // "fr-FR-VivienneMultilingualNeural-Female",
      "fr-FR-VivienneMultilingualNeural-V2-Female",
      // "th-TH-NiwatNeural-Male",
      // "th-TH-PremwadeeNeural-Female",
      // "vi-VN-HoaiMyNeural-Female",
      // "vi-VN-NamMinhNeural-Male",
    ],
    SUPPORTED: [
      {
        label: "zh-CN-XiaoxiaoMultilingualNeural-V2-Female",
        suffix: "speech_voice_opts_suffix.zh-CN-Female",
        value: "zh-CN-XiaoxiaoMultilingualNeural-V2",
        url: "https://file.302.ai/gpt/imgs/20241231/c1c22f73215244ed8eb5dbb2e783cf98.mp3",
      },
      {
        label: "en-US-AndrewMultilingualNeural-V2-Male",
        suffix: "speech_voice_opts_suffix.en-US-Male",
        value: "en-US-AndrewMultilingualNeural-V2",
        url: "https://file.302.ai/gpt/imgs/20241231/0683d02ed71e4825ab21259516bf0854.mp3",
      },
      {
        label: "en-US-AvaMultilingualNeural-V2-Female",
        suffix: "speech_voice_opts_suffix.en-US-Female",
        value: "en-US-AvaMultilingualNeural-V2-Female",
        url: "https://file.302.ai/gpt/imgs/20241231/cb6814b8122a4b6890f704c0d12d7bd8.mp3",
      },
      {
        label: "en-US-BrianMultilingualNeural-V2-Male",
        suffix: "speech_voice_opts_suffix.en-US-Male",
        value: "en-US-BrianMultilingualNeural-V2",
        url: "https://file.302.ai/gpt/imgs/20241231/63151a6ca0c14e0689070d63e5a820d8.mp3",
      },
      {
        label: "en-US-EmmaMultilingualNeural-V2-Female",
        suffix: "speech_voice_opts_suffix.en-US-Female",
        value: "en-US-EmmaMultilingualNeural-V2",
        url: "https://file.302.ai/gpt/imgs/20241231/ff447237e6a24122ba83d3aa899dd2b0.mp3",
      },
      {
        label: "de-DE-FlorianMultilingualNeural-V2-Male",
        suffix: "speech_voice_opts_suffix.de-DE-Male",
        value: "de-DE-FlorianMultilingualNeural-V2",
        url: "https://file.302.ai/gpt/imgs/20241231/de9a98183adf42dd81c3f9697e4e54da.mp3",
      },
      {
        label: "de-DE-SeraphinaMultilingualNeural-V2-Female",
        suffix: "speech_voice_opts_suffix.de-DE-Female",
        value: "de-DE-SeraphinaMultilingualNeural-V2",
        url: "https://file.302.ai/gpt/imgs/20241231/77e48fc0322d4be09b0cb2a1c0a74ad8.mp3",
      },
      {
        label: "fr-FR-RemyMultilingualNeural-V2-Male",
        suffix: "speech_voice_opts_suffix.fr-FR-Male",
        value: "fr-FR-RemyMultilingualNeural-V2",
        url: "https://file.302.ai/gpt/imgs/20241231/db1120038f4441d48e2a775409804998.mp3",
      },
      {
        label: "fr-FR-VivienneMultilingualNeural-V2-Female",
        suffix: "speech_voice_opts_suffix.fr-FR-Female",
        value: "fr-FR-VivienneMultilingualNeural-V2",
        url: "https://file.302.ai/gpt/imgs/20241231/a1cf9401fd8b45679acd6ba393ffa768.mp3",
      },
    ],
    DEFAULT: {
      label: "zh-CN-XiaoxiaoMultilingualNeural-V2-Female",
      suffix: "speech_voice_opts_suffix.zh-CN-Female",
      value: "zh-CN-XiaoxiaoMultilingualNeural-V2",
      url: "https://file.302.ai/gpt/imgs/20241231/c1c22f73215244ed8eb5dbb2e783cf98.mp3",
    },
  },
  BGMTYPE: {
    SUPPORTED: [
      {
        value: "null",
        label: "bgm_type_opts_label.null",
      },
      {
        value: "random",
        label: "bgm_type_opts_label.random",
      },
    ],
    DEFAULT: {
      value: "random",
      label: "bgm_type_opts_label.random",
    },
  },
  VOICEVOLUME: {
    SUPPORTED: [
      {
        value: "0.6",
        label: "60%",
      },
      {
        value: "0.8",
        label: "80%",
      },
      {
        value: "1",
        label: "100%",
      },
      {
        value: "1.5",
        label: "150%",
      },
      {
        value: "2",
        label: "200%",
      },
      {
        value: "3",
        label: "300%",
      },
      {
        value: "4",
        label: "400%",
      },
      {
        value: "5",
        label: "500%",
      },
    ],
    DEFAULT: {
      value: "1",
      label: "100%",
    },
  },
  BGMVOLUME: {
    SUPPORTED: [
      {
        value: "0",
        label: "0%",
      },
      {
        value: "0.2",
        label: "20%",
      },
      {
        value: "0.4",
        label: "40%",
      },
      {
        value: "0.6",
        label: "60%",
      },
      {
        value: "0.8",
        label: "80%",
      },
      {
        value: "1",
        label: "100%",
      },
    ],
    DEFAULT: {
      value: "0.2",
      label: "20%",
    },
  },
};
