Gantt Chart
===========

> Gantt chart library using jsx support SVG, Canvas and SSR

[![NPM version](https://img.shields.io/npm/v/gantt.svg)](https://www.npmjs.com/package/gantt)
[![NPM downloads](https://img.shields.io/npm/dm/gantt.svg)](https://www.npmjs.com/package/gantt)
[![Greenkeeper badge](https://badges.greenkeeper.io/d-band/gantt.svg)](https://greenkeeper.io/)

## Install

```bash
$ npm install gantt --save
```

## Usage

[View demo online](https://d-band.github.io/gantt/)

```javascript
import { SVGGantt, CanvasGantt, StrGantt } from 'gantt';

const data = [{
  id: 1,
  type: 'group',
  text: '1 Waterfall model',
  start: new Date('2018-10-10T09:24:24.319Z'),
  end: new Date('2018-12-12T09:32:51.245Z'),
  percent: 0.71,
  links: []
}, {
  id: 11,
  parent: 1,
  text: '1.1 Requirements',
  start: new Date('2018-10-21T09:24:24.319Z'),
  end: new Date('2018-11-22T01:01:08.938Z'),
  percent: 0.29,
  links: [{
    id: 12,
    type: 'FS'
  }]
}, {
  id: 12,
  parent: 1,
  text: '1.2 Design',
  start: new Date('2018-11-05T09:24:24.319Z'),
  end: new Date('2018-12-12T09:32:51.245Z'),
  percent: 0.78,
}];

new SVGGantt('#svg-root', data, {
  viewMode: 'week'
});

new CanvasGantt('#canvas-root', data, {
  viewMode: 'week'
});

const strGantt = new StrGantt(data, {
  viewMode: 'week'
});
this.body = strGantt.render();
```

![image](demo/image.png)

## Options

```javascript
{
  // View mode: day/week/month
  viewMode: 'week',
  onClick: (item) => {},
  offsetY: 60,
  rowHeight: 40,
  barHeight: 16,
  thickWidth: 1.4,
  styleOptions: {
    bgColor: '#fff',
    lineColor: '#eee',
    redLineColor: '#f04134',
    groupBack: '#3db9d3',
    groupFront: '#299cb4',
    taskBack: '#65c16f',
    taskFront: '#46ad51',
    milestone: '#d33daf',
    warning: '#faad14',
    danger: '#f5222d',
    link: '#ffa011',
    textColor: '#222',
    lightTextColor: '#999',
    lineWidth: '1px',
    thickLineWidth: '1.4px',
    fontSize: '14px',
    smallFontSize: '12px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  }
}
```

## Report a issue

* [All issues](https://github.com/d-band/gantt/issues)
* [New issue](https://github.com/d-band/gantt/issues/new)

## License

Gantt is available under the terms of the MIT License.
