import h from './h';
import Gantt from './gantt';
import render from './render/string';
import { minDate, maxDate } from './utils';

export default class StrGantt {
  constructor(data, options = {}) {
    this.format(data);
    this.options = options;
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
  }
  setOptions(options) {
    this.options = { ...this.options, ...options };
  }
  render() {
    const {
      data, start, end, options
    } = this;
    const props = { ...options, start, end };
    return render(<Gantt data={data} {...props} />);
  }
}
