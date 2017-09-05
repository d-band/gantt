const SIZE = '14px';
const TYPE = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export function getFont({
  fontSize = SIZE,
  fontFamily = TYPE
}) {
  return `bold ${fontSize} ${fontFamily}`;
}

export default function getStyles({
  BG = '#fff',
  groupBG = '#f5f5f5',
  lineColor = '#eee',
  redLineColor = '#f04134',
  baseBar = '#b8c2cc',
  greenBar = '#00a854',
  redBar = '#f04134',
  textColor = '#222',
  lightTextColor = '#999',
  lineWidth = '1px',
  thickLineWidth = '1.4px',
  fontSize = SIZE,
  smallFontSize = '12px',
  fontFamily = TYPE
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
    'font-family': fontFamily
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
      fill: BG
    },
    line,
    cline: redLine,
    bline: thickLine,
    group: {
      fill: groupBG
    },
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
    bar: {
      fill: baseBar
    },
    green: {
      fill: greenBar
    },
    red: {
      fill: redBar
    }
  };
}
