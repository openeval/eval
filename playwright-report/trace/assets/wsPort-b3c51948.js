var Tp = Object.defineProperty;
var Np = (e, t, n) =>
  t in e
    ? Tp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var Z = (e, t, n) => (Np(e, typeof t != "symbol" ? t + "" : t, n), n);
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const s of i)
      if (s.type === "childList")
        for (const o of s.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const s = {};
    return (
      i.integrity && (s.integrity = i.integrity),
      i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : i.crossOrigin === "anonymous"
          ? (s.credentials = "omit")
          : (s.credentials = "same-origin"),
      s
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const s = n(i);
    fetch(i.href, s);
  }
})();
var by =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function Cp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Lc = { exports: {} },
  bs = {},
  Ac = { exports: {} },
  D = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ri = Symbol.for("react.element"),
  bp = Symbol.for("react.portal"),
  Lp = Symbol.for("react.fragment"),
  Ap = Symbol.for("react.strict_mode"),
  Mp = Symbol.for("react.profiler"),
  Pp = Symbol.for("react.provider"),
  Ip = Symbol.for("react.context"),
  Rp = Symbol.for("react.forward_ref"),
  $p = Symbol.for("react.suspense"),
  Op = Symbol.for("react.memo"),
  zp = Symbol.for("react.lazy"),
  Da = Symbol.iterator;
function Dp(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Da && e[Da]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Mc = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Pc = Object.assign,
  Ic = {};
function er(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Ic),
    (this.updater = n || Mc);
}
er.prototype.isReactComponent = {};
er.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
er.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Rc() {}
Rc.prototype = er.prototype;
function Rl(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Ic),
    (this.updater = n || Mc);
}
var $l = (Rl.prototype = new Rc());
$l.constructor = Rl;
Pc($l, er.prototype);
$l.isPureReactComponent = !0;
var Ha = Array.isArray,
  $c = Object.prototype.hasOwnProperty,
  Ol = { current: null },
  Oc = { key: !0, ref: !0, __self: !0, __source: !0 };
function zc(e, t, n) {
  var r,
    i = {},
    s = null,
    o = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (o = t.ref),
    t.key !== void 0 && (s = "" + t.key),
    t))
      $c.call(t, r) && !Oc.hasOwnProperty(r) && (i[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) i.children = n;
  else if (1 < l) {
    for (var a = Array(l), u = 0; u < l; u++) a[u] = arguments[u + 2];
    i.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((l = e.defaultProps), l)) i[r] === void 0 && (i[r] = l[r]);
  return {
    $$typeof: ri,
    type: e,
    key: s,
    ref: o,
    props: i,
    _owner: Ol.current,
  };
}
function Hp(e, t) {
  return {
    $$typeof: ri,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function zl(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ri;
}
function Fp(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Fa = /\/+/g;
function Js(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Fp("" + e.key)
    : t.toString(36);
}
function Ri(e, t, n, r, i) {
  var s = typeof e;
  (s === "undefined" || s === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else
    switch (s) {
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case ri:
          case bp:
            o = !0;
        }
    }
  if (o)
    return (
      (o = e),
      (i = i(o)),
      (e = r === "" ? "." + Js(o, 0) : r),
      Ha(i)
        ? ((n = ""),
          e != null && (n = e.replace(Fa, "$&/") + "/"),
          Ri(i, t, n, "", function (u) {
            return u;
          }))
        : i != null &&
          (zl(i) &&
            (i = Hp(
              i,
              n +
                (!i.key || (o && o.key === i.key)
                  ? ""
                  : ("" + i.key).replace(Fa, "$&/") + "/") +
                e,
            )),
          t.push(i)),
      1
    );
  if (((o = 0), (r = r === "" ? "." : r + ":"), Ha(e)))
    for (var l = 0; l < e.length; l++) {
      s = e[l];
      var a = r + Js(s, l);
      o += Ri(s, t, n, a, i);
    }
  else if (((a = Dp(e)), typeof a == "function"))
    for (e = a.call(e), l = 0; !(s = e.next()).done; )
      (s = s.value), (a = r + Js(s, l++)), (o += Ri(s, t, n, a, i));
  else if (s === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      ))
    );
  return o;
}
function fi(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Ri(e, r, "", "", function (s) {
      return t.call(n, s, i++);
    }),
    r
  );
}
function Up(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Ne = { current: null },
  $i = { transition: null },
  Vp = {
    ReactCurrentDispatcher: Ne,
    ReactCurrentBatchConfig: $i,
    ReactCurrentOwner: Ol,
  };
D.Children = {
  map: fi,
  forEach: function (e, t, n) {
    fi(
      e,
      function () {
        t.apply(this, arguments);
      },
      n,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      fi(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      fi(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!zl(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
D.Component = er;
D.Fragment = Lp;
D.Profiler = Mp;
D.PureComponent = Rl;
D.StrictMode = Ap;
D.Suspense = $p;
D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Vp;
D.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        ".",
    );
  var r = Pc({}, e.props),
    i = e.key,
    s = e.ref,
    o = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((s = t.ref), (o = Ol.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var l = e.type.defaultProps;
    for (a in t)
      $c.call(t, a) &&
        !Oc.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && l !== void 0 ? l[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    l = Array(a);
    for (var u = 0; u < a; u++) l[u] = arguments[u + 2];
    r.children = l;
  }
  return { $$typeof: ri, type: e.type, key: i, ref: s, props: r, _owner: o };
};
D.createContext = function (e) {
  return (
    (e = {
      $$typeof: Ip,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Pp, _context: e }),
    (e.Consumer = e)
  );
};
D.createElement = zc;
D.createFactory = function (e) {
  var t = zc.bind(null, e);
  return (t.type = e), t;
};
D.createRef = function () {
  return { current: null };
};
D.forwardRef = function (e) {
  return { $$typeof: Rp, render: e };
};
D.isValidElement = zl;
D.lazy = function (e) {
  return { $$typeof: zp, _payload: { _status: -1, _result: e }, _init: Up };
};
D.memo = function (e, t) {
  return { $$typeof: Op, type: e, compare: t === void 0 ? null : t };
};
D.startTransition = function (e) {
  var t = $i.transition;
  $i.transition = {};
  try {
    e();
  } finally {
    $i.transition = t;
  }
};
D.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
D.useCallback = function (e, t) {
  return Ne.current.useCallback(e, t);
};
D.useContext = function (e) {
  return Ne.current.useContext(e);
};
D.useDebugValue = function () {};
D.useDeferredValue = function (e) {
  return Ne.current.useDeferredValue(e);
};
D.useEffect = function (e, t) {
  return Ne.current.useEffect(e, t);
};
D.useId = function () {
  return Ne.current.useId();
};
D.useImperativeHandle = function (e, t, n) {
  return Ne.current.useImperativeHandle(e, t, n);
};
D.useInsertionEffect = function (e, t) {
  return Ne.current.useInsertionEffect(e, t);
};
D.useLayoutEffect = function (e, t) {
  return Ne.current.useLayoutEffect(e, t);
};
D.useMemo = function (e, t) {
  return Ne.current.useMemo(e, t);
};
D.useReducer = function (e, t, n) {
  return Ne.current.useReducer(e, t, n);
};
D.useRef = function (e) {
  return Ne.current.useRef(e);
};
D.useState = function (e) {
  return Ne.current.useState(e);
};
D.useSyncExternalStore = function (e, t, n) {
  return Ne.current.useSyncExternalStore(e, t, n);
};
D.useTransition = function () {
  return Ne.current.useTransition();
};
D.version = "18.1.0";
Ac.exports = D;
var L = Ac.exports;
const Ft = Cp(L);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Bp = L,
  jp = Symbol.for("react.element"),
  Wp = Symbol.for("react.fragment"),
  qp = Object.prototype.hasOwnProperty,
  Xp = Bp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Qp = { key: !0, ref: !0, __self: !0, __source: !0 };
function Dc(e, t, n) {
  var r,
    i = {},
    s = null,
    o = null;
  n !== void 0 && (s = "" + n),
    t.key !== void 0 && (s = "" + t.key),
    t.ref !== void 0 && (o = t.ref);
  for (r in t) qp.call(t, r) && !Qp.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: jp,
    type: e,
    key: s,
    ref: o,
    props: i,
    _owner: Xp.current,
  };
}
bs.Fragment = Wp;
bs.jsx = Dc;
bs.jsxs = Dc;
Lc.exports = bs;
var Dl = Lc.exports;
const at = Dl.Fragment,
  m = Dl.jsx,
  A = Dl.jsxs;
function Kp(e, t, n, r) {
  const [i, s] = Ft.useState(n);
  return (
    Ft.useEffect(() => {
      let o = !1;
      return (
        r !== void 0 && s(r),
        e().then((l) => {
          o || s(l);
        }),
        () => {
          o = !0;
        }
      );
    }, t),
    i
  );
}
function vn() {
  const e = Ft.useRef(null),
    [t, n] = Ft.useState(new DOMRect(0, 0, 10, 10));
  return (
    Ft.useLayoutEffect(() => {
      const r = e.current;
      if (!r) return;
      const i = new ResizeObserver((s) => {
        const o = s[s.length - 1];
        o && o.contentRect && n(o.contentRect);
      });
      return i.observe(r), () => i.disconnect();
    }, [e]),
    [t, e]
  );
}
function Ke(e) {
  if (!isFinite(e)) return "-";
  if (e === 0) return "0";
  if (e < 1e3) return e.toFixed(0) + "ms";
  const t = e / 1e3;
  if (t < 60) return t.toFixed(1) + "s";
  const n = t / 60;
  if (n < 60) return n.toFixed(1) + "m";
  const r = n / 60;
  return r < 24 ? r.toFixed(1) + "h" : (r / 24).toFixed(1) + "d";
}
function Gp(e) {
  if (e < 0 || !isFinite(e)) return "-";
  if (e === 0) return "0";
  if (e < 1e3) return e.toFixed(0);
  const t = e / 1024;
  if (t < 1e3) return t.toFixed(1) + "K";
  const n = t / 1024;
  return n < 1e3 ? n.toFixed(1) + "M" : (n / 1024).toFixed(1) + "G";
}
function Hc(e, t, n, r, i) {
  let s = r || 0,
    o = i !== void 0 ? i : e.length;
  for (; s < o; ) {
    const l = (s + o) >> 1;
    n(t, e[l]) >= 0 ? (s = l + 1) : (o = l);
  }
  return o;
}
function Yp(e) {
  const t = document.createElement("textarea");
  (t.style.position = "absolute"),
    (t.style.zIndex = "-1000"),
    (t.value = e),
    document.body.appendChild(t),
    t.select(),
    document.execCommand("copy"),
    t.remove();
}
function Yi(e, t) {
  const n = e ? Dr.getObject(e, t) : t,
    [r, i] = Ft.useState(n);
  return [
    r,
    (o) => {
      e && Dr.setObject(e, o), i(o);
    },
  ];
}
class Jp {
  getString(t, n) {
    return localStorage[t] || n;
  }
  setString(t, n) {
    (localStorage[t] = n), window.saveSettings && window.saveSettings();
  }
  getObject(t, n) {
    if (!localStorage[t]) return n;
    try {
      return JSON.parse(localStorage[t]);
    } catch {
      return n;
    }
  }
  setObject(t, n) {
    (localStorage[t] = JSON.stringify(n)),
      window.saveSettings && window.saveSettings();
  }
}
const Dr = new Jp();
function Ly() {
  if (document.playwrightThemeInitialized) return;
  (document.playwrightThemeInitialized = !0),
    document.defaultView.addEventListener(
      "focus",
      (n) => {
        n.target.document.nodeType === Node.DOCUMENT_NODE &&
          document.body.classList.remove("inactive");
      },
      !1,
    ),
    document.defaultView.addEventListener(
      "blur",
      (n) => {
        document.body.classList.add("inactive");
      },
      !1,
    );
  const e = Dr.getString("theme", "light-mode"),
    t = window.matchMedia("(prefers-color-scheme: dark)");
  (e === "dark-mode" || t.matches) && document.body.classList.add("dark-mode");
}
const Hl = new Set();
function Ay() {
  const e = Dr.getString("theme", "light-mode");
  let t;
  e === "dark-mode" ? (t = "light-mode") : (t = "dark-mode"),
    e && document.body.classList.remove(e),
    document.body.classList.add(t),
    Dr.setString("theme", t);
  for (const n of Hl) n(t);
}
function My(e) {
  Hl.add(e);
}
function Py(e) {
  Hl.delete(e);
}
function Iy() {
  return document.body.classList.contains("dark-mode")
    ? "dark-mode"
    : "light-mode";
}
var Fc = { exports: {} },
  Ve = {},
  Uc = { exports: {} },
  Vc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(I, z) {
    var O = I.length;
    I.push(z);
    e: for (; 0 < O; ) {
      var X = (O - 1) >>> 1,
        ne = I[X];
      if (0 < i(ne, z)) (I[X] = z), (I[O] = ne), (O = X);
      else break e;
    }
  }
  function n(I) {
    return I.length === 0 ? null : I[0];
  }
  function r(I) {
    if (I.length === 0) return null;
    var z = I[0],
      O = I.pop();
    if (O !== z) {
      I[0] = O;
      e: for (var X = 0, ne = I.length, xn = ne >>> 1; X < xn; ) {
        var gt = 2 * (X + 1) - 1,
          en = I[gt],
          vt = gt + 1,
          Sn = I[vt];
        if (0 > i(en, O))
          vt < ne && 0 > i(Sn, en)
            ? ((I[X] = Sn), (I[vt] = O), (X = vt))
            : ((I[X] = en), (I[gt] = O), (X = gt));
        else if (vt < ne && 0 > i(Sn, O)) (I[X] = Sn), (I[vt] = O), (X = vt);
        else break e;
      }
    }
    return z;
  }
  function i(I, z) {
    var O = I.sortIndex - z.sortIndex;
    return O !== 0 ? O : I.id - z.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var s = performance;
    e.unstable_now = function () {
      return s.now();
    };
  } else {
    var o = Date,
      l = o.now();
    e.unstable_now = function () {
      return o.now() - l;
    };
  }
  var a = [],
    u = [],
    c = 1,
    p = null,
    d = 3,
    v = !1,
    y = !1,
    x = !1,
    w = typeof setTimeout == "function" ? setTimeout : null,
    h = typeof clearTimeout == "function" ? clearTimeout : null,
    f = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(I) {
    for (var z = n(u); z !== null; ) {
      if (z.callback === null) r(u);
      else if (z.startTime <= I)
        r(u), (z.sortIndex = z.expirationTime), t(a, z);
      else break;
      z = n(u);
    }
  }
  function _(I) {
    if (((x = !1), g(I), !y))
      if (n(a) !== null) (y = !0), be(k);
      else {
        var z = n(u);
        z !== null && Le(_, z.startTime - I);
      }
  }
  function k(I, z) {
    (y = !1), x && ((x = !1), h(E), (E = -1)), (v = !0);
    var O = d;
    try {
      for (
        g(z), p = n(a);
        p !== null && (!(p.expirationTime > z) || (I && !$()));

      ) {
        var X = p.callback;
        if (typeof X == "function") {
          (p.callback = null), (d = p.priorityLevel);
          var ne = X(p.expirationTime <= z);
          (z = e.unstable_now()),
            typeof ne == "function" ? (p.callback = ne) : p === n(a) && r(a),
            g(z);
        } else r(a);
        p = n(a);
      }
      if (p !== null) var xn = !0;
      else {
        var gt = n(u);
        gt !== null && Le(_, gt.startTime - z), (xn = !1);
      }
      return xn;
    } finally {
      (p = null), (d = O), (v = !1);
    }
  }
  var N = !1,
    C = null,
    E = -1,
    S = 5,
    M = -1;
  function $() {
    return !(e.unstable_now() - M < S);
  }
  function T() {
    if (C !== null) {
      var I = e.unstable_now();
      M = I;
      var z = !0;
      try {
        z = C(!0, I);
      } finally {
        z ? P() : ((N = !1), (C = null));
      }
    } else N = !1;
  }
  var P;
  if (typeof f == "function")
    P = function () {
      f(T);
    };
  else if (typeof MessageChannel < "u") {
    var F = new MessageChannel(),
      je = F.port2;
    (F.port1.onmessage = T),
      (P = function () {
        je.postMessage(null);
      });
  } else
    P = function () {
      w(T, 0);
    };
  function be(I) {
    (C = I), N || ((N = !0), P());
  }
  function Le(I, z) {
    E = w(function () {
      I(e.unstable_now());
    }, z);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (I) {
      I.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      y || v || ((y = !0), be(k));
    }),
    (e.unstable_forceFrameRate = function (I) {
      0 > I || 125 < I
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (S = 0 < I ? Math.floor(1e3 / I) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return d;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (I) {
      switch (d) {
        case 1:
        case 2:
        case 3:
          var z = 3;
          break;
        default:
          z = d;
      }
      var O = d;
      d = z;
      try {
        return I();
      } finally {
        d = O;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (I, z) {
      switch (I) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          I = 3;
      }
      var O = d;
      d = I;
      try {
        return z();
      } finally {
        d = O;
      }
    }),
    (e.unstable_scheduleCallback = function (I, z, O) {
      var X = e.unstable_now();
      switch (
        (typeof O == "object" && O !== null
          ? ((O = O.delay), (O = typeof O == "number" && 0 < O ? X + O : X))
          : (O = X),
        I)
      ) {
        case 1:
          var ne = -1;
          break;
        case 2:
          ne = 250;
          break;
        case 5:
          ne = 1073741823;
          break;
        case 4:
          ne = 1e4;
          break;
        default:
          ne = 5e3;
      }
      return (
        (ne = O + ne),
        (I = {
          id: c++,
          callback: z,
          priorityLevel: I,
          startTime: O,
          expirationTime: ne,
          sortIndex: -1,
        }),
        O > X
          ? ((I.sortIndex = O),
            t(u, I),
            n(a) === null &&
              I === n(u) &&
              (x ? (h(E), (E = -1)) : (x = !0), Le(_, O - X)))
          : ((I.sortIndex = ne), t(a, I), y || v || ((y = !0), be(k))),
        I
      );
    }),
    (e.unstable_shouldYield = $),
    (e.unstable_wrapCallback = function (I) {
      var z = d;
      return function () {
        var O = d;
        d = z;
        try {
          return I.apply(this, arguments);
        } finally {
          d = O;
        }
      };
    });
})(Vc);
Uc.exports = Vc;
var Zp = Uc.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Bc = L,
  Ue = Zp;
function b(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var jc = new Set(),
  Hr = {};
function yn(e, t) {
  Qn(e, t), Qn(e + "Capture", t);
}
function Qn(e, t) {
  for (Hr[e] = t, e = 0; e < t.length; e++) jc.add(t[e]);
}
var Ct = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Mo = Object.prototype.hasOwnProperty,
  em =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Ua = {},
  Va = {};
function tm(e) {
  return Mo.call(Va, e)
    ? !0
    : Mo.call(Ua, e)
      ? !1
      : em.test(e)
        ? (Va[e] = !0)
        : ((Ua[e] = !0), !1);
}
function nm(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function rm(e, t, n, r) {
  if (t === null || typeof t > "u" || nm(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Ce(e, t, n, r, i, s, o) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = s),
    (this.removeEmptyString = o);
}
var pe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    pe[e] = new Ce(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  pe[t] = new Ce(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  pe[e] = new Ce(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  pe[e] = new Ce(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    pe[e] = new Ce(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  pe[e] = new Ce(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  pe[e] = new Ce(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  pe[e] = new Ce(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  pe[e] = new Ce(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Fl = /[\-:]([a-z])/g;
function Ul(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Fl, Ul);
    pe[t] = new Ce(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Fl, Ul);
    pe[t] = new Ce(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Fl, Ul);
  pe[t] = new Ce(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  pe[e] = new Ce(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
pe.xlinkHref = new Ce(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  pe[e] = new Ce(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Vl(e, t, n, r) {
  var i = pe.hasOwnProperty(t) ? pe[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (rm(t, n, i, r) && (n = null),
    r || i === null
      ? tm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
        ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
        : ((t = i.attributeName),
          (r = i.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((i = i.type),
              (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var At = Bc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  hi = Symbol.for("react.element"),
  Cn = Symbol.for("react.portal"),
  bn = Symbol.for("react.fragment"),
  Bl = Symbol.for("react.strict_mode"),
  Po = Symbol.for("react.profiler"),
  Wc = Symbol.for("react.provider"),
  qc = Symbol.for("react.context"),
  jl = Symbol.for("react.forward_ref"),
  Io = Symbol.for("react.suspense"),
  Ro = Symbol.for("react.suspense_list"),
  Wl = Symbol.for("react.memo"),
  Pt = Symbol.for("react.lazy"),
  Xc = Symbol.for("react.offscreen"),
  Ba = Symbol.iterator;
function ar(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Ba && e[Ba]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var G = Object.assign,
  Zs;
function Er(e) {
  if (Zs === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Zs = (t && t[1]) || "";
    }
  return (
    `
` +
    Zs +
    e
  );
}
var eo = !1;
function to(e, t) {
  if (!e || eo) return "";
  eo = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var i = u.stack.split(`
`),
          s = r.stack.split(`
`),
          o = i.length - 1,
          l = s.length - 1;
        1 <= o && 0 <= l && i[o] !== s[l];

      )
        l--;
      for (; 1 <= o && 0 <= l; o--, l--)
        if (i[o] !== s[l]) {
          if (o !== 1 || l !== 1)
            do
              if ((o--, l--, 0 > l || i[o] !== s[l])) {
                var a =
                  `
` + i[o].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= o && 0 <= l);
          break;
        }
    }
  } finally {
    (eo = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? Er(e) : "";
}
function im(e) {
  switch (e.tag) {
    case 5:
      return Er(e.type);
    case 16:
      return Er("Lazy");
    case 13:
      return Er("Suspense");
    case 19:
      return Er("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = to(e.type, !1)), e;
    case 11:
      return (e = to(e.type.render, !1)), e;
    case 1:
      return (e = to(e.type, !0)), e;
    default:
      return "";
  }
}
function $o(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case bn:
      return "Fragment";
    case Cn:
      return "Portal";
    case Po:
      return "Profiler";
    case Bl:
      return "StrictMode";
    case Io:
      return "Suspense";
    case Ro:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case qc:
        return (e.displayName || "Context") + ".Consumer";
      case Wc:
        return (e._context.displayName || "Context") + ".Provider";
      case jl:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Wl:
        return (
          (t = e.displayName || null), t !== null ? t : $o(e.type) || "Memo"
        );
      case Pt:
        (t = e._payload), (e = e._init);
        try {
          return $o(e(t));
        } catch {}
    }
  return null;
}
function sm(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return $o(t);
    case 8:
      return t === Bl ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Xt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Qc(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function om(e) {
  var t = Qc(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      s = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (o) {
          (r = "" + o), s.call(this, o);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (o) {
          r = "" + o;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function pi(e) {
  e._valueTracker || (e._valueTracker = om(e));
}
function Kc(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Qc(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Ji(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Oo(e, t) {
  var n = t.checked;
  return G({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function ja(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = Xt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function Gc(e, t) {
  (t = t.checked), t != null && Vl(e, "checked", t, !1);
}
function zo(e, t) {
  Gc(e, t);
  var n = Xt(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? Do(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Do(e, t.type, Xt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function Wa(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function Do(e, t, n) {
  (t !== "number" || Ji(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var kr = Array.isArray;
function Un(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Xt(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ho(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(b(91));
  return G({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function qa(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(b(92));
      if (kr(n)) {
        if (1 < n.length) throw Error(b(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: Xt(n) };
}
function Yc(e, t) {
  var n = Xt(t.value),
    r = Xt(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function Xa(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Jc(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Fo(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Jc(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var mi,
  Zc = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        mi = mi || document.createElement("div"),
          mi.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = mi.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Fr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Lr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  lm = ["Webkit", "ms", "Moz", "O"];
Object.keys(Lr).forEach(function (e) {
  lm.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Lr[t] = Lr[e]);
  });
});
function ed(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Lr.hasOwnProperty(e) && Lr[e])
      ? ("" + t).trim()
      : t + "px";
}
function td(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = ed(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
var am = G(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function Uo(e, t) {
  if (t) {
    if (am[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(b(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(b(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(b(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(b(62));
  }
}
function Vo(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Bo = null;
function ql(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var jo = null,
  Vn = null,
  Bn = null;
function Qa(e) {
  if ((e = oi(e))) {
    if (typeof jo != "function") throw Error(b(280));
    var t = e.stateNode;
    t && ((t = Is(t)), jo(e.stateNode, e.type, t));
  }
}
function nd(e) {
  Vn ? (Bn ? Bn.push(e) : (Bn = [e])) : (Vn = e);
}
function rd() {
  if (Vn) {
    var e = Vn,
      t = Bn;
    if (((Bn = Vn = null), Qa(e), t)) for (e = 0; e < t.length; e++) Qa(t[e]);
  }
}
function id(e, t) {
  return e(t);
}
function sd() {}
var no = !1;
function od(e, t, n) {
  if (no) return e(t, n);
  no = !0;
  try {
    return id(e, t, n);
  } finally {
    (no = !1), (Vn !== null || Bn !== null) && (sd(), rd());
  }
}
function Ur(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Is(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(b(231, t, typeof n));
  return n;
}
var Wo = !1;
if (Ct)
  try {
    var ur = {};
    Object.defineProperty(ur, "passive", {
      get: function () {
        Wo = !0;
      },
    }),
      window.addEventListener("test", ur, ur),
      window.removeEventListener("test", ur, ur);
  } catch {
    Wo = !1;
  }
function um(e, t, n, r, i, s, o, l, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var Ar = !1,
  Zi = null,
  es = !1,
  qo = null,
  cm = {
    onError: function (e) {
      (Ar = !0), (Zi = e);
    },
  };
function dm(e, t, n, r, i, s, o, l, a) {
  (Ar = !1), (Zi = null), um.apply(cm, arguments);
}
function fm(e, t, n, r, i, s, o, l, a) {
  if ((dm.apply(this, arguments), Ar)) {
    if (Ar) {
      var u = Zi;
      (Ar = !1), (Zi = null);
    } else throw Error(b(198));
    es || ((es = !0), (qo = u));
  }
}
function wn(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function ld(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Ka(e) {
  if (wn(e) !== e) throw Error(b(188));
}
function hm(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = wn(e)), t === null)) throw Error(b(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var s = i.alternate;
    if (s === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === s.child) {
      for (s = i.child; s; ) {
        if (s === n) return Ka(i), e;
        if (s === r) return Ka(i), t;
        s = s.sibling;
      }
      throw Error(b(188));
    }
    if (n.return !== r.return) (n = i), (r = s);
    else {
      for (var o = !1, l = i.child; l; ) {
        if (l === n) {
          (o = !0), (n = i), (r = s);
          break;
        }
        if (l === r) {
          (o = !0), (r = i), (n = s);
          break;
        }
        l = l.sibling;
      }
      if (!o) {
        for (l = s.child; l; ) {
          if (l === n) {
            (o = !0), (n = s), (r = i);
            break;
          }
          if (l === r) {
            (o = !0), (r = s), (n = i);
            break;
          }
          l = l.sibling;
        }
        if (!o) throw Error(b(189));
      }
    }
    if (n.alternate !== r) throw Error(b(190));
  }
  if (n.tag !== 3) throw Error(b(188));
  return n.stateNode.current === n ? e : t;
}
function ad(e) {
  return (e = hm(e)), e !== null ? ud(e) : null;
}
function ud(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = ud(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var cd = Ue.unstable_scheduleCallback,
  Ga = Ue.unstable_cancelCallback,
  pm = Ue.unstable_shouldYield,
  mm = Ue.unstable_requestPaint,
  ee = Ue.unstable_now,
  gm = Ue.unstable_getCurrentPriorityLevel,
  Xl = Ue.unstable_ImmediatePriority,
  dd = Ue.unstable_UserBlockingPriority,
  ts = Ue.unstable_NormalPriority,
  vm = Ue.unstable_LowPriority,
  fd = Ue.unstable_IdlePriority,
  Ls = null,
  pt = null;
function ym(e) {
  if (pt && typeof pt.onCommitFiberRoot == "function")
    try {
      pt.onCommitFiberRoot(Ls, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var st = Math.clz32 ? Math.clz32 : Sm,
  wm = Math.log,
  xm = Math.LN2;
function Sm(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((wm(e) / xm) | 0)) | 0;
}
var gi = 64,
  vi = 4194304;
function Tr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function ns(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    s = e.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var l = o & ~i;
    l !== 0 ? (r = Tr(l)) : ((s &= o), s !== 0 && (r = Tr(s)));
  } else (o = n & ~i), o !== 0 ? (r = Tr(o)) : s !== 0 && (r = Tr(s));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (s = t & -t), i >= s || (i === 16 && (s & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - st(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
  return r;
}
function _m(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Em(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      s = e.pendingLanes;
    0 < s;

  ) {
    var o = 31 - st(s),
      l = 1 << o,
      a = i[o];
    a === -1
      ? (!(l & n) || l & r) && (i[o] = _m(l, t))
      : a <= t && (e.expiredLanes |= l),
      (s &= ~l);
  }
}
function Xo(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function hd() {
  var e = gi;
  return (gi <<= 1), !(gi & 4194240) && (gi = 64), e;
}
function ro(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function ii(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - st(t)),
    (e[t] = n);
}
function km(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - st(n),
      s = 1 << i;
    (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~s);
  }
}
function Ql(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - st(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var U = 0;
function pd(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var md,
  Kl,
  gd,
  vd,
  yd,
  Qo = !1,
  yi = [],
  Ut = null,
  Vt = null,
  Bt = null,
  Vr = new Map(),
  Br = new Map(),
  Ot = [],
  Tm =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function Ya(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Ut = null;
      break;
    case "dragenter":
    case "dragleave":
      Vt = null;
      break;
    case "mouseover":
    case "mouseout":
      Bt = null;
      break;
    case "pointerover":
    case "pointerout":
      Vr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Br.delete(t.pointerId);
  }
}
function cr(e, t, n, r, i, s) {
  return e === null || e.nativeEvent !== s
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: s,
        targetContainers: [i],
      }),
      t !== null && ((t = oi(t)), t !== null && Kl(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function Nm(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return (Ut = cr(Ut, e, t, n, r, i)), !0;
    case "dragenter":
      return (Vt = cr(Vt, e, t, n, r, i)), !0;
    case "mouseover":
      return (Bt = cr(Bt, e, t, n, r, i)), !0;
    case "pointerover":
      var s = i.pointerId;
      return Vr.set(s, cr(Vr.get(s) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return (
        (s = i.pointerId), Br.set(s, cr(Br.get(s) || null, e, t, n, r, i)), !0
      );
  }
  return !1;
}
function wd(e) {
  var t = rn(e.target);
  if (t !== null) {
    var n = wn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = ld(n)), t !== null)) {
          (e.blockedOn = t),
            yd(e.priority, function () {
              gd(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Oi(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Ko(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (Bo = r), n.target.dispatchEvent(r), (Bo = null);
    } else return (t = oi(n)), t !== null && Kl(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Ja(e, t, n) {
  Oi(e) && n.delete(t);
}
function Cm() {
  (Qo = !1),
    Ut !== null && Oi(Ut) && (Ut = null),
    Vt !== null && Oi(Vt) && (Vt = null),
    Bt !== null && Oi(Bt) && (Bt = null),
    Vr.forEach(Ja),
    Br.forEach(Ja);
}
function dr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Qo ||
      ((Qo = !0),
      Ue.unstable_scheduleCallback(Ue.unstable_NormalPriority, Cm)));
}
function jr(e) {
  function t(i) {
    return dr(i, e);
  }
  if (0 < yi.length) {
    dr(yi[0], e);
    for (var n = 1; n < yi.length; n++) {
      var r = yi[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Ut !== null && dr(Ut, e),
      Vt !== null && dr(Vt, e),
      Bt !== null && dr(Bt, e),
      Vr.forEach(t),
      Br.forEach(t),
      n = 0;
    n < Ot.length;
    n++
  )
    (r = Ot[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Ot.length && ((n = Ot[0]), n.blockedOn === null); )
    wd(n), n.blockedOn === null && Ot.shift();
}
var jn = At.ReactCurrentBatchConfig,
  rs = !0;
function bm(e, t, n, r) {
  var i = U,
    s = jn.transition;
  jn.transition = null;
  try {
    (U = 1), Gl(e, t, n, r);
  } finally {
    (U = i), (jn.transition = s);
  }
}
function Lm(e, t, n, r) {
  var i = U,
    s = jn.transition;
  jn.transition = null;
  try {
    (U = 4), Gl(e, t, n, r);
  } finally {
    (U = i), (jn.transition = s);
  }
}
function Gl(e, t, n, r) {
  if (rs) {
    var i = Ko(e, t, n, r);
    if (i === null) po(e, t, r, is, n), Ya(e, r);
    else if (Nm(i, e, t, n, r)) r.stopPropagation();
    else if ((Ya(e, r), t & 4 && -1 < Tm.indexOf(e))) {
      for (; i !== null; ) {
        var s = oi(i);
        if (
          (s !== null && md(s),
          (s = Ko(e, t, n, r)),
          s === null && po(e, t, r, is, n),
          s === i)
        )
          break;
        i = s;
      }
      i !== null && r.stopPropagation();
    } else po(e, t, r, null, n);
  }
}
var is = null;
function Ko(e, t, n, r) {
  if (((is = null), (e = ql(r)), (e = rn(e)), e !== null))
    if (((t = wn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = ld(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (is = e), null;
}
function xd(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (gm()) {
        case Xl:
          return 1;
        case dd:
          return 4;
        case ts:
        case vm:
          return 16;
        case fd:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Dt = null,
  Yl = null,
  zi = null;
function Sd() {
  if (zi) return zi;
  var e,
    t = Yl,
    n = t.length,
    r,
    i = "value" in Dt ? Dt.value : Dt.textContent,
    s = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === i[s - r]; r++);
  return (zi = i.slice(e, 1 < r ? 1 - r : void 0));
}
function Di(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function wi() {
  return !0;
}
function Za() {
  return !1;
}
function Be(e) {
  function t(n, r, i, s, o) {
    (this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = s),
      (this.target = o),
      (this.currentTarget = null);
    for (var l in e)
      e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(s) : s[l]));
    return (
      (this.isDefaultPrevented = (
        s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1
      )
        ? wi
        : Za),
      (this.isPropagationStopped = Za),
      this
    );
  }
  return (
    G(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = wi));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = wi));
      },
      persist: function () {},
      isPersistent: wi,
    }),
    t
  );
}
var tr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Jl = Be(tr),
  si = G({}, tr, { view: 0, detail: 0 }),
  Am = Be(si),
  io,
  so,
  fr,
  As = G({}, si, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Zl,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== fr &&
            (fr && e.type === "mousemove"
              ? ((io = e.screenX - fr.screenX), (so = e.screenY - fr.screenY))
              : (so = io = 0),
            (fr = e)),
          io);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : so;
    },
  }),
  eu = Be(As),
  Mm = G({}, As, { dataTransfer: 0 }),
  Pm = Be(Mm),
  Im = G({}, si, { relatedTarget: 0 }),
  oo = Be(Im),
  Rm = G({}, tr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  $m = Be(Rm),
  Om = G({}, tr, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  zm = Be(Om),
  Dm = G({}, tr, { data: 0 }),
  tu = Be(Dm),
  Hm = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Fm = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Um = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Vm(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Um[e]) ? !!t[e] : !1;
}
function Zl() {
  return Vm;
}
var Bm = G({}, si, {
    key: function (e) {
      if (e.key) {
        var t = Hm[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Di(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Fm[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Zl,
    charCode: function (e) {
      return e.type === "keypress" ? Di(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Di(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  jm = Be(Bm),
  Wm = G({}, As, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  nu = Be(Wm),
  qm = G({}, si, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Zl,
  }),
  Xm = Be(qm),
  Qm = G({}, tr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Km = Be(Qm),
  Gm = G({}, As, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Ym = Be(Gm),
  Jm = [9, 13, 27, 32],
  ea = Ct && "CompositionEvent" in window,
  Mr = null;
Ct && "documentMode" in document && (Mr = document.documentMode);
var Zm = Ct && "TextEvent" in window && !Mr,
  _d = Ct && (!ea || (Mr && 8 < Mr && 11 >= Mr)),
  ru = String.fromCharCode(32),
  iu = !1;
function Ed(e, t) {
  switch (e) {
    case "keyup":
      return Jm.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function kd(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Ln = !1;
function eg(e, t) {
  switch (e) {
    case "compositionend":
      return kd(t);
    case "keypress":
      return t.which !== 32 ? null : ((iu = !0), ru);
    case "textInput":
      return (e = t.data), e === ru && iu ? null : e;
    default:
      return null;
  }
}
function tg(e, t) {
  if (Ln)
    return e === "compositionend" || (!ea && Ed(e, t))
      ? ((e = Sd()), (zi = Yl = Dt = null), (Ln = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return _d && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var ng = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function su(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!ng[e.type] : t === "textarea";
}
function Td(e, t, n, r) {
  nd(r),
    (t = ss(t, "onChange")),
    0 < t.length &&
      ((n = new Jl("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Pr = null,
  Wr = null;
function rg(e) {
  Od(e, 0);
}
function Ms(e) {
  var t = Pn(e);
  if (Kc(t)) return e;
}
function ig(e, t) {
  if (e === "change") return t;
}
var Nd = !1;
if (Ct) {
  var lo;
  if (Ct) {
    var ao = "oninput" in document;
    if (!ao) {
      var ou = document.createElement("div");
      ou.setAttribute("oninput", "return;"),
        (ao = typeof ou.oninput == "function");
    }
    lo = ao;
  } else lo = !1;
  Nd = lo && (!document.documentMode || 9 < document.documentMode);
}
function lu() {
  Pr && (Pr.detachEvent("onpropertychange", Cd), (Wr = Pr = null));
}
function Cd(e) {
  if (e.propertyName === "value" && Ms(Wr)) {
    var t = [];
    Td(t, Wr, e, ql(e)), od(rg, t);
  }
}
function sg(e, t, n) {
  e === "focusin"
    ? (lu(), (Pr = t), (Wr = n), Pr.attachEvent("onpropertychange", Cd))
    : e === "focusout" && lu();
}
function og(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Ms(Wr);
}
function lg(e, t) {
  if (e === "click") return Ms(t);
}
function ag(e, t) {
  if (e === "input" || e === "change") return Ms(t);
}
function ug(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var lt = typeof Object.is == "function" ? Object.is : ug;
function qr(e, t) {
  if (lt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!Mo.call(t, i) || !lt(e[i], t[i])) return !1;
  }
  return !0;
}
function au(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function uu(e, t) {
  var n = au(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = au(n);
  }
}
function bd(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? bd(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Ld() {
  for (var e = window, t = Ji(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Ji(e.document);
  }
  return t;
}
function ta(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function cg(e) {
  var t = Ld(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    bd(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && ta(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          s = Math.min(r.start, i);
        (r = r.end === void 0 ? s : Math.min(r.end, i)),
          !e.extend && s > r && ((i = r), (r = s), (s = i)),
          (i = uu(n, s));
        var o = uu(n, r);
        i &&
          o &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== o.node ||
            e.focusOffset !== o.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          s > r
            ? (e.addRange(t), e.extend(o.node, o.offset))
            : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var dg = Ct && "documentMode" in document && 11 >= document.documentMode,
  An = null,
  Go = null,
  Ir = null,
  Yo = !1;
function cu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Yo ||
    An == null ||
    An !== Ji(r) ||
    ((r = An),
    "selectionStart" in r && ta(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Ir && qr(Ir, r)) ||
      ((Ir = r),
      (r = ss(Go, "onSelect")),
      0 < r.length &&
        ((t = new Jl("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = An))));
}
function xi(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Mn = {
    animationend: xi("Animation", "AnimationEnd"),
    animationiteration: xi("Animation", "AnimationIteration"),
    animationstart: xi("Animation", "AnimationStart"),
    transitionend: xi("Transition", "TransitionEnd"),
  },
  uo = {},
  Ad = {};
Ct &&
  ((Ad = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Mn.animationend.animation,
    delete Mn.animationiteration.animation,
    delete Mn.animationstart.animation),
  "TransitionEvent" in window || delete Mn.transitionend.transition);
function Ps(e) {
  if (uo[e]) return uo[e];
  if (!Mn[e]) return e;
  var t = Mn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Ad) return (uo[e] = t[n]);
  return e;
}
var Md = Ps("animationend"),
  Pd = Ps("animationiteration"),
  Id = Ps("animationstart"),
  Rd = Ps("transitionend"),
  $d = new Map(),
  du =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function Yt(e, t) {
  $d.set(e, t), yn(t, [e]);
}
for (var co = 0; co < du.length; co++) {
  var fo = du[co],
    fg = fo.toLowerCase(),
    hg = fo[0].toUpperCase() + fo.slice(1);
  Yt(fg, "on" + hg);
}
Yt(Md, "onAnimationEnd");
Yt(Pd, "onAnimationIteration");
Yt(Id, "onAnimationStart");
Yt("dblclick", "onDoubleClick");
Yt("focusin", "onFocus");
Yt("focusout", "onBlur");
Yt(Rd, "onTransitionEnd");
Qn("onMouseEnter", ["mouseout", "mouseover"]);
Qn("onMouseLeave", ["mouseout", "mouseover"]);
Qn("onPointerEnter", ["pointerout", "pointerover"]);
Qn("onPointerLeave", ["pointerout", "pointerover"]);
yn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
yn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
yn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
yn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
yn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
yn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var Nr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  pg = new Set("cancel close invalid load scroll toggle".split(" ").concat(Nr));
function fu(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), fm(r, t, void 0, e), (e.currentTarget = null);
}
function Od(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var s = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var l = r[o],
            a = l.instance,
            u = l.currentTarget;
          if (((l = l.listener), a !== s && i.isPropagationStopped())) break e;
          fu(i, l, u), (s = a);
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((l = r[o]),
            (a = l.instance),
            (u = l.currentTarget),
            (l = l.listener),
            a !== s && i.isPropagationStopped())
          )
            break e;
          fu(i, l, u), (s = a);
        }
    }
  }
  if (es) throw ((e = qo), (es = !1), (qo = null), e);
}
function j(e, t) {
  var n = t[nl];
  n === void 0 && (n = t[nl] = new Set());
  var r = e + "__bubble";
  n.has(r) || (zd(t, e, 2, !1), n.add(r));
}
function ho(e, t, n) {
  var r = 0;
  t && (r |= 4), zd(n, e, r, t);
}
var Si = "_reactListening" + Math.random().toString(36).slice(2);
function Xr(e) {
  if (!e[Si]) {
    (e[Si] = !0),
      jc.forEach(function (n) {
        n !== "selectionchange" && (pg.has(n) || ho(n, !1, e), ho(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Si] || ((t[Si] = !0), ho("selectionchange", !1, t));
  }
}
function zd(e, t, n, r) {
  switch (xd(t)) {
    case 1:
      var i = bm;
      break;
    case 4:
      i = Lm;
      break;
    default:
      i = Gl;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !Wo ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
        ? e.addEventListener(t, n, { passive: i })
        : e.addEventListener(t, n, !1);
}
function po(e, t, n, r, i) {
  var s = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var o = r.tag;
      if (o === 3 || o === 4) {
        var l = r.stateNode.containerInfo;
        if (l === i || (l.nodeType === 8 && l.parentNode === i)) break;
        if (o === 4)
          for (o = r.return; o !== null; ) {
            var a = o.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = o.stateNode.containerInfo),
              a === i || (a.nodeType === 8 && a.parentNode === i))
            )
              return;
            o = o.return;
          }
        for (; l !== null; ) {
          if (((o = rn(l)), o === null)) return;
          if (((a = o.tag), a === 5 || a === 6)) {
            r = s = o;
            continue e;
          }
          l = l.parentNode;
        }
      }
      r = r.return;
    }
  od(function () {
    var u = s,
      c = ql(n),
      p = [];
    e: {
      var d = $d.get(e);
      if (d !== void 0) {
        var v = Jl,
          y = e;
        switch (e) {
          case "keypress":
            if (Di(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = jm;
            break;
          case "focusin":
            (y = "focus"), (v = oo);
            break;
          case "focusout":
            (y = "blur"), (v = oo);
            break;
          case "beforeblur":
          case "afterblur":
            v = oo;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = eu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Pm;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = Xm;
            break;
          case Md:
          case Pd:
          case Id:
            v = $m;
            break;
          case Rd:
            v = Km;
            break;
          case "scroll":
            v = Am;
            break;
          case "wheel":
            v = Ym;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = zm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = nu;
        }
        var x = (t & 4) !== 0,
          w = !x && e === "scroll",
          h = x ? (d !== null ? d + "Capture" : null) : d;
        x = [];
        for (var f = u, g; f !== null; ) {
          g = f;
          var _ = g.stateNode;
          if (
            (g.tag === 5 &&
              _ !== null &&
              ((g = _),
              h !== null && ((_ = Ur(f, h)), _ != null && x.push(Qr(f, _, g)))),
            w)
          )
            break;
          f = f.return;
        }
        0 < x.length &&
          ((d = new v(d, y, null, n, c)), p.push({ event: d, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((d = e === "mouseover" || e === "pointerover"),
          (v = e === "mouseout" || e === "pointerout"),
          d &&
            n !== Bo &&
            (y = n.relatedTarget || n.fromElement) &&
            (rn(y) || y[bt]))
        )
          break e;
        if (
          (v || d) &&
          ((d =
            c.window === c
              ? c
              : (d = c.ownerDocument)
                ? d.defaultView || d.parentWindow
                : window),
          v
            ? ((y = n.relatedTarget || n.toElement),
              (v = u),
              (y = y ? rn(y) : null),
              y !== null &&
                ((w = wn(y)), y !== w || (y.tag !== 5 && y.tag !== 6)) &&
                (y = null))
            : ((v = null), (y = u)),
          v !== y)
        ) {
          if (
            ((x = eu),
            (_ = "onMouseLeave"),
            (h = "onMouseEnter"),
            (f = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((x = nu),
              (_ = "onPointerLeave"),
              (h = "onPointerEnter"),
              (f = "pointer")),
            (w = v == null ? d : Pn(v)),
            (g = y == null ? d : Pn(y)),
            (d = new x(_, f + "leave", v, n, c)),
            (d.target = w),
            (d.relatedTarget = g),
            (_ = null),
            rn(c) === u &&
              ((x = new x(h, f + "enter", y, n, c)),
              (x.target = g),
              (x.relatedTarget = w),
              (_ = x)),
            (w = _),
            v && y)
          )
            t: {
              for (x = v, h = y, f = 0, g = x; g; g = _n(g)) f++;
              for (g = 0, _ = h; _; _ = _n(_)) g++;
              for (; 0 < f - g; ) (x = _n(x)), f--;
              for (; 0 < g - f; ) (h = _n(h)), g--;
              for (; f--; ) {
                if (x === h || (h !== null && x === h.alternate)) break t;
                (x = _n(x)), (h = _n(h));
              }
              x = null;
            }
          else x = null;
          v !== null && hu(p, d, v, x, !1),
            y !== null && w !== null && hu(p, w, y, x, !0);
        }
      }
      e: {
        if (
          ((d = u ? Pn(u) : window),
          (v = d.nodeName && d.nodeName.toLowerCase()),
          v === "select" || (v === "input" && d.type === "file"))
        )
          var k = ig;
        else if (su(d))
          if (Nd) k = ag;
          else {
            k = og;
            var N = sg;
          }
        else
          (v = d.nodeName) &&
            v.toLowerCase() === "input" &&
            (d.type === "checkbox" || d.type === "radio") &&
            (k = lg);
        if (k && (k = k(e, u))) {
          Td(p, k, n, c);
          break e;
        }
        N && N(e, d, u),
          e === "focusout" &&
            (N = d._wrapperState) &&
            N.controlled &&
            d.type === "number" &&
            Do(d, "number", d.value);
      }
      switch (((N = u ? Pn(u) : window), e)) {
        case "focusin":
          (su(N) || N.contentEditable === "true") &&
            ((An = N), (Go = u), (Ir = null));
          break;
        case "focusout":
          Ir = Go = An = null;
          break;
        case "mousedown":
          Yo = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Yo = !1), cu(p, n, c);
          break;
        case "selectionchange":
          if (dg) break;
        case "keydown":
        case "keyup":
          cu(p, n, c);
      }
      var C;
      if (ea)
        e: {
          switch (e) {
            case "compositionstart":
              var E = "onCompositionStart";
              break e;
            case "compositionend":
              E = "onCompositionEnd";
              break e;
            case "compositionupdate":
              E = "onCompositionUpdate";
              break e;
          }
          E = void 0;
        }
      else
        Ln
          ? Ed(e, n) && (E = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (E = "onCompositionStart");
      E &&
        (_d &&
          n.locale !== "ko" &&
          (Ln || E !== "onCompositionStart"
            ? E === "onCompositionEnd" && Ln && (C = Sd())
            : ((Dt = c),
              (Yl = "value" in Dt ? Dt.value : Dt.textContent),
              (Ln = !0))),
        (N = ss(u, E)),
        0 < N.length &&
          ((E = new tu(E, e, null, n, c)),
          p.push({ event: E, listeners: N }),
          C ? (E.data = C) : ((C = kd(n)), C !== null && (E.data = C)))),
        (C = Zm ? eg(e, n) : tg(e, n)) &&
          ((u = ss(u, "onBeforeInput")),
          0 < u.length &&
            ((c = new tu("onBeforeInput", "beforeinput", null, n, c)),
            p.push({ event: c, listeners: u }),
            (c.data = C)));
    }
    Od(p, t);
  });
}
function Qr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ss(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      s = i.stateNode;
    i.tag === 5 &&
      s !== null &&
      ((i = s),
      (s = Ur(e, n)),
      s != null && r.unshift(Qr(e, s, i)),
      (s = Ur(e, t)),
      s != null && r.push(Qr(e, s, i))),
      (e = e.return);
  }
  return r;
}
function _n(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function hu(e, t, n, r, i) {
  for (var s = t._reactName, o = []; n !== null && n !== r; ) {
    var l = n,
      a = l.alternate,
      u = l.stateNode;
    if (a !== null && a === r) break;
    l.tag === 5 &&
      u !== null &&
      ((l = u),
      i
        ? ((a = Ur(n, s)), a != null && o.unshift(Qr(n, a, l)))
        : i || ((a = Ur(n, s)), a != null && o.push(Qr(n, a, l)))),
      (n = n.return);
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var mg = /\r\n?/g,
  gg = /\u0000|\uFFFD/g;
function pu(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      mg,
      `
`,
    )
    .replace(gg, "");
}
function _i(e, t, n) {
  if (((t = pu(t)), pu(e) !== t && n)) throw Error(b(425));
}
function os() {}
var Jo = null,
  Zo = null;
function el(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var tl = typeof setTimeout == "function" ? setTimeout : void 0,
  vg = typeof clearTimeout == "function" ? clearTimeout : void 0,
  mu = typeof Promise == "function" ? Promise : void 0,
  yg =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof mu < "u"
        ? function (e) {
            return mu.resolve(null).then(e).catch(wg);
          }
        : tl;
function wg(e) {
  setTimeout(function () {
    throw e;
  });
}
function mo(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(i), jr(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  jr(t);
}
function Et(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function gu(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var nr = Math.random().toString(36).slice(2),
  ht = "__reactFiber$" + nr,
  Kr = "__reactProps$" + nr,
  bt = "__reactContainer$" + nr,
  nl = "__reactEvents$" + nr,
  xg = "__reactListeners$" + nr,
  Sg = "__reactHandles$" + nr;
function rn(e) {
  var t = e[ht];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[bt] || n[ht])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = gu(e); e !== null; ) {
          if ((n = e[ht])) return n;
          e = gu(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function oi(e) {
  return (
    (e = e[ht] || e[bt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Pn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(b(33));
}
function Is(e) {
  return e[Kr] || null;
}
var rl = [],
  In = -1;
function Jt(e) {
  return { current: e };
}
function W(e) {
  0 > In || ((e.current = rl[In]), (rl[In] = null), In--);
}
function V(e, t) {
  In++, (rl[In] = e.current), (e.current = t);
}
var Qt = {},
  xe = Jt(Qt),
  $e = Jt(!1),
  dn = Qt;
function Kn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Qt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    s;
  for (s in n) i[s] = t[s];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function Oe(e) {
  return (e = e.childContextTypes), e != null;
}
function ls() {
  W($e), W(xe);
}
function vu(e, t, n) {
  if (xe.current !== Qt) throw Error(b(168));
  V(xe, t), V($e, n);
}
function Dd(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(b(108, sm(e) || "Unknown", i));
  return G({}, n, r);
}
function as(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Qt),
    (dn = xe.current),
    V(xe, e),
    V($e, $e.current),
    !0
  );
}
function yu(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(b(169));
  n
    ? ((e = Dd(e, t, dn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      W($e),
      W(xe),
      V(xe, e))
    : W($e),
    V($e, n);
}
var _t = null,
  Rs = !1,
  go = !1;
function Hd(e) {
  _t === null ? (_t = [e]) : _t.push(e);
}
function _g(e) {
  (Rs = !0), Hd(e);
}
function Zt() {
  if (!go && _t !== null) {
    go = !0;
    var e = 0,
      t = U;
    try {
      var n = _t;
      for (U = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (_t = null), (Rs = !1);
    } catch (i) {
      throw (_t !== null && (_t = _t.slice(e + 1)), cd(Xl, Zt), i);
    } finally {
      (U = t), (go = !1);
    }
  }
  return null;
}
var Eg = At.ReactCurrentBatchConfig;
function tt(e, t) {
  if (e && e.defaultProps) {
    (t = G({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var us = Jt(null),
  cs = null,
  Rn = null,
  na = null;
function ra() {
  na = Rn = cs = null;
}
function ia(e) {
  var t = us.current;
  W(us), (e._currentValue = t);
}
function il(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Wn(e, t) {
  (cs = e),
    (na = Rn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Re = !0), (e.firstContext = null));
}
function Je(e) {
  var t = e._currentValue;
  if (na !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Rn === null)) {
      if (cs === null) throw Error(b(308));
      (Rn = e), (cs.dependencies = { lanes: 0, firstContext: e });
    } else Rn = Rn.next = e;
  return t;
}
var it = null,
  It = !1;
function sa(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Fd(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Nt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function jt(e, t) {
  var n = e.updateQueue;
  n !== null &&
    ((n = n.shared),
    Af(e)
      ? ((e = n.interleaved),
        e === null
          ? ((t.next = t), it === null ? (it = [n]) : it.push(n))
          : ((t.next = e.next), (e.next = t)),
        (n.interleaved = t))
      : ((e = n.pending),
        e === null ? (t.next = t) : ((t.next = e.next), (e.next = t)),
        (n.pending = t)));
}
function Hi(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Ql(e, n);
  }
}
function wu(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      s = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        s === null ? (i = s = o) : (s = s.next = o), (n = n.next);
      } while (n !== null);
      s === null ? (i = s = t) : (s = s.next = t);
    } else i = s = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: s,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function ds(e, t, n, r) {
  var i = e.updateQueue;
  It = !1;
  var s = i.firstBaseUpdate,
    o = i.lastBaseUpdate,
    l = i.shared.pending;
  if (l !== null) {
    i.shared.pending = null;
    var a = l,
      u = a.next;
    (a.next = null), o === null ? (s = u) : (o.next = u), (o = a);
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (l = c.lastBaseUpdate),
      l !== o &&
        (l === null ? (c.firstBaseUpdate = u) : (l.next = u),
        (c.lastBaseUpdate = a)));
  }
  if (s !== null) {
    var p = i.baseState;
    (o = 0), (c = u = a = null), (l = s);
    do {
      var d = l.lane,
        v = l.eventTime;
      if ((r & d) === d) {
        c !== null &&
          (c = c.next =
            {
              eventTime: v,
              lane: 0,
              tag: l.tag,
              payload: l.payload,
              callback: l.callback,
              next: null,
            });
        e: {
          var y = e,
            x = l;
          switch (((d = t), (v = n), x.tag)) {
            case 1:
              if (((y = x.payload), typeof y == "function")) {
                p = y.call(v, p, d);
                break e;
              }
              p = y;
              break e;
            case 3:
              y.flags = (y.flags & -65537) | 128;
            case 0:
              if (
                ((y = x.payload),
                (d = typeof y == "function" ? y.call(v, p, d) : y),
                d == null)
              )
                break e;
              p = G({}, p, d);
              break e;
            case 2:
              It = !0;
          }
        }
        l.callback !== null &&
          l.lane !== 0 &&
          ((e.flags |= 64),
          (d = i.effects),
          d === null ? (i.effects = [l]) : d.push(l));
      } else
        (v = {
          eventTime: v,
          lane: d,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null,
        }),
          c === null ? ((u = c = v), (a = p)) : (c = c.next = v),
          (o |= d);
      if (((l = l.next), l === null)) {
        if (((l = i.shared.pending), l === null)) break;
        (d = l),
          (l = d.next),
          (d.next = null),
          (i.lastBaseUpdate = d),
          (i.shared.pending = null);
      }
    } while (1);
    if (
      (c === null && (a = p),
      (i.baseState = a),
      (i.firstBaseUpdate = u),
      (i.lastBaseUpdate = c),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do (o |= i.lane), (i = i.next);
      while (i !== t);
    } else s === null && (i.shared.lanes = 0);
    (pn |= o), (e.lanes = o), (e.memoizedState = p);
  }
}
function xu(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function"))
          throw Error(b(191, i));
        i.call(r);
      }
    }
}
var Ud = new Bc.Component().refs;
function sl(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : G({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var $s = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? wn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Te(),
      i = qt(e),
      s = Nt(r, i);
    (s.payload = t),
      n != null && (s.callback = n),
      jt(e, s),
      (t = Ye(e, i, r)),
      t !== null && Hi(t, e, i);
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Te(),
      i = qt(e),
      s = Nt(r, i);
    (s.tag = 1),
      (s.payload = t),
      n != null && (s.callback = n),
      jt(e, s),
      (t = Ye(e, i, r)),
      t !== null && Hi(t, e, i);
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Te(),
      r = qt(e),
      i = Nt(n, r);
    (i.tag = 2),
      t != null && (i.callback = t),
      jt(e, i),
      (t = Ye(e, r, n)),
      t !== null && Hi(t, e, r);
  },
};
function Su(e, t, n, r, i, s, o) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, s, o)
      : t.prototype && t.prototype.isPureReactComponent
        ? !qr(n, r) || !qr(i, s)
        : !0
  );
}
function Vd(e, t, n) {
  var r = !1,
    i = Qt,
    s = t.contextType;
  return (
    typeof s == "object" && s !== null
      ? (s = Je(s))
      : ((i = Oe(t) ? dn : xe.current),
        (r = t.contextTypes),
        (s = (r = r != null) ? Kn(e, i) : Qt)),
    (t = new t(n, s)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = $s),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = s)),
    t
  );
}
function _u(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && $s.enqueueReplaceState(t, t.state, null);
}
function ol(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = Ud), sa(e);
  var s = t.contextType;
  typeof s == "object" && s !== null
    ? (i.context = Je(s))
    : ((s = Oe(t) ? dn : xe.current), (i.context = Kn(e, s))),
    (i.state = e.memoizedState),
    (s = t.getDerivedStateFromProps),
    typeof s == "function" && (sl(e, t, s, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && $s.enqueueReplaceState(i, i.state, null),
      ds(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
var $n = [],
  On = 0,
  fs = null,
  hs = 0,
  We = [],
  qe = 0,
  fn = null,
  kt = 1,
  Tt = "";
function tn(e, t) {
  ($n[On++] = hs), ($n[On++] = fs), (fs = e), (hs = t);
}
function Bd(e, t, n) {
  (We[qe++] = kt), (We[qe++] = Tt), (We[qe++] = fn), (fn = e);
  var r = kt;
  e = Tt;
  var i = 32 - st(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var s = 32 - st(t) + i;
  if (30 < s) {
    var o = i - (i % 5);
    (s = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (i -= o),
      (kt = (1 << (32 - st(t) + i)) | (n << i) | r),
      (Tt = s + e);
  } else (kt = (1 << s) | (n << i) | r), (Tt = e);
}
function oa(e) {
  e.return !== null && (tn(e, 1), Bd(e, 1, 0));
}
function la(e) {
  for (; e === fs; )
    (fs = $n[--On]), ($n[On] = null), (hs = $n[--On]), ($n[On] = null);
  for (; e === fn; )
    (fn = We[--qe]),
      (We[qe] = null),
      (Tt = We[--qe]),
      (We[qe] = null),
      (kt = We[--qe]),
      (We[qe] = null);
}
var Fe = null,
  Ie = null,
  q = !1,
  rt = null;
function jd(e, t) {
  var n = Qe(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Eu(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Fe = e), (Ie = Et(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Fe = e), (Ie = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = fn !== null ? { id: kt, overflow: Tt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Qe(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Fe = e),
            (Ie = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function ll(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function al(e) {
  if (q) {
    var t = Ie;
    if (t) {
      var n = t;
      if (!Eu(e, t)) {
        if (ll(e)) throw Error(b(418));
        t = Et(n.nextSibling);
        var r = Fe;
        t && Eu(e, t)
          ? jd(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (q = !1), (Fe = e));
      }
    } else {
      if (ll(e)) throw Error(b(418));
      (e.flags = (e.flags & -4097) | 2), (q = !1), (Fe = e);
    }
  }
}
function ku(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Fe = e;
}
function hr(e) {
  if (e !== Fe) return !1;
  if (!q) return ku(e), (q = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !el(e.type, e.memoizedProps))),
    t && (t = Ie))
  ) {
    if (ll(e)) {
      for (e = Ie; e; ) e = Et(e.nextSibling);
      throw Error(b(418));
    }
    for (; t; ) jd(e, t), (t = Et(t.nextSibling));
  }
  if ((ku(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(b(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ie = Et(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ie = null;
    }
  } else Ie = Fe ? Et(e.stateNode.nextSibling) : null;
  return !0;
}
function Gn() {
  (Ie = Fe = null), (q = !1);
}
function aa(e) {
  rt === null ? (rt = [e]) : rt.push(e);
}
function pr(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(b(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(b(147, e));
      var i = r,
        s = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === s
        ? t.ref
        : ((t = function (o) {
            var l = i.refs;
            l === Ud && (l = i.refs = {}),
              o === null ? delete l[s] : (l[s] = o);
          }),
          (t._stringRef = s),
          t);
    }
    if (typeof e != "string") throw Error(b(284));
    if (!n._owner) throw Error(b(290, e));
  }
  return e;
}
function Ei(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      b(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    ))
  );
}
function Tu(e) {
  var t = e._init;
  return t(e._payload);
}
function Wd(e) {
  function t(h, f) {
    if (e) {
      var g = h.deletions;
      g === null ? ((h.deletions = [f]), (h.flags |= 16)) : g.push(f);
    }
  }
  function n(h, f) {
    if (!e) return null;
    for (; f !== null; ) t(h, f), (f = f.sibling);
    return null;
  }
  function r(h, f) {
    for (h = new Map(); f !== null; )
      f.key !== null ? h.set(f.key, f) : h.set(f.index, f), (f = f.sibling);
    return h;
  }
  function i(h, f) {
    return (h = Kt(h, f)), (h.index = 0), (h.sibling = null), h;
  }
  function s(h, f, g) {
    return (
      (h.index = g),
      e
        ? ((g = h.alternate),
          g !== null
            ? ((g = g.index), g < f ? ((h.flags |= 2), f) : g)
            : ((h.flags |= 2), f))
        : ((h.flags |= 1048576), f)
    );
  }
  function o(h) {
    return e && h.alternate === null && (h.flags |= 2), h;
  }
  function l(h, f, g, _) {
    return f === null || f.tag !== 6
      ? ((f = _o(g, h.mode, _)), (f.return = h), f)
      : ((f = i(f, g)), (f.return = h), f);
  }
  function a(h, f, g, _) {
    var k = g.type;
    return k === bn
      ? c(h, f, g.props.children, _, g.key)
      : f !== null &&
          (f.elementType === k ||
            (typeof k == "object" &&
              k !== null &&
              k.$$typeof === Pt &&
              Tu(k) === f.type))
        ? ((_ = i(f, g.props)), (_.ref = pr(h, f, g)), (_.return = h), _)
        : ((_ = ji(g.type, g.key, g.props, null, h.mode, _)),
          (_.ref = pr(h, f, g)),
          (_.return = h),
          _);
  }
  function u(h, f, g, _) {
    return f === null ||
      f.tag !== 4 ||
      f.stateNode.containerInfo !== g.containerInfo ||
      f.stateNode.implementation !== g.implementation
      ? ((f = Eo(g, h.mode, _)), (f.return = h), f)
      : ((f = i(f, g.children || [])), (f.return = h), f);
  }
  function c(h, f, g, _, k) {
    return f === null || f.tag !== 7
      ? ((f = ln(g, h.mode, _, k)), (f.return = h), f)
      : ((f = i(f, g)), (f.return = h), f);
  }
  function p(h, f, g) {
    if ((typeof f == "string" && f !== "") || typeof f == "number")
      return (f = _o("" + f, h.mode, g)), (f.return = h), f;
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case hi:
          return (
            (g = ji(f.type, f.key, f.props, null, h.mode, g)),
            (g.ref = pr(h, null, f)),
            (g.return = h),
            g
          );
        case Cn:
          return (f = Eo(f, h.mode, g)), (f.return = h), f;
        case Pt:
          var _ = f._init;
          return p(h, _(f._payload), g);
      }
      if (kr(f) || ar(f))
        return (f = ln(f, h.mode, g, null)), (f.return = h), f;
      Ei(h, f);
    }
    return null;
  }
  function d(h, f, g, _) {
    var k = f !== null ? f.key : null;
    if ((typeof g == "string" && g !== "") || typeof g == "number")
      return k !== null ? null : l(h, f, "" + g, _);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case hi:
          return g.key === k ? a(h, f, g, _) : null;
        case Cn:
          return g.key === k ? u(h, f, g, _) : null;
        case Pt:
          return (k = g._init), d(h, f, k(g._payload), _);
      }
      if (kr(g) || ar(g)) return k !== null ? null : c(h, f, g, _, null);
      Ei(h, g);
    }
    return null;
  }
  function v(h, f, g, _, k) {
    if ((typeof _ == "string" && _ !== "") || typeof _ == "number")
      return (h = h.get(g) || null), l(f, h, "" + _, k);
    if (typeof _ == "object" && _ !== null) {
      switch (_.$$typeof) {
        case hi:
          return (h = h.get(_.key === null ? g : _.key) || null), a(f, h, _, k);
        case Cn:
          return (h = h.get(_.key === null ? g : _.key) || null), u(f, h, _, k);
        case Pt:
          var N = _._init;
          return v(h, f, g, N(_._payload), k);
      }
      if (kr(_) || ar(_)) return (h = h.get(g) || null), c(f, h, _, k, null);
      Ei(f, _);
    }
    return null;
  }
  function y(h, f, g, _) {
    for (
      var k = null, N = null, C = f, E = (f = 0), S = null;
      C !== null && E < g.length;
      E++
    ) {
      C.index > E ? ((S = C), (C = null)) : (S = C.sibling);
      var M = d(h, C, g[E], _);
      if (M === null) {
        C === null && (C = S);
        break;
      }
      e && C && M.alternate === null && t(h, C),
        (f = s(M, f, E)),
        N === null ? (k = M) : (N.sibling = M),
        (N = M),
        (C = S);
    }
    if (E === g.length) return n(h, C), q && tn(h, E), k;
    if (C === null) {
      for (; E < g.length; E++)
        (C = p(h, g[E], _)),
          C !== null &&
            ((f = s(C, f, E)), N === null ? (k = C) : (N.sibling = C), (N = C));
      return q && tn(h, E), k;
    }
    for (C = r(h, C); E < g.length; E++)
      (S = v(C, h, E, g[E], _)),
        S !== null &&
          (e && S.alternate !== null && C.delete(S.key === null ? E : S.key),
          (f = s(S, f, E)),
          N === null ? (k = S) : (N.sibling = S),
          (N = S));
    return (
      e &&
        C.forEach(function ($) {
          return t(h, $);
        }),
      q && tn(h, E),
      k
    );
  }
  function x(h, f, g, _) {
    var k = ar(g);
    if (typeof k != "function") throw Error(b(150));
    if (((g = k.call(g)), g == null)) throw Error(b(151));
    for (
      var N = (k = null), C = f, E = (f = 0), S = null, M = g.next();
      C !== null && !M.done;
      E++, M = g.next()
    ) {
      C.index > E ? ((S = C), (C = null)) : (S = C.sibling);
      var $ = d(h, C, M.value, _);
      if ($ === null) {
        C === null && (C = S);
        break;
      }
      e && C && $.alternate === null && t(h, C),
        (f = s($, f, E)),
        N === null ? (k = $) : (N.sibling = $),
        (N = $),
        (C = S);
    }
    if (M.done) return n(h, C), q && tn(h, E), k;
    if (C === null) {
      for (; !M.done; E++, M = g.next())
        (M = p(h, M.value, _)),
          M !== null &&
            ((f = s(M, f, E)), N === null ? (k = M) : (N.sibling = M), (N = M));
      return q && tn(h, E), k;
    }
    for (C = r(h, C); !M.done; E++, M = g.next())
      (M = v(C, h, E, M.value, _)),
        M !== null &&
          (e && M.alternate !== null && C.delete(M.key === null ? E : M.key),
          (f = s(M, f, E)),
          N === null ? (k = M) : (N.sibling = M),
          (N = M));
    return (
      e &&
        C.forEach(function (T) {
          return t(h, T);
        }),
      q && tn(h, E),
      k
    );
  }
  function w(h, f, g, _) {
    if (
      (typeof g == "object" &&
        g !== null &&
        g.type === bn &&
        g.key === null &&
        (g = g.props.children),
      typeof g == "object" && g !== null)
    ) {
      switch (g.$$typeof) {
        case hi:
          e: {
            for (var k = g.key, N = f; N !== null; ) {
              if (N.key === k) {
                if (((k = g.type), k === bn)) {
                  if (N.tag === 7) {
                    n(h, N.sibling),
                      (f = i(N, g.props.children)),
                      (f.return = h),
                      (h = f);
                    break e;
                  }
                } else if (
                  N.elementType === k ||
                  (typeof k == "object" &&
                    k !== null &&
                    k.$$typeof === Pt &&
                    Tu(k) === N.type)
                ) {
                  n(h, N.sibling),
                    (f = i(N, g.props)),
                    (f.ref = pr(h, N, g)),
                    (f.return = h),
                    (h = f);
                  break e;
                }
                n(h, N);
                break;
              } else t(h, N);
              N = N.sibling;
            }
            g.type === bn
              ? ((f = ln(g.props.children, h.mode, _, g.key)),
                (f.return = h),
                (h = f))
              : ((_ = ji(g.type, g.key, g.props, null, h.mode, _)),
                (_.ref = pr(h, f, g)),
                (_.return = h),
                (h = _));
          }
          return o(h);
        case Cn:
          e: {
            for (N = g.key; f !== null; ) {
              if (f.key === N)
                if (
                  f.tag === 4 &&
                  f.stateNode.containerInfo === g.containerInfo &&
                  f.stateNode.implementation === g.implementation
                ) {
                  n(h, f.sibling),
                    (f = i(f, g.children || [])),
                    (f.return = h),
                    (h = f);
                  break e;
                } else {
                  n(h, f);
                  break;
                }
              else t(h, f);
              f = f.sibling;
            }
            (f = Eo(g, h.mode, _)), (f.return = h), (h = f);
          }
          return o(h);
        case Pt:
          return (N = g._init), w(h, f, N(g._payload), _);
      }
      if (kr(g)) return y(h, f, g, _);
      if (ar(g)) return x(h, f, g, _);
      Ei(h, g);
    }
    return (typeof g == "string" && g !== "") || typeof g == "number"
      ? ((g = "" + g),
        f !== null && f.tag === 6
          ? (n(h, f.sibling), (f = i(f, g)), (f.return = h), (h = f))
          : (n(h, f), (f = _o(g, h.mode, _)), (f.return = h), (h = f)),
        o(h))
      : n(h, f);
  }
  return w;
}
var Yn = Wd(!0),
  qd = Wd(!1),
  li = {},
  mt = Jt(li),
  Gr = Jt(li),
  Yr = Jt(li);
function sn(e) {
  if (e === li) throw Error(b(174));
  return e;
}
function ua(e, t) {
  switch ((V(Yr, t), V(Gr, e), V(mt, li), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Fo(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Fo(t, e));
  }
  W(mt), V(mt, t);
}
function Jn() {
  W(mt), W(Gr), W(Yr);
}
function Xd(e) {
  sn(Yr.current);
  var t = sn(mt.current),
    n = Fo(t, e.type);
  t !== n && (V(Gr, e), V(mt, n));
}
function ca(e) {
  Gr.current === e && (W(mt), W(Gr));
}
var Q = Jt(0);
function ps(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var vo = [];
function da() {
  for (var e = 0; e < vo.length; e++)
    vo[e]._workInProgressVersionPrimary = null;
  vo.length = 0;
}
var Fi = At.ReactCurrentDispatcher,
  yo = At.ReactCurrentBatchConfig,
  hn = 0,
  K = null,
  oe = null,
  ue = null,
  ms = !1,
  Rr = !1,
  Jr = 0,
  kg = 0;
function me() {
  throw Error(b(321));
}
function fa(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!lt(e[n], t[n])) return !1;
  return !0;
}
function ha(e, t, n, r, i, s) {
  if (
    ((hn = s),
    (K = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Fi.current = e === null || e.memoizedState === null ? bg : Lg),
    (e = n(r, i)),
    Rr)
  ) {
    s = 0;
    do {
      if (((Rr = !1), (Jr = 0), 25 <= s)) throw Error(b(301));
      (s += 1),
        (ue = oe = null),
        (t.updateQueue = null),
        (Fi.current = Ag),
        (e = n(r, i));
    } while (Rr);
  }
  if (
    ((Fi.current = gs),
    (t = oe !== null && oe.next !== null),
    (hn = 0),
    (ue = oe = K = null),
    (ms = !1),
    t)
  )
    throw Error(b(300));
  return e;
}
function pa() {
  var e = Jr !== 0;
  return (Jr = 0), e;
}
function ft() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return ue === null ? (K.memoizedState = ue = e) : (ue = ue.next = e), ue;
}
function Ze() {
  if (oe === null) {
    var e = K.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = oe.next;
  var t = ue === null ? K.memoizedState : ue.next;
  if (t !== null) (ue = t), (oe = e);
  else {
    if (e === null) throw Error(b(310));
    (oe = e),
      (e = {
        memoizedState: oe.memoizedState,
        baseState: oe.baseState,
        baseQueue: oe.baseQueue,
        queue: oe.queue,
        next: null,
      }),
      ue === null ? (K.memoizedState = ue = e) : (ue = ue.next = e);
  }
  return ue;
}
function Zr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function wo(e) {
  var t = Ze(),
    n = t.queue;
  if (n === null) throw Error(b(311));
  n.lastRenderedReducer = e;
  var r = oe,
    i = r.baseQueue,
    s = n.pending;
  if (s !== null) {
    if (i !== null) {
      var o = i.next;
      (i.next = s.next), (s.next = o);
    }
    (r.baseQueue = i = s), (n.pending = null);
  }
  if (i !== null) {
    (s = i.next), (r = r.baseState);
    var l = (o = null),
      a = null,
      u = s;
    do {
      var c = u.lane;
      if ((hn & c) === c)
        a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var p = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        a === null ? ((l = a = p), (o = r)) : (a = a.next = p),
          (K.lanes |= c),
          (pn |= c);
      }
      u = u.next;
    } while (u !== null && u !== s);
    a === null ? (o = r) : (a.next = l),
      lt(r, t.memoizedState) || (Re = !0),
      (t.memoizedState = r),
      (t.baseState = o),
      (t.baseQueue = a),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do (s = i.lane), (K.lanes |= s), (pn |= s), (i = i.next);
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function xo(e) {
  var t = Ze(),
    n = t.queue;
  if (n === null) throw Error(b(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    s = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var o = (i = i.next);
    do (s = e(s, o.action)), (o = o.next);
    while (o !== i);
    lt(s, t.memoizedState) || (Re = !0),
      (t.memoizedState = s),
      t.baseQueue === null && (t.baseState = s),
      (n.lastRenderedState = s);
  }
  return [s, r];
}
function Qd() {}
function Kd(e, t) {
  var n = K,
    r = Ze(),
    i = t(),
    s = !lt(r.memoizedState, i);
  if (
    (s && ((r.memoizedState = i), (Re = !0)),
    (r = r.queue),
    ma(Jd.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || s || (ue !== null && ue.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      ei(9, Yd.bind(null, n, r, i, t), void 0, null),
      ae === null)
    )
      throw Error(b(349));
    hn & 30 || Gd(n, t, i);
  }
  return i;
}
function Gd(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = K.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (K.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Yd(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Zd(t) && Ye(e, 1, -1);
}
function Jd(e, t, n) {
  return n(function () {
    Zd(t) && Ye(e, 1, -1);
  });
}
function Zd(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !lt(e, n);
  } catch {
    return !0;
  }
}
function Nu(e) {
  var t = ft();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Zr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Cg.bind(null, K, e)),
    [t.memoizedState, e]
  );
}
function ei(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = K.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (K.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function ef() {
  return Ze().memoizedState;
}
function Ui(e, t, n, r) {
  var i = ft();
  (K.flags |= e),
    (i.memoizedState = ei(1 | t, n, void 0, r === void 0 ? null : r));
}
function Os(e, t, n, r) {
  var i = Ze();
  r = r === void 0 ? null : r;
  var s = void 0;
  if (oe !== null) {
    var o = oe.memoizedState;
    if (((s = o.destroy), r !== null && fa(r, o.deps))) {
      i.memoizedState = ei(t, n, s, r);
      return;
    }
  }
  (K.flags |= e), (i.memoizedState = ei(1 | t, n, s, r));
}
function Cu(e, t) {
  return Ui(8390656, 8, e, t);
}
function ma(e, t) {
  return Os(2048, 8, e, t);
}
function tf(e, t) {
  return Os(4, 2, e, t);
}
function nf(e, t) {
  return Os(4, 4, e, t);
}
function rf(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function sf(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Os(4, 4, rf.bind(null, t, e), n)
  );
}
function ga() {}
function of(e, t) {
  var n = Ze();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && fa(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function lf(e, t) {
  var n = Ze();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && fa(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function af(e, t, n) {
  return hn & 21
    ? (lt(n, t) || ((n = hd()), (K.lanes |= n), (pn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Re = !0)), (e.memoizedState = n));
}
function Tg(e, t) {
  var n = U;
  (U = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = yo.transition;
  yo.transition = {};
  try {
    e(!1), t();
  } finally {
    (U = n), (yo.transition = r);
  }
}
function uf() {
  return Ze().memoizedState;
}
function Ng(e, t, n) {
  var r = qt(e);
  (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }),
    cf(e)
      ? df(t, n)
      : (ff(e, t, n), (n = Te()), (e = Ye(e, r, n)), e !== null && hf(e, t, r));
}
function Cg(e, t, n) {
  var r = qt(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (cf(e)) df(t, i);
  else {
    ff(e, t, i);
    var s = e.alternate;
    if (
      e.lanes === 0 &&
      (s === null || s.lanes === 0) &&
      ((s = t.lastRenderedReducer), s !== null)
    )
      try {
        var o = t.lastRenderedState,
          l = s(o, n);
        if (((i.hasEagerState = !0), (i.eagerState = l), lt(l, o))) return;
      } catch {
      } finally {
      }
    (n = Te()), (e = Ye(e, r, n)), e !== null && hf(e, t, r);
  }
}
function cf(e) {
  var t = e.alternate;
  return e === K || (t !== null && t === K);
}
function df(e, t) {
  Rr = ms = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function ff(e, t, n) {
  Af(e)
    ? ((e = t.interleaved),
      e === null
        ? ((n.next = n), it === null ? (it = [t]) : it.push(t))
        : ((n.next = e.next), (e.next = n)),
      (t.interleaved = n))
    : ((e = t.pending),
      e === null ? (n.next = n) : ((n.next = e.next), (e.next = n)),
      (t.pending = n));
}
function hf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Ql(e, n);
  }
}
var gs = {
    readContext: Je,
    useCallback: me,
    useContext: me,
    useEffect: me,
    useImperativeHandle: me,
    useInsertionEffect: me,
    useLayoutEffect: me,
    useMemo: me,
    useReducer: me,
    useRef: me,
    useState: me,
    useDebugValue: me,
    useDeferredValue: me,
    useTransition: me,
    useMutableSource: me,
    useSyncExternalStore: me,
    useId: me,
    unstable_isNewReconciler: !1,
  },
  bg = {
    readContext: Je,
    useCallback: function (e, t) {
      return (ft().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Je,
    useEffect: Cu,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Ui(4194308, 4, rf.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Ui(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Ui(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = ft();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = ft();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Ng.bind(null, K, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = ft();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Nu,
    useDebugValue: ga,
    useDeferredValue: function (e) {
      return (ft().memoizedState = e);
    },
    useTransition: function () {
      var e = Nu(!1),
        t = e[0];
      return (e = Tg.bind(null, e[1])), (ft().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = K,
        i = ft();
      if (q) {
        if (n === void 0) throw Error(b(407));
        n = n();
      } else {
        if (((n = t()), ae === null)) throw Error(b(349));
        hn & 30 || Gd(r, t, n);
      }
      i.memoizedState = n;
      var s = { value: n, getSnapshot: t };
      return (
        (i.queue = s),
        Cu(Jd.bind(null, r, s, e), [e]),
        (r.flags |= 2048),
        ei(9, Yd.bind(null, r, s, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = ft(),
        t = ae.identifierPrefix;
      if (q) {
        var n = Tt,
          r = kt;
        (n = (r & ~(1 << (32 - st(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Jr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = kg++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Lg = {
    readContext: Je,
    useCallback: of,
    useContext: Je,
    useEffect: ma,
    useImperativeHandle: sf,
    useInsertionEffect: tf,
    useLayoutEffect: nf,
    useMemo: lf,
    useReducer: wo,
    useRef: ef,
    useState: function () {
      return wo(Zr);
    },
    useDebugValue: ga,
    useDeferredValue: function (e) {
      var t = Ze();
      return af(t, oe.memoizedState, e);
    },
    useTransition: function () {
      var e = wo(Zr)[0],
        t = Ze().memoizedState;
      return [e, t];
    },
    useMutableSource: Qd,
    useSyncExternalStore: Kd,
    useId: uf,
    unstable_isNewReconciler: !1,
  },
  Ag = {
    readContext: Je,
    useCallback: of,
    useContext: Je,
    useEffect: ma,
    useImperativeHandle: sf,
    useInsertionEffect: tf,
    useLayoutEffect: nf,
    useMemo: lf,
    useReducer: xo,
    useRef: ef,
    useState: function () {
      return xo(Zr);
    },
    useDebugValue: ga,
    useDeferredValue: function (e) {
      var t = Ze();
      return oe === null ? (t.memoizedState = e) : af(t, oe.memoizedState, e);
    },
    useTransition: function () {
      var e = xo(Zr)[0],
        t = Ze().memoizedState;
      return [e, t];
    },
    useMutableSource: Qd,
    useSyncExternalStore: Kd,
    useId: uf,
    unstable_isNewReconciler: !1,
  };
function va(e, t) {
  try {
    var n = "",
      r = t;
    do (n += im(r)), (r = r.return);
    while (r);
    var i = n;
  } catch (s) {
    i =
      `
Error generating stack: ` +
      s.message +
      `
` +
      s.stack;
  }
  return { value: e, source: t, stack: i };
}
function ul(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Mg = typeof WeakMap == "function" ? WeakMap : Map;
function pf(e, t, n) {
  (n = Nt(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      ys || ((ys = !0), (yl = r)), ul(e, t);
    }),
    n
  );
}
function mf(e, t, n) {
  (n = Nt(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        ul(e, t);
      });
  }
  var s = e.stateNode;
  return (
    s !== null &&
      typeof s.componentDidCatch == "function" &&
      (n.callback = function () {
        ul(e, t),
          typeof r != "function" &&
            (Wt === null ? (Wt = new Set([this])) : Wt.add(this));
        var o = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: o !== null ? o : "",
        });
      }),
    n
  );
}
function bu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Mg();
    var i = new Set();
    r.set(t, i);
  } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = jg.bind(null, e, t, n)), t.then(e, e));
}
function Lu(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Au(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Nt(-1, 1)), (t.tag = 2), jt(n, t))),
          (n.lanes |= 1)),
      e);
}
var gf, cl, vf, yf;
gf = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
cl = function () {};
vf = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = t.stateNode), sn(mt.current);
    var s = null;
    switch (n) {
      case "input":
        (i = Oo(e, i)), (r = Oo(e, r)), (s = []);
        break;
      case "select":
        (i = G({}, i, { value: void 0 })),
          (r = G({}, r, { value: void 0 })),
          (s = []);
        break;
      case "textarea":
        (i = Ho(e, i)), (r = Ho(e, r)), (s = []);
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = os);
    }
    Uo(n, r);
    var o;
    n = null;
    for (u in i)
      if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === "style") {
          var l = i[u];
          for (o in l) l.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (Hr.hasOwnProperty(u)
              ? s || (s = [])
              : (s = s || []).push(u, null));
    for (u in r) {
      var a = r[u];
      if (
        ((l = i != null ? i[u] : void 0),
        r.hasOwnProperty(u) && a !== l && (a != null || l != null))
      )
        if (u === "style")
          if (l) {
            for (o in l)
              !l.hasOwnProperty(o) ||
                (a && a.hasOwnProperty(o)) ||
                (n || (n = {}), (n[o] = ""));
            for (o in a)
              a.hasOwnProperty(o) &&
                l[o] !== a[o] &&
                (n || (n = {}), (n[o] = a[o]));
          } else n || (s || (s = []), s.push(u, n)), (n = a);
        else
          u === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (l = l ? l.__html : void 0),
              a != null && l !== a && (s = s || []).push(u, a))
            : u === "children"
              ? (typeof a != "string" && typeof a != "number") ||
                (s = s || []).push(u, "" + a)
              : u !== "suppressContentEditableWarning" &&
                u !== "suppressHydrationWarning" &&
                (Hr.hasOwnProperty(u)
                  ? (a != null && u === "onScroll" && j("scroll", e),
                    s || l === a || (s = []))
                  : (s = s || []).push(u, a));
    }
    n && (s = s || []).push("style", n);
    var u = s;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
yf = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function mr(e, t) {
  if (!q)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function ge(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Pg(e, t, n) {
  var r = t.pendingProps;
  switch ((la(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ge(t), null;
    case 1:
      return Oe(t.type) && ls(), ge(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Jn(),
        W($e),
        W(xe),
        da(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (hr(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), rt !== null && (Sl(rt), (rt = null)))),
        cl(e, t),
        ge(t),
        null
      );
    case 5:
      ca(t);
      var i = sn(Yr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        vf(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(b(166));
          return ge(t), null;
        }
        if (((e = sn(mt.current)), hr(t))) {
          (r = t.stateNode), (n = t.type);
          var s = t.memoizedProps;
          switch (((r[ht] = t), (r[Kr] = s), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              j("cancel", r), j("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              j("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < Nr.length; i++) j(Nr[i], r);
              break;
            case "source":
              j("error", r);
              break;
            case "img":
            case "image":
            case "link":
              j("error", r), j("load", r);
              break;
            case "details":
              j("toggle", r);
              break;
            case "input":
              ja(r, s), j("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!s.multiple }),
                j("invalid", r);
              break;
            case "textarea":
              qa(r, s), j("invalid", r);
          }
          Uo(n, s), (i = null);
          for (var o in s)
            if (s.hasOwnProperty(o)) {
              var l = s[o];
              o === "children"
                ? typeof l == "string"
                  ? r.textContent !== l &&
                    (s.suppressHydrationWarning !== !0 &&
                      _i(r.textContent, l, e),
                    (i = ["children", l]))
                  : typeof l == "number" &&
                    r.textContent !== "" + l &&
                    (s.suppressHydrationWarning !== !0 &&
                      _i(r.textContent, l, e),
                    (i = ["children", "" + l]))
                : Hr.hasOwnProperty(o) &&
                  l != null &&
                  o === "onScroll" &&
                  j("scroll", r);
            }
          switch (n) {
            case "input":
              pi(r), Wa(r, s, !0);
              break;
            case "textarea":
              pi(r), Xa(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof s.onClick == "function" && (r.onclick = os);
          }
          (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (o = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Jc(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = o.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = o.createElement(n, { is: r.is }))
                  : ((e = o.createElement(n)),
                    n === "select" &&
                      ((o = e),
                      r.multiple
                        ? (o.multiple = !0)
                        : r.size && (o.size = r.size)))
              : (e = o.createElementNS(e, n)),
            (e[ht] = t),
            (e[Kr] = r),
            gf(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((o = Vo(n, r)), n)) {
              case "dialog":
                j("cancel", e), j("close", e), (i = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                j("load", e), (i = r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < Nr.length; i++) j(Nr[i], e);
                i = r;
                break;
              case "source":
                j("error", e), (i = r);
                break;
              case "img":
              case "image":
              case "link":
                j("error", e), j("load", e), (i = r);
                break;
              case "details":
                j("toggle", e), (i = r);
                break;
              case "input":
                ja(e, r), (i = Oo(e, r)), j("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = G({}, r, { value: void 0 })),
                  j("invalid", e);
                break;
              case "textarea":
                qa(e, r), (i = Ho(e, r)), j("invalid", e);
                break;
              default:
                i = r;
            }
            Uo(n, i), (l = i);
            for (s in l)
              if (l.hasOwnProperty(s)) {
                var a = l[s];
                s === "style"
                  ? td(e, a)
                  : s === "dangerouslySetInnerHTML"
                    ? ((a = a ? a.__html : void 0), a != null && Zc(e, a))
                    : s === "children"
                      ? typeof a == "string"
                        ? (n !== "textarea" || a !== "") && Fr(e, a)
                        : typeof a == "number" && Fr(e, "" + a)
                      : s !== "suppressContentEditableWarning" &&
                        s !== "suppressHydrationWarning" &&
                        s !== "autoFocus" &&
                        (Hr.hasOwnProperty(s)
                          ? a != null && s === "onScroll" && j("scroll", e)
                          : a != null && Vl(e, s, a, o));
              }
            switch (n) {
              case "input":
                pi(e), Wa(e, r, !1);
                break;
              case "textarea":
                pi(e), Xa(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Xt(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (s = r.value),
                  s != null
                    ? Un(e, !!r.multiple, s, !1)
                    : r.defaultValue != null &&
                      Un(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = os);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return ge(t), null;
    case 6:
      if (e && t.stateNode != null) yf(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(b(166));
        if (((n = sn(Yr.current)), sn(mt.current), hr(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[ht] = t),
            (s = r.nodeValue !== n) && ((e = Fe), e !== null))
          )
            switch (e.tag) {
              case 3:
                _i(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  _i(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          s && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[ht] = t),
            (t.stateNode = r);
      }
      return ge(t), null;
    case 13:
      if (
        (W(Q),
        (r = t.memoizedState),
        q && Ie !== null && t.mode & 1 && !(t.flags & 128))
      ) {
        for (r = Ie; r; ) r = Et(r.nextSibling);
        return Gn(), (t.flags |= 98560), t;
      }
      if (r !== null && r.dehydrated !== null) {
        if (((r = hr(t)), e === null)) {
          if (!r) throw Error(b(318));
          if (
            ((r = t.memoizedState), (r = r !== null ? r.dehydrated : null), !r)
          )
            throw Error(b(317));
          r[ht] = t;
        } else
          Gn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
        return ge(t), null;
      }
      return (
        rt !== null && (Sl(rt), (rt = null)),
        t.flags & 128
          ? ((t.lanes = n), t)
          : ((r = r !== null),
            (n = !1),
            e === null ? hr(t) : (n = e.memoizedState !== null),
            r !== n &&
              r &&
              ((t.child.flags |= 8192),
              t.mode & 1 &&
                (e === null || Q.current & 1 ? le === 0 && (le = 3) : Ea())),
            t.updateQueue !== null && (t.flags |= 4),
            ge(t),
            null)
      );
    case 4:
      return (
        Jn(), cl(e, t), e === null && Xr(t.stateNode.containerInfo), ge(t), null
      );
    case 10:
      return ia(t.type._context), ge(t), null;
    case 17:
      return Oe(t.type) && ls(), ge(t), null;
    case 19:
      if ((W(Q), (s = t.memoizedState), s === null)) return ge(t), null;
      if (((r = (t.flags & 128) !== 0), (o = s.rendering), o === null))
        if (r) mr(s, !1);
        else {
          if (le !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((o = ps(e)), o !== null)) {
                for (
                  t.flags |= 128,
                    mr(s, !1),
                    r = o.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (s = n),
                    (e = r),
                    (s.flags &= 14680066),
                    (o = s.alternate),
                    o === null
                      ? ((s.childLanes = 0),
                        (s.lanes = e),
                        (s.child = null),
                        (s.subtreeFlags = 0),
                        (s.memoizedProps = null),
                        (s.memoizedState = null),
                        (s.updateQueue = null),
                        (s.dependencies = null),
                        (s.stateNode = null))
                      : ((s.childLanes = o.childLanes),
                        (s.lanes = o.lanes),
                        (s.child = o.child),
                        (s.subtreeFlags = 0),
                        (s.deletions = null),
                        (s.memoizedProps = o.memoizedProps),
                        (s.memoizedState = o.memoizedState),
                        (s.updateQueue = o.updateQueue),
                        (s.type = o.type),
                        (e = o.dependencies),
                        (s.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return V(Q, (Q.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          s.tail !== null &&
            ee() > Zn &&
            ((t.flags |= 128), (r = !0), mr(s, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = ps(o)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              mr(s, !0),
              s.tail === null && s.tailMode === "hidden" && !o.alternate && !q)
            )
              return ge(t), null;
          } else
            2 * ee() - s.renderingStartTime > Zn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), mr(s, !1), (t.lanes = 4194304));
        s.isBackwards
          ? ((o.sibling = t.child), (t.child = o))
          : ((n = s.last),
            n !== null ? (n.sibling = o) : (t.child = o),
            (s.last = o));
      }
      return s.tail !== null
        ? ((t = s.tail),
          (s.rendering = t),
          (s.tail = t.sibling),
          (s.renderingStartTime = ee()),
          (t.sibling = null),
          (n = Q.current),
          V(Q, r ? (n & 1) | 2 : n & 1),
          t)
        : (ge(t), null);
    case 22:
    case 23:
      return (
        _a(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? He & 1073741824 && (ge(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ge(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(b(156, t.tag));
}
var Ig = At.ReactCurrentOwner,
  Re = !1;
function _e(e, t, n, r) {
  t.child = e === null ? qd(t, null, n, r) : Yn(t, e.child, n, r);
}
function Mu(e, t, n, r, i) {
  n = n.render;
  var s = t.ref;
  return (
    Wn(t, i),
    (r = ha(e, t, n, r, s, i)),
    (n = pa()),
    e !== null && !Re
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Lt(e, t, i))
      : (q && n && oa(t), (t.flags |= 1), _e(e, t, r, i), t.child)
  );
}
function Pu(e, t, n, r, i) {
  if (e === null) {
    var s = n.type;
    return typeof s == "function" &&
      !ka(s) &&
      s.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = s), wf(e, t, s, r, i))
      : ((e = ji(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((s = e.child), !(e.lanes & i))) {
    var o = s.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : qr), n(o, r) && e.ref === t.ref)
    )
      return Lt(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = Kt(s, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function wf(e, t, n, r, i) {
  if (e !== null) {
    var s = e.memoizedProps;
    if (qr(s, r) && e.ref === t.ref)
      if (((Re = !1), (t.pendingProps = r = s), (e.lanes & i) !== 0))
        e.flags & 131072 && (Re = !0);
      else return (t.lanes = e.lanes), Lt(e, t, i);
  }
  return dl(e, t, n, r, i);
}
function xf(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    s = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        V(Dn, He),
        (He |= n);
    else if (n & 1073741824)
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = s !== null ? s.baseLanes : n),
        V(Dn, He),
        (He |= r);
    else
      return (
        (e = s !== null ? s.baseLanes | n : n),
        (t.lanes = t.childLanes = 1073741824),
        (t.memoizedState = {
          baseLanes: e,
          cachePool: null,
          transitions: null,
        }),
        (t.updateQueue = null),
        V(Dn, He),
        (He |= e),
        null
      );
  else
    s !== null ? ((r = s.baseLanes | n), (t.memoizedState = null)) : (r = n),
      V(Dn, He),
      (He |= r);
  return _e(e, t, i, n), t.child;
}
function Sf(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function dl(e, t, n, r, i) {
  var s = Oe(n) ? dn : xe.current;
  return (
    (s = Kn(t, s)),
    Wn(t, i),
    (n = ha(e, t, n, r, s, i)),
    (r = pa()),
    e !== null && !Re
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Lt(e, t, i))
      : (q && r && oa(t), (t.flags |= 1), _e(e, t, n, i), t.child)
  );
}
function Iu(e, t, n, r, i) {
  if (Oe(n)) {
    var s = !0;
    as(t);
  } else s = !1;
  if ((Wn(t, i), t.stateNode === null))
    e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2)),
      Vd(t, n, r),
      ol(t, n, r, i),
      (r = !0);
  else if (e === null) {
    var o = t.stateNode,
      l = t.memoizedProps;
    o.props = l;
    var a = o.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = Je(u))
      : ((u = Oe(n) ? dn : xe.current), (u = Kn(t, u)));
    var c = n.getDerivedStateFromProps,
      p =
        typeof c == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function";
    p ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((l !== r || a !== u) && _u(t, o, r, u)),
      (It = !1);
    var d = t.memoizedState;
    (o.state = d),
      ds(t, r, o, i),
      (a = t.memoizedState),
      l !== r || d !== a || $e.current || It
        ? (typeof c == "function" && (sl(t, n, c, r), (a = t.memoizedState)),
          (l = It || Su(t, n, l, r, d, a, u))
            ? (p ||
                (typeof o.UNSAFE_componentWillMount != "function" &&
                  typeof o.componentWillMount != "function") ||
                (typeof o.componentWillMount == "function" &&
                  o.componentWillMount(),
                typeof o.UNSAFE_componentWillMount == "function" &&
                  o.UNSAFE_componentWillMount()),
              typeof o.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (o.props = r),
          (o.state = a),
          (o.context = u),
          (r = l))
        : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (o = t.stateNode),
      Fd(e, t),
      (l = t.memoizedProps),
      (u = t.type === t.elementType ? l : tt(t.type, l)),
      (o.props = u),
      (p = t.pendingProps),
      (d = o.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = Je(a))
        : ((a = Oe(n) ? dn : xe.current), (a = Kn(t, a)));
    var v = n.getDerivedStateFromProps;
    (c =
      typeof v == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function") ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((l !== p || d !== a) && _u(t, o, r, a)),
      (It = !1),
      (d = t.memoizedState),
      (o.state = d),
      ds(t, r, o, i);
    var y = t.memoizedState;
    l !== p || d !== y || $e.current || It
      ? (typeof v == "function" && (sl(t, n, v, r), (y = t.memoizedState)),
        (u = It || Su(t, n, u, r, d, y, a) || !1)
          ? (c ||
              (typeof o.UNSAFE_componentWillUpdate != "function" &&
                typeof o.componentWillUpdate != "function") ||
              (typeof o.componentWillUpdate == "function" &&
                o.componentWillUpdate(r, y, a),
              typeof o.UNSAFE_componentWillUpdate == "function" &&
                o.UNSAFE_componentWillUpdate(r, y, a)),
            typeof o.componentDidUpdate == "function" && (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof o.componentDidUpdate != "function" ||
              (l === e.memoizedProps && d === e.memoizedState) ||
              (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != "function" ||
              (l === e.memoizedProps && d === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = y)),
        (o.props = r),
        (o.state = y),
        (o.context = a),
        (r = u))
      : (typeof o.componentDidUpdate != "function" ||
          (l === e.memoizedProps && d === e.memoizedState) ||
          (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" ||
          (l === e.memoizedProps && d === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return fl(e, t, n, r, s, i);
}
function fl(e, t, n, r, i, s) {
  Sf(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return i && yu(t, n, !1), Lt(e, t, s);
  (r = t.stateNode), (Ig.current = t);
  var l =
    o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && o
      ? ((t.child = Yn(t, e.child, null, s)), (t.child = Yn(t, null, l, s)))
      : _e(e, t, l, s),
    (t.memoizedState = r.state),
    i && yu(t, n, !0),
    t.child
  );
}
function _f(e) {
  var t = e.stateNode;
  t.pendingContext
    ? vu(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && vu(e, t.context, !1),
    ua(e, t.containerInfo);
}
function Ru(e, t, n, r, i) {
  return Gn(), aa(i), (t.flags |= 256), _e(e, t, n, r), t.child;
}
var ki = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ti(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function $u(e, t) {
  return {
    baseLanes: e.baseLanes | t,
    cachePool: null,
    transitions: e.transitions,
  };
}
function Ef(e, t, n) {
  var r = t.pendingProps,
    i = Q.current,
    s = !1,
    o = (t.flags & 128) !== 0,
    l;
  if (
    ((l = o) ||
      (l = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    l
      ? ((s = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    V(Q, i & 1),
    e === null)
  )
    return (
      al(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((i = r.children),
          (e = r.fallback),
          s
            ? ((r = t.mode),
              (s = t.child),
              (i = { mode: "hidden", children: i }),
              !(r & 1) && s !== null
                ? ((s.childLanes = 0), (s.pendingProps = i))
                : (s = Ss(i, r, 0, null)),
              (e = ln(e, r, n, null)),
              (s.return = t),
              (e.return = t),
              (s.sibling = e),
              (t.child = s),
              (t.child.memoizedState = Ti(n)),
              (t.memoizedState = ki),
              e)
            : hl(t, i))
    );
  if (((i = e.memoizedState), i !== null)) {
    if (((l = i.dehydrated), l !== null)) {
      if (o)
        return t.flags & 256
          ? ((t.flags &= -257), Ni(e, t, n, Error(b(422))))
          : t.memoizedState !== null
            ? ((t.child = e.child), (t.flags |= 128), null)
            : ((s = r.fallback),
              (i = t.mode),
              (r = Ss({ mode: "visible", children: r.children }, i, 0, null)),
              (s = ln(s, i, n, null)),
              (s.flags |= 2),
              (r.return = t),
              (s.return = t),
              (r.sibling = s),
              (t.child = r),
              t.mode & 1 && Yn(t, e.child, null, n),
              (t.child.memoizedState = Ti(n)),
              (t.memoizedState = ki),
              s);
      if (!(t.mode & 1)) t = Ni(e, t, n, null);
      else if (l.data === "$!") t = Ni(e, t, n, Error(b(419)));
      else if (((r = (n & e.childLanes) !== 0), Re || r)) {
        if (((r = ae), r !== null)) {
          switch (n & -n) {
            case 4:
              s = 2;
              break;
            case 16:
              s = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              s = 32;
              break;
            case 536870912:
              s = 268435456;
              break;
            default:
              s = 0;
          }
          (r = s & (r.suspendedLanes | n) ? 0 : s),
            r !== 0 && r !== i.retryLane && ((i.retryLane = r), Ye(e, r, -1));
        }
        Ea(), (t = Ni(e, t, n, Error(b(421))));
      } else
        l.data === "$?"
          ? ((t.flags |= 128),
            (t.child = e.child),
            (t = Wg.bind(null, e)),
            (l._reactRetry = t),
            (t = null))
          : ((n = i.treeContext),
            (Ie = Et(l.nextSibling)),
            (Fe = t),
            (q = !0),
            (rt = null),
            n !== null &&
              ((We[qe++] = kt),
              (We[qe++] = Tt),
              (We[qe++] = fn),
              (kt = n.id),
              (Tt = n.overflow),
              (fn = t)),
            (t = hl(t, t.pendingProps.children)),
            (t.flags |= 4096));
      return t;
    }
    return s
      ? ((r = zu(e, t, r.children, r.fallback, n)),
        (s = t.child),
        (i = e.child.memoizedState),
        (s.memoizedState = i === null ? Ti(n) : $u(i, n)),
        (s.childLanes = e.childLanes & ~n),
        (t.memoizedState = ki),
        r)
      : ((n = Ou(e, t, r.children, n)), (t.memoizedState = null), n);
  }
  return s
    ? ((r = zu(e, t, r.children, r.fallback, n)),
      (s = t.child),
      (i = e.child.memoizedState),
      (s.memoizedState = i === null ? Ti(n) : $u(i, n)),
      (s.childLanes = e.childLanes & ~n),
      (t.memoizedState = ki),
      r)
    : ((n = Ou(e, t, r.children, n)), (t.memoizedState = null), n);
}
function hl(e, t) {
  return (
    (t = Ss({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Ou(e, t, n, r) {
  var i = e.child;
  return (
    (e = i.sibling),
    (n = Kt(i, { mode: "visible", children: n })),
    !(t.mode & 1) && (n.lanes = r),
    (n.return = t),
    (n.sibling = null),
    e !== null &&
      ((r = t.deletions),
      r === null ? ((t.deletions = [e]), (t.flags |= 16)) : r.push(e)),
    (t.child = n)
  );
}
function zu(e, t, n, r, i) {
  var s = t.mode;
  e = e.child;
  var o = e.sibling,
    l = { mode: "hidden", children: n };
  return (
    !(s & 1) && t.child !== e
      ? ((n = t.child),
        (n.childLanes = 0),
        (n.pendingProps = l),
        (t.deletions = null))
      : ((n = Kt(e, l)), (n.subtreeFlags = e.subtreeFlags & 14680064)),
    o !== null ? (r = Kt(o, r)) : ((r = ln(r, s, i, null)), (r.flags |= 2)),
    (r.return = t),
    (n.return = t),
    (n.sibling = r),
    (t.child = n),
    r
  );
}
function Ni(e, t, n, r) {
  return (
    r !== null && aa(r),
    Yn(t, e.child, null, n),
    (e = hl(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Du(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), il(e.return, t, n);
}
function So(e, t, n, r, i) {
  var s = e.memoizedState;
  s === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((s.isBackwards = t),
      (s.rendering = null),
      (s.renderingStartTime = 0),
      (s.last = r),
      (s.tail = n),
      (s.tailMode = i));
}
function kf(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    s = r.tail;
  if ((_e(e, t, r.children, n), (r = Q.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Du(e, n, t);
        else if (e.tag === 19) Du(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((V(Q, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate),
            e !== null && ps(e) === null && (i = n),
            (n = n.sibling);
        (n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          So(t, !1, i, n, s);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && ps(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        So(t, !0, n, null, s);
        break;
      case "together":
        So(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Lt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (pn |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(b(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Kt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = Kt(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Rg(e, t, n) {
  switch (t.tag) {
    case 3:
      _f(t), Gn();
      break;
    case 5:
      Xd(t);
      break;
    case 1:
      Oe(t.type) && as(t);
      break;
    case 4:
      ua(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      V(us, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (V(Q, Q.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? Ef(e, t, n)
            : (V(Q, Q.current & 1),
              (e = Lt(e, t, n)),
              e !== null ? e.sibling : null);
      V(Q, Q.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return kf(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        V(Q, Q.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), xf(e, t, n);
  }
  return Lt(e, t, n);
}
function $g(e, t) {
  switch ((la(t), t.tag)) {
    case 1:
      return (
        Oe(t.type) && ls(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Jn(),
        W($e),
        W(xe),
        da(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return ca(t), null;
    case 13:
      if ((W(Q), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(b(340));
        Gn();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return W(Q), null;
    case 4:
      return Jn(), null;
    case 10:
      return ia(t.type._context), null;
    case 22:
    case 23:
      return _a(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Ci = !1,
  ye = !1,
  Og = typeof WeakSet == "function" ? WeakSet : Set,
  R = null;
function zn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        J(e, t, r);
      }
    else n.current = null;
}
function pl(e, t, n) {
  try {
    n();
  } catch (r) {
    J(e, t, r);
  }
}
var Hu = !1;
function zg(e, t) {
  if (((Jo = rs), (e = Ld()), ta(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            s = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, s.nodeType;
          } catch {
            n = null;
            break e;
          }
          var o = 0,
            l = -1,
            a = -1,
            u = 0,
            c = 0,
            p = e,
            d = null;
          t: for (;;) {
            for (
              var v;
              p !== n || (i !== 0 && p.nodeType !== 3) || (l = o + i),
                p !== s || (r !== 0 && p.nodeType !== 3) || (a = o + r),
                p.nodeType === 3 && (o += p.nodeValue.length),
                (v = p.firstChild) !== null;

            )
              (d = p), (p = v);
            for (;;) {
              if (p === e) break t;
              if (
                (d === n && ++u === i && (l = o),
                d === s && ++c === r && (a = o),
                (v = p.nextSibling) !== null)
              )
                break;
              (p = d), (d = p.parentNode);
            }
            p = v;
          }
          n = l === -1 || a === -1 ? null : { start: l, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Zo = { focusedElem: e, selectionRange: n }, rs = !1, R = t; R !== null; )
    if (((t = R), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (R = e);
    else
      for (; R !== null; ) {
        t = R;
        try {
          var y = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (y !== null) {
                  var x = y.memoizedProps,
                    w = y.memoizedState,
                    h = t.stateNode,
                    f = h.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? x : tt(t.type, x),
                      w,
                    );
                  h.__reactInternalSnapshotBeforeUpdate = f;
                }
                break;
              case 3:
                var g = t.stateNode.containerInfo;
                if (g.nodeType === 1) g.textContent = "";
                else if (g.nodeType === 9) {
                  var _ = g.body;
                  _ != null && (_.textContent = "");
                }
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(b(163));
            }
        } catch (k) {
          J(t, t.return, k);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (R = e);
          break;
        }
        R = t.return;
      }
  return (y = Hu), (Hu = !1), y;
}
function $r(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var s = i.destroy;
        (i.destroy = void 0), s !== void 0 && pl(t, n, s);
      }
      i = i.next;
    } while (i !== r);
  }
}
function zs(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function ml(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Tf(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Tf(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[ht], delete t[Kr], delete t[nl], delete t[xg], delete t[Sg])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Nf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Fu(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Nf(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function gl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = os));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (gl(e, t, n), e = e.sibling; e !== null; ) gl(e, t, n), (e = e.sibling);
}
function vl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (vl(e, t, n), e = e.sibling; e !== null; ) vl(e, t, n), (e = e.sibling);
}
var de = null,
  nt = !1;
function Mt(e, t, n) {
  for (n = n.child; n !== null; ) Cf(e, t, n), (n = n.sibling);
}
function Cf(e, t, n) {
  if (pt && typeof pt.onCommitFiberUnmount == "function")
    try {
      pt.onCommitFiberUnmount(Ls, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ye || zn(n, t);
    case 6:
      var r = de,
        i = nt;
      (de = null),
        Mt(e, t, n),
        (de = r),
        (nt = i),
        de !== null &&
          (nt
            ? ((e = de),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : de.removeChild(n.stateNode));
      break;
    case 18:
      de !== null &&
        (nt
          ? ((e = de),
            (n = n.stateNode),
            e.nodeType === 8
              ? mo(e.parentNode, n)
              : e.nodeType === 1 && mo(e, n),
            jr(e))
          : mo(de, n.stateNode));
      break;
    case 4:
      (r = de),
        (i = nt),
        (de = n.stateNode.containerInfo),
        (nt = !0),
        Mt(e, t, n),
        (de = r),
        (nt = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ye &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var s = i,
            o = s.destroy;
          (s = s.tag),
            o !== void 0 && (s & 2 || s & 4) && pl(n, t, o),
            (i = i.next);
        } while (i !== r);
      }
      Mt(e, t, n);
      break;
    case 1:
      if (
        !ye &&
        (zn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (l) {
          J(n, t, l);
        }
      Mt(e, t, n);
      break;
    case 21:
      Mt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ye = (r = ye) || n.memoizedState !== null), Mt(e, t, n), (ye = r))
        : Mt(e, t, n);
      break;
    default:
      Mt(e, t, n);
  }
}
function Uu(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Og()),
      t.forEach(function (r) {
        var i = qg.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
  }
}
function et(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var s = e,
          o = t,
          l = o;
        e: for (; l !== null; ) {
          switch (l.tag) {
            case 5:
              (de = l.stateNode), (nt = !1);
              break e;
            case 3:
              (de = l.stateNode.containerInfo), (nt = !0);
              break e;
            case 4:
              (de = l.stateNode.containerInfo), (nt = !0);
              break e;
          }
          l = l.return;
        }
        if (de === null) throw Error(b(160));
        Cf(s, o, i), (de = null), (nt = !1);
        var a = i.alternate;
        a !== null && (a.return = null), (i.return = null);
      } catch (u) {
        J(i, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) bf(t, e), (t = t.sibling);
}
function bf(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((et(t, e), ut(e), r & 4)) {
        try {
          $r(3, e, e.return), zs(3, e);
        } catch (y) {
          J(e, e.return, y);
        }
        try {
          $r(5, e, e.return);
        } catch (y) {
          J(e, e.return, y);
        }
      }
      break;
    case 1:
      et(t, e), ut(e), r & 512 && n !== null && zn(n, n.return);
      break;
    case 5:
      if (
        (et(t, e),
        ut(e),
        r & 512 && n !== null && zn(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          Fr(i, "");
        } catch (y) {
          J(e, e.return, y);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var s = e.memoizedProps,
          o = n !== null ? n.memoizedProps : s,
          l = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            l === "input" && s.type === "radio" && s.name != null && Gc(i, s),
              Vo(l, o);
            var u = Vo(l, s);
            for (o = 0; o < a.length; o += 2) {
              var c = a[o],
                p = a[o + 1];
              c === "style"
                ? td(i, p)
                : c === "dangerouslySetInnerHTML"
                  ? Zc(i, p)
                  : c === "children"
                    ? Fr(i, p)
                    : Vl(i, c, p, u);
            }
            switch (l) {
              case "input":
                zo(i, s);
                break;
              case "textarea":
                Yc(i, s);
                break;
              case "select":
                var d = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!s.multiple;
                var v = s.value;
                v != null
                  ? Un(i, !!s.multiple, v, !1)
                  : d !== !!s.multiple &&
                    (s.defaultValue != null
                      ? Un(i, !!s.multiple, s.defaultValue, !0)
                      : Un(i, !!s.multiple, s.multiple ? [] : "", !1));
            }
            i[Kr] = s;
          } catch (y) {
            J(e, e.return, y);
          }
      }
      break;
    case 6:
      if ((et(t, e), ut(e), r & 4)) {
        if (e.stateNode === null) throw Error(b(162));
        (u = e.stateNode), (c = e.memoizedProps);
        try {
          u.nodeValue = c;
        } catch (y) {
          J(e, e.return, y);
        }
      }
      break;
    case 3:
      if (
        (et(t, e), ut(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          jr(t.containerInfo);
        } catch (y) {
          J(e, e.return, y);
        }
      break;
    case 4:
      et(t, e), ut(e);
      break;
    case 13:
      et(t, e),
        ut(e),
        (u = e.child),
        u.flags & 8192 &&
          u.memoizedState !== null &&
          (u.alternate === null || u.alternate.memoizedState === null) &&
          (xa = ee()),
        r & 4 && Uu(e);
      break;
    case 22:
      if (
        ((u = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ye = (c = ye) || u), et(t, e), (ye = c)) : et(t, e),
        ut(e),
        r & 8192)
      ) {
        c = e.memoizedState !== null;
        e: for (p = null, d = e; ; ) {
          if (d.tag === 5) {
            if (p === null) {
              p = d;
              try {
                (i = d.stateNode),
                  c
                    ? ((s = i.style),
                      typeof s.setProperty == "function"
                        ? s.setProperty("display", "none", "important")
                        : (s.display = "none"))
                    : ((l = d.stateNode),
                      (a = d.memoizedProps.style),
                      (o =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (l.style.display = ed("display", o)));
              } catch (y) {
                J(e, e.return, y);
              }
            }
          } else if (d.tag === 6) {
            if (p === null)
              try {
                d.stateNode.nodeValue = c ? "" : d.memoizedProps;
              } catch (y) {
                J(e, e.return, y);
              }
          } else if (
            ((d.tag !== 22 && d.tag !== 23) ||
              d.memoizedState === null ||
              d === e) &&
            d.child !== null
          ) {
            (d.child.return = d), (d = d.child);
            continue;
          }
          if (d === e) break e;
          for (; d.sibling === null; ) {
            if (d.return === null || d.return === e) break e;
            p === d && (p = null), (d = d.return);
          }
          p === d && (p = null), (d.sibling.return = d.return), (d = d.sibling);
        }
        if (c && !u && e.mode & 1)
          for (R = e, e = e.child; e !== null; ) {
            for (u = R = e; R !== null; ) {
              switch (((c = R), (p = c.child), c.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  $r(4, c, c.return);
                  break;
                case 1:
                  if (
                    (zn(c, c.return),
                    (s = c.stateNode),
                    typeof s.componentWillUnmount == "function")
                  ) {
                    (d = c), (v = c.return);
                    try {
                      (i = d),
                        (s.props = i.memoizedProps),
                        (s.state = i.memoizedState),
                        s.componentWillUnmount();
                    } catch (y) {
                      J(d, v, y);
                    }
                  }
                  break;
                case 5:
                  zn(c, c.return);
                  break;
                case 22:
                  if (c.memoizedState !== null) {
                    Bu(u);
                    continue;
                  }
              }
              p !== null ? ((p.return = c), (R = p)) : Bu(u);
            }
            e = e.sibling;
          }
      }
      break;
    case 19:
      et(t, e), ut(e), r & 4 && Uu(e);
      break;
    case 21:
      break;
    default:
      et(t, e), ut(e);
  }
}
function ut(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Nf(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(b(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (Fr(i, ""), (r.flags &= -33));
          var s = Fu(e);
          vl(e, s, i);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            l = Fu(e);
          gl(e, l, o);
          break;
        default:
          throw Error(b(161));
      }
    } catch (a) {
      J(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Dg(e, t, n) {
  (R = e), Lf(e);
}
function Lf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; R !== null; ) {
    var i = R,
      s = i.child;
    if (i.tag === 22 && r) {
      var o = i.memoizedState !== null || Ci;
      if (!o) {
        var l = i.alternate,
          a = (l !== null && l.memoizedState !== null) || ye;
        l = Ci;
        var u = ye;
        if (((Ci = o), (ye = a) && !u))
          for (R = i; R !== null; )
            (o = R),
              (a = o.child),
              o.tag === 22 && o.memoizedState !== null
                ? ju(i)
                : a !== null
                  ? ((a.return = o), (R = a))
                  : ju(i);
        for (; s !== null; ) (R = s), Lf(s), (s = s.sibling);
        (R = i), (Ci = l), (ye = u);
      }
      Vu(e);
    } else
      i.subtreeFlags & 8772 && s !== null ? ((s.return = i), (R = s)) : Vu(e);
  }
}
function Vu(e) {
  for (; R !== null; ) {
    var t = R;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ye || zs(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ye)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : tt(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var s = t.updateQueue;
              s !== null && xu(t, s, r);
              break;
            case 3:
              var o = t.updateQueue;
              if (o !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                xu(t, o, n);
              }
              break;
            case 5:
              var l = t.stateNode;
              if (n === null && t.flags & 4) {
                n = l;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var c = u.memoizedState;
                  if (c !== null) {
                    var p = c.dehydrated;
                    p !== null && jr(p);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
              break;
            default:
              throw Error(b(163));
          }
        ye || (t.flags & 512 && ml(t));
      } catch (d) {
        J(t, t.return, d);
      }
    }
    if (t === e) {
      R = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (R = n);
      break;
    }
    R = t.return;
  }
}
function Bu(e) {
  for (; R !== null; ) {
    var t = R;
    if (t === e) {
      R = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (R = n);
      break;
    }
    R = t.return;
  }
}
function ju(e) {
  for (; R !== null; ) {
    var t = R;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            zs(4, t);
          } catch (a) {
            J(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              J(t, i, a);
            }
          }
          var s = t.return;
          try {
            ml(t);
          } catch (a) {
            J(t, s, a);
          }
          break;
        case 5:
          var o = t.return;
          try {
            ml(t);
          } catch (a) {
            J(t, o, a);
          }
      }
    } catch (a) {
      J(t, t.return, a);
    }
    if (t === e) {
      R = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      (l.return = t.return), (R = l);
      break;
    }
    R = t.return;
  }
}
var Hg = Math.ceil,
  vs = At.ReactCurrentDispatcher,
  ya = At.ReactCurrentOwner,
  Ge = At.ReactCurrentBatchConfig,
  H = 0,
  ae = null,
  ie = null,
  he = 0,
  He = 0,
  Dn = Jt(0),
  le = 0,
  ti = null,
  pn = 0,
  Ds = 0,
  wa = 0,
  Or = null,
  Me = null,
  xa = 0,
  Zn = 1 / 0,
  xt = null,
  ys = !1,
  yl = null,
  Wt = null,
  bi = !1,
  Ht = null,
  ws = 0,
  zr = 0,
  wl = null,
  Vi = -1,
  Bi = 0;
function Te() {
  return H & 6 ? ee() : Vi !== -1 ? Vi : (Vi = ee());
}
function qt(e) {
  return e.mode & 1
    ? H & 2 && he !== 0
      ? he & -he
      : Eg.transition !== null
        ? (Bi === 0 && (Bi = hd()), Bi)
        : ((e = U),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : xd(e.type))),
          e)
    : 1;
}
function Ye(e, t, n) {
  if (50 < zr) throw ((zr = 0), (wl = null), Error(b(185)));
  var r = Hs(e, t);
  return r === null
    ? null
    : (ii(r, t, n),
      (!(H & 2) || r !== ae) &&
        (r === ae && (!(H & 2) && (Ds |= t), le === 4 && zt(r, he)),
        ze(r, n),
        t === 1 && H === 0 && !(e.mode & 1) && ((Zn = ee() + 500), Rs && Zt())),
      r);
}
function Hs(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
function Af(e) {
  return (ae !== null || it !== null) && (e.mode & 1) !== 0 && (H & 2) === 0;
}
function ze(e, t) {
  var n = e.callbackNode;
  Em(e, t);
  var r = ns(e, e === ae ? he : 0);
  if (r === 0)
    n !== null && Ga(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Ga(n), t === 1))
      e.tag === 0 ? _g(Wu.bind(null, e)) : Hd(Wu.bind(null, e)),
        yg(function () {
          H === 0 && Zt();
        }),
        (n = null);
    else {
      switch (pd(r)) {
        case 1:
          n = Xl;
          break;
        case 4:
          n = dd;
          break;
        case 16:
          n = ts;
          break;
        case 536870912:
          n = fd;
          break;
        default:
          n = ts;
      }
      n = Df(n, Mf.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Mf(e, t) {
  if (((Vi = -1), (Bi = 0), H & 6)) throw Error(b(327));
  var n = e.callbackNode;
  if (qn() && e.callbackNode !== n) return null;
  var r = ns(e, e === ae ? he : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = xs(e, r);
  else {
    t = r;
    var i = H;
    H |= 2;
    var s = If();
    (ae !== e || he !== t) && ((xt = null), (Zn = ee() + 500), on(e, t));
    do
      try {
        Vg();
        break;
      } catch (l) {
        Pf(e, l);
      }
    while (1);
    ra(),
      (vs.current = s),
      (H = i),
      ie !== null ? (t = 0) : ((ae = null), (he = 0), (t = le));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = Xo(e)), i !== 0 && ((r = i), (t = xl(e, i)))), t === 1)
    )
      throw ((n = ti), on(e, 0), zt(e, r), ze(e, ee()), n);
    if (t === 6) zt(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !Fg(i) &&
          ((t = xs(e, r)),
          t === 2 && ((s = Xo(e)), s !== 0 && ((r = s), (t = xl(e, s)))),
          t === 1))
      )
        throw ((n = ti), on(e, 0), zt(e, r), ze(e, ee()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(b(345));
        case 2:
          nn(e, Me, xt);
          break;
        case 3:
          if (
            (zt(e, r), (r & 130023424) === r && ((t = xa + 500 - ee()), 10 < t))
          ) {
            if (ns(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              Te(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = tl(nn.bind(null, e, Me, xt), t);
            break;
          }
          nn(e, Me, xt);
          break;
        case 4:
          if ((zt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var o = 31 - st(r);
            (s = 1 << o), (o = t[o]), o > i && (i = o), (r &= ~s);
          }
          if (
            ((r = i),
            (r = ee() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * Hg(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = tl(nn.bind(null, e, Me, xt), r);
            break;
          }
          nn(e, Me, xt);
          break;
        case 5:
          nn(e, Me, xt);
          break;
        default:
          throw Error(b(329));
      }
    }
  }
  return ze(e, ee()), e.callbackNode === n ? Mf.bind(null, e) : null;
}
function xl(e, t) {
  var n = Or;
  return (
    e.current.memoizedState.isDehydrated && (on(e, t).flags |= 256),
    (e = xs(e, t)),
    e !== 2 && ((t = Me), (Me = n), t !== null && Sl(t)),
    e
  );
}
function Sl(e) {
  Me === null ? (Me = e) : Me.push.apply(Me, e);
}
function Fg(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            s = i.getSnapshot;
          i = i.value;
          try {
            if (!lt(s(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function zt(e, t) {
  for (
    t &= ~wa,
      t &= ~Ds,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - st(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Wu(e) {
  if (H & 6) throw Error(b(327));
  qn();
  var t = ns(e, 0);
  if (!(t & 1)) return ze(e, ee()), null;
  var n = xs(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Xo(e);
    r !== 0 && ((t = r), (n = xl(e, r)));
  }
  if (n === 1) throw ((n = ti), on(e, 0), zt(e, t), ze(e, ee()), n);
  if (n === 6) throw Error(b(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    nn(e, Me, xt),
    ze(e, ee()),
    null
  );
}
function Sa(e, t) {
  var n = H;
  H |= 1;
  try {
    return e(t);
  } finally {
    (H = n), H === 0 && ((Zn = ee() + 500), Rs && Zt());
  }
}
function mn(e) {
  Ht !== null && Ht.tag === 0 && !(H & 6) && qn();
  var t = H;
  H |= 1;
  var n = Ge.transition,
    r = U;
  try {
    if (((Ge.transition = null), (U = 1), e)) return e();
  } finally {
    (U = r), (Ge.transition = n), (H = t), !(H & 6) && Zt();
  }
}
function _a() {
  (He = Dn.current), W(Dn);
}
function on(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), vg(n)), ie !== null))
    for (n = ie.return; n !== null; ) {
      var r = n;
      switch ((la(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && ls();
          break;
        case 3:
          Jn(), W($e), W(xe), da();
          break;
        case 5:
          ca(r);
          break;
        case 4:
          Jn();
          break;
        case 13:
          W(Q);
          break;
        case 19:
          W(Q);
          break;
        case 10:
          ia(r.type._context);
          break;
        case 22:
        case 23:
          _a();
      }
      n = n.return;
    }
  if (
    ((ae = e),
    (ie = e = Kt(e.current, null)),
    (he = He = t),
    (le = 0),
    (ti = null),
    (wa = Ds = pn = 0),
    (Me = Or = null),
    it !== null)
  ) {
    for (t = 0; t < it.length; t++)
      if (((n = it[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          s = n.pending;
        if (s !== null) {
          var o = s.next;
          (s.next = i), (r.next = o);
        }
        n.pending = r;
      }
    it = null;
  }
  return e;
}
function Pf(e, t) {
  do {
    var n = ie;
    try {
      if ((ra(), (Fi.current = gs), ms)) {
        for (var r = K.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        ms = !1;
      }
      if (
        ((hn = 0),
        (ue = oe = K = null),
        (Rr = !1),
        (Jr = 0),
        (ya.current = null),
        n === null || n.return === null)
      ) {
        (le = 1), (ti = t), (ie = null);
        break;
      }
      e: {
        var s = e,
          o = n.return,
          l = n,
          a = t;
        if (
          ((t = he),
          (l.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var u = a,
            c = l,
            p = c.tag;
          if (!(c.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var d = c.alternate;
            d
              ? ((c.updateQueue = d.updateQueue),
                (c.memoizedState = d.memoizedState),
                (c.lanes = d.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var v = Lu(o);
          if (v !== null) {
            (v.flags &= -257),
              Au(v, o, l, s, t),
              v.mode & 1 && bu(s, u, t),
              (t = v),
              (a = u);
            var y = t.updateQueue;
            if (y === null) {
              var x = new Set();
              x.add(a), (t.updateQueue = x);
            } else y.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              bu(s, u, t), Ea();
              break e;
            }
            a = Error(b(426));
          }
        } else if (q && l.mode & 1) {
          var w = Lu(o);
          if (w !== null) {
            !(w.flags & 65536) && (w.flags |= 256), Au(w, o, l, s, t), aa(a);
            break e;
          }
        }
        (s = a),
          le !== 4 && (le = 2),
          Or === null ? (Or = [s]) : Or.push(s),
          (a = va(a, l)),
          (l = o);
        do {
          switch (l.tag) {
            case 3:
              (l.flags |= 65536), (t &= -t), (l.lanes |= t);
              var h = pf(l, a, t);
              wu(l, h);
              break e;
            case 1:
              s = a;
              var f = l.type,
                g = l.stateNode;
              if (
                !(l.flags & 128) &&
                (typeof f.getDerivedStateFromError == "function" ||
                  (g !== null &&
                    typeof g.componentDidCatch == "function" &&
                    (Wt === null || !Wt.has(g))))
              ) {
                (l.flags |= 65536), (t &= -t), (l.lanes |= t);
                var _ = mf(l, s, t);
                wu(l, _);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      $f(n);
    } catch (k) {
      (t = k), ie === n && n !== null && (ie = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function If() {
  var e = vs.current;
  return (vs.current = gs), e === null ? gs : e;
}
function Ea() {
  (le === 0 || le === 3 || le === 2) && (le = 4),
    ae === null || (!(pn & 268435455) && !(Ds & 268435455)) || zt(ae, he);
}
function xs(e, t) {
  var n = H;
  H |= 2;
  var r = If();
  (ae !== e || he !== t) && ((xt = null), on(e, t));
  do
    try {
      Ug();
      break;
    } catch (i) {
      Pf(e, i);
    }
  while (1);
  if ((ra(), (H = n), (vs.current = r), ie !== null)) throw Error(b(261));
  return (ae = null), (he = 0), le;
}
function Ug() {
  for (; ie !== null; ) Rf(ie);
}
function Vg() {
  for (; ie !== null && !pm(); ) Rf(ie);
}
function Rf(e) {
  var t = zf(e.alternate, e, He);
  (e.memoizedProps = e.pendingProps),
    t === null ? $f(e) : (ie = t),
    (ya.current = null);
}
function $f(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = $g(n, t)), n !== null)) {
        (n.flags &= 32767), (ie = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (le = 6), (ie = null);
        return;
      }
    } else if (((n = Pg(n, t, He)), n !== null)) {
      ie = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      ie = t;
      return;
    }
    ie = t = e;
  } while (t !== null);
  le === 0 && (le = 5);
}
function nn(e, t, n) {
  var r = U,
    i = Ge.transition;
  try {
    (Ge.transition = null), (U = 1), Bg(e, t, n, r);
  } finally {
    (Ge.transition = i), (U = r);
  }
  return null;
}
function Bg(e, t, n, r) {
  do qn();
  while (Ht !== null);
  if (H & 6) throw Error(b(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(b(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var s = n.lanes | n.childLanes;
  if (
    (km(e, s),
    e === ae && ((ie = ae = null), (he = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      bi ||
      ((bi = !0),
      Df(ts, function () {
        return qn(), null;
      })),
    (s = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || s)
  ) {
    (s = Ge.transition), (Ge.transition = null);
    var o = U;
    U = 1;
    var l = H;
    (H |= 4),
      (ya.current = null),
      zg(e, n),
      bf(n, e),
      cg(Zo),
      (rs = !!Jo),
      (Zo = Jo = null),
      (e.current = n),
      Dg(n),
      mm(),
      (H = l),
      (U = o),
      (Ge.transition = s);
  } else e.current = n;
  if (
    (bi && ((bi = !1), (Ht = e), (ws = i)),
    (s = e.pendingLanes),
    s === 0 && (Wt = null),
    ym(n.stateNode),
    ze(e, ee()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++) r(t[n]);
  if (ys) throw ((ys = !1), (e = yl), (yl = null), e);
  return (
    ws & 1 && e.tag !== 0 && qn(),
    (s = e.pendingLanes),
    s & 1 ? (e === wl ? zr++ : ((zr = 0), (wl = e))) : (zr = 0),
    Zt(),
    null
  );
}
function qn() {
  if (Ht !== null) {
    var e = pd(ws),
      t = Ge.transition,
      n = U;
    try {
      if (((Ge.transition = null), (U = 16 > e ? 16 : e), Ht === null))
        var r = !1;
      else {
        if (((e = Ht), (Ht = null), (ws = 0), H & 6)) throw Error(b(331));
        var i = H;
        for (H |= 4, R = e.current; R !== null; ) {
          var s = R,
            o = s.child;
          if (R.flags & 16) {
            var l = s.deletions;
            if (l !== null) {
              for (var a = 0; a < l.length; a++) {
                var u = l[a];
                for (R = u; R !== null; ) {
                  var c = R;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      $r(8, c, s);
                  }
                  var p = c.child;
                  if (p !== null) (p.return = c), (R = p);
                  else
                    for (; R !== null; ) {
                      c = R;
                      var d = c.sibling,
                        v = c.return;
                      if ((Tf(c), c === u)) {
                        R = null;
                        break;
                      }
                      if (d !== null) {
                        (d.return = v), (R = d);
                        break;
                      }
                      R = v;
                    }
                }
              }
              var y = s.alternate;
              if (y !== null) {
                var x = y.child;
                if (x !== null) {
                  y.child = null;
                  do {
                    var w = x.sibling;
                    (x.sibling = null), (x = w);
                  } while (x !== null);
                }
              }
              R = s;
            }
          }
          if (s.subtreeFlags & 2064 && o !== null) (o.return = s), (R = o);
          else
            e: for (; R !== null; ) {
              if (((s = R), s.flags & 2048))
                switch (s.tag) {
                  case 0:
                  case 11:
                  case 15:
                    $r(9, s, s.return);
                }
              var h = s.sibling;
              if (h !== null) {
                (h.return = s.return), (R = h);
                break e;
              }
              R = s.return;
            }
        }
        var f = e.current;
        for (R = f; R !== null; ) {
          o = R;
          var g = o.child;
          if (o.subtreeFlags & 2064 && g !== null) (g.return = o), (R = g);
          else
            e: for (o = f; R !== null; ) {
              if (((l = R), l.flags & 2048))
                try {
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      zs(9, l);
                  }
                } catch (k) {
                  J(l, l.return, k);
                }
              if (l === o) {
                R = null;
                break e;
              }
              var _ = l.sibling;
              if (_ !== null) {
                (_.return = l.return), (R = _);
                break e;
              }
              R = l.return;
            }
        }
        if (
          ((H = i), Zt(), pt && typeof pt.onPostCommitFiberRoot == "function")
        )
          try {
            pt.onPostCommitFiberRoot(Ls, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (U = n), (Ge.transition = t);
    }
  }
  return !1;
}
function qu(e, t, n) {
  (t = va(n, t)),
    (t = pf(e, t, 1)),
    jt(e, t),
    (t = Te()),
    (e = Hs(e, 1)),
    e !== null && (ii(e, 1, t), ze(e, t));
}
function J(e, t, n) {
  if (e.tag === 3) qu(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        qu(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Wt === null || !Wt.has(r)))
        ) {
          (e = va(n, e)),
            (e = mf(t, e, 1)),
            jt(t, e),
            (e = Te()),
            (t = Hs(t, 1)),
            t !== null && (ii(t, 1, e), ze(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function jg(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = Te()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ae === e &&
      (he & n) === n &&
      (le === 4 || (le === 3 && (he & 130023424) === he && 500 > ee() - xa)
        ? on(e, 0)
        : (wa |= n)),
    ze(e, t);
}
function Of(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = vi), (vi <<= 1), !(vi & 130023424) && (vi = 4194304))
      : (t = 1));
  var n = Te();
  (e = Hs(e, t)), e !== null && (ii(e, t, n), ze(e, n));
}
function Wg(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Of(e, n);
}
function qg(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(b(314));
  }
  r !== null && r.delete(t), Of(e, n);
}
var zf;
zf = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || $e.current) Re = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Re = !1), Rg(e, t, n);
      Re = !!(e.flags & 131072);
    }
  else (Re = !1), q && t.flags & 1048576 && Bd(t, hs, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      e !== null &&
        ((e.alternate = null), (t.alternate = null), (t.flags |= 2)),
        (e = t.pendingProps);
      var i = Kn(t, xe.current);
      Wn(t, n), (i = ha(null, t, r, e, i, n));
      var s = pa();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Oe(r) ? ((s = !0), as(t)) : (s = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            sa(t),
            (i.updater = $s),
            (t.stateNode = i),
            (i._reactInternals = t),
            ol(t, r, e, n),
            (t = fl(null, t, r, !0, s, n)))
          : ((t.tag = 0), q && s && oa(t), _e(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (e !== null &&
            ((e.alternate = null), (t.alternate = null), (t.flags |= 2)),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = Qg(r)),
          (e = tt(r, e)),
          i)
        ) {
          case 0:
            t = dl(null, t, r, e, n);
            break e;
          case 1:
            t = Iu(null, t, r, e, n);
            break e;
          case 11:
            t = Mu(null, t, r, e, n);
            break e;
          case 14:
            t = Pu(null, t, r, tt(r.type, e), n);
            break e;
        }
        throw Error(b(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : tt(r, i)),
        dl(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : tt(r, i)),
        Iu(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((_f(t), e === null)) throw Error(b(387));
        (r = t.pendingProps),
          (s = t.memoizedState),
          (i = s.element),
          Fd(e, t),
          ds(t, r, null, n);
        var o = t.memoizedState;
        if (((r = o.element), s.isDehydrated))
          if (
            ((s = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions,
            }),
            (t.updateQueue.baseState = s),
            (t.memoizedState = s),
            t.flags & 256)
          ) {
            (i = Error(b(423))), (t = Ru(e, t, r, n, i));
            break e;
          } else if (r !== i) {
            (i = Error(b(424))), (t = Ru(e, t, r, n, i));
            break e;
          } else
            for (
              Ie = Et(t.stateNode.containerInfo.firstChild),
                Fe = t,
                q = !0,
                rt = null,
                n = qd(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Gn(), r === i)) {
            t = Lt(e, t, n);
            break e;
          }
          _e(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Xd(t),
        e === null && al(t),
        (r = t.type),
        (i = t.pendingProps),
        (s = e !== null ? e.memoizedProps : null),
        (o = i.children),
        el(r, i) ? (o = null) : s !== null && el(r, s) && (t.flags |= 32),
        Sf(e, t),
        _e(e, t, o, n),
        t.child
      );
    case 6:
      return e === null && al(t), null;
    case 13:
      return Ef(e, t, n);
    case 4:
      return (
        ua(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Yn(t, null, r, n)) : _e(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : tt(r, i)),
        Mu(e, t, r, i, n)
      );
    case 7:
      return _e(e, t, t.pendingProps, n), t.child;
    case 8:
      return _e(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return _e(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (s = t.memoizedProps),
          (o = i.value),
          V(us, r._currentValue),
          (r._currentValue = o),
          s !== null)
        )
          if (lt(s.value, o)) {
            if (s.children === i.children && !$e.current) {
              t = Lt(e, t, n);
              break e;
            }
          } else
            for (s = t.child, s !== null && (s.return = t); s !== null; ) {
              var l = s.dependencies;
              if (l !== null) {
                o = s.child;
                for (var a = l.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (s.tag === 1) {
                      (a = Nt(-1, n & -n)), (a.tag = 2);
                      var u = s.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var c = u.pending;
                        c === null
                          ? (a.next = a)
                          : ((a.next = c.next), (c.next = a)),
                          (u.pending = a);
                      }
                    }
                    (s.lanes |= n),
                      (a = s.alternate),
                      a !== null && (a.lanes |= n),
                      il(s.return, n, t),
                      (l.lanes |= n);
                    break;
                  }
                  a = a.next;
                }
              } else if (s.tag === 10) o = s.type === t.type ? null : s.child;
              else if (s.tag === 18) {
                if (((o = s.return), o === null)) throw Error(b(341));
                (o.lanes |= n),
                  (l = o.alternate),
                  l !== null && (l.lanes |= n),
                  il(o, n, t),
                  (o = s.sibling);
              } else o = s.child;
              if (o !== null) o.return = s;
              else
                for (o = s; o !== null; ) {
                  if (o === t) {
                    o = null;
                    break;
                  }
                  if (((s = o.sibling), s !== null)) {
                    (s.return = o.return), (o = s);
                    break;
                  }
                  o = o.return;
                }
              s = o;
            }
        _e(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        Wn(t, n),
        (i = Je(i)),
        (r = r(i)),
        (t.flags |= 1),
        _e(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = tt(r, t.pendingProps)),
        (i = tt(r.type, i)),
        Pu(e, t, r, i, n)
      );
    case 15:
      return wf(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : tt(r, i)),
        e !== null &&
          ((e.alternate = null), (t.alternate = null), (t.flags |= 2)),
        (t.tag = 1),
        Oe(r) ? ((e = !0), as(t)) : (e = !1),
        Wn(t, n),
        Vd(t, r, i),
        ol(t, r, i, n),
        fl(null, t, r, !0, e, n)
      );
    case 19:
      return kf(e, t, n);
    case 22:
      return xf(e, t, n);
  }
  throw Error(b(156, t.tag));
};
function Df(e, t) {
  return cd(e, t);
}
function Xg(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Qe(e, t, n, r) {
  return new Xg(e, t, n, r);
}
function ka(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Qg(e) {
  if (typeof e == "function") return ka(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === jl)) return 11;
    if (e === Wl) return 14;
  }
  return 2;
}
function Kt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Qe(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function ji(e, t, n, r, i, s) {
  var o = 2;
  if (((r = e), typeof e == "function")) ka(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else
    e: switch (e) {
      case bn:
        return ln(n.children, i, s, t);
      case Bl:
        (o = 8), (i |= 8);
        break;
      case Po:
        return (
          (e = Qe(12, n, t, i | 2)), (e.elementType = Po), (e.lanes = s), e
        );
      case Io:
        return (e = Qe(13, n, t, i)), (e.elementType = Io), (e.lanes = s), e;
      case Ro:
        return (e = Qe(19, n, t, i)), (e.elementType = Ro), (e.lanes = s), e;
      case Xc:
        return Ss(n, i, s, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Wc:
              o = 10;
              break e;
            case qc:
              o = 9;
              break e;
            case jl:
              o = 11;
              break e;
            case Wl:
              o = 14;
              break e;
            case Pt:
              (o = 16), (r = null);
              break e;
          }
        throw Error(b(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Qe(o, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = s), t
  );
}
function ln(e, t, n, r) {
  return (e = Qe(7, e, r, t)), (e.lanes = n), e;
}
function Ss(e, t, n, r) {
  return (
    (e = Qe(22, e, r, t)),
    (e.elementType = Xc),
    (e.lanes = n),
    (e.stateNode = {}),
    e
  );
}
function _o(e, t, n) {
  return (e = Qe(6, e, null, t)), (e.lanes = n), e;
}
function Eo(e, t, n) {
  return (
    (t = Qe(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Kg(e, t, n, r, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = ro(0)),
    (this.expirationTimes = ro(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = ro(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function Ta(e, t, n, r, i, s, o, l, a) {
  return (
    (e = new Kg(e, t, n, l, a)),
    t === 1 ? ((t = 1), s === !0 && (t |= 8)) : (t = 0),
    (s = Qe(3, null, null, t)),
    (e.current = s),
    (s.stateNode = e),
    (s.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    sa(s),
    e
  );
}
function Gg(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Cn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Hf(e) {
  if (!e) return Qt;
  e = e._reactInternals;
  e: {
    if (wn(e) !== e || e.tag !== 1) throw Error(b(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Oe(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(b(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Oe(n)) return Dd(e, n, t);
  }
  return t;
}
function Ff(e, t, n, r, i, s, o, l, a) {
  return (
    (e = Ta(n, r, !0, e, i, s, o, l, a)),
    (e.context = Hf(null)),
    (n = e.current),
    (r = Te()),
    (i = qt(n)),
    (s = Nt(r, i)),
    (s.callback = t ?? null),
    jt(n, s),
    (e.current.lanes = i),
    ii(e, i, r),
    ze(e, r),
    e
  );
}
function Fs(e, t, n, r) {
  var i = t.current,
    s = Te(),
    o = qt(i);
  return (
    (n = Hf(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Nt(s, o)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    jt(i, t),
    (e = Ye(i, o, s)),
    e !== null && Hi(e, i, o),
    o
  );
}
function _s(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Xu(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Na(e, t) {
  Xu(e, t), (e = e.alternate) && Xu(e, t);
}
function Yg() {
  return null;
}
var Uf =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Ca(e) {
  this._internalRoot = e;
}
Us.prototype.render = Ca.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(b(409));
  Fs(e, t, null, null);
};
Us.prototype.unmount = Ca.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    mn(function () {
      Fs(null, e, null, null);
    }),
      (t[bt] = null);
  }
};
function Us(e) {
  this._internalRoot = e;
}
Us.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = vd();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Ot.length && t !== 0 && t < Ot[n].priority; n++);
    Ot.splice(n, 0, e), n === 0 && wd(e);
  }
};
function ba(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Vs(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Qu() {}
function Jg(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var s = r;
      r = function () {
        var u = _s(o);
        s.call(u);
      };
    }
    var o = Ff(t, r, e, 0, null, !1, !1, "", Qu);
    return (
      (e._reactRootContainer = o),
      (e[bt] = o.current),
      Xr(e.nodeType === 8 ? e.parentNode : e),
      mn(),
      o
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var l = r;
    r = function () {
      var u = _s(a);
      l.call(u);
    };
  }
  var a = Ta(e, 0, !1, null, null, !1, !1, "", Qu);
  return (
    (e._reactRootContainer = a),
    (e[bt] = a.current),
    Xr(e.nodeType === 8 ? e.parentNode : e),
    mn(function () {
      Fs(t, a, n, r);
    }),
    a
  );
}
function Bs(e, t, n, r, i) {
  var s = n._reactRootContainer;
  if (s) {
    var o = s;
    if (typeof i == "function") {
      var l = i;
      i = function () {
        var a = _s(o);
        l.call(a);
      };
    }
    Fs(t, o, e, i);
  } else o = Jg(n, t, e, i, r);
  return _s(o);
}
md = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Tr(t.pendingLanes);
        n !== 0 &&
          (Ql(t, n | 1), ze(t, ee()), !(H & 6) && ((Zn = ee() + 500), Zt()));
      }
      break;
    case 13:
      var r = Te();
      mn(function () {
        return Ye(e, 1, r);
      }),
        Na(e, 1);
  }
};
Kl = function (e) {
  if (e.tag === 13) {
    var t = Te();
    Ye(e, 134217728, t), Na(e, 134217728);
  }
};
gd = function (e) {
  if (e.tag === 13) {
    var t = Te(),
      n = qt(e);
    Ye(e, n, t), Na(e, n);
  }
};
vd = function () {
  return U;
};
yd = function (e, t) {
  var n = U;
  try {
    return (U = e), t();
  } finally {
    U = n;
  }
};
jo = function (e, t, n) {
  switch (t) {
    case "input":
      if ((zo(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Is(r);
            if (!i) throw Error(b(90));
            Kc(r), zo(r, i);
          }
        }
      }
      break;
    case "textarea":
      Yc(e, n);
      break;
    case "select":
      (t = n.value), t != null && Un(e, !!n.multiple, t, !1);
  }
};
id = Sa;
sd = mn;
var Zg = { usingClientEntryPoint: !1, Events: [oi, Pn, Is, nd, rd, Sa] },
  gr = {
    findFiberByHostInstance: rn,
    bundleType: 0,
    version: "18.1.0",
    rendererPackageName: "react-dom",
  },
  e1 = {
    bundleType: gr.bundleType,
    version: gr.version,
    rendererPackageName: gr.rendererPackageName,
    rendererConfig: gr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: At.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = ad(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: gr.findFiberByHostInstance || Yg,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.1.0-next-22edb9f77-20220426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Li = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Li.isDisabled && Li.supportsFiber)
    try {
      (Ls = Li.inject(e1)), (pt = Li);
    } catch {}
}
Ve.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Zg;
Ve.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ba(t)) throw Error(b(200));
  return Gg(e, t, null, n);
};
Ve.createRoot = function (e, t) {
  if (!ba(e)) throw Error(b(299));
  var n = !1,
    r = "",
    i = Uf;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = Ta(e, 1, !1, null, null, n, !1, r, i)),
    (e[bt] = t.current),
    Xr(e.nodeType === 8 ? e.parentNode : e),
    new Ca(t)
  );
};
Ve.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(b(188))
      : ((e = Object.keys(e).join(",")), Error(b(268, e)));
  return (e = ad(t)), (e = e === null ? null : e.stateNode), e;
};
Ve.flushSync = function (e) {
  return mn(e);
};
Ve.hydrate = function (e, t, n) {
  if (!Vs(t)) throw Error(b(200));
  return Bs(null, e, t, !0, n);
};
Ve.hydrateRoot = function (e, t, n) {
  if (!ba(e)) throw Error(b(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    s = "",
    o = Uf;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (s = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    (t = Ff(t, null, e, 1, n ?? null, i, !1, s, o)),
    (e[bt] = t.current),
    Xr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i);
  return new Us(t);
};
Ve.render = function (e, t, n) {
  if (!Vs(t)) throw Error(b(200));
  return Bs(null, e, t, !1, n);
};
Ve.unmountComponentAtNode = function (e) {
  if (!Vs(e)) throw Error(b(40));
  return e._reactRootContainer
    ? (mn(function () {
        Bs(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[bt] = null);
        });
      }),
      !0)
    : !1;
};
Ve.unstable_batchedUpdates = Sa;
Ve.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Vs(n)) throw Error(b(200));
  if (e == null || e._reactInternals === void 0) throw Error(b(38));
  return Bs(e, t, n, !1, r);
};
Ve.version = "18.1.0-next-22edb9f77-20220426";
function Vf() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Vf);
    } catch (e) {
      console.error(e);
    }
}
Vf(), (Fc.exports = Ve);
var Ry = Fc.exports;
const Xn = ({
    children: e,
    title: t = "",
    icon: n,
    disabled: r = !1,
    toggled: i = !1,
    onClick: s = () => {},
    style: o,
  }) => {
    let l = `toolbar-button ${n}`;
    return (
      i && (l += " toggled"),
      A("button", {
        className: l,
        onMouseDown: Ku,
        onClick: s,
        onDoubleClick: Ku,
        title: t,
        disabled: !!r,
        style: o,
        children: [
          n &&
            m("span", {
              className: `codicon codicon-${n}`,
              style: e ? { marginRight: 5 } : {},
            }),
          e,
        ],
      })
    );
  },
  Ku = (e) => {
    e.stopPropagation(), e.preventDefault();
  },
  Wi = Symbol("context"),
  Bf = Symbol("next"),
  jf = Symbol("prev"),
  Gu = Symbol("events");
class $y {
  constructor(t) {
    Z(this, "startTime");
    Z(this, "endTime");
    Z(this, "browserName");
    Z(this, "channel");
    Z(this, "platform");
    Z(this, "wallTime");
    Z(this, "title");
    Z(this, "options");
    Z(this, "pages");
    Z(this, "actions");
    Z(this, "events");
    Z(this, "stdio");
    Z(this, "errors");
    Z(this, "errorDescriptors");
    Z(this, "hasSource");
    Z(this, "hasStepData");
    Z(this, "sdkLanguage");
    Z(this, "testIdAttributeName");
    Z(this, "sources");
    Z(this, "resources");
    t.forEach((r) => t1(r));
    const n = t.find((r) => r.isPrimary);
    (this.browserName = (n == null ? void 0 : n.browserName) || ""),
      (this.sdkLanguage = n == null ? void 0 : n.sdkLanguage),
      (this.channel = n == null ? void 0 : n.channel),
      (this.testIdAttributeName = n == null ? void 0 : n.testIdAttributeName),
      (this.platform = (n == null ? void 0 : n.platform) || ""),
      (this.title = (n == null ? void 0 : n.title) || ""),
      (this.options = (n == null ? void 0 : n.options) || {}),
      (this.wallTime = t
        .map((r) => r.wallTime)
        .reduce(
          (r, i) => Math.min(r || Number.MAX_VALUE, i),
          Number.MAX_VALUE,
        )),
      (this.startTime = t
        .map((r) => r.startTime)
        .reduce((r, i) => Math.min(r, i), Number.MAX_VALUE)),
      (this.endTime = t
        .map((r) => r.endTime)
        .reduce((r, i) => Math.max(r, i), Number.MIN_VALUE)),
      (this.pages = [].concat(...t.map((r) => r.pages))),
      (this.actions = n1(t)),
      (this.events = [].concat(...t.map((r) => r.events))),
      (this.stdio = [].concat(...t.map((r) => r.stdio))),
      (this.errors = [].concat(...t.map((r) => r.errors))),
      (this.hasSource = t.some((r) => r.hasSource)),
      (this.hasStepData = t.some((r) => !r.isPrimary)),
      (this.resources = [...t.map((r) => r.resources)].flat()),
      this.events.sort((r, i) => r.time - i.time),
      this.resources.sort((r, i) => r._monotonicTime - i._monotonicTime),
      (this.errorDescriptors = this.hasStepData
        ? this._errorDescriptorsFromTestRunner()
        : this._errorDescriptorsFromActions()),
      (this.sources = a1(this.actions, this.errorDescriptors));
  }
  failedAction() {
    return this.actions.findLast((t) => t.error);
  }
  _errorDescriptorsFromActions() {
    var n;
    const t = [];
    for (const r of this.actions || [])
      (n = r.error) != null &&
        n.message &&
        t.push({ action: r, stack: r.stack, message: r.error.message });
    return t;
  }
  _errorDescriptorsFromTestRunner() {
    const t = [];
    for (const n of this.errors || [])
      n.message && t.push({ stack: n.stack, message: n.message });
    return t;
  }
}
function t1(e) {
  for (const n of e.pages) n[Wi] = e;
  for (let n = 0; n < e.actions.length; ++n) {
    const r = e.actions[n];
    r[Wi] = e;
  }
  let t;
  for (let n = e.actions.length - 1; n >= 0; n--) {
    const r = e.actions[n];
    (r[Bf] = t), r.apiName.includes("route.") || (t = r);
  }
  for (const n of e.events) n[Wi] = e;
}
function n1(e) {
  const t = new Map();
  let n = 0;
  const r = e.filter((l) => l.isPrimary),
    i = e.filter((l) => !l.isPrimary);
  for (const l of r) {
    for (const a of l.actions)
      t.set(`${a.apiName}@${a.wallTime}`, { ...a, context: l });
    !n &&
      l.actions.length &&
      (n = l.actions[0].startTime - l.actions[0].wallTime);
  }
  const s = new Map();
  for (const l of i)
    for (const a of l.actions) {
      if (n) {
        const p = a.endTime - a.startTime;
        a.startTime && (a.startTime = a.wallTime + n),
          a.endTime && (a.endTime = a.startTime + p);
      }
      const u = `${a.apiName}@${a.wallTime}`,
        c = t.get(u);
      if (c && c.apiName === a.apiName) {
        s.set(a.callId, c.callId),
          a.error && (c.error = a.error),
          a.attachments && (c.attachments = a.attachments),
          a.parentId && (c.parentId = s.get(a.parentId) ?? a.parentId);
        continue;
      }
      a.parentId && (a.parentId = s.get(a.parentId) ?? a.parentId),
        t.set(u, { ...a, context: l });
    }
  const o = [...t.values()];
  o.sort((l, a) =>
    a.parentId === l.callId
      ? -1
      : l.parentId === a.callId
        ? 1
        : l.wallTime - a.wallTime || l.startTime - a.startTime,
  );
  for (let l = 1; l < o.length; ++l) o[l][jf] = o[l - 1];
  return o;
}
function r1(e) {
  const t = new Map();
  for (const r of e)
    t.set(r.callId, { id: r.callId, parent: void 0, children: [], action: r });
  const n = { id: "", parent: void 0, children: [] };
  for (const r of t.values()) {
    const i = (r.action.parentId && t.get(r.action.parentId)) || n;
    i.children.push(r), (r.parent = i);
  }
  return { rootItem: n, itemMap: t };
}
function Oy(e) {
  return `${e.pageId || "none"}:${e.callId}`;
}
function _l(e) {
  return e[Wi];
}
function i1(e) {
  return e[Bf];
}
function s1(e) {
  return e[jf];
}
function o1(e) {
  let t = 0,
    n = 0;
  for (const r of l1(e)) {
    if (r.type === "console") {
      const i = r.messageType;
      i === "warning" ? ++n : i === "error" && ++t;
    }
    r.type === "event" && r.method === "pageError" && ++t;
  }
  return { errors: t, warnings: n };
}
function l1(e) {
  let t = e[Gu];
  if (t) return t;
  const n = i1(e);
  return (
    (t = _l(e).events.filter(
      (r) => r.time >= e.startTime && (!n || r.time < n.startTime),
    )),
    (e[Gu] = t),
    t
  );
}
function a1(e, t) {
  var r;
  const n = new Map();
  for (const i of e)
    for (const s of i.stack || []) {
      let o = n.get(s.file);
      o || ((o = { errors: [], content: void 0 }), n.set(s.file, o));
    }
  for (const i of t) {
    const { action: s, stack: o, message: l } = i;
    !s ||
      !o ||
      (r = n.get(o[0].file)) == null ||
      r.errors.push({ line: o[0].line || 0, message: l });
  }
  return n;
}
const u1 = 50,
  Es = ({
    sidebarSize: e,
    sidebarHidden: t = !1,
    sidebarIsFirst: n = !1,
    orientation: r = "vertical",
    minSidebarSize: i = u1,
    settingName: s,
    children: o,
  }) => {
    const [l, a] = Yi(
        s ? s + "." + r + ":size" : void 0,
        Math.max(i, e) * window.devicePixelRatio,
      ),
      [u, c] = Yi(
        s ? s + "." + r + ":size" : void 0,
        Math.max(i, e) * window.devicePixelRatio,
      ),
      [p, d] = L.useState(null),
      [v, y] = vn();
    let x;
    r === "vertical"
      ? ((x = u / window.devicePixelRatio),
        v && v.height < x && (x = v.height - 10))
      : ((x = l / window.devicePixelRatio),
        v && v.width < x && (x = v.width - 10));
    const w = L.Children.toArray(o);
    document.body.style.userSelect = p ? "none" : "inherit";
    let h = {};
    return (
      r === "vertical"
        ? n
          ? (h = {
              top: p ? 0 : x - 4,
              bottom: p ? 0 : void 0,
              height: p ? "initial" : 8,
            })
          : (h = {
              bottom: p ? 0 : x - 4,
              top: p ? 0 : void 0,
              height: p ? "initial" : 8,
            })
        : n
          ? (h = {
              left: p ? 0 : x - 4,
              right: p ? 0 : void 0,
              width: p ? "initial" : 8,
            })
          : (h = {
              right: p ? 0 : x - 4,
              left: p ? 0 : void 0,
              width: p ? "initial" : 8,
            }),
      A("div", {
        className: "split-view " + r + (n ? " sidebar-first" : ""),
        ref: y,
        children: [
          m("div", { className: "split-view-main", children: w[0] }),
          !t &&
            m("div", {
              style: { flexBasis: x },
              className: "split-view-sidebar",
              children: w[1],
            }),
          !t &&
            m("div", {
              style: h,
              className: "split-view-resizer",
              onMouseDown: (f) =>
                d({
                  offset: r === "vertical" ? f.clientY : f.clientX,
                  size: x,
                }),
              onMouseUp: () => d(null),
              onMouseMove: (f) => {
                if (!f.buttons) d(null);
                else if (p) {
                  const _ =
                      (r === "vertical" ? f.clientY : f.clientX) - p.offset,
                    k = n ? p.size + _ : p.size - _,
                    C = f.target.parentElement.getBoundingClientRect(),
                    E = Math.min(
                      Math.max(i, k),
                      (r === "vertical" ? C.height : C.width) - i,
                    );
                  r === "vertical"
                    ? c(E * window.devicePixelRatio)
                    : a(E * window.devicePixelRatio);
                }
              },
            }),
        ],
      })
    );
  };
function js(e, t = "'") {
  const n = JSON.stringify(e),
    r = n.substring(1, n.length - 1).replace(/\\"/g, '"');
  if (t === "'") return t + r.replace(/[']/g, "\\'") + t;
  if (t === '"') return t + r.replace(/["]/g, '\\"') + t;
  if (t === "`") return t + r.replace(/[`]/g, "`") + t;
  throw new Error("Invalid escape char");
}
function ks(e) {
  return e.charAt(0).toUpperCase() + e.substring(1);
}
function Wf(e) {
  return e
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
    .toLowerCase();
}
function Xe(e) {
  let t = "";
  for (let n = 0; n < e.length; n++) t += c1(e, n);
  return t;
}
function vr(e) {
  return `"${Xe(e).replace(/\\ /g, " ")}"`;
}
function c1(e, t) {
  const n = e.charCodeAt(t);
  return n === 0
    ? "�"
    : (n >= 1 && n <= 31) ||
        (n >= 48 && n <= 57 && (t === 0 || (t === 1 && e.charCodeAt(0) === 45)))
      ? "\\" + n.toString(16) + " "
      : t === 0 && n === 45 && e.length === 1
        ? "\\" + e.charAt(t)
        : n >= 128 ||
            n === 45 ||
            n === 95 ||
            (n >= 48 && n <= 57) ||
            (n >= 65 && n <= 90) ||
            (n >= 97 && n <= 122)
          ? e.charAt(t)
          : "\\" + e.charAt(t);
}
function ce(e) {
  return e
    .replace(/\u200b/g, "")
    .trim()
    .replace(/\s+/g, " ");
}
function Ws(e) {
  return e.replace(/(^|[^\\])(\\\\)*\\(['"`])/g, "$1$2$3");
}
function qf(e) {
  return e.unicode || e.unicodeSets
    ? String(e)
    : String(e)
        .replace(/(^|[^\\])(\\\\)*(["'`])/g, "$1$2\\$3")
        .replace(/>>/g, "\\>\\>");
}
function ot(e, t) {
  return typeof e != "string" ? qf(e) : `${JSON.stringify(e)}${t ? "s" : "i"}`;
}
function Ee(e, t) {
  return typeof e != "string"
    ? qf(e)
    : `"${e.replace(/\\/g, "\\\\").replace(/["]/g, '\\"')}"${t ? "s" : "i"}`;
}
function d1(e, t, n = "") {
  if (e.length <= t) return e;
  const r = [...e];
  return r.length > t ? r.slice(0, t - n.length).join("") + n : r.join("");
}
function Yu(e, t) {
  return d1(e, t, "…");
}
const re = function (e, t, n) {
  return e >= t && e <= n;
};
function Ae(e) {
  return re(e, 48, 57);
}
function Ju(e) {
  return Ae(e) || re(e, 65, 70) || re(e, 97, 102);
}
function f1(e) {
  return re(e, 65, 90);
}
function h1(e) {
  return re(e, 97, 122);
}
function p1(e) {
  return f1(e) || h1(e);
}
function m1(e) {
  return e >= 128;
}
function qi(e) {
  return p1(e) || m1(e) || e === 95;
}
function Zu(e) {
  return qi(e) || Ae(e) || e === 45;
}
function g1(e) {
  return re(e, 0, 8) || e === 11 || re(e, 14, 31) || e === 127;
}
function Xi(e) {
  return e === 10;
}
function yt(e) {
  return Xi(e) || e === 9 || e === 32;
}
const v1 = 1114111;
class La extends Error {
  constructor(t) {
    super(t), (this.name = "InvalidCharacterError");
  }
}
function y1(e) {
  const t = [];
  for (let n = 0; n < e.length; n++) {
    let r = e.charCodeAt(n);
    if (
      (r === 13 && e.charCodeAt(n + 1) === 10 && ((r = 10), n++),
      (r === 13 || r === 12) && (r = 10),
      r === 0 && (r = 65533),
      re(r, 55296, 56319) && re(e.charCodeAt(n + 1), 56320, 57343))
    ) {
      const i = r - 55296,
        s = e.charCodeAt(n + 1) - 56320;
      (r = Math.pow(2, 16) + i * Math.pow(2, 10) + s), n++;
    }
    t.push(r);
  }
  return t;
}
function se(e) {
  if (e <= 65535) return String.fromCharCode(e);
  e -= Math.pow(2, 16);
  const t = Math.floor(e / Math.pow(2, 10)) + 55296,
    n = (e % Math.pow(2, 10)) + 56320;
  return String.fromCharCode(t) + String.fromCharCode(n);
}
function w1(e) {
  const t = y1(e);
  let n = -1;
  const r = [];
  let i;
  const s = function (T) {
      return T >= t.length ? -1 : t[T];
    },
    o = function (T) {
      if ((T === void 0 && (T = 1), T > 3))
        throw "Spec Error: no more than three codepoints of lookahead.";
      return s(n + T);
    },
    l = function (T) {
      return T === void 0 && (T = 1), (n += T), (i = s(n)), !0;
    },
    a = function () {
      return (n -= 1), !0;
    },
    u = function (T) {
      return T === void 0 && (T = i), T === -1;
    },
    c = function () {
      if ((p(), l(), yt(i))) {
        for (; yt(o()); ) l();
        return new El();
      } else {
        if (i === 34) return y();
        if (i === 35)
          if (Zu(o()) || h(o(1), o(2))) {
            const T = new lh("");
            return g(o(1), o(2), o(3)) && (T.type = "id"), (T.value = C()), T;
          } else return new ve(i);
        else
          return i === 36
            ? o() === 61
              ? (l(), new E1())
              : new ve(i)
            : i === 39
              ? y()
              : i === 40
                ? new nh()
                : i === 41
                  ? new rh()
                  : i === 42
                    ? o() === 61
                      ? (l(), new k1())
                      : new ve(i)
                    : i === 43
                      ? N()
                        ? (a(), d())
                        : new ve(i)
                      : i === 44
                        ? new Jf()
                        : i === 45
                          ? N()
                            ? (a(), d())
                            : o(1) === 45 && o(2) === 62
                              ? (l(2), new Kf())
                              : _()
                                ? (a(), v())
                                : new ve(i)
                          : i === 46
                            ? N()
                              ? (a(), d())
                              : new ve(i)
                            : i === 58
                              ? new Gf()
                              : i === 59
                                ? new Yf()
                                : i === 60
                                  ? o(1) === 33 && o(2) === 45 && o(3) === 45
                                    ? (l(3), new Qf())
                                    : new ve(i)
                                  : i === 64
                                    ? g(o(1), o(2), o(3))
                                      ? new oh(C())
                                      : new ve(i)
                                    : i === 91
                                      ? new th()
                                      : i === 92
                                        ? f()
                                          ? (a(), v())
                                          : new ve(i)
                                        : i === 93
                                          ? new kl()
                                          : i === 94
                                            ? o() === 61
                                              ? (l(), new _1())
                                              : new ve(i)
                                            : i === 123
                                              ? new Zf()
                                              : i === 124
                                                ? o() === 61
                                                  ? (l(), new S1())
                                                  : o() === 124
                                                    ? (l(), new ih())
                                                    : new ve(i)
                                                : i === 125
                                                  ? new eh()
                                                  : i === 126
                                                    ? o() === 61
                                                      ? (l(), new x1())
                                                      : new ve(i)
                                                    : Ae(i)
                                                      ? (a(), d())
                                                      : qi(i)
                                                        ? (a(), v())
                                                        : u()
                                                          ? new Ki()
                                                          : new ve(i);
      }
    },
    p = function () {
      for (; o(1) === 47 && o(2) === 42; )
        for (l(2); ; )
          if ((l(), i === 42 && o() === 47)) {
            l();
            break;
          } else if (u()) return;
    },
    d = function () {
      const T = E();
      if (g(o(1), o(2), o(3))) {
        const P = new T1();
        return (
          (P.value = T.value),
          (P.repr = T.repr),
          (P.type = T.type),
          (P.unit = C()),
          P
        );
      } else if (o() === 37) {
        l();
        const P = new dh();
        return (P.value = T.value), (P.repr = T.repr), P;
      } else {
        const P = new ch();
        return (P.value = T.value), (P.repr = T.repr), (P.type = T.type), P;
      }
    },
    v = function () {
      const T = C();
      if (T.toLowerCase() === "url" && o() === 40) {
        for (l(); yt(o(1)) && yt(o(2)); ) l();
        return o() === 34 || o() === 39
          ? new Gi(T)
          : yt(o()) && (o(2) === 34 || o(2) === 39)
            ? new Gi(T)
            : x();
      } else return o() === 40 ? (l(), new Gi(T)) : new sh(T);
    },
    y = function (T) {
      T === void 0 && (T = i);
      let P = "";
      for (; l(); ) {
        if (i === T || u()) return new ah(P);
        if (Xi(i)) return a(), new Xf();
        i === 92 ? u(o()) || (Xi(o()) ? l() : (P += se(w()))) : (P += se(i));
      }
      throw new Error("Internal error");
    },
    x = function () {
      const T = new uh("");
      for (; yt(o()); ) l();
      if (u(o())) return T;
      for (; l(); ) {
        if (i === 41 || u()) return T;
        if (yt(i)) {
          for (; yt(o()); ) l();
          return o() === 41 || u(o()) ? (l(), T) : (M(), new Qi());
        } else {
          if (i === 34 || i === 39 || i === 40 || g1(i)) return M(), new Qi();
          if (i === 92)
            if (f()) T.value += se(w());
            else return M(), new Qi();
          else T.value += se(i);
        }
      }
      throw new Error("Internal error");
    },
    w = function () {
      if ((l(), Ju(i))) {
        const T = [i];
        for (let F = 0; F < 5 && Ju(o()); F++) l(), T.push(i);
        yt(o()) && l();
        let P = parseInt(
          T.map(function (F) {
            return String.fromCharCode(F);
          }).join(""),
          16,
        );
        return P > v1 && (P = 65533), P;
      } else return u() ? 65533 : i;
    },
    h = function (T, P) {
      return !(T !== 92 || Xi(P));
    },
    f = function () {
      return h(i, o());
    },
    g = function (T, P, F) {
      return T === 45
        ? qi(P) || P === 45 || h(P, F)
        : qi(T)
          ? !0
          : T === 92
            ? h(T, P)
            : !1;
    },
    _ = function () {
      return g(i, o(1), o(2));
    },
    k = function (T, P, F) {
      return T === 43 || T === 45
        ? !!(Ae(P) || (P === 46 && Ae(F)))
        : T === 46
          ? !!Ae(P)
          : !!Ae(T);
    },
    N = function () {
      return k(i, o(1), o(2));
    },
    C = function () {
      let T = "";
      for (; l(); )
        if (Zu(i)) T += se(i);
        else if (f()) T += se(w());
        else return a(), T;
      throw new Error("Internal parse error");
    },
    E = function () {
      let T = "",
        P = "integer";
      for ((o() === 43 || o() === 45) && (l(), (T += se(i))); Ae(o()); )
        l(), (T += se(i));
      if (o(1) === 46 && Ae(o(2)))
        for (l(), T += se(i), l(), T += se(i), P = "number"; Ae(o()); )
          l(), (T += se(i));
      const F = o(1),
        je = o(2),
        be = o(3);
      if ((F === 69 || F === 101) && Ae(je))
        for (l(), T += se(i), l(), T += se(i), P = "number"; Ae(o()); )
          l(), (T += se(i));
      else if ((F === 69 || F === 101) && (je === 43 || je === 45) && Ae(be))
        for (
          l(), T += se(i), l(), T += se(i), l(), T += se(i), P = "number";
          Ae(o());

        )
          l(), (T += se(i));
      const Le = S(T);
      return { type: P, value: Le, repr: T };
    },
    S = function (T) {
      return +T;
    },
    M = function () {
      for (; l(); ) {
        if (i === 41 || u()) return;
        f() && w();
      }
    };
  let $ = 0;
  for (; !u(o()); )
    if ((r.push(c()), $++, $ > t.length * 2))
      throw new Error("I'm infinite-looping!");
  return r;
}
class te {
  constructor() {
    this.tokenType = "";
  }
  toJSON() {
    return { token: this.tokenType };
  }
  toString() {
    return this.tokenType;
  }
  toSource() {
    return "" + this;
  }
}
class Xf extends te {
  constructor() {
    super(...arguments), (this.tokenType = "BADSTRING");
  }
}
class Qi extends te {
  constructor() {
    super(...arguments), (this.tokenType = "BADURL");
  }
}
class El extends te {
  constructor() {
    super(...arguments), (this.tokenType = "WHITESPACE");
  }
  toString() {
    return "WS";
  }
  toSource() {
    return " ";
  }
}
class Qf extends te {
  constructor() {
    super(...arguments), (this.tokenType = "CDO");
  }
  toSource() {
    return "<!--";
  }
}
class Kf extends te {
  constructor() {
    super(...arguments), (this.tokenType = "CDC");
  }
  toSource() {
    return "-->";
  }
}
class Gf extends te {
  constructor() {
    super(...arguments), (this.tokenType = ":");
  }
}
class Yf extends te {
  constructor() {
    super(...arguments), (this.tokenType = ";");
  }
}
class Jf extends te {
  constructor() {
    super(...arguments), (this.tokenType = ",");
  }
}
class rr extends te {
  constructor() {
    super(...arguments), (this.value = ""), (this.mirror = "");
  }
}
class Zf extends rr {
  constructor() {
    super(), (this.tokenType = "{"), (this.value = "{"), (this.mirror = "}");
  }
}
class eh extends rr {
  constructor() {
    super(), (this.tokenType = "}"), (this.value = "}"), (this.mirror = "{");
  }
}
class th extends rr {
  constructor() {
    super(), (this.tokenType = "["), (this.value = "["), (this.mirror = "]");
  }
}
class kl extends rr {
  constructor() {
    super(), (this.tokenType = "]"), (this.value = "]"), (this.mirror = "[");
  }
}
class nh extends rr {
  constructor() {
    super(), (this.tokenType = "("), (this.value = "("), (this.mirror = ")");
  }
}
class rh extends rr {
  constructor() {
    super(), (this.tokenType = ")"), (this.value = ")"), (this.mirror = "(");
  }
}
class x1 extends te {
  constructor() {
    super(...arguments), (this.tokenType = "~=");
  }
}
class S1 extends te {
  constructor() {
    super(...arguments), (this.tokenType = "|=");
  }
}
class _1 extends te {
  constructor() {
    super(...arguments), (this.tokenType = "^=");
  }
}
class E1 extends te {
  constructor() {
    super(...arguments), (this.tokenType = "$=");
  }
}
class k1 extends te {
  constructor() {
    super(...arguments), (this.tokenType = "*=");
  }
}
class ih extends te {
  constructor() {
    super(...arguments), (this.tokenType = "||");
  }
}
class Ki extends te {
  constructor() {
    super(...arguments), (this.tokenType = "EOF");
  }
  toSource() {
    return "";
  }
}
class ve extends te {
  constructor(t) {
    super(),
      (this.tokenType = "DELIM"),
      (this.value = ""),
      (this.value = se(t));
  }
  toString() {
    return "DELIM(" + this.value + ")";
  }
  toJSON() {
    const t =
      this.constructor.prototype.constructor.prototype.toJSON.call(this);
    return (t.value = this.value), t;
  }
  toSource() {
    return this.value === "\\"
      ? `\\
`
      : this.value;
  }
}
class ir extends te {
  constructor() {
    super(...arguments), (this.value = "");
  }
  ASCIIMatch(t) {
    return this.value.toLowerCase() === t.toLowerCase();
  }
  toJSON() {
    const t =
      this.constructor.prototype.constructor.prototype.toJSON.call(this);
    return (t.value = this.value), t;
  }
}
class sh extends ir {
  constructor(t) {
    super(), (this.tokenType = "IDENT"), (this.value = t);
  }
  toString() {
    return "IDENT(" + this.value + ")";
  }
  toSource() {
    return ai(this.value);
  }
}
class Gi extends ir {
  constructor(t) {
    super(),
      (this.tokenType = "FUNCTION"),
      (this.value = t),
      (this.mirror = ")");
  }
  toString() {
    return "FUNCTION(" + this.value + ")";
  }
  toSource() {
    return ai(this.value) + "(";
  }
}
class oh extends ir {
  constructor(t) {
    super(), (this.tokenType = "AT-KEYWORD"), (this.value = t);
  }
  toString() {
    return "AT(" + this.value + ")";
  }
  toSource() {
    return "@" + ai(this.value);
  }
}
class lh extends ir {
  constructor(t) {
    super(),
      (this.tokenType = "HASH"),
      (this.value = t),
      (this.type = "unrestricted");
  }
  toString() {
    return "HASH(" + this.value + ")";
  }
  toJSON() {
    const t =
      this.constructor.prototype.constructor.prototype.toJSON.call(this);
    return (t.value = this.value), (t.type = this.type), t;
  }
  toSource() {
    return this.type === "id" ? "#" + ai(this.value) : "#" + N1(this.value);
  }
}
class ah extends ir {
  constructor(t) {
    super(), (this.tokenType = "STRING"), (this.value = t);
  }
  toString() {
    return '"' + fh(this.value) + '"';
  }
}
class uh extends ir {
  constructor(t) {
    super(), (this.tokenType = "URL"), (this.value = t);
  }
  toString() {
    return "URL(" + this.value + ")";
  }
  toSource() {
    return 'url("' + fh(this.value) + '")';
  }
}
class ch extends te {
  constructor() {
    super(),
      (this.tokenType = "NUMBER"),
      (this.type = "integer"),
      (this.repr = "");
  }
  toString() {
    return this.type === "integer"
      ? "INT(" + this.value + ")"
      : "NUMBER(" + this.value + ")";
  }
  toJSON() {
    const t = super.toJSON();
    return (
      (t.value = this.value), (t.type = this.type), (t.repr = this.repr), t
    );
  }
  toSource() {
    return this.repr;
  }
}
class dh extends te {
  constructor() {
    super(), (this.tokenType = "PERCENTAGE"), (this.repr = "");
  }
  toString() {
    return "PERCENTAGE(" + this.value + ")";
  }
  toJSON() {
    const t =
      this.constructor.prototype.constructor.prototype.toJSON.call(this);
    return (t.value = this.value), (t.repr = this.repr), t;
  }
  toSource() {
    return this.repr + "%";
  }
}
class T1 extends te {
  constructor() {
    super(),
      (this.tokenType = "DIMENSION"),
      (this.type = "integer"),
      (this.repr = ""),
      (this.unit = "");
  }
  toString() {
    return "DIM(" + this.value + "," + this.unit + ")";
  }
  toJSON() {
    const t =
      this.constructor.prototype.constructor.prototype.toJSON.call(this);
    return (
      (t.value = this.value),
      (t.type = this.type),
      (t.repr = this.repr),
      (t.unit = this.unit),
      t
    );
  }
  toSource() {
    const t = this.repr;
    let n = ai(this.unit);
    return (
      n[0].toLowerCase() === "e" &&
        (n[1] === "-" || re(n.charCodeAt(1), 48, 57)) &&
        (n = "\\65 " + n.slice(1, n.length)),
      t + n
    );
  }
}
function ai(e) {
  e = "" + e;
  let t = "";
  const n = e.charCodeAt(0);
  for (let r = 0; r < e.length; r++) {
    const i = e.charCodeAt(r);
    if (i === 0) throw new La("Invalid character: the input contains U+0000.");
    re(i, 1, 31) ||
    i === 127 ||
    (r === 0 && re(i, 48, 57)) ||
    (r === 1 && re(i, 48, 57) && n === 45)
      ? (t += "\\" + i.toString(16) + " ")
      : i >= 128 ||
          i === 45 ||
          i === 95 ||
          re(i, 48, 57) ||
          re(i, 65, 90) ||
          re(i, 97, 122)
        ? (t += e[r])
        : (t += "\\" + e[r]);
  }
  return t;
}
function N1(e) {
  e = "" + e;
  let t = "";
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    if (r === 0) throw new La("Invalid character: the input contains U+0000.");
    r >= 128 ||
    r === 45 ||
    r === 95 ||
    re(r, 48, 57) ||
    re(r, 65, 90) ||
    re(r, 97, 122)
      ? (t += e[n])
      : (t += "\\" + r.toString(16) + " ");
  }
  return t;
}
function fh(e) {
  e = "" + e;
  let t = "";
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    if (r === 0) throw new La("Invalid character: the input contains U+0000.");
    re(r, 1, 31) || r === 127
      ? (t += "\\" + r.toString(16) + " ")
      : r === 34 || r === 92
        ? (t += "\\" + e[n])
        : (t += e[n]);
  }
  return t;
}
class Pe extends Error {}
function C1(e, t) {
  let n;
  try {
    (n = w1(e)), n[n.length - 1] instanceof Ki || n.push(new Ki());
  } catch (S) {
    const M = S.message + ` while parsing selector "${e}"`,
      $ = (S.stack || "").indexOf(S.message);
    throw (
      ($ !== -1 &&
        (S.stack =
          S.stack.substring(0, $) +
          M +
          S.stack.substring($ + S.message.length)),
      (S.message = M),
      S)
    );
  }
  const r = n.find(
    (S) =>
      S instanceof oh ||
      S instanceof Xf ||
      S instanceof Qi ||
      S instanceof ih ||
      S instanceof Qf ||
      S instanceof Kf ||
      S instanceof Yf ||
      S instanceof Zf ||
      S instanceof eh ||
      S instanceof uh ||
      S instanceof dh,
  );
  if (r)
    throw new Pe(
      `Unsupported token "${r.toSource()}" while parsing selector "${e}"`,
    );
  let i = 0;
  const s = new Set();
  function o() {
    return new Pe(
      `Unexpected token "${n[i].toSource()}" while parsing selector "${e}"`,
    );
  }
  function l() {
    for (; n[i] instanceof El; ) i++;
  }
  function a(S = i) {
    return n[S] instanceof sh;
  }
  function u(S = i) {
    return n[S] instanceof ah;
  }
  function c(S = i) {
    return n[S] instanceof ch;
  }
  function p(S = i) {
    return n[S] instanceof Jf;
  }
  function d(S = i) {
    return n[S] instanceof nh;
  }
  function v(S = i) {
    return n[S] instanceof rh;
  }
  function y(S = i) {
    return n[S] instanceof Gi;
  }
  function x(S = i) {
    return n[S] instanceof ve && n[S].value === "*";
  }
  function w(S = i) {
    return n[S] instanceof Ki;
  }
  function h(S = i) {
    return n[S] instanceof ve && [">", "+", "~"].includes(n[S].value);
  }
  function f(S = i) {
    return p(S) || v(S) || w(S) || h(S) || n[S] instanceof El;
  }
  function g() {
    const S = [_()];
    for (; l(), !!p(); ) i++, S.push(_());
    return S;
  }
  function _() {
    return l(), c() || u() ? n[i++].value : k();
  }
  function k() {
    const S = { simples: [] };
    for (
      l(),
        h()
          ? S.simples.push({
              selector: { functions: [{ name: "scope", args: [] }] },
              combinator: "",
            })
          : S.simples.push({ selector: N(), combinator: "" });
      ;

    ) {
      if ((l(), h()))
        (S.simples[S.simples.length - 1].combinator = n[i++].value), l();
      else if (f()) break;
      S.simples.push({ combinator: "", selector: N() });
    }
    return S;
  }
  function N() {
    let S = "";
    const M = [];
    for (; !f(); )
      if (a() || x()) S += n[i++].toSource();
      else if (n[i] instanceof lh) S += n[i++].toSource();
      else if (n[i] instanceof ve && n[i].value === ".")
        if ((i++, a())) S += "." + n[i++].toSource();
        else throw o();
      else if (n[i] instanceof Gf)
        if ((i++, a()))
          if (!t.has(n[i].value.toLowerCase())) S += ":" + n[i++].toSource();
          else {
            const $ = n[i++].value.toLowerCase();
            M.push({ name: $, args: [] }), s.add($);
          }
        else if (y()) {
          const $ = n[i++].value.toLowerCase();
          if (
            (t.has($)
              ? (M.push({ name: $, args: g() }), s.add($))
              : (S += `:${$}(${C()})`),
            l(),
            !v())
          )
            throw o();
          i++;
        } else throw o();
      else if (n[i] instanceof th) {
        for (S += "[", i++; !(n[i] instanceof kl) && !w(); )
          S += n[i++].toSource();
        if (!(n[i] instanceof kl)) throw o();
        (S += "]"), i++;
      } else throw o();
    if (!S && !M.length) throw o();
    return { css: S || void 0, functions: M };
  }
  function C() {
    let S = "",
      M = 1;
    for (; !w() && ((d() || y()) && M++, v() && M--, !!M); )
      S += n[i++].toSource();
    return S;
  }
  const E = g();
  if (!w()) throw o();
  if (E.some((S) => typeof S != "object" || !("simples" in S)))
    throw new Pe(`Error while parsing selector "${e}"`);
  return { selector: E, names: Array.from(s) };
}
const Tl = new Set([
    "internal:has",
    "internal:has-not",
    "internal:and",
    "internal:or",
    "internal:chain",
    "left-of",
    "right-of",
    "above",
    "below",
    "near",
  ]),
  b1 = new Set(["left-of", "right-of", "above", "below", "near"]),
  hh = new Set([
    "not",
    "is",
    "where",
    "has",
    "scope",
    "light",
    "visible",
    "text",
    "text-matches",
    "text-is",
    "has-text",
    "above",
    "below",
    "right-of",
    "left-of",
    "near",
    "nth-match",
  ]);
function qs(e) {
  const t = M1(e),
    n = [];
  for (const r of t.parts) {
    if (r.name === "css" || r.name === "css:light") {
      r.name === "css:light" && (r.body = ":light(" + r.body + ")");
      const i = C1(r.body, hh);
      n.push({ name: "css", body: i.selector, source: r.body });
      continue;
    }
    if (Tl.has(r.name)) {
      let i, s;
      try {
        const u = JSON.parse("[" + r.body + "]");
        if (
          !Array.isArray(u) ||
          u.length < 1 ||
          u.length > 2 ||
          typeof u[0] != "string"
        )
          throw new Pe(`Malformed selector: ${r.name}=` + r.body);
        if (((i = u[0]), u.length === 2)) {
          if (typeof u[1] != "number" || !b1.has(r.name))
            throw new Pe(`Malformed selector: ${r.name}=` + r.body);
          s = u[1];
        }
      } catch {
        throw new Pe(`Malformed selector: ${r.name}=` + r.body);
      }
      const o = {
          name: r.name,
          source: r.body,
          body: { parsed: qs(i), distance: s },
        },
        l = [...o.body.parsed.parts]
          .reverse()
          .find(
            (u) => u.name === "internal:control" && u.body === "enter-frame",
          ),
        a = l ? o.body.parsed.parts.indexOf(l) : -1;
      a !== -1 &&
        L1(o.body.parsed.parts.slice(0, a + 1), n.slice(0, a + 1)) &&
        o.body.parsed.parts.splice(0, a + 1),
        n.push(o);
      continue;
    }
    n.push({ ...r, source: r.body });
  }
  if (Tl.has(n[0].name))
    throw new Pe(`"${n[0].name}" selector cannot be first`);
  return { capture: t.capture, parts: n };
}
function L1(e, t) {
  return gn({ parts: e }) === gn({ parts: t });
}
function gn(e, t) {
  return typeof e == "string"
    ? e
    : e.parts
        .map((n, r) => {
          let i = !0;
          !t &&
            r !== e.capture &&
            (n.name === "css" ||
              (n.name === "xpath" && n.source.startsWith("//")) ||
              n.source.startsWith("..")) &&
            (i = !1);
          const s = i ? n.name + "=" : "";
          return `${r === e.capture ? "*" : ""}${s}${n.source}`;
        })
        .join(" >> ");
}
function A1(e, t) {
  const n = (r, i) => {
    for (const s of r.parts) t(s, i), Tl.has(s.name) && n(s.body.parsed, !0);
  };
  n(e, !1);
}
function M1(e) {
  let t = 0,
    n,
    r = 0;
  const i = { parts: [] },
    s = () => {
      const l = e.substring(r, t).trim(),
        a = l.indexOf("=");
      let u, c;
      a !== -1 &&
      l
        .substring(0, a)
        .trim()
        .match(/^[a-zA-Z_0-9-+:*]+$/)
        ? ((u = l.substring(0, a).trim()), (c = l.substring(a + 1)))
        : (l.length > 1 && l[0] === '"' && l[l.length - 1] === '"') ||
            (l.length > 1 && l[0] === "'" && l[l.length - 1] === "'")
          ? ((u = "text"), (c = l))
          : /^\(*\/\//.test(l) || l.startsWith("..")
            ? ((u = "xpath"), (c = l))
            : ((u = "css"), (c = l));
      let p = !1;
      if (
        (u[0] === "*" && ((p = !0), (u = u.substring(1))),
        i.parts.push({ name: u, body: c }),
        p)
      ) {
        if (i.capture !== void 0)
          throw new Pe(
            "Only one of the selectors can capture using * modifier",
          );
        i.capture = i.parts.length - 1;
      }
    };
  if (!e.includes(">>")) return (t = e.length), s(), i;
  const o = () => {
    const a = e.substring(r, t).match(/^\s*text\s*=(.*)$/);
    return !!a && !!a[1];
  };
  for (; t < e.length; ) {
    const l = e[t];
    l === "\\" && t + 1 < e.length
      ? (t += 2)
      : l === n
        ? ((n = void 0), t++)
        : !n && (l === '"' || l === "'" || l === "`") && !o()
          ? ((n = l), t++)
          : !n && l === ">" && e[t + 1] === ">"
            ? (s(), (t += 2), (r = t))
            : t++;
  }
  return s(), i;
}
function an(e, t) {
  let n = 0,
    r = e.length === 0;
  const i = () => e[n] || "",
    s = () => {
      const w = i();
      return ++n, (r = n >= e.length), w;
    },
    o = (w) => {
      throw r
        ? new Pe(`Unexpected end of selector while parsing selector \`${e}\``)
        : new Pe(
            `Error while parsing selector \`${e}\` - unexpected symbol "${i()}" at position ${n}` +
              (w ? " during " + w : ""),
          );
    };
  function l() {
    for (; !r && /\s/.test(i()); ) s();
  }
  function a(w) {
    return (
      w >= "" ||
      (w >= "0" && w <= "9") ||
      (w >= "A" && w <= "Z") ||
      (w >= "a" && w <= "z") ||
      (w >= "0" && w <= "9") ||
      w === "_" ||
      w === "-"
    );
  }
  function u() {
    let w = "";
    for (l(); !r && a(i()); ) w += s();
    return w;
  }
  function c(w) {
    let h = s();
    for (h !== w && o("parsing quoted string"); !r && i() !== w; )
      i() === "\\" && s(), (h += s());
    return i() !== w && o("parsing quoted string"), (h += s()), h;
  }
  function p() {
    s() !== "/" && o("parsing regular expression");
    let w = "",
      h = !1;
    for (; !r; ) {
      if (i() === "\\") (w += s()), r && o("parsing regular expression");
      else if (h && i() === "]") h = !1;
      else if (!h && i() === "[") h = !0;
      else if (!h && i() === "/") break;
      w += s();
    }
    s() !== "/" && o("parsing regular expression");
    let f = "";
    for (; !r && i().match(/[dgimsuy]/); ) f += s();
    try {
      return new RegExp(w, f);
    } catch (g) {
      throw new Pe(`Error while parsing selector \`${e}\`: ${g.message}`);
    }
  }
  function d() {
    let w = "";
    return (
      l(),
      i() === "'" || i() === '"' ? (w = c(i()).slice(1, -1)) : (w = u()),
      w || o("parsing property path"),
      w
    );
  }
  function v() {
    l();
    let w = "";
    return (
      r || (w += s()),
      !r && w !== "=" && (w += s()),
      ["=", "*=", "^=", "$=", "|=", "~="].includes(w) || o("parsing operator"),
      w
    );
  }
  function y() {
    s();
    const w = [];
    for (w.push(d()), l(); i() === "."; ) s(), w.push(d()), l();
    if (i() === "]")
      return (
        s(),
        {
          name: w.join("."),
          jsonPath: w,
          op: "<truthy>",
          value: null,
          caseSensitive: !1,
        }
      );
    const h = v();
    let f,
      g = !0;
    if ((l(), i() === "/")) {
      if (h !== "=")
        throw new Pe(
          `Error while parsing selector \`${e}\` - cannot use ${h} in attribute with regular expression`,
        );
      f = p();
    } else if (i() === "'" || i() === '"')
      (f = c(i()).slice(1, -1)),
        l(),
        i() === "i" || i() === "I"
          ? ((g = !1), s())
          : (i() === "s" || i() === "S") && ((g = !0), s());
    else {
      for (f = ""; !r && (a(i()) || i() === "+" || i() === "."); ) f += s();
      f === "true"
        ? (f = !0)
        : f === "false"
          ? (f = !1)
          : t || ((f = +f), Number.isNaN(f) && o("parsing attribute value"));
    }
    if (
      (l(),
      i() !== "]" && o("parsing attribute value"),
      s(),
      h !== "=" && typeof f != "string")
    )
      throw new Pe(
        `Error while parsing selector \`${e}\` - cannot use ${h} in attribute with non-string matching value - ${f}`,
      );
    return {
      name: w.join("."),
      jsonPath: w,
      op: h,
      value: f,
      caseSensitive: g,
    };
  }
  const x = { name: "", attributes: [] };
  for (x.name = u(), l(); i() === "["; ) x.attributes.push(y()), l();
  if ((r || o(void 0), !x.name && !x.attributes.length))
    throw new Pe(
      `Error while parsing selector \`${e}\` - selector cannot be empty`,
    );
  return x;
}
function Gt(e, t, n = !1) {
  return ph(e, t, n)[0];
}
function ph(e, t, n = !1, r = 20, i) {
  try {
    return Tn(new D1[e](i), qs(t), n, r);
  } catch {
    return [t];
  }
}
function Tn(e, t, n = !1, r = 20) {
  const i = [...t.parts];
  for (let l = 0; l < i.length - 1; l++)
    if (
      i[l].name === "nth" &&
      i[l + 1].name === "internal:control" &&
      i[l + 1].body === "enter-frame"
    ) {
      const [a] = i.splice(l, 1);
      i.splice(l + 1, 0, a);
    }
  const s = [];
  let o = n ? "frame-locator" : "page";
  for (let l = 0; l < i.length; l++) {
    const a = i[l],
      u = o;
    if (((o = "locator"), a.name === "nth")) {
      a.body === "0"
        ? s.push([
            e.generateLocator(u, "first", ""),
            e.generateLocator(u, "nth", "0"),
          ])
        : a.body === "-1"
          ? s.push([
              e.generateLocator(u, "last", ""),
              e.generateLocator(u, "nth", "-1"),
            ])
          : s.push([e.generateLocator(u, "nth", a.body)]);
      continue;
    }
    if (a.name === "internal:text") {
      const { exact: x, text: w } = yr(a.body);
      s.push([e.generateLocator(u, "text", w, { exact: x })]);
      continue;
    }
    if (a.name === "internal:has-text") {
      const { exact: x, text: w } = yr(a.body);
      if (!x) {
        s.push([e.generateLocator(u, "has-text", w, { exact: x })]);
        continue;
      }
    }
    if (a.name === "internal:has-not-text") {
      const { exact: x, text: w } = yr(a.body);
      if (!x) {
        s.push([e.generateLocator(u, "has-not-text", w, { exact: x })]);
        continue;
      }
    }
    if (a.name === "internal:has") {
      const x = Tn(e, a.body.parsed, !1, r);
      s.push(x.map((w) => e.generateLocator(u, "has", w)));
      continue;
    }
    if (a.name === "internal:has-not") {
      const x = Tn(e, a.body.parsed, !1, r);
      s.push(x.map((w) => e.generateLocator(u, "hasNot", w)));
      continue;
    }
    if (a.name === "internal:and") {
      const x = Tn(e, a.body.parsed, !1, r);
      s.push(x.map((w) => e.generateLocator(u, "and", w)));
      continue;
    }
    if (a.name === "internal:or") {
      const x = Tn(e, a.body.parsed, !1, r);
      s.push(x.map((w) => e.generateLocator(u, "or", w)));
      continue;
    }
    if (a.name === "internal:chain") {
      const x = Tn(e, a.body.parsed, !1, r);
      s.push(x.map((w) => e.generateLocator(u, "chain", w)));
      continue;
    }
    if (a.name === "internal:label") {
      const { exact: x, text: w } = yr(a.body);
      s.push([e.generateLocator(u, "label", w, { exact: x })]);
      continue;
    }
    if (a.name === "internal:role") {
      const x = an(a.body, !0),
        w = { attrs: [] };
      for (const h of x.attributes)
        h.name === "name"
          ? ((w.exact = h.caseSensitive), (w.name = h.value))
          : (h.name === "level" &&
              typeof h.value == "string" &&
              (h.value = +h.value),
            w.attrs.push({
              name: h.name === "include-hidden" ? "includeHidden" : h.name,
              value: h.value,
            }));
      s.push([e.generateLocator(u, "role", x.name, w)]);
      continue;
    }
    if (a.name === "internal:testid") {
      const x = an(a.body, !0),
        { value: w } = x.attributes[0];
      s.push([e.generateLocator(u, "test-id", w)]);
      continue;
    }
    if (a.name === "internal:attr") {
      const x = an(a.body, !0),
        { name: w, value: h, caseSensitive: f } = x.attributes[0],
        g = h,
        _ = !!f;
      if (w === "placeholder") {
        s.push([e.generateLocator(u, "placeholder", g, { exact: _ })]);
        continue;
      }
      if (w === "alt") {
        s.push([e.generateLocator(u, "alt", g, { exact: _ })]);
        continue;
      }
      if (w === "title") {
        s.push([e.generateLocator(u, "title", g, { exact: _ })]);
        continue;
      }
    }
    let c = "default";
    const p = i[l + 1];
    p &&
      p.name === "internal:control" &&
      p.body === "enter-frame" &&
      ((c = "frame"), (o = "frame-locator"), l++);
    const d = gn({ parts: [a] }),
      v = e.generateLocator(u, c, d);
    if (
      c === "default" &&
      p &&
      ["internal:has-text", "internal:has-not-text"].includes(p.name)
    ) {
      const { exact: x, text: w } = yr(p.body);
      if (!x) {
        const h = e.generateLocator(
            "locator",
            p.name === "internal:has-text" ? "has-text" : "has-not-text",
            w,
            { exact: x },
          ),
          f = {};
        p.name === "internal:has-text" ? (f.hasText = w) : (f.hasNotText = w);
        const g = e.generateLocator(u, "default", d, f);
        s.push([e.chainLocators([v, h]), g]), l++;
        continue;
      }
    }
    let y;
    if (["xpath", "css"].includes(a.name)) {
      const x = gn({ parts: [a] }, !0);
      y = e.generateLocator(u, c, x);
    }
    s.push([v, y].filter(Boolean));
  }
  return P1(e, s, r);
}
function P1(e, t, n) {
  const r = t.map(() => ""),
    i = [],
    s = (o) => {
      if (o === t.length) return i.push(e.chainLocators(r)), r.length < n;
      for (const l of t[o]) if (((r[o] = l), !s(o + 1))) return !1;
      return !0;
    };
  return s(0), i;
}
function yr(e) {
  let t = !1;
  const n = e.match(/^\/(.*)\/([igm]*)$/);
  return n
    ? { text: new RegExp(n[1], n[2]) }
    : (e.endsWith('"')
        ? ((e = JSON.parse(e)), (t = !0))
        : e.endsWith('"s')
          ? ((e = JSON.parse(e.substring(0, e.length - 1))), (t = !0))
          : e.endsWith('"i') &&
            ((e = JSON.parse(e.substring(0, e.length - 1))), (t = !1)),
      { exact: t, text: e });
}
class I1 {
  constructor(t) {
    this.preferredQuote = t;
  }
  generateLocator(t, n, r, i = {}) {
    switch (n) {
      case "default":
        return i.hasText !== void 0
          ? `locator(${this.quote(r)}, { hasText: ${this.toHasText(i.hasText)} })`
          : i.hasNotText !== void 0
            ? `locator(${this.quote(r)}, { hasNotText: ${this.toHasText(i.hasNotText)} })`
            : `locator(${this.quote(r)})`;
      case "frame":
        return `frameLocator(${this.quote(r)})`;
      case "nth":
        return `nth(${r})`;
      case "first":
        return "first()";
      case "last":
        return "last()";
      case "role":
        const s = [];
        fe(i.name)
          ? s.push(`name: ${this.regexToSourceString(i.name)}`)
          : typeof i.name == "string" &&
            (s.push(`name: ${this.quote(i.name)}`),
            i.exact && s.push("exact: true"));
        for (const { name: l, value: a } of i.attrs)
          s.push(`${l}: ${typeof a == "string" ? this.quote(a) : a}`);
        const o = s.length ? `, { ${s.join(", ")} }` : "";
        return `getByRole(${this.quote(r)}${o})`;
      case "has-text":
        return `filter({ hasText: ${this.toHasText(r)} })`;
      case "has-not-text":
        return `filter({ hasNotText: ${this.toHasText(r)} })`;
      case "has":
        return `filter({ has: ${r} })`;
      case "hasNot":
        return `filter({ hasNot: ${r} })`;
      case "and":
        return `and(${r})`;
      case "or":
        return `or(${r})`;
      case "chain":
        return `locator(${r})`;
      case "test-id":
        return `getByTestId(${this.toTestIdValue(r)})`;
      case "text":
        return this.toCallWithExact("getByText", r, !!i.exact);
      case "alt":
        return this.toCallWithExact("getByAltText", r, !!i.exact);
      case "placeholder":
        return this.toCallWithExact("getByPlaceholder", r, !!i.exact);
      case "label":
        return this.toCallWithExact("getByLabel", r, !!i.exact);
      case "title":
        return this.toCallWithExact("getByTitle", r, !!i.exact);
      default:
        throw new Error("Unknown selector kind " + n);
    }
  }
  chainLocators(t) {
    return t.join(".");
  }
  regexToSourceString(t) {
    return Ws(String(t));
  }
  toCallWithExact(t, n, r) {
    return fe(n)
      ? `${t}(${this.regexToSourceString(n)})`
      : r
        ? `${t}(${this.quote(n)}, { exact: true })`
        : `${t}(${this.quote(n)})`;
  }
  toHasText(t) {
    return fe(t) ? this.regexToSourceString(t) : this.quote(t);
  }
  toTestIdValue(t) {
    return fe(t) ? this.regexToSourceString(t) : this.quote(t);
  }
  quote(t) {
    return js(t, this.preferredQuote ?? "'");
  }
}
class R1 {
  generateLocator(t, n, r, i = {}) {
    switch (n) {
      case "default":
        return i.hasText !== void 0
          ? `locator(${this.quote(r)}, has_text=${this.toHasText(i.hasText)})`
          : i.hasNotText !== void 0
            ? `locator(${this.quote(r)}, has_not_text=${this.toHasText(i.hasNotText)})`
            : `locator(${this.quote(r)})`;
      case "frame":
        return `frame_locator(${this.quote(r)})`;
      case "nth":
        return `nth(${r})`;
      case "first":
        return "first";
      case "last":
        return "last";
      case "role":
        const s = [];
        fe(i.name)
          ? s.push(`name=${this.regexToString(i.name)}`)
          : typeof i.name == "string" &&
            (s.push(`name=${this.quote(i.name)}`),
            i.exact && s.push("exact=True"));
        for (const { name: l, value: a } of i.attrs) {
          let u = typeof a == "string" ? this.quote(a) : a;
          typeof a == "boolean" && (u = a ? "True" : "False"),
            s.push(`${Wf(l)}=${u}`);
        }
        const o = s.length ? `, ${s.join(", ")}` : "";
        return `get_by_role(${this.quote(r)}${o})`;
      case "has-text":
        return `filter(has_text=${this.toHasText(r)})`;
      case "has-not-text":
        return `filter(has_not_text=${this.toHasText(r)})`;
      case "has":
        return `filter(has=${r})`;
      case "hasNot":
        return `filter(has_not=${r})`;
      case "and":
        return `and_(${r})`;
      case "or":
        return `or_(${r})`;
      case "chain":
        return `locator(${r})`;
      case "test-id":
        return `get_by_test_id(${this.toTestIdValue(r)})`;
      case "text":
        return this.toCallWithExact("get_by_text", r, !!i.exact);
      case "alt":
        return this.toCallWithExact("get_by_alt_text", r, !!i.exact);
      case "placeholder":
        return this.toCallWithExact("get_by_placeholder", r, !!i.exact);
      case "label":
        return this.toCallWithExact("get_by_label", r, !!i.exact);
      case "title":
        return this.toCallWithExact("get_by_title", r, !!i.exact);
      default:
        throw new Error("Unknown selector kind " + n);
    }
  }
  chainLocators(t) {
    return t.join(".");
  }
  regexToString(t) {
    const n = t.flags.includes("i") ? ", re.IGNORECASE" : "";
    return `re.compile(r"${Ws(t.source).replace(/\\\//, "/").replace(/"/g, '\\"')}"${n})`;
  }
  toCallWithExact(t, n, r) {
    return fe(n)
      ? `${t}(${this.regexToString(n)})`
      : r
        ? `${t}(${this.quote(n)}, exact=True)`
        : `${t}(${this.quote(n)})`;
  }
  toHasText(t) {
    return fe(t) ? this.regexToString(t) : `${this.quote(t)}`;
  }
  toTestIdValue(t) {
    return fe(t) ? this.regexToString(t) : this.quote(t);
  }
  quote(t) {
    return js(t, '"');
  }
}
class $1 {
  generateLocator(t, n, r, i = {}) {
    let s;
    switch (t) {
      case "page":
        s = "Page";
        break;
      case "frame-locator":
        s = "FrameLocator";
        break;
      case "locator":
        s = "Locator";
        break;
    }
    switch (n) {
      case "default":
        return i.hasText !== void 0
          ? `locator(${this.quote(r)}, new ${s}.LocatorOptions().setHasText(${this.toHasText(i.hasText)}))`
          : i.hasNotText !== void 0
            ? `locator(${this.quote(r)}, new ${s}.LocatorOptions().setHasNotText(${this.toHasText(i.hasNotText)}))`
            : `locator(${this.quote(r)})`;
      case "frame":
        return `frameLocator(${this.quote(r)})`;
      case "nth":
        return `nth(${r})`;
      case "first":
        return "first()";
      case "last":
        return "last()";
      case "role":
        const o = [];
        fe(i.name)
          ? o.push(`.setName(${this.regexToString(i.name)})`)
          : typeof i.name == "string" &&
            (o.push(`.setName(${this.quote(i.name)})`),
            i.exact && o.push(".setExact(true)"));
        for (const { name: a, value: u } of i.attrs)
          o.push(`.set${ks(a)}(${typeof u == "string" ? this.quote(u) : u})`);
        const l = o.length ? `, new ${s}.GetByRoleOptions()${o.join("")}` : "";
        return `getByRole(AriaRole.${Wf(r).toUpperCase()}${l})`;
      case "has-text":
        return `filter(new ${s}.FilterOptions().setHasText(${this.toHasText(r)}))`;
      case "has-not-text":
        return `filter(new ${s}.FilterOptions().setHasNotText(${this.toHasText(r)}))`;
      case "has":
        return `filter(new ${s}.FilterOptions().setHas(${r}))`;
      case "hasNot":
        return `filter(new ${s}.FilterOptions().setHasNot(${r}))`;
      case "and":
        return `and(${r})`;
      case "or":
        return `or(${r})`;
      case "chain":
        return `locator(${r})`;
      case "test-id":
        return `getByTestId(${this.toTestIdValue(r)})`;
      case "text":
        return this.toCallWithExact(s, "getByText", r, !!i.exact);
      case "alt":
        return this.toCallWithExact(s, "getByAltText", r, !!i.exact);
      case "placeholder":
        return this.toCallWithExact(s, "getByPlaceholder", r, !!i.exact);
      case "label":
        return this.toCallWithExact(s, "getByLabel", r, !!i.exact);
      case "title":
        return this.toCallWithExact(s, "getByTitle", r, !!i.exact);
      default:
        throw new Error("Unknown selector kind " + n);
    }
  }
  chainLocators(t) {
    return t.join(".");
  }
  regexToString(t) {
    const n = t.flags.includes("i") ? ", Pattern.CASE_INSENSITIVE" : "";
    return `Pattern.compile(${this.quote(Ws(t.source))}${n})`;
  }
  toCallWithExact(t, n, r, i) {
    return fe(r)
      ? `${n}(${this.regexToString(r)})`
      : i
        ? `${n}(${this.quote(r)}, new ${t}.${ks(n)}Options().setExact(true))`
        : `${n}(${this.quote(r)})`;
  }
  toHasText(t) {
    return fe(t) ? this.regexToString(t) : this.quote(t);
  }
  toTestIdValue(t) {
    return fe(t) ? this.regexToString(t) : this.quote(t);
  }
  quote(t) {
    return js(t, '"');
  }
}
class O1 {
  generateLocator(t, n, r, i = {}) {
    switch (n) {
      case "default":
        return i.hasText !== void 0
          ? `Locator(${this.quote(r)}, new() { ${this.toHasText(i.hasText)} })`
          : i.hasNotText !== void 0
            ? `Locator(${this.quote(r)}, new() { ${this.toHasNotText(i.hasNotText)} })`
            : `Locator(${this.quote(r)})`;
      case "frame":
        return `FrameLocator(${this.quote(r)})`;
      case "nth":
        return `Nth(${r})`;
      case "first":
        return "First";
      case "last":
        return "Last";
      case "role":
        const s = [];
        fe(i.name)
          ? s.push(`NameRegex = ${this.regexToString(i.name)}`)
          : typeof i.name == "string" &&
            (s.push(`Name = ${this.quote(i.name)}`),
            i.exact && s.push("Exact = true"));
        for (const { name: l, value: a } of i.attrs)
          s.push(`${ks(l)} = ${typeof a == "string" ? this.quote(a) : a}`);
        const o = s.length ? `, new() { ${s.join(", ")} }` : "";
        return `GetByRole(AriaRole.${ks(r)}${o})`;
      case "has-text":
        return `Filter(new() { ${this.toHasText(r)} })`;
      case "has-not-text":
        return `Filter(new() { ${this.toHasNotText(r)} })`;
      case "has":
        return `Filter(new() { Has = ${r} })`;
      case "hasNot":
        return `Filter(new() { HasNot = ${r} })`;
      case "and":
        return `And(${r})`;
      case "or":
        return `Or(${r})`;
      case "chain":
        return `Locator(${r})`;
      case "test-id":
        return `GetByTestId(${this.toTestIdValue(r)})`;
      case "text":
        return this.toCallWithExact("GetByText", r, !!i.exact);
      case "alt":
        return this.toCallWithExact("GetByAltText", r, !!i.exact);
      case "placeholder":
        return this.toCallWithExact("GetByPlaceholder", r, !!i.exact);
      case "label":
        return this.toCallWithExact("GetByLabel", r, !!i.exact);
      case "title":
        return this.toCallWithExact("GetByTitle", r, !!i.exact);
      default:
        throw new Error("Unknown selector kind " + n);
    }
  }
  chainLocators(t) {
    return t.join(".");
  }
  regexToString(t) {
    const n = t.flags.includes("i") ? ", RegexOptions.IgnoreCase" : "";
    return `new Regex(${this.quote(Ws(t.source))}${n})`;
  }
  toCallWithExact(t, n, r) {
    return fe(n)
      ? `${t}(${this.regexToString(n)})`
      : r
        ? `${t}(${this.quote(n)}, new() { Exact = true })`
        : `${t}(${this.quote(n)})`;
  }
  toHasText(t) {
    return fe(t)
      ? `HasTextRegex = ${this.regexToString(t)}`
      : `HasText = ${this.quote(t)}`;
  }
  toTestIdValue(t) {
    return fe(t) ? this.regexToString(t) : this.quote(t);
  }
  toHasNotText(t) {
    return fe(t)
      ? `HasNotTextRegex = ${this.regexToString(t)}`
      : `HasNotText = ${this.quote(t)}`;
  }
  quote(t) {
    return js(t, '"');
  }
}
class z1 {
  generateLocator(t, n, r, i = {}) {
    return JSON.stringify({ kind: n, body: r, options: i });
  }
  chainLocators(t) {
    const n = t.map((r) => JSON.parse(r));
    for (let r = 0; r < n.length - 1; ++r) n[r].next = n[r + 1];
    return JSON.stringify(n[0]);
  }
}
const D1 = { javascript: I1, python: R1, java: $1, csharp: O1, jsonl: z1 };
function fe(e) {
  return e instanceof RegExp;
}
const ec = new Map();
function ui({
  name: e,
  items: t = [],
  id: n,
  render: r,
  icon: i,
  isError: s,
  isWarning: o,
  indent: l,
  selectedItem: a,
  onAccepted: u,
  onSelected: c,
  onLeftArrow: p,
  onRightArrow: d,
  onHighlighted: v,
  onIconClicked: y,
  noItemsMessage: x,
  dataTestId: w,
  noHighlightOnHover: h,
}) {
  const f = L.useRef(null),
    [g, _] = L.useState();
  return (
    L.useEffect(() => {
      v == null || v(g);
    }, [v, g]),
    L.useEffect(() => {
      const k = f.current;
      if (!k) return;
      const N = () => {
        ec.set(e, k.scrollTop);
      };
      return (
        k.addEventListener("scroll", N, { passive: !0 }),
        () => k.removeEventListener("scroll", N)
      );
    }, [e]),
    L.useEffect(() => {
      f.current && (f.current.scrollTop = ec.get(e) || 0);
    }, [e]),
    m("div", {
      className: "list-view vbox",
      role: t.length > 0 ? "list" : void 0,
      "data-testid": w || e + "-list",
      children: A("div", {
        className: "list-view-content",
        tabIndex: 0,
        onDoubleClick: () => a && (u == null ? void 0 : u(a, t.indexOf(a))),
        onKeyDown: (k) => {
          var S;
          if (a && k.key === "Enter") {
            u == null || u(a, t.indexOf(a));
            return;
          }
          if (
            k.key !== "ArrowDown" &&
            k.key !== "ArrowUp" &&
            k.key !== "ArrowLeft" &&
            k.key !== "ArrowRight"
          )
            return;
          if (
            (k.stopPropagation(),
            k.preventDefault(),
            a && k.key === "ArrowLeft")
          ) {
            p == null || p(a, t.indexOf(a));
            return;
          }
          if (a && k.key === "ArrowRight") {
            d == null || d(a, t.indexOf(a));
            return;
          }
          const N = a ? t.indexOf(a) : -1;
          let C = N;
          k.key === "ArrowDown" &&
            (N === -1 ? (C = 0) : (C = Math.min(N + 1, t.length - 1))),
            k.key === "ArrowUp" &&
              (N === -1 ? (C = t.length - 1) : (C = Math.max(N - 1, 0)));
          const E = (S = f.current) == null ? void 0 : S.children.item(C);
          H1(E || void 0), v == null || v(void 0), c == null || c(t[C], C);
        },
        ref: f,
        children: [
          x &&
            t.length === 0 &&
            m("div", { className: "list-view-empty", children: x }),
          t.map((k, N) => {
            const C = a === k ? " selected" : "",
              E = !h && g === k ? " highlighted" : "",
              S = s != null && s(k, N) ? " error" : "",
              M = o != null && o(k, N) ? " warning" : "",
              $ = (l == null ? void 0 : l(k, N)) || 0,
              T = r(k, N);
            return A(
              "div",
              {
                role: "listitem",
                className: "list-view-entry" + C + E + S + M,
                onClick: () => (c == null ? void 0 : c(k, N)),
                onMouseEnter: () => _(k),
                onMouseLeave: () => _(void 0),
                children: [
                  $
                    ? new Array($)
                        .fill(0)
                        .map(() => m("div", { className: "list-view-indent" }))
                    : void 0,
                  i &&
                    m("div", {
                      className: "codicon " + (i(k, N) || "codicon-blank"),
                      style: { minWidth: 16, marginRight: 4 },
                      onDoubleClick: (P) => {
                        P.preventDefault(), P.stopPropagation();
                      },
                      onClick: (P) => {
                        P.stopPropagation(),
                          P.preventDefault(),
                          y == null || y(k, N);
                      },
                    }),
                  typeof T == "string"
                    ? m("div", {
                        style: { textOverflow: "ellipsis", overflow: "hidden" },
                        children: T,
                      })
                    : T,
                ],
              },
              (n == null ? void 0 : n(k, N)) || N,
            );
          }),
        ],
      }),
    })
  );
}
function H1(e) {
  e &&
    (e != null && e.scrollIntoViewIfNeeded
      ? e.scrollIntoViewIfNeeded(!1)
      : e == null || e.scrollIntoView());
}
const F1 = ui;
function U1({
  name: e,
  rootItem: t,
  render: n,
  icon: r,
  isError: i,
  isVisible: s,
  selectedItem: o,
  onAccepted: l,
  onSelected: a,
  onHighlighted: u,
  treeState: c,
  setTreeState: p,
  noItemsMessage: d,
  dataTestId: v,
  autoExpandDepth: y,
}) {
  const x = L.useMemo(() => V1(t, o, c.expandedItems, y || 0), [t, o, c, y]),
    w = L.useMemo(() => {
      if (!s) return [...x.keys()];
      const h = new Map(),
        f = (_) => {
          const k = h.get(_);
          if (k !== void 0) return k;
          let N = _.children.some((E) => f(E));
          for (const E of _.children) {
            const S = f(E);
            N = N || S;
          }
          const C = s(_) || N;
          return h.set(_, C), C;
        };
      for (const _ of x.keys()) f(_);
      const g = [];
      for (const _ of x.keys()) s(_) && g.push(_);
      return g;
    }, [x, s]);
  return m(F1, {
    name: e,
    items: w,
    id: (h) => h.id,
    dataTestId: v || e + "-tree",
    render: (h) => {
      const f = n(h);
      return A(at, {
        children: [
          r &&
            m("div", {
              className: "codicon " + (r(h) || "blank"),
              style: { minWidth: 16, marginRight: 4 },
            }),
          typeof f == "string"
            ? m("div", {
                style: { textOverflow: "ellipsis", overflow: "hidden" },
                children: f,
              })
            : f,
        ],
      });
    },
    icon: (h) => {
      const f = x.get(h).expanded;
      if (typeof f == "boolean")
        return f ? "codicon-chevron-down" : "codicon-chevron-right";
    },
    isError: (h) => (i == null ? void 0 : i(h)) || !1,
    indent: (h) => x.get(h).depth,
    selectedItem: o,
    onAccepted: (h) => (l == null ? void 0 : l(h)),
    onSelected: (h) => (a == null ? void 0 : a(h)),
    onHighlighted: (h) => (u == null ? void 0 : u(h)),
    onLeftArrow: (h) => {
      const { expanded: f, parent: g } = x.get(h);
      f
        ? (c.expandedItems.set(h.id, !1), p({ ...c }))
        : g && (a == null || a(g));
    },
    onRightArrow: (h) => {
      h.children.length && (c.expandedItems.set(h.id, !0), p({ ...c }));
    },
    onIconClicked: (h) => {
      const { expanded: f } = x.get(h);
      if (f) {
        for (let g = o; g; g = g.parent)
          if (g === h) {
            a == null || a(h);
            break;
          }
        c.expandedItems.set(h.id, !1);
      } else c.expandedItems.set(h.id, !0);
      p({ ...c });
    },
    noItemsMessage: d,
  });
}
function V1(e, t, n, r) {
  const i = new Map(),
    s = new Set();
  for (let l = t == null ? void 0 : t.parent; l; l = l.parent) s.add(l.id);
  const o = (l, a) => {
    for (const u of l.children) {
      const c = s.has(u.id) || n.get(u.id),
        p = r > a && i.size < 25 && c !== !1,
        d = u.children.length ? c ?? p : void 0;
      i.set(u, { depth: a, expanded: d, parent: e === l ? null : l }),
        d && o(u, a + 1);
    }
  };
  return o(e, 0), i;
}
const B1 = U1,
  j1 = ({
    actions: e,
    selectedAction: t,
    selectedTime: n,
    setSelectedTime: r,
    sdkLanguage: i,
    onSelected: s,
    onHighlighted: o,
    revealConsole: l,
    isLive: a,
  }) => {
    const [u, c] = L.useState({ expandedItems: new Map() }),
      { rootItem: p, itemMap: d } = L.useMemo(() => r1(e), [e]),
      { selectedItem: v } = L.useMemo(
        () => ({ selectedItem: t ? d.get(t.callId) : void 0 }),
        [d, t],
      );
    return A("div", {
      className: "vbox",
      children: [
        n &&
          A("div", {
            className: "action-list-show-all",
            onClick: () => r(void 0),
            children: [
              m("span", { className: "codicon codicon-triangle-left" }),
              "Show all",
            ],
          }),
        m(B1, {
          name: "actions",
          rootItem: p,
          treeState: u,
          setTreeState: c,
          selectedItem: v,
          onSelected: (y) => s(y.action),
          onHighlighted: (y) => o(y == null ? void 0 : y.action),
          onAccepted: (y) =>
            r({ minimum: y.action.startTime, maximum: y.action.endTime }),
          isError: (y) => {
            var x, w;
            return !!(
              (w = (x = y.action) == null ? void 0 : x.error) != null &&
              w.message
            );
          },
          isVisible: (y) =>
            !n ||
            (y.action.startTime <= n.maximum && y.action.endTime >= n.minimum),
          render: (y) =>
            Aa(y.action, {
              sdkLanguage: i,
              revealConsole: l,
              isLive: a,
              showDuration: !0,
              showBadges: !0,
            }),
        }),
      ],
    });
  },
  Aa = (e, t) => {
    const {
        sdkLanguage: n,
        revealConsole: r,
        isLive: i,
        showDuration: s,
        showBadges: o,
      } = t,
      { errors: l, warnings: a } = o1(e),
      u = e.params.selector ? Gt(n || "javascript", e.params.selector) : void 0;
    let c = "";
    return (
      e.endTime
        ? (c = Ke(e.endTime - e.startTime))
        : e.error
          ? (c = "Timed out")
          : i || (c = "-"),
      A(at, {
        children: [
          A("div", {
            className: "action-title",
            title: e.apiName,
            children: [
              m("span", { children: e.apiName }),
              u &&
                m("div", {
                  className: "action-selector",
                  title: u,
                  children: u,
                }),
              e.method === "goto" &&
                e.params.url &&
                m("div", {
                  className: "action-url",
                  title: e.params.url,
                  children: e.params.url,
                }),
            ],
          }),
          (s || o) && m("div", { className: "spacer" }),
          s &&
            m("div", {
              className: "action-duration",
              children:
                c || m("span", { className: "codicon codicon-loading" }),
            }),
          o &&
            A("div", {
              className: "action-icons",
              onClick: () => (r == null ? void 0 : r()),
              children: [
                !!l &&
                  A("div", {
                    className: "action-icon",
                    children: [
                      m("span", { className: "codicon codicon-error" }),
                      m("span", {
                        className: "action-icon-value",
                        children: l,
                      }),
                    ],
                  }),
                !!a &&
                  A("div", {
                    className: "action-icon",
                    children: [
                      m("span", { className: "codicon codicon-warning" }),
                      m("span", {
                        className: "action-icon-value",
                        children: a,
                      }),
                    ],
                  }),
              ],
            }),
        ],
      })
    );
  };
const W1 = ({ value: e }) => {
    const [t, n] = L.useState("codicon-clippy"),
      r = L.useCallback(() => {
        navigator.clipboard.writeText(e).then(
          () => {
            n("codicon-check"),
              setTimeout(() => {
                n("codicon-clippy");
              }, 3e3);
          },
          () => {
            n("codicon-close");
          },
        );
      }, [e]);
    return m("span", { className: `copy-icon codicon ${t}`, onClick: r });
  },
  sr = ({ text: e }) =>
    m("div", {
      className: "fill",
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        fontWeight: "bold",
        opacity: 0.5,
      },
      children: e,
    }),
  q1 = ({ action: e, sdkLanguage: t }) => {
    if (!e) return m(sr, { text: "No action selected" });
    const n = { ...e.params };
    delete n.info;
    const r = Object.keys(n),
      i = e.wallTime ? new Date(e.wallTime).toLocaleString() : null,
      s = e.endTime ? Ke(e.endTime - e.startTime) : "Timed Out";
    return A("div", {
      className: "call-tab",
      children: [
        m("div", { className: "call-line", children: e.apiName }),
        A(at, {
          children: [
            m("div", { className: "call-section", children: "Time" }),
            i &&
              A("div", {
                className: "call-line",
                children: [
                  "wall time:",
                  m("span", {
                    className: "call-value datetime",
                    title: i,
                    children: i,
                  }),
                ],
              }),
            A("div", {
              className: "call-line",
              children: [
                "duration:",
                m("span", {
                  className: "call-value datetime",
                  title: s,
                  children: s,
                }),
              ],
            }),
          ],
        }),
        !!r.length &&
          m("div", { className: "call-section", children: "Parameters" }),
        !!r.length && r.map((o, l) => tc(nc(e, o, n[o], t), "param-" + l)),
        !!e.result &&
          m("div", { className: "call-section", children: "Return value" }),
        !!e.result &&
          Object.keys(e.result).map((o, l) =>
            tc(nc(e, o, e.result[o], t), "result-" + l),
          ),
      ],
    });
  };
function tc(e, t) {
  let n = e.text.replace(/\n/g, "↵");
  return (
    e.type === "string" && (n = `"${n}"`),
    A(
      "div",
      {
        className: "call-line",
        children: [
          e.name,
          ":",
          m("span", {
            className: `call-value ${e.type}`,
            title: e.text,
            children: n,
          }),
          ["string", "number", "object", "locator"].includes(e.type) &&
            m(W1, { value: e.text }),
        ],
      },
      t,
    )
  );
}
function nc(e, t, n, r) {
  const i = e.method.includes("eval") || e.method === "waitForFunction";
  if (t === "files") return { text: "<files>", type: "string", name: t };
  if (
    ((t === "eventInit" || t === "expectedValue" || (t === "arg" && i)) &&
      (n = Ts(n.value, new Array(10).fill({ handle: "<handle>" }))),
    ((t === "value" && i) || (t === "received" && e.method === "expect")) &&
      (n = Ts(n, new Array(10).fill({ handle: "<handle>" }))),
    t === "selector")
  )
    return {
      text: Gt(r || "javascript", e.params.selector),
      type: "locator",
      name: "locator",
    };
  const s = typeof n;
  return s !== "object" || n === null
    ? { text: String(n), type: s, name: t }
    : n.guid
      ? { text: "<handle>", type: "handle", name: t }
      : { text: JSON.stringify(n).slice(0, 1e3), type: "object", name: t };
}
function Ts(e, t) {
  if (e.n !== void 0) return e.n;
  if (e.s !== void 0) return e.s;
  if (e.b !== void 0) return e.b;
  if (e.v !== void 0) {
    if (e.v === "undefined") return;
    if (e.v === "null") return null;
    if (e.v === "NaN") return NaN;
    if (e.v === "Infinity") return 1 / 0;
    if (e.v === "-Infinity") return -1 / 0;
    if (e.v === "-0") return -0;
  }
  if (e.d !== void 0) return new Date(e.d);
  if (e.r !== void 0) return new RegExp(e.r.p, e.r.f);
  if (e.a !== void 0) return e.a.map((n) => Ts(n, t));
  if (e.o !== void 0) {
    const n = {};
    for (const { k: r, v: i } of e.o) n[r] = Ts(i, t);
    return n;
  }
  return e.h !== void 0 ? (t === void 0 ? "<object>" : t[e.h]) : "<object>";
}
const X1 = ui,
  Q1 = ({ action: e, isLive: t }) => {
    const n = L.useMemo(() => {
      var o;
      if (!e || !e.log.length) return [];
      const r = e.log,
        i = e.wallTime - e.startTime,
        s = [];
      for (let l = 0; l < r.length; ++l) {
        let a = "";
        if (r[l].time !== -1) {
          const u = (o = r[l]) == null ? void 0 : o.time;
          l + 1 < r.length
            ? (a = Ke(r[l + 1].time - u))
            : e.endTime > 0
              ? (a = Ke(e.endTime - u))
              : t
                ? (a = Ke(Date.now() - i - u))
                : (a = "-");
        }
        s.push({ message: r[l].message, time: a });
      }
      return s;
    }, [e, t]);
    return n.length
      ? m(X1, {
          name: "log",
          items: n,
          render: (r) =>
            A("div", {
              className: "log-list-item",
              children: [
                m("span", { className: "log-list-duration", children: r.time }),
                r.message,
              ],
            }),
          noHighlightOnHover: !0,
        })
      : m(sr, { text: "No log entries" });
  };
function ni(e) {
  const t = /(\x1b\[(\d+(;\d+)*)m)|([^\x1b]+)/g,
    n = [];
  let r,
    i = {};
  for (; (r = t.exec(e)) !== null; ) {
    const [, , s, , o] = r;
    if (s) {
      const l = +s;
      switch (l) {
        case 0:
          i = {};
          break;
        case 1:
          i["font-weight"] = "bold";
          break;
        case 3:
          i["font-style"] = "italic";
          break;
        case 4:
          i["text-decoration"] = "underline";
          break;
        case 8:
          i.display = "none";
          break;
        case 9:
          i["text-decoration"] = "line-through";
          break;
        case 22:
          i = {
            ...i,
            "font-weight": void 0,
            "font-style": void 0,
            "text-decoration": void 0,
          };
          break;
        case 23:
          i = { ...i, "font-weight": void 0, "font-style": void 0 };
          break;
        case 24:
          i = { ...i, "text-decoration": void 0 };
          break;
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
          i.color = rc[l - 30];
          break;
        case 39:
          i = { ...i, color: void 0 };
          break;
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
          i["background-color"] = rc[l - 40];
          break;
        case 49:
          i = { ...i, "background-color": void 0 };
          break;
        case 53:
          i["text-decoration"] = "overline";
          break;
        case 90:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
        case 96:
        case 97:
          i.color = ic[l - 90];
          break;
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
          i["background-color"] = ic[l - 100];
          break;
      }
    } else o && n.push(`<span style="${G1(i)}">${K1(o)}</span>`);
  }
  return n.join("");
}
const rc = {
    0: "var(--vscode-terminal-ansiBlack)",
    1: "var(--vscode-terminal-ansiRed)",
    2: "var(--vscode-terminal-ansiGreen)",
    3: "var(--vscode-terminal-ansiYellow)",
    4: "var(--vscode-terminal-ansiBlue)",
    5: "var(--vscode-terminal-ansiMagenta)",
    6: "var(--vscode-terminal-ansiCyan)",
    7: "var(--vscode-terminal-ansiWhite)",
  },
  ic = {
    0: "var(--vscode-terminal-ansiBrightBlack)",
    1: "var(--vscode-terminal-ansiBrightRed)",
    2: "var(--vscode-terminal-ansiBrightGreen)",
    3: "var(--vscode-terminal-ansiBrightYellow)",
    4: "var(--vscode-terminal-ansiBrightBlue)",
    5: "var(--vscode-terminal-ansiBrightMagenta)",
    6: "var(--vscode-terminal-ansiBrightCyan)",
    7: "var(--vscode-terminal-ansiBrightWhite)",
  };
function K1(e) {
  return e.replace(
    /[&"<>]/g,
    (t) => ({ "&": "&amp;", '"': "&quot;", "<": "&lt;", ">": "&gt;" })[t],
  );
}
function G1(e) {
  return Object.entries(e)
    .map(([t, n]) => `${t}: ${n}`)
    .join("; ");
}
const Y1 = ({ error: e }) => {
  const t = L.useMemo(() => ni(e), [e]);
  return m("div", {
    className: "error-message",
    dangerouslySetInnerHTML: { __html: t || "" },
  });
};
function J1(e) {
  return L.useMemo(() => {
    if (!e) return { errors: new Map() };
    const t = new Map();
    for (const n of e.errorDescriptors) t.set(n.message, n);
    return { errors: t };
  }, [e]);
}
const Z1 = ({ errorsModel: e, sdkLanguage: t, revealInSource: n }) =>
  e.errors.size
    ? m("div", {
        className: "fill",
        style: { overflow: "auto" },
        children: [...e.errors.entries()].map(([r, i]) => {
          var a;
          let s, o;
          const l = (a = i.stack) == null ? void 0 : a[0];
          return (
            l &&
              ((s = l.file.replace(/.*\/(.*)/, "$1") + ":" + l.line),
              (o = l.file + ":" + l.line)),
            A(
              "div",
              {
                children: [
                  A("div", {
                    className: "hbox",
                    style: {
                      alignItems: "center",
                      padding: "5px 10px",
                      minHeight: 36,
                      fontWeight: "bold",
                      color: "var(--vscode-errorForeground)",
                    },
                    children: [
                      i.action && Aa(i.action, { sdkLanguage: t }),
                      s &&
                        A("div", {
                          className: "action-location",
                          children: [
                            "@ ",
                            m("span", {
                              title: o,
                              onClick: () => i.action && n(i.action),
                              children: s,
                            }),
                          ],
                        }),
                    ],
                  }),
                  m(Y1, { error: r }),
                ],
              },
              r,
            )
          );
        }),
      })
    : m(sr, { text: "No errors" });
const e0 = ui;
function t0(e, t) {
  const { entries: n } = L.useMemo(() => {
    if (!e) return { entries: [] };
    const i = [];
    for (const s of e.events) {
      if (s.type === "console") {
        const o = s.args && s.args.length ? r0(s.args) : mh(s.text),
          l = s.location.url,
          u = `${l ? l.substring(l.lastIndexOf("/") + 1) : "<anonymous>"}:${s.location.lineNumber}`;
        i.push({
          browserMessage: { body: o, location: u },
          isError: s.messageType === "error",
          isWarning: s.messageType === "warning",
          timestamp: s.time,
        });
      }
      s.type === "event" &&
        s.method === "pageError" &&
        i.push({
          browserError: s.params.error,
          isError: !0,
          isWarning: !1,
          timestamp: s.time,
        });
    }
    for (const s of e.stdio) {
      let o = "";
      s.text && (o = ni(s.text.trim()) || ""),
        s.base64 && (o = ni(atob(s.base64).trim()) || ""),
        i.push({
          nodeMessage: { html: o },
          isError: s.type === "stderr",
          isWarning: !1,
          timestamp: s.timestamp,
        });
    }
    return i.sort((s, o) => s.timestamp - o.timestamp), { entries: i };
  }, [e]);
  return {
    entries: L.useMemo(
      () =>
        t
          ? n.filter(
              (i) => i.timestamp >= t.minimum && i.timestamp <= t.maximum,
            )
          : n,
      [n, t],
    ),
  };
}
const n0 = ({ consoleModel: e, boundaries: t }) =>
  e.entries.length
    ? m("div", {
        className: "console-tab",
        children: m(e0, {
          name: "console",
          items: e.entries,
          isError: (n) => n.isError,
          isWarning: (n) => n.isWarning,
          render: (n) => {
            const r = Ke(n.timestamp - t.minimum),
              i = m("span", { className: "console-time", children: r }),
              s = n.isError
                ? " status-error"
                : n.isWarning
                  ? " status-warning"
                  : " status-none",
              o =
                n.browserMessage || n.browserError
                  ? m("span", {
                      className: "codicon codicon-browser" + s,
                      title: "Browser message",
                    })
                  : m("span", {
                      className: "codicon codicon-file" + s,
                      title: "Runner message",
                    });
            let l, a, u, c;
            const { browserMessage: p, browserError: d, nodeMessage: v } = n;
            if ((p && ((l = p.location), (a = p.body)), d)) {
              const { error: y, value: x } = d;
              y ? ((a = y.message), (c = y.stack)) : (a = String(x));
            }
            return (
              v && (u = v.html),
              A("div", {
                className: "console-line",
                children: [
                  i,
                  o,
                  l &&
                    m("span", { className: "console-location", children: l }),
                  a &&
                    m("span", {
                      className: "console-line-message",
                      children: a,
                    }),
                  u &&
                    m("span", {
                      className: "console-line-message",
                      dangerouslySetInnerHTML: { __html: u },
                    }),
                  c && m("div", { className: "console-stack", children: c }),
                ],
              })
            );
          },
        }),
      })
    : m(sr, { text: "No console entries" });
function r0(e) {
  if (e.length === 1) return mh(e[0].preview);
  const t = typeof e[0].value == "string" && e[0].value.includes("%"),
    n = t ? e[0].value : "",
    r = t ? e.slice(1) : e;
  let i = 0;
  const s = /%([%sdifoOc])/g;
  let o;
  const l = [];
  let a = [];
  l.push(m("span", { children: a }));
  let u = 0;
  for (; (o = s.exec(n)) !== null; ) {
    const c = n.substring(u, o.index);
    a.push(m("span", { children: c })), (u = o.index + 2);
    const p = o[0][1];
    if (p === "%") a.push(m("span", { children: "%" }));
    else if (
      p === "s" ||
      p === "o" ||
      p === "O" ||
      p === "d" ||
      p === "i" ||
      p === "f"
    ) {
      const d = r[i++],
        v = {};
      typeof (d == null ? void 0 : d.value) != "string" &&
        (v.color = "var(--vscode-debugTokenExpression-number)"),
        a.push(
          m("span", {
            style: v,
            children: (d == null ? void 0 : d.preview) || "",
          }),
        );
    } else if (p === "c") {
      a = [];
      const d = r[i++],
        v = d ? i0(d.preview) : {};
      l.push(m("span", { style: v, children: a }));
    }
  }
  for (
    u < n.length && a.push(m("span", { children: n.substring(u) }));
    i < r.length;
    i++
  ) {
    const c = r[i],
      p = {};
    a.length && a.push(m("span", { children: " " })),
      typeof (c == null ? void 0 : c.value) != "string" &&
        (p.color = "var(--vscode-debugTokenExpression-number)"),
      a.push(
        m("span", {
          style: p,
          children: (c == null ? void 0 : c.preview) || "",
        }),
      );
  }
  return l;
}
function mh(e) {
  return [m("span", { dangerouslySetInnerHTML: { __html: ni(e.trim()) } })];
}
function i0(e) {
  try {
    const t = {},
      n = e.split(";");
    for (const r of n) {
      const i = r.trim();
      if (!i) continue;
      let [s, o] = i.split(":");
      if (((s = s.trim()), (o = o.trim()), !s0(s))) continue;
      const l = s.replace(/-([a-z])/g, (a) => a[1].toUpperCase());
      t[l] = o;
    }
    return t;
  } catch {
    return {};
  }
}
function s0(e) {
  return [
    "background",
    "border",
    "color",
    "font",
    "line",
    "margin",
    "padding",
    "text",
  ].some((n) => e.startsWith(n));
}
const gh = ({ noShadow: e, children: t, noMinHeight: n }) =>
    m("div", {
      className:
        "toolbar" + (e ? " no-shadow" : "") + (n ? " no-min-height" : ""),
      children: t,
    }),
  Nl = ({
    tabs: e,
    selectedTab: t,
    setSelectedTab: n,
    leftToolbar: r,
    rightToolbar: i,
    dataTestId: s,
    mode: o,
  }) => (
    o || (o = "default"),
    m("div", {
      className: "tabbed-pane",
      "data-testid": s,
      children: A("div", {
        className: "vbox",
        children: [
          A(gh, {
            children: [
              r &&
                A("div", {
                  style: {
                    flex: "none",
                    display: "flex",
                    margin: "0 4px",
                    alignItems: "center",
                  },
                  children: [...r],
                }),
              o === "default" &&
                m("div", {
                  style: {
                    flex: "auto",
                    display: "flex",
                    height: "100%",
                    overflow: "hidden",
                  },
                  children: [
                    ...e.map((l) =>
                      m(vh, {
                        id: l.id,
                        title: l.title,
                        count: l.count,
                        errorCount: l.errorCount,
                        selected: t === l.id,
                        onSelect: n,
                      }),
                    ),
                  ],
                }),
              o === "select" &&
                m("div", {
                  style: {
                    flex: "auto",
                    display: "flex",
                    height: "100%",
                    overflow: "hidden",
                  },
                  children: m("select", {
                    style: {
                      width: "100%",
                      background: "none",
                      cursor: "pointer",
                    },
                    onChange: (l) => {
                      n(e[l.currentTarget.selectedIndex].id);
                    },
                    children: e.map((l) => {
                      let a = "";
                      return (
                        l.count === 1
                          ? (a = " 🔵")
                          : l.count && (a = ` 🔵✖️${l.count}`),
                        l.errorCount === 1
                          ? (a = " 🔴")
                          : l.errorCount && (a = ` 🔴✖️${l.errorCount}`),
                        A("option", {
                          value: l.id,
                          selected: l.id === t,
                          children: [l.title, a],
                        })
                      );
                    }),
                  }),
                }),
              i &&
                A("div", {
                  style: {
                    flex: "none",
                    display: "flex",
                    alignItems: "center",
                  },
                  children: [...i],
                }),
            ],
          }),
          e.map((l) => {
            const a = "tab-content tab-" + l.id;
            if (l.component)
              return m(
                "div",
                {
                  className: a,
                  style: { display: t === l.id ? "inherit" : "none" },
                  children: l.component,
                },
                l.id,
              );
            if (t === l.id)
              return m("div", { className: a, children: l.render() }, l.id);
          }),
        ],
      }),
    })
  ),
  vh = ({
    id: e,
    title: t,
    count: n,
    errorCount: r,
    selected: i,
    onSelect: s,
  }) =>
    A(
      "div",
      {
        className: "tabbed-pane-tab " + (i ? "selected" : ""),
        onClick: () => s(e),
        title: t,
        children: [
          m("div", { className: "tabbed-pane-tab-label", children: t }),
          !!n &&
            m("div", { className: "tabbed-pane-tab-counter", children: n }),
          !!r &&
            m("div", {
              className: "tabbed-pane-tab-counter error",
              children: r,
            }),
        ],
      },
      e,
    ),
  o0 = "modulepreload",
  l0 = function (e, t) {
    return new URL(e, t).href;
  },
  sc = {},
  a0 = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const i = document.getElementsByTagName("link");
    return Promise.all(
      n.map((s) => {
        if (((s = l0(s, r)), s in sc)) return;
        sc[s] = !0;
        const o = s.endsWith(".css"),
          l = o ? '[rel="stylesheet"]' : "";
        if (!!r)
          for (let c = i.length - 1; c >= 0; c--) {
            const p = i[c];
            if (p.href === s && (!o || p.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${s}"]${l}`)) return;
        const u = document.createElement("link");
        if (
          ((u.rel = o ? "stylesheet" : o0),
          o || ((u.as = "script"), (u.crossOrigin = "")),
          (u.href = s),
          document.head.appendChild(u),
          o)
        )
          return new Promise((c, p) => {
            u.addEventListener("load", c),
              u.addEventListener("error", () =>
                p(new Error(`Unable to preload CSS for ${s}`)),
              );
          });
      }),
    )
      .then(() => t())
      .catch((s) => {
        const o = new Event("vite:preloadError", { cancelable: !0 });
        if (((o.payload = s), window.dispatchEvent(o), !o.defaultPrevented))
          throw s;
      });
  };
const Xs = ({
    text: e,
    language: t,
    readOnly: n,
    highlight: r,
    revealLine: i,
    lineNumbers: s,
    isFocused: o,
    focusOnChange: l,
    wrapLines: a,
    onChange: u,
  }) => {
    const [c, p] = vn(),
      [d] = L.useState(
        a0(
          () => import("./codeMirrorModule-31174191.js"),
          [
            "./codeMirrorModule-31174191.js",
            "../codeMirrorModule.5d0f417c.css",
          ],
          import.meta.url,
        ).then((w) => w.default),
      ),
      v = L.useRef(null),
      [y, x] = L.useState();
    return (
      L.useEffect(() => {
        (async () => {
          var _, k;
          const w = await d,
            h = p.current;
          if (!h) return;
          let f = "";
          if (
            (t === "javascript" && (f = "javascript"),
            t === "python" && (f = "python"),
            t === "java" && (f = "text/x-java"),
            t === "csharp" && (f = "text/x-csharp"),
            t === "html" && (f = "htmlmixed"),
            t === "css" && (f = "css"),
            v.current &&
              f === v.current.cm.getOption("mode") &&
              !!n === v.current.cm.getOption("readOnly") &&
              s === v.current.cm.getOption("lineNumbers") &&
              a === v.current.cm.getOption("lineWrapping"))
          )
            return;
          (k = (_ = v.current) == null ? void 0 : _.cm) == null ||
            k.getWrapperElement().remove();
          const g = w(h, {
            value: "",
            mode: f,
            readOnly: !!n,
            lineNumbers: s,
            lineWrapping: a,
          });
          return (v.current = { cm: g }), o && g.focus(), x(g), g;
        })();
      }, [d, y, p, t, s, a, n, o]),
      L.useEffect(() => {
        v.current && v.current.cm.setSize(c.width, c.height);
      }, [c]),
      L.useLayoutEffect(() => {
        var f;
        if (!y) return;
        let w = !1;
        if (
          (y.getValue() !== e &&
            (y.setValue(e),
            (w = !0),
            l && (y.execCommand("selectAll"), y.focus())),
          w || JSON.stringify(r) !== JSON.stringify(v.current.highlight))
        ) {
          for (const _ of v.current.highlight || [])
            y.removeLineClass(_.line - 1, "wrap");
          for (const _ of r || [])
            y.addLineClass(_.line - 1, "wrap", `source-line-${_.type}`);
          for (const _ of v.current.widgets || []) y.removeLineWidget(_);
          const g = [];
          for (const _ of r || []) {
            if (_.type !== "error") continue;
            const k =
              (f = v.current) == null ? void 0 : f.cm.getLine(_.line - 1);
            if (k) {
              const C = document.createElement("div");
              (C.className = "source-line-error-underline"),
                (C.innerHTML = "&nbsp;".repeat(k.length || 1)),
                g.push(
                  y.addLineWidget(_.line, C, { above: !0, coverGutter: !1 }),
                );
            }
            const N = document.createElement("div");
            (N.innerHTML = ni(_.message || "")),
              (N.className = "source-line-error-widget"),
              g.push(
                y.addLineWidget(_.line, N, { above: !0, coverGutter: !1 }),
              );
          }
          (v.current.highlight = r), (v.current.widgets = g);
        }
        typeof i == "number" &&
          v.current.cm.lineCount() >= i &&
          y.scrollIntoView({ line: Math.max(0, i - 1), ch: 0 }, 50);
        let h;
        return (
          u && ((h = () => u(y.getValue())), y.on("change", h)),
          () => {
            h && y.off("change", h);
          }
        );
      }, [y, e, r, i, l, u]),
      m("div", { className: "cm-wrapper", ref: p })
    );
  },
  u0 = ({ resource: e, onClose: t }) => {
    const [n, r] = L.useState("request");
    return m(Nl, {
      dataTestId: "network-request-details",
      leftToolbar: [m(Xn, { icon: "close", title: "Close", onClick: t })],
      tabs: [
        {
          id: "request",
          title: "Request",
          render: () => m(c0, { resource: e }),
        },
        {
          id: "response",
          title: "Response",
          render: () => m(d0, { resource: e }),
        },
        { id: "body", title: "Body", render: () => m(f0, { resource: e }) },
      ],
      selectedTab: n,
      setSelectedTab: r,
    });
  },
  c0 = ({ resource: e }) => {
    const [t, n] = L.useState(null);
    return (
      L.useEffect(() => {
        (async () => {
          if (e.request.postData) {
            const i = e.request.headers.find((l) => l.name === "Content-Type"),
              s = i ? i.value : "",
              o = yh(s);
            if (e.request.postData._sha1) {
              const l = await fetch(`sha1/${e.request.postData._sha1}`);
              n({ text: Cl(await l.text(), s), language: o });
            } else n({ text: Cl(e.request.postData.text, s), language: o });
          }
        })();
      }, [e]),
      A("div", {
        className: "network-request-details-tab",
        children: [
          m("div", {
            className: "network-request-details-header",
            children: "URL",
          }),
          m("div", {
            className: "network-request-details-url",
            children: e.request.url,
          }),
          m("div", {
            className: "network-request-details-header",
            children: "Request Headers",
          }),
          m("div", {
            className: "network-request-details-headers",
            children: e.request.headers.map((r) => `${r.name}: ${r.value}`)
              .join(`
`),
          }),
          t &&
            m("div", {
              className: "network-request-details-header",
              children: "Request Body",
            }),
          t &&
            m(Xs, {
              text: t.text,
              language: t.language,
              readOnly: !0,
              lineNumbers: !0,
            }),
        ],
      })
    );
  },
  d0 = ({ resource: e }) =>
    A("div", {
      className: "network-request-details-tab",
      children: [
        m("div", {
          className: "network-request-details-header",
          children: "Response Headers",
        }),
        m("div", {
          className: "network-request-details-headers",
          children: e.response.headers.map((t) => `${t.name}: ${t.value}`)
            .join(`
`),
        }),
      ],
    }),
  f0 = ({ resource: e }) => {
    const [t, n] = L.useState(null);
    return (
      L.useEffect(() => {
        (async () => {
          if (e.response.content._sha1) {
            const i = e.response.content.mimeType.includes("image"),
              s = await fetch(`sha1/${e.response.content._sha1}`);
            if (i) {
              const o = await s.blob(),
                l = new FileReader(),
                a = new Promise((u) => (l.onload = u));
              l.readAsDataURL(o), n({ dataUrl: (await a).target.result });
            } else {
              const o = Cl(await s.text(), e.response.content.mimeType),
                l = yh(e.response.content.mimeType);
              n({ text: o, language: l });
            }
          }
        })();
      }, [e]),
      A("div", {
        className: "network-request-details-tab",
        children: [
          !e.response.content._sha1 &&
            m("div", {
              children: "Response body is not available for this request.",
            }),
          t && t.dataUrl && m("img", { draggable: "false", src: t.dataUrl }),
          t &&
            t.text &&
            m(Xs, {
              text: t.text,
              language: t.language,
              readOnly: !0,
              lineNumbers: !0,
            }),
        ],
      })
    );
  };
function Cl(e, t) {
  if (e === null) return "Loading...";
  const n = e;
  if (n === "") return "<Empty>";
  if (t.includes("application/json"))
    try {
      return JSON.stringify(JSON.parse(n), null, 2);
    } catch {
      return n;
    }
  return t.includes("application/x-www-form-urlencoded")
    ? decodeURIComponent(n)
    : n;
}
function yh(e) {
  if (e.includes("javascript") || e.includes("json")) return "javascript";
  if (e.includes("html")) return "html";
  if (e.includes("css")) return "css";
}
const wh = ({
    cursor: e,
    onPaneMouseMove: t,
    onPaneMouseUp: n,
    onPaneDoubleClick: r,
  }) => (
    Ft.useEffect(() => {
      const i = document.createElement("div");
      return (
        (i.style.position = "fixed"),
        (i.style.top = "0"),
        (i.style.right = "0"),
        (i.style.bottom = "0"),
        (i.style.left = "0"),
        (i.style.zIndex = "9999"),
        (i.style.cursor = e),
        document.body.appendChild(i),
        t && i.addEventListener("mousemove", t),
        n && i.addEventListener("mouseup", n),
        r && document.body.addEventListener("dblclick", r),
        () => {
          t && i.removeEventListener("mousemove", t),
            n && i.removeEventListener("mouseup", n),
            r && document.body.removeEventListener("dblclick", r),
            document.body.removeChild(i);
        }
      );
    }, [e, t, n, r]),
    m(at, {})
  ),
  h0 = { position: "absolute", top: 0, right: 0, bottom: 0, left: 0 },
  xh = ({
    orientation: e,
    offsets: t,
    setOffsets: n,
    resizerColor: r,
    resizerWidth: i,
    minColumnWidth: s,
  }) => {
    const o = s || 0,
      [l, a] = Ft.useState(null),
      [u, c] = vn(),
      p = {
        position: "absolute",
        right: e === "horizontal" ? void 0 : 0,
        bottom: e === "horizontal" ? 0 : void 0,
        width: e === "horizontal" ? 7 : void 0,
        height: e === "horizontal" ? void 0 : 7,
        borderTopWidth: e === "horizontal" ? void 0 : (7 - i) / 2,
        borderRightWidth: e === "horizontal" ? (7 - i) / 2 : void 0,
        borderBottomWidth: e === "horizontal" ? void 0 : (7 - i) / 2,
        borderLeftWidth: e === "horizontal" ? (7 - i) / 2 : void 0,
        borderColor: "transparent",
        borderStyle: "solid",
        cursor: e === "horizontal" ? "ew-resize" : "ns-resize",
      };
    return A("div", {
      style: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1e3,
        pointerEvents: "none",
      },
      ref: c,
      children: [
        !!l &&
          m(wh, {
            cursor: e === "horizontal" ? "ew-resize" : "ns-resize",
            onPaneMouseUp: () => a(null),
            onPaneMouseMove: (d) => {
              if (!d.buttons) a(null);
              else if (l) {
                const v =
                    e === "horizontal"
                      ? d.clientX - l.clientX
                      : d.clientY - l.clientY,
                  y = l.offset + v,
                  x = l.index > 0 ? t[l.index - 1] : 0,
                  w = e === "horizontal" ? u.width : u.height,
                  h = Math.min(Math.max(x + o, y), w - o) - t[l.index];
                for (let f = l.index; f < t.length; ++f) t[f] = t[f] + h;
                n([...t]);
              }
            },
          }),
        t.map((d, v) =>
          m("div", {
            style: {
              ...p,
              top: e === "horizontal" ? 0 : d,
              left: e === "horizontal" ? d : 0,
              pointerEvents: "initial",
            },
            onMouseDown: (y) =>
              a({
                clientX: y.clientX,
                clientY: y.clientY,
                offset: d,
                index: v,
              }),
            children: m("div", { style: { ...h0, background: r } }),
          }),
        ),
      ],
    });
  };
function p0(e) {
  const t = [];
  for (let s = 0; s < e.columns.length - 1; ++s) {
    const o = e.columns[s];
    t[s] = (t[s - 1] || 0) + e.columnWidth(o);
  }
  const [n, r] = L.useState(t),
    i = L.useCallback(
      (s) => {
        var o, l;
        (l = e.setSorting) == null ||
          l.call(e, {
            by: s,
            negate:
              ((o = e.sorting) == null ? void 0 : o.by) === s
                ? !e.sorting.negate
                : !1,
          });
      },
      [e],
    );
  return A("div", {
    className: "grid-view",
    children: [
      m(xh, {
        orientation: "horizontal",
        offsets: n,
        setOffsets: r,
        resizerColor: "var(--vscode-panel-border)",
        resizerWidth: 1,
        minColumnWidth: 25,
      }),
      A("div", {
        className: "vbox",
        children: [
          m("div", {
            className: "grid-view-header",
            children: e.columns.map((s, o) =>
              A("div", {
                className: "grid-view-header-cell " + m0(s, e.sorting),
                style: { width: n[o] - (n[o - 1] || 0) },
                onClick: () => e.setSorting && i(s),
                children: [
                  m("span", {
                    className: "grid-view-header-cell-title",
                    children: e.columnTitle(s),
                  }),
                  m("span", { className: "codicon codicon-triangle-up" }),
                  m("span", { className: "codicon codicon-triangle-down" }),
                ],
              }),
            ),
          }),
          m(ui, {
            name: e.name,
            items: e.items,
            id: e.id,
            render: (s, o) =>
              m(at, {
                children: e.columns.map((l, a) =>
                  m("div", {
                    className: "grid-view-cell",
                    style: { width: n[a] - (n[a - 1] || 0) },
                    children: e.render(s, l, o),
                  }),
                ),
              }),
            icon: e.icon,
            indent: e.indent,
            isError: e.isError,
            isWarning: e.isWarning,
            selectedItem: e.selectedItem,
            onAccepted: e.onAccepted,
            onSelected: e.onSelected,
            onLeftArrow: e.onLeftArrow,
            onRightArrow: e.onRightArrow,
            onHighlighted: e.onHighlighted,
            onIconClicked: e.onIconClicked,
            noItemsMessage: e.noItemsMessage,
            dataTestId: e.dataTestId,
            noHighlightOnHover: e.noHighlightOnHover,
          }),
        ],
      }),
    ],
  });
}
function m0(e, t) {
  return e === (t == null ? void 0 : t.by)
    ? " filter-" + (t.negate ? "negative" : "positive")
    : "";
}
const g0 = p0;
function v0(e, t) {
  return {
    resources: L.useMemo(
      () =>
        ((e == null ? void 0 : e.resources) || []).filter((s) =>
          t
            ? !!s._monotonicTime &&
              s._monotonicTime >= t.minimum &&
              s._monotonicTime <= t.maximum
            : !0,
        ),
      [e, t],
    ),
  };
}
const y0 = ({ boundaries: e, networkModel: t, onEntryHovered: n }) => {
    const [r, i] = L.useState(void 0),
      [s, o] = L.useState(void 0),
      { renderedEntries: l } = L.useMemo(() => {
        const u = t.resources.map((c) => S0(c, e));
        return r && k0(u, r), { renderedEntries: u };
      }, [t.resources, r, e]);
    if (!t.resources.length) return m(sr, { text: "No network calls" });
    const a = m(g0, {
      name: "network",
      items: l,
      selectedItem: s,
      onSelected: (u) => o(u),
      onHighlighted: (u) => n(u == null ? void 0 : u.resource),
      columns: s
        ? ["name"]
        : [
            "name",
            "method",
            "status",
            "contentType",
            "duration",
            "size",
            "start",
            "route",
          ],
      columnTitle: w0,
      columnWidth: (u) => (u === "name" ? 200 : 100),
      render: (u, c) => x0(u, c),
      sorting: r,
      setSorting: i,
    });
    return A(at, {
      children: [
        !s && a,
        s &&
          A(Es, {
            sidebarSize: 200,
            sidebarIsFirst: !0,
            orientation: "horizontal",
            children: [
              m(u0, { resource: s.resource, onClose: () => o(void 0) }),
              a,
            ],
          }),
      ],
    });
  },
  w0 = (e) =>
    e === "name"
      ? "Name"
      : e === "method"
        ? "Method"
        : e === "status"
          ? "Status"
          : e === "contentType"
            ? "Content Type"
            : e === "duration"
              ? "Duration"
              : e === "size"
                ? "Size"
                : e === "start"
                  ? "Start"
                  : e === "route"
                    ? "Route"
                    : "",
  x0 = (e, t) => {
    if (t === "name")
      return m("span", { title: e.name.url, children: e.name.name });
    if (t === "method") return m("span", { children: e.method });
    if (t === "status")
      return m("span", {
        className: e.status.className,
        title: e.status.text,
        children: e.status.code > 0 ? e.status.code : "",
      });
    if (t === "contentType") return m("span", { children: e.contentType });
    if (t === "duration") return m("span", { children: Ke(e.duration) });
    if (t === "size") return m("span", { children: Gp(e.size) });
    if (t === "start") return m("span", { children: Ke(e.start) });
    if (t === "route")
      return (
        e.route &&
        m("span", { className: `status-route ${e.route}`, children: e.route })
      );
  },
  S0 = (e, t) => {
    const n = E0(e);
    let r;
    try {
      const o = new URL(e.request.url);
      (r = o.pathname.substring(o.pathname.lastIndexOf("/") + 1)),
        r || (r = o.host);
    } catch {
      r = e.request.url;
    }
    let i = e.response.content.mimeType;
    const s = i.match(/^(.*);\s*charset=.*$/);
    return (
      s && (i = s[1]),
      {
        name: { name: r, url: e.request.url },
        method: e.request.method,
        status: {
          code: e.response.status,
          text: e.response.statusText,
          className: _0(e.response.status),
        },
        contentType: i,
        duration: e.time,
        size:
          e.response._transferSize > 0
            ? e.response._transferSize
            : e.response.bodySize,
        start: e._monotonicTime - t.minimum,
        route: n,
        resource: e,
      }
    );
  };
function _0(e) {
  return e >= 200 && e < 400
    ? "status-success"
    : e >= 400
      ? "status-failure"
      : "";
}
function E0(e) {
  return e._wasAborted
    ? "aborted"
    : e._wasContinued
      ? "continued"
      : e._wasFulfilled
        ? "fulfilled"
        : e._apiRequest
          ? "api"
          : "";
}
function k0(e, t) {
  const n = T0(t == null ? void 0 : t.by);
  n && e.sort(n), t.negate && e.reverse();
}
function T0(e) {
  if (e === "start") return (t, n) => t.start - n.start;
  if (e === "duration") return (t, n) => t.duration - n.duration;
  if (e === "status") return (t, n) => t.status.code - n.status.code;
  if (e === "method")
    return (t, n) => {
      const r = t.method,
        i = n.method;
      return r.localeCompare(i);
    };
  if (e === "size") return (t, n) => t.size - n.size;
  if (e === "contentType")
    return (t, n) => t.contentType.localeCompare(n.contentType);
  if (e === "name") return (t, n) => t.name.name.localeCompare(n.name.name);
  if (e === "route") return (t, n) => t.route.localeCompare(n.route);
}
const oc = {
  queryAll(e, t) {
    t.startsWith("/") && e.nodeType !== Node.DOCUMENT_NODE && (t = "." + t);
    const n = [],
      r = e.ownerDocument || e;
    if (!r) return n;
    const i = r.evaluate(t, e, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
    for (let s = i.iterateNext(); s; s = i.iterateNext())
      s.nodeType === Node.ELEMENT_NODE && n.push(s);
    return n;
  },
};
let Sh = "";
function N0(e) {
  Sh = e;
}
function Qs(e, t) {
  for (; t; ) {
    if (e.contains(t)) return !0;
    t = Eh(t);
  }
  return !1;
}
function ke(e) {
  if (e.parentElement) return e.parentElement;
  if (e.parentNode && e.parentNode.nodeType === 11 && e.parentNode.host)
    return e.parentNode.host;
}
function _h(e) {
  let t = e;
  for (; t.parentNode; ) t = t.parentNode;
  if (t.nodeType === 11 || t.nodeType === 9) return t;
}
function Eh(e) {
  for (; e.parentElement; ) e = e.parentElement;
  return ke(e);
}
function Cr(e, t, n) {
  for (; e; ) {
    const r = e.closest(t);
    if (n && r !== n && r != null && r.contains(n)) return;
    if (r) return r;
    e = Eh(e);
  }
}
function un(e, t) {
  return e.ownerDocument && e.ownerDocument.defaultView
    ? e.ownerDocument.defaultView.getComputedStyle(e, t)
    : void 0;
}
function kh(e, t) {
  if (((t = t ?? un(e)), !t)) return !0;
  if (Element.prototype.checkVisibility && Sh !== "webkit") {
    if (!e.checkVisibility({ checkOpacity: !1, checkVisibilityCSS: !1 }))
      return !1;
  } else {
    const n = e.closest("details,summary");
    if (n !== e && (n == null ? void 0 : n.nodeName) === "DETAILS" && !n.open)
      return !1;
  }
  return t.visibility === "visible";
}
function Ns(e) {
  const t = un(e);
  if (!t) return !0;
  if (t.display === "contents") {
    for (let r = e.firstChild; r; r = r.nextSibling)
      if ((r.nodeType === 1 && Ns(r)) || (r.nodeType === 3 && Th(r))) return !0;
    return !1;
  }
  if (!kh(e, t)) return !1;
  const n = e.getBoundingClientRect();
  return n.width > 0 && n.height > 0;
}
function Th(e) {
  const t = e.ownerDocument.createRange();
  t.selectNode(e);
  const n = t.getBoundingClientRect();
  return n.width > 0 && n.height > 0;
}
function lc(e) {
  return e.hasAttribute("aria-label") || e.hasAttribute("aria-labelledby");
}
const ac =
    "article:not([role]), aside:not([role]), main:not([role]), nav:not([role]), section:not([role]), [role=article], [role=complementary], [role=main], [role=navigation], [role=region]",
  C0 = [
    "aria-atomic",
    "aria-busy",
    "aria-controls",
    "aria-current",
    "aria-describedby",
    "aria-details",
    "aria-disabled",
    "aria-dropeffect",
    "aria-errormessage",
    "aria-flowto",
    "aria-grabbed",
    "aria-haspopup",
    "aria-hidden",
    "aria-invalid",
    "aria-keyshortcuts",
    "aria-label",
    "aria-labelledby",
    "aria-live",
    "aria-owns",
    "aria-relevant",
    "aria-roledescription",
  ];
function Nh(e) {
  return C0.some((t) => e.hasAttribute(t));
}
const ko = {
    A: (e) => (e.hasAttribute("href") ? "link" : null),
    AREA: (e) => (e.hasAttribute("href") ? "link" : null),
    ARTICLE: () => "article",
    ASIDE: () => "complementary",
    BLOCKQUOTE: () => "blockquote",
    BUTTON: () => "button",
    CAPTION: () => "caption",
    CODE: () => "code",
    DATALIST: () => "listbox",
    DD: () => "definition",
    DEL: () => "deletion",
    DETAILS: () => "group",
    DFN: () => "term",
    DIALOG: () => "dialog",
    DT: () => "term",
    EM: () => "emphasis",
    FIELDSET: () => "group",
    FIGURE: () => "figure",
    FOOTER: (e) => (Cr(e, ac) ? null : "contentinfo"),
    FORM: (e) => (lc(e) ? "form" : null),
    H1: () => "heading",
    H2: () => "heading",
    H3: () => "heading",
    H4: () => "heading",
    H5: () => "heading",
    H6: () => "heading",
    HEADER: (e) => (Cr(e, ac) ? null : "banner"),
    HR: () => "separator",
    HTML: () => "document",
    IMG: (e) =>
      e.getAttribute("alt") === "" &&
      !Nh(e) &&
      Number.isNaN(Number(String(e.getAttribute("tabindex"))))
        ? "presentation"
        : "img",
    INPUT: (e) => {
      const t = e.type.toLowerCase();
      if (t === "search")
        return e.hasAttribute("list") ? "combobox" : "searchbox";
      if (["email", "tel", "text", "url", ""].includes(t)) {
        const n = Ks(e, e.getAttribute("list"))[0];
        return n && n.tagName === "DATALIST" ? "combobox" : "textbox";
      }
      return t === "hidden"
        ? ""
        : {
            button: "button",
            checkbox: "checkbox",
            image: "button",
            number: "spinbutton",
            radio: "radio",
            range: "slider",
            reset: "button",
            submit: "button",
          }[t] || "textbox";
    },
    INS: () => "insertion",
    LI: () => "listitem",
    MAIN: () => "main",
    MARK: () => "mark",
    MATH: () => "math",
    MENU: () => "list",
    METER: () => "meter",
    NAV: () => "navigation",
    OL: () => "list",
    OPTGROUP: () => "group",
    OPTION: () => "option",
    OUTPUT: () => "status",
    P: () => "paragraph",
    PROGRESS: () => "progressbar",
    SECTION: (e) => (lc(e) ? "region" : null),
    SELECT: (e) =>
      e.hasAttribute("multiple") || e.size > 1 ? "listbox" : "combobox",
    STRONG: () => "strong",
    SUB: () => "subscript",
    SUP: () => "superscript",
    SVG: () => "img",
    TABLE: () => "table",
    TBODY: () => "rowgroup",
    TD: (e) => {
      const t = Cr(e, "table"),
        n = t ? Cs(t) : "";
      return n === "grid" || n === "treegrid" ? "gridcell" : "cell";
    },
    TEXTAREA: () => "textbox",
    TFOOT: () => "rowgroup",
    TH: (e) => {
      if (e.getAttribute("scope") === "col") return "columnheader";
      if (e.getAttribute("scope") === "row") return "rowheader";
      const t = Cr(e, "table"),
        n = t ? Cs(t) : "";
      return n === "grid" || n === "treegrid" ? "gridcell" : "cell";
    },
    THEAD: () => "rowgroup",
    TIME: () => "time",
    TR: () => "row",
    UL: () => "list",
  },
  b0 = {
    DD: ["DL", "DIV"],
    DIV: ["DL"],
    DT: ["DL", "DIV"],
    LI: ["OL", "UL"],
    TBODY: ["TABLE"],
    TD: ["TR"],
    TFOOT: ["TABLE"],
    TH: ["TR"],
    THEAD: ["TABLE"],
    TR: ["THEAD", "TBODY", "TFOOT", "TABLE"],
  };
function uc(e) {
  var r;
  const t =
    ((r = ko[e.tagName.toUpperCase()]) == null ? void 0 : r.call(ko, e)) || "";
  if (!t) return null;
  let n = e;
  for (; n; ) {
    const i = ke(n),
      s = b0[n.tagName];
    if (!s || !i || !s.includes(i.tagName)) break;
    const o = Cs(i);
    if ((o === "none" || o === "presentation") && !Ch(i)) return o;
    n = i;
  }
  return t;
}
const L0 = [
    "alert",
    "alertdialog",
    "application",
    "article",
    "banner",
    "blockquote",
    "button",
    "caption",
    "cell",
    "checkbox",
    "code",
    "columnheader",
    "combobox",
    "command",
    "complementary",
    "composite",
    "contentinfo",
    "definition",
    "deletion",
    "dialog",
    "directory",
    "document",
    "emphasis",
    "feed",
    "figure",
    "form",
    "generic",
    "grid",
    "gridcell",
    "group",
    "heading",
    "img",
    "input",
    "insertion",
    "landmark",
    "link",
    "list",
    "listbox",
    "listitem",
    "log",
    "main",
    "marquee",
    "math",
    "meter",
    "menu",
    "menubar",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "navigation",
    "none",
    "note",
    "option",
    "paragraph",
    "presentation",
    "progressbar",
    "radio",
    "radiogroup",
    "range",
    "region",
    "roletype",
    "row",
    "rowgroup",
    "rowheader",
    "scrollbar",
    "search",
    "searchbox",
    "section",
    "sectionhead",
    "select",
    "separator",
    "slider",
    "spinbutton",
    "status",
    "strong",
    "structure",
    "subscript",
    "superscript",
    "switch",
    "tab",
    "table",
    "tablist",
    "tabpanel",
    "term",
    "textbox",
    "time",
    "timer",
    "toolbar",
    "tooltip",
    "tree",
    "treegrid",
    "treeitem",
    "widget",
    "window",
  ],
  A0 = [
    "command",
    "composite",
    "input",
    "landmark",
    "range",
    "roletype",
    "section",
    "sectionhead",
    "select",
    "structure",
    "widget",
    "window",
  ],
  M0 = L0.filter((e) => !A0.includes(e));
function Cs(e) {
  return (
    (e.getAttribute("role") || "")
      .split(" ")
      .map((n) => n.trim())
      .find((n) => M0.includes(n)) || null
  );
}
function Ch(e) {
  return !Nh(e);
}
function De(e) {
  const t = Cs(e);
  return !t || ((t === "none" || t === "presentation") && Ch(e)) ? uc(e) : t;
}
function bh(e) {
  return e === null ? void 0 : e.toLowerCase() === "true";
}
function Ma(e) {
  if (["STYLE", "SCRIPT", "NOSCRIPT", "TEMPLATE"].includes(e.tagName))
    return !0;
  const t = un(e),
    n = e.nodeName === "SLOT";
  if ((t == null ? void 0 : t.display) === "contents" && !n) {
    for (let i = e.firstChild; i; i = i.nextSibling)
      if ((i.nodeType === 1 && !Ma(i)) || (i.nodeType === 3 && Th(i)))
        return !1;
    return !0;
  }
  return !(e.nodeName === "OPTION" && !!e.closest("select")) && !n && !kh(e, t)
    ? !0
    : Lh(e);
}
function Lh(e) {
  let t = Rt == null ? void 0 : Rt.get(e);
  if (t === void 0) {
    if (
      ((t = !1),
      e.parentElement &&
        e.parentElement.shadowRoot &&
        !e.assignedSlot &&
        (t = !0),
      !t)
    ) {
      const n = un(e);
      t =
        !n || n.display === "none" || bh(e.getAttribute("aria-hidden")) === !0;
    }
    if (!t) {
      const n = ke(e);
      n && (t = Lh(n));
    }
    Rt == null || Rt.set(e, t);
  }
  return t;
}
function Ks(e, t) {
  if (!t) return [];
  const n = _h(e);
  if (!n) return [];
  try {
    const r = t.split(" ").filter((s) => !!s),
      i = new Set();
    for (const s of r) {
      const o = n.querySelector("#" + CSS.escape(s));
      o && i.add(o);
    }
    return [...i];
  } catch {
    return [];
  }
}
function P0(e) {
  return e
    .replace(
      /\r\n/g,
      `
`,
    )
    .replace(/\u00A0/g, " ")
    .replace(/\s\s+/g, " ")
    .trim();
}
function cc(e, t) {
  const n = [...e.querySelectorAll(t)];
  for (const r of Ks(e, e.getAttribute("aria-owns")))
    r.matches(t) && n.push(r), n.push(...r.querySelectorAll(t));
  return n;
}
function dc(e) {
  if (!e) return "";
  const t = e.content;
  if (
    (t[0] === "'" && t[t.length - 1] === "'") ||
    (t[0] === '"' && t[t.length - 1] === '"')
  ) {
    const n = t.substring(1, t.length - 1);
    return (e.display || "inline") !== "inline" ? " " + n + " " : n;
  }
  return "";
}
function Ah(e) {
  const t = e.getAttribute("aria-labelledby");
  return t === null ? null : Ks(e, t);
}
function I0(e, t) {
  const n = [
      "button",
      "cell",
      "checkbox",
      "columnheader",
      "gridcell",
      "heading",
      "link",
      "menuitem",
      "menuitemcheckbox",
      "menuitemradio",
      "option",
      "radio",
      "row",
      "rowheader",
      "switch",
      "tab",
      "tooltip",
      "treeitem",
    ].includes(e),
    r =
      t &&
      [
        "",
        "caption",
        "code",
        "contentinfo",
        "definition",
        "deletion",
        "emphasis",
        "insertion",
        "list",
        "listitem",
        "mark",
        "none",
        "paragraph",
        "presentation",
        "region",
        "row",
        "rowgroup",
        "section",
        "strong",
        "subscript",
        "superscript",
        "table",
        "term",
        "time",
      ].includes(e);
  return n || r;
}
function Pa(e, t) {
  const n = t ? Ra : Ia;
  let r = n == null ? void 0 : n.get(e);
  return (
    r === void 0 &&
      ((r = ""),
      [
        "caption",
        "code",
        "definition",
        "deletion",
        "emphasis",
        "generic",
        "insertion",
        "mark",
        "paragraph",
        "presentation",
        "strong",
        "subscript",
        "suggestion",
        "superscript",
        "term",
        "time",
      ].includes(De(e) || "") ||
        (r = P0(
          St(e, {
            includeHidden: t,
            visitedElements: new Set(),
            embeddedInLabelledBy: "none",
            embeddedInLabel: "none",
            embeddedInTextAlternativeElement: !1,
            embeddedInTargetElement: "self",
          }),
        )),
      n == null || n.set(e, r)),
    r
  );
}
function St(e, t) {
  if (t.visitedElements.has(e)) return "";
  const n = {
    ...t,
    embeddedInLabel:
      t.embeddedInLabel === "self" ? "descendant" : t.embeddedInLabel,
    embeddedInLabelledBy:
      t.embeddedInLabelledBy === "self" ? "descendant" : t.embeddedInLabelledBy,
    embeddedInTargetElement:
      t.embeddedInTargetElement === "self"
        ? "descendant"
        : t.embeddedInTargetElement,
  };
  if (!t.includeHidden && t.embeddedInLabelledBy !== "self" && Ma(e))
    return t.visitedElements.add(e), "";
  const r = Ah(e);
  if (t.embeddedInLabelledBy === "none") {
    const o = (r || [])
      .map((l) =>
        St(l, {
          ...t,
          embeddedInLabelledBy: "self",
          embeddedInTargetElement: "none",
          embeddedInLabel: "none",
          embeddedInTextAlternativeElement: !1,
        }),
      )
      .join(" ");
    if (o) return o;
  }
  const i = De(e) || "";
  if (t.embeddedInLabel !== "none" || t.embeddedInLabelledBy !== "none") {
    const o = [...(e.labels || [])].includes(e),
      l = (r || []).includes(e);
    if (!o && !l) {
      if (i === "textbox")
        return (
          t.visitedElements.add(e),
          e.tagName === "INPUT" || e.tagName === "TEXTAREA"
            ? e.value
            : e.textContent || ""
        );
      if (["combobox", "listbox"].includes(i)) {
        t.visitedElements.add(e);
        let a;
        if (e.tagName === "SELECT")
          (a = [...e.selectedOptions]),
            !a.length && e.options.length && a.push(e.options[0]);
        else {
          const u =
            i === "combobox" ? cc(e, "*").find((c) => De(c) === "listbox") : e;
          a = u
            ? cc(u, '[aria-selected="true"]').filter((c) => De(c) === "option")
            : [];
        }
        return a.map((u) => St(u, n)).join(" ");
      }
      if (
        ["progressbar", "scrollbar", "slider", "spinbutton", "meter"].includes(
          i,
        )
      )
        return (
          t.visitedElements.add(e),
          e.hasAttribute("aria-valuetext")
            ? e.getAttribute("aria-valuetext") || ""
            : e.hasAttribute("aria-valuenow")
              ? e.getAttribute("aria-valuenow") || ""
              : e.getAttribute("value") || ""
        );
      if (["menu"].includes(i)) return t.visitedElements.add(e), "";
    }
  }
  const s = e.getAttribute("aria-label") || "";
  if (s.trim()) return t.visitedElements.add(e), s;
  if (!["presentation", "none"].includes(i)) {
    if (
      e.tagName === "INPUT" &&
      ["button", "submit", "reset"].includes(e.type)
    ) {
      t.visitedElements.add(e);
      const o = e.value || "";
      return o.trim()
        ? o
        : e.type === "submit"
          ? "Submit"
          : e.type === "reset"
            ? "Reset"
            : e.getAttribute("title") || "";
    }
    if (e.tagName === "INPUT" && e.type === "image") {
      t.visitedElements.add(e);
      const o = e.labels || [];
      if (o.length && t.embeddedInLabelledBy === "none") return Ai(o, t);
      const l = e.getAttribute("alt") || "";
      if (l.trim()) return l;
      const a = e.getAttribute("title") || "";
      return a.trim() ? a : "Submit";
    }
    if (!r && e.tagName === "BUTTON") {
      t.visitedElements.add(e);
      const o = e.labels || [];
      if (o.length) return Ai(o, t);
    }
    if (!r && e.tagName === "OUTPUT") {
      t.visitedElements.add(e);
      const o = e.labels || [];
      return o.length ? Ai(o, t) : e.getAttribute("title") || "";
    }
    if (
      !r &&
      (e.tagName === "TEXTAREA" ||
        e.tagName === "SELECT" ||
        e.tagName === "INPUT")
    ) {
      t.visitedElements.add(e);
      const o = e.labels || [];
      if (o.length) return Ai(o, t);
      const l =
          (e.tagName === "INPUT" &&
            ["text", "password", "search", "tel", "email", "url"].includes(
              e.type,
            )) ||
          e.tagName === "TEXTAREA",
        a = e.getAttribute("placeholder") || "",
        u = e.getAttribute("title") || "";
      return !l || u ? u : a;
    }
    if (!r && e.tagName === "FIELDSET") {
      t.visitedElements.add(e);
      for (let l = e.firstElementChild; l; l = l.nextElementSibling)
        if (l.tagName === "LEGEND")
          return St(l, { ...n, embeddedInTextAlternativeElement: !0 });
      return e.getAttribute("title") || "";
    }
    if (!r && e.tagName === "FIGURE") {
      t.visitedElements.add(e);
      for (let l = e.firstElementChild; l; l = l.nextElementSibling)
        if (l.tagName === "FIGCAPTION")
          return St(l, { ...n, embeddedInTextAlternativeElement: !0 });
      return e.getAttribute("title") || "";
    }
    if (e.tagName === "IMG") {
      t.visitedElements.add(e);
      const o = e.getAttribute("alt") || "";
      return o.trim() ? o : e.getAttribute("title") || "";
    }
    if (e.tagName === "TABLE") {
      t.visitedElements.add(e);
      for (let l = e.firstElementChild; l; l = l.nextElementSibling)
        if (l.tagName === "CAPTION")
          return St(l, { ...n, embeddedInTextAlternativeElement: !0 });
      const o = e.getAttribute("summary") || "";
      if (o) return o;
    }
    if (e.tagName === "AREA") {
      t.visitedElements.add(e);
      const o = e.getAttribute("alt") || "";
      return o.trim() ? o : e.getAttribute("title") || "";
    }
    if (e.tagName.toUpperCase() === "SVG" || e.ownerSVGElement) {
      t.visitedElements.add(e);
      for (let o = e.firstElementChild; o; o = o.nextElementSibling)
        if (o.tagName.toUpperCase() === "TITLE" && o.ownerSVGElement)
          return St(o, { ...n, embeddedInLabelledBy: "self" });
    }
    if (e.ownerSVGElement && e.tagName.toUpperCase() === "A") {
      const o = e.getAttribute("xlink:title") || "";
      if (o.trim()) return t.visitedElements.add(e), o;
    }
  }
  if (
    I0(i, t.embeddedInTargetElement === "descendant") ||
    t.embeddedInLabelledBy !== "none" ||
    t.embeddedInLabel !== "none" ||
    t.embeddedInTextAlternativeElement
  ) {
    t.visitedElements.add(e);
    const o = [],
      l = (c, p) => {
        var d;
        if (!(p && c.assignedSlot))
          if (c.nodeType === 1) {
            const v = ((d = un(c)) == null ? void 0 : d.display) || "inline";
            let y = St(c, n);
            (v !== "inline" || c.nodeName === "BR") && (y = " " + y + " "),
              o.push(y);
          } else c.nodeType === 3 && o.push(c.textContent || "");
      };
    o.push(dc(un(e, "::before")));
    const a = e.nodeName === "SLOT" ? e.assignedNodes() : [];
    if (a.length) for (const c of a) l(c, !1);
    else {
      for (let c = e.firstChild; c; c = c.nextSibling) l(c, !0);
      if (e.shadowRoot)
        for (let c = e.shadowRoot.firstChild; c; c = c.nextSibling) l(c, !0);
      for (const c of Ks(e, e.getAttribute("aria-owns"))) l(c, !0);
    }
    o.push(dc(un(e, "::after")));
    const u = o.join("");
    if (u.trim()) return u;
  }
  if (!["presentation", "none"].includes(i) || e.tagName === "IFRAME") {
    t.visitedElements.add(e);
    const o = e.getAttribute("title") || "";
    if (o.trim()) return o;
  }
  return t.visitedElements.add(e), "";
}
const Mh = [
  "gridcell",
  "option",
  "row",
  "tab",
  "rowheader",
  "columnheader",
  "treeitem",
];
function R0(e) {
  return e.tagName === "OPTION"
    ? e.selected
    : Mh.includes(De(e) || "")
      ? bh(e.getAttribute("aria-selected")) === !0
      : !1;
}
const Ph = [
  "checkbox",
  "menuitemcheckbox",
  "option",
  "radio",
  "switch",
  "menuitemradio",
  "treeitem",
];
function $0(e) {
  const t = Ih(e, !0);
  return t === "error" ? !1 : t;
}
function Ih(e, t) {
  if (t && e.tagName === "INPUT" && e.indeterminate) return "mixed";
  if (e.tagName === "INPUT" && ["checkbox", "radio"].includes(e.type))
    return e.checked;
  if (Ph.includes(De(e) || "")) {
    const n = e.getAttribute("aria-checked");
    return n === "true" ? !0 : t && n === "mixed" ? "mixed" : !1;
  }
  return "error";
}
const Rh = ["button"];
function O0(e) {
  if (Rh.includes(De(e) || "")) {
    const t = e.getAttribute("aria-pressed");
    if (t === "true") return !0;
    if (t === "mixed") return "mixed";
  }
  return !1;
}
const $h = [
  "application",
  "button",
  "checkbox",
  "combobox",
  "gridcell",
  "link",
  "listbox",
  "menuitem",
  "row",
  "rowheader",
  "tab",
  "treeitem",
  "columnheader",
  "menuitemcheckbox",
  "menuitemradio",
  "rowheader",
  "switch",
];
function z0(e) {
  if (e.tagName === "DETAILS") return e.open;
  if ($h.includes(De(e) || "")) {
    const t = e.getAttribute("aria-expanded");
    return t === null ? "none" : t === "true";
  }
  return "none";
}
const Oh = ["heading", "listitem", "row", "treeitem"];
function D0(e) {
  const t = { H1: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6 }[e.tagName];
  if (t) return t;
  if (Oh.includes(De(e) || "")) {
    const n = e.getAttribute("aria-level"),
      r = n === null ? Number.NaN : Number(n);
    if (Number.isInteger(r) && r >= 1) return r;
  }
  return 0;
}
const H0 = [
  "application",
  "button",
  "composite",
  "gridcell",
  "group",
  "input",
  "link",
  "menuitem",
  "scrollbar",
  "separator",
  "tab",
  "checkbox",
  "columnheader",
  "combobox",
  "grid",
  "listbox",
  "menu",
  "menubar",
  "menuitemcheckbox",
  "menuitemradio",
  "option",
  "radio",
  "radiogroup",
  "row",
  "rowheader",
  "searchbox",
  "select",
  "slider",
  "spinbutton",
  "switch",
  "tablist",
  "textbox",
  "toolbar",
  "tree",
  "treegrid",
  "treeitem",
];
function zh(e) {
  return [
    "BUTTON",
    "INPUT",
    "SELECT",
    "TEXTAREA",
    "OPTION",
    "OPTGROUP",
  ].includes(e.tagName) &&
    (e.hasAttribute("disabled") || Dh(e))
    ? !0
    : Hh(e);
}
function Dh(e) {
  return e
    ? e.tagName === "FIELDSET" && e.hasAttribute("disabled")
      ? !0
      : Dh(e.parentElement)
    : !1;
}
function Hh(e) {
  if (!e) return !1;
  if (H0.includes(De(e) || "")) {
    const t = (e.getAttribute("aria-disabled") || "").toLowerCase();
    if (t === "true") return !0;
    if (t === "false") return !1;
  }
  return Hh(ke(e));
}
function Ai(e, t) {
  return [...e]
    .map((n) =>
      St(n, {
        ...t,
        embeddedInLabel: "self",
        embeddedInTextAlternativeElement: !1,
        embeddedInLabelledBy: "none",
        embeddedInTargetElement: "none",
      }),
    )
    .filter((n) => !!n)
    .join(" ");
}
let Ia,
  Ra,
  Rt,
  Fh = 0;
function Uh() {
  ++Fh, Ia ?? (Ia = new Map()), Ra ?? (Ra = new Map()), Rt ?? (Rt = new Map());
}
function Vh() {
  --Fh || ((Ia = void 0), (Ra = void 0), (Rt = void 0));
}
function Bh(e, t) {
  for (const n of t.jsonPath) e != null && (e = e[n]);
  return jh(e, t);
}
function jh(e, t) {
  const n = typeof e == "string" && !t.caseSensitive ? e.toUpperCase() : e,
    r =
      typeof t.value == "string" && !t.caseSensitive
        ? t.value.toUpperCase()
        : t.value;
  return t.op === "<truthy>"
    ? !!n
    : t.op === "="
      ? r instanceof RegExp
        ? typeof n == "string" && !!n.match(r)
        : n === r
      : typeof n != "string" || typeof r != "string"
        ? !1
        : t.op === "*="
          ? n.includes(r)
          : t.op === "^="
            ? n.startsWith(r)
            : t.op === "$="
              ? n.endsWith(r)
              : t.op === "|="
                ? n === r || n.startsWith(r + "-")
                : t.op === "~="
                  ? n.split(" ").includes(r)
                  : !1;
}
function $a(e) {
  const t = e.ownerDocument;
  return (
    e.nodeName === "SCRIPT" ||
    e.nodeName === "NOSCRIPT" ||
    e.nodeName === "STYLE" ||
    (t.head && t.head.contains(e))
  );
}
function we(e, t) {
  let n = e.get(t);
  if (n === void 0) {
    if (((n = { full: "", immediate: [] }), !$a(t))) {
      let r = "";
      if (
        t instanceof HTMLInputElement &&
        (t.type === "submit" || t.type === "button")
      )
        n = { full: t.value, immediate: [t.value] };
      else {
        for (let i = t.firstChild; i; i = i.nextSibling)
          i.nodeType === Node.TEXT_NODE
            ? ((n.full += i.nodeValue || ""), (r += i.nodeValue || ""))
            : (r && n.immediate.push(r),
              (r = ""),
              i.nodeType === Node.ELEMENT_NODE && (n.full += we(e, i).full));
        r && n.immediate.push(r),
          t.shadowRoot && (n.full += we(e, t.shadowRoot).full);
      }
    }
    e.set(t, n);
  }
  return n;
}
function Gs(e, t, n) {
  if ($a(t) || !n(we(e, t))) return "none";
  for (let r = t.firstChild; r; r = r.nextSibling)
    if (r.nodeType === Node.ELEMENT_NODE && n(we(e, r)))
      return "selfAndChildren";
  return t.shadowRoot && n(we(e, t.shadowRoot)) ? "selfAndChildren" : "self";
}
function Wh(e, t) {
  const n = Ah(t);
  if (n) return n.map((s) => we(e, s));
  const r = t.getAttribute("aria-label");
  if (r !== null && r.trim()) return [{ full: r, immediate: [r] }];
  const i = t.nodeName === "INPUT" && t.type !== "hidden";
  if (
    ["BUTTON", "METER", "OUTPUT", "PROGRESS", "SELECT", "TEXTAREA"].includes(
      t.nodeName,
    ) ||
    i
  ) {
    const s = t.labels;
    if (s) return [...s].map((o) => we(e, o));
  }
  return [];
}
function fc(e) {
  return e.displayName || e.name || "Anonymous";
}
function F0(e) {
  if (e.type)
    switch (typeof e.type) {
      case "function":
        return fc(e.type);
      case "string":
        return e.type;
      case "object":
        return e.type.displayName || (e.type.render ? fc(e.type.render) : "");
    }
  if (e._currentElement) {
    const t = e._currentElement.type;
    if (typeof t == "string") return t;
    if (typeof t == "function") return t.displayName || t.name || "Anonymous";
  }
  return "";
}
function U0(e) {
  var t;
  return e.key ?? ((t = e._currentElement) == null ? void 0 : t.key);
}
function V0(e) {
  if (e.child) {
    const n = [];
    for (let r = e.child; r; r = r.sibling) n.push(r);
    return n;
  }
  if (!e._currentElement) return [];
  const t = (n) => {
    var i;
    const r = (i = n._currentElement) == null ? void 0 : i.type;
    return typeof r == "function" || typeof r == "string";
  };
  if (e._renderedComponent) {
    const n = e._renderedComponent;
    return t(n) ? [n] : [];
  }
  return e._renderedChildren
    ? [...Object.values(e._renderedChildren)].filter(t)
    : [];
}
function B0(e) {
  var r;
  const t =
    e.memoizedProps || ((r = e._currentElement) == null ? void 0 : r.props);
  if (!t || typeof t == "string") return t;
  const n = { ...t };
  return delete n.children, n;
}
function qh(e) {
  var r;
  const t = {
      key: U0(e),
      name: F0(e),
      children: V0(e).map(qh),
      rootElements: [],
      props: B0(e),
    },
    n =
      e.stateNode ||
      e._hostNode ||
      ((r = e._renderedComponent) == null ? void 0 : r._hostNode);
  if (n instanceof Element) t.rootElements.push(n);
  else for (const i of t.children) t.rootElements.push(...i.rootElements);
  return t;
}
function Xh(e, t, n = []) {
  t(e) && n.push(e);
  for (const r of e.children) Xh(r, t, n);
  return n;
}
function Qh(e, t = []) {
  const r = (e.ownerDocument || e).createTreeWalker(e, NodeFilter.SHOW_ELEMENT);
  do {
    const i = r.currentNode,
      s = i,
      o = Object.keys(s).find(
        (a) => a.startsWith("__reactContainer") && s[a] !== null,
      );
    if (o) t.push(s[o].stateNode.current);
    else {
      const a = "_reactRootContainer";
      s.hasOwnProperty(a) &&
        s[a] !== null &&
        t.push(s[a]._internalRoot.current);
    }
    if (i instanceof Element && i.hasAttribute("data-reactroot"))
      for (const a of Object.keys(i))
        (a.startsWith("__reactInternalInstance") ||
          a.startsWith("__reactFiber")) &&
          t.push(i[a]);
    const l = i instanceof Element ? i.shadowRoot : null;
    l && Qh(l, t);
  } while (r.nextNode());
  return t;
}
const j0 = {
  queryAll(e, t) {
    const { name: n, attributes: r } = an(t, !1),
      o = Qh(e.ownerDocument || e)
        .map((a) => qh(a))
        .map((a) =>
          Xh(a, (u) => {
            const c = u.props ?? {};
            if (
              (u.key !== void 0 && (c.key = u.key),
              (n && u.name !== n) || u.rootElements.some((p) => !Qs(e, p)))
            )
              return !1;
            for (const p of r) if (!Bh(c, p)) return !1;
            return !0;
          }),
        )
        .flat(),
      l = new Set();
    for (const a of o) for (const u of a.rootElements) l.add(u);
    return [...l];
  },
};
function Kh(e, t) {
  const n = e.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/");
  let r = n.substring(n.lastIndexOf("/") + 1);
  return t && r.endsWith(t) && (r = r.substring(0, r.length - t.length)), r;
}
function W0(e, t) {
  return t ? t.toUpperCase() : "";
}
const q0 = /(?:^|[-_/])(\w)/g,
  Gh = (e) => e && e.replace(q0, W0);
function X0(e) {
  function t(c) {
    const p = c.name || c._componentTag || c.__playwright_guessedName;
    if (p) return p;
    const d = c.__file;
    if (d) return Gh(Kh(d, ".vue"));
  }
  function n(c, p) {
    return (c.type.__playwright_guessedName = p), p;
  }
  function r(c) {
    var d, v, y, x;
    const p = t(c.type || {});
    if (p) return p;
    if (c.root === c) return "Root";
    for (const w in (v = (d = c.parent) == null ? void 0 : d.type) == null
      ? void 0
      : v.components)
      if (((y = c.parent) == null ? void 0 : y.type.components[w]) === c.type)
        return n(c, w);
    for (const w in (x = c.appContext) == null ? void 0 : x.components)
      if (c.appContext.components[w] === c.type) return n(c, w);
    return "Anonymous Component";
  }
  function i(c) {
    return c._isBeingDestroyed || c.isUnmounted;
  }
  function s(c) {
    return c.subTree.type.toString() === "Symbol(Fragment)";
  }
  function o(c) {
    const p = [];
    return (
      c.component && p.push(c.component),
      c.suspense && p.push(...o(c.suspense.activeBranch)),
      Array.isArray(c.children) &&
        c.children.forEach((d) => {
          d.component ? p.push(d.component) : p.push(...o(d));
        }),
      p.filter((d) => {
        var v;
        return !i(d) && !((v = d.type.devtools) != null && v.hide);
      })
    );
  }
  function l(c) {
    return s(c) ? a(c.subTree) : [c.subTree.el];
  }
  function a(c) {
    if (!c.children) return [];
    const p = [];
    for (let d = 0, v = c.children.length; d < v; d++) {
      const y = c.children[d];
      y.component ? p.push(...l(y.component)) : y.el && p.push(y.el);
    }
    return p;
  }
  function u(c) {
    return {
      name: r(c),
      children: o(c.subTree).map(u),
      rootElements: l(c),
      props: c.props,
    };
  }
  return u(e);
}
function Q0(e) {
  function t(s) {
    const o = s.displayName || s.name || s._componentTag;
    if (o) return o;
    const l = s.__file;
    if (l) return Gh(Kh(l, ".vue"));
  }
  function n(s) {
    const o = t(s.$options || s.fnOptions || {});
    return o || (s.$root === s ? "Root" : "Anonymous Component");
  }
  function r(s) {
    return s.$children
      ? s.$children
      : Array.isArray(s.subTree.children)
        ? s.subTree.children
            .filter((o) => !!o.component)
            .map((o) => o.component)
        : [];
  }
  function i(s) {
    return {
      name: n(s),
      children: r(s).map(i),
      rootElements: [s.$el],
      props: s._props,
    };
  }
  return i(e);
}
function Yh(e, t, n = []) {
  t(e) && n.push(e);
  for (const r of e.children) Yh(r, t, n);
  return n;
}
function Jh(e, t = []) {
  const r = (e.ownerDocument || e).createTreeWalker(e, NodeFilter.SHOW_ELEMENT),
    i = new Set();
  do {
    const s = r.currentNode;
    s.__vue__ && i.add(s.__vue__.$root),
      s.__vue_app__ &&
        s._vnode &&
        s._vnode.component &&
        t.push({ root: s._vnode.component, version: 3 });
    const o = s instanceof Element ? s.shadowRoot : null;
    o && Jh(o, t);
  } while (r.nextNode());
  for (const s of i) t.push({ version: 2, root: s });
  return t;
}
const K0 = {
    queryAll(e, t) {
      const n = e.ownerDocument || e,
        { name: r, attributes: i } = an(t, !1),
        l = Jh(n)
          .map((u) => (u.version === 3 ? X0(u.root) : Q0(u.root)))
          .map((u) =>
            Yh(u, (c) => {
              if ((r && c.name !== r) || c.rootElements.some((p) => !Qs(e, p)))
                return !1;
              for (const p of i) if (!Bh(c.props, p)) return !1;
              return !0;
            }),
          )
          .flat(),
        a = new Set();
      for (const u of l) for (const c of u.rootElements) a.add(c);
      return [...a];
    },
  },
  Zh = [
    "selected",
    "checked",
    "pressed",
    "expanded",
    "level",
    "disabled",
    "name",
    "include-hidden",
  ];
Zh.sort();
function wr(e, t, n) {
  if (!t.includes(n))
    throw new Error(
      `"${e}" attribute is only supported for roles: ${t
        .slice()
        .sort()
        .map((r) => `"${r}"`)
        .join(", ")}`,
    );
}
function En(e, t) {
  if (e.op !== "<truthy>" && !t.includes(e.value))
    throw new Error(
      `"${e.name}" must be one of ${t.map((n) => JSON.stringify(n)).join(", ")}`,
    );
}
function kn(e, t) {
  if (!t.includes(e.op))
    throw new Error(`"${e.name}" does not support "${e.op}" matcher`);
}
function G0(e, t) {
  const n = { role: t };
  for (const r of e)
    switch (r.name) {
      case "checked": {
        wr(r.name, Ph, t),
          En(r, [!0, !1, "mixed"]),
          kn(r, ["<truthy>", "="]),
          (n.checked = r.op === "<truthy>" ? !0 : r.value);
        break;
      }
      case "pressed": {
        wr(r.name, Rh, t),
          En(r, [!0, !1, "mixed"]),
          kn(r, ["<truthy>", "="]),
          (n.pressed = r.op === "<truthy>" ? !0 : r.value);
        break;
      }
      case "selected": {
        wr(r.name, Mh, t),
          En(r, [!0, !1]),
          kn(r, ["<truthy>", "="]),
          (n.selected = r.op === "<truthy>" ? !0 : r.value);
        break;
      }
      case "expanded": {
        wr(r.name, $h, t),
          En(r, [!0, !1]),
          kn(r, ["<truthy>", "="]),
          (n.expanded = r.op === "<truthy>" ? !0 : r.value);
        break;
      }
      case "level": {
        if (
          (wr(r.name, Oh, t),
          typeof r.value == "string" && (r.value = +r.value),
          r.op !== "=" || typeof r.value != "number" || Number.isNaN(r.value))
        )
          throw new Error('"level" attribute must be compared to a number');
        n.level = r.value;
        break;
      }
      case "disabled": {
        En(r, [!0, !1]),
          kn(r, ["<truthy>", "="]),
          (n.disabled = r.op === "<truthy>" ? !0 : r.value);
        break;
      }
      case "name": {
        if (r.op === "<truthy>")
          throw new Error('"name" attribute must have a value');
        if (typeof r.value != "string" && !(r.value instanceof RegExp))
          throw new Error(
            '"name" attribute must be a string or a regular expression',
          );
        (n.name = r.value), (n.nameOp = r.op), (n.exact = r.caseSensitive);
        break;
      }
      case "include-hidden": {
        En(r, [!0, !1]),
          kn(r, ["<truthy>", "="]),
          (n.includeHidden = r.op === "<truthy>" ? !0 : r.value);
        break;
      }
      default:
        throw new Error(
          `Unknown attribute "${r.name}", must be one of ${Zh.map((i) => `"${i}"`).join(", ")}.`,
        );
    }
  return n;
}
function Y0(e, t, n) {
  const r = [],
    i = (o) => {
      if (
        De(o) === t.role &&
        !(t.selected !== void 0 && R0(o) !== t.selected) &&
        !(t.checked !== void 0 && $0(o) !== t.checked) &&
        !(t.pressed !== void 0 && O0(o) !== t.pressed) &&
        !(t.expanded !== void 0 && z0(o) !== t.expanded) &&
        !(t.level !== void 0 && D0(o) !== t.level) &&
        !(t.disabled !== void 0 && zh(o) !== t.disabled) &&
        !(!t.includeHidden && Ma(o))
      ) {
        if (t.name !== void 0) {
          const l = ce(Pa(o, !!t.includeHidden));
          if (
            (typeof t.name == "string" && (t.name = ce(t.name)),
            n && !t.exact && t.nameOp === "=" && (t.nameOp = "*="),
            !jh(l, {
              name: "",
              jsonPath: [],
              op: t.nameOp || "=",
              value: t.name,
              caseSensitive: !!t.exact,
            }))
          )
            return;
        }
        r.push(o);
      }
    },
    s = (o) => {
      const l = [];
      o.shadowRoot && l.push(o.shadowRoot);
      for (const a of o.querySelectorAll("*"))
        i(a), a.shadowRoot && l.push(a.shadowRoot);
      l.forEach(s);
    };
  return s(e), r;
}
function hc(e) {
  return {
    queryAll: (t, n) => {
      const r = an(n, !0),
        i = r.name.toLowerCase();
      if (!i) throw new Error("Role must not be empty");
      const s = G0(r.attributes, i);
      Uh();
      try {
        return Y0(t, s, e);
      } finally {
        Vh();
      }
    },
  };
}
function J0(e, t, n) {
  const r = e.left - t.right;
  if (!(r < 0 || (n !== void 0 && r > n)))
    return r + Math.max(t.bottom - e.bottom, 0) + Math.max(e.top - t.top, 0);
}
function Z0(e, t, n) {
  const r = t.left - e.right;
  if (!(r < 0 || (n !== void 0 && r > n)))
    return r + Math.max(t.bottom - e.bottom, 0) + Math.max(e.top - t.top, 0);
}
function ev(e, t, n) {
  const r = t.top - e.bottom;
  if (!(r < 0 || (n !== void 0 && r > n)))
    return r + Math.max(e.left - t.left, 0) + Math.max(t.right - e.right, 0);
}
function tv(e, t, n) {
  const r = e.top - t.bottom;
  if (!(r < 0 || (n !== void 0 && r > n)))
    return r + Math.max(e.left - t.left, 0) + Math.max(t.right - e.right, 0);
}
function nv(e, t, n) {
  const r = n === void 0 ? 50 : n;
  let i = 0;
  return (
    e.left - t.right >= 0 && (i += e.left - t.right),
    t.left - e.right >= 0 && (i += t.left - e.right),
    t.top - e.bottom >= 0 && (i += t.top - e.bottom),
    e.top - t.bottom >= 0 && (i += e.top - t.bottom),
    i > r ? void 0 : i
  );
}
const rv = ["left-of", "right-of", "above", "below", "near"];
function ep(e, t, n, r) {
  const i = t.getBoundingClientRect(),
    s = { "left-of": Z0, "right-of": J0, above: ev, below: tv, near: nv }[e];
  let o;
  for (const l of n) {
    if (l === t) continue;
    const a = s(i, l.getBoundingClientRect(), r);
    a !== void 0 && (o === void 0 || a < o) && (o = a);
  }
  return o;
}
class iv {
  constructor(t) {
    (this._engines = new Map()),
      (this._cacheQueryCSS = new Map()),
      (this._cacheMatches = new Map()),
      (this._cacheQuery = new Map()),
      (this._cacheMatchesSimple = new Map()),
      (this._cacheMatchesParents = new Map()),
      (this._cacheCallMatches = new Map()),
      (this._cacheCallQuery = new Map()),
      (this._cacheQuerySimple = new Map()),
      (this._cacheText = new Map()),
      (this._retainCacheCounter = 0);
    for (const [i, s] of t) this._engines.set(i, s);
    this._engines.set("not", lv),
      this._engines.set("is", br),
      this._engines.set("where", br),
      this._engines.set("has", sv),
      this._engines.set("scope", ov),
      this._engines.set("light", av),
      this._engines.set("visible", uv),
      this._engines.set("text", cv),
      this._engines.set("text-is", dv),
      this._engines.set("text-matches", fv),
      this._engines.set("has-text", hv),
      this._engines.set("right-of", xr("right-of")),
      this._engines.set("left-of", xr("left-of")),
      this._engines.set("above", xr("above")),
      this._engines.set("below", xr("below")),
      this._engines.set("near", xr("near")),
      this._engines.set("nth-match", pv);
    const n = [...this._engines.keys()];
    n.sort();
    const r = [...hh];
    if ((r.sort(), n.join("|") !== r.join("|")))
      throw new Error(
        `Please keep customCSSNames in sync with evaluator engines: ${n.join("|")} vs ${r.join("|")}`,
      );
  }
  begin() {
    ++this._retainCacheCounter;
  }
  end() {
    --this._retainCacheCounter,
      this._retainCacheCounter ||
        (this._cacheQueryCSS.clear(),
        this._cacheMatches.clear(),
        this._cacheQuery.clear(),
        this._cacheMatchesSimple.clear(),
        this._cacheMatchesParents.clear(),
        this._cacheCallMatches.clear(),
        this._cacheCallQuery.clear(),
        this._cacheQuerySimple.clear(),
        this._cacheText.clear());
  }
  _cached(t, n, r, i) {
    t.has(n) || t.set(n, []);
    const s = t.get(n),
      o = s.find((a) => r.every((u, c) => a.rest[c] === u));
    if (o) return o.result;
    const l = i();
    return s.push({ rest: r, result: l }), l;
  }
  _checkSelector(t) {
    if (
      !(
        typeof t == "object" &&
        t &&
        (Array.isArray(t) || ("simples" in t && t.simples.length))
      )
    )
      throw new Error(`Malformed selector "${t}"`);
    return t;
  }
  matches(t, n, r) {
    const i = this._checkSelector(n);
    this.begin();
    try {
      return this._cached(
        this._cacheMatches,
        t,
        [i, r.scope, r.pierceShadow, r.originalScope],
        () =>
          Array.isArray(i)
            ? this._matchesEngine(br, t, i, r)
            : (this._hasScopeClause(i) &&
                (r = this._expandContextForScopeMatching(r)),
              this._matchesSimple(
                t,
                i.simples[i.simples.length - 1].selector,
                r,
              )
                ? this._matchesParents(t, i, i.simples.length - 2, r)
                : !1),
      );
    } finally {
      this.end();
    }
  }
  query(t, n) {
    const r = this._checkSelector(n);
    this.begin();
    try {
      return this._cached(
        this._cacheQuery,
        r,
        [t.scope, t.pierceShadow, t.originalScope],
        () => {
          if (Array.isArray(r)) return this._queryEngine(br, t, r);
          this._hasScopeClause(r) &&
            (t = this._expandContextForScopeMatching(t));
          const i = this._scoreMap;
          this._scoreMap = new Map();
          let s = this._querySimple(
            t,
            r.simples[r.simples.length - 1].selector,
          );
          return (
            (s = s.filter((o) =>
              this._matchesParents(o, r, r.simples.length - 2, t),
            )),
            this._scoreMap.size &&
              s.sort((o, l) => {
                const a = this._scoreMap.get(o),
                  u = this._scoreMap.get(l);
                return a === u
                  ? 0
                  : a === void 0
                    ? 1
                    : u === void 0
                      ? -1
                      : a - u;
              }),
            (this._scoreMap = i),
            s
          );
        },
      );
    } finally {
      this.end();
    }
  }
  _markScore(t, n) {
    this._scoreMap && this._scoreMap.set(t, n);
  }
  _hasScopeClause(t) {
    return t.simples.some((n) =>
      n.selector.functions.some((r) => r.name === "scope"),
    );
  }
  _expandContextForScopeMatching(t) {
    if (t.scope.nodeType !== 1) return t;
    const n = ke(t.scope);
    return n
      ? { ...t, scope: n, originalScope: t.originalScope || t.scope }
      : t;
  }
  _matchesSimple(t, n, r) {
    return this._cached(
      this._cacheMatchesSimple,
      t,
      [n, r.scope, r.pierceShadow, r.originalScope],
      () => {
        if (t === r.scope || (n.css && !this._matchesCSS(t, n.css))) return !1;
        for (const i of n.functions)
          if (!this._matchesEngine(this._getEngine(i.name), t, i.args, r))
            return !1;
        return !0;
      },
    );
  }
  _querySimple(t, n) {
    return n.functions.length
      ? this._cached(
          this._cacheQuerySimple,
          n,
          [t.scope, t.pierceShadow, t.originalScope],
          () => {
            let r = n.css;
            const i = n.functions;
            r === "*" && i.length && (r = void 0);
            let s,
              o = -1;
            r !== void 0
              ? (s = this._queryCSS(t, r))
              : ((o = i.findIndex(
                  (l) => this._getEngine(l.name).query !== void 0,
                )),
                o === -1 && (o = 0),
                (s = this._queryEngine(
                  this._getEngine(i[o].name),
                  t,
                  i[o].args,
                )));
            for (let l = 0; l < i.length; l++) {
              if (l === o) continue;
              const a = this._getEngine(i[l].name);
              a.matches !== void 0 &&
                (s = s.filter((u) => this._matchesEngine(a, u, i[l].args, t)));
            }
            for (let l = 0; l < i.length; l++) {
              if (l === o) continue;
              const a = this._getEngine(i[l].name);
              a.matches === void 0 &&
                (s = s.filter((u) => this._matchesEngine(a, u, i[l].args, t)));
            }
            return s;
          },
        )
      : this._queryCSS(t, n.css || "*");
  }
  _matchesParents(t, n, r, i) {
    return r < 0
      ? !0
      : this._cached(
          this._cacheMatchesParents,
          t,
          [n, r, i.scope, i.pierceShadow, i.originalScope],
          () => {
            const { selector: s, combinator: o } = n.simples[r];
            if (o === ">") {
              const l = Mi(t, i);
              return !l || !this._matchesSimple(l, s, i)
                ? !1
                : this._matchesParents(l, n, r - 1, i);
            }
            if (o === "+") {
              const l = To(t, i);
              return !l || !this._matchesSimple(l, s, i)
                ? !1
                : this._matchesParents(l, n, r - 1, i);
            }
            if (o === "") {
              let l = Mi(t, i);
              for (; l; ) {
                if (this._matchesSimple(l, s, i)) {
                  if (this._matchesParents(l, n, r - 1, i)) return !0;
                  if (n.simples[r - 1].combinator === "") break;
                }
                l = Mi(l, i);
              }
              return !1;
            }
            if (o === "~") {
              let l = To(t, i);
              for (; l; ) {
                if (this._matchesSimple(l, s, i)) {
                  if (this._matchesParents(l, n, r - 1, i)) return !0;
                  if (n.simples[r - 1].combinator === "~") break;
                }
                l = To(l, i);
              }
              return !1;
            }
            if (o === ">=") {
              let l = t;
              for (; l; ) {
                if (this._matchesSimple(l, s, i)) {
                  if (this._matchesParents(l, n, r - 1, i)) return !0;
                  if (n.simples[r - 1].combinator === "") break;
                }
                l = Mi(l, i);
              }
              return !1;
            }
            throw new Error(`Unsupported combinator "${o}"`);
          },
        );
  }
  _matchesEngine(t, n, r, i) {
    if (t.matches) return this._callMatches(t, n, r, i);
    if (t.query) return this._callQuery(t, r, i).includes(n);
    throw new Error('Selector engine should implement "matches" or "query"');
  }
  _queryEngine(t, n, r) {
    if (t.query) return this._callQuery(t, r, n);
    if (t.matches)
      return this._queryCSS(n, "*").filter((i) =>
        this._callMatches(t, i, r, n),
      );
    throw new Error('Selector engine should implement "matches" or "query"');
  }
  _callMatches(t, n, r, i) {
    return this._cached(
      this._cacheCallMatches,
      n,
      [t, i.scope, i.pierceShadow, i.originalScope, ...r],
      () => t.matches(n, r, i, this),
    );
  }
  _callQuery(t, n, r) {
    return this._cached(
      this._cacheCallQuery,
      t,
      [r.scope, r.pierceShadow, r.originalScope, ...n],
      () => t.query(r, n, this),
    );
  }
  _matchesCSS(t, n) {
    return t.matches(n);
  }
  _queryCSS(t, n) {
    return this._cached(
      this._cacheQueryCSS,
      n,
      [t.scope, t.pierceShadow, t.originalScope],
      () => {
        let r = [];
        function i(s) {
          if (((r = r.concat([...s.querySelectorAll(n)])), !!t.pierceShadow)) {
            s.shadowRoot && i(s.shadowRoot);
            for (const o of s.querySelectorAll("*"))
              o.shadowRoot && i(o.shadowRoot);
          }
        }
        return i(t.scope), r;
      },
    );
  }
  _getEngine(t) {
    const n = this._engines.get(t);
    if (!n) throw new Error(`Unknown selector engine "${t}"`);
    return n;
  }
}
const br = {
    matches(e, t, n, r) {
      if (t.length === 0)
        throw new Error('"is" engine expects non-empty selector list');
      return t.some((i) => r.matches(e, i, n));
    },
    query(e, t, n) {
      if (t.length === 0)
        throw new Error('"is" engine expects non-empty selector list');
      let r = [];
      for (const i of t) r = r.concat(n.query(e, i));
      return t.length === 1 ? r : tp(r);
    },
  },
  sv = {
    matches(e, t, n, r) {
      if (t.length === 0)
        throw new Error('"has" engine expects non-empty selector list');
      return r.query({ ...n, scope: e }, t).length > 0;
    },
  },
  ov = {
    matches(e, t, n, r) {
      if (t.length !== 0)
        throw new Error('"scope" engine expects no arguments');
      const i = n.originalScope || n.scope;
      return i.nodeType === 9 ? e === i.documentElement : e === i;
    },
    query(e, t, n) {
      if (t.length !== 0)
        throw new Error('"scope" engine expects no arguments');
      const r = e.originalScope || e.scope;
      if (r.nodeType === 9) {
        const i = r.documentElement;
        return i ? [i] : [];
      }
      return r.nodeType === 1 ? [r] : [];
    },
  },
  lv = {
    matches(e, t, n, r) {
      if (t.length === 0)
        throw new Error('"not" engine expects non-empty selector list');
      return !r.matches(e, t, n);
    },
  },
  av = {
    query(e, t, n) {
      return n.query({ ...e, pierceShadow: !1 }, t);
    },
    matches(e, t, n, r) {
      return r.matches(e, t, { ...n, pierceShadow: !1 });
    },
  },
  uv = {
    matches(e, t, n, r) {
      if (t.length) throw new Error('"visible" engine expects no arguments');
      return Ns(e);
    },
  },
  cv = {
    matches(e, t, n, r) {
      if (t.length !== 1 || typeof t[0] != "string")
        throw new Error('"text" engine expects a single string');
      const i = ce(t[0]).toLowerCase(),
        s = (o) => ce(o.full).toLowerCase().includes(i);
      return Gs(r._cacheText, e, s) === "self";
    },
  },
  dv = {
    matches(e, t, n, r) {
      if (t.length !== 1 || typeof t[0] != "string")
        throw new Error('"text-is" engine expects a single string');
      const i = ce(t[0]),
        s = (o) =>
          !i && !o.immediate.length ? !0 : o.immediate.some((l) => ce(l) === i);
      return Gs(r._cacheText, e, s) !== "none";
    },
  },
  fv = {
    matches(e, t, n, r) {
      if (
        t.length === 0 ||
        typeof t[0] != "string" ||
        t.length > 2 ||
        (t.length === 2 && typeof t[1] != "string")
      )
        throw new Error(
          '"text-matches" engine expects a regexp body and optional regexp flags',
        );
      const i = new RegExp(t[0], t.length === 2 ? t[1] : void 0),
        s = (o) => i.test(o.full);
      return Gs(r._cacheText, e, s) === "self";
    },
  },
  hv = {
    matches(e, t, n, r) {
      if (t.length !== 1 || typeof t[0] != "string")
        throw new Error('"has-text" engine expects a single string');
      if ($a(e)) return !1;
      const i = ce(t[0]).toLowerCase();
      return ((o) => ce(o.full).toLowerCase().includes(i))(we(r._cacheText, e));
    },
  };
function xr(e) {
  return {
    matches(t, n, r, i) {
      const s =
          n.length && typeof n[n.length - 1] == "number"
            ? n[n.length - 1]
            : void 0,
        o = s === void 0 ? n : n.slice(0, n.length - 1);
      if (n.length < 1 + (s === void 0 ? 0 : 1))
        throw new Error(
          `"${e}" engine expects a selector list and optional maximum distance in pixels`,
        );
      const l = i.query(r, o),
        a = ep(e, t, l, s);
      return a === void 0 ? !1 : (i._markScore(t, a), !0);
    },
  };
}
const pv = {
  query(e, t, n) {
    let r = t[t.length - 1];
    if (t.length < 2)
      throw new Error(
        '"nth-match" engine expects non-empty selector list and an index argument',
      );
    if (typeof r != "number" || r < 1)
      throw new Error(
        '"nth-match" engine expects a one-based index as the last argument',
      );
    const i = br.query(e, t.slice(0, t.length - 1), n);
    return r--, r < i.length ? [i[r]] : [];
  },
};
function Mi(e, t) {
  if (e !== t.scope) return t.pierceShadow ? ke(e) : e.parentElement || void 0;
}
function To(e, t) {
  if (e !== t.scope) return e.previousElementSibling || void 0;
}
function tp(e) {
  const t = new Map(),
    n = [],
    r = [];
  function i(o) {
    let l = t.get(o);
    if (l) return l;
    const a = ke(o);
    return (
      a ? i(a).children.push(o) : n.push(o),
      (l = { children: [], taken: !1 }),
      t.set(o, l),
      l
    );
  }
  for (const o of e) i(o).taken = !0;
  function s(o) {
    const l = t.get(o);
    if ((l.taken && r.push(o), l.children.length > 1)) {
      const a = new Set(l.children);
      l.children = [];
      let u = o.firstElementChild;
      for (; u && l.children.length < a.size; )
        a.has(u) && l.children.push(u), (u = u.nextElementSibling);
      for (
        u = o.shadowRoot ? o.shadowRoot.firstElementChild : null;
        u && l.children.length < a.size;

      )
        a.has(u) && l.children.push(u), (u = u.nextElementSibling);
    }
    l.children.forEach(s);
  }
  return n.forEach(s), r;
}
const np = new Map(),
  rp = new Map(),
  ip = 10,
  or = ip / 2,
  pc = 1,
  mv = 2,
  gv = 10,
  vv = 50,
  sp = 100,
  op = 120,
  lp = 140,
  ap = 160,
  bl = 180,
  up = 200,
  yv = 250,
  wv = sp + or,
  xv = op + or,
  Sv = lp + or,
  _v = ap + or,
  Ev = bl + or,
  kv = up + or,
  Tv = 300,
  Nv = 500,
  Cv = 510,
  No = 520,
  cp = 530,
  dp = 1e4,
  bv = 1e7,
  Lv = 1e3;
function cn(e, t, n) {
  e._evaluator.begin(), Uh();
  try {
    let r;
    if (n.forTextExpect) {
      r = vc(e, t.ownerDocument.documentElement, n);
      for (let o = t; o; o = ke(o)) {
        const l = gc(e, o, n);
        if (!l) continue;
        if ($t(l) <= Lv) {
          r = l;
          break;
        }
      }
    } else
      (t =
        Cr(
          t,
          "button,select,input,[role=button],[role=checkbox],[role=radio],a,[role=link]",
          n.root,
        ) || t),
        (r = gc(e, t, n) || vc(e, t, n));
    const i = hp(r),
      s = e.parseSelector(i);
    return {
      selector: i,
      elements: e.querySelectorAll(s, n.root ?? t.ownerDocument),
    };
  } finally {
    np.clear(), rp.clear(), Vh(), e._evaluator.end();
  }
}
function mc(e) {
  return e.filter((t) => t[0].selector[0] !== "/");
}
function gc(e, t, n) {
  if (n.root && !Qs(n.root, t))
    throw new Error("Target element must belong to the root's subtree");
  if (t === n.root) return [{ engine: "css", selector: ":scope", score: 1 }];
  if (t.ownerDocument.documentElement === t)
    return [{ engine: "css", selector: "html", score: 1 }];
  const r = (s, o) => {
      const l = s === t;
      let a = o ? Mv(e, s, s === t) : [];
      s !== t && (a = mc(a));
      const u = Av(e, s, n)
        .filter(
          (d) => !n.omitInternalEngines || !d.engine.startsWith("internal:"),
        )
        .map((d) => [d]);
      let c = yc(e, n.root ?? t.ownerDocument, s, [...a, ...u], l);
      a = mc(a);
      const p = (d) => {
        const v = o && !d.length,
          y = [...d, ...u].filter((w) => (c ? $t(w) < $t(c) : !0));
        let x = y[0];
        if (x)
          for (let w = ke(s); w && w !== n.root; w = ke(w)) {
            const h = i(w, v);
            if (!h || (c && $t([...h, ...x]) >= $t(c))) continue;
            if (((x = yc(e, w, s, y, l)), !x)) return;
            const f = [...h, ...x];
            (!c || $t(f) < $t(c)) && (c = f);
          }
      };
      return p(a), s === t && a.length && p([]), c;
    },
    i = (s, o) => {
      const l = o ? np : rp;
      let a = l.get(s);
      return a === void 0 && ((a = r(s, o)), l.set(s, a)), a;
    };
  return r(t, !n.forTextExpect);
}
function Av(e, t, n) {
  const r = [];
  {
    for (const l of ["data-testid", "data-test-id", "data-test"])
      l !== n.testIdAttributeName &&
        t.getAttribute(l) &&
        r.push({
          engine: "css",
          selector: `[${l}=${vr(t.getAttribute(l))}]`,
          score: mv,
        });
    const o = t.getAttribute("id");
    o && !Pv(o) && r.push({ engine: "css", selector: fp(o), score: Nv }),
      r.push({
        engine: "css",
        selector: Xe(t.nodeName.toLowerCase()),
        score: cp,
      });
  }
  if (t.nodeName === "IFRAME") {
    for (const o of ["name", "title"])
      t.getAttribute(o) &&
        r.push({
          engine: "css",
          selector: `${Xe(t.nodeName.toLowerCase())}[${o}=${vr(t.getAttribute(o))}]`,
          score: gv,
        });
    return (
      t.getAttribute(n.testIdAttributeName) &&
        r.push({
          engine: "css",
          selector: `[${n.testIdAttributeName}=${vr(t.getAttribute(n.testIdAttributeName))}]`,
          score: pc,
        }),
      Ll([r]),
      r
    );
  }
  if (
    (t.getAttribute(n.testIdAttributeName) &&
      r.push({
        engine: "internal:testid",
        selector: `[${n.testIdAttributeName}=${Ee(t.getAttribute(n.testIdAttributeName), !0)}]`,
        score: pc,
      }),
    t.nodeName === "INPUT" || t.nodeName === "TEXTAREA")
  ) {
    const o = t;
    if (o.placeholder) {
      r.push({
        engine: "internal:attr",
        selector: `[placeholder=${Ee(o.placeholder, !0)}]`,
        score: wv,
      });
      for (const l of Hn(o.placeholder))
        r.push({
          engine: "internal:attr",
          selector: `[placeholder=${Ee(l.text, !1)}]`,
          score: sp - l.scoreBouns,
        });
    }
  }
  const i = Wh(e._evaluator._cacheText, t);
  for (const o of i) {
    const l = o.full.trim();
    r.push({ engine: "internal:label", selector: ot(l, !0), score: xv });
    for (const a of Hn(l))
      r.push({
        engine: "internal:label",
        selector: ot(a.text, !1),
        score: op - a.scoreBouns,
      });
  }
  const s = De(t);
  return (
    s &&
      !["none", "presentation"].includes(s) &&
      r.push({ engine: "internal:role", selector: s, score: Cv }),
    t.getAttribute("name") &&
      [
        "BUTTON",
        "FORM",
        "FIELDSET",
        "FRAME",
        "IFRAME",
        "INPUT",
        "KEYGEN",
        "OBJECT",
        "OUTPUT",
        "SELECT",
        "TEXTAREA",
        "MAP",
        "META",
        "PARAM",
      ].includes(t.nodeName) &&
      r.push({
        engine: "css",
        selector: `${Xe(t.nodeName.toLowerCase())}[name=${vr(t.getAttribute("name"))}]`,
        score: No,
      }),
    ["INPUT", "TEXTAREA"].includes(t.nodeName) &&
      t.getAttribute("type") !== "hidden" &&
      t.getAttribute("type") &&
      r.push({
        engine: "css",
        selector: `${Xe(t.nodeName.toLowerCase())}[type=${vr(t.getAttribute("type"))}]`,
        score: No,
      }),
    ["INPUT", "TEXTAREA", "SELECT"].includes(t.nodeName) &&
      t.getAttribute("type") !== "hidden" &&
      r.push({
        engine: "css",
        selector: Xe(t.nodeName.toLowerCase()),
        score: No + 1,
      }),
    Ll([r]),
    r
  );
}
function Mv(e, t, n) {
  if (t.nodeName === "SELECT") return [];
  const r = [],
    i = t.getAttribute("title");
  if (i) {
    r.push([
      { engine: "internal:attr", selector: `[title=${Ee(i, !0)}]`, score: kv },
    ]);
    for (const a of Hn(i))
      r.push([
        {
          engine: "internal:attr",
          selector: `[title=${Ee(a.text, !1)}]`,
          score: up - a.scoreBouns,
        },
      ]);
  }
  const s = t.getAttribute("alt");
  if (s && ["APPLET", "AREA", "IMG", "INPUT"].includes(t.nodeName)) {
    r.push([
      { engine: "internal:attr", selector: `[alt=${Ee(s, !0)}]`, score: _v },
    ]);
    for (const a of Hn(s))
      r.push([
        {
          engine: "internal:attr",
          selector: `[alt=${Ee(a.text, !1)}]`,
          score: ap - a.scoreBouns,
        },
      ]);
  }
  const o = ce(we(e._evaluator._cacheText, t).full);
  if (o) {
    const a = Hn(o);
    if (n) {
      o.length <= 80 &&
        r.push([{ engine: "internal:text", selector: ot(o, !0), score: Ev }]);
      for (const c of a)
        r.push([
          {
            engine: "internal:text",
            selector: ot(c.text, !1),
            score: bl - c.scoreBouns,
          },
        ]);
    }
    const u = {
      engine: "css",
      selector: Xe(t.nodeName.toLowerCase()),
      score: cp,
    };
    for (const c of a)
      r.push([
        u,
        {
          engine: "internal:has-text",
          selector: ot(c.text, !1),
          score: bl - c.scoreBouns,
        },
      ]);
    o.length <= 80 &&
      r.push([
        u,
        {
          engine: "internal:has-text",
          selector: "/^" + Iv(o) + "$/",
          score: yv,
        },
      ]);
  }
  const l = De(t);
  if (l && !["none", "presentation"].includes(l)) {
    const a = Pa(t, !1);
    if (a) {
      r.push([
        {
          engine: "internal:role",
          selector: `${l}[name=${Ee(a, !0)}]`,
          score: Sv,
        },
      ]);
      for (const u of Hn(a))
        r.push([
          {
            engine: "internal:role",
            selector: `${l}[name=${Ee(u.text, !1)}]`,
            score: lp - u.scoreBouns,
          },
        ]);
    }
  }
  return Ll(r), r;
}
function fp(e) {
  return /^[a-zA-Z][a-zA-Z0-9\-\_]+$/.test(e) ? "#" + e : `[id="${Xe(e)}"]`;
}
function vc(e, t, n) {
  const r = n.root ?? t.ownerDocument,
    i = [];
  function s(l) {
    const a = i.slice();
    l && a.unshift(l);
    const u = a.join(" > "),
      c = e.parseSelector(u);
    return e.querySelector(c, r, !1) === t ? u : void 0;
  }
  function o(l) {
    const a = { engine: "css", selector: l, score: bv },
      u = e.parseSelector(l),
      c = e.querySelectorAll(u, r);
    if (c.length === 1) return [a];
    const p = { engine: "nth", selector: String(c.indexOf(t)), score: dp };
    return [a, p];
  }
  for (let l = t; l && l !== r; l = ke(l)) {
    const a = l.nodeName.toLowerCase();
    let u = "";
    if (l.id) {
      const d = fp(l.id),
        v = s(d);
      if (v) return o(v);
      u = d;
    }
    const c = l.parentNode,
      p = [...l.classList];
    for (let d = 0; d < p.length; ++d) {
      const v = "." + Xe(p.slice(0, d + 1).join(".")),
        y = s(v);
      if (y) return o(y);
      !u && c && c.querySelectorAll(v).length === 1 && (u = v);
    }
    if (c) {
      const d = [...c.children],
        y =
          d.filter((w) => w.nodeName.toLowerCase() === a).indexOf(l) === 0
            ? Xe(a)
            : `${Xe(a)}:nth-child(${1 + d.indexOf(l)})`,
        x = s(y);
      if (x) return o(x);
      u || (u = y);
    } else u || (u = Xe(a));
    i.unshift(u);
  }
  return o(s());
}
function Ll(e) {
  for (const t of e)
    for (const n of t)
      n.score > vv &&
        n.score < Tv &&
        (n.score += Math.min(ip, (n.selector.length / 10) | 0));
}
function hp(e) {
  const t = [];
  let n = "";
  for (const { engine: r, selector: i } of e)
    t.length &&
      (n !== "css" || r !== "css" || i.startsWith(":nth-match(")) &&
      t.push(">>"),
      (n = r),
      r === "css" ? t.push(i) : t.push(`${r}=${i}`);
  return t.join(" ");
}
function $t(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) t += e[n].score * (e.length - n);
  return t;
}
function yc(e, t, n, r, i) {
  const s = r.map((l) => ({ tokens: l, score: $t(l) }));
  s.sort((l, a) => l.score - a.score);
  let o = null;
  for (const { tokens: l } of s) {
    const a = e.parseSelector(hp(l)),
      u = e.querySelectorAll(a, t);
    if (u[0] === n && u.length === 1) return l;
    const c = u.indexOf(n);
    if (!i || o || c === -1 || u.length > 5) continue;
    const p = { engine: "nth", selector: String(c), score: dp };
    o = [...l, p];
  }
  return o;
}
function Pv(e) {
  let t,
    n = 0;
  for (let r = 0; r < e.length; ++r) {
    const i = e[r];
    let s;
    if (!(i === "-" || i === "_")) {
      if (
        (i >= "a" && i <= "z"
          ? (s = "lower")
          : i >= "A" && i <= "Z"
            ? (s = "upper")
            : i >= "0" && i <= "9"
              ? (s = "digit")
              : (s = "other"),
        s === "lower" && t === "upper")
      ) {
        t = s;
        continue;
      }
      t && t !== s && ++n, (t = s);
    }
  }
  return n >= e.length / 4;
}
function Iv(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function wc(e, t) {
  if (e.length <= t) return e;
  e = e.substring(0, t);
  const n = e.match(/^(.*)\b(.+?)$/);
  return n ? n[1].trimEnd() : "";
}
function Hn(e) {
  let t = [];
  {
    const n = e.match(/^([\d.,]+)[^.,\w]/),
      r = n ? n[1].length : 0;
    if (r) {
      const i = e.substring(r).trimStart();
      t.push({ text: i, scoreBouns: i.length <= 30 ? 2 : 1 });
    }
  }
  {
    const n = e.match(/[^.,\w]([\d.,]+)$/),
      r = n ? n[1].length : 0;
    if (r) {
      const i = e.substring(0, e.length - r).trimEnd();
      t.push({ text: i, scoreBouns: i.length <= 30 ? 2 : 1 });
    }
  }
  return (
    e.length <= 30
      ? t.push({ text: e, scoreBouns: 0 })
      : (t.push({ text: wc(e, 80), scoreBouns: 0 }),
        t.push({ text: wc(e, 30), scoreBouns: 1 })),
    (t = t.filter((n) => n.text)),
    t.length || t.push({ text: e.substring(0, 80), scoreBouns: 0 }),
    t
  );
}
const Rv = `:host{font-size:13px;font-family:system-ui,Ubuntu,Droid Sans,sans-serif;color:#333}x-pw-tooltip{-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);background-color:#fff;border-radius:6px;box-shadow:0 .5rem 1.2rem #0000004d;display:none;font-size:12.8px;font-weight:400;left:0;line-height:1.5;max-width:600px;position:absolute;top:0;padding:4px}x-pw-dialog{background-color:#fff;pointer-events:auto;border-radius:6px;box-shadow:0 .5rem 1.2rem #0000004d;display:flex;flex-direction:column;position:absolute;width:400px;height:150px;z-index:10;font-size:13px}x-pw-dialog-body{display:flex;flex-direction:column;flex:auto}x-pw-dialog-body label{margin:5px 8px;display:flex;flex-direction:row;align-items:center}x-pw-highlight{position:absolute;top:0;left:0;width:0;height:0}x-pw-action-point{position:absolute;width:20px;height:20px;background:red;border-radius:10px;margin:-10px 0 0 -10px;z-index:2}x-pw-separator{height:1px;margin:6px 9px;background:rgb(148 148 148 / 90%)}x-pw-tool-gripper{height:28px;width:24px;margin:2px 0;cursor:grab}x-pw-tool-gripper:active{cursor:grabbing}x-pw-tool-gripper>x-div{width:100%;height:100%;-webkit-mask-size:20px;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:16px;mask-size:16px;-webkit-mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path d='M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' /></svg>");mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path d='M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' /></svg>");background-color:#555}x-pw-tools-list>label{display:flex;align-items:center;margin:0 10px;-webkit-user-select:none;user-select:none}x-pw-tools-list{display:flex;width:100%;border-bottom:1px solid #dddddd}x-pw-tool-item{pointer-events:auto;cursor:pointer;height:28px;width:28px;border-radius:3px}x-pw-tool-item:not(.disabled):hover{background-color:#dbdbdb}x-pw-tool-item.active{background-color:#8acae480}x-pw-tool-item.active:not(.disabled):hover{background-color:#8acae4c4}x-pw-tool-item>x-div{width:100%;height:100%;-webkit-mask-size:20px;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:16px;mask-size:16px;background-color:#3a3a3a}x-pw-tool-item.disabled>x-div{background-color:#61616180;cursor:default}x-pw-tool-item.record.active{background-color:transparent}x-pw-tool-item.record.active:hover{background-color:#dbdbdb}x-pw-tool-item.record.active>x-div{background-color:#a1260d}x-pw-tool-item.accept>x-div{background-color:#388a34}x-pw-tool-item.record>x-div{-webkit-mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path d='M8 1a6.8 6.8 0 0 1 1.86.253 6.899 6.899 0 0 1 3.083 1.805 6.903 6.903 0 0 1 1.804 3.083C14.916 6.738 15 7.357 15 8s-.084 1.262-.253 1.86a6.9 6.9 0 0 1-.704 1.674 7.157 7.157 0 0 1-2.516 2.509 6.966 6.966 0 0 1-1.668.71A6.984 6.984 0 0 1 8 15a6.984 6.984 0 0 1-1.86-.246 7.098 7.098 0 0 1-1.674-.711 7.3 7.3 0 0 1-1.415-1.094 7.295 7.295 0 0 1-1.094-1.415 7.098 7.098 0 0 1-.71-1.675A6.985 6.985 0 0 1 1 8c0-.643.082-1.262.246-1.86a6.968 6.968 0 0 1 .711-1.667 7.156 7.156 0 0 1 2.509-2.516 6.895 6.895 0 0 1 1.675-.704A6.808 6.808 0 0 1 8 1z'/></svg>");mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path d='M8 1a6.8 6.8 0 0 1 1.86.253 6.899 6.899 0 0 1 3.083 1.805 6.903 6.903 0 0 1 1.804 3.083C14.916 6.738 15 7.357 15 8s-.084 1.262-.253 1.86a6.9 6.9 0 0 1-.704 1.674 7.157 7.157 0 0 1-2.516 2.509 6.966 6.966 0 0 1-1.668.71A6.984 6.984 0 0 1 8 15a6.984 6.984 0 0 1-1.86-.246 7.098 7.098 0 0 1-1.674-.711 7.3 7.3 0 0 1-1.415-1.094 7.295 7.295 0 0 1-1.094-1.415 7.098 7.098 0 0 1-.71-1.675A6.985 6.985 0 0 1 1 8c0-.643.082-1.262.246-1.86a6.968 6.968 0 0 1 .711-1.667 7.156 7.156 0 0 1 2.509-2.516 6.895 6.895 0 0 1 1.675-.704A6.808 6.808 0 0 1 8 1z'/></svg>")}x-pw-tool-item.pick-locator>x-div{-webkit-mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path fill-rule='evenodd' clip-rule='evenodd' d='M1 3l1-1h12l1 1v6h-1V3H2v8h5v1H2l-1-1V3zm14.707 9.707L9 6v9.414l2.707-2.707h4zM10 13V8.414l3.293 3.293h-2L10 13z'/></svg>");mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path fill-rule='evenodd' clip-rule='evenodd' d='M1 3l1-1h12l1 1v6h-1V3H2v8h5v1H2l-1-1V3zm14.707 9.707L9 6v9.414l2.707-2.707h4zM10 13V8.414l3.293 3.293h-2L10 13z'/></svg>")}x-pw-tool-item.text>x-div{-webkit-mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path fill-rule='evenodd' clip-rule='evenodd' d='M0 11H1V13H15V11H16V14H15H1H0V11Z'/><path d='M6.84048 11H5.95963V10.1406H5.93814C5.555 10.7995 4.99104 11.1289 4.24625 11.1289C3.69839 11.1289 3.26871 10.9839 2.95718 10.6938C2.64924 10.4038 2.49527 10.0189 2.49527 9.53906C2.49527 8.51139 3.10041 7.91341 4.3107 7.74512L5.95963 7.51416C5.95963 6.57959 5.58186 6.1123 4.82632 6.1123C4.16389 6.1123 3.56591 6.33789 3.03238 6.78906V5.88672C3.57307 5.54297 4.19612 5.37109 4.90152 5.37109C6.19416 5.37109 6.84048 6.05501 6.84048 7.42285V11ZM5.95963 8.21777L4.63297 8.40039C4.22476 8.45768 3.91682 8.55973 3.70914 8.70654C3.50145 8.84977 3.39761 9.10579 3.39761 9.47461C3.39761 9.74316 3.4925 9.96338 3.68228 10.1353C3.87564 10.3035 4.13166 10.3877 4.45035 10.3877C4.8872 10.3877 5.24706 10.2355 5.52994 9.93115C5.8164 9.62321 5.95963 9.2347 5.95963 8.76562V8.21777Z'/><path d='M9.3475 10.2051H9.32601V11H8.44515V2.85742H9.32601V6.4668H9.3475C9.78076 5.73633 10.4146 5.37109 11.2489 5.37109C11.9543 5.37109 12.5057 5.61816 12.9032 6.1123C13.3042 6.60286 13.5047 7.26172 13.5047 8.08887C13.5047 9.00911 13.2809 9.74674 12.8333 10.3018C12.3857 10.8532 11.7734 11.1289 10.9964 11.1289C10.2695 11.1289 9.71989 10.821 9.3475 10.2051ZM9.32601 7.98682V8.75488C9.32601 9.20964 9.47282 9.59635 9.76644 9.91504C10.0636 10.2301 10.4396 10.3877 10.8944 10.3877C11.4279 10.3877 11.8451 10.1836 12.1458 9.77539C12.4502 9.36719 12.6024 8.79964 12.6024 8.07275C12.6024 7.46045 12.4609 6.98063 12.1781 6.6333C11.8952 6.28597 11.512 6.1123 11.0286 6.1123C10.5166 6.1123 10.1048 6.29134 9.7933 6.64941C9.48177 7.00391 9.32601 7.44971 9.32601 7.98682Z'/></svg>");mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path fill-rule='evenodd' clip-rule='evenodd' d='M0 11H1V13H15V11H16V14H15H1H0V11Z'/><path d='M6.84048 11H5.95963V10.1406H5.93814C5.555 10.7995 4.99104 11.1289 4.24625 11.1289C3.69839 11.1289 3.26871 10.9839 2.95718 10.6938C2.64924 10.4038 2.49527 10.0189 2.49527 9.53906C2.49527 8.51139 3.10041 7.91341 4.3107 7.74512L5.95963 7.51416C5.95963 6.57959 5.58186 6.1123 4.82632 6.1123C4.16389 6.1123 3.56591 6.33789 3.03238 6.78906V5.88672C3.57307 5.54297 4.19612 5.37109 4.90152 5.37109C6.19416 5.37109 6.84048 6.05501 6.84048 7.42285V11ZM5.95963 8.21777L4.63297 8.40039C4.22476 8.45768 3.91682 8.55973 3.70914 8.70654C3.50145 8.84977 3.39761 9.10579 3.39761 9.47461C3.39761 9.74316 3.4925 9.96338 3.68228 10.1353C3.87564 10.3035 4.13166 10.3877 4.45035 10.3877C4.8872 10.3877 5.24706 10.2355 5.52994 9.93115C5.8164 9.62321 5.95963 9.2347 5.95963 8.76562V8.21777Z'/><path d='M9.3475 10.2051H9.32601V11H8.44515V2.85742H9.32601V6.4668H9.3475C9.78076 5.73633 10.4146 5.37109 11.2489 5.37109C11.9543 5.37109 12.5057 5.61816 12.9032 6.1123C13.3042 6.60286 13.5047 7.26172 13.5047 8.08887C13.5047 9.00911 13.2809 9.74674 12.8333 10.3018C12.3857 10.8532 11.7734 11.1289 10.9964 11.1289C10.2695 11.1289 9.71989 10.821 9.3475 10.2051ZM9.32601 7.98682V8.75488C9.32601 9.20964 9.47282 9.59635 9.76644 9.91504C10.0636 10.2301 10.4396 10.3877 10.8944 10.3877C11.4279 10.3877 11.8451 10.1836 12.1458 9.77539C12.4502 9.36719 12.6024 8.79964 12.6024 8.07275C12.6024 7.46045 12.4609 6.98063 12.1781 6.6333C11.8952 6.28597 11.512 6.1123 11.0286 6.1123C10.5166 6.1123 10.1048 6.29134 9.7933 6.64941C9.48177 7.00391 9.32601 7.44971 9.32601 7.98682Z'/></svg>")}x-pw-tool-item.visibility>x-div{-webkit-mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path d='M7.99993 6.00316C9.47266 6.00316 10.6666 7.19708 10.6666 8.66981C10.6666 10.1426 9.47266 11.3365 7.99993 11.3365C6.52715 11.3365 5.33324 10.1426 5.33324 8.66981C5.33324 7.19708 6.52715 6.00316 7.99993 6.00316ZM7.99993 7.00315C7.07946 7.00315 6.33324 7.74935 6.33324 8.66981C6.33324 9.59028 7.07946 10.3365 7.99993 10.3365C8.9204 10.3365 9.6666 9.59028 9.6666 8.66981C9.6666 7.74935 8.9204 7.00315 7.99993 7.00315ZM7.99993 3.66675C11.0756 3.66675 13.7307 5.76675 14.4673 8.70968C14.5344 8.97755 14.3716 9.24908 14.1037 9.31615C13.8358 9.38315 13.5643 9.22041 13.4973 8.95248C12.8713 6.45205 10.6141 4.66675 7.99993 4.66675C5.38454 4.66675 3.12664 6.45359 2.50182 8.95555C2.43491 9.22341 2.16348 9.38635 1.89557 9.31948C1.62766 9.25255 1.46471 8.98115 1.53162 8.71321C2.26701 5.76856 4.9229 3.66675 7.99993 3.66675Z'/></svg>");mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path d='M7.99993 6.00316C9.47266 6.00316 10.6666 7.19708 10.6666 8.66981C10.6666 10.1426 9.47266 11.3365 7.99993 11.3365C6.52715 11.3365 5.33324 10.1426 5.33324 8.66981C5.33324 7.19708 6.52715 6.00316 7.99993 6.00316ZM7.99993 7.00315C7.07946 7.00315 6.33324 7.74935 6.33324 8.66981C6.33324 9.59028 7.07946 10.3365 7.99993 10.3365C8.9204 10.3365 9.6666 9.59028 9.6666 8.66981C9.6666 7.74935 8.9204 7.00315 7.99993 7.00315ZM7.99993 3.66675C11.0756 3.66675 13.7307 5.76675 14.4673 8.70968C14.5344 8.97755 14.3716 9.24908 14.1037 9.31615C13.8358 9.38315 13.5643 9.22041 13.4973 8.95248C12.8713 6.45205 10.6141 4.66675 7.99993 4.66675C5.38454 4.66675 3.12664 6.45359 2.50182 8.95555C2.43491 9.22341 2.16348 9.38635 1.89557 9.31948C1.62766 9.25255 1.46471 8.98115 1.53162 8.71321C2.26701 5.76856 4.9229 3.66675 7.99993 3.66675Z'/></svg>")}x-pw-tool-item.value>x-div{-webkit-mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path fill-rule='evenodd' clip-rule='evenodd' d='M4 6h8v1H4V6zm8 3H4v1h8V9z'/><path fill-rule='evenodd' clip-rule='evenodd' d='M1 4l1-1h12l1 1v8l-1 1H2l-1-1V4zm1 0v8h12V4H2z'/></svg>");mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path fill-rule='evenodd' clip-rule='evenodd' d='M4 6h8v1H4V6zm8 3H4v1h8V9z'/><path fill-rule='evenodd' clip-rule='evenodd' d='M1 4l1-1h12l1 1v8l-1 1H2l-1-1V4zm1 0v8h12V4H2z'/></svg>")}x-pw-tool-item.accept>x-div{-webkit-mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path d='M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/></svg>");mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path d='M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/></svg>")}x-pw-tool-item.cancel>x-div{-webkit-mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path d='M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/></svg>");mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path d='M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/></svg>")}x-pw-tool-item.succeeded>x-div{-webkit-mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path d='M6.27 10.87h.71l4.56-4.56-.71-.71-4.2 4.21-1.92-1.92L4 8.6l2.27 2.27z'/><path fill-rule='evenodd' clip-rule='evenodd' d='M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6z'/></svg>")!important;mask-image:url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' fill='currentColor'><path d='M6.27 10.87h.71l4.56-4.56-.71-.71-4.2 4.21-1.92-1.92L4 8.6l2.27 2.27z'/><path fill-rule='evenodd' clip-rule='evenodd' d='M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6z'/></svg>")!important;background-color:#388a34!important;-webkit-mask-size:18px!important;mask-size:18px!important}x-pw-overlay{position:absolute;top:0;max-width:min-content;z-index:2147483647;background:transparent;pointer-events:auto}x-pw-overlay x-pw-tools-list{background-color:#fffd;box-shadow:#0000001a 0 5px 5px;border-radius:3px;border-bottom:none}x-pw-overlay x-pw-tool-item{margin:2px}textarea.text-editor{font-family:system-ui,Ubuntu,Droid Sans,sans-serif;flex:auto;border:none;margin:6px 10px;color:#333;outline:1px solid transparent!important;resize:none;padding:0;font-size:13px}textarea.text-editor.does-not-match{outline:1px solid red!important}x-div{display:block}x-spacer{flex:auto}*{box-sizing:border-box}*[hidden]{display:none!important}x-locator-editor{flex:none;width:100%;height:60px;padding:4px;border-bottom:1px solid #dddddd;outline:1px solid transparent}x-locator-editor.does-not-match{outline:1px solid red}.CodeMirror{width:100%!important;height:100%!important}
`;
class Al {
  constructor(t) {
    (this._highlightEntries = []),
      (this._language = "javascript"),
      (this._injectedScript = t);
    const n = t.document;
    (this._isUnderTest = t.isUnderTest),
      (this._glassPaneElement = n.createElement("x-pw-glass")),
      (this._glassPaneElement.style.position = "fixed"),
      (this._glassPaneElement.style.top = "0"),
      (this._glassPaneElement.style.right = "0"),
      (this._glassPaneElement.style.bottom = "0"),
      (this._glassPaneElement.style.left = "0"),
      (this._glassPaneElement.style.zIndex = "2147483646"),
      (this._glassPaneElement.style.pointerEvents = "none"),
      (this._glassPaneElement.style.display = "flex"),
      (this._glassPaneElement.style.backgroundColor = "transparent");
    for (const i of [
      "click",
      "auxclick",
      "dragstart",
      "input",
      "keydown",
      "keyup",
      "pointerdown",
      "pointerup",
      "mousedown",
      "mouseup",
      "mouseleave",
      "focus",
      "scroll",
    ])
      this._glassPaneElement.addEventListener(i, (s) => {
        s.stopPropagation(), s.stopImmediatePropagation();
      });
    (this._actionPointElement = n.createElement("x-pw-action-point")),
      this._actionPointElement.setAttribute("hidden", "true"),
      (this._glassPaneShadow = this._glassPaneElement.attachShadow({
        mode: this._isUnderTest ? "open" : "closed",
      })),
      this._glassPaneShadow.appendChild(this._actionPointElement);
    const r = n.createElement("style");
    (r.textContent = Rv), this._glassPaneShadow.appendChild(r);
  }
  install() {
    this._injectedScript.document.documentElement.appendChild(
      this._glassPaneElement,
    );
  }
  setLanguage(t) {
    this._language = t;
  }
  runHighlightOnRaf(t) {
    this._rafRequest && cancelAnimationFrame(this._rafRequest),
      this.updateHighlight(
        this._injectedScript.querySelectorAll(
          t,
          this._injectedScript.document.documentElement,
        ),
        { tooltipText: Gt(this._language, gn(t)) },
      ),
      (this._rafRequest = requestAnimationFrame(() =>
        this.runHighlightOnRaf(t),
      ));
  }
  uninstall() {
    this._rafRequest && cancelAnimationFrame(this._rafRequest),
      this._glassPaneElement.remove();
  }
  showActionPoint(t, n) {
    (this._actionPointElement.style.top = n + "px"),
      (this._actionPointElement.style.left = t + "px"),
      (this._actionPointElement.hidden = !1);
  }
  hideActionPoint() {
    this._actionPointElement.hidden = !0;
  }
  clearHighlight() {
    var t, n;
    for (const r of this._highlightEntries)
      (t = r.highlightElement) == null || t.remove(),
        (n = r.tooltipElement) == null || n.remove();
    this._highlightEntries = [];
  }
  updateHighlight(t, n) {
    this._innerUpdateHighlight(t, n);
  }
  maskElements(t, n) {
    this._innerUpdateHighlight(t, { color: n });
  }
  _innerUpdateHighlight(t, n) {
    let r = n.color;
    if (
      (r || (r = t.length > 1 ? "#f6b26b7f" : "#6fa8dc7f"),
      !this._highlightIsUpToDate(t, n.tooltipText))
    ) {
      this.clearHighlight();
      for (let i = 0; i < t.length; ++i) {
        const s = this._createHighlightElement();
        this._glassPaneShadow.appendChild(s);
        let o;
        if (n.tooltipText) {
          (o = this._injectedScript.document.createElement("x-pw-tooltip")),
            this._glassPaneShadow.appendChild(o);
          const l = t.length > 1 ? ` [${i + 1} of ${t.length}]` : "";
          (o.textContent = n.tooltipText + l),
            (o.style.top = "0"),
            (o.style.left = "0"),
            (o.style.display = "flex");
        }
        this._highlightEntries.push({
          targetElement: t[i],
          tooltipElement: o,
          highlightElement: s,
          tooltipText: n.tooltipText,
        });
      }
      for (const i of this._highlightEntries) {
        if (
          ((i.box = i.targetElement.getBoundingClientRect()), !i.tooltipElement)
        )
          continue;
        const { anchorLeft: s, anchorTop: o } = this.tooltipPosition(
          i.box,
          i.tooltipElement,
        );
        (i.tooltipTop = o), (i.tooltipLeft = s);
      }
      for (const i of this._highlightEntries) {
        i.tooltipElement &&
          ((i.tooltipElement.style.top = i.tooltipTop + "px"),
          (i.tooltipElement.style.left = i.tooltipLeft + "px"));
        const s = i.box;
        (i.highlightElement.style.backgroundColor = r),
          (i.highlightElement.style.left = s.x + "px"),
          (i.highlightElement.style.top = s.y + "px"),
          (i.highlightElement.style.width = s.width + "px"),
          (i.highlightElement.style.height = s.height + "px"),
          (i.highlightElement.style.display = "block"),
          this._isUnderTest &&
            console.error(
              "Highlight box for test: " +
                JSON.stringify({
                  x: s.x,
                  y: s.y,
                  width: s.width,
                  height: s.height,
                }),
            );
      }
    }
  }
  firstBox() {
    var t;
    return (t = this._highlightEntries[0]) == null ? void 0 : t.box;
  }
  tooltipPosition(t, n) {
    const r = n.offsetWidth,
      i = n.offsetHeight,
      s = this._glassPaneElement.offsetWidth,
      o = this._glassPaneElement.offsetHeight;
    let l = t.left;
    l + r > s - 5 && (l = s - r - 5);
    let a = t.bottom + 5;
    return (
      a + i > o - 5 && (t.top > i + 5 ? (a = t.top - i - 5) : (a = o - 5 - i)),
      { anchorLeft: l, anchorTop: a }
    );
  }
  _highlightIsUpToDate(t, n) {
    if (t.length !== this._highlightEntries.length) return !1;
    for (let r = 0; r < this._highlightEntries.length; ++r) {
      if (
        n !== this._highlightEntries[r].tooltipText ||
        t[r] !== this._highlightEntries[r].targetElement
      )
        return !1;
      const i = this._highlightEntries[r].box;
      if (!i) return !1;
      const s = t[r].getBoundingClientRect();
      if (
        s.top !== i.top ||
        s.right !== i.right ||
        s.bottom !== i.bottom ||
        s.left !== i.left
      )
        return !1;
    }
    return !0;
  }
  _createHighlightElement() {
    return this._injectedScript.document.createElement("x-pw-highlight");
  }
  appendChild(t) {
    this._glassPaneShadow.appendChild(t);
  }
}
class pp {
  constructor(t, n, r, i, s, o, l) {
    (this.onGlobalListenersRemoved = new Set()),
      (this._testIdAttributeNameForStrictErrorAndConsoleCodegen =
        "data-testid"),
      (this.window = t),
      (this.document = t.document),
      (this.isUnderTest = n),
      (this._sdkLanguage = r),
      (this._testIdAttributeNameForStrictErrorAndConsoleCodegen = i),
      (this._evaluator = new iv(new Map())),
      (this._engines = new Map()),
      this._engines.set("xpath", oc),
      this._engines.set("xpath:light", oc),
      this._engines.set("_react", j0),
      this._engines.set("_vue", K0),
      this._engines.set("role", hc(!1)),
      this._engines.set("text", this._createTextEngine(!0, !1)),
      this._engines.set("text:light", this._createTextEngine(!1, !1)),
      this._engines.set("id", this._createAttributeEngine("id", !0)),
      this._engines.set("id:light", this._createAttributeEngine("id", !1)),
      this._engines.set(
        "data-testid",
        this._createAttributeEngine("data-testid", !0),
      ),
      this._engines.set(
        "data-testid:light",
        this._createAttributeEngine("data-testid", !1),
      ),
      this._engines.set(
        "data-test-id",
        this._createAttributeEngine("data-test-id", !0),
      ),
      this._engines.set(
        "data-test-id:light",
        this._createAttributeEngine("data-test-id", !1),
      ),
      this._engines.set(
        "data-test",
        this._createAttributeEngine("data-test", !0),
      ),
      this._engines.set(
        "data-test:light",
        this._createAttributeEngine("data-test", !1),
      ),
      this._engines.set("css", this._createCSSEngine()),
      this._engines.set("nth", { queryAll: () => [] }),
      this._engines.set("visible", this._createVisibleEngine()),
      this._engines.set("internal:control", this._createControlEngine()),
      this._engines.set("internal:has", this._createHasEngine()),
      this._engines.set("internal:has-not", this._createHasNotEngine()),
      this._engines.set("internal:and", { queryAll: () => [] }),
      this._engines.set("internal:or", { queryAll: () => [] }),
      this._engines.set("internal:chain", this._createInternalChainEngine()),
      this._engines.set("internal:label", this._createInternalLabelEngine()),
      this._engines.set("internal:text", this._createTextEngine(!0, !0)),
      this._engines.set(
        "internal:has-text",
        this._createInternalHasTextEngine(),
      ),
      this._engines.set(
        "internal:has-not-text",
        this._createInternalHasNotTextEngine(),
      ),
      this._engines.set("internal:attr", this._createNamedAttributeEngine()),
      this._engines.set("internal:testid", this._createNamedAttributeEngine()),
      this._engines.set("internal:role", hc(!0));
    for (const { name: a, engine: u } of l) this._engines.set(a, u);
    (this._stableRafCount = s),
      (this._browserName = o),
      N0(o),
      this._setupGlobalListenersRemovalDetection(),
      this._setupHitTargetInterceptors(),
      n && (this.window.__injectedScript = this);
  }
  eval(t) {
    return this.window.eval(t);
  }
  testIdAttributeNameForStrictErrorAndConsoleCodegen() {
    return this._testIdAttributeNameForStrictErrorAndConsoleCodegen;
  }
  parseSelector(t) {
    const n = qs(t);
    return (
      A1(n, (r) => {
        if (!this._engines.has(r.name))
          throw this.createStacklessError(
            `Unknown engine "${r.name}" while parsing selector ${t}`,
          );
      }),
      n
    );
  }
  generateSelector(t, n) {
    return cn(this, t, {
      ...n,
      testIdAttributeName:
        this._testIdAttributeNameForStrictErrorAndConsoleCodegen,
    }).selector;
  }
  querySelector(t, n, r) {
    const i = this.querySelectorAll(t, n);
    if (r && i.length > 1) throw this.strictModeViolationError(t, i);
    return i[0];
  }
  _queryNth(t, n) {
    const r = [...t];
    let i = +n.body;
    return i === -1 && (i = r.length - 1), new Set(r.slice(i, i + 1));
  }
  _queryLayoutSelector(t, n, r) {
    const i = n.name,
      s = n.body,
      o = [],
      l = this.querySelectorAll(s.parsed, r);
    for (const a of t) {
      const u = ep(i, a, l, s.distance);
      u !== void 0 && o.push({ element: a, score: u });
    }
    return (
      o.sort((a, u) => a.score - u.score), new Set(o.map((a) => a.element))
    );
  }
  querySelectorAll(t, n) {
    if (t.capture !== void 0) {
      if (t.parts.some((i) => i.name === "nth"))
        throw this.createStacklessError(
          "Can't query n-th element in a request with the capture.",
        );
      const r = { parts: t.parts.slice(0, t.capture + 1) };
      if (t.capture < t.parts.length - 1) {
        const i = { parts: t.parts.slice(t.capture + 1) },
          s = { name: "internal:has", body: { parsed: i }, source: gn(i) };
        r.parts.push(s);
      }
      return this.querySelectorAll(r, n);
    }
    if (!n.querySelectorAll)
      throw this.createStacklessError("Node is not queryable.");
    if (t.capture !== void 0)
      throw this.createStacklessError(
        "Internal error: there should not be a capture in the selector.",
      );
    if (
      n.nodeType === 11 &&
      t.parts.length === 1 &&
      t.parts[0].name === "css" &&
      t.parts[0].source === ":scope"
    )
      return [n];
    this._evaluator.begin();
    try {
      let r = new Set([n]);
      for (const i of t.parts)
        if (i.name === "nth") r = this._queryNth(r, i);
        else if (i.name === "internal:and") {
          const s = this.querySelectorAll(i.body.parsed, n);
          r = new Set(s.filter((o) => r.has(o)));
        } else if (i.name === "internal:or") {
          const s = this.querySelectorAll(i.body.parsed, n);
          r = new Set(tp(new Set([...r, ...s])));
        } else if (rv.includes(i.name)) r = this._queryLayoutSelector(r, i, n);
        else {
          const s = new Set();
          for (const o of r) {
            const l = this._queryEngineAll(i, o);
            for (const a of l) s.add(a);
          }
          r = s;
        }
      return [...r];
    } finally {
      this._evaluator.end();
    }
  }
  _queryEngineAll(t, n) {
    const r = this._engines.get(t.name).queryAll(n, t.body);
    for (const i of r)
      if (!("nodeName" in i))
        throw this.createStacklessError(
          `Expected a Node but got ${Object.prototype.toString.call(i)}`,
        );
    return r;
  }
  _createAttributeEngine(t, n) {
    const r = (i) => [
      {
        simples: [
          {
            selector: { css: `[${t}=${JSON.stringify(i)}]`, functions: [] },
            combinator: "",
          },
        ],
      },
    ];
    return {
      queryAll: (i, s) =>
        this._evaluator.query({ scope: i, pierceShadow: n }, r(s)),
    };
  }
  _createCSSEngine() {
    return {
      queryAll: (t, n) =>
        this._evaluator.query({ scope: t, pierceShadow: !0 }, n),
    };
  }
  _createTextEngine(t, n) {
    return {
      queryAll: (i, s) => {
        const { matcher: o, kind: l } = Ii(s, n),
          a = [];
        let u = null;
        const c = (d) => {
          if (l === "lax" && u && u.contains(d)) return !1;
          const v = Gs(this._evaluator._cacheText, d, o);
          v === "none" && (u = d),
            (v === "self" ||
              (v === "selfAndChildren" && l === "strict" && !n)) &&
              a.push(d);
        };
        i.nodeType === Node.ELEMENT_NODE && c(i);
        const p = this._evaluator._queryCSS({ scope: i, pierceShadow: t }, "*");
        for (const d of p) c(d);
        return a;
      },
    };
  }
  _createInternalHasTextEngine() {
    return {
      queryAll: (t, n) => {
        if (t.nodeType !== 1) return [];
        const r = t,
          i = we(this._evaluator._cacheText, r),
          { matcher: s } = Ii(n, !0);
        return s(i) ? [r] : [];
      },
    };
  }
  _createInternalHasNotTextEngine() {
    return {
      queryAll: (t, n) => {
        if (t.nodeType !== 1) return [];
        const r = t,
          i = we(this._evaluator._cacheText, r),
          { matcher: s } = Ii(n, !0);
        return s(i) ? [] : [r];
      },
    };
  }
  _createInternalLabelEngine() {
    return {
      queryAll: (t, n) => {
        const { matcher: r } = Ii(n, !0);
        return this._evaluator
          ._queryCSS({ scope: t, pierceShadow: !0 }, "*")
          .filter((s) => Wh(this._evaluator._cacheText, s).some((o) => r(o)));
      },
    };
  }
  _createNamedAttributeEngine() {
    return {
      queryAll: (n, r) => {
        const i = an(r, !0);
        if (i.name || i.attributes.length !== 1)
          throw new Error("Malformed attribute selector: " + r);
        const { name: s, value: o, caseSensitive: l } = i.attributes[0],
          a = l ? null : o.toLowerCase();
        let u;
        return (
          o instanceof RegExp
            ? (u = (p) => !!p.match(o))
            : l
              ? (u = (p) => p === o)
              : (u = (p) => p.toLowerCase().includes(a)),
          this._evaluator
            ._queryCSS({ scope: n, pierceShadow: !0 }, `[${s}]`)
            .filter((p) => u(p.getAttribute(s)))
        );
      },
    };
  }
  _createControlEngine() {
    return {
      queryAll(t, n) {
        if (n === "enter-frame") return [];
        if (n === "return-empty") return [];
        if (n === "component")
          return t.nodeType !== 1
            ? []
            : [t.childElementCount === 1 ? t.firstElementChild : t];
        throw new Error(
          `Internal error, unknown internal:control selector ${n}`,
        );
      },
    };
  }
  _createHasEngine() {
    return {
      queryAll: (n, r) =>
        n.nodeType !== 1
          ? []
          : !!this.querySelector(r.parsed, n, !1)
            ? [n]
            : [],
    };
  }
  _createHasNotEngine() {
    return {
      queryAll: (n, r) =>
        n.nodeType !== 1
          ? []
          : !!this.querySelector(r.parsed, n, !1)
            ? []
            : [n],
    };
  }
  _createVisibleEngine() {
    return {
      queryAll: (n, r) => (n.nodeType !== 1 ? [] : Ns(n) === !!r ? [n] : []),
    };
  }
  _createInternalChainEngine() {
    return { queryAll: (n, r) => this.querySelectorAll(r.parsed, n) };
  }
  extend(t, n) {
    const r = this.window.eval(`
    (() => {
      const module = {};
      ${t}
      return module.exports.default();
    })()`);
    return new r(this, n);
  }
  isVisible(t) {
    return Ns(t);
  }
  async viewportRatio(t) {
    return await new Promise((n) => {
      const r = new IntersectionObserver((i) => {
        n(i[0].intersectionRatio), r.disconnect();
      });
      r.observe(t), requestAnimationFrame(() => {});
    });
  }
  pollRaf(t) {
    return this.poll(t, (n) => requestAnimationFrame(n));
  }
  poll(t, n) {
    return this._runAbortableTask((r) => {
      let i, s;
      const o = new Promise((a, u) => {
          (i = a), (s = u);
        }),
        l = () => {
          if (!r.aborted)
            try {
              const a = t(r);
              a !== r.continuePolling ? i(a) : n(l);
            } catch (a) {
              r.log("  " + a.message), s(a);
            }
        };
      return l(), o;
    });
  }
  _runAbortableTask(t) {
    let n = [],
      r,
      i = !1;
    const s = () => {
        r && (r(n), (n = []), (r = void 0));
      },
      o = () =>
        new Promise((c) => {
          (r = c), (n.length || i) && s();
        });
    let l = "";
    const a = {
      injectedScript: this,
      aborted: !1,
      continuePolling: Symbol("continuePolling"),
      log: (c) => {
        (l = c), n.push({ message: c }), s();
      },
      logRepeating: (c) => {
        c !== l && a.log(c);
      },
    };
    return {
      takeNextLogs: o,
      run: () => {
        const c = t(a);
        return (
          c.finally(() => {
            (i = !0), s();
          }),
          c
        );
      },
      cancel: () => {
        a.aborted = !0;
      },
      takeLastLogs: () => n,
    };
  }
  getElementBorderWidth(t) {
    if (
      t.nodeType !== Node.ELEMENT_NODE ||
      !t.ownerDocument ||
      !t.ownerDocument.defaultView
    )
      return { left: 0, top: 0 };
    const n = t.ownerDocument.defaultView.getComputedStyle(t);
    return {
      left: parseInt(n.borderLeftWidth || "", 10),
      top: parseInt(n.borderTopWidth || "", 10),
    };
  }
  describeIFrameStyle(t) {
    if (!t.ownerDocument || !t.ownerDocument.defaultView)
      return "error:notconnected";
    const n = t.ownerDocument.defaultView;
    for (let i = t; i; i = ke(i))
      if (n.getComputedStyle(i).transform !== "none") return "transformed";
    const r = n.getComputedStyle(t);
    return {
      left:
        parseInt(r.borderLeftWidth || "", 10) +
        parseInt(r.paddingLeft || "", 10),
      top:
        parseInt(r.borderTopWidth || "", 10) + parseInt(r.paddingTop || "", 10),
    };
  }
  retarget(t, n) {
    let r = t.nodeType === Node.ELEMENT_NODE ? t : t.parentElement;
    return r
      ? (n === "none" ||
          (r.matches("input, textarea, select") ||
            (n === "button-link"
              ? (r = r.closest("button, [role=button], a, [role=link]") || r)
              : (r =
                  r.closest(
                    "button, [role=button], [role=checkbox], [role=radio]",
                  ) || r)),
          n === "follow-label" &&
            (!r.matches(
              "input, textarea, button, select, [role=button], [role=checkbox], [role=radio]",
            ) &&
              !r.isContentEditable &&
              (r = r.closest("label") || r),
            r.nodeName === "LABEL" && (r = r.control || r))),
        r)
      : null;
  }
  waitForElementStatesAndPerformAction(t, n, r, i) {
    let s,
      o = 0,
      l = 0,
      a = 0;
    return this.pollRaf((u) => {
      if (r) return u.log("    forcing action"), i(t, u);
      for (const c of n) {
        if (c !== "stable") {
          const f = this.elementState(t, c);
          if (typeof f != "boolean") return f;
          if (!f)
            return (
              u.logRepeating(`    element is not ${c} - waiting...`),
              u.continuePolling
            );
          continue;
        }
        const p = this.retarget(t, "no-follow-label");
        if (!p) return "error:notconnected";
        if (++o === 1) return u.continuePolling;
        const d = performance.now();
        if (this._stableRafCount > 1 && d - a < 15) return u.continuePolling;
        a = d;
        const v = p.getBoundingClientRect(),
          y = { x: v.top, y: v.left, width: v.width, height: v.height };
        s &&
        y.x === s.x &&
        y.y === s.y &&
        y.width === s.width &&
        y.height === s.height
          ? ++l
          : (l = 0);
        const w = l >= this._stableRafCount,
          h = w || !s;
        if (
          ((s = y),
          h || u.logRepeating("    element is not stable - waiting..."),
          !w)
        )
          return u.continuePolling;
      }
      return i(t, u);
    });
  }
  elementState(t, n) {
    const r = this.retarget(
      t,
      ["stable", "visible", "hidden"].includes(n) ? "none" : "follow-label",
    );
    if (!r || !r.isConnected) return n === "hidden" ? !0 : "error:notconnected";
    if (n === "visible") return this.isVisible(r);
    if (n === "hidden") return !this.isVisible(r);
    const i = zh(r);
    if (n === "disabled") return i;
    if (n === "enabled") return !i;
    const s = !(
      ["INPUT", "TEXTAREA", "SELECT"].includes(r.nodeName) &&
      r.hasAttribute("readonly")
    );
    if (n === "editable") return !i && s;
    if (n === "checked" || n === "unchecked") {
      const o = n === "checked",
        l = Ih(r, !1);
      if (l === "error")
        throw this.createStacklessError("Not a checkbox or radio button");
      return o === l;
    }
    throw this.createStacklessError(`Unexpected element state "${n}"`);
  }
  selectOptions(t, n, r) {
    const i = this.retarget(n, "follow-label");
    if (!i) return "error:notconnected";
    if (i.nodeName.toLowerCase() !== "select")
      throw this.createStacklessError("Element is not a <select> element");
    const s = i,
      o = [...s.options],
      l = [];
    let a = t.slice();
    for (let u = 0; u < o.length; u++) {
      const c = o[u],
        p = (d) => {
          if (d instanceof Node) return c === d;
          let v = !0;
          return (
            d.valueOrLabel !== void 0 &&
              (v =
                v &&
                (d.valueOrLabel === c.value || d.valueOrLabel === c.label)),
            d.value !== void 0 && (v = v && d.value === c.value),
            d.label !== void 0 && (v = v && d.label === c.label),
            d.index !== void 0 && (v = v && d.index === u),
            v
          );
        };
      if (a.some(p))
        if ((l.push(c), s.multiple)) a = a.filter((d) => !p(d));
        else {
          a = [];
          break;
        }
    }
    return a.length
      ? (r.logRepeating("    did not find some options - waiting... "),
        r.continuePolling)
      : ((s.value = void 0),
        l.forEach((u) => (u.selected = !0)),
        r.log("    selected specified option(s)"),
        s.dispatchEvent(new Event("input", { bubbles: !0, composed: !0 })),
        s.dispatchEvent(new Event("change", { bubbles: !0 })),
        l.map((u) => u.value));
  }
  fill(t, n, r) {
    const i = this.retarget(n, "follow-label");
    if (!i) return "error:notconnected";
    if (i.nodeName.toLowerCase() === "input") {
      const s = i,
        o = s.type.toLowerCase(),
        l = new Set([
          "color",
          "date",
          "time",
          "datetime-local",
          "month",
          "range",
          "week",
        ]);
      if (
        !new Set([
          "",
          "email",
          "number",
          "password",
          "search",
          "tel",
          "text",
          "url",
        ]).has(o) &&
        !l.has(o)
      )
        throw (
          (r.log(`    input of type "${o}" cannot be filled`),
          this.createStacklessError(`Input of type "${o}" cannot be filled`))
        );
      if (o === "number" && ((t = t.trim()), isNaN(Number(t))))
        throw this.createStacklessError(
          "Cannot type text into input[type=number]",
        );
      if (l.has(o)) {
        if (((t = t.trim()), s.focus(), (s.value = t), s.value !== t))
          throw this.createStacklessError("Malformed value");
        return (
          i.dispatchEvent(new Event("input", { bubbles: !0, composed: !0 })),
          i.dispatchEvent(new Event("change", { bubbles: !0 })),
          "done"
        );
      }
    } else if (i.nodeName.toLowerCase() !== "textarea") {
      if (!i.isContentEditable)
        throw this.createStacklessError(
          "Element is not an <input>, <textarea> or [contenteditable] element",
        );
    }
    return this.selectText(i), "needsinput";
  }
  selectText(t) {
    const n = this.retarget(t, "follow-label");
    if (!n) return "error:notconnected";
    if (n.nodeName.toLowerCase() === "input") {
      const s = n;
      return s.select(), s.focus(), "done";
    }
    if (n.nodeName.toLowerCase() === "textarea") {
      const s = n;
      return (
        (s.selectionStart = 0),
        (s.selectionEnd = s.value.length),
        s.focus(),
        "done"
      );
    }
    const r = n.ownerDocument.createRange();
    r.selectNodeContents(n);
    const i = n.ownerDocument.defaultView.getSelection();
    return i && (i.removeAllRanges(), i.addRange(r)), n.focus(), "done";
  }
  _activelyFocused(t) {
    const n = t.getRootNode().activeElement,
      r = n === t && !!t.ownerDocument && t.ownerDocument.hasFocus();
    return { activeElement: n, isFocused: r };
  }
  focusNode(t, n) {
    if (!t.isConnected) return "error:notconnected";
    if (t.nodeType !== Node.ELEMENT_NODE)
      throw this.createStacklessError("Node is not an element");
    const { activeElement: r, isFocused: i } = this._activelyFocused(t);
    if (
      (t.isContentEditable && !i && r && r.blur && r.blur(),
      t.focus(),
      t.focus(),
      n && !i && t.nodeName.toLowerCase() === "input")
    )
      try {
        t.setSelectionRange(0, 0);
      } catch {}
    return "done";
  }
  blurNode(t) {
    if (!t.isConnected) return "error:notconnected";
    if (t.nodeType !== Node.ELEMENT_NODE)
      throw this.createStacklessError("Node is not an element");
    return t.blur(), "done";
  }
  setInputFiles(t, n) {
    if (t.nodeType !== Node.ELEMENT_NODE)
      return "Node is not of type HTMLElement";
    const r = t;
    if (r.nodeName !== "INPUT") return "Not an <input> element";
    const i = r;
    if ((i.getAttribute("type") || "").toLowerCase() !== "file")
      return "Not an input[type=file] element";
    const o = n.map((a) => {
        const u = Uint8Array.from(atob(a.buffer), (c) => c.charCodeAt(0));
        return new File([u], a.name, {
          type: a.mimeType,
          lastModified: a.lastModifiedMs,
        });
      }),
      l = new DataTransfer();
    for (const a of o) l.items.add(a);
    (i.files = l.files),
      i.dispatchEvent(new Event("input", { bubbles: !0, composed: !0 })),
      i.dispatchEvent(new Event("change", { bubbles: !0 }));
  }
  expectHitTarget(t, n) {
    const r = [];
    let i = n;
    for (; i; ) {
      const c = _h(i);
      if (!c || (r.push(c), c.nodeType === 9)) break;
      i = c.host;
    }
    let s;
    for (let c = r.length - 1; c >= 0; c--) {
      const p = r[c],
        d = p.elementsFromPoint(t.x, t.y),
        v = p.elementFromPoint(t.x, t.y);
      if (v && d[0] && ke(v) === d[0]) {
        const x = this.window.getComputedStyle(v);
        (x == null ? void 0 : x.display) === "contents" && d.unshift(v);
      }
      d[0] && d[0].shadowRoot === p && d[1] === v && d.shift();
      const y = d[0];
      if (!y || ((s = y), c && y !== r[c - 1].host)) break;
    }
    const o = [];
    for (; s && s !== n; ) o.push(s), (s = ke(s));
    if (s === n) return "done";
    const l = this.previewNode(o[0] || this.document.documentElement);
    let a,
      u = n;
    for (; u; ) {
      const c = o.indexOf(u);
      if (c !== -1) {
        c > 1 && (a = this.previewNode(o[c - 1]));
        break;
      }
      u = ke(u);
    }
    return a
      ? { hitTargetDescription: `${l} from ${a} subtree` }
      : { hitTargetDescription: l };
  }
  setupHitTargetInterceptor(t, n, r, i) {
    const s = this.retarget(t, "button-link");
    if (!s || !s.isConnected) return "error:notconnected";
    if (r) {
      const c = this.expectHitTarget(r, s);
      if (c !== "done") return c.hitTargetDescription;
    }
    if (n === "drag") return { stop: () => "done" };
    const o = { hover: mp, tap: gp, mouse: vp }[n];
    let l;
    const a = (c) => {
        if (!o.has(c.type) || !c.isTrusted) return;
        const p =
          this.window.TouchEvent && c instanceof this.window.TouchEvent
            ? c.touches[0]
            : c;
        l === void 0 &&
          p &&
          (l = this.expectHitTarget({ x: p.clientX, y: p.clientY }, s)),
          (i || (l !== "done" && l !== void 0)) &&
            (c.preventDefault(),
            c.stopPropagation(),
            c.stopImmediatePropagation());
      },
      u = () => (
        this._hitTargetInterceptor === a &&
          (this._hitTargetInterceptor = void 0),
        l || "done"
      );
    return (this._hitTargetInterceptor = a), { stop: u };
  }
  dispatchEvent(t, n, r) {
    let i;
    switch (
      ((r = { bubbles: !0, cancelable: !0, composed: !0, ...r }), zv.get(n))
    ) {
      case "mouse":
        i = new MouseEvent(n, r);
        break;
      case "keyboard":
        i = new KeyboardEvent(n, r);
        break;
      case "touch":
        i = new TouchEvent(n, r);
        break;
      case "pointer":
        i = new PointerEvent(n, r);
        break;
      case "focus":
        i = new FocusEvent(n, r);
        break;
      case "drag":
        i = new DragEvent(n, r);
        break;
      case "wheel":
        i = new WheelEvent(n, r);
        break;
      case "deviceorientation":
        try {
          i = new DeviceOrientationEvent(n, r);
        } catch {
          const {
            bubbles: s,
            cancelable: o,
            alpha: l,
            beta: a,
            gamma: u,
            absolute: c,
          } = r;
          (i = this.document.createEvent("DeviceOrientationEvent")),
            i.initDeviceOrientationEvent(n, s, o, l, a, u, c);
        }
        break;
      case "devicemotion":
        try {
          i = new DeviceMotionEvent(n, r);
        } catch {
          const {
            bubbles: s,
            cancelable: o,
            acceleration: l,
            accelerationIncludingGravity: a,
            rotationRate: u,
            interval: c,
          } = r;
          (i = this.document.createEvent("DeviceMotionEvent")),
            i.initDeviceMotionEvent(n, s, o, l, a, u, c);
        }
        break;
      default:
        i = new Event(n, r);
        break;
    }
    t.dispatchEvent(i);
  }
  previewNode(t) {
    if (t.nodeType === Node.TEXT_NODE) return Pi(`#text=${t.nodeValue || ""}`);
    if (t.nodeType !== Node.ELEMENT_NODE)
      return Pi(`<${t.nodeName.toLowerCase()} />`);
    const n = t,
      r = [];
    for (let a = 0; a < n.attributes.length; a++) {
      const { name: u, value: c } = n.attributes[a];
      u !== "style" &&
        (!c && Ov.has(u) ? r.push(` ${u}`) : r.push(` ${u}="${c}"`));
    }
    r.sort((a, u) => a.length - u.length);
    const i = Yu(r.join(""), 50);
    if ($v.has(n.nodeName)) return Pi(`<${n.nodeName.toLowerCase()}${i}/>`);
    const s = n.childNodes;
    let o = !1;
    if (s.length <= 5) {
      o = !0;
      for (let a = 0; a < s.length; a++)
        o = o && s[a].nodeType === Node.TEXT_NODE;
    }
    const l = o ? n.textContent || "" : s.length ? "…" : "";
    return Pi(
      `<${n.nodeName.toLowerCase()}${i}>${Yu(l, 50)}</${n.nodeName.toLowerCase()}>`,
    );
  }
  strictModeViolationError(t, n) {
    const r = n
        .slice(0, 10)
        .map((s) => ({
          preview: this.previewNode(s),
          selector: this.generateSelector(s),
        })),
      i = r.map(
        (s, o) => `
    ${o + 1}) ${s.preview} aka ${Gt(this._sdkLanguage, s.selector)}`,
      );
    return (
      r.length < n.length &&
        i.push(`
    ...`),
      this
        .createStacklessError(`strict mode violation: ${Gt(this._sdkLanguage, gn(t))} resolved to ${n.length} elements:${i.join("")}
`)
    );
  }
  createStacklessError(t) {
    if (this._browserName === "firefox") {
      const r = new Error("Error: " + t);
      return (r.stack = ""), r;
    }
    const n = new Error(t);
    return delete n.stack, n;
  }
  maskSelectors(t, n) {
    this._highlight && this.hideHighlight(),
      (this._highlight = new Al(this)),
      this._highlight.install();
    const r = [];
    for (const i of t)
      r.push(this.querySelectorAll(i, this.document.documentElement));
    this._highlight.maskElements(r.flat(), n);
  }
  highlight(t) {
    this._highlight ||
      ((this._highlight = new Al(this)), this._highlight.install()),
      this._highlight.runHighlightOnRaf(t);
  }
  hideHighlight() {
    this._highlight && (this._highlight.uninstall(), delete this._highlight);
  }
  markTargetElements(t, n) {
    const r = new CustomEvent("__playwright_target__", {
      bubbles: !0,
      cancelable: !0,
      detail: n,
      composed: !0,
    });
    for (const i of t) i.dispatchEvent(r);
  }
  _setupGlobalListenersRemovalDetection() {
    const t = "__playwright_global_listeners_check__";
    let n = !1;
    const r = () => (n = !0);
    this.window.addEventListener(t, r),
      new MutationObserver((i) => {
        if (
          i.some((o) =>
            Array.from(o.addedNodes).includes(this.document.documentElement),
          ) &&
          ((n = !1), this.window.dispatchEvent(new CustomEvent(t)), !n)
        ) {
          this.window.addEventListener(t, r);
          for (const o of this.onGlobalListenersRemoved) o();
        }
      }).observe(this.document, { childList: !0 });
  }
  _setupHitTargetInterceptors() {
    const t = (r) => {
        var i;
        return (i = this._hitTargetInterceptor) == null
          ? void 0
          : i.call(this, r);
      },
      n = () => {
        for (const r of Dv)
          this.window.addEventListener(r, t, { capture: !0, passive: !1 });
      };
    n(), this.onGlobalListenersRemoved.add(n);
  }
  async expect(t, n, r) {
    return n.expression === "to.have.count" || n.expression.endsWith(".array")
      ? this.expectArray(r, n)
      : t
        ? await this.expectSingleElement(t, n)
        : !n.isNot && n.expression === "to.be.hidden"
          ? { matches: !0 }
          : n.isNot && n.expression === "to.be.visible"
            ? { matches: !1 }
            : !n.isNot && n.expression === "to.be.detached"
              ? { matches: !0 }
              : n.isNot && n.expression === "to.be.attached"
                ? { matches: !1 }
                : n.isNot && n.expression === "to.be.in.viewport"
                  ? { matches: !1 }
                  : { matches: n.isNot, missingRecevied: !0 };
  }
  async expectSingleElement(t, n) {
    var i;
    const r = n.expression;
    {
      let s;
      if (
        (r === "to.have.attribute"
          ? (s = t.hasAttribute(n.expressionArg))
          : r === "to.be.checked"
            ? (s = this.elementState(t, "checked"))
            : r === "to.be.unchecked"
              ? (s = this.elementState(t, "unchecked"))
              : r === "to.be.disabled"
                ? (s = this.elementState(t, "disabled"))
                : r === "to.be.editable"
                  ? (s = this.elementState(t, "editable"))
                  : r === "to.be.readonly"
                    ? (s = !this.elementState(t, "editable"))
                    : r === "to.be.empty"
                      ? t.nodeName === "INPUT" || t.nodeName === "TEXTAREA"
                        ? (s = !t.value)
                        : (s = !((i = t.textContent) != null && i.trim()))
                      : r === "to.be.enabled"
                        ? (s = this.elementState(t, "enabled"))
                        : r === "to.be.focused"
                          ? (s = this._activelyFocused(t).isFocused)
                          : r === "to.be.hidden"
                            ? (s = this.elementState(t, "hidden"))
                            : r === "to.be.visible"
                              ? (s = this.elementState(t, "visible"))
                              : r === "to.be.attached"
                                ? (s = !0)
                                : r === "to.be.detached" && (s = !1),
        s !== void 0)
      ) {
        if (s === "error:notcheckbox")
          throw this.createStacklessError("Element is not a checkbox");
        if (s === "error:notconnected")
          throw this.createStacklessError("Element is not connected");
        return { received: s, matches: s };
      }
    }
    if (r === "to.have.property") {
      let s = t;
      const o = n.expressionArg.split(".");
      for (let u = 0; u < o.length - 1; u++) {
        if (typeof s != "object" || !(o[u] in s))
          return { received: void 0, matches: !1 };
        s = s[o[u]];
      }
      const l = s[o[o.length - 1]],
        a = Ml(l, n.expectedValue);
      return { received: l, matches: a };
    }
    if (r === "to.be.in.viewport") {
      const s = await this.viewportRatio(t);
      return {
        received: `viewport ratio ${s}`,
        matches: s > 0 && s > (n.expectedNumber ?? 0) - 1e-9,
      };
    }
    if (r === "to.have.values") {
      if (
        ((t = this.retarget(t, "follow-label")),
        t.nodeName !== "SELECT" || !t.multiple)
      )
        throw this.createStacklessError(
          "Not a select element with a multiple attribute",
        );
      const s = [...t.selectedOptions].map((o) => o.value);
      return s.length !== n.expectedText.length
        ? { received: s, matches: !1 }
        : {
            received: s,
            matches: s
              .map((o, l) => new Co(n.expectedText[l]).matches(o))
              .every(Boolean),
          };
    }
    {
      let s;
      if (r === "to.have.attribute.value") {
        const o = t.getAttribute(n.expressionArg);
        if (o === null) return { received: null, matches: !1 };
        s = o;
      } else if (r === "to.have.class") s = t.classList.toString();
      else if (r === "to.have.css")
        s = this.window.getComputedStyle(t).getPropertyValue(n.expressionArg);
      else if (r === "to.have.id") s = t.id;
      else if (r === "to.have.text")
        s = n.useInnerText ? t.innerText : we(new Map(), t).full;
      else if (r === "to.have.title") s = this.document.title;
      else if (r === "to.have.url") s = this.document.location.href;
      else if (r === "to.have.value") {
        if (
          ((t = this.retarget(t, "follow-label")),
          t.nodeName !== "INPUT" &&
            t.nodeName !== "TEXTAREA" &&
            t.nodeName !== "SELECT")
        )
          throw this.createStacklessError("Not an input element");
        s = t.value;
      }
      if (s !== void 0 && n.expectedText) {
        const o = new Co(n.expectedText[0]);
        return { received: s, matches: o.matches(s) };
      }
    }
    throw this.createStacklessError("Unknown expect matcher: " + r);
  }
  expectArray(t, n) {
    const r = n.expression;
    if (r === "to.have.count") {
      const s = t.length,
        o = s === n.expectedNumber;
      return { received: s, matches: o };
    }
    let i;
    if (
      (r === "to.have.text.array" || r === "to.contain.text.array"
        ? (i = t.map((s) =>
            n.useInnerText ? s.innerText : we(new Map(), s).full,
          ))
        : r === "to.have.class.array" &&
          (i = t.map((s) => s.classList.toString())),
      i && n.expectedText)
    ) {
      const s = r !== "to.contain.text.array";
      if (!(i.length === n.expectedText.length || !s))
        return { received: i, matches: !1 };
      const l = n.expectedText.map((c) => new Co(c));
      let a = 0,
        u = 0;
      for (; a < l.length && u < i.length; ) l[a].matches(i[u]) && ++a, ++u;
      return { received: i, matches: a === l.length };
    }
    throw this.createStacklessError("Unknown expect matcher: " + r);
  }
  getElementAccessibleName(t, n) {
    return Pa(t, !!n);
  }
  getAriaRole(t) {
    return De(t);
  }
}
const $v = new Set([
    "AREA",
    "BASE",
    "BR",
    "COL",
    "COMMAND",
    "EMBED",
    "HR",
    "IMG",
    "INPUT",
    "KEYGEN",
    "LINK",
    "MENUITEM",
    "META",
    "PARAM",
    "SOURCE",
    "TRACK",
    "WBR",
  ]),
  Ov = new Set(["checked", "selected", "disabled", "readonly", "multiple"]);
function Pi(e) {
  return e.replace(/\n/g, "↵").replace(/\t/g, "⇆");
}
const zv = new Map([
    ["auxclick", "mouse"],
    ["click", "mouse"],
    ["dblclick", "mouse"],
    ["mousedown", "mouse"],
    ["mouseeenter", "mouse"],
    ["mouseleave", "mouse"],
    ["mousemove", "mouse"],
    ["mouseout", "mouse"],
    ["mouseover", "mouse"],
    ["mouseup", "mouse"],
    ["mouseleave", "mouse"],
    ["mousewheel", "mouse"],
    ["keydown", "keyboard"],
    ["keyup", "keyboard"],
    ["keypress", "keyboard"],
    ["textInput", "keyboard"],
    ["touchstart", "touch"],
    ["touchmove", "touch"],
    ["touchend", "touch"],
    ["touchcancel", "touch"],
    ["pointerover", "pointer"],
    ["pointerout", "pointer"],
    ["pointerenter", "pointer"],
    ["pointerleave", "pointer"],
    ["pointerdown", "pointer"],
    ["pointerup", "pointer"],
    ["pointermove", "pointer"],
    ["pointercancel", "pointer"],
    ["gotpointercapture", "pointer"],
    ["lostpointercapture", "pointer"],
    ["focus", "focus"],
    ["blur", "focus"],
    ["drag", "drag"],
    ["dragstart", "drag"],
    ["dragend", "drag"],
    ["dragover", "drag"],
    ["dragenter", "drag"],
    ["dragleave", "drag"],
    ["dragexit", "drag"],
    ["drop", "drag"],
    ["wheel", "wheel"],
    ["deviceorientation", "deviceorientation"],
    ["deviceorientationabsolute", "deviceorientation"],
    ["devicemotion", "devicemotion"],
  ]),
  mp = new Set(["mousemove"]),
  gp = new Set([
    "pointerdown",
    "pointerup",
    "touchstart",
    "touchend",
    "touchcancel",
  ]),
  vp = new Set([
    "mousedown",
    "mouseup",
    "pointerdown",
    "pointerup",
    "click",
    "auxclick",
    "dblclick",
    "contextmenu",
  ]),
  Dv = new Set([...mp, ...gp, ...vp]);
function Hv(e) {
  if (((e = e.substring(1, e.length - 1)), !e.includes("\\"))) return e;
  const t = [];
  let n = 0;
  for (; n < e.length; )
    e[n] === "\\" && n + 1 < e.length && n++, t.push(e[n++]);
  return t.join("");
}
function Ii(e, t) {
  if (e[0] === "/" && e.lastIndexOf("/") > 0) {
    const i = e.lastIndexOf("/"),
      s = new RegExp(e.substring(1, i), e.substring(i + 1));
    return { matcher: (o) => s.test(o.full), kind: "regex" };
  }
  const n = t ? JSON.parse.bind(JSON) : Hv;
  let r = !1;
  return (
    e.length > 1 && e[0] === '"' && e[e.length - 1] === '"'
      ? ((e = n(e)), (r = !0))
      : t &&
          e.length > 1 &&
          e[0] === '"' &&
          e[e.length - 2] === '"' &&
          e[e.length - 1] === "i"
        ? ((e = n(e.substring(0, e.length - 1))), (r = !1))
        : t &&
            e.length > 1 &&
            e[0] === '"' &&
            e[e.length - 2] === '"' &&
            e[e.length - 1] === "s"
          ? ((e = n(e.substring(0, e.length - 1))), (r = !0))
          : e.length > 1 &&
            e[0] === "'" &&
            e[e.length - 1] === "'" &&
            ((e = n(e)), (r = !0)),
    (e = ce(e)),
    r
      ? t
        ? { kind: "strict", matcher: (s) => ce(s.full) === e }
        : {
            matcher: (s) =>
              !e && !s.immediate.length
                ? !0
                : s.immediate.some((o) => ce(o) === e),
            kind: "strict",
          }
      : ((e = e.toLowerCase()),
        { kind: "lax", matcher: (i) => ce(i.full).toLowerCase().includes(e) })
  );
}
class Co {
  constructor(t) {
    if (
      ((this._normalizeWhiteSpace = t.normalizeWhiteSpace),
      (this._ignoreCase = t.ignoreCase),
      (this._string = t.matchSubstring ? void 0 : this.normalize(t.string)),
      (this._substring = t.matchSubstring ? this.normalize(t.string) : void 0),
      t.regexSource)
    ) {
      const n = new Set((t.regexFlags || "").split(""));
      t.ignoreCase === !1 && n.delete("i"),
        t.ignoreCase === !0 && n.add("i"),
        (this._regex = new RegExp(t.regexSource, [...n].join("")));
    }
  }
  matches(t) {
    return (
      this._regex || (t = this.normalize(t)),
      this._string !== void 0
        ? t === this._string
        : this._substring !== void 0
          ? t.includes(this._substring)
          : this._regex
            ? !!this._regex.test(t)
            : !1
    );
  }
  normalize(t) {
    return (
      t &&
      (this._normalizeWhiteSpace && (t = ce(t)),
      this._ignoreCase && (t = t.toLocaleLowerCase()),
      t)
    );
  }
}
function Ml(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    if (Array.isArray(e)) {
      if (e.length !== t.length) return !1;
      for (let r = 0; r < e.length; ++r) if (!Ml(e[r], t[r])) return !1;
      return !0;
    }
    if (e instanceof RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    const n = Object.keys(e);
    if (n.length !== Object.keys(t).length) return !1;
    for (let r = 0; r < n.length; ++r) if (!t.hasOwnProperty(n[r])) return !1;
    for (const r of n) if (!Ml(e[r], t[r])) return !1;
    return !0;
  }
  return typeof e == "number" && typeof t == "number"
    ? isNaN(e) && isNaN(t)
    : !1;
}
class xc {
  cursor() {
    return "default";
  }
}
class bo {
  constructor(t, n) {
    (this._hoveredModel = null),
      (this._hoveredElement = null),
      (this._recorder = t),
      (this._assertVisibility = n);
  }
  cursor() {
    return "pointer";
  }
  cleanup() {
    (this._hoveredModel = null), (this._hoveredElement = null);
  }
  onClick(t) {
    var n, r, i, s, o, l, a, u;
    Y(t),
      this._assertVisibility
        ? (n = this._hoveredModel) != null &&
          n.selector &&
          ((i = (r = this._recorder.delegate).recordAction) == null ||
            i.call(r, {
              name: "assertVisible",
              selector: this._hoveredModel.selector,
              signals: [],
            }),
          (o = (s = this._recorder.delegate).setMode) == null ||
            o.call(s, "recording"),
          (l = this._recorder.overlay) == null ||
            l.flashToolSucceeded("assertingVisibility"))
        : (u = (a = this._recorder.delegate).setSelector) == null ||
          u.call(a, this._hoveredModel ? this._hoveredModel.selector : "");
  }
  onPointerDown(t) {
    Y(t);
  }
  onPointerUp(t) {
    Y(t);
  }
  onMouseDown(t) {
    Y(t);
  }
  onMouseUp(t) {
    Y(t);
  }
  onMouseMove(t) {
    var i;
    Y(t);
    let n = this._recorder.deepEventTarget(t);
    if ((n.isConnected || (n = null), this._hoveredElement === n)) return;
    this._hoveredElement = n;
    const r = this._hoveredElement
      ? cn(this._recorder.injectedScript, this._hoveredElement, {
          testIdAttributeName: this._recorder.state.testIdAttributeName,
        })
      : null;
    ((i = this._hoveredModel) == null ? void 0 : i.selector) !==
      (r == null ? void 0 : r.selector) &&
      ((this._hoveredModel = r),
      this._recorder.updateHighlight(r, !0, {
        color: this._assertVisibility ? "#8acae480" : void 0,
      }));
  }
  onMouseEnter(t) {
    Y(t);
  }
  onMouseLeave(t) {
    Y(t);
    const n = this._recorder.injectedScript.window;
    n.top !== n &&
      this._recorder.deepEventTarget(t).nodeType === Node.DOCUMENT_NODE &&
      ((this._hoveredElement = null),
      (this._hoveredModel = null),
      this._recorder.updateHighlight(null, !0));
  }
  onKeyDown(t) {
    var n, r;
    Y(t),
      this._assertVisibility &&
        t.key === "Escape" &&
        ((r = (n = this._recorder.delegate).setMode) == null ||
          r.call(n, "recording"));
  }
  onKeyUp(t) {
    Y(t);
  }
  onScroll(t) {
    (this._hoveredElement = null),
      (this._hoveredModel = null),
      this._recorder.updateHighlight(null, !1);
  }
}
class Fv {
  constructor(t) {
    (this._performingAction = !1),
      (this._hoveredModel = null),
      (this._hoveredElement = null),
      (this._activeModel = null),
      (this._expectProgrammaticKeyUp = !1),
      (this._recorder = t);
  }
  cursor() {
    return "pointer";
  }
  cleanup() {
    (this._hoveredModel = null),
      (this._hoveredElement = null),
      (this._activeModel = null),
      (this._expectProgrammaticKeyUp = !1);
  }
  onClick(t) {
    if (
      this._shouldIgnoreMouseEvent(t) ||
      this._actionInProgress(t) ||
      this._consumedDueWrongTarget(t, this._hoveredModel)
    )
      return;
    const n = Lo(this._recorder.deepEventTarget(t));
    if (n) {
      this._performAction({
        name: n.checked ? "check" : "uncheck",
        selector: this._hoveredModel.selector,
        signals: [],
      });
      return;
    }
    this._performAction({
      name: "click",
      selector: this._hoveredModel.selector,
      position: Wv(t),
      signals: [],
      button: jv(t),
      modifiers: _c(t),
      clickCount: t.detail,
    });
  }
  onPointerDown(t) {
    this._shouldIgnoreMouseEvent(t) || this._performingAction || Y(t);
  }
  onPointerUp(t) {
    this._shouldIgnoreMouseEvent(t) || this._performingAction || Y(t);
  }
  onMouseDown(t) {
    this._shouldIgnoreMouseEvent(t) ||
      (this._performingAction || Y(t),
      (this._activeModel = this._hoveredModel));
  }
  onMouseUp(t) {
    this._shouldIgnoreMouseEvent(t) || this._performingAction || Y(t);
  }
  onMouseMove(t) {
    const n = this._recorder.deepEventTarget(t);
    this._hoveredElement !== n &&
      ((this._hoveredElement = n), this._updateModelForHoveredElement());
  }
  onMouseLeave(t) {
    const n = this._recorder.injectedScript.window;
    n.top !== n &&
      this._recorder.deepEventTarget(t).nodeType === Node.DOCUMENT_NODE &&
      ((this._hoveredElement = null), this._updateModelForHoveredElement());
  }
  onFocus(t) {
    this._onFocus(!0);
  }
  onInput(t) {
    var r, i, s, o;
    const n = this._recorder.deepEventTarget(t);
    if (n.nodeName === "INPUT" && n.type.toLowerCase() === "file") {
      (i = (r = this._recorder.delegate).recordAction) == null ||
        i.call(r, {
          name: "setInputFiles",
          selector: this._activeModel.selector,
          signals: [],
          files: [...(n.files || [])].map((l) => l.name),
        });
      return;
    }
    if (["INPUT", "TEXTAREA"].includes(n.nodeName) || n.isContentEditable) {
      if (
        (n.nodeName === "INPUT" &&
          ["checkbox", "radio"].includes(n.type.toLowerCase())) ||
        this._consumedDueWrongTarget(t, this._activeModel)
      )
        return;
      (o = (s = this._recorder.delegate).recordAction) == null ||
        o.call(s, {
          name: "fill",
          selector: this._activeModel.selector,
          signals: [],
          text: n.isContentEditable ? n.innerText : n.value,
        });
    }
    if (n.nodeName === "SELECT") {
      const l = n;
      if (this._actionInProgress(t)) return;
      this._performAction({
        name: "select",
        selector: this._hoveredModel.selector,
        options: [...l.selectedOptions].map((a) => a.value),
        signals: [],
      });
    }
  }
  onKeyDown(t) {
    if (this._shouldGenerateKeyPressFor(t)) {
      if (this._actionInProgress(t)) {
        this._expectProgrammaticKeyUp = !0;
        return;
      }
      if (!this._consumedDueWrongTarget(t, this._activeModel)) {
        if (t.key === " ") {
          const n = Lo(this._recorder.deepEventTarget(t));
          if (n) {
            this._performAction({
              name: n.checked ? "uncheck" : "check",
              selector: this._activeModel.selector,
              signals: [],
            });
            return;
          }
        }
        this._performAction({
          name: "press",
          selector: this._activeModel.selector,
          signals: [],
          key: t.key,
          modifiers: _c(t),
        });
      }
    }
  }
  onKeyUp(t) {
    if (this._shouldGenerateKeyPressFor(t)) {
      if (!this._expectProgrammaticKeyUp) {
        Y(t);
        return;
      }
      this._expectProgrammaticKeyUp = !1;
    }
  }
  onScroll(t) {
    (this._hoveredModel = null),
      (this._hoveredElement = null),
      this._recorder.updateHighlight(null, !1);
  }
  _onFocus(t) {
    const n = Bv(this._recorder.document);
    if (t && n === this._recorder.document.body) return;
    const r = n
      ? cn(this._recorder.injectedScript, n, {
          testIdAttributeName: this._recorder.state.testIdAttributeName,
        })
      : null;
    (this._activeModel = r && r.selector ? r : null),
      t && (this._hoveredElement = n),
      this._updateModelForHoveredElement();
  }
  _shouldIgnoreMouseEvent(t) {
    const n = this._recorder.deepEventTarget(t),
      r = n.nodeName;
    return !!(
      r === "SELECT" ||
      r === "OPTION" ||
      (r === "INPUT" && ["date", "range"].includes(n.type))
    );
  }
  _actionInProgress(t) {
    return this._performingAction ? !0 : (Y(t), !1);
  }
  _consumedDueWrongTarget(t, n) {
    return n && n.elements[0] === this._recorder.deepEventTarget(t)
      ? !1
      : (Y(t), !0);
  }
  async _performAction(t) {
    var n, r;
    (this._hoveredElement = null),
      (this._hoveredModel = null),
      (this._activeModel = null),
      this._recorder.updateHighlight(null, !1),
      (this._performingAction = !0),
      await ((r = (n = this._recorder.delegate).performAction) == null
        ? void 0
        : r.call(n, t).catch(() => {})),
      (this._performingAction = !1),
      this._onFocus(!1),
      this._recorder.injectedScript.isUnderTest &&
        console.error(
          "Action performed for test: " +
            JSON.stringify({
              hovered: this._hoveredModel ? this._hoveredModel.selector : null,
              active: this._activeModel ? this._activeModel.selector : null,
            }),
        );
  }
  _shouldGenerateKeyPressFor(t) {
    if (
      (t.key === "Enter" &&
        (this._recorder.deepEventTarget(t).nodeName === "TEXTAREA" ||
          this._recorder.deepEventTarget(t).isContentEditable)) ||
      ["Backspace", "Delete", "AltGraph"].includes(t.key) ||
      (t.key === "@" && t.code === "KeyL")
    )
      return !1;
    if (navigator.platform.includes("Mac")) {
      if (t.key === "v" && t.metaKey) return !1;
    } else if (
      (t.key === "v" && t.ctrlKey) ||
      (t.key === "Insert" && t.shiftKey)
    )
      return !1;
    if (["Shift", "Control", "Meta", "Alt", "Process"].includes(t.key))
      return !1;
    const n = t.ctrlKey || t.altKey || t.metaKey;
    return t.key.length === 1 && !n
      ? !!Lo(this._recorder.deepEventTarget(t))
      : !0;
  }
  _updateModelForHoveredElement() {
    if (!this._hoveredElement || !this._hoveredElement.isConnected) {
      (this._hoveredModel = null),
        (this._hoveredElement = null),
        this._recorder.updateHighlight(null, !0);
      return;
    }
    const { selector: t, elements: n } = cn(
      this._recorder.injectedScript,
      this._hoveredElement,
      { testIdAttributeName: this._recorder.state.testIdAttributeName },
    );
    (this._hoveredModel && this._hoveredModel.selector === t) ||
      ((this._hoveredModel = t ? { selector: t, elements: n } : null),
      this._recorder.updateHighlight(this._hoveredModel, !0, {
        color: "#dc6f6f7f",
      }));
  }
}
class Sc {
  constructor(t, n) {
    (this._hoverHighlight = null),
      (this._action = null),
      (this._dialogElement = null),
      (this._textCache = new Map()),
      (this._recorder = t),
      (this._kind = n),
      (this._acceptButton =
        this._recorder.document.createElement("x-pw-tool-item")),
      (this._acceptButton.title = "Accept"),
      this._acceptButton.classList.add("accept"),
      this._acceptButton.appendChild(
        this._recorder.document.createElement("x-div"),
      ),
      this._acceptButton.addEventListener("click", () => this._commit()),
      (this._cancelButton =
        this._recorder.document.createElement("x-pw-tool-item")),
      (this._cancelButton.title = "Close"),
      this._cancelButton.classList.add("cancel"),
      this._cancelButton.appendChild(
        this._recorder.document.createElement("x-div"),
      ),
      this._cancelButton.addEventListener("click", () => this._closeDialog());
  }
  cursor() {
    return "pointer";
  }
  cleanup() {
    this._closeDialog(), (this._hoverHighlight = null);
  }
  onClick(t) {
    var n, r, i, s, o;
    if ((Y(t), this._kind === "value")) {
      const l = this._generateAction();
      l &&
        ((r = (n = this._recorder.delegate).recordAction) == null ||
          r.call(n, l),
        (s = (i = this._recorder.delegate).setMode) == null ||
          s.call(i, "recording"),
        (o = this._recorder.overlay) == null ||
          o.flashToolSucceeded("assertingValue"));
    } else this._dialogElement || this._showDialog();
  }
  onMouseDown(t) {
    const n = this._recorder.deepEventTarget(t);
    this._elementHasValue(n) && t.preventDefault();
  }
  onMouseMove(t) {
    var r;
    if (this._dialogElement) return;
    const n = this._recorder.deepEventTarget(t);
    ((r = this._hoverHighlight) == null ? void 0 : r.elements[0]) !== n &&
      (this._kind === "text"
        ? (this._hoverHighlight = we(this._textCache, n).full
            ? { elements: [n], selector: "" }
            : null)
        : (this._hoverHighlight = this._elementHasValue(n)
            ? cn(this._recorder.injectedScript, n, {
                testIdAttributeName: this._recorder.state.testIdAttributeName,
              })
            : null),
      this._recorder.updateHighlight(this._hoverHighlight, !0, {
        color: "#8acae480",
      }));
  }
  onKeyDown(t) {
    var n, r;
    t.key === "Escape" &&
      ((r = (n = this._recorder.delegate).setMode) == null ||
        r.call(n, "recording")),
      Y(t);
  }
  onScroll(t) {
    this._recorder.updateHighlight(this._hoverHighlight, !1, {
      color: "#8acae480",
    });
  }
  _elementHasValue(t) {
    return (
      t.nodeName === "TEXTAREA" ||
      t.nodeName === "SELECT" ||
      (t.nodeName === "INPUT" &&
        !["button", "image", "reset", "submit"].includes(t.type))
    );
  }
  _generateAction() {
    var n;
    this._textCache.clear();
    const t = (n = this._hoverHighlight) == null ? void 0 : n.elements[0];
    if (!t) return null;
    if (this._kind === "value") {
      if (!this._elementHasValue(t)) return null;
      const { selector: r } = cn(this._recorder.injectedScript, t, {
        testIdAttributeName: this._recorder.state.testIdAttributeName,
      });
      return t.nodeName === "INPUT" &&
        ["checkbox", "radio"].includes(t.type.toLowerCase())
        ? {
            name: "assertChecked",
            selector: r,
            signals: [],
            checked: !t.checked,
          }
        : { name: "assertValue", selector: r, signals: [], value: t.value };
    } else
      return (
        (this._hoverHighlight = cn(this._recorder.injectedScript, t, {
          testIdAttributeName: this._recorder.state.testIdAttributeName,
          forTextExpect: !0,
        })),
        this._recorder.updateHighlight(this._hoverHighlight, !0, {
          color: "#8acae480",
        }),
        {
          name: "assertText",
          selector: this._hoverHighlight.selector,
          signals: [],
          text: ce(we(this._textCache, t).full),
          substring: !0,
        }
      );
  }
  _renderValue(t) {
    return (t == null ? void 0 : t.name) === "assertText"
      ? ce(t.text)
      : (t == null ? void 0 : t.name) === "assertChecked"
        ? String(t.checked)
        : (t == null ? void 0 : t.name) === "assertValue"
          ? t.value
          : "";
  }
  _commit() {
    var t, n, r, i;
    !this._action ||
      !this._dialogElement ||
      (this._closeDialog(),
      (n = (t = this._recorder.delegate).recordAction) == null ||
        n.call(t, this._action),
      (i = (r = this._recorder.delegate).setMode) == null ||
        i.call(r, "recording"));
  }
  _showDialog() {
    var a;
    if (
      !((a = this._hoverHighlight) != null && a.elements[0]) ||
      ((this._action = this._generateAction()),
      !this._action || this._action.name !== "assertText")
    )
      return;
    (this._dialogElement =
      this._recorder.document.createElement("x-pw-dialog")),
      (this._keyboardListener = (u) => {
        if (u.key === "Escape") {
          this._closeDialog();
          return;
        }
        if (u.key === "Enter" && (u.ctrlKey || u.metaKey)) {
          this._dialogElement && this._commit();
          return;
        }
      }),
      this._recorder.document.addEventListener(
        "keydown",
        this._keyboardListener,
        !0,
      );
    const t = this._recorder.document.createElement("x-pw-tools-list"),
      n = this._recorder.document.createElement("label");
    (n.textContent = "Assert that element contains text"),
      t.appendChild(n),
      t.appendChild(this._recorder.document.createElement("x-spacer")),
      t.appendChild(this._acceptButton),
      t.appendChild(this._cancelButton),
      this._dialogElement.appendChild(t);
    const r = this._recorder.document.createElement("x-pw-dialog-body"),
      i = this._action,
      s = this._recorder.document.createElement("textarea");
    s.setAttribute("spellcheck", "false"),
      (s.value = this._renderValue(this._action)),
      s.classList.add("text-editor");
    const o = () => {
      var v;
      const u = ce(s.value),
        c = (v = this._hoverHighlight) == null ? void 0 : v.elements[0];
      if (!c) return;
      i.text = u;
      const p = ce(we(this._textCache, c).full),
        d = u && p.includes(u);
      s.classList.toggle("does-not-match", !d);
    };
    s.addEventListener("input", o),
      r.appendChild(s),
      this._dialogElement.appendChild(r),
      this._recorder.highlight.appendChild(this._dialogElement);
    const l = this._recorder.highlight.tooltipPosition(
      this._recorder.highlight.firstBox(),
      this._dialogElement,
    );
    (this._dialogElement.style.top = l.anchorTop + "px"),
      (this._dialogElement.style.left = l.anchorLeft + "px"),
      s.focus();
  }
  _closeDialog() {
    this._dialogElement &&
      (this._dialogElement.remove(),
      this._recorder.document.removeEventListener(
        "keydown",
        this._keyboardListener,
      ),
      (this._dialogElement = null));
  }
}
class Uv {
  constructor(t) {
    (this._offsetX = 0),
      (this._measure = { width: 0, height: 0 }),
      (this._recorder = t);
    const n = this._recorder.injectedScript.document;
    this._overlayElement = n.createElement("x-pw-overlay");
    const r = n.createElement("x-pw-tools-list");
    this._overlayElement.appendChild(r);
    const i = n.createElement("x-pw-tool-gripper");
    i.addEventListener("mousedown", (s) => {
      this._dragState = {
        offsetX: this._offsetX,
        dragStart: { x: s.clientX, y: 0 },
      };
    }),
      i.appendChild(n.createElement("x-div")),
      r.appendChild(i),
      (this._recordToggle =
        this._recorder.injectedScript.document.createElement("x-pw-tool-item")),
      (this._recordToggle.title = "Record"),
      this._recordToggle.classList.add("record"),
      this._recordToggle.appendChild(
        this._recorder.injectedScript.document.createElement("x-div"),
      ),
      this._recordToggle.addEventListener("click", () => {
        var s, o;
        (o = (s = this._recorder.delegate).setMode) == null ||
          o.call(
            s,
            this._recorder.state.mode === "none" ||
              this._recorder.state.mode === "standby" ||
              this._recorder.state.mode === "inspecting"
              ? "recording"
              : "standby",
          );
      }),
      r.appendChild(this._recordToggle),
      (this._pickLocatorToggle =
        this._recorder.injectedScript.document.createElement("x-pw-tool-item")),
      (this._pickLocatorToggle.title = "Pick locator"),
      this._pickLocatorToggle.classList.add("pick-locator"),
      this._pickLocatorToggle.appendChild(
        this._recorder.injectedScript.document.createElement("x-div"),
      ),
      this._pickLocatorToggle.addEventListener("click", () => {
        var o, l;
        const s = {
          inspecting: "standby",
          none: "inspecting",
          standby: "inspecting",
          recording: "recording-inspecting",
          "recording-inspecting": "recording",
          assertingText: "recording-inspecting",
          assertingVisibility: "recording-inspecting",
          assertingValue: "recording-inspecting",
        };
        (l = (o = this._recorder.delegate).setMode) == null ||
          l.call(o, s[this._recorder.state.mode]);
      }),
      r.appendChild(this._pickLocatorToggle),
      (this._assertVisibilityToggle =
        this._recorder.injectedScript.document.createElement("x-pw-tool-item")),
      (this._assertVisibilityToggle.title = "Assert visibility"),
      this._assertVisibilityToggle.classList.add("visibility"),
      this._assertVisibilityToggle.appendChild(
        this._recorder.injectedScript.document.createElement("x-div"),
      ),
      this._assertVisibilityToggle.addEventListener("click", () => {
        var s, o;
        this._assertVisibilityToggle.classList.contains("disabled") ||
          (o = (s = this._recorder.delegate).setMode) == null ||
          o.call(
            s,
            this._recorder.state.mode === "assertingVisibility"
              ? "recording"
              : "assertingVisibility",
          );
      }),
      r.appendChild(this._assertVisibilityToggle),
      (this._assertTextToggle =
        this._recorder.injectedScript.document.createElement("x-pw-tool-item")),
      (this._assertTextToggle.title = "Assert text"),
      this._assertTextToggle.classList.add("text"),
      this._assertTextToggle.appendChild(
        this._recorder.injectedScript.document.createElement("x-div"),
      ),
      this._assertTextToggle.addEventListener("click", () => {
        var s, o;
        this._assertTextToggle.classList.contains("disabled") ||
          (o = (s = this._recorder.delegate).setMode) == null ||
          o.call(
            s,
            this._recorder.state.mode === "assertingText"
              ? "recording"
              : "assertingText",
          );
      }),
      r.appendChild(this._assertTextToggle),
      (this._assertValuesToggle =
        this._recorder.injectedScript.document.createElement("x-pw-tool-item")),
      (this._assertValuesToggle.title = "Assert value"),
      this._assertValuesToggle.classList.add("value"),
      this._assertValuesToggle.appendChild(
        this._recorder.injectedScript.document.createElement("x-div"),
      ),
      this._assertValuesToggle.addEventListener("click", () => {
        var s, o;
        this._assertValuesToggle.classList.contains("disabled") ||
          (o = (s = this._recorder.delegate).setMode) == null ||
          o.call(
            s,
            this._recorder.state.mode === "assertingValue"
              ? "recording"
              : "assertingValue",
          );
      }),
      r.appendChild(this._assertValuesToggle),
      this._updateVisualPosition();
  }
  install() {
    this._recorder.highlight.appendChild(this._overlayElement),
      this._updateVisualPosition();
  }
  contains(t) {
    return Qs(this._overlayElement, t);
  }
  setUIState(t) {
    this._recordToggle.classList.toggle(
      "active",
      t.mode === "recording" ||
        t.mode === "assertingText" ||
        t.mode === "assertingVisibility" ||
        t.mode === "assertingValue" ||
        t.mode === "recording-inspecting",
    ),
      this._pickLocatorToggle.classList.toggle(
        "active",
        t.mode === "inspecting" || t.mode === "recording-inspecting",
      ),
      this._assertVisibilityToggle.classList.toggle(
        "active",
        t.mode === "assertingVisibility",
      ),
      this._assertVisibilityToggle.classList.toggle(
        "disabled",
        t.mode === "none" || t.mode === "standby" || t.mode === "inspecting",
      ),
      this._assertTextToggle.classList.toggle(
        "active",
        t.mode === "assertingText",
      ),
      this._assertTextToggle.classList.toggle(
        "disabled",
        t.mode === "none" || t.mode === "standby" || t.mode === "inspecting",
      ),
      this._assertValuesToggle.classList.toggle(
        "active",
        t.mode === "assertingValue",
      ),
      this._assertValuesToggle.classList.toggle(
        "disabled",
        t.mode === "none" || t.mode === "standby" || t.mode === "inspecting",
      ),
      this._offsetX !== t.overlay.offsetX &&
        ((this._offsetX = t.overlay.offsetX), this._updateVisualPosition()),
      t.mode === "none" ? this._hideOverlay() : this._showOverlay();
  }
  flashToolSucceeded(t) {
    const n =
      t === "assertingVisibility"
        ? this._assertVisibilityToggle
        : this._assertValuesToggle;
    n.classList.add("succeeded"),
      setTimeout(() => n.classList.remove("succeeded"), 2e3);
  }
  _hideOverlay() {
    this._overlayElement.setAttribute("hidden", "true");
  }
  _showOverlay() {
    this._overlayElement.hasAttribute("hidden") &&
      (this._overlayElement.removeAttribute("hidden"),
      this._updateVisualPosition());
  }
  _updateVisualPosition() {
    (this._measure = this._overlayElement.getBoundingClientRect()),
      (this._overlayElement.style.left =
        (this._recorder.injectedScript.window.innerWidth -
          this._measure.width) /
          2 +
        this._offsetX +
        "px");
  }
  onMouseMove(t) {
    var n, r;
    if (!t.buttons) return (this._dragState = void 0), !1;
    if (this._dragState) {
      this._offsetX =
        this._dragState.offsetX + t.clientX - this._dragState.dragStart.x;
      const i =
        (this._recorder.injectedScript.window.innerWidth -
          this._measure.width) /
          2 -
        10;
      return (
        (this._offsetX = Math.max(-i, Math.min(i, this._offsetX))),
        this._updateVisualPosition(),
        (r = (n = this._recorder.delegate).setOverlayState) == null ||
          r.call(n, { offsetX: this._offsetX }),
        Y(t),
        !0
      );
    }
    return !1;
  }
  onMouseUp(t) {
    return this._dragState ? (Y(t), !0) : !1;
  }
  onClick(t) {
    return this._dragState ? ((this._dragState = void 0), Y(t), !0) : !1;
  }
}
class Vv {
  constructor(t) {
    (this._listeners = []),
      (this._actionSelectorModel = null),
      (this.state = {
        mode: "none",
        testIdAttributeName: "data-testid",
        language: "javascript",
        overlay: { offsetX: 0 },
      }),
      (this.delegate = {}),
      (this.document = t.document),
      (this.injectedScript = t),
      (this.highlight = new Al(t)),
      (this._tools = {
        none: new xc(),
        standby: new xc(),
        inspecting: new bo(this, !1),
        recording: new Fv(this),
        "recording-inspecting": new bo(this, !1),
        assertingText: new Sc(this, "text"),
        assertingVisibility: new bo(this, !0),
        assertingValue: new Sc(this, "value"),
      }),
      (this._currentTool = this._tools.none),
      t.window.top === t.window &&
        ((this.overlay = new Uv(this)), this.overlay.setUIState(this.state)),
      (this._styleElement = this.document.createElement("style")),
      (this._styleElement.textContent = `
      body[data-pw-cursor=pointer] *, body[data-pw-cursor=pointer] *::after { cursor: pointer !important; }
      body[data-pw-cursor=text] *, body[data-pw-cursor=text] *::after { cursor: text !important; }
    `),
      this.installListeners(),
      t.isUnderTest && console.error("Recorder script ready for test");
  }
  installListeners() {
    var t;
    qv(this._listeners),
      (this._listeners = [
        Se(this.document, "click", (n) => this._onClick(n), !0),
        Se(this.document, "auxclick", (n) => this._onClick(n), !0),
        Se(this.document, "dragstart", (n) => this._onDragStart(n), !0),
        Se(this.document, "input", (n) => this._onInput(n), !0),
        Se(this.document, "keydown", (n) => this._onKeyDown(n), !0),
        Se(this.document, "keyup", (n) => this._onKeyUp(n), !0),
        Se(this.document, "pointerdown", (n) => this._onPointerDown(n), !0),
        Se(this.document, "pointerup", (n) => this._onPointerUp(n), !0),
        Se(this.document, "mousedown", (n) => this._onMouseDown(n), !0),
        Se(this.document, "mouseup", (n) => this._onMouseUp(n), !0),
        Se(this.document, "mousemove", (n) => this._onMouseMove(n), !0),
        Se(this.document, "mouseleave", (n) => this._onMouseLeave(n), !0),
        Se(this.document, "mouseenter", (n) => this._onMouseEnter(n), !0),
        Se(this.document, "focus", (n) => this._onFocus(n), !0),
        Se(this.document, "scroll", (n) => this._onScroll(n), !0),
      ]),
      this.highlight.install(),
      (t = this.overlay) == null || t.install(),
      this.injectedScript.document.head.appendChild(this._styleElement);
  }
  _switchCurrentTool() {
    var n, r, i;
    const t = this._tools[this.state.mode];
    t !== this._currentTool &&
      ((r = (n = this._currentTool).cleanup) == null || r.call(n),
      this.clearHighlight(),
      (this._currentTool = t),
      (i = this.injectedScript.document.body) == null ||
        i.setAttribute("data-pw-cursor", t.cursor()));
  }
  setUIState(t, n) {
    var r, i, s, o;
    (this.delegate = n),
      (t.actionPoint &&
        this.state.actionPoint &&
        t.actionPoint.x === this.state.actionPoint.x &&
        t.actionPoint.y === this.state.actionPoint.y) ||
        (!t.actionPoint && !this.state.actionPoint) ||
        (t.actionPoint
          ? this.highlight.showActionPoint(t.actionPoint.x, t.actionPoint.y)
          : this.highlight.hideActionPoint()),
      (this.state = t),
      this.highlight.setLanguage(t.language),
      this._switchCurrentTool(),
      (r = this.overlay) == null || r.setUIState(t),
      (i = this._actionSelectorModel) != null &&
        i.selector &&
        !((s = this._actionSelectorModel) != null && s.elements.length) &&
        (this._actionSelectorModel = null),
      t.actionSelector !==
        ((o = this._actionSelectorModel) == null ? void 0 : o.selector) &&
        (this._actionSelectorModel = t.actionSelector
          ? Xv(this.injectedScript, t.actionSelector, this.document)
          : null),
      (this.state.mode === "none" || this.state.mode === "standby") &&
        this.updateHighlight(this._actionSelectorModel, !1);
  }
  clearHighlight() {
    var t, n;
    (n = (t = this._currentTool).cleanup) == null || n.call(t),
      this.updateHighlight(null, !1);
  }
  _onClick(t) {
    var n, r, i;
    t.isTrusted &&
      (((n = this.overlay) != null && n.onClick(t)) ||
        this._ignoreOverlayEvent(t) ||
        (i = (r = this._currentTool).onClick) == null ||
        i.call(r, t));
  }
  _onDragStart(t) {
    var n, r;
    t.isTrusted &&
      (this._ignoreOverlayEvent(t) ||
        (r = (n = this._currentTool).onDragStart) == null ||
        r.call(n, t));
  }
  _onPointerDown(t) {
    var n, r;
    t.isTrusted &&
      (this._ignoreOverlayEvent(t) ||
        (r = (n = this._currentTool).onPointerDown) == null ||
        r.call(n, t));
  }
  _onPointerUp(t) {
    var n, r;
    t.isTrusted &&
      (this._ignoreOverlayEvent(t) ||
        (r = (n = this._currentTool).onPointerUp) == null ||
        r.call(n, t));
  }
  _onMouseDown(t) {
    var n, r;
    t.isTrusted &&
      (this._ignoreOverlayEvent(t) ||
        (r = (n = this._currentTool).onMouseDown) == null ||
        r.call(n, t));
  }
  _onMouseUp(t) {
    var n, r, i;
    t.isTrusted &&
      (((n = this.overlay) != null && n.onMouseUp(t)) ||
        this._ignoreOverlayEvent(t) ||
        (i = (r = this._currentTool).onMouseUp) == null ||
        i.call(r, t));
  }
  _onMouseMove(t) {
    var n, r, i;
    t.isTrusted &&
      (((n = this.overlay) != null && n.onMouseMove(t)) ||
        this._ignoreOverlayEvent(t) ||
        (i = (r = this._currentTool).onMouseMove) == null ||
        i.call(r, t));
  }
  _onMouseEnter(t) {
    var n, r;
    t.isTrusted &&
      (this._ignoreOverlayEvent(t) ||
        (r = (n = this._currentTool).onMouseEnter) == null ||
        r.call(n, t));
  }
  _onMouseLeave(t) {
    var n, r;
    t.isTrusted &&
      (this._ignoreOverlayEvent(t) ||
        (r = (n = this._currentTool).onMouseLeave) == null ||
        r.call(n, t));
  }
  _onFocus(t) {
    var n, r;
    t.isTrusted &&
      (this._ignoreOverlayEvent(t) ||
        (r = (n = this._currentTool).onFocus) == null ||
        r.call(n, t));
  }
  _onScroll(t) {
    var n, r;
    t.isTrusted &&
      (this.highlight.hideActionPoint(),
      (r = (n = this._currentTool).onScroll) == null || r.call(n, t));
  }
  _onInput(t) {
    var n, r;
    this._ignoreOverlayEvent(t) ||
      (r = (n = this._currentTool).onInput) == null ||
      r.call(n, t);
  }
  _onKeyDown(t) {
    var n, r;
    t.isTrusted &&
      (this._ignoreOverlayEvent(t) ||
        (r = (n = this._currentTool).onKeyDown) == null ||
        r.call(n, t));
  }
  _onKeyUp(t) {
    var n, r;
    t.isTrusted &&
      (this._ignoreOverlayEvent(t) ||
        (r = (n = this._currentTool).onKeyUp) == null ||
        r.call(n, t));
  }
  updateHighlight(t, n, r = {}) {
    var i, s;
    r.tooltipText === void 0 &&
      t != null &&
      t.selector &&
      (r.tooltipText = Gt(this.state.language, t.selector)),
      this.highlight.updateHighlight(
        (t == null ? void 0 : t.elements) || [],
        r,
      ),
      n && ((s = (i = this.delegate).highlightUpdated) == null || s.call(i));
  }
  _ignoreOverlayEvent(t) {
    return t.composedPath()[0].nodeName.toLowerCase() === "x-pw-glass";
  }
  deepEventTarget(t) {
    var n;
    for (const r of t.composedPath())
      if (!((n = this.overlay) != null && n.contains(r))) return r;
    return t.composedPath()[0];
  }
}
function Bv(e) {
  let t = e.activeElement;
  for (; t && t.shadowRoot && t.shadowRoot.activeElement; )
    t = t.shadowRoot.activeElement;
  return t;
}
function _c(e) {
  return (
    (e.altKey ? 1 : 0) |
    (e.ctrlKey ? 2 : 0) |
    (e.metaKey ? 4 : 0) |
    (e.shiftKey ? 8 : 0)
  );
}
function jv(e) {
  switch (e.which) {
    case 1:
      return "left";
    case 2:
      return "middle";
    case 3:
      return "right";
  }
  return "left";
}
function Wv(e) {
  if (e.target.nodeName === "CANVAS") return { x: e.offsetX, y: e.offsetY };
}
function Y(e) {
  e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation();
}
function Lo(e) {
  if (!e || e.nodeName !== "INPUT") return null;
  const t = e;
  return ["checkbox", "radio"].includes(t.type) ? t : null;
}
function Se(e, t, n, r) {
  return (
    e.addEventListener(t, n, r),
    () => {
      e.removeEventListener(t, n, r);
    }
  );
}
function qv(e) {
  for (const t of e) t();
  e.splice(0, e.length);
}
function Xv(e, t, n) {
  try {
    const r = e.parseSelector(t);
    return { selector: t, elements: e.querySelectorAll(r, n) };
  } catch {
    return { selector: t, elements: [] };
  }
}
function Oa(e, t, n) {
  return `internal:attr=[${e}=${Ee(t, (n == null ? void 0 : n.exact) || !1)}]`;
}
function Qv(e, t) {
  return `internal:testid=[${e}=${Ee(t, !0)}]`;
}
function Kv(e, t) {
  return "internal:label=" + ot(e, !!(t != null && t.exact));
}
function Gv(e, t) {
  return Oa("alt", e, t);
}
function Yv(e, t) {
  return Oa("title", e, t);
}
function Jv(e, t) {
  return Oa("placeholder", e, t);
}
function Zv(e, t) {
  return "internal:text=" + ot(e, !!(t != null && t.exact));
}
function ey(e, t = {}) {
  const n = [];
  return (
    t.checked !== void 0 && n.push(["checked", String(t.checked)]),
    t.disabled !== void 0 && n.push(["disabled", String(t.disabled)]),
    t.selected !== void 0 && n.push(["selected", String(t.selected)]),
    t.expanded !== void 0 && n.push(["expanded", String(t.expanded)]),
    t.includeHidden !== void 0 &&
      n.push(["include-hidden", String(t.includeHidden)]),
    t.level !== void 0 && n.push(["level", String(t.level)]),
    t.name !== void 0 && n.push(["name", Ee(t.name, !!t.exact)]),
    t.pressed !== void 0 && n.push(["pressed", String(t.pressed)]),
    `internal:role=${e}${n.map(([r, i]) => `[${r}=${i}]`).join("")}`
  );
}
const Sr = Symbol("selector"),
  ty = Symbol("injectedScript");
class Fn {
  constructor(t, n, r) {
    if (
      ((this[Sr] = n),
      (this[ty] = t),
      r != null &&
        r.hasText &&
        (n += ` >> internal:has-text=${ot(r.hasText, !1)}`),
      r != null &&
        r.hasNotText &&
        (n += ` >> internal:has-not-text=${ot(r.hasNotText, !1)}`),
      r != null &&
        r.has &&
        (n += " >> internal:has=" + JSON.stringify(r.has[Sr])),
      r != null &&
        r.hasNot &&
        (n += " >> internal:has-not=" + JSON.stringify(r.hasNot[Sr])),
      n)
    ) {
      const o = t.parseSelector(n);
      (this.element = t.querySelector(o, t.document, !1)),
        (this.elements = t.querySelectorAll(o, t.document));
    }
    const i = n,
      s = this;
    (s.locator = (o, l) => new Fn(t, i ? i + " >> " + o : o, l)),
      (s.getByTestId = (o) =>
        s.locator(
          Qv(t.testIdAttributeNameForStrictErrorAndConsoleCodegen(), o),
        )),
      (s.getByAltText = (o, l) => s.locator(Gv(o, l))),
      (s.getByLabel = (o, l) => s.locator(Kv(o, l))),
      (s.getByPlaceholder = (o, l) => s.locator(Jv(o, l))),
      (s.getByText = (o, l) => s.locator(Zv(o, l))),
      (s.getByTitle = (o, l) => s.locator(Yv(o, l))),
      (s.getByRole = (o, l = {}) => s.locator(ey(o, l))),
      (s.filter = (o) => new Fn(t, n, o)),
      (s.first = () => s.locator("nth=0")),
      (s.last = () => s.locator("nth=-1")),
      (s.nth = (o) => s.locator(`nth=${o}`)),
      (s.and = (o) =>
        new Fn(t, i + " >> internal:and=" + JSON.stringify(o[Sr]))),
      (s.or = (o) => new Fn(t, i + " >> internal:or=" + JSON.stringify(o[Sr])));
  }
}
class ny {
  constructor(t) {
    (this._injectedScript = t),
      !this._injectedScript.window.playwright &&
        ((this._injectedScript.window.playwright = {
          $: (n, r) => this._querySelector(n, !!r),
          $$: (n) => this._querySelectorAll(n),
          inspect: (n) => this._inspect(n),
          selector: (n) => this._selector(n),
          generateLocator: (n, r) => this._generateLocator(n, r),
          resume: () => this._resume(),
          ...new Fn(t, ""),
        }),
        delete this._injectedScript.window.playwright.filter,
        delete this._injectedScript.window.playwright.first,
        delete this._injectedScript.window.playwright.last,
        delete this._injectedScript.window.playwright.nth,
        delete this._injectedScript.window.playwright.and,
        delete this._injectedScript.window.playwright.or);
  }
  _querySelector(t, n) {
    if (typeof t != "string")
      throw new Error("Usage: playwright.query('Playwright >> selector').");
    const r = this._injectedScript.parseSelector(t);
    return this._injectedScript.querySelector(
      r,
      this._injectedScript.document,
      n,
    );
  }
  _querySelectorAll(t) {
    if (typeof t != "string")
      throw new Error("Usage: playwright.$$('Playwright >> selector').");
    const n = this._injectedScript.parseSelector(t);
    return this._injectedScript.querySelectorAll(
      n,
      this._injectedScript.document,
    );
  }
  _inspect(t) {
    if (typeof t != "string")
      throw new Error("Usage: playwright.inspect('Playwright >> selector').");
    this._injectedScript.window.inspect(this._querySelector(t, !1));
  }
  _selector(t) {
    if (!(t instanceof Element))
      throw new Error("Usage: playwright.selector(element).");
    return this._injectedScript.generateSelector(t);
  }
  _generateLocator(t, n) {
    if (!(t instanceof Element))
      throw new Error("Usage: playwright.locator(element).");
    const r = this._injectedScript.generateSelector(t);
    return Gt(n || "javascript", r);
  }
  _resume() {
    this._injectedScript.window.__pw_resume().catch(() => {});
  }
}
function ry(e, t) {
  e = e
    .replace(/AriaRole\s*\.\s*([\w]+)/g, (s, o) => o.toLowerCase())
    .replace(
      /(get_by_role|getByRole)\s*\(\s*(?:["'`])([^'"`]+)['"`]/g,
      (s, o, l) => `${o}(${l.toLowerCase()}`,
    );
  const n = [];
  let r = "";
  for (let s = 0; s < e.length; ++s) {
    const o = e[s];
    if (o !== '"' && o !== "'" && o !== "`" && o !== "/") {
      r += o;
      continue;
    }
    const l = e[s - 1] === "r" || e[s] === "/";
    ++s;
    let a = "";
    for (; s < e.length; ) {
      if (e[s] === "\\") {
        l
          ? (e[s + 1] !== o && (a += e[s]), ++s, (a += e[s]))
          : (++s,
            e[s] === "n"
              ? (a += `
`)
              : e[s] === "r"
                ? (a += "\r")
                : e[s] === "t"
                  ? (a += "	")
                  : (a += e[s])),
          ++s;
        continue;
      }
      if (e[s] !== o) {
        a += e[s++];
        continue;
      }
      break;
    }
    n.push({ quote: o, text: a }),
      (r += (o === "/" ? "r" : "") + "$" + n.length);
  }
  r = r
    .toLowerCase()
    .replace(/get_by_alt_text/g, "getbyalttext")
    .replace(/get_by_test_id/g, "getbytestid")
    .replace(/get_by_([\w]+)/g, "getby$1")
    .replace(/has_not_text/g, "hasnottext")
    .replace(/has_text/g, "hastext")
    .replace(/has_not/g, "hasnot")
    .replace(/frame_locator/g, "framelocator")
    .replace(/[{}\s]/g, "")
    .replace(/new\(\)/g, "")
    .replace(/new[\w]+\.[\w]+options\(\)/g, "")
    .replace(/\.set/g, ",set")
    .replace(/\.or_\(/g, "or(")
    .replace(/\.and_\(/g, "and(")
    .replace(/:/g, "=")
    .replace(/,re\.ignorecase/g, "i")
    .replace(/,pattern.case_insensitive/g, "i")
    .replace(/,regexoptions.ignorecase/g, "i")
    .replace(/re.compile\(([^)]+)\)/g, "$1")
    .replace(/pattern.compile\(([^)]+)\)/g, "r$1")
    .replace(/newregex\(([^)]+)\)/g, "r$1")
    .replace(/string=/g, "=")
    .replace(/regex=/g, "=")
    .replace(/,,/g, ",");
  const i = n.map((s) => s.quote).filter((s) => "'\"`".includes(s))[0];
  return { selector: yp(r, n, t), preferredQuote: i };
}
function Ec(e) {
  return [...e.matchAll(/\$\d+/g)].length;
}
function kc(e, t) {
  return e.replace(/\$(\d+)/g, (n, r) => `$${r - t}`);
}
function yp(e, t, n) {
  for (;;) {
    const i = e.match(/filter\(,?(has=|hasnot=|sethas\(|sethasnot\()/);
    if (!i) break;
    const s = i.index + i[0].length;
    let o = 0,
      l = s;
    for (
      ;
      l < e.length && (e[l] === "(" ? o++ : e[l] === ")" && o--, !(o < 0));
      l++
    );
    let a = e.substring(0, s),
      u = 0;
    ["sethas(", "sethasnot("].includes(i[1]) &&
      ((u = 1),
      (a = a.replace(/sethas\($/, "has=").replace(/sethasnot\($/, "hasnot=")));
    const c = Ec(e.substring(0, s)),
      p = kc(e.substring(s, l), c),
      d = Ec(p),
      v = t.slice(c, c + d),
      y = JSON.stringify(yp(p, v, n));
    e = a.replace(/=$/, "2=") + `$${c + 1}` + kc(e.substring(l + u), d - 1);
    const x = t.slice(0, c),
      w = t.slice(c + d);
    t = x.concat([{ quote: '"', text: y }]).concat(w);
  }
  e = e
    .replace(
      /\,set([\w]+)\(([^)]+)\)/g,
      (i, s, o) => "," + s.toLowerCase() + "=" + o.toLowerCase(),
    )
    .replace(/framelocator\(([^)]+)\)/g, "$1.internal:control=enter-frame")
    .replace(
      /locator\(([^)]+),hastext=([^),]+)\)/g,
      "locator($1).internal:has-text=$2",
    )
    .replace(
      /locator\(([^)]+),hasnottext=([^),]+)\)/g,
      "locator($1).internal:has-not-text=$2",
    )
    .replace(
      /locator\(([^)]+),hastext=([^),]+)\)/g,
      "locator($1).internal:has-text=$2",
    )
    .replace(/locator\(([^)]+)\)/g, "$1")
    .replace(/getbyrole\(([^)]+)\)/g, "internal:role=$1")
    .replace(/getbytext\(([^)]+)\)/g, "internal:text=$1")
    .replace(/getbylabel\(([^)]+)\)/g, "internal:label=$1")
    .replace(/getbytestid\(([^)]+)\)/g, `internal:testid=[${n}=$1]`)
    .replace(
      /getby(placeholder|alt|title)(?:text)?\(([^)]+)\)/g,
      "internal:attr=[$1=$2]",
    )
    .replace(/first(\(\))?/g, "nth=0")
    .replace(/last(\(\))?/g, "nth=-1")
    .replace(/nth\(([^)]+)\)/g, "nth=$1")
    .replace(/filter\(,?hastext=([^)]+)\)/g, "internal:has-text=$1")
    .replace(/filter\(,?hasnottext=([^)]+)\)/g, "internal:has-not-text=$1")
    .replace(/filter\(,?has2=([^)]+)\)/g, "internal:has=$1")
    .replace(/filter\(,?hasnot2=([^)]+)\)/g, "internal:has-not=$1")
    .replace(/,exact=false/g, "")
    .replace(/,exact=true/g, "s")
    .replace(/\,/g, "][");
  const r = e.split(".");
  for (let i = 0; i < r.length - 1; i++)
    if (
      r[i] === "internal:control=enter-frame" &&
      r[i + 1].startsWith("nth=")
    ) {
      const [s] = r.splice(i, 1);
      r.splice(i + 1, 0, s);
    }
  return r
    .map((i) =>
      !i.startsWith("internal:") || i === "internal:control"
        ? i.replace(/\$(\d+)/g, (s, o) => t[+o - 1].text)
        : ((i = i.includes("[") ? i.replace(/\]/, "") + "]" : i),
          (i = i
            .replace(/(?:r)\$(\d+)(i)?/g, (s, o, l) => {
              const a = t[+o - 1];
              return i.startsWith("internal:attr") ||
                i.startsWith("internal:testid") ||
                i.startsWith("internal:role")
                ? Ee(new RegExp(a.text), !1) + (l || "")
                : ot(new RegExp(a.text, l), !1);
            })
            .replace(/\$(\d+)(i|s)?/g, (s, o, l) => {
              const a = t[+o - 1];
              return i.startsWith("internal:has=") ||
                i.startsWith("internal:has-not=")
                ? a.text
                : i.startsWith("internal:testid")
                  ? Ee(a.text, !0)
                  : i.startsWith("internal:attr") ||
                      i.startsWith("internal:role")
                    ? Ee(a.text, l === "s")
                    : ot(a.text, l === "s");
            })),
          i),
    )
    .join(" >> ");
}
function iy(e, t, n) {
  try {
    return qs(t), t;
  } catch {}
  try {
    const { selector: r, preferredQuote: i } = ry(t, n),
      s = ph(e, r, void 0, void 0, i),
      o = Tc(t);
    if (s.some((l) => Tc(l) === o)) return r;
  } catch {}
  return "";
}
function Tc(e) {
  return e.replace(/\s/g, "").replace(/["`]/g, "'");
}
const sy = ({ url: e }) =>
    A("div", {
      className: "browser-frame-header",
      children: [
        A("div", {
          style: { whiteSpace: "nowrap" },
          children: [
            m("span", {
              className: "browser-frame-dot",
              style: { backgroundColor: "rgb(242, 95, 88)" },
            }),
            m("span", {
              className: "browser-frame-dot",
              style: { backgroundColor: "rgb(251, 190, 60)" },
            }),
            m("span", {
              className: "browser-frame-dot",
              style: { backgroundColor: "rgb(88, 203, 66)" },
            }),
          ],
        }),
        m("div", {
          className: "browser-frame-address-bar",
          title: e || "about:blank",
          children: e || "about:blank",
        }),
        m("div", {
          style: { marginLeft: "auto" },
          children: A("div", {
            children: [
              m("span", { className: "browser-frame-menu-bar" }),
              m("span", { className: "browser-frame-menu-bar" }),
              m("span", { className: "browser-frame-menu-bar" }),
            ],
          }),
        }),
      ],
    }),
  oy = ({
    action: e,
    sdkLanguage: t,
    testIdAttributeName: n,
    isInspecting: r,
    setIsInspecting: i,
    highlightedLocator: s,
    setHighlightedLocator: o,
  }) => {
    const [l, a] = vn(),
      [u, c] = L.useState("action"),
      { snapshots: p } = L.useMemo(() => {
        if (!e) return { snapshots: {} };
        let E = e.beforeSnapshot
            ? { action: e, snapshotName: e.beforeSnapshot }
            : void 0,
          S = e;
        for (; !E && S; )
          (S = s1(S)),
            (E =
              S != null && S.afterSnapshot
                ? {
                    action: S,
                    snapshotName: S == null ? void 0 : S.afterSnapshot,
                  }
                : void 0);
        const M = e.afterSnapshot
            ? { action: e, snapshotName: e.afterSnapshot }
            : E,
          $ = e.inputSnapshot
            ? { action: e, snapshotName: e.inputSnapshot }
            : M;
        return (
          $ && ($.point = e.point),
          { snapshots: { action: $, before: E, after: M } }
        );
      }, [e]),
      {
        snapshotInfoUrl: d,
        snapshotUrl: v,
        popoutUrl: y,
      } = L.useMemo(() => {
        const E = p[u];
        if (!E) return { snapshotUrl: ay };
        const S = new URLSearchParams();
        S.set("trace", _l(E.action).traceUrl),
          S.set("name", E.snapshotName),
          E.point &&
            (S.set("pointX", String(E.point.x)),
            S.set("pointY", String(E.point.y)));
        const M = new URL(
            `snapshot/${E.action.pageId}?${S.toString()}`,
            window.location.href,
          ).toString(),
          $ = new URL(
            `snapshotInfo/${E.action.pageId}?${S.toString()}`,
            window.location.href,
          ).toString(),
          T = new URLSearchParams();
        T.set("r", M),
          T.set("trace", _l(E.action).traceUrl),
          E.point &&
            (T.set("pointX", String(E.point.x)),
            T.set("pointY", String(E.point.y)));
        const P = new URL(
          `snapshot.html?${T.toString()}`,
          window.location.href,
        ).toString();
        return {
          snapshots: p,
          snapshotInfoUrl: $,
          snapshotUrl: M,
          popoutUrl: P,
        };
      }, [p, u]),
      x = L.useRef(null),
      w = L.useRef(null),
      [h, f] = L.useState({ viewport: Cc, url: "" }),
      g = L.useRef({ iteration: 0, visibleIframe: 0 });
    L.useEffect(() => {
      (async () => {
        const E = g.current.iteration + 1,
          S = 1 - g.current.visibleIframe;
        g.current.iteration = E;
        const M = { url: "", viewport: Cc };
        if (d) {
          const P = await (await fetch(d)).json();
          P.error || ((M.url = P.url), (M.viewport = P.viewport));
        }
        if (g.current.iteration !== E) return;
        const $ = [x, w][S].current;
        if ($) {
          let T = () => {};
          const P = new Promise((F) => (T = F));
          try {
            $.addEventListener("load", T),
              $.addEventListener("error", T),
              $.contentWindow
                ? $.contentWindow.location.replace(v)
                : ($.src = v),
              await P;
          } catch {
          } finally {
            $.removeEventListener("load", T), $.removeEventListener("error", T);
          }
        }
        g.current.iteration === E && ((g.current.visibleIframe = S), f(M));
      })();
    }, [v, d]);
    const _ = 40,
      k = { width: h.viewport.width, height: h.viewport.height + _ },
      N = Math.min(l.width / k.width, l.height / k.height, 1),
      C = { x: (l.width - k.width) / 2, y: (l.height - k.height) / 2 };
    return A("div", {
      className: "snapshot-tab",
      tabIndex: 0,
      onKeyDown: (E) => {
        E.key === "Escape" && r && i(!1);
      },
      children: [
        m(Nc, {
          isInspecting: r,
          sdkLanguage: t,
          testIdAttributeName: n,
          highlightedLocator: s,
          setHighlightedLocator: o,
          iframe: x.current,
          iteration: g.current.iteration,
        }),
        m(Nc, {
          isInspecting: r,
          sdkLanguage: t,
          testIdAttributeName: n,
          highlightedLocator: s,
          setHighlightedLocator: o,
          iframe: w.current,
          iteration: g.current.iteration,
        }),
        A(gh, {
          children: [
            ["action", "before", "after"].map((E) =>
              m(vh, {
                id: E,
                title: ly(E),
                selected: u === E,
                onSelect: () => c(E),
              }),
            ),
            m("div", { style: { flex: "auto" } }),
            m(Xn, {
              icon: "link-external",
              title: "Open snapshot in a new tab",
              disabled: !y,
              onClick: () => {
                const E = window.open(y || "", "_blank");
                E == null ||
                  E.addEventListener("DOMContentLoaded", () => {
                    const S = new pp(E, !1, t, n, 1, "chromium", []);
                    new ny(S);
                  });
              },
            }),
          ],
        }),
        m("div", {
          ref: a,
          className: "snapshot-wrapper",
          children: A("div", {
            className: "snapshot-container",
            style: {
              width: k.width + "px",
              height: k.height + "px",
              transform: `translate(${C.x}px, ${C.y}px) scale(${N})`,
            },
            children: [
              m(sy, { url: h.url }),
              A("div", {
                className: "snapshot-switcher",
                children: [
                  m("iframe", {
                    ref: x,
                    name: "snapshot",
                    title: "DOM Snapshot",
                    className:
                      g.current.visibleIframe === 0 ? "snapshot-visible" : "",
                  }),
                  m("iframe", {
                    ref: w,
                    name: "snapshot",
                    title: "DOM Snapshot",
                    className:
                      g.current.visibleIframe === 1 ? "snapshot-visible" : "",
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    });
  };
function ly(e) {
  return e === "before"
    ? "Before"
    : e === "after"
      ? "After"
      : e === "action"
        ? "Action"
        : e;
}
const Nc = ({
  iframe: e,
  isInspecting: t,
  sdkLanguage: n,
  testIdAttributeName: r,
  highlightedLocator: i,
  setHighlightedLocator: s,
  iteration: o,
}) => (
  L.useEffect(() => {
    const l = [],
      a =
        new URLSearchParams(window.location.search).get("isUnderTest") ===
        "true";
    try {
      wp(l, n, r, a, "", e == null ? void 0 : e.contentWindow);
    } catch {}
    for (const { recorder: u, frameSelector: c } of l) {
      const p = iy(n, i, r);
      u.setUIState(
        {
          mode: t ? "inspecting" : "none",
          actionSelector: p.startsWith(c)
            ? p.substring(c.length).trim()
            : void 0,
          language: n,
          testIdAttributeName: r,
          overlay: { offsetX: 0 },
        },
        {
          async setSelector(d) {
            s(Gt(n, c + d));
          },
          highlightUpdated() {
            for (const d of l) d.recorder !== u && d.recorder.clearHighlight();
          },
        },
      );
    }
  }, [e, t, i, s, n, r, o]),
  m(at, {})
);
function wp(e, t, n, r, i, s) {
  if (!s) return;
  const o = s;
  if (!o._recorder) {
    const l = new pp(s, r, t, n, 1, "chromium", []),
      a = new Vv(l);
    (o._injectedScript = l), (o._recorder = { recorder: a, frameSelector: i });
  }
  e.push(o._recorder);
  for (let l = 0; l < s.frames.length; ++l) {
    const a = s.frames[l],
      u = a.frameElement
        ? o._injectedScript.generateSelector(a.frameElement, {
            omitInternalEngines: !0,
            testIdAttributeName: n,
          }) + " >> internal:control=enter-frame >> "
        : "";
    wp(e, t, n, r, i + u, a);
  }
}
const Cc = { width: 1280, height: 720 },
  ay = 'data:text/html,<body style="background: #ddd"></body>';
const uy = ui,
  cy = ({ action: e, setSelectedFrame: t, selectedFrame: n }) => {
    const r = (e == null ? void 0 : e.stack) || [];
    return m(uy, {
      name: "stack-trace",
      items: r,
      selectedItem: r[n],
      render: (i) => {
        const s = i.file[1] === ":" ? "\\" : "/";
        return A(at, {
          children: [
            m("span", {
              className: "stack-trace-frame-function",
              children: i.function || "(anonymous)",
            }),
            m("span", {
              className: "stack-trace-frame-location",
              children: i.file.split(s).pop(),
            }),
            m("span", {
              className: "stack-trace-frame-line",
              children: ":" + i.line,
            }),
          ],
        });
      },
      onSelected: (i) => t(r.indexOf(i)),
    });
  },
  dy = ({
    action: e,
    sources: t,
    hideStackFrames: n,
    rootDir: r,
    fallbackLocation: i,
  }) => {
    const [s, o] = L.useState(),
      [l, a] = L.useState(0);
    L.useEffect(() => {
      s !== e && (o(e), a(0));
    }, [e, s, o, a]);
    const {
      source: u,
      highlight: c,
      targetLine: p,
      fileName: d,
    } = Kp(
      async () => {
        var _, k, N;
        const v = (_ = e == null ? void 0 : e.stack) == null ? void 0 : _[l],
          y = !(v != null && v.file);
        if (y && !i)
          return {
            source: { file: "", errors: [], content: void 0 },
            targetLine: 0,
            highlight: [],
          };
        const x = y ? i.file : v.file;
        let w = t.get(x);
        w ||
          ((w = {
            errors:
              ((k = i == null ? void 0 : i.source) == null
                ? void 0
                : k.errors) || [],
            content: void 0,
          }),
          t.set(x, w));
        const h = y
            ? (i == null ? void 0 : i.line) ||
              ((N = w.errors[0]) == null ? void 0 : N.line) ||
              0
            : v.line,
          f = r && x.startsWith(r) ? x.substring(r.length + 1) : x,
          g = w.errors.map((C) => ({
            type: "error",
            line: C.line,
            message: C.message,
          }));
        if ((g.push({ line: h, type: "running" }), w.content === void 0 || y)) {
          const C = await fy(x);
          try {
            let E = await fetch(`sha1/src@${C}.txt`);
            E.status === 404 &&
              (E = await fetch(`file?path=${encodeURIComponent(x)}`)),
              (w.content = await E.text());
          } catch {
            w.content = `<Unable to read "${x}">`;
          }
        }
        return { source: w, highlight: g, targetLine: h, fileName: f };
      },
      [e, l, r, i],
      { source: { errors: [], content: "Loading…" }, highlight: [] },
    );
    return A(Es, {
      sidebarSize: 200,
      orientation: "horizontal",
      sidebarHidden: n,
      children: [
        A("div", {
          className: "vbox",
          "data-testid": "source-code",
          children: [
            d && m("div", { className: "source-tab-file-name", children: d }),
            m(Xs, {
              text: u.content || "",
              language: "javascript",
              highlight: c,
              revealLine: p,
              readOnly: !0,
              lineNumbers: !0,
            }),
          ],
        }),
        m(cy, { action: e, selectedFrame: l, setSelectedFrame: a }),
      ],
    });
  };
async function fy(e) {
  const t = new TextEncoder().encode(e),
    n = await crypto.subtle.digest("SHA-1", t),
    r = [],
    i = new DataView(n);
  for (let s = 0; s < i.byteLength; s += 1) {
    const o = i.getUint8(s).toString(16).padStart(2, "0");
    r.push(o);
  }
  return r.join("");
}
const xp = { width: 200, height: 45 },
  Nn = 2.5,
  hy = xp.height + Nn * 2,
  py = ({ model: e, boundaries: t, previewPoint: n }) => {
    var c, p;
    const [r, i] = vn(),
      s = L.useRef(null);
    let o = 0;
    if (s.current && n) {
      const d = s.current.getBoundingClientRect();
      o = ((n.clientY - d.top + s.current.scrollTop) / hy) | 0;
    }
    const l =
      (p = (c = e == null ? void 0 : e.pages) == null ? void 0 : c[o]) == null
        ? void 0
        : p.screencastFrames;
    let a, u;
    if (n !== void 0 && l) {
      const d = t.minimum + ((t.maximum - t.minimum) * n.x) / r.width;
      a = l[Hc(l, d, Sp) - 1];
      const v = {
        width: Math.min(800, (window.innerWidth / 2) | 0),
        height: Math.min(800, (window.innerHeight / 2) | 0),
      };
      u = a ? _p({ width: a.width, height: a.height }, v) : void 0;
    }
    return A("div", {
      className: "film-strip",
      ref: i,
      children: [
        m("div", {
          className: "film-strip-lanes",
          ref: s,
          children:
            e == null
              ? void 0
              : e.pages.map((d, v) =>
                  m(my, { boundaries: t, page: d, width: r.width }, v),
                ),
        }),
        (n == null ? void 0 : n.x) !== void 0 &&
          A("div", {
            className: "film-strip-hover",
            style: {
              top: r.bottom + 5,
              left: Math.min(n.x, r.width - (u ? u.width : 0) - 10),
            },
            children: [
              n.action &&
                m("div", {
                  className: "film-strip-hover-title",
                  children: Aa(n.action, n),
                }),
              a &&
                u &&
                m("div", {
                  style: { width: u.width, height: u.height },
                  children: m("img", {
                    src: `sha1/${a.sha1}`,
                    width: u.width,
                    height: u.height,
                  }),
                }),
            ],
          }),
      ],
    });
  },
  my = ({ boundaries: e, page: t, width: n }) => {
    const r = { width: 0, height: 0 },
      i = t.screencastFrames;
    for (const x of i)
      (r.width = Math.max(r.width, x.width)),
        (r.height = Math.max(r.height, x.height));
    const s = _p(r, xp),
      o = i[0].timestamp,
      l = i[i.length - 1].timestamp,
      a = e.maximum - e.minimum,
      u = ((o - e.minimum) / a) * n,
      c = ((e.maximum - l) / a) * n,
      d = ((((l - o) / a) * n) / (s.width + 2 * Nn)) | 0,
      v = (l - o) / d,
      y = [];
    for (let x = 0; o && v && x < d; ++x) {
      const w = o + v * x,
        h = Hc(i, w, Sp) - 1;
      y.push(
        m(
          "div",
          {
            className: "film-strip-frame",
            style: {
              width: s.width,
              height: s.height,
              backgroundImage: `url(sha1/${i[h].sha1})`,
              backgroundSize: `${s.width}px ${s.height}px`,
              margin: Nn,
              marginRight: Nn,
            },
          },
          x,
        ),
      );
    }
    return (
      y.push(
        m(
          "div",
          {
            className: "film-strip-frame",
            style: {
              width: s.width,
              height: s.height,
              backgroundImage: `url(sha1/${i[i.length - 1].sha1})`,
              backgroundSize: `${s.width}px ${s.height}px`,
              margin: Nn,
              marginRight: Nn,
            },
          },
          y.length,
        ),
      ),
      m("div", {
        className: "film-strip-lane",
        style: { marginLeft: u + "px", marginRight: c + "px" },
        children: y,
      })
    );
  };
function Sp(e, t) {
  return e - t.timestamp;
}
function _p(e, t) {
  const n = Math.max(e.width / t.width, e.height / t.height);
  return { width: (e.width / n) | 0, height: (e.height / n) | 0 };
}
const gy = ({
  model: e,
  boundaries: t,
  onSelected: n,
  highlightedAction: r,
  highlightedEntry: i,
  selectedTime: s,
  setSelectedTime: o,
  sdkLanguage: l,
}) => {
  const [a, u] = vn(),
    [c, p] = L.useState(),
    [d, v] = L.useState(),
    {
      offsets: y,
      curtainLeft: x,
      curtainRight: w,
    } = L.useMemo(() => {
      let E = s || t;
      if (c && c.startX !== c.endX) {
        const T = ct(a.width, t, c.startX),
          P = ct(a.width, t, c.endX);
        E = { minimum: Math.min(T, P), maximum: Math.max(T, P) };
      }
      const S = dt(a.width, t, E.minimum),
        $ = dt(a.width, t, t.maximum) - dt(a.width, t, E.maximum);
      return { offsets: vy(a.width, t), curtainLeft: S, curtainRight: $ };
    }, [s, t, c, a]),
    h = L.useMemo(() => {
      const E = [];
      for (const S of (e == null ? void 0 : e.actions) || [])
        S.class !== "Test" &&
          E.push({
            action: S,
            leftTime: S.startTime,
            rightTime: S.endTime || t.maximum,
            leftPosition: dt(a.width, t, S.startTime),
            rightPosition: dt(a.width, t, S.endTime || t.maximum),
            active: !1,
            error: !!S.error,
          });
      for (const S of (e == null ? void 0 : e.resources) || []) {
        const M = S._monotonicTime,
          $ = S._monotonicTime + S.time;
        E.push({
          resource: S,
          leftTime: M,
          rightTime: $,
          leftPosition: dt(a.width, t, M),
          rightPosition: dt(a.width, t, $),
          active: !1,
          error: !1,
        });
      }
      return E;
    }, [e, t, a]);
  L.useMemo(() => {
    for (const E of h)
      E.active = (!!r && E.action === r) || (!!i && E.resource === i);
  }, [h, r, i]);
  const f = L.useCallback(
      (E) => {
        if ((v(void 0), !u.current)) return;
        const S = E.clientX - u.current.getBoundingClientRect().left,
          M = ct(a.width, t, S),
          $ = s ? dt(a.width, t, s.minimum) : 0,
          T = s ? dt(a.width, t, s.maximum) : 0;
        s && Math.abs(S - $) < 10
          ? p({ startX: T, endX: S, type: "resize" })
          : s && Math.abs(S - T) < 10
            ? p({ startX: $, endX: S, type: "resize" })
            : s &&
                M > s.minimum &&
                M < s.maximum &&
                E.clientY - u.current.getBoundingClientRect().top < 20
              ? p({ startX: $, endX: T, pivot: S, type: "move" })
              : p({ startX: S, endX: S, type: "resize" });
      },
      [t, a, u, s],
    ),
    g = L.useCallback(
      (E) => {
        if (!u.current) return;
        const S = E.clientX - u.current.getBoundingClientRect().left,
          M = ct(a.width, t, S),
          $ =
            e == null ? void 0 : e.actions.findLast((je) => je.startTime <= M);
        if (!E.buttons) {
          p(void 0);
          return;
        }
        if (($ && n($), !c)) return;
        let T = c;
        if (c.type === "resize") T = { ...c, endX: S };
        else {
          const je = S - c.pivot;
          let be = c.startX + je,
            Le = c.endX + je;
          be < 0 && ((be = 0), (Le = be + (c.endX - c.startX))),
            Le > a.width && ((Le = a.width), (be = Le - (c.endX - c.startX))),
            (T = { ...c, startX: be, endX: Le, pivot: S });
        }
        p(T);
        const P = ct(a.width, t, T.startX),
          F = ct(a.width, t, T.endX);
        P !== F && o({ minimum: Math.min(P, F), maximum: Math.max(P, F) });
      },
      [t, c, a, e, n, u, o],
    ),
    _ = L.useCallback(() => {
      if ((v(void 0), !!c)) {
        if (c.startX !== c.endX) {
          const E = ct(a.width, t, c.startX),
            S = ct(a.width, t, c.endX);
          o({ minimum: Math.min(E, S), maximum: Math.max(E, S) });
        } else {
          const E = ct(a.width, t, c.startX),
            S =
              e == null ? void 0 : e.actions.findLast((M) => M.startTime <= E);
          S && n(S), o(void 0);
        }
        p(void 0);
      }
    }, [t, c, a, e, o, n]),
    k = L.useCallback(
      (E) => {
        if (!u.current) return;
        const S = E.clientX - u.current.getBoundingClientRect().left,
          M = ct(a.width, t, S),
          $ = e == null ? void 0 : e.actions.findLast((T) => T.startTime <= M);
        v({ x: S, clientY: E.clientY, action: $, sdkLanguage: l });
      },
      [t, a, e, u, l],
    ),
    N = L.useCallback(() => {
      v(void 0);
    }, []),
    C = L.useCallback(() => {
      o(void 0);
    }, [o]);
  return A("div", {
    style: {
      flex: "none",
      borderBottom: "1px solid var(--vscode-panel-border)",
    },
    children: [
      !!c &&
        m(wh, {
          cursor:
            (c == null ? void 0 : c.type) === "resize" ? "ew-resize" : "grab",
          onPaneMouseUp: _,
          onPaneMouseMove: g,
          onPaneDoubleClick: C,
        }),
      A("div", {
        ref: u,
        className: "timeline-view",
        onMouseDown: f,
        onMouseMove: k,
        onMouseLeave: N,
        children: [
          m("div", {
            className: "timeline-grid",
            children: y.map((E, S) =>
              m(
                "div",
                {
                  className: "timeline-divider",
                  style: { left: E.position + "px" },
                  children: m("div", {
                    className: "timeline-time",
                    children: Ke(E.time - t.minimum),
                  }),
                },
                S,
              ),
            ),
          }),
          m("div", { style: { height: 8 } }),
          m(py, { model: e, boundaries: t, previewPoint: d }),
          m("div", {
            className: "timeline-bars",
            children: h.map((E, S) =>
              m(
                "div",
                {
                  className:
                    "timeline-bar" +
                    (E.action ? " action" : "") +
                    (E.resource ? " network" : "") +
                    (E.active ? " active" : "") +
                    (E.error ? " error" : ""),
                  style: {
                    left: E.leftPosition,
                    width: Math.max(1, E.rightPosition - E.leftPosition),
                    top: yy(E),
                    bottom: 0,
                  },
                },
                S,
              ),
            ),
          }),
          m("div", {
            className: "timeline-marker",
            style: {
              display: d !== void 0 ? "block" : "none",
              left: ((d == null ? void 0 : d.x) || 0) + "px",
            },
          }),
          s &&
            A("div", {
              className: "timeline-window",
              children: [
                m("div", {
                  className: "timeline-window-curtain left",
                  style: { width: x },
                }),
                m("div", {
                  className: "timeline-window-resizer",
                  style: { left: -5 },
                }),
                m("div", {
                  className: "timeline-window-center",
                  children: m("div", { className: "timeline-window-drag" }),
                }),
                m("div", {
                  className: "timeline-window-resizer",
                  style: { left: 5 },
                }),
                m("div", {
                  className: "timeline-window-curtain right",
                  style: { width: w },
                }),
              ],
            }),
        ],
      }),
    ],
  });
};
function vy(e, t) {
  let r = e / 64;
  const i = t.maximum - t.minimum,
    s = e / i;
  let o = i / r;
  const l = Math.ceil(Math.log(o) / Math.LN10);
  (o = Math.pow(10, l)),
    o * s >= 5 * 64 && (o = o / 5),
    o * s >= 2 * 64 && (o = o / 2);
  const a = t.minimum;
  let u = t.maximum;
  (u += 64 / s), (r = Math.ceil((u - a) / o)), o || (r = 0);
  const c = [];
  for (let p = 0; p < r; ++p) {
    const d = a + o * p;
    c.push({ position: dt(e, t, d), time: d });
  }
  return c;
}
function dt(e, t, n) {
  return ((n - t.minimum) / (t.maximum - t.minimum)) * e;
}
function ct(e, t, n) {
  return (n / e) * (t.maximum - t.minimum) + t.minimum;
}
function yy(e) {
  return e.resource ? 25 : 20;
}
const wy = ({ model: e }) => {
  var t, n;
  return e
    ? A("div", {
        className: "metadata-view vbox",
        children: [
          m("div", {
            className: "call-section",
            style: { paddingTop: 2 },
            children: "Time",
          }),
          !!e.wallTime &&
            A("div", {
              className: "call-line",
              children: [
                "start time:",
                m("span", {
                  className: "call-value datetime",
                  title: new Date(e.wallTime).toLocaleString(),
                  children: new Date(e.wallTime).toLocaleString(),
                }),
              ],
            }),
          A("div", {
            className: "call-line",
            children: [
              "duration:",
              m("span", {
                className: "call-value number",
                title: Ke(e.endTime - e.startTime),
                children: Ke(e.endTime - e.startTime),
              }),
            ],
          }),
          m("div", { className: "call-section", children: "Browser" }),
          A("div", {
            className: "call-line",
            children: [
              "engine:",
              m("span", {
                className: "call-value string",
                title: e.browserName,
                children: e.browserName,
              }),
            ],
          }),
          e.channel &&
            A("div", {
              className: "call-line",
              children: [
                "channel:",
                m("span", {
                  className: "call-value string",
                  title: e.channel,
                  children: e.channel,
                }),
              ],
            }),
          e.platform &&
            A("div", {
              className: "call-line",
              children: [
                "platform:",
                m("span", {
                  className: "call-value string",
                  title: e.platform,
                  children: e.platform,
                }),
              ],
            }),
          e.options.userAgent &&
            A("div", {
              className: "call-line",
              children: [
                "user agent:",
                m("span", {
                  className: "call-value datetime",
                  title: e.options.userAgent,
                  children: e.options.userAgent,
                }),
              ],
            }),
          m("div", { className: "call-section", children: "Viewport" }),
          e.options.viewport &&
            A("div", {
              className: "call-line",
              children: [
                "width:",
                m("span", {
                  className: "call-value number",
                  title: String(
                    !!((t = e.options.viewport) != null && t.width),
                  ),
                  children: e.options.viewport.width,
                }),
              ],
            }),
          e.options.viewport &&
            A("div", {
              className: "call-line",
              children: [
                "height:",
                m("span", {
                  className: "call-value number",
                  title: String(
                    !!((n = e.options.viewport) != null && n.height),
                  ),
                  children: e.options.viewport.height,
                }),
              ],
            }),
          A("div", {
            className: "call-line",
            children: [
              "is mobile:",
              m("span", {
                className: "call-value boolean",
                title: String(!!e.options.isMobile),
                children: String(!!e.options.isMobile),
              }),
            ],
          }),
          e.options.deviceScaleFactor &&
            A("div", {
              className: "call-line",
              children: [
                "device scale:",
                m("span", {
                  className: "call-value number",
                  title: String(e.options.deviceScaleFactor),
                  children: String(e.options.deviceScaleFactor),
                }),
              ],
            }),
          m("div", { className: "call-section", children: "Counts" }),
          A("div", {
            className: "call-line",
            children: [
              "pages:",
              m("span", {
                className: "call-value number",
                children: e.pages.length,
              }),
            ],
          }),
          A("div", {
            className: "call-line",
            children: [
              "actions:",
              m("span", {
                className: "call-value number",
                children: e.actions.length,
              }),
            ],
          }),
          A("div", {
            className: "call-line",
            children: [
              "events:",
              m("span", {
                className: "call-value number",
                children: e.events.length,
              }),
            ],
          }),
        ],
      })
    : m(at, {});
};
async function Ao(e) {
  const t = new Image();
  return (
    e &&
      ((t.src = e),
      await new Promise((n, r) => {
        (t.onload = n), (t.onerror = n);
      })),
    t
  );
}
const Pl = {
    backgroundImage: `linear-gradient(45deg, #80808020 25%, transparent 25%),
                    linear-gradient(-45deg, #80808020 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #80808020 75%),
                    linear-gradient(-45deg, transparent 75%, #80808020 75%)`,
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
    boxShadow: `rgb(0 0 0 / 10%) 0px 1.8px 1.9px,
              rgb(0 0 0 / 15%) 0px 6.1px 6.3px,
              rgb(0 0 0 / 10%) 0px -2px 4px,
              rgb(0 0 0 / 15%) 0px -6.1px 12px,
              rgb(0 0 0 / 25%) 0px 6px 12px`,
  },
  xy = ({ diff: e }) => {
    const [t, n] = L.useState(e.diff ? "diff" : "actual"),
      [r, i] = L.useState(!1),
      [s, o] = L.useState(null),
      [l, a] = L.useState(null),
      [u, c] = L.useState(null),
      [p, d] = vn();
    L.useEffect(() => {
      (async () => {
        var k, N, C;
        o(await Ao((k = e.expected) == null ? void 0 : k.attachment.path)),
          a(await Ao((N = e.actual) == null ? void 0 : N.attachment.path)),
          c(await Ao((C = e.diff) == null ? void 0 : C.attachment.path));
      })();
    }, [e]);
    const v = s && l && u,
      y = v ? Math.max(s.naturalWidth, l.naturalWidth, 200) : 500,
      x = v ? Math.max(s.naturalHeight, l.naturalHeight, 200) : 500,
      w = Math.min(1, (p.width - 30) / y),
      h = Math.min(1, (p.width - 50) / y / 2),
      f = y * w,
      g = x * w,
      _ = {
        flex: "none",
        margin: "0 10px",
        cursor: "pointer",
        userSelect: "none",
      };
    return m("div", {
      "data-testid": "test-result-image-mismatch",
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: "auto",
      },
      ref: d,
      children:
        v &&
        A(at, {
          children: [
            A("div", {
              "data-testid": "test-result-image-mismatch-tabs",
              style: { display: "flex", margin: "10px 0 20px" },
              children: [
                e.diff &&
                  m("div", {
                    style: { ..._, fontWeight: t === "diff" ? 600 : "initial" },
                    onClick: () => n("diff"),
                    children: "Diff",
                  }),
                m("div", {
                  style: { ..._, fontWeight: t === "actual" ? 600 : "initial" },
                  onClick: () => n("actual"),
                  children: "Actual",
                }),
                m("div", {
                  style: {
                    ..._,
                    fontWeight: t === "expected" ? 600 : "initial",
                  },
                  onClick: () => n("expected"),
                  children: "Expected",
                }),
                m("div", {
                  style: { ..._, fontWeight: t === "sxs" ? 600 : "initial" },
                  onClick: () => n("sxs"),
                  children: "Side by side",
                }),
                m("div", {
                  style: { ..._, fontWeight: t === "slider" ? 600 : "initial" },
                  onClick: () => n("slider"),
                  children: "Slider",
                }),
              ],
            }),
            A("div", {
              style: {
                display: "flex",
                justifyContent: "center",
                flex: "auto",
                minHeight: g + 60,
              },
              children: [
                e.diff &&
                  t === "diff" &&
                  m(wt, {
                    image: u,
                    alt: "Diff",
                    canvasWidth: f,
                    canvasHeight: g,
                    scale: w,
                  }),
                e.diff &&
                  t === "actual" &&
                  m(wt, {
                    image: l,
                    alt: "Actual",
                    canvasWidth: f,
                    canvasHeight: g,
                    scale: w,
                  }),
                e.diff &&
                  t === "expected" &&
                  m(wt, {
                    image: s,
                    alt: "Expected",
                    canvasWidth: f,
                    canvasHeight: g,
                    scale: w,
                  }),
                e.diff &&
                  t === "slider" &&
                  m(Sy, {
                    expectedImage: s,
                    actualImage: l,
                    canvasWidth: f,
                    canvasHeight: g,
                    scale: w,
                  }),
                e.diff &&
                  t === "sxs" &&
                  A("div", {
                    style: { display: "flex" },
                    children: [
                      m(wt, {
                        image: s,
                        title: "Expected",
                        canvasWidth: h * y,
                        canvasHeight: h * x,
                        scale: h,
                      }),
                      m(wt, {
                        image: r ? u : l,
                        title: r ? "Diff" : "Actual",
                        onClick: () => i(!r),
                        canvasWidth: h * y,
                        canvasHeight: h * x,
                        scale: h,
                      }),
                    ],
                  }),
                !e.diff &&
                  t === "actual" &&
                  m(wt, {
                    image: l,
                    title: "Actual",
                    canvasWidth: f,
                    canvasHeight: g,
                    scale: w,
                  }),
                !e.diff &&
                  t === "expected" &&
                  m(wt, {
                    image: s,
                    title: "Expected",
                    canvasWidth: f,
                    canvasHeight: g,
                    scale: w,
                  }),
                !e.diff &&
                  t === "sxs" &&
                  A("div", {
                    style: { display: "flex" },
                    children: [
                      m(wt, {
                        image: s,
                        title: "Expected",
                        canvasWidth: h * y,
                        canvasHeight: h * x,
                        scale: h,
                      }),
                      m(wt, {
                        image: l,
                        title: "Actual",
                        canvasWidth: h * y,
                        canvasHeight: h * x,
                        scale: h,
                      }),
                    ],
                  }),
              ],
            }),
            A("div", {
              style: { alignSelf: "start", lineHeight: "18px" },
              children: [
                m("div", {
                  children:
                    e.diff &&
                    m("a", {
                      target: "_blank",
                      href: e.diff.attachment.path,
                      children: e.diff.attachment.name,
                    }),
                }),
                m("div", {
                  children: m("a", {
                    target: "_blank",
                    href: e.actual.attachment.path,
                    children: e.actual.attachment.name,
                  }),
                }),
                m("div", {
                  children: m("a", {
                    target: "_blank",
                    href: e.expected.attachment.path,
                    children: e.expected.attachment.name,
                  }),
                }),
              ],
            }),
          ],
        }),
    });
  },
  Sy = ({
    expectedImage: e,
    actualImage: t,
    canvasWidth: n,
    canvasHeight: r,
    scale: i,
  }) => {
    const s = { position: "absolute", top: 0, left: 0 },
      [o, l] = L.useState(n / 2),
      a =
        e.naturalWidth === t.naturalWidth &&
        e.naturalHeight === t.naturalHeight;
    return A("div", {
      style: {
        flex: "none",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        userSelect: "none",
      },
      children: [
        A("div", {
          style: { margin: 5 },
          children: [
            !a &&
              m("span", {
                style: { flex: "none", margin: "0 5px" },
                children: "Expected ",
              }),
            m("span", { children: e.naturalWidth }),
            m("span", {
              style: { flex: "none", margin: "0 5px" },
              children: "x",
            }),
            m("span", { children: e.naturalHeight }),
            !a &&
              m("span", {
                style: { flex: "none", margin: "0 5px 0 15px" },
                children: "Actual ",
              }),
            !a && m("span", { children: t.naturalWidth }),
            !a &&
              m("span", {
                style: { flex: "none", margin: "0 5px" },
                children: "x",
              }),
            !a && m("span", { children: t.naturalHeight }),
          ],
        }),
        A("div", {
          style: {
            position: "relative",
            width: n,
            height: r,
            margin: 15,
            ...Pl,
          },
          children: [
            m(xh, {
              orientation: "horizontal",
              offsets: [o],
              setOffsets: (u) => l(u[0]),
              resizerColor: "#57606a80",
              resizerWidth: 6,
            }),
            m("img", {
              alt: "Expected",
              style: { width: e.naturalWidth * i, height: e.naturalHeight * i },
              draggable: "false",
              src: e.src,
            }),
            m("div", {
              style: { ...s, bottom: 0, overflow: "hidden", width: o, ...Pl },
              children: m("img", {
                alt: "Actual",
                style: {
                  width: t.naturalWidth * i,
                  height: t.naturalHeight * i,
                },
                draggable: "false",
                src: t.src,
              }),
            }),
          ],
        }),
      ],
    });
  },
  wt = ({
    image: e,
    title: t,
    alt: n,
    canvasWidth: r,
    canvasHeight: i,
    scale: s,
    onClick: o,
  }) =>
    A("div", {
      style: {
        flex: "none",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      },
      children: [
        A("div", {
          style: { margin: 5 },
          children: [
            t &&
              m("span", {
                style: { flex: "none", margin: "0 5px" },
                children: t,
              }),
            m("span", { children: e.naturalWidth }),
            m("span", {
              style: { flex: "none", margin: "0 5px" },
              children: "x",
            }),
            m("span", { children: e.naturalHeight }),
          ],
        }),
        m("div", {
          style: {
            display: "flex",
            flex: "none",
            width: r,
            height: i,
            margin: 15,
            ...Pl,
          },
          children: m("img", {
            width: e.naturalWidth * s,
            height: e.naturalHeight * s,
            alt: t || n,
            style: { cursor: o ? "pointer" : "initial" },
            draggable: "false",
            src: e.src,
            onClick: o,
          }),
        }),
      ],
    }),
  _y = ({ model: e }) => {
    const {
      diffMap: t,
      screenshots: n,
      attachments: r,
    } = L.useMemo(() => {
      const i = new Set(),
        s = new Set();
      for (const l of (e == null ? void 0 : e.actions) || []) {
        const a = l.context.traceUrl;
        for (const u of l.attachments || []) i.add({ ...u, traceUrl: a });
      }
      const o = new Map();
      for (const l of i) {
        if (!l.path && !l.sha1) continue;
        const a = l.name.match(/^(.*)-(expected|actual|diff)\.png$/);
        if (a) {
          const u = a[1],
            c = a[2],
            p = o.get(u) || { expected: void 0, actual: void 0, diff: void 0 };
          (p[c] = l), o.set(u, p);
        }
        l.contentType.startsWith("image/") && (s.add(l), i.delete(l));
      }
      return { diffMap: o, attachments: i, screenshots: s };
    }, [e]);
    return !t.size && !n.size && !r.size
      ? m(sr, { text: "No attachments" })
      : A("div", {
          className: "attachments-tab",
          children: [
            [...t.values()].map(({ expected: i, actual: s, diff: o }) =>
              A(at, {
                children: [
                  i &&
                    s &&
                    m("div", {
                      className: "attachments-section",
                      children: "Image diff",
                    }),
                  i &&
                    s &&
                    m(xy, {
                      diff: {
                        name: "Image diff",
                        expected: {
                          attachment: { ...i, path: _r(i) },
                          title: "Expected",
                        },
                        actual: { attachment: { ...s, path: _r(s) } },
                        diff: o
                          ? { attachment: { ...o, path: _r(o) } }
                          : void 0,
                      },
                    }),
                ],
              }),
            ),
            n.size
              ? m("div", {
                  className: "attachments-section",
                  children: "Screenshots",
                })
              : void 0,
            [...n.values()].map((i, s) => {
              const o = _r(i);
              return A(
                "div",
                {
                  className: "attachment-item",
                  children: [
                    m("div", {
                      children: m("img", { draggable: "false", src: o }),
                    }),
                    m("div", {
                      children: m("a", {
                        target: "_blank",
                        href: o,
                        children: i.name,
                      }),
                    }),
                  ],
                },
                `screenshot-${s}`,
              );
            }),
            r.size
              ? m("div", {
                  className: "attachments-section",
                  children: "Attachments",
                })
              : void 0,
            [...r.values()].map((i, s) =>
              m(
                "div",
                {
                  className: "attachment-item",
                  children: m("a", {
                    href: _r(i) + "&download",
                    children: i.name,
                  }),
                },
                `attachment-${s}`,
              ),
            ),
          ],
        });
  };
function _r(e) {
  return e.sha1
    ? "sha1/" + e.sha1 + "?trace=" + encodeURIComponent(e.traceUrl)
    : "file?path=" + encodeURIComponent(e.path);
}
const Ey = ({
  sdkLanguage: e,
  setIsInspecting: t,
  highlightedLocator: n,
  setHighlightedLocator: r,
}) =>
  A("div", {
    className: "vbox",
    style: { backgroundColor: "var(--vscode-sideBar-background)" },
    children: [
      m("div", {
        style: {
          margin: "10px 0px 10px 10px",
          color: "var(--vscode-editorCodeLens-foreground)",
          flex: "none",
        },
        children: "Locator",
      }),
      m("div", {
        style: { margin: "0 10px 10px", flex: "auto" },
        children: m(Xs, {
          text: n,
          language: e,
          focusOnChange: !0,
          isFocused: !0,
          wrapLines: !0,
          onChange: (i) => {
            r(i), t(!1);
          },
        }),
      }),
      m("div", {
        style: { position: "absolute", right: 5, top: 5 },
        children: m(Xn, {
          icon: "files",
          title: "Copy locator",
          onClick: () => {
            Yp(n);
          },
        }),
      }),
    ],
  });
function ky(e) {
  return e === "scheduled"
    ? "codicon-clock"
    : e === "running"
      ? "codicon-loading"
      : e === "failed"
        ? "codicon-error"
        : e === "passed"
          ? "codicon-check"
          : e === "skipped"
            ? "codicon-circle-slash"
            : "codicon-circle-outline";
}
function Ty(e) {
  return e === "scheduled"
    ? "Pending"
    : e === "running"
      ? "Running"
      : e === "failed"
        ? "Failed"
        : e === "passed"
          ? "Passed"
          : e === "skipped"
            ? "Skipped"
            : "Did not run";
}
const zy = ({
  model: e,
  hideStackFrames: t,
  showSourcesFirst: n,
  rootDir: r,
  fallbackLocation: i,
  initialSelection: s,
  onSelectionChanged: o,
  isLive: l,
  status: a,
}) => {
  const [u, c] = L.useState(void 0),
    [p, d] = L.useState(),
    [v, y] = L.useState(),
    [x, w] = L.useState("actions"),
    [h, f] = Yi("propertiesTab", n ? "source" : "call"),
    [g, _] = L.useState(!1),
    [k, N] = L.useState(""),
    C = e ? p || u : void 0,
    [E, S] = L.useState(),
    [M, $] = Yi("propertiesSidebarLocation", "bottom"),
    T = L.useMemo(() => (e == null ? void 0 : e.sources) || new Map(), [e]);
  L.useEffect(() => {
    S(void 0);
  }, [e]),
    L.useEffect(() => {
      if (u && e != null && e.actions.includes(u)) return;
      const B = e == null ? void 0 : e.failedAction();
      if (s && e != null && e.actions.includes(s)) c(s);
      else if (B) c(B);
      else if (e != null && e.actions.length) {
        let za = e.actions.length - 1;
        for (let lr = 0; lr < e.actions.length; ++lr)
          if (e.actions[lr].apiName === "After Hooks" && lr) {
            za = lr - 1;
            break;
          }
        c(e.actions[za]);
      }
    }, [e, u, c, s]);
  const P = L.useCallback(
      (B) => {
        c(B), o == null || o(B);
      },
      [c, o],
    ),
    F = L.useCallback(
      (B) => {
        f(B), B !== "inspector" && _(!1);
      },
      [f],
    ),
    je = L.useCallback(
      (B) => {
        N(B), F("inspector");
      },
      [F],
    ),
    be = t0(e, E),
    Le = v0(e, E),
    I = J1(e),
    z = L.useMemo(
      () =>
        (e == null
          ? void 0
          : e.actions.map((B) => B.attachments || []).flat()) || [],
      [e],
    ),
    O = (e == null ? void 0 : e.sdkLanguage) || "javascript",
    X = {
      id: "inspector",
      title: "Locator",
      render: () =>
        m(Ey, {
          sdkLanguage: O,
          setIsInspecting: _,
          highlightedLocator: k,
          setHighlightedLocator: N,
        }),
    },
    ne = {
      id: "call",
      title: "Call",
      render: () => m(q1, { action: C, sdkLanguage: O }),
    },
    xn = {
      id: "log",
      title: "Log",
      render: () => m(Q1, { action: C, isLive: l }),
    },
    gt = {
      id: "errors",
      title: "Errors",
      errorCount: I.errors.size,
      render: () =>
        m(Z1, {
          errorsModel: I,
          sdkLanguage: O,
          revealInSource: (B) => {
            c(B), F("source");
          },
        }),
    },
    en = {
      id: "source",
      title: "Source",
      render: () =>
        m(dy, {
          action: C,
          sources: T,
          hideStackFrames: t,
          rootDir: r,
          fallbackLocation: i,
        }),
    },
    vt = {
      id: "console",
      title: "Console",
      count: be.entries.length,
      render: () =>
        m(n0, { consoleModel: be, boundaries: Ys, selectedTime: E }),
    },
    Sn = {
      id: "network",
      title: "Network",
      count: Le.resources.length,
      render: () =>
        m(y0, { boundaries: Ys, networkModel: Le, onEntryHovered: y }),
    },
    kp = {
      id: "attachments",
      title: "Attachments",
      count: z.length,
      render: () => m(_y, { model: e }),
    },
    ci = [X, ne, xn, gt, vt, Sn, en, kp];
  if (n) {
    const B = ci.indexOf(en);
    ci.splice(B, 1), ci.splice(1, 0, en);
  }
  const { boundaries: Ys } = L.useMemo(() => {
    const B = {
      minimum: (e == null ? void 0 : e.startTime) || 0,
      maximum: (e == null ? void 0 : e.endTime) || 3e4,
    };
    return (
      B.minimum > B.maximum && ((B.minimum = 0), (B.maximum = 3e4)),
      (B.maximum += (B.maximum - B.minimum) / 20),
      { boundaries: B }
    );
  }, [e]);
  let di = 0;
  return (
    !l && e && e.endTime >= 0
      ? (di = e.endTime - e.startTime)
      : e && e.wallTime && (di = Date.now() - e.wallTime),
    A("div", {
      className: "vbox workbench",
      children: [
        m(gy, {
          model: e,
          boundaries: Ys,
          highlightedAction: p,
          highlightedEntry: v,
          onSelected: P,
          sdkLanguage: O,
          selectedTime: E,
          setSelectedTime: S,
        }),
        A(Es, {
          sidebarSize: 250,
          orientation: M === "bottom" ? "vertical" : "horizontal",
          settingName: "propertiesSidebar",
          children: [
            A(Es, {
              sidebarSize: 250,
              orientation: "horizontal",
              sidebarIsFirst: !0,
              settingName: "actionListSidebar",
              children: [
                m(oy, {
                  action: C,
                  sdkLanguage: O,
                  testIdAttributeName:
                    (e == null ? void 0 : e.testIdAttributeName) ||
                    "data-testid",
                  isInspecting: g,
                  setIsInspecting: _,
                  highlightedLocator: k,
                  setHighlightedLocator: je,
                }),
                m(Nl, {
                  tabs: [
                    {
                      id: "actions",
                      title: "Actions",
                      component: A("div", {
                        className: "vbox",
                        children: [
                          a &&
                            A("div", {
                              className: "workbench-run-status",
                              children: [
                                m("span", { className: `codicon ${ky(a)}` }),
                                m("div", { children: Ty(a) }),
                                m("div", { className: "spacer" }),
                                m("div", {
                                  className: "workbench-run-duration",
                                  children: di ? Ke(di) : "",
                                }),
                              ],
                            }),
                          m(j1, {
                            sdkLanguage: O,
                            actions: (e == null ? void 0 : e.actions) || [],
                            selectedAction: e ? u : void 0,
                            selectedTime: E,
                            setSelectedTime: S,
                            onSelected: P,
                            onHighlighted: d,
                            revealConsole: () => F("console"),
                            isLive: l,
                          }),
                        ],
                      }),
                    },
                    {
                      id: "metadata",
                      title: "Metadata",
                      component: m(wy, { model: e }),
                    },
                  ],
                  selectedTab: x,
                  setSelectedTab: w,
                }),
              ],
            }),
            m(Nl, {
              tabs: ci,
              selectedTab: h,
              setSelectedTab: F,
              leftToolbar: [
                m(Xn, {
                  title: "Pick locator",
                  icon: "target",
                  toggled: g,
                  onClick: () => {
                    g || F("inspector"), _(!g);
                  },
                }),
              ],
              rightToolbar: [
                M === "bottom"
                  ? m(Xn, {
                      title: "Dock to right",
                      icon: "layout-sidebar-right-off",
                      onClick: () => {
                        $("right");
                      },
                    })
                  : m(Xn, {
                      title: "Dock to bottom",
                      icon: "layout-panel-off",
                      onClick: () => {
                        $("bottom");
                      },
                    }),
              ],
              mode: M === "bottom" ? "default" : "select",
            }),
          ],
        }),
      ],
    })
  );
};
let Ny = 0,
  Ep;
const Il = new Map();
async function Dy(e) {
  const t = new URLSearchParams(window.location.search).get("ws"),
    n = new WebSocket(
      `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.hostname}:${window.location.port}/${t}`,
    );
  return (
    await new Promise((r) => n.addEventListener("open", r)),
    n.addEventListener("close", e.onClose),
    n.addEventListener("message", (r) => {
      const i = JSON.parse(r.data),
        { id: s, result: o, error: l, method: a, params: u } = i;
      if (s) {
        const c = Il.get(s);
        if (!c) return;
        Il.delete(s), l ? c.reject(new Error(l)) : c.resolve(o);
      } else e.onEvent(a, u);
    }),
    (Ep = n),
    setInterval(() => bc("ping").catch(() => {}), 3e4),
    bc
  );
}
const bc = async (e, t) => {
  const n = ++Ny,
    r = { id: n, method: e, params: t };
  return (
    Ep.send(JSON.stringify(r)),
    new Promise((i, s) => {
      Il.set(n, { resolve: i, reject: s });
    })
  );
};
export {
  $y as M,
  Ft as R,
  Es as S,
  Xn as T,
  zy as W,
  a0 as _,
  m as a,
  Ly as b,
  Dy as c,
  Ry as d,
  Iy as e,
  My as f,
  Py as g,
  Yi as h,
  gh as i,
  A as j,
  ky as k,
  Oy as l,
  Ke as m,
  U1 as n,
  Cp as o,
  by as p,
  L as r,
  Dr as s,
  Ay as t,
  vn as u,
};
