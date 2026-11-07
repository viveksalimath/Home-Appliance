/*! For license information please see sdk.webp.js.LICENSE.txt */
(() => {
    var e = {
            790(e, t, n) {
                var r = n(634).pS,
                    i = n(634).VR;
                e.exports = function e(t, n, r) {
                    function i(a, s) {
                        if (!n[a]) {
                            if (!t[a]) {
                                if (o) return o(a, !0);
                                var c = new Error("Cannot find module '" + a + "'");
                                throw c.code = "MODULE_NOT_FOUND", c
                            }
                            var l = n[a] = {
                                exports: {}
                            };
                            t[a][0].call(l.exports, function(e) {
                                return i(t[a][1][e] || e)
                            }, l, l.exports, e, t, n, r)
                        }
                        return n[a].exports
                    }
                    for (var o = void 0, a = 0; a < r.length; a++) i(r[a]);
                    return i
                }({
                    1: [function(e, t, i) {
                        (function(e) {
                            "use strict";
                            var n, i, o = e.MutationObserver || e.WebKitMutationObserver;
                            if (o) {
                                var a = 0,
                                    s = new o(u),
                                    c = e.document.createTextNode("");
                                s.observe(c, {
                                    characterData: !0
                                }), n = function() {
                                    c.data = a = ++a % 2
                                }
                            } else if (e.setImmediate || void 0 === e.MessageChannel) n = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function() {
                                var t = e.document.createElement("script");
                                t.onreadystatechange = function() {
                                    u(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null
                                }, e.document.documentElement.appendChild(t)
                            } : function() {
                                r(u, 0)
                            };
                            else {
                                var l = new e.MessageChannel;
                                l.port1.onmessage = u, n = function() {
                                    l.port2.postMessage(0)
                                }
                            }
                            var d = [];

                            function u() {
                                var e, t;
                                i = !0;
                                for (var n = d.length; n;) {
                                    for (t = d, d = [], e = -1; ++e < n;) t[e]();
                                    n = d.length
                                }
                                i = !1
                            }
                            t.exports = function(e) {
                                1 !== d.push(e) || i || n()
                            }
                        }).call(this, void 0 !== n.g ? n.g : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                    }, {}],
                    2: [function(e, t, n) {
                        "use strict";
                        var r = e(1);

                        function i() {}
                        var o = {},
                            a = ["REJECTED"],
                            s = ["FULFILLED"],
                            c = ["PENDING"];

                        function l(e) {
                            if ("function" != typeof e) throw new TypeError("resolver must be a function");
                            this.state = c, this.queue = [], this.outcome = void 0, e !== i && f(this, e)
                        }

                        function d(e, t, n) {
                            this.promise = e, "function" == typeof t && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), "function" == typeof n && (this.onRejected = n, this.callRejected = this.otherCallRejected)
                        }

                        function u(e, t, n) {
                            r(function() {
                                var r;
                                try {
                                    r = t(n)
                                } catch (t) {
                                    return o.reject(e, t)
                                }
                                r === e ? o.reject(e, new TypeError("Cannot resolve promise with itself")) : o.resolve(e, r)
                            })
                        }

                        function p(e) {
                            var t = e && e.then;
                            if (e && ("object" == typeof e || "function" == typeof e) && "function" == typeof t) return function() {
                                t.apply(e, arguments)
                            }
                        }

                        function f(e, t) {
                            var n = !1;

                            function r(t) {
                                n || (n = !0, o.reject(e, t))
                            }

                            function i(t) {
                                n || (n = !0, o.resolve(e, t))
                            }
                            var a = v(function() {
                                t(i, r)
                            });
                            "error" === a.status && r(a.value)
                        }

                        function v(e, t) {
                            var n = {};
                            try {
                                n.value = e(t), n.status = "success"
                            } catch (e) {
                                n.status = "error", n.value = e
                            }
                            return n
                        }
                        t.exports = l, l.prototype.catch = function(e) {
                            return this.then(null, e)
                        }, l.prototype.then = function(e, t) {
                            if ("function" != typeof e && this.state === s || "function" != typeof t && this.state === a) return this;
                            var n = new this.constructor(i);
                            return this.state !== c ? u(n, this.state === s ? e : t, this.outcome) : this.queue.push(new d(n, e, t)), n
                        }, d.prototype.callFulfilled = function(e) {
                            o.resolve(this.promise, e)
                        }, d.prototype.otherCallFulfilled = function(e) {
                            u(this.promise, this.onFulfilled, e)
                        }, d.prototype.callRejected = function(e) {
                            o.reject(this.promise, e)
                        }, d.prototype.otherCallRejected = function(e) {
                            u(this.promise, this.onRejected, e)
                        }, o.resolve = function(e, t) {
                            var n = v(p, t);
                            if ("error" === n.status) return o.reject(e, n.value);
                            var r = n.value;
                            if (r) f(e, r);
                            else {
                                e.state = s, e.outcome = t;
                                for (var i = -1, a = e.queue.length; ++i < a;) e.queue[i].callFulfilled(t)
                            }
                            return e
                        }, o.reject = function(e, t) {
                            e.state = a, e.outcome = t;
                            for (var n = -1, r = e.queue.length; ++n < r;) e.queue[n].callRejected(t);
                            return e
                        }, l.resolve = function(e) {
                            return e instanceof this ? e : o.resolve(new this(i), e)
                        }, l.reject = function(e) {
                            var t = new this(i);
                            return o.reject(t, e)
                        }, l.all = function(e) {
                            var t = this;
                            if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                            var n = e.length,
                                r = !1;
                            if (!n) return this.resolve([]);
                            for (var a = new Array(n), s = 0, c = -1, l = new this(i); ++c < n;) d(e[c], c);
                            return l;

                            function d(e, i) {
                                t.resolve(e).then(function(e) {
                                    a[i] = e, ++s !== n || r || (r = !0, o.resolve(l, a))
                                }, function(e) {
                                    r || (r = !0, o.reject(l, e))
                                })
                            }
                        }, l.race = function(e) {
                            var t = this;
                            if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                            var n = e.length,
                                r = !1;
                            if (!n) return this.resolve([]);
                            for (var a = -1, s = new this(i); ++a < n;) c(e[a]);
                            return s;

                            function c(e) {
                                t.resolve(e).then(function(e) {
                                    r || (r = !0, o.resolve(s, e))
                                }, function(e) {
                                    r || (r = !0, o.reject(s, e))
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
                            o = function() {
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
                            } catch (i) {
                                if ("TypeError" !== i.name) throw i;
                                for (var n = new("undefined" != typeof BlobBuilder ? BlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : WebKitBlobBuilder), r = 0; r < e.length; r += 1) n.append(e[r]);
                                return n.getBlob(t.type)
                            }
                        }
                        void 0 === i && e(3);
                        var s = i;

                        function c(e, t) {
                            t && e.then(function(e) {
                                t(null, e)
                            }, function(e) {
                                t(e)
                            })
                        }

                        function l(e, t, n) {
                            "function" == typeof t && e.then(t), "function" == typeof n && e.catch(n)
                        }

                        function d(e) {
                            return "string" != typeof e && (console.warn(e + " used as a key, but it is not a string."), e = String(e)), e
                        }

                        function u() {
                            if (arguments.length && "function" == typeof arguments[arguments.length - 1]) return arguments[arguments.length - 1]
                        }
                        var p = "local-forage-detect-blob-support",
                            f = void 0,
                            v = {},
                            h = Object.prototype.toString,
                            g = "readonly",
                            m = "readwrite";

                        function b(e) {
                            for (var t = e.length, n = new ArrayBuffer(t), r = new Uint8Array(n), i = 0; i < t; i++) r[i] = e.charCodeAt(i);
                            return n
                        }

                        function _(e) {
                            var t = v[e.name],
                                n = {};
                            n.promise = new s(function(e, t) {
                                n.resolve = e, n.reject = t
                            }), t.deferredOperations.push(n), t.dbReady = t.dbReady ? t.dbReady.then(function() {
                                return n.promise
                            }) : n.promise
                        }

                        function y(e) {
                            var t = v[e.name].deferredOperations.pop();
                            if (t) return t.resolve(), t.promise
                        }

                        function E(e, t) {
                            var n = v[e.name].deferredOperations.pop();
                            if (n) return n.reject(t), n.promise
                        }

                        function S(e, t) {
                            return new s(function(n, r) {
                                if (v[e.name] = v[e.name] || {
                                        forages: [],
                                        db: null,
                                        dbReady: null,
                                        deferredOperations: []
                                    }, e.db) {
                                    if (!t) return n(e.db);
                                    _(e), e.db.close()
                                }
                                var i = [e.name];
                                t && i.push(e.version);
                                var a = o.open.apply(o, i);
                                t && (a.onupgradeneeded = function(t) {
                                    var n = a.result;
                                    try {
                                        n.createObjectStore(e.storeName), t.oldVersion <= 1 && n.createObjectStore(p)
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
                                    }, n(t), y(e)
                                }
                            })
                        }

                        function T(e) {
                            return S(e, !1)
                        }

                        function I(e) {
                            return S(e, !0)
                        }

                        function w(e, t) {
                            if (!e.db) return !0;
                            var n = !e.db.objectStoreNames.contains(e.storeName),
                                r = e.version > e.db.version;
                            if (e.version < e.db.version && (e.version !== t && console.warn('The database "' + e.name + "\" can't be downgraded from version " + e.db.version + " to version " + e.version + "."), e.version = e.db.version), r || n) {
                                if (n) {
                                    var i = e.db.version + 1;
                                    i > e.version && (e.version = i)
                                }
                                return !0
                            }
                            return !1
                        }

                        function A(e) {
                            return a([b(atob(e.data))], {
                                type: e.type
                            })
                        }

                        function O(e) {
                            return e && e.__local_forage_encoded_blob
                        }

                        function D(e) {
                            var t = this,
                                n = t._initReady().then(function() {
                                    var e = v[t._dbInfo.name];
                                    if (e && e.dbReady) return e.dbReady
                                });
                            return l(n, e, e), n
                        }

                        function k(e, t, n, r) {
                            void 0 === r && (r = 1);
                            try {
                                var i = e.db.transaction(e.storeName, t);
                                n(null, i)
                            } catch (i) {
                                if (r > 0 && (!e.db || "InvalidStateError" === i.name || "NotFoundError" === i.name)) return s.resolve().then(function() {
                                    if (!e.db || "NotFoundError" === i.name && !e.db.objectStoreNames.contains(e.storeName) && e.version <= e.db.version) return e.db && (e.version = e.db.version + 1), I(e)
                                }).then(function() {
                                    return function(e) {
                                        _(e);
                                        for (var t = v[e.name], n = t.forages, r = 0; r < n.length; r++) {
                                            var i = n[r];
                                            i._dbInfo.db && (i._dbInfo.db.close(), i._dbInfo.db = null)
                                        }
                                        return e.db = null, T(e).then(function(t) {
                                            return e.db = t, w(e) ? I(e) : t
                                        }).then(function(r) {
                                            e.db = t.db = r;
                                            for (var i = 0; i < n.length; i++) n[i]._dbInfo.db = r
                                        }).catch(function(t) {
                                            throw E(e, t), t
                                        })
                                    }(e).then(function() {
                                        k(e, t, n, r - 1)
                                    })
                                }).catch(n);
                                n(i)
                            }
                        }
                        var x = {
                                _driver: "asyncStorage",
                                _initStorage(e) {
                                    var t = this,
                                        n = {
                                            db: null
                                        };
                                    if (e)
                                        for (var r in e) n[r] = e[r];
                                    var i = v[n.name];
                                    i || (v[n.name] = i = {
                                        forages: [],
                                        db: null,
                                        dbReady: null,
                                        deferredOperations: []
                                    }), i.forages.push(t), t._initReady || (t._initReady = t.ready, t.ready = D);
                                    var o = [];

                                    function a() {
                                        return s.resolve()
                                    }
                                    for (var c = 0; c < i.forages.length; c++) {
                                        var l = i.forages[c];
                                        l !== t && o.push(l._initReady().catch(a))
                                    }
                                    var d = i.forages.slice(0);
                                    return s.all(o).then(function() {
                                        return n.db = i.db, T(n)
                                    }).then(function(e) {
                                        return n.db = e, w(n, t._defaultConfig.version) ? I(n) : e
                                    }).then(function(e) {
                                        n.db = i.db = e, t._dbInfo = n;
                                        for (var r = 0; r < d.length; r++) {
                                            var o = d[r];
                                            o !== t && (o._dbInfo.db = n.db, o._dbInfo.version = n.version)
                                        }
                                    })
                                },
                                _support: function() {
                                    try {
                                        if (!o || !o.open) return !1;
                                        var e = "undefined" != typeof openDatabase && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform),
                                            t = "function" == typeof fetch && -1 !== fetch.toString().indexOf("[native code");
                                        return (!e || t) && "undefined" != typeof indexedDB && "undefined" != typeof IDBKeyRange
                                    } catch (e) {
                                        return !1
                                    }
                                }(),
                                iterate(e, t) {
                                    var n = this,
                                        r = new s(function(t, r) {
                                            n.ready().then(function() {
                                                k(n._dbInfo, g, function(i, o) {
                                                    if (i) return r(i);
                                                    try {
                                                        var a = o.objectStore(n._dbInfo.storeName).openCursor(),
                                                            s = 1;
                                                        a.onsuccess = function() {
                                                            var n = a.result;
                                                            if (n) {
                                                                var r = n.value;
                                                                O(r) && (r = A(r));
                                                                var i = e(r, n.key, s++);
                                                                void 0 !== i ? t(i) : n.continue()
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
                                    return c(r, t), r
                                },
                                getItem(e, t) {
                                    var n = this;
                                    e = d(e);
                                    var r = new s(function(t, r) {
                                        n.ready().then(function() {
                                            k(n._dbInfo, g, function(i, o) {
                                                if (i) return r(i);
                                                try {
                                                    var a = o.objectStore(n._dbInfo.storeName).get(e);
                                                    a.onsuccess = function() {
                                                        var e = a.result;
                                                        void 0 === e && (e = null), O(e) && (e = A(e)), t(e)
                                                    }, a.onerror = function() {
                                                        r(a.error)
                                                    }
                                                } catch (e) {
                                                    r(e)
                                                }
                                            })
                                        }).catch(r)
                                    });
                                    return c(r, t), r
                                },
                                setItem(e, t, n) {
                                    var r = this;
                                    e = d(e);
                                    var i = new s(function(n, i) {
                                        var o;
                                        r.ready().then(function() {
                                            return o = r._dbInfo, "[object Blob]" === h.call(t) ? function(e) {
                                                return "boolean" == typeof f ? s.resolve(f) : function(e) {
                                                    return new s(function(t) {
                                                        var n = e.transaction(p, m),
                                                            r = a([""]);
                                                        n.objectStore(p).put(r, "key"), n.onabort = function(e) {
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
                                                    return f = e
                                                })
                                            }(o.db).then(function(e) {
                                                return e ? t : (n = t, new s(function(e, t) {
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
                                            k(r._dbInfo, m, function(o, a) {
                                                if (o) return i(o);
                                                try {
                                                    var s = a.objectStore(r._dbInfo.storeName);
                                                    null === t && (t = void 0);
                                                    var c = s.put(t, e);
                                                    a.oncomplete = function() {
                                                        void 0 === t && (t = null), n(t)
                                                    }, a.onabort = a.onerror = function() {
                                                        i(c.error ? c.error : c.transaction.error)
                                                    }
                                                } catch (e) {
                                                    i(e)
                                                }
                                            })
                                        }).catch(i)
                                    });
                                    return c(i, n), i
                                },
                                removeItem(e, t) {
                                    var n = this;
                                    e = d(e);
                                    var r = new s(function(t, r) {
                                        n.ready().then(function() {
                                            k(n._dbInfo, m, function(i, o) {
                                                if (i) return r(i);
                                                try {
                                                    var a = o.objectStore(n._dbInfo.storeName).delete(e);
                                                    o.oncomplete = function() {
                                                        t()
                                                    }, o.onerror = function() {
                                                        r(a.error)
                                                    }, o.onabort = function() {
                                                        r(a.error ? a.error : a.transaction.error)
                                                    }
                                                } catch (e) {
                                                    r(e)
                                                }
                                            })
                                        }).catch(r)
                                    });
                                    return c(r, t), r
                                },
                                clear(e) {
                                    var t = this,
                                        n = new s(function(e, n) {
                                            t.ready().then(function() {
                                                k(t._dbInfo, m, function(r, i) {
                                                    if (r) return n(r);
                                                    try {
                                                        var o = i.objectStore(t._dbInfo.storeName).clear();
                                                        i.oncomplete = function() {
                                                            e()
                                                        }, i.onabort = i.onerror = function() {
                                                            n(o.error ? o.error : o.transaction.error)
                                                        }
                                                    } catch (e) {
                                                        n(e)
                                                    }
                                                })
                                            }).catch(n)
                                        });
                                    return c(n, e), n
                                },
                                length(e) {
                                    var t = this,
                                        n = new s(function(e, n) {
                                            t.ready().then(function() {
                                                k(t._dbInfo, g, function(r, i) {
                                                    if (r) return n(r);
                                                    try {
                                                        var o = i.objectStore(t._dbInfo.storeName).count();
                                                        o.onsuccess = function() {
                                                            e(o.result)
                                                        }, o.onerror = function() {
                                                            n(o.error)
                                                        }
                                                    } catch (e) {
                                                        n(e)
                                                    }
                                                })
                                            }).catch(n)
                                        });
                                    return c(n, e), n
                                },
                                key(e, t) {
                                    var n = this,
                                        r = new s(function(t, r) {
                                            e < 0 ? t(null) : n.ready().then(function() {
                                                k(n._dbInfo, g, function(i, o) {
                                                    if (i) return r(i);
                                                    try {
                                                        var a = o.objectStore(n._dbInfo.storeName),
                                                            s = !1,
                                                            c = a.openKeyCursor();
                                                        c.onsuccess = function() {
                                                            var n = c.result;
                                                            n ? 0 === e || s ? t(n.key) : (s = !0, n.advance(e)) : t(null)
                                                        }, c.onerror = function() {
                                                            r(c.error)
                                                        }
                                                    } catch (e) {
                                                        r(e)
                                                    }
                                                })
                                            }).catch(r)
                                        });
                                    return c(r, t), r
                                },
                                keys(e) {
                                    var t = this,
                                        n = new s(function(e, n) {
                                            t.ready().then(function() {
                                                k(t._dbInfo, g, function(r, i) {
                                                    if (r) return n(r);
                                                    try {
                                                        var o = i.objectStore(t._dbInfo.storeName).openKeyCursor(),
                                                            a = [];
                                                        o.onsuccess = function() {
                                                            var t = o.result;
                                                            t ? (a.push(t.key), t.continue()) : e(a)
                                                        }, o.onerror = function() {
                                                            n(o.error)
                                                        }
                                                    } catch (e) {
                                                        n(e)
                                                    }
                                                })
                                            }).catch(n)
                                        });
                                    return c(n, e), n
                                },
                                dropInstance(e, t) {
                                    t = u.apply(this, arguments);
                                    var n, r = this.config();
                                    return (e = "function" != typeof e && e || {}).name || (e.name = e.name || r.name, e.storeName = e.storeName || r.storeName), c(n = e.name ? (e.name === r.name && this._dbInfo.db ? s.resolve(this._dbInfo.db) : T(e).then(function(t) {
                                        var n = v[e.name],
                                            r = n.forages;
                                        n.db = t;
                                        for (var i = 0; i < r.length; i++) r[i]._dbInfo.db = t;
                                        return t
                                    })).then(e.storeName ? function(t) {
                                        if (t.objectStoreNames.contains(e.storeName)) {
                                            var n = t.version + 1;
                                            _(e);
                                            var r = v[e.name],
                                                i = r.forages;
                                            t.close();
                                            for (var a = 0; a < i.length; a++) {
                                                var c = i[a];
                                                c._dbInfo.db = null, c._dbInfo.version = n
                                            }
                                            var l = new s(function(t, r) {
                                                var i = o.open(e.name, n);
                                                i.onerror = function(e) {
                                                    i.result.close(), r(e)
                                                }, i.onupgradeneeded = function() {
                                                    i.result.deleteObjectStore(e.storeName)
                                                }, i.onsuccess = function() {
                                                    var e = i.result;
                                                    e.close(), t(e)
                                                }
                                            });
                                            return l.then(function(e) {
                                                r.db = e;
                                                for (var t = 0; t < i.length; t++) {
                                                    var n = i[t];
                                                    n._dbInfo.db = e, y(n._dbInfo)
                                                }
                                            }).catch(function(t) {
                                                throw (E(e, t) || s.resolve()).catch(function() {}), t
                                            })
                                        }
                                    } : function(t) {
                                        _(e);
                                        var n = v[e.name],
                                            r = n.forages;
                                        t.close();
                                        for (var i = 0; i < r.length; i++) r[i]._dbInfo.db = null;
                                        var a = new s(function(t, n) {
                                            var r = o.deleteDatabase(e.name);
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
                                            for (var t = 0; t < r.length; t++) y(r[t]._dbInfo)
                                        }).catch(function(t) {
                                            throw (E(e, t) || s.resolve()).catch(function() {}), t
                                        })
                                    }) : s.reject("Invalid arguments"), t), n
                                }
                            },
                            N = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                            L = /^~~local_forage_type~([^~]+)~/,
                            C = "__lfsc__:",
                            M = "arbf",
                            R = "blob",
                            P = "si08",
                            U = "ui08",
                            B = "uic8",
                            j = "si16",
                            W = "si32",
                            V = "ur16",
                            H = "ui32",
                            K = "fl32",
                            F = "fl64",
                            z = Object.prototype.toString;

                        function q(e) {
                            var t, n, r, i, o, a = .75 * e.length,
                                s = e.length,
                                c = 0;
                            "=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
                            var l = new ArrayBuffer(a),
                                d = new Uint8Array(l);
                            for (t = 0; t < s; t += 4) n = N.indexOf(e[t]), r = N.indexOf(e[t + 1]), i = N.indexOf(e[t + 2]), o = N.indexOf(e[t + 3]), d[c++] = n << 2 | r >> 4, d[c++] = (15 & r) << 4 | i >> 2, d[c++] = (3 & i) << 6 | 63 & o;
                            return l
                        }

                        function G(e) {
                            var t, n = new Uint8Array(e),
                                r = "";
                            for (t = 0; t < n.length; t += 3) r += N[n[t] >> 2], r += N[(3 & n[t]) << 4 | n[t + 1] >> 4], r += N[(15 & n[t + 1]) << 2 | n[t + 2] >> 6], r += N[63 & n[t + 2]];
                            return n.length % 3 == 2 ? r = r.substring(0, r.length - 1) + "=" : n.length % 3 == 1 && (r = r.substring(0, r.length - 2) + "=="), r
                        }
                        var $ = {
                            serialize(e, t) {
                                var n = "";
                                if (e && (n = z.call(e)), e && ("[object ArrayBuffer]" === n || e.buffer && "[object ArrayBuffer]" === z.call(e.buffer))) {
                                    var r, i = C;
                                    e instanceof ArrayBuffer ? (r = e, i += M) : (r = e.buffer, "[object Int8Array]" === n ? i += P : "[object Uint8Array]" === n ? i += U : "[object Uint8ClampedArray]" === n ? i += B : "[object Int16Array]" === n ? i += j : "[object Uint16Array]" === n ? i += V : "[object Int32Array]" === n ? i += W : "[object Uint32Array]" === n ? i += H : "[object Float32Array]" === n ? i += K : "[object Float64Array]" === n ? i += F : t(new Error("Failed to get type for BinaryArray"))), t(i + G(r))
                                } else if ("[object Blob]" === n) {
                                    var o = new FileReader;
                                    o.onload = function() {
                                        var n = "~~local_forage_type~" + e.type + "~" + G(this.result);
                                        t(C + R + n)
                                    }, o.readAsArrayBuffer(e)
                                } else try {
                                    t(JSON.stringify(e))
                                } catch (n) {
                                    console.error("Couldn't convert value into a JSON string: ", e), t(null, n)
                                }
                            },
                            deserialize(e) {
                                if (e.substring(0, 9) !== C) return JSON.parse(e);
                                var t, n = e.substring(13),
                                    r = e.substring(9, 13);
                                if (r === R && L.test(n)) {
                                    var i = n.match(L);
                                    t = i[1], n = n.substring(i[0].length)
                                }
                                var o = q(n);
                                switch (r) {
                                    case M:
                                        return o;
                                    case R:
                                        return a([o], {
                                            type: t
                                        });
                                    case P:
                                        return new Int8Array(o);
                                    case U:
                                        return new Uint8Array(o);
                                    case B:
                                        return new Uint8ClampedArray(o);
                                    case j:
                                        return new Int16Array(o);
                                    case V:
                                        return new Uint16Array(o);
                                    case W:
                                        return new Int32Array(o);
                                    case H:
                                        return new Uint32Array(o);
                                    case K:
                                        return new Float32Array(o);
                                    case F:
                                        return new Float64Array(o);
                                    default:
                                        throw new Error("Unkown type: " + r)
                                }
                            },
                            stringToBuffer: q,
                            bufferToString: G
                        };

                        function Y(e, t, n, r) {
                            e.executeSql("CREATE TABLE IF NOT EXISTS " + t.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], n, r)
                        }

                        function J(e, t, n, r, i, o) {
                            e.executeSql(n, r, i, function(e, a) {
                                a.code === a.SYNTAX_ERR ? e.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [t.storeName], function(e, s) {
                                    s.rows.length ? o(e, a) : Y(e, t, function() {
                                        e.executeSql(n, r, i, o)
                                    }, o)
                                }, o) : o(e, a)
                            }, o)
                        }

                        function X(e, t, n, r) {
                            var i = this;
                            e = d(e);
                            var o = new s(function(o, a) {
                                i.ready().then(function() {
                                    void 0 === t && (t = null);
                                    var s = t,
                                        c = i._dbInfo;
                                    c.serializer.serialize(t, function(t, l) {
                                        l ? a(l) : c.db.transaction(function(n) {
                                            J(n, c, "INSERT OR REPLACE INTO " + c.storeName + " (key, value) VALUES (?, ?)", [e, t], function() {
                                                o(s)
                                            }, function(e, t) {
                                                a(t)
                                            })
                                        }, function(t) {
                                            if (t.code === t.QUOTA_ERR) {
                                                if (r > 0) return void o(X.apply(i, [e, s, n, r - 1]));
                                                a(t)
                                            }
                                        })
                                    })
                                }).catch(a)
                            });
                            return c(o, n), o
                        }
                        var Q = {
                            _driver: "webSQLStorage",
                            _initStorage(e) {
                                var t = this,
                                    n = {
                                        db: null
                                    };
                                if (e)
                                    for (var r in e) n[r] = "string" != typeof e[r] ? e[r].toString() : e[r];
                                var i = new s(function(e, r) {
                                    try {
                                        n.db = openDatabase(n.name, String(n.version), n.description, n.size)
                                    } catch (e) {
                                        return r(e)
                                    }
                                    n.db.transaction(function(i) {
                                        Y(i, n, function() {
                                            t._dbInfo = n, e()
                                        }, function(e, t) {
                                            r(t)
                                        })
                                    }, r)
                                });
                                return n.serializer = $, i
                            },
                            _support: "function" == typeof openDatabase,
                            iterate(e, t) {
                                var n = this,
                                    r = new s(function(t, r) {
                                        n.ready().then(function() {
                                            var i = n._dbInfo;
                                            i.db.transaction(function(n) {
                                                J(n, i, "SELECT * FROM " + i.storeName, [], function(n, r) {
                                                    for (var o = r.rows, a = o.length, s = 0; s < a; s++) {
                                                        var c = o.item(s),
                                                            l = c.value;
                                                        if (l && (l = i.serializer.deserialize(l)), void 0 !== (l = e(l, c.key, s + 1))) return void t(l)
                                                    }
                                                    t()
                                                }, function(e, t) {
                                                    r(t)
                                                })
                                            })
                                        }).catch(r)
                                    });
                                return c(r, t), r
                            },
                            getItem(e, t) {
                                var n = this;
                                e = d(e);
                                var r = new s(function(t, r) {
                                    n.ready().then(function() {
                                        var i = n._dbInfo;
                                        i.db.transaction(function(n) {
                                            J(n, i, "SELECT * FROM " + i.storeName + " WHERE key = ? LIMIT 1", [e], function(e, n) {
                                                var r = n.rows.length ? n.rows.item(0).value : null;
                                                r && (r = i.serializer.deserialize(r)), t(r)
                                            }, function(e, t) {
                                                r(t)
                                            })
                                        })
                                    }).catch(r)
                                });
                                return c(r, t), r
                            },
                            setItem(e, t, n) {
                                return X.apply(this, [e, t, n, 1])
                            },
                            removeItem(e, t) {
                                var n = this;
                                e = d(e);
                                var r = new s(function(t, r) {
                                    n.ready().then(function() {
                                        var i = n._dbInfo;
                                        i.db.transaction(function(n) {
                                            J(n, i, "DELETE FROM " + i.storeName + " WHERE key = ?", [e], function() {
                                                t()
                                            }, function(e, t) {
                                                r(t)
                                            })
                                        })
                                    }).catch(r)
                                });
                                return c(r, t), r
                            },
                            clear(e) {
                                var t = this,
                                    n = new s(function(e, n) {
                                        t.ready().then(function() {
                                            var r = t._dbInfo;
                                            r.db.transaction(function(t) {
                                                J(t, r, "DELETE FROM " + r.storeName, [], function() {
                                                    e()
                                                }, function(e, t) {
                                                    n(t)
                                                })
                                            })
                                        }).catch(n)
                                    });
                                return c(n, e), n
                            },
                            length(e) {
                                var t = this,
                                    n = new s(function(e, n) {
                                        t.ready().then(function() {
                                            var r = t._dbInfo;
                                            r.db.transaction(function(t) {
                                                J(t, r, "SELECT COUNT(key) as c FROM " + r.storeName, [], function(t, n) {
                                                    var r = n.rows.item(0).c;
                                                    e(r)
                                                }, function(e, t) {
                                                    n(t)
                                                })
                                            })
                                        }).catch(n)
                                    });
                                return c(n, e), n
                            },
                            key(e, t) {
                                var n = this,
                                    r = new s(function(t, r) {
                                        n.ready().then(function() {
                                            var i = n._dbInfo;
                                            i.db.transaction(function(n) {
                                                J(n, i, "SELECT key FROM " + i.storeName + " WHERE id = ? LIMIT 1", [e + 1], function(e, n) {
                                                    var r = n.rows.length ? n.rows.item(0).key : null;
                                                    t(r)
                                                }, function(e, t) {
                                                    r(t)
                                                })
                                            })
                                        }).catch(r)
                                    });
                                return c(r, t), r
                            },
                            keys(e) {
                                var t = this,
                                    n = new s(function(e, n) {
                                        t.ready().then(function() {
                                            var r = t._dbInfo;
                                            r.db.transaction(function(t) {
                                                J(t, r, "SELECT key FROM " + r.storeName, [], function(t, n) {
                                                    for (var r = [], i = 0; i < n.rows.length; i++) r.push(n.rows.item(i).key);
                                                    e(r)
                                                }, function(e, t) {
                                                    n(t)
                                                })
                                            })
                                        }).catch(n)
                                    });
                                return c(n, e), n
                            },
                            dropInstance(e, t) {
                                t = u.apply(this, arguments);
                                var n = this.config();
                                (e = "function" != typeof e && e || {}).name || (e.name = e.name || n.name, e.storeName = e.storeName || n.storeName);
                                var r, i = this;
                                return c(r = e.name ? new s(function(t) {
                                    var r;
                                    r = e.name === n.name ? i._dbInfo.db : openDatabase(e.name, "", "", 0), t(e.storeName ? {
                                        db: r,
                                        storeNames: [e.storeName]
                                    } : function(e) {
                                        return new s(function(t, n) {
                                            e.transaction(function(r) {
                                                r.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(n, r) {
                                                    for (var i = [], o = 0; o < r.rows.length; o++) i.push(r.rows.item(o).name);
                                                    t({
                                                        db: e,
                                                        storeNames: i
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
                                    return new s(function(t, n) {
                                        e.db.transaction(function(r) {
                                            function i(e) {
                                                return new s(function(t, n) {
                                                    r.executeSql("DROP TABLE IF EXISTS " + e, [], function() {
                                                        t()
                                                    }, function(e, t) {
                                                        n(t)
                                                    })
                                                })
                                            }
                                            for (var o = [], a = 0, c = e.storeNames.length; a < c; a++) o.push(i(e.storeNames[a]));
                                            s.all(o).then(function() {
                                                t()
                                            }).catch(function(e) {
                                                n(e)
                                            })
                                        }, function(e) {
                                            n(e)
                                        })
                                    })
                                }) : s.reject("Invalid arguments"), t), r
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
                                    }() || localStorage.length > 0 ? (this._dbInfo = t, t.serializer = $, s.resolve()) : s.reject()
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
                                            for (var t = n._dbInfo, r = t.keyPrefix, i = r.length, o = localStorage.length, a = 1, s = 0; s < o; s++) {
                                                var c = localStorage.key(s);
                                                if (0 === c.indexOf(r)) {
                                                    var l = localStorage.getItem(c);
                                                    if (l && (l = t.serializer.deserialize(l)), void 0 !== (l = e(l, c.substring(i), a++))) return l
                                                }
                                            }
                                        });
                                    return c(r, t), r
                                },
                                getItem(e, t) {
                                    var n = this;
                                    e = d(e);
                                    var r = n.ready().then(function() {
                                        var t = n._dbInfo,
                                            r = localStorage.getItem(t.keyPrefix + e);
                                        return r && (r = t.serializer.deserialize(r)), r
                                    });
                                    return c(r, t), r
                                },
                                setItem(e, t, n) {
                                    var r = this;
                                    e = d(e);
                                    var i = r.ready().then(function() {
                                        void 0 === t && (t = null);
                                        var n = t;
                                        return new s(function(i, o) {
                                            var a = r._dbInfo;
                                            a.serializer.serialize(t, function(t, r) {
                                                if (r) o(r);
                                                else try {
                                                    localStorage.setItem(a.keyPrefix + e, t), i(n)
                                                } catch (e) {
                                                    "QuotaExceededError" !== e.name && "NS_ERROR_DOM_QUOTA_REACHED" !== e.name || o(e), o(e)
                                                }
                                            })
                                        })
                                    });
                                    return c(i, n), i
                                },
                                removeItem(e, t) {
                                    var n = this;
                                    e = d(e);
                                    var r = n.ready().then(function() {
                                        localStorage.removeItem(n._dbInfo.keyPrefix + e)
                                    });
                                    return c(r, t), r
                                },
                                clear(e) {
                                    var t = this,
                                        n = t.ready().then(function() {
                                            for (var e = t._dbInfo.keyPrefix, n = localStorage.length - 1; n >= 0; n--) {
                                                var r = localStorage.key(n);
                                                0 === r.indexOf(e) && localStorage.removeItem(r)
                                            }
                                        });
                                    return c(n, e), n
                                },
                                length(e) {
                                    var t = this.keys().then(function(e) {
                                        return e.length
                                    });
                                    return c(t, e), t
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
                                    return c(r, t), r
                                },
                                keys(e) {
                                    var t = this,
                                        n = t.ready().then(function() {
                                            for (var e = t._dbInfo, n = localStorage.length, r = [], i = 0; i < n; i++) {
                                                var o = localStorage.key(i);
                                                0 === o.indexOf(e.keyPrefix) && r.push(o.substring(e.keyPrefix.length))
                                            }
                                            return r
                                        });
                                    return c(n, e), n
                                },
                                dropInstance(e, t) {
                                    if (t = u.apply(this, arguments), !(e = "function" != typeof e && e || {}).name) {
                                        var n = this.config();
                                        e.name = e.name || n.name, e.storeName = e.storeName || n.storeName
                                    }
                                    var r, i = this;
                                    return c(r = e.name ? new s(function(t) {
                                        t(e.storeName ? Z(e, i._defaultConfig) : e.name + "/")
                                    }).then(function(e) {
                                        for (var t = localStorage.length - 1; t >= 0; t--) {
                                            var n = localStorage.key(t);
                                            0 === n.indexOf(e) && localStorage.removeItem(n)
                                        }
                                    }) : s.reject("Invalid arguments"), t), r
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
                            ie = {},
                            oe = {},
                            ae = {
                                INDEXEDDB: x,
                                WEBSQL: Q,
                                LOCALSTORAGE: ee
                            },
                            se = [ae.INDEXEDDB._driver, ae.WEBSQL._driver, ae.LOCALSTORAGE._driver],
                            ce = ["dropInstance"],
                            le = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(ce),
                            de = {
                                description: "",
                                driver: se.slice(),
                                name: "localforage",
                                size: 4980736,
                                storeName: "keyvaluepairs",
                                version: 1
                            };

                        function ue(e, t) {
                            e[t] = function() {
                                var n = arguments;
                                return e.ready().then(function() {
                                    return e[t].apply(e, n)
                                })
                            }
                        }

                        function pe() {
                            for (var e = 1; e < arguments.length; e++) {
                                var t = arguments[e];
                                if (t)
                                    for (var n in t) t.hasOwnProperty(n) && (arguments[0][n] = re(t[n]) ? t[n].slice() : t[n])
                            }
                            return arguments[0]
                        }
                        var fe = function() {
                                function e(t) {
                                    for (var n in function(e, t) {
                                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                        }(this, e), ae)
                                        if (ae.hasOwnProperty(n)) {
                                            var r = ae[n],
                                                i = r._driver;
                                            this[n] = i, ie[i] || this.defineDriver(r)
                                        }
                                    this._defaultConfig = pe({}, de), this._config = pe({}, this._defaultConfig, t), this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch(function() {})
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
                                    var r = new s(function(t, n) {
                                        try {
                                            var r = e._driver,
                                                i = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                                            if (!e._driver) return void n(i);
                                            for (var o = le.concat("_initStorage"), a = 0, l = o.length; a < l; a++) {
                                                var d = o[a];
                                                if ((!ne(ce, d) || e[d]) && "function" != typeof e[d]) return void n(i)
                                            }! function() {
                                                for (var t = function(e) {
                                                        return function() {
                                                            var t = new Error("Method " + e + " is not implemented by the current driver"),
                                                                n = s.reject(t);
                                                            return c(n, arguments[arguments.length - 1]), n
                                                        }
                                                    }, n = 0, r = ce.length; n < r; n++) {
                                                    var i = ce[n];
                                                    e[i] || (e[i] = t(i))
                                                }
                                            }();
                                            var u = function(n) {
                                                ie[r] && console.info("Redefining LocalForage driver: " + r), ie[r] = e, oe[r] = n, t()
                                            };
                                            "_support" in e ? e._support && "function" == typeof e._support ? e._support().then(u, n) : u(!!e._support) : u(!0)
                                        } catch (e) {
                                            n(e)
                                        }
                                    });
                                    return l(r, t, n), r
                                }, e.prototype.driver = function() {
                                    return this._driver || null
                                }, e.prototype.getDriver = function(e, t, n) {
                                    var r = ie[e] ? s.resolve(ie[e]) : s.reject(new Error("Driver not found."));
                                    return l(r, t, n), r
                                }, e.prototype.getSerializer = function(e) {
                                    var t = s.resolve($);
                                    return l(t, e), t
                                }, e.prototype.ready = function(e) {
                                    var t = this,
                                        n = t._driverSet.then(function() {
                                            return null === t._ready && (t._ready = t._initDriver()), t._ready
                                        });
                                    return l(n, e, e), n
                                }, e.prototype.setDriver = function(e, t, n) {
                                    var r = this;
                                    re(e) || (e = [e]);
                                    var i = this._getSupportedDrivers(e);

                                    function o() {
                                        r._config.driver = r.driver()
                                    }

                                    function a(e) {
                                        return r._extend(e), o(), r._ready = r._initStorage(r._config), r._ready
                                    }
                                    var c = null !== this._driverSet ? this._driverSet.catch(function() {
                                        return s.resolve()
                                    }) : s.resolve();
                                    return this._driverSet = c.then(function() {
                                        var e = i[0];
                                        return r._dbInfo = null, r._ready = null, r.getDriver(e).then(function(e) {
                                            r._driver = e._driver, o(), r._wrapLibraryMethodsWithReady(), r._initDriver = function(e) {
                                                return function() {
                                                    var t = 0;
                                                    return function n() {
                                                        for (; t < e.length;) {
                                                            var i = e[t];
                                                            return t++, r._dbInfo = null, r._ready = null, r.getDriver(i).then(a).catch(n)
                                                        }
                                                        o();
                                                        var c = new Error("No available storage method found.");
                                                        return r._driverSet = s.reject(c), r._driverSet
                                                    }()
                                                }
                                            }(i)
                                        })
                                    }).catch(function() {
                                        o();
                                        var e = new Error("No available storage method found.");
                                        return r._driverSet = s.reject(e), r._driverSet
                                    }), l(this._driverSet, t, n), this._driverSet
                                }, e.prototype.supports = function(e) {
                                    return !!oe[e]
                                }, e.prototype._extend = function(e) {
                                    pe(this, e)
                                }, e.prototype._getSupportedDrivers = function(e) {
                                    for (var t = [], n = 0, r = e.length; n < r; n++) {
                                        var i = e[n];
                                        this.supports(i) && t.push(i)
                                    }
                                    return t
                                }, e.prototype._wrapLibraryMethodsWithReady = function() {
                                    for (var e = 0, t = le.length; e < t; e++) ue(this, le[e])
                                }, e.prototype.createInstance = function(t) {
                                    return new e(t)
                                }, e
                            }(),
                            ve = new fe;
                        t.exports = ve
                    }, {
                        3: 3
                    }]
                }, {}, [4])(4)
            },
            634(e, t, n) {
                "use strict";
                var r, i, o, a, s, c, l, d, u;
                n.d(t, {
                    Dg() {
                        return b
                    },
                    Kj() {
                        return g
                    },
                    VR() {
                        return m
                    },
                    pS() {
                        return h
                    }
                });
                const p = "undefined" != typeof window ? window : "undefined" != typeof self ? self : "undefined" != typeof globalThis ? globalThis : {},
                    f = null !== (r = p.__moe_original_methods__) && void 0 !== r ? r : {},
                    v = "__zone_symbol__",
                    h = null !== (o = null !== (i = f.setTimeout) && void 0 !== i ? i : p[`${v}setTimeout`]) && void 0 !== o ? o : p.setTimeout,
                    g = null !== (s = null !== (a = f.clearTimeout) && void 0 !== a ? a : p[`${v}clearTimeout`]) && void 0 !== s ? s : p.clearTimeout,
                    m = null !== (l = null !== (c = f.Promise) && void 0 !== c ? c : p[`${v}Promise`]) && void 0 !== l ? l : p.Promise,
                    b = null !== (u = null !== (d = f.MutationObserver) && void 0 !== d ? d : p[`${v}MutationObserver`]) && void 0 !== u ? u : p.MutationObserver
            }
        },
        t = {};

    function n(r) {
        var i = t[r];
        if (void 0 !== i) return i.exports;
        var o = t[r] = {
            exports: {}
        };
        return e[r](o, o.exports, n), o.exports
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
    }(), n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
    var r = {};
    (() => {
        "use strict";
        n.d(r, {
            A() {
                return Xi
            }
        });
        var e = n(634).VR;

        function t(t, n, r, i) {
            return new(r || (r = e))(function(e, o) {
                function a(e) {
                    try {
                        c(i.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        c(i.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(t) {
                    var n;
                    t.done ? e(t.value) : (n = t.value, n instanceof r ? n : new r(function(e) {
                        e(n)
                    })).then(a, s)
                }
                c((i = i.apply(t, n || [])).next())
            })
        }
        "function" == typeof SuppressedError && SuppressedError;
        const i = "USER_ATTRIBUTE_UNIQUE_ID",
            o = [i, "USER_ID_MODIFIED_FROM"],
            a = [{
                moeName: "uid",
                attributeName: "USER_ATTRIBUTE_UNIQUE_ID",
                programName: "id"
            }, {
                moeName: "u_em",
                attributeName: "USER_ATTRIBUTE_USER_EMAIL",
                programName: "email"
            }, {
                moeName: "u_gd",
                attributeName: "USER_ATTRIBUTE_USER_GENDER",
                programName: "gender"
            }, {
                moeName: "u_bd",
                attributeName: "USER_ATTRIBUTE_USER_BDAY",
                programName: "birthday"
            }, {
                moeName: "u_n",
                attributeName: "USER_ATTRIBUTE_USER_NAME",
                programName: "name"
            }, {
                moeName: "u_fn",
                attributeName: "USER_ATTRIBUTE_USER_FIRST_NAME",
                programName: "first_name"
            }, {
                moeName: "u_ln",
                attributeName: "USER_ATTRIBUTE_USER_LAST_NAME",
                programName: "last_name"
            }, {
                moeName: "u_mb",
                attributeName: "USER_ATTRIBUTE_USER_MOBILE",
                programName: "mobile"
            }],
            s = /^www\./,
            c = "MOE_LIFECYCLE",
            l = "SDK_INITIALIZED",
            d = "SDK_DISABLED",
            u = "WEBP_INITIALIZED",
            p = "MOE_STORAGE_UPDATED",
            f = "USER_LIFECYCLE",
            v = "USER_IDENTITY_UPDATE",
            h = "LOGOUT",
            g = "PAGE_CHANGED",
            m = "MESSAGE_LOGGED",
            b = {
                dc_1: "DC_1",
                dc_2: "DC_2",
                dc_3: "DC_3",
                dc_4: "DC_4",
                dc_5: "DC_5",
                dc_6: "DC_6",
                dc_100: "DC_100",
                dc_101: "DC_101"
            },
            _ = {
                DC_1: "sdk-01.moengage.com",
                DC_2: "sdk-02.moengage.com",
                DC_3: "sdk-03.moengage.com",
                DC_4: "sdk-04.moengage.com",
                DC_5: "sdk-05.moengage.com",
                DC_6: "sdk-06.moengage.com",
                DC_100: "sdk-100.moengage.com",
                DC_101: "sdk-101.moengage.com",
                EU: "sdk-02.moengage.com",
                IN: "sdk-03.moengage.com"
            },
            y = {
                COOKIE_NAME_MAPPING: {
                    USER_DATA: "moe_u_d",
                    SUBSCRIPTION_DETAILS: "moe_s_d",
                    PUSH_TOKEN: "moe_p_t",
                    OPT_IN_SHOWN_TIME: "moe_o_s_t",
                    SOFT_ASK_STATUS: "moe_s_a_s",
                    HARD_ASK_STATUS: "moe_h_a_s",
                    SESSION: "moe_s_n",
                    DEVICE_DATA: "moe_d_d",
                    IDENTITY_MAP: "moe_i_m",
                    SDK_DISABLED: "moe_dis",
                    COOKIE_SHARING: "moe_c_s",
                    DATA_TRACKING_DISABLED: "moe_dt_d"
                },
                PERMISSION_STATE_MAPPING: {
                    prompt: 2,
                    granted: 1,
                    dismissed: 3,
                    denied: 0,
                    shown: 4,
                    "not shown": 5,
                    allowed: 6
                },
                SUBSCRIPTION_DETAILS_KEYS: {
                    domain: "d",
                    token: "t",
                    endpoint: "e",
                    keys: "k",
                    p256dh: "p",
                    auth: "a"
                },
                USER_DATA_KEYS: {
                    attributes: "a",
                    subscribedToOldSdk: "s_old",
                    deviceUuid: "d_id",
                    deviceAdded: "d_added"
                },
                ATTRIBUTE_KEYS: {
                    key: "k",
                    value: "v",
                    updated_at: "u_at",
                    level: "l"
                },
                IDENTITY_MAP_KEYS: {
                    userIdentities: "u_i",
                    previousIdentities: "p_i",
                    previousIdentitiesUpdatedTime: "p_i_u_t"
                },
                SESSION_KEYS: {
                    sessionKey: "s_k",
                    sessionStartTime: "s_s_t",
                    sessionMaxTime: "s_m_t",
                    customIdentifiersToTrack: "c_i_t_t",
                    sessionExpiryTime: "s_e_t",
                    numberOfSessions: "n_o_s",
                    currentSource: "c_s",
                    moeReferrer: "m_r"
                },
                SOURCE_KEYS: {
                    source: "s",
                    medium: "m",
                    source_url: "s_u",
                    term: "t",
                    campaign_name: "c_n",
                    campaign_id: "c_id",
                    content: "c",
                    extra: "e"
                },
                DEVICE_DATA_KEYS: {
                    deviceUniqueId: "d_uid"
                },
                ENDPOINT_URL_MAPPING: {
                    "https://fcm.googleapis.com/fcm/send/": "f",
                    "https://wns2-pn1p.notify.windows.com/w/": "w",
                    "https://wns2-sin1p.notify.windows.com/": "w1",
                    "https://wns2-bay1p.notify.windows.com/": "w2",
                    "https://updates.push.services.mozilla.com/wpush/v2/": "m",
                    "https://web.push.apple.com/": "a"
                }
            },
            E = "number",
            S = "moe-web-assist-plugin-chrome-ext",
            T = "Setup",
            I = "Info",
            w = "https://www.moengage.com/docs/developer-guide",
            A = {
                MOE_DASHBOARD: "https://dashboard.moengage.com",
                WEBSDK_DOCS: w + "/web-sdk/web-sdk-integration/basic-integration/web-sdk-integration",
                SELF_HANDLED_WEB_PUSH: w + "/web-sdk/web-push/configure-self-handled-opt-in",
                EVENTS_TRACKING: w + "/web-sdk/data-tracking/web-sdk-events-tracking",
                USER_ATTRIBUTES_TRACKING: w + "/web-sdk/data-tracking/web-sdk-user-attributes-tracking",
                BOTS_BLOCKING: w + "/web-sdk/web-sdk-integration/advanced-integration/bot-traffic-blocking",
                COMPATIBILITY_MATRIX: w + "/web-sdk/web-sdk-overview/web-sdk-browser-compatibility-matrix",
                LIFECYCLE_CALLBACKS: w + "/web-sdk/web-sdk-integration/advanced-integration/web-sdk-lifecycle-callbacks",
                WEB_PUSH: w + "/web-sdk/web-push/configure-and-integrate-web-push",
                PUSH_COMPATIBILITY_MATRIX: w + "/web-sdk/web-push/web-push-overview",
                WEB_PERSONALIZATION: w + "/personalize-sdk/sdk-integration/web-personalization-v2",
                WEB_OPT_OUT: w + "/web-sdk/web-sdk-integration/advanced-integration/web-sdk-opt-out",
                DATA_OPT_OUT: w + "/web-sdk/data-tracking/configure-data-opt-out-in-web-sdk"
            },
            O = "moe_uuid",
            D = "MoengagePageEventHistoryManager",
            k = "TEST",
            x = "LIVE",
            N = "NONE",
            L = "LIMITED",
            C = "ALL",
            M = [0, 1, 2],
            R = {
                USER_DATA: "USER_DATA",
                PUSH_TOKEN: "PUSH_TOKEN",
                SUBSCRIPTION_DETAILS: "SUBSCRIPTION_DETAILS",
                SETUP_TIME: "SETUP_TIME",
                OPT_IN_SHOWN_TIME: "OPT_IN_SHOWN_TIME",
                OPTED_STATUS_TRACK_TIME: "OPTED_STATUS_TRACK_TIME",
                SOFT_ASK_STATUS: "SOFT_ASK_STATUS",
                HARD_ASK_STATUS: "HARD_ASK_STATUS",
                WEB_SETTINGS: "WEB_SETTINGS",
                GRACEFUL_DATA: "GRACEFUL_DATA",
                Q: {
                    PREFIX: "Q",
                    REPORT: "REPORT",
                    DEVICE: "DEVICE"
                },
                INIT_DATA: "INIT_DATA",
                OLD_SDK: {
                    USER_DATA: "moengage_data",
                    SUBSCRIPTION_DETAILS: "MOE_PUSH_ENDPOINT",
                    PUSH_TOKEN: "MOE_PUSH_TOKEN"
                },
                BROWSER_DETAILS: "browserDetails",
                SESSION: "SESSION",
                DEVICE_DATA: "DEVICE_DATA",
                IDENTITY_MAP: "IDENTITY_MAP",
                SDK_VERSION: "SDK_VERSION",
                SDK_DISABLED: "SDK_DISABLED",
                DATA_TRACKING_DISABLED: "DATA_TRACKING_DISABLED",
                LOGOUT_IN_PROGRESS: "LOGOUT_IN_PROGRESS"
            },
            P = "initData",
            U = "unifiedLogs",
            B = "COOKIE_SHARING",
            j = [R.DEVICE_DATA],
            W = "v1/experiences/web/live",
            V = "v1/experiences/web/stats",
            H = "v1/experiences/web/live_recom",
            K = "v1/experiences/web/split",
            F = "v1/experiences/web/recommendations",
            z = "v1/experiences/sdk/fetch",
            q = "v1/experiences/sdk/simulate",
            G = "insert",
            $ = "rearrange",
            Y = "insert_js",
            J = "update",
            X = "update_outerhtml",
            Q = "insert_image",
            Z = "replace",
            ee = [G, Q, Z, J, X, $],
            te = [G, $, Y],
            ne = [G, $],
            re = "#85586F",
            ie = "moePageContext",
            oe = "data-moe-id",
            ae = "live",
            se = "moeWpE",
            ce = "Version not found in staging",
            le = "moe-anti-flicker-hide",
            de = "moe-anti-flicker-style",
            ue = "MOE_WEBP_MESSAGE_CLICKED",
            pe = "moe-show-personalized-experience",
            fe = "data-moe-personalized-label",
            ve = "data-moe-backup-title",
            he = "data-moe-rearrange-id",
            ge = {
                update: "Text edited",
                attribute: "Attributes updated",
                tracking: "Tracking enabled",
                insert: "Custom HTML added",
                insert_js: "",
                update_outerhtml: "HTML edited",
                rearrange: "Element rearranged",
                insert_image: "Image added",
                replace: "Element replaced"
            },
            me = "moe_webp",
            be = {
                STORE_NAME: "ai_experiences",
                AI_EXPERIENCE_CONTEXT: "ai_experience_context",
                WEB_ACTION_EVENTS: "web_action_events",
                WEB_ACTIONS_LAST_FETCHED_TIME: "web_actions_last_fetched_time"
            },
            _e = {
                STORE_NAME: "meta",
                LAST_FETCHED_TIME: "last_fetched_time",
                SELF_HANDLE_LAST_FETCHED_TIME: "self_handle_last_fetched_time",
                SELF_HANDLE_CUSTOM_ATTRIBUTES: "self_handle_custom_attributes",
                USER_IN_GCG: "user_in_gcg",
                UNIQUE_ID: "unique_id"
            },
            ye = {
                STORE_NAME: "inSession",
                IN_SESSION_EVENTS: "in_session_events",
                IN_SESSION_EVENTS_HISTORY: "in_session_events_history"
            },
            Ee = be,
            Se = _e,
            Te = ye;

        function Ie(e, t, n) {
            return null != e && t ? (e = e[(t = Array.isArray(t) ? t : t.split("."))[0]]) && t.length > 1 ? Ie(e, t.slice(1), n) : void 0 === e ? n || null : e : null
        }
        class we {
            static set(e, t) {
                window && (window.moeInternals ? (window.moeInternals.ephemeral || (window.moeInternals.ephemeral = {}), window.moeInternals.ephemeral[e] = t) : (window.moeInternals = {}, window.moeInternals.ephemeral = {}, window.moeInternals.ephemeral[e] = t))
            }
            static get(e) {
                return Ie(window, "moeInternals.ephemeral." + e, null)
            }
            static clear() {
                window && (window.moeInternals = {}, window.moeInternals.ephemeral = {})
            }
        }
        we.baseLogTag = "EphemeralStorage";
        const Ae = we;
        class Oe {
            static logData(e, t) {
                return {
                    log_type: e,
                    sent_time: (new Date).toISOString(),
                    lake_fields: t
                }
            }
            static setRemoteLogging(e, t) {
                return this.isTrackingEnabled || (this.logLevel = e, this.isTrackingEnabled = t), this.isTrackingEnabled
            }
            static log(e, t, n, r, ...i) {
                !this.isTrackingEnabled || e !== this.logLevel && "verbose" !== this.logLevel || window[window.moengage_object || "Moengage"].remoteLogs.addRemoteLogs(this.logData(e, {
                    msg: n + [...i].toString(),
                    file_name: t,
                    trace: r
                }))
            }
        }
        const De = (e, t) => `The "${e}" parameter is deprecated. Use "${t}" instead.`,
            ke = e => `Issue in web personalization. Invalid query selector provided: ${e}`,
            xe = "Unable to find selector",
            Ne = "Unable to find content",
            Le = "Unable to find content / placement",
            Ce = e => `Content not found: ${e}`;

        function Me(e) {
            return function(e, t) {
                const n = function(e, t) {
                    var n;
                    const r = (null == e ? void 0 : e.attributes) || [];
                    for (let e = r.length - 1; e >= 0; e--)
                        if ((null === (n = r[e]) || void 0 === n ? void 0 : n.key) === t) return e;
                    return -1
                }(e, t);
                return n >= 0 ? e.attributes[n].value : null
            }(e, i)
        }

        function Re(e, t, n) {
            if (null == t) return e;
            const r = Object.assign({}, t),
                i = r.attributes,
                o = null == e ? void 0 : e.attributes;
            if (!Array.isArray(i) || !Array.isArray(o) || 0 === o.length) return r;
            const a = [...o];
            return i.forEach(e => {
                const t = a.findIndex(t => t.key === e.key && t.level === e.level);
                t >= 0 ? a[t] = e : a.push(e)
            }), r.attributes = a.filter(e => !n(e.key) || i.some(t => t.key === e.key && t.level === e.level)), r
        }
        const Pe = "initDataHelpers",
            Ue = (e, t) => null != Ie(e, "debug_logs", null) ? t : 0;
        class Be {
            constructor(e) {
                this.debugLevel = 0, this.sdkEnvironment = x, this.logLevel = 0, this.cluster = null, this.environment = null, this.baseDomainName = "https://sdk-01.moengage.com/", this.inapp = null, this.customSoftAsk = null, this.nativeMethodsUsed = !1;
                const t = Be.baseLogTag + ".constructor";
                null != Ie(e, "appId", null) ? this.appId = Ie(e, "appId", null) : null != Ie(e, "app_id", null) ? (fn.warn(2, t, De("app_id", "appId")), this.appId = Ie(e, "app_id", null)) : fn.errorAndBroadcast(1, t, T, "appId not specified", "Please check the dev documentation to complete the integration.", A.WEBSDK_DOCS, A.WEBSDK_DOCS), this.debugLevel = null != Ie(e, "debug_logs", null) ? Ie(e, "debug_logs", 0) : null != Ie(e, "debugLevel", null) ? Ie(e, "debugLevel", 0) : 0;
                const n = Ie(e, "env", null),
                    r = Ie(e, "logLevel", null);
                if (((e, t, n) => {
                        const r = Pe + ".warnIfDeprecatedDebugLogsUsed";
                        null == t && null == n || null == Ie(e, "debug_logs", null) || fn.warn(1, r, 'The "debug_logs" parameter is deprecated. Remove it and use "env" ("LIVE"/"TEST") and "logLevel" (0/1/2 or "NONE"/"LIMITED"/"ALL") instead.')
                    })(e, n, r), this.sdkEnvironment = ((e, t) => {
                        const n = Pe + ".parseSdkEnvironment";
                        if (null != e) {
                            const t = String(e).toUpperCase();
                            return t === k || t === x ? t : (fn.warnAndBroadcast(1, n, T, "Invalid env value", `Invalid env value: "${e}". Must be "${x}" or "${k}" (case-insensitive). Defaulting to "${x}".`, A.WEBSDK_DOCS), x)
                        }
                        return t > 0 ? k : x
                    })(n, this.debugLevel), this.logLevel = ((e, t, n) => {
                        const r = Pe + ".parseLogLevel";
                        return null != e ? "string" == typeof e ? ((e, t, n) => {
                            const r = Pe + ".parseLogLevelFromString",
                                i = e.toUpperCase();
                            return i === N ? 0 : i === L ? 1 : i === C ? 2 : (fn.warnAndBroadcast(1, r, T, "Invalid logLevel string", `Invalid logLevel string: "${e}". Must be "${N}", "${L}", or "${C}" (case-insensitive). Using fallback value.`, A.WEBSDK_DOCS), Ue(t, n))
                        })(e, t, n) : "number" == typeof e ? ((e, t, n) => {
                            const r = Pe + ".parseLogLevelFromNumber";
                            return M.includes(e) ? e : (fn.warnAndBroadcast(1, r, T, "Invalid logLevel number", `Invalid logLevel number: ${e}. Must be 0 (no logs), 1 (limited logs only), or 2 (all logs). Using fallback value.`, A.WEBSDK_DOCS), Ue(t, n))
                        })(e, t, n) : (fn.warnAndBroadcast(1, r, T, "Invalid logLevel type", `Invalid logLevel type: ${typeof e}. Must be number (0, 1, 2) or string ("${N}", "${L}", "${C}"). Using fallback value.`, A.WEBSDK_DOCS), Ue(t, n)) : Ue(t, n)
                    })(r, e, this.debugLevel), this.appId) {
                    if (this.baseDomainName = "https://sdk-01.moengage.com/", this.forceSwUpdate = Ie(e, "forceSwUpdate", !1), this.cluster = b.dc_3, this.cluster = Ie(e, "cluster", this.cluster), this.cluster && null != _[this.cluster.toUpperCase()] && (this.environment = _[this.cluster.toUpperCase()]), Ie(e, "environment", null) && (this.environment = e.environment), this.environment && (this.baseDomainName = "https://" + this.environment + "/"), this.appId = ((e, t) => {
                            if (t === k) {
                                if (e.indexOf("_DEBUG") < 0) return e + "_DEBUG"
                            } else if (t === x && e.indexOf("_DEBUG") >= 0) return e.substring(0, e.indexOf("_DEBUG"));
                            return e
                        })(this.appId, this.sdkEnvironment), this.swPath = Ie(e, "swPath", null), null != e.customSoftAsk) this.customSoftAsk = {
                        mainClass: Ie(e, "customSoftAsk.mainClass", null),
                        allowClass: Ie(e, "customSoftAsk.allowClass", null),
                        dismissClass: Ie(e, "customSoftAsk.dismissClass", null)
                    };
                    else {
                        null != Ie(e, "soft_ask", null) && fn.warn(2, t, De("soft_ask", "softAsk"));
                        const n = {
                            mainClass: null,
                            allowClass: null,
                            dismissClass: null
                        };
                        null != Ie(e, "mainClass", null) ? n.mainClass = Ie(e, "mainClass", null) : null != Ie(e, "main_class", null) && (fn.warn(2, t, De("main_class", "mainClass")), n.mainClass = Ie(e, "main_class", null)), null != Ie(e, "allowClass", null) ? n.allowClass = Ie(e, "allowClass", null) : null != Ie(e, "allow_class", null) && (fn.warn(2, t, De("allow_class", "allowClass")), n.allowClass = Ie(e, "allow_class", null)), null != Ie(e, "dismissClass", null) ? n.dismissClass = Ie(e, "dismissClass", null) : null != Ie(e, "block_class", null) && (fn.warn(2, t, De("block_class", "dismissClass")), n.dismissClass = Ie(e, "block_class", null)), this.customSoftAsk = n
                    }
                    null != Ie(e, "inapp.host", null) && (this.inapp = {
                        host: Ie(e, "inapp.host", null)
                    }), null != Ie(e, "swScope", null) && (this.swScope = Ie(e, "swScope", null)), null != Ie(e, "disableOnsite", null) ? this.disableOnsite = Ie(e, "disableOnsite", !1) : null != Ie(e, "disable_onsite", null) && (fn.warn(2, t, De("disable_onsite", "disableOnsite")), this.disableOnsite = Ie(e, "disable_onsite", !1)), null != Ie(e, "enableSPA", null) && (this.enableSPA = Ie(e, "enableSPA", !1)), null != Ie(e, "cards", null) && (this.cards = Ie(e, "cards", {})), null != Ie(e, "botsList", null) ? this.botsList = Ie(e, "botsList", null) : null != Ie(e, "bots_list", null) && (fn.warn(2, t, De("bots_list", "botsList")), this.botsList = Ie(e, "bots_list", null)), null != Ie(e, "disableWebPush", null) ? this.disableWebPush = Ie(e, "disableWebPush", !1) : null != Ie(e, "disable_web_push", null) && (fn.warn(2, t, De("disable_web_push", "disableWebPush")), this.disableWebPush = Ie(e, "disable_web_push", !1)), null != Ie(e, "disableCookies", null) && (this.disableCookies = Ie(e, "disableCookies", !1)), null != Ie(e, "disableSdk", null) && (this.disableSdk = Ie(e, "disableSdk", !1)), null != Ie(e, "projectId", null) ? this.projectId = Ie(e, "projectId", null) : null != Ie(e, "project_id", null) && (fn.warn(2, t, De("project_id", "projectId")), this.projectId = Ie(e, "project_id", null));
                    const n = Ie(e, "contentSecurityNonce", null);
                    "string" == typeof n && n.length && (this.contentSecurityNonce = n);
                    const r = Ie(e, "customProxyDomain", null);
                    "string" == typeof r && r.length && (this.customProxyDomain = r, this.baseDomainName = this.baseDomainName.replace("moengage.com", this.customProxyDomain), this.environment && (this.environment = this.environment.replace("moengage.com", this.customProxyDomain)));
                    const i = null != Ie(e, "integrationType", null);
                    this.integrationType = i ? Ie(e, "integrationType", null) : function() {
                        var e, t;
                        return (null === (t = null === (e = window.chrome) || void 0 === e ? void 0 : e.runtime) || void 0 === t ? void 0 : t.id) ? "Chrome extension" : window.moeApp ? "Shopify" : "tv" === function() {
                            const e = navigator.userAgent.toLowerCase(),
                                t = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(e);
                            return /nexus player|neo-x5|adt-2|tsbnettv|roku|tizen|smart-tv.+(samsung)|hbbtv.+maple;(\d+)|(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))|(apple) ?tv|crkey|droid.+aft(\w)( bui|\))|\(dtv[\);].+(aquos)|(aquos-tv[\w ]+)\)|(bravia[\w ]+)( bui|\))|(mitv-\w{5}) bui|Hbbtv.*(technisat) (.*);|\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)|hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)|\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b|vizio smartcast|conjure\/\d+|smartcast/i.test(e) ? "tv" : t ? "tablet" : function() {
                                const e = navigator.userAgent;
                                return !(!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e) && !/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4)))
                            }() ? "mobile" : "web"
                        }() ? "TV" : window.analytics && window.analytics._VERSIONS ? "Segment" : "CDN"
                    }(), fn.log(2, t, `SDK Integration Type resolved as: ${this.integrationType} (${i?"explicitly set":"auto-detected"})`), this.integrationVersion = Ie(e, "integrationVersion", null)
                }
                this.nativeMethodsUsed = "undefined" != typeof window && "object" == typeof window.__moe_original_methods__ && "function" == typeof window.__moe_original_methods__.setTimeout, this.nativeMethodsUsed || "undefined" == typeof window || void 0 === window.Zone || fn.warn(1, t, "Native methods were not captured before the SDK loaded. Load sdk.moe_native_methods.js as the first <script> to avoid timer patching issues.")
            }
            static save(e) {
                const t = new Be(e);
                Ae.set(P, t), en.set(R.INIT_DATA, t)
            }
            static get() {
                return Ae.get(P)
            }
            static setIntegrationType(e) {
                const t = Be.get();
                t && (t.integrationType = e, Ae.set(P, t), en.set(R.INIT_DATA, t))
            }
            static setIntegrationVersion(e) {
                const t = Be.get();
                t && (t.integrationVersion = e, Ae.set(P, t), en.set(R.INIT_DATA, t))
            }
        }
        Be.baseLogTag = "InitData";
        const je = Be;
        class We {
            constructor() {
                this.items = []
            }
            static enqueue(e, t) {
                const n = We.getLocalStorageQName(e);
                let r = new We;
                en.get(n) && (r = en.get(n)), r.items.push(t), r.items = r.items.slice(Math.max(r.items.length - 50, 0)), en.set(n, r)
            }
            static dequeue(e) {
                const t = We.getLocalStorageQName(e),
                    n = en.get(t);
                let r = null;
                return n && n.items.length > 0 && (r = n.items[0], n.items.splice(0, 1), en.set(t, n)), r
            }
            static isEmpty(e) {
                const t = We.getLocalStorageQName(e);
                return !(en.get(t) && en.get(t).items.length > 0)
            }
            static purge(e) {
                const t = `${this.baseLogTag}.purge`,
                    n = We.getLocalStorageQName(e);
                We.isEmpty(e) || en.remove(n), fn.log(2, t, `Queue "${e}" has been cleared.`)
            }
            static getLocalStorageQName(e) {
                return R.Q.PREFIX + "_" + e
            }
        }
        We.baseLogTag = "LocalQ";
        const Ve = We;
        n(634);
        var He = Uint8Array,
            Ke = Uint16Array,
            Fe = Int32Array,
            ze = new He([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
            qe = new He([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
            Ge = new He([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
            $e = function(e, t) {
                for (var n = new Ke(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
                var i = new Fe(n[30]);
                for (r = 1; r < 30; ++r)
                    for (var o = n[r]; o < n[r + 1]; ++o) i[o] = o - n[r] << 5 | r;
                return {
                    b: n,
                    r: i
                }
            },
            Ye = $e(ze, 2),
            Je = Ye.b,
            Xe = Ye.r;
        Je[28] = 258, Xe[258] = 28;
        for (var Qe = $e(qe, 0), Ze = Qe.b, et = Qe.r, tt = new Ke(32768), nt = 0; nt < 32768; ++nt) {
            var rt = (43690 & nt) >> 1 | (21845 & nt) << 1;
            tt[nt] = ((65280 & (rt = (61680 & (rt = (52428 & rt) >> 2 | (13107 & rt) << 2)) >> 4 | (3855 & rt) << 4)) >> 8 | (255 & rt) << 8) >> 1
        }
        var it = function(e, t, n) {
                for (var r = e.length, i = 0, o = new Ke(t); i < r; ++i) e[i] && ++o[e[i] - 1];
                var a, s = new Ke(t);
                for (i = 1; i < t; ++i) s[i] = s[i - 1] + o[i - 1] << 1;
                if (n) {
                    a = new Ke(1 << t);
                    var c = 15 - t;
                    for (i = 0; i < r; ++i)
                        if (e[i])
                            for (var l = i << 4 | e[i], d = t - e[i], u = s[e[i] - 1]++ << d, p = u | (1 << d) - 1; u <= p; ++u) a[tt[u] >> c] = l
                } else
                    for (a = new Ke(r), i = 0; i < r; ++i) e[i] && (a[i] = tt[s[e[i] - 1]++] >> 15 - e[i]);
                return a
            },
            ot = new He(288);
        for (nt = 0; nt < 144; ++nt) ot[nt] = 8;
        for (nt = 144; nt < 256; ++nt) ot[nt] = 9;
        for (nt = 256; nt < 280; ++nt) ot[nt] = 7;
        for (nt = 280; nt < 288; ++nt) ot[nt] = 8;
        var at = new He(32);
        for (nt = 0; nt < 32; ++nt) at[nt] = 5;
        var st = it(ot, 9, 0),
            ct = it(ot, 9, 1),
            lt = it(at, 5, 0),
            dt = it(at, 5, 1),
            ut = function(e) {
                for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
                return t
            },
            pt = function(e, t, n) {
                var r = t / 8 | 0;
                return (e[r] | e[r + 1] << 8) >> (7 & t) & n
            },
            ft = function(e, t) {
                var n = t / 8 | 0;
                return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (7 & t)
            },
            vt = function(e) {
                return (e + 7) / 8 | 0
            },
            ht = function(e, t, n) {
                return (null == t || t < 0) && (t = 0), (null == n || n > e.length) && (n = e.length), new He(e.subarray(t, n))
            },
            gt = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"],
            mt = function(e, t, n) {
                var r = new Error(t || gt[e]);
                if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, mt), !n) throw r;
                return r
            },
            bt = function(e, t, n) {
                var r = t / 8 | 0;
                e[r] |= n <<= 7 & t, e[r + 1] |= n >> 8
            },
            _t = function(e, t, n) {
                var r = t / 8 | 0;
                e[r] |= n <<= 7 & t, e[r + 1] |= n >> 8, e[r + 2] |= n >> 16
            },
            yt = function(e, t) {
                for (var n = [], r = 0; r < e.length; ++r) e[r] && n.push({
                    s: r,
                    f: e[r]
                });
                var i = n.length,
                    o = n.slice();
                if (!i) return {
                    t: Ot,
                    l: 0
                };
                if (1 == i) {
                    var a = new He(n[0].s + 1);
                    return a[n[0].s] = 1, {
                        t: a,
                        l: 1
                    }
                }
                n.sort(function(e, t) {
                    return e.f - t.f
                }), n.push({
                    s: -1,
                    f: 25001
                });
                var s = n[0],
                    c = n[1],
                    l = 0,
                    d = 1,
                    u = 2;
                for (n[0] = {
                        s: -1,
                        f: s.f + c.f,
                        l: s,
                        r: c
                    }; d != i - 1;) s = n[n[l].f < n[u].f ? l++ : u++], c = n[l != d && n[l].f < n[u].f ? l++ : u++], n[d++] = {
                    s: -1,
                    f: s.f + c.f,
                    l: s,
                    r: c
                };
                var p = o[0].s;
                for (r = 1; r < i; ++r) o[r].s > p && (p = o[r].s);
                var f = new Ke(p + 1),
                    v = Et(n[d - 1], f, 0);
                if (v > t) {
                    r = 0;
                    var h = 0,
                        g = v - t,
                        m = 1 << g;
                    for (o.sort(function(e, t) {
                            return f[t.s] - f[e.s] || e.f - t.f
                        }); r < i; ++r) {
                        var b = o[r].s;
                        if (!(f[b] > t)) break;
                        h += m - (1 << v - f[b]), f[b] = t
                    }
                    for (h >>= g; h > 0;) {
                        var _ = o[r].s;
                        f[_] < t ? h -= 1 << t - f[_]++ - 1 : ++r
                    }
                    for (; r >= 0 && h; --r) {
                        var y = o[r].s;
                        f[y] == t && (--f[y], ++h)
                    }
                    v = t
                }
                return {
                    t: new He(f),
                    l: v
                }
            },
            Et = function(e, t, n) {
                return -1 == e.s ? Math.max(Et(e.l, t, n + 1), Et(e.r, t, n + 1)) : t[e.s] = n
            },
            St = function(e) {
                for (var t = e.length; t && !e[--t];);
                for (var n = new Ke(++t), r = 0, i = e[0], o = 1, a = function(e) {
                        n[r++] = e
                    }, s = 1; s <= t; ++s)
                    if (e[s] == i && s != t) ++o;
                    else {
                        if (!i && o > 2) {
                            for (; o > 138; o -= 138) a(32754);
                            o > 2 && (a(o > 10 ? o - 11 << 5 | 28690 : o - 3 << 5 | 12305), o = 0)
                        } else if (o > 3) {
                            for (a(i), --o; o > 6; o -= 6) a(8304);
                            o > 2 && (a(o - 3 << 5 | 8208), o = 0)
                        }
                        for (; o--;) a(i);
                        o = 1, i = e[s]
                    }
                return {
                    c: n.subarray(0, r),
                    n: t
                }
            },
            Tt = function(e, t) {
                for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
                return n
            },
            It = function(e, t, n) {
                var r = n.length,
                    i = vt(t + 2);
                e[i] = 255 & r, e[i + 1] = r >> 8, e[i + 2] = 255 ^ e[i], e[i + 3] = 255 ^ e[i + 1];
                for (var o = 0; o < r; ++o) e[i + o + 4] = n[o];
                return 8 * (i + 4 + r)
            },
            wt = function(e, t, n, r, i, o, a, s, c, l, d) {
                bt(t, d++, n), ++i[256];
                for (var u = yt(i, 15), p = u.t, f = u.l, v = yt(o, 15), h = v.t, g = v.l, m = St(p), b = m.c, _ = m.n, y = St(h), E = y.c, S = y.n, T = new Ke(19), I = 0; I < b.length; ++I) ++T[31 & b[I]];
                for (I = 0; I < E.length; ++I) ++T[31 & E[I]];
                for (var w = yt(T, 7), A = w.t, O = w.l, D = 19; D > 4 && !A[Ge[D - 1]]; --D);
                var k, x, N, L, C = l + 5 << 3,
                    M = Tt(i, ot) + Tt(o, at) + a,
                    R = Tt(i, p) + Tt(o, h) + a + 14 + 3 * D + Tt(T, A) + 2 * T[16] + 3 * T[17] + 7 * T[18];
                if (c >= 0 && C <= M && C <= R) return It(t, d, e.subarray(c, c + l));
                if (bt(t, d, 1 + (R < M)), d += 2, R < M) {
                    k = it(p, f, 0), x = p, N = it(h, g, 0), L = h;
                    var P = it(A, O, 0);
                    for (bt(t, d, _ - 257), bt(t, d + 5, S - 1), bt(t, d + 10, D - 4), d += 14, I = 0; I < D; ++I) bt(t, d + 3 * I, A[Ge[I]]);
                    d += 3 * D;
                    for (var U = [b, E], B = 0; B < 2; ++B) {
                        var j = U[B];
                        for (I = 0; I < j.length; ++I) bt(t, d, P[V = 31 & j[I]]), d += A[V], V > 15 && (bt(t, d, j[I] >> 5 & 127), d += j[I] >> 12)
                    }
                } else k = st, x = ot, N = lt, L = at;
                for (I = 0; I < s; ++I) {
                    var W = r[I];
                    if (W > 255) {
                        var V;
                        _t(t, d, k[257 + (V = W >> 18 & 31)]), d += x[V + 257], V > 7 && (bt(t, d, W >> 23 & 31), d += ze[V]);
                        var H = 31 & W;
                        _t(t, d, N[H]), d += L[H], H > 3 && (_t(t, d, W >> 5 & 8191), d += qe[H])
                    } else _t(t, d, k[W]), d += x[W]
                }
                return _t(t, d, k[256]), d + x[256]
            },
            At = new Fe([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]),
            Ot = new He(0);
        var Dt = "undefined" != typeof TextEncoder && new TextEncoder,
            kt = "undefined" != typeof TextDecoder && new TextDecoder;
        try {
            kt.decode(Ot, {
                stream: !0
            })
        } catch (e) {}

        function xt(e) {
            try {
                let n = e.replace(/-/g, "+").replace(/_/g, "/");
                for (; n.length % 4;) n += "=";
                const r = atob(n),
                    i = new Uint8Array(r.length);
                for (let e = 0; e < r.length; e++) i[e] = r.charCodeAt(e);
                return function(e, t) {
                    if (t) {
                        for (var n = "", r = 0; r < e.length; r += 16384) n += String.fromCharCode.apply(null, e.subarray(r, r + 16384));
                        return n
                    }
                    if (kt) return kt.decode(e);
                    var i = function(e) {
                            for (var t = "", n = 0;;) {
                                var r = e[n++],
                                    i = (r > 127) + (r > 223) + (r > 239);
                                if (n + i > e.length) return {
                                    s: t,
                                    r: ht(e, n - 1)
                                };
                                i ? 3 == i ? (r = ((15 & r) << 18 | (63 & e[n++]) << 12 | (63 & e[n++]) << 6 | 63 & e[n++]) - 65536, t += String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r)) : t += String.fromCharCode(1 & i ? (31 & r) << 6 | 63 & e[n++] : (15 & r) << 12 | (63 & e[n++]) << 6 | 63 & e[n++]) : t += String.fromCharCode(r)
                            }
                        }(e),
                        o = i.s;
                    return (n = i.r).length && mt(8), o
                }(function(e, t, n, r) {
                    var i = e.length,
                        o = r ? r.length : 0;
                    if (!i || t.f && !t.l) return n || new He(0);
                    var a = !n,
                        s = a || 2 != t.i,
                        c = t.i;
                    a && (n = new He(3 * i));
                    var l = function(e) {
                            var t = n.length;
                            if (e > t) {
                                var r = new He(Math.max(2 * t, e));
                                r.set(n), n = r
                            }
                        },
                        d = t.f || 0,
                        u = t.p || 0,
                        p = t.b || 0,
                        f = t.l,
                        v = t.d,
                        h = t.m,
                        g = t.n,
                        m = 8 * i;
                    do {
                        if (!f) {
                            d = pt(e, u, 1);
                            var b = pt(e, u + 1, 3);
                            if (u += 3, !b) {
                                var _ = e[(x = vt(u) + 4) - 4] | e[x - 3] << 8,
                                    y = x + _;
                                if (y > i) {
                                    c && mt(0);
                                    break
                                }
                                s && l(p + _), n.set(e.subarray(x, y), p), t.b = p += _, t.p = u = 8 * y, t.f = d;
                                continue
                            }
                            if (1 == b) f = ct, v = dt, h = 9, g = 5;
                            else if (2 == b) {
                                var E = pt(e, u, 31) + 257,
                                    S = pt(e, u + 10, 15) + 4,
                                    T = E + pt(e, u + 5, 31) + 1;
                                u += 14;
                                for (var I = new He(T), w = new He(19), A = 0; A < S; ++A) w[Ge[A]] = pt(e, u + 3 * A, 7);
                                u += 3 * S;
                                var O = ut(w),
                                    D = (1 << O) - 1,
                                    k = it(w, O, 1);
                                for (A = 0; A < T;) {
                                    var x, N = k[pt(e, u, D)];
                                    if (u += 15 & N, (x = N >> 4) < 16) I[A++] = x;
                                    else {
                                        var L = 0,
                                            C = 0;
                                        for (16 == x ? (C = 3 + pt(e, u, 3), u += 2, L = I[A - 1]) : 17 == x ? (C = 3 + pt(e, u, 7), u += 3) : 18 == x && (C = 11 + pt(e, u, 127), u += 7); C--;) I[A++] = L
                                    }
                                }
                                var M = I.subarray(0, E),
                                    R = I.subarray(E);
                                h = ut(M), g = ut(R), f = it(M, h, 1), v = it(R, g, 1)
                            } else mt(1);
                            if (u > m) {
                                c && mt(0);
                                break
                            }
                        }
                        s && l(p + 131072);
                        for (var P = (1 << h) - 1, U = (1 << g) - 1, B = u;; B = u) {
                            var j = (L = f[ft(e, u) & P]) >> 4;
                            if ((u += 15 & L) > m) {
                                c && mt(0);
                                break
                            }
                            if (L || mt(2), j < 256) n[p++] = j;
                            else {
                                if (256 == j) {
                                    B = u, f = null;
                                    break
                                }
                                var W = j - 254;
                                j > 264 && (W = pt(e, u, (1 << (K = ze[A = j - 257])) - 1) + Je[A], u += K);
                                var V = v[ft(e, u) & U],
                                    H = V >> 4;
                                if (V || mt(3), u += 15 & V, R = Ze[H], H > 3) {
                                    var K = qe[H];
                                    R += ft(e, u) & (1 << K) - 1, u += K
                                }
                                if (u > m) {
                                    c && mt(0);
                                    break
                                }
                                s && l(p + 131072);
                                var F = p + W;
                                if (p < R) {
                                    var z = o - R,
                                        q = Math.min(R, F);
                                    for (z + p < 0 && mt(3); p < q; ++p) n[p] = r[z + p]
                                }
                                for (; p < F; ++p) n[p] = n[p - R]
                            }
                        }
                        t.l = f, t.p = B, t.b = p, t.f = d, f && (d = 1, t.m = h, t.d = v, t.n = g)
                    } while (!d);
                    return p != n.length && a ? ht(n, 0, p) : n.subarray(0, p)
                }(i, {
                    i: 2
                }, t && t.out, t && t.dictionary))
            } catch (e) {
                return null
            }
            var t
        }

        function Nt(e) {
            if ("undefined" == typeof document) return null;
            const t = e + "=",
                n = document.cookie.split(";");
            for (let e = 0; e < n.length; e++) {
                const r = n[e].trim();
                if (0 === r.indexOf(t)) {
                    const e = r.substring(t.length);
                    try {
                        return decodeURIComponent(e)
                    } catch (t) {
                        return e
                    }
                }
            }
            return null
        }
        "function" == typeof queueMicrotask && queueMicrotask;
        const {
            SUBSCRIPTION_DETAILS_KEYS: Lt,
            USER_DATA_KEYS: Ct,
            ATTRIBUTE_KEYS: Mt,
            IDENTITY_MAP_KEYS: Rt,
            SESSION_KEYS: Pt,
            SOURCE_KEYS: Ut,
            DEVICE_DATA_KEYS: Bt
        } = y;

        function jt(e) {
            if (!e) return e;
            const {
                domain: t,
                token: n,
                endpoint: r,
                keys: i,
                p256dh: o,
                auth: a
            } = Lt, s = {};
            return e[t] && (s.domain = e[t]), e[n] && (s.token = e[n]), e[r] && (s.endpoint = "string" == typeof e[r] && e[r].startsWith("h://") ? e[r].replace("h://", "https://") : e[r]), e[i] && (s.keys = {}, e[i][o] && (s.keys.p256dh = e[i][o]), e[i][a] && (s.keys.auth = e[i][a])), s
        }

        function Wt(e) {
            if (!e) return e;
            const {
                attributes: t,
                subscribedToOldSdk: n,
                deviceUuid: r,
                deviceAdded: i
            } = Ct, {
                key: o,
                value: s,
                updated_at: c,
                level: l
            } = Mt, d = {};
            return e[t] && (d.attributes = e[t].map(e => {
                const t = {};
                return e[o] && (t.key = function(e) {
                    const t = a.find(t => t.moeName === e);
                    return t ? t.attributeName : e
                }(e[o])), void 0 !== e[s] && (t.value = e[s]), void 0 !== e[c] && (t.updated_at = e[c]), void 0 !== e[l] && (t.level = e[l]), t
            })), void 0 !== e[n] && (d.subscribedToOldSdk = e[n]), e[r] && (d.deviceUuid = e[r]), void 0 !== e[i] && (d.deviceAdded = e[i]), d
        }

        function Vt(e) {
            if (!e) return e;
            const {
                userIdentities: t,
                previousIdentities: n,
                previousIdentitiesUpdatedTime: r
            } = Rt, i = {};
            return e[t] && (i.userIdentities = e[t]), e[n] && (i.previousIdentities = e[n]), void 0 !== e[r] && (i.previousIdentitiesUpdatedTime = e[r]), i
        }

        function Ht(e) {
            if (!e) return e;
            const {
                sessionKey: t,
                sessionStartTime: n,
                sessionMaxTime: r,
                customIdentifiersToTrack: i,
                sessionExpiryTime: o,
                numberOfSessions: a,
                currentSource: s,
                moeReferrer: c
            } = Pt, l = {};
            return e[t] && (l.sessionKey = e[t]), e[n] && (l.sessionStartTime = e[n]), void 0 !== e[r] && (l.sessionMaxTime = e[r]), e[i] && (l.customIdentifiersToTrack = e[i]), void 0 !== e[o] && (l.sessionExpiryTime = e[o]), void 0 !== e[a] && (l.numberOfSessions = e[a]), e[s] && (l.currentSource = function(e) {
                if (!e) return e;
                const {
                    source: t,
                    medium: n,
                    source_url: r,
                    term: i,
                    campaign_name: o,
                    campaign_id: a,
                    content: s,
                    extra: c
                } = Ut, l = {};
                return e[t] && (l.source = e[t]), e[n] && (l.medium = e[n]), e[r] && (l.source_url = e[r]), e[i] && (l.term = e[i]), e[o] && (l.campaign_name = e[o]), e[a] && (l.campaign_id = e[a]), e[s] && (l.content = e[s]), e[c] && (l.extra = e[c]), l
            }(e[s])), e[c] && (l.moeReferrer = e[c]), l
        }
        class Kt {
            static getCompressedKeyName(e) {
                return y.COOKIE_NAME_MAPPING[e] || e
            }
            static getOriginalName(e) {
                return Kt.REVERSE_COOKIE_NAME_MAPPING[e] || e
            }
            static getCookieVersion(e, t) {
                if ([y.COOKIE_NAME_MAPPING[B], y.COOKIE_NAME_MAPPING[R.HARD_ASK_STATUS], y.COOKIE_NAME_MAPPING[R.SOFT_ASK_STATUS], O, y.COOKIE_NAME_MAPPING[R.OPT_IN_SHOWN_TIME], y.COOKIE_NAME_MAPPING[R.SDK_DISABLED], y.COOKIE_NAME_MAPPING[R.DATA_TRACKING_DISABLED]].includes(e)) return 3;
                if (Object.keys(y.COOKIE_NAME_MAPPING).includes(e)) return 1;
                if (Object.values(y.COOKIE_NAME_MAPPING).includes(e)) try {
                    let n;
                    try {
                        if (n = JSON.parse(t), Kt.hasV3Structure(n, e)) return 3;
                        if ("string" == typeof n) {
                            const e = xt(n);
                            if (null !== e) try {
                                return JSON.parse(e), 3
                            } catch (e) {}
                        }
                        return 2
                    } catch (e) {
                        const r = xt(t);
                        if (null !== r) try {
                            return n = JSON.parse(r), 3
                        } catch (e) {
                            return 2
                        }
                        return 2
                    }
                } catch (e) {
                    return 2
                }
                return 1
            }
            static hasV3Structure(e, t) {
                if (!e || "object" != typeof e) return !1;
                switch (Kt.getOriginalName(t)) {
                    case R.SUBSCRIPTION_DETAILS:
                        return e.e && "string" == typeof e.e && e.e.length <= 2;
                    case R.USER_DATA:
                        return e.d_uid || e.a && !Array.isArray(e.a) || !e.hasOwnProperty("a");
                    case R.IDENTITY_MAP:
                        return !e.hasOwnProperty("p_i") || !e.hasOwnProperty("p_i_u_t");
                    case R.SESSION:
                        return e.s_s_t && "number" == typeof e.s_s_t;
                    default:
                        return !1
                }
            }
            static getAllCookieNames(e) {
                const t = [e],
                    n = y.COOKIE_NAME_MAPPING[e];
                return n && n !== e && t.push(n), t
            }
            static compressValue(e, t) {
                if (null == e) return e;
                if ("object" != typeof e || Array.isArray(e)) return "boolean" == typeof e && [R.SDK_DISABLED, B, R.DATA_TRACKING_DISABLED].includes(t) ? e ? 1 : 0 : "string" == typeof e && Object.keys(y.PERMISSION_STATE_MAPPING).includes(e) ? y.PERMISSION_STATE_MAPPING[e] : e;
                const n = Kt.compressObjectV3(e, t);
                if (null === n) return null;
                const r = JSON.stringify(n),
                    i = function(e) {
                        try {
                            const n = (t = function(e) {
                                var t;
                                if (Dt) return Dt.encode(e);
                                var n = e.length,
                                    r = new He(e.length + (e.length >> 1)),
                                    i = 0,
                                    o = function(e) {
                                        r[i++] = e
                                    };
                                for (t = 0; t < n; ++t) {
                                    if (i + 5 > r.length) {
                                        var a = new He(i + 8 + (n - t << 1));
                                        a.set(r), r = a
                                    }
                                    var s = e.charCodeAt(t);
                                    s < 128 ? o(s) : s < 2048 ? (o(192 | s >> 6), o(128 | 63 & s)) : s > 55295 && s < 57344 ? (o(240 | (s = 65536 + (1047552 & s) | 1023 & e.charCodeAt(++t)) >> 18), o(128 | s >> 12 & 63), o(128 | s >> 6 & 63), o(128 | 63 & s)) : (o(224 | s >> 12), o(128 | s >> 6 & 63), o(128 | 63 & s))
                                }
                                return ht(r, 0, i)
                            }(e), function(e, t, n, r, i) {
                                if (!i && (i = {
                                        l: 1
                                    }, t.dictionary)) {
                                    var o = t.dictionary.subarray(-32768),
                                        a = new He(o.length + e.length);
                                    a.set(o), a.set(e, o.length), e = a, i.w = o.length
                                }
                                return function(e, t, n, r, i, o) {
                                    var a = o.z || e.length,
                                        s = new He(r + a + 5 * (1 + Math.ceil(a / 7e3)) + i),
                                        c = s.subarray(r, s.length - i),
                                        l = o.l,
                                        d = 7 & (o.r || 0);
                                    if (t) {
                                        d && (c[0] = o.r >> 3);
                                        for (var u = At[t - 1], p = u >> 13, f = 8191 & u, v = (1 << n) - 1, h = o.p || new Ke(32768), g = o.h || new Ke(v + 1), m = Math.ceil(n / 3), b = 2 * m, _ = function(t) {
                                                return (e[t] ^ e[t + 1] << m ^ e[t + 2] << b) & v
                                            }, y = new Fe(25e3), E = new Ke(288), S = new Ke(32), T = 0, I = 0, w = o.i || 0, A = 0, O = o.w || 0, D = 0; w + 2 < a; ++w) {
                                            var k = _(w),
                                                x = 32767 & w,
                                                N = g[k];
                                            if (h[x] = N, g[k] = x, O <= w) {
                                                var L = a - w;
                                                if ((T > 7e3 || A > 24576) && (L > 423 || !l)) {
                                                    d = wt(e, c, 0, y, E, S, I, A, D, w - D, d), A = T = I = 0, D = w;
                                                    for (var C = 0; C < 286; ++C) E[C] = 0;
                                                    for (C = 0; C < 30; ++C) S[C] = 0
                                                }
                                                var M = 2,
                                                    R = 0,
                                                    P = f,
                                                    U = x - N & 32767;
                                                if (L > 2 && k == _(w - U))
                                                    for (var B = Math.min(p, L) - 1, j = Math.min(32767, w), W = Math.min(258, L); U <= j && --P && x != N;) {
                                                        if (e[w + M] == e[w + M - U]) {
                                                            for (var V = 0; V < W && e[w + V] == e[w + V - U]; ++V);
                                                            if (V > M) {
                                                                if (M = V, R = U, V > B) break;
                                                                var H = Math.min(U, V - 2),
                                                                    K = 0;
                                                                for (C = 0; C < H; ++C) {
                                                                    var F = w - U + C & 32767,
                                                                        z = F - h[F] & 32767;
                                                                    z > K && (K = z, N = F)
                                                                }
                                                            }
                                                        }
                                                        U += (x = N) - (N = h[x]) & 32767
                                                    }
                                                if (R) {
                                                    y[A++] = 268435456 | Xe[M] << 18 | et[R];
                                                    var q = 31 & Xe[M],
                                                        G = 31 & et[R];
                                                    I += ze[q] + qe[G], ++E[257 + q], ++S[G], O = w + M, ++T
                                                } else y[A++] = e[w], ++E[e[w]]
                                            }
                                        }
                                        for (w = Math.max(w, O); w < a; ++w) y[A++] = e[w], ++E[e[w]];
                                        d = wt(e, c, l, y, E, S, I, A, D, w - D, d), l || (o.r = 7 & d | c[d / 8 | 0] << 3, d -= 7, o.h = g, o.p = h, o.i = w, o.w = O)
                                    } else {
                                        for (w = o.w || 0; w < a + l; w += 65535) {
                                            var $ = w + 65535;
                                            $ >= a && (c[d / 8 | 0] = l, $ = a), d = It(c, d + 1, e.subarray(w, $))
                                        }
                                        o.i = a
                                    }
                                    return ht(s, 0, r + vt(d) + i)
                                }(e, null == t.level ? 6 : t.level, null == t.mem ? i.l ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(e.length)))) : 20 : 12 + t.mem, n, r, i)
                            }(t, {}, 0, 0));
                            let r = "";
                            for (let e = 0; e < n.length; e++) r += String.fromCharCode(n[e]);
                            return btoa(r).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
                        } catch (e) {
                            return null
                        }
                        var t
                    }(r);
                if (null !== i) {
                    const e = encodeURIComponent(r).length;
                    if (i.length < e && xt(i) === r) return i
                }
                return n
            }
            static decompressValue(e, t, n) {
                if (null == e) return e;
                if (void 0 === n) {
                    const r = Kt.getCompressedKeyName(t);
                    n = "string" == typeof e ? Kt.getCookieVersion(r, e) : 2
                }
                if ((3 === n || void 0 === n) && "string" == typeof e) {
                    const r = xt(e);
                    if (null !== r) try {
                        const e = JSON.parse(r);
                        return Kt.decompressObjectV3(e, t)
                    } catch (e) {
                        n = 2
                    }
                }
                if (1 === n && Kt.isLegacyValue(e)) return "string" === e.MOE_DATA_TYPE ? e.actualValue ? String(e.actualValue) : null : e.actualValue;
                if ("number" == typeof e && (0 === e || 1 === e) && [R.SDK_DISABLED, B, R.DATA_TRACKING_DISABLED].includes(t)) return 1 === e;
                if ("number" == typeof e && e >= 0 && e <= 6 && (t === R.SOFT_ASK_STATUS || t === R.HARD_ASK_STATUS)) return Object.keys(y.PERMISSION_STATE_MAPPING).find(t => y.PERMISSION_STATE_MAPPING[t] === e);
                if ("object" == typeof e && !Array.isArray(e)) {
                    if (void 0 === n || 2 === n) {
                        const n = Kt.getCompressedKeyName(t);
                        if (Kt.hasV3Structure(e, n)) return Kt.decompressObjectV3(e, t)
                    }
                    return 3 === n ? Kt.decompressObjectV3(e, t) : Kt.decompressObject(e, t)
                }
                return e
            }
            static compressObjectV3(e, t) {
                if (!e) return e;
                switch (t) {
                    case R.SUBSCRIPTION_DETAILS:
                        return Kt.compressSubscriptionDetailsV3(e);
                    case R.USER_DATA:
                        return Kt.compressUserDataV3(e);
                    case R.IDENTITY_MAP:
                        return Kt.compressIdentityMapV3(e);
                    case R.SESSION:
                        return Kt.compressSessionV3(e);
                    case R.DEVICE_DATA:
                        return null;
                    default:
                        return e
                }
            }
            static compressSubscriptionDetailsV3(e) {
                const t = function(e) {
                    if (!e) return e;
                    const {
                        domain: t,
                        token: n,
                        endpoint: r,
                        keys: i,
                        p256dh: o,
                        auth: a
                    } = Lt, s = {};
                    return e.domain && (s[t] = e.domain), e.token && (s[n] = e.token), e.endpoint && (s[r] = e.endpoint), e.keys && (s[i] = {}, e.keys.p256dh && (s[i][o] = e.keys.p256dh), e.keys.auth && (s[i][a] = e.keys.auth)), s
                }(e);
                if (t.e && "string" == typeof t.e) {
                    const e = y.ENDPOINT_URL_MAPPING[t.e];
                    e && (t.e = e)
                }
                return t
            }
            static compressUserDataV3(e) {
                const t = function(e) {
                    if (!e) return e;
                    const {
                        attributes: t,
                        subscribedToOldSdk: n,
                        deviceUuid: r,
                        deviceAdded: i
                    } = Ct, {
                        key: o,
                        value: s,
                        updated_at: c,
                        level: l
                    } = Mt, d = {};
                    return e.attributes && (d[t] = e.attributes.map(e => {
                        const t = {};
                        return e.key && (t[o] = function(e) {
                            const t = a.find(t => t.attributeName === e);
                            return t ? t.moeName : e
                        }(e.key)), void 0 !== e.value && (t[s] = e.value), void 0 !== e.updated_at && (t[c] = e.updated_at), void 0 !== e.level && (t[l] = e.level), t
                    })), void 0 !== e.subscribedToOldSdk && (d[n] = e.subscribedToOldSdk), e.deviceUuid && (d[r] = e.deviceUuid), void 0 !== e.deviceAdded && (d[i] = e.deviceAdded), d
                }(e);
                if (!t.d_uid) {
                    const e = Kt.getDeviceDataForMigration();
                    e && e.deviceUniqueId && (t.d_uid = e.deviceUniqueId)
                }
                if (t.d_id && delete t.d_id, t.a && Array.isArray(t.a) && 0 === t.a.length && delete t.a, t.a && Array.isArray(t.a) && t.a.length > 0) {
                    const e = {};
                    t.a.forEach(t => {
                        t.k && void 0 !== t.v && (e[t.l ? `${t.k}_p_attr` : t.k] = {
                            v: t.v,
                            u_at: t.u_at,
                            l: t.l || void 0
                        })
                    }), t.a = e
                }
                return t
            }
            static compressIdentityMapV3(e) {
                const t = function(e) {
                    if (!e) return e;
                    const {
                        userIdentities: t,
                        previousIdentities: n,
                        previousIdentitiesUpdatedTime: r
                    } = Rt, i = {};
                    return e.userIdentities && (i[t] = e.userIdentities), e.previousIdentities && (i[n] = e.previousIdentities), void 0 !== e.previousIdentitiesUpdatedTime && (i[r] = e.previousIdentitiesUpdatedTime), i
                }(e);
                return t.p_i && 0 !== Object.keys(t.p_i).length || 0 !== t.p_i_u_t || (delete t.p_i, delete t.p_i_u_t), t
            }
            static compressSessionV3(e) {
                const t = function(e) {
                    if (!e) return e;
                    const {
                        sessionKey: t,
                        sessionStartTime: n,
                        sessionMaxTime: r,
                        customIdentifiersToTrack: i,
                        sessionExpiryTime: o,
                        numberOfSessions: a,
                        currentSource: s,
                        moeReferrer: c
                    } = Pt, l = {};
                    return e.sessionKey && (l[t] = e.sessionKey), e.sessionStartTime && (l[n] = e.sessionStartTime), void 0 !== e.sessionMaxTime && (l[r] = e.sessionMaxTime), e.customIdentifiersToTrack && (l[i] = e.customIdentifiersToTrack), void 0 !== e.sessionExpiryTime && (l[o] = e.sessionExpiryTime), void 0 !== e.numberOfSessions && (l[a] = e.numberOfSessions), e.currentSource && (l[s] = function(e) {
                        if (!e) return e;
                        const {
                            source: t,
                            medium: n,
                            source_url: r,
                            term: i,
                            campaign_name: o,
                            campaign_id: a,
                            content: s,
                            extra: c
                        } = Ut, l = {};
                        return e.source && (l[t] = e.source), e.medium && (l[n] = e.medium), e.source_url && (l[r] = e.source_url), e.term && (l[i] = e.term), e.campaign_name && (l[o] = e.campaign_name), e.campaign_id && (l[a] = e.campaign_id), e.content && (l[s] = e.content), e.extra && (l[c] = e.extra), l
                    }(e.currentSource)), e.moeReferrer && (l[c] = e.moeReferrer), l
                }(e);
                if (t.s_s_t && "string" == typeof t.s_s_t) {
                    const e = new Date(t.s_s_t).getTime();
                    t.s_s_t = e
                }
                return t
            }
            static decompressObject(e, t) {
                if (!e) return e;
                switch (t) {
                    case R.SUBSCRIPTION_DETAILS:
                        return jt(e);
                    case R.USER_DATA:
                        return Wt(e);
                    case R.IDENTITY_MAP:
                        return Vt(e);
                    case R.SESSION:
                        return Ht(e);
                    case R.DEVICE_DATA:
                        return function(e) {
                            if (!e) return e;
                            const {
                                deviceUniqueId: t
                            } = Bt, n = {};
                            return e[t] && (n.deviceUniqueId = e[t]), n
                        }(e);
                    default:
                        return e
                }
            }
            static decompressObjectV3(e, t) {
                if (!e) return e;
                switch (t) {
                    case R.SUBSCRIPTION_DETAILS:
                        return Kt.decompressSubscriptionDetailsV3(e);
                    case R.USER_DATA:
                        return Kt.decompressUserDataV3(e);
                    case R.IDENTITY_MAP:
                        return Kt.decompressIdentityMapV3(e);
                    case R.SESSION:
                        return Kt.decompressSessionV3(e);
                    case R.DEVICE_DATA:
                        return Kt.getDeviceDataFromUserData();
                    default:
                        return e
                }
            }
            static decompressSubscriptionDetailsV3(e) {
                const t = Object.assign({}, e);
                if (t.e && "string" == typeof t.e) {
                    const e = Kt.REVERSE_ENDPOINT_URL_MAPPING[t.e];
                    e && (t.e = e)
                }
                return jt(t)
            }
            static decompressUserDataV3(e, t) {
                const n = Object.assign({}, e),
                    r = !n.hasOwnProperty("a");
                if (n.a && "object" == typeof n.a && !Array.isArray(n.a)) {
                    const e = Object.entries(n.a).map(([e, t]) => {
                        const n = void 0 !== t.l,
                            r = e.endsWith("_p_attr");
                        return {
                            k: n && r ? e.slice(0, -7) : e,
                            v: t.v,
                            u_at: t.u_at || (new Date).getTime(),
                            l: t.l || void 0
                        }
                    });
                    n.a = e
                }
                r && (n.a = []);
                const i = Wt(n);
                if (!i.deviceUuid) {
                    const e = Nt("moe_uuid");
                    e && (i.deviceUuid = e)
                }
                return i
            }
            static decompressIdentityMapV3(e) {
                const t = Object.assign({}, e);
                return t.hasOwnProperty("p_i") || (t.p_i = {}), t.hasOwnProperty("p_i_u_t") || (t.p_i_u_t = 0), Vt(t)
            }
            static decompressSessionV3(e) {
                const t = Object.assign({}, e);
                return t.s_s_t && "number" == typeof t.s_s_t && (t.s_s_t = new Date(t.s_s_t).toISOString()), Ht(t)
            }
            static getDeviceDataForMigration() {
                if ("undefined" == typeof localStorage) return null;
                try {
                    const e = localStorage.getItem("MOE_DATA");
                    if (e) {
                        const t = JSON.parse(e);
                        if (t && t.DEVICE_DATA && t.DEVICE_DATA.deviceUniqueId) return t.DEVICE_DATA
                    }
                } catch (e) {
                    fn.log(2, "CookieCompression", "MOE_DATA parse failed; returning null.", e)
                }
                return null
            }
            static getDeviceDataFromUserData() {
                const e = Kt.getAllCookieNames(R.USER_DATA);
                for (const t of e) {
                    const e = Nt(t);
                    if (null !== e) try {
                        let t = JSON.parse(e);
                        if ("string" == typeof t) {
                            const e = xt(t);
                            null !== e && (t = JSON.parse(e))
                        }
                        if (t.d_uid) return {
                            deviceUniqueId: t.d_uid
                        };
                        const n = Kt.decompressUserDataV3(t);
                        if (n.deviceUuid) return {
                            deviceUniqueId: n.deviceUuid
                        }
                    } catch (e) {
                        continue
                    }
                }
                return null
            }
            static isCompressedCookie(e) {
                return e.startsWith("moe_") && Object.values(y.COOKIE_NAME_MAPPING).includes(e)
            }
            static isLegacyValue(e) {
                return "object" == typeof e && null !== e && e.hasOwnProperty("MOE_DATA_TYPE") && e.hasOwnProperty("actualValue")
            }
        }
        Kt.REVERSE_ENDPOINT_URL_MAPPING = Object.fromEntries(Object.entries(y.ENDPOINT_URL_MAPPING).map(([e, t]) => [t, e])), Kt.REVERSE_COOKIE_NAME_MAPPING = Object.fromEntries(Object.entries(y.COOKIE_NAME_MAPPING).map(([e, t]) => [t, e]));
        const Ft = Kt;
        class zt {
            static set(e, t) {
                var n;
                if (!(null === (n = je.get()) || void 0 === n ? void 0 : n.disableCookies))
                    if (null == t) zt.remove(e);
                    else {
                        if (e === R.PUSH_TOKEN) return;
                        if (e === R.DEVICE_DATA) return;
                        const n = Ft.compressValue(t, e),
                            r = Ft.getCompressedKeyName(e);
                        let i;
                        zt.cleanupOldVersions(e, r), i = "string" == typeof n ? n : "object" == typeof n && null !== n ? JSON.stringify(n) : String(n);
                        const o = Date.now(),
                            a = ";expires=" + new Date(o + 63072e6).toUTCString();
                        document.cookie = r + "=" + encodeURIComponent(i) + a + ";domain=" + zt.getOrigin() + zt.getCookieFlags()
                    }
            }
            static get(e) {
                var t;
                if (null === (t = je.get()) || void 0 === t ? void 0 : t.disableCookies) return;
                const n = Ft.getAllCookieNames(e);
                let r = null,
                    i = null,
                    o = 1;
                for (const e of n)
                    if (r = zt.getCookieValue(e), null !== r) {
                        i = e, o = Ft.getCookieVersion(e, r);
                        break
                    }
                if (null === r) return null;
                const a = zt.processParseValue(r, e, o > 1, o);
                return i && o < 3 && zt.migrateToV3(e, a, i), a
            }
            static migrateToV3(e, t, n) {
                const r = zt.baseTag + ".migrateToV3";
                try {
                    zt.set(e, t), zt.removeSpecificCookie(n)
                } catch (e) {
                    fn.error(1, r, `Failed to migrate cookie ${n} to V3: ${e}`)
                }
            }
            static cleanupOldVersions(e, t) {
                Ft.getAllCookieNames(e).forEach(e => {
                    const t = zt.getCookieValue(e);
                    null !== t && Ft.getCookieVersion(e, t) < 3 && zt.removeSpecificCookie(e)
                })
            }
            static removeSpecificCookie(e) {
                document.cookie = e + "=;domain=" + zt.getOrigin() + ";expires=Thu, 01 Jan 1970 00:00:01 GMT" + zt.getCookieFlags()
            }
            static getCookieValue(e) {
                const t = e + "=",
                    n = zt.getDecodedCookies();
                for (let e = n.length - 1; e >= 0; e--) {
                    let r = n[e];
                    for (;
                        " " === r.charAt(0);) r = r.substring(1);
                    if (0 === r.indexOf(t)) return r.substring(t.length, r.length)
                }
                return null
            }
            static processParseValue(e, t, n, r) {
                const i = "MOE_DATA_TYPE",
                    o = "actualValue";
                try {
                    let a;
                    try {
                        a = JSON.parse(e)
                    } catch (t) {
                        a = e
                    }
                    Ft.isLegacyValue(a) ? "string" === Ie(a, i, null) ? e = (e = Ie(a, o, null)) ? String(e) : null : "boolean" === Ie(a, i, null) && (e = Ie(a, o, null)) : e = n ? Ft.decompressValue(a, t, r) : a
                } catch (e) {
                    fn.log(2, "CookieStorage.processParseValue", "Value kept as-is after parse/decompress failure.", e)
                }
                return e
            }
            static remove(e) {
                var t;
                (null === (t = je.get()) || void 0 === t ? void 0 : t.disableCookies) || Ft.getAllCookieNames(e).forEach(e => {
                    zt.removeSpecificCookie(e)
                })
            }
            static setRaw(e, t, n) {
                var r;
                if (!(null === (r = je.get()) || void 0 === r ? void 0 : r.disableCookies))
                    if (null == t) zt.remove(e);
                    else {
                        let r = "";
                        null != n && (r = ";expires=" + n.toISOString()), document.cookie = e + "=" + encodeURIComponent(t) + r + ";domain=" + zt.getOrigin() + zt.getCookieFlags()
                    }
            }
            static getOrigin() {
                var e;
                if (null === (e = je.get()) || void 0 === e ? void 0 : e.disableCookies) return "";
                const t = zt.baseTag + ".getOrigin",
                    n = window.location.hostname;
                return "localhost" === n || "127.0.0.1" === n ? (zt.localhostWarningShown || (zt.localhostWarningShown = !0, fn.warn(1, t, "Cross domain user persistence will not work with localhost. \n\nWe will save the key-value pairs in the localhost cookie store for reference. You'll be able to test this functionality in a hosted staging/test environment.")), "") : "." + (e => {
                    const t = (e => (e || "").toLowerCase().replace(s, ""))(e),
                        n = t.split(".");
                    return n.length <= 2 ? t : n.slice(2 === n[n.length - 1].length && n[n.length - 2].length >= 2 && n[n.length - 2].length <= 3 ? -3 : -2).join(".")
                })(n)
            }
            static getCookieFlags() {
                return "https:" === window.location.protocol || "chrome-extension:" === window.location.protocol ? ";path=/;SameSite=None;Secure" : ";path=/;"
            }
            static getDecodedCookies() {
                const e = zt.baseTag + ".getDecodedCookies";
                return document.cookie.split(";").map(t => {
                    let n = t.trim();
                    "%" === n.slice(-1) && (n += "25");
                    try {
                        return decodeURIComponent(n)
                    } catch (t) {
                        return fn.error(1, e, `Error decoding cookie: ${n} ${t}`), n
                    }
                })
            }
        }
        zt.baseTag = "CookieStorage", zt.localhostWarningShown = !1;
        const qt = zt;
        var Gt = n(790),
            $t = n.n(Gt),
            Yt = n(634);
        let Jt = null,
            Xt = null;
        new Set(["moe_database", "moe_webp", "moe_cards", "moe_onsite", "moe_tracking"]), new Set(["moe_data", "moe_backup", "experiences", "ai_experiences", "meta", "inSession", "split_experiences", "tabbed_experiences", "self_handle_experiences", "campaigns", "service_meta", "campaigns_meta", "pending_secondary_events", "pending_timer_campaigns", "triggering_primary_events", "campaigns_tags", "campaigns_stats", "exit_intent_campaigns", "offline_data", "report_params", "moe_campaigns", "events", "batched_events"]);
        const Qt = "MOE_DATA";
        class Zt {
            static setPrefix(e) {
                Zt.prefix = e + "_"
            }
            static set(e, t) {
                if (e = Zt.prefix + e, localStorage) {
                    const n = Zt.getMoeData();
                    n[e] = t, localStorage.setItem(Qt, JSON.stringify(n)), Zt.broadcastStorageUpdate()
                }
                const n = Zt.KEYS_SHARED_WITH_COOKIE.indexOf(e);
                if (Zt.isSharedWithCookie && n >= 0) {
                    const r = "object" != typeof t || Array.isArray(t) ? t : Object.assign({}, t);
                    if (0 === n && Array.isArray(r.attributes)) {
                        const e = Zt.get(R.WEB_SETTINGS),
                            t = Zt.sharedAttributeCheck(e);
                        r.attributes = r.attributes.filter(e => t(e.key))
                    }
                    e === R.SUBSCRIPTION_DETAILS && (r.domain = t.domain, r.token = t.token, r.endpoint = t.endpoint, r.keys = t.keys), qt.set(e, r)
                }
            }
            static get(e) {
                return e = Zt.prefix + e, localStorage ? Ie(Zt.getMoeData(), e, null) : null
            }
            static remove(e) {
                const t = Zt.prefix + e;
                if (localStorage && null != Zt.get(e)) {
                    const e = Zt.getMoeData();
                    delete e[t], localStorage.setItem(Qt, JSON.stringify(e)), Zt.broadcastStorageUpdate()
                }
                Zt.isSharedWithCookie && Zt.KEYS_SHARED_WITH_COOKIE.indexOf(e) >= 0 && qt.remove(e)
            }
            static logout() {
                const e = ["INIT_DATA", "Q", "WEB_SETTINGS", "SUBSCRIPTION_DETAILS", "PUSH_TOKEN", "GRACEFUL_DATA", "DEVICE_DATA", "SDK_VERSION", "SDK_DISABLED", "DATA_TRACKING_DISABLED", "TELEMETRY"];
                for (const t in R) {
                    if ([R.HARD_ASK_STATUS, R.SOFT_ASK_STATUS].includes(t)) {
                        const e = Zt.get(R.SUBSCRIPTION_DETAILS);
                        if (e && e.domain !== window.location.origin) continue
                    }
                    e.indexOf(t) < 0 && Zt.remove(R[t])
                }
                for (const e in R.Q) Ve.purge(e)
            }
            static getString(e) {
                if (e = Zt.prefix + e, localStorage) {
                    const t = Zt.get(e);
                    return "string" == typeof t || t instanceof String ? t : JSON.stringify(t)
                }
            }
            static removePrefix() {
                Zt.prefix = ""
            }
            static copyKeysFromCookie() {
                var e;
                if (null === (e = je.get()) || void 0 === e ? void 0 : e.disableCookies) return;
                let t = null;
                for (let e = 0; e < Zt.KEYS_SHARED_WITH_COOKIE.length; e++) {
                    const n = Zt.KEYS_SHARED_WITH_COOKIE[e],
                        r = qt.get(n);
                    if (null != r) {
                        const e = "object" != typeof r || Array.isArray(r) ? r : Object.assign({}, r);
                        n === R.USER_DATA ? (e.attributes = Re(Zt.get(n), e, Zt.sharedAttributeCheck()).attributes, e.d_uid && (t = {
                            deviceUniqueId: e.d_uid
                        }, delete e.d_uid)) : n === R.DEVICE_DATA && (t = e), Zt.set(n, e)
                    }
                }
                t && Zt.set(R.DEVICE_DATA, t), qt.get(R.PUSH_TOKEN) && qt.remove(R.PUSH_TOKEN), Zt.removeStaleKeysFromLS(), Zt.copyKeysFromCookieToIDB()
            }
            static sharedAttributeCheck(e = Zt.get(R.WEB_SETTINGS)) {
                var t, n;
                const r = (null === (t = null == e ? void 0 : e.configs) || void 0 === t ? void 0 : t.identityAttributes) || [],
                    i = (null === (n = null == e ? void 0 : e.configs) || void 0 === n ? void 0 : n.subscriberBasedBillingAttributes) || [];
                return t => {
                    var n, s;
                    return (null == e ? void 0 : e.isPushSubBilling) && !("USER_ATTRIBUTE_USER_EMAIL" !== (s = t) && "USER_ATTRIBUTE_USER_MOBILE" !== s && !i.includes(s)) || o.includes(t) || r.includes((null === (n = a.find(e => e.attributeName === t)) || void 0 === n ? void 0 : n.moeName) || t) || function() {
                        var e;
                        const t = null === (e = je.get()) || void 0 === e ? void 0 : e.swPath;
                        return !(!t || !t.includes("tools/moengage"))
                    }() && "cart_token" === t
                }
            }
            static copyKeysFromCookieToIDB() {
                var e;
                const t = `${this.baseLogTag}.copyKeysFromCookieToIDB`,
                    n = qt.get(R.IDENTITY_MAP),
                    r = qt.get(R.USER_DATA),
                    i = {};
                if (null == n ? void 0 : n.userIdentities) {
                    const {
                        userIdentities: e,
                        previousIdentities: t,
                        previousIdentitiesUpdatedTime: r
                    } = n;
                    i.userIdentities = e, i.previousIdentities = t, i.previousIdentitiesUpdatedTime = r
                }
                const o = Me(r);
                null != o && (i.moe_user_id = o), (null === (e = this.moeDataStore) || void 0 === e ? void 0 : e.getItem) || (this.moeDataStore = $t().createInstance({
                    driver: [$t().INDEXEDDB],
                    name: "moe_database",
                    storeName: "moe_data"
                }), this.moeDataStore && (this.moeDataStore.setItem("identifiers", i), fn.log(2, t, "Copied identities from cookie to IndexedDB")))
            }
            static removeStaleKeysFromLS() {
                const e = Zt.baseLogTag + ".removeStaleKeysFromLS";
                if (qt.get(B)) try {
                    Object.keys(Zt.getMoeData()).forEach(e => {
                        const t = qt.get(e);
                        !this.KEYS_SHARED_WITH_COOKIE.includes(e) || j.includes(e) || t || !1 === t || Zt.remove(e)
                    })
                } catch (t) {
                    fn.error(1, e, `Failed to remove stale keys from localStorage: ${t}`)
                } else fn.log(2, e, "Cookies unavailable, keeping localStorage data as is.")
            }
            static getMoeData() {
                const e = Zt.baseLogTag + ".getMoeData";
                let t = localStorage.getItem(Qt);
                if (null == t) return {};
                try {
                    return t = JSON.parse(t), t
                } catch (t) {
                    return fn.errorAndBroadcast(1, e, T, "MoEngage storage was not found", "Make sure you are not deleting or manipulating MOE_DATA in the localStorage.", void 0, t), {}
                }
            }
            static broadcastStorageUpdate() {
                Jt && (0, Yt.Kj)(Jt), Jt = (0, Yt.pS)(() => {
                    Jt = null, "undefined" != typeof window && function() {
                        const e = function() {
                            if (Xt) return Xt;
                            if ("undefined" == typeof document) return null;
                            const e = document.getElementById(S),
                                t = (null == e ? void 0 : e.getAttribute("data-version")) || null;
                            return t && (Xt = t), t
                        }();
                        return !!e && function(e) {
                            const t = e.split(".").map(Number),
                                n = "1.2.0".split(".").map(Number);
                            for (let e = 0; e < Math.max(t.length, n.length); e++) {
                                const r = t[e] || 0,
                                    i = n[e] || 0;
                                if (r > i) return !0;
                                if (r < i) return !1
                            }
                            return !0
                        }(e)
                    }() && window.dispatchEvent(new CustomEvent("MOE_ASSIST_LIFECYCLE", {
                        detail: {
                            name: p,
                            data: null
                        }
                    }))
                }, 500)
            }
        }
        Zt.baseLogTag = "PersistentStorage", Zt.prefix = "", Zt.isSharedWithCookie = !1, Zt.KEYS_SHARED_WITH_COOKIE = [R.USER_DATA, R.SUBSCRIPTION_DETAILS, R.SOFT_ASK_STATUS, R.OPT_IN_SHOWN_TIME, R.HARD_ASK_STATUS, R.SESSION, R.DEVICE_DATA, R.IDENTITY_MAP, R.SDK_DISABLED, R.DATA_TRACKING_DISABLED];
        const en = Zt;
        class tn {
            static getListeners() {
                return this.listeners
            }
            static getTopicListeners(e) {
                return Ie(tn.topicListeners, e, [])
            }
            static addListener(e) {
                tn.listeners.push(e)
            }
            static addTopicListener(e, t) {
                tn.topicListeners[e] = tn.getTopicListeners(e), tn.topicListeners[e].push(t)
            }
            static broadcast(e) {
                tn.listeners.map(t => {
                    t(e)
                }), Ie(tn.topicListeners, e.topic, []).map(t => {
                    t(e)
                })
            }
            static broadcastToWindow(e, t = !1) {
                window && (t || function() {
                    const e = je.get(),
                        t = !!e && !!e.disableSdk,
                        n = !!(null == e ? void 0 : e.disableCookies);
                    let r = !1;
                    return r = ! function() {
                        const e = en.get(R.WEB_SETTINGS);
                        return (null == e ? void 0 : e.isDomainLevelStorage) || !1
                    }() || n ? en.get(R.SDK_DISABLED) : qt.get(R.SDK_DISABLED), !(r || t && !1 !== r)
                }()) && window.dispatchEvent(new CustomEvent(e.topic, {
                    detail: {
                        name: e.name,
                        data: e.data ? e.data : null
                    }
                }))
            }
            static deprecatedSdkCallback(e) {
                window.dispatchEvent(new CustomEvent("MOE_OPT_IN", {
                    detail: e
                }))
            }
            static resetAllListeners() {
                tn.listeners = [], tn.topicListeners = {}
            }
            static resetListeners() {
                tn.listeners = []
            }
        }
        tn.listeners = [], tn.topicListeners = {};
        const nn = tn,
            rn = [{
                color: "#8E44AD",
                baseTags: ["MoeOnsite", "MOE_ONSITE_STORES", "EventTriggerHandler", "OnsiteTriggerManager", "FrequencyCapping", "FrequencyCappingHelper", "DeliveryFunnelManager", "DeliveryStats", "MessagingDisplayManager", "OsmFunctions", "SecondaryEventsManager", "WindowEventManager", "CampaignTimerManager", "CampaignUtils"]
            }, {
                color: "#E67E22",
                baseTags: ["PushModule", "PushInitData", "WebPushManager", "NotificationManager", "HTTPS-NotificationManager", "SoftAskManager"]
            }].reduce((e, {
                color: t,
                baseTags: n
            }) => (n.forEach(n => e[n] = `color: white; background: ${t}; border-radius: 5px;`), e), {}),
            on = e => `color: white; background: ${e}; border-radius: 5px;`;
        let an = on("#41AE55");
        const sn = on("#48beab"),
            cn = on("#18a0bf"),
            ln = on("#e8ab51"),
            dn = on("#cc0a0a"),
            un = on("#a400ff");
        class pn {
            static setLogLevel(e, t) {
                const n = pn.baseLogTag + ".setLogLevel";
                null == Ae.get(U) && Ae.set(U, []), null == e ? pn.logLevel = 0 : M.includes(e) ? (pn.logLevel = e, e > 0 && t && pn.releaseAllLogs()) : pn.warnAndBroadcast(0, n, T, "Invalid log level", `Invalid log level: ${e}. Must be 0 (no logs), 1 (limited logs only), or 2 (all logs). Current log level remains: ${pn.logLevel}.`, A.WEBSDK_DOCS)
            }
            static setLogTabStyle(e) {
                pn.tagLogStyle = on(e)
            }
            static registerModuleColor(e, t) {
                const n = on(t);
                (Array.isArray(e) ? e : [e]).forEach(e => pn.moduleStyles[e] = n)
            }
            static resolveTagStyle(e) {
                return pn.moduleStyles[(e || "").split(".")[0]] || pn.tagLogStyle
            }
            static log(e, t, n, ...r) {
                e <= pn.logLevel ? console.log("%c " + pn.logBrand + " %c %c info %c %c " + t + " ", an, "", cn, "", pn.resolveTagStyle(t), n, ...r) : pn.cacheLog(e, () => {
                    pn.log(e, t, n, ...r)
                })
            }
            static remoteLogTracking(e, t, n, r, ...i) {
                Oe.log(t, n, r, ...i), this.log(e, n, r, ...i)
            }
            static error(e, t, n, ...r) {
                var i;
                !(null === (i = r[r.length - 1]) || void 0 === i ? void 0 : i.isCached) && Oe.log("error", t, n, ...r), e <= pn.logLevel ? console.error("%c " + pn.logBrand + " %c %c error %c %c " + t + " ", an, "", dn, "", pn.resolveTagStyle(t), n, ...r.slice(0, -1)) : pn.cacheLog(e, () => {
                    pn.error(e, t, n, ...r, {
                        isCached: !0
                    })
                })
            }
            static warn(e, t, n, ...r) {
                var i;
                !(null === (i = r[r.length - 1]) || void 0 === i ? void 0 : i.isCached) && Oe.log("warning", t, n, ...r), e <= pn.logLevel ? console.warn("%c " + pn.logBrand + " %c %c warn %c %c " + t + " ", an, "", ln, "", pn.resolveTagStyle(t), n, ...r.slice(0, -1)) : pn.cacheLog(e, () => {
                    pn.warn(e, t, n, ...r, {
                        isCached: !0
                    })
                })
            }
            static broadcastLog(e, t, n, r) {
                document.getElementById(S) && nn.broadcastToWindow({
                    topic: "MOE_LOGGER_EVENT",
                    name: m,
                    data: {
                        label: e,
                        title: t,
                        message: n,
                        link: r
                    }
                }, !0)
            }
            static warnAndBroadcast(e, t, n, r, i, o, ...a) {
                pn.warn(e, t, i, ...a), pn.broadcastLog(n, r, i, o)
            }
            static errorAndBroadcast(e, t, n, r, i, o, ...a) {
                pn.error(e, t, i, ...a), pn.broadcastLog(n, r, i, o)
            }
            static logAndBroadcast(e, t, n, r, i, o, ...a) {
                pn.log(e, t, i, ...a), pn.broadcastLog(n, r, i, o)
            }
            static customLabel(e, t, n, ...r) {
                e <= pn.logLevel ? console.log("%c " + pn.logBrand + " %c %c " + t + " %c %c " + n + " %c ", an, "", pn.resolveTagStyle(t), "", un, "", ...r) : pn.cacheLog(e, () => {
                    pn.customLabel(e, t, n, ...r)
                })
            }
            static image(e, t) {
                e <= pn.logLevel ? console.log("%c+", "font-size: 1px; padding: 20px 80px; line-height: 45px; background: url(" + t + "); background-size: 160px 90px; color: transparent;") : pn.cacheLog(e, () => {
                    pn.image(e, t)
                })
            }
            static releaseAllLogs() {
                const e = Ae.get(U) || [],
                    t = e.filter(e => e.level <= pn.logLevel),
                    n = e.filter(e => e.level > pn.logLevel);
                Ae.set(U, n), t.length > 0 && (pn.log(0, "Logger.releaseAllLogs", "<---- HISTORICAL LOGS BEGIN ----\x3e"), t.forEach(e => e.run()), pn.log(0, "Logger.releaseAllLogs", "<---- HISTORICAL LOGS END ----\x3e"))
            }
            static setLogBrand(e) {
                pn.logBrand = e
            }
            static setBrandColor(e) {
                an = "color: white; background: " + e + "; border-radius: 5px;"
            }
            static cacheLog(e, t) {
                let n = Ae.get(U);
                null == n && (n = []), n.push({
                    level: e,
                    run: t
                }), Ae.set(U, n)
            }
        }
        pn.baseLogTag = "Logger", pn.logBrand = "MoEngage", pn.logLevel = 0, pn.tagLogStyle = sn, pn.moduleStyles = Object.assign({}, rn);
        const fn = pn;
        class vn {
            static get(e, t) {
                return vn.makeNetworkCall(hn.METHODS.GET, e, t)
            }
            static post(e, t) {
                return vn.makeNetworkCall(hn.METHODS.POST, e, t)
            }
            static put(e, t) {
                return vn.makeNetworkCall(hn.METHODS.PUT, e, t)
            }
            static patch(e, t) {
                return vn.makeNetworkCall(hn.METHODS.PATCH, e, t)
            }
            static makeNetworkCall(e, t, n = {}) {
                return new Yt.VR((r, i) => {
                    const o = JSON.stringify(Ie(n, "postData", null));
                    t = ((e, t) => {
                        if (!t) return e;
                        "?" !== e[e.length - 1] && (e += "?");
                        for (const n in t) t.hasOwnProperty(n) && null != t[n] && (e += n + "=" + encodeURIComponent(t[n]) + "&");
                        return "&" === e[e.length - 1] && (e = e.slice(0, -1)), e
                    })(t, Ie(n, "queryParams", null));
                    const a = new XMLHttpRequest;
                    a.open(e, t, !0), vn.addRequestHeaders(a, Ie(n, "headers", {})), a.onreadystatechange = () => {
                        4 === a.readyState && 200 === a.status ? r({
                            status: a.status,
                            responseText: a.responseText
                        }) : 4 !== a.readyState || 410 !== a.status && 412 !== a.status ? 4 === a.readyState && 200 !== a.status && i({
                            code: a.status,
                            reason: a.responseText
                        }) : r({
                            status: a.status,
                            responseText: a.responseText
                        })
                    }, a.send(o)
                })
            }
            static addRequestHeaders(e, t) {
                for (const n in t) t.hasOwnProperty(n) && e.setRequestHeader(n, t[n]);
                return e
            }
        }
        var hn;
        ! function(e) {
            let t;
            ! function(e) {
                e.GET = "GET", e.POST = "POST", e.PUT = "PUT", e.PATCH = "PATCH"
            }(t = e.METHODS || (e.METHODS = {}))
        }(hn || (hn = {}));
        var gn = n(634).VR;
        class mn {
            static initialize() {
                return t(this, void 0, void 0, function*() {
                    if (null == mn.ready) {
                        mn.experiencesStore = $t().createInstance({
                            driver: [$t().INDEXEDDB, $t().WEBSQL, $t().LOCALSTORAGE],
                            name: me,
                            storeName: "experiences"
                        }), mn.aiExperiencesStore = $t().createInstance({
                            driver: [$t().INDEXEDDB, $t().WEBSQL, $t().LOCALSTORAGE],
                            name: me,
                            storeName: be.STORE_NAME
                        }), mn.metaStore = $t().createInstance({
                            driver: [$t().INDEXEDDB, $t().WEBSQL, $t().LOCALSTORAGE],
                            name: me,
                            storeName: _e.STORE_NAME
                        }), mn.inSessionStore = $t().createInstance({
                            driver: [$t().INDEXEDDB, $t().WEBSQL, $t().LOCALSTORAGE],
                            name: me,
                            storeName: ye.STORE_NAME
                        }), mn.splitExperiences = $t().createInstance({
                            driver: [$t().INDEXEDDB, $t().WEBSQL, $t().LOCALSTORAGE],
                            name: me,
                            storeName: "split_experiences"
                        }), mn.tabbedExperiences = $t().createInstance({
                            driver: [$t().INDEXEDDB, $t().WEBSQL, $t().LOCALSTORAGE],
                            name: me,
                            storeName: "tabbed_experiences"
                        }), mn.selfHandledExperiences = $t().createInstance({
                            driver: [$t().INDEXEDDB, $t().WEBSQL, $t().LOCALSTORAGE],
                            name: me,
                            storeName: "self_handle_experiences"
                        });
                        const e = [mn.experiencesStore.ready(), mn.aiExperiencesStore.ready(), mn.metaStore.ready(), mn.inSessionStore.ready(), mn.splitExperiences.ready(), mn.tabbedExperiences.ready(), mn.selfHandledExperiences.ready()];
                        mn.ready = gn.all(e)
                    }
                    return mn.ready
                })
            }
            static clear() {
                return t(this, void 0, void 0, function*() {
                    const e = mn.baseLogTag + ".clear";
                    try {
                        yield mn.initialize(), yield gn.all([mn.experiencesStore.clear(), mn.aiExperiencesStore.clear(), mn.metaStore.clear(), mn.splitExperiences.clear(), mn.tabbedExperiences.clear(), mn.selfHandledExperiences.clear()]);
                        const e = [mn.experiencesStore.ready(), mn.aiExperiencesStore.ready(), mn.metaStore.ready(), mn.splitExperiences.ready(), mn.tabbedExperiences.ready(), mn.selfHandledExperiences.ready()];
                        mn.ready = gn.all(e)
                    } catch (t) {
                        fn.error(1, e, "Error clearing web personalization stores:", t)
                    }
                    return mn.ready
                })
            }
        }
        mn.baseLogTag = "MOE_WEBP_STORES";
        const bn = mn;
        class _n {
            constructor(e, t) {
                this.key = e, this.value = t, this.updated_at = (new Date).getTime()
            }
            static equal(e, t) {
                return e.key === t.key && JSON.stringify(e.value) === JSON.stringify(t.value)
            }
        }
        class yn {
            constructor(e, t, n = !0) {
                this.name = e, this.attributes = t, n && this.attributes.push(new _n("URL", location.href))
            }
        }
        class En {
            constructor(e) {
                var t;
                this.experiences = null === (t = null == e ? void 0 : e.experiences) || void 0 === t ? void 0 : t.map(e => new Tn(e)), this.user_in_gcg = e && e.user_in_gcg, this.personalization_used = null == e ? void 0 : e.personalization_used, this.split_experiences = (null == e ? void 0 : e.split_experiences) || []
            }
        }
        En.baseLogTag = "CampaignDataModel";
        const Sn = En;
        class Tn {
            constructor(e) {
                this.delivery = Ie(e, "delivery", {}), this.url = Ie(e, "url", ""), this.id = Ie(e, "id", ""), this.gcg_enabled = Ie(e, "gcg_enabled"), this.expiry_time = Ie(e, "expiry_time"), this.updated_time = Ie(e, "updated_time"), this.context = Ie(e, "context", {}), this.payload = Ie(e, "payload", []), this.name = Ie(e, "name", ""), this.status = Ie(e, "status", ""), this.in_session_behaviour_segment = Ie(e, "in_session_behaviour_segment"), this.url_filters = Ie(e, "url_filters"), this.is_ai = Ie(e, "is_ai"), this.page_attributes = Ie(e, "page_attributes"), this.tab_list = Ie(e, "tab_list")
            }
        }
        const In = "and",
            wn = "or",
            An = "bool",
            On = "string",
            Dn = "datetime",
            kn = "double",
            xn = "array_bool",
            Nn = "array_double",
            Ln = "array_string",
            Cn = "array_datetime",
            Mn = "is",
            Rn = "lessThan",
            Pn = "greaterThan",
            Un = "between",
            Bn = "in",
            jn = "exists",
            Wn = "contains",
            Vn = "startsWith",
            Hn = "endsWith",
            Kn = "inTheLast",
            Fn = "inTheNext",
            zn = "after",
            qn = "before",
            Gn = "on",
            $n = "today";

        function Yn() {
            return window[ie]
        }
        class Jn {}
        Jn.REMOVE_TRAIL_CHARS = /[^\w\s]+$/gi;
        class Xn {
            constructor(e, t, n, r) {
                this.dataType = e, this.availableOperations = t, this.event = n, this.filter = r
            }
            validate() {
                return !(this.availableOperations.indexOf(this.filter.operator) < 0)
            }
            checkEq() {
                let e = !1;
                const t = (t, n) => {
                    this.dataType === On && typeof t === On && (t = this.removeSpecialChars(t), n = this.removeSpecialChars(n)), this.dataType !== On || this.filter.case_sensitive || t.toLowerCase() !== n.toLowerCase() ? t === n && (e = !0) : e = !0
                };
                if (this.event) this.event.attributes.forEach(e => {
                    e.key === this.filter.name && t(e.value, this.filter.value)
                });
                else {
                    const e = this.getPageContextObjectValue(this.filter.name);
                    t(e, this.filter.value)
                }
                return e
            }
            checkExists() {
                let e = !1;
                return this.event ? this.event.attributes.forEach(t => {
                    t.key === this.filter.name && (e = !0)
                }) : this.getPageContextObjectValue(this.filter.name) && (e = !0), e
            }
            removeSpecialChars(e) {
                return e.replace(Jn.REMOVE_TRAIL_CHARS, "")
            }
            getPageContextObjectValue(e) {
                const t = e.split(".");
                let n = Yn();
                for (const e of t) n = n[e];
                return n
            }
        }
        const Qn = e => "string" == typeof e,
            Zn = e => "[object Date]" === Object.prototype.toString.call(e);

        function er(e, t) {
            return e.substr(0, t.length) === t
        }

        function tr(e, t, n) {
            const r = void 0 === n || n > e.length ? e.length : n;
            return e.substring(r - t.length, r) === t
        }
        const nr = [Mn, jn, Wn, Vn, Hn, Bn];
        class rr extends Xn {
            constructor(e, t) {
                super(On, nr, e, t), this.event || (this.value = this.getPageContextObjectValue(t.name))
            }
            evaluate() {
                let e = !1;
                if (this.event) {
                    const e = this.event.attributes.filter(e => e.key === this.filter.name);
                    this.value = e.length > 0 ? e[0].value : null
                }
                if (null != this.value && Qn(this.value)) switch (this.filter.operator) {
                    case Mn:
                        e = this.checkEq();
                        break;
                    case jn:
                        e = this.checkExists();
                        break;
                    case Wn:
                        e = this.checkContains();
                        break;
                    case Vn:
                        e = this.checkStartsWith();
                        break;
                    case Hn:
                        e = this.checkEndsWith();
                        break;
                    case Bn:
                        e = this.checkIn()
                }
                return this.filter.negate ? !e : e
            }
            checkContains() {
                if (this.event) {
                    if (this.filter.case_sensitive) return this.value.indexOf(this.filter.value) >= 0
                } else if (this.filter.case_sensitive) return this.value.indexOf(this.filter.value) >= 0;
                return this.value.toLowerCase().indexOf(this.filter.value.toLowerCase()) >= 0
            }
            checkStartsWith() {
                return this.filter.case_sensitive ? er(this.value, this.filter.value) : er(this.value.toLowerCase(), this.filter.value.toLowerCase())
            }
            checkEndsWith() {
                if (this.filter.case_sensitive) return tr(this.value, this.filter.value);
                const e = this.removeSpecialChars(this.value),
                    t = this.removeSpecialChars(this.filter.value);
                return tr(e.toLowerCase(), t.toLowerCase())
            }
            checkIn() {
                let e = !1;
                if (Array.isArray(this.filter.value))
                    for (let t = this.filter.value.length - 1; t >= 0; t--)
                        if (this.filter.case_sensitive) {
                            if (this.filter.value[t] === this.value) {
                                e = !0;
                                break
                            }
                        } else if (this.filter.value[t].toLowerCase() === this.value.toLowerCase()) {
                    e = !0;
                    break
                }
                return e
            }
        }
        rr.baseLogTag = "StringDataType";
        const ir = rr,
            or = [Mn, jn];
        class ar extends Xn {
            constructor(e, t) {
                super(An, or, e, t)
            }
            evaluate() {
                let e = !1;
                switch (this.filter.operator) {
                    case Mn:
                        e = this.checkEq();
                        break;
                    case jn:
                        e = this.checkExists()
                }
                return this.filter.negate ? !e : e
            }
        }
        ar.baseLogTag = "BooleanDataType";
        const sr = ar,
            cr = [jn, Gn, Un, qn, zn, Kn, Fn, $n];
        class lr extends Xn {
            constructor(e, t) {
                !Zn(t.value) && Qn(t.value) && (t.value = new Date(t.value.split("Z").join(""))), !Zn(t.value2) && Qn(t.value2) && null != t.value2 && (t.value2 = new Date(t.value2.split("Z").join(""))), !Zn(t.value1) && Qn(t.value1) && null != t.value1 && (t.value1 = new Date(t.value1.split("Z").join(""))), super(Dn, cr, e, t)
            }
            evaluate() {
                let e = !1;
                const t = this.event.attributes.filter(e => e.key === this.filter.name),
                    n = t.length > 0 ? t[0] : null;
                if (null != n) switch (n.value.setHours(0, 0, 0, 0), this.filter.operator) {
                    case Mn:
                        e = this.checkEq();
                        break;
                    case jn:
                        e = this.checkExists();
                        break;
                    case Gn:
                        e = this.checkOn(n);
                        break;
                    case Un:
                        e = this.checkBetween(n);
                        break;
                    case qn:
                        e = this.checkBefore(n);
                        break;
                    case zn:
                        e = this.checkAfter(n);
                        break;
                    case Kn:
                        e = this.checkLastX(n);
                        break;
                    case Fn:
                        e = this.checkNextX(n);
                        break;
                    case $n:
                        e = this.checkToday(n)
                }
                return this.filter.negate ? !e : e
            }
            checkOn(e) {
                return e.value.setHours(0, 0, 0, 0) === this.filter.value.setHours(0, 0, 0, 0)
            }
            checkBetween(e) {
                return this.filter.value2 ? this.filter.value.getTime() <= e.value.getTime() && e.value.getTime() < this.filter.value2.getTime() : this.filter.value.getTime() <= e.value.getTime() && e.value.getTime() < this.filter.value1.getTime()
            }
            checkBefore(e) {
                const {
                    filter: {
                        value: t
                    }
                } = this;
                return typeof t === E ? ((new Date).setHours(0, 0, 0, 0) - e.value.setHours(0, 0, 0, 0)) / 864e5 > t : e.value.setHours(0, 0, 0, 0) < t.setHours(0, 0, 0, 0)
            }
            checkAfter(e) {
                const {
                    filter: {
                        value: t
                    }
                } = this;
                return typeof t === E ? (e.value.setHours(0, 0, 0, 0) - (new Date).setHours(0, 0, 0, 0)) / 864e5 > t : e.value.setHours(0, 0, 0, 0) > t.setHours(0, 0, 0, 0)
            }
            checkLastX(e) {
                const t = (new Date).setHours(0, 0, 0, 0),
                    n = e.value.setHours(0, 0, 0, 0);
                return t - n > 0 && (t - n) / 864e5 <= this.filter.value
            }
            checkNextX(e) {
                const t = (new Date).setHours(0, 0, 0, 0),
                    n = e.value.setHours(0, 0, 0, 0);
                return n - t > 0 && (n - t) / 864e5 <= this.filter.value
            }
            checkToday(e) {
                return e.value.setHours(0, 0, 0, 0) === (new Date).setHours(0, 0, 0, 0)
            }
        }
        lr.baseLogTag = "DateTimeDataType";
        const dr = lr,
            ur = [Mn, jn, Pn, Rn, Un, Bn];
        class pr extends Xn {
            constructor(e, t) {
                super(kn, ur, e, t), this.event || (this.value = this.getPageContextObjectValue(t.name))
            }
            evaluate() {
                let e = !1;
                if (this.event) {
                    const e = this.event.attributes.filter(e => e.key === this.filter.name);
                    this.value = e.length > 0 ? e[0].value : null
                }
                if (null != this.value && "number" == typeof this.value) switch (this.filter.operator) {
                    case Mn:
                        e = this.checkEq();
                        break;
                    case jn:
                        e = this.checkExists();
                        break;
                    case Pn:
                        e = this.checkGreaterThan();
                        break;
                    case Rn:
                        e = this.checkLessThan();
                        break;
                    case Un:
                        e = this.checkBetween();
                        break;
                    case Bn:
                        e = this.checkIn()
                }
                return this.filter.negate ? !e : e
            }
            checkGreaterThan() {
                return this.value > this.filter.value
            }
            checkLessThan() {
                return this.value < this.filter.value
            }
            checkBetween() {
                return this.filter.value2 ? this.filter.value && this.filter.value2 && this.filter.value <= this.value && this.value < this.filter.value2 : this.filter.value && this.filter.value1 && this.filter.value <= this.value && this.value < this.filter.value1
            }
            checkIn() {
                return Array.isArray(this.filter.value) && this.filter.value.indexOf(this.value) >= 0
            }
        }
        pr.baseLogTag = "NumberDataType";
        const fr = pr,
            vr = [Mn, jn, Wn, Vn, Hn, Bn, Rn, Pn, Un, Kn, Fn, zn, qn, Gn, $n];
        class hr extends Xn {
            constructor(e, t) {
                super(t.data_type, vr, e, t)
            }
            evaluate() {
                let e = !1;
                const t = this.event.attributes.filter(e => e.key === this.filter.name),
                    n = t.length > 0 ? t[0] : null;
                return null != n && Array.isArray(n.value) && (e = this.filter.array_filter_type && "any_of" === this.filter.array_filter_type ? this.checkAnyOf(n) : this.checkAllOf(n)), e
            }
            checkAllOf(e) {
                return e.value.every(t => this.getFilterResult(t, e))
            }
            checkAnyOf(e) {
                return e.value.some(t => this.getFilterResult(t, e))
            }
            getFilterResult(e, t) {
                let n = !1;
                const r = this.createCustomEvent(t.key, e),
                    i = this.getDataType(r);
                return i.validate() && (n = i.evaluate()), n
            }
            createCustomEvent(e, t) {
                const n = new _n(e, t);
                return new yn(this.event.name, [n])
            }
            getDataType(e) {
                let t;
                switch (this.filter.data_type) {
                    case xn:
                        t = new sr(e, this.filter);
                        break;
                    case Cn:
                        t = new dr(e, this.filter);
                        break;
                    case Nn:
                        t = new fr(e, this.filter);
                        break;
                    case Ln:
                        t = new ir(e, this.filter)
                }
                return t
            }
        }
        class gr {
            static doesEventMatchFilters(e, t) {
                let n = !1,
                    r = null;
                switch (t.data_type) {
                    case An:
                        r = new sr(e, t), r.validate() && (n = r.evaluate());
                        break;
                    case On:
                        r = new ir(e, t), r.validate() && (n = r.evaluate());
                        break;
                    case kn:
                    case "long":
                        r = new fr(e, t), r.validate() && (n = r.evaluate());
                        break;
                    case Dn:
                        r = new dr(e, t), r.validate() && (n = r.evaluate());
                        break;
                    case Ln:
                    case Cn:
                    case xn:
                    case Nn:
                        r = new hr(e, t), r.validate() && (n = r.evaluate())
                }
                return n
            }
            static doesValueMatchFilter(e, t) {
                const n = new _n(t.name, e),
                    r = new yn("sample event", [n]);
                return gr.doesEventMatchFilters(r, t)
            }
        }
        gr.baseLogTag = "TriggerEvaluator";
        const mr = {
            randomUUID: "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto)
        };
        var br, _r = new Uint8Array(16);

        function yr() {
            if (!br && !(br = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto))) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            return br(_r)
        }
        for (var Er = [], Sr = 0; Sr < 256; ++Sr) Er.push((Sr + 256).toString(16).slice(1));
        const Tr = function(e, t, n) {
                if (mr.randomUUID && !t && !e) return mr.randomUUID();
                var r = (e = e || {}).random || (e.rng || yr)();
                if (r[6] = 15 & r[6] | 64, r[8] = 63 & r[8] | 128, t) {
                    n = n || 0;
                    for (var i = 0; i < 16; ++i) t[n + i] = r[i];
                    return t
                }
                return function(e, t = 0) {
                    return (Er[e[t + 0]] + Er[e[t + 1]] + Er[e[t + 2]] + Er[e[t + 3]] + "-" + Er[e[t + 4]] + Er[e[t + 5]] + "-" + Er[e[t + 6]] + Er[e[t + 7]] + "-" + Er[e[t + 8]] + Er[e[t + 9]] + "-" + Er[e[t + 10]] + Er[e[t + 11]] + Er[e[t + 12]] + Er[e[t + 13]] + Er[e[t + 14]] + Er[e[t + 15]]).toLowerCase()
                }(r)
            },
            Ir = e => t(void 0, void 0, void 0, function*() {
                if (wr(e)) {
                    const t = Or(e);
                    bn.inSessionStore.setItem(Te.IN_SESSION_EVENTS, t)
                }
            }),
            wr = e => !!Ar(e).length,
            Ar = e => e.filter(e => !!e.in_session_behaviour_segment),
            Or = e => {
                let t = [];
                return e.forEach(e => {
                    var n;
                    (null === (n = null == e ? void 0 : e.in_session_behaviour_segment) || void 0 === n ? void 0 : n.included_filters) && (t = t.concat(e.in_session_behaviour_segment.included_filters.filters[0].action_name))
                }), t
            },
            Dr = () => t(void 0, void 0, void 0, function*() {
                return bn && bn.inSessionStore ? new Yt.VR((e, n) => t(void 0, void 0, void 0, function*() {
                    const t = yield bn.inSessionStore.getItem(Te.IN_SESSION_EVENTS_HISTORY);
                    e(t || [])
                })) : []
            });

        function kr(e) {
            return t(this, void 0, void 0, function*() {
                const n = Ie(e, "in_session_behaviour_segment.included_filters.filters", []),
                    r = Ie(e, "in_session_behaviour_segment.included_filters.filter_operator", "and");
                if (!(yield function(e, n) {
                        return t(this, void 0, void 0, function*() {
                            return new Yt.VR((r, i) => t(this, void 0, void 0, function*() {
                                const {
                                    count: t,
                                    type: i
                                } = e, o = yield Lr(n);
                                let a;
                                switch (i) {
                                    case "exactly":
                                        a = o === t;
                                        break;
                                    case "atleast":
                                        a = o >= t;
                                        break;
                                    case "atmost":
                                        a = o <= t
                                }
                                r(a)
                            }))
                        })
                    }(n[0].execution, n[0].action_name))) return !1;
                let i = yield xr(n[0]);
                if (n.length > 1)
                    for (let e = 0; e < n.length; e++)
                        if (r === In) {
                            if (i = !(!i || !(yield xr(n[e]))), !1 === i) break
                        } else if (r === wn && (i = !(!i && !(yield xr(n[e]))), !0 === i)) break;
                return i
            })
        }

        function xr(e) {
            return t(this, void 0, void 0, function*() {
                const t = Ie(e, "attributes.filters", []);
                let n = !0;
                if (t && t.length > 0) {
                    const r = yield Nr(e.action_name), i = Ie(e, "attributes.filter_operator", "and"), o = t.map(e => !!r.find(t => gr.doesEventMatchFilters(t, e)));
                    n = o[0];
                    for (let e = 1; e < o.length; e++)
                        if (i === In) {
                            if (n = n && o[e], !1 === n) break
                        } else if (i === wn && (n = n || o[e], !0 === n)) break
                }
                return n
            })
        }
        const Nr = e => t(void 0, void 0, void 0, function*() {
                return (yield Dr()).filter(t => e === t.name)
            }),
            Lr = e => t(void 0, void 0, void 0, function*() {
                const t = yield Dr();
                let n = 0;
                return t.forEach(t => {
                    t.name === e && n++
                }), n
            });

        function Cr(e) {
            return t(this, void 0, void 0, function*() {
                const n = Ie(e, "page_attributes.filters", []),
                    r = Ie(e, "page_attributes.filter_operator", "and"),
                    i = yield function(e, n) {
                        return t(this, void 0, void 0, function*() {
                            if (!window[ie]) return !1;
                            let t = !0;
                            if (e && e.length > 0) {
                                const r = e.map(e => gr.doesEventMatchFilters(void 0, e));
                                t = r[0];
                                for (let e = 1; e < r.length; e++)
                                    if (n === In) {
                                        if (t = t && r[e], !1 === t) break
                                    } else if (n === wn && (t = t || r[e], !0 === t)) break
                            }
                            return t
                        })
                    }(n, r);
                return i
            })
        }
        var Mr = n(634).VR;

        function Rr(e) {
            (null === document || void 0 === document ? void 0 : document.body) ? document.body.appendChild(e): (null === document || void 0 === document ? void 0 : document.head) ? document.head.appendChild(e) : document.addEventListener("DOMContentLoaded", () => {
                null === document || void 0 === document || document.body.appendChild(e)
            })
        }

        function Pr(e) {
            const t = document.createElement("div");
            return t.innerHTML = e, t.firstElementChild
        }

        function Ur(e) {
            return new Date(Date.parse(e))
        }

        function Br(e, t = 15) {
            const n = (new Date).getTime() - new Date(e).getTime();
            return Math.round(n / 6e4) >= t
        }

        function jr() {
            var e;
            const t = !0;
            try {
                const n = localStorage.getItem("MOE_DATA");
                if (!n) return t;
                const r = JSON.parse(n),
                    i = null === (e = null == r ? void 0 : r.WEB_SETTINGS) || void 0 === e ? void 0 : e.configs;
                return i ? !1 !== i.isCacheEnabledForWebPSelfHandle : t
            } catch (e) {
                return t
            }
        }
        const Wr = () => window.Moengage,
            Vr = () => {
                let e = {};
                return e = "" !== window.location.search ? ti(window.location.search) : ti(window.location.hash), e
            },
            Hr = () => {
                const e = Vr();
                return e[se] && "1" === e[se] && Kr()
            },
            Kr = () => window.self === window.top,
            Fr = e => {
                const t = [],
                    n = e.filter(e => !!(e && Ur(e.expiry_time + "Z") > new Date) || (t.push(e.id), !1));
                t.length > 0 && ri("expired_experiences", t);
                const r = (e => e.sort((e, t) => {
                    return e.delivery.priority === t.delivery.priority && (n = t.updated_time, Ur(e.updated_time + "Z").getTime() - Ur(n + "Z").getTime() > 0) ? -1 : 1;
                    var n
                }))(n.sort((e, t) => t.delivery.priority - e.delivery.priority));
                return zr(r)
            },
            zr = e => {
                const t = {},
                    n = {};
                return {
                    experiences: e = e.filter(e => {
                        if (e.is_ai && (n[e.id] = e.context), 0 === e.payload.length) return !(Number(e.context.moe_variation_id) > 1);
                        let r = !1;
                        return e.payload.forEach(n => {
                            const i = n.widgetId && n.type === Y ? n.selector + "_" + n.type + "_" + n.widgetId : n.selector + "_" + n.type;
                            n.widgetId && !n.content || t[i] || (r = !0, t[i] = n, t[i].expId = e.id)
                        }), r
                    }),
                    allOp: t,
                    aiExperienceContext: n
                }
            },
            qr = e => t(void 0, void 0, void 0, function*() {
                yield Mr.all(e.map(e => {
                    bn.experiencesStore.setItem(e.id, e)
                }))
            }),
            Gr = () => t(void 0, void 0, void 0, function*() {
                const e = [];
                return yield bn.experiencesStore.iterate(t => {
                    e.push(t)
                }), e
            }),
            $r = e => t(void 0, void 0, void 0, function*() {
                return yield bn.experiencesStore.getItem(e)
            }),
            Yr = e => t(void 0, void 0, void 0, function*() {
                yield Mr.all(e.map(e => t(void 0, void 0, void 0, function*() {
                    const t = ci(e.url);
                    yield bn.splitExperiences.setItem(t, e)
                })))
            }),
            Jr = e => t(void 0, void 0, void 0, function*() {
                return yield bn.tabbedExperiences.getItem(e)
            }),
            Xr = () => t(void 0, void 0, void 0, function*() {
                yield bn.experiencesStore.clear(), yield bn.aiExperiencesStore.clear(), yield bn.metaStore.clear(), yield bn.splitExperiences.clear(), yield bn.tabbedExperiences.clear(), yield bn.selfHandledExperiences.clear()
            }),
            Qr = e => t(void 0, void 0, void 0, function*() {
                var t;
                return yield null === (t = bn.metaStore) || void 0 === t ? void 0 : t.setItem(_e.USER_IN_GCG, e)
            }),
            Zr = () => t(void 0, void 0, void 0, function*() {
                var e;
                return yield null === (e = bn.metaStore) || void 0 === e ? void 0 : e.removeItem(_e.LAST_FETCHED_TIME)
            });

        function ei() {
            const e = "Web Personalisation.getMetaInfo",
                t = document.currentScript;
            let n, r, i, o, a, s = "",
                c = "",
                l = !1;
            if (t) {
                "dc_3" in b && (s = b.dc_3);
                const d = new URL(t.src),
                    u = new URLSearchParams(d.search);
                if (n = u.get("app_id") || "", i = u.get("customProxyDomain") || "", r = u.get("environment") || "", l = "true" === u.get("enable_split_url"), o = "true" === u.get("disable_webp"), a = u.get("contentSecurityNonce") || "", u.get("cluster")) {
                    const e = u.get("cluster"),
                        t = null == e ? void 0 : e.toUpperCase();
                    e && t && t in _ && (s = t)
                }
                if (!n.includes("_DEBUG")) {
                    const e = u.get("env"),
                        t = u.get("debug_logs"),
                        r = e ? e.toUpperCase() : null,
                        i = t ? parseInt(t, 10) : 0;
                    (r === k || i > 0 && r !== x) && (n += "_DEBUG")
                }
                return r ? c = "https://" + r + "/" : s && s in _ && (c = "https://" + _[s] + "/"), i && (c = c.replace("moengage.com", i)), r || s || fn.errorAndBroadcast(2, e, T, "Data center not present", "Please check web personalization integration.", A.WEB_PERSONALIZATION), n || fn.errorAndBroadcast(2, e, T, "App ID not present", "Please check web personalization integration.", A.WEB_PERSONALIZATION), {
                    APP_ID: n,
                    HOST: c,
                    CLUSTER: s,
                    ENABLE_SPLIT_URL: l,
                    DISABLE_WEBP: o,
                    NONCE_VALUE: a,
                    CUSTOM_PROXY_DOMAIN: i
                }
            }
            return {}
        }
        const ti = e => {
            if (e) {
                const t = e.indexOf("?");
                if (t < 0) return {};
                const n = (e = e.slice(t + 1)).replace("?", "").split("&"),
                    r = {};
                return n.forEach(e => {
                    const t = e.split("="),
                        n = t[0],
                        i = decodeURIComponent(t[1] || "");
                    r[n] ? "[object Array]" === Object.prototype.toString.call(r[n]) ? r[n].push(i) : r[n] = [r[n], i] : r[n] = i
                }), JSON.parse(JSON.stringify(r))
            }
            return {}
        };

        function ni(e, t) {
            return e === V && "tablet" === t ? "web" : t
        }

        function ri(e, t) {
            window.MoeWebP.statsData[e] = t
        }

        function ii() {
            var e;
            try {
                let t, n;
                return t = "1" === oi("moe_c_s") || "true" === oi("COOKIE_SHARING") ? {
                    deviceUuid: oi("moe_uuid")
                } : en.get(R.USER_DATA), t && t.deviceUuid ? n = t.deviceUuid : (n = null === (e = window.MoeWebP) || void 0 === e ? void 0 : e.deviceUuid, n || (n = Tr(), window.MoeWebP = window.MoeWebP || {}, window.MoeWebP.deviceUuid = n)), n
            } catch (e) {
                fn.error(2, "Web Personalisationutils.getOrSetDeviceUUID", "Error fetching or setting device UUID:", e)
            }
        }

        function oi(e) {
            const t = e + "=",
                n = document.cookie.split(";").map(e => {
                    let t = e.trim();
                    "%" === t.slice(-1) && (t += "25");
                    try {
                        return decodeURIComponent(t)
                    } catch (e) {
                        return fn.error(2, "Web Personalisation.getDecodedCookies", "Error decoding cookie:", t, e), t
                    }
                });
            for (let e = n.length - 1; e >= 0; e--) {
                let r = n[e];
                for (;
                    " " === r.charAt(0);) r = r.substring(1);
                if (0 === r.indexOf(t)) return r.substring(t.length, r.length)
            }
            return null
        }
        const ai = (e, t) => {
            let n;
            return function(...r) {
                (0, Yt.Kj)(n), n = (0, Yt.pS)(() => {
                    e.apply(this, r), n = void 0
                }, t)
            }
        };

        function si(e) {
            return "is_ai" in e && e.payload.length > 0
        }

        function ci(e) {
            return (e = e.split("?")[0]).replace(/^(https?:\/\/)?(www\.)?/, "https://").replace(/\/$/, "")
        }

        function li(e) {
            const t = ci(window.location.href);
            return !(!e || !e.redirection_url || ci(e.redirection_url) === t || (location.replace(e.redirection_url), 0))
        }
        const di = (e, n, ...r) => t(void 0, [e, n, ...r], void 0, function*(e, t, n = !1) {
            const r = yield $r(e);
            return !!r && (r.payload = t, n && (r.is_ai = !0), window.MoeWebP.handleDomManipulator(r), !0)
        });

        function ui(e) {
            const t = en.get(R.INIT_DATA),
                n = !!(null == t ? void 0 : t.disableSdk),
                r = en.get(R.SDK_DISABLED);
            return !(r || n && !1 !== r || !t && e) || (fn.warnAndBroadcast(2, "Web Personalisationutils.isSdkEnabled", T, "Web SDK is disabled", "Web personalization is disabled.", A.WEB_OPT_OUT), !1)
        }

        function pi(e, t) {
            const n = oe,
                r = e.getAttribute(n);
            if (r) {
                const i = r.split(",").map(e => e.trim());
                i.includes(t) || (i.push(t), e.setAttribute(n, i.join(",")))
            } else e.setAttribute(n, t)
        }

        function fi(e, t) {
            const n = e.querySelectorAll(`[${oe}]`);
            for (const e of Array.from(n)) {
                const n = (e.getAttribute(oe) || "").split(",").map(e => e.trim());
                if (n.includes(t)) return e
            }
            return null
        }

        function vi(e, t = "") {
            var n;
            const r = t || (null === (n = je.get()) || void 0 === n ? void 0 : n.contentSecurityNonce);
            if ("string" == typeof r && r.length) try {
                e.setAttribute("nonce", r)
            } catch (e) {
                fn.error(2, "Nonce.addNonceToElement", "Error adding nonce to element: ", e)
            }
        }

        function hi(e, t = "") {
            var n;
            let r = e;
            const i = t || (null === (n = je.get()) || void 0 === n ? void 0 : n.customProxyDomain);
            return "string" == typeof r && r.length && "string" == typeof i && i.length && (r = r.replace(/((?:https?:)?\/\/)([a-zA-Z0-9][-a-zA-Z0-9]*\.)*moengage\.com(?=[:/?\s#'"]|$)/gi, (e, t, n) => {
                const r = e.substring(t.length);
                return ["www.moengage.com", "moengage.com"].includes(r) ? e : t + r.replace(/moengage\.com$/i, i)
            })), r
        }
        class gi {
            static getOperationKey(e, t) {
                return t ? `${t}_${(null==e?void 0:e.widgetId)||(null==e?void 0:e.selector)||""}` : ""
            }
            static getContentKey(e, t) {
                return (null == e ? void 0 : e.dataMoeId) ? `moeId_${e.dataMoeId}` : gi.getOperationKey(e, t)
            }
            static setUpdatableExperience(e, t) {
                e && gi.updatableExperiences.set(e, t)
            }
            static shouldUpdateRendered(e, t) {
                if (!1 === gi.updatableExperiences.get(t)) return !1;
                const n = gi.getContentKey(e, t);
                return !n || gi.renderedContent.get(n) !== (null == e ? void 0 : e.content)
            }
            static getRenderedElement(e, t = document, n) {
                if (null == e ? void 0 : e.dataMoeId) return fi(t, e.dataMoeId);
                const r = gi.getOperationKey(e, n);
                if (!r) return null;
                const i = gi.insertedElements.get(r);
                return i && t.contains(i) ? i : null
            }
            static saveRenderedState(e, t, n) {
                const r = gi.getOperationKey(e, n);
                t && !(null == e ? void 0 : e.dataMoeId) && r && gi.insertedElements.set(r, t);
                const i = gi.getContentKey(e, n);
                i && gi.renderedContent.set(i, null == e ? void 0 : e.content)
            }
            static hasScriptExecuted(e) {
                return !!(null == e ? void 0 : e.content) && gi.executedScripts.has(e.content)
            }
            static setScriptExecuted(e) {
                (null == e ? void 0 : e.content) && gi.executedScripts.add(e.content)
            }
            static reset() {
                gi.insertedElements.clear(), gi.renderedContent.clear(), gi.updatableExperiences.clear()
            }
        }
        gi.executedScripts = new Set, gi.insertedElements = new Map, gi.renderedContent = new Map, gi.updatableExperiences = new Map;
        const mi = gi,
            bi = (e, t) => {
                if (!(null == e ? void 0 : e.setAttribute)) return;
                const n = t => {
                        e.setAttribute(fe, t)
                    },
                    r = e.getAttribute(fe) || "";
                r && !r.includes(ge[t]) ? n(r + " & " + ge[t]) : n(ge[t])
            };
        let _i;
        const yi = () => {
            _i = (() => {
                const e = document.createElement("div");

                function t(t) {
                    t.stopPropagation();
                    const n = this.getAttribute(fe);
                    e.textContent = n;
                    const r = t.clientY - 35;
                    e.style.left = t.clientX + 15 + "px", e.style.top = r + "px", e.classList.add("visible")
                }

                function n() {
                    e.classList.remove("visible")
                }
                return e.classList.add("tooltip"), window.addEventListener("load", () => {
                    document.body.appendChild(e)
                }), {
                    enable(e = document) {
                        e.querySelectorAll(`[${fe}]`).forEach(e => {
                            e.addEventListener("mousemove", t), e.addEventListener("mouseleave", n)
                        })
                    },
                    disable(e = document) {
                        e.querySelectorAll(`[${fe}]`).forEach(e => {
                            e.removeEventListener("mousemove", t), e.removeEventListener("mouseleave", n)
                        })
                    }
                }
            })()
        };

        function Ei(e, t) {
            return e.getAttribute("data-widget-child-id") || `node_${t}`
        }

        function Si(e) {
            return [e, ...Array.from(e.querySelectorAll("*"))]
        }

        function Ti(e, t) {
            for (; t.firstChild;) t.removeChild(t.firstChild);
            for (; e.firstChild;) t.appendChild(e.firstChild)
        }

        function Ii(e, t) {
            const n = new Map;
            if ([e, ...Array.from(e.querySelectorAll("[id]"))].forEach(e => {
                    e.id && !n.has(e.id) && n.set(e.id, e)
                }), !n.size) return t;
            let r = t;
            return [t, ...Array.from(t.querySelectorAll("[id]"))].reverse().forEach(e => {
                const t = e.id && n.get(e.id);
                var i, o;
                t && t !== e && t.tagName === e.tagName && (i = e, o = t, Array.from(o.attributes).forEach(e => {
                    i.hasAttribute(e.name) || o.removeAttribute(e.name)
                }), Array.from(i.attributes).forEach(e => {
                    o.setAttribute(e.name, e.value)
                }), Ti(i, o), e === r ? r = t : e.replaceWith(t))
            }), r
        }

        function wi(e, t) {
            const n = Ii(e, t);
            return n !== e && e.replaceWith(n), n
        }
        const Ai = ei();
        class Oi {
            static handleInlineEventHandlers(e, t) {
                const n = function(e, t, n, r = "") {
                    var i;
                    if (!r && !(null === (i = je.get()) || void 0 === i ? void 0 : i.contentSecurityNonce)) return "";
                    const o = ["onclick", "ondblclick", "onmousedown", "onmouseup", "onmouseover", "onmouseout", "onmousemove", "onmouseenter", "onmouseleave", "oncontextmenu", "onkeydown", "onkeyup", "onkeypress", "onchange", "oninput", "onsubmit", "onfocus", "onblur", "onselect", "onreset", "onload", "onunload", "onbeforeunload", "onresize", "onscroll", "onerror", "onabort", "ondrag", "ondragstart", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondrop", "onwheel", "ontouchstart", "ontouchend", "ontouchmove", "ontouchcancel", "onanimationstart", "onanimationend", "onanimationiteration", "ontransitionend"];
                    let a = "",
                        s = 0;
                    return (e instanceof Document ? e.querySelectorAll("*") : [e, ...e.querySelectorAll("*")]).forEach(e => {
                        const r = [];
                        if (o.forEach(t => {
                                const n = e.getAttribute(t);
                                if (n) {
                                    const i = t.substring(2);
                                    r.push({
                                        event: i,
                                        code: n
                                    }), e.removeAttribute(t)
                                }
                            }), r.length > 0) {
                            const i = `moe-handler-${n}-${t}-${s++}`;
                            e.setAttribute("data-moe-handler-id", i), a += `\n        (function() {\n          var el = document.querySelector('[data-moe-handler-id="${i}"]');\n          if (el) {\n      `, r.forEach(({
                                event: e,
                                code: t
                            }) => {
                                a += `\n            (function() {\n              el.addEventListener(${JSON.stringify(e)}, function(event) {\n                try {\n                  ${t}\n                } catch(e) {\n                  console.error('Error in ${JSON.stringify(e)} handler:', e);\n                }\n              });\n            })();\n        `
                            }), a += "\n          }\n        })();\n      "
                        }
                    }), a
                }(e, t, "WebP", null == Ai ? void 0 : Ai.NONCE_VALUE);
                if (n.trim()) {
                    const e = document.createElement("script");
                    return e.textContent = n, vi(e, null == Ai ? void 0 : Ai.NONCE_VALUE), e
                }
                return null
            }
            static initiate(e, t, n, r) {
                var i;
                const o = Oi.baseLogTag + ".initiate";
                if ((null === (i = e.content) || void 0 === i ? void 0 : i.length) && (e.content = hi(e.content, null == Ai ? void 0 : Ai.CUSTOM_PROXY_DOMAIN)), !e || !e.type) return fn.error(1, o, "Operation type is missing:", e), {
                    success: !1,
                    reason: "invalid type",
                    operation: e
                };
                const {
                    type: a
                } = e;
                let s;
                const c = null == t ? void 0 : t.cid;
                switch (a) {
                    case G:
                        s = Oi.handleInsertOp(e, n, c);
                        break;
                    case Y:
                        s = Oi.handleInsertJSOp(e);
                        break;
                    case Z:
                        s = Oi.handleReplaceOp(e, n, c);
                        break;
                    case J:
                        s = Oi.handleUpdateOp(e, n);
                        break;
                    case X:
                        s = Oi.handleUpdateHTMLOp(e, n, c);
                        break;
                    case "delete":
                        s = Oi.handleDeleteOp(e, n);
                        break;
                    case "hide":
                        s = Oi.handleHideOp(e, n);
                        break;
                    case "attribute":
                        s = Oi.handleAttributeOp(e, n, c);
                        break;
                    case "tracking":
                        s = Oi.handleTrackingOp(e, n, t, r);
                        break;
                    case $:
                        s = Oi.handleReArrangeOp(e, n);
                        break;
                    default:
                        s = {
                            success: !1,
                            reason: "invalid type",
                            operation: e
                        }
                }
                return s
            }
            static buildInsertContent(e, t) {
                var n, r;
                const i = e.content || "",
                    o = Pr(Kr() || !(null === (n = e.metaData) || void 0 === n ? void 0 : n.html) ? i : null === (r = e.metaData) || void 0 === r ? void 0 : r.html);
                return bi(o, i.trim().startsWith("<img") ? Q : e.type), e.dataMoeId && pi(o, e.dataMoeId), {
                    content: o,
                    handlerScript: this.handleInlineEventHandlers(o, t)
                }
            }
            static replaceRenderedContent(e, t, n) {
                const r = Oi.baseLogTag + ".replaceRenderedContent",
                    {
                        content: i,
                        handlerScript: o
                    } = Oi.buildInsertContent(e, n),
                    a = function(e) {
                        const t = new Map;
                        return Si(e).forEach((e, n) => {
                            (e.scrollLeft || e.scrollTop) && t.set(Ei(e, n), [e.scrollLeft, e.scrollTop])
                        }), t
                    }(t),
                    s = wi(t, i);
                var c;
                return (c = a).size && Si(s).forEach((e, t) => {
                    const n = c.get(Ei(e, t));
                    n && (e.scrollTo ? e.scrollTo({
                        left: n[0],
                        top: n[1],
                        behavior: "instant"
                    }) : (e.scrollLeft = n[0], e.scrollTop = n[1]))
                }), mi.saveRenderedState(e, s, n), o && Rr(o), fn.log(2, r, `Updated experience in place: ${e.dataMoeId||e.widgetId}`), {
                    success: !0,
                    insertedElement: s
                }
            }
            static handleInsertOp(e, t, n) {
                const r = Oi.baseLogTag + ".handleInsertOp";
                if (e.content && e.placement) {
                    const i = mi.getRenderedElement(e, t, n);
                    if (i) return mi.shouldUpdateRendered(e, n) ? Oi.replaceRenderedContent(e, i, n) : {
                        success: !0,
                        insertedElement: i
                    };
                    const o = t.querySelector(null == e ? void 0 : e.selector);
                    if (o) {
                        const {
                            content: t,
                            handlerScript: r
                        } = Oi.buildInsertContent(e, n);
                        return "after" === e.placement ? o.parentNode.insertBefore(t, o.nextSibling) : "before" === e.placement && o.parentNode.insertBefore(t, o), mi.saveRenderedState(e, t, n), r && Rr(r), {
                            success: !0,
                            insertedElement: t
                        }
                    }
                    return fn.errorAndBroadcast(1, r, T, "DOM element not found", ke("object" == typeof e ? JSON.stringify(e) : e), void 0, e), {
                        success: !1,
                        reason: "invalid query selector",
                        operation: e
                    }
                }
                return fn.errorAndBroadcast(1, r, T, Le, `Content or placement not found: ${"object"==typeof e?JSON.stringify(e):e}`, void 0, e), {
                    success: !1,
                    reason: "unable to find content / placement.",
                    operation: e
                }
            }
            static handleInsertJSOp(e) {
                const t = Oi.baseLogTag + ".handleInsertJSOp";
                if (e.content) {
                    if (mi.hasScriptExecuted(e)) return fn.log(2, t, `Script already executed on this page, skipping: ${e.widgetId||e.selector}`), {
                        success: !0
                    };
                    try {
                        const t = function(e) {
                                try {
                                    return JSON.parse(e)
                                } catch (e) {
                                    return null
                                }
                            }(null == e ? void 0 : e.content),
                            n = document.createElement("script");
                        return n.textContent = t, vi(n, null == Ai ? void 0 : Ai.NONCE_VALUE), document.body ? document.body.appendChild(n) : document.head.appendChild(n), mi.setScriptExecuted(e), {
                            success: !0
                        }
                    } catch (t) {
                        return {
                            success: !1,
                            reason: `Document is not loaded.: ${t}`,
                            operation: e
                        }
                    }
                }
                return fn.errorAndBroadcast(1, t, T, Le, `Content or placement not found: ${"object"==typeof e?JSON.stringify(e):e}`, void 0, e), {
                    success: !1,
                    reason: "unable to find content / placement.",
                    operation: e
                }
            }
            static handleReplaceOp(e, t, n) {
                const r = Oi.baseLogTag + ".handleReplaceOp";
                if (e.content) {
                    const i = t.querySelector(e.selector),
                        o = Pr(e.content);
                    if (i && o) {
                        bi(o, e.type), e.dataMoeId && pi(o, e.dataMoeId);
                        const t = this.handleInlineEventHandlers(o, n);
                        return wi(i, o), t && Rr(t), {
                            success: !0
                        }
                    }
                    return fn.errorAndBroadcast(1, r, T, "Query selector or content not found", `Issue in web personalization. Invalid query selector or content provided: ${"object"==typeof e?JSON.stringify(e):e}`, void 0, e), {
                        success: !1,
                        reason: "invalid " + (i ? "content" : "query selector"),
                        operation: e
                    }
                }
                return fn.errorAndBroadcast(1, r, T, Ne, Ce("object" == typeof e ? JSON.stringify(e) : e), void 0, e), {
                    success: !1,
                    reason: "unable to find content.",
                    operation: e
                }
            }
            static handleUpdateOp(e, t) {
                const n = Oi.baseLogTag + ".handleUpdateOp";
                if (e.content) {
                    const r = t.querySelector(e.selector);
                    return r ? (e.dataMoeId && pi(r, e.dataMoeId), function(e, t) {
                        const n = e.ownerDocument.createElement("div");
                        n.innerHTML = t, Ti(Ii(e, n), e)
                    }(r, e.content), bi(r, e.type), {
                        success: !0
                    }) : (fn.errorAndBroadcast(1, n, T, xe, ke("object" == typeof e ? JSON.stringify(e) : e), void 0, e), {
                        success: !1,
                        reason: "unable to find selector / content / placement.",
                        operation: e
                    })
                }
                return fn.errorAndBroadcast(1, n, T, Ne, Ce("object" == typeof e ? JSON.stringify(e) : e), void 0, e), {
                    success: !1,
                    reason: "unable to find content.",
                    operation: e
                }
            }
            static handleUpdateHTMLOp(e, t, n) {
                const r = Oi.baseLogTag + ".handleUpdateHTMLOp";
                if (e.content) {
                    const i = t.querySelector(e.selector);
                    if (i) {
                        const r = Pr(e.content);
                        e.tab_info && (bi(r, e.type), function(e, t) {
                            const n = t.getElementById(e.tab_id);
                            n && n.classList.remove("moe-hide-tab")
                        }(e.tab_info, t)), e.dataMoeId && pi(i, e.dataMoeId);
                        const o = this.handleInlineEventHandlers(r, n);
                        return wi(i, r), o && Rr(o), {
                            success: !0
                        }
                    }
                    return fn.errorAndBroadcast(1, r, T, xe, ke("object" == typeof e ? JSON.stringify(e) : e), void 0, e), {
                        success: !1,
                        reason: "unable to find selector / content / placement.",
                        operation: e
                    }
                }
                return fn.errorAndBroadcast(1, r, T, Ne, Ce("object" == typeof e ? JSON.stringify(e) : e), void 0, e), {
                    success: !1,
                    reason: "unable to find content.",
                    operation: e
                }
            }
            static handleDeleteOp(e, t) {
                const n = Oi.baseLogTag + ".handleDeleteOp",
                    r = t.querySelector(e.selector);
                return r ? (r.remove(), {
                    success: !0
                }) : (fn.errorAndBroadcast(1, n, T, xe, ke("object" == typeof e ? JSON.stringify(e) : e), void 0, e), {
                    success: !1,
                    reason: "invalid query selector.",
                    operation: e
                })
            }
            static handleHideOp(e, t) {
                const n = Oi.baseLogTag + ".handleHideOp",
                    r = t.querySelector(e.selector);
                return r && r.style ? (r.style.display = "none", bi(r, e.type), {
                    success: !0
                }) : (fn.errorAndBroadcast(1, n, T, xe, ke("object" == typeof e ? JSON.stringify(e) : e), void 0, e), {
                    success: !1,
                    reason: "invalid query selector",
                    operation: e
                })
            }
            static handleAttributeOp(e, t, n) {
                const r = Oi.baseLogTag + ".handleAttributeOp";
                if (e.attributes) {
                    const i = t.querySelector(e.selector);
                    if (i) {
                        const t = /^on[a-z]/i,
                            r = /!\s*important\s*$/i,
                            o = document.createElement("div");
                        let a = !1;
                        if (Object.keys(e.attributes).forEach(n => {
                                if ("style" === n) {
                                    const t = e.attributes[n] || {};
                                    Object.keys(t).forEach(e => {
                                        const n = String(t[e]),
                                            o = r.test(n);
                                        i.style.setProperty(e, o ? n.replace(r, "").trim() : n, o ? "important" : "")
                                    })
                                } else(null == Ai ? void 0 : Ai.NONCE_VALUE) && t.test(n) ? (o.setAttribute(n, e.attributes[n]), a = !0) : i.setAttribute(n, e.attributes[n])
                            }), a) {
                            const e = this.handleInlineEventHandlers(o, n);
                            if (e) {
                                const t = o.getAttribute("data-moe-handler-id");
                                t && i.setAttribute("data-moe-handler-id", t), Rr(e)
                            }
                        }
                        return e.dataMoeId && pi(i, e.dataMoeId), bi(i, e.type), {
                            success: !0
                        }
                    }
                    return fn.errorAndBroadcast(1, r, T, "Unable to find selector or attributes", `Issue in web personalization. Invalid query selector or attributes provided: ${"object"==typeof e?JSON.stringify(e):e}`, void 0, e), {
                        success: !1,
                        reason: i ? "unable to find attributes." : "invalid query selector",
                        operation: e
                    }
                }
                return fn.errorAndBroadcast(1, r, T, "Unable to find attributes", `Attributes not found: ${"object"==typeof e?JSON.stringify(e):e}`, void 0, e), {
                    success: !1,
                    reason: "unable to find attributes.",
                    operation: e
                }
            }
            static handleTrackingOp(e, t, n, r) {
                const i = Oi.baseLogTag + ".handleTrackingOp",
                    o = Array.from(t.querySelectorAll(null == e ? void 0 : e.selector)),
                    a = o[0];
                if (e.id && r) {
                    if (a && e.id) {
                        function s(t, r) {
                            var i, o, a;
                            const s = t._moeListeners || [];
                            for (const t of s)
                                if (t.fn === r && (null === (i = t.operation) || void 0 === i ? void 0 : i.id) === e.id && (null === (o = t.operation) || void 0 === o ? void 0 : o.selector) === e.selector && (null === (a = t.context) || void 0 === a ? void 0 : a.cid) === (null == n ? void 0 : n.cid)) return;
                            const c = t => {
                                r(t, e, n)
                            };
                            t.addEventListener("click", c), t._moeListeners = s.concat({
                                fn: r,
                                operation: e,
                                context: n,
                                clickHandler: c
                            })
                        }
                        return o.forEach(t => {
                            s(t, this.eventTracking), bi(t, e.type)
                        }), {
                            success: !0
                        }
                    }
                    return fn.errorAndBroadcast(1, i, T, "Unable to find selector or ID", `Issue in web personalization. Invalid query selector or ID provided: ${"object"==typeof e?JSON.stringify(e):e}`, void 0, e), {
                        success: !1,
                        reason: a ? "unable to track ID." : "invalid query selector",
                        operation: e
                    }
                }
                return e.id && bi(a, null == e ? void 0 : e.type), fn.warnAndBroadcast(2, i, T, "Unable to find ID", `ID not found or it is not a Live Experience: ${"object"==typeof e?JSON.stringify(e):e}`, void 0, e), {
                    success: !1,
                    reason: "unable to find ID or it is not a Live Experience.",
                    operation: e
                }
            }
            static eventTracking(e, t, n) {
                const r = e.target.dataset.widgetId,
                    i = e.target.dataset.tabContainerId,
                    o = Object.assign({
                        b_id: t.id
                    }, n);
                t.widgetId && (o.widget_id = t.widgetId), i ? o.moe_widget_id = i : r && (o.moe_widget_id = r), Wr().trackEvent(ue, o)
            }
            static handleReArrangeOp(e, t) {
                const n = Oi.baseLogTag + ".handleReArrangeOp",
                    r = e.selector && t.querySelector(e.selector);
                if (e.orderList && r) {
                    const t = Array.from(r.children);
                    if (t.length === e.orderList.length && t.every((t, n) => t.getAttribute(he) === e.orderList[n].toString())) return {
                        success: !0
                    };
                    const n = e.orderList.map(e => (r.children[e].setAttribute(he, e.toString()), r.children[e]));
                    return r.innerHTML = "", n.forEach(e => {
                        r.appendChild(e)
                    }), e.dataMoeId && pi(r, e.dataMoeId), bi(r, null == e ? void 0 : e.type), {
                        success: !0
                    }
                }
                return fn.errorAndBroadcast(1, n, T, "Unable to find selector / new order list", `Issue in web personalization. Invalid query selector or new order list provided: ${"object"==typeof e?JSON.stringify(e):e}`, void 0, e), {
                    success: !1,
                    reason: "unable to find selector / new order list.",
                    operation: e
                }
            }
        }
        Oi.baseLogTag = "DomManipulator";
        const Di = Oi;
        class ki {
            constructor() {
                const e = ei();
                this.appId = e.APP_ID, this.host = e.HOST, this.customProxyDomain = e.CUSTOM_PROXY_DOMAIN, this.deviceType = function() {
                    const e = navigator.userAgent.toLowerCase();
                    return function(e) {
                        return !!/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(e)
                    }(e) ? "tablet" : function() {
                        const e = navigator.userAgent;
                        return !(!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e) && !/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4)))
                    }() ? "mweb" : e.includes("mac") && navigator.maxTouchPoints > 1 ? "tablet" : "web"
                }()
            }
            getLiveExperiences() {
                return t(this, arguments, void 0, function*(e = !1) {
                    const n = Yn(),
                        r = {};
                    return !e && n && (r.page_attributes = n), new Yt.VR((n, i) => t(this, void 0, void 0, function*() {
                        this.makeAPICall(W, {
                            all_exp: e
                        }, r, !0).then(r => {
                            var i;
                            n(new Sn(r)), r.personalization_used.dpm || e && (i = new Date, t(void 0, void 0, void 0, function*() {
                                var e;
                                return yield null === (e = bn.metaStore) || void 0 === e ? void 0 : e.setItem(_e.LAST_FETCHED_TIME, i)
                            }))
                        }).catch(e => {
                            i(e)
                        })
                    }))
                })
            }
            getTestExperiences() {
                return t(this, void 0, void 0, function*() {
                    return new Yt.VR((e, n) => t(this, void 0, void 0, function*() {
                        e(this.makeAPICall("v1/experiences/web/test"))
                    }))
                })
            }
            sendStats(e) {
                return t(this, void 0, void 0, function*() {
                    return new Yt.VR((n, r) => t(this, void 0, void 0, function*() {
                        n(this.makeAPICall(V, void 0, e, !1))
                    }))
                })
            }
            getWebActions() {
                return t(this, void 0, void 0, function*() {
                    return new Yt.VR((e, n) => t(this, void 0, void 0, function*() {
                        e(this.makeAPICall("v1/experiences/web/actions"))
                    }))
                })
            }
            getLiveRecommendations(e) {
                return t(this, void 0, void 0, function*() {
                    return e.platform = this.deviceType, new Yt.VR((n, r) => t(this, void 0, void 0, function*() {
                        n(this.makeAPICall(H, e))
                    }))
                })
            }
            isSplitUrlExperience() {
                return t(this, void 0, void 0, function*() {
                    return new Yt.VR((e, n) => t(this, void 0, void 0, function*() {
                        const t = new Date;
                        var n;
                        e(this.makeAPICall(K, {}, {
                            user_time: (n = t.getTime(), Math.floor((null != n ? n : Date.now()) / 1e3)),
                            user_tz_offset: 60 * t.getTimezoneOffset()
                        }))
                    }))
                })
            }
            getTabData(e, n) {
                return t(this, void 0, void 0, function*() {
                    return new Yt.VR((r, i) => t(this, void 0, void 0, function*() {
                        r(this.makeAPICall(F, {}, {
                            experience_id: e,
                            tab_id: n
                        }))
                    }))
                })
            }
            fetchExperiences(e, n) {
                return t(this, void 0, void 0, function*() {
                    return new Yt.VR((r, i) => t(this, void 0, void 0, function*() {
                        r(this.makeAPICall(z, {}, Object.assign({
                            experience_key: e
                        }, n)))
                    }))
                })
            }
            getSimulateDecisionPolicy() {
                return t(this, arguments, void 0, function*(e = [], n = {}) {
                    const r = Array.isArray(e) ? e : [e];
                    return new Yt.VR((e, i) => t(this, void 0, void 0, function*() {
                        this.makeAPICall(q, {}, Object.assign({
                            experience_key: r
                        }, n)).then(t => {
                            e(t.data)
                        }).catch(e => {
                            i(e)
                        })
                    }))
                })
            }
            makeAPICall(e, t, n, r) {
                const i = ki.baseLogTag + ".makeAPICall";
                return new Yt.VR((o, a) => {
                    const s = function() {
                            const e = new Date;
                            return {
                                day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][e.getDay()],
                                hours: String(e.getHours()).padStart(2, "0")
                            }
                        }(),
                        c = function() {
                            const e = {};
                            try {
                                const t = en.get(R.IDENTITY_MAP),
                                    n = ii();
                                ! function() {
                                    var e;
                                    const t = en.get(R.USER_DATA);
                                    t && (null === (e = Me(t)) || void 0 === e || e.toString())
                                }(), t && (t.userIdentities && (e.user_identifiers = t.userIdentities), t.previousIdentities && (e.previous_user_identifiers = t.previousIdentities)), n && (e.unique_id = n)
                            } catch (e) {
                                fn.error(2, "Web Personalisationutils.getUserIdentifier", "Error fetching user identifier :", e)
                            }
                            return e
                        }();
                    let l;
                    l = "" !== window.location.search ? ti(window.location.search) : ti(window.location.hash);
                    const d = window.location.href.split("?")[0],
                        u = Object.assign(Object.assign(Object.assign({}, l), {
                            app_id: this.appId,
                            sdk_ver: "2.81.01",
                            platform: ni(e, this.deviceType),
                            payload_id: l.payload_id,
                            USER_TYPE: (Ie(en.get(R.SESSION), "numberOfSessions") || 0) > 1 ? "Returning" : "New",
                            DAY_OF_THE_WEEK: s.day,
                            TIME_OF_THE_DAY: s.hours,
                            current_url: t ? d : void 0,
                            unique_id: c.unique_id
                        }), t),
                        p = {
                            headers: {},
                            postData: n,
                            queryParams: {}
                        };
                    [W, H, K, F, z, q].includes(e) ? (delete u.unique_id, p.postData = Object.assign(Object.assign(Object.assign({}, p.postData), u), {
                        identifiers: c
                    })) : p.queryParams = u;
                    try {
                        if (p.postData) p.headers = {
                            "MOE-APPKEY": this.appId,
                            "Content-Type": "application/json"
                        }, vn.post(hi(`${this.host}${e}`, this.customProxyDomain), p).then(e => {
                            const t = JSON.parse(e.responseText);
                            o(t)
                        }).catch(e => {
                            fn.error(1, i, "Error in POST request: ", e), a(e)
                        });
                        else {
                            const t = (new Date).getTime();
                            vn.get(hi(`${this.host}${e}`, this.customProxyDomain), p).then(e => {
                                const n = JSON.parse(e.responseText),
                                    i = (new Date).getTime();
                                r && (ri("api_start_time", t), ri("api_end_time", i)), o(n)
                            }).catch(e => {
                                fn.error(1, i, "Error in GET request: ", e), a(e)
                            })
                        }
                    } catch (e) {
                        if (fn.error(1, i, "Error getting WebP Test Expressions: ", e), !n) {
                            const e = (new Date).getTime();
                            r && ri("api_request_failed_time", e)
                        }
                        a("Error getting WebP Expressions")
                    }
                })
            }
        }
        ki.baseLogTag = "WebPApi";
        const xi = ki;
        class Ni {
            static listenToDomChanges(e, t, n, r, i) {
                const o = i ? document : document.querySelector(e.selector),
                    a = document.location.href,
                    s = i ? "" : `${e.type}_${e.selector}_${e.id||""}`;
                if (s) {
                    const e = Ni.selectorObservers.get(s);
                    if (e) {
                        if (e.element === o) return;
                        e.observer.disconnect(), Ni.observers = Ni.observers.filter(t => t !== e.observer), Ni.selectorObservers.delete(s)
                    }
                }
                const c = ai(Ni.retryFailedExperiences.bind(this, i), 500),
                    l = ai(function(e) {
                        u.disconnect()
                    }, 500),
                    d = ai(this.reApplyRevertedChanges.bind(this), 500),
                    u = new Yt.Dg(o => {
                        let s = !0;
                        const u = a !== document.location.href;
                        if (o.forEach(e => {
                                var t, n;
                                "childList" === e.type && (null === (t = e.removedNodes[0]) || void 0 === t ? void 0 : t.nodeValue) === (null === (n = e.addedNodes[0]) || void 0 === n ? void 0 : n.nodeValue) && (s = !1)
                            }), s)
                            if (i) {
                                const e = Xi.failedOperations.length,
                                    t = Object.keys(Xi.moeOperationsWithDataID).length;
                                e > 0 ? c() : (Ni.observerCounter > 20 && t < 1 && e < 1 || u) && l(), t > 0 && d()
                            } else u || this.selectorObserver(e, t, r, n)
                    });
                this.observers.push(u), s && o && Ni.selectorObservers.set(s, {
                    observer: u,
                    element: o
                }), o && u.observe(o, {
                    childList: !0,
                    subtree: !0,
                    attributes: !1,
                    characterData: !0
                })
            }
            static selectorObserver(e, t, n, r) {
                const i = null == t ? void 0 : t.cid.split("_")[0];
                Di.initiate(e, t, r, n).success && (i && !Xi.appliedExperiences.hasOwnProperty(i) && (Xi.appliedExperiences[i] = !0), Ni.listenToDomChanges(e, t, r, n))
            }
            static retryFailedExperiences(e) {
                e(), Ni.observerCounter++
            }
            static reApplyRevertedChanges() {
                const e = Xi.moeOperationsWithDataID;
                Object.keys(e).forEach(t => {
                    const n = e[t];
                    fi(document, t) || n.forEach(e => {
                        Di.initiate(e, void 0, document, !0)
                    })
                }), Ni.observerCounter++
            }
            static disconnectObservers() {
                this.observers && this.observers.length > 0 && (this.observers.forEach(e => {
                    e.disconnect()
                }), this.observers = []), Ni.selectorObservers.clear()
            }
        }
        Ni.baseLogTag = "Webp.Listener", Ni.observerCounter = 1, Ni.observers = [], Ni.selectorObservers = new Map;
        const Li = Ni;
        class Ci {
            static trackInsertOperation(e, t, n, r, i) {
                if (e.type !== G) return void fn.error(1, Ci.baseLogTag + ".trackInsertOperation", "Invalid operation type for tracking:", e.type);
                const o = (null == n ? void 0 : n.cid) || "unknown",
                    a = {
                        operation: e,
                        context: n,
                        insertedElement: t,
                        placement: r || "after",
                        targetSelector: i || e.selector || ""
                    },
                    s = Ci.trackedOperations.get(o) || [],
                    c = e.dataMoeId ? s.findIndex(t => t.operation.dataMoeId === e.dataMoeId) : -1;
                c > -1 ? s[c] = a : s.push(a), Ci.trackedOperations.set(o, s)
            }
            static cleanupAllOperations() {
                const e = Ci.baseLogTag + ".cleanupAllOperations";
                if (0 === Ci.trackedOperations.size) return;
                let t = 0;
                Ci.trackedOperations.forEach((n, r) => {
                    n.forEach(n => {
                        try {
                            Ci.cleanupOperation(n), t++
                        } catch (t) {
                            fn.error(2, e, `Error cleaning up operation for experience ${r}:`, t)
                        }
                    })
                }), Ci.trackedOperations.clear(), fn.log(2, e, `Cleaned up ${t} tracked operations`)
            }
            static cleanupOperation(e) {
                const t = Ci.baseLogTag + ".cleanupOperation";
                e.operation.type === G ? Ci.cleanupInsertOperation(e) : fn.log(2, t, `Cleanup not implemented for operation type: ${e.operation.type}`)
            }
            static cleanupInsertOperation(e) {
                const t = Ci.baseLogTag + ".cleanupInsertOperation";
                try {
                    e.insertedElement && e.insertedElement.parentNode && e.insertedElement.remove()
                } catch (e) {
                    fn.error(2, t, "Error removing inserted element:", e)
                }
            }
            static getTrackedOperationsCount() {
                let e = 0;
                return Ci.trackedOperations.forEach(t => {
                    e += t.length
                }), e
            }
        }
        Ci.baseLogTag = "ExperienceCleanupManager", Ci.trackedOperations = new Map;
        const Mi = Ci;
        class Ri {
            constructor(e) {
                this.events = {}, this.listener = null, this.historyManager = window[D], this.onEvent = e => {
                    const t = Ri.baseLogTag + ".onEvent";
                    try {
                        this.events[e.name] && this.events[e.name].forEach(t => {
                            const n = this.getAttributeValue(e.attributes, t);
                            n && this.trigger(n)
                        })
                    } catch (e) {
                        fn.error(2, t, "Error occurred during check event trigger experiences: ", e)
                    }
                }, this.events = e
            }
            onTrigger(e) {
                this.listener = e
            }
            startWatching() {
                return t(this, void 0, void 0, function*() {
                    this.historyManager ? (fn.log(2, Ri.baseLogTag + ".startWatching", "Initialized event Trigger Watcher for AI experiences"), this.historyManager.getHistory().forEach(this.onEvent), this.historyManager.addEventListener(this.onEvent)) : Ri.startWatchingRetries <= 5 && (0, Yt.pS)(() => {
                        Ri.startWatchingRetries++, this.historyManager = window[D], this.startWatching()
                    }, 2e3 * Ri.startWatchingRetries)
                })
            }
            trigger(e) {
                null != this.listener && this.listener(e)
            }
            getAttributeValue(e, t) {
                let n = null;
                for (const r of e)
                    if (r.key === t) {
                        n = r.value;
                        break
                    }
                return n
            }
        }
        Ri.baseLogTag = "experienceTriggerManager", Ri.startWatchingRetries = 1;
        const Pi = Ri,
            Ui = e => t(void 0, void 0, void 0, function*() {
                yield bn.aiExperiencesStore.setItem(Ee.AI_EXPERIENCE_CONTEXT, e)
            });
        class Bi {
            constructor() {
                this.setExperienceTriggerManager = () => t(this, void 0, void 0, function*() {
                    const e = yield this.getWebActionEvents(), t = new Pi(e);
                    t.onTrigger(this.renderAiExperiences.bind(this)), t.startWatching()
                }), this.getWebActionEvents = () => t(this, void 0, void 0, function*() {
                    const e = Bi.LogTag + ".getWebActionEvents";
                    let n;
                    var r, i;
                    return Br(yield t(void 0, void 0, void 0, function*() {
                        return yield bn.aiExperiencesStore.getItem(Ee.WEB_ACTIONS_LAST_FETCHED_TIME)
                    }), 1440) ? (fn.log(2, e, "synchronizing Web Actions Events data for Real Time Recommendations as time limit exceeded"), n = yield this.WebPApis.getWebActions(), i = n, t(void 0, void 0, void 0, function*() {
                        yield bn.aiExperiencesStore.setItem(Ee.WEB_ACTION_EVENTS, i)
                    }), r = new Date, t(void 0, void 0, void 0, function*() {
                        return yield bn.aiExperiencesStore.setItem(Ee.WEB_ACTIONS_LAST_FETCHED_TIME, r)
                    })) : (n = yield t(void 0, void 0, void 0, function*() {
                        return yield bn.aiExperiencesStore.getItem(Ee.WEB_ACTION_EVENTS)
                    }), fn.log(2, e, "Using the cached Web Actions Events data for Real Time Recommendations")), n
                }), this.WebPApis = new xi
            }
            renderAiExperiences(e) {
                return t(this, void 0, void 0, function*() {
                    const n = Bi.LogTag + ".renderAiExperiences",
                        r = {
                            experience_context: (yield t(void 0, void 0, void 0, function*() {
                                return yield bn.aiExperiencesStore.getItem(Ee.AI_EXPERIENCE_CONTEXT)
                            })) || {},
                            product_id: null == e ? void 0 : e.toString()
                        };
                    return this.WebPApis.getLiveRecommendations(r).then(e => (Object.keys(e).forEach(t => {
                        var n;
                        di(t, null === (n = e[t]) || void 0 === n ? void 0 : n.data)
                    }), !0)).catch(e => {
                        fn.errorAndBroadcast(2, n, I, "AI Live Recommendations experiences failed", `Error in web personalization AI Live Recommendations experiences: ${"string"==typeof e?e:JSON.stringify(e)}`, void 0, e)
                    })
                })
            }
        }
        Bi.LogTag = "AI Experiences";
        const ji = Bi;
        class Wi {
            static listenToDomChanges() {
                if (!document.getElementById("moe-flicker-style")) return void fn.log(2, Wi.baseLogTag, "Anti Flicker Script not available");
                const e = ai(function() {
                        Wi.observerCounter > 10 ? t.disconnect() : (Wi.observerCounter += 1, Wi.removeOverLay())
                    }, 200),
                    t = new Yt.Dg(t => {
                        let n = !0;
                        t.forEach(e => {
                            var t, r;
                            "childList" === e.type && (null === (t = e.removedNodes[0]) || void 0 === t ? void 0 : t.nodeValue) === (null === (r = e.addedNodes[0]) || void 0 === r ? void 0 : r.nodeValue) && (n = !1)
                        }), n && e()
                    });
                document && t.observe(document, {
                    childList: !0,
                    subtree: !0,
                    attributes: !1,
                    characterData: !0
                })
            }
            static removeOverLay() {
                const e = Wi.baseLogTag + ".removeOverLay",
                    t = document.querySelectorAll(`.${le}`);
                t.length > 0 && (t.forEach(e => {
                    e.classList.add("moe-anti-flicker-show"), e.classList.remove(le)
                }), fn.log(2, e, "Removed WebP anti-flicker styles from elements:", t)), document.documentElement.className.includes(de) && document.documentElement.classList.remove(de)
            }
        }
        Wi.baseLogTag = "Webp.AntiFlickerListener", Wi.observerCounter = 1;
        const Vi = Wi;

        function Hi(e, t) {
            if (null == e || null == t) return e === t;
            if (e instanceof Function) return e === t;
            if (e instanceof RegExp) return e === t;
            if (e === t || e.valueOf() === t.valueOf()) return !0;
            if (Array.isArray(e) && e.length !== t.length) return !1;
            if (e instanceof Date) return !1;
            if (!(e instanceof Object)) return !1;
            if (!(t instanceof Object)) return !1;
            const n = Object.keys(e);
            return Object.keys(t).every(e => -1 !== n.indexOf(e)) && n.every(n => Hi(e[n], t[n]))
        }
        const Ki = (e, n) => t(void 0, void 0, void 0, function*() {
                return bn.selfHandledExperiences.setItem(e, n)
            }),
            Fi = e => t(void 0, void 0, void 0, function*() {
                if (e) return bn.selfHandledExperiences.getItem(e);
                const t = {};
                return yield bn.selfHandledExperiences.iterate((e, n) => {
                    t[n] = e
                }), t
            }),
            zi = (e, t) => Hi(null == e ? {} : e, null == t ? {} : t),
            qi = (e, ...n) => t(void 0, [e, ...n], void 0, function*(e, n = {}) {
                if (!jr()) return {
                    syncRequired: !0
                };
                const r = yield t(void 0, void 0, void 0, function*() {
                    return bn.metaStore.getItem(Se.SELF_HANDLE_LAST_FETCHED_TIME)
                });
                if (!r || Br(r, 5)) return {
                    syncRequired: !0
                };
                const i = yield t(void 0, void 0, void 0, function*() {
                    return bn.metaStore.getItem(Se.SELF_HANDLE_CUSTOM_ATTRIBUTES)
                });
                if (!zi(n, i)) return {
                    syncRequired: !0
                };
                const o = yield function(e) {
                    return t(this, void 0, void 0, function*() {
                        if (e && e.length > 0) {
                            const t = {};
                            for (const n of e) {
                                const e = yield Fi(n);
                                if (!e) return !1;
                                t[n] = e
                            }
                            return t
                        }
                        return (yield Fi()) || {}
                    })
                }(e);
                return o ? {
                    syncRequired: !1,
                    experiences: o
                } : {
                    syncRequired: !0
                }
            });
        var Gi, $i = n(634).VR;
        (() => {
            var e, t;
            window.__moe = window.__moe || {}, window.__moe.versions = window.__moe.versions || {}, window.__moe.scriptUrls = window.__moe.scriptUrls || {}, window.__moe.versions.webp = "2.81.01", window.__moe.scriptUrls.webp = null !== (t = null === (e = document.currentScript) || void 0 === e ? void 0 : e.src) && void 0 !== t ? t : null
        })();
        const Yi = ei();
        class Ji {
            constructor() {
                this.statsData = {}, this.retryExperienceCount = 0, this.experienceMode = ae, this.trackingDelayCounter = 1;
                const e = Ji.baseLogTag + ".constructor";
                if (fn.setLogTabStyle(re), new RegExp(["bot", "spider", "crawler", "crawling", "Applebot", "PetalBot", "pingbot", "proximic", "AdsBot-Google", "Googlebot", "Cincraw", "SnapchatBot", "Snapchat-Proxy/1.0", "SnapchatAds", "Snapchat-Ads/1.0", "YandexRenderResourcesBot", "bingbot", "slurp", "MicrosoftPreview", "Baiduspider"].join("|"), "i").test(navigator.userAgent)) fn.error(1, e, "Bot detected, Can't initialise the MoEngage WebP SDK");
                else {
                    if (Yi.APP_ID && Yi.HOST) {
                        if (ui(Yi.DISABLE_WEBP)) {
                            window.addEventListener(c, e => {
                                var t;
                                (null === (t = null == e ? void 0 : e.detail) || void 0 === t ? void 0 : t.name) === d && window.MoeWebP.disableWebPersonalization()
                            }), this.deviceUuid = ii(), this.AiExperiences = new ji;
                            const t = (new Date).getTime();
                            this.isLiveExperience = !1, this.isSentryEnabled() && ("1" === Vr().moeWpT ? (this.experienceMode = "test", Ji.WebPApis.getTestExperiences().then(e => {
                                this.DomManipulator(e.payload)
                            }), Vi.removeOverLay()) : Hr() ? (this.experienceMode = "editor", this.getEditorVersion().then(t => {
                                t === ce ? (this.injectEditorFile("https://app-cdn.moengage.com/personalization-ui/editor/moe-web-editor.staging.js"), fn.log(2, e, "Web P module initialized in staging editor mode. Version not found, loading default staging editor.")) : (this.injectEditorFile((e => `https://app-cdn.moengage.com/personalization-ui/editor/moe-web-editor.${e}.js`)(t)), fn.log(2, e, "Web P module initialized in editor mode."))
                            }), Vi.removeOverLay()) : Kr() ? (this.experienceMode = ae, this.boundIdentityUpdateHandler = this.identityUpdateHandler.bind(this), this.statsData.webP_initialization_time = t, this.getLiveExperiences(), this.handleLogoutListener(), this.handleSPA(), this.handleIdentityChange()) : ((() => {
                                const e = document.createElement("style");
                                e.id = "moe-personalized-experience-css", e.innerHTML = "\n    .moe-show-personalized-experience {\n      outline-offset: -3px;\n      outline: 3px dashed #06A6B7;\n      border: 3px dashed #06A6B7;\n    }\n    .tooltip {\n      visibility: hidden;\n      opacity: 0;\n      transition: opacity 0.2s, visibility 0.2s;\n      color: #fff;\n      border: 1px solid #06A6B7;\n      border-radius: 3px;\n      background-color: #06A6B7;\n      padding: 4px;\n      font-size: 12px;\n      white-space: nowrap;\n      position: fixed;\n      z-index: 1000;\n      pointer-events: none; /* Ensures the tooltip doesn't interfere with mouse events */\n    }\n    .tooltip.visible {\n      visibility: visible;\n      opacity: 1;\n    }\n    ", document.head.appendChild(e)
                            })(), yi()))
                        }
                    } else fn.errorAndBroadcast(2, e, T, "Web personalization is not properly integrated", "Web personalization is not properly integrated. Please refer the web personalization documentation.", A.WEB_PERSONALIZATION);
                    (() => {
                        var e;
                        (null === (e = window.Moengage) || void 0 === e ? void 0 : e.personalize) ? nn.broadcastToWindow({
                            topic: c,
                            name: u
                        }): window.addEventListener(c, e => {
                            var t;
                            (null === (t = null == e ? void 0 : e.detail) || void 0 === t ? void 0 : t.name) === l && nn.broadcastToWindow({
                                topic: c,
                                name: u
                            })
                        })
                    })()
                }
            }
            resetPageState() {
                Mi.cleanupAllOperations(), mi.reset(), Ji.appliedExperiences = {}, Ji.failedOperations = [], Ji.moeOperationsWithDataID = {}, Ji.isAnyOperationSuccessful = !1, this.completeDomManipulationTimer && ((0, Yt.Kj)(this.completeDomManipulationTimer), this.completeDomManipulationTimer = null), this.isDomMutationObserverAdded && (Li.disconnectObservers(), this.isDomMutationObserverAdded = !1), this.retryExperienceCount = 0, this.trackingDelayCounter = 1, this.domManipulatorStartTime = 0, this.isLiveExperience = !1, this.experienceMode = ae
            }
            getLiveExperiences() {
                return t(this, void 0, void 0, function*() {
                    const e = Ji.baseLogTag + ".getLiveExperiences";
                    yield bn.initialize(), this.syncExperiences().then(n => t(this, void 0, void 0, function*() {
                        if (n && n.experiences && n.experiences.length) {
                            const i = yield(r = n.experiences, t(void 0, void 0, void 0, function*() {
                                var e;
                                const n = ci(window.location.href),
                                    i = [],
                                    o = r.map(e => t(void 0, void 0, void 0, function*() {
                                        const t = ci(new URL(e.url).href);
                                        if (null == e ? void 0 : e.page_attributes) {
                                            if (yield Cr(e)) return e
                                        } else if (e.url_filters) {
                                            if (function(e) {
                                                    const t = (e => Ie(e, "url_filters.filters", []))(e);
                                                    let n = !0;
                                                    if (t && t.length > 0) {
                                                        const r = new yn("MOE_PAGE_VIEWED", []),
                                                            i = e.url_filters.filter_operator,
                                                            o = t.map(e => gr.doesEventMatchFilters(r, e));
                                                        n = o[0];
                                                        for (let e = 0; e < o.length; e++)
                                                            if (i === In) {
                                                                if (n = n && o[e], !1 === n) break
                                                            } else if (i === wn && (n = n || o[e], !0 === n)) break
                                                    }
                                                    return n
                                                }(e)) return e;
                                            i.push(e.id)
                                        } else {
                                            if (t === n) return e;
                                            i.push(e.id)
                                        }
                                    })),
                                    a = (yield Mr.all(o)).filter(e => null == e ? void 0 : e.id);
                                i.length > 0 && (ri("current_url", n), ri("url_failed_experiences", i));
                                let s = !1;
                                const c = [];
                                for (const t of a)(null === (e = null == t ? void 0 : t.in_session_behaviour_segment) || void 0 === e ? void 0 : e.included_filters) ? (yield kr(t)) && (c.push(t), s = s || si(t)) : (c.push(t), s = s || si(t));
                                return s && window.MoeWebP.clearLastFetchedTime(), c
                            }));
                            if (i && i.length > 0) {
                                const t = Fr(i);
                                Ji.allOperations = t.allOp, Ji.experiences = t.experiences, Ui(t.aiExperienceContext), t.aiExperienceContext && Object.keys(t.aiExperienceContext).length > 0 && this.AiExperiences.setExperienceTriggerManager(), Ji.experiences && Ji.experiences.length && Ji.experiences[0].id && ri("ids", Ji.experiences.map(e => e.id)), fn.log(2, e, "Eligible Experiences found: ", Ji.experiences.length), Ji.experiences.forEach(e => {
                                    this.handleLiveExperience(e, n.user_in_gcg)
                                })
                            } else this.noExperienceFoundStats()
                        }
                        var r
                    })).catch(t => {
                        fn.errorAndBroadcast(1, e, I, "Could not fetch web personalization experiences", `Error in syncing experiences: ${"string"==typeof t?t:JSON.stringify(t)}`, void 0, t)
                    }).finally(() => {
                        Vi.listenToDomChanges()
                    })
                })
            }
            handleLiveExperience(e, n) {
                e && e.gcg_enabled && n ? (ri("in_gcg", {
                    experience: e.gcg_enabled,
                    user: n
                }), (() => {
                    t(this, void 0, void 0, function*() {
                        yield Ji.WebPApis.sendStats(Object.assign(Object.assign({}, e.context), {
                            gcg_event: !0
                        }))
                    })
                })()) : e ? e.payload.length ? e && this.handleDomManipulator(e) : (this.isLiveExperience = !0, e.is_ai || (Ji.appliedExperiences[e.id] = !0), this.handleDomManipulationComplete(e, [], !0)) : this.noExperienceFoundStats()
            }
            noExperienceFoundStats() {
                return t(this, void 0, void 0, function*() {
                    const e = Ji.baseLogTag + ".noExperienceFoundStats";
                    fn.log(2, e, "No eligible experience found");
                    try {
                        const e = yield Ji.WebPApis.sendStats(this.statsData);
                        (null == e ? void 0 : e.success) && (this.statsData = {})
                    } catch (t) {
                        fn.error(1, e, "Error sending stats:", t)
                    }
                })
            }
            syncExperiences() {
                return t(this, void 0, void 0, function*() {
                    const e = Ji.baseLogTag + ".syncExperiences";
                    return new Yt.VR((n, r) => t(this, void 0, void 0, function*() {
                        try {
                            const r = yield t(void 0, void 0, void 0, function*() {
                                var e;
                                return yield null === (e = bn.metaStore) || void 0 === e ? void 0 : e.getItem(_e.LAST_FETCHED_TIME)
                            }), i = yield bn.metaStore.getItem(Se.UNIQUE_ID), o = i && i !== this.deviceUuid;
                            if (o || Br(r) || !r) {
                                fn.log(2, e, o ? "Unique device id change detected. Will proceed to fetch latest experiences" : "synchronizing experiences as time limit exceeded"), Yi.ENABLE_SPLIT_URL && Ji.WebPApis.isSplitUrlExperience().then(e => {
                                    li(e)
                                }), yield Xr();
                                const r = yield Ji.WebPApis.getLiveExperiences();
                                Ir(r.experiences), r.experiences && (yield qr(r.experiences)), n(r), yield Ji.WebPApis.getLiveExperiences(!0).then(e => t(this, void 0, void 0, function*() {
                                    Qr(e && e.user_in_gcg), Ir(e.experiences), qr(e.experiences), Yr(e.split_experiences), this.deviceUuid && (yield bn.metaStore.setItem(Se.UNIQUE_ID, this.deviceUuid))
                                }))
                            } else {
                                Yi.ENABLE_SPLIT_URL && (yield function() {
                                    return t(this, void 0, void 0, function*() {
                                        const e = ci(window.location.href),
                                            n = yield(e => t(void 0, void 0, void 0, function*() {
                                                return yield bn.splitExperiences.getItem(e)
                                            }))(e);
                                        return !!(n && Ur(n.expiry_time + "Z") > new Date)
                                    })
                                }()) && Ji.WebPApis.isSplitUrlExperience().then(e => {
                                    li(e)
                                });
                                const r = yield Gr(), i = yield t(void 0, void 0, void 0, function*() {
                                    var e;
                                    return yield null === (e = bn.metaStore) || void 0 === e ? void 0 : e.getItem(_e.USER_IN_GCG)
                                });
                                n({
                                    experiences: r,
                                    user_in_gcg: i
                                }), fn.log(2, e, "Using the cached experiences for Web Personalisation")
                            }
                        } catch (e) {
                            r(e)
                        }
                    }))
                })
            }
            handleDomManipulator(e) {
                const t = Ji.baseLogTag + ".handleDomManipulator";
                this.isLiveExperience = !0, this.domManipulatorStartTime = (new Date).getTime();
                const {
                    context: n
                } = e;
                fn.log(2, t, (null == n ? void 0 : n.cid) ? `Rendering experience ID: ${n.cid}` : "Rendering experience"), mi.setUpdatableExperience(null == n ? void 0 : n.cid, !!e.is_ai);
                let r = [];
                !e.is_ai && Ji.allOperations ? Object.keys(Ji.allOperations).forEach(t => {
                    const n = Ji.allOperations[t];
                    n.expId === e.id && r.push(n)
                }) : r = e.payload, r.length && this.DomManipulator(r, e.id, document, n, !0), this.addOperationsRetryMechanism(e)
            }
            DomManipulator(e, t, n = document, r, i = !1) {
                const o = Ji.baseLogTag + ".DomManipulator";
                if (ui(Yi.DISABLE_WEBP) && (this.domManipulatorStartTime || (this.experienceMode === ae && (this.isLiveExperience = !0), this.domManipulatorStartTime = (new Date).getTime()), [...e.filter(e => ee.includes(e.type)), ...e.filter(e => !ee.includes(e.type))].forEach(e => {
                        try {
                            const i = Di.initiate(e, r, n, this.isLiveExperience);
                            i.success ? (e.dataMoeId ? this.saveMoeDataIdOperations(e) : te.includes(e.type) || Li.listenToDomChanges(e, r, n, this.isLiveExperience), e.type === G && i.insertedElement && Mi.trackInsertOperation(e, i.insertedElement, r, e.placement, e.selector), Ji.appliedExperiences.hasOwnProperty(t) || (Ji.appliedExperiences[t] = !0), Ji.isAnyOperationSuccessful || (Ji.isAnyOperationSuccessful = !0)) : Ji.failedOperations = Ji.failedOperations.concat([
                                [e, r, n, this.isLiveExperience]
                            ])
                        } catch (e) {
                            fn.error(1, o, "Error in Dom Manipulation", e)
                        }
                    }), !i)) {
                    const n = t || "";
                    this.addOperationsRetryMechanism({
                        id: n,
                        context: r || {
                            cid: n
                        },
                        payload: e
                    })
                }
            }
            retryFailedOperations(e) {
                const t = Ji.baseLogTag + ".startRetry",
                    n = Ji.failedOperations.concat([]);
                Ji.failedOperations = [];
                const r = this.handleRetry(n, e.id);
                this.retryExperienceCount++, 0 === Ji.failedOperations.length && (fn.log(2, t, "Total number of times retried applying webP changes: ", this.retryExperienceCount - 1), (0, Yt.Kj)(this.completeDomManipulationTimer), this.handleDomManipulationComplete(e, r)), Vi.removeOverLay()
            }
            handleRetry(e, t) {
                const n = [];
                for (; e.length > 0;) {
                    const r = e.pop(),
                        i = Di.initiate.apply(null, r);
                    i.success ? r[0].type !== Y && (r[0].dataMoeId ? this.saveMoeDataIdOperations(r[0]) : ne.includes(r[0].type) || Li.listenToDomChanges.apply(Li, r), r[0].type === G && i.insertedElement && Mi.trackInsertOperation(r[0], i.insertedElement, r[1], r[0].placement, r[0].selector), Ji.appliedExperiences.hasOwnProperty(t) || (Ji.appliedExperiences[t] = !0), Ji.isAnyOperationSuccessful || (Ji.isAnyOperationSuccessful = !0)) : (n.push(i), Ji.failedOperations = Ji.failedOperations.concat([r]))
                }
                return n
            }
            addOperationsRetryMechanism(e) {
                Ji.failedOperations.length ? (this.completeDomManipulationTimer = (0, Yt.pS)(() => {
                    this.retryFailedOperations(e)
                }, 3e3), Ji.isAnyOperationSuccessful && this.trackAppliedExperiences()) : this.handleDomManipulationComplete(e, [], !0), this.isDomMutationObserverAdded || (Li.listenToDomChanges(null, null, null, null, this.retryFailedOperations.bind(this, e)), this.isDomMutationObserverAdded = !0)
            }
            handleDomManipulationComplete(e, n, r) {
                const i = Ji.baseLogTag + ".handleDomManipulationComplete",
                    o = e.context,
                    a = (new Date).getTime();
                this.domManipulatorStartTime && fn.log(1, i, `Total DOM manipulation time: ${(a-this.domManipulatorStartTime)/1e3}s`), this.isLiveExperience && (n && n.length && ri("payload_failer", {
                    reason: "Experiences payload Failed to Execute",
                    campaign_id: null == o ? void 0 : o.cid,
                    data: n
                }), this.domManipulatorStartTime && (ri("dom_manipulator_start_time", this.domManipulatorStartTime), ri("dom_manipulator_end_time", a)), this.experienceMode === ae && ((() => {
                    t(this, void 0, void 0, function*() {
                        const e = yield Ji.WebPApis.sendStats(this.statsData);
                        (null == e ? void 0 : e.success) && (this.statsData = {})
                    })
                })(), (Ji.isAnyOperationSuccessful || r) && this.trackAppliedExperiences()))
            }
            getEditorVersion() {
                return t(this, void 0, void 0, function*() {
                    const e = Ji.baseLogTag + ".getEditorVersion";
                    return new Yt.VR((n, r) => t(this, void 0, void 0, function*() {
                        const t = ti(window.location.search);
                        if (function() {
                                const {
                                    HOST: e
                                } = ei();
                                return e && e.includes("moestaging")
                            }()) return t.webPStagingVersion && n(t.webPStagingVersion), void n(ce);
                        const i = yield vn.get(hi("https://app-cdn.moengage.com/personalization-ui/editor/version.json", Yi.CUSTOM_PROXY_DOMAIN));
                        if (200 === i.status) try {
                            const e = JSON.parse(i.responseText);
                            "1" === t.pre_prod && n(e.PRE_PROD), n(e[Yi.CLUSTER] || "")
                        } catch (t) {
                            fn.error(2, e, "Error in getting editor version file", t), r(t)
                        }
                        n("")
                    }))
                })
            }
            injectEditorFile(e) {
                return t(this, void 0, void 0, function*() {
                    return new Yt.VR((n, r) => t(this, void 0, void 0, function*() {
                        const t = document.createElement("script");
                        t.src = hi(e, Yi.CUSTOM_PROXY_DOMAIN), document.getElementsByTagName("head")[0].appendChild(t)
                    }))
                })
            }
            trackAppliedExperiences() {
                this.experienceMode === ae && ((0, Yt.pS)(() => Object.keys(Ji.appliedExperiences).map(e => t(this, void 0, void 0, function*() {
                    Ji.appliedExperiences[e] && (yield this.track(e))
                })), this.trackingDelayCounter), this.trackingDelayCounter++)
            }
            track(e) {
                return t(this, void 0, void 0, function*() {
                    var t;
                    const n = Ji.baseLogTag + ".track";
                    Ji.appliedExperiences[e] = !1;
                    let r = yield $r(e);
                    r || (r = null === (t = Ji.experiences) || void 0 === t ? void 0 : t.find(t => t.id === e)), r ? (this.eventTracking("MOE_WEBP_MESSAGE_SHOWN", r.id, r.context), r.tab_list && this.renderTabbedExperience(e, r.tab_list)) : fn.errorAndBroadcast(2, n, I, "Web personalization experience not found", `Experience not found: ${e}`)
                })
            }
            isSentryEnabled() {
                const e = Ji.baseLogTag + ".isSentryEnabled";
                try {
                    const e = JSON.parse(localStorage.getItem("MOE_DATA"));
                    return !(e && e.WEB_SETTINGS && e.WEB_SETTINGS.configs) || e.WEB_SETTINGS.configs.isWebPersonalizationModuleEnabled
                } catch (t) {
                    fn.error(1, e, "Error in getting sentry flag for webp: ", t)
                }
            }
            clearLastFetchedTime(e) {
                return t(this, void 0, void 0, function*() {
                    return e && (Ji.failedOperations = []), yield Zr()
                })
            }
            isEditorModeEnabled() {
                return Hr() || !Kr()
            }
            setLogLevel(e) {
                fn.setLogLevel(e, !1), fn.setLogTabStyle(re)
            }
            handleInSessionEvent(e) {
                return t(this, void 0, void 0, function*() {
                    (yield t(void 0, void 0, void 0, function*() {
                        return bn && bn.inSessionStore && (yield bn.inSessionStore.getItem(Te.IN_SESSION_EVENTS)) || []
                    })).includes(e.name) && (e => {
                        t(void 0, void 0, void 0, function*() {
                            const t = yield Dr();
                            t.unshift(e), t.length > 10 && t.pop(), bn.inSessionStore.setItem(Te.IN_SESSION_EVENTS_HISTORY, t)
                        })
                    })(e)
                })
            }
            saveMoeDataIdOperations(e) {
                Ji.moeOperationsWithDataID[e.dataMoeId] ? Ji.moeOperationsWithDataID[e.dataMoeId].push(e) : Ji.moeOperationsWithDataID[e.dataMoeId] = [e]
            }
            eventTracking(e, t, n, r) {
                var i;
                const o = Ji.baseLogTag + ".eventTracking";
                try {
                    return this.experienceMode !== ae || ((null === (i = Wr()) || void 0 === i ? void 0 : i.initialized) ? (fn.log(1, o, e + ": Event Tracked"), Wr().trackEvent(e, Object.assign({
                        campaign_id: t
                    }, n))) : (window.moengage_q = window.moengage_q || []).push({
                        f: "trackEvent",
                        a: [e, Object.assign(Object.assign({
                            campaign_id: t
                        }, n), r)]
                    })), $i.resolve()
                } catch (t) {
                    fn.errorAndBroadcast(1, o, I, "Failed Tracking web personalization experience", `Error in tracking event ${e}: ${"string"==typeof t?t:JSON.stringify(t)}`, void 0, t)
                }
            }
            trackClick(e, t, n) {
                return this.eventTracking(ue, e, t, n)
            }
            previewExperiences(e, t) {
                return e ? ((e = document) => {
                    _i.enable || fn.errorAndBroadcast(2, "Web Personalisation.previewExperiences", T, "Preview mode is not enabled", "Web personalization preview mode is not enabled."), e.querySelectorAll(`[${fe}]`).forEach(e => {
                        e.classList.add(pe), e.getAttribute("title") && e.setAttribute(ve, e.getAttribute("title")), e.setAttribute("title", "")
                    }), _i.enable(e)
                })(t) : ((e = document) => {
                    _i.disable || fn.errorAndBroadcast(2, "Web Personalisation.previewExperiences", T, "Preview mode is not enabled", "Web personalization preview mode is not enabled."), e.querySelectorAll(`[${fe}]`).forEach(e => {
                        e.classList.remove(pe), e.removeAttribute("title"), e.getAttribute(ve) && (e.setAttribute("title", e.getAttribute(ve)), e.removeAttribute(ve))
                    }), _i.disable(e)
                })(t)
            }
            renderTabbedExperience(e, n) {
                return t(this, void 0, void 0, function*() {
                    const r = Ji.baseLogTag + ".renderTabbedExperience";
                    try {
                        const i = yield Jr(e);
                        if (!i) {
                            const i = n.map(n => n.is_ai ? $i.resolve() : Ji.WebPApis.getTabData(e, n.tab_id).then(n => t(this, void 0, void 0, function*() {
                                if (n && n[e]) {
                                    const r = n[e] && n[e].data;
                                    return ((e, n) => {
                                        t(void 0, void 0, void 0, function*() {
                                            let r;
                                            return Jr(e).then(i => t(void 0, void 0, void 0, function*() {
                                                i && (n = n.concat(i)), r = yield bn.tabbedExperiences.setItem(e, n)
                                            })), r
                                        })
                                    })(e, r), di(e, r, !0)
                                }
                                return fn.error(2, r, "No payload found for tabbed experience", e), !1
                            })).catch(t => {
                                fn.error(2, r, `Failed to get tabbed experience data ${e}:`, t)
                            }));
                            return $i.all(i)
                        }
                        yield di(e, i, !0)
                    } catch (t) {
                        throw fn.error(2, r, `Error in getTabbedData ${e}:`, t), t
                    }
                })
            }
            renderPageTypeExperience(e) {
                return t(this, void 0, void 0, function*() {
                    const n = Ji.baseLogTag + ".renderPageTypeExperience";
                    if (e) {
                        ! function(e) {
                            window[ie] = e
                        }(e);
                        try {
                            const e = yield function() {
                                return t(this, void 0, void 0, function*() {
                                    const e = "Web Personalisationutils.getPageTypeExperiences";
                                    try {
                                        const n = (yield Gr()) || [];
                                        return n.length ? (yield Mr.all(n.map(n => t(this, void 0, void 0, function*() {
                                            try {
                                                if (n.page_attributes) return (yield Cr(n)) ? n : null
                                            } catch (t) {
                                                fn.error(2, e, "Error evaluating page context for experience:", n, t)
                                            }
                                            return null
                                        })))).filter(Boolean) : []
                                    } catch (t) {
                                        throw fn.error(2, e, "Error getting pageType experiences:", t), t
                                    }
                                })
                            }();
                            let n = !1;
                            return e && e.forEach(e => {
                                e && !Ji.appliedExperiences.hasOwnProperty(e.id) && (e.is_ai = !0, this.handleDomManipulator(e), n = !0)
                            }), n
                        } catch (e) {
                            return fn.error(2, n, "Error getting pageType experiences:", e), !1
                        }
                    }
                    return fn.error(2, n, "No pageContext provided"), !1
                })
            }
            handleLogoutListener() {
                window.addEventListener("USER_ACTIONS", e => {
                    "FORCED_LOGOUT" === e.detail.name && this.handleWebPLogout(!0)
                }), window.addEventListener(f, e => {
                    e.detail.name === h && this.handleWebPLogout()
                })
            }
            handleWebPLogout(e) {
                this.resetPageState(), bn.clear(), e && this.getLiveExperiences()
            }
            handleSPA() {
                window.addEventListener("SPA", e => {
                    e.detail.name === g && ui(Yi.DISABLE_WEBP) && (this.resetPageState(), this.getLiveExperiences())
                })
            }
            disableWebPersonalization() {
                window.removeEventListener("SPA", this.getLiveExperiences), window.removeEventListener(f, this.boundIdentityUpdateHandler), Ji.failedOperations = [], Li.disconnectObservers(), this.isDomMutationObserverAdded = !1, Mi.cleanupAllOperations(), Ji.moeOperationsWithDataID = {}, mi.reset()
            }
            handleIdentityChange() {
                window.removeEventListener(f, this.boundIdentityUpdateHandler), window.addEventListener(f, this.boundIdentityUpdateHandler)
            }
            identityUpdateHandler(e) {
                return t(this, void 0, void 0, function*() {
                    e.detail.name === v && (fn.log(2, Ji.baseLogTag + ".identityUpdateHandler", "User identity updated, resetting state and syncing experiences"), this.resetPageState(), Zr(), this.syncExperiences())
                })
            }
            fetchExperiences() {
                return t(this, arguments, void 0, function*(e = [], n = {}) {
                    const r = Ji.baseLogTag + ".fetchExperiences";
                    try {
                        const o = yield qi(e, n);
                        let a;
                        if (o.syncRequired) a = yield Ji.WebPApis.fetchExperiences(e, n),
                            function(e) {
                                t(this, void 0, void 0, function*() {
                                    if (!jr() || !(null == e ? void 0 : e.experiences)) return;
                                    const {
                                        experiences: n
                                    } = e, r = Object.keys(n);
                                    let i = !1;
                                    for (const e of r)(yield Ki(e, n[e])) && (i = !0);
                                    var o;
                                    i && (yield(o = new Date, t(void 0, void 0, void 0, function*() {
                                        yield bn.metaStore.setItem(Se.SELF_HANDLE_LAST_FETCHED_TIME, o)
                                    })))
                                })
                            }(a), yield(i = n, t(void 0, void 0, void 0, function*() {
                                yield bn.metaStore.setItem(Se.SELF_HANDLE_CUSTOM_ATTRIBUTES, i)
                            }));
                        else {
                            if (!o.experiences) return fn.error(1, r, "Cached experiences missing when sync not required"), {};
                            a = {
                                experiences: o.experiences
                            }
                        }
                        return (null == a ? void 0 : a.experiences) ? {
                            experiences: a.experiences,
                            failures: a.failures || []
                        } : (fn.errorAndBroadcast(1, r, I, "No web personalization experiences found", "No self-handle experiences found"), {})
                    } catch (e) {
                        return fn.errorAndBroadcast(1, r, I, "Could not fetch web personalization experiences", `Error in fetching self-handle experiences: ${"string"==typeof e?e:JSON.stringify(e)}`, void 0, e), {}
                    }
                    var i
                })
            }
            fetchLatestExperiences() {
                return t(this, void 0, void 0, function*() {
                    const e = Ji.baseLogTag + ".fetchLatestExperiences";
                    try {
                        fn.log(1, e, "Fetching latest WebP experiences"), yield Xr();
                        const t = yield Ji.WebPApis.getLiveExperiences(!0);
                        Ir(t.experiences), t.experiences && t.experiences.length > 0 && (yield qr(t.experiences)), t.split_experiences && (yield Yr(t.split_experiences)), Qr(t && t.user_in_gcg), this.deviceUuid && (yield bn.metaStore.setItem(Se.UNIQUE_ID, this.deviceUuid));
                        const n = Fr(t.experiences);
                        n.aiExperienceContext && Object.keys(n.aiExperienceContext).length > 0 && (Ui(n.aiExperienceContext), this.AiExperiences.setExperienceTriggerManager()), fn.log(1, e, "Successfully fetched latest WebP experiences")
                    } catch (t) {
                        throw fn.error(1, e, "Error fetching latest experiences:", t), t
                    }
                })
            }
            simulateDecisionPolicy() {
                return t(this, arguments, void 0, function*(e = [], t = {}) {
                    const n = Ji.baseLogTag + ".simulateDecisionPolicy";
                    fn.log(2, n, "Simulating decision policy for experiences");
                    try {
                        return yield Ji.WebPApis.getSimulateDecisionPolicy(e, t)
                    } catch (e) {
                        throw fn.error(1, n, "Error simulating decision policy: ", e), e
                    }
                })
            }
        }
        Ji.baseLogTag = "Web Personalisation", Ji.WebPApis = new xi, Ji.failedOperations = [], Ji.isAnyOperationSuccessful = !1, Ji.appliedExperiences = {}, Ji.metaInfo = Yi, Ji.moeOperationsWithDataID = {};
        const Xi = Ji;
        (null === (Gi = window.MoeWebP) || void 0 === Gi ? void 0 : Gi.initialized) || (window.MoeWebP = new Ji, window.MoeWebP.initialized = !0)
    })()
})();