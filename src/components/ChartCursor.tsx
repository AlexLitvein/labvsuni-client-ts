import React from 'react';
import { IPos, IRect } from '../types/types';

export interface IChartCursorProps {
  pos: IPos;
  rcChart: IRect;
}

export function ChartCursor({ pos, rcChart }: IChartCursorProps) {
  return (
    <path
      d={`M${pos.x} ${rcChart.top}V${rcChart.bottom}`}
      style={{ fill: 'none', stroke: '#1d5395', strokeWidth: '2px', strokeDasharray: '2, 4' }}
    />
  );
}
