import h from '../h';
import { getDates } from '../utils';
import Year from './Year';

export default function MonthHeader({
  styles, unit, minTime, maxTime, offsetY, maxTextWidth
}) {
  const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dates = getDates(minTime, maxTime);
  const months = dates.filter((v) => (new Date(v)).getDate() === 1);

  months.unshift(minTime);
  months.push(maxTime);

  const ticks = [];
  const x0 = maxTextWidth;
  const y0 = offsetY / 2;
  const len = months.length - 1;
  for (let i = 0; i < len; i++) {
    const cur = new Date(months[i]);
    const month = cur.getMonth();
    const x = x0 + (months[i] - minTime) / unit;
    const t = (months[i + 1] - months[i]) / unit;
    ticks.push((
      <g>
        <line x1={x} x2={x} y1={y0} y2={offsetY} style={styles.line} />
        {t > 30 ? (
          <text x={x + t / 2} y={offsetY * 0.75} style={styles.text3}>{MONTH[month]}</text>
        ) : null}
      </g>
    ));
  }
  return (
    <g>
      <Year
        styles={styles}
        unit={unit}
        months={months}
        offsetY={offsetY}
        minTime={minTime}
        maxTime={maxTime}
        maxTextWidth={maxTextWidth}
      />
      {ticks}
    </g>
  );
}
