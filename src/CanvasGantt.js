import h from './h';
import Gantt from './gantt';
import render from './render/canvas';
import createContext from './context';
import { getFont } from './gantt/styles';
import { formatData, textWidth } from './utils';

export default class CanvasGantt {
  constructor(element, data, options = {}) {
    this.ctx = createContext(element);
    this.data = formatData(data);
    this.options = options;
    this.render();
  }
  setData(data) {
    this.data = formatData(data);
    this.render();
  }
  setOptions(options) {
    this.options = { ...this.options, ...options };
    this.render();
  }
  render() {
    const { data, options } = this;
    if (!options.maxTextWidth) {
      const font = getFont(options.styleOptions || {});
      options.maxTextWidth = Math.max.apply(null, data.map(
        v => textWidth(v.name, font, 20)
      ));
    }
    render(<Gantt data={data} {...options} />, this.ctx);
  }
}
