export enum DataProvider {
  Mock = "MOCK",
  FutWebApp = "FUT_WEB_APP",
}

export interface AppSettings {
  dataProvider: DataProvider;
}

if (process.env.REACT_APP_DATA_PROVIDER == undefined) {
  throw new TypeError();
}

export const appSettings: AppSettings = {
  dataProvider: <DataProvider>process.env.REACT_APP_DATA_PROVIDER,
};
