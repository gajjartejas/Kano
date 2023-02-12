import { ICharCellListSection } from 'app/components/CharCellItem';

export interface DashboardTabParams {}
export interface GujaratiScriptIntroParams {}

export interface DeviceListsParams {}
export interface MoreAppsParams {}
export interface SettingsParams {}
export interface LicenseTypes {}
export interface AboutParams {}
export interface SelectAppearanceParams {}
export interface TranslatorsParams {}

export enum LearnCharsType {
  Vowel = 'Vowel',
  Constant = 'Constant',
  Barakhadi = 'Barakhadi',
  Number = 'Number',
}

export interface LearnCharsListParams {
  type: LearnCharsType;
  color: string;
}
export interface LearnCharsChartParams {
  type: LearnCharsType;
  color: string;
}
export interface LearnCharInfoParams {
  index: number;
  sectionIndex: number;
  groupedEntries: ICharCellListSection[];
  type: LearnCharsType;
  color: string;
}
export interface LearnCharsCardParams {
  type: LearnCharsType;
  learnMode: LearnCharsMode;
  isRandomMode: boolean;
  onlyInclude?: Set<string>;
  color: string;
}

export interface LearnBySelectedCharParams {
  type: LearnCharsType;
  learnMode: LearnCharsMode;
  isRandomMode: boolean;
  color: string;
}

export enum LearnCharsMode {
  Learn = 'Learn',
  Practice = 'Practice',
}
