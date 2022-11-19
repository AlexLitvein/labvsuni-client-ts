import { useState, useEffect } from 'react';
import { ChartOptions, chart } from '../init/init';

export interface IChartAxleProps {
  type: string;
  cls: string;
  //   options: ChartOptions;
}

export function ChartAxle({ type, cls }: IChartAxleProps) {
  // console.log('call Axle');

  const buildAxlePath = (x: number, y: number, numSeg: number, type: string) => {
    let d = `M${chart.cut(x)} ${chart.cut(y)}`;
    let pos = type === 'H' ? x : y;
    let lnSeg = type === 'H' ? chart.lnHSeg : chart.lnVSeg;
    for (let i = 1; i <= numSeg; i++) {
      d += type + chart.cut(pos + lnSeg * i);
    }
    return d;
  };

  const [d, setD] = useState('');

  useEffect(() => {
    const rc = chart.rcClient;
    setD(
      buildAxlePath(
        rc.left,
        type === 'H' ? rc.top + chart.lnVSeg * chart.numVSeg : rc.top,
        type === 'H' ? chart.numHSeg : chart.numVSeg,
        type
      )
    );
  }, [chart.rcClient]);

  return <path d={d} className={cls}></path>;
}
