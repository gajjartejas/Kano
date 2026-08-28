import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import zustandStorage from 'app/store/zustandStorage';
import { GUJARATI_FONTS, IGujaratiFontFamily, IFontWeightMap } from 'app/config/fonts';

interface IFontConfigState {
  selectedFontId: string;
}

interface IFontConfigActions {
  setSelectedFontId: (fontId: string) => void;
}

const initialState: IFontConfigState = {
  selectedFontId: 'noto-serif',
};

const useFontConfigStore = create<IFontConfigState & IFontConfigActions>()(
  devtools(
    persist(
      set => ({
        ...initialState,
        setSelectedFontId: (fontId: string) =>
          set(() => ({
            selectedFontId: fontId,
          })),
      }),
      {
        name: 'app-font-config-storage',
        storage: createJSONStorage(() => zustandStorage),
        onRehydrateStorage: state => {
          console.log('useFontConfigStore->hydration starts', state);
        },
        version: 1,
      },
    ),
  ),
);

export function useGujaratiFont(): {
  fontFamily: IGujaratiFontFamily;
  fonts: IFontWeightMap;
  selectedFontId: string;
} {
  const selectedFontId = useFontConfigStore(state => state.selectedFontId);
  const fontFamily = GUJARATI_FONTS.find(f => f.id === selectedFontId) || GUJARATI_FONTS[0];
  return {
    fontFamily,
    fonts: fontFamily.fonts,
    selectedFontId,
  };
}

export default useFontConfigStore;
