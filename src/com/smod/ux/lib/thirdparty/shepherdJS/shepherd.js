/*! shepherd.js 10.0.1 */

"use strict";
(function (O, pa) {
  "object" === typeof exports && "undefined" !== typeof module
    ? (module.exports = pa())
    : "function" === typeof define && define.amd
    ? define(pa)
    : ((O = "undefined" !== typeof globalThis ? globalThis : O || self),
      (O.Shepherd = pa()));
})(this, function () {
  function O(a, b) {
    return !1 !== b.clone && b.isMergeableObject(a)
      ? ea(Array.isArray(a) ? [] : {}, a, b)
      : a;
  }
  function pa(a, b, c) {
    return a.concat(b).map(function (d) {
      return O(d, c);
    });
  }
  function Db(a) {
    return Object.getOwnPropertySymbols
      ? Object.getOwnPropertySymbols(a).filter(function (b) {
          return a.propertyIsEnumerable(b);
        })
      : [];
  }
  function Sa(a) {
    return Object.keys(a).concat(Db(a));
  }
  function Ta(a, b) {
    try {
      return b in a;
    } catch (c) {
      return !1;
    }
  }
  function Eb(a, b, c) {
    var d = {};
    c.isMergeableObject(a) &&
      Sa(a).forEach(function (e) {
        d[e] = O(a[e], c);
      });
    Sa(b).forEach(function (e) {
      if (
        !Ta(a, e) ||
        (Object.hasOwnProperty.call(a, e) &&
          Object.propertyIsEnumerable.call(a, e))
      )
        if (Ta(a, e) && c.isMergeableObject(b[e])) {
          if (c.customMerge) {
            var f = c.customMerge(e);
            f = "function" === typeof f ? f : ea;
          } else f = ea;
          d[e] = f(a[e], b[e], c);
        } else d[e] = O(b[e], c);
    });
    return d;
  }
  function ea(a, b, c) {
    c = c || {};
    c.arrayMerge = c.arrayMerge || pa;
    c.isMergeableObject = c.isMergeableObject || Fb;
    c.cloneUnlessOtherwiseSpecified = O;
    var d = Array.isArray(b),
      e = Array.isArray(a);
    return d !== e ? O(b, c) : d ? c.arrayMerge(a, b, c) : Eb(a, b, c);
  }
  function Z(a) {
    return "function" === typeof a;
  }
  function qa(a) {
    return "string" === typeof a;
  }
  function Ua(a) {
    let b = Object.getOwnPropertyNames(a.constructor.prototype);
    for (let c = 0; c < b.length; c++) {
      let d = b[c],
        e = a[d];
      "constructor" !== d && "function" === typeof e && (a[d] = e.bind(a));
    }
    return a;
  }
  function Gb(a, b) {
    return (c) => {
      if (b.isOpen()) {
        let d = b.el && c.currentTarget === b.el;
        ((void 0 !== a && c.currentTarget.matches(a)) || d) && b.tour.next();
      }
    };
  }
  function Hb(a) {
    let { event: b, selector: c } = a.options.advanceOn || {};
    if (b) {
      let d = Gb(c, a),
        e;
      try {
        e = document.querySelector(c);
      } catch (f) {}
      if (void 0 === c || e)
        e
          ? (e.addEventListener(b, d),
            a.on("destroy", () => e.removeEventListener(b, d)))
          : (document.body.addEventListener(b, d, !0),
            a.on("destroy", () => document.body.removeEventListener(b, d, !0)));
      else
        return console.error(
          `No element was found for the selector supplied to advanceOn: ${c}`
        );
    } else return console.error("advanceOn was defined, but no event name was passed.");
  }
  function M(a) {
    return a ? (a.nodeName || "").toLowerCase() : null;
  }
  function K(a) {
    return null == a
      ? window
      : "[object Window]" !== a.toString()
      ? (a = a.ownerDocument)
        ? a.defaultView || window
        : window
      : a;
  }
  function fa(a) {
    var b = K(a).Element;
    return a instanceof b || a instanceof Element;
  }
  function F(a) {
    var b = K(a).HTMLElement;
    return a instanceof b || a instanceof HTMLElement;
  }
  function Ea(a) {
    if ("undefined" === typeof ShadowRoot) return !1;
    var b = K(a).ShadowRoot;
    return a instanceof b || a instanceof ShadowRoot;
  }
  function N(a) {
    return a.split("-")[0];
  }
  function ha(a, b) {
    void 0 === b && (b = !1);
    var c = a.getBoundingClientRect(),
      d = 1,
      e = 1;
    F(a) &&
      b &&
      ((b = a.offsetHeight),
      (a = a.offsetWidth),
      0 < a && (d = ia(c.width) / a || 1),
      0 < b && (e = ia(c.height) / b || 1));
    return {
      width: c.width / d,
      height: c.height / e,
      top: c.top / e,
      right: c.right / d,
      bottom: c.bottom / e,
      left: c.left / d,
      x: c.left / d,
      y: c.top / e,
    };
  }
  function Fa(a) {
    var b = ha(a),
      c = a.offsetWidth,
      d = a.offsetHeight;
    1 >= Math.abs(b.width - c) && (c = b.width);
    1 >= Math.abs(b.height - d) && (d = b.height);
    return { x: a.offsetLeft, y: a.offsetTop, width: c, height: d };
  }
  function Va(a, b) {
    var c = b.getRootNode && b.getRootNode();
    if (a.contains(b)) return !0;
    if (c && Ea(c)) {
      do {
        if (b && a.isSameNode(b)) return !0;
        b = b.parentNode || b.host;
      } while (b);
    }
    return !1;
  }
  function P(a) {
    return K(a).getComputedStyle(a);
  }
  function U(a) {
    return (
      (fa(a) ? a.ownerDocument : a.document) || window.document
    ).documentElement;
  }
  function wa(a) {
    return "html" === M(a)
      ? a
      : a.assignedSlot || a.parentNode || (Ea(a) ? a.host : null) || U(a);
  }
  function Wa(a) {
    return F(a) && "fixed" !== P(a).position ? a.offsetParent : null;
  }
  function ra(a) {
    for (
      var b = K(a), c = Wa(a);
      c &&
      0 <= ["table", "td", "th"].indexOf(M(c)) &&
      "static" === P(c).position;

    )
      c = Wa(c);
    if (
      c &&
      ("html" === M(c) || ("body" === M(c) && "static" === P(c).position))
    )
      return b;
    if (!c)
      a: {
        c = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
        if (
          -1 === navigator.userAgent.indexOf("Trident") ||
          !F(a) ||
          "fixed" !== P(a).position
        )
          for (
            a = wa(a), Ea(a) && (a = a.host);
            F(a) && 0 > ["html", "body"].indexOf(M(a));

          ) {
            var d = P(a);
            if (
              "none" !== d.transform ||
              "none" !== d.perspective ||
              "paint" === d.contain ||
              -1 !== ["transform", "perspective"].indexOf(d.willChange) ||
              (c && "filter" === d.willChange) ||
              (c && d.filter && "none" !== d.filter)
            ) {
              c = a;
              break a;
            } else a = a.parentNode;
          }
        c = null;
      }
    return c || b;
  }
  function Ga(a) {
    return 0 <= ["top", "bottom"].indexOf(a) ? "x" : "y";
  }
  function Xa(a) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, a);
  }
  function Ya(a, b) {
    return b.reduce(function (c, d) {
      c[d] = a;
      return c;
    }, {});
  }
  function ja(a) {
    return a.split("-")[1];
  }
  function Za(a) {
    var b,
      c = a.popper,
      d = a.popperRect,
      e = a.placement,
      f = a.variation,
      g = a.offsets,
      l = a.position,
      m = a.gpuAcceleration,
      k = a.adaptive,
      p = a.roundOffsets,
      q = a.isFixed;
    a = g.x;
    a = void 0 === a ? 0 : a;
    var n = g.y,
      r = void 0 === n ? 0 : n;
    n = "function" === typeof p ? p({ x: a, y: r }) : { x: a, y: r };
    a = n.x;
    r = n.y;
    n = g.hasOwnProperty("x");
    g = g.hasOwnProperty("y");
    var x = "left",
      h = "top",
      t = window;
    if (k) {
      var v = ra(c),
        A = "clientHeight",
        u = "clientWidth";
      v === K(c) &&
        ((v = U(c)),
        "static" !== P(v).position &&
          "absolute" === l &&
          ((A = "scrollHeight"), (u = "scrollWidth")));
      if ("top" === e || (("left" === e || "right" === e) && "end" === f))
        (h = "bottom"),
          (r -=
            (q && v === t && t.visualViewport
              ? t.visualViewport.height
              : v[A]) - d.height),
          (r *= m ? 1 : -1);
      if ("left" === e || (("top" === e || "bottom" === e) && "end" === f))
        (x = "right"),
          (a -=
            (q && v === t && t.visualViewport ? t.visualViewport.width : v[u]) -
            d.width),
          (a *= m ? 1 : -1);
    }
    c = Object.assign({ position: l }, k && Ib);
    !0 === p
      ? ((p = r),
        (d = window.devicePixelRatio || 1),
        (a = { x: ia(a * d) / d || 0, y: ia(p * d) / d || 0 }))
      : (a = { x: a, y: r });
    p = a;
    a = p.x;
    
    if(k){
      a = e === "right" ? a + 10 :  e === "left" ? a - 10 : a;
    }


    // a = p.x;
    r = p.y;
    if(k){
      r = e === "top" ? r - 10 :  e === "bottom" ? r + 10 : r;
    }
    if (m) {
      var w;
      return Object.assign(
        {},
        c,
        ((w = {}),
        (w[h] = g ? "0" : ""),
        (w[x] = n ? "0" : ""),
        (w.transform =
          1 >= (t.devicePixelRatio || 1)
            ? "translate(" + a + "px, " + r + "px)"
            : "translate3d(" + a + "px, " + r + "px, 0)"),
        w)
      );
    }
    return Object.assign(
      {},
      c,
      ((b = {}),
      (b[h] = g ? r + "px" : ""),
      (b[x] = n ? a + "px" : ""),
      (b.transform = ""),
      b)
    );
  }
  function xa(a) {
    return a.replace(/left|right|bottom|top/g, function (b) {
      return Jb[b];
    });
  }
  function $a(a) {
    return a.replace(/start|end/g, function (b) {
      return Kb[b];
    });
  }
  function Ha(a) {
    a = K(a);
    return { scrollLeft: a.pageXOffset, scrollTop: a.pageYOffset };
  }
  function Ia(a) {
    return ha(U(a)).left + Ha(a).scrollLeft;
  }
  function Ja(a) {
    a = P(a);
    return /auto|scroll|overlay|hidden/.test(
      a.overflow + a.overflowY + a.overflowX
    );
  }
  function ab(a) {
    return 0 <= ["html", "body", "#document"].indexOf(M(a))
      ? a.ownerDocument.body
      : F(a) && Ja(a)
      ? a
      : ab(wa(a));
  }
  function sa(a, b) {
    var c;
    void 0 === b && (b = []);
    var d = ab(a);
    a = d === (null == (c = a.ownerDocument) ? void 0 : c.body);
    c = K(d);
    d = a ? [c].concat(c.visualViewport || [], Ja(d) ? d : []) : d;
    b = b.concat(d);
    return a ? b : b.concat(sa(wa(d)));
  }
  function Ka(a) {
    return Object.assign({}, a, {
      left: a.x,
      top: a.y,
      right: a.x + a.width,
      bottom: a.y + a.height,
    });
  }
  function bb(a, b) {
    if ("viewport" === b) {
      b = K(a);
      var c = U(a);
      b = b.visualViewport;
      var d = c.clientWidth;
      c = c.clientHeight;
      var e = 0,
        f = 0;
      b &&
        ((d = b.width),
        (c = b.height),
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
          ((e = b.offsetLeft), (f = b.offsetTop)));
      a = { width: d, height: c, x: e + Ia(a), y: f };
      a = Ka(a);
    } else fa(b) ? ((a = ha(b)), (a.top += b.clientTop), (a.left += b.clientLeft), (a.bottom = a.top + b.clientHeight), (a.right = a.left + b.clientWidth), (a.width = b.clientWidth), (a.height = b.clientHeight), (a.x = a.left), (a.y = a.top)) : ((f = U(a)), (a = U(f)), (d = Ha(f)), (b = null == (c = f.ownerDocument) ? void 0 : c.body), (c = L(a.scrollWidth, a.clientWidth, b ? b.scrollWidth : 0, b ? b.clientWidth : 0)), (e = L(a.scrollHeight, a.clientHeight, b ? b.scrollHeight : 0, b ? b.clientHeight : 0)), (f = -d.scrollLeft + Ia(f)), (d = -d.scrollTop), "rtl" === P(b || a).direction && (f += L(a.clientWidth, b ? b.clientWidth : 0) - c), (a = Ka({ width: c, height: e, x: f, y: d })));
    return a;
  }
  function Lb(a) {
    var b = sa(wa(a)),
      c = 0 <= ["absolute", "fixed"].indexOf(P(a).position) && F(a) ? ra(a) : a;
    return fa(c)
      ? b.filter(function (d) {
          return fa(d) && Va(d, c) && "body" !== M(d);
        })
      : [];
  }
  function Mb(a, b, c) {
    b = "clippingParents" === b ? Lb(a) : [].concat(b);
    c = [].concat(b, [c]);
    c = c.reduce(function (d, e) {
      e = bb(a, e);
      d.top = L(e.top, d.top);
      d.right = V(e.right, d.right);
      d.bottom = V(e.bottom, d.bottom);
      d.left = L(e.left, d.left);
      return d;
    }, bb(a, c[0]));
    c.width = c.right - c.left;
    c.height = c.bottom - c.top;
    c.x = c.left;
    c.y = c.top;
    return c;
  }
  function cb(a) {
    var b = a.reference,
      c = a.element,
      d = (a = a.placement) ? N(a) : null;
    a = a ? ja(a) : null;
    var e = b.x + b.width / 2 - c.width / 2,
      f = b.y + b.height / 2 - c.height / 2;
    switch (d) {
      case "top":
        e = { x: e, y: b.y - c.height };
        break;
      case "bottom":
        e = { x: e, y: b.y + b.height };
        break;
      case "right":
        e = { x: b.x + b.width, y: f };
        break;
      case "left":
        e = { x: b.x - c.width, y: f };
        break;
      default:
        e = { x: b.x, y: b.y };
    }
    d = d ? Ga(d) : null;
    if (null != d)
      switch (((f = "y" === d ? "height" : "width"), a)) {
        case "start":
          e[d] -= b[f] / 2 - c[f] / 2;
          break;
        case "end":
          e[d] += b[f] / 2 - c[f] / 2;
      }
    return e;
  }
  function ta(a, b) {
    void 0 === b && (b = {});
    var c = b;
    b = c.placement;
    b = void 0 === b ? a.placement : b;
    var d = c.boundary,
      e = void 0 === d ? "clippingParents" : d;
    d = c.rootBoundary;
    var f = void 0 === d ? "viewport" : d;
    d = c.elementContext;
    d = void 0 === d ? "popper" : d;
    var g = c.altBoundary,
      l = void 0 === g ? !1 : g;
    c = c.padding;
    c = void 0 === c ? 0 : c;
    c = Xa("number" !== typeof c ? c : Ya(c, ua));
    g = a.rects.popper;
    l = a.elements[l ? ("popper" === d ? "reference" : "popper") : d];
    e = Mb(fa(l) ? l : l.contextElement || U(a.elements.popper), e, f);
    f = ha(a.elements.reference);
    l = cb({ reference: f, element: g, strategy: "absolute", placement: b });
    g = Ka(Object.assign({}, g, l));
    f = "popper" === d ? g : f;
    var m = {
      top: e.top - f.top + c.top,
      bottom: f.bottom - e.bottom + c.bottom,
      left: e.left - f.left + c.left,
      right: f.right - e.right + c.right,
    };
    a = a.modifiersData.offset;
    if ("popper" === d && a) {
      var k = a[b];
      Object.keys(m).forEach(function (p) {
        var q = 0 <= ["right", "bottom"].indexOf(p) ? 1 : -1,
          n = 0 <= ["top", "bottom"].indexOf(p) ? "y" : "x";
        m[p] += k[n] * q;
      });
    }
    return m;
  }
  function Nb(a, b) {
    void 0 === b && (b = {});
    var c = b.boundary,
      d = b.rootBoundary,
      e = b.padding,
      f = b.flipVariations,
      g = b.allowedAutoPlacements,
      l = void 0 === g ? db : g,
      m = ja(b.placement);
    b = m
      ? f
        ? eb
        : eb.filter(function (p) {
            return ja(p) === m;
          })
      : ua;
    f = b.filter(function (p) {
      return 0 <= l.indexOf(p);
    });
    0 === f.length && (f = b);
    var k = f.reduce(function (p, q) {
      p[q] = ta(a, { placement: q, boundary: c, rootBoundary: d, padding: e })[
        N(q)
      ];
      return p;
    }, {});
    return Object.keys(k).sort(function (p, q) {
      return k[p] - k[q];
    });
  }
  function Ob(a) {
    if ("auto" === N(a)) return [];
    var b = xa(a);
    return [$a(a), b, $a(b)];
  }
  function fb(a, b, c) {
    void 0 === c && (c = { x: 0, y: 0 });
    return {
      top: a.top - b.height - c.y,
      right: a.right - b.width + c.x,
      bottom: a.bottom - b.height + c.y,
      left: a.left - b.width - c.x,
    };
  }
  function gb(a) {
    return ["top", "right", "bottom", "left"].some(function (b) {
      return 0 <= a[b];
    });
  }
  function Pb(a, b, c) {
    void 0 === c && (c = !1);
    var d = F(b),
      e;
    if ((e = F(b))) {
      var f = b.getBoundingClientRect();
      e = ia(f.width) / b.offsetWidth || 1;
      f = ia(f.height) / b.offsetHeight || 1;
      e = 1 !== e || 1 !== f;
    }
    f = e;
    e = U(b);
    a = ha(a, f);
    f = { scrollLeft: 0, scrollTop: 0 };
    var g = { x: 0, y: 0 };
    if (d || (!d && !c)) {
      if ("body" !== M(b) || Ja(e))
        f =
          b !== K(b) && F(b)
            ? { scrollLeft: b.scrollLeft, scrollTop: b.scrollTop }
            : Ha(b);
      F(b)
        ? ((g = ha(b, !0)), (g.x += b.clientLeft), (g.y += b.clientTop))
        : e && (g.x = Ia(e));
    }
    return {
      x: a.left + f.scrollLeft - g.x,
      y: a.top + f.scrollTop - g.y,
      width: a.width,
      height: a.height,
    };
  }
  function Qb(a) {
    function b(f) {
      d.add(f.name);
      []
        .concat(f.requires || [], f.requiresIfExists || [])
        .forEach(function (g) {
          d.has(g) || ((g = c.get(g)) && b(g));
        });
      e.push(f);
    }
    var c = new Map(),
      d = new Set(),
      e = [];
    a.forEach(function (f) {
      c.set(f.name, f);
    });
    a.forEach(function (f) {
      d.has(f.name) || b(f);
    });
    return e;
  }
  function Rb(a) {
    var b = Qb(a);
    return Sb.reduce(function (c, d) {
      return c.concat(
        b.filter(function (e) {
          return e.phase === d;
        })
      );
    }, []);
  }
  function Tb(a) {
    var b;
    return function () {
      b ||
        (b = new Promise(function (c) {
          Promise.resolve().then(function () {
            b = void 0;
            c(a());
          });
        }));
      return b;
    };
  }
  function Ub(a) {
    var b = a.reduce(function (c, d) {
      var e = c[d.name];
      c[d.name] = e
        ? Object.assign({}, e, d, {
            options: Object.assign({}, e.options, d.options),
            data: Object.assign({}, e.data, d.data),
          })
        : d;
      return c;
    }, {});
    return Object.keys(b).map(function (c) {
      return b[c];
    });
  }
  function hb() {
    for (var a = arguments.length, b = Array(a), c = 0; c < a; c++)
      b[c] = arguments[c];
    return !b.some(function (d) {
      return !(d && "function" === typeof d.getBoundingClientRect);
    });
  }
  function La() {
    La = Object.assign
      ? Object.assign.bind()
      : function (a) {
          for (var b = 1; b < arguments.length; b++) {
            var c = arguments[b],
              d;
            for (d in c)
              Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d]);
          }
          return a;
        };
    return La.apply(this, arguments);
  }
  function Vb() {
    return [
      {
        name: "applyStyles",
        fn(a) {
          let { state: b } = a;
          Object.keys(b.elements).forEach((c) => {
            if ("popper" === c) {
              var d = b.attributes[c] || {},
                e = b.elements[c];
              Object.assign(e.style, {
                position: "fixed",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              });
              Object.keys(d).forEach((f) => {
                let g = d[f];
                !1 === g
                  ? e.removeAttribute(f)
                  : e.setAttribute(f, !0 === g ? "" : g);
              });
            }
          });
        },
      },
      { name: "computeStyles", options: { adaptive: !1 } },
    ];
  }
  function ib(a) {
    return {
      name: "focusAfterRender",
      enabled: !0,
      phase: "afterWrite",
      fn() {
        setTimeout(() => {
          a.el && a.el.focus({ preventScroll: !0 });
        }, 300);
      },
    };
  }
  function jb(a) {
    return qa(a) && "" !== a
      ? "-" !== a.charAt(a.length - 1)
        ? `${a}-`
        : a
      : "";
  }
  function Ma() {
    let a = Date.now();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (b) => {
      let c = (a + 16 * Math.random()) % 16 | 0;
      a = Math.floor(a / 16);
      return ("x" == b ? c : (c & 3) | 8).toString(16);
    });
  }
  function kb(a, b) {
    if (a.popperOptions) {
      let c = Object.assign({}, b, a.popperOptions);
      if (a.popperOptions.modifiers && 0 < a.popperOptions.modifiers.length) {
        let d = a.popperOptions.modifiers.map((e) => e.name);
        b = b.modifiers.filter((e) => !d.includes(e.name));
        c.modifiers = Array.from(new Set([...b, ...a.popperOptions.modifiers]));
      }
      return c;
    }
    return b;
  }
  function G() {}
  function Wb(a, b) {
    for (let c in b) a[c] = b[c];
    return a;
  }
  function ka(a) {
    return a();
  }
  function lb(a) {
    return "function" === typeof a;
  }
  function Q(a, b) {
    return a != a
      ? b == b
      : a !== b || (a && "object" === typeof a) || "function" === typeof a;
  }
  function H(a) {
    a.parentNode.removeChild(a);
  }
  function mb(a) {
    return document.createElementNS("http://www.w3.org/2000/svg", a);
  }
  function ya(a, b, c, d) {
    a.addEventListener(b, c, d);
    return () => a.removeEventListener(b, c, d);
  }
  function B(a, b, c) {
    null == c
      ? a.removeAttribute(b)
      : a.getAttribute(b) !== c && a.setAttribute(b, c);
  }
  function nb(a, b) {
    let c = Object.getOwnPropertyDescriptors(a.__proto__);
    for (let d in b)
      null == b[d]
        ? a.removeAttribute(d)
        : "style" === d
        ? (a.style.cssText = b[d])
        : "__value" === d
        ? (a.value = a[d] = b[d])
        : c[d] && c[d].set
        ? (a[d] = b[d])
        : B(a, d, b[d]);
  }
  function la(a, b, c) {
    a.classList[c ? "add" : "remove"](b);
  }
  function za() {
    if (!R) throw Error("Function called outside component initialization");
    return R;
  }
  function Na(a) {
    Aa.push(a);
  }
  function ob() {
    let a = R;
    do {
      for (; Ba < va.length; ) {
        var b = va[Ba];
        Ba++;
        R = b;
        b = b.$$;
        if (null !== b.fragment) {
          b.update();
          b.before_update.forEach(ka);
          var c = b.dirty;
          b.dirty = [-1];
          b.fragment && b.fragment.p(b.ctx, c);
          b.after_update.forEach(Na);
        }
      }
      R = null;
      for (Ba = va.length = 0; ma.length; ) ma.pop()();
      for (b = 0; b < Aa.length; b += 1)
        (c = Aa[b]), Oa.has(c) || (Oa.add(c), c());
      Aa.length = 0;
    } while (va.length);
    for (; pb.length; ) pb.pop()();
    Pa = !1;
    Oa.clear();
    R = a;
  }
  function aa() {
    ba = { r: 0, c: [], p: ba };
  }
  function ca() {
    ba.r || ba.c.forEach(ka);
    ba = ba.p;
  }
  function z(a, b) {
    a && a.i && (Ca.delete(a), a.i(b));
  }
  function C(a, b, c, d) {
    a && a.o
      ? Ca.has(a) ||
        (Ca.add(a),
        ba.c.push(() => {
          Ca.delete(a);
          d && (c && a.d(1), d());
        }),
        a.o(b))
      : d && d();
  }
  function da(a) {
    a && a.c();
  }
  function W(a, b, c, d) {
    let { fragment: e, on_mount: f, on_destroy: g, after_update: l } = a.$$;
    e && e.m(b, c);
    d ||
      Na(() => {
        let m = f.map(ka).filter(lb);
        g ? g.push(...m) : m.forEach(ka);
        a.$$.on_mount = [];
      });
    l.forEach(Na);
  }
  function X(a, b) {
    a = a.$$;
    null !== a.fragment &&
      (a.on_destroy.forEach(ka),
      a.fragment && a.fragment.d(b),
      (a.on_destroy = a.fragment = null),
      (a.ctx = []));
  }
  function S(a, b, c, d, e, f, g, l) {
    void 0 === l && (l = [-1]);
    let m = R;
    R = a;
    let k = (a.$$ = {
      fragment: null,
      ctx: null,
      props: f,
      update: G,
      not_equal: e,
      bound: Object.create(null),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(b.context || (m ? m.$$.context : [])),
      callbacks: Object.create(null),
      dirty: l,
      skip_bound: !1,
      root: b.target || m.$$.root,
    });
    g && g(k.root);
    let p = !1;
    k.ctx = c
      ? c(a, b.props || {}, function (q, n) {
          let r = (2 >= arguments.length ? 0 : arguments.length - 2)
            ? 2 >= arguments.length
              ? void 0
              : arguments[2]
            : n;
          if (k.ctx && e(k.ctx[q], (k.ctx[q] = r))) {
            if (!k.skip_bound && k.bound[q]) k.bound[q](r);
            p &&
              (-1 === a.$$.dirty[0] &&
                (va.push(a),
                Pa || ((Pa = !0), Xb.then(ob)),
                a.$$.dirty.fill(0)),
              (a.$$.dirty[(q / 31) | 0] |= 1 << q % 31));
          }
          return n;
        })
      : [];
    k.update();
    p = !0;
    k.before_update.forEach(ka);
    k.fragment = d ? d(k.ctx) : !1;
    b.target &&
      (b.hydrate
        ? ((c = Array.from(b.target.childNodes)),
          k.fragment && k.fragment.l(c),
          c.forEach(H))
        : k.fragment && k.fragment.c(),
      b.intro && z(a.$$.fragment),
      W(a, b.target, b.anchor, b.customElement),
      ob());
    R = m;
  }
  function Yb(a) {
    let b, c, d, e, f;
    return {
      c() {
        b = document.createElement("button");
        B(b, "aria-label", (c = a[3] ? a[3] : null));
        B(
          b,
          "class",
          (d = `${a[1] || ""} shepherd-button ${
            a[4] ? "shepherd-button-secondary" : ""
          }`)
        );
        b.disabled = a[2];
        B(b, "tabindex", "0");
      },
      m(g, l) {
        g.insertBefore(b, l || null);
        b.innerHTML = a[5];
        e ||
          ((f = ya(b, "click", function () {
            lb(a[0]) && a[0].apply(this, arguments);
          })),
          (e = !0));
      },
      p(g, l) {
        [l] = l;
        a = g;
        l & 32 && (b.innerHTML = a[5]);
        l & 8 && c !== (c = a[3] ? a[3] : null) && B(b, "aria-label", c);
        l & 18 &&
          d !==
            (d = `${a[1] || ""} shepherd-button ${
              a[4] ? "shepherd-button-secondary" : ""
            }`) &&
          B(b, "class", d);
        l & 4 && (b.disabled = a[2]);
      },
      i: G,
      o: G,
      d(g) {
        g && H(b);
        e = !1;
        f();
      },
    };
  }
  function Zb(a, b, c) {
    function d(n) {
      return Z(n) ? n.call(f) : n;
    }
    let { config: e, step: f } = b,
      g,
      l,
      m,
      k,
      p,
      q;
    a.$$set = (n) => {
      "config" in n && c(6, (e = n.config));
      "step" in n && c(7, (f = n.step));
    };
    a.$$.update = () => {
      a.$$.dirty & 192 &&
        (c(0, (g = e.action ? e.action.bind(f.tour) : null)),
        c(1, (l = e.classes)),
        c(2, (m = e.disabled ? d(e.disabled) : !1)),
        c(3, (k = e.label ? d(e.label) : null)),
        c(4, (p = e.secondary)),
        c(5, (q = e.text ? d(e.text) : null)));
    };
    return [g, l, m, k, p, q, e, f];
  }
  function qb(a, b, c) {
    a = a.slice();
    a[2] = b[c];
    return a;
  }
  function rb(a) {
    let b,
      c,
      d = a[1],
      e = [];
    for (let g = 0; g < d.length; g += 1) e[g] = sb(qb(a, d, g));
    let f = (g) =>
      C(e[g], 1, 1, () => {
        e[g] = null;
      });
    return {
      c() {
        for (let g = 0; g < e.length; g += 1) e[g].c();
        b = document.createTextNode("");
      },
      m(g, l) {
        for (let m = 0; m < e.length; m += 1) e[m].m(g, l);
        g.insertBefore(b, l || null);
        c = !0;
      },
      p(g, l) {
        if (l & 3) {
          d = g[1];
          let m;
          for (m = 0; m < d.length; m += 1) {
            let k = qb(g, d, m);
            e[m]
              ? (e[m].p(k, l), z(e[m], 1))
              : ((e[m] = sb(k)), e[m].c(), z(e[m], 1), e[m].m(b.parentNode, b));
          }
          aa();
          for (m = d.length; m < e.length; m += 1) f(m);
          ca();
        }
      },
      i(g) {
        if (!c) {
          for (g = 0; g < d.length; g += 1) z(e[g]);
          c = !0;
        }
      },
      o(g) {
        e = e.filter(Boolean);
        for (g = 0; g < e.length; g += 1) C(e[g]);
        c = !1;
      },
      d(g) {
        var l = e;
        for (let m = 0; m < l.length; m += 1) l[m] && l[m].d(g);
        g && H(b);
      },
    };
  }
  function sb(a) {
    let b, c;
    b = new $b({ props: { config: a[2], step: a[0] } });
    return {
      c() {
        da(b.$$.fragment);
      },
      m(d, e) {
        W(b, d, e);
        c = !0;
      },
      p(d, e) {
        let f = {};
        e & 2 && (f.config = d[2]);
        e & 1 && (f.step = d[0]);
        b.$set(f);
      },
      i(d) {
        c || (z(b.$$.fragment, d), (c = !0));
      },
      o(d) {
        C(b.$$.fragment, d);
        c = !1;
      },
      d(d) {
        X(b, d);
      },
    };
  }
  function ac(a) {
    let b,
      c,
      d = a[1] && rb(a);
    return {
      c() {
        b = document.createElement("footer");
        d && d.c();
        B(b, "class", "shepherd-footer");
      },
      m(e, f) {
        e.insertBefore(b, f || null);
        d && d.m(b, null);
        c = !0;
      },
      p(e, f) {
        [f] = f;
        e[1]
          ? d
            ? (d.p(e, f), f & 2 && z(d, 1))
            : ((d = rb(e)), d.c(), z(d, 1), d.m(b, null))
          : d &&
            (aa(),
            C(d, 1, 1, () => {
              d = null;
            }),
            ca());
      },
      i(e) {
        c || (z(d), (c = !0));
      },
      o(e) {
        C(d);
        c = !1;
      },
      d(e) {
        e && H(b);
        d && d.d();
      },
    };
  }
  function bc(a, b, c) {
    let d,
      { step: e } = b;
    a.$$set = (f) => {
      "step" in f && c(0, (e = f.step));
    };
    a.$$.update = () => {
      a.$$.dirty & 1 && c(1, (d = e.options.buttons));
    };
    return [e, d];
  }
  function cc(a) {
    let b, c, d, e, f;
    return {
      c() {
        b = document.createElement("button");
        c = document.createElement("span");
        c.textContent = "\u00d7";
        B(c, "aria-hidden", "true");
        B(b, "aria-label", (d = a[0].label ? a[0].label : "Close Tour"));
        B(b, "class", "shepherd-cancel-icon");
        B(b, "type", "button");
      },
      m(g, l) {
        g.insertBefore(b, l || null);
        b.appendChild(c);
        e || ((f = ya(b, "click", a[1])), (e = !0));
      },
      p(g, l) {
        [l] = l;
        l & 1 &&
          d !== (d = g[0].label ? g[0].label : "Close Tour") &&
          B(b, "aria-label", d);
      },
      i: G,
      o: G,
      d(g) {
        g && H(b);
        e = !1;
        f();
      },
    };
  }
  function dc(a, b, c) {
    let { cancelIcon: d, step: e } = b;
    a.$$set = (f) => {
      "cancelIcon" in f && c(0, (d = f.cancelIcon));
      "step" in f && c(2, (e = f.step));
    };
    return [
      d,
      (f) => {
        f.preventDefault();
        e.cancel();
      },
      e,
    ];
  }
  function ec(a) {
    let b;
    return {
      c() {
        b = document.createElement("h3");
        B(b, "id", a[1]);
        B(b, "class", "shepherd-title");
      },
      m(c, d) {
        c.insertBefore(b, d || null);
        a[3](b);
      },
      p(c, d) {
        [d] = d;
        d & 2 && B(b, "id", c[1]);
      },
      i: G,
      o: G,
      d(c) {
        c && H(b);
        a[3](null);
      },
    };
  }
  function fc(a, b, c) {
    let { labelId: d, element: e, title: f } = b;
    za().$$.after_update.push(() => {
      Z(f) && c(2, (f = f()));
      c(0, (e.innerHTML = f), e);
    });
    a.$$set = (g) => {
      "labelId" in g && c(1, (d = g.labelId));
      "element" in g && c(0, (e = g.element));
      "title" in g && c(2, (f = g.title));
    };
    return [
      e,
      d,
      f,
      function (g) {
        ma[g ? "unshift" : "push"](() => {
          e = g;
          c(0, e);
        });
      },
    ];
  }
  function tb(a) {
    let b, c;
    b = new gc({ props: { labelId: a[0], title: a[2] } });
    return {
      c() {
        da(b.$$.fragment);
      },
      m(d, e) {
        W(b, d, e);
        c = !0;
      },
      p(d, e) {
        let f = {};
        e & 1 && (f.labelId = d[0]);
        e & 4 && (f.title = d[2]);
        b.$set(f);
      },
      i(d) {
        c || (z(b.$$.fragment, d), (c = !0));
      },
      o(d) {
        C(b.$$.fragment, d);
        c = !1;
      },
      d(d) {
        X(b, d);
      },
    };
  }
  function ub(a) {
    let b, c;
    b = new hc({ props: { cancelIcon: a[3], step: a[1] } });
    return {
      c() {
        da(b.$$.fragment);
      },
      m(d, e) {
        W(b, d, e);
        c = !0;
      },
      p(d, e) {
        let f = {};
        e & 8 && (f.cancelIcon = d[3]);
        e & 2 && (f.step = d[1]);
        b.$set(f);
      },
      i(d) {
        c || (z(b.$$.fragment, d), (c = !0));
      },
      o(d) {
        C(b.$$.fragment, d);
        c = !1;
      },
      d(d) {
        X(b, d);
      },
    };
  }
  function ic(a) {
    let b,
      c,
      d,
      e = a[2] && tb(a),
      f = a[3] && a[3].enabled && ub(a);
    return {
      c() {
        b = document.createElement("header");
        e && e.c();
        c = document.createTextNode(" ");
        f && f.c();
        B(b, "class", "shepherd-header");
      },
      m(g, l) {
        g.insertBefore(b, l || null);
        e && e.m(b, null);
        b.appendChild(c);
        f && f.m(b, null);
        d = !0;
      },
      p(g, l) {
        [l] = l;
        g[2]
          ? e
            ? (e.p(g, l), l & 4 && z(e, 1))
            : ((e = tb(g)), e.c(), z(e, 1), e.m(b, c))
          : e &&
            (aa(),
            C(e, 1, 1, () => {
              e = null;
            }),
            ca());
        g[3] && g[3].enabled
          ? f
            ? (f.p(g, l), l & 8 && z(f, 1))
            : ((f = ub(g)), f.c(), z(f, 1), f.m(b, null))
          : f &&
            (aa(),
            C(f, 1, 1, () => {
              f = null;
            }),
            ca());
      },
      i(g) {
        d || (z(e), z(f), (d = !0));
      },
      o(g) {
        C(e);
        C(f);
        d = !1;
      },
      d(g) {
        g && H(b);
        e && e.d();
        f && f.d();
      },
    };
  }
  function jc(a, b, c) {
    let { labelId: d, step: e } = b,
      f,
      g;
    a.$$set = (l) => {
      "labelId" in l && c(0, (d = l.labelId));
      "step" in l && c(1, (e = l.step));
    };
    a.$$.update = () => {
      a.$$.dirty & 2 &&
        (c(2, (f = e.options.title)), c(3, (g = e.options.cancelIcon)));
    };
    return [d, e, f, g];
  }
  function kc(a) {
    let b;
    return {
      c() {
        b = document.createElement("div");
        B(b, "class", "shepherd-text");
        B(b, "id", a[1]);
      },
      m(c, d) {
        c.insertBefore(b, d || null);
        a[3](b);
      },
      p(c, d) {
        [d] = d;
        d & 2 && B(b, "id", c[1]);
      },
      i: G,
      o: G,
      d(c) {
        c && H(b);
        a[3](null);
      },
    };
  }
  function lc(a, b, c) {
    let { descriptionId: d, element: e, step: f } = b;
    za().$$.after_update.push(() => {
      let { text: g } = f.options;
      Z(g) && (g = g.call(f));
      g instanceof HTMLElement ? e.appendChild(g) : c(0, (e.innerHTML = g), e);
    });
    a.$$set = (g) => {
      "descriptionId" in g && c(1, (d = g.descriptionId));
      "element" in g && c(0, (e = g.element));
      "step" in g && c(2, (f = g.step));
    };
    return [
      e,
      d,
      f,
      function (g) {
        ma[g ? "unshift" : "push"](() => {
          e = g;
          c(0, e);
        });
      },
    ];
  }
  function vb(a) {
    let b, c;
    b = new mc({ props: { labelId: a[1], step: a[2] } });
    return {
      c() {
        da(b.$$.fragment);
      },
      m(d, e) {
        W(b, d, e);
        c = !0;
      },
      p(d, e) {
        let f = {};
        e & 2 && (f.labelId = d[1]);
        e & 4 && (f.step = d[2]);
        b.$set(f);
      },
      i(d) {
        c || (z(b.$$.fragment, d), (c = !0));
      },
      o(d) {
        C(b.$$.fragment, d);
        c = !1;
      },
      d(d) {
        X(b, d);
      },
    };
  }
  function wb(a) {
    let b, c;
    b = new nc({ props: { descriptionId: a[0], step: a[2] } });
    return {
      c() {
        da(b.$$.fragment);
      },
      m(d, e) {
        W(b, d, e);
        c = !0;
      },
      p(d, e) {
        let f = {};
        e & 1 && (f.descriptionId = d[0]);
        e & 4 && (f.step = d[2]);
        b.$set(f);
      },
      i(d) {
        c || (z(b.$$.fragment, d), (c = !0));
      },
      o(d) {
        C(b.$$.fragment, d);
        c = !1;
      },
      d(d) {
        X(b, d);
      },
    };
  }
  function xb(a) {
    let b, c;
    b = new oc({ props: { step: a[2] } });
    return {
      c() {
        da(b.$$.fragment);
      },
      m(d, e) {
        W(b, d, e);
        c = !0;
      },
      p(d, e) {
        let f = {};
        e & 4 && (f.step = d[2]);
        b.$set(f);
      },
      i(d) {
        c || (z(b.$$.fragment, d), (c = !0));
      },
      o(d) {
        C(b.$$.fragment, d);
        c = !1;
      },
      d(d) {
        X(b, d);
      },
    };
  }
  function pc(a) {
    let b,
      c =
        void 0 !== a[2].options.title ||
        (a[2].options.cancelIcon && a[2].options.cancelIcon.enabled),
      d,
      e = void 0 !== a[2].options.text,
      f,
      g = Array.isArray(a[2].options.buttons) && a[2].options.buttons.length,
      l,
      m = c && vb(a),
      k = e && wb(a),
      p = g && xb(a);
    return {
      c() {
        b = document.createElement("div");
        m && m.c();
        d = document.createTextNode(" ");
        k && k.c();
        f = document.createTextNode(" ");
        p && p.c();
        B(b, "class", "shepherd-content");
      },
      m(q, n) {
        q.insertBefore(b, n || null);
        m && m.m(b, null);
        b.appendChild(d);
        k && k.m(b, null);
        b.appendChild(f);
        p && p.m(b, null);
        l = !0;
      },
      p(q, n) {
        [n] = n;
        n & 4 &&
          (c =
            void 0 !== q[2].options.title ||
            (q[2].options.cancelIcon && q[2].options.cancelIcon.enabled));
        c
          ? m
            ? (m.p(q, n), n & 4 && z(m, 1))
            : ((m = vb(q)), m.c(), z(m, 1), m.m(b, d))
          : m &&
            (aa(),
            C(m, 1, 1, () => {
              m = null;
            }),
            ca());
        n & 4 && (e = void 0 !== q[2].options.text);
        e
          ? k
            ? (k.p(q, n), n & 4 && z(k, 1))
            : ((k = wb(q)), k.c(), z(k, 1), k.m(b, f))
          : k &&
            (aa(),
            C(k, 1, 1, () => {
              k = null;
            }),
            ca());
        n & 4 &&
          (g =
            Array.isArray(q[2].options.buttons) && q[2].options.buttons.length);
        g
          ? p
            ? (p.p(q, n), n & 4 && z(p, 1))
            : ((p = xb(q)), p.c(), z(p, 1), p.m(b, null))
          : p &&
            (aa(),
            C(p, 1, 1, () => {
              p = null;
            }),
            ca());
      },
      i(q) {
        l || (z(m), z(k), z(p), (l = !0));
      },
      o(q) {
        C(m);
        C(k);
        C(p);
        l = !1;
      },
      d(q) {
        q && H(b);
        m && m.d();
        k && k.d();
        p && p.d();
      },
    };
  }
  function qc(a, b, c) {
    let { descriptionId: d, labelId: e, step: f } = b;
    a.$$set = (g) => {
      "descriptionId" in g && c(0, (d = g.descriptionId));
      "labelId" in g && c(1, (e = g.labelId));
      "step" in g && c(2, (f = g.step));
    };
    return [d, e, f];
  }
  function yb(a) {
    let b;
    return {
      c() {
        b = document.createElement("div");
        B(b, "class", "shepherd-arrow");
        B(b, "data-popper-arrow", "");
      },
      m(c, d) {
        c.insertBefore(b, d || null);
      },
      d(c) {
        c && H(b);
      },
    };
  }
  function rc(a) {
    let b,
      c,
      d,
      e,
      f,
      g,
      l,
      m,
      k =
        a[4].options.arrow &&
        a[4].options.attachTo &&
        a[4].options.attachTo.element &&
        a[4].options.attachTo.on &&
        yb();
    d = new sc({ props: { descriptionId: a[2], labelId: a[3], step: a[4] } });
    let p = [
        {
          "aria-describedby": (e = void 0 !== a[4].options.text ? a[2] : null),
        },
        { "aria-labelledby": (f = a[4].options.title ? a[3] : null) },
        a[1],
        { role: "dialog" },
        { tabindex: "0" },
      ],
      q = {};
    for (let n = 0; n < p.length; n += 1) q = Wb(q, p[n]);
    return {
      c() {
        b = document.createElement("div");
        k && k.c();
        c = document.createTextNode(" ");
        da(d.$$.fragment);
        nb(b, q);
        la(b, "shepherd-has-cancel-icon", a[5]);
        la(b, "shepherd-has-title", a[6]);
        la(b, "shepherd-element", !0);
      },
      m(n, r) {
        n.insertBefore(b, r || null);
        k && k.m(b, null);
        b.appendChild(c);
        W(d, b, null);
        a[13](b);
        g = !0;
        l || ((m = ya(b, "keydown", a[7])), (l = !0));
      },
      p(n, r) {
        var [x] = r;
        n[4].options.arrow &&
        n[4].options.attachTo &&
        n[4].options.attachTo.element &&
        n[4].options.attachTo.on
          ? k || ((k = yb()), k.c(), k.m(b, c))
          : k && (k.d(1), (k = null));
        r = {};
        x & 4 && (r.descriptionId = n[2]);
        x & 8 && (r.labelId = n[3]);
        x & 16 && (r.step = n[4]);
        d.$set(r);
        r = b;
        x = [
          (!g ||
            (x & 20 &&
              e !== (e = void 0 !== n[4].options.text ? n[2] : null))) && {
            "aria-describedby": e,
          },
          (!g || (x & 24 && f !== (f = n[4].options.title ? n[3] : null))) && {
            "aria-labelledby": f,
          },
          x & 2 && n[1],
          { role: "dialog" },
          { tabindex: "0" },
        ];
        let h = {},
          t = {},
          v = { $$scope: 1 },
          A = p.length;
        for (; A--; ) {
          let u = p[A],
            w = x[A];
          if (w) {
            for (let y in u) y in w || (t[y] = 1);
            for (let y in w) v[y] || ((h[y] = w[y]), (v[y] = 1));
            p[A] = w;
          } else for (let y in u) v[y] = 1;
        }
        for (let u in t) u in h || (h[u] = void 0);
        nb(r, (q = h));
        la(b, "shepherd-has-cancel-icon", n[5]);
        la(b, "shepherd-has-title", n[6]);
        la(b, "shepherd-element", !0);
      },
      i(n) {
        g || (z(d.$$.fragment, n), (g = !0));
      },
      o(n) {
        C(d.$$.fragment, n);
        g = !1;
      },
      d(n) {
        n && H(b);
        k && k.d();
        X(d);
        a[13](null);
        l = !1;
        m();
      },
    };
  }
  function zb(a) {
    return a.split(" ").filter((b) => !!b.length);
  }
  function tc(a, b, c) {
    let {
        classPrefix: d,
        element: e,
        descriptionId: f,
        firstFocusableElement: g,
        focusableElements: l,
        labelId: m,
        lastFocusableElement: k,
        step: p,
        dataStepId: q,
      } = b,
      n,
      r,
      x;
    za().$$.on_mount.push(() => {
      c(1, (q = { [`data-${d}shepherd-step-id`]: p.id }));
      c(
        9,
        (l = e.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
        ))
      );
      c(8, (g = l[0]));
      c(10, (k = l[l.length - 1]));
    });
    za().$$.after_update.push(() => {
      if (x !== p.options.classes) {
        var h = x;
        qa(h) && ((h = zb(h)), h.length && e.classList.remove(...h));
        h = x = p.options.classes;
        qa(h) && ((h = zb(h)), h.length && e.classList.add(...h));
      }
    });
    a.$$set = (h) => {
      "classPrefix" in h && c(11, (d = h.classPrefix));
      "element" in h && c(0, (e = h.element));
      "descriptionId" in h && c(2, (f = h.descriptionId));
      "firstFocusableElement" in h && c(8, (g = h.firstFocusableElement));
      "focusableElements" in h && c(9, (l = h.focusableElements));
      "labelId" in h && c(3, (m = h.labelId));
      "lastFocusableElement" in h && c(10, (k = h.lastFocusableElement));
      "step" in h && c(4, (p = h.step));
      "dataStepId" in h && c(1, (q = h.dataStepId));
    };
    a.$$.update = () => {
      a.$$.dirty & 16 &&
        (c(
          5,
          (n =
            p.options && p.options.cancelIcon && p.options.cancelIcon.enabled)
        ),
        c(6, (r = p.options && p.options.title)));
    };
    return [
      e,
      q,
      f,
      m,
      p,
      n,
      r,
      (h) => {
        const { tour: t } = p;
        switch (h.keyCode) {
          case 9:
            if (0 === l.length) {
              h.preventDefault();
              break;
            }
            if (h.shiftKey) {
              if (
                document.activeElement === g ||
                document.activeElement.classList.contains("shepherd-element")
              )
                h.preventDefault(), k.focus();
            } else
              document.activeElement === k && (h.preventDefault(), g.focus());
            break;
          case 27:
            t.options.exitOnEsc && p.cancel();
            break;
          case 37:
            t.options.keyboardNavigation && t.back();
            break;
          case 39:
            t.options.keyboardNavigation && t.next();
        }
      },
      g,
      l,
      k,
      d,
      () => e,
      function (h) {
        ma[h ? "unshift" : "push"](() => {
          e = h;
          c(0, e);
        });
      },
    ];
  }
  function uc(a) {
    a &&
      (({ steps: a } = a),
      a.forEach((b) => {
        b.options &&
          !1 === b.options.canClickTarget &&
          b.options.attachTo &&
          b.target instanceof HTMLElement &&
          b.target.classList.remove("shepherd-target-click-disabled");
      }));
  }
  function vc(a) {
    let b, c, d, e, f;
    return {
      c() {
        b = mb("svg");
        c = mb("path");
        B(c, "d", a[2]);
        B(
          b,
          "class",
          (d = `${
            a[1] ? "shepherd-modal-is-visible" : ""
          } shepherd-modal-overlay-container`)
        );
      },
      m(g, l) {
        g.insertBefore(b, l || null);
        b.appendChild(c);
        a[11](b);
        e || ((f = ya(b, "touchmove", a[3])), (e = !0));
      },
      p(g, l) {
        [l] = l;
        l & 4 && B(c, "d", g[2]);
        l & 2 &&
          d !==
            (d = `${
              g[1] ? "shepherd-modal-is-visible" : ""
            } shepherd-modal-overlay-container`) &&
          B(b, "class", d);
      },
      i: G,
      o: G,
      d(g) {
        g && H(b);
        a[11](null);
        e = !1;
        f();
      },
    };
  }
  function Ab(a) {
    if (!a) return null;
    let b = a instanceof HTMLElement && window.getComputedStyle(a).overflowY;
    return "hidden" !== b && "visible" !== b && a.scrollHeight >= a.clientHeight
      ? a
      : Ab(a.parentElement);
  }
  function wc(a, b, c) {
    function d() {
      c(4, (p = { width: 0, height: 0, x: 0, y: 0, r: 0 }));
    }
    function e() {
      c(1, (q = !1));
      l();
    }
    function f(h, t, v, A) {
      void 0 === h && (h = 0);
      void 0 === t && (t = 0);
      if (A) {
        var u = A.getBoundingClientRect();
        let y = u.y || u.top;
        u = u.bottom || y + u.height;
        if (v) {
          var w = v.getBoundingClientRect();
          v = w.y || w.top;
          w = w.bottom || v + w.height;
          y = Math.max(y, v);
          u = Math.min(u, w);
        }
        let { y: Y, height: E } = { y, height: Math.max(u - y, 0) },
          { x: I, width: D, left: na } = A.getBoundingClientRect();
        c(
          4,
          (p = {
            width: D + 2 * h,
            height: E + 2 * h,
            x: (I || na) - h,
            y: Y - h,
            r: t,
          })
        );
      } else d();
    }
    function g() {
      c(1, (q = !0));
    }
    function l() {
      n && (cancelAnimationFrame(n), (n = void 0));
      window.removeEventListener("touchmove", x, { passive: !1 });
    }
    function m(h) {
      let { modalOverlayOpeningPadding: t, modalOverlayOpeningRadius: v } =
          h.options,
        A = Ab(h.target),
        u = () => {
          n = void 0;
          f(t, v, A, h.target);
          n = requestAnimationFrame(u);
        };
      u();
      window.addEventListener("touchmove", x, { passive: !1 });
    }
    let { element: k, openingProperties: p } = b;
    Ma();
    let q = !1,
      n = void 0,
      r;
    d();
    let x = (h) => {
      h.preventDefault();
    };
    a.$$set = (h) => {
      "element" in h && c(0, (k = h.element));
      "openingProperties" in h && c(4, (p = h.openingProperties));
    };
    a.$$.update = () => {
      if (a.$$.dirty & 16) {
        let { width: h, height: t, x: v = 0, y: A = 0, r: u = 0 } = p,
          { innerWidth: w, innerHeight: y } = window;
        c(
          2,
          (r = `M${w},${y}\
H0\
V0\
H${w}\
V${y}\
Z\
M${v + u},${A}\
a${u},${u},0,0,0-${u},${u}\
V${t + A - u}\
a${u},${u},0,0,0,${u},${u}\
H${h + v - u}\
a${u},${u},0,0,0,${u}-${u}\
V${A + u}\
a${u},${u},0,0,0-${u}-${u}\
Z`)
        );
      }
    };
    return [
      k,
      q,
      r,
      (h) => {
        h.stopPropagation();
      },
      p,
      () => k,
      d,
      e,
      f,
      function (h) {
        l();
        h.tour.options.useModalOverlay ? (m(h), g()) : e();
      },
      g,
      function (h) {
        ma[h ? "unshift" : "push"](() => {
          k = h;
          c(0, k);
        });
      },
    ];
  }
  var Fb = function (a) {
      var b;
      if ((b = !!a && "object" === typeof a))
        (b = Object.prototype.toString.call(a)),
          (b = !(
            "[object RegExp]" === b ||
            "[object Date]" === b ||
            a.$$typeof === xc
          ));
      return b;
    },
    xc =
      "function" === typeof Symbol && Symbol.for
        ? Symbol.for("react.element")
        : 60103;
  ea.all = function (a, b) {
    if (!Array.isArray(a)) throw Error("first argument should be an array");
    return a.reduce(function (c, d) {
      return ea(c, d, b);
    }, {});
  };
  var yc = ea;
  class Qa {
    on(a, b, c, d) {
      void 0 === d && (d = !1);
      void 0 === this.bindings && (this.bindings = {});
      void 0 === this.bindings[a] && (this.bindings[a] = []);
      this.bindings[a].push({ handler: b, ctx: c, once: d });
      return this;
    }
    once(a, b, c) {
      return this.on(a, b, c, !0);
    }
    off(a, b) {
      if (void 0 === this.bindings || void 0 === this.bindings[a]) return this;
      void 0 === b
        ? delete this.bindings[a]
        : this.bindings[a].forEach((c, d) => {
            c.handler === b && this.bindings[a].splice(d, 1);
          });
      return this;
    }
    trigger(a) {
      for (
        var b = arguments.length, c = Array(1 < b ? b - 1 : 0), d = 1;
        d < b;
        d++
      )
        c[d - 1] = arguments[d];
      void 0 !== this.bindings &&
        this.bindings[a] &&
        this.bindings[a].forEach((e, f) => {
          let { ctx: g, handler: l, once: m } = e;
          l.apply(g || this, c);
          m && this.bindings[a].splice(f, 1);
        });
      return this;
    }
  }
  var ua = ["top", "bottom", "right", "left"],
    eb = ua.reduce(function (a, b) {
      return a.concat([b + "-start", b + "-end"]);
    }, []),
    db = [].concat(ua, ["auto"]).reduce(function (a, b) {
      return a.concat([b, b + "-start", b + "-end"]);
    }, []),
    Sb =
      "beforeRead read afterRead beforeMain main afterMain beforeWrite write afterWrite".split(
        " "
      ),
    L = Math.max,
    V = Math.min,
    ia = Math.round,
    Ib = { top: "auto", right: "auto", bottom: "auto", left: "auto" },
    Da = { passive: !0 },
    Jb = { left: "right", right: "left", bottom: "top", top: "bottom" },
    Kb = { start: "end", end: "start" },
    Bb = { placement: "bottom", modifiers: [], strategy: "absolute" },
    zc = (function (a) {
      void 0 === a && (a = {});
      var b = a.defaultModifiers,
        c = void 0 === b ? [] : b;
      a = a.defaultOptions;
      var d = void 0 === a ? Bb : a;
      return function (e, f, g) {
        function l() {
          k.orderedModifiers.forEach(function (r) {
            var x = r.name,
              h = r.options;
            h = void 0 === h ? {} : h;
            r = r.effect;
            "function" === typeof r &&
              ((x = r({ state: k, name: x, instance: n, options: h })),
              p.push(x || function () {}));
          });
        }
        function m() {
          p.forEach(function (r) {
            return r();
          });
          p = [];
        }
        void 0 === g && (g = d);
        var k = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, Bb, d),
            modifiersData: {},
            elements: { reference: e, popper: f },
            attributes: {},
            styles: {},
          },
          p = [],
          q = !1,
          n = {
            state: k,
            setOptions: function (r) {
              r = "function" === typeof r ? r(k.options) : r;
              m();
              k.options = Object.assign({}, d, k.options, r);
              k.scrollParents = {
                reference: fa(e)
                  ? sa(e)
                  : e.contextElement
                  ? sa(e.contextElement)
                  : [],
                popper: sa(f),
              };
              r = Rb(Ub([].concat(c, k.options.modifiers)));
              k.orderedModifiers = r.filter(function (x) {
                return x.enabled;
              });
              l();
              return n.update();
            },
            forceUpdate: function () {
              if (!q) {
                var r = k.elements,
                  x = r.reference;
                r = r.popper;
                if (hb(x, r))
                  for (
                    k.rects = {
                      reference: Pb(x, ra(r), "fixed" === k.options.strategy),
                      popper: Fa(r),
                    },
                      k.reset = !1,
                      k.placement = k.options.placement,
                      k.orderedModifiers.forEach(function (v) {
                        return (k.modifiersData[v.name] = Object.assign(
                          {},
                          v.data
                        ));
                      }),
                      x = 0;
                    x < k.orderedModifiers.length;
                    x++
                  )
                    if (!0 === k.reset) (k.reset = !1), (x = -1);
                    else {
                      var h = k.orderedModifiers[x];
                      r = h.fn;
                      var t = h.options;
                      t = void 0 === t ? {} : t;
                      h = h.name;
                      "function" === typeof r &&
                        (k =
                          r({ state: k, options: t, name: h, instance: n }) ||
                          k);
                    }
              }
            },
            update: Tb(function () {
              return new Promise(function (r) {
                n.forceUpdate();
                r(k);
              });
            }),
            destroy: function () {
              m();
              q = !0;
            },
          };
        if (!hb(e, f)) return n;
        n.setOptions(g).then(function (r) {
          if (!q && g.onFirstUpdate) g.onFirstUpdate(r);
        });
        return n;
      };
    })({
      defaultModifiers: [
        {
          name: "eventListeners",
          enabled: !0,
          phase: "write",
          fn: function () {},
          effect: function (a) {
            var b = a.state,
              c = a.instance;
            a = a.options;
            var d = a.scroll,
              e = void 0 === d ? !0 : d;
            a = a.resize;
            var f = void 0 === a ? !0 : a,
              g = K(b.elements.popper),
              l = [].concat(b.scrollParents.reference, b.scrollParents.popper);
            e &&
              l.forEach(function (m) {
                m.addEventListener("scroll", c.update, Da);
              });
            f && g.addEventListener("resize", c.update, Da);
            return function () {
              e &&
                l.forEach(function (m) {
                  m.removeEventListener("scroll", c.update, Da);
                });
              f && g.removeEventListener("resize", c.update, Da);
            };
          },
          data: {},
        },
        {
          name: "popperOffsets",
          enabled: !0,
          phase: "read",
          fn: function (a) {
            var b = a.state;
            b.modifiersData[a.name] = cb({
              reference: b.rects.reference,
              element: b.rects.popper,
              strategy: "absolute",
              placement: b.placement,
            });
          },
          data: {},
        },
        {
          name: "computeStyles",
          enabled: !0,
          phase: "beforeWrite",
          fn: function (a) {
            var b = a.state,
              c = a.options;
            a = c.gpuAcceleration;
            a = void 0 === a ? !0 : a;
            var d = c.adaptive;
            d = void 0 === d ? !0 : d;
            c = c.roundOffsets;
            c = void 0 === c ? !0 : c;
            a = {
              placement: N(b.placement),
              variation: ja(b.placement),
              popper: b.elements.popper,
              popperRect: b.rects.popper,
              gpuAcceleration: a,
              isFixed: "fixed" === b.options.strategy,
            };
            null != b.modifiersData.popperOffsets &&
              (b.styles.popper = Object.assign(
                {},
                b.styles.popper,
                Za(
                  Object.assign({}, a, {
                    offsets: b.modifiersData.popperOffsets,
                    position: b.options.strategy,
                    adaptive: d,
                    roundOffsets: c,
                  })
                )
              ));
            null != b.modifiersData.arrow &&
              (b.styles.arrow = Object.assign(
                {},
                b.styles.arrow,
                Za(
                  Object.assign({}, a, {
                    offsets: b.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: c,
                  })
                )
              ));
            b.attributes.popper = Object.assign({}, b.attributes.popper, {
              "data-popper-placement": b.placement,
            });
          },
          data: {},
        },
        {
          name: "applyStyles",
          enabled: !0,
          phase: "write",
          fn: function (a) {
            var b = a.state;
            Object.keys(b.elements).forEach(function (c) {
              var d = b.styles[c] || {},
                e = b.attributes[c] || {},
                f = b.elements[c];
              F(f) &&
                M(f) &&
                (Object.assign(f.style, d),
                Object.keys(e).forEach(function (g) {
                  var l = e[g];
                  !1 === l
                    ? f.removeAttribute(g)
                    : f.setAttribute(g, !0 === l ? "" : l);
                }));
            });
          },
          effect: function (a) {
            var b = a.state,
              c = {
                popper: {
                  position: b.options.strategy,
                  left: "0",
                  top: "0",
                  margin: "0",
                },
                arrow: { position: "absolute" },
                reference: {},
              };
            Object.assign(b.elements.popper.style, c.popper);
            b.styles = c;
            b.elements.arrow && Object.assign(b.elements.arrow.style, c.arrow);
            return function () {
              Object.keys(b.elements).forEach(function (d) {
                var e = b.elements[d],
                  f = b.attributes[d] || {};
                d = Object.keys(
                  b.styles.hasOwnProperty(d) ? b.styles[d] : c[d]
                ).reduce(function (g, l) {
                  g[l] = "";
                  return g;
                }, {});
                F(e) &&
                  M(e) &&
                  (Object.assign(e.style, d),
                  Object.keys(f).forEach(function (g) {
                    e.removeAttribute(g);
                  }));
              });
            };
          },
          requires: ["computeStyles"],
        },
        {
          name: "offset",
          enabled: !0,
          phase: "main",
          requires: ["popperOffsets"],
          fn: function (a) {
            var b = a.state,
              c = a.name;
            a = a.options.offset;
            var d = void 0 === a ? [0, 0] : a;
            a = db.reduce(function (g, l) {
              var m = b.rects;
              var k = N(l);
              var p = 0 <= ["left", "top"].indexOf(k) ? -1 : 1,
                q =
                  "function" === typeof d
                    ? d(Object.assign({}, m, { placement: l }))
                    : d;
              m = q[0];
              q = q[1];
              m = m || 0;
              q = (q || 0) * p;
              k =
                0 <= ["left", "right"].indexOf(k)
                  ? { x: q, y: m }
                  : { x: m, y: q };
              g[l] = k;
              return g;
            }, {});
            var e = a[b.placement],
              f = e.x;
            e = e.y;
            null != b.modifiersData.popperOffsets &&
              ((b.modifiersData.popperOffsets.x += f),
              (b.modifiersData.popperOffsets.y += e));
            b.modifiersData[c] = a;
          },
        },
        {
          name: "flip",
          enabled: !0,
          phase: "main",
          fn: function (a) {
            var b = a.state,
              c = a.options;
            a = a.name;
            if (!b.modifiersData[a]._skip) {
              var d = c.mainAxis;
              d = void 0 === d ? !0 : d;
              var e = c.altAxis;
              e = void 0 === e ? !0 : e;
              var f = c.fallbackPlacements,
                g = c.padding,
                l = c.boundary,
                m = c.rootBoundary,
                k = c.altBoundary,
                p = c.flipVariations,
                q = void 0 === p ? !0 : p,
                n = c.allowedAutoPlacements;
              c = b.options.placement;
              p = N(c);
              f = f || (p !== c && q ? Ob(c) : [xa(c)]);
              var r = [c].concat(f).reduce(function (E, I) {
                return E.concat(
                  "auto" === N(I)
                    ? Nb(b, {
                        placement: I,
                        boundary: l,
                        rootBoundary: m,
                        padding: g,
                        flipVariations: q,
                        allowedAutoPlacements: n,
                      })
                    : I
                );
              }, []);
              c = b.rects.reference;
              f = b.rects.popper;
              var x = new Map();
              p = !0;
              for (var h = r[0], t = 0; t < r.length; t++) {
                var v = r[t],
                  A = N(v),
                  u = "start" === ja(v),
                  w = 0 <= ["top", "bottom"].indexOf(A),
                  y = w ? "width" : "height",
                  Y = ta(b, {
                    placement: v,
                    boundary: l,
                    rootBoundary: m,
                    altBoundary: k,
                    padding: g,
                  });
                u = w ? (u ? "right" : "left") : u ? "bottom" : "top";
                c[y] > f[y] && (u = xa(u));
                y = xa(u);
                w = [];
                d && w.push(0 >= Y[A]);
                e && w.push(0 >= Y[u], 0 >= Y[y]);
                if (
                  w.every(function (E) {
                    return E;
                  })
                ) {
                  h = v;
                  p = !1;
                  break;
                }
                x.set(v, w);
              }
              if (p)
                for (
                  d = function (E) {
                    var I = r.find(function (D) {
                      if ((D = x.get(D)))
                        return D.slice(0, E).every(function (na) {
                          return na;
                        });
                    });
                    if (I) return (h = I), "break";
                  },
                    e = q ? 3 : 1;
                  0 < e && "break" !== d(e);
                  e--
                );
              b.placement !== h &&
                ((b.modifiersData[a]._skip = !0),
                (b.placement = h),
                (b.reset = !0));
            }
          },
          requiresIfExists: ["offset"],
          data: { _skip: !1 },
        },
        {
          name: "preventOverflow",
          enabled: !0,
          phase: "main",
          fn: function (a) {
            var b = a.state,
              c = a.options;
            a = a.name;
            var d = c.mainAxis,
              e = void 0 === d ? !0 : d;
            d = c.altAxis;
            var f = void 0 === d ? !1 : d;
            d = c.tether;
            var g = void 0 === d ? !0 : d;
            d = c.tetherOffset;
            var l = void 0 === d ? 0 : d,
              m = ta(b, {
                boundary: c.boundary,
                rootBoundary: c.rootBoundary,
                padding: c.padding,
                altBoundary: c.altBoundary,
              }),
              k = N(b.placement),
              p = ja(b.placement),
              q = !p,
              n = Ga(k);
            c = "x" === n ? "y" : "x";
            d = b.modifiersData.popperOffsets;
            var r = b.rects.reference,
              x = b.rects.popper;
            l =
              "function" === typeof l
                ? l(Object.assign({}, b.rects, { placement: b.placement }))
                : l;
            var h =
                "number" === typeof l
                  ? { mainAxis: l, altAxis: l }
                  : Object.assign({ mainAxis: 0, altAxis: 0 }, l),
              t = b.modifiersData.offset
                ? b.modifiersData.offset[b.placement]
                : null;
            l = { x: 0, y: 0 };
            if (d) {
              if (e) {
                var v,
                  A = "y" === n ? "top" : "left",
                  u = "y" === n ? "bottom" : "right",
                  w = "y" === n ? "height" : "width";
                e = d[n];
                var y = e + m[A],
                  Y = e - m[u],
                  E = g ? -x[w] / 2 : 0,
                  I = "start" === p ? r[w] : x[w];
                p = "start" === p ? -x[w] : -r[w];
                var D = b.elements.arrow;
                D = g && D ? Fa(D) : { width: 0, height: 0 };
                var na = b.modifiersData["arrow#persistent"]
                  ? b.modifiersData["arrow#persistent"].padding
                  : { top: 0, right: 0, bottom: 0, left: 0 };
                A = na[A];
                u = na[u];
                D = L(0, V(r[w], D[w]));
                I = q
                  ? r[w] / 2 - E - D - A - h.mainAxis
                  : I - D - A - h.mainAxis;
                q = q
                  ? -r[w] / 2 + E + D + u + h.mainAxis
                  : p + D + u + h.mainAxis;
                w = (w = b.elements.arrow && ra(b.elements.arrow))
                  ? "y" === n
                    ? w.clientTop || 0
                    : w.clientLeft || 0
                  : 0;
                E = null != (v = null == t ? void 0 : t[n]) ? v : 0;
                v = e + q - E;
                y = g ? V(y, e + I - E - w) : y;
                v = g ? L(Y, v) : Y;
                v = L(y, V(e, v));
                d[n] = v;
                l[n] = v - e;
              }
              if (f) {
                var J;
                f = d[c];
                e = "y" === c ? "height" : "width";
                v = f + m["x" === n ? "top" : "left"];
                m = f - m["x" === n ? "bottom" : "right"];
                k = -1 !== ["top", "left"].indexOf(k);
                n = null != (J = null == t ? void 0 : t[c]) ? J : 0;
                J = k ? v : f - r[e] - x[e] - n + h.altAxis;
                r = k ? f + r[e] + x[e] - n - h.altAxis : m;
                g && k
                  ? ((J = L(J, V(f, r))), (J = J > r ? r : J))
                  : (J = L(g ? J : v, V(f, g ? r : m)));
                d[c] = J;
                l[c] = J - f;
              }
              b.modifiersData[a] = l;
            }
          },
          requiresIfExists: ["offset"],
        },
        {
          name: "arrow",
          enabled: !0,
          phase: "main",
          fn: function (a) {
            var b,
              c = a.state,
              d = a.name,
              e = a.options,
              f = c.elements.arrow,
              g = c.modifiersData.popperOffsets,
              l = N(c.placement);
            a = Ga(l);
            l = 0 <= ["left", "right"].indexOf(l) ? "height" : "width";
            if (f && g) {
              e = e.padding;
              e =
                "function" === typeof e
                  ? e(Object.assign({}, c.rects, { placement: c.placement }))
                  : e;
              e = Xa("number" !== typeof e ? e : Ya(e, ua));
              var m = Fa(f),
                k = "y" === a ? "top" : "left",
                p = "y" === a ? "bottom" : "right",
                q =
                  c.rects.reference[l] +
                  c.rects.reference[a] -
                  g[a] -
                  c.rects.popper[l];
              g = g[a] - c.rects.reference[a];
              f = (f = ra(f))
                ? "y" === a
                  ? f.clientHeight || 0
                  : f.clientWidth || 0
                : 0;
              g = f / 2 - m[l] / 2 + (q / 2 - g / 2);
              l = L(e[k], V(g, f - m[l] - e[p]));
              c.modifiersData[d] =
                ((b = {}), (b[a] = l), (b.centerOffset = l - g), b);
            }
          },
          effect: function (a) {
            var b = a.state;
            a = a.options.element;
            a = void 0 === a ? "[data-popper-arrow]" : a;
            if (null != a) {
              if (
                "string" === typeof a &&
                ((a = b.elements.popper.querySelector(a)), !a)
              )
                return;
              Va(b.elements.popper, a) && (b.elements.arrow = a);
            }
          },
          requires: ["popperOffsets"],
          requiresIfExists: ["preventOverflow"],
        },
        {
          name: "hide",
          enabled: !0,
          phase: "main",
          requiresIfExists: ["preventOverflow"],
          fn: function (a) {
            var b = a.state;
            a = a.name;
            var c = b.rects.reference,
              d = b.rects.popper,
              e = b.modifiersData.preventOverflow,
              f = ta(b, { elementContext: "reference" }),
              g = ta(b, { altBoundary: !0 });
            c = fb(f, c);
            d = fb(g, d, e);
            e = gb(c);
            g = gb(d);
            b.modifiersData[a] = {
              referenceClippingOffsets: c,
              popperEscapeOffsets: d,
              isReferenceHidden: e,
              hasPopperEscaped: g,
            };
            b.attributes.popper = Object.assign({}, b.attributes.popper, {
              "data-popper-reference-hidden": e,
              "data-popper-escaped": g,
            });
          },
        },
      ],
    });
  let R,
    va = [],
    ma = [],
    Aa = [],
    pb = [],
    Xb = Promise.resolve(),
    Pa = !1,
    Oa = new Set(),
    Ba = 0,
    Ca = new Set(),
    ba;
  class T {
    $destroy() {
      X(this, 1);
      this.$destroy = G;
    }
    $on(a, b) {
      let c = this.$$.callbacks[a] || (this.$$.callbacks[a] = []);
      c.push(b);
      return () => {
        let d = c.indexOf(b);
        -1 !== d && c.splice(d, 1);
      };
    }
    $set(a) {
      this.$$set &&
        0 !== Object.keys(a).length &&
        ((this.$$.skip_bound = !0), this.$$set(a), (this.$$.skip_bound = !1));
    }
  }
  class $b extends T {
    constructor(a) {
      super();
      S(this, a, Zb, Yb, Q, { config: 6, step: 7 });
    }
  }
  class oc extends T {
    constructor(a) {
      super();
      S(this, a, bc, ac, Q, { step: 0 });
    }
  }
  class hc extends T {
    constructor(a) {
      super();
      S(this, a, dc, cc, Q, { cancelIcon: 0, step: 2 });
    }
  }
  class gc extends T {
    constructor(a) {
      super();
      S(this, a, fc, ec, Q, { labelId: 1, element: 0, title: 2 });
    }
  }
  class mc extends T {
    constructor(a) {
      super();
      S(this, a, jc, ic, Q, { labelId: 0, step: 1 });
    }
  }
  class nc extends T {
    constructor(a) {
      super();
      S(this, a, lc, kc, Q, { descriptionId: 1, element: 0, step: 2 });
    }
  }
  class sc extends T {
    constructor(a) {
      super();
      S(this, a, qc, pc, Q, { descriptionId: 0, labelId: 1, step: 2 });
    }
  }
  class Ac extends T {
    constructor(a) {
      super();
      S(this, a, tc, rc, Q, {
        classPrefix: 11,
        element: 0,
        descriptionId: 2,
        firstFocusableElement: 8,
        focusableElements: 9,
        labelId: 3,
        lastFocusableElement: 10,
        step: 4,
        dataStepId: 1,
        getElement: 12,
      });
    }
    get getElement() {
      return this.$$.ctx[12];
    }
  }
  var Cb = (function (a, b) {
    return (b = { exports: {} }), a(b, b.exports), b.exports;
  })(function (a, b) {
    (function () {
      a.exports = {
        polyfill: function () {
          function c(h, t) {
            this.scrollLeft = h;
            this.scrollTop = t;
          }
          function d(h) {
            if (
              null === h ||
              "object" !== typeof h ||
              void 0 === h.behavior ||
              "auto" === h.behavior ||
              "instant" === h.behavior
            )
              return !0;
            if ("object" === typeof h && "smooth" === h.behavior) return !1;
            throw new TypeError(
              "behavior member of ScrollOptions " +
                h.behavior +
                " is not a valid value for enumeration ScrollBehavior."
            );
          }
          function e(h, t) {
            if ("Y" === t) return h.clientHeight + x < h.scrollHeight;
            if ("X" === t) return h.clientWidth + x < h.scrollWidth;
          }
          function f(h, t) {
            h = k.getComputedStyle(h, null)["overflow" + t];
            return "auto" === h || "scroll" === h;
          }
          function g(h) {
            var t = e(h, "Y") && f(h, "Y");
            h = e(h, "X") && f(h, "X");
            return t || h;
          }
          function l(h) {
            var t = (r() - h.startTime) / 468;
            var v = 0.5 * (1 - Math.cos(Math.PI * (1 < t ? 1 : t)));
            t = h.startX + (h.x - h.startX) * v;
            v = h.startY + (h.y - h.startY) * v;
            h.method.call(h.scrollable, t, v);
            (t === h.x && v === h.y) || k.requestAnimationFrame(l.bind(k, h));
          }
          function m(h, t, v) {
            var A = r();
            if (h === p.body) {
              var u = k;
              var w = k.scrollX || k.pageXOffset;
              h = k.scrollY || k.pageYOffset;
              var y = n.scroll;
            } else (u = h), (w = h.scrollLeft), (h = h.scrollTop), (y = c);
            l({
              scrollable: u,
              method: y,
              startTime: A,
              startX: w,
              startY: h,
              x: t,
              y: v,
            });
          }
          var k = window,
            p = document;
          if (
            !(
              "scrollBehavior" in p.documentElement.style &&
              !0 !== k.__forceSmoothScrollPolyfill__
            )
          ) {
            var q = k.HTMLElement || k.Element,
              n = {
                scroll: k.scroll || k.scrollTo,
                scrollBy: k.scrollBy,
                elementScroll: q.prototype.scroll || c,
                scrollIntoView: q.prototype.scrollIntoView,
              },
              r =
                k.performance && k.performance.now
                  ? k.performance.now.bind(k.performance)
                  : Date.now,
              x = /MSIE |Trident\/|Edge\//.test(k.navigator.userAgent) ? 1 : 0;
            k.scroll = k.scrollTo = function (h, t) {
              void 0 !== h &&
                (!0 === d(h)
                  ? n.scroll.call(
                      k,
                      void 0 !== h.left
                        ? h.left
                        : "object" !== typeof h
                        ? h
                        : k.scrollX || k.pageXOffset,
                      void 0 !== h.top
                        ? h.top
                        : void 0 !== t
                        ? t
                        : k.scrollY || k.pageYOffset
                    )
                  : m.call(
                      k,
                      p.body,
                      void 0 !== h.left ? ~~h.left : k.scrollX || k.pageXOffset,
                      void 0 !== h.top ? ~~h.top : k.scrollY || k.pageYOffset
                    ));
            };
            k.scrollBy = function (h, t) {
              void 0 !== h &&
                (d(h)
                  ? n.scrollBy.call(
                      k,
                      void 0 !== h.left
                        ? h.left
                        : "object" !== typeof h
                        ? h
                        : 0,
                      void 0 !== h.top ? h.top : void 0 !== t ? t : 0
                    )
                  : m.call(
                      k,
                      p.body,
                      ~~h.left + (k.scrollX || k.pageXOffset),
                      ~~h.top + (k.scrollY || k.pageYOffset)
                    ));
            };
            q.prototype.scroll = q.prototype.scrollTo = function (h, t) {
              if (void 0 !== h)
                if (!0 === d(h)) {
                  if ("number" === typeof h && void 0 === t)
                    throw new SyntaxError("Value could not be converted");
                  n.elementScroll.call(
                    this,
                    void 0 !== h.left
                      ? ~~h.left
                      : "object" !== typeof h
                      ? ~~h
                      : this.scrollLeft,
                    void 0 !== h.top
                      ? ~~h.top
                      : void 0 !== t
                      ? ~~t
                      : this.scrollTop
                  );
                } else
                  (t = h.left),
                    (h = h.top),
                    m.call(
                      this,
                      this,
                      "undefined" === typeof t ? this.scrollLeft : ~~t,
                      "undefined" === typeof h ? this.scrollTop : ~~h
                    );
            };
            q.prototype.scrollBy = function (h, t) {
              void 0 !== h &&
                (!0 === d(h)
                  ? n.elementScroll.call(
                      this,
                      void 0 !== h.left
                        ? ~~h.left + this.scrollLeft
                        : ~~h + this.scrollLeft,
                      void 0 !== h.top
                        ? ~~h.top + this.scrollTop
                        : ~~t + this.scrollTop
                    )
                  : this.scroll({
                      left: ~~h.left + this.scrollLeft,
                      top: ~~h.top + this.scrollTop,
                      behavior: h.behavior,
                    }));
            };
            q.prototype.scrollIntoView = function (h) {
              if (!0 === d(h))
                n.scrollIntoView.call(this, void 0 === h ? !0 : h);
              else {
                for (h = this; h !== p.body && !1 === g(h); )
                  h = h.parentNode || h.host;
                var t = h.getBoundingClientRect(),
                  v = this.getBoundingClientRect();
                h !== p.body
                  ? (m.call(
                      this,
                      h,
                      h.scrollLeft + v.left - t.left,
                      h.scrollTop + v.top - t.top
                    ),
                    "fixed" !== k.getComputedStyle(h).position &&
                      k.scrollBy({
                        left: t.left,
                        top: t.top,
                        behavior: "smooth",
                      }))
                  : k.scrollBy({
                      left: v.left,
                      top: v.top,
                      behavior: "smooth",
                    });
              }
            };
          }
        },
      };
    })();
  });
  Cb.polyfill;
  Cb.polyfill();
  class Ra extends Qa {
    constructor(a, b) {
      void 0 === b && (b = {});
      super(a, b);
      this.tour = a;
      this.classPrefix = this.tour.options
        ? jb(this.tour.options.classPrefix)
        : "";
      this.styles = a.styles;
      this._resolvedAttachTo = null;
      Ua(this);
      this._setOptions(b);
      return this;
    }
    cancel() {
      this.tour.cancel();
      this.trigger("cancel");
    }
    complete() {
      this.tour.complete();
      this.trigger("complete");
    }
    destroy() {
      this.tooltip && (this.tooltip.destroy(), (this.tooltip = null));
      this.el instanceof HTMLElement &&
        this.el.parentNode &&
        (this.el.parentNode.removeChild(this.el), (this.el = null));
      this._updateStepTargetOnHide();
      this.trigger("destroy");
    }
    getTour() {
      return this.tour;
    }
    hide() {
      this.tour.modal.hide();
      this.trigger("before-hide");
      this.el && (this.el.hidden = !0);
      this._updateStepTargetOnHide();
      this.trigger("hide");
    }
    _resolveAttachToOptions() {
      let a = this.options.attachTo || {},
        b = Object.assign({}, a);
      Z(b.element) && (b.element = b.element.call(this));
      if (qa(b.element)) {
        try {
          b.element = document.querySelector(b.element);
        } catch (c) {}
        b.element ||
          console.error(
            `The element for this Shepherd step was not found ${a.element}`
          );
      }
      return (this._resolvedAttachTo = b);
    }
    _getResolvedAttachToOptions() {
      return null === this._resolvedAttachTo
        ? this._resolveAttachToOptions()
        : this._resolvedAttachTo;
    }
    isOpen() {
      return !(!this.el || this.el.hidden);
    }
    show() {
      if (Z(this.options.beforeShowPromise)) {
        let a = this.options.beforeShowPromise();
        if (void 0 !== a) return a.then(() => this._show());
      }
      this._show();
    }
    updateStepOptions(a) {
      Object.assign(this.options, a);
      this.shepherdElementComponent &&
        this.shepherdElementComponent.$set({ step: this });
    }
    getElement() {
      return this.el;
    }
    getTarget() {
      return this.target;
    }
    _createTooltipContent() {
      this.shepherdElementComponent = new Ac({
        target: this.tour.options.stepsContainer || document.body,
        props: {
          classPrefix: this.classPrefix,
          descriptionId: `${this.id}-description`,
          labelId: `${this.id}-label`,
          step: this,
          styles: this.styles,
        },
      });
      return this.shepherdElementComponent.getElement();
    }
    _scrollTo(a) {
      let { element: b } = this._getResolvedAttachToOptions();
      Z(this.options.scrollToHandler)
        ? this.options.scrollToHandler(b)
        : b instanceof Element &&
          "function" === typeof b.scrollIntoView &&
          b.scrollIntoView(a);
    }
    _getClassOptions(a) {
      var b =
        this.tour && this.tour.options && this.tour.options.defaultStepOptions;
      b = b && b.classes ? b.classes : "";
      a = [...(a.classes ? a.classes : "").split(" "), ...b.split(" ")];
      a = new Set(a);
      return Array.from(a).join(" ").trim();
    }
    _setOptions(a) {
      void 0 === a && (a = {});
      let b =
        this.tour && this.tour.options && this.tour.options.defaultStepOptions;
      b = yc({}, b || {});
      this.options = Object.assign({ arrow: !0 }, b, a);
      let { when: c } = this.options;
      this.options.classes = this._getClassOptions(a);
      this.destroy();
      this.id = this.options.id || `step-${Ma()}`;
      c &&
        Object.keys(c).forEach((d) => {
          this.on(d, c[d], this);
        });
    }
    _setupElements() {
      void 0 !== this.el && this.destroy();
      this.el = this._createTooltipContent();
      this.options.advanceOn && Hb(this);
      this.tooltip && this.tooltip.destroy();
      let a = this._getResolvedAttachToOptions(),
        b = a.element;
      var c = {
        modifiers: [
          { name: "preventOverflow", options: { altAxis: !0, tether: !1 } },
          ib(this),
        ],
        strategy: "absolute",
      };
      if (void 0 !== a && null !== a && a.element && a.on) c.placement = a.on;
      else {
        c = Vb();
        var d = { placement: "top", strategy: "fixed", modifiers: [ib(this)] };
        c = d = La({}, d, {
          modifiers: Array.from(new Set([...d.modifiers, ...c])),
        });
      }
      (d =
        this.tour &&
        this.tour.options &&
        this.tour.options.defaultStepOptions) && (c = kb(d, c));
      c = kb(this.options, c);
      (void 0 !== a && null !== a && a.element && a.on) ||
        ((b = document.body),
        this.shepherdElementComponent
          .getElement()
          .classList.add("shepherd-centered"));
      this.tooltip = zc(b, this.el, c);
      this.target = a.element;
    }
    _show() {
      this.trigger("before-show");
      this._resolveAttachToOptions();
      this._setupElements();
      this.tour.modal || this.tour._setupModal();
      this.tour.modal.setupForStep(this);
      this._styleTargetElementForStep(this);
      this.el.hidden = !1;
      this.options.scrollTo &&
        setTimeout(() => {
          this._scrollTo(this.options.scrollTo);
        });
      this.el.hidden = !1;
      let a = this.shepherdElementComponent.getElement(),
        b = this.target || document.body;
      b.classList.add(`${this.classPrefix}shepherd-enabled`);
      b.classList.add(`${this.classPrefix}shepherd-target`);
      a.classList.add("shepherd-enabled");
      this.trigger("show");
    }
    _styleTargetElementForStep(a) {
      let b = a.target;
      b &&
        (a.options.highlightClass && b.classList.add(a.options.highlightClass),
        b.classList.remove("shepherd-target-click-disabled"),
        !1 === a.options.canClickTarget &&
          b.classList.add("shepherd-target-click-disabled"));
    }
    _updateStepTargetOnHide() {
      let a = this.target || document.body;
      this.options.highlightClass &&
        a.classList.remove(this.options.highlightClass);
      a.classList.remove(
        "shepherd-target-click-disabled",
        `${this.classPrefix}shepherd-enabled`,
        `${this.classPrefix}shepherd-target`
      );
    }
  }
  class Bc extends T {
    constructor(a) {
      super();
      S(this, a, wc, vc, Q, {
        element: 0,
        openingProperties: 4,
        getElement: 5,
        closeModalOpening: 6,
        hide: 7,
        positionModal: 8,
        setupForStep: 9,
        show: 10,
      });
    }
    get getElement() {
      return this.$$.ctx[5];
    }
    get closeModalOpening() {
      return this.$$.ctx[6];
    }
    get hide() {
      return this.$$.ctx[7];
    }
    get positionModal() {
      return this.$$.ctx[8];
    }
    get setupForStep() {
      return this.$$.ctx[9];
    }
    get show() {
      return this.$$.ctx[10];
    }
  }
  let oa = new Qa();
  class Cc extends Qa {
    constructor(a) {
      void 0 === a && (a = {});
      super(a);
      Ua(this);
      this.options = Object.assign(
        {},
        { exitOnEsc: !0, keyboardNavigation: !0 },
        a
      );
      this.classPrefix = jb(this.options.classPrefix);
      this.steps = [];
      this.addSteps(this.options.steps);
      "active cancel complete inactive show start".split(" ").map((b) => {
        ((c) => {
          this.on(c, (d) => {
            d = d || {};
            d.tour = this;
            oa.trigger(c, d);
          });
        })(b);
      });
      this._setTourID();
      return this;
    }
    addStep(a, b) {
      a instanceof Ra ? (a.tour = this) : (a = new Ra(this, a));
      void 0 !== b ? this.steps.splice(b, 0, a) : this.steps.push(a);
      return a;
    }
    addSteps(a) {
      Array.isArray(a) &&
        a.forEach((b) => {
          this.addStep(b);
        });
      return this;
    }
    back() {
      let a = this.steps.indexOf(this.currentStep);
      this.show(a - 1, !1);
    }
    cancel() {
      this.options.confirmCancel
        ? window.confirm(
            this.options.confirmCancelMessage ||
              "Are you sure you want to stop the tour?"
          ) && this._done("cancel")
        : this._done("cancel");
    }
    complete() {
      this._done("complete");
    }
    getById(a) {
      return this.steps.find((b) => b.id === a);
    }
    getCurrentStep() {
      return this.currentStep;
    }
    hide() {
      let a = this.getCurrentStep();
      if (a) return a.hide();
    }
    isActive() {
      return oa.activeTour === this;
    }
    next() {
      let a = this.steps.indexOf(this.currentStep);
      a === this.steps.length - 1 ? this.complete() : this.show(a + 1, !0);
    }
    removeStep(a) {
      let b = this.getCurrentStep();
      this.steps.some((c, d) => {
        if (c.id === a)
          return (
            c.isOpen() && c.hide(), c.destroy(), this.steps.splice(d, 1), !0
          );
      });
      b &&
        b.id === a &&
        ((this.currentStep = void 0),
        this.steps.length ? this.show(0) : this.cancel());
    }
    show(a, b) {
      void 0 === a && (a = 0);
      void 0 === b && (b = !0);
      if ((a = qa(a) ? this.getById(a) : this.steps[a]))
        this._updateStateBeforeShow(),
          Z(a.options.showOn) && !a.options.showOn()
            ? this._skipStep(a, b)
            : (this.trigger("show", { step: a, previous: this.currentStep }),
              (this.currentStep = a),
              a.show());
    }
    start() {
      this.trigger("start");
      this.focusedElBeforeOpen = document.activeElement;
      this.currentStep = null;
      this._setupModal();
      this._setupActiveTour();
      this.next();
    }
    _done(a) {
      let b = this.steps.indexOf(this.currentStep);
      Array.isArray(this.steps) && this.steps.forEach((c) => c.destroy());
      uc(this);
      this.trigger(a, { index: b });
      oa.activeTour = null;
      this.trigger("inactive", { tour: this });
      this.modal && this.modal.hide();
      ("cancel" !== a && "complete" !== a) ||
        !this.modal ||
        ((a = document.querySelector(".shepherd-modal-overlay-container")) &&
          a.remove());
      this.focusedElBeforeOpen instanceof HTMLElement &&
        this.focusedElBeforeOpen.focus();
    }
    _setupActiveTour() {
      this.trigger("active", { tour: this });
      oa.activeTour = this;
    }
    _setupModal() {
      this.modal = new Bc({
        target: this.options.modalContainer || document.body,
        props: { classPrefix: this.classPrefix, styles: this.styles },
      });
    }
    _skipStep(a, b) {
      a = this.steps.indexOf(a);
      a === this.steps.length - 1
        ? this.complete()
        : this.show(b ? a + 1 : a - 1, b);
    }
    _updateStateBeforeShow() {
      this.currentStep && this.currentStep.hide();
      this.isActive() || this._setupActiveTour();
    }
    _setTourID() {
      this.id = `${this.options.tourName || "tour"}--${Ma()}`;
    }
  }
  Object.assign(oa, { Tour: Cc, Step: Ra });
  return oa;
});
//# sourceMappingURL=shepherd.min.js.map
