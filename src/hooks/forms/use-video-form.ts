import { createScopedLogger } from "@/utils";
import { videoSchema, VideoSchemaType } from "@/components/forms/tabs/schema";
import {
  FieldErrors,
  useForm,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { useAtom } from "jotai";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useLayoutEffect, useState } from "react";
import {
  getCurrentTask,
  initialVideoForm,
  store,
  videoFormAtom,
  clearCurrentTask,
  updateCurrentTaskProgress,
  setCurrentTask,
  addHistoryTask,
} from "@/stores";
import { useTranslations } from "next-intl";
import { createVideoTask, getVideoTaskStatus } from "@/services/video";
import { toast } from "sonner";
import { usePolling } from "../global/use-polling";

export interface UseVideoFormReturn {
  isPolling: boolean;
  isCreatingTask: boolean;
  register: UseFormRegister<VideoSchemaType>;
  errors: FieldErrors<VideoSchemaType>;
  watch: UseFormWatch<VideoSchemaType>;
  setValue: UseFormSetValue<VideoSchemaType>;
  onGenerate: () => void;
  setError: UseFormSetError<VideoSchemaType>;
  trigger: UseFormTrigger<VideoSchemaType>;
}

const logger = createScopedLogger("UseVideoForm");

let isGlobalInitialized = false;

const TOAST_ID = "video-generation-status";

export function useVideoForm(): UseVideoFormReturn {
  const t = useTranslations("generation");

  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const [storedForm, setStoredForm] = useAtom(videoFormAtom);

  const {
    watch,
    register,
    setValue: setValueForm,
    setError,
    trigger,
    formState: { errors },
  } = useForm<VideoSchemaType>({
    values: storedForm,
    resolver: zodResolver(videoSchema, {
      errorMap: (error, ctx) => {
        logger.debug("Zod error:", error, ctx);

        return { message: error.message || "Validation error" };
      },
    }),
    mode: "onSubmit",
    criteriaMode: "all",
    defaultValues: initialVideoForm,
  });

  const setValue = useCallback(
    (name: keyof VideoSchemaType, value: any) => {
      logger.debug(name, value);
      setValueForm(name, value);
      setStoredForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setValueForm, setStoredForm]
  );

  const { isPolling, start: startPolling } = usePolling(getVideoTaskStatus, {
    retryDelay: 30000,
    maxAttempts: 30,
    isComplete: (data) => data.state === 1,
    isFailed: (data) => data.state === -1,
    onSuccess: (data) => {
      logger.debug("Task successed:", data);

      const { taskId, taskSubject, createdAt } = store.get(getCurrentTask);

      toast.dismiss(TOAST_ID);
      toast.success(t("success.video_generated_success"));

      store.set(addHistoryTask, {
        taskId,
        taskSubject,
        videoUrl: data["302_videos"]![0],
        createdAt,
      });
      store.set(clearCurrentTask);
    },
    onError: (error) => {
      logger.error("Error polling video:", error);

      toast.dismiss(TOAST_ID);
      toast.error(t("errors.video_generated_failed"));

      store.set(clearCurrentTask);
    },
    onData: (data) => {
      store.set(updateCurrentTaskProgress, data.progress);
      toast.loading(t("loading.generating_video"), { id: TOAST_ID });
    },
  });

  const onGenerate = useCallback(async () => {
    const formData = watch();
    logger.debug("Current form data:", formData);

    try {
      // Validate form data
      const validationRes = videoSchema.safeParse(formData);
      if (!validationRes.success) {
        const formattedErrors = validationRes.error.issues.map((issue) => ({
          path: issue.path,
          message: issue.message,
        }));

        logger.debug(
          "Formatted validation errors:",
          JSON.stringify(formattedErrors, null, 2)
        );

        // Set errors
        formattedErrors.forEach((error) => {
          const field = error.path[error.path.length - 1];
          if (typeof field === "string") {
            setError(field as keyof VideoSchemaType, {
              type: "custom",
              message: t(`errors.${error.path[0]}`),
            });
          }
        });

        // Focus on first error
        if (formattedErrors.length > 0) {
          const firstError = formattedErrors[0];
          const firstErrorField = firstError.path[firstError.path.length - 1];
          if (typeof firstErrorField === "string") {
            const errorElement = document.querySelector(
              `[name="${firstErrorField}"]`
            );
            logger.debug("First error field:", firstErrorField);
            if (errorElement instanceof HTMLElement) {
              errorElement.focus();
            }
          }
        }
        return;
      }

      // Avoid duplicate requests
      if (isPolling) {
        logger.debug("Already polling, skipping...");

        return;
      }

      logger.debug("Create a video task");

      setIsCreatingTask(true);

      const result = await createVideoTask(formData);

      store.set(setCurrentTask, {
        taskId: result.data.task_id,
        taskSubject: formData.videoSubject,
        progress: 0,
        createdAt: new Date().toLocaleString(),
      });

      toast.success(t("success.create_video_task_success"));

      startPolling(result.data.task_id);
    } catch (error) {
      toast.error(t("errors.create_video_task_failed"));
      logger.error("Error generating video:", error);
    } finally {
      setIsCreatingTask(false);
    }
  }, [isPolling, setError, startPolling, t, watch]);

  // 页面刷新后，如果当前任务存在，则设置为当前任务
  useLayoutEffect(() => {
    if (isGlobalInitialized) return;

    isGlobalInitialized = true;

    if (!isPolling) {
      const storedTask = store.get(getCurrentTask);
      if (storedTask.taskId) {
        try {
          startPolling(storedTask.taskId);
        } catch (error) {
          logger.error("Error polling video:", error);
        }
      }
    }
  }, [isPolling, startPolling]);

  return {
    isPolling,
    isCreatingTask,
    watch,
    setValue,
    register,
    errors,
    setError,
    trigger,
    onGenerate,
  };
}
