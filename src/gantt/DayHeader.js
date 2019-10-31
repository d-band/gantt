import h from '../h';
import { getDates } from '../utils';
import YearMonth from './YearMonth';

export default function DayHeader({
  styles, unit, minTime, maxTime, height, offsetY, maxTextWidth
}) {
  const dates = getDates(minTime, maxTime);
  const ticks = [];
  const x0 = maxTextWidth;
  const y0 = offsetY / 2;
  const RH = height - y0;
  const len = dates.length - 1;
  for (let i = 0; i < len; i++) {
    const cur = new Date(dates[i]);
    const day = cur.getDay();
    const x = x0 + (dates[i] - minTime) / unit;
    const t = (dates[i + 1] - dates[i]) / unit;
    ticks.push((
      <g>
        {day === 0 || day === 6 ? (
          <rect x={x} y={y0} width={t} height={RH} style={styles.week} />
        ) : null}
        <line x1={x} x2={x} y1={y0} y2={offsetY} style={styles.line} />
        <text x={x + t / 2} y={offsetY * 0.75} style={styles.text3}>{cur.getDate()}</text>
        {i === len - 1 ? (
          <line x1={x + t} x2={x + t} y1={y0} y2={offsetY} style={styles.line} />
        ) : null}
      </g>
    ));
  }
  return (
    <g>
      <YearMonth
        styles={styles}
        unit={unit}
        dates={dates}
        offsetY={offsetY}
        minTime={minTime}
        maxTime={maxTime}
        maxTextWidth={maxTextWidth}
      />
      {ticks}
    </g>
  );
}
