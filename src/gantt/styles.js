const SIZE = '14px';
const TYPE = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export function getFont({
  fontSize = SIZE,
  fontFamily = TYPE
}) {
  return `bold ${fontSize} ${fontFamily}`;
}

export default function getStyles({
  bgColor = '#fff',
  lineColor = '#eee',
  redLineColor = '#f04134',
  groupBack = '#3db9d3',
  groupFront = '#299cb4',
  taskBack = '#65c16f',
  taskFront = '#46ad51',
  milestone = '#d33daf',
  warning = '#faad14',
  danger = '#f5222d',
  link = '#ffa011',
  textColor = '#222',
  lightTextColor = '#999',
  lineWidth = '1px',
  thickLineWidth = '1.4px',
  fontSize = SIZE,
  smallFontSize = '12px',
  fontFamily = TYPE,
  whiteSpace = 'pre'
}) {
  const line = {
    stroke: lineColor,
    'stroke-width': lineWidth
  };
  const redLine = {
    stroke: redLineColor,
    'stroke-width': lineWidth
  };
  const thickLine = {
    stroke: lineColor,
    'stroke-width': thickLineWidth
  };
  const text = {
    fill: textColor,
    'dominant-baseline': 'central',
    'font-size': fontSize,
    'font-family': fontFamily,
    'white-space': whiteSpace
  };
  const smallText = {
    fill: lightTextColor,
    'font-size': smallFontSize
  };
  return {
    week: {
      fill: 'rgba(252, 248, 227, .6)'
    },
    box: {
      ...thickLine,
      fill: bgColor
    },
    line,
    cline: redLine,
    bline: thickLine,
    label: text,
    groupLabel: {
      ...text,
      'font-weight': '600'
    },
    text1: {
      ...text,
      ...smallText,
      'text-anchor': 'end'
    },
    text2: {
      ...text,
      ...smallText
    },
    text3: {
      ...text,
      ...smallText,
      'text-anchor': 'middle'
    },
    link: {
      stroke: link,
      'stroke-width': '1.5px',
      fill: 'none'
    },
    linkArrow: {
      fill: link
    },
    milestone: {
      fill: milestone
    },
    groupBack: {
      fill: groupBack
    },
    groupFront: {
      fill: groupFront
    },
    taskBack: {
      fill: taskBack
    },
    taskFront: {
      fill: taskFront
    },
    warning: {
      fill: warning
    },
    danger: {
      fill: danger
    },
    ctrl: {
      display: 'none',
      fill: '#f0f0f0',
      stroke: '#929292',
      'stroke-width': '1px'
    }
  };
}
