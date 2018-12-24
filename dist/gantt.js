(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.Gantt = {}));
}(this, function (exports) { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _extends_1 = createCommonjsModule(function (module) {
	function _extends() {
	  module.exports = _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	module.exports = _extends;
	});

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var defineProperty = _defineProperty;

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}

	var objectSpread = _objectSpread;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	function addChild(c, childNodes) {
	  if (c === null || c === undefined) return;

	  if (typeof c === 'string' || typeof c === 'number') {
	    childNodes.push(c.toString());
	  } else if (Array.isArray(c)) {
	    for (var i = 0; i < c.length; i++) {
	      addChild(c[i], childNodes);
	    }
	  } else {
	    childNodes.push(c);
	  }
	}

	function h(tag, props) {
	  var childNodes = [];

	  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    children[_key - 2] = arguments[_key];
	  }

	  addChild(children, childNodes);

	  if (typeof tag === 'function') {
	    return tag(objectSpread({}, props, {
	      children: childNodes
	    }));
	  }

	  return {
	    tag: tag,
	    props: props,
	    children: childNodes
	  };
	}

	var DAY = 24 * 3600 * 1000;
	function addDays(date, days) {
	  return new Date(date.valueOf() + days * DAY);
	}
	function getDates(begin, end) {
	  var dates = [];
	  var s = new Date(begin);
	  s.setHours(24, 0, 0, 0);

	  while (s.getTime() <= end) {
	    dates.push(s.getTime());
	    s = addDays(s, 1);
	  }

	  return dates;
	}
	var ctx = null;
	function textWidth(text, font, pad) {
	  ctx = ctx || document.createElement('canvas').getContext('2d');
	  ctx.font = font;
	  return ctx.measureText(text).width + pad;
	}
	function formatMonth(date) {
	  var y = date.getFullYear();
	  var m = date.getMonth() + 1;
	  return "".concat(y, "/").concat(m > 9 ? m : "0".concat(m));
	}
	function formatDay(date) {
	  var m = date.getMonth() + 1;
	  var d = date.getDate();
	  return "".concat(m, "/").concat(d);
	}
	function minDate(a, b) {
	  if (a && b) {
	    return a > b ? b : a;
	  }

	  return a || b;
	}
	function maxDate(a, b) {
	  if (a && b) {
	    return a < b ? b : a;
	  }

	  return a || b;
	}
	function max(list, defaultValue) {
	  if (list.length) {
	    return Math.max.apply(null, list);
	  }

	  return defaultValue;
	}
	function p2s(arr) {
	  return arr.map(function (p) {
	    return "".concat(p[0], ",").concat(p[1]);
	  }).join(' ');
	}
	function s2p(str) {
	  return str.split(' ').map(function (s) {
	    var p = s.split(',');
	    return [parseFloat(p[0]), parseFloat(p[1])];
	  });
	}

	function walkLevel(nodes, level) {
	  for (var i = 0; i < nodes.length; i++) {
	    var node = nodes[i];
	    node.level = "".concat(level).concat(i + 1);
	    node.text = "".concat(node.level, " ").concat(node.name);
	    walkLevel(node.children, "".concat(node.level, "."));
	  }
	}

	function walkDates(nodes) {
	  var start = null;
	  var end = null;
	  var percent = 0;

	  for (var i = 0; i < nodes.length; i++) {
	    var node = nodes[i];

	    if (node.children.length) {
	      var tmp = walkDates(node.children);
	      node.start = tmp.start;
	      node.end = tmp.end;
	      node.percent = tmp.percent;

	      if (tmp.start && tmp.end) {
	        node.duration = (tmp.end - tmp.start) / DAY;
	      } else {
	        node.duration = 0;
	      }
	    } else {
	      node.percent = node.percent || 0;

	      if (node.start) {
	        node.end = addDays(node.start, node.duration || 0);
	      }

	      if (node.type === 'milestone') {
	        node.end = node.start;
	      }
	    }

	    start = minDate(start, node.start);
	    end = maxDate(end, node.end);
	    percent += node.percent;
	  }

	  if (nodes.length) {
	    percent /= nodes.length;
	  }

	  return {
	    start: start,
	    end: end,
	    percent: percent
	  };
	}

	function formatData(tasks, links, walk) {
	  var map = {};
	  var tmp = tasks.map(function (t, i) {
	    map[t.id] = i;
	    return objectSpread({}, t, {
	      children: [],
	      links: []
	    });
	  });
	  var roots = [];
	  tmp.forEach(function (t) {
	    var parent = tmp[map[t.parent]];

	    if (parent) {
	      parent.children.push(t);
	    } else {
	      roots.push(t);
	    }
	  });
	  links.forEach(function (l) {
	    var s = tmp[map[l.source]];
	    var t = tmp[map[l.target]];

	    if (s && t) {
	      s.links.push(l);
	    }
	  });
	  walkLevel(roots, '');
	  walkDates(roots);

	  if (walk) {
	    walk(roots);
	  }

	  var list = [];
	  roots.forEach(function (r) {
	    var stack = [];
	    stack.push(r);

	    while (stack.length) {
	      var node = stack.pop();
	      var len = node.children.length;

	      if (len) {
	        node.type = 'group';
	      }

	      list.push(node);

	      for (var i = len - 1; i >= 0; i--) {
	        stack.push(node.children[i]);
	      }
	    }
	  });
	  return list;
	}
	function hasPath(vmap, a, b) {
	  var stack = [];
	  stack.push(vmap[a]);

	  while (stack.length) {
	    var v = stack.pop();

	    if (v.id === b) {
	      return true;
	    }

	    for (var i = 0; i < v.links.length; i++) {
	      stack.push(v.links[i]);
	    }
	  }

	  return false;
	}
	function toposort(links) {
	  var vmap = {};
	  links.forEach(function (l) {
	    var init = function init(id) {
	      return {
	        id: id,
	        out: [],
	        in: 0
	      };
	    };

	    vmap[l.source] = init(l.source);
	    vmap[l.target] = init(l.target);
	  });

	  for (var i = 0; i < links.length; i++) {
	    var l = links[i];
	    vmap[l.target].in++;
	    vmap[l.source].out.push(i);
	  }

	  var s = Object.keys(vmap).map(function (k) {
	    return vmap[k].id;
	  }).filter(function (id) {
	    return !vmap[id].in;
	  });
	  var sorted = [];

	  while (s.length) {
	    var id = s.pop();
	    sorted.push(id);

	    for (var _i = 0; _i < vmap[id].out.length; _i++) {
	      var index = vmap[id].out[_i];
	      var v = vmap[links[index].target];
	      v.in--;

	      if (!v.in) {
	        s.push(v.id);
	      }
	    }
	  }

	  return sorted;
	}
	function autoSchedule(tasks, links) {
	  var lockMilestone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	  var vmap = {};
	  links.forEach(function (l) {
	    vmap[l.source] = {
	      id: l.source,
	      links: []
	    };
	    vmap[l.target] = {
	      id: l.target,
	      links: []
	    };
	  });
	  var dag = [];
	  links.forEach(function (l) {
	    var source = l.source,
	        target = l.target;

	    if (!hasPath(vmap, target, source)) {
	      dag.push(l);
	      vmap[source].links.push(vmap[target]);
	    }
	  });
	  var sorted = toposort(dag);
	  var tmap = {};

	  for (var i = 0; i < tasks.length; i++) {
	    var task = tasks[i];

	    if (task.type === 'milestone') {
	      task.duration = 0;
	    }

	    tmap[task.id] = i;
	  }

	  var ins = {};
	  sorted.forEach(function (id) {
	    ins[id] = [];
	  });
	  dag.forEach(function (l) {
	    ins[l.target].push(l);
	  });
	  sorted.forEach(function (id) {
	    var task = tasks[tmap[id]];
	    var days = task.duration || 0;

	    if (lockMilestone && task.type === 'milestone') {
	      return;
	    }

	    var start = null;
	    var end = null;

	    for (var _i2 = 0; _i2 < ins[id].length; _i2++) {
	      var l = ins[id][_i2];
	      var v = tasks[tmap[l.source]];

	      if (v.start) {
	        var s = addDays(v.start, l.lag || 0);
	        var e = addDays(s, v.duration || 0);

	        if (l.type === 'SS') {
	          start = maxDate(start, s);
	        }

	        if (l.type === 'FS') {
	          start = maxDate(start, e);
	        }

	        if (l.type === 'SF') {
	          end = maxDate(end, s);
	        }

	        if (l.type === 'FF') {
	          end = maxDate(end, e);
	        }
	      }
	    }

	    if (end) {
	      task.start = addDays(end, -days);
	    }

	    if (start) {
	      task.start = start;
	    }
	  });
	}

	var utils = /*#__PURE__*/Object.freeze({
		DAY: DAY,
		addDays: addDays,
		getDates: getDates,
		textWidth: textWidth,
		formatMonth: formatMonth,
		formatDay: formatDay,
		minDate: minDate,
		maxDate: maxDate,
		max: max,
		p2s: p2s,
		s2p: s2p,
		formatData: formatData,
		hasPath: hasPath,
		toposort: toposort,
		autoSchedule: autoSchedule
	});

	function Layout(_ref) {
	  var styles = _ref.styles,
	      width = _ref.width,
	      height = _ref.height,
	      offsetY = _ref.offsetY,
	      thickWidth = _ref.thickWidth,
	      maxTextWidth = _ref.maxTextWidth;
	  var x0 = thickWidth / 2;
	  var W = width - thickWidth;
	  var H = height - thickWidth;
	  return h("g", null, h("rect", {
	    x: x0,
	    y: x0,
	    width: W,
	    height: H,
	    style: styles.box
	  }), h("line", {
	    x1: 0,
	    x2: width,
	    y1: offsetY - x0,
	    y2: offsetY - x0,
	    style: styles.bline
	  }), h("line", {
	    x1: maxTextWidth,
	    x2: width,
	    y1: offsetY / 2,
	    y2: offsetY / 2,
	    style: styles.line
	  }));
	}

	function YearMonth(_ref) {
	  var styles = _ref.styles,
	      dates = _ref.dates,
	      unit = _ref.unit,
	      offsetY = _ref.offsetY,
	      minTime = _ref.minTime,
	      maxTime = _ref.maxTime,
	      maxTextWidth = _ref.maxTextWidth;
	  var months = dates.filter(function (v) {
	    return new Date(v).getDate() === 1;
	  });
	  months.unshift(minTime);
	  months.push(maxTime);
	  var ticks = [];
	  var x0 = maxTextWidth;
	  var y2 = offsetY / 2;
	  var len = months.length - 1;

	  for (var i = 0; i < len; i++) {
	    var cur = new Date(months[i]);
	    var str = formatMonth(cur);
	    var x = x0 + (months[i] - minTime) / unit;
	    var t = (months[i + 1] - months[i]) / unit;
	    ticks.push(h("g", null, h("line", {
	      x1: x,
	      x2: x,
	      y1: 0,
	      y2: y2,
	      style: styles.line
	    }), t > 50 ? h("text", {
	      x: x + t / 2,
	      y: offsetY * 0.25,
	      style: styles.text3
	    }, str) : null));
	  }

	  return h("g", null, ticks);
	}

	function DayHeader(_ref) {
	  var styles = _ref.styles,
	      unit = _ref.unit,
	      minTime = _ref.minTime,
	      maxTime = _ref.maxTime,
	      height = _ref.height,
	      offsetY = _ref.offsetY,
	      maxTextWidth = _ref.maxTextWidth;
	  var dates = getDates(minTime, maxTime);
	  var ticks = [];
	  var x0 = maxTextWidth;
	  var y0 = offsetY / 2;
	  var RH = height - y0;
	  var len = dates.length - 1;

	  for (var i = 0; i < len; i++) {
	    var cur = new Date(dates[i]);
	    var day = cur.getDay();
	    var x = x0 + (dates[i] - minTime) / unit;
	    var t = (dates[i + 1] - dates[i]) / unit;
	    ticks.push(h("g", null, day === 0 || day === 6 ? h("rect", {
	      x: x,
	      y: y0,
	      width: t,
	      height: RH,
	      style: styles.week
	    }) : null, h("line", {
	      x1: x,
	      x2: x,
	      y1: y0,
	      y2: offsetY,
	      style: styles.line
	    }), h("text", {
	      x: x + t / 2,
	      y: offsetY * 0.75,
	      style: styles.text3
	    }, cur.getDate()), i === len - 1 ? h("line", {
	      x1: x + t,
	      x2: x + t,
	      y1: y0,
	      y2: offsetY,
	      style: styles.line
	    }) : null));
	  }

	  return h("g", null, h(YearMonth, {
	    styles: styles,
	    unit: unit,
	    dates: dates,
	    offsetY: offsetY,
	    minTime: minTime,
	    maxTime: maxTime,
	    maxTextWidth: maxTextWidth
	  }), ticks);
	}

	function WeekHeader(_ref) {
	  var styles = _ref.styles,
	      unit = _ref.unit,
	      minTime = _ref.minTime,
	      maxTime = _ref.maxTime,
	      height = _ref.height,
	      offsetY = _ref.offsetY,
	      maxTextWidth = _ref.maxTextWidth;
	  var dates = getDates(minTime, maxTime);
	  var weeks = dates.filter(function (v) {
	    return new Date(v).getDay() === 0;
	  });
	  weeks.push(maxTime);
	  var ticks = [];
	  var x0 = maxTextWidth;
	  var y0 = offsetY;
	  var RH = height - y0;
	  var d = DAY / unit;
	  var len = weeks.length - 1;

	  for (var i = 0; i < len; i++) {
	    var cur = new Date(weeks[i]);
	    var x = x0 + (weeks[i] - minTime) / unit;
	    var curDay = cur.getDate();
	    var prevDay = addDays(cur, -1).getDate();
	    ticks.push(h("g", null, h("rect", {
	      x: x - d,
	      y: y0,
	      width: d * 2,
	      height: RH,
	      style: styles.week
	    }), h("line", {
	      x1: x,
	      x2: x,
	      y1: offsetY / 2,
	      y2: offsetY,
	      style: styles.line
	    }), h("text", {
	      x: x + 3,
	      y: offsetY * 0.75,
	      style: styles.text2
	    }, curDay), x - x0 > 28 ? h("text", {
	      x: x - 3,
	      y: offsetY * 0.75,
	      style: styles.text1
	    }, prevDay) : null));
	  }

	  return h("g", null, h(YearMonth, {
	    styles: styles,
	    unit: unit,
	    dates: dates,
	    offsetY: offsetY,
	    minTime: minTime,
	    maxTime: maxTime,
	    maxTextWidth: maxTextWidth
	  }), ticks);
	}

	function Year(_ref) {
	  var styles = _ref.styles,
	      months = _ref.months,
	      unit = _ref.unit,
	      offsetY = _ref.offsetY,
	      minTime = _ref.minTime,
	      maxTime = _ref.maxTime,
	      maxTextWidth = _ref.maxTextWidth;
	  var years = months.filter(function (v) {
	    return new Date(v).getMonth() === 0;
	  });
	  years.unshift(minTime);
	  years.push(maxTime);
	  var ticks = [];
	  var x0 = maxTextWidth;
	  var y2 = offsetY / 2;
	  var len = years.length - 1;

	  for (var i = 0; i < len; i++) {
	    var cur = new Date(years[i]);
	    var x = x0 + (years[i] - minTime) / unit;
	    var t = (years[i + 1] - years[i]) / unit;
	    ticks.push(h("g", null, h("line", {
	      x1: x,
	      x2: x,
	      y1: 0,
	      y2: y2,
	      style: styles.line
	    }), t > 35 ? h("text", {
	      x: x + t / 2,
	      y: offsetY * 0.25,
	      style: styles.text3
	    }, cur.getFullYear()) : null));
	  }

	  return h("g", null, ticks);
	}

	function MonthHeader(_ref) {
	  var styles = _ref.styles,
	      unit = _ref.unit,
	      minTime = _ref.minTime,
	      maxTime = _ref.maxTime,
	      offsetY = _ref.offsetY,
	      maxTextWidth = _ref.maxTextWidth;
	  var MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	  var dates = getDates(minTime, maxTime);
	  var months = dates.filter(function (v) {
	    return new Date(v).getDate() === 1;
	  });
	  months.unshift(minTime);
	  months.push(maxTime);
	  var ticks = [];
	  var x0 = maxTextWidth;
	  var y0 = offsetY / 2;
	  var len = months.length - 1;

	  for (var i = 0; i < len; i++) {
	    var cur = new Date(months[i]);
	    var month = cur.getMonth();
	    var x = x0 + (months[i] - minTime) / unit;
	    var t = (months[i + 1] - months[i]) / unit;
	    ticks.push(h("g", null, h("line", {
	      x1: x,
	      x2: x,
	      y1: y0,
	      y2: offsetY,
	      style: styles.line
	    }), t > 30 ? h("text", {
	      x: x + t / 2,
	      y: offsetY * 0.75,
	      style: styles.text3
	    }, MONTH[month]) : null));
	  }

	  return h("g", null, h(Year, {
	    styles: styles,
	    unit: unit,
	    months: months,
	    offsetY: offsetY,
	    minTime: minTime,
	    maxTime: maxTime,
	    maxTextWidth: maxTextWidth
	  }), ticks);
	}

	function Grid(_ref) {
	  var styles = _ref.styles,
	      data = _ref.data,
	      width = _ref.width,
	      height = _ref.height,
	      offsetY = _ref.offsetY,
	      rowHeight = _ref.rowHeight,
	      maxTextWidth = _ref.maxTextWidth;
	  return h("g", null, data.map(function (v, i) {
	    var y = (i + 1) * rowHeight + offsetY;
	    return h("line", {
	      key: i,
	      x1: 0,
	      x2: width,
	      y1: y,
	      y2: y,
	      style: styles.line
	    });
	  }), h("line", {
	    x1: maxTextWidth,
	    x2: maxTextWidth,
	    y1: 0,
	    y2: height,
	    style: styles.bline
	  }));
	}

	function Labels(_ref) {
	  var styles = _ref.styles,
	      data = _ref.data,
	      rowHeight = _ref.rowHeight,
	      offsetY = _ref.offsetY;
	  return h("g", null, data.map(function (v, i) {
	    return h("text", {
	      key: i,
	      x: 10,
	      y: (i + 0.5) * rowHeight + offsetY,
	      style: styles.label
	    }, v.text);
	  }));
	}

	function LinkLine(_ref) {
	  var styles = _ref.styles,
	      data = _ref.data,
	      unit = _ref.unit,
	      offsetY = _ref.offsetY,
	      minTime = _ref.minTime,
	      rowHeight = _ref.rowHeight,
	      barHeight = _ref.barHeight,
	      maxTextWidth = _ref.maxTextWidth;
	  var x0 = maxTextWidth;
	  var y0 = rowHeight / 2 + offsetY;
	  var map = {};
	  data.forEach(function (v, i) {
	    map[v.id] = i;
	  });
	  return h("g", null, data.map(function (s, i) {
	    if (!s.end || !s.start) {
	      return null;
	    }

	    return s.links.map(function (l) {
	      var j = map[l.target];
	      var e = data[j];
	      if (!e || !e.start || !e.end) return null;
	      var gap = 12;
	      var arrow = 6;
	      var mgap = e.type === 'milestone' ? barHeight / 2 : 0;
	      var y1 = y0 + i * rowHeight;
	      var y2 = y0 + j * rowHeight;
	      var vgap = barHeight / 2 + 4;

	      if (y1 > y2) {
	        vgap = -vgap;
	      }

	      if (l.type === 'FS') {
	        var x1 = x0 + (s.end - minTime) / unit;
	        var x2 = x0 + (e.start - minTime) / unit - mgap;
	        var p1 = [[x1, y1], [x1 + gap, y1]];

	        if (x2 - x1 >= 2 * gap) {
	          p1.push([x1 + gap, y2]);
	        } else {
	          p1.push([x1 + gap, y2 - vgap]);
	          p1.push([x2 - gap, y2 - vgap]);
	          p1.push([x2 - gap, y2]);
	        }

	        p1.push([x2 - arrow, y2]);
	        var p2 = [[x2 - arrow, y2 - arrow], [x2, y2], [x2 - arrow, y2 + arrow]];
	        return h("g", null, h("polyline", {
	          points: p2s(p1),
	          style: styles.link
	        }), h("polygon", {
	          points: p2s(p2),
	          style: styles.linkArrow
	        }));
	      }

	      if (l.type === 'FF') {
	        var _x = x0 + (s.end - minTime) / unit;

	        var _x2 = x0 + (e.end - minTime) / unit + mgap;

	        var _p = [[_x, y1], [_x + gap, y1]];

	        if (_x2 <= _x) {
	          _p.push([_x + gap, y2]);
	        } else {
	          _p.push([_x + gap, y2 - vgap]);

	          _p.push([_x2 + gap, y2 - vgap]);

	          _p.push([_x2 + gap, y2]);
	        }

	        _p.push([_x2 + arrow, y2]);

	        var _p2 = [[_x2 + arrow, y2 - arrow], [_x2, y2], [_x2 + arrow, y2 + arrow]];
	        return h("g", null, h("polyline", {
	          points: p2s(_p),
	          style: styles.link
	        }), h("polygon", {
	          points: p2s(_p2),
	          style: styles.linkArrow
	        }));
	      }

	      if (l.type === 'SS') {
	        var _x3 = x0 + (s.start - minTime) / unit;

	        var _x4 = x0 + (e.start - minTime) / unit - mgap;

	        var _p3 = [[_x3, y1], [_x3 - gap, y1]];

	        if (_x3 <= _x4) {
	          _p3.push([_x3 - gap, y2]);
	        } else {
	          _p3.push([_x3 - gap, y2 - vgap]);

	          _p3.push([_x4 - gap, y2 - vgap]);

	          _p3.push([_x4 - gap, y2]);
	        }

	        _p3.push([_x4 - arrow, y2]);

	        var _p4 = [[_x4 - arrow, y2 - arrow], [_x4, y2], [_x4 - arrow, y2 + arrow]];
	        return h("g", null, h("polyline", {
	          points: p2s(_p3),
	          style: styles.link
	        }), h("polygon", {
	          points: p2s(_p4),
	          style: styles.linkArrow
	        }));
	      }

	      if (l.type === 'SF') {
	        var _x5 = x0 + (s.start - minTime) / unit;

	        var _x6 = x0 + (e.end - minTime) / unit + mgap;

	        var _p5 = [[_x5, y1], [_x5 - gap, y1]];

	        if (_x5 - _x6 >= 2 * gap) {
	          _p5.push([_x5 - gap, y2]);
	        } else {
	          _p5.push([_x5 - gap, y2 - vgap]);

	          _p5.push([_x6 + gap, y2 - vgap]);

	          _p5.push([_x6 + gap, y2]);
	        }

	        _p5.push([_x6 + arrow, y2]);

	        var _p6 = [[_x6 + arrow, y2 - arrow], [_x6, y2], [_x6 + arrow, y2 + arrow]];
	        return h("g", null, h("polyline", {
	          points: p2s(_p5),
	          style: styles.link
	        }), h("polygon", {
	          points: p2s(_p6),
	          style: styles.linkArrow
	        }));
	      }

	      return null;
	    });
	  }));
	}

	function Bar(_ref) {
	  var styles = _ref.styles,
	      data = _ref.data,
	      unit = _ref.unit,
	      height = _ref.height,
	      offsetY = _ref.offsetY,
	      minTime = _ref.minTime,
	      showDelay = _ref.showDelay,
	      rowHeight = _ref.rowHeight,
	      barHeight = _ref.barHeight,
	      maxTextWidth = _ref.maxTextWidth,
	      current = _ref.current,
	      onClick = _ref.onClick;
	  var x0 = maxTextWidth;
	  var y0 = (rowHeight - barHeight) / 2 + offsetY;
	  var cur = x0 + (current - minTime) / unit;
	  return h("g", null, h("line", {
	    x1: cur,
	    x2: cur,
	    y1: offsetY,
	    y2: height,
	    style: styles.cline
	  }), data.map(function (v, i) {
	    if (!v.end || !v.start) {
	      return null;
	    }

	    var handler = function handler() {
	      return onClick(v);
	    };

	    var x = x0 + (v.start - minTime) / unit;
	    var y = y0 + i * rowHeight;
	    var cy = y + barHeight / 2;

	    if (v.type === 'milestone') {
	      var size = barHeight / 2;
	      var points = [[x, cy - size], [x + size, cy], [x, cy + size], [x - size, cy]].map(function (p) {
	        return "".concat(p[0], ",").concat(p[1]);
	      }).join(' ');
	      return h("g", {
	        key: i,
	        class: "gantt-bar",
	        style: {
	          cursor: 'pointer'
	        },
	        onClick: handler
	      }, h("polygon", {
	        points: points,
	        style: styles.milestone,
	        onClick: handler
	      }), h("circle", {
	        class: "gantt-ctrl-start",
	        "data-id": v.id,
	        cx: x,
	        cy: cy,
	        r: 6,
	        style: styles.ctrl
	      }));
	    }

	    var w1 = (v.end - v.start) / unit;
	    var w2 = w1 * v.percent;
	    var bar = v.type === 'group' ? {
	      back: styles.groupBack,
	      front: styles.groupFront
	    } : {
	      back: styles.taskBack,
	      front: styles.taskFront
	    };

	    if (showDelay) {
	      if (x + w2 < cur && v.percent < 0.999999) {
	        bar.front = styles.warning;
	      }

	      if (x + w1 < cur && v.percent < 0.999999) {
	        bar.front = styles.danger;
	      }
	    }

	    return h("g", {
	      key: i,
	      class: "gantt-bar",
	      style: {
	        cursor: 'pointer'
	      },
	      onClick: handler
	    }, h("text", {
	      x: x - 4,
	      y: cy,
	      style: styles.text1
	    }, formatDay(v.start)), h("text", {
	      x: x + w1 + 4,
	      y: cy,
	      style: styles.text2
	    }, formatDay(v.end)), h("rect", {
	      x: x,
	      y: y,
	      width: w1,
	      height: barHeight,
	      rx: 1.8,
	      ry: 1.8,
	      style: bar.back,
	      onClick: handler
	    }), w2 > 0.000001 ? h("rect", {
	      x: x,
	      y: y,
	      width: w2,
	      height: barHeight,
	      rx: 1.8,
	      ry: 1.8,
	      style: bar.front
	    }) : null, v.type === 'group' ? null : h("g", null, h("circle", {
	      class: "gantt-ctrl-start",
	      "data-id": v.id,
	      cx: x - 12,
	      cy: cy,
	      r: 6,
	      style: styles.ctrl
	    }), h("circle", {
	      class: "gantt-ctrl-finish",
	      "data-id": v.id,
	      cx: x + w1 + 12,
	      cy: cy,
	      r: 6,
	      style: styles.ctrl
	    })));
	  }));
	}

	var SIZE = '14px';
	var TYPE = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
	function getFont(_ref) {
	  var _ref$fontSize = _ref.fontSize,
	      fontSize = _ref$fontSize === void 0 ? SIZE : _ref$fontSize,
	      _ref$fontFamily = _ref.fontFamily,
	      fontFamily = _ref$fontFamily === void 0 ? TYPE : _ref$fontFamily;
	  return "bold ".concat(fontSize, " ").concat(fontFamily);
	}
	function getStyles(_ref2) {
	  var _ref2$bgColor = _ref2.bgColor,
	      bgColor = _ref2$bgColor === void 0 ? '#fff' : _ref2$bgColor,
	      _ref2$lineColor = _ref2.lineColor,
	      lineColor = _ref2$lineColor === void 0 ? '#eee' : _ref2$lineColor,
	      _ref2$redLineColor = _ref2.redLineColor,
	      redLineColor = _ref2$redLineColor === void 0 ? '#f04134' : _ref2$redLineColor,
	      _ref2$groupBack = _ref2.groupBack,
	      groupBack = _ref2$groupBack === void 0 ? '#3db9d3' : _ref2$groupBack,
	      _ref2$groupFront = _ref2.groupFront,
	      groupFront = _ref2$groupFront === void 0 ? '#299cb4' : _ref2$groupFront,
	      _ref2$taskBack = _ref2.taskBack,
	      taskBack = _ref2$taskBack === void 0 ? '#65c16f' : _ref2$taskBack,
	      _ref2$taskFront = _ref2.taskFront,
	      taskFront = _ref2$taskFront === void 0 ? '#46ad51' : _ref2$taskFront,
	      _ref2$milestone = _ref2.milestone,
	      milestone = _ref2$milestone === void 0 ? '#d33daf' : _ref2$milestone,
	      _ref2$warning = _ref2.warning,
	      warning = _ref2$warning === void 0 ? '#faad14' : _ref2$warning,
	      _ref2$danger = _ref2.danger,
	      danger = _ref2$danger === void 0 ? '#f5222d' : _ref2$danger,
	      _ref2$link = _ref2.link,
	      link = _ref2$link === void 0 ? '#ffa011' : _ref2$link,
	      _ref2$textColor = _ref2.textColor,
	      textColor = _ref2$textColor === void 0 ? '#222' : _ref2$textColor,
	      _ref2$lightTextColor = _ref2.lightTextColor,
	      lightTextColor = _ref2$lightTextColor === void 0 ? '#999' : _ref2$lightTextColor,
	      _ref2$lineWidth = _ref2.lineWidth,
	      lineWidth = _ref2$lineWidth === void 0 ? '1px' : _ref2$lineWidth,
	      _ref2$thickLineWidth = _ref2.thickLineWidth,
	      thickLineWidth = _ref2$thickLineWidth === void 0 ? '1.4px' : _ref2$thickLineWidth,
	      _ref2$fontSize = _ref2.fontSize,
	      fontSize = _ref2$fontSize === void 0 ? SIZE : _ref2$fontSize,
	      _ref2$smallFontSize = _ref2.smallFontSize,
	      smallFontSize = _ref2$smallFontSize === void 0 ? '12px' : _ref2$smallFontSize,
	      _ref2$fontFamily = _ref2.fontFamily,
	      fontFamily = _ref2$fontFamily === void 0 ? TYPE : _ref2$fontFamily;
	  var line = {
	    stroke: lineColor,
	    'stroke-width': lineWidth
	  };
	  var redLine = {
	    stroke: redLineColor,
	    'stroke-width': lineWidth
	  };
	  var thickLine = {
	    stroke: lineColor,
	    'stroke-width': thickLineWidth
	  };
	  var text = {
	    fill: textColor,
	    'dominant-baseline': 'central',
	    'font-size': fontSize,
	    'font-family': fontFamily
	  };
	  var smallText = {
	    fill: lightTextColor,
	    'font-size': smallFontSize
	  };
	  return {
	    week: {
	      fill: 'rgba(252, 248, 227, .6)'
	    },
	    box: objectSpread({}, thickLine, {
	      fill: bgColor
	    }),
	    line: line,
	    cline: redLine,
	    bline: thickLine,
	    label: text,
	    groupLabel: objectSpread({}, text, {
	      'font-weight': '600'
	    }),
	    text1: objectSpread({}, text, smallText, {
	      'text-anchor': 'end'
	    }),
	    text2: objectSpread({}, text, smallText),
	    text3: objectSpread({}, text, smallText, {
	      'text-anchor': 'middle'
	    }),
	    link: {
	      stroke: link,
	      'stroke-width': '1.5px',
	      fill: 'none'
	    },
	    linkArrow: {
	      fill: link
	    },
	    milestone: {
	      fill: milestone
	    },
	    groupBack: {
	      fill: groupBack
	    },
	    groupFront: {
	      fill: groupFront
	    },
	    taskBack: {
	      fill: taskBack
	    },
	    taskFront: {
	      fill: taskFront
	    },
	    warning: {
	      fill: warning
	    },
	    danger: {
	      fill: danger
	    },
	    ctrl: {
	      display: 'none',
	      fill: '#f0f0f0',
	      stroke: '#929292',
	      'stroke-width': '1px'
	    }
	  };
	}

	var UNIT = {
	  day: DAY / 28,
	  week: 7 * DAY / 56,
	  month: 30 * DAY / 56
	};

	function NOOP() {}

	function Gantt(_ref) {
	  var _ref$data = _ref.data,
	      data = _ref$data === void 0 ? [] : _ref$data,
	      _ref$onClick = _ref.onClick,
	      onClick = _ref$onClick === void 0 ? NOOP : _ref$onClick,
	      _ref$viewMode = _ref.viewMode,
	      viewMode = _ref$viewMode === void 0 ? 'week' : _ref$viewMode,
	      _ref$maxTextWidth = _ref.maxTextWidth,
	      maxTextWidth = _ref$maxTextWidth === void 0 ? 140 : _ref$maxTextWidth,
	      _ref$offsetY = _ref.offsetY,
	      offsetY = _ref$offsetY === void 0 ? 60 : _ref$offsetY,
	      _ref$rowHeight = _ref.rowHeight,
	      rowHeight = _ref$rowHeight === void 0 ? 40 : _ref$rowHeight,
	      _ref$barHeight = _ref.barHeight,
	      barHeight = _ref$barHeight === void 0 ? 16 : _ref$barHeight,
	      _ref$thickWidth = _ref.thickWidth,
	      thickWidth = _ref$thickWidth === void 0 ? 1.4 : _ref$thickWidth,
	      _ref$styleOptions = _ref.styleOptions,
	      styleOptions = _ref$styleOptions === void 0 ? {} : _ref$styleOptions,
	      _ref$showLinks = _ref.showLinks,
	      showLinks = _ref$showLinks === void 0 ? true : _ref$showLinks,
	      _ref$showDelay = _ref.showDelay,
	      showDelay = _ref$showDelay === void 0 ? true : _ref$showDelay,
	      start = _ref.start,
	      end = _ref.end;
	  var unit = UNIT[viewMode];
	  var minTime = start.getTime() - unit * 48;
	  var maxTime = end.getTime() + unit * 48;
	  var width = (maxTime - minTime) / unit + maxTextWidth;
	  var height = data.length * rowHeight + offsetY;
	  var box = "0 0 ".concat(width, " ").concat(height);
	  var current = Date.now();
	  var styles = getStyles(styleOptions);
	  return h("svg", {
	    width: width,
	    height: height,
	    viewBox: box
	  }, h(Layout, {
	    styles: styles,
	    width: width,
	    height: height,
	    offsetY: offsetY,
	    thickWidth: thickWidth,
	    maxTextWidth: maxTextWidth
	  }), viewMode === 'day' ? h(DayHeader, {
	    styles: styles,
	    unit: unit,
	    height: height,
	    offsetY: offsetY,
	    minTime: minTime,
	    maxTime: maxTime,
	    maxTextWidth: maxTextWidth
	  }) : null, viewMode === 'week' ? h(WeekHeader, {
	    styles: styles,
	    unit: unit,
	    height: height,
	    offsetY: offsetY,
	    minTime: minTime,
	    maxTime: maxTime,
	    maxTextWidth: maxTextWidth
	  }) : null, viewMode === 'month' ? h(MonthHeader, {
	    styles: styles,
	    unit: unit,
	    offsetY: offsetY,
	    minTime: minTime,
	    maxTime: maxTime,
	    maxTextWidth: maxTextWidth
	  }) : null, h(Grid, {
	    styles: styles,
	    data: data,
	    width: width,
	    height: height,
	    offsetY: offsetY,
	    rowHeight: rowHeight,
	    maxTextWidth: maxTextWidth
	  }), maxTextWidth > 0 ? h(Labels, {
	    styles: styles,
	    data: data,
	    offsetY: offsetY,
	    rowHeight: rowHeight
	  }) : null, showLinks ? h(LinkLine, {
	    styles: styles,
	    data: data,
	    unit: unit,
	    height: height,
	    current: current,
	    offsetY: offsetY,
	    minTime: minTime,
	    onClick: onClick,
	    rowHeight: rowHeight,
	    barHeight: barHeight,
	    maxTextWidth: maxTextWidth
	  }) : null, h(Bar, {
	    styles: styles,
	    data: data,
	    unit: unit,
	    height: height,
	    current: current,
	    offsetY: offsetY,
	    minTime: minTime,
	    onClick: onClick,
	    showDelay: showDelay,
	    rowHeight: rowHeight,
	    barHeight: barHeight,
	    maxTextWidth: maxTextWidth
	  }));
	}

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

	function _typeof(obj) {
	  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return _typeof2(obj);
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	var NS = 'http://www.w3.org/2000/svg';
	var doc = document;

	function applyProperties(node, props) {
	  Object.keys(props).forEach(function (k) {
	    var v = props[k];

	    if (k === 'style' && _typeof_1(v) === 'object') {
	      Object.keys(v).forEach(function (sk) {
	        // eslint-disable-next-line
	        node.style[sk] = v[sk];
	      });
	    } else if (k === 'onClick') {
	      if (typeof v === 'function' && node.tagName === 'g') {
	        node.addEventListener('click', v);
	      }
	    } else {
	      node.setAttribute(k, v);
	    }
	  });
	}

	function render(vnode, ctx) {
	  var tag = vnode.tag,
	      props = vnode.props,
	      children = vnode.children;
	  var node = doc.createElementNS(NS, tag);

	  if (props) {
	    applyProperties(node, props);
	  }

	  children.forEach(function (v) {
	    node.appendChild(typeof v === 'string' ? doc.createTextNode(v) : render(v, ctx));
	  });
	  return node;
	}

	var SVGGantt =
	/*#__PURE__*/
	function () {
	  function SVGGantt(element, data) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    classCallCheck(this, SVGGantt);

	    this.dom = typeof element === 'string' ? document.querySelector(element) : element;
	    this.format(data);
	    this.options = options;
	    this.render();
	  }

	  createClass(SVGGantt, [{
	    key: "format",
	    value: function format(data) {
	      this.data = data;
	      var start = null;
	      var end = null;
	      data.forEach(function (v) {
	        start = minDate(start, v.start);
	        end = maxDate(end, v.end);
	      });
	      this.start = start || new Date();
	      this.end = end || new Date();
	    }
	  }, {
	    key: "setData",
	    value: function setData(data) {
	      this.format(data);
	      this.render();
	    }
	  }, {
	    key: "setOptions",
	    value: function setOptions(options) {
	      this.options = objectSpread({}, this.options, options);
	      this.render();
	    }
	  }, {
	    key: "render",
	    value: function render$$1() {
	      var data = this.data,
	          start = this.start,
	          end = this.end,
	          options = this.options;

	      if (this.tree) {
	        this.dom.removeChild(this.tree);
	      }

	      if (options.maxTextWidth === undefined) {
	        var font = getFont(options.styleOptions || {});

	        var w = function w(v) {
	          return textWidth(v.text, font, 20);
	        };

	        options.maxTextWidth = max(data.map(w), 0);
	      }

	      var props = objectSpread({}, options, {
	        start: start,
	        end: end
	      });

	      this.tree = render(h(Gantt, _extends_1({
	        data: data
	      }, props)));
	      this.dom.appendChild(this.tree);
	    }
	  }]);

	  return SVGGantt;
	}();

	function render$1(vnode, ctx, e) {
	  var tag = vnode.tag,
	      props = vnode.props,
	      children = vnode.children;

	  if (tag === 'svg') {
	    var width = props.width,
	        height = props.height;
	    ctx.width = width;
	    ctx.height = height;
	  }

	  if (tag === 'line') {
	    var x1 = props.x1,
	        x2 = props.x2,
	        y1 = props.y1,
	        y2 = props.y2,
	        _props$style = props.style,
	        style = _props$style === void 0 ? {} : _props$style;

	    if (style.stroke) {
	      ctx.strokeStyle = style.stroke;
	      ctx.lineWidth = parseFloat(style['stroke-width'] || 1);
	    }

	    ctx.beginPath();
	    ctx.moveTo(x1, y1);
	    ctx.lineTo(x2, y2);
	    ctx.stroke();
	  }

	  if (tag === 'polyline' || tag === 'polygon') {
	    var points = props.points,
	        _props$style2 = props.style,
	        _style = _props$style2 === void 0 ? {} : _props$style2;

	    var p = s2p(points);

	    if (_style.stroke) {
	      ctx.strokeStyle = _style.stroke;
	      ctx.lineWidth = parseFloat(_style['stroke-width'] || 1);
	    }

	    if (_style.fill) {
	      ctx.fillStyle = _style.fill;
	    }

	    ctx.beginPath();
	    ctx.moveTo(p[0][0], p[0][1]);

	    for (var i = 1; i < p.length; i++) {
	      ctx.lineTo(p[i][0], p[i][1]);
	    }

	    if (tag === 'polyline') {
	      ctx.stroke();
	    } else {
	      ctx.fill();
	    }
	  }

	  if (tag === 'rect') {
	    var x = props.x,
	        y = props.y,
	        _width = props.width,
	        _height = props.height,
	        _props$rx = props.rx,
	        rx = _props$rx === void 0 ? 0 : _props$rx,
	        _props$ry = props.ry,
	        ry = _props$ry === void 0 ? 0 : _props$ry,
	        onClick = props.onClick,
	        _props$style3 = props.style,
	        _style2 = _props$style3 === void 0 ? {} : _props$style3; // From https://github.com/canvg/canvg


	    ctx.beginPath();
	    ctx.moveTo(x + rx, y);
	    ctx.lineTo(x + _width - rx, y);
	    ctx.quadraticCurveTo(x + _width, y, x + _width, y + ry);
	    ctx.lineTo(x + _width, y + _height - ry);
	    ctx.quadraticCurveTo(x + _width, y + _height, x + _width - rx, y + _height);
	    ctx.lineTo(x + rx, y + _height);
	    ctx.quadraticCurveTo(x, y + _height, x, y + _height - ry);
	    ctx.lineTo(x, y + ry);
	    ctx.quadraticCurveTo(x, y, x + rx, y);

	    if (e && onClick && ctx.isPointInPath(e.x, e.y)) {
	      onClick();
	    }

	    ctx.closePath();

	    if (_style2.fill) {
	      ctx.fillStyle = _style2.fill;
	    }

	    ctx.fill();

	    if (_style2.stroke) {
	      ctx.strokeStyle = _style2.stroke;
	      ctx.lineWidth = parseFloat(_style2['stroke-width'] || 1);
	      ctx.stroke();
	    }
	  }

	  if (tag === 'text') {
	    var _x = props.x,
	        _y = props.y,
	        _style3 = props.style;

	    if (_style3) {
	      ctx.fillStyle = _style3.fill;
	      var BL = {
	        central: 'middle',
	        middle: 'middle',
	        hanging: 'hanging',
	        alphabetic: 'alphabetic',
	        ideographic: 'ideographic'
	      };
	      var AL = {
	        start: 'start',
	        middle: 'center',
	        end: 'end'
	      };
	      ctx.textBaseline = BL[_style3['dominant-baseline']] || 'alphabetic';
	      ctx.textAlign = AL[_style3['text-anchor']] || 'start';
	      ctx.font = "".concat(_style3['font-weight'] || '', " ").concat(_style3['font-size'], " ").concat(_style3['font-family']);
	    }

	    ctx.fillText(children.join(''), _x, _y);
	  }

	  children.forEach(function (v) {
	    if (typeof v !== 'string') {
	      render$1(v, ctx, e);
	    }
	  });
	}

	function createContext(dom) {
	  var canvas = typeof dom === 'string' ? document.querySelector(dom) : dom;
	  var ctx = canvas.getContext('2d');
	  var backingStore = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
	  var ratio = (window.devicePixelRatio || 1) / backingStore;
	  ['width', 'height'].forEach(function (key) {
	    Object.defineProperty(ctx, key, {
	      get: function get() {
	        return canvas[key] / ratio;
	      },
	      set: function set(v) {
	        canvas[key] = v * ratio;
	        canvas.style[key] = "".concat(v, "px");
	        ctx.scale(ratio, ratio);
	      },
	      enumerable: true,
	      configurable: true
	    });
	  });
	  canvas.addEventListener('click', function (e) {
	    if (!ctx.onClick) return;
	    var rect = canvas.getBoundingClientRect();
	    ctx.onClick({
	      x: (e.clientX - rect.left) * ratio,
	      y: (e.clientY - rect.top) * ratio
	    });
	  });
	  return ctx;
	}

	var CanvasGantt =
	/*#__PURE__*/
	function () {
	  function CanvasGantt(element, data) {
	    var _this = this;

	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    classCallCheck(this, CanvasGantt);

	    this.ctx = createContext(element);
	    this.format(data);
	    this.options = options;
	    this.render();

	    this.ctx.onClick = function (e) {
	      return _this.render(e);
	    };
	  }

	  createClass(CanvasGantt, [{
	    key: "format",
	    value: function format(data) {
	      this.data = data;
	      var start = null;
	      var end = null;
	      data.forEach(function (v) {
	        start = minDate(start, v.start);
	        end = maxDate(end, v.end);
	      });
	      this.start = start || new Date();
	      this.end = end || new Date();
	    }
	  }, {
	    key: "setData",
	    value: function setData(data) {
	      this.format(data);
	      this.render();
	    }
	  }, {
	    key: "setOptions",
	    value: function setOptions(options) {
	      this.options = objectSpread({}, this.options, options);
	      this.render();
	    }
	  }, {
	    key: "render",
	    value: function render(e) {
	      var data = this.data,
	          start = this.start,
	          end = this.end,
	          options = this.options;

	      if (options.maxTextWidth === undefined) {
	        var font = getFont(options.styleOptions || {});

	        var w = function w(v) {
	          return textWidth(v.text, font, 20);
	        };

	        options.maxTextWidth = max(data.map(w), 0);
	      }

	      var props = objectSpread({}, options, {
	        start: start,
	        end: end
	      });

	      render$1(h(Gantt, _extends_1({
	        data: data
	      }, props)), this.ctx, e);
	    }
	  }]);

	  return CanvasGantt;
	}();

	function attrEscape(str) {
	  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;');
	}

	function escape(str) {
	  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
	}

	function render$2(vnode, ctx) {
	  var tag = vnode.tag,
	      props = vnode.props,
	      children = vnode.children;
	  var tokens = [];
	  tokens.push("<".concat(tag));
	  Object.keys(props || {}).forEach(function (k) {
	    var v = props[k];
	    if (k === 'onClick') return;

	    if (k === 'style' && _typeof_1(v) === 'object') {
	      v = Object.keys(v).map(function (i) {
	        return "".concat(i, ":").concat(v[i], ";");
	      }).join('');
	    }

	    tokens.push(" ".concat(k, "=\"").concat(attrEscape(v), "\""));
	  });

	  if (!children || !children.length) {
	    tokens.push(' />');
	    return tokens.join('');
	  }

	  tokens.push('>');
	  children.forEach(function (v) {
	    if (typeof v === 'string') {
	      tokens.push(escape(v));
	    } else {
	      tokens.push(render$2(v, ctx));
	    }
	  });
	  tokens.push("</".concat(tag, ">"));
	  return tokens.join('');
	}

	var StrGantt =
	/*#__PURE__*/
	function () {
	  function StrGantt(data) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    classCallCheck(this, StrGantt);

	    this.format(data);
	    this.options = options;
	  }

	  createClass(StrGantt, [{
	    key: "format",
	    value: function format(data) {
	      this.data = data;
	      var start = null;
	      var end = null;
	      data.forEach(function (v) {
	        start = minDate(start, v.start);
	        end = maxDate(end, v.end);
	      });
	      this.start = start || new Date();
	      this.end = end || new Date();
	    }
	  }, {
	    key: "setData",
	    value: function setData(data) {
	      this.format(data);
	    }
	  }, {
	    key: "setOptions",
	    value: function setOptions(options) {
	      this.options = objectSpread({}, this.options, options);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var data = this.data,
	          start = this.start,
	          end = this.end,
	          options = this.options;

	      var props = objectSpread({}, options, {
	        start: start,
	        end: end
	      });

	      return render$2(h(Gantt, _extends_1({
	        data: data
	      }, props)));
	    }
	  }]);

	  return StrGantt;
	}();

	exports.default = CanvasGantt;
	exports.SVGGantt = SVGGantt;
	exports.CanvasGantt = CanvasGantt;
	exports.StrGantt = StrGantt;
	exports.utils = utils;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
