const __vite__fileDeps = ["./NonShopifyProductConainerTheme1-Do3O_XRI.js", "./svelte-BxdCAXSv.js", "./LIVELY_SF_FEED.js", "./uuid-CQkTLCs1.js", "./universal-cookie-Cmu-M0pA.js", "./HomeFeedButtonComponent-BNwXrJh-.js", "./CustomizationApp-BSEDS49n.js", "./ProductDescriptionComponent-DgDN7wwE.js", "./ProductImageComponent-B6aLB8-a.js", "./styleUtilsV2-B2xaL2im.js", "./ProductNameComponent-Duyy1rYa.js", "./ProductOfferComponent-CzYWoTy3.js", "./ProductOriginalPriceComponent-BKGkik5t.js", "./ui-helper-lI4utISK.js", "./ProductPriceComponent-BNQy0Cyo.js", "./NonShopifyProductConainerTheme2-lCvMufeF.js", "./ShopifyProductContainerTheme1V2-BO8Qzi8u.js", "./lively_atc_drawer-BXvaMRkc.js", "./ShopifyProductContainerTheme4-DmsWGrw6.js", "./ShopifyHomePageNameCard-DXfQKyqY.js", "./CategoryDetails-DwtjYq71.js", "./DiscountChipComponent-tVrxd27-.js", "./CreatedTimeTagComponent-CE2vgwzj.js"],
    __vite__mapDeps = i => i.map(i => __vite__fileDeps[i]);
import {
    y as U,
    g as Pe,
    a as Fi,
    z as Oi,
    _ as Ce,
    A as Ti,
    B as yi
} from "./LIVELY_SF_FEED.js";
import {
    S as Pi,
    i as Ai,
    s as Di,
    e as G,
    a as X,
    n as I,
    b as E,
    v as H,
    c as S,
    d as M,
    q as L,
    z as be,
    t as m,
    f as O,
    h as d,
    j as T,
    k as F,
    r as N,
    I as Ze,
    l as Ei,
    m as P,
    p as z,
    C as Ue,
    B as Ii,
    N as Li,
    D as Ni,
    y as mi,
    x as Wi
} from "./svelte-BxdCAXSv.js";
import {
    g as ve
} from "./ui-helper-lI4utISK.js";
import {
    V as zi
} from "./VideoCard-hfgnU7wU.js";
import Bi from "./ViewsComponent-WD7-8ceM.js";
import {
    e as Si
} from "./embla-carousel-svelte-CkkBWhVQ.js";
import Ri from "./SLVComponent-C7en4Shk.js";
import "./uuid-CQkTLCs1.js";
import "./universal-cookie-Cmu-M0pA.js";
import "./CustomizationApp-BSEDS49n.js";
import "./styleUtilsV2-B2xaL2im.js";
import "./embla-carousel-reactive-utils-DkegjUUZ.js";
import "./embla-carousel-CvuiBM5S.js";
import "./NewShareWidgetComponent-fvnd8yG8.js";
import "./ViewsCountComponent-DEUf0-MH.js";

function ci(s, e, n) {
    const f = s.slice();
    return f[49] = e[n], f[51] = n, f
}

function di(s, e, n) {
    const f = s.slice();
    return f[4] = e[n], f
}

function hi(s) {
    let e, n, f;
    var t = s[20];

    function a(i, l) {
        var o, r;
        return {
            props: {
                discountChipConfig: (r = (o = i[7]) == null ? void 0 : o.uiConfigV2) == null ? void 0 : r.home_page.discount,
                data: i[8],
                pos: i[3]
            }
        }
    }
    return t && (e = P(t, a(s))), {
        c() {
            e && I(e.$$.fragment), n = z()
        },
        m(i, l) {
            e && L(e, i, l), S(i, n, l), f = !0
        },
        p(i, l) {
            var o, r;
            if (l[0] & 1048576 && t !== (t = i[20])) {
                if (e) {
                    O();
                    const _ = e;
                    d(_.$$.fragment, 1, 0, () => {
                        N(_, 1)
                    }), T()
                }
                t ? (e = P(t, a(i)), I(e.$$.fragment), m(e.$$.fragment, 1), L(e, n.parentNode, n)) : e = null
            } else if (t) {
                const _ = {};
                l[0] & 128 && (_.discountChipConfig = (r = (o = i[7]) == null ? void 0 : o.uiConfigV2) == null ? void 0 : r.home_page.discount), l[0] & 256 && (_.data = i[8]), l[0] & 8 && (_.pos = i[3]), e.$set(_)
            }
        },
        i(i) {
            f || (e && m(e.$$.fragment, i), f = !0)
        },
        o(i) {
            e && d(e.$$.fragment, i), f = !1
        },
        d(i) {
            i && F(n), e && N(e, i)
        }
    }
}

function gi(s) {
    let e, n, f;
    var t = s[21];

    function a(i, l) {
        var o;
        return {
            props: {
                pos: i[3],
                data: (o = i[4]) == null ? void 0 : o.createdAt
            }
        }
    }
    return t && (e = P(t, a(s))), {
        c() {
            e && I(e.$$.fragment), n = z()
        },
        m(i, l) {
            e && L(e, i, l), S(i, n, l), f = !0
        },
        p(i, l) {
            var o;
            if (l[0] & 2097152 && t !== (t = i[21])) {
                if (e) {
                    O();
                    const r = e;
                    d(r.$$.fragment, 1, 0, () => {
                        N(r, 1)
                    }), T()
                }
                t ? (e = P(t, a(i)), I(e.$$.fragment), m(e.$$.fragment, 1), L(e, n.parentNode, n)) : e = null
            } else if (t) {
                const r = {};
                l[0] & 8 && (r.pos = i[3]), l[0] & 16 && (r.data = (o = i[4]) == null ? void 0 : o.createdAt), e.$set(r)
            }
        },
        i(i) {
            f || (e && m(e.$$.fragment, i), f = !0)
        },
        o(i) {
            e && d(e.$$.fragment, i), f = !1
        },
        d(i) {
            i && F(n), e && N(e, i)
        }
    }
}

function Hi(s) {
    var o, r, _, g, k, V, A, v, c, h, y;
    let e, n, f, t, a = s[24] === U.NON_SF_FLOW && ((r = (o = s[4]) == null ? void 0 : o.product_info) == null ? void 0 : r.length) > 0 && Ci(s),
        i = s[24] === U.SF_FLOW && ((_ = s[7].uiConfigV2) == null ? void 0 : _.home_page.product.display) && ((k = (g = s[4]) == null ? void 0 : g.product_info) == null ? void 0 : k.length) > 0 && ki(s),
        l = ((v = (A = (V = s[7].uiConfigV2) == null ? void 0 : V.home_page) == null ? void 0 : A.name_card) == null ? void 0 : v.display) && !((y = (h = (c = s[7].uiConfigV2) == null ? void 0 : c.home_page) == null ? void 0 : h.product) != null && y.display) && s[24] !== U.NON_SF_FLOW && s[18] && Vi(s);
    return {
        c() {
            a && a.c(), e = X(), i && i.c(), n = X(), l && l.c(), f = z()
        },
        m(C, b) {
            a && a.m(C, b), S(C, e, b), i && i.m(C, b), S(C, n, b), l && l.m(C, b), S(C, f, b), t = !0
        },
        p(C, b) {
            var $, Z, w, q, D, J, x, ee, ie, ne, oe;
            C[24] === U.NON_SF_FLOW && ((Z = ($ = C[4]) == null ? void 0 : $.product_info) == null ? void 0 : Z.length) > 0 ? a ? (a.p(C, b), b[0] & 16 && m(a, 1)) : (a = Ci(C), a.c(), m(a, 1), a.m(e.parentNode, e)) : a && (O(), d(a, 1, 1, () => {
                a = null
            }), T()), C[24] === U.SF_FLOW && ((w = C[7].uiConfigV2) != null && w.home_page.product.display) && ((D = (q = C[4]) == null ? void 0 : q.product_info) == null ? void 0 : D.length) > 0 ? i ? (i.p(C, b), b[0] & 144 && m(i, 1)) : (i = ki(C), i.c(), m(i, 1), i.m(n.parentNode, n)) : i && (O(), d(i, 1, 1, () => {
                i = null
            }), T()), (ee = (x = (J = C[7].uiConfigV2) == null ? void 0 : J.home_page) == null ? void 0 : x.name_card) != null && ee.display && !((oe = (ne = (ie = C[7].uiConfigV2) == null ? void 0 : ie.home_page) == null ? void 0 : ne.product) != null && oe.display) && C[24] !== U.NON_SF_FLOW && C[18] ? l ? (l.p(C, b), b[0] & 262272 && m(l, 1)) : (l = Vi(C), l.c(), m(l, 1), l.m(f.parentNode, f)) : l && (O(), d(l, 1, 1, () => {
                l = null
            }), T())
        },
        i(C) {
            t || (m(a), m(i), m(l), t = !0)
        },
        o(C) {
            d(a), d(i), d(l), t = !1
        },
        d(C) {
            C && (F(e), F(n), F(f)), a && a.d(C), i && i.d(C), l && l.d(C)
        }
    }
}

function Mi(s) {
    let e, n, f;
    var t = s[19];

    function a(i, l) {
        return {
            props: {
                categoryInfo: i[10],
                pos: i[3]
            }
        }
    }
    return t && (e = P(t, a(s))), {
        c() {
            e && I(e.$$.fragment), n = z()
        },
        m(i, l) {
            e && L(e, i, l), S(i, n, l), f = !0
        },
        p(i, l) {
            if (l[0] & 524288 && t !== (t = i[19])) {
                if (e) {
                    O();
                    const o = e;
                    d(o.$$.fragment, 1, 0, () => {
                        N(o, 1)
                    }), T()
                }
                t ? (e = P(t, a(i)), I(e.$$.fragment), m(e.$$.fragment, 1), L(e, n.parentNode, n)) : e = null
            } else if (t) {
                const o = {};
                l[0] & 1024 && (o.categoryInfo = i[10]), l[0] & 8 && (o.pos = i[3]), e.$set(o)
            }
        },
        i(i) {
            f || (e && m(e.$$.fragment, i), f = !0)
        },
        o(i) {
            e && d(e.$$.fragment, i), f = !1
        },
        d(i) {
            i && F(n), e && N(e, i)
        }
    }
}

function qi(s) {
    let e, n, f;
    var t = s[19];

    function a(i, l) {
        return {
            props: {
                categoryInfo: i[10],
                pos: i[3]
            }
        }
    }
    return t && (e = P(t, a(s))), {
        c() {
            e && I(e.$$.fragment), n = z()
        },
        m(i, l) {
            e && L(e, i, l), S(i, n, l), f = !0
        },
        p(i, l) {
            if (l[0] & 524288 && t !== (t = i[19])) {
                if (e) {
                    O();
                    const o = e;
                    d(o.$$.fragment, 1, 0, () => {
                        N(o, 1)
                    }), T()
                }
                t ? (e = P(t, a(i)), I(e.$$.fragment), m(e.$$.fragment, 1), L(e, n.parentNode, n)) : e = null
            } else if (t) {
                const o = {};
                l[0] & 1024 && (o.categoryInfo = i[10]), l[0] & 8 && (o.pos = i[3]), e.$set(o)
            }
        },
        i(i) {
            f || (e && m(e.$$.fragment, i), f = !0)
        },
        o(i) {
            e && d(e.$$.fragment, i), f = !1
        },
        d(i) {
            i && F(n), e && N(e, i)
        }
    }
}

function Ci(s) {
    let e, n, f, t;
    const a = [Zi, Ui],
        i = [];

    function l(o, r) {
        var _, g, k;
        return ((_ = o[23]) == null ? void 0 : _.home_page.product.type) === "single" && ((g = o[7].uiConfigV2) != null && g.home_page.product.display) ? 0 : (k = o[7].uiConfigV2) != null && k.home_page.product.display ? 1 : -1
    }
    return ~(e = l(s)) && (n = i[e] = a[e](s)), {
        c() {
            n && n.c(), f = z()
        },
        m(o, r) {
            ~e && i[e].m(o, r), S(o, f, r), t = !0
        },
        p(o, r) {
            let _ = e;
            e = l(o), e === _ ? ~e && i[e].p(o, r) : (n && (O(), d(i[_], 1, 1, () => {
                i[_] = null
            }), T()), ~e ? (n = i[e], n ? n.p(o, r) : (n = i[e] = a[e](o), n.c()), m(n, 1), n.m(f.parentNode, f)) : n = null)
        },
        i(o) {
            t || (m(n), t = !0)
        },
        o(o) {
            d(n), t = !1
        },
        d(o) {
            o && F(f), ~e && i[e].d(o)
        }
    }
}

function Ui(s) {
    var k, V, A, v;
    let e, n, f, t, a, i, l, o = ((V = (k = s[4]) == null ? void 0 : k.product_info) == null ? void 0 : V.length) > 1 && !((A = s[7]) != null && A.isProductLoading) && bi(s),
        r = Ue((v = s[4]) == null ? void 0 : v.product_info),
        _ = [];
    for (let c = 0; c < r.length; c += 1) _[c] = vi(di(s, r, c));
    const g = c => d(_[c], 1, 1, () => {
        _[c] = null
    });
    return {
        c() {
            var c, h, y;
            o && o.c(), e = X(), n = G("div"), f = G("div");
            for (let C = 0; C < _.length; C += 1) _[C].c();
            E(f, "class", "embla__container svelte-2re55e"), H(f, "position", ((y = (h = (c = s[7].uiConfigV2) == null ? void 0 : c.home_page) == null ? void 0 : h.product) == null ? void 0 : y.placement) == "embedded" ? "absolute" : ""), E(n, "class", "embla svelte-2re55e")
        },
        m(c, h) {
            o && o.m(c, h), S(c, e, h), S(c, n, h), M(n, f);
            for (let y = 0; y < _.length; y += 1) _[y] && _[y].m(f, null);
            a = !0, i || (l = [Ii(t = Si.call(null, n, {
                options: s[12],
                plugins: s[26]
            })), be(n, "emblaInit", s[31])], i = !0)
        },
        p(c, h) {
            var y, C, b, $, Z, w, q;
            if (((C = (y = c[4]) == null ? void 0 : y.product_info) == null ? void 0 : C.length) > 1 && !((b = c[7]) != null && b.isProductLoading) ? o ? o.p(c, h) : (o = bi(c), o.c(), o.m(e.parentNode, e)) : o && (o.d(1), o = null), h[0] & 49310) {
                r = Ue(($ = c[4]) == null ? void 0 : $.product_info);
                let D;
                for (D = 0; D < r.length; D += 1) {
                    const J = di(c, r, D);
                    _[D] ? (_[D].p(J, h), m(_[D], 1)) : (_[D] = vi(J), _[D].c(), m(_[D], 1), _[D].m(f, null))
                }
                for (O(), D = r.length; D < _.length; D += 1) g(D);
                T()
            }(!a || h[0] & 128) && H(f, "position", ((q = (w = (Z = c[7].uiConfigV2) == null ? void 0 : Z.home_page) == null ? void 0 : w.product) == null ? void 0 : q.placement) == "embedded" ? "absolute" : ""), t && Li(t.update) && h[0] & 4096 && t.update.call(null, {
                options: c[12],
                plugins: c[26]
            })
        },
        i(c) {
            if (!a) {
                for (let h = 0; h < r.length; h += 1) m(_[h]);
                a = !0
            }
        },
        o(c) {
            _ = _.filter(Boolean);
            for (let h = 0; h < _.length; h += 1) d(_[h]);
            a = !1
        },
        d(c) {
            c && (F(e), F(n)), o && o.d(c), Ni(_, c), i = !1, Ze(l)
        }
    }
}

function Zi(s) {
    let e, n, f, t;
    const a = [Ji, Gi],
        i = [];

    function l(o, r) {
        var _, g, k;
        return ((k = (g = (_ = o[7].uiConfigV2) == null ? void 0 : _.home_page) == null ? void 0 : g.product) == null ? void 0 : k.layout) == "flex-row" && o[15] ? 0 : o[14] ? 1 : -1
    }
    return ~(e = l(s)) && (n = i[e] = a[e](s)), {
        c() {
            n && n.c(), f = z()
        },
        m(o, r) {
            ~e && i[e].m(o, r), S(o, f, r), t = !0
        },
        p(o, r) {
            let _ = e;
            e = l(o), e === _ ? ~e && i[e].p(o, r) : (n && (O(), d(i[_], 1, 1, () => {
                i[_] = null
            }), T()), ~e ? (n = i[e], n ? n.p(o, r) : (n = i[e] = a[e](o), n.c()), m(n, 1), n.m(f.parentNode, f)) : n = null)
        },
        i(o) {
            t || (m(n), t = !0)
        },
        o(o) {
            d(n), t = !1
        },
        d(o) {
            o && F(f), ~e && i[e].d(o)
        }
    }
}

function bi(s) {
    let e, n, f, t, a, i;
    return {
        c() {
            e = G("div"), n = mi("svg"), f = mi("path"), E(f, "d", "M0.802653 6.00033C0.802653 6.15946 0.865867 6.31208 0.978389 6.4246C1.09091 6.53712 1.24352 6.60033 1.40265 6.60033H13.1544L8.77815 10.9758C8.72241 11.0316 8.67819 11.0978 8.64802 11.1706C8.61785 11.2434 8.60232 11.3215 8.60232 11.4003C8.60232 11.4792 8.61785 11.5572 8.64802 11.6301C8.67819 11.7029 8.72241 11.7691 8.77815 11.8248C8.8339 11.8806 8.90008 11.9248 8.97291 11.955C9.04575 11.9851 9.12382 12.0007 9.20265 12.0007C9.28149 12.0007 9.35955 11.9851 9.43239 11.955C9.50523 11.9248 9.57141 11.8806 9.62715 11.8248L15.0272 6.42483C15.0829 6.36911 15.1272 6.30294 15.1574 6.2301C15.1876 6.15726 15.2031 6.07918 15.2031 6.00033C15.2031 5.92148 15.1876 5.84341 15.1574 5.77057C15.1272 5.69773 15.0829 5.63156 15.0272 5.57583L9.62715 0.175834C9.51457 0.0632492 9.36187 -1.18627e-09 9.20265 0C9.04343 1.18627e-09 8.89074 0.0632492 8.77815 0.175834C8.66557 0.288418 8.60232 0.441115 8.60232 0.600334C8.60232 0.759552 8.66557 0.912249 8.77815 1.02483L13.1544 5.40033H1.40265C1.24352 5.40033 1.09091 5.46355 0.978389 5.57607C0.865867 5.68859 0.802653 5.8412 0.802653 6.00033Z"), E(f, "fill", "white"), E(n, "class", "lively_sf_product_slide_arrow_svg"), E(n, "width", "16"), E(n, "height", "16"), E(n, "viewBox", "0 0 16 12"), E(n, "fill", "none"), E(n, "xmlns", "http://www.w3.org/2000/svg"), E(e, "class", t = "lively_sf_product_slide_arrow " + (s[7].brandId == "7a94329b88" || s[7].brandId == "9b15bca37e" ? "kamaAyurvedaStyles" : "") + " svelte-2re55e")
        },
        m(l, o) {
            S(l, e, o), M(e, n), M(n, f), a || (i = be(e, "click", s[35]), a = !0)
        },
        p(l, o) {
            o[0] & 128 && t !== (t = "lively_sf_product_slide_arrow " + (l[7].brandId == "7a94329b88" || l[7].brandId == "9b15bca37e" ? "kamaAyurvedaStyles" : "") + " svelte-2re55e") && E(e, "class", t)
        },
        d(l) {
            l && F(e), a = !1, i()
        }
    }
}

function ji(s) {
    let e, n, f;
    var t = s[14];

    function a(i, l) {
        return {
            props: {
                data: i[4],
                index: i[2],
                onItemClick: i[1],
                pos: i[3]
            }
        }
    }
    return t && (e = P(t, a(s))), {
        c() {
            e && I(e.$$.fragment), n = z()
        },
        m(i, l) {
            e && L(e, i, l), S(i, n, l), f = !0
        },
        p(i, l) {
            if (l[0] & 16384 && t !== (t = i[14])) {
                if (e) {
                    O();
                    const o = e;
                    d(o.$$.fragment, 1, 0, () => {
                        N(o, 1)
                    }), T()
                }
                t ? (e = P(t, a(i)), I(e.$$.fragment), m(e.$$.fragment, 1), L(e, n.parentNode, n)) : e = null
            } else if (t) {
                const o = {};
                l[0] & 16 && (o.data = i[4]), l[0] & 4 && (o.index = i[2]), l[0] & 2 && (o.onItemClick = i[1]), l[0] & 8 && (o.pos = i[3]), e.$set(o)
            }
        },
        i(i) {
            f || (e && m(e.$$.fragment, i), f = !0)
        },
        o(i) {
            e && d(e.$$.fragment, i), f = !1
        },
        d(i) {
            i && F(n), e && N(e, i)
        }
    }
}

function Yi(s) {
    let e, n, f;
    var t = s[15];

    function a(i, l) {
        return {
            props: {
                data: i[4],
                index: i[2],
                onItemClick: i[1],
                pos: i[3]
            }
        }
    }
    return t && (e = P(t, a(s))), {
        c() {
            e && I(e.$$.fragment), n = z()
        },
        m(i, l) {
            e && L(e, i, l), S(i, n, l), f = !0
        },
        p(i, l) {
            if (l[0] & 32768 && t !== (t = i[15])) {
                if (e) {
                    O();
                    const o = e;
                    d(o.$$.fragment, 1, 0, () => {
                        N(o, 1)
                    }), T()
                }
                t ? (e = P(t, a(i)), I(e.$$.fragment), m(e.$$.fragment, 1), L(e, n.parentNode, n)) : e = null
            } else if (t) {
                const o = {};
                l[0] & 16 && (o.data = i[4]), l[0] & 4 && (o.index = i[2]), l[0] & 2 && (o.onItemClick = i[1]), l[0] & 8 && (o.pos = i[3]), e.$set(o)
            }
        },
        i(i) {
            f || (e && m(e.$$.fragment, i), f = !0)
        },
        o(i) {
            e && d(e.$$.fragment, i), f = !1
        },
        d(i) {
            i && F(n), e && N(e, i)
        }
    }
}

function vi(s) {
    let e, n, f, t, a;
    const i = [Yi, ji],
        l = [];

    function o(r, _) {
        var g, k, V;
        return ((V = (k = (g = r[7].uiConfigV2) == null ? void 0 : g.home_page) == null ? void 0 : k.product) == null ? void 0 : V.layout) == "flex-row" && r[15] ? 0 : r[14] ? 1 : -1
    }
    return ~(n = o(s)) && (f = l[n] = i[n](s)), {
        c() {
            e = G("div"), f && f.c(), t = X(), E(e, "class", "embla__slide svelte-2re55e")
        },
        m(r, _) {
            S(r, e, _), ~n && l[n].m(e, null), M(e, t), a = !0
        },
        p(r, _) {
            let g = n;
            n = o(r), n === g ? ~n && l[n].p(r, _) : (f && (O(), d(l[g], 1, 1, () => {
                l[g] = null
            }), T()), ~n ? (f = l[n], f ? f.p(r, _) : (f = l[n] = i[n](r), f.c()), m(f, 1), f.m(e, t)) : f = null)
        },
        i(r) {
            a || (m(f), a = !0)
        },
        o(r) {
            d(f), a = !1
        },
        d(r) {
            r && F(e), ~n && l[n].d()
        }
    }
}

function Gi(s) {
    let e, n, f;
    var t = s[14];

    function a(i, l) {
        var o;
        return {
            props: {
                data: (o = i[4]) == null ? void 0 : o.product_info[0],
                index: i[2],
                onItemClick: i[1],
                pos: i[3]
            }
        }
    }
    return t && (e = P(t, a(s))), {
        c() {
            e && I(e.$$.fragment), n = z()
        },
        m(i, l) {
            e && L(e, i, l), S(i, n, l), f = !0
        },
        p(i, l) {
            var o;
            if (l[0] & 16384 && t !== (t = i[14])) {
                if (e) {
                    O();
                    const r = e;
                    d(r.$$.fragment, 1, 0, () => {
                        N(r, 1)
                    }), T()
                }
                t ? (e = P(t, a(i)), I(e.$$.fragment), m(e.$$.fragment, 1), L(e, n.parentNode, n)) : e = null
            } else if (t) {
                const r = {};
                l[0] & 16 && (r.data = (o = i[4]) == null ? void 0 : o.product_info[0]), l[0] & 4 && (r.index = i[2]), l[0] & 2 && (r.onItemClick = i[1]), l[0] & 8 && (r.pos = i[3]), e.$set(r)
            }
        },
        i(i) {
            f || (e && m(e.$$.fragment, i), f = !0)
        },
        o(i) {
            e && d(e.$$.fragment, i), f = !1
        },
        d(i) {
            i && F(n), e && N(e, i)
        }
    }
}

function Ji(s) {
    let e, n, f;
    var t = s[15];

    function a(i, l) {
        var o;
        return {
            props: {
                data: (o = i[4]) == null ? void 0 : o.product_info[0],
                index: i[2],
                onItemClick: i[1],
                pos: i[3]
            }
        }
    }
    return t && (e = P(t, a(s))), {
        c() {
            e && I(e.$$.fragment), n = z()
        },
        m(i, l) {
            e && L(e, i, l), S(i, n, l), f = !0
        },
        p(i, l) {
            var o;
            if (l[0] & 32768 && t !== (t = i[15])) {
                if (e) {
                    O();
                    const r = e;
                    d(r.$$.fragment, 1, 0, () => {
                        N(r, 1)
                    }), T()
                }
                t ? (e = P(t, a(i)), I(e.$$.fragment), m(e.$$.fragment, 1), L(e, n.parentNode, n)) : e = null
            } else if (t) {
                const r = {};
                l[0] & 16 && (r.data = (o = i[4]) == null ? void 0 : o.product_info[0]), l[0] & 4 && (r.index = i[2]), l[0] & 2 && (r.onItemClick = i[1]), l[0] & 8 && (r.pos = i[3]), e.$set(r)
            }
        },
        i(i) {
            f || (e && m(e.$$.fragment, i), f = !0)
        },
        o(i) {
            e && d(e.$$.fragment, i), f = !1
        },
        d(i) {
            i && F(n), e && N(e, i)
        }
    }
}

function ki(s) {
    let e, n, f, t;
    const a = [Qi, Ki],
        i = [];

    function l(o, r) {
        var _;
        return ((_ = o[7].uiConfigV2) == null ? void 0 : _.home_page.product.type) === "single" ? 0 : 1
    }
    return e = l(s), n = i[e] = a[e](s), {
        c() {
            n.c(), f = z()
        },
        m(o, r) {
            i[e].m(o, r), S(o, f, r), t = !0
        },
        p(o, r) {
            let _ = e;
            e = l(o), e === _ ? i[e].p(o, r) : (O(), d(i[_], 1, 1, () => {
                i[_] = null
            }), T(), n = i[e], n ? n.p(o, r) : (n = i[e] = a[e](o), n.c()), m(n, 1), n.m(f.parentNode, f))
        },
        i(o) {
            t || (m(n), t = !0)
        },
        o(o) {
            d(n), t = !1
        },
        d(o) {
            o && F(f), i[e].d(o)
        }
    }
}

function Ki(s) {
    var k, V, A;
    let e, n, f, t, a, i, l, o = Ue(ve(s[4])),
        r = [];
    for (let v = 0; v < o.length; v += 1) r[v] = wi(ci(s, o, v));
    const _ = v => d(r[v], 1, 1, () => {
        r[v] = null
    });
    let g = ((V = (k = s[4]) == null ? void 0 : k.product_info) == null ? void 0 : V.length) > 1 && ((A = s[7]) == null ? void 0 : A.isProductLoading) && $i(s);
    return {
        c() {
            var v, c, h;
            e = G("div"), n = G("div");
            for (let y = 0; y < r.length; y += 1) r[y].c();
            f = X(), g && g.c(), E(n, "class", "embla__container svelte-2re55e"), H(n, "position", ((h = (c = (v = s[7].uiConfigV2) == null ? void 0 : v.home_page) == null ? void 0 : c.product) == null ? void 0 : h.placement) == "embedded" ? "absolute" : ""), E(e, "class", "embla svelte-2re55e")
        },
        m(v, c) {
            S(v, e, c), M(e, n);
            for (let h = 0; h < r.length; h += 1) r[h] && r[h].m(n, null);
            M(e, f), g && g.m(e, null), a = !0, i || (l = [Ii(t = Si.call(null, e, {
                options: s[12],
                plugins: s[26]
            })), be(e, "emblaInit", s[31])], i = !0)
        },
        p(v, c) {
            var h, y, C, b, $, Z;
            if (c[0] & 537075871) {
                o = Ue(ve(v[4]));
                let w;
                for (w = 0; w < o.length; w += 1) {
                    const q = ci(v, o, w);
                    r[w] ? (r[w].p(q, c), m(r[w], 1)) : (r[w] = wi(q), r[w].c(), m(r[w], 1), r[w].m(n, null))
                }
                for (O(), w = o.length; w < r.length; w += 1) _(w);
                T()
            }(!a || c[0] & 128) && H(n, "position", ((C = (y = (h = v[7].uiConfigV2) == null ? void 0 : h.home_page) == null ? void 0 : y.product) == null ? void 0 : C.placement) == "embedded" ? "absolute" : ""), (($ = (b = v[4]) == null ? void 0 : b.product_info) == null ? void 0 : $.length) > 1 && ((Z = v[7]) != null && Z.isProductLoading) ? g ? g.p(v, c) : (g = $i(v), g.c(), g.m(e, null)) : g && (g.d(1), g = null), t && Li(t.update) && c[0] & 4096 && t.update.call(null, {
                options: v[12],
                plugins: v[26]
            })
        },
        i(v) {
            if (!a) {
                for (let c = 0; c < o.length; c += 1) m(r[c]);
                a = !0
            }
        },
        o(v) {
            r = r.filter(Boolean);
            for (let c = 0; c < r.length; c += 1) d(r[c]);
            a = !1
        },
        d(v) {
            v && F(e), Ni(r, v), g && g.d(), i = !1, Ze(l)
        }
    }
}

function Qi(s) {
    let e, n, f, t;
    const a = [nn, en],
        i = [];

    function l(o, r) {
        var _, g, k;
        return ((k = (g = (_ = o[7].uiConfigV2) == null ? void 0 : _.home_page) == null ? void 0 : g.product) == null ? void 0 : k.layout) == "flex-row" && o[17] ? 0 : o[16] ? 1 : -1
    }
    return ~(e = l(s)) && (n = i[e] = a[e](s)), {
        c() {
            n && n.c(), f = z()
        },
        m(o, r) {
            ~e && i[e].m(o, r), S(o, f, r), t = !0
        },
        p(o, r) {
            let _ = e;
            e = l(o), e === _ ? ~e && i[e].p(o, r) : (n && (O(), d(i[_], 1, 1, () => {
                i[_] = null
            }), T()), ~e ? (n = i[e], n ? n.p(o, r) : (n = i[e] = a[e](o), n.c()), m(n, 1), n.m(f.parentNode, f)) : n = null)
        },
        i(o) {
            t || (m(n), t = !0)
        },
        o(o) {
            d(n), t = !1
        },
        d(o) {
            o && F(f), ~e && i[e].d(o)
        }
    }
}

function Xi(s) {
    let e, n, f;
    var t = s[16];

    function a(i, l) {
        return {
            props: {
                data: i[49],
                index: i[13] ? i[51] : i[2],
                onItemClick: i[1],
                pos: i[3],
                activeIndex: i[0],
                handleOfferUpdate: i[29]
            }
        }
    }
    return t && (e = P(t, a(s))), {
        c() {
            e && I(e.$$.fragment), n = z()
        },
        m(i, l) {
            e && L(e, i, l), S(i, n, l), f = !0
        },
        p(i, l) {
            if (l[0] & 65536 && t !== (t = i[16])) {
                if (e) {
                    O();
                    const o = e;
                    d(o.$$.fragment, 1, 0, () => {
                        N(o, 1)
                    }), T()
                }
                t ? (e = P(t, a(i)), I(e.$$.fragment), m(e.$$.fragment, 1), L(e, n.parentNode, n)) : e = null
            } else if (t) {
                const o = {};
                l[0] & 16 && (o.data = i[49]), l[0] & 8196 && (o.index = i[13] ? i[51] : i[2]), l[0] & 2 && (o.onItemClick = i[1]), l[0] & 8 && (o.pos = i[3]), l[0] & 1 && (o.activeIndex = i[0]), e.$set(o)
            }
        },
        i(i) {
            f || (e && m(e.$$.fragment, i), f = !0)
        },
        o(i) {
            e && d(e.$$.fragment, i), f = !1
        },
        d(i) {
            i && F(n), e && N(e, i)
        }
    }
}

function xi(s) {
    let e, n, f;
    var t = s[17];

    function a(i, l) {
        return {
            props: {
                data: i[49],
                index: i[13] ? i[51] : i[2],
                onItemClick: i[1],
                pos: i[3],
                activeIndex: i[0],
                handleOfferUpdate: i[29]
            }
        }
    }
    return t && (e = P(t, a(s))), {
        c() {
            e && I(e.$$.fragment), n = z()
        },
        m(i, l) {
            e && L(e, i, l), S(i, n, l), f = !0
        },
        p(i, l) {
            if (l[0] & 131072 && t !== (t = i[17])) {
                if (e) {
                    O();
                    const o = e;
                    d(o.$$.fragment, 1, 0, () => {
                        N(o, 1)
                    }), T()
                }
                t ? (e = P(t, a(i)), I(e.$$.fragment), m(e.$$.fragment, 1), L(e, n.parentNode, n)) : e = null
            } else if (t) {
                const o = {};
                l[0] & 16 && (o.data = i[49]), l[0] & 8196 && (o.index = i[13] ? i[51] : i[2]), l[0] & 2 && (o.onItemClick = i[1]), l[0] & 8 && (o.pos = i[3]), l[0] & 1 && (o.activeIndex = i[0]), e.$set(o)
            }
        },
        i(i) {
            f || (e && m(e.$$.fragment, i), f = !0)
        },
        o(i) {
            e && d(e.$$.fragment, i), f = !1
        },
        d(i) {
            i && F(n), e && N(e, i)
        }
    }
}

function wi(s) {
    let e, n, f, t, a;
    const i = [xi, Xi],
        l = [];

    function o(r, _) {
        var g, k, V;
        return ((V = (k = (g = r[7].uiConfigV2) == null ? void 0 : g.home_page) == null ? void 0 : k.product) == null ? void 0 : V.layout) == "flex-row" && r[17] ? 0 : r[16] ? 1 : -1
    }
    return ~(n = o(s)) && (f = l[n] = i[n](s)), {
        c() {
            e = G("div"), f && f.c(), t = X(), E(e, "class", "embla__slide svelte-2re55e")
        },
        m(r, _) {
            S(r, e, _), ~n && l[n].m(e, null), M(e, t), a = !0
        },
        p(r, _) {
            let g = n;
            n = o(r), n === g ? ~n && l[n].p(r, _) : (f && (O(), d(l[g], 1, 1, () => {
                l[g] = null
            }), T()), ~n ? (f = l[n], f ? f.p(r, _) : (f = l[n] = i[n](r), f.c()), m(f, 1), f.m(e, t)) : f = null)
        },
        i(r) {
            a || (m(f), a = !0)
        },
        o(r) {
            d(f), a = !1
        },
        d(r) {
            r && F(e), ~n && l[n].d()
        }
    }
}

function $i(s) {
    let e, n, f;
    return {
        c() {
            e = G("div"), e.innerHTML = '<svg class="lively_sf_product_slide_arrow_svg" width="16" height="16" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.802653 6.00033C0.802653 6.15946 0.865867 6.31208 0.978389 6.4246C1.09091 6.53712 1.24352 6.60033 1.40265 6.60033H13.1544L8.77815 10.9758C8.72241 11.0316 8.67819 11.0978 8.64802 11.1706C8.61785 11.2434 8.60232 11.3215 8.60232 11.4003C8.60232 11.4792 8.61785 11.5572 8.64802 11.6301C8.67819 11.7029 8.72241 11.7691 8.77815 11.8248C8.8339 11.8806 8.90008 11.9248 8.97291 11.955C9.04575 11.9851 9.12382 12.0007 9.20265 12.0007C9.28149 12.0007 9.35955 11.9851 9.43239 11.955C9.50523 11.9248 9.57141 11.8806 9.62715 11.8248L15.0272 6.42483C15.0829 6.36911 15.1272 6.30294 15.1574 6.2301C15.1876 6.15726 15.2031 6.07918 15.2031 6.00033C15.2031 5.92148 15.1876 5.84341 15.1574 5.77057C15.1272 5.69773 15.0829 5.63156 15.0272 5.57583L9.62715 0.175834C9.51457 0.0632492 9.36187 -1.18627e-09 9.20265 0C9.04343 1.18627e-09 8.89074 0.0632492 8.77815 0.175834C8.66557 0.288418 8.60232 0.441115 8.60232 0.600334C8.60232 0.759552 8.66557 0.912249 8.77815 1.02483L13.1544 5.40033H1.40265C1.24352 5.40033 1.09091 5.46355 0.978389 5.57607C0.865867 5.68859 0.802653 5.8412 0.802653 6.00033Z" fill="white"></path></svg>', E(e, "class", "lively_sf_product_slide_arrow svelte-2re55e")
        },
        m(t, a) {
            S(t, e, a), n || (f = be(e, "click", s[36]), n = !0)
        },
        p: Wi,
        d(t) {
            t && F(e), n = !1, f()
        }
    }
}

function en(s) {
    let e, n, f;
    var t = s[16];

    function a(i, l) {
        return {
            props: {
                data: ve(i[4])[0],
                index: i[2],
                onItemClick: i[1],
                pos: i[3],
                activeIndex: i[0],
                handleOfferUpdate: i[29]
            }
        }
    }
    return t && (e = P(t, a(s))), {
        c() {
            e && I(e.$$.fragment), n = z()
        },
        m(i, l) {
            e && L(e, i, l), S(i, n, l), f = !0
        },
        p(i, l) {
            if (l[0] & 65536 && t !== (t = i[16])) {
                if (e) {
                    O();
                    const o = e;
                    d(o.$$.fragment, 1, 0, () => {
                        N(o, 1)
                    }), T()
                }
                t ? (e = P(t, a(i)), I(e.$$.fragment), m(e.$$.fragment, 1), L(e, n.parentNode, n)) : e = null
            } else if (t) {
                const o = {};
                l[0] & 16 && (o.data = ve(i[4])[0]), l[0] & 4 && (o.index = i[2]), l[0] & 2 && (o.onItemClick = i[1]), l[0] & 8 && (o.pos = i[3]), l[0] & 1 && (o.activeIndex = i[0]), e.$set(o)
            }
        },
        i(i) {
            f || (e && m(e.$$.fragment, i), f = !0)
        },
        o(i) {
            e && d(e.$$.fragment, i), f = !1
        },
        d(i) {
            i && F(n), e && N(e, i)
        }
    }
}

function nn(s) {
    let e, n, f;
    var t = s[17];

    function a(i, l) {
        return {
            props: {
                data: ve(i[4])[0],
                index: i[2],
                onItemClick: i[1],
                pos: i[3],
                activeIndex: i[0],
                handleOfferUpdate: i[29]
            }
        }
    }
    return t && (e = P(t, a(s))), {
        c() {
            e && I(e.$$.fragment), n = z()
        },
        m(i, l) {
            e && L(e, i, l), S(i, n, l), f = !0
        },
        p(i, l) {
            if (l[0] & 131072 && t !== (t = i[17])) {
                if (e) {
                    O();
                    const o = e;
                    d(o.$$.fragment, 1, 0, () => {
                        N(o, 1)
                    }), T()
                }
                t ? (e = P(t, a(i)), I(e.$$.fragment), m(e.$$.fragment, 1), L(e, n.parentNode, n)) : e = null
            } else if (t) {
                const o = {};
                l[0] & 16 && (o.data = ve(i[4])[0]), l[0] & 4 && (o.index = i[2]), l[0] & 2 && (o.onItemClick = i[1]), l[0] & 8 && (o.pos = i[3]), l[0] & 1 && (o.activeIndex = i[0]), e.$set(o)
            }
        },
        i(i) {
            f || (e && m(e.$$.fragment, i), f = !0)
        },
        o(i) {
            e && d(e.$$.fragment, i), f = !1
        },
        d(i) {
            i && F(n), e && N(e, i)
        }
    }
}

function Vi(s) {
    let e, n, f;
    var t = s[18];

    function a(i, l) {
        var o;
        return {
            props: {
                data: ve(i[4])[0],
                index: i[2],
                pos: i[3],
                feedName: (o = i[4]) == null ? void 0 : o.name,
                isNotHomepage: i[5] || i[4].is_shoppable_feed_form || i[4].is_shoppable_feed_poll || i[4].is_shoppable_feed_quiz || i[6]
            }
        }
    }
    return t && (e = P(t, a(s))), {
        c() {
            e && I(e.$$.fragment), n = z()
        },
        m(i, l) {
            e && L(e, i, l), S(i, n, l), f = !0
        },
        p(i, l) {
            var o;
            if (l[0] & 262144 && t !== (t = i[18])) {
                if (e) {
                    O();
                    const r = e;
                    d(r.$$.fragment, 1, 0, () => {
                        N(r, 1)
                    }), T()
                }
                t ? (e = P(t, a(i)), I(e.$$.fragment), m(e.$$.fragment, 1), L(e, n.parentNode, n)) : e = null
            } else if (t) {
                const r = {};
                l[0] & 16 && (r.data = ve(i[4])[0]), l[0] & 4 && (r.index = i[2]), l[0] & 8 && (r.pos = i[3]), l[0] & 16 && (r.feedName = (o = i[4]) == null ? void 0 : o.name), l[0] & 112 && (r.isNotHomepage = i[5] || i[4].is_shoppable_feed_form || i[4].is_shoppable_feed_poll || i[4].is_shoppable_feed_quiz || i[6]), e.$set(r)
            }
        },
        i(i) {
            f || (e && m(e.$$.fragment, i), f = !0)
        },
        o(i) {
            e && d(e.$$.fragment, i), f = !1
        },
        d(i) {
            i && F(n), e && N(e, i)
        }
    }
}

function on(s) {
    var D, J, x, ee, ie, ne, oe, we, Ae, ke, De, $e, Ee, We, ze, Be, Re, He, Me, qe, Ve, Ie, Le;
    let e, n, f, t, a, i, l, o, r, _, g, k, V, A, v, c, h, y, C, b = ((ee = (x = (J = (D = s[7]) == null ? void 0 : D.uiConfigV2) == null ? void 0 : J.home_page) == null ? void 0 : x.product) == null ? void 0 : ee.display) && s[20] && hi(s);
    a = new zi({
        props: {
            ref: s[25],
            videoInfo: s[4],
            index: s[2],
            bottomBorderRadius: s[7].pip == "3" || !((oe = (ne = (ie = s[7].uiConfigV2) == null ? void 0 : ie.home_page) == null ? void 0 : ne.product) != null && oe.display) && !((ke = (Ae = (we = s[7].uiConfigV2) == null ? void 0 : we.home_page) == null ? void 0 : Ae.name_card) != null && ke.display),
            pos: s[3]
        }
    }), l = new Bi({
        props: {
            viewsConfig: (De = s[23].home_page) == null ? void 0 : De.views,
            views: ($e = s[4]) == null ? void 0 : $e.watched,
            pos: s[3]
        }
    }), r = new Ri({
        props: {
            placement: "home",
            handleLikeClick: s[33],
            showActive: s[7].selectedSFLikes.includes((Ee = s[4]) == null ? void 0 : Ee._id),
            likeData: (We = s[4]) == null ? void 0 : We.likes,
            showLikeData: !1,
            handleShareClick: s[34],
            sharesData: (ze = s[4]) == null ? void 0 : ze.shares,
            showShareData: !1,
            data: null,
            pos: s[3],
            SLVConfig: s[27],
            homeStyle: (He = (Re = (Be = s[7].uiConfigV2) == null ? void 0 : Be.home_page) == null ? void 0 : Re.name_card) != null && He.display && !((Ve = (qe = (Me = s[7].uiConfigV2) == null ? void 0 : Me.home_page) == null ? void 0 : qe.product) != null && Ve.display) && s[24] !== U.NON_SF_FLOW && ((Le = (Ie = s[7].uiConfigV2.home_page) == null ? void 0 : Ie.name_card) == null ? void 0 : Le.type) !== "ATTACHED" ? "bottom: 35px;" : ""
        }
    });
    let $ = s[28] == "true" && s[21] && gi(s);
    const Z = [qi, Mi, Hi],
        w = [];

    function q(u, p) {
        var B, j, R, Y, K, Q;
        return (u[5] || u[6]) && ((R = (j = (B = u[7].uiConfigV2) == null ? void 0 : B.home_page) == null ? void 0 : j.product) != null && R.display) && u[19] ? 0 : (u[4].is_shoppable_feed_form || u[4].is_shoppable_feed_poll || u[4].is_shoppable_feed_quiz) && ((Q = (K = (Y = u[7].uiConfigV2) == null ? void 0 : Y.home_page) == null ? void 0 : K.product) != null && Q.display) ? 1 : 2
    }
    return V = q(s), A = w[V] = Z[V](s), {
        c() {
            var u, p, B, j, R, Y, K, Q, le, fe, te, se, re, ae, _e, ue, pe, me, ce, de, he, ge;
            e = G("main"), n = G("div"), f = G("div"), b && b.c(), t = X(), I(a.$$.fragment), i = X(), I(l.$$.fragment), o = X(), I(r.$$.fragment), _ = X(), $ && $.c(), g = X(), k = G("div"), A.c(), E(f, "class", "videoContainer svelte-2re55e"), H(f, "height", Pe() == "Mobile" ? (j = (B = (p = (u = s[7]) == null ? void 0 : u.uiConfigV2) == null ? void 0 : p.home_page) == null ? void 0 : B.home_feed_video_card_size) == null ? void 0 : j.mobile_view_card_height : (Q = (K = (Y = (R = s[7]) == null ? void 0 : R.uiConfigV2) == null ? void 0 : Y.home_page) == null ? void 0 : K.home_feed_video_card_size) == null ? void 0 : Q.height), E(k, "class", "swiperContainer svelte-2re55e"), E(k, "style", v = `${s[7].brandId=="d6965a49a7"?"background:#FCFBEB":""}`), E(n, "class", c = "containers lively_sf_container_hover " + (s[7].brandId == "26968f0e55" ? "brandSpecific" : "") + " svelte-2re55e"), H(n, "min-height", Pe() == "Mobile" ? "270px" : "330px"), H(n, "width", Pe() == "Mobile" ? (se = (te = (fe = (le = s[7]) == null ? void 0 : le.uiConfigV2) == null ? void 0 : fe.home_page) == null ? void 0 : te.home_feed_video_card_size) == null ? void 0 : se.mobile_view_card_width : (ue = (_e = (ae = (re = s[7]) == null ? void 0 : re.uiConfigV2) == null ? void 0 : ae.home_page) == null ? void 0 : _e.home_feed_video_card_size) == null ? void 0 : ue.width), H(n, "overflow", s[11] ? "" : "hidden"), H(n, "background-color", s[11] ? "" : "transparent"), H(n, "box-shadow", (ce = (me = (pe = s[7].uiConfigV2) == null ? void 0 : pe.home_page) == null ? void 0 : me.home_feed_card_styles) != null && ce.card_shadow ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none"), H(n, "border-radius", (ge = (he = (de = s[7].uiConfigV2) == null ? void 0 : de.home_page) == null ? void 0 : he.home_feed_card_styles) == null ? void 0 : ge.card_border_radius), E(e, "class", "lively_sf_hm_theme1_main_container svelte-2re55e")
        },
        m(u, p) {
            S(u, e, p), M(e, n), M(n, f), b && b.m(f, null), M(f, t), L(a, f, null), M(f, i), L(l, f, null), M(f, o), L(r, f, null), M(f, _), $ && $.m(f, null), M(n, g), M(n, k), w[V].m(k, null), h = !0, y || (C = [be(n, "click", s[37]), be(n, "mouseenter", s[38]), be(n, "mouseleave", s[39]), be(n, "touchstart", s[40], {
                passive: !0
            })], y = !0)
        },
        p(u, p) {
            var K, Q, le, fe, te, se, re, ae, _e, ue, pe, me, ce, de, he, ge, Ne, Se, Fe, Oe, Te, ye, W, je, Ye, Ge, Je, Ke, Qe, Xe, xe, ei, ii, ni, oi, li, fi, ti, si, ri, ai, _i, ui, pi;
            (fe = (le = (Q = (K = u[7]) == null ? void 0 : K.uiConfigV2) == null ? void 0 : Q.home_page) == null ? void 0 : le.product) != null && fe.display && u[20] ? b ? (b.p(u, p), p[0] & 1048704 && m(b, 1)) : (b = hi(u), b.c(), m(b, 1), b.m(f, t)) : b && (O(), d(b, 1, 1, () => {
                b = null
            }), T());
            const B = {};
            p[0] & 16 && (B.videoInfo = u[4]), p[0] & 4 && (B.index = u[2]), p[0] & 128 && (B.bottomBorderRadius = u[7].pip == "3" || !((re = (se = (te = u[7].uiConfigV2) == null ? void 0 : te.home_page) == null ? void 0 : se.product) != null && re.display) && !((ue = (_e = (ae = u[7].uiConfigV2) == null ? void 0 : ae.home_page) == null ? void 0 : _e.name_card) != null && ue.display)), p[0] & 8 && (B.pos = u[3]), a.$set(B);
            const j = {};
            p[0] & 16 && (j.views = (pe = u[4]) == null ? void 0 : pe.watched), p[0] & 8 && (j.pos = u[3]), l.$set(j);
            const R = {};
            p[0] & 152 && (R.handleLikeClick = u[33]), p[0] & 144 && (R.showActive = u[7].selectedSFLikes.includes((me = u[4]) == null ? void 0 : me._id)), p[0] & 16 && (R.likeData = (ce = u[4]) == null ? void 0 : ce.likes), p[0] & 664 && (R.handleShareClick = u[34]), p[0] & 16 && (R.sharesData = (de = u[4]) == null ? void 0 : de.shares), p[0] & 8 && (R.pos = u[3]), p[0] & 128 && (R.homeStyle = (Ne = (ge = (he = u[7].uiConfigV2) == null ? void 0 : he.home_page) == null ? void 0 : ge.name_card) != null && Ne.display && !((Oe = (Fe = (Se = u[7].uiConfigV2) == null ? void 0 : Se.home_page) == null ? void 0 : Fe.product) != null && Oe.display) && u[24] !== U.NON_SF_FLOW && ((ye = (Te = u[7].uiConfigV2.home_page) == null ? void 0 : Te.name_card) == null ? void 0 : ye.type) !== "ATTACHED" ? "bottom: 35px;" : ""), r.$set(R), u[28] == "true" && u[21] ? $ ? ($.p(u, p), p[0] & 2097152 && m($, 1)) : ($ = gi(u), $.c(), m($, 1), $.m(f, null)) : $ && (O(), d($, 1, 1, () => {
                $ = null
            }), T()), (!h || p[0] & 128) && H(f, "height", Pe() == "Mobile" ? (Ge = (Ye = (je = (W = u[7]) == null ? void 0 : W.uiConfigV2) == null ? void 0 : je.home_page) == null ? void 0 : Ye.home_feed_video_card_size) == null ? void 0 : Ge.mobile_view_card_height : (Xe = (Qe = (Ke = (Je = u[7]) == null ? void 0 : Je.uiConfigV2) == null ? void 0 : Ke.home_page) == null ? void 0 : Qe.home_feed_video_card_size) == null ? void 0 : Xe.height);
            let Y = V;
            V = q(u), V === Y ? w[V].p(u, p) : (O(), d(w[Y], 1, 1, () => {
                w[Y] = null
            }), T(), A = w[V], A ? A.p(u, p) : (A = w[V] = Z[V](u), A.c()), m(A, 1), A.m(k, null)), (!h || p[0] & 128 && v !== (v = `${u[7].brandId=="d6965a49a7"?"background:#FCFBEB":""}`)) && E(k, "style", v), (!h || p[0] & 128 && c !== (c = "containers lively_sf_container_hover " + (u[7].brandId == "26968f0e55" ? "brandSpecific" : "") + " svelte-2re55e")) && E(n, "class", c), (!h || p[0] & 128) && H(n, "width", Pe() == "Mobile" ? (ni = (ii = (ei = (xe = u[7]) == null ? void 0 : xe.uiConfigV2) == null ? void 0 : ei.home_page) == null ? void 0 : ii.home_feed_video_card_size) == null ? void 0 : ni.mobile_view_card_width : (ti = (fi = (li = (oi = u[7]) == null ? void 0 : oi.uiConfigV2) == null ? void 0 : li.home_page) == null ? void 0 : fi.home_feed_video_card_size) == null ? void 0 : ti.width), (!h || p[0] & 2048) && H(n, "overflow", u[11] ? "" : "hidden"), (!h || p[0] & 2048) && H(n, "background-color", u[11] ? "" : "transparent"), (!h || p[0] & 128) && H(n, "box-shadow", (ai = (ri = (si = u[7].uiConfigV2) == null ? void 0 : si.home_page) == null ? void 0 : ri.home_feed_card_styles) != null && ai.card_shadow ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none"), (!h || p[0] & 128) && H(n, "border-radius", (pi = (ui = (_i = u[7].uiConfigV2) == null ? void 0 : _i.home_page) == null ? void 0 : ui.home_feed_card_styles) == null ? void 0 : pi.card_border_radius)
        },
        i(u) {
            h || (m(b), m(a.$$.fragment, u), m(l.$$.fragment, u), m(r.$$.fragment, u), m($), m(A), h = !0)
        },
        o(u) {
            d(b), d(a.$$.fragment, u), d(l.$$.fragment, u), d(r.$$.fragment, u), d($), d(A), h = !1
        },
        d(u) {
            u && F(e), b && b.d(), N(a), N(l), N(r), $ && $.d(), w[V].d(), y = !1, Ze(C)
        }
    }
}

function ln(s, e, n) {
    var Ve, Ie, Le, u;
    let f, {
            data: t
        } = e,
        {
            onItemClick: a
        } = e,
        {
            index: i
        } = e,
        {
            activeIndex: l
        } = e,
        {
            pos: o
        } = e;
    const r = Fi(o);
    Ei(s, r, p => n(7, f = p));
    let _ = f.uiConfigV2,
        g = f.flowType,
        k = "",
        V, A = !1,
        v = 0,
        c = {},
        h, y = [],
        C = {
            loop: !0,
            axis: "x",
            startIndex: 0
        },
        b, $ = !1;
    f.brandId == "26968f0e55";
    let Z = {
            like: (Ie = (Ve = f.uiConfigV2) == null ? void 0 : Ve.home_page) == null ? void 0 : Ie.like,
            share: (u = (Le = f.uiConfigV2) == null ? void 0 : Le.home_page) == null ? void 0 : u.share
        },
        w = Oi(o),
        q = null,
        D = null,
        J = null,
        x = null,
        ee = null,
        ie = null,
        ne = null,
        oe = null,
        we = !1;
    const Ae = p => {
            const B = p.match(/^\d+%/);
            n(8, k = B ? B[0] : "")
        },
        ke = p => {};

    function De(p) {
        b = p.detail, b.on("select", async () => {
            n(0, l = b.selectedScrollSnap())
        }), b.scrollTo(0), n(12, C.startIndex = 0, C)
    }
    const $e = p => {
            p.preventDefault(), p.stopPropagation(), n(13, $ = !0), b && b.scrollNext()
        },
        Ee = p => Ti(p, f.selectedSFLikes, t, o),
        We = p => yi(p, "home", !1, t, v, o, f.selectedSFShares),
        ze = p => $e(p),
        Be = p => $e(p),
        Re = () => {
            a(t, i)
        },
        He = () => ke(),
        Me = () => ke(),
        qe = () => ke();
    return s.$$set = p => {
        "data" in p && n(4, t = p.data), "onItemClick" in p && n(1, a = p.onItemClick), "index" in p && n(2, i = p.index), "activeIndex" in p && n(0, l = p.activeIndex), "pos" in p && n(3, o = p.pos)
    }, s.$$.update = () => {
        var p, B, j, R, Y, K, Q, le, fe, te, se, re, ae, _e, ue, pe, me, ce, de, he, ge, Ne, Se, Fe, Oe, Te, ye;
        s.$$.dirty[0] & 16 && (t && (t == null ? void 0 : t.is_plp) == !0 && (n(5, A = !0), n(10, c = t == null ? void 0 : t.plp_category)), t && (t.is_shoppable_feed_form || t.is_shoppable_feed_poll || t.is_shoppable_feed_quiz) && n(10, c = {
            name: t.name
        }), t && (t != null && t.is_custom_link) && (n(6, we = !0), n(10, c = {
            name: (p = t == null ? void 0 : t.custom_link) == null ? void 0 : p.title
        }))), s.$$.dirty[0] & 224 && (f.flowType === U.NON_SF_FLOW && ((R = (j = (B = f.uiConfigV2) == null ? void 0 : B.home_page) == null ? void 0 : j.product) != null && R.display) && Ce(() =>
            import ("./NonShopifyProductConainerTheme1-Do3O_XRI.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]),
            import.meta.url).then(W => {
            n(14, q = W.default)
        }), f.flowType === U.NON_SF_FLOW && ((Q = (K = (Y = f.uiConfigV2) == null ? void 0 : Y.home_page) == null ? void 0 : K.product) != null && Q.display) && Ce(() =>
            import ("./NonShopifyProductConainerTheme2-lCvMufeF.js"), __vite__mapDeps([15, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14]),
            import.meta.url).then(W => {
            n(15, D = W.default)
        }), f.flowType === U.SF_FLOW && ((te = (fe = (le = f.uiConfigV2) == null ? void 0 : le.home_page) == null ? void 0 : fe.product) != null && te.display) && Ce(() =>
            import ("./ShopifyProductContainerTheme1V2-BO8Qzi8u.js"), __vite__mapDeps([16, 2, 1, 3, 4, 17, 8, 9, 10, 11, 12, 13, 14]),
            import.meta.url).then(W => {
            n(16, J = W.default)
        }), f.flowType === U.SF_FLOW && ((ae = (re = (se = f.uiConfigV2) == null ? void 0 : se.home_page) == null ? void 0 : re.product) == null ? void 0 : ae.layout) == "flex-row" && ((pe = (ue = (_e = f.uiConfigV2) == null ? void 0 : _e.home_page) == null ? void 0 : ue.product) != null && pe.display) && Ce(() =>
            import ("./ShopifyProductContainerTheme4-DmsWGrw6.js"), __vite__mapDeps([18, 1, 2, 3, 4, 17, 5, 6, 8, 9, 10, 11, 12, 13, 14]),
            import.meta.url).then(W => {
            n(17, x = W.default)
        }), f.flowType === U.SF_FLOW && ((de = (ce = (me = f.uiConfigV2) == null ? void 0 : me.home_page) == null ? void 0 : ce.name_card) != null && de.display) && Ce(() =>
            import ("./ShopifyHomePageNameCard-DXfQKyqY.js"), __vite__mapDeps([19, 1, 2, 3, 4]),
            import.meta.url).then(W => {
            n(18, ee = W.default)
        }), (A || we) && ((Ne = (ge = (he = f.uiConfigV2) == null ? void 0 : he.home_page) == null ? void 0 : ge.product) != null && Ne.display) && Ce(() =>
            import ("./CategoryDetails-DwtjYq71.js"), __vite__mapDeps([20, 1, 2, 3, 4, 10]),
            import.meta.url).then(W => {
            n(19, ie = W.default)
        }), (Fe = (Se = f == null ? void 0 : f.uiConfigV2) == null ? void 0 : Se.home_page.discount) != null && Fe.display && f.flowType == U.SF_FLOW && Ce(() =>
            import ("./DiscountChipComponent-tVrxd27-.js"), __vite__mapDeps([21, 1, 9, 2, 3, 4]),
            import.meta.url).then(W => {
            n(20, ne = W.default)
        }), w == "true" && Ce(() =>
            import ("./CreatedTimeTagComponent-CE2vgwzj.js"), __vite__mapDeps([22, 1]),
            import.meta.url).then(W => {
            n(21, oe = W.default)
        })), s.$$.dirty[0] & 128 && n(11, h = (ye = (Te = (Oe = f.uiConfigV2) == null ? void 0 : Oe.home_page) == null ? void 0 : Te.product) == null ? void 0 : ye.display)
    }, [l, a, i, o, t, A, we, f, k, v, c, h, C, $, q, D, J, x, ee, ie, ne, oe, r, _, g, V, y, Z, w, Ae, ke, De, $e, Ee, We, ze, Be, Re, He, Me, qe]
}
class vn extends Pi {
    constructor(e) {
        super(), Ai(this, e, ln, on, Di, {
            data: 4,
            onItemClick: 1,
            index: 2,
            activeIndex: 0,
            pos: 3
        }, null, [-1, -1])
    }
}
export {
    vn as
    default
};