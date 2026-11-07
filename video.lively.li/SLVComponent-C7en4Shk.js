import {
    S as E,
    i as F,
    s as G,
    p as H,
    c as I,
    f as C,
    h as w,
    j as b,
    t as m,
    k as q,
    l as T,
    e as J,
    a as N,
    b as M,
    v as V,
    d as W,
    n as L,
    q as A,
    r as v
} from "./svelte-BxdCAXSv.js";
import {
    a as U
} from "./LIVELY_SF_FEED.js";
import {
    L as O,
    N as Q
} from "./NewShareWidgetComponent-fvnd8yG8.js";
import {
    V as X
} from "./ViewsCountComponent-DEUf0-MH.js";
import "./uuid-CQkTLCs1.js";
import "./universal-cookie-Cmu-M0pA.js";

function Y(t) {
    var o, c, _, g;
    let a, l, e, n, i = t[8].type === "smv1" && j(t),
        f = ((c = (o = t[8]) == null ? void 0 : o.like) == null ? void 0 : c.display) && K(t),
        h = ((g = (_ = t[8]) == null ? void 0 : _.share) == null ? void 0 : g.display) && P(t);
    return {
        c() {
            a = J("div"), i && i.c(), l = N(), f && f.c(), e = N(), h && h.c(), M(a, "class", "shareAndRateStyle svelte-19bvg0q"), V(a, "background-color", t[11].brandId == "7a94329b88" ? "rgba(0, 0, 0, 0.5)" : "")
        },
        m(r, k) {
            I(r, a, k), i && i.m(a, null), W(a, l), f && f.m(a, null), W(a, e), h && h.m(a, null), n = !0
        },
        p(r, k) {
            var D, s, S, d;
            r[8].type === "smv1" ? i ? (i.p(r, k), k & 256 && m(i, 1)) : (i = j(r), i.c(), m(i, 1), i.m(a, l)) : i && (C(), w(i, 1, 1, () => {
                i = null
            }), b()), (s = (D = r[8]) == null ? void 0 : D.like) != null && s.display ? f ? (f.p(r, k), k & 256 && m(f, 1)) : (f = K(r), f.c(), m(f, 1), f.m(a, e)) : f && (C(), w(f, 1, 1, () => {
                f = null
            }), b()), (d = (S = r[8]) == null ? void 0 : S.share) != null && d.display ? h ? (h.p(r, k), k & 256 && m(h, 1)) : (h = P(r), h.c(), m(h, 1), h.m(a, null)) : h && (C(), w(h, 1, 1, () => {
                h = null
            }), b()), (!n || k & 2048) && V(a, "background-color", r[11].brandId == "7a94329b88" ? "rgba(0, 0, 0, 0.5)" : "")
        },
        i(r) {
            n || (m(i), m(f), m(h), n = !0)
        },
        o(r) {
            w(i), w(f), w(h), n = !1
        },
        d(r) {
            r && q(a), i && i.d(), f && f.d(), h && h.d()
        }
    }
}

function Z(t) {
    var f, h;
    let a, l, e, n = ((f = t[8]) == null ? void 0 : f.like) && R(t),
        i = ((h = t[8]) == null ? void 0 : h.share) && z(t);
    return {
        c() {
            var o, c, _, g, r, k;
            a = J("div"), n && n.c(), l = N(), i && i.c(), M(a, "class", "likeShareContainer svelte-19bvg0q"), V(a, "bottom", (_ = (c = (o = t[11].uiConfigV2) == null ? void 0 : o.home_page) == null ? void 0 : c.product) != null && _.display && ((k = (r = (g = t[11].uiConfigV2) == null ? void 0 : g.home_page) == null ? void 0 : r.product) == null ? void 0 : k.placement) == "embedded" ? "27%" : t[13]()), V(a, "right", "10px")
        },
        m(o, c) {
            I(o, a, c), n && n.m(a, null), W(a, l), i && i.m(a, null), e = !0
        },
        p(o, c) {
            var _, g, r, k, D, s, S, d;
            (_ = o[8]) != null && _.like ? n ? (n.p(o, c), c & 256 && m(n, 1)) : (n = R(o), n.c(), m(n, 1), n.m(a, l)) : n && (C(), w(n, 1, 1, () => {
                n = null
            }), b()), (g = o[8]) != null && g.share ? i ? (i.p(o, c), c & 256 && m(i, 1)) : (i = z(o), i.c(), m(i, 1), i.m(a, null)) : i && (C(), w(i, 1, 1, () => {
                i = null
            }), b()), (!e || c & 2048) && V(a, "bottom", (D = (k = (r = o[11].uiConfigV2) == null ? void 0 : r.home_page) == null ? void 0 : k.product) != null && D.display && ((d = (S = (s = o[11].uiConfigV2) == null ? void 0 : s.home_page) == null ? void 0 : S.product) == null ? void 0 : d.placement) == "embedded" ? "27%" : o[13]())
        },
        i(o) {
            e || (m(n), m(i), e = !0)
        },
        o(o) {
            w(n), w(i), e = !1
        },
        d(o) {
            o && q(a), n && n.d(), i && i.d()
        }
    }
}

function j(t) {
    let a, l;
    return a = new X({
        props: {
            data: t[9],
            viewsCountConfig: t[8].view
        }
    }), {
        c() {
            L(a.$$.fragment)
        },
        m(e, n) {
            A(a, e, n), l = !0
        },
        p(e, n) {
            const i = {};
            n & 512 && (i.data = e[9]), n & 256 && (i.viewsCountConfig = e[8].view), a.$set(i)
        },
        i(e) {
            l || (m(a.$$.fragment, e), l = !0)
        },
        o(e) {
            w(a.$$.fragment, e), l = !1
        },
        d(e) {
            v(a, e)
        }
    }
}

function K(t) {
    let a, l;
    return a = new O({
        props: {
            handleLikeClick: t[1],
            showActive: t[2],
            showLikesData: t[4],
            likesData: t[3],
            pos: t[10]
        }
    }), {
        c() {
            L(a.$$.fragment)
        },
        m(e, n) {
            A(a, e, n), l = !0
        },
        p(e, n) {
            const i = {};
            n & 2 && (i.handleLikeClick = e[1]), n & 4 && (i.showActive = e[2]), n & 16 && (i.showLikesData = e[4]), n & 8 && (i.likesData = e[3]), n & 1024 && (i.pos = e[10]), a.$set(i)
        },
        i(e) {
            l || (m(a.$$.fragment, e), l = !0)
        },
        o(e) {
            w(a.$$.fragment, e), l = !1
        },
        d(e) {
            v(a, e)
        }
    }
}

function P(t) {
    let a, l;
    return a = new Q({
        props: {
            handleShareClick: t[5],
            showShareData: t[7],
            sharesData: t[6],
            pos: t[10]
        }
    }), {
        c() {
            L(a.$$.fragment)
        },
        m(e, n) {
            A(a, e, n), l = !0
        },
        p(e, n) {
            const i = {};
            n & 32 && (i.handleShareClick = e[5]), n & 128 && (i.showShareData = e[7]), n & 64 && (i.sharesData = e[6]), n & 1024 && (i.pos = e[10]), a.$set(i)
        },
        i(e) {
            l || (m(a.$$.fragment, e), l = !0)
        },
        o(e) {
            w(a.$$.fragment, e), l = !1
        },
        d(e) {
            v(a, e)
        }
    }
}

function R(t) {
    let a, l;
    return a = new O({
        props: {
            handleLikeClick: t[1],
            showActive: t[2],
            showLikesData: t[4],
            likesData: t[3],
            pos: t[10]
        }
    }), {
        c() {
            L(a.$$.fragment)
        },
        m(e, n) {
            A(a, e, n), l = !0
        },
        p(e, n) {
            const i = {};
            n & 2 && (i.handleLikeClick = e[1]), n & 4 && (i.showActive = e[2]), n & 16 && (i.showLikesData = e[4]), n & 8 && (i.likesData = e[3]), n & 1024 && (i.pos = e[10]), a.$set(i)
        },
        i(e) {
            l || (m(a.$$.fragment, e), l = !0)
        },
        o(e) {
            w(a.$$.fragment, e), l = !1
        },
        d(e) {
            v(a, e)
        }
    }
}

function z(t) {
    let a, l;
    return a = new Q({
        props: {
            handleShareClick: t[5],
            showShareData: t[7],
            sharesData: t[6],
            pos: t[10]
        }
    }), {
        c() {
            L(a.$$.fragment)
        },
        m(e, n) {
            A(a, e, n), l = !0
        },
        p(e, n) {
            const i = {};
            n & 32 && (i.handleShareClick = e[5]), n & 128 && (i.showShareData = e[7]), n & 64 && (i.sharesData = e[6]), n & 1024 && (i.pos = e[10]), a.$set(i)
        },
        i(e) {
            l || (m(a.$$.fragment, e), l = !0)
        },
        o(e) {
            w(a.$$.fragment, e), l = !1
        },
        d(e) {
            v(a, e)
        }
    }
}

function y(t) {
    let a, l, e, n;
    const i = [Z, Y],
        f = [];

    function h(o, c) {
        return o[0] == "home" ? 0 : 1
    }
    return a = h(t), l = f[a] = i[a](t), {
        c() {
            l.c(), e = H()
        },
        m(o, c) {
            f[a].m(o, c), I(o, e, c), n = !0
        },
        p(o, [c]) {
            let _ = a;
            a = h(o), a === _ ? f[a].p(o, c) : (C(), w(f[_], 1, 1, () => {
                f[_] = null
            }), b(), l = f[a], l ? l.p(o, c) : (l = f[a] = i[a](o), l.c()), m(l, 1), l.m(e.parentNode, e))
        },
        i(o) {
            n || (m(l), n = !0)
        },
        o(o) {
            w(l), n = !1
        },
        d(o) {
            o && q(e), f[a].d(o)
        }
    }
}

function p(t, a, l) {
    let e, {
            placement: n = "home"
        } = a,
        {
            handleLikeClick: i = () => {}
        } = a,
        {
            showActive: f = !1
        } = a,
        {
            likeData: h
        } = a,
        {
            showLikeData: o = !0
        } = a,
        {
            handleShareClick: c = u => {}
        } = a,
        {
            sharesData: _ = 0
        } = a,
        {
            showShareData: g = !0
        } = a,
        {
            configInfo: r
        } = a,
        {
            data: k
        } = a,
        {
            pos: D
        } = a,
        {
            homeStyle: s = ""
        } = a;
    const S = U(D);
    T(t, S, u => l(11, e = u));
    const d = () => e.layoutKey == "01cdd5183d" ? null : "10px";
    return t.$$set = u => {
        "placement" in u && l(0, n = u.placement), "handleLikeClick" in u && l(1, i = u.handleLikeClick), "showActive" in u && l(2, f = u.showActive), "likeData" in u && l(3, h = u.likeData), "showLikeData" in u && l(4, o = u.showLikeData), "handleShareClick" in u && l(5, c = u.handleShareClick), "sharesData" in u && l(6, _ = u.sharesData), "showShareData" in u && l(7, g = u.showShareData), "configInfo" in u && l(8, r = u.configInfo), "data" in u && l(9, k = u.data), "pos" in u && l(10, D = u.pos), "homeStyle" in u && l(14, s = u.homeStyle)
    }, [n, i, f, h, o, c, _, g, r, k, D, e, S, d, s]
}
class x extends E {
    constructor(a) {
        super(), F(this, a, p, y, G, {
            placement: 0,
            handleLikeClick: 1,
            showActive: 2,
            likeData: 3,
            showLikeData: 4,
            handleShareClick: 5,
            sharesData: 6,
            showShareData: 7,
            configInfo: 8,
            data: 9,
            pos: 10,
            homeStyle: 14
        })
    }
}

function B(t) {
    let a, l;
    return a = new x({
        props: {
            placement: t[0],
            handleLikeClick: t[1],
            handleShareClick: t[5],
            showActive: t[2],
            likeData: t[3],
            sharesData: t[6],
            showLikeData: t[4],
            showShareData: t[7],
            configInfo: t[10],
            data: t[8],
            pos: t[9],
            homeStyle: t[11]
        }
    }), {
        c() {
            L(a.$$.fragment)
        },
        m(e, n) {
            A(a, e, n), l = !0
        },
        p(e, n) {
            const i = {};
            n & 1 && (i.placement = e[0]), n & 2 && (i.handleLikeClick = e[1]), n & 32 && (i.handleShareClick = e[5]), n & 4 && (i.showActive = e[2]), n & 8 && (i.likeData = e[3]), n & 64 && (i.sharesData = e[6]), n & 16 && (i.showLikeData = e[4]), n & 128 && (i.showShareData = e[7]), n & 1024 && (i.configInfo = e[10]), n & 256 && (i.data = e[8]), n & 512 && (i.pos = e[9]), n & 2048 && (i.homeStyle = e[11]), a.$set(i)
        },
        i(e) {
            l || (m(a.$$.fragment, e), l = !0)
        },
        o(e) {
            w(a.$$.fragment, e), l = !1
        },
        d(e) {
            v(a, e)
        }
    }
}

function $(t) {
    var n;
    let a, l, e = (((n = t[10]) == null ? void 0 : n.display) || t[0] == "home") && B(t);
    return {
        c() {
            e && e.c(), a = H()
        },
        m(i, f) {
            e && e.m(i, f), I(i, a, f), l = !0
        },
        p(i, [f]) {
            var h;
            (h = i[10]) != null && h.display || i[0] == "home" ? e ? (e.p(i, f), f & 1025 && m(e, 1)) : (e = B(i), e.c(), m(e, 1), e.m(a.parentNode, a)) : e && (C(), w(e, 1, 1, () => {
                e = null
            }), b())
        },
        i(i) {
            l || (m(e), l = !0)
        },
        o(i) {
            w(e), l = !1
        },
        d(i) {
            i && q(a), e && e.d(i)
        }
    }
}

function ee(t, a, l) {
    let {
        placement: e = "home"
    } = a, {
        handleLikeClick: n = () => {}
    } = a, {
        showActive: i = !1
    } = a, {
        likeData: f
    } = a, {
        showLikeData: h = !0
    } = a, {
        handleShareClick: o = s => {}
    } = a, {
        sharesData: c = 0
    } = a, {
        showShareData: _ = !0
    } = a, {
        data: g
    } = a, {
        pos: r
    } = a, {
        SLVConfig: k
    } = a, {
        homeStyle: D = ""
    } = a;
    return t.$$set = s => {
        "placement" in s && l(0, e = s.placement), "handleLikeClick" in s && l(1, n = s.handleLikeClick), "showActive" in s && l(2, i = s.showActive), "likeData" in s && l(3, f = s.likeData), "showLikeData" in s && l(4, h = s.showLikeData), "handleShareClick" in s && l(5, o = s.handleShareClick), "sharesData" in s && l(6, c = s.sharesData), "showShareData" in s && l(7, _ = s.showShareData), "data" in s && l(8, g = s.data), "pos" in s && l(9, r = s.pos), "SLVConfig" in s && l(10, k = s.SLVConfig), "homeStyle" in s && l(11, D = s.homeStyle)
    }, [e, n, i, f, h, o, c, _, g, r, k, D]
}
class oe extends E {
    constructor(a) {
        super(), F(this, a, ee, $, G, {
            placement: 0,
            handleLikeClick: 1,
            showActive: 2,
            likeData: 3,
            showLikeData: 4,
            handleShareClick: 5,
            sharesData: 6,
            showShareData: 7,
            data: 8,
            pos: 9,
            SLVConfig: 10,
            homeStyle: 11
        })
    }
}
export {
    oe as
    default
};