let ctx = null;
export function getTextWidth(text, font) {
  ctx = ctx || document.createElement('canvas').getContext('2d');
  ctx.font = font;
  return ctx.measureText(text).width;
}

export function addDays(d, days) {
  let temp = new Date(typeof d === 'number' ? d : d.valueOf());
  temp.setDate(temp.getDate() + days);
  return temp;
}

export function getMinDate(...dates) {
  let temp = dates.filter(d => d);
  if (temp.length) {
    return new Date(Math.min.apply(null, temp));
  }
  return null;
}

export function getMaxDate(...dates) {
  let temp = dates.filter(d => d);
  if (temp.length) {
    return new Date(Math.max.apply(null, temp));
  }
  return null;
}

export function padLeft(str, pad) {
  return String(pad + str).slice(-pad.length);
}

export function formatDate(date, format = 'YYYY-MM-dd') {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return format
    .replace('YYYY', y)
    .replace('MM', padLeft(m, '00'))
    .replace('dd', padLeft(d, '00'));
}

export function getMouseXY(element, e) {
  var rect = element.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

export function hitsElement(element, x, y) {
  return (
    x >= element.x && x <= element.x + element.width &&
    y >= element.y && y <= element.y + element.height
  );
}
