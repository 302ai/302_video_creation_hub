import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { getVoiceModels, VideoModelResponse } from "@/services/tool";
import {
  VoiceModel,
  setVoiceModelAtom,
} from "@/stores/slices/video_model_store";
import { createScopedLogger } from "@/utils";

const logger = createScopedLogger("useVoiceModels");

export function useVoiceModels() {
  const setVoiceModelState = useSetAtom(setVoiceModelAtom);

  useEffect(() => {
    const fetchVoiceModels = async () => {
      try {
        setVoiceModelState({
          models: [],
        });

        const rawModels = await getVoiceModels();
        const formattedModels = formatVoiceModels(rawModels);

        setVoiceModelState({
          models: formattedModels,
        });
      } catch (err) {
        logger.error(err);
      }
    };

    fetchVoiceModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatVoiceModels = (rawModels: VideoModelResponse): VoiceModel[] =>
    Object.entries(rawModels).map(([modelName, voices]) => ({
      modelName,
      voices: voices.map((voice) => ({
        name: voice.name,
        displayName: voice.displayName,
        sample: voice.sample,
      })),
    }));
}
