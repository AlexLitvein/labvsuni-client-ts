import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { IChartData, IPos, IRect } from '../types/types';
import { Chart, MyChart } from './Chart';
import { chartBkgClr } from '../mui/theme';
import { ChartAxis } from './ChartAxis';
import { ChartData } from './ChartData';
import { SvgMarker } from './SvgMarker';
import { ChartCursor } from './ChartCursor';
import { testPos } from '../utils/helpers';
import { FlyNote } from './FlyNote';

export interface IChartViewProps {
  chart: Chart;
  // rcChart: IRect;
  chartData?: IChartData;
}

// export const ChartView = ({ chart, rcChart, chartData }: IChartViewProps) => {
export const ChartView = ({ chart, chartData }: IChartViewProps) => {
  const rcChart = chart.rcChart;
  chart.aniTrigEl.current?.beginElement();
  // INFO: координаты в пространстве svg, ограниченные rcChart
  let [pos, set_pos] = useState<IPos>({ x: rcChart.left, y: rcChart.top });

  console.log('ChartView->', {
    rcChart,
    chart,
    chartData,
  });

  useEffect(() => {
    console.log('ChartView-mount->', {
      rcChart,
      chartData,
    });

    // INFO: координаты мыши в пространстве svg
    const onMouseClick = (e: MouseEvent) => {
      console.log('onMouseClick->', {
        rcChart,
        x: e.offsetX,
        y: e.offsetY,
        MyChart_rc: MyChart.rcChart,
      });

      set_pos(testPos(e.offsetX, e.offsetY, rcChart));
    };

    const onMouseMove = (e: MouseEvent) => {
      if (e.buttons === 1) {
        set_pos(testPos(e.offsetX, e.offsetY, rcChart));
      }
    };

    chart.svgRef.current?.addEventListener('click', onMouseClick);
    chart.svgRef.current?.addEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: chartBkgClr,
        borderLeft: 8,
        borderBottom: 8,
        boxSizing: 'border-box',
      }}
    >
      <>{console.log('ChartView->render')}</>

      <svg
        id='graph'
        style={{ fontSize: '14px', position: 'absolute', userSelect: 'none' }}
        ref={chart.svgRef}
        width={chart.svgRect.right - chart.svgRect.left}
        height={chart.svgRect.bottom - chart.svgRect.top}
      >
        <path d='M0 -10h10'>
          <animate
            id='ani_trigg'
            ref={chart.aniTrigEl}
            begin='indefinite'
            attributeName='d'
            // dur='0s'
            to='M0 -10h20'
            fill='freeze'
          />
        </path>

        {/* Для вычисления высоты и ширины текста */}
        <text x={-100} y={-100} ref={chart.txtRef}>
          test
        </text>

        <SvgMarker
          id={'mrkVAxis'}
          cls={{ stroke: '#1d5395', strokeWidth: '2px', fill: 'none', strokeDasharray: '4 4' }}
          w={2}
          h={rcChart.right - rcChart.left}
          refX={0}
          refY={rcChart.right - rcChart.left}
          mrkEl={<line x2='0' y2={rcChart.right - rcChart.left} />}
        />

        <SvgMarker
          id={'mrkHAxis'}
          cls={{ stroke: '#1d5395', strokeWidth: '2px', fill: 'none' }}
          w={2}
          h={6}
          refX={0}
          refY={6}
          mrkEl={<line x2='0' y2='6' />}
        />

        {<ChartAxis axis={chart.axes2} />}

        {chartData && <ChartData lnHSeg={chart.lnHSeg} chartData={chartData} rcChart={rcChart} axes={chart.axes2} />}

        {chart.renderLabelsForHAxis('_id', chartData)}
        {chart.renderLabelsForVAxes()}

        {chartData && (
          <>
            <ChartCursor rcChart={rcChart} pos={pos} />
            {/* <FlyNote
              pos={pos}
              values={chart.getCursorValues(pos, chartData)}
              rcClient={rcChart}
              padding={chart.axesTxtOffs}
              txtRef={chart.txtRef}
            /> */}
          </>
        )}
      </svg>
    </Box>
  );
};
