"use client";

import FormGenerator from "@/components/common/form-generator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GLOBAL } from "@/constants";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { UseVideoFormReturn } from "@/hooks/forms/use-video-form";
// import { createScopedLogger } from "@/utils";
import AudioPlayer, {
  AudioPlayerRef,
} from "@/components/business/audio-player";
import ColorPickerButton from "@/components/business/color-picker-button";

interface AdvancedTabProps {
  videoForm: UseVideoFormReturn;
}

// const logger = createScopedLogger("AdvancedTabForm");
const TAB_TRIGGER_CLASSNAME =
  "data-[state=active]:text-[rgba(142,71,240,1)] data-[state=active]:shadow-none";

export default function AdvancedTabForm({ videoForm }: AdvancedTabProps) {
  const t = useTranslations("advancedTab.form");

  const { register, errors, watch, setValue } = videoForm;

  const selectedVoice = watch("voiceName");
  const audioPlayerRef = useRef<AudioPlayerRef | null>(null);
  useEffect(() => {
    audioPlayerRef.current?.stopAudio();
  }, [selectedVoice]);

  const textColor = watch("textForeColor");
  const strokeColor = watch("strokeColor");

  useEffect(() => {
    register("textForeColor");
    register("strokeColor");
  }, [register]);

  return (
    <form className="flex h-full w-full flex-col items-center gap-6">
      <div className="w-full">
        <Tabs defaultValue="videoSetting" className="w-full flex-1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="videoSetting" className={TAB_TRIGGER_CLASSNAME}>
              {t("video_setting")}
            </TabsTrigger>
            <TabsTrigger
              value="subtitleSetting"
              className={TAB_TRIGGER_CLASSNAME}
            >
              {t("subtitle_setting")}
            </TabsTrigger>
            <TabsTrigger
              value="speechSetting"
              className={TAB_TRIGGER_CLASSNAME}
            >
              {t("speech_setting")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="videoSetting" className="mt-4 animate-tab-left">
            <div className="flex flex-col gap-4">
              {/* 视频来源 */}
              <FormGenerator
                id="video-source"
                name="videoSource"
                inputType="select"
                options={GLOBAL.VIDEOSOURCE.SUPPORTED.map((item) => ({
                  value: item.value,
                  label: item.label,
                  id: item.value,
                }))}
                label={t("video_source_label")}
                defaultValue={GLOBAL.VIDEOSOURCE.DEFAULT.value}
                placeholder={GLOBAL.VIDEOSOURCE.DEFAULT.label}
                watch={watch}
                register={register}
                setValue={setValue}
                errors={errors}
              />

              {/* 视频拼接模式 */}
              <FormGenerator
                id="video-concat-mode"
                name="videoConcatMode"
                inputType="select"
                options={GLOBAL.VIDEOMODE.SUPPORTED.map((item) => ({
                  value: item.value,
                  label: t(item.label),
                  id: item.value,
                }))}
                label={t("video_mode_label")}
                defaultValue={GLOBAL.VIDEOMODE.DEFAULT.value}
                placeholder={t(GLOBAL.VIDEOMODE.DEFAULT.label)}
                watch={watch}
                register={register}
                setValue={setValue}
                errors={errors}
              />

              {/* 视频比例 */}
              <FormGenerator
                id="video-aspect"
                name="videoAspect"
                inputType="select"
                options={GLOBAL.VIDEORATIO.SUPPORTED.map((item) => ({
                  value: item.value,
                  label: t(item.label),
                  id: item.value,
                }))}
                label={t("video_ratio_label")}
                defaultValue={GLOBAL.VIDEORATIO.DEFAULT.value}
                placeholder={t(GLOBAL.VIDEORATIO.DEFAULT.label)}
                watch={watch}
                register={register}
                setValue={setValue}
                errors={errors}
              />

              {/* 每个视频合成片段最大时长（单位：秒） */}
              <FormGenerator
                id="video-clip-duration"
                name="videoClipDuration"
                inputType="select"
                options={GLOBAL.VIDEOCLIPDURATION.SUPPORTED.map((item) => ({
                  value: item,
                  label: item,
                  id: item,
                }))}
                label={t("video_duration_label")}
                defaultValue={GLOBAL.VIDEOCLIPDURATION.DEFAULT}
                placeholder={GLOBAL.VIDEOCLIPDURATION.DEFAULT}
                watch={watch}
                register={register}
                setValue={setValue}
                errors={errors}
              />
            </div>
          </TabsContent>
          <TabsContent
            value="subtitleSetting"
            className="mt-4 animate-tab-left"
          >
            <div className="flex w-full flex-col gap-4">
              {/* 启用字幕 */}
              <FormGenerator
                id="subtitle-switch"
                name="subtitleEnabled"
                inputType="switch"
                label={t("subtitle_label")}
                watch={watch}
                register={register}
                setValue={setValue}
                errors={errors}
              />

              {/* 字幕字体 */}
              <FormGenerator
                id="subtitle-font"
                name="subtitleFont"
                inputType="select"
                options={GLOBAL.SUBTITLEFONT.SUPPORTED.map((item) => ({
                  value: item,
                  label: item,
                  id: item,
                }))}
                label={t("subtitle_font_label")}
                placeholder={GLOBAL.SUBTITLEFONT.DEFAULT}
                watch={watch}
                register={register}
                setValue={setValue}
                errors={errors}
              />

              {/* 字幕位置 */}
              <FormGenerator
                id="subtitle-position"
                name="subtitlePosition"
                inputType="select"
                options={GLOBAL.SUBTITLEPOSITION.SUPPORTED.map((item) => ({
                  value: item.value,
                  label: t(item.label),
                  id: item.value,
                }))}
                label={t("subtitle_position_label")}
                defaultValue={GLOBAL.SUBTITLEPOSITION.DEFAULT.value}
                placeholder={t("subtitle_position_opts_label.bottom")}
                watch={watch}
                register={register}
                setValue={setValue}
                errors={errors}
              />

              {/* 字幕大小 */}
              <FormGenerator
                id="font-size"
                name="fontSize"
                inputType="slider"
                sliderConfig={{
                  min: 30,
                  max: 100,
                  step: 1,
                  showCurrentValue: true,
                  stepLabels: [],
                }}
                label={t("font_size_label")}
                defaultValue={"60"}
                watch={watch}
                register={register}
                setValue={setValue}
                errors={errors}
              />
              <div className="mt-1 flex justify-between text-center text-[12px] font-normal text-[rgba(128,128,128,1)]">
                <span>30</span>
                <span>100</span>
              </div>

              {/* 描边粗细 */}
              <FormGenerator
                id="stroke-width"
                name="strokeWidth"
                inputType="slider"
                sliderConfig={{
                  min: 0,
                  max: 10,
                  step: 0.5,
                  showCurrentValue: true,
                }}
                label={t("stroke_width_label")}
                defaultValue={"1.5"}
                watch={watch}
                register={register}
                setValue={setValue}
                errors={errors}
              />
              <div className="mt-1 flex justify-between text-center text-[12px] font-normal text-[rgba(128,128,128,1)]">
                <span>0</span>
                <span>10</span>
              </div>

              <div className="relative flex gap-[94px]">
                {/* 字幕颜色 */}
                <ColorPickerButton
                  label={t("text_color_label")}
                  color={textColor}
                  onChange={(color) => setValue("textForeColor", color)}
                />
                {/* 描边颜色 */}
                <ColorPickerButton
                  label={t("stroke_color_label")}
                  color={strokeColor}
                  onChange={(color) => setValue("strokeColor", color)}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="speechSetting" className="mt-4 animate-tab-left">
            <div className="flex flex-col gap-4">
              {/* 选择语音模型（暂不支持） */}
              {/* <FormGenerator
                id="model-name"
                name="modelName"
                inputType="select"
                options={GLOBAL.MODELSNAME.SUPPORTED.map((item) => ({
                  value: item,
                  label: item,
                  id: item,
                }))}
                label={t("speech_model_label")}
                defaultValue={GLOBAL.MODELSNAME.DEFAULT}
                placeholder={GLOBAL.MODELSNAME.DEFAULT}
                watch={watch}
                register={register}
                setValue={setValue}
                errors={errors}
              /> */}

              {/* 选择音色 */}
              <div className="flex w-full flex-row items-end justify-between gap-3">
                <div className="flex-1">
                  <FormGenerator
                    id="voice-name"
                    name="voiceName"
                    inputType="select"
                    options={GLOBAL.VOICENAME.SUPPORTED.map((item) => ({
                      value: item.value,
                      label: `${item.label} ${t(item.suffix)}`,
                      id: item.value,
                    }))}
                    label={t("speech_voice_label")}
                    defaultValue={GLOBAL.VOICENAME.DEFAULT.value}
                    placeholder={`${GLOBAL.VOICENAME.DEFAULT.label} ${t(
                      GLOBAL.VOICENAME.DEFAULT.suffix
                    )}`}
                    watch={watch}
                    register={register}
                    setValue={setValue}
                    errors={errors}
                  />
                </div>
                <AudioPlayer
                  ref={audioPlayerRef}
                  audioUrl={
                    GLOBAL.VOICENAME.SUPPORTED.find(
                      (item) => item.value === selectedVoice
                    )?.url || GLOBAL.VOICENAME.DEFAULT.url
                  }
                />
              </div>

              {/* 朗读音量 */}
              <FormGenerator
                id="voice-volume"
                name="voiceVolume"
                inputType="select"
                options={GLOBAL.VOICEVOLUME.SUPPORTED.map((item) => ({
                  value: item.value,
                  label: item.label,
                  id: item.value,
                }))}
                label={t("voic-volume_label")}
                defaultValue={GLOBAL.VOICEVOLUME.DEFAULT.value}
                placeholder={GLOBAL.VOICEVOLUME.DEFAULT.label}
                watch={watch}
                register={register}
                setValue={setValue}
                errors={errors}
              />

              {/* 背景音乐 */}
              <FormGenerator
                id="bgm-type"
                name="bgmType"
                inputType="select"
                options={GLOBAL.BGMTYPE.SUPPORTED.map((item) => ({
                  value: item.value,
                  label: t(item.label),
                  id: item.value,
                }))}
                label={t("bgm_type_label")}
                defaultValue={GLOBAL.BGMTYPE.DEFAULT.value}
                placeholder={t(GLOBAL.BGMTYPE.DEFAULT.label)}
                watch={watch}
                register={register}
                setValue={setValue}
                errors={errors}
              />

              {/* 背景音乐音量 */}
              <FormGenerator
                id="bgm-volume"
                name="bgmVolume"
                inputType="select"
                options={GLOBAL.BGMVOLUME.SUPPORTED.map((item) => ({
                  value: item.value,
                  label: item.label,
                  id: item.value,
                }))}
                label={t("bgm-volume_label")}
                defaultValue={GLOBAL.BGMVOLUME.DEFAULT.value}
                placeholder={GLOBAL.BGMVOLUME.DEFAULT.label}
                watch={watch}
                register={register}
                setValue={setValue}
                errors={errors}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </form>
  );
}
