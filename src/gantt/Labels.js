import h from '../h';

export default function Labels({
  styles, data, rowHeight, offsetY
}) {
  return (
    <g>
      {data.map((v, i) => (
        <text
          key={i}
          x={10}
          y={(i + 0.5) * rowHeight + offsetY}
          style={
            v.group ? styles.groupLabel : styles.label
          }
        >{v.name}
        </text>
      ))}
    </g>
  );
}
