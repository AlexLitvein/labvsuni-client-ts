import React, { useState, useEffect, useMemo } from 'react';
import { ISensDataKey } from '../types/dtos';
import { AxisType, IAniPath, IAxis, IRect } from '../types/types';
import { buildAniPath, getOrthoPathNew } from '../utils/helpers';
import { Chart, MyChart } from './Chart';

// export interface IAniPathProps {
//   id: ISensDataKey;
//   d: string;
//   to: string;
//   color: string;
// }

// export const AniPath = ({ id, d, to, color }: IAniPathProps) => {
//   return (
//     <path
//       style={{
//         strokeWidth: '2px',
//         fill: 'none',
//         transition: 'opacity 1s',
//         stroke: color,
//         marker: `url("#mrk_${id}")`,
//       }}
//       d={d}
//     >
//       <animate id={`ani_${id}`} begin='ani_trigg.begin' attributeName='d' dur='300ms' to={to} fill='freeze' />
//       {/* <animate id={`ani_${id}`} begin='0s' attributeName='d' dur='1s' to={td.t} fill='freeze' /> */}
//     </path>
//   );
// };

export interface IAniPathProps {
  id: ISensDataKey;
  lnHSeg: number;
  rcChart: IRect;
  axis: IAxis;
  data: number[];
}

// export const AniPath = ({ id, chart, data }: IAniPathProps) => {
export const AniPath = ({ id, lnHSeg, rcChart, axis, data }: IAniPathProps) => {
  let [d, set_d] = useState(getOrthoPathNew(rcChart, data.length - 1, lnHSeg, AxisType.H));

  const to = useMemo(() => {
    return buildAniPath(lnHSeg, rcChart, axis.min, axis.max, data);
  }, [data]);

  console.log('AniPath->', {
    rcChart,
    data,
    d,
  });

  useEffect(() => {
    console.log('AniPath->useEffect');
    setTimeout(() => {
      set_d(to);
    }, 500); // INFO: для предотвращения рендеринга со старыми данными
  }, [data]); //, rcChart

  return (
    <path
      style={{
        strokeWidth: '2px',
        fill: 'none',
        transition: 'opacity 1s',
        stroke: axis.color,
        marker: `url("#mrk_${id}")`,
      }}
      d={d}
    >
      <animate id={`ani_${id}`} begin='ani_trigg.begin' attributeName='d' dur='300ms' to={to} fill='freeze' />
      {/* <animate id={`ani_${id}`} begin='0s' attributeName='d' dur='1s' to={td.t} fill='freeze' /> */}
    </path>
  );
};
