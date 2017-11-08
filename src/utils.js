export const DAY = 24 * 3600 * 1000;

export function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}

export function getDates(begin, end) {
  const dates = [];
  const s = new Date(begin);
  s.setHours(24, 0, 0, 0);
  while (s.getTime() <= end) {
    dates.push(s.getTime());
    addDays(s, 1);
  }
  return dates;
}

let ctx = null;
export function textWidth(text, font, pad) {
  ctx = ctx || document.createElement('canvas').getContext('2d');
  ctx.font = font;
  return ctx.measureText(text).width + pad;
}

export function formatMonth(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  return `${y}/${m > 9 ? m : `0${m}`}`;
}

export function formatDay(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${m}/${d}`;
}

export function formatData(data) {
  const list = [];
  data.forEach((v) => {
    const min = Math.min.apply(null, v.children.map(c => c.from));
    const max = Math.max.apply(null, v.children.map(c => c.to));
    let percent = v.children.reduce((p, c) => p + c.percent, 0);
    if (v.children.length) {
      percent /= v.children.length;
    }

    list.push({
      id: v.id,
      group: true,
      name: v.name,
      from: min,
      to: max,
      percent
    });
    v.children.forEach((c) => {
      list.push({
        id: c.id,
        name: c.name,
        from: c.from.getTime(),
        to: c.to.getTime(),
        percent: c.percent,
      });
    });
  });
  return list;
}
