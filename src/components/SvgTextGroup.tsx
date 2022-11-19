import React from 'react';

export interface ITextGroupProps {
  x: number;
  y: number;
  orient: string;
  offsX: number;
  offsY: number;
  texts: string[];
  clr: string;
}

export const TextGroup = ({ x, y, orient, offsX, offsY, texts, clr }: ITextGroupProps) => {
  let ox = offsX,
    oy = offsY,
    angle = 0;

  if (orient === 'V') {
    angle = -90;
    ox = offsY;
    oy = offsX;
  }
  // console.log(`offsX: ${offsX} offsY: ${offsY}`);
  // console.log("x ",x);
  return (
    <g className='chart1i0i0-axis_text' fill={clr} transform={`translate(${x}, ${y}) rotate(${angle})`}>
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
