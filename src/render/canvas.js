import { s2p } from '../utils';

export default function render(vnode, ctx, e) {
  const { tag, props, children } = vnode;
  if (tag === 'svg') {
    const { width, height } = props;
    ctx.width = width;
    ctx.height = height;
  }
  if (tag === 'line') {
    const {
      x1, x2, y1, y2, style = {}
    } = props;
    if (style.stroke) {
      ctx.strokeStyle = style.stroke;
      ctx.lineWidth = parseFloat(style['stroke-width'] || 1);
    }
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  if (tag === 'polyline' || tag === 'polygon') {
    const { points, style = {} } = props;
    const p = s2p(points);
    if (style.stroke) {
      ctx.strokeStyle = style.stroke;
      ctx.lineWidth = parseFloat(style['stroke-width'] || 1);
    }
    if (style.fill) {
      ctx.fillStyle = style.fill;
    }
    ctx.beginPath();
    ctx.moveTo(p[0][0], p[0][1]);
    for (let i = 1; i < p.length; i++) {
      ctx.lineTo(p[i][0], p[i][1]);
    }
    if (tag === 'polyline') {
      ctx.stroke();
    } else {
      ctx.fill();
    }
  }
  if (tag === 'rect') {
    const {
      x, y, width, height, rx = 0, ry = 0, onClick, style = {}
    } = props;

    // From https://github.com/canvg/canvg
    ctx.beginPath();
    ctx.moveTo(x + rx, y);
    ctx.lineTo(x + width - rx, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + ry);
    ctx.lineTo(x + width, y + height - ry);
    ctx.quadraticCurveTo(x + width, y + height, x + width - rx, y + height);
    ctx.lineTo(x + rx, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - ry);
    ctx.lineTo(x, y + ry);
    ctx.quadraticCurveTo(x, y, x + rx, y);
    if (e && onClick && ctx.isPointInPath(e.x, e.y)) {
      onClick();
    }
    ctx.closePath();

    if (style.fill) {
      ctx.fillStyle = style.fill;
    }
    ctx.fill();
    if (style.stroke) {
      ctx.strokeStyle = style.stroke;
      ctx.lineWidth = parseFloat(style['stroke-width'] || 1);
      ctx.stroke();
    }
  }
  if (tag === 'text') {
    const { x, y, style } = props;
    if (style) {
      ctx.fillStyle = style.fill;
      const BL = {
        central: 'middle',
        middle: 'middle',
        hanging: 'hanging',
        alphabetic: 'alphabetic',
        ideographic: 'ideographic'
      };
      const AL = {
        start: 'start',
        middle: 'center',
        end: 'end'
      };
      ctx.textBaseline = BL[style['dominant-baseline']] || 'alphabetic';
      ctx.textAlign = AL[style['text-anchor']] || 'start';
      ctx.font = `${style['font-weight'] || ''} ${style['font-size']} ${style['font-family']}`;
    }
    ctx.fillText(children.join(''), x, y);
  }

  children.forEach((v) => {
    if (typeof v !== 'string') {
      render(v, ctx, e);
    }
  });
}
