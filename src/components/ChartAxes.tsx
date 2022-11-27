import React, { useCallback, useMemo } from 'react';
import { AxesKey, AxisType, IAxes, IRect } from '../types/types';
import { getOrthoPathNew, truncNum } from '../utils/helpers';
import { Axis } from './Axis';
import { Chart } from './Chart';

export interface IChartAxisProps {
  rcChart: IRect;
  numHSeg: number;
  lnHSeg: number;
  numVSeg: number;
  lnVSeg: number;
  axes: IAxes;
  // chart: Chart;
}

export function ChartAxes({ rcChart, numHSeg, lnHSeg, numVSeg, lnVSeg, axes }: IChartAxisProps) {
  return (
    <>
      {(Object.keys(axes) as Array<AxesKey>).map((key, i) => (
        <Axis
          key={i}
          d={getOrthoPathNew(
            rcChart,
            axes[key].type === AxisType.H ? numHSeg : numVSeg,
            axes[key].type === AxisType.H ? lnHSeg : lnVSeg,
            axes[key].type
          )}
          cls={axes[key].class}
        />
      ))}
    </>
  );
}

// export function ChartAxis({numSeg, lnSeg, rcChart, axis }: IChartAxisProps) {
// export function ChartAxes({ chart, axis }: IChartAxisProps) {
//   return (
//     <>
//       {(Object.keys(axis) as Array<AxesKey>).map((key) => (
//         // <Axle key={key} type={axis[key].type} cls={axis[key].class} />
//         <Axis
//           key={key}
//           type={axis[key].type}
//           cls={axis[key].class}
//           numSeg={axis[key].type === AxisType.H ? chart.numHSeg : chart.numVSeg}
//           // lnSeg={axis[key].type === AxisType.H ? chart.lnHSeg : chart.lnVSeg}
//           rcChart={chart.rcChart}
//         />
//       ))}
//     </>
//   );
// }
