export interface ISize {
  width: number;
  height: number;
}

export interface IRect {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

// export interface ISensData {
//     d: string;
//     t: number;
//     p: number;
//     h: number;
//   }

export interface IChartData {
  _id: string[];
  t: number[];
  p: number[];
  h: number[];
}
