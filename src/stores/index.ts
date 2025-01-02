import { createStore } from "jotai";

export * from "./slices/config_store";
export * from "./slices/language_store";
export * from "./slices/video_form_store";
export * from "./slices/video_history_store";

export const store = createStore();
