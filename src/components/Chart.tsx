import { Box } from '@mui/material';
import React, { useRef } from 'react';
// import { AxesKey, AxisKey, IAxes, IAxis } from '../init';
import { chartBkgClr } from '../mui/theme';
import {
  IAxes,
  AxesKey,
  IAxis,
  AxisType,
  IRect,
  IChartData,
  ISize,
  Align,
  ICursorText,
  INoteParams,
  IPos,
} from '../types/types';
import { ChartAxis } from './ChartAxis';
import { Axle } from './Axle';
import { SvgMarker } from './SvgMarker';
import { ISensData, ISensDataKey } from '../types/dtos';
import { aprox, formatDateStr, getStrBoundSize, truncNum } from '../utils/helpers';
import { TextGroup } from './SvgTextGroup';
import { ChartData } from './ChartData';

export class Chart {
  private _numHSeg = 1;
  private numVSeg = 2;

  // private chartData?: IChartData;

  svgRef = React.createRef<SVGSVGElement>();
  txtRef = React.createRef<SVGTextElement>();
  aniTrigEl = React.createRef<SVGAnimateElement>();

  // INFO: в своих координатах
  private rcSvg: IRect = { left: 0, top: 0, right: 0, bottom: 0 }; // DOMRect;
  // INFO: в координатах svg
  private _rcChart: IRect = { left: 0, top: 0, right: 0, bottom: 0 };
  private paddig: IRect = { left: 20, top: 30, right: 20, bottom: 20 };
  private brdParent: IRect = { left: 8, top: 0, right: 0, bottom: 8 };

  private hLabelsBndSz: ISize = { width: 1, height: 1 };
  private vLabelsBndSz: ISize = { width: 1, height: 1 };
  private _axesTxtOffs = 10;

  // noteW = 0;
  // noteH = 0;
  // private _mousePos: IPos = { x: 0, y: 0 };
  // set mousePos(pos: IPos) {
  //   this._mousePos = pos;
  // }
  // get mousePos() {
  //   return this._mousePos;
  // }

  get axesTxtOffs() {
    return this._axesTxtOffs;
  }
  get numHSeg() {
    return this._numHSeg;
  }

  private _axes: IAxes = {} as IAxes;

  constructor() {}

  get rcChart() {
    return this._rcChart;
  }

  setAxis(key: AxesKey, axis: IAxis) {
    this._axes[key] = axis;
  }

  get lnHSeg() {
    return truncNum((this.rcChart.right - this.rcChart.left) / this._numHSeg);
  }

  get lnVSeg() {
    return truncNum((this.rcChart.bottom - this.rcChart.top) / this.numVSeg);
  }

  get svgRect() {
    return this.rcSvg;
  }
  // get chartRect() {
  //   return this.rcChart;
  // }

  // rcChart(): IRect {
  //   return {
  //     left: this.rcSvg.left + this.paddig.left,
  //     top: this.rcSvg.top + this.paddig.top,
  //     right: this.rcSvg.right - this.paddig.right,
  //     bottom: this.rcSvg.bottom - this.paddig.bottom,
  //   };
  // }

  // get rcChart(): IRect {
  //   return {
  //     left: this.rcSvg.left + this.paddig.left,
  //     top: this.rcSvg.top + this.paddig.top,
  //     right: this.rcSvg.right - this.paddig.right,
  //     bottom: this.rcSvg.bottom - this.paddig.bottom,
  //   };
  // }

  get axes2() {
    return this._axes;
  }

  //INFO: x, y в пространстве  chart.svgRef
  getCursorValues(pos: IPos, data: IChartData) {
    const rcClient = this.rcChart;
    const out: ICursorText[] = [];
    // let idxDataHit = Math.trunc((pos.x - rcClient.left) / this.lnHSeg);
    // let posInRange = (pos.x - rcClient.left) % this.lnHSeg;
    let idxDataHit = Math.trunc(pos.x / this.lnHSeg);
    let posInRange = pos.x % this.lnHSeg;

    (Object.keys(data) as Array<ISensDataKey>).forEach((key, i) => {
      let sensDataByKey = data[key];
      idxDataHit = idxDataHit >= sensDataByKey.length - 1 ? idxDataHit - 1 : idxDataHit;

      let apx = 0;
      let apxStr = '';
      let v1 = sensDataByKey[idxDataHit];
      let v2 = sensDataByKey[idxDataHit + 1];
      if (typeof sensDataByKey[0] === 'string') {
        v1 = Date.parse(v1 as string);
        v2 = Date.parse(v2 as string);
      }

      apx = aprox(v1 as number, v2 as number, this.lnHSeg, posInRange);

      if (typeof sensDataByKey[0] === 'string') {
        let d = new Date(apx).toISOString();
        apxStr = d.slice(0, 16);
      } else {
        apxStr = apx.toFixed(1);
      }

      let str = `${this.axes2[key].name}: ${apxStr}`;
      // const sz = this.getStrBoundSize(str, 'note-text');

      // totalW = Math.max(totalW, sz.width);
      // totalH = sz.height * (i + 1);
      out.push({ clr: this.axes2[key].color, txt: str });
    });

    // this.noteW = totalW + (this.axesTxtOffs << 1); // добавляем отступы;
    // this.noteH = totalH + (this.axesTxtOffs << 1);

    // console.log({
    //   x,
    //   idxDataHit,
    //   rcClient,
    // });

    // console.log({
    //   sz_log: sz,
    //   totalW,
    //   totalH,
    // });

    return out;
  }

  resize() {
    // INFO: границы входят размеры
    const rc = this.svgRef?.current?.parentElement?.getBoundingClientRect();

    if (rc) {
      this.rcSvg = {
        // left: rc.left + this.brdParent.left,
        // top: rc.top + this.brdParent.top,
        // right: rc.right - this.brdParent.right,
        // bottom: rc.bottom - this.brdParent.bottom,
        left: 0,
        top: 0,
        right: rc.width - this.brdParent.left - this.brdParent.right,
        bottom: rc.height - this.brdParent.top - this.brdParent.bottom,
      };

      this._rcChart = {
        left: this.rcSvg.left + this.paddig.left,
        top: this.rcSvg.top + this.paddig.top,
        right: this.rcSvg.right - this.paddig.right,
        bottom: this.rcSvg.bottom - this.paddig.bottom,
      };
    }

    // console.log('getBoundingClientRect->', {
    //   rc: rc,
    //   rcSvg: this.rcSvg,
    //   rcChart: this._rcChart,
    // });
  }

  buildHAxisPath() {
    let x = this.rcChart.left;
    let y = this.rcChart.bottom;
    let d = `M${truncNum(x)} ${truncNum(y)}`;

    for (let i = 1; i <= this._numHSeg; i++) {
      d += AxisType.H + truncNum(x + this.lnHSeg * i);
    }
    return d;
  }

  buildVAxisPath() {
    let x = this.rcChart.left;
    let y = this.rcChart.top;
    let d = `M${truncNum(x)} ${truncNum(y)}`;

    for (let i = 1; i <= this.numVSeg; i++) {
      d += AxisType.V + truncNum(y + this.lnVSeg * i);
    }
    return d;
  }

  convertArrObjectsToObjectPropertyArrays(startDate: Date, rangeDays: number, sensDatas: ISensData[]) {
    //WARN: side effect
    this._numHSeg = rangeDays * 24;
    const out: IChartData = { _id: [], t: [], p: [], h: [] };
    var newDate = new Date(startDate);
    newDate.setHours(newDate.getHours() - 1);
    var nullSensData: ISensData = { _id: '', t: this._axes['t'].min, p: this._axes['p'].min, h: this._axes['h'].min };
    var currSensDataIdx = 0,
      currSensData,
      currDate;
    var prevDate = new Date(startDate);
    prevDate.setDate(prevDate.getDate() - 1);

    for (let i = 0; i < rangeDays * 24 + 1; i++) {
      newDate.setHours(newDate.getHours() + 1);
      nullSensData._id = newDate.toISOString();

      let tmpSensData = sensDatas[currSensDataIdx];
      if (tmpSensData) {
        currDate = new Date(tmpSensData._id);
        currDate.setUTCMilliseconds(0);
        let t1 = currDate.getTime();
        let t2 = newDate.getTime();
        if (t1 === t2) {
          currSensDataIdx++;
          currSensData = tmpSensData;
        } else {
          currSensData = nullSensData;
        }
      } else {
        currSensData = nullSensData;
      }

      // console.log({
      // sensDatas_i: sensDatas[i],
      // i,
      //   currSensData,
      // });

      let key: keyof ISensData;
      for (key in currSensData) {
        out[key].push(currSensData[key] as never);
      }
    }

    // console.log({
    //   out_log: out,
    // });

    return out;
  }

  calcPadding(chartData: IChartData) {
    // INFO: без txtRef вызывало ошибку, типа еще не смонтирован в DOM
    // const hLabel = formatDateStr(chartData['_id'][0]);
    const hLabel = chartData['_id'][0].slice(0, 16);
    const vLabel = this._axes['p'].max.toString();
    this.hLabelsBndSz = getStrBoundSize(this.txtRef, hLabel, 'txt-axis');
    this.vLabelsBndSz = getStrBoundSize(this.txtRef, vLabel, 'txt-axis');

    this.paddig.left = this.vLabelsBndSz.width + (this._axesTxtOffs << 1);
    this.paddig.bottom = this.hLabelsBndSz.width + (this._axesTxtOffs << 1);
  }

  renderLabelsForVAxis(x: number, y: number, axis: IAxis) {
    const arrStrs: string[] = [];
    let delta = (axis.max - axis.min) / this.numVSeg;
    arrStrs.push('' + axis.max);

    for (let i = 1; i <= this.numVSeg - 1; i++) {
      arrStrs.push('' + (axis.max - i * delta));
    }
    arrStrs.push('' + axis.min);

    return (
      <TextGroup
        key={axis.name}
        x={x}
        y={y}
        orient={AxisType.H}
        offsX={0}
        offsY={this.lnVSeg}
        texts={arrStrs}
        clr={axis.color}
        align={Align.END}
      />
    );
  }

  renderLabelsForVAxes() {
    const res = [];
    let cntAxis = Object.keys(this._axes).length - 1; // -1 тк первые это labels для горизонтальной оси
    let startPos = truncNum(this.rcChart.top - ((cntAxis * this.vLabelsBndSz.height) / 2) * 1.15);

    let key: keyof IAxes;
    for (key in this._axes) {
      if (this._axes[key].type === AxisType.H) {
        continue;
      }
      res.push(
        this.renderLabelsForVAxis(
          this.rcChart.left - this._axesTxtOffs,
          (startPos += this.vLabelsBndSz.height),
          this._axes[key]
        )
      );
    }
    return res;
  }

  renderLabelsForHAxis(dataFieldText: ISensDataKey, chartData?: IChartData) {
    var out: string[] = [];
    var dx: number = 0;
    var color = '#ffffff';

    if (chartData) {
      color = this._axes[dataFieldText].color;
      const arrStrs = chartData[dataFieldText];

      dx = truncNum(this.hLabelsBndSz.height >> 2);
      let stride = Math.ceil(arrStrs.length / ((this.rcChart.right - this.rcChart.left) / this.hLabelsBndSz.height));

      let prevDay = 0;
      let currDay = 0;
      out = arrStrs.map((el, i) => {
        // "2022-01-01T10:00:00.033Z"
        let res = '';
        if ((i * this.hLabelsBndSz.height) % stride === 0) {
          const data = new Date(el);
          currDay = data.getUTCDate();
          const dateISOStr = data.toISOString();
          if (currDay !== prevDay) {
            // console.log({
            //   currDayNOTprevDay: data,
            //   prevDay,
            //   currDay,
            // });

            prevDay = currDay;
            // res = formatDateStr(el.toString());
            res = dateISOStr.slice(0, 16);
          } else {
            // res = ('0' + data.getHours()).slice(-2) + ':00';
            res = dateISOStr.slice(11, 16);
          }
        }

        return res;
      });

      // console.log('renderLabelsForHAxis->', {
      //   stride_log: stride,
      //   hLabelsBndSz_w: this.hLabelsBndSz.width,
      //   hLabelsBndSz_h: this.hLabelsBndSz.height,
      //   out,
      // });
    }

    return (
      <TextGroup
        x={this.rcChart.left + dx}
        y={this.rcChart.bottom + this._axesTxtOffs}
        orient={AxisType.V}
        offsX={truncNum(this.lnHSeg)}
        offsY={0}
        texts={out}
        clr={color}
        align={Align.END}
      />
    );
  }

  // getOrthoPath (x: number, y: number, size: number, numSeg: number, type: AxisType)  {
  getOrthoPath(x: number, y: number, type: AxisType) {
    let d = 'M';
    let posX = type === AxisType.H ? x : y;
    let posY = type === AxisType.H ? y : x;
    var numSeg = type === AxisType.H ? this._numHSeg : this.numVSeg;
    // let lnSeg = size / numSeg;
    let lnSeg = AxisType.H ? this.lnHSeg : this.lnVSeg;

    for (let i = 0; i <= numSeg; i++) {
      // d += type + cut(pos + lnSeg * i);
      d += `${truncNum(posX + lnSeg * i)} ${posY}`;
      if (i < numSeg) {
        d += 'L';
      }
    }
    return d;
  }
}

export const MyChart = new Chart();
