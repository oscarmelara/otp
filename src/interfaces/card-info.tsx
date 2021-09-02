
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
//   Interfaces
// -----------------------------------------------------------------------------

export type CardInfoType = 'danger' | 'info' | 'success';

export type CardInfoIcon = (
  'box'
  | 'clock-red'
  | 'currency'
  | 'doc-check'
  | 'doc-more'
  | 'info'
  | 'list'
  | 'number'
  | 'status'
  | 'user'
  | 'user-data'
  | 'user-square'
  | 'users'
  | 'warning-green'
  | 'warning-red'
);

export type CardInfoDataTypes = CardInfoBigTitle | CardInfoTitle | CardInfoSubTitle | CardInfoDescriptionOrList | CardInfoByValues;

export interface CardInfoProps {
  data?: Array<CardInfoDataTypes>;
  icon?: CardInfoIcon;
  title: string;
  type?: CardInfoType;
}

export interface CardInfoCommonProps {
  type: 'big-title' | 'title' | 'sub-title';
  value: string;
}

export interface CardInfoByValuesItem {
  title: string;
  value: string;
}

export interface CardInfoBigTitle extends CardInfoCommonProps {}

export interface CardInfoTitle extends CardInfoCommonProps {}

export interface CardInfoSubTitle extends CardInfoCommonProps {}

export interface CardInfoDescriptionOrList {
  type: 'description' | 'list';
  value: Array<string> | string;
}

export interface CardInfoByValues {
  type: 'info';
  value: Array<CardInfoByValuesItem>;
}
