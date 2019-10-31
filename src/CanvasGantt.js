import h from './h';
import Gantt from './gantt';
import render from './render/canvas';
import createContext from './context';
import { getFont } from './gantt/styles';
import {
  minDate, maxDate, textWidth, max
} from './utils';

export default class CanvasGantt {
  constructor(element, data, options = {}) {
    this.ctx = createContext(element);
    this.format(data);
    this.options = options;
    this.render();
    this.ctx.onClick = (e) => this.render(e);
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
  render(e) {
    const {
      data, start, end, options
    } = this;
    if (options.maxTextWidth === undefined) {
      const font = getFont(options.styleOptions || {});
      const w = (v) => textWidth(v.text, font, 20);
      options.maxTextWidth = max(data.map(w), 0);
    }
    const props = { ...options, start, end };
    render(<Gantt data={data} {...props} />, this.ctx, e);
  }
}
