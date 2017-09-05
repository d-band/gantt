function addChild(c, childNodes) {
  if (c === null || c === undefined) return;

  if (typeof c === 'string' || typeof c === 'number') {
    childNodes.push(c.toString());
  } else if (Array.isArray(c)) {
    for (let i = 0; i < c.length; i++) {
      addChild(c[i], childNodes);
    }
  } else {
    childNodes.push(c);
  }
}

export default function h(tag, props, ...children) {
  const childNodes = [];
  addChild(children, childNodes);

  if (typeof tag === 'function') {
    return tag({ ...props, children: childNodes });
  }

  return {
    tag,
    props,
    children: childNodes
  };
}
