import React from 'react';
import { IRect } from '../types/types';

export interface IAxisOptions {
  name: string;
  min: number;
  max: number;
  type: string;
  cls: string;
  clrPath: string;
}

export interface IAxisDefine {
  _id: IAxisOptions;
  t: IAxisOptions;
  p: IAxisOptions;
  h: IAxisOptions;
}

export const axisDefine = {
  _id: {
    name: 'Дата',
    min: 0,
    max: 0,
    type: 'H',
    cls: 'chart1i0i0-axis chart1i0i0-axis-horz',
    clrPath: '#000ff00',
  },
  t: {
    name: 'Температура',
    min: -50,
    max: 50,
    type: 'V',
    cls: 'chart1i0i0-axis chart1i0i0-axis-vert',
    clrPath: '#b73838',
  },
  p: {
    name: 'Давление',
    min: 700,
    max: 800,
    type: 'V',
    cls: 'chart1i0i0-axis chart1i0i0-axis-vert',
    clrPath: '#fffb00',
  },
  h: {
    name: 'Влажность',
    min: 0,
    max: 100,
    type: 'V',
    cls: 'chart1i0i0-axis chart1i0i0-axis-vert',
    clrPath: '#03fbfb',
  },
};

// options.[\w]* ?=
export const chart = {
  padding: { left: 20, top: 20, right: 20, bottom: 60 },
  // fontH: 10, //?
  countVLabels: 5,
  axisTxtOffs: 8,
  // fontBBoxHeight: 0,
  // biggestDataStrBBoxWidth: 0,
  // svgElm: null,
  rcClient: { left: 0, top: 0, right: 0, bottom: 0 } as IRect,
  numHSeg: 0,
  numVSeg: 0,
  lnHSeg: 0,
  lnVSeg: 0,
  // WARNING: для ортогональных линий, ширину использовать кратную 2 пикселям, координаты целочисоенные
  //   options.cut = (n) => Math.trunc(n); // лучше отсекать, чем округлять, иначе сумма сегментов иногда будет больше отрезка в который они должны уложиться
  // умножение на 0.1 вместо деления на 10, порождает много цифр после запятой
  cut: (n: number) => Math.trunc(n * 10) / 10, // * 0.1
  getOrthoPath: (x: number, y: number, size: number, numSeg: number, type: string) => {
    let d = 'M';
    let posX = type === 'H' ? x : y;
    let posY = type === 'H' ? y : x;
    let lnSeg = size / numSeg;
    for (let i = 0; i <= numSeg; i++) {
      // d += type + cut(pos + lnSeg * i);
      d += `${chart.cut(posX + lnSeg * i)} ${posY}`;
      if (i < numSeg) {
        d += 'L';
      }
    }
    return d;
  },

  calcStride: (minLen: number, totalLen: number, count: number) => {
    let i = count,
      stride = 0;
    for (; i > 0; i--) {
      if (count % i === 0) {
        let dxVLine = totalLen / i;
        if (dxVLine > minLen) {
          stride = count / i;
          break;
        }
      }
    }
    return stride || 1;
  },

  getStrBoundSize: (ref: React.RefObject<SVGTextElement>, str: string, cls: string) => {
    let bbox = { width: 0, height: 0 };
    if (ref.current) {
      ref.current.innerHTML = str;
      // if(cls) txtRef.current.className = cls;
      if (cls) ref.current.setAttribute('class', cls);
      bbox = ref.current.getBBox();
    }
    return { width: chart.cut(bbox.width), height: chart.cut(bbox.height) };
  },

  buildSvgAniPath: (rc: IRect, min: number, max: number, data: number[]) => {
    let res = 'M';
    for (let i = 0; i < data.length; i++) {
      let val = data[i];
      //   val = Math.round(((val - min) / (max - min)) * (rc.bottom - rc.top));
      val = chart.cut(((val - min) / (max - min)) * (rc.bottom - rc.top));
      res += `${rc.left + chart.lnHSeg * i} ${rc.bottom - val}`;
      if (i < data.length - 1) {
        res += 'L';
      }
    }
    return res;
  },

  calcPadding: (hAxleLabelExample: string) => {
    // let left = 0;
    // let bottom = 0;
    // let tmpSz: ISize = {width: 0, height:0};
    // let topAcc = 0;
    // for (const key in axis) {
    //   const el = axis[key]; //_id: { name: 'Дата', min: 0, max: 0, type: 'H', cls: 'axis', clrPath: '#000ff00' },
    //   // горизонтальная ось
    //   if (el.type === 'H') {
    //     bottom = options.getStrBoundSize(txtRef, hAxleLabelExample, '').width;
    //   } else {
    //     // вертикальная ось
    //     tmpSz = options.getStrBoundSize(txtRef, el.max, '');
    //     left = tmpSz.width > left ? tmpSz.width : left;
    //     topAcc += tmpSz.height;
    //   }
    // }
    // tmpSz = topAcc / 2 + options.axisTxtOffs * 2;
    // options.padding.top = options.padding.top < tmpSz ? tmpSz : options.padding.top;
    // tmpSz = left + options.axisTxtOffs * 2;
    // options.padding.left = options.padding.left < tmpSz ? tmpSz : options.padding.left;
    // tmpSz = bottom + options.axisTxtOffs * 2;
    // options.padding.bottom = options.padding.bottom < tmpSz ? tmpSz : options.padding.bottom;
  },
};

export type ChartOptions = typeof chart;
