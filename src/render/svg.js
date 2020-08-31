const NS = 'http://www.w3.org/2000/svg';
const doc = document;

function applyProperties(node, props) {
  Object.keys(props).forEach((k) => {
    const v = props[k];
    if (k === 'style' && typeof v === 'object') {
      Object.keys(v).forEach((sk) => {
        // eslint-disable-next-line
        node.style[sk] = v[sk];
      });
    } else if (k === 'onClick') {
      if (typeof v === 'function') {
        node.addEventListener('click', v);
      }
    } else {
      node.setAttribute(k, v);
    }
  });
}

export default function render(vnode, ctx) {
  const { tag, props, children } = vnode;
  const node = doc.createElementNS(NS, tag);

  if (props) {
    applyProperties(node, props);
  }

  children.forEach((v) => {
    node.appendChild(typeof v === 'string' ? doc.createTextNode(v) : render(v, ctx));
  });
  return node;
}
