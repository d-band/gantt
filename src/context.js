export default function createContext(dom) {
  const canvas = typeof dom === 'string' ? document.querySelector(dom) : dom;
  const ctx = canvas.getContext('2d');
  const backingStore = ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1;
  const ratio = (window.devicePixelRatio || 1) / backingStore;

  ['width', 'height'].forEach((key) => {
    Object.defineProperty(ctx, key, {
      get() {
        return canvas[key] / ratio;
      },
      set(v) {
        canvas[key] = v * ratio;
        canvas.style[key] = `${v}px`;
        ctx.scale(ratio, ratio);
      },
      enumerable: true,
      configurable: true
    });
  });
  canvas.addEventListener('click', (e) => {
    if (!ctx.onClick) return;
    const rect = canvas.getBoundingClientRect();
    ctx.onClick({
      x: (e.clientX - rect.left) * ratio,
      y: (e.clientY - rect.top) * ratio
    });
  });
  return ctx;
}
