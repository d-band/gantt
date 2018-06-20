import h from '../h';

export default function Grid({
  styles, data, width, height, offsetY, thickWidth, rowHeight, footerHeight, maxTextWidth
}) {
  const W = width - thickWidth * 2;
  const H = height - footerHeight;
  return (
    <g>
      {data.map((v, i) => {
        if (!v.group) return null;
        const y = i * rowHeight + offsetY;
        return <rect x={thickWidth} y={y} width={W} height={rowHeight} style={styles.groupBg} />;
      })}
      {data.map((v, i) => {
        const y = (i + 1) * rowHeight + offsetY;
        return <line key={i} x1={0} x2={width} y1={y} y2={y} style={styles.line} />;
      })}
      <line x1={maxTextWidth} x2={maxTextWidth} y1={0} y2={H} style={styles.bline} />
    </g>
  );
}
