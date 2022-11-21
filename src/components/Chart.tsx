import { Box } from '@mui/material';
import React, { useRef } from 'react';
// import { AxesKey, AxisKey, IAxes, IAxis } from '../init';
import { chartBkgClr } from '../mui/theme';
import { IAxes, AxesKey, IAxis, AxisType, IRect, IChartData, ISize, Align } from '../types/types';
import { ChartAxis } from './ChartAxis';
import { Axle } from './Axle';
import { SvgMarker } from './SvgMarker';
import { ISensData, ISensDataKey } from '../types/dtos';
import { formatDateStr } from '../utils/helpers';
import { TextGroup } from './SvgTextGroup';
import { ChartData } from './ChartData';

class Chart {
  private numHSeg = 1;
  private numVSeg = 2;

  // private chartData?: IChartData;

  svgRef = React.createRef<SVGSVGElement>();
  txtRef = React.createRef<SVGTextElement>();
  // private svgRef?: React.RefObject<SVGSVGElement>;

  private rcSvg: IRect = { left: 0, top: 0, right: 0, bottom: 0 }; // DOMRect;
  private rcChart: IRect = { left: 0, top: 0, right: 0, bottom: 0 };
  private paddig: IRect = { left: 20, top: 30, right: 20, bottom: 20 };
  private brdParent: IRect = { left: 8, top: 0, right: 0, bottom: 8 };

  private hLabelsBndSz: ISize = { width: 1, height: 1 };
  private vLabelsBndSz: ISize = { width: 1, height: 1 };
  private axesTxtOffs = 10;

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
    return this.truncNum((this.rcChart.right - this.rcChart.left) / this.numHSeg);
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

  // setData(sensData: ISensData[]) {
  //   this.chartData = this.convertArrObjectsToObjectPropertyArrays(sensData);
  //   this.numHSeg = sensData.length - 1;
  //   this.calcPadding();
  // }

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

    for (let i = 1; i <= this.numHSeg; i++) {
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

  convertArrObjectsToObjectPropertyArrays(arrObjects: ISensData[]) {
    // const out = {} as IChartData;
    const out: IChartData = { _id: [], t: [], p: [], h: [] };
    // if (arrObjects.length !== 0) {
    // let o = arrObjects[0];
    // let key: keyof ISensData;
    // for(key  in o) {
    //   out[key] = [];
    // }

    arrObjects.forEach((el) => {
      let key: keyof ISensData;
      for (key in el) {
        // const d = el[key];
        out[key].push(el[key] as never);
      }
    });
    // }
    return out;
  }

  getStrBoundSize(str: string, cls: string) {
    let bbox = { width: 0, height: 0 };
    if (this.txtRef.current) {
      this.txtRef.current.innerHTML = str;
      this.txtRef.current.setAttribute('class', cls);
      bbox = this.txtRef.current.getBBox();
    }
    return { width: this.truncNum(bbox.width), height: this.truncNum(bbox.height) };
  }

  calcPadding(chartData: IChartData) {
    // if (this.chartData) {
    // INFO: без txtRef вызывало ошибку, типа еще не смонтирован в DOM
    const hLabel = formatDateStr(chartData['_id'][0]);
    const vLabel = this._axes['p'].max.toString();
    this.hLabelsBndSz = this.getStrBoundSize(hLabel, 'txt-axis');
    this.vLabelsBndSz = this.getStrBoundSize(vLabel, 'txt-axis');

    this.paddig.left = this.vLabelsBndSz.width + (this.axesTxtOffs << 1);
    this.paddig.bottom = this.hLabelsBndSz.width + (this.axesTxtOffs << 1);
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
          this.rcChart.left - this.axesTxtOffs,
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
        // el = 2021-01-04T15:00:00.034Z
        //   if (i % stride === 0) {
        let res = '';
        if ((i * this.hLabelsBndSz.height) % stride === 0) {
          let data = new Date(el);
          currDay = data.getDate();
          if (currDay !== prevDay) {
            res = formatDateStr(el.toString());
          } else {
            res = ('0' + data.getHours()).slice(-2) + ':00';
          }
          // if (i % stride === 0) {
          //     return _formatDateStr(el);
          // }
          prevDay = currDay;
          // return _formatDateStr(el);
        }
        return res;
      });
    }

    return (
      <TextGroup
        x={this.rcChart.left + dx}
        y={this.rcChart.bottom + this.axesTxtOffs}
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
    var numSeg = type === AxisType.H ? this.numHSeg : this.numVSeg;
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
