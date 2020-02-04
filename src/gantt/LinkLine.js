import h from '../h';
import { p2s } from '../utils';

export default function LinkLine({
  styles, data, unit, offsetY, minTime, rowHeight, barHeight, maxTextWidth
}) {
  const x0 = maxTextWidth;
  const y0 = (rowHeight / 2) + offsetY;
  const map = {};
  data.forEach((v, i) => {
    map[v.id] = i;
  });
  return (
    <g>
      {data.map((s, i) => {
        if (!s.end || !s.start || !s.links) {
          return null;
        }
        return s.links.map((l) => {
          const j = map[l.target];
          const e = data[j];

          if (!e || !e.start || !e.end) return null;

          const gap = 12;
          const arrow = 6;
          const mgap = e.type === 'milestone' ? barHeight / 2 : 0;
          const y1 = y0 + i * rowHeight;
          const y2 = y0 + j * rowHeight;

          let vgap = barHeight / 2 + 4;
          if (y1 > y2) {
            vgap = -vgap;
          }

          if (l.type === 'FS') {
            const x1 = x0 + (s.end - minTime) / unit;
            const x2 = x0 + (e.start - minTime) / unit - mgap;
            const p1 = [
              [x1, y1],
              [x1 + gap, y1]
            ];
            if (x2 - x1 >= 2 * gap) {
              p1.push([x1 + gap, y2]);
            } else {
              p1.push([x1 + gap, y2 - vgap]);
              p1.push([x2 - gap, y2 - vgap]);
              p1.push([x2 - gap, y2]);
            }
            p1.push([x2 - arrow, y2]);
            const p2 = [
              [x2 - arrow, y2 - arrow],
              [x2, y2],
              [x2 - arrow, y2 + arrow]
            ];
            return (
              <g>
                <polyline points={p2s(p1)} style={styles.link} />
                <polygon points={p2s(p2)} style={styles.linkArrow} />
              </g>
            );
          }
          if (l.type === 'FF') {
            const x1 = x0 + (s.end - minTime) / unit;
            const x2 = x0 + (e.end - minTime) / unit + mgap;
            const p1 = [
              [x1, y1],
              [x1 + gap, y1]
            ];
            if (x2 <= x1) {
              p1.push([x1 + gap, y2]);
            } else {
              p1.push([x1 + gap, y2 - vgap]);
              p1.push([x2 + gap, y2 - vgap]);
              p1.push([x2 + gap, y2]);
            }
            p1.push([x2 + arrow, y2]);
            const p2 = [
              [x2 + arrow, y2 - arrow],
              [x2, y2],
              [x2 + arrow, y2 + arrow]
            ];
            return (
              <g>
                <polyline points={p2s(p1)} style={styles.link} />
                <polygon points={p2s(p2)} style={styles.linkArrow} />
              </g>
            );
          }
          if (l.type === 'SS') {
            const x1 = x0 + (s.start - minTime) / unit;
            const x2 = x0 + (e.start - minTime) / unit - mgap;
            const p1 = [
              [x1, y1],
              [x1 - gap, y1]
            ];
            if (x1 <= x2) {
              p1.push([x1 - gap, y2]);
            } else {
              p1.push([x1 - gap, y2 - vgap]);
              p1.push([x2 - gap, y2 - vgap]);
              p1.push([x2 - gap, y2]);
            }
            p1.push([x2 - arrow, y2]);
            const p2 = [
              [x2 - arrow, y2 - arrow],
              [x2, y2],
              [x2 - arrow, y2 + arrow]
            ];
            return (
              <g>
                <polyline points={p2s(p1)} style={styles.link} />
                <polygon points={p2s(p2)} style={styles.linkArrow} />
              </g>
            );
          }
          if (l.type === 'SF') {
            const x1 = x0 + (s.start - minTime) / unit;
            const x2 = x0 + (e.end - minTime) / unit + mgap;
            const p1 = [
              [x1, y1],
              [x1 - gap, y1]
            ];
            if (x1 - x2 >= 2 * gap) {
              p1.push([x1 - gap, y2]);
            } else {
              p1.push([x1 - gap, y2 - vgap]);
              p1.push([x2 + gap, y2 - vgap]);
              p1.push([x2 + gap, y2]);
            }
            p1.push([x2 + arrow, y2]);
            const p2 = [
              [x2 + arrow, y2 - arrow],
              [x2, y2],
              [x2 + arrow, y2 + arrow]
            ];
            return (
              <g>
                <polyline points={p2s(p1)} style={styles.link} />
                <polygon points={p2s(p2)} style={styles.linkArrow} />
              </g>
            );
          }
          return null;
        });
      })}
    </g>
  );
}
