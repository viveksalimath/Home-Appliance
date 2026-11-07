var bt = Object.defineProperty;
var wt = (t, e, n) => e in t ? bt(t, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : t[e] = n;
var S = (t, e, n) => (wt(t, typeof e != "symbol" ? e + "" : e, n), n);

function $() {}
const X = t => t;

function xt(t) {
    return !!t && (typeof t == "object" || typeof t == "function") && typeof t.then == "function"
}

function ot(t) {
    return t()
}

function nt() {
    return Object.create(null)
}

function T(t) {
    t.forEach(ot)
}

function F(t) {
    return typeof t == "function"
}

function vt(t, e) {
    return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function"
}
let U;

function Ht(t, e) {
    return t === e ? !0 : (U || (U = document.createElement("a")), U.href = e, t === U.href)
}

function Et(t) {
    return Object.keys(t).length === 0
}

function ct(t, ...e) {
    if (t == null) {
        for (const s of e) s(void 0);
        return $
    }
    const n = t.subscribe(...e);
    return n.unsubscribe ? () => n.unsubscribe() : n
}

function Gt(t) {
    let e;
    return ct(t, n => e = n)(), e
}

function Jt(t, e, n) {
    t.$$.on_destroy.push(ct(e, n))
}

function Kt(t) {
    return t ? ? ""
}

function Qt(t) {
    return t && F(t.destroy) ? t.destroy : $
}

function st(t) {
    const e = typeof t == "string" && t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
    return e ? [parseFloat(e[1]), e[2] || "px"] : [t, "px"]
}
const ut = typeof window < "u";
let at = ut ? () => window.performance.now() : () => Date.now(),
    Y = ut ? t => requestAnimationFrame(t) : $;
const L = new Set;

function lt(t) {
    L.forEach(e => {
        e.c(t) || (L.delete(e), e.f())
    }), L.size !== 0 && Y(lt)
}

function ft(t) {
    let e;
    return L.size === 0 && Y(lt), {
        promise: new Promise(n => {
            L.add(e = {
                c: t,
                f: n
            })
        }),
        abort() {
            L.delete(e)
        }
    }
}
const Wt = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : global;

function kt(t, e) {
    t.appendChild(e)
}

function dt(t) {
    if (!t) return document;
    const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
    return e && e.host ? e : t.ownerDocument
}

function Nt(t) {
    const e = ht("style");
    return e.textContent = "/* empty */", St(dt(t), e), e.sheet
}

function St(t, e) {
    return kt(t.head || t, e), e.sheet
}

function Ct(t, e, n) {
    t.insertBefore(e, n || null)
}

function Z(t) {
    t.parentNode && t.parentNode.removeChild(t)
}

function Xt(t, e) {
    for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e)
}

function ht(t) {
    return document.createElement(t)
}

function Tt(t) {
    return document.createElementNS("http://www.w3.org/2000/svg", t)
}

function _t(t) {
    return document.createTextNode(t)
}

function Yt() {
    return _t(" ")
}

function Zt() {
    return _t("")
}

function te(t, e, n, s) {
    return t.addEventListener(e, n, s), () => t.removeEventListener(e, n, s)
}

function ee(t) {
    return function(e) {
        return e.stopPropagation(), t.call(this, e)
    }
}

function ne(t, e, n) {
    n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n)
}

function At(t) {
    return Array.from(t.childNodes)
}

function se(t, e) {
    e = "" + e, t.data !== e && (t.data = e)
}

function ie(t, e) {
    t.value = e ? ? ""
}

function re(t, e, n, s) {
    n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, "")
}

function oe(t, e, n) {
    for (let s = 0; s < t.options.length; s += 1) {
        const c = t.options[s];
        if (c.__value === e) {
            c.selected = !0;
            return
        }
    }(!n || e !== void 0) && (t.selectedIndex = -1)
}

function ce(t) {
    const e = t.querySelector(":checked");
    return e && e.__value
}

function ue(t, e, n) {
    t.classList.toggle(e, !!n)
}

function Mt(t, e, {
    bubbles: n = !1,
    cancelable: s = !1
} = {}) {
    return new CustomEvent(t, {
        detail: e,
        bubbles: n,
        cancelable: s
    })
}
class ae {
    constructor(e = !1) {
        S(this, "is_svg", !1);
        S(this, "e");
        S(this, "n");
        S(this, "t");
        S(this, "a");
        this.is_svg = e, this.e = this.n = null
    }
    c(e) {
        this.h(e)
    }
    m(e, n, s = null) {
        this.e || (this.is_svg ? this.e = Tt(n.nodeName) : this.e = ht(n.nodeType === 11 ? "TEMPLATE" : n.nodeName), this.t = n.tagName !== "TEMPLATE" ? n : n.content, this.c(e)), this.i(s)
    }
    h(e) {
        this.e.innerHTML = e, this.n = Array.from(this.e.nodeName === "TEMPLATE" ? this.e.content.childNodes : this.e.childNodes)
    }
    i(e) {
        for (let n = 0; n < this.n.length; n += 1) Ct(this.t, this.n[n], e)
    }
    p(e) {
        this.d(), this.h(e), this.i(this.a)
    }
    d() {
        this.n.forEach(Z)
    }
}

function le(t, e) {
    return new t(e)
}
const B = new Map;
let H = 0;

function Pt(t) {
    let e = 5381,
        n = t.length;
    for (; n--;) e = (e << 5) - e ^ t.charCodeAt(n);
    return e >>> 0
}

function Lt(t, e) {
    const n = {
        stylesheet: Nt(e),
        rules: {}
    };
    return B.set(t, n), n
}

function K(t, e, n, s, c, o, u, r = 0) {
    const l = 16.666 / s;
    let i = `{
`;
    for (let m = 0; m <= 1; m += l) {
        const y = e + (n - e) * o(m);
        i += m * 100 + `%{${u(y,1-y)}}
`
    }
    const h = i + `100% {${u(n,1-n)}}
}`,
        f = `__svelte_${Pt(h)}_${r}`,
        d = dt(t),
        {
            stylesheet: _,
            rules: a
        } = B.get(d) || Lt(d, t);
    a[f] || (a[f] = !0, _.insertRule(`@keyframes ${f} ${h}`, _.cssRules.length));
    const p = t.style.animation || "";
    return t.style.animation = `${p?`${p}, `:""}${f} ${s}ms linear ${c}ms 1 both`, H += 1, f
}

function Q(t, e) {
    const n = (t.style.animation || "").split(", "),
        s = n.filter(e ? o => o.indexOf(e) < 0 : o => o.indexOf("__svelte") === -1),
        c = n.length - s.length;
    c && (t.style.animation = s.join(", "), H -= c, H || Ot())
}

function Ot() {
    Y(() => {
        H || (B.forEach(t => {
            const {
                ownerNode: e
            } = t.stylesheet;
            e && Z(e)
        }), B.clear())
    })
}
let R;

function k(t) {
    R = t
}

function G() {
    if (!R) throw new Error("Function called outside component initialization");
    return R
}

function fe(t) {
    G().$$.on_mount.push(t)
}

function de(t) {
    G().$$.on_destroy.push(t)
}

function he(t) {
    return G().$$.context.get(t)
}

function _e(t, e) {
    const n = t.$$.callbacks[e.type];
    n && n.slice().forEach(s => s.call(this, e))
}
const P = [],
    it = [];
let O = [];
const rt = [],
    pt = Promise.resolve();
let W = !1;

function mt() {
    W || (W = !0, pt.then(tt))
}

function pe() {
    return mt(), pt
}

function D(t) {
    O.push(t)
}
const J = new Set;
let A = 0;

function tt() {
    if (A !== 0) return;
    const t = R;
    do {
        try {
            for (; A < P.length;) {
                const e = P[A];
                A++, k(e), jt(e.$$)
            }
        } catch (e) {
            throw P.length = 0, A = 0, e
        }
        for (k(null), P.length = 0, A = 0; it.length;) it.pop()();
        for (let e = 0; e < O.length; e += 1) {
            const n = O[e];
            J.has(n) || (J.add(n), n())
        }
        O.length = 0
    } while (P.length);
    for (; rt.length;) rt.pop()();
    W = !1, J.clear(), k(t)
}

function jt(t) {
    if (t.fragment !== null) {
        t.update(), T(t.before_update);
        const e = t.dirty;
        t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(D)
    }
}

function qt(t) {
    const e = [],
        n = [];
    O.forEach(s => t.indexOf(s) === -1 ? e.push(s) : n.push(s)), n.forEach(s => s()), O = e
}
let q;

function gt() {
    return q || (q = Promise.resolve(), q.then(() => {
        q = null
    })), q
}

function z(t, e, n) {
    t.dispatchEvent(Mt(`${e?"intro":"outro"}${n}`))
}
const V = new Set;
let N;

function zt() {
    N = {
        r: 0,
        c: [],
        p: N
    }
}

function Rt() {
    N.r || T(N.c), N = N.p
}

function et(t, e) {
    t && t.i && (V.delete(t), t.i(e))
}

function Dt(t, e, n, s) {
    if (t && t.o) {
        if (V.has(t)) return;
        V.add(t), N.c.push(() => {
            V.delete(t), s && (n && t.d(1), s())
        }), t.o(e)
    } else s && s()
}
const yt = {
    duration: 0
};

function me(t, e, n) {
    const s = {
        direction: "in"
    };
    let c = e(t, n, s),
        o = !1,
        u, r, l = 0;

    function i() {
        u && Q(t, u)
    }

    function h() {
        const {
            delay: d = 0,
            duration: _ = 300,
            easing: a = X,
            tick: p = $,
            css: m
        } = c || yt;
        m && (u = K(t, 0, 1, _, d, a, m, l++)), p(0, 1);
        const y = at() + d,
            v = y + _;
        r && r.abort(), o = !0, D(() => z(t, !0, "start")), r = ft(b => {
            if (o) {
                if (b >= v) return p(1, 0), z(t, !0, "end"), i(), o = !1;
                if (b >= y) {
                    const E = a((b - y) / _);
                    p(E, 1 - E)
                }
            }
            return o
        })
    }
    let f = !1;
    return {
        start() {
            f || (f = !0, Q(t), F(c) ? (c = c(s), gt().then(h)) : h())
        },
        invalidate() {
            f = !1
        },
        end() {
            o && (i(), o = !1)
        }
    }
}

function ge(t, e, n, s) {
    let o = e(t, n, {
            direction: "both"
        }),
        u = s ? 0 : 1,
        r = null,
        l = null,
        i = null,
        h;

    function f() {
        i && Q(t, i)
    }

    function d(a, p) {
        const m = a.b - u;
        return p *= Math.abs(m), {
            a: u,
            b: a.b,
            d: m,
            duration: p,
            start: a.start,
            end: a.start + p,
            group: a.group
        }
    }

    function _(a) {
        const {
            delay: p = 0,
            duration: m = 300,
            easing: y = X,
            tick: v = $,
            css: b
        } = o || yt, E = {
            start: at() + p,
            b: a
        };
        a || (E.group = N, N.r += 1), "inert" in t && (a ? h !== void 0 && (t.inert = h) : (h = t.inert, t.inert = !0)), r || l ? l = E : (b && (f(), i = K(t, u, a, m, p, y, b)), a && v(0, 1), r = d(E, m), D(() => z(t, a, "start")), ft(C => {
            if (l && C > l.start && (r = d(l, m), l = null, z(t, r.b, "start"), b && (f(), i = K(t, u, r.b, r.duration, 0, y, o.css))), r) {
                if (C >= r.end) v(u = r.b, 1 - u), z(t, r.b, "end"), l || (r.b ? f() : --r.group.r || T(r.group.c)), r = null;
                else if (C >= r.start) {
                    const j = C - r.start;
                    u = r.a + r.d * y(j / r.duration), v(u, 1 - u)
                }
            }
            return !!(r || l)
        }))
    }
    return {
        run(a) {
            F(o) ? gt().then(() => {
                o = o({
                    direction: a ? "in" : "out"
                }), _(a)
            }) : _(a)
        },
        end() {
            f(), r = l = null
        }
    }
}

function ye(t, e) {
    const n = e.token = {};

    function s(c, o, u, r) {
        if (e.token !== n) return;
        e.resolved = r;
        let l = e.ctx;
        u !== void 0 && (l = l.slice(), l[u] = r);
        const i = c && (e.current = c)(l);
        let h = !1;
        e.block && (e.blocks ? e.blocks.forEach((f, d) => {
            d !== o && f && (zt(), Dt(f, 1, 1, () => {
                e.blocks[d] === f && (e.blocks[d] = null)
            }), Rt())
        }) : e.block.d(1), i.c(), et(i, 1), i.m(e.mount(), e.anchor), h = !0), e.block = i, e.blocks && (e.blocks[o] = i), h && tt()
    }
    if (xt(t)) {
        const c = G();
        if (t.then(o => {
                k(c), s(e.then, 1, e.value, o), k(null)
            }, o => {
                if (k(c), s(e.catch, 2, e.error, o), k(null), !e.hasCatch) throw o
            }), e.current !== e.pending) return s(e.pending, 0), !0
    } else {
        if (e.current !== e.then) return s(e.then, 1, e.value, t), !0;
        e.resolved = t
    }
}

function $e(t, e, n) {
    const s = e.slice(),
        {
            resolved: c
        } = t;
    t.current === t.then && (s[t.value] = c), t.current === t.catch && (s[t.error] = c), t.block.p(s, n)
}

function be(t) {
    return (t == null ? void 0 : t.length) !== void 0 ? t : Array.from(t)
}

function we(t, e) {
    t.d(1), e.delete(t.key)
}

function xe(t, e, n, s, c, o, u, r, l, i, h, f) {
    let d = t.length,
        _ = o.length,
        a = d;
    const p = {};
    for (; a--;) p[t[a].key] = a;
    const m = [],
        y = new Map,
        v = new Map,
        b = [];
    for (a = _; a--;) {
        const g = f(c, o, a),
            w = n(g);
        let x = u.get(w);
        x ? b.push(() => x.p(g, e)) : (x = i(w, g), x.c()), y.set(w, m[a] = x), w in p && v.set(w, Math.abs(a - p[w]))
    }
    const E = new Set,
        C = new Set;

    function j(g) {
        et(g, 1), g.m(r, h), u.set(g.key, g), h = g.first, _--
    }
    for (; d && _;) {
        const g = m[_ - 1],
            w = t[d - 1],
            x = g.key,
            I = w.key;
        g === w ? (h = g.first, d--, _--) : y.has(I) ? !u.has(x) || E.has(x) ? j(g) : C.has(I) ? d-- : v.get(x) > v.get(I) ? (C.add(x), j(g)) : (E.add(I), d--) : (l(w, u), d--)
    }
    for (; d--;) {
        const g = t[d];
        y.has(g.key) || l(g, u)
    }
    for (; _;) j(m[_ - 1]);
    return T(b), m
}

function ve(t) {
    t && t.c()
}

function Ft(t, e, n) {
    const {
        fragment: s,
        after_update: c
    } = t.$$;
    s && s.m(e, n), D(() => {
        const o = t.$$.on_mount.map(ot).filter(F);
        t.$$.on_destroy ? t.$$.on_destroy.push(...o) : T(o), t.$$.on_mount = []
    }), c.forEach(D)
}

function It(t, e) {
    const n = t.$$;
    n.fragment !== null && (qt(n.after_update), T(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = [])
}

function Ut(t, e) {
    t.$$.dirty[0] === -1 && (P.push(t), mt(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31
}

function Ee(t, e, n, s, c, o, u = null, r = [-1]) {
    const l = R;
    k(t);
    const i = t.$$ = {
        fragment: null,
        ctx: [],
        props: o,
        update: $,
        not_equal: c,
        bound: nt(),
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(e.context || (l ? l.$$.context : [])),
        callbacks: nt(),
        dirty: r,
        skip_bound: !1,
        root: e.target || l.$$.root
    };
    u && u(i.root);
    let h = !1;
    if (i.ctx = n ? n(t, e.props || {}, (f, d, ..._) => {
            const a = _.length ? _[0] : d;
            return i.ctx && c(i.ctx[f], i.ctx[f] = a) && (!i.skip_bound && i.bound[f] && i.bound[f](a), h && Ut(t, f)), d
        }) : [], i.update(), h = !0, T(i.before_update), i.fragment = s ? s(i.ctx) : !1, e.target) {
        if (e.hydrate) {
            const f = At(e.target);
            i.fragment && i.fragment.l(f), f.forEach(Z)
        } else i.fragment && i.fragment.c();
        e.intro && et(t.$$.fragment), Ft(t, e.target, e.anchor), tt()
    }
    k(l)
}
class ke {
    constructor() {
        S(this, "$$");
        S(this, "$$set")
    }
    $destroy() {
        It(this, 1), this.$destroy = $
    }
    $on(e, n) {
        if (!F(n)) return $;
        const s = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
        return s.push(n), () => {
            const c = s.indexOf(n);
            c !== -1 && s.splice(c, 1)
        }
    }
    $set(e) {
        this.$$set && !Et(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1)
    }
}
const Vt = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = {
    v: new Set
})).v.add(Vt);
const M = [];

function Ne(t, e = $) {
    let n;
    const s = new Set;

    function c(r) {
        if (vt(t, r) && (t = r, n)) {
            const l = !M.length;
            for (const i of s) i[1](), M.push(i, t);
            if (l) {
                for (let i = 0; i < M.length; i += 2) M[i][0](M[i + 1]);
                M.length = 0
            }
        }
    }

    function o(r) {
        c(r(t))
    }

    function u(r, l = $) {
        const i = [r, l];
        return s.add(i), s.size === 1 && (n = e(c, o) || $), r(t), () => {
            s.delete(i), s.size === 0 && n && (n(), n = null)
        }
    }
    return {
        set: c,
        update: o,
        subscribe: u
    }
}

function $t(t) {
    const e = t - 1;
    return e * e * e + 1
}

function Se(t, {
    delay: e = 0,
    duration: n = 400,
    easing: s = X
} = {}) {
    const c = +getComputedStyle(t).opacity;
    return {
        delay: e,
        duration: n,
        easing: s,
        css: o => `opacity: ${o*c}`
    }
}

function Ce(t, {
    delay: e = 0,
    duration: n = 400,
    easing: s = $t,
    x: c = 0,
    y: o = 0,
    opacity: u = 0
} = {}) {
    const r = getComputedStyle(t),
        l = +r.opacity,
        i = r.transform === "none" ? "" : r.transform,
        h = l * (1 - u),
        [f, d] = st(c),
        [_, a] = st(o);
    return {
        delay: e,
        duration: n,
        easing: s,
        css: (p, m) => `
			transform: ${i} translate(${(1-p)*f}${d}, ${(1-p)*_}${a});
			opacity: ${l-h*m}`
    }
}

function Te(t, {
    delay: e = 0,
    duration: n = 400,
    easing: s = $t,
    start: c = 0,
    opacity: o = 0
} = {}) {
    const u = getComputedStyle(t),
        r = +u.opacity,
        l = u.transform === "none" ? "" : u.transform,
        i = 1 - c,
        h = r * (1 - o);
    return {
        delay: e,
        duration: n,
        easing: s,
        css: (f, d) => `
			transform: ${l} scale(${1-i*d});
			opacity: ${r-h*d}
		`
    }
}
export {
    we as $, de as A, Qt as B, be as C, Xt as D, _t as E, se as F, D as G, ge as H, T as I, Se as J, Ht as K, ue as L, Kt as M, F as N, Wt as O, me as P, pe as Q, Te as R, ke as S, ae as T, he as U, ee as V, _e as W, ye as X, $e as Y, Ce as Z, xe as _, Yt as a, ie as a0, ce as a1, oe as a2, ne as b, Ct as c, kt as d, ht as e, zt as f, Gt as g, Dt as h, Ee as i, Rt as j, Z as k, Jt as l, le as m, ve as n, fe as o, Zt as p, Ft as q, It as r, vt as s, et as t, it as u, re as v, Ne as w, $ as x, Tt as y, te as z
};