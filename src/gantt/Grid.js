import h from '../h';

export default function Grid({
  styles, data, width, height, offsetY, rowHeight, maxTextWidth
}) {
  return (
    <g>
      {data.map((v, i) => {
        const y = (i + 1) * rowHeight + offsetY;
        return <line key={i} x1={0} x2={width} y1={y} y2={y} style={styles.line} />;
      })}
      <line x1={maxTextWidth} x2={maxTextWidth} y1={0} y2={height} style={styles.bline} />
    </g>
  );
}
