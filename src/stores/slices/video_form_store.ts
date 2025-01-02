import { VideoSchemaType } from "@/components/forms/tabs/schema";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export const initialVideoForm: VideoSchemaType = {
  videoSubject: "",
  videoLanguage: "",
  videoScript: "",
  videoTerms: "",
  videoSource: "pexels",
  videoConcatMode: "sequential",
  videoAspect: "16:9",
  videoClipDuration: "3",
  subtitleEnabled: true,
  subtitleFont: "华文黑体-中等粗细",
  subtitlePosition: "bottom",
  fontSize: 60,
  strokeWidth: 1.5,
  textForeColor: "#ffffff",
  strokeColor: "#000000",
  modelName: "Azure",
  voiceName: "zh-CN-XiaoxiaoMultilingualNeural-V2",
  voiceVolume: "1",
  bgmType: "random",
  bgmVolume: "0.2",
};

export const videoFormAtom = atomWithStorage<VideoSchemaType>(
  "video_form",
  initialVideoForm,
  createJSONStorage(() =>
    typeof window !== "undefined"
      ? localStorage
      : {
          getItem: () => null,
          setItem: () => null,
          removeItem: () => null,
        }
  ),
  {
    getOnInit: true,
  }
);
