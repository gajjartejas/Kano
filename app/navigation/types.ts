import { NavigatorScreenParams } from '@react-navigation/native';
import { ICharCellListSection } from 'app/components/CharCellItem';

export interface LoadingParams {}
export interface DashboardTabParams {}
export interface HomeTabsParams {}
export interface GujaratiScriptIntroParams {}
export interface GeneralSettingParams {}
export interface MoreAppsParams {}
export interface SettingsParams {}
export interface LicenseTypes {}
export interface AboutParams {}
export interface SelectAppearanceParams {}
export interface TranslatorsParams {}
export interface MoreTabParams {}
export interface LearnCharStrokeOrderParams {
  svgPath: string;
}
export interface LearnCharAnimatedDrawingParams {
  svgPath: string;
}

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

export type LoggedInTabNavigatorParams = {
  Loading: LoadingParams;
  HomeTabs: HomeTabsParams;
  MoreApps: MoreAppsParams;
  Settings: SettingsParams;
  GeneralSetting: GeneralSettingParams;
  About: AboutParams;
  SelectAppearance: SelectAppearanceParams;
  License: LicenseTypes;
  Translators: TranslatorsParams;
  LearnCharsList: LearnCharsListParams;
  LearnCharsChart: LearnCharsChartParams;
  LearnCharInfo: LearnCharInfoParams;
  LearnCharsCard: LearnCharsCardParams;
  LearnBySelectedChar: LearnBySelectedCharParams;
  GujaratiScriptIntro: GujaratiScriptIntroParams;
  DashboardTab: DashboardTabParams;
  MoreTab: MoreTabParams;
  LearnCharStrokeOrder: LearnCharStrokeOrderParams;
  LearnCharAnimatedDrawing: LearnCharAnimatedDrawingParams;
};

export type HomeTabsNavigatorParams = {
  DashboardTab: DashboardTabParams;
  MoreTab: MoreTabParams;
};

export type HomeTabNavigatorParams = {
  LoggedInTabNavigator: NavigatorScreenParams<LoggedInTabNavigatorParams>;
};
