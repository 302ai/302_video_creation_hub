import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { atom } from "jotai";

export interface IVideoCurrentTask {
  taskId: string;
  taskSubject: string;
  progress: number;
  createdAt: string;
}
export interface IVideoHistoryTask {
  taskId: string;
  taskSubject: string;
  videoUrl: string;
  createdAt: string;
}
export interface IVideoHistory {
  currentTask: IVideoCurrentTask;
  historyTasks: IVideoHistoryTask[];
}

const initialVideoHistory: IVideoHistory = {
  currentTask: {
    taskId: "",
    taskSubject: "",
    progress: 0,
    createdAt: new Date().toLocaleString(),
  },
  historyTasks: [],
};

export const videoHistoryAtom = atomWithStorage<IVideoHistory>(
  "video_history",
  initialVideoHistory,
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

/* Actions for video history */
export const getVideoHistory = atom((get) => get(videoHistoryAtom));

/* Actions for current task */
export const getCurrentTask = atom((get) => get(videoHistoryAtom).currentTask);

export const setCurrentTask = atom(
  null,
  (_get, set, currentTask: IVideoCurrentTask) => {
    set(videoHistoryAtom, (state) => ({
      ...state,
      currentTask,
    }));
  }
);

export const clearCurrentTask = atom(null, (_get, set) => {
  set(videoHistoryAtom, (state) => ({
    ...state,
    currentTask: initialVideoHistory.currentTask,
  }));
});

export const updateCurrentTaskProgress = atom(
  null,
  (_get, set, progress: number) => {
    set(videoHistoryAtom, (state) => ({
      ...state,
      currentTask: { ...state.currentTask, progress },
    }));
  }
);

/* Actions for history tasks */
export const getHistoryTasks = atom(
  (get) => get(videoHistoryAtom).historyTasks
);

export const addHistoryTask = atom(
  null,
  (_get, set, newTask: IVideoHistoryTask) => {
    set(videoHistoryAtom, (state) => ({
      ...state,
      historyTasks: [newTask, ...state.historyTasks],
    }));
  }
);

export const removeHistoryTaskById = atom(null, (_get, set, taskId: string) => {
  set(videoHistoryAtom, (state) => ({
    ...state,
    historyTasks: state.historyTasks.filter((task) => task.taskId !== taskId),
  }));
});

export const clearHistoryTasks = atom(null, (_get, set) => {
  set(videoHistoryAtom, (state) => ({
    ...state,
    historyTasks: [],
  }));
});
