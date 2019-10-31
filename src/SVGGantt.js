import h from './h';
import Gantt from './gantt';
import render from './render/svg';
import { getFont } from './gantt/styles';
import {
  minDate, maxDate, textWidth, max
} from './utils';

export default class SVGGantt {
  constructor(element, data, options = {}) {
    this.dom = typeof element === 'string' ? document.querySelector(element) : element;
    this.format(data);
    this.options = options;
    this.render();
  }
  format(data) {
    this.data = data;
    let start = null;
    let end = null;
    data.forEach((v) => {
      start = minDate(start, v.start);
      end = maxDate(end, v.end);
    });
    this.start = start || new Date();
    this.end = end || new Date();
  }
  setData(data) {
    this.format(data);
    this.render();
  }
  setOptions(options) {
    this.options = { ...this.options, ...options };
    this.render();
  }
  render() {
    const {
      data, start, end, options
    } = this;
    if (this.tree) {
      this.dom.removeChild(this.tree);
    }
    if (options.maxTextWidth === undefined) {
      const font = getFont(options.styleOptions || {});
      const w = (v) => textWidth(v.text, font, 20);
      options.maxTextWidth = max(data.map(w), 0);
    }
    const props = { ...options, start, end };
    this.tree = render(<Gantt data={data} {...props} />);
    this.dom.appendChild(this.tree);
  }
}
