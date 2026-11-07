import {
    S as g,
    i as S,
    s as y,
    e as v,
    E as z,
    b as W,
    v as c,
    c as b,
    d as w,
    F as q,
    x as d,
    k,
    l as H,
    p as I,
    t as l,
    f as j,
    h as u,
    j as A,
    n as E,
    q as F,
    r as N
} from "./svelte-BxdCAXSv.js";
import {
    a as B
} from "./LIVELY_SF_FEED.js";
import "./uuid-CQkTLCs1.js";
import "./universal-cookie-Cmu-M0pA.js";

function D(a) {
    var n;
    let o, s = (((n = a[0]) == null ? void 0 : n.text) || "Watch & Shop") + "",
        e;
    return {
        c() {
            var t;
            o = v("p"), e = z(s), W(o, "class", "lively_sf_header " + (a[2] == "26968f0e55" ? "brandSpecific" : "") + " " + (a[2] == "7a94329b88" ? "kamaAyurvedaStyles" : "") + " svelte-1tvyrun"), c(o, "color", a[3].color), c(o, "font-weight", a[3].fontWeight), c(o, "font-size", (t = a[3]) == null ? void 0 : t.fontSize)
        },
        m(t, r) {
            b(t, o, r), w(o, e)
        },
        p(t, [r]) {
            var i;
            r & 1 && s !== (s = (((i = t[0]) == null ? void 0 : i.text) || "Watch & Shop") + "") && q(e, s)
        },
        i: d,
        o: d,
        d(t) {
            t && k(o)
        }
    }
}

function G(a, o, s) {
    var p, m, _;
    let e, {
            configInfo: n
        } = o,
        {
            pos: t
        } = o;
    const r = B(t);
    H(a, r, f => s(5, e = f));
    let i = e.brandId;
    const C = {
        color: (p = n == null ? void 0 : n.style) == null ? void 0 : p.font_color,
        fontWeight: (m = n == null ? void 0 : n.style) == null ? void 0 : m.font_weight,
        fontSize: (_ = n == null ? void 0 : n.style) == null ? void 0 : _.font_size
    };
    return a.$$set = f => {
        "configInfo" in f && s(0, n = f.configInfo), "pos" in f && s(4, t = f.pos)
    }, [n, r, i, C, t]
}
class J extends g {
    constructor(o) {
        super(), S(this, o, G, D, y, {
            configInfo: 0,
            pos: 4
        })
    }
}

function h(a) {
    let o, s;
    return o = new J({
        props: {
            configInfo: a[0],
            pos: a[1]
        }
    }), {
        c() {
            E(o.$$.fragment)
        },
        m(e, n) {
            F(o, e, n), s = !0
        },
        p(e, n) {
            const t = {};
            n & 1 && (t.configInfo = e[0]), n & 2 && (t.pos = e[1]), o.$set(t)
        },
        i(e) {
            s || (l(o.$$.fragment, e), s = !0)
        },
        o(e) {
            u(o.$$.fragment, e), s = !1
        },
        d(e) {
            N(o, e)
        }
    }
}

function K(a) {
    var n;
    let o, s, e = ((n = a[0]) == null ? void 0 : n.display) && h(a);
    return {
        c() {
            e && e.c(), o = I()
        },
        m(t, r) {
            e && e.m(t, r), b(t, o, r), s = !0
        },
        p(t, [r]) {
            var i;
            (i = t[0]) != null && i.display ? e ? (e.p(t, r), r & 1 && l(e, 1)) : (e = h(t), e.c(), l(e, 1), e.m(o.parentNode, o)) : e && (j(), u(e, 1, 1, () => {
                e = null
            }), A())
        },
        i(t) {
            s || (l(e), s = !0)
        },
        o(t) {
            u(e), s = !1
        },
        d(t) {
            t && k(o), e && e.d(t)
        }
    }
}

function L(a, o, s) {
    let {
        headerConfig: e
    } = o, {
        pos: n
    } = o;
    return a.$$set = t => {
        "headerConfig" in t && s(0, e = t.headerConfig), "pos" in t && s(1, n = t.pos)
    }, [e, n]
}
class R extends g {
    constructor(o) {
        super(), S(this, o, L, K, y, {
            headerConfig: 0,
            pos: 1
        })
    }
}
export {
    R as
    default
};