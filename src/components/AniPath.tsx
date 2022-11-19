import React, { useState, useEffect, useMemo } from 'react';
import { IAxisOptions, ChartOptions } from '../init/init';
import { IRect } from '../types/types';

export interface IAniPathProps {
  id: number;
  options: ChartOptions;
  axle: IAxisOptions;
  data: number[];
}

export const AniPath = ({ id, options, axle, data }: IAniPathProps) => {
  // console.log('AniPath');

  const [td, setTD] = useState({ t: '', d: '' });

  // data = [num1 , num2 , num3 , ...]

  //   useEffect(() => {
  //     // console.log(`AniPath useEffect `);

  //     setTD((prev) => {
  //       // console.log('prev', prev);

  //       const to = options.buildSvgAniPath(options.rcClient, axle.min, axle.max, data);

  //       const newTD = {};
  //       if (prev.data.length === 0 || prev.data.length !== data.length) {
  //         newTD.d = options.getOrthoPath(
  //           options.rcClient.left,
  //           options.rcClient.top + options.lnVSeg * options.numVSeg,
  //           options.rcClient.right - options.rcClient.left,
  //           options.numHSeg,
  //           'H'
  //         );
  //       } else {
  //         newTD.d = prev.t;
  //       }
  //       newTD.t = to;
  //       newTD.data = data;
  //       // console.log('AniPath res', newTD);
  //       return newTD;
  //     });
  //   }, [data, options.rcClient]);
  //   // }, [data]);

  //   return (
  //     <path className='chart1i0i0-path' style={{ stroke: '#ff0000', marker: `url("#mrk_${id}")` }} d={td.d}>
  //       <animate id={`ani_${id}`} begin='ani_trigg.begin' attributeName='d' dur='300ms' to={td.t} fill='freeze' />
  //       {/* <animate id={`ani_${id}`} begin="0s" attributeName="d" dur="1s" fill="freeze" to={td.t} /> */}
  //     </path>
  //   );
  return 0;
};
