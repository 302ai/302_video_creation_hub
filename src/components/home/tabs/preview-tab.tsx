import VideoCard from "@/components/business/video-card";
import { getVideoHistory } from "@/stores/slices/video_history_store";
import { useAtomValue } from "jotai";

export default function PreviewTab() {
  const { currentTask, historyTasks } = useAtomValue(getVideoHistory);

  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      {/* current video preview */}
      {currentTask.taskId && (
        <VideoCard currentTask={currentTask} lastOne={true} />
      )}

      {/* history video preview */}
      {historyTasks.map((historyTask, index) => (
        <VideoCard
          key={historyTask.taskId}
          historyTask={historyTask}
          lastOne={index === historyTasks.length - 1}
        />
      ))}
    </div>
  );
}
