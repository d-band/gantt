import h from './h';
import Gantt from './gantt';
import render from './render/string';
import { formatData } from './utils';

export default class StrGantt {
  constructor(data, options = {}) {
    this.data = formatData(data);
    this.options = options;
  }
  setData(data) {
    this.data = formatData(data);
  }
  setOptions(options) {
    this.options = { ...this.options, ...options };
  }
  render() {
    const { data, options } = this;
    return render(<Gantt data={data} {...options} />);
  }
}
