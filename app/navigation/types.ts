import { NavigatorScreenParams } from '@react-navigation/native';
import { ICharCellListSection } from 'app/components/CharCellItem';
import { OtherStaticTypes } from 'app/realm/modals/otherStatics';

export interface LoadingParams {}
export interface DashboardTabParams {}
export interface HomeTabsParams {}
export interface GujaratiScriptIntroParams {
  content: string;
  title: string;
  type: OtherStaticTypes;
  color: string;
}
export interface GeneralSettingParams {}
export interface SwipeCardSettingParams {}
export interface MoreAppsParams {}
export interface SettingsParams {}
export interface LicenseTypes {}
export interface AboutParams {}
export interface SelectAppearanceParams {}
export interface TranslatorsParams {}
export interface MoreTabParams {}
export interface LearnCharStrokeOrderParams {
  svgPath: string;
  color: string;
}
export interface LearnCharAnimatedDrawingParams {
  svgPath: string;
  color: string;
}
export interface ChangeLanguageParams {}

export enum LearnCharsType {
  Vowel = 0,
  Constant = 1,
  Barakhadi = 2,
  Number = 3,
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

export interface CardAnimationParams {}

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
  CardAnimation: CardAnimationParams;
  SwipeCardSetting: SwipeCardSettingParams;
  ChangeLanguage: ChangeLanguageParams;
};

export type HomeTabsNavigatorParams = {
  DashboardTab: DashboardTabParams;
  MoreTab: MoreTabParams;
};

export type HomeTabNavigatorParams = {
  LoggedInTabNavigator: NavigatorScreenParams<LoggedInTabNavigatorParams>;
};
