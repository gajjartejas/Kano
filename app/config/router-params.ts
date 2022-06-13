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
}
export interface LearnCharsChartParams {
  type: LearnCharsType;
}
export interface LearnCharInfoParams {
  index: number;
  sectionIndex: number;
  groupedEntries: ICharCellListSection[];
  type: LearnCharsType;
}
