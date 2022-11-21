export interface ISvgMarkerProps {
  id: string;
  cls: React.CSSProperties; // string;
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
        style={cls}
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
