import {
    a7 as l,
    a8 as p
} from "./LIVELY_SF_FEED.js";
const d = (r, i = null) => {
        var t;
        const o = [];
        for (const a of r.product_info || []) {
            const c = a.variants || [];
            let e = null;
            if (c.length > 0) {
                for (let s = 0; s < c.length; s++) {
                    const n = c[s];
                    if (n != null && n.available) {
                        e = n;
                        break
                    }
                }
                e || (e = c[0])
            } else e = {
                price: a.price || 0,
                compare_at_price: a.compare_at_price || 0,
                featured_image: {
                    src: a.featured_image
                },
                available: !0
            };
            o.push({
                name: a.product || (a == null ? void 0 : a.title),
                price: Number((e.price / 100).toFixed(2)),
                offer: m(e.compare_at_price, e.price),
                productImage: ((t = e == null ? void 0 : e.featured_image) == null ? void 0 : t.src) || a.featured_image,
                available: e.available,
                productInfo: a,
                compare_at_price: Number((e.compare_at_price / 100).toFixed(2))
            })
        }
        return o
    },
    m = (r, i) => {
        const o = parseFloat(r),
            t = parseFloat(i);
        if (isNaN(o) || isNaN(t)) return "";
        const a = l();
        let c = (o - t) / o * 100;
        const e = a === "ec10ab1719" ? Math.ceil(c) : Math.round(c);
        return e <= 0 ? "" : `${e}%`
    },
    f = (r, i) => {
        const o = i.format ? ? "decimal";
        let t;
        const a = i.prefix;
        switch (console.log("getPriceText priceConfig", i.format), o) {
            case "integer":
                t = Math.round(r);
                break;
            case "comma":
                t = parseInt(r).toLocaleString();
                break;
            case "decimal":
                t = parseFloat(r).toFixed(2);
                break;
            default:
                t = parseFloat(r).toFixed(2);
                break
        }
        const c = p();
        return a ? `${c} ${t}` : t
    },
    g = r => `${Math.round(r/100)}`;
export {
    m as a, f as b, g as c, d as g
};