import { Card, CardContent } from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { useMonitorMessage } from "@/hooks/global/use-monitor-message";
import {
  IVideoCurrentTask,
  IVideoHistoryTask,
  removeHistoryTaskById,
} from "@/stores";
import { createScopedLogger } from "@/utils";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  currentTask?: IVideoCurrentTask;
  historyTask?: IVideoHistoryTask;
  lastOne?: boolean;
}

const logger = createScopedLogger("VideoCard");

export default function VideoCard({
  currentTask,
  historyTask,
  lastOne,
}: VideoCardProps) {
  const t = useTranslations("videoCard");
  const removeTaskById = useSetAtom(removeHistoryTaskById);
  const { handleDownload } = useMonitorMessage();

  const { taskSubject, progress, createdAt } = currentTask || {};
  const {
    taskSubject: historyTaskSubject,
    createdAt: historyTaskCreatedAt,
    videoUrl,
    taskId,
  } = historyTask || {};

  const handleDownloadVideo = useCallback(async () => {
    if (!!currentTask) return;
    if (!videoUrl) return;

    const promise = handleDownload(videoUrl, `${taskId}.mp4`);
    toast.promise(promise, {
      loading: t("toast.downloading"),
      success: t("toast.downloaded_success"),
      error: t("toast.download_failed"),
    });

    logger.info("download success");

    return promise;
  }, [currentTask, videoUrl, handleDownload, taskId, t]);

  const handleDeleteVideo = useCallback(() => {
    if (!!currentTask) return;
    if (!taskId) return;

    removeTaskById(taskId);

    toast.success(t("toast.delete_success"));

    logger.info("delete success");
  }, [currentTask, taskId, removeTaskById, t]);

  return (
    <div className="w-full">
      <Card
        className={cn(
          "flex flex-col justify-between shadow-none",
          currentTask ? "h-[292px]" : "max-h-[292px]"
        )}
      >
        <CardContent
          className={cn(
            "flex h-full flex-col items-center justify-center p-0",
            currentTask ? "p-4" : "p-0"
          )}
        >
          {currentTask ? (
            <>
              <div className="text-xs font-normal text-[#808080]">
                {t("videoGenerating")} ({progress!}%)
              </div>
              <Progress value={progress!} />
            </>
          ) : (
            <video
              className="max-h-[290px] w-full overflow-hidden rounded-xl object-contain"
              controls
              src={videoUrl!}
            />
          )}
        </CardContent>
      </Card>
      <div
        className={cn(
          "flex justify-between border-b border-[rgba(229,229,229,1)]",
          lastOne ? "border-b-0" : ""
        )}
      >
        <div className="flex flex-col gap-y-[4px] py-[8px] pb-[19px]">
          <div className="text-sm">
            {currentTask ? taskSubject! : historyTaskSubject!}
          </div>
          <div className="text-xs text-[#808080]">
            {currentTask
              ? createdAt!.toLocaleString()
              : historyTaskCreatedAt!.toLocaleString()}
          </div>
        </div>
        <div className="flex items-end gap-2 pb-4">
          <Button
            variant="outline"
            className="h-[25px] min-w-[60px] rounded-[6px] border border-[#49C98F] px-[15px] text-xs text-[#49C98F] shadow-[0px_2px_2px_rgba(0,0,0,0.1)] hover:bg-[#49c98f0d] hover:text-[#49C98F] disabled:cursor-not-allowed"
            onClick={handleDownloadVideo}
            disabled={!!currentTask}
          >
            {t("download")}
          </Button>
          <Button
            variant="outline"
            className="h-[25px] min-w-[60px] rounded-[6px] border border-[#c9495a] px-[15px] text-xs text-[#c9495a] shadow-[0px_2px_2px_rgba(0,0,0,0.1)] hover:bg-[#c9495a1a] hover:text-[#c9495a] disabled:cursor-not-allowed"
            onClick={handleDeleteVideo}
            disabled={!!currentTask}
          >
            {t("delete")}
          </Button>
        </div>
      </div>
    </div>
  );
}
