// NOTE! входные данные массив объектов, например:
// [
//      { d: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
//      { d: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
//      { d: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
// ]

export interface ISensData {
  _id: string;
  t: number;
  p: number;
  h: number;
}

// export type ISensDataKey = keyof ISensData;
