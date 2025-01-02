import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

export interface IVideoEditStore {
  generatingScript: boolean;
  generatedScript: boolean;
}

export const videoEditAtom = atom<IVideoEditStore>({
  generatingScript: false,
  generatedScript: false,
});

export const generatingScriptAtom = focusAtom(videoEditAtom, (optic) =>
  optic.prop("generatingScript")
);
export const generatedScriptAtom = focusAtom(videoEditAtom, (optic) =>
  optic.prop("generatedScript")
);
