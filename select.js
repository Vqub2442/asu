var isInRect = function (selector, clickEvent) {
    if (selector != null && clickEvent != null) {
        var linkPosX = clickEvent.clientX;
        var linkPosY = clickEvent.clientY;

        var selectorBox = selector.getBoundingClientRect();

        if (linkPosX >= selectorBox.left && linkPosX <= selectorBox.right && linkPosY >= selectorBox.top && linkPosY <= selectorBox.bottom) {
            return true;
        }
    }
    return false;
};

window.InfCustomFPSTAMobileFunc = function (event, os, browser, link, sUrl) {
    var w, targetUrl;
    var g = g367CB268B1094004A3689751E7AC568F;
    var isDL =
        isInRect(document.querySelector(".download_link a.input"), event) ||
        isInRect(document.querySelector(".dl_startlink"), event) ||
        isInRect(document.querySelector(".dl-btn-form"), event) ||
        isInRect(document.querySelector("#download-link"), event);

    var flag = g.Storage.GetLocalStorage("inf-mediafire-activate");
    if (flag === "1") {
        g.PopLoaded = false;
        g.PopRunning = false;
        g.Storage.DeleteLocalStorage("inf-mediafire-activate");
        return true;
    }

    if (link.nodeName.toLowerCase() === "a" && link.getAttribute("href") != "#" && link.getAttribute("href").indexOf("javascript:") == -1) {
        targetUrl = isDL ? g._Top.document.location : link.getAttribute("href");
    } else {
        g.PopLoaded = false;
        g.PopRunning = false;
        return true;
    }

    g.OnFastPopLoaded();
    g.IncrementFastPopCap();
    g.PopRunning = false;

    if (g.PopSettings.IsTracking) {
        // Tracking zone enabled
        doTrackingFastPop();
    } else {
        var tabWinName = "inftabwindow_" + Math.floor(Math.random() * 100000000 + 1).toString();
        if (isDL) {
            g.Storage.SetLocalStorage("inf-mediafire-activate", "1");
        }
        if (g.IsMobile.iOS(g._Top) && g.IsMobile.Opera(g._Top)) {
            window.open(sUrl, tabWinName);
            g._Top.document.location = targetUrl;
        } else {
            if (os.name === "iOS" && (browser.name === "Chrome" || (browser.name === "Mobile Safari" && parseFloat(browser.version) < parseFloat("8")))) {
                window.open(targetUrl, tabWinName);
            } else {
                if (g.PopSettings.MobileHistory) {
                    try {
                        var nw = window.open("about:blank");
                        try {
                            nw.history.replaceState(
                                {
                                    previous: g._Top.location.href,
                                },
                                null,
                                g._Top.location.href
                            );
                        } catch (err) {
                            g.ConsoleLog(err);
                        }
                        nw.addEventListener("popstate", function (e) {
                            nw.location = e.state.previous;
                        });
                        nw.location = targetUrl;
                    } catch (err) {
                        g.ConsoleLog(err);
                        window.open(targetUrl, tabWinName);
                    }
                } else {
                    window.open(targetUrl, tabWinName);
                }
            }

            if (os.name == "Android") {
                // doing this because android opens the clicked link in same tab too
                link.setAttribute("href", sUrl);
            }
            g._Top.document.location = sUrl;
        }
    }

    if (event.preventDefault !== undefined) {
        event.preventDefault();
    }
    return false;
};

window.InfCustomSTAMobileFunc = function (Module, event, os, browser, link, redirectUrl) {
    var g = Module.Loader;

    var isDL =
        isInRect(document.querySelector(".download_link a.input"), event) ||
        isInRect(document.querySelector(".dl_startlink"), event) ||
        isInRect(document.querySelector(".dl-btn-form"), event) ||
        isInRect(document.querySelector("#download-link"), event);

    var urlToOpen = isDL ? link.getAttribute("href") : Module._Top.document.location;

    if (
        link.nodeName.toLowerCase() === "a" &&
        link.getAttribute("href") !== "#" &&
        link.getAttribute("href").indexOf("javascript:") === -1 &&
        !(Module.Media.Settings.RespectTargetBlank && (link.getAttribute("target") === "_blank" || link.getAttribute("rel") === "nofollow"))
    ) {
        if (
            Module.PopLoaded ||
            !Module.Loader.IsClientSideFiltersPassed(
                Module.Media.ClientSideFilters,
                Module.Loader.LogZoneFilter({
                    Id: Module.Media.ZoneId,
                    Name: Module.Media.ZoneName,
                })
            )
        ) {
            return true;
        }

        Module.OnPopunderLoaded();
        Module.AdShown = true;
        if (Module.Loader.IsCapped("InfNumPops" + Module.Media.ZoneId, "InfNumPopsExpire" + Module.Media.ZoneId, Module.Media.Settings.cap)) {
            return true;
        }

        Module.Loader.IncrementCap("InfNumPops" + Module.Media.ZoneId, "InfNumPopsExpire" + Module.Media.ZoneId, Module.Media.Settings.capLength);

        if (isDL) {
            Module.Loader.Storage.SetLocalStorage("inf-mediafire-activate", "1");
        }
        if (g.IsMobile.iOS(g._Top) && g.IsMobile.Opera(g._Top)) {
            window.open(redirectUrl);
            g._Top.document.location = urlToOpen;
        } else {
            if (os.name === "iOS" && (browser.name === "Chrome" || (browser.name === "Mobile Safari" && parseFloat(browser.version) < parseFloat("8")))) {
                window.open(urlToOpen);
            } else {
                if (Module.Media.Settings.MobileHistory) {
                    try {
                        var w = window.open("about:blank");
                        try {
                            w.history.replaceState(
                                {
                                    previous: Module._Top.location.href,
                                },
                                null,
                                Module._Top.location.href
                            );
                        } catch (err) {
                            g.ConsoleLog(err);
                        }
                        w.addEventListener("popstate", function (e) {
                            w.location = e.state.previous;
                        });
                        w.location = urlToOpen;
                    } catch (err) {
                        g.ConsoleLog(err);
                        window.open(urlToOpen);
                    }
                } else {
                    window.open(urlToOpen);
                }
            }

            if (os.name == "Android") {
                // doing this because android opens the clicked link in same tab too
                link.setAttribute("href", redirectUrl);
            }
            Module._Top.document.location = redirectUrl;
        }

        if (event.preventDefault !== undefined) {
            event.preventDefault();
        }
        return false;
    }
};

window.InfCustomFPSTAFunc = function (event, link, sUrl) {
    var isDL =
        isInRect(document.querySelector(".download_link a.input"), event) ||
        isInRect(document.querySelector(".dl_startlink"), event) ||
        isInRect(document.querySelector(".dl-btn-form"), event) ||
        isInRect(document.querySelector("#download-link"), event);

    var flag = g367CB268B1094004A3689751E7AC568F.Storage.GetLocalStorage("inf-mediafire-activate");
    if (flag === "1") {
        g367CB268B1094004A3689751E7AC568F.PopLoaded = false;
        g367CB268B1094004A3689751E7AC568F.PopRunning = false;
        g367CB268B1094004A3689751E7AC568F.Storage.DeleteLocalStorage("inf-mediafire-activate");
        return true;
    }

    // disable same tab ad for facebook app users
    var uaParser = g367CB268B1094004A3689751E7AC568F.UaParser;
    var userAgent = uaParser.getUA();
    if (userAgent.indexOf("FBAN/FBIOS") > -1 || userAgent.indexOf("FB_IAB/FB4A") > -1 || userAgent.indexOf("FBAV") > -1) {
        g367CB268B1094004A3689751E7AC568F.PopLoaded = true;
        g367CB268B1094004A3689751E7AC568F.PopRunning = true;
        return true;
    }
    if (g367CB268B1094004A3689751E7AC568F.PopSettings.IsTracking) {
        doTrackingFastPop();
        g367CB268B1094004A3689751E7AC568F.OnFastPopLoaded();
    } else {
        link.setAttribute("data-tabunder", true);

        var tabWinName = "inftabwindow_" + Math.floor(Math.random() * 100000000 + 1).toString();
        var w;
        var currentUrl = g367CB268B1094004A3689751E7AC568F._Top.document.location.href;

        var reg = /#$/;

        var targetUrl;
        if (link.tagName.toLowerCase() === "a" && link.getAttribute("href").lastIndexOf("javascript:", 0) !== 0 && link.getAttribute("href") !== "#") {
            targetUrl = isDL ? g367CB268B1094004A3689751E7AC568F._Top.document.location : link.href.replace(reg, "");
        } else if (g367CB268B1094004A3689751E7AC568F.PopSettings.SameTabAdSettings.ClickAnywhere) {
            targetUrl = currentUrl;
        } else {
            g367CB268B1094004A3689751E7AC568F.PopLoaded = false;
            g367CB268B1094004A3689751E7AC568F.PopRunning = false;
            return true;
        }

        if (isDL) {
            g367CB268B1094004A3689751E7AC568F.Storage.SetLocalStorage("inf-mediafire-activate", "1");
        }

        // if it's a link, prevent propagation of link clicks for same tab ad to work
        event.preventDefault();

        g367CB268B1094004A3689751E7AC568F.TabHistoryRecorder(currentUrl, g367CB268B1094004A3689751E7AC568F.TabHistoryStorageName);

        try {
            var w = window.open("about:blank", tabWinName);
            try {
                w.history.replaceState(
                    {
                        previous: currentUrl,
                    },
                    null,
                    currentUrl
                );
                w.onPageShow = function (e) {
                    if (e.persisted) {
                        w.location.reload();
                    }
                };
            } catch (err) {
                g367CB268B1094004A3689751E7AC568F.ConsoleLog(err);
            }
            w.addEventListener("popstate", function (e) {
                w.location = e.state.previous;
            });
            w.location = targetUrl;
        } catch (err) {
            window.open(targetUrl, tabWinName);
        }

        w.focus();
        g367CB268B1094004A3689751E7AC568F.OnFastPopLoaded();
        g367CB268B1094004A3689751E7AC568F._Top.location.href = sUrl + "&hosted=true";
    }

    if (event.preventDefault !== undefined) {
        event.preventDefault();
    }

    g367CB268B1094004A3689751E7AC568F.PopLoaded = true;
    g367CB268B1094004A3689751E7AC568F.PopRunning = false;
    g367CB268B1094004A3689751E7AC568F.IncrementFastPopCap();
};

var rAb = function () {
    try {
        var flag = g367CB268B1094004A3689751E7AC568F.Storage.GetLocalStorage("inf-mediafire-activate");
        if (flag === "1") {
            var downloadLink = document.querySelector(".download_link a.input") || document.querySelector(".download_link a") || document.querySelector("form.dl-btn-form a.input") || document.querySelector("#download-link");

            if (downloadLink) {
                downloadLink.click();
                var dl = document.getElementById("download_link");
                if (dl) {
                    setTimeout(function () {
                        dl.className = "download_link started";
                        window.dlStarted = true;
                        setTimeout(function () {
                            dl.className += " retry";
                        }, 5000);
                    }, 3100);
                }
            }
            g367CB268B1094004A3689751E7AC568F.Storage.DeleteLocalStorage("inf-mediafire-activate");
        }
    } catch (e) {}
};

window.InfCustomerCallback = function () {
    try {
        var g = g367CB268B1094004A3689751E7AC568F;
        var browser = g.UaParser.getBrowser();
        var os = g.UaParser.getOS();
        if (os.name === "Mac OS" && browser.name === "Chrome") {
            if (g._Top.location.href.indexOf("/file/jyn6nnacn9p5rht/AdSupply_Test_File.txt/file") > -1) {
                g.PopSettings.ChromePopApproach = 5;
            } else {
                g.PopLoaded = true;
            }
        } else if (browser.name === "Edge" && browser.major <= 18) {
            g.PopLoaded = true;
        }
    } catch (e) {}
};

window.InfPreFastPopAttachCallback = function () {
    try {
        var g = g367CB268B1094004A3689751E7AC568F;
        var browser = g.UaParser.getBrowser();
        var os = g.UaParser.getOS();
        if (os.name === "Mac OS" && browser.name === "Chrome" && g._Top.location.href.indexOf("/file/jyn6nnacn9p5rht/AdSupply_Test_File.txt/file") > -1) {
            g.PopSettings.ChromePopApproach = 5;
        }
    } catch (e) {}
};

var InfShowNewAds;
try {
    var allowed = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 18, 100, 110, 250, 270, 286, 290, 320, 360, 361, 362, 370, 376, 377, 378, 381, 382, 383, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 398];
    var current = window.top.document.location.href.split("errno=")[1];
    var isAllowed = false;
    if (current) {
        isAllowed = allowed.includes(parseInt(current));
    }
    var el = document.querySelectorAll("div.download_link a.retry");
    if (el.length > 0) {
        InfShowNewAds = el[0].href.match(/template=([0-9]+)/i)[1] === "27";
    }
    InfShowNewAds = InfShowNewAds || isAllowed;
} catch (e) {}
(function (e, a, b, c, g, h) {
    null == e[a] &&
        e[b + g] &&
        ((e[a] = "loading"),
        e[b + g](
            h,
            (b = function () {
                e[a] = "complete";
                e[c + g](h, b, !1);
            }),
            !1
        ));
})(document, "readyState", "add", "remove", "EventListener", "DOMContentLoaded");
(function () {
    var e = document.createElement("script");
    e.type = "text/javascript";
    e.async = !0;
    e.src = "https://cdn.otnolatrnup.com/Scripts/infinity.js.aspx?guid=5ff0fb62-0643-4ff1-aaee-c737f9ffc0e0";
    e.id = "infinity";
    e.setAttribute("data-guid", "5ff0fb62-0643-4ff1-aaee-c737f9ffc0e0");
    e.setAttribute("data-version", "async");
    var a = document.getElementsByTagName("script")[0];
    a.parentNode.insertBefore(e, a);
})();
(function () {
    (function (e, a, b) {
        e.addEventListener ? e.addEventListener(a, b, !1) : e.attachEvent && e.attachEvent("on" + a, b);
    })(window, "load", function () {
        ("undefined" != typeof g367CB268B1094004A3689751E7AC568F && g367CB268B1094004A3689751E7AC568F.Core) ||
            (function () {
                if ("undefined" == typeof e || !e.Core) {
                    Array.prototype.filter ||
                        (Array.prototype.filter = function (a) {
                            if (void 0 === this || null === this) throw new TypeError();
                            var b = Object(this),
                                c = b.length >>> 0;
                            if ("function" !== typeof a) throw new TypeError();
                            for (var g = [], h = 2 <= arguments.length ? arguments[1] : void 0, l = 0; l < c; l++)
                                if (l in b) {
                                    var d = b[l];
                                    a.call(h, d, l, b) && g.push(d);
                                }
                            return g;
                        });
                    Array.prototype.find ||
                        Object.defineProperty(Array.prototype, "find", {
                            value: function (a, b) {
                                if (null == this) throw new TypeError('"this" is null or not defined');
                                var c = Object(this),
                                    g = c.length >>> 0;
                                if ("function" !== typeof a) throw new TypeError("predicate must be a function");
                                for (var h = 0; h < g; ) {
                                    var l = c[h];
                                    if (a.call(b, l, h, c)) return l;
                                    h++;
                                }
                            },
                        });
                    Array.prototype.map ||
                        (Array.prototype.map = function (a) {
                            var b, c;
                            if (null == this) throw new TypeError("this is null or not defined");
                            var g = Object(this),
                                h = g.length >>> 0;
                            if ("function" !== typeof a) throw new TypeError(a + " is not a function");
                            1 < arguments.length && (b = arguments[1]);
                            var l = Array(h);
                            for (c = 0; c < h; ) {
                                if (c in g) {
                                    var d = g[c];
                                    d = a.call(b, d, c, g);
                                    l[c] = d;
                                }
                                c++;
                            }
                            return l;
                        });
                    (function (a, b) {
                        var c = {
                                extend: function (n, r) {
                                    var t = {},
                                        u;
                                    for (u in n) t[u] = r[u] && 0 === r[u].length % 2 ? r[u].concat(n[u]) : n[u];
                                    return t;
                                },
                                has: function (n, r) {
                                    return "string" === typeof n ? -1 !== r.toLowerCase().indexOf(n.toLowerCase()) : !1;
                                },
                                lowerize: function (n) {
                                    return n.toLowerCase();
                                },
                                major: function (n) {
                                    return "string" === typeof n ? n.replace(/[^\d\.]/g, "").split(".")[0] : b;
                                },
                                trim: function (n) {
                                    return n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
                                },
                            },
                            g = function (n, r) {
                                for (var t = 0, u, x, z, v, F, A; t < r.length && !F; ) {
                                    var E = r[t],
                                        H = r[t + 1];
                                    for (u = x = 0; u < E.length && !F; )
                                        if ((F = E[u++].exec(n)))
                                            for (z = 0; z < H.length; z++)
                                                (A = F[++x]),
                                                    (v = H[z]),
                                                    "object" === typeof v && 0 < v.length
                                                        ? 2 == v.length
                                                            ? (this[v[0]] = "function" == typeof v[1] ? v[1].call(this, A) : v[1])
                                                            : 3 == v.length
                                                            ? (this[v[0]] = "function" !== typeof v[1] || (v[1].exec && v[1].test) ? (A ? A.replace(v[1], v[2]) : b) : A ? v[1].call(this, A, v[2]) : b)
                                                            : 4 == v.length && (this[v[0]] = A ? v[3].call(this, A.replace(v[1], v[2])) : b)
                                                        : (this[v] = A ? A : b);
                                    t += 2;
                                }
                            },
                            h = function (n, r) {
                                for (var t in r)
                                    if ("object" === typeof r[t] && 0 < r[t].length)
                                        for (var u = 0; u < r[t].length; u++) {
                                            if (c.has(r[t][u], n)) return "?" === t ? b : t;
                                        }
                                    else if (c.has(r[t], n)) return "?" === t ? b : t;
                                return n;
                            },
                            l = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", "8.1": "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" },
                            d = {
                                browser: [
                                    [/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i],
                                    ["name", "version"],
                                    [/(opios)[\/\s]+([\w\.]+)/i],
                                    [["name", "Opera Mini"], "version"],
                                    [/\s(opr)\/([\w\.]+)/i],
                                    [["name", "Opera"], "version"],
                                    [
                                        /(kindle)\/([\w\.]+)/i,
                                        /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
                                        /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
                                        /(?:ms|\()(ie)\s([\w\.]+)/i,
                                        /(rekonq)\/([\w\.]*)/i,
                                        /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i,
                                    ],
                                    ["name", "version"],
                                    [/(konqueror)\/([\w\.]+)/i],
                                    [["name", "Konqueror"], "version"],
                                    [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
                                    [["name", "IE"], "version"],
                                    [/(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i],
                                    [["name", "Edge"], "version"],
                                    [/(yabrowser)\/([\w\.]+)/i],
                                    [["name", "Yandex"], "version"],
                                    [/(puffin)\/([\w\.]+)/i],
                                    [["name", "Puffin"], "version"],
                                    [/(focus)\/([\w\.]+)/i],
                                    [["name", "Firefox Focus"], "version"],
                                    [/(opt)\/([\w\.]+)/i],
                                    [["name", "Opera Touch"], "version"],
                                    [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],
                                    [["name", "UCBrowser"], "version"],
                                    [/(comodo_dragon)\/([\w\.]+)/i],
                                    [["name", /_/g, " "], "version"],
                                    [/(windowswechat qbcore)\/([\w\.]+)/i],
                                    [["name", "WeChat(Win) Desktop"], "version"],
                                    [/(micromessenger)\/([\w\.]+)/i],
                                    [["name", "WeChat"], "version"],
                                    [/(brave)\/([\w\.]+)/i],
                                    [["name", "Brave"], "version"],
                                    [/(qqbrowserlite)\/([\w\.]+)/i],
                                    ["name", "version"],
                                    [/(QQ)\/([\d\.]+)/i],
                                    ["name", "version"],
                                    [/m?(qqbrowser)[\/\s]?([\w\.]+)/i],
                                    ["name", "version"],
                                    [/(BIDUBrowser)[\/\s]?([\w\.]+)/i],
                                    ["name", "version"],
                                    [/(2345Explorer)[\/\s]?([\w\.]+)/i],
                                    ["name", "version"],
                                    [/(MetaSr)[\/\s]?([\w\.]+)/i],
                                    ["name"],
                                    [/(LBBROWSER)/i],
                                    ["name"],
                                    [/xiaomi\/miuibrowser\/([\w\.]+)/i],
                                    ["version", ["name", "MIUI Browser"]],
                                    [/;fbav\/([\w\.]+);/i],
                                    ["version", ["name", "Facebook"]],
                                    [/safari\s(line)\/([\w\.]+)/i, /android.+(line)\/([\w\.]+)\/iab/i],
                                    ["name", "version"],
                                    [/headlesschrome(?:\/([\w\.]+)|\s)/i],
                                    ["version", ["name", "Chrome Headless"]],
                                    [/\swv\).+(chrome)\/([\w\.]+)/i],
                                    [["name", /(.+)/, "$1 WebView"], "version"],
                                    [/((?:oculus|samsung)browser)\/([\w\.]+)/i],
                                    [["name", /(.+(?:g|us))(.+)/, "$1 $2"], "version"],
                                    [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],
                                    ["version", ["name", "Android Browser"]],
                                    [/(sailfishbrowser)\/([\w\.]+)/i],
                                    [["name", "Sailfish Browser"], "version"],
                                    [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],
                                    ["name", "version"],
                                    [/(dolfin)\/([\w\.]+)/i],
                                    [["name", "Dolphin"], "version"],
                                    [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
                                    [["name", "Chrome"], "version"],
                                    [/(coast)\/([\w\.]+)/i],
                                    [["name", "Opera Coast"], "version"],
                                    [/fxios\/([\w\.-]+)/i],
                                    ["version", ["name", "Firefox"]],
                                    [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
                                    ["version", ["name", "Mobile Safari"]],
                                    [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
                                    ["version", "name"],
                                    [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                                    [["name", "GSA"], "version"],
                                    [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                                    ["name", ["version", h, { "1.0": "/8", "1.2": "/1", "1.3": "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]],
                                    [/(webkit|khtml)\/([\w\.]+)/i],
                                    ["name", "version"],
                                    [/(navigator|netscape)\/([\w\.-]+)/i],
                                    [["name", "Netscape"], "version"],
                                    [
                                        /(swiftfox)/i,
                                        /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                                        /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,
                                        /(mozilla)\/([\w\.]+).+rv:.+gecko\/\d+/i,
                                        /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                                        /(links)\s\(([\w\.]+)/i,
                                        /(gobrowser)\/?([\w\.]*)/i,
                                        /(ice\s?browser)\/v?([\w\._]+)/i,
                                        /(mosaic)[\/\s]([\w\.]+)/i,
                                    ],
                                    ["name", "version"],
                                ],
                                cpu: [
                                    [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
                                    [["architecture", "amd64"]],
                                    [/(ia32(?=;))/i],
                                    [["architecture", c.lowerize]],
                                    [/((?:i[346]|x)86)[;\)]/i],
                                    [["architecture", "ia32"]],
                                    [/windows\s(ce|mobile);\sppc;/i],
                                    [["architecture", "arm"]],
                                    [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
                                    [["architecture", /ower/, "", c.lowerize]],
                                    [/(sun4\w)[;\)]/i],
                                    [["architecture", "sparc"]],
                                    [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],
                                    [["architecture", c.lowerize]],
                                ],
                                device: [
                                    [/\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i],
                                    ["model", "vendor", ["type", "tablet"]],
                                    [/applecoremedia\/[\w\.]+ \((ipad)/],
                                    ["model", ["vendor", "Apple"], ["type", "tablet"]],
                                    [/(apple\s{0,1}tv)/i],
                                    [
                                        ["model", "Apple TV"],
                                        ["vendor", "Apple"],
                                    ],
                                    [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(hp).+(tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i],
                                    ["vendor", "model", ["type", "tablet"]],
                                    [/(kf[A-z]+)\sbuild\/.+silk\//i],
                                    ["model", ["vendor", "Amazon"], ["type", "tablet"]],
                                    [/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i],
                                    [
                                        ["model", h, { "Fire Phone": ["SD", "KF"] }],
                                        ["vendor", "Amazon"],
                                        ["type", "mobile"],
                                    ],
                                    [/android.+aft([bms])\sbuild/i],
                                    ["model", ["vendor", "Amazon"], ["type", "smarttv"]],
                                    [/\((ip[honed|\s\w*]+);.+(apple)/i],
                                    ["model", "vendor", ["type", "mobile"]],
                                    [/\((ip[honed|\s\w*]+);/i],
                                    ["model", ["vendor", "Apple"], ["type", "mobile"]],
                                    [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i],
                                    ["vendor", "model", ["type", "mobile"]],
                                    [/\(bb10;\s(\w+)/i],
                                    ["model", ["vendor", "BlackBerry"], ["type", "mobile"]],
                                    [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i],
                                    ["model", ["vendor", "Asus"], ["type", "tablet"]],
                                    [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
                                    [
                                        ["vendor", "Sony"],
                                        ["model", "Xperia Tablet"],
                                        ["type", "tablet"],
                                    ],
                                    [/android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i],
                                    ["model", ["vendor", "Sony"], ["type", "mobile"]],
                                    [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
                                    ["vendor", "model", ["type", "console"]],
                                    [/android.+;\s(shield)\sbuild/i],
                                    ["model", ["vendor", "Nvidia"], ["type", "console"]],
                                    [/(playstation\s[34portablevi]+)/i],
                                    ["model", ["vendor", "Sony"], ["type", "console"]],
                                    [/(sprint\s(\w+))/i],
                                    [
                                        ["vendor", h, { HTC: "APA", Sprint: "Sprint" }],
                                        ["model", h, { "Evo Shift 4G": "7373KT" }],
                                        ["type", "mobile"],
                                    ],
                                    [/(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i, /(zte)-(\w*)/i, /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i],
                                    ["vendor", ["model", /_/g, " "], ["type", "mobile"]],
                                    [/(nexus\s9)/i],
                                    ["model", ["vendor", "HTC"], ["type", "tablet"]],
                                    [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i],
                                    ["model", ["vendor", "Huawei"], ["type", "mobile"]],
                                    [/(microsoft);\s(lumia[\s\w]+)/i],
                                    ["vendor", "model", ["type", "mobile"]],
                                    [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
                                    ["model", ["vendor", "Microsoft"], ["type", "console"]],
                                    [/(kin\.[onetw]{3})/i],
                                    [
                                        ["model", /\./g, " "],
                                        ["vendor", "Microsoft"],
                                        ["type", "mobile"],
                                    ],
                                    [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w*)/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i],
                                    ["model", ["vendor", "Motorola"], ["type", "mobile"]],
                                    [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
                                    ["model", ["vendor", "Motorola"], ["type", "tablet"]],
                                    [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],
                                    [
                                        ["vendor", c.trim],
                                        ["model", c.trim],
                                        ["type", "smarttv"],
                                    ],
                                    [/hbbtv.+maple;(\d+)/i],
                                    [
                                        ["model", /^/, "SmartTV"],
                                        ["vendor", "Samsung"],
                                        ["type", "smarttv"],
                                    ],
                                    [/\(dtv[\);].+(aquos)/i],
                                    ["model", ["vendor", "Sharp"], ["type", "smarttv"]],
                                    [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i],
                                    [["vendor", "Samsung"], "model", ["type", "tablet"]],
                                    [/smart-tv.+(samsung)/i],
                                    ["vendor", ["type", "smarttv"], "model"],
                                    [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i, /sec-((sgh\w+))/i],
                                    [["vendor", "Samsung"], "model", ["type", "mobile"]],
                                    [/sie-(\w*)/i],
                                    ["model", ["vendor", "Siemens"], ["type", "mobile"]],
                                    [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]*)/i],
                                    [["vendor", "Nokia"], "model", ["type", "mobile"]],
                                    [/android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i],
                                    ["model", ["vendor", "Acer"], ["type", "tablet"]],
                                    [/android.+([vl]k\-?\d{3})\s+build/i],
                                    ["model", ["vendor", "LG"], ["type", "tablet"]],
                                    [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
                                    [["vendor", "LG"], "model", ["type", "tablet"]],
                                    [/(lg) netcast\.tv/i],
                                    ["vendor", "model", ["type", "smarttv"]],
                                    [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w*)/i, /android.+lg(\-?[\d\w]+)\s+build/i],
                                    ["model", ["vendor", "LG"], ["type", "mobile"]],
                                    [/(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i],
                                    ["vendor", "model", ["type", "tablet"]],
                                    [/android.+(ideatab[a-z0-9\-\s]+)/i],
                                    ["model", ["vendor", "Lenovo"], ["type", "tablet"]],
                                    [/(lenovo)[_\s-]?([\w-]+)/i],
                                    ["vendor", "model", ["type", "mobile"]],
                                    [/linux;.+((jolla));/i],
                                    ["vendor", "model", ["type", "mobile"]],
                                    [/((pebble))app\/[\d\.]+\s/i],
                                    ["vendor", "model", ["type", "wearable"]],
                                    [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],
                                    ["vendor", "model", ["type", "mobile"]],
                                    [/crkey/i],
                                    [
                                        ["model", "Chromecast"],
                                        ["vendor", "Google"],
                                    ],
                                    [/android.+;\s(glass)\s\d/i],
                                    ["model", ["vendor", "Google"], ["type", "wearable"]],
                                    [/android.+;\s(pixel c)[\s)]/i],
                                    ["model", ["vendor", "Google"], ["type", "tablet"]],
                                    [/android.+;\s(pixel( [23])?( xl)?)[\s)]/i],
                                    ["model", ["vendor", "Google"], ["type", "mobile"]],
                                    [
                                        /android.+;\s(\w+)\s+build\/hm\1/i,
                                        /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,
                                        /android.+(mi[\s\-_]*(?:a\d|one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,
                                        /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i,
                                    ],
                                    [
                                        ["model", /_/g, " "],
                                        ["vendor", "Xiaomi"],
                                        ["type", "mobile"],
                                    ],
                                    [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i],
                                    [
                                        ["model", /_/g, " "],
                                        ["vendor", "Xiaomi"],
                                        ["type", "tablet"],
                                    ],
                                    [/android.+;\s(m[1-5]\snote)\sbuild/i],
                                    ["model", ["vendor", "Meizu"], ["type", "mobile"]],
                                    [/(mz)-([\w-]{2,})/i],
                                    [["vendor", "Meizu"], "model", ["type", "mobile"]],
                                    [/android.+a000(1)\s+build/i, /android.+oneplus\s(a\d{4})\s+build/i],
                                    ["model", ["vendor", "OnePlus"], ["type", "mobile"]],
                                    [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],
                                    ["model", ["vendor", "RCA"], ["type", "tablet"]],
                                    [/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i],
                                    ["model", ["vendor", "Dell"], ["type", "tablet"]],
                                    [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],
                                    ["model", ["vendor", "Verizon"], ["type", "tablet"]],
                                    [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],
                                    [["vendor", "Barnes & Noble"], "model", ["type", "tablet"]],
                                    [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],
                                    ["model", ["vendor", "NuVision"], ["type", "tablet"]],
                                    [/android.+;\s(k88)\sbuild/i],
                                    ["model", ["vendor", "ZTE"], ["type", "tablet"]],
                                    [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],
                                    ["model", ["vendor", "Swiss"], ["type", "mobile"]],
                                    [/android.+[;\/]\s*(zur\d{3})\s+build/i],
                                    ["model", ["vendor", "Swiss"], ["type", "tablet"]],
                                    [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],
                                    ["model", ["vendor", "Zeki"], ["type", "tablet"]],
                                    [/(android).+[;\/]\s+([YR]\d{2})\s+build/i, /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i],
                                    [["vendor", "Dragon Touch"], "model", ["type", "tablet"]],
                                    [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],
                                    ["model", ["vendor", "Insignia"], ["type", "tablet"]],
                                    [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],
                                    ["model", ["vendor", "NextBook"], ["type", "tablet"]],
                                    [/android.+[;\/]\s*(Xtreme_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],
                                    [["vendor", "Voice"], "model", ["type", "mobile"]],
                                    [/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],
                                    [["vendor", "LvTel"], "model", ["type", "mobile"]],
                                    [/android.+;\s(PH-1)\s/i],
                                    ["model", ["vendor", "Essential"], ["type", "mobile"]],
                                    [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],
                                    ["model", ["vendor", "Envizen"], ["type", "tablet"]],
                                    [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],
                                    ["vendor", "model", ["type", "tablet"]],
                                    [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],
                                    ["model", ["vendor", "MachSpeed"], ["type", "tablet"]],
                                    [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],
                                    ["vendor", "model", ["type", "tablet"]],
                                    [/android.+[;\/]\s*TU_(1491)\s+build/i],
                                    ["model", ["vendor", "Rotor"], ["type", "tablet"]],
                                    [/android.+(KS(.+))\s+build/i],
                                    ["model", ["vendor", "Amazon"], ["type", "tablet"]],
                                    [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],
                                    ["vendor", "model", ["type", "tablet"]],
                                    [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i],
                                    [["type", c.lowerize], "vendor", "model"],
                                    [/[\s\/\(](smart-?tv)[;\)]/i],
                                    [["type", "smarttv"]],
                                    [/(android[\w\.\s\-]{0,9});.+build/i],
                                    ["model", ["vendor", "Generic"]],
                                ],
                                engine: [
                                    [/windows.+\sedge\/([\w\.]+)/i],
                                    ["version", ["name", "EdgeHTML"]],
                                    [/webkit\/537\.36.+chrome\/(?!27)/i],
                                    [["name", "Blink"]],
                                    [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i],
                                    ["name", "version"],
                                    [/rv:([\w\.]{1,9}).+(gecko)/i],
                                    ["version", "name"],
                                ],
                                os: [
                                    [/microsoft\s(windows)\s(vista|xp)/i],
                                    ["name", "version"],
                                    [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],
                                    ["name", ["version", h, l]],
                                    [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
                                    [
                                        ["name", "Windows"],
                                        ["version", h, l],
                                    ],
                                    [/\((bb)(10);/i],
                                    [["name", "BlackBerry"], "version"],
                                    [/(blackberry)\w*\/?([\w\.]*)/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i],
                                    ["name", "version"],
                                    [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],
                                    [["name", "Symbian"], "version"],
                                    [/\((series40);/i],
                                    ["name"],
                                    [/mozilla.+\(mobile;.+gecko.+firefox/i],
                                    [["name", "Firefox OS"], "version"],
                                    [
                                        /(nintendo|playstation)\s([wids34portablevu]+)/i,
                                        /(mint)[\/\s\(]?(\w*)/i,
                                        /(mageia|vectorlinux)[;\s]/i,
                                        /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
                                        /(hurd|linux)\s?([\w\.]*)/i,
                                        /(gnu)\s?([\w\.]*)/i,
                                    ],
                                    ["name", "version"],
                                    [/(cros)\s[\w]+\s([\w\.]+\w)/i],
                                    [["name", "Chromium OS"], "version"],
                                    [/(sunos)\s?([\w\.\d]*)/i],
                                    [["name", "Solaris"], "version"],
                                    [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],
                                    ["name", "version"],
                                    [/(haiku)\s(\w+)/i],
                                    ["name", "version"],
                                    [/cfnetwork\/.+darwin/i, /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i],
                                    [
                                        ["version", /_/g, "."],
                                        ["name", "iOS"],
                                    ],
                                    [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i],
                                    [
                                        ["name", "Mac OS"],
                                        ["version", /_/g, "."],
                                    ],
                                    [/((?:open)?solaris)[\/\s-]?([\w\.]*)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i, /(unix)\s?([\w\.]*)/i],
                                    ["name", "version"],
                                ],
                            },
                            f = function (n, r) {
                                "object" === typeof n && ((r = n), (n = b));
                                if (!(this instanceof f)) return new f(n, r).getResult();
                                var t = n || (a && a.navigator && a.navigator.userAgent ? a.navigator.userAgent : ""),
                                    u = r ? c.extend(d, r) : d;
                                this.getBrowser = function () {
                                    var x = { name: b, version: b };
                                    g.call(x, t, u.browser);
                                    x.major = c.major(x.version);
                                    return x;
                                };
                                this.getCPU = function () {
                                    var x = { architecture: b };
                                    g.call(x, t, u.cpu);
                                    return x;
                                };
                                this.getDevice = function () {
                                    var x = { vendor: b, model: b, type: b };
                                    g.call(x, t, u.device);
                                    return x;
                                };
                                this.getEngine = function () {
                                    var x = { name: b, version: b };
                                    g.call(x, t, u.engine);
                                    return x;
                                };
                                this.getOS = function () {
                                    var x = { name: b, version: b };
                                    g.call(x, t, u.os);
                                    return x;
                                };
                                this.getResult = function () {
                                    return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
                                };
                                this.getUA = function () {
                                    return t;
                                };
                                this.setUA = function (x) {
                                    t = x;
                                    return this;
                                };
                                return this;
                            };
                        f.VERSION = "0.7.20";
                        f.BROWSER = { NAME: "name", MAJOR: "major", VERSION: "version" };
                        f.CPU = { ARCHITECTURE: "architecture" };
                        f.DEVICE = { MODEL: "model", VENDOR: "vendor", TYPE: "type", CONSOLE: "console", MOBILE: "mobile", SMARTTV: "smarttv", TABLET: "tablet", WEARABLE: "wearable", EMBEDDED: "embedded" };
                        f.ENGINE = { NAME: "name", VERSION: "version" };
                        f.OS = { NAME: "name", VERSION: "version" };
                        "undefined" !== typeof exports ? ("undefined" !== typeof module && module.exports && (exports = module.exports = f), (exports.UserAgentParser = f)) : a && (a.UserAgentParser = f);
                        var k = a && (a.jQuery || a.Zepto);
                        if ("undefined" !== typeof k && !k.ua) {
                            var m = new f();
                            k.ua = m.getResult();
                            k.ua.get = function () {
                                return m.getUA();
                            };
                            k.ua.set = function (n) {
                                m.setUA(n);
                                n = m.getResult();
                                for (var r in n) k.ua[r] = n[r];
                            };
                        }
                    })("object" === typeof window ? window : this);
                    var e = {
                        Core: !0,
                        Guid: "5ff0fb62-0643-4ff1-aaee-c737f9ffc0e0",
                        Version: "asynch",
                        InfinityHost: "//otnolatrnup.com",
                        CDNHost: "//cdn.otnolatrnup.com",
                        EmailInfoAddress: "info@adsupply.com",
                        ClickTagEnabled: false,
                        SiteId: 0,
                        SiteName: "",
                        ClientIP: "",
                        ServerDate: new Date(),
                        Modules: {},
                        Media: {},
                        PopLoaded: !1,
                        PassParams: "",
                        Bypass: "0",
                        IsFastPop: true,
                        FastPopZone: { Id: 21498, Name: "PopUnder_AB" },
                        PopRedirectDelay: 200,
                        ScriptHost: "otnolatrnup.com",
                        DomainAlias: "otnolatrnup.com",
                        IsAdblockRequest: !0,
                        SubID: "",
                        TId: "",
                        _Top: null,
                        UaParser: null,
                        UseAjax: !1,
                        EncodeUrl: !1,
                        DFPImpressionUrl: null,
                        MediaSourceTypes: { Url: 1, Image: 2, Script: 3, Html: 4, Video: 5, VideoTag: 6, OnClickIFrame: 7, HeaderBidding: 8, Native: 9, InternalLink: 10, Programmatic: 11 },
                        AbortFastPop: !1,
                        TabHistoryStorageName: "InfSTAdUri",
                        DebugEnabled: !1,
                        RssFeedParserUrl: "https://xmlfeedparser.4dsply.com",
                        UserMotionLogging: !1,
                        LocalIpAddress: null,
                        MetaKeywordOverride: "",
                        CountryCode: "INF_COUNTRY_CODE",
                        Init: function () {
                            try {
                                var a = function (z, v) {
                                        var F = z.getElementsByTagName("iframe");
                                        if (0 === F.length) return !1;
                                        for (var A = 0; A < F.length; A++) {
                                            var E = F[A].contentDocument || F[A].contentWindow.document || F[A].document;
                                            if (E === v || !0 === childFramesContainsTag(E, v)) return !0;
                                        }
                                    },
                                    b = this;
                                document.getElementById("infinity");
                                this._Top = self;
                                if (top != self)
                                    try {
                                        if (top.document.location.toString()) {
                                            this._Top = top;
                                            for (var c, g = top.document.getElementsByTagName("iframe"), h = 0; h < g.length; h++)
                                                try {
                                                    var l = g[h].contentDocument || g[h].contentWindow.document || g[h].document;
                                                    if (l === self.document || a(l, self.document)) {
                                                        c = g[h];
                                                        break;
                                                    }
                                                } catch (z) {
                                                    e.ConsoleLog(z);
                                                }
                                            if (c) {
                                                var d = document.createAttribute("data-inf-script-frame");
                                                c.setAttributeNode(d);
                                            }
                                        }
                                    } catch (z) {}
                                var f = new UserAgentParser();
                                this.UaParser = f;
                                f.getBrowser();
                                this.Browser = new this.InitBrowser();
                                if (!false || -1 == navigator.userAgent.indexOf("7.0.2 Safari")) {
                                    e.TabHistoryManipulator(e.TabHistoryStorageName);
                                    this.IsFastPop && this.InitFastPop();
                                    var k = new Date().getTimezoneOffset(),
                                        m = e.GetDfpTagReferrerUrl() || window.document.referrer;
                                    if (e.IsAdblockRequest) {
                                        var n = encodeURIComponent(k),
                                            r = encodeURIComponent(Math.floor(1e5 * Math.random() + 1)),
                                            t = 0 < this.TId.length ? this.TId : "null";
                                        this.Script.Add(
                                            this.InfinityHost +
                                                "/" +
                                                (n ? n : "null") +
                                                "/" +
                                                (this.Guid ? this.Guid : "null") +
                                                "/" +
                                                (r ? r : "null") +
                                                "/" +
                                                (this.Version ? this.Version : "null") +
                                                "/null/123/" +
                                                encodeURIComponent(0 < this.SubID.length ? this.SubID : "null") +
                                                "/" +
                                                e.IsAdblockRequest +
                                                "/" +
                                                this.GetStdTimezoneOffset() +
                                                "/" +
                                                e.GetSupportedVideo() +
                                                "/" +
                                                this.GetWindowWidth() +
                                                "/" +
                                                this.GetWindowHeight() +
                                                "/" +
                                                encodeURIComponent(t) +
                                                "/" +
                                                e.GetScreenWidth() +
                                                "x" +
                                                e.GetScreenHeight() +
                                                "/" +
                                                encodeURIComponent(e.GetKeywords()) +
                                                "/Tag.a1b",
                                            !0
                                        );
                                    } else {
                                        var u = e._Top.document.location.ancestorOrigins,
                                            x = e.GetDfpTagReferrerUrl() || top !== self ? (void 0 !== u && 1 < u.length ? u[u.length - 1] : e.GetTopFrameCurrentUrl()) : e._Top.document.location.href;
                                        this.Script.Add(
                                            this.InfinityHost +
                                                "/Tag.engine?time=" +
                                                encodeURIComponent(k) +
                                                "&id=" +
                                                this.Guid +
                                                "&rand=" +
                                                encodeURIComponent(Math.floor(1e5 * Math.random() + 1)) +
                                                "&ver=" +
                                                this.Version +
                                                "&referrerUrl=" +
                                                encodeURIComponent(m) +
                                                "&fingerPrint=123" +
                                                (0 < this.SubID.length ? "&subId=" + this.SubID : "") +
                                                (0 < this.TId.length ? "&tid=" + this.TId : "") +
                                                "&abr=" +
                                                e.IsAdblockRequest +
                                                "&stdTime=" +
                                                this.GetStdTimezoneOffset() +
                                                "&fpe=" +
                                                e.GetSupportedVideo() +
                                                "&bw=" +
                                                this.GetWindowWidth() +
                                                "&bh=" +
                                                this.GetWindowHeight() +
                                                "&res=" +
                                                e.GetScreenWidth() +
                                                "x" +
                                                e.GetScreenHeight() +
                                                (null != x && "" !== x ? "&curl=" + encodeURIComponent(x) : "") +
                                                "&kw=" +
                                                encodeURIComponent(e.GetKeywords()),
                                            !0
                                        );
                                    }
                                    this.Script.Load(function () {
                                        if ("undefined" != typeof b.Media.Items && void 0 !== b.Media.Items && null !== b.Media.Items) {
                                            for (var z = 0; z < b.Media.Items.length; z++) {
                                                var v = b.Media.Items[z],
                                                    F = b.LogZoneFilter({ Id: v.ZoneId, Name: v.ZoneName });
                                                ("PopUnder" === v.MediaType || b.IsClientSideFiltersPassed(v.ClientSideFilters, F)) && b.Script.Add(b.CDNHost + "/Scripts/MediaScripts/" + v.ScriptUri, !0);
                                            }
                                            b.Script.Load(function () {
                                                for (var A = 0; A < b.Media.Items.length; A++) {
                                                    var E = b.Media.Items[A],
                                                        H = E.MediaType,
                                                        G = b.LogZoneFilter({ Id: E.ZoneId, Name: E.ZoneName });
                                                    b.ConsoleGroup("TagRB results for Zone " + E.ZoneName + "(" + E.ZoneId + ")");
                                                    b.ConsoleLog(E);
                                                    b.ConsoleGroupEnd();
                                                    if ("undefined" != typeof b.Modules[H] && ("PopUnder" === H || b.IsClientSideFiltersPassed(E.ClientSideFilters), G)) b.Modules[H](E, b._Top);
                                                }
                                            });
                                        }
                                    });
                                    "function" === typeof InfCustomerCallback && InfCustomerCallback();
                                }
                            } catch (z) {
                                e.ConsoleLog(z);
                            }
                        },
                        GetDfpTagCurrentUrl: function () {
                            var a = null;
                            try {
                                e.IsDfpTag() && (a = null != window.parent.frameElement && "" != window.parent.document.referrer ? window.parent.document.referrer : window.parent.document.location.href);
                            } catch (b) {
                                e.ConsoleLog(b);
                            }
                            return a;
                        },
                        GetDfpTagReferrerUrl: function () {
                            var a = null;
                            try {
                                e.IsDfpTag() && (a = null != window.parent.frameElement && "" != window.parent.parent.document.referrer ? window.parent.parent.document.referrer : window.parent.document.referrer);
                            } catch (b) {
                                e.ConsoleLog(b);
                            }
                            return a;
                        },
                        GetTopFrameCurrentUrl: function () {
                            var a = null;
                            try {
                                a = null != window.parent.frameElement && "" != window.parent.document.referrer ? window.parent.document.referrer : window.parent.document.location.href;
                            } catch (b) {
                                e.ConsoleLog(b), (a = document.referrer);
                            }
                            return a;
                        },
                        IsDfpTag: function () {
                            return null != window.frameElement && "true" === window.frameElement.getAttribute("data-inf-dfp");
                        },
                        InitFastPop: function () {
                            window.console = window.console || { log: function (d) {} };
                            e.ConsoleLog("INF_FPU: Initiated");
                            e.PopSettings = {};
                            e.PopSettings.Cap = 3;
                            e.PopSettings.CapLength = 900;
                            e.PopSettings.Width = 0;
                            e.PopSettings.Height = 0;
                            e.PopSettings.IsPopunder = true;
                            e.PopSettings.RespectTargetBlank = false;
                            e.PopSettings.MobileHistory = false;
                            e.PopSettings.PopUnderDontTriggerSelector = ".nopop, .nopop *";
                            e.PopSettings.PopUnderTriggerOnSelector = ".popsok, #download-link";
                            e.PopSettings.PopUnderTriggerOnSelectorDepth = 12;
                            e.PopSettings.IsTracking = false;
                            e.PopSettings.SameTabAdSettings = {};
                            e.PopSettings.SameTabAdSettings.AdblockOnly = true;
                            e.PopSettings.SameTabAdSettings.Chrome = true;
                            e.PopSettings.SameTabAdSettings.Edge = false;
                            e.PopSettings.SameTabAdSettings.Firefox = true;
                            e.PopSettings.SameTabAdSettings.IE = false;
                            e.PopSettings.SameTabAdSettings.Opera = false;
                            e.PopSettings.SameTabAdSettings.Safari = true;
                            e.PopSettings.SameTabAdSettings.Windows = true;
                            e.PopSettings.SameTabAdSettings.OSX = true;
                            e.PopSettings.SameTabAdSettings.ClickAnywhere = false;
                            e.PopSettings.UseRemoteMediaHost = "false";
                            e.PopSettings.UsePopCustomHost = "false";
                            e.PopSettings.PopCustomHostUrl = "";
                            e.PopSettings.PublisherDomainAliasUrl = "otnolatrnup.com";
                            e.PopSettings.ScriptHost = "otnolatrnup.com";
                            e.PopSettings.SiteFrequencyCapFilters = [];
                            e.PopSettings.KeywordFilter = null;
                            e.PopSettings.ClientSideFilters = [];
                            e.PopSettings.UserAgentFilter = null;
                            e.PopSettings.OffsetFilter = { Type: "Any", Offset: 1 };
                            e.PopSettings.BrowserFilter = {
                                TargetChrome: true,
                                TargetEdge: true,
                                TargetFirefox: true,
                                TargetIe: false,
                                TargetOpera: true,
                                TargetOthers: true,
                                TargetSafari: true,
                                TargetIe9: false,
                                TargetIe10: false,
                                TargetIe11: false,
                                TargetWebView: false,
                                TargetIeOthers: false,
                            };
                            e.PopSettings.DeviceFilter = null;
                            e.PopSettings.OSFilter = null;
                            e.PopSettings.ReferrerFilter = null;
                            e.PopSettings.RequireToRunOnDomainFilter = null;
                            e.PopSettings.ZoneAdblockOnly = true;
                            e.PopSettings.ZoneAdblockExclusive = false;
                            e.PopSettings.ZoneAdblockIgnoreFrontEnd = true;
                            e.PopSettings.ChromePopApproach = 1;
                            e.PopSettings.InterceptFlash = false;
                            e.PopSettings.InterceptInlineFrames = false;
                            e.PopSettings.HiddenPopunderWaitForParentWindowToClose = true;
                            e.PopSettings.HiddenPopunderWaitForParentWindowToFocus = true;
                            e.PopSettings.HiddenPopunderWaitSecondsToLoadMedia = 0;
                            e.PopSettings.AllowMultiplePopsForTheSamePageView = false;
                            e.PopSettings.UseSameTab = function (d, f, k) {
                                var m = this.SameTabAdSettings;
                                return (
                                    a.PopSettings.IsPopunder &&
                                    void 0 !== m &&
                                    null !== m &&
                                    (0 == m.AdblockOnly || k) &&
                                    (("WINDOWS" === f.name.toUpperCase() && m.Windows) || ("MAC OS" === f.name.toUpperCase() && m.OSX)) &&
                                    (((d.chrome || "Chrome" == d.name) && m.Chrome) ||
                                        ((d.firefox || "Firefox" == d.name) && m.Firefox) ||
                                        ((d.msie || "IE" == d.name) && m.IE) ||
                                        ("Edge" == d.name && m.Edge) ||
                                        ((d.opera || "Opera" == d.name) && m.Opera) ||
                                        ((d.safari || "Safari" == d.name) && m.Safari))
                                );
                            };
                            var a = e,
                                b = a.InfinityHost,
                                c = encodeURIComponent(new Date().getTimezoneOffset()),
                                g = encodeURIComponent(window.document.referrer),
                                h = encodeURIComponent(this._Top.window.location.href),
                                l = encodeURIComponent(Math.floor(1e5 * Math.random() + 1));
                            (function (d, f) {
                                function k(q) {
                                    if (!q || !q.Keywords) return !0;
                                    for (
                                        var B = !1, J = e.GetDfpTagCurrentUrl() || window.location.href.toLowerCase(), L = 0;
                                        L < q.Keywords.length && !((B = q.Keywords[L].toLowerCase()), (B = q.IsRegex ? new RegExp(B).test(J) : -1 !== J.indexOf(B)));
                                        L++
                                    );
                                    return B !== q.Exclusive;
                                }
                                function m() {
                                    var q = e.PopSettings.UserAgentFilter;
                                    if (!q) return !0;
                                    H = e.UaParser;
                                    var B = !1,
                                        J = H.getUA(),
                                        L;
                                    for (L in q.UserAgentStrings) if (((B = q.UserAgentStrings[L]), (B = q.IsRegex ? new RegExp(B).test(J) : -1 !== J.indexOf(B)))) break;
                                    return B !== q.Exclusive;
                                }
                                function n() {
                                    if (e.PopSettings.ZoneAdblockIgnoreFrontEnd || void 0 === e.PopSettings.ZoneAdblockOnly) return !0;
                                    var q = !0;
                                    e.PopSettings.ZoneAdblockOnly && !e.IsAdblockRequest && (q = !1);
                                    var B = e.PopSettings.ZoneAdblockExclusive;
                                    return (B || q) && !(B && q);
                                }
                                function r() {
                                    if (!e.PopSettings.OffsetFilter) return !0;
                                    var q = e.Storage.GetCookie("g36FastPopSessionRequestNumber");
                                    if (null == q || isNaN(q)) q = 0;
                                    q++;
                                    e.Storage.SetCookie("g36FastPopSessionRequestNumber", q);
                                    switch (e.PopSettings.OffsetFilter.Type) {
                                        case "Any":
                                            return !0;
                                        case "OnlyOn":
                                            return q == e.PopSettings.OffsetFilter.Offset;
                                        case "Before":
                                            return q < e.PopSettings.OffsetFilter.Offset;
                                        case "After":
                                            return q > e.PopSettings.OffsetFilter.Offset;
                                    }
                                }
                                function t() {
                                    if (!e.PopSettings.BrowserFilter) return !0;
                                    var q = e.UaParser.getBrowser();
                                    return (
                                        (e.PopSettings.BrowserFilter.TargetChrome && "Chrome" == q.name) ||
                                        (e.PopSettings.BrowserFilter.TargetEdge && "Edge" == q.name) ||
                                        (e.PopSettings.BrowserFilter.TargetFirefox && "Firefox" == q.name) ||
                                        (e.PopSettings.BrowserFilter.TargetIe &&
                                            "IE" == q.name &&
                                            (("9" === q.major && e.PopSettings.BrowserFilter.TargetIe9) ||
                                                ("10" === q.major && e.PopSettings.BrowserFilter.TargetIe10) ||
                                                ("11" === q.major && e.PopSettings.BrowserFilter.TargetIe11) ||
                                                ("9" !== q.major && "10" !== q.major && "11" !== q.major && e.PopSettings.BrowserFilter.TargetIeOthers))) ||
                                        (e.PopSettings.BrowserFilter.TargetOpera && "Opera" == q.name) ||
                                        (e.PopSettings.BrowserFilter.TargetSafari && "Safari" == q.name) ||
                                        (e.PopSettings.BrowserFilter.TargetWebView && ("Chrome Headless" == q.name || "Chrome WebView" == q.name || "Facebook" == q.name || "GSA" == q.name)) ||
                                        ("Chrome" != q.name && "Edge" != q.name && "Firefox" != q.name && "IE" != q.name && "Opera" != q.name && "Safari" != q.name && e.PopSettings.BrowserFilter.TargetOthers)
                                    );
                                }
                                function u() {
                                    if (!e.PopSettings.DeviceFilter) return !0;
                                    var q = e.UaParser.getDevice();
                                    return (
                                        (e.PopSettings.DeviceFilter.TargetDesktop && ("console" == q.type || void 0 == q.type)) ||
                                        (e.PopSettings.DeviceFilter.TargetMobile && "mobile" == q.type) ||
                                        (e.PopSettings.DeviceFilter.TargetTablet && "tablet" == q.type)
                                    );
                                }
                                function x() {
                                    if (!e.PopSettings.OSFilter) return !0;
                                    var q = e.UaParser.getOS();
                                    return (
                                        (e.PopSettings.OSFilter.TargetAndroid && "Android" == q.name) ||
                                        (e.PopSettings.OSFilter.TargetIOS && "iOS" == q.name) ||
                                        (e.PopSettings.OSFilter.TargetOSX && "Mac OS" == q.name) ||
                                        (e.PopSettings.OSFilter.TargetWindows &&
                                            "Windows" == q.name &&
                                            (("Vista" == q.version && e.PopSettings.OSFilter.TargetWindowsVista) ||
                                                ("7" == q.version && e.PopSettings.OSFilter.TargetWindows7) ||
                                                ("8" == q.version && e.PopSettings.OSFilter.TargetWindows8) ||
                                                ("8.1" == q.version && e.PopSettings.OSFilter.TargetWindows81) ||
                                                ("10" == q.version && e.PopSettings.OSFilter.TargetWindows10) ||
                                                ("Vista" != q.version && "7" != q.version && "8" != q.version && "8.1" != q.version && "10" != q.version && e.PopSettings.OSFilter.TargetOtherVersions))) ||
                                        ("Android" != q.name && "Mac OS" != q.name && "iOS" != q.name && "Windows" != q.name && e.PopSettings.OSFilter.TargetOthers)
                                    );
                                }
                                function z(q, B, J, L, U, V) {
                                    var p = e,
                                        O = "directories=0,toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=" + J.toString() + ",height=" + L.toString() + ",screenX=" + U + ",screenY=" + V + "index=0,total=1",
                                        X = p.PopSettings.UseSameTab(w, G, p.IsAdblockRequest);
                                    (!e.PopSettings.InterceptFlash && !e.PopSettings.InterceptInlineFrames) ||
                                        X ||
                                        p.PopLoaded ||
                                        p.IsFastPopCapped() ||
                                        ((p.FlashClickInterceptor.ignoreElementPredicate = function (C) {
                                            if (p.PopSettings.RespectTargetBlank) {
                                                var P = p.GetParentLink(C);
                                                if ("_blank" === P.getAttribute("target") || "nofollow" === P.getAttribute("rel")) return !0;
                                            }
                                            return (
                                                p.IsDontTriggerForSelectorMatch(p.PopSettings.PopUnderDontTriggerSelector, C) ||
                                                (p.PopSettings.PopUnderTriggerOnSelector && !p.IsTriggerOnSelectorMatch(p.PopSettings.PopUnderTriggerOnSelector, C, p.PopSettings.PopUnderTriggerOnSelectorDepth))
                                            );
                                        }),
                                        p.FlashClickInterceptor.activate(w, p.IsMobile.any(p._Top), e.PopSettings.InterceptFlash ? p.IsFlashPluginEnabled() : !0));
                                    var Q = p.PopSettings.ChromePopApproach == p.Enums.chromePopApproach.tabOver,
                                        R = (w.chrome || "Chrome" === w.name) && p.PopSettings.IsPopunder && p.PopSettings.ChromePopApproach == p.Enums.chromePopApproach.mixed;
                                    try {
                                        if (
                                            !(
                                                !p.PopSettings.IsPopunder ||
                                                !p.ChromePopunder.supported() ||
                                                (!w.chrome && "Chrome" !== w.name) ||
                                                p.PopSettings.IsTracking ||
                                                Q ||
                                                R ||
                                                (void 0 !== p.PopSettings.SameTabAdSettings &&
                                                    ((p.PopSettings.SameTabAdSettings.Windows && "WINDOWS" === G.name.toUpperCase()) || (p.PopSettings.SameTabAdSettings.OSX && "MAC OS" === G.name.toUpperCase())) &&
                                                    (!p.PopSettings.SameTabAdSettings.AdblockOnly || p.IsAdblockRequest) &&
                                                    p.PopSettings.SameTabAdSettings.Chrome)
                                            )
                                        ) {
                                            p.ChromePopunder.init(null, e.PopSettings.ChromePopApproach);
                                            return;
                                        }
                                        !p.PopSettings.IsPopunder ||
                                            p.IsMobile.any(p._Top) ||
                                            (!w.chrome && "Chrome" !== w.name) ||
                                            p.PopSettings.IsTracking ||
                                            Q ||
                                            R ||
                                            (void 0 !== p.PopSettings.SameTabAdSettings &&
                                                ((p.PopSettings.SameTabAdSettings.Windows && "WINDOWS" !== G.name.toUpperCase()) || (p.PopSettings.SameTabAdSettings.OSX && "MAC OS" !== G.name.toUpperCase())) &&
                                                (!p.PopSettings.SameTabAdSettings.AdblockOnly || p.IsAdblockRequest) &&
                                                p.PopSettings.SameTabAdSettings.Chrome) ||
                                            ((p.PopSettings.SameTabAdSettings = p.PopSettings.SameTabAdSettings || {}),
                                            (p.PopSettings.SameTabAdSettings.AdblockOnly = !1),
                                            (p.PopSettings.SameTabAdSettings.Chrome = !0),
                                            (p.PopSettings.SameTabAdSettings.Windows = p.PopSettings.SameTabAdSettings.Windows || !0),
                                            (p.PopSettings.SameTabAdSettings.OSX = p.PopSettings.SameTabAdSettings.OSX || !0),
                                            (p.PopSettings.SameTabAdSettings.ClickAnywhere = p.PopSettings.SameTabAdSettings.ClickAnywhere || !1));
                                    } catch (C) {
                                        e.ConsoleLog(C);
                                    }
                                    try {
                                        if (p.EdgePopunder.supported(w, G)) {
                                            p.EdgePopunder.init();
                                            return;
                                        }
                                    } catch (C) {
                                        p.ConsoleLog(C);
                                    }
                                    var W = function () {
                                        var C = p._Top.document.createElement("iframe");
                                        C.setAttribute("style", "display:none;");
                                        p._Top.document.body.appendChild(C);
                                        C.src = q;
                                    };
                                    p.BindOnDocmentClick(function (C) {
                                        function P() {
                                            e.OnFastPopLoaded();
                                            e.PopRunning = !1;
                                            e.IncrementFastPopCap();
                                        }
                                        function S(y) {
                                            y.getRespectsSize() ? (y.setUrl(q), y.setLocation(U, V), y.setSize(J, L)) : y.setUrl(q + "&hosted=true");
                                            y.setOnSuccessCallback(function () {
                                                e.OnFastPopLoaded();
                                                e.PopRunning = !1;
                                                e.IncrementFastPopCap();
                                            });
                                            y.show(C);
                                        }
                                        if (!p.PopRunning)
                                            if (((p.PopRunning = !0), p.PopLoaded || p.IsFastPopCapped())) p.PopRunning = !1;
                                            else if (p.IsClientSideFiltersPassed(p.PopSettings.ClientSideFilters, p.LogZoneFilter(p.FastPopZone))) {
                                                try {
                                                    (window.console = window.console || { log: function (y) {} }), e.ConsoleLog(C);
                                                } catch (y) {}
                                                var D = C.target || C.srcElement;
                                                p.EventObject = C;
                                                if (p.IsDontTriggerForSelectorMatch(p.PopSettings.PopUnderDontTriggerSelector, D)) p.PopRunning = !1;
                                                else if (p.PopSettings.PopUnderTriggerOnSelector && !p.IsTriggerOnSelectorMatch(p.PopSettings.PopUnderTriggerOnSelector, D, p.PopSettings.PopUnderTriggerOnSelectorDepth)) p.PopRunning = !1;
                                                else if (
                                                    ("a" !== D.nodeName.toLowerCase() && (D = p.GetParentLink(D)),
                                                    p.PopSettings.RespectTargetBlank && D.getAttribute && ("_blank" === D.getAttribute("target") || "nofollow" === D.getAttribute("rel")))
                                                )
                                                    p.PopRunning = !1;
                                                else if (p.IsIgnoreElement(D)) p.PopRunning = !1;
                                                else if (p.IsMobile.any(p._Top)) {
                                                    if (!(("iOS" == G.name && parseFloat(G.version) < parseFloat("6")) || p.IsMobile.Windows(p._Top))) {
                                                        var I = e.UaParser.getUA();
                                                        if (!(-1 < I.indexOf("FBAN/FBIOS") || -1 < I.indexOf("FB_IAB/FB4A") || -1 < I.indexOf("FBAV"))) {
                                                            q = p.BasePopunder.buildUrl(q, p.Enums.SelectedPopType.TabUnder);
                                                            if ("function" !== typeof window.InfCustomFPSTAMobileFunc || p.PopSettings.IsTracking) {
                                                                if (
                                                                    "a" !== D.nodeName.toLowerCase() ||
                                                                    "#" == D.getAttribute("href") ||
                                                                    -1 != D.getAttribute("href").indexOf("javascript:") ||
                                                                    (p.PopSettings.RespectTargetBlank && ("_blank" === D.getAttribute("target") || "nofollow" === D.getAttribute("rel")))
                                                                )
                                                                    return (e.PopLoaded = !1), (e.PopRunning = !1), !0;
                                                                I = D.getAttribute("href");
                                                                e.OnFastPopLoaded();
                                                                p.IncrementFastPopCap();
                                                                e.PopRunning = !1;
                                                                if (p.PopSettings.IsTracking) W();
                                                                else {
                                                                    var M = "inftabwindow_" + Math.floor(1e8 * Math.random() + 1).toString();
                                                                    if (p.IsMobile.iOS(p._Top) && p.IsMobile.Opera(p._Top)) window.open(q, M), (p._Top.document.location = I);
                                                                    else {
                                                                        if ("iOS" === G.name && ("Chrome" === w.name || ("Mobile Safari" === w.name && parseFloat(w.version) < parseFloat("8")))) window.open(I, M);
                                                                        else if (e.PopSettings.MobileHistory)
                                                                            try {
                                                                                var T = window.open(I, M);
                                                                                try {
                                                                                    T.history.replaceState({ previous: e._Top.location.href }, null, e._Top.location.href);
                                                                                } catch (y) {
                                                                                    e.ConsoleLog(y);
                                                                                }
                                                                                T.addEventListener("popstate", function (y) {
                                                                                    T.location = y.state.previous;
                                                                                });
                                                                            } catch (y) {
                                                                                e.ConsoleLog(y), window.open(I, M);
                                                                            }
                                                                        else window.open(I, M);
                                                                        "Android" == G.name && D.setAttribute("href", q);
                                                                        e._Top.document.location = q;
                                                                    }
                                                                }
                                                                void 0 !== C.preventDefault && C.preventDefault();
                                                                return !1;
                                                            }
                                                            window.InfCustomFPSTAMobileFunc(C, G, w, D, q);
                                                        }
                                                    }
                                                } else {
                                                    I = function () {
                                                        var y = new e.Client(),
                                                            K =
                                                                "function" === typeof window.InfCustomFPSTAFunc
                                                                    ? new e.ExternalSameTab(function (N) {
                                                                          window.InfCustomFPSTAFunc(N, D, q);
                                                                      })
                                                                    : new e.SameTab({ clickAnywhere: e.PopSettings.SameTabAdSettings.ClickAnywhere });
                                                        if (!K.isSupported(y)) return (e.PopLoaded = !0), (e.PopRunning = !0);
                                                        if (!K.canShow(C)) return (e.PopLoaded = !1), (e.PopRunning = !1), !0;
                                                        K.setUrl(q + "&hosted=true");
                                                        K.setOnSuccessCallback(function () {
                                                            e.OnFastPopLoaded();
                                                            e.PopRunning = !1;
                                                            e.IncrementFastPopCap();
                                                        });
                                                        K.show(C);
                                                    };
                                                    M = function () {
                                                        var y = new e.TabOver();
                                                        S(y);
                                                    };
                                                    var Y = function () {
                                                            if ("true" === p.PopSettings.UseRemoteMediaHost && p.IsAdblockRequest) {
                                                                var y = window.open("true" === p.PopSettings.UsePopCustomHost ? p.PopSettings.PopCustomHostUrl : document.location.href, B, O);
                                                                setTimeout(function () {
                                                                    y.location.href = q;
                                                                }, p.PopRedirectDelay);
                                                            } else window.open(q, B, O);
                                                            e.IncrementFastPopCap();
                                                            e.OnFastPopLoaded();
                                                            e.PopRunning = !1;
                                                        },
                                                        Z = function () {
                                                            q = p.BasePopunder.buildUrl(q, p.Enums.SelectedPopType.PopUnder);
                                                            if (w.firefox || ("FIREFOX" === w.name.toUpperCase() && 53 > w.major)) {
                                                                var y = window.open("about:blank");
                                                                A = y.open(q, B, O);
                                                                setTimeout(function () {
                                                                    y.focus();
                                                                    y.close();
                                                                }, 100);
                                                            } else A = window.open(q, B, O);
                                                            A && ((w.firefox && "FIREFOX" === w.name.toUpperCase() && 53 > w.major) || v(), P());
                                                        },
                                                        aa = function () {
                                                            q = p.BasePopunder.buildUrl(q, p.Enums.SelectedPopType.PopUnder);
                                                            setTimeout(function () {
                                                                window.open(q, B, O);
                                                            }, 0);
                                                            setTimeout(function () {
                                                                var y = window.open("", "_self", "");
                                                                y && y.focus();
                                                            }, 0);
                                                            setTimeout(P, 1);
                                                        },
                                                        ba = function () {
                                                            var y = new e.PopOver();
                                                            S(y);
                                                        },
                                                        da = function () {
                                                            var y = new p.Client(),
                                                                K = [
                                                                    new p.TabOver(),
                                                                    new p.PopOver(),
                                                                    new p.SameTab({ clickAnywhere: !0 }),
                                                                    new p.DelayedPopUnder({ waitSecondsToLoadMedia: 0, waitForParentToClose: !0, waitForParentToFocus: !0 }),
                                                                ].filter(function (ca) {
                                                                    return ca.isSupported(y);
                                                                });
                                                            K = new p.RandomEnumerator(K);
                                                            for (var N = K.popNext(); !N.canShow(C); ) if (((N = K.popNext()), void 0 === N)) return;
                                                            S(N);
                                                        };
                                                    if (p.PopSettings.IsTracking) return W(), e.OnFastPopLoaded(), (e.PopRunning = !1), e.IncrementFastPopCap(), !0;
                                                    p.PopSettings.UseSameTab(w, G, p.IsAdblockRequest)
                                                        ? I()
                                                        : w.opera || "Opera" === w.name
                                                        ? I()
                                                        : p.PopSettings.IsPopunder
                                                        ? w.chrome || "Chrome" == w.name
                                                            ? Q || -1 < navigator.userAgent.indexOf("Chrome/33.0.1750.146")
                                                                ? M()
                                                                : R
                                                                ? da()
                                                                : Y()
                                                            : (w.firefox || "Firefox" == w.name) && 65 <= w.major
                                                            ? aa()
                                                            : Z()
                                                        : ba();
                                                }
                                            } else p.PopRunning = !1;
                                    });
                                }
                                function v() {
                                    try {
                                        if ("Safari" === w.name && 11 <= w.major) window.name || (window.name = new Date().getTime()), A.open("", window.name), window.focus(), document.body.focus();
                                        else if ((A.blur(), A.opener.window.focus(), window.self.window.focus(), window.focus(), w.firefox || "Firefox" === w.name || w.safari || "Safari" === w.name)) F();
                                        else if (w.msie || "IE" == w.name) e._Top.document.focus();
                                        else if (w.chrome || "Chrome" == w.name || w.opera || "Opera" == w.name) {
                                            var q = document.createElement("A");
                                            q.id = "inffake";
                                            document.body.appendChild(q);
                                            q.webkitRequestFullscreen();
                                            var B = document.createEvent("MouseEvents");
                                            B.initMouseEvent("click", target ? !0 : !1, !0, window, 0, 0, 0, 0, 0, !1, !1, !0, !1, 0, null);
                                            MgPop.currentBlock.fakeLink.dispatchEvent(B);
                                            document.webkitCancelFullScreen();
                                            setTimeout(function () {
                                                window.getSelection().empty();
                                            }, 250);
                                        }
                                    } catch (J) {
                                        e.ConsoleLog(J);
                                    }
                                }
                                function F() {
                                    var q = window.open("about:blank");
                                    q.focus();
                                    q.close();
                                }
                                var A = null;
                                f = f || {};
                                var E = (f.name || Math.floor(1e3 * Math.random() + 1)).toString(),
                                    H = e.UaParser,
                                    G = H.getOS();
                                H.getDevice();
                                var w = H.getBrowser();
                                if (
                                    !(a.PopLoaded || (!a.PopSettings.AllowMultiplePopsForTheSamePageView && a.IsFastPopCapped())) &&
                                    k(e.PopSettings.RequireToRunOnDomainFilter) &&
                                    k(e.PopSettings.ReferrerFilter) &&
                                    k(e.PopSettings.KeywordFilter) &&
                                    m() &&
                                    r() &&
                                    t() &&
                                    u() &&
                                    x() &&
                                    n()
                                ) {
                                    var ea = e.GetWindowLeft() + e.GetWindowWidth() / 2 - 512,
                                        fa = e.GetWindowTop() + e.GetWindowHeight() / 2 - 384;
                                    z(d, E, 1024, 768, ea, fa);
                                } else a.AbortFastPop = !0;
                            })(
                                b +
                                    (a.IsAdblockRequest ? "/fp.rb?" : "/fp.engine?") +
                                    "id=" +
                                    a.Guid +
                                    "&rand=" +
                                    l +
                                    "&ver=" +
                                    this.Version +
                                    "&time=" +
                                    c +
                                    "&referrerUrl=" +
                                    g +
                                    "&subId=" +
                                    (0 < this.SubID.length ? this.SubID : "") +
                                    "&tid=" +
                                    (0 < this.TId.length ? this.TId : "") +
                                    "&abr=" +
                                    e.IsAdblockRequest +
                                    "&res=" +
                                    a.GetScreenWidth() +
                                    "x" +
                                    a.GetScreenHeight() +
                                    "&stdTime=" +
                                    this.GetStdTimezoneOffset() +
                                    "&fpe=" +
                                    a.GetSupportedVideo() +
                                    "&curl=" +
                                    h +
                                    "&kw=" +
                                    encodeURIComponent(e.GetKeywords())
                            );
                        },
                        OnFastPopLoaded: function () {
                            var a = e;
                            a.PopSettings.AllowMultiplePopsForTheSamePageView || (a.PopLoaded = !0);
                            a.FlashClickInterceptor.deactivate();
                            "function" === typeof InfCustomerPopLoadedCallback && InfCustomerPopLoadedCallback();
                        },
                        FirstOrNull: function (a, b) {
                            for (var c = 0; c < a.length; c++) if (b(a[c])) return a[c];
                            return null;
                        },
                        Map: function (a, b) {
                            for (var c = [], g = 0; g < a.length; g++) c.push(b(a[g]));
                            return c;
                        },
                        GetOwnEnumerableProperties: function (a) {
                            if (Object.keys) return Object.keys(a);
                            var b = [],
                                c;
                            for (c in a) Object.prototype.hasOwnProperty.call(a, c) && b.push(c);
                            return b;
                        },
                        ClientSideFilterHandlers: {
                            JsVariableFilter: function (a, b) {
                                function c(k) {
                                    try {
                                        var m = new RegExp(k);
                                        return (
                                            null !=
                                            e.FirstOrNull(d, function (n) {
                                                return null != n && m.test(n);
                                            })
                                        );
                                    } catch (n) {
                                        return e.ConsoleLog(n), !1;
                                    }
                                }
                                function g(k) {
                                    return (
                                        null !=
                                        e.FirstOrNull(d, function (m) {
                                            return k === m;
                                        })
                                    );
                                }
                                var h = b
                                    ? function (k, m) {
                                          b("JsVariableFilter", k, m);
                                      }
                                    : function () {};
                                if (!a) return h(!0, "Filter passed because no data is available"), !0;
                                var l = e.GetOwnEnumerableProperties(window),
                                    d = e.Map(l, function (k) {
                                        try {
                                            if ("webkitIndexedDB" === k || "webkitStorageInfo" === k) return null;
                                            var m =
                                                "undefined" === typeof window[k]
                                                    ? "undefined"
                                                    : null === window[k]
                                                    ? "null"
                                                    : "function" === typeof window[k] || "object" === typeof window[k]
                                                    ? ""
                                                    : window[k].toString
                                                    ? "'" + window[k].toString().replace(/'/g, "\\'") + "'"
                                                    : "";
                                            return k + "=" + m;
                                        } catch (n) {
                                            return null;
                                        }
                                    }),
                                    f = e.FirstOrNull(a.Items, a.IsRegex ? c : g);
                                l = (null != f) !== a.Exclusive;
                                f =
                                    null == f
                                        ? "No match found in " + (a.Exclusive ? "exclusive" : "inclusive") + (a.IsRegex ? " regex " : " non-regex ") + " variable list: " + a.Items.join(", ")
                                        : "Item " + f + " from " + (a.Exclusive ? "exclusive" : "inclusive") + (a.IsRegex ? " regex " : " non-regex ") + " variable list matches one or more page variables";
                                h(l, f);
                                return l;
                            },
                        },
                        IsClientSideFiltersPassed: function (a, b) {
                            if (!a || 0 === a.length) return !0;
                            for (var c = 0; c < a.length; c++) {
                                var g = this.ClientSideFilterHandlers[a[c].Type];
                                if (g && !1 === g(a[c], b)) return !1;
                            }
                            return !0;
                        },
                        FindPublisherSiteFilterLogIndex: function () {
                            for (var a = -1, b = 0; b < this.Media.DecisionProfile.Log.Messages.length; b++)
                                if ("Checking Filters" == this.Media.DecisionProfile.Log.Messages[b].Message) {
                                    a = b;
                                    break;
                                }
                            return a;
                        },
                        IsPublisherSiteFrequencyCapPassed: function (a, b, c) {
                            var g = 0,
                                h;
                            for (h in b) (this.ServerDate - new Date(b[h].D)) / 1e3 < a.CapLengthInSeconds && g++;
                            b = { passed: g < a.Cap };
                            c && (b.message = "User impressions of " + g + " are " + (b.passed ? "under" : "over") + " publisher site frequency cap: " + a.Cap);
                            return b;
                        },
                        GetStdTimezoneOffset: function () {
                            for (var a = new Date().getFullYear(), b = null, c = 0; 12 > c; c++) {
                                var g = new Date(a, c, 1).getTimezoneOffset();
                                b = null == b ? g : Math.max(b, g);
                            }
                            return -1 * b;
                        },
                        CreateAdUrl: function (a, b, c) {
                            function g(h, l) {
                                for (var d in l) l.hasOwnProperty(d) && (h[d] = l[d]);
                                return h;
                            }
                            return this.FetchMediaUrl(g(g({}, a), c ? c : a.AdItems[0]), b);
                        },
                        FetchMediaUrl: function (a, b) {
                            var c = e;
                            return a.RedirectUrlTransform && ((c = new c.UrlTransforms(c, c.Lotame)), "function" === typeof c[a.RedirectUrlTransform]) ? c[a.RedirectUrlTransform](a.RedirectUrl, a, b, null) : a.RedirectUrl;
                        },
                        IsDontTriggerForSelectorMatch: function (a, b) {
                            return this.IsTriggerSelectorMatch(a, b, 5);
                        },
                        IsTriggerOnSelectorMatch: function (a, b, c) {
                            return this.IsFeatureDisabled("IsTriggerOnSelectorMatch") ? !0 : this.IsTriggerSelectorMatch(a, b, 0 < c ? c : 1);
                        },
                        IsTriggerSelectorMatch: function (a, b, c) {
                            if (a) {
                                a = e._Top.document.querySelectorAll(a);
                                for (var g = 0; g < a.length; g++)
                                    for (var h = b, l = 0; l < c; l++) {
                                        if (a[g] === h) return !0;
                                        h && "html" !== h.nodeName.toLowerCase() && (h = h.parentNode);
                                    }
                            }
                            return !1;
                        },
                        IsFeatureDisabled: function (a) {
                            var b = !1;
                            switch (a) {
                                case "IsTriggerOnSelectorMatch":
                                    b = "undefined" !== typeof InfDisableTriggerOnSelector && InfDisableTriggerOnSelector;
                            }
                            return b;
                        },
                        IsFeatureEnabled: function (a) {
                            var b = !1;
                            switch (a) {
                                case "IsSkipUserEventPropagation":
                                    b = "undefined" !== typeof InfSkipUserEventPropagation && InfSkipUserEventPropagation;
                                    break;
                                case "IsSkipTriggerClick":
                                    b = "undefined" !== typeof InfSkipTriggerClick && InfSkipTriggerClick;
                                    break;
                                case "IsLookForContainerAnchorLink":
                                    b = "undefined" !== typeof InfLookForContainerAnchorLink && InfLookForContainerAnchorLink;
                            }
                            return b;
                        },
                        BindOnDocumentTouch: function (a) {
                            var b = e._Top;
                            if (b.document.addEventListener)
                                b.document.addEventListener(
                                    "touchstart",
                                    function (c) {
                                        try {
                                            a(c);
                                        } catch (g) {
                                            e.ConsoleLog(g);
                                        }
                                    },
                                    !1
                                );
                            else
                                try {
                                    b.document.attachEvent("touchstart", a);
                                } catch (c) {
                                    e.ConsoleLog(c);
                                }
                        },
                        BindOnDocmentClick: function (a) {
                            var b = e._Top;
                            b.document.addEventListener
                                ? b.document.addEventListener(
                                      "click",
                                      function (c) {
                                          try {
                                              e.ClickHandler = a(c);
                                          } catch (g) {
                                              e.ConsoleLog(g);
                                          }
                                      },
                                      !1
                                  )
                                : b.document.attachEvent("onclick", function (c) {
                                      try {
                                          e.ClickHandler = a(c);
                                      } catch (g) {
                                          e.ConsoleLog(g);
                                      }
                                  });
                        },
                        _contentLoaded: !1,
                        _contentLoadedListenersInstalled: !1,
                        _contentLoadedListeners: [],
                        BindOnDOMReady: function (a) {
                            if ("function" !== typeof a) throw "Listener must be a funciton";
                            var b = e._Top,
                                c = b.document;
                            if (this._contentLoaded)
                                b.setTimeout(function () {
                                    a.apply(b);
                                }, 1);
                            else {
                                this._contentLoadedListeners.push(a);
                                var g = function () {
                                        return "complete" === c.readyState || (!c.attachEvent && "interactive" === c.readyState);
                                    },
                                    h = this,
                                    l = function () {
                                        if (!h._contentLoaded) {
                                            h._contentLoaded = !0;
                                            for (var d = 0; d < h._contentLoadedListeners.length; d++)
                                                try {
                                                    h._contentLoadedListeners[d].apply(b);
                                                } catch (f) {
                                                    h.ConsoleLog("Error calling DOMReady listener: " + f);
                                                }
                                        }
                                    };
                                g()
                                    ? b.setTimeout(l, 1)
                                    : this.readyEventHandlersInstalled ||
                                      (c.addEventListener
                                          ? (c.addEventListener("DOMContentLoaded", l, !1), b.addEventListener("load", l, !1))
                                          : (c.attachEvent("onreadystatechange", function () {
                                                g() && l();
                                            }),
                                            b.attachEvent("onload", l)),
                                      (this._contentLoadedListenersInstalled = !0));
                            }
                        },
                        Enums: {
                            VideoAudioMode: { audio: 0, audioOnMouseOver: 1, muted: 2 },
                            TrackingEventType: { adFill: 1, adView: 2, infinityVolume: 3, partnerVolume: 4 },
                            AdFillCheckStatus: { skipped: 1, failed: 2, success: 3 },
                            chromePopApproach: { notification: 0, notificationEx: 1, tabUnder: 2, tabOver: 3, doublePop: 4, hidden: 5, mixed: 6 },
                            SelectedPopType: { PopUnder: 0, PopOver: 1, TabUnder: 2, TabOver: 3 },
                            PopUnderDisplayTargetingType: { Standard: 1, Tab: 2 },
                        },
                        Utils: {
                            objectToQueryString: function (a) {
                                var b = [],
                                    c;
                                for (c in a) a.hasOwnProperty(c) && b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
                                return b.join("&");
                            },
                            url: {
                                removeSchema: function (a) {
                                    for (var b = ["http:", "https:"], c = 0; c < b.length; c++) if (0 === a.indexOf(b[c])) return a.substring(b[c].length);
                                    return a;
                                },
                            },
                            getFrameDocument: function (a) {
                                return a.get(0).documentWindow || a.get(0).contentWindow;
                            },
                        },
                        FlashClickInterceptor: {
                            enableDebugBorder: !1,
                            ignoreElementPredicate: null,
                            eventUtil: {
                                addListener: function (a, b, c) {
                                    a.addEventListener ? a.addEventListener(b, c) : a.attachEvent("on" + b, c);
                                },
                                removeListener: function (a, b, c) {
                                    a.removeEventListener ? a.removeEventListener(b, c) : a.detachEvent("on" + b, c);
                                },
                            },
                            overlay: null,
                            activeObject: null,
                            activePollingInterval: null,
                            handleObjects: !0,
                            handleEmbeds: !0,
                            handleVideo: !0,
                            handleInlineFrames: !0,
                            interceptedObjectContainer: null,
                            hasTriggeredEvent: function (a) {
                                if (null == this.overlay) return !1;
                                var b = a.target || a.srcElement;
                                return "string" === typeof a.type && "click" === a.type.toLowerCase() && b === this.overlay;
                            },
                            activate: function (a, b, c) {
                                if (!0 !== b) {
                                    b = (a.chrome || "Chrome" === a.name) && 31 <= parseInt(a.major);
                                    c = (a.msie || "IE" === a.name) && 8 <= parseInt(a.major);
                                    var g = a.firefox || "Firefox" === a.name,
                                        h = a.opera || "Opera" === a.name;
                                    if (b || c || "Edge" === a.name || g || !e.PopSettings.InterceptFlash || ("Safari" !== a.name && !h))
                                        (this.handleObjects = !g),
                                            (this.overlay = this._insertOverlay()),
                                            this.eventUtil.addListener(this.overlay, "mouseleave", this._onOverlayMouseLeave),
                                            this.eventUtil.addListener(document, "mouseover", this._onDocumentMouseEnter);
                                }
                            },
                            deactivate: function () {
                                null !== this.overlay &&
                                    (this.eventUtil.removeListener(this.overlay, "mouseleave", this._onOverlayMouseLeave),
                                    this.eventUtil.removeListener(document, "mouseover", this._onDocumentMouseEnter),
                                    this._closeOverlay(),
                                    this.overlay.parentNode.removeChild(this.overlay),
                                    (this.overlay = null));
                            },
                            _insertOverlay: function () {
                                var a = document.createElement("div");
                                try {
                                    a.style.backgroundColor = "rgba(0,0,0,0)";
                                } catch (c) {
                                    (a.style.backgroundColor = "white"), (a.style.filter = "alpha(opacity=0)");
                                }
                                !0 === this.enableDebugBorder && (a.style.border = "3px solid red");
                                a.style.position = "absolute";
                                a.style.zIndex = 1e4;
                                a.style.display = "none";
                                var b = setInterval(function () {
                                    e._Top.document.body && (clearInterval(b), e._Top.document.body.appendChild(a));
                                }, 10);
                                return a;
                            },
                            _onDocumentMouseEnter: function (a) {
                                var b = a.target || a.srcElement,
                                    c = e.FlashClickInterceptor,
                                    g = "object" === b.tagName || "OBJECT" === b.tagName,
                                    h = "embed" === b.tagName || "EMBED" === b.tagName,
                                    l = "iframe" === b.tagName || "IFRAME" === b.tagName;
                                !(((c.handleObjects || e.PopSettings.InterceptFlash) && g) || ((c.handleEmbeds || e.PopSettings.InterceptFlash) && h) || ((c.handleInlineFrames || e.PopSettings.InterceptInlineFrames) && l)) ||
                                    ((g || h) && e.PopSettings.InterceptFlash && !e.IsFlashPluginEnabled()) ||
                                    ("function" === typeof c.ignoreElementPredicate && !0 === c.ignoreElementPredicate(b)) ||
                                    c._onObjectMouseEnter(a);
                            },
                            _onOverlayMouseLeave: function (a) {
                                a = e.FlashClickInterceptor;
                                a.interceptedObjectContainer = null;
                                a._closeOverlay();
                            },
                            _closeOverlay: function () {
                                this.overlay.style.display = "none";
                                this.activeObject = null;
                                null !== this.activePollingInterval && (clearInterval(this.activePollingInterval), (this.activePollingInterval = null));
                            },
                            _onObjectMouseEnter: function (a) {
                                var b = e.FlashClickInterceptor;
                                b._closeOverlay();
                                a = a.target || a.srcElement;
                                b.activeObject = a;
                                b.interceptedObjectContainer = a.parentElement;
                                var c = b.overlay;
                                c.style.display = "block";
                                b._syncOverlaySizeAndPosition(c, a);
                                var g = b.activeObject.getBoundingClientRect();
                                b.activePollingInterval = setInterval(function () {
                                    if (null !== b.activeObject) {
                                        var h = b.activeObject.getBoundingClientRect();
                                        (g.left === h.left && g.top === h.top && g.bottom === h.bottom && g.right === h.right) || b._syncOverlaySizeAndPosition(b.overlay, b.activeObject);
                                    }
                                }, 200);
                            },
                            _syncOverlaySizeAndPosition: function (a, b) {
                                var c = null === a.style.borderWidth || "" === a.style.borderWidth ? 0 : 2 * parseFloat(a.style.borderWidth.replace("px", ""));
                                a.style.width !== b.offsetWidth + "px" && (a.style.width = b.offsetWidth - c + "px");
                                a.style.height !== b.offsetHeight + "px" && (a.style.height = b.offsetHeight - c + "px");
                                c = b.getBoundingClientRect();
                                var g = a.getBoundingClientRect(),
                                    h = g.top - (g.top - c.top) + (void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop);
                                a.style.left = g.left - (g.left - c.left) + (void 0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft) + "px";
                                a.style.top = h + "px";
                            },
                        },
                        GetExpiration: function (a) {
                            var b = new Date();
                            b.setTime(new Date().valueOf() + 1e3 * a);
                            return b;
                        },
                        IsExpired: function (a) {
                            return new Date().valueOf() >= Date.parse(a);
                        },
                        IsCapped: function (a, b, c, g) {
                            a = (g = !!g) ? this.Storage.GetSessionStorage(a) : this.Storage.GetLocalStorage(a);
                            b = g ? this.Storage.GetSessionStorage(b) : this.Storage.GetLocalStorage(b);
                            return void 0 === a || 0 === a || void 0 === b || "Invalid Date" === b || this.IsExpired(b) || isNaN(a) ? !1 : void 0 !== c && a >= c;
                        },
                        IncrementCap: function (a, b, c, g) {
                            var h = (g = !!g) ? this.Storage.GetSessionStorage(a) : this.Storage.GetLocalStorage(a),
                                l = g ? this.Storage.GetSessionStorage(b) : this.Storage.GetLocalStorage(b);
                            if (void 0 === h || 0 === h || void 0 === l || "Invalid Date" === l || this.IsExpired(l) || isNaN(h)) (h = 0), (l = this.GetExpiration(c));
                            g ? this.Storage.SetSessionStorage(a, ++h) : this.Storage.SetLocalStorage(a, ++h);
                            g ? this.Storage.SetSessionStorage(b, l) : this.Storage.SetLocalStorage(b, l);
                        },
                        IsFastPopCapped: function () {
                            return this.IsCapped("g36NumFastPops", "g36NumFastPopsExpire", this.PopSettings.Cap);
                        },
                        IncrementFastPopCap: function () {
                            this.IncrementCap("g36NumFastPops", "g36NumFastPopsExpire", this.PopSettings.CapLength);
                        },
                        GetKeywords: function () {
                            function a(l) {
                                for (var d = [], f = 0, k = 0; k < l.length; k++) {
                                    var m = l[k].trim().toLowerCase();
                                    if (0 > d.indexOf(m)) {
                                        if (255 < f) break;
                                        d.push(m);
                                        f += (0 < f ? 1 : 0 > f ? -1 : 0) + m.length;
                                    }
                                }
                                return d.join(",");
                            }
                            if (this.MetaKeywordOverride && 0 < this.MetaKeywordOverride.length) {
                                for (var b = document.querySelectorAll(this.MetaKeywordOverride), c = [], g = 0; g < b.length; g++) {
                                    var h = b[g].innerText.split(",");
                                    c = c.concat(h);
                                }
                                if (0 < c.length) return a(c);
                            }
                            b = this._Top.document.getElementsByTagName("meta");
                            return (b = this.FirstOrNull(b, function (l) {
                                var d = l.getAttribute("name");
                                return null != d && "keywords" === d.toLowerCase() && "string" === typeof l.content;
                            })) && b.content
                                ? a(b.content.split(","))
                                : "";
                        },
                        GetWindowHeight: function () {
                            var a = 0;
                            "number" == typeof this._Top.window.innerHeight
                                ? (a = this._Top.window.innerHeight)
                                : this._Top.document.documentElement && this._Top.document.documentElement.clientHeight
                                ? (a = this._Top.document.documentElement.clientHeight)
                                : this._Top.document.body && this._Top.document.body.clientHeight && (a = this._Top.document.body.clientHeight);
                            return a;
                        },
                        GetWindowWidth: function () {
                            var a = 0;
                            "number" == typeof this._Top.window.innerWidth
                                ? (a = this._Top.window.innerWidth)
                                : this._Top.document.documentElement && this._Top.document.documentElement.clientWidth
                                ? (a = this._Top.document.documentElement.clientWidth)
                                : this._Top.document.body && this._Top.document.body.clientWidth && (a = this._Top.document.body.clientWidth);
                            return a;
                        },
                        GetScreenWidth: function () {
                            return screen.width;
                        },
                        GetScreenHeight: function () {
                            return screen.height;
                        },
                        GetWindowTop: function () {
                            return void 0 !== this._Top.window.screenTop ? this._Top.window.screenTop : this._Top.window.screenY;
                        },
                        GetWindowLeft: function () {
                            return void 0 !== this._Top.window.screenLeft ? this._Top.window.screenLeft : this._Top.window.screenX;
                        },
                        GetParentLink: function (a) {
                            var b = a,
                                c = !1;
                            if ("a" !== b.nodeName.toLowerCase() && null == b.getAttribute("target") && null == b.getAttribute("rel") && "html" != b.nodeName.toLowerCase())
                                for (var g = 0; b.parentNode && 4 >= g && "html" != b.nodeName.toLowerCase(); )
                                    if ((g++, (b = b.parentNode), "a" === b.nodeName.toLowerCase() && "" !== b.href)) {
                                        c = !0;
                                        break;
                                    }
                            return c ? b : a;
                        },
                        IsIgnoreElement: function (a) {
                            if (!a) return !1;
                            do {
                                if (a.getAttribute && "true" === a.getAttribute("data-inf-ignore")) return !0;
                                a = a.parentNode;
                            } while (a && a.getAttribute);
                            return !1;
                        },
                        Querystring: {
                            Init: function () {
                                for (var a, b = /\+/g, c = /([^&=]+)=?([^&]*)/g, g = window.location.search.substring(1); (a = c.exec(g)); ) this.Params[decodeURIComponent(a[1].replace(b, " "))] = decodeURIComponent(a[2].replace(b, " "));
                            },
                            Params: [],
                        },
                        Script: {
                            Items: [],
                            Add: function (a, b) {
                                return this.Exists(a) ? !1 : (this.Items.push({ url: a, cache: b, complete: !1 }), !0);
                            },
                            Exists: function (a) {
                                for (var b = 0; b < this.Items.length; b++) if (this.Items[b].url == a) return !0;
                                return !1;
                            },
                            Complete: function (a) {
                                for (var b = 0; b < a.length; b++) if (!a[b].complete) return !1;
                                return !0;
                            },
                            Create: function (a, b) {
                                var c = document.createElement("script");
                                c.setAttribute("type", "text/javascript");
                                if (b) c.src = a;
                                else {
                                    var g = Math.floor(89999999 * Math.random() + 1e7);
                                    c.src = -1 < a.indexOf("?") ? a + "&" + g : a + "?" + g;
                                }
                                return c;
                            },
                            AppendToDom: function (a, b, c) {
                                var g = this,
                                    h = document.getElementsByTagName("head")[0];
                                if (void 0 !== e.UseAjax && e.UseAjax)
                                    e.AjaxLoad(a[b].url, function (f) {
                                        var k = document.createElement("script");
                                        k.type = "text/javascript";
                                        k.innerHTML = f.responseText;
                                        f = document.getElementsByTagName("script")[0];
                                        f.parentNode.insertBefore(k, f);
                                        a[b].complete = !0;
                                        g.Complete(a) && "function" == typeof c && c();
                                    });
                                else {
                                    var l = a[b].url;
                                    void 0 !== e.EncodeUrl && e.EncodeUrl && (l = "https://" + window.getUri(l));
                                    var d = this.Create(l, a[b].cache);
                                    d.onload = d.onreadystatechange = function (f) {
                                        a[b].complete ||
                                            (this.readyState && "loaded" != this.readyState && "complete" != this.readyState) ||
                                            ((a[b].complete = !0), (d.onload = d.onreadystatechange = null), g.Complete(a) && "function" == typeof c && c());
                                    };
                                    h.appendChild(d);
                                }
                            },
                            Load: function (a, b, c) {
                                if (0 === arguments.length || 1 === arguments.length) {
                                    var g = this.Items;
                                    this.Items = [];
                                    for (var h = 0; h < g.length; h++) this.AppendToDom(g, h, a);
                                } else this.AppendToDom([{ url: a, cache: b, complete: !1 }], 0, c);
                            },
                        },
                        Storage: {
                            GetLocalStorage: function (a) {
                                if ((a = this.SupportsLocalStorage() ? localStorage[a] : this.GetCookie(a))) {
                                    var b = a.split("__")[0];
                                    if (b == this.GetCookie("ISSH") || "undefined" == b) a = a.split("__")[1];
                                }
                                return a;
                            },
                            SetLocalStorage: function (a, b) {
                                var c = this.GetCookie("ISSH") + "__" + b;
                                if (this.SupportsLocalStorage())
                                    try {
                                        localStorage[a] = c;
                                    } catch (g) {
                                        this.FailedLocalStorage = !0;
                                    }
                                else this.SetCookie(a, c);
                            },
                            DeleteLocalStorage: function (a) {
                                if (this.SupportsLocalStorage())
                                    try {
                                        localStorage.removeItem(a);
                                    } catch (b) {
                                        this.FailedLocalStorage = !0;
                                    }
                                else this.DeleteCookie(a);
                            },
                            SupportsLocalStorage: function () {
                                try {
                                    return sessionStorage.setItem("storageSupport", 1), sessionStorage.removeItem("storageSupport"), "localStorage" in window && null !== window.localStorage;
                                } catch (a) {
                                    return (
                                        "undefined" !== typeof DOMException &&
                                            a.code === DOMException.QUOTA_EXCEEDED_ERR &&
                                            0 === sessionStorage.length &&
                                            ((window.console = window.console || { log: function (b) {} }), e.ConsoleLog("Safari private mode detected")),
                                        !1
                                    );
                                }
                            },
                            GetSessionStorage: function (a) {
                                if ((a = this.SupportsSessionStorage() ? sessionStorage[a] : this.GetCookie(a))) {
                                    var b = a.split("__")[0];
                                    if (b == this.GetCookie("ISSH") || "undefined" == b) a = a.split("__")[1];
                                }
                                return a;
                            },
                            SetSessionStorage: function (a, b) {
                                var c = this.GetCookie("ISSH") + "__" + b;
                                if (this.SupportsSessionStorage())
                                    try {
                                        sessionStorage[a] = c;
                                    } catch (g) {
                                        this.FailedSessionStorage = !0;
                                    }
                                else this.SetCookie(a, c);
                            },
                            DeleteSessionStorage: function (a) {
                                if (this.SupportsSessionStorage())
                                    try {
                                        sessionStorage.removeItem(a);
                                    } catch (b) {
                                        this.FailedSessionStorage = !0;
                                    }
                                else this.DeleteCookie(a);
                            },
                            SupportsSessionStorage: function () {
                                try {
                                    return sessionStorage.setItem("storageSupport", 1), sessionStorage.removeItem("storageSupport"), "sessionStorage" in window && null !== window.sessionStorage;
                                } catch (a) {
                                    return (
                                        "undefined" !== typeof DOMException &&
                                            a.code === DOMException.QUOTA_EXCEEDED_ERR &&
                                            0 === sessionStorage.length &&
                                            ((window.console = window.console || { log: function (b) {} }), e.ConsoleLog("Safari private mode detected")),
                                        !1
                                    );
                                }
                            },
                            SetCookie: function (a, b, c) {
                                var g = new Date();
                                g.setSeconds(g.getSeconds() + c);
                                b = escape(b) + (null == c ? "" : "; expires=" + g.toUTCString());
                                document.cookie = a + "=" + b;
                            },
                            GetCookie: function (a) {
                                var b,
                                    c = document.cookie.split(";");
                                for (b = 0; b < c.length; b++) {
                                    var g = c[b].substr(0, c[b].indexOf("="));
                                    var h = c[b].substr(c[b].indexOf("=") + 1);
                                    g = g.replace(/^\s+|\s+$/g, "");
                                    if (g == a) return unescape(h);
                                }
                            },
                            DeleteCookie: function (a) {
                                this.GetCookie(a) && (document.cookie = a + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT");
                            },
                            FailedLocalStorage: !1,
                            FailedSessionStorage: !1,
                        },
                        TabHistoryManipulator: function (a, b) {
                            var c = (b = !!b) ? this.Storage.GetSessionStorage(a) : this.Storage.GetLocalStorage(a);
                            if (c)
                                try {
                                    this._Top.history.replaceState(null, this._Top.document.title, this._Top.location.href),
                                        this._Top.history.pushState(null, this._Top.document.title, this._Top.location.href),
                                        this._Top.addEventListener(
                                            "popstate",
                                            function () {
                                                e._Top.history.replaceState(null, e._Top.document.title, e._Top.location.href);
                                                setTimeout(function () {
                                                    e._Top.location.replace(c);
                                                }, 0);
                                            },
                                            !1
                                        );
                                } catch (g) {
                                } finally {
                                    b ? this.Storage.DeleteSessionStorage(a) : this.Storage.DeleteLocalStorage(a);
                                }
                        },
                        TabHistoryRecorder: function (a, b, c) {
                            c ? this.Storage.SetSessionStorage(b, a) : this.Storage.SetLocalStorage(b, a);
                        },
                        StopEvent: function (a) {
                            a.preventDefault && a.preventDefault();
                            a.stopImmediatePropagation && a.stopImmediatePropagation();
                            a.stopPropagation && a.stopPropagation();
                        },
                        IsASInstance: function () {
                            result = !1;
                            var a = e.EmailInfoAddress && -1 !== e.EmailInfoAddress.indexOf("adsupply"),
                                b = e.InfinityHost && -1 === e.InfinityHost.indexOf("trklnks");
                            a && b && (result = !0);
                            return result;
                        },
                        IsMobile: {
                            Android: function (a) {
                                return "Android" === e.UaParser.getOS().name;
                            },
                            BlackBerry: function (a) {
                                return "BlackBerry" === e.UaParser.getOS().name;
                            },
                            iOS: function (a) {
                                return "iOS" === e.UaParser.getOS().name;
                            },
                            Opera: function (a) {
                                return ("tablet" === e.UaParser.getDevice().type || "mobile" === e.UaParser.getDevice().type) && ("Opera" === e.UaParser.getBrowser().name || -1 < e.UaParser.getResult().ua.indexOf("OPiOS"));
                            },
                            Windows: function (a) {
                                return "Windows Phone" === e.UaParser.getOS().name || "Windows Phone OS" === e.UaParser.getOS().name;
                            },
                            any: function (a) {
                                return this.Android(a) || this.BlackBerry(a) || this.iOS(a) || this.Opera(a) || this.Windows(a);
                            },
                        },
                        IsTablet: function () {
                            return "tablet" === e.UaParser.getDevice().type;
                        },
                        Browser: null,
                        InitBrowser: function () {
                            var a = this;
                            this.current = new UserAgentParser().getBrowser();
                            this.isSafari = function () {
                                return "Safari" === a.current.name || "Mobile Safari" === a.current.name;
                            };
                            this.isChrome = function () {
                                return "Chrome" === a.current.name;
                            };
                            this.isOpera = function () {
                                return "Opera" === a.current.name;
                            };
                            this.isFirefox = function () {
                                return "Firefox" === a.current.name;
                            };
                            this.isIE = function () {
                                return "IE" === a.current.name;
                            };
                            this.isWebView = function () {
                                return "Chrome Headless" === a.current.name || "Chrome WebView" === a.current.name || "Facebook" === a.current.name || "GSA" === a.current.name;
                            };
                            return a;
                        },
                        GetSupportedVideo: function () {
                            var a = 0;
                            this.IsHtml5VideoSupported() && (a |= 1);
                            this.IsFlashPluginEnabled() && (a |= 2);
                            return a;
                        },
                        IsHtml5VideoSupported: function () {
                            return !!document.createElement("video").canPlayType;
                        },
                        IsFlashPluginEnabled: function () {
                            if (navigator && navigator.mimeTypes && "undefined" != typeof navigator.mimeTypes["application/x-shockwave-flash"] && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) return !0;
                            try {
                                return new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), !0;
                            } catch (a) {}
                            return !1;
                        },
                        AjaxLoad: function (a, b) {
                            if ("undefined" !== typeof XMLHttpRequest) var c = new XMLHttpRequest();
                            else
                                for (var g = ["MSXML2.XmlHttp.5.0", "MSXML2.XmlHttp.4.0", "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.2.0", "Microsoft.XmlHttp"], h = 0, l = g.length; h < l; h++)
                                    try {
                                        c = new ActiveXObject(g[h]);
                                        break;
                                    } catch (d) {}
                            c.onreadystatechange = function () {
                                4 > c.readyState || (200 === c.status && 4 === c.readyState && b(c));
                            };
                            c.open("GET", a, !0);
                            c.send();
                        },
                        ConsoleGroup: function (a) {
                            e.DebugEnabled && window.console && window.console.group && console.group(a);
                        },
                        ConsoleGroupEnd: function () {
                            e.DebugEnabled && window.console && window.console.groupEnd && console.groupEnd();
                        },
                        ConsoleLog: function (a) {
                            e.DebugEnabled && window.console && window.console.log && console.log(a);
                        },
                        BasePopunder: {
                            mouseDownHandler: function (a, b) {
                                var c = e;
                                if ("mousedown" == a.type && 0 != a.button) return !1;
                                if ("mousedown" == a.type) {
                                    var g = document.documentElement.clientWidth,
                                        h = document.documentElement.clientHeight;
                                    if (a.target && (a.target === document.documentElement || a.target === document) && (a.clientX > g || a.clientY > h)) return !1;
                                }
                                if (!this.shouldHandleEvent(b, !0)) return !1;
                                c.PopRunning = !0;
                                e.IsFeatureEnabled("IsSkipUserEventPropagation") || (a.preventDefault(), a.stopImmediatePropagation(), a.stopPropagation());
                                return !0;
                            },
                            shouldHandleEvent: function (a, b) {
                                var c = e,
                                    g = c.IsFastPop && !c.AbortFastPop ? c.PopSettings.ClientSideFilters : a.ClientSideFilters,
                                    h = c.IsFastPop && !c.AbortFastPop ? c.FastPopZone : { Id: a.ZoneId, Name: a.ZoneName };
                                return (!b || !c.PopRunning) && !c.PopLoaded && !(c.IsFastPop && !c.AbortFastPop && c.IsFastPopCapped()) && c.IsClientSideFiltersPassed(g, c.LogZoneFilter(h));
                            },
                            execute: function (a, b, c, g) {
                                g = g || a.target || a.srcElement;
                                var h = e;
                                h.EventObject = a;
                                if (h.IsFastPop && !h.AbortFastPop) {
                                    if (h.PopLoaded || h.IsFastPopCapped()) {
                                        if (e.IsFeatureEnabled("IsSkipTriggerClick")) {
                                            if (!g) return !1;
                                            h.PopRunning = !1;
                                        } else this.triggerClick(g, b);
                                        return !1;
                                    }
                                    if (h.IsDontTriggerForSelectorMatch(h.PopSettings.PopUnderDontTriggerSelector, g)) {
                                        if (e.IsFeatureEnabled("IsSkipTriggerClick")) {
                                            if (!g) return !1;
                                            h.PopRunning = !1;
                                        } else this.triggerClick(g, b);
                                        return !1;
                                    }
                                    if (h.PopSettings.PopUnderTriggerOnSelector && !h.IsTriggerOnSelectorMatch(h.PopSettings.PopUnderTriggerOnSelector, g, h.PopSettings.PopUnderTriggerOnSelectorDepth)) {
                                        if (e.IsFeatureEnabled("IsSkipTriggerClick")) {
                                            if (!g) return !1;
                                            h.PopRunning = !1;
                                        } else this.triggerClick(g, b);
                                        return !1;
                                    }
                                    a = c ? h.GetParentLink(g) : g;
                                    if ((h.PopSettings.RespectTargetBlank && a.getAttribute && ("_blank" === a.getAttribute("target") || "nofollow" === a.getAttribute("rel"))) || h.IsIgnoreElement(g)) return this.triggerClick(g, b), !1;
                                } else {
                                    if (h.PopLoaded || h.IsCapped("InfNumPops" + h.PopMedia.ZoneId, "InfNumPopsExpire" + h.PopMedia.ZoneId, h.PopMedia.Settings.cap)) return this.triggerClick(g, b), !1;
                                    a = c ? h.GetParentLink(g) : g;
                                    if (
                                        (h.PopMedia.Settings.RespectTargetBlank && a.getAttribute && ("_blank" === a.getAttribute("target") || "nofollow" === a.getAttribute("rel"))) ||
                                        h.IsDontTriggerForSelectorMatch(h.PopMedia.Settings.PopUnderDontTriggerSelector, g)
                                    )
                                        return this.triggerClick(g, b), !1;
                                    if (h.PopMedia.Settings.PopUnderTriggerOnSelector && !h.IsTriggerOnSelectorMatch(h.PopMedia.Settings.PopUnderTriggerOnSelector, g, h.PopMedia.Settings.PopUnderTriggerOnSelectorDepth)) {
                                        if (e.IsFeatureEnabled("IsSkipTriggerClick")) {
                                            if (!g) return !1;
                                            h.PopRunning = !1;
                                        } else this.triggerClick(g, b);
                                        return !1;
                                    }
                                    if (h.IsIgnoreElement(g)) return this.triggerClick(g, b), !1;
                                    h.IncrementCap("InfNumPops" + h.PopMedia.ZoneId, "InfNumPopsExpire" + h.PopMedia.ZoneId, h.PopMedia.Settings.capLength);
                                }
                                return !0;
                            },
                            triggerClick: function (a, b) {
                                var c = e;
                                try {
                                    if (a) {
                                        for (var g = c.EventObject, h = "click" === b ? ["click"] : ["mousedown", "mouseup", "click"], l = 0; l < h.length; l++) {
                                            var d = c._Top.document.createEvent("MouseEvents");
                                            d.initMouseEvent(h[l], !0, !0, window, 1, g ? g.screenX : 0, g ? g.screenY : 0, g ? g.clientX : 0, g ? g.clientY : 0, !1, !1, !1, !1, 0, null);
                                            a.dispatchEvent(d);
                                        }
                                        c.PopRunning = !1;
                                    }
                                } catch (f) {
                                    c.ConsoleLog(f);
                                }
                            },
                            getWindowName: function () {
                                return "win_" + new Date().getTime().toString();
                            },
                            postWindowPop: function () {
                                var a = e;
                                a.PopRunning = !1;
                                a.Storage.SetSessionStorage("InfChromePopEventAttached", !1);
                                a.IsFastPop ? (a.IncrementFastPopCap(), a.OnFastPopLoaded()) : ((a.PopLoaded = !0), "function" === typeof InfCustomerPopLoadedCallback && InfCustomerPopLoadedCallback());
                            },
                            buildUrl: function (a, b) {
                                if (null == a) return null;
                                if (e.IsAdblockRequest) return a.replace("SelectedPopTypePlaceholder", null == b ? "null" : b);
                                if (null == b || -1 != a.indexOf("spt=")) return a;
                                var c = -1 != a.indexOf("?");
                                return a + (c ? "&" : "?") + "spt=" + b;
                            },
                            getFastPopUrl: function () {
                                var a = e,
                                    b = a.InfinityHost,
                                    c = encodeURIComponent(new Date().getTimezoneOffset()),
                                    g = encodeURIComponent(a._Top.document.referrer),
                                    h = encodeURIComponent(a._Top.window.location.href),
                                    l = encodeURIComponent(this._randomString);
                                return (
                                    b +
                                    (a.IsAdblockRequest ? "/fp.rb?" : "/fp.engine?") +
                                    "id=" +
                                    a.Guid +
                                    "&rand=" +
                                    l +
                                    "&ver=" +
                                    a.Version +
                                    "&time=" +
                                    c +
                                    "&referrerUrl=" +
                                    g +
                                    "&subId=" +
                                    (0 < a.SubID.length ? a.SubID : "") +
                                    "&tid=" +
                                    (0 < a.TId.length ? a.TId : "") +
                                    "&abr=" +
                                    a.IsAdblockRequest +
                                    "&stdTime=" +
                                    a.GetStdTimezoneOffset() +
                                    "&res=" +
                                    a.GetScreenWidth() +
                                    "x" +
                                    a.GetScreenHeight() +
                                    "&fpe=" +
                                    a.GetSupportedVideo() +
                                    "&curl=" +
                                    h +
                                    "&kw=" +
                                    encodeURIComponent(a.GetKeywords())
                                );
                            },
                        },
                        ChromePopunder: {
                            _guid: null,
                            _showPdf:
                                "data:application/pdf;base64,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8JXNlw4XLN8J4Z8IoqYkUULQzi6nKz1vSLYkMJ97DvKA9GR+t3Q83GU1+I7Ab2Br6rPoCAD/BMgarnhL7WaBuN/0qf7acq/dU0raEprcK2TZIdla/fChLrOBFuc6jp0MBrknewEe73KH2+rYiwBPTJanbC6vYHzWN2fBQlE5in+nFlYQ9qnVTtMW190pyWrlM5VDFEpnSueI+ygA+jaTvpHcBM3AiHaAD5mPikqHQdPYJojBgB3fj9yzdGdyRBvV5YwH4UozSXtQXAasc+B6z5hHuROJHKGr5fQ9q+J+c8IiSbkBauupbtXTt5RDBVKdK7lxraBGVsfeekEX56Q/Xo8nvW/anAh0Zmki7TrdMylcyHsHwKSbogMxX7r/txtC63+gdAMbhZT2fu24HATEgUoN0DcaHCa1kzPjP4xZ3ktGI2Agy+szsSvbfwtmYn6EkfE0PQoD6FnH48is91eoDxayE8hJ/QrO/S4J7Meoqa122eEc44YiZI4Ym/ev8f+ARcDGylS6wqSkdVoiw1lyfJsNCmVuZHN0cmVhbQ1lbmRvYmoNNCAwIG9iag08PC9GaWx0ZXIvRmxhdGVEZWNvZGUvRmlyc3QgNS9MZW5ndGggODAvTiAxL1R5cGUvT2JqU3RtPj5zdHJlYW0NCoZByo5qIKTWkT0EsOrwTNaetewmRJyWO3WrqIJ6JkhapOIkOBXm6Kty1h1c0lkwtdUIuOP2IGwjcbmLOADc/lGUQDnAECeKk+ka8CInWOegDQplbmRzdHJlYW0NZW5kb2JqDTUgMCBvYmoNPDwvRmlsdGVyL0ZsYXRlRGVjb2RlL0ZpcnN0IDUvTGVuZ3RoIDE0NC9OIDEvVHlwZS9PYmpTdG0+PnN0cmVhbQ0K1wo+Snf8AlgtuOQBso4dq7qTBagU6Bcv2WCA3Bl1DJr7pSqmZ8tLmkruLIjVWgxvVgTmDP5BxV2741g5WfMw6Ooo82x1GyOpUks28fcb7ZvIDnUIy5q5nj5KtTYeHpzo6OMvfN2gMU/oHl6WWcl0XfExgmkozEnKTYtBZZWlNHXndkqJwN5JC3iw3JhZ4rJ3DQplbmRzdHJlYW0NZW5kb2JqDTYgMCBvYmoNPDwvRGVjb2RlUGFybXM8PC9Db2x1bW5zIDQvUHJlZGljdG9yIDEyPj4vRW5jcnlwdCAxNiAwIFIvRmlsdGVyL0ZsYXRlRGVjb2RlL0lEWzwxOEY1NTNGQ0I5ODZEQjQxOEYzMTFDQUEyMUU4NjhDNz48QUQ2Nzk1QzREQjMyRDk0N0FGQ0U5MzEyNzhGRTM4MjU+XS9JbmZvIDE0IDAgUi9MZW5ndGggNTQvUm9vdCAxNyAwIFIvU2l6ZSAxNS9UeXBlL1hSZWYvV1sxIDIgMV0+PnN0cmVhbQ0KaN5iYgACJka5+QxMDIzvgAQziOC9C+KuARIMb4GyFwRALAZGGMH4D4XLBOIyMgAEGABZSQgmDQplbmRzdHJlYW0NZW5kb2JqDXN0YXJ0eHJlZg0KMTE2DQolJUVPRg0K",
                            _blankPdf:
                                "data:application/pdf;base64,JVBERi0xLjANCjEgMCBvYmo8PC9QYWdlcyAyIDAgUj4+ZW5kb2JqIDIgMCBvYmo8PC9LaWRzWzMgMCBSXS9Db3VudCAxPj5lbmRvYmogMyAwIG9iajw8L01lZGlhQm94WzAgMCAzIDNdPj5lbmRvYmoNCnRyYWlsZXI8PC9Sb290IDEgMCBSPj4=",
                            _randomString: Math.floor(1e3 * Math.random() + 1).toString(),
                            _postWindowPopCalled: !1,
                            _popWin: null,
                            _handle: null,
                            _minX: 1,
                            _minY: 1,
                            _maxLeft: 19999,
                            _maxTop: 19999,
                            _desiredMode: 1,
                            _popOpenModes: { pdf: 0, notification: 1, pdfAndFalseTab: 2, tabUnder: 3, doublePop: 4, doublePdf: 5, doublePdfDoublePop: 6, hidden: 7, popOver: 8, postMessage: 9 },
                            _requirePdf: function () {
                                var a = e.UaParser.getBrowser();
                                return "Mac OS" === e.UaParser.getOS().name ? 57 >= a.major : 57 >= a.major || (60 <= a.major && 64 > a.major) ? !0 : !1;
                            },
                            _getPopOpenMode: function () {
                                var a = e.UaParser.getBrowser(),
                                    b = e.UaParser.getOS();
                                if (64 <= a.major && this._desiredMode == this._popOpenModes.pdfAndFalseTab) return this._popOpenModes.postMessage;
                                if ("Mac OS" === b.name && this._desiredMode != this._popOpenModes.hidden) return 57 < a.major ? this._popOpenModes.notification : this._popOpenModes.pdf;
                                if (!navigator.mimeTypes["application/pdf"]) {
                                    if (57 < a.major && 60 > a.major) return this._popOpenModes.notification;
                                    throw "Pop not supported for this browser";
                                }
                                if (this._desiredMode == this._popOpenModes.tabUnder) return 48 < a.major ? this._popOpenModes.tabUnder : this._popOpenModes.pdf;
                                if (this._desiredMode == this._popOpenModes.doublePop) return 48 < a.major && 61 > a.major ? this._popOpenModes.doublePop : 61 <= a.major ? this._popOpenModes.doublePdfDoublePop : this._popOpenModes.pdf;
                                if (this._desiredMode == this._popOpenModes.notification) return 57 < a.major ? this._popOpenModes.notification : this._popOpenModes.pdf;
                                if (this._desiredMode == this._popOpenModes.pdfAndFalseTab)
                                    return 57 < a.major && 60 > a.major
                                        ? "https:" !== window.location.protocol || ("Windows" === b.name && "7" === b.version)
                                            ? this._popOpenModes.pdfAndFalseTab
                                            : this._popOpenModes.notification
                                        : 60 == a.major
                                        ? this._popOpenModes.pdfAndFalseTab
                                        : 60 < a.major
                                        ? this._popOpenModes.doublePdf
                                        : this._popOpenModes.pdf;
                                if (this._desiredMode == this._popOpenModes.hidden) return this._desiredMode;
                                throw "Unsupported display mode";
                            },
                            _magicNumbers: function () {
                                var a = e.UaParser.getBrowser(),
                                    b = e.UaParser.getOS();
                                return "Mac OS" === b.name
                                    ? "Chrome" === a.name
                                        ? { x: 100, y: 71 }
                                        : "Opera" === a.name
                                        ? { x: 100, y: 86 }
                                        : { x: 0, y: 0 }
                                    : "Windows" === b.name
                                    ? "Chrome" === a.name
                                        ? "56" === a.major
                                            ? { x: 122, y: 34 }
                                            : { x: 120, y: 33 }
                                        : "Opera" === a.name
                                        ? { x: 270, y: 129 }
                                        : { x: 0, y: 0 }
                                    : { x: 0, y: 0 };
                            },
                            _triggerClick: function (a) {
                                this._guid.BasePopunder.triggerClick(a, this._getTriggerEvent());
                            },
                            _createObject: function (a) {
                                a = document.createElement("div");
                                a.setAttribute("style", "visibility:hidden;width:0px;height:0px;opacity:0;position:absolute;top:100%;left:0;pointer-events:none;overflow:hidden;");
                                a.setAttribute("inf", "inf");
                                var b = document.createElement("object");
                                b.setAttribute("data", this._showPdf);
                                a.appendChild(b);
                                this._guid._Top.document.body && this._guid._Top.document.body.appendChild(a);
                                return b;
                            },
                            _getPopRect: function (a) {
                                var b = this._guid,
                                    c = a ? 0 : this._magicNumbers().x;
                                a = a ? 0 : this._magicNumbers().y;
                                return { x: b.GetWindowLeft() + b.GetWindowWidth() / 2 - 512, y: b.GetWindowTop() + b.GetWindowHeight() / 2 - 384, width: this._popWidth - c, height: this._popHeight - a };
                            },
                            _postWindowPop: function (a) {
                                var b = this._guid,
                                    c = this._getPopRect();
                                try {
                                    this._popWin.moveTo(c.x, c.y), this._popWin.resizeBy(c.width, c.height), (this._popWin.location = b.BasePopunder.buildUrl(this._popMediaUrl, b.Enums.SelectedPopType.PopUnder));
                                } catch (g) {
                                    b.ConsoleLog(g);
                                }
                                this._triggerClick(a);
                                b.BasePopunder.postWindowPop();
                            },
                            _focusAchieved: function (a) {
                                if (!this._postWindowPopCalled) {
                                    this._postWindowPopCalled = !0;
                                    if (this._getPopOpenMode() === this._popOpenModes.pdf) {
                                        this._handle.setAttribute("data", this._blankPdf);
                                        var b = this;
                                        setTimeout(function () {
                                            b._handle.parentNode.parentNode.removeChild(b._handle.parentNode);
                                        }, 20);
                                    }
                                    this._postWindowPop(a);
                                }
                            },
                            _focusMainWindow: function (a) {
                                if (this._getPopOpenMode() == this._popOpenModes.notification) {
                                    var b = document.createElement("iframe");
                                    b.width = 0;
                                    b.height = 0;
                                    b.style.width = "0";
                                    b.style.height = "0";
                                    b.srcdoc = "https:" === location.protocol ? "<script>navigator.geolocation.getCurrentPosition(function(){});\x3c/script>" : "<script>Notification.requestPermission(function(){});\x3c/script>";
                                    document.body.appendChild(b);
                                    setTimeout(function () {
                                        b.parentNode.removeChild(b);
                                        a();
                                    }, 150);
                                } else (this._handle = this._createObject(this._showPdf)), e._Top.addEventListener("focus", a), setTimeout(a, 3e3);
                            },
                            _createHiddenPdfFrame: function () {
                                var a = this._guid._Top.document.createElement("iframe");
                                a.name = new Date().getTime().toString();
                                a.id = a.name;
                                a.type = "application/pdf";
                                a.src = this._showPdf;
                                a.setAttribute("style", "width:100px;height:100px;position:absolute;top:-1000px;left:1000px;");
                                a.reset = function () {
                                    a.src = "about:blank";
                                };
                                a.remove = function () {};
                                return a;
                            },
                            _createTabUnderContent: function (a) {
                                var b =
                                        "(" +
                                        function () {
                                            window.go = function () {
                                                window.location.replace(window.popUrl);
                                            };
                                        }.toString() +
                                        ")();",
                                    c = new this.HtmlSourceBuilder(),
                                    g = [];
                                g.push("var popUrl = '" + a + "';");
                                g.push(b);
                                c.addScript(g.join("\n"));
                                return c.toString();
                            },
                            _createDoublePopTabContent: function (a, b) {
                                var c = e;
                                a = c.BasePopunder.buildUrl(a, null != b ? c.Enums.SelectedPopType.PopUnder : c.Enums.SelectedPopType.TabUnder);
                                b = c.BasePopunder.buildUrl(b, c.Enums.SelectedPopType.TabUnder);
                                c =
                                    "(" +
                                    function () {
                                        var l = null;
                                        setTimeout(function () {
                                            window.close();
                                        }, 1e4);
                                        window.addEventListener("mouseup", function () {
                                            l || (l = window.open("about:blank", "win_" + new Date().getTime().toString(), popOptions));
                                        });
                                        window.addEventListener(
                                            "message",
                                            function (d) {
                                                if (d.data && 0 === d.data.indexOf("inf_pop_url::")) {
                                                    var f = d.data.substring(13);
                                                    "null" === f || 0 === f.length
                                                        ? window.close()
                                                        : window.setTimeout(function () {
                                                              window.location.replace(f);
                                                          }, 1);
                                                }
                                            },
                                            !1
                                        );
                                        window.go = function () {
                                            l
                                                ? (l.moveTo(popRect.x, popRect.y),
                                                  l.resizeTo(popRect.width + (l.outerWidth - l.innerWidth), popRect.height + (l.outerHeight - l.innerHeight)),
                                                  l.location.replace(window.popUrl),
                                                  window.popUrl2 &&
                                                      window.setTimeout(function () {
                                                          window.location.replace(window.popUrl2);
                                                      }, 1))
                                                : window.location.replace(window.popUrl);
                                        };
                                    }.toString() +
                                    ")();";
                                var g = new this.HtmlSourceBuilder(),
                                    h = [];
                                h.push("var popRect = " + JSON.stringify(this._getPopRect(!0)) + ";");
                                h.push("var popUrl = '" + a + "';");
                                b && h.push("var popUrl2 = '" + b + "';");
                                h.push("var popOptions = '" + this._guid.PopMediaOptions + "';");
                                h.push(c);
                                g.addScript(h.join("\n"));
                                return g.toString();
                            },
                            HtmlSourceBuilder: function () {
                                var a = [];
                                this.addScript = function (b) {
                                    a.push(b);
                                };
                                this.toString = function () {
                                    var b = [];
                                    b.push("<!DOCTYPE HTML>");
                                    b.push("<html>");
                                    b.push('<head><title></title><meta name="Referrer" content="unsafe-url"/></head>');
                                    b.push("<body>");
                                    for (var c = 0; c < a.length; c++) b.push("<" + "script".toString() + ">"), b.push(a[c]), b.push("</" + "script".toString() + ">");
                                    b.push("</body>");
                                    b.push("</html>");
                                    return b.join("\n");
                                };
                            },
                            _createDoublePdfDoublePopTabContent: function (a, b) {
                                var c = e;
                                a = c.BasePopunder.buildUrl(a, null != b ? c.Enums.SelectedPopType.PopUnder : c.Enums.SelectedPopType.TabUnder);
                                b = c.BasePopunder.buildUrl(b, c.Enums.SelectedPopType.TabUnder);
                                c =
                                    "(" +
                                    function () {
                                        function l() {
                                            var f =
                                                    "(" +
                                                    function () {
                                                        window.addEventListener(
                                                            "message",
                                                            function (n) {
                                                                n.data && 0 === n.data.indexOf("inf_pop_resize")
                                                                    ? ((n = n.data.substring(16).split("x")), window.resizeBy(n[0], n[1]))
                                                                    : tab && n.data && 0 === n.data.indexOf("inf_pop_url::") && ((n = n.data.substring(13)), "null" === n || 0 === n.length ? tab.close() : tab.location.replace(n));
                                                            },
                                                            !1
                                                        );
                                                        var m = document.createElement("iframe");
                                                        m.src = window.popUrl;
                                                        m.setAttribute("style", "width:100%;height:100%");
                                                        document.body.appendChild(m);
                                                    }.toString() +
                                                    ")();",
                                                k = [];
                                            k.push("<!DOCTYPE HTML>");
                                            k.push("<html>");
                                            k.push('<head><title></title><meta name="Referrer" content="unsafe-url"/></head>');
                                            k.push("<body>");
                                            k.push("<" + "script".toString() + ">");
                                            k.push("var popUrl = '" + window.popUrl + "';");
                                            k.push(f);
                                            k.push("</" + "script".toString() + ">");
                                            k.push("</body>");
                                            k.push("</html>");
                                            return k.join("\n");
                                        }
                                        setTimeout(function () {
                                            window.close();
                                        }, 1e4);
                                        window.go = function () {
                                            var f = window.pop;
                                            if (f)
                                                if ((f.moveTo(popRect.x, popRect.y), f.resizeTo(popRect.width + (f.outerWidth - f.innerWidth), popRect.height + (f.outerHeight - f.innerHeight)), window.popUrl2))
                                                    f.location.replace(window.popUrl),
                                                        window.setTimeout(function () {
                                                            window.location.replace(window.popUrl2);
                                                        }, 1);
                                                else {
                                                    var k = f.document;
                                                    k.write(l(window.popUrl));
                                                    k.close();
                                                    f.tab = window;
                                                }
                                            else window.location.replace(window.popUrl);
                                        };
                                        var d = document.createElement("iframe");
                                        d.type = "application/pdf";
                                        d.src = window.pdf;
                                        d.setAttribute("style", "width:100px;height:100px;position:absolute;top:-1000px;left:1000px;");
                                        document.body.appendChild(d);
                                        window.clean = function () {
                                            document.body.removeChild(d);
                                        };
                                    }.toString() +
                                    ")();";
                                var g = new this.HtmlSourceBuilder(),
                                    h = [];
                                h.push("var popRect = " + JSON.stringify(this._getPopRect(!0)) + ";");
                                h.push("var popUrl = '" + a + "';");
                                b && h.push("var popUrl2 = '" + b + "';");
                                h.push("var pdf = '" + this._showPdf + "';");
                                h.push(c);
                                g.addScript(h.join("\n"));
                                return g.toString();
                            },
                            _createDoublePdfPopContent: function (a) {
                                var b = e;
                                a = b.BasePopunder.buildUrl(a, b.Enums.SelectedPopType.PopUnder);
                                b =
                                    "(" +
                                    function () {
                                        var h = setTimeout(function () {
                                                window.go();
                                            }, 5e3),
                                            l = setInterval(function () {
                                                window.openerExists() || window.go();
                                            }, 500);
                                        window.openerExists = function () {
                                            try {
                                                if (window.opener && window.opener.location && window.opener.location.href) return !0;
                                            } catch (d) {}
                                            return !1;
                                        };
                                        window.go = function () {
                                            clearTimeout(h);
                                            clearInterval(l);
                                            window.moveTo(popRect.x, popRect.y);
                                            window.resizeTo(popRect.width + (window.outerWidth - window.innerWidth), popRect.height + (window.outerHeight - window.innerHeight));
                                            window.location.replace(window.popUrl);
                                        };
                                    }.toString() +
                                    ")();";
                                var c = new this.HtmlSourceBuilder(),
                                    g = [];
                                g.push("var popRect = " + JSON.stringify(this._getPopRect(!0)) + ";");
                                g.push("var popUrl = '" + a + "';");
                                g.push(b);
                                c.addScript(g.join("\n"));
                                return c.toString();
                            },
                            _createDoublePdfTabContent: function (a) {
                                var b = e;
                                a = b.BasePopunder.buildUrl(a, b.Enums.SelectedPopType.TabUnder);
                                b =
                                    "(" +
                                    function () {
                                        setTimeout(function () {
                                            window.close();
                                        }, 5e3);
                                        window.go = function () {
                                            window.pop
                                                ? setTimeout(function () {
                                                      window.close();
                                                  }, 0)
                                                : window.location.replace(window.popUrl);
                                        };
                                        var h = document.createElement("iframe");
                                        h.type = "application/pdf";
                                        h.src = window.pdf;
                                        h.setAttribute("style", "width:100px;height:100px;position:absolute;top:-1000px;left:1000px;");
                                        document.body.appendChild(h);
                                        window.clean = function () {
                                            document.body.removeChild(h);
                                        };
                                    }.toString() +
                                    ")();";
                                var c = new this.HtmlSourceBuilder(),
                                    g = [];
                                g.push("var popRect = " + JSON.stringify(this._getPopRect(!0)) + ";");
                                g.push("var popUrl = '" + a + "';");
                                g.push("var pdf = '" + this._showPdf + "';");
                                g.push(b);
                                c.addScript(g.join("\n"));
                                return c.toString();
                            },
                            _createFalseTabContent: function (a) {
                                var b =
                                        "(" +
                                        function () {
                                            var h = null;
                                            window.addEventListener("mouseup", function () {
                                                h || (h = window.open("about:blank", "win_" + new Date().getTime().toString(), popOptions));
                                            });
                                            setTimeout(function () {
                                                h && h.close();
                                                window.close();
                                            }, 5e3);
                                            window.go = function () {
                                                h
                                                    ? (h.moveTo(popRect.x, popRect.y),
                                                      h.resizeTo(popRect.width + (h.outerWidth - h.innerWidth), popRect.height + (h.outerHeight - h.innerHeight)),
                                                      h.location.replace(window.popUrl),
                                                      window.close())
                                                    : window.location.replace(window.popUrl);
                                            };
                                        }.toString() +
                                        ")();",
                                    c = new this.HtmlSourceBuilder(),
                                    g = [];
                                g.push("var popRect = " + JSON.stringify(this._getPopRect(!0)) + ";");
                                g.push("var popUrl = '" + a + "';");
                                g.push("var popOptions = '" + this._guid.PopMediaOptions + "';");
                                g.push(b);
                                c.addScript(g.join("\n"));
                                return c.toString();
                            },
                            _openTabUnder: function (a, b) {
                                function c() {
                                    if (!k) {
                                        k = !0;
                                        l._guid._Top.removeEventListener("focus", c);
                                        d();
                                        f && l._guid._Top.clearTimeout(f);
                                        g.reset();
                                        l._guid._Top.document.body.removeChild(g);
                                        try {
                                            h && h.go();
                                        } catch (n) {}
                                        l._triggerClick(b);
                                        l._guid.PopLoaded = !0;
                                        l._guid.PopRunning = !1;
                                        l._guid.IsFastPop ? (l._guid.IncrementFastPopCap(), l._guid.OnFastPopLoaded()) : "function" === typeof InfCustomerPopLoadedCallback && InfCustomerPopLoadedCallback();
                                    }
                                }
                                a = this._guid.BasePopunder.buildUrl(a, this._guid.Enums.SelectedPopType.TabUnder);
                                var g = this._createHiddenPdfFrame();
                                this._guid._Top.document.body.appendChild(g);
                                var h = null,
                                    l = this,
                                    d = this._onFocusOutAndIn(this._guid._Top, c),
                                    f = null,
                                    k = !1;
                                this._guid._Top.addEventListener("focus", c);
                                f = this._guid._Top.setTimeout(c, 3e3);
                                h = this._guid._Top.open("about:blank", "_blank");
                                var m = h.document;
                                m.write(this._createTabUnderContent(a));
                                m.close();
                            },
                            _openViaDoublePdf: function (a, b, c) {
                                function g() {
                                    if (!f._guid.PopLoaded) {
                                        k && f._guid._Top.document.body.removeChild(k);
                                        try {
                                            l && l.go && l.go(), d && d.go && d.go();
                                        } catch (t) {
                                            console.log(t);
                                        }
                                        f._triggerClick(a);
                                        f._guid.PopLoaded = !0;
                                        f._guid.PopRunning = !1;
                                        f._guid.IsFastPop ? (f._guid.IncrementFastPopCap(), f._guid.OnFastPopLoaded()) : "function" === typeof InfCustomerPopLoadedCallback && InfCustomerPopLoadedCallback();
                                    }
                                }
                                function h(t) {
                                    function u() {
                                        v || ((v = !0), f._guid._Top.removeEventListener("focus", u), x(), z && f._guid._Top.clearTimeout(z), k.reset(), t());
                                    }
                                    k = f._createHiddenPdfFrame();
                                    f._guid._Top.document.body.appendChild(k);
                                    var x = f._onFocusOutAndIn(f._guid._Top, u),
                                        z = null,
                                        v = !1;
                                    f._guid._Top.addEventListener("focus", u);
                                    z = f._guid._Top.setTimeout(u, 3e3);
                                }
                                var l = this._guid._Top.open("about:blank", "_blank"),
                                    d = null,
                                    f = this,
                                    k = null,
                                    m = l.document;
                                m.write(b);
                                m.close();
                                var n = !1,
                                    r = setTimeout(function () {
                                        n = !0;
                                        l.clean();
                                        h(g);
                                    }, 500);
                                l.addEventListener("mouseup", function () {
                                    if (!l.pop && !n) {
                                        clearTimeout(r);
                                        var t = setTimeout(function () {
                                            if (!l.closed) {
                                                if (l.pop) {
                                                    try {
                                                        l.pop.close();
                                                    } catch (z) {}
                                                    l.pop = null;
                                                }
                                                l.clean();
                                                h(g);
                                            }
                                        }, 3e3);
                                        l.addEventListener("focus", function () {
                                            clearTimeout(t);
                                            l.clean();
                                            h(g);
                                        });
                                        d = window.open("about:blank", "win_" + new Date().getTime().toString(), f._guid.PopMediaOptions);
                                        l.pop = d;
                                        if (c) {
                                            var u = d.document;
                                            u.write(c);
                                            u.close();
                                            var x = setInterval(function () {
                                                l.closed && (clearInterval(x), g());
                                            }, 100);
                                        }
                                    }
                                });
                            },
                            _openViaPdfAndFalseTab: function (a, b) {
                                function c() {
                                    d._guid._Top.document.body.removeChild(h);
                                    try {
                                        l && l.go();
                                    } catch (r) {}
                                    d._triggerClick(a);
                                    d._guid.PopLoaded = !0;
                                    d._guid.PopRunning = !1;
                                    d._guid.IsFastPop ? (d._guid.IncrementFastPopCap(), d._guid.OnFastPopLoaded()) : "function" === typeof InfCustomerPopLoadedCallback && InfCustomerPopLoadedCallback();
                                }
                                function g() {
                                    m || ((m = !0), d._guid._Top.removeEventListener("focus", g), f(), k && d._guid._Top.clearTimeout(k), h.reset(), setTimeout(c, 200));
                                }
                                var h = this._createHiddenPdfFrame();
                                this._guid._Top.document.body.appendChild(h);
                                var l = null,
                                    d = this,
                                    f = this._onFocusOutAndIn(this._guid._Top, g),
                                    k = null,
                                    m = !1;
                                this._guid._Top.addEventListener("focus", g);
                                k = this._guid._Top.setTimeout(g, 3e3);
                                l = this._guid._Top.open("about:blank", "_blank");
                                var n = l.document;
                                n.write(b);
                                n.close();
                            },
                            _onPopDisplay: function (a) {
                                this._triggerClick(a);
                                this._guid.PopRunning = !1;
                                this._guid.Storage.SetSessionStorage("InfChromePopEventAttached", !1);
                                this._guid.IsFastPop ? (this._guid.IncrementFastPopCap(), this._guid.OnFastPopLoaded()) : ((this._guid.PopLoaded = !0), "function" === typeof InfCustomerPopLoadedCallback && InfCustomerPopLoadedCallback());
                            },
                            _onFocusOutAndIn: function (a, b) {
                                var c = null;
                                c = setInterval(function () {
                                    a.document.hasFocus() ||
                                        (clearInterval(c),
                                        (c = setInterval(function () {
                                            a.document.hasFocus() && (clearInterval(c), (c = null), b());
                                        }, 20)));
                                }, 20);
                                return function () {
                                    null != c && clearInterval(c);
                                };
                            },
                            _execute: function (a) {
                                var b = this,
                                    c = this._guid,
                                    g = a.target || a.srcElement;
                                if (e.IsFeatureEnabled("IsLookForContainerAnchorLink"))
                                    try {
                                        if (g.tagName && "a" !== g.tagName.toLowerCase()) {
                                            var h = g.getBoundingClientRect(),
                                                l = c._Top.document.elementsFromPoint(h.left, h.top);
                                            for (h = 0; h < l.length; h++)
                                                if (l[h].tagName && "a" === l[h].tagName.toLowerCase()) {
                                                    g = l[h];
                                                    break;
                                                }
                                        }
                                    } catch (m) {}
                                c.EventObject = a;
                                if (c.BasePopunder.execute(a, this._getTriggerEvent(), !1, g))
                                    if (((l = this._getPopOpenMode()), l === this._popOpenModes.popOver)) {
                                        var d = this._getPopRect(!0);
                                        c = new c.PopOver();
                                        c.setUrl(this._popMediaUrl);
                                        c.setLocation(d.x, d.y);
                                        c.setSize(d.width, d.height);
                                        c.setOnSuccessCallback(function () {
                                            b._onPopDisplay(g);
                                        });
                                        c.show(a);
                                    } else if (l === this._popOpenModes.postMessage)
                                        (d = this._getPopRect(!0)),
                                            (c = new c.PopUnderViaPostMessage()),
                                            c.setUrl(this._popMediaUrl),
                                            c.setLocation(d.x, d.y),
                                            c.setSize(d.width, d.height),
                                            c.setOnSuccessCallback(function () {
                                                b._onPopDisplay(g);
                                            }),
                                            c.show(a);
                                    else if (l !== this._popOpenModes.doublePdf && (l !== this._popOpenModes.doublePdfDoublePop || this._popMediaUrl2 || c.IsFastPop || c.AbortFastPop))
                                        if (l === this._popOpenModes.doublePdfDoublePop)
                                            this._openViaDoublePdf(g, this._createDoublePdfDoublePopTabContent(this._popMediaUrl, this._popMediaUrl2)), this._guid.Storage.SetSessionStorage("InfChromePopEventAttached", !1);
                                        else if (l !== this._popOpenModes.pdfAndFalseTab && (l !== this._popOpenModes.doublePop || this._popMediaUrl2 || c.IsFastPop || c.AbortFastPop))
                                            if (l === this._popOpenModes.doublePop)
                                                (a = this._createDoublePopTabContent(this._popMediaUrl, this._popMediaUrl2)), this._openViaPdfAndFalseTab(g, a), this._guid.Storage.SetSessionStorage("InfChromePopEventAttached", !1);
                                            else if (l == this._popOpenModes.tabUnder) this._openTabUnder(this._popMediaUrl, g), this._guid.Storage.SetSessionStorage("InfChromePopEventAttached", !1);
                                            else if (l == this._popOpenModes.hidden)
                                                (c = new c.DelayedPopUnder({
                                                    waitSecondsToLoadMedia: c.IsFastPop ? c.PopSettings.HiddenPopunderWaitSecondsToLoadMedia : c.PopMedia.Settings.HiddenPopunderWaitSecondsToLoadMedia,
                                                    waitForParentToClose: c.IsFastPop ? c.PopSettings.HiddenPopunderWaitForParentWindowToClose : c.PopMedia.Settings.HiddenPopunderWaitForParentWindowToClose,
                                                    waitForParentToFocus: c.IsFastPop ? c.PopSettings.HiddenPopunderWaitForParentWindowToFocus : c.PopMedia.Settings.HiddenPopunderWaitForParentWindowToFocus,
                                                })),
                                                    c.setUrl(this._popMediaUrl),
                                                    (d = this._getPopRect(!0)),
                                                    c.setLocation(d.x, d.y),
                                                    c.setSize(d.width, d.height),
                                                    c.setOnSuccessCallback(function () {
                                                        b._onPopDisplay(g);
                                                    }),
                                                    c.show(a);
                                            else {
                                                var f = null;
                                                "Mac OS" !== c.UaParser.getOS().name &&
                                                    (f = this._onFocusOutAndIn(c._Top, function () {
                                                        b._focusAchieved(g);
                                                    }));
                                                try {
                                                    d = c._Top.document.createElement("iframe");
                                                    d.setAttribute("style", "display:none");
                                                    c._Top.document.body.appendChild(d);
                                                    var k = d.contentWindow.document.createElement("script");
                                                    k.innerHTML =
                                                        "(" +
                                                        function () {
                                                            var m = eval("window");
                                                            m.init = function (n, r) {
                                                                return m.open("about:blank", n, r);
                                                            };
                                                        }.toString() +
                                                        ")();";
                                                    d.contentWindow.document.body.appendChild(k);
                                                    this._popWin = d.contentWindow.init(this._randomString, c.PopMediaOptions);
                                                    c._Top.document.body.removeChild(d);
                                                    this._popWin.document.write("<html><head><script>window.a={};window.a.b=function(){window.resizeTo(1,0);window.moveTo(19999,19999);};window.a.b();\x3c/script></head><body></body></html>");
                                                } catch (m) {
                                                    c.ConsoleLog(m);
                                                }
                                                this._focusMainWindow(function () {
                                                    f && f();
                                                    b._focusAchieved(g);
                                                });
                                            }
                                        else (a = this._createFalseTabContent(this._popMediaUrl)), this._openViaPdfAndFalseTab(g, a), this._guid.Storage.SetSessionStorage("InfChromePopEventAttached", !1);
                                    else
                                        this._openViaDoublePdf(g, this._createDoublePdfTabContent(this._popMediaUrl), this._createDoublePdfPopContent(this._popMediaUrl)),
                                            this._guid.Storage.SetSessionStorage("InfChromePopEventAttached", !1);
                            },
                            supported: function () {
                                return !e.IsMobile.any(e._Top) && !(this._requirePdf() && !navigator.mimeTypes["application/pdf"]);
                            },
                            init: function (a, b) {
                                try {
                                    if (this.supported()) {
                                        var c = (this._guid = e);
                                        this._desiredMode =
                                            b == c.Enums.chromePopApproach.notification
                                                ? this._popOpenModes.notification
                                                : b == c.Enums.chromePopApproach.notificationEx
                                                ? this._popOpenModes.pdfAndFalseTab
                                                : b == c.Enums.chromePopApproach.doublePop
                                                ? this._popOpenModes.doublePop
                                                : b == c.Enums.chromePopApproach.hidden
                                                ? this._popOpenModes.hidden
                                                : this._popOpenModes.tabUnder;
                                        var g = this,
                                            h = this._getPopOpenMode() === this._popOpenModes.tabUnder;
                                        if (c.IsFastPop && !c.AbortFastPop)
                                            (this._popMediaUrl = c.BasePopunder.getFastPopUrl()),
                                                h && (this._popMediaUrl += "&hosted=true"),
                                                (c.PopMediaOptions =
                                                    "directories=0,toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=" +
                                                    this._minX +
                                                    ",height=" +
                                                    this._minY +
                                                    ",screenX=" +
                                                    this._maxLeft +
                                                    ",screenY=" +
                                                    this._maxTop),
                                                (this._popWidth = 1024),
                                                (this._popHeight = 768);
                                        else {
                                            var l = !1;
                                            this._getPopOpenMode() === this._popOpenModes.doublePop || this._getPopOpenMode() === this._popOpenModes.doublePdfDoublePop
                                                ? a.AdItems
                                                    ? ((this._popMediaUrl = c.CreateAdUrl(a, !1, a.AdItems[0])),
                                                      (this._popMediaUrl2 = 1 < a.AdItems.length ? c.CreateAdUrl(a, !1, a.AdItems[1]) : null),
                                                      (this._popWidth = a.AdItems[0].MediaSettings.Width),
                                                      (this._popHeight = a.AdItems[0].MediaSettings.Height))
                                                    : ((this._popMediaUrl = c.FetchMediaUrl(a)),
                                                      (this._popWidth = (l = a.ZoneAcceptsFullscreenPageunder && a.MediaAllowsFullscreenPageunder) ? this._guid._Top.window.screen.availWidth : a.Settings.Width),
                                                      (this._popHeight = l ? this._guid._Top.window.screen.availHeight : a.Settings.Height))
                                                : a.AdItems
                                                ? ((this._popMediaUrl = c.CreateAdUrl(a, h)), (this._popWidth = a.AdItems[0].MediaSettings.Width), (this._popHeight = a.AdItems[0].MediaSettings.Height))
                                                : ((this._popMediaUrl = c.FetchMediaUrl(a, h)),
                                                  (this._popWidth = (l = a.ZoneAcceptsFullscreenPageunder && a.MediaAllowsFullscreenPageunder) ? this._guid._Top.window.screen.availWidth : a.Settings.Width),
                                                  (this._popHeight = l ? this._guid._Top.window.screen.availHeight : a.Settings.Height));
                                            c.PopMediaOptions =
                                                "directories=0,toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=" +
                                                this._minX +
                                                ",height=" +
                                                this._minY +
                                                ",screenX=" +
                                                (l ? 0 : this._maxLeft) +
                                                ",screenY=" +
                                                (l ? 0 : this._maxTop);
                                            c.PopMedia = a;
                                        }
                                        void 0 === c._Top.g367CB268B1094004A3689751E7AC568F && (c._Top.g367CB268B1094004A3689751E7AC568F = {});
                                        c.ChromePopMouseDownHandler = function (d) {
                                            c.BasePopunder.mouseDownHandler(d, a) && g._execute(d);
                                        };
                                        "true" !== c.Storage.GetSessionStorage("InfChromePopEventAttached") &&
                                            (c._Top.document.addEventListener(this._getTriggerEvent(), c.ChromePopMouseDownHandler, !0),
                                            c.Storage.SetSessionStorage("InfChromePopEventAttached", !0),
                                            (c._Top.onbeforeunload = c._Top.onunload = function (d) {
                                                c.Storage.DeleteSessionStorage("InfChromePopEventAttached");
                                            }));
                                    }
                                } catch (d) {
                                    e.ConsoleLog(d);
                                }
                            },
                            _getTriggerEvent: function () {
                                for (
                                    var a = this._getPopOpenMode(),
                                        b = [this._popOpenModes.pdfAndFalseTab, this._popOpenModes.doublePop, this._popOpenModes.doublePdf, this._popOpenModes.doublePdfDoublePop, this._popOpenModes.tabUnder, this._popOpenModes.postMessage],
                                        c = 0;
                                    c < b.length;
                                    c++
                                )
                                    if (b[c] === a) return "mousedown";
                                return "click";
                            },
                        },
                        EdgePopunder: {
                            _media: null,
                            _popMediaUrl: null,
                            _abortPop: !1,
                            supported: function (a, b, c) {
                                return "Edge" === a.name && "Windows" === b.name && this._isPopunder(c) && !this._isTracking(c) && !this._isSameTab(c);
                            },
                            _isPopunder: function (a) {
                                var b = e;
                                return (b.IsFastPop && b.PopSettings.IsPopunder) || (!b.IsFastPop && 0 === a.Settings.PopType);
                            },
                            _isTracking: function (a) {
                                var b = e;
                                return b.IsFastPop ? b.PopSettings.IsTracking : a.Settings.IsTracking;
                            },
                            _isSameTab: function (a) {
                                var b = e;
                                a = b.IsFastPop ? b.PopSettings.SameTabAdSettings : a.Settings.SameTabAdSettings;
                                return null != a && a.Windows && a.Edge && (0 == a.AdblockOnly || b.IsAdblockRequest);
                            },
                            init: function (a) {
                                this._media = a;
                                var b = e;
                                b.PopMedia = a;
                                a = b.IsFastPop && !b.AbortFastPop ? b.BasePopunder.getFastPopUrl() : b.FetchMediaUrl(a);
                                this._popMediaUrl = b.BasePopunder.buildUrl(a, b.Enums.SelectedPopType.PopUnder);
                                var c = this;
                                b._Top.document.addEventListener(
                                    "mousedown",
                                    function (g) {
                                        c._mouseDownHandler(g);
                                    },
                                    !0
                                );
                                b._Top.document.addEventListener(
                                    "click",
                                    function (g) {
                                        c._clickHandler(g);
                                    },
                                    !0
                                );
                            },
                            _mouseDownHandler: function (a) {
                                e.BasePopunder.mouseDownHandler(a, this._media) && this._execute(a);
                                return !0;
                            },
                            _clickHandler: function (a) {
                                e.BasePopunder.shouldHandleEvent(this._media, !1) && !this._abortPop && (a.preventDefault(), a.stopImmediatePropagation(), a.stopPropagation());
                                return !0;
                            },
                            _execute: function (a) {
                                var b = e;
                                if (b.BasePopunder.execute(a, "mousedown", !0)) {
                                    var c = 1024,
                                        g = 768,
                                        h = !1;
                                    if (!b.IsFastPop || b.AbortFastPop)
                                        (h = this._media.ZoneAcceptsFullscreenPageunder && this._media.MediaAllowsFullscreenPageunder),
                                            (c = 320 > this._media.Settings.Width ? 320 : h ? b._Top.window.screen.availWidth : this._media.Settings.Width),
                                            (g = 159 > this._media.Settings.Height ? 160 : h ? b._Top.screen.availHeight : this._media.Settings.Height + 1);
                                    var l = h ? 0 : b.GetWindowLeft() + b.GetWindowWidth() / 2 - c / 2;
                                    c = "scrollbars=1,location=1,statusbar=1,menubar=0,resizable=1,top=" + (h ? 0 : b.GetWindowTop() + b.GetWindowHeight() / 2 - g / 2) + ",left=" + l + ",width=" + c + ",height=" + g + ",index=0,total=1";
                                    var d = window.open("about:blank", b.BasePopunder.getWindowName(), c),
                                        f = this,
                                        k = 0,
                                        m = setInterval(function () {
                                            k++;
                                            2 < k || b._Top.document.hasFocus()
                                                ? (clearInterval(m), (d.location.href = f._popMediaUrl), b.BasePopunder.postWindowPop(), b.BasePopunder.triggerClick(a.target || a.srcElement))
                                                : b._Top.focus();
                                        }, 400);
                                } else this._abortPop = !0;
                            },
                        },
                        LogZoneFilter: function (a) {
                            var b = this;
                            return function (c, g, h) {
                                "undefined" === typeof a || null == a
                                    ? b.ClientProfilingLog.WriteFilterLog({ id: "-1", name: "UNKNOWN", type: "Zone" }, c, g, h)
                                    : b.ClientProfilingLog.WriteFilterLog({ id: a.Id, name: a.Name, type: "Zone" }, c, g, h);
                            };
                        },
                        ClientProfilingLog: {
                            _logItems: [],
                            WriteFilterLog: function (a, b, c, g) {
                                this._logItems.push({ type: "filter", data: { message: g, passed: c, name: b, target: a } });
                            },
                            GetItems: function () {
                                return this._logItems;
                            },
                        },
                        IsTagTest: function () {
                            try {
                                return !0 === window.top.__infinity_tag_test;
                            } catch (a) {}
                            return !1;
                        },
                    };
                    (function (a) {
                        function b(d) {
                            if ("object" !== typeof d && "function" !== typeof d) throw new TypeError("Object prototype may only be an Object: " + d);
                            if ("function" !== typeof Object.create) {
                                var f = function () {};
                                f.prototype = d;
                                return new f();
                            }
                            return Object.create(d);
                        }
                        function c(d, f) {
                            d.prototype = b(f.prototype);
                            d.prototype.constructor = d;
                        }
                        Array.prototype.findIndexOfNth ||
                            Object.defineProperty(Array.prototype, "findIndexOfNth", {
                                value: function (d, f) {
                                    if (1 > f) throw "N must be greater than 0";
                                    for (var k = 0; k < this.length; ) {
                                        if (d.call(window, this[k], k, this) && (f--, 0 === f)) return k;
                                        k++;
                                    }
                                    return -1;
                                },
                            });
                        Array.prototype.forEach ||
                            (Array.prototype.forEach = function (d) {
                                var f, k;
                                if (null == this) throw new TypeError("this is null or not defined");
                                var m = Object(this),
                                    n = m.length >>> 0;
                                if ("function" !== typeof d) throw new TypeError(d + " is not a function");
                                1 < arguments.length && (f = arguments[1]);
                                for (k = 0; k < n; ) {
                                    if (k in m) {
                                        var r = m[k];
                                        d.call(f, r, k, m);
                                    }
                                    k++;
                                }
                            });
                        Array.prototype.filter ||
                            (Array.prototype.filter = function (d) {
                                if (void 0 === this || null === this) throw new TypeError();
                                var f = Object(this),
                                    k = f.length >>> 0;
                                if ("function" !== typeof d) throw new TypeError();
                                for (var m = [], n = 2 <= arguments.length ? arguments[1] : void 0, r = 0; r < k; r++)
                                    if (r in f) {
                                        var t = f[r];
                                        d.call(n, t, r, f) && m.push(t);
                                    }
                                return m;
                            });
                        Array.prototype.find ||
                            Object.defineProperty(Array.prototype, "find", {
                                value: function (d, f) {
                                    if (null == this) throw new TypeError('"this" is null or not defined');
                                    var k = Object(this),
                                        m = k.length >>> 0;
                                    if ("function" !== typeof d) throw new TypeError("predicate must be a function");
                                    for (var n = 0; n < m; ) {
                                        var r = k[n];
                                        if (d.call(f, r, n, k)) return r;
                                        n++;
                                    }
                                },
                            });
                        Array.prototype.map ||
                            (Array.prototype.map = function (d) {
                                var f, k;
                                if (null == this) throw new TypeError("this is null or not defined");
                                var m = Object(this),
                                    n = m.length >>> 0;
                                if ("function" !== typeof d) throw new TypeError(d + " is not a function");
                                1 < arguments.length && (f = arguments[1]);
                                var r = Array(n);
                                for (k = 0; k < n; ) {
                                    if (k in m) {
                                        var t = m[k];
                                        t = d.call(f, t, k, m);
                                        r[k] = t;
                                    }
                                    k++;
                                }
                                return r;
                            });
                        Array.prototype.findIndex ||
                            (Array.prototype.findIndex = function (d, f) {
                                if (null == this) throw new TypeError("Array.prototype.findIndex called on null or undefined");
                                if ("function" !== typeof d) throw new TypeError("predicate must be a function");
                                for (var k = Object(this), m = k.length >>> 0, n, r = 0; r < m; r++) if (((n = k[r]), d.call(f, n, r, k))) return r;
                                return -1;
                            });
                        Array.prototype.reduce ||
                            (Array.prototype.reduce = function (d) {
                                if (null == this) throw new TypeError("Array.prototype.reduce called on null or undefined");
                                if ("function" !== typeof d) throw new TypeError(d + " is not a function");
                                var f = Object(this),
                                    k = f.length >>> 0,
                                    m = 0;
                                if (2 <= arguments.length) var n = arguments[1];
                                else {
                                    for (; m < k && !(m in f); ) m++;
                                    if (m >= k) throw new TypeError("Reduce of empty array with no initial value");
                                    n = f[m++];
                                }
                                for (; m < k; m++) m in f && (n = d(n, f[m], m, f));
                                return n;
                            });
                        Function.prototype.bind ||
                            (Function.prototype.bind = function (d) {
                                if ("function" !== typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                                var f = Array.prototype.slice.call(arguments, 1),
                                    k = this,
                                    m = function () {},
                                    n = function () {
                                        return k.apply(this instanceof m ? this : d, f.concat(Array.prototype.slice.call(arguments)));
                                    };
                                this.prototype && (m.prototype = this.prototype);
                                n.prototype = new m();
                                return n;
                            });
                        Array.from ||
                            (Array.from = (function () {
                                var d = Object.prototype.toString,
                                    f = function (m) {
                                        return "function" === typeof m || "[object Function]" === d.call(m);
                                    },
                                    k = Math.pow(2, 53) - 1;
                                return function (m) {
                                    var n = Object(m);
                                    if (null == m) throw new TypeError("Array.from requires an array-like object - not null or undefined");
                                    var r = 1 < arguments.length ? arguments[1] : void 0,
                                        t;
                                    if ("undefined" !== typeof r) {
                                        if (!f(r)) throw new TypeError("Array.from: when provided, the second argument must be a function");
                                        2 < arguments.length && (t = arguments[2]);
                                    }
                                    var u = Number(n.length);
                                    u = isNaN(u) ? 0 : 0 !== u && isFinite(u) ? (0 < u ? 1 : -1) * Math.floor(Math.abs(u)) : u;
                                    u = Math.min(Math.max(u, 0), k);
                                    for (var x = f(this) ? Object(new this(u)) : Array(u), z = 0, v; z < u; ) (v = n[z]), (x[z] = r ? ("undefined" === typeof t ? r(v, z) : r.call(t, v, z)) : v), (z += 1);
                                    x.length = u;
                                    return x;
                                };
                            })());
                        var g = (function () {
                            function d() {}
                            d.VideoAudioMode = { audio: 0, audioOnMouseOver: 1, muted: 2 };
                            d.OnClickVideoAdUnitMode = { ReadMore: 0, Scroll: 1 };
                            d.ViewProgress = { firstQuartile: 1, midpoint: 2, thirdQuartile: 3, complete: 4 };
                            d.MediaSourceType = { Url: 1, Image: 2, Script: 3, Html: 4, Video: 5, VideoTag: 6, OnClickIFrame: 7, HeaderBidding: 8, Native: 9 };
                            d.MediaSourceTypesFlags = { None: 0, Url: 1, Image: 2, Script: 4, Html: 8, Video: 16, VideoTag: 32, OnClickIFrame: 64, HeaderBidding: 128, Native: 256 };
                            d.TrackingEventType = { adFill: 1, adView: 2, infinityVolume: 3, partnerVolume: 4, headerBiddingVolume: 5, videoAdPlayError: 6 };
                            d.AdFillCheckStatus = { skipped: 1, failed: 2, success: 3 };
                            d.chromePopApproach = { notification: 0, notificationEx: 1, tabUnder: 2, tabOver: 3, doublePop: 4, hidden: 5, mixed: 6 };
                            d.RelativePlacementType = { Inside: 0, Before: 1, After: 2 };
                            d.CssTransitionTimingFunction = { Linear: 0, Ease: 1, EaseIn: 2, EaseOut: 3, EaseInOut: 4 };
                            d.VideoButtonDisplayMode = { always: 0, onHover: 1, never: 2 };
                            d.RelativeAlignment = { Left: 0, Right: 1, Over: 2 };
                            return d;
                        })();
                        (function () {
                            function d() {
                                this._handlers = [];
                                this._triggered = !1;
                            }
                            d.prototype.addHandler = function (f, k) {
                                this._handlers.push({ handler: f, callContext: k });
                            };
                            d.prototype.removeHandler = function (f) {
                                if (void 0 === f) this.removeAllHandlers();
                                else {
                                    var k = this._handlers.findIndex(function (m) {
                                        return m.handler === f;
                                    });
                                    -1 !== k && this._handlers.splice(k, 1);
                                }
                            };
                            d.prototype.getTriggered = function () {
                                return this._triggered;
                            };
                            d.prototype.removeAllHandlers = function () {
                                this._handlers = [];
                            };
                            d.prototype.trigger = function (f) {
                                for (var k = 0; k < this._handlers.length; k++) this._handlers[k].handler.call(this._handlers[k].callContext || this, f);
                                this._triggered = !0;
                            };
                            d.prototype.triggerOnce = function (f) {
                                this._triggered || this.trigger(f);
                            };
                            return d;
                        })();
                        (function () {
                            function d(f, k) {
                                this._name = f;
                                this._enableSendToServer = k.enableSendToServer ? !0 : !1;
                                this._level = k.level || "Info";
                            }
                            d.prototype.getName = function () {
                                return this._name;
                            };
                            d.prototype.getLevel = function () {
                                return this._level;
                            };
                            d.prototype.info = function (f) {
                                "Info" === this._level && this._writeLog(this._name + " [INFO]: " + f);
                            };
                            d.prototype.dump = function (f, k) {
                                function m(r, t) {
                                    return t && "string" === typeof t && 100 < t.length ? t.substr(0, 100) + "..." : t;
                                }
                                var n = this;
                                "Info" === this._level &&
                                    (this.info(f),
                                    this._groupOutput(function () {
                                        n._writeLog(JSON.stringify(k, m, 4));
                                    }));
                            };
                            d.prototype.error = function (f) {
                                ("Info" !== this._level && "Error" !== this._level) || this._writeError(this._name + " [ERROR]: " + f);
                            };
                            d.prototype._groupOutput = function (f) {
                                console.group ? (console.group(), f(), console.groupEnd()) : f();
                            };
                            d.prototype._writeError = function (f) {
                                console.error ? console.error(f) : (console.log(f), console.trace && console.trace());
                                this._enableSendToServer && this._sendToServer(f);
                            };
                            d.prototype._writeLog = function (f) {
                                console.log(f);
                                this._enableSendToServer && this._sendToServer(f);
                            };
                            d.prototype._sendToServer = function (f) {
                                var k = new XMLHttpRequest();
                                k.open("POST", "https://infinity.pub.com/log.aspx?msg=" + encodeURIComponent(f));
                                k.send("");
                            };
                            return d;
                        })();
                        (function () {
                            function d(f) {
                                for (var k = [], m = 1; m < arguments.length; m++) k[m - 1] = arguments[m];
                                this._value = f;
                                this._fallbackValues = [];
                                null != k && (this._fallbackValues = k);
                            }
                            d.prototype.addFallback = function (f) {
                                this._fallbackValues.push(f);
                            };
                            d.prototype.resolve = function () {
                                return null == this._value
                                    ? this._fallbackValues.find(function (f) {
                                          return null != f;
                                      })
                                    : this._value;
                            };
                            return d;
                        })();
                        (function () {
                            function d() {}
                            d.isPlaying = function (f) {
                                return 0 < f.currentTime && !f.paused && !f.ended;
                            };
                            return d;
                        })();
                        (function () {
                            function d() {}
                            d.isChildOf = function (f, k) {
                                for (var m = f; null != m; ) {
                                    if (m === k) return !0;
                                    m = m.parentElement;
                                }
                                return !1;
                            };
                            return d;
                        })();
                        var h = function (d, f) {
                            this._options = d;
                            this._lotame = f;
                        };
                        h.prototype = {
                            trackingResponseBuilderTransform: function (d) {
                                return this._options.DFPImpressionUrl + this._options.InfinityHost + d;
                            },
                            redirectResponseBuilderTransform: function (d, f, k) {
                                var m = this._getRedirectHostUrl(f);
                                1 == f.Redirect && (m = m.replace("https://", "https://"));
                                var n = "undefined" != typeof f.MediaSettings ? f.MediaSettings : f.Settings;
                                d = this._options.IsAdblockRequest
                                    ? "/" +
                                      (f.MediaSegmentId ? f.MediaSegmentId : "null") +
                                      "/" +
                                      (f.TempMediaId ? f.TempMediaId : "null") +
                                      "/" +
                                      (f.PassBackId ? f.PassBackId : "null") +
                                      "/" +
                                      (f.DataContextId ? f.DataContextId : "null") +
                                      "/" +
                                      (f.VolumeMetricId ? f.VolumeMetricId : "null") +
                                      "/" +
                                      this._options.IsAdblockRequest +
                                      "/" +
                                      screen.width +
                                      "x" +
                                      screen.height +
                                      "/" +
                                      (f.TimeZoneOffset ? f.TimeZoneOffset : "null") +
                                      "/" +
                                      ("undefined" != typeof f.IsDSTActive && null != f.IsDSTActive ? f.IsDSTActive : "null") +
                                      "/null" +
                                      ("PopUnder" == f.MediaType ? "/SelectedPopTypePlaceholder" : "/null") +
                                      "/" +
                                      (encodeURIComponent(this._options.GetKeywords()) ? encodeURIComponent(this._options.GetKeywords()) : "null") +
                                      "/" +
                                      n.Width +
                                      "/" +
                                      n.Height +
                                      "/redir.a2b"
                                    : d + "&abr=" + this._options.IsAdblockRequest + "&res=" + screen.width + "x" + screen.height;
                                if (!0 === k && 1024 > n.Width) {
                                    if (void 0 != this._options.DFPImpressionUrl && "" != this._options.DFPImpressionUrl)
                                        return (f = "/Bridge/Index?width=" + n.Width + "&height=" + n.Height + "&url=" + encodeURIComponent(d)), this._options.DFPImpressionUrl + m + f;
                                    f = "/Bridge/Index?width=" + n.Width + "&height=" + n.Height + "&url=" + encodeURIComponent(d);
                                    return m + f;
                                }
                                "Link" === f.MediaType && !0 === n.PassParams && 0 < this._options.PassParams.length && ((k = d + "&" + this._options.PassParams), 2048 >= k.length && (d = k), (d = this._options.DFPImpressionUrl + d));
                                "Link" !== f.MediaType ||
                                    (f.MediaSourceType != g.MediaSourceType.Video && f.MediaSourceType != g.MediaSourceType.VideoTag) ||
                                    (d = "/Bridge/Index?width=" + n.Width + "&height=" + n.Height + "&url=" + encodeURIComponent(d));
                                this._lotame && this._lotame.PlaceImpressionPixel(f);
                                return void 0 !== this._options.EncodeUrl && this._options.EncodeUrl
                                    ? ((m = m.replace("https://", "").replace("https://", "").replace("https://", "")), this._options.DFPImpressionUrl + "https://" + window.getUri(m + d))
                                    : this._options.DFPImpressionUrl + m + d;
                            },
                            _getRedirectHostUrl: function (d) {
                                return this._options.IsAdblockRequest || null == d || null == d.RedirectHostUrl ? this._options.InfinityHost : d.RedirectHostUrl;
                            },
                        };
                        var l = function (d, f, k, m, n) {
                            this._zoneResult = d;
                            this._urlTransforms = f;
                            this._engineHost = k;
                            this._clientInfo = m;
                            this._createTestClickUrl = n;
                            f = this._apply.bind(this);
                            d.AdItems.forEach(f);
                        };
                        l.prototype = {
                            getAdUrl: function (d) {
                                function f(m, n) {
                                    for (var r in n) n.hasOwnProperty(r) && (m[r] = n[r]);
                                    return m;
                                }
                                if (d.RedirectUrlTransform) {
                                    var k = f(f({}, this._zoneResult), d);
                                    if ("function" === typeof this._urlTransforms[d.RedirectUrlTransform]) return this._urlTransforms[d.RedirectUrlTransform](d.RedirectUrl, k, !1);
                                }
                                return d.RedirectUrl;
                            },
                            getClickTrackingUrl: function (d) {
                                if (this._createTestClickUrl) return this._createTestClickUrl(d);
                                d = [
                                    "rand=" + Math.floor(89999999 * Math.random() + 1e7),
                                    "res=" + this._clientInfo.getScreenWidth() + "x" + this._clientInfo.getScreenHeight(),
                                    "dcid=" + (this._zoneResult.DataContextId ? this._zoneResult.DataContextId : ""),
                                    "v=" + d.VolumeMetric,
                                ];
                                return this._engineHost + "/clicktag.engine?" + d.join("&");
                            },
                            _apply: function (d) {
                                var f = this,
                                    k;
                                for (k in l.prototype)
                                    if ("apply" !== k) {
                                        if ("undefined" !== typeof d[k]) throw "Cannot extend ad item as member named '" + k + "' is already defined";
                                        (function (m) {
                                            d[m] = function () {
                                                var n = [].slice.call(arguments);
                                                n.splice(0, 0, this);
                                                return f[m].apply(f, n);
                                            };
                                        })(k);
                                    }
                            },
                        };
                        a.UrlTransforms = h;
                        a.AdItemExtensions = l;
                        a.Client = function () {
                            var d = e.UaParser;
                            this._userAgent = d.getUA();
                            this._os = d.getOS();
                            this._browser = d.getBrowser();
                        };
                        a.Client.prototype = {
                            isFacebookApp: function () {
                                return -1 < this._userAgent.indexOf("FBAN/FBIOS") || -1 < this._userAgent.indexOf("FB_IAB/FB4A") || -1 < this._userAgent.indexOf("FBAV");
                            },
                            isMacOS: function () {
                                return "Mac OS" === this._os.name;
                            },
                            isChromeBrowser: function () {
                                return "Chrome" === _browser.current.name;
                            },
                            getBrowserMajorVersion: function () {
                                return parseInt(browser.major);
                            },
                        };
                        a.PopWindow = function () {
                            this._url = "about:blank";
                            this._successCallback = null;
                            this._y = this._x = 0;
                            this._height = this._width = 1;
                            this._topWin = e._Top;
                            this._topDoc = this._topWin.document;
                        };
                        a.PopWindow.prototype = {
                            getEventType: function () {
                                return "click";
                            },
                            getRespectsSize: function () {
                                return !0;
                            },
                            isSupported: function (d) {
                                return !0;
                            },
                            canShow: function (d) {
                                return !0;
                            },
                            setOnSuccessCallback: function (d) {
                                this._successCallback = d;
                            },
                            setUrl: function (d) {
                                throw "Call is not permitted on abstract PopWindow class";
                            },
                            setLocation: function (d, f) {
                                this._x = d;
                                this._y = f;
                            },
                            setSize: function (d, f) {
                                this._width = d;
                                this._height = f;
                            },
                            getCompatibleDisplayTargetingType: function () {
                                return null;
                            },
                            show: function (d) {
                                throw "Call is not permitted on abstract PopWindow class";
                            },
                            getTypeName: function () {
                                throw "Call is not permitted on abstract PopWindow class";
                            },
                            _getRandomName: function () {
                                return Math.floor(1e3 * Math.random() + 1).toString();
                            },
                            _getWinOptions: function () {
                                return "directories=0,toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=" + this._width + ",height=" + this._height + ",screenX=" + this._x + ",screenY=" + this._y + "index=0,total=1";
                            },
                        };
                        a.PopUnderViaPostMessage = function () {
                            a.PopWindow.call(this);
                            this._messageNamespace = Math.random().toString();
                            this._initialized = !1;
                            try {
                                var d = this;
                                window.addEventListener("message", function (f) {
                                    d._handleMessage(f);
                                });
                                this._initialized = !0;
                            } catch (f) {}
                        };
                        c(a.PopUnderViaPostMessage, a.PopWindow);
                        a.PopUnderViaPostMessage.prototype.getEventType = function () {
                            return "mousedown";
                        };
                        a.PopUnderViaPostMessage.prototype.isSupported = function (d) {
                            return this._initialized && d.isChromeBrowser() && 64 <= d.getBrowserMajorVersion();
                        };
                        a.PopUnderViaPostMessage.prototype.setUrl = function (d) {
                            this._url = a.BasePopunder.buildUrl(d, a.Enums.SelectedPopType.PopUnder);
                        };
                        a.PopUnderViaPostMessage.prototype.getCompatibleDisplayTargetingType = function () {
                            return e.Enums.PopUnderDisplayTargetingType.Standard;
                        };
                        a.PopUnderViaPostMessage.prototype.getTypeName = function () {
                            return "PopUnderViaPostMessage";
                        };
                        a.PopUnderViaPostMessage.prototype._handleMessage = function (d) {
                            0 === d.data.indexOf(this._messageNamespace) && d.origin === window.location.origin && ((d = d.data.substr(this._messageNamespace.length + 1)), "pop" === d && this._openPop(), "stub" === d && this._openStub());
                        };
                        a.PopUnderViaPostMessage.prototype._openPop = function () {
                            var d = this._getRandomName(),
                                f = this._getWinOptions();
                            window.open(this._url, d, f);
                            this._successCallback && this._successCallback();
                        };
                        a.PopUnderViaPostMessage.prototype._openStub = function () {
                            window.open("about:blank", "_blank", "").close();
                        };
                        a.PopUnderViaPostMessage.prototype.show = function () {
                            window.postMessage(this._messageNamespace + ".pop", window.location.origin);
                            window.postMessage(this._messageNamespace + ".stub", window.location.origin);
                        };
                        a.DelayedPopUnder = function (d) {
                            a.PopWindow.call(this);
                            this._waitSecondsToLoadMedia = d.waitSecondsToLoadMedia;
                            this._waitForParentToClose = null != d.waitForParentToClose ? d.waitForParentToClose : !0;
                            this._waitForParentToFocus = null != d.waitForParentToFocus ? d.waitForParentToFocus : !0;
                        };
                        c(a.DelayedPopUnder, a.PopWindow);
                        a.DelayedPopUnder.prototype.setUrl = function (d) {
                            this._url = a.BasePopunder.buildUrl(d, a.Enums.SelectedPopType.PopUnder);
                        };
                        a.DelayedPopUnder.prototype.isSupported = function (d) {
                            return !0;
                        };
                        a.DelayedPopUnder.prototype._getHiddenWindowOptions = function () {
                            return "directories=0,toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=1,height=1,screenX=19999,screenY=19999";
                        };
                        a.DelayedPopUnder.prototype._getHiddenPopHtml = function () {
                            var d = new a.Client().isMacOS() ? -70 : 0;
                            return (
                                "<!DOCTYPE HTML><html><head><script> (function() { window.resizeTo(0, 0 ); window.moveTo(9999, 9999); })(); \x3c/script><script>window.openerExists = function(){return window.opener != null;};window.openerHasFocus = function(){return window.opener && window.opener.document && window.opener.document.hasFocus && window.opener.document.hasFocus(); };window.isExpanded = function() { return window.outerWidth > 200 && window.outerHeight > 100; }; function showUpPop(){setTimeout(function(){var popWidth = " +
                                (this._width +
                                    " + window.outerWidth - window.innerWidth;var popHeight = " +
                                    this._height +
                                    " + window.outerHeight + " +
                                    d +
                                    ";window.moveTo(" +
                                    this._x +
                                    ", " +
                                    this._y +
                                    ");window.resizeTo(popWidth, popHeight);document.location.replace('" +
                                    this._url +
                                    "');}, " +
                                    1e3 * this._waitSecondsToLoadMedia +
                                    ");}") +
                                (this._waitForParentToClose || this._waitForParentToFocus
                                    ? "var poll = setInterval(function(){if (window.isExpanded() || " +
                                      this._waitForParentToClose.toString() +
                                      " && !window.openerExists() || " +
                                      this._waitForParentToFocus.toString() +
                                      " && window.openerHasFocus()){clearInterval(poll);showUpPop();}}, 200);"
                                    : "showUpPop();") +
                                "\x3c/script></head><body></body></html>"
                            );
                        };
                        a.DelayedPopUnder.prototype.show = function (d) {
                            e.WinUtil.openWithContent(this._getHiddenPopHtml(), this._getRandomName(), this._getHiddenWindowOptions());
                            this._successCallback && this._successCallback();
                        };
                        a.DelayedPopUnder.prototype.getCompatibleDisplayTargetingType = function () {
                            return e.Enums.PopUnderDisplayTargetingType.Standard;
                        };
                        a.DelayedPopUnder.prototype.getTypeName = function () {
                            return "DelayedPopUnder";
                        };
                        a.PopOver = function () {
                            a.PopWindow.call(this);
                        };
                        c(a.PopOver, a.PopWindow);
                        a.PopOver.prototype.setUrl = function (d) {
                            this._url = a.BasePopunder.buildUrl(d, a.Enums.SelectedPopType.PopOver);
                        };
                        a.PopOver.prototype.show = function () {
                            var d = this._getRandomName(),
                                f = this._getWinOptions();
                            window.open(this._url, d, f);
                            this._successCallback && this._successCallback();
                        };
                        a.PopOver.prototype.getCompatibleDisplayTargetingType = function () {
                            return e.Enums.PopUnderDisplayTargetingType.Standard;
                        };
                        a.PopOver.prototype.getTypeName = function () {
                            return "PopOver";
                        };
                        a.ExternalSameTab = function (d) {
                            if ("function" !== typeof d) throw "Argument is invalid. Function expected";
                            a.PopWindow.call(this);
                            this._externalShowFunc = d;
                        };
                        c(a.ExternalSameTab, a.PopWindow);
                        a.ExternalSameTab.prototype.setUrl = function (d) {
                            this._url = a.BasePopunder.buildUrl(d, a.Enums.SelectedPopType.TabUnder);
                        };
                        a.ExternalSameTab.prototype.getRespectsSize = function () {
                            return !1;
                        };
                        a.ExternalSameTab.prototype.isSupported = function (d) {
                            return !d.isFacebookApp();
                        };
                        a.ExternalSameTab.prototype.show = function (d) {
                            this._externalShowFunc(d);
                            this._successCallback && this._successCallback();
                        };
                        a.ExternalSameTab.prototype.getCompatibleDisplayTargetingType = function () {
                            return e.Enums.PopUnderDisplayTargetingType.Tab;
                        };
                        a.ExternalSameTab.prototype.getTypeName = function () {
                            return "ExternalSameTab";
                        };
                        a.SameTab = function (d) {
                            a.PopWindow.call(this);
                            this._clickAnywhere = d.clickAnywhere;
                        };
                        c(a.SameTab, a.PopWindow);
                        a.SameTab.prototype.setUrl = function (d) {
                            this._url = a.BasePopunder.buildUrl(d, a.Enums.SelectedPopType.TabUnder);
                        };
                        a.SameTab.prototype.getRespectsSize = function () {
                            return !1;
                        };
                        a.SameTab.prototype.isSupported = function (d) {
                            return !d.isFacebookApp();
                        };
                        a.SameTab.prototype.canShow = function (d) {
                            if (this._clickAnywhere) return !0;
                            d = d.target || d.srcElement;
                            "a" !== d.tagName.toLowerCase() && (d = e.GetParentLink(d));
                            return "a" === d.tagName.toLowerCase() && null != this._extractUrl(d);
                        };
                        a.SameTab.prototype._extractUrl = function (d) {
                            var f = /#$/,
                                k = d.getAttribute("href");
                            return 0 !== k.lastIndexOf("javascript:", 0) && "#" !== k ? ((d = d.href.replace(f, "")), 0 == d.length ? null : d) : null;
                        };
                        a.SameTab.prototype._targetBlankTriggered = function (d) {
                            return d ? e.Storage.SetSessionStorage("InfSTATargetBlank", "true") : e.Storage.SetLocalStorage("InfSTATargetBlank", "true");
                        };
                        a.SameTab.prototype._isTargetBlankTriggered = function (d) {
                            return d ? e.Storage.GetSessionStorage("InfSTATargetBlank") : e.Storage.GetLocalStorage("InfSTATargetBlank");
                        };
                        a.SameTab.prototype._resetTargetBlankTrigger = function (d) {
                            return d ? e.Storage.DeleteSessionStorage("InfSTATargetBlank") : e.Storage.DeleteLocalStorage("InfSTATargetBlank");
                        };
                        a.SameTab.prototype._getUrlToReOpen = function (d, f) {
                            if ("a" === d.tagName.toLowerCase()) {
                                if ("_blank" === d.getAttribute("target") && "true" !== this._isTargetBlankTriggered()) return this._targetBlankTriggered(), f;
                                var k = this._extractUrl(d);
                                this._resetTargetBlankTrigger();
                                return null == k ? this._topDoc.location.href : k;
                            }
                            return this._topDoc.location.href;
                        };
                        a.SameTab.prototype.show = function (d) {
                            if (!this.canShow(d)) throw "Attempt to show window that cannot be shown for current event";
                            d.preventDefault();
                            var f = this._topDoc.location.href;
                            e.TabHistoryRecorder(f, e.TabHistoryStorageName);
                            var k = "inftabwindow_" + this._getRandomName();
                            d = d.target || d.srcElement;
                            "a" !== d.tagName.toLowerCase() && (d = e.GetParentLink(d));
                            var m = this._getUrlToReOpen(d, f);
                            try {
                                var n = window.open(f, k);
                                n.history.replaceState({ previous: f }, null, f);
                                n.onpageshow = function (r) {
                                    r.persisted && n.location.reload();
                                };
                                n.addEventListener("popstate", function (r) {
                                    n.location = r.state.previous;
                                });
                                n.location = m;
                            } catch (r) {
                                n = window.open(m, k);
                            }
                            n.focus();
                            d.setAttribute("data-tabunder", !0);
                            this._successCallback && this._successCallback();
                            this._topWin.location.href = this._url;
                        };
                        a.SameTab.prototype.getCompatibleDisplayTargetingType = function () {
                            return e.Enums.PopUnderDisplayTargetingType.Tab;
                        };
                        a.SameTab.prototype.getTypeName = function () {
                            return "SameTab";
                        };
                        a.TabOver = function () {
                            a.PopWindow.call(this);
                        };
                        c(a.TabOver, a.PopWindow);
                        a.TabOver.prototype.setUrl = function (d) {
                            this._url = a.BasePopunder.buildUrl(d, a.Enums.SelectedPopType.TabOver);
                        };
                        a.TabOver.prototype.getRespectsSize = function () {
                            return !1;
                        };
                        a.TabOver.prototype.show = function () {
                            var d = this._topDoc.createElement("a");
                            d.setAttribute("data-tabunder", !0);
                            d.href = this._url;
                            d.target = "inftabwindow_" + this._getRandomName();
                            this._topDoc.body.appendChild(d);
                            this._successCallback && this._successCallback();
                            var f = this._topDoc.createEvent("MouseEvents");
                            f.initMouseEvent("click", !0, !0, this._topWin, 0, 0, 0, 0, 0, !0, !1, !1, !0, 0, null);
                            d.dispatchEvent(f);
                        };
                        a.TabOver.prototype.getCompatibleDisplayTargetingType = function () {
                            return e.Enums.PopUnderDisplayTargetingType.Tab;
                        };
                        a.TabOver.prototype.getTypeName = function () {
                            return "TabOver";
                        };
                        a.RandomEnumerator = function (d) {
                            this._elements = d.slice();
                        };
                        a.RandomEnumerator.prototype = {
                            popNext: function () {
                                if (0 !== this._elements.length) {
                                    var d = 1 === this._elements.length ? 0 : this._getRandomInt(0, this._elements.length),
                                        f = this._elements[d];
                                    this._elements.splice(d, 1);
                                    return f;
                                }
                            },
                            _getRandomInt: function (d, f) {
                                d = Math.ceil(d);
                                f = Math.floor(f);
                                return Math.floor(Math.random() * (f - d)) + d;
                            },
                        };
                        a.WinUtil = {
                            openWithContent: function (d, f, k) {
                                f = window.open("about:blank", f, k);
                                if (null == f) return null;
                                k = f.document;
                                k.open();
                                k.writeln(d);
                                k.close();
                                return f;
                            },
                        };
                    })(e);
                    e.Fingerprint = 123;
                    String.format ||
                        (String.format = function (a) {
                            var b = Array.prototype.slice.call(arguments, 1);
                            return a.replace(/{(\d+)}/g, function (c, g) {
                                return "undefined" != typeof b[g] ? b[g] : c;
                            });
                        });
                    e.Init();
                    void 0 === e._Top.g367CB268B1094004A3689751E7AC568F && ((e._Top.g367CB268B1094004A3689751E7AC568F = {}), (e._Top.g367CB268B1094004A3689751E7AC568F = e));
                    void 0 === e._Top.g367CB268B1094004A3689751E7AC568F.ExternalChromePop && (e._Top.g367CB268B1094004A3689751E7AC568F.ExternalChromePop = e.ExternalChromePop);
                    true && "function" == typeof rAb && (!false || e.IsAdblockRequest) && rAb();
                }
            })();
    });
})();
