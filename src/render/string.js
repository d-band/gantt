function attrEscape(str) {
  return String(str).replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/\t/g, '&#x9;')
    .replace(/\n/g, '&#xA;')
    .replace(/\r/g, '&#xD;');
}
function escape(str) {
  return String(str).replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\r/g, '&#xD;');
}

export default function render(vnode, ctx) {
  const { tag, props, children } = vnode;
  const tokens = [];
  tokens.push(`<${tag}`);

  Object.keys(props || {}).forEach((k) => {
    let v = props[k];
    if (k === 'onClick') return;
    if (k === 'style' && typeof v === 'object') {
      v = Object.keys(v).map((i) => `${i}:${v[i]};`).join('');
    }
    tokens.push(` ${k}="${attrEscape(v)}"`);
  });

  if (!children || !children.length) {
    tokens.push(' />');
    return tokens.join('');
  }

  tokens.push('>');

  children.forEach((v) => {
    if (typeof v === 'string') {
      tokens.push(escape(v));
    } else {
      tokens.push(render(v, ctx));
    }
  });

  tokens.push(`</${tag}>`);
  return tokens.join('');
}
