import {
    S as x,
    i as I,
    s as X,
    p as Y,
    c as k,
    x as g,
    k as v,
    l as K,
    e as q,
    E as h,
    b as r,
    d,
    F as P,
    y as m,
    a as W,
    f as J,
    h as S,
    j as Q,
    t as O,
    n as Z,
    q as $,
    r as ee
} from "./svelte-BxdCAXSv.js";
import {
    T as te,
    a as R
} from "./styleUtilsV2-B2xaL2im.js";
import {
    a as se,
    U as ie,
    a9 as y
} from "./LIVELY_SF_FEED.js";
import "./uuid-CQkTLCs1.js";
import "./universal-cookie-Cmu-M0pA.js";

function le(o) {
    let t, s = y(o[1]) + "",
        i, e;
    return {
        c() {
            t = q("div"), i = h(s), e = h(" Views"), r(t, "class", "viewsContainer1 " + (o[4] == "26968f0e55" ? "brandSpecific" : "") + " svelte-19mhfsx"), r(t, "style", o[2])
        },
        m(l, n) {
            k(l, t, n), d(t, i), d(t, e)
        },
        p(l, n) {
            n & 2 && s !== (s = y(l[1]) + "") && P(i, s), n & 4 && r(t, "style", l[2])
        },
        d(l) {
            l && v(t)
        }
    }
}

function ne(o) {
    let t, s, i, e, l, n, u, a, _, f, b = y(o[1]) + "",
        w;
    return {
        c() {
            t = q("div"), s = m("svg"), i = m("g"), e = m("g"), l = m("g"), n = m("g"), u = m("g"), a = m("path"), _ = m("path"), f = W(), w = h(b), r(i, "id", "SVGRepo_bgCarrier"), r(i, "stroke-width", "0"), r(e, "id", "SVGRepo_tracerCarrier"), r(e, "stroke-linecap", "round"), r(e, "stroke-linejoin", "round"), r(a, "id", "XMLID_2003_"), r(a, "d", "M244.625,171.415c-40,0-72.4,32.4-72.4,72.4s32.4,72.4,72.4,72.4s72.4-32.4,72.4-72.4 C316.925,203.815,284.525,171.415,244.625,171.415z M244.625,220.215c-13,0-23.6,10.6-23.6,23.6c0,6-4.8,10.8-10.8,10.8 s-10.8-4.8-10.8-10.8c0-24.9,20.3-45.2,45.2-45.2c6,0,10.8,4.8,10.8,10.8C255.425,215.415,250.525,220.215,244.625,220.215z"), r(_, "id", "XMLID_2012_"), r(_, "d", "M481.325,227.515c-224.8-258.6-428-53.9-476.4,2.8c-6.5,7.6-6.6,18.8-0.1,26.4 c221.9,259,423.4,64.6,476.5,3.7C489.625,251.015,489.625,237.015,481.325,227.515z M244.625,346.615 c-56.8,0-102.8-46-102.8-102.8s46-102.8,102.8-102.8s102.8,46,102.8,102.8S301.325,346.615,244.625,346.615z"), r(u, "id", "XMLID_1992_"), r(l, "id", "SVGRepo_iconCarrier"), r(s, "class", "lively_sf_svg_icons"), r(s, "fill", "#000000"), r(s, "height", "20px"), r(s, "width", "20px"), r(s, "version", "1.1"), r(s, "id", "Capa_1"), r(s, "xmlns", "http://www.w3.org/2000/svg"), r(s, "xmlns:xlink", "http://www.w3.org/1999/xlink"), r(s, "viewBox", "0 0 487.55 487.55"), r(s, "xml:space", "preserve"), r(t, "class", "viewsContainer2 svelte-19mhfsx"), r(t, "style", o[2])
        },
        m(p, c) {
            k(p, t, c), d(t, s), d(s, i), d(s, e), d(s, l), d(l, n), d(n, u), d(u, a), d(u, _), d(t, f), d(t, w)
        },
        p(p, c) {
            c & 2 && b !== (b = y(p[1]) + "") && P(w, b), c & 4 && r(t, "style", p[2])
        },
        d(p) {
            p && v(t)
        }
    }
}

function oe(o) {
    let t;

    function s(l, n) {
        var u, a;
        if (((u = l[0]) == null ? void 0 : u.icon) === "2") return ne;
        if (((a = l[0]) == null ? void 0 : a.icon) === "1") return le
    }
    let i = s(o),
        e = i && i(o);
    return {
        c() {
            e && e.c(), t = Y()
        },
        m(l, n) {
            e && e.m(l, n), k(l, t, n)
        },
        p(l, [n]) {
            i === (i = s(l)) && e ? e.p(l, n) : (e && e.d(1), e = i && i(l), e && (e.c(), e.m(t.parentNode, t)))
        },
        i: g,
        o: g,
        d(l) {
            l && v(t), e && e.d(l)
        }
    }
}

function re(o, t, s) {
    var p;
    let i, {
            configInfo: e
        } = t,
        {
            data: l
        } = t,
        {
            pos: n
        } = t,
        u = se(n);
    K(o, u, c => s(8, i = c));
    let a, _, f;
    const b = i.brandId,
        w = {
            top: "10px",
            right: "10px",
            background: (p = e == null ? void 0 : e.style) == null ? void 0 : p.bg_color
        };
    return o.$$set = c => {
        "configInfo" in c && s(0, e = c.configInfo), "data" in c && s(1, l = c.data), "pos" in c && s(5, n = c.pos)
    }, o.$$.update = () => {
        var c, T, V, L, M, N, j, E, G, z, D, F;
        if (o.$$.dirty & 256 && s(6, a = ie(i == null ? void 0 : i.layoutKey)), o.$$.dirty & 449) {
            let U = function(A) {
                return Object.entries(A).map(([B, H]) => `${B}: ${H}`).join("; ")
            };
            s(7, _ = a === "3d_scroll" ? { ...te[(c = e == null ? void 0 : e.style) == null ? void 0 : c.placement],
                background: (T = e == null ? void 0 : e.style) == null ? void 0 : T.bg_color
            } : { ...R[(V = e == null ? void 0 : e.style) == null ? void 0 : V.placement],
                background: (L = e == null ? void 0 : e.style) == null ? void 0 : L.bg_color
            });
            let C = R[(M = e == null ? void 0 : e.style) == null ? void 0 : M.placement] ? _ : w;
            ((N = e == null ? void 0 : e.style) == null ? void 0 : N.placement) === "bottom-left" && ((G = (E = (j = i.uiConfigV2) == null ? void 0 : j.home_page) == null ? void 0 : E.product) == null ? void 0 : G.placement) == "embedded" && ((F = (D = (z = i.uiConfigV2) == null ? void 0 : z.home_page) == null ? void 0 : D.product) != null && F.display) && (C = { ...C,
                bottom: "27%"
            }), s(2, f = U(C))
        }
    }, [e, l, f, u, b, n, a, _, i]
}
class ae extends x {
    constructor(t) {
        super(), I(this, t, re, oe, X, {
            configInfo: 0,
            data: 1,
            pos: 5
        })
    }
}

function ce(o) {
    return {
        c: g,
        m: g,
        p: g,
        i: g,
        o: g,
        d: g
    }
}

function _e(o) {
    let t, s;
    return t = new ae({
        props: {
            configInfo: o[0],
            data: o[1],
            pos: o[2]
        }
    }), {
        c() {
            Z(t.$$.fragment)
        },
        m(i, e) {
            $(t, i, e), s = !0
        },
        p(i, e) {
            const l = {};
            e & 1 && (l.configInfo = i[0]), e & 2 && (l.data = i[1]), e & 4 && (l.pos = i[2]), t.$set(l)
        },
        i(i) {
            s || (O(t.$$.fragment, i), s = !0)
        },
        o(i) {
            S(t.$$.fragment, i), s = !1
        },
        d(i) {
            ee(t, i)
        }
    }
}

function ue(o) {
    let t, s, i, e;
    const l = [_e, ce],
        n = [];

    function u(a, _) {
        var f;
        return (f = a[0]) != null && f.display ? 0 : 1
    }
    return t = u(o), s = n[t] = l[t](o), {
        c() {
            s.c(), i = Y()
        },
        m(a, _) {
            n[t].m(a, _), k(a, i, _), e = !0
        },
        p(a, [_]) {
            let f = t;
            t = u(a), t === f ? n[t].p(a, _) : (J(), S(n[f], 1, 1, () => {
                n[f] = null
            }), Q(), s = n[t], s ? s.p(a, _) : (s = n[t] = l[t](a), s.c()), O(s, 1), s.m(i.parentNode, i))
        },
        i(a) {
            e || (O(s), e = !0)
        },
        o(a) {
            S(s), e = !1
        },
        d(a) {
            a && v(i), n[t].d(a)
        }
    }
}

function fe(o, t, s) {
    let {
        viewsConfig: i
    } = t, {
        views: e
    } = t, {
        pos: l
    } = t;
    return o.$$set = n => {
        "viewsConfig" in n && s(0, i = n.viewsConfig), "views" in n && s(1, e = n.views), "pos" in n && s(2, l = n.pos)
    }, [i, e, l]
}
class we extends x {
    constructor(t) {
        super(), I(this, t, fe, ue, X, {
            viewsConfig: 0,
            views: 1,
            pos: 2
        })
    }
}
export {
    we as
    default
};