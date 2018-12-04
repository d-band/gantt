import {
  SVGGantt,
  CanvasGantt,
  StrGantt,
  utils
} from '../src';
import { getData, formatXML } from './utils';

const $ = s => document.querySelector(s);
const { tasks, links } = getData();

const data = utils.formatData(tasks, links);
const opts = {
  viewMode: 'week',
  onClick: v => console.log(v)
};
const svgGantt = new SVGGantt('#svg', data, opts);
const canvasGantt = new CanvasGantt('#canvas', data, opts);
const strGantt = new StrGantt(data, opts);

function renderStr() {
  $('#str').textContent = formatXML(strGantt.render());
}

renderStr();

function changeOptions(options) {
  svgGantt.setOptions(options);
  canvasGantt.setOptions(options);
  strGantt.setOptions(options);
  renderStr();
}

function changeData() {
  const list = utils.formatData(tasks, links);
  svgGantt.setData(list);
  canvasGantt.setData(list);
  strGantt.setData(list);
  renderStr();
}
$('#viewMode').onchange = e => {
  const viewMode = e.target.value;
  changeOptions({ viewMode });
};
$('#showLinks').onchange = () => {
  const showLinks = $('#showLinks').checked;
  changeOptions({ showLinks });
};
$('#showDelay').onchange = () => {
  const showDelay = $('#showDelay').checked;
  changeOptions({ showDelay });
};
$('#autoSchedule').onclick = () => {
  utils.autoSchedule(tasks, links);
  changeData();
};

function addLink(s, e) {
  const sid = parseInt(s.dataset['id']);
  const eid = parseInt(e.dataset['id']);
  const snode = tasks.find(t => t.id === sid);
  const enode = tasks.find(t => t.id === eid);
  let stype = isStart(s) ? 'S' : 'F';
  let etype = isStart(e) ? 'S' : 'F';
  if (snode.type === 'milestone') {
    stype = 'F';
  }
  if (enode.type === 'milestone') {
    etype = 'S';
  }
  links.push({ source: sid, target: eid, type: `${stype}${etype}` });
  changeData();
}

const NS = 'http://www.w3.org/2000/svg';

let $svg = null;
let moving = false;
let $start = null;
let $line = null;

function isStart(el) {
  return el.classList.contains('gantt-ctrl-start');
}

function isFinish(el) {
  return el.classList.contains('gantt-ctrl-finish');
}

document.onmousedown = (e) => {
  $svg = $('svg');
  if (!isStart(e.target) && !isFinish(e.target)) {
    return;
  }
  e.preventDefault();
  $start = e.target;
  document.querySelectorAll('.gantt-ctrl-start,.gantt-ctrl-finish').forEach(elem => {
    elem.style['display'] = 'block';
  });
  moving = true;
  $line = document.createElementNS(NS, 'line');
  const x = $start.getAttribute('cx');
  const y = $start.getAttribute('cy');
  $line.setAttribute('x1', x);
  $line.setAttribute('y1', y);
  $line.setAttribute('x2', x);
  $line.setAttribute('y2', y);
  $line.style['stroke'] = '#ffa011';
  $line.style['stroke-width'] = '2';
  $line.style['stroke-dasharray'] = '5';
  $svg.appendChild($line);
};

document.onmousemove = (e) => {
  if (!moving) return;
  e.preventDefault();
  if (isStart(e.target) || isFinish(e.target)) {
    const x = e.target.getAttribute('cx');
    const y = e.target.getAttribute('cy');
    $line.setAttribute('x2', x);
    $line.setAttribute('y2', y);
  } else {
    const x = e.clientX;
    const y = e.clientY;
    const rect = $svg.getBoundingClientRect();
    $line.setAttribute('x2', x - rect.left);
    $line.setAttribute('y2', y - rect.top);
  }
};

document.onmouseup = (e) => {
  if (!moving) return;
  e.preventDefault();
  const isCtrl = isStart(e.target) || isFinish(e.target);
  if ($start && isCtrl) {
    addLink($start, e.target);
  }

  document.querySelectorAll('.gantt-ctrl-start,.gantt-ctrl-finish').forEach(elem => {
    elem.style['display'] = 'none';
  });
  moving = false;
  if ($start) {
    $start.style['display'] = 'none';
    $start = null;
  }
  if ($line) {
    $svg.removeChild($line);
    $line = null;
  }
};
