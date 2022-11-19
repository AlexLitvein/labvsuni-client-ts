import { IAxisDefine } from '../init/init';
import { ChartAxle } from './ChartAxle';

export interface IChartAxisProps {
  axis: IAxisDefine;
}
// export function ChartAxis({ axis }: IChartAxisProps) {
//   const out = [];
//   let key: keyof IAxisDefine;
//   for (key in axis) {
//     const el = axis[key];
//     out.push(<ChartAxle key={key} type={el.type} cls={el.cls} />);
//   }
//   return out;
// }

export function ChartAxis({ axis }: IChartAxisProps) {
  // const out = [];
  // let key: keyof IAxisDefine;
  // for (key in axis) {
  //   const el = axis[key];
  //   out.push(<ChartAxle key={key} type={el.type} cls={el.cls} />);
  // }
  return (
    <>
      {(Object.keys(axis) as Array<keyof typeof axis>).map((key) => (
        <ChartAxle key={key} type={axis[key].type} cls={axis[key].cls} />
      ))}
    </>
  );
}
