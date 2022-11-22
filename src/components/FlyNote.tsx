import { useState, useEffect } from 'react';
import { ICursorText } from '../types/types';
import { Chart } from './Chart';

export interface IFlyNoteProps {
  chart: Chart;
  x: number;
  y: number;
  values: ICursorText[];
}
export function FlyNote({ chart, x, y, values }: IFlyNoteProps) {
  // const [pos, setPos] = useState({ x, y });

  return (
    <>
      <path
        d={chart.createSvgRoundRect(x, y, chart.noteW, chart.noteH, 6)}
        style={{ fill: '#00ff00', stroke: '#1d5395', strokeWidth: '2px', strokeLinejoin: 'round' }}
      />

      {values.map((el, i) => {
        let hStr = (chart.noteH - (chart.axesTxtOffs << 1)) / values.length;
        return (
          <text key={i} x={x + chart.axesTxtOffs} y={y + hStr + i * hStr} fill={el.clr}>
            {el.txt}{' '}
          </text>
        );
      })}
    </>
  );

  // useEffect(() => {
  //   setPos(chart.testPos(x, y));
  // }, [x, y]);

  // if (values.length !== 0) {
  // return (
  //   <>
  //     <path
  //       d={chart.createSvgRoundRect(pos.x, pos.y, chart.noteW, chart.noteH, 6)}
  //       style={{ fill: '#00ff00', stroke: '#1d5395', strokeWidth: '2px', strokeLinejoin: 'round' }}
  //     />

  //     {values.map((el, i) => {
  //       let hStr = (chart.noteH - (chart.axesTxtOffs << 1)) / values.length;
  //       return (
  //         <text key={i} x={pos.x + chart.axesTxtOffs} y={pos.y + hStr + i * hStr} fill={el.clr}>
  //           {el.txt}{' '}
  //         </text>
  //       );
  //     })}
  //   </>
  // );
  // } else {
  //   return null;
  // }
}
