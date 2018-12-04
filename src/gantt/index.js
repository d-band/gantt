import h from '../h';
import { DAY } from '../utils';
import Layout from './Layout';
import DayHeader from './DayHeader';
import WeekHeader from './WeekHeader';
import MonthHeader from './MonthHeader';
import Grid from './Grid';
import Labels from './Labels';
import LinkLine from './LinkLine';
import Bar from './Bar';
import getStyles from './styles';

const UNIT = {
  day: DAY / 28,
  week: 7 * DAY / 56,
  month: 30 * DAY / 56
};
function NOOP() {}

export default function Gantt({
  data = [],
  onClick = NOOP,
  viewMode = 'week',
  maxTextWidth = 140,
  offsetY = 60,
  rowHeight = 40,
  barHeight = 16,
  thickWidth = 1.4,
  styleOptions = {},
  showLinks = true,
  showDelay = true,
  start,
  end
}) {
  const unit = UNIT[viewMode];
  const minTime = start.getTime() - unit * 48;
  const maxTime = end.getTime() + unit * 48;

  const width = (maxTime - minTime) / unit + maxTextWidth;
  const height = data.length * rowHeight + offsetY;
  const box = `0 0 ${width} ${height}`;
  const current = Date.now();
  const styles = getStyles(styleOptions);

  return (
    <svg width={width} height={height} viewBox={box}>
      <Layout
        styles={styles}
        width={width}
        height={height}
        offsetY={offsetY}
        thickWidth={thickWidth}
        maxTextWidth={maxTextWidth}
      />
      {viewMode === 'day' ? (
        <DayHeader
          styles={styles}
          unit={unit}
          height={height}
          offsetY={offsetY}
          minTime={minTime}
          maxTime={maxTime}
          maxTextWidth={maxTextWidth}
        />
      ) : null}
      {viewMode === 'week' ? (
        <WeekHeader
          styles={styles}
          unit={unit}
          height={height}
          offsetY={offsetY}
          minTime={minTime}
          maxTime={maxTime}
          maxTextWidth={maxTextWidth}
        />
      ) : null}
      {viewMode === 'month' ? (
        <MonthHeader
          styles={styles}
          unit={unit}
          offsetY={offsetY}
          minTime={minTime}
          maxTime={maxTime}
          maxTextWidth={maxTextWidth}
        />
      ) : null}
      <Grid
        styles={styles}
        data={data}
        width={width}
        height={height}
        offsetY={offsetY}
        rowHeight={rowHeight}
        maxTextWidth={maxTextWidth}
      />
      {maxTextWidth > 0 ? (
        <Labels
          styles={styles}
          data={data}
          offsetY={offsetY}
          rowHeight={rowHeight}
        />
      ) : null}
      {showLinks ? (
        <LinkLine
          styles={styles}
          data={data}
          unit={unit}
          height={height}
          current={current}
          offsetY={offsetY}
          minTime={minTime}
          onClick={onClick}
          rowHeight={rowHeight}
          barHeight={barHeight}
          maxTextWidth={maxTextWidth}
        />
      ) : null}
      <Bar
        styles={styles}
        data={data}
        unit={unit}
        height={height}
        current={current}
        offsetY={offsetY}
        minTime={minTime}
        onClick={onClick}
        showDelay={showDelay}
        rowHeight={rowHeight}
        barHeight={barHeight}
        maxTextWidth={maxTextWidth}
      />
    </svg>
  );
}
