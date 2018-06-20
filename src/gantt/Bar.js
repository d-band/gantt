import h from '../h';
import { formatDay } from '../utils';

export default function Bar({
  styles, data, unit, height, offsetY, minTime, rowHeight, barHeight, footerHeight, maxTextWidth, current, onClick
}) {
  const x0 = maxTextWidth;
  const y0 = (rowHeight - barHeight) / 2 + offsetY;
  const cur = x0 + (current - minTime) / unit;
  return (
    <g>
      <line x1={cur} x2={cur} y1={offsetY} y2={height - footerHeight} style={styles.cline} />
      {data.map((v, i) => {
        const w1 = (v.to - v.from) / unit;
        const w2 = w1 * v.percent;
        const x = x0 + (v.from - minTime) / unit;
        const y = y0 + i * rowHeight;
        const TY = y + barHeight / 2;
        let type = 'green';
        if ((x + w2) < cur && v.percent < 0.999999) {
          type = 'red';
        }
        if (v.group) {
          type = 'group';
        }
        const handler = () => onClick(v);
        return (
          <g key={i} style={{ cursor: 'pointer' }} onClick={handler}>
            <text x={x - 4} y={TY} style={styles.text1}>{formatDay(new Date(v.from))}</text>
            <text x={x + w1 + 4} y={TY} style={styles.text2}>{formatDay(new Date(v.to))}</text>
            <rect x={x} y={y} width={w1} height={barHeight} rx={1.8} ry={1.8} style={styles.bar} onClick={handler} />
            {w2 > 0.000001 ? <rect x={x} y={y} width={w2} height={barHeight} rx={1.8} ry={1.8} style={styles[type]} /> : null}
          </g>
        );
      })}
    </g>
  );
}
