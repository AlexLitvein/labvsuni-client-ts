import React from 'react';
import { Align, AxisType } from '../types/types';

export interface ITextGroupProps {
  x: number;
  y: number;
  orient: AxisType;
  offsX: number;
  offsY: number;
  texts: string[];
  clr: string;
  align?: Align;
}

export const TextGroup = ({ x, y, orient, offsX, offsY, texts, clr, align = Align.START }: ITextGroupProps) => {
  let ox = offsX,
    oy = offsY,
    angle = 0;

  if (orient === AxisType.V) {
    angle = -90;
    ox = offsY;
    oy = offsX;
  }
  return (
    <g fill={clr} transform={`translate(${x}, ${y}) rotate(${angle})`} style={{ textAnchor: align }}>
      {texts.map((el, i) => {
        return <TextSvg key={i} x={ox * i} y={oy * i} text={el} />;
      })}
    </g>
  );
};

export interface ITextSvgProps {
  x: number;
  y: number;
  text: string;
}

const TextSvg = ({ x, y, text }: ITextSvgProps) => {
  return (
    <text x={x} y={y}>
      {text}
    </text>
  );
};
