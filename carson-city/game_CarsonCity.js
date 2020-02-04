(function () {
    function r(n, t, i) {
        var u = i.defaultValue;
        this.clone = function () {
            return new r(n, t, i)
        };
        this.getLen = function () {
            return t
        };
        this.init = function (n, t) {
            this.set(i.decode(n, t, this.getLen()))
        };
        this.get = function () {
            return u
        };
        this.set = function (n) {
            if (i == ChrCoder && n.length !== t) throw new Error("Argument >" + n + "< is not of length " + t);
            u = n
        };
        this.makeProperty = function (t) {
            if (n === undefined || n === null || n === "") throw new Error("Property without a name");
            var r = i === BooleanCoder ? "is" : "get";
            t[r + n] = this.get;
            t["set" + n] = this.set
        };
        this.toStatusString = function () {
            return i.encode(this.get(), this.getLen())
        }
    }

    function u(n, i, r) {
        var f = r.defaultValue, e = this;
        this.clone = function () {
            return new u(n, i, r)
        };
        this.getLen = function () {
            return i
        };
        this.init = function (n, t) {
            this.set(r.decode(n, t, this.getLen()))
        };
        this.get = function () {
            return f
        };
        this.set = function (n) {
            if (n != parseInt(n)) throw new Error(n + " is not a whole number");
            if (n >= Math.pow(t, i)) throw new Error("Number to big " + n + " needs more than " + i + " digits");
            if (n < 0) throw new Error("Number negative " + n + " needs to be greater or equal to zero");
            f = n
        };
        this.inc = function (n) {
            if (n != parseInt(n)) throw new Error(n + " is not a whole number");
            e.set(f + n)
        };
        this.makeProperty = function (t) {
            if (n === undefined || n === null || n === "") throw new Error("Property without a name");
            t["get" + n] = this.get;
            t["addTo" + n] = this.inc;
            t["set" + n] = this.set
        };
        this.toStatusString = function () {
            return r.encode(this.get(), this.getLen())
        }
    }

    function c(n) {
        this.get = function (t) {
            return t === undefined ? this : n[t].get()
        };
        this.set = function (t, i) {
            n[t].set(i)
        };
        this.forEach = function (t) {
            for (var i = 0, r = n[0]; i < n.length && t.call(r, r, i) !== !1; r = n[++i]) ;
            return this
        };
        this.find = function (t) {
            var i = this.indexOf(t);
            return i >= 0 ? n[i] : null
        };
        this.contains = function (n) {
            return this.indexOf(n) >= 0
        };
        this.indexOf = function (t, i) {
            var f, r, u;
            for (typeof t != "function" && (f = t, t = function () {
                return this.get() === f
            }), r = i !== undefined ? i : 0, u = n[0]; r < n.length; u = n[++r]) if (t.call(u, u, r) === !0) return r;
            return -1
        };
        this.shuffle = function () {
            for (var i, r, u = function (n) {
                return Math.floor(Math.random() * n)
            }, t = n.length - 1; t > 0; t--) i = u(t), i != t && (r = n[t], n[t] = n[i], n[i] = r)
        };
        this.length = n.length
    }

    function f(n, t, r) {
        var u, o, e;
        for (t.constructor === Array && (t = new i(t, "")), u = new Array(r), o = new c(u), e = 0; e < r; e++) u[e] = t.clone();
        this.getLen = function () {
            for (var t = 0, n = 0; n < r; n++) t += u[n].getLen();
            return t
        };
        this.init = function (n, t) {
            for (var r, i = 0; i < u.length; i++) r = u[i], r.init(n, t), t += r.getLen()
        };
        this.get = function (n) {
            return o.get(n)
        };
        this.set = function (n, t) {
            o.set(n, t)
        };
        this.makeProperty = function (t) {
            if (n === undefined || n === null || n === "") throw new Error("Property without a name");
            t["get" + n] = this.get;
            t["set" + n] = this.set
        };
        this.toStatusString = function () {
            for (var t = "", n = 0; n < r; n++) t += u[n].toStatusString();
            return t
        };
        this.clone = function () {
            return new f(n, t, r)
        }
    }

    function i(n, t) {
        for (var f, e = this, r = [], u = 0; u < n.length; u++) typeof n[u] != "undefined" && r.push(n[u].clone());
        for (f = 0; f < r.length; f++) r[f].makeProperty(this);
        this.clone = function () {
            return new i(r, t)
        };
        this.get = function () {
            return e
        };
        this.makeProperty = function (n) {
            if (t === undefined || t === null || t === "") throw new Error("Property without a name");
            n["get" + t] = this.get
        };
        this.init = function (n, t) {
            for (var u, i = 0; i < r.length; i++) u = r[i], u.init(n, t), t += u.getLen()
        };
        this.getLen = function () {
            for (var t = 0, n = 0; n < r.length; n++) t += r[n].getLen();
            return t
        };
        this.toStatusString = function () {
            for (var t = "", n = 0; n < r.length; n++) t += r[n].toStatusString();
            return t
        }
    }

    function e(n, t) {
        t.constructor === Array && (t = new i(t, ""));
        var r = [], u = new c(r);
        u.addElement = function (n) {
            var i = t.clone();
            return n == undefined ? r.push(i) : r.splice(n, 0, i), this.length = r.length, i
        };
        u.removeElement = function (n) {
            var t = r.splice(n, 1).pop();
            return this.length = r.length, t
        };
        this.getLen = function () {
            for (var t = 1, n = 0; n < r.length; n++) t += r[n].getLen();
            return t
        };
        this.init = function (n, i) {
            for (var h = s(n.status.substr(i++, 1)), f, e, o; r.length > h;) r.pop();
            for (f = 0; f < h; f++) r[f] = t.clone();
            for (e = 0; e < r.length; e++) o = r[e], o.init(n, i), i += o.getLen();
            u.length = r.length
        };
        this.get = function (n) {
            return u.get(n)
        };
        this.set = function (n, t) {
            u.set(n, t)
        };
        this.makeProperty = function (t) {
            t["get" + n] = this.get;
            t["set" + n] = this.set
        };
        this.toStatusString = function () {
            for (var t = o(r.length), n = 0; n < r.length; n++) t += r[n].toStatusString();
            return t
        };
        this.clone = function () {
            return new e(n, t)
        }
    }

    function l(n, t) {
        return n.length === 1 ? new r("", n[0], t) : new r(n[0], n[1], t)
    }

    function a(n, t) {
        for (var i = o(n); i.length < t;) i = y(0) + i;
        if (i.length > t) throw new Error("Number to big " + n + " needs more than " + t + " digits");
        return i
    }

    function o(n) {
        var i = "", r;
        do r = n % t, i = y(r) + i, n = Math.floor(n / t); while (n > 0);
        return i
    }

    function s(n) {
        for (var u, r = 0, i = 0; i < n.length; i++) u = n.substr(n.length - 1 - i, 1), r += v(u) * Math.pow(t, i);
        return r
    }

    function v(n, t) {
        return n.charCodeAt(t) - h
    }

    function y(n) {
        return String.fromCharCode(h + n)
    }

    function n(n, t) {
        for (var r = [], u = 2, i = arguments.length; u < i; u++) r.push(arguments[u]);
        return function () {
            var u, f = [];
            for (u = 0, i = r.length; u < i; u++) f.push(r[u]);
            for (u = 0, i = arguments.length; u < i; u++) f.push(arguments[u]);
            return n.apply(t, f)
        }
    }

    function p(t, i) {
        var f = t.length == 2 && typeof t[1] == "number", e = f ? t[1] : t.length, r, u;
        for (this.getLen = function () {
            return Math.ceil(e / 6)
        }, r = new Array(this.getLen()), u = 0; u < this.getLen(); u++) r[u] = i.defaultValue;
        this.bit_test = function (n, t) {
            return (r[n] >> t) % 2 != 0
        };
        this.bit_set = function (n, t) {
            arguments.length === 2 || arguments[2] ? r[n] |= 1 << t : this.bit_clear(n, t)
        };
        this.bit_clear = function (n, t) {
            r[n] &= ~(1 << t)
        };
        this.bit_toggle = function (n, t) {
            this.bit_test(n, t) ? this.bit_clear(n, t) : this.bit_set(n, t)
        };
        this.bitTest = function (n) {
            var t = Math.floor(n / 6), i = n % 6;
            return this.bit_test(t, i)
        };
        this.bitSet = function (n) {
            var t = Math.floor(n / 6), i = n % 6;
            arguments.length === 1 || arguments[1] ? r[t] |= 1 << i : this.bit_clear(t, i)
        };
        this.bitClear = function (n) {
            var t = Math.floor(n / 6), i = n % 6;
            this.bit_clear(t, i)
        };
        this.bitToggle = function (n) {
            var t = Math.floor(n / 6), i = n % 6;
            this.bit_toggle(t, i)
        };
        this.clone = function () {
            return new p(t, i)
        };
        this.set = function (n) {
            r = n
        };
        this.init = function (n, t) {
            for (var u = new Array(this.getLen()), r = 0; r < u.length; r++) u[r] = i.decode(n, t + r, 1);
            this.set(u)
        };
        this.get = function () {
            return r
        };
        this.makeProperty = function (i) {
            var r, u, e;
            if (t === undefined || t === null || t.length === 0) throw new Error("No property names given");
            if (f) i["set" + t[0]] = n(this.bitSet, this), i["unset" + t[0]] = n(this.bitClear, this), i["is" + t[0]] = n(this.bitTest, this), i["toggle" + t[0]] = n(this.bitToggle, this); else for (r = 0; r < t.length; r++) u = Math.floor(r / 6), e = r % 6, i["set" + t[r]] = n(this.bit_set, this, u, e), i["unset" + t[r]] = n(this.bit_clear, this, u, e), i["is" + t[r]] = n(this.bit_test, this, u, e), i["toggle" + t[r]] = n(this.bit_toggle, this, u, e)
        };
        this.toStatusString = function () {
            for (var t = "", n = 0; n < this.getLen(); n++) t += i.encode(r[n], 1);
            return t
        }
    }

    var h = 176, t = 80;
    ChrCoder = {
        defaultValue: " ", decode: function (n, t, i) {
            return n.status.substr(t, i)
        }, encode: function (n) {
            return n
        }
    };
    NumberCoder = {
        defaultValue: 0, decode: function (n, t, i) {
            return s(n.status.substr(t, i))
        }, encode: function (n, t) {
            return a(n, t)
        }
    };
    BooleanCoder = {
        defaultValue: !1, decode: function (n, t) {
            return n.status.substr(t, 1) === "1" ? !0 : !1
        }, encode: function (n) {
            return n ? "1" : "0"
        }
    };
    this.EncodeNumberFixed = a;
    this.EncodeNumber = o;
    this.DecodeNumber = s;
    this.bitmask = function () {
        return new p(arguments, NumberCoder)
    };
    this.chr = function () {
        return l(arguments, ChrCoder)
    };
    this.number = function () {
        return arguments.length === 1 ? new u("", arguments[0], NumberCoder) : new u(arguments[0], arguments[1], NumberCoder)
    };
    this.bool = function () {
        for (var t = new Array(arguments.length), n = 0; n < arguments.length; n++) t[n] = arguments[n];
        return t.push(1), l(t, BooleanCoder)
    };
    this.list = function () {
        return arguments.length === 1 ? new e("", arguments[0]) : arguments.length === 2 ? arguments[1].constructor === Number ? new f("", arguments[0], arguments[1]) : new e(arguments[0], arguments[1]) : new f(arguments[0], arguments[1], arguments[2])
    };
    this.section = function (n, t) {
        return new i(t, n)
    };
    this.Status = function (n, t) {
        var i, r, u;
        if (this.getStatusString = function () {
            for (var i, t = "", n = 0; n < this.def.length; n++) i = this.def[n], t += i.toStatusString();
            return t
        }, arguments.length === 1) for (this.def = arguments[0], i = 0; i < this.def.length; i++) r = this.def[i], r.clone(this, u), r.makeProperty(this); else for (this.status = n, this.def = t, u = 0, i = 0; i < this.def.length; i++) r = this.def[i], r.init(this, u), r.makeProperty(this), u += r.getLen()
    }
}).apply(yucataGame), function () {
    function bt() {
        return [yucataGame.list("Large", [yucataGame.list("List", yucataGame.number(1))])]
    }

    function vt(n) {
        for (var i = [], r = new yucataGame.Status(n, bt()), t = 0, u = r.getLarge().length;
             t < u; t++) r.getLarge(t).getList().forEach(function (n) {
            i.push(n.get())
        });
        return i
    }

    function kt(n) {
        for (var r = n.slice(0), t = new yucataGame.Status(bt()), i; r.length;) i = t.getLarge().length, (i === 0 || t.getLarge(i - 1).getList().length === 79) && (t.getLarge().addElement(), i++), t.getLarge(i - 1).getList().addElement().set(r.shift());
        return t.getStatusString()
    }

    function b(n, i, r) {
        this.isPrimary = !0;
        this.IsEnabled = function () {
            return t.isActive() && !f.isDone() && i()
        };
        this.DoAction = r;
        this.GetShortDescription = n;
        this.perform = function () {
            this.IsEnabled() && (this.isPrimary && (k.push(this), tt = []), this.DoPerform(), a.update())
        };
        this.DoPerform = function () {
            it = !0;
            this.DoAction()
        }
    }

    function dt() {
        k = [];
        tt = [];
        ut = [];
        rt = 0;
        it = !1;
        $(".removeOnUndo").remove()
    }

    function gt() {
        rt = 0;
        tt.push(k.pop());
        a.show();
        for (var n = 0; n < k.length; n++) k[n].DoPerform();
        a.update();
        ut = ut.slice(0, rt);
        $(".removeOnUndo").remove()
    }

    function ui() {
        var n = tt.pop();
        k.push(n);
        n.DoPerform();
        a.update()
    }

    function fi() {
        var n = $('<input id="redoBtn" class="button" type="button" value="' + u.s.redoButton + '" style="z-index: 5002; margin-left: 10px;padding-left: 25px;background-image:url(' + BaseImagePath + 'c/redo_red.png); background-repeat:no-repeat;background-position:5px" >');
        $("#divFooterButtons").append(n);
        this.UpdateView = function () {
            document.getElementById("redoBtn").disabled = tt.length === 0
        };
        this.onClick = function () {
            t.isActive() && tt.length > 0 && ui()
        };
        this.mouseOver = function () {
            t.isActive() && tt.length > 0 && u.info("redo")
        };
        this.mouseOut = function () {
            u.info()
        };
        n.hover(this.mouseOver, this.mouseOut).click(this.onClick)
    }

    function ei() {
        var n = $('<input id="undoBtn" class="button" type="button" value="' + u.s.undoButton + '" style="z-index: 5002; margin-left: 10px;padding-left: 25px;background-image:url(' + BaseImagePath + 'c/undo_red.png); background-repeat:no-repeat;background-position:5px" >');
        $("#divFooterButtons").append(n);
        this.UpdateView = function () {
            document.getElementById("undoBtn").disabled = !it
        };
        this.onClick = function () {
            t.isActive() && k.length > 0 && gt()
        };
        this.mouseOver = function () {
            t.isActive() && k.length > 0 && u.info("undo")
        };
        this.mouseOut = function () {
            u.info()
        };
        n.hover(this.mouseOver, this.mouseOut).click(this.onClick)
    }

    function nt(n) {
        a.handlers.push(this);
        var i = [];
        this.stayVisible = !1;
        this.opacity = [1, .75];
        this.addAction = function (n) {
            i.push(n)
        };
        this.GetAction = function () {
            var t, r;
            if (!$("#" + $(n).attr("id")).length) return null;
            for (t = 0; t < i.length; t++) if (r = i[t], r.IsEnabled()) return r;
            return null
        };
        this.onClick = function () {
            if (t.isActive() && !f.isDone()) {
                var n = this.handler.GetAction();
                n !== null && n.perform()
            }
        };
        this.UpdateView = function () {
            if ($("#" + $(n).attr("id")).length) {
                var t = this.GetAction();
                t !== null ? $(n).css({
                    visibility: "visible",
                    opacity: this.opacity[0]
                }) : this.stayVisible || $(n).css("visibility", "hidden")
            }
        };
        this.rollOverWithAction = function () {
            $(n).fadeTo(100, this.opacity[1])
        };
        this.noRollover = function () {
            $(n).fadeTo(100, this.opacity[0])
        };
        this.mouseOver = function () {
            var t = this.handler.GetAction();
            t !== null ? (u.info(t.GetShortDescription()), this.handler.rollOverWithAction(), n.style.cursor = "pointer") : n.style.cursor = "auto"
        };
        this.mouseOut = function () {
            this.handler.GetAction() !== null && (this.handler.noRollover(), u.info())
        };
        $(n).unbind();
        $(n).hover(this.mouseOver, this.mouseOut).click(this.onClick);
        n.handler = this
    }

    function et() {
        dt();
        OrigStatus = t.state.getStatusString();
        oi()
    }

    function oi() {
        t.isValid && (DBCurrentMove = kt(f.info), ServiceSetDBStatusSecure(GameInfo.ID, GameInfo.PlayerOnTurn, OrigStatus, t.lastSavedState, DBCurrentMove) ? t.lastSavedState = OrigStatus : (t.isValid = !1, alert(u.s.OutdatedStatusString)))
    }

    function si(n, t) {
        var u = [], i = [], r = 0;
        return n.forEach(function (n, i) {
            n == t && u.push(i)
        }), u.forEach(function (t) {
            i.push(n.slice(r, t));
            r = t + 1
        }), i.push(n.slice(r)), i
    }

    function st(n, t, i) {
        function u() {
            i.enabled(n) && (n.fadeTo(0, i.opacity[1]), n.css("cursor", "pointer"), i.mouseIn && i.mouseIn(n))
        }

        function r(t) {
            (t || i.enabled(n)) && (n.fadeTo(0, i.opacity[0]), n.css("cursor", "default"), i.mouseOut && i.mouseOut(n))
        }

        function f() {
            i.enabled(n) && (t(n), r(!0))
        }

        i.opacity = i.opacity || [1, .75];
        i.enabled = i.enabled || function () {
            return !0
        };
        n.click(f).hover(u, r).fadeTo(0, i.opacity[0])
    }

    function g() {
        $(".ui-icon").css("background-image", "url(" + GameImagePath + "ui-icons_brown_256x240.png)");
        $(".ui-widget-header").css("background-image", "url(" + GameImagePath + "ui-dialog.png)")
    }

    function ni(n) {
        return n.length ? n.substring(0, 1).toUpperCase() + n.substring(1) : ""
    }

    function ht(n) {
        return String(n).charCodeAt(0) - 48
    }

    function hi(n) {
        return String.fromCharCode(n + 48)
    }

    function ot(n) {
        for (var i = 0, t = 0; t < n.length; t++) i += n[t];
        return i
    }

    function l(n, t) {
        for (var i = 0; i < t.length; i++) if (t[i] == n) return !0;
        return !1
    }

    function ct(n) {
        return Math.floor(Math.random() * (n + 1))
    }

    function lt(n, t) {
        var f, u, i, r;
        for (t === undefined && (t = []), i = t.length, r = n.length; i < r; i++) t.push(1);
        for (f = ct(ot(t) - 1), u = 0, i = 0, r = n.length; i < r; i++) if (t[i] && (u += t[i], u > f)) return n[i]
    }

    function d() {
        return ct(5) + 1
    }

    function w(n, t) {
        for (var r = [], i = n; i <= t; i++) r.push(i);
        return r
    }

    function ti(n) {
        for (var t = []; n.length;) t.push(n.splice(ct(n.length - 1), 1));
        return t
    }

    function yt(n) {
        var t = [];
        return n.forEach(function (n) {
            t.push(n.get())
        }), t
    }

    function ci(n) {
        for (var t = n.length; t > 0; t--) n.removeElement(0)
    }

    function at(n, t) {
        var i = n.addElement();
        t.forEach(function (n) {
            i["set" + n[0]](n[1])
        })
    }

    function li(n) {
        pt = n.pageX;
        wt = n.pageY
    }

    function ai(n, t) {
        return n.addClass("click4help").mousemove(function (n) {
            Math.abs(n.pageX - pt) + Math.abs(n.pageY - wt) > 10 && $(".clickedHelp").remove()
        }).click(t), n
    }

    function vi(n) {
        return n.addClass("clickedHelp").click(function () {
            $(".clickedHelp").remove()
        }), n
    }

    function ii() {
        return
    }

    function ri() {
        IsHistory || (document.getElementById("divPostback").style.display = "", document.getElementsByName("MoveInfo")[0].setAttribute("value", kt(f.info)), document.getElementsByName("NewStatus")[0].setAttribute("value", t.state.getStatusString()), document.getElementsByName("lastSaveStatus")[0].setAttribute("value", t.lastSavedState), document.getElementById("frmGame").submit())
    }

    var t = {
        statusdef: [yucataGame.section("BasicData", [yucataGame.chr("Version", 1), yucataGame.chr("Phase", 1), yucataGame.number("NextPlayer", 1), yucataGame.number("TO", 2), yucataGame.list("Points", yucataGame.number(2), GameInfo.NumPlayers), yucataGame.list("Passed", yucataGame.number(1)), yucataGame.number("Round", 1), yucataGame.list("Buildings", yucataGame.number(1), 7), yucataGame.list("Roads", [yucataGame.list("Edge", yucataGame.number(1))], 4), yucataGame.list("TilesOnBoard", [yucataGame.number("Type", 1), yucataGame.number("Parcel", 1)]), yucataGame.list("CowboysOnBoard", [yucataGame.number("Player", 1), yucataGame.number("Action", 2)]), yucataGame.number("SheriffSetOn", 2), yucataGame.number("CurrentAction", 1), yucataGame.bitmask("Red", 12)]), yucataGame.list("PlayerData", [yucataGame.number("Color", 1), yucataGame.number("Cowboys", 1), yucataGame.number("Coins", 2), yucataGame.number("Guns", 1), yucataGame.number("Roads", 1), yucataGame.number("Character", 1), yucataGame.bitmask("PersonUsed", "Guns3", "SniperRefill", "Nepotism", "NephewUsed"), yucataGame.list("Buildings", yucataGame.number(1)), yucataGame.list("Properties", yucataGame.number(1)), yucataGame.list("DuelTiles", yucataGame.number(1))], GameInfo.NumPlayers), yucataGame.chr("StatusEndControlChar", 1)],
        RIVER: 7,
        MIGHTISRIGHT: 8,
        NEWBEGINNING: 9,
        colors: ["#a5afb2", "#e9642a", "#766fab", "#e3d735", "#3cab35", "#996142"],
        state: "",
        isValid: !0,
        savingState: "",
        lastSavedState: OrigStatus,
        PHASE: {
            INIT: "I",
            SIDEPERSON: "T",
            NEWBEGINNING: "W",
            START1: "1",
            START2: "2",
            START3: "3",
            START4: "4",
            PERSON: "P",
            NEPOTISM: "O",
            PLACE: "L",
            ACTIONS: "A",
            DUELSEQUENCE: "S",
            DUEL: "D",
            ASKHOUSE: "H",
            ASKEDHOUSE: "U",
            CASHLIMIT: "C",
            ROUNDEND: "X",
            REDBANKER: "B",
            NEWROUND: "N",
            BUILDROADS: "F",
            BUILDROADSEND: "f",
            ENDSCORE: "R",
            END: "E",
            GIVENUP: "G"
        },
        init: function () {
            $("#game").empty();
            u.init();
            f.init();
            IsHistory ? f.setHistory() : t.getState();
            it = !1;
            $("#game").append($("<div/>", {id: "board"})).append($("<div/>", {id: "playerInfoDiv"}));
            this.board = $("#board");
            e.init();
            c.init();
            o.init();
            this.isActive() && (t.state.getPlayerData(UserIndex).getColor() == 0 ? (t.phase() == t.PHASE.INIT && t.setup(), t.chooseColor()) : (f.info = vt(DBCurrentMove), f.state = f.info.length ? f.STATE.RESTORE : f.STATE.START))
        },
        getState: function () {
            this.state = new yucataGame.Status(OrigStatus, this.statusdef)
        },
        setTestStateAndHistory: function () {
            f.info = [];
            HistoryMove = [];
            HistoryStatus = [];
            OrigStatus = "0P°°±°¹°¶°³¹¹¶³¶¶µ´ÛÚãâ²Ûã°°Â²Û±Ö±Á±Â±Ù±ã±¾¹Ú³Ì¹º³æ³¼´ä²Ü·ë²ì¶ê²â°°°°³»²·°Î³°»°°·ÜºæÄäêë³²²µµº°É¶²¶¸°³ÚÌ¼³±³µ@";
            this.state = new yucataGame.Status(OrigStatus, this.statusdef);
            et()
        },
        phase: function (n) {
            return n === undefined ? this.state.getBasicData().getPhase() : this.state.getBasicData().setPhase(n)
        },
        isActive: function () {
            return IsActive === "True"
        },
        chooseColor: function () {
            var i, n;
            for ($("#gameContainer").css("display", "none"), $("#colorChooser").remove(), $(".dialogNewBeginning").remove(), f.state = f.STATE.COLOR, i = $("<div/>", {id: "colorChooser"}), i.append($("<div/>", {id: "colorChooserBody"})).append($("<div/>", {id: "colorChooserTitle"}).html(u.s.chooseYourColor)), $("#gameWindow").append(i), n = 1; n < t.colors.length; n++) $("#colorChooserBody").append($("<div/>", {
                id: "colorDiv" + n,
                "class": "markerdiv"
            }).append($("<img/>", {
                "class": "marker",
                src: GameImagePath + "marker" + n + ".gif"
            })).append($("<img/>", {
                "class": "symbol",
                src: GameImagePath + "sym" + n + ".png"
            }))), $("#colorDiv" + n).css({cursor: "pointer"}).bind("click", {colorIndex: n}, function (n) {
                new b(function () {
                    return ""
                }, function () {
                    return !0
                }, function () {
                    t.state.getPlayerData(OnTurnIndex).setColor(n.data.colorIndex);
                    $("#colorChooser").remove();
                    f.state = f.STATE.START;
                    $("#gameContainer").css("display", "block");
                    a.setup()
                }).perform()
            })
        },
        setup: function () {
            var n = t.state.getBasicData().getPoints(0), i;
            t.setupPersonalities(Math.floor(n / 8));
            n % 2 > 0 && t.state.getBasicData().setRed(t.NEWBEGINNING);
            n % 8 > 3 && t.state.getBasicData().setRed(t.RIVER);
            e.perform("setup");
            n % 4 > 1 && (t.state.getBasicData().setRed(t.MIGHTISRIGHT), c.setup());
            t.state.getBasicData().setRound(1);
            o.setup();
            e.ALL.forEach(function (n) {
                t.state.getPlayerData(n).setCharacter(s.NONE)
            });
            i = ti(e.ALL.filter(function (n) {
                return n != OnTurnIndex
            }));
            i.unshift(OnTurnIndex);
            v.setTO(i);
            t.phase() === t.PHASE.INIT && t.start();
            et()
        },
        start: function () {
            t.isNewBeginning() ? t.phase(t.PHASE.NEWBEGINNING) : (t.state.getBasicData().setNextPlayer(v.getTO()[0]), t.phase(t.PHASE.START1))
        },
        isMightIsRight: function () {
            return t.state.getBasicData().isRed(t.MIGHTISRIGHT)
        },
        isRiver: function () {
            return t.state.getBasicData().isRed(t.RIVER)
        },
        isNewBeginning: function () {
            return t.state.getBasicData().isRed(t.NEWBEGINNING)
        },
        setupPersonalities: function (n) {
            switch (n) {
                case 1:
                    s.ALL.forEach(function (n) {
                        t.state.getBasicData().setRed(n, !0)
                    });
                    break;
                case 2:
                    t.phase(t.PHASE.SIDEPERSON);
                    break;
                case 3:
                    s.ALL.forEach(function (n) {
                        t.state.getBasicData().setRed(n, d() % 2)
                    })
            }
        },
        hasEnded: function () {
            return l(this.phase(), [this.PHASE.END, this.PHASE.GIVENUP])
        },
        doMoveEnd: function () {
            this.checkPhaseEnd() ? this.doPhaseEnd() : this.getNextPlayer();
            this.checkMoveEnd();
            f.state == f.STATE.START && a.enableGameControllers()
        },
        getNextPlayer: function (n) {
            var u, i;
            switch (t.phase()) {
                case t.PHASE.START1:
                case t.PHASE.START2:
                case t.PHASE.START3:
                case t.PHASE.START4:
                    i = n !== undefined;
                    do i || (n = v.getNextPlayer(n, (t.phase() * 1 + 1) % 2)), i = !1; while (!e.get(n).propLeft2set());
                    t.state.getBasicData().setNextPlayer(n);
                    return;
                case t.PHASE.PERSON:
                    t.state.getBasicData().setNextPlayer(v.getNextPlayer());
                    return;
                case t.PHASE.NEPOTISM:
                    t.state.getBasicData().setNextPlayer(e.getList4nepotism()[0]);
                    return;
                case t.PHASE.PLACE:
                    do if (n = v.getNextPlayerNotPassed(n), e.get(n).getCowboys() == 0 && (t.state.getBasicData().getPassed().addElement().set(n), f.add2Move([r.AUTOPASS, n]), a.showPassed(), t.allPassed())) {
                        t.doPhaseEnd();
                        return
                    } while (t.state.getBasicData().getPassed().contains(n));
                    $("#handler0").addClass("pos" + t.state.getBasicData().getPassed().length);
                    t.state.getBasicData().setNextPlayer(n);
                    return;
                case t.PHASE.CASHLIMIT:
                case t.PHASE.ACTIONS:
                    return;
                case t.PHASE.BUILDROADS:
                    u = n;
                    i = n !== undefined;
                    do i || v.isLastPlayer(n) || (n = v.getNextPlayer(n)), i = !1; while (!t.state.getPlayerData(n).getRoads() && !v.isLastPlayer(n));
                    !t.state.getPlayerData(n).getRoads() || v.isLastPlayer(n) && u === n ? t.doPhaseEnd() : t.state.getBasicData().setNextPlayer(n);
                    return
            }
        },
        getNextPlayerOnline: function (n, i) {
            (t.state.getBasicData().setNextPlayer(n[0]), i) || (f.state = f.STATE.END, a.update())
        },
        checkMoveEnd: function () {
            f.state === f.STATE.END && (f.state = t.state.getBasicData().getNextPlayer() == OnTurnIndex ? f.STATE.START : f.STATE.FORCEEND);
            f.state === f.STATE.FORCEEND && (f.state = f.STATE.DONE)
        },
        checkPhaseEnd: function () {
            switch (t.phase()) {
                case t.PHASE.START1:
                case t.PHASE.START2:
                case t.PHASE.START3:
                case t.PHASE.START4:
                    return !e.propLeft2set();
                case t.PHASE.BUILDROADS:
                case t.PHASE.PERSON:
                    return v.isLastPlayer();
                case t.PHASE.NEPOTISM:
                    return !e.getList4nepotism().length;
                case t.PHASE.PLACE:
                    return t.allPassed();
                case t.PHASE.NEWROUND:
                    return !0
            }
            return !1
        },
        doPhaseEnd: function () {
            var n, i;
            switch (t.phase()) {
                case t.PHASE.START1:
                case t.PHASE.START2:
                case t.PHASE.START3:
                    do t.phase(t.phase() * 1 + 1 + ""); while (t.checkPhaseEnd() && t.phase() * 1 < 4);
                    t.checkPhaseEnd() ? t.doPhaseEnd() : (f.changePhase(), t.getNextPlayer(v.getTO()[t.phase() % 2 ? 0 : GameInfo.NumPlayers - 1]));
                    return;
                case t.PHASE.START4:
                    t.phase(t.PHASE.PERSON);
                    f.changePhase();
                    t.state.getBasicData().setNextPlayer(v.getTO()[0]);
                    return;
                case t.PHASE.PERSON:
                    if (n = e.getList4nepotism(), n.length) {
                        t.phase(t.PHASE.NEPOTISM);
                        f.changePhase();
                        t.state.getBasicData().setNextPlayer(n[0]);
                        return
                    }
                case t.PHASE.NEPOTISM:
                    t.phase(t.PHASE.PLACE);
                    f.changePhase();
                    i = [];
                    s.ALL.forEach(function (n) {
                        i.push(e.getPlayerWithPerson4TO(n))
                    });
                    v.setTO(i.filter(function (n) {
                        return n !== undefined
                    }));
                    a.showTO();
                    t.state.getBasicData().setNextPlayer(v.getTO()[0]);
                    return;
                case t.PHASE.PLACE:
                    $(".handler").remove();
                    t.phase(t.PHASE.ACTIONS);
                    f.changePhase();
                    t.state.getBasicData().setCurrentAction(1);
                    r.runThroughActions();
                    return;
                case t.PHASE.ACTIONS:
                    t.state.getBasicData().setCurrentAction(0);
                    t.phase(t.PHASE.ROUNDEND);
                    f.changePhase();
                    t.roundEnd();
                    return;
                case t.PHASE.REDBANKER:
                    t.phase(t.PHASE.CASHLIMIT);
                    f.changePhase();
                    a.update();
                    return;
                case t.PHASE.ROUNDEND:
                    t.phase(t.PHASE.CASHLIMIT);
                    f.changePhase();
                    return;
                case t.PHASE.CASHLIMIT:
                    t.state.getBasicData().getRound() === 4 ? t.isRiver() ? (t.phase(t.PHASE.BUILDROADS), f.changePhase(), t.getNextPlayer(v.getTO()[0]), t.state.getBasicData().getNextPlayer() == OnTurnIndex && t.state.getPlayerData(OnTurnIndex).getRoads() ? a.enableGameControllers() : (u.s.handleBuildRoads = u.s.finishMove, f.state = f.STATE.DONE)) : (t.phase(t.PHASE.ENDSCORE), f.changePhase(), this.doPhaseEnd()) : (t.phase(t.PHASE.NEWROUND), f.changePhase(), t.state.getBasicData().setNextPlayer(t.state.getBasicData().getPassed(0)), f.state = f.STATE.FORCEEND, a.showButtons());
                    return;
                case t.PHASE.BUILDROADS:
                    t.phase(t.PHASE.BUILDROADSEND);
                    return;
                case t.PHASE.BUILDROADSEND:
                    t.phase(t.PHASE.ENDSCORE);
                    f.changePhase();
                case t.PHASE.ENDSCORE:
                    e.perform("doEndScoring");
                    f.state = f.STATE.FORCEEND;
                    a.update();
                    t.phase(t.PHASE.END);
                    return
            }
        },
        allPassed: function () {
            return t.state.getBasicData().getPassed().length == GameInfo.NumPlayers
        },
        roundEnd: function () {
            var i, n;
            if (t.state.getBasicData().isRed(s.GROCER) && (n = e.getPlayerWithPerson(s.GROCER), n === undefined || s.isUsed(n, s.GROCER) || (i = e.get(n).cntBuildings(o.HOUSE), s.setUsed(n, t.state.getPlayerData(n).getCharacter() != s.GROCER), e.get(n).addPts(i), f.add2Move([r.ACTIONPERSON, s.GROCER, n, i]))), t.state.getBasicData().isRed(s.SETTLER) && (n = e.getPlayerWithPerson(s.SETTLER), n === undefined || s.isUsed(n, s.SETTLER) || (i = e.get(n).cntBuildings(o.MOUNTAIN), s.setUsed(n, t.state.getPlayerData(n).getCharacter() != s.SETTLER), e.get(n).addPts(i), f.add2Move([r.ACTIONPERSON, s.SETTLER, n, i]))), t.state.getBasicData().isRed(s.BANKER) && (n = e.getPlayerWithPerson(s.BANKER), n !== undefined)) {
                n !== OnTurnIndex && r.requestNextPlayer(n);
                t.phase(t.PHASE.REDBANKER);
                return
            }
            t.doPhaseEnd()
        },
        newRound: function () {
            t.state.getBasicData().addToRound(1);
            v.setTO(yt(t.state.getBasicData().getPassed()));
            t.state.getBasicData().setSheriffSetOn(0);
            $(".personalities .isused").remove();
            e.perform("newRound");
            o.refillBuildings();
            a.showRound();
            a.showPassed();
            t.phase(t.PHASE.PERSON);
            f.changePhase();
            et();
            a.enableGameControllers()
        },
        handleNewBeginning: function () {
            function e() {
                $(".dialogNewBeginning .checked").remove();
                var r = 0;
                w(1, 9).forEach(function (t) {
                    content.append($("<img/>", {
                        "class": "checked check line" + t + " row" + n[t],
                        src: GameImagePath + "allowed.png"
                    }));
                    $("#nb" + t + "6").html("$" + i[t][n[t]]);
                    r += i[t][n[t]]
                });
                $("#nbtotal").html(r);
                $("#nbleft").html(50 - r);
                $("#nbleft")[(r > 50 ? "add" : "remove") + "Class"]("alert");
                f.state = r <= 50 ? f.STATE.DONE : f.STATE.START;
                f.state === f.STATE.DONE && (f.info = [], f.add2Move([ht(t.phase()), OnTurnIndex, r - i[9][1], n[1] - 1, n[2] - 1, n[3] - 1, n[4] - 1, n[5] - 1, n[6], n[7], n[8], i[9][1]]));
                a.showButtons()
            }

            var n = [0, 3, 2, 2, 3, 1, 0, 0, 0, 0],
                i = [0, [0, 0, 5, 11, 18, 26], [0, 0, 6, 13, 21, 30], [0, 0, 4, 6, 8, 10], [0, 0, 7, 14, 21, 28], [0, 0, -20, -10, 10, 20], [0, 10], [0, 10], [0, 10], [0, 0]],
                r;
            $(".dialogNewBeginning").remove();
            r = $("<div/>", {"class": "dialog dialogNewBeginning", title: u.s.newBeginningTitle});
            content = $("<div/>", {"class": "content"}).appendTo(r);
            content.append($("<img/>", {src: GameImagePath + u.s.newBeginningPic}));
            w(1, 9).forEach(function (t) {
                (t > 5 ? [1, 6] : w(1, 6)).forEach(function (r) {
                    if (t == 9 && r == 6) content.append($('<input type="number" disabled="disabled" id="nb96", class="check line9 row6">').change(function () {
                        i[9][1] = $(this).val() * 1;
                        e()
                    })); else {
                        var f = $("<div/>", {
                            line: t,
                            row: r,
                            id: "nb" + t + r,
                            "class": "check line" + t + " row" + r
                        }).appendTo(content);
                        r < 6 && st(f, function (t) {
                            var r = t.attr("line");
                            n[r] = r > 5 ? n[r] ? 0 : 1 : t.attr("row") * 1;
                            r == 9 && (n[r] ? ($("#nb96").removeAttr("disabled"), i[9][1] = $("#nb96").val() * 1) : ($("#nb96").attr("disabled", "disabled"), i[9][1] = 0));
                            e()
                        }, {
                            enabled: function (t) {
                                return t.attr("line") > 5 || n[t.attr("line")] != t.attr("row")
                            }, opacity: [0, .75], mouseIn: function (n) {
                                switch (n.attr("line") * 1) {
                                    case 1:
                                        u.info("newBeginningLine1", [n.attr("row") - 1, n.attr("row")]);
                                        break;
                                    case 5:
                                        u.info("newBeginningLine5", [[0, -10, -5, 5, 10][n.attr("row") - 1]]);
                                        break;
                                    case 6:
                                    case 7:
                                    case 8:
                                        u.info(["influence", "nepotism", "sniper"][n.attr("line") - 6]);
                                        break;
                                    default:
                                        u.info("newBeginningLine" + n.attr("line"), [n.attr("row") - 1])
                                }
                            }, mouseOut: function () {
                                u.info()
                            }
                        })
                    }
                })
            });
            content.append($("<div/>", {id: "nbtotal", "class": "check total row6"}));
            content.append($("<div/>", {id: "nbleft", "class": "check left row6"}));
            r.dialog({
                autoOpen: !1,
                modal: !1,
                resizable: !1,
                dialogClass: "noX-Icon",
                closeOnEscape: !1,
                height: ft.size.h * .8,
                width: ft.size.w * .6,
                position: {my: "center", at: "center", of: $("#game"), collision: "fit"},
                open: function () {
                    g()
                }
            });
            r.dialog("open").dialog("widget").position({my: "center", at: "center", of: $("#game"), collision: "fit"});
            e()
        },
        nextNewBeginning: function () {
            var i = [], r, n;
            e.data.forEach(function (n, t) {
                n.newBeginning && n.newBeginning.length || i.push(t)
            });
            i.length ? t.getNextPlayerOnline(i, !0) : (maxBid = 0, maxBidList = [], e.data.forEach(function (n, i) {
                var r = t.state.getPlayerData(i);
                r.addToCoins(-n.newBeginning[0]);
                r.addToCowboys(n.newBeginning[1]);
                r.addToGuns(n.newBeginning[2]);
                r.addToRoads(n.newBeginning[3]);
                n.addPts(n.newBeginning[5]);
                n.newBeginning[9] > maxBid ? (maxBid = n.newBeginning[9], maxBidList = [i]) : n.newBeginning[9] == maxBid && maxBidList.push(i)
            }), maxBidList.length > 1 && (maxBidList[0] = maxBidList[ct(maxBidList.length - 1)]), t.state.getPlayerData(maxBidList[0]).addToCoins(-maxBid), r = ti(e.ALL.filter(function (n) {
                return n != maxBidList[0]
            })), r.unshift(maxBidList[0]), v.setTO(r), n = !1, v.getTO().forEach(function (i) {
                !n && e.get(i).newBeginning[4] > 0 && (t.state.getBasicData().setNextPlayer(i), n = !0)
            }), f.add2Move([maxBidList[0]]), n ? t.phase(t.PHASE.START1) : (t.phase(t.PHASE.PERSON), t.state.getBasicData().setNextPlayer(v.getTO()[0])))
        },
        handleChooseSide: function () {
            function e(n) {
                return n ? s.RED : s.YELLOW
            }

            function r() {
                var n = i.slice(0);
                n.unshift(OnTurnIndex);
                f.info = [ht(t.phase())];
                f.add2Move(n)
            }

            $(".dialogChooseSides").remove();
            var n = $("<div/>", {
                "class": "dialog chooseSides highlight",
                title: u.s.chooseSidePersonTitle
            }).dialog({
                autoOpen: !0,
                modal: !1,
                resizable: !0,
                dialogClass: "noX-Icon",
                closeOnEscape: !1,
                height: ft.size.h * .45,
                width: ft.size.w * .6,
                position: {my: "center", at: "center", of: $("#game"), collision: "fit"},
                open: function () {
                    g()
                }
            }), i = [];
            [!1, !0].forEach(function (t) {
                s.ALL.forEach(function (f) {
                    t ? f || n.append($("<br/>")) : i.push(0);
                    var o = $("<img/>", {
                        person: f,
                        isRed: t * 1,
                        "class": "person person" + f + (t ? "" : " checked"),
                        src: s.getImg(f, t)
                    }).appendTo(n);
                    st(o, function (t) {
                        var u = t.attr("person");
                        n.find(".person" + u).removeClass("checked");
                        t.addClass("checked");
                        i[u] = t.attr("isRed") * 1;
                        r()
                    }, {
                        mouseIn: function (n) {
                            u.info(u.s["personinfo" + n.attr("person") + e(n.attr("isRed") * 1)] + " " + u.s["side" + n.attr("isRed") * 1])
                        }, mouseOut: function () {
                            u.info()
                        }
                    })
                })
            });
            r();
            f.state = f.STATE.DONE
        },
        nextChooseSide: function () {
            var i = e.ALL.filter(function (n) {
                return f.setSidePerson[n] === undefined
            }), n;
            i.length ? t.getNextPlayerOnline(i, !0) : (n = [], s.ALL.forEach(function (i) {
                var u = 0, r;
                e.ALL.forEach(function (n) {
                    u += f.setSidePerson[n][i]
                });
                u /= GameInfo.NumPlayers;
                u == .5 ? (r = d(), n.push(2, r), t.state.getBasicData().setRed(i, r % 2 ? !0 : !1)) : (r = Math.round(u), n.push(r), t.state.getBasicData().setRed(i, r ? !0 : !1))
            }), f.add2Move(n), t.phase(t.isNewBeginning() ? t.PHASE.NEWBEGINNING : t.PHASE.START1), t.phase() === t.PHASE.START1 ? t.start() : t.state.getBasicData().setNextPlayer(OnTurnIndex))
        },
        handleSetProperty: function () {
            $(".handler").remove();
            for (var n = 0; n < 64; n++) l(n, o.RIVER) || e.hasProperty(n) || (t.board.append($("<div/>", {
                id: "handler" + n,
                "class": "handler parcel pos" + n
            })), function (n) {
                var t = document.getElementById("handler" + n);
                new nt(t);
                t.handler.opacity = [0, .75];
                t.handler.addAction(new b(function () {
                    return u.s.setProperty
                }, function () {
                    return !0
                }, function () {
                    $(".handler").remove();
                    o.setProperty(n);
                    f.add2Move([r.SETPROPERTY, n]);
                    f.state = f.STATE.END
                }))
            }(n))
        },
        handleChoosePerson: function (n) {
            var i = t.phase();
            $(".handler").remove();
            n && (t.state.getPlayerData(OnTurnIndex).unsetNepotism(), t.handler2forfeit(function () {
                f.add2Move([r.CHOOSEPERSON, s.NONE + 20, 0]);
                f.state = f.STATE.END
            }));
            s.ALL.forEach(function (o) {
                s.isChosen(o) || ($(".personalities").append($("<div/>", {
                    id: "handler" + o,
                    "class": "handler person pos" + o
                })), function (o) {
                    function h(i) {
                        if (f.state = f.STATE.START, !n && i && !t.state.getPlayerData(OnTurnIndex).isNephewUsed()) {
                            if (t.state.getBasicData().getRound() < 4 && !(v.isLastPlayer() && !e.getList4nepotism().length)) {
                                f.state = f.STATE.ASKUSENEPOTISM;
                                p.yesNo(u.s.nepotism, $("<div/>", {html: u.s.useNepotism}), [function () {
                                    t.state.getPlayerData(OnTurnIndex).setNepotism()
                                }], function () {
                                    h()
                                });
                                return
                            }
                            t.state.getPlayerData(OnTurnIndex).setNepotism()
                        }
                        n || t.state.getPlayerData(OnTurnIndex).setCharacter(o);
                        f.add2Move([r.CHOOSEPERSON, o + (n ? 20 : 0), t.state.getBasicData().isRed(o) * 1]);
                        s.perform(o, undefined, n) && (f.state = f.STATE.END);
                        e.onTurn.showCharacter()
                    }

                    var c = document.getElementById("handler" + o);
                    new nt(c);
                    c.handler.opacity = [0, .25];
                    c.handler.addAction(new b(function () {
                        return u.s["personinfo" + o + s.getSide(o)]
                    }, function () {
                        return !0
                    }, function () {
                        $(".handler").remove();
                        t.phase() !== i && (t.phase(i), f.changePhase());
                        e.onTurn.isInfluence() && !n ? p.options(u.s.influence + ": " + u.s["person" + o], {
                            html: $("<div/>", {html: u.s.chooseSideInfluence}),
                            onOpen: function (n) {
                                n.addClass("highlight").dialog("option", "width", "300");
                                [0, 1].forEach(function (i) {
                                    div = $("<img/>", {
                                        name: "options",
                                        value: i,
                                        "class": "person chooseside" + (i == t.state.getBasicData().isRed(o) ? " checked" : ""),
                                        src: s.getImg(o, i)
                                    }).appendTo(n);
                                    st(div, function (n) {
                                        $("img").removeClass("checked");
                                        n.addClass("checked")
                                    }, {
                                        mouseIn: function (n) {
                                            u.info(u.s["personinfo" + o + (n.attr("value") ? "Red" : "Yellow")] + " " + u.s["side" + n.attr("value") * 1])
                                        }, mouseOut: function () {
                                            u.info()
                                        }
                                    })
                                })
                            },
                            perform: function (n) {
                                (n && !t.state.getBasicData().isRed(o) || !n && t.state.getBasicData().isRed(o)) && (t.state.getBasicData().toggleRed(o), s.appendImages2Info(), f.add2Move([r.INFLUENCE, o]));
                                h(e.onTurn.isNepotism())
                            }
                        }) : h(e.onTurn.isNepotism())
                    }))
                }(o))
            })
        },
        handlePlace: function () {
            $(".handler").remove();
            for (var n = 0; n <= r.END + 64; n++) n > r.END + 1 && l(n - r.END - 1, o.RIVER) || r.actionIsGeneral(n) || (t.board.append($("<div/>", {
                id: "handler" + n,
                "class": "handler " + (n <= r.END ? n ? "action" : "pass" : "parcel") + " pos" + (n ? n > r.END ? n - r.END - 1 : n : t.state.getBasicData().getPassed().length)
            })), function (n) {
                function h() {
                    at(t.state.getBasicData().getCowboysOnBoard(), [["Player", OnTurnIndex], ["Action", n]]);
                    t.state.getPlayerData(OnTurnIndex).addToCowboys(-1);
                    v()
                }

                function c() {
                    t.state.getBasicData().setSheriffSetOn(n);
                    s.setUsed(OnTurnIndex, t.state.getPlayerData(OnTurnIndex).getCharacter() != s.SHERIFF);
                    v()
                }

                function v() {
                    if (e.showCowboys(), n <= r.END) f.add2Move([n, (t.state.getBasicData().getSheriffSetOn() == n) * 1]); else {
                        var i = n - r.END - 1, u = (t.state.getBasicData().getSheriffSetOn() == n) * 1;
                        e.hasProperty(i) && (u += e.onTurn.hasProperty(i) ? 2 : 4);
                        f.add2Move([r.SETONPARCEL, i, u])
                    }
                }

                var i = document.getElementById("handler" + n);
                new nt(i);
                i.handler.opacity = [0, .75];
                i.handler.addAction(new b(function () {
                    return n ? n <= r.END ? n > r.end() ? !1 : n >= r.BUILDING1 && n <= r.BUILDING7 ? u.get("actionbuilding", [u.s["building" + t.state.getBasicData().getBuildings(n - r.BUILDING1)], o.getCost4Building(n - r.BUILDING1)]) : u.s["action" + n] : e.hasProperty(n - r.END - 1) ? e.onTurn.hasProperty(n - r.END - 1) ? u.s.defendBuilding : u.s.attackBuilding : u.get("action" + r.BUYPARCEL, [o.getCost4property(n - r.END - 1)]) : u.s.pass
                }, function () {
                    return l(n, [r.PASS, r.INCOME, r.ROAD]) ? !0 : n === t.state.getBasicData().getSheriffSetOn() ? !1 : e.onTurn.hasCowboyOnBoard(n) ? !1 : e.onTurn.isSheriffAvailable() && e.onTurn.getCowboys() == 1 && r.getCowboys4action(n).length > 0 ? !1 : e.onTurn.hasSheriff(!0) && r.getCowboys4action(n).length > 0 ? !1 : n <= r.END ? n <= r.end() : e.hasProperty(n - r.END - 1) ? o.hasIncome(o.getBuildingOnParcel(n - r.END - 1)) ? e.onTurn.hasSheriff(!0) && !t.state.getPlayerData(OnTurnIndex).getProperties().contains(n - r.END - 1) ? !1 : o.getNeighboringBuildings(n - r.END - 1, o.CHURCH, e.getOwner(n - r.END - 1)) > 0 ? !1 : !0 : !1 : !0
                }, function () {
                    $(".handler").remove();
                    n ? e.onTurn.isSheriffAvailable() && e.onTurn.getCowboys() > 1 && r.getCowboys4action(n).length == 0 ? p.yesNo(u.get("actionPersonality", [u.s["person" + s.SHERIFF]]), $("<div/>", {html: u.s.useSheriff}), [c, h], function () {
                        f.state = f.STATE.END;
                        a.update()
                    }) : (e.onTurn.isSheriffAvailable() && e.onTurn.getCowboys() == 1 ? c() : h(), f.state = f.STATE.END) : (t.state.getBasicData().getPassed().addElement().set(OnTurnIndex), a.showPassed(), f.state = f.STATE.END, f.add2Move([r.PASS]))
                }))
            }(n))
        },
        handler2forfeit: function (n) {
            $("#playerOverview").append($("<img/>", {
                id: "handlerforfeit",
                "class": "handler forfeit",
                src: GameImagePath + "discard.png"
            }));
            var t = document.getElementById("handlerforfeit");
            new nt(t);
            t.handler.opacity = [1, .75];
            t.handler.addAction(new b(function () {
                return u.s.forfeitAction
            }, function () {
                return !0
            }, function () {
                $(".handler").remove();
                n()
            }))
        },
        handleBuild: function (n, i, s, h) {
            function w() {
                t.handler2forfeit(function () {
                    e.onTurn.returnCowboy(i, !0);
                    f.add2Move([i, r.FORFEIT, n]);
                    y()
                })
            }

            function k() {
                $("#playerOverview").append($("<img/>", {
                    id: "handlerToStock",
                    "class": "handler toStock",
                    src: GameImagePath + "building.jpg"
                }));
                var e = document.getElementById("handlerToStock");
                new nt(e);
                e.handler.opacity = [1, .75];
                e.handler.addAction(new b(function () {
                    return u.s.buildingToStock
                }, function () {
                    return !0
                }, function () {
                    p();
                    f.add2Move([i, r.TOSTOCK, n]);
                    t.state.getPlayerData(OnTurnIndex).getBuildings().addElement().set(n);
                    y()
                }))
            }

            function d() {
                $(".foreign").remove();
                e.ALL.forEach(function (i) {
                    if (i != OnTurnIndex) {
                        var r = f.asked4house[i] === undefined;
                        t.state.getPlayerData(i).getProperties().forEach(function (u) {
                            var e = u.get();
                            o.hasBuilding(e, o.ANY) || (r ? n !== o.HOUSE && t.board.append($("<img/>", {
                                owner: i,
                                "class": "foreign ask parcel pos" + e,
                                src: GameImagePath + "question.png"
                            })) : l(e, f.asked4house[i]) ? t.board.append($("<img/>", {
                                owner: i,
                                "class": "foreign allowed parcel pos" + e,
                                src: GameImagePath + "allowed.png"
                            })) : t.board.append($("<img/>", {
                                owner: i,
                                "class": "foreign forbidden parcel pos" + e,
                                src: GameImagePath + "discard.png"
                            })))
                        })
                    }
                })
            }

            function g(t) {
                if (done || n !== o.HOUSE && !$(".parcel.ownparcel").length) return !1;
                var i = !1;
                return l(n, [o.RANCH, o.MINE]) ? i = !0 : n == o.HOUSE ? o.isConnected(t) && (i = $(".parcel.allowed.pos" + t).length || l(e.getOwner(t), [undefined, OnTurnIndex])) : i = $(".parcel.ask.pos" + t).length || $(".parcel.ownparcel.pos" + t).length && o.isConnected(t), i ? $("#handler" + t).removeClass("invisible") : $("#handler" + t).addClass("invisible"), t == 63 && $(".handler").length == $(".handler.invisible").length && (alert(u.get("noConstructionPossible", [u.s["building" + n]])), gt()), i
            }

            function tt(i) {
                $(".handler").remove();
                $(".foreign").not(".pos" + i).remove();
                f.asking4house === undefined && f.add2Move([r.ASKINGHOUSE, OnTurnIndex, n]);
                t.phase(t.PHASE.ASKHOUSE);
                f.changePhase();
                r.requestNextPlayer($(".foreign.parcel.pos" + i).attr("owner"));
                a.update()
            }

            function it(u) {
                p();
                f.add2Move(n == o.HOUSE ? [r.BUILD1, u] : [i ? i : r.BUILD0, n, u]);
                at(t.state.getBasicData().getTilesOnBoard(), [["Type", n], ["Parcel", u]]);
                t.state.getPlayerData(OnTurnIndex).addToGuns(o.GUNS[n]);
                h || n != o.CHURCH || o.getNeighboringParcels(u).forEach(function (n) {
                    r.getCowboys4action(n + r.END + 1).forEach(function (t) {
                        t !== OnTurnIndex && (e.get(t).returnCowboy(n + r.END + 1, !1), f.add2Move([r.CHURCH, t, n]))
                    })
                });
                var s = !l(n, [o.RANCH, o.MINE, o.HOUSE]);
                y(s)
            }

            function p() {
                i && !h && e.onTurn.returnCowboy(i, !0);
                s && t.state.getPlayerData(OnTurnIndex).addToCoins(-s);
                i ? t.state.getBasicData().setBuildings(i - r.BUILDING1, 0) : e.onTurn.removeBuilding(n)
            }

            function y(n) {
                $(".foreign").remove();
                done = !0;
                o.showBuildings();
                h || e.showCowboys();
                n ? t.handleBuild(o.HOUSE, undefined, 0, h) : h ? f.state = f.STATE.FORCEEND : r.runThroughActions()
            }

            var c, v;
            for ($(".handler").remove(), f.state = f.STATE.BUILD, u.s.build = s ? u.get("buyBuilding", [u.get("building" + n), s]) : u.get("buildBuilding", [u.s["building" + n]]), done = !1, l(n, [o.RANCH, o.MINE]) || d(), c = 0; c < 64; c++) l(c, o.RIVER) || o.hasBuilding(c, o.ANY) || $(".parcel.forbidden.pos" + c).length || (v = !1, n === o.HOUSE || (v = e.onTurn.hasProperty(c), v || $(".parcel.ask.pos" + c).length)) && (t.board.append($("<div/>", {
                id: "handler" + c,
                building: n,
                "class": "handler parcel building pos" + c + (v ? " ownparcel" : "")
            })), function (n) {
                var t = document.getElementById("handler" + n);
                new nt(t);
                t.handler.opacity = [.5, .75];
                t.handler.addAction(new b(function () {
                    return $(".ask.pos" + n).length ? u.get("ask4house", [e.get($(".foreign.parcel.pos" + n).attr("owner")).getName()]) : u.s.buildHere
                }, function () {
                    return g(n)
                }, function () {
                    $(".foreign.parcel.ask.pos" + n).length ? tt(n) : it(n)
                }))
            }(c));
            t.state.getPlayerData(OnTurnIndex).getRoads() && (n === o.HOUSE || !l(n, [o.RANCH, o.MINE]) && $(".parcel.ownparcel").length) && t.handleRoads();
            i && (h || w(), k())
        },
        handleRoads: function () {
            function e(n, s) {
                var c = o.getMissingRoads4Edge(n, s);
                c.forEach(function (n) {
                    if (!$("#handlerRoad" + n.join("_")).length) {
                        var s = o.isBridge(n);
                        (!s || t.state.getPlayerData(OnTurnIndex).getRoads() >= 2) && (t.board.append($("<div/>", {
                            id: "handlerRoad" + n.join("_"),
                            "class": "handler road " + (s ? "bridge " : "") + h.toString(n[1]) + " pos" + n[0]
                        })), function (n) {
                            var o = document.getElementById("handlerRoad" + n.join("_"));
                            new nt(o);
                            o.handler.opacity = [.5, .75];
                            o.handler.addAction(new b(function () {
                                return s ? u.s.buildBridgeInfo : u.s.buildRoadInfo
                            }, function () {
                                return !i
                            }, function () {
                                t.state.getBasicData().getRoads(n[1]).getEdge().addElement().set(n[0]);
                                t.board.append($("<img/>", {
                                    "class": "road " + (s ? "bridge " : "") + h.toString(n[1]) + " pos" + n[0],
                                    src: GameImagePath + (s ? "bridge" : "road") + (n[1] % 2 ? "" : "vertical") + ".gif"
                                }));
                                t.state.getPlayerData(OnTurnIndex).addToRoads(s ? -2 : -1);
                                f.add2Move([r.BUILDROAD, n[0], n[1]]);
                                t.state.getPlayerData(OnTurnIndex).getRoads() ? (t.state.getPlayerData(OnTurnIndex).getRoads() < 2 && $(".handler.road.bridge").remove(), $(".handler.road." + h.toString(n[1]) + ".pos" + n[0]).remove(), e(n[0], n[1])) : ($(".handler.road").remove(), i = !0, l(t.phase(), [t.PHASE.BUILDROADS, t.PHASE.BUILDROADSEND]) && (f.state = f.STATE.FORCEEND, a.showButtons()))
                            }))
                        }(n))
                    }
                })
            }

            for (var i = !1, n = 0; n < 4; n++) t.state.getBasicData().getRoads(n).getEdge().forEach(function (t) {
                e(t.get(), n)
            });
            t.phase() === t.PHASE.BUILDROADS && (v.isLastPlayer(OnTurnIndex) ? t.doPhaseEnd() : t.getNextPlayer());
            a.update()
        },
        handleAskPermission4house: function () {
            f.state = f.STATE.DONE;
            t.phase(t.PHASE.ASKEDHOUSE);
            u.s.phaseAsk4permission = u.get("phaseAsk4permissionCore", [e.get(f.asking4house[0]).getName(), u.s["building" + f.asking4house[1]]]);
            t.state.getPlayerData(OnTurnIndex).getProperties().forEach(function (n) {
                var i = n.get();
                o.hasBuilding(i, o.ANY) || t.board.append($("<img/>", {
                    parcel: i,
                    "class": "foreign asking forbidden parcel pos" + i,
                    src: GameImagePath + "discard.png"
                }))
            });
            $(".parcel.asking").each(function () {
                st($(this), function (n) {
                    n.toggleClass("forbidden");
                    n.toggleClass("allowed");
                    n.attr("src", GameImagePath + (n.hasClass("allowed") ? "allowed.png" : "discard.png"))
                }, {
                    mouseIn: function (n) {
                        u.info(u.get("ask4parcel" + (n.hasClass("allowed") ? "Forbid" : "Allow"), [e.get(f.asking4house[0]).getName()]))
                    }, mouseOut: function () {
                        u.info()
                    }
                })
            })
        },
        submitAsk4house: function () {
            var n = [];
            $(".parcel.asking.allowed").each(function () {
                n.push($(this).attr("parcel") * 1)
            });
            f.add2Move(n);
            t.state.getBasicData().setNextPlayer(f.asking4house[0]);
            t.phase(t.PHASE.ACTIONS)
        },
        handleChooseDuel: function (n) {
            $(".handler").remove();
            n.forEach(function (n) {
                var i = n.shift(), f;
                t.board.append($("<div/>", {
                    id: "handler" + i,
                    "class": "handler chooseDuel highlight parcel pos" + i
                }));
                f = document.getElementById("handler" + i);
                new nt(f);
                f.handler.opacity = [1, .5];
                f.handler.addAction(new b(function () {
                    return u.s.choose4duel
                }, function () {
                    return !0
                }, function () {
                    $(".handler").remove();
                    t.phase(t.PHASE.DUEL);
                    c.storeAction(i + r.END + 1);
                    a.enableGameControllers()
                }))
            })
        },
        handleCaptain: function (n) {
            function c() {
                var n = [];
                return [0, 1, 2, 3].forEach(function (t) {
                    o >= i[t] && h + t <= 10 && n.push([t, t ? u.get("captainBuyYellow", [t, t === 1 ? "" : "s", i[t]]) : u.s.noBuy])
                }), n
            }

            function l() {
                var n = [];
                return [0, 1, 2].forEach(function (t) {
                    o >= i[t] && n.push([t, t ? u.get("captainBuyRed", [t, t === 1 ? "" : "s", i[t]]) : u.s.noBuy])
                }), n
            }

            var o = t.state.getPlayerData(OnTurnIndex).getCoins(), h = t.state.getPlayerData(OnTurnIndex).getCowboys(),
                i = n === s.RED ? [0, 3, 9] : [0, 1, 4, 9];
            p.options(u.get("actionPersonality", [u.s["person" + s.CAPTAIN]]), {
                html: $("<div/>", {html: u.get("handleCaptainBuy" + n, [o])}),
                options: n === s.RED ? l() : c(),
                perform: function (t) {
                    e.buyResources(OnTurnIndex, n === s.RED ? r.RESOURCES.GUN : r.RESOURCES.COWBOY, t * 1, i[t]);
                    e.updateView(OnTurnIndex);
                    f.state = f.STATE.END
                }
            })
        },
        handleRedBanker: function () {
            function h() {
                var t = [];
                return [0, 1, 2, 3].forEach(function (r) {
                    o >= n[r] && t.push([r, r ? u.get("bankerBuyRed", [i[r], n[r]]) : u.s.noBuy])
                }), t
            }

            var o = t.state.getPlayerData(OnTurnIndex).getCoins(), n = [0, 3, 12, 25], i = [0, 3, 5, 7];
            p.options(u.get("actionPersonality", [u.s["person" + s.BANKER]]), {
                html: $("<div/>", {html: u.get("handleBankerBuyRed", [o])}),
                options: h(),
                perform: function (u) {
                    e.onTurn.addPts(i[u]);
                    t.state.getPlayerData(OnTurnIndex).addToCoins(-n[u]);
                    e.updateView(OnTurnIndex);
                    s.setUsed(OnTurnIndex, t.state.getPlayerData(OnTurnIndex).getCharacter() != s.BANKER);
                    f.add2Move([r.ACTIONPERSON, s.BANKER, i[u], n[u]]);
                    f.state = f.STATE.END;
                    t.doPhaseEnd()
                }
            })
        },
        handleRedChinese: function () {
            function i() {
                var i = [];
                return n >= 5 && w(r.BUILDING1, r.BUILDING7).forEach(function (n) {
                    i.push([n, u.get("chineseBuyRed", [u.s["actionsquare" + n], u.s["building" + t.state.getBasicData().getBuildings(n - r.BUILDING1)]])])
                }), i.unshift([0, u.s.noBuy]), i
            }

            var n = t.state.getPlayerData(OnTurnIndex).getCoins();
            p.options(u.get("actionPersonality", [u.s["person" + s.CHINESE]]), {
                html: $("<div/>", {html: u.get("handleChineseBuyRed", [n])}),
                options: i(),
                perform: function (n) {
                    n *= 1;
                    var i = n ? t.state.getBasicData().getBuildings(n - r.BUILDING1) : o.NONE;
                    f.add2Move([r.ACTIONPERSON, s.CHINESE, n]);
                    n ? (t.state.getPlayerData(OnTurnIndex).addToCoins(-5), e.updateView(OnTurnIndex), t.handleBuild(t.state.getBasicData().getBuildings(n - r.BUILDING1), n, 0, !0)) : f.state = f.STATE.END
                }
            })
        },
        check4cashLimit: function () {
            var n = [];
            yt(t.state.getBasicData().getPassed()).forEach(function (i) {
                var r = e.get(i).getCashLimit(), u = t.state.getPlayerData(i).getCoins();
                u > r && ((t.state.getPlayerData(i).getCoins() - r) % 10 ? n.push(i) : t.executeCashLimit(i, r))
            });
            n.length ? l(OnTurnIndex, n) ? t.handleCashLimit() : t.getNextPlayerOnline(n) : t.doPhaseEnd()
        },
        handleCashLimit: function (n) {
            var i = t.state.getPlayerData(OnTurnIndex).getCoins(), n = e.onTurn.getCashLimit();
            p.yesNo(u.s.handleCashLimitTitle, $("<div/>", {html: u.get("handleCashLimit", [i, n, i - n])}), [function () {
                t.executeCashLimit(OnTurnIndex, n, !0)
            }, function () {
                t.executeCashLimit(OnTurnIndex, n, !1)
            },], function () {
                e.updateView(OnTurnIndex);
                t.check4cashLimit()
            })
        },
        executeCashLimit: function (n, i, r) {
            var u = t.state.getPlayerData(n).getCoins() - i;
            r && (u += 10 - u % 10);
            t.state.getPlayerData(n).addToCoins(-u);
            u > 9 && e.get(n).addPts(Math.floor(u / 10));
            f.add2Move([n, Math.floor(u / 80), u % 80])
        },
        infoActions: function () {
            $(".infodialog.actions").remove();
            var n = $("<div/>", {"class": "infodialog actions", title: u.s.infoActions}).dialog({
                autoOpen: !0,
                modal: !1,
                resizable: !0,
                closeOnEscape: !0,
                position: {my: "center top", at: "center top", of: $("#playerOverview"), collision: "fit"},
                height: $("#playerOverview").height() * .8,
                open: function () {
                    g()
                },
                close: function () {
                    $(this).remove()
                }
            });
            w(r.INCOME, r.end()).forEach(function (i) {
                if (i !== r.BUYPARCEL && !(i >= r.BUILD0 && i <= r.BUILD4) && !(i >= r.INCOMEBUILDINGS0 && i <= r.INCOMEBUILDINGS4)) {
                    n.append($("<div/>", {"class": "action" + i}).append($("<img/>", {
                        "class": "info action",
                        src: r.getImg4action(i)
                    })).append($("<span/>", {
                        "class": "info text",
                        html: i >= r.BUILDING1 && i <= r.BUILDING7 ? u.get("actionbuilding", [u.s["building" + t.state.getBasicData().getBuildings(i - r.BUILDING1)], o.getCost4Building(i - r.BUILDING1)]) : u.s["action" + i]
                    })));
                    var f = $(".infodialog div.action" + i);
                    t.state.getBasicData().getSheriffSetOn() == i ? f.append($("<span/>", {"class": "info cowboys"}).append($("<img/>", {
                        "class": "cowboy",
                        src: GameImagePath + "meeplesheriff.gif"
                    })).append($("<img/>", {
                        "class": "sym cowboy",
                        src: GameImagePath + "sym" + e.get(e.getPlayerWithPerson(s.SHERIFF)).getColorIdx() + ".png"
                    }))) : r.getCowboys4action(i, !0).forEach(function (n) {
                        var t = e.get(n).getColorIdx();
                        f.append($("<span/>", {"class": "info cowboys"}).append($("<img/>", {
                            "class": "cowboy",
                            src: GameImagePath + "meeple" + t + ".gif"
                        })).append($("<img/>", {"class": "sym cowboy", src: GameImagePath + "sym" + t + ".png"})))
                    });
                    n.append($("<hr/>"))
                }
            })
        },
        infoBuilding: function () {
            $(".infodialog.buildings").remove();
            var n = $("<div/>", {"class": "infodialog buildings", title: u.s.infoBuilding}).dialog({
                autoOpen: !0,
                modal: !1,
                resizable: !0,
                closeOnEscape: !0,
                position: {my: "center top", at: "center top", of: $("#playerOverview"), collision: "fit"},
                height: $("#playerOverview").height() * .8,
                open: function () {
                    g()
                },
                close: function () {
                    $(this).remove()
                }
            }), t = o.getAvailable();
            w(o.HOUSE, o.PRISON).forEach(function (i) {
                var r = u.s["infoBuilding" + i];
                r.push(u.get("infoBuildingInBag", [t[i], o.total[i]]));
                n.append($("<div/>", {"class": "building" + i}).append($("<img/>", {
                    "class": "info building",
                    src: o.getImg(i)
                })).append($("<span/>", {"class": "info building text", html: u.get("infoBuildingCore", r)})));
                n.append($("<hr/>"))
            })
        },
        infoBuyParcel: function () {
            if ($(".parcel.infocost").length) {
                $(".parcel.infocost").remove();
                return
            }
            for (var n = 0; n < 64; n++) l(n, o.RIVER) || e.hasProperty(n) || t.board.append($("<div/>", {
                "class": "infocost parcel pos" + n,
                html: "$" + o.getCost4property(n)
            }))
        },
        infoIncome: function () {
            var n, i;
            if ($(".parcel.infoincome").length) {
                $(".parcel.infoincome").remove();
                return
            }
            for (n = 0; n < 64; n++) l(n, o.RIVER) || e.hasProperty(n) && (i = o.getIncome(n, e.getOwner(n)), i !== undefined) && t.board.append($("<div/>", {
                "class": "infoincome parcel pos" + n,
                html: "$" + i
            }))
        },
        highlight4help: function () {
            $("span.help4parcel").each(function () {
                ai($(this), function (n) {
                    li(n);
                    t.board.append(vi($("<div/>", {"class": "parcel help highlight pos" + $(this).attr("parcel")})))
                })
            });
            $(".doublesize4help").each(function () {
                $(this).attr("origwidth", $(this).css("width").slice(0, -2));
                $(this).attr("origheight", $(this).css("height").slice(0, -2))
            });
            $(".doublesize4help").unbind("hover").hover(function () {
                $(this).stop().animate({
                    width: $(this).attr("origwidth") * 1.5,
                    height: $(this).attr("origheight") * 1.5
                }, {queue: !0}).animate({width: $(this).attr("origwidth"), height: $(this).attr("origheight")})
            }, function () {
                $(this).stop().animate({
                    width: $(this).attr("origwidth"),
                    height: $(this).attr("origheight")
                }, {duration: 1})
            });
            $(".highlight4help").unbind("hover").hover(function () {
                $(this).stop().css("opacity", .2).animate({opacity: 1})
            }, function () {
                $(this).stop().css("opacity", 1)
            });
            $(".bouncing4help").unbind("hover").hover(function () {
                $(this).stop().animate({"margin-top": ".5em"}, {queue: !0}).animate({"margin-top": "-.5em"}, {queue: !0}).animate({"margin-top": 0})
            }, function () {
                $(this).stop().css("margin-top", 0)
            });
            $(".bold4help").unbind("hover").hover(function () {
                $(this).css("font-weight", "bold")
            }, function () {
                $(this).css("font-weight", "normal")
            })
        }
    }, a = {
        show: function () {
            $(".handler").remove();
            $(".dialog").remove();
            t.init();
            f.state === f.STATE.COLOR ? (this.enableBasicControllers(), a.update()) : (this.setup(), this.showButtons(), u.info());
            g()
        }, setup: function () {
            t.board.append($("<img/>", {
                "class": "boardimg",
                src: GameImagePath + "board" + (t.isRiver() ? "_river" : "") + ".gif"
            }));
            $("#game").append($("<div/>", {id: "playerOverview"}).append($("<img/>", {
                "class": "playerimg",
                src: GameImagePath + "playerinfo.gif"
            })).append($("<div/>", {"class": "personalities"})).append($("<div/>", {"class": "playerInfoDiv"})));
            t.board.append($("<img/>", {
                "class": "info bouncing4help buyparcel",
                src: GameImagePath + "question.png"
            }).hover(function () {
                u.info("infobuyparcels")
            }, function () {
                u.info()
            }).click(function () {
                t.infoBuyParcel()
            })).append($("<img/>", {
                "class": "info bouncing4help income",
                src: GameImagePath + "question.png"
            }).hover(function () {
                u.info("infoincome")
            }, function () {
                u.info()
            }).click(function () {
                t.infoIncome()
            }));
            $("#playerOverview").append($("<img/>", {
                "class": "info actions",
                src: GameImagePath + "infoactions.jpg"
            }).hover(function () {
                u.info("infoactions")
            }, function () {
                u.info()
            }).click(function () {
                t.infoActions()
            })).append($("<img/>", {
                "class": "info buildings",
                src: GameImagePath + "infobuilding.jpg"
            }).hover(function () {
                u.info("infobuilding")
            }, function () {
                u.info()
            }).click(function () {
                t.infoBuilding()
            })).append($("<img/>", {"class": "logo", src: GameImagePath + "quined.jpg"}));
            s.appendImages2Info();
            this.showRound();
            this.showPassed();
            f.state == f.STATE.RESTORE ? f.restoreMove() : f.info.push(ht(t.phase()));
            f.setupMoveRecording()
        }, enable: function () {
            t.isActive() && f.showCurrentMove();
            e.showInfo();
            o.show();
            e.updateView();
            t.highlight4help();
            this.enableBasicControllers();
            this.controllers.push(new e.Controller);
            t.isActive() && this.enableGameControllers()
        }, enableBasicControllers: function () {
            this.controllers = [];
            this.handlers = [];
            $("#undoBtn").remove();
            $("#redoBtn").remove();
            t.isActive() && (this.undoController = new ei, this.redoController = new fi, this.controllers.push(this.undoController), this.controllers.push(this.redoController))
        }, enableGameControllers: function () {
            $(".handler").remove();
            l(t.phase(), [t.PHASE.START1, t.PHASE.START2, t.PHASE.START3, t.PHASE.START4]) ? t.handleSetProperty() : t.phase() === t.PHASE.SIDEPERSON ? t.handleChooseSide() : t.phase() === t.PHASE.NEWBEGINNING ? t.handleNewBeginning() : t.phase() === t.PHASE.PERSON ? t.handleChoosePerson() : t.phase() === t.PHASE.NEPOTISM ? t.handleChoosePerson(!0) : t.phase() === t.PHASE.PLACE ? t.handlePlace() : t.phase() === t.PHASE.ACTIONS ? r.runThroughActions() : t.phase() === t.PHASE.CASHLIMIT ? t.check4cashLimit() : t.phase() === t.PHASE.REDBANKER ? t.handleRedBanker() : t.phase() === t.PHASE.ASKHOUSE ? t.handleAskPermission4house() : t.phase() === t.PHASE.NEWROUND ? t.newRound() : t.phase() === t.PHASE.DUELSEQUENCE ? t.handleChooseDuel(r.generalActionGetDuels(t.state.getBasicData().getCurrentAction()), t.state.getBasicData().getCurrentAction()) : t.phase() === t.PHASE.DUEL ? r.handleDuel() : t.phase() === t.PHASE.BUILDROADS && t.handleRoads()
        }, update: function () {
            for (var n = 0; n < this.controllers.length; n++) this.controllers[n].UpdateView();
            for (n = 0; n < this.handlers.length; n++) this.handlers[n].UpdateView();
            this.showButtons();
            u.info()
        }, showButtons: function () {
            t.isActive() && (document.getElementById(BtnFinishTurnID).disabled = !f.canFinish(), document.getElementById(BtnCancelMoveID).disabled = !it)
        }, showRound: function () {
            $(".round").remove();
            t.board.append($("<img/>", {
                "class": "round pos" + t.state.getBasicData().getRound(),
                src: GameImagePath + "round.gif"
            }))
        }, showTO: function () {
            var i, n, r;
            for ($(".TO").not(".pass").remove(), i = v.getTO(), n = 0, r = i.length; n < r; n++) t.state.getBasicData().getPassed().contains(i[n]) || (t.board.append($("<img/>", {
                "class": "TO TO" + n,
                src: GameImagePath + "marker" + e.get(i[n]).getColorIdx() + ".gif"
            })), t.board.append($("<img/>", {
                "class": "sym TO TO" + n,
                src: GameImagePath + "sym" + e.get(i[n]).getColorIdx() + ".png"
            })))
        }, showPassed: function () {
            $(".pass").not(".handler").remove();
            for (var n = 0, i = t.state.getBasicData().getPassed().length; n < i; n++) t.board.append($("<img/>", {
                "class": "pass TO TO" + n,
                src: GameImagePath + "marker" + e.get(t.state.getBasicData().getPassed(n)).getColorIdx() + ".gif"
            })), t.board.append($("<img/>", {
                "class": "sym pass TO TO" + n,
                src: GameImagePath + "sym" + e.get(t.state.getBasicData().getPassed(n)).getColorIdx() + ".png"
            }));
            this.showTO()
        }
    }, e = {
        data: [], ALL: [], onTurn: undefined, init: function () {
            this.data = [];
            this.ALL = w(0, GameInfo.NumPlayers - 1);
            e.ALL.forEach(function (n) {
                e.data[n] = new Player(n)
            });
            this.onTurn = this.data[OnTurnIndex]
        }, get: function (n) {
            return this.data[n]
        }, perform: function (n) {
            var t = [].slice.call(arguments, 1);
            this.data.forEach(function (i) {
                i[n].apply(i, t)
            })
        }, propLeft2set: function () {
            for (var n = 0; n < GameInfo.NumPlayers; n++) if (this.data[n].propLeft2set()) return !0;
            return !1
        }, setStartPlayer: function (n) {
            this.data.forEach(function (t, i) {
                t.newBeginning[10] = i == n
            })
        }, showNewBeginning: function (n) {
            this.perform("showNewBeginning", n);
            var i = [], t = "";
            this.data.forEach(function (n, r) {
                i.push(u.get("newBeginningBid", [n.getName(), n.newBeginning[9]]));
                n.newBeginning[10] && (t = r)
            });
            n.append($("<div/>", {
                "class": "neutral",
                html: u.get("newBeginningStart", [i.join(", "), e.get(t).getName(), e.get(t).newBeginning[9]])
            }))
        }, getList4nepotismAvailable: function () {
            return this.ALL.filter(function (n) {
                return e.get(n).isNepotism() && !t.state.getPlayerData(n).isNephewUsed()
            })
        }, getList4nepotism: function () {
            return v.getTO().filter(function (n) {
                return t.state.getPlayerData(n).isNepotism()
            })
        }, addResources: function (n, i, u) {
            switch (i) {
                case r.RESOURCES.COIN:
                    t.state.getPlayerData(n).addToCoins(u);
                    break;
                case r.RESOURCES.GUN:
                    t.state.getPlayerData(n).addToGuns(u);
                    break;
                case r.RESOURCES.POINT:
                    e.get(n).addPts(u);
                    break;
                case r.RESOURCES.COWBOY:
                    t.state.getPlayerData(n).addToCowboys(u);
                    break;
                case r.RESOURCES.ROAD:
                    t.state.getPlayerData(n).addToRoads(u)
            }
        }, getResources: function (n, t, i) {
            this.addResources(n, t, i);
            f.add2Move([r.GETRESOURCES, t, i])
        }, buyResources: function (n, i, u, e) {
            this.addResources(n, i, u);
            t.state.getPlayerData(n).addToCoins(-e);
            f.add2Move([r.BUYRESOURCES, i, u, e])
        }, getOwner: function (n) {
            for (var t = 0; t < GameInfo.NumPlayers; t++) if (this.get(t).hasProperty(n)) return t;
            return undefined
        }, hasProperty: function (n) {
            return this.getOwner(n) !== undefined
        }, getCowboyOnTile: function (n) {
            if (t.state.getBasicData().getSheriffSetOn() == n + r.END + 1) return this.getPlayerWithPerson(s.SHERIFF);
            var i;
            return t.state.getBasicData().getCowboysOnBoard().forEach(function (t) {
                !1 || n + r.END + 1 != t.getAction() || (i = t.getPlayer())
            }), i
        }, getPlayerWithPerson: function (n) {
            for (var i = 0; i < GameInfo.NumPlayers; i++) if (t.state.getPlayerData(i).getCharacter() === n || e.get(i).nephew[0] === n) return i;
            return undefined
        }, getPlayerWithPerson4TO: function (n) {
            for (var i = 0; i < GameInfo.NumPlayers; i++) if (Math.min(t.state.getPlayerData(i).getCharacter(), e.get(i).nephew[0]) === n) return i;
            return undefined
        }, showInfo: function () {
            $(".playerInfoDiv").append($("<div/>", {"class": "playerInfo legend"}).append($("<img/>", {
                "class": "dueltiles",
                title: u.s.dueltilesTitle,
                src: GameImagePath + "duelback.gif"
            })).append($("<img/>", {
                "class": "buildings",
                title: u.s.buildingsTitle,
                src: GameImagePath + "building.jpg"
            })).append($("<img/>", {
                "class": "pts",
                title: u.s.ptsTitle,
                src: GameImagePath + "points.gif"
            })).append($("<img/>", {
                "class": "money",
                title: u.s.coinTitle,
                src: GameImagePath + "coin.gif"
            })).append($("<img/>", {
                "class": "cowboy",
                title: u.s.meepleTitle,
                src: GameImagePath + "meeple0.gif"
            })).append($("<img/>", {
                "class": "gun",
                title: u.s.gunTitle,
                src: GameImagePath + "gun.gif"
            })).append($("<img/>", {
                "class": "road",
                title: u.s.roadTitle,
                src: GameImagePath + "road.gif"
            })).append($("<img/>", {
                "class": "property",
                title: u.s.propertyTitle,
                src: GameImagePath + "property0.gif"
            })));
            for (var n = 0; n < GameInfo.NumPlayers; n++) e.get((n + UserIndex) % GameInfo.NumPlayers).playerInfo()
        }, showCowboys: function () {
            var u, i, n;
            ($(".cowboy.placed").remove(), t.state.getBasicData().getCowboysOnBoard().forEach(function (n) {
                var o = e.get(n.getPlayer()).getColorIdx(), u = n.getAction(), f, i;
                u > r.END ? (u -= r.END + 1, f = "parcel") : f = "action";
                i = $(".cowboy.placed." + f + ".pos" + u).length;
                i === 1 && $(".cowboy.placed." + f + ".pos" + u).addClass("cnt1");
                i >= 5 ? t.board.append($("<div/>", {
                    "class": "cowboy placed " + f + " pos" + u + " cntmax",
                    html: ">"
                })) : (i = i ? " cnt" + (i + 1) : "", t.board.append($("<img/>", {
                    "class": "cowboy placed " + f + " pos" + u + i,
                    src: GameImagePath + "cowboy" + o + ".gif"
                })))
            }), t.state.getBasicData().isRed(s.SHERIFF)) || (u = e.getPlayerWithPerson(s.SHERIFF), u !== undefined && (i = e.get(u).getColorIdx(), n = t.state.getBasicData().getSheriffSetOn(), n > r.END ? (t.board.append($("<img/>", {
                "class": "cowboy placed sheriff parcel pos" + (n - r.END - 1),
                src: GameImagePath + "cowboy0.gif"
            })), t.board.append($("<img/>", {
                "class": "sym cowboy placed sheriff parcel pos" + (n - r.END - 1),
                src: GameImagePath + "sym" + i + ".png"
            }))) : n > 0 ? (t.board.append($("<img/>", {
                "class": "cowboy placed sheriff action pos" + n,
                src: GameImagePath + "cowboy0.gif"
            })), t.board.append($("<img/>", {
                "class": "sym cowboy placed sheriff action pos" + n,
                src: GameImagePath + "sym" + i + ".png"
            }))) : $(".marker.pos" + s.SHERIFF).length && (t.board.append($("<img/>", {
                "class": "cowboy placed sheriff notplaced",
                src: GameImagePath + "cowboy0.gif"
            })), t.board.append($("<img/>", {
                "class": "sym cowboy placed sheriff notplaced",
                src: GameImagePath + "sym" + i + ".png"
            })))))
        }, updateView: function (n) {
            for (var r, i = n === undefined ? 0 : n; i < (n === undefined ? GameInfo.NumPlayers : n + 1); i++) r = t.state.getPlayerData(i), $("#playerInfo" + i + " div.dueltiles").html(t.isMightIsRight() ? r.getDuelTiles().length + (c.set[i] === undefined ? 0 : 1) : "-"), $("#playerInfo" + i + " div.buildings").html(r.getBuildings().length), $("#playerInfo" + i + " div.pts").html(t.state.getBasicData().getPoints(i) - 10), $("#playerInfo" + i + " div.money").html(r.getCoins()), $("#playerInfo" + i + " div.cowboy").html(r.getCowboys()), $("#playerInfo" + i + " div.gun").html(r.getGuns()), $("#playerInfo" + i + " div.road").html(r.getRoads()), $("#playerInfo" + i + " div.property").html(12 - r.getProperties().length), r.getBuildings().length ? $("#playerInfo" + i + " div.buildings").addClass("help bold4help") : $("#playerInfo" + i + " div.buildings").removeClass("help bold4help"), t.phase() === t.PHASE.PLACE || t.isNewBeginning() ? $("#playerInfo" + i + " img.meeple").attr("idx", i).unbind("click").click(function () {
                e.data[$(this).attr("idx")].showMeepleInfo()
            }).addClass("help highlight4help") : $("#playerInfo" + i + " img.meeple").removeClass("help"), this.data[i].showCharacter()
        }, Controller: function () {
            this.UpdateView = function () {
                e.updateView();
                e.showCowboys()
            }
        }
    }, p, pt, wt;
    Player = function (n) {
        this.idx = n;
        this.initStartProps();
        this.nephew = [s.NONE, 0]
    };
    Player.prototype.initStartProps = function (n) {
        this.cntProps = n === undefined ? 2 : n
    };
    Player.prototype.propLeft2set = function () {
        return t.state.getPlayerData(this.idx).getProperties().length < t.phase() * 1 && t.phase() * 1 <= this.cntProps
    };
    Player.prototype.isInfluence = function () {
        return this.newBeginning && this.newBeginning[6]
    };
    Player.prototype.isNepotism = function () {
        return this.newBeginning && this.newBeginning[7]
    };
    Player.prototype.isSniper = function () {
        return this.newBeginning && this.newBeginning[8]
    };
    Player.prototype.showNewBeginning = function (n) {
        var t = this.newBeginning.slice(0, 6);
        t.unshift(this.getName());
        n.append($("<div/>", {"class": "neutral", html: u.get("initNewBeginning", t)}));
        t = [];
        this.isInfluence() && t.push(u.s.influence);
        this.isNepotism() && t.push(u.s.nepotism);
        this.isSniper() && t.push(u.s.sniper);
        n.append($("<div/>", {
            "class": "neutral",
            html: u.get("newBeginningSpecials", [t.length ? t.join(", ") : "-"])
        }));
        n.append($("<hr/>"))
    };
    Player.prototype.setNewBeginning = function () {
        this.newBeginning = [].slice.call(arguments, 0);
        this.initStartProps(this.newBeginning[4])
    };
    Player.prototype.getColorIdx = function () {
        var i = t.state.getPlayerData(this.idx).getColor(), n;
        return i ? (n = t.state.getPlayerData(UserIndex).getColor(), this.idx === UserIndex) ? n : this.idx + 1 === n ? UserIndex + 1 : this.idx + 1 : i
    };
    Player.prototype.getColor = function () {
        return t.colors[this.getColorIdx()]
    };
    Player.prototype.getName = function () {
        return PlayerInfo[this.idx].Login
    };
    Player.prototype.setup = function () {
        var n = t.state.getPlayerData(this.idx), i = t.isNewBeginning();
        n.setCoins(i ? 50 : 15);
        n.setGuns(i ? 0 : 1);
        n.setCowboys(i ? 1 : 3);
        n.setRoads(i ? 0 : 1);
        t.state.getBasicData().setPoints(this.idx, 10)
    };
    Player.prototype.playerInfo = function () {
        var r = this.getColorIdx(), f = this, n = $("<div/>", {id: "playerInfo" + this.idx, "class": "playerInfo"}), i;
        $(".playerInfoDiv").append(n);
        i = $("<div/>", {id: "infoline" + this.idx, "class": "infoline"});
        n.append(i);
        i.append($("<img/>", {
            "class": "meeple",
            src: GameImagePath + "meeple" + r + ".gif"
        })).append($("<img/>", {"class": "symbol", src: GameImagePath + "sym" + r + ".png"}));
        i.append($("<span/>", {id: "playerInfoName" + this.idx, "class": "playerInfoName"}));
        FormatPlayerName("playerInfoName" + this.idx, this.idx, !1, !0);
        n.append($("<div/>", {"class": "dueltiles"})).append($("<div/>", {"class": "buildings help"}).click(function () {
            f.showBuildings()
        })).append($("<div/>", {"class": "pts"})).append($("<div/>", {"class": "money"})).append($("<div/>", {"class": "cowboy"})).append($("<div/>", {"class": "gun"})).append($("<div/>", {"class": "road"})).append($("<div/>", {"class": "property"}));
        t.isMightIsRight() && n.find(".dueltiles").click(function () {
            f.showDuelTiles()
        }).addClass("help bold4help");
        this.isSniper() && t.phase() !== t.PHASE.NEWBEGINNING && $("#infoline" + this.idx).append($("<img/>", {
            "class": "hat",
            title: u.s.sniper,
            src: GameImagePath + "hat.png"
        }))
    };
    Player.prototype.getCashLimit = function () {
        return s.getCashLimit(t.state.getPlayerData(this.idx).getCharacter()) + s.getCashLimit(this.nephew[0])
    };
    Player.prototype.showCharacter = function () {
        $(".personalities .marker.player" + this.idx).remove();
        t.state.getPlayerData(this.idx).getCharacter() !== s.NONE && ($(".personalities").append($("<img/>", {
            "class": "marker player" + this.idx + " pos" + t.state.getPlayerData(this.idx).getCharacter(),
            src: GameImagePath + "marker" + this.getColorIdx() + ".gif"
        })).append($("<img/>", {
            "class": "sym marker player" + this.idx + " pos" + t.state.getPlayerData(this.idx).getCharacter(),
            src: GameImagePath + "sym" + this.getColorIdx() + ".png"
        })), t.state.getPlayerData(this.idx).isPersonUsed() && $(".personalities").append($("<img/>", {
            "class": "isused pos" + t.state.getPlayerData(this.idx).getCharacter(),
            src: GameImagePath + "allowed.png"
        })));
        this.nephew[0] !== s.NONE && ($(".personalities").append($("<img/>", {
            "class": "marker player" + this.idx + " pos" + this.nephew[0],
            src: GameImagePath + "marker" + this.getColorIdx() + ".gif"
        })).append($("<img/>", {
            "class": "sym marker player" + this.idx + " pos" + this.nephew[0],
            src: GameImagePath + "sym" + this.getColorIdx() + ".png"
        })), t.state.getPlayerData(this.idx).isNephewUsed() && $(".personalities").append($("<img/>", {
            "class": "isused pos" + this.nephew[0],
            src: GameImagePath + "allowed.png"
        })))
    };
    Player.prototype.showMeepleInfo = function () {
        var n = $("<div/>", {
            "class": "dialog showMeeple",
            title: u.get("infoPlayer", [this.getName()])
        }).dialog({
            autoOpen: !0, modal: !1, resizable: !0, closeOnEscape: !0, open: function () {
                g()
            }, close: function () {
                n.remove()
            }
        });
        t.isNewBeginning() && (this.showNewBeginning(n), this.isNepotism() && this.nephew[0] == s.NONE && t.state.getPlayerData(this.idx).isNephewUsed() && n.append($("<div/>", {html: u.s.nepotismUsed})).append($("<hr/>")));
        t.phase() === t.PHASE.PLACE && n.append($("<div/>", {html: u.get("sum$placed", [this.getName(), this.getSum$placed()])}))
    };
    Player.prototype.getSum$placed = function () {
        function u(i) {
            return i > r.END ? o.hasBuilding(i - r.END - 1, o.BUILDING) ? 0 : o.getCost4property(i - r.END - 1) : i >= r.BUILDING1 && i <= r.BUILDING7 ? Math.ceil(o.getCost4Building(i - r.BUILDING1) / (!t.state.getBasicData().isRed(s.CHINESE) && l(s.CHINESE, [t.state.getPlayerData(n).getCharacter(), e.get(n).nephew[0]]) ? 2 : 1)) : 0
        }

        var n = this.idx, i = 0;
        return e.getPlayerWithPerson(s.SHERIFF) == this.idx && (i += u(t.state.getBasicData().getSheriffSetOn())), t.state.getBasicData().getCowboysOnBoard().forEach(function (t) {
            t.getPlayer() == n && (i += u(t.getAction()))
        }), i
    };
    Player.prototype.showDuelTiles = function () {
        var n, i;
        t.isMightIsRight() && (n = $("<div/>", {
            "class": "dialog",
            title: this.idx == UserIndex ? u.s.yourDuelTiles : u.get("showDuelTiles", [this.getName()])
        }).dialog({
            autoOpen: !0, modal: !1, resizable: !0, closeOnEscape: !0, open: function () {
                g()
            }, close: function () {
                n.remove()
            }
        }), this.idx == UserIndex || (GameInfo.NumPlayers == 2 || t.isNewBeginning()) && !c.refilled[this.idx] ? (i = [], t.state.getPlayerData(this.idx).getDuelTiles().forEach(function (n) {
            i.push(n.get())
        }), c.set[this.idx] !== undefined && i.push(c.set[this.idx]), i.sort().forEach(function (t) {
            n.append($("<img/>", {"class": "dueltile", src: GameImagePath + "duel" + t + ".gif"}))
        })) : c.refilled[this.idx] ? n.append($("<div/>", {html: u.s.duelTilesRefilled})) : (n.append($("<div/>", {html: u.get("infoDuelTiles", [c.sum[this.idx], c.played[this.idx].length, ot(c.played[this.idx]), 6 - c.played[this.idx].length, c.sum[this.idx] - ot(c.played[this.idx])])})), c.played[this.idx].forEach(function (t) {
            n.append($("<img/>", {"class": "dueltile", src: GameImagePath + "duel" + t + ".gif"}))
        })))
    };
    Player.prototype.showBuildings = function () {
        if (t.state.getPlayerData(this.idx).getBuildings().length) {
            var n = $("<div/>", {
                "class": "dialog",
                title: u.get("showBuildings", [this.getName()])
            }).dialog({
                autoOpen: !0, modal: !1, resizable: !0, closeOnEscape: !0, onClose: function () {
                    n.remove()
                }
            });
            t.state.getPlayerData(this.idx).getBuildings().forEach(function (t) {
                n.append($("<img/>", {"class": "building", src: o.getImg(t.get())}))
            })
        }
    };
    Player.prototype.hasProperty = function (n) {
        return t.state.getPlayerData(this.idx).getProperties().contains(n)
    };
    Player.prototype.listBuildings = function () {
        var n = [], i = t.state.getPlayerData(this.idx).getProperties();
        return t.state.getBasicData().getTilesOnBoard().forEach(function (t) {
            i.contains(t.getParcel()) && (n[t.getType()] = n[t.getType()] === undefined ? 1 : n[t.getType()] + 1)
        }), n
    };
    Player.prototype.cntBuildings = function (n) {
        var i = 0;
        return t.state.getPlayerData(this.idx).getProperties().forEach(function (t) {
            o.hasBuilding(t.get(), n) && i++
        }), i
    };
    Player.prototype.removeBuilding = function (n) {
        var i = !1, r = t.state.getPlayerData(this.idx).getBuildings();
        r.forEach(function (t, u) {
            i || t.get() !== n || (i = !0, r.removeElement(u))
        })
    };
    Player.prototype.showProperties = function () {
        var n = this.getColorIdx();
        t.state.getPlayerData(this.idx).getProperties().forEach(function (i) {
            t.board.append($("<img/>", {"class": "parcel pos" + i.get(), src: GameImagePath + "property" + n + ".jpg"}))
        })
    };
    Player.prototype.hasSheriff = function (n) {
        return l(s.SHERIFF, [t.state.getPlayerData(this.idx).getCharacter(), this.nephew[0]]) ? !n && t.state.getBasicData().isRed(s.SHERIFF) || n && !t.state.getBasicData().isRed(s.SHERIFF) ? !1 : !0 : !1
    };
    Player.prototype.isSheriffAvailable = function () {
        return this.hasSheriff() ? !s.isUsed(this.idx, s.SHERIFF) : !1
    };
    Player.prototype.getCowboys = function () {
        return t.state.getPlayerData(this.idx).getCowboys() + (this.isSheriffAvailable() ? 1 : 0)
    };
    Player.prototype.returnCowboy = function (n, i) {
        var r = !1, u = this.idx;
        if (t.state.getBasicData().getSheriffSetOn() === n) {
            t.state.getBasicData().setSheriffSetOn(0);
            return
        }
        t.state.getBasicData().getCowboysOnBoard().forEach(function (i, f) {
            r || i.getPlayer() != u || n != i.getAction() || (r = !0, t.state.getBasicData().getCowboysOnBoard().removeElement(f))
        });
        r && !i && t.state.getPlayerData(this.idx).addToCowboys(1)
    };
    Player.prototype.hasCowboyOnBoard = function (n) {
        var i = !1, r = this.idx;
        return t.state.getBasicData().getCowboysOnBoard().forEach(function (t) {
            i || t.getPlayer() !== r || n !== t.getAction() || (i = !0)
        }), i
    };
    Player.prototype.newRound = function () {
        t.state.getPlayerData(this.idx).setCowboys(Math.min(10, t.state.getPlayerData(this.idx).getCowboys() + (t.state.getBasicData().getRound() < 3 ? 4 : 5)));
        t.state.getBasicData().getPassed().removeElement(0);
        l(s.MERCENARY, [t.state.getPlayerData(this.idx).getCharacter(), this.nephew[0]]) && (t.state.getPlayerData(this.idx).addToGuns(t.state.getBasicData().isRed(s.MERCENARY) ? -2 : -3), f.add2Move([r.ENDMERCENARY, this.idx]));
        t.state.getPlayerData(this.idx).isGuns3() && (t.state.getPlayerData(this.idx).setGuns3(!1), t.state.getPlayerData(this.idx).addToGuns(-3), f.add2Move([r.ENDGUNS3, this.idx]));
        t.state.getPlayerData(this.idx).setCharacter(s.NONE);
        t.state.getPlayerData(this.idx).unsetPersonUsed();
        this.showCharacter();
        e.updateView(this.idx)
    };
    Player.prototype.doEndScoring = function () {
        var r = this, n = 0, i;
        t.state.getPlayerData(this.idx).getProperties().forEach(function (t) {
            o.hasBuilding(t.get(), o.ANY) && (n += o.parcelNearBridge(t.get()) ? 3 : 2)
        });
        i = Math.floor(t.state.getPlayerData(this.idx).getCoins() / 6);
        this.addPts(n + i);
        f.add2Move([this.idx, n, i])
    };
    Player.prototype.addPts = function (n) {
        t.state.getBasicData().setPoints(this.idx, t.state.getBasicData().getPoints(this.idx) + n)
    };
    var s = {
        SHERIFF: 0,
        BANKER: 1,
        GROCER: 2,
        CHINESE: 3,
        SETTLER: 4,
        CAPTAIN: 5,
        MERCENARY: 6,
        ALL: w(0, 6),
        NONE: 11,
        RED: "Red",
        YELLOW: "Yellow",
        CASHLIMIT: [[20, 120, 60, 30, 30, 25, 20], [20, 60, 60, 30, 20, 20, 30]],
        appendImages2Info: function () {
            var n = $(".personalities");
            n.children().remove();
            s.ALL.forEach(function (t) {
                n.append($("<img/>", {
                    "class": "person",
                    src: s.getImg(t),
                    title: u.s["personinfo" + t + s.getSide(t)]
                }))
            })
        },
        getSide: function (n) {
            return t.state.getBasicData().isRed(n) ? this.RED : this.YELLOW
        },
        getImg: function (n, i) {
            i === undefined && (i = t.state.getBasicData().isRed(n));
            switch (n) {
                case this.SHERIFF:
                    return GameImagePath + "sheriff" + (i ? "-red" : "") + ".jpg";
                case this.CHINESE:
                    return GameImagePath + "chinese" + (i ? "-red" : "") + ".jpg";
                case this.BANKER:
                    return GameImagePath + "banker" + (i ? "-red" : "") + ".jpg";
                case this.SETTLER:
                    return GameImagePath + "settler" + (i ? "-red" : "") + ".jpg";
                case this.GROCER:
                    return GameImagePath + "grocer" + (i ? "-red" : "") + ".jpg";
                case this.CAPTAIN:
                    return GameImagePath + "captain" + (i ? "-red" : "") + ".jpg";
                case this.MERCENARY:
                    return GameImagePath + "mercenary" + (i ? "-red" : "") + ".jpg"
            }
        },
        setUsed: function (n, i) {
            i ? t.state.getPlayerData(n).setNephewUsed() : t.state.getPlayerData(n).setPersonUsed();
            e.get(n).showCharacter()
        },
        isUsed: function (n, i) {
            return t.state.getPlayerData(n).getCharacter() === i ? t.state.getPlayerData(n).isPersonUsed() : t.state.getPlayerData(n).isNephewUsed()
        },
        perform: function (n, i, o) {
            f.state = f.STATE.CHARACTERACTION;
            i === undefined && (i = OnTurnIndex);
            switch (n) {
                case this.SHERIFF:
                    return !0;
                case this.BANKER:
                    return t.state.getBasicData().isRed(this.BANKER) || e.getResources(i, r.RESOURCES.COIN, 9), !0;
                case this.CHINESE:
                    return t.state.getBasicData().isRed(this.CHINESE) ? (t.handleRedChinese(), !1) : (e.getResources(i, r.RESOURCES.ROAD, 2), !0);
                case this.SETTLER:
                    return t.state.getBasicData().isRed(this.SETTLER) ? (p.yesNo(u.get("actionPersonality", [u.s["person" + s.SETTLER]]), $("<div/>", {html: u.s["handleSettler" + s.getSide(s.SETTLER)]}), [function () {
                        e.getResources(i, r.RESOURCES.COIN, 8);
                        s.setUsed(i, o)
                    }], function () {
                        f.state = f.STATE.END;
                        a.update()
                    }), !1) : (t.handleSetProperty(), f.state = f.STATE.SETPROPERTY, !1);
                case this.GROCER:
                    return p.yesNo(u.get("actionPersonality", [u.s["person" + s.GROCER]]), $("<div/>", {html: u.s["handleGrocer" + s.getSide(s.GROCER)]}), [function () {
                        e.getResources(i, r.RESOURCES.COIN, 8);
                        s.setUsed(i, o)
                    }], function () {
                        f.state = f.STATE.END;
                        a.update()
                    }), !1;
                case this.CAPTAIN:
                    return t.handleCaptain(s.getSide(this.CAPTAIN)), !1;
                case this.MERCENARY:
                    return e.getResources(i, r.RESOURCES.GUN, t.state.getBasicData().isRed(this.MERCENARY) ? 2 : 3), !0
            }
        },
        isChosen: function (n) {
            return $(".personalities .marker.pos" + n).length > 1
        },
        getCashLimit: function (n) {
            return n === this.NONE ? 0 : this.CASHLIMIT[t.state.getBasicData().isRed(n) ? 1 : 0][n]
        }
    }, h = {
        RIGHT: 0, TOP: 1, LEFT: 2, BOTTOM: 3, all: [0, 1, 2, 3], toString: function (n) {
            switch (n) {
                case this.RIGHT:
                    return "right";
                case this.TOP:
                    return "top";
                case this.LEFT:
                    return "left";
                case this.BOTTOM:
                    return "bottom"
            }
            return ""
        }
    }, o = {
        NONE: 0,
        MOUNTAIN: 1,
        HOUSE: 2,
        RANCH: 3,
        SALOON: 4,
        BANK: 5,
        DRUGSTORE: 6,
        HOTEL: 7,
        CHURCH: 8,
        MINE: 9,
        PRISON: 10,
        CNT: 10,
        BUILDING: 11,
        ANY: 12,
        total: [0, 9, 20, 6, 3, 4, 4, 3, 2, 6, 2],
        GUNS: [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 2],
        RIVER: [],
        NEARRIVER: [],
        BRIDGE: [],
        BRIDGES4PARCEL: [],
        init: function () {
            t.isRiver() && (this.total[this.MOUNTAIN] = 6, this.RIVER = [24, 25, 26, 29, 30, 31, 34, 35, 36, 37], this.NEARRIVER = [16, 17, 18, 19, 20, 21, 22, 23, 27, 28, 32, 33, 38, 39, 41, 42, 43, 44, 45, 46], this.BRIDGE = [this.getEdge(24, h.LEFT), this.getEdge(24, h.RIGHT), this.getEdge(25, h.RIGHT), this.getEdge(26, h.BOTTOM), this.getEdge(34, h.RIGHT), this.getEdge(35, h.RIGHT), this.getEdge(36, h.RIGHT), this.getEdge(37, h.TOP), this.getEdge(29, h.RIGHT), this.getEdge(30, h.RIGHT), this.getEdge(31, h.RIGHT)])
        },
        initBridges4Parcel: function () {
            this.BRIDGES4PARCEL[16] = [[24, h.LEFT], [24, h.RIGHT]];
            this.BRIDGES4PARCEL[17] = [[25, h.LEFT], [25, h.RIGHT]];
            this.BRIDGES4PARCEL[18] = [[26, h.LEFT]];
            this.BRIDGES4PARCEL[19] = [];
            this.BRIDGES4PARCEL[20] = [];
            this.BRIDGES4PARCEL[21] = [[29, h.RIGHT]];
            this.BRIDGES4PARCEL[22] = [[30, h.LEFT], [30, h.RIGHT]];
            this.BRIDGES4PARCEL[23] = [[31, h.LEFT], [31, h.RIGHT]];
            this.BRIDGES4PARCEL[27] = [[26, h.BOTTOM], [35, h.LEFT], [35, h.RIGHT]];
            this.BRIDGES4PARCEL[28] = [[29, h.BOTTOM], [36, h.LEFT], [36, h.RIGHT]];
            this.BRIDGES4PARCEL[32] = [[24, h.LEFT], [24, h.RIGHT]];
            this.BRIDGES4PARCEL[33] = [[34, h.TOP], [25, h.LEFT], [25, h.RIGHT]];
            this.BRIDGES4PARCEL[38] = [[37, h.TOP], [30, h.LEFT], [30, h.RIGHT]];
            this.BRIDGES4PARCEL[39] = [[31, h.LEFT], [31, h.RIGHT]];
            this.BRIDGES4PARCEL[41] = [];
            this.BRIDGES4PARCEL[42] = [[34, h.RIGHT]];
            this.BRIDGES4PARCEL[43] = [[35, h.LEFT], [35, h.RIGHT]];
            this.BRIDGES4PARCEL[44] = [[36, h.LEFT], [36, h.RIGHT]];
            this.BRIDGES4PARCEL[45] = [[37, h.LEFT]];
            this.BRIDGES4PARCEL[46] = []
        },
        parcelNearBridge: function (n) {
            if (!l(n, this.NEARRIVER)) return !1;
            this.BRIDGES4PARCEL.length || this.initBridges4Parcel();
            var t = !1;
            return this.BRIDGES4PARCEL[n].forEach(function (n) {
                !t && o.check4Road(n[0], n[1]) && (t = !0)
            }), t
        },
        setup: function () {
            var r, u, f, i, n;
            for (this.init(), t.state.getBasicData().getBuildings().set(0, this.MINE), t.state.getBasicData().getBuildings().set(1, this.RANCH), t.state.getBasicData().getBuildings().set(5, this.MINE), t.state.getBasicData().getBuildings().set(6, this.RANCH), r = this.getAvailable().slice(3), u = 2; u <= 4;) f = lt(w(this.RANCH, this.PRISON), r), r[f - 3] -= 1, t.state.getBasicData().getBuildings().set(u++, f);
            i = this.RIVER;
            do n = d() * 8 + d(); while (l(n, i));
            for (at(t.state.getBasicData().getTilesOnBoard(), [["Type", this.HOUSE], ["Parcel", n]]), i.push(n), h.all.forEach(function (t) {
                o.setRoad(n, t)
            }); t.state.getBasicData().getTilesOnBoard().length <= this.total[this.MOUNTAIN];) (n = d() * 8 + d(), l(n, i)) || (at(t.state.getBasicData().getTilesOnBoard(), [["Type", this.MOUNTAIN], ["Parcel", n]]), i.push(n))
        },
        getAvailable: function () {
            var n = this.total.slice(0), i;
            for (t.state.getBasicData().getBuildings().forEach(function (t) {
                n[t.get()] -= 1
            }), t.state.getBasicData().getTilesOnBoard().forEach(function (t) {
                n[t.get().getType()] -= 1
            }), i = 0; i < GameInfo.NumPlayers; i++) t.state.getPlayerData(i).getBuildings().forEach(function (t) {
                n[t.get()] -= 1
            });
            return n
        },
        getImg: function (n) {
            switch (n) {
                case this.MOUNTAIN:
                    return GameImagePath + "mountain.jpg";
                case this.HOUSE:
                    return GameImagePath + "house.jpg";
                case this.RANCH:
                    return GameImagePath + "ranch.jpg";
                case this.SALOON:
                    return GameImagePath + "saloon.jpg";
                case this.BANK:
                    return GameImagePath + "bank.jpg";
                case this.DRUGSTORE:
                    return GameImagePath + "drugstore.jpg";
                case this.HOTEL:
                    return GameImagePath + "hotel.jpg";
                case this.CHURCH:
                    return GameImagePath + "church.jpg";
                case this.MINE:
                    return GameImagePath + "mine.jpg";
                case this.PRISON:
                    return GameImagePath + "prison.jpg"
            }
        },
        parcel2dice: function (n) {
            return '<span class="help4parcel highlight4help" parcel=' + n + "><img class=die src=" + GameImagePath + "bdie" + Math.floor(n / 8) + ".gif><img class=die src=" + GameImagePath + "wdie" + n % 8 + ".gif><\/span>"
        },
        getEdge: function (n, t) {
            switch (t) {
                case h.RIGHT:
                case h.TOP:
                    return [n, t];
                case h.LEFT:
                    return o.hasBorder(n, h.LEFT) ? [n, h.LEFT] : [n - 1, h.RIGHT];
                case h.BOTTOM:
                    return o.hasBorder(n, h.BOTTOM) ? [n, h.BOTTOM] : [n + 8, h.TOP]
            }
        },
        setRoad: function (n, i) {
            var r = this.getEdge(n, i);
            t.state.getBasicData().getRoads(r[1]).getEdge().addElement().set(r[0])
        },
        check4Road: function (n, i) {
            var r = this.getEdge(n, i);
            return t.state.getBasicData().getRoads(r[1]).getEdge().contains(r[0])
        },
        getBuildingOnParcel: function (n) {
            for (var i = 0; i < t.state.getBasicData().getTilesOnBoard().length; i++) if (t.state.getBasicData().getTilesOnBoard(i).getParcel() === n) return t.state.getBasicData().getTilesOnBoard(i).getType();
            return this.NONE
        },
        isOccupied: function (n) {
            return this.getBuildingOnParcel !== this.NONE ? !0 : e.hasProperty(n)
        },
        hasBuilding: function (n, t, i) {
            return (tile = this.getBuildingOnParcel(n), i !== undefined && !l(e.getOwner(n), [undefined, i])) ? !1 : tile === this.NONE ? !1 : t === this.ANY ? !0 : t === undefined || t === this.BUILDING ? tile > this.HOUSE : tile === t
        },
        refillBuildings: function () {
            var i = yt(t.state.getBasicData().getBuildings()).filter(function (n) {
                return n !== 0
            }), r, n, u;
            if (!(i.length >= 7)) {
                for (r = this.getAvailable().slice(3), n = 0; n < 7 - i.length;) u = lt(w(this.RANCH, this.PRISON), r), r[u - 3] -= 1, t.state.getBasicData().getBuildings().set(n++, u);
                while (n < 7) t.state.getBasicData().getBuildings().set(n, i[n - 7 + i.length]), n++;
                this.show()
            }
        },
        setProperty: function (n) {
            t.state.getPlayerData(OnTurnIndex).getProperties().addElement().set(n);
            e.onTurn.showProperties()
        },
        isConnected: function (n) {
            var t = this.getBorders(n);
            return !t[h.LEFT] && (this.check4Road(n - 1, h.TOP) || this.check4Road(n - 1, h.BOTTOM)) ? !0 : !t[h.TOP] && (this.check4Road(n - 8, h.LEFT) || this.check4Road(n - 8, h.RIGHT)) ? !0 : !t[h.RIGHT] && (this.check4Road(n + 1, h.TOP) || this.check4Road(n + 1, h.BOTTOM)) ? !0 : !t[h.BOTTOM] && (this.check4Road(n + 8, h.LEFT) || this.check4Road(n + 8, h.RIGHT)) ? !0 : !1
        },
        getMissingRoads4Edge: function (n, i) {
            var r = [], u = this.getBorders(n);
            switch (i) {
                case h.TOP:
                    r.push(o.getEdge(n, h.LEFT));
                    r.push(o.getEdge(n, h.RIGHT));
                    u[h.LEFT] || r.push(o.getEdge(n - 1, h.TOP));
                    u[h.RIGHT] || r.push(o.getEdge(n + 1, h.TOP));
                    u[h.TOP] || (r.push(o.getEdge(n - 8, h.LEFT)), r.push(o.getEdge(n - 8, h.RIGHT)));
                    break;
                case h.RIGHT:
                    r.push(o.getEdge(n, h.TOP));
                    r.push(o.getEdge(n, h.BOTTOM));
                    u[h.TOP] || r.push(o.getEdge(n - 8, h.RIGHT));
                    u[h.BOTTOM] || r.push(o.getEdge(n + 8, h.RIGHT));
                    u[h.RIGHT] || (r.push(o.getEdge(n + 1, h.TOP)), r.push(o.getEdge(n + 1, h.BOTTOM)));
                    break;
                case h.LEFT:
                    r.push(o.getEdge(n, h.TOP));
                    r.push(o.getEdge(n, h.BOTTOM));
                    u[h.TOP] || r.push(o.getEdge(n - 8, h.LEFT));
                    u[h.BOTTOM] || r.push(o.getEdge(n + 8, h.LEFT));
                    u[h.LEFT] || (r.push(o.getEdge(n - 1, h.TOP)), r.push(o.getEdge(n - 1, h.BOTTOM)));
                    break;
                case h.BOTTOM:
                    r.push(o.getEdge(n, h.LEFT));
                    r.push(o.getEdge(n, h.RIGHT));
                    u[h.LEFT] || r.push(o.getEdge(n - 1, h.BOTTOM));
                    u[h.RIGHT] || r.push(o.getEdge(n + 1, h.BOTTOM));
                    u[h.BOTTOM] || (r.push(o.getEdge(n + 8, h.LEFT)), r.push(o.getEdge(n + 8, h.RIGHT)))
            }
            return r.filter(function (n) {
                return !t.state.getBasicData().getRoads(n[1]).getEdge().contains(n[0])
            })
        },
        hasBorder: function (n, t) {
            switch (t) {
                case h.TOP:
                    return n < 8;
                case h.BOTTOM:
                    return n >= 56;
                case h.LEFT:
                    return n % 8 == 0;
                case h.RIGHT:
                    return n % 8 == 7
            }
        },
        getBorders: function (n) {
            return borders = [], h.all.forEach(function (t) {
                borders[t] = o.hasBorder(n, t)
            }), borders
        },
        getNeighboringParcels: function (n) {
            var t = [], i = o.getBorders(n);
            return i[h.TOP] || (t.push(n - 8), i[h.LEFT] || t.push(n - 9), i[h.RIGHT] || t.push(n - 7)), i[h.LEFT] || t.push(n - 1), i[h.RIGHT] || t.push(n + 1), i[h.BOTTOM] || (t.push(n + 8), i[h.LEFT] || t.push(n + 8 - 1), i[h.RIGHT] || t.push(n + 8 + 1)), t
        },
        getNeighboringBuildings: function (n, t, i) {
            return this.getNeighboringParcels(n).filter(function (n) {
                return o.hasBuilding(n, t, i)
            }).length
        },
        getParcelsAround: function (n) {
            var i = 8, t = o.getBorders(n);
            return t[h.RIGHT] && i--, t[h.LEFT] && i--, t[h.TOP] && i--, t[h.BOTTOM] && i--, (t[h.RIGHT] || t[h.TOP]) && i--, (t[h.RIGHT] || t[h.BOTTOM]) && i--, (t[h.LEFT] || t[h.TOP]) && i--, (t[h.LEFT] || t[h.BOTTOM]) && i--, i
        },
        isBridge: function (n) {
            var t = !1;
            return this.BRIDGE.forEach(function (i) {
                t || i[0] !== n[0] || i[1] !== n[1] || (t = !0)
            }), t
        },
        getCost4property: function (n) {
            return 1 + (o.hasBuilding(n, o.ANY) ? 1 : 0) + this.getNeighboringBuildings(n, o.ANY)
        },
        hasIncome: function (n) {
            return l(n, [this.RANCH, this.SALOON, this.BANK, this.DRUGSTORE, this.HOTEL, this.MINE])
        },
        getIncome: function (n, t) {
            function i() {
                return o.getNeighboringBuildings(n, o.HOUSE, t) + o.getNeighboringBuildings(n, o.RANCH, t) + o.getNeighboringBuildings(n, o.CHURCH, t) + o.getNeighboringBuildings(n, o.HOTEL, t) * 2
            }

            var r = this.getBuildingOnParcel(n);
            if (!this.hasIncome(r)) return undefined;
            switch (r) {
                case this.RANCH:
                    return Math.max(1, this.getParcelsAround(n) - this.getNeighboringBuildings(n, o.ANY));
                case this.DRUGSTORE:
                    return (i() + e.get(t).cntBuildings(this.RANCH)) * 3;
                case this.MINE:
                    return this.getNeighboringBuildings(n, this.MOUNTAIN, t) * 3 + (l(n, o.NEARRIVER) ? 3 : 0);
                case this.BANK:
                    return (i() + e.get(t).cntBuildings(this.MINE)) * 3;
                case this.SALOON:
                    return i() * 5;
                case this.HOTEL:
                    return 6
            }
        },
        getCost4Building: function (n) {
            return [12, 10, 8, 6, 5, 4, 3][n]
        },
        showBuildings: function () {
            var n, i;
            for ($(".actioninfo").remove(), n = 1; n <= r.end(); n++) t.board.append($("<div/>", {
                "class": "actioninfo action pos" + n,
                title: n >= r.BUILDING1 && n <= r.BUILDING7 ? t.state.getBasicData().getBuildings(n - r.BUILDING1) ? u.get("actionbuilding", [u.s["building" + t.state.getBasicData().getBuildings(n - r.BUILDING1)], o.getCost4Building(n - r.BUILDING1)]) : "" : u.s["action" + n]
            }));
            for ($(".building").not(".handler").remove(), n = 0; n < 7; n++) i = t.state.getBasicData().getBuildings(n), i && t.board.append($("<img/>", {
                "class": "building action pos" + (r.BUILDING1 + n),
                src: this.getImg(i)
            }));
            t.state.getBasicData().getTilesOnBoard().forEach(function (n) {
                t.board.append($("<img/>", {
                    "class": "building parcel pos" + n.getParcel(),
                    src: o.getImg(n.getType())
                }))
            })
        },
        showRoads: function () {
            for (var n = 0; n < 4; n++) t.state.getBasicData().getRoads(n).getEdge().forEach(function (i) {
                var r = o.isBridge([i.get(n), n]);
                t.board.append($("<img/>", {
                    "class": "road " + (r ? "bridge " : "") + h.toString(n) + " pos" + i.get(),
                    src: GameImagePath + (r ? "bridge" : "road") + (n % 2 ? "" : "vertical") + ".gif"
                }))
            })
        },
        show: function () {
            this.showBuildings();
            this.showRoads();
            e.perform("showProperties");
            e.showCowboys()
        }
    }, c = {
        played: [], refilled: [], set: [], duelAction: undefined, setup: function () {
            if (GameInfo.NumPlayers == 2 || t.isNewBeginning()) e.ALL.forEach(function (n) {
                w(0, 5).forEach(function (i) {
                    t.state.getPlayerData(n).getDuelTiles().addElement().set(i)
                })
            }); else {
                var n = [r.SUMDUELTILES];
                stock = [];
                w(0, 5).forEach(function () {
                    stock.push(GameInfo.NumPlayers)
                });
                e.ALL.forEach(function (r) {
                    var f = 0, u;
                    for (i = 1; i <= 6; i++) u = lt(w(0, 5), stock), stock[u] -= 1, t.state.getPlayerData(r).getDuelTiles().addElement().set(u), f += u;
                    t.state.getPlayerData(r).setCoins(30 - f);
                    n.push(f)
                });
                f.add2Move(n)
            }
        }, init: function () {
            this.resetDuel();
            this.refilled = [];
            this.played = [];
            e.ALL.forEach(function () {
                c.played.push([]);
                c.refilled.push(!1)
            })
        }, getStock: function () {
            return stock = [], w(0, 5).forEach(function () {
                stock.push(GameInfo.NumPlayers)
            }), e.ALL.forEach(function (n) {
                t.state.getPlayerData(n).getDuelTiles().forEach(function (n) {
                    stock[n.get()] -= 1
                })
            }), stock
        }, resetDuel: function () {
            this.duelAction = undefined;
            this.set = []
        }, storeAction: function (n) {
            f.add2Move([r.SETUPDUEL, Math.floor(n / (r.END + 1)), n % (r.END + 1)])
        }, getAction: function () {
            return this.duelAction
        }, getPlayers: function () {
            var n = [];
            return this.set.forEach(function (t, i) {
                n.push(i)
            }), n
        }, getPlayersMissing: function (n) {
            var t = this.getPlayers();
            return n.filter(function (n) {
                return !l(n, t)
            })
        }, getTile4player: function (n) {
            var t = 0;
            return this.set.forEach(function (i, r) {
                r == n && (t = i)
            }), t
        }, check4refill: function (u) {
            var o, s, h;
            if (!t.state.getPlayerData(u).getDuelTiles().length || t.state.getPlayerData(u).isSniperRefill() && !(t.state.getPlayerData(u).getDuelTiles().length > 2)) {
                for (ci(t.state.getPlayerData(u).getDuelTiles()), o = this.getStock(), s = [], i = 1, n = e.get(u).isSniper() ? 5 : 3; i <= n; i++) h = lt(w(0, 5), o), o[h] -= 1, s.push(h);
                t.state.getPlayerData(u).unsetSniperRefill();
                s.sort().forEach(function (n) {
                    t.state.getPlayerData(u).getDuelTiles().addElement().set(n)
                });
                f.add2Move([r.DUELTILEREFILL, u])
            }
        }
    }, r = {
        PASS: 0,
        INCOME: 1,
        GUNS3: 2,
        ROADS3: 3,
        ROAD: 4,
        BUYPARCEL: 5,
        BUILDING1: 6,
        BUILDING2: 7,
        BUILDING3: 8,
        BUILDING4: 9,
        BUILDING5: 10,
        BUILDING6: 11,
        BUILDING7: 12,
        BUILD0: 13,
        BUILD1: 14,
        BUILD2: 15,
        BUILD3: 16,
        BUILD4: 17,
        INCOMEPARCELS: 18,
        INCOMEGUNS: 19,
        INCOMEDICE: 20,
        INCOMEBUILDINGS0: 21,
        INCOMEBUILDINGS1: 22,
        INCOMEBUILDINGS2: 23,
        INCOMEBUILDINGS3: 24,
        INCOMEBUILDINGS4: 25,
        POINTSPARCELS: 26,
        POINTSGUNS: 27,
        POINTSBUILDINGS: 28,
        POINTS5: 29,
        POINTS4: 30,
        POINTS3: 31,
        POINTS2: 32,
        END: 32,
        SETPROPERTY: 33,
        CHOOSEPERSON: 34,
        RESOURCES: {COIN: 0, POINT: 1, COWBOY: 2, GUN: 3, ROAD: 4},
        GETRESOURCES: 35,
        BUYRESOURCES: 36,
        SETONPARCEL: 37,
        AUTOPASS: 38,
        BUILDROAD: 39,
        ENDMERCENARY: 40,
        ENDGUNS3: 41,
        DUEL: 42,
        ACTIONPERSON: 43,
        CHURCH: 44,
        SUMDUELTILES: 45,
        INFLUENCE: 46,
        SETUPDUEL: 47,
        DUELTILE: 48,
        DUELTILEREFILL: 49,
        ASKINGHOUSE: 50,
        BUILDROAD0: 60,
        BUILDROAD1: 61,
        BUILDROAD2: 62,
        BUILDROAD3: 63,
        BUILDROAD4: 64,
        FORFEIT: 70,
        TOOCOSTLY: 71,
        TOSTOCK: 72,
        end: function () {
            return this.POINTS2 - t.state.getBasicData().getRound() + 1
        },
        actionIsGeneral: function (n) {
            return n === this.BUYPARCEL || this.BUILD0 <= n && n <= this.BUILD4 || this.INCOMEBUILDINGS0 <= n && n <= this.INCOMEBUILDINGS4
        },
        actionIsIncomeBuilding: function (n) {
            return this.INCOMEBUILDINGS0 <= n && n <= this.INCOMEBUILDINGS4
        },
        runThroughActions: function () {
            var n, i, e, r, s;
            for (f.state = f.STATE.START, $(".handler").remove(), n = t.state.getBasicData().getCurrentAction(); n <= this.end(); n++) {
                if (this.BUILD0 <= n && n <= this.BUILD4) {
                    if (i = n - this.BUILD0, i > GameInfo.NumPlayers - 1) continue;
                    if (i = t.state.getBasicData().getPassed(i), e = t.state.getPlayerData(i), !e.getBuildings().length) continue;
                    if (r = !1, e.getProperties().forEach(function (n) {
                        r || o.hasBuilding(n.get(), o.ANY) || (r = !0)
                    }), !r) continue;
                    this.handleGeneralBuildAction(i)
                } else if (n === this.BUYPARCEL || this.actionIsIncomeBuilding(n)) {
                    while (this.handleGeneralAction(n)) if (f.state !== f.STATE.START) break
                } else {
                    if (s = this.getCowboys4action(n), !s.length) continue;
                    this.handleAction(n, s)
                }
                if (f.state !== f.STATE.START || t.phase() !== t.PHASE.ACTIONS) {
                    u.info;
                    break
                }
            }
            t.state.getBasicData().setCurrentAction(n);
            a.update();
            n > this.end() && (f.state = f.STATE.END, t.doPhaseEnd())
        },
        getCowboys4action: function (n, i) {
            var r = [], u = t.state.getBasicData().getSheriffSetOn();
            return u === n && r.push(e.getPlayerWithPerson(s.SHERIFF)), t.state.getBasicData().getCowboysOnBoard().forEach(function (t) {
                n === t.getAction() && r.push(t.getPlayer())
            }), i ? r : r.sort()
        },
        handleGeneralBuildAction: function (n) {
            if (n !== OnTurnIndex) return this.requestNextPlayer(n);
            f.state = f.STATE.BUILD;
            var i = [[99, u.s.buildNothing]];
            t.state.getPlayerData(n).getBuildings().forEach(function (n, t) {
                i.push([t, u.s["building" + n.get()]])
            });
            p.options(u.s.buildFromStock, {
                html: $("<div/>", {html: u.s.choose2build}),
                options: i,
                checked: 99,
                perform: function (i) {
                    i == 99 ? (t.state.getBasicData().addToCurrentAction(1), r.runThroughActions()) : t.handleBuild(t.state.getPlayerData(n).getBuildings(i))
                }
            })
        },
        handleGeneralAction: function (n) {
            var c = this.generalActionGetDuels(n), v, i, a;
            if (c.length) return c.length === 1 ? (v = c[0], this.handleDuel(v.shift() + r.END + 1, v)) : (t.phase(t.PHASE.DUELSEQUENCE), OnTurnIndex !== t.state.getBasicData().getPassed(0)) ? this.requestNextPlayer(t.state.getBasicData().getPassed(0)) : (t.handleChooseDuel(c, n), !1);
            if (n === this.BUYPARCEL) {
                if (c = this.getCowboys4GeneralAction(n), !c.length) return !1;
                var i = c[0][1], h = c[0][0], l = o.getCost4property(h);
                return l > t.state.getPlayerData(i).getCoins() ? (f.add2Move([r.TOOCOSTLY, n, i, t.state.getPlayerData(i).getCoins(), l, h]), e.get(i).returnCowboy(h + r.END + 1, !0), !0) : i !== OnTurnIndex ? this.requestNextPlayer(i) : (f.state = f.STATE.BUYPARCEL, t.board.append($("<div/>", {"class": "parcel highlight pos" + h})), p.yesNo(u.s["action" + r.BUYPARCEL + "title"], $("<div/>", {html: u.get("buyParcel", [o.parcel2dice(h), l, t.state.getPlayerData(OnTurnIndex).getCoins()])}), [function () {
                    t.state.getPlayerData(OnTurnIndex).addToCoins(-l);
                    o.setProperty(h);
                    f.add2Move([r.BUYPARCEL, h, l])
                }, function () {
                    f.add2Move([r.BUYPARCEL, r.FORFEIT, h])
                }], function () {
                    $(".parcel.highlight.pos" + h).remove();
                    e.onTurn.returnCowboy(h + r.END + 1, !0);
                    f.state = f.STATE.END;
                    r.runThroughActions()
                }), e.onTurn.returnCowboy(n, !0), !0)
            }
            if (i = n - this.INCOMEBUILDINGS0, i > GameInfo.NumPlayers - 1) return !1;
            if (i = t.state.getBasicData().getPassed(i), t.state.getBasicData().isRed(s.GROCER) || (t.state.getPlayerData(i).getCharacter() != s.GROCER || t.state.getPlayerData(i).isPersonUsed()) && (e.get(i).nephew[0] != s.GROCER || t.state.getPlayerData(i).isNephewUsed())) this.getIncome(i); else if (c = t.state.getPlayerData(i).getBuildings(), a = [[70, u.s.chooseGrocer8]], e.get(i).listBuildings().forEach(function (n, t) {
                t !== undefined && t > o.HOUSE && a.unshift([t, u.s["buildingtype" + t]])
            }), a.length > 1) {
                if (i != OnTurnIndex) return this.requestNextPlayer(i);
                f.state = f.STATE.CHARACTERACTION;
                p.options(u.get("actionPersonality", [u.s["person" + s.GROCER]]), {
                    html: $("<div/>", {html: u.s.ask4grocer}),
                    options: a,
                    checked: 70,
                    perform: function (n) {
                        f.add2Move([r.ACTIONPERSON, s.GROCER, n]);
                        n == 70 && t.state.getPlayerData(OnTurnIndex).addToCoins(8);
                        r.getIncome(i, n);
                        t.state.getBasicData().addToCurrentAction(1);
                        r.runThroughActions()
                    }
                })
            } else this.getIncome(i, 70);
            return !1
        },
        getIncome: function (n, i) {
            t.state.getPlayerData(n).getProperties().forEach(function (u) {
                var h = o.getIncome(u.get(), n), s, l, c;
                h && (i !== undefined && i != 99 && o.getBuildingOnParcel(u.get()) == i && (h *= 2), s = e.getCowboyOnTile(u.get()), l = s !== undefined && s != n, l && (c = Math.floor(h / 2), t.state.getPlayerData(s).addToCoins(c), f.add2Move([r.INCOMEBUILDINGS0, u.get(), s, c]), h -= c), t.state.getPlayerData(n).addToCoins(h), s !== undefined && e.get(s).returnCowboy(u.get() + r.END + 1, !0), f.add2Move([r.INCOMEBUILDINGS0, u.get(), n, Math.min(78, h)]))
            })
        },
        handleAction: function (n, i) {
            var h, y, c, l, v, a;
            switch (n) {
                case this.INCOME:
                    i.forEach(function (i) {
                        t.state.getPlayerData(i).addToCoins(4);
                        e.get(i).returnCowboy(n, !0);
                        f.add2Move([n, i])
                    });
                    return;
                case this.ROAD:
                    i.forEach(function (i) {
                        t.state.getPlayerData(i).addToRoads(1);
                        e.get(i).returnCowboy(n, !0);
                        f.add2Move([n, i])
                    });
                    return
            }
            if (i.length > 1) {
                this.handleDuel(n, i);
                return
            }
            h = i[0];
            switch (n) {
                case this.GUNS3:
                    t.state.getPlayerData(h).addToGuns(3);
                    t.state.getPlayerData(h).setGuns3(!0);
                    f.add2Move([n, h]);
                    break;
                case this.ROADS3:
                    t.state.getPlayerData(h).addToRoads(3);
                    f.add2Move([n, h]);
                    break;
                case this.BUILDING1:
                case this.BUILDING2:
                case this.BUILDING3:
                case this.BUILDING4:
                case this.BUILDING5:
                case this.BUILDING6:
                case this.BUILDING7:
                    if (y = o.getCost4Building(n - this.BUILDING1), t.state.getBasicData().isRed(s.CHINESE) || t.state.getPlayerData(h).getCharacter() !== s.CHINESE || (y = Math.ceil(y / 2)), y > t.state.getPlayerData(h).getCoins()) f.add2Move([r.TOOCOSTLY, n, h, t.state.getPlayerData(h).getCoins(), y]); else {
                        if (h !== OnTurnIndex) return this.requestNextPlayer(h);
                        t.handleBuild(t.state.getBasicData().getBuildings(n - r.BUILDING1), n, y)
                    }
                    break;
                case this.INCOMEPARCELS:
                    c = 2 * t.state.getPlayerData(h).getProperties().length;
                    t.state.getPlayerData(h).addToCoins(c);
                    f.add2Move([n, h, c]);
                    break;
                case this.INCOMEGUNS:
                    c = 2 * (t.state.getPlayerData(h).getGuns() + e.get(h).getCowboys());
                    t.state.getPlayerData(h).addToCoins(c);
                    f.add2Move([n, h, c]);
                    break;
                case this.INCOMEDICE:
                    if (o.show(), it && !confirm(u.s.noUndoIncomeDice)) {
                        f.state = f.STATE.FORCEEND;
                        return
                    }
                    c = d() * 7 + d();
                    t.state.getPlayerData(h).addToCoins(Math.floor(c / 7) + c % 7);
                    f.add2Move([n, h, c]);
                    e.get(h).returnCowboy(n, !0);
                    et();
                    break;
                case this.POINTSPARCELS:
                    l = Math.floor(t.state.getPlayerData(h).getProperties().length / 2);
                    e.get(h).addPts(l);
                    f.add2Move([n, h, l]);
                    break;
                case this.POINTSGUNS:
                    l = Math.floor((t.state.getPlayerData(h).getGuns() + e.get(h).getCowboys()) / 2);
                    e.get(h).addPts(l);
                    f.add2Move([n, h, l]);
                    break;
                case this.POINTSBUILDINGS:
                    l = e.get(h).cntBuildings();
                    e.get(h).addPts(l);
                    f.add2Move([n, h, l]);
                    break;
                case this.POINTS5:
                case this.POINTS4:
                case this.POINTS3:
                case this.POINTS2:
                    if (h !== OnTurnIndex) return this.requestNextPlayer(h);
                    f.state = f.STATE.BUYPOINTS;
                    v = e.onTurn.getCashLimit();
                    a = t.state.getPlayerData(OnTurnIndex).getCoins();
                    p.options(u.s.buyPointsTitle, {
                        html: $("<div/>", {html: u.get(a > v ? "buyPointsExceedsLimit" : "buyPoints", [this.POINTS5 + 5 - n, a, a > v ? a - v : v]) + "<br><br>"}),
                        perform: function () {
                            var i = $("select.buyPoints").val() * 1;
                            e.onTurn.addPts(i);
                            i > 0 && t.state.getPlayerData(OnTurnIndex).addToCoins(-(i * (r.POINTS5 + 5 - n)));
                            e.onTurn.returnCowboy(n, !0);
                            f.add2Move([n, OnTurnIndex, i]);
                            e.updateView(OnTurnIndex);
                            r.runThroughActions()
                        },
                        init: function () {
                            for (var f = "<select class=buyPoints>", i = 0, e = Math.floor(a / (r.POINTS5 + 5 - n)); i <= e; i++) f += "<option value=" + i + ">" + i + "<\/options>";
                            $(".dialog").append($(f + "<select/>")).append("<span>" + u.get("buy4$", ["<span class=spendDollar>0<\/span>", "<span class=dollarLeft>" + a + "<\/span>", "<span class=dollarLimit>" + v + "<\/span>"]) + "<\/span>");
                            $("select.buyPoints").change(function () {
                                $("span.spendDollar").text($("select.buyPoints").val() * (r.POINTS5 + 5 - n));
                                $("span.dollarLeft").text(a - $("span.spendDollar").text() * 1)
                            });
                            $("select.buyPoints").val(Math.max(0, Math.floor((a - (t.state.getBasicData().getRound() < 4 ? v : 0)) / (r.POINTS5 + 5 - n))));
                            $("select.buyPoints").trigger("change")
                        }
                    })
            }
            f.state === f.STATE.START && n !== this.INCOMEDICE && e.get(h).returnCowboy(n, !0)
        },
        requestNextPlayer: function (n) {
            return t.state.getBasicData().setNextPlayer(n), f.state = f.STATE.FORCEEND, !1
        },
        getCowboys4GeneralAction: function (n) {
            var i = [], u = t.state.getBasicData().getSheriffSetOn();
            return u > 0 && (i[u - r.END - 1] = [u - r.END - 1, e.getPlayerWithPerson(s.SHERIFF)]), t.state.getBasicData().getCowboysOnBoard().forEach(function (t) {
                var u = t.getAction() - r.END - 1;
                u >= 0 && (n === r.BUYPARCEL && !e.hasProperty(u) || r.actionIsIncomeBuilding(n) && o.hasBuilding(u)) && (i[u] === undefined && (i[u] = [u]), i[u].push(t.getPlayer()))
            }), i.filter(function () {
                return !0
            }).sort(function (n, t) {
                return n[1] === t[1] ? n[0] - t[0] : n[1] === OnTurnIndex ? -1 : t[1] === OnTurnIndex ? 1 : n[0] - t[0]
            })
        },
        generalActionGetDuels: function (n) {
            return this.getCowboys4GeneralAction(n).filter(function (n) {
                return n.length > 2
            })
        },
        handleDuel: function (n, i) {
            if (n === undefined && (n = c.getAction()), c.getAction() && c.getAction() == n || c.storeAction(n), i = i || this.getCowboys4action(n), f.state = f.STATE.DUEL, n > this.END ? t.board.append($("<div/>", {"class": "chooseDuel highlight parcel pos" + (n - this.END - 1)})) : t.board.append($("<div/>", {"class": "chooseDuel highlight action pos" + n})), t.isMightIsRight()) {
                t.phase(t.PHASE.DUEL);
                t.state = new yucataGame.Status(t.state.getStatusString(), t.statusdef);
                var o = c.getPlayersMissing(i);
                if (o.length && (o.forEach(function (n) {
                    t.state.getPlayerData(n).getDuelTiles().length == 1 && (f.add2Move([r.DUELTILE, n, t.state.getPlayerData(n).getDuelTiles(0)]), t.state.getPlayerData(n).getDuelTiles().removeElement(0))
                }), o = c.getPlayersMissing(i)), o.length) {
                    l(OnTurnIndex, o) ? (t.state = new yucataGame.Status(t.state.getStatusString(), t.statusdef), f.state = f.STATE.DUELTILE, p.options(u.s.chooseDuelTile, {
                        onOpen: function (n) {
                            function i() {
                                $("img").removeClass("checked");
                                $(this).addClass("checked")
                            }

                            n.addClass("highlight").dialog("option", "width", "300");
                            t.state.getPlayerData(OnTurnIndex).getDuelTiles().forEach(function (t, r) {
                                n.append($("<img/>", {
                                    name: "options",
                                    value: r,
                                    "class": "dueltile" + (r ? "" : " checked"),
                                    src: GameImagePath + "duel" + t.get() + ".gif"
                                }).click(i))
                            })
                        }, perform: function (n) {
                            f.add2Move([r.DUELTILE, OnTurnIndex, t.state.getPlayerData(OnTurnIndex).getDuelTiles(n)]);
                            t.state.getPlayerData(OnTurnIndex).getDuelTiles().removeElement(n);
                            e.onTurn.isSniper() && t.state.getPlayerData(OnTurnIndex).getDuelTiles().length <= 2 && p.yesNo(u.s.sniper, $("<div/>", {html: u.s.sniperRefill}), [function () {
                                t.state.getPlayerData(OnTurnIndex).setSniperRefill()
                            }, function () {
                                t.state.getPlayerData(OnTurnIndex).unsetSniperRefill()
                            }]);
                            a.enableGameControllers()
                        }
                    })) : t.getNextPlayerOnline(o);
                    return
                }
            }
            $("#duelBtn").remove();
            $("#" + BtnFinishTurnID).before($('<input id="duelBtn" class="button removeOnUndo" type="button" value="' + u.s.startDuel + '" style="z-index: 5002; margin-left: 10px;padding-left: 25px;background-image:url(' + GameImagePath + 'gunBtn.png); background-repeat:no-repeat;background-position:5px">').hover(function () {
                u.info("startDuelInfo")
            }, function () {
                u.info()
            }).click(function () {
                r.startDuel(n, i)
            }))
        },
        startDuel: function (n, i) {
            var v, h, o, p, a, y;
            (!it || confirm(u.s.noUndo)) && (t.phase(t.PHASE.ACTIONS), v = [], h = [], i.forEach(function (n, i) {
                var u = t.isMightIsRight() ? c.getTile4player(n) : d() + (e.get(n).isSniper() ? d() * 7 : 0),
                    r = [t.state.getPlayerData(n).getGuns(), e.get(n).getCowboys(), u];
                h[i] = r.slice(0);
                r[2] > 6 && (r[2] = Math.max(r[2] % 7, Math.floor(r[2] / 7)));
                v[i] = ot(r)
            }), o = 0, i.forEach(function (n, r) {
                if (r) if (v[r] > v[o]) o = r; else if (v[r] === v[o]) {
                    var u = !1;
                    t.state.getBasicData().getPassed().forEach(function (t) {
                        u || (u = l(t.get(), [n, i[o]]), t.get() === n && (o = r))
                    })
                }
            }), p = i.filter(function (n, t) {
                return t != o
            }), p.forEach(function (t) {
                e.get(t).returnCowboy(n, !1)
            }), a = [r.DUEL, i.length, i[o], h[o][0], h[o][1]], t.isMightIsRight() || a.push(h[o][2]), i.forEach(function (n, i) {
                i !== o && (a.push(n), a.push(h[i][0]), a.push(h[i][1]), t.isMightIsRight() || a.push(h[i][2]))
            }), f.add2Move(a), y = e.getPlayerWithPerson(s.SHERIFF), y !== undefined && t.state.getBasicData().isRed(s.SHERIFF) && l(y, p) && (e.get(y).addPts(3), f.add2Move([r.ACTIONPERSON, s.SHERIFF, y])), i.forEach(function (n) {
                c.check4refill(n)
            }), et(), e.showCowboys(), $(".chooseDuel.highlight").remove(), $("#duelBtn").remove(), this.runThroughActions())
        },
        getImg4action: function (n) {
            var i;
            switch (n) {
                case r.BUILDING1:
                case r.BUILDING2:
                case r.BUILDING3:
                case r.BUILDING4:
                case r.BUILDING5:
                case r.BUILDING6:
                case r.BUILDING7:
                    return o.getImg(t.state.getBasicData().getBuildings(n - r.BUILDING1));
                default:
                    i = "infoaction" + n
            }
            return GameImagePath + i + ".jpg"
        }
    }, v = {
        data: [[], [], [[0, 1], [1, 0]], [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]], [[0, 1, 2, 3], [0, 1, 3, 2], [0, 2, 1, 3], [0, 2, 3, 1], [0, 3, 1, 2], [0, 3, 2, 1], [1, 0, 2, 3], [1, 0, 3, 2], [1, 2, 0, 3], [1, 2, 3, 0], [1, 3, 0, 2], [1, 3, 2, 0], [2, 0, 1, 3], [2, 0, 3, 1], [2, 1, 0, 3], [2, 1, 3, 0], [2, 3, 0, 1], [2, 3, 1, 0], [3, 0, 1, 2], [3, 0, 2, 1], [3, 1, 0, 2], [3, 1, 2, 0], [3, 2, 0, 1], [3, 2, 1, 0]]],
        isStartPlayer: function (n) {
            return n == undefined && (n = OnTurnIndex), n == this.getTO()[0]
        },
        isLastPlayer: function (n) {
            return n == undefined && (n = OnTurnIndex), n == this.getTO()[GameInfo.NumPlayers - 1]
        },
        getNextPlayer: function (n, t) {
            var i, r, u;
            if (n == undefined && (n = OnTurnIndex), i = this.getTO(), t) {
                for (r = i.length - 1; r > 0; r--) if (i[r] == n) return i[r - 1];
                return i[i.length - 1]
            }
            for (r = 0, u = i.length - 1; r < u; r++) if (i[r] == n) return i[r + 1];
            return i[0]
        },
        getNextPlayerNotPassed: function (n) {
            for (var i = this.getNextPlayer(n); t.state.getBasicData().getPassed().contains(i);) i = this.getNextPlayer(i);
            return i
        },
        getTO4player: function (n) {
            for (var i = this.getTO(), t = 0, r = i.length; t < r; t++) if (i[t] == n) return t;
            return 0
        },
        getTO: function (n) {
            if (n = n == undefined ? t.state.getBasicData().getTO == undefined ? 0 : t.state.getBasicData().getTO() : n, GameInfo.NumPlayers > 4) {
                var i = this.data[4][n % 24].slice(0), r = Math.floor(n / 24);
                return r < 4 && (i = i.map(function (n) {
                    return n == r ? 4 : n
                })), i.push(r), i
            }
            return this.data[GameInfo.NumPlayers].length <= n || n < 0 ? (alert("error in getTO: no valid nr (" + n + ") for " + GameInfo.NumPlayers + " players"), w(0, GameInfo.NumPlayers - 1)) : this.data[GameInfo.NumPlayers][n].slice(0)
        },
        setTO: function (n) {
            t.state.getBasicData().setTO(this.zipTO(n))
        },
        zipTO: function (n) {
            var n = n.slice(0), r = this.data[Math.min(4, GameInfo.NumPlayers)].slice(0), t = 0, i, u;
            for (GameInfo.NumPlayers > 4 && (t = n.pop(), t < 4 && (n = n.map(function (n) {
                return n == 4 ? t : n
            }))), n = n.join(), i = 0, u = r.length; i < u; i++) if (r[i].join() == n) return i + t * 24;
            return GameInfo.NumPlayers > 4 && n.push(t), alert("error in zipTO: no valid nr (" + n + ") for " + GameInfo.NumPlayers + " players"), 0
        }
    };
    var f = {
        state: null,
        info: undefined,
        restored: !1,
        stored: !1,
        lastPhase: undefined,
        currentLastPhase: undefined,
        historyOnTurn: undefined,
        animate: !1,
        setSidePerson: [],
        character: [],
        nephew: [],
        isRed: [],
        endscoringDone: !1,
        sumDuelTiles: [],
        duelTilesPlayed: [],
        asking4house: undefined,
        asked4house: [],
        STATE: {
            COLOR: "C",
            START: "S",
            PERSON: "O",
            ASKUSENEPOTISM: "U",
            CHARACTERACTION: "H",
            DUEL: "D",
            DUELTILE: "T",
            SETPROPERTY: "P",
            BUYPARCEL: "Y",
            BUYBUILDING: "B",
            BUILD: "L",
            BUYPOINTS: "N",
            RESTORE: "R",
            END: "E",
            FORCEEND: "F",
            DONE: "X"
        },
        CHANGEPHASE: 79,
        init: function () {
            this.info = [];
            this.state = null;
            this.restored = !1;
            this.stored = !1;
            this.sumDuelTiles = [];
            this.duelTilesPlayed = [];
            this.asked4house = [];
            this.asking4house = undefined;
            this.endscoringDone = !1;
            this.setSidePerson = [];
            this.character = [];
            this.isRed = [];
            s.ALL.forEach(function () {
                f.isRed.push(0)
            });
            this.nephew = []
        },
        checkIfDone: function () {
            return t.phase() === t.PHASE.END ? !0 : (l(this.state, [this.STATE.END, this.STATE.FORCEEND]) && t.doMoveEnd(), this.isDone())
        },
        isDone: function () {
            return this.state === this.STATE.DONE
        },
        canFinish: function () {
            return this.checkIfDone() || l(t.phase(), [t.PHASE.BUILDROADS, t.PHASE.BUILDROADSEND])
        },
        finishing: !1,
        finish: function () {
            !this.finishing && (this.isDone() || l(t.phase(), [t.PHASE.BUILDROADS, t.PHASE.BUILDROADSEND])) && (this.finishing = !0, l(t.phase(), [t.PHASE.PERSON, t.PHASE.PLACE]) && o.refillBuildings(), t.phase() === t.PHASE.SIDEPERSON && t.nextChooseSide(), t.phase() === t.PHASE.NEWBEGINNING && t.nextNewBeginning(), t.phase() === t.PHASE.ASKEDHOUSE && t.submitAsk4house(), t.phase() === t.PHASE.BUILDROADSEND && t.doPhaseEnd(), ri())
        },
        restoreMove: function () {
            this.restored = !0;
            f.state = f.STATE.START
        },
        storeMove: function () {
            this.stored = !0
        },
        characterIsRed: function (n) {
            return f.isRed[n]
        },
        halfChinese: function (n) {
            return f.isRed[s.CHINESE] ? 1 : f.character[n] === s.CHINESE ? 0 : f.nephew[n] === s.CHINESE ? 0 : 1
        },
        storeValuesAtMoveStart: function () {
            this.duelTilesSet = c.set.slice(0)
        },
        restoreValuesFromMoveStart: function () {
            c.set = this.duelTilesSet.slice(0)
        },
        setupMoveRecording: function () {
            var n, i, r;
            for (y.stop(), $("#moveInfo").remove(), n = $("<div/>", {
                id: "moveInfo",
                title: u.s.moveInfo
            }).dialog({
                autoOpen: !0,
                resizable: !1,
                draggable: !1,
                closeOnEscape: !1,
                dialogClass: "widgetMoveInfo",
                stack: !1,
                open: function () {
                    $("img.openInfoMove").css("visibility", "hidden");
                    $(".widgetMoveInfo .ui-widget-header").css("background-image", "url(" + GameImagePath + "ui-dialog.png)")
                },
                close: function () {
                    $("img.openInfoMove").css("visibility", "visible")
                }
            }), n.dialog("widget").addClass("noX-Icon").appendTo("#playerOverview"), $("#playerOverview").append($("<img>", {
                "class": "openInfoMove",
                src: BaseImagePath + "c/lastmove.png"
            }).click("mouseenter", function () {
                $("#moveInfo").dialog("open")
            })), this.lastPhase = undefined, this.currentLastPhase = undefined, this.replayMove = 0, i = 0, r = IsHistory && moveNr ? moveNr : HistoryMove.length; i < r; i++) f.animate = !1, f.decode(i, vt(HistoryMove[i]), player = f.getPlayer4moveNr(i + 1), n);
            this.storeValuesAtMoveStart();
            t.hasEnded() && !f.endscoringDone && moveNr == HistoryMove.length && HistoryMove.length && $("#moveInfo").append($("<div/>", {html: u.s.quit}));
            y.setCallback(function () {
                f.animate = !1;
                n.scrollTop(n.get(0).scrollHeight)
            });
            t.isActive() ? $("#replay").click(function () {
                if ($("#replay").attr("replay")) y.stop(); else {
                    f.animate = !0;
                    for (var t = f.replayMove + 1, i = HistoryMove.length; t < i; t++)
                        f.decode(t, vt(HistoryMove[t]),
                            player = f.getPlayer4moveNr(t + 1));
                    $("#replay").attr("replay", 1);
                    $("#replay").attr("src", GameImagePath + "lastmove.png");
                    y.setCallback(function () {
                        f.animate = !1;
                        n.scrollTop(n.get(0).scrollHeight);
                        $("#replay").attr("src", BaseImagePath + "c/lastmove.png");
                        $("#replay").removeAttr("replay")
                    });
                    y.play()
                }
            }) : $("#replay").css("visibility", "hidden");
            y.play();
            e.updateView();
            a.enable()
        },
        decode: function (n, i, r, o) {
            var s = $("<div/>", {"class": "moveInfo", css: {"border-color": e.get(r).getColor()}}), h, c;
            n === undefined ? s.addClass("currentMove") : r == UserIndex && t.isActive() && f.replayMove < n && (f.replayMove = n);
            o !== undefined && o.append(s);
            s.append($("<div/>", {
                "class": "title",
                html: n === undefined ? u.s.currentMove : u.get("move", [n + 1]) + e.get(r).getName(),
                css: {"background-color": e.get(r).getColor()}
            }));
            n === undefined && (this.currentLastPhase = this.lastPhase);
            h = si(i, this.CHANGEPHASE);
            c = h.length - 1;
            h.forEach(function (t, i) {
                f.decodeSection(n, i === 0, t, r, s, o === undefined)
            })
        },
        decodeSection: function (n, i, h, a, v, p) {
            function wt(n, i, r, u) {
                return "<span>" + i + "<\/span><img class=die src=" + GameImagePath + "gunBtn.png><span> + " + r + "<\/span><img class=die src=" + GameImagePath + "meeple" + e.get(n).getColorIdx() + ".gif><span> + <\/span>" + (t.isMightIsRight() ? u + "<img class=die src=" + GameImagePath + "duelback.gif>" : "<img class=die src=" + GameImagePath + "bdie" + u % 7 + ".gif>" + (u > 6 ? "<img class=die src=" + GameImagePath + "wdie" + Math.floor(u / 7) + ".gif>" : "")) + " = " + (i + r + Math.max(u % 7, Math.floor(u / 7)))
            }

            var b, et, ut, w, ft, d, vt, st, lt, ht, nt, yt, tt, g, rt, it, k;
            if (p = !1, b = h.shift(), b == r.SUMDUELTILES && (c.sum = [], v.append($("<div/>", {
                "class": "neutral",
                html: u.s.phaseDuelTiles
            })), e.ALL.forEach(function (n) {
                var t = h.shift();
                v.append($("<div/>", {
                    "class": "neutral",
                    html: u.get("initDuelTiles", [e.get(n).getName(), t, 30 - t])
                }));
                c.sum.push(t)
            }), b = h.shift()), b = hi(b), p || b == this.currentLastPhase || (this.currentLastPhase = b, v.append($("<div/>", {
                "class": "neutral",
                html: u.s["phase" + b]
            })), b == t.PHASE.PERSON && (f.nephew = [], $(".personalities .isused").remove(), e.data.forEach(function (n, i) {
                n.nephew[0] != s.NONE && t.state.getPlayerData(i).setNephewUsed();
                $(".personalities .marker.pos" + n.nephew[0]).remove();
                n.nephew[0] = s.NONE
            }))), n !== undefined && (this.lastPhase = this.currentLastPhase), b == t.PHASE.ASKHOUSE && this.asking4house && this.asking4house[0] !== a) {
                for (this.asked4house[a] === undefined && (this.asked4house[a] = []); h.length;) g = h.shift(), this.asked4house[a].push(g), v.append($("<div/>", {html: u.get("ask4houseAllowed", [o.parcel2dice(g)])}));
                this.asked4house[a].length || v.append($("<div/>", {html: u.s.ask4houseNoneAllowed}))
            }
            if (h.length) {
                if (b == t.PHASE.NEWBEGINNING) {
                    et = h.shift();
                    e.get(et).setNewBeginning(h.shift(), h.shift(), h.shift(), h.shift(), h.shift(), [0, -10, -5, 5, 10][h.shift()], h.shift(), h.shift(), h.shift(), h.shift());
                    h.length && (e.setStartPlayer(h.shift()), e.showNewBeginning(v));
                    return
                }
                if (b == t.PHASE.SIDEPERSON) {
                    et = h.shift();
                    f.setSidePerson[et] = [h.shift(), h.shift(), h.shift(), h.shift(), h.shift(), h.shift(), h.shift()];
                    h.length && (v.append($("<div/>", {
                        "class": "neutral",
                        html: u.s.chooseSidePersonTitle
                    })), s.ALL.forEach(function (n) {
                        var t = [], i;
                        e.data.forEach(function (i) {
                            t.push(i.getName() + " " + u.s["side" + f.setSidePerson[i.idx][n]])
                        });
                        t = t.join(", ");
                        i = h.shift();
                        i == 2 && (i = h.shift(), t += " &rarr; <img class=die src=" + GameImagePath + "bdie" + i + ".gif>");
                        v.append($("<div/>", {
                            "class": "neutral",
                            html: u.s["person" + n] + " " + u.s["side" + i % 2] + ": " + t
                        }))
                    }));
                    return
                }
                if (b == t.PHASE.PLACE) while (h.length) if (y.addMove(r.SETONPARCEL, a, h.slice(0)), ut = h.shift(), ut == r.PASS) v.append($("<div/>", {html: u.s.passed})); else if (ut == r.AUTOPASS) v.append($("<div/>", {
                    "class": "neutral",
                    html: u.get("autopass", [e.get(h.shift()).getName()]),
                    css: {"border-color": "grey"}
                })); else if (ut <= r.END) v.append($("<div/>", {html: u.get("cowboySetOnAction", [u.s["actionsquare" + ut], u.s["isSheriff" + h.shift()]])})); else {
                    var g = o.parcel2dice(h.shift()), ct = h.shift(), at = "cowboySetOnParcel";
                    Math.floor(ct / 2) && (at = Math.floor(ct / 4) ? "cowboySetToAttack" : "cowboySetToDefend");
                    v.append($("<div/>", {html: u.get(at, [g, u.s["isSheriff" + ct % 2]])}))
                }
                if (b == t.PHASE.CASHLIMIT) while (h.length) k = e.get(h.shift()), it = h.shift() * 80 + h.shift(), v.append($("<div/>", {
                    "class": "neutral",
                    html: u.get("cashLimitChecked", [k.getName(), Math.floor(it / 10), it])
                }));
                if (b == t.PHASE.ENDSCORE) for (f.endscoringDone = !0, v.append($("<hr/>")).append($("<div/>", {html: u.s.endScoreTitle})).append($("<hr/>")); h.length;) v.append($("<div/>", {
                    "class": "neutral",
                    html: u.get("endScore", [e.get(h.shift()).getName(), h.shift(), h.shift()])
                }));
                while (h.length) {
                    w = h.shift();
                    y.addMove(w, a, h.slice(0));
                    switch (w) {
                        case r.ASKINGHOUSE:
                            this.asking4house = [h.shift(), h.shift()];
                            break;
                        case r.SETPROPERTY:
                            v.append($("<div/>", {html: u.get("propertySet", [o.parcel2dice(h.shift())])}));
                            break;
                        case r.INFLUENCE:
                            v.append($("<div/>", {html: u.s.influence + ": " + u.get("flipPerson", [e.get(a).getName(), u.s["person" + h.shift()]])}));
                            break;
                        case r.CHOOSEPERSON:
                            d = h.shift();
                            ft = h.shift();
                            f.isRed[d] = ft;
                            d >= 20 ? (d -= 20, d == s.NONE ? v.append($("<div/>", {html: u.s.noNephew})) : (e.get(a).nephew = [d, ft], f.nephew[a] = d, v.append($("<div/>", {html: u.get("personChosen", [u.s["person" + d], u.s["side" + ft]])})))) : (f.character[a] = d, v.append($("<div/>", {html: u.get("personChosen", [u.s["person" + d], u.s["side" + ft]])})));
                            break;
                        case r.GETRESOURCES:
                            v.append($("<div/>", {html: u.get("getResources", [u.s["resource" + h.shift()], h.shift()])}));
                            break;
                        case r.BUYRESOURCES:
                            v.append($("<div/>", {html: u.get("buyResources", [u.s["resource" + h.shift()], h.shift(), h.shift()])}));
                            break;
                        case r.ACTIONPERSON:
                            d = h.shift();
                            switch (d) {
                                case s.BANKER:
                                    v.append($("<div/>", {html: u.get("actionPersonality", [u.s["person" + s.BANKER]]) + ": " + u.get("buyResources", [u.s["resource" + r.RESOURCES.POINT], h.shift(), h.shift()])}));
                                    break;
                                case s.SHERIFF:
                                    v.append($("<div/>", {html: u.get("actionPersonality", [u.s["person" + s.SHERIFF]]) + ": " + u.get("sheriffLostDuel", [e.get(h.shift()).getName()])}));
                                    break;
                                case s.CHINESE:
                                    vt = h.shift();
                                    v.append($("<div/>", {html: u.get("actionPersonality", [u.s["person" + s.CHINESE]]) + ": " + (vt ? u.s.redChineseDone : u.s.redChineseNoBuy)}));
                                    break;
                                case s.SETTLER:
                                    rt = e.get(h.shift()).getName();
                                    st = h.shift();
                                    v.append($("<div/>", {
                                        "class": "neutral",
                                        html: u.get("actionPersonality", [u.s["person" + s.SETTLER]]) + ": " + u.get("settlerRed", [rt, st])
                                    }));
                                    break;
                                case s.GROCER:
                                    f.isRed[s.GROCER] ? (rt = e.get(h.shift()).getName(), st = h.shift(), v.append($("<div/>", {
                                        "class": "neutral",
                                        html: u.get("actionPersonality", [u.s["person" + s.GROCER]]) + ": " + u.get("grocerRed", [rt, st])
                                    }))) : (lt = h.shift(), v.append($("<div/>", {html: u.get("actionPersonality", [u.s["person" + s.GROCER]]) + ": " + (lt < 70 ? u.get("grocerDouble", [e.get(a).getName(), u.s["buildingtype" + lt]]) : u.get("grocerTake8", [e.get(a).getName()]))})))
                            }
                            break;
                        case r.INCOME:
                            v.append($("<div/>", {
                                "class": "neutral",
                                html: u.get("perform", [u.s["actionsquare" + w], e.get(h.shift()).getName(), 4, u.s["resource" + r.RESOURCES.COIN]])
                            }));
                            break;
                        case r.GUNS3:
                            v.append($("<div/>", {
                                "class": "neutral",
                                html: u.get("perform", [u.s["actionsquare" + w], e.get(h.shift()).getName(), 3, u.s["resource" + r.RESOURCES.GUN]])
                            }));
                            break;
                        case r.ROADS3:
                            v.append($("<div/>", {
                                "class": "neutral",
                                html: u.get("perform", [u.s["actionsquare" + w], e.get(h.shift()).getName(), 3, u.s["resource" + r.RESOURCES.ROAD]])
                            }));
                            break;
                        case r.ROAD:
                            v.append($("<div/>", {
                                "class": "neutral",
                                html: u.get("perform", [u.s["actionsquare" + w], e.get(h.shift()).getName(), 1, u.s["resource" + r.RESOURCES.ROAD]])
                            }));
                            break;
                        case r.BUYPARCEL:
                            g = h.shift();
                            g < 64 ? v.append($("<div/>", {html: u.get("parcelBought", [e.get(a).getName(), o.parcel2dice(g), h.shift()])})) : g === r.FORFEIT && v.append($("<div/>", {html: u.get("forfeitBuyParcel", [e.get(a).getName(), o.parcel2dice(h.shift())])}));
                            break;
                        case r.BUILDROAD:
                            ht = [h.shift(), h.shift()];
                            v.append($("<div/>", {html: u.get("build" + (o.isBridge(ht) ? "Bridge" : "Road"), [e.get(a).getName(), o.parcel2dice(ht[0]), u.s["border" + ht[1]]])}));
                            break;
                        case r.BUILDING1:
                        case r.BUILDING2:
                        case r.BUILDING3:
                        case r.BUILDING4:
                        case r.BUILDING5:
                        case r.BUILDING6:
                        case r.BUILDING7:
                            nt = h.shift();
                            !p && l(nt, [r.FORFEIT, r.TOSTOCK]) && (f.asked4house = [], f.asking4house = undefined);
                            nt == r.FORFEIT ? v.append($("<div/>", {html: u.get("buildingForfeit", [e.get(a).getName(), u.s["building" + h.shift()], o.getCost4Building(w - r.BUILDING1)])})) : nt == r.TOSTOCK ? v.append($("<div/>", {html: u.get("building2stock", [e.get(a).getName(), u.s["building" + h.shift()], o.getCost4Building(w - r.BUILDING1), u.s["halfCost" + f.halfChinese(a) * 1]])})) : v.append($("<div/>", {html: u.get("builtBuilding", [e.get(a).getName(), u.s["building" + nt], o.getCost4Building(w - r.BUILDING1), o.parcel2dice(h.shift()), u.s["halfCost" + f.halfChinese(a) * 1]]) + (o.GUNS[nt] ? u.get("getGuns", [o.GUNS[nt]]) : "")}));
                            break;
                        case r.BUILD0:
                            v.append($("<div/>", {html: u.get("builtFromStock", [e.get(a).getName(), u.s["building" + h.shift()], o.parcel2dice(h.shift())])}));
                            break;
                        case r.BUILD1:
                            p || (f.asked4house = [], f.asking4house = undefined);
                            v.append($("<div/>", {html: u.get("builtHouse", [e.get(a).getName(), u.s["building" + o.HOUSE], o.parcel2dice(h.shift())])}));
                            break;
                        case r.CHURCH:
                            v.append($("<div/>", {
                                "class": "neutral",
                                html: u.get("builtChurch", [e.get(h.shift()).getName(), o.parcel2dice(h.shift())])
                            }));
                            break;
                        case r.TOOCOSTLY:
                            w = h.shift();
                            v.append($("<div/>", {
                                "class": "neutral",
                                html: u.get("tooCostly" + (w === r.BUYPARCEL ? w : r.BUILDING1), [e.get(h.shift()).getName(), h.shift(), h.shift(), w == r.BUYPARCEL ? o.parcel2dice(h.shift()) : ""])
                            }));
                            break;
                        case r.INCOMEPARCELS:
                        case r.INCOMEGUNS:
                            v.append($("<div/>", {
                                "class": "neutral",
                                html: u.get("perform", [u.s["actionsquare" + w], e.get(h.shift()).getName(), h.shift(), u.s["resource" + r.RESOURCES.COIN]])
                            }));
                            break;
                        case r.INCOMEDICE:
                            yt = e.get(h.shift()).getName();
                            tt = h.shift();
                            tt = [Math.floor(tt / 7), tt % 7];
                            v.append($("<div/>", {
                                "class": "neutral",
                                html: u.get("perform", [u.s["actionsquare" + w], yt, ot(tt), u.s["resource" + r.RESOURCES.COIN]]) + " <img class=die src=" + GameImagePath + "bdie" + tt[0] + ".gif><img class=die src=" + GameImagePath + "wdie" + tt[1] + ".gif>"
                            }));
                            break;
                        case r.INCOMEBUILDINGS0:
                            g = h.shift();
                            v.append($("<div/>", {
                                "class": "neutral",
                                html: u.get("income", [o.parcel2dice(g), e.get(h.shift()).getName(), h.shift(), u.s["building" + o.getBuildingOnParcel(g)]])
                            }));
                            break;
                        case r.POINTSPARCELS:
                        case r.POINTSGUNS:
                        case r.POINTSBUILDINGS:
                            v.append($("<div/>", {
                                "class": "neutral",
                                html: u.get("perform", [u.s["actionsquare" + w], e.get(h.shift()).getName(), h.shift(), u.s["resource" + r.RESOURCES.POINT]])
                            }));
                            break;
                        case r.POINTS5:
                        case r.POINTS4:
                        case r.POINTS3:
                        case r.POINTS2:
                            rt = e.get(h.shift()).getName();
                            it = h.shift();
                            v.append($("<div/>", {html: u.s["actionsquare" + w] + ": " + u.get("playerBuyResources", [rt, it, it * (r.POINTS5 + 5 - w), u.s["resource" + r.RESOURCES.POINT]])}));
                            break;
                        case r.ENDMERCENARY:
                            v.append($("<div/>", {
                                "class": "neutral",
                                html: u.get("endMercenary", [e.get(h.shift()).getName(), t.state.getBasicData().isRed(s.MERCENARY) ? 2 : 3])
                            }));
                            break;
                        case r.ENDGUNS3:
                            v.append($("<div/>", {
                                "class": "neutral",
                                html: u.get("endGuns3", [e.get(h.shift()).getName(), 3])
                            }));
                            break;
                        case r.SETUPDUEL:
                            p || (c.duelAction = h.shift() * (r.END + 1) + h.shift());
                            v.append($("<div/>", {
                                "class": "neutral",
                                html: c.getAction() <= r.END ? u.get("duelOnAction", [u.s["actionsquare" + c.getAction()]]) : u.get("duelOnParcel", [o.parcel2dice(c.getAction() - r.END - 1)])
                            }));
                            break;
                        case r.DUELTILEREFILL:
                            p || (c.refilled[h.shift()] = !0);
                            break;
                        case r.DUELTILE:
                            k = h.shift();
                            p || (c.set[k] = h.shift());
                            k != a && v.append($("<div/>", {
                                "class": "neutral",
                                html: u.get("duelTileAutomatic", [e.get(k).getName()])
                            }));
                            break;
                        case r.DUEL:
                            for (var bt = h.shift(), i = !0, pt = ""; bt-- && h.length > (t.isMightIsRight() ? 2 : 3);) {
                                if (k = h.shift(), !l(k, e.ALL)) {
                                    h = [];
                                    break
                                }
                                pt += u.get("duel" + (i ? "Winner" : "Loser"), [e.get(k).getName(), wt(k, h.shift(), h.shift(), t.isMightIsRight() ? c.set[k] : h.shift())]);
                                !p && t.isMightIsRight() && t.isMightIsRight() && c.played[k].push(c.set[k]);
                                i = !1
                            }
                            v.append($("<div/>", {"class": "neutral", html: pt}));
                            p || c.resetDuel()
                    }
                }
            }
        },
        changePhase: function () {
            this.add2Move([this.CHANGEPHASE, ht(t.phase())])
        },
        add2Move: function (n) {
            jQuery.isArray(n) ? n.forEach(function (n) {
                f.info.push(n)
            }) : f.info.push(n);
            this.showCurrentMove()
        },
        showCurrentMove: function (n) {
            (n = n || $("#moveInfo"), n.length) && ($(".currentMove").remove(), this.restoreValuesFromMoveStart(), f.animate = !1, f.decode(undefined, f.info, OnTurnIndex, n), t.highlight4help(), n.scrollTop(n.get(0).scrollHeight))
        },
        getLast: function () {
            return moveNr == 0 ? "" : HistoryMove[moveNr - 1]
        },
        getPlayer4moveNr: function (n) {
            if (n == 1) for (var t = 0, i = PlayerInfo.length; t < i; t++) if (GameInfo.StartPlayer == PlayerInfo[t].ID) return t;
            return n > 1 ? yucataGame.DecodeNumber(HistoryStatus[n - 2].substr(2, 1)) : undefined
        },
        setHistory: function () {
            t.state = moveNr ? new yucataGame.Status(HistoryStatus[moveNr - 1], t.statusdef) : new yucataGame.Status(OrigStatus, t.statusdef)
        }
    }, y = {
        queue: $({}), queuename: "moveAnimation", callback: function () {
        }, next: undefined, addMove: function (n, t, i) {
            f.animate && this.queue.queue(this.queuename, function (r) {
                y.next = r;
                y.animateMove(n, t, i)
            })
        }, setCallback: function (n) {
            this.callback = n || function () {
            }
        }, play: function () {
            this.queue.queue(this.queuename, function () {
                y.stop()
            });
            this.queue.dequeue(this.queuename)
        }, stop: function () {
            this.queue.clearQueue(this.queuename);
            $(".animated").remove();
            y.callback()
        }, animate: function (n, i, r, u) {
            var f;
            if (n) {
                u = u || {};
                u.parent = u.parent || t.board;
                u.cnt = u.cnt || 1;
                var e = $("<img/>", {"class": "invisible animated " + r, src: n}).appendTo(u.parent),
                    h = u.toObj && u.toObj.length ? u.toObj.offset().left - u.parent.offset().left : 100 * e.position().left / u.parent.width() + "%",
                    c = u.toObj && u.toObj.length ? u.toObj.offset().top - u.parent.offset().top : 100 * e.position().top / u.parent.height() + "%",
                    s = 100 * e.width() / u.parent.width(), l = 100 * e.width() / u.parent.width(), o = [];
                for (f = 0; f < u.cnt; f++) o.push($("<img/>", {
                    "class": "animated " + i,
                    src: n
                }).appendTo(u.parent)), u.fromObj && u.fromObj.length && o[f].offset({
                    top: u.fromObj.offset().top,
                    left: u.fromObj.offset().left
                }), o[f].fadeIn(f * 300).delay(100).animate({left: h, top: c}, {
                    easing: "linear",
                    duration: 1200 + f * 300,
                    queue: !1
                }).animate({width: s * 2.5 + "%"}, {duration: 600}).animate({width: s + "%"}, {duration: 500}).delay(f * 200).fadeOut(100, undefined, f == u.cnt - 1 ? y.next : undefined)
            }
        }, simultaneousAnimate: function (n) {
            var t = 0, i = y.next, r = n.length;
            y.next = function () {
                ++t == r && i()
            };
            n.forEach(function (n) {
                n.shift().apply(null, n)
            })
        }, getAnimationGetResources: function (n, t) {
            switch (t[0]) {
                case r.RESOURCES.COIN:
                    return [this.animate, GameImagePath + "coin.gif", "coin supply", "coin", {
                        toObj: $("#playerInfo" + n + " .money"),
                        cnt: t[1]
                    }];
                case r.RESOURCES.ROAD:
                    return [this.animate, GameImagePath + "road.gif", "road supply", "road", {
                        toObj: $("#playerInfo" + n + " .road"),
                        cnt: t[1]
                    }];
                case r.RESOURCES.COWBOY:
                    return [this.animate, GameImagePath + "cowboy" + e.get(n).getColorIdx() + ".gif", "cowboy supply", "cowboy", {
                        toObj: $("#playerInfo" + n + " .cowboy"),
                        cnt: t[1]
                    }];
                case r.RESOURCES.GUN:
                    return [this.animate, GameImagePath + "gun.gif", "gun supply", "gun", {
                        toObj: $("#playerInfo" + n + " .gun"),
                        cnt: t[1]
                    }];
                case r.RESOURCES.POINT:
                    return [this.animate, GameImagePath + "points.gif", "points supply", "points", {
                        toObj: $("#playerInfo" + n + " .pts"),
                        cnt: t[1]
                    }]
            }
        }, animateActionGet: function (n, t, i, r) {
            this.simultaneousAnimate([[this.animate, GameImagePath + "cowboy" + e.get(n).getColorIdx() + ".gif", "cowboy action pos" + t, "cowboy supply"], this.getAnimationGetResources(n, [i, r])])
        }, animateMove: function (n, t, i) {
            var a, u, s, c;
            ii("animate move action " + n);
            switch (n) {
                case r.SETONPARCEL:
                    l(i[0], [r.AUTOPASS, r.PASS]) ? this.animate(GameImagePath + "marker" + e.get(i[0] == r.PASS ? t : i[1]).getColorIdx() + ".gif", "TO TO2", "pass TO TO2") : this.animate(GameImagePath + "cowboy" + e.get(t).getColorIdx() + ".gif", "cowboy", i[0] <= r.END ? "action pos" + i[0] : "parcel pos" + i[1], {fromObj: $("#playerInfo" + t + " .cowboy")});
                    break;
                case r.BUYPARCEL:
                    i[0] < 64 ? this.simultaneousAnimate([[this.animate, GameImagePath + "cowboy" + e.get(t).getColorIdx() + ".gif", "cowboy parcel pos" + i[0], "cowboy supply"], [this.animate, GameImagePath + "coin.gif", "coin", "coin parcel pos" + i[0], {
                        fromObj: $("#playerInfo" + t + " .money"),
                        cnt: i[1]
                    }], [this.animate, GameImagePath + "property" + e.get(t).getColorIdx() + ".jpg", "parcel", "parcel pos" + i[0], {fromObj: $("#playerInfo" + t + " .property")}]]) : this.animate(GameImagePath + "cowboy" + e.get(t).getColorIdx() + ".gif", "cowboy parcel pos" + i[1], "cowboy supply");
                    break;
                case r.BUILDING1:
                case r.BUILDING2:
                case r.BUILDING3:
                case r.BUILDING4:
                case r.BUILDING5:
                case r.BUILDING6:
                case r.BUILDING7:
                    a = i[0];
                    u = i[0] == r.TOSTOCK;
                    u && i.shift();
                    s = [[this.animate, GameImagePath + "cowboy" + e.get(t).getColorIdx() + ".gif", "cowboy action pos" + n, "cowboy supply"], [this.animate, GameImagePath + "coin.gif", "coin", "coin action pos" + n, {
                        fromObj: $("#playerInfo" + t + " .money"),
                        cnt: Math.ceil(o.getCost4Building(n - r.BUILDING1) / (f.halfChinese(t) ? 1 : 2))
                    }], [this.animate, o.getImg(i[0]), "action pos" + n, "parcel pos" + i[1], {toObj: u ? $("#playerInfo" + t + " .buildings") : undefined}]];
                    !u && o.GUNS[i[0]] && s.push(this.getAnimationGetResources(t, [r.RESOURCES.GUN, o.GUNS[i[0]]]));
                    this.simultaneousAnimate(s);
                    break;
                case r.BUILD0:
                    this.animate(o.getImg(i[0]), "building", "parcel pos" + i[1], {fromObj: $("#playerInfo" + t + " .buildings")});
                    break;
                case r.BUILD1:
                    this.animate(o.getImg(o.HOUSE), "building supply", "parcel pos" + i[0]);
                    break;
                case r.BUILDROAD:
                    this.animate(GameImagePath + (o.isBridge(i) ? "bridge" : "road") + (i[1] % 2 ? "" : "vertical") + ".gif", "road", "road " + (o.isBridge(i) ? "bridge " : "") + h.toString(i[1]) + " pos" + i[0], {fromObj: $("#playerInfo" + t + " .road")});
                    break;
                case r.TOOCOSTLY:
                    this.animate(GameImagePath + "cowboy" + e.get(i[1]).getColorIdx() + ".gif", "cowboy action pos" + i[0], "cowboy supply");
                    break;
                case r.INCOMEBUILDINGS0:
                    this.animate(GameImagePath + "coin.gif", "coin parcel pos" + i[0], "coin", {
                        toObj: $("#playerInfo" + i[1] + " .money"),
                        cnt: i[2]
                    });
                    break;
                case r.CHOOSEPERSON:
                    this.animate(GameImagePath + "marker" + e.get(t).getColorIdx() + ".gif", "marker outside", "marker pos" + (i[0] >= 20 ? i[0] - 20 : i[0]), {parent: $("div.personalities")});
                    break;
                case r.POINTS2:
                case r.POINTS3:
                case r.POINTS4:
                case r.POINTS5:
                    this.simultaneousAnimate([[this.animate, GameImagePath + "cowboy" + e.get(t).getColorIdx() + ".gif", "cowboy action pos" + n, "cowboy supply"], this.getAnimationGetResources(t, i), [this.animate, GameImagePath + "coin.gif", "coin", "coin supply", {
                        fromObj: $("#playerInfo" + t + " .money"),
                        cnt: i[1] * (r.POINTS5 + 5 - n)
                    }],]);
                    break;
                case r.BUYRESOURCES:
                    this.simultaneousAnimate([this.getAnimationGetResources(t, i), [this.animate, GameImagePath + "coin.gif", "coin", "coin supply", {
                        fromObj: $("#playerInfo" + t + " .money"),
                        cnt: i[2]
                    }],]);
                    break;
                case r.GETRESOURCES:
                    c = this.getAnimationGetResources(t, i);
                    c.shift().apply(null, c);
                    break;
                case r.SETPROPERTY:
                    this.animate(GameImagePath + "property" + e.get(t).getColorIdx() + ".jpg", "parcel stock", "parcel pos" + i[0], {fromObj: $("#playerInfo" + t + " .property")});
                    break;
                case r.INCOME:
                    this.animateActionGet(i[0], n, r.RESOURCES.COIN, 4);
                    break;
                case r.GUNS3:
                    this.animateActionGet(i[0], n, r.RESOURCES.GUN, 3);
                    break;
                case r.ROADS3:
                    this.animateActionGet(i[0], n, r.RESOURCES.ROAD, 3);
                    break;
                case r.ROAD:
                    this.animateActionGet(i[0], n, r.RESOURCES.ROAD, 1);
                    break;
                case r.DUEL:
                    ii(i);
                    break;
                default:
                    y.next()
            }
        }
    }, u = {
        getDefinitions: function () {
            return [["awaitingTurn", "+++ Warte auf den nächsten Zug +++", "+++ Awaiting next turn +++"], ["isHistory", "+++ Nachspielen eines bereits beendeten Spiels +++", "+++ Replaying a finished game +++"], ["outdatedStatusString", "Der Spielstatus konnte nicht gespeichert werden.\nEs könnte sein, dass die Verbindung zum Server unterbrochen war.\nBitte stelle sicher, dass Du nur ein Spielfenster geöffnet hast.\nSchließe alle Fenster und öffne ein neues Fenster, dann sollte es wieder funktionieren.", "An error occurred while saving the game status.\nThe connection to the server might have been lost.\n Please check that you have only one game window open.\n Close all windows and reopen one.\n This should fix the issue."], ["undoButton", "Rückgängig", "Undo"], ["undo", "Mache die letzte Aktion rückgängig.", "Undo the last action."], ["redoButton", "Wiederholen", "Redo"], ["redo", "Wiederhole die zuletzt rückgängig gemachte Aktion.", "Redo the last undone action."], ["noUndo", "Diese Aktion kann nicht rückgängig gemacht werden.\nTrotzdem fortfahren?", "This action is irreversible (no undo possible).\nContinue?"], ["noUndoIncomeDice", "Als nächste Aktion wird Einkommen durch Würfeln ausgeführt. Diese Aktion kann nicht rückgängig gemacht werden.\nTrotzdem fortfahren?", "The next action to perform is gambling income. This action is irreversible (no undo possible).\nContinue?"], ["chooseYourColor", "Wähle Deine Farbe.", "Choose your color."], ["quit", "Spiel aufgegeben.", "Game was given up."], ["ok", "OK", "OK"], ["yes", "Ja", "Yes"], ["no", "Nein", "No"], ["gameOver", "Das Spiel ist beendet.", "Game over"], ["finishMove", "Beende Deinen Zug.", "Finish your move."], ["doMove", "Mache Deinen Zug.", "Make your move."], ["points", "Punkt(e)", "Point(s)"], ["move", "Zug %1: ", "Move %1: "], ["moveInfo", "Zugaufzeichnung", "Recording of moves done"], ["currentMove", "aktueller Zug:", "current move:"], ["buildingsTitle", "Gebäude auf der Hand (anklicken)", "Buildings in stock (clickable)"], ["coinTitle", "Geld", "Money"], ["gunTitle", "Revolver", "Guns"], ["meepleTitle", "verfügbare Cowboys", "available cowboys"], ["ptsTitle", "Siegpunkte", "Victory points"], ["dueltilesTitle", "Duell-Plättchen (anklicken)", "Duel tiles (clickable)"], ["roadTitle", "verfügbare Wege", "available roads"], ["propertyTitle", "verfügbare Besitzmarker", "available property marker"], ["chooseSidePersonTitle", "Auswahl der Seite der Personenkarten", "Selection of the side of the personality cards"], ["chooseSidePerson", "Wähle die Seiten der Personenkarten oder beende deinen Zug.", "Select the sides of the personality cards or finish your move."], ["chooseSideInfluence", "Wähle die Seite der Personenkarte", "Select the side of the personality card"], ["newBeginningPic", "einneueranfang.jpg", "anewbeginning.jpg"], ["newBeginningTitle", "Ein neuer Anfang", "A new beginning"], ["newBeginning", "Wähle deinen Startaufbau", "Choose your setup"], ["newBeginningLine1", "%1 zusätzliche Cowboy(s): beginne mit %2 Cowboy(s)", "%1 additional cowboy(s): start with %2 cowboy(s)"], ["newBeginningLine2", "Beginne mit %1 Revolver", "Start with %1 gun(s)"], ["newBeginningLine3", "Beginne mit %1 Weg(en)", "Start with %1 road(s)"], ["newBeginningLine4", "Beginne mit %1 Besitzmarker(n)", "Start with %1 properties"], ["newBeginningLine5", "Beginne mit %1 Siegpunkten", "Start with %1 victory points"], ["newBeginningLine9", "Biete darauf, Startspieler zu sein (wähle in der 1. Runde als erster eine Personenkarte)", "Bid for being first player (choose personality card first in first round)"], ["chooseProperty", "Setze einen Besitzmarker.", "Place a property tile."], ["setProperty", "Setze einen Besitzmarker hierhin.", "Place a property tile here."], ["choosePerson", "Wähle eine Personenkarte.", "Choose a personality."], ["person" + s.SHERIFF, "Sheriff", "sheriff"], ["person" + s.BANKER, "Bankier", "banker"], ["person" + s.GROCER, "Verkäuferin", "grocer"], ["person" + s.CHINESE, "Chinese", "chinese"], ["person" + s.SETTLER, "Siedler", "settler"], ["person" + s.CAPTAIN, "Hauptmann", "captain"], ["person" + s.MERCENARY, "Revolverheld", "mercenary"], ["characterAction", "Führe die Aktion deiner Personenkarte aus.", "Perform the action of your personality."], ["actionPersonality", "Aktion %1", "Action %1"], ["handleGrocer" + s.YELLOW, "Du kannst jetzt sofort $8 nehmen oder später in der Einkommensphase das Einkommen aller deiner Gebäude eines Typs verdoppeln.<br>Willst du sofort $8?", "You may take $8 at once or double the income of your buildings of an arbitrary type during estate income.<br>Do you want to take $8 at once?"], ["handleGrocer" + s.RED, "Du kannst jetzt sofort $8 nehmen oder du erhältst am Ende der Runde einen Siegpunkt pro eigenem Wohnhaus.<br>Willst du sofort $8?", "You may take $8 at once or get one victory point for each of your own houses at the end of the round.<br>Do you want to take $8 at once?"], ["ask4grocer", "verdopple das Einkommen für", "double the income of"], ["chooseGrocer8", "oder nimm 8$", "or take $8"], ["handleSettler" + s.RED, "Du kannst jetzt sofort $8 nehmen oder du erhältst am Ende der Runde einen Siegpunkt pro eigenem Berg.<br>Willst du sofort $8?", "You may take $8 at once or get one victory point for each mountain you own at the end of the round.<br>Do you want to take $8 at once?"], ["handleCaptainBuyYellow", "Du kannst Cowboys kaufen. Aktuell hast du $%1. Kaufe", "You may buy cowboys. You currently have $%1. Buy"], ["captainBuyYellow", "%1 Cowboy%2 für $%3", "%1 cowboy%2 for $%3"], ["handleCaptainBuyRed", "Du kannst Revolver kaufen. Aktuell hast du $%1. Kaufe", "You may buy guns. You currently have $%1. Buy"], ["captainBuyRed", "%1 Revolver für $%3", "%1 gun%2 for $%3"], ["handleBankerBuyRed", "Du kannst Siegpunkte kaufen. Aktuell hast du $%1. Kaufe", "You may buy victory points. You currently have $%1. Buy"], ["bankerBuyRed", "%1 Siegpunkte für $%2", "%1 victory points for $%2"], ["handleChineseBuyRed", "Du kannst ein ausliegendes Gebäude für $5 kaufen. Aktuell hast du $%1. Kaufe", "You may buy one of the available buildings for $5. You currently have $%1. Buy"], ["chineseBuyRed", "%2 von '%1'", "%2 from '%1'"], ["redChineseDone", "Gebäude für $5 gekauft", "building bought for $5"], ["redChineseNoBuy", "nichts gekauft", "nothing bought"], ["noBuy", "nichts", "nothing"], ["chooseDuel", "Wähle das Duell, das zuerst ausgetragen werden soll.", "Choose the duel to be performed first."], ["choose4duel", "Dieses Duell zuerst austragen.", "Perform this duel first."], ["chooseDuelTile", "Wähle ein Duellplättchen", "Choose a duel tile"], ["duelTileAutomatic", "%1 hat nur noch ein Duellplättchen übrig -> automatisch gewählt", "%1 has only one duel tile left -> automatically chosen"], ["duel", "Ein Duell wird ausgetragen.", "A duel will take place."], ["startDuel", "Duell beginnen", "Start duel"], ["startDuelInfo", "Duell beginnen - die beteiligten Spieler messen ihre Stärke.", "Start duel - let the players involved compare their strength."], ["showDuelTiles", "Duellplättchen von %1", "Duel tiles of %1"], ["yourDuelTiles", "Deine Duellplättchen", "Your duel tiles"], ["personinfo" + s.SHERIFF + s.YELLOW, "Nimm den Sheriff", "Take the sheriff"], ["personinfo" + s.SHERIFF + s.RED, "3 Siegpunkte für jedes verlorene Duell (einsetzen nur auf leere Felder, kein Angriff)", "3 victory points for every lost duel (place cowboys on empty spaces only, no attack)"], ["personinfo" + s.BANKER + s.YELLOW, "Nimm $9", "Take $9"], ["personinfo" + s.BANKER + s.RED, "Kaufe 3/5/7 Siegpunkte $3/$12/$25 bei Rundenende", "Buy 3/5/7 victory points for $3/$12/$25 at the end of the round"], ["personinfo" + s.GROCER + s.YELLOW, "Nimm $8 oder verdopple in der Einkommensphase das Einkommen aller deiner Gebäude eines beliebigen Typs.", "Take $8 or double the income of your buildings of an arbitrary type during estate income."], ["personinfo" + s.GROCER + s.RED, "Nimm sofort $8 oder bekomme einen Siegpunkt pro eigenem Haus bei Rundenende", "Take $8 at once or get 1 victory point for each house you own at the end of the round"], ["personinfo" + s.CHINESE + s.YELLOW, "Kaufe Gebäude zum halben Preis und nimm 2 Wege", "Buy buildings for half of the cost and take 2 roads"], ["personinfo" + s.CHINESE + s.RED, "Kaufe ein beliebiges ausliegendes Gebäude für $5", "Buy any of the available buildings for $5"], ["personinfo" + s.SETTLER + s.YELLOW, "Lege einen Besitzmarker auf eine beliebige leere Parzelle", "Place a property marker on any empty parcel"], ["personinfo" + s.SETTLER + s.RED, "Nimm sofort $8 oder bekomme einen Siegpunkt pro eigenen Berg bei Rundenende", "Take $8 at once or get 1 victory point for each mountain you own at the end of the round"], ["personinfo" + s.CAPTAIN + s.YELLOW, "Kaufe 1/2/3 Cowboys für $1/$4/$9", "Buy 1/2/3 cowboys for $1/$4/$9"], ["personinfo" + s.CAPTAIN + s.RED, "Kaufe 1/2 Revolver für $3/$9", "Buy 1/2 guns for $3/$9"], ["personinfo" + s.MERCENARY + s.YELLOW, "3 Stärkepunkte extra für diese Runde", "3 extra firepower for that round"], ["personinfo" + s.MERCENARY + s.RED, "2 Stärkepunkte extra für diese Runde", "2 extra firepower for that round"], ["placeCowboy", "Setze einen Cowboy ein oder passe.", "Place one of your cowboys or pass."], ["useSheriff", "Willst du den Sheriff auf diesem Feld einsetzen?", "Do you want to place the sheriff on that space?"], ["pass", "Passe.", "Pass."], ["action" + r.INCOME, "Lohn: Du erhältst $4 (kein Duell).", "Wages: Get $4 (no duel)."], ["action" + r.GUNS3, "Munition: Du bekommst 3 Revolver für den Rest der Runde.", "Ammunition: Get 3 guns for the rest of the round."], ["action" + r.ROADS3, "Wege: Du bekommst 3 Wege.", "Roads: Get 3 roads."], ["action" + r.ROAD, "Weg: Du bekommst 1 Weg (kein Duell).", "Road: Get 1 road (no duel)."], ["action" + r.BUYPARCEL + "title", "Kaufe eine Parzelle", "Buy a parcel"], ["action" + r.BUYPARCEL, "Kaufe eine Parzelle für $%1", "Buy a parcel for $%1"], ["buyParcel", "Du kannst die Parzelle %1 für $%2 kaufen. Du besitzt $%3.<br/>Kaufen?", "You can buy parcel %1 for $%2. You own $%3.<br/>Buy it?"], ["actionbuilding", "Gebäude: Kaufe %1 für $%2.", "Building: Buy %1 for $%2."], ["buildingtype" + o.BANK, "jede Bank", "each bank"], ["buildingtype" + o.CHURCH, "jede Kirche", "each church"], ["buildingtype" + o.DRUGSTORE, "jeden Drugstore", "each drugstore"], ["buildingtype" + o.HOTEL, "jedes Hotel", "each hotel"], ["buildingtype" + o.MINE, "jede Mine", "each mine"], ["buildingtype" + o.PRISON, "jedes Gefängnis", "each prison"], ["buildingtype" + o.RANCH, "jede Ranch", "each ranch"], ["buildingtype" + o.SALOON, "jeden Saloon", "each saloon"], ["building" + o.HOUSE, "ein Wohnhaus", "a house"], ["building" + o.BANK, "eine Bank", "a bank"], ["building" + o.CHURCH, "eine Kirche", "a church"], ["building" + o.DRUGSTORE, "einen Drugstore", "a drugstore"], ["building" + o.HOTEL, "ein Hotel", "a hotel"], ["building" + o.MINE, "eine Mine", "a mine"], ["building" + o.PRISON, "ein Gefängnis", "a prison"], ["building" + o.RANCH, "eine Ranch", "a ranch"], ["building" + o.SALOON, "einen Saloon", "a saloon"], ["buildFromStock", "Baue aus deinem Vorrat", "Construct building from your stock"], ["choose2build", "Du kannst jetzt Gebäude auf deiner Hand bauen. Baue", "You now may construct buildings you have in stock. Do you want to build"], ["buildNothing", "nichts", "nothing"], ["buyBuilding", "Du kannst %1 für $%2 kaufen.", "You can buy %1 for $%2."], ["buildBuilding", "Baue %1.", "Construct %1."], ["forfeitAction", "Verzichte auf die Aktion.", "Forfeit the action."], ["buildingToStock", "Nimm das Gebäude in deinen Vorrat.", "Take the building to your stock."], ["showBuildings", "Gebäude im Vorrat von %1", "Buildings in stock of %1"], ["buildHere", "Baue das Gebäude hier.", "Construct the building here."], ["buildRoadInfo", "Baue hier einen Weg.", "Build a road there."], ["buildBridgeInfo", "Baue hier eine Brücke.", "Build a bridge there."], ["ask4house", "Frage %1 um Erlaubnis, ein Wohnhaus auf diese Parzelle bauen zu dürfen.", "Ask %1 for permission to build a house on this parcel."], ["phaseAsk4permissionCore", "%1 baut %2 und möchte ein Wohnhaus auf eine deiner Parzelle bauen. Parzellen anklicken, um Erlaubnis zu erteilen / zu verweigern oder Zug beenden.", "%1 is going to build %2 and would like to build a house on one of your parcels. Click on the parcels you wish to give permission"], ["phaseAsk4permission", "", ""], ["ask4parcelAllow", "%1 erlauben, ein Wohnhaus auf dieser Parzelle zu bauen", "Allow %1 to build a house on this parcel"], ["ask4parcelForbid", "%1 nicht erlauben, ein Wohnhaus auf dieser Parzelle zu bauen", "Don't allow %1 to build a house on this parcel"], ["noConstructionPossible", "Es gibt keinen gültigen Bauplatz für %1.\nDeine Aktion wird zurückgenommen.", "No valid space for %1.\nYour action will be undone."], ["action" + r.INCOMEPARCELS, "Einkommen: Du bekommst $2 für jede Parzelle, die du besitzt.", "Income: Get $2 for each parcel you own."], ["action" + r.INCOMEGUNS, "Einkommen: Du bekommst $2 für jeden Stärkepunkt (übrige Cowboys + Revolver).", "Income: Get $2 for each firepower (cowboys left + guns)."], ["action" + r.INCOMEDICE, "Einkommen: Würfle mit beiden Würfeln und bekomme die Würfelsumme in $.", "Income: Roll the two dice and get the rolled amount in $."], ["action" + r.POINTSPARCELS, "Siegpunkte: Du bekommst 1 Punkt für je 2 Parzellen, die du besitzt.", "Victory points: Get 1 point per 2 parcels you own."], ["action" + r.POINTSGUNS, "Siegpunkte: Du bekommst 1 Punkt für je 2 Stärkepunkte (übrige Cowboys + Revolver).", "Victory points: Get 1 point per 2 firepower (cowboys left + guns)."], ["action" + r.POINTSBUILDINGS, "Siegpunkte: Du bekommst 1 Punkt für jedes deiner gebauten Gebäude (ohne Wohnhäuser und Berge).", "Victory points: Get 1 point for each of your buildings you built (except houses and mountains)."], ["action" + r.POINTS5, "Siegpunkte: Kaufe beliebig viele Punkte für je $5.", "Victory points: Buy as many victory points as you like for $5 each."], ["action" + r.POINTS4, "Siegpunkte: Kaufe beliebig viele Punkte für je $4.", "Victory points: Buy as many victory points as you like for $4 each."], ["action" + r.POINTS3, "Siegpunkte: Kaufe beliebig viele Punkte für je $3.", "Victory points: Buy as many victory points as you like for $3 each."], ["action" + r.POINTS2, "Siegpunkte: Kaufe beliebig viele Punkte für je $2.", "Victory points: Buy as many victory points as you like for $2 each."], ["buyPointsTitle", "Kaufe Siegpunkte", "Buy victory points"], ["buyPointsExceedsLimit", "Du kannst Siegpunkte für je $%1 kaufen. Du hast $%2, du liegst also $%3 über deinem Geldlimit.<br>Kaufe", "You may buy victory points for $%1 each. You own $%2 exceeding your cash limit by $%3.<br>Buy"], ["buyPoints", "Du kannst Siegpunkte für je $%1 kaufen. Du hast $%2, du liegst also innerhalb deines Geldlimits von $%3.<br>Kaufe", "You may buy victory points for $%1 each. You own $%2, so you are within your cash limit of $%3.<br>Buy"], ["buy4$", " Siegpunkte für $%1 ($%2 übrig, Limit $%3)", " victory points for $%1 ($%2 left, limit $%3)"], ["defendBuilding", "Verteidige dein Gebäude gegen einen Angriff.", "Defend your building against an attack."], ["attackBuilding", "Greife dieses Gebäude an.", "Attack that building."], ["cashLimit", "Prüfe Geldlimit", "Check cash limit"], ["handleCashLimitTitle", "Geldbetrag über Geldlimit", "Money beyond cash limit"], ["handleCashLimit", "Du hast $%1, dein Geldlimit liegt jedoch bei $%2. Du musst mindestens $%3 abgeben und bekommst dafür 1 Siegpunkt je $10.\nSoll der Betrag aufgerundet werden?", "You own $%1 but your cash limit is only $%2. You have to give away at least $%3 and get 1 victory point per $10.\nWould you like to complete the amount to the next multiple of 10?"], ["handleBuildRoads", "Du kannst noch Wege und Brücken bauen oder den Zug beenden", "You may build roads and bridges or finish your move"], ["infoPlayer", "Details für %1", "Details for %1"], ["sum$placed", "Gesamtkosten aller Felder, auf die %1 Cowboys gestellt hat: $%2", "Total cost for all spaces %1 placed cowboys on: $%2"], ["infoDuelTiles4two", "Je ein Duellplättchen mit dem Wert 0 bis 5", "6 duel tiles numbered 0 to 5"], ["infoDuelTiles", "Summe am Anfang: %1<br>aktuell: %4 Plättchen mit Summe %5<br>gespielt: %2 Plättchen mit Summe %3", "Sum at the beginning: %1<br>current state: %4 tiles with at total of %5<br>played %2 tiles with a total of %3"], ["duelTilesRefilled", "Keine Information verfügbar: es wurden bereits neue Duellplättchen nachgezogen", "No information available: duel tiles have already been refilled"], ["infoactions", "Anklicken für Informationen zu den Aktionsfeldern", "Click here to get information about the action squares"], ["infobuyparcels", "Anzeige der Kosten der verfügbaren Parzellen an-/abschalten", "Click here to activate/deactivate displaying the cost of available parcels"], ["infoincome", "Anzeige der Einkommen aller Gebäude an-/abschalten", "Click here to activate/deactivate displaying income of all buildings"], ["infobuilding", "Anklicken für Informationen zu den Gebäuden", "Click here to get information about the buildings"], ["infoActions", "Aktionsfelder", "Action squares"], ["infoBag", "Gebäude im Beutel", "Buildings in bag"], ["infoBuilding", "Gebäude", "Buildings"], ["infoBuildingCore", "<span class=type>%2 <\/span><span class=available>%5<\/span><br><span class=setting>Bauregel: <\/span>%1<br><span class=income>Ertrag: <\/span>%3<br><span class=special>Eigenschaft: <\/span>%4", "<span class=type>%2 <\/span><span class=available>%5<\/span><br><span class=setting>Setting condition: <\/span>%1<br><span class=income>Income: <\/span>%3<br><span class=special>Special rule: <\/span>%4"], ["infoBuildingInBag", "(%1 von %2 im Beutel)", "(%1 of %2 left in bag)"], ["infoBuildingConnected", "Muss an einem Weg liegen.", "Has to be connected."], ["infoBuildingHouse", "Es muss ein Wohnhaus gebaut werden.", "A house has to be built."], ["infoBuilding" + o.HOUSE, ["Haus", "-", "-", "-", ""], ["House", "-", "-", "-", ""]], ["infoBuilding" + o.BANK, ["Bank", "$3 pro angrenzendem eigenen oder freien Wohnhaus und pro eigener Silbermine (muss nicht angrenzen)", "-"], ["Bank", "$3 per neighboring own or free house and per own mine (has not to be adjacent)", "-"]], ["infoBuilding" + o.CHURCH, ["Kirche", "-", "zählt bei Berechnung der Einkommen von Drugstore, Bank und Saloon als Haus. Verhindert Angriffe auf eigene angrenzende Gebäude."], ["Church", "-", "counts as house when calculating the income of drugstore, bank and saloon. Prevents attacks on own adjacent buildings."]], ["infoBuilding" + o.PRISON, ["Gefängnis", "-", "+2 Revolver"], ["prison", "-", "+2 guns"]], ["infoBuilding" + o.DRUGSTORE, ["Drugstore", "$3 pro angrenzendem eigenen oder freien Wohnhaus und pro eigener Ranch (muss nicht angrenzen)", "-"], ["Drugstore", "$3 per adjacent own or free house and per own ranch (has not to be adjacent)", "-"]], ["infoBuilding" + o.RANCH, ["-", "Ranch", "$1 für jede angrenzende unbebaute Parzelle", "+1 Revolver"], ["-", "Ranch", "$1 per adjacent free parcel", "+1 gun"]], ["infoBuilding" + o.MINE, ["-", "Mine", "$3 pro angrenzendem eigenen oder freien Berg", "+1 Revolver"], ["-", "Mine", "$3 per adjacent own or free mountain", "+1 gun"]], ["infoBuilding" + o.SALOON, ["Saloon", "$5 pro angrenzendem eigenen oder freien Wohnhaus", "-"], ["Saloon", "$5 per adjacent own or free house", "-"]], ["infoBuilding" + o.HOTEL, ["Hotel", "$6", "zählt bei Berechnung der Einkommen von Drugstore, Bank und Saloon als 2 Häuser"], ["Hotel", "$6", "counts as 2 houses when calculating the income of drugstore, bank and saloon"]], ["phase" + t.PHASE.SIDEPERSON, "Spielaufbau: Auswahl der Seiten der Personenkarten", "Game setup: Choosing sides of personality cards to begin with"], ["phase" + t.PHASE.NEWBEGINNING, "Spielaufbau 'Ein neuer Anfang'", "Game setup 'A new beginning'"], ["initNewBeginning", "%1 kauft für $%2: %3 <img class=die src=" + GameImagePath + "meeple0.gif> / %4 <img class=die src=" + GameImagePath + "gun.gif> / %5 <img class=die src=" + GameImagePath + "road.gif> / %6 <img class=die src=" + GameImagePath + "property0.gif> / %7 <img class=die src=" + GameImagePath + "points.gif>", "%1 buys for a total of $%2: %3 <img class=die src=" + GameImagePath + "meeple0.gif> / %4 <img class=die src=" + GameImagePath + "gun.gif> / %5 <img class=die src=" + GameImagePath + "road.gif> / %6 <img class=die src=" + GameImagePath + "property0.gif> / %7 <img class=die src=" + GameImagePath + "points.gif>"], ["newBeginningSpecials", "Spezialfähigkeiten: %1", "special powers: %1"], ["influence", "Einflussreiche Beziehungen", "Influential Connections"], ["flipPerson", "%1 dreht '%2' um", "%1 flips '%2'"], ["nepotism", "Vetternwirtschaft", "Great Service Done"], ["askuseNepotism", "Nachfrage Vetternwirtschaft", "Request for Great Service Done"], ["useNepotism", "Willst du diese Runde gefragt werden, ob du deine Eigenschaft 'Vetternwirtschaft' nutzen willst?<br>Wenn ja, kommst du nochmal dran, wenn alle Spieler ihre Personenkarte ausgewählt haben, um dann endgültig zu entscheiden.", "Do you want to get asked this round if you want to use your special power 'Great Service Done'?<br>In that case you will be called again, when all players have chosen their personality cards to make your final decision. "], ["doNepotism", "Vetternwirtschaft: Wähle deine 2. Personenkarte oder verzichte", "Great Service Done: Choose your 2nd personality card"], ["postpone", " und spare die Aktion für eine spätere Runde", " or set this action aside for a later round"], ["noNephew", "Aktion verschoben: Keine 2. Personenkarte gewählt", "Action postponed: no 2nd personality card chosen"], ["sniper", "Scharfschütze", "Marksman"], ["sniperRefill", "Als Scharfschütze darfst du die letzten beiden Duellplättchen ablegen und bereits früher neue ziehen.<br>Willst du neue ziehen?", "As Marksman you are allowed to discard the last up to two duel tiles to draw new ones a bit earlier.<br>Do you want to draw new duel tiles?"], ["nepotismUsed", "'Vetternwirtschaft' wurde bereits eingesetzt", "'Great Sevice Done' was already used"], ["newBeginningBid", "%1 bietet $%2", "%1 bids $%2"], ["newBeginningStart", "Startspieler: %1 -> %2 zahlt $%3 und wird Startspieler", "Starting player: %1 -> %2 pays $%3 and is starting player"], ["phaseDuelTiles", "Spielaufbau 'Das Recht des Stärkeren'", "Game setup: 'Might is right'"], ["initDuelTiles", "%1 erhält Duellplättchen mit der Summe %2 und $%3", "%1 gets duel tiles with a total of %2 and $%3"], ["phase" + t.PHASE.START1, "Spielaufbau: Besitzmarker setzen - 1. Runde", "Game setup: setting property tiles - 1st round"], ["phase" + t.PHASE.START2, "Spielaufbau: Besitzmarker setzen - 2. Runde", "Game setup: setting property tiles - 2nd round"], ["phase" + t.PHASE.START3, "Spielaufbau: Besitzmarker setzen - 3. Runde", "Game setup: setting property tiles - 3rd round"], ["phase" + t.PHASE.START4, "Spielaufbau: Besitzmarker setzen - 4. Runde", "Game setup: setting property tiles - 4th round"], ["phase" + t.PHASE.PERSON, "Personenkarten auswählen", "Choice of personality card"], ["phase" + t.PHASE.NEPOTISM, "Vetternwirtschaft: 2. Personenkarte", "Great Service Done: 2nd personality card"], ["phase" + t.PHASE.PLACE, "Cowboys einsetzen", "Cowboy placement"], ["phase" + t.PHASE.ACTIONS, "Aktionen ausführen", "Performing actions"], ["phase" + t.PHASE.ASKHOUSE, "Anfrage um Benutzung einer fremden Parzelle für einen Hausbau.", "Asking for permission to use a foreign parcel to build a house."], ["phase" + t.PHASE.ROUNDEND, "Rundenende", "End of Round"], ["phase" + t.PHASE.CASHLIMIT, "Geldlimit prüfen", "Check cash limit"], ["phase" + t.PHASE.NEWROUND, "Aufbau neue Runde", "Setup new round"], ["phase" + t.PHASE.BUILDROADS, "Wege bauen", "Build roads"], ["propertySet", "Besitzmarker eingesetzt (%1)", "Property tile set (%1)"], ["personChosen", "Personenkarte: %1 %2", "Personality: %1 %2"], ["side0", "(gelb)", "(yellow)"], ["side1", "(rot)", "(red)"], ["resource" + r.RESOURCES.COIN, "Dollar", "dollar"], ["resource" + r.RESOURCES.GUN, "Revolver", "gun(s)"], ["resource" + r.RESOURCES.POINT, "Punkt(e)", "point(s)"], ["resource" + r.RESOURCES.ROAD, "Weg(e)", "road(s)"], ["resource" + r.RESOURCES.COWBOY, "Cowboy(s)", "cowboy(s)"], ["getResources", "Erhalte %2 %1", "Get %2 %1"], ["buyResources", "Kaufe %2 %1 für $%3", "Buy %2 %1 for $%3"], ["playerBuyResources", "%1 kauft %2 %4 für $%3", "%1 buys %2 %4 for $%3"], ["isSheriff0", "Cowboy", "Cowboy"], ["isSheriff1", "Sheriff", "Sheriff"], ["cowboySetOnAction", "%2 auf Aktionsfeld '%1' gesetzt", "%2 set on action square '%1'"], ["cowboySetOnParcel", "%2 auf Parzelle gesetzt (%1)", "%2 set on parcel (%1)"], ["cowboySetToDefend", "%2 zur Verteidigung auf Parzelle gesetzt (%1)", "%2 set to defend parcel (%1)"], ["cowboySetToAttack", "%2 zum Angriff auf Parzelle gesetzt (%1)", "%2 set to attack parcel (%1)"], ["passed", "gepasst", "passed"], ["autopass", "%1 hat keine Cowboys mehr und passt automatisch", "%1 has no cowboy left and passes automatically."], ["actionsquare" + r.INCOME, "Lohn", "Wages"], ["actionsquare" + r.GUNS3, "Munition", "Ammunition"], ["actionsquare" + r.ROADS3, "3 Wege", "3 roads"], ["actionsquare" + r.ROAD, "1 Weg", "1 road"], ["actionsquare" + r.BUYBUILDING, "Kaufe Gebäude ($%1)", "Buy building ($%1)"], ["actionsquare" + r.INCOMEPARCELS, "Einkommen für Grundbesitz", "Parcels income"], ["actionsquare" + r.INCOMEGUNS, "Einkommen für Stärke", "Firepower income"], ["actionsquare" + r.INCOMEDICE, "Einkommen durch Würfeln", "Gambling income"], ["actionsquare" + r.POINTSPARCELS, "Siegpunkte für Grundbesitz", "Parcels victory points"], ["actionsquare" + r.POINTSGUNS, "Siegpunkte für Stärke", "Firepower victory points"], ["actionsquare" + r.POINTSBUILDINGS, "Siegpunkte für Gebäude", "Estate victory points"], ["actionsquare" + r.POINTS5, "Siegpunkte für $5", "Victory points for $5"], ["actionsquare" + r.POINTS4, "Siegpunkte für $4", "Victory points for $4"], ["actionsquare" + r.POINTS3, "Siegpunkte für $3", "Victory points for $3"], ["actionsquare" + r.POINTS2, "Siegpunkte für $2", "Victory points for $2"], ["perform", "%1: %2 erhält %3 %4", "%1: %2 gets %3 %4"], ["border" + h.TOP, "oberhalb", "on top"], ["border" + h.BOTTOM, "unterhalb", "below"], ["border" + h.LEFT, "links", "on the left side"], ["border" + h.RIGHT, "rechts", "on the right side"], ["halfCost1", "", ""], ["halfCost0", " zu den halben Kosten", " for half of the cost"], ["buildRoad", "%1 baut eine Straße %3 von %2", "%1 built a road %3 of %2"], ["buildBridge", "%1 baut eine Brücke %3 von %2", "%1 built a bridge %3 of %2"], ["builtBuilding", "%1 baut %2 ($%3)%5 auf %4", "%1 built %2 ($%3) on %4%5"], ["builtHouse", "%1 baut %2 auf %3", "%1 built %2 on %3"], ["builtChurch", "Kirche gebaut: Angriff von %1 auf %2 schlägt fehl", "Church built: attack of %1 on %2 fails"], ["building2stock", "%1 nimmt %2 ($%3)%4 in den Vorrat", "%1 puts %2 ($%3) to the stock%4"], ["buildingForfeit", "%1 verzichtet auf %2 für $%3", "%1 doesn't want %2 for $%3"], ["builtFromStock", "%1 baut %2 aus dem Vorrat auf %3", "%1 builds %2 from stock on %3"], ["ask4houseAllowed", "Erlaubnis erteilt für Parzelle %1", "Permission granted for parcel %1"], ["ask4houseNoneAllowed", "Keine Erlaubnis für eine Parzelle erteilt", "No Permission granted for any parcel"], ["getGuns", " -> +%1 Revolver", " -> +%1 guns"], ["income", "Einkommen: %2 erhält $%3 für %4 auf %1", "Income: %2 gets $%3 for %4 on %1"], ["cashLimitChecked", "%1 gibt $%3 ab und erhält %2 Siegpunkt(e)", "%1 handed over $%3 and gets %2 victory point(s)"], ["endMercenary", "%1 gibt Revolverheld ab -> -%2 Revolver", "%1 returns mercenary -> -%2 guns"], ["endGuns3", "%1 gibt Sonderplättchen Revolver ab -> -%2 Revolver", "%1 returns special gun tile -> -%2 guns"], ["duelOnParcel", "Duell auf Parzelle %1:<br/>", "Duel on parcel %1:<br/>"], ["duelOnAction", "Duell um Aktionsfeld '%1':<br/>", "Duel on action space '%1':<br/>"], ["duelWinner", "%1 gewinnt das Duell (%2) gegen", "%1 wins duel (%2) against"], ["duelLoser", "<br/>&nbsp;&nbsp;%1 (%2)", "<br/>&nbsp;&nbsp;%1 (%2)"], ["sheriffLostDuel", "%1 verliert ein Duell und bekommt 3 Siegpunkte", "%1 lost a duel and gets 3 victory points"], ["grocerDouble", "%1 verdoppelt das Einkommen für %2", "%1 doubles the income for %2"], ["grocerTake8", "%1 nimmt $8", "%1 takes $8"], ["grocerRed", "%1 bekommt %2 Siegpunkte für eigene Wohnhäuser", "%1 gets $2 victory points for own houses"], ["settlerRed", "%1 bekommt %2 Siegpunkte für eigene Berge", "%1 gets $2 victory points for own mountains"], ["parcelBought", "%1 kauft die Parzelle %2 für $%3", "%1 buys parcel %2 for $%3"], ["forfeitBuyParcel", "%1 verzichtet auf den Kauf der Parzelle %2", "%1 does without buying parcel %2"], ["tooCostly" + r.BUYPARCEL, "%1 kann die Parzelle %4 nicht kaufen - zu wenig Geld: $%2 (Kosten: $%3)", "%1 can't buy parcel %4 - not enough money: $%2 (cost: $%3)"], ["tooCostly" + r.BUILDING1, "%1 kann das Gebäude nicht kaufen - zu wenig Geld: $%2 (Kosten: $%3)", "%1 can't buy building - not enough money: $%2 (cost: $%3)"], ["endScoreTitle", "Schlußwertung", "Scoring game end"], ["endScore", "%1 erhält %2 Punkte für bebaute Parzellen und %3 Punkte für Geld", "%1 gets %2 points for built-up area and %3 points for money"]]
        }, init: function () {
            var i, e, t, f, n;
            for (this.s = [], i = this.getDefinitions(), e = window.UserLang == "0" ? 1 : 2, t = 0; t < i.length; t++) f = i[t], this.s[f[0]] = f[e];
            for (s.ALL.forEach(function (n) {
                u.s["personinfo" + n + s.YELLOW] = ni(u.s["person" + n]) + ": " + u.s["personinfo" + n + s.YELLOW];
                u.s["personinfo" + n + s.RED] = ni(u.s["person" + n]) + ": " + u.s["personinfo" + n + s.RED]
            }), n = r.BUILDING1; n <= r.BUILDING7; n++) this.s["actionsquare" + n] = this.get("actionsquare" + r.BUYBUILDING, [o.getCost4Building(n - r.BUILDING1)]);
            u.s["infoBuilding" + o.HOUSE].unshift(u.s.infoBuildingConnected);
            [o.BANK, o.SALOON, o.HOTEL, o.CHURCH, o.PRISON, o.DRUGSTORE].forEach(function (n) {
                u.s["infoBuilding" + n].unshift([u.s.infoBuildingConnected, u.s.infoBuildingHouse].join(" "))
            })
        }, get: function (n, t) {
            var r, i;
            for (t = t || [], r = this.s[n] || n, i = 0; i < t.length; i++) r = r.replace(new RegExp("%" + (i + 1), "g"), t[i]);
            return r
        }, info: function (n, t) {
            $("#infoLabel").html(n === undefined ? this.standardInfo() : this.get(n, t))
        }, standardInfo: function () {
            if (t.hasEnded() && f.state === f.STATE.START) return this.s.gameOver;
            if (IsHistory) return this.s.isHistory;
            if (!t.isActive()) return this.s.awaitingTurn;
            if (t.phase() === t.PHASE.NEWBEGINNING) return this.s.newBeginning;
            if (t.phase() === t.PHASE.SIDEPERSON) return this.s.chooseSidePerson;
            if (t.phase() === t.PHASE.ASKEDHOUSE) return this.s.phaseAsk4permission;
            if (f.isDone() || l(t.phase(), [t.PHASE.BUILDROADSEND, t.PHASE.BUILDROADS]) && f.state == f.STATE.FORCEEND) return this.s.finishMove;
            if (l(t.phase(), [t.PHASE.BUILDROADSEND, t.PHASE.BUILDROADS])) return this.s.handleBuildRoads;
            switch (f.state) {
                case f.STATE.COLOR:
                    return this.s.chooseYourColor;
                case f.STATE.START:
                    switch (t.phase()) {
                        case t.PHASE.START1:
                        case t.PHASE.START2:
                        case t.PHASE.START3:
                        case t.PHASE.START4:
                            return this.s.chooseProperty;
                        case t.PHASE.PERSON:
                            return this.s.choosePerson;
                        case t.PHASE.NEPOTISM:
                            return this.s.doNepotism + (t.state.getBasicData().getRound() < 4 ? u.s.postpone : "");
                        case t.PHASE.PLACE:
                            return this.s.placeCowboy;
                        case t.PHASE.DUELSEQUENCE:
                            return this.s.chooseDuel;
                        case t.PHASE.REDBANKER:
                            return this.get("actionPersonality", [this.s["person" + s.BANKER]]) + ": " + this.s.buyPointsTitle;
                        case t.PHASE.CASHLIMIT:
                            return this.s.cashLimit;
                        default:
                            return u.s.doMove
                    }
                case f.STATE.ASKUSENEPOTISM:
                    return this.s.askuseNepotism;
                case f.STATE.DUELTILE:
                    return this.s.chooseDuelTile;
                case f.STATE.DUEL:
                    return this.s.duel;
                case f.STATE.SETPROPERTY:
                    return this.s.chooseProperty;
                case f.STATE.BUYPARCEL:
                    return this.s["action" + r.BUYPARCEL + "title"];
                case f.STATE.CHARACTERACTION:
                    return this.s.characterAction;
                case f.STATE.BUILD:
                    return this.s.build;
                case f.STATE.BUYPOINTS:
                    return this.s.buyPointsTitle;
                case f.STATE.FORCEEND:
                    return this.s.finishMove
            }
            return this.s.infoAwaitingTurn
        }
    }, ft = {
        getViewPortSize: function () {
            if (window.innerWidth != null) return {w: window.innerWidth, h: window.innerHeight};
            var n = window.document;
            return document.compatMode == "CSS1Compat" ? {
                w: n.documentElement.clientWidth,
                h: n.documentElement.clientHeight
            } : {w: n.body.clientWidth, h: n.body.clientHeight}
        }, getSize: function () {
            this.size = this.getViewPortSize();
            this.size.t = Math.ceil($("#GameHeader").height()) + 2;
            this.size.b = Math.max(50, Math.ceil($("#tableFooter").height()) + 4);
            this.size.h = Math.floor(this.size.h - this.size.t - this.size.b)
        }, setSize: function () {
            this.getSize();
            var n = Math.round(this.size.w * .645), t = this.size.w,
                t = n > this.size.h ? Math.round(this.size.h * 1.55) : this.size.w, n = Math.round(t * .645);
            this.size.h = Math.max(516, n);
            this.size.w = Math.max(800, t);
            this.size.em = Math.round((this.size.w - 740) / 120 + 10);
            $("#gameWindow").css({
                "margin-top": this.size.t + "px",
                height: n + "px",
                width: t + "px",
                overflow: this.size.w > t || this.size.h > n ? "auto" : "hidden"
            });
            $("#gameContainer").css({height: this.size.h + "px", width: this.size.w + "px", "font-size": this.size.em});
            $("#moveInfo").length && $("#moveInfo").scrollTop($("#moveInfo").get(0).scrollHeight)
        }
    }, k = [], tt = [], rt = 0, ut = [], it;
    typeof Array.prototype.map != "function" && (Array.prototype.map = function (n) {
        for (var i = [], t = 0, r = this.length; t < r; t++) i[t] = n.call(this.Arg, this[t], t);
        return i
    });
    typeof Array.prototype.filter != "function" && (Array.prototype.filter = function (n) {
        for (var i = [], t = 0, r = this.length; t < r; t++) n.call(this.Arg, this[t], t) && i.push(this[t]);
        return i
    });
    typeof Array.prototype.forEach != "function" && (Array.prototype.forEach = function (n) {
        for (var t = 0, i = this.length; t < i; t++) n.call(this.Arg, this[t], t)
    });
    p = {
        checkUndo: function () {
            return (rt++, ut.length < rt) ? (ut.push(k.length), !0) : ut[rt - 1] === k.length
        }, yesNo: function (n, t, i, r) {
            if (this.checkUndo()) {
                var f = $("<div/>", {"class": "dialog", title: n}).append(t);
                f.dialog({
                    autoOpen: !1,
                    modal: !1,
                    resizable: !0,
                    closeOnEscape: !1,
                    dialogClass: "noX-Icon",
                    position: {my: "center", at: "center", of: $("#playerOverview"), collision: "fit"},
                    open: function () {
                        g()
                    },
                    close: function () {
                        f.remove()
                    },
                    buttons: [{
                        text: u.s.no, click: function () {
                            new b(function () {
                                return ""
                            }, function () {
                                return !0
                            }, function () {
                                i[1] !== undefined && i[1]();
                                r !== undefined && r()
                            }, n + " no").perform();
                            f.dialog("close")
                        }
                    }, {
                        text: u.s.yes, click: function () {
                            new b(function () {
                                return ""
                            }, function () {
                                return !0
                            }, function () {
                                i[0] !== undefined && i[0]();
                                r !== undefined && r()
                            }, n + " yes").perform();
                            f.dialog("close")
                        }
                    }]
                });
                f.dialog("open").dialog("widget").position({
                    my: "center",
                    at: "center",
                    of: $("#playerOverview"),
                    collision: "fit"
                })
            }
        }, options: function (n, t) {
            if (this.checkUndo()) {
                t = t || {};
                t.html === undefined && (t.html = $());
                t.options && t.checked === undefined && (t.checked = t.options.length ? t.options[0][0] : 0);
                var i = $("<div/>", {"class": "dialog handler", title: n}).append(t.html);
                i.dialog({
                    autoOpen: !1,
                    modal: !1,
                    resizable: !0,
                    closeOnEscape: !1,
                    dialogClass: "noX-Icon",
                    position: {my: "center", at: "center", of: $("#playerOverview"), collision: "fit"},
                    close: function () {
                        i.remove()
                    },
                    open: function () {
                        if (g(), t.onOpen !== undefined) t.onOpen(i)
                    },
                    buttons: [{
                        text: u.s.ok, click: function () {
                            function n() {
                                var n;
                                return i.children().filter(function () {
                                    return $(this).attr("name") == "options"
                                }).each(function () {
                                    (!t.options && $(this).hasClass("checked") || t.options && $(this).is(":checked")) && (n = $(this).attr("value") * 1)
                                }), function () {
                                    if (t.perform !== undefined && t.perform(n), t.onClose !== undefined) t.onClose(i)
                                }
                            }

                            new b(function () {
                                return ""
                            }, function () {
                                return !0
                            }, n()).perform();
                            i.dialog("close")
                        }
                    }]
                });
                t.options && t.options.forEach(function (n) {
                    i.append("<input type=radio name=options value='" + n[0] + "'" + (n[0] === t.checked ? " checked=checked" : "") + ">" + n[1] + "<br>")
                });
                t.init && t.init(i);
                i.dialog("open").dialog("widget").position({
                    my: "center",
                    at: "center",
                    of: $("#playerOverview"),
                    collision: "fit"
                })
            }
        }
    };
    $.fn.pngFix = function () {
        return !$.browser.msie || $.browser.version >= 9 ? $(this) : $(this).each(function () {
            var n = $(this), t = n.attr("src");
            n.attr("src", BaseImagePath + "c/t.png").css("filter", "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='crop',src='" + t + "')")
        })
    };
    pt = 0;
    wt = 0;
    FinishMove = function () {
        f.finish()
    };
    CancelMove = function () {
        dt();
        a.show()
    };
    UserGiveUp = function () {
        t.phase(t.PHASE.GIVENUP);
        ri()
    };
    InitBoard = function () {
        a.show()
    };
    ResizeBoard = function () {
        ft.setSize()
    }
}()