import {
    S as J,
    i as Q,
    s as T,
    e as O,
    b as u,
    v as c,
    c as U,
    z as R,
    x as q,
    k as j,
    I as W,
    l as X,
    o as Y,
    K as D,
    u as z
} from "./svelte-BxdCAXSv.js";
import {
    a as Z,
    D as x,
    U as $,
    g as ee
} from "./LIVELY_SF_FEED.js";
import "./CustomizationApp-BSEDS49n.js";

function L(o) {
    let e, t, r, f;
    return {
        c() {
            var n, i;
            e = O("video"), u(e, "id", o[1]), u(e, "class", t = "videoElement lively_sf_video_styles " + o[3] + " svelte-18ym726"), c(e, "border-radius", o[8]), u(e, "width", "100%"), u(e, "height", "100%"), e.muted = !0, D(e.src, r = o[5].layoutKey == "457d293e5d" ? o[0].streaming_url : (n = o[0]) == null ? void 0 : n.thumbnail) || u(e, "src", r), u(e, "poster", f = `${(i=o[0])==null?void 0:i.thumbnail_image}&height=500&width=400`), u(e, "preload", "none"), e.playsInline = !0, e.loop = !0
        },
        m(n, i) {
            U(n, e, i), o[14](e)
        },
        p(n, i) {
            var l, a;
            i & 2 && u(e, "id", n[1]), i & 8 && t !== (t = "videoElement lively_sf_video_styles " + n[3] + " svelte-18ym726") && u(e, "class", t), i & 256 && c(e, "border-radius", n[8]), i & 33 && !D(e.src, r = n[5].layoutKey == "457d293e5d" ? n[0].streaming_url : (l = n[0]) == null ? void 0 : l.thumbnail) && u(e, "src", r), i & 1 && f !== (f = `${(a=n[0])==null?void 0:a.thumbnail_image}&height=500&width=400`) && u(e, "poster", f)
        },
        d(n) {
            n && j(e), o[14](null)
        }
    }
}

function se(o) {
    let e, t = o[5] && o[5].inViewPorts.includes(o[2]) || o[7] == "3d_scroll",
        r, f, n, i = t && L(o);
    return {
        c() {
            e = O("div"), i && i.c(), u(e, "class", r = "videoElement " + o[3] + " svelte-18ym726"), c(e, "background-color", o[7] == "3d_scroll" ? "#111111" : "#f2f2f2"), c(e, "border-radius", o[8])
        },
        m(l, a) {
            U(l, e, a), i && i.m(e, null), o[15](e), f || (n = [R(e, "mouseenter", o[16]), R(e, "touchstart", o[17], {
                passive: !0
            })], f = !0)
        },
        p(l, [a]) {
            a & 164 && (t = l[5] && l[5].inViewPorts.includes(l[2]) || l[7] == "3d_scroll"), t ? i ? i.p(l, a) : (i = L(l), i.c(), i.m(e, null)) : i && (i.d(1), i = null), a & 8 && r !== (r = "videoElement " + l[3] + " svelte-18ym726") && u(e, "class", r), a & 128 && c(e, "background-color", l[7] == "3d_scroll" ? "#111111" : "#f2f2f2"), a & 256 && c(e, "border-radius", l[8])
        },
        i: q,
        o: q,
        d(l) {
            l && j(e), i && i.d(), o[15](null), f = !1, W(n)
        }
    }
}

function oe(o, e, t) {
    let r, {
            videoInfo: f
        } = e,
        {
            refName: n
        } = e,
        {
            bottomBorderRadius: i = !1
        } = e,
        {
            pos: l
        } = e,
        {
            index: a
        } = e,
        {
            autoplay: v = !0
        } = e,
        {
            customStyles: w = ""
        } = e,
        d, b;
    const V = Z(l);
    X(o, V, s => t(5, r = s));
    let k, _, S;
    Y(() => {
        new IntersectionObserver(y => {
            y.forEach(g => {
                if (g.intersectionRatio >= .25 && !r.inViewPorts.includes(a)) {
                    let h = r.inViewPorts;
                    h.push(a), x(l, h)
                }
            })
        }, {
            threshold: [.25]
        }).observe(b)
    });

    function A(s) {
        z[s ? "unshift" : "push"](() => {
            d = s, t(4, d)
        })
    }

    function F(s) {
        z[s ? "unshift" : "push"](() => {
            b = s, t(6, b)
        })
    }
    const G = () => {
            var s;
            return (s = d == null ? void 0 : d.play()) == null ? void 0 : s.catch(() => {})
        },
        H = () => {
            var s;
            return (s = d == null ? void 0 : d.play()) == null ? void 0 : s.catch(() => {})
        };
    return o.$$set = s => {
        "videoInfo" in s && t(0, f = s.videoInfo), "refName" in s && t(1, n = s.refName), "bottomBorderRadius" in s && t(10, i = s.bottomBorderRadius), "pos" in s && t(11, l = s.pos), "index" in s && t(2, a = s.index), "autoplay" in s && t(12, v = s.autoplay), "customStyles" in s && t(3, w = s.customStyles)
    }, o.$$.update = () => {
        var s, y, g, h, I, K, P, E, N, p, B, C, M;
        if (o.$$.dirty & 32) {
            const m = (y = (s = r.uiConfigV2) == null ? void 0 : s.home_page) == null ? void 0 : y.home_feed_autoplay;
            switch (ee() === "Mobile" ? m == null ? void 0 : m.mobile : m == null ? void 0 : m.desktop) {
                case "first_card":
                    t(13, _ = 1);
                    break;
                case "second_card":
                    t(13, _ = 2);
                    break;
                case "none":
                    t(13, _ = 0);
                    break;
                default:
                    t(13, _ = ((g = r.inViewPorts) == null ? void 0 : g.length) || 0)
            }
        }
        o.$$.dirty & 12340 && (t(7, k = $(r.layoutKey)), d && a < _ && (v ? (h = d.play()) == null || h.catch(() => {}) : d.pause())), o.$$.dirty & 1056 && t(8, S = i ? `${(P=(K=(I=r.uiConfigV2)==null?void 0:I.home_page)==null?void 0:K.home_feed_card_styles)==null?void 0:P.card_border_radius}` : `${(p=(N=(E=r.uiConfigV2)==null?void 0:E.home_page)==null?void 0:N.home_feed_card_styles)==null?void 0:p.card_border_radius} 
     ${(M=(C=(B=r.uiConfigV2)==null?void 0:B.home_page)==null?void 0:C.home_feed_card_styles)==null?void 0:M.card_border_radius} 
     0px 0px`)
    }, [f, n, a, w, d, r, b, k, S, V, i, l, v, _, A, F, G, H]
}
class ae extends J {
    constructor(e) {
        super(), Q(this, e, oe, se, T, {
            videoInfo: 0,
            refName: 1,
            bottomBorderRadius: 10,
            pos: 11,
            index: 2,
            autoplay: 12,
            customStyles: 3
        })
    }
}
export {
    ae as V
};