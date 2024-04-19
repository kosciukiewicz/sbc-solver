export enum DataProvider {
  Mock = "MOCK",
  FutWebApp = "FUT_WEB_APP",
}

export interface AppConfig {
  dataProvider: DataProvider;
  advancedMode: boolean | undefined;
  isAttachedAsChromeExtension: boolean;
}

if (process.env.REACT_APP_DATA_PROVIDER == undefined) {
  throw new TypeError();
}

export const appConfig: AppConfig = {
  dataProvider: <DataProvider>process.env.REACT_APP_DATA_PROVIDER,
  advancedMode: process.env.REACT_APP_ADVANCED_MODE == "true",
  isAttachedAsChromeExtension: chrome.runtime != undefined,
};
