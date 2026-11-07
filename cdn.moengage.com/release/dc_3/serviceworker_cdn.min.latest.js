/*! For license information please see serviceworker_cdn.js.LICENSE.txt */
(() => {
    var e = {
            790(e, t, n) {
                var r = n(634).pS,
                    o = n(634).VR;
                e.exports = function e(t, n, r) {
                    function o(a, c) {
                        if (!n[a]) {
                            if (!t[a]) {
                                if (i) return i(a, !0);
                                var u = new Error("Cannot find module '" + a + "'");
                                throw u.code = "MODULE_NOT_FOUND", u
                            }
                            var s = n[a] = {
                                exports: {}
                            };
                            t[a][0].call(s.exports, function(e) {
                                return o(t[a][1][e] || e)
                            }, s, s.exports, e, t, n, r)
                        }
                        return n[a].exports
                    }
                    for (var i = void 0, a = 0; a < r.length; a++) o(r[a]);
                    return o
                }({
                    1: [function(e, t, o) {
                        (function(e) {
                            "use strict";
                            var n, o, i = e.MutationObserver || e.WebKitMutationObserver;
                            if (i) {
                                var a = 0,
                                    c = new i(l),
                                    u = e.document.createTextNode("");
                                c.observe(u, {
                                    characterData: !0
                                }), n = function() {
                                    u.data = a = ++a % 2
                                }
                            } else if (e.setImmediate || void 0 === e.MessageChannel) n = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function() {
                                var t = e.document.createElement("script");
                                t.onreadystatechange = function() {
                                    l(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null
                                }, e.document.documentElement.appendChild(t)
                            } : function() {
                                r(l, 0)
                            };
                            else {
                                var s = new e.MessageChannel;
                                s.port1.onmessage = l, n = function() {
                                    s.port2.postMessage(0)
                                }
                            }
                            var f = [];

                            function l() {
                                var e, t;
                                o = !0;
                                for (var n = f.length; n;) {
                                    for (t = f, f = [], e = -1; ++e < n;) t[e]();
                                    n = f.length
                                }
                                o = !1
                            }
                            t.exports = function(e) {
                                1 !== f.push(e) || o || n()
                            }
                        }).call(this, void 0 !== n.g ? n.g : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                    }, {}],
                    2: [function(e, t, n) {
                        "use strict";
                        var r = e(1);

                        function o() {}
                        var i = {},
                            a = ["REJECTED"],
                            c = ["FULFILLED"],
                            u = ["PENDING"];

                        function s(e) {
                            if ("function" != typeof e) throw new TypeError("resolver must be a function");
                            this.state = u, this.queue = [], this.outcome = void 0, e !== o && v(this, e)
                        }

                        function f(e, t, n) {
                            this.promise = e, "function" == typeof t && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), "function" == typeof n && (this.onRejected = n, this.callRejected = this.otherCallRejected)
                        }

                        function l(e, t, n) {
                            r(function() {
                                var r;
                                try {
                                    r = t(n)
                                } catch (t) {
                                    return i.reject(e, t)
                                }
                                r === e ? i.reject(e, new TypeError("Cannot resolve promise with itself")) : i.resolve(e, r)
                            })
                        }

                        function d(e) {
                            var t = e && e.then;
                            if (e && ("object" == typeof e || "function" == typeof e) && "function" == typeof t) return function() {
                                t.apply(e, arguments)
                            }
                        }

                        function v(e, t) {
                            var n = !1;

                            function r(t) {
                                n || (n = !0, i.reject(e, t))
                            }

                            function o(t) {
                                n || (n = !0, i.resolve(e, t))
                            }
                            var a = h(function() {
                                t(o, r)
                            });
                            "error" === a.status && r(a.value)
                        }

                        function h(e, t) {
                            var n = {};
                            try {
                                n.value = e(t), n.status = "success"
                            } catch (e) {
                                n.status = "error", n.value = e
                            }
                            return n
                        }
                        t.exports = s, s.prototype.catch = function(e) {
                            return this.then(null, e)
                        }, s.prototype.then = function(e, t) {
                            if ("function" != typeof e && this.state === c || "function" != typeof t && this.state === a) return this;
                            var n = new this.constructor(o);
                            return this.state !== u ? l(n, this.state === c ? e : t, this.outcome) : this.queue.push(new f(n, e, t)), n
                        }, f.prototype.callFulfilled = function(e) {
                            i.resolve(this.promise, e)
                        }, f.prototype.otherCallFulfilled = function(e) {
                            l(this.promise, this.onFulfilled, e)
                        }, f.prototype.callRejected = function(e) {
                            i.reject(this.promise, e)
                        }, f.prototype.otherCallRejected = function(e) {
                            l(this.promise, this.onRejected, e)
                        }, i.resolve = function(e, t) {
                            var n = h(d, t);
                            if ("error" === n.status) return i.reject(e, n.value);
                            var r = n.value;
                            if (r) v(e, r);
                            else {
                                e.state = c, e.outcome = t;
                                for (var o = -1, a = e.queue.length; ++o < a;) e.queue[o].callFulfilled(t)
                            }
                            return e
                        }, i.reject = function(e, t) {
                            e.state = a, e.outcome = t;
                            for (var n = -1, r = e.queue.length; ++n < r;) e.queue[n].callRejected(t);
                            return e
                        }, s.resolve = function(e) {
                            return e instanceof this ? e : i.resolve(new this(o), e)
                        }, s.reject = function(e) {
                            var t = new this(o);
                            return i.reject(t, e)
                        }, s.all = function(e) {
                            var t = this;
                            if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                            var n = e.length,
                                r = !1;
                            if (!n) return this.resolve([]);
                            for (var a = new Array(n), c = 0, u = -1, s = new this(o); ++u < n;) f(e[u], u);
                            return s;

                            function f(e, o) {
                                t.resolve(e).then(function(e) {
                                    a[o] = e, ++c !== n || r || (r = !0, i.resolve(s, a))
                                }, function(e) {
                                    r || (r = !0, i.reject(s, e))
                                })
                            }
                        }, s.race = function(e) {
                            var t = this;
                            if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                            var n = e.length,
                                r = !1;
                            if (!n) return this.resolve([]);
                            for (var a = -1, c = new this(o); ++a < n;) u(e[a]);
                            return c;

                            function u(e) {
                                t.resolve(e).then(function(e) {
                                    r || (r = !0, i.resolve(c, e))
                                }, function(e) {
                                    r || (r = !0, i.reject(c, e))
                                })
                            }
                        }
                    }, {
                        1: 1
                    }],
                    3: [function(e, t, r) {
                        (function(t) {
                            "use strict";
                            "function" != typeof t.Promise && (t.Promise = e(2))
                        }).call(this, void 0 !== n.g ? n.g : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                    }, {
                        2: 2
                    }],
                    4: [function(e, t, n) {
                        "use strict";
                        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                return typeof e
                            } : function(e) {
                                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                            },
                            i = function() {
                                try {
                                    if ("undefined" != typeof indexedDB) return indexedDB;
                                    if ("undefined" != typeof webkitIndexedDB) return webkitIndexedDB;
                                    if ("undefined" != typeof mozIndexedDB) return mozIndexedDB;
                                    if ("undefined" != typeof OIndexedDB) return OIndexedDB;
                                    if ("undefined" != typeof msIndexedDB) return msIndexedDB
                                } catch (e) {
                                    return
                                }
                            }();

                        function a(e, t) {
                            e = e || [], t = t || {};
                            try {
                                return new Blob(e, t)
                            } catch (o) {
                                if ("TypeError" !== o.name) throw o;
                                for (var n = new("undefined" != typeof BlobBuilder ? BlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : WebKitBlobBuilder), r = 0; r < e.length; r += 1) n.append(e[r]);
                                return n.getBlob(t.type)
                            }
                        }
                        void 0 === o && e(3);
                        var c = o;

                        function u(e, t) {
                            t && e.then(function(e) {
                                t(null, e)
                            }, function(e) {
                                t(e)
                            })
                        }

                        function s(e, t, n) {
                            "function" == typeof t && e.then(t), "function" == typeof n && e.catch(n)
                        }

                        function f(e) {
                            return "string" != typeof e && (console.warn(e + " used as a key, but it is not a string."), e = String(e)), e
                        }

                        function l() {
                            if (arguments.length && "function" == typeof arguments[arguments.length - 1]) return arguments[arguments.length - 1]
                        }
                        var d = "local-forage-detect-blob-support",
                            v = void 0,
                            h = {},
                            p = Object.prototype.toString,
                            m = "readonly",
                            g = "readwrite";

                        function y(e) {
                            for (var t = e.length, n = new ArrayBuffer(t), r = new Uint8Array(n), o = 0; o < t; o++) r[o] = e.charCodeAt(o);
                            return n
                        }

                        function b(e) {
                            var t = h[e.name],
                                n = {};
                            n.promise = new c(function(e, t) {
                                n.resolve = e, n.reject = t
                            }), t.deferredOperations.push(n), t.dbReady = t.dbReady ? t.dbReady.then(function() {
                                return n.promise
                            }) : n.promise
                        }

                        function _(e) {
                            var t = h[e.name].deferredOperations.pop();
                            if (t) return t.resolve(), t.promise
                        }

                        function w(e, t) {
                            var n = h[e.name].deferredOperations.pop();
                            if (n) return n.reject(t), n.promise
                        }

                        function I(e, t) {
                            return new c(function(n, r) {
                                if (h[e.name] = h[e.name] || {
                                        forages: [],
                                        db: null,
                                        dbReady: null,
                                        deferredOperations: []
                                    }, e.db) {
                                    if (!t) return n(e.db);
                                    b(e), e.db.close()
                                }
                                var o = [e.name];
                                t && o.push(e.version);
                                var a = i.open.apply(i, o);
                                t && (a.onupgradeneeded = function(t) {
                                    var n = a.result;
                                    try {
                                        n.createObjectStore(e.storeName), t.oldVersion <= 1 && n.createObjectStore(d)
                                    } catch (n) {
                                        if ("ConstraintError" !== n.name) throw n;
                                        console.warn('The database "' + e.name + '" has been upgraded from version ' + t.oldVersion + " to version " + t.newVersion + ', but the storage "' + e.storeName + '" already exists.')
                                    }
                                }), a.onerror = function(e) {
                                    e.preventDefault(), r(a.error)
                                }, a.onsuccess = function() {
                                    var t = a.result;
                                    t.onversionchange = function(e) {
                                        e.target.close()
                                    }, n(t), _(e)
                                }
                            })
                        }

                        function E(e) {
                            return I(e, !1)
                        }

                        function S(e) {
                            return I(e, !0)
                        }

                        function N(e, t) {
                            if (!e.db) return !0;
                            var n = !e.db.objectStoreNames.contains(e.storeName),
                                r = e.version > e.db.version;
                            if (e.version < e.db.version && (e.version !== t && console.warn('The database "' + e.name + "\" can't be downgraded from version " + e.db.version + " to version " + e.version + "."), e.version = e.db.version), r || n) {
                                if (n) {
                                    var o = e.db.version + 1;
                                    o > e.version && (e.version = o)
                                }
                                return !0
                            }
                            return !1
                        }

                        function D(e) {
                            return a([y(atob(e.data))], {
                                type: e.type
                            })
                        }

                        function O(e) {
                            return e && e.__local_forage_encoded_blob
                        }

                        function T(e) {
                            var t = this,
                                n = t._initReady().then(function() {
                                    var e = h[t._dbInfo.name];
                                    if (e && e.dbReady) return e.dbReady
                                });
                            return s(n, e, e), n
                        }

                        function j(e, t, n, r) {
                            void 0 === r && (r = 1);
                            try {
                                var o = e.db.transaction(e.storeName, t);
                                n(null, o)
                            } catch (o) {
                                if (r > 0 && (!e.db || "InvalidStateError" === o.name || "NotFoundError" === o.name)) return c.resolve().then(function() {
                                    if (!e.db || "NotFoundError" === o.name && !e.db.objectStoreNames.contains(e.storeName) && e.version <= e.db.version) return e.db && (e.version = e.db.version + 1), S(e)
                                }).then(function() {
                                    return function(e) {
                                        b(e);
                                        for (var t = h[e.name], n = t.forages, r = 0; r < n.length; r++) {
                                            var o = n[r];
                                            o._dbInfo.db && (o._dbInfo.db.close(), o._dbInfo.db = null)
                                        }
                                        return e.db = null, E(e).then(function(t) {
                                            return e.db = t, N(e) ? S(e) : t
                                        }).then(function(r) {
                                            e.db = t.db = r;
                                            for (var o = 0; o < n.length; o++) n[o]._dbInfo.db = r
                                        }).catch(function(t) {
                                            throw w(e, t), t
                                        })
                                    }(e).then(function() {
                                        j(e, t, n, r - 1)
                                    })
                                }).catch(n);
                                n(o)
                            }
                        }
                        var A = {
                                _driver: "asyncStorage",
                                _initStorage(e) {
                                    var t = this,
                                        n = {
                                            db: null
                                        };
                                    if (e)
                                        for (var r in e) n[r] = e[r];
                                    var o = h[n.name];
                                    o || (h[n.name] = o = {
                                        forages: [],
                                        db: null,
                                        dbReady: null,
                                        deferredOperations: []
                                    }), o.forages.push(t), t._initReady || (t._initReady = t.ready, t.ready = T);
                                    var i = [];

                                    function a() {
                                        return c.resolve()
                                    }
                                    for (var u = 0; u < o.forages.length; u++) {
                                        var s = o.forages[u];
                                        s !== t && i.push(s._initReady().catch(a))
                                    }
                                    var f = o.forages.slice(0);
                                    return c.all(i).then(function() {
                                        return n.db = o.db, E(n)
                                    }).then(function(e) {
                                        return n.db = e, N(n, t._defaultConfig.version) ? S(n) : e
                                    }).then(function(e) {
                                        n.db = o.db = e, t._dbInfo = n;
                                        for (var r = 0; r < f.length; r++) {
                                            var i = f[r];
                                            i !== t && (i._dbInfo.db = n.db, i._dbInfo.version = n.version)
                                        }
                                    })
                                },
                                _support: function() {
                                    try {
                                        if (!i || !i.open) return !1;
                                        var e = "undefined" != typeof openDatabase && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform),
                                            t = "function" == typeof fetch && -1 !== fetch.toString().indexOf("[native code");
                                        return (!e || t) && "undefined" != typeof indexedDB && "undefined" != typeof IDBKeyRange
                                    } catch (e) {
                                        return !1
                                    }
                                }(),
                                iterate(e, t) {
                                    var n = this,
                                        r = new c(function(t, r) {
                                            n.ready().then(function() {
                                                j(n._dbInfo, m, function(o, i) {
                                                    if (o) return r(o);
                                                    try {
                                                        var a = i.objectStore(n._dbInfo.storeName).openCursor(),
                                                            c = 1;
                                                        a.onsuccess = function() {
                                                            var n = a.result;
                                                            if (n) {
                                                                var r = n.value;
                                                                O(r) && (r = D(r));
                                                                var o = e(r, n.key, c++);
                                                                void 0 !== o ? t(o) : n.continue()
                                                            } else t()
                                                        }, a.onerror = function() {
                                                            r(a.error)
                                                        }
                                                    } catch (e) {
                                                        r(e)
                                                    }
                                                })
                                            }).catch(r)
                                        });
                                    return u(r, t), r
                                },
                                getItem(e, t) {
                                    var n = this;
                                    e = f(e);
                                    var r = new c(function(t, r) {
                                        n.ready().then(function() {
                                            j(n._dbInfo, m, function(o, i) {
                                                if (o) return r(o);
                                                try {
                                                    var a = i.objectStore(n._dbInfo.storeName).get(e);
                                                    a.onsuccess = function() {
                                                        var e = a.result;
                                                        void 0 === e && (e = null), O(e) && (e = D(e)), t(e)
                                                    }, a.onerror = function() {
                                                        r(a.error)
                                                    }
                                                } catch (e) {
                                                    r(e)
                                                }
                                            })
                                        }).catch(r)
                                    });
                                    return u(r, t), r
                                },
                                setItem(e, t, n) {
                                    var r = this;
                                    e = f(e);
                                    var o = new c(function(n, o) {
                                        var i;
                                        r.ready().then(function() {
                                            return i = r._dbInfo, "[object Blob]" === p.call(t) ? function(e) {
                                                return "boolean" == typeof v ? c.resolve(v) : function(e) {
                                                    return new c(function(t) {
                                                        var n = e.transaction(d, g),
                                                            r = a([""]);
                                                        n.objectStore(d).put(r, "key"), n.onabort = function(e) {
                                                            e.preventDefault(), e.stopPropagation(), t(!1)
                                                        }, n.oncomplete = function() {
                                                            var e = navigator.userAgent.match(/Chrome\/(\d+)/),
                                                                n = navigator.userAgent.match(/Edge\//);
                                                            t(n || !e || parseInt(e[1], 10) >= 43)
                                                        }
                                                    }).catch(function() {
                                                        return !1
                                                    })
                                                }(e).then(function(e) {
                                                    return v = e
                                                })
                                            }(i.db).then(function(e) {
                                                return e ? t : (n = t, new c(function(e, t) {
                                                    var r = new FileReader;
                                                    r.onerror = t, r.onloadend = function(t) {
                                                        var r = btoa(t.target.result || "");
                                                        e({
                                                            __local_forage_encoded_blob: !0,
                                                            data: r,
                                                            type: n.type
                                                        })
                                                    }, r.readAsBinaryString(n)
                                                }));
                                                var n
                                            }) : t
                                        }).then(function(t) {
                                            j(r._dbInfo, g, function(i, a) {
                                                if (i) return o(i);
                                                try {
                                                    var c = a.objectStore(r._dbInfo.storeName);
                                                    null === t && (t = void 0);
                                                    var u = c.put(t, e);
                                                    a.oncomplete = function() {
                                                        void 0 === t && (t = null), n(t)
                                                    }, a.onabort = a.onerror = function() {
                                                        o(u.error ? u.error : u.transaction.error)
                                                    }
                                                } catch (e) {
                                                    o(e)
                                                }
                                            })
                                        }).catch(o)
                                    });
                                    return u(o, n), o
                                },
                                removeItem(e, t) {
                                    var n = this;
                                    e = f(e);
                                    var r = new c(function(t, r) {
                                        n.ready().then(function() {
                                            j(n._dbInfo, g, function(o, i) {
                                                if (o) return r(o);
                                                try {
                                                    var a = i.objectStore(n._dbInfo.storeName).delete(e);
                                                    i.oncomplete = function() {
                                                        t()
                                                    }, i.onerror = function() {
                                                        r(a.error)
                                                    }, i.onabort = function() {
                                                        r(a.error ? a.error : a.transaction.error)
                                                    }
                                                } catch (e) {
                                                    r(e)
                                                }
                                            })
                                        }).catch(r)
                                    });
                                    return u(r, t), r
                                },
                                clear(e) {
                                    var t = this,
                                        n = new c(function(e, n) {
                                            t.ready().then(function() {
                                                j(t._dbInfo, g, function(r, o) {
                                                    if (r) return n(r);
                                                    try {
                                                        var i = o.objectStore(t._dbInfo.storeName).clear();
                                                        o.oncomplete = function() {
                                                            e()
                                                        }, o.onabort = o.onerror = function() {
                                                            n(i.error ? i.error : i.transaction.error)
                                                        }
                                                    } catch (e) {
                                                        n(e)
                                                    }
                                                })
                                            }).catch(n)
                                        });
                                    return u(n, e), n
                                },
                                length(e) {
                                    var t = this,
                                        n = new c(function(e, n) {
                                            t.ready().then(function() {
                                                j(t._dbInfo, m, function(r, o) {
                                                    if (r) return n(r);
                                                    try {
                                                        var i = o.objectStore(t._dbInfo.storeName).count();
                                                        i.onsuccess = function() {
                                                            e(i.result)
                                                        }, i.onerror = function() {
                                                            n(i.error)
                                                        }
                                                    } catch (e) {
                                                        n(e)
                                                    }
                                                })
                                            }).catch(n)
                                        });
                                    return u(n, e), n
                                },
                                key(e, t) {
                                    var n = this,
                                        r = new c(function(t, r) {
                                            e < 0 ? t(null) : n.ready().then(function() {
                                                j(n._dbInfo, m, function(o, i) {
                                                    if (o) return r(o);
                                                    try {
                                                        var a = i.objectStore(n._dbInfo.storeName),
                                                            c = !1,
                                                            u = a.openKeyCursor();
                                                        u.onsuccess = function() {
                                                            var n = u.result;
                                                            n ? 0 === e || c ? t(n.key) : (c = !0, n.advance(e)) : t(null)
                                                        }, u.onerror = function() {
                                                            r(u.error)
                                                        }
                                                    } catch (e) {
                                                        r(e)
                                                    }
                                                })
                                            }).catch(r)
                                        });
                                    return u(r, t), r
                                },
                                keys(e) {
                                    var t = this,
                                        n = new c(function(e, n) {
                                            t.ready().then(function() {
                                                j(t._dbInfo, m, function(r, o) {
                                                    if (r) return n(r);
                                                    try {
                                                        var i = o.objectStore(t._dbInfo.storeName).openKeyCursor(),
                                                            a = [];
                                                        i.onsuccess = function() {
                                                            var t = i.result;
                                                            t ? (a.push(t.key), t.continue()) : e(a)
                                                        }, i.onerror = function() {
                                                            n(i.error)
                                                        }
                                                    } catch (e) {
                                                        n(e)
                                                    }
                                                })
                                            }).catch(n)
                                        });
                                    return u(n, e), n
                                },
                                dropInstance(e, t) {
                                    t = l.apply(this, arguments);
                                    var n, r = this.config();
                                    return (e = "function" != typeof e && e || {}).name || (e.name = e.name || r.name, e.storeName = e.storeName || r.storeName), u(n = e.name ? (e.name === r.name && this._dbInfo.db ? c.resolve(this._dbInfo.db) : E(e).then(function(t) {
                                        var n = h[e.name],
                                            r = n.forages;
                                        n.db = t;
                                        for (var o = 0; o < r.length; o++) r[o]._dbInfo.db = t;
                                        return t
                                    })).then(e.storeName ? function(t) {
                                        if (t.objectStoreNames.contains(e.storeName)) {
                                            var n = t.version + 1;
                                            b(e);
                                            var r = h[e.name],
                                                o = r.forages;
                                            t.close();
                                            for (var a = 0; a < o.length; a++) {
                                                var u = o[a];
                                                u._dbInfo.db = null, u._dbInfo.version = n
                                            }
                                            var s = new c(function(t, r) {
                                                var o = i.open(e.name, n);
                                                o.onerror = function(e) {
                                                    o.result.close(), r(e)
                                                }, o.onupgradeneeded = function() {
                                                    o.result.deleteObjectStore(e.storeName)
                                                }, o.onsuccess = function() {
                                                    var e = o.result;
                                                    e.close(), t(e)
                                                }
                                            });
                                            return s.then(function(e) {
                                                r.db = e;
                                                for (var t = 0; t < o.length; t++) {
                                                    var n = o[t];
                                                    n._dbInfo.db = e, _(n._dbInfo)
                                                }
                                            }).catch(function(t) {
                                                throw (w(e, t) || c.resolve()).catch(function() {}), t
                                            })
                                        }
                                    } : function(t) {
                                        b(e);
                                        var n = h[e.name],
                                            r = n.forages;
                                        t.close();
                                        for (var o = 0; o < r.length; o++) r[o]._dbInfo.db = null;
                                        var a = new c(function(t, n) {
                                            var r = i.deleteDatabase(e.name);
                                            r.onerror = function() {
                                                var e = r.result;
                                                e && e.close(), n(r.error)
                                            }, r.onblocked = function() {
                                                console.warn('dropInstance blocked for database "' + e.name + '" until all open connections are closed')
                                            }, r.onsuccess = function() {
                                                var e = r.result;
                                                e && e.close(), t(e)
                                            }
                                        });
                                        return a.then(function(e) {
                                            n.db = e;
                                            for (var t = 0; t < r.length; t++) _(r[t]._dbInfo)
                                        }).catch(function(t) {
                                            throw (w(e, t) || c.resolve()).catch(function() {}), t
                                        })
                                    }) : c.reject("Invalid arguments"), t), n
                                }
                            },
                            R = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                            k = /^~~local_forage_type~([^~]+)~/,
                            x = "__lfsc__:",
                            C = "arbf",
                            B = "blob",
                            M = "si08",
                            P = "ui08",
                            L = "uic8",
                            U = "si16",
                            F = "si32",
                            W = "ur16",
                            z = "ui32",
                            q = "fl32",
                            V = "fl64",
                            $ = Object.prototype.toString;

                        function K(e) {
                            var t, n, r, o, i, a = .75 * e.length,
                                c = e.length,
                                u = 0;
                            "=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
                            var s = new ArrayBuffer(a),
                                f = new Uint8Array(s);
                            for (t = 0; t < c; t += 4) n = R.indexOf(e[t]), r = R.indexOf(e[t + 1]), o = R.indexOf(e[t + 2]), i = R.indexOf(e[t + 3]), f[u++] = n << 2 | r >> 4, f[u++] = (15 & r) << 4 | o >> 2, f[u++] = (3 & o) << 6 | 63 & i;
                            return s
                        }

                        function J(e) {
                            var t, n = new Uint8Array(e),
                                r = "";
                            for (t = 0; t < n.length; t += 3) r += R[n[t] >> 2], r += R[(3 & n[t]) << 4 | n[t + 1] >> 4], r += R[(15 & n[t + 1]) << 2 | n[t + 2] >> 6], r += R[63 & n[t + 2]];
                            return n.length % 3 == 2 ? r = r.substring(0, r.length - 1) + "=" : n.length % 3 == 1 && (r = r.substring(0, r.length - 2) + "=="), r
                        }
                        var H = {
                            serialize(e, t) {
                                var n = "";
                                if (e && (n = $.call(e)), e && ("[object ArrayBuffer]" === n || e.buffer && "[object ArrayBuffer]" === $.call(e.buffer))) {
                                    var r, o = x;
                                    e instanceof ArrayBuffer ? (r = e, o += C) : (r = e.buffer, "[object Int8Array]" === n ? o += M : "[object Uint8Array]" === n ? o += P : "[object Uint8ClampedArray]" === n ? o += L : "[object Int16Array]" === n ? o += U : "[object Uint16Array]" === n ? o += W : "[object Int32Array]" === n ? o += F : "[object Uint32Array]" === n ? o += z : "[object Float32Array]" === n ? o += q : "[object Float64Array]" === n ? o += V : t(new Error("Failed to get type for BinaryArray"))), t(o + J(r))
                                } else if ("[object Blob]" === n) {
                                    var i = new FileReader;
                                    i.onload = function() {
                                        var n = "~~local_forage_type~" + e.type + "~" + J(this.result);
                                        t(x + B + n)
                                    }, i.readAsArrayBuffer(e)
                                } else try {
                                    t(JSON.stringify(e))
                                } catch (n) {
                                    console.error("Couldn't convert value into a JSON string: ", e), t(null, n)
                                }
                            },
                            deserialize(e) {
                                if (e.substring(0, 9) !== x) return JSON.parse(e);
                                var t, n = e.substring(13),
                                    r = e.substring(9, 13);
                                if (r === B && k.test(n)) {
                                    var o = n.match(k);
                                    t = o[1], n = n.substring(o[0].length)
                                }
                                var i = K(n);
                                switch (r) {
                                    case C:
                                        return i;
                                    case B:
                                        return a([i], {
                                            type: t
                                        });
                                    case M:
                                        return new Int8Array(i);
                                    case P:
                                        return new Uint8Array(i);
                                    case L:
                                        return new Uint8ClampedArray(i);
                                    case U:
                                        return new Int16Array(i);
                                    case W:
                                        return new Uint16Array(i);
                                    case F:
                                        return new Int32Array(i);
                                    case z:
                                        return new Uint32Array(i);
                                    case q:
                                        return new Float32Array(i);
                                    case V:
                                        return new Float64Array(i);
                                    default:
                                        throw new Error("Unkown type: " + r)
                                }
                            },
                            stringToBuffer: K,
                            bufferToString: J
                        };

                        function X(e, t, n, r) {
                            e.executeSql("CREATE TABLE IF NOT EXISTS " + t.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], n, r)
                        }

                        function Q(e, t, n, r, o, i) {
                            e.executeSql(n, r, o, function(e, a) {
                                a.code === a.SYNTAX_ERR ? e.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [t.storeName], function(e, c) {
                                    c.rows.length ? i(e, a) : X(e, t, function() {
                                        e.executeSql(n, r, o, i)
                                    }, i)
                                }, i) : i(e, a)
                            }, i)
                        }

                        function G(e, t, n, r) {
                            var o = this;
                            e = f(e);
                            var i = new c(function(i, a) {
                                o.ready().then(function() {
                                    void 0 === t && (t = null);
                                    var c = t,
                                        u = o._dbInfo;
                                    u.serializer.serialize(t, function(t, s) {
                                        s ? a(s) : u.db.transaction(function(n) {
                                            Q(n, u, "INSERT OR REPLACE INTO " + u.storeName + " (key, value) VALUES (?, ?)", [e, t], function() {
                                                i(c)
                                            }, function(e, t) {
                                                a(t)
                                            })
                                        }, function(t) {
                                            if (t.code === t.QUOTA_ERR) {
                                                if (r > 0) return void i(G.apply(o, [e, c, n, r - 1]));
                                                a(t)
                                            }
                                        })
                                    })
                                }).catch(a)
                            });
                            return u(i, n), i
                        }
                        var Y = {
                            _driver: "webSQLStorage",
                            _initStorage(e) {
                                var t = this,
                                    n = {
                                        db: null
                                    };
                                if (e)
                                    for (var r in e) n[r] = "string" != typeof e[r] ? e[r].toString() : e[r];
                                var o = new c(function(e, r) {
                                    try {
                                        n.db = openDatabase(n.name, String(n.version), n.description, n.size)
                                    } catch (e) {
                                        return r(e)
                                    }
                                    n.db.transaction(function(o) {
                                        X(o, n, function() {
                                            t._dbInfo = n, e()
                                        }, function(e, t) {
                                            r(t)
                                        })
                                    }, r)
                                });
                                return n.serializer = H, o
                            },
                            _support: "function" == typeof openDatabase,
                            iterate(e, t) {
                                var n = this,
                                    r = new c(function(t, r) {
                                        n.ready().then(function() {
                                            var o = n._dbInfo;
                                            o.db.transaction(function(n) {
                                                Q(n, o, "SELECT * FROM " + o.storeName, [], function(n, r) {
                                                    for (var i = r.rows, a = i.length, c = 0; c < a; c++) {
                                                        var u = i.item(c),
                                                            s = u.value;
                                                        if (s && (s = o.serializer.deserialize(s)), void 0 !== (s = e(s, u.key, c + 1))) return void t(s)
                                                    }
                                                    t()
                                                }, function(e, t) {
                                                    r(t)
                                                })
                                            })
                                        }).catch(r)
                                    });
                                return u(r, t), r
                            },
                            getItem(e, t) {
                                var n = this;
                                e = f(e);
                                var r = new c(function(t, r) {
                                    n.ready().then(function() {
                                        var o = n._dbInfo;
                                        o.db.transaction(function(n) {
                                            Q(n, o, "SELECT * FROM " + o.storeName + " WHERE key = ? LIMIT 1", [e], function(e, n) {
                                                var r = n.rows.length ? n.rows.item(0).value : null;
                                                r && (r = o.serializer.deserialize(r)), t(r)
                                            }, function(e, t) {
                                                r(t)
                                            })
                                        })
                                    }).catch(r)
                                });
                                return u(r, t), r
                            },
                            setItem(e, t, n) {
                                return G.apply(this, [e, t, n, 1])
                            },
                            removeItem(e, t) {
                                var n = this;
                                e = f(e);
                                var r = new c(function(t, r) {
                                    n.ready().then(function() {
                                        var o = n._dbInfo;
                                        o.db.transaction(function(n) {
                                            Q(n, o, "DELETE FROM " + o.storeName + " WHERE key = ?", [e], function() {
                                                t()
                                            }, function(e, t) {
                                                r(t)
                                            })
                                        })
                                    }).catch(r)
                                });
                                return u(r, t), r
                            },
                            clear(e) {
                                var t = this,
                                    n = new c(function(e, n) {
                                        t.ready().then(function() {
                                            var r = t._dbInfo;
                                            r.db.transaction(function(t) {
                                                Q(t, r, "DELETE FROM " + r.storeName, [], function() {
                                                    e()
                                                }, function(e, t) {
                                                    n(t)
                                                })
                                            })
                                        }).catch(n)
                                    });
                                return u(n, e), n
                            },
                            length(e) {
                                var t = this,
                                    n = new c(function(e, n) {
                                        t.ready().then(function() {
                                            var r = t._dbInfo;
                                            r.db.transaction(function(t) {
                                                Q(t, r, "SELECT COUNT(key) as c FROM " + r.storeName, [], function(t, n) {
                                                    var r = n.rows.item(0).c;
                                                    e(r)
                                                }, function(e, t) {
                                                    n(t)
                                                })
                                            })
                                        }).catch(n)
                                    });
                                return u(n, e), n
                            },
                            key(e, t) {
                                var n = this,
                                    r = new c(function(t, r) {
                                        n.ready().then(function() {
                                            var o = n._dbInfo;
                                            o.db.transaction(function(n) {
                                                Q(n, o, "SELECT key FROM " + o.storeName + " WHERE id = ? LIMIT 1", [e + 1], function(e, n) {
                                                    var r = n.rows.length ? n.rows.item(0).key : null;
                                                    t(r)
                                                }, function(e, t) {
                                                    r(t)
                                                })
                                            })
                                        }).catch(r)
                                    });
                                return u(r, t), r
                            },
                            keys(e) {
                                var t = this,
                                    n = new c(function(e, n) {
                                        t.ready().then(function() {
                                            var r = t._dbInfo;
                                            r.db.transaction(function(t) {
                                                Q(t, r, "SELECT key FROM " + r.storeName, [], function(t, n) {
                                                    for (var r = [], o = 0; o < n.rows.length; o++) r.push(n.rows.item(o).key);
                                                    e(r)
                                                }, function(e, t) {
                                                    n(t)
                                                })
                                            })
                                        }).catch(n)
                                    });
                                return u(n, e), n
                            },
                            dropInstance(e, t) {
                                t = l.apply(this, arguments);
                                var n = this.config();
                                (e = "function" != typeof e && e || {}).name || (e.name = e.name || n.name, e.storeName = e.storeName || n.storeName);
                                var r, o = this;
                                return u(r = e.name ? new c(function(t) {
                                    var r;
                                    r = e.name === n.name ? o._dbInfo.db : openDatabase(e.name, "", "", 0), t(e.storeName ? {
                                        db: r,
                                        storeNames: [e.storeName]
                                    } : function(e) {
                                        return new c(function(t, n) {
                                            e.transaction(function(r) {
                                                r.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(n, r) {
                                                    for (var o = [], i = 0; i < r.rows.length; i++) o.push(r.rows.item(i).name);
                                                    t({
                                                        db: e,
                                                        storeNames: o
                                                    })
                                                }, function(e, t) {
                                                    n(t)
                                                })
                                            }, function(e) {
                                                n(e)
                                            })
                                        })
                                    }(r))
                                }).then(function(e) {
                                    return new c(function(t, n) {
                                        e.db.transaction(function(r) {
                                            function o(e) {
                                                return new c(function(t, n) {
                                                    r.executeSql("DROP TABLE IF EXISTS " + e, [], function() {
                                                        t()
                                                    }, function(e, t) {
                                                        n(t)
                                                    })
                                                })
                                            }
                                            for (var i = [], a = 0, u = e.storeNames.length; a < u; a++) i.push(o(e.storeNames[a]));
                                            c.all(i).then(function() {
                                                t()
                                            }).catch(function(e) {
                                                n(e)
                                            })
                                        }, function(e) {
                                            n(e)
                                        })
                                    })
                                }) : c.reject("Invalid arguments"), t), r
                            }
                        };

                        function Z(e, t) {
                            var n = e.name + "/";
                            return e.storeName !== t.storeName && (n += e.storeName + "/"), n
                        }
                        var ee = {
                                _driver: "localStorageWrapper",
                                _initStorage(e) {
                                    var t = {};
                                    if (e)
                                        for (var n in e) t[n] = e[n];
                                    return t.keyPrefix = Z(e, this._defaultConfig), ! function() {
                                        var e = "_localforage_support_test";
                                        try {
                                            return localStorage.setItem(e, !0), localStorage.removeItem(e), !1
                                        } catch (e) {
                                            return !0
                                        }
                                    }() || localStorage.length > 0 ? (this._dbInfo = t, t.serializer = H, c.resolve()) : c.reject()
                                },
                                _support: function() {
                                    try {
                                        return "undefined" != typeof localStorage && "setItem" in localStorage && !!localStorage.setItem
                                    } catch (e) {
                                        return !1
                                    }
                                }(),
                                iterate(e, t) {
                                    var n = this,
                                        r = n.ready().then(function() {
                                            for (var t = n._dbInfo, r = t.keyPrefix, o = r.length, i = localStorage.length, a = 1, c = 0; c < i; c++) {
                                                var u = localStorage.key(c);
                                                if (0 === u.indexOf(r)) {
                                                    var s = localStorage.getItem(u);
                                                    if (s && (s = t.serializer.deserialize(s)), void 0 !== (s = e(s, u.substring(o), a++))) return s
                                                }
                                            }
                                        });
                                    return u(r, t), r
                                },
                                getItem(e, t) {
                                    var n = this;
                                    e = f(e);
                                    var r = n.ready().then(function() {
                                        var t = n._dbInfo,
                                            r = localStorage.getItem(t.keyPrefix + e);
                                        return r && (r = t.serializer.deserialize(r)), r
                                    });
                                    return u(r, t), r
                                },
                                setItem(e, t, n) {
                                    var r = this;
                                    e = f(e);
                                    var o = r.ready().then(function() {
                                        void 0 === t && (t = null);
                                        var n = t;
                                        return new c(function(o, i) {
                                            var a = r._dbInfo;
                                            a.serializer.serialize(t, function(t, r) {
                                                if (r) i(r);
                                                else try {
                                                    localStorage.setItem(a.keyPrefix + e, t), o(n)
                                                } catch (e) {
                                                    "QuotaExceededError" !== e.name && "NS_ERROR_DOM_QUOTA_REACHED" !== e.name || i(e), i(e)
                                                }
                                            })
                                        })
                                    });
                                    return u(o, n), o
                                },
                                removeItem(e, t) {
                                    var n = this;
                                    e = f(e);
                                    var r = n.ready().then(function() {
                                        localStorage.removeItem(n._dbInfo.keyPrefix + e)
                                    });
                                    return u(r, t), r
                                },
                                clear(e) {
                                    var t = this,
                                        n = t.ready().then(function() {
                                            for (var e = t._dbInfo.keyPrefix, n = localStorage.length - 1; n >= 0; n--) {
                                                var r = localStorage.key(n);
                                                0 === r.indexOf(e) && localStorage.removeItem(r)
                                            }
                                        });
                                    return u(n, e), n
                                },
                                length(e) {
                                    var t = this.keys().then(function(e) {
                                        return e.length
                                    });
                                    return u(t, e), t
                                },
                                key(e, t) {
                                    var n = this,
                                        r = n.ready().then(function() {
                                            var t, r = n._dbInfo;
                                            try {
                                                t = localStorage.key(e)
                                            } catch (e) {
                                                t = null
                                            }
                                            return t && (t = t.substring(r.keyPrefix.length)), t
                                        });
                                    return u(r, t), r
                                },
                                keys(e) {
                                    var t = this,
                                        n = t.ready().then(function() {
                                            for (var e = t._dbInfo, n = localStorage.length, r = [], o = 0; o < n; o++) {
                                                var i = localStorage.key(o);
                                                0 === i.indexOf(e.keyPrefix) && r.push(i.substring(e.keyPrefix.length))
                                            }
                                            return r
                                        });
                                    return u(n, e), n
                                },
                                dropInstance(e, t) {
                                    if (t = l.apply(this, arguments), !(e = "function" != typeof e && e || {}).name) {
                                        var n = this.config();
                                        e.name = e.name || n.name, e.storeName = e.storeName || n.storeName
                                    }
                                    var r, o = this;
                                    return u(r = e.name ? new c(function(t) {
                                        t(e.storeName ? Z(e, o._defaultConfig) : e.name + "/")
                                    }).then(function(e) {
                                        for (var t = localStorage.length - 1; t >= 0; t--) {
                                            var n = localStorage.key(t);
                                            0 === n.indexOf(e) && localStorage.removeItem(n)
                                        }
                                    }) : c.reject("Invalid arguments"), t), r
                                }
                            },
                            te = function(e, t) {
                                return e === t || "number" == typeof e && "number" == typeof t && isNaN(e) && isNaN(t)
                            },
                            ne = function(e, t) {
                                for (var n = e.length, r = 0; r < n;) {
                                    if (te(e[r], t)) return !0;
                                    r++
                                }
                                return !1
                            },
                            re = Array.isArray || function(e) {
                                return "[object Array]" === Object.prototype.toString.call(e)
                            },
                            oe = {},
                            ie = {},
                            ae = {
                                INDEXEDDB: A,
                                WEBSQL: Y,
                                LOCALSTORAGE: ee
                            },
                            ce = [ae.INDEXEDDB._driver, ae.WEBSQL._driver, ae.LOCALSTORAGE._driver],
                            ue = ["dropInstance"],
                            se = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(ue),
                            fe = {
                                description: "",
                                driver: ce.slice(),
                                name: "localforage",
                                size: 4980736,
                                storeName: "keyvaluepairs",
                                version: 1
                            };

                        function le(e, t) {
                            e[t] = function() {
                                var n = arguments;
                                return e.ready().then(function() {
                                    return e[t].apply(e, n)
                                })
                            }
                        }

                        function de() {
                            for (var e = 1; e < arguments.length; e++) {
                                var t = arguments[e];
                                if (t)
                                    for (var n in t) t.hasOwnProperty(n) && (arguments[0][n] = re(t[n]) ? t[n].slice() : t[n])
                            }
                            return arguments[0]
                        }
                        var ve = function() {
                                function e(t) {
                                    for (var n in function(e, t) {
                                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                        }(this, e), ae)
                                        if (ae.hasOwnProperty(n)) {
                                            var r = ae[n],
                                                o = r._driver;
                                            this[n] = o, oe[o] || this.defineDriver(r)
                                        }
                                    this._defaultConfig = de({}, fe), this._config = de({}, this._defaultConfig, t), this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch(function() {})
                                }
                                return e.prototype.config = function(e) {
                                    if ("object" === (void 0 === e ? "undefined" : r(e))) {
                                        if (this._ready) return new Error("Can't call config() after localforage has been used.");
                                        for (var t in e) {
                                            if ("storeName" === t && (e[t] = e[t].replace(/\W/g, "_")), "version" === t && "number" != typeof e[t]) return new Error("Database version must be a number.");
                                            this._config[t] = e[t]
                                        }
                                        return !("driver" in e) || !e.driver || this.setDriver(this._config.driver)
                                    }
                                    return "string" == typeof e ? this._config[e] : this._config
                                }, e.prototype.defineDriver = function(e, t, n) {
                                    var r = new c(function(t, n) {
                                        try {
                                            var r = e._driver,
                                                o = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                                            if (!e._driver) return void n(o);
                                            for (var i = se.concat("_initStorage"), a = 0, s = i.length; a < s; a++) {
                                                var f = i[a];
                                                if ((!ne(ue, f) || e[f]) && "function" != typeof e[f]) return void n(o)
                                            }! function() {
                                                for (var t = function(e) {
                                                        return function() {
                                                            var t = new Error("Method " + e + " is not implemented by the current driver"),
                                                                n = c.reject(t);
                                                            return u(n, arguments[arguments.length - 1]), n
                                                        }
                                                    }, n = 0, r = ue.length; n < r; n++) {
                                                    var o = ue[n];
                                                    e[o] || (e[o] = t(o))
                                                }
                                            }();
                                            var l = function(n) {
                                                oe[r] && console.info("Redefining LocalForage driver: " + r), oe[r] = e, ie[r] = n, t()
                                            };
                                            "_support" in e ? e._support && "function" == typeof e._support ? e._support().then(l, n) : l(!!e._support) : l(!0)
                                        } catch (e) {
                                            n(e)
                                        }
                                    });
                                    return s(r, t, n), r
                                }, e.prototype.driver = function() {
                                    return this._driver || null
                                }, e.prototype.getDriver = function(e, t, n) {
                                    var r = oe[e] ? c.resolve(oe[e]) : c.reject(new Error("Driver not found."));
                                    return s(r, t, n), r
                                }, e.prototype.getSerializer = function(e) {
                                    var t = c.resolve(H);
                                    return s(t, e), t
                                }, e.prototype.ready = function(e) {
                                    var t = this,
                                        n = t._driverSet.then(function() {
                                            return null === t._ready && (t._ready = t._initDriver()), t._ready
                                        });
                                    return s(n, e, e), n
                                }, e.prototype.setDriver = function(e, t, n) {
                                    var r = this;
                                    re(e) || (e = [e]);
                                    var o = this._getSupportedDrivers(e);

                                    function i() {
                                        r._config.driver = r.driver()
                                    }

                                    function a(e) {
                                        return r._extend(e), i(), r._ready = r._initStorage(r._config), r._ready
                                    }
                                    var u = null !== this._driverSet ? this._driverSet.catch(function() {
                                        return c.resolve()
                                    }) : c.resolve();
                                    return this._driverSet = u.then(function() {
                                        var e = o[0];
                                        return r._dbInfo = null, r._ready = null, r.getDriver(e).then(function(e) {
                                            r._driver = e._driver, i(), r._wrapLibraryMethodsWithReady(), r._initDriver = function(e) {
                                                return function() {
                                                    var t = 0;
                                                    return function n() {
                                                        for (; t < e.length;) {
                                                            var o = e[t];
                                                            return t++, r._dbInfo = null, r._ready = null, r.getDriver(o).then(a).catch(n)
                                                        }
                                                        i();
                                                        var u = new Error("No available storage method found.");
                                                        return r._driverSet = c.reject(u), r._driverSet
                                                    }()
                                                }
                                            }(o)
                                        })
                                    }).catch(function() {
                                        i();
                                        var e = new Error("No available storage method found.");
                                        return r._driverSet = c.reject(e), r._driverSet
                                    }), s(this._driverSet, t, n), this._driverSet
                                }, e.prototype.supports = function(e) {
                                    return !!ie[e]
                                }, e.prototype._extend = function(e) {
                                    de(this, e)
                                }, e.prototype._getSupportedDrivers = function(e) {
                                    for (var t = [], n = 0, r = e.length; n < r; n++) {
                                        var o = e[n];
                                        this.supports(o) && t.push(o)
                                    }
                                    return t
                                }, e.prototype._wrapLibraryMethodsWithReady = function() {
                                    for (var e = 0, t = se.length; e < t; e++) le(this, se[e])
                                }, e.prototype.createInstance = function(t) {
                                    return new e(t)
                                }, e
                            }(),
                            he = new ve;
                        t.exports = he
                    }, {
                        3: 3
                    }]
                }, {}, [4])(4)
            },
            634(e, t, n) {
                "use strict";
                var r, o, i, a, c, u, s, f, l;
                n.d(t, {
                    LK() {
                        return m
                    },
                    VR() {
                        return y
                    },
                    pS() {
                        return p
                    },
                    wm() {
                        return g
                    }
                });
                const d = "undefined" != typeof window ? window : "undefined" != typeof self ? self : "undefined" != typeof globalThis ? globalThis : {},
                    v = null !== (r = d.__moe_original_methods__) && void 0 !== r ? r : {},
                    h = "__zone_symbol__",
                    p = null !== (i = null !== (o = v.setTimeout) && void 0 !== o ? o : d[`${h}setTimeout`]) && void 0 !== i ? i : d.setTimeout,
                    m = null !== (c = null !== (a = v.setInterval) && void 0 !== a ? a : d[`${h}setInterval`]) && void 0 !== c ? c : d.setInterval,
                    g = null !== (s = null !== (u = v.clearInterval) && void 0 !== u ? u : d[`${h}clearInterval`]) && void 0 !== s ? s : d.clearInterval,
                    y = null !== (l = null !== (f = v.Promise) && void 0 !== f ? f : d[`${h}Promise`]) && void 0 !== l ? l : d.Promise
            }
        },
        t = {};

    function n(r) {
        var o = t[r];
        if (void 0 !== o) return o.exports;
        var i = t[r] = {
            exports: {}
        };
        return e[r](i, i.exports, n), i.exports
    }
    n.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return n.d(t, {
            a: t
        }), t
    }, n.d = (e, t) => {
        for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
            enumerable: !0,
            get: t[r]
        })
    }, n.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), (() => {
        "use strict";
        var e = n(790),
            t = n.n(e),
            r = n(634).VR,
            o = n(634).LK,
            i = n(634).wm,
            a = n(634).pS;
        (function(e) {
            var n, c, u, s = {
                    env: "sdk-01.moengage.com",
                    get() {
                        return "https://" + s.env
                    },
                    set(e) {
                        s.env = e
                    }
                },
                f = function() {
                    return s.get() + "/v2/sdk/report/"
                },
                l = "https://fcm.googleapis.com/fcm/send/",
                d = "https://updates.push.services.mozilla.com/wpush/v2/",
                v = "https://wns2-pn1p.notify.windows.com/w/?token=",
                h = "https://web.push.apple.com/";

            function p(t) {
                t.waitUntil(e.skipWaiting())
            }

            function m(t) {
                t.waitUntil(e.clients.claim())
            }

            function g(e) {
                e.data && ("MOE_GET_SW_VERSION" === e.data.type ? e.ports && e.ports[0] && e.ports[0].postMessage({
                    version: "2.81.01"
                }) : e.data.data && e.data.data.app_id ? (n.setItem("reportParams", e.data), e.data.data.environment && s.set(e.data.data.environment)) : e.data.cartToken && e.waitUntil(n.getItem("reportParams").then(function(e) {
                    e.data.environment && s.set(e.data.environment)
                }).then(function() {
                    return t = e.data, new r(e => {
                        let r = 5;
                        const a = o(async () => {
                            try {
                                const o = await cookieStore.get("cart");
                                if (o && o.value) {
                                    i(a);
                                    const r = {
                                            h: "",
                                            meta: {
                                                bid: O()
                                            },
                                            url: t.url
                                        },
                                        c = {
                                            cart_token: o.value
                                        },
                                        u = t.moe_user_id;
                                    u && (r.identifiers = {
                                        moe_user_id: u
                                    }, c.USER_ATTRIBUTE_UNIQUE_ID = u), N("EVENT_ACTION_USER_ATTRIBUTE", {
                                        cart_token: o.value
                                    }, 0, r), n.setItem("shopify_cookie_attr", c), e()
                                }
                                r--, r <= 0 && (i(a), e())
                            } catch (t) {
                                i(a), console.error(`Unable to fetch the cart cookie: ${t}`), e()
                            }
                        }, 1e3)
                    });
                    var t
                })))
            }
            async function y(t) {
                if (e.Notification && "granted" === e.Notification.permission) {
                    var r;
                    c.iterate(function(e, t) {
                        (Date.now() - e.timestamp) / 864e5 > 28 && c.removeItem(t)
                    });
                    var o = {};
                    t.waitUntil(n.getItem("reportParams").then(function(e) {
                        e && e.data && (o = e.data, e.data.environment && s.set(e.data.environment))
                    }).then(function() {
                        try {
                            var e = t.data.json();
                            if (e) return e
                        } catch (e) {
                            console.error("payload not received or has some errors in Moengage Push")
                        }
                    }).then(async function(t) {
                        var n = o && o.customProxyDomain,
                            i = t.payload;
                        if (i && i.moe_cid_attr) {
                            if (t.cid) {
                                r = t.cid;
                                const e = await
                                function(e) {
                                    return c.length().then(t => {
                                        if (0 === t) throw new Error("Existing campaign not present in indexedDB");
                                        return c.iterate(function(t, n) {
                                            if (e === n) return !0
                                        }).then(e => e)
                                    }).catch(() => !1)
                                }(r);
                                if (e) throw new Error(`The campaign ${r} has already been executed.`);
                                var a = {
                                    cid: r
                                };
                                i && (a = {
                                    cid: r,
                                    title: i.title,
                                    message: i.message,
                                    actions: i.actions,
                                    image: i.image,
                                    moe_cid_attr: i.moe_cid_attr,
                                    timestamp: Date.now()
                                }), c.setItem(r, a)
                            }
                            if (!i || !i.title || !i.message) return N("MOE_NO_PAYLOAD_WEB", {
                                cid: t.cid
                            }), console.error("Moengage - Web Push payload error"), E("Welcome", {
                                body: "Something unexpected happened",
                                requireInteraction: !1
                            });
                            var u, s;
                            try {
                                u = i.moe_cid_attr.moe_campaign_id, s = i.moe_cid_attr.moe_campaign_name
                            } catch (e) {
                                throw new Error("cannot get campaign ID or campaign Name.")
                            }
                            N("NOTIFICATION_RECEIVED_WEB_MOE", {
                                cid: r,
                                moe_campaign_id: u,
                                moe_campaign_name: s,
                                ...i.moe_cid_attr
                            });
                            var f = {
                                body: i.message,
                                icon: b(i.icon, n),
                                tag: t.cid || "moe-id",
                                badge: b(i.badge, n),
                                data: {
                                    url: i.urlToOpen,
                                    actions: i.actions && i.actions.length ? JSON.parse(b(JSON.stringify(i.actions), n)) : i.actions,
                                    cid: r
                                },
                                requireInteraction: i && !JSON.parse(t.payload.reqInteract) || !1,
                                actions: i.actions && i.actions.length ? JSON.parse(b(JSON.stringify(i.actions), n)) : i.actions,
                                image: b(i.image, n)
                            };
                            return function(t, n) {
                                return I().then(function(r) {
                                    if (!r) return e.registration.showNotification(t, n)
                                })
                            }(i.title, f)
                        }
                    }).catch(function(e) {
                        return console.error("Moengage Service Worker Error - ", e), E("Welcome", {
                            body: "Something unexpected happened",
                            requireInteraction: !1
                        })
                    }))
                }
            }

            function b(e, t) {
                let n = e;
                return "string" == typeof n && n.length && t && (n = n.replace(/((?:https?:)?\/\/)([a-zA-Z0-9][-a-zA-Z0-9]*\.)*moengage\.com(?=[:/?\s#'"]|$)/gi, function(e, n) {
                    const r = e.substring(n.length);
                    return ["www.moengage.com", "moengage.com"].includes(r) ? e : n + r.replace(/moengage\.com$/i, t)
                })), n
            }

            function _(e) {
                var t, o = e.notification.data;
                e.notification.close();
                var i = r.resolve();
                o && ("0" === e.action && o.actions && o.actions instanceof Array && o.actions.length > 0 && o.actions[0].url ? (i = clients.openWindow(o.actions[0].url), t = o.actions[0].title) : "1" === e.action && o.actions && o.actions instanceof Array && o.actions.length > 1 && o.actions[1].url ? (i = clients.openWindow(o.actions[1].url), t = o.actions[1].title) : o.url && (i = clients.openWindow(o.url), t = o.title));
                var a = new r(function(e) {
                    c.iterate(function(e, n) {
                        if (n == o.cid) {
                            var r, i;
                            try {
                                r = e.moe_cid_attr.moe_campaign_id, i = e.moe_cid_attr.moe_campaign_name
                            } catch (e) {
                                throw new Error(e)
                            }
                            return N("NOTIFICATION_CLICKED_WEB_MOE", {
                                cid: e.cid,
                                button: t || void 0,
                                moe_campaign_id: r,
                                moe_campaign_name: i,
                                ...e.moe_cid_attr
                            }), n
                        }
                    }).then(function(t) {
                        console.info("Web Push Campaign clicked: ", t), e()
                    })
                });
                e.waitUntil(n.getItem("reportParams").then(function(e) {
                    e.data.environment && s.set(e.data.environment)
                }).then(function() {
                    return r.all([i, a])
                }))
            }

            function w(e) {
                var t = e.notification.data;
                c.iterate(function(e, n) {
                    if (n == t.cid) return n
                }).then(function(e) {
                    console.info("Web Push Campaign closed: ", e)
                })
            }
            async function I() {
                const e = await n.getItem("isSdkDisabledAtInit"),
                    t = await n.getItem("SDK_DISABLED");
                return t || e && !1 !== t
            }

            function E(t, n) {
                return I().then(function(r) {
                    if (!r) return e.registration.showNotification(t, n).then(function() {
                        a(S, 2e3)
                    })
                })
            }

            function S() {
                e.registration.getNotifications().then(function(e) {
                    for (var t = 0; t < e.length; ++t) e[t].close()
                })
            }

            function N(t, r, o, i = {}) {
                n.getItem("reportParams").then(function(o) {
                    n.getItem("identifiers").then(function(n) {
                        I().then(function(a) {
                            if (a) return void console.log('Not tracking event "' + t + '" from serviceworker as Web SDK has been disabled.');
                            var c = o.data;
                            const u = c.customProxyDomain;
                            var s;
                            c.sdk_ver = "2.81.01", c.device_ts = (s = new Date, Number(Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate(), s.getUTCHours(), s.getUTCMinutes(), s.getUTCSeconds(), s.getUTCMilliseconds()))), delete i.h, e.registration.pushManager.getSubscription().then(function(e) {
                                if (e) {
                                    var o = 0 === (s = (a = e).endpoint).indexOf(l) ? s.replace(l, "") : 0 === s.indexOf(d) ? s.replace(d, "") : 0 === s.indexOf(h) ? s.replace(h, "") : 0 === s.indexOf(v) ? s.replace(v, "") : a.subscriptionId;
                                    o ? c.push_id = o : delete c.push_id
                                } else delete c.push_id;
                                var a, s;
                                delete c.os_platform, c.app_ver = c.app_ver.toString();
                                const p = {
                                    query_params: c,
                                    meta: {
                                        bid: O(),
                                        process_type: "serviceWorker",
                                        request_time: (new Date).toISOString()
                                    },
                                    viewsCount: 1,
                                    viewsInfo: [{
                                        EVENT_ACTION: t,
                                        EVENT_ATTRS: r,
                                        EVENT_G_TIME: (new Date).getTime().toString(),
                                        EVENT_L_TIME: D()
                                    }],
                                    ...i
                                };
                                if (n && (n.moe_user_id || n.userIdentities)) {
                                    const e = {},
                                        t = n.userIdentities,
                                        r = n.previousIdentities,
                                        o = n.previousIdentitiesUpdatedTime,
                                        i = 216e5,
                                        a = n.moe_user_id;
                                    t && Object.keys(t).length && (e.user_identities = t), r && Object.keys(r).length && "number" == typeof o && (new Date).getTime() - o <= i && (e.previous_identities = r), a && a.length && (e.moe_user_id = a), p.identifiers = e
                                }
                                let m = f();
                                "string" == typeof u && u.length && (p.meta.initiator = "proxy_server", m = b(m, u)), fetch(m + c.app_id, {
                                    method: "POST",
                                    body: JSON.stringify(p)
                                }).then(function(e) {
                                    return e.json()
                                })
                            })
                        })
                    })
                })
            }

            function D() {
                const e = new Date;
                return `${e.getDate()}:${e.getMonth()+1}:${e.getFullYear()}:${e.getHours()}:${e.getMinutes()}:${e.getSeconds()}`
            }

            function O() {
                return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, e => (e ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> e / 4).toString(16))
            }

            function T(e) {
                "moe_offline_data_sync" === e.tag && e.waitUntil(n.getItem("reportParams").then(function(e) {
                    return e && e.data && e.data.customProxyDomain ? j(e.data.customProxyDomain) : j()
                }).then(function() {}))
            }

            function j(e) {
                return new r(function(t, n) {
                    new r(function(e) {
                        return u.keys().then(function(e) {
                            return e
                        }).then(function(t) {
                            return new r(function() {
                                var n = [];
                                t.map(function(e) {
                                    e && e.includes("batch_") && n.push(u.getItem(e))
                                }), r.all(n).then(function(t) {
                                    e(t)
                                })
                            })
                        })
                    }).then(function(o) {
                        if (o && o.length) {
                            const i = [],
                                a = "string" == typeof e && e.length ? b(f(), e) : f();
                            for (let e = 0; e < o.length; e++) {
                                const t = o[e];
                                i.push(fetch(a + t.query_params.app_id, {
                                    method: "POST",
                                    body: JSON.stringify(t)
                                }))
                            }
                            r.all(i).then(async function(e) {
                                const t = [];
                                for (let n = 0; n < e.length; n++) {
                                    const r = e[n];
                                    t.push(await r.json())
                                }
                                return t
                            }).then(function(e) {
                                for (let t = 0; t < e.length; t++)
                                    if ("success" !== e[t].status) throw new Error("Sending offline request to MoEngage did not succeed");
                                return u.clear().then(function() {
                                    t("Successfully replayed offline requests and cleared db")
                                })
                            }).catch(function(e) {
                                console.error("Error occurred while sending offline requests to MoEngage - " + e), n("Error occurred while sending offline requests to MoEngage - " + e)
                            })
                        } else t("No pending requests to replay")
                    }).catch(function(e) {
                        console.error("Replaying failed " + e), n("Replaying failed " + e)
                    })
                })
            }
            return {
                async init() {
                    e.addEventListener("install", p), e.addEventListener("activate", m), e.addEventListener("message", g), e.addEventListener("push", y), e.addEventListener("notificationclick", _), e.addEventListener("notificationclose", w), e.addEventListener("sync", T), await async function() {
                        return new r(e => {
                            n = t().createInstance({
                                driver: [t().INDEXEDDB],
                                name: "moe_database",
                                storeName: "moe_data"
                            }), c = t().createInstance({
                                driver: [t().INDEXEDDB],
                                name: "moe_database",
                                storeName: "moe_backup"
                            }), u = t().createInstance({
                                driver: [t().INDEXEDDB],
                                name: "moe_database",
                                storeName: "offline_data"
                            }), r.all([n.ready(), c.ready(), u.ready()]).then(e())
                        })
                    }(), n.getItem("reportParams").then(function(e) {
                        e && e.data && ("allowed" === e.data.isBatchingEnabled || !0 === e.data.isBatchingEnabled) && j(e.data.customProxyDomain).then(function(e) {
                            console.log(e)
                        }).catch(function(e) {
                            console.log(e)
                        })
                    })
                }
            }
        })(self).init(), self.addEventListener("fetch", () => {})
    })()
})();