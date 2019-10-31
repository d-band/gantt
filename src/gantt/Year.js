import h from '../h';

export default function Year({
  styles, months, unit, offsetY, minTime, maxTime, maxTextWidth
}) {
  const years = months.filter((v) => (new Date(v)).getMonth() === 0);

  years.unshift(minTime);
  years.push(maxTime);

  const ticks = [];
  const x0 = maxTextWidth;
  const y2 = offsetY / 2;
  const len = years.length - 1;
  for (let i = 0; i < len; i++) {
    const cur = new Date(years[i]);
    const x = x0 + (years[i] - minTime) / unit;
    const t = (years[i + 1] - years[i]) / unit;
    ticks.push((
      <g>
        <line x1={x} x2={x} y1={0} y2={y2} style={styles.line} />
        {t > 35 ? (
          <text x={x + t / 2} y={offsetY * 0.25} style={styles.text3}>{cur.getFullYear()}</text>
        ) : null}
      </g>
    ));
  }
  return <g>{ticks}</g>;
}
