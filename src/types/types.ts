export interface IRequest {
  // date: Date;
  // range: number;
  startData: Date;
  endData: Date;
}

export enum AxisType {
  H = 'H',
  V = 'V',
}

export enum Align {
  START = 'start',
  END = 'end',
  MIDDLE = 'middle',
}

export interface ISize {
  width: number;
  height: number;
}

export interface IAniPath {
  t: string;
  d: string;
  data: number[];
}

export interface ICursorText {
  txt: string;
  clr: string;
}

export interface IRect {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export interface IChartData {
  _id: string[];
  t: number[];
  p: number[];
  h: number[];
}

export interface IAxis {
  name: string;
  min: number;
  max: number;
  type: AxisType;
  class: React.CSSProperties;
  color: string;
}

export interface IAxes {
  _id: IAxis;
  t: IAxis;
  p: IAxis;
  h: IAxis;
}
export type AxesKey = keyof IAxes;
