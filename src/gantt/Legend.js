import h from '../h';

export default function Legend({ styles, legends, width, height, barHeight, footerHeight }) {
  const W = 100;
  const len = legends.length;
  return (
    <g>
      {legends.map((v, i) => {
        const x = (width - len * W) / 2 + i * W;
        const y = height - (footerHeight / 2);
        const RY = y - (barHeight / 2);
        return (
          <g key={i}>
            <rect x={x} y={RY} width={barHeight} height={barHeight} style={styles[v.type]} />
            <text x={x + barHeight + 10} y={y} style={styles.label}>{v.name}</text>
          </g>
        );
      })}
    </g>
  );
}
