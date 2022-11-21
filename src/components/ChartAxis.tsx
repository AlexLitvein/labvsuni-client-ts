import { AxesKey, IAxes } from '../types/types';
import { Axle } from './Axle';

export interface IChartAxisProps {
  axis: IAxes;
}

export function ChartAxis({ axis }: IChartAxisProps) {
  return (
    <>
      {(Object.keys(axis) as Array<AxesKey>).map((key) => (
        <Axle key={key} type={axis[key].type} cls={axis[key].class} />
      ))}
    </>
  );
}

// export function ChartAxis({ axis }: IChartAxisProps) {
//   return (
//     <>
//       {(Object.keys(axis) as Array<AxesKey>).map((key) => {
//         if (key !== '_id') {
//           return <Axle key={key} type={axis[key].type} cls={axis[key].class} />;
//         }
//       })}
//     </>
//   );
// }
