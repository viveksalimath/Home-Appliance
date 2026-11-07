import {
    S as w,
    i as p,
    s as v,
    e as m,
    E as d,
    a as h,
    b as k,
    c as I,
    d as r,
    F as V,
    x as _,
    k as b,
    p as q,
    t as c,
    f as y,
    h as l,
    j as F,
    n as S,
    q as j,
    r as E
} from "./svelte-BxdCAXSv.js";
import {
    a9 as g
} from "./LIVELY_SF_FEED.js";

function N(i) {
    let e, a = g(i[0]) + "",
        t, o, n, s;
    return {
        c() {
            e = m("div"), t = d(a), o = h(), n = m("br"), s = d(`
    Views`), k(e, "class", "viewsCountContainer svelte-18570fw")
        },
        m(f, u) {
            I(f, e, u), r(e, t), r(e, o), r(e, n), r(e, s)
        },
        p(f, [u]) {
            u & 1 && a !== (a = g(f[0]) + "") && V(t, a)
        },
        i: _,
        o: _,
        d(f) {
            f && b(e)
        }
    }
}

function x(i, e, a) {
    let {
        configInfo: t
    } = e, {
        data: o
    } = e;
    return i.$$set = n => {
        "configInfo" in n && a(1, t = n.configInfo), "data" in n && a(0, o = n.data)
    }, [o, t]
}
class z extends w {
    constructor(e) {
        super(), p(this, e, x, N, v, {
            configInfo: 1,
            data: 0
        })
    }
}

function C(i) {
    let e, a;
    return e = new z({
        props: {
            configInfo: i[0],
            data: i[1]
        }
    }), {
        c() {
            S(e.$$.fragment)
        },
        m(t, o) {
            j(e, t, o), a = !0
        },
        p(t, o) {
            const n = {};
            o & 1 && (n.configInfo = t[0]), o & 2 && (n.data = t[1]), e.$set(n)
        },
        i(t) {
            a || (c(e.$$.fragment, t), a = !0)
        },
        o(t) {
            l(e.$$.fragment, t), a = !1
        },
        d(t) {
            E(e, t)
        }
    }
}

function A(i) {
    var o;
    let e, a, t = ((o = i[0]) == null ? void 0 : o.display) && C(i);
    return {
        c() {
            t && t.c(), e = q()
        },
        m(n, s) {
            t && t.m(n, s), I(n, e, s), a = !0
        },
        p(n, [s]) {
            var f;
            (f = n[0]) != null && f.display ? t ? (t.p(n, s), s & 1 && c(t, 1)) : (t = C(n), t.c(), c(t, 1), t.m(e.parentNode, e)) : t && (y(), l(t, 1, 1, () => {
                t = null
            }), F())
        },
        i(n) {
            a || (c(t), a = !0)
        },
        o(n) {
            l(t), a = !1
        },
        d(n) {
            n && b(e), t && t.d(n)
        }
    }
}

function B(i, e, a) {
    let {
        viewsCountConfig: t
    } = e, {
        data: o
    } = e;
    return i.$$set = n => {
        "viewsCountConfig" in n && a(0, t = n.viewsCountConfig), "data" in n && a(1, o = n.data)
    }, [t, o]
}
class H extends w {
    constructor(e) {
        super(), p(this, e, B, A, v, {
            viewsCountConfig: 0,
            data: 1
        })
    }
}
export {
    H as V
};