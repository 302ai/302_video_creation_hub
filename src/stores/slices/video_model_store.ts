import { atom } from "jotai";

export interface Voice {
  name: string;
  displayName: string;
  sample: Record<string, string>;
}

export interface VoiceModel {
  modelName: string;
  voices: Voice[];
}

interface VoiceModelState {
  models: VoiceModel[];
}

export const voiceModelAtom = atom<VoiceModelState>({
  models: [],
});

export const setVoiceModelAtom = atom(
  null,
  (_get, set, newVoiceModel: VoiceModelState) => {
    set(voiceModelAtom, newVoiceModel);
  }
);

export const getVoicesByModelAtom = atom(
  (get) => (modelName: string) =>
    get(voiceModelAtom).models.find((model) => model.modelName === modelName)
      ?.voices || []
);

export const getSampleUrlByVoiceAtom = atom(
  (get) => (voiceName: string, language: string) => {
    const voice = get(voiceModelAtom)
      .models.flatMap((model) => model.voices)
      .find((voice) => voice.name === voiceName);

    return voice?.sample[language || "en"] ?? voice?.sample["zh"];
  }
);
