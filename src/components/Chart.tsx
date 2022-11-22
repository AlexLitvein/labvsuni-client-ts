import { Box } from '@mui/material';
import React, { useRef } from 'react';
// import { AxesKey, AxisKey, IAxes, IAxis } from '../init';
import { chartBkgClr } from '../mui/theme';
import { IAxes, AxesKey, IAxis, AxisType, IRect, IChartData, ISize, Align, ICursorText } from '../types/types';
import { ChartAxis } from './ChartAxis';
import { Axle } from './Axle';
import { SvgMarker } from './SvgMarker';
import { ISensData, ISensDataKey } from '../types/dtos';
import { aprox, formatDateStr } from '../utils/helpers';
import { TextGroup } from './SvgTextGroup';
import { ChartData } from './ChartData';

export class Chart {
  private _numHSeg = 1;
  private numVSeg = 2;

  // private chartData?: IChartData;

  svgRef = React.createRef<SVGSVGElement>();
  txtRef = React.createRef<SVGTextElement>();
  aniTrigEl = React.createRef<SVGAnimateElement>();
  // private svgRef?: React.RefObject<SVGSVGElement>;

  private rcSvg: IRect = { left: 0, top: 0, right: 0, bottom: 0 }; // DOMRect;
  private rcChart: IRect = { left: 0, top: 0, right: 0, bottom: 0 };
  private paddig: IRect = { left: 20, top: 30, right: 20, bottom: 20 };
  private brdParent: IRect = { left: 8, top: 0, right: 0, bottom: 8 };

  private hLabelsBndSz: ISize = { width: 1, height: 1 };
  private vLabelsBndSz: ISize = { width: 1, height: 1 };
  private _axesTxtOffs = 10;

  noteW = 0;
  noteH = 0;

  get axesTxtOffs() {
    return this._axesTxtOffs;
  }
  get numHSeg() {
    return this._numHSeg;
  }

  private _axes: IAxes = {} as IAxes;

  constructor() {}

  // WARN: для ортогональных линий, ширину использовать кратную 2 пикселям, координаты целочисленные
  // Math.trunc(n); лучше отсекать, чем округлять, иначе сумма сегментов иногда
  // будет больше отрезка в который они должны уложиться
  // умножение на 0.1 вместо деления на 10, порождает много цифр после запятой
  truncNum(n: number) {
    return Math.trunc(n * 10) / 10;
  } // * 0.1

  // get rcChart()=>this.rcChart;

  setAxis(key: AxesKey, axis: IAxis) {
    this._axes[key] = axis;
  }

  get lnHSeg() {
    return this.truncNum((this.rcChart.right - this.rcChart.left) / this._numHSeg);
  }

  get lnVSeg() {
    return this.truncNum((this.rcChart.bottom - this.rcChart.top) / this.numVSeg);
  }

  get svgRect() {
    return this.rcSvg;
  }
  get chartRect() {
    return this.rcChart;
  }

  get axes2() {
    return this._axes;
  }

  testPos(x: number, y: number) {
    const right = this.rcChart.left + this.lnHSeg * this.numHSeg;
    x = x < this.rcChart.left ? this.rcChart.left : x;
    x = x > right ? right : x;

    y = y < this.rcChart.top ? this.rcChart.top : y;
    y = y > this.rcChart.bottom ? this.rcChart.bottom : y;
    return { x, y };
  }

  createSvgRoundRect(x: number, y: number, w: number, h: number, r: number) {
    return `
        M${x},${y} a${r},${r} 0 0,1 ${r},${-r}
        h${w - (r << 1)} a${r},${r} 0 0,1 ${r},${r}
        v${h - r} a${r},${r} 0 0,1 ${-r},${r}
        h${-w + (r << 1)} a${r},${r} 0 0,1 ${-r},${-r}z
        `;

    // return `
    //     M${x},${y} a${r},${r} 0 0,1 ${r},${-r}
    //     h${w - (r << 1)} a${r},${r} 0 0,1 ${r},${r}
    //     v${h - r} a${r},${r} 0 0,1 ${-r},${r}
    //     h${-w + (r << 1)} a${r},${r} 0 0,1 ${-r},${-r}z
    //     `;
  }

  getVal(x: number, y: number, data: IChartData) {
    const rcClient = this.chartRect;
    const out: ICursorText[] = [];
    let sensDataByKey = data['t'];
    let idxDataHit = Math.trunc((x - rcClient.left) / this.lnHSeg);
    let posInRange = (x - rcClient.left) % this.lnHSeg;
    let totalW = this.axesTxtOffs << 1; // добавляем отступы
    let totalH = totalW;

    let v1 = sensDataByKey[idxDataHit];
    let v2 = idxDataHit + 1 >= sensDataByKey.length ? sensDataByKey[idxDataHit] : sensDataByKey[idxDataHit + 1];
    let apx = aprox(v1, v2, this.lnHSeg, posInRange).toFixed(1);

    let str = `${this.axes2['t'].name}: ${apx}`;
    const sz = this.getStrBoundSize(str, 'note-text');

    totalW += Math.max(totalW, sz.width);
    totalH += Math.max(totalH, sz.height);
    out.push({ clr: this.axes2['t'].color, txt: str });

    // sensDataByKey.forEach(el=>{
    // });

    this.noteW = totalW;
    this.noteH = totalH;

    console.log({
      sz_log: sz,
      totalW,
      totalH,
    });

    return out;
  }

  resize() {
    // INFO: возвращаются float коорд
    const rc = this.svgRef?.current?.parentElement?.getBoundingClientRect();
    // const w = this.svgRef?.current?.parentElement?.style.width;
    // const rcs = this.svgRef?.current?.parentElement?.getClientRects();

    if (rc) {
      // console.log('resize->', {
      //   rc,
      //   rcs,
      // });

      // this.lnHSeg = (rc?.width - this.paddig.left - this.paddig.right) / this.numHSeg;
      // this.lnVSeg = (rc?.height - this.paddig.top - this.paddig.bottom) / this.numVSeg;

      // this.rcSvg = { left: 0, top: 0, right: rc.width, bottom: rc.height };
      this.rcSvg = {
        left: 0,
        top: 0,
        right: rc.width - this.brdParent.left - this.brdParent.right,
        bottom: rc.height - this.brdParent.top - this.brdParent.bottom,
      };
      this.rcChart = {
        left: this.paddig.left,
        top: this.paddig.top,
        right: rc.width - this.paddig.right,
        bottom: rc.height - this.paddig.bottom,
      };
    }

    // console.log('resize->', {
    //   this_rcClient_log: this.rcClient,
    //   current: this.svgRef?.current,
    // });
  }

  buildHAxisPath() {
    let x = this.rcChart.left;
    let y = this.rcChart.bottom;
    let d = `M${this.truncNum(x)} ${this.truncNum(y)}`;

    for (let i = 1; i <= this._numHSeg; i++) {
      d += AxisType.H + this.truncNum(x + this.lnHSeg * i);
    }
    return d;
  }

  buildVAxisPath() {
    let x = this.rcChart.left;
    let y = this.rcChart.top;
    let d = `M${this.truncNum(x)} ${this.truncNum(y)}`;

    for (let i = 1; i <= this.numVSeg; i++) {
      d += AxisType.V + this.truncNum(y + this.lnVSeg * i);
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

  // convertArrObjectsToObjectPropertyArrays(startDate: Date, rangeDays: number, sensDatas: ISensData[]) {
  //   this.numHSeg = rangeDays * 24;
  //   const out: IChartData = { _id: [], t: [], p: [], h: [] };
  //   var newDate = new Date(startDate);
  //   newDate.setHours(newDate.getHours() - 1);
  //   var nullSensData: ISensData = { _id: '', t: this._axes['t'].min, p: this._axes['p'].min, h: this._axes['h'].min };
  //   var currDate, currMonth, currDay, currHour, isNextMonth, isNextDay, isNextHour, currSensData;
  //   var prevDate = new Date(startDate);
  //   prevDate.setDate(prevDate.getDate() - 1);

  //   for (let i = 0; i < rangeDays * 24 + 1; i++) {
  //     // currHour = i === 24 ? 0 : i;
  //     // newDate.setHours(newDate.getHours() + currHour);
  //     newDate.setHours(newDate.getHours() + 1);
  //     nullSensData._id = newDate.toISOString();

  //     currSensData = sensDatas[i] || nullSensData;

  //     console.log({
  //       sensDatas_i: sensDatas[i],
  //       i,
  //       currSensData,
  //     });

  //     let key: keyof ISensData;
  //     for (key in currSensData) {
  //       out[key].push(currSensData[key] as never);
  //     }
  //   }

  //   console.log({
  //     out_log: out,
  //   });

  //   return out;
  // }

  getStrBoundSize(str: string, cls: string) {
    let bbox = { width: 0, height: 0 };
    if (this.txtRef.current) {
      this.txtRef.current.innerHTML = str;
      // this.txtRef.current.setAttribute('class', cls);

      // this.txtRef.current.style.bo
      bbox = this.txtRef.current.getBBox();
    }
    return { width: this.truncNum(bbox.width), height: this.truncNum(bbox.height) };
  }

  calcPadding(chartData: IChartData) {
    // if (this.chartData) {
    // INFO: без txtRef вызывало ошибку, типа еще не смонтирован в DOM
    // const hLabel = formatDateStr(chartData['_id'][0]);
    const hLabel = chartData['_id'][0].slice(0, 16);
    const vLabel = this._axes['p'].max.toString();
    this.hLabelsBndSz = this.getStrBoundSize(hLabel, 'txt-axis');
    this.vLabelsBndSz = this.getStrBoundSize(vLabel, 'txt-axis');

    this.paddig.left = this.vLabelsBndSz.width + (this._axesTxtOffs << 1);
    this.paddig.bottom = this.hLabelsBndSz.width + (this._axesTxtOffs << 1);
    // }
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
    let startPos = this.truncNum(this.rcChart.top - ((cntAxis * this.vLabelsBndSz.height) / 2) * 1.15);

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

      dx = this.truncNum(this.hLabelsBndSz.height >> 2);
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
        offsX={this.truncNum(this.lnHSeg)}
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
      d += `${this.truncNum(posX + lnSeg * i)} ${posY}`;
      if (i < numSeg) {
        d += 'L';
      }
    }
    return d;
  }

  buildAniPath(rc: IRect, min: number, max: number, data: number[]) {
    let res = 'M';
    for (let i = 0; i < data.length; i++) {
      let val = data[i];
      //   val = Math.round(((val - min) / (max - min)) * (rc.bottom - rc.top));
      val = this.truncNum(((val - min) / (max - min)) * (rc.bottom - rc.top));
      res += `${rc.left + this.lnHSeg * i} ${rc.bottom - val}`;
      if (i < data.length - 1) {
        res += 'L';
      }
    }
    return res;
  }

  // render() {
  //   return (
  //     <Box
  //       sx={{
  //         // position: 'relative',
  //         width: '100%',
  //         height: '100%',
  //         backgroundColor: chartBkgClr,
  //         borderLeft: 8,
  //         borderBottom: 8,
  //         boxSizing: 'border-box',
  //         // boxSizing: 'content-box',
  //       }}
  //     >
  //       <svg
  //         id='graph'
  //         style={{ fontSize: '14px', position: 'absolute', userSelect: 'none' }}
  //         ref={this.svgRef}
  //         width={this.rcSvg.right - this.rcSvg.left}
  //         height={this.rcSvg.bottom - this.rcSvg.top}
  //       >
  //         {/* Для вычисления высоты и ширины текста */}
  //         <text x={-100} y={-100} ref={this.txtRef}>
  //           test
  //         </text>

  //         <SvgMarker
  //           id={'mrkVAxis'}
  //           cls={{ stroke: '#1d5395', strokeWidth: '2px', fill: 'none', strokeDasharray: '4 4' }}
  //           w={2}
  //           h={this.rcChart.right - this.rcChart.left}
  //           refX={0}
  //           refY={this.rcChart.right - this.rcChart.left}
  //           mrkEl={<line x2='0' y2={this.rcChart.right - this.rcChart.left} />}
  //         />

  //         <SvgMarker
  //           id={'mrkHAxis'}
  //           // cls='chart1i0i0-axis_hmarker'
  //           cls={{ stroke: '#1d5395', strokeWidth: '2px', fill: 'none' }}
  //           w={2}
  //           h={6}
  //           refX={0}
  //           refY={6}
  //           mrkEl={<line x2='0' y2='6' />}
  //         />

  //         {<ChartAxis axis={this._axes} />}

  //         {this.chartData && <ChartData chartData={this.chartData} rcChart={this.rcChart} axes={this._axes} />}

  //         {this.renderLabelsForHAxis('_id')}
  //         {this.renderLabelsForVAxes()}
  //       </svg>
  //     </Box>
  //   );
  // }
}

export const MyChart = new Chart();
