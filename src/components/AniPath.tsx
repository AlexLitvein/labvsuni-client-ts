import React, { useState, useEffect, useMemo } from 'react';
import { AxisType, IAniPath, IAxis, IRect } from '../types/types';
import { MyChart } from './Chart';

export interface IAniPathProps {
  id: string;
  rcChart: IRect;
  axis: IAxis;
  data: number[];
}

export const AniPath = ({ id, rcChart, axis, data }: IAniPathProps) => {
  // console.log('AniPath');
  const [td, setTD] = useState<IAniPath>({ t: '', d: '', data: [] });

  useEffect(() => {
    setTD((prev) => {
      const to = MyChart.buildAniPath(rcChart, axis.min, axis.max, data);
      const newTD: IAniPath = { t: '', d: '', data: [] };

      if (prev.data.length === 0 || prev.data.length !== data.length) {
        newTD.d = MyChart.getOrthoPath(rcChart.left, rcChart.bottom, AxisType.H);
      } else {
        newTD.d = prev.t;
      }
      newTD.t = to;
      newTD.data = data;
      return newTD;
    });
  }, [data, rcChart]);

  return (
    // <path className='chart1i0i0-path' style={{ stroke: '#ff0000', marker: `url("#mrk_${id}")` }} d={td.d}>
    <path
      style={{
        strokeWidth: '2px',
        fill: 'none',
        transition: 'opacity 1s',
        stroke: axis.color,
        marker: `url("#mrk_${id}")`,
      }}
      d={td.d}
    >
      <animate id={`ani_${id}`} begin='ani_trigg.begin' attributeName='d' dur='300ms' to={td.t} fill='freeze' />
      {/* <animate id={`ani_${id}`} begin="0s" attributeName="d" dur="1s" fill="freeze" to={td.t} /> */}
    </path>
  );
  // return 0;
};
