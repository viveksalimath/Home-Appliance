/*! For license information please see sdk.js.LICENSE.txt */
(() => {
    var e = {
            790(e, t, n) {
                var i = n(634).pS,
                    r = n(634).VR;
                e.exports = function e(t, n, i) {
                    function r(s, o) {
                        if (!n[s]) {
                            if (!t[s]) {
                                if (a) return a(s, !0);
                                var l = new Error("Cannot find module '" + s + "'");
                                throw l.code = "MODULE_NOT_FOUND", l
                            }
                            var d = n[s] = {
                                exports: {}
                            };
                            t[s][0].call(d.exports, function(e) {
                                return r(t[s][1][e] || e)
                            }, d, d.exports, e, t, n, i)
                        }
                        return n[s].exports
                    }
                    for (var a = void 0, s = 0; s < i.length; s++) r(i[s]);
                    return r
                }({
                    1: [function(e, t, r) {
                        (function(e) {
                            "use strict";
                            var n, r, a = e.MutationObserver || e.WebKitMutationObserver;
                            if (a) {
                                var s = 0,
                                    o = new a(u),
                                    l = e.document.createTextNode("");
                                o.observe(l, {
                                    characterData: !0
                                }), n = function() {
                                    l.data = s = ++s % 2
                                }
                            } else if (e.setImmediate || void 0 === e.MessageChannel) n = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function() {
                                var t = e.document.createElement("script");
                                t.onreadystatechange = function() {
                                    u(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null
                                }, e.document.documentElement.appendChild(t)
                            } : function() {
                                i(u, 0)
                            };
                            else {
                                var d = new e.MessageChannel;
                                d.port1.onmessage = u, n = function() {
                                    d.port2.postMessage(0)
                                }
                            }
                            var c = [];

                            function u() {
                                var e, t;
                                r = !0;
                                for (var n = c.length; n;) {
                                    for (t = c, c = [], e = -1; ++e < n;) t[e]();
                                    n = c.length
                                }
                                r = !1
                            }
                            t.exports = function(e) {
                                1 !== c.push(e) || r || n()
                            }
                        }).call(this, void 0 !== n.g ? n.g : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                    }, {}],
                    2: [function(e, t, n) {
                        "use strict";
                        var i = e(1);

                        function r() {}
                        var a = {},
                            s = ["REJECTED"],
                            o = ["FULFILLED"],
                            l = ["PENDING"];

                        function d(e) {
                            if ("function" != typeof e) throw new TypeError("resolver must be a function");
                            this.state = l, this.queue = [], this.outcome = void 0, e !== r && p(this, e)
                        }

                        function c(e, t, n) {
                            this.promise = e, "function" == typeof t && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), "function" == typeof n && (this.onRejected = n, this.callRejected = this.otherCallRejected)
                        }

                        function u(e, t, n) {
                            i(function() {
                                var i;
                                try {
                                    i = t(n)
                                } catch (t) {
                                    return a.reject(e, t)
                                }
                                i === e ? a.reject(e, new TypeError("Cannot resolve promise with itself")) : a.resolve(e, i)
                            })
                        }

                        function g(e) {
                            var t = e && e.then;
                            if (e && ("object" == typeof e || "function" == typeof e) && "function" == typeof t) return function() {
                                t.apply(e, arguments)
                            }
                        }

                        function p(e, t) {
                            var n = !1;

                            function i(t) {
                                n || (n = !0, a.reject(e, t))
                            }

                            function r(t) {
                                n || (n = !0, a.resolve(e, t))
                            }
                            var s = m(function() {
                                t(r, i)
                            });
                            "error" === s.status && i(s.value)
                        }

                        function m(e, t) {
                            var n = {};
                            try {
                                n.value = e(t), n.status = "success"
                            } catch (e) {
                                n.status = "error", n.value = e
                            }
                            return n
                        }
                        t.exports = d, d.prototype.catch = function(e) {
                            return this.then(null, e)
                        }, d.prototype.then = function(e, t) {
                            if ("function" != typeof e && this.state === o || "function" != typeof t && this.state === s) return this;
                            var n = new this.constructor(r);
                            return this.state !== l ? u(n, this.state === o ? e : t, this.outcome) : this.queue.push(new c(n, e, t)), n
                        }, c.prototype.callFulfilled = function(e) {
                            a.resolve(this.promise, e)
                        }, c.prototype.otherCallFulfilled = function(e) {
                            u(this.promise, this.onFulfilled, e)
                        }, c.prototype.callRejected = function(e) {
                            a.reject(this.promise, e)
                        }, c.prototype.otherCallRejected = function(e) {
                            u(this.promise, this.onRejected, e)
                        }, a.resolve = function(e, t) {
                            var n = m(g, t);
                            if ("error" === n.status) return a.reject(e, n.value);
                            var i = n.value;
                            if (i) p(e, i);
                            else {
                                e.state = o, e.outcome = t;
                                for (var r = -1, s = e.queue.length; ++r < s;) e.queue[r].callFulfilled(t)
                            }
                            return e
                        }, a.reject = function(e, t) {
                            e.state = s, e.outcome = t;
                            for (var n = -1, i = e.queue.length; ++n < i;) e.queue[n].callRejected(t);
                            return e
                        }, d.resolve = function(e) {
                            return e instanceof this ? e : a.resolve(new this(r), e)
                        }, d.reject = function(e) {
                            var t = new this(r);
                            return a.reject(t, e)
                        }, d.all = function(e) {
                            var t = this;
                            if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                            var n = e.length,
                                i = !1;
                            if (!n) return this.resolve([]);
                            for (var s = new Array(n), o = 0, l = -1, d = new this(r); ++l < n;) c(e[l], l);
                            return d;

                            function c(e, r) {
                                t.resolve(e).then(function(e) {
                                    s[r] = e, ++o !== n || i || (i = !0, a.resolve(d, s))
                                }, function(e) {
                                    i || (i = !0, a.reject(d, e))
                                })
                            }
                        }, d.race = function(e) {
                            var t = this;
                            if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                            var n = e.length,
                                i = !1;
                            if (!n) return this.resolve([]);
                            for (var s = -1, o = new this(r); ++s < n;) l(e[s]);
                            return o;

                            function l(e) {
                                t.resolve(e).then(function(e) {
                                    i || (i = !0, a.resolve(o, e))
                                }, function(e) {
                                    i || (i = !0, a.reject(o, e))
                                })
                            }
                        }
                    }, {
                        1: 1
                    }],
                    3: [function(e, t, i) {
                        (function(t) {
                            "use strict";
                            "function" != typeof t.Promise && (t.Promise = e(2))
                        }).call(this, void 0 !== n.g ? n.g : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                    }, {
                        2: 2
                    }],
                    4: [function(e, t, n) {
                        "use strict";
                        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                return typeof e
                            } : function(e) {
                                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                            },
                            a = function() {
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

                        function s(e, t) {
                            e = e || [], t = t || {};
                            try {
                                return new Blob(e, t)
                            } catch (r) {
                                if ("TypeError" !== r.name) throw r;
                                for (var n = new("undefined" != typeof BlobBuilder ? BlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : WebKitBlobBuilder), i = 0; i < e.length; i += 1) n.append(e[i]);
                                return n.getBlob(t.type)
                            }
                        }
                        void 0 === r && e(3);
                        var o = r;

                        function l(e, t) {
                            t && e.then(function(e) {
                                t(null, e)
                            }, function(e) {
                                t(e)
                            })
                        }

                        function d(e, t, n) {
                            "function" == typeof t && e.then(t), "function" == typeof n && e.catch(n)
                        }

                        function c(e) {
                            return "string" != typeof e && (console.warn(e + " used as a key, but it is not a string."), e = String(e)), e
                        }

                        function u() {
                            if (arguments.length && "function" == typeof arguments[arguments.length - 1]) return arguments[arguments.length - 1]
                        }
                        var g = "local-forage-detect-blob-support",
                            p = void 0,
                            m = {},
                            h = Object.prototype.toString,
                            v = "readonly",
                            f = "readwrite";

                        function E(e) {
                            for (var t = e.length, n = new ArrayBuffer(t), i = new Uint8Array(n), r = 0; r < t; r++) i[r] = e.charCodeAt(r);
                            return n
                        }

                        function S(e) {
                            var t = m[e.name],
                                n = {};
                            n.promise = new o(function(e, t) {
                                n.resolve = e, n.reject = t
                            }), t.deferredOperations.push(n), t.dbReady = t.dbReady ? t.dbReady.then(function() {
                                return n.promise
                            }) : n.promise
                        }

                        function y(e) {
                            var t = m[e.name].deferredOperations.pop();
                            if (t) return t.resolve(), t.promise
                        }

                        function _(e, t) {
                            var n = m[e.name].deferredOperations.pop();
                            if (n) return n.reject(t), n.promise
                        }

                        function b(e, t) {
                            return new o(function(n, i) {
                                if (m[e.name] = m[e.name] || {
                                        forages: [],
                                        db: null,
                                        dbReady: null,
                                        deferredOperations: []
                                    }, e.db) {
                                    if (!t) return n(e.db);
                                    S(e), e.db.close()
                                }
                                var r = [e.name];
                                t && r.push(e.version);
                                var s = a.open.apply(a, r);
                                t && (s.onupgradeneeded = function(t) {
                                    var n = s.result;
                                    try {
                                        n.createObjectStore(e.storeName), t.oldVersion <= 1 && n.createObjectStore(g)
                                    } catch (n) {
                                        if ("ConstraintError" !== n.name) throw n;
                                        console.warn('The database "' + e.name + '" has been upgraded from version ' + t.oldVersion + " to version " + t.newVersion + ', but the storage "' + e.storeName + '" already exists.')
                                    }
                                }), s.onerror = function(e) {
                                    e.preventDefault(), i(s.error)
                                }, s.onsuccess = function() {
                                    var t = s.result;
                                    t.onversionchange = function(e) {
                                        e.target.close()
                                    }, n(t), y(e)
                                }
                            })
                        }

                        function T(e) {
                            return b(e, !1)
                        }

                        function I(e) {
                            return b(e, !0)
                        }

                        function A(e, t) {
                            if (!e.db) return !0;
                            var n = !e.db.objectStoreNames.contains(e.storeName),
                                i = e.version > e.db.version;
                            if (e.version < e.db.version && (e.version !== t && console.warn('The database "' + e.name + "\" can't be downgraded from version " + e.db.version + " to version " + e.version + "."), e.version = e.db.version), i || n) {
                                if (n) {
                                    var r = e.db.version + 1;
                                    r > e.version && (e.version = r)
                                }
                                return !0
                            }
                            return !1
                        }

                        function w(e) {
                            return s([E(atob(e.data))], {
                                type: e.type
                            })
                        }

                        function O(e) {
                            return e && e.__local_forage_encoded_blob
                        }

                        function D(e) {
                            var t = this,
                                n = t._initReady().then(function() {
                                    var e = m[t._dbInfo.name];
                                    if (e && e.dbReady) return e.dbReady
                                });
                            return d(n, e, e), n
                        }

                        function R(e, t, n, i) {
                            void 0 === i && (i = 1);
                            try {
                                var r = e.db.transaction(e.storeName, t);
                                n(null, r)
                            } catch (r) {
                                if (i > 0 && (!e.db || "InvalidStateError" === r.name || "NotFoundError" === r.name)) return o.resolve().then(function() {
                                    if (!e.db || "NotFoundError" === r.name && !e.db.objectStoreNames.contains(e.storeName) && e.version <= e.db.version) return e.db && (e.version = e.db.version + 1), I(e)
                                }).then(function() {
                                    return function(e) {
                                        S(e);
                                        for (var t = m[e.name], n = t.forages, i = 0; i < n.length; i++) {
                                            var r = n[i];
                                            r._dbInfo.db && (r._dbInfo.db.close(), r._dbInfo.db = null)
                                        }
                                        return e.db = null, T(e).then(function(t) {
                                            return e.db = t, A(e) ? I(e) : t
                                        }).then(function(i) {
                                            e.db = t.db = i;
                                            for (var r = 0; r < n.length; r++) n[r]._dbInfo.db = i
                                        }).catch(function(t) {
                                            throw _(e, t), t
                                        })
                                    }(e).then(function() {
                                        R(e, t, n, i - 1)
                                    })
                                }).catch(n);
                                n(r)
                            }
                        }
                        var C = {
                                _driver: "asyncStorage",
                                _initStorage(e) {
                                    var t = this,
                                        n = {
                                            db: null
                                        };
                                    if (e)
                                        for (var i in e) n[i] = e[i];
                                    var r = m[n.name];
                                    r || (m[n.name] = r = {
                                        forages: [],
                                        db: null,
                                        dbReady: null,
                                        deferredOperations: []
                                    }), r.forages.push(t), t._initReady || (t._initReady = t.ready, t.ready = D);
                                    var a = [];

                                    function s() {
                                        return o.resolve()
                                    }
                                    for (var l = 0; l < r.forages.length; l++) {
                                        var d = r.forages[l];
                                        d !== t && a.push(d._initReady().catch(s))
                                    }
                                    var c = r.forages.slice(0);
                                    return o.all(a).then(function() {
                                        return n.db = r.db, T(n)
                                    }).then(function(e) {
                                        return n.db = e, A(n, t._defaultConfig.version) ? I(n) : e
                                    }).then(function(e) {
                                        n.db = r.db = e, t._dbInfo = n;
                                        for (var i = 0; i < c.length; i++) {
                                            var a = c[i];
                                            a !== t && (a._dbInfo.db = n.db, a._dbInfo.version = n.version)
                                        }
                                    })
                                },
                                _support: function() {
                                    try {
                                        if (!a || !a.open) return !1;
                                        var e = "undefined" != typeof openDatabase && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform),
                                            t = "function" == typeof fetch && -1 !== fetch.toString().indexOf("[native code");
                                        return (!e || t) && "undefined" != typeof indexedDB && "undefined" != typeof IDBKeyRange
                                    } catch (e) {
                                        return !1
                                    }
                                }(),
                                iterate(e, t) {
                                    var n = this,
                                        i = new o(function(t, i) {
                                            n.ready().then(function() {
                                                R(n._dbInfo, v, function(r, a) {
                                                    if (r) return i(r);
                                                    try {
                                                        var s = a.objectStore(n._dbInfo.storeName).openCursor(),
                                                            o = 1;
                                                        s.onsuccess = function() {
                                                            var n = s.result;
                                                            if (n) {
                                                                var i = n.value;
                                                                O(i) && (i = w(i));
                                                                var r = e(i, n.key, o++);
                                                                void 0 !== r ? t(r) : n.continue()
                                                            } else t()
                                                        }, s.onerror = function() {
                                                            i(s.error)
                                                        }
                                                    } catch (e) {
                                                        i(e)
                                                    }
                                                })
                                            }).catch(i)
                                        });
                                    return l(i, t), i
                                },
                                getItem(e, t) {
                                    var n = this;
                                    e = c(e);
                                    var i = new o(function(t, i) {
                                        n.ready().then(function() {
                                            R(n._dbInfo, v, function(r, a) {
                                                if (r) return i(r);
                                                try {
                                                    var s = a.objectStore(n._dbInfo.storeName).get(e);
                                                    s.onsuccess = function() {
                                                        var e = s.result;
                                                        void 0 === e && (e = null), O(e) && (e = w(e)), t(e)
                                                    }, s.onerror = function() {
                                                        i(s.error)
                                                    }
                                                } catch (e) {
                                                    i(e)
                                                }
                                            })
                                        }).catch(i)
                                    });
                                    return l(i, t), i
                                },
                                setItem(e, t, n) {
                                    var i = this;
                                    e = c(e);
                                    var r = new o(function(n, r) {
                                        var a;
                                        i.ready().then(function() {
                                            return a = i._dbInfo, "[object Blob]" === h.call(t) ? function(e) {
                                                return "boolean" == typeof p ? o.resolve(p) : function(e) {
                                                    return new o(function(t) {
                                                        var n = e.transaction(g, f),
                                                            i = s([""]);
                                                        n.objectStore(g).put(i, "key"), n.onabort = function(e) {
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
                                                    return p = e
                                                })
                                            }(a.db).then(function(e) {
                                                return e ? t : (n = t, new o(function(e, t) {
                                                    var i = new FileReader;
                                                    i.onerror = t, i.onloadend = function(t) {
                                                        var i = btoa(t.target.result || "");
                                                        e({
                                                            __local_forage_encoded_blob: !0,
                                                            data: i,
                                                            type: n.type
                                                        })
                                                    }, i.readAsBinaryString(n)
                                                }));
                                                var n
                                            }) : t
                                        }).then(function(t) {
                                            R(i._dbInfo, f, function(a, s) {
                                                if (a) return r(a);
                                                try {
                                                    var o = s.objectStore(i._dbInfo.storeName);
                                                    null === t && (t = void 0);
                                                    var l = o.put(t, e);
                                                    s.oncomplete = function() {
                                                        void 0 === t && (t = null), n(t)
                                                    }, s.onabort = s.onerror = function() {
                                                        r(l.error ? l.error : l.transaction.error)
                                                    }
                                                } catch (e) {
                                                    r(e)
                                                }
                                            })
                                        }).catch(r)
                                    });
                                    return l(r, n), r
                                },
                                removeItem(e, t) {
                                    var n = this;
                                    e = c(e);
                                    var i = new o(function(t, i) {
                                        n.ready().then(function() {
                                            R(n._dbInfo, f, function(r, a) {
                                                if (r) return i(r);
                                                try {
                                                    var s = a.objectStore(n._dbInfo.storeName).delete(e);
                                                    a.oncomplete = function() {
                                                        t()
                                                    }, a.onerror = function() {
                                                        i(s.error)
                                                    }, a.onabort = function() {
                                                        i(s.error ? s.error : s.transaction.error)
                                                    }
                                                } catch (e) {
                                                    i(e)
                                                }
                                            })
                                        }).catch(i)
                                    });
                                    return l(i, t), i
                                },
                                clear(e) {
                                    var t = this,
                                        n = new o(function(e, n) {
                                            t.ready().then(function() {
                                                R(t._dbInfo, f, function(i, r) {
                                                    if (i) return n(i);
                                                    try {
                                                        var a = r.objectStore(t._dbInfo.storeName).clear();
                                                        r.oncomplete = function() {
                                                            e()
                                                        }, r.onabort = r.onerror = function() {
                                                            n(a.error ? a.error : a.transaction.error)
                                                        }
                                                    } catch (e) {
                                                        n(e)
                                                    }
                                                })
                                            }).catch(n)
                                        });
                                    return l(n, e), n
                                },
                                length(e) {
                                    var t = this,
                                        n = new o(function(e, n) {
                                            t.ready().then(function() {
                                                R(t._dbInfo, v, function(i, r) {
                                                    if (i) return n(i);
                                                    try {
                                                        var a = r.objectStore(t._dbInfo.storeName).count();
                                                        a.onsuccess = function() {
                                                            e(a.result)
                                                        }, a.onerror = function() {
                                                            n(a.error)
                                                        }
                                                    } catch (e) {
                                                        n(e)
                                                    }
                                                })
                                            }).catch(n)
                                        });
                                    return l(n, e), n
                                },
                                key(e, t) {
                                    var n = this,
                                        i = new o(function(t, i) {
                                            e < 0 ? t(null) : n.ready().then(function() {
                                                R(n._dbInfo, v, function(r, a) {
                                                    if (r) return i(r);
                                                    try {
                                                        var s = a.objectStore(n._dbInfo.storeName),
                                                            o = !1,
                                                            l = s.openKeyCursor();
                                                        l.onsuccess = function() {
                                                            var n = l.result;
                                                            n ? 0 === e || o ? t(n.key) : (o = !0, n.advance(e)) : t(null)
                                                        }, l.onerror = function() {
                                                            i(l.error)
                                                        }
                                                    } catch (e) {
                                                        i(e)
                                                    }
                                                })
                                            }).catch(i)
                                        });
                                    return l(i, t), i
                                },
                                keys(e) {
                                    var t = this,
                                        n = new o(function(e, n) {
                                            t.ready().then(function() {
                                                R(t._dbInfo, v, function(i, r) {
                                                    if (i) return n(i);
                                                    try {
                                                        var a = r.objectStore(t._dbInfo.storeName).openKeyCursor(),
                                                            s = [];
                                                        a.onsuccess = function() {
                                                            var t = a.result;
                                                            t ? (s.push(t.key), t.continue()) : e(s)
                                                        }, a.onerror = function() {
                                                            n(a.error)
                                                        }
                                                    } catch (e) {
                                                        n(e)
                                                    }
                                                })
                                            }).catch(n)
                                        });
                                    return l(n, e), n
                                },
                                dropInstance(e, t) {
                                    t = u.apply(this, arguments);
                                    var n, i = this.config();
                                    return (e = "function" != typeof e && e || {}).name || (e.name = e.name || i.name, e.storeName = e.storeName || i.storeName), l(n = e.name ? (e.name === i.name && this._dbInfo.db ? o.resolve(this._dbInfo.db) : T(e).then(function(t) {
                                        var n = m[e.name],
                                            i = n.forages;
                                        n.db = t;
                                        for (var r = 0; r < i.length; r++) i[r]._dbInfo.db = t;
                                        return t
                                    })).then(e.storeName ? function(t) {
                                        if (t.objectStoreNames.contains(e.storeName)) {
                                            var n = t.version + 1;
                                            S(e);
                                            var i = m[e.name],
                                                r = i.forages;
                                            t.close();
                                            for (var s = 0; s < r.length; s++) {
                                                var l = r[s];
                                                l._dbInfo.db = null, l._dbInfo.version = n
                                            }
                                            var d = new o(function(t, i) {
                                                var r = a.open(e.name, n);
                                                r.onerror = function(e) {
                                                    r.result.close(), i(e)
                                                }, r.onupgradeneeded = function() {
                                                    r.result.deleteObjectStore(e.storeName)
                                                }, r.onsuccess = function() {
                                                    var e = r.result;
                                                    e.close(), t(e)
                                                }
                                            });
                                            return d.then(function(e) {
                                                i.db = e;
                                                for (var t = 0; t < r.length; t++) {
                                                    var n = r[t];
                                                    n._dbInfo.db = e, y(n._dbInfo)
                                                }
                                            }).catch(function(t) {
                                                throw (_(e, t) || o.resolve()).catch(function() {}), t
                                            })
                                        }
                                    } : function(t) {
                                        S(e);
                                        var n = m[e.name],
                                            i = n.forages;
                                        t.close();
                                        for (var r = 0; r < i.length; r++) i[r]._dbInfo.db = null;
                                        var s = new o(function(t, n) {
                                            var i = a.deleteDatabase(e.name);
                                            i.onerror = function() {
                                                var e = i.result;
                                                e && e.close(), n(i.error)
                                            }, i.onblocked = function() {
                                                console.warn('dropInstance blocked for database "' + e.name + '" until all open connections are closed')
                                            }, i.onsuccess = function() {
                                                var e = i.result;
                                                e && e.close(), t(e)
                                            }
                                        });
                                        return s.then(function(e) {
                                            n.db = e;
                                            for (var t = 0; t < i.length; t++) y(i[t]._dbInfo)
                                        }).catch(function(t) {
                                            throw (_(e, t) || o.resolve()).catch(function() {}), t
                                        })
                                    }) : o.reject("Invalid arguments"), t), n
                                }
                            },
                            L = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                            P = /^~~local_forage_type~([^~]+)~/,
                            N = "__lfsc__:",
                            k = "arbf",
                            M = "blob",
                            B = "si08",
                            U = "ui08",
                            x = "uic8",
                            F = "si16",
                            V = "si32",
                            W = "ur16",
                            H = "ui32",
                            G = "fl32",
                            $ = "fl64",
                            j = Object.prototype.toString;

                        function K(e) {
                            var t, n, i, r, a, s = .75 * e.length,
                                o = e.length,
                                l = 0;
                            "=" === e[e.length - 1] && (s--, "=" === e[e.length - 2] && s--);
                            var d = new ArrayBuffer(s),
                                c = new Uint8Array(d);
                            for (t = 0; t < o; t += 4) n = L.indexOf(e[t]), i = L.indexOf(e[t + 1]), r = L.indexOf(e[t + 2]), a = L.indexOf(e[t + 3]), c[l++] = n << 2 | i >> 4, c[l++] = (15 & i) << 4 | r >> 2, c[l++] = (3 & r) << 6 | 63 & a;
                            return d
                        }

                        function q(e) {
                            var t, n = new Uint8Array(e),
                                i = "";
                            for (t = 0; t < n.length; t += 3) i += L[n[t] >> 2], i += L[(3 & n[t]) << 4 | n[t + 1] >> 4], i += L[(15 & n[t + 1]) << 2 | n[t + 2] >> 6], i += L[63 & n[t + 2]];
                            return n.length % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : n.length % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="), i
                        }
                        var Y = {
                            serialize(e, t) {
                                var n = "";
                                if (e && (n = j.call(e)), e && ("[object ArrayBuffer]" === n || e.buffer && "[object ArrayBuffer]" === j.call(e.buffer))) {
                                    var i, r = N;
                                    e instanceof ArrayBuffer ? (i = e, r += k) : (i = e.buffer, "[object Int8Array]" === n ? r += B : "[object Uint8Array]" === n ? r += U : "[object Uint8ClampedArray]" === n ? r += x : "[object Int16Array]" === n ? r += F : "[object Uint16Array]" === n ? r += W : "[object Int32Array]" === n ? r += V : "[object Uint32Array]" === n ? r += H : "[object Float32Array]" === n ? r += G : "[object Float64Array]" === n ? r += $ : t(new Error("Failed to get type for BinaryArray"))), t(r + q(i))
                                } else if ("[object Blob]" === n) {
                                    var a = new FileReader;
                                    a.onload = function() {
                                        var n = "~~local_forage_type~" + e.type + "~" + q(this.result);
                                        t(N + M + n)
                                    }, a.readAsArrayBuffer(e)
                                } else try {
                                    t(JSON.stringify(e))
                                } catch (n) {
                                    console.error("Couldn't convert value into a JSON string: ", e), t(null, n)
                                }
                            },
                            deserialize(e) {
                                if (e.substring(0, 9) !== N) return JSON.parse(e);
                                var t, n = e.substring(13),
                                    i = e.substring(9, 13);
                                if (i === M && P.test(n)) {
                                    var r = n.match(P);
                                    t = r[1], n = n.substring(r[0].length)
                                }
                                var a = K(n);
                                switch (i) {
                                    case k:
                                        return a;
                                    case M:
                                        return s([a], {
                                            type: t
                                        });
                                    case B:
                                        return new Int8Array(a);
                                    case U:
                                        return new Uint8Array(a);
                                    case x:
                                        return new Uint8ClampedArray(a);
                                    case F:
                                        return new Int16Array(a);
                                    case W:
                                        return new Uint16Array(a);
                                    case V:
                                        return new Int32Array(a);
                                    case H:
                                        return new Uint32Array(a);
                                    case G:
                                        return new Float32Array(a);
                                    case $:
                                        return new Float64Array(a);
                                    default:
                                        throw new Error("Unkown type: " + i)
                                }
                            },
                            stringToBuffer: K,
                            bufferToString: q
                        };

                        function z(e, t, n, i) {
                            e.executeSql("CREATE TABLE IF NOT EXISTS " + t.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], n, i)
                        }

                        function J(e, t, n, i, r, a) {
                            e.executeSql(n, i, r, function(e, s) {
                                s.code === s.SYNTAX_ERR ? e.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [t.storeName], function(e, o) {
                                    o.rows.length ? a(e, s) : z(e, t, function() {
                                        e.executeSql(n, i, r, a)
                                    }, a)
                                }, a) : a(e, s)
                            }, a)
                        }

                        function Q(e, t, n, i) {
                            var r = this;
                            e = c(e);
                            var a = new o(function(a, s) {
                                r.ready().then(function() {
                                    void 0 === t && (t = null);
                                    var o = t,
                                        l = r._dbInfo;
                                    l.serializer.serialize(t, function(t, d) {
                                        d ? s(d) : l.db.transaction(function(n) {
                                            J(n, l, "INSERT OR REPLACE INTO " + l.storeName + " (key, value) VALUES (?, ?)", [e, t], function() {
                                                a(o)
                                            }, function(e, t) {
                                                s(t)
                                            })
                                        }, function(t) {
                                            if (t.code === t.QUOTA_ERR) {
                                                if (i > 0) return void a(Q.apply(r, [e, o, n, i - 1]));
                                                s(t)
                                            }
                                        })
                                    })
                                }).catch(s)
                            });
                            return l(a, n), a
                        }
                        var X = {
                            _driver: "webSQLStorage",
                            _initStorage(e) {
                                var t = this,
                                    n = {
                                        db: null
                                    };
                                if (e)
                                    for (var i in e) n[i] = "string" != typeof e[i] ? e[i].toString() : e[i];
                                var r = new o(function(e, i) {
                                    try {
                                        n.db = openDatabase(n.name, String(n.version), n.description, n.size)
                                    } catch (e) {
                                        return i(e)
                                    }
                                    n.db.transaction(function(r) {
                                        z(r, n, function() {
                                            t._dbInfo = n, e()
                                        }, function(e, t) {
                                            i(t)
                                        })
                                    }, i)
                                });
                                return n.serializer = Y, r
                            },
                            _support: "function" == typeof openDatabase,
                            iterate(e, t) {
                                var n = this,
                                    i = new o(function(t, i) {
                                        n.ready().then(function() {
                                            var r = n._dbInfo;
                                            r.db.transaction(function(n) {
                                                J(n, r, "SELECT * FROM " + r.storeName, [], function(n, i) {
                                                    for (var a = i.rows, s = a.length, o = 0; o < s; o++) {
                                                        var l = a.item(o),
                                                            d = l.value;
                                                        if (d && (d = r.serializer.deserialize(d)), void 0 !== (d = e(d, l.key, o + 1))) return void t(d)
                                                    }
                                                    t()
                                                }, function(e, t) {
                                                    i(t)
                                                })
                                            })
                                        }).catch(i)
                                    });
                                return l(i, t), i
                            },
                            getItem(e, t) {
                                var n = this;
                                e = c(e);
                                var i = new o(function(t, i) {
                                    n.ready().then(function() {
                                        var r = n._dbInfo;
                                        r.db.transaction(function(n) {
                                            J(n, r, "SELECT * FROM " + r.storeName + " WHERE key = ? LIMIT 1", [e], function(e, n) {
                                                var i = n.rows.length ? n.rows.item(0).value : null;
                                                i && (i = r.serializer.deserialize(i)), t(i)
                                            }, function(e, t) {
                                                i(t)
                                            })
                                        })
                                    }).catch(i)
                                });
                                return l(i, t), i
                            },
                            setItem(e, t, n) {
                                return Q.apply(this, [e, t, n, 1])
                            },
                            removeItem(e, t) {
                                var n = this;
                                e = c(e);
                                var i = new o(function(t, i) {
                                    n.ready().then(function() {
                                        var r = n._dbInfo;
                                        r.db.transaction(function(n) {
                                            J(n, r, "DELETE FROM " + r.storeName + " WHERE key = ?", [e], function() {
                                                t()
                                            }, function(e, t) {
                                                i(t)
                                            })
                                        })
                                    }).catch(i)
                                });
                                return l(i, t), i
                            },
                            clear(e) {
                                var t = this,
                                    n = new o(function(e, n) {
                                        t.ready().then(function() {
                                            var i = t._dbInfo;
                                            i.db.transaction(function(t) {
                                                J(t, i, "DELETE FROM " + i.storeName, [], function() {
                                                    e()
                                                }, function(e, t) {
                                                    n(t)
                                                })
                                            })
                                        }).catch(n)
                                    });
                                return l(n, e), n
                            },
                            length(e) {
                                var t = this,
                                    n = new o(function(e, n) {
                                        t.ready().then(function() {
                                            var i = t._dbInfo;
                                            i.db.transaction(function(t) {
                                                J(t, i, "SELECT COUNT(key) as c FROM " + i.storeName, [], function(t, n) {
                                                    var i = n.rows.item(0).c;
                                                    e(i)
                                                }, function(e, t) {
                                                    n(t)
                                                })
                                            })
                                        }).catch(n)
                                    });
                                return l(n, e), n
                            },
                            key(e, t) {
                                var n = this,
                                    i = new o(function(t, i) {
                                        n.ready().then(function() {
                                            var r = n._dbInfo;
                                            r.db.transaction(function(n) {
                                                J(n, r, "SELECT key FROM " + r.storeName + " WHERE id = ? LIMIT 1", [e + 1], function(e, n) {
                                                    var i = n.rows.length ? n.rows.item(0).key : null;
                                                    t(i)
                                                }, function(e, t) {
                                                    i(t)
                                                })
                                            })
                                        }).catch(i)
                                    });
                                return l(i, t), i
                            },
                            keys(e) {
                                var t = this,
                                    n = new o(function(e, n) {
                                        t.ready().then(function() {
                                            var i = t._dbInfo;
                                            i.db.transaction(function(t) {
                                                J(t, i, "SELECT key FROM " + i.storeName, [], function(t, n) {
                                                    for (var i = [], r = 0; r < n.rows.length; r++) i.push(n.rows.item(r).key);
                                                    e(i)
                                                }, function(e, t) {
                                                    n(t)
                                                })
                                            })
                                        }).catch(n)
                                    });
                                return l(n, e), n
                            },
                            dropInstance(e, t) {
                                t = u.apply(this, arguments);
                                var n = this.config();
                                (e = "function" != typeof e && e || {}).name || (e.name = e.name || n.name, e.storeName = e.storeName || n.storeName);
                                var i, r = this;
                                return l(i = e.name ? new o(function(t) {
                                    var i;
                                    i = e.name === n.name ? r._dbInfo.db : openDatabase(e.name, "", "", 0), t(e.storeName ? {
                                        db: i,
                                        storeNames: [e.storeName]
                                    } : function(e) {
                                        return new o(function(t, n) {
                                            e.transaction(function(i) {
                                                i.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(n, i) {
                                                    for (var r = [], a = 0; a < i.rows.length; a++) r.push(i.rows.item(a).name);
                                                    t({
                                                        db: e,
                                                        storeNames: r
                                                    })
                                                }, function(e, t) {
                                                    n(t)
                                                })
                                            }, function(e) {
                                                n(e)
                                            })
                                        })
                                    }(i))
                                }).then(function(e) {
                                    return new o(function(t, n) {
                                        e.db.transaction(function(i) {
                                            function r(e) {
                                                return new o(function(t, n) {
                                                    i.executeSql("DROP TABLE IF EXISTS " + e, [], function() {
                                                        t()
                                                    }, function(e, t) {
                                                        n(t)
                                                    })
                                                })
                                            }
                                            for (var a = [], s = 0, l = e.storeNames.length; s < l; s++) a.push(r(e.storeNames[s]));
                                            o.all(a).then(function() {
                                                t()
                                            }).catch(function(e) {
                                                n(e)
                                            })
                                        }, function(e) {
                                            n(e)
                                        })
                                    })
                                }) : o.reject("Invalid arguments"), t), i
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
                                    }() || localStorage.length > 0 ? (this._dbInfo = t, t.serializer = Y, o.resolve()) : o.reject()
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
                                        i = n.ready().then(function() {
                                            for (var t = n._dbInfo, i = t.keyPrefix, r = i.length, a = localStorage.length, s = 1, o = 0; o < a; o++) {
                                                var l = localStorage.key(o);
                                                if (0 === l.indexOf(i)) {
                                                    var d = localStorage.getItem(l);
                                                    if (d && (d = t.serializer.deserialize(d)), void 0 !== (d = e(d, l.substring(r), s++))) return d
                                                }
                                            }
                                        });
                                    return l(i, t), i
                                },
                                getItem(e, t) {
                                    var n = this;
                                    e = c(e);
                                    var i = n.ready().then(function() {
                                        var t = n._dbInfo,
                                            i = localStorage.getItem(t.keyPrefix + e);
                                        return i && (i = t.serializer.deserialize(i)), i
                                    });
                                    return l(i, t), i
                                },
                                setItem(e, t, n) {
                                    var i = this;
                                    e = c(e);
                                    var r = i.ready().then(function() {
                                        void 0 === t && (t = null);
                                        var n = t;
                                        return new o(function(r, a) {
                                            var s = i._dbInfo;
                                            s.serializer.serialize(t, function(t, i) {
                                                if (i) a(i);
                                                else try {
                                                    localStorage.setItem(s.keyPrefix + e, t), r(n)
                                                } catch (e) {
                                                    "QuotaExceededError" !== e.name && "NS_ERROR_DOM_QUOTA_REACHED" !== e.name || a(e), a(e)
                                                }
                                            })
                                        })
                                    });
                                    return l(r, n), r
                                },
                                removeItem(e, t) {
                                    var n = this;
                                    e = c(e);
                                    var i = n.ready().then(function() {
                                        localStorage.removeItem(n._dbInfo.keyPrefix + e)
                                    });
                                    return l(i, t), i
                                },
                                clear(e) {
                                    var t = this,
                                        n = t.ready().then(function() {
                                            for (var e = t._dbInfo.keyPrefix, n = localStorage.length - 1; n >= 0; n--) {
                                                var i = localStorage.key(n);
                                                0 === i.indexOf(e) && localStorage.removeItem(i)
                                            }
                                        });
                                    return l(n, e), n
                                },
                                length(e) {
                                    var t = this.keys().then(function(e) {
                                        return e.length
                                    });
                                    return l(t, e), t
                                },
                                key(e, t) {
                                    var n = this,
                                        i = n.ready().then(function() {
                                            var t, i = n._dbInfo;
                                            try {
                                                t = localStorage.key(e)
                                            } catch (e) {
                                                t = null
                                            }
                                            return t && (t = t.substring(i.keyPrefix.length)), t
                                        });
                                    return l(i, t), i
                                },
                                keys(e) {
                                    var t = this,
                                        n = t.ready().then(function() {
                                            for (var e = t._dbInfo, n = localStorage.length, i = [], r = 0; r < n; r++) {
                                                var a = localStorage.key(r);
                                                0 === a.indexOf(e.keyPrefix) && i.push(a.substring(e.keyPrefix.length))
                                            }
                                            return i
                                        });
                                    return l(n, e), n
                                },
                                dropInstance(e, t) {
                                    if (t = u.apply(this, arguments), !(e = "function" != typeof e && e || {}).name) {
                                        var n = this.config();
                                        e.name = e.name || n.name, e.storeName = e.storeName || n.storeName
                                    }
                                    var i, r = this;
                                    return l(i = e.name ? new o(function(t) {
                                        t(e.storeName ? Z(e, r._defaultConfig) : e.name + "/")
                                    }).then(function(e) {
                                        for (var t = localStorage.length - 1; t >= 0; t--) {
                                            var n = localStorage.key(t);
                                            0 === n.indexOf(e) && localStorage.removeItem(n)
                                        }
                                    }) : o.reject("Invalid arguments"), t), i
                                }
                            },
                            te = function(e, t) {
                                return e === t || "number" == typeof e && "number" == typeof t && isNaN(e) && isNaN(t)
                            },
                            ne = function(e, t) {
                                for (var n = e.length, i = 0; i < n;) {
                                    if (te(e[i], t)) return !0;
                                    i++
                                }
                                return !1
                            },
                            ie = Array.isArray || function(e) {
                                return "[object Array]" === Object.prototype.toString.call(e)
                            },
                            re = {},
                            ae = {},
                            se = {
                                INDEXEDDB: C,
                                WEBSQL: X,
                                LOCALSTORAGE: ee
                            },
                            oe = [se.INDEXEDDB._driver, se.WEBSQL._driver, se.LOCALSTORAGE._driver],
                            le = ["dropInstance"],
                            de = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(le),
                            ce = {
                                description: "",
                                driver: oe.slice(),
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

                        function ge() {
                            for (var e = 1; e < arguments.length; e++) {
                                var t = arguments[e];
                                if (t)
                                    for (var n in t) t.hasOwnProperty(n) && (arguments[0][n] = ie(t[n]) ? t[n].slice() : t[n])
                            }
                            return arguments[0]
                        }
                        var pe = function() {
                                function e(t) {
                                    for (var n in function(e, t) {
                                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                        }(this, e), se)
                                        if (se.hasOwnProperty(n)) {
                                            var i = se[n],
                                                r = i._driver;
                                            this[n] = r, re[r] || this.defineDriver(i)
                                        }
                                    this._defaultConfig = ge({}, ce), this._config = ge({}, this._defaultConfig, t), this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch(function() {})
                                }
                                return e.prototype.config = function(e) {
                                    if ("object" === (void 0 === e ? "undefined" : i(e))) {
                                        if (this._ready) return new Error("Can't call config() after localforage has been used.");
                                        for (var t in e) {
                                            if ("storeName" === t && (e[t] = e[t].replace(/\W/g, "_")), "version" === t && "number" != typeof e[t]) return new Error("Database version must be a number.");
                                            this._config[t] = e[t]
                                        }
                                        return !("driver" in e) || !e.driver || this.setDriver(this._config.driver)
                                    }
                                    return "string" == typeof e ? this._config[e] : this._config
                                }, e.prototype.defineDriver = function(e, t, n) {
                                    var i = new o(function(t, n) {
                                        try {
                                            var i = e._driver,
                                                r = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                                            if (!e._driver) return void n(r);
                                            for (var a = de.concat("_initStorage"), s = 0, d = a.length; s < d; s++) {
                                                var c = a[s];
                                                if ((!ne(le, c) || e[c]) && "function" != typeof e[c]) return void n(r)
                                            }! function() {
                                                for (var t = function(e) {
                                                        return function() {
                                                            var t = new Error("Method " + e + " is not implemented by the current driver"),
                                                                n = o.reject(t);
                                                            return l(n, arguments[arguments.length - 1]), n
                                                        }
                                                    }, n = 0, i = le.length; n < i; n++) {
                                                    var r = le[n];
                                                    e[r] || (e[r] = t(r))
                                                }
                                            }();
                                            var u = function(n) {
                                                re[i] && console.info("Redefining LocalForage driver: " + i), re[i] = e, ae[i] = n, t()
                                            };
                                            "_support" in e ? e._support && "function" == typeof e._support ? e._support().then(u, n) : u(!!e._support) : u(!0)
                                        } catch (e) {
                                            n(e)
                                        }
                                    });
                                    return d(i, t, n), i
                                }, e.prototype.driver = function() {
                                    return this._driver || null
                                }, e.prototype.getDriver = function(e, t, n) {
                                    var i = re[e] ? o.resolve(re[e]) : o.reject(new Error("Driver not found."));
                                    return d(i, t, n), i
                                }, e.prototype.getSerializer = function(e) {
                                    var t = o.resolve(Y);
                                    return d(t, e), t
                                }, e.prototype.ready = function(e) {
                                    var t = this,
                                        n = t._driverSet.then(function() {
                                            return null === t._ready && (t._ready = t._initDriver()), t._ready
                                        });
                                    return d(n, e, e), n
                                }, e.prototype.setDriver = function(e, t, n) {
                                    var i = this;
                                    ie(e) || (e = [e]);
                                    var r = this._getSupportedDrivers(e);

                                    function a() {
                                        i._config.driver = i.driver()
                                    }

                                    function s(e) {
                                        return i._extend(e), a(), i._ready = i._initStorage(i._config), i._ready
                                    }
                                    var l = null !== this._driverSet ? this._driverSet.catch(function() {
                                        return o.resolve()
                                    }) : o.resolve();
                                    return this._driverSet = l.then(function() {
                                        var e = r[0];
                                        return i._dbInfo = null, i._ready = null, i.getDriver(e).then(function(e) {
                                            i._driver = e._driver, a(), i._wrapLibraryMethodsWithReady(), i._initDriver = function(e) {
                                                return function() {
                                                    var t = 0;
                                                    return function n() {
                                                        for (; t < e.length;) {
                                                            var r = e[t];
                                                            return t++, i._dbInfo = null, i._ready = null, i.getDriver(r).then(s).catch(n)
                                                        }
                                                        a();
                                                        var l = new Error("No available storage method found.");
                                                        return i._driverSet = o.reject(l), i._driverSet
                                                    }()
                                                }
                                            }(r)
                                        })
                                    }).catch(function() {
                                        a();
                                        var e = new Error("No available storage method found.");
                                        return i._driverSet = o.reject(e), i._driverSet
                                    }), d(this._driverSet, t, n), this._driverSet
                                }, e.prototype.supports = function(e) {
                                    return !!ae[e]
                                }, e.prototype._extend = function(e) {
                                    ge(this, e)
                                }, e.prototype._getSupportedDrivers = function(e) {
                                    for (var t = [], n = 0, i = e.length; n < i; n++) {
                                        var r = e[n];
                                        this.supports(r) && t.push(r)
                                    }
                                    return t
                                }, e.prototype._wrapLibraryMethodsWithReady = function() {
                                    for (var e = 0, t = de.length; e < t; e++) ue(this, de[e])
                                }, e.prototype.createInstance = function(t) {
                                    return new e(t)
                                }, e
                            }(),
                            me = new pe;
                        t.exports = me
                    }, {
                        3: 3
                    }]
                }, {}, [4])(4)
            },
            596(e, t, n) {
                var i = n(634).VR,
                    r = n(634).pS;
                let a;
                e.exports = "function" == typeof queueMicrotask ? queueMicrotask.bind("undefined" != typeof window ? window : n.g) : e => (a || (a = i.resolve())).then(e).catch(e => r(() => {
                    throw e
                }, 0))
            },
            372(e, t, n) {
                e.exports = function(e, t, n) {
                    if ("number" != typeof t) throw new Error("second argument must be a Number");
                    let r, a, s, o, l, d, c = !0;

                    function u(e) {
                        function t() {
                            n && n(e, r), n = null
                        }
                        c ? i(t) : t()
                    }

                    function g(t, n, i) {
                        if (r[t] = i, n && (l = !0), 0 === --s || n) u(n);
                        else if (!l && d < a) {
                            let t;
                            o ? (t = o[d], d += 1, e[t](function(e, n) {
                                g(t, e, n)
                            })) : (t = d, d += 1, e[t](function(e, n) {
                                g(t, e, n)
                            }))
                        }
                    }
                    Array.isArray(e) ? (r = [], s = a = e.length) : (o = Object.keys(e), r = {}, s = a = o.length), d = t, s ? o ? o.some(function(n, i) {
                        return e[n](function(e, t) {
                            g(n, e, t)
                        }), i === t - 1
                    }) : e.some(function(e, n) {
                        return e(function(e, t) {
                            g(n, e, t)
                        }), n === t - 1
                    }) : u(null), c = !1
                };
                const i = n(596)
            },
            634(e, t, n) {
                "use strict";
                var i, r, a, s, o, l, d, c, u, g, p, m, h;
                n.d(t, {
                    Dg() {
                        return I
                    },
                    Kj() {
                        return y
                    },
                    LK() {
                        return _
                    },
                    VR() {
                        return T
                    },
                    pS() {
                        return S
                    },
                    wm() {
                        return b
                    }
                });
                const v = "undefined" != typeof window ? window : "undefined" != typeof self ? self : "undefined" != typeof globalThis ? globalThis : {},
                    f = null !== (i = v.__moe_original_methods__) && void 0 !== i ? i : {},
                    E = "__zone_symbol__",
                    S = null !== (a = null !== (r = f.setTimeout) && void 0 !== r ? r : v[`${E}setTimeout`]) && void 0 !== a ? a : v.setTimeout,
                    y = null !== (o = null !== (s = f.clearTimeout) && void 0 !== s ? s : v[`${E}clearTimeout`]) && void 0 !== o ? o : v.clearTimeout,
                    _ = null !== (d = null !== (l = f.setInterval) && void 0 !== l ? l : v[`${E}setInterval`]) && void 0 !== d ? d : v.setInterval,
                    b = null !== (u = null !== (c = f.clearInterval) && void 0 !== c ? c : v[`${E}clearInterval`]) && void 0 !== u ? u : v.clearInterval,
                    T = null !== (p = null !== (g = f.Promise) && void 0 !== g ? g : v[`${E}Promise`]) && void 0 !== p ? p : v.Promise,
                    I = null !== (h = null !== (m = f.MutationObserver) && void 0 !== m ? m : v[`${E}MutationObserver`]) && void 0 !== h ? h : v.MutationObserver
            }
        },
        t = {};

    function n(i) {
        var r = t[i];
        if (void 0 !== r) return r.exports;
        var a = t[i] = {
            exports: {}
        };
        return e[i](a, a.exports, n), a.exports
    }
    n.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return n.d(t, {
            a: t
        }), t
    }, n.d = (e, t) => {
        for (var i in t) n.o(t, i) && !n.o(e, i) && Object.defineProperty(e, i, {
            enumerable: !0,
            get: t[i]
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
            t = n.n(e);
        const i = "v2/device/add",
            r = "v1/sdk_logging/",
            a = "USER_ATTRIBUTE_UNIQUE_ID",
            s = "USER_ATTRIBUTE_USER_EMAIL",
            o = "USER_ATTRIBUTE_USER_MOBILE",
            l = [a, "USER_ID_MODIFIED_FROM"],
            d = [{
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
            c = "moe_push_opted",
            u = "identifiers",
            g = "uid",
            p = "SESSION",
            m = "sessionKey",
            h = "moeReferrer",
            v = "moe_referrer",
            f = /^www\./,
            E = ["http:", "https:"],
            S = "MOE_LIFECYCLE",
            y = "SDK_INITIALIZED",
            _ = "SETTINGS_FETCHED",
            b = "DEVICE_UUID",
            T = "SDK_INITIALIZATION_COMPLETED",
            I = "SDK_DISABLED",
            A = "SDK_ENABLED",
            w = "DATA_TRACKING_DISABLED",
            O = "DATA_TRACKING_ENABLED",
            D = "OSM_INITIALIZED",
            R = "WEBP_INITIALIZED",
            C = "LANDING_PAGE_DEVICE_ADD",
            L = "MOE_STORAGE_UPDATED",
            P = "HARD_ASK_SHOWN",
            N = "HARD_ASK_DISMISSED",
            k = "HARD_ASK_ATTEMPTED",
            M = "HARD_ASK_ALLOWED",
            B = "HARD_ASK_DENIED",
            U = "SOFT_ASK_SHOWN",
            x = "SOFT_ASK_DISMISSED",
            F = "SOFT_ASK_ALLOWED",
            V = "USER_LIFECYCLE",
            W = "USER_IDENTITY_UPDATE",
            H = "LOGOUT",
            G = "SPA",
            $ = "PAGE_CHANGED",
            j = "MESSAGE_LOGGED",
            K = {
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
            q = {
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
            Y = {
                TV: "tv",
                TABLET: "tablet",
                MOBILE: "mobile",
                WEB: "web"
            },
            z = "number",
            J = "moe-web-assist-plugin-chrome-ext",
            Q = {
                USER_ATTRIBUTE: "EVENT_ACTION_USER_ATTRIBUTE",
                UNSUBSCRIBED: "MOE_WEB_UNSUBSCRIBED",
                WEB_SESSION_START: "EVENT_ACTION_WEB_SESSION_START",
                PAGE_VIEWED: "MOE_PAGE_VIEWED",
                WEB_OPTIN_BANNER_LOAD: "MOE_WEB_OPTIN_BANNER_LOAD",
                WEB_OPTIN_CLOSED: "MOE_WEB_OPTIN_CLOSED",
                WEB_OPTIN_ACCEPTED: "MOE_WEB_OPTIN_ACCEPTED",
                USER_SUBSCRIBED: "MOE_USER_SUBSCRIBED",
                OPT_IN_SHOWN: "MOE_OPT_IN_SHOWN",
                OPT_IN_ALLOWED: "MOE_OPT_IN_ALLOWED",
                OPT_IN_DISMISSED: "MOE_OPT_IN_DISMISSED",
                OPT_IN_BLOCKED: "MOE_OPT_IN_BLOCKED",
                OPT_IN_ATTEMPT: "MOE_OPT_IN_ATTEMPT",
                LOGOUT: "MOE_LOGOUT",
                DEVICE_ATTRIBUTE: "EVENT_ACTION_DEVICE_ATTRIBUTE",
                PERMISSION_ALLOWED: "MOE_PUSH_PERMISSION_STATE_ALLOWED",
                PERMISSION_BLOCKED: "MOE_PUSH_PERMISSION_STATE_BLOCKED",
                MOE_PAGE_EXIT: "MOE_PAGE_EXIT",
                MOE_PAGE_SCROLL: "MOE_PAGE_SCROLL",
                MOE_PAGE_URL_EVENT: "MOE_PAGE_URL_EVENT",
                MOE_EXIT: "MOE_EXIT"
            },
            X = "Setup",
            Z = "Track",
            ee = "Info",
            te = "https://www.moengage.com/docs/developer-guide",
            ne = {
                MOE_DASHBOARD: "https://dashboard.moengage.com",
                WEBSDK_DOCS: te + "/web-sdk/web-sdk-integration/basic-integration/web-sdk-integration",
                SELF_HANDLED_WEB_PUSH: te + "/web-sdk/web-push/configure-self-handled-opt-in",
                EVENTS_TRACKING: te + "/web-sdk/data-tracking/web-sdk-events-tracking",
                USER_ATTRIBUTES_TRACKING: te + "/web-sdk/data-tracking/web-sdk-user-attributes-tracking",
                BOTS_BLOCKING: te + "/web-sdk/web-sdk-integration/advanced-integration/bot-traffic-blocking",
                COMPATIBILITY_MATRIX: te + "/web-sdk/web-sdk-overview/web-sdk-browser-compatibility-matrix",
                LIFECYCLE_CALLBACKS: te + "/web-sdk/web-sdk-integration/advanced-integration/web-sdk-lifecycle-callbacks",
                WEB_PUSH: te + "/web-sdk/web-push/configure-and-integrate-web-push",
                PUSH_COMPATIBILITY_MATRIX: te + "/web-sdk/web-push/web-push-overview",
                WEB_PERSONALIZATION: te + "/personalize-sdk/sdk-integration/web-personalization-v2",
                WEB_OPT_OUT: te + "/web-sdk/web-sdk-integration/advanced-integration/web-sdk-opt-out",
                DATA_OPT_OUT: te + "/web-sdk/data-tracking/configure-data-opt-out-in-web-sdk"
            },
            ie = "Dashboard --\x3e Settings --\x3e Channel --\x3e Push",
            re = "moe_uuid",
            ae = "moe_uuid",
            se = "MoengagePageEventHistoryManager",
            oe = ["moe-card=1"],
            le = "moe-floating-icon-iframe",
            de = "moe-floating-icon",
            ce = "web_personalization",
            ue = {
                TEST: "TEST",
                LIVE: "LIVE"
            },
            ge = {
                NONE: 0,
                LIMITED: 1,
                ALL: 2
            },
            pe = "NONE",
            me = "LIMITED",
            he = "ALL",
            ve = [ge.NONE, ge.LIMITED, ge.ALL],
            fe = {
                CARDS: {
                    name: "CARDS",
                    src: "https://cdn.moengage.com/release/dc_3/versions/2.81.01/moe_webSdk_cards.min.latest.js",
                    windowLocation: "moeCards"
                }
            },
            Ee = {
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
            Se = "initData",
            ye = "browserDetails",
            _e = "unifiedLogs",
            be = "hasUserLoggedOut",
            Te = "landingPageTracking",
            Ie = "COOKIE_SHARING",
            Ae = "moe_tracking",
            we = "moe_tracking_store",
            Oe = "events",
            De = "batched_events",
            Re = "events",
            Ce = "batched_events",
            Le = "moe_database",
            Pe = "moe_data",
            Ne = [Ee.DEVICE_DATA],
            ke = ["Google Chrome", "Mozilla Firefox", "Opera", "Apple Safari", "Edge"];

        function Me(e, t, n) {
            return null != e && t ? (e = e[(t = Array.isArray(t) ? t : t.split("."))[0]]) && t.length > 1 ? Me(e, t.slice(1), n) : void 0 === e ? n || null : e : null
        }

        function Be(e, t, n) {
            if (null == e || !t) return void 0 !== n ? n : void 0;
            const i = e[(t = Array.isArray(t) ? t : t.split("."))[0]];
            return null != i && t.length > 1 ? Be(i, t.slice(1), n) : null == i ? void 0 !== n ? n : void 0 : i
        }
        class Ue {
            static set(e, t) {
                window && (window.moeInternals ? (window.moeInternals.ephemeral || (window.moeInternals.ephemeral = {}), window.moeInternals.ephemeral[e] = t) : (window.moeInternals = {}, window.moeInternals.ephemeral = {}, window.moeInternals.ephemeral[e] = t))
            }
            static get(e) {
                return Me(window, "moeInternals.ephemeral." + e, null)
            }
            static clear() {
                window && (window.moeInternals = {}, window.moeInternals.ephemeral = {})
            }
        }
        Ue.baseLogTag = "EphemeralStorage";
        const xe = Ue;
        var Fe = n(634).VR;

        function Ve(e, t, n, i) {
            return new(n || (n = Fe))(function(r, a) {
                function s(e) {
                    try {
                        l(i.next(e))
                    } catch (e) {
                        a(e)
                    }
                }

                function o(e) {
                    try {
                        l(i.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n(function(e) {
                        e(t)
                    })).then(s, o)
                }
                l((i = i.apply(e, t || [])).next())
            })
        }

        function We() {
            return window[window.moengage_object || "Moengage"]
        }

        function He() {
            const e = navigator.userAgent;
            return !(!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e) && !/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4)))
        }

        function Ge() {
            const e = navigator.userAgent.toLowerCase(),
                t = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(e);
            return /nexus player|neo-x5|adt-2|tsbnettv|roku|tizen|smart-tv.+(samsung)|hbbtv.+maple;(\d+)|(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))|(apple) ?tv|crkey|droid.+aft(\w)( bui|\))|\(dtv[\);].+(aquos)|(aquos-tv[\w ]+)\)|(bravia[\w ]+)( bui|\))|(mitv-\w{5}) bui|Hbbtv.*(technisat) (.*);|\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)|hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)|\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b|vizio smartcast|conjure\/\d+|smartcast/i.test(e) ? Y.TV : t ? Y.TABLET : He() ? Y.MOBILE : Y.WEB
        }

        function $e(e, t) {
            const n = t && new RegExp("^(" + t.join("|") + ")$");
            return Ge() !== Y.TV || !(null == n ? void 0 : n.test(e)) && t ? {} : {
                moe_os_type: je(),
                os: Y.TV.toUpperCase()
            }
        }

        function je() {
            const e = navigator.userAgent.toLowerCase();
            return /tizen/i.test(e) ? "Tizen" : /web0s/i.test(e) ? "WebOS" : /xbox/i.test(e) ? "Xbox" : /vizio/i.test(e) ? "viziotv" : "SmartTV"
        }

        function Ke(e, t) {
            const n = e.toLowerCase();
            if (n.indexOf("windows") > -1) return n.indexOf("windows nt 11.0") > -1 ? {
                name: "Windows",
                version: "11",
                fullVersion: "Windows 11"
            } : n.indexOf("windows nt 10.0") > -1 ? {
                name: "Windows",
                version: "10",
                fullVersion: "Windows 10"
            } : n.indexOf("windows nt 6.3") > -1 ? {
                name: "Windows",
                version: "8.1",
                fullVersion: "Windows 8.1"
            } : n.indexOf("windows nt 6.2") > -1 ? {
                name: "Windows",
                version: "8",
                fullVersion: "Windows 8"
            } : n.indexOf("windows nt 6.1") > -1 ? {
                name: "Windows",
                version: "7",
                fullVersion: "Windows 7"
            } : n.indexOf("windows nt 6.0") > -1 ? {
                name: "Windows",
                version: "Vista",
                fullVersion: "Windows Vista"
            } : n.indexOf("windows nt 5.1") > -1 || n.indexOf("windows xp") > -1 ? {
                name: "Windows",
                version: "XP",
                fullVersion: "Windows XP"
            } : {
                name: "Windows",
                version: "Unknown",
                fullVersion: "Windows"
            };
            if (n.indexOf("iphone") > -1 || n.indexOf("ipad") > -1 || n.indexOf("ipod") > -1) {
                const e = n.match(/os (\d+)[_.](\d+)([_.]\d+)?/);
                if (e) {
                    const t = e[1],
                        n = e[2] || "0",
                        i = "0" !== n ? `${t}.${n}` : t;
                    return {
                        name: "iOS",
                        version: i,
                        fullVersion: `iOS ${i}`
                    }
                }
                return {
                    name: "iOS",
                    version: "Unknown",
                    fullVersion: "iOS"
                }
            }
            if (n.indexOf("mac os x") > -1) {
                const e = n.match(/mac os x (\d+)(?:[_.](\d+))?(?:[_.](\d+))?/);
                if (e) {
                    const t = e[1],
                        n = e[2],
                        i = e[3],
                        r = null != n && "" !== n ? null != i && "" !== i ? `${t}.${n}.${i}` : `${t}.${n}` : t;
                    return {
                        name: "macOS",
                        version: r,
                        fullVersion: `macOS ${r}`
                    }
                }
                return {
                    name: "macOS",
                    version: "Unknown",
                    fullVersion: "macOS"
                }
            }
            if (n.indexOf("android") > -1) {
                const e = n.match(/android[\s/](\d+)\.?(\d+)?/);
                if (e) {
                    const t = e[1],
                        n = e[2] || "0",
                        i = "0" !== n ? `${t}.${n}` : t;
                    return {
                        name: "Android",
                        version: i,
                        fullVersion: `Android ${i}`
                    }
                }
                return {
                    name: "Android",
                    version: "Unknown",
                    fullVersion: "Android"
                }
            }
            if (n.indexOf("cros") > -1) {
                const e = n.match(/cros\s[\w]+\s([\d.]+)/);
                if (e) {
                    const t = e[1];
                    return {
                        name: "Chrome OS",
                        version: t,
                        fullVersion: `Chrome OS ${t}`
                    }
                }
                return {
                    name: "Chrome OS",
                    version: "Unknown",
                    fullVersion: "Chrome OS"
                }
            }
            return n.indexOf("linux") > -1 ? {
                name: "Linux",
                version: "Unknown",
                fullVersion: "Linux"
            } : {
                name: "Unknown",
                version: "Unknown",
                fullVersion: "Unknown"
            }
        }

        function qe(e, t) {
            return function(e, t) {
                if ("macOS" !== t.name) return t;
                const n = t.version;
                if ("10.15" !== n && !n.startsWith("10.15.")) return t;
                const i = e;
                if (/firefox\//i.test(i)) return {
                    name: "macOS",
                    version: "Unknown",
                    fullVersion: "macOS"
                };
                const r = /(chrome|crios|chromium|edg\/)/i.test(i);
                return /safari/i.test(i) && !r ? {
                    name: "macOS",
                    version: "Unknown",
                    fullVersion: "macOS"
                } : t
            }(e, Ke(e))
        }
        "function" == typeof SuppressedError && SuppressedError;
        class Ye {
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
            static log(e, t, n, i, ...r) {
                !this.isTrackingEnabled || e !== this.logLevel && "verbose" !== this.logLevel || We().remoteLogs.addRemoteLogs(this.logData(e, {
                    msg: n + [...r].toString(),
                    file_name: t,
                    trace: i
                }))
            }
        }
        const ze = (e, t) => `"${e}" is deprecated. Please use "${t}" instead.`,
            Je = (e, t) => `The "${e}" parameter is deprecated. Use "${t}" instead.`,
            Qe = e => `Not tracking ${e} as Web SDK has been disabled.`,
            Xe = "Web SDK is disabled",
            Ze = "MoEngage storage was not found",
            et = "Make sure you are not deleting or manipulating MOE_DATA in the localStorage.",
            tt = (e, t, n) => `Something went wrong while getting payload for ${e} ${t}. ${"string"==typeof n?n:JSON.stringify(n)}`,
            nt = (e, t = "") => `Can not render ${e}${t}`,
            it = "Promises not supported",
            rt = "appId not specified",
            at = "Data tracking is disabled",
            st = "Error in getting Web SDK Settings",
            ot = "Error parsing JSON string:",
            lt = "Push token not found",
            dt = "Web push settings not configured",
            ct = "Service worker scope mismatch",
            ut = "Serviceworker registered",
            gt = "Serviceworker ready",
            pt = "Could not fetch OSM campaign",
            mt = "Error delivering messaging campaign",
            ht = e => `Added Position Styles for CampaignId: ${e}`,
            vt = e => `Failed adding Styles for CampaignId: ${e}`,
            ft = (e, t) => `Campaign: ${e}, triggered by event: ${t}, is eligible for further processing`,
            Et = (e, t) => `The event: ${e} breaks secondary conditons of the campaign: ${t}. Removing the campaign from secondary stores and clearing any setTimeout associated to it`;

        function St(e, t) {
            const n = yt(e, t);
            return n >= 0 ? e.attributes[n].value : null
        }

        function yt(e, t) {
            var n;
            const i = (null == e ? void 0 : e.attributes) || [];
            for (let e = i.length - 1; e >= 0; e--)
                if ((null === (n = i[e]) || void 0 === n ? void 0 : n.key) === t) return e;
            return -1
        }

        function _t(e) {
            return St(e, a)
        }

        function bt(e, t, n) {
            if (null == t) return e;
            const i = Object.assign({}, t),
                r = i.attributes,
                a = null == e ? void 0 : e.attributes;
            if (!Array.isArray(r) || !Array.isArray(a) || 0 === a.length) return i;
            const s = [...a];
            return r.forEach(e => {
                const t = s.findIndex(t => t.key === e.key && t.level === e.level);
                t >= 0 ? s[t] = e : s.push(e)
            }), i.attributes = s.filter(e => !n(e.key) || r.some(t => t.key === e.key && t.level === e.level)), i
        }

        function Tt(e, t) {
            return !(e !== s && e !== o && !t.includes(e))
        }
        const It = "initDataHelpers",
            At = (e, t) => null != Me(e, "debug_logs", null) ? t : ge.NONE,
            wt = {
                GTM: "GTM",
                FLUTTER: "Flutter",
                SEGMENT: "Segment",
                AMP: "AMP",
                NPM: "NPM",
                CHROME_EXTENSION: "Chrome extension",
                TV: "TV",
                VTEX: "VTEX",
                SHOPIFY: "Shopify",
                MOENGAGE_ASSIST: "MoEngage Assist plugin",
                CDN: "CDN"
            };
        class Ot {
            constructor(e) {
                this.debugLevel = 0, this.sdkEnvironment = ue.LIVE, this.logLevel = ge.NONE, this.cluster = null, this.environment = null, this.baseDomainName = "https://sdk-01.moengage.com/", this.inapp = null, this.customSoftAsk = null, this.nativeMethodsUsed = !1;
                const t = Ot.baseLogTag + ".constructor";
                null != Me(e, "appId", null) ? this.appId = Me(e, "appId", null) : null != Me(e, "app_id", null) ? (pi.warn(2, t, Je("app_id", "appId")), this.appId = Me(e, "app_id", null)) : pi.errorAndBroadcast(1, t, X, rt, "Please check the dev documentation to complete the integration.", ne.WEBSDK_DOCS, ne.WEBSDK_DOCS), this.debugLevel = null != Me(e, "debug_logs", null) ? Me(e, "debug_logs", 0) : null != Me(e, "debugLevel", null) ? Me(e, "debugLevel", 0) : 0;
                const n = Me(e, "env", null),
                    i = Me(e, "logLevel", null);
                if (((e, t, n) => {
                        const i = It + ".warnIfDeprecatedDebugLogsUsed";
                        null == t && null == n || null == Me(e, "debug_logs", null) || pi.warn(1, i, 'The "debug_logs" parameter is deprecated. Remove it and use "env" ("LIVE"/"TEST") and "logLevel" (0/1/2 or "NONE"/"LIMITED"/"ALL") instead.')
                    })(e, n, i), this.sdkEnvironment = ((e, t) => {
                        const n = It + ".parseSdkEnvironment";
                        if (null != e) {
                            const t = String(e).toUpperCase();
                            return t === ue.TEST || t === ue.LIVE ? t : (pi.warnAndBroadcast(1, n, X, "Invalid env value", `Invalid env value: "${e}". Must be "${ue.LIVE}" or "${ue.TEST}" (case-insensitive). Defaulting to "${ue.LIVE}".`, ne.WEBSDK_DOCS), ue.LIVE)
                        }
                        return t > 0 ? ue.TEST : ue.LIVE
                    })(n, this.debugLevel), this.logLevel = ((e, t, n) => {
                        const i = It + ".parseLogLevel";
                        return null != e ? "string" == typeof e ? ((e, t, n) => {
                            const i = It + ".parseLogLevelFromString",
                                r = e.toUpperCase();
                            return r === pe ? ge.NONE : r === me ? ge.LIMITED : r === he ? ge.ALL : (pi.warnAndBroadcast(1, i, X, "Invalid logLevel string", `Invalid logLevel string: "${e}". Must be "${pe}", "${me}", or "${he}" (case-insensitive). Using fallback value.`, ne.WEBSDK_DOCS), At(t, n))
                        })(e, t, n) : "number" == typeof e ? ((e, t, n) => {
                            const i = It + ".parseLogLevelFromNumber";
                            return ve.includes(e) ? e : (pi.warnAndBroadcast(1, i, X, "Invalid logLevel number", `Invalid logLevel number: ${e}. Must be ${ge.NONE} (no logs), ${ge.LIMITED} (limited logs only), or ${ge.ALL} (all logs). Using fallback value.`, ne.WEBSDK_DOCS), At(t, n))
                        })(e, t, n) : (pi.warnAndBroadcast(1, i, X, "Invalid logLevel type", `Invalid logLevel type: ${typeof e}. Must be number (${ge.NONE}, ${ge.LIMITED}, ${ge.ALL}) or string ("${pe}", "${me}", "${he}"). Using fallback value.`, ne.WEBSDK_DOCS), At(t, n)) : At(t, n)
                    })(i, e, this.debugLevel), this.appId) {
                    if (this.baseDomainName = "https://sdk-01.moengage.com/", this.forceSwUpdate = Me(e, "forceSwUpdate", !1), this.cluster = "DC_3", this.cluster = Me(e, "cluster", this.cluster), this.cluster && null != K[this.cluster.toUpperCase()] && (this.environment = K[this.cluster.toUpperCase()]), Me(e, "environment", null) && (this.environment = e.environment), this.environment && (this.baseDomainName = "https://" + this.environment + "/"), this.appId = ((e, t) => {
                            if (t === ue.TEST) {
                                if (e.indexOf("_DEBUG") < 0) return e + "_DEBUG"
                            } else if (t === ue.LIVE && e.indexOf("_DEBUG") >= 0) return e.substring(0, e.indexOf("_DEBUG"));
                            return e
                        })(this.appId, this.sdkEnvironment), this.swPath = Me(e, "swPath", null), null != e.customSoftAsk) this.customSoftAsk = {
                        mainClass: Me(e, "customSoftAsk.mainClass", null),
                        allowClass: Me(e, "customSoftAsk.allowClass", null),
                        dismissClass: Me(e, "customSoftAsk.dismissClass", null)
                    };
                    else {
                        null != Me(e, "soft_ask", null) && pi.warn(2, t, Je("soft_ask", "softAsk"));
                        const n = {
                            mainClass: null,
                            allowClass: null,
                            dismissClass: null
                        };
                        null != Me(e, "mainClass", null) ? n.mainClass = Me(e, "mainClass", null) : null != Me(e, "main_class", null) && (pi.warn(2, t, Je("main_class", "mainClass")), n.mainClass = Me(e, "main_class", null)), null != Me(e, "allowClass", null) ? n.allowClass = Me(e, "allowClass", null) : null != Me(e, "allow_class", null) && (pi.warn(2, t, Je("allow_class", "allowClass")), n.allowClass = Me(e, "allow_class", null)), null != Me(e, "dismissClass", null) ? n.dismissClass = Me(e, "dismissClass", null) : null != Me(e, "block_class", null) && (pi.warn(2, t, Je("block_class", "dismissClass")), n.dismissClass = Me(e, "block_class", null)), this.customSoftAsk = n
                    }
                    null != Me(e, "inapp.host", null) && (this.inapp = {
                        host: Me(e, "inapp.host", null)
                    }), null != Me(e, "swScope", null) && (this.swScope = Me(e, "swScope", null)), null != Me(e, "disableOnsite", null) ? this.disableOnsite = Me(e, "disableOnsite", !1) : null != Me(e, "disable_onsite", null) && (pi.warn(2, t, Je("disable_onsite", "disableOnsite")), this.disableOnsite = Me(e, "disable_onsite", !1)), null != Me(e, "enableSPA", null) && (this.enableSPA = Me(e, "enableSPA", !1)), null != Me(e, "cards", null) && (this.cards = Me(e, "cards", {})), null != Me(e, "botsList", null) ? this.botsList = Me(e, "botsList", null) : null != Me(e, "bots_list", null) && (pi.warn(2, t, Je("bots_list", "botsList")), this.botsList = Me(e, "bots_list", null)), null != Me(e, "disableWebPush", null) ? this.disableWebPush = Me(e, "disableWebPush", !1) : null != Me(e, "disable_web_push", null) && (pi.warn(2, t, Je("disable_web_push", "disableWebPush")), this.disableWebPush = Me(e, "disable_web_push", !1)), null != Me(e, "disableCookies", null) && (this.disableCookies = Me(e, "disableCookies", !1)), null != Me(e, "disableSdk", null) && (this.disableSdk = Me(e, "disableSdk", !1)), null != Me(e, "projectId", null) ? this.projectId = Me(e, "projectId", null) : null != Me(e, "project_id", null) && (pi.warn(2, t, Je("project_id", "projectId")), this.projectId = Me(e, "project_id", null));
                    const n = Me(e, "contentSecurityNonce", null);
                    "string" == typeof n && n.length && (this.contentSecurityNonce = n);
                    const i = Me(e, "customProxyDomain", null);
                    "string" == typeof i && i.length && (this.customProxyDomain = i, this.baseDomainName = this.baseDomainName.replace("moengage.com", this.customProxyDomain), this.environment && (this.environment = this.environment.replace("moengage.com", this.customProxyDomain)));
                    const r = null != Me(e, "integrationType", null);
                    this.integrationType = r ? Me(e, "integrationType", null) : function() {
                        var e, t;
                        return (null === (t = null === (e = window.chrome) || void 0 === e ? void 0 : e.runtime) || void 0 === t ? void 0 : t.id) ? wt.CHROME_EXTENSION : window.moeApp ? wt.SHOPIFY : Ge() === Y.TV ? wt.TV : window.analytics && window.analytics._VERSIONS ? wt.SEGMENT : wt.CDN
                    }(), pi.log(2, t, `SDK Integration Type resolved as: ${this.integrationType} (${r?"explicitly set":"auto-detected"})`), this.integrationVersion = Me(e, "integrationVersion", null)
                }
                this.nativeMethodsUsed = "undefined" != typeof window && "object" == typeof window.__moe_original_methods__ && "function" == typeof window.__moe_original_methods__.setTimeout, this.nativeMethodsUsed || "undefined" == typeof window || void 0 === window.Zone || pi.warn(1, t, "Native methods were not captured before the SDK loaded. Load sdk.moe_native_methods.js as the first <script> to avoid timer patching issues.")
            }
            static save(e) {
                const t = new Ot(e);
                xe.set(Se, t), Zn.set(Ee.INIT_DATA, t)
            }
            static get() {
                return xe.get(Se)
            }
            static setIntegrationType(e) {
                const t = Ot.get();
                t && (t.integrationType = e, xe.set(Se, t), Zn.set(Ee.INIT_DATA, t))
            }
            static setIntegrationVersion(e) {
                const t = Ot.get();
                t && (t.integrationVersion = e, xe.set(Se, t), Zn.set(Ee.INIT_DATA, t))
            }
        }
        Ot.baseLogTag = "InitData";
        const Dt = Ot;

        function Rt(e, t) {
            return !Dt.get().disableWebPush && e.isWebPushEnabled && ke.includes(t.name) && navigator.serviceWorker && "PushManager" in window && "Notification" in window
        }

        function Ct(e, t) {
            var n, i, r, a;
            return t.isChrome() || t.isOpera() || t.isEdge() || t.isSafari() ? "vapid" === (null === (n = null == e ? void 0 : e.chrome) || void 0 === n ? void 0 : n.subscriptionMode) && !!(null === (i = null == e ? void 0 : e.chrome) || void 0 === i ? void 0 : i.vapidPublicKey) || !1 : t.isFirefox() && "vapid" === (null === (r = null == e ? void 0 : e.firefox) || void 0 === r ? void 0 : r.subscriptionMode) && !!(null === (a = null == e ? void 0 : e.firefox) || void 0 === a ? void 0 : a.vapidPublicKey) || !1
        }

        function Lt() {
            var e;
            const t = null === (e = Dt.get()) || void 0 === e ? void 0 : e.swPath;
            return !(!t || !t.includes("tools/moengage"))
        }

        function Pt(e, t) {
            var n, i;
            return t.isChrome() || t.isOpera() || t.isEdge() || t.isSafari() ? (null === (n = null == e ? void 0 : e.chrome) || void 0 === n ? void 0 : n.vapidPublicKey) || "" : t.isFirefox() && (null === (i = null == e ? void 0 : e.firefox) || void 0 === i ? void 0 : i.vapidPublicKey) || ""
        }
        class Nt {
            constructor() {
                this.items = []
            }
            static enqueue(e, t) {
                const n = Nt.getLocalStorageQName(e);
                let i = new Nt;
                Zn.get(n) && (i = Zn.get(n)), i.items.push(t), i.items = i.items.slice(Math.max(i.items.length - 50, 0)), Zn.set(n, i)
            }
            static dequeue(e) {
                const t = Nt.getLocalStorageQName(e),
                    n = Zn.get(t);
                let i = null;
                return n && n.items.length > 0 && (i = n.items[0], n.items.splice(0, 1), Zn.set(t, n)), i
            }
            static isEmpty(e) {
                const t = Nt.getLocalStorageQName(e);
                return !(Zn.get(t) && Zn.get(t).items.length > 0)
            }
            static purge(e) {
                const t = `${this.baseLogTag}.purge`,
                    n = Nt.getLocalStorageQName(e);
                Nt.isEmpty(e) || Zn.remove(n), pi.log(2, t, `Queue "${e}" has been cleared.`)
            }
            static getLocalStorageQName(e) {
                return Ee.Q.PREFIX + "_" + e
            }
        }
        Nt.baseLogTag = "LocalQ";
        const kt = Nt,
            Mt = e => {
                if (e) {
                    const t = e.indexOf("?");
                    if (t < 0) return {};
                    const n = (e = e.slice(t + 1)).replace("?", "").split("&"),
                        i = {};
                    return n.forEach(e => {
                        const t = e.split("="),
                            n = t[0],
                            r = decodeURIComponent(t[1] || "");
                        i[n] ? "[object Array]" === Object.prototype.toString.call(i[n]) ? i[n].push(r) : i[n] = [i[n], r] : i[n] = r
                    }), JSON.parse(JSON.stringify(i))
                }
                return {}
            },
            Bt = e => (e || "").toLowerCase().replace(f, ""),
            Ut = e => {
                const t = Bt(e),
                    n = t.split(".");
                return n.length <= 2 ? t : n.slice(2 === n[n.length - 1].length && n[n.length - 2].length >= 2 && n[n.length - 2].length <= 3 ? -3 : -2).join(".")
            },
            xt = (e, t) => {
                if (!t) return e;
                "?" !== e[e.length - 1] && (e += "?");
                for (const n in t) t.hasOwnProperty(n) && null != t[n] && (e += n + "=" + encodeURIComponent(t[n]) + "&");
                return "&" === e[e.length - 1] && (e = e.slice(0, -1)), e
            };
        n(634);
        var Ft = Uint8Array,
            Vt = Uint16Array,
            Wt = Int32Array,
            Ht = new Ft([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
            Gt = new Ft([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
            $t = new Ft([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
            jt = function(e, t) {
                for (var n = new Vt(31), i = 0; i < 31; ++i) n[i] = t += 1 << e[i - 1];
                var r = new Wt(n[30]);
                for (i = 1; i < 30; ++i)
                    for (var a = n[i]; a < n[i + 1]; ++a) r[a] = a - n[i] << 5 | i;
                return {
                    b: n,
                    r
                }
            },
            Kt = jt(Ht, 2),
            qt = Kt.b,
            Yt = Kt.r;
        qt[28] = 258, Yt[258] = 28;
        for (var zt = jt(Gt, 0), Jt = zt.b, Qt = zt.r, Xt = new Vt(32768), Zt = 0; Zt < 32768; ++Zt) {
            var en = (43690 & Zt) >> 1 | (21845 & Zt) << 1;
            Xt[Zt] = ((65280 & (en = (61680 & (en = (52428 & en) >> 2 | (13107 & en) << 2)) >> 4 | (3855 & en) << 4)) >> 8 | (255 & en) << 8) >> 1
        }
        var tn = function(e, t, n) {
                for (var i = e.length, r = 0, a = new Vt(t); r < i; ++r) e[r] && ++a[e[r] - 1];
                var s, o = new Vt(t);
                for (r = 1; r < t; ++r) o[r] = o[r - 1] + a[r - 1] << 1;
                if (n) {
                    s = new Vt(1 << t);
                    var l = 15 - t;
                    for (r = 0; r < i; ++r)
                        if (e[r])
                            for (var d = r << 4 | e[r], c = t - e[r], u = o[e[r] - 1]++ << c, g = u | (1 << c) - 1; u <= g; ++u) s[Xt[u] >> l] = d
                } else
                    for (s = new Vt(i), r = 0; r < i; ++r) e[r] && (s[r] = Xt[o[e[r] - 1]++] >> 15 - e[r]);
                return s
            },
            nn = new Ft(288);
        for (Zt = 0; Zt < 144; ++Zt) nn[Zt] = 8;
        for (Zt = 144; Zt < 256; ++Zt) nn[Zt] = 9;
        for (Zt = 256; Zt < 280; ++Zt) nn[Zt] = 7;
        for (Zt = 280; Zt < 288; ++Zt) nn[Zt] = 8;
        var rn = new Ft(32);
        for (Zt = 0; Zt < 32; ++Zt) rn[Zt] = 5;
        var an = tn(nn, 9, 0),
            sn = tn(nn, 9, 1),
            on = tn(rn, 5, 0),
            ln = tn(rn, 5, 1),
            dn = function(e) {
                for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
                return t
            },
            cn = function(e, t, n) {
                var i = t / 8 | 0;
                return (e[i] | e[i + 1] << 8) >> (7 & t) & n
            },
            un = function(e, t) {
                var n = t / 8 | 0;
                return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (7 & t)
            },
            gn = function(e) {
                return (e + 7) / 8 | 0
            },
            pn = function(e, t, n) {
                return (null == t || t < 0) && (t = 0), (null == n || n > e.length) && (n = e.length), new Ft(e.subarray(t, n))
            },
            mn = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"],
            hn = function(e, t, n) {
                var i = new Error(t || mn[e]);
                if (i.code = e, Error.captureStackTrace && Error.captureStackTrace(i, hn), !n) throw i;
                return i
            },
            vn = function(e, t, n) {
                var i = t / 8 | 0;
                e[i] |= n <<= 7 & t, e[i + 1] |= n >> 8
            },
            fn = function(e, t, n) {
                var i = t / 8 | 0;
                e[i] |= n <<= 7 & t, e[i + 1] |= n >> 8, e[i + 2] |= n >> 16
            },
            En = function(e, t) {
                for (var n = [], i = 0; i < e.length; ++i) e[i] && n.push({
                    s: i,
                    f: e[i]
                });
                var r = n.length,
                    a = n.slice();
                if (!r) return {
                    t: An,
                    l: 0
                };
                if (1 == r) {
                    var s = new Ft(n[0].s + 1);
                    return s[n[0].s] = 1, {
                        t: s,
                        l: 1
                    }
                }
                n.sort(function(e, t) {
                    return e.f - t.f
                }), n.push({
                    s: -1,
                    f: 25001
                });
                var o = n[0],
                    l = n[1],
                    d = 0,
                    c = 1,
                    u = 2;
                for (n[0] = {
                        s: -1,
                        f: o.f + l.f,
                        l: o,
                        r: l
                    }; c != r - 1;) o = n[n[d].f < n[u].f ? d++ : u++], l = n[d != c && n[d].f < n[u].f ? d++ : u++], n[c++] = {
                    s: -1,
                    f: o.f + l.f,
                    l: o,
                    r: l
                };
                var g = a[0].s;
                for (i = 1; i < r; ++i) a[i].s > g && (g = a[i].s);
                var p = new Vt(g + 1),
                    m = Sn(n[c - 1], p, 0);
                if (m > t) {
                    i = 0;
                    var h = 0,
                        v = m - t,
                        f = 1 << v;
                    for (a.sort(function(e, t) {
                            return p[t.s] - p[e.s] || e.f - t.f
                        }); i < r; ++i) {
                        var E = a[i].s;
                        if (!(p[E] > t)) break;
                        h += f - (1 << m - p[E]), p[E] = t
                    }
                    for (h >>= v; h > 0;) {
                        var S = a[i].s;
                        p[S] < t ? h -= 1 << t - p[S]++ - 1 : ++i
                    }
                    for (; i >= 0 && h; --i) {
                        var y = a[i].s;
                        p[y] == t && (--p[y], ++h)
                    }
                    m = t
                }
                return {
                    t: new Ft(p),
                    l: m
                }
            },
            Sn = function(e, t, n) {
                return -1 == e.s ? Math.max(Sn(e.l, t, n + 1), Sn(e.r, t, n + 1)) : t[e.s] = n
            },
            yn = function(e) {
                for (var t = e.length; t && !e[--t];);
                for (var n = new Vt(++t), i = 0, r = e[0], a = 1, s = function(e) {
                        n[i++] = e
                    }, o = 1; o <= t; ++o)
                    if (e[o] == r && o != t) ++a;
                    else {
                        if (!r && a > 2) {
                            for (; a > 138; a -= 138) s(32754);
                            a > 2 && (s(a > 10 ? a - 11 << 5 | 28690 : a - 3 << 5 | 12305), a = 0)
                        } else if (a > 3) {
                            for (s(r), --a; a > 6; a -= 6) s(8304);
                            a > 2 && (s(a - 3 << 5 | 8208), a = 0)
                        }
                        for (; a--;) s(r);
                        a = 1, r = e[o]
                    }
                return {
                    c: n.subarray(0, i),
                    n: t
                }
            },
            _n = function(e, t) {
                for (var n = 0, i = 0; i < t.length; ++i) n += e[i] * t[i];
                return n
            },
            bn = function(e, t, n) {
                var i = n.length,
                    r = gn(t + 2);
                e[r] = 255 & i, e[r + 1] = i >> 8, e[r + 2] = 255 ^ e[r], e[r + 3] = 255 ^ e[r + 1];
                for (var a = 0; a < i; ++a) e[r + a + 4] = n[a];
                return 8 * (r + 4 + i)
            },
            Tn = function(e, t, n, i, r, a, s, o, l, d, c) {
                vn(t, c++, n), ++r[256];
                for (var u = En(r, 15), g = u.t, p = u.l, m = En(a, 15), h = m.t, v = m.l, f = yn(g), E = f.c, S = f.n, y = yn(h), _ = y.c, b = y.n, T = new Vt(19), I = 0; I < E.length; ++I) ++T[31 & E[I]];
                for (I = 0; I < _.length; ++I) ++T[31 & _[I]];
                for (var A = En(T, 7), w = A.t, O = A.l, D = 19; D > 4 && !w[$t[D - 1]]; --D);
                var R, C, L, P, N = d + 5 << 3,
                    k = _n(r, nn) + _n(a, rn) + s,
                    M = _n(r, g) + _n(a, h) + s + 14 + 3 * D + _n(T, w) + 2 * T[16] + 3 * T[17] + 7 * T[18];
                if (l >= 0 && N <= k && N <= M) return bn(t, c, e.subarray(l, l + d));
                if (vn(t, c, 1 + (M < k)), c += 2, M < k) {
                    R = tn(g, p, 0), C = g, L = tn(h, v, 0), P = h;
                    var B = tn(w, O, 0);
                    for (vn(t, c, S - 257), vn(t, c + 5, b - 1), vn(t, c + 10, D - 4), c += 14, I = 0; I < D; ++I) vn(t, c + 3 * I, w[$t[I]]);
                    c += 3 * D;
                    for (var U = [E, _], x = 0; x < 2; ++x) {
                        var F = U[x];
                        for (I = 0; I < F.length; ++I) vn(t, c, B[W = 31 & F[I]]), c += w[W], W > 15 && (vn(t, c, F[I] >> 5 & 127), c += F[I] >> 12)
                    }
                } else R = an, C = nn, L = on, P = rn;
                for (I = 0; I < o; ++I) {
                    var V = i[I];
                    if (V > 255) {
                        var W;
                        fn(t, c, R[257 + (W = V >> 18 & 31)]), c += C[W + 257], W > 7 && (vn(t, c, V >> 23 & 31), c += Ht[W]);
                        var H = 31 & V;
                        fn(t, c, L[H]), c += P[H], H > 3 && (fn(t, c, V >> 5 & 8191), c += Gt[H])
                    } else fn(t, c, R[V]), c += C[V]
                }
                return fn(t, c, R[256]), c + C[256]
            },
            In = new Wt([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]),
            An = new Ft(0);
        var wn = "undefined" != typeof TextEncoder && new TextEncoder,
            On = "undefined" != typeof TextDecoder && new TextDecoder;
        try {
            On.decode(An, {
                stream: !0
            })
        } catch (e) {}

        function Dn(e) {
            try {
                let n = e.replace(/-/g, "+").replace(/_/g, "/");
                for (; n.length % 4;) n += "=";
                const i = atob(n),
                    r = new Uint8Array(i.length);
                for (let e = 0; e < i.length; e++) r[e] = i.charCodeAt(e);
                return function(e, t) {
                    if (t) {
                        for (var n = "", i = 0; i < e.length; i += 16384) n += String.fromCharCode.apply(null, e.subarray(i, i + 16384));
                        return n
                    }
                    if (On) return On.decode(e);
                    var r = function(e) {
                            for (var t = "", n = 0;;) {
                                var i = e[n++],
                                    r = (i > 127) + (i > 223) + (i > 239);
                                if (n + r > e.length) return {
                                    s: t,
                                    r: pn(e, n - 1)
                                };
                                r ? 3 == r ? (i = ((15 & i) << 18 | (63 & e[n++]) << 12 | (63 & e[n++]) << 6 | 63 & e[n++]) - 65536, t += String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i)) : t += String.fromCharCode(1 & r ? (31 & i) << 6 | 63 & e[n++] : (15 & i) << 12 | (63 & e[n++]) << 6 | 63 & e[n++]) : t += String.fromCharCode(i)
                            }
                        }(e),
                        a = r.s;
                    return (n = r.r).length && hn(8), a
                }(function(e, t, n, i) {
                    var r = e.length,
                        a = i ? i.length : 0;
                    if (!r || t.f && !t.l) return n || new Ft(0);
                    var s = !n,
                        o = s || 2 != t.i,
                        l = t.i;
                    s && (n = new Ft(3 * r));
                    var d = function(e) {
                            var t = n.length;
                            if (e > t) {
                                var i = new Ft(Math.max(2 * t, e));
                                i.set(n), n = i
                            }
                        },
                        c = t.f || 0,
                        u = t.p || 0,
                        g = t.b || 0,
                        p = t.l,
                        m = t.d,
                        h = t.m,
                        v = t.n,
                        f = 8 * r;
                    do {
                        if (!p) {
                            c = cn(e, u, 1);
                            var E = cn(e, u + 1, 3);
                            if (u += 3, !E) {
                                var S = e[(C = gn(u) + 4) - 4] | e[C - 3] << 8,
                                    y = C + S;
                                if (y > r) {
                                    l && hn(0);
                                    break
                                }
                                o && d(g + S), n.set(e.subarray(C, y), g), t.b = g += S, t.p = u = 8 * y, t.f = c;
                                continue
                            }
                            if (1 == E) p = sn, m = ln, h = 9, v = 5;
                            else if (2 == E) {
                                var _ = cn(e, u, 31) + 257,
                                    b = cn(e, u + 10, 15) + 4,
                                    T = _ + cn(e, u + 5, 31) + 1;
                                u += 14;
                                for (var I = new Ft(T), A = new Ft(19), w = 0; w < b; ++w) A[$t[w]] = cn(e, u + 3 * w, 7);
                                u += 3 * b;
                                var O = dn(A),
                                    D = (1 << O) - 1,
                                    R = tn(A, O, 1);
                                for (w = 0; w < T;) {
                                    var C, L = R[cn(e, u, D)];
                                    if (u += 15 & L, (C = L >> 4) < 16) I[w++] = C;
                                    else {
                                        var P = 0,
                                            N = 0;
                                        for (16 == C ? (N = 3 + cn(e, u, 3), u += 2, P = I[w - 1]) : 17 == C ? (N = 3 + cn(e, u, 7), u += 3) : 18 == C && (N = 11 + cn(e, u, 127), u += 7); N--;) I[w++] = P
                                    }
                                }
                                var k = I.subarray(0, _),
                                    M = I.subarray(_);
                                h = dn(k), v = dn(M), p = tn(k, h, 1), m = tn(M, v, 1)
                            } else hn(1);
                            if (u > f) {
                                l && hn(0);
                                break
                            }
                        }
                        o && d(g + 131072);
                        for (var B = (1 << h) - 1, U = (1 << v) - 1, x = u;; x = u) {
                            var F = (P = p[un(e, u) & B]) >> 4;
                            if ((u += 15 & P) > f) {
                                l && hn(0);
                                break
                            }
                            if (P || hn(2), F < 256) n[g++] = F;
                            else {
                                if (256 == F) {
                                    x = u, p = null;
                                    break
                                }
                                var V = F - 254;
                                F > 264 && (V = cn(e, u, (1 << (G = Ht[w = F - 257])) - 1) + qt[w], u += G);
                                var W = m[un(e, u) & U],
                                    H = W >> 4;
                                if (W || hn(3), u += 15 & W, M = Jt[H], H > 3) {
                                    var G = Gt[H];
                                    M += un(e, u) & (1 << G) - 1, u += G
                                }
                                if (u > f) {
                                    l && hn(0);
                                    break
                                }
                                o && d(g + 131072);
                                var $ = g + V;
                                if (g < M) {
                                    var j = a - M,
                                        K = Math.min(M, $);
                                    for (j + g < 0 && hn(3); g < K; ++g) n[g] = i[j + g]
                                }
                                for (; g < $; ++g) n[g] = n[g - M]
                            }
                        }
                        t.l = p, t.p = x, t.b = g, t.f = c, p && (c = 1, t.m = h, t.d = m, t.n = v)
                    } while (!c);
                    return g != n.length && s ? pn(n, 0, g) : n.subarray(0, g)
                }(r, {
                    i: 2
                }, t && t.out, t && t.dictionary))
            } catch (e) {
                return null
            }
            var t
        }

        function Rn(e) {
            if ("undefined" == typeof document) return null;
            const t = e + "=",
                n = document.cookie.split(";");
            for (let e = 0; e < n.length; e++) {
                const i = n[e].trim();
                if (0 === i.indexOf(t)) {
                    const e = i.substring(t.length);
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
            SUBSCRIPTION_DETAILS_KEYS: Cn,
            USER_DATA_KEYS: Ln,
            ATTRIBUTE_KEYS: Pn,
            IDENTITY_MAP_KEYS: Nn,
            SESSION_KEYS: kn,
            SOURCE_KEYS: Mn,
            DEVICE_DATA_KEYS: Bn
        } = q;

        function Un(e) {
            if (!e) return e;
            const {
                domain: t,
                token: n,
                endpoint: i,
                keys: r,
                p256dh: a,
                auth: s
            } = Cn, o = {};
            return e[t] && (o.domain = e[t]), e[n] && (o.token = e[n]), e[i] && (o.endpoint = "string" == typeof e[i] && e[i].startsWith("h://") ? e[i].replace("h://", "https://") : e[i]), e[r] && (o.keys = {}, e[r][a] && (o.keys.p256dh = e[r][a]), e[r][s] && (o.keys.auth = e[r][s])), o
        }

        function xn(e) {
            if (!e) return e;
            const {
                attributes: t,
                subscribedToOldSdk: n,
                deviceUuid: i,
                deviceAdded: r
            } = Ln, {
                key: a,
                value: s,
                updated_at: o,
                level: l
            } = Pn, c = {};
            return e[t] && (c.attributes = e[t].map(e => {
                const t = {};
                return e[a] && (t.key = function(e) {
                    const t = d.find(t => t.moeName === e);
                    return t ? t.attributeName : e
                }(e[a])), void 0 !== e[s] && (t.value = e[s]), void 0 !== e[o] && (t.updated_at = e[o]), void 0 !== e[l] && (t.level = e[l]), t
            })), void 0 !== e[n] && (c.subscribedToOldSdk = e[n]), e[i] && (c.deviceUuid = e[i]), void 0 !== e[r] && (c.deviceAdded = e[r]), c
        }

        function Fn(e) {
            if (!e) return e;
            const {
                userIdentities: t,
                previousIdentities: n,
                previousIdentitiesUpdatedTime: i
            } = Nn, r = {};
            return e[t] && (r.userIdentities = e[t]), e[n] && (r.previousIdentities = e[n]), void 0 !== e[i] && (r.previousIdentitiesUpdatedTime = e[i]), r
        }

        function Vn(e) {
            if (!e) return e;
            const {
                sessionKey: t,
                sessionStartTime: n,
                sessionMaxTime: i,
                customIdentifiersToTrack: r,
                sessionExpiryTime: a,
                numberOfSessions: s,
                currentSource: o,
                moeReferrer: l
            } = kn, d = {};
            return e[t] && (d.sessionKey = e[t]), e[n] && (d.sessionStartTime = e[n]), void 0 !== e[i] && (d.sessionMaxTime = e[i]), e[r] && (d.customIdentifiersToTrack = e[r]), void 0 !== e[a] && (d.sessionExpiryTime = e[a]), void 0 !== e[s] && (d.numberOfSessions = e[s]), e[o] && (d.currentSource = function(e) {
                if (!e) return e;
                const {
                    source: t,
                    medium: n,
                    source_url: i,
                    term: r,
                    campaign_name: a,
                    campaign_id: s,
                    content: o,
                    extra: l
                } = Mn, d = {};
                return e[t] && (d.source = e[t]), e[n] && (d.medium = e[n]), e[i] && (d.source_url = e[i]), e[r] && (d.term = e[r]), e[a] && (d.campaign_name = e[a]), e[s] && (d.campaign_id = e[s]), e[o] && (d.content = e[o]), e[l] && (d.extra = e[l]), d
            }(e[o])), e[l] && (d.moeReferrer = e[l]), d
        }
        class Wn {
            static getCompressedKeyName(e) {
                return q.COOKIE_NAME_MAPPING[e] || e
            }
            static getOriginalName(e) {
                return Wn.REVERSE_COOKIE_NAME_MAPPING[e] || e
            }
            static getCookieVersion(e, t) {
                if ([q.COOKIE_NAME_MAPPING[Ie], q.COOKIE_NAME_MAPPING[Ee.HARD_ASK_STATUS], q.COOKIE_NAME_MAPPING[Ee.SOFT_ASK_STATUS], re, q.COOKIE_NAME_MAPPING[Ee.OPT_IN_SHOWN_TIME], q.COOKIE_NAME_MAPPING[Ee.SDK_DISABLED], q.COOKIE_NAME_MAPPING[Ee.DATA_TRACKING_DISABLED]].includes(e)) return 3;
                if (Object.keys(q.COOKIE_NAME_MAPPING).includes(e)) return 1;
                if (Object.values(q.COOKIE_NAME_MAPPING).includes(e)) try {
                    let n;
                    try {
                        if (n = JSON.parse(t), Wn.hasV3Structure(n, e)) return 3;
                        if ("string" == typeof n) {
                            const e = Dn(n);
                            if (null !== e) try {
                                return JSON.parse(e), 3
                            } catch (e) {}
                        }
                        return 2
                    } catch (e) {
                        const i = Dn(t);
                        if (null !== i) try {
                            return n = JSON.parse(i), 3
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
                switch (Wn.getOriginalName(t)) {
                    case Ee.SUBSCRIPTION_DETAILS:
                        return e.e && "string" == typeof e.e && e.e.length <= 2;
                    case Ee.USER_DATA:
                        return e.d_uid || e.a && !Array.isArray(e.a) || !e.hasOwnProperty("a");
                    case Ee.IDENTITY_MAP:
                        return !e.hasOwnProperty("p_i") || !e.hasOwnProperty("p_i_u_t");
                    case Ee.SESSION:
                        return e.s_s_t && "number" == typeof e.s_s_t;
                    default:
                        return !1
                }
            }
            static getAllCookieNames(e) {
                const t = [e],
                    n = q.COOKIE_NAME_MAPPING[e];
                return n && n !== e && t.push(n), t
            }
            static compressValue(e, t) {
                if (null == e) return e;
                if ("object" != typeof e || Array.isArray(e)) return "boolean" == typeof e && [Ee.SDK_DISABLED, Ie, Ee.DATA_TRACKING_DISABLED].includes(t) ? e ? 1 : 0 : "string" == typeof e && Object.keys(q.PERMISSION_STATE_MAPPING).includes(e) ? q.PERMISSION_STATE_MAPPING[e] : e;
                const n = Wn.compressObjectV3(e, t);
                if (null === n) return null;
                const i = JSON.stringify(n),
                    r = function(e) {
                        try {
                            const n = (t = function(e) {
                                var t;
                                if (wn) return wn.encode(e);
                                var n = e.length,
                                    i = new Ft(e.length + (e.length >> 1)),
                                    r = 0,
                                    a = function(e) {
                                        i[r++] = e
                                    };
                                for (t = 0; t < n; ++t) {
                                    if (r + 5 > i.length) {
                                        var s = new Ft(r + 8 + (n - t << 1));
                                        s.set(i), i = s
                                    }
                                    var o = e.charCodeAt(t);
                                    o < 128 ? a(o) : o < 2048 ? (a(192 | o >> 6), a(128 | 63 & o)) : o > 55295 && o < 57344 ? (a(240 | (o = 65536 + (1047552 & o) | 1023 & e.charCodeAt(++t)) >> 18), a(128 | o >> 12 & 63), a(128 | o >> 6 & 63), a(128 | 63 & o)) : (a(224 | o >> 12), a(128 | o >> 6 & 63), a(128 | 63 & o))
                                }
                                return pn(i, 0, r)
                            }(e), function(e, t, n, i, r) {
                                if (!r && (r = {
                                        l: 1
                                    }, t.dictionary)) {
                                    var a = t.dictionary.subarray(-32768),
                                        s = new Ft(a.length + e.length);
                                    s.set(a), s.set(e, a.length), e = s, r.w = a.length
                                }
                                return function(e, t, n, i, r, a) {
                                    var s = a.z || e.length,
                                        o = new Ft(i + s + 5 * (1 + Math.ceil(s / 7e3)) + r),
                                        l = o.subarray(i, o.length - r),
                                        d = a.l,
                                        c = 7 & (a.r || 0);
                                    if (t) {
                                        c && (l[0] = a.r >> 3);
                                        for (var u = In[t - 1], g = u >> 13, p = 8191 & u, m = (1 << n) - 1, h = a.p || new Vt(32768), v = a.h || new Vt(m + 1), f = Math.ceil(n / 3), E = 2 * f, S = function(t) {
                                                return (e[t] ^ e[t + 1] << f ^ e[t + 2] << E) & m
                                            }, y = new Wt(25e3), _ = new Vt(288), b = new Vt(32), T = 0, I = 0, A = a.i || 0, w = 0, O = a.w || 0, D = 0; A + 2 < s; ++A) {
                                            var R = S(A),
                                                C = 32767 & A,
                                                L = v[R];
                                            if (h[C] = L, v[R] = C, O <= A) {
                                                var P = s - A;
                                                if ((T > 7e3 || w > 24576) && (P > 423 || !d)) {
                                                    c = Tn(e, l, 0, y, _, b, I, w, D, A - D, c), w = T = I = 0, D = A;
                                                    for (var N = 0; N < 286; ++N) _[N] = 0;
                                                    for (N = 0; N < 30; ++N) b[N] = 0
                                                }
                                                var k = 2,
                                                    M = 0,
                                                    B = p,
                                                    U = C - L & 32767;
                                                if (P > 2 && R == S(A - U))
                                                    for (var x = Math.min(g, P) - 1, F = Math.min(32767, A), V = Math.min(258, P); U <= F && --B && C != L;) {
                                                        if (e[A + k] == e[A + k - U]) {
                                                            for (var W = 0; W < V && e[A + W] == e[A + W - U]; ++W);
                                                            if (W > k) {
                                                                if (k = W, M = U, W > x) break;
                                                                var H = Math.min(U, W - 2),
                                                                    G = 0;
                                                                for (N = 0; N < H; ++N) {
                                                                    var $ = A - U + N & 32767,
                                                                        j = $ - h[$] & 32767;
                                                                    j > G && (G = j, L = $)
                                                                }
                                                            }
                                                        }
                                                        U += (C = L) - (L = h[C]) & 32767
                                                    }
                                                if (M) {
                                                    y[w++] = 268435456 | Yt[k] << 18 | Qt[M];
                                                    var K = 31 & Yt[k],
                                                        q = 31 & Qt[M];
                                                    I += Ht[K] + Gt[q], ++_[257 + K], ++b[q], O = A + k, ++T
                                                } else y[w++] = e[A], ++_[e[A]]
                                            }
                                        }
                                        for (A = Math.max(A, O); A < s; ++A) y[w++] = e[A], ++_[e[A]];
                                        c = Tn(e, l, d, y, _, b, I, w, D, A - D, c), d || (a.r = 7 & c | l[c / 8 | 0] << 3, c -= 7, a.h = v, a.p = h, a.i = A, a.w = O)
                                    } else {
                                        for (A = a.w || 0; A < s + d; A += 65535) {
                                            var Y = A + 65535;
                                            Y >= s && (l[c / 8 | 0] = d, Y = s), c = bn(l, c + 1, e.subarray(A, Y))
                                        }
                                        a.i = s
                                    }
                                    return pn(o, 0, i + gn(c) + r)
                                }(e, null == t.level ? 6 : t.level, null == t.mem ? r.l ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(e.length)))) : 20 : 12 + t.mem, n, i, r)
                            }(t, {}, 0, 0));
                            let i = "";
                            for (let e = 0; e < n.length; e++) i += String.fromCharCode(n[e]);
                            return btoa(i).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
                        } catch (e) {
                            return null
                        }
                        var t
                    }(i);
                if (null !== r) {
                    const e = encodeURIComponent(i).length;
                    if (r.length < e && Dn(r) === i) return r
                }
                return n
            }
            static decompressValue(e, t, n) {
                if (null == e) return e;
                if (void 0 === n) {
                    const i = Wn.getCompressedKeyName(t);
                    n = "string" == typeof e ? Wn.getCookieVersion(i, e) : 2
                }
                if ((3 === n || void 0 === n) && "string" == typeof e) {
                    const i = Dn(e);
                    if (null !== i) try {
                        const e = JSON.parse(i);
                        return Wn.decompressObjectV3(e, t)
                    } catch (e) {
                        n = 2
                    }
                }
                if (1 === n && Wn.isLegacyValue(e)) return "string" === e.MOE_DATA_TYPE ? e.actualValue ? String(e.actualValue) : null : e.actualValue;
                if ("number" == typeof e && (0 === e || 1 === e) && [Ee.SDK_DISABLED, Ie, Ee.DATA_TRACKING_DISABLED].includes(t)) return 1 === e;
                if ("number" == typeof e && e >= 0 && e <= 6 && (t === Ee.SOFT_ASK_STATUS || t === Ee.HARD_ASK_STATUS)) return Object.keys(q.PERMISSION_STATE_MAPPING).find(t => q.PERMISSION_STATE_MAPPING[t] === e);
                if ("object" == typeof e && !Array.isArray(e)) {
                    if (void 0 === n || 2 === n) {
                        const n = Wn.getCompressedKeyName(t);
                        if (Wn.hasV3Structure(e, n)) return Wn.decompressObjectV3(e, t)
                    }
                    return 3 === n ? Wn.decompressObjectV3(e, t) : Wn.decompressObject(e, t)
                }
                return e
            }
            static compressObjectV3(e, t) {
                if (!e) return e;
                switch (t) {
                    case Ee.SUBSCRIPTION_DETAILS:
                        return Wn.compressSubscriptionDetailsV3(e);
                    case Ee.USER_DATA:
                        return Wn.compressUserDataV3(e);
                    case Ee.IDENTITY_MAP:
                        return Wn.compressIdentityMapV3(e);
                    case Ee.SESSION:
                        return Wn.compressSessionV3(e);
                    case Ee.DEVICE_DATA:
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
                        endpoint: i,
                        keys: r,
                        p256dh: a,
                        auth: s
                    } = Cn, o = {};
                    return e.domain && (o[t] = e.domain), e.token && (o[n] = e.token), e.endpoint && (o[i] = e.endpoint), e.keys && (o[r] = {}, e.keys.p256dh && (o[r][a] = e.keys.p256dh), e.keys.auth && (o[r][s] = e.keys.auth)), o
                }(e);
                if (t.e && "string" == typeof t.e) {
                    const e = q.ENDPOINT_URL_MAPPING[t.e];
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
                        deviceUuid: i,
                        deviceAdded: r
                    } = Ln, {
                        key: a,
                        value: s,
                        updated_at: o,
                        level: l
                    } = Pn, c = {};
                    return e.attributes && (c[t] = e.attributes.map(e => {
                        const t = {};
                        return e.key && (t[a] = function(e) {
                            const t = d.find(t => t.attributeName === e);
                            return t ? t.moeName : e
                        }(e.key)), void 0 !== e.value && (t[s] = e.value), void 0 !== e.updated_at && (t[o] = e.updated_at), void 0 !== e.level && (t[l] = e.level), t
                    })), void 0 !== e.subscribedToOldSdk && (c[n] = e.subscribedToOldSdk), e.deviceUuid && (c[i] = e.deviceUuid), void 0 !== e.deviceAdded && (c[r] = e.deviceAdded), c
                }(e);
                if (!t.d_uid) {
                    const e = Wn.getDeviceDataForMigration();
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
                        previousIdentitiesUpdatedTime: i
                    } = Nn, r = {};
                    return e.userIdentities && (r[t] = e.userIdentities), e.previousIdentities && (r[n] = e.previousIdentities), void 0 !== e.previousIdentitiesUpdatedTime && (r[i] = e.previousIdentitiesUpdatedTime), r
                }(e);
                return t.p_i && 0 !== Object.keys(t.p_i).length || 0 !== t.p_i_u_t || (delete t.p_i, delete t.p_i_u_t), t
            }
            static compressSessionV3(e) {
                const t = function(e) {
                    if (!e) return e;
                    const {
                        sessionKey: t,
                        sessionStartTime: n,
                        sessionMaxTime: i,
                        customIdentifiersToTrack: r,
                        sessionExpiryTime: a,
                        numberOfSessions: s,
                        currentSource: o,
                        moeReferrer: l
                    } = kn, d = {};
                    return e.sessionKey && (d[t] = e.sessionKey), e.sessionStartTime && (d[n] = e.sessionStartTime), void 0 !== e.sessionMaxTime && (d[i] = e.sessionMaxTime), e.customIdentifiersToTrack && (d[r] = e.customIdentifiersToTrack), void 0 !== e.sessionExpiryTime && (d[a] = e.sessionExpiryTime), void 0 !== e.numberOfSessions && (d[s] = e.numberOfSessions), e.currentSource && (d[o] = function(e) {
                        if (!e) return e;
                        const {
                            source: t,
                            medium: n,
                            source_url: i,
                            term: r,
                            campaign_name: a,
                            campaign_id: s,
                            content: o,
                            extra: l
                        } = Mn, d = {};
                        return e.source && (d[t] = e.source), e.medium && (d[n] = e.medium), e.source_url && (d[i] = e.source_url), e.term && (d[r] = e.term), e.campaign_name && (d[a] = e.campaign_name), e.campaign_id && (d[s] = e.campaign_id), e.content && (d[o] = e.content), e.extra && (d[l] = e.extra), d
                    }(e.currentSource)), e.moeReferrer && (d[l] = e.moeReferrer), d
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
                    case Ee.SUBSCRIPTION_DETAILS:
                        return Un(e);
                    case Ee.USER_DATA:
                        return xn(e);
                    case Ee.IDENTITY_MAP:
                        return Fn(e);
                    case Ee.SESSION:
                        return Vn(e);
                    case Ee.DEVICE_DATA:
                        return function(e) {
                            if (!e) return e;
                            const {
                                deviceUniqueId: t
                            } = Bn, n = {};
                            return e[t] && (n.deviceUniqueId = e[t]), n
                        }(e);
                    default:
                        return e
                }
            }
            static decompressObjectV3(e, t) {
                if (!e) return e;
                switch (t) {
                    case Ee.SUBSCRIPTION_DETAILS:
                        return Wn.decompressSubscriptionDetailsV3(e);
                    case Ee.USER_DATA:
                        return Wn.decompressUserDataV3(e);
                    case Ee.IDENTITY_MAP:
                        return Wn.decompressIdentityMapV3(e);
                    case Ee.SESSION:
                        return Wn.decompressSessionV3(e);
                    case Ee.DEVICE_DATA:
                        return Wn.getDeviceDataFromUserData();
                    default:
                        return e
                }
            }
            static decompressSubscriptionDetailsV3(e) {
                const t = Object.assign({}, e);
                if (t.e && "string" == typeof t.e) {
                    const e = Wn.REVERSE_ENDPOINT_URL_MAPPING[t.e];
                    e && (t.e = e)
                }
                return Un(t)
            }
            static decompressUserDataV3(e, t) {
                const n = Object.assign({}, e),
                    i = !n.hasOwnProperty("a");
                if (n.a && "object" == typeof n.a && !Array.isArray(n.a)) {
                    const e = Object.entries(n.a).map(([e, t]) => {
                        const n = void 0 !== t.l,
                            i = e.endsWith("_p_attr");
                        return {
                            k: n && i ? e.slice(0, -7) : e,
                            v: t.v,
                            u_at: t.u_at || (new Date).getTime(),
                            l: t.l || void 0
                        }
                    });
                    n.a = e
                }
                i && (n.a = []);
                const r = xn(n);
                if (!r.deviceUuid) {
                    const e = Rn("moe_uuid");
                    e && (r.deviceUuid = e)
                }
                return r
            }
            static decompressIdentityMapV3(e) {
                const t = Object.assign({}, e);
                return t.hasOwnProperty("p_i") || (t.p_i = {}), t.hasOwnProperty("p_i_u_t") || (t.p_i_u_t = 0), Fn(t)
            }
            static decompressSessionV3(e) {
                const t = Object.assign({}, e);
                return t.s_s_t && "number" == typeof t.s_s_t && (t.s_s_t = new Date(t.s_s_t).toISOString()), Vn(t)
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
                    pi.log(2, "CookieCompression", "MOE_DATA parse failed; returning null.", e)
                }
                return null
            }
            static getDeviceDataFromUserData() {
                const e = Wn.getAllCookieNames(Ee.USER_DATA);
                for (const t of e) {
                    const e = Rn(t);
                    if (null !== e) try {
                        let t = JSON.parse(e);
                        if ("string" == typeof t) {
                            const e = Dn(t);
                            null !== e && (t = JSON.parse(e))
                        }
                        if (t.d_uid) return {
                            deviceUniqueId: t.d_uid
                        };
                        const n = Wn.decompressUserDataV3(t);
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
                return e.startsWith("moe_") && Object.values(q.COOKIE_NAME_MAPPING).includes(e)
            }
            static isLegacyValue(e) {
                return "object" == typeof e && null !== e && e.hasOwnProperty("MOE_DATA_TYPE") && e.hasOwnProperty("actualValue")
            }
        }
        Wn.REVERSE_ENDPOINT_URL_MAPPING = Object.fromEntries(Object.entries(q.ENDPOINT_URL_MAPPING).map(([e, t]) => [t, e])), Wn.REVERSE_COOKIE_NAME_MAPPING = Object.fromEntries(Object.entries(q.COOKIE_NAME_MAPPING).map(([e, t]) => [t, e]));
        const Hn = Wn;
        class Gn {
            static set(e, t) {
                var n;
                if (!(null === (n = Dt.get()) || void 0 === n ? void 0 : n.disableCookies))
                    if (null == t) Gn.remove(e);
                    else {
                        if (e === Ee.PUSH_TOKEN) return;
                        if (e === Ee.DEVICE_DATA) return;
                        const n = Hn.compressValue(t, e),
                            i = Hn.getCompressedKeyName(e);
                        let r;
                        Gn.cleanupOldVersions(e, i), r = "string" == typeof n ? n : "object" == typeof n && null !== n ? JSON.stringify(n) : String(n);
                        const a = Date.now(),
                            s = ";expires=" + new Date(a + 63072e6).toUTCString();
                        document.cookie = i + "=" + encodeURIComponent(r) + s + ";domain=" + Gn.getOrigin() + Gn.getCookieFlags()
                    }
            }
            static get(e) {
                var t;
                if (null === (t = Dt.get()) || void 0 === t ? void 0 : t.disableCookies) return;
                const n = Hn.getAllCookieNames(e);
                let i = null,
                    r = null,
                    a = 1;
                for (const e of n)
                    if (i = Gn.getCookieValue(e), null !== i) {
                        r = e, a = Hn.getCookieVersion(e, i);
                        break
                    }
                if (null === i) return null;
                const s = Gn.processParseValue(i, e, a > 1, a);
                return r && a < 3 && Gn.migrateToV3(e, s, r), s
            }
            static migrateToV3(e, t, n) {
                const i = Gn.baseTag + ".migrateToV3";
                try {
                    Gn.set(e, t), Gn.removeSpecificCookie(n)
                } catch (e) {
                    pi.error(1, i, `Failed to migrate cookie ${n} to V3: ${e}`)
                }
            }
            static cleanupOldVersions(e, t) {
                Hn.getAllCookieNames(e).forEach(e => {
                    const t = Gn.getCookieValue(e);
                    null !== t && Hn.getCookieVersion(e, t) < 3 && Gn.removeSpecificCookie(e)
                })
            }
            static removeSpecificCookie(e) {
                document.cookie = e + "=;domain=" + Gn.getOrigin() + ";expires=Thu, 01 Jan 1970 00:00:01 GMT" + Gn.getCookieFlags()
            }
            static getCookieValue(e) {
                const t = e + "=",
                    n = Gn.getDecodedCookies();
                for (let e = n.length - 1; e >= 0; e--) {
                    let i = n[e];
                    for (;
                        " " === i.charAt(0);) i = i.substring(1);
                    if (0 === i.indexOf(t)) return i.substring(t.length, i.length)
                }
                return null
            }
            static processParseValue(e, t, n, i) {
                const r = "MOE_DATA_TYPE",
                    a = "actualValue";
                try {
                    let s;
                    try {
                        s = JSON.parse(e)
                    } catch (t) {
                        s = e
                    }
                    Hn.isLegacyValue(s) ? "string" === Me(s, r, null) ? e = (e = Me(s, a, null)) ? String(e) : null : "boolean" === Me(s, r, null) && (e = Me(s, a, null)) : e = n ? Hn.decompressValue(s, t, i) : s
                } catch (e) {
                    pi.log(2, "CookieStorage.processParseValue", "Value kept as-is after parse/decompress failure.", e)
                }
                return e
            }
            static remove(e) {
                var t;
                (null === (t = Dt.get()) || void 0 === t ? void 0 : t.disableCookies) || Hn.getAllCookieNames(e).forEach(e => {
                    Gn.removeSpecificCookie(e)
                })
            }
            static setRaw(e, t, n) {
                var i;
                if (!(null === (i = Dt.get()) || void 0 === i ? void 0 : i.disableCookies))
                    if (null == t) Gn.remove(e);
                    else {
                        let i = "";
                        null != n && (i = ";expires=" + n.toISOString()), document.cookie = e + "=" + encodeURIComponent(t) + i + ";domain=" + Gn.getOrigin() + Gn.getCookieFlags()
                    }
            }
            static getOrigin() {
                var e;
                if (null === (e = Dt.get()) || void 0 === e ? void 0 : e.disableCookies) return "";
                const t = Gn.baseTag + ".getOrigin",
                    n = window.location.hostname;
                return "localhost" === n || "127.0.0.1" === n ? (Gn.localhostWarningShown || (Gn.localhostWarningShown = !0, pi.warn(1, t, "Cross domain user persistence will not work with localhost. \n\nWe will save the key-value pairs in the localhost cookie store for reference. You'll be able to test this functionality in a hosted staging/test environment.")), "") : "." + Ut(n)
            }
            static getCookieFlags() {
                return "https:" === window.location.protocol || "chrome-extension:" === window.location.protocol ? ";path=/;SameSite=None;Secure" : ";path=/;"
            }
            static getDecodedCookies() {
                const e = Gn.baseTag + ".getDecodedCookies";
                return document.cookie.split(";").map(t => {
                    let n = t.trim();
                    "%" === n.slice(-1) && (n += "25");
                    try {
                        return decodeURIComponent(n)
                    } catch (t) {
                        return pi.error(1, e, `Error decoding cookie: ${n} ${t}`), n
                    }
                })
            }
        }
        Gn.baseTag = "CookieStorage", Gn.localhostWarningShown = !1;
        const $n = Gn;
        var jn = n(634);
        let Kn = null,
            qn = null;

        function Yn() {
            const e = function() {
                if (qn) return qn;
                if ("undefined" == typeof document) return null;
                const e = document.getElementById(J),
                    t = (null == e ? void 0 : e.getAttribute("data-version")) || null;
                return t && (qn = t), t
            }();
            return !!e && function(e) {
                const t = e.split(".").map(Number),
                    n = "1.2.0".split(".").map(Number);
                for (let e = 0; e < Math.max(t.length, n.length); e++) {
                    const i = t[e] || 0,
                        r = n[e] || 0;
                    if (i > r) return !0;
                    if (i < r) return !1
                }
                return !0
            }(e)
        }
        new Set(["moe_database", "moe_webp", "moe_cards", "moe_onsite", "moe_tracking"]);
        const zn = new Set(["moe_data", "moe_backup", "experiences", "ai_experiences", "meta", "inSession", "split_experiences", "tabbed_experiences", "self_handle_experiences", "campaigns", "service_meta", "campaigns_meta", "pending_secondary_events", "pending_timer_campaigns", "triggering_primary_events", "campaigns_tags", "campaigns_stats", "exit_intent_campaigns", "offline_data", "report_params", "moe_campaigns", "events", "batched_events"]);

        function Jn() {
            Kn && (0, jn.Kj)(Kn), Kn = (0, jn.pS)(() => {
                Kn = null, "undefined" != typeof window && Yn() && window.dispatchEvent(new CustomEvent("MOE_ASSIST_LIFECYCLE", {
                    detail: {
                        name: L,
                        data: null
                    }
                }))
            }, 500)
        }
        const Qn = "MOE_DATA";
        class Xn {
            static setPrefix(e) {
                Xn.prefix = e + "_"
            }
            static set(e, t) {
                if (e = Xn.prefix + e, localStorage) {
                    const n = Xn.getMoeData();
                    n[e] = t, localStorage.setItem(Qn, JSON.stringify(n)), Xn.broadcastStorageUpdate()
                }
                const n = Xn.KEYS_SHARED_WITH_COOKIE.indexOf(e);
                if (Xn.isSharedWithCookie && n >= 0) {
                    const i = "object" != typeof t || Array.isArray(t) ? t : Object.assign({}, t);
                    if (0 === n && Array.isArray(i.attributes)) {
                        const e = Xn.get(Ee.WEB_SETTINGS),
                            t = Xn.sharedAttributeCheck(e);
                        i.attributes = i.attributes.filter(e => t(e.key))
                    }
                    e === Ee.SUBSCRIPTION_DETAILS && (i.domain = t.domain, i.token = t.token, i.endpoint = t.endpoint, i.keys = t.keys), $n.set(e, i)
                }
            }
            static get(e) {
                return e = Xn.prefix + e, localStorage ? Me(Xn.getMoeData(), e, null) : null
            }
            static remove(e) {
                const t = Xn.prefix + e;
                if (localStorage && null != Xn.get(e)) {
                    const e = Xn.getMoeData();
                    delete e[t], localStorage.setItem(Qn, JSON.stringify(e)), Xn.broadcastStorageUpdate()
                }
                Xn.isSharedWithCookie && Xn.KEYS_SHARED_WITH_COOKIE.indexOf(e) >= 0 && $n.remove(e)
            }
            static logout() {
                const e = ["INIT_DATA", "Q", "WEB_SETTINGS", "SUBSCRIPTION_DETAILS", "PUSH_TOKEN", "GRACEFUL_DATA", "DEVICE_DATA", "SDK_VERSION", "SDK_DISABLED", "DATA_TRACKING_DISABLED", "TELEMETRY"];
                for (const t in Ee) {
                    if ([Ee.HARD_ASK_STATUS, Ee.SOFT_ASK_STATUS].includes(t)) {
                        const e = Xn.get(Ee.SUBSCRIPTION_DETAILS);
                        if (e && e.domain !== window.location.origin) continue
                    }
                    e.indexOf(t) < 0 && Xn.remove(Ee[t])
                }
                for (const e in Ee.Q) kt.purge(e)
            }
            static getString(e) {
                if (e = Xn.prefix + e, localStorage) {
                    const t = Xn.get(e);
                    return "string" == typeof t || t instanceof String ? t : JSON.stringify(t)
                }
            }
            static removePrefix() {
                Xn.prefix = ""
            }
            static copyKeysFromCookie() {
                var e;
                if (null === (e = Dt.get()) || void 0 === e ? void 0 : e.disableCookies) return;
                let t = null;
                for (let e = 0; e < Xn.KEYS_SHARED_WITH_COOKIE.length; e++) {
                    const n = Xn.KEYS_SHARED_WITH_COOKIE[e],
                        i = $n.get(n);
                    if (null != i) {
                        const e = "object" != typeof i || Array.isArray(i) ? i : Object.assign({}, i);
                        n === Ee.USER_DATA ? (e.attributes = bt(Xn.get(n), e, Xn.sharedAttributeCheck()).attributes, e.d_uid && (t = {
                            deviceUniqueId: e.d_uid
                        }, delete e.d_uid)) : n === Ee.DEVICE_DATA && (t = e), Xn.set(n, e)
                    }
                }
                t && Xn.set(Ee.DEVICE_DATA, t), $n.get(Ee.PUSH_TOKEN) && $n.remove(Ee.PUSH_TOKEN), Xn.removeStaleKeysFromLS(), Xn.copyKeysFromCookieToIDB()
            }
            static sharedAttributeCheck(e = Xn.get(Ee.WEB_SETTINGS)) {
                var t, n;
                const i = (null === (t = null == e ? void 0 : e.configs) || void 0 === t ? void 0 : t.identityAttributes) || [],
                    r = (null === (n = null == e ? void 0 : e.configs) || void 0 === n ? void 0 : n.subscriberBasedBillingAttributes) || [];
                return t => {
                    var n;
                    return (null == e ? void 0 : e.isPushSubBilling) && Tt(t, r) || l.includes(t) || i.includes((null === (n = d.find(e => e.attributeName === t)) || void 0 === n ? void 0 : n.moeName) || t) || Lt() && "cart_token" === t
                }
            }
            static copyKeysFromCookieToIDB() {
                var e;
                const n = `${this.baseLogTag}.copyKeysFromCookieToIDB`,
                    i = $n.get(Ee.IDENTITY_MAP),
                    r = $n.get(Ee.USER_DATA),
                    a = {};
                if (null == i ? void 0 : i.userIdentities) {
                    const {
                        userIdentities: e,
                        previousIdentities: t,
                        previousIdentitiesUpdatedTime: n
                    } = i;
                    a.userIdentities = e, a.previousIdentities = t, a.previousIdentitiesUpdatedTime = n
                }
                const s = _t(r);
                null != s && (a.moe_user_id = s), (null === (e = this.moeDataStore) || void 0 === e ? void 0 : e.getItem) || (this.moeDataStore = t().createInstance({
                    driver: [t().INDEXEDDB],
                    name: "moe_database",
                    storeName: "moe_data"
                }), this.moeDataStore && (this.moeDataStore.setItem(u, a), pi.log(2, n, "Copied identities from cookie to IndexedDB")))
            }
            static removeStaleKeysFromLS() {
                const e = Xn.baseLogTag + ".removeStaleKeysFromLS";
                if ($n.get(Ie)) try {
                    Object.keys(Xn.getMoeData()).forEach(e => {
                        const t = $n.get(e);
                        !this.KEYS_SHARED_WITH_COOKIE.includes(e) || Ne.includes(e) || t || !1 === t || Xn.remove(e)
                    })
                } catch (t) {
                    pi.error(1, e, `Failed to remove stale keys from localStorage: ${t}`)
                } else pi.log(2, e, "Cookies unavailable, keeping localStorage data as is.")
            }
            static getMoeData() {
                const e = Xn.baseLogTag + ".getMoeData";
                let t = localStorage.getItem(Qn);
                if (null == t) return {};
                try {
                    return t = JSON.parse(t), t
                } catch (t) {
                    return pi.errorAndBroadcast(1, e, X, Ze, et, void 0, t), {}
                }
            }
            static broadcastStorageUpdate() {
                Jn()
            }
        }
        Xn.baseLogTag = "PersistentStorage", Xn.prefix = "", Xn.isSharedWithCookie = !1, Xn.KEYS_SHARED_WITH_COOKIE = [Ee.USER_DATA, Ee.SUBSCRIPTION_DETAILS, Ee.SOFT_ASK_STATUS, Ee.OPT_IN_SHOWN_TIME, Ee.HARD_ASK_STATUS, Ee.SESSION, Ee.DEVICE_DATA, Ee.IDENTITY_MAP, Ee.SDK_DISABLED, Ee.DATA_TRACKING_DISABLED];
        const Zn = Xn;

        function ei() {
            const e = Zn.get(Ee.WEB_SETTINGS);
            return (null == e ? void 0 : e.isDomainLevelStorage) || !1
        }

        function ti() {
            const e = Dt.get(),
                t = !!e && !!e.disableSdk,
                n = !!(null == e ? void 0 : e.disableCookies);
            let i = !1;
            return i = ei() && !n ? $n.get(Ee.SDK_DISABLED) : Zn.get(Ee.SDK_DISABLED), !(i || t && !1 !== i)
        }
        class ni {
            static getListeners() {
                return this.listeners
            }
            static getTopicListeners(e) {
                return Me(ni.topicListeners, e, [])
            }
            static addListener(e) {
                ni.listeners.push(e)
            }
            static addTopicListener(e, t) {
                ni.topicListeners[e] = ni.getTopicListeners(e), ni.topicListeners[e].push(t)
            }
            static broadcast(e) {
                ni.listeners.map(t => {
                    t(e)
                }), Me(ni.topicListeners, e.topic, []).map(t => {
                    t(e)
                })
            }
            static broadcastToWindow(e, t = !1) {
                window && (t || ti()) && window.dispatchEvent(new CustomEvent(e.topic, {
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
                ni.listeners = [], ni.topicListeners = {}
            }
            static resetListeners() {
                ni.listeners = []
            }
        }
        ni.listeners = [], ni.topicListeners = {};
        const ii = ni,
            ri = [{
                color: "#8E44AD",
                baseTags: ["MoeOnsite", "MOE_ONSITE_STORES", "EventTriggerHandler", "OnsiteTriggerManager", "FrequencyCapping", "FrequencyCappingHelper", "DeliveryFunnelManager", "DeliveryStats", "MessagingDisplayManager", "OsmFunctions", "SecondaryEventsManager", "WindowEventManager", "CampaignTimerManager", "CampaignUtils"]
            }, {
                color: "#E67E22",
                baseTags: ["PushModule", "PushInitData", "WebPushManager", "NotificationManager", "HTTPS-NotificationManager", "SoftAskManager"]
            }].reduce((e, {
                color: t,
                baseTags: n
            }) => (n.forEach(n => e[n] = `color: white; background: ${t}; border-radius: 5px;`), e), {}),
            ai = e => `color: white; background: ${e}; border-radius: 5px;`;
        let si = ai("#41AE55");
        const oi = ai("#48beab"),
            li = ai("#18a0bf"),
            di = ai("#e8ab51"),
            ci = ai("#cc0a0a"),
            ui = ai("#a400ff");
        class gi {
            static setLogLevel(e, t) {
                const n = gi.baseLogTag + ".setLogLevel";
                null == xe.get(_e) && xe.set(_e, []), null == e ? gi.logLevel = 0 : ve.includes(e) ? (gi.logLevel = e, e > ge.NONE && t && gi.releaseAllLogs()) : gi.warnAndBroadcast(0, n, X, "Invalid log level", `Invalid log level: ${e}. Must be ${ge.NONE} (no logs), ${ge.LIMITED} (limited logs only), or ${ge.ALL} (all logs). Current log level remains: ${gi.logLevel}.`, ne.WEBSDK_DOCS)
            }
            static setLogTabStyle(e) {
                gi.tagLogStyle = ai(e)
            }
            static registerModuleColor(e, t) {
                const n = ai(t);
                (Array.isArray(e) ? e : [e]).forEach(e => gi.moduleStyles[e] = n)
            }
            static resolveTagStyle(e) {
                return gi.moduleStyles[(e || "").split(".")[0]] || gi.tagLogStyle
            }
            static log(e, t, n, ...i) {
                e <= gi.logLevel ? console.log("%c " + gi.logBrand + " %c %c info %c %c " + t + " ", si, "", li, "", gi.resolveTagStyle(t), n, ...i) : gi.cacheLog(e, () => {
                    gi.log(e, t, n, ...i)
                })
            }
            static remoteLogTracking(e, t, n, i, ...r) {
                Ye.log(t, n, i, ...r), this.log(e, n, i, ...r)
            }
            static error(e, t, n, ...i) {
                var r;
                !(null === (r = i[i.length - 1]) || void 0 === r ? void 0 : r.isCached) && Ye.log("error", t, n, ...i), e <= gi.logLevel ? console.error("%c " + gi.logBrand + " %c %c error %c %c " + t + " ", si, "", ci, "", gi.resolveTagStyle(t), n, ...i.slice(0, -1)) : gi.cacheLog(e, () => {
                    gi.error(e, t, n, ...i, {
                        isCached: !0
                    })
                })
            }
            static warn(e, t, n, ...i) {
                var r;
                !(null === (r = i[i.length - 1]) || void 0 === r ? void 0 : r.isCached) && Ye.log("warning", t, n, ...i), e <= gi.logLevel ? console.warn("%c " + gi.logBrand + " %c %c warn %c %c " + t + " ", si, "", di, "", gi.resolveTagStyle(t), n, ...i.slice(0, -1)) : gi.cacheLog(e, () => {
                    gi.warn(e, t, n, ...i, {
                        isCached: !0
                    })
                })
            }
            static broadcastLog(e, t, n, i) {
                document.getElementById(J) && ii.broadcastToWindow({
                    topic: "MOE_LOGGER_EVENT",
                    name: j,
                    data: {
                        label: e,
                        title: t,
                        message: n,
                        link: i
                    }
                }, !0)
            }
            static warnAndBroadcast(e, t, n, i, r, a, ...s) {
                gi.warn(e, t, r, ...s), gi.broadcastLog(n, i, r, a)
            }
            static errorAndBroadcast(e, t, n, i, r, a, ...s) {
                gi.error(e, t, r, ...s), gi.broadcastLog(n, i, r, a)
            }
            static logAndBroadcast(e, t, n, i, r, a, ...s) {
                gi.log(e, t, r, ...s), gi.broadcastLog(n, i, r, a)
            }
            static customLabel(e, t, n, ...i) {
                e <= gi.logLevel ? console.log("%c " + gi.logBrand + " %c %c " + t + " %c %c " + n + " %c ", si, "", gi.resolveTagStyle(t), "", ui, "", ...i) : gi.cacheLog(e, () => {
                    gi.customLabel(e, t, n, ...i)
                })
            }
            static image(e, t) {
                e <= gi.logLevel ? console.log("%c+", "font-size: 1px; padding: 20px 80px; line-height: 45px; background: url(" + t + "); background-size: 160px 90px; color: transparent;") : gi.cacheLog(e, () => {
                    gi.image(e, t)
                })
            }
            static releaseAllLogs() {
                const e = xe.get(_e) || [],
                    t = e.filter(e => e.level <= gi.logLevel),
                    n = e.filter(e => e.level > gi.logLevel);
                xe.set(_e, n), t.length > 0 && (gi.log(0, "Logger.releaseAllLogs", "<---- HISTORICAL LOGS BEGIN ----\x3e"), t.forEach(e => e.run()), gi.log(0, "Logger.releaseAllLogs", "<---- HISTORICAL LOGS END ----\x3e"))
            }
            static setLogBrand(e) {
                gi.logBrand = e
            }
            static setBrandColor(e) {
                si = "color: white; background: " + e + "; border-radius: 5px;"
            }
            static cacheLog(e, t) {
                let n = xe.get(_e);
                null == n && (n = []), n.push({
                    level: e,
                    run: t
                }), xe.set(_e, n)
            }
        }
        gi.baseLogTag = "Logger", gi.logBrand = "MoEngage", gi.logLevel = 0, gi.tagLogStyle = oi, gi.moduleStyles = Object.assign({}, ri);
        const pi = gi,
            mi = {
                randomUUID: "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto)
            };
        var hi, vi = new Uint8Array(16);

        function fi() {
            if (!hi && !(hi = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto))) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            return hi(vi)
        }
        for (var Ei = [], Si = 0; Si < 256; ++Si) Ei.push((Si + 256).toString(16).slice(1));
        const yi = function(e, t, n) {
                if (mi.randomUUID && !t && !e) return mi.randomUUID();
                var i = (e = e || {}).random || (e.rng || fi)();
                if (i[6] = 15 & i[6] | 64, i[8] = 63 & i[8] | 128, t) {
                    n = n || 0;
                    for (var r = 0; r < 16; ++r) t[n + r] = i[r];
                    return t
                }
                return function(e, t = 0) {
                    return (Ei[e[t + 0]] + Ei[e[t + 1]] + Ei[e[t + 2]] + Ei[e[t + 3]] + "-" + Ei[e[t + 4]] + Ei[e[t + 5]] + "-" + Ei[e[t + 6]] + Ei[e[t + 7]] + "-" + Ei[e[t + 8]] + Ei[e[t + 9]] + "-" + Ei[e[t + 10]] + Ei[e[t + 11]] + Ei[e[t + 12]] + Ei[e[t + 13]] + Ei[e[t + 14]] + Ei[e[t + 15]]).toLowerCase()
                }(i)
            },
            _i = {
                META: "v3/campaigns/inapp/live",
                CAMPAIGN_PAYLOAD: "v3/campaigns/inapp/live/",
                DRAFT_CAMPAIGN_PAYLOAD: "v3/campaigns/inapp/test/",
                STATS: "v3/campaigns/inapp/live/v2/stats",
                CAMPAIGNS_PAYLOAD: "v3/campaigns/inapp/live/campaigns",
                FC_USER_ACTIVITY: "v3/campaigns/inapp/live/fc-user-activity"
            },
            bi = {
                DATABASE_NAME: "moe_onsite",
                CAMPAIGNS_META: {
                    NAME: "campaigns_meta"
                },
                CAMPAIGNS_TAGS: {
                    NAME: "campaigns_tags"
                },
                CAMPAIGNS_STATS: {
                    NAME: "campaigns_stats"
                },
                EXIT_INTENT_CAMPAIGN_STORE: {
                    NAME: "exit_intent"
                },
                SERVICE_META: {
                    NAME: "service_meta",
                    KEYS: {
                        LAST_META_CALL_TIME: "last_meta_call_time",
                        GLOBAL_DELAY: "global_delay_between_inapps",
                        LAST_INAPP_SHOWN_TIME: "last_inapp_shown",
                        LAST_FETCH_SDK_VERSION: "last_fetch_sdk_version",
                        UNIQUE_ID: "unique_id",
                        LAST_SEGMENT_REEVAL_TIME: "last_segment_reeval_time",
                        SESSION_KEY: "session_key"
                    }
                },
                PENDING_SECONDARY_EVENTS: {
                    NAME: "pending_secondary_events"
                },
                PENDING_TIMER_CAMPAIGNS: {
                    NAME: "pending_timer_campaigns"
                },
                TRIGGERING_PRIMARY_EVENTS: {
                    NAME: "triggering_primary_events"
                }
            },
            Ti = {
                OSM: {
                    CLICK: "MOE_ONSITE_MESSAGE_CLICKED",
                    IMPRESSION: "MOE_ONSITE_MESSAGE_SHOWN",
                    DISMISS: "MOE_ONSITE_MESSAGE_DISMISSED",
                    AUTO_DISMIS: "MOE_ONSITE_MESSAGE_AUTO_DISMISS",
                    DELIVERED: "MOE_ONSITE_MESSAGE_DELIVERED",
                    TYPE: "onsite"
                },
                WP: {
                    CLICK: "MOE_WEBP_MESSAGE_CLICKED",
                    IMPRESSION: "MOE_WEBP_MESSAGE_SHOWN",
                    DISMISS: "MOE_WEBP_MESSAGE_DISMISSED",
                    DELIVERED: "MOE_WEBP_MESSAGE_DELIVERED",
                    TYPE: "webp"
                }
            },
            Ii = {
                ATTEMPTED: {
                    CAMPAIGN_ATTEMPTED: "ATM"
                },
                PRIORITIZED: {
                    CAMPAIGN_PRIORITY_HIGH_PRIORITY_CAMPAIGN_AVAILABLE: "PRT_HIGH_PRT_CMP_AVL",
                    CAMPAIGN_PRIORITY_MAX_TIMES_SHOWN: "PRT_MAX_TIM_SWN",
                    CAMPAIGN_PRIORITY_MIN_DELAY: "PRT_MIN_DEL",
                    CAMPAIGN_PRIORITY_GLOBAL_DELAY: "PRT_GBL_DEL",
                    CAMPAIGN_PRIORITY_EXPIRED: "PRT_EXP",
                    PRIORITY_STAGE_ALL_CAMPAIGNS_FREQUENCY_CAPPING_LIMIT_REACHED: "PRT_FC_A_C",
                    PRIORITY_STAGE_PAGE_LOAD_FREQUENCY_CAPPING_LIMIT_REACHED: "PRT_FC_P_L",
                    PRIORITY_STAGE_CUSTOM_EVENT_FREQUENCY_CAPPING_LIMIT_REACHED: "PRT_FC_C_E",
                    PRIORITY_STAGE_EXIT_INTENT_FREQUENCY_CAPPING_LIMIT_REACHED: "PRT_FC_E_I",
                    PRIORITY_STAGE_ALL_TAGS_FREQUENCY_CAPPING_FAILED: "PRT_FC_ALL_T",
                    PRIORITY_STAGE_ANY_TAGS_FREQUENCY_CAPPING_FAILED: "PRT_FC_ANY_T"
                },
                DELIVERED: {
                    CAMPAIGN_DELIVERED_API_FAILURE: "DLV_API_FLR",
                    CAMPAIGN_DELIVERED_MANDATORY_PARAMS_MISSING: "DLV_MAND_PARM_MIS"
                },
                IMPRESSION: {
                    CAMPAIGN_IMPRESSION_URL_CHANGED: "IMP_URL_CHG",
                    CAMPAIGN_IMPRESSION_GLOBAL_DELAY: "IMP_GBL_DEL",
                    CAMPAIGN_IMPRESSION_MAX_TIMES_SHOWN: "IMP_MAX_TIM_SHW",
                    CAMPAIGN_IMPRESSION_ANOTHER_CAMPAIGN_VISIBLE: "IMP_ANTR_CMP_VISB",
                    CAMPAIGN_IMPRESSION_CANCEL_BEFORE_DELAY: "IMP_CNCL_BFR_DEL",
                    IMPRESSION_STAGE_ALL_CAMPAIGNS_FREQUENCY_CAPPING_LIMIT_REACHED: "IMP_FC_A_C",
                    IMPRESSION_STAGE_EXIT_INTENT_FREQUENCY_CAPPING_LIMIT_REACHED: "IMP_FC_E_I",
                    IMPRESSION_STAGE_PAGE_LOAD_FREQUENCY_CAPPING_LIMIT_REACHED: "IMP_FC_P_L",
                    IMPRESSION_STAGE_CUSTOM_EVENT_FREQUENCY_CAPPING_LIMIT_REACHED: "IMP_FC_C_E",
                    IMPRESSION_STAGE_ALL_TAGS_FREQUENCY_CAPPING_FAILED: "IMP_FC_ALL_T",
                    IMPRESSION_STAGE_ANY_TAGS_FREQUENCY_CAPPING_FAILED: "IMP_FC_ANY_T"
                },
                EVALUATION: {
                    CAMPAIGN_EVALUATION_PATH_TIME_EXPIRED: "EVL_PATH_TIME_EXP",
                    CAMPAIGN_EVALUATION_USER_NOT_ON_APP: "EVL_USER_NOT_ON_APP"
                }
            },
            Ai = "moeOnsite",
            wi = "E001",
            Oi = "E002",
            Di = 18e4,
            Ri = "moe-inapp-click",
            Ci = "moe-inapp-close",
            Li = 'data-editor-type="MOE_EDITOR"',
            Pi = 'data-template-type="SIDE_BANNER"',
            Ni = "moe-osm-pusher",
            ki = "default",
            Mi = "allCampaigns",
            Bi = "customEvent",
            Ui = "allTags",
            xi = "anyTags",
            Fi = "pageLoad",
            Vi = "exitIntent",
            Wi = "a_c",
            Hi = "c_e",
            Gi = "all_t",
            $i = "any_t",
            ji = "p_l",
            Ki = "e_i",
            qi = {
                all_t: 0,
                any_t: 0,
                a_c: 0,
                p_l: 0,
                e_i: 0,
                c_e: 0
            },
            Yi = {
                [Mi]: "allCampaigns",
                [Bi]: "customEvent",
                [Ui]: "allTags",
                [xi]: "anyTags",
                [Fi]: "pageLoad",
                [Vi]: "exitIntent"
            },
            zi = {
                impression: {
                    [Mi]: Ii.IMPRESSION.IMPRESSION_STAGE_ALL_CAMPAIGNS_FREQUENCY_CAPPING_LIMIT_REACHED,
                    [Vi]: Ii.IMPRESSION.IMPRESSION_STAGE_EXIT_INTENT_FREQUENCY_CAPPING_LIMIT_REACHED,
                    [Fi]: Ii.IMPRESSION.IMPRESSION_STAGE_PAGE_LOAD_FREQUENCY_CAPPING_LIMIT_REACHED,
                    [Bi]: Ii.IMPRESSION.IMPRESSION_STAGE_CUSTOM_EVENT_FREQUENCY_CAPPING_LIMIT_REACHED,
                    [Ui]: Ii.IMPRESSION.IMPRESSION_STAGE_ALL_TAGS_FREQUENCY_CAPPING_FAILED,
                    [xi]: Ii.IMPRESSION.IMPRESSION_STAGE_ANY_TAGS_FREQUENCY_CAPPING_FAILED
                },
                priority: {
                    [Mi]: Ii.PRIORITIZED.PRIORITY_STAGE_ALL_CAMPAIGNS_FREQUENCY_CAPPING_LIMIT_REACHED,
                    [Vi]: Ii.PRIORITIZED.PRIORITY_STAGE_EXIT_INTENT_FREQUENCY_CAPPING_LIMIT_REACHED,
                    [Fi]: Ii.PRIORITIZED.PRIORITY_STAGE_PAGE_LOAD_FREQUENCY_CAPPING_LIMIT_REACHED,
                    [Bi]: Ii.PRIORITIZED.PRIORITY_STAGE_CUSTOM_EVENT_FREQUENCY_CAPPING_LIMIT_REACHED,
                    [Ui]: Ii.PRIORITIZED.PRIORITY_STAGE_ALL_TAGS_FREQUENCY_CAPPING_FAILED,
                    [xi]: Ii.PRIORITIZED.PRIORITY_STAGE_ANY_TAGS_FREQUENCY_CAPPING_FAILED
                }
            },
            Ji = {
                API: _i,
                STORES: bi,
                DELIVERY_FUNNEL: Ii,
                FREQUENCY_CAPPING: {
                    STORAGE_KEYS: {
                        FREQUENCY_CAPPING_SETTINGS: "frequencyCappingSettings",
                        DEVICE_FREQUENCY_DATA: "deviceFrequencyData",
                        SESSION_FREQUENCY_DATA: "sessionFrequencyData"
                    },
                    EVENT_SPECIFIC_TYPES: [Bi, Fi, Vi],
                    TAG_SPECIFIC_TYPES: [Ui, xi],
                    ALL_EVENT_TYPES: [Mi, Bi, Ui, xi, Fi, Vi],
                    MAX_DAYS_PERIOD: 7
                },
                OSM_MODULE: Ai
            },
            Qi = ["MOE_OPT_IN_ATTEMPT"],
            Xi = [...Object.values(Ti.OSM).filter(e => "onsite" !== e), ...Object.values(Ti.WP).filter(e => "webp" !== e)],
            Zi = {
                TOPIC: "MOE_AUTOMATED_EVENTS",
                NAMES: [...Object.values(Q), ...Xi, "MOE_FIRST_VISIT", "MOE_CARD_DELIVERED", "MOE_CARD_IMPRESSION", "MOE_CARD_CLICKED", "MOE_CARD_DISMISSED", "MOE_CARD_INBOX_CLICKED", "MOE_OFFERING_CLICKED", "MOE_OFFERING_SHOWN", "MOE_LANDING_PAGE_SHOWN", "MOE_LANDING_PAGE_CLICKED", "MOE_RESPONSE_SUBMITTED"]
            },
            er = "v2/sdk/report/",
            tr = "User is offline.",
            nr = ["id", "first_name", "last_name", "email", "mobile", "name", "gender", "birthday"],
            ir = "moe_database",
            rr = "offline_data";
        class ar {
            static get(e, t) {
                return ar.makeNetworkCall(sr.METHODS.GET, e, t)
            }
            static post(e, t) {
                return ar.makeNetworkCall(sr.METHODS.POST, e, t)
            }
            static put(e, t) {
                return ar.makeNetworkCall(sr.METHODS.PUT, e, t)
            }
            static patch(e, t) {
                return ar.makeNetworkCall(sr.METHODS.PATCH, e, t)
            }
            static makeNetworkCall(e, t, n = {}) {
                return new jn.VR((i, r) => {
                    const a = JSON.stringify(Me(n, "postData", null));
                    t = xt(t, Me(n, "queryParams", null));
                    const s = new XMLHttpRequest;
                    s.open(e, t, !0), ar.addRequestHeaders(s, Me(n, "headers", {})), s.onreadystatechange = () => {
                        4 === s.readyState && 200 === s.status ? i({
                            status: s.status,
                            responseText: s.responseText
                        }) : 4 !== s.readyState || 410 !== s.status && 412 !== s.status ? 4 === s.readyState && 200 !== s.status && r({
                            code: s.status,
                            reason: s.responseText
                        }) : i({
                            status: s.status,
                            responseText: s.responseText
                        })
                    }, s.send(a)
                })
            }
            static addRequestHeaders(e, t) {
                for (const n in t) t.hasOwnProperty(n) && e.setRequestHeader(n, t[n]);
                return e
            }
        }
        var sr;
        ! function(e) {
            let t;
            ! function(e) {
                e.GET = "GET", e.POST = "POST", e.PUT = "PUT", e.PATCH = "PATCH"
            }(t = e.METHODS || (e.METHODS = {}))
        }(sr || (sr = {}));
        const or = (e, t, n) => new jn.VR(i => {
            let r = !1;
            const a = (0, jn.pS)(() => {
                    r || (r = !0, i(n))
                }, t),
                s = e => {
                    r || (r = !0, (0, jn.Kj)(a), i(e))
                };
            e.then(s, () => s(n))
        });
        class lr {
            constructor() {
                this.p = null, this.res = null, this.rej = null;
                try {
                    this.p = new jn.VR((e, t) => {
                        this.res = e, this.rej = t
                    })
                } catch (e) {
                    pi.errorAndBroadcast(1, "Utils.PromiseObject", X, it, "You are running an outdated browser which does not have Promise support.")
                }
            }
        }
        const dr = [6e4, 9e4, 12e4, 15e4, 18e4],
            cr = "TELEMETRY",
            ur = "data_track",
            gr = "inapp_render",
            pr = "success",
            mr = "failure",
            hr = "undefined" != typeof performance && "function" == typeof performance.now,
            vr = () => hr ? performance.now() : Date.now(),
            fr = () => Date.now(),
            Er = e => {
                if (!e) return "";
                const t = [/(?:edg|edgios|edga)\/([\d.]+)/i, /(?:opr|opera)\/([\d.]+)/i, /samsungbrowser\/([\d.]+)/i, /ucbrowser\/([\d.]+)/i, /yabrowser\/([\d.]+)/i, /vivaldi\/([\d.]+)/i, /(?:firefox|fxios)\/([\d.]+)/i, /(?:crios|crmo|chrome)\/([\d.]+)/i, /version\/([\d.]+).*safari/i, /msie\s([\d.]+)/i, /rv:([\d.]+)\)\s*like\s*gecko/i];
                for (const n of t) {
                    const t = e.match(n);
                    if (t && t[1]) return t[1]
                }
                return ""
            };
        var Sr = n(634).VR;
        class yr {
            static getStore(e) {
                return yr.instances[e] || (yr.instances[e] = t().createInstance({
                    driver: [t().INDEXEDDB, t().WEBSQL, t().LOCALSTORAGE],
                    name: "moe_telemetry",
                    storeName: "pending" === e ? "pending" : "outbound"
                })), yr.instances[e]
            }
            static run(e, t, n) {
                return Ve(this, void 0, void 0, function*() {
                    try {
                        return yield t()
                    } catch (t) {
                        return pi.error(1, yr.baseLogTag, `${e} failed`, t), n
                    }
                })
            }
            static save(e, t, n) {
                return yr.run("save", () => Ve(this, void 0, void 0, function*() {
                    yield yr.getStore(e).setItem(t, n)
                }), void 0)
            }
            static getAll(e) {
                return yr.run("getAll", () => Ve(this, void 0, void 0, function*() {
                    const t = [];
                    return yield yr.getStore(e).iterate(e => {
                        t.push(e)
                    }), t
                }), [])
            }
            static count(e) {
                return yr.run("count", () => yr.getStore(e).length(), 0)
            }
            static remove(e, t) {
                return yr.run("remove", () => Ve(this, void 0, void 0, function*() {
                    yield Sr.all(t.map(t => yr.getStore(e).removeItem(t)))
                }), void 0)
            }
            static clearAll() {
                return yr.run("clearAll", () => Ve(this, void 0, void 0, function*() {
                    yield Sr.all([yr.getStore("pending").clear(), yr.getStore("outbound").clear()])
                }), void 0)
            }
        }
        yr.baseLogTag = "TelemetryStore", yr.instances = {};
        const _r = yr;
        class br {
            static get() {
                var e, t;
                const n = Zn.get(cr) || {};
                return {
                    lastSyncTs: n.lastSyncTs || 0,
                    sessionState: {
                        windowStart: (null === (e = n.sessionState) || void 0 === e ? void 0 : e.windowStart) || 0,
                        perOp: (null === (t = n.sessionState) || void 0 === t ? void 0 : t.perOp) || {}
                    },
                    pendingFailures: n.pendingFailures || []
                }
            }
            static addPendingFailure(e) {
                try {
                    br.update(t => {
                        t.pendingFailures.push(e), t.pendingFailures.length > 5 && (t.pendingFailures = t.pendingFailures.slice(-5))
                    })
                } catch (e) {}
            }
            static takePendingFailures() {
                const e = br.get(),
                    t = e.pendingFailures;
                return t.length && (e.pendingFailures = [], br.set(e)), t
            }
            static set(e) {
                Zn.set(cr, e)
            }
            static update(e) {
                const t = br.get();
                return e(t), br.set(t), t
            }
            static exists() {
                return null != Zn.get(cr)
            }
            static clear() {
                Zn.remove(cr)
            }
        }

        function Tr(e, t) {
            if (null == e || null == t) return e === t;
            if (e instanceof Function) return e === t;
            if (e instanceof RegExp) return e === t;
            if (e === t || e.valueOf() === t.valueOf()) return !0;
            if (Array.isArray(e) && e.length !== t.length) return !1;
            if (e instanceof Date) return !1;
            if (!(e instanceof Object)) return !1;
            if (!(t instanceof Object)) return !1;
            const n = Object.keys(e);
            return Object.keys(t).every(e => -1 !== n.indexOf(e)) && n.every(n => Tr(e[n], t[n]))
        }
        class Ir {
            constructor(e, t, n) {
                this.os = "web", this.osPlatform = e.userAgent, this.isMobile = He(), this.os = He() ? "mweb" : "web", this.name = Ir.getBrowserName(e.userAgent, t), this.isIncognito = n;
                const i = qe(e.userAgent);
                this.osName = i.name, this.osVersion = i.version, this.osFullVersion = i.fullVersion
            }
            static getInstance() {
                return Ve(this, void 0, void 0, function*() {
                    if (null == xe.get(ye)) {
                        const e = yield Ir.isIncognito(window), t = new Ir(navigator, document, e);
                        yield t.updateOsInfoUsingClientHints(navigator), xe.set(ye, t);
                        const n = Zn.get(Ee.BROWSER_DETAILS);
                        return n && Ir.isBrowserUpdated(n, t) || Zn.set(ye, t), t
                    }
                    return xe.get(ye)
                })
            }
            updateOsInfoUsingClientHints(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = yield function(e, t, n) {
                        return Ve(this, void 0, void 0, function*() {
                            if (!n || !n.getHighEntropyValues) return qe(e);
                            try {
                                const t = yield n.getHighEntropyValues(["platformVersion"]), i = (n.platform || "").toLowerCase(), r = null == t ? void 0 : t.platformVersion;
                                if (r && "0.0.0" !== r) {
                                    if (i.indexOf("windows") > -1) {
                                        const t = function(e) {
                                            var t;
                                            const n = null === (t = e.split(".")[0]) || void 0 === t ? void 0 : t.trim(),
                                                i = parseInt(n, 10);
                                            return Number.isNaN(i) ? null : i >= 13 ? "11" : i > 0 ? "10" : null
                                        }(r);
                                        return null != t ? {
                                            name: "Windows",
                                            version: t,
                                            fullVersion: `Windows ${t}`
                                        } : Ke(e)
                                    }
                                    const t = function(e) {
                                        const t = e.split(".").map(e => e.trim()).filter(e => "" !== e);
                                        if (0 === t.length) return "Unknown";
                                        const [n, i, r] = t;
                                        return r && "0" !== r ? `${n}.${i||"0"}.${r}` : i && "0" !== i ? `${n}.${i}` : n
                                    }(r);
                                    if ("Unknown" !== t) {
                                        if (i.indexOf("mac") > -1) return {
                                            name: "macOS",
                                            version: t,
                                            fullVersion: `macOS ${t}`
                                        };
                                        if (i.indexOf("android") > -1) return {
                                            name: "Android",
                                            version: t,
                                            fullVersion: `Android ${t}`
                                        };
                                        if (i.indexOf("chrome os") > -1) return {
                                            name: "Chrome OS",
                                            version: t,
                                            fullVersion: `Chrome OS ${t}`
                                        }
                                    }
                                }
                            } catch (e) {}
                            return qe(e)
                        })
                    }(e.userAgent || "", 0, e.userAgentData);
                    this.osName = t.name, this.osVersion = t.version, this.osFullVersion = t.fullVersion
                })
            }
            static isIncognito(e) {
                const t = e.RequestFileSystem || e.webkitRequestFileSystem;
                return new jn.VR(n => {
                    t ? t(e.TEMPORARY, 100, () => {
                        n(!1)
                    }, () => {
                        n(!0)
                    }) : n(!1)
                })
            }
            static getBrowserName(e, t) {
                const n = e.toLowerCase();
                return -1 !== n.indexOf("msie") || 1 == t.documentMode ? Ir.BROWSER_NAMES.INTERNET_EXPLORER : n.indexOf("edg/") > -1 || n.indexOf("edgios/") > -1 || n.indexOf("edga/") > -1 ? Ir.BROWSER_NAMES.EDGE : navigator.brave ? Ir.BROWSER_NAMES.BRAVE : n.indexOf("samsungbrowser") > -1 || n.indexOf("samsunginternet") > -1 ? Ir.BROWSER_NAMES.SAMSUNG_INTERNET : n.indexOf("ucbrowser") > -1 || n.indexOf("ucweb") > -1 ? Ir.BROWSER_NAMES.UC_BROWSER : n.indexOf("opr/") > -1 || n.indexOf("opera") > -1 ? n.indexOf("oprgx") > -1 ? Ir.BROWSER_NAMES.OPERA_GX : n.indexOf("mms") > -1 ? Ir.BROWSER_NAMES.OPERA_NEON : Ir.BROWSER_NAMES.OPERA : n.indexOf("mms") > -1 ? Ir.BROWSER_NAMES.OPERA_NEON : n.indexOf("vivaldi") > -1 ? Ir.BROWSER_NAMES.VIVALDI : n.indexOf("arc") > -1 ? Ir.BROWSER_NAMES.ARC : n.indexOf("yabrowser") > -1 || n.indexOf("yowser") > -1 ? Ir.BROWSER_NAMES.YANDEX : n.indexOf("qqbrowser") > -1 || n.indexOf("mqqbrowser") > -1 ? Ir.BROWSER_NAMES.QQ_BROWSER : n.indexOf("duckduckgo") > -1 ? Ir.BROWSER_NAMES.DUCKDUCKGO : n.indexOf("mibrowser") > -1 || n.indexOf("miuibrowser") > -1 ? Ir.BROWSER_NAMES.MI_BROWSER : n.indexOf("kiwi") > -1 ? Ir.BROWSER_NAMES.KIWI : n.indexOf("puffin") > -1 ? Ir.BROWSER_NAMES.PUFFIN : n.indexOf("chrome") > -1 || e.match(/\b(?:crmo|crios)\/([\w\.]+)/i) ? Ir.BROWSER_NAMES.CHROME : n.indexOf("firefox") > -1 || n.indexOf("fxios") > -1 ? Ir.BROWSER_NAMES.FIREFOX : n.indexOf("safari") > -1 && -1 === n.indexOf("chrome") ? Ir.BROWSER_NAMES.SAFARI : Ir.BROWSER_NAMES.OTHERS
            }
            static isBrowserUpdated(e, t) {
                return Tr(e, t)
            }
            isWebPushCompatible() {
                return this.isChrome() || this.isFirefox() || this.isOpera() || this.isSafari() || this.isEdge()
            }
            isChrome() {
                return this.name === Ir.BROWSER_NAMES.CHROME
            }
            isFirefox() {
                return this.name === Ir.BROWSER_NAMES.FIREFOX
            }
            isOpera() {
                return this.name === Ir.BROWSER_NAMES.OPERA || this.name === Ir.BROWSER_NAMES.OPERA_NEON
            }
            isSafari() {
                return this.name === Ir.BROWSER_NAMES.SAFARI
            }
            isEdge() {
                return this.name === Ir.BROWSER_NAMES.EDGE
            }
            static isIOS() {
                return /iPad|iPhone|iPod/i.test(navigator.userAgent)
            }
        }! function(e) {
            let t;
            ! function(e) {
                e.CHROME = "Google Chrome", e.FIREFOX = "Mozilla Firefox", e.OPERA = "Opera", e.OPERA_NEON = "Opera Neon", e.OPERA_GX = "Opera GX", e.SAFARI = "Apple Safari", e.INTERNET_EXPLORER = "Internet Explorer", e.EDGE = "Edge", e.BRAVE = "Brave", e.VIVALDI = "Vivaldi", e.SAMSUNG_INTERNET = "Samsung Internet", e.UC_BROWSER = "UC Browser", e.ARC = "Arc", e.YANDEX = "Yandex Browser", e.QQ_BROWSER = "QQ Browser", e.DUCKDUCKGO = "DuckDuckGo", e.MI_BROWSER = "Mi Browser", e.KIWI = "Kiwi Browser", e.PUFFIN = "Puffin Browser", e.OTHERS = "Others"
            }(t = e.BROWSER_NAMES || (e.BROWSER_NAMES = {}))
        }(Ir || (Ir = {}));
        const Ar = Ir;
        class wr {
            static setQueryParamsProvider(e) {
                wr.collectQueryParams = e
            }
            static getInitData() {
                let e = Dt.get();
                return null != e && null != e.appId || (e = new Dt(Zn.get(Ee.INIT_DATA))), e
            }
            static toWireMetric(e, t) {
                const n = e.checkpoints.map((e, t, n) => {
                    const i = 0 === t ? 0 : n[t - 1].t;
                    return {
                        checkpoint_id: e.name,
                        is_success: !1 !== e.is_success,
                        offset: i,
                        duration: e.t - i
                    }
                });
                return {
                    op_id: e.op_id,
                    start_ts: String(e.start_ts),
                    meta: Object.assign(Object.assign({
                        is_success: e.result === pr,
                        sdk_ver: t,
                        duration: e.duration
                    }, e.meta), {
                        checkpoints: n
                    })
                }
            }
            static buildRequestBody(e) {
                return jn.VR.all([wr.collectQueryParams(), Ar.getInstance()]).then(([t, n]) => {
                    const i = wr.getInitData();
                    return {
                        batch_id: e.batch_id,
                        request_time: String(e.created_at),
                        query_params: Object.assign(Object.assign({}, t), {
                            os: "Web",
                            device_type: null == t ? void 0 : t.os,
                            model_name: n.name,
                            browser: n.name,
                            browser_ver: Er(n.osPlatform)
                        }),
                        integrations: [{
                            type: null == i ? void 0 : i.integrationType,
                            version: null == t ? void 0 : t.sdk_ver
                        }],
                        metrics: e.metrics.map(e => wr.toWireMetric(e, null == t ? void 0 : t.sdk_ver))
                    }
                })
            }
            static sendBatch(e) {
                const t = `${wr.baseLogTag}.sendBatch`,
                    n = wr.buildRequestBody(e).then(e => {
                        const t = this.getInitData();
                        return ar.post(t.baseDomainName + "v1/internal/sdks/metrics", {
                            postData: e,
                            headers: {
                                "Content-Type": "text/plain"
                            }
                        })
                    }),
                    i = new jn.VR((e, t) => (0, jn.pS)(() => t({
                        code: "timeout"
                    }), 3e4));
                return jn.VR.race([n, i]).then(() => (pi.log(2, t, `Telemetry batch synced (${e.metrics.length} metric(s))`, e.batch_id), "success")).catch(e => {
                    const n = null == e ? void 0 : e.code;
                    return "number" == typeof n && n >= 400 && n < 500 ? (pi.warn(1, t, "Telemetry batch dropped (4xx)", n), "drop") : (pi.warn(1, t, "Telemetry batch send failed", n), "retry")
                })
            }
        }
        wr.baseLogTag = "MetricsApi", wr.collectQueryParams = () => jn.VR.resolve({});
        const Or = wr,
            Dr = e => `${e.op_id}:${e.span_id}`;
        class Rr {
            static initialize(e, t) {
                Rr.config = e, t && Or.setQueryParamsProvider(t), Rr.isSending && pi.warn(2, Rr.baseLogTag, "initialize() called while a send was in progress"), Rr.isRunning = !0, Rr.isSending = !1, Rr.isSampleQueued = !1, Rr.pendingWork = jn.VR.resolve(), Rr.resetRetryBackoff(), Rr.setForegroundTriggers(!0), (0, jn.pS)(() => Rr.flushIfDue(), 0)
            }
            static queuePendingWork(e) {
                return Rr.pendingWork = Rr.pendingWork.then(e).catch(e => pi.error(1, Rr.baseLogTag, "pending work failed", e)), Rr.pendingWork
            }
            static recordMetric(e) {
                return Rr.isRunning ? Rr.queuePendingWork(() => Ve(this, void 0, void 0, function*() {
                    yield _r.save("pending", Dr(e), e), (yield _r.count("pending")) >= Rr.config.batchSize && Rr.requestSample()
                })) : jn.VR.resolve()
            }
            static requestSample() {
                Rr.isSampleQueued || (Rr.isSampleQueued = !0, Rr.queuePendingWork(() => Ve(this, void 0, void 0, function*() {
                    Rr.isSampleQueued = !1, yield Rr.samplePendingIntoBatches(), Rr.drainOutbound()
                })))
            }
            static flushIfDue() {
                Rr.isRunning && Rr.queuePendingWork(() => Ve(this, void 0, void 0, function*() {
                    const {
                        lastSyncTs: e
                    } = br.get();
                    fr() - e >= 1e3 * Rr.config.flushInterval ? Rr.requestSample() : Rr.drainOutbound()
                }))
            }
            static samplePendingIntoBatches() {
                return Ve(this, void 0, void 0, function*() {
                    const e = yield _r.getAll("pending"), t = fr();
                    if (0 === e.length) return void br.update(e => e.lastSyncTs = t);
                    const n = br.get(),
                        {
                            kept: i,
                            discarded: r
                        } = ((e, t, n, i) => {
                            const r = 1e3 * t.sessionDuration,
                                a = n.sessionState;
                            0 === a.windowStart ? a.windowStart = i : (i < a.windowStart || i - a.windowStart >= r) && (a.windowStart = i, a.perOp = {});
                            const s = [],
                                o = [],
                                l = {};
                            return e.forEach(e => {
                                (l[e.op_id] = l[e.op_id] || []).push(e)
                            }), Object.keys(l).forEach(e => {
                                const n = a.perOp[e] || {
                                        successKept: 0,
                                        failureKept: 0
                                    },
                                    i = l[e].filter(e => e.result === mr).sort((e, t) => t.duration - e.duration),
                                    r = l[e].filter(e => e.result === pr).sort((e, t) => t.duration - e.duration),
                                    d = Math.max(0, t.failureCount - n.failureKept),
                                    c = Math.max(0, t.eventCount - n.successKept);
                                i.forEach((e, t) => (t < d ? s : o).push(e)), r.forEach((e, t) => (t < c ? s : o).push(e)), n.failureKept += Math.min(d, i.length), n.successKept += Math.min(c, r.length), a.perOp[e] = n
                            }), {
                                kept: s,
                                discarded: o
                            }
                        })(e, Rr.config, n, t);
                    pi.log(2, Rr.baseLogTag, `Sampled ${e.length} metric(s): ${i.length} kept, ${r.length} discarded`);
                    const a = Math.max(1, Rr.config.batchSize);
                    for (let e = 0; e < i.length; e += a) {
                        const n = {
                            batch_id: `${t}-${yi()}`,
                            created_at: t,
                            metrics: i.slice(e, e + a),
                            retry_count: 0
                        };
                        yield _r.save("outbound", n.batch_id, n)
                    }
                    yield _r.remove("pending", [...i, ...r].map(Dr)), n.lastSyncTs = t, br.set(n)
                })
            }
            static drainOutbound() {
                return Ve(this, void 0, void 0, function*() {
                    if (Rr.isRunning && !Rr.isSending && !Rr.retryTimer) {
                        Rr.isSending = !0;
                        try {
                            const e = (yield _r.getAll("outbound")).sort((e, t) => e.created_at - t.created_at);
                            for (const t of e) {
                                if (Rr.handledBatchIds.has(t.batch_id)) {
                                    yield _r.remove("outbound", [t.batch_id]);
                                    continue
                                }
                                Rr.handledBatchIds.add(t.batch_id);
                                const e = yield Or.sendBatch(t);
                                if ("success" === e) yield _r.remove("outbound", [t.batch_id]), Rr.retryAttempt = 0;
                                else {
                                    if ("drop" !== e) {
                                        Rr.handledBatchIds.delete(t.batch_id), t.retry_count += 1, yield _r.save("outbound", t.batch_id, t), Rr.scheduleRetryWithBackoff();
                                        break
                                    }
                                    yield _r.remove("outbound", [t.batch_id])
                                }
                            }
                        } catch (e) {
                            pi.error(1, Rr.baseLogTag, "outbound drain failed", e)
                        } finally {
                            Rr.isSending = !1
                        }
                    }
                })
            }
            static scheduleRetryWithBackoff() {
                if (!Rr.isRunning || Rr.retryTimer || Rr.retryAttempt >= dr.length) return;
                const e = dr[Rr.retryAttempt];
                pi.log(2, Rr.baseLogTag, `Telemetry send failed, retrying in ${e/1e3}s (attempt ${Rr.retryAttempt+1}/${dr.length})`), Rr.retryTimer = (0, jn.pS)(() => {
                    Rr.retryTimer = null, Rr.retryAttempt += 1, Rr.drainOutbound()
                }, e)
            }
            static resetRetryBackoff() {
                Rr.retryTimer && ((0, jn.Kj)(Rr.retryTimer), Rr.retryTimer = null), Rr.retryAttempt = 0
            }
            static setForegroundTriggers(e) {
                if ("undefined" == typeof window || e === Rr.triggersBound) return;
                const t = Rr.handleForeground;
                e ? (document.addEventListener("visibilitychange", t), window.addEventListener("focus", t)) : (document.removeEventListener("visibilitychange", t), window.removeEventListener("focus", t)), Rr.triggersBound = e
            }
            static stop() {
                Rr.isRunning = !1, Rr.resetRetryBackoff(), Rr.setForegroundTriggers(!1)
            }
            static killAndPurge() {
                return Ve(this, void 0, void 0, function*() {
                    Rr.stop(), yield _r.clearAll(), br.clear()
                })
            }
        }
        Rr.baseLogTag = "TelemetryBatchManager", Rr.isRunning = !1, Rr.pendingWork = jn.VR.resolve(), Rr.isSending = !1, Rr.isSampleQueued = !1, Rr.handledBatchIds = new Set, Rr.triggersBound = !1, Rr.retryTimer = null, Rr.retryAttempt = 0, Rr.handleForeground = () => {
            "undefined" != typeof document && "hidden" === document.visibilityState || (Rr.resetRetryBackoff(), Rr.flushIfDue())
        };
        const Cr = Rr;
        class Lr {
            static startSpan(e, t = {}) {
                if ("off" === Lr.mode) return null;
                const n = yi();
                if (Lr.spans.size >= Lr.MAX_OPEN_SPANS) {
                    const e = Lr.spans.keys().next().value;
                    void 0 !== e && Lr.spans.delete(e)
                }
                return Lr.spans.set(n, {
                    op_id: e,
                    span_id: n,
                    start_ts: fr(),
                    start_perf: vr(),
                    checkpoints: [],
                    meta: Object.assign({}, t)
                }), n
            }
            static checkpoint(e, t, n, i = !0) {
                const r = Lr.getOpenSpan(e);
                if (!r) return;
                const a = {
                    name: t,
                    t: Math.round(vr() - r.start_perf)
                };
                i || (a.is_success = !1), r.checkpoints.push(a), n && Object.assign(r.meta, n)
            }
            static addMeta(e, t) {
                const n = Lr.getOpenSpan(e);
                n && Object.assign(n.meta, t)
            }
            static endSpan(e, t, n) {
                const i = Lr.getOpenSpan(e);
                i && (Lr.spans.delete(i.span_id), n && Object.assign(i.meta, n), Lr.routeMetric({
                    op_id: i.op_id,
                    span_id: i.span_id,
                    start_ts: i.start_ts,
                    duration: Math.round(vr() - i.start_perf),
                    result: t,
                    checkpoints: i.checkpoints,
                    meta: i.meta
                }))
            }
            static record(e, t, n, i, r = {}, a = []) {
                "off" !== Lr.mode && Lr.routeMetric({
                    op_id: e,
                    span_id: yi(),
                    start_ts: t,
                    duration: n,
                    result: i,
                    checkpoints: a,
                    meta: r
                })
            }
            static activate(e, t) {
                if ("active" === Lr.mode) return;
                Cr.initialize(Lr.buildTelemetryConfig(e), t), Lr.mode = "active";
                const n = Lr.pending;
                Lr.pending = [], n.forEach(e => Cr.recordMetric(e)), br.takePendingFailures().forEach(e => Cr.recordMetric(e)), pi.log(2, Lr.baseLogTag, "Telemetry activated")
            }
            static discard() {
                Lr.mode = "off", Lr.spans.clear(), Lr.pending = []
            }
            static stop() {
                "active" === Lr.mode && (Lr.mode = "off", Lr.spans.clear(), Cr.stop(), pi.log(2, Lr.baseLogTag, "Telemetry stopped"))
            }
            static killAndPurge() {
                Lr.mode = "off", Lr.spans.clear(), Lr.pending = [], Cr.killAndPurge(), pi.log(2, Lr.baseLogTag, "Telemetry killed and purged")
            }
            static routeMetric(e) {
                "active" === Lr.mode ? Cr.recordMetric(e) : e.result === mr ? br.addPendingFailure(e) : Lr.pending.push(e)
            }
            static buildTelemetryConfig(e) {
                const t = e.configs;
                return {
                    flushInterval: t.telemetryFlushInterval,
                    batchSize: t.telemetryBatchSize,
                    sessionDuration: t.telemetrySessionDuration,
                    eventCount: t.telemetryEventCount,
                    failureCount: t.telemetryFailureCount
                }
            }
            static getOpenSpan(e) {
                if ("off" !== Lr.mode && null != e) return Lr.spans.get(e)
            }
        }
        Lr.baseLogTag = "Telemetry", Lr.mode = "buffering", Lr.spans = new Map, Lr.MAX_OPEN_SPANS = 128, Lr.pending = [];
        const Pr = Lr;
        var Nr = n(634).VR;
        const kr = e => e === Q.UNSUBSCRIBED || e === Q.PERMISSION_BLOCKED;

        function Mr() {
            ii.broadcastToWindow({
                topic: S,
                name: T
            })
        }
        const Br = e => {
            let t;
            try {
                t = JSON.stringify(e)
            } catch (e) {
                return !1
            }
            return new Blob([t]).size / 1024 > 195
        };

        function Ur(e) {
            return `Event "${e}" can't get tracked as its size is more than 195 KB. Max permissible event size is 195 KB.`
        }
        const xr = e => "string" == typeof e,
            Fr = e => "[object Date]" === Object.prototype.toString.call(e),
            Vr = e => Array.isArray(e);

        function Wr() {
            return "Notification" in window && "serviceWorker" in navigator && "PushManager" in window
        }

        function Hr() {
            var e;
            return (null === (e = Zn.get(Ee.SUBSCRIPTION_DETAILS)) || void 0 === e ? void 0 : e.token) || null
        }

        function Gr() {
            return Ve(this, void 0, void 0, function*() {
                const e = yield Ar.getInstance().catch(() => null);
                let t = Wr() && "denied" !== Notification.permission;
                e && e.isSafari && e.isSafari() && Ar.isIOS() && window.matchMedia && !window.matchMedia("(display-mode: standalone)").matches && (t = !1);
                let n = !1;
                if (navigator.storage && navigator.storage.estimate) try {
                    const {
                        quota: t
                    } = yield navigator.storage.estimate(), i = He() ? 524288e3 : 5368709120;
                    !(t && t < i) || e && e.isFirefox && e.isFirefox() || (n = !0)
                } catch (e) {
                    n = !0
                }
                return {
                    pushSupported: t,
                    likelyPrivateMode: n
                }
            })
        }

        function $r(e, t) {
            const {
                web: n,
                mobile: i
            } = e;
            return {
                mobileUI: `\n  <div id="mobileBannerWrapped" aria-labelledby="optInTitle" class="moe-mobile-box" style="position: fixed; top: 0px; left: 0px; width: 100%; box-shadow: rgb(51, 51, 51) 0px 5px 10px -5px; z-index: 2147483647; font-family: Helvetica Neue, Helvetica, Arial, Roboto, sans-serif, sans-serif; background: ${i.nudge.backgroundColor};">\n    <div class="moe-logo-text" style="box-sizing: border-box;padding: 10px !important;float: left !important;width: 100% !important">\n      <img height="40px" width="40px" style="box-sizing: border-box;width: 40px !important;height: 40px !important;float: left !important" alt="${i.nudge.altText||""}" src="${i.nudge.icon}">\n      <h2 aria-labelledby="optInTitle" style="box-sizing: border-box; width: calc(100% - 40px); overflow: hidden; height: 2.4em; float: left !important; word-break: break-word !important; font-weight: 400 !important; line-height: 1.2em !important; font-size: 17px !important; text-align: left !important; padding: 0px 0px 0px 10px !important; font-family: Helvetica Neue, Helvetica, Arial, Roboto, sans-serif, sans-serif !important; color:${i.nudge.title.textColor+" !important"}">\n        ${i.nudge.title.text}\n      </h2>\n    </div>\n    <div class="moe-buttons-panel" style="box-sizing: border-box;text-align: right;padding: 0 10px !important;float: left;width: 100% !important;margin-top: 5px;margin-bottom: 3px">\n      <div style="width: 100%;box-sizing: border-box">\n        <button id="moe-dontallow_button" class="moe-mobile-button-outline" style="box-sizing: border-box; font-size: 14px !important; display: inline-block !important; text-transform: none !important; height: 34px !important; font-weight: 400 !important; line-height: 1.2em !important; font-family: Helvetica Neue, Helvetica, Arial, Roboto, sans-serif, sans-serif !important; padding: 0px 5px !important; width: 120px !important; border-radius: 2px !important; border: 1px solid rgba(0, 0, 0, 0.1) !important; margin: 0px 5px 0px 0px !important; color: ${i.dismissButton.textColor}; background: ${i.dismissButton.backgroundColor};">\n          <div style="height: 1.2em; line-height: 1.2em; overflow: hidden; color: ${i.dismissButton.textColor}; background: ${i.dismissButton.backgroundColor};">\n            ${i.dismissButton.text}\n          </div>\n        </button>\n        <button class="moe-mobile-button-fill" style="box-sizing: border-box; font-size: 14px !important; display: inline-block !important; text-transform: none !important; height: 34px !important; font-weight: 400 !important; line-height: 1.2em !important; font-family: Helvetica Neue, Helvetica, Arial, Roboto, sans-serif, sans-serif !important; padding: 0px 5px !important; width: 120px !important; border-radius: 2px !important; border: 1px solid rgba(0, 0, 0, 0.1) !important; margin: 0px !important; color: ${i.allowButton.textColor}; background: ${i.allowButton.backgroundColor};" id="optInText">\n          <div style="height: 1.2em; line-height: 1.2em; overflow: hidden; color: ${i.allowButton.textColor}; background: ${i.allowButton.backgroundColor};">\n            ${i.allowButton.text}\n          </div>\n        </button>\n      </div>\n    </div>${t?"":`<div style="float: left;margin-top: -2.25em;">\n    <a aria-label="${i.logo.altText||""}" href="https://moengage.com/?utm_source=Journey&amp;utm_medium=soft_ask" target="_blank" style="word-spacing: normal !important; letter-spacing: normal !important; font-family: Open Sans, sans-serif !important; text-decoration: none !important; font-size: 10px !important; line-height: 1.2em !important; font-weight: 400 !important; color: ${i.logo.logoColor+" !important"};">\n    Powered by <span style="text-decoration: none;word-spacing: normal!important;letter-spacing: normal!important;font-family: Open Sans,sans-serif!important;">\n        <img alt="" id="moeBannerLogomobile" src="https://app-cdn.moengage.com/images/brand/logo-blue.png" style="width: 6.5em;">\n      </span>\n    </a>\n    </div>`}\n  </div>\n  `,
                webUI: `\n  <div id="desktopBannerWrapped" aria-labelledby="optInTitle" data-rapid_height="50"\n  style="width: 422px; top: 1px; left: calc(50% - 211px); margin: 0px; padding: 0px; box-shadow: rgb(136, 136, 136) 0px 0px 4px; font-size: 11px; font-weight: 400; position: fixed; z-index: 2147483647; background: ${n.banner.backgroundColor};">\n    <div style="margin: 0;padding: 0 20px 10px;word-spacing: normal!important;letter-spacing: normal!important;font-family: Open Sans,sans-serif!important;">\n      <div\n        style="float: left;position: relative;display: inline-block;margin: 15px 15px 0 0!important;padding: 0!important;word-spacing: normal!important;letter-spacing: normal!important;font-family: Open Sans,sans-serif!important;">\n        <img style="word-spacing: normal!important;letter-spacing: normal!important;font-family: Open Sans,sans-serif!important;height: 65px!important;width: 65px!important;" src="${n.banner.icon}" alt="${n.banner.altText||""}"/>\n      </div>\n      <div style="word-spacing: normal!important;letter-spacing: normal!important;font-family: Open Sans,sans-serif!important;position: relative!important;padding: 10px 0 0!important;color: #000!important;text-align: left!important;margin: 0!important;line-height: 1.4em!important;display: inline-block!important;width: calc(100% - 80px)!important;">\n        <h2 id="optInTitle" style="margin-bottom: 5px; text-align: left; font-size: 14px; font-weight: 700; overflow: hidden; height: 2.8em; line-height: 1.4em; display: block; font-family: Open Sans, sans-serif !important; word-spacing: normal !important; letter-spacing: normal !important; color: ${n.banner.title.textColor+" !important"};">\n          ${n.banner.title.text}\n        </h2>\n        <p aria-describedby="optInTitle" style="overflow: hidden; height: 2.8em; word-spacing: normal !important; letter-spacing: normal !important; font-family: Open Sans, sans-serif !important; font-size: 12px !important; line-height: 1.4em !important; margin: 10px 0px !important; padding: 0px !important; text-align: left !important; color: ${n.banner.body.textColor+" !important"};">\n          ${n.banner.body.text}\n        </p>\n      </div>\n      <div\n        style="display: flex;justify-content: space-between;word-spacing: normal!important;letter-spacing: normal!important;font-family: Open Sans,sans-serif!important;">${t?"":`<div style="margin-top: 0.5em;">\n          <a aria-label="${n.logo.altText||""}" href="https://moengage.com/?utm_source=Journey&amp;utm_medium=soft_ask" target="_blank" style="word-spacing: normal !important; letter-spacing: normal !important; font-family: Open Sans, sans-serif !important; text-decoration: none !important; font-size: 10px !important; line-height: 1.2em !important; font-weight: 400 !important; color: ${n.logo.logoColor+" !important"};">\n            Powered by <span style="text-decoration: none;word-spacing: normal!important;letter-spacing: normal!important;font-family: Open Sans,sans-serif!important;vertical-align: bottom;"><img alt="" id="moeBannerLogoweb" src="https://app-cdn.moengage.com/images/brand/logo-blue.png" style="width: 6.5em;"></span>\n          </a>\n        </div>`}\n        <div style="word-spacing: normal!important;letter-spacing: normal!important;font-family: Open Sans,sans-serif!important;margin: 0!important;padding: 0!important;margin-left: auto !important;">\n          <button id="moe-dontallow_button" style="overflow: hidden; word-spacing: normal !important; letter-spacing: normal !important; width: 100px !important; height: 26px !important; font-size: 14px !important; cursor: pointer !important; line-height: 1.1em !important; border-radius: 4px !important; border: 1px solid rgba(0, 0, 0, 0.1) !important; display: inline-block !important; font-weight: 400 !important; margin: 0px 20px 0px 0px !important; padding: 5px !important; text-transform: none !important; box-sizing: border-box !important; text-shadow: none !important; box-shadow: none !important; white-space: nowrap !important; color: ${n.dismissButton.textColor}; background: ${n.dismissButton.backgroundColor};">\n            ${n.dismissButton.text}\n          </button>\n          <button\n            style="overflow: hidden; word-spacing: normal !important; letter-spacing: normal !important; width: 90px !important; height: 26px !important; font-size: 14px !important; cursor: pointer !important; line-height: 1.1em !important; border-radius: 4px !important; border: 1px solid rgba(0, 0, 0, 0.1) !important; display: inline-block !important; font-weight: 400 !important; margin: 0px !important; padding: 5px !important; text-transform: none !important; box-sizing: border-box !important; text-shadow: none !important; box-shadow: none !important; white-space: nowrap !important; color: ${n.allowButton.textColor}; background: ${n.allowButton.backgroundColor};" id="optInText">\n            ${n.allowButton.text}\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n  `
            }
        }

        function jr(e, t) {
            return Ve(this, void 0, void 0, function*() {
                let n = "",
                    i = "";
                const r = yield Ar.getInstance();
                return r.isFirefox() ? (i = Kr(function(e) {
                    var t;
                    return `\n  <div class="moe_firefox" style="display:none;">\n    <div style='position:relative;top: 200px;left: 400px;height: 100px;width: 180px;color: white;font-size: larger;'>\n      ${(null===(t=null==e?void 0:e.desktop)||void 0===t?void 0:t.text)||""}\n    </div>\n    <div\n    style="position:relative;top: 45px;left: 300px;width: 80px;height: 80px;color: white;background-size: contain;transform: rotate(180deg);background-image: url('https://cdn.moengage.com/images/pointdown.png');background-repeat: no-repeat;">\n    </div>\n  </div>\n  `
                }(e.firefox), t), n = qr(function(e) {
                    var t;
                    return `\n  <div class='moe_firefox' style="display:none;height:100%;">\n    <div style='position:relative;top: 15%;left: 23%;height: 100px;width: 150px;color: white;font-size: larger;'>\n      ${(null===(t=null==e?void 0:e.mobile)||void 0===t?void 0:t.text)||""}\n    </div>\n    <div\n      style="position:relative;top: 5%;left: 240px;width: 80px;height: 80px;color: white;background-size: contain;background-image: url('https://cdn.moengage.com/images/pointdown.png');background-repeat: no-repeat;">\n    </div>\n  </div>\n  `
                }(e.firefox), t)) : r.isOpera() ? (i = Kr(function(e) {
                    var t;
                    return `\n  <div class="moe_opera" style="display:none;">\n    <div style='position:relative;top: 240px;left: 40%;height: 100px;width: 180px;color: white;font-size: larger;'>\n      ${(null===(t=null==e?void 0:e.desktop)||void 0===t?void 0:t.text)||""}\n    </div>\n    <div\n      style="position:relative;top: 45px;left: 55%;width: 80px;height: 80px;color: white;background-size: contain;transform: rotate(180deg) scaleX(-1);background-image: url('https://cdn.moengage.com/images/pointdown.png');background-repeat: no-repeat;">\n    </div>\n  </div>\n  `
                }(e.opera), t), n = qr(function(e) {
                    var t;
                    return `\n  <div class='moe_opera' style="display:none;height:100%;">\n    <div style='position:relative;top: 15%;left: 23%;height: 100px;width: 150px;color: white;font-size: larger;'>\n      ${(null===(t=null==e?void 0:e.mobile)||void 0===t?void 0:t.text)||""}\n    </div>\n    <div\n      style="position:relative;top: 5%;left: 240px;width: 80px;height: 80px;color: white;background-size: contain;background-image: url('https://cdn.moengage.com/images/pointdown.png');background-repeat: no-repeat;">\n    </div>\n  </div>\n  `
                }(e.opera), t)) : (i = Kr(`\n  <div class="moe_chrome" style="display:none;">\n    <div style='position:relative;top: 200px;left: 400px;height: 100px;width: 180px;color: white;font-size: larger;'>\n      ${e.chrome.desktop.text}\n    </div>\n    <div\n      style="position:relative;top: 30px;left: 300px;width: 80px;height: 80px;color: white;background-size: contain;transform: rotate(180deg);background-image: url('https://cdn.moengage.com/images/pointdown.png');background-repeat: no-repeat;">\n    </div>\n  </div>\n  `, t), n = qr(function(e) {
                    var t;
                    return `\n  <div class='moe_chrome' style="display:none;height:100%;">\n    <div style='position:relative;top: 15%;left: 23%;height: 100px;width: 150px;color: white;font-size: larger;'>\n      ${(null===(t=null==e?void 0:e.mobile)||void 0===t?void 0:t.text)||""}\n    </div>\n    <div\n      style="position:relative;top: 5%;left: 240px;width: 80px;height: 80px;color: white;background-size: contain;background-image: url('https://cdn.moengage.com/images/pointdown.png');background-repeat: no-repeat;">\n    </div>\n  </div>\n  `
                }(e.chrome), t)), {
                    mobileUI: n,
                    webUI: i
                }
            })
        }

        function Kr(e, t) {
            return `\n  <div id='chrome_desktop_backend' style='z-index: 999999999;position: fixed;height: 100%;top: 0px;left: 0px;width: 100%;background: rgba(0, 0, 0, 0.89);'>\n    ${e}\n    ${t?"":'\n    <a href="#" target="_blank" id="moe-branding-desktop-link"\n    style="text-decoration: none !important;cursor: pointer !important;color:#A5A0A0 !important;font-size: 11px !important;bottom: 0px;left: 10px;position: absolute;">\n    Powered by <img src="https://app-cdn.moengage.com/images/brand/logo_full_white.png"\n      style="max-width: 100% !important; height: 20px !important;vertical-align: middle !important; padding-right: 3px !important;"></a>\n      '}\n  </div>\n  `
        }

        function qr(e, t) {
            return `\n  <div id='chrome_mobile_backend' style='z-index: 999999999;position: fixed;height: 100%;top: 0px;left: 0px;width: 100%;background: rgba(0, 0, 0, 0.798039);'>\n    ${e}\n    ${t?"":'\n    <a href="#" target="_blank" id="moe-branding-mobile-link"\n      style="text-decoration: none !important;cursor: pointer !important;color:#A5A0A0 !important;font-size: 11px !important;left: 0px;bottom: 23%;position: absolute;">\n      Powered by <img src="https://app-cdn.moengage.com/images/brand/logo_full_white.png"\n        style="max-width: 100% !important; height: 20px !important;vertical-align: middle !important; padding-right: 3px !important;"></a>\n      '}\n  </div>\n  `
        }
        class Yr {
            static getIdentityMap() {
                var e;
                const t = Zn.get(Ee.WEB_SETTINGS);
                return (null == t ? void 0 : t.isDomainLevelStorage) && !(null === (e = Dt.get()) || void 0 === e ? void 0 : e.disableCookies) ? this.getIdentitiesFromCookies() : this.getIdentitiesFromLocalStorage()
            }
            static getIdentitiesFromLocalStorage() {
                const e = Zn.get(Ee.IDENTITY_MAP);
                return (null == e ? void 0 : e.userIdentities) ? e : null
            }
            static getIdentitiesFromCookies() {
                const e = $n.get(Ee.IDENTITY_MAP);
                if (e && "object" == typeof e && e.userIdentities) {
                    const t = {
                        userIdentities: e.userIdentities
                    };
                    return e.previousIdentities && (t.previousIdentities = e.previousIdentities, t.previousIdentitiesUpdatedTime = e.previousIdentitiesUpdatedTime), t
                }
                return null
            }
            static getUserIdentities() {
                const e = this.getIdentityMap();
                return (null == e ? void 0 : e.userIdentities) ? e.userIdentities : null
            }
            static updateCurrentUserIdentities(e) {
                return Ve(this, void 0, void 0, function*() {
                    let t;
                    const n = this.getIdentityMap();
                    (null == n ? void 0 : n.userIdentities) ? (t = Object.assign(Object.assign({}, n), {
                        userIdentities: Object.assign(Object.assign({}, n.userIdentities), e)
                    }), Zn.set(Ee.IDENTITY_MAP, t)) : (this.createIdentityMap(), t = Object.assign(Object.assign({}, this.getIdentityMap()), {
                        userIdentities: e
                    }), Zn.set(Ee.IDENTITY_MAP, t)), yield this.updateIdentifiersIDB(t)
                })
            }
            static setLoginUserIdentities(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = this.getIdentityMap(),
                        n = {
                            userIdentities: Object.assign(Object.assign({}, (null == t ? void 0 : t.userIdentities) || {}), e),
                            previousIdentities: {},
                            previousIdentitiesUpdatedTime: 0
                        };
                    Zn.set(Ee.IDENTITY_MAP, n), yield this.updateIdentifiersIDB(n)
                })
            }
            static broadcastUserIdentityUpdate() {
                pi.log(1, this.baseLogTag + ".broadcastUserIdentityUpdate", "User Identities Updated."), ii.broadcastToWindow({
                    topic: V,
                    name: W
                })
            }
            static broadcastLogout() {
                ii.broadcastToWindow({
                    topic: V,
                    name: H
                })
            }
            static updatePreviousUserIdentities(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    let n;
                    const i = this.getIdentityMap();
                    if (null == i ? void 0 : i.userIdentities) {
                        const r = (null == i ? void 0 : i.previousIdentities) || {};
                        n = Object.assign(Object.assign({}, i), {
                            previousIdentities: Object.assign(Object.assign({}, r), e),
                            previousIdentitiesUpdatedTime: t || (new Date).getTime()
                        }), Zn.set(Ee.IDENTITY_MAP, n)
                    } else this.createIdentityMap(), n = Object.assign(Object.assign({}, this.getIdentityMap()), {
                        previousIdentities: e,
                        previousIdentitiesUpdatedTime: t || (new Date).getTime()
                    }), Zn.set(Ee.IDENTITY_MAP, n);
                    yield this.updateIdentifiersIDB(n)
                })
            }
            static writeIdentifiers(e) {
                return Ve(this, void 0, void 0, function*() {
                    if (!Object.keys(e).length) return void(yield this.moeDataStore.setItem(u, e));
                    const t = (yield this.moeDataStore.getItem(u)) || {};
                    yield this.moeDataStore.setItem(u, Object.assign(Object.assign({}, t), e))
                })
            }
            static updateIdentifiersIDB(e) {
                return Ve(this, void 0, void 0, function*() {
                    var n;
                    if ((null === (n = this.moeDataStore) || void 0 === n ? void 0 : n.getItem) || (this.moeDataStore = t().createInstance({
                            driver: [t().INDEXEDDB],
                            name: Le,
                            storeName: Pe
                        })), !this.moeDataStore) return;
                    const i = this.writeIdentifiers(e).catch(e => pi.errorAndBroadcast(1, this.baseLogTag + ".updateIdentifiersIDB", ee, "Identifiers not persisted", "Failed to persist identifiers to IDB", void 0, e));
                    yield or(i, 1500)
                })
            }
            static copyUidIntoIdentityMap(e) {
                const t = this.baseLogTag + ".copyUidIntoIdentityMap",
                    n = e.getAttribute("id");
                n && (this.updateCurrentUserIdentities({
                    uid: n
                }), pi.log(1, t, "UID copied into IdentityMap."))
            }
            static getIdentifiersFromIdentities() {
                const {
                    userIdentities: e,
                    previousIdentities: t,
                    previousIdentitiesUpdatedTime: n
                } = this.getIdentityMap() || {}, i = {};
                return e && Object.keys(e).length && (i.userIdentities = e), n > 0 && ((new Date).getTime() - n > 216e5 ? this.removePreviousUserIdentities() : i.previousIdentities = t), i
            }
            static removePreviousUserIdentities() {
                return Ve(this, void 0, void 0, function*() {
                    const e = this.baseLogTag + ".removePreviousUserIdentities",
                        t = Object.assign(Object.assign({}, this.getIdentityMap()), {
                            previousIdentities: {},
                            previousIdentitiesUpdatedTime: 0
                        });
                    Zn.set(Ee.IDENTITY_MAP, t), yield this.updateIdentifiersIDB(t), pi.log(1, e, "previousIdentities removed from IdentityMap.")
                })
            }
            static createIdentityMap() {
                Zn.set(Ee.IDENTITY_MAP, {
                    userIdentities: {},
                    previousIdentities: {},
                    previousIdentitiesUpdatedTime: 0
                })
            }
        }
        Yr.baseLogTag = "IdentityMethods";
        const zr = Yr;
        class Jr {
            static shouldTriggerSubscriberBilling(e) {
                var t, n, i;
                const r = "MoEngage.billing.shouldTriggerSubscriberBilling";
                let a = [];
                return (null === (t = e.attributeNames) || void 0 === t ? void 0 : t.length) ? a = e.attributeNames : (null === (i = null === (n = e.user) || void 0 === n ? void 0 : n.attributes) || void 0 === i ? void 0 : i.length) && (a = e.user.attributes.map(e => e.key)), (null == a ? void 0 : a.length) && Jr.checkAttributeTrigger(a, e.sdkSettings) ? (pi.log(1, r, "Subscriber billing is/ can be triggered by available user attributes"), !0) : Jr.checkPushTokenTrigger(e.pushToken) ? (pi.log(1, r, "Subscriber billing is/ can be triggered by current web push subscription"), !0) : !!Jr.checkIdentityTrigger(e.identities || zr.getUserIdentities(), e.sdkSettings) && (pi.log(1, r, "Subscriber billing is/ can be triggered by available user identities"), !0)
            }
            static checkAttributeTrigger(e, t) {
                return e.some(e => {
                    var n, i;
                    return Tt((null === (n = d.find(t => t.moeName === e)) || void 0 === n ? void 0 : n.attributeName) || e, (null === (i = t.configs) || void 0 === i ? void 0 : i.subscriberBasedBillingAttributes) || [])
                })
            }
            static checkPushTokenTrigger(e) {
                return null !== e && !(!e && !Hr())
            }
            static checkIdentityTrigger(e, t) {
                var n;
                if (!e) return !1;
                const i = (null === (n = t.configs) || void 0 === n ? void 0 : n.subscriberBasedBillingAttributes) || [];
                return Object.keys(e).some(e => {
                    if (i.includes(e)) return !0;
                    if (["u_em", "u_mb"].includes(e)) return !0;
                    const t = d.find(t => t.moeName === e);
                    return !(!t || !i.includes(t.attributeName))
                })
            }
        }
        const Qr = () => new jn.VR((e, t) => {
                try {
                    const n = JSON.parse(localStorage.getItem("MOE_DATA"));
                    n && n.WEB_SETTINGS && n.WEB_SETTINGS.configs ? e(n.WEB_SETTINGS) : (pi.errorAndBroadcast(1, "getSDKSettings", X, "MoEngage storage was deleted", et), t("Error in getting sdk settings from localstorage - no data found"))
                } catch (e) {
                    pi.errorAndBroadcast(1, "getSDKSettings", X, Ze, et, void 0, e), t(e)
                }
            }),
            Xr = () => new jn.VR((e, t) => {
                try {
                    const t = JSON.parse(localStorage.getItem("MOE_DATA"));
                    return t && t.INIT_DATA && e(t.INIT_DATA), {}
                } catch (e) {
                    pi.errorAndBroadcast(1, "getInitData", X, Ze, et, void 0, e), t(e)
                }
            });
        class Zr {
            constructor(e, t, n) {
                this.key = e, this.value = t, this.updated_at = (new Date).getTime(), n === Zr.USER_ATTRIBUTE_LEVEL.PORTFOLIO && (this.level = n)
            }
            static equal(e, t) {
                return e.key === t.key && JSON.stringify(e.value) === JSON.stringify(t.value)
            }
        }
        Zr.USER_ATTRIBUTE_LEVEL = {
            PORTFOLIO: "PORTFOLIO",
            PROJECT: "PROJECT"
        };
        const ea = Zr,
            ta = {
                id: a,
                email: s,
                name: "USER_ATTRIBUTE_USER_NAME",
                first_name: "USER_ATTRIBUTE_USER_FIRST_NAME",
                last_name: "USER_ATTRIBUTE_USER_LAST_NAME",
                mobile: o,
                gender: "USER_ATTRIBUTE_USER_GENDER",
                birthday: "USER_ATTRIBUTE_USER_BDAY"
            };

        function na(e) {
            var t;
            return null !== (t = ta[e]) && void 0 !== t ? t : e
        }

        function ia(e) {
            return Math.floor((null != e ? e : Date.now()) / 1e3)
        }

        function ra(e) {
            return ia() - ia(e)
        }

        function aa(e) {
            const t = e ? new Date(e) : new Date;
            return `${t.getDate()}:${t.getMonth()+1}:${t.getFullYear()}:${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
        }

        function sa(e) {
            return "object" == typeof e && !Fr(e)
        }

        function oa(e) {
            return Fr(e) && !Number.isNaN(e.getTime()) ? e.toISOString() : e
        }

        function la(e) {
            const t = String(e.getMonth() + 1).padStart(2, "0");
            return `${String(e.getDate()).padStart(2,"0")}${t}${String(e.getFullYear()).slice(-2)}`
        }
        var da = n(634).VR;
        let ca = null;
        class ua {
            constructor(e) {
                this.attributes = [], this.subscribedToOldSdk = !1, null == e ? (this.deviceUuid = yi(), this.attributes = [], this.deviceAdded = !1) : (this.deviceUuid = Me(e, "deviceUuid", yi()), this.attributes = Me(e, "attributes", []), this.deviceAdded = Me(e, "deviceAdded", !1), this.subscribedToOldSdk = Me(e, "subscribedToOldSdk", !1))
            }
            addAttribute(e) {
                return new jn.VR(t => Ve(this, void 0, void 0, function*() {
                    let n = !0;
                    e.key = ua.getMorphedKey(e.key);
                    let i = -1;
                    for (let t = this.attributes.length - 1; t >= 0; t--) e.key === this.attributes[t].key && e.level === this.attributes[t].level && (i = t);
                    i >= 0 ? (Tr(oa(this.attributes[i].value), oa(e.value)) && (n = yield this.isAttibuteTrackingRequired(this.attributes[i].updated_at, this.attributes[i].level)), n && (this.attributes[i].value = e.value, this.attributes[i].updated_at = (new Date).getTime())) : this.attributes.push(e), this.save().then(() => {
                        t(n)
                    })
                }))
            }
            isAttibuteTrackingRequired(e) {
                return Ve(this, arguments, void 0, function*(e, t = ea.USER_ATTRIBUTE_LEVEL.PROJECT) {
                    const n = yield Qr();
                    return t === ea.USER_ATTRIBUTE_LEVEL.PORTFOLIO && null !== n.configs.portfolioUserAttributeCacheTime ? ra(e) > n.configs.portfolioUserAttributeCacheTime : null === n.configs.userAttributeCacheTime || ra(e) > n.configs.userAttributeCacheTime
                })
            }
            static getSync() {
                return ua.reconcileWithStorage()
            }
            static reconcileWithStorage() {
                const e = ua.getStoredUserData();
                return ua.matchesStored(ua.instance, e) || (null != ua.instance && (ca = null), ua.instance = null == e ? null : new ua(e)), ua.instance
            }
            static getStoredUserData() {
                const e = Zn.get(Ee.USER_DATA),
                    t = Zn.get(Ee.WEB_SETTINGS);
                if (!(null == t ? void 0 : t.isDomainLevelStorage)) return e;
                const n = bt(e, $n.get(Ee.USER_DATA), Zn.sharedAttributeCheck());
                if (null != n && null == n.deviceUuid) {
                    const t = null != e ? e : ua.instance,
                        i = ua.knownDeviceFor(n, t);
                    return i ? Object.assign(Object.assign({}, n), {
                        deviceUuid: i
                    }) : null != t ? t : null
                }
                return n
            }
            static knownDeviceFor(e, t) {
                if (null == (null == t ? void 0 : t.deviceUuid)) return;
                const n = e => {
                    const t = _t(e);
                    return null == t ? null : String(t)
                };
                return n(e) === n(t) ? t.deviceUuid : void 0
            }
            static matchesStored(e, t) {
                return null != e && null != t && e.deviceUuid === t.deviceUuid && e.getAttribute(a) === _t(t)
            }
            static get() {
                const e = ua.baseLogTag + ".get";
                return ua.reconcileWithStorage(), null != ca || (ca = new jn.VR((t, n) => {
                    Ar.getInstance().then(e => Qr()).then(t => {
                        const n = new jn.VR(e => {
                                e(Zn.get(Ee.USER_DATA) || null)
                            }),
                            i = t.isDomainLevelStorage ? new jn.VR(e => {
                                e($n.get(Ee.USER_DATA) || null)
                            }) : "resolved",
                            r = function() {
                                const e = "UserSources.getMigrationUserData";
                                return new jn.VR(t => {
                                    const n = localStorage.getItem(Ee.OLD_SDK.USER_DATA);
                                    if (n) try {
                                        const e = JSON.parse(n);
                                        if (e.is_new_sdk_migrated) return void t(null);
                                        const i = [],
                                            r = Me(e, "user_attrs", {});
                                        for (const e in r) r.hasOwnProperty(e) && i.push(new ea(e, r[e]));
                                        const a = localStorage.getItem(Ee.OLD_SDK.PUSH_TOKEN);
                                        t({
                                            deviceAdded: Me(e, "device_add", !1),
                                            deviceUuid: Me(e, "uuid", yi()),
                                            attributes: i,
                                            subscribedToOldSdk: null != a && "NA" !== a && "null" !== a
                                        })
                                    } catch (n) {
                                        pi.error(1, e, "Error getting the migration user. Resolving as a new user."), pi.error(1, e, n), t(null)
                                    } else t(null)
                                })
                            }();
                        return da.all([n, i, r]).then(n => {
                            const i = n[0],
                                r = "resolved" === n[1] ? null : n[1],
                                a = n[2];
                            return a ? new ua(a).save().then(n => {
                                const i = localStorage.getItem(Ee.OLD_SDK.USER_DATA);
                                if (i) try {
                                    const e = JSON.parse(i);
                                    e.is_new_sdk_migrated = !0, localStorage.setItem(Ee.OLD_SDK.USER_DATA, JSON.stringify(e))
                                } catch (t) {
                                    pi.error(2, e, "Error parsing migration user JSON", t)
                                }
                                return {
                                    resolvedUser: n,
                                    sdkSettings: t
                                }
                            }) : (() => {
                                if (r) {
                                    if (null == r.deviceUuid) {
                                        const e = ua.knownDeviceFor(r, i);
                                        e && (r.deviceUuid = e)
                                    }
                                    return (null == i ? void 0 : i.deviceUuid) && i.deviceUuid === r.deviceUuid && (r.attributes = function(e = [], t = [], n) {
                                        const i = [...e];
                                        return t.forEach(e => {
                                            const t = i.findIndex(t => t.key === e.key && t.level === e.level);
                                            t >= 0 ? i[t] = e : i.push(e)
                                        }), i.filter(e => ! function(e, t) {
                                            var n, i, r;
                                            const a = (null === (n = null == t ? void 0 : t.configs) || void 0 === n ? void 0 : n.identityAttributes) || [],
                                                s = (null === (i = null == t ? void 0 : t.configs) || void 0 === i ? void 0 : i.subscriberBasedBillingAttributes) || [];
                                            return Boolean((null == t ? void 0 : t.isPushSubBilling) && Tt(e, s) || l.some(t => t === e) || a.includes((null === (r = d.find(t => t.attributeName === e)) || void 0 === r ? void 0 : r.moeName) || e) || Lt() && "cart_token" === e)
                                        }(e.key, n) || t.some(t => t.key === e.key && t.level === e.level))
                                    }(i.attributes, r.attributes, t)), new ua(r).save()
                                } {
                                    const e = new ua(i);
                                    let n = !1;
                                    if (t.isPushSubBilling) {
                                        const i = !!e.deviceAdded;
                                        Jr.shouldTriggerSubscriberBilling({
                                            sdkSettings: t,
                                            user: e
                                        }) ? (e.deviceAdded = !0, n = !i) : e.deviceAdded = !1
                                    }
                                    return e.save().then(e => (n && as.trackDeviceAttributes(), e))
                                }
                            })().then(e => ({
                                resolvedUser: e,
                                sdkSettings: t
                            }))
                        })
                    }).then(({
                        resolvedUser: e,
                        sdkSettings: n
                    }) => {
                        ua.isResolved = !0, (null == n ? void 0 : n.isDomainLevelStorage) && (ca = null), t(e)
                    }).catch(t => {
                        pi.error(2, e, "Error in fetching/creating user", t), ca = null, n(t)
                    })
                })), ca
            }
            static logout() {
                return new jn.VR(e => {
                    ca = null, this.instance = null, window.MoeWebP && (window.MoeWebP.deviceUuid = null), e(!0)
                })
            }
            save() {
                var e, t;
                const n = ua.baseLogTag + ".save";
                ua.isAmpEnabled() && (this.deviceUuid = $n.get("moe_uuid")), Zn.get("WEB_SETTINGS");
                const i = Zn.get(Ee.WEB_SETTINGS);
                if (null == Zn.get(Ee.USER_DATA)) {
                    if (ua.persistedInstances.has(this)) return pi.log(2, n, "Skipping save: this user was logged out, not re-persisting it."), jn.VR.resolve(this);
                    (null === (e = null == i ? void 0 : i.configs) || void 0 === e ? void 0 : e.isWebPersonalizationModuleEnabled) && (null === (t = window.MoeWebP) || void 0 === t ? void 0 : t.deviceUuid) && this.deviceUuid !== window.MoeWebP.deviceUuid && (this.deviceUuid = window.MoeWebP.deviceUuid)
                }
                return ua.instance = this, ua.persistedInstances.add(this), new jn.VR(e => {
                    Zn.set(Ee.USER_DATA, this), $n.set(ae, ua.instance.deviceUuid), e(this)
                })
            }
            static isAmpEnabled() {
                const e = $n.get(ae);
                return e && e.includes("amp")
            }
            getAttribute(e) {
                return St(this, ua.getMorphedKey(e))
            }
            indexOfAttribute(e) {
                return yt(this, ua.getMorphedKey(e))
            }
            static getMorphedKey(e) {
                return na(e)
            }
        }
        ua.baseLogTag = "UserModel", ua.isResolved = !1, ua.instance = null, ua.persistedInstances = new WeakSet;
        const ga = ua;

        function pa(e) {
            const t = (e + "=".repeat((4 - e.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/"),
                n = atob(t),
                i = new Uint8Array(n.length);
            for (let e = 0; e < n.length; ++e) i[e] = n.charCodeAt(e);
            return i
        }

        function ma(e) {
            let t = "";
            const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                i = new Uint8Array(e),
                r = i.byteLength,
                a = r % 3,
                s = r - a;
            let o, l, d, c, u;
            for (let e = 0; e < s; e += 3) u = i[e] << 16 | i[e + 1] << 8 | i[e + 2], o = (16515072 & u) >> 18, l = (258048 & u) >> 12, d = (4032 & u) >> 6, c = 63 & u, t += n[o] + n[l] + n[d] + n[c];
            return 1 == a ? (u = i[s], o = (252 & u) >> 2, l = (3 & u) << 4, t += n[o] + n[l] + "==") : 2 == a && (u = i[s] << 8 | i[s + 1], o = (64512 & u) >> 10, l = (1008 & u) >> 4, d = (15 & u) << 2, t += n[o] + n[l] + n[d] + "="), t
        }

        function ha(e) {
            return e.replace(/[\uff0e]/g, ".")
        }

        function va(e) {
            return new Date(Date.parse(e))
        }

        function fa() {
            if (xe.get(be)) return;
            const e = Mt(window.location.href);
            return e.moe_aid && !e.moe_aid.includes("{{") ? e.moe_aid : void 0
        }

        function Ea() {
            const e = Dt.get(),
                t = !!e && !!e.disableSdk,
                n = !!(null == e ? void 0 : e.disableCookies);
            let i = !1;
            return i = ya() && !n ? $n.get(Ee.SDK_DISABLED) : Zn.get(Ee.SDK_DISABLED), !(i || t && !1 !== i)
        }

        function Sa() {
            var e;
            const t = !!(null === (e = Dt.get()) || void 0 === e ? void 0 : e.disableCookies);
            return ya() && !t ? !$n.get(Ee.DATA_TRACKING_DISABLED) : !Zn.get(Ee.DATA_TRACKING_DISABLED)
        }

        function ya() {
            const e = Zn.get(Ee.WEB_SETTINGS);
            return (null == e ? void 0 : e.isDomainLevelStorage) || !1
        }

        function _a(e) {
            return null != e && "NA" !== e && "" !== e && "null" !== e
        }
        const ba = () => ((e, t) => {
                if (!e) return null;
                let n;
                try {
                    const t = new URL(e);
                    if (!E.includes(t.protocol)) return null;
                    n = t.hostname
                } catch (e) {
                    return null
                }
                const i = Bt(n);
                return i ? Ut(i) === Ut(t) ? null : i : null
            })(document.referrer, window.location.hostname),
            Ta = e => e ? ba() || (e => {
                if (!Zn.isSharedWithCookie) return null;
                const t = $n.get(p);
                return t ? Me(t, m, null) !== e ? null : Me(t, h, null) : null
            })(Me(e, m, null)) || Me(e, h, null) : null;
        class Ia {
            initiateSessionAndSource(e) {
                return new jn.VR((t, n) => {
                    (() => {
                        this.isSessionRunning() && this.isCurrentSourceSameAsPreviousSource() ? this.captureReferrer() : this.startNewSession(e), t(!0)
                    })()
                })
            }
            clearSessionAndSource() {
                Zn.remove(p)
            }
            isSessionRunning() {
                return this.getSessionKey() && !this.isSessionExpired()
            }
            isSessionExpired() {
                const e = this.getSessionExpiryTime(),
                    t = xe.get("wasBrowserInactive");
                return !(!t && null !== t) && (this.isWindowActive() && xe.set("wasBrowserInactive", !1), (new Date).getTime() > e)
            }
            isNonEventInteractive(e) {
                return Ia.NON_INTERACTIVE_EVENTS.includes(e.name) || e.attributes.filter(e => "moe_non_interactive" === e.key && 1 === e.value).length > 0
            }
            getCurrentSource() {
                const e = Mt(window.location.href);
                let t = "";
                const n = {};
                if (!Object.keys(e).includes("utm_source")) return;
                t = "utm_", this.geCustomIdentifiersToTrack().forEach(t => {
                    e[t] && (n[t] = e[t])
                });
                const i = {
                    source_url: window.location.href
                };
                return e[t + "source"] && (i.source = e[t + "source"]), e[t + "medium"] && (i.medium = e[t + "medium"]), e[t + "term"] && (i.term = e[t + "term"]), e[t + "campaign"] && (i.campaign_name = e[t + "campaign"]), e[t + "content"] && (i.content = e[t + "content"]), e.utm_id && (i.campaign_id = e.utm_id), Object.keys(n).length && (i.extra = n), i
            }
            getActiveSource() {
                return this.getSavedSource() || this.getCurrentSource()
            }
            isSourceOrganic() {
                const e = Mt(window.location.href),
                    t = Object.keys(e);
                let n = !1;
                return this.geCustomIdentifiersToTrack().forEach(t => {
                    e[t] && (n = !0)
                }), !t.includes("utm_source") && !t.includes("source") && !n
            }
            setCurrentSource(e) {
                const t = this.getSession() || {};
                t.currentSource = e, Zn.set(p, t)
            }
            removeCurrentSource() {
                const e = this.getSession();
                e && (e.currentSource = void 0, Zn.set(p, e))
            }
            getSavedSource() {
                const e = Me(this.getSession(), "currentSource", void 0);
                if (e) return e
            }
            isCurrentSourceSameAsPreviousSource() {
                if (this.isSourceOrganic()) return !0;
                const e = Object.assign({}, this.getCurrentSource());
                delete e.source_url;
                const t = Object.assign({}, this.getSavedSource());
                return delete t.source_url, Tr(e, t)
            }
            getSessionKey() {
                return Me(this.getSession(), m, null)
            }
            getSessionStartTime() {
                return Me(this.getSession(), "sessionStartTime", null)
            }
            getSessionExpiryTime() {
                return Me(this.getSession(), "sessionExpiryTime", null)
            }
            getSessionMeta() {
                const e = Ta(this.getSession());
                return Object.assign({
                    session_id: this.getSessionKey(),
                    start_time: this.getSessionStartTime(),
                    background_initiated: 0
                }, e ? {
                    [v]: e
                } : {})
            }
            getSourceMeta() {
                const e = this.getActiveSource();
                return e ? (this.setCurrentSource(e), [e]) : []
            }
            getReportMeta() {
                const e = this.getSourceMeta();
                return {
                    session: this.getSessionMeta(),
                    source: e.length ? e : void 0
                }
            }
            getSessionMaxTime() {
                return Me(this.getSession(), "sessionMaxTime", null)
            }
            getSession() {
                return Zn.get(p)
            }
            geCustomIdentifiersToTrack() {
                return Me(this.getSession(), "customIdentifiersToTrack", []) || []
            }
            generateSessionKey() {
                return yi()
            }
            startNewSession(e) {
                this.removeCurrentSource();
                let t = this.getNumberOfSessions();
                const n = this.generateSessionKey(),
                    i = ba(),
                    r = Object.assign({
                        sessionKey: n,
                        sessionStartTime: (new Date).toISOString(),
                        sessionMaxTime: e.configs.sessionInactiveDuration,
                        customIdentifiersToTrack: e.configs.sourceExtraParams,
                        sessionExpiryTime: (new Date).getTime() + 1e3 * e.configs.sessionInactiveDuration,
                        numberOfSessions: ++t
                    }, i ? {
                        [h]: i
                    } : {});
                Zn.set(p, r)
            }
            captureReferrer() {
                const e = Ta(this.getSession());
                if (!e) return;
                const t = this.getSession();
                t && t[h] !== e && (t[h] = e, Zn.set(p, t))
            }
            extendSession() {
                const e = this.getSession();
                e && (e.sessionExpiryTime = (new Date).getTime() + 1e3 * e.sessionMaxTime, Zn.set(p, e))
            }
            handleBrowserInactivity(e) {
                "hidden" === e && xe.set("wasBrowserInactive", !0)
            }
            isWindowActive() {
                return !!xe.get("isWindowActive")
            }
            getNumberOfSessions() {
                return Me(Zn.get(p), "numberOfSessions") || 0
            }
        }
        Ia.NON_INTERACTIVE_EVENTS = [Q.WEB_OPTIN_BANNER_LOAD, Q.OPT_IN_SHOWN, Q.WEB_OPTIN_BANNER_LOAD, Q.LOGOUT];
        const Aa = Ia;
        var wa = n(372),
            Oa = n.n(wa);
        const Da = Ee.Q;
        class Ra {
            static clear(e) {
                const t = Ra.baseLogTag + ".clear";
                if (!ti()) return;
                const n = [];
                for (; !kt.isEmpty(e);) switch (e) {
                    case Da.REPORT:
                        const i = kt.dequeue(Da.REPORT);
                        n.push(e => {
                            as.reportAdd(i).then(() => {
                                e()
                            })
                        });
                        break;
                    case Da.DEVICE:
                        kt.dequeue(Da.DEVICE) && n.push(e => {
                            as.deviceAdd().then(() => {
                                e()
                            })
                        });
                        break;
                    default:
                        pi.error(1, t, "Do not know how to handle queue with name:", e)
                }(0, jn.pS)(() => {
                    Ra.processing[e] = !0, Oa()(n, 5, (t, n) => {
                        Ra.processing[e] = !1
                    })
                }, 0)
            }
            static startPeriodicClear(e) {
                const t = Ra.baseLogTag + ".startPeriodicCleanQ";
                Ra.clearInterval(e);
                const n = () => {
                    kt.isEmpty(e) ? (pi.log(1, t, "If you see multiple event tracks with same, they were captured over multiple visits or page refreshes."), Me(Ra.processing, e, !1) || Ra.clearInterval(e)) : (Ra.clear(e), pi.log(1, t, "Starting periodic queue clear for", e))
                };
                n(), Ra.intervals[e] = (0, jn.LK)(n, 6e3)
            }
            static clearInterval(e) {
                null != Ra.intervals[e] && ((0, jn.wm)(Ra.intervals[e]), Ra.intervals[e] = null)
            }
        }
        Ra.baseLogTag = "QManager", Ra.intervals = {}, Ra.processing = {};
        const Ca = Ra;
        class La {
            constructor(e) {
                this.EVENT_ACTION = e.event.name, this.EVENT_ATTRS = e.event.attributes && Pa(e.event.attributes), this.EVENT_G_TIME = (new Date).getTime().toString(), this.EVENT_L_TIME = aa(e.event.timestamp), this.EVENT_ATTRS_CUST = e.postData.c, this.N_I_E = e.postData.nie, e.isPortfolioAttribute && (this.IS_PORTFOLIO = e.isPortfolioAttribute), this.userIdentityRecord = e.userIdentityRecord
            }
        }
        La.baseLogTag = "ReportAddViewEvent";
        const Pa = e => {
            const t = {};
            return e.forEach(e => {
                t[e.key] = e.value
            }), t
        };
        class Na {
            static visibilityChange() {
                "hidden" === document.visibilityState && (Na.windowClosed || Va.reactToTriggerEvents())
            }
            static removeEventListeners() {
                document.removeEventListener("visibilitychange", Na.visibilityChange, !1)
            }
            static addListeners() {
                document.addEventListener("visibilitychange", Na.visibilityChange, !1)
            }
        }
        Na.windowClosed = !1;
        const ka = Na;
        var Ma = n(634).VR;
        class Ba {
            static initialize() {
                return Ve(this, void 0, void 0, function*() {
                    if (null == Ba.ready) {
                        Ba.offlineDataStore = t().createInstance({
                            driver: [t().INDEXEDDB],
                            name: ir,
                            storeName: rr
                        });
                        const e = t().createInstance({
                                driver: [t().INDEXEDDB],
                                name: ir,
                                storeName: "moe_data"
                            }),
                            n = t().createInstance({
                                driver: [t().INDEXEDDB],
                                name: ir,
                                storeName: "moe_backup"
                            }),
                            i = [Ba.offlineDataStore.ready(), e.ready(), n.ready()];
                        Ba.ready = Ma.all(i)
                    }
                    return yield Ba.ready
                })
            }
        }
        class Ua {
            static getRemoteLogsBatchRequestOptions(e) {
                return new jn.VR(t => {
                    as.collectGetParams().then(n => {
                        const i = {
                            query_params: Object.assign(Object.assign({}, n), {
                                unique_id: n.unique_id,
                                os: "web" === n.os ? "Web" : "mWeb"
                            }),
                            logs: [...e]
                        };
                        t(i)
                    })
                })
            }
            static sendBatchOfLogs(e) {
                const t = as.baseLogTag + ".sendBatchOfLogs";
                return new jn.VR((n, i) => {
                    Ua.getRemoteLogsBatchRequestOptions(e).then(i => {
                        const a = Xr(),
                            s = a.baseDomainName + r + i.query_params.os.toLowerCase() + "/" + a.appId;
                        ar.post(s, {
                            postData: i
                        }).then(() => {
                            pi.log(1, t, "Batch Remote Logs sent to MoEngage successfully"), Ua.batchRemoteLogsApiRetries = 1, n(!0)
                        }).catch(n => {
                            pi.error(1, t, "Batch Remote Logs API failed", n), this.handleRemoteLogsFailure(e)
                        })
                    })
                })
            }
            static handleRemoteLogsFailure(e) {
                pi.log(1, as.baseLogTag + ".handleRemoteLogsFailure", "Retry Batch Logs Failed API", Ua.batchRemoteLogsApiRetries), Ua.batchRemoteLogsApiRetries < 3 && (0, jn.pS)(() => {
                    Ua.batchRemoteLogsApiRetries++, Ua.sendBatchOfLogs(e)
                }, 3e3 * Ua.batchRemoteLogsApiRetries)
            }
            static sendBeacon(e) {
                Ua.getRemoteLogsBatchRequestOptions(e).then(e => {
                    const t = Xr(),
                        n = t.baseDomainName + r + e.query_params.os.toLowerCase() + "/" + t.appId + "?" + (new Date).getTime();
                    navigator.sendBeacon(n, JSON.stringify(e))
                })
            }
        }
        Ua.batchRemoteLogsApiRetries = 1;
        const xa = Ua;
        class Fa {
            static updateEventStore() {
                Ge() !== Y.TV && (Yn() ? t().createInstance({
                    driver: [t().INDEXEDDB, t().WEBSQL, t().LOCALSTORAGE],
                    name: Ae,
                    storeName: we
                }).setItem(De, Fa.reports) : t().createInstance({
                    driver: [t().INDEXEDDB, t().WEBSQL, t().LOCALSTORAGE],
                    name: Ae,
                    storeName: Ce
                }).setItem(Ce, Fa.reports))
            }
            static spliceReports(e = Fa.reports.length) {
                const t = Fa.reports.splice(0, e);
                return Fa.updateEventStore(), t
            }
            static spliceRemoteLogs(e = Fa.remoteLogs.length) {
                return Fa.remoteLogs.splice(0, e)
            }
            static suspendBatching() {
                const e = Fa.baseLogTag + ".suspendBatching";
                this.spliceReports(), this.spliceRemoteLogs(), Fa.periodicSyncInterval && Fa.clearInterval(), ka.removeEventListeners(), pi.log(2, e, "Batching has stopped.")
            }
            static shouldCreateNewBatch() {
                return !Fa.lastbatchCreatedAt || (new Date).getTime() - Fa.lastbatchCreatedAt >= 15e3
            }
            static shouldCreateNewBatchForRemoteLogs() {
                return !Fa.lastRemoteLogsbatchCreatedAt || (new Date).getTime() - Fa.lastRemoteLogsbatchCreatedAt >= 15e3
            }
            static reactToTriggerEvents() {
                const e = Fa.baseLogTag + ".reactToTriggerEvents";
                Fa.reports.length > 0 && (pi.log(1, e, `Trigger Events: Created Batch of ${Fa.reports.length} reports`, aa()), Fa.createBatch(void 0, "tab_switch")), Fa.remoteLogs.length > 0 && (pi.log(1, e, `Trigger Events: Created Batch of remote logs ${Fa.remoteLogs.length} reports`, aa()), Fa.createRemoteLogsBatch())
            }
            static periodicSync(e) {
                const t = Fa.baseLogTag + ".periodicSync";
                Fa.reports.length > 0 && Fa.shouldCreateNewBatch() && (pi.log(1, t, `Periodic sync: Created Batch of ${Fa.reports.length} reports`, aa()), Fa.createBatch(void 0, "periodic")), Fa.remoteLogs.length > 0 && Fa.shouldCreateNewBatchForRemoteLogs() && (pi.log(1, t, `Periodic sync: Created Batch of remote logs ${Fa.remoteLogs.length} reports`, aa()), Fa.createRemoteLogsBatch())
            }
            static clearInterval() {
                (0, jn.wm)(Fa.periodicSyncInterval), Fa.lastbatchCreatedAt = null
            }
            static init(e) {
                Ar.getInstance().then(t => Ve(this, void 0, void 0, function*() {
                    (Fa.isOfflineBatchingSupported(t, e) || e.configs.remoteLogTracking) && (yield Ba.initialize(), Fa.periodicSyncInterval && Fa.clearInterval(), Fa.periodicSyncInterval = (0, jn.LK)(Fa.periodicSync.bind(this, e.configs.periodicFlushTime), 1e3 * e.configs.periodicFlushTime), ka.addListeners())
                }))
            }
            static sendBatch(e) {
                const t = Fa.baseLogTag + ".sendBatch";
                return new jn.VR(n => {
                    try {
                        as.sendBatchOfReports(e).then(() => {
                            Fa.lastbatchCreatedAt = (new Date).getTime(), n(!0)
                        })
                    } catch (e) {
                        pi.error(1, t, "Error in sending batch", e), n(!1)
                    }
                })
            }
            static sendRemoteLogs(e) {
                const t = Fa.baseLogTag + ".sendRemoteLogs";
                return new jn.VR(n => {
                    try {
                        xa.sendBatchOfLogs(e).then(() => {
                            Fa.lastRemoteLogsbatchCreatedAt = (new Date).getTime(), n(!0)
                        })
                    } catch (e) {
                        pi.error(1, t, "Error in sending batch of remote logs", e), n(!1)
                    }
                })
            }
            static createBatch(e, t = "size") {
                var n;
                if (Fa.reports.length > 0) {
                    const i = null !== (n = Pr.startSpan("batch_creation", {
                            source: "analytics/managers/BatchManager.ts",
                            trigger: t
                        })) && void 0 !== n ? n : null,
                        r = Fa.spliceReports(e);
                    Pr.checkpoint(i, "store_persisted"), Pr.endSpan(i, pr, {
                        batch_size: r.length
                    }), Fa.sendBatch(r)
                }
            }
            static createRemoteLogsBatch(e) {
                if (Fa.remoteLogs.length > 0) {
                    const t = Fa.spliceRemoteLogs(e);
                    Fa.sendRemoteLogs(t)
                }
            }
            static addReport(e, t) {
                const n = Fa.baseLogTag + ".addReport",
                    i = new La(e);
                return Br(i) ? (pi.errorAndBroadcast(1, n, Z, "Not tracking the event", Ur(i.EVENT_ACTION)), !1) : (Fa.reports.push(i), Br(Fa.reports) ? (Fa.reports.pop(), pi.log(1, n, `Created Batch of ${Fa.reports.length} reports as payload size would have breached after adding new event to this batch: "${i.EVENT_ACTION}"`, aa()), Fa.createBatch(void 0, "payload_breach"), Fa.reports.push(i), Fa.updateEventStore()) : (Fa.updateEventStore(), Fa.reports.length === t && (pi.log(1, n, `Created Batch of ${t} reports`, aa()), Fa.createBatch(t))), !0)
            }
            static sendBeacon() {
                const e = Fa.baseLogTag + ".sendBeacon";
                Fa.reports.length > 0 && (pi.log(1, e, `Window Unload: Created batch of ${Fa.reports.length} reports`, aa()), as.sendBeacon(Fa.spliceReports())), Fa.remoteLogs.length > 0 && (pi.log(1, e, `Window Unload: Created Remote Logs batch of ${Fa.remoteLogs.length} reports`, aa()), xa.sendBeacon(Fa.spliceRemoteLogs()), Fa.lastRemoteLogsbatchCreatedAt = (new Date).getTime())
            }
            static flushReports() {
                return Ve(this, arguments, void 0, function*(e = !1) {
                    const t = Fa.baseLogTag + ".flushReports";
                    try {
                        e && ka.removeEventListeners(), Fa.reports.length > 0 && (pi.log(1, t, `Flushed ${Fa.reports.length} reports`, aa()), yield Fa.sendBatch(Fa.spliceReports())), Fa.remoteLogs.length > 0 && (pi.log(1, t, `Flushed ${Fa.remoteLogs.length} remote logs`, aa()), yield Fa.sendRemoteLogs(Fa.spliceRemoteLogs()))
                    } catch (e) {
                        pi.error(1, t, "Error in flushing reports", e)
                    }
                })
            }
            static isOfflineBatchingSupported(e, t) {
                return t || (t = Zn.get(Ee.WEB_SETTINGS)), Fa.isBatchingSupported(t, e)
            }
            static addRemoteLogs(e, t = 15) {
                const n = Fa.baseLogTag + ".addRemoteLogs";
                Fa.remoteLogs.push(e), Fa.remoteLogs.length === t && (pi.log(1, n, `Created Batch of ${t} reports`, aa()), Fa.createRemoteLogsBatch(t))
            }
            static isBatchingSupported(e, t) {
                try {
                    const n = Ge();
                    return !(!(null == e ? void 0 : e.configs.isBatchingEnabled) || ("web" !== n || t.name !== Ar.BROWSER_NAMES.CHROME && t.name !== Ar.BROWSER_NAMES.EDGE && t.name !== Ar.BROWSER_NAMES.OPERA) && ("mobile" !== n || Ar.isIOS() || t.name !== Ar.BROWSER_NAMES.CHROME && t.name !== Ar.BROWSER_NAMES.OPERA) || !navigator.sendBeacon)
                } catch (e) {
                    pi.error(1, "BatchManager.isBatchingSupported", e)
                }
            }
        }
        Fa.baseLogTag = "BatchManager", Fa.reports = [], Fa.remoteLogs = [], Fa.lastbatchCreatedAt = null, Fa.lastRemoteLogsbatchCreatedAt = null;
        const Va = Fa;

        function Wa(e, t) {
            return null == e || null == (null == t ? void 0 : t.uid) ? null != t ? t : void 0 : Object.assign(Object.assign({}, t), {
                uid: e
            })
        }

        function Ha() {
            const e = ga.getSync(),
                t = null == e ? void 0 : e.getAttribute("id"),
                n = null != t ? String(t) : void 0,
                {
                    userIdentities: i,
                    previousIdentities: r
                } = zr.getIdentifiersFromIdentities();
            return Object.freeze({
                moe_user_id: n,
                userIdentities: Wa(n, i),
                previousIdentities: null != r ? r : void 0,
                deviceUuid: null == e ? void 0 : e.deviceUuid
            })
        }
        class Ga {
            constructor(e) {
                const t = Ga.baseLogTag + ".constructor",
                    n = null != e ? e : Ha(),
                    i = n.moe_user_id,
                    r = window.analytics;
                let a, s;
                if (r) {
                    s = r._VERSIONS;
                    try {
                        a = r.user().anonymousId()
                    } catch (e) {
                        pi.error(1, t, "Error getting anonymous id from segment api", e)
                    }
                }
                this.c = void 0, this.h = "", (i || a || n.userIdentities) && (this.identifiers = {
                    moe_user_id: i,
                    segment_id: a,
                    user_identities: n.userIdentities,
                    previous_identities: n.previousIdentities
                });
                const o = Dt.get();
                this.meta = {
                    bid: yi(),
                    segmentSdkData: r ? s : void 0,
                    integration_type: null == o ? void 0 : o.integrationType,
                    integration_version: null == o ? void 0 : o.integrationVersion
                }
            }
        }
        Ga.baseLogTag = "ReportPostData";
        class $a {
            constructor(e, t, n, i = ea.USER_ATTRIBUTE_LEVEL.PROJECT, r) {
                this.status = $a.STATUS.INVALID, this.type = e, this.getParams = t, this.event = n, this.userIdentityRecord = null != r ? r : Ha(), this.isPortfolioAttribute = i === ea.USER_ATTRIBUTE_LEVEL.PORTFOLIO, this.postData = new Ga(this.userIdentityRecord);
                const a = {},
                    s = {};
                for (const e of n.attributes)
                    if (e && null != e.key && (this.status = $a.STATUS.VALID, null != e.value))
                        if ("function" == typeof e.value.getMonth) {
                            const t = {};
                            t[e.key] = Math.round(e.value.getTime() - 6e4 * e.value.getTimezoneOffset()), null == s.timestamp && (s.timestamp = []), s.timestamp.push(t)
                        } else a[e.key] = e.value;
                var o;
                this.postData.e = n.name, this.postData.a = a, this.postData.c = (o = s, 0 === Object.keys(o).length && o.constructor === Object ? void 0 : s), window && window.location && null != window.location.href && (this.postData.url = window.location.href)
            }
        }
        $a.baseLogTag = "ReportClass",
            function(e) {
                e.STATUS = {
                    INVALID: 0,
                    VALID: 1
                }, e.REPORT_ADD_TYPE = {
                    USER_ATTRIBUTE: 0,
                    EVENT: 1
                }
            }($a || ($a = {}));
        const ja = $a,
            Ka = {
                IMPRESSION: "MOE_LANDING_PAGE_SHOWN",
                CLICK: "MOE_LANDING_PAGE_CLICKED",
                FORM_SUBMIT: "MOE_RESPONSE_SUBMITTED"
            },
            qa = "v5/landingpages/email-preferences",
            Ya = [...Object.values(Q), ...Object.values(Ti.OSM), ...Object.values(Ti.WP), ...Object.values({
                IMPRESSION: "MOE_WEBP_MESSAGE_SHOWN",
                CLICK: "MOE_WEBP_MESSAGE_CLICKED"
            }), ...Object.values(Ka), ...Object.values({
                DELIVERED: "MOE_CARD_DELIVERED",
                IMPRESSION: "MOE_CARD_IMPRESSION",
                CLICKED: "MOE_CARD_CLICKED",
                DISMISSED: "MOE_CARD_DISMISSED",
                INBOX_OPEN: "MOE_CARD_INBOX_CLICKED"
            })].filter(e => "EVENT_ACTION_USER_ATTRIBUTE" !== e);
        class za {
            constructor(e, t, n = !0) {
                this.name = e, this.attributes = t, this.timestamp = (new Date).getTime(), n && this.attributes.push(new ea("URL", location.href))
            }
            static createUserAttributeEvent(e) {
                return new jn.VR((t, n) => {
                    const i = [],
                        r = e.key;
                    e.key = na(e.key), i.push(e), e.key !== r && pi.log(2, "Event.createUserAttributeEvent", "Key changed to MoE reserved keyname: ", e.key), t(new za(Q.USER_ATTRIBUTE, i, !1))
                })
            }
            static createEvent(e, t, n) {
                return new jn.VR((i, r) => {
                    ga.get().then(r => Ve(this, void 0, void 0, function*() {
                        try {
                            const a = new ea("moe_logged_in_status", !!r.getAttribute("id")),
                                s = new Aa,
                                o = new ea("moe_first_visit", s.getNumberOfSessions() <= 1);
                            t.push(a, o), i(new za(e, t, n))
                        } catch (e) {
                            pi.error(1, "Event.createEvent", "Error occurred in create events ", e)
                        }
                    }))
                })
            }
        }
        class Ja {
            static addEvent(e) {
                Ja.history.push(e), Ja.listeners.forEach(t => {
                    t(e)
                })
            }
            static getHistory() {
                return Ja.history
            }
            static addEventListener(e) {
                Ja.listeners.push(e)
            }
            static clear() {
                Ja.history = []
            }
            static clearAll() {
                Ja.history = [], Ja.listeners = []
            }
        }
        Ja.history = [], Ja.listeners = [];
        const Qa = Ja;
        class Xa {
            static track(e, t, n) {
                const i = "MoEngage.event.trackEvent";
                return new jn.VR((r, s) => Ve(this, void 0, void 0, function*() {
                    var s, o, l;
                    if (!ti()) return pi.warnAndBroadcast(2, i, Z, Xe, Qe(`the event "${e}"`), ne.WEB_OPT_OUT), void r(!1);
                    if (!Sa() && !Ya.includes(e)) return pi.warnAndBroadcast(2, i, Z, at, `Not tracking the event "${e}" as data tracking has been disabled.`, ne.DATA_OPT_OUT), void r(!1);
                    let d;
                    n = !!n;
                    try {
                        d = yield Qr()
                    } catch (n) {
                        return pi.warnAndBroadcast(1, i, Z, "SDK not yet initialized", "SDK not yet initialized. Caching event and will track when SDK is initialized. Please track events after the SDK initialization is complete.", void 0, n), null === (s = window.moengage_q) || void 0 === s || s.push({
                            f: "trackEvent",
                            a: [e, t]
                        }), void r(!1)
                    }
                    if ("string" == typeof e && e)
                        if (d.configs.blacklistedEvents && d.configs.blacklistedEvents.includes(e)) pi.errorAndBroadcast(1, i, Z, "Event is blacklisted", `Event name: "${e}" is blacklisted. Please contact Moengage team to whitelist it.`, ne.EVENTS_TRACKING), r({
                            error: 5001,
                            message: `Event "${e}" is blacklisted.`
                        });
                        else if (!Qi.includes(e) || d.configs.whitelistedEvents && d.configs.whitelistedEvents.includes(e))
                        if (e === Q.USER_ATTRIBUTE && t && "object" == typeof t && Object.prototype.hasOwnProperty.call(t, a)) pi.errorAndBroadcast(1, i, Z, "Reserved attribute not allowed", `Cannot track "${a}" as event`, ne.EVENTS_TRACKING), r({
                            error: 5001,
                            message: `"${a}" cannot be set via trackEvent.`
                        });
                        else try {
                            const a = Ha(),
                                s = [];
                            if (null == t || null !== t && t === Object(t) && "[object Object]" === Object.prototype.toString.call(t)) {
                                null == t && (t = {});
                                const i = null !== (o = Pr.startSpan(ur, {
                                    source: "analytics/EventMethods.ts",
                                    event_name: e
                                })) && void 0 !== o ? o : null;
                                for (const e in t) t.hasOwnProperty(e) && s.push(new ea(e, t[e]));
                                const c = new Aa;
                                yield c.initiateSessionAndSource(d);
                                const u = yield za.createEvent(e, s);
                                Qa.addEvent(u), Pr.checkpoint(i, "event_created"), (null == d ? void 0 : d.configs.isWebPersonalizationModuleEnabled) && (null === (l = window.MoeWebP) || void 0 === l || l.handleInSessionEvent(u)), as.collectGetParams().then(t => {
                                    kr(e) && delete t.push_id;
                                    const s = new ja(ja.REPORT_ADD_TYPE.EVENT, t, u, void 0, a),
                                        {
                                            session: o,
                                            source: l
                                        } = c.getReportMeta();
                                    s.postData.meta.session = o, l && (s.postData.meta.source = l), c.isNonEventInteractive(u) && (s.postData.nie = 1), Pr.checkpoint(i, "report_assembled"), s.telemetrySpanId = null != i ? i : void 0, as.reportAdd(s, n).then(() => {
                                        c.isNonEventInteractive(u) || c.extendSession(), r(!0)
                                    })
                                })
                            } else pi.errorAndBroadcast(1, i, Z, "Invalid event attributes", `Event "${e}"'s attributes should be either empty or a key-value pair object.`, ne.EVENTS_TRACKING), r({
                                error: 5002,
                                message: "Event value needs to be a key-value pair object"
                            })
                        } catch (e) {
                            pi.error(1, i, "Error occurred in tracking events ", e)
                        } else pi.warnAndBroadcast(1, i, Z, "Event is not whitelisted", `Event name: "${e}" is not whitelisted. Please contact Moengage team to whitelist it.`, ne.EVENTS_TRACKING), r({
                            error: 5001,
                            message: `Event "${e}" is not whitelisted.`
                        });
                    else pi.errorAndBroadcast(1, i, Z, "Event name not a string or null or empty string", `Event name: "${e}" should be a string`, ne.EVENTS_TRACKING, e), r({
                        error: 5001,
                        message: "Event name can not be null"
                    })
                }))
            }
        }
        const Za = "prompt",
            es = "granted",
            ts = "denied",
            ns = "dismissed";
        var is = n(634).VR;
        class rs {
            static deviceAdd(e = !0) {
                return rs.isExecutingDeviceAdd ? (pi.warn(2, rs.baseLogTag + ".deviceAdd", "Device add is already in progress. Skipping this call."), is.resolve(!1)) : (rs.isExecutingDeviceAdd = !0, new jn.VR((t, n) => Ve(this, void 0, void 0, function*() {
                    if (!Ea()) return void t(!1);
                    const r = Dt.get();
                    return rs.collectGetParams(i).then(a => {
                        a = Object.assign(Object.assign({}, a), {
                            url: window.location.href
                        }), ar.post(r.baseDomainName + i, {
                            queryParams: a
                        }).then(() => {
                            e ? ga.get().then(e => {
                                e.deviceAdded = !0, e.save().then(() => {
                                    Ca.startPeriodicClear(Ee.Q.REPORT), rs.onDeviceAdd.res()
                                })
                            }).then(() => {
                                this.trackDeviceAttributes(), rs.isExecutingDeviceAdd = !1, t(!0)
                            }) : (rs.isExecutingDeviceAdd = !1, t(!0))
                        }).catch(e => {
                            kt.enqueue(Ee.Q.DEVICE, !0), rs.isExecutingDeviceAdd = !1, n(!1)
                        })
                    })
                })))
            }
            static trackDeviceAttributes() {
                const e = rs.baseLogTag + ".trackDeviceAttributes";
                return new jn.VR((t, n) => Ve(this, void 0, void 0, function*() {
                    try {
                        let t = Ge().toUpperCase();
                        t = "WEB" === t ? "DESKTOP" : t, Xa.track(Q.DEVICE_ATTRIBUTE, {
                            deviceType: t
                        });
                        let n = !1;
                        Ar.getInstance().then(t => {
                            Qr().then(i => Ve(this, void 0, void 0, function*() {
                                if (Rt(i, t)) {
                                    let t = Hr();
                                    if (!t) try {
                                        const e = We() || {};
                                        let n = "";
                                        "function" == typeof e.getPermissionState && (n = yield e.getPermissionState()), n === es && (t = !0)
                                    } catch (t) {
                                        pi.error(2, e, "Failed to get push notification permission state.", t)
                                    }
                                    n = t
                                }
                            })).then(() => {
                                Xa.track(Q.DEVICE_ATTRIBUTE, {
                                    [c]: !!n,
                                    source: "deviceAdd"
                                }), Zn.set(Ee.OPTED_STATUS_TRACK_TIME, Date.now())
                            })
                        })
                    } catch (t) {
                        pi.error(2, e, "Failed to track device attributes.", t)
                    }
                    t(null)
                }))
            }
            static reportAdd(e, t) {
                const n = rs.baseLogTag + ".reportAdd";
                return new jn.VR((i, r) => {
                    t = !!t, Qr().then(a => {
                        ga.get().then(s => {
                            var o;
                            const l = xe.get(Te) && (null === (o = null == a ? void 0 : a.configs) || void 0 === o ? void 0 : o.landingPageTracking);
                            try {
                                if (l && !Jr.shouldTriggerSubscriberBilling({
                                        user: s,
                                        sdkSettings: a,
                                        attributeNames: [e.event.attributes[0].key]
                                    })) return pi.log(2, n, "Landing page tracking enabled (both flag and config), processing report immediately:", e.event.name), kt.isEmpty(Ee.Q.REPORT) || (pi.log(2, n, "Flushing queued reports as landing page tracking is enabled"), Ca.clear(Ee.Q.REPORT)), rs.executeReportAdd(e, t, i, r)
                            } catch (e) {
                                pi.error(2, n, "Error checking push subscription attribute acceptance for landing page tracking:", e)
                            }
                            return a.isPushSubBilling ? rs.handleReportPushSubBilling(e, t, a, s, i, r) : rs.executeReportAdd(e, t, i, r)
                        }).catch(a => (pi.error(1, n, "Error getting user data for push subscriber billing:", a), rs.executeReportAdd(e, t, i, r)))
                    }).catch(() => {
                        r(!1)
                    })
                })
            }
            static executeReportAdd(e, t, n, i) {
                rs.reportAddInternal(e, t).then(() => {
                    this.sendBroadcast(e), n(!0)
                }).catch(() => {
                    i(!1)
                })
            }
            static handleReportPushSubBilling(e, t, n, i, r, a) {
                var s;
                const o = rs.baseLogTag + ".handleReportPushSubBilling";
                if (i.deviceAdded) {
                    if (rs.isHeldForAnotherDevice(e, i.deviceUuid)) return pi.log(2, o, "Dropping report held for another device:", e.event.name), void r(!0);
                    e.heldForBilling = void 0, rs.executeReportAdd(e, t, r, a)
                } else pi.log(2, o, "Device not added yet, queuing report:", e.event.name), rs.queueReportForDeviceAdd(e, n, i), Pr.endSpan(null !== (s = e.telemetrySpanId) && void 0 !== s ? s : null, pr, {
                    handoff: "held_pending_billing"
                }), r(!0)
            }
            static queueReportForDeviceAdd(e, t, n) {
                e.heldForBilling = !0, kt.enqueue(Ee.Q.REPORT, e), e.type === ja.REPORT_ADD_TYPE.USER_ATTRIBUTE && rs.handleUserAttributeForPushSubBilling(e, t, n)
            }
            static isHeldForAnotherDevice(e, t) {
                var n;
                const i = e.heldForBilling ? null === (n = e.userIdentityRecord) || void 0 === n ? void 0 : n.deviceUuid : void 0;
                return null != i && i !== t
            }
            static handleUserAttributeForPushSubBilling(e, t, n) {
                const i = rs.baseLogTag + ".handleUserAttributeForPushSubBilling";
                e.event.attributes && 0 !== e.event.attributes.length && (Jr.shouldTriggerSubscriberBilling({
                    user: n,
                    sdkSettings: t,
                    attributeNames: [e.event.attributes[0].key]
                }) ? (pi.log(2, i, "Attribute accepted for push sub billing."), rs.deviceAdd()) : pi.log(2, i, "Attribute NOT accepted for push sub billing."))
            }
            static sendBroadcast(e) {
                Zi.NAMES.includes(e.event.name) && ii.broadcastToWindow({
                    topic: Zi.TOPIC,
                    name: e.event.name,
                    data: e.event.attributes
                })
            }
            static getSegmentId() {
                const e = window.analytics;
                if (e && e.user) return e.user().anonymousId()
            }
            static getBatchRequestOptions(e) {
                const t = Ha();
                return new jn.VR(n => {
                    rs.collectGetParams(er).then(i => Ve(this, void 0, void 0, function*() {
                        var r, s, o, l, d, c;
                        const u = rs.getSegmentId() || "",
                            g = ga.getSync(),
                            p = Dt.get(),
                            m = new Aa,
                            {
                                session: h,
                                source: v
                            } = m.getReportMeta(),
                            f = null === (r = e[0]) || void 0 === r ? void 0 : r.userIdentityRecord,
                            E = null != f ? f : t;
                        rs.logIdentityDivergence(f, g);
                        const S = {
                                user_identities: E.userIdentities,
                                previous_identities: E.previousIdentities
                            },
                            y = yield this.getParamsFromCookie();
                        let _ = null,
                            b = null;
                        const T = Object.assign({}, i);
                        null !== y && "object" == typeof y && (_ = y.moe_user_id, b = y.unique_id, null !== y.push_id && (T.push_id = y.push_id), null !== y.unique_id && (T.unique_id = y.unique_id)), E.deviceUuid && (T.unique_id = E.deviceUuid);
                        const I = e => null != e && e === T.unique_id,
                            A = null !== (d = null !== (o = null !== (s = E.moe_user_id) && void 0 !== s ? s : I(b) ? _ : null) && void 0 !== o ? o : I(null == g ? void 0 : g.deviceUuid) ? null === (l = g.getAttribute("id")) || void 0 === l ? void 0 : l.toString() : null) && void 0 !== d ? d : void 0,
                            w = e.filter(e => {
                                var t;
                                const n = null === (t = e.EVENT_ATTRS) || void 0 === t ? void 0 : t[a],
                                    i = null != A && null != n && String(n) !== String(A);
                                return i && pi.warn(2, rs.baseLogTag + ".getBatchRequestOptions", "Dropped report with foreign USER_ATTRIBUTE_UNIQUE_ID"), !i
                            }).map(e => Object.assign(Object.assign({}, e), {
                                userIdentityRecord: void 0
                            })),
                            O = {
                                query_params: T,
                                identifiers: Object.assign(Object.assign({
                                    moe_user_id: A,
                                    segment_id: u || void 0
                                }, S), {
                                    moe_aid: fa()
                                }),
                                meta: {
                                    bid: yi(),
                                    request_time: (new Date).toISOString(),
                                    session: h,
                                    source: v,
                                    initiator: (null === (c = null == p ? void 0 : p.customProxyDomain) || void 0 === c ? void 0 : c.length) ? "proxy_server" : void 0,
                                    integration_type: null == p ? void 0 : p.integrationType,
                                    integration_version: null == p ? void 0 : p.integrationVersion
                                },
                                viewsCount: w.length,
                                viewsInfo: w
                            };
                        Sa() || (O.meta.dev_pref = {
                            e_t_p: !1
                        }), n(O)
                    }))
                })
            }
            static getParamsFromCookie() {
                const e = {
                    moe_user_id: null,
                    unique_id: null,
                    push_id: null
                };
                return new jn.VR(t => {
                    Qr().then(n => {
                        var i, r;
                        if (null == n ? void 0 : n.isDomainLevelStorage) {
                            const t = $n.get(Ee.USER_DATA),
                                n = null === (i = $n.get(Ee.SUBSCRIPTION_DETAILS)) || void 0 === i ? void 0 : i.token;
                            if (t) {
                                const n = _t(t);
                                e.moe_user_id = null != n ? n : void 0, (null === (r = t.deviceUuid) || void 0 === r ? void 0 : r.length) && (e.unique_id = t.deviceUuid)
                            }
                            e.push_id = (null == n ? void 0 : n.length) && _a(n) ? n : void 0
                        }
                        t(e)
                    }).catch(() => {
                        t(e)
                    })
                })
            }
            static addReportsToOfflineDB(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    const n = rs.baseLogTag + ".addReportsToOfflineDB",
                        i = rs.groupReportsByIdentity(e),
                        r = t || yi();
                    let a;
                    for (let e = 0; e < i.length; e++) {
                        const t = i[e],
                            n = yield rs.getBatchRequestOptions(t), s = `${r}_${e}`;
                        yield Ba.offlineDataStore.setItem(`report_add_${s}`, t), yield Ba.offlineDataStore.setItem(`batch_${s}`, n), a = n
                    }
                    a && (yield Ba.offlineDataStore.setItem("requestMetaData", a)), navigator.serviceWorker && navigator.serviceWorker.ready.then(e => {
                        e.sync ? e.sync.register("moe_offline_data_sync").then(() => {
                            pi.log(2, n, "offline sync event registered")
                        }).catch(e => {
                            pi.error(1, n, "Service worker sync error", e)
                        }) : pi.log(2, n, "Service worker sync unavailable")
                    })
                })
            }
            static sendReportBeacon(e, t, n) {
                const i = rs.baseLogTag + ".sendReportBeacon";
                try {
                    if (!e && navigator.sendBeacon && navigator.sendBeacon(t, new Blob([JSON.stringify(n)], {
                            type: "text/plain;charset=UTF-8"
                        }))) return !0
                } catch (e) {
                    pi.error(2, i, "Failed to send Report call with Beacon:", e)
                }
                return !1
            }
            static logIdentityDivergence(e, t) {
                var n;
                if (!e) return;
                const i = null === (n = null == t ? void 0 : t.getAttribute("id")) || void 0 === n ? void 0 : n.toString(),
                    r = null == t ? void 0 : t.deviceUuid;
                if (null != e.moe_user_id && null != i && e.moe_user_id !== i || null != e.deviceUuid && null != r && e.deviceUuid !== r) {
                    const t = `Frozen identity/device differs from the current user; sending under frozen values to avoid a merge. frozen=(uid:${e.moe_user_id}, device:${e.deviceUuid}) live=(uid:${i}, device:${r})`;
                    pi.warn(2, rs.baseLogTag + ".logIdentityDivergence", t), pi.broadcastLog(Z, "Frozen identity/device differs from current user", t, ne.USER_ATTRIBUTES_TRACKING)
                }
            }
            static getIdentityKey(e) {
                var t, n, i, r;
                return e ? JSON.stringify({
                    moe_user_id: null !== (t = e.moe_user_id) && void 0 !== t ? t : null,
                    userIdentities: null !== (n = e.userIdentities) && void 0 !== n ? n : null,
                    previousIdentities: null !== (i = e.previousIdentities) && void 0 !== i ? i : null,
                    deviceUuid: null !== (r = e.deviceUuid) && void 0 !== r ? r : null
                }) : "anonymous"
            }
            static groupReportsByIdentity(e) {
                const t = new Map;
                for (const n of e) {
                    const e = rs.getIdentityKey(n.userIdentityRecord),
                        i = t.get(e);
                    i ? i.push(n) : t.set(e, [n])
                }
                return Array.from(t.values())
            }
            static flushHeldReports() {
                var e;
                const t = rs.baseLogTag + ".flushHeldReports",
                    n = new Map,
                    i = null === (e = ga.getSync()) || void 0 === e ? void 0 : e.deviceUuid;
                for (; !kt.isEmpty(Ee.Q.REPORT);) {
                    const e = kt.dequeue(Ee.Q.REPORT);
                    if (!e) break;
                    if (rs.isHeldForAnotherDevice(e, i)) continue;
                    const t = new La(e),
                        r = rs.getIdentityKey(t.userIdentityRecord),
                        a = n.get(r);
                    a ? a.push(t) : n.set(r, [t])
                }
                if (0 === n.size) return is.resolve();
                const r = [];
                let a = 0;
                return n.forEach(e => {
                    a += e.length, r.push(rs.sendBatchOfReports(e).catch(e => {
                        pi.error(1, t, "Failed to flush held reports on logout", e)
                    }))
                }), pi.log(1, t, `Flushing ${a} held report(s) in ${r.length} batch(es) on logout.`), is.all(r)
            }
            static sendBatchOfReports(e) {
                var t;
                const n = rs.baseLogTag + ".sendBatchOfReports",
                    i = rs.groupReportsByIdentity(e);
                if (i.length > 1) return pi.log(1, n, `Splitting batch of ${e.length} report(s) into ${i.length} batches by identity.`), is.all(i.map(e => rs.sendBatchOfReports(e)));
                const r = null !== (t = Pr.startSpan("batch_syncing", {
                        source: "analytics/apis/index.ts",
                        batch_size: e.length
                    })) && void 0 !== t ? t : null,
                    a = e.length;
                return new jn.VR((t, i) => {
                    rs.getBatchRequestOptions(e).then(s => {
                        Pr.checkpoint(r, "payload_built");
                        const o = Dt.get(),
                            l = o.baseDomainName + er + o.appId;
                        Qr().then(i => window.navigator.onLine ? rs.sendReportBeacon(i.configs.isBeaconDisabled, l, s) ? (pi.log(1, n, `Batch of ${e.length} event(s) sent to MoEngage successfully through beacon`, null == s ? void 0 : s.viewsInfo), Pr.endSpan(r, pr, {
                            transport: "beacon",
                            events_dispatched: a,
                            events_delivered: a
                        }), void t(!0)) : void ar.post(l, {
                            postData: s
                        }).then(() => {
                            pi.log(1, n, `Batch of ${e.length} event(s) sent to MoEngage successfully`, null == s ? void 0 : s.viewsInfo), Pr.endSpan(r, pr, {
                                transport: "xhr",
                                events_dispatched: a,
                                events_delivered: a
                            }), t(!0)
                        }).catch(s => {
                            pi.error(1, n, "Batch Report add API failed", s), Pr.endSpan(r, mr, {
                                transport: "offline",
                                failure_reason: "network",
                                events_dispatched: a,
                                events_delivered: 0
                            }), t(this.sendToOfflineTracking(e, s, i))
                        }) : (Pr.endSpan(r, pr, {
                            transport: "offline",
                            events_dispatched: a,
                            events_delivered: 0
                        }), void t(this.sendToOfflineTracking(e, tr, i)))).catch(e => {
                            Pr.endSpan(r, mr, {
                                failure_reason: "settings_unavailable",
                                events_dispatched: a,
                                events_delivered: 0
                            }), i(e)
                        })
                    })
                })
            }
            static sendToOfflineTracking(e, t, n) {
                const i = rs.baseLogTag + ".sendToOfflineTracking";
                return new jn.VR((r, a) => {
                    if (!Ea()) return pi.warn(2, i, "Not adding report(s) to offline db as SDK has been disabled."), void a(t);
                    Ar.getInstance().then(s => {
                        if (Va.isOfflineBatchingSupported(s, n)) {
                            pi.error(1, i, "Add Report API failed, adding reports to offline db. ", t);
                            let n = !1;
                            const a = rs.addReportsToOfflineDB(e).catch(e => pi.error(2, i, "Offline batch persist failed", e)).then(() => {
                                n = !0
                            });
                            or(a, 1500).then(() => {
                                n || pi.warn(2, i, "Offline batch persist exceeded 1500ms; completing in background"), pi.logAndBroadcast(2, i, Z, "You are offline", "Event(s) could not get tracked. Adding event(s) to offile database. They will be synced when you are back online."), r(!0)
                            })
                        } else pi.warnAndBroadcast(1, i, Z, "You are offline", "Event could not get tracked. Also, the event(s) were not added to offline database because either batching or the browser is not supported."), a(t)
                    }).catch(() => {
                        a(t)
                    })
                })
            }
            static checkAndTrackUniversalLink() {
                const e = rs.baseLogTag + ".trackUniversalLink",
                    t = Mt(window.location.href).moeq;
                if (t) {
                    if (pi.log(2, e, "Universal link found: ", t), !Ea()) return void pi.warnAndBroadcast(2, e, Z, Xe, Qe("universal link"), ne.WEB_OPT_OUT);
                    ga.get().then(e => Ve(this, void 0, void 0, function*() {
                        Ar.getInstance().then(n => {
                            const i = Dt.get(),
                                r = {
                                    meta_data: {
                                        app_id: i.appId,
                                        request_id: yi(),
                                        project_code: i.projectId || void 0,
                                        sdk_ver: "2.81.01",
                                        app_ver: "1.0",
                                        os: n.os,
                                        unique_id: e.deviceUuid,
                                        device_unique_id: this.getDeviceUniqueId(),
                                        url: window.location.href
                                    },
                                    tracking_data: {
                                        timestamp: (new Date).getTime(),
                                        moeq: t
                                    }
                                };
                            navigator.sendBeacon(i.baseDomainName + "v1/sdk/track/click", JSON.stringify(r))
                        })
                    }))
                }
            }
            static reportAddInternal(e, t) {
                const n = rs.baseLogTag + ".reportAddInternal";
                return new jn.VR((r, a) => {
                    Qr().then(a => {
                        Ar.getInstance().then(s => {
                            var o, l, d, c;
                            if (t) {
                                const t = rs.getUpdatedPushDetails();
                                for (const n in t) !t.hasOwnProperty(n) || kr(e.event.name) && "push_id" === n || (e.getParams[n] = t[n]);
                                const n = $e(),
                                    o = {
                                        queryParams: Object.assign(Object.assign({}, e.getParams), n)
                                    };
                                if (e.postData.nie) {
                                    const t = Object.assign({}, e);
                                    delete t.postData.meta.source, delete t.postData.meta.session, o.postData = t.postData
                                } else o.postData = e.postData;
                                let l = Dt.get().baseDomainName;
                                l += i, ar.post(l, o).then(() => {
                                    let t = Ge().toUpperCase();
                                    t = "WEB" === t ? "DESKTOP" : t, Xa.track(Q.DEVICE_ATTRIBUTE, {
                                        deviceType: t
                                    }), r(rs.handleReportAddSuccess(e))
                                }).catch(t => {
                                    Va.isBatchingSupported(a, s) ? kt.enqueue(Ee.Q.DEVICE, e) : rs.handleReportAddFailure(e, t)
                                })
                            } else if (Va.isBatchingSupported(a, s)) Va.addReport(e, a.configs.eventBatchCount) && (pi.log(1, n, `Event batched successfully: ${null===(o=e.event)||void 0===o?void 0:o.name}`, null === (l = e.postData) || void 0 === l ? void 0 : l.a), this.addEventsToIDB(e.event)), Pr.endSpan(null !== (d = e.telemetrySpanId) && void 0 !== d ? d : null, pr, {
                                handoff: "batched"
                            }), r(!0);
                            else {
                                const t = new La(e);
                                Br(t) ? (Pr.endSpan(null !== (c = e.telemetrySpanId) && void 0 !== c ? c : null, mr, {
                                    handoff: "dropped",
                                    drop_reason: "payload_size_exceeded"
                                }), pi.errorAndBroadcast(1, n, Z, "Event payload size exceeded", Ur(t.EVENT_ACTION)), r(!1)) : rs.sendBatchOfReports([t]).then(() => {
                                    var t;
                                    Pr.endSpan(null !== (t = e.telemetrySpanId) && void 0 !== t ? t : null, pr, {
                                        handoff: "sent"
                                    }), r(rs.handleReportAddSuccess(e))
                                }).catch(t => {
                                    var n;
                                    Pr.endSpan(null !== (n = e.telemetrySpanId) && void 0 !== n ? n : null, mr, {
                                        handoff: "sent",
                                        drop_reason: "network"
                                    }), rs.handleReportAddFailure(e, t)
                                })
                            }
                        })
                    }).catch(() => {
                        a(!1)
                    })
                })
            }
            static handleReportAddSuccess(e) {
                var t, n;
                const i = rs.baseLogTag + ".handleReportAddSuccess";
                return e.type === ja.REPORT_ADD_TYPE.EVENT ? (pi.log(1, i, `Event tracked successfully: ${null===(t=e.event)||void 0===t?void 0:t.name}`, null === (n = e.postData) || void 0 === n ? void 0 : n.a), this.addEventsToIDB(e.event)) : e.type === ja.REPORT_ADD_TYPE.USER_ATTRIBUTE && pi.log(1, i, "User attribute added successfully:", e.event.attributes), rs.addReportApiRetries = 1, !0
            }
            static handleReportAddFailure(e, t) {
                const n = rs.baseLogTag + ".handleReportAddFailure";
                pi.error(1, n, "Add Report API failed", t), e.type === ja.REPORT_ADD_TYPE.EVENT ? pi.log(1, n, "Queueing unsuccessful event tracking:", e.event) : e.type === ja.REPORT_ADD_TYPE.USER_ATTRIBUTE && pi.log(1, n, "Queueing unsuccessful user attribute add:", e.event.attributes), rs.addReportApiRetries < 3 && (0, jn.pS)(() => {
                    rs.addReportApiRetries++, kt.enqueue(Ee.Q.REPORT, e), Ca.startPeriodicClear(Ee.Q.REPORT)
                }, 3e3 * rs.addReportApiRetries)
            }
            static checkIfTokenValid(e) {
                const t = Dt.get().baseDomainName + "v2/device/token-check",
                    n = Dt.get();
                return new jn.VR(i => {
                    e ? ga.get().then(r => {
                        ar.post(t, {
                            queryParams: {
                                app_id: n.appId,
                                unique_id: r.deviceUuid,
                                push_id: e
                            }
                        }).then(e => {
                            i(200 === e.status)
                        }).catch(e => {
                            i(!1)
                        })
                    }) : i(!1)
                })
            }
            static collectGetParams(e) {
                return new jn.VR((t, n) => {
                    ga.get().then(n => Ve(this, void 0, void 0, function*() {
                        let r = Dt.get();
                        null != r && null != r.appId || (r = new Dt(Zn.get(Ee.INIT_DATA)));
                        const a = yield Qr(), s = new Date, o = Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate(), s.getUTCHours(), s.getUTCMinutes(), s.getUTCSeconds(), s.getUTCMilliseconds());
                        Ar.getInstance().then(s => {
                            const l = this.getDeviceUniqueId(),
                                d = $e(e, ["v2/report/add", i, er]),
                                c = Object.assign({
                                    os: s.os,
                                    os_platform: s.osPlatform,
                                    is_incognito: s.isIncognito,
                                    app_id: r.appId,
                                    os_ver: s.osFullVersion,
                                    sdk_ver: "2.81.01",
                                    model: s.name,
                                    app_ver: "1.0",
                                    device_ts: Number(o),
                                    device_tz_offset: (-6e4 * (new Date).getTimezoneOffset()).toString(),
                                    unique_id: n.deviceUuid,
                                    device_tz: (new Date).getTimezoneOffset().toString(),
                                    device_unique_id: l
                                }, d);
                            r.projectId && (c.project_code = r.projectId);
                            const u = n.getAttribute("cart_token");
                            Lt() && u && (null == a ? void 0 : a.configs.isMultiIdEnabled) && e !== i && (c.cart_token = u);
                            const g = Hr();
                            _a(g) && (c.push_id = g), s.isWebPushCompatible() && (Ct(a.webPushPlatformData, s) ? (c.subscription_type = "vapid", c.vapid_public = Pt(a.webPushPlatformData, s)) : c.subscription_type = "normal"), null != r.environment && (c.environment = r.environment);
                            const p = Zn.get(Ee.SUBSCRIPTION_DETAILS);
                            if (null != p && null != p.keys) {
                                for (const e in p.keys) c["keys_" + e] = encodeURI(p.keys[e]);
                                null != p.endpoint && (c.endpoint = encodeURI(p.endpoint)), c.expirationTime = p.expirationTime
                            }
                            t(c)
                        })
                    }))
                })
            }
            static getDeviceUniqueId() {
                var e;
                return (null === (e = Zn.get(Ee.DEVICE_DATA)) || void 0 === e ? void 0 : e.deviceUniqueId) || void 0
            }
            static getUpdatedPushDetails() {
                const e = {},
                    t = Zn.get(Ee.SUBSCRIPTION_DETAILS);
                if (null != t) {
                    const n = t.token;
                    if (null != n && "NA" !== n && "" !== n && "null" !== n && (e.push_id = n), t.keys) {
                        for (const n in t.keys) e["keys_" + n] = encodeURI(t.keys[n]);
                        null != t.endpoint && (e.endpoint = encodeURI(t.endpoint)), e.expirationTime = t.expirationTime
                    }
                }
                return e
            }
            static sendBeacon(e) {
                const t = rs.baseLogTag + ".sendBeacon";
                if (!window.navigator.onLine) return this.sendToOfflineTracking(e, tr);
                const n = rs.groupReportsByIdentity(e);
                (n.length ? n : [e]).forEach(e => {
                    rs.getBatchRequestOptions(e).then(n => {
                        const i = Dt.get(),
                            r = i.baseDomainName + er + i.appId + "?" + (new Date).getTime();
                        pi.log(1, t, `Batch of ${e.length} event(s) sent to MoEngage on window unload through beacon`, null == n ? void 0 : n.viewsInfo), navigator.sendBeacon(r, JSON.stringify(n))
                    })
                })
            }
            static waitForPendingEventWrites() {
                return rs.idbWriteQueue
            }
            static addEventsToIDB(e) {
                if (Ge() !== Y.TV)
                    if (Yn()) {
                        const n = t().createInstance({
                            driver: [t().INDEXEDDB, t().WEBSQL, t().LOCALSTORAGE],
                            name: Ae,
                            storeName: we
                        });
                        rs.idbWriteQueue = rs.idbWriteQueue.then(() => null == n ? void 0 : n.getItem(Oe).then(t => {
                            const i = t || [];
                            return i.push(e), n.setItem(Oe, i)
                        }).then(() => {})).catch(e => {
                            pi.error(1, rs.baseLogTag + ".addEventsToIDB", "Assist event IDB write failed", e)
                        })
                    } else {
                        const n = t().createInstance({
                            driver: [t().INDEXEDDB, t().WEBSQL, t().LOCALSTORAGE],
                            name: Ae,
                            storeName: Re
                        });
                        null == n || n.setItem(e.name, e)
                    }
            }
        }
        rs.baseLogTag = "MoeApi", rs.onDeviceAdd = new lr, rs.webSdkApiRetries = 1, rs.offlineEvents = [], rs.addReportApiRetries = 1, rs.isExecutingDeviceAdd = !1, rs.idbWriteQueue = is.resolve();
        const as = rs,
            ss = () => {
                const e = Zn.get(Ee.USER_DATA);
                return e && e.deviceUuid
            },
            os = class {
                constructor(e) {
                    this.isBeaconDisabled = this.parseSentryBooleanFlag(Me(e, "b_d", !1)), this.isCardsModuleEnabled = this.parseSentryBooleanFlag(Me(e, "c_s", !1)), this.isWebPersonalizationModuleEnabled = this.parseSentryBooleanFlag(Me(e, "c_w_p_e", !1)), this.isCacheEnabledForWebPSelfHandle = this.parseSentryBooleanFlag(Me(e, "c_e_w_p_sh", !0)), this.eventBatchCount = Me(e, "e_b_c", 15), this.logLevel = Me(e, "log_level"), this.periodicFlushTime = Me(e, "p_f_t", 30), this.isBatchingEnabled = this.parseSentryBooleanFlag(Me(e, "s_e_b_e", !1)), this.sessionInactiveDuration = Me(e, "s_i_d", 1800), this.isRemoteLoggingEnabled = this.parseSentryBooleanFlag(Me(e, "s_log", !1)), this.sourceExtraParams = Me(e, "src_ext", []), this.whitelistedEvents = Me(e, "w_e", []), this.blacklistedEvents = Me(e, "b_e", []), this.blacklistedPortfolioUserAttributes = Me(e, "p_b_ua", []), this.isAppActive = this.parseSentryBooleanFlag(Me(e, "a_s", !0)), this.remoteLogTracking = this.isRemoteLoggingEnabled && !!this.logLevel, this.subscriberBasedBillingAttributes = Me(e, "s_b_a", []), this.isMultiIdEnabled = this.parseSentryBooleanFlag(Me(e, "m_i_e", !1)), this.userAttributeCacheTime = Me(e, "u_a_c_t", 43200), this.portfolioUserAttributeCacheTime = Me(e, "p_u_a_c_t", 43200), this.identityAttributes = Me(e, "u_i_s", []), this.landingPageTracking = this.parseSentryBooleanFlag(Me(e, "lp_t", !1)), this.isTelemetryEnabled = this.parseSentryBooleanFlag(Me(e, "t_s", !1)), this.telemetryFlushInterval = Me(e, "t_e_f_i", 86400), this.telemetryBatchSize = Me(e, "t_e_b_s", 100), this.telemetrySessionDuration = Me(e, "t_s_d", 86400), this.telemetryEventCount = Me(e, "t_s_t_e_c", 1), this.telemetryFailureCount = Me(e, "t_s_f_e_c", 1)
                }
                parseSentryBooleanFlag(e = "blocked") {
                    return "allowed" === e || !0 === e || "true" === e
                }
            };
        class ls {
            constructor(e) {
                this.mobile = new ds(Me(e, "mobile", {})), this.web = new ds(Me(e, "web", {}))
            }
        }
        class ds {
            constructor(e) {
                this.nudge = e.nudge ? new cs(e.nudge) : void 0, this.banner = e.banner ? new cs(e.banner) : void 0, this.allowButton = e.allow_button ? new us(e.allow_button) : void 0, this.dismissButton = e.dismiss_button ? new us(e.dismiss_button) : void 0, this.logo = e.logo ? new ps(e.logo) : void 0
            }
        }
        class cs {
            constructor(e) {
                this.title = new gs(Me(e, "title", {})), this.body = (null == e ? void 0 : e.body) ? new gs(Me(e, "body", {})) : void 0, this.backgroundColor = null == e ? void 0 : e.background_color, this.icon = null == e ? void 0 : e.icon, this.altText = (null == e ? void 0 : e.alt_text) || ""
            }
        }
        class us {
            constructor(e) {
                this.textColor = null == e ? void 0 : e.text_color, this.text = Me(e, "text", ""), this.backgroundColor = null == e ? void 0 : e.background_color
            }
        }
        class gs {
            constructor(e) {
                this.textColor = null == e ? void 0 : e.text_color, this.text = Me(e, "text", "")
            }
        }
        class ps {
            constructor(e) {
                this.logoUrl = (null == e ? void 0 : e.logo_url) || "", this.logoColor = (null == e ? void 0 : e.logo_color) || "", this.altText = (null == e ? void 0 : e.alt_text) || ""
            }
        }
        const ms = {
            ONE_STEP: "1-step",
            TWO_STEP: "2-step",
            SELF_HANDLED: "self-handled"
        };
        class hs {
            constructor(e) {
                this.subscriptionMode = Me(e, "subscription_mode", "vapid"), this.vapidPublicKey = Me(e, "vapid_public_key", null)
            }
        }
        class vs {
            constructor(e) {
                this.chrome = new hs(null == e ? void 0 : e.chrome), this.firefox = new hs(null == e ? void 0 : e.firefox)
            }
        }
        const fs = class {
            constructor(e) {
                this.isDomainLevelStorage = !1, this.configs = new os({}), this.settingsVersion = "V2", this.isDomainLevelStorage = Me(e, "domain_level_storage", !1), Ge() === Y.TV && (this.isDomainLevelStorage = !1), this.toShowOverlay = Me(e, "show_overlay", !1), this.loadTime = Me(e, "load_time", 0), this.promptAgain = Me(e, "prompt_again", 24), this.optInType = Me(e, "opt_in_type", ms.TWO_STEP), this.isWebPushEnabled = Me(e, "is_enabled", !1), this.optInPreview = new ls(Me(e, "opt_in_preview", {})), this.overlay = Me(e, "overlay", null), this.webPushPlatformData = new vs(e.web_push_platform_data), this.isPushSubBilling = Me(e, "sub_billing", !1), this.isBrandingHidden = Me(e, "hide_moe_branding", !1), this.configs = new os(e)
            }
        };
        var Es = n(634).VR;
        class Ss {
            static getWebSDKSettings() {
                return new jn.VR((e, t) => {
                    const n = Ss.getInitData(),
                        i = n => {
                            Ss.isAppBlocked(n) ? t(!1) : ((null == n ? void 0 : n.isDomainLevelStorage) && $n.set(Ie, n.isDomainLevelStorage), e(n))
                        };
                    if (Ss.sdkSettings) i(Ss.sdkSettings);
                    else if (ti()) {
                        const r = (new Date).getTime(),
                            a = Zn.get(Ee.SETUP_TIME),
                            s = () => {
                                const i = Pr.startSpan("config_fetch", {
                                    source: "core/api.ts"
                                });
                                return Ss.getAndPersistWebSettings(n, i).then(t => e(t)).catch(e => t(!1))
                            };
                        if (null == a || n.sdkEnvironment === ue.TEST) s();
                        else if (Zn.get(Ee.SDK_VERSION) !== We().getSdkVersion()) s();
                        else if (r - a > 60 * Ss.RESET_DURATION_IN_HOURS * 60 * 1e3) s();
                        else {
                            const e = Zn.get(Ee.WEB_SETTINGS);
                            e ? (Ss.sdkSettings = e, i(Ss.sdkSettings)) : s()
                        }
                    } else {
                        const e = Zn.get(Ee.WEB_SETTINGS);
                        e && (Ss.sdkSettings = e, i(Ss.sdkSettings))
                    }
                })
            }
            static getAndPersistWebSettings(e, t = "") {
                const n = Ss.BASE_LOG_TAG + ".getAndPersistWebSettings";
                return new jn.VR((i, r) => Ve(this, void 0, void 0, function*() {
                    try {
                        const a = {
                                queryParams: {
                                    app_id: e.appId
                                }
                            },
                            s = {
                                postData: {
                                    query_params: {
                                        unique_id: ss()
                                    }
                                }
                            };
                        e.projectId && (a.queryParams.project_code = e.projectId, s.postData.query_params.project_code = e.projectId);
                        const o = ar.get(Ss.API_URLS.SETTINGS(e.baseDomainName), a),
                            l = ar.post(Ss.API_URLS.CONFIG(e.baseDomainName, He() ? "mweb" : "web", e.appId), s);
                        Es.all([o, l]).then(e => {
                            var n;
                            Pr.checkpoint(t, "network_call");
                            let a = e[0].responseText;
                            "string" == typeof a && (a = JSON.parse(a));
                            let s = e[1].responseText;
                            200 === e[1].status && "string" == typeof s && (s = JSON.parse(s));
                            let o = a;
                            if (o = new fs(Object.assign(Object.assign({}, a.webData), s)), Ss.updateLocalStorage(o), Pr.checkpoint(t, "payload_process"), Ss.isAppBlocked(o)) return Pr.endSpan(t, mr, {
                                failure_reason: "app_blocked"
                            }), void r(!1);
                            Ss.sdkSettings = o, (null === (n = Ss.sdkSettings) || void 0 === n ? void 0 : n.isDomainLevelStorage) && $n.set(Ie, Ss.sdkSettings.isDomainLevelStorage), Pr.endSpan(t, pr, {
                                source: "network"
                            }), i(o)
                        }).catch(i => {
                            Pr.checkpoint(t, "network_call", void 0, !1), Pr.endSpan(t, mr, {
                                failure_reason: "config_api_failed"
                            }), pi.errorAndBroadcast(1, n, X, "SDK Config API failed", `SDK Config API failed for App ID: "${e.appId}". Verify that the App ID and data center cluster are correct in your integration. Error: ${"string"==typeof i?i:JSON.stringify(i)}`, void 0, i)
                        })
                    } catch (a) {
                        pi.errorAndBroadcast(1, n, X, "SDK Settings API failed", `SDK Settings API failed for App ID: "${e.appId}". Verify that the App ID and data center cluster are correct in your integration. Error: ${"string"==typeof a?a:JSON.stringify(a)}`, void 0, a), Ss.webSdkApiRetries < Ss.WEB_SDK_API_MAX_RETRIES ? (0, jn.pS)(() => {
                            Ss.webSdkApiRetries++, i(Ss.getAndPersistWebSettings(e, t))
                        }, 3e3 * Ss.webSdkApiRetries) : (Pr.endSpan(t, mr, {
                            failure_reason: "settings_api_failed"
                        }), r(!1))
                    }
                }))
            }
            static isAppBlocked(e) {
                return !(!e || !e.configs || !1 !== e.configs.isAppActive)
            }
            static getInitData() {
                let e = Dt.get();
                return null != e && null != e.appId || (e = new Dt(Zn.get(Ee.INIT_DATA))), e
            }
            static updateLocalStorage(e) {
                const t = (new Date).getTime();
                Zn.set(Ee.WEB_SETTINGS, e), Zn.set(Ee.SETUP_TIME, t), Zn.set(Ee.SDK_VERSION, We().getSdkVersion())
            }
        }
        Ss.BASE_LOG_TAG = "CoreApi", Ss.RESET_DURATION_IN_HOURS = 24, Ss.API_URLS = {
            SETTINGS(e) {
                return `${e}v2/websdksettings`
            },
            CONFIG(e, t, n) {
                return `${e}v3/sdkconfig/${t}/${n}`
            }
        }, Ss.webSdkApiRetries = 1, Ss.WEB_SDK_API_MAX_RETRIES = 3;
        const ys = Ss;
        class _s {
            addURLChangeObserver(e) {
                const t = _s.baseLogTag + ".addURLChangeObserver";
                let n = document.location.href;
                (() => {
                    _s.isObserverRunning = !0, pi.log(2, t, "Start listening to URL changes for SPA");
                    const i = document.querySelector("body");
                    _s.observer = new jn.Dg(i => {
                        i.forEach(i => {
                            n === window.location.href || oe.some(e => window.location.href.includes(e)) || (n = window.location.href, pi.log(2, t, "URL Change detected", n), _s.pageChangeHandler(e))
                        })
                    }), _s.observer.observe(i, {
                        childList: !0,
                        subtree: !0
                    })
                })()
            }
            static pageChangeHandler(e) {
                var t;
                ii.broadcastToWindow({
                    topic: G,
                    name: $
                }), Qa.clearAll(), We().trackPageView(), e && !(null === (t = Dt.get()) || void 0 === t ? void 0 : t.disableCookies) && Zn.copyKeysFromCookie()
            }
            static removeURLChangeObserver() {
                var e;
                this.isObserverRunning = !1, null === (e = this.observer) || void 0 === e || e.disconnect()
            }
        }
        _s.baseLogTag = "SPAManager";
        const bs = _s;
        var Ts = n(634).VR;
        class Is {
            static buildRequestOptions(e) {
                const t = {
                    moe_aid: fa()
                };
                return e.projectId && (t.project_code = e.projectId), {
                    headers: {
                        "Content-Type": "application/json",
                        "MOE-APPKEY": e.appId
                    },
                    queryParams: t
                }
            }
            static handleResponse(e, t, n, i) {
                if (200 !== e.status) return pi.error(1, t, "Email subscription API failed:", e), void i(e);
                try {
                    n(JSON.parse(e.responseText).data)
                } catch (e) {
                    pi.error(1, t, "Error parsing email subscription response:", e), i(e)
                }
            }
            static handleError(e, t, n) {
                var i;
                pi.error(1, t, "Email subscription API failed:", e);
                try {
                    n(null === (i = JSON.parse(e.reason)) || void 0 === i ? void 0 : i.error)
                } catch (e) {
                    pi.error(1, t, "Error parsing email subscription error:", e), n(e)
                }
            }
            static getEmailSubscription() {
                return Ve(this, void 0, void 0, function*() {
                    const e = Is.baseLogTag + ".getEmailSubscription",
                        t = Dt.get(),
                        n = t.baseDomainName + qa;
                    return pi.log(1, e, "Fetching email subscription preferences"), new Ts((i, r) => {
                        ar.get(n, Is.buildRequestOptions(t)).then(t => Is.handleResponse(t, e, i, r)).catch(t => Is.handleError(t, e, r))
                    })
                })
            }
            static updateEmailSubscription(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = Is.baseLogTag + ".updateEmailSubscription",
                        n = Dt.get(),
                        i = n.baseDomainName + qa;
                    return pi.log(1, t, "Updating email subscription preferences"), new Ts((r, a) => {
                        ar.patch(i, Object.assign(Object.assign({}, Is.buildRequestOptions(n)), {
                            postData: e
                        })).then(e => Is.handleResponse(e, t, r, a)).catch(e => Is.handleError(e, t, a))
                    })
                })
            }
        }
        Is.baseLogTag = "EmailSubscriptionService";
        const As = Is;
        var ws = n(634).VR;
        class Os {
            constructor() {
                Os.handlePublicFunctions()
            }
            trackClick(e, t) {
                return Os.track(Ka.CLICK, e, {
                    widget_id: t
                })
            }
            trackImpression(e) {
                return Os.triggerDeviceAddForLandingPageTracking(), Os.track(Ka.IMPRESSION, e)
            }
            trackFormSubmit(e, t) {
                return Os.track(Ka.FORM_SUBMIT, e, t)
            }
            trackEvent(e, t, n) {
                return Os.track(e, t, n)
            }
            static track(e, t, n) {
                xe.get(Te) || xe.set(Te, !0);
                const i = Os.baseLogTag + ".track";
                if ("string" == typeof t) try {
                    t = JSON.parse(t)
                } catch (e) {
                    return void pi.error(2, i, ot, e)
                }
                if (n) {
                    if ("string" == typeof n) try {
                        n = JSON.parse(n)
                    } catch (e) {
                        return void pi.error(2, i, "Error parsing attributes JSON string:", e)
                    }
                    t = Object.assign(Object.assign({}, n), t)
                }
                const r = () => (pi.log(1, i, e + ": Event Tracked"), We().trackEvent(e, Object.assign({}, t)));
                try {
                    return We() ? r() : (window.addEventListener(S, e => {
                        if (e.detail.name === y) return r()
                    }), ws.resolve())
                } catch (t) {
                    pi.errorAndBroadcast(1, i, ee, "Could not track landing page event", `Error occurred in tracking landing page event ${e}: ${"string"==typeof t?t:JSON.stringify(t)}`)
                }
            }
            static triggerDeviceAddForLandingPageTracking() {
                pi.log(2, Os.baseLogTag + ".triggerDeviceAddForLandingPageTracking", "Landing page tracking flag set, broadcasting device add request"), ii.broadcastToWindow({
                    topic: S,
                    name: C,
                    data: {
                        reason: "landing_page_tracking_enabled",
                        source: "landing_pages_module"
                    }
                })
            }
            static getEmailSubscription() {
                return As.getEmailSubscription()
            }
            static updateEmailSubscription(e) {
                return As.updateEmailSubscription(e)
            }
            static handlePublicFunctions() {
                const e = We() || {};
                e.landingPages = Os, e.getEmailSubscription = Os.getEmailSubscription, e.updateEmailSubscription = Os.updateEmailSubscription
            }
        }
        Os.baseLogTag = "Landing Pages Tracking";
        const Ds = Os;
        var Rs;
        class Cs {}
        Rs = Cs, Cs.baseLogTag = "MoEngage", Cs.landingPages = new Ds, Cs.getEmailSubscription = () => Ds.getEmailSubscription(), Cs.updateEmailSubscription = e => Ds.updateEmailSubscription(e), Cs.getSdkVersion = () => "2.81.01", Cs.setIntegrationType = e => {
            const t = Rs.baseLogTag + ".setIntegrationType";
            try {
                const n = Object.values(wt);
                n.includes(e) ? (Dt.setIntegrationType(e), pi.log(2, t, "Integration type set to:", e)) : pi.warnAndBroadcast(1, t, X, "Invalid integration type provided", `Invalid integration type provided: ${e}. Valid types are: ${n}`)
            } catch (e) {
                pi.error(1, t, "Error setting integration type:", e)
            }
        }, Cs.setIntegrationVersion = e => {
            const t = Rs.baseLogTag + ".setIntegrationVersion";
            try {
                "string" == typeof e && /^\d+\.\d+\.\d+$/.test(e) ? (Dt.setIntegrationVersion(e), pi.log(2, t, "Integration version set to:", e)) : pi.warnAndBroadcast(1, t, X, "Invalid integration version provided", `Invalid integration version provided: ${e}. Expected a semver string, e.g. "1.12.0".`)
            } catch (e) {
                pi.error(1, t, "Error setting integration version:", e)
            }
        }, Cs.setLogLevel = e => Ve(void 0, void 0, void 0, function*() {
            var t, n, i;
            const r = Rs.baseLogTag + ".setLogLevel",
                a = We();
            try {
                "number" == typeof e && (!Dt.get().disableOnsite && (null === (t = null == a ? void 0 : a.onsite) || void 0 === t ? void 0 : t.setLogLevel) && a.onsite.setLogLevel(e), (null === (n = null == a ? void 0 : a.cards) || void 0 === n ? void 0 : n.setLogLevel) && a.cards.setLogLevel(e), (null === (i = window.MoeWebP) || void 0 === i ? void 0 : i.setLogLevel) && window.MoeWebP.setLogLevel(e), pi.setLogLevel(e, !0))
            } catch (e) {
                pi.error(1, r, "Error changing log level:", e)
            }
        }), Cs.setDebugLevel = e => Ve(void 0, void 0, void 0, function*() {
            return Rs.setLogLevel(e)
        }), Cs.vitals = () => {
            const e = Zn.get(Ee.USER_DATA);
            return {
                userDetails: e,
                deviceUuid: null == e ? void 0 : e.deviceUuid,
                pushToken: Zn.get(Ee.PUSH_TOKEN),
                softAskStatus: Zn.get(Ee.SOFT_ASK_STATUS),
                hardAskStatus: Zn.get(Ee.HARD_ASK_STATUS)
            }
        }, Cs.help = () => {
            const e = Object.keys(ne).map(e => `${e} - ${ne[e]}`).join("\n");
            pi.log(0, "Moengage.help", e)
        }, Cs.getBranch = () => "dev", Cs.handlePageChange = () => {
            ys.getWebSDKSettings().then(e => {
                bs.pageChangeHandler(e.isDomainLevelStorage)
            })
        }, Cs.handle_page_change = () => {
            pi.warn(1, `${Rs.baseLogTag}.handle_page_change`, ze("handle_page_change", "handlePageChange")), Rs.handlePageChange()
        }, Cs.env = ue, Cs.logLevel = ge, Cs.integrationType = wt;
        const Ls = Cs,
            Ps = {
                getData(e, t) {
                    window.addEventListener(S, n => {
                        var i;
                        n.detail.name === D && (null === (i = We()) || void 0 === i || i.onsite.getData(e, t))
                    })
                },
                registerCallback(e, t) {
                    window.addEventListener(S, n => {
                        var i;
                        n.detail.name === D && (null === (i = We()) || void 0 === i || i.onsite.registerCallback(e, t))
                    })
                },
                getSelfHandledOSM(e) {
                    window.addEventListener(S, t => {
                        var n;
                        t.detail.name === D && (null === (n = We()) || void 0 === n || n.onsite.getSelfHandledOSM(e))
                    })
                }
            },
            Ns = () => {},
            ks = {
                track_event: Ns,
                add_user_attribute: Ns,
                add_first_name: Ns,
                add_last_name: Ns,
                add_email: Ns,
                add_mobile: Ns,
                add_user_name: Ns,
                add_gender: Ns,
                add_birthday: Ns,
                destroy_session: Ns,
                add_unique_user_id: Ns,
                moe_events: Ns,
                location_type_attribute: Ns,
                call_web_push: Ns,
                setLogLevel: Ns,
                setDebugLevel: Ns,
                trackEvent: Ns,
                setUserAttribute: Ns,
                setFirstName: Ns,
                setLastName: Ns,
                setEmailId: Ns,
                setMobileNumber: Ns,
                setUserName: Ns,
                setGender: Ns,
                setBirthDate: Ns,
                logoutUser: Ns,
                callWebPush: Ns
            };
        class Ms {}
        Ms.REMOVE_TRAIL_CHARS = /[^\w\s]+$/gi;
        class Bs {
            constructor(e, t, n, i) {
                this.dataType = e, this.availableOperations = t, this.event = n, this.filter = i
            }
            validate() {
                return !(this.availableOperations.indexOf(this.filter.operator) < 0)
            }
            checkEq() {
                let e = !1;
                return this.event.attributes.forEach(t => {
                    let n = t.value,
                        i = this.filter.value;
                    this.dataType === Us.STRING && typeof n === Us.STRING && (n = this.removeSpecialChars(n), i = this.removeSpecialChars(i)), t.key === this.filter.name && (this.dataType !== Us.STRING || this.filter.case_sensitive ? n === i && (e = !0) : n.toLowerCase() === i.toLowerCase() && (e = !0))
                }), e
            }
            checkExists() {
                let e = !1;
                return this.event.attributes.forEach(t => {
                    t.key === this.filter.name && (e = !0)
                }), e
            }
            removeSpecialChars(e) {
                return e.replace(Ms.REMOVE_TRAIL_CHARS, "")
            }
        }
        const Us = {
                BOOL: "bool",
                STRING: "string",
                DATE: "datetime",
                NUMBER: "double",
                LONG: "long",
                ARRAY_BOOL: "array_bool",
                ARRAY_NUMBER: "array_double",
                ARRAY_STRING: "array_string",
                ARRAY_DATETIME: "array_datetime",
                OBJECT: "object",
                ARRAY_OBJECT: "array_object"
            },
            xs = "all_of";

        function Fs(e, t) {
            return e.substr(0, t.length) === t
        }

        function Vs(e, t, n) {
            const i = void 0 === n || n > e.length ? e.length : n;
            return e.substring(i - t.length, i) === t
        }
        const Ws = ["is", "exists", "contains", "startsWith", "endsWith", "in", "containsInTheFollowing", "startsWithInTheFollowing", "endsWithInTheFollowing"];
        class Hs extends Bs {
            constructor(e, t) {
                super(Us.STRING, Ws, e, t)
            }
            evaluate() {
                let e = !1;
                const t = this.event.attributes.filter(e => e.key === this.filter.name),
                    n = t.length > 0 ? t[0] : null;
                if (null != n && xr(n.value)) switch (this.filter.operator) {
                    case "is":
                        e = this.checkEq();
                        break;
                    case "exists":
                        e = this.checkExists();
                        break;
                    case "contains":
                    case "containsInTheFollowing":
                        e = this.checkContains(n);
                        break;
                    case "startsWith":
                    case "startsWithInTheFollowing":
                        e = this.checkStartsWith(n);
                        break;
                    case "endsWith":
                    case "endsWithInTheFollowing":
                        e = this.checkEndsWith(n);
                        break;
                    case "in":
                        e = this.checkIn(n)
                }
                return this.filter.negate ? !e : e
            }
            checkContains(e) {
                const t = t => this.filter.case_sensitive ? e.value.indexOf(t) >= 0 : e.value.toLowerCase().indexOf(t.toLowerCase()) >= 0;
                return Array.isArray(this.filter.value) ? this.filter.array_filter_type === xs ? this.checkInTheFollowing(t).every(e => !0 === e) : this.checkInTheFollowing(t).includes(!0) : t(this.filter.value)
            }
            checkStartsWith(e) {
                const t = t => this.filter.case_sensitive ? Fs(e.value, t) : Fs(e.value.toLowerCase(), t.toLowerCase());
                return Array.isArray(this.filter.value) ? this.filter.array_filter_type === xs ? this.checkInTheFollowing(t).every(e => !0 === e) : this.checkInTheFollowing(t).includes(!0) : t(this.filter.value)
            }
            checkEndsWith(e) {
                const t = t => {
                    if (this.filter.case_sensitive) return Vs(e.value, t);
                    const n = this.removeSpecialChars(e.value),
                        i = this.removeSpecialChars(t);
                    return Vs(n.toLowerCase(), i.toLowerCase())
                };
                return Array.isArray(this.filter.value) ? this.filter.array_filter_type === xs ? this.checkInTheFollowing(t).every(e => !0 === e) : this.checkInTheFollowing(t).includes(!0) : t(this.filter.value)
            }
            checkIn(e) {
                let t = !1;
                if (Array.isArray(this.filter.value))
                    for (let n = this.filter.value.length - 1; n >= 0; n--)
                        if (this.filter.case_sensitive) {
                            if (this.filter.value[n] === e.value) {
                                t = !0;
                                break
                            }
                        } else if (this.filter.value[n].toLowerCase() === e.value.toLowerCase()) {
                    t = !0;
                    break
                }
                return t
            }
            checkInTheFollowing(e) {
                return this.filter.value.map(t => e(t))
            }
        }
        Hs.baseLogTag = "StringDataType";
        const Gs = Hs,
            $s = ["is", "exists"];
        class js extends Bs {
            constructor(e, t) {
                super(Us.BOOL, $s, e, t)
            }
            evaluate() {
                let e = !1;
                switch (this.filter.operator) {
                    case "is":
                        e = this.checkEq();
                        break;
                    case "exists":
                        e = this.checkExists()
                }
                return this.filter.negate ? !e : e
            }
        }
        js.baseLogTag = "BooleanDataType";
        const Ks = js,
            qs = ["is", "exists", "greaterThan", "lessThan", "between", "in"];
        class Ys extends Bs {
            constructor(e, t) {
                super(Us.NUMBER, qs, e, t)
            }
            evaluate() {
                let e = !1;
                const t = this.event.attributes.filter(e => e.key === this.filter.name),
                    n = t.length > 0 ? t[0] : null;
                if (null != n && "number" == typeof n.value) switch (this.filter.operator) {
                    case "is":
                        e = this.checkEq();
                        break;
                    case "exists":
                        e = this.checkExists();
                        break;
                    case "greaterThan":
                        e = this.checkGreaterThan(n);
                        break;
                    case "lessThan":
                        e = this.checkLessThan(n);
                        break;
                    case "between":
                        e = this.checkBetween(n);
                        break;
                    case "in":
                        e = this.checkIn(n)
                }
                return this.filter.negate ? !e : e
            }
            checkGreaterThan(e) {
                return e.value > this.filter.value
            }
            checkLessThan(e) {
                return e.value < this.filter.value
            }
            checkBetween(e) {
                return this.filter.value2 ? this.filter.value && this.filter.value2 && this.filter.value <= e.value && e.value < this.filter.value2 : this.filter.value && this.filter.value1 && this.filter.value <= e.value && e.value < this.filter.value1
            }
            checkIn(e) {
                return Array.isArray(this.filter.value) && this.filter.value.indexOf(e.value) >= 0
            }
        }
        Ys.baseLogTag = "NumberDataType";
        const zs = Ys,
            Js = ["exists", "on", "between", "before", "after", "inTheLast", "inTheNext", "today"];
        class Qs extends Bs {
            constructor(e, t) {
                !Fr(t.value) && xr(t.value) && (t.value = new Date(t.value.split("Z").join(""))), !Fr(t.value2) && xr(t.value2) && null != t.value2 && (t.value2 = new Date(t.value2.split("Z").join(""))), !Fr(t.value1) && xr(t.value1) && null != t.value1 && (t.value1 = new Date(t.value1.split("Z").join(""))), super(Us.DATE, Js, e, t)
            }
            evaluate() {
                let e = !1;
                const t = this.event.attributes.filter(e => e.key === this.filter.name),
                    n = t.length > 0 ? t[0] : null;
                if (null != n) switch (n.value.setHours(0, 0, 0, 0), this.filter.operator) {
                    case "is":
                        e = this.checkEq();
                        break;
                    case "exists":
                        e = this.checkExists();
                        break;
                    case "on":
                        e = this.checkOn(n);
                        break;
                    case "between":
                        e = this.checkBetween(n);
                        break;
                    case "before":
                        e = this.checkBefore(n);
                        break;
                    case "after":
                        e = this.checkAfter(n);
                        break;
                    case "inTheLast":
                        e = this.checkLastX(n);
                        break;
                    case "inTheNext":
                        e = this.checkNextX(n);
                        break;
                    case "today":
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
                return typeof t === z ? ((new Date).setHours(0, 0, 0, 0) - e.value.setHours(0, 0, 0, 0)) / 864e5 > t : e.value.setHours(0, 0, 0, 0) < t.setHours(0, 0, 0, 0)
            }
            checkAfter(e) {
                const {
                    filter: {
                        value: t
                    }
                } = this;
                return typeof t === z ? (e.value.setHours(0, 0, 0, 0) - (new Date).setHours(0, 0, 0, 0)) / 864e5 > t : e.value.setHours(0, 0, 0, 0) > t.setHours(0, 0, 0, 0)
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
        Qs.baseLogTag = "DateTimeDataType";
        const Xs = Qs,
            Zs = ["is", "exists", "contains", "startsWith", "endsWith", "in", "lessThan", "greaterThan", "between", "inTheLast", "inTheNext", "after", "before", "on", "today"];
        class eo extends Bs {
            constructor(e, t) {
                super(t.data_type, Zs, e, t)
            }
            evaluate() {
                let e = !1;
                const t = this.event.attributes.filter(e => e.key === this.filter.name),
                    n = t.length > 0 ? t[0] : null;
                return null != n && Vr(n.value) && (e = this.filter.array_filter_type && "any_of" === this.filter.array_filter_type ? this.checkAnyOf(n) : this.checkAllOf(n)), e
            }
            checkAllOf(e) {
                return e.value.every(t => this.getFilterResult(t, e))
            }
            checkAnyOf(e) {
                return e.value.some(t => this.getFilterResult(t, e))
            }
            getFilterResult(e, t) {
                let n = !1;
                const i = this.createCustomEvent(t.key, e),
                    r = this.getDataType(i);
                return r.validate() && (n = r.evaluate()), n
            }
            createCustomEvent(e, t) {
                const n = new ea(e, t);
                return new za(this.event.name, [n])
            }
            getDataType(e) {
                let t;
                switch (this.filter.data_type) {
                    case Us.ARRAY_BOOL:
                        t = new Ks(e, this.filter);
                        break;
                    case Us.ARRAY_DATETIME:
                        t = new Xs(e, this.filter);
                        break;
                    case Us.ARRAY_NUMBER:
                        t = new zs(e, this.filter);
                        break;
                    case Us.ARRAY_STRING:
                        t = new Gs(e, this.filter)
                }
                return t
            }
        }
        class to {
            constructor(e, t) {
                this.event = e, this.filter = t
            }
            evaluate() {
                const e = this.event.attributes.filter(e => e.key === this.filter.name),
                    t = e.length > 0 ? e[0] : null;
                return !!t && (Vr(t.value) && this.filter.data_type === Us.ARRAY_OBJECT ? this.evaluateArrayOfObjects(t) : this.evaluateObject(t))
            }
            evaluateArrayOfObjects(e) {
                const t = e.value;
                return !(!Array.isArray(t) || 0 === t.length) && t.map(e => "object" == typeof e && null !== e && !Array.isArray(e) && this.evaluateObjectFilters(e)).some(e => !0 === e)
            }
            evaluateObject(e) {
                return "object" == typeof e.value && null !== e.value && !Array.isArray(e.value) && this.evaluateObjectFilters(e.value)
            }
            evaluateObjectFilters(e) {
                const t = this.filter.filters.map(t => {
                        if ("exists" === t.operator) {
                            const n = (null == t ? void 0 : t.name) in e;
                            return t.negate ? !n : n
                        }
                        if (!((null == t ? void 0 : t.name) in e)) return !1;
                        const n = new ea(t.name, e[t.name]),
                            i = new za(t.name, [n]);
                        return io.doesEventMatchFilters(i, t)
                    }),
                    n = this.filter.filter_operator;
                let i = (null == t ? void 0 : t[0]) || !1;
                for (let e = 1; e < t.length; e++)
                    if (n === mo.AND) {
                        if (i = i && t[e], !1 === i) break
                    } else if (n === mo.OR && (i = i || t[e], !0 === i)) break;
                return i
            }
        }
        class no {
            static doesEventMatchFilters(e, t) {
                let n = !1,
                    i = null;
                switch (t.data_type) {
                    case Us.BOOL:
                        i = new Ks(e, t), i.validate() && (n = i.evaluate());
                        break;
                    case Us.STRING:
                        i = new Gs(e, t), i.validate() && (n = i.evaluate());
                        break;
                    case Us.NUMBER:
                    case Us.LONG:
                        i = new zs(e, t), i.validate() && (n = i.evaluate());
                        break;
                    case Us.DATE:
                        i = new Xs(e, t), i.validate() && (n = i.evaluate());
                        break;
                    case Us.OBJECT:
                    case Us.ARRAY_OBJECT:
                        i = new to(e, t), n = i.evaluate();
                        break;
                    case Us.ARRAY_STRING:
                    case Us.ARRAY_DATETIME:
                    case Us.ARRAY_BOOL:
                    case Us.ARRAY_NUMBER:
                        i = new eo(e, t), i.validate() && (n = i.evaluate())
                }
                return n
            }
            static doesValueMatchFilter(e, t) {
                const n = new ea(t.name, e),
                    i = new za("Sample event", [n]);
                return no.doesEventMatchFilters(i, t)
            }
        }
        no.baseLogTag = "TriggerEvaluator";
        const io = no;
        class ro {
            constructor(e) {
                const t = ro.baseLogTag + ".constructor";
                this.campaignId = Me(e, "campaign_id", null), this.campaignName = Me(e, "campaign_name", null), this.templateType = Me(e, "template_type", null), this.campaignContext = Me(e, "campaign_context", null), this.campaignType = Me(e, "campaign_type", null);
                const n = Me(e, "status", null),
                    i = [po.ACTIVE, po.EXPIRED, po.PAUSED];
                this.status = i.indexOf(n) < 0 ? po.ACTIVE : i[i.indexOf(n)], this.tag = Me(e, "tag", null), this.tags = Me(e, "tags", []), this.triggerData = null, so.validate(Me(e, "trigger")) ? this.triggerData = new so(Me(e, "trigger")) : pi.log(2, t, "Rejecting trigger data for :", e), this.expiryTime = va(Me(e, "expiry_time") + "Z"), this.updatedTime = va(Me(e, "updated_time") + "Z"), this.delivery = new ho(Me(e, "delivery")), this.userInSegment = Me(e, "user_in_segment", !0), this.display = null;
                const r = Me(e, "display", null),
                    a = Me(e, "display_filter", null);
                this.templateType !== So.SELF_HANDLED && (null != a ? this.display = new Eo({
                    rules: {
                        uri_filters: a
                    }
                }, this.templateType) : null != r && (this.display = new Eo(r, this.templateType))), this.stats = {}, this.onsitePayload = null, this.editorVersion = Me(e, "editor_version", null)
            }
            static isValidMetaJSON(e) {
                let t = !0;
                const n = ["campaign_id", "campaign_name", "template_type", "status", "expiry_time", "updated_time", "delivery", "user_in_segment"];
                for (let i = 0; i < n.length; i++)
                    if (null == e[n[i]]) {
                        t = !1;
                        break
                    }
                return t
            }
            static getTriggerEvent(e, t, n) {
                const i = Me(t, `triggerData.${n}_condition.included_filters`, null);
                return null == i ? void 0 : i.filters.filter(t => t.action_name === e || t.action_name === Q.MOE_PAGE_EXIT && "MOE_EXIT" === e)
            }
            static areFiltersAbsent(e) {
                var t;
                return !(!(null == e ? void 0 : e.action_name) || (null === (t = null == e ? void 0 : e.attributes) || void 0 === t ? void 0 : t.filters))
            }
            static getFilters(e) {
                var t;
                return (null == e ? void 0 : e.action_name) && (null === (t = null == e ? void 0 : e.attributes) || void 0 === t ? void 0 : t.filters) || null
            }
            static getFilterOperator(e) {
                var t;
                return (null == e ? void 0 : e.action_name) && (null === (t = null == e ? void 0 : e.attributes) || void 0 === t ? void 0 : t.filterOperator) || mo.AND
            }
            static isTriggered(e, t, n, i) {
                let r = !0;
                if ((null == t ? void 0 : t.length) > 0) {
                    let a;
                    a = i || ro.getFilterOperator(n);
                    const s = t.map(t => io.doesEventMatchFilters(e, t));
                    r = s[0] || !1;
                    for (let e = 1; e < s.length; e++)
                        if (a === mo.AND) {
                            if (r = r && s[e], !1 === r) break
                        } else if (a === mo.OR && (r = r || s[e], !0 === r)) break
                }
                return r
            }
            static getFilterResult(e, t) {
                return this.didPrimaryEventFilterTrigger(e, t) && this.getURLFilterResult(t)
            }
            static didPrimaryEventFilterTrigger(e, t) {
                const n = this.getTriggerEvent(e.name, t, "primary") || [];
                for (let t = 0; t < n.length; t++) {
                    const i = n[t],
                        r = ro.getFilters(i);
                    if (ro.areFiltersAbsent(i) || ro.isTriggered(e, r, i)) return !0
                }
                return !1
            }
            static getURLFilterResult(e) {
                const t = new za(Q.MOE_PAGE_URL_EVENT, []),
                    n = ro.getTriggerEvent(t.name, e, "url");
                if (n) {
                    const e = n.find(e => e.action_name === Q.MOE_PAGE_URL_EVENT),
                        i = ro.getFilters(e);
                    return ro.isTriggered(t, i, e)
                }
                return !0
            }
        }
        ro.baseLogTag = "OnsiteCampaignMeta";
        const ao = ro;
        class so {
            constructor(e) {
                this.cs_id = e.cs_id, this._id = e._id, this.references = e.references, this.trigger_wait_time = e.trigger_wait_time || null, this.primary_condition = lo.validate(e.primary_condition) ? new lo(e.primary_condition) : null, this.secondary_condition = lo.validate(e.secondary_condition) ? new lo(e.secondary_condition) : null, this.url_condition = lo.validate(e.url_condition) ? new lo(e.url_condition) : null, this.description = e.description, this.trigger_delay = null != e.trigger_delay ? new oo(e.trigger_delay) : null
            }
            static validate(e) {
                let t = !1;
                return ["primary_condition"].forEach(n => {
                    null != Me(e, n, null) && (t = !0)
                }), t
            }
        }
        class oo {
            constructor(e) {
                if (this.delay = Me(e, "delay", 0), this.unit = Me(e, "unit", "seconds"), this.delay_type = Me(e, "delay_type", ""), this.attribute = Me(e, "attribute", ""), Me(e, "delay", null) && Me(e, "unit", null)) {
                    let e = this.delay;
                    "minutes" !== this.unit && "hours" !== this.unit && "days" !== this.unit || (e *= 60), "hours" !== this.unit && "days" !== this.unit || (e *= 60), "days" === this.unit && (e *= 24), this.delayInSeconds = e
                } else this.delayInSeconds = 0
            }
        }
        class lo {
            constructor(e) {
                this.included_filters = new co(Me(e, "included_filters", null)), this.excluded_filters = new co(Me(e, "excluded_filters", null))
            }
            static validate(e) {
                if (e) {
                    const t = e.included_filters;
                    if (t && Array.isArray(t.filters) && t.filters.length && null != t.filter_operator) return !0
                }
                return !1
            }
        }
        class co {
            constructor(e) {
                var t;
                this.filter_operator = Me(e, "filter_operator", mo.AND), this.filters = null === (t = Me(e, "filters", [])) || void 0 === t ? void 0 : t.map(e => new uo(e))
            }
        }
        class uo {
            constructor(e) {
                const t = Me(e, "action_name", null);
                "string" == typeof t && (this.action_name = t.includes("．") ? ha(t) : t);
                const n = Me(e, "executed", null);
                "boolean" == typeof n && (this.executed = n), this.filter_type = Me(e, "filter_type", null);
                const i = Me(e, "attributes", null);
                go.validateJson(i) && (this.attributes = new go(i)), "nested_filters" === this.filter_type && (this.filters = new co(e))
            }
        }
        class go {
            constructor(e) {
                this.filters = [], this.filterOperator = Me(e, "filter_operator", mo.AND), this.filters = Me(e, "filters", []), this.filters.length && this.filters.forEach(e => {
                    var t;
                    (null === (t = null == e ? void 0 : e.name) || void 0 === t ? void 0 : t.includes("．")) && (e.name = ha(e.name))
                })
            }
            static validateJson(e) {
                if (null == e) return !1;
                const t = ["filters"];
                for (let n = 0; n < t.length; n++)
                    if (null == e[t[n]]) return !1;
                return !0
            }
        }
        const po = {
                ACTIVE: "ACTIVE",
                PAUSED: "PAUSED",
                EXPIRED: "EXPIRED"
            },
            mo = {
                AND: "and",
                OR: "or"
            };
        class ho {
            constructor(e) {
                this.priority = Me(e, "priority", 0), this.dismissInterval = Me(e, "dismiss_interval", 0), this.fcMeta = new vo(Me(e, "fc_meta", null))
            }
        }
        class vo {
            constructor(e) {
                this.count = 0, this.delay = 0, null != e && (this.count = Me(e, "count", 0), this.delay = Me(e, "delay", 0), this.ignoreGlobalDelay = Me(e, "ignore_global_delay", !1), this.ignoreFc = Me(e, "ignore_fc", !1), this.ignoreFcCount = !!this.ignoreFc && Me(e, "ignore_fc_count", !1))
            }
        }
        class fo {
            constructor(e) {
                this.aggregations = [], this.filters = [], this.aggregations = Me(e, "aggregations", []), this.filter_operator = Me(e, "filter_operator", mo.AND), this.filters = Me(e, "filters", [])
            }
        }
        class Eo {
            constructor(e, t) {
                this.config = {
                    blocking: Me(e, "config.blocking", Eo.getDefaultValue("blocking", t)),
                    pushPage: Me(e, "config.push_page", Eo.getDefaultValue("push_page", t)),
                    sticky: Me(e, "config.sticky", Eo.getDefaultValue("sticky", t)),
                    scrollable: Me(e, "config.scrollable", Eo.getDefaultValue("scrollable", t)),
                    showOverOtherCampaigns: Me(e, "config.show_over_campaigns", Eo.getDefaultValue("show_over_campaigns", t))
                }, this.rules = {
                    uriFilters: new fo(Me(e, "rules.uri_filters", {}))
                }
            }
            static getDefaultValue(e, t) {
                return {
                    blocking: {
                        POP_UP: !0,
                        BANNER: !1
                    },
                    push_page: {
                        POP_UP: !1,
                        BANNER: !0
                    },
                    sticky: {
                        POP_UP: !1,
                        BANNER: !0
                    },
                    scrollable: {
                        POP_UP: !1,
                        BANNER: !0
                    },
                    show_over_campaigns: {
                        POP_UP: !1,
                        BANNER: !1
                    }
                }[e][t]
            }
        }
        const So = {
            SELF_HANDLED: "SELF_HANDLED",
            SELF_HANDLED_OSM: "SELF_HANDLED_OSM",
            POP_UP: "POP_UP",
            BANNER: "BANNER"
        };

        function yo(e, t = "") {
            var n;
            let i = e;
            const r = t || (null === (n = Dt.get()) || void 0 === n ? void 0 : n.customProxyDomain);
            return "string" == typeof i && i.length && "string" == typeof r && r.length && (i = i.replace(/((?:https?:)?\/\/)([a-zA-Z0-9][-a-zA-Z0-9]*\.)*moengage\.com(?=[:/?\s#'"]|$)/gi, (e, t, n) => {
                const i = e.substring(t.length);
                return ["www.moengage.com", "moengage.com"].includes(i) ? e : t + i.replace(/moengage\.com$/i, r)
            })), i
        }

        function _o(e) {
            return e && "string" == typeof e ? e.replace(/url\s*\(\s*(['"]?)([^'")\s]+)(['"]?)\s*\)/gi, (e, t, n, i) => `url(${t}${yo(n)}${i})`) : e
        }
        class bo {
            constructor(e) {
                var t;
                this.templateType = Me(e, "template_type", null), this.payloadType = Me(e, "payload_type", null);
                const n = Me(e, "payload", null);
                this.payload = "string" == typeof n ? yo(n) : JSON.parse(yo(JSON.stringify(n))), this.position = Me(e, "position", null), this.campaignContext = Me(e, "campaign_context", null), this.editorVersion = Me(e, "editor_version", null), this.htmlJsonPayload = JSON.parse(yo(Me(e, "html_json_payload", null))), this.updatedTime = va(Me(e, "updated_time") + "Z");
                const i = Me(e, "campaign_meta", null);
                i && (this.campaignMeta = {
                    brizyTemplateVersion: Me(i, "brz_version", null)
                }), this.frequency_data = Me(e, "frequency_data", null), this.baseUrl = null !== (t = Me(e, "base_url", null)) && void 0 !== t ? t : void 0
            }
        }
        class To {
            constructor(e) {
                this.max = Be(e, "max", 0), this.unit = Be(e, "unit", "session"), this.period = Be(e, "period", 0), (null == e ? void 0 : e.tags) && (this.tags = Be(e, "tags", null))
            }
        }
        class Io {
            constructor(e) {
                this.allCampaigns = new To(Be(e, Wi, void 0)), this.customEvent = new To(Be(e, Hi, void 0)), this.allTags = new To(Be(e, Gi, void 0)), this.anyTags = new To(Be(e, $i, void 0)), this.pageLoad = new To(Be(e, ji, void 0)), this.exitIntent = new To(Be(e, Ki, void 0))
            }
        }
        class Ao {
            constructor(e) {
                this.allTags = Be(e, Gi, 0), this.anyTags = Be(e, $i, 0), this.allCampaigns = Be(e, Wi, 0), this.pageLoad = Be(e, ji, 0), this.exitIntent = Be(e, Ki, 0), this.customEvent = Be(e, Hi, 0)
            }
        }
        class wo {
            constructor(e) {
                this.isValid = e.isValid, this.failedRules = e.failedRules, this.passedRules = e.passedRules
            }
        }
        var Oo = n(634).VR;
        class Do {
            static initialize() {
                return Ve(this, void 0, void 0, function*() {
                    if (null == Do.ready) {
                        Do.serviceMetaStore = t().createInstance({
                            driver: [t().INDEXEDDB, t().WEBSQL, t().LOCALSTORAGE],
                            name: bi.DATABASE_NAME,
                            storeName: bi.SERVICE_META.NAME
                        }), Do.campaingsMetaStore = t().createInstance({
                            driver: [t().INDEXEDDB, t().WEBSQL, t().LOCALSTORAGE],
                            name: bi.DATABASE_NAME,
                            storeName: bi.CAMPAIGNS_META.NAME
                        }), Do.pendingSecondaryEvents = t().createInstance({
                            driver: [t().INDEXEDDB, t().WEBSQL, t().LOCALSTORAGE],
                            name: bi.DATABASE_NAME,
                            storeName: bi.PENDING_SECONDARY_EVENTS.NAME
                        }), Do.pendingTimerCampaigns = t().createInstance({
                            driver: [t().INDEXEDDB, t().WEBSQL, t().LOCALSTORAGE],
                            name: bi.DATABASE_NAME,
                            storeName: bi.PENDING_TIMER_CAMPAIGNS.NAME
                        }), Do.triggeringPrimaryEvents = t().createInstance({
                            driver: [t().INDEXEDDB, t().WEBSQL, t().LOCALSTORAGE],
                            name: bi.DATABASE_NAME,
                            storeName: bi.TRIGGERING_PRIMARY_EVENTS.NAME
                        }), Do.campaingsTagsStore = t().createInstance({
                            driver: [t().INDEXEDDB, t().WEBSQL, t().LOCALSTORAGE],
                            name: bi.DATABASE_NAME,
                            storeName: bi.CAMPAIGNS_TAGS.NAME
                        }), Do.campaingsStatsStore = t().createInstance({
                            driver: [t().INDEXEDDB, t().WEBSQL, t().LOCALSTORAGE],
                            name: bi.DATABASE_NAME,
                            storeName: bi.CAMPAIGNS_STATS.NAME
                        }), Do.exitIntentCampaignStore = t().createInstance({
                            driver: [t().INDEXEDDB, t().WEBSQL, t().LOCALSTORAGE],
                            name: bi.DATABASE_NAME,
                            storeName: bi.EXIT_INTENT_CAMPAIGN_STORE.NAME
                        });
                        const e = [Do.serviceMetaStore.ready(), Do.campaingsMetaStore.ready(), Do.pendingSecondaryEvents.ready(), Do.pendingTimerCampaigns.ready(), Do.triggeringPrimaryEvents.ready(), Do.campaingsTagsStore.ready(), Do.campaingsStatsStore.ready(), Do.exitIntentCampaignStore.ready()];
                        Do.ready = Oo.all(e)
                    }
                    return Do.ready
                })
            }
            static clear() {
                return Ve(this, arguments, void 0, function*(e = !1) {
                    const t = Do.baseLogTag + ".clear";
                    try {
                        yield Do.initialize(), yield Oo.all([Do.campaingsMetaStore.clear(), Do.campaingsTagsStore.clear(), Do.exitIntentCampaignStore.clear(), Do.triggeringPrimaryEvents.clear()]), e && (yield Oo.all([Do.serviceMetaStore.clear(), Do.pendingSecondaryEvents.clear(), Do.pendingTimerCampaigns.clear()]));
                        const t = [Do.campaingsMetaStore.ready(), Do.campaingsTagsStore.ready(), Do.exitIntentCampaignStore.ready(), Do.triggeringPrimaryEvents.ready(), e ? Do.campaingsStatsStore.ready() : Oo.resolve()];
                        e && t.push(Do.serviceMetaStore.ready(), Do.pendingSecondaryEvents.ready(), Do.pendingTimerCampaigns.ready()), Do.ready = Oo.all(t)
                    } catch (e) {
                        pi.error(1, t, "Error clearing onsite stores:", e)
                    }
                    return Do.ready
                })
            }
            static sdkOptOut() {
                return Ve(this, void 0, void 0, function*() {
                    yield Oo.all([Do.pendingSecondaryEvents.clear(), Do.pendingTimerCampaigns.clear(), Do.triggeringPrimaryEvents.clear()])
                })
            }
        }
        Do.baseLogTag = "MOE_ONSITE_STORES";
        const Ro = Do,
            Co = {
                [Ui]: "allTags",
                [xi]: "anyTags",
                [Mi]: "allCampaigns",
                [Fi]: "pageLoad",
                [Vi]: "exitIntent",
                [Bi]: "customEvent"
            };

        function Lo(e) {
            return {
                [Gi]: e.allTags,
                [$i]: e.anyTags,
                [Wi]: e.allCampaigns,
                [ji]: e.pageLoad,
                [Ki]: e.exitIntent,
                [Hi]: e.customEvent
            }
        }
        class Po {
            static createDefaultDeviceFrequencyData() {
                return new Ao(qi)
            }
            static getRuleByEventType(e, t) {
                const n = Yi[t];
                return n ? e[n] : void 0
            }
            static filterOutHourLevelRules(e) {
                const t = {},
                    n = [{
                        settingKey: "a_c",
                        rule: e.allCampaigns
                    }, {
                        settingKey: "c_e",
                        rule: e.customEvent
                    }, {
                        settingKey: "all_t",
                        rule: e.allTags
                    }, {
                        settingKey: "any_t",
                        rule: e.anyTags
                    }, {
                        settingKey: "p_l",
                        rule: e.pageLoad
                    }, {
                        settingKey: "e_i",
                        rule: e.exitIntent
                    }];
                for (const {
                        settingKey: e,
                        rule: i
                    } of n) "hour" !== i.unit && (t[e] = {
                    max: i.max,
                    unit: i.unit,
                    period: i.period,
                    tags: i.tags
                });
                return new Io(t)
            }
            static addDeviceFrequencyData(e, t) {
                t && (e.allTags += t.allTags || 0, e.anyTags += t.anyTags || 0, e.allCampaigns += t.allCampaigns || 0, e.pageLoad += t.pageLoad || 0, e.exitIntent += t.exitIntent || 0, e.customEvent += t.customEvent || 0)
            }
            static validateAndResetLHData(e) {
                return e.LH ? e.LH : this.createDefaultDeviceFrequencyData()
            }
            static validateAndTrackSession() {
                return Ve(this, void 0, void 0, function*() {
                    const e = Po.baseLogTag + ".validateAndTrackSession";
                    try {
                        const e = Me(Zn.get(p), m, null),
                            t = yield Ro.serviceMetaStore.getItem(Ji.STORES.SERVICE_META.KEYS.SESSION_KEY);
                        return t ? e === t || e === t || (yield Ro.serviceMetaStore.setItem(Ji.STORES.SERVICE_META.KEYS.SESSION_KEY, e), yield this.resetSessionFrequencyData(), !1) : (e && (yield Ro.serviceMetaStore.setItem(Ji.STORES.SERVICE_META.KEYS.SESSION_KEY, e)), !0)
                    } catch (t) {
                        return pi.error(2, e, "Session validation and tracking failed", t), !1
                    }
                })
            }
            static resetSessionFrequencyData() {
                return Ve(this, void 0, void 0, function*() {
                    const e = this.createDefaultDeviceFrequencyData();
                    yield Ro.serviceMetaStore.setItem(Ji.FREQUENCY_CAPPING.STORAGE_KEYS.SESSION_FREQUENCY_DATA, e)
                })
            }
            static getSessionFrequencyData() {
                return Ve(this, void 0, void 0, function*() {
                    return (yield Ro.serviceMetaStore.getItem(Ji.FREQUENCY_CAPPING.STORAGE_KEYS.SESSION_FREQUENCY_DATA)) || this.createDefaultDeviceFrequencyData()
                })
            }
            static saveSessionFrequencyData(e) {
                return Ve(this, void 0, void 0, function*() {
                    yield Ro.serviceMetaStore.setItem(Ji.FREQUENCY_CAPPING.STORAGE_KEYS.SESSION_FREQUENCY_DATA, e)
                })
            }
            static getValueByEventType(e, t) {
                const n = Co[t];
                return null != n ? e[n] : 0
            }
            static incrementValueByEventType(e, t) {
                const n = Co[t];
                null != n && (e[n] += 1)
            }
            static incrementFrequencyCounter(e, t, n) {
                this.incrementValueByEventType(t, e), this.incrementValueByEventType(n, e)
            }
            static getCurrentDeviceId() {
                return Me(Zn.get(Ee.USER_DATA), "deviceUuid", ki) || ki
            }
            static ensureDeviceEntry(e, t) {
                if (!e[t]) {
                    const n = la(new Date);
                    e[t] = {
                        LH: this.createDefaultDeviceFrequencyData(),
                        [n]: this.createDefaultDeviceFrequencyData()
                    }
                }
            }
            static ensureDateEntry(e, t, n) {
                e[t][n] || (e[t][n] = this.createDefaultDeviceFrequencyData())
            }
            static prepareFrequencyDataUpdate(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = this.getCurrentDeviceId(),
                        n = yield e();
                    this.ensureDeviceEntry(n, t);
                    const i = la(new Date);
                    return this.ensureDateEntry(n, t, i), {
                        updatedLHData: n[t].LH,
                        updatedDateData: n[t][i],
                        frequencyData: n,
                        deviceId: t,
                        dateKey: i
                    }
                })
            }
            static saveFrequencyDataUpdate(e, t, n, i, r, a) {
                return Ve(this, void 0, void 0, function*() {
                    const s = Po.baseLogTag + ".saveFrequencyDataUpdate";
                    this.ensureDeviceEntry(e, t), e[t].LH = n, e[t][r] = i, yield a(Ji.FREQUENCY_CAPPING.STORAGE_KEYS.DEVICE_FREQUENCY_DATA, e), pi.log(2, s, `Frequency data saved for device ${t}, date: ${r}`)
                })
            }
            static createValidationResult(e, t) {
                return {
                    isValid: e,
                    shouldIncrementCounter: null != t ? t : e
                }
            }
            static validateRule(e, t, n, i, r) {
                return Ve(this, void 0, void 0, function*() {
                    const a = {
                        [Mi]: () => Ve(this, void 0, void 0, function*() {
                            const e = yield this.validateAllCampaignsRule(t, n);
                            return this.createValidationResult(e)
                        }),
                        [Bi]: () => Ve(this, void 0, void 0, function*() {
                            const e = yield this.validateCustomEventRule(t, n, r);
                            return this.createValidationResult(e)
                        }),
                        [Fi]: () => Ve(this, void 0, void 0, function*() {
                            const e = yield this.validatePageLoadRule(t, n, r);
                            return this.createValidationResult(e)
                        }),
                        [Vi]: () => Ve(this, void 0, void 0, function*() {
                            const e = yield this.validateExitIntentRule(t, n, r);
                            return this.createValidationResult(e)
                        }),
                        [Ui]: () => this.validateAllTagsRule(t, i, n),
                        [xi]: () => this.validateAnyTagsRule(t, i, n)
                    }[e];
                    return a ? yield a(): this.createValidationResult(!0, !1)
                })
            }
            static validateAllCampaignsRule(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    const n = yield this.getCombinedDataForRule(e, t);
                    return this.getValueByEventType(n, Mi) < e.max
                })
            }
            static validateEventSpecificRule(e, t, n, i) {
                return Ve(this, void 0, void 0, function*() {
                    if (n !== i) return !0;
                    const r = yield this.getCombinedDataForRule(e, t);
                    return this.getValueByEventType(r, i) < e.max
                })
            }
            static validateCustomEventRule(e, t, n) {
                return Ve(this, void 0, void 0, function*() {
                    return this.validateEventSpecificRule(e, t, n, Bi)
                })
            }
            static validatePageLoadRule(e, t, n) {
                return Ve(this, void 0, void 0, function*() {
                    return this.validateEventSpecificRule(e, t, n, Fi)
                })
            }
            static validateExitIntentRule(e, t, n) {
                return Ve(this, void 0, void 0, function*() {
                    return this.validateEventSpecificRule(e, t, n, Vi)
                })
            }
            static validateTagsRule(e, t, n, i, r) {
                return Ve(this, void 0, void 0, function*() {
                    if (!e.tags || !t.tags || 0 === t.tags.length) return {
                        isValid: !0,
                        shouldIncrementCounter: !1
                    };
                    if (!r(e.tags, t.tags)) return {
                        isValid: !0,
                        shouldIncrementCounter: !1
                    };
                    const a = yield this.getCombinedDataForRule(e, n), s = this.getValueByEventType(a, i) < e.max;
                    return {
                        isValid: s,
                        shouldIncrementCounter: s
                    }
                })
            }
            static validateAllTagsRule(e, t, n) {
                return Ve(this, void 0, void 0, function*() {
                    return this.validateTagsRule(e, t, n, Ui, (e, t) => e.every(e => t.includes(e)))
                })
            }
            static validateAnyTagsRule(e, t, n) {
                return Ve(this, void 0, void 0, function*() {
                    return this.validateTagsRule(e, t, n, xi, (e, t) => e.some(e => t.includes(e)))
                })
            }
            static getAllDevicesLHData(e) {
                if (!e || "object" != typeof e) return this.createDefaultDeviceFrequencyData();
                const t = this.createDefaultDeviceFrequencyData();
                return Object.values(e).forEach(e => {
                    if (e && "object" == typeof e) {
                        const n = this.validateAndResetLHData(e);
                        this.addDeviceFrequencyData(t, n)
                    }
                }), t
            }
            static combineFrequencyDataForLastNDays(e, t) {
                if (!e || "object" != typeof e || t <= 0) return this.createDefaultDeviceFrequencyData();
                const n = this.createDefaultDeviceFrequencyData(),
                    i = new Date,
                    r = Math.min(t, 7);
                for (let t = 0; t < r; t++) {
                    const r = new Date(i);
                    r.setDate(r.getDate() - t);
                    const a = la(r);
                    Object.values(e).forEach(e => {
                        e && "object" == typeof e && e[a] && this.addDeviceFrequencyData(n, e[a])
                    })
                }
                return n
            }
            static getCombinedDataForRule(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    switch (e.unit) {
                        case "session":
                            return yield this.getSessionFrequencyData();
                        case "hour":
                            return this.getAllDevicesLHData(t);
                        case "day":
                            const n = Math.min(e.period, 7);
                            return this.combineFrequencyDataForLastNDays(t, n);
                        default:
                            return this.createDefaultDeviceFrequencyData()
                    }
                })
            }
            static getStatName(e) {
                var t;
                return e && 0 !== e.length && null !== (t = zi.impression[e[0]]) && void 0 !== t ? t : null
            }
            static getPriorityStatName(e) {
                var t;
                return e && 0 !== e.length && null !== (t = zi.priority[e[0]]) && void 0 !== t ? t : null
            }
            static validateRules(e, t, n, i) {
                return Ve(this, void 0, void 0, function*() {
                    const r = [],
                        a = [];
                    let s = !0;
                    const o = [...Ji.FREQUENCY_CAPPING.ALL_EVENT_TYPES];
                    for (const l of o) {
                        const o = this.getRuleByEventType(e, l);
                        if (!o || o.max <= 0) continue;
                        const d = Ji.FREQUENCY_CAPPING.EVENT_SPECIFIC_TYPES.includes(l),
                            c = Ji.FREQUENCY_CAPPING.TAG_SPECIFIC_TYPES.includes(l);
                        let u;
                        if (u = d && l !== n ? {
                                isValid: !0,
                                shouldIncrementCounter: !1
                            } : !c || t.tags && 0 !== t.tags.length ? yield this.validateRule(l, o, i, t, n): {
                                isValid: !0,
                                shouldIncrementCounter: !1
                            }, !u.isValid) {
                            a.push(l), s = !1;
                            break
                        }
                        d && l !== n || u.shouldIncrementCounter && r.push(l)
                    }
                    return new wo({
                        isValid: s,
                        failedRules: a.length > 0 ? a : void 0,
                        passedRules: r
                    })
                })
            }
            static saveAllDeviceFrequencyData(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    if (!e || "object" != typeof e) throw new Error("Invalid frequency data provided");
                    try {
                        yield t(Ji.FREQUENCY_CAPPING.STORAGE_KEYS.DEVICE_FREQUENCY_DATA, e)
                    } catch (e) {
                        throw new Error(`Failed to save all device frequency data: ${e}`)
                    }
                })
            }
            static processResponse(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    const n = this.baseLogTag + ".processResponse";
                    if (e && "object" == typeof e && e.frequency_data) try {
                        const n = {};
                        Object.keys(e.frequency_data).forEach(t => {
                            const i = e.frequency_data[t];
                            n[t] = {
                                LH: new Ao(i.LH || {})
                            }, Object.keys(i).forEach(e => {
                                "LH" !== e && (n[t][e] = new Ao(i[e]))
                            })
                        }), yield this.saveAllDeviceFrequencyData(n, t)
                    } catch (e) {
                        pi.error(2, n, "Failed to save frequency data from API response", e)
                    }
                })
            }
            static trackFailedValidationStats(e, t, n, i) {
                const r = Po.baseLogTag + ".trackFailedValidationStats";
                if (!t) return;
                const a = "priority" === i ? this.getPriorityStatName(t) : this.getStatName(t);
                a ? n(e, a) : pi.log(2, r, `No ${i} stat name found for failed rules: ${null==t?void 0:t.join(", ")}`)
            }
            static selfhandledImpressionValidation(e, t, n, i, r) {
                return Ve(this, void 0, void 0, function*() {
                    var a, s;
                    const o = [];
                    for (const l of e) {
                        if (null === (s = null === (a = l.delivery) || void 0 === a ? void 0 : a.fcMeta) || void 0 === s ? void 0 : s.ignoreFc) {
                            o.push(l);
                            continue
                        }
                        const e = yield this.validateRules(t, l, n, i);
                        e.isValid ? o.push(l) : this.trackFailedValidationStats(l, e.failedRules, r, "impression")
                    }
                    return o
                })
            }
            static selfhandledPriorityValidation(e, t, n, i, r) {
                return Ve(this, void 0, void 0, function*() {
                    var a, s;
                    const o = [],
                        l = this.filterOutHourLevelRules(t);
                    for (const t of e) {
                        if (null === (s = null === (a = t.delivery) || void 0 === a ? void 0 : a.fcMeta) || void 0 === s ? void 0 : s.ignoreFc) {
                            o.push(t);
                            continue
                        }
                        const e = yield this.validateRules(l, t, n, i);
                        e.isValid ? o.push(t) : this.trackFailedValidationStats(t, e.failedRules, r, "priority")
                    }
                    return o
                })
            }
        }
        Po.baseLogTag = "FrequencyCappingHelper";
        class No {
            static getEventTypeFromEvent(e) {
                if (!e) return Fi;
                switch (e.name) {
                    case Q.PAGE_VIEWED:
                        return Fi;
                    case Q.MOE_PAGE_EXIT:
                    case Q.MOE_EXIT:
                        return Vi;
                    default:
                        return Bi
                }
            }
            static getEventTypeFromCampaign(e) {
                if (!e || !e.triggerData) return Bi;
                try {
                    if (e.triggerData.primary_condition) {
                        const t = e.triggerData.primary_condition;
                        if (this.hasEventInCondition(t, Q.PAGE_VIEWED)) return Fi;
                        if (this.hasEventInCondition(t, Q.MOE_PAGE_EXIT) || this.hasEventInCondition(t, Q.MOE_EXIT)) return Vi
                    }
                    if (e.triggerData.secondary_condition) {
                        const t = e.triggerData.secondary_condition;
                        if (this.hasEventInCondition(t, Q.PAGE_VIEWED)) return Fi;
                        if (this.hasEventInCondition(t, Q.MOE_PAGE_EXIT) || this.hasEventInCondition(t, Q.MOE_EXIT)) return Vi
                    }
                } catch (e) {
                    pi.error(2, "EventTypeHelper.getEventTypeFromCampaign", "Error determining event type from campaign:", e)
                }
                return Bi
            }
            static hasEventInCondition(e, t) {
                try {
                    return !!(e && e.included_filters && e.included_filters.filters && Array.isArray(e.included_filters.filters)) && e.included_filters.filters.some(e => e && e.action_name === t)
                } catch (e) {
                    return pi.error(2, "EventTypeHelper.hasEventInCondition", "Error checking event in condition:", e), !1
                }
            }
        }
        class ko {
            static saveSettings(e) {
                return Ve(this, void 0, void 0, function*() {
                    if (!e || "object" != typeof e || 0 === Object.keys(e).length) return;
                    const t = e instanceof Io ? e : new Io(e);
                    yield Ro.serviceMetaStore.setItem(Ji.FREQUENCY_CAPPING.STORAGE_KEYS.FREQUENCY_CAPPING_SETTINGS, t), (yield Ro.serviceMetaStore.getItem(Ji.FREQUENCY_CAPPING.STORAGE_KEYS.SESSION_FREQUENCY_DATA)) || (yield Po.resetSessionFrequencyData())
                })
            }
            static getSettings() {
                return Ve(this, void 0, void 0, function*() {
                    return (yield Ro.serviceMetaStore.getItem(Ji.FREQUENCY_CAPPING.STORAGE_KEYS.FREQUENCY_CAPPING_SETTINGS)) || null
                })
            }
            static getDeviceFrequencyData() {
                return Ve(this, void 0, void 0, function*() {
                    return (yield Ro.serviceMetaStore.getItem(Ji.FREQUENCY_CAPPING.STORAGE_KEYS.DEVICE_FREQUENCY_DATA)) || {}
                })
            }
            static isEventTypePresentInSettings(e, t) {
                const n = Po.getRuleByEventType(e, t);
                return void 0 !== n && n.max > 0
            }
            static filterEventsPresentInSettings(e, t) {
                return t.filter(t => this.isEventTypePresentInSettings(e, t))
            }
            static validateAndUpdateFrequencyData(e, t, n) {
                return Ve(this, arguments, void 0, function*(e, t, n, i = !1) {
                    var r, a;
                    const s = ko.baseLogTag + ".validateAndUpdateFrequencyData";
                    try {
                        const o = yield this.getSettings();
                        if (!o) return {
                            isValid: !0,
                            passedRules: []
                        };
                        const l = yield this.getDeviceFrequencyData(), d = yield Po.validateRules(o, e, t, l);
                        d.isValid || pi.log(2, s, `Campaign ${e.campaignId} blocked by rule: ${null===(r=d.failedRules)||void 0===r?void 0:r.join(", ")}`);
                        const c = null === (a = e.delivery) || void 0 === a ? void 0 : a.fcMeta;
                        if (c && Me(c, "ignoreFcCount", !1) && n) return pi.log(2, s, `Skipping frequency data update for campaign ${e.campaignId} as ignoreFcCount flag is set`), {
                            isValid: d.isValid,
                            failedRules: d.failedRules,
                            passedRules: d.passedRules
                        };
                        if ((d.isValid || i) && n) {
                            let e;
                            if (i) {
                                const n = new Set([t, Mi, ...d.passedRules, ...d.failedRules || []]);
                                e = Array.from(n)
                            } else e = d.passedRules;
                            e = this.filterEventsPresentInSettings(o, e), e.length > 0 && (yield this.updateFrequencyDataForPassedRules(e, n))
                        }
                        return {
                            isValid: d.isValid,
                            failedRules: d.failedRules,
                            passedRules: d.passedRules
                        }
                    } catch (e) {
                        return pi.error(2, s, "Error during validation", e), {
                            isValid: !1,
                            passedRules: []
                        }
                    }
                })
            }
            static updateFrequencyDataForPassedRules(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    const n = yield this.getSettings();
                    if (!n) return;
                    const i = this.filterEventsPresentInSettings(n, e);
                    if (0 === i.length) return;
                    const r = [],
                        a = [];
                    for (const e of i) {
                        const t = Po.getRuleByEventType(n, e);
                        t && "session" === t.unit ? r.push(e) : a.push(e)
                    }
                    if (r.length > 0) {
                        const e = yield Po.getSessionFrequencyData();
                        for (const t of r) Po.incrementValueByEventType(e, t);
                        yield Po.saveSessionFrequencyData(e)
                    }
                    if (a.length > 0) {
                        const {
                            updatedLHData: e,
                            updatedDateData: n,
                            frequencyData: i,
                            deviceId: r,
                            dateKey: s
                        } = yield Po.prepareFrequencyDataUpdate(() => this.getDeviceFrequencyData());
                        for (const t of a) Po.incrementFrequencyCounter(t, e, n);
                        if (yield Po.saveFrequencyDataUpdate(i, r, e, n, s, (e, t) => Ro.serviceMetaStore.setItem(e, t)), t) try {
                            const i = {
                                LH: e,
                                [s]: n
                            };
                            yield t.updateDeviceFrequencyData(i)
                        } catch (e) {
                            pi.error(2, "FrequencyCapping.updateFrequencyDataForPassedRules", "Failed to sync frequency data with server", e)
                        }
                    }
                })
            }
            static campaignImpressionValidation(e, t, n) {
                return Ve(this, void 0, void 0, function*() {
                    var i;
                    const r = ko.baseLogTag + ".campaignImpressionValidation";
                    try {
                        const a = yield this.getSettings(), s = null === (i = e.delivery) || void 0 === i ? void 0 : i.fcMeta;
                        if (!a || s && s.ignoreFc) return pi.log(2, r, `Skipping FC validation for campaign: ${e.campaignId} as FC setting is not available or ignoreFc flag is set true`), !0;
                        const o = yield this.validateAndUpdateFrequencyData(e, t);
                        return !o.isValid && n && Po.trackFailedValidationStats(e, o.failedRules, (e, t) => n.setStats(e, t), "impression"), o.isValid
                    } catch (e) {
                        return pi.error(2, r, "Error in frequency capping validation", e), !0
                    }
                })
            }
            static processResponse(e) {
                return Ve(this, void 0, void 0, function*() {
                    yield Po.processResponse(e, (e, t) => Ro.serviceMetaStore.setItem(e, t))
                })
            }
            static handlePriorityValidation(e, t, n) {
                return Ve(this, void 0, void 0, function*() {
                    var i, r;
                    const a = ko.baseLogTag + ".handlePriorityValidation";
                    try {
                        const s = yield this.getSettings();
                        if (!s) return !0;
                        const o = null === (i = e.delivery) || void 0 === i ? void 0 : i.fcMeta;
                        if (o && o.ignoreFc && o.ignoreFcCount) return pi.log(2, a, "Skipping priority frequency capping validation due to ignoreFc and ignoreFcCount flags"), !0;
                        const l = Po.filterOutHourLevelRules(s),
                            d = yield this.getDeviceFrequencyData(), c = yield Po.validateRules(l, e, t, d);
                        return c.isValid ? (pi.log(2, a, `Priority validation passed for rules: ${c.passedRules.join(", ")}`), !0) : (pi.log(2, a, `Priority validation failed for rule: ${null===(r=c.failedRules)||void 0===r?void 0:r.join(", ")}`), Po.trackFailedValidationStats(e, c.failedRules, (e, t) => n.setStats(e, t), "priority"), !1)
                    } catch (e) {
                        return pi.error(2, a, "Error during priority frequency capping validation", e), !0
                    }
                })
            }
            static campaignPriorityValidation(e, t, n, i) {
                return Ve(this, void 0, void 0, function*() {
                    const r = ko.baseLogTag + ".campaignPriorityValidation",
                        a = yield this.getSettings(), s = e.delivery.fcMeta;
                    if (!a || s && s.ignoreFc) return !0;
                    let o;
                    if (n) o = n;
                    else {
                        if (!t) return pi.log(2, r, `Unable to determine event type for campaign: ${e.campaignId}`), !1;
                        o = No.getEventTypeFromEvent(t)
                    }
                    return !!(yield this.handlePriorityValidation(e, o, i)) || (pi.log(2, ko.baseLogTag + ".campaignPriorityValidation", `Priority frequency capping validation failed for campaign: ${e.campaignId}`), !1)
                })
            }
        }
        ko.baseLogTag = "FrequencyCapping";
        class Mo {
            constructor(e) {
                this.appId = e.appId, this.store = t().createInstance({
                    driver: [t().INDEXEDDB, t().WEBSQL, t().LOCALSTORAGE],
                    name: bi.DATABASE_NAME,
                    storeName: bi.SERVICE_META.NAME
                }), this.host = e.baseDomainName
            }
            getUserSessionAttributes() {
                const e = function() {
                        const e = new Date;
                        return {
                            day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][e.getDay()],
                            hours: String(e.getHours()).padStart(2, "0")
                        }
                    }(),
                    t = new Aa,
                    n = Mt(window.location.href);
                return Object.assign(Object.assign({}, n), {
                    USER_TYPE: t.getNumberOfSessions() > 1 ? "Returning" : "New",
                    DAY_OF_THE_WEEK: e.day,
                    TIME_OF_THE_DAY: e.hours
                })
            }
            getCampaignsMeta() {
                return Ve(this, void 0, void 0, function*() {
                    var e;
                    const t = Mo.baseLogTag + ".getCampaignsMeta",
                        n = null !== (e = Pr.startSpan("inapp_meta_fetch", {
                            source: "apis/onsiteApi.ts"
                        })) && void 0 !== e ? e : null;
                    try {
                        const e = yield this.getRequestOptions(), i = yield this.store.getItem(bi.SERVICE_META.KEYS.LAST_META_CALL_TIME);
                        Pr.checkpoint(n, "request_built");
                        const r = yield ar.post(this.host + _i.META, Object.assign(Object.assign({}, e), {
                            postData: Object.assign(Object.assign({}, e.postData), {
                                campaign_ids: [],
                                user_session_attributes: this.getUserSessionAttributes()
                            }),
                            last_fetch_time: i && "object" == typeof i ? i.toISOString() : i
                        }));
                        Pr.checkpoint(n, "meta_received"), this.store.setItem(bi.SERVICE_META.KEYS.LAST_META_CALL_TIME, new Date), this.store.setItem(bi.SERVICE_META.KEYS.UNIQUE_ID, e.queryParams.unique_id);
                        const a = JSON.parse(r.responseText),
                            s = [];
                        if (a.campaigns.forEach(e => {
                                ao.isValidMetaJSON(e) && s.push(new ao(e))
                            }), a.fc_settings) try {
                            yield ko.saveSettings(a.fc_settings)
                        } catch (e) {
                            pi.error(2, t, "Failed to save frequency capping settings", e)
                        }
                        return Pr.endSpan(n, pr, {
                            campaign_count: s.length,
                            inapp_meta_payload_size_bytes: "string" == typeof r.responseText ? r.responseText.length : 0
                        }), {
                            campaignsMeta: s,
                            globalDelayBetweenInapps: Me(a, "min_delay_btw_inapps", 0),
                            fcSettings: a.fc_settings
                        }
                    } catch (e) {
                        throw Pr.checkpoint(n, "meta_received", void 0, !1), Pr.endSpan(n, mr, {
                            failure_reason: "meta_api_failed"
                        }), pi.errorAndBroadcast(1, t, ee, "Could not fetch OSM campaign details", `Something went wrong while fetching OSM campaign details. ${"string"==typeof e?e:JSON.stringify(e)}`, void 0, e), new Error("Could not get meta payload")
                    }
                })
            }
            getCampaignPayload(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    const n = Mo.baseLogTag + ".getCampaignPayload";
                    let i;
                    try {
                        const n = {
                            contexts: ["string"],
                            campaign_context: e.campaignContext,
                            user_session_attributes: this.getUserSessionAttributes()
                        };
                        if (t) {
                            const r = {};
                            for (let e = 0; e < t.attributes.length; e++) r[t.attributes[e].key] = t.attributes[e].value;
                            n.event = {
                                name: t.name,
                                attributes: r,
                                time: (new Date).toISOString()
                            }, i = yield ar.post(this.host + _i.CAMPAIGN_PAYLOAD + e.campaignId, yield this.getRequestOptions(n))
                        } else i = yield ar.post(this.host + _i.CAMPAIGN_PAYLOAD + e.campaignId, yield this.getRequestOptions(n));
                        return i = JSON.parse(i.responseText), i.code !== wi && i.code !== Oi || (i = {
                            payload: i
                        }), new bo(i)
                    } catch (t) {
                        if (pi.errorAndBroadcast(1, n, ee, "Could not get payload for OSM campaign", tt("campaign", e.campaignId, t), void 0, t), t.code && (409 === t.code || 400 === t.code) && t.reason) return {
                            error: !0,
                            reason: JSON.parse(t.reason).description || ""
                        };
                        throw new Error("Could not get payload for " + e.campaignId)
                    }
                })
            }
            getCampaignsPayload(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    const n = Mo.baseLogTag + ".getCampaignsPayload";
                    let i;
                    try {
                        if (t) {
                            const n = {};
                            for (let e = 0; e < t.attributes.length; e++) n[t.attributes[e].key] = t.attributes[e].value;
                            const r = {
                                event: {
                                    name: t.name,
                                    attributes: n,
                                    time: (new Date).toISOString()
                                },
                                contexts: ["string"],
                                campaign_ids: e
                            };
                            i = yield ar.post(this.host + _i.CAMPAIGNS_PAYLOAD, this.getRequestOptions(r))
                        } else i = yield ar.post(this.host + _i.CAMPAIGNS_PAYLOAD, this.getRequestOptions());
                        const n = [];
                        return JSON.parse(i.responseText).forEach(e => {
                            n.push(new bo(e))
                        }), n
                    } catch (t) {
                        throw pi.error(1, n, tt("campaigns", String(e), t)), new Error("Could not get payload for " + e)
                    }
                })
            }
            getDraftCampaign(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = Mo.baseLogTag + ".getDraftCampaign";
                    try {
                        const t = yield this.getRequestOptions();
                        t.queryParams = Object.assign({}, t.queryParams, {
                            locale: e.locale,
                            variation: e.variation
                        });
                        const n = yield ar.post(this.host + _i.DRAFT_CAMPAIGN_PAYLOAD + e.draftId, t), i = JSON.parse(n.responseText);
                        return "JSON" === i.payload_type && (i.payload = JSON.parse(i.payload)), new bo(i)
                    } catch (n) {
                        return pi.errorAndBroadcast(1, t, ee, "Could not get payload for test OSM campaign", tt("draft campaign", e.draftId, n), void 0, n), null
                    }
                })
            }
            getRequestOptions(e = {}) {
                const t = We();
                return Qr().then(() => Ve(this, void 0, void 0, function*() {
                    const n = yield function() {
                        return Ve(this, void 0, void 0, function*() {
                            const e = {},
                                t = zr.getIdentityMap(),
                                n = yield function() {
                                    return Ve(this, void 0, void 0, function*() {
                                        const e = yield ga.get(), t = e.getAttribute(a) || "";
                                        return {
                                            uniqueId: e.deviceUuid,
                                            uid: t
                                        }
                                    })
                                }();
                            return t && (t.userIdentities && (e.user_identities = t.userIdentities), t.previousIdentities && (e.previous_identities = t.previousIdentities)), n.uid && (e.uid = n.uid), {
                                identifiers: e,
                                uniqueId: n.uniqueId
                            }
                        })
                    }();
                    if (!n.uniqueId) throw new Error("uniqueId not found in localStorage.");
                    const i = He() ? "mweb" : "web",
                        r = $e(),
                        s = {
                            "Content-Type": "application/json",
                            "MOE-APPKEY": this.appId
                        },
                        o = Dt.get();
                    return (null == o ? void 0 : o.projectId) && (s["MOE-PROJECT-CODE"] = o.projectId), {
                        headers: s,
                        queryParams: Object.assign({
                            sdk_ver: t.getSdkVersion(),
                            unique_id: null == n ? void 0 : n.uniqueId,
                            os: i
                        }, r),
                        postData: Object.assign(Object.assign({}, e), {
                            identifiers: n.identifiers
                        })
                    }
                })).catch(e => {
                    throw new Error("Error in getting Web SDK Settings. This might indicate that the App is blocked.")
                })
            }
            updateDeviceFrequencyData(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = Mo.baseLogTag + ".updateDeviceFrequencyData";
                    try {
                        const n = yield ko.getDeviceFrequencyData(), i = Po.getCurrentDeviceId();
                        if (!i) return void pi.error(2, t, "Device ID not found");
                        const r = e || n[i];
                        if (!r) return void pi.error(2, t, `Device frequency data not found for device: ${i}`);
                        const a = {
                            LH: Lo(r.LH)
                        };
                        Object.keys(r).forEach(e => {
                            "LH" !== e && (a[e] = Lo(r[e]))
                        });
                        const s = yield this.getRequestOptions(), o = yield ar.post(this.host + _i.FC_USER_ACTIVITY, Object.assign(Object.assign({}, s), {
                            postData: Object.assign(Object.assign({}, s.postData), {
                                frequency_data: {
                                    [i]: a
                                }
                            })
                        }));
                        if (!o || !o.responseText) return void pi.error(2, t, "Invalid API response");
                        const l = JSON.parse(o.responseText);
                        l.frequency_data && (yield ko.processResponse(l))
                    } catch (e) {
                        throw pi.error(2, t, "Failed to update device frequency data", e), new Error("Could not update device frequency data")
                    }
                })
            }
            callStatsAPI(e, t) {
                this.getRequestOptions().then(t => {
                    let n = this.host + _i.STATS;
                    t.queryParams.app_id = t.headers["MOE-APPKEY"], delete t.queryParams.uid, n = xt(n, t.queryParams);
                    const i = new Blob([JSON.stringify(e)], {
                        type: "text/plain;charset=UTF-8"
                    });
                    navigator.sendBeacon(n, i)
                })
            }
        }
        Mo.baseLogTag = "OnsiteApi";
        const Bo = Mo;
        var Uo = n(634).VR;
        class xo {
            static isValid(e, t) {
                return !xo.isCampaignExpired(e) && xo.isCampaignActive(e) && xo.isUserInCampaignSegment(e) && xo.isCampaignWithinFC(e, t)
            }
            static isCampaignExpired(e) {
                return (new Date).getTime() > new Date(e.expiryTime).getTime()
            }
            static isValidMessagingCampaign(e, t, n, i, r) {
                return xo.canCampaignBeRenderedOverExisting(e, r.length) && xo.hasCampaignClearedSelfDelay(e, t) && xo.hasCampaignClearedGlobalDelay(e, n, i)
            }
            static isCampaignActive(e) {
                return e.status === po.ACTIVE || (pi.warn(1, xo.baseLogTag + ".isValid", `Campaign ${e.campaignId} : Status is ${e.status}`), !1)
            }
            static isUserInCampaignSegment(e) {
                return !!e.userInSegment || (pi.warn(1, xo.baseLogTag + ".isValid", `Campaign ${e.campaignId} : User is not in segment`), !1)
            }
            static isCampaignWithinFC(e, t) {
                const n = xo.baseLogTag + ".isValid";
                if ([So.SELF_HANDLED].indexOf(e.templateType) < 0) {
                    const i = Me(e, "delivery.fcMeta.count", 0);
                    if (i > 0) {
                        const r = Me(t, "impressions", 0);
                        if (null != t) return !(r >= i && (pi.warn(1, n, `Campaign ${e.campaignId} : FC reached. ${t.impressions} times shown`), 1))
                    }
                }
                return !0
            }
            static hasCampaignClearedGlobalDelay(e, t, n) {
                const i = xo.baseLogTag + ".isValid",
                    r = Me(e, "delivery.fcMeta.ignoreGlobalDelay", !1);
                try {
                    if (!r && n) {
                        const r = ra(new Date(n).getTime());
                        if (t && r <= t) return pi.remoteLogTracking(1, "info", i, `Can't render ${e.campaignId} as last global campaign was rendered ${r} seconds ago.`), !1
                    }
                } catch (e) {
                    return pi.error(1, i, "Error checking global delay:", e), !1
                }
                return !0
            }
            static hasCampaignClearedSelfDelay(e, t) {
                const n = `${xo.baseLogTag}.hasCampaignClearedSelfDelay`,
                    i = Me(e, "delivery.fcMeta.delay", 0);
                try {
                    if (i > 0 && null != t && t.lastImpression) {
                        const i = ra(new Date(t.lastImpression).getTime());
                        if (i <= Me(e, "delivery.fcMeta.delay", 0)) return pi.warn(1, n, `Can't render ${e.campaignId} as it was rendered ${i} seconds ago.`), !1
                    }
                } catch (t) {
                    return pi.error(1, n, `Can't check self delay for ${e.campaignId}`, t), !1
                }
                return !0
            }
            static doCampaignPayloadHasMandatoryParams(e) {
                const {
                    payload: t,
                    payloadType: n,
                    htmlJsonPayload: i
                } = e;
                return !(!t && !i || !n)
            }
            static canCampaignBeRenderedOverExisting(e, t) {
                return !(t > 0 && !e.display.config.showOverOtherCampaigns && (pi.warn(1, `${xo.baseLogTag}.canCampaignBeRenderedOverExisting`, `Can not show ${e.campaignId} over other existing campaigns`), 1))
            }
            static comparator(e, t) {
                return t.delivery.priority > e.delivery.priority ? 1 : t.delivery.priority < e.delivery.priority ? -1 : t.updatedTime > e.updatedTime ? 1 : -1
            }
        }
        xo.baseLogTag = "CampaignUtils";
        const Fo = e => Ve(void 0, void 0, void 0, function*() {
                const t = e.map(e => Ro.campaingsStatsStore.getItem(e.campaignId));
                let n = [];
                try {
                    return n = yield Uo.all(t), e.filter((e, t) => xo.isValid(e, n[t])).sort(xo.comparator)
                } catch (e) {
                    return pi.error(1, "filterAndSortCampaigns", "Error filtering and sorting campaigns: ", e), []
                }
            }),
            Vo = (e, t) => {
                const n = Me(e, "triggerData.primary_condition.included_filters", null);
                return (null == n ? void 0 : n.filter_operator) === mo.OR && (null == n ? void 0 : n.filters.findIndex(e => e.action_name === t)) > -1
            },
            Wo = e => Ve(void 0, void 0, void 0, function*() {
                const t = yield Ro.exitIntentCampaignStore.getItem(e.campaignId);
                if (t) return t.error ? t : (e.onsitePayload = t, pi.log(1, "getPrefetchedCampaign", `Prefetched exit intent campaign found: ${e.campaignId}`), e)
            }),
            Ho = e => Ve(void 0, void 0, void 0, function*() {
                try {
                    return yield Ro.campaingsMetaStore.getItem(e)
                } catch (e) {
                    return pi.error(2, "getCampaignById", "Error getting campaign from store: ", e), null
                }
            }),
            Go = () => new jn.VR(e => {
                (0, jn.pS)(() => Ve(void 0, void 0, void 0, function*() {
                    const t = [];
                    yield Ro.campaingsMetaStore.iterate(e => {
                        t.push(e)
                    }), e(t)
                }), 0)
            }),
            $o = e => {
                var t;
                return null === (t = Me(e, "triggerData.secondary_condition.included_filters.filters")) || void 0 === t ? void 0 : t.length
            };
        class jo {
            constructor() {
                this.isExitIntentShown = !1, this.isPopStateEventBound = !1
            }
            onScroll(e) {
                const t = jo.baseLogTag + ".onScroll";
                null == e && (e = () => {});
                const n = jo.throttle(() => {
                    pi.remoteLogTracking(1, "info", t, "Scrolled percent:", jo.getScrollPercent()), e(jo.getScrollPercent())
                }, 1500);
                return e(jo.getScrollPercent()), window.addEventListener("scroll", n), n
            }
            onMobileTabChange(e) {
                const t = jo.baseLogTag + ".onMobileTabChange";
                document.addEventListener("visibilitychange", () => {
                    this.isExitIntentShown || "hidden" !== document.visibilityState || (pi.log(1, t, "TRIGGERED: MOBILE EXIT INTENT (tab change)"), e(), this.isExitIntentShown = !0)
                })
            }
            onMobileBackHit(e) {
                (0, jn.pS)(() => {
                    this.isPopStateEventBound = !0, window.addEventListener("popstate", t => {
                        !this.isExitIntentShown && t.state && "exit_intent" === t.state.moeIntent && (e("onBackClick"), this.isExitIntentShown = !0)
                    })
                }, 1e3), this.setHistoryState()
            }
            setHistoryState() {
                window.history.state && "no_intent" === window.history.state.moeIntent || (window.history.replaceState(Object.assign(Object.assign({}, window.history.state), {
                    moeIntent: "exit_intent"
                }), ""), window.history.pushState(Object.assign(Object.assign({}, window.history.state), {
                    moeIntent: "no_intent"
                }), ""))
            }
            onMobileScrollAndExit(e) {
                const t = document.documentElement.offsetHeight;
                let n = jo.getScrollY(),
                    i = !1;
                t > 0 && (this.scrollExitIntentInterval = (0, jn.LK)(() => {
                    let r = n - jo.getScrollY();
                    r < 0 && (r = 0, n = jo.getScrollY()), i = jo.getScrollPercent() > 50, i && r / t > .05 && ((0, jn.wm)(this.scrollExitIntentInterval), this.scrollExitIntentInterval = null, this.isExitIntentShown || (e(), this.isExitIntentShown = !0))
                }, 1e3))
            }
            mobileExitIntent(e) {
                this.onMobileScrollAndExit(e), this.onMobileBackHit(e), this.onMobileTabChange(e)
            }
            onExit(e) {
                const t = jo.baseLogTag + ".onExit";
                He() ? this.mobileExitIntent(e) : (this.exitIntentListener = n => Ve(this, void 0, void 0, function*() {
                    const i = window.innerWidth,
                        r = window.innerHeight;
                    (n.clientY < 0 || n.clientX < 0 || n.clientY >= r || n.clientX >= i) && (pi.log(1, t, "TRIGGERED: EXIT INTENT"), e())
                }), document.addEventListener("mouseout", this.exitIntentListener, !1))
            }
            static getScrollPercent() {
                const e = window,
                    t = document,
                    n = t.documentElement,
                    i = t.getElementsByTagName("body")[0],
                    r = e.innerHeight || n.clientHeight || i.clientHeight,
                    a = document.body,
                    s = document.documentElement,
                    o = Math.max(a.scrollHeight, a.offsetHeight, s.clientHeight, s.scrollHeight, s.offsetHeight);
                return o > r ? 100 * jo.getScrollY() / (o - r) : 100
            }
            static getScrollY() {
                let e = 0;
                return "number" == typeof window.pageYOffset ? e = window.pageYOffset : document.body && document.body.scrollTop && (e = document.body.scrollTop), e
            }
            static throttle(e, t) {
                let n;
                return (...i) => {
                    n || (n = (0, jn.pS)(() => {
                        n = null, e.apply(null, i)
                    }, t))
                }
            }
            static setOnlineEventListner(e) {
                window.addEventListener("online", e, {
                    once: !0
                })
            }
        }
        jo.baseLogTag = "WindowEventManager";
        class Ko {
            static getPendingSecondaryEventCampaign(e) {
                return Ve(this, void 0, void 0, function*() {
                    return yield Ro.pendingSecondaryEvents.getItem(e)
                })
            }
            static setPendingSecondaryEventCampaign(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    yield Ro.pendingSecondaryEvents.setItem(e, t)
                })
            }
            static removePendingSecondaryEventCampaign(e) {
                return Ve(this, void 0, void 0, function*() {
                    yield Ro.pendingSecondaryEvents.removeItem(e)
                })
            }
            static getPendingSecondaryEventKeys() {
                return Ve(this, void 0, void 0, function*() {
                    return yield Ro.pendingSecondaryEvents.keys()
                })
            }
            static getPendingTimerCampaign(e) {
                return Ve(this, void 0, void 0, function*() {
                    return yield Ro.pendingTimerCampaigns.getItem(e)
                })
            }
            static setPendingTimerCampaign(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    yield Ro.pendingTimerCampaigns.setItem(e, t)
                })
            }
            static removePendingTimerCampaign(e) {
                return Ve(this, void 0, void 0, function*() {
                    yield Ro.pendingTimerCampaigns.removeItem(e)
                })
            }
            static getPendingTimerKeys() {
                return Ve(this, void 0, void 0, function*() {
                    return yield Ro.pendingTimerCampaigns.keys()
                })
            }
            static getTriggeringPrimaryEvent(e) {
                return Ve(this, void 0, void 0, function*() {
                    return yield Ro.triggeringPrimaryEvents.getItem(e)
                })
            }
            static setTriggeringPrimaryEvent(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    yield Ro.triggeringPrimaryEvents.setItem(e, t)
                })
            }
            static removeTriggeringPrimaryEvent(e) {
                return Ve(this, void 0, void 0, function*() {
                    yield Ro.triggeringPrimaryEvents.removeItem(e)
                })
            }
            static getTriggeringPrimaryEventKeys() {
                return Ve(this, void 0, void 0, function*() {
                    return yield Ro.triggeringPrimaryEvents.keys()
                })
            }
            static removeCampaignFromStores(e) {
                return Ve(this, void 0, void 0, function*() {
                    yield Ko.removePendingSecondaryEventCampaign(e), yield Ko.removePendingTimerCampaign(e)
                })
            }
        }
        class qo {
            static setListener(e) {
                this.listener = e
            }
            static destroy() {
                this.listener = null, this.deliveryStats = null
            }
            static setDeliveryStats(e) {
                this.deliveryStats = e
            }
            static createNewTimers() {
                return Ve(this, void 0, void 0, function*() {
                    const e = `${this.baseLogTag}.createNewTimers`,
                        t = yield Ko.getPendingTimerKeys();
                    for (let n = 0; n < t.length; n++) {
                        const i = t[n],
                            r = yield Ko.getPendingTimerCampaign(i), a = r.timer - (Date.now() - r.startTime);
                        pi.log(1, e, `Creating new setTimeout with time: ${a} ms for the campaign: ${i}`), yield this.createPendingTimerCampaign(i, a)
                    }
                })
            }
            static deletePendingTimer(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = `${this.baseLogTag}.deletePendingTimer`,
                        n = yield Ko.getPendingTimerCampaign(e);
                    (null == n ? void 0 : n.timerId) && (pi.log(1, t, `There was an existing setTimeout associated to the campaign: ${e}. Clearing it`), (0, jn.Kj)(n.timerId))
                })
            }
            static deleteAllPendingTimers() {
                return Ve(this, void 0, void 0, function*() {
                    pi.log(1, `${this.baseLogTag}.deleteAllPendingTimers`, "Clearing all setTimeout's associated to different campaign(s)");
                    const e = yield Ko.getPendingTimerKeys();
                    for (let t = 0; t < e.length; t++) {
                        const n = e[t],
                            i = yield Ko.getPendingTimerCampaign(n);
                        (0, jn.Kj)(i.timerId)
                    }
                })
            }
            static createPendingTimerCampaign(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    yield this.deletePendingTimer(e);
                    const n = (0, jn.pS)(() => Ve(this, void 0, void 0, function*() {
                            yield this.checkAndInvokeListener(e), yield Ko.removeCampaignFromStores(e)
                        }), t),
                        i = {
                            startTime: Date.now(),
                            timerId: n,
                            timer: t
                        };
                    yield Ko.setPendingTimerCampaign(e, i)
                })
            }
            static checkAndInvokeListener(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = `${this.baseLogTag}.checkAndInvokeListener`,
                        n = yield Ho(e);
                    (null == n ? void 0 : n.campaignId) && ((yield this.isSatisfyingEventsArray(e)) ? ao.getURLFilterResult(n) && (pi.log(1, t, `Campaign ${e} satisfies the secondary_condition and the url_condition after timer has elapsed`), this.closeProximityTimerCampaigns.push(n), this.closeProximityCampaignsTimeout || (this.closeProximityCampaignsTimeout = (0, jn.pS)(() => {
                        this.listener(this.closeProximityTimerCampaigns), this.closeProximityTimerCampaigns = [], this.closeProximityCampaignsTimeout = null
                    }, 500))) : (pi.warn(1, t, `Campaign: ${e} does not satisfy secondary_condition after its timer has elapsed. Removing its entry from secondary stores`), this.deliveryStats.setStats(n, Ii.ATTEMPTED.CAMPAIGN_ATTEMPTED), this.deliveryStats.setStats(n, Ii.EVALUATION.CAMPAIGN_EVALUATION_PATH_TIME_EXPIRED), this.deliveryStats.sendDeliveryStats([n])))
                })
            }
            static checkIfPendingAction(e, t) {
                return t === mo.AND && !e.events.some(e => 1 === e.filters.length && !e.filters[0].executed)
            }
            static isSatisfyingEventsArray(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = yield Ko.getPendingSecondaryEventCampaign(e);
                    if (null == t ? void 0 : t.events) {
                        if (!t.events.length) return !0;
                        const e = t.operator;
                        for (let n = 0; n < t.events.length; n++) {
                            const i = t.events[n],
                                r = i.operator;
                            let a = !1,
                                s = !1;
                            for (let e = 0; e < i.filters.length; e++)
                                if (i.filters[e].executed) {
                                    if (this.checkIfPendingAction(t, r)) return !1;
                                    a = !0
                                } else s = !0;
                            if (e === mo.AND && r === mo.OR && a && !s) return !1
                        }
                        return !0
                    }
                    return !1
                })
            }
            static logDeliveryFunnelForExpiredTimerCampaigns() {
                return Ve(this, void 0, void 0, function*() {
                    const e = `${this.baseLogTag}.logDeliveryFunnelForExpiredTimerCampaigns`,
                        t = yield Ko.getPendingTimerKeys(), n = Date.now(), i = [];
                    for (let r = 0; r < t.length; r++) {
                        const a = t[r],
                            s = yield Ko.getPendingTimerCampaign(a);
                        if (n - s.startTime >= s.timer && (yield this.isSatisfyingEventsArray(a))) {
                            const t = yield Ho(a);
                            (null == t ? void 0 : t.campaignId) && (pi.warn(1, e, `Campaign: ${a} contained 'has not executed' event(s) and had satisfied secondary_condition, but the website was closed when the timer elapsed`), i.push(t), yield this.deleteTimerAndRemoveFromStores(a))
                        }
                    }
                    this.sendUserNotOnAppStat(i)
                })
            }
            static sendUserNotOnAppStat(e) {
                var t;
                for (let t = 0; t < e.length; t++) {
                    const n = e[t];
                    this.deliveryStats.setStats(n, Ii.ATTEMPTED.CAMPAIGN_ATTEMPTED), this.deliveryStats.setStats(n, Ii.EVALUATION.CAMPAIGN_EVALUATION_USER_NOT_ON_APP)
                }
                null === (t = this.deliveryStats) || void 0 === t || t.sendDeliveryStats(e)
            }
            static deleteTimerAndRemoveFromStores(e) {
                return Ve(this, void 0, void 0, function*() {
                    yield this.deletePendingTimer(e), yield Ko.removeCampaignFromStores(e)
                })
            }
        }
        qo.baseLogTag = "CampaignTimerManager", qo.listener = null, qo.deliveryStats = null, qo.closeProximityTimerCampaigns = [], qo.closeProximityCampaignsTimeout = null;
        const Yo = qo;
        class zo {
            static setDeliveryStats(e) {
                this.deliveryStats = e
            }
            static destroy() {
                this.deliveryStats = null
            }
            static createPendingSecondaryEvents(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    const n = `${this.baseLogTag}.createPendingSecondaryEvents`;
                    for (let i = 0; i < e.length; i++) {
                        const r = e[i];
                        if ($o(r)) {
                            const {
                                campaignEntry: e,
                                isCampaignTimerSet: i
                            } = this.constructCampaignEntry(r);
                            yield Ko.setTriggeringPrimaryEvent(r.campaignId, t), yield Ko.setPendingSecondaryEventCampaign(r.campaignId, e), i && (pi.log(1, n, `The campaign: ${r.campaignId} has at least one 'has not executed' secondary event. Starting timer for this campaign. Time remaining: ${e.time_left} ms`), yield Yo.createPendingTimerCampaign(r.campaignId, e.time_left))
                        }
                    }
                })
            }
            static constructCampaignEntry(e) {
                const t = e.triggerData.secondary_condition.included_filters,
                    n = {
                        operator: t.filter_operator,
                        events: []
                    };
                let i = !1;
                return t.filters.forEach(e => {
                    if ("nested_filters" === e.filter_type) {
                        const t = {
                            operator: e.filters.filter_operator,
                            filters: []
                        };
                        e.filters.filters.forEach(e => {
                            t.filters.push(e), !1 === e.executed && (i = !0)
                        }), n.events.push(t)
                    } else n.events.push({
                        operator: n.operator === mo.AND ? mo.OR : mo.AND,
                        filters: [e]
                    }), !1 === e.executed && (i = !0)
                }), n.updated_time = Date.now(), n.time_left = 1e3 * e.triggerData.trigger_wait_time.wait_period, {
                    campaignEntry: n,
                    isCampaignTimerSet: i
                }
            }
            static pruneRemovedCampaigns() {
                return Ve(this, void 0, void 0, function*() {
                    const e = `${this.baseLogTag}.pruneRemovedCampaigns`,
                        t = (yield Go()).map(e => e.campaignId),
                        n = yield Ko.getPendingSecondaryEventKeys();
                    for (let i = 0; i < n.length; i++) {
                        const r = n[i];
                        t.includes(r) || (pi.warn(1, e, `The campaign: ${r} is not present in the latest meta call. Removing its entry from secondary stores and removing any pending timer`), yield Yo.deleteTimerAndRemoveFromStores(r))
                    }
                })
            }
            static updateCampaignTimeInSecondaryEventsStore() {
                return Ve(this, void 0, void 0, function*() {
                    const e = `${this.baseLogTag}.updateCampaignTimeInSecondaryEventsStore`,
                        t = yield Ko.getPendingSecondaryEventKeys(), n = [];
                    for (let i = 0; i < t.length; i++) {
                        const r = t[i],
                            a = yield Ko.getPendingSecondaryEventCampaign(r), s = Date.now();
                        if (a.time_left -= s - a.updated_time, a.updated_time = s, a.time_left <= 0) {
                            const t = yield Ho(r);
                            (null == t ? void 0 : t.campaignId) && (pi.warn(1, e, `Campaign: ${r} does not have time left to render. Removing its entry from secondary stores and clearing any setTimeout associated to it`), n.push(t)), yield Yo.deleteTimerAndRemoveFromStores(r)
                        } else yield Ko.setPendingSecondaryEventCampaign(r, a)
                    }
                    this.sendPathTimeExpiredStat(n)
                })
            }
            static updatePendingSecondaryEventsHistory(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    const n = `${this.baseLogTag}.updatePendingSecondaryEventsHistory`,
                        i = [],
                        r = [],
                        a = [],
                        s = Date.now();
                    for (let o = 0; o < t.length; o++) {
                        const l = t[o],
                            d = yield Ko.getPendingSecondaryEventCampaign(l);
                        if (d) {
                            if (d.time_left -= s - d.updated_time, d.updated_time = s, d.time_left <= 0) {
                                const t = yield Ho(l);
                                (null == t ? void 0 : t.campaignId) && (pi.warn(1, n, `Campaign ${l} which is associated to the event: ${e.name} does not have time left to render. Removing its entry from secondary stores and clearing any setTimeout associated to it`), a.push(t)), r.push(l);
                                continue
                            }
                            const t = d.operator;
                            for (let a = 0; a < d.events.length; a++) {
                                const s = d.events[a],
                                    o = s.operator;
                                for (let a = 0; a < s.filters.length; a++) {
                                    const c = s.filters[a],
                                        u = c.attributes,
                                        g = c.executed;
                                    e.name === c.action_name && (u && ao.isTriggered(e, u.filters, null, u.filterOperator) || !e.attributes || !e.attributes.length) && (g ? o === mo.OR ? (s.toBeRemoved = !0, t !== mo.OR && (t !== mo.AND || d.events.length && !d.events.every(e => e.toBeRemoved)) || (pi.log(1, n, ft(l, e.name)), i.push(l))) : o === mo.AND && (c.toBeRemoved = !0, s.filters.every(e => e.toBeRemoved) && (s.toBeRemoved = !0, (t === mo.OR || t === mo.AND && d.events.every(e => e.toBeRemoved)) && (pi.log(1, n, ft(l, e.name)), i.push(l)))) : o === mo.OR ? (c.toBeRemoved = !0, s.filters.every(e => e.toBeRemoved) && (t === mo.AND || t === mo.OR && 1 === d.events.length ? (pi.warn(1, n, Et(e.name, l)), r.push(l)) : s.toBeRemoved = !0)) : o === mo.AND && (s.toBeRemoved = !0, 1 === d.events.length && d.events[0].toBeRemoved && t === mo.OR && (pi.warn(1, n, Et(e.name, l)), r.push(l))))
                                }
                            }
                            r.includes(l) || i.includes(l) || (yield this.updatePendingSecondaryEvents(l, d))
                        }
                    }
                    return this.sendPathTimeExpiredStat(a), yield this.clearCampaignsData(r), yield this.clearCampaignsData(i), i
                })
            }
            static sendPathTimeExpiredStat(e) {
                if (this.deliveryStats && e.length) {
                    for (let t = 0; t < e.length; t++) {
                        const n = e[t];
                        this.deliveryStats.setStats(n, Ii.ATTEMPTED.CAMPAIGN_ATTEMPTED), this.deliveryStats.setStats(n, Ii.EVALUATION.CAMPAIGN_EVALUATION_PATH_TIME_EXPIRED)
                    }
                    this.deliveryStats.sendDeliveryStats(e)
                }
            }
            static updatePendingSecondaryEvents(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    t.events = t.events.filter(e => !e.toBeRemoved);
                    for (let e = 0; e < t.events.length; e++) {
                        const n = t.events[e];
                        n.filters = n.filters.filter(e => !e.toBeRemoved)
                    }
                    yield Ko.setPendingSecondaryEventCampaign(e, t)
                })
            }
            static clearCampaignsData(e) {
                return Ve(this, void 0, void 0, function*() {
                    for (let t = 0; t < e.length; t++) yield Yo.deleteTimerAndRemoveFromStores(e[t])
                })
            }
            static removeStaleTriggeringPrimaryEventCampaigns() {
                return Ve(this, void 0, void 0, function*() {
                    const e = `${this.baseLogTag}.removeStaleTriggeringPrimaryEventCampaigns`,
                        t = yield Ko.getTriggeringPrimaryEventKeys(), n = yield Ko.getPendingSecondaryEventKeys();
                    t.forEach(t => Ve(this, void 0, void 0, function*() {
                        n.includes(t) || (pi.warn(1, e, `Campaign: ${t} does not exist in pendingSecondaryEvents store but exists in triggeringPrimaryEvents store. Removing it from triggeringPrimaryEvents store`), yield Ko.removeTriggeringPrimaryEvent(t))
                    }))
                })
            }
        }
        zo.baseLogTag = "SecondaryEventsManager", zo.deliveryStats = null;
        const Jo = zo;
        class Qo {
            constructor(e) {
                this.primaryEventsHash = {}, this.secondaryEventsHash = {}, this.messagingCampaigns = [], this.scrollCampaigns = [], this.scrollCampaignTriggered = !1, this.exitIntentCampaigns = [], this.exitCampaignTriggered = !1, this.listener = null, this.historyManager = window[se], this.onEvent = e => Ve(this, void 0, void 0, function*() {
                    const t = Qo.baseLogTag + ".onEvent";
                    try {
                        null != this.primaryEventsHash[e.name] && (yield this.handlePrimaryEvent(e)), null != this.secondaryEventsHash[e.name] && (yield this.handleSecondaryEvent(e))
                    } catch (e) {
                        pi.errorAndBroadcast(1, t, ee, "Could not trigger OSM campaign", `Error occurred in triggering event-triggered campaign: ${"string"==typeof e?e:JSON.stringify(e)}`, void 0, e)
                    }
                }), this.onScroll = e => Ve(this, void 0, void 0, function*() {
                    const t = Qo.baseLogTag + ".onScroll";
                    try {
                        if (this.scrollCampaigns && this.scrollCampaigns.length > 0 && !this.scrollCampaignTriggered) {
                            const n = yield this.getCampaignsFromHash(Q.MOE_PAGE_SCROLL), i = yield Fo(n);
                            null == i || i.map(n => Ve(this, void 0, void 0, function*() {
                                var i, r, a, s, o;
                                const l = null === (o = null === (s = null === (a = null === (r = null === (i = null == n ? void 0 : n.triggerData) || void 0 === i ? void 0 : i.primary_condition) || void 0 === r ? void 0 : r.included_filters) || void 0 === a ? void 0 : a.filters[0]) || void 0 === s ? void 0 : s.attributes) || void 0 === o ? void 0 : o.filters[0];
                                if (l) {
                                    const i = new ea(l.name, l.value),
                                        r = yield za.createEvent(Q.MOE_PAGE_SCROLL, [i]);
                                    ao.getFilterResult(r, n) && e > l.value && !this.scrollCampaignTriggered && (this.scrollCampaignTriggered = !0, window.removeEventListener("scroll", this.scrollListenerCallback), pi.log(1, t, "Triggered Scroll campaign"), this.trigger([n], r))
                                }
                            }))
                        }
                    } catch (e) {
                        pi.errorAndBroadcast(1, t, ee, "Could not trigger scroll campaign", `Error occurred in triggering scroll campaign: ${"string"==typeof e?e:JSON.stringify(e)}`, void 0, e)
                    }
                }), this.onExit = e => Ve(this, void 0, void 0, function*() {
                    const t = Qo.baseLogTag + ".onExit";
                    try {
                        if (this.exitIntentCampaigns.length > 0 && !this.exitCampaignTriggered) {
                            const n = yield za.createEvent(Q.MOE_EXIT, []), i = (yield this.getCampaignsFromHash(Q.MOE_PAGE_EXIT)).filter(e => ao.getFilterResult(n, e));
                            i.length ? (pi.log(1, t, `Triggered Exit Intent campaign(s): ${i.length} (${i.map(e=>e.campaignId).join(", ")})`), this.trigger(i, n)) : ("onBackClick" === e && window.history.back(), pi.log(1, t, "No Exit Intent campaign is eligible."))
                        }
                    } catch (e) {
                        pi.errorAndBroadcast(1, t, ee, "Could not trigger exit intent campaign", `Error occurred in triggering exit intent campaign: ${"string"==typeof e?e:JSON.stringify(e)}`, void 0, e)
                    }
                }), this.messagingCampaigns = e, this.windowEventManager = new jo
            }
            onTrigger(e) {
                this.listener = e
            }
            handlePrimaryEvent(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = `${Qo.baseLogTag}.handlePrimaryEvent`,
                        n = this.primaryEventsHash[e.name],
                        i = [],
                        r = [];
                    for (let e = 0; e < n.length; e++) {
                        const t = n[e],
                            a = yield Ho(t);
                        $o(a) ? i.push(a) : Me(a, "triggerData.primary_condition.included_filters.filter_operator") === mo.OR && r.push(a)
                    }
                    const a = i.filter(t => ao.didPrimaryEventFilterTrigger(e, t));
                    a.length && (yield Jo.createPendingSecondaryEvents(a, e));
                    const s = r.filter(t => ao.getFilterResult(e, t));
                    s.length && (pi.log(1, t, `Campaigns triggered for event ${e.name}: ${s.length}`), this.trigger(s, e))
                })
            }
            handleSecondaryEvent(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = `${Qo.baseLogTag}.handleSecondaryEvent`,
                        n = yield Jo.updatePendingSecondaryEventsHistory(e, this.secondaryEventsHash[e.name]);
                    let i = [];
                    for (let e = 0; e < n.length; e++) i.push(yield Ho(n[e]));
                    i = i.filter(e => ao.getURLFilterResult(e)), i.length && (pi.log(1, t, `Campaigns triggered by secondary event "${e.name}": ${i.length}`), this.trigger(i))
                })
            }
            getCampaignsFromHash(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = [],
                        n = this.primaryEventsHash[e];
                    if (null == n ? void 0 : n.length)
                        for (let e = 0; e < n.length; e++) t.push(yield Ho(n[e]));
                    return t
                })
            }
            addEntryInEventsHash(e, t, n) {
                null == e[t] && (e[t] = []), e[t].push(n)
            }
            createPrimaryEventsHash(e) {
                const t = Me(e, "triggerData.primary_condition.included_filters.filters", []);
                t && t.forEach(t => {
                    this.addEntryInEventsHash(this.primaryEventsHash, t.action_name, e.campaignId)
                })
            }
            createSecondaryEventsHash(e) {
                const t = Me(e, "triggerData.secondary_condition.included_filters.filters", []);
                null == t || t.forEach(t => {
                    "nested_filters" === t.filter_type ? t.filters.filters.forEach(t => {
                        this.addEntryInEventsHash(this.secondaryEventsHash, t.action_name, e.campaignId)
                    }) : this.addEntryInEventsHash(this.secondaryEventsHash, t.action_name, e.campaignId)
                })
            }
            startWatching() {
                return Ve(this, void 0, void 0, function*() {
                    this.messagingCampaigns.forEach(e => {
                        this.createPrimaryEventsHash(e), this.createSecondaryEventsHash(e)
                    }), this.historyManager && (this.historyManager.getHistory().forEach(this.onEvent), this.historyManager.addEventListener(this.onEvent)), this.scrollCampaignTriggered = !1, this.scrollCampaigns = this.messagingCampaigns.filter(e => Vo(e, Q.MOE_PAGE_SCROLL)), this.scrollCampaigns.length > 0 && (this.scrollListenerCallback = this.windowEventManager.onScroll(this.onScroll)), this.exitCampaignTriggered = !1, this.exitIntentCampaigns = this.messagingCampaigns.filter(e => Vo(e, Q.MOE_PAGE_EXIT)), this.exitIntentCampaigns.length > 0 && this.windowEventManager.onExit(this.onExit)
                })
            }
            setScrollListenerCallback(e) {
                this.scrollListenerCallback = e
            }
            getScrollListenerCallback() {
                return this.scrollListenerCallback
            }
            getWindowEventManager() {
                return this.windowEventManager
            }
            trigger(e, t) {
                null != this.listener && this.listener(e, t)
            }
            destroy() {
                this.listener = null
            }
        }
        Qo.baseLogTag = "OnsiteTriggerManager";
        const Xo = Qo;

        function Zo(e, t) {
            return Object.assign(Object.assign({
                campaign_id: e.campaignId,
                campaign_name: e.campaignName
            }, t || {}), e.campaignContext)
        }
        const el = () => {
                const e = window.moengage_object || "Moengage";
                return window[e]
            },
            tl = (e, t, n) => null == e.campaignId ? () => {} : () => {
                Ro.campaingsStatsStore.getItem(e.campaignId).then(t => {
                    const n = e.expiryTime,
                        i = Object.assign(t ? Object.assign(Object.assign({}, t), {
                            clicks: Me(t, "clicks", 0) + 1
                        }) : {
                            clicks: 1
                        }, n ? {
                            expiryTime: n
                        } : {});
                    Ro.campaingsStatsStore.setItem(e.campaignId, i)
                });
                const i = n || {},
                    r = Ti[t];
                return el().trackEvent(r.CLICK, Object.assign({}, Zo(e, Object.assign({
                    type: r.TYPE,
                    templateType: e.templateType
                }, i))))
            },
            nl = (e, t, n = !1, i) => null == e.campaignId ? () => {} : (function(e) {
                const t = window[Ai];
                e.templateType !== So.SELF_HANDLED && (Vo(e, Q.MOE_PAGE_EXIT) || Vo(e, Q.MOE_PAGE_SCROLL)) && (null == t ? void 0 : t.onScrollOrExitIntentCampaigns) && (t.onScrollOrExitIntentCampaigns[e.campaignId] = !0)
            }(e), () => {
                if (il(e.campaignId, e.expiryTime), function(e, t) {
                        var n;
                        const i = "helpers.trackFrequencyCappingImpression";
                        if (!(null == ko ? void 0 : ko.getSettings)) return;
                        if (t) {
                            const t = null === (n = e.delivery) || void 0 === n ? void 0 : n.fcMeta;
                            if (t && Me(t, "ignoreFcCount", !1)) return void pi.log(2, i, `Skipping frequency capping tracking for campaign ${e.campaignId} as ignoreFcCount flag is set`)
                        }
                        const r = ko.getSettings();
                        r && "function" == typeof r.then && r.then(n => {
                            if (!n) return void pi.log(2, i, "Frequency capping not enabled, skipping update for campaign impression");
                            const r = No.getEventTypeFromCampaign(e);
                            return ko.validateAndUpdateFrequencyData({
                                campaignId: e.campaignId,
                                tags: e.tags || [],
                                delivery: e.delivery
                            }, r, t, !0).then(t => {
                                var n;
                                pi.log(2, i, `Frequency data tracked for campaign ${e.campaignId}. Validation: ${t.isValid?"passed":`failed (${null===(n=t.failedRules)||void 0===n?void 0:n.join(", ")})`}`)
                            }).catch(t => {
                                pi.error(2, i, `Failed to track frequency capping data for campaign ${e.campaignId}:`, t)
                            })
                        }).catch(t => {
                            pi.error(2, i, `Failed to get frequency capping settings for campaign ${e.campaignId}:`, t)
                        })
                    }(e, i), n) return;
                const r = Ti[t];
                return el().trackEvent(r.IMPRESSION, Object.assign({}, Zo(e, {
                    type: r.TYPE,
                    templateType: e.templateType
                })))
            }),
            il = (e, t) => {
                Ro.initialize().then(() => {
                    Ro.campaingsStatsStore.getItem(e).then(n => {
                        const i = t || (null == n ? void 0 : n.expiryTime),
                            r = Object.assign(n ? Object.assign(Object.assign({}, n), {
                                impressions: Me(n, "impressions", 0) + 1,
                                lastImpression: new Date
                            }) : {
                                impressions: 1,
                                lastImpression: new Date
                            }, i ? {
                                expiryTime: i
                            } : {});
                        Ro.campaingsStatsStore.setItem(e, r)
                    })
                })
            },
            rl = (e, t, n) => {
                const i = Ti[t],
                    r = n && "AUTO_DISMIS" in i ? i.AUTO_DISMIS : i.DISMISS;
                el().trackEvent(r, Object.assign({}, Zo(e, {
                    type: i.TYPE,
                    templateType: e.templateType
                })))
            },
            al = (e, t) => {
                const n = Ti[t];
                el().trackEvent(n.DELIVERED, Object.assign({}, Zo(e, {
                    type: n.TYPE,
                    templateType: e.templateType
                })))
            },
            sl = e => {
                var t, n;
                (null === (n = null === (t = e.primaryEventsHash) || void 0 === t ? void 0 : t.MOE_PAGE_SCROLL) || void 0 === n ? void 0 : n.length) && window.removeEventListener("scroll", e.getScrollListenerCallback())
            },
            ol = e => {
                e && Object.keys(e.campaignRenderMap).forEach(t => {
                    var n;
                    document.getElementById(`moe-onsite-campaign-${t}`) && document.getElementById(`moe-onsite-campaign-${t}`).remove(), e.campaignRenderMap[t].isActive() && e.dismissInapp(t, !1), (0, jn.Kj)(null === (n = e.campaignRenderMap[t]) || void 0 === n ? void 0 : n.delayTimer), delete e.campaignRenderMap[t], e.campaignRenderOrder = e.campaignRenderOrder.filter(e => e !== t)
                })
            },
            ll = e => {
                (0, jn.pS)(() => {
                    e && (He() ? e.windowEventManager.isPopStateEventBound && (e.windowEventManager.setHistoryState(), e.windowEventManager.isExitIntentShown = !1, e.windowEventManager.scrollExitIntentInterval = null) : document.removeEventListener("mouseout", e.windowEventManager.exitIntentListener))
                }, 0)
            },
            dl = e => `moe-onsite-campaign-${e}`;
        class cl {
            constructor(e, t) {
                this.waitForDelay = null, this.delayTimer = null, this.iframe = null, this.onFrameLoad = new lr, this.active = !1, this.dismissInterval = null, this.isJSONPayloadApproach = !1, this.osmDivRendering = null, this.osmDivSelector = null, this.campaignRendered = !1, this.triggerDelayMs = 0, this.isActive = () => this.active, this.campaignMeta = e, this.data = t, this.active = !1, this.campaignRendered = !1;
                const n = Me(e, "triggerData.trigger_delay.delayInSeconds", 0) || 0;
                this.triggerDelayMs = 1e3 * n, this.waitForDelay = new jn.VR(e => {
                    this.delayTimer = (0, jn.pS)(() => {
                        this.campaignRendered = !0, e()
                    }, 1e3 * n)
                })
            }
            setIsActive(e) {
                this.active = e
            }
        }

        function ul(e) {
            return `moe-onsite-campaign-${e}`
        }

        function gl() {
            const e = We();
            if (e) return e.accessibilityFocusTrap || (e.accessibilityFocusTrap = {
                lastActiveElement: [],
                dismissOsmEventHandlers: {},
                keyboardTrapHandler: null,
                focusTrapStack: [],
                focusedElements: []
            }), e.accessibilityFocusTrap
        }

        function pl(e) {
            const t = gl();
            t && (t.keyboardTrapHandler = e)
        }

        function ml(e, t) {
            "Escape" === t.key && (window.MoeOsm.trackDismiss(e), window.MoeOsm.dismissMessage(e))
        }

        function hl(e) {
            const t = gl();
            if (!t) return;
            t.dismissOsmEventHandlers[e] && vl(e);
            const n = ml.bind(null, e);
            t.dismissOsmEventHandlers[e] = n, window.addEventListener("keyup", n);
            const i = ul(e),
                r = document.getElementById(i);
            r && "IFRAME" === r.tagName && r.contentWindow && r.contentWindow.addEventListener("keyup", n)
        }

        function vl(e) {
            const t = gl();
            if (!t) return;
            const n = t.dismissOsmEventHandlers[e];
            if (n) {
                window.removeEventListener("keyup", n);
                const i = ul(e),
                    r = document.getElementById(i);
                r && "IFRAME" === r.tagName && r.contentWindow && r.contentWindow.removeEventListener("keyup", n), delete t.dismissOsmEventHandlers[e]
            }
        }

        function fl() {
            var e, t;
            const n = gl();
            if (!n) return;
            const i = n.lastActiveElement.pop();
            (null == i ? void 0 : i.id) === le ? null === (t = null === (e = i.contentDocument) || void 0 === e ? void 0 : e.getElementById(de)) || void 0 === t || t.focus({
                preventScroll: !0
            }) : i && "function" == typeof i.focus ? i.focus({
                preventScroll: !0
            }) : document.body.focus({
                preventScroll: !0
            })
        }

        function El(e, t, n = !1) {
            const i = ul(e),
                r = document.getElementById(i);
            r && (hl(e), function(e) {
                if (e) {
                    const t = e.querySelector(".brz-popup2__preview");
                    let n = "A pop-up has appeared on screen",
                        i = "dialog";
                    t && (t.hasAttribute("aria-label") && (n = t.getAttribute("aria-label"), t.removeAttribute("aria-label")), t.hasAttribute("role") && (i = t.getAttribute("role"))), e.setAttribute("tabindex", "0"), e.setAttribute("aria-label", n), e.setAttribute("role", i), e.setAttribute("aria-modal", "true")
                }
            }(r), "POP_UP" === t ? function(e, t = document, n = !1) {
                const i = gl();
                if (!i) return;
                const r = yl(e) || e;
                if (!r) return;
                ! function(e) {
                    const t = gl();
                    if (!t) return;
                    if (!e || !e.parentElement) return;
                    const n = t.focusTrapStack.indexOf(e); - 1 !== n && t.focusTrapStack.splice(n, 1), t.focusTrapStack.push(e), bl()
                }(e);
                const a = r.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
                if (0 === (null == a ? void 0 : a.length)) return void(r.hasAttribute("tabindex") && "-1" !== r.getAttribute("tabindex") && r.focus({
                    preventScroll: !0
                }));
                const s = a[0],
                    o = a[a.length - 1];
                Sl(r, !0, n);
                let l = null;
                const d = n => {
                    if ("Tab" !== n.key) return;
                    let i = !1,
                        r = t.activeElement;
                    if ("IFRAME" === e.tagName) {
                        const t = e.contentDocument;
                        t && t.activeElement && (r = t.activeElement, i = r === t.body || t.body.contains(r))
                    } else i = r === e || e.contains(r);
                    return i ? (r && "moe-focus-trap-end" !== r.id && (l = r), r && "moe-focus-trap-end" === r.id ? (n.preventDefault(), void(n.shiftKey ? (l || o).focus({
                        preventScroll: !0
                    }) : s.focus({
                        preventScroll: !0
                    }))) : void(n.shiftKey && r === s ? (n.preventDefault(), o.focus({
                        preventScroll: !0
                    })) : n.shiftKey || r !== o || (n.preventDefault(), s.focus({
                        preventScroll: !0
                    })))) : (n.preventDefault(), void e.focus({
                        preventScroll: !0
                    }))
                };
                i.keyboardTrapHandler && t.removeEventListener("keydown", i.keyboardTrapHandler), i.keyboardTrapHandler = d, pl(d), t.addEventListener("keydown", i.keyboardTrapHandler)
            }(r, document, n) : Sl(r, !1, n))
        }

        function Sl(e, t = !1, n = !0) {
            if (!e) return;
            const i = gl();
            if (!i) return;
            if (n && function(e) {
                    const t = gl(),
                        n = parseInt(window.getComputedStyle(e).zIndex, 10) || 0;
                    t.focusedElements = t.focusedElements.filter(e => document.body.contains(e)), t.focusedElements.forEach(e => {
                        const t = parseInt(window.getComputedStyle(e).zIndex, 10) || 0;
                        t >= n && (e.style.zIndex = (t - 1).toString())
                    }), t.focusedElements.push(e)
                }(e), i.focusTrapStack.length > 0 && !t) return void i.lastActiveElement.push(e);
            const r = e.id === le,
                a = yl(e) || e,
                s = i.focusTrapStack;
            if (!s || 0 === s.length || t)
                if (document.activeElement && document.activeElement instanceof HTMLElement && i.lastActiveElement.push(document.activeElement), r) {
                    const t = e.contentDocument,
                        n = null == t ? void 0 : t.getElementById(de);
                    n && n.focus({
                        preventScroll: !0
                    })
                } else a && (a.setAttribute("tabindex", "0"), a.focus({
                    preventScroll: !0
                }));
            else a && i.lastActiveElement.push(e)
        }

        function yl(e) {
            if (!e) return;
            let t = e;
            if ("IFRAME" === e.tagName) {
                const n = e.contentDocument;
                t = (null == n ? void 0 : n.body) ? n.body : (null == n ? void 0 : n.activeElement) ? n.activeElement : e
            }
            return t
        }

        function _l(e, t = document) {
            const n = gl();
            if (n && (function(e) {
                    const t = gl();
                    if (t) {
                        if (e) {
                            const n = t.focusTrapStack.indexOf(e); - 1 !== n && t.focusTrapStack.splice(n, 1)
                        } else t.focusTrapStack.length = 0;
                        bl()
                    }
                }(e), n.keyboardTrapHandler && (t.removeEventListener("keydown", n.keyboardTrapHandler), n.keyboardTrapHandler = null, pl(null)), n.focusTrapStack.length > 0)) {
                const e = n.focusTrapStack[n.focusTrapStack.length - 1];
                e && "function" == typeof e.focus && (0, jn.pS)(() => {
                    e.focus({
                        preventScroll: !0
                    })
                })
            }
        }

        function bl() {
            const e = gl();
            if (!e) return;
            document.querySelectorAll("[data-moe-prev-aria-hidden]").forEach(e => {
                if (e instanceof HTMLElement) {
                    const t = e.getAttribute("data-moe-prev-aria-hidden");
                    "false" === t ? e.removeAttribute("aria-hidden") : "true" === t ? e.setAttribute("aria-hidden", "true") : "null" === t && e.removeAttribute("aria-hidden"), e.removeAttribute("data-moe-prev-aria-hidden")
                }
            }), document.querySelectorAll("[data-moe-prev-tabindex]").forEach(e => {
                if (e instanceof HTMLElement) {
                    const t = e.getAttribute("data-moe-prev-tabindex");
                    "" === t ? e.removeAttribute("tabindex") : e.setAttribute("tabindex", t), e.removeAttribute("data-moe-prev-tabindex")
                }
            });
            const t = e.focusTrapStack[e.focusTrapStack.length - 1];
            if (document.querySelectorAll('[role="dialog"][aria-modal="true"]').forEach(e => {
                    e instanceof HTMLElement && e !== t && (e.removeAttribute("role"), e.removeAttribute("aria-modal"))
                }), 0 === e.focusTrapStack.length) return;
            const n = [],
                i = ["a[href]", "button", "input", "select", "textarea", "[tabindex]", '[contenteditable="true"]'].join(","),
                r = t.parentElement;
            if (r) {
                for (const e of Array.from(r.children)) e !== t && e instanceof HTMLElement && (e.hasAttribute("data-moe-prev-aria-hidden") || (e.hasAttribute("aria-hidden") ? e.setAttribute("data-moe-prev-aria-hidden", e.getAttribute("aria-hidden")) : e.setAttribute("data-moe-prev-aria-hidden", "null")), e.setAttribute("aria-hidden", "true"), n.push(e), e.querySelectorAll(i).forEach(e => {
                    e.hasAttribute("data-moe-prev-tabindex") || (e.hasAttribute("tabindex") ? e.setAttribute("data-moe-prev-tabindex", e.getAttribute("tabindex")) : e.setAttribute("data-moe-prev-tabindex", "")), e.setAttribute("tabindex", "-1")
                }));
                t._ariaHiddenSiblings = n
            }
        }

        function Tl(e, t = "") {
            var n;
            const i = t || (null === (n = Dt.get()) || void 0 === n ? void 0 : n.contentSecurityNonce);
            if ("string" == typeof i && i.length) try {
                e.setAttribute("nonce", i)
            } catch (e) {
                pi.error(2, "Nonce.addNonceToElement", "Error adding nonce to element: ", e)
            }
        }
        var Il = n(634).VR;

        function Al(e, t, n, i) {
            return Ve(this, void 0, void 0, function*() {
                const r = t.campaignId,
                    a = dl(r),
                    s = /moe-campaign-id/g;

                function o({
                    doc: e,
                    node: t
                }) {
                    return new jn.VR((n, i) => {
                        const s = e.createElement("script");
                        for (let e = 0; e < t.attributes.length; e++) {
                            const {
                                name: n
                            } = t.attributes[e];
                            let {
                                value: i
                            } = t.attributes[e];
                            "src" === n && (i.includes("typeform") || i.includes("tv-button") || i.includes("index.view")) && (i += `?campaignId=${r}`), s.setAttribute(n, i)
                        }
                        Tl(s), s.src ? (s.addEventListener("load", () => n()), s.addEventListener("error", () => i())) : (s.innerHTML = t.innerHTML, n()), e.querySelector(`#${a}`).appendChild(s)
                    })
                }
                yield(() => Ve(this, void 0, void 0, function*() {
                    var l;
                    try {
                        const d = null === (l = t.onsitePayload) || void 0 === l ? void 0 : l.htmlJsonPayload;
                        if (!d) return void pi.error(2, "InsertCustomHtmlJs", "htmlJsonPayload is missing in campaign.onsitePayload");
                        let {
                            root: c
                        } = d;
                        const {
                            styles: u,
                            scripts: g
                        } = d, p = document.createElement("div");
                        p.id = a, e.parentNode.insertBefore(p, e);
                        const m = document.querySelector(`#${a}`),
                            h = new DOMParser;
                        c = c.replace(s, r);
                        const v = h.parseFromString(c, "text/html");
                        yield function(e) {
                                return Ve(this, void 0, void 0, function*() {
                                    try {
                                        const t = e.getElementsByTagName("a");
                                        for (let e = t.length - 1; e >= 0; e--) "" === t[e].getAttribute("href") && t[e].removeAttribute("href")
                                    } catch (e) {
                                        pi.error(2, "InsertCustomHtmlJs.removeEmptyHrefTags", "Error while removing Empty href attributes", e)
                                    }
                                })
                            }(v),
                            function(e) {
                                try {
                                    ["trackEvent", "trackClick", "trackDismiss", "dismissMessage", "leadGenFormSubmit", "fetchRatingValue"].forEach(t => {
                                        ! function(e, t) {
                                            e.querySelectorAll("[onclick]").forEach(e => {
                                                const n = e.getAttribute("onclick").replace(new RegExp(t + "\\((.*?)\\)", "g"), (e, n) => n ? `${t}('${r}',${n})` : `${t}('${r}')`);
                                                e.setAttribute("onclick", n)
                                            })
                                        }(e, t)
                                    })
                                } catch (e) {
                                    pi.error(2, "InsertCustomHtmlJs.addCampaignId", "Error while adding Campaign Id", e)
                                }
                            }(v);
                        const f = function(e, t, n, i = "") {
                                var r;
                                if (!i && !(null === (r = Dt.get()) || void 0 === r ? void 0 : r.contentSecurityNonce)) return "";
                                const a = ["onclick", "ondblclick", "onmousedown", "onmouseup", "onmouseover", "onmouseout", "onmousemove", "onmouseenter", "onmouseleave", "oncontextmenu", "onkeydown", "onkeyup", "onkeypress", "onchange", "oninput", "onsubmit", "onfocus", "onblur", "onselect", "onreset", "onload", "onunload", "onbeforeunload", "onresize", "onscroll", "onerror", "onabort", "ondrag", "ondragstart", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondrop", "onwheel", "ontouchstart", "ontouchend", "ontouchmove", "ontouchcancel", "onanimationstart", "onanimationend", "onanimationiteration", "ontransitionend"];
                                let s = "",
                                    o = 0;
                                return (e instanceof Document ? e.querySelectorAll("*") : [e, ...e.querySelectorAll("*")]).forEach(e => {
                                    const i = [];
                                    if (a.forEach(t => {
                                            const n = e.getAttribute(t);
                                            if (n) {
                                                const r = t.substring(2);
                                                i.push({
                                                    event: r,
                                                    code: n
                                                }), e.removeAttribute(t)
                                            }
                                        }), i.length > 0) {
                                        const r = `moe-handler-${n}-${t}-${o++}`;
                                        e.setAttribute("data-moe-handler-id", r), s += `\n        (function() {\n          var el = document.querySelector('[data-moe-handler-id="${r}"]');\n          if (el) {\n      `, i.forEach(({
                                            event: e,
                                            code: t
                                        }) => {
                                            s += `\n            (function() {\n              el.addEventListener(${JSON.stringify(e)}, function(event) {\n                try {\n                  ${t}\n                } catch(e) {\n                  console.error('Error in ${JSON.stringify(e)} handler:', e);\n                }\n              });\n            })();\n        `
                                        }), s += "\n          }\n        })();\n      "
                                    }
                                }), s
                            }(v, r, "OSM"),
                            E = u.map(e => h.parseFromString(e, "text/html").head.childNodes[0]),
                            S = g.map(e => (e = e.replace(s, r), h.parseFromString(e, "text/html").head.childNodes[0]));
                        if (f.trim()) {
                            const T = document.createElement("script");
                            T.textContent = f, Tl(T), S.push(T), pi.log(1, "InsertCustomHtmlJs", "Added nonce-protected event handler script for CSP compliance")
                        }
                        const y = E.map(e => new jn.VR((t, n) => {
                            ! function({
                                doc: e,
                                node: t,
                                onLoad: n,
                                onError: i
                            }) {
                                t instanceof HTMLMetaElement || "dns-prefetch" === t.getAttribute("rel") ? n() : (t instanceof HTMLLinkElement && t.setAttribute("rel", "stylesheet"), t.addEventListener("load", () => n()), t.addEventListener("error", () => i())), e.querySelector(`#${a}`).appendChild(t)
                            }({
                                node: e,
                                doc: document,
                                onLoad: t,
                                onError: n
                            })
                        }));
                        yield Il.all(y).catch(e => {
                            pi.warn(1, "InsertCustomHtmlJs", "Error loading Styles", (null == e ? void 0 : e.message) || "")
                        });
                        const _ = v.body.childNodes[0];

                        function b(e) {
                            return Ve(this, void 0, void 0, function*() {
                                for (const t of e) yield o({
                                    node: t,
                                    doc: document
                                })
                            })
                        }
                        m.appendChild(_), [..._.querySelectorAll(".brz-embed-code script")].map(e => {
                            ! function({
                                doc: e,
                                node: t
                            }) {
                                const n = e.createElement("script");
                                n.innerHTML = t.innerHTML;
                                for (let e = 0; e < t.attributes.length; e++) {
                                    const {
                                        name: i,
                                        value: r
                                    } = t.attributes[e];
                                    n.setAttribute(i, r)
                                }
                                Tl(n), t.replaceWith(n)
                            }({
                                node: e,
                                doc: document
                            })
                        }), b(S).then(() => {
                            var e, s;
                            3 !== (null === (s = null === (e = t.onsitePayload) || void 0 === e ? void 0 : e.campaignMeta) || void 0 === s ? void 0 : s.brizyTemplateVersion) && window.Brz.emit("init.dom", window.jQuery(_)), pi.log(1, "InsertCustomHtmlJs", `Custom HTML/JS DOM Level OSM Insertion: ${a}`),
                                function(e, t) {
                                    e && (hl(e), window.Brz.on("elements.popup.open", El.bind(null, e, t)))
                                }(r, t.templateType), n && n(t, "OSM", !1, i)()
                        }).catch(e => {
                            pi.warn(1, "InsertCustomHtmlJs", "Error loading script", (null == e ? void 0 : e.message) || "")
                        })
                    } catch (I) {
                        pi.errorAndBroadcast(2, "InsertCustomHtmlJs", ee, "Could not insert OSM into DOM", `Failed to Insert OSM into DOM: ${a}`)
                    }
                }))()
            })
        }
        const wl = /moe-campaign-id/g;
        var Ol = n(634).VR;
        const Dl = "OsmFunctions",
            Rl = e => {
                const t = `${Dl}.getCampaignMeta`;
                try {
                    return !Cl() && window.Moengage.onsite.displayManager.campaignRenderMap[e].campaignMeta
                } catch (n) {
                    pi.error(1, t, `Campaign meta not found: ${e}`)
                }
            },
            Cl = () => {
                const e = `${Dl}.isTestCampaign`;
                return !!window.Moengage.onsite.displayManager.testCampaign && (pi.log(1, e, "Test campaign element. No data will be sent to BE right now. We'll start tracking events once the campaign is live"), !0)
            },
            Ll = "iframeTrackingHandlers";

        function Pl(e, t, n) {
            const i = `${Ll}.handleBridgeInsertion`;
            try {
                e.head.append(((e, t) => {
                    const n = document.createElement("script");
                    return n.type = "text/javascript", n.text = ((e, t) => `\n    const moeSDK = window.parent.Moengage;\n    let moeOsmCampaignMeta = ${JSON.stringify(e)};\n    const moengage = {\n        trackEvent: function (eventName, eventAttr, isNonInteractive) {\n          if(moeOsmCampaignMeta) {\n            return moeSDK.trackEvent(eventName, eventAttr);\n          }\n          return Promise.resolve();\n        },\n        trackClick: function (id) {\n          if(moeOsmCampaignMeta) {\n            return moeSDK.onsite.displayManager.clickTracker(moeOsmCampaignMeta, 'OSM', {\n                widget_id: id,\n              })();\n          }\n          return Promise.resolve();\n        },\n        trackDismiss: function (isAuto = false) {\n          if(moeOsmCampaignMeta) {\n            return moeSDK.onsite.displayManager.dismissEvent(moeOsmCampaignMeta, 'OSM', isAuto);\n          }\n          return Promise.resolve();\n        },\n        setAlias: function (data) {\n          return moeSDK.update_unique_user_id(data);\n        },\n        setUniqueId: function (data) {\n          return moeSDK.add_unique_user_id(data);\n        },\n        identifyUser: function(data) {\n          return moeSDK.identifyUser(data);\n        },\n        destroySession: function () {\n          return moeSDK.logoutUser();\n        },\n        setUserName: function (data) {\n          return moeSDK.setUserName(data);\n        },\n        setFirstName: function (data) {\n          return moeSDK.setFirstName(data);\n        },\n        setLastName: function (data) {\n          return moeSDK.setLastName(data);\n        },\n        setEmailId: function (data) {\n          return moeSDK.setEmailId(data);\n        },\n        setMobileNumber: function (data) {\n          return moeSDK.setMobileNumber(data);\n        },\n        setGender: function (data) {\n          return moeSDK.setGender(data);\n        },\n        setBirthDate: function (data) {\n            //iso date format only\n            return moeSDK.setBirthDate(data);\n        },\n        setUserAttribute: function (name, value, userAttributeLevel) {\n            if (userAttributeLevel && typeof userAttributeLevel === 'string') {\n              return moeSDK.setUserAttribute(name, value, userAttributeLevel);\n            }\n            return moeSDK.setUserAttribute(name, value);\n        },\n        dismissMessage: function () {\n          setTimeout(() => {\n            moeSDK.onsite.displayManager?.dismissInapp('${t}');\n          }, 100)\n        },\n        showPushOptIn: function (config) {\n          return moeSDK.callWebPush(config);\n        },\n        copyText: function (selector) {\n          return new Promise((res, rej) => {\n            if(!selector) rej();\n            var text = document.querySelector(selector);\n            if(text.textContent) {\n              navigator.clipboard.writeText(text.textContent);\n              res(null);\n            }\n            else {\n              text.select();\n              text.setSelectionRange(0, 99999);\n              navigator.clipboard.writeText(text.value);\n              res(null);\n            }\n          })\n        }\n    }\n    const MoeOsm = moengage;\n    `)(e, t), n.setAttribute("data-moe-script", "1"), Tl(n), n
                })(n, t)), pi.log(2, i, "JS-bridge script inserted successfully", t)
            } catch (e) {
                pi.warn(2, i, "Failed to insert OSM JS Bridge: ", t)
            }
        }

        function Nl(e) {
            const t = `${Ll}.changeAnchorTagReDirectionMethod`;
            try {
                const n = Array.prototype.slice.call(e.contentDocument.getElementsByTagName("a"));
                for (const e of n) {
                    const t = e.getAttribute("target"),
                        n = e.getAttribute("href");
                    n && "_parent" === t && (e.removeAttribute("href"), e.addEventListener("click", e => {
                        e.preventDefault(), (0, jn.pS)(() => {
                            window.open(n, "_parent")
                        })
                    }))
                }
                pi.log(1, t, `Anchor Tag Href Rendering Changed to onClick for Campaign Frame: ${e.id}`)
            } catch (n) {
                pi.error(1, t, `Failed to Change Anchor Tag Href Rendering for Campaign Frame: ${e.id}`)
            }
        }

        function kl(e, t) {
            const n = `${Ll}.handleClassBasedTracking`,
                i = e => Array.prototype.slice.call(e),
                r = e.iframe,
                a = i(r.contentDocument.getElementsByClassName(Ci)),
                s = i(r.contentDocument.getElementsByClassName(Ri)),
                o = i(r.contentDocument.getElementsByTagName("a"));
            if (0 === a.length && (pi.warn(1, n, "No dismiss class items present in this template"), pi.broadcastLog(X, "Dismiss class not present in OSM", "No dismiss class items present in OSM template.")), 0 === s.length && (pi.warn(1, n, "No click class items present in this template"), pi.broadcastLog(X, "Click class not present in OSM", "No click class items present in OSM template.")), e.data.payload && (e.data.payload.indexOf("TEXT_INPUT") > -1 || e.data.payload.indexOf('dynamic-listeners="true"') > -1)) r.contentDocument.body.addEventListener("click", n => {
                n.target && n.target.classList.contains(Ri) && tl(e.campaignMeta, "OSM", {
                    widget_id: n.target.dataset.id
                })(), n.target && n.target.classList.contains(Ci) && (t(e.campaignMeta.campaignId), n.target.classList.contains(Ri) || rl(e.campaignMeta, "OSM"))
            });
            else {
                for (const t of s) t.addEventListener("click", t => {
                    tl(e.campaignMeta, "OSM", {
                        widget_id: t.target.dataset.id
                    })()
                });
                for (const n of a) n.addEventListener("click", () => {
                    t(e.campaignMeta.campaignId), n.classList.contains(Ri) || rl(e.campaignMeta, "OSM")
                })
            }
            for (const e of o) "_blank" !== e.getAttribute("target") && e.setAttribute("target", "_parent")
        }
        const Ml = {
                CENTER: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    bottom: "auto",
                    right: "auto",
                    transform: "translate(-50%, -50%)"
                },
                CENTER_LEFT: {
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    bottom: "auto",
                    right: "auto",
                    transform: "translate(0,-50%)"
                },
                CENTER_RIGHT: {
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    bottom: "auto",
                    left: "auto",
                    transform: "translate(0,-50%)"
                },
                TOP_LEFT: {
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    bottom: "auto",
                    right: "auto"
                },
                TOP_CENTER: {
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    bottom: "auto",
                    right: "auto",
                    transform: "translate(-50%, 0)"
                },
                TOP_RIGHT: {
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    bottom: "auto",
                    left: "auto"
                },
                BOTTOM_LEFT: {
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    top: "auto",
                    right: "auto"
                },
                BOTTOM_CENTER: {
                    position: "absolute",
                    left: "50%",
                    bottom: "10px",
                    top: "auto",
                    right: "auto",
                    transform: "translate(-50%, 0)"
                },
                BOTTOM_RIGHT: {
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    top: "auto",
                    left: "auto"
                },
                TOP: {
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    bottom: "auto",
                    right: "auto",
                    transform: "translate(-50%, 0)"
                },
                BOTTOM: {
                    position: "absolute",
                    bottom: "0",
                    top: "auto",
                    right: "auto",
                    left: "50%",
                    transform: "translate(-50%, 0)"
                },
                LEFT: {
                    position: "absolute",
                    left: "0",
                    bottom: "auto",
                    right: "auto",
                    top: "auto"
                },
                RIGHT: {
                    position: "absolute",
                    right: "0",
                    bottom: "auto",
                    left: "auto",
                    top: "auto"
                }
            },
            Bl = "campaignStylingHelper";

        function Ul(e, t, n) {
            t && (Object.assign(e, Ml[t]), He() && n && function(e, t) {
                const n = {
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    marginTop: "0",
                    marginBottom: "0"
                };
                "TOP" === t && (n.marginTop = "10px"), "BOTTOM" === t && (n.marginBottom = "10px"), Object.assign(e, n)
            }(e, t))
        }

        function xl(e, t) {
            const n = `${Bl}.liveCampaignPositionStyling`;
            try {
                e.templateType === So.BANNER ? t.style.position = e.display.config.sticky ? "fixed" : "absolute" : e.templateType === So.POP_UP && (t.style.position = "fixed", "DIV" === t.tagName ? t.style.inset = "0" : t.style.backgroundColor = "rgba(99, 99, 99, 0.21)"), pi.log(1, n, ht(e.campaignId))
            } catch (t) {
                pi.error(1, n, vt(e.campaignId))
            }
        }

        function Fl(e, t) {
            const n = `${Bl}.testCampaignPositionStyling`;
            try {
                e.templateType === So.BANNER ? t.style.position = e.displaySettings.config.sticky ? "fixed" : "absolute" : e.templateType === So.POP_UP && (t.style.position = "fixed", "DIV" === t.tagName ? t.style.inset = "0" : t.style.backgroundColor = "rgba(99, 99, 99, 0.21)"), pi.log(1, n, ht(e.draftId))
            } catch (t) {
                pi.error(1, n, vt(e.draftId))
            }
        }
        class Vl {
            constructor(e) {
                this.renderListener = null, this.initializationPromiseObject = null, this.campaignRenderOrder = [], this.campaignRenderMap = {}, this.dismissTestInapp = e => {
                    _l(), vl(e), fl(), this.initialInlineBodyStyle ? document.body.setAttribute("style", this.initialInlineBodyStyle) : null === this.initialInlineBodyStyle && document.body.removeAttribute("style"), this.removeOSMPusher(), this.pushCardsTemplate(0), (0, jn.pS)(() => {
                        var t;
                        return null === (t = document.getElementById(`moe-onsite-campaign-${e}`)) || void 0 === t ? void 0 : t.remove()
                    }, 0)
                }, this.dismissInapp = (e, t = !0) => {
                    if (_l(document.getElementById(dl(e))), fl(), vl(e), 0 === this.getActiveCampaigns().length) return void this.dismissTestInapp(e);
                    const n = this.getActiveCampaigns();
                    (0, jn.pS)(() => {
                        n.forEach(t => {
                            var n, i;
                            t.campaignMeta.campaignId === e && (t.iframe ? null === (n = t.iframe) || void 0 === n || n.remove() : null === (i = t.osmDivSelector) || void 0 === i || i.remove())
                        })
                    }, 0), this.campaignRenderMap[e].setIsActive(!1), this.campaignRenderOrder = this.campaignRenderOrder.filter(t => t !== e), (0, jn.wm)(this.campaignRenderMap[e].dismissInterval), this.campaignRenderMap[e].delayTimer = null, t && ii.broadcastToWindow({
                        topic: "OSM_INTERNAL_EVENT",
                        name: "DISMISS",
                        data: e
                    }), this.renderAllActiveCampaigns()
                }, this.clickTracker = tl, this.dismissEvent = rl, this.onsiteApiClient = e, this.startInitialization()
            }
            startInitialization() {
                return Ve(this, void 0, void 0, function*() {
                    const e = `${Vl.baseLogTag}.startInitialization`;
                    try {
                        null == this.initializationPromiseObject && (this.initializationPromiseObject = new lr), this.initializationPromiseObject.res()
                    } catch (t) {
                        pi.error(1, e, "Error initializing display managaer:", t)
                    }
                })
            }
            getOSMPusher(e) {
                const t = document.createElement("div");
                if (t.id = Ni, t.style.setProperty("display", "block", "important"), t.style.height = e + "px", "FRAMESET" === document.body.nodeName) {
                    const e = document.head;
                    e.parentNode.insertBefore(t, e)
                } else {
                    const e = document.body.firstChild;
                    e.parentNode.insertBefore(t, e)
                }
                return t
            }
            removeOSMPusher() {
                var e;
                null === (e = document.getElementById(Ni)) || void 0 === e || e.remove()
            }
            queueDraftCampaign(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    const n = `${Vl.baseLogTag}.queueDraftCampaign`;
                    try {
                        yield this.initializationPromiseObject.p, e.position = t.position, this.testCampaign = e;
                        const i = !("1" !== t.editorVersion || !t.htmlJsonPayload),
                            r = !i && Vl.createDefaultIframe(this.testCampaign.draftId, t.payload, t.baseUrl);
                        let a;
                        if (pi.log(1, n, `Going to render test campaign ${e.draftId}`), a = "FRAMESET" === document.body.nodeName ? this.getOSMPusher(0) : document.body.firstChild, i) {
                            const n = {
                                campaignId: this.testCampaign.draftId,
                                templateType: e.templateType,
                                onsitePayload: t
                            };
                            yield Al(a, n), this.renderTestCampaign(e, r, t)
                        } else a.parentNode.insertBefore(r, a), r.addEventListener("load", () => {
                            r.contentWindow.postMessage({
                                campaignId: e.draftId
                            }, "*"), "1" === t.editorVersion || t.baseUrl ? Pl(r.contentDocument, e.draftId) : function(e, t, n, i) {
                                const r = `${Ll}.handleClassBasedTrackingForTestCampaign`,
                                    a = e => Array.prototype.slice.call(e),
                                    s = a(e.contentDocument.getElementsByClassName(Ci)),
                                    o = a(e.contentDocument.getElementsByClassName(Ri)),
                                    l = a(e.contentDocument.getElementsByTagName("a"));
                                if (0 === s.length && pi.warn(1, r, "No dismiss class items present in this template"), 0 === o.length && pi.warn(1, r, "No click class items present in this template"), t.payload.indexOf("TEXT_INPUT") > -1 || t.payload.indexOf('dynamic-listeners="true"') > -1) e.contentDocument.body.addEventListener("click", e => {
                                    e.target && e.target.classList.contains(Ri) && pi.log(1, r, "Clicked on test campaign element. No data will be sent to BE right now. We'll start sending the click events once the campaign is live"), e.target && e.target.classList.contains(Ci) && i(n.draftId)
                                });
                                else {
                                    for (const e of o) e.addEventListener("click", () => {
                                        pi.log(1, r, "Clicked on test campaign element. No data will be sent to BE right now. We'll start sending the click events once the campaign is live")
                                    });
                                    for (const e of s) e.addEventListener("click", () => {
                                        i(n.draftId)
                                    })
                                }
                                for (const e of l) "_blank" !== e.getAttribute("target") && e.setAttribute("target", "_parent")
                            }(r, t, e, e => this.dismissTestInapp(e)), this.renderTestCampaign(e, r), El(e.draftId, e.templateType)
                        })
                    } catch (e) {
                        pi.error(1, n, "Error queueing draft campaign", e)
                    }
                })
            }
            renderTestCampaign(e, t, n) {
                return Ve(this, void 0, void 0, function*() {
                    if (t) {
                        if (t.style.visibility = "hidden", t.style.display = "block", t.style.zIndex = "2147483647", e.displaySettings.config.blocking) t.style.height = `${window.innerHeight}px`, t.style.width = "100%";
                        else if (t.style.height = getComputedStyle(t.contentDocument.body).height, t.style.width = getComputedStyle(t.contentDocument.body).width, e.templateType === So.POP_UP && (t.style.margin = "0px auto"), t.srcdoc.indexOf(Li) > -1) {
                            const n = t.srcdoc.indexOf(Pi) > -1;
                            Ul(t.style, e.position, n)
                        }
                        t.style.visibility = "visible", Fl(e, t), e.displaySettings.config.scrollable || (document.body.style.overflow = "hidden")
                    } else {
                        const t = document.getElementById(dl(e.draftId));
                        t.style.zIndex = "2147483647", Fl(e, t)
                    }
                    e.templateType === So.BANNER && this.bannerTestCampaignStyling(e, t, n)
                })
            }
            queueLiveCampaign(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    var n;
                    const i = `${Vl.baseLogTag}.queueLiveCampaign`;
                    e.campaignContext = t.campaignContext, e.editorVersion = t.editorVersion, e.onsitePayload = t;
                    try {
                        if (yield this.initializationPromiseObject.p, null == this.campaignRenderMap[e.campaignId] || !this.campaignRenderMap[e.campaignId].isActive() && null === this.campaignRenderMap[e.campaignId].delayTimer) {
                            let r;
                            this.campaignRenderOrder.push(e.campaignId), this.campaignRenderMap[e.campaignId] = new cl(e, t), this.campaignRenderMap[e.campaignId].isJSONPayloadApproach = !("1" !== t.editorVersion || !t.htmlJsonPayload), this.campaignRenderMap[e.campaignId].isJSONPayloadApproach ? this.campaignRenderMap[e.campaignId].osmDivRendering = t => Al(t, e, nl, this.onsiteApiClient) : (r = Vl.createDefaultIframe(e.campaignId, this.campaignRenderMap[e.campaignId].data.payload, this.campaignRenderMap[e.campaignId].data.baseUrl), this.campaignRenderMap[e.campaignId].iframe = r), yield this.campaignRenderMap[e.campaignId].waitForDelay;
                            const a = this.campaignRenderMap[e.campaignId];
                            a.telemetrySpanId = e.telemetrySpanId;
                            const s = null !== (n = a.telemetrySpanId) && void 0 !== n ? n : null;
                            Pr.addMeta(s, {
                                trigger_delay_ms: a.triggerDelayMs
                            }), (yield this.canCampaignBeRendered(e)) ? (pi.log(1, i, `Going to render ${e.campaignId}`), this.campaignRenderMap[e.campaignId].setIsActive(!0), null != this.renderListener && this.renderListener(e), this.renderAllActiveCampaigns()) : (Pr.endSpan(s, mr, {
                                failure_reason: "not_renderable"
                            }), pi.warn(1, i, nt(e.campaignId)))
                        } else pi.warn(1, i, nt(e.campaignId, ", as campaign is already Active."))
                    } catch (t) {
                        pi.error(1, i, `Error queuing campaign ${e.campaignId}`, t)
                    }
                })
            }
            renderAllActiveCampaigns() {
                return Ve(this, void 0, void 0, function*() {
                    var e;
                    const t = this.getActiveCampaigns();
                    if (this.restoreBodyStyle(), t.length > 0) {
                        for (let n = 0; n < t.length; n++) {
                            if (!t[n].isJSONPayloadApproach && "visible" === t[n].iframe.style.visibility) {
                                t[n].iframe.style.zIndex = (2147483647 - (t.length - n - 1)).toString();
                                continue
                            }
                            if (null == document.getElementById(dl(t[n].campaignMeta.campaignId))) {
                                let e;
                                e = "FRAMESET" === document.body.nodeName ? this.getOSMPusher(0) : document.body.firstChild, t[n].isJSONPayloadApproach ? (yield t[n].osmDivRendering(e), t[n].onFrameLoad.res(), t[n].osmDivSelector = document.getElementById(dl(t[n].campaignMeta.campaignId))) : (e.parentNode.insertBefore(t[n].iframe, e), t[n].iframe.addEventListener("load", () => {
                                    this.initialInlineBodyStyle = document.body.getAttribute("style"), Hl.setScrollState(t), t[n].iframe.contentWindow.postMessage({
                                        campaignId: t[n].campaignMeta.campaignId
                                    }, "*"), "1" === t[n].campaignMeta.editorVersion || t[n].data.baseUrl ? (Pl(t[n].iframe.contentDocument, t[n].campaignMeta.campaignId, t[n].campaignMeta), Nl(t[n].iframe)) : kl(t[n], e => this.dismissInapp(e)), t[n].onFrameLoad.res()
                                }))
                            }
                            yield t[n].onFrameLoad.p;
                            const i = null !== (e = t[n].telemetrySpanId) && void 0 !== e ? e : null;
                            if (Pr.checkpoint(i, "dom_rendered"), t[n].isJSONPayloadApproach) t[n].osmDivSelector.style.zIndex = (2147483647 - (t.length - n - 1)).toString(), xl(t[n].campaignMeta, t[n].osmDivSelector), Pr.endSpan(i, pr);
                            else {
                                if (t[n].iframe.style.visibility = "hidden", t[n].iframe.style.display = "block", t[n].iframe.style.zIndex = (2147483647 - (t.length - n - 1)).toString(), t[n].iframe.style.margin = "0", t[n].campaignMeta.display.config.blocking) t[n].iframe.style.height = `${window.innerHeight}px`, t[n].iframe.style.width = "100%";
                                else if (t[n].iframe.style.height = getComputedStyle(t[n].iframe.contentDocument.body).height, t[n].iframe.style.width = t[n].iframe.style.padding.includes("10px") ? parseInt(getComputedStyle(t[n].iframe.contentDocument.body).width) + 20 + "px" : getComputedStyle(t[n].iframe.contentDocument.body).width, t[n].campaignMeta.templateType === So.POP_UP && (t[n].iframe.style.margin = "0px auto"), t[n].data.payload && t[n].data.payload.indexOf(Li) > -1) {
                                    const e = t[n].data.payload.indexOf(Pi) > -1;
                                    Ul(t[n].iframe.style, t[n].data.position, e)
                                }
                                t[n].iframe.style.visibility = "visible", xl(t[n].campaignMeta, t[n].iframe), nl(t[n].campaignMeta, "OSM", !1, this.onsiteApiClient)(), Pr.endSpan(i, pr), El(t[n].campaignMeta.campaignId, t[n].campaignMeta.templateType)
                            }
                            if (null == t[n].dismissInterval) {
                                const e = 1e3 * Me(t[n].campaignMeta, "delivery.dismissInterval", 0);
                                e > 0 && (t[n].dismissInterval = (0, jn.pS)(() => {
                                    const e = this.campaignRenderMap[t[n].campaignMeta.campaignId];
                                    e && e.isActive() && (this.dismissInapp(t[n].campaignMeta.campaignId), window.MoeFocusHandler && window.MoeFocusHandler(), rl(t[n].campaignMeta, "OSM", !0))
                                }, e))
                            }
                        }
                        this.bannerLiveCampaignsStyling(t)
                    }
                })
            }
            restoreBodyStyle() {
                this.removeOSMPusher(), this.pushCardsTemplate(0);
                let e = 0;
                Object.keys(this.campaignRenderMap).forEach(t => {
                    this.campaignRenderMap[t].campaignMeta.templateType === So.POP_UP && this.campaignRenderMap[t].isActive() && e++
                }), e >= 1 || (this.initialInlineBodyStyle ? document.body.setAttribute("style", this.initialInlineBodyStyle) : null === this.initialInlineBodyStyle && document.body.removeAttribute("style"))
            }
            canCampaignBeRendered(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = `${Vl.baseLogTag}.canCampaignBeRendered`;
                    try {
                        const t = yield Ro.campaingsStatsStore.getItem(e.campaignId), n = yield Ro.serviceMetaStore.getItem(bi.SERVICE_META.KEYS.GLOBAL_DELAY), i = yield Ro.serviceMetaStore.getItem(bi.SERVICE_META.KEYS.LAST_INAPP_SHOWN_TIME);
                        return xo.isValid(e, t) && xo.isValidMessagingCampaign(e, t, n, i, this.getActiveCampaigns()) && ao.getURLFilterResult(e)
                    } catch (n) {
                        pi.error(1, t, `Error checking if campaign ${e.campaignId} can be rendered:`, n)
                    }
                    return !1
                })
            }
            static createDefaultIframe(e, t, n) {
                const i = dl(e),
                    r = document.createElement("iframe");
                r.setAttribute("id", i), r.style.left = "0px", r.style.top = "0px", r.style.bottom = "0px", r.style.right = "0px", r.style.border = "0px none", r.style.height = "100%", r.style.width = window.innerWidth.toString() + "px", r.style.padding = "0", r.style.overflow = "hidden", r.style.overflowY = "hidden", r.style.zIndex = "999999", r.style.display = "none", r.style.position = "fixed";
                let a = t;
                n && (a = function(e, t) {
                    const n = `<base href="${t}">`,
                        i = e.match(/<head[^>]*>/i);
                    return i ? e.replace(i[0], `${i[0]}${n}`) : `${n}${e}`
                }(a, n), a = function(e, t) {
                    return e.replace(wl, t)
                }(a, e));
                const s = function(e, t = "") {
                    var n;
                    const i = t || (null === (n = Dt.get()) || void 0 === n ? void 0 : n.contentSecurityNonce);
                    if (!i || "string" != typeof i || !i.length) return e;
                    try {
                        return e.replace(/<script(\s+[^>]*)?>/gi, (e, t) => e.includes("nonce=") ? e : t ? `<script${t} nonce="${i}">` : `<script nonce="${i}">`)
                    } catch (t) {
                        return pi.error(2, "Nonce.addNonceToHtmlString", "Error adding nonce to HTML string: ", t), e
                    }
                }(a);
                return r.setAttribute("srcdoc", s), r
            }
            onRender(e) {
                this.renderListener = e
            }
            getActiveCampaigns() {
                return this.campaignRenderOrder.map(e => this.campaignRenderMap[e]).filter(e => e.isActive())
            }
            destroy() {
                this.getActiveCampaigns().forEach(e => {
                    e.setIsActive(!1)
                }), this.renderAllActiveCampaigns(), this.campaignRenderOrder = [], this.campaignRenderMap = {}
            }
            bannerTestCampaignStyling(e, t, n) {
                const i = `${Vl.baseLogTag}.bannerTestCampaignStyling`;
                try {
                    let n, r, a = !0;
                    if (t) n = parseInt(getComputedStyle(t.contentDocument.body).height), a = t.srcdoc.indexOf(Li) > -1;
                    else {
                        const t = document.querySelector("#" + dl(e.draftId) + " .brz-container");
                        n = parseInt(getComputedStyle(t).height)
                    }
                    r = this.getOSMPusher(e.displaySettings.config.pushPage && (a && "TOP" === e.position || !a) ? n : 0), this.pushCardsTemplate(n, r), pi.log(1, i, `Added Banner Styles for Test CampaignId: ${e.draftId}`)
                } catch (t) {
                    pi.error(1, i, `Failed Added Banner Styles for Test CampaignId: ${e.draftId}`)
                }
            }
            bannerLiveCampaignsStyling(e) {
                const t = `${Vl.baseLogTag}.bannerLiveCampaignsStyling`;
                let n = 0,
                    i = 0;
                for (let r = e.filter(e => e.campaignMeta.templateType === So.BANNER).length - 1; r >= 0; r--) try {
                    if (e[r].isJSONPayloadApproach || e[r].iframe.contentDocument) {
                        let t, a = !0;
                        e[r].isJSONPayloadApproach ? t = parseInt(getComputedStyle(e[r].osmDivSelector.querySelector(".brz-container")).height) : (t = parseInt(getComputedStyle(e[r].iframe.contentDocument.body).height), a = e[r].data.payload && e[r].data.payload.indexOf(Li) > -1), n += t, e[r].campaignMeta.display.config.pushPage && (a && "TOP" === e[r].data.position || !a) && (i += t)
                    }
                } catch (n) {
                    pi.error(1, t, `Failed Adding Banner Styles for Live CampaignId: ${e[r].campaignMeta.campaignId}`)
                }
                const r = this.getOSMPusher(i);
                this.pushCardsTemplate(i, r)
            }
            pushCardsTemplate(e, t) {
                var n, i;
                null === (i = null === (n = null === window || void 0 === window ? void 0 : window.Moengage) || void 0 === n ? void 0 : n.cards) || void 0 === i || i.updatePushBannerHeight(e, t)
            }
        }
        Vl.baseLogTag = "MessagingDisplayManager";
        const Wl = Vl;
        class Hl {
            static setScrollState(e) {
                let t = !0;
                for (let n = 0; n < e.length; n++) t = t && e[n].campaignMeta.display.config.scrollable;
                t || (document.body.style.overflow = "hidden")
            }
        }

        function Gl(e) {
            var t;
            if (e.detail.name === $) {
                window.Moengage.pageChangeHandlerCallingTime = (new Date).getTime(), window.MoeFocusHandler && window.MoeFocusHandler(), (() => {
                    var e;
                    if (null === (e = el()) || void 0 === e ? void 0 : e.onsite) {
                        const {
                            onsite: e
                        } = el(), {
                            triggerManager: t,
                            displayManager: n,
                            sendDelayCampaignStats: i,
                            funnelManager: r
                        } = e;
                        n && (i(n, r), ol(n)), t && (sl(t), ll(t));
                        const a = window[Ai];
                        (null == a ? void 0 : a.onScrollOrExitIntentCampaigns) && (a.onScrollOrExitIntentCampaigns = {}), ii.resetListeners(), e.initializationPromise = null, e.selfHandledWebpTriggerListeners = {}, e.initialize && e.initialize()
                    }
                })(), window.Moengage.shouldClearPrevEvents = (new Date).getTime();
                const {
                    triggerManager: e
                } = null === (t = el()) || void 0 === t ? void 0 : t.onsite;
                if (e) try {
                    e.clearPrevEvents && e.clearPrevEvents()
                } catch (e) {
                    pi.error(2, "handlePageChange", "Error clearing previous events", e)
                }
            }
        }
        let $l = !1;
        class jl {
            constructor(e) {
                var t, n;
                this.campaignId = e.campaignId, this.campaignName = e.campaignName, this.expiryTime = e.expiryTime ? new Date(e.expiryTime) : null, this.updatedTime = e.updatedTime ? new Date(e.updatedTime) : null, this.status = e.status, this.jsonPayload = e.htmlJsonPayload, this.context = e.campaignContext, this.dismissInterval = (null === (t = e.delivery) || void 0 === t ? void 0 : t.dismissInterval) || 0, this.urlFilters = (null === (n = e.triggerData) || void 0 === n ? void 0 : n.url_condition) || null
            }
        }
        var Kl = n(634).VR;
        class ql {
            constructor(e, t, n, i) {
                this.baseLogTag = "DeliveryFunnelManager", this.displayManager = t, this.OnsiteApiClient = new Bo(e), this.deliveryStats = n, this.triggerSegmentReEvalMetaSync = i
            }
            attemptCampaigns(e) {
                e.forEach(e => {
                    this.deliveryStats.setStats(e, Ii.ATTEMPTED.CAMPAIGN_ATTEMPTED)
                })
            }
            getImpressionStats(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = this.baseLogTag + ".getImpressionStats";
                    try {
                        return yield Ro.campaingsStatsStore.getItem(e.campaignId)
                    } catch (n) {
                        pi.error(1, t, `Error getting impression stats for ${e.campaignId}`, n)
                    }
                })
            }
            getLastGlobalInappShown() {
                return Ve(this, void 0, void 0, function*() {
                    return yield Ro.serviceMetaStore.getItem(bi.SERVICE_META.KEYS.LAST_INAPP_SHOWN_TIME)
                })
            }
            getGlobalDelay() {
                return Ve(this, void 0, void 0, function*() {
                    return yield Ro.serviceMetaStore.getItem(bi.SERVICE_META.KEYS.GLOBAL_DELAY)
                })
            }
            filterValidCampaigns(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    const n = this.baseLogTag + ".filterValidCampaigns";
                    try {
                        const i = e.map(e => this.getImpressionStats(e)),
                            r = yield this.getLastGlobalInappShown(), a = yield this.getGlobalDelay(), s = yield this.getGlobalFCValidations(e, t);
                        try {
                            const t = yield Kl.all(i);
                            return e.filter((e, i) => {
                                var o;
                                if (e.templateType !== So.SELF_HANDLED) {
                                    if (!xo.isCampaignWithinFC(e, t[i])) return this.deliveryStats.setStats(e, Ii.PRIORITIZED.CAMPAIGN_PRIORITY_MAX_TIMES_SHOWN), !1;
                                    if (!xo.hasCampaignClearedSelfDelay(e, t[i])) return this.deliveryStats.setStats(e, Ii.PRIORITIZED.CAMPAIGN_PRIORITY_MIN_DELAY), !1;
                                    if (!xo.hasCampaignClearedGlobalDelay(e, a, r)) return this.deliveryStats.setStats(e, Ii.PRIORITIZED.CAMPAIGN_PRIORITY_GLOBAL_DELAY), !1;
                                    const l = s[i];
                                    if (l && !l.isValid) return pi.log(2, n, `Campaign ${e.campaignId} breached global frequency capping rule: ${null===(o=l.failedRules)||void 0===o?void 0:o.join(", ")}`), Po.trackFailedValidationStats(e, l.failedRules, (e, t) => this.deliveryStats.setStats(e, t), "priority"), !1
                                }
                                return !xo.isCampaignExpired(e) || (this.deliveryStats.setStats(e, Ii.PRIORITIZED.CAMPAIGN_PRIORITY_EXPIRED), !1)
                            })
                        } catch (e) {
                            return void pi.error(1, n, "Error filtering and sorting campaigns", e)
                        }
                    } catch (e) {
                        return void pi.error(1, n, "Error in filterValidCampaigns", e)
                    }
                })
            }
            getGlobalFCValidations(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    const n = t ? yield ko.getSettings(): null;
                    if (!n) return e.map(() => null);
                    const i = Po.filterOutHourLevelRules(n),
                        r = yield ko.getDeviceFrequencyData(), a = No.getEventTypeFromEvent(t);
                    return Kl.all(e.map(e => {
                        var t, n;
                        return (null === (n = null === (t = e.delivery) || void 0 === t ? void 0 : t.fcMeta) || void 0 === n ? void 0 : n.ignoreFc) ? null : Po.validateRules(i, e, a, r)
                    }))
                })
            }
            prioritizeMessagingCampaigns(e, t) {
                return Ve(this, arguments, void 0, function*(e, t, n = 1) {
                    if (!e || 0 === e.length) return;
                    const i = yield this.filterValidCampaigns(e, t);
                    if (!i || 0 === i.length) return;
                    const r = i.sort(xo.comparator),
                        a = r.slice(0, n),
                        s = r.slice(n),
                        o = (new Date).toISOString(),
                        l = a.map(e => {
                            var t;
                            return null === (t = null == e ? void 0 : e.campaignContext) || void 0 === t ? void 0 : t.cid
                        });
                    return s.forEach(e => {
                        this.deliveryStats.setStats(e, Ii.PRIORITIZED.CAMPAIGN_PRIORITY_HIGH_PRIORITY_CAMPAIGN_AVAILABLE, [{
                            cids: l,
                            t: o
                        }])
                    }), a
                })
            }
            getCampaignTagMap(e) {
                const t = {},
                    n = [],
                    i = {
                        cids: [],
                        t: (new Date).toISOString()
                    },
                    r = new Set;
                for (const n of e) n.tag && (r.add(n.tag), t[n.tag] = t[n.tag] || [], t[n.tag].push(n));
                return r.forEach(e => {
                    const r = t[e].sort(xo.comparator);
                    if (r.length > 0) {
                        const e = r[0];
                        n.push(e), i.cids.push(e.campaignContext.cid), r.length > 1 && r.slice(1).forEach(e => {
                            this.deliveryStats.setStats(e, Ii.PRIORITIZED.CAMPAIGN_PRIORITY_HIGH_PRIORITY_CAMPAIGN_AVAILABLE, [i])
                        })
                    }
                }), n
            }
            prioritizePersonalizationCampaigns(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    const n = yield this.filterValidCampaigns(e, t);
                    return n.length > 0 ? this.getCampaignTagMap(n) : []
                })
            }
            getOnsitePayload(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    var n;
                    const i = this.baseLogTag + ".getOnsitePayload",
                        r = null !== (n = null == e ? void 0 : e.telemetrySpanId) && void 0 !== n ? n : null;
                    try {
                        const n = yield this.OnsiteApiClient.getCampaignPayload(e, t);
                        if (Pr.checkpoint(r, "template_fetched"), n && !n.error) return n.payload && n.payload.code === Oi ? (Pr.endSpan(r, mr, {
                                failure_reason: "segment_mismatch"
                            }), pi.warn(1, i, nt(e.campaignId, " as user does not belong to the segment.")), void
                            function(e) {
                                return Ve(this, void 0, void 0, function*() {
                                    const t = "handleSegmentReEvalSync";
                                    return new jn.VR(n => Ve(this, void 0, void 0, function*() {
                                        const i = yield Ro.serviceMetaStore.getItem(bi.SERVICE_META.KEYS.LAST_SEGMENT_REEVAL_TIME);
                                        e && (yield Ro.campaingsMetaStore.removeItem(e.campaignId), pi.log(1, t, `Removed the failed campaign ${e.campaignId} from its active list and updated the campaigns meta list in indexedDB`));
                                        const r = Date.now();
                                        null === i || r - i >= Di ? (pi.log(1, t, `Performing segment re-evaluation meta sync. Last sync: ${i?new Date(i).toISOString():"Never"}`), yield Ro.serviceMetaStore.setItem(bi.SERVICE_META.KEYS.LAST_SEGMENT_REEVAL_TIME, r), n(!0)) : (pi.log(1, t, `Segment re-evaluation sync skipped due to 3-minute interval restriction. Time remaining: ${Math.ceil((Di-(r-i))/1e3)}s`), n(!1))
                                    }))
                                })
                            }(e).then(e => {
                                e && this.triggerSegmentReEvalMetaSync()
                            }).catch(e => {
                                pi.error(1, i, "Error in segment re-evaluation sync:", e)
                            })) : (yield ko.processResponse(n), n);
                        if (n && n.error) {
                            const t = n.reason;
                            return this.setDeliveryFailureStats(e, t), void Pr.endSpan(r, mr, {
                                failure_reason: t || "delivery_error"
                            })
                        }
                        return this.deliveryStats.setStats(e, Ii.DELIVERED.CAMPAIGN_DELIVERED_API_FAILURE), void Pr.endSpan(r, mr, {
                            failure_reason: "template_fetch_failed"
                        })
                    } catch (t) {
                        return Pr.checkpoint(r, "template_fetched", void 0, !1), Pr.endSpan(r, mr, {
                            failure_reason: "template_fetch_failed"
                        }), pi.errorAndBroadcast(1, i, ee, "Could not get OSM campaign", `Error getting onsite payload: ${"string"==typeof t?t:JSON.stringify(t)}`), void this.deliveryStats.setStats(e, Ii.DELIVERED.CAMPAIGN_DELIVERED_API_FAILURE)
                    }
                })
            }
            setDeliveryFailureStats(e, t) {
                t && ["PAUSED", "EXPIRED", "personalize"].some(e => t.includes(e)) || this.deliveryStats.setStats(e, Ii.DELIVERED.CAMPAIGN_DELIVERED_API_FAILURE)
            }
            getEventForPersonalisation(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = yield Ko.getTriggeringPrimaryEvent(e.campaignId);
                    return t ? new za(t.name, t.attributes) : null
                })
            }
            deliverMessagingCampaign(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    var n;
                    const i = this.baseLogTag + ".deliverMessagingCampaign";
                    if (e) {
                        const r = (yield this.getEventForPersonalisation(e)) || t;
                        if (!(yield ko.campaignPriorityValidation(e, r, null, this.deliveryStats))) return;
                        try {
                            const t = yield this.getOnsitePayload(e, r);
                            if (t) {
                                if (e.onsitePayload = t, this.isGCGCampaign(e)) return;
                                return (null === (n = t.payload) || void 0 === n ? void 0 : n.code) === wi ? (pi.warn(1, i, nt(e.campaignId, " as it falls under Control Group.")), void nl(e, "OSM", !0, this.OnsiteApiClient)()) : xo.doCampaignPayloadHasMandatoryParams(e.onsitePayload) ? e : (pi.warn(1, i, nt(e.campaignId)), void this.deliveryStats.setStats(e, Ii.DELIVERED.CAMPAIGN_DELIVERED_MANDATORY_PARAMS_MISSING))
                            }
                        } catch (e) {
                            pi.error(1, i, mt, e)
                        }
                    }
                })
            }
            deliverPersonalizationCampaigns(e, t, n) {
                return Ve(this, void 0, void 0, function*() {
                    var i;
                    const r = this.baseLogTag + ".deliverPersonalizationCampaigns";
                    if (e.length > 0) {
                        const a = [];
                        for (const t of e)(yield ko.campaignPriorityValidation(t, n, null, this.deliveryStats)) && a.push(t);
                        const s = a.map(e => this.getOnsitePayload(e, n));
                        try {
                            const e = yield Kl.all(s), o = a.filter((n, i) => {
                                if (e[i] && e[i].payload && (n.onsitePayload = e[i], null != n.tag && null != t[n.tag])) {
                                    if ("JSON" !== n.onsitePayload.payloadType) return !0;
                                    if ((e => {
                                            try {
                                                JSON.parse(e)
                                            } catch (e) {
                                                return !1
                                            }
                                            return !0
                                        })(n.onsitePayload.payload)) return !0
                                }
                                return !1
                            }), l = [];
                            for (const e of o) {
                                if (null === (i = e.onsitePayload) || void 0 === i ? void 0 : i.frequency_data) {
                                    const t = No.getEventTypeFromEvent(n);
                                    if (!(yield ko.campaignImpressionValidation(e, t, this.deliveryStats))) {
                                        pi.warn(1, r, nt(e.campaignId, " due to frequency capping"));
                                        continue
                                    }
                                }
                                l.push(e)
                            }
                            return l
                        } catch (e) {
                            pi.error(1, r, "Error delivering personalization campaigns", e)
                        }
                    }
                })
            }
            messagingCampaignImpression(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    var n;
                    const i = this.baseLogTag + ".messagingCampaignImpression";
                    if (e) try {
                        const r = yield this.getLastGlobalInappShown(), a = yield this.getGlobalDelay(), s = this.displayManager.getActiveCampaigns();
                        if (!xo.hasCampaignClearedGlobalDelay(e, a, r)) return pi.warn(1, i, nt(e.campaignId)), void this.deliveryStats.setStats(e, Ii.IMPRESSION.CAMPAIGN_IMPRESSION_GLOBAL_DELAY);
                        if (!xo.canCampaignBeRenderedOverExisting(e, s.length)) return void this.deliveryStats.setStats(e, Ii.IMPRESSION.CAMPAIGN_IMPRESSION_ANOTHER_CAMPAIGN_VISIBLE);
                        if (!ao.getURLFilterResult(e)) return pi.warn(1, i, nt(e.campaignId)), void this.deliveryStats.setStats(e, Ii.IMPRESSION.CAMPAIGN_IMPRESSION_URL_CHANGED);
                        const o = this.displayManager.campaignRenderMap[e.campaignId];
                        if (nd.onScrollOrExitIntentCampaigns[e.campaignId] || null != o && ((null == t ? void 0 : t.name) === Q.MOE_EXIT || (null == t ? void 0 : t.name) === Q.MOE_PAGE_SCROLL)) return this.deliveryStats.setStats(e, Ii.IMPRESSION.CAMPAIGN_IMPRESSION_MAX_TIMES_SHOWN), void pi.warn(1, i, nt(e.campaignId));
                        if (null != o && o.isActive()) return this.deliveryStats.setStats(e, Ii.IMPRESSION.CAMPAIGN_IMPRESSION_ANOTHER_CAMPAIGN_VISIBLE), void pi.warn(1, i, nt(e.campaignId, ", as campaign is already Active."));
                        if (null === (n = e.onsitePayload) || void 0 === n ? void 0 : n.frequency_data) {
                            const n = No.getEventTypeFromEvent(t);
                            if (!(yield ko.campaignImpressionValidation(e, n, this.deliveryStats))) return void pi.warn(1, i, nt(e.campaignId, " due to frequency capping"))
                        }
                        return e
                    } catch (e) {
                        return void pi.error(1, i, mt, e)
                    }
                })
            }
            mostEligibleMessagingCampaign(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    var n;
                    if (e.length > 0) {
                        const i = null !== (n = Pr.startSpan(gr, {
                            source: "inapp/managers/DeliveryFunnelManager.ts",
                            trigger_type: ql.deriveTriggerType(t)
                        })) && void 0 !== n ? n : void 0;
                        this.attemptCampaigns(e);
                        const r = yield this.prioritizeMessagingCampaigns(e, t), a = null == r ? void 0 : r[0];
                        if (!a) return Pr.checkpoint(null != i ? i : null, "eligibility_checked", void 0, !1), Pr.endSpan(null != i ? i : null, mr, {
                            failure_reason: "no_eligible_campaign"
                        }), void this.deliveryStats.sendDeliveryStats(e);
                        let s;
                        if (Pr.checkpoint(null != i ? i : null, "eligibility_checked"), Pr.addMeta(null != i ? i : null, {
                                campaign_id: a.campaignId,
                                campaign_name: a.campaignName,
                                template_type: a.templateType
                            }), a.telemetrySpanId = i, Vo(a, Q.MOE_PAGE_EXIT)) {
                            const e = yield Wo(a);
                            e ? e.error ? this.setDeliveryFailureStats(a, e.reason) : this.isGCGCampaign(e) || (s = e) : s = yield this.deliverMessagingCampaign(a, t)
                        } else s = yield this.deliverMessagingCampaign(a, t);
                        s && (s.telemetrySpanId = i);
                        const o = yield this.messagingCampaignImpression(s, t);
                        return this.deliveryStats.sendDeliveryStats(e), o || Pr.endSpan(null != i ? i : null, mr, {
                            failure_reason: "not_delivered"
                        }), o
                    }
                })
            }
            startSelfHandledSpans(e, t) {
                e.forEach(e => {
                    var n;
                    e.telemetrySpanId = null !== (n = Pr.startSpan(gr, {
                        source: "inapp/managers/DeliveryFunnelManager.ts",
                        trigger_type: ql.deriveTriggerType(t),
                        is_self_handled: !0,
                        campaign_id: e.campaignId,
                        campaign_name: e.campaignName,
                        template_type: e.templateType
                    })) && void 0 !== n ? n : void 0
                })
            }
            succeedSelfHandledSpans(e) {
                e.forEach(e => {
                    var t;
                    return Pr.endSpan(null !== (t = e.telemetrySpanId) && void 0 !== t ? t : null, pr)
                })
            }
            failSelfHandledSpans(e, t) {
                e.forEach(e => {
                    var n;
                    return Pr.endSpan(null !== (n = e.telemetrySpanId) && void 0 !== n ? n : null, mr, {
                        failure_reason: t
                    })
                })
            }
            closeSelfHandledSpans(e, t) {
                const n = [],
                    i = [];
                t.forEach((t, r) => {
                    const a = e[r];
                    a && ((null == t ? void 0 : t.templateType) === So.SELF_HANDLED_OSM ? n.push(a) : i.push(a))
                }), this.succeedSelfHandledSpans(n), this.failSelfHandledSpans(i, "template_type_mismatch")
            }
            static droppedFrom(e, t) {
                return e.filter(e => -1 === t.indexOf(e))
            }
            static deriveTriggerType(e) {
                switch (null == e ? void 0 : e.name) {
                    case Q.MOE_PAGE_EXIT:
                    case Q.MOE_EXIT:
                        return "exit_intent";
                    case Q.MOE_PAGE_SCROLL:
                        return "scroll";
                    case Q.PAGE_VIEWED:
                        return "page_view";
                    default:
                        return "event"
                }
            }
            mostEligiblePersonalizationCampaigns(e, t, n) {
                return Ve(this, void 0, void 0, function*() {
                    if (e.length > 0) {
                        this.attemptCampaigns(e);
                        const i = yield this.prioritizePersonalizationCampaigns(e, n), r = yield this.deliverPersonalizationCampaigns(i, t, n);
                        return this.deliveryStats.sendDeliveryStats(e), r || []
                    }
                    return []
                })
            }
            mostEligibleSelfHandledPersonalizationCampaigns(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    const n = this.baseLogTag + ".mostEligibleSelfHandledPersonalizationCampaigns";
                    this.attemptCampaigns(e);
                    const i = yield this.filterValidCampaigns(e);
                    pi.log(1, n, "Eligible campaigns with tag ", t, "are", i);
                    const r = i.sort(xo.comparator)[0];
                    if (r) {
                        pi.log(1, n, "Campaign with highest priority for tag", t, "is", r.campaignId);
                        const {
                            campaignId: e
                        } = r, i = yield this.getEventForPersonalisation(r), a = No.getEventTypeFromEvent(i);
                        if (!(yield ko.campaignPriorityValidation(r, i, a, this.deliveryStats))) return;
                        const s = yield this.getOnsitePayload(r, i);
                        if (s && s.payload) {
                            if (yield ko.processResponse(s), s.frequency_data) {
                                const t = No.getEventTypeFromEvent(i);
                                if (!(yield ko.campaignImpressionValidation(r, t, this.deliveryStats))) return void pi.log(2, n, `Impression frequency capping validation failed for self-handled personalization campaign: ${e}`)
                            }
                            r.onsitePayload = s
                        }
                    }
                    return this.deliveryStats.sendDeliveryStats(e), r
                })
            }
            mostEligibleSelfHandledCampaigns(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    var n;
                    const i = this.baseLogTag + ".mostEligibleSelfHandledCampaigns";
                    this.attemptCampaigns(e), this.startSelfHandledSpans(e, t);
                    const r = null !== (n = yield this.filterValidCampaigns(e)) && void 0 !== n ? n : [],
                        a = ql.droppedFrom(e, r);
                    if (this.failSelfHandledSpans(a.filter(e => xo.isCampaignExpired(e)), "expired"), this.failSelfHandledSpans(a.filter(e => !xo.isCampaignExpired(e)), "frequency_capped"), 0 === r.length) return this.deliveryStats.sendDeliveryStats(e), [];
                    pi.log(1, i, "Eligible self-handled campaigns are ", r);
                    const s = yield this.prioritizeMessagingCampaigns(e, t, 5);
                    if (this.failSelfHandledSpans(ql.droppedFrom(r, null != s ? s : []), "not_prioritized"), s && s.length > 0) {
                        pi.log(2, i, `Prioritized campaigns: ${s.map(e=>e.campaignId).join(", ")}`), s.forEach(e => {
                            var t;
                            return Pr.checkpoint(null !== (t = e.telemetrySpanId) && void 0 !== t ? t : null, "eligibility_checked")
                        });
                        const n = No.getEventTypeFromEvent(t),
                            r = yield ko.getSettings();
                        if (!r) {
                            const n = Kl.all(s.map(e => this.getOnsitePayload(e, t))).then(e => Ve(this, void 0, void 0, function*() {
                                return this.closeSelfHandledSpans(s, e), e.filter(e => (null == e ? void 0 : e.templateType) === So.SELF_HANDLED_OSM).map((e, t) => {
                                    const n = s[t];
                                    return new jl(Object.assign(Object.assign({}, e), n))
                                })
                            }));
                            return this.deliveryStats.sendDeliveryStats(e), n
                        }
                        const a = yield ko.getDeviceFrequencyData(), o = yield Po.selfhandledPriorityValidation(s, r, n, a, (e, t) => {
                            this.deliveryStats.setStats(e, t)
                        });
                        if (this.failSelfHandledSpans(ql.droppedFrom(s, o), "frequency_capped"), 0 === o.length) return this.deliveryStats.sendDeliveryStats(s), [];
                        const l = Kl.all(o.map(e => this.getOnsitePayload(e, t))).then(e => Ve(this, void 0, void 0, function*() {
                            var t;
                            for (const t of e)(null == t ? void 0 : t.frequency_data) && (yield ko.processResponse(t));
                            const r = yield ko.getSettings();
                            if (!r) return this.closeSelfHandledSpans(o, e), e.filter(e => (null == e ? void 0 : e.templateType) === So.SELF_HANDLED_OSM).map((e, t) => {
                                const n = o[t];
                                return new jl(Object.assign(Object.assign({}, e), n))
                            });
                            const a = [],
                                l = new Map;
                            for (let n = 0; n < e.length; n++)(null === (t = e[n]) || void 0 === t ? void 0 : t.templateType) === So.SELF_HANDLED_OSM && (a.push(o[n]), l.set(n, o[n]));
                            if (this.failSelfHandledSpans(ql.droppedFrom(o, a), "template_type_mismatch"), 0 === a.length) return [];
                            const d = yield ko.getDeviceFrequencyData(), c = yield Po.selfhandledImpressionValidation(a, r, n, d, (e, t) => {
                                this.deliveryStats.setStats(e, t)
                            }), u = [];
                            for (let t = 0; t < e.length; t++) {
                                const n = l.get(t);
                                n && c.includes(n) && u.push(new jl(Object.assign(Object.assign({}, e[t]), n)))
                            }
                            return pi.log(2, i, `Frequency capping validation completed. Returning ${u.length} of ${o.length} campaigns (${s.length} total)`), this.failSelfHandledSpans(ql.droppedFrom(a, c), "frequency_capped"), this.succeedSelfHandledSpans(c), u
                        })).finally(() => {
                            this.deliveryStats.sendDeliveryStats(e)
                        });
                        return l.catch(() => {
                            this.failSelfHandledSpans(s, "delivery_error"), this.deliveryStats.sendDeliveryStats(e)
                        }), l
                    }
                })
            }
            delayDeliveryCampaignStats(e) {
                this.deliveryStats.setStats(e, Ii.IMPRESSION.CAMPAIGN_IMPRESSION_CANCEL_BEFORE_DELAY), this.deliveryStats.sendDeliveryStats([e])
            }
            isGCGCampaign(e) {
                var t;
                return (null === (t = e.onsitePayload.payload) || void 0 === t ? void 0 : t.code) === wi && (pi.warn(1, this.baseLogTag + ".isGCGCampaign", nt(e.campaignId, " as it falls under Control Group.")), nl(e, "OSM", !0, this.OnsiteApiClient)(), !0)
            }
        }
        class Yl {
            constructor(e) {
                this.draftId = Me(e, "draft_id", null), this.draftType = Me(e, "draft_type", null), this.templateType = Me(e, "template_type", null), this.action = Me(e, "action", null);
                const t = Me(e, "campaign_meta", {});
                this.locale = Me(e, "locale", null), this.variation = Me(e, "variation", null), this.displaySettings = new Eo({
                    config: t.config
                }, this.templateType)
            }
            static isValidRawJson(e) {
                const {
                    draft_id: t,
                    draft_tag: n,
                    draft_type: i
                } = e;
                return i === ce ? null != t && null != n : null != t
            }
        }
        const zl = (e, t, n) => {
            const i = "selfHandledHelper.track";
            return pi.log(1, i, `Self handled OSM ${t} tracking called for campaign:`, e.campaignName), e.campaignId ? (t === Ti.OSM.IMPRESSION && Ho(e.campaignId).then(t => Ve(void 0, void 0, void 0, function*() {
                var r, a;
                il(e.campaignId, null == t ? void 0 : t.expiryTime);
                const s = t ? No.getEventTypeFromCampaign(t) : Bi;
                if (!(yield ko.getSettings())) return void pi.log(2, i, "Frequency capping not enabled, skipping update for self-handled campaign");
                if (n) {
                    const n = null === (r = null == t ? void 0 : t.delivery) || void 0 === r ? void 0 : r.fcMeta;
                    if (n && Me(n, "ignoreFcCount", !1)) return void pi.log(2, i, `Skipping frequency capping tracking for self-handled campaign ${e.campaignId} as ignoreFcCount flag is set`)
                }
                const o = {
                        campaignId: e.campaignId,
                        tags: (null == t ? void 0 : t.tags) || [],
                        delivery: null == t ? void 0 : t.delivery
                    },
                    l = yield ko.validateAndUpdateFrequencyData(o, s, n, !0);
                l.isValid || pi.log(2, i, `Self-handled campaign ${e.campaignId} blocked by frequency capping rule: ${null===(a=l.failedRules)||void 0===a?void 0:a.join(", ")}`)
            })).catch(t => {
                il(e.campaignId), pi.error(2, i, "Failed to update frequency capping data for self-handled campaign:", t)
            }), We().trackEvent(t, Object.assign({
                campaign_id: e.campaignId,
                campaign_name: e.campaignName,
                type: Ti.OSM.TYPE,
                templateType: So.SELF_HANDLED_OSM
            }, e.context))) : new jn.VR((e, t) => {
                t("Moengage error: Campaign ID not found")
            })
        };
        class Jl {
            handler(e, t, n, i, r, a, s) {
                return Ve(this, void 0, void 0, function*() {
                    var o;
                    const l = Jl.baseLogTag + ".handler",
                        d = a.map(e => e.campaignId).join(", ");
                    pi.log(1, l, `${(null==s?void 0:s.name)?`Triggered for ${s.name}`:"Campaign(s) triggered"}: ${a.length} (${d})`);
                    const c = a.filter(e => e.templateType === So.SELF_HANDLED),
                        u = a.filter(e => e.templateType !== So.SELF_HANDLED && e.templateType !== So.SELF_HANDLED_OSM),
                        g = a.filter(e => e.templateType === So.SELF_HANDLED_OSM);
                    if (c.length > 0) {
                        const i = yield e.mostEligiblePersonalizationCampaigns(c, t, s);
                        i.length > 0 && n(i)
                    }
                    if (u.length > 0) {
                        const t = yield e.mostEligibleMessagingCampaign(u, s);
                        if ((null == s ? void 0 : s.timestamp) && s.timestamp < (null === (o = window.Moengage) || void 0 === o ? void 0 : o.pageChangeHandlerCallingTime)) return void pi.log(1, l, `Stopped triggering the campaign because handlePageChange was called: ${d}`);
                        t && i(t)
                    }
                    if (g.length > 0 && this.selfHandledOSMCallback) {
                        const t = yield e.mostEligibleSelfHandledCampaigns(g, s);
                        t.length > 0 && (t.forEach(e => {
                            zl(e, Ti.OSM.DELIVERED, r)
                        }), this.selfHandledOSMCallback(t))
                    }
                })
            }
        }
        Jl.baseLogTag = "EventTriggerHandler";
        const Ql = Jl;
        class Xl {
            constructor(e) {
                this.baseLogTag = "DeliveryStats", this.OnsiteApiClient = new Bo(e), this.batchId = yi()
            }
            sendDeliveryStats(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = this.baseLogTag + ".sendDeliveryStats";
                    if (!window.navigator.onLine) return pi.error(1, t, "No internet connection. Delivery stats will not be sent"), void jo.setOnlineEventListner(() => {
                        this.sendDeliveryStats(e)
                    });
                    if (e.length > 0) try {
                        const t = {};
                        e.forEach(e => {
                            t[e.campaignContext.cid] || (t[e.campaignContext.cid] = e.stats, e.stats = {})
                        }), this.OnsiteApiClient.callStatsAPI({
                            stats: t
                        }, this.batchId)
                    } catch (e) {
                        pi.error(1, t, "Error in sending delivery funnel stats", e)
                    }
                })
            }
            setStats(e, t, n) {
                const i = (new Date).toISOString();
                e && (e.stats[t] = e.stats[t] || [], n ? e.stats[t] = n : e.stats[t].some(e => e.t === i) || e.stats[t].push({
                    t: i
                }))
            }
        }
        var Zl = n(634).VR,
            ed = n(634).VR;
        const td = new lr;
        class nd {
            constructor(e) {
                this.initializationPromise = null, this.testDraftInfo = null, this.triggerManager = null, this.displayManager = null, this.selfHandledWebpTriggerListeners = {}, this.funnelManager = null, this.eventTriggerHandler = null, this.deliveryStats = null, this.initData = e, pi.setLogLevel(e.logLevel, !1), this.OnsiteApiClient = new Bo(this.initData),
                    function() {
                        $l || (window.addEventListener(S, e => Ve(this, void 0, void 0, function*() {
                            var t;
                            const n = null === (t = null == e ? void 0 : e.detail) || void 0 === t ? void 0 : t.name;
                            n === A ? (yield ga.get()).deviceAdded && (yield Vd.enableOSM()) : n === I && (yield Vd.disableOSM(!1, !0))
                        })), $l = !0)
                    }()
            }
            setLogLevel(e) {
                pi.setLogLevel(e, !1)
            }
            isTestCampaignAvailable() {
                return Ve(this, void 0, void 0, function*() {
                    const e = nd.baseLogTag + ".isTestCampaignAvailable";
                    window.opener ? (window.addEventListener("message", t => Ve(this, void 0, void 0, function*() {
                        if (t.data && "inapp_test" === t.data.action) {
                            const n = t.data;
                            if (Yl.isValidRawJson(n)) {
                                const t = new Yl(n);
                                pi.log(1, e, "Valid test campaign data found, checking TestCampaign"), yield this.checkForTestCampaign(t)
                            } else pi.error(1, e, "Data is not a valid test campaign", n);
                            td.res()
                        }
                    }), !1), window.opener.postMessage("moe_test_osm", "*"), (0, jn.pS)(() => Ve(this, void 0, void 0, function*() {
                        td.res()
                    }), 100)) : td.res()
                })
            }
            initialize() {
                const e = nd.baseLogTag + ".initialize";
                return pi.log(1, e, "Initialising onsite module"), null == this.initializationPromise && Ea() && (this.initializationPromise = new jn.VR(t => Ve(this, void 0, void 0, function*() {
                    try {
                        yield Ro.initialize(), yield Po.validateAndTrackSession(), yield this.isTestCampaignAvailable(), td.p.then(() => Ve(this, void 0, void 0, function*() {
                            var n;
                            yield this.syncCampaigns();
                            const i = yield Go(), r = this.isExitIntentCampaignFound(i);
                            r.length && (yield this.prefetchExitIntentCampaigns(r));
                            const a = i.filter(e => null != e.triggerData);
                            if (this.displayManager = new Wl(this.OnsiteApiClient), this.displayManager.onRender(t => {
                                    pi.log(1, e, `Campaign rendered: ${t.campaignId}`), Ro.serviceMetaStore.setItem(bi.SERVICE_META.KEYS.LAST_INAPP_SHOWN_TIME, new Date)
                                }), null != this.testDraftInfo && "onsite_messaging" === this.testDraftInfo.draftType) {
                                pi.log(1, e, "Test campaigns present, will be showing only the test campaign.");
                                try {
                                    pi.log(1, e, `Trying to render draft campaign with id ${this.testDraftInfo.draftId}`);
                                    const t = yield this.OnsiteApiClient.getDraftCampaign(this.testDraftInfo);
                                    pi.log(1, e, "Test campaign payload:", t), t && this.displayManager.queueDraftCampaign(this.testDraftInfo, t), this.testDraftInfo = null
                                } catch (t) {
                                    pi.errorAndBroadcast(1, e, ee, "Error fetching data for test campaign", `Error fetching data for test campaign ${this.testDraftInfo.draftId}: ${"string"==typeof t?t:JSON.stringify(t)}`, void 0, t)
                                }
                            } else {
                                ((null === (n = this.initData) || void 0 === n ? void 0 : n.enableSPA) || Ge() === Y.TV) && this.handleSPA(), nd.attachIdentityUpdateHandler(), this.deliveryStats = new Xl(this.initData), this.triggerManager = new Xo(a), this.funnelManager = new ql(this.initData, this.displayManager, this.deliveryStats, this.triggerSegmentReEvalMetaSync.bind(this)), this.eventTriggerHandler = new Ql;
                                const e = this.eventTriggerHandler.handler.bind(this.eventTriggerHandler, this.funnelManager, this.selfHandledWebpTriggerListeners, this.handlePersonalizationCampaigns.bind(this), this.handleMessagingCampaigns.bind(this), this.OnsiteApiClient);
                                this.triggerManager.onTrigger(e), Yo.setListener(e), Jo.setDeliveryStats(this.deliveryStats), Yo.setDeliveryStats(this.deliveryStats), yield Yo.logDeliveryFunnelForExpiredTimerCampaigns(), yield Jo.updateCampaignTimeInSecondaryEventsStore(), yield Yo.createNewTimers(), this.triggerManager.startWatching()
                            }
                            ii.broadcastToWindow({
                                topic: S,
                                name: D
                            }), t(!0)
                        }))
                    } catch (t) {
                        pi.error(1, e, t)
                    }
                }))), this.initializationPromise
            }
            handleMessagingCampaigns(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = `${nd.baseLogTag}.handleMessagingCampaigns`;
                    e.onsitePayload && this.displayManager && (pi.log(1, t, `Campaign triggered: ${e.campaignId}`), pi.log(1, t, "Payload for campaign:", e.onsitePayload), this.displayManager.queueLiveCampaign(e, e.onsitePayload))
                })
            }
            handlePersonalizationCampaigns(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = `${nd.baseLogTag}.handlePersonalizationCampaigns`;
                    e.length > 0 && e.forEach(e => {
                        null != e.tag && (pi.log(1, t, `Personlization Campaign triggered: ${e.campaignId}`), this.selfHandledWebpTriggerListeners[e.tag].forEach(t => {
                            this.handleSelfHandledCallback(e, e.onsitePayload, t)
                        }))
                    })
                })
            }
            logout() {
                return Ve(this, arguments, void 0, function*(e = !1, t = !1) {
                    var n, i, r, a;
                    const s = `${nd.baseLogTag}.logout`;
                    if (pi.log(1, s, "Starting module logout"), ((null === (n = this.initData) || void 0 === n ? void 0 : n.enableSPA) || Ge() === Y.TV) && this.removeHandlePageChange(), this.initializationPromise = null, this.displayManager) {
                        ol(this.displayManager);
                        const e = Object.keys(null === (i = this.displayManager) || void 0 === i ? void 0 : i.campaignRenderMap);
                        (null === (r = this.displayManager.testCampaign) || void 0 === r ? void 0 : r.draftId) && e.push(null === (a = this.displayManager.testCampaign) || void 0 === a ? void 0 : a.draftId), e.forEach(e => {
                            const t = document.getElementById(`moe-onsite-campaign-${e}`);
                            t && t.remove()
                        }), this.displayManager.destroy()
                    }
                    this.triggerManager && (sl(this.triggerManager), ll(this.triggerManager), this.triggerManager.destroy()), Qa.clear(), Jo.destroy(), Yo.destroy(), e && (nd.onScrollOrExitIntentCampaigns = {}), this.displayManager = null, this.funnelManager = null, this.eventTriggerHandler = null, yield Yo.deleteAllPendingTimers(), t ? Ro.sdkOptOut() : (yield Ro.serviceMetaStore.removeItem(bi.SERVICE_META.KEYS.LAST_META_CALL_TIME), yield Ro.clear(e)), pi.log(1, s, "Starting module logout complete")
                })
            }
            checkForTestCampaign(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = nd.baseLogTag + ".checkForTestCampaign";
                    try {
                        const n = e;
                        null == n ? (pi.log(1, t, "No draft campaign found"), this.testDraftInfo = null) : (pi.log(1, t, "Found draft campaign:", n), this.testDraftInfo = n, null == this.testDraftInfo.draftId && (this.testDraftInfo.draftType = ce))
                    } catch (e) {
                        pi.error(1, t, "Error getting test campaign", e)
                    }
                })
            }
            getData(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    const n = `${nd.baseLogTag}.getData`;
                    null == t && (pi.warn(1, n, "Moengage.onsite.getData called without a providing a callback."), t = () => {});
                    try {
                        if (yield this.initializationPromise, null != this.testDraftInfo) {
                            if (this.testDraftInfo.draftType === ce) {
                                const e = yield this.OnsiteApiClient.getDraftCampaign(this.testDraftInfo);
                                this.testDraftInfo = null, t(null, {
                                    payload: e.payload,
                                    click() {},
                                    imp() {}
                                })
                            }
                        } else {
                            const i = yield Ro.campaingsTagsStore.getItem(e);
                            if (i) {
                                const r = (yield ed.all(i.map(e => Ho(e)))).filter(e => null == e.triggerData),
                                    a = yield this.funnelManager.mostEligibleSelfHandledPersonalizationCampaigns(r, e);
                                a && a.onsitePayload ? this.handleSelfHandledCallback(a, a.onsitePayload, t) : (pi.errorAndBroadcast(1, n, ee, pt, "Error fetching campaign payload."), t({
                                    message: "There was an error fetching data for this tag"
                                }, null))
                            } else pi.warn(1, n, "Could not find any eligible campaign for tag", e), t({
                                message: "Could not find any eligible campaign for tag " + e
                            }, null)
                        }
                    } catch (e) {
                        pi.errorAndBroadcast(1, n, ee, pt, `Error getting campaign: ${"string"==typeof e?e:JSON.stringify(e)}`, void 0, e)
                    }
                })
            }
            registerCallback(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    const n = `${nd.baseLogTag}.registerCallback`;
                    try {
                        yield this.initializationPromise, null == this.selfHandledWebpTriggerListeners[e] ? this.selfHandledWebpTriggerListeners[e] = [t] : this.selfHandledWebpTriggerListeners[e].push(t)
                    } catch (t) {
                        pi.error(1, n, "Error setting callback for tag", e), pi.error(1, n, "Error stack:", t)
                    }
                })
            }
            handleSelfHandledCallback(e, t, n) {
                return Ve(this, void 0, void 0, function*() {
                    const i = `${nd.baseLogTag}.handleSelfHandledCallback`;
                    if (e.campaignContext = t.campaignContext, "JSON" === t.payloadType) try {
                        t.payload = JSON.parse(t.payload);
                        const i = Me(e, "triggerData.trigger_delay.delayInSeconds", 0) || 0;
                        (0, jn.pS)(() => {
                            al(e, "WP"), n(null, {
                                payload: t.payload,
                                click(t) {
                                    tl(e, "WP", t)()
                                },
                                imp: nl(e, "WP", !1, this.OnsiteApiClient)
                            })
                        }, 1e3 * i)
                    } catch (t) {
                        const r = `Payload for campaign_id ${e.campaignId} is not a valid JSON`;
                        pi.error(1, i, r), n({
                            message: r
                        }, null)
                    } else al(e, "WP"), n(null, {
                        payload: t.payload,
                        click(t) {
                            tl(e, "WP", t)()
                        },
                        imp: nl(e, "WP", !1, this.OnsiteApiClient)
                    })
                })
            }
            syncCampaigns() {
                return Ve(this, void 0, void 0, function*() {
                    const e = nd.baseLogTag + ".syncCampaigns";
                    try {
                        (yield this.shouldClearMetaStorage()) && (yield Ro.campaingsMetaStore.clear(), yield this.rebuildTagStore()), (yield this.shouldSaveRemoteCampaigns()) && (yield this.saveRemoteCampaigns())
                    } catch (t) {
                        pi.error(1, e, "Error getting remote campaigns: ", t)
                    }
                })
            }
            shouldClearMetaStorage() {
                return Ve(this, void 0, void 0, function*() {
                    return (yield Ro.serviceMetaStore.getItem(bi.SERVICE_META.KEYS.LAST_FETCH_SDK_VERSION)) !== We().getSdkVersion()
                })
            }
            shouldSaveRemoteCampaigns() {
                return Ve(this, void 0, void 0, function*() {
                    var e;
                    const t = nd.baseLogTag + ".shouldSaveRemoteCampaigns",
                        n = yield Ro.serviceMetaStore.getItem(bi.SERVICE_META.KEYS.LAST_FETCH_SDK_VERSION);
                    let i = yield Ro.serviceMetaStore.getItem(bi.SERVICE_META.KEYS.LAST_META_CALL_TIME);
                    i = new Date(i);
                    const r = (new Date).getTime();
                    if (null == i || r - i > 9e5) return !0;
                    if (pi.remoteLogTracking(1, "info", t, "Last fetch was less than 15 mins ago at ", i), n !== We().getSdkVersion()) return pi.remoteLogTracking(1, "info", t, "Version change detected. Will proceed to fetch latest campaigns"), !0;
                    const a = yield Ro.serviceMetaStore.getItem(bi.SERVICE_META.KEYS.UNIQUE_ID);
                    return !(!a || a === (null === (e = Zn.get(Ee.USER_DATA)) || void 0 === e ? void 0 : e.deviceUuid) || (pi.remoteLogTracking(1, "info", t, "Unique device id change detected. Will proceed to fetch latest campaigns"), 0))
                })
            }
            saveRemoteCampaigns() {
                return Ve(this, void 0, void 0, function*() {
                    const e = nd.baseLogTag + ".saveRemoteCampaigns";
                    yield Ve(void 0, void 0, void 0, function*() {
                        const e = "campaignStats.removeExpiredCampaignStats";
                        try {
                            yield Ro.initialize();
                            const t = Date.now(),
                                n = [];
                            yield Ro.campaingsStatsStore.iterate((e, i) => {
                                const r = Me(e, "expiryTime", null);
                                if (!r) return;
                                const a = new Date(r).getTime();
                                !Number.isNaN(a) && a < t && n.push(i)
                            }), n.length > 0 && (yield Zl.all(n.map(e => Ro.campaingsStatsStore.removeItem(e)))), pi.log(2, e, `Expired campaign stats removed: ${n.length}`)
                        } catch (t) {
                            pi.error(1, e, "Error removing expired campaign stats:", t)
                        }
                    }), yield Ro.campaingsMetaStore.clear(), yield Ro.exitIntentCampaignStore.clear();
                    const t = yield this.OnsiteApiClient.getCampaignsMeta();
                    var n;
                    null != t && (yield this.addCampaignsToDB(t.campaignsMeta), yield(n = t.campaignsMeta, Ve(void 0, void 0, void 0, function*() {
                        try {
                            const e = n.map(e => Ve(void 0, void 0, void 0, function*() {
                                const t = e.campaignId,
                                    n = e.expiryTime;
                                if (!t || !n) return;
                                const i = yield Ro.campaingsStatsStore.getItem(t);
                                if (!i) return;
                                const r = Me(i, "expiryTime", null);
                                if ((r ? new Date(r).getTime() : null) === new Date(n).getTime()) return;
                                const a = i;
                                yield Ro.campaingsStatsStore.setItem(t, Object.assign(Object.assign({}, a), {
                                    expiryTime: n
                                }))
                            }));
                            yield Zl.all(e)
                        } catch (e) {
                            pi.error(1, "campaignStats.updateCampaignStatsExpiry", "Error updating campaign stats expiry:", e)
                        }
                    })), pi.log(1, e, "Inapp campaigns meta saved!")), yield Jo.pruneRemovedCampaigns(), yield Jo.removeStaleTriggeringPrimaryEventCampaigns(), yield Ro.serviceMetaStore.setItem(bi.SERVICE_META.KEYS.GLOBAL_DELAY, t.globalDelayBetweenInapps), yield Ro.serviceMetaStore.setItem(bi.SERVICE_META.KEYS.LAST_FETCH_SDK_VERSION, We().getSdkVersion())
                })
            }
            addCampaignsToDB(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = nd.baseLogTag + ".addCampaignsToDB";
                    pi.log(1, t, `Adding/Updating ${e.length} campaigns in DB`, e.map(e => e.campaignId));
                    try {
                        yield ed.all(e.map(e => Ro.campaingsMetaStore.setItem(e.campaignId, e))), yield this.rebuildTagStore()
                    } catch (e) {
                        pi.error(1, t, "Error saving remote campaigns:", e)
                    }
                })
            }
            rebuildTagStore() {
                return Ve(this, void 0, void 0, function*() {
                    const e = nd.baseLogTag + ".rebuildTagStore";
                    try {
                        yield Ro.campaingsTagsStore.clear();
                        const e = yield Go(), t = {};
                        for (const n of e) null != n.tag && (null == t[n.tag] && (t[n.tag] = []), t[n.tag].push(n.campaignId));
                        const n = [];
                        yield Ro.campaingsTagsStore.clear();
                        for (const e in t) t.hasOwnProperty(e) && n.push(Ro.campaingsTagsStore.setItem(e, t[e]));
                        yield ed.all(n)
                    } catch (t) {
                        pi.error(1, e, "Error updating tags store:", t)
                    }
                })
            }
            isExitIntentCampaignFound(e) {
                return e.filter(e => e.templateType !== So.SELF_HANDLED && Vo(e, Q.MOE_PAGE_EXIT))
            }
            prefetchExitIntentCampaigns(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = nd.baseLogTag + ".prefetchExitIntentCampaigns",
                        n = yield za.createEvent(Q.MOE_EXIT, []), i = (yield Fo(e)).filter(e => ao.getFilterResult(n, e));
                    if (i && i.length) {
                        const e = yield Wo(i[0]);
                        if (e && e.onsitePayload && e.onsitePayload.updatedTime.getTime() === i[0].updatedTime.getTime()) return;
                        const {
                            campaignId: n
                        } = i[0];
                        if (!(yield ko.campaignPriorityValidation(i[0], null, Vi, this.deliveryStats))) return;
                        const r = yield this.OnsiteApiClient.getCampaignPayload(i[0]);
                        return void(r.payload || r.htmlJsonPayload ? (yield ko.processResponse(r), r.updatedTime = i[0].updatedTime, yield Ro.exitIntentCampaignStore.setItem(n, r), pi.log(1, t, `Exit intent campaign prefetched: ${n}`)) : r.error && r.reason && (yield Ro.exitIntentCampaignStore.setItem(n, r)))
                    }
                    return pi.log(1, t, "Exit intent campaign not eligible to prefetch"), !1
                })
            }
            static handleDisableModule(e) {
                ii.broadcastToWindow({
                    topic: "MODULE_ACTIONS",
                    name: "DISABLE_OSM",
                    data: {
                        isUserLogout: e
                    }
                })
            }
            sendDelayCampaignStats(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    const n = nd.baseLogTag + ".sendDelayCampaignStats";
                    if (!e) return;
                    const i = Object.keys(e.campaignRenderMap).filter(t => !e.campaignRenderMap[t].campaignRendered);
                    i.length > 0 && (pi.log(1, n, "Campaigns found:", i), t.delayDeliveryCampaignStats(e.campaignRenderMap[i[0]].campaignMeta))
                })
            }
            handleSPA() {
                pi.log(2, nd.baseLogTag + ".handleSPA", "Adding SPA event listener for OSM"), window.addEventListener(G, Gl, {
                    once: !0
                })
            }
            removeHandlePageChange() {
                pi.log(2, nd.baseLogTag + ".removeHandlePageChange", "Removing SPA event listener for OSM"), window.removeEventListener(G, Gl)
            }
            static identityUpdateHandler(e) {
                return Ve(this, void 0, void 0, function*() {
                    var t;
                    if (pi.log(2, `${nd.baseLogTag}.identityUpdateHandler`, `Received event: ${e.detail.name}`), e.detail.name === W) {
                        const e = (e => {
                            if (!e) return [];
                            try {
                                return e.getActiveCampaigns().map(e => e.campaignMeta.campaignId)
                            } catch (e) {
                                return pi.error(2, "getAllActiveCampaign", "Error getting active campaigns:", e), []
                            }
                        })(null === (t = null === window || void 0 === window ? void 0 : window.Moengage) || void 0 === t ? void 0 : t.onsite.displayManager);
                        e && e.length > 0 ? (yield Ro.serviceMetaStore.removeItem(bi.SERVICE_META.KEYS.LAST_META_CALL_TIME), (e => {
                            const t = "handleLoginOnDismiss";
                            if (!e || 0 === e.length) return;
                            const n = new Set(e),
                                i = "OSM_INTERNAL_EVENT",
                                r = a => {
                                    var s;
                                    try {
                                        const {
                                            detail: {
                                                name: o,
                                                data: l
                                            }
                                        } = a;
                                        if ("DISMISS" === o && l && e.includes(l)) {
                                            const e = null === (s = a.detail) || void 0 === s ? void 0 : s.data;
                                            e && n.has(e) && (n.delete(e), pi.log(2, t, `Campaign ${e} dismissed. Remaining: ${n.size}`), 0 === n.size && (pi.log(2, t, "All campaigns dismissed, broadcasting module action"), window.removeEventListener(i, r), ii.broadcastToWindow({
                                                topic: "MODULE_ACTIONS",
                                                name: "DISABLE_ENABLE_OSM"
                                            })))
                                        }
                                    } catch (e) {
                                        pi.error(2, t, "Error handling dismiss event:", e)
                                    }
                                };
                            window.addEventListener(i, r)
                        })(e), window.addEventListener(V, nd.identityUpdateHandler)) : ii.broadcastToWindow({
                            topic: "MODULE_ACTIONS",
                            name: "DISABLE_ENABLE_OSM"
                        })
                    } else e.detail.name === H && (removeEventListener(V, nd.identityUpdateHandler), nd.identityListenerAdded = !1, nd.handleDisableModule(!0))
                })
            }
            static attachIdentityUpdateHandler() {
                nd.identityListenerAdded || (window.addEventListener(V, nd.identityUpdateHandler), nd.identityListenerAdded = !0)
            }
            getSelfHandledOSM(e) {
                const t = nd.baseLogTag + ".getSelfHandledOSM";
                e && "function" == typeof e ? (pi.log(1, t, "Self handled OSM callback requested"), this.initializationPromise.then(() => {
                    this.eventTriggerHandler ? this.eventTriggerHandler.selfHandledOSMCallback = e : pi.warn(1, t, "OSM module not initialised properly for self handled OSM to work; or it is in test campaign mode.")
                }).catch(n => {
                    pi.error(1, t, "Error during initialization:", n), e(n, null)
                })) : pi.error(1, t, "Self handled OSM callback is not a function.")
            }
            selfHandledShown(e) {
                return zl(e, Ti.OSM.IMPRESSION, this.OnsiteApiClient)
            }
            selfHandledClicked(e) {
                return zl(e, Ti.OSM.CLICK, this.OnsiteApiClient)
            }
            selfHandledDismissed(e) {
                return zl(e, Ti.OSM.DISMISS, this.OnsiteApiClient)
            }
            triggerSegmentReEvalMetaSync() {
                return Ve(this, void 0, void 0, function*() {
                    const e = nd.baseLogTag + ".triggerSegmentReEvalMetaSync";
                    try {
                        pi.log(1, e, "Triggering segment re-evaluation meta sync"), yield this.saveRemoteCampaigns()
                    } catch (t) {
                        pi.error(1, e, "Error in segment re-evaluation meta sync:", t)
                    }
                })
            }
            fetchLatestCampaigns() {
                return Ve(this, void 0, void 0, function*() {
                    const e = nd.baseLogTag + ".fetchLatestCampaigns";
                    try {
                        pi.log(1, e, "Fetching latest OSM campaigns"), yield this.saveRemoteCampaigns()
                    } catch (t) {
                        throw pi.error(1, e, "Error fetching latest campaigns:", t), t
                    }
                })
            }
        }
        nd.baseLogTag = "MoeOnsite", nd.identityListenerAdded = !1, nd.onScrollOrExitIntentCampaigns = {};
        const id = {
                code: 1e3,
                reason: "Web push not supported in current browser environment"
            },
            rd = {
                code: 1001,
                reason: "Registering the service worker failed"
            },
            ad = {
                code: 1002,
                reason: "Web push settings not configured"
            },
            sd = {
                code: 1004,
                reason: "Hard ask was dismissed to many times"
            },
            od = {
                code: 1005,
                reason: "Service worker can not be registered on this page due to scope issues"
            },
            ld = "IOS_PERMISSION_DENIED";
        class dd {
            static addCallback(e, t) {
                null != e && null != t && (null == dd.callbacks[e] && (dd.callbacks[e] = []), dd.callbacks[e].push(t))
            }
            static getCallbacks(e) {
                return dd.callbacks[e] || []
            }
            static runCallbacks(e) {
                dd.getCallbacks(e).forEach(e => {
                    e()
                })
            }
        }
        dd.callbacks = {};
        const cd = dd;

        function ud() {
            const e = document.getElementById("moe-push-div");
            null != e && (e.style.visibility = "none", e.style.opacity = "0", e.parentNode.removeChild(e))
        }
        const gd = "versionMismatch";

        function pd(e) {
            return !e || /\/versions\//.test(e)
        }

        function md(e, t, n, i) {
            const r = `${gd}.reportMismatch`,
                a = t || "a different version";
            i ? pi.log(2, r, `${e} is currently on ${a}; Web SDK is on 2.81.01. At least one asset is loaded from the latest URL — versions will reconcile automatically. No action needed.`) : (pi.warn(1, r, `${e} version mismatch.\n  Web SDK: 2.81.01\n  ${e}: ${a}\n` + n), pi.broadcastLog(X, `${e} version mismatch`, `Expected version 2.81.01 (from Web SDK) but ${e} is on ${a}. ${n}`, ne.WEBSDK_DOCS))
        }

        function hd() {
            if (void 0 === window.MoeWebP) return;
            const e = window.__moe && window.__moe.versions && window.__moe.versions.webp || null;
            var t;
            "2.81.01" !== e && md("Web Personalization", e, "Update the Web Personalization script URL to version 2.81.01.", (t = window.__moe && window.__moe.scriptUrls && window.__moe.scriptUrls.webp || null, !pd(window.__moe && window.__moe.scriptUrls && window.__moe.scriptUrls.sdk || null) && !pd(t)))
        }

        function vd(e) {
            return Ve(this, void 0, void 0, function*() {
                const t = `${gd}.checkServiceWorkerVersion`;
                try {
                    const t = e.active;
                    if (!t) return;
                    const n = yield function(e, t = 2e3) {
                        const n = `${gd}.askSWVersion`;
                        return new jn.VR(i => {
                            const r = new MessageChannel,
                                a = (0, jn.pS)(() => i(null), t);
                            r.port1.onmessage = e => {
                                (0, jn.Kj)(a), i(e.data && e.data.version ? e.data.version : null)
                            };
                            try {
                                e.postMessage({
                                    type: "MOE_GET_SW_VERSION"
                                }, [r.port2])
                            } catch (e) {
                                (0, jn.Kj)(a), pi.error(1, n, `Failed to postMessage to SW: ${e}`), i(null)
                            }
                        })
                    }(t);
                    if (null === n) return void md("Service worker", null, "Update the version in your MoEngage service worker URL to 2.81.01.", !1);
                    "2.81.01" !== n && md("Service worker", n, "Update the version in your MoEngage service worker URL to 2.81.01.", !1)
                } catch (e) {
                    pi.error(1, t, `Error checking SW version: ${e}`)
                }
            })
        }
        var fd = n(634).VR;
        class Ed {
            constructor(e) {
                this.swRegisterPromise = null, this.swActiveRetries = 1;
                const t = Ed.baseLogTag + ".constructor";
                this.sdkSettings = e, this.registerServiceWorker().then(() => {
                    this.sendDataToServiceWorker()
                }).catch(e => {
                    Ed.broadcastSwRegFailure(t, e)
                })
            }
            showHardAsk() {
                const e = Ed.baseLogTag + ".showHardAsk";
                return new jn.VR((t, n) => {
                    Ed.isWebPushSupported().then(i => {
                        i ? this.getCurrentPermissionState().then(i => {
                            ti() && this.registerServiceWorker().then(r => {
                                var a;
                                i !== ts ? (pi.remoteLogTracking(1, "info", e, "Attempting to open hard ask"), null === (a = We()) || void 0 === a || a.trackEvent(Q.OPT_IN_ATTEMPT), ii.broadcastToWindow({
                                    topic: S,
                                    name: k
                                }), this.showOverlay(), ti() && this.askPermission().then(n => {
                                    ti() && (this.hideOverlay(), pi.remoteLogTracking(2, "info", e, "Permission state after hard ask:", n), n === es ? this.getPushTokenDetails().then(e => {
                                        this.sendDataToServiceWorker(e.token), t({
                                            state: n,
                                            subscriptionDetails: e
                                        })
                                    }) : (this.sendDataToServiceWorker(), t({
                                        state: n,
                                        subscriptionDetails: null
                                    })))
                                }).catch(t => {
                                    Ed.broadcastSwRegFailure(e, t), n(rd)
                                })) : (pi.remoteLogTracking(1, "info", e, "Hard ask not shown as permission state is", i), t({
                                    state: i,
                                    subscriptionDetails: null
                                }))
                            }).catch(t => {
                                Ed.broadcastSwRegFailure(e, t), n(t)
                            })
                        }).catch(t => {
                            Ed.broadcastSwRegFailure(e, t), n(rd)
                        }) : (pi.warnAndBroadcast(1, e, X, "Web push not supported", "Web push not supported in current browser environment", ne.PUSH_COMPATIBILITY_MATRIX), n(id))
                    })
                })
            }
            sendDataToServiceWorker(e) {
                return new jn.VR(n => {
                    as.collectGetParams().then(n => {
                        const i = Dt.get();
                        e && (n.push_id = e || Hr() || void 0), n.isWebPushEnabled = this.sdkSettings.isWebPushEnabled && !i.disableWebPush, n.isBatchingEnabled = Zn.get(Ee.WEB_SETTINGS).configs.isBatchingEnabled, i.customProxyDomain && (n.customProxyDomain = i.customProxyDomain), Lt() || i.swScope ? t().createInstance({
                            driver: [t().INDEXEDDB],
                            name: "moe_database",
                            storeName: "moe_data"
                        }).setItem("reportParams", {
                            data: n
                        }) : navigator.serviceWorker.ready.then(() => {
                            this.sendDataToServiceWorkerOnControllerReady(n)
                        })
                    })
                })
            }
            sendDataToServiceWorkerOnControllerReady(e) {
                if (navigator.serviceWorker.controller) {
                    if ("chrome-extension:" === window.location.protocol) return void chrome.runtime.sendMessage({
                        data: e
                    });
                    navigator.serviceWorker.controller.postMessage({
                        data: e
                    })
                } else this.swActiveRetries < 3 && (0, jn.pS)(() => {
                    this.swActiveRetries++, this.sendDataToServiceWorkerOnControllerReady(e)
                }, 500)
            }
            getCurrentPermissionState() {
                return Ar.getInstance().then(e => navigator.permissions && !e.isSafari() ? navigator.permissions.query({
                    name: "notifications"
                }).then(e => Ed.parsePermissionState(e.state)).catch(e => {}) : new jn.VR(t => {
                    var n;
                    let i = null === (n = window.Notification) || void 0 === n ? void 0 : n.permission;
                    e.isSafari() && "default" === i && (i = "prompt", Zn.get(ld) && (i = "denied")), t(Ed.parsePermissionState(i))
                }))
            }
            getPushTokenDetails() {
                const e = Ed.baseLogTag + ".getPushTokenDetails";
                return new jn.VR((t, n) => {
                    this.getCurrentPermissionState().then(n => {
                        Ar.getInstance().then(i => {
                            n !== es ? t({
                                token: null,
                                raw: null
                            }) : this.registerServiceWorker().then(n => {
                                let r = null;
                                const a = {
                                    userVisibleOnly: !0
                                };
                                Ct(this.sdkSettings.webPushPlatformData, i) && (r = Pt(this.sdkSettings.webPushPlatformData, i), a.applicationServerKey = pa(r));
                                const s = () => {
                                    n.pushManager.subscribe(a).then(e => {
                                        (e => {
                                            const n = e.toJSON(),
                                                r = e.endpoint.substring(0, n.endpoint.lastIndexOf("/") + 1),
                                                a = n.expirationTime;
                                            let s = n.endpoint.split("/")[n.endpoint.split("/").length - 1];
                                            i.isEdge() && (s = s.replace("?token=", ""));
                                            const o = {};
                                            if (n.keys)
                                                for (const e in n.keys) n.keys.hasOwnProperty(e) && (o[e] = n.keys[e]);
                                            t({
                                                token: s,
                                                endpoint: r,
                                                keys: o,
                                                expirationTime: a,
                                                raw: n
                                            })
                                        })(e)
                                    }).catch(n => {
                                        pi.errorAndBroadcast(1, e, X, "Could not subscribe to web push", `Error in web push subscription. Please check your web push setup: ${"string"==typeof n?n:JSON.stringify(n)}`, ne.WEB_PUSH, n), t({
                                            token: null,
                                            raw: null
                                        })
                                    })
                                };
                                n.pushManager.getSubscription().then(e => {
                                    if (e)
                                        if ("vapid" === this.sdkSettings.webPushPlatformData.chrome.subscriptionMode && e.options && e.options.applicationServerKey) {
                                            const t = ma(e.options.applicationServerKey);
                                            [r, r + "=", r + "==", ma(pa(r))].indexOf(t) < 0 ? e.unsubscribe().then(() => {
                                                s()
                                            }) : s()
                                        } else s();
                                    else s()
                                })
                            }).catch(n => {
                                pi.errorAndBroadcast(1, e, ee, "Could not get push token", `Error in getting push token: ${"string"==typeof n?n:JSON.stringify(n)}`, void 0, n), t({
                                    token: null,
                                    raw: null
                                })
                            })
                        })
                    })
                })
            }
            removeToken() {
                return Zn.remove(Ee.PUSH_TOKEN), Zn.remove(Ee.OPTED_STATUS_TRACK_TIME), Zn.remove(Ee.SUBSCRIPTION_DETAILS), fd.resolve()
            }
            trackHardAskShownEvents() {
                var e;
                Zn.set(Ee.OPT_IN_SHOWN_TIME, Date.now()), null === (e = We()) || void 0 === e || e.trackEvent(Q.OPT_IN_SHOWN), ii.broadcastToWindow({
                    topic: S,
                    name: P
                }), cd.runCallbacks(P), ii.deprecatedSdkCallback("opt_in_shown")
            }
            askPermission() {
                return new jn.VR((e, t) => {
                    var n;
                    this.trackHardAskShownEvents(), null === (n = window.Notification) || void 0 === n || n.requestPermission().then(t => {
                        e(Ed.parsePermissionState(t))
                    }).catch(e => {
                        t(sd)
                    })
                })
            }
            registerServiceWorker() {
                const e = Ed.baseLogTag + ".registerServiceWorker";
                return "chrome-extension:" === window.location.protocol ? navigator.serviceWorker.ready : (null != this.swRegisterPromise || (this.swRegisterPromise = new jn.VR((t, n) => {
                    if (Ed.registeredServiceWorker) t(Ed.registeredServiceWorker);
                    else if ("serviceWorker" in navigator) {
                        let i = "serviceworker.js",
                            r = !1;
                        if (Dt.get() && null != Dt.get().swPath && (i = Dt.get().swPath, r = !0), "/" === i[0] || i.startsWith("http") || (i = "/" + i), Lt()) pi.log(1, e, "Removing scope in case of shopify."), this.registerScopedSW(i, /moengage/, t, n);
                        else {
                            let a = "/";
                            Dt.get() && null != Dt.get().swScope ? (a = Dt.get().swScope, "string" != typeof a || "" === a.trim() || /^["'].*["']$/.test(a.trim()) ? pi.warnAndBroadcast(1, e, X, "Service worker scope is invalid", `The configured swScope "${a}" is invalid (empty, whitespace-only, or contains extra quotes). Please provide a valid scope string such as "/".`, ne.WEB_PUSH) : Ed.canSwBeRegisteredWithScope(a) || pi.warnAndBroadcast(1, e, X, ct, `swScope "${a}" does not include the current page (${window.location.href}). Web push will not work on this page.`, ne.WEB_PUSH), this.registerScopedSW(i, a, t, n)) : (r && (pi.log(1, e, "Using user defined path to serviceworker:", i), a = i.substr(0, i.lastIndexOf("/") + 1), Ed.canSwBeRegisteredWithScope(a) || (pi.errorAndBroadcast(1, e, X, "Service worker could not be registered.", "Service worker can only be registered from same directory or child directory.", ne.WEB_PUSH), n(od))), navigator.serviceWorker.register(i, {
                                scope: a
                            }).then(i => {
                                pi.log(2, e, ut), navigator.serviceWorker.ready.then(n => {
                                    pi.log(2, e, gt), Ed.registeredServiceWorker = n, Dt.get() && Dt.get().forceSwUpdate && n.update(), vd(n), t(n)
                                }).catch(t => {
                                    Ed.broadcastSwRegFailure(e, t), n(rd)
                                })
                            }).catch(t => {
                                Ed.broadcastSwRegFailure(e, t), n(rd)
                            })), pi.log(1, e, "Scope for serviceworker:", a)
                        }
                    } else pi.errorAndBroadcast(1, e, X, "Service worker not supported", "This browser does not support serviceworkers. Web push will not work.", ne.PUSH_COMPATIBILITY_MATRIX), n("Service worker not supported")
                })), this.swRegisterPromise)
            }
            registerScopedSW(e, t, n, i) {
                const r = Ed.baseLogTag + ".registerScopedSW";
                navigator.serviceWorker.register(e).then(e => {
                    pi.log(2, r, ut), navigator.serviceWorker.getRegistrations().then(e => {
                        e.forEach(e => {
                            (0, jn.pS)(() => {
                                e.active && e.active.scriptURL.match(t) ? (pi.log(2, r, gt), Ed.registeredServiceWorker = e, Dt.get() && Dt.get().forceSwUpdate && e.update(), vd(e), n(e)) : e.active && pi.warnAndBroadcast(1, r, X, ct, `Registered service worker script URL "${e.active.scriptURL}" does not match the configured scope "${t}". Web push will not work on this page.`, ne.WEB_PUSH)
                            }, 100)
                        })
                    }).catch(e => {
                        Ed.broadcastSwRegFailure(r, e), i(rd)
                    })
                }).catch(e => {
                    Ed.broadcastSwRegFailure(r, e), i(rd)
                })
            }
            static broadcastSwRegFailure(e, t) {
                const n = "string" == typeof t ? t : JSON.stringify(t);
                pi.errorAndBroadcast(1, e, X, "Service worker could not be registered", `Error registering service worker. Please check your web push setup: ${n}`, ne.WEB_PUSH)
            }
            static canSwBeRegisteredWithScope(e) {
                return !((n = window.location.pathname).indexOf(t = e) < 0) && n.substring(n.indexOf(t)).length >= 0;
                var t, n
            }
            static isWebPushSupported() {
                return new jn.VR(e => {
                    Ar.getInstance().then(t => {
                        e(!t.isIncognito && Wr() && t.isWebPushCompatible())
                    })
                })
            }
            static parsePermissionState(e) {
                return "prompt" === e ? Za : "granted" === e ? es : "denied" === e ? ts : "default" === e ? ns : null
            }
            showNotification(e) {
                const t = Ed.baseLogTag + ".showNotification";
                this.registerServiceWorker().then(n => {
                    e ? e.title ? e.body ? (null == e.requireInteraction && (e.requireInteraction = !0), n.showNotification(e.title, e)) : pi.error(1, t, "Notification body can not be blank") : pi.error(1, t, "Notification title can not be blank") : pi.error(1, t, "Notification object can not be blank")
                }).catch(e => {
                    Ed.broadcastSwRegFailure(t, e)
                })
            }
            showOverlay() {
                if (this.sdkSettings.toShowOverlay && this.sdkSettings.optInType === ms.ONE_STEP) {
                    const e = document.createElement("div");
                    e.id = "moe-push-div", e.style.display = "none", e.className = "moe-push-class", Ar.getInstance().then(t => Ve(this, void 0, void 0, function*() {
                        e.innerHTML = t.isMobile ? (yield jr(this.sdkSettings.overlay, this.sdkSettings.isBrandingHidden)).mobileUI : (yield jr(this.sdkSettings.overlay, this.sdkSettings.isBrandingHidden)).webUI, e.innerHTML = yo(e.innerHTML);
                        const n = document.body.firstChild;
                        n.parentNode.insertBefore(e, n);
                        const i = document.getElementById(t.isMobile ? "moe-branding-mobile-link" : "moe-branding-desktop-link");
                        i && i.addEventListener("click", e => {
                            window.open("https://moengage.com/web-push/?utm_source=moengage_branding&utm_medium=webpush", "_blank"), e.stopPropagation(), e.preventDefault()
                        });
                        const r = t.name;
                        let a;
                        if (r === Ar.BROWSER_NAMES.CHROME || r === Ar.BROWSER_NAMES.OPERA_NEON ? a = document.getElementsByClassName("moe_chrome") : r === Ar.BROWSER_NAMES.FIREFOX ? a = document.getElementsByClassName("moe_firefox") : (r === Ar.BROWSER_NAMES.OPERA || r === Ar.BROWSER_NAMES.SAFARI) && (a = document.getElementsByClassName("moe_opera")), 0 === a.length) document.getElementById("moe-push-div").style.display = "none";
                        else
                            for (let e = a.length - 1; e >= 0; e--) a[e].style.display = "block";
                        this.overlayTimer = (0, jn.pS)(() => {
                            "" === e.style.opacity && (e.style.display = "block")
                        }, 1500), e.addEventListener("click", () => {
                            this.hideOverlay()
                        })
                    }))
                }
            }
            hideOverlay() {
                (0, jn.Kj)(this.overlayTimer), ud()
            }
        }
        Ed.baseLogTag = "HTTPS-NotificationManager";
        const Sd = Ed;
        var yd = n(634).VR;
        const _d = "Web push settings not configured on MoEngage dashboard: " + ie;
        class bd {
            constructor(e, t) {
                this.currentManager = null;
                const n = bd.baseLogTag + ".constructor";
                this.config = e, this.browser = t, this.browser.isWebPushCompatible() ? e.webPushPlatformData.chrome && (e.isWebPushEnabled ? "https" === function() {
                    if (window) {
                        if ("localhost" === window.location.hostname) return "https";
                        if ("http:" === window.location.protocol) return "http";
                        if ("https:" === window.location.protocol) return "https";
                        if ("chrome-extension:" === window.location.protocol) return "https"
                    }
                }() ? this.currentManager = new Sd(e) : pi.errorAndBroadcast(1, n, X, "Web Push does not work in http mode", "Web Push does not work in http mode. Please use web push in https mode.") : (Lt() && new Sd(e), pi.warnAndBroadcast(1, n, X, dt, "Web push settings not configured. Please configure at " + ie, ne.WEB_PUSH))) : this.browser.name === Ar.BROWSER_NAMES.SAFARI && "safari" in window && "pushNotification" in window.safari && (this.currentManager = null, pi.warnAndBroadcast(1, n, X, "Web push is not supported", "Web push for Safari is only supported on Safari 16 and above.", ne.PUSH_COMPATIBILITY_MATRIX))
            }
            showHardAsk() {
                const e = bd.baseLogTag + ".showHardAsk";
                return new jn.VR((t, n) => {
                    this.getCurrentPermissionState().then(i => {
                        null != this.currentManager ? i === Za ? this.currentManager.showHardAsk().then(n => {
                            var i, r, a, s;
                            n.state === ns ? (null === (i = We()) || void 0 === i || i.trackEvent(Q.OPT_IN_DISMISSED), ii.broadcastToWindow({
                                topic: S,
                                name: N
                            }), ii.deprecatedSdkCallback("opt_in_dismissed"), cd.runCallbacks(N), pi.log(1, e, "Hard ask was dismissed")) : n.state === es ? (null === (r = We()) || void 0 === r || r.trackEvent(Q.OPT_IN_ALLOWED), ii.broadcastToWindow({
                                topic: S,
                                name: M,
                                data: n.subscriptionDetails
                            }), ii.deprecatedSdkCallback("opt_in_allowed"), cd.runCallbacks(M), pi.log(1, e, "Push permission was granted")) : n.state === ts && (null === (a = We()) || void 0 === a || a.trackEvent(Q.OPT_IN_BLOCKED), null === (s = We()) || void 0 === s || s.trackEvent("Web Push Opt-in Denied"), ii.broadcastToWindow({
                                topic: S,
                                name: B
                            }), ii.deprecatedSdkCallback("opt_in_blocked"), cd.runCallbacks(B), pi.log(1, e, "Notification permission was denied")), t(n)
                        }).catch(n => {
                            pi.errorAndBroadcast(1, e, ee, "Could not show hard ask", `Error in showing hard ask: ${"string"==typeof n?n:JSON.stringify(n)}`, void 0, n), t({
                                state: i,
                                subscriptionDetails: null
                            })
                        }) : (pi.log(1, e, "Not showing Hard Ask as current permission state is", i), this.getPushTokenDetails().then(n => {
                            pi.customLabel(1, e, "token", n.token), t({
                                state: i,
                                subscriptionDetails: n
                            })
                        }).catch(n => {
                            pi.warnAndBroadcast(1, e, ee, lt, "Could not get push token details"), t({
                                state: i,
                                subscriptionDetails: null
                            })
                        })) : (pi.warn(1, e, "MoEngage web push settings not configured. Please configure at", ie), n(ad))
                    }).catch(e => {
                        n(e)
                    })
                })
            }
            getCurrentPermissionState() {
                return null != this.currentManager ? this.currentManager.getCurrentPermissionState() : yd.reject(_d)
            }
            getPushTokenDetails() {
                return null != this.currentManager ? this.currentManager.getPushTokenDetails() : yd.reject(_d)
            }
            removeToken() {
                return null != this.currentManager ? this.currentManager.removeToken() : yd.reject(_d)
            }
            showNotification(e) {
                const t = bd.baseLogTag + ".showNotification";
                if (null != this.currentManager) return this.currentManager.showNotification(e);
                pi.warnAndBroadcast(1, t, X, dt, _d, ne.WEB_PUSH)
            }
        }
        bd.baseLogTag = "NotificationManager";
        const Td = bd;
        class Id {
            constructor(e) {
                this.mainDivs = [], this.config = e
            }
            showSoftAsk() {
                const e = Id.baseLogTag + ".showSoftAsk";
                return new jn.VR((t, n) => {
                    let i = this.config.loadTime;
                    Ar.getInstance().then(n => {
                        (this.config.optInType === ms.SELF_HANDLED || n.isSafari() && this.config.optInType === ms.ONE_STEP) && (i = 0), i && pi.log(1, e, "Delay of", i, " second(s) requested before opt-in flow"), (0, jn.pS)(() => {
                            if (!n.isWebPushCompatible() || this.config.optInType !== ms.TWO_STEP && this.config.optInType !== ms.SELF_HANDLED) Zn.set(Ee.SOFT_ASK_STATUS, wd.NOT_SHOWN), t({
                                showHardAsk: !0,
                                softAskState: wd.NOT_SHOWN
                            });
                            else {
                                const n = () => {
                                        var t;
                                        pi.log(1, e, "Soft ask was shown"), null === (t = We()) || void 0 === t || t.trackEvent(Q.WEB_OPTIN_BANNER_LOAD), Zn.set(Ee.OPT_IN_SHOWN_TIME, Date.now()), Zn.set(Ee.SOFT_ASK_STATUS, wd.SHOWN), ii.broadcastToWindow({
                                            topic: S,
                                            name: U
                                        }), ii.deprecatedSdkCallback("soft_ask_shown"), cd.runCallbacks(U)
                                    },
                                    i = () => {
                                        var n;
                                        null === (n = We()) || void 0 === n || n.trackEvent(Q.WEB_OPTIN_ACCEPTED), this.hideOptIn(), fl(), pi.log(1, e, "Soft ask was allowed"), Zn.set(Ee.SOFT_ASK_STATUS, wd.ALLOWED), t({
                                            showHardAsk: !0,
                                            softAskState: wd.ALLOWED
                                        }), ii.broadcastToWindow({
                                            topic: S,
                                            name: F
                                        }), ii.deprecatedSdkCallback("soft_ask_allowed"), cd.runCallbacks(F)
                                    },
                                    r = () => {
                                        var n;
                                        this.hideOptIn(), fl(), null === (n = We()) || void 0 === n || n.trackEvent(Q.WEB_OPTIN_CLOSED), pi.log(1, e, "Soft ask was dismissed"), Zn.set(Ee.SOFT_ASK_STATUS, wd.DISMISSED), t({
                                            showHardAsk: !1,
                                            softAskState: wd.DISMISSED
                                        }), ii.broadcastToWindow({
                                            topic: S,
                                            name: x
                                        }), ii.deprecatedSdkCallback("soft_ask_closed"), cd.runCallbacks(x)
                                    };
                                this.showOptIn(n, i, r, e => {
                                    e = !!e, this.hideOptIn(), t({
                                        showHardAsk: e,
                                        softAskState: wd.NOT_SHOWN
                                    })
                                })
                            }
                        }, 1e3 * i)
                    })
                })
            }
            showOptIn(e, t, n, i) {
                const r = Id.baseLogTag + ".showOptIn";
                if (this.config.optInType === ms.TWO_STEP) {
                    let a = document.getElementById("moe-push-div");
                    null == a && (a = document.createElement("div"), a.id = "moe-push-div", a.className = "moe-push-class"), Ar.getInstance().then(s => {
                        let o = null;
                        if (o = s.isMobile ? $r(this.config.optInPreview, this.config.isBrandingHidden).mobileUI : $r(this.config.optInPreview, this.config.isBrandingHidden).webUI, o = yo(o), null != o) {
                            a.innerHTML = o;
                            const s = document.body.firstChild;
                            null == s || s.parentNode.insertBefore(a, s), this.moeDiv = a;
                            const l = a.firstElementChild;
                            l && (l.tabIndex = 0, l.setAttribute("role", "alert"), l.setAttribute("aria-live", "polite"), Sl(a.firstElementChild));
                            const d = document.getElementById("optInText") || document.getElementById("optInTextConventional"),
                                c = document.getElementById("moe-dontallow_button");
                            null == d ? (pi.errorAndBroadcast(1, r, X, "Could not show soft ask", "Error showing soft ask. Allow button id is missing", ne.SELF_HANDLED_WEB_PUSH), i()) : (e(), d.addEventListener("click", () => {
                                t()
                            }), c ? c.addEventListener("click", () => {
                                n()
                            }) : window.moeRemoveBanner = () => {
                                n()
                            })
                        } else pi.errorAndBroadcast(1, r, ee, "Could not display soft ask", "Some error occurred while displaying soft ask"), i()
                    })
                } else if (this.config.optInType === ms.SELF_HANDLED) {
                    const a = Dt.get();
                    if (a.customSoftAsk) {
                        const s = document.getElementsByClassName(a.customSoftAsk.mainClass),
                            o = document.getElementsByClassName(a.customSoftAsk.allowClass),
                            l = document.getElementsByClassName(a.customSoftAsk.dismissClass);
                        if (s.length < 1) pi.errorAndBroadcast(1, r, X, "Could not find main class for the soft ask", `Could not find main class for the soft ask. Class name given: ${a.customSoftAsk.mainClass}`, ne.SELF_HANDLED_WEB_PUSH), Ar.getInstance().then(e => {
                            e.isWebPushCompatible() && (pi.warn(1, r, "Proceeding to hard ask directly"), i(!0))
                        });
                        else {
                            e(), o.length < 1 && (pi.warnAndBroadcast(1, r, X, "Could not find allow button for the soft ask", `Could not find any element for allow button. Class name given: ${a.customSoftAsk.allowClass}`, ne.SELF_HANDLED_WEB_PUSH), pi.warn(1, r, "Docs for self-handled opt in available here - ", ne.SELF_HANDLED_WEB_PUSH)), l.length < 1 && pi.warnAndBroadcast(1, r, X, "Could not find dismiss button for the soft ask", `Could not find any element for dismiss button. Class name given: ${a.customSoftAsk.dismissClass}`, ne.SELF_HANDLED_WEB_PUSH);
                            for (let e = s.length - 1; e >= 0; e--) {
                                const t = s[e];
                                this.mainDivs.push(t), t.style.display = "block", Sl(t)
                            }
                            for (let e = o.length - 1; e >= 0; e--) o[e].addEventListener("click", () => {
                                t()
                            });
                            for (let e = l.length - 1; e >= 0; e--) l[e].addEventListener("click", () => {
                                n()
                            })
                        }
                    } else Ar.getInstance().then(e => {
                        e.isWebPushCompatible() ? (pi.warn(1, r, "No soft ask configured. Proceeding to hard ask directly. \n\nYou can ignore this message if you do not want any soft ask."), i(!0)) : (pi.error(1, r, "Soft ask needs to be present in case of http implementation. Can not show hard ask otherwise."), i())
                    })
                }
            }
            hideOptIn() {
                null != this.moeDiv && (this.moeDiv.style.display = "none"), this.mainDivs.length > 0 && this.mainDivs.map(e => {
                    e.style.display = "none"
                })
            }
            static cleanup() {
                const e = Id.baseLogTag + ".cleanup",
                    t = document.getElementById("moe-push-div");
                t ? (t.remove(), pi.log(2, e, "Removed moe-push-div element on logout")) : pi.log(2, e, "moe-push-div element not found, nothing to cleanup")
            }
        }
        Id.baseLogTag = "SoftAskManager";
        const Ad = Id,
            wd = {
                SHOWN: "shown",
                NOT_SHOWN: "not shown",
                ALLOWED: "allowed",
                DISMISSED: "dismissed"
            };
        class Od {
            constructor(e, t) {
                this.notificationManager = null, this.softAskManager = null, this.sdkSettings = e, this.browser = t, this.softAskManager = new Ad(this.sdkSettings), this.notificationManager = new Td(this.sdkSettings, t),
                    function() {
                        Dd.handleSdkDisableListener || (window.addEventListener(S, e => Ve(this, void 0, void 0, function*() {
                            var t;
                            (null === (t = null == e ? void 0 : e.detail) || void 0 === t ? void 0 : t.name) === I && ud()
                        })), Dd.handleSdkDisableListener = !0)
                    }()
            }
            handleUnsubscribe(e = Za) {
                const t = Od.baseLogTag + ".handleUnsubscribe";
                ga.get().then(n => {
                    var i;
                    n.deviceAdded = (null === (i = this.sdkSettings) || void 0 === i ? void 0 : i.isPushSubBilling) ? Jr.shouldTriggerSubscriberBilling({
                        sdkSettings: this.sdkSettings,
                        user: n,
                        pushToken: null
                    }) || !!fa() : n.deviceAdded, n.save().then(() => {
                        this.notificationManager.removeToken().then(() => {
                            var n, i;
                            null === (n = We()) || void 0 === n || n.trackEvent(Q.DEVICE_ATTRIBUTE, {
                                [c]: !1
                            }), null === (i = We()) || void 0 === i || i.trackEvent(Q.PERMISSION_BLOCKED), e === ts ? (Zn.set(Ee.HARD_ASK_STATUS, e), pi.log(1, t, "Not asking for permission as current state is denied.")) : (Zn.remove(Ee.OPT_IN_SHOWN_TIME), Zn.remove(Ee.HARD_ASK_STATUS), Zn.remove(Ee.SOFT_ASK_STATUS), this.sdkSettings.optInType !== ms.SELF_HANDLED && this.startPushSubscription())
                        })
                    })
                })
            }
            callWebPush() {
                const e = Od.baseLogTag + ".callWebPush";
                (function(e, t) {
                    var n;
                    return !(null === (n = Dt.get()) || void 0 === n ? void 0 : n.disableWebPush) && e.isWebPushEnabled && ke.includes(t.name) && navigator.serviceWorker && "PushManager" in window && "Notification" in window
                })(this.sdkSettings, this.browser) && this.notificationManager.getCurrentPermissionState().then(t => Ve(this, void 0, void 0, function*() {
                    var n;
                    const i = yield Ar.getInstance(), r = Hr(), a = t === ts && !this.sdkSettings.isDomainLevelStorage;
                    if (null == r && t !== ts) this.startPushSubscription();
                    else if (null != r && (a || i.isSafari() && t === Za)) pi.log(1, e, "User has removed the permission"), i.isSafari() && t === Za && (Zn.set(ld, !0), t = ts), this.handleUnsubscribe(t);
                    else if (a) pi.warnAndBroadcast(1, e, ee, "Current web push subscription state is denied", "Not proceeding with push subscription as current state is denied");
                    else if (null != r && t === es) this.browser.name === Ar.BROWSER_NAMES.CHROME ? Ct(this.sdkSettings.webPushPlatformData, this.browser) ? this.startPushSubscription() : pi.warnAndBroadcast(1, e, X, "Subscription mode is not VAPID type", "Subscription mode is not VAPID type. Cannot subscribe to web push.") : this.startPushSubscription();
                    else if (this.sdkSettings.isDomainLevelStorage)
                        if ($n.get(Ee.HARD_ASK_STATUS) === es) {
                            const i = null === (n = $n.get(Ee.SUBSCRIPTION_DETAILS)) || void 0 === n ? void 0 : n.domain;
                            i && i === window.location.origin ? (pi.log(1, e, "It seems that the user has unsubscribed manually. Starting push subscription.."), this.handleUnsubscribe(t)) : pi.log(1, e, "Not showing opt-in as user subscribed to sub-domain")
                        } else this.startPushSubscription();
                    else this.handleUnsubscribe()
                })).catch(t => {
                    pi.errorAndBroadcast(1, e, ee, "Could not get current web push subscription state", `Error in getting current state: ${t}`, void 0, t)
                })
            }
            startPushSubscription() {
                const e = Od.baseLogTag + ".startPushSubscription",
                    t = () => {
                        Zn.set(Ee.HARD_ASK_STATUS, Za);
                        const t = Hr();
                        this.notificationManager.showHardAsk().then(n => {
                            Zn.set(Ee.HARD_ASK_STATUS, n.state), n.state === es && (null != n.subscriptionDetails.token ? (Zn.set(Ee.PUSH_TOKEN, n.subscriptionDetails.token), n.subscriptionDetails.domain = window.location.origin, Zn.set(Ee.SUBSCRIPTION_DETAILS, n.subscriptionDetails), n.subscriptionDetails.token && t !== n.subscriptionDetails.token && as.deviceAdd().then(() => {
                                var i, r, a, s;
                                pi.log(1, e, "Push subscription successful, device registered."), (null === (i = ga.getSync()) || void 0 === i ? void 0 : i.subscribedToOldSdk) || (null != t ? null === (r = We()) || void 0 === r || r.setUserAttribute("Web Migrated User", "true") : null === (a = We()) || void 0 === a || a.setUserAttribute("Web Subscription URL", location.href), null === (s = We()) || void 0 === s || s.trackEvent(Q.PERMISSION_ALLOWED, {
                                    MOE_WEB_PUSH_TOKEN: n.subscriptionDetails.token,
                                    migrated_user: !!window.location.search.includes("moe_migration=true") || void 0
                                }))
                            }), this.sdkSettings.isDomainLevelStorage && $n.set(Ee.SUBSCRIPTION_DETAILS, {
                                domain: n.subscriptionDetails.domain,
                                token: n.subscriptionDetails.token,
                                endpoint: n.subscriptionDetails.endpoint,
                                keys: n.subscriptionDetails.keys
                            })) : pi.errorAndBroadcast(1, e, ee, lt, "Push token was received as null. Please contact MoEngage support if this troubleshooting does not solve the issue."))
                        }).catch(t => {
                            pi.errorAndBroadcast(1, e, ee, "Could not complete push subscription", "Error during push subscription", void 0, t)
                        })
                    },
                    n = () => {
                        Gr().then(({
                            pushSupported: n,
                            likelyPrivateMode: i
                        }) => {
                            n ? i ? pi.log(2, e, "Incognito tab detected — not showing soft ask") : this.softAskManager ? this.softAskManager.showSoftAsk().then(e => {
                                e.showHardAsk && t()
                            }) : pi.error(1, e, "SoftAskManager not set.") : pi.log(2, e, "Push not supported — not showing soft ask")
                        }).catch(t => {
                            pi.warn(1, e, "Error detecting push capability:", t)
                        })
                    };
                this.notificationManager.getCurrentPermissionState().then(i => {
                    if (i === es) this.sdkSettings.optInType !== ms.ONE_STEP && pi.remoteLogTracking(1, "info", e, "Skipping soft ask as browser permission is set to allow all notifications"), Gr().then(({
                        likelyPrivateMode: n
                    }) => {
                        n ? pi.log(2, e, "Incognito tab detected — not showing hard ask") : t()
                    }).catch(() => {
                        t()
                    });
                    else if (i !== ts) {
                        const t = parseInt(Zn.get(Ee.OPT_IN_SHOWN_TIME)),
                            i = (Date.now() - t) / 36e5;
                        if (!t || this.sdkSettings.optInType === ms.SELF_HANDLED || i > this.sdkSettings.promptAgain)
                            if (this.browser.name === Ar.BROWSER_NAMES.SAFARI && this.sdkSettings.optInType === ms.ONE_STEP) {
                                pi.log(1, e, "1 step optin configured. In Safari 16+ and macOS 13+, the web push optin will be shown after a user click. Any delay will be ignored.");
                                const t = () => {
                                    window.removeEventListener("click", t), n()
                                };
                                window.addEventListener("click", t)
                            } else n();
                        else {
                            let n, r;
                            i < 1 ? (n = Math.floor(60 * i), r = "minute(s)") : (n = Math.floor(100 * i) / 100, r = "hour(s)"), pi.remoteLogTracking(1, "info", e, "Not showing opt in as last it was shown", n, r, "back on", new Date(t), ". Reappear time is set to", this.sdkSettings.promptAgain, "hours.")
                        }
                    } else pi.log(2, e, "Not showing opt-in as permission is denied."), Zn.set(Ee.HARD_ASK_STATUS, i)
                })
            }
            getPermissionState() {
                return this.notificationManager.getCurrentPermissionState()
            }
            showNotification(e) {
                this.notificationManager && this.notificationManager.showNotification(e)
            }
            trackPushOptedDeviceAttribute() {
                return new jn.VR(e => {
                    var t;
                    const n = Zn.get(Ee.OPTED_STATUS_TRACK_TIME);
                    if (n && Date.now() - n > 864e5) {
                        const e = Hr();
                        null === (t = We()) || void 0 === t || t.trackEvent(Q.DEVICE_ATTRIBUTE, {
                            [c]: !!e
                        }), Zn.set(Ee.OPTED_STATUS_TRACK_TIME, Date.now())
                    }
                    e(null)
                })
            }
        }
        Od.baseLogTag = "WebPushManager", Od.handleSdkDisableListener = !1;
        const Dd = Od;
        class Rd {
            constructor() {
                this.customSoftAsk = null
            }
            static get() {
                return xe.get(Se)
            }
            static save(e) {
                xe.set(Se, e), Zn.set(Ee.INIT_DATA, e)
            }
            static setSoftAskConfig(e) {
                const t = this.baseLogTag + ".setSoftAskConfig",
                    n = Rd.get();
                null != Me(e, "soft_ask", null) && pi.warn(2, t, Je("soft_ask", "softAsk")), null != Me(e, "main_class", null) && pi.warn(2, t, Je("main_class", "mainClass")), null != Me(e, "allow_class", null) && pi.warn(2, t, Je("allow_class", "allowClass")), null != Me(e, "block_class", null) && pi.warn(2, t, Je("block_class", "dismissClass"));
                const i = {
                    mainClass: Me(e, "main_class", Me(e, "mainClass", null)),
                    allowClass: Me(e, "allow_class", Me(e, "allowClass", null)),
                    dismissClass: Me(e, "block_class", Me(e, "dismissClass", null))
                };
                Rd.save(Object.assign(Object.assign({}, n), {
                    customSoftAsk: i
                }))
            }
        }
        Rd.baseLogTag = "PushInitData";
        const Cd = Rd;
        class Ld {
            initialize(e) {
                const t = Ld.baseLogTag + ".initialize";
                Ld.handlePublicFunctions(), Ld.handleLogout(), Ar.getInstance().then(n => {
                    const i = new Dd(e, n);
                    i && Rt(e, n) ? ([ms.ONE_STEP, ms.TWO_STEP].indexOf(e.optInType) >= 0 ? i.callWebPush() : (pi.log(1, t, "Self handled setting. Will show opt-in on manual invocation, if required."), i.getPermissionState().then(e => {
                        const n = Hr();
                        null != n && e === Za ? (pi.log(1, t, "Token exists but permission is prompt. Handling unsubscribe to clean up stale token."), i.handleUnsubscribe(e)) : (e === es || null != n && e === ts) && (e === es && pi.log(1, t, "Notification permission already granted. Proceeding to subscribe the user"), i.callWebPush())
                    }).catch(e => {
                        pi.warnAndBroadcast(1, t, ee, "Push subscription state not found", "Cannot get permission state: ", void 0, e)
                    })), i.trackPushOptedDeviceAttribute()) : ke.includes(n.name) || pi.warnAndBroadcast(1, t, X, "Web push not supported on this browser", "Web push not supported on this browser. Supported browsers are:\n\t\t1. Google Chrome\n\t\t2. Mozilla Firefox\n\t\t3. Opera\n\t\t4. Edge\n\t\t5. Safari 16 and above + macOS 13 and above", ne.PUSH_COMPATIBILITY_MATRIX)
                })
            }
            static getPermissionState(e) {
                return new jn.VR((t, n) => {
                    Qr().then(i => {
                        Ar.getInstance().then(r => {
                            new Dd(i, r).getPermissionState().then(n => {
                                t(n), e && e(null, n)
                            }).catch(t => {
                                n(t), e && e(t, null)
                            })
                        })
                    }).catch(t => {
                        n(t), e && e(t, null)
                    })
                })
            }
            static handlePublicFunctions() {
                const e = We();
                e.callWebPush = Ld.callWebPush, e.call_web_push = Ld.callWebPush, e.showNotification = Ld.showNotification, e.getPermissionState = Ld.getPermissionState
            }
            static callWebPush(e) {
                const t = Ld.baseLogTag + ".callWebPush";
                ti() ? Qr().then(n => {
                    n.isWebPushEnabled ? n.optInType === ms.SELF_HANDLED ? (pi.log(1, t, "Starting web push functions"), null != e && Cd.setSoftAskConfig(e), Ar.getInstance().then(e => {
                        new Dd(n, e).callWebPush()
                    })) : (pi.warn(1, t, "This feature can only be used when you have chosen self-handled approach in the dashboard. You can check dashboard here:", ie), pi.broadcastLog(X, "Self-handled web push optin not configured", "This feature can only be used when you have chosen self-handled approach in the dashboard. You can check the settings here: " + ie, ne.SELF_HANDLED_WEB_PUSH)) : pi.warn(1, t, "Web push settings not configured on dashboard yet. To start web push subscriptions, please configure the settings on dashboard.")
                }).catch(e => {
                    pi.error(1, t, "Error in getting Web SDK Settings. This might indicate that the App is blocked.", e)
                }) : pi.warn(1, t, "Cannot initiate web push as Web SDK has been disabled.")
            }
            static showNotification(e) {
                Qr().then(t => {
                    Ar.getInstance().then(n => {
                        new Dd(t, n).showNotification(e)
                    })
                }).catch(e => {})
            }
            static handleLogout() {
                if (Ld.logoutListenerRegistered) return;
                const e = Ld.baseLogTag + ".handleLogout";
                window.addEventListener("USER_ACTIONS", t => {
                    "LOGOUT_COMPLETED" === t.detail.name && (pi.log(2, e, "Logout completed, cleaning up push resources"), Ad.cleanup())
                }), Ld.logoutListenerRegistered = !0
            }
        }
        Ld.baseLogTag = "PushModule", Ld.logoutListenerRegistered = !1;
        const Pd = Ld;

        function Nd(e) {
            return !(!e || "object" != typeof e) && ["moe_offering_id", "moe_offering_name", "moe_offering_type", "moe_decision_policy_id", "moe_decision_policy_name"].every(t => t in e && "string" == typeof e[t] && "" !== e[t].trim())
        }

        function kd(e) {
            return !(!e || "object" != typeof e) && ["cid", "moe_locale_id", "moe_variation_id"].every(t => t in e && "string" == typeof e[t] && "" !== e[t].trim())
        }

        function Md(e, t) {
            if (e && "object" == typeof e && !Array.isArray(e)) return e;
            if ("string" == typeof e) try {
                const n = JSON.parse(e);
                return n && "object" == typeof n && !Array.isArray(n) ? n : (pi.error(2, t, "Parsed JSON is not a valid object"), null)
            } catch (e) {
                return pi.error(2, t, ot, e), null
            }
            return null
        }
        var Bd = n(634).VR;
        class Ud {
            constructor() {
                this.initialize = () => {
                    We().personalize = {
                        trackClick: this.trackClick,
                        trackImpression: this.trackImpression,
                        onUpdateDeviceId: this.onUpdateDeviceId,
                        offeringClicked: this.offeringClicked,
                        offeringShown: this.offeringShown
                    }, Ud.setupFetchExperiencesFunction()
                }, this.getDeviceUniqueId = e => {
                    window.addEventListener(S, t => {
                        t.detail.name === b && e(t.detail.data)
                    })
                }, this.onUpdateDeviceId = e => {
                    this.getDeviceUniqueId(e)
                }, this.offeringClicked = (e, t) => Ud.track(e, "MOE_OFFERING_CLICKED", Nd, "Invalid offering context, missing required fields", t), this.offeringShown = (e, t) => Ud.track(e, "MOE_OFFERING_SHOWN", Nd, "Invalid offering context, missing required fields", t), this.trackClick = (e, t) => Ud.track(e, "MOE_WEBP_MESSAGE_CLICKED", kd, "Invalid experience context, missing required fields", t), this.trackImpression = (e, t) => Ud.track(e, "MOE_WEBP_MESSAGE_SHOWN", kd, "Invalid experience context, missing required fields", t)
            }
        }
        Ud.baseLogTag = "Web Personalization Tracking", Ud.setupFetchExperiencesFunction = () => {
            const e = () => {
                const e = We();
                e && e.personalize && (e.personalize.fetchExperiences = window.MoeWebP.fetchExperiences, e.personalize.resetPageState = window.MoeWebP.resetPageState, e.personalize.simulateDecisionPolicy = window.MoeWebP.simulateDecisionPolicy)
            };
            window.MoeWebP && window.MoeWebP.fetchExperiences ? e() : window.addEventListener(S, t => {
                t.detail.name === R && e()
            })
        }, Ud.track = (e, t, n, i, r) => {
            const a = Ud.baseLogTag + ".track",
                s = Md(e, a);
            if (!s) return pi.error(2, a, "Invalid context"), Bd.reject(new Error("Invalid context"));
            if (!n(s)) return pi.error(2, a, i), Bd.reject(new Error(i));
            const o = r && Md(r, a) || {},
                l = Object.assign(Object.assign({}, s), o);
            try {
                const e = We();
                return (null == e ? void 0 : e.initialized) ? (pi.log(2, a, t + ": Event Tracked"), e.trackEvent(t, l)) : (window.moengage_q = window.moengage_q || []).push({
                    f: "trackEvent",
                    a: [t, l]
                }), Bd.resolve()
            } catch (e) {
                return pi.error(1, a, "Failed tracking expression", e), Bd.reject(e)
            }
        };
        const xd = Ud;
        class Fd {
            constructor() {
                Fd.handleEventListeners()
            }
            static loadModule(e) {
                return null != Fd.loadPromises[e.name] || (Fd.loadPromises[e.name] = new jn.VR((t, n) => {
                    ! function(n) {
                        if (document) {
                            const i = document.createElement("script");
                            i.setAttribute("src", yo(n)), i.addEventListener("load", (...n) => {
                                const i = new(0, window[fe[e.name].windowLocation])(Dt.get());
                                t(i)
                            }), i.async = !0, document.body.appendChild(i)
                        }
                    }(e.src)
                })), Fd.loadPromises[e.name]
            }
            static enableOSM() {
                return Ve(this, void 0, void 0, function*() {
                    const e = We();
                    if (void 0 !== e.onsite.OnsiteApiClient) return;
                    if (e.onsite && e.onsite.initializationPromise) return void(yield e.onsite.initializationPromise);
                    const t = Dt.get();
                    We().onsite = new nd(t), window[Ai] = nd, window.MoeOsm = {
                        trackEvent(e, t, n, i) {
                            const r = Rl(e);
                            if ({}.constructor === n.constructor && r) {
                                const e = Object.assign(Object.assign({
                                    campaign_id: r.campaignId,
                                    campaign_name: r.campaignName
                                }, r.campaignContext), n);
                                return window.Moengage.trackEvent(t, e)
                            }
                            return Ol.resolve()
                        },
                        trackClick(e, t) {
                            const n = Rl(e);
                            return n ? window.Moengage.onsite.displayManager.clickTracker(n, "OSM", {
                                widget_id: t
                            })() : Ol.resolve()
                        },
                        trackDismiss(e, t = !1) {
                            const n = Rl(e);
                            return n ? window.Moengage.onsite.displayManager.dismissEvent(n, "OSM", t) : Ol.resolve()
                        },
                        setAlias: e => window.Moengage.update_unique_user_id(e),
                        setUniqueId: e => window.Moengage.add_unique_user_id(e),
                        identifyUser: e => window.Moengage.identifyUser(e),
                        destroySession: () => window.Moengage.logoutUser(),
                        setUserName: e => window.Moengage.setUserName(e),
                        setFirstName: e => window.Moengage.setFirstName(e),
                        setLastName: e => window.Moengage.setLastName(e),
                        setEmailId: e => window.Moengage.setEmailId(e),
                        setMobileNumber: e => window.Moengage.setMobileNumber(e),
                        setGender: e => window.Moengage.setGender(e),
                        setBirthDate: e => window.Moengage.setBirthDate(e),
                        setUserAttribute: (e, t, n = "PROJECT") => window.Moengage.setUserAttribute(e, t, n),
                        dismissMessage(e) {
                            (0, jn.pS)(() => {
                                var t;
                                null === (t = window.Moengage.onsite.displayManager) || void 0 === t || t.dismissInapp(`${e}`)
                            }, 100)
                        },
                        showPushOptIn: e => window.Moengage.callWebPush(e),
                        copyText: e => new jn.VR((t, n) => {
                            e || n();
                            const i = document.querySelector(e);
                            i.textContent ? (navigator.clipboard.writeText(i.textContent), t(null)) : (i.select(), i.setSelectionRange(0, 99999), navigator.clipboard.writeText(i.value), t(null))
                        })
                    }, yield We().onsite.initialize()
                })
            }
            static disableOSM() {
                return Ve(this, arguments, void 0, function*(e = !1, t = !1) {
                    const n = We();
                    n.onsite.OnsiteApiClient && (yield We().onsite.logout(e, t), n.onsite = null, n.onsite = Ps)
                })
            }
            static enableCards(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = We();
                    Fd.loadModule(fe.CARDS).then(n => {
                        n.initialize(e), t.cards = n
                    }).catch(e => {
                        pi.error(1, "enableCards", "Error in loading Cards Module:", e)
                    })
                })
            }
            static disableCards() {
                return Ve(this, void 0, void 0, function*() {
                    const e = We();
                    e.cards && (yield e.cards.disableCardsModule())
                })
            }
            static enablePush(e) {
                return Ve(this, void 0, void 0, function*() {
                    (new Pd).initialize(e)
                })
            }
            static handleEventListeners() {
                window.addEventListener("MODULE_ACTIONS", e => Ve(this, void 0, void 0, function*() {
                    var t, n, i;
                    "DISABLE_OSM" === e.detail.name && Fd.disableOSM(null === (t = e.detail.data) || void 0 === t ? void 0 : t.isUserLogout), "DISABLE_ENABLE_OSM" === e.detail.name && (null === (i = null === (n = We()) || void 0 === n ? void 0 : n.onsite.initData) || void 0 === i ? void 0 : i.appId) && (yield Fd.disableOSM(), (yield ga.get()).deviceAdded && (yield Fd.enableOSM()))
                }))
            }
            static enableWebPersonalizationTracking() {
                return Ve(this, void 0, void 0, function*() {
                    (new xd).initialize()
                })
            }
        }
        Fd.loadPromises = {};
        const Vd = Fd;
        class Wd {
            static isIntegrated() {
                try {
                    const e = localStorage.getItem("moe_segment_cluster"),
                        t = localStorage.getItem("moe_segment_sw_path"),
                        n = localStorage.getItem("moe_segment_sw_scope"),
                        i = localStorage.getItem("moe_segment_enable_spa"),
                        r = localStorage.getItem("moe_segment_disable_onsite"),
                        a = localStorage.getItem("moe_segment_disable_cookies"),
                        s = localStorage.getItem("moe_segment_cards"),
                        o = {};
                    e && (o.cluster = e), t && (o.swPath = t), n && (o.swScope = n), i && (o.enableSPA = "true" === i), a && (o.disableCookies = "true" === a), r && (o.disable_onsite = "true" === r), s && (o.cards = JSON.parse(s));
                    const l = e || t || n || i || a || r || s;
                    return l && pi.log(2, ".isSegmentDataFound", "Data found for segment initialisation", o), !!l && o
                } catch (e) {
                    return !1
                }
            }
        }
        class Hd {
            onWindowVisibilityChange(e) {
                xe.set("isWindowActive", !0), document.addEventListener("focus", () => {
                    t(!0)
                }, !1), document.addEventListener("blur", () => {
                    t(!1)
                }, !1), window.addEventListener("focus", () => {
                    t(!0)
                }, !1), window.addEventListener("blur", () => {
                    "IFRAME" !== document.activeElement.tagName && t(!1)
                }, !1);
                const t = e => "boolean" == typeof e ? n(e ? "visible" : "hidden") : document.hidden ? n("hidden") : n("visible"),
                    n = t => {
                        xe.set("isWindowActive", "visible" === t), e(t)
                    };
                window.addEventListener("visibilitychange", t, !1)
            }
            static executeCleanup() {
                var e;
                const t = Date.now();
                if (t - Hd.lastCleanupAttempt < Hd.CLEANUP_THROTTLE_MS) return;
                if (Hd.lastCleanupAttempt = t, Hd.isCleanupInProgress) return;
                const {
                    reportsCount: n,
                    remoteLogsCount: i
                } = Hd.getBatchCounts();
                if (0 !== n || 0 !== i) {
                    Hd.isCleanupInProgress = !0;
                    try {
                        if (Hd.isBatchingEnabled && (ka.windowClosed = !0, n > 0 && (Va.sendBeacon(), Va.reactToTriggerEvents())), null === (e = window.Moengage.onsite) || void 0 === e ? void 0 : e.displayManager) {
                            const {
                                sendDelayCampaignStats: e,
                                displayManager: t,
                                funnelManager: n
                            } = window.Moengage.onsite;
                            e(t, n)
                        }
                    } catch (e) {
                        pi.error(1, "WindowEventManager.executeCleanup", "Error during cleanup execution:", e)
                    } finally {
                        Hd.isCleanupInProgress = !1
                    }
                }
            }
            static beforeUnload() {
                Hd.shouldExecuteCleanup() && Hd.executeCleanup()
            }
            static pageHide(e) {
                (!e || "boolean" != typeof e.persisted || !e.persisted) && Hd.shouldExecuteCleanup() && Hd.executeCleanup()
            }
            static shouldExecuteCleanup() {
                if (Hd.isCleanupInProgress) return !1;
                const {
                    reportsCount: e,
                    remoteLogsCount: t
                } = Hd.getBatchCounts();
                return e > 0 || t > 0
            }
            static getBatchCounts() {
                var e, t;
                return {
                    reportsCount: (null === (e = Va.reports) || void 0 === e ? void 0 : e.length) || 0,
                    remoteLogsCount: (null === (t = Va.remoteLogs) || void 0 === t ? void 0 : t.length) || 0
                }
            }
            static manageMobileEventListeners(e) {
                if (!He()) return;
                const t = e ? "addEventListener" : "removeEventListener",
                    n = Hd.mobileAppStateChange;
                window[t]("focus", n, !1), window[t]("blur", n, !1), document[t]("touchstart", n, !1)
            }
            static visibilityChangeForCleanup() {
                document.hidden && Hd.shouldExecuteCleanup() && Hd.executeCleanup()
            }
            static mouseOut(e) {
                (null === e.relatedTarget || e.clientY <= Hd.MOUSE_OUT_THRESHOLD_PX) && Hd.shouldExecuteCleanup() && Hd.executeCleanup()
            }
            static mobileAppStateChange() {
                Hd.shouldExecuteCleanup() && Hd.executeCleanup()
            }
            static removeAllCleanupListeners() {
                Hd.listenersAdded && (pi.log(2, "WindowEventManager.removeAllCleanupListeners", "Removing all enhanced event listeners"), Hd.isCleanupInProgress = !1, Hd.listenersAdded = !1, Hd.lastCleanupAttempt = 0, window.removeEventListener("beforeunload", Hd.beforeUnload, !1), "onpagehide" in window && window.removeEventListener("pagehide", Hd.pageHide, !1), document.removeEventListener("visibilitychange", Hd.visibilityChangeForCleanup, !1), document.removeEventListener("mouseout", Hd.mouseOut, !1), Hd.manageMobileEventListeners(!1))
            }
            static addAllCleanupListeners(e) {
                Hd.listenersAdded || (pi.log(2, "WindowEventManager.addAllCleanupListeners", "Adding enhanced event listeners for incognito mode, batching enabled:", e), e && (Hd.isBatchingEnabled = !0), Hd.isCleanupInProgress = !1, Hd.listenersAdded = !0, Hd.lastCleanupAttempt = 0, document.addEventListener("visibilitychange", Hd.visibilityChangeForCleanup, !1), "onpagehide" in window && window.addEventListener("pagehide", Hd.pageHide, !1), window.addEventListener("beforeunload", Hd.beforeUnload, !1), document.addEventListener("mouseout", Hd.mouseOut, !1), Hd.manageMobileEventListeners(!0))
            }
        }
        Hd.CLEANUP_THROTTLE_MS = 500, Hd.MOUSE_OUT_THRESHOLD_PX = 5, Hd.isCleanupInProgress = !1, Hd.isBatchingEnabled = !1, Hd.listenersAdded = !1, Hd.lastCleanupAttempt = 0;
        const Gd = Hd;
        class $d {
            constructor(e) {
                this.deviceToLogout = Me(e, "deviceToLogout", null)
            }
            static get() {
                return new $d(Zn.get(Ee.GRACEFUL_DATA))
            }
            save() {
                Zn.set(Ee.GRACEFUL_DATA, this)
            }
        }
        const jd = "MoEngage.logoutHandler";

        function Kd() {
            try {
                if ("undefined" == typeof localStorage) return !1;
                const e = Zn.get(Ee.LOGOUT_IN_PROGRESS);
                return !0 === e || "true" === e
            } catch (e) {
                return !1
            }
        }

        function qd(e) {
            "undefined" != typeof localStorage && (e ? (Zn.set(Ee.LOGOUT_IN_PROGRESS, !0), pi.log(2, jd + ".setLogoutProgress", "Logout in progress flag set")) : Zn.remove(Ee.LOGOUT_IN_PROGRESS))
        }
        var Yd = n(634).VR;
        const zd = "MoEngage.user";
        class Jd {
            static addAttribute(e, t, n = ea.USER_ATTRIBUTE_LEVEL.PROJECT, i = !1) {
                const r = zd + ".addUserAttribute";
                return new jn.VR((s, o) => {
                    if (!Ea()) return pi.warnAndBroadcast(2, r, Z, Xe, Qe(`the attribute "${e}"`), ne.WEB_OPT_OUT), void s(!1);
                    if (!Sa()) return pi.warnAndBroadcast(2, r, Z, at, `Not tracking the attribute "${e}" as data tracking has been disabled.`, ne.DATA_OPT_OUT), void s(!1);
                    const l = Dt.get();
                    Qr().then(o => {
                        if ("string" != typeof e || null == e) pi.errorAndBroadcast(1, r, Z, "Attribute name is not a string", `Provided attribute name: "${e}" should be a string. Type provided was ${typeof e}`, ne.USER_ATTRIBUTES_TRACKING), s({
                            error: 5e3,
                            message: "Attribute name needs to be a string. Type provided was " + typeof e
                        });
                        else if ("" === e) pi.errorAndBroadcast(1, r, Z, "Attribute name is an empty string", `Provided attribute name: "${e}" should be a non-empty string`, ne.USER_ATTRIBUTES_TRACKING), s({
                            error: 5001,
                            message: "Attribute name can not be an empty string"
                        });
                        else if (null == t) pi.errorAndBroadcast(1, r, Z, "Attribute value is null", `Provided attribute value: "${t}" should be a non-empty string or non-empty object`, ne.USER_ATTRIBUTES_TRACKING), s({
                            error: 5003,
                            message: "Attribute value was empty"
                        });
                        else if ("string" == typeof t && "" === t) pi.errorAndBroadcast(1, r, Z, "Attribute value is an empty string", `Provided attribute value: "${t}" should be a non-empty string or non-empty object`, ne.USER_ATTRIBUTES_TRACKING), s({
                            error: 5004,
                            message: "Attribute value needs to be non-empty string or non-empty object"
                        });
                        else if (sa(t) && nr.includes(e)) pi.errorAndBroadcast(1, r, Z, "Value of a standard user attribute cannot be an object", `Value of '${e}' attribute cannot be an object`, ne.USER_ATTRIBUTES_TRACKING), s({
                            error: 5002,
                            message: "Attribute value cannot be an object"
                        });
                        else if ("object" == typeof t && Array.isArray(t) && !t.length) pi.errorAndBroadcast(1, r, Z, "Attribute value needs to be non-empty string or non-empty object", `Attribute value: "${t}" needs to be a non-empty string or non-empty object`, ne.USER_ATTRIBUTES_TRACKING), s({
                            error: 5006,
                            message: "Attribute value needs to be non-empty string or non-empty object"
                        });
                        else if (sa(t) && !Object.keys(t).length) pi.errorAndBroadcast(1, r, Z, "Attribute value cannot be empty object", `Attribute value: "${t}" cannot be an empty object`, ne.USER_ATTRIBUTES_TRACKING), s({
                            error: 5005,
                            message: "Attribute value cannot be empty object"
                        });
                        else if (n !== ea.USER_ATTRIBUTE_LEVEL.PORTFOLIO || (null == l ? void 0 : l.projectId))
                            if (n !== ea.USER_ATTRIBUTE_LEVEL.PORTFOLIO || "id" !== e && e !== a)
                                if (n === ea.USER_ATTRIBUTE_LEVEL.PORTFOLIO && o.configs.blacklistedPortfolioUserAttributes.includes(e)) pi.errorAndBroadcast(1, r, Z, "Cannot track the portfolio attribute", `Cannot track the attribute: "${e}" at portfolio level as it is blacklisted`, ne.USER_ATTRIBUTES_TRACKING), s({
                                    error: 5007,
                                    message: "Cannot track this portfolio attribute as it is blacklisted"
                                });
                                else {
                                    const d = new ea(e, t, n),
                                        c = () => {
                                            var c;
                                            const u = null !== (c = Pr.startSpan(ur, {
                                                source: "analytics/UserMethod.ts",
                                                attribute_key: e
                                            })) && void 0 !== c ? c : null;
                                            ga.get().then(c => {
                                                const g = "id" === e || e === a,
                                                    p = i ? zr.getIdentifiersFromIdentities().previousIdentities : void 0,
                                                    m = g ? function(e, t, n) {
                                                        const i = Boolean(n && Object.keys(n).length);
                                                        return Object.freeze({
                                                            moe_user_id: e,
                                                            userIdentities: {
                                                                uid: e
                                                            },
                                                            previousIdentities: i ? n : void 0,
                                                            deviceUuid: t
                                                        })
                                                    }(String(t), c.deviceUuid, p) : Ha();
                                                c.addAttribute(d).then(i => Ve(this, void 0, void 0, function*() {
                                                    (null == l ? void 0 : l.projectId) || (yield this.checkAndAddAttributeInIdentityMap(d, t, o)), i ? (d.key === a && (yield zr.updateIdentifiersIDB({
                                                        moe_user_id: d.value
                                                    }), pi.log(1, r, "Logging in the user with id: ", d.value)), za.createUserAttributeEvent(d).then(e => {
                                                        Qa.addEvent(e), Pr.checkpoint(u, "event_created"), as.collectGetParams().then(t => {
                                                            const i = new ja(ja.REPORT_ADD_TYPE.USER_ATTRIBUTE, t, e, n, m);
                                                            Pr.checkpoint(u, "report_assembled"), i.telemetrySpanId = null != u ? u : void 0, as.reportAdd(i).then(() => {
                                                                s(!0)
                                                            })
                                                        })
                                                    })) : (pi.errorAndBroadcast(1, r, Z, "Attribute has already been tracked", `Attribute: "${e}" is already present/queued. Not adding again.`, ne.USER_ATTRIBUTES_TRACKING), s({
                                                        error: 5005,
                                                        message: "Attribute already present/queued. Not adding again."
                                                    }))
                                                }))
                                            })
                                        };
                                    "id" === e || e === a ? ga.get().then(e => Ve(this, void 0, void 0, function*() {
                                        const n = e.indexOfAttribute("id");
                                        n > -1 ? t === e.attributes[n].value ? (pi.log(1, r, "User already logged in with id:", t), s(!0)) : (pi.log(1, r, "Logging out previous user with id:", e.attributes[n].value), ii.broadcastToWindow({
                                            topic: "USER_ACTIONS",
                                            name: "FORCED_LOGOUT",
                                            data: {
                                                id: t
                                            }
                                        }), Jd.logout(!0, t).then(() => Ve(this, void 0, void 0, function*() {
                                            yield this.forcedLogoutUpdateInIdentityMap(t, o), c()
                                        }))) : (yield this.uidLoginUpdateIdentityMap(t, o, i), c())
                                    })) : (ii.broadcastToWindow({
                                        topic: "USER_ACTIONS",
                                        name: "LOGIN",
                                        data: {
                                            id: t
                                        }
                                    }), c())
                                }
                        else pi.errorAndBroadcast(1, r, Z, "uid cannot be tracked as portfolio attribute", "ID cannot be tracked at portfolio level", ne.USER_ATTRIBUTES_TRACKING), s({
                            error: 5007,
                            message: "uid cannot be tracked as portfolio attribute"
                        });
                        else pi.errorAndBroadcast(1, r, Z, "Cannot track user attribute at portfolio level", `Cannot track the attribute: "${e}" at portfolio level as project id is missing in integration`, ne.USER_ATTRIBUTES_TRACKING), s({
                            error: 5007,
                            message: "Cannot track this attribute at portfolio level as project id is missing in integration"
                        })
                    }).catch(n => {
                        var i;
                        null === (i = window.moengage_q) || void 0 === i || i.push({
                            f: "setUserAttribute",
                            a: [e, t]
                        }), pi.errorAndBroadcast(1, r, Z, st, `You have probably attempted to track a user attribute before the SDK is initialized. Error: ${"string"==typeof n?n:JSON.stringify(n)}`), s({
                            error: 5007,
                            message: "Error in getting Web SDK Settings.",
                            err: n
                        })
                    })
                })
            }
            static login(e, t = !1) {
                return Jd.addAttribute("id", e, ea.USER_ATTRIBUTE_LEVEL.PROJECT, t)
            }
            static identifyUser(e) {
                return Ve(this, void 0, void 0, function*() {
                    const t = zd + ".identifyUser";
                    if (Ea())
                        if (Sa())
                            if ("string" == typeof e && e.length || function(e) {
                                    if ("object" != typeof e || null === e) return !1;
                                    let t = !0;
                                    for (const n in e) {
                                        t = !1;
                                        const i = e[n];
                                        if ("string" != typeof i || !i.length) return !1
                                    }
                                    return !t
                                }(e)) {
                                let n, i = {};
                                if ("string" == typeof e ? i.uid = e : i = Object.assign({}, e), Dt.get().projectId) {
                                    if (!i.uid) return void pi.errorAndBroadcast(1, t, Z, "Dropped identities other than uid", "Only 'uid' can be set as identity in project level.");
                                    i = {
                                        uid: i.uid
                                    }, pi.warn(1, t, "Project level integration. Only uid is accepted as identity.")
                                }
                                try {
                                    n = yield Qr()
                                } catch (e) {
                                    pi.log(2, t, "getSDKSettings failed; continuing without it.", e)
                                }
                                yield function() {
                                    return Ve(this, void 0, void 0, function*() {
                                        try {
                                            if (!Kd()) return;
                                            const e = jd + ".waitForLogoutCompletion";
                                            pi.log(2, e, "Logout in progress, waiting for completion..."), yield new jn.VR(t => {
                                                let n = !1;
                                                const i = () => {
                                                        n || (n = !0, (0, jn.Kj)(a), "undefined" != typeof window && window.removeEventListener("storage", r)), t()
                                                    },
                                                    r = e => {
                                                        "MOE_DATA" !== e.key || Kd() || i()
                                                    };
                                                "undefined" != typeof window && window.addEventListener("storage", r);
                                                const a = (0, jn.pS)(() => {
                                                    pi.error(2, e, "Timeout waiting for logout to complete. Proceeding anyway."), qd(!1), i()
                                                }, 5e3);
                                                Kd() || i()
                                            })
                                        } catch (e) {
                                            pi.error(2, jd + ".waitForLogoutCompletion", "Error in waitForLogoutCompletion:", e)
                                        }
                                    })
                                }();
                                let r = yield ga.get();
                                const a = zr.getUserIdentities() || {};
                                let s = !1,
                                    o = !1;
                                const l = {};
                                for (const e in i) {
                                    if ("string" != typeof i[e]) return void pi.errorAndBroadcast(1, t, Z, "Not tracking the identities", `Identity '${e}' has a non-string value. Rejecting the identities.`);
                                    a[e] && a[e] === i[e] || (s = !0), a[e] && a[e] !== i[e] && (l[e] = a[e]), !o && (null == n ? void 0 : n.isPushSubBilling) && !r.deviceAdded && Jr.shouldTriggerSubscriberBilling({
                                        user: r,
                                        sdkSettings: n,
                                        identities: {
                                            [e]: i[e]
                                        }
                                    }) && (o = !0)
                                }
                                if (s) {
                                    Va.reports.length > 0 && (yield Va.flushReports());
                                    let e = !1;
                                    if (o) try {
                                        yield as.deviceAdd(), e = !0, r = yield ga.get()
                                    } catch (e) {
                                        pi.error(1, t, "Error occurred while adding device: ", e)
                                    }
                                    i.uid && i.uid !== a.uid && (yield r.addAttribute(new ea("id", i.uid)), yield zr.updateIdentifiersIDB({
                                        moe_user_id: i.uid
                                    })), yield zr.updateCurrentUserIdentities(i), Object.keys(l).length && (yield zr.updatePreviousUserIdentities(l));
                                    try {
                                        !Va.reports.length && n && (!n.isPushSubBilling || n.isPushSubBilling && (r.deviceAdded || e)) && (yield as.sendBatchOfReports([]))
                                    } catch (e) {
                                        pi.log(2, t, "Identity report batch send failed; continuing.", e)
                                    }
                                    zr.broadcastUserIdentityUpdate()
                                } else pi.warnAndBroadcast(1, t, Z, "Identities not updated", "Identities not updated as same values were passed again.")
                            } else pi.errorAndBroadcast(1, t, Z, "Not tracking the identities", "Type of the argument 'identities' is not supported OR empty identity received.", ne.USER_ATTRIBUTES_TRACKING);
                    else pi.warnAndBroadcast(2, t, Z, at, "Not tracking user identities as data tracking has been disabled.", ne.DATA_OPT_OUT);
                    else pi.warnAndBroadcast(2, t, Z, Xe, Qe("user identities"), ne.WEB_OPT_OUT)
                })
            }
            static logout(e, n, i) {
                const r = zd + ".logout";
                if (!Ea()) return pi.warnAndBroadcast(2, r, Z, Xe, Qe("user logout"), ne.WEB_OPT_OUT), Yd.resolve(!1);
                let a = null;
                return e ? a = {
                        type: "forced",
                        new_uid: n
                    } : i && (a = {
                        data_tracking_disabled: !0
                    }), qd(!0),
                    function() {
                        const e = $d.get(),
                            t = ga.getSync();
                        null != t && (e.deviceToLogout = t.deviceUuid, e.save())
                    }(), new jn.VR(e => {
                        Xa.track(Q.LOGOUT, a).then(() => Ve(this, void 0, void 0, function*() {
                            return pi.log(1, r, "Logging out now!"), yield Va.flushReports(!0), Gd.removeAllCleanupListeners(), Qr().then(n => Ve(this, void 0, void 0, function*() {
                                const i = ga.getSync();
                                n.isPushSubBilling && (null == i ? void 0 : i.deviceAdded) && (yield as.flushHeldReports()), n.isDomainLevelStorage && ($n.remove(Ee.USER_DATA), $n.remove(Ee.IDENTITY_MAP)), Qa.clear(), zr.broadcastLogout(), yield ga.logout(), Zn.logout(), yield zr.updateIdentifiersIDB({}), as.waitForPendingEventWrites().then(() => Ve(void 0, void 0, void 0, function*() {
                                    if (Ge() === Y.WEB) {
                                        const e = [t().INDEXEDDB, t().WEBSQL, t().LOCALSTORAGE],
                                            n = t().createInstance({
                                                driver: e,
                                                name: Ae,
                                                storeName: we
                                            }),
                                            i = t().createInstance({
                                                driver: e,
                                                name: Ae,
                                                storeName: Re
                                            }),
                                            r = t().createInstance({
                                                driver: e,
                                                name: Ae,
                                                storeName: Ce
                                            });
                                        yield Nr.all([n.removeItem(Oe), n.removeItem(De), i.clear(), r.clear()]), Jn()
                                    }
                                })).catch(e => pi.error(2, r, "Background Assist event cleanup failed", e)), Zn.remove(Ee.GRACEFUL_DATA), as.onDeviceAdd = new lr, xe.set(be, !0), qd(!1), Ye.setRemoteLogging(null, !1), ii.broadcastToWindow({
                                    topic: "USER_ACTIONS",
                                    name: "LOGOUT_COMPLETED"
                                }), e(!0)
                            })).catch(() => {
                                pi.errorAndBroadcast(1, r, Z, "Logout could not complete", "Error in getting Web SDK Settings. This might indicate that the App is blocked.", ne.USER_ATTRIBUTES_TRACKING), qd(!1), e(!1)
                            })
                        })).catch(t => {
                            pi.errorAndBroadcast(1, r, Z, "Logout could not complete", `Error in logout event tracking: ${t}`, ne.USER_ATTRIBUTES_TRACKING, t), qd(!1), e(!1)
                        })
                    })
            }
            static updateUniqueId(e) {
                const t = zd + ".updateUniqueId";
                return Ea() ? new jn.VR(n => {
                    ga.get().then(i => Ve(this, void 0, void 0, function*() {
                        const r = i.indexOfAttribute(a),
                            s = i.indexOfAttribute("oldUniqueIds");
                        if (!(r > -1)) return Jd.login(e); {
                            const a = i.attributes[r].value;
                            e !== a ? (s > -1 ? (i.attributes[s].value.push(a), i.attributes.splice(r, 1)) : (i.attributes.splice(r, 1), i.addAttribute(new ea("oldUniqueIds", [a]))), i.save().then(() => {
                                Jd.login(e, !0).then(() => {
                                    n(!0)
                                })
                            })) : (pi.warnAndBroadcast(1, t, Z, "New ID and old ID are the same", "Not updating the ID."), n(!0))
                        }
                    }))
                }) : (pi.warnAndBroadcast(2, t, Z, "Web SDK is disabled", "Not updating user ID as Web SDK has been disabled.", ne.WEB_OPT_OUT), Yd.resolve(!1))
            }
            static getAttributes(e = ea.USER_ATTRIBUTE_LEVEL.PROJECT) {
                var t;
                const n = (null === (t = ga.getSync()) || void 0 === t ? void 0 : t.attributes) || [],
                    i = {};
                return n.forEach(t => {
                    (!t.level && e === ea.USER_ATTRIBUTE_LEVEL.PROJECT || t.level === e) && (i[t.key] = t.value)
                }), i
            }
            static setAttributes(e) {
                const t = ga.getSync();
                null != t && (t.attributes = e)
            }
            static checkAndAddAttributeInIdentityMap(e, t, n) {
                return Ve(this, void 0, void 0, function*() {
                    var i;
                    const r = zd + ".checkAndAddAttributeInIdentityMap";
                    if (e.key !== a && "string" == typeof t) {
                        const a = (null === (i = d.find(t => t.attributeName === e.key)) || void 0 === i ? void 0 : i.moeName) || e.key;
                        n.configs.identityAttributes.includes(a) && (pi.log(1, r, `Attribute to be tracked: '${e.key}' is an identity.`), yield this.identifyUser({
                            [a]: t
                        }))
                    }
                })
            }
            static forcedLogoutUpdateInIdentityMap(e, t) {
                return Ve(this, void 0, void 0, function*() {
                    t.configs.identityAttributes.includes(g) && (yield zr.setLoginUserIdentities({
                        uid: e
                    }))
                })
            }
            static uidLoginUpdateIdentityMap(e, t) {
                return Ve(this, arguments, void 0, function*(e, t, n = !1) {
                    var i, r;
                    const a = zd + ".uidLoginUpdateIdentityMap";
                    if (null === (r = null === (i = t.configs) || void 0 === i ? void 0 : i.identityAttributes) || void 0 === r ? void 0 : r.includes(g)) {
                        const t = zr.getUserIdentities(),
                            i = (null == t ? void 0 : t.uid) && t.uid !== e ? t.uid : null;
                        i && (yield Va.flushReports()), n ? (yield zr.updateCurrentUserIdentities({
                            uid: e
                        }), i && (pi.log(2, a, `updateUniqueId called with uid '${e}'. Linking '${i}' as a previous identity.`), yield zr.updatePreviousUserIdentities({
                            uid: i
                        }))) : (i && pi.warn(2, a, `setUniqueId called with uid '${e}' while '${i}' was stored locally. Treating as a fresh login; the previous uid will not be linked.`), yield zr.setLoginUserIdentities({
                            uid: e
                        }))
                    }
                    zr.broadcastUserIdentityUpdate()
                })
            }
        }
        class Qd {
            static getUuid() {
                return Zn.get(Ee.USER_DATA).deviceUuid
            }
            static getPushToken() {
                const e = Zn.get(Ee.SUBSCRIPTION_DETAILS);
                return (null == e ? void 0 : e.token) || null
            }
            static getDeviceData() {
                return Zn.get(Ee.DEVICE_DATA)
            }
            static setDeviceData(e, t) {
                Zn.set(Ee.DEVICE_DATA, Object.assign(Object.assign({}, this.getDeviceData()), {
                    [e]: t
                }))
            }
            static createNewDeviceUniqueId() {
                this.setDeviceData("deviceUniqueId", yi())
            }
        }
        var Xd = n(634).VR;
        const Zd = new class {
            constructor(e = 1e4) {
                var t;
                if (this.tasks = [], this.processing = !1, this.ready = !1, this.enabling = !1, this.timeoutMs = e, null === (t = We()) || void 0 === t ? void 0 : t.initialized) this.ready = !0;
                else {
                    const e = t => {
                        var n;
                        (null === (n = t.detail) || void 0 === n ? void 0 : n.name) === T && (window.removeEventListener(S, e), this.ready = !0, this.dequeue())
                    };
                    window.addEventListener(S, e)
                }
            }
            emptyQueue() {
                this.tasks.splice(0).forEach(e => e.resolve(!1)), this.ready = !0, this.dequeue()
            }
            enqueueEnable(e) {
                return this.enabling = !0, this.push(() => (this.enabling = !1, e()))
            }
            enqueue(e) {
                return ti() || this.enabling ? this.push(e) : Xd.resolve(!1)
            }
            enqueueNext(e) {
                return ti() || this.enabling ? this.push(e, !0) : Xd.resolve(!1)
            }
            dequeue() {
                if (this.processing || !this.ready) return;
                const e = this.tasks.shift();
                e && (this.processing = !0, this.runWithTimeout(e.fn).then(t => {
                    e.resolve(t), this.processing = !1, this.dequeue()
                }, t => {
                    pi.error(1, "MethodQueue", "Task failed or timed out", t), e.reject(t), this.processing = !1, this.dequeue()
                }))
            }
            push(e, t = !1) {
                return new jn.VR((n, i) => {
                    t ? this.tasks.unshift({
                        fn: e,
                        resolve: n,
                        reject: i
                    }) : this.tasks.push({
                        fn: e,
                        resolve: n,
                        reject: i
                    }), this.ready && !this.processing && this.dequeue()
                })
            }
            runWithTimeout(e) {
                return new jn.VR((t, n) => {
                    let i = !1;
                    const r = (0, jn.pS)(() => {
                        i || (i = !0, n(new Error(`MOE_QUEUE_TIMEOUT: exceeded ${this.timeoutMs}ms`)))
                    }, this.timeoutMs);
                    e().then(e => {
                        i || (i = !0, (0, jn.Kj)(r), t(e))
                    }, e => {
                        i || (i = !0, (0, jn.Kj)(r), n(e))
                    })
                })
            }
        };
        let ec = 0;
        const tc = () => {
                window.addEventListener("USER_ACTIONS", e => {
                    "LOGOUT_COMPLETED" === e.detail.name && Zd.enqueueNext(() => nc(!0))
                })
            },
            nc = (e = !1) => {
                const t = "Initialization";
                return new jn.VR(n => ys.getWebSDKSettings().then(i => {
                    const {
                        isDomainLevelStorage: r,
                        isPushSubBilling: a,
                        isWebPushEnabled: s,
                        configs: {
                            isBatchingEnabled: o,
                            remoteLogTracking: l,
                            logLevel: d,
                            isCardsModuleEnabled: c,
                            isTelemetryEnabled: u
                        }
                    } = i;
                    Ye.setRemoteLogging(d, l), ((e, t) => {
                        e && ti() ? Pr.activate(t, () => as.collectGetParams()) : (Pr.discard(), !e && br.exists() && Pr.killAndPurge())
                    })(u, i), (e => {
                        var t, n;
                        e && !(null === (t = Dt.get()) || void 0 === t ? void 0 : t.disableCookies) ? (Zn.isSharedWithCookie = !0, Zn.copyKeysFromCookie()) : (e && (null === (n = Dt.get()) || void 0 === n ? void 0 : n.disableCookies) && pi.warn(2, "handleDomainLevelStorage", "Cross-subdomain sharing is enabled but disableCookies: true was passed at initialization. Storage sharing will be limited to the current origin."), Zn.isSharedWithCookie = !1)
                    })(r), ((e, t, n) => {
                        Gd.addAllCleanupListeners(e), (e || t) && Va.init(n)
                    })(o, l, i);
                    const p = Qd.getDeviceData();
                    return (null == p ? void 0 : p.deviceUniqueId) || Qd.createNewDeviceUniqueId(), ga.get().then(o => Ve(void 0, void 0, void 0, function*() {
                        var l, d, u;
                        if (as.checkAndTrackUniversalLink(), (null === (d = null === (l = i.configs) || void 0 === l ? void 0 : l.identityAttributes) || void 0 === d ? void 0 : d.includes(g)) && !(null === (u = zr.getUserIdentities()) || void 0 === u ? void 0 : u.uid) && zr.copyUidIntoIdentityMap(o), $d.get().deviceToLogout === o.deviceUuid) return pi.remoteLogTracking(1, "info", t, "User was not able to logout last time. Completing the logout now and starting new session."), Jd.logout().then(e => n(e), () => n(!1)); {
                            o.deviceAdded && as.onDeviceAdd.res(), a && pi.warn(1, t, "You are under push subscriber based billing plan. We are only tracking users with an email, phone number or have subscribed to web push. All user attributes and events will be stored in a queue till we receive either of the properties.");
                            const l = new Aa;
                            (new Gd).onWindowVisibilityChange(l.handleBrowserInactivity), pi.customLabel(1, t, "Device", `UUID: ${o.deviceUuid}, Added: ${o.deviceAdded}`), ii.broadcastToWindow({
                                topic: S,
                                name: _,
                                data: i
                            }), ii.broadcastToWindow({
                                topic: S,
                                name: b,
                                data: o.deviceUuid
                            }), (!i.isPushSubBilling && (!o.deviceAdded || e) || i.isPushSubBilling && (Jr.shouldTriggerSubscriberBilling({
                                user: o,
                                sdkSettings: i
                            }) && e || fa())) && as.deviceAdd(), Xa.track(Q.WEB_SESSION_START, {
                                timestamp: Number(Date.now())
                            }), Xa.track(Q.PAGE_VIEWED, {
                                timestamp: Number(Date.now())
                            }), Ca.clear(Ee.Q.DEVICE), Ca.clear(Ee.Q.REPORT), Dt.get().enableSPA && !bs.isObserverRunning && (new bs).addURLChangeObserver(r), Ar.getInstance().then(e => {
                                var n, r, a, o;
                                const l = !(null === (r = null === (n = window.MoeWebP) || void 0 === n ? void 0 : n.isEditorModeEnabled) || void 0 === r ? void 0 : r.call(n));
                                if (s && !Dt.get().disableWebPush && l ? Vd.enablePush(i) : pi.warn(1, t, "Web push feature not enabled for current environment"), !Dt.get().disableOnsite && l) {
                                    ec++;
                                    const e = ec;
                                    as.onDeviceAdd.p.then(() => {
                                        e === ec && Vd.enableOSM()
                                    })
                                } else pi.warn(1, t, "Onsite is disabled in this page since `disableOnsite: true` is passed during initialization.");
                                c && (null === (a = Dt.get().cards) || void 0 === a ? void 0 : a.enable) && l ? Vd.enableCards(i) : Vd.disableCards(), (null === (o = i.configs) || void 0 === o ? void 0 : o.isWebPersonalizationModuleEnabled) && (function() {
                                    const e = `${gd}.scheduleWebpVersionCheck`;
                                    try {
                                        hd(), window.addEventListener(S, e => {
                                            const t = e.detail;
                                            t && t.name === R && hd()
                                        })
                                    } catch (t) {
                                        pi.error(1, e, `Error scheduling webp version check: ${t}`)
                                    }
                                }(), Vd.enableWebPersonalizationTracking()), (() => {
                                    const e = "Moengage.clearWindowQ";
                                    try {
                                        const t = We();
                                        let n = window.moengage_q;
                                        if (t && n) {
                                            if (window.moengage_q = [], n && n.length > 0 && t)
                                                for (let i = 0; i < n.length; i++) {
                                                    const r = n[i].f,
                                                        a = ["onsite.getData", "onsite.registerCallback", "onsite.getSelfHandledOSM", "landingPages.trackImpression"].includes(r),
                                                        s = "Method called before SDK downloaded";
                                                    pi.remoteLogTracking(1, "info", e, `${s}:`, [n[i].f], n[i].a), a || pi.broadcastLog(ee, s, `${s}: ${n[i].f}. Please wait for SDK to initialise completely before calling its methods.`, ne.LIFECYCLE_CALLBACKS), "onsite.getData" === r ? t.onsite.getData(...n[i].a) : "onsite.registerCallback" === r ? t.onsite.registerCallback(...n[i].a) : "onsite.getSelfHandledOSM" === r ? t.onsite.getSelfHandledOSM(...n[i].a) : "landingPages.trackImpression" === r ? t.landingPages.trackImpression.apply(null, n[i].a) : null != t[n[i].f] && t[n[i].f].apply(null, n[i].a)
                                                }
                                            n = []
                                        }
                                    } catch (t) {
                                        pi.error(1, e, t)
                                    }
                                })()
                            }), n(!0)
                        }
                    }))
                }).catch(e => {
                    pi.errorAndBroadcast(1, t, ee, st, "Error in getting Web SDK Settings. This might indicate that the App is blocked. Check that you have initialised Web SDK with correct values.", ne.WEBSDK_DOCS), n(!1)
                }))
            };
        class ic {
            static enableSdk() {
                return new jn.VR(e => {
                    if (Ea()) e(!0);
                    else {
                        const t = Ee.SDK_DISABLED;
                        this.setDisabledFlag(t, !1), tc(), nc().then(() => {
                            this.broadcastStatus(A), Ba.initialize().then(() => {
                                this.setDisabledFlagIDB(t, !1)
                            }), Mr(), e(!0)
                        })
                    }
                })
            }
            static disableSdk() {
                return new jn.VR(e => {
                    if (Ea()) {
                        this.broadcastStatus(I);
                        const t = Ee.SDK_DISABLED;
                        this.setDisabledFlag(t, !0), this.setDisabledFlagIDB(t, !0).then(t => {
                            this.disableSdkActivities(), (new Aa).clearSessionAndSource(), this.filterAndClearUserAttributesCache(), e(t)
                        })
                    } else e(!0)
                })
            }
            static setDisabledFlag(e, t) {
                Zn.set(e, t), $n.set(e, t)
            }
            static filterAndClearUserAttributesCache() {
                var e, t, n;
                const i = Zn.get(Ee.WEB_SETTINGS),
                    r = null === (e = null == i ? void 0 : i.configs) || void 0 === e ? void 0 : e.identityAttributes,
                    a = null === (t = null == i ? void 0 : i.configs) || void 0 === t ? void 0 : t.subscriberBasedBillingAttributes,
                    l = Zn.get(Ee.USER_DATA);
                (null === (n = null == l ? void 0 : l.attributes) || void 0 === n ? void 0 : n.length) && (l.attributes = l.attributes.filter(e => {
                    var t;
                    if (null == r ? void 0 : r.length) {
                        const n = (null === (t = d.find(t => t.attributeName === e.key)) || void 0 === t ? void 0 : t.moeName) || e.key;
                        if (r.includes(n)) return !0
                    }
                    return !(!(null == i ? void 0 : i.isPushSubBilling) || !([s, o, "Web Migrated User", "Web Subscription URL"].includes(e.key) || (null == a ? void 0 : a.length) && a.includes(e.key)))
                }), Jd.setAttributes(l.attributes), Zn.set(Ee.USER_DATA, l))
            }
            static broadcastStatus(e) {
                ii.broadcastToWindow({
                    topic: S,
                    name: e
                })
            }
            static setDisabledFlagIDB(e, n) {
                return Ve(this, void 0, void 0, function*() {
                    return new jn.VR(i => {
                        var r;
                        (null === (r = this.moeDataStore) || void 0 === r ? void 0 : r.getItem) || (this.moeDataStore = t().createInstance({
                            driver: [t().INDEXEDDB],
                            name: Le,
                            storeName: Pe
                        })), this.moeDataStore ? this.moeDataStore.setItem(e, n).then(() => {
                            i(!0)
                        }).catch(() => i(!1)) : i(!1)
                    })
                })
            }
            static disableSdkActivities() {
                var e, t;
                Pr.stop(), Va.suspendBatching(), (null === (e = Dt.get()) || void 0 === e ? void 0 : e.enableSPA) && bs.removeURLChangeObserver(), Gd.removeAllCleanupListeners();
                for (const e in Ee.Q) kt.purge(e);
                "function" == typeof(null === (t = Ba.offlineDataStore) || void 0 === t ? void 0 : t.clear) && Ba.offlineDataStore.clear(), Qa.clearAll()
            }
            static enableDataTracking() {
                const e = this.baseLogTag + ".enableDataTracking";
                return new jn.VR(t => {
                    Ea() ? (Sa() || (this.setDisabledFlag(Ee.DATA_TRACKING_DISABLED, !1), this.broadcastStatus(O), pi.log(2, e, "Data tracking has been enabled.")), t(!0)) : (pi.warn(2, e, "Web SDK is disabled. Skipping enabling of data tracking."), t(!0))
                })
            }
            static disableDataTracking() {
                const e = this.baseLogTag + ".disableDataTracking";
                return new jn.VR(t => {
                    if (Ea())
                        if (Sa()) {
                            const n = function() {
                                ic.setDisabledFlag(Ee.DATA_TRACKING_DISABLED, !0), ic.broadcastStatus(w), pi.log(2, e, "Data tracking has been disabled."), t(!0)
                            };
                            null != zr.getUserIdentities() && Object.keys(zr.getUserIdentities()).length ? Jd.logout(!1, null, !0).then(() => {
                                n()
                            }) : Va.flushReports().then(() => {
                                var e;
                                for (const e in Ee.Q) kt.purge(e);
                                "function" == typeof(null === (e = Ba.offlineDataStore) || void 0 === e ? void 0 : e.clear) && Ba.offlineDataStore.clear(), Qa.clearAll(), n()
                            })
                        } else t(!0);
                    else pi.warn(2, e, "Web SDK is disabled. Skipping disabling of data tracking."), t(!1)
                })
            }
        }
        ic.baseLogTag = "SdkMethods";
        const rc = ic;
        var ac;
        class sc {}
        ac = sc, sc.baseLogTag = "Analytics", sc.trackEvent = (e, t) => Zd.enqueue(() => Xa.track(e, t)), sc.track_event = (e, t) => (pi.warn(2, `${ac.baseLogTag}.track_event`, ze("track_event", "trackEvent")), ac.trackEvent(e, t)), sc.trackPageView = () => Zd.enqueue(() => Ve(void 0, void 0, void 0, function*() {
            return yield Xa.track(Q.WEB_SESSION_START, {
                timestamp: Number(Date.now())
            }), Xa.track(Q.PAGE_VIEWED, {
                timestamp: Number(Date.now())
            })
        })), sc.track_page_view = () => (pi.warn(2, `${ac.baseLogTag}.track_page_view`, ze("track_page_view", "trackPageView")), ac.trackPageView()), sc.identifyUser = e => Zd.enqueue(() => Jd.identifyUser(e)), sc.add_unique_user_id = e => (pi.warn(2, `${ac.baseLogTag}.add_unique_user_id`, ze("add_unique_user_id", "identifyUser")), Zd.enqueue(() => Jd.login(e))), sc.update_unique_user_id = e => (pi.warn(2, `${ac.baseLogTag}.update_unique_user_id`, ze("update_unique_user_id", "identifyUser")), Zd.enqueue(() => Jd.updateUniqueId(e))), sc.logoutUser = () => Zd.enqueue(() => Jd.logout()), sc.destroy_session = () => (pi.warn(2, `${ac.baseLogTag}.destroy_session`, ze("destroy_session", "logoutUser")), ac.logoutUser()), sc.getUserIdentities = () => zr.getUserIdentities(), sc.setUserAttribute = (e, t, n = ea.USER_ATTRIBUTE_LEVEL.PROJECT) => Zd.enqueue(() => Jd.addAttribute(e, t, n)), sc.add_user_attribute = (e, t, n = ea.USER_ATTRIBUTE_LEVEL.PROJECT) => (pi.warn(2, `${ac.baseLogTag}.add_user_attribute`, ze("add_user_attribute", "setUserAttribute")), ac.setUserAttribute(e, t, n)), sc.setFirstName = e => Zd.enqueue(() => Jd.addAttribute("first_name", e)), sc.add_first_name = e => (pi.warn(2, `${ac.baseLogTag}.add_first_name`, ze("add_first_name", "setFirstName")), ac.setFirstName(e)), sc.setLastName = e => Zd.enqueue(() => Jd.addAttribute("last_name", e)), sc.add_last_name = e => (pi.warn(2, `${ac.baseLogTag}.add_last_name`, ze("add_last_name", "setLastName")), ac.setLastName(e)), sc.setEmailId = e => Zd.enqueue(() => Jd.addAttribute("email", e)), sc.add_email = e => (pi.warn(2, `${ac.baseLogTag}.add_email`, ze("add_email", "setEmailId")), ac.setEmailId(e)), sc.setMobileNumber = e => Zd.enqueue(() => Jd.addAttribute("mobile", e)), sc.add_mobile = e => (pi.warn(2, `${ac.baseLogTag}.add_mobile`, ze("add_mobile", "setMobileNumber")), ac.setMobileNumber(e)), sc.setUserName = e => Zd.enqueue(() => Jd.addAttribute("name", e)), sc.add_user_name = e => (pi.warn(2, `${ac.baseLogTag}.add_user_name`, ze("add_user_name", "setUserName")), ac.setUserName(e)), sc.setGender = e => Zd.enqueue(() => Jd.addAttribute("gender", e)), sc.add_gender = e => (pi.warn(2, `${ac.baseLogTag}.add_gender`, ze("add_gender", "setGender")), ac.setGender(e)), sc.setBirthDate = e => Zd.enqueue(() => Jd.addAttribute("birthday", e)), sc.add_birthday = e => (pi.warn(2, `${ac.baseLogTag}.add_birthday`, ze("add_birthday", "setBirthDate")), ac.setBirthDate(e)), sc.getUserAttribute = (e, t = ea.USER_ATTRIBUTE_LEVEL.PROJECT) => Jd.getAttributes(t)[e] || "", sc.user = {
            getAttributes: Jd.getAttributes
        }, sc.userAttributeLevel = ea.USER_ATTRIBUTE_LEVEL, sc.enableSdk = () => ti() ? Zd.enqueue(() => rc.enableSdk()) : (Zd.emptyQueue(), Zd.enqueueEnable(() => rc.enableSdk())), sc.disableSdk = () => Zd.enqueue(() => rc.disableSdk()), sc.isSdkEnabled = () => ti(), sc.enableDataTracking = () => Zd.enqueue(() => rc.enableDataTracking()), sc.disableDataTracking = () => Zd.enqueue(() => rc.disableDataTracking()), sc.isDataTrackingEnabled = () => Sa(), sc.getUserId = () => {
            var e;
            return (null === (e = Jd.getAttributes()) || void 0 === e ? void 0 : e.USER_ATTRIBUTE_UNIQUE_ID) || ""
        };
        const oc = sc,
            lc = "NetworkInterceptor",
            dc = "undefined" != typeof performance && "function" == typeof performance.getEntriesByType;
        var cc, uc = n(634).VR;
        (() => {
            var e, t;
            const n = window;
            n.__moe = n.__moe || {}, n.__moe.scriptUrls = n.__moe.scriptUrls || {}, n.__moe.scriptUrls.sdk = null !== (t = null === (e = document.currentScript) || void 0 === e ? void 0 : e.src) && void 0 !== t ? t : null
        })(), window && ((null === (cc = We()) || void 0 === cc ? void 0 : cc.initialized) || (window.moe = function(e) {
            var n;
            const i = "Pre-Initialization",
                r = Pr.startSpan("init", {
                    source: "core/index.ts",
                    pre_init_ms: hr ? Math.round(vr()) : null
                });
            if ((e => {
                    const t = ["bot", "spider", "crawler", "crawling", "Applebot", "PetalBot", "pingbot", "proximic", "AdsBot-Google", "Googlebot", "Cincraw", "SnapchatBot", "Snapchat-Proxy/1.0", "SnapchatAds", "Snapchat-Ads/1.0", "YandexRenderResourcesBot", "bingbot", "slurp", "MicrosoftPreview", "Baiduspider", "HeadlessChrome", ...Array.isArray(e) ? e.filter(e => "string" == typeof e && "" !== e.trim()) : []];
                    return new RegExp(t.join("|"), "i").test(navigator.userAgent)
                })(null !== (n = null == e ? void 0 : e.botsList) && void 0 !== n ? n : null == e ? void 0 : e.bots_list)) return Pr.endSpan(r, mr, {
                failure_reason: "bot_detected"
            }), void pi.errorAndBroadcast(1, i, X, "Bot detected", `Bot detected, Can't initialise the MoEngage Web SDK: ${navigator.userAgent}`, ne.BOTS_BLOCKING);
            const a = We();
            if (a && a.initialized) return Pr.endSpan(r, mr, {
                failure_reason: "double_init",
                init_call_count: a.invoked
            }), pi.errorAndBroadcast(1, i, X, "MoEngage Web SDK initialized multiple times", "SDK is being loaded from multiple sources. Ensure it is initialized only once across all integrations.", ne.WEBSDK_DOCS), a;
            if (void 0 === uc) return Pr.endSpan(r, mr, {
                failure_reason: "promises_unsupported"
            }), pi.broadcastLog(X, it, "Please use a browser that supports promises.", ne.COMPATIBILITY_MATRIX), ks;
            if (e.app_id || e.appId) {
                const n = Wd.isIntegrated();
                n && (e = Object.assign({}, e, n)), Dt.save(e), Pr.checkpoint(r, "init_data_saved");
                const a = Dt.get();
                "string" == typeof a.customProxyDomain && a.customProxyDomain.length && function() {
                    const e = lc + ".setupNetworkInterceptor";
                    ! function() {
                        const e = lc + ".interceptXHR",
                            t = window.XMLHttpRequest,
                            n = t.prototype.open;
                        t.prototype.open = function(t, i, r, a, s) {
                            const o = "string" == typeof i ? i : i.toString();
                            let l = o;
                            try {
                                const t = new URL(o, window.location.href),
                                    n = t.hostname.toLowerCase();
                                if ("moengage.com" === n || n.endsWith(".moengage.com")) {
                                    const n = t.hostname,
                                        i = yo("//" + n).substring(2);
                                    i !== n && (t.hostname = i, l = t.toString(), pi.log(2, e, "URL replaced: ", o, " -> ", l))
                                }
                            } catch (e) {
                                l = o
                            }
                            return void 0 !== r ? void 0 !== a && void 0 !== s ? n.call(this, t, l, r, a, s) : void 0 !== a ? n.call(this, t, l, r, a) : n.call(this, t, l, r) : n.call(this, t, l)
                        }
                    }(),
                    function() {
                        if (void 0 === window.fetch) return;
                        const e = lc + ".interceptFetch",
                            t = e => {
                                const t = e.toLowerCase();
                                return "moengage.com" === t || t.endsWith(".moengage.com")
                            },
                            n = window.fetch;
                        window.fetch = function(i, r) {
                            let a = i;
                            if ("string" == typeof i) try {
                                const n = new URL(i, window.location.href);
                                if (t(n.hostname)) {
                                    const t = n.hostname,
                                        r = yo("//" + t).substring(2);
                                    r !== t && (n.hostname = r, a = n.toString(), pi.log(2, e, "URL replaced: ", i, " -> ", a))
                                }
                            } catch (e) {
                                a = i
                            } else if (i instanceof URL) {
                                const e = i.hostname.toLowerCase();
                                if (t(e)) {
                                    const e = i.hostname,
                                        t = yo("//" + e).substring(2);
                                    if (t !== e) {
                                        const e = new URL(i.toString());
                                        e.hostname = t, a = e
                                    }
                                }
                            } else if (i instanceof Request) {
                                const e = new URL(i.url),
                                    n = e.hostname.toLowerCase();
                                if (t(n)) {
                                    const t = e.hostname,
                                        n = yo("//" + t).substring(2);
                                    n !== t && (e.hostname = n, a = new Request(e.toString(), i))
                                }
                            }
                            return n.call(window, a, r)
                        }
                    }(),
                    function() {
                        if (void 0 === navigator.sendBeacon) return;
                        const e = lc + ".interceptSendBeacon",
                            t = navigator.sendBeacon.bind(navigator);
                        navigator.sendBeacon = function(n, i) {
                            const r = "string" == typeof n ? n : n.toString();
                            let a = r;
                            try {
                                const t = new URL(r, window.location.href),
                                    n = t.hostname.toLowerCase();
                                if ("moengage.com" === n || n.endsWith(".moengage.com")) {
                                    const n = t.hostname,
                                        i = yo("//" + n).substring(2);
                                    i !== n && (t.hostname = i, a = t.toString(), pi.log(2, e, "URL replaced: ", r, " -> ", a))
                                }
                            } catch (e) {
                                a = r
                            }
                            return t(a, i)
                        }
                    }(),
                    function() {
                        const e = (e, t, n) => {
                                const i = n.set;
                                i && (n.set = function(e) {
                                    const t = yo(e);
                                    i.call(this, t)
                                }, Object.defineProperty(e.prototype, t, n))
                            },
                            t = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, "src");
                        t && e(HTMLScriptElement, "src", t);
                        const n = Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype, "href");
                        n && e(HTMLLinkElement, "href", n);
                        const i = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
                        i && e(HTMLImageElement, "src", i);
                        const r = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, "src");
                        r && e(HTMLIFrameElement, "src", r);
                        const a = Object.getOwnPropertyDescriptor(HTMLAnchorElement.prototype, "href");
                        a && e(HTMLAnchorElement, "href", a);
                        const s = Object.getOwnPropertyDescriptor(HTMLSourceElement.prototype, "srcset");
                        s && e(HTMLSourceElement, "srcset", s);
                        const o = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "srcset");
                        o && e(HTMLImageElement, "srcset", o)
                    }(),
                    function() {
                        const e = Element.prototype.setAttribute;
                        Element.prototype.setAttribute = function(t, n) {
                            let i = n;
                            return "src" !== t && "href" !== t && "srcset" !== t || "string" != typeof n ? "style" === t && "string" == typeof n && (i = _o(n)) : i = yo(n), e.call(this, t, i)
                        }
                    }(),
                    function() {
                        const e = Object.getOwnPropertyDescriptor(Node.prototype, "textContent");
                        if (e && e.set) {
                            const t = e.set;
                            Object.defineProperty(Node.prototype, "textContent", Object.assign(Object.assign({}, e), {
                                set(e) {
                                    let n = e;
                                    this instanceof HTMLStyleElement && "string" == typeof e && (n = _o(e)), t.call(this, n)
                                }
                            }))
                        }
                    }(), new jn.Dg(e => {
                        e.forEach(e => {
                            e.addedNodes.forEach(e => {
                                if (e.nodeType === Node.ELEMENT_NODE) {
                                    const t = e,
                                        n = t.getAttribute("src");
                                    if (n) {
                                        const e = yo(n);
                                        n !== e && t.setAttribute("src", e)
                                    }
                                    const i = t.getAttribute("href");
                                    if (i) {
                                        const e = yo(i);
                                        i !== e && t.setAttribute("href", e)
                                    }
                                    const r = t.getAttribute("srcset");
                                    if (r) {
                                        const e = yo(r);
                                        r !== e && t.setAttribute("srcset", e)
                                    }
                                    const a = t.getAttribute("style");
                                    if (a) {
                                        const e = _o(a);
                                        a !== e && t.setAttribute("style", e)
                                    }
                                }
                            })
                        })
                    }).observe(document.documentElement, {
                        childList: !0,
                        subtree: !0
                    }), pi.log(2, e, "Network interceptor setup complete")
                }(), new jn.VR(e => {
                    "complete" !== window.document.readyState ? window.addEventListener("load", () => {
                        e(!0)
                    }) : e(!0)
                }).then(() => {
                    var n, s, o, l, d, c;
                    new Vd, Pr.checkpoint(r, "module_manager_ready"), (e => {
                            const t = "handleLogger";
                            pi.setLogLevel(e.logLevel, !0), pi.log(1, t, "Init data: ", e), pi.customLabel(1, t, "SDK Version", "2.81.01"), e.sdkEnvironment === ue.TEST && pi.warn(1, t, "You are currently using MoEngage in TEST environment. You'll find all the data captured in this environment in the TEST mode on the dashboard.")
                        })(a),
                        function() {
                            const e = "StorageEventUtilities";
                            if ("undefined" != typeof window) try {
                                window.addEventListener("storage", e => {
                                    "MOE_DATA" !== e.key && null !== e.key || Jn()
                                })
                            } catch (t) {
                                pi.warn(1, e, `Failed to add storage listener: ${t}`)
                            }
                            if ("undefined" != typeof window && window.indexedDB) try {
                                const e = e => {
                                    const t = IDBObjectStore.prototype[e];
                                    "function" == typeof t && (IDBObjectStore.prototype[e] = function(...e) {
                                        const n = t.apply(this, e);
                                        if (zn.has(this.name) && n && void 0 === n.onsuccess) {
                                            const e = n.onsuccess;
                                            n.onsuccess = function(t) {
                                                if (Jn(), "function" == typeof e) return e.call(this, t)
                                            }
                                        }
                                        return n
                                    })
                                };
                                e("add"), e("put"), e("delete"), e("clear")
                            } catch (t) {
                                pi.warn(1, e, `Failed to patch IDBObjectStore methods: ${t}`)
                            }
                        }(), l = e.disableSdk, (d = Le, c = Pe, new jn.VR(e => {
                            const t = indexedDB.open(d);
                            t.onsuccess = () => {
                                const n = t.result,
                                    i = n.objectStoreNames.contains(c);
                                "function" == typeof n.close && n.close(), e(i)
                            }, t.onerror = () => {
                                e(!1)
                            }
                        })).then(e => {
                            if (e) {
                                const e = t().createInstance({
                                    driver: [t().INDEXEDDB],
                                    name: Le,
                                    storeName: Pe
                                });
                                if (e && (e.setItem("isSdkDisabledAtInit", !!l), ei() || $n.get(Ie))) {
                                    const t = $n.get(Ee.SDK_DISABLED);
                                    "boolean" == typeof t ? e.setItem(Ee.SDK_DISABLED, t) : e.removeItem(Ee.SDK_DISABLED)
                                }
                            }
                        }), ti() || (ei() || $n.get(Ie)) && !1 === $n.get(Ee.SDK_DISABLED) && (Zn.set(Ee.SDK_DISABLED, !1), 1) ? (tc(), window.addEventListener(S, e => {
                            if (e.detail.name === C) {
                                const e = "handleLandingPageDeviceAdd";
                                ys.getWebSDKSettings().then(t => {
                                    var n;
                                    if (null === (n = null == t ? void 0 : t.configs) || void 0 === n ? void 0 : n.landingPageTracking) return ga.get().then(t => {
                                        t.deviceAdded || (pi.log(2, e, "Landing page tracking enabled and device not added, triggering device add"), as.deviceAdd(!1))
                                    })
                                }).catch(t => {
                                    pi.error(1, e, "Error getting SDK settings or checking device status for landing page device add:", t), as.deviceAdd(!1)
                                })
                            }
                        }), ((e, t) => {
                            if (!dc || !e) return;
                            const n = performance.getEntriesByType("resource").find(t => t.name === e);
                            if (!n) return;
                            const i = Math.round(n.responseEnd - n.startTime),
                                r = Math.round((performance.timeOrigin || 0) + n.startTime),
                                a = n.responseStart > 0,
                                s = Math.round(n.responseStart - n.startTime);
                            Pr.record("sdk_download", r, i, pr, Object.assign({
                                source: "telemetry/sdkDownload.ts",
                                integration_type: t
                            }, a ? {
                                transfer_size: n.transferSize,
                                from_cache: 0 === n.transferSize
                            } : {}), a ? [{
                                name: "response_start",
                                t: s
                            }] : [])
                        })(null !== (o = null === (s = null === (n = window.__moe) || void 0 === n ? void 0 : n.scriptUrls) || void 0 === s ? void 0 : s.sdk) && void 0 !== o ? o : null, a.integrationType), nc().then(e => {
                            Mr(), Pr.endSpan(r, e ? pr : mr, e ? void 0 : {
                                failure_reason: "config_fetch_failed"
                            })
                        })) : (Pr.discard(), pi.warnAndBroadcast(2, i, X, "SDK is disabled", "Not initialising the SDK as it has been disabled.", ne.WEB_OPT_OUT)), ii.broadcastToWindow({
                            topic: S,
                            name: y,
                            data: e
                        }, !0)
                });
                const s = window.moengage_object || "Moengage",
                    o = Object.assign(Object.assign(Object.assign({}, Ls), oc), {
                        onsite: Ps
                    });
                return window[s] = o, o.initialized = !0, o
            }
            return Pr.endSpan(r, mr, {
                failure_reason: "missing_app_id"
            }), pi.errorAndBroadcast(1, i, X, rt, "App Id not specified. Please check docs page to complete the integration.", ne.WEBSDK_DOCS), ks
        }, window.moeBannerText = "banner", window[se] = Qa))
    })()
})();