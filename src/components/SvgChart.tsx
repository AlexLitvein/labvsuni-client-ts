import React, { useState, useEffect, useRef } from 'react';
import { ChartOptions, IAxisDefine, IAxisOptions } from '../init/init';
import { ISensData } from '../types/dtos';
import { IChartData, IRect, ISize } from '../types/types';
import { formatDateStr } from '../utils/helpers';
import { ChartAxis } from './ChartAxis';
import { SvgMarker } from './SvgMarker';
// import { ChartCursor } from './ChartCursor';
// import { AniPath, ChartAxis, SvgMarker } from './SvgComps';
import { TextGroup } from './SvgTextGroup';
// import './_chart.scss';

export interface ISvgChartProps {
  options: ChartOptions;
  axis: IAxisDefine;
  dataSets: ISensData[];
}

const SvgChart = ({ options, axis, dataSets }: ISvgChartProps) => {
  // console.log('call SvgChart'); // , dataSets
  const svgElm = useRef(null);
  const txtRef = useRef(null);
  const aniTrigEl = useRef(null);
  const [sz, setSize] = useState({ w: 480, h: 320 });

  const _clientRect = () => {
    // oreder!
    return {
      left: options.padding.left,
      top: options.padding.top,
      right: sz.w - options.padding.right,
      bottom: sz.h - options.padding.bottom,
    };
  };

  options.numHSeg = dataSets.length !== 0 ? dataSets[0]._id.length - 1 : 1;
  options.numVSeg = options.countVLabels - 1;
  options.lnHSeg = options.cut((sz.w - options.padding.left - options.padding.right) / options.numHSeg);
  options.lnVSeg = options.cut((sz.h - options.padding.top - options.padding.bottom) / options.numVSeg);
  options.rcClient = _clientRect();

  const renderVTextAxis = (rc: IRect, dataFieldText: any, arrDataSets: string[]) => {
    // let arrStrs = arrDataSets.length !== 0 ? arrDataSets[0][dataFieldText] : [];
    let arrStrs = arrDataSets.length !== 0 ? arrDataSets[0][dataFieldText] : [];
    const tmpStr = formatDateStr(arrStrs[0]);
    const sz = options.getStrBoundSize(txtRef, tmpStr, 'txt-axis');
    let dx = options.cut(sz.height >> 2);
    let stride = Math.ceil(arrStrs.length / ((rc.right - rc.left) / sz.height));

    let prevDay = 0;
    let currDay = 0;
    // arrStrs = arrStrs.map((el, i) => {
    //   // el = 2021-01-04T15:00:00.034Z
    //   //   if (i % stride === 0) {
    //   if ((i * sz.height) % stride === 0) {
    //     let res = '';
    //     let data = new Date(el);
    //     currDay = data.getDate();
    //     if (currDay !== prevDay) {
    //       res = formatDateStr(el);
    //     } else {
    //       res = ('0' + data.getHours()).slice(-2) + ':00';
    //     }
    //     // if (i % stride === 0) {
    //     //     return _formatDateStr(el);
    //     // }
    //     prevDay = currDay;
    //     // return _formatDateStr(el);
    //     return res;
    //   }
    // });

    return (
      <TextGroup
        x={rc.left + dx}
        y={rc.bottom + options.axisTxtOffs}
        orient={'V'}
        offsX={options.cut(options.lnHSeg)}
        offsY={0}
        texts={[]}
        clr='#ffffff'
      />
    );
  };

  const renderHTextAxle = (x: number, y: number, axle: IAxisOptions) => {
    const arrStrs = [];
    let delta = (axle.max - axle.min) / options.numVSeg;
    arrStrs.push(axle.max);
    // arrStrs.push(axle.max+axle.unit);

    // const sz = options.getStrBoundSize(axle.max);
    // options.padding.left = Math.max(
    //   options.padding.left,
    //   sz.width + options.axisTxtOffs * 1
    // );

    for (let i = 1; i <= options.numVSeg - 1; i++) {
      arrStrs.push(axle.max - i * delta);
    }
    arrStrs.push(axle.min);
    return (
      <TextGroup
        key={axle.name}
        x={x}
        y={y}
        orient={'H'}
        offsX={0}
        offsY={options.lnVSeg}
        texts={[]}
        clr={axle.clrPath}
      />
    );
  };

  const renderHTextAxis = (rc: IRect) => {
    const res = [];
    const sz = options.getStrBoundSize(txtRef, 'test', '');
    let cntAxis = Object.keys(axis).length - 1; // -1 тк первая ось горизонтальная
    let startPos = options.cut(rc.top - ((cntAxis * sz.height) / 2) * 1.15);

    let key: keyof IAxisDefine;
    for (key in axis) {
      if (axis[key].type === 'H') {
        continue;
      }
      res.push(renderHTextAxle(rc.left - options.axisTxtOffs, (startPos += sz.height), axis[key]));
    }
    return res;
  };

  function resize() {
    // let { width, height } =  svgElm.current?.parentElement.getBoundingClientRect();
    // возвращаются float коорд
    // setW(cut(width));
    // setH(cut(height));
    // setSize({ w: options.cut(width), h: options.cut(height) });
    // console.log('resize height', height);
  }

  // ===========================
  // input
  // {
  //      _id: ['2021-11-05', ...],
  //      t:   [21.2, ...],
  //      p:   [36.9 ...],
  //      h:   [12.5 ...]
  // }
  const renderDataSet = (data: IChartData, idx: number) => {
    // console.log('renderDataSet');
    const out: React.ReactNode[] = [];
    // for (const key in obj) {
    //   const el = obj[key]; // [21.2, ...]
    //   if (axis[key].type === 'H') {
    //     continue;
    //   }
    //   out.push(<AniPath key={key + idx} id={key} options={options} axle={axis[key]} data={el} />);
    // }
    return out;
  };

  const renderMarkers = () => {
    const out = [];
    let key: keyof IAxisDefine;
    for (key in axis) {
      const el = axis[key];
      out.push(
        <SvgMarker
          key={key}
          id={`mrk_${key}`}
          cls={`mrk_${key}`}
          w={8}
          h={8}
          refX={4}
          refY={4}
          mrkEl={<circle cx='4' cy='4' r='4' style={{ fill: el.clrPath }} />}
        />
      );
    }
    return out;
  };

  useEffect(() => {
    if (dataSets.length !== 0) {
      //   calcPadding();
      // aniTrigEl.current?.beginElement();
    }
  }, [dataSets]);

  useEffect(() => {
    // console.log('SvgChart useEffect componentDidMount()');
    resize();

    // calcPadding('01/01/22-00:00');

    window.addEventListener('resize', (e) => {
      resize();
      //   calcPadding();
    });
  }, []); // componentDidMount()

  return (
    <div className='chart1i0i0'>
      <svg id='graph' className='chart1i0i0-svg' ref={svgElm} width={sz.w} height={sz.h}>
        {/* {console.log('draw SvgChart')} */}

        <path className='chart1i0i0-path' style={{ stroke: 'blue' }} d='M0 -10h10'>
          <animate
            id='ani_trigg'
            ref={aniTrigEl}
            begin='indefinite'
            attributeName='d'
            dur='0s'
            to='M0 -10h20'
            fill='freeze'
          />
        </path>

        {/* Для вычисления высоты и ширины текста */}
        <text x={-100} y={-100} ref={txtRef}>
          test
        </text>

        <SvgMarker
          id={'mrkHAxis'}
          cls='chart1i0i0-axis_hmarker'
          w={2}
          h={6}
          refX={0}
          refY={6}
          mrkEl={<line x2='0' y2='6' />}
        />

        {/* <SvgMarker
          id={'mrkVAxis'}
          cls='chart1i0i0-axis_vmarker'
          w={2}
          h={options.rcClient.right - options.rcClient.left}
          refX={0}
          refY={options.rcClient.right - options.rcClient.left}
          mrkEl={<line x2='0' y2={options.rcClient.right - options.rcClient.left} />}
        /> */}

        {/* {renderHTextAxis(options.rcClient)}
        {renderVTextAxis(options.rcClient, '_id', dataSets)} */}

        {/* {ChartAxis({ axis })} */}
        <ChartAxis axis={axis} />

        {/* {dataSets.map((itm, idx) => {
          return renderDataSet(itm, idx);
        })} */}

        {/* <ChartCursor svgElm={svgElm} options={options} axis={axis} data={dataSets} /> */}
      </svg>
    </div>
  );
};

export default SvgChart;
