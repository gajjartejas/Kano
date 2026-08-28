export interface IFontWeightMap {
  Regular: string;
  Medium: string;
  SemiBold: string;
  Bold: string;
  Thin?: string;
  ExtraLight?: string;
  Light?: string;
  ExtraBold?: string;
  Black?: string;
}

export interface IGujaratiFontFamily {
  id: string;
  name: string;
  category: string;
  preview: string;
  sampleAlphabet: string;
  sampleNumbers: string;
  sampleChar: string;
  fonts: IFontWeightMap;
}

export const GUJARATI_FONTS: IGujaratiFontFamily[] = [
  {
    id: 'noto-serif',
    name: 'Noto Serif Gujarati',
    category: 'Classic Serif',
    preview: 'ગુજરાતી શીખો • સરળ અને સુંદર',
    sampleAlphabet: 'ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ',
    sampleNumbers: '૦ ૧ ૨ ૩ ૪ ૫ ૬ ૭ ૮ ૯',
    sampleChar: 'ક',
    fonts: {
      Regular: 'NotoSerifGujarati-Regular',
      Medium: 'NotoSerifGujarati-Medium',
      SemiBold: 'NotoSerifGujarati-SemiBold',
      Bold: 'NotoSerifGujarati-Bold',
    },
  },
  {
    id: 'noto-sans',
    name: 'Noto Sans Gujarati',
    category: 'Modern Sans-Serif',
    preview: 'ગુજરાતી શીખો • સરળ અને સુંદર',
    sampleAlphabet: 'ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ',
    sampleNumbers: '૦ ૧ ૨ ૩ ૪ ૫ ૬ ૭ ૮ ૯',
    sampleChar: 'ક',
    fonts: {
      Regular: 'NotoSansGujarati-Regular',
      Medium: 'NotoSansGujarati-Medium',
      SemiBold: 'NotoSansGujarati-SemiBold',
      Bold: 'NotoSansGujarati-Bold',
      Thin: 'NotoSansGujarati-Thin',
      ExtraLight: 'NotoSansGujarati-ExtraLight',
      Light: 'NotoSansGujarati-Light',
      ExtraBold: 'NotoSansGujarati-ExtraBold',
      Black: 'NotoSansGujarati-Black',
    },
  },
  {
    id: 'rasa',
    name: 'Rasa',
    category: 'Literary Serif',
    preview: 'ગુજરાતી શીખો • સરળ અને સુંદર',
    sampleAlphabet: 'ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ',
    sampleNumbers: '૦ ૧ ૨ ૩ ૪ ૫ ૬ ૭ ૮ ૯',
    sampleChar: 'ક',
    fonts: {
      Regular: 'Rasa-Regular',
      Medium: 'Rasa-Regular',
      SemiBold: 'Rasa-Regular',
      Bold: 'Rasa-Regular',
    },
  },
  {
    id: 'shrikhand',
    name: 'Shrikhand',
    category: 'Expressive Display',
    preview: 'ગુજરાતી શીખો • સરળ અને સુંદર',
    sampleAlphabet: 'ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ',
    sampleNumbers: '૦ ૧ ૨ ૩ ૪ ૫ ૬ ૭ ૮ ૯',
    sampleChar: 'ક',
    fonts: {
      Regular: 'Shrikhand-Regular',
      Medium: 'Shrikhand-Regular',
      SemiBold: 'Shrikhand-Regular',
      Bold: 'Shrikhand-Regular',
    },
  },
  {
    id: 'mogra',
    name: 'Mogra',
    category: 'Playful Rounded',
    preview: 'ગુજરાતી શીખો • સરળ અને સુંદર',
    sampleAlphabet: 'ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ',
    sampleNumbers: '૦ ૧ ૨ ૩ ૪ ૫ ૬ ૭ ૮ ૯',
    sampleChar: 'ક',
    fonts: {
      Regular: 'Mogra-Regular',
      Medium: 'Mogra-Regular',
      SemiBold: 'Mogra-Regular',
      Bold: 'Mogra-Regular',
    },
  },
  {
    id: 'anek',
    name: 'Anek Gujarati',
    category: 'Geometric Sans',
    preview: 'ગુજરાતી શીખો • સરળ અને સુંદર',
    sampleAlphabet: 'ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ',
    sampleNumbers: '૦ ૧ ૨ ૩ ૪ ૫ ૬ ૭ ૮ ૯',
    sampleChar: 'ક',
    fonts: {
      Regular: 'AnekGujarati-Medium',
      Medium: 'AnekGujarati-Medium',
      SemiBold: 'AnekGujarati-Medium',
      Bold: 'AnekGujarati-Medium',
    },
  },
];

const Fonts = {
  NotoSansGujarati: GUJARATI_FONTS[0].fonts,
};

export default Fonts;
