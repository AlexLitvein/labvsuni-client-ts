export interface ISvgMarkerProps {
  id: string;
  cls: string;
  w: number;
  h: number;
  refX: number;
  refY: number;
  mrkEl: React.ReactNode;
}

export const SvgMarker = ({ id, cls, w, h, refX, refY, mrkEl }: ISvgMarkerProps) => {
  // export const SvgMarker = ({ id, className, w, h, refX, refY, mrkEl }) => {
  return (
    <defs>
      <marker
        id={id}
        className={cls}
        // className={className}
        markerWidth={w}
        markerHeight={h}
        refX={refX}
        refY={refY}
        orient='auto'
        markerUnits='userSpaceOnUse'
      >
        {mrkEl}
      </marker>
    </defs>
  );
};
