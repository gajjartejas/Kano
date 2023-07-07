export interface AdsActivity {
  id: number;
  en: string;
  gu: string;
  chars: ICharInfo[];
}

export interface ICharGroupInfo {
  id: number;
  en: string;
  gu: string;
  chars?: ICharInfo[];
}

export interface ICharInfo {
  id: number;
  en: string;
  gu: string;
  name_gu?: string;
  name_en?: string;
  diacritic?: string;
  svg: string;
  audio: string;
}
