// INFO: входные данные массив объектов, например:
// [
//      { _id: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
//      { _id: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
//      { _id: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
// ]

export interface ISensData {
  _id: string;
  t: number;
  p: number;
  h: number;
}

export interface IResponseSensData {
  currSensData: ISensData;
  arrSensData: ISensData[];
}

export type ISensDataKey = keyof ISensData;
