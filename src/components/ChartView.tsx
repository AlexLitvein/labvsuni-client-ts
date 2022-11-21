import React, { useState, useEffect } from 'react';
import { Box, Stack, SxProps, Typography } from '@mui/material';
import { IAxes, IAxis, IChartData, IRect } from '../types/types';
import { MyChart } from './Chart';
import { chartBkgClr } from '../mui/theme';
import { ChartAxis } from './ChartAxis';
import { ChartData } from './ChartData';
import { SvgMarker } from './SvgMarker';

export interface IChartViewProps {
  chartData?: IChartData;
  // rcChart: IRect;
  // axes: IAxes;
}

// ???
export const ChartView = ({ chartData }: IChartViewProps) => {
  return (
    <Box
      sx={{
        // position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: chartBkgClr,
        borderLeft: 8,
        borderBottom: 8,
        boxSizing: 'border-box',
        // boxSizing: 'content-box',
      }}
    >
      <svg
        id='graph'
        style={{ fontSize: '14px', position: 'absolute', userSelect: 'none' }}
        ref={MyChart.svgRef}
        width={MyChart.svgRect.right - MyChart.svgRect.left}
        height={MyChart.svgRect.bottom - MyChart.svgRect.top}
      >
        {/* Для вычисления высоты и ширины текста */}
        <text x={-100} y={-100} ref={MyChart.txtRef}>
          test
        </text>

        <SvgMarker
          id={'mrkVAxis'}
          cls={{ stroke: '#1d5395', strokeWidth: '2px', fill: 'none', strokeDasharray: '4 4' }}
          w={2}
          h={MyChart.chartRect.right - MyChart.chartRect.left}
          refX={0}
          refY={MyChart.chartRect.right - MyChart.chartRect.left}
          mrkEl={<line x2='0' y2={MyChart.chartRect.right - MyChart.chartRect.left} />}
        />

        <SvgMarker
          id={'mrkHAxis'}
          // cls='chart1i0i0-axis_hmarker'
          cls={{ stroke: '#1d5395', strokeWidth: '2px', fill: 'none' }}
          w={2}
          h={6}
          refX={0}
          refY={6}
          mrkEl={<line x2='0' y2='6' />}
        />

        {<ChartAxis axis={MyChart.axes2} />}

        {chartData && <ChartData chartData={chartData} rcChart={MyChart.chartRect} axes={MyChart.axes2} />}

        {MyChart.renderLabelsForHAxis('_id', chartData)}
        {MyChart.renderLabelsForVAxes()}
      </svg>
    </Box>
  );
};
