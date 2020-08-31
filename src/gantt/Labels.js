import h from '../h';

export default function Labels({
  styles, data, onClick, rowHeight, offsetY
}) {
  return (
    <g>
      {data.map((v, i) => (
        <text
          key={i}
          x={10}
          y={(i + 0.5) * rowHeight + offsetY}
          class="gantt-label"
          style={styles.label}
          onClick={() => onClick(v)}
        >
          {v.text}
        </text>
      ))}
    </g>
  );
}
