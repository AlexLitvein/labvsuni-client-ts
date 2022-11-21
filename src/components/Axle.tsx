import { AxisType } from '../types/types';
import { MyChart } from './Chart';

export interface IChartAxleProps {
  type: AxisType;
  cls: React.CSSProperties; //string;
}

export function Axle({ type, cls }: IChartAxleProps) {
  return type === AxisType.H ? (
    <path d={MyChart.buildHAxisPath()} style={cls} />
  ) : (
    <path d={MyChart.buildVAxisPath()} style={cls} />
  );
}
