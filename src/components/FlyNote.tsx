import React from 'react';
import { ICursorText, IPos, IRect } from '../types/types';
import { calcNote, createSvgRoundRect } from '../utils/helpers';

export interface IFlyNoteProps {
  pos: IPos;
  txtRef: React.RefObject<SVGTextElement>;
  rcClient: IRect;
  padding: number;
  values: ICursorText[];
}

export function FlyNote({ pos, txtRef, rcClient, padding, values }: IFlyNoteProps) {
  let params = calcNote(txtRef, padding, values);
  pos.x = pos.x + params.width >= rcClient.right ? pos.x - params.width : pos.x;
  pos.y = pos.y + params.height >= rcClient.bottom ? pos.y - params.height : pos.y;

  return (
    <>
      <path
        d={createSvgRoundRect(pos.x, pos.y, params.width, params.height, 6)}
        style={{ fill: '#00ff00', stroke: '#1d5395', strokeWidth: '2px', strokeLinejoin: 'round' }}
      />
      {values.map((el, i) => {
        return (
          <text key={i} x={pos.x + padding} y={pos.y + params.hStr + i * params.hStr} fill={el.clr}>
            {el.txt}{' '}
          </text>
        );
      })}
    </>
  );
}
