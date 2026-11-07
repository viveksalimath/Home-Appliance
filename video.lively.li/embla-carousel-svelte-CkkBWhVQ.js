import {
    c as r,
    a as u,
    b as g
} from "./embla-carousel-reactive-utils-DkegjUUZ.js";
import {
    E as i
} from "./embla-carousel-CvuiBM5S.js";

function e(s, a = {
    options: {},
    plugins: []
}) {
    let t = a,
        n;
    return r() && (i.globalOptions = e.globalOptions, n = i(s, t.options, t.plugins), n.on("init", () => s.dispatchEvent(new CustomEvent("emblaInit", {
        detail: n
    })))), {
        destroy: () => {
            n && n.destroy()
        },
        update: o => {
            const l = !u(t.options, o.options),
                p = !g(t.plugins, o.plugins);
            !l && !p || (t = o, n && n.reInit(t.options, t.plugins))
        }
    }
}
e.globalOptions = void 0;
export {
    e
};