"use client";

import FormGenerator from "@/components/common/form-generator";
import { LoaderRenderer } from "@/components/common/loader-renderer";
import { Button } from "@/components/ui/button";
import { GLOBAL } from "@/constants";
import { generateVideoScript, getVideoTerms } from "@/services/video";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormEvent, useCallback, useState } from "react";
import { UseVideoFormReturn } from "@/hooks/forms/use-video-form";
import { createScopedLogger } from "@/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAtom } from "jotai";
import { getHistoryTasks } from "@/stores";
import {
  generatedScriptAtom,
  generatingScriptAtom,
} from "@/stores/slices/video_edit_store";

interface BasicTabFormProps {
  videoForm: UseVideoFormReturn;
}

const logger = createScopedLogger("BasicTabForm");

export default function BasicTabForm({ videoForm }: BasicTabFormProps) {
  const t = useTranslations("baseTab.form");
  const {
    isPolling,
    isCreatingTask,
    register,
    errors,
    watch,
    setValue,
    onGenerate,
  } = videoForm;

  const [showHistoryLimitAlert, setShowHistoryLimitAlert] = useState(false);
  const [historyTasks] = useAtom(getHistoryTasks);
  const [generatingScript, setGeneratingScript] = useAtom(generatingScriptAtom);
  const [generatedScript, setGeneratedScript] = useAtom(generatedScriptAtom);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (historyTasks.length >= 30) {
        setShowHistoryLimitAlert(true);
        return;
      }

      onGenerate();
    },
    [onGenerate, historyTasks.length]
  );

  const handleGenerateVideoScript = useCallback(async () => {
    try {
      setGeneratingScript(true);

      const videoSubject = watch("videoSubject");
      const videoLanguage = watch("videoLanguage");

      const videoScript = await generateVideoScript({
        videoSubject,
        videoLanguage,
      });
      setValue("videoScript", videoScript.data.video_script);

      const videoTerms = await getVideoTerms({
        videoSubject,
        videoScript: videoScript.data.video_script,
        videoLanguage,
      });
      setValue("videoTerms", videoTerms.data.video_terms?.join(","));

      setGeneratedScript(true);

      logger.debug("Video script generated successfully");
    } catch (error) {
      setGeneratedScript(false);

      logger.error("Error generating video script:", error);
    } finally {
      setGeneratingScript(false);
    }
  }, [setGeneratingScript, watch, setValue, setGeneratedScript]);

  return (
    <>
      <form
        className="flex h-full w-full flex-col items-center gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-4">
          <FormGenerator
            id="video-subject"
            name="videoSubject"
            inputType="input"
            label={t("video_subject_label")}
            placeholder={t("video_subject_placeholder")}
            watch={watch}
            register={register}
            setValue={setValue}
            errors={errors}
          />
          <FormGenerator
            id="video-language"
            name="videoLanguage"
            inputType="select"
            options={GLOBAL.VIDEOLANGUAGE.SUPPORTED.map((item) => ({
              value: item.value,
              label: t(item.label),
              id: item.value,
            }))}
            label={t("video_language_label")}
            placeholder={t("video_language_placeholder")}
            defaultValue={GLOBAL.VIDEOLANGUAGE.DEFAULT.value}
            watch={watch}
            register={register}
            setValue={setValue}
            errors={errors}
          />
          <Button
            className="border-[1px] bg-black text-xs font-normal hover:border-[1px] hover:border-[rgba(229,229,229,1)] hover:bg-[rgba(0,0,0,0.7)]"
            onClick={handleGenerateVideoScript}
            disabled={
              !Boolean(watch("videoSubject")?.trim()) ||
              generatingScript ||
              isPolling ||
              isCreatingTask
            }
          >
            <LoaderRenderer
              status={
                generatingScript || isPolling || isCreatingTask
                  ? "loading"
                  : "default"
              }
              statuses={{
                default: {
                  icon: null,
                  text: generatedScript
                    ? t("regenerate_content")
                    : t("generate_content"),
                },
                loading: {
                  icon: generatingScript ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null,
                  text: generatedScript
                    ? t("regenerate_content")
                    : t("generate_content"),
                },
              }}
            />
          </Button>
        </div>
        <div className="flex w-full flex-col gap-4">
          <FormGenerator
            id="video-script"
            name="videoScript"
            inputType="textarea"
            textareaConfig={{
              wrapperClassName: "h-[205px]",
            }}
            label={t("video_script_label")}
            placeholder={t("video_script_placeholder")}
            watch={watch}
            register={register}
            setValue={setValue}
            errors={errors}
            disabled={generatingScript}
          />
          <FormGenerator
            id="video-terms"
            name="videoTerms"
            inputType="textarea"
            textareaConfig={{
              wrapperClassName: "h-[105px]",
            }}
            label={t("video_terms_label")}
            placeholder={t("video_terms_placeholder")}
            watch={watch}
            register={register}
            setValue={setValue}
            errors={errors}
            disabled={generatingScript}
          />
          <Button
            type="submit"
            size="sm"
            className="ml-auto border-[1px] bg-black font-normal hover:border-[1px] hover:border-[rgba(229,229,229,1)] hover:bg-[rgba(0,0,0,0.7)]"
            disabled={generatingScript || isPolling || isCreatingTask}
          >
            <LoaderRenderer
              status={isPolling || isCreatingTask ? "loading" : "default"}
              statuses={{
                default: { icon: null, text: t("generate_video") },
                loading: {
                  icon: <Loader2 className="h-4 w-4 animate-spin" />,
                  text: t("generate_loading_button_label"),
                },
              }}
            />
          </Button>
        </div>
      </form>

      <AlertDialog
        open={showHistoryLimitAlert}
        onOpenChange={setShowHistoryLimitAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("history_limit_title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("history_limit_description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction>{t("confirm")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
