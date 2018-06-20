(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Gantt = {})));
}(this, (function (exports) { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.7' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _library = true;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: _library ? 'pure' : 'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$1 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$1
	};

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	var assign = _core.Object.assign;

	var assign$1 = createCommonjsModule(function (module) {
	module.exports = { "default": assign, __esModule: true };
	});

	unwrapExports(assign$1);

	var _extends = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _assign2 = _interopRequireDefault(assign$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
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
	});

	var _extends$1 = unwrapExports(_extends);

	var classCallCheck = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	});

	var _classCallCheck = unwrapExports(classCallCheck);

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	var $Object = _core.Object;
	var defineProperty = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$1 = createCommonjsModule(function (module) {
	module.exports = { "default": defineProperty, __esModule: true };
	});

	var _Object$defineProperty = unwrapExports(defineProperty$1);

	var createClass = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _defineProperty2 = _interopRequireDefault(defineProperty$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();
	});

	var _createClass = unwrapExports(createClass);

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

	  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    children[_key - 2] = arguments[_key];
	  }

	  addChild(children, childNodes);

	  if (typeof tag === 'function') {
	    return tag(_extends$1({}, props, { children: childNodes }));
	  }

	  return {
	    tag: tag,
	    props: props,
	    children: childNodes
	  };
	}

	var DAY = 24 * 3600 * 1000;

	function addDays(date, days) {
	  date.setDate(date.getDate() + days);
	  return date;
	}

	function getDates(begin, end) {
	  var dates = [];
	  var s = new Date(begin);
	  s.setHours(24, 0, 0, 0);
	  while (s.getTime() <= end) {
	    dates.push(s.getTime());
	    addDays(s, 1);
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
	  return y + '/' + (m > 9 ? m : '0' + m);
	}

	function formatDay(date) {
	  var m = date.getMonth() + 1;
	  var d = date.getDate();
	  return m + '/' + d;
	}

	function formatData(data) {
	  var list = [];
	  data.forEach(function (v) {
	    var min = Math.min.apply(null, v.children.map(function (c) {
	      return c.from;
	    }));
	    var max = Math.max.apply(null, v.children.map(function (c) {
	      return c.to;
	    }));
	    var percent = v.children.reduce(function (p, c) {
	      return p + c.percent;
	    }, 0);
	    if (v.children.length) {
	      percent /= v.children.length;
	    }

	    list.push({
	      id: v.id,
	      group: true,
	      name: v.name,
	      from: min,
	      to: max,
	      percent: percent
	    });
	    v.children.forEach(function (c) {
	      list.push({
	        id: c.id,
	        name: c.name,
	        from: c.from.getTime(),
	        to: c.to.getTime(),
	        percent: c.percent
	      });
	    });
	  });
	  return list;
	}

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
	  return h(
	    'g',
	    null,
	    h('rect', { x: x0, y: x0, width: W, height: H, style: styles.box }),
	    h('line', { x1: 0, x2: width, y1: offsetY - x0, y2: offsetY - x0, style: styles.bline }),
	    h('line', { x1: maxTextWidth, x2: width, y1: offsetY / 2, y2: offsetY / 2, style: styles.line })
	  );
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
	    ticks.push(h(
	      'g',
	      null,
	      h('line', { x1: x, x2: x, y1: 0, y2: y2, style: styles.line }),
	      t > 50 ? h(
	        'text',
	        { x: x + t / 2, y: offsetY * 0.25, style: styles.text3 },
	        str
	      ) : null
	    ));
	  }
	  return h(
	    'g',
	    null,
	    ticks
	  );
	}

	function DayHeader(_ref) {
	  var styles = _ref.styles,
	      unit = _ref.unit,
	      minTime = _ref.minTime,
	      maxTime = _ref.maxTime,
	      height = _ref.height,
	      offsetY = _ref.offsetY,
	      maxTextWidth = _ref.maxTextWidth,
	      footerHeight = _ref.footerHeight;

	  var dates = getDates(minTime, maxTime);
	  var ticks = [];
	  var x0 = maxTextWidth;
	  var y0 = offsetY / 2;
	  var RH = height - y0 - footerHeight;
	  var len = dates.length - 1;
	  for (var i = 0; i < len; i++) {
	    var cur = new Date(dates[i]);
	    var day = cur.getDay();
	    var x = x0 + (dates[i] - minTime) / unit;
	    var t = (dates[i + 1] - dates[i]) / unit;
	    ticks.push(h(
	      'g',
	      null,
	      day === 0 || day === 6 ? h('rect', { x: x, y: y0, width: t, height: RH, style: styles.week }) : null,
	      h('line', { x1: x, x2: x, y1: y0, y2: offsetY, style: styles.line }),
	      h(
	        'text',
	        { x: x + t / 2, y: offsetY * 0.75, style: styles.text3 },
	        cur.getDate()
	      ),
	      i === len - 1 ? h('line', { x1: x + t, x2: x + t, y1: y0, y2: offsetY, style: styles.line }) : null
	    ));
	  }
	  return h(
	    'g',
	    null,
	    h(YearMonth, {
	      styles: styles,
	      unit: unit,
	      dates: dates,
	      offsetY: offsetY,
	      minTime: minTime,
	      maxTime: maxTime,
	      maxTextWidth: maxTextWidth
	    }),
	    ticks
	  );
	}

	function WeekHeader(_ref) {
	  var styles = _ref.styles,
	      unit = _ref.unit,
	      minTime = _ref.minTime,
	      maxTime = _ref.maxTime,
	      height = _ref.height,
	      offsetY = _ref.offsetY,
	      maxTextWidth = _ref.maxTextWidth,
	      footerHeight = _ref.footerHeight;

	  var dates = getDates(minTime, maxTime);
	  var weeks = dates.filter(function (v) {
	    return new Date(v).getDay() === 0;
	  });
	  weeks.push(maxTime);
	  var ticks = [];
	  var x0 = maxTextWidth;
	  var y0 = offsetY / 2;
	  var RH = height - y0 - footerHeight;
	  var d = DAY / unit;
	  var len = weeks.length - 1;
	  for (var i = 0; i < len; i++) {
	    var cur = new Date(weeks[i]);
	    var x = x0 + (weeks[i] - minTime) / unit;
	    var curDay = cur.getDate();
	    var prevDay = addDays(cur, -1).getDate();
	    ticks.push(h(
	      'g',
	      null,
	      h('rect', { x: x - d, y: y0, width: d * 2, height: RH, style: styles.week }),
	      h('line', { x1: x, x2: x, y1: y0, y2: offsetY, style: styles.line }),
	      h(
	        'text',
	        { x: x + 3, y: offsetY * 0.75, style: styles.text2 },
	        curDay
	      ),
	      x - x0 > 28 ? h(
	        'text',
	        { x: x - 3, y: offsetY * 0.75, style: styles.text1 },
	        prevDay
	      ) : null
	    ));
	  }
	  return h(
	    'g',
	    null,
	    h(YearMonth, {
	      styles: styles,
	      unit: unit,
	      dates: dates,
	      offsetY: offsetY,
	      minTime: minTime,
	      maxTime: maxTime,
	      maxTextWidth: maxTextWidth
	    }),
	    ticks
	  );
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
	    ticks.push(h(
	      'g',
	      null,
	      h('line', { x1: x, x2: x, y1: 0, y2: y2, style: styles.line }),
	      t > 35 ? h(
	        'text',
	        { x: x + t / 2, y: offsetY * 0.25, style: styles.text3 },
	        cur.getFullYear()
	      ) : null
	    ));
	  }
	  return h(
	    'g',
	    null,
	    ticks
	  );
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
	    ticks.push(h(
	      'g',
	      null,
	      h('line', { x1: x, x2: x, y1: y0, y2: offsetY, style: styles.line }),
	      t > 30 ? h(
	        'text',
	        { x: x + t / 2, y: offsetY * 0.75, style: styles.text3 },
	        MONTH[month]
	      ) : null
	    ));
	  }
	  return h(
	    'g',
	    null,
	    h(Year, {
	      styles: styles,
	      unit: unit,
	      months: months,
	      offsetY: offsetY,
	      minTime: minTime,
	      maxTime: maxTime,
	      maxTextWidth: maxTextWidth
	    }),
	    ticks
	  );
	}

	function Grid(_ref) {
	  var styles = _ref.styles,
	      data = _ref.data,
	      width = _ref.width,
	      height = _ref.height,
	      offsetY = _ref.offsetY,
	      thickWidth = _ref.thickWidth,
	      rowHeight = _ref.rowHeight,
	      footerHeight = _ref.footerHeight,
	      maxTextWidth = _ref.maxTextWidth;

	  var W = width - thickWidth * 2;
	  var H = height - footerHeight;
	  return h(
	    'g',
	    null,
	    data.map(function (v, i) {
	      if (!v.group) return null;
	      var y = i * rowHeight + offsetY;
	      return h('rect', { x: thickWidth, y: y, width: W, height: rowHeight, style: styles.groupBg });
	    }),
	    data.map(function (v, i) {
	      var y = (i + 1) * rowHeight + offsetY;
	      return h('line', { key: i, x1: 0, x2: width, y1: y, y2: y, style: styles.line });
	    }),
	    h('line', { x1: maxTextWidth, x2: maxTextWidth, y1: 0, y2: H, style: styles.bline })
	  );
	}

	function Labels(_ref) {
	  var styles = _ref.styles,
	      data = _ref.data,
	      rowHeight = _ref.rowHeight,
	      offsetY = _ref.offsetY;

	  return h(
	    'g',
	    null,
	    data.map(function (v, i) {
	      return h(
	        'text',
	        {
	          key: i,
	          x: 10,
	          y: (i + 0.5) * rowHeight + offsetY,
	          style: v.group ? styles.groupLabel : styles.label
	        },
	        v.name
	      );
	    })
	  );
	}

	function Bar(_ref) {
	  var styles = _ref.styles,
	      data = _ref.data,
	      unit = _ref.unit,
	      height = _ref.height,
	      offsetY = _ref.offsetY,
	      minTime = _ref.minTime,
	      rowHeight = _ref.rowHeight,
	      barHeight = _ref.barHeight,
	      footerHeight = _ref.footerHeight,
	      maxTextWidth = _ref.maxTextWidth,
	      current = _ref.current,
	      onClick = _ref.onClick;

	  var x0 = maxTextWidth;
	  var y0 = (rowHeight - barHeight) / 2 + offsetY;
	  var cur = x0 + (current - minTime) / unit;
	  return h(
	    'g',
	    null,
	    h('line', { x1: cur, x2: cur, y1: offsetY, y2: height - footerHeight, style: styles.cline }),
	    data.map(function (v, i) {
	      var w1 = (v.to - v.from) / unit;
	      var w2 = w1 * v.percent;
	      var x = x0 + (v.from - minTime) / unit;
	      var y = y0 + i * rowHeight;
	      var TY = y + barHeight / 2;
	      var type = 'green';
	      if (x + w2 < cur && v.percent < 0.999999) {
	        type = 'red';
	      }
	      if (v.group) {
	        type = 'group';
	      }
	      var handler = function handler() {
	        return onClick(v);
	      };
	      return h(
	        'g',
	        { key: i, style: { cursor: 'pointer' }, onClick: handler },
	        h(
	          'text',
	          { x: x - 4, y: TY, style: styles.text1 },
	          formatDay(new Date(v.from))
	        ),
	        h(
	          'text',
	          { x: x + w1 + 4, y: TY, style: styles.text2 },
	          formatDay(new Date(v.to))
	        ),
	        h('rect', { x: x, y: y, width: w1, height: barHeight, rx: 1.8, ry: 1.8, style: styles.bar, onClick: handler }),
	        w2 > 0.000001 ? h('rect', { x: x, y: y, width: w2, height: barHeight, rx: 1.8, ry: 1.8, style: styles[type] }) : null
	      );
	    })
	  );
	}

	function Legend(_ref) {
	  var styles = _ref.styles,
	      legends = _ref.legends,
	      width = _ref.width,
	      height = _ref.height,
	      barHeight = _ref.barHeight,
	      footerHeight = _ref.footerHeight;

	  var W = 100;
	  var len = legends.length;
	  return h(
	    'g',
	    null,
	    legends.map(function (v, i) {
	      var x = (width - len * W) / 2 + i * W;
	      var y = height - footerHeight / 2;
	      var RY = y - barHeight / 2;
	      return h(
	        'g',
	        { key: i },
	        h('rect', { x: x, y: RY, width: barHeight, height: barHeight, style: styles[v.type] }),
	        h(
	          'text',
	          { x: x + barHeight + 5, y: y, style: styles.label },
	          v.name
	        )
	      );
	    })
	  );
	}

	var SIZE = '14px';
	var TYPE = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

	function getFont(_ref) {
	  var _ref$fontSize = _ref.fontSize,
	      fontSize = _ref$fontSize === undefined ? SIZE : _ref$fontSize,
	      _ref$fontFamily = _ref.fontFamily,
	      fontFamily = _ref$fontFamily === undefined ? TYPE : _ref$fontFamily;

	  return 'bold ' + fontSize + ' ' + fontFamily;
	}

	function getStyles(_ref2) {
	  var _ref2$BG = _ref2.BG,
	      BG = _ref2$BG === undefined ? '#fff' : _ref2$BG,
	      _ref2$groupBg = _ref2.groupBg,
	      groupBg = _ref2$groupBg === undefined ? '#f5f5f5' : _ref2$groupBg,
	      _ref2$lineColor = _ref2.lineColor,
	      lineColor = _ref2$lineColor === undefined ? '#eee' : _ref2$lineColor,
	      _ref2$redLineColor = _ref2.redLineColor,
	      redLineColor = _ref2$redLineColor === undefined ? '#f04134' : _ref2$redLineColor,
	      _ref2$baseBar = _ref2.baseBar,
	      baseBar = _ref2$baseBar === undefined ? '#b8c2cc' : _ref2$baseBar,
	      _ref2$greenBar = _ref2.greenBar,
	      greenBar = _ref2$greenBar === undefined ? '#52c41a' : _ref2$greenBar,
	      _ref2$groupBar = _ref2.groupBar,
	      groupBar = _ref2$groupBar === undefined ? '#52c41a' : _ref2$groupBar,
	      _ref2$redBar = _ref2.redBar,
	      redBar = _ref2$redBar === undefined ? '#ed7f2c' : _ref2$redBar,
	      _ref2$textColor = _ref2.textColor,
	      textColor = _ref2$textColor === undefined ? '#222' : _ref2$textColor,
	      _ref2$lightTextColor = _ref2.lightTextColor,
	      lightTextColor = _ref2$lightTextColor === undefined ? '#999' : _ref2$lightTextColor,
	      _ref2$lineWidth = _ref2.lineWidth,
	      lineWidth = _ref2$lineWidth === undefined ? '1px' : _ref2$lineWidth,
	      _ref2$thickLineWidth = _ref2.thickLineWidth,
	      thickLineWidth = _ref2$thickLineWidth === undefined ? '1.4px' : _ref2$thickLineWidth,
	      _ref2$fontSize = _ref2.fontSize,
	      fontSize = _ref2$fontSize === undefined ? SIZE : _ref2$fontSize,
	      _ref2$smallFontSize = _ref2.smallFontSize,
	      smallFontSize = _ref2$smallFontSize === undefined ? '12px' : _ref2$smallFontSize,
	      _ref2$fontFamily = _ref2.fontFamily,
	      fontFamily = _ref2$fontFamily === undefined ? TYPE : _ref2$fontFamily;

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
	    box: _extends$1({}, thickLine, {
	      fill: BG
	    }),
	    line: line,
	    cline: redLine,
	    bline: thickLine,
	    groupBg: {
	      fill: groupBg
	    },
	    label: text,
	    groupLabel: _extends$1({}, text, {
	      'font-weight': '600'
	    }),
	    text1: _extends$1({}, text, smallText, {
	      'text-anchor': 'end'
	    }),
	    text2: _extends$1({}, text, smallText),
	    text3: _extends$1({}, text, smallText, {
	      'text-anchor': 'middle'
	    }),
	    bar: {
	      fill: baseBar
	    },
	    green: {
	      fill: greenBar
	    },
	    red: {
	      fill: redBar
	    },
	    group: {
	      fill: groupBar
	    }
	  };
	}

	var LEGENDS = [{
	  type: 'bar',
	  name: 'Remaining'
	}, {
	  type: 'green',
	  name: 'Completed'
	}, {
	  type: 'red',
	  name: 'Delay'
	}];
	var UNIT = {
	  day: DAY / 28,
	  week: 7 * DAY / 56,
	  month: 30 * DAY / 56
	};
	function NOOP() {}

	function Gantt(_ref) {
	  var _ref$data = _ref.data,
	      data = _ref$data === undefined ? [] : _ref$data,
	      _ref$onClick = _ref.onClick,
	      onClick = _ref$onClick === undefined ? NOOP : _ref$onClick,
	      _ref$viewMode = _ref.viewMode,
	      viewMode = _ref$viewMode === undefined ? 'week' : _ref$viewMode,
	      _ref$maxTextWidth = _ref.maxTextWidth,
	      maxTextWidth = _ref$maxTextWidth === undefined ? 140 : _ref$maxTextWidth,
	      _ref$offsetY = _ref.offsetY,
	      offsetY = _ref$offsetY === undefined ? 60 : _ref$offsetY,
	      _ref$rowHeight = _ref.rowHeight,
	      rowHeight = _ref$rowHeight === undefined ? 40 : _ref$rowHeight,
	      _ref$barHeight = _ref.barHeight,
	      barHeight = _ref$barHeight === undefined ? 16 : _ref$barHeight,
	      _ref$thickWidth = _ref.thickWidth,
	      thickWidth = _ref$thickWidth === undefined ? 1.4 : _ref$thickWidth,
	      _ref$footerHeight = _ref.footerHeight,
	      footerHeight = _ref$footerHeight === undefined ? 50 : _ref$footerHeight,
	      _ref$legends = _ref.legends,
	      legends = _ref$legends === undefined ? LEGENDS : _ref$legends,
	      _ref$styleOptions = _ref.styleOptions,
	      styleOptions = _ref$styleOptions === undefined ? {} : _ref$styleOptions;

	  var unit = UNIT[viewMode];
	  var minTime = Math.min.apply(null, data.map(function (v) {
	    return v.from;
	  })) - unit * 40;
	  var maxTime = Math.max.apply(null, data.map(function (v) {
	    return v.to;
	  })) + unit * 40;

	  var width = (maxTime - minTime) / unit + maxTextWidth;
	  var height = data.length * rowHeight + offsetY + footerHeight;
	  var box = '0 0 ' + width + ' ' + height;
	  var current = new Date().getTime();
	  var styles = getStyles(styleOptions);

	  return h(
	    'svg',
	    { width: width, height: height, viewBox: box },
	    h(Layout, {
	      styles: styles,
	      width: width,
	      height: height,
	      offsetY: offsetY,
	      thickWidth: thickWidth,
	      maxTextWidth: maxTextWidth
	    }),
	    viewMode === 'day' ? h(DayHeader, {
	      styles: styles,
	      unit: unit,
	      height: height,
	      offsetY: offsetY,
	      minTime: minTime,
	      maxTime: maxTime,
	      maxTextWidth: maxTextWidth,
	      footerHeight: footerHeight
	    }) : null,
	    viewMode === 'week' ? h(WeekHeader, {
	      styles: styles,
	      unit: unit,
	      height: height,
	      offsetY: offsetY,
	      minTime: minTime,
	      maxTime: maxTime,
	      maxTextWidth: maxTextWidth,
	      footerHeight: footerHeight
	    }) : null,
	    viewMode === 'month' ? h(MonthHeader, {
	      styles: styles,
	      unit: unit,
	      offsetY: offsetY,
	      minTime: minTime,
	      maxTime: maxTime,
	      maxTextWidth: maxTextWidth,
	      footerHeight: footerHeight
	    }) : null,
	    h(Grid, {
	      styles: styles,
	      data: data,
	      width: width,
	      height: height,
	      offsetY: offsetY,
	      rowHeight: rowHeight,
	      thickWidth: thickWidth,
	      footerHeight: footerHeight,
	      maxTextWidth: maxTextWidth
	    }),
	    h(Labels, {
	      styles: styles,
	      data: data,
	      offsetY: offsetY,
	      rowHeight: rowHeight
	    }),
	    h(Bar, {
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
	      maxTextWidth: maxTextWidth,
	      footerHeight: footerHeight
	    }),
	    h(Legend, {
	      styles: styles,
	      legends: legends,
	      width: width,
	      height: height,
	      barHeight: barHeight,
	      footerHeight: footerHeight
	    })
	  );
	}

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _redefine = _hide;

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	var TO_STRING_TAG = _wks('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = _global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	}

	var f$3 = _wks;

	var _wksExt = {
		f: f$3
	};

	var iterator = _wksExt.f('iterator');

	var iterator$1 = createCommonjsModule(function (module) {
	module.exports = { "default": iterator, __esModule: true };
	});

	unwrapExports(iterator$1);

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var defineProperty$2 = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$2($Symbol, name, { value: _wksExt.f(name) });
	};

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$4
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = _objectGopn.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$5
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$6
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;



















	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$2];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$1({}, 'a', {
	    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
	} : dP$1;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$1(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	_wksDefine('asyncIterator');

	_wksDefine('observable');

	var symbol = _core.Symbol;

	var symbol$1 = createCommonjsModule(function (module) {
	module.exports = { "default": symbol, __esModule: true };
	});

	unwrapExports(symbol$1);

	var _typeof_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _iterator2 = _interopRequireDefault(iterator$1);



	var _symbol2 = _interopRequireDefault(symbol$1);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};
	});

	var _typeof = unwrapExports(_typeof_1);

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	var keys = _core.Object.keys;

	var keys$1 = createCommonjsModule(function (module) {
	module.exports = { "default": keys, __esModule: true };
	});

	var _Object$keys = unwrapExports(keys$1);

	var NS = 'http://www.w3.org/2000/svg';
	var doc = document;

	function applyProperties(node, props) {
	  _Object$keys(props).forEach(function (k) {
	    var v = props[k];
	    if (k === 'style' && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
	      _Object$keys(v).forEach(function (sk) {
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

	var SVGGantt = function () {
	  function SVGGantt(element, data) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    _classCallCheck(this, SVGGantt);

	    this.dom = typeof element === 'string' ? document.querySelector(element) : element;
	    this.data = formatData(data);
	    this.options = options;
	    this.render();
	  }

	  _createClass(SVGGantt, [{
	    key: 'setData',
	    value: function setData(data) {
	      this.data = formatData(data);
	      this.render();
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions(options) {
	      this.options = _extends$1({}, this.options, options);
	      this.render();
	    }
	  }, {
	    key: 'render',
	    value: function render$$1() {
	      var data = this.data,
	          options = this.options;

	      if (this.tree) {
	        this.dom.removeChild(this.tree);
	      }
	      if (!options.maxTextWidth) {
	        var font = getFont(options.styleOptions || {});
	        options.maxTextWidth = Math.max.apply(null, data.map(function (v) {
	          return textWidth(v.name, font, 20);
	        }));
	      }
	      this.tree = render(h(Gantt, _extends$1({ data: data }, options)));
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
	        style = _props$style === undefined ? {} : _props$style;

	    if (style.stroke) {
	      ctx.strokeStyle = style.stroke;
	      ctx.lineWidth = parseFloat(style['stroke-width'] || 1);
	    }
	    ctx.beginPath();
	    ctx.moveTo(x1, y1);
	    ctx.lineTo(x2, y2);
	    ctx.stroke();
	  }
	  if (tag === 'rect') {
	    var x = props.x,
	        y = props.y,
	        _width = props.width,
	        _height = props.height,
	        _props$rx = props.rx,
	        rx = _props$rx === undefined ? 0 : _props$rx,
	        _props$ry = props.ry,
	        ry = _props$ry === undefined ? 0 : _props$ry,
	        onClick = props.onClick,
	        _props$style2 = props.style,
	        _style = _props$style2 === undefined ? {} : _props$style2;

	    // From https://github.com/canvg/canvg


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

	    if (_style.fill) {
	      ctx.fillStyle = _style.fill;
	    }
	    ctx.fill();
	    if (_style.stroke) {
	      ctx.strokeStyle = _style.stroke;
	      ctx.lineWidth = parseFloat(_style['stroke-width'] || 1);
	      ctx.stroke();
	    }
	  }
	  if (tag === 'text') {
	    var _x = props.x,
	        _y = props.y,
	        _style2 = props.style;

	    if (_style2) {
	      ctx.fillStyle = _style2.fill;
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
	      ctx.textBaseline = BL[_style2['dominant-baseline']] || 'alphabetic';
	      ctx.textAlign = AL[_style2['text-anchor']] || 'start';
	      ctx.font = (_style2['font-weight'] || '') + ' ' + _style2['font-size'] + ' ' + _style2['font-family'];
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
	    _Object$defineProperty(ctx, key, {
	      get: function get() {
	        return canvas[key] / ratio;
	      },
	      set: function set(v) {
	        canvas[key] = v * ratio;
	        canvas.style[key] = v + 'px';
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

	var CanvasGantt = function () {
	  function CanvasGantt(element, data) {
	    var _this = this;

	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    _classCallCheck(this, CanvasGantt);

	    this.ctx = createContext(element);
	    this.data = formatData(data);
	    this.options = options;
	    this.render();
	    this.ctx.onClick = function (e) {
	      return _this.render(e);
	    };
	  }

	  _createClass(CanvasGantt, [{
	    key: 'setData',
	    value: function setData(data) {
	      this.data = formatData(data);
	      this.render();
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions(options) {
	      this.options = _extends$1({}, this.options, options);
	      this.render();
	    }
	  }, {
	    key: 'render',
	    value: function render(e) {
	      var data = this.data,
	          options = this.options;

	      if (!options.maxTextWidth) {
	        var font = getFont(options.styleOptions || {});
	        options.maxTextWidth = Math.max.apply(null, data.map(function (v) {
	          return textWidth(v.name, font, 20);
	        }));
	      }
	      render$1(h(Gantt, _extends$1({ data: data }, options)), this.ctx, e);
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
	  tokens.push('<' + tag);

	  _Object$keys(props || {}).forEach(function (k) {
	    var v = props[k];
	    if (k === 'onClick') return;
	    if (k === 'style' && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
	      v = _Object$keys(v).map(function (i) {
	        return i + ':' + v[i] + ';';
	      }).join('');
	    }
	    tokens.push(' ' + k + '="' + attrEscape(v) + '"');
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

	  tokens.push('</' + tag + '>');
	  return tokens.join('');
	}

	var StrGantt = function () {
	  function StrGantt(data) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, StrGantt);

	    this.data = formatData(data);
	    this.options = options;
	  }

	  _createClass(StrGantt, [{
	    key: 'setData',
	    value: function setData(data) {
	      this.data = formatData(data);
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions(options) {
	      this.options = _extends$1({}, this.options, options);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var data = this.data,
	          options = this.options;

	      return render$2(h(Gantt, _extends$1({ data: data }, options)));
	    }
	  }]);

	  return StrGantt;
	}();

	exports.default = CanvasGantt;
	exports.SVGGantt = SVGGantt;
	exports.CanvasGantt = CanvasGantt;
	exports.StrGantt = StrGantt;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
