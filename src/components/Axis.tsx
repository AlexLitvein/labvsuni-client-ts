import { useMemo } from 'react';
import { AxisType, IRect } from '../types/types';
import { truncNum } from '../utils/helpers';
import { MyChart } from './Chart';

// export interface IChartAxleProps {
//   type: AxisType;
//   numSeg: number;
//   // lnSeg: number;
//   rcChart: IRect;
//   cls: React.CSSProperties; //string;
// }

export interface IChartAxleProps {
  d: string;
  cls: React.CSSProperties;
}

export function Axis({ d, cls }: IChartAxleProps) {
  return <path d={d} style={cls} />;
}

// export function AxleH({type, numSeg, lnSeg, rcChart, cls }: IChartAxleProps) {

//   const d =  () =>{
//     let x = rcChart.left;
//     let y = rcChart.bottom;
//     let d = `M${truncNum(x)} ${truncNum(y)}`;

//     for (let i = 1; i <= numSeg; i++) {
//       d += AxisType.H + truncNum(x + lnSeg * i);
//     }
//     return d;
//   }

//   return  (
//     <path d={d()} style={cls} />
//   );
// }

// export function Axle({ type, numSeg, rcChart, cls }: IChartAxleProps) {
//   const d = useMemo(() => {
//     const lnSeg = truncNum(
//       (type === AxisType.H ? rcChart.right - rcChart.left : rcChart.bottom - rcChart.top) / numSeg
//     );
//     let x = rcChart.left;
//     let y = type === AxisType.H ? rcChart.bottom : rcChart.top;
//     let d = `M${truncNum(x)} ${truncNum(y)}`;

//     for (let i = 1; i <= numSeg; i++) {
//       d += type + truncNum(y + lnSeg * i);
//     }
//     return d;
//   }, [rcChart]);

//   // const d =  (type: AxisType) =>{
//   //   let x = rcChart.left;
//   //   let y = rcChart.top;
//   //   let d = `M${truncNum(x)} ${truncNum(y)}`;

//   //   for (let i = 1; i <= numSeg; i++) {
//   //     d += type + truncNum(y + lnSeg * i);
//   //   }
//   //   return d;
//   // }

//   return <path d={d} style={cls} />;
// }

// export interface IChartAxleProps {
//   type: AxisType;
//   cls: React.CSSProperties; //string;
// }

// export function Axle({ type, cls }: IChartAxleProps) {
//   return type === AxisType.H ? (
//     <path d={MyChart.buildHAxisPath()} style={cls} />
//   ) : (
//     <path d={MyChart.buildVAxisPath()} style={cls} />
//   );
// }
