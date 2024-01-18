import { p as mu, o as yu } from "./wsPort-b3c51948.js";

var ga = { exports: {} };
(function (yr, Or) {
  (function (F, Ee) {
    yr.exports = Ee();
  })(mu, function () {
    var F = navigator.userAgent,
      Ee = navigator.platform,
      Se = /gecko\/\d/i.test(F),
      We = /MSIE \d/.test(F),
      Qe = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(F),
      Ce = /Edge\/(\d+)/.exec(F),
      M = We || Qe || Ce,
      j = M && (We ? document.documentMode || 6 : +(Ce || Qe)[1]),
      _ = !Ce && /WebKit\//.test(F),
      ie = _ && /Qt\/\d+\.\d+/.test(F),
      q = !Ce && /Chrome\/(\d+)/.exec(F),
      se = q && +q[1],
      ce = /Opera\//.test(F),
      Ie = /Apple Computer/.test(navigator.vendor),
      Te = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(F),
      Oe = /PhantomJS/.test(F),
      ae = Ie && (/Mobile\/\w+/.test(F) || navigator.maxTouchPoints > 2),
      V = /Android/.test(F),
      oe =
        ae || V || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(F),
      xe = ae || /Mac/.test(Ee),
      _e = /\bCrOS\b/.test(F),
      ye = /win/i.test(Ee),
      Me = ce && F.match(/Version\/(\d*\.\d*)/);
    Me && (Me = Number(Me[1])), Me && Me >= 15 && ((ce = !1), (_ = !0));
    var He = xe && (ie || (ce && (Me == null || Me < 12.11))),
      ee = Se || (M && j >= 9);
    function X(e) {
      return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
    }
    var me = function (e, t) {
      var n = e.className,
        r = X(t).exec(n);
      if (r) {
        var i = n.slice(r.index + r[0].length);
        e.className = n.slice(0, r.index) + (i ? r[1] + i : "");
      }
    };
    function T(e) {
      for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild);
      return e;
    }
    function H(e, t) {
      return T(e).appendChild(t);
    }
    function c(e, t, n, r) {
      var i = document.createElement(e);
      if (
        (n && (i.className = n),
        r && (i.style.cssText = r),
        typeof t == "string")
      )
        i.appendChild(document.createTextNode(t));
      else if (t) for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
      return i;
    }
    function x(e, t, n, r) {
      var i = c(e, t, n, r);
      return i.setAttribute("role", "presentation"), i;
    }
    var b;
    document.createRange
      ? (b = function (e, t, n, r) {
          var i = document.createRange();
          return i.setEnd(r || e, n), i.setStart(e, t), i;
        })
      : (b = function (e, t, n) {
          var r = document.body.createTextRange();
          try {
            r.moveToElementText(e.parentNode);
          } catch {
            return r;
          }
          return (
            r.collapse(!0),
            r.moveEnd("character", n),
            r.moveStart("character", t),
            r
          );
        });
    function v(e, t) {
      if ((t.nodeType == 3 && (t = t.parentNode), e.contains))
        return e.contains(t);
      do if ((t.nodeType == 11 && (t = t.host), t == e)) return !0;
      while ((t = t.parentNode));
    }
    function g(e) {
      var t = e.ownerDocument || e,
        n;
      try {
        n = e.activeElement;
      } catch {
        n = t.body || null;
      }
      for (; n && n.shadowRoot && n.shadowRoot.activeElement; )
        n = n.shadowRoot.activeElement;
      return n;
    }
    function D(e, t) {
      var n = e.className;
      X(t).test(n) || (e.className += (n ? " " : "") + t);
    }
    function K(e, t) {
      for (var n = e.split(" "), r = 0; r < n.length; r++)
        n[r] && !X(n[r]).test(t) && (t += " " + n[r]);
      return t;
    }
    var $ = function (e) {
      e.select();
    };
    ae
      ? ($ = function (e) {
          (e.selectionStart = 0), (e.selectionEnd = e.value.length);
        })
      : M &&
        ($ = function (e) {
          try {
            e.select();
          } catch {}
        });
    function pe(e) {
      return e.display.wrapper.ownerDocument;
    }
    function Re(e) {
      return ze(e.display.wrapper);
    }
    function ze(e) {
      return e.getRootNode ? e.getRootNode() : e.ownerDocument;
    }
    function le(e) {
      return pe(e).defaultView;
    }
    function te(e) {
      var t = Array.prototype.slice.call(arguments, 1);
      return function () {
        return e.apply(null, t);
      };
    }
    function de(e, t, n) {
      t || (t = {});
      for (var r in e)
        e.hasOwnProperty(r) &&
          (n !== !1 || !t.hasOwnProperty(r)) &&
          (t[r] = e[r]);
      return t;
    }
    function he(e, t, n, r, i) {
      t == null && ((t = e.search(/[^\s\u00a0]/)), t == -1 && (t = e.length));
      for (var o = r || 0, l = i || 0; ; ) {
        var a = e.indexOf("	", o);
        if (a < 0 || a >= t) return l + (t - o);
        (l += a - o), (l += n - (l % n)), (o = a + 1);
      }
    }
    var ue = function () {
      (this.id = null),
        (this.f = null),
        (this.time = 0),
        (this.handler = te(this.onTimeout, this));
    };
    (ue.prototype.onTimeout = function (e) {
      (e.id = 0),
        e.time <= +new Date()
          ? e.f()
          : setTimeout(e.handler, e.time - +new Date());
    }),
      (ue.prototype.set = function (e, t) {
        this.f = t;
        var n = +new Date() + e;
        (!this.id || n < this.time) &&
          (clearTimeout(this.id),
          (this.id = setTimeout(this.handler, e)),
          (this.time = n));
      });
    function G(e, t) {
      for (var n = 0; n < e.length; ++n) if (e[n] == t) return n;
      return -1;
    }
    var Ve = 50,
      Ct = {
        toString: function () {
          return "CodeMirror.Pass";
        },
      },
      st = { scroll: !1 },
      gt = { origin: "*mouse" },
      Le = { origin: "+move" };
    function Ke(e, t, n) {
      for (var r = 0, i = 0; ; ) {
        var o = e.indexOf("	", r);
        o == -1 && (o = e.length);
        var l = o - r;
        if (o == e.length || i + l >= t) return r + Math.min(l, t - i);
        if (((i += o - r), (i += n - (i % n)), (r = o + 1), i >= t)) return r;
      }
    }
    var lt = [""];
    function ht(e) {
      for (; lt.length <= e; ) lt.push(re(lt) + " ");
      return lt[e];
    }
    function re(e) {
      return e[e.length - 1];
    }
    function Ne(e, t) {
      for (var n = [], r = 0; r < e.length; r++) n[r] = t(e[r], r);
      return n;
    }
    function w(e, t, n) {
      for (var r = 0, i = n(t); r < e.length && n(e[r]) <= i; ) r++;
      e.splice(r, 0, t);
    }
    function A() {}
    function C(e, t) {
      var n;
      return (
        Object.create
          ? (n = Object.create(e))
          : ((A.prototype = e), (n = new A())),
        t && de(t, n),
        n
      );
    }
    var be =
      /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
    function R(e) {
      return (
        /\w/.test(e) ||
        (e > "" && (e.toUpperCase() != e.toLowerCase() || be.test(e)))
      );
    }
    function ne(e, t) {
      return t ? (t.source.indexOf("\\w") > -1 && R(e) ? !0 : t.test(e)) : R(e);
    }
    function Y(e) {
      for (var t in e) if (e.hasOwnProperty(t) && e[t]) return !1;
      return !0;
    }
    var we =
      /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
    function ve(e) {
      return e.charCodeAt(0) >= 768 && we.test(e);
    }
    function Tt(e, t, n) {
      for (; (n < 0 ? t > 0 : t < e.length) && ve(e.charAt(t)); ) t += n;
      return t;
    }
    function Ot(e, t, n) {
      for (var r = t > n ? -1 : 1; ; ) {
        if (t == n) return t;
        var i = (t + n) / 2,
          o = r < 0 ? Math.ceil(i) : Math.floor(i);
        if (o == t) return e(o) ? t : n;
        e(o) ? (n = o) : (t = o + r);
      }
    }
    function rr(e, t, n, r) {
      if (!e) return r(t, n, "ltr", 0);
      for (var i = !1, o = 0; o < e.length; ++o) {
        var l = e[o];
        ((l.from < n && l.to > t) || (t == n && l.to == t)) &&
          (r(
            Math.max(l.from, t),
            Math.min(l.to, n),
            l.level == 1 ? "rtl" : "ltr",
            o,
          ),
          (i = !0));
      }
      i || r(t, n, "ltr");
    }
    var mr = null;
    function nr(e, t, n) {
      var r;
      mr = null;
      for (var i = 0; i < e.length; ++i) {
        var o = e[i];
        if (o.from < t && o.to > t) return i;
        o.to == t && (o.from != o.to && n == "before" ? (r = i) : (mr = i)),
          o.from == t && (o.from != o.to && n != "before" ? (r = i) : (mr = i));
      }
      return r ?? mr;
    }
    var gi = (function () {
      var e =
          "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
        t =
          "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
      function n(u) {
        return u <= 247
          ? e.charAt(u)
          : 1424 <= u && u <= 1524
            ? "R"
            : 1536 <= u && u <= 1785
              ? t.charAt(u - 1536)
              : 1774 <= u && u <= 2220
                ? "r"
                : 8192 <= u && u <= 8203
                  ? "w"
                  : u == 8204
                    ? "b"
                    : "L";
      }
      var r = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
        i = /[stwN]/,
        o = /[LRr]/,
        l = /[Lb1n]/,
        a = /[1n]/;
      function s(u, d, p) {
        (this.level = u), (this.from = d), (this.to = p);
      }
      return function (u, d) {
        var p = d == "ltr" ? "L" : "R";
        if (u.length == 0 || (d == "ltr" && !r.test(u))) return !1;
        for (var m = u.length, y = [], S = 0; S < m; ++S)
          y.push(n(u.charCodeAt(S)));
        for (var N = 0, z = p; N < m; ++N) {
          var P = y[N];
          P == "m" ? (y[N] = z) : (z = P);
        }
        for (var W = 0, E = p; W < m; ++W) {
          var B = y[W];
          B == "1" && E == "r"
            ? (y[W] = "n")
            : o.test(B) && ((E = B), B == "r" && (y[W] = "R"));
        }
        for (var Q = 1, Z = y[0]; Q < m - 1; ++Q) {
          var ge = y[Q];
          ge == "+" && Z == "1" && y[Q + 1] == "1"
            ? (y[Q] = "1")
            : ge == "," &&
              Z == y[Q + 1] &&
              (Z == "1" || Z == "n") &&
              (y[Q] = Z),
            (Z = ge);
        }
        for (var Fe = 0; Fe < m; ++Fe) {
          var it = y[Fe];
          if (it == ",") y[Fe] = "N";
          else if (it == "%") {
            var Ue = void 0;
            for (Ue = Fe + 1; Ue < m && y[Ue] == "%"; ++Ue);
            for (
              var Nt =
                  (Fe && y[Fe - 1] == "!") || (Ue < m && y[Ue] == "1")
                    ? "1"
                    : "N",
                wt = Fe;
              wt < Ue;
              ++wt
            )
              y[wt] = Nt;
            Fe = Ue - 1;
          }
        }
        for (var Ze = 0, kt = p; Ze < m; ++Ze) {
          var at = y[Ze];
          kt == "L" && at == "1" ? (y[Ze] = "L") : o.test(at) && (kt = at);
        }
        for (var $e = 0; $e < m; ++$e)
          if (i.test(y[$e])) {
            var Je = void 0;
            for (Je = $e + 1; Je < m && i.test(y[Je]); ++Je);
            for (
              var Xe = ($e ? y[$e - 1] : p) == "L",
                St = (Je < m ? y[Je] : p) == "L",
                nn = Xe == St ? (Xe ? "L" : "R") : p,
                gr = $e;
              gr < Je;
              ++gr
            )
              y[gr] = nn;
            $e = Je - 1;
          }
        for (var dt = [], Xt, ot = 0; ot < m; )
          if (l.test(y[ot])) {
            var fo = ot;
            for (++ot; ot < m && l.test(y[ot]); ++ot);
            dt.push(new s(0, fo, ot));
          } else {
            var tr = ot,
              Nr = dt.length,
              Dr = d == "rtl" ? 1 : 0;
            for (++ot; ot < m && y[ot] != "L"; ++ot);
            for (var vt = tr; vt < ot; )
              if (a.test(y[vt])) {
                tr < vt && (dt.splice(Nr, 0, new s(1, tr, vt)), (Nr += Dr));
                var on = vt;
                for (++vt; vt < ot && a.test(y[vt]); ++vt);
                dt.splice(Nr, 0, new s(2, on, vt)), (Nr += Dr), (tr = vt);
              } else ++vt;
            tr < ot && dt.splice(Nr, 0, new s(1, tr, ot));
          }
        return (
          d == "ltr" &&
            (dt[0].level == 1 &&
              (Xt = u.match(/^\s+/)) &&
              ((dt[0].from = Xt[0].length),
              dt.unshift(new s(0, 0, Xt[0].length))),
            re(dt).level == 1 &&
              (Xt = u.match(/\s+$/)) &&
              ((re(dt).to -= Xt[0].length),
              dt.push(new s(0, m - Xt[0].length, m)))),
          d == "rtl" ? dt.reverse() : dt
        );
      };
    })();
    function ke(e, t) {
      var n = e.order;
      return n == null && (n = e.order = gi(e.text, t)), n;
    }
    var Wn = [],
      J = function (e, t, n) {
        if (e.addEventListener) e.addEventListener(t, n, !1);
        else if (e.attachEvent) e.attachEvent("on" + t, n);
        else {
          var r = e._handlers || (e._handlers = {});
          r[t] = (r[t] || Wn).concat(n);
        }
      };
    function Yt(e, t) {
      return (e._handlers && e._handlers[t]) || Wn;
    }
    function ut(e, t, n) {
      if (e.removeEventListener) e.removeEventListener(t, n, !1);
      else if (e.detachEvent) e.detachEvent("on" + t, n);
      else {
        var r = e._handlers,
          i = r && r[t];
        if (i) {
          var o = G(i, n);
          o > -1 && (r[t] = i.slice(0, o).concat(i.slice(o + 1)));
        }
      }
    }
    function Ge(e, t) {
      var n = Yt(e, t);
      if (n.length)
        for (
          var r = Array.prototype.slice.call(arguments, 2), i = 0;
          i < n.length;
          ++i
        )
          n[i].apply(null, r);
    }
    function qe(e, t, n) {
      return (
        typeof t == "string" &&
          (t = {
            type: t,
            preventDefault: function () {
              this.defaultPrevented = !0;
            },
          }),
        Ge(e, n || t.type, e, t),
        yt(t) || t.codemirrorIgnore
      );
    }
    function zt(e) {
      var t = e._handlers && e._handlers.cursorActivity;
      if (t)
        for (
          var n =
              e.curOp.cursorActivityHandlers ||
              (e.curOp.cursorActivityHandlers = []),
            r = 0;
          r < t.length;
          ++r
        )
          G(n, t[r]) == -1 && n.push(t[r]);
    }
    function Lt(e, t) {
      return Yt(e, t).length > 0;
    }
    function Et(e) {
      (e.prototype.on = function (t, n) {
        J(this, t, n);
      }),
        (e.prototype.off = function (t, n) {
          ut(this, t, n);
        });
    }
    function ft(e) {
      e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
    }
    function zr(e) {
      e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0);
    }
    function yt(e) {
      return e.defaultPrevented != null
        ? e.defaultPrevented
        : e.returnValue == !1;
    }
    function ir(e) {
      ft(e), zr(e);
    }
    function ln(e) {
      return e.target || e.srcElement;
    }
    function It(e) {
      var t = e.which;
      return (
        t == null &&
          (e.button & 1
            ? (t = 1)
            : e.button & 2
              ? (t = 3)
              : e.button & 4 && (t = 2)),
        xe && e.ctrlKey && t == 1 && (t = 3),
        t
      );
    }
    var yi = (function () {
        if (M && j < 9) return !1;
        var e = c("div");
        return "draggable" in e || "dragDrop" in e;
      })(),
      Pr;
    function _n(e) {
      if (Pr == null) {
        var t = c("span", "​");
        H(e, c("span", [t, document.createTextNode("x")])),
          e.firstChild.offsetHeight != 0 &&
            (Pr = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(M && j < 8));
      }
      var n = Pr
        ? c("span", "​")
        : c(
            "span",
            " ",
            null,
            "display: inline-block; width: 1px; margin-right: -1px",
          );
      return n.setAttribute("cm-text", ""), n;
    }
    var an;
    function or(e) {
      if (an != null) return an;
      var t = H(e, document.createTextNode("AخA")),
        n = b(t, 0, 1).getBoundingClientRect(),
        r = b(t, 1, 2).getBoundingClientRect();
      return T(e), !n || n.left == n.right ? !1 : (an = r.right - n.right < 3);
    }
    var Pt =
        `

b`.split(/\n/).length != 3
          ? function (e) {
              for (var t = 0, n = [], r = e.length; t <= r; ) {
                var i = e.indexOf(
                  `
`,
                  t,
                );
                i == -1 && (i = e.length);
                var o = e.slice(t, e.charAt(i - 1) == "\r" ? i - 1 : i),
                  l = o.indexOf("\r");
                l != -1
                  ? (n.push(o.slice(0, l)), (t += l + 1))
                  : (n.push(o), (t = i + 1));
              }
              return n;
            }
          : function (e) {
              return e.split(/\r\n?|\n/);
            },
      lr = window.getSelection
        ? function (e) {
            try {
              return e.selectionStart != e.selectionEnd;
            } catch {
              return !1;
            }
          }
        : function (e) {
            var t;
            try {
              t = e.ownerDocument.selection.createRange();
            } catch {}
            return !t || t.parentElement() != e
              ? !1
              : t.compareEndPoints("StartToEnd", t) != 0;
          },
      Hn = (function () {
        var e = c("div");
        return "oncopy" in e
          ? !0
          : (e.setAttribute("oncopy", "return;"),
            typeof e.oncopy == "function");
      })(),
      Ft = null;
    function mi(e) {
      if (Ft != null) return Ft;
      var t = H(e, c("span", "x")),
        n = t.getBoundingClientRect(),
        r = b(t, 0, 1).getBoundingClientRect();
      return (Ft = Math.abs(n.left - r.left) > 1);
    }
    var Er = {},
      Wt = {};
    function _t(e, t) {
      arguments.length > 2 &&
        (t.dependencies = Array.prototype.slice.call(arguments, 2)),
        (Er[e] = t);
    }
    function br(e, t) {
      Wt[e] = t;
    }
    function Ir(e) {
      if (typeof e == "string" && Wt.hasOwnProperty(e)) e = Wt[e];
      else if (e && typeof e.name == "string" && Wt.hasOwnProperty(e.name)) {
        var t = Wt[e.name];
        typeof t == "string" && (t = { name: t }),
          (e = C(t, e)),
          (e.name = t.name);
      } else {
        if (typeof e == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(e))
          return Ir("application/xml");
        if (typeof e == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(e))
          return Ir("application/json");
      }
      return typeof e == "string" ? { name: e } : e || { name: "null" };
    }
    function Fr(e, t) {
      t = Ir(t);
      var n = Er[t.name];
      if (!n) return Fr(e, "text/plain");
      var r = n(e, t);
      if (ar.hasOwnProperty(t.name)) {
        var i = ar[t.name];
        for (var o in i)
          i.hasOwnProperty(o) &&
            (r.hasOwnProperty(o) && (r["_" + o] = r[o]), (r[o] = i[o]));
      }
      if (
        ((r.name = t.name),
        t.helperType && (r.helperType = t.helperType),
        t.modeProps)
      )
        for (var l in t.modeProps) r[l] = t.modeProps[l];
      return r;
    }
    var ar = {};
    function Wr(e, t) {
      var n = ar.hasOwnProperty(e) ? ar[e] : (ar[e] = {});
      de(t, n);
    }
    function Ut(e, t) {
      if (t === !0) return t;
      if (e.copyState) return e.copyState(t);
      var n = {};
      for (var r in t) {
        var i = t[r];
        i instanceof Array && (i = i.concat([])), (n[r] = i);
      }
      return n;
    }
    function sn(e, t) {
      for (var n; e.innerMode && ((n = e.innerMode(t)), !(!n || n.mode == e)); )
        (t = n.state), (e = n.mode);
      return n || { mode: e, state: t };
    }
    function _r(e, t, n) {
      return e.startState ? e.startState(t, n) : !0;
    }
    var je = function (e, t, n) {
      (this.pos = this.start = 0),
        (this.string = e),
        (this.tabSize = t || 8),
        (this.lastColumnPos = this.lastColumnValue = 0),
        (this.lineStart = 0),
        (this.lineOracle = n);
    };
    (je.prototype.eol = function () {
      return this.pos >= this.string.length;
    }),
      (je.prototype.sol = function () {
        return this.pos == this.lineStart;
      }),
      (je.prototype.peek = function () {
        return this.string.charAt(this.pos) || void 0;
      }),
      (je.prototype.next = function () {
        if (this.pos < this.string.length)
          return this.string.charAt(this.pos++);
      }),
      (je.prototype.eat = function (e) {
        var t = this.string.charAt(this.pos),
          n;
        if (
          (typeof e == "string"
            ? (n = t == e)
            : (n = t && (e.test ? e.test(t) : e(t))),
          n)
        )
          return ++this.pos, t;
      }),
      (je.prototype.eatWhile = function (e) {
        for (var t = this.pos; this.eat(e); );
        return this.pos > t;
      }),
      (je.prototype.eatSpace = function () {
        for (
          var e = this.pos;
          /[\s\u00a0]/.test(this.string.charAt(this.pos));

        )
          ++this.pos;
        return this.pos > e;
      }),
      (je.prototype.skipToEnd = function () {
        this.pos = this.string.length;
      }),
      (je.prototype.skipTo = function (e) {
        var t = this.string.indexOf(e, this.pos);
        if (t > -1) return (this.pos = t), !0;
      }),
      (je.prototype.backUp = function (e) {
        this.pos -= e;
      }),
      (je.prototype.column = function () {
        return (
          this.lastColumnPos < this.start &&
            ((this.lastColumnValue = he(
              this.string,
              this.start,
              this.tabSize,
              this.lastColumnPos,
              this.lastColumnValue,
            )),
            (this.lastColumnPos = this.start)),
          this.lastColumnValue -
            (this.lineStart ? he(this.string, this.lineStart, this.tabSize) : 0)
        );
      }),
      (je.prototype.indentation = function () {
        return (
          he(this.string, null, this.tabSize) -
          (this.lineStart ? he(this.string, this.lineStart, this.tabSize) : 0)
        );
      }),
      (je.prototype.match = function (e, t, n) {
        if (typeof e == "string") {
          var r = function (l) {
              return n ? l.toLowerCase() : l;
            },
            i = this.string.substr(this.pos, e.length);
          if (r(i) == r(e)) return t !== !1 && (this.pos += e.length), !0;
        } else {
          var o = this.string.slice(this.pos).match(e);
          return o && o.index > 0
            ? null
            : (o && t !== !1 && (this.pos += o[0].length), o);
        }
      }),
      (je.prototype.current = function () {
        return this.string.slice(this.start, this.pos);
      }),
      (je.prototype.hideFirstChars = function (e, t) {
        this.lineStart += e;
        try {
          return t();
        } finally {
          this.lineStart -= e;
        }
      }),
      (je.prototype.lookAhead = function (e) {
        var t = this.lineOracle;
        return t && t.lookAhead(e);
      }),
      (je.prototype.baseToken = function () {
        var e = this.lineOracle;
        return e && e.baseToken(this.pos);
      });
    function U(e, t) {
      if (((t -= e.first), t < 0 || t >= e.size))
        throw new Error(
          "There is no line " + (t + e.first) + " in the document.",
        );
      for (var n = e; !n.lines; )
        for (var r = 0; ; ++r) {
          var i = n.children[r],
            o = i.chunkSize();
          if (t < o) {
            n = i;
            break;
          }
          t -= o;
        }
      return n.lines[t];
    }
    function Zt(e, t, n) {
      var r = [],
        i = t.line;
      return (
        e.iter(t.line, n.line + 1, function (o) {
          var l = o.text;
          i == n.line && (l = l.slice(0, n.ch)),
            i == t.line && (l = l.slice(t.ch)),
            r.push(l),
            ++i;
        }),
        r
      );
    }
    function un(e, t, n) {
      var r = [];
      return (
        e.iter(t, n, function (i) {
          r.push(i.text);
        }),
        r
      );
    }
    function Dt(e, t) {
      var n = t - e.height;
      if (n) for (var r = e; r; r = r.parent) r.height += n;
    }
    function f(e) {
      if (e.parent == null) return null;
      for (
        var t = e.parent, n = G(t.lines, e), r = t.parent;
        r;
        t = r, r = r.parent
      )
        for (var i = 0; r.children[i] != t; ++i) n += r.children[i].chunkSize();
      return n + t.first;
    }
    function h(e, t) {
      var n = e.first;
      e: do {
        for (var r = 0; r < e.children.length; ++r) {
          var i = e.children[r],
            o = i.height;
          if (t < o) {
            e = i;
            continue e;
          }
          (t -= o), (n += i.chunkSize());
        }
        return n;
      } while (!e.lines);
      for (var l = 0; l < e.lines.length; ++l) {
        var a = e.lines[l],
          s = a.height;
        if (t < s) break;
        t -= s;
      }
      return n + l;
    }
    function L(e, t) {
      return t >= e.first && t < e.first + e.size;
    }
    function O(e, t) {
      return String(e.lineNumberFormatter(t + e.firstLineNumber));
    }
    function k(e, t, n) {
      if ((n === void 0 && (n = null), !(this instanceof k)))
        return new k(e, t, n);
      (this.line = e), (this.ch = t), (this.sticky = n);
    }
    function I(e, t) {
      return e.line - t.line || e.ch - t.ch;
    }
    function De(e, t) {
      return e.sticky == t.sticky && I(e, t) == 0;
    }
    function et(e) {
      return k(e.line, e.ch);
    }
    function mt(e, t) {
      return I(e, t) < 0 ? t : e;
    }
    function Hr(e, t) {
      return I(e, t) < 0 ? e : t;
    }
    function ho(e, t) {
      return Math.max(e.first, Math.min(t, e.first + e.size - 1));
    }
    function fe(e, t) {
      if (t.line < e.first) return k(e.first, 0);
      var n = e.first + e.size - 1;
      return t.line > n
        ? k(n, U(e, n).text.length)
        : ma(t, U(e, t.line).text.length);
    }
    function ma(e, t) {
      var n = e.ch;
      return n == null || n > t ? k(e.line, t) : n < 0 ? k(e.line, 0) : e;
    }
    function po(e, t) {
      for (var n = [], r = 0; r < t.length; r++) n[r] = fe(e, t[r]);
      return n;
    }
    var Bn = function (e, t) {
        (this.state = e), (this.lookAhead = t);
      },
      Gt = function (e, t, n, r) {
        (this.state = t),
          (this.doc = e),
          (this.line = n),
          (this.maxLookAhead = r || 0),
          (this.baseTokens = null),
          (this.baseTokenPos = 1);
      };
    (Gt.prototype.lookAhead = function (e) {
      var t = this.doc.getLine(this.line + e);
      return t != null && e > this.maxLookAhead && (this.maxLookAhead = e), t;
    }),
      (Gt.prototype.baseToken = function (e) {
        if (!this.baseTokens) return null;
        for (; this.baseTokens[this.baseTokenPos] <= e; )
          this.baseTokenPos += 2;
        var t = this.baseTokens[this.baseTokenPos + 1];
        return {
          type: t && t.replace(/( |^)overlay .*/, ""),
          size: this.baseTokens[this.baseTokenPos] - e,
        };
      }),
      (Gt.prototype.nextLine = function () {
        this.line++, this.maxLookAhead > 0 && this.maxLookAhead--;
      }),
      (Gt.fromSaved = function (e, t, n) {
        return t instanceof Bn
          ? new Gt(e, Ut(e.mode, t.state), n, t.lookAhead)
          : new Gt(e, Ut(e.mode, t), n);
      }),
      (Gt.prototype.save = function (e) {
        var t = e !== !1 ? Ut(this.doc.mode, this.state) : this.state;
        return this.maxLookAhead > 0 ? new Bn(t, this.maxLookAhead) : t;
      });
    function vo(e, t, n, r) {
      var i = [e.state.modeGen],
        o = {};
      wo(
        e,
        t.text,
        e.doc.mode,
        n,
        function (u, d) {
          return i.push(u, d);
        },
        o,
        r,
      );
      for (
        var l = n.state,
          a = function (u) {
            n.baseTokens = i;
            var d = e.state.overlays[u],
              p = 1,
              m = 0;
            (n.state = !0),
              wo(
                e,
                t.text,
                d.mode,
                n,
                function (y, S) {
                  for (var N = p; m < y; ) {
                    var z = i[p];
                    z > y && i.splice(p, 1, y, i[p + 1], z),
                      (p += 2),
                      (m = Math.min(y, z));
                  }
                  if (S)
                    if (d.opaque)
                      i.splice(N, p - N, y, "overlay " + S), (p = N + 2);
                    else
                      for (; N < p; N += 2) {
                        var P = i[N + 1];
                        i[N + 1] = (P ? P + " " : "") + "overlay " + S;
                      }
                },
                o,
              ),
              (n.state = l),
              (n.baseTokens = null),
              (n.baseTokenPos = 1);
          },
          s = 0;
        s < e.state.overlays.length;
        ++s
      )
        a(s);
      return { styles: i, classes: o.bgClass || o.textClass ? o : null };
    }
    function go(e, t, n) {
      if (!t.styles || t.styles[0] != e.state.modeGen) {
        var r = fn(e, f(t)),
          i =
            t.text.length > e.options.maxHighlightLength &&
            Ut(e.doc.mode, r.state),
          o = vo(e, t, r);
        i && (r.state = i),
          (t.stateAfter = r.save(!i)),
          (t.styles = o.styles),
          o.classes
            ? (t.styleClasses = o.classes)
            : t.styleClasses && (t.styleClasses = null),
          n === e.doc.highlightFrontier &&
            (e.doc.modeFrontier = Math.max(
              e.doc.modeFrontier,
              ++e.doc.highlightFrontier,
            ));
      }
      return t.styles;
    }
    function fn(e, t, n) {
      var r = e.doc,
        i = e.display;
      if (!r.mode.startState) return new Gt(r, !0, t);
      var o = ba(e, t, n),
        l = o > r.first && U(r, o - 1).stateAfter,
        a = l ? Gt.fromSaved(r, l, o) : new Gt(r, _r(r.mode), o);
      return (
        r.iter(o, t, function (s) {
          bi(e, s.text, a);
          var u = a.line;
          (s.stateAfter =
            u == t - 1 || u % 5 == 0 || (u >= i.viewFrom && u < i.viewTo)
              ? a.save()
              : null),
            a.nextLine();
        }),
        n && (r.modeFrontier = a.line),
        a
      );
    }
    function bi(e, t, n, r) {
      var i = e.doc.mode,
        o = new je(t, e.options.tabSize, n);
      for (o.start = o.pos = r || 0, t == "" && yo(i, n.state); !o.eol(); )
        xi(i, o, n.state), (o.start = o.pos);
    }
    function yo(e, t) {
      if (e.blankLine) return e.blankLine(t);
      if (e.innerMode) {
        var n = sn(e, t);
        if (n.mode.blankLine) return n.mode.blankLine(n.state);
      }
    }
    function xi(e, t, n, r) {
      for (var i = 0; i < 10; i++) {
        r && (r[0] = sn(e, n).mode);
        var o = e.token(t, n);
        if (t.pos > t.start) return o;
      }
      throw new Error("Mode " + e.name + " failed to advance stream.");
    }
    var mo = function (e, t, n) {
      (this.start = e.start),
        (this.end = e.pos),
        (this.string = e.current()),
        (this.type = t || null),
        (this.state = n);
    };
    function bo(e, t, n, r) {
      var i = e.doc,
        o = i.mode,
        l;
      t = fe(i, t);
      var a = U(i, t.line),
        s = fn(e, t.line, n),
        u = new je(a.text, e.options.tabSize, s),
        d;
      for (r && (d = []); (r || u.pos < t.ch) && !u.eol(); )
        (u.start = u.pos),
          (l = xi(o, u, s.state)),
          r && d.push(new mo(u, l, Ut(i.mode, s.state)));
      return r ? d : new mo(u, l, s.state);
    }
    function xo(e, t) {
      if (e)
        for (;;) {
          var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
          if (!n) break;
          e = e.slice(0, n.index) + e.slice(n.index + n[0].length);
          var r = n[1] ? "bgClass" : "textClass";
          t[r] == null
            ? (t[r] = n[2])
            : new RegExp("(?:^|\\s)" + n[2] + "(?:$|\\s)").test(t[r]) ||
              (t[r] += " " + n[2]);
        }
      return e;
    }
    function wo(e, t, n, r, i, o, l) {
      var a = n.flattenSpans;
      a == null && (a = e.options.flattenSpans);
      var s = 0,
        u = null,
        d = new je(t, e.options.tabSize, r),
        p,
        m = e.options.addModeClass && [null];
      for (t == "" && xo(yo(n, r.state), o); !d.eol(); ) {
        if (
          (d.pos > e.options.maxHighlightLength
            ? ((a = !1),
              l && bi(e, t, r, d.pos),
              (d.pos = t.length),
              (p = null))
            : (p = xo(xi(n, d, r.state, m), o)),
          m)
        ) {
          var y = m[0].name;
          y && (p = "m-" + (p ? y + " " + p : y));
        }
        if (!a || u != p) {
          for (; s < d.start; ) (s = Math.min(d.start, s + 5e3)), i(s, u);
          u = p;
        }
        d.start = d.pos;
      }
      for (; s < d.pos; ) {
        var S = Math.min(d.pos, s + 5e3);
        i(S, u), (s = S);
      }
    }
    function ba(e, t, n) {
      for (
        var r,
          i,
          o = e.doc,
          l = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100),
          a = t;
        a > l;
        --a
      ) {
        if (a <= o.first) return o.first;
        var s = U(o, a - 1),
          u = s.stateAfter;
        if (
          u &&
          (!n || a + (u instanceof Bn ? u.lookAhead : 0) <= o.modeFrontier)
        )
          return a;
        var d = he(s.text, null, e.options.tabSize);
        (i == null || r > d) && ((i = a - 1), (r = d));
      }
      return i;
    }
    function xa(e, t) {
      if (
        ((e.modeFrontier = Math.min(e.modeFrontier, t)),
        !(e.highlightFrontier < t - 10))
      ) {
        for (var n = e.first, r = t - 1; r > n; r--) {
          var i = U(e, r).stateAfter;
          if (i && (!(i instanceof Bn) || r + i.lookAhead < t)) {
            n = r + 1;
            break;
          }
        }
        e.highlightFrontier = Math.min(e.highlightFrontier, n);
      }
    }
    var ko = !1,
      Jt = !1;
    function wa() {
      ko = !0;
    }
    function ka() {
      Jt = !0;
    }
    function Rn(e, t, n) {
      (this.marker = e), (this.from = t), (this.to = n);
    }
    function cn(e, t) {
      if (e)
        for (var n = 0; n < e.length; ++n) {
          var r = e[n];
          if (r.marker == t) return r;
        }
    }
    function Sa(e, t) {
      for (var n, r = 0; r < e.length; ++r)
        e[r] != t && (n || (n = [])).push(e[r]);
      return n;
    }
    function Ca(e, t, n) {
      var r =
        n &&
        window.WeakSet &&
        (n.markedSpans || (n.markedSpans = new WeakSet()));
      r && e.markedSpans && r.has(e.markedSpans)
        ? e.markedSpans.push(t)
        : ((e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t]),
          r && r.add(e.markedSpans)),
        t.marker.attachLine(e);
    }
    function Ta(e, t, n) {
      var r;
      if (e)
        for (var i = 0; i < e.length; ++i) {
          var o = e[i],
            l = o.marker,
            a = o.from == null || (l.inclusiveLeft ? o.from <= t : o.from < t);
          if (
            a ||
            (o.from == t &&
              l.type == "bookmark" &&
              (!n || !o.marker.insertLeft))
          ) {
            var s = o.to == null || (l.inclusiveRight ? o.to >= t : o.to > t);
            (r || (r = [])).push(new Rn(l, o.from, s ? null : o.to));
          }
        }
      return r;
    }
    function La(e, t, n) {
      var r;
      if (e)
        for (var i = 0; i < e.length; ++i) {
          var o = e[i],
            l = o.marker,
            a = o.to == null || (l.inclusiveRight ? o.to >= t : o.to > t);
          if (
            a ||
            (o.from == t && l.type == "bookmark" && (!n || o.marker.insertLeft))
          ) {
            var s =
              o.from == null || (l.inclusiveLeft ? o.from <= t : o.from < t);
            (r || (r = [])).push(
              new Rn(l, s ? null : o.from - t, o.to == null ? null : o.to - t),
            );
          }
        }
      return r;
    }
    function wi(e, t) {
      if (t.full) return null;
      var n = L(e, t.from.line) && U(e, t.from.line).markedSpans,
        r = L(e, t.to.line) && U(e, t.to.line).markedSpans;
      if (!n && !r) return null;
      var i = t.from.ch,
        o = t.to.ch,
        l = I(t.from, t.to) == 0,
        a = Ta(n, i, l),
        s = La(r, o, l),
        u = t.text.length == 1,
        d = re(t.text).length + (u ? i : 0);
      if (a)
        for (var p = 0; p < a.length; ++p) {
          var m = a[p];
          if (m.to == null) {
            var y = cn(s, m.marker);
            y ? u && (m.to = y.to == null ? null : y.to + d) : (m.to = i);
          }
        }
      if (s)
        for (var S = 0; S < s.length; ++S) {
          var N = s[S];
          if ((N.to != null && (N.to += d), N.from == null)) {
            var z = cn(a, N.marker);
            z || ((N.from = d), u && (a || (a = [])).push(N));
          } else (N.from += d), u && (a || (a = [])).push(N);
        }
      a && (a = So(a)), s && s != a && (s = So(s));
      var P = [a];
      if (!u) {
        var W = t.text.length - 2,
          E;
        if (W > 0 && a)
          for (var B = 0; B < a.length; ++B)
            a[B].to == null &&
              (E || (E = [])).push(new Rn(a[B].marker, null, null));
        for (var Q = 0; Q < W; ++Q) P.push(E);
        P.push(s);
      }
      return P;
    }
    function So(e) {
      for (var t = 0; t < e.length; ++t) {
        var n = e[t];
        n.from != null &&
          n.from == n.to &&
          n.marker.clearWhenEmpty !== !1 &&
          e.splice(t--, 1);
      }
      return e.length ? e : null;
    }
    function Ma(e, t, n) {
      var r = null;
      if (
        (e.iter(t.line, n.line + 1, function (y) {
          if (y.markedSpans)
            for (var S = 0; S < y.markedSpans.length; ++S) {
              var N = y.markedSpans[S].marker;
              N.readOnly && (!r || G(r, N) == -1) && (r || (r = [])).push(N);
            }
        }),
        !r)
      )
        return null;
      for (var i = [{ from: t, to: n }], o = 0; o < r.length; ++o)
        for (var l = r[o], a = l.find(0), s = 0; s < i.length; ++s) {
          var u = i[s];
          if (!(I(u.to, a.from) < 0 || I(u.from, a.to) > 0)) {
            var d = [s, 1],
              p = I(u.from, a.from),
              m = I(u.to, a.to);
            (p < 0 || (!l.inclusiveLeft && !p)) &&
              d.push({ from: u.from, to: a.from }),
              (m > 0 || (!l.inclusiveRight && !m)) &&
                d.push({ from: a.to, to: u.to }),
              i.splice.apply(i, d),
              (s += d.length - 3);
          }
        }
      return i;
    }
    function Co(e) {
      var t = e.markedSpans;
      if (t) {
        for (var n = 0; n < t.length; ++n) t[n].marker.detachLine(e);
        e.markedSpans = null;
      }
    }
    function To(e, t) {
      if (t) {
        for (var n = 0; n < t.length; ++n) t[n].marker.attachLine(e);
        e.markedSpans = t;
      }
    }
    function Kn(e) {
      return e.inclusiveLeft ? -1 : 0;
    }
    function Un(e) {
      return e.inclusiveRight ? 1 : 0;
    }
    function ki(e, t) {
      var n = e.lines.length - t.lines.length;
      if (n != 0) return n;
      var r = e.find(),
        i = t.find(),
        o = I(r.from, i.from) || Kn(e) - Kn(t);
      if (o) return -o;
      var l = I(r.to, i.to) || Un(e) - Un(t);
      return l || t.id - e.id;
    }
    function Lo(e, t) {
      var n = Jt && e.markedSpans,
        r;
      if (n)
        for (var i = void 0, o = 0; o < n.length; ++o)
          (i = n[o]),
            i.marker.collapsed &&
              (t ? i.from : i.to) == null &&
              (!r || ki(r, i.marker) < 0) &&
              (r = i.marker);
      return r;
    }
    function Mo(e) {
      return Lo(e, !0);
    }
    function Gn(e) {
      return Lo(e, !1);
    }
    function Na(e, t) {
      var n = Jt && e.markedSpans,
        r;
      if (n)
        for (var i = 0; i < n.length; ++i) {
          var o = n[i];
          o.marker.collapsed &&
            (o.from == null || o.from < t) &&
            (o.to == null || o.to > t) &&
            (!r || ki(r, o.marker) < 0) &&
            (r = o.marker);
        }
      return r;
    }
    function No(e, t, n, r, i) {
      var o = U(e, t),
        l = Jt && o.markedSpans;
      if (l)
        for (var a = 0; a < l.length; ++a) {
          var s = l[a];
          if (s.marker.collapsed) {
            var u = s.marker.find(0),
              d = I(u.from, n) || Kn(s.marker) - Kn(i),
              p = I(u.to, r) || Un(s.marker) - Un(i);
            if (
              !((d >= 0 && p <= 0) || (d <= 0 && p >= 0)) &&
              ((d <= 0 &&
                (s.marker.inclusiveRight && i.inclusiveLeft
                  ? I(u.to, n) >= 0
                  : I(u.to, n) > 0)) ||
                (d >= 0 &&
                  (s.marker.inclusiveRight && i.inclusiveLeft
                    ? I(u.from, r) <= 0
                    : I(u.from, r) < 0)))
            )
              return !0;
          }
        }
    }
    function Ht(e) {
      for (var t; (t = Mo(e)); ) e = t.find(-1, !0).line;
      return e;
    }
    function Da(e) {
      for (var t; (t = Gn(e)); ) e = t.find(1, !0).line;
      return e;
    }
    function Aa(e) {
      for (var t, n; (t = Gn(e)); )
        (e = t.find(1, !0).line), (n || (n = [])).push(e);
      return n;
    }
    function Si(e, t) {
      var n = U(e, t),
        r = Ht(n);
      return n == r ? t : f(r);
    }
    function Do(e, t) {
      if (t > e.lastLine()) return t;
      var n = U(e, t),
        r;
      if (!sr(e, n)) return t;
      for (; (r = Gn(n)); ) n = r.find(1, !0).line;
      return f(n) + 1;
    }
    function sr(e, t) {
      var n = Jt && t.markedSpans;
      if (n) {
        for (var r = void 0, i = 0; i < n.length; ++i)
          if (((r = n[i]), !!r.marker.collapsed)) {
            if (r.from == null) return !0;
            if (
              !r.marker.widgetNode &&
              r.from == 0 &&
              r.marker.inclusiveLeft &&
              Ci(e, t, r)
            )
              return !0;
          }
      }
    }
    function Ci(e, t, n) {
      if (n.to == null) {
        var r = n.marker.find(1, !0);
        return Ci(e, r.line, cn(r.line.markedSpans, n.marker));
      }
      if (n.marker.inclusiveRight && n.to == t.text.length) return !0;
      for (var i = void 0, o = 0; o < t.markedSpans.length; ++o)
        if (
          ((i = t.markedSpans[o]),
          i.marker.collapsed &&
            !i.marker.widgetNode &&
            i.from == n.to &&
            (i.to == null || i.to != n.from) &&
            (i.marker.inclusiveLeft || n.marker.inclusiveRight) &&
            Ci(e, t, i))
        )
          return !0;
    }
    function Qt(e) {
      e = Ht(e);
      for (var t = 0, n = e.parent, r = 0; r < n.lines.length; ++r) {
        var i = n.lines[r];
        if (i == e) break;
        t += i.height;
      }
      for (var o = n.parent; o; n = o, o = n.parent)
        for (var l = 0; l < o.children.length; ++l) {
          var a = o.children[l];
          if (a == n) break;
          t += a.height;
        }
      return t;
    }
    function qn(e) {
      if (e.height == 0) return 0;
      for (var t = e.text.length, n, r = e; (n = Mo(r)); ) {
        var i = n.find(0, !0);
        (r = i.from.line), (t += i.from.ch - i.to.ch);
      }
      for (r = e; (n = Gn(r)); ) {
        var o = n.find(0, !0);
        (t -= r.text.length - o.from.ch),
          (r = o.to.line),
          (t += r.text.length - o.to.ch);
      }
      return t;
    }
    function Ti(e) {
      var t = e.display,
        n = e.doc;
      (t.maxLine = U(n, n.first)),
        (t.maxLineLength = qn(t.maxLine)),
        (t.maxLineChanged = !0),
        n.iter(function (r) {
          var i = qn(r);
          i > t.maxLineLength && ((t.maxLineLength = i), (t.maxLine = r));
        });
    }
    var Br = function (e, t, n) {
      (this.text = e), To(this, t), (this.height = n ? n(this) : 1);
    };
    (Br.prototype.lineNo = function () {
      return f(this);
    }),
      Et(Br);
    function Oa(e, t, n, r) {
      (e.text = t),
        e.stateAfter && (e.stateAfter = null),
        e.styles && (e.styles = null),
        e.order != null && (e.order = null),
        Co(e),
        To(e, n);
      var i = r ? r(e) : 1;
      i != e.height && Dt(e, i);
    }
    function za(e) {
      (e.parent = null), Co(e);
    }
    var Pa = {},
      Ea = {};
    function Ao(e, t) {
      if (!e || /^\s*$/.test(e)) return null;
      var n = t.addModeClass ? Ea : Pa;
      return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"));
    }
    function Oo(e, t) {
      var n = x("span", null, null, _ ? "padding-right: .1px" : null),
        r = {
          pre: x("pre", [n], "CodeMirror-line"),
          content: n,
          col: 0,
          pos: 0,
          cm: e,
          trailingSpace: !1,
          splitSpaces: e.getOption("lineWrapping"),
        };
      t.measure = {};
      for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
        var o = i ? t.rest[i - 1] : t.line,
          l = void 0;
        (r.pos = 0),
          (r.addToken = Fa),
          or(e.display.measure) &&
            (l = ke(o, e.doc.direction)) &&
            (r.addToken = _a(r.addToken, l)),
          (r.map = []);
        var a = t != e.display.externalMeasured && f(o);
        Ha(o, r, go(e, o, a)),
          o.styleClasses &&
            (o.styleClasses.bgClass &&
              (r.bgClass = K(o.styleClasses.bgClass, r.bgClass || "")),
            o.styleClasses.textClass &&
              (r.textClass = K(o.styleClasses.textClass, r.textClass || ""))),
          r.map.length == 0 &&
            r.map.push(0, 0, r.content.appendChild(_n(e.display.measure))),
          i == 0
            ? ((t.measure.map = r.map), (t.measure.cache = {}))
            : ((t.measure.maps || (t.measure.maps = [])).push(r.map),
              (t.measure.caches || (t.measure.caches = [])).push({}));
      }
      if (_) {
        var s = r.content.lastChild;
        (/\bcm-tab\b/.test(s.className) ||
          (s.querySelector && s.querySelector(".cm-tab"))) &&
          (r.content.className = "cm-tab-wrap-hack");
      }
      return (
        Ge(e, "renderLine", e, t.line, r.pre),
        r.pre.className &&
          (r.textClass = K(r.pre.className, r.textClass || "")),
        r
      );
    }
    function Ia(e) {
      var t = c("span", "•", "cm-invalidchar");
      return (
        (t.title = "\\u" + e.charCodeAt(0).toString(16)),
        t.setAttribute("aria-label", t.title),
        t
      );
    }
    function Fa(e, t, n, r, i, o, l) {
      if (t) {
        var a = e.splitSpaces ? Wa(t, e.trailingSpace) : t,
          s = e.cm.state.specialChars,
          u = !1,
          d;
        if (!s.test(t))
          (e.col += t.length),
            (d = document.createTextNode(a)),
            e.map.push(e.pos, e.pos + t.length, d),
            M && j < 9 && (u = !0),
            (e.pos += t.length);
        else {
          d = document.createDocumentFragment();
          for (var p = 0; ; ) {
            s.lastIndex = p;
            var m = s.exec(t),
              y = m ? m.index - p : t.length - p;
            if (y) {
              var S = document.createTextNode(a.slice(p, p + y));
              M && j < 9 ? d.appendChild(c("span", [S])) : d.appendChild(S),
                e.map.push(e.pos, e.pos + y, S),
                (e.col += y),
                (e.pos += y);
            }
            if (!m) break;
            p += y + 1;
            var N = void 0;
            if (m[0] == "	") {
              var z = e.cm.options.tabSize,
                P = z - (e.col % z);
              (N = d.appendChild(c("span", ht(P), "cm-tab"))),
                N.setAttribute("role", "presentation"),
                N.setAttribute("cm-text", "	"),
                (e.col += P);
            } else
              m[0] == "\r" ||
              m[0] ==
                `
`
                ? ((N = d.appendChild(
                    c("span", m[0] == "\r" ? "␍" : "␤", "cm-invalidchar"),
                  )),
                  N.setAttribute("cm-text", m[0]),
                  (e.col += 1))
                : ((N = e.cm.options.specialCharPlaceholder(m[0])),
                  N.setAttribute("cm-text", m[0]),
                  M && j < 9 ? d.appendChild(c("span", [N])) : d.appendChild(N),
                  (e.col += 1));
            e.map.push(e.pos, e.pos + 1, N), e.pos++;
          }
        }
        if (
          ((e.trailingSpace = a.charCodeAt(t.length - 1) == 32),
          n || r || i || u || o || l)
        ) {
          var W = n || "";
          r && (W += r), i && (W += i);
          var E = c("span", [d], W, o);
          if (l)
            for (var B in l)
              l.hasOwnProperty(B) &&
                B != "style" &&
                B != "class" &&
                E.setAttribute(B, l[B]);
          return e.content.appendChild(E);
        }
        e.content.appendChild(d);
      }
    }
    function Wa(e, t) {
      if (e.length > 1 && !/  /.test(e)) return e;
      for (var n = t, r = "", i = 0; i < e.length; i++) {
        var o = e.charAt(i);
        o == " " &&
          n &&
          (i == e.length - 1 || e.charCodeAt(i + 1) == 32) &&
          (o = " "),
          (r += o),
          (n = o == " ");
      }
      return r;
    }
    function _a(e, t) {
      return function (n, r, i, o, l, a, s) {
        i = i ? i + " cm-force-border" : "cm-force-border";
        for (var u = n.pos, d = u + r.length; ; ) {
          for (
            var p = void 0, m = 0;
            m < t.length && ((p = t[m]), !(p.to > u && p.from <= u));
            m++
          );
          if (p.to >= d) return e(n, r, i, o, l, a, s);
          e(n, r.slice(0, p.to - u), i, o, null, a, s),
            (o = null),
            (r = r.slice(p.to - u)),
            (u = p.to);
        }
      };
    }
    function zo(e, t, n, r) {
      var i = !r && n.widgetNode;
      i && e.map.push(e.pos, e.pos + t, i),
        !r &&
          e.cm.display.input.needsContentAttribute &&
          (i || (i = e.content.appendChild(document.createElement("span"))),
          i.setAttribute("cm-marker", n.id)),
        i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)),
        (e.pos += t),
        (e.trailingSpace = !1);
    }
    function Ha(e, t, n) {
      var r = e.markedSpans,
        i = e.text,
        o = 0;
      if (!r) {
        for (var l = 1; l < n.length; l += 2)
          t.addToken(t, i.slice(o, (o = n[l])), Ao(n[l + 1], t.cm.options));
        return;
      }
      for (
        var a = i.length, s = 0, u = 1, d = "", p, m, y = 0, S, N, z, P, W;
        ;

      ) {
        if (y == s) {
          (S = N = z = m = ""), (W = null), (P = null), (y = 1 / 0);
          for (var E = [], B = void 0, Q = 0; Q < r.length; ++Q) {
            var Z = r[Q],
              ge = Z.marker;
            if (ge.type == "bookmark" && Z.from == s && ge.widgetNode)
              E.push(ge);
            else if (
              Z.from <= s &&
              (Z.to == null ||
                Z.to > s ||
                (ge.collapsed && Z.to == s && Z.from == s))
            ) {
              if (
                (Z.to != null &&
                  Z.to != s &&
                  y > Z.to &&
                  ((y = Z.to), (N = "")),
                ge.className && (S += " " + ge.className),
                ge.css && (m = (m ? m + ";" : "") + ge.css),
                ge.startStyle && Z.from == s && (z += " " + ge.startStyle),
                ge.endStyle &&
                  Z.to == y &&
                  (B || (B = [])).push(ge.endStyle, Z.to),
                ge.title && ((W || (W = {})).title = ge.title),
                ge.attributes)
              )
                for (var Fe in ge.attributes)
                  (W || (W = {}))[Fe] = ge.attributes[Fe];
              ge.collapsed && (!P || ki(P.marker, ge) < 0) && (P = Z);
            } else Z.from > s && y > Z.from && (y = Z.from);
          }
          if (B)
            for (var it = 0; it < B.length; it += 2)
              B[it + 1] == y && (N += " " + B[it]);
          if (!P || P.from == s)
            for (var Ue = 0; Ue < E.length; ++Ue) zo(t, 0, E[Ue]);
          if (P && (P.from || 0) == s) {
            if (
              (zo(
                t,
                (P.to == null ? a + 1 : P.to) - s,
                P.marker,
                P.from == null,
              ),
              P.to == null)
            )
              return;
            P.to == s && (P = !1);
          }
        }
        if (s >= a) break;
        for (var Nt = Math.min(a, y); ; ) {
          if (d) {
            var wt = s + d.length;
            if (!P) {
              var Ze = wt > Nt ? d.slice(0, Nt - s) : d;
              t.addToken(
                t,
                Ze,
                p ? p + S : S,
                z,
                s + Ze.length == y ? N : "",
                m,
                W,
              );
            }
            if (wt >= Nt) {
              (d = d.slice(Nt - s)), (s = Nt);
              break;
            }
            (s = wt), (z = "");
          }
          (d = i.slice(o, (o = n[u++]))), (p = Ao(n[u++], t.cm.options));
        }
      }
    }
    function Po(e, t, n) {
      (this.line = t),
        (this.rest = Aa(t)),
        (this.size = this.rest ? f(re(this.rest)) - n + 1 : 1),
        (this.node = this.text = null),
        (this.hidden = sr(e, t));
    }
    function jn(e, t, n) {
      for (var r = [], i, o = t; o < n; o = i) {
        var l = new Po(e.doc, U(e.doc, o), o);
        (i = o + l.size), r.push(l);
      }
      return r;
    }
    var Rr = null;
    function Ba(e) {
      Rr
        ? Rr.ops.push(e)
        : (e.ownsGroup = Rr = { ops: [e], delayedCallbacks: [] });
    }
    function Ra(e) {
      var t = e.delayedCallbacks,
        n = 0;
      do {
        for (; n < t.length; n++) t[n].call(null);
        for (var r = 0; r < e.ops.length; r++) {
          var i = e.ops[r];
          if (i.cursorActivityHandlers)
            for (; i.cursorActivityCalled < i.cursorActivityHandlers.length; )
              i.cursorActivityHandlers[i.cursorActivityCalled++].call(
                null,
                i.cm,
              );
        }
      } while (n < t.length);
    }
    function Ka(e, t) {
      var n = e.ownsGroup;
      if (n)
        try {
          Ra(n);
        } finally {
          (Rr = null), t(n);
        }
    }
    var dn = null;
    function tt(e, t) {
      var n = Yt(e, t);
      if (n.length) {
        var r = Array.prototype.slice.call(arguments, 2),
          i;
        Rr
          ? (i = Rr.delayedCallbacks)
          : dn
            ? (i = dn)
            : ((i = dn = []), setTimeout(Ua, 0));
        for (
          var o = function (a) {
              i.push(function () {
                return n[a].apply(null, r);
              });
            },
            l = 0;
          l < n.length;
          ++l
        )
          o(l);
      }
    }
    function Ua() {
      var e = dn;
      dn = null;
      for (var t = 0; t < e.length; ++t) e[t]();
    }
    function Eo(e, t, n, r) {
      for (var i = 0; i < t.changes.length; i++) {
        var o = t.changes[i];
        o == "text"
          ? qa(e, t)
          : o == "gutter"
            ? Fo(e, t, n, r)
            : o == "class"
              ? Li(e, t)
              : o == "widget" && ja(e, t, r);
      }
      t.changes = null;
    }
    function hn(e) {
      return (
        e.node == e.text &&
          ((e.node = c("div", null, null, "position: relative")),
          e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text),
          e.node.appendChild(e.text),
          M && j < 8 && (e.node.style.zIndex = 2)),
        e.node
      );
    }
    function Ga(e, t) {
      var n = t.bgClass
        ? t.bgClass + " " + (t.line.bgClass || "")
        : t.line.bgClass;
      if ((n && (n += " CodeMirror-linebackground"), t.background))
        n
          ? (t.background.className = n)
          : (t.background.parentNode.removeChild(t.background),
            (t.background = null));
      else if (n) {
        var r = hn(t);
        (t.background = r.insertBefore(c("div", null, n), r.firstChild)),
          e.display.input.setUneditable(t.background);
      }
    }
    function Io(e, t) {
      var n = e.display.externalMeasured;
      return n && n.line == t.line
        ? ((e.display.externalMeasured = null),
          (t.measure = n.measure),
          n.built)
        : Oo(e, t);
    }
    function qa(e, t) {
      var n = t.text.className,
        r = Io(e, t);
      t.text == t.node && (t.node = r.pre),
        t.text.parentNode.replaceChild(r.pre, t.text),
        (t.text = r.pre),
        r.bgClass != t.bgClass || r.textClass != t.textClass
          ? ((t.bgClass = r.bgClass), (t.textClass = r.textClass), Li(e, t))
          : n && (t.text.className = n);
    }
    function Li(e, t) {
      Ga(e, t),
        t.line.wrapClass
          ? (hn(t).className = t.line.wrapClass)
          : t.node != t.text && (t.node.className = "");
      var n = t.textClass
        ? t.textClass + " " + (t.line.textClass || "")
        : t.line.textClass;
      t.text.className = n || "";
    }
    function Fo(e, t, n, r) {
      if (
        (t.gutter && (t.node.removeChild(t.gutter), (t.gutter = null)),
        t.gutterBackground &&
          (t.node.removeChild(t.gutterBackground), (t.gutterBackground = null)),
        t.line.gutterClass)
      ) {
        var i = hn(t);
        (t.gutterBackground = c(
          "div",
          null,
          "CodeMirror-gutter-background " + t.line.gutterClass,
          "left: " +
            (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) +
            "px; width: " +
            r.gutterTotalWidth +
            "px",
        )),
          e.display.input.setUneditable(t.gutterBackground),
          i.insertBefore(t.gutterBackground, t.text);
      }
      var o = t.line.gutterMarkers;
      if (e.options.lineNumbers || o) {
        var l = hn(t),
          a = (t.gutter = c(
            "div",
            null,
            "CodeMirror-gutter-wrapper",
            "left: " +
              (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) +
              "px",
          ));
        if (
          (a.setAttribute("aria-hidden", "true"),
          e.display.input.setUneditable(a),
          l.insertBefore(a, t.text),
          t.line.gutterClass && (a.className += " " + t.line.gutterClass),
          e.options.lineNumbers &&
            (!o || !o["CodeMirror-linenumbers"]) &&
            (t.lineNumber = a.appendChild(
              c(
                "div",
                O(e.options, n),
                "CodeMirror-linenumber CodeMirror-gutter-elt",
                "left: " +
                  r.gutterLeft["CodeMirror-linenumbers"] +
                  "px; width: " +
                  e.display.lineNumInnerWidth +
                  "px",
              ),
            )),
          o)
        )
          for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
            var u = e.display.gutterSpecs[s].className,
              d = o.hasOwnProperty(u) && o[u];
            d &&
              a.appendChild(
                c(
                  "div",
                  [d],
                  "CodeMirror-gutter-elt",
                  "left: " +
                    r.gutterLeft[u] +
                    "px; width: " +
                    r.gutterWidth[u] +
                    "px",
                ),
              );
          }
      }
    }
    function ja(e, t, n) {
      t.alignable && (t.alignable = null);
      for (
        var r = X("CodeMirror-linewidget"), i = t.node.firstChild, o = void 0;
        i;
        i = o
      )
        (o = i.nextSibling), r.test(i.className) && t.node.removeChild(i);
      Wo(e, t, n);
    }
    function Xa(e, t, n, r) {
      var i = Io(e, t);
      return (
        (t.text = t.node = i.pre),
        i.bgClass && (t.bgClass = i.bgClass),
        i.textClass && (t.textClass = i.textClass),
        Li(e, t),
        Fo(e, t, n, r),
        Wo(e, t, r),
        t.node
      );
    }
    function Wo(e, t, n) {
      if ((_o(e, t.line, t, n, !0), t.rest))
        for (var r = 0; r < t.rest.length; r++) _o(e, t.rest[r], t, n, !1);
    }
    function _o(e, t, n, r, i) {
      if (t.widgets)
        for (var o = hn(n), l = 0, a = t.widgets; l < a.length; ++l) {
          var s = a[l],
            u = c(
              "div",
              [s.node],
              "CodeMirror-linewidget" + (s.className ? " " + s.className : ""),
            );
          s.handleMouseEvents || u.setAttribute("cm-ignore-events", "true"),
            Ya(s, u, n, r),
            e.display.input.setUneditable(u),
            i && s.above
              ? o.insertBefore(u, n.gutter || n.text)
              : o.appendChild(u),
            tt(s, "redraw");
        }
    }
    function Ya(e, t, n, r) {
      if (e.noHScroll) {
        (n.alignable || (n.alignable = [])).push(t);
        var i = r.wrapperWidth;
        (t.style.left = r.fixedPos + "px"),
          e.coverGutter ||
            ((i -= r.gutterTotalWidth),
            (t.style.paddingLeft = r.gutterTotalWidth + "px")),
          (t.style.width = i + "px");
      }
      e.coverGutter &&
        ((t.style.zIndex = 5),
        (t.style.position = "relative"),
        e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"));
    }
    function pn(e) {
      if (e.height != null) return e.height;
      var t = e.doc.cm;
      if (!t) return 0;
      if (!v(document.body, e.node)) {
        var n = "position: relative;";
        e.coverGutter &&
          (n += "margin-left: -" + t.display.gutters.offsetWidth + "px;"),
          e.noHScroll &&
            (n += "width: " + t.display.wrapper.clientWidth + "px;"),
          H(t.display.measure, c("div", [e.node], null, n));
      }
      return (e.height = e.node.parentNode.offsetHeight);
    }
    function Vt(e, t) {
      for (var n = ln(t); n != e.wrapper; n = n.parentNode)
        if (
          !n ||
          (n.nodeType == 1 && n.getAttribute("cm-ignore-events") == "true") ||
          (n.parentNode == e.sizer && n != e.mover)
        )
          return !0;
    }
    function Xn(e) {
      return e.lineSpace.offsetTop;
    }
    function Mi(e) {
      return e.mover.offsetHeight - e.lineSpace.offsetHeight;
    }
    function Ho(e) {
      if (e.cachedPaddingH) return e.cachedPaddingH;
      var t = H(e.measure, c("pre", "x", "CodeMirror-line-like")),
        n = window.getComputedStyle
          ? window.getComputedStyle(t)
          : t.currentStyle,
        r = { left: parseInt(n.paddingLeft), right: parseInt(n.paddingRight) };
      return !isNaN(r.left) && !isNaN(r.right) && (e.cachedPaddingH = r), r;
    }
    function qt(e) {
      return Ve - e.display.nativeBarWidth;
    }
    function xr(e) {
      return e.display.scroller.clientWidth - qt(e) - e.display.barWidth;
    }
    function Ni(e) {
      return e.display.scroller.clientHeight - qt(e) - e.display.barHeight;
    }
    function Za(e, t, n) {
      var r = e.options.lineWrapping,
        i = r && xr(e);
      if (!t.measure.heights || (r && t.measure.width != i)) {
        var o = (t.measure.heights = []);
        if (r) {
          t.measure.width = i;
          for (
            var l = t.text.firstChild.getClientRects(), a = 0;
            a < l.length - 1;
            a++
          ) {
            var s = l[a],
              u = l[a + 1];
            Math.abs(s.bottom - u.bottom) > 2 &&
              o.push((s.bottom + u.top) / 2 - n.top);
          }
        }
        o.push(n.bottom - n.top);
      }
    }
    function Bo(e, t, n) {
      if (e.line == t) return { map: e.measure.map, cache: e.measure.cache };
      if (e.rest) {
        for (var r = 0; r < e.rest.length; r++)
          if (e.rest[r] == t)
            return { map: e.measure.maps[r], cache: e.measure.caches[r] };
        for (var i = 0; i < e.rest.length; i++)
          if (f(e.rest[i]) > n)
            return {
              map: e.measure.maps[i],
              cache: e.measure.caches[i],
              before: !0,
            };
      }
    }
    function Ja(e, t) {
      t = Ht(t);
      var n = f(t),
        r = (e.display.externalMeasured = new Po(e.doc, t, n));
      r.lineN = n;
      var i = (r.built = Oo(e, r));
      return (r.text = i.pre), H(e.display.lineMeasure, i.pre), r;
    }
    function Ro(e, t, n, r) {
      return jt(e, Kr(e, t), n, r);
    }
    function Di(e, t) {
      if (t >= e.display.viewFrom && t < e.display.viewTo)
        return e.display.view[Sr(e, t)];
      var n = e.display.externalMeasured;
      if (n && t >= n.lineN && t < n.lineN + n.size) return n;
    }
    function Kr(e, t) {
      var n = f(t),
        r = Di(e, n);
      r && !r.text
        ? (r = null)
        : r && r.changes && (Eo(e, r, n, Ei(e)), (e.curOp.forceUpdate = !0)),
        r || (r = Ja(e, t));
      var i = Bo(r, t, n);
      return {
        line: t,
        view: r,
        rect: null,
        map: i.map,
        cache: i.cache,
        before: i.before,
        hasHeights: !1,
      };
    }
    function jt(e, t, n, r, i) {
      t.before && (n = -1);
      var o = n + (r || ""),
        l;
      return (
        t.cache.hasOwnProperty(o)
          ? (l = t.cache[o])
          : (t.rect || (t.rect = t.view.text.getBoundingClientRect()),
            t.hasHeights || (Za(e, t.view, t.rect), (t.hasHeights = !0)),
            (l = Va(e, t, n, r)),
            l.bogus || (t.cache[o] = l)),
        {
          left: l.left,
          right: l.right,
          top: i ? l.rtop : l.top,
          bottom: i ? l.rbottom : l.bottom,
        }
      );
    }
    var Ko = { left: 0, right: 0, top: 0, bottom: 0 };
    function Uo(e, t, n) {
      for (var r, i, o, l, a, s, u = 0; u < e.length; u += 3)
        if (
          ((a = e[u]),
          (s = e[u + 1]),
          t < a
            ? ((i = 0), (o = 1), (l = "left"))
            : t < s
              ? ((i = t - a), (o = i + 1))
              : (u == e.length - 3 || (t == s && e[u + 3] > t)) &&
                ((o = s - a), (i = o - 1), t >= s && (l = "right")),
          i != null)
        ) {
          if (
            ((r = e[u + 2]),
            a == s && n == (r.insertLeft ? "left" : "right") && (l = n),
            n == "left" && i == 0)
          )
            for (; u && e[u - 2] == e[u - 3] && e[u - 1].insertLeft; )
              (r = e[(u -= 3) + 2]), (l = "left");
          if (n == "right" && i == s - a)
            for (
              ;
              u < e.length - 3 && e[u + 3] == e[u + 4] && !e[u + 5].insertLeft;

            )
              (r = e[(u += 3) + 2]), (l = "right");
          break;
        }
      return {
        node: r,
        start: i,
        end: o,
        collapse: l,
        coverStart: a,
        coverEnd: s,
      };
    }
    function Qa(e, t) {
      var n = Ko;
      if (t == "left")
        for (var r = 0; r < e.length && (n = e[r]).left == n.right; r++);
      else
        for (var i = e.length - 1; i >= 0 && (n = e[i]).left == n.right; i--);
      return n;
    }
    function Va(e, t, n, r) {
      var i = Uo(t.map, n, r),
        o = i.node,
        l = i.start,
        a = i.end,
        s = i.collapse,
        u;
      if (o.nodeType == 3) {
        for (var d = 0; d < 4; d++) {
          for (; l && ve(t.line.text.charAt(i.coverStart + l)); ) --l;
          for (
            ;
            i.coverStart + a < i.coverEnd &&
            ve(t.line.text.charAt(i.coverStart + a));

          )
            ++a;
          if (
            (M && j < 9 && l == 0 && a == i.coverEnd - i.coverStart
              ? (u = o.parentNode.getBoundingClientRect())
              : (u = Qa(b(o, l, a).getClientRects(), r)),
            u.left || u.right || l == 0)
          )
            break;
          (a = l), (l = l - 1), (s = "right");
        }
        M && j < 11 && (u = $a(e.display.measure, u));
      } else {
        l > 0 && (s = r = "right");
        var p;
        e.options.lineWrapping && (p = o.getClientRects()).length > 1
          ? (u = p[r == "right" ? p.length - 1 : 0])
          : (u = o.getBoundingClientRect());
      }
      if (M && j < 9 && !l && (!u || (!u.left && !u.right))) {
        var m = o.parentNode.getClientRects()[0];
        m
          ? (u = {
              left: m.left,
              right: m.left + Gr(e.display),
              top: m.top,
              bottom: m.bottom,
            })
          : (u = Ko);
      }
      for (
        var y = u.top - t.rect.top,
          S = u.bottom - t.rect.top,
          N = (y + S) / 2,
          z = t.view.measure.heights,
          P = 0;
        P < z.length - 1 && !(N < z[P]);
        P++
      );
      var W = P ? z[P - 1] : 0,
        E = z[P],
        B = {
          left: (s == "right" ? u.right : u.left) - t.rect.left,
          right: (s == "left" ? u.left : u.right) - t.rect.left,
          top: W,
          bottom: E,
        };
      return (
        !u.left && !u.right && (B.bogus = !0),
        e.options.singleCursorHeightPerLine || ((B.rtop = y), (B.rbottom = S)),
        B
      );
    }
    function $a(e, t) {
      if (
        !window.screen ||
        screen.logicalXDPI == null ||
        screen.logicalXDPI == screen.deviceXDPI ||
        !mi(e)
      )
        return t;
      var n = screen.logicalXDPI / screen.deviceXDPI,
        r = screen.logicalYDPI / screen.deviceYDPI;
      return {
        left: t.left * n,
        right: t.right * n,
        top: t.top * r,
        bottom: t.bottom * r,
      };
    }
    function Go(e) {
      if (
        e.measure &&
        ((e.measure.cache = {}), (e.measure.heights = null), e.rest)
      )
        for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {};
    }
    function qo(e) {
      (e.display.externalMeasure = null), T(e.display.lineMeasure);
      for (var t = 0; t < e.display.view.length; t++) Go(e.display.view[t]);
    }
    function vn(e) {
      qo(e),
        (e.display.cachedCharWidth =
          e.display.cachedTextHeight =
          e.display.cachedPaddingH =
            null),
        e.options.lineWrapping || (e.display.maxLineChanged = !0),
        (e.display.lineNumChars = null);
    }
    function jo(e) {
      return q && V
        ? -(
            e.body.getBoundingClientRect().left -
            parseInt(getComputedStyle(e.body).marginLeft)
          )
        : e.defaultView.pageXOffset || (e.documentElement || e.body).scrollLeft;
    }
    function Xo(e) {
      return q && V
        ? -(
            e.body.getBoundingClientRect().top -
            parseInt(getComputedStyle(e.body).marginTop)
          )
        : e.defaultView.pageYOffset || (e.documentElement || e.body).scrollTop;
    }
    function Ai(e) {
      var t = Ht(e),
        n = t.widgets,
        r = 0;
      if (n) for (var i = 0; i < n.length; ++i) n[i].above && (r += pn(n[i]));
      return r;
    }
    function Yn(e, t, n, r, i) {
      if (!i) {
        var o = Ai(t);
        (n.top += o), (n.bottom += o);
      }
      if (r == "line") return n;
      r || (r = "local");
      var l = Qt(t);
      if (
        (r == "local" ? (l += Xn(e.display)) : (l -= e.display.viewOffset),
        r == "page" || r == "window")
      ) {
        var a = e.display.lineSpace.getBoundingClientRect();
        l += a.top + (r == "window" ? 0 : Xo(pe(e)));
        var s = a.left + (r == "window" ? 0 : jo(pe(e)));
        (n.left += s), (n.right += s);
      }
      return (n.top += l), (n.bottom += l), n;
    }
    function Yo(e, t, n) {
      if (n == "div") return t;
      var r = t.left,
        i = t.top;
      if (n == "page") (r -= jo(pe(e))), (i -= Xo(pe(e)));
      else if (n == "local" || !n) {
        var o = e.display.sizer.getBoundingClientRect();
        (r += o.left), (i += o.top);
      }
      var l = e.display.lineSpace.getBoundingClientRect();
      return { left: r - l.left, top: i - l.top };
    }
    function Zn(e, t, n, r, i) {
      return r || (r = U(e.doc, t.line)), Yn(e, r, Ro(e, r, t.ch, i), n);
    }
    function Bt(e, t, n, r, i, o) {
      (r = r || U(e.doc, t.line)), i || (i = Kr(e, r));
      function l(S, N) {
        var z = jt(e, i, S, N ? "right" : "left", o);
        return N ? (z.left = z.right) : (z.right = z.left), Yn(e, r, z, n);
      }
      var a = ke(r, e.doc.direction),
        s = t.ch,
        u = t.sticky;
      if (
        (s >= r.text.length
          ? ((s = r.text.length), (u = "before"))
          : s <= 0 && ((s = 0), (u = "after")),
        !a)
      )
        return l(u == "before" ? s - 1 : s, u == "before");
      function d(S, N, z) {
        var P = a[N],
          W = P.level == 1;
        return l(z ? S - 1 : S, W != z);
      }
      var p = nr(a, s, u),
        m = mr,
        y = d(s, p, u == "before");
      return m != null && (y.other = d(s, m, u != "before")), y;
    }
    function Zo(e, t) {
      var n = 0;
      (t = fe(e.doc, t)), e.options.lineWrapping || (n = Gr(e.display) * t.ch);
      var r = U(e.doc, t.line),
        i = Qt(r) + Xn(e.display);
      return { left: n, right: n, top: i, bottom: i + r.height };
    }
    function Oi(e, t, n, r, i) {
      var o = k(e, t, n);
      return (o.xRel = i), r && (o.outside = r), o;
    }
    function zi(e, t, n) {
      var r = e.doc;
      if (((n += e.display.viewOffset), n < 0))
        return Oi(r.first, 0, null, -1, -1);
      var i = h(r, n),
        o = r.first + r.size - 1;
      if (i > o)
        return Oi(r.first + r.size - 1, U(r, o).text.length, null, 1, 1);
      t < 0 && (t = 0);
      for (var l = U(r, i); ; ) {
        var a = es(e, l, i, t, n),
          s = Na(l, a.ch + (a.xRel > 0 || a.outside > 0 ? 1 : 0));
        if (!s) return a;
        var u = s.find(1);
        if (u.line == i) return u;
        l = U(r, (i = u.line));
      }
    }
    function Jo(e, t, n, r) {
      r -= Ai(t);
      var i = t.text.length,
        o = Ot(
          function (l) {
            return jt(e, n, l - 1).bottom <= r;
          },
          i,
          0,
        );
      return (
        (i = Ot(
          function (l) {
            return jt(e, n, l).top > r;
          },
          o,
          i,
        )),
        { begin: o, end: i }
      );
    }
    function Qo(e, t, n, r) {
      n || (n = Kr(e, t));
      var i = Yn(e, t, jt(e, n, r), "line").top;
      return Jo(e, t, n, i);
    }
    function Pi(e, t, n, r) {
      return e.bottom <= n ? !1 : e.top > n ? !0 : (r ? e.left : e.right) > t;
    }
    function es(e, t, n, r, i) {
      i -= Qt(t);
      var o = Kr(e, t),
        l = Ai(t),
        a = 0,
        s = t.text.length,
        u = !0,
        d = ke(t, e.doc.direction);
      if (d) {
        var p = (e.options.lineWrapping ? rs : ts)(e, t, n, o, d, r, i);
        (u = p.level != 1),
          (a = u ? p.from : p.to - 1),
          (s = u ? p.to : p.from - 1);
      }
      var m = null,
        y = null,
        S = Ot(
          function (Q) {
            var Z = jt(e, o, Q);
            return (
              (Z.top += l),
              (Z.bottom += l),
              Pi(Z, r, i, !1)
                ? (Z.top <= i && Z.left <= r && ((m = Q), (y = Z)), !0)
                : !1
            );
          },
          a,
          s,
        ),
        N,
        z,
        P = !1;
      if (y) {
        var W = r - y.left < y.right - r,
          E = W == u;
        (S = m + (E ? 0 : 1)),
          (z = E ? "after" : "before"),
          (N = W ? y.left : y.right);
      } else {
        !u && (S == s || S == a) && S++,
          (z =
            S == 0
              ? "after"
              : S == t.text.length
                ? "before"
                : jt(e, o, S - (u ? 1 : 0)).bottom + l <= i == u
                  ? "after"
                  : "before");
        var B = Bt(e, k(n, S, z), "line", t, o);
        (N = B.left), (P = i < B.top ? -1 : i >= B.bottom ? 1 : 0);
      }
      return (S = Tt(t.text, S, 1)), Oi(n, S, z, P, r - N);
    }
    function ts(e, t, n, r, i, o, l) {
      var a = Ot(
          function (p) {
            var m = i[p],
              y = m.level != 1;
            return Pi(
              Bt(
                e,
                k(n, y ? m.to : m.from, y ? "before" : "after"),
                "line",
                t,
                r,
              ),
              o,
              l,
              !0,
            );
          },
          0,
          i.length - 1,
        ),
        s = i[a];
      if (a > 0) {
        var u = s.level != 1,
          d = Bt(
            e,
            k(n, u ? s.from : s.to, u ? "after" : "before"),
            "line",
            t,
            r,
          );
        Pi(d, o, l, !0) && d.top > l && (s = i[a - 1]);
      }
      return s;
    }
    function rs(e, t, n, r, i, o, l) {
      var a = Jo(e, t, r, l),
        s = a.begin,
        u = a.end;
      /\s/.test(t.text.charAt(u - 1)) && u--;
      for (var d = null, p = null, m = 0; m < i.length; m++) {
        var y = i[m];
        if (!(y.from >= u || y.to <= s)) {
          var S = y.level != 1,
            N = jt(e, r, S ? Math.min(u, y.to) - 1 : Math.max(s, y.from)).right,
            z = N < o ? o - N + 1e9 : N - o;
          (!d || p > z) && ((d = y), (p = z));
        }
      }
      return (
        d || (d = i[i.length - 1]),
        d.from < s && (d = { from: s, to: d.to, level: d.level }),
        d.to > u && (d = { from: d.from, to: u, level: d.level }),
        d
      );
    }
    var wr;
    function Ur(e) {
      if (e.cachedTextHeight != null) return e.cachedTextHeight;
      if (wr == null) {
        wr = c("pre", null, "CodeMirror-line-like");
        for (var t = 0; t < 49; ++t)
          wr.appendChild(document.createTextNode("x")), wr.appendChild(c("br"));
        wr.appendChild(document.createTextNode("x"));
      }
      H(e.measure, wr);
      var n = wr.offsetHeight / 50;
      return n > 3 && (e.cachedTextHeight = n), T(e.measure), n || 1;
    }
    function Gr(e) {
      if (e.cachedCharWidth != null) return e.cachedCharWidth;
      var t = c("span", "xxxxxxxxxx"),
        n = c("pre", [t], "CodeMirror-line-like");
      H(e.measure, n);
      var r = t.getBoundingClientRect(),
        i = (r.right - r.left) / 10;
      return i > 2 && (e.cachedCharWidth = i), i || 10;
    }
    function Ei(e) {
      for (
        var t = e.display,
          n = {},
          r = {},
          i = t.gutters.clientLeft,
          o = t.gutters.firstChild,
          l = 0;
        o;
        o = o.nextSibling, ++l
      ) {
        var a = e.display.gutterSpecs[l].className;
        (n[a] = o.offsetLeft + o.clientLeft + i), (r[a] = o.clientWidth);
      }
      return {
        fixedPos: Ii(t),
        gutterTotalWidth: t.gutters.offsetWidth,
        gutterLeft: n,
        gutterWidth: r,
        wrapperWidth: t.wrapper.clientWidth,
      };
    }
    function Ii(e) {
      return (
        e.scroller.getBoundingClientRect().left -
        e.sizer.getBoundingClientRect().left
      );
    }
    function Vo(e) {
      var t = Ur(e.display),
        n = e.options.lineWrapping,
        r =
          n && Math.max(5, e.display.scroller.clientWidth / Gr(e.display) - 3);
      return function (i) {
        if (sr(e.doc, i)) return 0;
        var o = 0;
        if (i.widgets)
          for (var l = 0; l < i.widgets.length; l++)
            i.widgets[l].height && (o += i.widgets[l].height);
        return n ? o + (Math.ceil(i.text.length / r) || 1) * t : o + t;
      };
    }
    function Fi(e) {
      var t = e.doc,
        n = Vo(e);
      t.iter(function (r) {
        var i = n(r);
        i != r.height && Dt(r, i);
      });
    }
    function kr(e, t, n, r) {
      var i = e.display;
      if (!n && ln(t).getAttribute("cm-not-content") == "true") return null;
      var o,
        l,
        a = i.lineSpace.getBoundingClientRect();
      try {
        (o = t.clientX - a.left), (l = t.clientY - a.top);
      } catch {
        return null;
      }
      var s = zi(e, o, l),
        u;
      if (r && s.xRel > 0 && (u = U(e.doc, s.line).text).length == s.ch) {
        var d = he(u, u.length, e.options.tabSize) - u.length;
        s = k(
          s.line,
          Math.max(0, Math.round((o - Ho(e.display).left) / Gr(e.display)) - d),
        );
      }
      return s;
    }
    function Sr(e, t) {
      if (t >= e.display.viewTo || ((t -= e.display.viewFrom), t < 0))
        return null;
      for (var n = e.display.view, r = 0; r < n.length; r++)
        if (((t -= n[r].size), t < 0)) return r;
    }
    function bt(e, t, n, r) {
      t == null && (t = e.doc.first),
        n == null && (n = e.doc.first + e.doc.size),
        r || (r = 0);
      var i = e.display;
      if (
        (r &&
          n < i.viewTo &&
          (i.updateLineNumbers == null || i.updateLineNumbers > t) &&
          (i.updateLineNumbers = t),
        (e.curOp.viewChanged = !0),
        t >= i.viewTo)
      )
        Jt && Si(e.doc, t) < i.viewTo && fr(e);
      else if (n <= i.viewFrom)
        Jt && Do(e.doc, n + r) > i.viewFrom
          ? fr(e)
          : ((i.viewFrom += r), (i.viewTo += r));
      else if (t <= i.viewFrom && n >= i.viewTo) fr(e);
      else if (t <= i.viewFrom) {
        var o = Jn(e, n, n + r, 1);
        o
          ? ((i.view = i.view.slice(o.index)),
            (i.viewFrom = o.lineN),
            (i.viewTo += r))
          : fr(e);
      } else if (n >= i.viewTo) {
        var l = Jn(e, t, t, -1);
        l ? ((i.view = i.view.slice(0, l.index)), (i.viewTo = l.lineN)) : fr(e);
      } else {
        var a = Jn(e, t, t, -1),
          s = Jn(e, n, n + r, 1);
        a && s
          ? ((i.view = i.view
              .slice(0, a.index)
              .concat(jn(e, a.lineN, s.lineN))
              .concat(i.view.slice(s.index))),
            (i.viewTo += r))
          : fr(e);
      }
      var u = i.externalMeasured;
      u &&
        (n < u.lineN
          ? (u.lineN += r)
          : t < u.lineN + u.size && (i.externalMeasured = null));
    }
    function ur(e, t, n) {
      e.curOp.viewChanged = !0;
      var r = e.display,
        i = e.display.externalMeasured;
      if (
        (i &&
          t >= i.lineN &&
          t < i.lineN + i.size &&
          (r.externalMeasured = null),
        !(t < r.viewFrom || t >= r.viewTo))
      ) {
        var o = r.view[Sr(e, t)];
        if (o.node != null) {
          var l = o.changes || (o.changes = []);
          G(l, n) == -1 && l.push(n);
        }
      }
    }
    function fr(e) {
      (e.display.viewFrom = e.display.viewTo = e.doc.first),
        (e.display.view = []),
        (e.display.viewOffset = 0);
    }
    function Jn(e, t, n, r) {
      var i = Sr(e, t),
        o,
        l = e.display.view;
      if (!Jt || n == e.doc.first + e.doc.size) return { index: i, lineN: n };
      for (var a = e.display.viewFrom, s = 0; s < i; s++) a += l[s].size;
      if (a != t) {
        if (r > 0) {
          if (i == l.length - 1) return null;
          (o = a + l[i].size - t), i++;
        } else o = a - t;
        (t += o), (n += o);
      }
      for (; Si(e.doc, n) != n; ) {
        if (i == (r < 0 ? 0 : l.length - 1)) return null;
        (n += r * l[i - (r < 0 ? 1 : 0)].size), (i += r);
      }
      return { index: i, lineN: n };
    }
    function ns(e, t, n) {
      var r = e.display,
        i = r.view;
      i.length == 0 || t >= r.viewTo || n <= r.viewFrom
        ? ((r.view = jn(e, t, n)), (r.viewFrom = t))
        : (r.viewFrom > t
            ? (r.view = jn(e, t, r.viewFrom).concat(r.view))
            : r.viewFrom < t && (r.view = r.view.slice(Sr(e, t))),
          (r.viewFrom = t),
          r.viewTo < n
            ? (r.view = r.view.concat(jn(e, r.viewTo, n)))
            : r.viewTo > n && (r.view = r.view.slice(0, Sr(e, n)))),
        (r.viewTo = n);
    }
    function $o(e) {
      for (var t = e.display.view, n = 0, r = 0; r < t.length; r++) {
        var i = t[r];
        !i.hidden && (!i.node || i.changes) && ++n;
      }
      return n;
    }
    function gn(e) {
      e.display.input.showSelection(e.display.input.prepareSelection());
    }
    function el(e, t) {
      t === void 0 && (t = !0);
      var n = e.doc,
        r = {},
        i = (r.cursors = document.createDocumentFragment()),
        o = (r.selection = document.createDocumentFragment()),
        l = e.options.$customCursor;
      l && (t = !0);
      for (var a = 0; a < n.sel.ranges.length; a++)
        if (!(!t && a == n.sel.primIndex)) {
          var s = n.sel.ranges[a];
          if (
            !(
              s.from().line >= e.display.viewTo ||
              s.to().line < e.display.viewFrom
            )
          ) {
            var u = s.empty();
            if (l) {
              var d = l(e, s);
              d && Wi(e, d, i);
            } else (u || e.options.showCursorWhenSelecting) && Wi(e, s.head, i);
            u || is(e, s, o);
          }
        }
      return r;
    }
    function Wi(e, t, n) {
      var r = Bt(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
        i = n.appendChild(c("div", " ", "CodeMirror-cursor"));
      if (
        ((i.style.left = r.left + "px"),
        (i.style.top = r.top + "px"),
        (i.style.height =
          Math.max(0, r.bottom - r.top) * e.options.cursorHeight + "px"),
        /\bcm-fat-cursor\b/.test(e.getWrapperElement().className))
      ) {
        var o = Zn(e, t, "div", null, null),
          l = o.right - o.left;
        i.style.width = (l > 0 ? l : e.defaultCharWidth()) + "px";
      }
      if (r.other) {
        var a = n.appendChild(
          c("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"),
        );
        (a.style.display = ""),
          (a.style.left = r.other.left + "px"),
          (a.style.top = r.other.top + "px"),
          (a.style.height = (r.other.bottom - r.other.top) * 0.85 + "px");
      }
    }
    function Qn(e, t) {
      return e.top - t.top || e.left - t.left;
    }
    function is(e, t, n) {
      var r = e.display,
        i = e.doc,
        o = document.createDocumentFragment(),
        l = Ho(e.display),
        a = l.left,
        s = Math.max(r.sizerWidth, xr(e) - r.sizer.offsetLeft) - l.right,
        u = i.direction == "ltr";
      function d(E, B, Q, Z) {
        B < 0 && (B = 0),
          (B = Math.round(B)),
          (Z = Math.round(Z)),
          o.appendChild(
            c(
              "div",
              null,
              "CodeMirror-selected",
              "position: absolute; left: " +
                E +
                `px;
                             top: ` +
                B +
                "px; width: " +
                (Q ?? s - E) +
                `px;
                             height: ` +
                (Z - B) +
                "px",
            ),
          );
      }
      function p(E, B, Q) {
        var Z = U(i, E),
          ge = Z.text.length,
          Fe,
          it;
        function Ue(Ze, kt) {
          return Zn(e, k(E, Ze), "div", Z, kt);
        }
        function Nt(Ze, kt, at) {
          var $e = Qo(e, Z, null, Ze),
            Je = (kt == "ltr") == (at == "after") ? "left" : "right",
            Xe =
              at == "after"
                ? $e.begin
                : $e.end - (/\s/.test(Z.text.charAt($e.end - 1)) ? 2 : 1);
          return Ue(Xe, Je)[Je];
        }
        var wt = ke(Z, i.direction);
        return (
          rr(wt, B || 0, Q ?? ge, function (Ze, kt, at, $e) {
            var Je = at == "ltr",
              Xe = Ue(Ze, Je ? "left" : "right"),
              St = Ue(kt - 1, Je ? "right" : "left"),
              nn = B == null && Ze == 0,
              gr = Q == null && kt == ge,
              dt = $e == 0,
              Xt = !wt || $e == wt.length - 1;
            if (St.top - Xe.top <= 3) {
              var ot = (u ? nn : gr) && dt,
                fo = (u ? gr : nn) && Xt,
                tr = ot ? a : (Je ? Xe : St).left,
                Nr = fo ? s : (Je ? St : Xe).right;
              d(tr, Xe.top, Nr - tr, Xe.bottom);
            } else {
              var Dr, vt, on, co;
              Je
                ? ((Dr = u && nn && dt ? a : Xe.left),
                  (vt = u ? s : Nt(Ze, at, "before")),
                  (on = u ? a : Nt(kt, at, "after")),
                  (co = u && gr && Xt ? s : St.right))
                : ((Dr = u ? Nt(Ze, at, "before") : a),
                  (vt = !u && nn && dt ? s : Xe.right),
                  (on = !u && gr && Xt ? a : St.left),
                  (co = u ? Nt(kt, at, "after") : s)),
                d(Dr, Xe.top, vt - Dr, Xe.bottom),
                Xe.bottom < St.top && d(a, Xe.bottom, null, St.top),
                d(on, St.top, co - on, St.bottom);
            }
            (!Fe || Qn(Xe, Fe) < 0) && (Fe = Xe),
              Qn(St, Fe) < 0 && (Fe = St),
              (!it || Qn(Xe, it) < 0) && (it = Xe),
              Qn(St, it) < 0 && (it = St);
          }),
          { start: Fe, end: it }
        );
      }
      var m = t.from(),
        y = t.to();
      if (m.line == y.line) p(m.line, m.ch, y.ch);
      else {
        var S = U(i, m.line),
          N = U(i, y.line),
          z = Ht(S) == Ht(N),
          P = p(m.line, m.ch, z ? S.text.length + 1 : null).end,
          W = p(y.line, z ? 0 : null, y.ch).start;
        z &&
          (P.top < W.top - 2
            ? (d(P.right, P.top, null, P.bottom), d(a, W.top, W.left, W.bottom))
            : d(P.right, P.top, W.left - P.right, P.bottom)),
          P.bottom < W.top && d(a, P.bottom, null, W.top);
      }
      n.appendChild(o);
    }
    function _i(e) {
      if (e.state.focused) {
        var t = e.display;
        clearInterval(t.blinker);
        var n = !0;
        (t.cursorDiv.style.visibility = ""),
          e.options.cursorBlinkRate > 0
            ? (t.blinker = setInterval(function () {
                e.hasFocus() || qr(e),
                  (t.cursorDiv.style.visibility = (n = !n) ? "" : "hidden");
              }, e.options.cursorBlinkRate))
            : e.options.cursorBlinkRate < 0 &&
              (t.cursorDiv.style.visibility = "hidden");
      }
    }
    function tl(e) {
      e.hasFocus() || (e.display.input.focus(), e.state.focused || Bi(e));
    }
    function Hi(e) {
      (e.state.delayingBlurEvent = !0),
        setTimeout(function () {
          e.state.delayingBlurEvent &&
            ((e.state.delayingBlurEvent = !1), e.state.focused && qr(e));
        }, 100);
    }
    function Bi(e, t) {
      e.state.delayingBlurEvent &&
        !e.state.draggingText &&
        (e.state.delayingBlurEvent = !1),
        e.options.readOnly != "nocursor" &&
          (e.state.focused ||
            (Ge(e, "focus", e, t),
            (e.state.focused = !0),
            D(e.display.wrapper, "CodeMirror-focused"),
            !e.curOp &&
              e.display.selForContextMenu != e.doc.sel &&
              (e.display.input.reset(),
              _ &&
                setTimeout(function () {
                  return e.display.input.reset(!0);
                }, 20)),
            e.display.input.receivedFocus()),
          _i(e));
    }
    function qr(e, t) {
      e.state.delayingBlurEvent ||
        (e.state.focused &&
          (Ge(e, "blur", e, t),
          (e.state.focused = !1),
          me(e.display.wrapper, "CodeMirror-focused")),
        clearInterval(e.display.blinker),
        setTimeout(function () {
          e.state.focused || (e.display.shift = !1);
        }, 150));
    }
    function Vn(e) {
      for (
        var t = e.display,
          n = t.lineDiv.offsetTop,
          r = Math.max(0, t.scroller.getBoundingClientRect().top),
          i = t.lineDiv.getBoundingClientRect().top,
          o = 0,
          l = 0;
        l < t.view.length;
        l++
      ) {
        var a = t.view[l],
          s = e.options.lineWrapping,
          u = void 0,
          d = 0;
        if (!a.hidden) {
          if (((i += a.line.height), M && j < 8)) {
            var p = a.node.offsetTop + a.node.offsetHeight;
            (u = p - n), (n = p);
          } else {
            var m = a.node.getBoundingClientRect();
            (u = m.bottom - m.top),
              !s &&
                a.text.firstChild &&
                (d =
                  a.text.firstChild.getBoundingClientRect().right - m.left - 1);
          }
          var y = a.line.height - u;
          if (
            (y > 0.005 || y < -0.005) &&
            (i < r && (o -= y), Dt(a.line, u), rl(a.line), a.rest)
          )
            for (var S = 0; S < a.rest.length; S++) rl(a.rest[S]);
          if (d > e.display.sizerWidth) {
            var N = Math.ceil(d / Gr(e.display));
            N > e.display.maxLineLength &&
              ((e.display.maxLineLength = N),
              (e.display.maxLine = a.line),
              (e.display.maxLineChanged = !0));
          }
        }
      }
      Math.abs(o) > 2 && (t.scroller.scrollTop += o);
    }
    function rl(e) {
      if (e.widgets)
        for (var t = 0; t < e.widgets.length; ++t) {
          var n = e.widgets[t],
            r = n.node.parentNode;
          r && (n.height = r.offsetHeight);
        }
    }
    function $n(e, t, n) {
      var r = n && n.top != null ? Math.max(0, n.top) : e.scroller.scrollTop;
      r = Math.floor(r - Xn(e));
      var i = n && n.bottom != null ? n.bottom : r + e.wrapper.clientHeight,
        o = h(t, r),
        l = h(t, i);
      if (n && n.ensure) {
        var a = n.ensure.from.line,
          s = n.ensure.to.line;
        a < o
          ? ((o = a), (l = h(t, Qt(U(t, a)) + e.wrapper.clientHeight)))
          : Math.min(s, t.lastLine()) >= l &&
            ((o = h(t, Qt(U(t, s)) - e.wrapper.clientHeight)), (l = s));
      }
      return { from: o, to: Math.max(l, o + 1) };
    }
    function os(e, t) {
      if (!qe(e, "scrollCursorIntoView")) {
        var n = e.display,
          r = n.sizer.getBoundingClientRect(),
          i = null,
          o = n.wrapper.ownerDocument;
        if (
          (t.top + r.top < 0
            ? (i = !0)
            : t.bottom + r.top >
                (o.defaultView.innerHeight || o.documentElement.clientHeight) &&
              (i = !1),
          i != null && !Oe)
        ) {
          var l = c(
            "div",
            "​",
            null,
            `position: absolute;
                         top: ` +
              (t.top - n.viewOffset - Xn(e.display)) +
              `px;
                         height: ` +
              (t.bottom - t.top + qt(e) + n.barHeight) +
              `px;
                         left: ` +
              t.left +
              "px; width: " +
              Math.max(2, t.right - t.left) +
              "px;",
          );
          e.display.lineSpace.appendChild(l),
            l.scrollIntoView(i),
            e.display.lineSpace.removeChild(l);
        }
      }
    }
    function ls(e, t, n, r) {
      r == null && (r = 0);
      var i;
      !e.options.lineWrapping &&
        t == n &&
        ((n = t.sticky == "before" ? k(t.line, t.ch + 1, "before") : t),
        (t = t.ch
          ? k(t.line, t.sticky == "before" ? t.ch - 1 : t.ch, "after")
          : t));
      for (var o = 0; o < 5; o++) {
        var l = !1,
          a = Bt(e, t),
          s = !n || n == t ? a : Bt(e, n);
        i = {
          left: Math.min(a.left, s.left),
          top: Math.min(a.top, s.top) - r,
          right: Math.max(a.left, s.left),
          bottom: Math.max(a.bottom, s.bottom) + r,
        };
        var u = Ri(e, i),
          d = e.doc.scrollTop,
          p = e.doc.scrollLeft;
        if (
          (u.scrollTop != null &&
            (mn(e, u.scrollTop), Math.abs(e.doc.scrollTop - d) > 1 && (l = !0)),
          u.scrollLeft != null &&
            (Cr(e, u.scrollLeft),
            Math.abs(e.doc.scrollLeft - p) > 1 && (l = !0)),
          !l)
        )
          break;
      }
      return i;
    }
    function as(e, t) {
      var n = Ri(e, t);
      n.scrollTop != null && mn(e, n.scrollTop),
        n.scrollLeft != null && Cr(e, n.scrollLeft);
    }
    function Ri(e, t) {
      var n = e.display,
        r = Ur(e.display);
      t.top < 0 && (t.top = 0);
      var i =
          e.curOp && e.curOp.scrollTop != null
            ? e.curOp.scrollTop
            : n.scroller.scrollTop,
        o = Ni(e),
        l = {};
      t.bottom - t.top > o && (t.bottom = t.top + o);
      var a = e.doc.height + Mi(n),
        s = t.top < r,
        u = t.bottom > a - r;
      if (t.top < i) l.scrollTop = s ? 0 : t.top;
      else if (t.bottom > i + o) {
        var d = Math.min(t.top, (u ? a : t.bottom) - o);
        d != i && (l.scrollTop = d);
      }
      var p = e.options.fixedGutter ? 0 : n.gutters.offsetWidth,
        m =
          e.curOp && e.curOp.scrollLeft != null
            ? e.curOp.scrollLeft
            : n.scroller.scrollLeft - p,
        y = xr(e) - n.gutters.offsetWidth,
        S = t.right - t.left > y;
      return (
        S && (t.right = t.left + y),
        t.left < 10
          ? (l.scrollLeft = 0)
          : t.left < m
            ? (l.scrollLeft = Math.max(0, t.left + p - (S ? 0 : 10)))
            : t.right > y + m - 3 &&
              (l.scrollLeft = t.right + (S ? 0 : 10) - y),
        l
      );
    }
    function Ki(e, t) {
      t != null &&
        (ei(e),
        (e.curOp.scrollTop =
          (e.curOp.scrollTop == null ? e.doc.scrollTop : e.curOp.scrollTop) +
          t));
    }
    function jr(e) {
      ei(e);
      var t = e.getCursor();
      e.curOp.scrollToPos = {
        from: t,
        to: t,
        margin: e.options.cursorScrollMargin,
      };
    }
    function yn(e, t, n) {
      (t != null || n != null) && ei(e),
        t != null && (e.curOp.scrollLeft = t),
        n != null && (e.curOp.scrollTop = n);
    }
    function ss(e, t) {
      ei(e), (e.curOp.scrollToPos = t);
    }
    function ei(e) {
      var t = e.curOp.scrollToPos;
      if (t) {
        e.curOp.scrollToPos = null;
        var n = Zo(e, t.from),
          r = Zo(e, t.to);
        nl(e, n, r, t.margin);
      }
    }
    function nl(e, t, n, r) {
      var i = Ri(e, {
        left: Math.min(t.left, n.left),
        top: Math.min(t.top, n.top) - r,
        right: Math.max(t.right, n.right),
        bottom: Math.max(t.bottom, n.bottom) + r,
      });
      yn(e, i.scrollLeft, i.scrollTop);
    }
    function mn(e, t) {
      Math.abs(e.doc.scrollTop - t) < 2 ||
        (Se || Gi(e, { top: t }), il(e, t, !0), Se && Gi(e), wn(e, 100));
    }
    function il(e, t, n) {
      (t = Math.max(
        0,
        Math.min(
          e.display.scroller.scrollHeight - e.display.scroller.clientHeight,
          t,
        ),
      )),
        !(e.display.scroller.scrollTop == t && !n) &&
          ((e.doc.scrollTop = t),
          e.display.scrollbars.setScrollTop(t),
          e.display.scroller.scrollTop != t &&
            (e.display.scroller.scrollTop = t));
    }
    function Cr(e, t, n, r) {
      (t = Math.max(
        0,
        Math.min(
          t,
          e.display.scroller.scrollWidth - e.display.scroller.clientWidth,
        ),
      )),
        !(
          (n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !r
        ) &&
          ((e.doc.scrollLeft = t),
          ul(e),
          e.display.scroller.scrollLeft != t &&
            (e.display.scroller.scrollLeft = t),
          e.display.scrollbars.setScrollLeft(t));
    }
    function bn(e) {
      var t = e.display,
        n = t.gutters.offsetWidth,
        r = Math.round(e.doc.height + Mi(e.display));
      return {
        clientHeight: t.scroller.clientHeight,
        viewHeight: t.wrapper.clientHeight,
        scrollWidth: t.scroller.scrollWidth,
        clientWidth: t.scroller.clientWidth,
        viewWidth: t.wrapper.clientWidth,
        barLeft: e.options.fixedGutter ? n : 0,
        docHeight: r,
        scrollHeight: r + qt(e) + t.barHeight,
        nativeBarWidth: t.nativeBarWidth,
        gutterWidth: n,
      };
    }
    var Tr = function (e, t, n) {
      this.cm = n;
      var r = (this.vert = c(
          "div",
          [c("div", null, null, "min-width: 1px")],
          "CodeMirror-vscrollbar",
        )),
        i = (this.horiz = c(
          "div",
          [c("div", null, null, "height: 100%; min-height: 1px")],
          "CodeMirror-hscrollbar",
        ));
      (r.tabIndex = i.tabIndex = -1),
        e(r),
        e(i),
        J(r, "scroll", function () {
          r.clientHeight && t(r.scrollTop, "vertical");
        }),
        J(i, "scroll", function () {
          i.clientWidth && t(i.scrollLeft, "horizontal");
        }),
        (this.checkedZeroWidth = !1),
        M &&
          j < 8 &&
          (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
    };
    (Tr.prototype.update = function (e) {
      var t = e.scrollWidth > e.clientWidth + 1,
        n = e.scrollHeight > e.clientHeight + 1,
        r = e.nativeBarWidth;
      if (n) {
        (this.vert.style.display = "block"),
          (this.vert.style.bottom = t ? r + "px" : "0");
        var i = e.viewHeight - (t ? r : 0);
        this.vert.firstChild.style.height =
          Math.max(0, e.scrollHeight - e.clientHeight + i) + "px";
      } else
        (this.vert.scrollTop = 0),
          (this.vert.style.display = ""),
          (this.vert.firstChild.style.height = "0");
      if (t) {
        (this.horiz.style.display = "block"),
          (this.horiz.style.right = n ? r + "px" : "0"),
          (this.horiz.style.left = e.barLeft + "px");
        var o = e.viewWidth - e.barLeft - (n ? r : 0);
        this.horiz.firstChild.style.width =
          Math.max(0, e.scrollWidth - e.clientWidth + o) + "px";
      } else
        (this.horiz.style.display = ""),
          (this.horiz.firstChild.style.width = "0");
      return (
        !this.checkedZeroWidth &&
          e.clientHeight > 0 &&
          (r == 0 && this.zeroWidthHack(), (this.checkedZeroWidth = !0)),
        { right: n ? r : 0, bottom: t ? r : 0 }
      );
    }),
      (Tr.prototype.setScrollLeft = function (e) {
        this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e),
          this.disableHoriz &&
            this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
      }),
      (Tr.prototype.setScrollTop = function (e) {
        this.vert.scrollTop != e && (this.vert.scrollTop = e),
          this.disableVert &&
            this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
      }),
      (Tr.prototype.zeroWidthHack = function () {
        var e = xe && !Te ? "12px" : "18px";
        (this.horiz.style.height = this.vert.style.width = e),
          (this.horiz.style.visibility = this.vert.style.visibility = "hidden"),
          (this.disableHoriz = new ue()),
          (this.disableVert = new ue());
      }),
      (Tr.prototype.enableZeroWidthBar = function (e, t, n) {
        e.style.visibility = "";
        function r() {
          var i = e.getBoundingClientRect(),
            o =
              n == "vert"
                ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2)
                : document.elementFromPoint(
                    (i.right + i.left) / 2,
                    i.bottom - 1,
                  );
          o != e ? (e.style.visibility = "hidden") : t.set(1e3, r);
        }
        t.set(1e3, r);
      }),
      (Tr.prototype.clear = function () {
        var e = this.horiz.parentNode;
        e.removeChild(this.horiz), e.removeChild(this.vert);
      });
    var xn = function () {};
    (xn.prototype.update = function () {
      return { bottom: 0, right: 0 };
    }),
      (xn.prototype.setScrollLeft = function () {}),
      (xn.prototype.setScrollTop = function () {}),
      (xn.prototype.clear = function () {});
    function Xr(e, t) {
      t || (t = bn(e));
      var n = e.display.barWidth,
        r = e.display.barHeight;
      ol(e, t);
      for (
        var i = 0;
        (i < 4 && n != e.display.barWidth) || r != e.display.barHeight;
        i++
      )
        n != e.display.barWidth && e.options.lineWrapping && Vn(e),
          ol(e, bn(e)),
          (n = e.display.barWidth),
          (r = e.display.barHeight);
    }
    function ol(e, t) {
      var n = e.display,
        r = n.scrollbars.update(t);
      (n.sizer.style.paddingRight = (n.barWidth = r.right) + "px"),
        (n.sizer.style.paddingBottom = (n.barHeight = r.bottom) + "px"),
        (n.heightForcer.style.borderBottom = r.bottom + "px solid transparent"),
        r.right && r.bottom
          ? ((n.scrollbarFiller.style.display = "block"),
            (n.scrollbarFiller.style.height = r.bottom + "px"),
            (n.scrollbarFiller.style.width = r.right + "px"))
          : (n.scrollbarFiller.style.display = ""),
        r.bottom &&
        e.options.coverGutterNextToScrollbar &&
        e.options.fixedGutter
          ? ((n.gutterFiller.style.display = "block"),
            (n.gutterFiller.style.height = r.bottom + "px"),
            (n.gutterFiller.style.width = t.gutterWidth + "px"))
          : (n.gutterFiller.style.display = "");
    }
    var ll = { native: Tr, null: xn };
    function al(e) {
      e.display.scrollbars &&
        (e.display.scrollbars.clear(),
        e.display.scrollbars.addClass &&
          me(e.display.wrapper, e.display.scrollbars.addClass)),
        (e.display.scrollbars = new ll[e.options.scrollbarStyle](
          function (t) {
            e.display.wrapper.insertBefore(t, e.display.scrollbarFiller),
              J(t, "mousedown", function () {
                e.state.focused &&
                  setTimeout(function () {
                    return e.display.input.focus();
                  }, 0);
              }),
              t.setAttribute("cm-not-content", "true");
          },
          function (t, n) {
            n == "horizontal" ? Cr(e, t) : mn(e, t);
          },
          e,
        )),
        e.display.scrollbars.addClass &&
          D(e.display.wrapper, e.display.scrollbars.addClass);
    }
    var us = 0;
    function Lr(e) {
      (e.curOp = {
        cm: e,
        viewChanged: !1,
        startHeight: e.doc.height,
        forceUpdate: !1,
        updateInput: 0,
        typing: !1,
        changeObjs: null,
        cursorActivityHandlers: null,
        cursorActivityCalled: 0,
        selectionChanged: !1,
        updateMaxLine: !1,
        scrollLeft: null,
        scrollTop: null,
        scrollToPos: null,
        focus: !1,
        id: ++us,
        markArrays: null,
      }),
        Ba(e.curOp);
    }
    function Mr(e) {
      var t = e.curOp;
      t &&
        Ka(t, function (n) {
          for (var r = 0; r < n.ops.length; r++) n.ops[r].cm.curOp = null;
          fs(n);
        });
    }
    function fs(e) {
      for (var t = e.ops, n = 0; n < t.length; n++) cs(t[n]);
      for (var r = 0; r < t.length; r++) ds(t[r]);
      for (var i = 0; i < t.length; i++) hs(t[i]);
      for (var o = 0; o < t.length; o++) ps(t[o]);
      for (var l = 0; l < t.length; l++) vs(t[l]);
    }
    function cs(e) {
      var t = e.cm,
        n = t.display;
      ys(t),
        e.updateMaxLine && Ti(t),
        (e.mustUpdate =
          e.viewChanged ||
          e.forceUpdate ||
          e.scrollTop != null ||
          (e.scrollToPos &&
            (e.scrollToPos.from.line < n.viewFrom ||
              e.scrollToPos.to.line >= n.viewTo)) ||
          (n.maxLineChanged && t.options.lineWrapping)),
        (e.update =
          e.mustUpdate &&
          new ti(
            t,
            e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos },
            e.forceUpdate,
          ));
    }
    function ds(e) {
      e.updatedDisplay = e.mustUpdate && Ui(e.cm, e.update);
    }
    function hs(e) {
      var t = e.cm,
        n = t.display;
      e.updatedDisplay && Vn(t),
        (e.barMeasure = bn(t)),
        n.maxLineChanged &&
          !t.options.lineWrapping &&
          ((e.adjustWidthTo = Ro(t, n.maxLine, n.maxLine.text.length).left + 3),
          (t.display.sizerWidth = e.adjustWidthTo),
          (e.barMeasure.scrollWidth = Math.max(
            n.scroller.clientWidth,
            n.sizer.offsetLeft + e.adjustWidthTo + qt(t) + t.display.barWidth,
          )),
          (e.maxScrollLeft = Math.max(
            0,
            n.sizer.offsetLeft + e.adjustWidthTo - xr(t),
          ))),
        (e.updatedDisplay || e.selectionChanged) &&
          (e.preparedSelection = n.input.prepareSelection());
    }
    function ps(e) {
      var t = e.cm;
      e.adjustWidthTo != null &&
        ((t.display.sizer.style.minWidth = e.adjustWidthTo + "px"),
        e.maxScrollLeft < t.doc.scrollLeft &&
          Cr(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0),
        (t.display.maxLineChanged = !1));
      var n = e.focus && e.focus == g(Re(t));
      e.preparedSelection &&
        t.display.input.showSelection(e.preparedSelection, n),
        (e.updatedDisplay || e.startHeight != t.doc.height) &&
          Xr(t, e.barMeasure),
        e.updatedDisplay && ji(t, e.barMeasure),
        e.selectionChanged && _i(t),
        t.state.focused && e.updateInput && t.display.input.reset(e.typing),
        n && tl(e.cm);
    }
    function vs(e) {
      var t = e.cm,
        n = t.display,
        r = t.doc;
      if (
        (e.updatedDisplay && sl(t, e.update),
        n.wheelStartX != null &&
          (e.scrollTop != null || e.scrollLeft != null || e.scrollToPos) &&
          (n.wheelStartX = n.wheelStartY = null),
        e.scrollTop != null && il(t, e.scrollTop, e.forceScroll),
        e.scrollLeft != null && Cr(t, e.scrollLeft, !0, !0),
        e.scrollToPos)
      ) {
        var i = ls(
          t,
          fe(r, e.scrollToPos.from),
          fe(r, e.scrollToPos.to),
          e.scrollToPos.margin,
        );
        os(t, i);
      }
      var o = e.maybeHiddenMarkers,
        l = e.maybeUnhiddenMarkers;
      if (o)
        for (var a = 0; a < o.length; ++a)
          o[a].lines.length || Ge(o[a], "hide");
      if (l)
        for (var s = 0; s < l.length; ++s)
          l[s].lines.length && Ge(l[s], "unhide");
      n.wrapper.offsetHeight && (r.scrollTop = t.display.scroller.scrollTop),
        e.changeObjs && Ge(t, "changes", t, e.changeObjs),
        e.update && e.update.finish();
    }
    function Mt(e, t) {
      if (e.curOp) return t();
      Lr(e);
      try {
        return t();
      } finally {
        Mr(e);
      }
    }
    function rt(e, t) {
      return function () {
        if (e.curOp) return t.apply(e, arguments);
        Lr(e);
        try {
          return t.apply(e, arguments);
        } finally {
          Mr(e);
        }
      };
    }
    function pt(e) {
      return function () {
        if (this.curOp) return e.apply(this, arguments);
        Lr(this);
        try {
          return e.apply(this, arguments);
        } finally {
          Mr(this);
        }
      };
    }
    function nt(e) {
      return function () {
        var t = this.cm;
        if (!t || t.curOp) return e.apply(this, arguments);
        Lr(t);
        try {
          return e.apply(this, arguments);
        } finally {
          Mr(t);
        }
      };
    }
    function wn(e, t) {
      e.doc.highlightFrontier < e.display.viewTo &&
        e.state.highlight.set(t, te(gs, e));
    }
    function gs(e) {
      var t = e.doc;
      if (!(t.highlightFrontier >= e.display.viewTo)) {
        var n = +new Date() + e.options.workTime,
          r = fn(e, t.highlightFrontier),
          i = [];
        t.iter(
          r.line,
          Math.min(t.first + t.size, e.display.viewTo + 500),
          function (o) {
            if (r.line >= e.display.viewFrom) {
              var l = o.styles,
                a =
                  o.text.length > e.options.maxHighlightLength
                    ? Ut(t.mode, r.state)
                    : null,
                s = vo(e, o, r, !0);
              a && (r.state = a), (o.styles = s.styles);
              var u = o.styleClasses,
                d = s.classes;
              d ? (o.styleClasses = d) : u && (o.styleClasses = null);
              for (
                var p =
                    !l ||
                    l.length != o.styles.length ||
                    (u != d &&
                      (!u ||
                        !d ||
                        u.bgClass != d.bgClass ||
                        u.textClass != d.textClass)),
                  m = 0;
                !p && m < l.length;
                ++m
              )
                p = l[m] != o.styles[m];
              p && i.push(r.line), (o.stateAfter = r.save()), r.nextLine();
            } else
              o.text.length <= e.options.maxHighlightLength && bi(e, o.text, r),
                (o.stateAfter = r.line % 5 == 0 ? r.save() : null),
                r.nextLine();
            if (+new Date() > n) return wn(e, e.options.workDelay), !0;
          },
        ),
          (t.highlightFrontier = r.line),
          (t.modeFrontier = Math.max(t.modeFrontier, r.line)),
          i.length &&
            Mt(e, function () {
              for (var o = 0; o < i.length; o++) ur(e, i[o], "text");
            });
      }
    }
    var ti = function (e, t, n) {
      var r = e.display;
      (this.viewport = t),
        (this.visible = $n(r, e.doc, t)),
        (this.editorIsHidden = !r.wrapper.offsetWidth),
        (this.wrapperHeight = r.wrapper.clientHeight),
        (this.wrapperWidth = r.wrapper.clientWidth),
        (this.oldDisplayWidth = xr(e)),
        (this.force = n),
        (this.dims = Ei(e)),
        (this.events = []);
    };
    (ti.prototype.signal = function (e, t) {
      Lt(e, t) && this.events.push(arguments);
    }),
      (ti.prototype.finish = function () {
        for (var e = 0; e < this.events.length; e++)
          Ge.apply(null, this.events[e]);
      });
    function ys(e) {
      var t = e.display;
      !t.scrollbarsClipped &&
        t.scroller.offsetWidth &&
        ((t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth),
        (t.heightForcer.style.height = qt(e) + "px"),
        (t.sizer.style.marginBottom = -t.nativeBarWidth + "px"),
        (t.sizer.style.borderRightWidth = qt(e) + "px"),
        (t.scrollbarsClipped = !0));
    }
    function ms(e) {
      if (e.hasFocus()) return null;
      var t = g(Re(e));
      if (!t || !v(e.display.lineDiv, t)) return null;
      var n = { activeElt: t };
      if (window.getSelection) {
        var r = le(e).getSelection();
        r.anchorNode &&
          r.extend &&
          v(e.display.lineDiv, r.anchorNode) &&
          ((n.anchorNode = r.anchorNode),
          (n.anchorOffset = r.anchorOffset),
          (n.focusNode = r.focusNode),
          (n.focusOffset = r.focusOffset));
      }
      return n;
    }
    function bs(e) {
      if (
        !(!e || !e.activeElt || e.activeElt == g(ze(e.activeElt))) &&
        (e.activeElt.focus(),
        !/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName) &&
          e.anchorNode &&
          v(document.body, e.anchorNode) &&
          v(document.body, e.focusNode))
      ) {
        var t = e.activeElt.ownerDocument,
          n = t.defaultView.getSelection(),
          r = t.createRange();
        r.setEnd(e.anchorNode, e.anchorOffset),
          r.collapse(!1),
          n.removeAllRanges(),
          n.addRange(r),
          n.extend(e.focusNode, e.focusOffset);
      }
    }
    function Ui(e, t) {
      var n = e.display,
        r = e.doc;
      if (t.editorIsHidden) return fr(e), !1;
      if (
        !t.force &&
        t.visible.from >= n.viewFrom &&
        t.visible.to <= n.viewTo &&
        (n.updateLineNumbers == null || n.updateLineNumbers >= n.viewTo) &&
        n.renderedView == n.view &&
        $o(e) == 0
      )
        return !1;
      fl(e) && (fr(e), (t.dims = Ei(e)));
      var i = r.first + r.size,
        o = Math.max(t.visible.from - e.options.viewportMargin, r.first),
        l = Math.min(i, t.visible.to + e.options.viewportMargin);
      n.viewFrom < o &&
        o - n.viewFrom < 20 &&
        (o = Math.max(r.first, n.viewFrom)),
        n.viewTo > l && n.viewTo - l < 20 && (l = Math.min(i, n.viewTo)),
        Jt && ((o = Si(e.doc, o)), (l = Do(e.doc, l)));
      var a =
        o != n.viewFrom ||
        l != n.viewTo ||
        n.lastWrapHeight != t.wrapperHeight ||
        n.lastWrapWidth != t.wrapperWidth;
      ns(e, o, l),
        (n.viewOffset = Qt(U(e.doc, n.viewFrom))),
        (e.display.mover.style.top = n.viewOffset + "px");
      var s = $o(e);
      if (
        !a &&
        s == 0 &&
        !t.force &&
        n.renderedView == n.view &&
        (n.updateLineNumbers == null || n.updateLineNumbers >= n.viewTo)
      )
        return !1;
      var u = ms(e);
      return (
        s > 4 && (n.lineDiv.style.display = "none"),
        xs(e, n.updateLineNumbers, t.dims),
        s > 4 && (n.lineDiv.style.display = ""),
        (n.renderedView = n.view),
        bs(u),
        T(n.cursorDiv),
        T(n.selectionDiv),
        (n.gutters.style.height = n.sizer.style.minHeight = 0),
        a &&
          ((n.lastWrapHeight = t.wrapperHeight),
          (n.lastWrapWidth = t.wrapperWidth),
          wn(e, 400)),
        (n.updateLineNumbers = null),
        !0
      );
    }
    function sl(e, t) {
      for (var n = t.viewport, r = !0; ; r = !1) {
        if (!r || !e.options.lineWrapping || t.oldDisplayWidth == xr(e)) {
          if (
            (n &&
              n.top != null &&
              (n = {
                top: Math.min(e.doc.height + Mi(e.display) - Ni(e), n.top),
              }),
            (t.visible = $n(e.display, e.doc, n)),
            t.visible.from >= e.display.viewFrom &&
              t.visible.to <= e.display.viewTo)
          )
            break;
        } else r && (t.visible = $n(e.display, e.doc, n));
        if (!Ui(e, t)) break;
        Vn(e);
        var i = bn(e);
        gn(e), Xr(e, i), ji(e, i), (t.force = !1);
      }
      t.signal(e, "update", e),
        (e.display.viewFrom != e.display.reportedViewFrom ||
          e.display.viewTo != e.display.reportedViewTo) &&
          (t.signal(
            e,
            "viewportChange",
            e,
            e.display.viewFrom,
            e.display.viewTo,
          ),
          (e.display.reportedViewFrom = e.display.viewFrom),
          (e.display.reportedViewTo = e.display.viewTo));
    }
    function Gi(e, t) {
      var n = new ti(e, t);
      if (Ui(e, n)) {
        Vn(e), sl(e, n);
        var r = bn(e);
        gn(e), Xr(e, r), ji(e, r), n.finish();
      }
    }
    function xs(e, t, n) {
      var r = e.display,
        i = e.options.lineNumbers,
        o = r.lineDiv,
        l = o.firstChild;
      function a(S) {
        var N = S.nextSibling;
        return (
          _ && xe && e.display.currentWheelTarget == S
            ? (S.style.display = "none")
            : S.parentNode.removeChild(S),
          N
        );
      }
      for (var s = r.view, u = r.viewFrom, d = 0; d < s.length; d++) {
        var p = s[d];
        if (!p.hidden)
          if (!p.node || p.node.parentNode != o) {
            var m = Xa(e, p, u, n);
            o.insertBefore(m, l);
          } else {
            for (; l != p.node; ) l = a(l);
            var y = i && t != null && t <= u && p.lineNumber;
            p.changes &&
              (G(p.changes, "gutter") > -1 && (y = !1), Eo(e, p, u, n)),
              y &&
                (T(p.lineNumber),
                p.lineNumber.appendChild(
                  document.createTextNode(O(e.options, u)),
                )),
              (l = p.node.nextSibling);
          }
        u += p.size;
      }
      for (; l; ) l = a(l);
    }
    function qi(e) {
      var t = e.gutters.offsetWidth;
      (e.sizer.style.marginLeft = t + "px"), tt(e, "gutterChanged", e);
    }
    function ji(e, t) {
      (e.display.sizer.style.minHeight = t.docHeight + "px"),
        (e.display.heightForcer.style.top = t.docHeight + "px"),
        (e.display.gutters.style.height =
          t.docHeight + e.display.barHeight + qt(e) + "px");
    }
    function ul(e) {
      var t = e.display,
        n = t.view;
      if (
        !(!t.alignWidgets && (!t.gutters.firstChild || !e.options.fixedGutter))
      ) {
        for (
          var r = Ii(t) - t.scroller.scrollLeft + e.doc.scrollLeft,
            i = t.gutters.offsetWidth,
            o = r + "px",
            l = 0;
          l < n.length;
          l++
        )
          if (!n[l].hidden) {
            e.options.fixedGutter &&
              (n[l].gutter && (n[l].gutter.style.left = o),
              n[l].gutterBackground && (n[l].gutterBackground.style.left = o));
            var a = n[l].alignable;
            if (a) for (var s = 0; s < a.length; s++) a[s].style.left = o;
          }
        e.options.fixedGutter && (t.gutters.style.left = r + i + "px");
      }
    }
    function fl(e) {
      if (!e.options.lineNumbers) return !1;
      var t = e.doc,
        n = O(e.options, t.first + t.size - 1),
        r = e.display;
      if (n.length != r.lineNumChars) {
        var i = r.measure.appendChild(
            c(
              "div",
              [c("div", n)],
              "CodeMirror-linenumber CodeMirror-gutter-elt",
            ),
          ),
          o = i.firstChild.offsetWidth,
          l = i.offsetWidth - o;
        return (
          (r.lineGutter.style.width = ""),
          (r.lineNumInnerWidth = Math.max(o, r.lineGutter.offsetWidth - l) + 1),
          (r.lineNumWidth = r.lineNumInnerWidth + l),
          (r.lineNumChars = r.lineNumInnerWidth ? n.length : -1),
          (r.lineGutter.style.width = r.lineNumWidth + "px"),
          qi(e.display),
          !0
        );
      }
      return !1;
    }
    function Xi(e, t) {
      for (var n = [], r = !1, i = 0; i < e.length; i++) {
        var o = e[i],
          l = null;
        if (
          (typeof o != "string" && ((l = o.style), (o = o.className)),
          o == "CodeMirror-linenumbers")
        )
          if (t) r = !0;
          else continue;
        n.push({ className: o, style: l });
      }
      return (
        t && !r && n.push({ className: "CodeMirror-linenumbers", style: null }),
        n
      );
    }
    function cl(e) {
      var t = e.gutters,
        n = e.gutterSpecs;
      T(t), (e.lineGutter = null);
      for (var r = 0; r < n.length; ++r) {
        var i = n[r],
          o = i.className,
          l = i.style,
          a = t.appendChild(c("div", null, "CodeMirror-gutter " + o));
        l && (a.style.cssText = l),
          o == "CodeMirror-linenumbers" &&
            ((e.lineGutter = a),
            (a.style.width = (e.lineNumWidth || 1) + "px"));
      }
      (t.style.display = n.length ? "" : "none"), qi(e);
    }
    function kn(e) {
      cl(e.display), bt(e), ul(e);
    }
    function ws(e, t, n, r) {
      var i = this;
      (this.input = n),
        (i.scrollbarFiller = c("div", null, "CodeMirror-scrollbar-filler")),
        i.scrollbarFiller.setAttribute("cm-not-content", "true"),
        (i.gutterFiller = c("div", null, "CodeMirror-gutter-filler")),
        i.gutterFiller.setAttribute("cm-not-content", "true"),
        (i.lineDiv = x("div", null, "CodeMirror-code")),
        (i.selectionDiv = c(
          "div",
          null,
          null,
          "position: relative; z-index: 1",
        )),
        (i.cursorDiv = c("div", null, "CodeMirror-cursors")),
        (i.measure = c("div", null, "CodeMirror-measure")),
        (i.lineMeasure = c("div", null, "CodeMirror-measure")),
        (i.lineSpace = x(
          "div",
          [i.measure, i.lineMeasure, i.selectionDiv, i.cursorDiv, i.lineDiv],
          null,
          "position: relative; outline: none",
        ));
      var o = x("div", [i.lineSpace], "CodeMirror-lines");
      (i.mover = c("div", [o], null, "position: relative")),
        (i.sizer = c("div", [i.mover], "CodeMirror-sizer")),
        (i.sizerWidth = null),
        (i.heightForcer = c(
          "div",
          null,
          null,
          "position: absolute; height: " + Ve + "px; width: 1px;",
        )),
        (i.gutters = c("div", null, "CodeMirror-gutters")),
        (i.lineGutter = null),
        (i.scroller = c(
          "div",
          [i.sizer, i.heightForcer, i.gutters],
          "CodeMirror-scroll",
        )),
        i.scroller.setAttribute("tabIndex", "-1"),
        (i.wrapper = c(
          "div",
          [i.scrollbarFiller, i.gutterFiller, i.scroller],
          "CodeMirror",
        )),
        q && se >= 105 && (i.wrapper.style.clipPath = "inset(0px)"),
        i.wrapper.setAttribute("translate", "no"),
        M &&
          j < 8 &&
          ((i.gutters.style.zIndex = -1), (i.scroller.style.paddingRight = 0)),
        !_ && !(Se && oe) && (i.scroller.draggable = !0),
        e && (e.appendChild ? e.appendChild(i.wrapper) : e(i.wrapper)),
        (i.viewFrom = i.viewTo = t.first),
        (i.reportedViewFrom = i.reportedViewTo = t.first),
        (i.view = []),
        (i.renderedView = null),
        (i.externalMeasured = null),
        (i.viewOffset = 0),
        (i.lastWrapHeight = i.lastWrapWidth = 0),
        (i.updateLineNumbers = null),
        (i.nativeBarWidth = i.barHeight = i.barWidth = 0),
        (i.scrollbarsClipped = !1),
        (i.lineNumWidth = i.lineNumInnerWidth = i.lineNumChars = null),
        (i.alignWidgets = !1),
        (i.cachedCharWidth = i.cachedTextHeight = i.cachedPaddingH = null),
        (i.maxLine = null),
        (i.maxLineLength = 0),
        (i.maxLineChanged = !1),
        (i.wheelDX = i.wheelDY = i.wheelStartX = i.wheelStartY = null),
        (i.shift = !1),
        (i.selForContextMenu = null),
        (i.activeTouch = null),
        (i.gutterSpecs = Xi(r.gutters, r.lineNumbers)),
        cl(i),
        n.init(i);
    }
    var ri = 0,
      $t = null;
    M ? ($t = -0.53) : Se ? ($t = 15) : q ? ($t = -0.7) : Ie && ($t = -1 / 3);
    function dl(e) {
      var t = e.wheelDeltaX,
        n = e.wheelDeltaY;
      return (
        t == null && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail),
        n == null && e.detail && e.axis == e.VERTICAL_AXIS
          ? (n = e.detail)
          : n == null && (n = e.wheelDelta),
        { x: t, y: n }
      );
    }
    function ks(e) {
      var t = dl(e);
      return (t.x *= $t), (t.y *= $t), t;
    }
    function hl(e, t) {
      q &&
        se == 102 &&
        (e.display.chromeScrollHack == null
          ? (e.display.sizer.style.pointerEvents = "none")
          : clearTimeout(e.display.chromeScrollHack),
        (e.display.chromeScrollHack = setTimeout(function () {
          (e.display.chromeScrollHack = null),
            (e.display.sizer.style.pointerEvents = "");
        }, 100)));
      var n = dl(t),
        r = n.x,
        i = n.y,
        o = $t;
      t.deltaMode === 0 && ((r = t.deltaX), (i = t.deltaY), (o = 1));
      var l = e.display,
        a = l.scroller,
        s = a.scrollWidth > a.clientWidth,
        u = a.scrollHeight > a.clientHeight;
      if ((r && s) || (i && u)) {
        if (i && xe && _) {
          e: for (var d = t.target, p = l.view; d != a; d = d.parentNode)
            for (var m = 0; m < p.length; m++)
              if (p[m].node == d) {
                e.display.currentWheelTarget = d;
                break e;
              }
        }
        if (r && !Se && !ce && o != null) {
          i && u && mn(e, Math.max(0, a.scrollTop + i * o)),
            Cr(e, Math.max(0, a.scrollLeft + r * o)),
            (!i || (i && u)) && ft(t),
            (l.wheelStartX = null);
          return;
        }
        if (i && o != null) {
          var y = i * o,
            S = e.doc.scrollTop,
            N = S + l.wrapper.clientHeight;
          y < 0
            ? (S = Math.max(0, S + y - 50))
            : (N = Math.min(e.doc.height, N + y + 50)),
            Gi(e, { top: S, bottom: N });
        }
        ri < 20 &&
          t.deltaMode !== 0 &&
          (l.wheelStartX == null
            ? ((l.wheelStartX = a.scrollLeft),
              (l.wheelStartY = a.scrollTop),
              (l.wheelDX = r),
              (l.wheelDY = i),
              setTimeout(function () {
                if (l.wheelStartX != null) {
                  var z = a.scrollLeft - l.wheelStartX,
                    P = a.scrollTop - l.wheelStartY,
                    W =
                      (P && l.wheelDY && P / l.wheelDY) ||
                      (z && l.wheelDX && z / l.wheelDX);
                  (l.wheelStartX = l.wheelStartY = null),
                    W && (($t = ($t * ri + W) / (ri + 1)), ++ri);
                }
              }, 200))
            : ((l.wheelDX += r), (l.wheelDY += i)));
      }
    }
    var At = function (e, t) {
      (this.ranges = e), (this.primIndex = t);
    };
    (At.prototype.primary = function () {
      return this.ranges[this.primIndex];
    }),
      (At.prototype.equals = function (e) {
        if (e == this) return !0;
        if (
          e.primIndex != this.primIndex ||
          e.ranges.length != this.ranges.length
        )
          return !1;
        for (var t = 0; t < this.ranges.length; t++) {
          var n = this.ranges[t],
            r = e.ranges[t];
          if (!De(n.anchor, r.anchor) || !De(n.head, r.head)) return !1;
        }
        return !0;
      }),
      (At.prototype.deepCopy = function () {
        for (var e = [], t = 0; t < this.ranges.length; t++)
          e[t] = new Ae(et(this.ranges[t].anchor), et(this.ranges[t].head));
        return new At(e, this.primIndex);
      }),
      (At.prototype.somethingSelected = function () {
        for (var e = 0; e < this.ranges.length; e++)
          if (!this.ranges[e].empty()) return !0;
        return !1;
      }),
      (At.prototype.contains = function (e, t) {
        t || (t = e);
        for (var n = 0; n < this.ranges.length; n++) {
          var r = this.ranges[n];
          if (I(t, r.from()) >= 0 && I(e, r.to()) <= 0) return n;
        }
        return -1;
      });
    var Ae = function (e, t) {
      (this.anchor = e), (this.head = t);
    };
    (Ae.prototype.from = function () {
      return Hr(this.anchor, this.head);
    }),
      (Ae.prototype.to = function () {
        return mt(this.anchor, this.head);
      }),
      (Ae.prototype.empty = function () {
        return (
          this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
        );
      });
    function Rt(e, t, n) {
      var r = e && e.options.selectionsMayTouch,
        i = t[n];
      t.sort(function (m, y) {
        return I(m.from(), y.from());
      }),
        (n = G(t, i));
      for (var o = 1; o < t.length; o++) {
        var l = t[o],
          a = t[o - 1],
          s = I(a.to(), l.from());
        if (r && !l.empty() ? s > 0 : s >= 0) {
          var u = Hr(a.from(), l.from()),
            d = mt(a.to(), l.to()),
            p = a.empty() ? l.from() == l.head : a.from() == a.head;
          o <= n && --n, t.splice(--o, 2, new Ae(p ? d : u, p ? u : d));
        }
      }
      return new At(t, n);
    }
    function cr(e, t) {
      return new At([new Ae(e, t || e)], 0);
    }
    function dr(e) {
      return e.text
        ? k(
            e.from.line + e.text.length - 1,
            re(e.text).length + (e.text.length == 1 ? e.from.ch : 0),
          )
        : e.to;
    }
    function pl(e, t) {
      if (I(e, t.from) < 0) return e;
      if (I(e, t.to) <= 0) return dr(t);
      var n = e.line + t.text.length - (t.to.line - t.from.line) - 1,
        r = e.ch;
      return e.line == t.to.line && (r += dr(t).ch - t.to.ch), k(n, r);
    }
    function Yi(e, t) {
      for (var n = [], r = 0; r < e.sel.ranges.length; r++) {
        var i = e.sel.ranges[r];
        n.push(new Ae(pl(i.anchor, t), pl(i.head, t)));
      }
      return Rt(e.cm, n, e.sel.primIndex);
    }
    function vl(e, t, n) {
      return e.line == t.line
        ? k(n.line, e.ch - t.ch + n.ch)
        : k(n.line + (e.line - t.line), e.ch);
    }
    function Ss(e, t, n) {
      for (var r = [], i = k(e.first, 0), o = i, l = 0; l < t.length; l++) {
        var a = t[l],
          s = vl(a.from, i, o),
          u = vl(dr(a), i, o);
        if (((i = a.to), (o = u), n == "around")) {
          var d = e.sel.ranges[l],
            p = I(d.head, d.anchor) < 0;
          r[l] = new Ae(p ? u : s, p ? s : u);
        } else r[l] = new Ae(s, s);
      }
      return new At(r, e.sel.primIndex);
    }
    function Zi(e) {
      (e.doc.mode = Fr(e.options, e.doc.modeOption)), Sn(e);
    }
    function Sn(e) {
      e.doc.iter(function (t) {
        t.stateAfter && (t.stateAfter = null), t.styles && (t.styles = null);
      }),
        (e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first),
        wn(e, 100),
        e.state.modeGen++,
        e.curOp && bt(e);
    }
    function gl(e, t) {
      return (
        t.from.ch == 0 &&
        t.to.ch == 0 &&
        re(t.text) == "" &&
        (!e.cm || e.cm.options.wholeLineUpdateBefore)
      );
    }
    function Ji(e, t, n, r) {
      function i(W) {
        return n ? n[W] : null;
      }
      function o(W, E, B) {
        Oa(W, E, B, r), tt(W, "change", W, t);
      }
      function l(W, E) {
        for (var B = [], Q = W; Q < E; ++Q) B.push(new Br(u[Q], i(Q), r));
        return B;
      }
      var a = t.from,
        s = t.to,
        u = t.text,
        d = U(e, a.line),
        p = U(e, s.line),
        m = re(u),
        y = i(u.length - 1),
        S = s.line - a.line;
      if (t.full)
        e.insert(0, l(0, u.length)), e.remove(u.length, e.size - u.length);
      else if (gl(e, t)) {
        var N = l(0, u.length - 1);
        o(p, p.text, y),
          S && e.remove(a.line, S),
          N.length && e.insert(a.line, N);
      } else if (d == p)
        if (u.length == 1)
          o(d, d.text.slice(0, a.ch) + m + d.text.slice(s.ch), y);
        else {
          var z = l(1, u.length - 1);
          z.push(new Br(m + d.text.slice(s.ch), y, r)),
            o(d, d.text.slice(0, a.ch) + u[0], i(0)),
            e.insert(a.line + 1, z);
        }
      else if (u.length == 1)
        o(d, d.text.slice(0, a.ch) + u[0] + p.text.slice(s.ch), i(0)),
          e.remove(a.line + 1, S);
      else {
        o(d, d.text.slice(0, a.ch) + u[0], i(0)),
          o(p, m + p.text.slice(s.ch), y);
        var P = l(1, u.length - 1);
        S > 1 && e.remove(a.line + 1, S - 1), e.insert(a.line + 1, P);
      }
      tt(e, "change", e, t);
    }
    function hr(e, t, n) {
      function r(i, o, l) {
        if (i.linked)
          for (var a = 0; a < i.linked.length; ++a) {
            var s = i.linked[a];
            if (s.doc != o) {
              var u = l && s.sharedHist;
              (n && !u) || (t(s.doc, u), r(s.doc, i, u));
            }
          }
      }
      r(e, null, !0);
    }
    function yl(e, t) {
      if (t.cm) throw new Error("This document is already in use.");
      (e.doc = t),
        (t.cm = e),
        Fi(e),
        Zi(e),
        ml(e),
        (e.options.direction = t.direction),
        e.options.lineWrapping || Ti(e),
        (e.options.mode = t.modeOption),
        bt(e);
    }
    function ml(e) {
      (e.doc.direction == "rtl" ? D : me)(e.display.lineDiv, "CodeMirror-rtl");
    }
    function Cs(e) {
      Mt(e, function () {
        ml(e), bt(e);
      });
    }
    function ni(e) {
      (this.done = []),
        (this.undone = []),
        (this.undoDepth = e ? e.undoDepth : 1 / 0),
        (this.lastModTime = this.lastSelTime = 0),
        (this.lastOp = this.lastSelOp = null),
        (this.lastOrigin = this.lastSelOrigin = null),
        (this.generation = this.maxGeneration = e ? e.maxGeneration : 1);
    }
    function Qi(e, t) {
      var n = { from: et(t.from), to: dr(t), text: Zt(e, t.from, t.to) };
      return (
        wl(e, n, t.from.line, t.to.line + 1),
        hr(
          e,
          function (r) {
            return wl(r, n, t.from.line, t.to.line + 1);
          },
          !0,
        ),
        n
      );
    }
    function bl(e) {
      for (; e.length; ) {
        var t = re(e);
        if (t.ranges) e.pop();
        else break;
      }
    }
    function Ts(e, t) {
      if (t) return bl(e.done), re(e.done);
      if (e.done.length && !re(e.done).ranges) return re(e.done);
      if (e.done.length > 1 && !e.done[e.done.length - 2].ranges)
        return e.done.pop(), re(e.done);
    }
    function xl(e, t, n, r) {
      var i = e.history;
      i.undone.length = 0;
      var o = +new Date(),
        l,
        a;
      if (
        (i.lastOp == r ||
          (i.lastOrigin == t.origin &&
            t.origin &&
            ((t.origin.charAt(0) == "+" &&
              i.lastModTime >
                o - (e.cm ? e.cm.options.historyEventDelay : 500)) ||
              t.origin.charAt(0) == "*"))) &&
        (l = Ts(i, i.lastOp == r))
      )
        (a = re(l.changes)),
          I(t.from, t.to) == 0 && I(t.from, a.to) == 0
            ? (a.to = dr(t))
            : l.changes.push(Qi(e, t));
      else {
        var s = re(i.done);
        for (
          (!s || !s.ranges) && ii(e.sel, i.done),
            l = { changes: [Qi(e, t)], generation: i.generation },
            i.done.push(l);
          i.done.length > i.undoDepth;

        )
          i.done.shift(), i.done[0].ranges || i.done.shift();
      }
      i.done.push(n),
        (i.generation = ++i.maxGeneration),
        (i.lastModTime = i.lastSelTime = o),
        (i.lastOp = i.lastSelOp = r),
        (i.lastOrigin = i.lastSelOrigin = t.origin),
        a || Ge(e, "historyAdded");
    }
    function Ls(e, t, n, r) {
      var i = t.charAt(0);
      return (
        i == "*" ||
        (i == "+" &&
          n.ranges.length == r.ranges.length &&
          n.somethingSelected() == r.somethingSelected() &&
          new Date() - e.history.lastSelTime <=
            (e.cm ? e.cm.options.historyEventDelay : 500))
      );
    }
    function Ms(e, t, n, r) {
      var i = e.history,
        o = r && r.origin;
      n == i.lastSelOp ||
      (o &&
        i.lastSelOrigin == o &&
        ((i.lastModTime == i.lastSelTime && i.lastOrigin == o) ||
          Ls(e, o, re(i.done), t)))
        ? (i.done[i.done.length - 1] = t)
        : ii(t, i.done),
        (i.lastSelTime = +new Date()),
        (i.lastSelOrigin = o),
        (i.lastSelOp = n),
        r && r.clearRedo !== !1 && bl(i.undone);
    }
    function ii(e, t) {
      var n = re(t);
      (n && n.ranges && n.equals(e)) || t.push(e);
    }
    function wl(e, t, n, r) {
      var i = t["spans_" + e.id],
        o = 0;
      e.iter(Math.max(e.first, n), Math.min(e.first + e.size, r), function (l) {
        l.markedSpans &&
          ((i || (i = t["spans_" + e.id] = {}))[o] = l.markedSpans),
          ++o;
      });
    }
    function Ns(e) {
      if (!e) return null;
      for (var t, n = 0; n < e.length; ++n)
        e[n].marker.explicitlyCleared
          ? t || (t = e.slice(0, n))
          : t && t.push(e[n]);
      return t ? (t.length ? t : null) : e;
    }
    function Ds(e, t) {
      var n = t["spans_" + e.id];
      if (!n) return null;
      for (var r = [], i = 0; i < t.text.length; ++i) r.push(Ns(n[i]));
      return r;
    }
    function kl(e, t) {
      var n = Ds(e, t),
        r = wi(e, t);
      if (!n) return r;
      if (!r) return n;
      for (var i = 0; i < n.length; ++i) {
        var o = n[i],
          l = r[i];
        if (o && l)
          e: for (var a = 0; a < l.length; ++a) {
            for (var s = l[a], u = 0; u < o.length; ++u)
              if (o[u].marker == s.marker) continue e;
            o.push(s);
          }
        else l && (n[i] = l);
      }
      return n;
    }
    function Yr(e, t, n) {
      for (var r = [], i = 0; i < e.length; ++i) {
        var o = e[i];
        if (o.ranges) {
          r.push(n ? At.prototype.deepCopy.call(o) : o);
          continue;
        }
        var l = o.changes,
          a = [];
        r.push({ changes: a });
        for (var s = 0; s < l.length; ++s) {
          var u = l[s],
            d = void 0;
          if ((a.push({ from: u.from, to: u.to, text: u.text }), t))
            for (var p in u)
              (d = p.match(/^spans_(\d+)$/)) &&
                G(t, Number(d[1])) > -1 &&
                ((re(a)[p] = u[p]), delete u[p]);
        }
      }
      return r;
    }
    function Vi(e, t, n, r) {
      if (r) {
        var i = e.anchor;
        if (n) {
          var o = I(t, i) < 0;
          o != I(n, i) < 0 ? ((i = t), (t = n)) : o != I(t, n) < 0 && (t = n);
        }
        return new Ae(i, t);
      } else return new Ae(n || t, t);
    }
    function oi(e, t, n, r, i) {
      i == null && (i = e.cm && (e.cm.display.shift || e.extend)),
        ct(e, new At([Vi(e.sel.primary(), t, n, i)], 0), r);
    }
    function Sl(e, t, n) {
      for (
        var r = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0;
        o < e.sel.ranges.length;
        o++
      )
        r[o] = Vi(e.sel.ranges[o], t[o], null, i);
      var l = Rt(e.cm, r, e.sel.primIndex);
      ct(e, l, n);
    }
    function $i(e, t, n, r) {
      var i = e.sel.ranges.slice(0);
      (i[t] = n), ct(e, Rt(e.cm, i, e.sel.primIndex), r);
    }
    function Cl(e, t, n, r) {
      ct(e, cr(t, n), r);
    }
    function As(e, t, n) {
      var r = {
        ranges: t.ranges,
        update: function (i) {
          this.ranges = [];
          for (var o = 0; o < i.length; o++)
            this.ranges[o] = new Ae(fe(e, i[o].anchor), fe(e, i[o].head));
        },
        origin: n && n.origin,
      };
      return (
        Ge(e, "beforeSelectionChange", e, r),
        e.cm && Ge(e.cm, "beforeSelectionChange", e.cm, r),
        r.ranges != t.ranges ? Rt(e.cm, r.ranges, r.ranges.length - 1) : t
      );
    }
    function Tl(e, t, n) {
      var r = e.history.done,
        i = re(r);
      i && i.ranges ? ((r[r.length - 1] = t), li(e, t, n)) : ct(e, t, n);
    }
    function ct(e, t, n) {
      li(e, t, n), Ms(e, e.sel, e.cm ? e.cm.curOp.id : NaN, n);
    }
    function li(e, t, n) {
      (Lt(e, "beforeSelectionChange") ||
        (e.cm && Lt(e.cm, "beforeSelectionChange"))) &&
        (t = As(e, t, n));
      var r =
        (n && n.bias) ||
        (I(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
      Ll(e, Nl(e, t, r, !0)),
        !(n && n.scroll === !1) &&
          e.cm &&
          e.cm.getOption("readOnly") != "nocursor" &&
          jr(e.cm);
    }
    function Ll(e, t) {
      t.equals(e.sel) ||
        ((e.sel = t),
        e.cm &&
          ((e.cm.curOp.updateInput = 1),
          (e.cm.curOp.selectionChanged = !0),
          zt(e.cm)),
        tt(e, "cursorActivity", e));
    }
    function Ml(e) {
      Ll(e, Nl(e, e.sel, null, !1));
    }
    function Nl(e, t, n, r) {
      for (var i, o = 0; o < t.ranges.length; o++) {
        var l = t.ranges[o],
          a = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
          s = ai(e, l.anchor, a && a.anchor, n, r),
          u = l.head == l.anchor ? s : ai(e, l.head, a && a.head, n, r);
        (i || s != l.anchor || u != l.head) &&
          (i || (i = t.ranges.slice(0, o)), (i[o] = new Ae(s, u)));
      }
      return i ? Rt(e.cm, i, t.primIndex) : t;
    }
    function Zr(e, t, n, r, i) {
      var o = U(e, t.line);
      if (o.markedSpans)
        for (var l = 0; l < o.markedSpans.length; ++l) {
          var a = o.markedSpans[l],
            s = a.marker,
            u = "selectLeft" in s ? !s.selectLeft : s.inclusiveLeft,
            d = "selectRight" in s ? !s.selectRight : s.inclusiveRight;
          if (
            (a.from == null || (u ? a.from <= t.ch : a.from < t.ch)) &&
            (a.to == null || (d ? a.to >= t.ch : a.to > t.ch))
          ) {
            if (i && (Ge(s, "beforeCursorEnter"), s.explicitlyCleared))
              if (o.markedSpans) {
                --l;
                continue;
              } else break;
            if (!s.atomic) continue;
            if (n) {
              var p = s.find(r < 0 ? 1 : -1),
                m = void 0;
              if (
                ((r < 0 ? d : u) &&
                  (p = Dl(e, p, -r, p && p.line == t.line ? o : null)),
                p &&
                  p.line == t.line &&
                  (m = I(p, n)) &&
                  (r < 0 ? m < 0 : m > 0))
              )
                return Zr(e, p, t, r, i);
            }
            var y = s.find(r < 0 ? -1 : 1);
            return (
              (r < 0 ? u : d) && (y = Dl(e, y, r, y.line == t.line ? o : null)),
              y ? Zr(e, y, t, r, i) : null
            );
          }
        }
      return t;
    }
    function ai(e, t, n, r, i) {
      var o = r || 1,
        l =
          Zr(e, t, n, o, i) ||
          (!i && Zr(e, t, n, o, !0)) ||
          Zr(e, t, n, -o, i) ||
          (!i && Zr(e, t, n, -o, !0));
      return l || ((e.cantEdit = !0), k(e.first, 0));
    }
    function Dl(e, t, n, r) {
      return n < 0 && t.ch == 0
        ? t.line > e.first
          ? fe(e, k(t.line - 1))
          : null
        : n > 0 && t.ch == (r || U(e, t.line)).text.length
          ? t.line < e.first + e.size - 1
            ? k(t.line + 1, 0)
            : null
          : new k(t.line, t.ch + n);
    }
    function Al(e) {
      e.setSelection(k(e.firstLine(), 0), k(e.lastLine()), st);
    }
    function Ol(e, t, n) {
      var r = {
        canceled: !1,
        from: t.from,
        to: t.to,
        text: t.text,
        origin: t.origin,
        cancel: function () {
          return (r.canceled = !0);
        },
      };
      return (
        n &&
          (r.update = function (i, o, l, a) {
            i && (r.from = fe(e, i)),
              o && (r.to = fe(e, o)),
              l && (r.text = l),
              a !== void 0 && (r.origin = a);
          }),
        Ge(e, "beforeChange", e, r),
        e.cm && Ge(e.cm, "beforeChange", e.cm, r),
        r.canceled
          ? (e.cm && (e.cm.curOp.updateInput = 2), null)
          : { from: r.from, to: r.to, text: r.text, origin: r.origin }
      );
    }
    function Jr(e, t, n) {
      if (e.cm) {
        if (!e.cm.curOp) return rt(e.cm, Jr)(e, t, n);
        if (e.cm.state.suppressEdits) return;
      }
      if (
        !(
          (Lt(e, "beforeChange") || (e.cm && Lt(e.cm, "beforeChange"))) &&
          ((t = Ol(e, t, !0)), !t)
        )
      ) {
        var r = ko && !n && Ma(e, t.from, t.to);
        if (r)
          for (var i = r.length - 1; i >= 0; --i)
            zl(e, {
              from: r[i].from,
              to: r[i].to,
              text: i ? [""] : t.text,
              origin: t.origin,
            });
        else zl(e, t);
      }
    }
    function zl(e, t) {
      if (!(t.text.length == 1 && t.text[0] == "" && I(t.from, t.to) == 0)) {
        var n = Yi(e, t);
        xl(e, t, n, e.cm ? e.cm.curOp.id : NaN), Cn(e, t, n, wi(e, t));
        var r = [];
        hr(e, function (i, o) {
          !o && G(r, i.history) == -1 && (Fl(i.history, t), r.push(i.history)),
            Cn(i, t, null, wi(i, t));
        });
      }
    }
    function si(e, t, n) {
      var r = e.cm && e.cm.state.suppressEdits;
      if (!(r && !n)) {
        for (
          var i = e.history,
            o,
            l = e.sel,
            a = t == "undo" ? i.done : i.undone,
            s = t == "undo" ? i.undone : i.done,
            u = 0;
          u < a.length &&
          ((o = a[u]), !(n ? o.ranges && !o.equals(e.sel) : !o.ranges));
          u++
        );
        if (u != a.length) {
          for (i.lastOrigin = i.lastSelOrigin = null; ; )
            if (((o = a.pop()), o.ranges)) {
              if ((ii(o, s), n && !o.equals(e.sel))) {
                ct(e, o, { clearRedo: !1 });
                return;
              }
              l = o;
            } else if (r) {
              a.push(o);
              return;
            } else break;
          var d = [];
          ii(l, s),
            s.push({ changes: d, generation: i.generation }),
            (i.generation = o.generation || ++i.maxGeneration);
          for (
            var p = Lt(e, "beforeChange") || (e.cm && Lt(e.cm, "beforeChange")),
              m = function (N) {
                var z = o.changes[N];
                if (((z.origin = t), p && !Ol(e, z, !1)))
                  return (a.length = 0), {};
                d.push(Qi(e, z));
                var P = N ? Yi(e, z) : re(a);
                Cn(e, z, P, kl(e, z)),
                  !N &&
                    e.cm &&
                    e.cm.scrollIntoView({ from: z.from, to: dr(z) });
                var W = [];
                hr(e, function (E, B) {
                  !B &&
                    G(W, E.history) == -1 &&
                    (Fl(E.history, z), W.push(E.history)),
                    Cn(E, z, null, kl(E, z));
                });
              },
              y = o.changes.length - 1;
            y >= 0;
            --y
          ) {
            var S = m(y);
            if (S) return S.v;
          }
        }
      }
    }
    function Pl(e, t) {
      if (
        t != 0 &&
        ((e.first += t),
        (e.sel = new At(
          Ne(e.sel.ranges, function (i) {
            return new Ae(
              k(i.anchor.line + t, i.anchor.ch),
              k(i.head.line + t, i.head.ch),
            );
          }),
          e.sel.primIndex,
        )),
        e.cm)
      ) {
        bt(e.cm, e.first, e.first - t, t);
        for (var n = e.cm.display, r = n.viewFrom; r < n.viewTo; r++)
          ur(e.cm, r, "gutter");
      }
    }
    function Cn(e, t, n, r) {
      if (e.cm && !e.cm.curOp) return rt(e.cm, Cn)(e, t, n, r);
      if (t.to.line < e.first) {
        Pl(e, t.text.length - 1 - (t.to.line - t.from.line));
        return;
      }
      if (!(t.from.line > e.lastLine())) {
        if (t.from.line < e.first) {
          var i = t.text.length - 1 - (e.first - t.from.line);
          Pl(e, i),
            (t = {
              from: k(e.first, 0),
              to: k(t.to.line + i, t.to.ch),
              text: [re(t.text)],
              origin: t.origin,
            });
        }
        var o = e.lastLine();
        t.to.line > o &&
          (t = {
            from: t.from,
            to: k(o, U(e, o).text.length),
            text: [t.text[0]],
            origin: t.origin,
          }),
          (t.removed = Zt(e, t.from, t.to)),
          n || (n = Yi(e, t)),
          e.cm ? Os(e.cm, t, r) : Ji(e, t, r),
          li(e, n, st),
          e.cantEdit && ai(e, k(e.firstLine(), 0)) && (e.cantEdit = !1);
      }
    }
    function Os(e, t, n) {
      var r = e.doc,
        i = e.display,
        o = t.from,
        l = t.to,
        a = !1,
        s = o.line;
      e.options.lineWrapping ||
        ((s = f(Ht(U(r, o.line)))),
        r.iter(s, l.line + 1, function (y) {
          if (y == i.maxLine) return (a = !0), !0;
        })),
        r.sel.contains(t.from, t.to) > -1 && zt(e),
        Ji(r, t, n, Vo(e)),
        e.options.lineWrapping ||
          (r.iter(s, o.line + t.text.length, function (y) {
            var S = qn(y);
            S > i.maxLineLength &&
              ((i.maxLine = y),
              (i.maxLineLength = S),
              (i.maxLineChanged = !0),
              (a = !1));
          }),
          a && (e.curOp.updateMaxLine = !0)),
        xa(r, o.line),
        wn(e, 400);
      var u = t.text.length - (l.line - o.line) - 1;
      t.full
        ? bt(e)
        : o.line == l.line && t.text.length == 1 && !gl(e.doc, t)
          ? ur(e, o.line, "text")
          : bt(e, o.line, l.line + 1, u);
      var d = Lt(e, "changes"),
        p = Lt(e, "change");
      if (p || d) {
        var m = {
          from: o,
          to: l,
          text: t.text,
          removed: t.removed,
          origin: t.origin,
        };
        p && tt(e, "change", e, m),
          d && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(m);
      }
      e.display.selForContextMenu = null;
    }
    function Qr(e, t, n, r, i) {
      var o;
      r || (r = n),
        I(r, n) < 0 && ((o = [r, n]), (n = o[0]), (r = o[1])),
        typeof t == "string" && (t = e.splitLines(t)),
        Jr(e, { from: n, to: r, text: t, origin: i });
    }
    function El(e, t, n, r) {
      n < e.line ? (e.line += r) : t < e.line && ((e.line = t), (e.ch = 0));
    }
    function Il(e, t, n, r) {
      for (var i = 0; i < e.length; ++i) {
        var o = e[i],
          l = !0;
        if (o.ranges) {
          o.copied || ((o = e[i] = o.deepCopy()), (o.copied = !0));
          for (var a = 0; a < o.ranges.length; a++)
            El(o.ranges[a].anchor, t, n, r), El(o.ranges[a].head, t, n, r);
          continue;
        }
        for (var s = 0; s < o.changes.length; ++s) {
          var u = o.changes[s];
          if (n < u.from.line)
            (u.from = k(u.from.line + r, u.from.ch)),
              (u.to = k(u.to.line + r, u.to.ch));
          else if (t <= u.to.line) {
            l = !1;
            break;
          }
        }
        l || (e.splice(0, i + 1), (i = 0));
      }
    }
    function Fl(e, t) {
      var n = t.from.line,
        r = t.to.line,
        i = t.text.length - (r - n) - 1;
      Il(e.done, n, r, i), Il(e.undone, n, r, i);
    }
    function Tn(e, t, n, r) {
      var i = t,
        o = t;
      return (
        typeof t == "number" ? (o = U(e, ho(e, t))) : (i = f(t)),
        i == null ? null : (r(o, i) && e.cm && ur(e.cm, i, n), o)
      );
    }
    function Ln(e) {
      (this.lines = e), (this.parent = null);
      for (var t = 0, n = 0; n < e.length; ++n)
        (e[n].parent = this), (t += e[n].height);
      this.height = t;
    }
    Ln.prototype = {
      chunkSize: function () {
        return this.lines.length;
      },
      removeInner: function (e, t) {
        for (var n = e, r = e + t; n < r; ++n) {
          var i = this.lines[n];
          (this.height -= i.height), za(i), tt(i, "delete");
        }
        this.lines.splice(e, t);
      },
      collapse: function (e) {
        e.push.apply(e, this.lines);
      },
      insertInner: function (e, t, n) {
        (this.height += n),
          (this.lines = this.lines
            .slice(0, e)
            .concat(t)
            .concat(this.lines.slice(e)));
        for (var r = 0; r < t.length; ++r) t[r].parent = this;
      },
      iterN: function (e, t, n) {
        for (var r = e + t; e < r; ++e) if (n(this.lines[e])) return !0;
      },
    };
    function Mn(e) {
      this.children = e;
      for (var t = 0, n = 0, r = 0; r < e.length; ++r) {
        var i = e[r];
        (t += i.chunkSize()), (n += i.height), (i.parent = this);
      }
      (this.size = t), (this.height = n), (this.parent = null);
    }
    Mn.prototype = {
      chunkSize: function () {
        return this.size;
      },
      removeInner: function (e, t) {
        this.size -= t;
        for (var n = 0; n < this.children.length; ++n) {
          var r = this.children[n],
            i = r.chunkSize();
          if (e < i) {
            var o = Math.min(t, i - e),
              l = r.height;
            if (
              (r.removeInner(e, o),
              (this.height -= l - r.height),
              i == o && (this.children.splice(n--, 1), (r.parent = null)),
              (t -= o) == 0)
            )
              break;
            e = 0;
          } else e -= i;
        }
        if (
          this.size - t < 25 &&
          (this.children.length > 1 || !(this.children[0] instanceof Ln))
        ) {
          var a = [];
          this.collapse(a),
            (this.children = [new Ln(a)]),
            (this.children[0].parent = this);
        }
      },
      collapse: function (e) {
        for (var t = 0; t < this.children.length; ++t)
          this.children[t].collapse(e);
      },
      insertInner: function (e, t, n) {
        (this.size += t.length), (this.height += n);
        for (var r = 0; r < this.children.length; ++r) {
          var i = this.children[r],
            o = i.chunkSize();
          if (e <= o) {
            if ((i.insertInner(e, t, n), i.lines && i.lines.length > 50)) {
              for (
                var l = (i.lines.length % 25) + 25, a = l;
                a < i.lines.length;

              ) {
                var s = new Ln(i.lines.slice(a, (a += 25)));
                (i.height -= s.height),
                  this.children.splice(++r, 0, s),
                  (s.parent = this);
              }
              (i.lines = i.lines.slice(0, l)), this.maybeSpill();
            }
            break;
          }
          e -= o;
        }
      },
      maybeSpill: function () {
        if (!(this.children.length <= 10)) {
          var e = this;
          do {
            var t = e.children.splice(e.children.length - 5, 5),
              n = new Mn(t);
            if (e.parent) {
              (e.size -= n.size), (e.height -= n.height);
              var i = G(e.parent.children, e);
              e.parent.children.splice(i + 1, 0, n);
            } else {
              var r = new Mn(e.children);
              (r.parent = e), (e.children = [r, n]), (e = r);
            }
            n.parent = e.parent;
          } while (e.children.length > 10);
          e.parent.maybeSpill();
        }
      },
      iterN: function (e, t, n) {
        for (var r = 0; r < this.children.length; ++r) {
          var i = this.children[r],
            o = i.chunkSize();
          if (e < o) {
            var l = Math.min(t, o - e);
            if (i.iterN(e, l, n)) return !0;
            if ((t -= l) == 0) break;
            e = 0;
          } else e -= o;
        }
      },
    };
    var Nn = function (e, t, n) {
      if (n) for (var r in n) n.hasOwnProperty(r) && (this[r] = n[r]);
      (this.doc = e), (this.node = t);
    };
    (Nn.prototype.clear = function () {
      var e = this.doc.cm,
        t = this.line.widgets,
        n = this.line,
        r = f(n);
      if (!(r == null || !t)) {
        for (var i = 0; i < t.length; ++i) t[i] == this && t.splice(i--, 1);
        t.length || (n.widgets = null);
        var o = pn(this);
        Dt(n, Math.max(0, n.height - o)),
          e &&
            (Mt(e, function () {
              Wl(e, n, -o), ur(e, r, "widget");
            }),
            tt(e, "lineWidgetCleared", e, this, r));
      }
    }),
      (Nn.prototype.changed = function () {
        var e = this,
          t = this.height,
          n = this.doc.cm,
          r = this.line;
        this.height = null;
        var i = pn(this) - t;
        i &&
          (sr(this.doc, r) || Dt(r, r.height + i),
          n &&
            Mt(n, function () {
              (n.curOp.forceUpdate = !0),
                Wl(n, r, i),
                tt(n, "lineWidgetChanged", n, e, f(r));
            }));
      }),
      Et(Nn);
    function Wl(e, t, n) {
      Qt(t) < ((e.curOp && e.curOp.scrollTop) || e.doc.scrollTop) && Ki(e, n);
    }
    function zs(e, t, n, r) {
      var i = new Nn(e, n, r),
        o = e.cm;
      return (
        o && i.noHScroll && (o.display.alignWidgets = !0),
        Tn(e, t, "widget", function (l) {
          var a = l.widgets || (l.widgets = []);
          if (
            (i.insertAt == null
              ? a.push(i)
              : a.splice(Math.min(a.length, Math.max(0, i.insertAt)), 0, i),
            (i.line = l),
            o && !sr(e, l))
          ) {
            var s = Qt(l) < e.scrollTop;
            Dt(l, l.height + pn(i)),
              s && Ki(o, i.height),
              (o.curOp.forceUpdate = !0);
          }
          return !0;
        }),
        o && tt(o, "lineWidgetAdded", o, i, typeof t == "number" ? t : f(t)),
        i
      );
    }
    var _l = 0,
      pr = function (e, t) {
        (this.lines = []), (this.type = t), (this.doc = e), (this.id = ++_l);
      };
    (pr.prototype.clear = function () {
      if (!this.explicitlyCleared) {
        var e = this.doc.cm,
          t = e && !e.curOp;
        if ((t && Lr(e), Lt(this, "clear"))) {
          var n = this.find();
          n && tt(this, "clear", n.from, n.to);
        }
        for (var r = null, i = null, o = 0; o < this.lines.length; ++o) {
          var l = this.lines[o],
            a = cn(l.markedSpans, this);
          e && !this.collapsed
            ? ur(e, f(l), "text")
            : e && (a.to != null && (i = f(l)), a.from != null && (r = f(l))),
            (l.markedSpans = Sa(l.markedSpans, a)),
            a.from == null &&
              this.collapsed &&
              !sr(this.doc, l) &&
              e &&
              Dt(l, Ur(e.display));
        }
        if (e && this.collapsed && !e.options.lineWrapping)
          for (var s = 0; s < this.lines.length; ++s) {
            var u = Ht(this.lines[s]),
              d = qn(u);
            d > e.display.maxLineLength &&
              ((e.display.maxLine = u),
              (e.display.maxLineLength = d),
              (e.display.maxLineChanged = !0));
          }
        r != null && e && this.collapsed && bt(e, r, i + 1),
          (this.lines.length = 0),
          (this.explicitlyCleared = !0),
          this.atomic &&
            this.doc.cantEdit &&
            ((this.doc.cantEdit = !1), e && Ml(e.doc)),
          e && tt(e, "markerCleared", e, this, r, i),
          t && Mr(e),
          this.parent && this.parent.clear();
      }
    }),
      (pr.prototype.find = function (e, t) {
        e == null && this.type == "bookmark" && (e = 1);
        for (var n, r, i = 0; i < this.lines.length; ++i) {
          var o = this.lines[i],
            l = cn(o.markedSpans, this);
          if (l.from != null && ((n = k(t ? o : f(o), l.from)), e == -1))
            return n;
          if (l.to != null && ((r = k(t ? o : f(o), l.to)), e == 1)) return r;
        }
        return n && { from: n, to: r };
      }),
      (pr.prototype.changed = function () {
        var e = this,
          t = this.find(-1, !0),
          n = this,
          r = this.doc.cm;
        !t ||
          !r ||
          Mt(r, function () {
            var i = t.line,
              o = f(t.line),
              l = Di(r, o);
            if (
              (l &&
                (Go(l), (r.curOp.selectionChanged = r.curOp.forceUpdate = !0)),
              (r.curOp.updateMaxLine = !0),
              !sr(n.doc, i) && n.height != null)
            ) {
              var a = n.height;
              n.height = null;
              var s = pn(n) - a;
              s && Dt(i, i.height + s);
            }
            tt(r, "markerChanged", r, e);
          });
      }),
      (pr.prototype.attachLine = function (e) {
        if (!this.lines.length && this.doc.cm) {
          var t = this.doc.cm.curOp;
          (!t.maybeHiddenMarkers || G(t.maybeHiddenMarkers, this) == -1) &&
            (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(
              this,
            );
        }
        this.lines.push(e);
      }),
      (pr.prototype.detachLine = function (e) {
        if (
          (this.lines.splice(G(this.lines, e), 1),
          !this.lines.length && this.doc.cm)
        ) {
          var t = this.doc.cm.curOp;
          (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
        }
      }),
      Et(pr);
    function Vr(e, t, n, r, i) {
      if (r && r.shared) return Ps(e, t, n, r, i);
      if (e.cm && !e.cm.curOp) return rt(e.cm, Vr)(e, t, n, r, i);
      var o = new pr(e, i),
        l = I(t, n);
      if ((r && de(r, o, !1), l > 0 || (l == 0 && o.clearWhenEmpty !== !1)))
        return o;
      if (
        (o.replacedWith &&
          ((o.collapsed = !0),
          (o.widgetNode = x("span", [o.replacedWith], "CodeMirror-widget")),
          r.handleMouseEvents ||
            o.widgetNode.setAttribute("cm-ignore-events", "true"),
          r.insertLeft && (o.widgetNode.insertLeft = !0)),
        o.collapsed)
      ) {
        if (
          No(e, t.line, t, n, o) ||
          (t.line != n.line && No(e, n.line, t, n, o))
        )
          throw new Error(
            "Inserting collapsed marker partially overlapping an existing one",
          );
        ka();
      }
      o.addToHistory &&
        xl(e, { from: t, to: n, origin: "markText" }, e.sel, NaN);
      var a = t.line,
        s = e.cm,
        u;
      if (
        (e.iter(a, n.line + 1, function (p) {
          s &&
            o.collapsed &&
            !s.options.lineWrapping &&
            Ht(p) == s.display.maxLine &&
            (u = !0),
            o.collapsed && a != t.line && Dt(p, 0),
            Ca(
              p,
              new Rn(o, a == t.line ? t.ch : null, a == n.line ? n.ch : null),
              e.cm && e.cm.curOp,
            ),
            ++a;
        }),
        o.collapsed &&
          e.iter(t.line, n.line + 1, function (p) {
            sr(e, p) && Dt(p, 0);
          }),
        o.clearOnEnter &&
          J(o, "beforeCursorEnter", function () {
            return o.clear();
          }),
        o.readOnly &&
          (wa(),
          (e.history.done.length || e.history.undone.length) &&
            e.clearHistory()),
        o.collapsed && ((o.id = ++_l), (o.atomic = !0)),
        s)
      ) {
        if ((u && (s.curOp.updateMaxLine = !0), o.collapsed))
          bt(s, t.line, n.line + 1);
        else if (
          o.className ||
          o.startStyle ||
          o.endStyle ||
          o.css ||
          o.attributes ||
          o.title
        )
          for (var d = t.line; d <= n.line; d++) ur(s, d, "text");
        o.atomic && Ml(s.doc), tt(s, "markerAdded", s, o);
      }
      return o;
    }
    var Dn = function (e, t) {
      (this.markers = e), (this.primary = t);
      for (var n = 0; n < e.length; ++n) e[n].parent = this;
    };
    (Dn.prototype.clear = function () {
      if (!this.explicitlyCleared) {
        this.explicitlyCleared = !0;
        for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
        tt(this, "clear");
      }
    }),
      (Dn.prototype.find = function (e, t) {
        return this.primary.find(e, t);
      }),
      Et(Dn);
    function Ps(e, t, n, r, i) {
      (r = de(r)), (r.shared = !1);
      var o = [Vr(e, t, n, r, i)],
        l = o[0],
        a = r.widgetNode;
      return (
        hr(e, function (s) {
          a && (r.widgetNode = a.cloneNode(!0)),
            o.push(Vr(s, fe(s, t), fe(s, n), r, i));
          for (var u = 0; u < s.linked.length; ++u)
            if (s.linked[u].isParent) return;
          l = re(o);
        }),
        new Dn(o, l)
      );
    }
    function Hl(e) {
      return e.findMarks(
        k(e.first, 0),
        e.clipPos(k(e.lastLine())),
        function (t) {
          return t.parent;
        },
      );
    }
    function Es(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n],
          i = r.find(),
          o = e.clipPos(i.from),
          l = e.clipPos(i.to);
        if (I(o, l)) {
          var a = Vr(e, o, l, r.primary, r.primary.type);
          r.markers.push(a), (a.parent = r);
        }
      }
    }
    function Is(e) {
      for (
        var t = function (r) {
            var i = e[r],
              o = [i.primary.doc];
            hr(i.primary.doc, function (s) {
              return o.push(s);
            });
            for (var l = 0; l < i.markers.length; l++) {
              var a = i.markers[l];
              G(o, a.doc) == -1 &&
                ((a.parent = null), i.markers.splice(l--, 1));
            }
          },
          n = 0;
        n < e.length;
        n++
      )
        t(n);
    }
    var Fs = 0,
      xt = function (e, t, n, r, i) {
        if (!(this instanceof xt)) return new xt(e, t, n, r, i);
        n == null && (n = 0),
          Mn.call(this, [new Ln([new Br("", null)])]),
          (this.first = n),
          (this.scrollTop = this.scrollLeft = 0),
          (this.cantEdit = !1),
          (this.cleanGeneration = 1),
          (this.modeFrontier = this.highlightFrontier = n);
        var o = k(n, 0);
        (this.sel = cr(o)),
          (this.history = new ni(null)),
          (this.id = ++Fs),
          (this.modeOption = t),
          (this.lineSep = r),
          (this.direction = i == "rtl" ? "rtl" : "ltr"),
          (this.extend = !1),
          typeof e == "string" && (e = this.splitLines(e)),
          Ji(this, { from: o, to: o, text: e }),
          ct(this, cr(o), st);
      };
    (xt.prototype = C(Mn.prototype, {
      constructor: xt,
      iter: function (e, t, n) {
        n
          ? this.iterN(e - this.first, t - e, n)
          : this.iterN(this.first, this.first + this.size, e);
      },
      insert: function (e, t) {
        for (var n = 0, r = 0; r < t.length; ++r) n += t[r].height;
        this.insertInner(e - this.first, t, n);
      },
      remove: function (e, t) {
        this.removeInner(e - this.first, t);
      },
      getValue: function (e) {
        var t = un(this, this.first, this.first + this.size);
        return e === !1 ? t : t.join(e || this.lineSeparator());
      },
      setValue: nt(function (e) {
        var t = k(this.first, 0),
          n = this.first + this.size - 1;
        Jr(
          this,
          {
            from: t,
            to: k(n, U(this, n).text.length),
            text: this.splitLines(e),
            origin: "setValue",
            full: !0,
          },
          !0,
        ),
          this.cm && yn(this.cm, 0, 0),
          ct(this, cr(t), st);
      }),
      replaceRange: function (e, t, n, r) {
        (t = fe(this, t)), (n = n ? fe(this, n) : t), Qr(this, e, t, n, r);
      },
      getRange: function (e, t, n) {
        var r = Zt(this, fe(this, e), fe(this, t));
        return n === !1
          ? r
          : n === ""
            ? r.join("")
            : r.join(n || this.lineSeparator());
      },
      getLine: function (e) {
        var t = this.getLineHandle(e);
        return t && t.text;
      },
      getLineHandle: function (e) {
        if (L(this, e)) return U(this, e);
      },
      getLineNumber: function (e) {
        return f(e);
      },
      getLineHandleVisualStart: function (e) {
        return typeof e == "number" && (e = U(this, e)), Ht(e);
      },
      lineCount: function () {
        return this.size;
      },
      firstLine: function () {
        return this.first;
      },
      lastLine: function () {
        return this.first + this.size - 1;
      },
      clipPos: function (e) {
        return fe(this, e);
      },
      getCursor: function (e) {
        var t = this.sel.primary(),
          n;
        return (
          e == null || e == "head"
            ? (n = t.head)
            : e == "anchor"
              ? (n = t.anchor)
              : e == "end" || e == "to" || e === !1
                ? (n = t.to())
                : (n = t.from()),
          n
        );
      },
      listSelections: function () {
        return this.sel.ranges;
      },
      somethingSelected: function () {
        return this.sel.somethingSelected();
      },
      setCursor: nt(function (e, t, n) {
        Cl(this, fe(this, typeof e == "number" ? k(e, t || 0) : e), null, n);
      }),
      setSelection: nt(function (e, t, n) {
        Cl(this, fe(this, e), fe(this, t || e), n);
      }),
      extendSelection: nt(function (e, t, n) {
        oi(this, fe(this, e), t && fe(this, t), n);
      }),
      extendSelections: nt(function (e, t) {
        Sl(this, po(this, e), t);
      }),
      extendSelectionsBy: nt(function (e, t) {
        var n = Ne(this.sel.ranges, e);
        Sl(this, po(this, n), t);
      }),
      setSelections: nt(function (e, t, n) {
        if (e.length) {
          for (var r = [], i = 0; i < e.length; i++)
            r[i] = new Ae(
              fe(this, e[i].anchor),
              fe(this, e[i].head || e[i].anchor),
            );
          t == null && (t = Math.min(e.length - 1, this.sel.primIndex)),
            ct(this, Rt(this.cm, r, t), n);
        }
      }),
      addSelection: nt(function (e, t, n) {
        var r = this.sel.ranges.slice(0);
        r.push(new Ae(fe(this, e), fe(this, t || e))),
          ct(this, Rt(this.cm, r, r.length - 1), n);
      }),
      getSelection: function (e) {
        for (var t = this.sel.ranges, n, r = 0; r < t.length; r++) {
          var i = Zt(this, t[r].from(), t[r].to());
          n = n ? n.concat(i) : i;
        }
        return e === !1 ? n : n.join(e || this.lineSeparator());
      },
      getSelections: function (e) {
        for (var t = [], n = this.sel.ranges, r = 0; r < n.length; r++) {
          var i = Zt(this, n[r].from(), n[r].to());
          e !== !1 && (i = i.join(e || this.lineSeparator())), (t[r] = i);
        }
        return t;
      },
      replaceSelection: function (e, t, n) {
        for (var r = [], i = 0; i < this.sel.ranges.length; i++) r[i] = e;
        this.replaceSelections(r, t, n || "+input");
      },
      replaceSelections: nt(function (e, t, n) {
        for (var r = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
          var l = i.ranges[o];
          r[o] = {
            from: l.from(),
            to: l.to(),
            text: this.splitLines(e[o]),
            origin: n,
          };
        }
        for (
          var a = t && t != "end" && Ss(this, r, t), s = r.length - 1;
          s >= 0;
          s--
        )
          Jr(this, r[s]);
        a ? Tl(this, a) : this.cm && jr(this.cm);
      }),
      undo: nt(function () {
        si(this, "undo");
      }),
      redo: nt(function () {
        si(this, "redo");
      }),
      undoSelection: nt(function () {
        si(this, "undo", !0);
      }),
      redoSelection: nt(function () {
        si(this, "redo", !0);
      }),
      setExtending: function (e) {
        this.extend = e;
      },
      getExtending: function () {
        return this.extend;
      },
      historySize: function () {
        for (var e = this.history, t = 0, n = 0, r = 0; r < e.done.length; r++)
          e.done[r].ranges || ++t;
        for (var i = 0; i < e.undone.length; i++) e.undone[i].ranges || ++n;
        return { undo: t, redo: n };
      },
      clearHistory: function () {
        var e = this;
        (this.history = new ni(this.history)),
          hr(
            this,
            function (t) {
              return (t.history = e.history);
            },
            !0,
          );
      },
      markClean: function () {
        this.cleanGeneration = this.changeGeneration(!0);
      },
      changeGeneration: function (e) {
        return (
          e &&
            (this.history.lastOp =
              this.history.lastSelOp =
              this.history.lastOrigin =
                null),
          this.history.generation
        );
      },
      isClean: function (e) {
        return this.history.generation == (e || this.cleanGeneration);
      },
      getHistory: function () {
        return { done: Yr(this.history.done), undone: Yr(this.history.undone) };
      },
      setHistory: function (e) {
        var t = (this.history = new ni(this.history));
        (t.done = Yr(e.done.slice(0), null, !0)),
          (t.undone = Yr(e.undone.slice(0), null, !0));
      },
      setGutterMarker: nt(function (e, t, n) {
        return Tn(this, e, "gutter", function (r) {
          var i = r.gutterMarkers || (r.gutterMarkers = {});
          return (i[t] = n), !n && Y(i) && (r.gutterMarkers = null), !0;
        });
      }),
      clearGutter: nt(function (e) {
        var t = this;
        this.iter(function (n) {
          n.gutterMarkers &&
            n.gutterMarkers[e] &&
            Tn(t, n, "gutter", function () {
              return (
                (n.gutterMarkers[e] = null),
                Y(n.gutterMarkers) && (n.gutterMarkers = null),
                !0
              );
            });
        });
      }),
      lineInfo: function (e) {
        var t;
        if (typeof e == "number") {
          if (!L(this, e) || ((t = e), (e = U(this, e)), !e)) return null;
        } else if (((t = f(e)), t == null)) return null;
        return {
          line: t,
          handle: e,
          text: e.text,
          gutterMarkers: e.gutterMarkers,
          textClass: e.textClass,
          bgClass: e.bgClass,
          wrapClass: e.wrapClass,
          widgets: e.widgets,
        };
      },
      addLineClass: nt(function (e, t, n) {
        return Tn(this, e, t == "gutter" ? "gutter" : "class", function (r) {
          var i =
            t == "text"
              ? "textClass"
              : t == "background"
                ? "bgClass"
                : t == "gutter"
                  ? "gutterClass"
                  : "wrapClass";
          if (!r[i]) r[i] = n;
          else {
            if (X(n).test(r[i])) return !1;
            r[i] += " " + n;
          }
          return !0;
        });
      }),
      removeLineClass: nt(function (e, t, n) {
        return Tn(this, e, t == "gutter" ? "gutter" : "class", function (r) {
          var i =
              t == "text"
                ? "textClass"
                : t == "background"
                  ? "bgClass"
                  : t == "gutter"
                    ? "gutterClass"
                    : "wrapClass",
            o = r[i];
          if (o)
            if (n == null) r[i] = null;
            else {
              var l = o.match(X(n));
              if (!l) return !1;
              var a = l.index + l[0].length;
              r[i] =
                o.slice(0, l.index) +
                  (!l.index || a == o.length ? "" : " ") +
                  o.slice(a) || null;
            }
          else return !1;
          return !0;
        });
      }),
      addLineWidget: nt(function (e, t, n) {
        return zs(this, e, t, n);
      }),
      removeLineWidget: function (e) {
        e.clear();
      },
      markText: function (e, t, n) {
        return Vr(this, fe(this, e), fe(this, t), n, (n && n.type) || "range");
      },
      setBookmark: function (e, t) {
        var n = {
          replacedWith: t && (t.nodeType == null ? t.widget : t),
          insertLeft: t && t.insertLeft,
          clearWhenEmpty: !1,
          shared: t && t.shared,
          handleMouseEvents: t && t.handleMouseEvents,
        };
        return (e = fe(this, e)), Vr(this, e, e, n, "bookmark");
      },
      findMarksAt: function (e) {
        e = fe(this, e);
        var t = [],
          n = U(this, e.line).markedSpans;
        if (n)
          for (var r = 0; r < n.length; ++r) {
            var i = n[r];
            (i.from == null || i.from <= e.ch) &&
              (i.to == null || i.to >= e.ch) &&
              t.push(i.marker.parent || i.marker);
          }
        return t;
      },
      findMarks: function (e, t, n) {
        (e = fe(this, e)), (t = fe(this, t));
        var r = [],
          i = e.line;
        return (
          this.iter(e.line, t.line + 1, function (o) {
            var l = o.markedSpans;
            if (l)
              for (var a = 0; a < l.length; a++) {
                var s = l[a];
                !(
                  (s.to != null && i == e.line && e.ch >= s.to) ||
                  (s.from == null && i != e.line) ||
                  (s.from != null && i == t.line && s.from >= t.ch)
                ) &&
                  (!n || n(s.marker)) &&
                  r.push(s.marker.parent || s.marker);
              }
            ++i;
          }),
          r
        );
      },
      getAllMarks: function () {
        var e = [];
        return (
          this.iter(function (t) {
            var n = t.markedSpans;
            if (n)
              for (var r = 0; r < n.length; ++r)
                n[r].from != null && e.push(n[r].marker);
          }),
          e
        );
      },
      posFromIndex: function (e) {
        var t,
          n = this.first,
          r = this.lineSeparator().length;
        return (
          this.iter(function (i) {
            var o = i.text.length + r;
            if (o > e) return (t = e), !0;
            (e -= o), ++n;
          }),
          fe(this, k(n, t))
        );
      },
      indexFromPos: function (e) {
        e = fe(this, e);
        var t = e.ch;
        if (e.line < this.first || e.ch < 0) return 0;
        var n = this.lineSeparator().length;
        return (
          this.iter(this.first, e.line, function (r) {
            t += r.text.length + n;
          }),
          t
        );
      },
      copy: function (e) {
        var t = new xt(
          un(this, this.first, this.first + this.size),
          this.modeOption,
          this.first,
          this.lineSep,
          this.direction,
        );
        return (
          (t.scrollTop = this.scrollTop),
          (t.scrollLeft = this.scrollLeft),
          (t.sel = this.sel),
          (t.extend = !1),
          e &&
            ((t.history.undoDepth = this.history.undoDepth),
            t.setHistory(this.getHistory())),
          t
        );
      },
      linkedDoc: function (e) {
        e || (e = {});
        var t = this.first,
          n = this.first + this.size;
        e.from != null && e.from > t && (t = e.from),
          e.to != null && e.to < n && (n = e.to);
        var r = new xt(
          un(this, t, n),
          e.mode || this.modeOption,
          t,
          this.lineSep,
          this.direction,
        );
        return (
          e.sharedHist && (r.history = this.history),
          (this.linked || (this.linked = [])).push({
            doc: r,
            sharedHist: e.sharedHist,
          }),
          (r.linked = [{ doc: this, isParent: !0, sharedHist: e.sharedHist }]),
          Es(r, Hl(this)),
          r
        );
      },
      unlinkDoc: function (e) {
        if ((e instanceof Be && (e = e.doc), this.linked))
          for (var t = 0; t < this.linked.length; ++t) {
            var n = this.linked[t];
            if (n.doc == e) {
              this.linked.splice(t, 1), e.unlinkDoc(this), Is(Hl(this));
              break;
            }
          }
        if (e.history == this.history) {
          var r = [e.id];
          hr(
            e,
            function (i) {
              return r.push(i.id);
            },
            !0,
          ),
            (e.history = new ni(null)),
            (e.history.done = Yr(this.history.done, r)),
            (e.history.undone = Yr(this.history.undone, r));
        }
      },
      iterLinkedDocs: function (e) {
        hr(this, e);
      },
      getMode: function () {
        return this.mode;
      },
      getEditor: function () {
        return this.cm;
      },
      splitLines: function (e) {
        return this.lineSep ? e.split(this.lineSep) : Pt(e);
      },
      lineSeparator: function () {
        return (
          this.lineSep ||
          `
`
        );
      },
      setDirection: nt(function (e) {
        e != "rtl" && (e = "ltr"),
          e != this.direction &&
            ((this.direction = e),
            this.iter(function (t) {
              return (t.order = null);
            }),
            this.cm && Cs(this.cm));
      }),
    })),
      (xt.prototype.eachLine = xt.prototype.iter);
    var Bl = 0;
    function Ws(e) {
      var t = this;
      if ((Rl(t), !(qe(t, e) || Vt(t.display, e)))) {
        ft(e), M && (Bl = +new Date());
        var n = kr(t, e, !0),
          r = e.dataTransfer.files;
        if (!(!n || t.isReadOnly()))
          if (r && r.length && window.FileReader && window.File)
            for (
              var i = r.length,
                o = Array(i),
                l = 0,
                a = function () {
                  ++l == i &&
                    rt(t, function () {
                      n = fe(t.doc, n);
                      var y = {
                        from: n,
                        to: n,
                        text: t.doc.splitLines(
                          o
                            .filter(function (S) {
                              return S != null;
                            })
                            .join(t.doc.lineSeparator()),
                        ),
                        origin: "paste",
                      };
                      Jr(t.doc, y),
                        Tl(t.doc, cr(fe(t.doc, n), fe(t.doc, dr(y))));
                    })();
                },
                s = function (y, S) {
                  if (
                    t.options.allowDropFileTypes &&
                    G(t.options.allowDropFileTypes, y.type) == -1
                  ) {
                    a();
                    return;
                  }
                  var N = new FileReader();
                  (N.onerror = function () {
                    return a();
                  }),
                    (N.onload = function () {
                      var z = N.result;
                      if (/[\x00-\x08\x0e-\x1f]{2}/.test(z)) {
                        a();
                        return;
                      }
                      (o[S] = z), a();
                    }),
                    N.readAsText(y);
                },
                u = 0;
              u < r.length;
              u++
            )
              s(r[u], u);
          else {
            if (t.state.draggingText && t.doc.sel.contains(n) > -1) {
              t.state.draggingText(e),
                setTimeout(function () {
                  return t.display.input.focus();
                }, 20);
              return;
            }
            try {
              var d = e.dataTransfer.getData("Text");
              if (d) {
                var p;
                if (
                  (t.state.draggingText &&
                    !t.state.draggingText.copy &&
                    (p = t.listSelections()),
                  li(t.doc, cr(n, n)),
                  p)
                )
                  for (var m = 0; m < p.length; ++m)
                    Qr(t.doc, "", p[m].anchor, p[m].head, "drag");
                t.replaceSelection(d, "around", "paste"),
                  t.display.input.focus();
              }
            } catch {}
          }
      }
    }
    function _s(e, t) {
      if (M && (!e.state.draggingText || +new Date() - Bl < 100)) {
        ir(t);
        return;
      }
      if (
        !(qe(e, t) || Vt(e.display, t)) &&
        (t.dataTransfer.setData("Text", e.getSelection()),
        (t.dataTransfer.effectAllowed = "copyMove"),
        t.dataTransfer.setDragImage && !Ie)
      ) {
        var n = c("img", null, null, "position: fixed; left: 0; top: 0;");
        (n.src =
          "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
          ce &&
            ((n.width = n.height = 1),
            e.display.wrapper.appendChild(n),
            (n._top = n.offsetTop)),
          t.dataTransfer.setDragImage(n, 0, 0),
          ce && n.parentNode.removeChild(n);
      }
    }
    function Hs(e, t) {
      var n = kr(e, t);
      if (n) {
        var r = document.createDocumentFragment();
        Wi(e, n, r),
          e.display.dragCursor ||
            ((e.display.dragCursor = c(
              "div",
              null,
              "CodeMirror-cursors CodeMirror-dragcursors",
            )),
            e.display.lineSpace.insertBefore(
              e.display.dragCursor,
              e.display.cursorDiv,
            )),
          H(e.display.dragCursor, r);
      }
    }
    function Rl(e) {
      e.display.dragCursor &&
        (e.display.lineSpace.removeChild(e.display.dragCursor),
        (e.display.dragCursor = null));
    }
    function Kl(e) {
      if (document.getElementsByClassName) {
        for (
          var t = document.getElementsByClassName("CodeMirror"), n = [], r = 0;
          r < t.length;
          r++
        ) {
          var i = t[r].CodeMirror;
          i && n.push(i);
        }
        n.length &&
          n[0].operation(function () {
            for (var o = 0; o < n.length; o++) e(n[o]);
          });
      }
    }
    var Ul = !1;
    function Bs() {
      Ul || (Rs(), (Ul = !0));
    }
    function Rs() {
      var e;
      J(window, "resize", function () {
        e == null &&
          (e = setTimeout(function () {
            (e = null), Kl(Ks);
          }, 100));
      }),
        J(window, "blur", function () {
          return Kl(qr);
        });
    }
    function Ks(e) {
      var t = e.display;
      (t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null),
        (t.scrollbarsClipped = !1),
        e.setSize();
    }
    for (
      var vr = {
          3: "Pause",
          8: "Backspace",
          9: "Tab",
          13: "Enter",
          16: "Shift",
          17: "Ctrl",
          18: "Alt",
          19: "Pause",
          20: "CapsLock",
          27: "Esc",
          32: "Space",
          33: "PageUp",
          34: "PageDown",
          35: "End",
          36: "Home",
          37: "Left",
          38: "Up",
          39: "Right",
          40: "Down",
          44: "PrintScrn",
          45: "Insert",
          46: "Delete",
          59: ";",
          61: "=",
          91: "Mod",
          92: "Mod",
          93: "Mod",
          106: "*",
          107: "=",
          109: "-",
          110: ".",
          111: "/",
          145: "ScrollLock",
          173: "-",
          186: ";",
          187: "=",
          188: ",",
          189: "-",
          190: ".",
          191: "/",
          192: "`",
          219: "[",
          220: "\\",
          221: "]",
          222: "'",
          224: "Mod",
          63232: "Up",
          63233: "Down",
          63234: "Left",
          63235: "Right",
          63272: "Delete",
          63273: "Home",
          63275: "End",
          63276: "PageUp",
          63277: "PageDown",
          63302: "Insert",
        },
        An = 0;
      An < 10;
      An++
    )
      vr[An + 48] = vr[An + 96] = String(An);
    for (var ui = 65; ui <= 90; ui++) vr[ui] = String.fromCharCode(ui);
    for (var On = 1; On <= 12; On++) vr[On + 111] = vr[On + 63235] = "F" + On;
    var er = {};
    (er.basic = {
      Left: "goCharLeft",
      Right: "goCharRight",
      Up: "goLineUp",
      Down: "goLineDown",
      End: "goLineEnd",
      Home: "goLineStartSmart",
      PageUp: "goPageUp",
      PageDown: "goPageDown",
      Delete: "delCharAfter",
      Backspace: "delCharBefore",
      "Shift-Backspace": "delCharBefore",
      Tab: "defaultTab",
      "Shift-Tab": "indentAuto",
      Enter: "newlineAndIndent",
      Insert: "toggleOverwrite",
      Esc: "singleSelection",
    }),
      (er.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Up": "goLineUp",
        "Ctrl-Down": "goLineDown",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        "Ctrl-U": "undoSelection",
        "Shift-Ctrl-U": "redoSelection",
        "Alt-U": "redoSelection",
        fallthrough: "basic",
      }),
      (er.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars",
        "Ctrl-O": "openLine",
      }),
      (er.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Home": "goDocStart",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineLeft",
        "Cmd-Right": "goLineRight",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delWrappedLineLeft",
        "Cmd-Delete": "delWrappedLineRight",
        "Cmd-U": "undoSelection",
        "Shift-Cmd-U": "redoSelection",
        "Ctrl-Up": "goDocStart",
        "Ctrl-Down": "goDocEnd",
        fallthrough: ["basic", "emacsy"],
      }),
      (er.default = xe ? er.macDefault : er.pcDefault);
    function Us(e) {
      var t = e.split(/-(?!$)/);
      e = t[t.length - 1];
      for (var n, r, i, o, l = 0; l < t.length - 1; l++) {
        var a = t[l];
        if (/^(cmd|meta|m)$/i.test(a)) o = !0;
        else if (/^a(lt)?$/i.test(a)) n = !0;
        else if (/^(c|ctrl|control)$/i.test(a)) r = !0;
        else if (/^s(hift)?$/i.test(a)) i = !0;
        else throw new Error("Unrecognized modifier name: " + a);
      }
      return (
        n && (e = "Alt-" + e),
        r && (e = "Ctrl-" + e),
        o && (e = "Cmd-" + e),
        i && (e = "Shift-" + e),
        e
      );
    }
    function Gs(e) {
      var t = {};
      for (var n in e)
        if (e.hasOwnProperty(n)) {
          var r = e[n];
          if (/^(name|fallthrough|(de|at)tach)$/.test(n)) continue;
          if (r == "...") {
            delete e[n];
            continue;
          }
          for (var i = Ne(n.split(" "), Us), o = 0; o < i.length; o++) {
            var l = void 0,
              a = void 0;
            o == i.length - 1
              ? ((a = i.join(" ")), (l = r))
              : ((a = i.slice(0, o + 1).join(" ")), (l = "..."));
            var s = t[a];
            if (!s) t[a] = l;
            else if (s != l) throw new Error("Inconsistent bindings for " + a);
          }
          delete e[n];
        }
      for (var u in t) e[u] = t[u];
      return e;
    }
    function $r(e, t, n, r) {
      t = fi(t);
      var i = t.call ? t.call(e, r) : t[e];
      if (i === !1) return "nothing";
      if (i === "...") return "multi";
      if (i != null && n(i)) return "handled";
      if (t.fallthrough) {
        if (Object.prototype.toString.call(t.fallthrough) != "[object Array]")
          return $r(e, t.fallthrough, n, r);
        for (var o = 0; o < t.fallthrough.length; o++) {
          var l = $r(e, t.fallthrough[o], n, r);
          if (l) return l;
        }
      }
    }
    function Gl(e) {
      var t = typeof e == "string" ? e : vr[e.keyCode];
      return t == "Ctrl" || t == "Alt" || t == "Shift" || t == "Mod";
    }
    function ql(e, t, n) {
      var r = e;
      return (
        t.altKey && r != "Alt" && (e = "Alt-" + e),
        (He ? t.metaKey : t.ctrlKey) && r != "Ctrl" && (e = "Ctrl-" + e),
        (He ? t.ctrlKey : t.metaKey) && r != "Mod" && (e = "Cmd-" + e),
        !n && t.shiftKey && r != "Shift" && (e = "Shift-" + e),
        e
      );
    }
    function jl(e, t) {
      if (ce && e.keyCode == 34 && e.char) return !1;
      var n = vr[e.keyCode];
      return n == null || e.altGraphKey
        ? !1
        : (e.keyCode == 3 && e.code && (n = e.code), ql(n, e, t));
    }
    function fi(e) {
      return typeof e == "string" ? er[e] : e;
    }
    function en(e, t) {
      for (var n = e.doc.sel.ranges, r = [], i = 0; i < n.length; i++) {
        for (var o = t(n[i]); r.length && I(o.from, re(r).to) <= 0; ) {
          var l = r.pop();
          if (I(l.from, o.from) < 0) {
            o.from = l.from;
            break;
          }
        }
        r.push(o);
      }
      Mt(e, function () {
        for (var a = r.length - 1; a >= 0; a--)
          Qr(e.doc, "", r[a].from, r[a].to, "+delete");
        jr(e);
      });
    }
    function eo(e, t, n) {
      var r = Tt(e.text, t + n, n);
      return r < 0 || r > e.text.length ? null : r;
    }
    function to(e, t, n) {
      var r = eo(e, t.ch, n);
      return r == null ? null : new k(t.line, r, n < 0 ? "after" : "before");
    }
    function ro(e, t, n, r, i) {
      if (e) {
        t.doc.direction == "rtl" && (i = -i);
        var o = ke(n, t.doc.direction);
        if (o) {
          var l = i < 0 ? re(o) : o[0],
            a = i < 0 == (l.level == 1),
            s = a ? "after" : "before",
            u;
          if (l.level > 0 || t.doc.direction == "rtl") {
            var d = Kr(t, n);
            u = i < 0 ? n.text.length - 1 : 0;
            var p = jt(t, d, u).top;
            (u = Ot(
              function (m) {
                return jt(t, d, m).top == p;
              },
              i < 0 == (l.level == 1) ? l.from : l.to - 1,
              u,
            )),
              s == "before" && (u = eo(n, u, 1));
          } else u = i < 0 ? l.to : l.from;
          return new k(r, u, s);
        }
      }
      return new k(r, i < 0 ? n.text.length : 0, i < 0 ? "before" : "after");
    }
    function qs(e, t, n, r) {
      var i = ke(t, e.doc.direction);
      if (!i) return to(t, n, r);
      n.ch >= t.text.length
        ? ((n.ch = t.text.length), (n.sticky = "before"))
        : n.ch <= 0 && ((n.ch = 0), (n.sticky = "after"));
      var o = nr(i, n.ch, n.sticky),
        l = i[o];
      if (
        e.doc.direction == "ltr" &&
        l.level % 2 == 0 &&
        (r > 0 ? l.to > n.ch : l.from < n.ch)
      )
        return to(t, n, r);
      var a = function (P, W) {
          return eo(t, P instanceof k ? P.ch : P, W);
        },
        s,
        u = function (P) {
          return e.options.lineWrapping
            ? ((s = s || Kr(e, t)), Qo(e, t, s, P))
            : { begin: 0, end: t.text.length };
        },
        d = u(n.sticky == "before" ? a(n, -1) : n.ch);
      if (e.doc.direction == "rtl" || l.level == 1) {
        var p = (l.level == 1) == r < 0,
          m = a(n, p ? 1 : -1);
        if (
          m != null &&
          (p ? m <= l.to && m <= d.end : m >= l.from && m >= d.begin)
        ) {
          var y = p ? "before" : "after";
          return new k(n.line, m, y);
        }
      }
      var S = function (P, W, E) {
          for (
            var B = function (Fe, it) {
              return it
                ? new k(n.line, a(Fe, 1), "before")
                : new k(n.line, Fe, "after");
            };
            P >= 0 && P < i.length;
            P += W
          ) {
            var Q = i[P],
              Z = W > 0 == (Q.level != 1),
              ge = Z ? E.begin : a(E.end, -1);
            if (
              (Q.from <= ge && ge < Q.to) ||
              ((ge = Z ? Q.from : a(Q.to, -1)), E.begin <= ge && ge < E.end)
            )
              return B(ge, Z);
          }
        },
        N = S(o + r, r, d);
      if (N) return N;
      var z = r > 0 ? d.end : a(d.begin, -1);
      return z != null &&
        !(r > 0 && z == t.text.length) &&
        ((N = S(r > 0 ? 0 : i.length - 1, r, u(z))), N)
        ? N
        : null;
    }
    var zn = {
      selectAll: Al,
      singleSelection: function (e) {
        return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), st);
      },
      killLine: function (e) {
        return en(e, function (t) {
          if (t.empty()) {
            var n = U(e.doc, t.head.line).text.length;
            return t.head.ch == n && t.head.line < e.lastLine()
              ? { from: t.head, to: k(t.head.line + 1, 0) }
              : { from: t.head, to: k(t.head.line, n) };
          } else return { from: t.from(), to: t.to() };
        });
      },
      deleteLine: function (e) {
        return en(e, function (t) {
          return {
            from: k(t.from().line, 0),
            to: fe(e.doc, k(t.to().line + 1, 0)),
          };
        });
      },
      delLineLeft: function (e) {
        return en(e, function (t) {
          return { from: k(t.from().line, 0), to: t.from() };
        });
      },
      delWrappedLineLeft: function (e) {
        return en(e, function (t) {
          var n = e.charCoords(t.head, "div").top + 5,
            r = e.coordsChar({ left: 0, top: n }, "div");
          return { from: r, to: t.from() };
        });
      },
      delWrappedLineRight: function (e) {
        return en(e, function (t) {
          var n = e.charCoords(t.head, "div").top + 5,
            r = e.coordsChar(
              { left: e.display.lineDiv.offsetWidth + 100, top: n },
              "div",
            );
          return { from: t.from(), to: r };
        });
      },
      undo: function (e) {
        return e.undo();
      },
      redo: function (e) {
        return e.redo();
      },
      undoSelection: function (e) {
        return e.undoSelection();
      },
      redoSelection: function (e) {
        return e.redoSelection();
      },
      goDocStart: function (e) {
        return e.extendSelection(k(e.firstLine(), 0));
      },
      goDocEnd: function (e) {
        return e.extendSelection(k(e.lastLine()));
      },
      goLineStart: function (e) {
        return e.extendSelectionsBy(
          function (t) {
            return Xl(e, t.head.line);
          },
          { origin: "+move", bias: 1 },
        );
      },
      goLineStartSmart: function (e) {
        return e.extendSelectionsBy(
          function (t) {
            return Yl(e, t.head);
          },
          { origin: "+move", bias: 1 },
        );
      },
      goLineEnd: function (e) {
        return e.extendSelectionsBy(
          function (t) {
            return js(e, t.head.line);
          },
          { origin: "+move", bias: -1 },
        );
      },
      goLineRight: function (e) {
        return e.extendSelectionsBy(function (t) {
          var n = e.cursorCoords(t.head, "div").top + 5;
          return e.coordsChar(
            { left: e.display.lineDiv.offsetWidth + 100, top: n },
            "div",
          );
        }, Le);
      },
      goLineLeft: function (e) {
        return e.extendSelectionsBy(function (t) {
          var n = e.cursorCoords(t.head, "div").top + 5;
          return e.coordsChar({ left: 0, top: n }, "div");
        }, Le);
      },
      goLineLeftSmart: function (e) {
        return e.extendSelectionsBy(function (t) {
          var n = e.cursorCoords(t.head, "div").top + 5,
            r = e.coordsChar({ left: 0, top: n }, "div");
          return r.ch < e.getLine(r.line).search(/\S/) ? Yl(e, t.head) : r;
        }, Le);
      },
      goLineUp: function (e) {
        return e.moveV(-1, "line");
      },
      goLineDown: function (e) {
        return e.moveV(1, "line");
      },
      goPageUp: function (e) {
        return e.moveV(-1, "page");
      },
      goPageDown: function (e) {
        return e.moveV(1, "page");
      },
      goCharLeft: function (e) {
        return e.moveH(-1, "char");
      },
      goCharRight: function (e) {
        return e.moveH(1, "char");
      },
      goColumnLeft: function (e) {
        return e.moveH(-1, "column");
      },
      goColumnRight: function (e) {
        return e.moveH(1, "column");
      },
      goWordLeft: function (e) {
        return e.moveH(-1, "word");
      },
      goGroupRight: function (e) {
        return e.moveH(1, "group");
      },
      goGroupLeft: function (e) {
        return e.moveH(-1, "group");
      },
      goWordRight: function (e) {
        return e.moveH(1, "word");
      },
      delCharBefore: function (e) {
        return e.deleteH(-1, "codepoint");
      },
      delCharAfter: function (e) {
        return e.deleteH(1, "char");
      },
      delWordBefore: function (e) {
        return e.deleteH(-1, "word");
      },
      delWordAfter: function (e) {
        return e.deleteH(1, "word");
      },
      delGroupBefore: function (e) {
        return e.deleteH(-1, "group");
      },
      delGroupAfter: function (e) {
        return e.deleteH(1, "group");
      },
      indentAuto: function (e) {
        return e.indentSelection("smart");
      },
      indentMore: function (e) {
        return e.indentSelection("add");
      },
      indentLess: function (e) {
        return e.indentSelection("subtract");
      },
      insertTab: function (e) {
        return e.replaceSelection("	");
      },
      insertSoftTab: function (e) {
        for (
          var t = [], n = e.listSelections(), r = e.options.tabSize, i = 0;
          i < n.length;
          i++
        ) {
          var o = n[i].from(),
            l = he(e.getLine(o.line), o.ch, r);
          t.push(ht(r - (l % r)));
        }
        e.replaceSelections(t);
      },
      defaultTab: function (e) {
        e.somethingSelected()
          ? e.indentSelection("add")
          : e.execCommand("insertTab");
      },
      transposeChars: function (e) {
        return Mt(e, function () {
          for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++)
            if (t[r].empty()) {
              var i = t[r].head,
                o = U(e.doc, i.line).text;
              if (o) {
                if (
                  (i.ch == o.length && (i = new k(i.line, i.ch - 1)), i.ch > 0)
                )
                  (i = new k(i.line, i.ch + 1)),
                    e.replaceRange(
                      o.charAt(i.ch - 1) + o.charAt(i.ch - 2),
                      k(i.line, i.ch - 2),
                      i,
                      "+transpose",
                    );
                else if (i.line > e.doc.first) {
                  var l = U(e.doc, i.line - 1).text;
                  l &&
                    ((i = new k(i.line, 1)),
                    e.replaceRange(
                      o.charAt(0) +
                        e.doc.lineSeparator() +
                        l.charAt(l.length - 1),
                      k(i.line - 1, l.length - 1),
                      i,
                      "+transpose",
                    ));
                }
              }
              n.push(new Ae(i, i));
            }
          e.setSelections(n);
        });
      },
      newlineAndIndent: function (e) {
        return Mt(e, function () {
          for (var t = e.listSelections(), n = t.length - 1; n >= 0; n--)
            e.replaceRange(
              e.doc.lineSeparator(),
              t[n].anchor,
              t[n].head,
              "+input",
            );
          t = e.listSelections();
          for (var r = 0; r < t.length; r++)
            e.indentLine(t[r].from().line, null, !0);
          jr(e);
        });
      },
      openLine: function (e) {
        return e.replaceSelection(
          `
`,
          "start",
        );
      },
      toggleOverwrite: function (e) {
        return e.toggleOverwrite();
      },
    };
    function Xl(e, t) {
      var n = U(e.doc, t),
        r = Ht(n);
      return r != n && (t = f(r)), ro(!0, e, r, t, 1);
    }
    function js(e, t) {
      var n = U(e.doc, t),
        r = Da(n);
      return r != n && (t = f(r)), ro(!0, e, n, t, -1);
    }
    function Yl(e, t) {
      var n = Xl(e, t.line),
        r = U(e.doc, n.line),
        i = ke(r, e.doc.direction);
      if (!i || i[0].level == 0) {
        var o = Math.max(n.ch, r.text.search(/\S/)),
          l = t.line == n.line && t.ch <= o && t.ch;
        return k(n.line, l ? 0 : o, n.sticky);
      }
      return n;
    }
    function ci(e, t, n) {
      if (typeof t == "string" && ((t = zn[t]), !t)) return !1;
      e.display.input.ensurePolled();
      var r = e.display.shift,
        i = !1;
      try {
        e.isReadOnly() && (e.state.suppressEdits = !0),
          n && (e.display.shift = !1),
          (i = t(e) != Ct);
      } finally {
        (e.display.shift = r), (e.state.suppressEdits = !1);
      }
      return i;
    }
    function Xs(e, t, n) {
      for (var r = 0; r < e.state.keyMaps.length; r++) {
        var i = $r(t, e.state.keyMaps[r], n, e);
        if (i) return i;
      }
      return (
        (e.options.extraKeys && $r(t, e.options.extraKeys, n, e)) ||
        $r(t, e.options.keyMap, n, e)
      );
    }
    var Ys = new ue();
    function Pn(e, t, n, r) {
      var i = e.state.keySeq;
      if (i) {
        if (Gl(t)) return "handled";
        if (
          (/\'$/.test(t)
            ? (e.state.keySeq = null)
            : Ys.set(50, function () {
                e.state.keySeq == i &&
                  ((e.state.keySeq = null), e.display.input.reset());
              }),
          Zl(e, i + " " + t, n, r))
        )
          return !0;
      }
      return Zl(e, t, n, r);
    }
    function Zl(e, t, n, r) {
      var i = Xs(e, t, r);
      return (
        i == "multi" && (e.state.keySeq = t),
        i == "handled" && tt(e, "keyHandled", e, t, n),
        (i == "handled" || i == "multi") && (ft(n), _i(e)),
        !!i
      );
    }
    function Jl(e, t) {
      var n = jl(t, !0);
      return n
        ? t.shiftKey && !e.state.keySeq
          ? Pn(e, "Shift-" + n, t, function (r) {
              return ci(e, r, !0);
            }) ||
            Pn(e, n, t, function (r) {
              if (typeof r == "string" ? /^go[A-Z]/.test(r) : r.motion)
                return ci(e, r);
            })
          : Pn(e, n, t, function (r) {
              return ci(e, r);
            })
        : !1;
    }
    function Zs(e, t, n) {
      return Pn(e, "'" + n + "'", t, function (r) {
        return ci(e, r, !0);
      });
    }
    var no = null;
    function Ql(e) {
      var t = this;
      if (
        !(e.target && e.target != t.display.input.getField()) &&
        ((t.curOp.focus = g(Re(t))), !qe(t, e))
      ) {
        M && j < 11 && e.keyCode == 27 && (e.returnValue = !1);
        var n = e.keyCode;
        t.display.shift = n == 16 || e.shiftKey;
        var r = Jl(t, e);
        ce &&
          ((no = r ? n : null),
          !r &&
            n == 88 &&
            !Hn &&
            (xe ? e.metaKey : e.ctrlKey) &&
            t.replaceSelection("", null, "cut")),
          Se &&
            !xe &&
            !r &&
            n == 46 &&
            e.shiftKey &&
            !e.ctrlKey &&
            document.execCommand &&
            document.execCommand("cut"),
          n == 18 &&
            !/\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) &&
            Js(t);
      }
    }
    function Js(e) {
      var t = e.display.lineDiv;
      D(t, "CodeMirror-crosshair");
      function n(r) {
        (r.keyCode == 18 || !r.altKey) &&
          (me(t, "CodeMirror-crosshair"),
          ut(document, "keyup", n),
          ut(document, "mouseover", n));
      }
      J(document, "keyup", n), J(document, "mouseover", n);
    }
    function Vl(e) {
      e.keyCode == 16 && (this.doc.sel.shift = !1), qe(this, e);
    }
    function $l(e) {
      var t = this;
      if (
        !(e.target && e.target != t.display.input.getField()) &&
        !(
          Vt(t.display, e) ||
          qe(t, e) ||
          (e.ctrlKey && !e.altKey) ||
          (xe && e.metaKey)
        )
      ) {
        var n = e.keyCode,
          r = e.charCode;
        if (ce && n == no) {
          (no = null), ft(e);
          return;
        }
        if (!(ce && (!e.which || e.which < 10) && Jl(t, e))) {
          var i = String.fromCharCode(r ?? n);
          i != "\b" && (Zs(t, e, i) || t.display.input.onKeyPress(e));
        }
      }
    }
    var Qs = 400,
      io = function (e, t, n) {
        (this.time = e), (this.pos = t), (this.button = n);
      };
    io.prototype.compare = function (e, t, n) {
      return this.time + Qs > e && I(t, this.pos) == 0 && n == this.button;
    };
    var En, In;
    function Vs(e, t) {
      var n = +new Date();
      return In && In.compare(n, e, t)
        ? ((En = In = null), "triple")
        : En && En.compare(n, e, t)
          ? ((In = new io(n, e, t)), (En = null), "double")
          : ((En = new io(n, e, t)), (In = null), "single");
    }
    function ea(e) {
      var t = this,
        n = t.display;
      if (!(qe(t, e) || (n.activeTouch && n.input.supportsTouch()))) {
        if ((n.input.ensurePolled(), (n.shift = e.shiftKey), Vt(n, e))) {
          _ ||
            ((n.scroller.draggable = !1),
            setTimeout(function () {
              return (n.scroller.draggable = !0);
            }, 100));
          return;
        }
        if (!oo(t, e)) {
          var r = kr(t, e),
            i = It(e),
            o = r ? Vs(r, i) : "single";
          le(t).focus(),
            i == 1 && t.state.selectingText && t.state.selectingText(e),
            !(r && $s(t, i, r, o, e)) &&
              (i == 1
                ? r
                  ? tu(t, r, o, e)
                  : ln(e) == n.scroller && ft(e)
                : i == 2
                  ? (r && oi(t.doc, r),
                    setTimeout(function () {
                      return n.input.focus();
                    }, 20))
                  : i == 3 && (ee ? t.display.input.onContextMenu(e) : Hi(t)));
        }
      }
    }
    function $s(e, t, n, r, i) {
      var o = "Click";
      return (
        r == "double"
          ? (o = "Double" + o)
          : r == "triple" && (o = "Triple" + o),
        (o = (t == 1 ? "Left" : t == 2 ? "Middle" : "Right") + o),
        Pn(e, ql(o, i), i, function (l) {
          if ((typeof l == "string" && (l = zn[l]), !l)) return !1;
          var a = !1;
          try {
            e.isReadOnly() && (e.state.suppressEdits = !0), (a = l(e, n) != Ct);
          } finally {
            e.state.suppressEdits = !1;
          }
          return a;
        })
      );
    }
    function eu(e, t, n) {
      var r = e.getOption("configureMouse"),
        i = r ? r(e, t, n) : {};
      if (i.unit == null) {
        var o = _e ? n.shiftKey && n.metaKey : n.altKey;
        i.unit = o
          ? "rectangle"
          : t == "single"
            ? "char"
            : t == "double"
              ? "word"
              : "line";
      }
      return (
        (i.extend == null || e.doc.extend) &&
          (i.extend = e.doc.extend || n.shiftKey),
        i.addNew == null && (i.addNew = xe ? n.metaKey : n.ctrlKey),
        i.moveOnDrag == null && (i.moveOnDrag = !(xe ? n.altKey : n.ctrlKey)),
        i
      );
    }
    function tu(e, t, n, r) {
      M ? setTimeout(te(tl, e), 0) : (e.curOp.focus = g(Re(e)));
      var i = eu(e, n, r),
        o = e.doc.sel,
        l;
      e.options.dragDrop &&
      yi &&
      !e.isReadOnly() &&
      n == "single" &&
      (l = o.contains(t)) > -1 &&
      (I((l = o.ranges[l]).from(), t) < 0 || t.xRel > 0) &&
      (I(l.to(), t) > 0 || t.xRel < 0)
        ? ru(e, r, t, i)
        : nu(e, r, t, i);
    }
    function ru(e, t, n, r) {
      var i = e.display,
        o = !1,
        l = rt(e, function (u) {
          _ && (i.scroller.draggable = !1),
            (e.state.draggingText = !1),
            e.state.delayingBlurEvent &&
              (e.hasFocus() ? (e.state.delayingBlurEvent = !1) : Hi(e)),
            ut(i.wrapper.ownerDocument, "mouseup", l),
            ut(i.wrapper.ownerDocument, "mousemove", a),
            ut(i.scroller, "dragstart", s),
            ut(i.scroller, "drop", l),
            o ||
              (ft(u),
              r.addNew || oi(e.doc, n, null, null, r.extend),
              (_ && !Ie) || (M && j == 9)
                ? setTimeout(function () {
                    i.wrapper.ownerDocument.body.focus({ preventScroll: !0 }),
                      i.input.focus();
                  }, 20)
                : i.input.focus());
        }),
        a = function (u) {
          o =
            o ||
            Math.abs(t.clientX - u.clientX) + Math.abs(t.clientY - u.clientY) >=
              10;
        },
        s = function () {
          return (o = !0);
        };
      _ && (i.scroller.draggable = !0),
        (e.state.draggingText = l),
        (l.copy = !r.moveOnDrag),
        J(i.wrapper.ownerDocument, "mouseup", l),
        J(i.wrapper.ownerDocument, "mousemove", a),
        J(i.scroller, "dragstart", s),
        J(i.scroller, "drop", l),
        (e.state.delayingBlurEvent = !0),
        setTimeout(function () {
          return i.input.focus();
        }, 20),
        i.scroller.dragDrop && i.scroller.dragDrop();
    }
    function ta(e, t, n) {
      if (n == "char") return new Ae(t, t);
      if (n == "word") return e.findWordAt(t);
      if (n == "line") return new Ae(k(t.line, 0), fe(e.doc, k(t.line + 1, 0)));
      var r = n(e, t);
      return new Ae(r.from, r.to);
    }
    function nu(e, t, n, r) {
      M && Hi(e);
      var i = e.display,
        o = e.doc;
      ft(t);
      var l,
        a,
        s = o.sel,
        u = s.ranges;
      if (
        (r.addNew && !r.extend
          ? ((a = o.sel.contains(n)), a > -1 ? (l = u[a]) : (l = new Ae(n, n)))
          : ((l = o.sel.primary()), (a = o.sel.primIndex)),
        r.unit == "rectangle")
      )
        r.addNew || (l = new Ae(n, n)), (n = kr(e, t, !0, !0)), (a = -1);
      else {
        var d = ta(e, n, r.unit);
        r.extend ? (l = Vi(l, d.anchor, d.head, r.extend)) : (l = d);
      }
      r.addNew
        ? a == -1
          ? ((a = u.length),
            ct(o, Rt(e, u.concat([l]), a), { scroll: !1, origin: "*mouse" }))
          : u.length > 1 && u[a].empty() && r.unit == "char" && !r.extend
            ? (ct(o, Rt(e, u.slice(0, a).concat(u.slice(a + 1)), 0), {
                scroll: !1,
                origin: "*mouse",
              }),
              (s = o.sel))
            : $i(o, a, l, gt)
        : ((a = 0), ct(o, new At([l], 0), gt), (s = o.sel));
      var p = n;
      function m(E) {
        if (I(p, E) != 0)
          if (((p = E), r.unit == "rectangle")) {
            for (
              var B = [],
                Q = e.options.tabSize,
                Z = he(U(o, n.line).text, n.ch, Q),
                ge = he(U(o, E.line).text, E.ch, Q),
                Fe = Math.min(Z, ge),
                it = Math.max(Z, ge),
                Ue = Math.min(n.line, E.line),
                Nt = Math.min(e.lastLine(), Math.max(n.line, E.line));
              Ue <= Nt;
              Ue++
            ) {
              var wt = U(o, Ue).text,
                Ze = Ke(wt, Fe, Q);
              Fe == it
                ? B.push(new Ae(k(Ue, Ze), k(Ue, Ze)))
                : wt.length > Ze &&
                  B.push(new Ae(k(Ue, Ze), k(Ue, Ke(wt, it, Q))));
            }
            B.length || B.push(new Ae(n, n)),
              ct(o, Rt(e, s.ranges.slice(0, a).concat(B), a), {
                origin: "*mouse",
                scroll: !1,
              }),
              e.scrollIntoView(E);
          } else {
            var kt = l,
              at = ta(e, E, r.unit),
              $e = kt.anchor,
              Je;
            I(at.anchor, $e) > 0
              ? ((Je = at.head), ($e = Hr(kt.from(), at.anchor)))
              : ((Je = at.anchor), ($e = mt(kt.to(), at.head)));
            var Xe = s.ranges.slice(0);
            (Xe[a] = iu(e, new Ae(fe(o, $e), Je))), ct(o, Rt(e, Xe, a), gt);
          }
      }
      var y = i.wrapper.getBoundingClientRect(),
        S = 0;
      function N(E) {
        var B = ++S,
          Q = kr(e, E, !0, r.unit == "rectangle");
        if (Q)
          if (I(Q, p) != 0) {
            (e.curOp.focus = g(Re(e))), m(Q);
            var Z = $n(i, o);
            (Q.line >= Z.to || Q.line < Z.from) &&
              setTimeout(
                rt(e, function () {
                  S == B && N(E);
                }),
                150,
              );
          } else {
            var ge = E.clientY < y.top ? -20 : E.clientY > y.bottom ? 20 : 0;
            ge &&
              setTimeout(
                rt(e, function () {
                  S == B && ((i.scroller.scrollTop += ge), N(E));
                }),
                50,
              );
          }
      }
      function z(E) {
        (e.state.selectingText = !1),
          (S = 1 / 0),
          E && (ft(E), i.input.focus()),
          ut(i.wrapper.ownerDocument, "mousemove", P),
          ut(i.wrapper.ownerDocument, "mouseup", W),
          (o.history.lastSelOrigin = null);
      }
      var P = rt(e, function (E) {
          E.buttons === 0 || !It(E) ? z(E) : N(E);
        }),
        W = rt(e, z);
      (e.state.selectingText = W),
        J(i.wrapper.ownerDocument, "mousemove", P),
        J(i.wrapper.ownerDocument, "mouseup", W);
    }
    function iu(e, t) {
      var n = t.anchor,
        r = t.head,
        i = U(e.doc, n.line);
      if (I(n, r) == 0 && n.sticky == r.sticky) return t;
      var o = ke(i);
      if (!o) return t;
      var l = nr(o, n.ch, n.sticky),
        a = o[l];
      if (a.from != n.ch && a.to != n.ch) return t;
      var s = l + ((a.from == n.ch) == (a.level != 1) ? 0 : 1);
      if (s == 0 || s == o.length) return t;
      var u;
      if (r.line != n.line)
        u = (r.line - n.line) * (e.doc.direction == "ltr" ? 1 : -1) > 0;
      else {
        var d = nr(o, r.ch, r.sticky),
          p = d - l || (r.ch - n.ch) * (a.level == 1 ? -1 : 1);
        d == s - 1 || d == s ? (u = p < 0) : (u = p > 0);
      }
      var m = o[s + (u ? -1 : 0)],
        y = u == (m.level == 1),
        S = y ? m.from : m.to,
        N = y ? "after" : "before";
      return n.ch == S && n.sticky == N ? t : new Ae(new k(n.line, S, N), r);
    }
    function ra(e, t, n, r) {
      var i, o;
      if (t.touches) (i = t.touches[0].clientX), (o = t.touches[0].clientY);
      else
        try {
          (i = t.clientX), (o = t.clientY);
        } catch {
          return !1;
        }
      if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right))
        return !1;
      r && ft(t);
      var l = e.display,
        a = l.lineDiv.getBoundingClientRect();
      if (o > a.bottom || !Lt(e, n)) return yt(t);
      o -= a.top - l.viewOffset;
      for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
        var u = l.gutters.childNodes[s];
        if (u && u.getBoundingClientRect().right >= i) {
          var d = h(e.doc, o),
            p = e.display.gutterSpecs[s];
          return Ge(e, n, e, d, p.className, t), yt(t);
        }
      }
    }
    function oo(e, t) {
      return ra(e, t, "gutterClick", !0);
    }
    function na(e, t) {
      Vt(e.display, t) ||
        ou(e, t) ||
        qe(e, t, "contextmenu") ||
        ee ||
        e.display.input.onContextMenu(t);
    }
    function ou(e, t) {
      return Lt(e, "gutterContextMenu")
        ? ra(e, t, "gutterContextMenu", !1)
        : !1;
    }
    function ia(e) {
      (e.display.wrapper.className =
        e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") +
        e.options.theme.replace(/(^|\s)\s*/g, " cm-s-")),
        vn(e);
    }
    var tn = {
        toString: function () {
          return "CodeMirror.Init";
        },
      },
      oa = {},
      di = {};
    function lu(e) {
      var t = e.optionHandlers;
      function n(r, i, o, l) {
        (e.defaults[r] = i),
          o &&
            (t[r] = l
              ? function (a, s, u) {
                  u != tn && o(a, s, u);
                }
              : o);
      }
      (e.defineOption = n),
        (e.Init = tn),
        n(
          "value",
          "",
          function (r, i) {
            return r.setValue(i);
          },
          !0,
        ),
        n(
          "mode",
          null,
          function (r, i) {
            (r.doc.modeOption = i), Zi(r);
          },
          !0,
        ),
        n("indentUnit", 2, Zi, !0),
        n("indentWithTabs", !1),
        n("smartIndent", !0),
        n(
          "tabSize",
          4,
          function (r) {
            Sn(r), vn(r), bt(r);
          },
          !0,
        ),
        n("lineSeparator", null, function (r, i) {
          if (((r.doc.lineSep = i), !!i)) {
            var o = [],
              l = r.doc.first;
            r.doc.iter(function (s) {
              for (var u = 0; ; ) {
                var d = s.text.indexOf(i, u);
                if (d == -1) break;
                (u = d + i.length), o.push(k(l, d));
              }
              l++;
            });
            for (var a = o.length - 1; a >= 0; a--)
              Qr(r.doc, i, o[a], k(o[a].line, o[a].ch + i.length));
          }
        }),
        n(
          "specialChars",
          /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g,
          function (r, i, o) {
            (r.state.specialChars = new RegExp(
              i.source + (i.test("	") ? "" : "|	"),
              "g",
            )),
              o != tn && r.refresh();
          },
        ),
        n(
          "specialCharPlaceholder",
          Ia,
          function (r) {
            return r.refresh();
          },
          !0,
        ),
        n("electricChars", !0),
        n(
          "inputStyle",
          oe ? "contenteditable" : "textarea",
          function () {
            throw new Error(
              "inputStyle can not (yet) be changed in a running editor",
            );
          },
          !0,
        ),
        n(
          "spellcheck",
          !1,
          function (r, i) {
            return (r.getInputField().spellcheck = i);
          },
          !0,
        ),
        n(
          "autocorrect",
          !1,
          function (r, i) {
            return (r.getInputField().autocorrect = i);
          },
          !0,
        ),
        n(
          "autocapitalize",
          !1,
          function (r, i) {
            return (r.getInputField().autocapitalize = i);
          },
          !0,
        ),
        n("rtlMoveVisually", !ye),
        n("wholeLineUpdateBefore", !0),
        n(
          "theme",
          "default",
          function (r) {
            ia(r), kn(r);
          },
          !0,
        ),
        n("keyMap", "default", function (r, i, o) {
          var l = fi(i),
            a = o != tn && fi(o);
          a && a.detach && a.detach(r, l), l.attach && l.attach(r, a || null);
        }),
        n("extraKeys", null),
        n("configureMouse", null),
        n("lineWrapping", !1, su, !0),
        n(
          "gutters",
          [],
          function (r, i) {
            (r.display.gutterSpecs = Xi(i, r.options.lineNumbers)), kn(r);
          },
          !0,
        ),
        n(
          "fixedGutter",
          !0,
          function (r, i) {
            (r.display.gutters.style.left = i ? Ii(r.display) + "px" : "0"),
              r.refresh();
          },
          !0,
        ),
        n(
          "coverGutterNextToScrollbar",
          !1,
          function (r) {
            return Xr(r);
          },
          !0,
        ),
        n(
          "scrollbarStyle",
          "native",
          function (r) {
            al(r),
              Xr(r),
              r.display.scrollbars.setScrollTop(r.doc.scrollTop),
              r.display.scrollbars.setScrollLeft(r.doc.scrollLeft);
          },
          !0,
        ),
        n(
          "lineNumbers",
          !1,
          function (r, i) {
            (r.display.gutterSpecs = Xi(r.options.gutters, i)), kn(r);
          },
          !0,
        ),
        n("firstLineNumber", 1, kn, !0),
        n(
          "lineNumberFormatter",
          function (r) {
            return r;
          },
          kn,
          !0,
        ),
        n("showCursorWhenSelecting", !1, gn, !0),
        n("resetSelectionOnContextMenu", !0),
        n("lineWiseCopyCut", !0),
        n("pasteLinesPerSelection", !0),
        n("selectionsMayTouch", !1),
        n("readOnly", !1, function (r, i) {
          i == "nocursor" && (qr(r), r.display.input.blur()),
            r.display.input.readOnlyChanged(i);
        }),
        n("screenReaderLabel", null, function (r, i) {
          (i = i === "" ? null : i),
            r.display.input.screenReaderLabelChanged(i);
        }),
        n(
          "disableInput",
          !1,
          function (r, i) {
            i || r.display.input.reset();
          },
          !0,
        ),
        n("dragDrop", !0, au),
        n("allowDropFileTypes", null),
        n("cursorBlinkRate", 530),
        n("cursorScrollMargin", 0),
        n("cursorHeight", 1, gn, !0),
        n("singleCursorHeightPerLine", !0, gn, !0),
        n("workTime", 100),
        n("workDelay", 100),
        n("flattenSpans", !0, Sn, !0),
        n("addModeClass", !1, Sn, !0),
        n("pollInterval", 100),
        n("undoDepth", 200, function (r, i) {
          return (r.doc.history.undoDepth = i);
        }),
        n("historyEventDelay", 1250),
        n(
          "viewportMargin",
          10,
          function (r) {
            return r.refresh();
          },
          !0,
        ),
        n("maxHighlightLength", 1e4, Sn, !0),
        n("moveInputWithCursor", !0, function (r, i) {
          i || r.display.input.resetPosition();
        }),
        n("tabindex", null, function (r, i) {
          return (r.display.input.getField().tabIndex = i || "");
        }),
        n("autofocus", null),
        n(
          "direction",
          "ltr",
          function (r, i) {
            return r.doc.setDirection(i);
          },
          !0,
        ),
        n("phrases", null);
    }
    function au(e, t, n) {
      var r = n && n != tn;
      if (!t != !r) {
        var i = e.display.dragFunctions,
          o = t ? J : ut;
        o(e.display.scroller, "dragstart", i.start),
          o(e.display.scroller, "dragenter", i.enter),
          o(e.display.scroller, "dragover", i.over),
          o(e.display.scroller, "dragleave", i.leave),
          o(e.display.scroller, "drop", i.drop);
      }
    }
    function su(e) {
      e.options.lineWrapping
        ? (D(e.display.wrapper, "CodeMirror-wrap"),
          (e.display.sizer.style.minWidth = ""),
          (e.display.sizerWidth = null))
        : (me(e.display.wrapper, "CodeMirror-wrap"), Ti(e)),
        Fi(e),
        bt(e),
        vn(e),
        setTimeout(function () {
          return Xr(e);
        }, 100);
    }
    function Be(e, t) {
      var n = this;
      if (!(this instanceof Be)) return new Be(e, t);
      (this.options = t = t ? de(t) : {}), de(oa, t, !1);
      var r = t.value;
      typeof r == "string"
        ? (r = new xt(r, t.mode, null, t.lineSeparator, t.direction))
        : t.mode && (r.modeOption = t.mode),
        (this.doc = r);
      var i = new Be.inputStyles[t.inputStyle](this),
        o = (this.display = new ws(e, r, i, t));
      (o.wrapper.CodeMirror = this),
        ia(this),
        t.lineWrapping &&
          (this.display.wrapper.className += " CodeMirror-wrap"),
        al(this),
        (this.state = {
          keyMaps: [],
          overlays: [],
          modeGen: 0,
          overwrite: !1,
          delayingBlurEvent: !1,
          focused: !1,
          suppressEdits: !1,
          pasteIncoming: -1,
          cutIncoming: -1,
          selectingText: !1,
          draggingText: !1,
          highlight: new ue(),
          keySeq: null,
          specialChars: null,
        }),
        t.autofocus && !oe && o.input.focus(),
        M &&
          j < 11 &&
          setTimeout(function () {
            return n.display.input.reset(!0);
          }, 20),
        uu(this),
        Bs(),
        Lr(this),
        (this.curOp.forceUpdate = !0),
        yl(this, r),
        (t.autofocus && !oe) || this.hasFocus()
          ? setTimeout(function () {
              n.hasFocus() && !n.state.focused && Bi(n);
            }, 20)
          : qr(this);
      for (var l in di) di.hasOwnProperty(l) && di[l](this, t[l], tn);
      fl(this), t.finishInit && t.finishInit(this);
      for (var a = 0; a < lo.length; ++a) lo[a](this);
      Mr(this),
        _ &&
          t.lineWrapping &&
          getComputedStyle(o.lineDiv).textRendering == "optimizelegibility" &&
          (o.lineDiv.style.textRendering = "auto");
    }
    (Be.defaults = oa), (Be.optionHandlers = di);
    function uu(e) {
      var t = e.display;
      J(t.scroller, "mousedown", rt(e, ea)),
        M && j < 11
          ? J(
              t.scroller,
              "dblclick",
              rt(e, function (s) {
                if (!qe(e, s)) {
                  var u = kr(e, s);
                  if (!(!u || oo(e, s) || Vt(e.display, s))) {
                    ft(s);
                    var d = e.findWordAt(u);
                    oi(e.doc, d.anchor, d.head);
                  }
                }
              }),
            )
          : J(t.scroller, "dblclick", function (s) {
              return qe(e, s) || ft(s);
            }),
        J(t.scroller, "contextmenu", function (s) {
          return na(e, s);
        }),
        J(t.input.getField(), "contextmenu", function (s) {
          t.scroller.contains(s.target) || na(e, s);
        });
      var n,
        r = { end: 0 };
      function i() {
        t.activeTouch &&
          ((n = setTimeout(function () {
            return (t.activeTouch = null);
          }, 1e3)),
          (r = t.activeTouch),
          (r.end = +new Date()));
      }
      function o(s) {
        if (s.touches.length != 1) return !1;
        var u = s.touches[0];
        return u.radiusX <= 1 && u.radiusY <= 1;
      }
      function l(s, u) {
        if (u.left == null) return !0;
        var d = u.left - s.left,
          p = u.top - s.top;
        return d * d + p * p > 20 * 20;
      }
      J(t.scroller, "touchstart", function (s) {
        if (!qe(e, s) && !o(s) && !oo(e, s)) {
          t.input.ensurePolled(), clearTimeout(n);
          var u = +new Date();
          (t.activeTouch = {
            start: u,
            moved: !1,
            prev: u - r.end <= 300 ? r : null,
          }),
            s.touches.length == 1 &&
              ((t.activeTouch.left = s.touches[0].pageX),
              (t.activeTouch.top = s.touches[0].pageY));
        }
      }),
        J(t.scroller, "touchmove", function () {
          t.activeTouch && (t.activeTouch.moved = !0);
        }),
        J(t.scroller, "touchend", function (s) {
          var u = t.activeTouch;
          if (
            u &&
            !Vt(t, s) &&
            u.left != null &&
            !u.moved &&
            new Date() - u.start < 300
          ) {
            var d = e.coordsChar(t.activeTouch, "page"),
              p;
            !u.prev || l(u, u.prev)
              ? (p = new Ae(d, d))
              : !u.prev.prev || l(u, u.prev.prev)
                ? (p = e.findWordAt(d))
                : (p = new Ae(k(d.line, 0), fe(e.doc, k(d.line + 1, 0)))),
              e.setSelection(p.anchor, p.head),
              e.focus(),
              ft(s);
          }
          i();
        }),
        J(t.scroller, "touchcancel", i),
        J(t.scroller, "scroll", function () {
          t.scroller.clientHeight &&
            (mn(e, t.scroller.scrollTop),
            Cr(e, t.scroller.scrollLeft, !0),
            Ge(e, "scroll", e));
        }),
        J(t.scroller, "mousewheel", function (s) {
          return hl(e, s);
        }),
        J(t.scroller, "DOMMouseScroll", function (s) {
          return hl(e, s);
        }),
        J(t.wrapper, "scroll", function () {
          return (t.wrapper.scrollTop = t.wrapper.scrollLeft = 0);
        }),
        (t.dragFunctions = {
          enter: function (s) {
            qe(e, s) || ir(s);
          },
          over: function (s) {
            qe(e, s) || (Hs(e, s), ir(s));
          },
          start: function (s) {
            return _s(e, s);
          },
          drop: rt(e, Ws),
          leave: function (s) {
            qe(e, s) || Rl(e);
          },
        });
      var a = t.input.getField();
      J(a, "keyup", function (s) {
        return Vl.call(e, s);
      }),
        J(a, "keydown", rt(e, Ql)),
        J(a, "keypress", rt(e, $l)),
        J(a, "focus", function (s) {
          return Bi(e, s);
        }),
        J(a, "blur", function (s) {
          return qr(e, s);
        });
    }
    var lo = [];
    Be.defineInitHook = function (e) {
      return lo.push(e);
    };
    function Fn(e, t, n, r) {
      var i = e.doc,
        o;
      n == null && (n = "add"),
        n == "smart" && (i.mode.indent ? (o = fn(e, t).state) : (n = "prev"));
      var l = e.options.tabSize,
        a = U(i, t),
        s = he(a.text, null, l);
      a.stateAfter && (a.stateAfter = null);
      var u = a.text.match(/^\s*/)[0],
        d;
      if (!r && !/\S/.test(a.text)) (d = 0), (n = "not");
      else if (
        n == "smart" &&
        ((d = i.mode.indent(o, a.text.slice(u.length), a.text)),
        d == Ct || d > 150)
      ) {
        if (!r) return;
        n = "prev";
      }
      n == "prev"
        ? t > i.first
          ? (d = he(U(i, t - 1).text, null, l))
          : (d = 0)
        : n == "add"
          ? (d = s + e.options.indentUnit)
          : n == "subtract"
            ? (d = s - e.options.indentUnit)
            : typeof n == "number" && (d = s + n),
        (d = Math.max(0, d));
      var p = "",
        m = 0;
      if (e.options.indentWithTabs)
        for (var y = Math.floor(d / l); y; --y) (m += l), (p += "	");
      if ((m < d && (p += ht(d - m)), p != u))
        return (
          Qr(i, p, k(t, 0), k(t, u.length), "+input"), (a.stateAfter = null), !0
        );
      for (var S = 0; S < i.sel.ranges.length; S++) {
        var N = i.sel.ranges[S];
        if (N.head.line == t && N.head.ch < u.length) {
          var z = k(t, u.length);
          $i(i, S, new Ae(z, z));
          break;
        }
      }
    }
    var Kt = null;
    function hi(e) {
      Kt = e;
    }
    function ao(e, t, n, r, i) {
      var o = e.doc;
      (e.display.shift = !1), r || (r = o.sel);
      var l = +new Date() - 200,
        a = i == "paste" || e.state.pasteIncoming > l,
        s = Pt(t),
        u = null;
      if (a && r.ranges.length > 1)
        if (
          Kt &&
          Kt.text.join(`
`) == t
        ) {
          if (r.ranges.length % Kt.text.length == 0) {
            u = [];
            for (var d = 0; d < Kt.text.length; d++)
              u.push(o.splitLines(Kt.text[d]));
          }
        } else
          s.length == r.ranges.length &&
            e.options.pasteLinesPerSelection &&
            (u = Ne(s, function (P) {
              return [P];
            }));
      for (var p = e.curOp.updateInput, m = r.ranges.length - 1; m >= 0; m--) {
        var y = r.ranges[m],
          S = y.from(),
          N = y.to();
        y.empty() &&
          (n && n > 0
            ? (S = k(S.line, S.ch - n))
            : e.state.overwrite && !a
              ? (N = k(
                  N.line,
                  Math.min(U(o, N.line).text.length, N.ch + re(s).length),
                ))
              : a &&
                Kt &&
                Kt.lineWise &&
                Kt.text.join(`
`) ==
                  s.join(`
`) &&
                (S = N = k(S.line, 0)));
        var z = {
          from: S,
          to: N,
          text: u ? u[m % u.length] : s,
          origin:
            i || (a ? "paste" : e.state.cutIncoming > l ? "cut" : "+input"),
        };
        Jr(e.doc, z), tt(e, "inputRead", e, z);
      }
      t && !a && aa(e, t),
        jr(e),
        e.curOp.updateInput < 2 && (e.curOp.updateInput = p),
        (e.curOp.typing = !0),
        (e.state.pasteIncoming = e.state.cutIncoming = -1);
    }
    function la(e, t) {
      var n = e.clipboardData && e.clipboardData.getData("Text");
      if (n)
        return (
          e.preventDefault(),
          !t.isReadOnly() &&
            !t.options.disableInput &&
            t.hasFocus() &&
            Mt(t, function () {
              return ao(t, n, 0, null, "paste");
            }),
          !0
        );
    }
    function aa(e, t) {
      if (!(!e.options.electricChars || !e.options.smartIndent))
        for (var n = e.doc.sel, r = n.ranges.length - 1; r >= 0; r--) {
          var i = n.ranges[r];
          if (
            !(
              i.head.ch > 100 ||
              (r && n.ranges[r - 1].head.line == i.head.line)
            )
          ) {
            var o = e.getModeAt(i.head),
              l = !1;
            if (o.electricChars) {
              for (var a = 0; a < o.electricChars.length; a++)
                if (t.indexOf(o.electricChars.charAt(a)) > -1) {
                  l = Fn(e, i.head.line, "smart");
                  break;
                }
            } else
              o.electricInput &&
                o.electricInput.test(
                  U(e.doc, i.head.line).text.slice(0, i.head.ch),
                ) &&
                (l = Fn(e, i.head.line, "smart"));
            l && tt(e, "electricInput", e, i.head.line);
          }
        }
    }
    function sa(e) {
      for (var t = [], n = [], r = 0; r < e.doc.sel.ranges.length; r++) {
        var i = e.doc.sel.ranges[r].head.line,
          o = { anchor: k(i, 0), head: k(i + 1, 0) };
        n.push(o), t.push(e.getRange(o.anchor, o.head));
      }
      return { text: t, ranges: n };
    }
    function so(e, t, n, r) {
      e.setAttribute("autocorrect", n ? "on" : "off"),
        e.setAttribute("autocapitalize", r ? "on" : "off"),
        e.setAttribute("spellcheck", !!t);
    }
    function ua() {
      var e = c(
          "textarea",
          null,
          null,
          "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none",
        ),
        t = c(
          "div",
          [e],
          null,
          "overflow: hidden; position: relative; width: 3px; height: 0px;",
        );
      return (
        _ ? (e.style.width = "1000px") : e.setAttribute("wrap", "off"),
        ae && (e.style.border = "1px solid black"),
        t
      );
    }
    function fu(e) {
      var t = e.optionHandlers,
        n = (e.helpers = {});
      (e.prototype = {
        constructor: e,
        focus: function () {
          le(this).focus(), this.display.input.focus();
        },
        setOption: function (r, i) {
          var o = this.options,
            l = o[r];
          (o[r] == i && r != "mode") ||
            ((o[r] = i),
            t.hasOwnProperty(r) && rt(this, t[r])(this, i, l),
            Ge(this, "optionChange", this, r));
        },
        getOption: function (r) {
          return this.options[r];
        },
        getDoc: function () {
          return this.doc;
        },
        addKeyMap: function (r, i) {
          this.state.keyMaps[i ? "push" : "unshift"](fi(r));
        },
        removeKeyMap: function (r) {
          for (var i = this.state.keyMaps, o = 0; o < i.length; ++o)
            if (i[o] == r || i[o].name == r) return i.splice(o, 1), !0;
        },
        addOverlay: pt(function (r, i) {
          var o = r.token ? r : e.getMode(this.options, r);
          if (o.startState) throw new Error("Overlays may not be stateful.");
          w(
            this.state.overlays,
            {
              mode: o,
              modeSpec: r,
              opaque: i && i.opaque,
              priority: (i && i.priority) || 0,
            },
            function (l) {
              return l.priority;
            },
          ),
            this.state.modeGen++,
            bt(this);
        }),
        removeOverlay: pt(function (r) {
          for (var i = this.state.overlays, o = 0; o < i.length; ++o) {
            var l = i[o].modeSpec;
            if (l == r || (typeof r == "string" && l.name == r)) {
              i.splice(o, 1), this.state.modeGen++, bt(this);
              return;
            }
          }
        }),
        indentLine: pt(function (r, i, o) {
          typeof i != "string" &&
            typeof i != "number" &&
            (i == null
              ? (i = this.options.smartIndent ? "smart" : "prev")
              : (i = i ? "add" : "subtract")),
            L(this.doc, r) && Fn(this, r, i, o);
        }),
        indentSelection: pt(function (r) {
          for (var i = this.doc.sel.ranges, o = -1, l = 0; l < i.length; l++) {
            var a = i[l];
            if (a.empty())
              a.head.line > o &&
                (Fn(this, a.head.line, r, !0),
                (o = a.head.line),
                l == this.doc.sel.primIndex && jr(this));
            else {
              var s = a.from(),
                u = a.to(),
                d = Math.max(o, s.line);
              o = Math.min(this.lastLine(), u.line - (u.ch ? 0 : 1)) + 1;
              for (var p = d; p < o; ++p) Fn(this, p, r);
              var m = this.doc.sel.ranges;
              s.ch == 0 &&
                i.length == m.length &&
                m[l].from().ch > 0 &&
                $i(this.doc, l, new Ae(s, m[l].to()), st);
            }
          }
        }),
        getTokenAt: function (r, i) {
          return bo(this, r, i);
        },
        getLineTokens: function (r, i) {
          return bo(this, k(r), i, !0);
        },
        getTokenTypeAt: function (r) {
          r = fe(this.doc, r);
          var i = go(this, U(this.doc, r.line)),
            o = 0,
            l = (i.length - 1) / 2,
            a = r.ch,
            s;
          if (a == 0) s = i[2];
          else
            for (;;) {
              var u = (o + l) >> 1;
              if ((u ? i[u * 2 - 1] : 0) >= a) l = u;
              else if (i[u * 2 + 1] < a) o = u + 1;
              else {
                s = i[u * 2 + 2];
                break;
              }
            }
          var d = s ? s.indexOf("overlay ") : -1;
          return d < 0 ? s : d == 0 ? null : s.slice(0, d - 1);
        },
        getModeAt: function (r) {
          var i = this.doc.mode;
          return i.innerMode
            ? e.innerMode(i, this.getTokenAt(r).state).mode
            : i;
        },
        getHelper: function (r, i) {
          return this.getHelpers(r, i)[0];
        },
        getHelpers: function (r, i) {
          var o = [];
          if (!n.hasOwnProperty(i)) return o;
          var l = n[i],
            a = this.getModeAt(r);
          if (typeof a[i] == "string") l[a[i]] && o.push(l[a[i]]);
          else if (a[i])
            for (var s = 0; s < a[i].length; s++) {
              var u = l[a[i][s]];
              u && o.push(u);
            }
          else
            a.helperType && l[a.helperType]
              ? o.push(l[a.helperType])
              : l[a.name] && o.push(l[a.name]);
          for (var d = 0; d < l._global.length; d++) {
            var p = l._global[d];
            p.pred(a, this) && G(o, p.val) == -1 && o.push(p.val);
          }
          return o;
        },
        getStateAfter: function (r, i) {
          var o = this.doc;
          return (
            (r = ho(o, r ?? o.first + o.size - 1)), fn(this, r + 1, i).state
          );
        },
        cursorCoords: function (r, i) {
          var o,
            l = this.doc.sel.primary();
          return (
            r == null
              ? (o = l.head)
              : typeof r == "object"
                ? (o = fe(this.doc, r))
                : (o = r ? l.from() : l.to()),
            Bt(this, o, i || "page")
          );
        },
        charCoords: function (r, i) {
          return Zn(this, fe(this.doc, r), i || "page");
        },
        coordsChar: function (r, i) {
          return (r = Yo(this, r, i || "page")), zi(this, r.left, r.top);
        },
        lineAtHeight: function (r, i) {
          return (
            (r = Yo(this, { top: r, left: 0 }, i || "page").top),
            h(this.doc, r + this.display.viewOffset)
          );
        },
        heightAtLine: function (r, i, o) {
          var l = !1,
            a;
          if (typeof r == "number") {
            var s = this.doc.first + this.doc.size - 1;
            r < this.doc.first
              ? (r = this.doc.first)
              : r > s && ((r = s), (l = !0)),
              (a = U(this.doc, r));
          } else a = r;
          return (
            Yn(this, a, { top: 0, left: 0 }, i || "page", o || l).top +
            (l ? this.doc.height - Qt(a) : 0)
          );
        },
        defaultTextHeight: function () {
          return Ur(this.display);
        },
        defaultCharWidth: function () {
          return Gr(this.display);
        },
        getViewport: function () {
          return { from: this.display.viewFrom, to: this.display.viewTo };
        },
        addWidget: function (r, i, o, l, a) {
          var s = this.display;
          r = Bt(this, fe(this.doc, r));
          var u = r.bottom,
            d = r.left;
          if (
            ((i.style.position = "absolute"),
            i.setAttribute("cm-ignore-events", "true"),
            this.display.input.setUneditable(i),
            s.sizer.appendChild(i),
            l == "over")
          )
            u = r.top;
          else if (l == "above" || l == "near") {
            var p = Math.max(s.wrapper.clientHeight, this.doc.height),
              m = Math.max(s.sizer.clientWidth, s.lineSpace.clientWidth);
            (l == "above" || r.bottom + i.offsetHeight > p) &&
            r.top > i.offsetHeight
              ? (u = r.top - i.offsetHeight)
              : r.bottom + i.offsetHeight <= p && (u = r.bottom),
              d + i.offsetWidth > m && (d = m - i.offsetWidth);
          }
          (i.style.top = u + "px"),
            (i.style.left = i.style.right = ""),
            a == "right"
              ? ((d = s.sizer.clientWidth - i.offsetWidth),
                (i.style.right = "0px"))
              : (a == "left"
                  ? (d = 0)
                  : a == "middle" &&
                    (d = (s.sizer.clientWidth - i.offsetWidth) / 2),
                (i.style.left = d + "px")),
            o &&
              as(this, {
                left: d,
                top: u,
                right: d + i.offsetWidth,
                bottom: u + i.offsetHeight,
              });
        },
        triggerOnKeyDown: pt(Ql),
        triggerOnKeyPress: pt($l),
        triggerOnKeyUp: Vl,
        triggerOnMouseDown: pt(ea),
        execCommand: function (r) {
          if (zn.hasOwnProperty(r)) return zn[r].call(null, this);
        },
        triggerElectric: pt(function (r) {
          aa(this, r);
        }),
        findPosH: function (r, i, o, l) {
          var a = 1;
          i < 0 && ((a = -1), (i = -i));
          for (
            var s = fe(this.doc, r), u = 0;
            u < i && ((s = uo(this.doc, s, a, o, l)), !s.hitSide);
            ++u
          );
          return s;
        },
        moveH: pt(function (r, i) {
          var o = this;
          this.extendSelectionsBy(function (l) {
            return o.display.shift || o.doc.extend || l.empty()
              ? uo(o.doc, l.head, r, i, o.options.rtlMoveVisually)
              : r < 0
                ? l.from()
                : l.to();
          }, Le);
        }),
        deleteH: pt(function (r, i) {
          var o = this.doc.sel,
            l = this.doc;
          o.somethingSelected()
            ? l.replaceSelection("", null, "+delete")
            : en(this, function (a) {
                var s = uo(l, a.head, r, i, !1);
                return r < 0
                  ? { from: s, to: a.head }
                  : { from: a.head, to: s };
              });
        }),
        findPosV: function (r, i, o, l) {
          var a = 1,
            s = l;
          i < 0 && ((a = -1), (i = -i));
          for (var u = fe(this.doc, r), d = 0; d < i; ++d) {
            var p = Bt(this, u, "div");
            if (
              (s == null ? (s = p.left) : (p.left = s),
              (u = fa(this, p, a, o)),
              u.hitSide)
            )
              break;
          }
          return u;
        },
        moveV: pt(function (r, i) {
          var o = this,
            l = this.doc,
            a = [],
            s = !this.display.shift && !l.extend && l.sel.somethingSelected();
          if (
            (l.extendSelectionsBy(function (d) {
              if (s) return r < 0 ? d.from() : d.to();
              var p = Bt(o, d.head, "div");
              d.goalColumn != null && (p.left = d.goalColumn), a.push(p.left);
              var m = fa(o, p, r, i);
              return (
                i == "page" &&
                  d == l.sel.primary() &&
                  Ki(o, Zn(o, m, "div").top - p.top),
                m
              );
            }, Le),
            a.length)
          )
            for (var u = 0; u < l.sel.ranges.length; u++)
              l.sel.ranges[u].goalColumn = a[u];
        }),
        findWordAt: function (r) {
          var i = this.doc,
            o = U(i, r.line).text,
            l = r.ch,
            a = r.ch;
          if (o) {
            var s = this.getHelper(r, "wordChars");
            (r.sticky == "before" || a == o.length) && l ? --l : ++a;
            for (
              var u = o.charAt(l),
                d = ne(u, s)
                  ? function (p) {
                      return ne(p, s);
                    }
                  : /\s/.test(u)
                    ? function (p) {
                        return /\s/.test(p);
                      }
                    : function (p) {
                        return !/\s/.test(p) && !ne(p);
                      };
              l > 0 && d(o.charAt(l - 1));

            )
              --l;
            for (; a < o.length && d(o.charAt(a)); ) ++a;
          }
          return new Ae(k(r.line, l), k(r.line, a));
        },
        toggleOverwrite: function (r) {
          (r != null && r == this.state.overwrite) ||
            ((this.state.overwrite = !this.state.overwrite)
              ? D(this.display.cursorDiv, "CodeMirror-overwrite")
              : me(this.display.cursorDiv, "CodeMirror-overwrite"),
            Ge(this, "overwriteToggle", this, this.state.overwrite));
        },
        hasFocus: function () {
          return this.display.input.getField() == g(Re(this));
        },
        isReadOnly: function () {
          return !!(this.options.readOnly || this.doc.cantEdit);
        },
        scrollTo: pt(function (r, i) {
          yn(this, r, i);
        }),
        getScrollInfo: function () {
          var r = this.display.scroller;
          return {
            left: r.scrollLeft,
            top: r.scrollTop,
            height: r.scrollHeight - qt(this) - this.display.barHeight,
            width: r.scrollWidth - qt(this) - this.display.barWidth,
            clientHeight: Ni(this),
            clientWidth: xr(this),
          };
        },
        scrollIntoView: pt(function (r, i) {
          r == null
            ? ((r = { from: this.doc.sel.primary().head, to: null }),
              i == null && (i = this.options.cursorScrollMargin))
            : typeof r == "number"
              ? (r = { from: k(r, 0), to: null })
              : r.from == null && (r = { from: r, to: null }),
            r.to || (r.to = r.from),
            (r.margin = i || 0),
            r.from.line != null
              ? ss(this, r)
              : nl(this, r.from, r.to, r.margin);
        }),
        setSize: pt(function (r, i) {
          var o = this,
            l = function (s) {
              return typeof s == "number" || /^\d+$/.test(String(s))
                ? s + "px"
                : s;
            };
          r != null && (this.display.wrapper.style.width = l(r)),
            i != null && (this.display.wrapper.style.height = l(i)),
            this.options.lineWrapping && qo(this);
          var a = this.display.viewFrom;
          this.doc.iter(a, this.display.viewTo, function (s) {
            if (s.widgets) {
              for (var u = 0; u < s.widgets.length; u++)
                if (s.widgets[u].noHScroll) {
                  ur(o, a, "widget");
                  break;
                }
            }
            ++a;
          }),
            (this.curOp.forceUpdate = !0),
            Ge(this, "refresh", this);
        }),
        operation: function (r) {
          return Mt(this, r);
        },
        startOperation: function () {
          return Lr(this);
        },
        endOperation: function () {
          return Mr(this);
        },
        refresh: pt(function () {
          var r = this.display.cachedTextHeight;
          bt(this),
            (this.curOp.forceUpdate = !0),
            vn(this),
            yn(this, this.doc.scrollLeft, this.doc.scrollTop),
            qi(this.display),
            (r == null ||
              Math.abs(r - Ur(this.display)) > 0.5 ||
              this.options.lineWrapping) &&
              Fi(this),
            Ge(this, "refresh", this);
        }),
        swapDoc: pt(function (r) {
          var i = this.doc;
          return (
            (i.cm = null),
            this.state.selectingText && this.state.selectingText(),
            yl(this, r),
            vn(this),
            this.display.input.reset(),
            yn(this, r.scrollLeft, r.scrollTop),
            (this.curOp.forceScroll = !0),
            tt(this, "swapDoc", this, i),
            i
          );
        }),
        phrase: function (r) {
          var i = this.options.phrases;
          return i && Object.prototype.hasOwnProperty.call(i, r) ? i[r] : r;
        },
        getInputField: function () {
          return this.display.input.getField();
        },
        getWrapperElement: function () {
          return this.display.wrapper;
        },
        getScrollerElement: function () {
          return this.display.scroller;
        },
        getGutterElement: function () {
          return this.display.gutters;
        },
      }),
        Et(e),
        (e.registerHelper = function (r, i, o) {
          n.hasOwnProperty(r) || (n[r] = e[r] = { _global: [] }), (n[r][i] = o);
        }),
        (e.registerGlobalHelper = function (r, i, o, l) {
          e.registerHelper(r, i, l), n[r]._global.push({ pred: o, val: l });
        });
    }
    function uo(e, t, n, r, i) {
      var o = t,
        l = n,
        a = U(e, t.line),
        s = i && e.direction == "rtl" ? -n : n;
      function u() {
        var W = t.line + s;
        return W < e.first || W >= e.first + e.size
          ? !1
          : ((t = new k(W, t.ch, t.sticky)), (a = U(e, W)));
      }
      function d(W) {
        var E;
        if (r == "codepoint") {
          var B = a.text.charCodeAt(t.ch + (n > 0 ? 0 : -1));
          if (isNaN(B)) E = null;
          else {
            var Q = n > 0 ? B >= 55296 && B < 56320 : B >= 56320 && B < 57343;
            E = new k(
              t.line,
              Math.max(0, Math.min(a.text.length, t.ch + n * (Q ? 2 : 1))),
              -n,
            );
          }
        } else i ? (E = qs(e.cm, a, t, n)) : (E = to(a, t, n));
        if (E == null)
          if (!W && u()) t = ro(i, e.cm, a, t.line, s);
          else return !1;
        else t = E;
        return !0;
      }
      if (r == "char" || r == "codepoint") d();
      else if (r == "column") d(!0);
      else if (r == "word" || r == "group")
        for (
          var p = null,
            m = r == "group",
            y = e.cm && e.cm.getHelper(t, "wordChars"),
            S = !0;
          !(n < 0 && !d(!S));
          S = !1
        ) {
          var N =
              a.text.charAt(t.ch) ||
              `
`,
            z = ne(N, y)
              ? "w"
              : m &&
                  N ==
                    `
`
                ? "n"
                : !m || /\s/.test(N)
                  ? null
                  : "p";
          if ((m && !S && !z && (z = "s"), p && p != z)) {
            n < 0 && ((n = 1), d(), (t.sticky = "after"));
            break;
          }
          if ((z && (p = z), n > 0 && !d(!S))) break;
        }
      var P = ai(e, t, o, l, !0);
      return De(o, P) && (P.hitSide = !0), P;
    }
    function fa(e, t, n, r) {
      var i = e.doc,
        o = t.left,
        l;
      if (r == "page") {
        var a = Math.min(
            e.display.wrapper.clientHeight,
            le(e).innerHeight || i(e).documentElement.clientHeight,
          ),
          s = Math.max(a - 0.5 * Ur(e.display), 3);
        l = (n > 0 ? t.bottom : t.top) + n * s;
      } else r == "line" && (l = n > 0 ? t.bottom + 3 : t.top - 3);
      for (var u; (u = zi(e, o, l)), !!u.outside; ) {
        if (n < 0 ? l <= 0 : l >= i.height) {
          u.hitSide = !0;
          break;
        }
        l += n * 5;
      }
      return u;
    }
    var Pe = function (e) {
      (this.cm = e),
        (this.lastAnchorNode =
          this.lastAnchorOffset =
          this.lastFocusNode =
          this.lastFocusOffset =
            null),
        (this.polling = new ue()),
        (this.composing = null),
        (this.gracePeriod = !1),
        (this.readDOMTimeout = null);
    };
    (Pe.prototype.init = function (e) {
      var t = this,
        n = this,
        r = n.cm,
        i = (n.div = e.lineDiv);
      (i.contentEditable = !0),
        so(
          i,
          r.options.spellcheck,
          r.options.autocorrect,
          r.options.autocapitalize,
        );
      function o(a) {
        for (var s = a.target; s; s = s.parentNode) {
          if (s == i) return !0;
          if (/\bCodeMirror-(?:line)?widget\b/.test(s.className)) break;
        }
        return !1;
      }
      J(i, "paste", function (a) {
        !o(a) ||
          qe(r, a) ||
          la(a, r) ||
          (j <= 11 &&
            setTimeout(
              rt(r, function () {
                return t.updateFromDOM();
              }),
              20,
            ));
      }),
        J(i, "compositionstart", function (a) {
          t.composing = { data: a.data, done: !1 };
        }),
        J(i, "compositionupdate", function (a) {
          t.composing || (t.composing = { data: a.data, done: !1 });
        }),
        J(i, "compositionend", function (a) {
          t.composing &&
            (a.data != t.composing.data && t.readFromDOMSoon(),
            (t.composing.done = !0));
        }),
        J(i, "touchstart", function () {
          return n.forceCompositionEnd();
        }),
        J(i, "input", function () {
          t.composing || t.readFromDOMSoon();
        });
      function l(a) {
        if (!(!o(a) || qe(r, a))) {
          if (r.somethingSelected())
            hi({ lineWise: !1, text: r.getSelections() }),
              a.type == "cut" && r.replaceSelection("", null, "cut");
          else if (r.options.lineWiseCopyCut) {
            var s = sa(r);
            hi({ lineWise: !0, text: s.text }),
              a.type == "cut" &&
                r.operation(function () {
                  r.setSelections(s.ranges, 0, st),
                    r.replaceSelection("", null, "cut");
                });
          } else return;
          if (a.clipboardData) {
            a.clipboardData.clearData();
            var u = Kt.text.join(`
`);
            if (
              (a.clipboardData.setData("Text", u),
              a.clipboardData.getData("Text") == u)
            ) {
              a.preventDefault();
              return;
            }
          }
          var d = ua(),
            p = d.firstChild;
          so(p),
            r.display.lineSpace.insertBefore(d, r.display.lineSpace.firstChild),
            (p.value = Kt.text.join(`
`));
          var m = g(ze(i));
          $(p),
            setTimeout(function () {
              r.display.lineSpace.removeChild(d),
                m.focus(),
                m == i && n.showPrimarySelection();
            }, 50);
        }
      }
      J(i, "copy", l), J(i, "cut", l);
    }),
      (Pe.prototype.screenReaderLabelChanged = function (e) {
        e
          ? this.div.setAttribute("aria-label", e)
          : this.div.removeAttribute("aria-label");
      }),
      (Pe.prototype.prepareSelection = function () {
        var e = el(this.cm, !1);
        return (e.focus = g(ze(this.div)) == this.div), e;
      }),
      (Pe.prototype.showSelection = function (e, t) {
        !e ||
          !this.cm.display.view.length ||
          ((e.focus || t) && this.showPrimarySelection(),
          this.showMultipleSelections(e));
      }),
      (Pe.prototype.getSelection = function () {
        return this.cm.display.wrapper.ownerDocument.getSelection();
      }),
      (Pe.prototype.showPrimarySelection = function () {
        var e = this.getSelection(),
          t = this.cm,
          n = t.doc.sel.primary(),
          r = n.from(),
          i = n.to();
        if (
          t.display.viewTo == t.display.viewFrom ||
          r.line >= t.display.viewTo ||
          i.line < t.display.viewFrom
        ) {
          e.removeAllRanges();
          return;
        }
        var o = pi(t, e.anchorNode, e.anchorOffset),
          l = pi(t, e.focusNode, e.focusOffset);
        if (
          !(
            o &&
            !o.bad &&
            l &&
            !l.bad &&
            I(Hr(o, l), r) == 0 &&
            I(mt(o, l), i) == 0
          )
        ) {
          var a = t.display.view,
            s = (r.line >= t.display.viewFrom && ca(t, r)) || {
              node: a[0].measure.map[2],
              offset: 0,
            },
            u = i.line < t.display.viewTo && ca(t, i);
          if (!u) {
            var d = a[a.length - 1].measure,
              p = d.maps ? d.maps[d.maps.length - 1] : d.map;
            u = {
              node: p[p.length - 1],
              offset: p[p.length - 2] - p[p.length - 3],
            };
          }
          if (!s || !u) {
            e.removeAllRanges();
            return;
          }
          var m = e.rangeCount && e.getRangeAt(0),
            y;
          try {
            y = b(s.node, s.offset, u.offset, u.node);
          } catch {}
          y &&
            (!Se && t.state.focused
              ? (e.collapse(s.node, s.offset),
                y.collapsed || (e.removeAllRanges(), e.addRange(y)))
              : (e.removeAllRanges(), e.addRange(y)),
            m && e.anchorNode == null
              ? e.addRange(m)
              : Se && this.startGracePeriod()),
            this.rememberSelection();
        }
      }),
      (Pe.prototype.startGracePeriod = function () {
        var e = this;
        clearTimeout(this.gracePeriod),
          (this.gracePeriod = setTimeout(function () {
            (e.gracePeriod = !1),
              e.selectionChanged() &&
                e.cm.operation(function () {
                  return (e.cm.curOp.selectionChanged = !0);
                });
          }, 20));
      }),
      (Pe.prototype.showMultipleSelections = function (e) {
        H(this.cm.display.cursorDiv, e.cursors),
          H(this.cm.display.selectionDiv, e.selection);
      }),
      (Pe.prototype.rememberSelection = function () {
        var e = this.getSelection();
        (this.lastAnchorNode = e.anchorNode),
          (this.lastAnchorOffset = e.anchorOffset),
          (this.lastFocusNode = e.focusNode),
          (this.lastFocusOffset = e.focusOffset);
      }),
      (Pe.prototype.selectionInEditor = function () {
        var e = this.getSelection();
        if (!e.rangeCount) return !1;
        var t = e.getRangeAt(0).commonAncestorContainer;
        return v(this.div, t);
      }),
      (Pe.prototype.focus = function () {
        this.cm.options.readOnly != "nocursor" &&
          ((!this.selectionInEditor() || g(ze(this.div)) != this.div) &&
            this.showSelection(this.prepareSelection(), !0),
          this.div.focus());
      }),
      (Pe.prototype.blur = function () {
        this.div.blur();
      }),
      (Pe.prototype.getField = function () {
        return this.div;
      }),
      (Pe.prototype.supportsTouch = function () {
        return !0;
      }),
      (Pe.prototype.receivedFocus = function () {
        var e = this,
          t = this;
        this.selectionInEditor()
          ? setTimeout(function () {
              return e.pollSelection();
            }, 20)
          : Mt(this.cm, function () {
              return (t.cm.curOp.selectionChanged = !0);
            });
        function n() {
          t.cm.state.focused &&
            (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, n));
        }
        this.polling.set(this.cm.options.pollInterval, n);
      }),
      (Pe.prototype.selectionChanged = function () {
        var e = this.getSelection();
        return (
          e.anchorNode != this.lastAnchorNode ||
          e.anchorOffset != this.lastAnchorOffset ||
          e.focusNode != this.lastFocusNode ||
          e.focusOffset != this.lastFocusOffset
        );
      }),
      (Pe.prototype.pollSelection = function () {
        if (
          !(
            this.readDOMTimeout != null ||
            this.gracePeriod ||
            !this.selectionChanged()
          )
        ) {
          var e = this.getSelection(),
            t = this.cm;
          if (
            V &&
            q &&
            this.cm.display.gutterSpecs.length &&
            cu(e.anchorNode)
          ) {
            this.cm.triggerOnKeyDown({
              type: "keydown",
              keyCode: 8,
              preventDefault: Math.abs,
            }),
              this.blur(),
              this.focus();
            return;
          }
          if (!this.composing) {
            this.rememberSelection();
            var n = pi(t, e.anchorNode, e.anchorOffset),
              r = pi(t, e.focusNode, e.focusOffset);
            n &&
              r &&
              Mt(t, function () {
                ct(t.doc, cr(n, r), st),
                  (n.bad || r.bad) && (t.curOp.selectionChanged = !0);
              });
          }
        }
      }),
      (Pe.prototype.pollContent = function () {
        this.readDOMTimeout != null &&
          (clearTimeout(this.readDOMTimeout), (this.readDOMTimeout = null));
        var e = this.cm,
          t = e.display,
          n = e.doc.sel.primary(),
          r = n.from(),
          i = n.to();
        if (
          (r.ch == 0 &&
            r.line > e.firstLine() &&
            (r = k(r.line - 1, U(e.doc, r.line - 1).length)),
          i.ch == U(e.doc, i.line).text.length &&
            i.line < e.lastLine() &&
            (i = k(i.line + 1, 0)),
          r.line < t.viewFrom || i.line > t.viewTo - 1)
        )
          return !1;
        var o, l, a;
        r.line == t.viewFrom || (o = Sr(e, r.line)) == 0
          ? ((l = f(t.view[0].line)), (a = t.view[0].node))
          : ((l = f(t.view[o].line)), (a = t.view[o - 1].node.nextSibling));
        var s = Sr(e, i.line),
          u,
          d;
        if (
          (s == t.view.length - 1
            ? ((u = t.viewTo - 1), (d = t.lineDiv.lastChild))
            : ((u = f(t.view[s + 1].line) - 1),
              (d = t.view[s + 1].node.previousSibling)),
          !a)
        )
          return !1;
        for (
          var p = e.doc.splitLines(du(e, a, d, l, u)),
            m = Zt(e.doc, k(l, 0), k(u, U(e.doc, u).text.length));
          p.length > 1 && m.length > 1;

        )
          if (re(p) == re(m)) p.pop(), m.pop(), u--;
          else if (p[0] == m[0]) p.shift(), m.shift(), l++;
          else break;
        for (
          var y = 0,
            S = 0,
            N = p[0],
            z = m[0],
            P = Math.min(N.length, z.length);
          y < P && N.charCodeAt(y) == z.charCodeAt(y);

        )
          ++y;
        for (
          var W = re(p),
            E = re(m),
            B = Math.min(
              W.length - (p.length == 1 ? y : 0),
              E.length - (m.length == 1 ? y : 0),
            );
          S < B &&
          W.charCodeAt(W.length - S - 1) == E.charCodeAt(E.length - S - 1);

        )
          ++S;
        if (p.length == 1 && m.length == 1 && l == r.line)
          for (
            ;
            y &&
            y > r.ch &&
            W.charCodeAt(W.length - S - 1) == E.charCodeAt(E.length - S - 1);

          )
            y--, S++;
        (p[p.length - 1] = W.slice(0, W.length - S).replace(/^\u200b+/, "")),
          (p[0] = p[0].slice(y).replace(/\u200b+$/, ""));
        var Q = k(l, y),
          Z = k(u, m.length ? re(m).length - S : 0);
        if (p.length > 1 || p[0] || I(Q, Z))
          return Qr(e.doc, p, Q, Z, "+input"), !0;
      }),
      (Pe.prototype.ensurePolled = function () {
        this.forceCompositionEnd();
      }),
      (Pe.prototype.reset = function () {
        this.forceCompositionEnd();
      }),
      (Pe.prototype.forceCompositionEnd = function () {
        this.composing &&
          (clearTimeout(this.readDOMTimeout),
          (this.composing = null),
          this.updateFromDOM(),
          this.div.blur(),
          this.div.focus());
      }),
      (Pe.prototype.readFromDOMSoon = function () {
        var e = this;
        this.readDOMTimeout == null &&
          (this.readDOMTimeout = setTimeout(function () {
            if (((e.readDOMTimeout = null), e.composing))
              if (e.composing.done) e.composing = null;
              else return;
            e.updateFromDOM();
          }, 80));
      }),
      (Pe.prototype.updateFromDOM = function () {
        var e = this;
        (this.cm.isReadOnly() || !this.pollContent()) &&
          Mt(this.cm, function () {
            return bt(e.cm);
          });
      }),
      (Pe.prototype.setUneditable = function (e) {
        e.contentEditable = "false";
      }),
      (Pe.prototype.onKeyPress = function (e) {
        e.charCode == 0 ||
          this.composing ||
          (e.preventDefault(),
          this.cm.isReadOnly() ||
            rt(this.cm, ao)(
              this.cm,
              String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode),
              0,
            ));
      }),
      (Pe.prototype.readOnlyChanged = function (e) {
        this.div.contentEditable = String(e != "nocursor");
      }),
      (Pe.prototype.onContextMenu = function () {}),
      (Pe.prototype.resetPosition = function () {}),
      (Pe.prototype.needsContentAttribute = !0);
    function ca(e, t) {
      var n = Di(e, t.line);
      if (!n || n.hidden) return null;
      var r = U(e.doc, t.line),
        i = Bo(n, r, t.line),
        o = ke(r, e.doc.direction),
        l = "left";
      if (o) {
        var a = nr(o, t.ch);
        l = a % 2 ? "right" : "left";
      }
      var s = Uo(i.map, t.ch, l);
      return (s.offset = s.collapse == "right" ? s.end : s.start), s;
    }
    function cu(e) {
      for (var t = e; t; t = t.parentNode)
        if (/CodeMirror-gutter-wrapper/.test(t.className)) return !0;
      return !1;
    }
    function rn(e, t) {
      return t && (e.bad = !0), e;
    }
    function du(e, t, n, r, i) {
      var o = "",
        l = !1,
        a = e.doc.lineSeparator(),
        s = !1;
      function u(y) {
        return function (S) {
          return S.id == y;
        };
      }
      function d() {
        l && ((o += a), s && (o += a), (l = s = !1));
      }
      function p(y) {
        y && (d(), (o += y));
      }
      function m(y) {
        if (y.nodeType == 1) {
          var S = y.getAttribute("cm-text");
          if (S) {
            p(S);
            return;
          }
          var N = y.getAttribute("cm-marker"),
            z;
          if (N) {
            var P = e.findMarks(k(r, 0), k(i + 1, 0), u(+N));
            P.length &&
              (z = P[0].find(0)) &&
              p(Zt(e.doc, z.from, z.to).join(a));
            return;
          }
          if (y.getAttribute("contenteditable") == "false") return;
          var W = /^(pre|div|p|li|table|br)$/i.test(y.nodeName);
          if (!/^br$/i.test(y.nodeName) && y.textContent.length == 0) return;
          W && d();
          for (var E = 0; E < y.childNodes.length; E++) m(y.childNodes[E]);
          /^(pre|p)$/i.test(y.nodeName) && (s = !0), W && (l = !0);
        } else
          y.nodeType == 3 &&
            p(y.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
      }
      for (; m(t), t != n; ) (t = t.nextSibling), (s = !1);
      return o;
    }
    function pi(e, t, n) {
      var r;
      if (t == e.display.lineDiv) {
        if (((r = e.display.lineDiv.childNodes[n]), !r))
          return rn(e.clipPos(k(e.display.viewTo - 1)), !0);
        (t = null), (n = 0);
      } else
        for (r = t; ; r = r.parentNode) {
          if (!r || r == e.display.lineDiv) return null;
          if (r.parentNode && r.parentNode == e.display.lineDiv) break;
        }
      for (var i = 0; i < e.display.view.length; i++) {
        var o = e.display.view[i];
        if (o.node == r) return hu(o, t, n);
      }
    }
    function hu(e, t, n) {
      var r = e.text.firstChild,
        i = !1;
      if (!t || !v(r, t)) return rn(k(f(e.line), 0), !0);
      if (t == r && ((i = !0), (t = r.childNodes[n]), (n = 0), !t)) {
        var o = e.rest ? re(e.rest) : e.line;
        return rn(k(f(o), o.text.length), i);
      }
      var l = t.nodeType == 3 ? t : null,
        a = t;
      for (
        !l &&
        t.childNodes.length == 1 &&
        t.firstChild.nodeType == 3 &&
        ((l = t.firstChild), n && (n = l.nodeValue.length));
        a.parentNode != r;

      )
        a = a.parentNode;
      var s = e.measure,
        u = s.maps;
      function d(z, P, W) {
        for (var E = -1; E < (u ? u.length : 0); E++)
          for (var B = E < 0 ? s.map : u[E], Q = 0; Q < B.length; Q += 3) {
            var Z = B[Q + 2];
            if (Z == z || Z == P) {
              var ge = f(E < 0 ? e.line : e.rest[E]),
                Fe = B[Q] + W;
              return (W < 0 || Z != z) && (Fe = B[Q + (W ? 1 : 0)]), k(ge, Fe);
            }
          }
      }
      var p = d(l, a, n);
      if (p) return rn(p, i);
      for (
        var m = a.nextSibling, y = l ? l.nodeValue.length - n : 0;
        m;
        m = m.nextSibling
      ) {
        if (((p = d(m, m.firstChild, 0)), p)) return rn(k(p.line, p.ch - y), i);
        y += m.textContent.length;
      }
      for (var S = a.previousSibling, N = n; S; S = S.previousSibling) {
        if (((p = d(S, S.firstChild, -1)), p))
          return rn(k(p.line, p.ch + N), i);
        N += S.textContent.length;
      }
    }
    var Ye = function (e) {
      (this.cm = e),
        (this.prevInput = ""),
        (this.pollingFast = !1),
        (this.polling = new ue()),
        (this.hasSelection = !1),
        (this.composing = null),
        (this.resetting = !1);
    };
    (Ye.prototype.init = function (e) {
      var t = this,
        n = this,
        r = this.cm;
      this.createField(e);
      var i = this.textarea;
      e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild),
        ae && (i.style.width = "0px"),
        J(i, "input", function () {
          M && j >= 9 && t.hasSelection && (t.hasSelection = null), n.poll();
        }),
        J(i, "paste", function (l) {
          qe(r, l) ||
            la(l, r) ||
            ((r.state.pasteIncoming = +new Date()), n.fastPoll());
        });
      function o(l) {
        if (!qe(r, l)) {
          if (r.somethingSelected())
            hi({ lineWise: !1, text: r.getSelections() });
          else if (r.options.lineWiseCopyCut) {
            var a = sa(r);
            hi({ lineWise: !0, text: a.text }),
              l.type == "cut"
                ? r.setSelections(a.ranges, null, st)
                : ((n.prevInput = ""),
                  (i.value = a.text.join(`
`)),
                  $(i));
          } else return;
          l.type == "cut" && (r.state.cutIncoming = +new Date());
        }
      }
      J(i, "cut", o),
        J(i, "copy", o),
        J(e.scroller, "paste", function (l) {
          if (!(Vt(e, l) || qe(r, l))) {
            if (!i.dispatchEvent) {
              (r.state.pasteIncoming = +new Date()), n.focus();
              return;
            }
            var a = new Event("paste");
            (a.clipboardData = l.clipboardData), i.dispatchEvent(a);
          }
        }),
        J(e.lineSpace, "selectstart", function (l) {
          Vt(e, l) || ft(l);
        }),
        J(i, "compositionstart", function () {
          var l = r.getCursor("from");
          n.composing && n.composing.range.clear(),
            (n.composing = {
              start: l,
              range: r.markText(l, r.getCursor("to"), {
                className: "CodeMirror-composing",
              }),
            });
        }),
        J(i, "compositionend", function () {
          n.composing &&
            (n.poll(), n.composing.range.clear(), (n.composing = null));
        });
    }),
      (Ye.prototype.createField = function (e) {
        (this.wrapper = ua()), (this.textarea = this.wrapper.firstChild);
        var t = this.cm.options;
        so(this.textarea, t.spellcheck, t.autocorrect, t.autocapitalize);
      }),
      (Ye.prototype.screenReaderLabelChanged = function (e) {
        e
          ? this.textarea.setAttribute("aria-label", e)
          : this.textarea.removeAttribute("aria-label");
      }),
      (Ye.prototype.prepareSelection = function () {
        var e = this.cm,
          t = e.display,
          n = e.doc,
          r = el(e);
        if (e.options.moveInputWithCursor) {
          var i = Bt(e, n.sel.primary().head, "div"),
            o = t.wrapper.getBoundingClientRect(),
            l = t.lineDiv.getBoundingClientRect();
          (r.teTop = Math.max(
            0,
            Math.min(t.wrapper.clientHeight - 10, i.top + l.top - o.top),
          )),
            (r.teLeft = Math.max(
              0,
              Math.min(t.wrapper.clientWidth - 10, i.left + l.left - o.left),
            ));
        }
        return r;
      }),
      (Ye.prototype.showSelection = function (e) {
        var t = this.cm,
          n = t.display;
        H(n.cursorDiv, e.cursors),
          H(n.selectionDiv, e.selection),
          e.teTop != null &&
            ((this.wrapper.style.top = e.teTop + "px"),
            (this.wrapper.style.left = e.teLeft + "px"));
      }),
      (Ye.prototype.reset = function (e) {
        if (!(this.contextMenuPending || (this.composing && e))) {
          var t = this.cm;
          if (((this.resetting = !0), t.somethingSelected())) {
            this.prevInput = "";
            var n = t.getSelection();
            (this.textarea.value = n),
              t.state.focused && $(this.textarea),
              M && j >= 9 && (this.hasSelection = n);
          } else
            e ||
              ((this.prevInput = this.textarea.value = ""),
              M && j >= 9 && (this.hasSelection = null));
          this.resetting = !1;
        }
      }),
      (Ye.prototype.getField = function () {
        return this.textarea;
      }),
      (Ye.prototype.supportsTouch = function () {
        return !1;
      }),
      (Ye.prototype.focus = function () {
        if (
          this.cm.options.readOnly != "nocursor" &&
          (!oe || g(ze(this.textarea)) != this.textarea)
        )
          try {
            this.textarea.focus();
          } catch {}
      }),
      (Ye.prototype.blur = function () {
        this.textarea.blur();
      }),
      (Ye.prototype.resetPosition = function () {
        this.wrapper.style.top = this.wrapper.style.left = 0;
      }),
      (Ye.prototype.receivedFocus = function () {
        this.slowPoll();
      }),
      (Ye.prototype.slowPoll = function () {
        var e = this;
        this.pollingFast ||
          this.polling.set(this.cm.options.pollInterval, function () {
            e.poll(), e.cm.state.focused && e.slowPoll();
          });
      }),
      (Ye.prototype.fastPoll = function () {
        var e = !1,
          t = this;
        t.pollingFast = !0;
        function n() {
          var r = t.poll();
          !r && !e
            ? ((e = !0), t.polling.set(60, n))
            : ((t.pollingFast = !1), t.slowPoll());
        }
        t.polling.set(20, n);
      }),
      (Ye.prototype.poll = function () {
        var e = this,
          t = this.cm,
          n = this.textarea,
          r = this.prevInput;
        if (
          this.contextMenuPending ||
          this.resetting ||
          !t.state.focused ||
          (lr(n) && !r && !this.composing) ||
          t.isReadOnly() ||
          t.options.disableInput ||
          t.state.keySeq
        )
          return !1;
        var i = n.value;
        if (i == r && !t.somethingSelected()) return !1;
        if (
          (M && j >= 9 && this.hasSelection === i) ||
          (xe && /[\uf700-\uf7ff]/.test(i))
        )
          return t.display.input.reset(), !1;
        if (t.doc.sel == t.display.selForContextMenu) {
          var o = i.charCodeAt(0);
          if ((o == 8203 && !r && (r = "​"), o == 8666))
            return this.reset(), this.cm.execCommand("undo");
        }
        for (
          var l = 0, a = Math.min(r.length, i.length);
          l < a && r.charCodeAt(l) == i.charCodeAt(l);

        )
          ++l;
        return (
          Mt(t, function () {
            ao(
              t,
              i.slice(l),
              r.length - l,
              null,
              e.composing ? "*compose" : null,
            ),
              i.length > 1e3 ||
              i.indexOf(`
`) > -1
                ? (n.value = e.prevInput = "")
                : (e.prevInput = i),
              e.composing &&
                (e.composing.range.clear(),
                (e.composing.range = t.markText(
                  e.composing.start,
                  t.getCursor("to"),
                  { className: "CodeMirror-composing" },
                )));
          }),
          !0
        );
      }),
      (Ye.prototype.ensurePolled = function () {
        this.pollingFast && this.poll() && (this.pollingFast = !1);
      }),
      (Ye.prototype.onKeyPress = function () {
        M && j >= 9 && (this.hasSelection = null), this.fastPoll();
      }),
      (Ye.prototype.onContextMenu = function (e) {
        var t = this,
          n = t.cm,
          r = n.display,
          i = t.textarea;
        t.contextMenuPending && t.contextMenuPending();
        var o = kr(n, e),
          l = r.scroller.scrollTop;
        if (!o || ce) return;
        var a = n.options.resetSelectionOnContextMenu;
        a && n.doc.sel.contains(o) == -1 && rt(n, ct)(n.doc, cr(o), st);
        var s = i.style.cssText,
          u = t.wrapper.style.cssText,
          d = t.wrapper.offsetParent.getBoundingClientRect();
        (t.wrapper.style.cssText = "position: static"),
          (i.style.cssText =
            `position: absolute; width: 30px; height: 30px;
      top: ` +
            (e.clientY - d.top - 5) +
            "px; left: " +
            (e.clientX - d.left - 5) +
            `px;
      z-index: 1000; background: ` +
            (M ? "rgba(255, 255, 255, .05)" : "transparent") +
            `;
      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);`);
        var p;
        _ && (p = i.ownerDocument.defaultView.scrollY),
          r.input.focus(),
          _ && i.ownerDocument.defaultView.scrollTo(null, p),
          r.input.reset(),
          n.somethingSelected() || (i.value = t.prevInput = " "),
          (t.contextMenuPending = y),
          (r.selForContextMenu = n.doc.sel),
          clearTimeout(r.detectingSelectAll);
        function m() {
          if (i.selectionStart != null) {
            var N = n.somethingSelected(),
              z = "​" + (N ? i.value : "");
            (i.value = "⇚"),
              (i.value = z),
              (t.prevInput = N ? "" : "​"),
              (i.selectionStart = 1),
              (i.selectionEnd = z.length),
              (r.selForContextMenu = n.doc.sel);
          }
        }
        function y() {
          if (
            t.contextMenuPending == y &&
            ((t.contextMenuPending = !1),
            (t.wrapper.style.cssText = u),
            (i.style.cssText = s),
            M && j < 9 && r.scrollbars.setScrollTop((r.scroller.scrollTop = l)),
            i.selectionStart != null)
          ) {
            (!M || (M && j < 9)) && m();
            var N = 0,
              z = function () {
                r.selForContextMenu == n.doc.sel &&
                i.selectionStart == 0 &&
                i.selectionEnd > 0 &&
                t.prevInput == "​"
                  ? rt(n, Al)(n)
                  : N++ < 10
                    ? (r.detectingSelectAll = setTimeout(z, 500))
                    : ((r.selForContextMenu = null), r.input.reset());
              };
            r.detectingSelectAll = setTimeout(z, 200);
          }
        }
        if ((M && j >= 9 && m(), ee)) {
          ir(e);
          var S = function () {
            ut(window, "mouseup", S), setTimeout(y, 20);
          };
          J(window, "mouseup", S);
        } else setTimeout(y, 50);
      }),
      (Ye.prototype.readOnlyChanged = function (e) {
        e || this.reset(),
          (this.textarea.disabled = e == "nocursor"),
          (this.textarea.readOnly = !!e);
      }),
      (Ye.prototype.setUneditable = function () {}),
      (Ye.prototype.needsContentAttribute = !1);
    function pu(e, t) {
      if (
        ((t = t ? de(t) : {}),
        (t.value = e.value),
        !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex),
        !t.placeholder && e.placeholder && (t.placeholder = e.placeholder),
        t.autofocus == null)
      ) {
        var n = g(ze(e));
        t.autofocus =
          n == e || (e.getAttribute("autofocus") != null && n == document.body);
      }
      function r() {
        e.value = a.getValue();
      }
      var i;
      if (e.form && (J(e.form, "submit", r), !t.leaveSubmitMethodAlone)) {
        var o = e.form;
        i = o.submit;
        try {
          var l = (o.submit = function () {
            r(), (o.submit = i), o.submit(), (o.submit = l);
          });
        } catch {}
      }
      (t.finishInit = function (s) {
        (s.save = r),
          (s.getTextArea = function () {
            return e;
          }),
          (s.toTextArea = function () {
            (s.toTextArea = isNaN),
              r(),
              e.parentNode.removeChild(s.getWrapperElement()),
              (e.style.display = ""),
              e.form &&
                (ut(e.form, "submit", r),
                !t.leaveSubmitMethodAlone &&
                  typeof e.form.submit == "function" &&
                  (e.form.submit = i));
          });
      }),
        (e.style.display = "none");
      var a = Be(function (s) {
        return e.parentNode.insertBefore(s, e.nextSibling);
      }, t);
      return a;
    }
    function vu(e) {
      (e.off = ut),
        (e.on = J),
        (e.wheelEventPixels = ks),
        (e.Doc = xt),
        (e.splitLines = Pt),
        (e.countColumn = he),
        (e.findColumn = Ke),
        (e.isWordChar = R),
        (e.Pass = Ct),
        (e.signal = Ge),
        (e.Line = Br),
        (e.changeEnd = dr),
        (e.scrollbarModel = ll),
        (e.Pos = k),
        (e.cmpPos = I),
        (e.modes = Er),
        (e.mimeModes = Wt),
        (e.resolveMode = Ir),
        (e.getMode = Fr),
        (e.modeExtensions = ar),
        (e.extendMode = Wr),
        (e.copyState = Ut),
        (e.startState = _r),
        (e.innerMode = sn),
        (e.commands = zn),
        (e.keyMap = er),
        (e.keyName = jl),
        (e.isModifierKey = Gl),
        (e.lookupKey = $r),
        (e.normalizeKeyMap = Gs),
        (e.StringStream = je),
        (e.SharedTextMarker = Dn),
        (e.TextMarker = pr),
        (e.LineWidget = Nn),
        (e.e_preventDefault = ft),
        (e.e_stopPropagation = zr),
        (e.e_stop = ir),
        (e.addClass = D),
        (e.contains = v),
        (e.rmClass = me),
        (e.keyNames = vr);
    }
    lu(Be), fu(Be);
    var gu = "iter insert remove copy getEditor constructor".split(" ");
    for (var vi in xt.prototype)
      xt.prototype.hasOwnProperty(vi) &&
        G(gu, vi) < 0 &&
        (Be.prototype[vi] = (function (e) {
          return function () {
            return e.apply(this.doc, arguments);
          };
        })(xt.prototype[vi]));
    return (
      Et(xt),
      (Be.inputStyles = { textarea: Ye, contenteditable: Pe }),
      (Be.defineMode = function (e) {
        !Be.defaults.mode && e != "null" && (Be.defaults.mode = e),
          _t.apply(this, arguments);
      }),
      (Be.defineMIME = br),
      Be.defineMode("null", function () {
        return {
          token: function (e) {
            return e.skipToEnd();
          },
        };
      }),
      Be.defineMIME("text/plain", "null"),
      (Be.defineExtension = function (e, t) {
        Be.prototype[e] = t;
      }),
      (Be.defineDocExtension = function (e, t) {
        xt.prototype[e] = t;
      }),
      (Be.fromTextArea = pu),
      vu(Be),
      (Be.version = "5.65.15"),
      Be
    );
  });
})(ga);
var Ar = ga.exports;
const Su = yu(Ar);
var bu = { exports: {} };
(function (yr, Or) {
  (function (F) {
    F(Ar);
  })(function (F) {
    F.defineMode("css", function (ee, X) {
      var me = X.inline;
      X.propertyKeywords || (X = F.resolveMode("text/css"));
      var T = ee.indentUnit,
        H = X.tokenHooks,
        c = X.documentTypes || {},
        x = X.mediaTypes || {},
        b = X.mediaFeatures || {},
        v = X.mediaValueKeywords || {},
        g = X.propertyKeywords || {},
        D = X.nonStandardPropertyKeywords || {},
        K = X.fontProperties || {},
        $ = X.counterDescriptors || {},
        pe = X.colorKeywords || {},
        Re = X.valueKeywords || {},
        ze = X.allowNested,
        le = X.lineComment,
        te = X.supportsAtComponent === !0,
        de = ee.highlightNonStandardPropertyKeywords !== !1,
        he,
        ue;
      function G(w, A) {
        return (he = A), w;
      }
      function Ve(w, A) {
        var C = w.next();
        if (H[C]) {
          var be = H[C](w, A);
          if (be !== !1) return be;
        }
        if (C == "@") return w.eatWhile(/[\w\\\-]/), G("def", w.current());
        if (C == "=" || ((C == "~" || C == "|") && w.eat("=")))
          return G(null, "compare");
        if (C == '"' || C == "'") return (A.tokenize = Ct(C)), A.tokenize(w, A);
        if (C == "#") return w.eatWhile(/[\w\\\-]/), G("atom", "hash");
        if (C == "!") return w.match(/^\s*\w*/), G("keyword", "important");
        if (/\d/.test(C) || (C == "." && w.eat(/\d/)))
          return w.eatWhile(/[\w.%]/), G("number", "unit");
        if (C === "-") {
          if (/[\d.]/.test(w.peek()))
            return w.eatWhile(/[\w.%]/), G("number", "unit");
          if (w.match(/^-[\w\\\-]*/))
            return (
              w.eatWhile(/[\w\\\-]/),
              w.match(/^\s*:/, !1)
                ? G("variable-2", "variable-definition")
                : G("variable-2", "variable")
            );
          if (w.match(/^\w+-/)) return G("meta", "meta");
        } else
          return /[,+>*\/]/.test(C)
            ? G(null, "select-op")
            : C == "." && w.match(/^-?[_a-z][_a-z0-9-]*/i)
              ? G("qualifier", "qualifier")
              : /[:;{}\[\]\(\)]/.test(C)
                ? G(null, C)
                : w.match(/^[\w-.]+(?=\()/)
                  ? (/^(url(-prefix)?|domain|regexp)$/i.test(w.current()) &&
                      (A.tokenize = st),
                    G("variable callee", "variable"))
                  : /[\w\\\-]/.test(C)
                    ? (w.eatWhile(/[\w\\\-]/), G("property", "word"))
                    : G(null, null);
      }
      function Ct(w) {
        return function (A, C) {
          for (var be = !1, R; (R = A.next()) != null; ) {
            if (R == w && !be) {
              w == ")" && A.backUp(1);
              break;
            }
            be = !be && R == "\\";
          }
          return (
            (R == w || (!be && w != ")")) && (C.tokenize = null),
            G("string", "string")
          );
        };
      }
      function st(w, A) {
        return (
          w.next(),
          w.match(/^\s*[\"\')]/, !1)
            ? (A.tokenize = null)
            : (A.tokenize = Ct(")")),
          G(null, "(")
        );
      }
      function gt(w, A, C) {
        (this.type = w), (this.indent = A), (this.prev = C);
      }
      function Le(w, A, C, be) {
        return (
          (w.context = new gt(
            C,
            A.indentation() + (be === !1 ? 0 : T),
            w.context,
          )),
          C
        );
      }
      function Ke(w) {
        return w.context.prev && (w.context = w.context.prev), w.context.type;
      }
      function lt(w, A, C) {
        return Ne[C.context.type](w, A, C);
      }
      function ht(w, A, C, be) {
        for (var R = be || 1; R > 0; R--) C.context = C.context.prev;
        return lt(w, A, C);
      }
      function re(w) {
        var A = w.current().toLowerCase();
        Re.hasOwnProperty(A)
          ? (ue = "atom")
          : pe.hasOwnProperty(A)
            ? (ue = "keyword")
            : (ue = "variable");
      }
      var Ne = {};
      return (
        (Ne.top = function (w, A, C) {
          if (w == "{") return Le(C, A, "block");
          if (w == "}" && C.context.prev) return Ke(C);
          if (te && /@component/i.test(w)) return Le(C, A, "atComponentBlock");
          if (/^@(-moz-)?document$/i.test(w)) return Le(C, A, "documentTypes");
          if (/^@(media|supports|(-moz-)?document|import)$/i.test(w))
            return Le(C, A, "atBlock");
          if (/^@(font-face|counter-style)/i.test(w))
            return (C.stateArg = w), "restricted_atBlock_before";
          if (/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(w)) return "keyframes";
          if (w && w.charAt(0) == "@") return Le(C, A, "at");
          if (w == "hash") ue = "builtin";
          else if (w == "word") ue = "tag";
          else {
            if (w == "variable-definition") return "maybeprop";
            if (w == "interpolation") return Le(C, A, "interpolation");
            if (w == ":") return "pseudo";
            if (ze && w == "(") return Le(C, A, "parens");
          }
          return C.context.type;
        }),
        (Ne.block = function (w, A, C) {
          if (w == "word") {
            var be = A.current().toLowerCase();
            return g.hasOwnProperty(be)
              ? ((ue = "property"), "maybeprop")
              : D.hasOwnProperty(be)
                ? ((ue = de ? "string-2" : "property"), "maybeprop")
                : ze
                  ? ((ue = A.match(/^\s*:(?:\s|$)/, !1) ? "property" : "tag"),
                    "block")
                  : ((ue += " error"), "maybeprop");
          } else
            return w == "meta"
              ? "block"
              : !ze && (w == "hash" || w == "qualifier")
                ? ((ue = "error"), "block")
                : Ne.top(w, A, C);
        }),
        (Ne.maybeprop = function (w, A, C) {
          return w == ":" ? Le(C, A, "prop") : lt(w, A, C);
        }),
        (Ne.prop = function (w, A, C) {
          if (w == ";") return Ke(C);
          if (w == "{" && ze) return Le(C, A, "propBlock");
          if (w == "}" || w == "{") return ht(w, A, C);
          if (w == "(") return Le(C, A, "parens");
          if (
            w == "hash" &&
            !/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(
              A.current(),
            )
          )
            ue += " error";
          else if (w == "word") re(A);
          else if (w == "interpolation") return Le(C, A, "interpolation");
          return "prop";
        }),
        (Ne.propBlock = function (w, A, C) {
          return w == "}"
            ? Ke(C)
            : w == "word"
              ? ((ue = "property"), "maybeprop")
              : C.context.type;
        }),
        (Ne.parens = function (w, A, C) {
          return w == "{" || w == "}"
            ? ht(w, A, C)
            : w == ")"
              ? Ke(C)
              : w == "("
                ? Le(C, A, "parens")
                : w == "interpolation"
                  ? Le(C, A, "interpolation")
                  : (w == "word" && re(A), "parens");
        }),
        (Ne.pseudo = function (w, A, C) {
          return w == "meta"
            ? "pseudo"
            : w == "word"
              ? ((ue = "variable-3"), C.context.type)
              : lt(w, A, C);
        }),
        (Ne.documentTypes = function (w, A, C) {
          return w == "word" && c.hasOwnProperty(A.current())
            ? ((ue = "tag"), C.context.type)
            : Ne.atBlock(w, A, C);
        }),
        (Ne.atBlock = function (w, A, C) {
          if (w == "(") return Le(C, A, "atBlock_parens");
          if (w == "}" || w == ";") return ht(w, A, C);
          if (w == "{") return Ke(C) && Le(C, A, ze ? "block" : "top");
          if (w == "interpolation") return Le(C, A, "interpolation");
          if (w == "word") {
            var be = A.current().toLowerCase();
            be == "only" || be == "not" || be == "and" || be == "or"
              ? (ue = "keyword")
              : x.hasOwnProperty(be)
                ? (ue = "attribute")
                : b.hasOwnProperty(be)
                  ? (ue = "property")
                  : v.hasOwnProperty(be)
                    ? (ue = "keyword")
                    : g.hasOwnProperty(be)
                      ? (ue = "property")
                      : D.hasOwnProperty(be)
                        ? (ue = de ? "string-2" : "property")
                        : Re.hasOwnProperty(be)
                          ? (ue = "atom")
                          : pe.hasOwnProperty(be)
                            ? (ue = "keyword")
                            : (ue = "error");
          }
          return C.context.type;
        }),
        (Ne.atComponentBlock = function (w, A, C) {
          return w == "}"
            ? ht(w, A, C)
            : w == "{"
              ? Ke(C) && Le(C, A, ze ? "block" : "top", !1)
              : (w == "word" && (ue = "error"), C.context.type);
        }),
        (Ne.atBlock_parens = function (w, A, C) {
          return w == ")"
            ? Ke(C)
            : w == "{" || w == "}"
              ? ht(w, A, C, 2)
              : Ne.atBlock(w, A, C);
        }),
        (Ne.restricted_atBlock_before = function (w, A, C) {
          return w == "{"
            ? Le(C, A, "restricted_atBlock")
            : w == "word" && C.stateArg == "@counter-style"
              ? ((ue = "variable"), "restricted_atBlock_before")
              : lt(w, A, C);
        }),
        (Ne.restricted_atBlock = function (w, A, C) {
          return w == "}"
            ? ((C.stateArg = null), Ke(C))
            : w == "word"
              ? ((C.stateArg == "@font-face" &&
                  !K.hasOwnProperty(A.current().toLowerCase())) ||
                (C.stateArg == "@counter-style" &&
                  !$.hasOwnProperty(A.current().toLowerCase()))
                  ? (ue = "error")
                  : (ue = "property"),
                "maybeprop")
              : "restricted_atBlock";
        }),
        (Ne.keyframes = function (w, A, C) {
          return w == "word"
            ? ((ue = "variable"), "keyframes")
            : w == "{"
              ? Le(C, A, "top")
              : lt(w, A, C);
        }),
        (Ne.at = function (w, A, C) {
          return w == ";"
            ? Ke(C)
            : w == "{" || w == "}"
              ? ht(w, A, C)
              : (w == "word" ? (ue = "tag") : w == "hash" && (ue = "builtin"),
                "at");
        }),
        (Ne.interpolation = function (w, A, C) {
          return w == "}"
            ? Ke(C)
            : w == "{" || w == ";"
              ? ht(w, A, C)
              : (w == "word"
                  ? (ue = "variable")
                  : w != "variable" && w != "(" && w != ")" && (ue = "error"),
                "interpolation");
        }),
        {
          startState: function (w) {
            return {
              tokenize: null,
              state: me ? "block" : "top",
              stateArg: null,
              context: new gt(me ? "block" : "top", w || 0, null),
            };
          },
          token: function (w, A) {
            if (!A.tokenize && w.eatSpace()) return null;
            var C = (A.tokenize || Ve)(w, A);
            return (
              C && typeof C == "object" && ((he = C[1]), (C = C[0])),
              (ue = C),
              he != "comment" && (A.state = Ne[A.state](he, w, A)),
              ue
            );
          },
          indent: function (w, A) {
            var C = w.context,
              be = A && A.charAt(0),
              R = C.indent;
            return (
              C.type == "prop" && (be == "}" || be == ")") && (C = C.prev),
              C.prev &&
                (be == "}" &&
                (C.type == "block" ||
                  C.type == "top" ||
                  C.type == "interpolation" ||
                  C.type == "restricted_atBlock")
                  ? ((C = C.prev), (R = C.indent))
                  : ((be == ")" &&
                      (C.type == "parens" || C.type == "atBlock_parens")) ||
                      (be == "{" && (C.type == "at" || C.type == "atBlock"))) &&
                    (R = Math.max(0, C.indent - T))),
              R
            );
          },
          electricChars: "}",
          blockCommentStart: "/*",
          blockCommentEnd: "*/",
          blockCommentContinue: " * ",
          lineComment: le,
          fold: "brace",
        }
      );
    });
    function Ee(ee) {
      for (var X = {}, me = 0; me < ee.length; ++me)
        X[ee[me].toLowerCase()] = !0;
      return X;
    }
    var Se = ["domain", "regexp", "url", "url-prefix"],
      We = Ee(Se),
      Qe = [
        "all",
        "aural",
        "braille",
        "handheld",
        "print",
        "projection",
        "screen",
        "tty",
        "tv",
        "embossed",
      ],
      Ce = Ee(Qe),
      M = [
        "width",
        "min-width",
        "max-width",
        "height",
        "min-height",
        "max-height",
        "device-width",
        "min-device-width",
        "max-device-width",
        "device-height",
        "min-device-height",
        "max-device-height",
        "aspect-ratio",
        "min-aspect-ratio",
        "max-aspect-ratio",
        "device-aspect-ratio",
        "min-device-aspect-ratio",
        "max-device-aspect-ratio",
        "color",
        "min-color",
        "max-color",
        "color-index",
        "min-color-index",
        "max-color-index",
        "monochrome",
        "min-monochrome",
        "max-monochrome",
        "resolution",
        "min-resolution",
        "max-resolution",
        "scan",
        "grid",
        "orientation",
        "device-pixel-ratio",
        "min-device-pixel-ratio",
        "max-device-pixel-ratio",
        "pointer",
        "any-pointer",
        "hover",
        "any-hover",
        "prefers-color-scheme",
        "dynamic-range",
        "video-dynamic-range",
      ],
      j = Ee(M),
      _ = [
        "landscape",
        "portrait",
        "none",
        "coarse",
        "fine",
        "on-demand",
        "hover",
        "interlace",
        "progressive",
        "dark",
        "light",
        "standard",
        "high",
      ],
      ie = Ee(_),
      q = [
        "align-content",
        "align-items",
        "align-self",
        "alignment-adjust",
        "alignment-baseline",
        "all",
        "anchor-point",
        "animation",
        "animation-delay",
        "animation-direction",
        "animation-duration",
        "animation-fill-mode",
        "animation-iteration-count",
        "animation-name",
        "animation-play-state",
        "animation-timing-function",
        "appearance",
        "azimuth",
        "backdrop-filter",
        "backface-visibility",
        "background",
        "background-attachment",
        "background-blend-mode",
        "background-clip",
        "background-color",
        "background-image",
        "background-origin",
        "background-position",
        "background-position-x",
        "background-position-y",
        "background-repeat",
        "background-size",
        "baseline-shift",
        "binding",
        "bleed",
        "block-size",
        "bookmark-label",
        "bookmark-level",
        "bookmark-state",
        "bookmark-target",
        "border",
        "border-bottom",
        "border-bottom-color",
        "border-bottom-left-radius",
        "border-bottom-right-radius",
        "border-bottom-style",
        "border-bottom-width",
        "border-collapse",
        "border-color",
        "border-image",
        "border-image-outset",
        "border-image-repeat",
        "border-image-slice",
        "border-image-source",
        "border-image-width",
        "border-left",
        "border-left-color",
        "border-left-style",
        "border-left-width",
        "border-radius",
        "border-right",
        "border-right-color",
        "border-right-style",
        "border-right-width",
        "border-spacing",
        "border-style",
        "border-top",
        "border-top-color",
        "border-top-left-radius",
        "border-top-right-radius",
        "border-top-style",
        "border-top-width",
        "border-width",
        "bottom",
        "box-decoration-break",
        "box-shadow",
        "box-sizing",
        "break-after",
        "break-before",
        "break-inside",
        "caption-side",
        "caret-color",
        "clear",
        "clip",
        "color",
        "color-profile",
        "column-count",
        "column-fill",
        "column-gap",
        "column-rule",
        "column-rule-color",
        "column-rule-style",
        "column-rule-width",
        "column-span",
        "column-width",
        "columns",
        "contain",
        "content",
        "counter-increment",
        "counter-reset",
        "crop",
        "cue",
        "cue-after",
        "cue-before",
        "cursor",
        "direction",
        "display",
        "dominant-baseline",
        "drop-initial-after-adjust",
        "drop-initial-after-align",
        "drop-initial-before-adjust",
        "drop-initial-before-align",
        "drop-initial-size",
        "drop-initial-value",
        "elevation",
        "empty-cells",
        "fit",
        "fit-content",
        "fit-position",
        "flex",
        "flex-basis",
        "flex-direction",
        "flex-flow",
        "flex-grow",
        "flex-shrink",
        "flex-wrap",
        "float",
        "float-offset",
        "flow-from",
        "flow-into",
        "font",
        "font-family",
        "font-feature-settings",
        "font-kerning",
        "font-language-override",
        "font-optical-sizing",
        "font-size",
        "font-size-adjust",
        "font-stretch",
        "font-style",
        "font-synthesis",
        "font-variant",
        "font-variant-alternates",
        "font-variant-caps",
        "font-variant-east-asian",
        "font-variant-ligatures",
        "font-variant-numeric",
        "font-variant-position",
        "font-variation-settings",
        "font-weight",
        "gap",
        "grid",
        "grid-area",
        "grid-auto-columns",
        "grid-auto-flow",
        "grid-auto-rows",
        "grid-column",
        "grid-column-end",
        "grid-column-gap",
        "grid-column-start",
        "grid-gap",
        "grid-row",
        "grid-row-end",
        "grid-row-gap",
        "grid-row-start",
        "grid-template",
        "grid-template-areas",
        "grid-template-columns",
        "grid-template-rows",
        "hanging-punctuation",
        "height",
        "hyphens",
        "icon",
        "image-orientation",
        "image-rendering",
        "image-resolution",
        "inline-box-align",
        "inset",
        "inset-block",
        "inset-block-end",
        "inset-block-start",
        "inset-inline",
        "inset-inline-end",
        "inset-inline-start",
        "isolation",
        "justify-content",
        "justify-items",
        "justify-self",
        "left",
        "letter-spacing",
        "line-break",
        "line-height",
        "line-height-step",
        "line-stacking",
        "line-stacking-ruby",
        "line-stacking-shift",
        "line-stacking-strategy",
        "list-style",
        "list-style-image",
        "list-style-position",
        "list-style-type",
        "margin",
        "margin-bottom",
        "margin-left",
        "margin-right",
        "margin-top",
        "marks",
        "marquee-direction",
        "marquee-loop",
        "marquee-play-count",
        "marquee-speed",
        "marquee-style",
        "mask-clip",
        "mask-composite",
        "mask-image",
        "mask-mode",
        "mask-origin",
        "mask-position",
        "mask-repeat",
        "mask-size",
        "mask-type",
        "max-block-size",
        "max-height",
        "max-inline-size",
        "max-width",
        "min-block-size",
        "min-height",
        "min-inline-size",
        "min-width",
        "mix-blend-mode",
        "move-to",
        "nav-down",
        "nav-index",
        "nav-left",
        "nav-right",
        "nav-up",
        "object-fit",
        "object-position",
        "offset",
        "offset-anchor",
        "offset-distance",
        "offset-path",
        "offset-position",
        "offset-rotate",
        "opacity",
        "order",
        "orphans",
        "outline",
        "outline-color",
        "outline-offset",
        "outline-style",
        "outline-width",
        "overflow",
        "overflow-style",
        "overflow-wrap",
        "overflow-x",
        "overflow-y",
        "padding",
        "padding-bottom",
        "padding-left",
        "padding-right",
        "padding-top",
        "page",
        "page-break-after",
        "page-break-before",
        "page-break-inside",
        "page-policy",
        "pause",
        "pause-after",
        "pause-before",
        "perspective",
        "perspective-origin",
        "pitch",
        "pitch-range",
        "place-content",
        "place-items",
        "place-self",
        "play-during",
        "position",
        "presentation-level",
        "punctuation-trim",
        "quotes",
        "region-break-after",
        "region-break-before",
        "region-break-inside",
        "region-fragment",
        "rendering-intent",
        "resize",
        "rest",
        "rest-after",
        "rest-before",
        "richness",
        "right",
        "rotate",
        "rotation",
        "rotation-point",
        "row-gap",
        "ruby-align",
        "ruby-overhang",
        "ruby-position",
        "ruby-span",
        "scale",
        "scroll-behavior",
        "scroll-margin",
        "scroll-margin-block",
        "scroll-margin-block-end",
        "scroll-margin-block-start",
        "scroll-margin-bottom",
        "scroll-margin-inline",
        "scroll-margin-inline-end",
        "scroll-margin-inline-start",
        "scroll-margin-left",
        "scroll-margin-right",
        "scroll-margin-top",
        "scroll-padding",
        "scroll-padding-block",
        "scroll-padding-block-end",
        "scroll-padding-block-start",
        "scroll-padding-bottom",
        "scroll-padding-inline",
        "scroll-padding-inline-end",
        "scroll-padding-inline-start",
        "scroll-padding-left",
        "scroll-padding-right",
        "scroll-padding-top",
        "scroll-snap-align",
        "scroll-snap-type",
        "shape-image-threshold",
        "shape-inside",
        "shape-margin",
        "shape-outside",
        "size",
        "speak",
        "speak-as",
        "speak-header",
        "speak-numeral",
        "speak-punctuation",
        "speech-rate",
        "stress",
        "string-set",
        "tab-size",
        "table-layout",
        "target",
        "target-name",
        "target-new",
        "target-position",
        "text-align",
        "text-align-last",
        "text-combine-upright",
        "text-decoration",
        "text-decoration-color",
        "text-decoration-line",
        "text-decoration-skip",
        "text-decoration-skip-ink",
        "text-decoration-style",
        "text-emphasis",
        "text-emphasis-color",
        "text-emphasis-position",
        "text-emphasis-style",
        "text-height",
        "text-indent",
        "text-justify",
        "text-orientation",
        "text-outline",
        "text-overflow",
        "text-rendering",
        "text-shadow",
        "text-size-adjust",
        "text-space-collapse",
        "text-transform",
        "text-underline-position",
        "text-wrap",
        "top",
        "touch-action",
        "transform",
        "transform-origin",
        "transform-style",
        "transition",
        "transition-delay",
        "transition-duration",
        "transition-property",
        "transition-timing-function",
        "translate",
        "unicode-bidi",
        "user-select",
        "vertical-align",
        "visibility",
        "voice-balance",
        "voice-duration",
        "voice-family",
        "voice-pitch",
        "voice-range",
        "voice-rate",
        "voice-stress",
        "voice-volume",
        "volume",
        "white-space",
        "widows",
        "width",
        "will-change",
        "word-break",
        "word-spacing",
        "word-wrap",
        "writing-mode",
        "z-index",
        "clip-path",
        "clip-rule",
        "mask",
        "enable-background",
        "filter",
        "flood-color",
        "flood-opacity",
        "lighting-color",
        "stop-color",
        "stop-opacity",
        "pointer-events",
        "color-interpolation",
        "color-interpolation-filters",
        "color-rendering",
        "fill",
        "fill-opacity",
        "fill-rule",
        "image-rendering",
        "marker",
        "marker-end",
        "marker-mid",
        "marker-start",
        "paint-order",
        "shape-rendering",
        "stroke",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-miterlimit",
        "stroke-opacity",
        "stroke-width",
        "text-rendering",
        "baseline-shift",
        "dominant-baseline",
        "glyph-orientation-horizontal",
        "glyph-orientation-vertical",
        "text-anchor",
        "writing-mode",
      ],
      se = Ee(q),
      ce = [
        "accent-color",
        "aspect-ratio",
        "border-block",
        "border-block-color",
        "border-block-end",
        "border-block-end-color",
        "border-block-end-style",
        "border-block-end-width",
        "border-block-start",
        "border-block-start-color",
        "border-block-start-style",
        "border-block-start-width",
        "border-block-style",
        "border-block-width",
        "border-inline",
        "border-inline-color",
        "border-inline-end",
        "border-inline-end-color",
        "border-inline-end-style",
        "border-inline-end-width",
        "border-inline-start",
        "border-inline-start-color",
        "border-inline-start-style",
        "border-inline-start-width",
        "border-inline-style",
        "border-inline-width",
        "content-visibility",
        "margin-block",
        "margin-block-end",
        "margin-block-start",
        "margin-inline",
        "margin-inline-end",
        "margin-inline-start",
        "overflow-anchor",
        "overscroll-behavior",
        "padding-block",
        "padding-block-end",
        "padding-block-start",
        "padding-inline",
        "padding-inline-end",
        "padding-inline-start",
        "scroll-snap-stop",
        "scrollbar-3d-light-color",
        "scrollbar-arrow-color",
        "scrollbar-base-color",
        "scrollbar-dark-shadow-color",
        "scrollbar-face-color",
        "scrollbar-highlight-color",
        "scrollbar-shadow-color",
        "scrollbar-track-color",
        "searchfield-cancel-button",
        "searchfield-decoration",
        "searchfield-results-button",
        "searchfield-results-decoration",
        "shape-inside",
        "zoom",
      ],
      Ie = Ee(ce),
      Te = [
        "font-display",
        "font-family",
        "src",
        "unicode-range",
        "font-variant",
        "font-feature-settings",
        "font-stretch",
        "font-weight",
        "font-style",
      ],
      Oe = Ee(Te),
      ae = [
        "additive-symbols",
        "fallback",
        "negative",
        "pad",
        "prefix",
        "range",
        "speak-as",
        "suffix",
        "symbols",
        "system",
      ],
      V = Ee(ae),
      oe = [
        "aliceblue",
        "antiquewhite",
        "aqua",
        "aquamarine",
        "azure",
        "beige",
        "bisque",
        "black",
        "blanchedalmond",
        "blue",
        "blueviolet",
        "brown",
        "burlywood",
        "cadetblue",
        "chartreuse",
        "chocolate",
        "coral",
        "cornflowerblue",
        "cornsilk",
        "crimson",
        "cyan",
        "darkblue",
        "darkcyan",
        "darkgoldenrod",
        "darkgray",
        "darkgreen",
        "darkgrey",
        "darkkhaki",
        "darkmagenta",
        "darkolivegreen",
        "darkorange",
        "darkorchid",
        "darkred",
        "darksalmon",
        "darkseagreen",
        "darkslateblue",
        "darkslategray",
        "darkslategrey",
        "darkturquoise",
        "darkviolet",
        "deeppink",
        "deepskyblue",
        "dimgray",
        "dimgrey",
        "dodgerblue",
        "firebrick",
        "floralwhite",
        "forestgreen",
        "fuchsia",
        "gainsboro",
        "ghostwhite",
        "gold",
        "goldenrod",
        "gray",
        "grey",
        "green",
        "greenyellow",
        "honeydew",
        "hotpink",
        "indianred",
        "indigo",
        "ivory",
        "khaki",
        "lavender",
        "lavenderblush",
        "lawngreen",
        "lemonchiffon",
        "lightblue",
        "lightcoral",
        "lightcyan",
        "lightgoldenrodyellow",
        "lightgray",
        "lightgreen",
        "lightgrey",
        "lightpink",
        "lightsalmon",
        "lightseagreen",
        "lightskyblue",
        "lightslategray",
        "lightslategrey",
        "lightsteelblue",
        "lightyellow",
        "lime",
        "limegreen",
        "linen",
        "magenta",
        "maroon",
        "mediumaquamarine",
        "mediumblue",
        "mediumorchid",
        "mediumpurple",
        "mediumseagreen",
        "mediumslateblue",
        "mediumspringgreen",
        "mediumturquoise",
        "mediumvioletred",
        "midnightblue",
        "mintcream",
        "mistyrose",
        "moccasin",
        "navajowhite",
        "navy",
        "oldlace",
        "olive",
        "olivedrab",
        "orange",
        "orangered",
        "orchid",
        "palegoldenrod",
        "palegreen",
        "paleturquoise",
        "palevioletred",
        "papayawhip",
        "peachpuff",
        "peru",
        "pink",
        "plum",
        "powderblue",
        "purple",
        "rebeccapurple",
        "red",
        "rosybrown",
        "royalblue",
        "saddlebrown",
        "salmon",
        "sandybrown",
        "seagreen",
        "seashell",
        "sienna",
        "silver",
        "skyblue",
        "slateblue",
        "slategray",
        "slategrey",
        "snow",
        "springgreen",
        "steelblue",
        "tan",
        "teal",
        "thistle",
        "tomato",
        "turquoise",
        "violet",
        "wheat",
        "white",
        "whitesmoke",
        "yellow",
        "yellowgreen",
      ],
      xe = Ee(oe),
      _e = [
        "above",
        "absolute",
        "activeborder",
        "additive",
        "activecaption",
        "afar",
        "after-white-space",
        "ahead",
        "alias",
        "all",
        "all-scroll",
        "alphabetic",
        "alternate",
        "always",
        "amharic",
        "amharic-abegede",
        "antialiased",
        "appworkspace",
        "arabic-indic",
        "armenian",
        "asterisks",
        "attr",
        "auto",
        "auto-flow",
        "avoid",
        "avoid-column",
        "avoid-page",
        "avoid-region",
        "axis-pan",
        "background",
        "backwards",
        "baseline",
        "below",
        "bidi-override",
        "binary",
        "bengali",
        "blink",
        "block",
        "block-axis",
        "blur",
        "bold",
        "bolder",
        "border",
        "border-box",
        "both",
        "bottom",
        "break",
        "break-all",
        "break-word",
        "brightness",
        "bullets",
        "button",
        "buttonface",
        "buttonhighlight",
        "buttonshadow",
        "buttontext",
        "calc",
        "cambodian",
        "capitalize",
        "caps-lock-indicator",
        "caption",
        "captiontext",
        "caret",
        "cell",
        "center",
        "checkbox",
        "circle",
        "cjk-decimal",
        "cjk-earthly-branch",
        "cjk-heavenly-stem",
        "cjk-ideographic",
        "clear",
        "clip",
        "close-quote",
        "col-resize",
        "collapse",
        "color",
        "color-burn",
        "color-dodge",
        "column",
        "column-reverse",
        "compact",
        "condensed",
        "conic-gradient",
        "contain",
        "content",
        "contents",
        "content-box",
        "context-menu",
        "continuous",
        "contrast",
        "copy",
        "counter",
        "counters",
        "cover",
        "crop",
        "cross",
        "crosshair",
        "cubic-bezier",
        "currentcolor",
        "cursive",
        "cyclic",
        "darken",
        "dashed",
        "decimal",
        "decimal-leading-zero",
        "default",
        "default-button",
        "dense",
        "destination-atop",
        "destination-in",
        "destination-out",
        "destination-over",
        "devanagari",
        "difference",
        "disc",
        "discard",
        "disclosure-closed",
        "disclosure-open",
        "document",
        "dot-dash",
        "dot-dot-dash",
        "dotted",
        "double",
        "down",
        "drop-shadow",
        "e-resize",
        "ease",
        "ease-in",
        "ease-in-out",
        "ease-out",
        "element",
        "ellipse",
        "ellipsis",
        "embed",
        "end",
        "ethiopic",
        "ethiopic-abegede",
        "ethiopic-abegede-am-et",
        "ethiopic-abegede-gez",
        "ethiopic-abegede-ti-er",
        "ethiopic-abegede-ti-et",
        "ethiopic-halehame-aa-er",
        "ethiopic-halehame-aa-et",
        "ethiopic-halehame-am-et",
        "ethiopic-halehame-gez",
        "ethiopic-halehame-om-et",
        "ethiopic-halehame-sid-et",
        "ethiopic-halehame-so-et",
        "ethiopic-halehame-ti-er",
        "ethiopic-halehame-ti-et",
        "ethiopic-halehame-tig",
        "ethiopic-numeric",
        "ew-resize",
        "exclusion",
        "expanded",
        "extends",
        "extra-condensed",
        "extra-expanded",
        "fantasy",
        "fast",
        "fill",
        "fill-box",
        "fixed",
        "flat",
        "flex",
        "flex-end",
        "flex-start",
        "footnotes",
        "forwards",
        "from",
        "geometricPrecision",
        "georgian",
        "grayscale",
        "graytext",
        "grid",
        "groove",
        "gujarati",
        "gurmukhi",
        "hand",
        "hangul",
        "hangul-consonant",
        "hard-light",
        "hebrew",
        "help",
        "hidden",
        "hide",
        "higher",
        "highlight",
        "highlighttext",
        "hiragana",
        "hiragana-iroha",
        "horizontal",
        "hsl",
        "hsla",
        "hue",
        "hue-rotate",
        "icon",
        "ignore",
        "inactiveborder",
        "inactivecaption",
        "inactivecaptiontext",
        "infinite",
        "infobackground",
        "infotext",
        "inherit",
        "initial",
        "inline",
        "inline-axis",
        "inline-block",
        "inline-flex",
        "inline-grid",
        "inline-table",
        "inset",
        "inside",
        "intrinsic",
        "invert",
        "italic",
        "japanese-formal",
        "japanese-informal",
        "justify",
        "kannada",
        "katakana",
        "katakana-iroha",
        "keep-all",
        "khmer",
        "korean-hangul-formal",
        "korean-hanja-formal",
        "korean-hanja-informal",
        "landscape",
        "lao",
        "large",
        "larger",
        "left",
        "level",
        "lighter",
        "lighten",
        "line-through",
        "linear",
        "linear-gradient",
        "lines",
        "list-item",
        "listbox",
        "listitem",
        "local",
        "logical",
        "loud",
        "lower",
        "lower-alpha",
        "lower-armenian",
        "lower-greek",
        "lower-hexadecimal",
        "lower-latin",
        "lower-norwegian",
        "lower-roman",
        "lowercase",
        "ltr",
        "luminosity",
        "malayalam",
        "manipulation",
        "match",
        "matrix",
        "matrix3d",
        "media-play-button",
        "media-slider",
        "media-sliderthumb",
        "media-volume-slider",
        "media-volume-sliderthumb",
        "medium",
        "menu",
        "menulist",
        "menulist-button",
        "menutext",
        "message-box",
        "middle",
        "min-intrinsic",
        "mix",
        "mongolian",
        "monospace",
        "move",
        "multiple",
        "multiple_mask_images",
        "multiply",
        "myanmar",
        "n-resize",
        "narrower",
        "ne-resize",
        "nesw-resize",
        "no-close-quote",
        "no-drop",
        "no-open-quote",
        "no-repeat",
        "none",
        "normal",
        "not-allowed",
        "nowrap",
        "ns-resize",
        "numbers",
        "numeric",
        "nw-resize",
        "nwse-resize",
        "oblique",
        "octal",
        "opacity",
        "open-quote",
        "optimizeLegibility",
        "optimizeSpeed",
        "oriya",
        "oromo",
        "outset",
        "outside",
        "outside-shape",
        "overlay",
        "overline",
        "padding",
        "padding-box",
        "painted",
        "page",
        "paused",
        "persian",
        "perspective",
        "pinch-zoom",
        "plus-darker",
        "plus-lighter",
        "pointer",
        "polygon",
        "portrait",
        "pre",
        "pre-line",
        "pre-wrap",
        "preserve-3d",
        "progress",
        "push-button",
        "radial-gradient",
        "radio",
        "read-only",
        "read-write",
        "read-write-plaintext-only",
        "rectangle",
        "region",
        "relative",
        "repeat",
        "repeating-linear-gradient",
        "repeating-radial-gradient",
        "repeating-conic-gradient",
        "repeat-x",
        "repeat-y",
        "reset",
        "reverse",
        "rgb",
        "rgba",
        "ridge",
        "right",
        "rotate",
        "rotate3d",
        "rotateX",
        "rotateY",
        "rotateZ",
        "round",
        "row",
        "row-resize",
        "row-reverse",
        "rtl",
        "run-in",
        "running",
        "s-resize",
        "sans-serif",
        "saturate",
        "saturation",
        "scale",
        "scale3d",
        "scaleX",
        "scaleY",
        "scaleZ",
        "screen",
        "scroll",
        "scrollbar",
        "scroll-position",
        "se-resize",
        "searchfield",
        "searchfield-cancel-button",
        "searchfield-decoration",
        "searchfield-results-button",
        "searchfield-results-decoration",
        "self-start",
        "self-end",
        "semi-condensed",
        "semi-expanded",
        "separate",
        "sepia",
        "serif",
        "show",
        "sidama",
        "simp-chinese-formal",
        "simp-chinese-informal",
        "single",
        "skew",
        "skewX",
        "skewY",
        "skip-white-space",
        "slide",
        "slider-horizontal",
        "slider-vertical",
        "sliderthumb-horizontal",
        "sliderthumb-vertical",
        "slow",
        "small",
        "small-caps",
        "small-caption",
        "smaller",
        "soft-light",
        "solid",
        "somali",
        "source-atop",
        "source-in",
        "source-out",
        "source-over",
        "space",
        "space-around",
        "space-between",
        "space-evenly",
        "spell-out",
        "square",
        "square-button",
        "start",
        "static",
        "status-bar",
        "stretch",
        "stroke",
        "stroke-box",
        "sub",
        "subpixel-antialiased",
        "svg_masks",
        "super",
        "sw-resize",
        "symbolic",
        "symbols",
        "system-ui",
        "table",
        "table-caption",
        "table-cell",
        "table-column",
        "table-column-group",
        "table-footer-group",
        "table-header-group",
        "table-row",
        "table-row-group",
        "tamil",
        "telugu",
        "text",
        "text-bottom",
        "text-top",
        "textarea",
        "textfield",
        "thai",
        "thick",
        "thin",
        "threeddarkshadow",
        "threedface",
        "threedhighlight",
        "threedlightshadow",
        "threedshadow",
        "tibetan",
        "tigre",
        "tigrinya-er",
        "tigrinya-er-abegede",
        "tigrinya-et",
        "tigrinya-et-abegede",
        "to",
        "top",
        "trad-chinese-formal",
        "trad-chinese-informal",
        "transform",
        "translate",
        "translate3d",
        "translateX",
        "translateY",
        "translateZ",
        "transparent",
        "ultra-condensed",
        "ultra-expanded",
        "underline",
        "unidirectional-pan",
        "unset",
        "up",
        "upper-alpha",
        "upper-armenian",
        "upper-greek",
        "upper-hexadecimal",
        "upper-latin",
        "upper-norwegian",
        "upper-roman",
        "uppercase",
        "urdu",
        "url",
        "var",
        "vertical",
        "vertical-text",
        "view-box",
        "visible",
        "visibleFill",
        "visiblePainted",
        "visibleStroke",
        "visual",
        "w-resize",
        "wait",
        "wave",
        "wider",
        "window",
        "windowframe",
        "windowtext",
        "words",
        "wrap",
        "wrap-reverse",
        "x-large",
        "x-small",
        "xor",
        "xx-large",
        "xx-small",
      ],
      ye = Ee(_e),
      Me = Se.concat(Qe)
        .concat(M)
        .concat(_)
        .concat(q)
        .concat(ce)
        .concat(oe)
        .concat(_e);
    F.registerHelper("hintWords", "css", Me);
    function He(ee, X) {
      for (var me = !1, T; (T = ee.next()) != null; ) {
        if (me && T == "/") {
          X.tokenize = null;
          break;
        }
        me = T == "*";
      }
      return ["comment", "comment"];
    }
    F.defineMIME("text/css", {
      documentTypes: We,
      mediaTypes: Ce,
      mediaFeatures: j,
      mediaValueKeywords: ie,
      propertyKeywords: se,
      nonStandardPropertyKeywords: Ie,
      fontProperties: Oe,
      counterDescriptors: V,
      colorKeywords: xe,
      valueKeywords: ye,
      tokenHooks: {
        "/": function (ee, X) {
          return ee.eat("*") ? ((X.tokenize = He), He(ee, X)) : !1;
        },
      },
      name: "css",
    }),
      F.defineMIME("text/x-scss", {
        mediaTypes: Ce,
        mediaFeatures: j,
        mediaValueKeywords: ie,
        propertyKeywords: se,
        nonStandardPropertyKeywords: Ie,
        colorKeywords: xe,
        valueKeywords: ye,
        fontProperties: Oe,
        allowNested: !0,
        lineComment: "//",
        tokenHooks: {
          "/": function (ee, X) {
            return ee.eat("/")
              ? (ee.skipToEnd(), ["comment", "comment"])
              : ee.eat("*")
                ? ((X.tokenize = He), He(ee, X))
                : ["operator", "operator"];
          },
          ":": function (ee) {
            return ee.match(/^\s*\{/, !1) ? [null, null] : !1;
          },
          $: function (ee) {
            return (
              ee.match(/^[\w-]+/),
              ee.match(/^\s*:/, !1)
                ? ["variable-2", "variable-definition"]
                : ["variable-2", "variable"]
            );
          },
          "#": function (ee) {
            return ee.eat("{") ? [null, "interpolation"] : !1;
          },
        },
        name: "css",
        helperType: "scss",
      }),
      F.defineMIME("text/x-less", {
        mediaTypes: Ce,
        mediaFeatures: j,
        mediaValueKeywords: ie,
        propertyKeywords: se,
        nonStandardPropertyKeywords: Ie,
        colorKeywords: xe,
        valueKeywords: ye,
        fontProperties: Oe,
        allowNested: !0,
        lineComment: "//",
        tokenHooks: {
          "/": function (ee, X) {
            return ee.eat("/")
              ? (ee.skipToEnd(), ["comment", "comment"])
              : ee.eat("*")
                ? ((X.tokenize = He), He(ee, X))
                : ["operator", "operator"];
          },
          "@": function (ee) {
            return ee.eat("{")
              ? [null, "interpolation"]
              : ee.match(
                    /^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i,
                    !1,
                  )
                ? !1
                : (ee.eatWhile(/[\w\\\-]/),
                  ee.match(/^\s*:/, !1)
                    ? ["variable-2", "variable-definition"]
                    : ["variable-2", "variable"]);
          },
          "&": function () {
            return ["atom", "atom"];
          },
        },
        name: "css",
        helperType: "less",
      }),
      F.defineMIME("text/x-gss", {
        documentTypes: We,
        mediaTypes: Ce,
        mediaFeatures: j,
        propertyKeywords: se,
        nonStandardPropertyKeywords: Ie,
        fontProperties: Oe,
        counterDescriptors: V,
        colorKeywords: xe,
        valueKeywords: ye,
        supportsAtComponent: !0,
        tokenHooks: {
          "/": function (ee, X) {
            return ee.eat("*") ? ((X.tokenize = He), He(ee, X)) : !1;
          },
        },
        name: "css",
        helperType: "gss",
      });
  });
})();
var xu = bu.exports,
  da = { exports: {} },
  ha;
function wu() {
  return (
    ha ||
      ((ha = 1),
      (function (yr, Or) {
        (function (F) {
          F(Ar);
        })(function (F) {
          var Ee = {
              autoSelfClosers: {
                area: !0,
                base: !0,
                br: !0,
                col: !0,
                command: !0,
                embed: !0,
                frame: !0,
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
                menuitem: !0,
              },
              implicitlyClosed: {
                dd: !0,
                li: !0,
                optgroup: !0,
                option: !0,
                p: !0,
                rp: !0,
                rt: !0,
                tbody: !0,
                td: !0,
                tfoot: !0,
                th: !0,
                tr: !0,
              },
              contextGrabbers: {
                dd: { dd: !0, dt: !0 },
                dt: { dd: !0, dt: !0 },
                li: { li: !0 },
                option: { option: !0, optgroup: !0 },
                optgroup: { optgroup: !0 },
                p: {
                  address: !0,
                  article: !0,
                  aside: !0,
                  blockquote: !0,
                  dir: !0,
                  div: !0,
                  dl: !0,
                  fieldset: !0,
                  footer: !0,
                  form: !0,
                  h1: !0,
                  h2: !0,
                  h3: !0,
                  h4: !0,
                  h5: !0,
                  h6: !0,
                  header: !0,
                  hgroup: !0,
                  hr: !0,
                  menu: !0,
                  nav: !0,
                  ol: !0,
                  p: !0,
                  pre: !0,
                  section: !0,
                  table: !0,
                  ul: !0,
                },
                rp: { rp: !0, rt: !0 },
                rt: { rp: !0, rt: !0 },
                tbody: { tbody: !0, tfoot: !0 },
                td: { td: !0, th: !0 },
                tfoot: { tbody: !0 },
                th: { td: !0, th: !0 },
                thead: { tbody: !0, tfoot: !0 },
                tr: { tr: !0 },
              },
              doNotIndent: { pre: !0 },
              allowUnquoted: !0,
              allowMissing: !0,
              caseFold: !0,
            },
            Se = {
              autoSelfClosers: {},
              implicitlyClosed: {},
              contextGrabbers: {},
              doNotIndent: {},
              allowUnquoted: !1,
              allowMissing: !1,
              allowMissingTagName: !1,
              caseFold: !1,
            };
          F.defineMode("xml", function (We, Qe) {
            var Ce = We.indentUnit,
              M = {},
              j = Qe.htmlMode ? Ee : Se;
            for (var _ in j) M[_] = j[_];
            for (var _ in Qe) M[_] = Qe[_];
            var ie, q;
            function se(c, x) {
              function b(D) {
                return (x.tokenize = D), D(c, x);
              }
              var v = c.next();
              if (v == "<")
                return c.eat("!")
                  ? c.eat("[")
                    ? c.match("CDATA[")
                      ? b(Te("atom", "]]>"))
                      : null
                    : c.match("--")
                      ? b(Te("comment", "-->"))
                      : c.match("DOCTYPE", !0, !0)
                        ? (c.eatWhile(/[\w\._\-]/), b(Oe(1)))
                        : null
                  : c.eat("?")
                    ? (c.eatWhile(/[\w\._\-]/),
                      (x.tokenize = Te("meta", "?>")),
                      "meta")
                    : ((ie = c.eat("/") ? "closeTag" : "openTag"),
                      (x.tokenize = ce),
                      "tag bracket");
              if (v == "&") {
                var g;
                return (
                  c.eat("#")
                    ? c.eat("x")
                      ? (g = c.eatWhile(/[a-fA-F\d]/) && c.eat(";"))
                      : (g = c.eatWhile(/[\d]/) && c.eat(";"))
                    : (g = c.eatWhile(/[\w\.\-:]/) && c.eat(";")),
                  g ? "atom" : "error"
                );
              } else return c.eatWhile(/[^&<]/), null;
            }
            se.isInText = !0;
            function ce(c, x) {
              var b = c.next();
              if (b == ">" || (b == "/" && c.eat(">")))
                return (
                  (x.tokenize = se),
                  (ie = b == ">" ? "endTag" : "selfcloseTag"),
                  "tag bracket"
                );
              if (b == "=") return (ie = "equals"), null;
              if (b == "<") {
                (x.tokenize = se),
                  (x.state = _e),
                  (x.tagName = x.tagStart = null);
                var v = x.tokenize(c, x);
                return v ? v + " tag error" : "tag error";
              } else
                return /[\'\"]/.test(b)
                  ? ((x.tokenize = Ie(b)),
                    (x.stringStartCol = c.column()),
                    x.tokenize(c, x))
                  : (c.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/),
                    "word");
            }
            function Ie(c) {
              var x = function (b, v) {
                for (; !b.eol(); )
                  if (b.next() == c) {
                    v.tokenize = ce;
                    break;
                  }
                return "string";
              };
              return (x.isInAttribute = !0), x;
            }
            function Te(c, x) {
              return function (b, v) {
                for (; !b.eol(); ) {
                  if (b.match(x)) {
                    v.tokenize = se;
                    break;
                  }
                  b.next();
                }
                return c;
              };
            }
            function Oe(c) {
              return function (x, b) {
                for (var v; (v = x.next()) != null; ) {
                  if (v == "<")
                    return (b.tokenize = Oe(c + 1)), b.tokenize(x, b);
                  if (v == ">")
                    if (c == 1) {
                      b.tokenize = se;
                      break;
                    } else return (b.tokenize = Oe(c - 1)), b.tokenize(x, b);
                }
                return "meta";
              };
            }
            function ae(c) {
              return c && c.toLowerCase();
            }
            function V(c, x, b) {
              (this.prev = c.context),
                (this.tagName = x || ""),
                (this.indent = c.indented),
                (this.startOfLine = b),
                (M.doNotIndent.hasOwnProperty(x) ||
                  (c.context && c.context.noIndent)) &&
                  (this.noIndent = !0);
            }
            function oe(c) {
              c.context && (c.context = c.context.prev);
            }
            function xe(c, x) {
              for (var b; ; ) {
                if (
                  !c.context ||
                  ((b = c.context.tagName),
                  !M.contextGrabbers.hasOwnProperty(ae(b)) ||
                    !M.contextGrabbers[ae(b)].hasOwnProperty(ae(x)))
                )
                  return;
                oe(c);
              }
            }
            function _e(c, x, b) {
              return c == "openTag"
                ? ((b.tagStart = x.column()), ye)
                : c == "closeTag"
                  ? Me
                  : _e;
            }
            function ye(c, x, b) {
              return c == "word"
                ? ((b.tagName = x.current()), (q = "tag"), X)
                : M.allowMissingTagName && c == "endTag"
                  ? ((q = "tag bracket"), X(c, x, b))
                  : ((q = "error"), ye);
            }
            function Me(c, x, b) {
              if (c == "word") {
                var v = x.current();
                return (
                  b.context &&
                    b.context.tagName != v &&
                    M.implicitlyClosed.hasOwnProperty(ae(b.context.tagName)) &&
                    oe(b),
                  (b.context && b.context.tagName == v) || M.matchClosing === !1
                    ? ((q = "tag"), He)
                    : ((q = "tag error"), ee)
                );
              } else
                return M.allowMissingTagName && c == "endTag"
                  ? ((q = "tag bracket"), He(c, x, b))
                  : ((q = "error"), ee);
            }
            function He(c, x, b) {
              return c != "endTag" ? ((q = "error"), He) : (oe(b), _e);
            }
            function ee(c, x, b) {
              return (q = "error"), He(c, x, b);
            }
            function X(c, x, b) {
              if (c == "word") return (q = "attribute"), me;
              if (c == "endTag" || c == "selfcloseTag") {
                var v = b.tagName,
                  g = b.tagStart;
                return (
                  (b.tagName = b.tagStart = null),
                  c == "selfcloseTag" || M.autoSelfClosers.hasOwnProperty(ae(v))
                    ? xe(b, v)
                    : (xe(b, v), (b.context = new V(b, v, g == b.indented))),
                  _e
                );
              }
              return (q = "error"), X;
            }
            function me(c, x, b) {
              return c == "equals"
                ? T
                : (M.allowMissing || (q = "error"), X(c, x, b));
            }
            function T(c, x, b) {
              return c == "string"
                ? H
                : c == "word" && M.allowUnquoted
                  ? ((q = "string"), X)
                  : ((q = "error"), X(c, x, b));
            }
            function H(c, x, b) {
              return c == "string" ? H : X(c, x, b);
            }
            return {
              startState: function (c) {
                var x = {
                  tokenize: se,
                  state: _e,
                  indented: c || 0,
                  tagName: null,
                  tagStart: null,
                  context: null,
                };
                return c != null && (x.baseIndent = c), x;
              },
              token: function (c, x) {
                if (
                  (!x.tagName && c.sol() && (x.indented = c.indentation()),
                  c.eatSpace())
                )
                  return null;
                ie = null;
                var b = x.tokenize(c, x);
                return (
                  (b || ie) &&
                    b != "comment" &&
                    ((q = null),
                    (x.state = x.state(ie || b, c, x)),
                    q && (b = q == "error" ? b + " error" : q)),
                  b
                );
              },
              indent: function (c, x, b) {
                var v = c.context;
                if (c.tokenize.isInAttribute)
                  return c.tagStart == c.indented
                    ? c.stringStartCol + 1
                    : c.indented + Ce;
                if (v && v.noIndent) return F.Pass;
                if (c.tokenize != ce && c.tokenize != se)
                  return b ? b.match(/^(\s*)/)[0].length : 0;
                if (c.tagName)
                  return M.multilineTagIndentPastTag !== !1
                    ? c.tagStart + c.tagName.length + 2
                    : c.tagStart + Ce * (M.multilineTagIndentFactor || 1);
                if (M.alignCDATA && /<!\[CDATA\[/.test(x)) return 0;
                var g = x && /^<(\/)?([\w_:\.-]*)/.exec(x);
                if (g && g[1])
                  for (; v; )
                    if (v.tagName == g[2]) {
                      v = v.prev;
                      break;
                    } else if (M.implicitlyClosed.hasOwnProperty(ae(v.tagName)))
                      v = v.prev;
                    else break;
                else if (g)
                  for (; v; ) {
                    var D = M.contextGrabbers[ae(v.tagName)];
                    if (D && D.hasOwnProperty(ae(g[2]))) v = v.prev;
                    else break;
                  }
                for (; v && v.prev && !v.startOfLine; ) v = v.prev;
                return v ? v.indent + Ce : c.baseIndent || 0;
              },
              electricInput: /<\/[\s\w:]+>$/,
              blockCommentStart: "<!--",
              blockCommentEnd: "-->",
              configuration: M.htmlMode ? "html" : "xml",
              helperType: M.htmlMode ? "html" : "xml",
              skipAttribute: function (c) {
                c.state == T && (c.state = X);
              },
              xmlCurrentTag: function (c) {
                return c.tagName
                  ? { name: c.tagName, close: c.type == "closeTag" }
                  : null;
              },
              xmlCurrentContext: function (c) {
                for (var x = [], b = c.context; b; b = b.prev)
                  x.push(b.tagName);
                return x.reverse();
              },
            };
          }),
            F.defineMIME("text/xml", "xml"),
            F.defineMIME("application/xml", "xml"),
            F.mimeModes.hasOwnProperty("text/html") ||
              F.defineMIME("text/html", { name: "xml", htmlMode: !0 });
        });
      })()),
    da.exports
  );
}
var pa = { exports: {} },
  va;
function ya() {
  return (
    va ||
      ((va = 1),
      (function (yr, Or) {
        (function (F) {
          F(Ar);
        })(function (F) {
          F.defineMode("javascript", function (Ee, Se) {
            var We = Ee.indentUnit,
              Qe = Se.statementIndent,
              Ce = Se.jsonld,
              M = Se.json || Ce,
              j = Se.trackScope !== !1,
              _ = Se.typescript,
              ie = Se.wordCharacters || /[\w$\xa1-\uffff]/,
              q = (function () {
                function f(et) {
                  return { type: et, style: "keyword" };
                }
                var h = f("keyword a"),
                  L = f("keyword b"),
                  O = f("keyword c"),
                  k = f("keyword d"),
                  I = f("operator"),
                  De = { type: "atom", style: "atom" };
                return {
                  if: f("if"),
                  while: h,
                  with: h,
                  else: L,
                  do: L,
                  try: L,
                  finally: L,
                  return: k,
                  break: k,
                  continue: k,
                  new: f("new"),
                  delete: O,
                  void: O,
                  throw: O,
                  debugger: f("debugger"),
                  var: f("var"),
                  const: f("var"),
                  let: f("var"),
                  function: f("function"),
                  catch: f("catch"),
                  for: f("for"),
                  switch: f("switch"),
                  case: f("case"),
                  default: f("default"),
                  in: I,
                  typeof: I,
                  instanceof: I,
                  true: De,
                  false: De,
                  null: De,
                  undefined: De,
                  NaN: De,
                  Infinity: De,
                  this: f("this"),
                  class: f("class"),
                  super: f("atom"),
                  yield: O,
                  export: f("export"),
                  import: f("import"),
                  extends: O,
                  await: O,
                };
              })(),
              se = /[+\-*&%=<>!?|~^@]/,
              ce =
                /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
            function Ie(f) {
              for (var h = !1, L, O = !1; (L = f.next()) != null; ) {
                if (!h) {
                  if (L == "/" && !O) return;
                  L == "[" ? (O = !0) : O && L == "]" && (O = !1);
                }
                h = !h && L == "\\";
              }
            }
            var Te, Oe;
            function ae(f, h, L) {
              return (Te = f), (Oe = L), h;
            }
            function V(f, h) {
              var L = f.next();
              if (L == '"' || L == "'")
                return (h.tokenize = oe(L)), h.tokenize(f, h);
              if (L == "." && f.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))
                return ae("number", "number");
              if (L == "." && f.match("..")) return ae("spread", "meta");
              if (/[\[\]{}\(\),;\:\.]/.test(L)) return ae(L);
              if (L == "=" && f.eat(">")) return ae("=>", "operator");
              if (L == "0" && f.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))
                return ae("number", "number");
              if (/\d/.test(L))
                return (
                  f.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/),
                  ae("number", "number")
                );
              if (L == "/")
                return f.eat("*")
                  ? ((h.tokenize = xe), xe(f, h))
                  : f.eat("/")
                    ? (f.skipToEnd(), ae("comment", "comment"))
                    : Dt(f, h, 1)
                      ? (Ie(f),
                        f.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/),
                        ae("regexp", "string-2"))
                      : (f.eat("="), ae("operator", "operator", f.current()));
              if (L == "`") return (h.tokenize = _e), _e(f, h);
              if (L == "#" && f.peek() == "!")
                return f.skipToEnd(), ae("meta", "meta");
              if (L == "#" && f.eatWhile(ie)) return ae("variable", "property");
              if (
                (L == "<" && f.match("!--")) ||
                (L == "-" &&
                  f.match("->") &&
                  !/\S/.test(f.string.slice(0, f.start)))
              )
                return f.skipToEnd(), ae("comment", "comment");
              if (se.test(L))
                return (
                  (L != ">" || !h.lexical || h.lexical.type != ">") &&
                    (f.eat("=")
                      ? (L == "!" || L == "=") && f.eat("=")
                      : /[<>*+\-|&?]/.test(L) &&
                        (f.eat(L), L == ">" && f.eat(L))),
                  L == "?" && f.eat(".")
                    ? ae(".")
                    : ae("operator", "operator", f.current())
                );
              if (ie.test(L)) {
                f.eatWhile(ie);
                var O = f.current();
                if (h.lastType != ".") {
                  if (q.propertyIsEnumerable(O)) {
                    var k = q[O];
                    return ae(k.type, k.style, O);
                  }
                  if (
                    O == "async" &&
                    f.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, !1)
                  )
                    return ae("async", "keyword", O);
                }
                return ae("variable", "variable", O);
              }
            }
            function oe(f) {
              return function (h, L) {
                var O = !1,
                  k;
                if (Ce && h.peek() == "@" && h.match(ce))
                  return (L.tokenize = V), ae("jsonld-keyword", "meta");
                for (; (k = h.next()) != null && !(k == f && !O); )
                  O = !O && k == "\\";
                return O || (L.tokenize = V), ae("string", "string");
              };
            }
            function xe(f, h) {
              for (var L = !1, O; (O = f.next()); ) {
                if (O == "/" && L) {
                  h.tokenize = V;
                  break;
                }
                L = O == "*";
              }
              return ae("comment", "comment");
            }
            function _e(f, h) {
              for (var L = !1, O; (O = f.next()) != null; ) {
                if (!L && (O == "`" || (O == "$" && f.eat("{")))) {
                  h.tokenize = V;
                  break;
                }
                L = !L && O == "\\";
              }
              return ae("quasi", "string-2", f.current());
            }
            var ye = "([{}])";
            function Me(f, h) {
              h.fatArrowAt && (h.fatArrowAt = null);
              var L = f.string.indexOf("=>", f.start);
              if (!(L < 0)) {
                if (_) {
                  var O = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(
                    f.string.slice(f.start, L),
                  );
                  O && (L = O.index);
                }
                for (var k = 0, I = !1, De = L - 1; De >= 0; --De) {
                  var et = f.string.charAt(De),
                    mt = ye.indexOf(et);
                  if (mt >= 0 && mt < 3) {
                    if (!k) {
                      ++De;
                      break;
                    }
                    if (--k == 0) {
                      et == "(" && (I = !0);
                      break;
                    }
                  } else if (mt >= 3 && mt < 6) ++k;
                  else if (ie.test(et)) I = !0;
                  else if (/["'\/`]/.test(et))
                    for (; ; --De) {
                      if (De == 0) return;
                      var Hr = f.string.charAt(De - 1);
                      if (Hr == et && f.string.charAt(De - 2) != "\\") {
                        De--;
                        break;
                      }
                    }
                  else if (I && !k) {
                    ++De;
                    break;
                  }
                }
                I && !k && (h.fatArrowAt = De);
              }
            }
            var He = {
              atom: !0,
              number: !0,
              variable: !0,
              string: !0,
              regexp: !0,
              this: !0,
              import: !0,
              "jsonld-keyword": !0,
            };
            function ee(f, h, L, O, k, I) {
              (this.indented = f),
                (this.column = h),
                (this.type = L),
                (this.prev = k),
                (this.info = I),
                O != null && (this.align = O);
            }
            function X(f, h) {
              if (!j) return !1;
              for (var L = f.localVars; L; L = L.next)
                if (L.name == h) return !0;
              for (var O = f.context; O; O = O.prev)
                for (var L = O.vars; L; L = L.next) if (L.name == h) return !0;
            }
            function me(f, h, L, O, k) {
              var I = f.cc;
              for (
                T.state = f,
                  T.stream = k,
                  T.marked = null,
                  T.cc = I,
                  T.style = h,
                  f.lexical.hasOwnProperty("align") || (f.lexical.align = !0);
                ;

              ) {
                var De = I.length ? I.pop() : M ? G : he;
                if (De(L, O)) {
                  for (; I.length && I[I.length - 1].lex; ) I.pop()();
                  return T.marked
                    ? T.marked
                    : L == "variable" && X(f, O)
                      ? "variable-2"
                      : h;
                }
              }
            }
            var T = { state: null, column: null, marked: null, cc: null };
            function H() {
              for (var f = arguments.length - 1; f >= 0; f--)
                T.cc.push(arguments[f]);
            }
            function c() {
              return H.apply(null, arguments), !0;
            }
            function x(f, h) {
              for (var L = h; L; L = L.next) if (L.name == f) return !0;
              return !1;
            }
            function b(f) {
              var h = T.state;
              if (((T.marked = "def"), !!j)) {
                if (h.context) {
                  if (h.lexical.info == "var" && h.context && h.context.block) {
                    var L = v(f, h.context);
                    if (L != null) {
                      h.context = L;
                      return;
                    }
                  } else if (!x(f, h.localVars)) {
                    h.localVars = new K(f, h.localVars);
                    return;
                  }
                }
                Se.globalVars &&
                  !x(f, h.globalVars) &&
                  (h.globalVars = new K(f, h.globalVars));
              }
            }
            function v(f, h) {
              if (h)
                if (h.block) {
                  var L = v(f, h.prev);
                  return L ? (L == h.prev ? h : new D(L, h.vars, !0)) : null;
                } else
                  return x(f, h.vars) ? h : new D(h.prev, new K(f, h.vars), !1);
              else return null;
            }
            function g(f) {
              return (
                f == "public" ||
                f == "private" ||
                f == "protected" ||
                f == "abstract" ||
                f == "readonly"
              );
            }
            function D(f, h, L) {
              (this.prev = f), (this.vars = h), (this.block = L);
            }
            function K(f, h) {
              (this.name = f), (this.next = h);
            }
            var $ = new K("this", new K("arguments", null));
            function pe() {
              (T.state.context = new D(T.state.context, T.state.localVars, !1)),
                (T.state.localVars = $);
            }
            function Re() {
              (T.state.context = new D(T.state.context, T.state.localVars, !0)),
                (T.state.localVars = null);
            }
            pe.lex = Re.lex = !0;
            function ze() {
              (T.state.localVars = T.state.context.vars),
                (T.state.context = T.state.context.prev);
            }
            ze.lex = !0;
            function le(f, h) {
              var L = function () {
                var O = T.state,
                  k = O.indented;
                if (O.lexical.type == "stat") k = O.lexical.indented;
                else
                  for (
                    var I = O.lexical;
                    I && I.type == ")" && I.align;
                    I = I.prev
                  )
                    k = I.indented;
                O.lexical = new ee(k, T.stream.column(), f, null, O.lexical, h);
              };
              return (L.lex = !0), L;
            }
            function te() {
              var f = T.state;
              f.lexical.prev &&
                (f.lexical.type == ")" && (f.indented = f.lexical.indented),
                (f.lexical = f.lexical.prev));
            }
            te.lex = !0;
            function de(f) {
              function h(L) {
                return L == f
                  ? c()
                  : f == ";" || L == "}" || L == ")" || L == "]"
                    ? H()
                    : c(h);
              }
              return h;
            }
            function he(f, h) {
              return f == "var"
                ? c(le("vardef", h), zr, de(";"), te)
                : f == "keyword a"
                  ? c(le("form"), Ct, he, te)
                  : f == "keyword b"
                    ? c(le("form"), he, te)
                    : f == "keyword d"
                      ? T.stream.match(/^\s*$/, !1)
                        ? c()
                        : c(le("stat"), gt, de(";"), te)
                      : f == "debugger"
                        ? c(de(";"))
                        : f == "{"
                          ? c(le("}"), Re, Ot, te, ze)
                          : f == ";"
                            ? c()
                            : f == "if"
                              ? (T.state.lexical.info == "else" &&
                                  T.state.cc[T.state.cc.length - 1] == te &&
                                  T.state.cc.pop()(),
                                c(le("form"), Ct, he, te, Pr))
                              : f == "function"
                                ? c(Pt)
                                : f == "for"
                                  ? c(le("form"), Re, _n, he, ze, te)
                                  : f == "class" || (_ && h == "interface")
                                    ? ((T.marked = "keyword"),
                                      c(
                                        le("form", f == "class" ? f : h),
                                        Er,
                                        te,
                                      ))
                                    : f == "variable"
                                      ? _ && h == "declare"
                                        ? ((T.marked = "keyword"), c(he))
                                        : _ &&
                                            (h == "module" ||
                                              h == "enum" ||
                                              h == "type") &&
                                            T.stream.match(/^\s*\w/, !1)
                                          ? ((T.marked = "keyword"),
                                            h == "enum"
                                              ? c(U)
                                              : h == "type"
                                                ? c(
                                                    Hn,
                                                    de("operator"),
                                                    ke,
                                                    de(";"),
                                                  )
                                                : c(
                                                    le("form"),
                                                    yt,
                                                    de("{"),
                                                    le("}"),
                                                    Ot,
                                                    te,
                                                    te,
                                                  ))
                                          : _ && h == "namespace"
                                            ? ((T.marked = "keyword"),
                                              c(le("form"), G, he, te))
                                            : _ && h == "abstract"
                                              ? ((T.marked = "keyword"), c(he))
                                              : c(le("stat"), be)
                                      : f == "switch"
                                        ? c(
                                            le("form"),
                                            Ct,
                                            de("{"),
                                            le("}", "switch"),
                                            Re,
                                            Ot,
                                            te,
                                            te,
                                            ze,
                                          )
                                        : f == "case"
                                          ? c(G, de(":"))
                                          : f == "default"
                                            ? c(de(":"))
                                            : f == "catch"
                                              ? c(
                                                  le("form"),
                                                  pe,
                                                  ue,
                                                  he,
                                                  te,
                                                  ze,
                                                )
                                              : f == "export"
                                                ? c(le("stat"), Ir, te)
                                                : f == "import"
                                                  ? c(le("stat"), ar, te)
                                                  : f == "async"
                                                    ? c(he)
                                                    : h == "@"
                                                      ? c(G, he)
                                                      : H(
                                                          le("stat"),
                                                          G,
                                                          de(";"),
                                                          te,
                                                        );
            }
            function ue(f) {
              if (f == "(") return c(Ft, de(")"));
            }
            function G(f, h) {
              return st(f, h, !1);
            }
            function Ve(f, h) {
              return st(f, h, !0);
            }
            function Ct(f) {
              return f != "(" ? H() : c(le(")"), gt, de(")"), te);
            }
            function st(f, h, L) {
              if (T.state.fatArrowAt == T.stream.start) {
                var O = L ? Ne : re;
                if (f == "(")
                  return c(pe, le(")"), ve(Ft, ")"), te, de("=>"), O, ze);
                if (f == "variable") return H(pe, yt, de("=>"), O, ze);
              }
              var k = L ? Ke : Le;
              return He.hasOwnProperty(f)
                ? c(k)
                : f == "function"
                  ? c(Pt, k)
                  : f == "class" || (_ && h == "interface")
                    ? ((T.marked = "keyword"), c(le("form"), mi, te))
                    : f == "keyword c" || f == "async"
                      ? c(L ? Ve : G)
                      : f == "("
                        ? c(le(")"), gt, de(")"), te, k)
                        : f == "operator" || f == "spread"
                          ? c(L ? Ve : G)
                          : f == "["
                            ? c(le("]"), je, te, k)
                            : f == "{"
                              ? Tt(ne, "}", null, k)
                              : f == "quasi"
                                ? H(lt, k)
                                : f == "new"
                                  ? c(w(L))
                                  : c();
            }
            function gt(f) {
              return f.match(/[;\}\)\],]/) ? H() : H(G);
            }
            function Le(f, h) {
              return f == "," ? c(gt) : Ke(f, h, !1);
            }
            function Ke(f, h, L) {
              var O = L == !1 ? Le : Ke,
                k = L == !1 ? G : Ve;
              if (f == "=>") return c(pe, L ? Ne : re, ze);
              if (f == "operator")
                return /\+\+|--/.test(h) || (_ && h == "!")
                  ? c(O)
                  : _ &&
                      h == "<" &&
                      T.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, !1)
                    ? c(le(">"), ve(ke, ">"), te, O)
                    : h == "?"
                      ? c(G, de(":"), k)
                      : c(k);
              if (f == "quasi") return H(lt, O);
              if (f != ";") {
                if (f == "(") return Tt(Ve, ")", "call", O);
                if (f == ".") return c(R, O);
                if (f == "[") return c(le("]"), gt, de("]"), te, O);
                if (_ && h == "as") return (T.marked = "keyword"), c(ke, O);
                if (f == "regexp")
                  return (
                    (T.state.lastType = T.marked = "operator"),
                    T.stream.backUp(T.stream.pos - T.stream.start - 1),
                    c(k)
                  );
              }
            }
            function lt(f, h) {
              return f != "quasi"
                ? H()
                : h.slice(h.length - 2) != "${"
                  ? c(lt)
                  : c(gt, ht);
            }
            function ht(f) {
              if (f == "}")
                return (T.marked = "string-2"), (T.state.tokenize = _e), c(lt);
            }
            function re(f) {
              return Me(T.stream, T.state), H(f == "{" ? he : G);
            }
            function Ne(f) {
              return Me(T.stream, T.state), H(f == "{" ? he : Ve);
            }
            function w(f) {
              return function (h) {
                return h == "."
                  ? c(f ? C : A)
                  : h == "variable" && _
                    ? c(Lt, f ? Ke : Le)
                    : H(f ? Ve : G);
              };
            }
            function A(f, h) {
              if (h == "target") return (T.marked = "keyword"), c(Le);
            }
            function C(f, h) {
              if (h == "target") return (T.marked = "keyword"), c(Ke);
            }
            function be(f) {
              return f == ":" ? c(te, he) : H(Le, de(";"), te);
            }
            function R(f) {
              if (f == "variable") return (T.marked = "property"), c();
            }
            function ne(f, h) {
              if (f == "async") return (T.marked = "property"), c(ne);
              if (f == "variable" || T.style == "keyword") {
                if (((T.marked = "property"), h == "get" || h == "set"))
                  return c(Y);
                var L;
                return (
                  _ &&
                    T.state.fatArrowAt == T.stream.start &&
                    (L = T.stream.match(/^\s*:\s*/, !1)) &&
                    (T.state.fatArrowAt = T.stream.pos + L[0].length),
                  c(we)
                );
              } else {
                if (f == "number" || f == "string")
                  return (
                    (T.marked = Ce ? "property" : T.style + " property"), c(we)
                  );
                if (f == "jsonld-keyword") return c(we);
                if (_ && g(h)) return (T.marked = "keyword"), c(ne);
                if (f == "[") return c(G, rr, de("]"), we);
                if (f == "spread") return c(Ve, we);
                if (h == "*") return (T.marked = "keyword"), c(ne);
                if (f == ":") return H(we);
              }
            }
            function Y(f) {
              return f != "variable" ? H(we) : ((T.marked = "property"), c(Pt));
            }
            function we(f) {
              if (f == ":") return c(Ve);
              if (f == "(") return H(Pt);
            }
            function ve(f, h, L) {
              function O(k, I) {
                if (L ? L.indexOf(k) > -1 : k == ",") {
                  var De = T.state.lexical;
                  return (
                    De.info == "call" && (De.pos = (De.pos || 0) + 1),
                    c(function (et, mt) {
                      return et == h || mt == h ? H() : H(f);
                    }, O)
                  );
                }
                return k == h || I == h
                  ? c()
                  : L && L.indexOf(";") > -1
                    ? H(f)
                    : c(de(h));
              }
              return function (k, I) {
                return k == h || I == h ? c() : H(f, O);
              };
            }
            function Tt(f, h, L) {
              for (var O = 3; O < arguments.length; O++)
                T.cc.push(arguments[O]);
              return c(le(h, L), ve(f, h), te);
            }
            function Ot(f) {
              return f == "}" ? c() : H(he, Ot);
            }
            function rr(f, h) {
              if (_) {
                if (f == ":") return c(ke);
                if (h == "?") return c(rr);
              }
            }
            function mr(f, h) {
              if (_ && (f == ":" || h == "in")) return c(ke);
            }
            function nr(f) {
              if (_ && f == ":")
                return T.stream.match(/^\s*\w+\s+is\b/, !1)
                  ? c(G, gi, ke)
                  : c(ke);
            }
            function gi(f, h) {
              if (h == "is") return (T.marked = "keyword"), c();
            }
            function ke(f, h) {
              if (
                h == "keyof" ||
                h == "typeof" ||
                h == "infer" ||
                h == "readonly"
              )
                return (T.marked = "keyword"), c(h == "typeof" ? Ve : ke);
              if (f == "variable" || h == "void")
                return (T.marked = "type"), c(zt);
              if (h == "|" || h == "&") return c(ke);
              if (f == "string" || f == "number" || f == "atom") return c(zt);
              if (f == "[") return c(le("]"), ve(ke, "]", ","), te, zt);
              if (f == "{") return c(le("}"), J, te, zt);
              if (f == "(") return c(ve(qe, ")"), Wn, zt);
              if (f == "<") return c(ve(ke, ">"), ke);
              if (f == "quasi") return H(ut, zt);
            }
            function Wn(f) {
              if (f == "=>") return c(ke);
            }
            function J(f) {
              return f.match(/[\}\)\]]/)
                ? c()
                : f == "," || f == ";"
                  ? c(J)
                  : H(Yt, J);
            }
            function Yt(f, h) {
              if (f == "variable" || T.style == "keyword")
                return (T.marked = "property"), c(Yt);
              if (h == "?" || f == "number" || f == "string") return c(Yt);
              if (f == ":") return c(ke);
              if (f == "[") return c(de("variable"), mr, de("]"), Yt);
              if (f == "(") return H(lr, Yt);
              if (!f.match(/[;\}\)\],]/)) return c();
            }
            function ut(f, h) {
              return f != "quasi"
                ? H()
                : h.slice(h.length - 2) != "${"
                  ? c(ut)
                  : c(ke, Ge);
            }
            function Ge(f) {
              if (f == "}")
                return (T.marked = "string-2"), (T.state.tokenize = _e), c(ut);
            }
            function qe(f, h) {
              return (f == "variable" && T.stream.match(/^\s*[?:]/, !1)) ||
                h == "?"
                ? c(qe)
                : f == ":"
                  ? c(ke)
                  : f == "spread"
                    ? c(qe)
                    : H(ke);
            }
            function zt(f, h) {
              if (h == "<") return c(le(">"), ve(ke, ">"), te, zt);
              if (h == "|" || f == "." || h == "&") return c(ke);
              if (f == "[") return c(ke, de("]"), zt);
              if (h == "extends" || h == "implements")
                return (T.marked = "keyword"), c(ke);
              if (h == "?") return c(ke, de(":"), ke);
            }
            function Lt(f, h) {
              if (h == "<") return c(le(">"), ve(ke, ">"), te, zt);
            }
            function Et() {
              return H(ke, ft);
            }
            function ft(f, h) {
              if (h == "=") return c(ke);
            }
            function zr(f, h) {
              return h == "enum"
                ? ((T.marked = "keyword"), c(U))
                : H(yt, rr, It, yi);
            }
            function yt(f, h) {
              if (_ && g(h)) return (T.marked = "keyword"), c(yt);
              if (f == "variable") return b(h), c();
              if (f == "spread") return c(yt);
              if (f == "[") return Tt(ln, "]");
              if (f == "{") return Tt(ir, "}");
            }
            function ir(f, h) {
              return f == "variable" && !T.stream.match(/^\s*:/, !1)
                ? (b(h), c(It))
                : (f == "variable" && (T.marked = "property"),
                  f == "spread"
                    ? c(yt)
                    : f == "}"
                      ? H()
                      : f == "["
                        ? c(G, de("]"), de(":"), ir)
                        : c(de(":"), yt, It));
            }
            function ln() {
              return H(yt, It);
            }
            function It(f, h) {
              if (h == "=") return c(Ve);
            }
            function yi(f) {
              if (f == ",") return c(zr);
            }
            function Pr(f, h) {
              if (f == "keyword b" && h == "else")
                return c(le("form", "else"), he, te);
            }
            function _n(f, h) {
              if (h == "await") return c(_n);
              if (f == "(") return c(le(")"), an, te);
            }
            function an(f) {
              return f == "var" ? c(zr, or) : f == "variable" ? c(or) : H(or);
            }
            function or(f, h) {
              return f == ")"
                ? c()
                : f == ";"
                  ? c(or)
                  : h == "in" || h == "of"
                    ? ((T.marked = "keyword"), c(G, or))
                    : H(G, or);
            }
            function Pt(f, h) {
              if (h == "*") return (T.marked = "keyword"), c(Pt);
              if (f == "variable") return b(h), c(Pt);
              if (f == "(") return c(pe, le(")"), ve(Ft, ")"), te, nr, he, ze);
              if (_ && h == "<") return c(le(">"), ve(Et, ">"), te, Pt);
            }
            function lr(f, h) {
              if (h == "*") return (T.marked = "keyword"), c(lr);
              if (f == "variable") return b(h), c(lr);
              if (f == "(") return c(pe, le(")"), ve(Ft, ")"), te, nr, ze);
              if (_ && h == "<") return c(le(">"), ve(Et, ">"), te, lr);
            }
            function Hn(f, h) {
              if (f == "keyword" || f == "variable")
                return (T.marked = "type"), c(Hn);
              if (h == "<") return c(le(">"), ve(Et, ">"), te);
            }
            function Ft(f, h) {
              return (
                h == "@" && c(G, Ft),
                f == "spread"
                  ? c(Ft)
                  : _ && g(h)
                    ? ((T.marked = "keyword"), c(Ft))
                    : _ && f == "this"
                      ? c(rr, It)
                      : H(yt, rr, It)
              );
            }
            function mi(f, h) {
              return f == "variable" ? Er(f, h) : Wt(f, h);
            }
            function Er(f, h) {
              if (f == "variable") return b(h), c(Wt);
            }
            function Wt(f, h) {
              if (h == "<") return c(le(">"), ve(Et, ">"), te, Wt);
              if (h == "extends" || h == "implements" || (_ && f == ","))
                return (
                  h == "implements" && (T.marked = "keyword"), c(_ ? ke : G, Wt)
                );
              if (f == "{") return c(le("}"), _t, te);
            }
            function _t(f, h) {
              if (
                f == "async" ||
                (f == "variable" &&
                  (h == "static" || h == "get" || h == "set" || (_ && g(h))) &&
                  T.stream.match(/^\s+#?[\w$\xa1-\uffff]/, !1))
              )
                return (T.marked = "keyword"), c(_t);
              if (f == "variable" || T.style == "keyword")
                return (T.marked = "property"), c(br, _t);
              if (f == "number" || f == "string") return c(br, _t);
              if (f == "[") return c(G, rr, de("]"), br, _t);
              if (h == "*") return (T.marked = "keyword"), c(_t);
              if (_ && f == "(") return H(lr, _t);
              if (f == ";" || f == ",") return c(_t);
              if (f == "}") return c();
              if (h == "@") return c(G, _t);
            }
            function br(f, h) {
              if (h == "!" || h == "?") return c(br);
              if (f == ":") return c(ke, It);
              if (h == "=") return c(Ve);
              var L = T.state.lexical.prev,
                O = L && L.info == "interface";
              return H(O ? lr : Pt);
            }
            function Ir(f, h) {
              return h == "*"
                ? ((T.marked = "keyword"), c(_r, de(";")))
                : h == "default"
                  ? ((T.marked = "keyword"), c(G, de(";")))
                  : f == "{"
                    ? c(ve(Fr, "}"), _r, de(";"))
                    : H(he);
            }
            function Fr(f, h) {
              if (h == "as") return (T.marked = "keyword"), c(de("variable"));
              if (f == "variable") return H(Ve, Fr);
            }
            function ar(f) {
              return f == "string"
                ? c()
                : f == "("
                  ? H(G)
                  : f == "."
                    ? H(Le)
                    : H(Wr, Ut, _r);
            }
            function Wr(f, h) {
              return f == "{"
                ? Tt(Wr, "}")
                : (f == "variable" && b(h),
                  h == "*" && (T.marked = "keyword"),
                  c(sn));
            }
            function Ut(f) {
              if (f == ",") return c(Wr, Ut);
            }
            function sn(f, h) {
              if (h == "as") return (T.marked = "keyword"), c(Wr);
            }
            function _r(f, h) {
              if (h == "from") return (T.marked = "keyword"), c(G);
            }
            function je(f) {
              return f == "]" ? c() : H(ve(Ve, "]"));
            }
            function U() {
              return H(le("form"), yt, de("{"), le("}"), ve(Zt, "}"), te, te);
            }
            function Zt() {
              return H(yt, It);
            }
            function un(f, h) {
              return (
                f.lastType == "operator" ||
                f.lastType == "," ||
                se.test(h.charAt(0)) ||
                /[,.]/.test(h.charAt(0))
              );
            }
            function Dt(f, h, L) {
              return (
                (h.tokenize == V &&
                  /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(
                    h.lastType,
                  )) ||
                (h.lastType == "quasi" &&
                  /\{\s*$/.test(f.string.slice(0, f.pos - (L || 0))))
              );
            }
            return {
              startState: function (f) {
                var h = {
                  tokenize: V,
                  lastType: "sof",
                  cc: [],
                  lexical: new ee((f || 0) - We, 0, "block", !1),
                  localVars: Se.localVars,
                  context: Se.localVars && new D(null, null, !1),
                  indented: f || 0,
                };
                return (
                  Se.globalVars &&
                    typeof Se.globalVars == "object" &&
                    (h.globalVars = Se.globalVars),
                  h
                );
              },
              token: function (f, h) {
                if (
                  (f.sol() &&
                    (h.lexical.hasOwnProperty("align") ||
                      (h.lexical.align = !1),
                    (h.indented = f.indentation()),
                    Me(f, h)),
                  h.tokenize != xe && f.eatSpace())
                )
                  return null;
                var L = h.tokenize(f, h);
                return Te == "comment"
                  ? L
                  : ((h.lastType =
                      Te == "operator" && (Oe == "++" || Oe == "--")
                        ? "incdec"
                        : Te),
                    me(h, L, Te, Oe, f));
              },
              indent: function (f, h) {
                if (f.tokenize == xe || f.tokenize == _e) return F.Pass;
                if (f.tokenize != V) return 0;
                var L = h && h.charAt(0),
                  O = f.lexical,
                  k;
                if (!/^\s*else\b/.test(h))
                  for (var I = f.cc.length - 1; I >= 0; --I) {
                    var De = f.cc[I];
                    if (De == te) O = O.prev;
                    else if (De != Pr && De != ze) break;
                  }
                for (
                  ;
                  (O.type == "stat" || O.type == "form") &&
                  (L == "}" ||
                    ((k = f.cc[f.cc.length - 1]) &&
                      (k == Le || k == Ke) &&
                      !/^[,\.=+\-*:?[\(]/.test(h)));

                )
                  O = O.prev;
                Qe && O.type == ")" && O.prev.type == "stat" && (O = O.prev);
                var et = O.type,
                  mt = L == et;
                return et == "vardef"
                  ? O.indented +
                      (f.lastType == "operator" || f.lastType == ","
                        ? O.info.length + 1
                        : 0)
                  : et == "form" && L == "{"
                    ? O.indented
                    : et == "form"
                      ? O.indented + We
                      : et == "stat"
                        ? O.indented + (un(f, h) ? Qe || We : 0)
                        : O.info == "switch" &&
                            !mt &&
                            Se.doubleIndentSwitch != !1
                          ? O.indented +
                            (/^(?:case|default)\b/.test(h) ? We : 2 * We)
                          : O.align
                            ? O.column + (mt ? 0 : 1)
                            : O.indented + (mt ? 0 : We);
              },
              electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
              blockCommentStart: M ? null : "/*",
              blockCommentEnd: M ? null : "*/",
              blockCommentContinue: M ? null : " * ",
              lineComment: M ? null : "//",
              fold: "brace",
              closeBrackets: "()[]{}''\"\"``",
              helperType: M ? "json" : "javascript",
              jsonldMode: Ce,
              jsonMode: M,
              expressionAllowed: Dt,
              skipExpression: function (f) {
                me(f, "atom", "atom", "true", new F.StringStream("", 2, null));
              },
            };
          }),
            F.registerHelper("wordChars", "javascript", /[\w$]/),
            F.defineMIME("text/javascript", "javascript"),
            F.defineMIME("text/ecmascript", "javascript"),
            F.defineMIME("application/javascript", "javascript"),
            F.defineMIME("application/x-javascript", "javascript"),
            F.defineMIME("application/ecmascript", "javascript"),
            F.defineMIME("application/json", { name: "javascript", json: !0 }),
            F.defineMIME("application/x-json", {
              name: "javascript",
              json: !0,
            }),
            F.defineMIME("application/manifest+json", {
              name: "javascript",
              json: !0,
            }),
            F.defineMIME("application/ld+json", {
              name: "javascript",
              jsonld: !0,
            }),
            F.defineMIME("text/typescript", {
              name: "javascript",
              typescript: !0,
            }),
            F.defineMIME("application/typescript", {
              name: "javascript",
              typescript: !0,
            });
        });
      })()),
    pa.exports
  );
}
(function (yr, Or) {
  (function (F) {
    F(Ar, wu(), ya(), xu);
  })(function (F) {
    var Ee = {
      script: [
        ["lang", /(javascript|babel)/i, "javascript"],
        [
          "type",
          /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i,
          "javascript",
        ],
        ["type", /./, "text/plain"],
        [null, null, "javascript"],
      ],
      style: [
        ["lang", /^css$/i, "css"],
        ["type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css"],
        ["type", /./, "text/plain"],
        [null, null, "css"],
      ],
    };
    function Se(ie, q, se) {
      var ce = ie.current(),
        Ie = ce.search(q);
      return (
        Ie > -1
          ? ie.backUp(ce.length - Ie)
          : ce.match(/<\/?$/) &&
            (ie.backUp(ce.length), ie.match(q, !1) || ie.match(ce)),
        se
      );
    }
    var We = {};
    function Qe(ie) {
      var q = We[ie];
      return (
        q ||
        (We[ie] = new RegExp("\\s+" + ie + `\\s*=\\s*('|")?([^'"]+)('|")?\\s*`))
      );
    }
    function Ce(ie, q) {
      var se = ie.match(Qe(q));
      return se ? /^\s*(.*?)\s*$/.exec(se[2])[1] : "";
    }
    function M(ie, q) {
      return new RegExp((q ? "^" : "") + "</\\s*" + ie + "\\s*>", "i");
    }
    function j(ie, q) {
      for (var se in ie)
        for (
          var ce = q[se] || (q[se] = []), Ie = ie[se], Te = Ie.length - 1;
          Te >= 0;
          Te--
        )
          ce.unshift(Ie[Te]);
    }
    function _(ie, q) {
      for (var se = 0; se < ie.length; se++) {
        var ce = ie[se];
        if (!ce[0] || ce[1].test(Ce(q, ce[0]))) return ce[2];
      }
    }
    F.defineMode(
      "htmlmixed",
      function (ie, q) {
        var se = F.getMode(ie, {
            name: "xml",
            htmlMode: !0,
            multilineTagIndentFactor: q.multilineTagIndentFactor,
            multilineTagIndentPastTag: q.multilineTagIndentPastTag,
            allowMissingTagName: q.allowMissingTagName,
          }),
          ce = {},
          Ie = q && q.tags,
          Te = q && q.scriptTypes;
        if ((j(Ee, ce), Ie && j(Ie, ce), Te))
          for (var Oe = Te.length - 1; Oe >= 0; Oe--)
            ce.script.unshift(["type", Te[Oe].matches, Te[Oe].mode]);
        function ae(V, oe) {
          var xe = se.token(V, oe.htmlState),
            _e = /\btag\b/.test(xe),
            ye;
          if (
            _e &&
            !/[<>\s\/]/.test(V.current()) &&
            (ye = oe.htmlState.tagName && oe.htmlState.tagName.toLowerCase()) &&
            ce.hasOwnProperty(ye)
          )
            oe.inTag = ye + " ";
          else if (oe.inTag && _e && />$/.test(V.current())) {
            var Me = /^([\S]+) (.*)/.exec(oe.inTag);
            oe.inTag = null;
            var He = V.current() == ">" && _(ce[Me[1]], Me[2]),
              ee = F.getMode(ie, He),
              X = M(Me[1], !0),
              me = M(Me[1], !1);
            (oe.token = function (T, H) {
              return T.match(X, !1)
                ? ((H.token = ae), (H.localState = H.localMode = null), null)
                : Se(T, me, H.localMode.token(T, H.localState));
            }),
              (oe.localMode = ee),
              (oe.localState = F.startState(
                ee,
                se.indent(oe.htmlState, "", ""),
              ));
          } else
            oe.inTag &&
              ((oe.inTag += V.current()), V.eol() && (oe.inTag += " "));
          return xe;
        }
        return {
          startState: function () {
            var V = F.startState(se);
            return {
              token: ae,
              inTag: null,
              localMode: null,
              localState: null,
              htmlState: V,
            };
          },
          copyState: function (V) {
            var oe;
            return (
              V.localState && (oe = F.copyState(V.localMode, V.localState)),
              {
                token: V.token,
                inTag: V.inTag,
                localMode: V.localMode,
                localState: oe,
                htmlState: F.copyState(se, V.htmlState),
              }
            );
          },
          token: function (V, oe) {
            return oe.token(V, oe);
          },
          indent: function (V, oe, xe) {
            return !V.localMode || /^\s*<\//.test(oe)
              ? se.indent(V.htmlState, oe, xe)
              : V.localMode.indent
                ? V.localMode.indent(V.localState, oe, xe)
                : F.Pass;
          },
          innerMode: function (V) {
            return {
              state: V.localState || V.htmlState,
              mode: V.localMode || se,
            };
          },
        };
      },
      "xml",
      "javascript",
      "css",
    ),
      F.defineMIME("text/html", "htmlmixed");
  });
})();
ya();
(function (yr, Or) {
  (function (F) {
    F(Ar);
  })(function (F) {
    function Ee(j) {
      return new RegExp("^((" + j.join(")|(") + "))\\b");
    }
    var Se = Ee(["and", "or", "not", "is"]),
      We = [
        "as",
        "assert",
        "break",
        "class",
        "continue",
        "def",
        "del",
        "elif",
        "else",
        "except",
        "finally",
        "for",
        "from",
        "global",
        "if",
        "import",
        "lambda",
        "pass",
        "raise",
        "return",
        "try",
        "while",
        "with",
        "yield",
        "in",
        "False",
        "True",
      ],
      Qe = [
        "abs",
        "all",
        "any",
        "bin",
        "bool",
        "bytearray",
        "callable",
        "chr",
        "classmethod",
        "compile",
        "complex",
        "delattr",
        "dict",
        "dir",
        "divmod",
        "enumerate",
        "eval",
        "filter",
        "float",
        "format",
        "frozenset",
        "getattr",
        "globals",
        "hasattr",
        "hash",
        "help",
        "hex",
        "id",
        "input",
        "int",
        "isinstance",
        "issubclass",
        "iter",
        "len",
        "list",
        "locals",
        "map",
        "max",
        "memoryview",
        "min",
        "next",
        "object",
        "oct",
        "open",
        "ord",
        "pow",
        "property",
        "range",
        "repr",
        "reversed",
        "round",
        "set",
        "setattr",
        "slice",
        "sorted",
        "staticmethod",
        "str",
        "sum",
        "super",
        "tuple",
        "type",
        "vars",
        "zip",
        "__import__",
        "NotImplemented",
        "Ellipsis",
        "__debug__",
      ];
    F.registerHelper(
      "hintWords",
      "python",
      We.concat(Qe).concat(["exec", "print"]),
    );
    function Ce(j) {
      return j.scopes[j.scopes.length - 1];
    }
    F.defineMode("python", function (j, _) {
      for (
        var ie = "error",
          q = _.delimiters || _.singleDelimiters || /^[\(\)\[\]\{\}@,:`=;\.\\]/,
          se = [
            _.singleOperators,
            _.doubleOperators,
            _.doubleDelimiters,
            _.tripleDelimiters,
            _.operators ||
              /^([-+*/%\/&|^]=?|[<>=]+|\/\/=?|\*\*=?|!=|[~!@]|\.\.\.)/,
          ],
          ce = 0;
        ce < se.length;
        ce++
      )
        se[ce] || se.splice(ce--, 1);
      var Ie = _.hangingIndent || j.indentUnit,
        Te = We,
        Oe = Qe;
      _.extra_keywords != null && (Te = Te.concat(_.extra_keywords)),
        _.extra_builtins != null && (Oe = Oe.concat(_.extra_builtins));
      var ae = !(_.version && Number(_.version) < 3);
      if (ae) {
        var V =
          _.identifiers || /^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;
        (Te = Te.concat([
          "nonlocal",
          "None",
          "aiter",
          "anext",
          "async",
          "await",
          "breakpoint",
          "match",
          "case",
        ])),
          (Oe = Oe.concat(["ascii", "bytes", "exec", "print"]));
        var oe = new RegExp(
          `^(([rbuf]|(br)|(rb)|(fr)|(rf))?('{3}|"{3}|['"]))`,
          "i",
        );
      } else {
        var V = _.identifiers || /^[_A-Za-z][_A-Za-z0-9]*/;
        (Te = Te.concat(["exec", "print"])),
          (Oe = Oe.concat([
            "apply",
            "basestring",
            "buffer",
            "cmp",
            "coerce",
            "execfile",
            "file",
            "intern",
            "long",
            "raw_input",
            "reduce",
            "reload",
            "unichr",
            "unicode",
            "xrange",
            "None",
          ]));
        var oe = new RegExp(`^(([rubf]|(ur)|(br))?('{3}|"{3}|['"]))`, "i");
      }
      var xe = Ee(Te),
        _e = Ee(Oe);
      function ye(x, b) {
        var v = x.sol() && b.lastToken != "\\";
        if ((v && (b.indent = x.indentation()), v && Ce(b).type == "py")) {
          var g = Ce(b).offset;
          if (x.eatSpace()) {
            var D = x.indentation();
            return (
              D > g
                ? X(b)
                : D < g && T(x, b) && x.peek() != "#" && (b.errorToken = !0),
              null
            );
          } else {
            var K = Me(x, b);
            return g > 0 && T(x, b) && (K += " " + ie), K;
          }
        }
        return Me(x, b);
      }
      function Me(x, b, v) {
        if (x.eatSpace()) return null;
        if (!v && x.match(/^#.*/)) return "comment";
        if (x.match(/^[0-9\.]/, !1)) {
          var g = !1;
          if (
            (x.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i) && (g = !0),
            x.match(/^[\d_]+\.\d*/) && (g = !0),
            x.match(/^\.\d+/) && (g = !0),
            g)
          )
            return x.eat(/J/i), "number";
          var D = !1;
          if (
            (x.match(/^0x[0-9a-f_]+/i) && (D = !0),
            x.match(/^0b[01_]+/i) && (D = !0),
            x.match(/^0o[0-7_]+/i) && (D = !0),
            x.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/) && (x.eat(/J/i), (D = !0)),
            x.match(/^0(?![\dx])/i) && (D = !0),
            D)
          )
            return x.eat(/L/i), "number";
        }
        if (x.match(oe)) {
          var K = x.current().toLowerCase().indexOf("f") !== -1;
          return K
            ? ((b.tokenize = He(x.current(), b.tokenize)), b.tokenize(x, b))
            : ((b.tokenize = ee(x.current(), b.tokenize)), b.tokenize(x, b));
        }
        for (var $ = 0; $ < se.length; $++)
          if (x.match(se[$])) return "operator";
        return x.match(q)
          ? "punctuation"
          : b.lastToken == "." && x.match(V)
            ? "property"
            : x.match(xe) || x.match(Se)
              ? "keyword"
              : x.match(_e)
                ? "builtin"
                : x.match(/^(self|cls)\b/)
                  ? "variable-2"
                  : x.match(V)
                    ? b.lastToken == "def" || b.lastToken == "class"
                      ? "def"
                      : "variable"
                    : (x.next(), v ? null : ie);
      }
      function He(x, b) {
        for (; "rubf".indexOf(x.charAt(0).toLowerCase()) >= 0; )
          x = x.substr(1);
        var v = x.length == 1,
          g = "string";
        function D($) {
          return function (pe, Re) {
            var ze = Me(pe, Re, !0);
            return (
              ze == "punctuation" &&
                (pe.current() == "{"
                  ? (Re.tokenize = D($ + 1))
                  : pe.current() == "}" &&
                    ($ > 1 ? (Re.tokenize = D($ - 1)) : (Re.tokenize = K))),
              ze
            );
          };
        }
        function K($, pe) {
          for (; !$.eol(); )
            if (($.eatWhile(/[^'"\{\}\\]/), $.eat("\\"))) {
              if (($.next(), v && $.eol())) return g;
            } else {
              if ($.match(x)) return (pe.tokenize = b), g;
              if ($.match("{{")) return g;
              if ($.match("{", !1))
                return (
                  (pe.tokenize = D(0)), $.current() ? g : pe.tokenize($, pe)
                );
              if ($.match("}}")) return g;
              if ($.match("}")) return ie;
              $.eat(/['"]/);
            }
          if (v) {
            if (_.singleLineStringErrors) return ie;
            pe.tokenize = b;
          }
          return g;
        }
        return (K.isString = !0), K;
      }
      function ee(x, b) {
        for (; "rubf".indexOf(x.charAt(0).toLowerCase()) >= 0; )
          x = x.substr(1);
        var v = x.length == 1,
          g = "string";
        function D(K, $) {
          for (; !K.eol(); )
            if ((K.eatWhile(/[^'"\\]/), K.eat("\\"))) {
              if ((K.next(), v && K.eol())) return g;
            } else {
              if (K.match(x)) return ($.tokenize = b), g;
              K.eat(/['"]/);
            }
          if (v) {
            if (_.singleLineStringErrors) return ie;
            $.tokenize = b;
          }
          return g;
        }
        return (D.isString = !0), D;
      }
      function X(x) {
        for (; Ce(x).type != "py"; ) x.scopes.pop();
        x.scopes.push({
          offset: Ce(x).offset + j.indentUnit,
          type: "py",
          align: null,
        });
      }
      function me(x, b, v) {
        var g = x.match(/^[\s\[\{\(]*(?:#|$)/, !1) ? null : x.column() + 1;
        b.scopes.push({ offset: b.indent + Ie, type: v, align: g });
      }
      function T(x, b) {
        for (
          var v = x.indentation();
          b.scopes.length > 1 && Ce(b).offset > v;

        ) {
          if (Ce(b).type != "py") return !0;
          b.scopes.pop();
        }
        return Ce(b).offset != v;
      }
      function H(x, b) {
        x.sol() && ((b.beginningOfLine = !0), (b.dedent = !1));
        var v = b.tokenize(x, b),
          g = x.current();
        if (b.beginningOfLine && g == "@")
          return x.match(V, !1) ? "meta" : ae ? "operator" : ie;
        if (
          (/\S/.test(g) && (b.beginningOfLine = !1),
          (v == "variable" || v == "builtin") &&
            b.lastToken == "meta" &&
            (v = "meta"),
          (g == "pass" || g == "return") && (b.dedent = !0),
          g == "lambda" && (b.lambda = !0),
          g == ":" &&
            !b.lambda &&
            Ce(b).type == "py" &&
            x.match(/^\s*(?:#|$)/, !1) &&
            X(b),
          g.length == 1 && !/string|comment/.test(v))
        ) {
          var D = "[({".indexOf(g);
          if (
            (D != -1 && me(x, b, "])}".slice(D, D + 1)),
            (D = "])}".indexOf(g)),
            D != -1)
          )
            if (Ce(b).type == g) b.indent = b.scopes.pop().offset - Ie;
            else return ie;
        }
        return (
          b.dedent &&
            x.eol() &&
            Ce(b).type == "py" &&
            b.scopes.length > 1 &&
            b.scopes.pop(),
          v
        );
      }
      var c = {
        startState: function (x) {
          return {
            tokenize: ye,
            scopes: [{ offset: x || 0, type: "py", align: null }],
            indent: x || 0,
            lastToken: null,
            lambda: !1,
            dedent: 0,
          };
        },
        token: function (x, b) {
          var v = b.errorToken;
          v && (b.errorToken = !1);
          var g = H(x, b);
          return (
            g &&
              g != "comment" &&
              (b.lastToken =
                g == "keyword" || g == "punctuation" ? x.current() : g),
            g == "punctuation" && (g = null),
            x.eol() && b.lambda && (b.lambda = !1),
            v ? g + " " + ie : g
          );
        },
        indent: function (x, b) {
          if (x.tokenize != ye) return x.tokenize.isString ? F.Pass : 0;
          var v = Ce(x),
            g =
              v.type == b.charAt(0) ||
              (v.type == "py" &&
                !x.dedent &&
                /^(else:|elif |except |finally:)/.test(b));
          return v.align != null
            ? v.align - (g ? 1 : 0)
            : v.offset - (g ? Ie : 0);
        },
        electricInput: /^\s*([\}\]\)]|else:|elif |except |finally:)$/,
        closeBrackets: { triples: `'"` },
        lineComment: "#",
        fold: "indent",
      };
      return c;
    }),
      F.defineMIME("text/x-python", "python");
    var M = function (j) {
      return j.split(" ");
    };
    F.defineMIME("text/x-cython", {
      name: "python",
      extra_keywords: M(
        "by cdef cimport cpdef ctypedef enum except extern gil include nogil property public readonly struct union DEF IF ELIF ELSE",
      ),
    });
  });
})();
(function (yr, Or) {
  (function (F) {
    F(Ar);
  })(function (F) {
    function Ee(v, g, D, K, $, pe) {
      (this.indented = v),
        (this.column = g),
        (this.type = D),
        (this.info = K),
        (this.align = $),
        (this.prev = pe);
    }
    function Se(v, g, D, K) {
      var $ = v.indented;
      return (
        v.context &&
          v.context.type == "statement" &&
          D != "statement" &&
          ($ = v.context.indented),
        (v.context = new Ee($, g, D, K, null, v.context))
      );
    }
    function We(v) {
      var g = v.context.type;
      return (
        (g == ")" || g == "]" || g == "}") && (v.indented = v.context.indented),
        (v.context = v.context.prev)
      );
    }
    function Qe(v, g, D) {
      if (
        g.prevToken == "variable" ||
        g.prevToken == "type" ||
        /\S(?:[^- ]>|[*\]])\s*$|\*$/.test(v.string.slice(0, D)) ||
        (g.typeAtEndOfLine && v.column() == v.indentation())
      )
        return !0;
    }
    function Ce(v) {
      for (;;) {
        if (!v || v.type == "top") return !0;
        if (v.type == "}" && v.prev.info != "namespace") return !1;
        v = v.prev;
      }
    }
    F.defineMode("clike", function (v, g) {
      var D = v.indentUnit,
        K = g.statementIndentUnit || D,
        $ = g.dontAlignCalls,
        pe = g.keywords || {},
        Re = g.types || {},
        ze = g.builtin || {},
        le = g.blockKeywords || {},
        te = g.defKeywords || {},
        de = g.atoms || {},
        he = g.hooks || {},
        ue = g.multiLineStrings,
        G = g.indentStatements !== !1,
        Ve = g.indentSwitch !== !1,
        Ct = g.namespaceSeparator,
        st = g.isPunctuationChar || /[\[\]{}\(\),;\:\.]/,
        gt = g.numberStart || /[\d\.]/,
        Le =
          g.number ||
          /^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i,
        Ke = g.isOperatorChar || /[+\-*&%=<>!?|\/]/,
        lt = g.isIdentifierChar || /[\w\$_\xa1-\uffff]/,
        ht = g.isReservedIdentifier || !1,
        re,
        Ne;
      function w(R, ne) {
        var Y = R.next();
        if (he[Y]) {
          var we = he[Y](R, ne);
          if (we !== !1) return we;
        }
        if (Y == '"' || Y == "'")
          return (ne.tokenize = A(Y)), ne.tokenize(R, ne);
        if (gt.test(Y)) {
          if ((R.backUp(1), R.match(Le))) return "number";
          R.next();
        }
        if (st.test(Y)) return (re = Y), null;
        if (Y == "/") {
          if (R.eat("*")) return (ne.tokenize = C), C(R, ne);
          if (R.eat("/")) return R.skipToEnd(), "comment";
        }
        if (Ke.test(Y)) {
          for (; !R.match(/^\/[\/*]/, !1) && R.eat(Ke); );
          return "operator";
        }
        if ((R.eatWhile(lt), Ct)) for (; R.match(Ct); ) R.eatWhile(lt);
        var ve = R.current();
        return j(pe, ve)
          ? (j(le, ve) && (re = "newstatement"),
            j(te, ve) && (Ne = !0),
            "keyword")
          : j(Re, ve)
            ? "type"
            : j(ze, ve) || (ht && ht(ve))
              ? (j(le, ve) && (re = "newstatement"), "builtin")
              : j(de, ve)
                ? "atom"
                : "variable";
      }
      function A(R) {
        return function (ne, Y) {
          for (var we = !1, ve, Tt = !1; (ve = ne.next()) != null; ) {
            if (ve == R && !we) {
              Tt = !0;
              break;
            }
            we = !we && ve == "\\";
          }
          return (Tt || !(we || ue)) && (Y.tokenize = null), "string";
        };
      }
      function C(R, ne) {
        for (var Y = !1, we; (we = R.next()); ) {
          if (we == "/" && Y) {
            ne.tokenize = null;
            break;
          }
          Y = we == "*";
        }
        return "comment";
      }
      function be(R, ne) {
        g.typeFirstDefinitions &&
          R.eol() &&
          Ce(ne.context) &&
          (ne.typeAtEndOfLine = Qe(R, ne, R.pos));
      }
      return {
        startState: function (R) {
          return {
            tokenize: null,
            context: new Ee((R || 0) - D, 0, "top", null, !1),
            indented: 0,
            startOfLine: !0,
            prevToken: null,
          };
        },
        token: function (R, ne) {
          var Y = ne.context;
          if (
            (R.sol() &&
              (Y.align == null && (Y.align = !1),
              (ne.indented = R.indentation()),
              (ne.startOfLine = !0)),
            R.eatSpace())
          )
            return be(R, ne), null;
          re = Ne = null;
          var we = (ne.tokenize || w)(R, ne);
          if (we == "comment" || we == "meta") return we;
          if (
            (Y.align == null && (Y.align = !0),
            re == ";" ||
              re == ":" ||
              (re == "," && R.match(/^\s*(?:\/\/.*)?$/, !1)))
          )
            for (; ne.context.type == "statement"; ) We(ne);
          else if (re == "{") Se(ne, R.column(), "}");
          else if (re == "[") Se(ne, R.column(), "]");
          else if (re == "(") Se(ne, R.column(), ")");
          else if (re == "}") {
            for (; Y.type == "statement"; ) Y = We(ne);
            for (Y.type == "}" && (Y = We(ne)); Y.type == "statement"; )
              Y = We(ne);
          } else
            re == Y.type
              ? We(ne)
              : G &&
                (((Y.type == "}" || Y.type == "top") && re != ";") ||
                  (Y.type == "statement" && re == "newstatement")) &&
                Se(ne, R.column(), "statement", R.current());
          if (
            (we == "variable" &&
              (ne.prevToken == "def" ||
                (g.typeFirstDefinitions &&
                  Qe(R, ne, R.start) &&
                  Ce(ne.context) &&
                  R.match(/^\s*\(/, !1))) &&
              (we = "def"),
            he.token)
          ) {
            var ve = he.token(R, ne, we);
            ve !== void 0 && (we = ve);
          }
          return (
            we == "def" && g.styleDefs === !1 && (we = "variable"),
            (ne.startOfLine = !1),
            (ne.prevToken = Ne ? "def" : we || re),
            be(R, ne),
            we
          );
        },
        indent: function (R, ne) {
          if (
            (R.tokenize != w && R.tokenize != null) ||
            (R.typeAtEndOfLine && Ce(R.context))
          )
            return F.Pass;
          var Y = R.context,
            we = ne && ne.charAt(0),
            ve = we == Y.type;
          if (
            (Y.type == "statement" && we == "}" && (Y = Y.prev),
            g.dontIndentStatements)
          )
            for (
              ;
              Y.type == "statement" && g.dontIndentStatements.test(Y.info);

            )
              Y = Y.prev;
          if (he.indent) {
            var Tt = he.indent(R, Y, ne, D);
            if (typeof Tt == "number") return Tt;
          }
          var Ot = Y.prev && Y.prev.info == "switch";
          if (g.allmanIndentation && /[{(]/.test(we)) {
            for (; Y.type != "top" && Y.type != "}"; ) Y = Y.prev;
            return Y.indented;
          }
          return Y.type == "statement"
            ? Y.indented + (we == "{" ? 0 : K)
            : Y.align && (!$ || Y.type != ")")
              ? Y.column + (ve ? 0 : 1)
              : Y.type == ")" && !ve
                ? Y.indented + K
                : Y.indented +
                  (ve ? 0 : D) +
                  (!ve && Ot && !/^(?:case|default)\b/.test(ne) ? D : 0);
        },
        electricInput: Ve
          ? /^\s*(?:case .*?:|default:|\{\}?|\})$/
          : /^\s*[{}]$/,
        blockCommentStart: "/*",
        blockCommentEnd: "*/",
        blockCommentContinue: " * ",
        lineComment: "//",
        fold: "brace",
      };
    });
    function M(v) {
      for (var g = {}, D = v.split(" "), K = 0; K < D.length; ++K) g[D[K]] = !0;
      return g;
    }
    function j(v, g) {
      return typeof v == "function" ? v(g) : v.propertyIsEnumerable(g);
    }
    var _ =
        "auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile inline restrict asm fortran",
      ie =
        "alignas alignof and and_eq audit axiom bitand bitor catch class compl concept constexpr const_cast decltype delete dynamic_cast explicit export final friend import module mutable namespace new noexcept not not_eq operator or or_eq override private protected public reinterpret_cast requires static_assert static_cast template this thread_local throw try typeid typename using virtual xor xor_eq",
      q =
        "bycopy byref in inout oneway out self super atomic nonatomic retain copy readwrite readonly strong weak assign typeof nullable nonnull null_resettable _cmd @interface @implementation @end @protocol @encode @property @synthesize @dynamic @class @public @package @private @protected @required @optional @try @catch @finally @import @selector @encode @defs @synchronized @autoreleasepool @compatibility_alias @available",
      se =
        "FOUNDATION_EXPORT FOUNDATION_EXTERN NS_INLINE NS_FORMAT_FUNCTION  NS_RETURNS_RETAINEDNS_ERROR_ENUM NS_RETURNS_NOT_RETAINED NS_RETURNS_INNER_POINTER NS_DESIGNATED_INITIALIZER NS_ENUM NS_OPTIONS NS_REQUIRES_NIL_TERMINATION NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_SWIFT_NAME NS_REFINED_FOR_SWIFT",
      ce = M("int long char short double float unsigned signed void bool"),
      Ie = M("SEL instancetype id Class Protocol BOOL");
    function Te(v) {
      return j(ce, v) || /.+_t$/.test(v);
    }
    function Oe(v) {
      return Te(v) || j(Ie, v);
    }
    var ae = "case do else for if switch while struct enum union",
      V = "struct enum union";
    function oe(v, g) {
      if (!g.startOfLine) return !1;
      for (var D, K = null; (D = v.peek()); ) {
        if (D == "\\" && v.match(/^.$/)) {
          K = oe;
          break;
        } else if (D == "/" && v.match(/^\/[\/\*]/, !1)) break;
        v.next();
      }
      return (g.tokenize = K), "meta";
    }
    function xe(v, g) {
      return g.prevToken == "type" ? "type" : !1;
    }
    function _e(v) {
      return !v || v.length < 2 || v[0] != "_"
        ? !1
        : v[1] == "_" || v[1] !== v[1].toLowerCase();
    }
    function ye(v) {
      return v.eatWhile(/[\w\.']/), "number";
    }
    function Me(v, g) {
      if ((v.backUp(1), v.match(/^(?:R|u8R|uR|UR|LR)/))) {
        var D = v.match(/^"([^\s\\()]{0,16})\(/);
        return D
          ? ((g.cpp11RawStringDelim = D[1]), (g.tokenize = X), X(v, g))
          : !1;
      }
      return v.match(/^(?:u8|u|U|L)/)
        ? v.match(/^["']/, !1)
          ? "string"
          : !1
        : (v.next(), !1);
    }
    function He(v) {
      var g = /(\w+)::~?(\w+)$/.exec(v);
      return g && g[1] == g[2];
    }
    function ee(v, g) {
      for (var D; (D = v.next()) != null; )
        if (D == '"' && !v.eat('"')) {
          g.tokenize = null;
          break;
        }
      return "string";
    }
    function X(v, g) {
      var D = g.cpp11RawStringDelim.replace(/[^\w\s]/g, "\\$&"),
        K = v.match(new RegExp(".*?\\)" + D + '"'));
      return K ? (g.tokenize = null) : v.skipToEnd(), "string";
    }
    function me(v, g) {
      typeof v == "string" && (v = [v]);
      var D = [];
      function K(pe) {
        if (pe) for (var Re in pe) pe.hasOwnProperty(Re) && D.push(Re);
      }
      K(g.keywords),
        K(g.types),
        K(g.builtin),
        K(g.atoms),
        D.length &&
          ((g.helperType = v[0]), F.registerHelper("hintWords", v[0], D));
      for (var $ = 0; $ < v.length; ++$) F.defineMIME(v[$], g);
    }
    me(["text/x-csrc", "text/x-c", "text/x-chdr"], {
      name: "clike",
      keywords: M(_),
      types: Te,
      blockKeywords: M(ae),
      defKeywords: M(V),
      typeFirstDefinitions: !0,
      atoms: M("NULL true false"),
      isReservedIdentifier: _e,
      hooks: { "#": oe, "*": xe },
      modeProps: { fold: ["brace", "include"] },
    }),
      me(["text/x-c++src", "text/x-c++hdr"], {
        name: "clike",
        keywords: M(_ + " " + ie),
        types: Te,
        blockKeywords: M(ae + " class try catch"),
        defKeywords: M(V + " class namespace"),
        typeFirstDefinitions: !0,
        atoms: M("true false NULL nullptr"),
        dontIndentStatements: /^template$/,
        isIdentifierChar: /[\w\$_~\xa1-\uffff]/,
        isReservedIdentifier: _e,
        hooks: {
          "#": oe,
          "*": xe,
          u: Me,
          U: Me,
          L: Me,
          R: Me,
          0: ye,
          1: ye,
          2: ye,
          3: ye,
          4: ye,
          5: ye,
          6: ye,
          7: ye,
          8: ye,
          9: ye,
          token: function (v, g, D) {
            if (
              D == "variable" &&
              v.peek() == "(" &&
              (g.prevToken == ";" ||
                g.prevToken == null ||
                g.prevToken == "}") &&
              He(v.current())
            )
              return "def";
          },
        },
        namespaceSeparator: "::",
        modeProps: { fold: ["brace", "include"] },
      }),
      me("text/x-java", {
        name: "clike",
        keywords: M(
          "abstract assert break case catch class const continue default do else enum extends final finally for goto if implements import instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws transient try volatile while @interface",
        ),
        types: M(
          "var byte short int long float double boolean char void Boolean Byte Character Double Float Integer Long Number Object Short String StringBuffer StringBuilder Void",
        ),
        blockKeywords: M("catch class do else finally for if switch try while"),
        defKeywords: M("class interface enum @interface"),
        typeFirstDefinitions: !0,
        atoms: M("true false null"),
        number:
          /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+\.?\d*|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,
        hooks: {
          "@": function (v) {
            return v.match("interface", !1)
              ? !1
              : (v.eatWhile(/[\w\$_]/), "meta");
          },
          '"': function (v, g) {
            return v.match(/""$/) ? ((g.tokenize = T), g.tokenize(v, g)) : !1;
          },
        },
        modeProps: { fold: ["brace", "import"] },
      }),
      me("text/x-csharp", {
        name: "clike",
        keywords: M(
          "abstract as async await base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in init interface internal is lock namespace new operator out override params private protected public readonly record ref required return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield",
        ),
        types: M(
          "Action Boolean Byte Char DateTime DateTimeOffset Decimal Double Func Guid Int16 Int32 Int64 Object SByte Single String Task TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong",
        ),
        blockKeywords: M(
          "catch class do else finally for foreach if struct switch try while",
        ),
        defKeywords: M("class interface namespace record struct var"),
        typeFirstDefinitions: !0,
        atoms: M("true false null"),
        hooks: {
          "@": function (v, g) {
            return v.eat('"')
              ? ((g.tokenize = ee), ee(v, g))
              : (v.eatWhile(/[\w\$_]/), "meta");
          },
        },
      });
    function T(v, g) {
      for (var D = !1; !v.eol(); ) {
        if (!D && v.match('"""')) {
          g.tokenize = null;
          break;
        }
        D = v.next() == "\\" && !D;
      }
      return "string";
    }
    function H(v) {
      return function (g, D) {
        for (var K; (K = g.next()); )
          if (K == "*" && g.eat("/"))
            if (v == 1) {
              D.tokenize = null;
              break;
            } else return (D.tokenize = H(v - 1)), D.tokenize(g, D);
          else if (K == "/" && g.eat("*"))
            return (D.tokenize = H(v + 1)), D.tokenize(g, D);
        return "comment";
      };
    }
    me("text/x-scala", {
      name: "clike",
      keywords: M(
        "abstract case catch class def do else extends final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try type val var while with yield _ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble",
      ),
      types: M(
        "AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Int Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void",
      ),
      multiLineStrings: !0,
      blockKeywords: M(
        "catch class enum do else finally for forSome if match switch try while",
      ),
      defKeywords: M("class enum def object package trait type val var"),
      atoms: M("true false null"),
      indentStatements: !1,
      indentSwitch: !1,
      isOperatorChar: /[+\-*&%=<>!?|\/#:@]/,
      hooks: {
        "@": function (v) {
          return v.eatWhile(/[\w\$_]/), "meta";
        },
        '"': function (v, g) {
          return v.match('""') ? ((g.tokenize = T), g.tokenize(v, g)) : !1;
        },
        "'": function (v) {
          return v.match(/^(\\[^'\s]+|[^\\'])'/)
            ? "string-2"
            : (v.eatWhile(/[\w\$_\xa1-\uffff]/), "atom");
        },
        "=": function (v, g) {
          var D = g.context;
          return D.type == "}" && D.align && v.eat(">")
            ? ((g.context = new Ee(
                D.indented,
                D.column,
                D.type,
                D.info,
                null,
                D.prev,
              )),
              "operator")
            : !1;
        },
        "/": function (v, g) {
          return v.eat("*") ? ((g.tokenize = H(1)), g.tokenize(v, g)) : !1;
        },
      },
      modeProps: { closeBrackets: { pairs: '()[]{}""', triples: '"' } },
    });
    function c(v) {
      return function (g, D) {
        for (var K = !1, $, pe = !1; !g.eol(); ) {
          if (!v && !K && g.match('"')) {
            pe = !0;
            break;
          }
          if (v && g.match('"""')) {
            pe = !0;
            break;
          }
          ($ = g.next()),
            !K && $ == "$" && g.match("{") && g.skipTo("}"),
            (K = !K && $ == "\\" && !v);
        }
        return (pe || !v) && (D.tokenize = null), "string";
      };
    }
    me("text/x-kotlin", {
      name: "clike",
      keywords: M(
        "package as typealias class interface this super val operator var fun for is in This throw return annotation break continue object if else while do try when !in !is as? file import where by get set abstract enum open inner override private public internal protected catch finally out final vararg reified dynamic companion constructor init sealed field property receiver param sparam lateinit data inline noinline tailrec external annotation crossinline const operator infix suspend actual expect setparam value",
      ),
      types: M(
        "Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void Annotation Any BooleanArray ByteArray Char CharArray DeprecationLevel DoubleArray Enum FloatArray Function Int IntArray Lazy LazyThreadSafetyMode LongArray Nothing ShortArray Unit",
      ),
      intendSwitch: !1,
      indentStatements: !1,
      multiLineStrings: !0,
      number:
        /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+(\.\d+)?|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,
      blockKeywords: M(
        "catch class do else finally for if where try while enum",
      ),
      defKeywords: M("class val var object interface fun"),
      atoms: M("true false null this"),
      hooks: {
        "@": function (v) {
          return v.eatWhile(/[\w\$_]/), "meta";
        },
        "*": function (v, g) {
          return g.prevToken == "." ? "variable" : "operator";
        },
        '"': function (v, g) {
          return (g.tokenize = c(v.match('""'))), g.tokenize(v, g);
        },
        "/": function (v, g) {
          return v.eat("*") ? ((g.tokenize = H(1)), g.tokenize(v, g)) : !1;
        },
        indent: function (v, g, D, K) {
          var $ = D && D.charAt(0);
          if ((v.prevToken == "}" || v.prevToken == ")") && D == "")
            return v.indented;
          if (
            (v.prevToken == "operator" && D != "}" && v.context.type != "}") ||
            (v.prevToken == "variable" && $ == ".") ||
            ((v.prevToken == "}" || v.prevToken == ")") && $ == ".")
          )
            return K * 2 + g.indented;
          if (g.align && g.type == "}")
            return g.indented + (v.context.type == (D || "").charAt(0) ? 0 : K);
        },
      },
      modeProps: { closeBrackets: { triples: '"' } },
    }),
      me(["x-shader/x-vertex", "x-shader/x-fragment"], {
        name: "clike",
        keywords: M(
          "sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadow const attribute uniform varying break continue discard return for while do if else struct in out inout",
        ),
        types: M(
          "float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4",
        ),
        blockKeywords: M("for while do if else struct"),
        builtin: M(
          "radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smoothstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4",
        ),
        atoms: M(
          "true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_PointCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TextureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers",
        ),
        indentSwitch: !1,
        hooks: { "#": oe },
        modeProps: { fold: ["brace", "include"] },
      }),
      me("text/x-nesc", {
        name: "clike",
        keywords: M(
          _ +
            " as atomic async call command component components configuration event generic implementation includes interface module new norace nx_struct nx_union post provides signal task uses abstract extends",
        ),
        types: Te,
        blockKeywords: M(ae),
        atoms: M("null true false"),
        hooks: { "#": oe },
        modeProps: { fold: ["brace", "include"] },
      }),
      me("text/x-objectivec", {
        name: "clike",
        keywords: M(_ + " " + q),
        types: Oe,
        builtin: M(se),
        blockKeywords: M(
          ae +
            " @synthesize @try @catch @finally @autoreleasepool @synchronized",
        ),
        defKeywords: M(V + " @interface @implementation @protocol @class"),
        dontIndentStatements: /^@.*$/,
        typeFirstDefinitions: !0,
        atoms: M("YES NO NULL Nil nil true false nullptr"),
        isReservedIdentifier: _e,
        hooks: { "#": oe, "*": xe },
        modeProps: { fold: ["brace", "include"] },
      }),
      me("text/x-objectivec++", {
        name: "clike",
        keywords: M(_ + " " + q + " " + ie),
        types: Oe,
        builtin: M(se),
        blockKeywords: M(
          ae +
            " @synthesize @try @catch @finally @autoreleasepool @synchronized class try catch",
        ),
        defKeywords: M(
          V + " @interface @implementation @protocol @class class namespace",
        ),
        dontIndentStatements: /^@.*$|^template$/,
        typeFirstDefinitions: !0,
        atoms: M("YES NO NULL Nil nil true false nullptr"),
        isReservedIdentifier: _e,
        hooks: {
          "#": oe,
          "*": xe,
          u: Me,
          U: Me,
          L: Me,
          R: Me,
          0: ye,
          1: ye,
          2: ye,
          3: ye,
          4: ye,
          5: ye,
          6: ye,
          7: ye,
          8: ye,
          9: ye,
          token: function (v, g, D) {
            if (
              D == "variable" &&
              v.peek() == "(" &&
              (g.prevToken == ";" ||
                g.prevToken == null ||
                g.prevToken == "}") &&
              He(v.current())
            )
              return "def";
          },
        },
        namespaceSeparator: "::",
        modeProps: { fold: ["brace", "include"] },
      }),
      me("text/x-squirrel", {
        name: "clike",
        keywords: M(
          "base break clone continue const default delete enum extends function in class foreach local resume return this throw typeof yield constructor instanceof static",
        ),
        types: Te,
        blockKeywords: M(
          "case catch class else for foreach if switch try while",
        ),
        defKeywords: M("function local class"),
        typeFirstDefinitions: !0,
        atoms: M("true false null"),
        hooks: { "#": oe },
        modeProps: { fold: ["brace", "include"] },
      });
    var x = null;
    function b(v) {
      return function (g, D) {
        for (var K = !1, $, pe = !1; !g.eol(); ) {
          if (!K && g.match('"') && (v == "single" || g.match('""'))) {
            pe = !0;
            break;
          }
          if (!K && g.match("``")) {
            (x = b(v)), (pe = !0);
            break;
          }
          ($ = g.next()), (K = v == "single" && !K && $ == "\\");
        }
        return pe && (D.tokenize = null), "string";
      };
    }
    me("text/x-ceylon", {
      name: "clike",
      keywords: M(
        "abstracts alias assembly assert assign break case catch class continue dynamic else exists extends finally for function given if import in interface is let module new nonempty object of out outer package return satisfies super switch then this throw try value void while",
      ),
      types: function (v) {
        var g = v.charAt(0);
        return g === g.toUpperCase() && g !== g.toLowerCase();
      },
      blockKeywords: M(
        "case catch class dynamic else finally for function if interface module new object switch try while",
      ),
      defKeywords: M(
        "class dynamic function interface module object package value",
      ),
      builtin: M(
        "abstract actual aliased annotation by default deprecated doc final formal late license native optional sealed see serializable shared suppressWarnings tagged throws variable",
      ),
      isPunctuationChar: /[\[\]{}\(\),;\:\.`]/,
      isOperatorChar: /[+\-*&%=<>!?|^~:\/]/,
      numberStart: /[\d#$]/,
      number:
        /^(?:#[\da-fA-F_]+|\$[01_]+|[\d_]+[kMGTPmunpf]?|[\d_]+\.[\d_]+(?:[eE][-+]?\d+|[kMGTPmunpf]|)|)/i,
      multiLineStrings: !0,
      typeFirstDefinitions: !0,
      atoms: M("true false null larger smaller equal empty finished"),
      indentSwitch: !1,
      styleDefs: !1,
      hooks: {
        "@": function (v) {
          return v.eatWhile(/[\w\$_]/), "meta";
        },
        '"': function (v, g) {
          return (
            (g.tokenize = b(v.match('""') ? "triple" : "single")),
            g.tokenize(v, g)
          );
        },
        "`": function (v, g) {
          return !x || !v.match("`")
            ? !1
            : ((g.tokenize = x), (x = null), g.tokenize(v, g));
        },
        "'": function (v) {
          return v.eatWhile(/[\w\$_\xa1-\uffff]/), "atom";
        },
        token: function (v, g, D) {
          if ((D == "variable" || D == "type") && g.prevToken == ".")
            return "variable-2";
        },
      },
      modeProps: { fold: ["brace", "import"], closeBrackets: { triples: '"' } },
    });
  });
})();
export { Su as default };
