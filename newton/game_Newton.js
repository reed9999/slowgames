y$.game = function () {
    function r() {
        y$.gameInfo.numPlayers === 2 && y$.opinion.activateOption(y$.opinion.options.tie);
        y$.basegame.settings.useColorSymbols = !1;
        y$.userPreferences.define("layout", {"default": t.Columns, device: !0});
        y$.userPreferences.define("arePopupsDraggable", {"default": 1, device: !0})
    }

    function u() {
        var n = $("#board").width(), t = $("#playerData").width(), i = Math.max(1, 100 - 100 * n / (n + t));
        $("#playerData").width(i + "%")
    }

    function f() {
        var t, r, u;
        for (y$.gameButtons.addButton("player", "potion", function () {
            y$.service.doAction(y$.game.Actions.BuyPotion)
        }, {
            hidden: function () {
                return !y$.allowedParams[y$.game.Actions.BuyPotion]
            }, uiIcon: "plus", hoverText: "buyPotion"
        }), y$.gameButtons.addButton("player", "skip", function () {
            y$.service.doAction(y$.game.Actions.Skip)
        }, {
            hidden: function () {
                return !y$.allowedParams[y$.game.Actions.Skip]
            }, uiIcon: "delete", hoverText: "skipAction"
        }), y$.gameButtons.addButton("player", "skipCard", function () {
            y$.service.doAction(y$.game.Actions.SkipBasicAction)
        }, {
            hidden: function () {
                return !y$.allowedParams[y$.game.Actions.SkipBasicAction]
            }, uiIcon: "alert", hoverText: "noAction"
        }), y$.gameButtons.addButton("player", "aFixed", function () {
            y$.service.doAction(y$.game.Actions.AbandonFixed)
        }, {
            hidden: function () {
                return !y$.allowedParams[y$.game.Actions.AbandonFixed]
            }, uiIcon: "delete", hoverText: "doAbandonFixed"
        }), y$.gameButtons.addButton("player", "aIncome", function () {
            y$.service.doAction(y$.game.Actions.AbandonIncome)
        }, {
            hidden: function () {
                return !y$.allowedParams[y$.game.Actions.AbandonIncome]
            }, uiIcon: "delete", hoverText: "doAbandonIncome"
        }), y$.dom.ActionCards = $("<div>", {
            id: "ActionCards",
            "class": "ActionCards board"
        }), t = 1; t <= 3; t++) y$.dom.ActionCards.append($("<div/>", {
            id: "Level" + t,
            "class": "level"
        }).append(n.deck(t)));
        for (y$.dom.Technology = $("<div>", {
            id: "Technology",
            "class": "Technology board"
        }).append(y$.basegame.getImg("StudyBoard.jpg").addClass("map")).append($("<div>", {
            id: "technology-enroll",
            "class": "optional"
        }).append(y$.basegame.getImg("add_student.png"))), y$.game.TECHNOLOGY_TYPES.forEach(function (n, t) {
            y$.dom.Technology.append($("<div/>", {
                id: "technology" + t,
                "class": "location " + y$.utils.getKey(n, y$.game.LocationTypes)
            }).append($("<div/>", {"class": "meeples"})))
        }), r = 1; r <= 3; r++) y$.dom.Technology.append($("<div>", {id: "IncomeTile" + r, "class": "IncomeTile"}));
        for (u = 1; u <= 5; u++) y$.dom.Technology.append($("<div>", {id: "ActionTile" + u, "class": "ActionTile"}));
        y$.dom.Work = $("<div>", {id: "Work", "class": "Work"});
        y$.game.WORK_TYPES.forEach(function (n, t) {
            y$.dom.Work.append($("<div/>", {
                id: "work" + t,
                "class": "location " + y$.utils.getKey(n, y$.game.LocationTypes)
            }).append($("<div/>", {"class": "meeples"})))
        });
        y$.dom.TravelMap = $("<div>", {
            id: "TravelMap",
            "class": "TravelMap board"
        }).append(y$.basegame.getImg("TravelBoard.jpg").addClass("map"));
        y$.game.TRAVEL_TYPES.forEach(function (n, t) {
            y$.dom.TravelMap.append($("<div/>", {
                id: "travel" + t,
                "class": "location " + y$.utils.getKey(n, y$.game.LocationTypes)
            }).append($("<div/>", {"class": "meeples"})))
        });
        y$.dom.TravelMap.append($("<div>", {id: "IncomeTile4", "class": "IncomeTile"}));
        y$.dom.board.append(y$.dom.TravelMap).append(y$.dom.Technology.append(y$.dom.Work)).append(y$.dom.ActionCards);
        i();
        y$.players.forEach(e)
    }

    function i() {
        function n() {
            $("#game").addClass("columnLayout").removeClass("rowLayout");
            $("#board").width("55%");
            $("#playerData").width("45%");
            y$.dom.board.resizable();
            y$.dom.board.resizable("destroy");
            y$.dom.board.resizable({resize: u, handles: "e"});
            $(".ui-resizable-handle.ui-resizable-se:not(.board_resize_handle)").remove();
            y$.dom.board.append(y$.dom.ActionCards.detach())
        }

        function i() {
            $("#game").addClass("rowLayout").removeClass("columnLayout");
            $("#board").width("");
            $("#playerData").width("");
            try {
                y$.dom.board.resizable("destroy")
            } catch {
            }
            y$.gameInfo.numPlayers <= 2 && y$.dom.players.append(y$.dom.ActionCards.detach())
        }

        function r() {
            $(window).width() > 1400 && $(window).width() > 4 / 3 * $(window).height() ? i() : n()
        }

        if (y$.userPreferences.get("layout") === t.Columns && n(), y$.userPreferences.get("layout") === t.Rows && i(), y$.userPreferences.get("layout") === t.RowsOrColumnsDependantOnWindowSize) {
            r();
            $(window).off("resize.applyLayoutSetting").on("resize.applyLayoutSetting", r)
        }
    }

    function e(t) {
        var i;
        for (y$.dom.player[t.idx].basic.append(n.firstPlayer()).append(y$.gui.createDataItem("coins", {image: y$.basegame.getImg("coin.png")})).append(y$.gui.createDataItem("potion", {image: y$.basegame.getImg("potion.png")})).append(y$.gui.createDataItem("master", {image: y$.basegame.getImg("master0.png")})).append(y$.gui.createDataItem("bonus", {image: y$.basegame.getImg("bonus.png")})).append(y$.gui.createDataItem("points", {image: y$.basegame.getImg("point.png")})), y$.dom.player[t.idx].detail.append($("<div>", {
            id: "HandCards" + t.idx,
            "class": "HandCards map"
        })).append($("<div>", {
            id: "StudyBoard" + t.idx,
            "class": "StudyBoard map"
        }).append(y$.basegame.getImg("PlayerBoard.gif").addClass("map")).append($("<div/>", {
            id: "library" + t.idx,
            "class": "library"
        })).append($("<div/>", {id: "books" + t.idx, "class": "books"})).append($("<div/>", {
            id: "cubes1-" + t.idx,
            "class": "cubes c1"
        })).append($("<div/>", {id: "cubes2-" + t.idx, "class": "cubes c2"})).append($("<div/>", {
            id: "desk" + t.idx,
            "class": "desk"
        })).append($("<div/>", {id: "extra" + t.idx, "class": "extra"})).append($("<div/>", {
            id: "fixed" + t.idx,
            "class": "fixed"
        }))), y$.data.state !== y$.game.States.endOfGame && t.idx == y$.user.idx && y$.user.isPlayer && $("#StudyBoard" + t.idx).append($("<div/>", {
            id: "req",
            "class": "req"
        }).append($("<div/>", {
            id: "req_volume",
            "class": "action"
        }).append(y$.basegame.getImg("req_volume.png"))).append($("<div/>", {
            id: "req_potions",
            "class": "action"
        }).append(y$.basegame.getImg("req_potions.png")))), i = 0; i < 44; i++) y$.dom.player[t.idx].detail.find(".library").append($("<div/>", {
            id: "lib" + t.idx + "-" + i,
            "class": "lib"
        }));
        for (i = 0; i < 4; i++) y$.dom.player[t.idx].detail.find(".books").append($("<div/>", {
            id: "book" + t.idx + "-" + i,
            "class": "pile"
        }));
        y$.basegame.activateElement($("#playerDataBasic" + t.idx + " .master"), function () {
            y$.game.getMasterInfo(t.idx)
        }, {stayActive: !0, cursor: "url(" + y$.basegame.baseUrlImg + "cursorZoom.png), pointer"});
        y$.basegame.activateElement($("#playerDataBasic" + t.idx + " .bonus"), function () {
            y$.game.getBonusInfo(t.idx)
        }, {stayActive: !0, cursor: "url(" + y$.basegame.baseUrlImg + "cursorZoom.png), pointer"})
    }

    function o() {
        var t, i, r;
        for ($(".update").remove(), t = 1; t <= 3; t++) y$.dom.ActionCards.find("#Level" + t + " .num").text(y$.data.public.DeckSizes[t - 1]), y$.data.public.Levels[t - 1].forEach(function (i) {
            y$.dom.ActionCards.find("#Level" + t).append(n.cardSlot(i, !0).addClass("update"))
        });
        for (y$.data.public.Travel.forEach(function (t, i) {
            y$.dom.TravelMap.find("#travel" + i).append(n.token(y$.game.TRAVEL_TYPES[i], t, !0).addClass("update"))
        }), y$.dom.TravelMap.find("#IncomeTile4").append(n.income(4).addClass("update")), y$.data.public.Work.forEach(function (t, i) {
            y$.dom.Work.find("#work" + i).append(n.token(y$.game.WORK_TYPES[i], t, !0).addClass("update"))
        }), y$.data.public.Technology.forEach(function (t, i) {
            y$.dom.Technology.find("#technology" + i).append(n.token(y$.game.TECHNOLOGY_TYPES[i], t, !0).addClass("update"))
        }), i = 1; i <= 3; i++) y$.dom.Technology.find("#IncomeTile" + i).append(n.income(i).addClass("update")).append($("<span/>", {
            id: "num",
            "class": "num"
        }).text(y$.data.public.NumIncomeTiles[i - 1]));
        for (r = 1; r <= 5; r++) y$.dom.Technology.find("#ActionTile" + r).append(n.action(r).addClass("update")).append($("<span/>", {
            id: "num",
            "class": "num"
        }).text(y$.data.public.NumDevelopmentTiles[r - 1]));
        c();
        y$.players.forEachData(function (t, i) {
            var e, f, u, r;
            y$.dom.player[i].basic.find(".firstPlayer").css({visibility: y$.data.public.StartPlayer == i ? "visible" : "hidden"});
            y$.dom.player[i].basic.find(".coins .itemValue").text(t.Coins);
            y$.dom.player[i].basic.find(".potion .itemValue").text(t.Potion);
            y$.dom.player[i].basic.find(".master .itemValue").text(t.Masters.length + "/4");
            y$.dom.player[i].basic.find(".bonus .itemValue").text(t.BonusTokens.length);
            e = t.Points;
            y$.data.state !== y$.game.States.endOfGame && (e += " (" + t.TotalPoints + ")");
            y$.dom.player[i].basic.find(".points .itemValue").text(e);
            t.Cards.forEach(function (t) {
                y$.dom.player[i].detail.find("#HandCards" + i).append(n.cardSlot(t, !0).addClass("update"))
            });
            u = 0;
            for (let [e, r] of Object.entries(t.Library)) f = y$.dom.player[i].detail.find("#lib" + i + "-" + e), r < 0 ? (f.append(n.book(-r).addClass("update")), u++) : r == y$.game.LIB_SCORED ? f.append(y$.basegame.getImg({basic: "ok.png"}).addClass("mark update")) : f.append(n.income(t.Library[e]).addClass("update")).append(y$.basegame.getImg({basic: "ok.png"}).addClass("mark update"));
            for (r = 1; r <= 4; r++) u = Math.min(3, t.Books - 3 * (4 - r)), y$.dom.player[i].detail.find("#book" + i + "-" + (r - 1)).append(n.book(u > 0 ? r : 0).addClass("update")).append($("<span/>", {
                id: "num",
                "class": "num update"
            }).text(u > 0 ? u : ""));
            for (r = 0; r < t.Cubes; r++) r < 4 || r % 2 == 1 ? y$.dom.player[i].detail.find("#cubes1-" + i).append(n.meeple("cube", i).addClass("update")) : y$.dom.player[i].detail.find("#cubes2-" + i).append(n.meeple("cube", i).addClass("update"));
            t.CardsRound.forEach(function (r, u) {
                var f = n.cardSlot(r, !0).addClass("update"), e;
                i == y$.data.onTurnIdx && (f.append($("<div/>", {
                    id: "effect" + r,
                    "class": "effect"
                }).append(y$.basegame.getImg({basic: "transparent.png"}))), t.CardsRound.length == u + 1 && y$.data.public.ActionValue > 0 && f.append($("<div/>", {
                    id: "action",
                    "class": "action optional"
                }).append(y$.basegame.getImg({basic: "transparent.png"})).append($("<span/>", {
                    id: "num",
                    "class": "num"
                }).text(y$.data.public.ActionValue))));
                y$.data.private[y$.user.idx] && (e = y$.data.private[y$.user.idx].lockedCardId, y$.partial.inUse() && y$.partial.any() && (e = y$.partial.get()), e === r && f.addClass("toLock"));
                y$.dom.player[i].detail.find("#desk" + i).append(f)
            });
            t.Developments.forEach(function (t, r) {
                y$.dom.player[i].detail.find("#extra" + i).append($("<div/>", {
                    id: "extra" + i + "-" + r,
                    "class": "update extraSlot"
                }).append(n.action(t)))
            });
            t.FixedCards.forEach(function (t) {
                y$.dom.player[i].detail.find("#fixed" + i).append(n.cardSlot(t).addClass("update"))
            });
            y$.dom.TravelMap.find("#travel" + t.Scientist + " .meeples").append(n.meeple("meeple", i).addClass("update"));
            t.Traveled.forEach(function (t) {
                y$.dom.TravelMap.find("#travel" + t + " .meeples").append(n.meeple("cube", i).addClass("update"))
            });
            y$.dom.Work.find("#work" + t.Work + " .meeples").append(n.meeple("disc", i).addClass("update"));
            t.Students.forEach(function (t) {
                y$.dom.Technology.find("#technology" + t + " .meeples").append(n.meeple("meeple", i).addClass("update"))
            })
        })
    }

    function s(n) {
        var t = $("<div/>", {id: "mastersDialog", "class": "mastersDialog"}), f = y$.data.public.PlayerData[n].Masters,
            i, r, u;
        t.append($("<div/>").addClass("title played").append(y$.text.s.MastersPlayed));
        i = $("<div/>", {id: "played", "class": "cards played"});
        f.length > 0 ? f.forEach(function (n) {
            i.append(y$.game.render.masterRules(n))
        }) : i.append("-");
        t.append(i);
        (y$.gameInfo.isFinished || n === y$.user.idx) && (r = y$.data.private[n].Masters, r.length > 0 && (t.append($("<div/>").addClass("title hand").append(y$.text.s.MastersOnHand)), u = $("<div/>", {
            id: "hand",
            "class": "cards hand"
        }), r.forEach(function (n) {
            u.append(y$.game.render.masterRules(n))
        }), t.append(u)));
        new y$.Dialog.options({
            title: y$.text.get("masterInfo", [y$.gameInfo.players[n].login]),
            textEl: t,
            myClass: "dialog",
            modal: !0,
            addClasses: "draftMasters",
            okBtn: !1
        })
    }

    function h(n) {
        var i = $("<div/>", {id: "bonusDialog", "class": "bonusDialog"}),
            t = $("<div/>", {id: "bonusTaken", "class": "bonus played"});
        y$.data.public.PlayerData[n].BonusTokens.length > 0 ? y$.data.public.PlayerData[n].BonusTokens.forEach(function (n) {
            t.append(y$.game.render.token(6, n))
        }) : t.append("-");
        i.append(t);
        new y$.Dialog.options({
            title: y$.text.get("bonusInfo", [y$.gameInfo.players[n].login]),
            textEl: i,
            myClass: "dialog",
            modal: !0,
            okBtn: !1
        })
    }

    function c() {
        var n, t, i;
        if (y$.data.additional != null && y$.data.additional[1] != null && (n = null, y$.data.public.CardType === y$.game.ActionSymbols.Library || y$.data.state == y$.game.States.BonusLibrary ? n = "#lib" + y$.data.onTurnIdx + "-" : y$.data.public.CardType === y$.game.ActionSymbols.Travel || y$.data.state == y$.game.States.BonusTravel ? n = "#travel" : y$.data.public.CardType === y$.game.ActionSymbols.Work || y$.data.state == y$.game.States.BonusWork ? n = "#work" : (y$.data.public.CardType === y$.game.ActionSymbols.Technology || y$.data.state == y$.game.States.BonusTechnology) && (n = "#technology"), n != null)) for (t in y$.data.additional[1]) i = y$.data.additional[1][t], i > 0 && $(n + t).append(l(t, i))
    }

    function l(n, t) {
        var i = $("<div/>", {id: "potions" + n, "class": "actionPotions update"});
        return t > 0 && i.append("+").append($("<span/>").append(t)).append(y$.basegame.getImg("potion.png")), i
    }

    function a() {
        var r = $("<select>", {name: "layout"}), u = y$.userPreferences.get("layout"),
            n = $("<option>", {value: t.Columns, text: y$.text.get("layoutColumns")});
        u === u.Columns && n.attr({selected: "selected"});
        r.append(n);
        n = $("<option>", {value: t.Rows, text: y$.text.get("layoutRows")});
        u === t.Rows && n.attr({selected: "selected"});
        r.append(n);
        n = $("<option>", {
            value: t.RowsOrColumnsDependantOnWindowSize,
            text: y$.text.get("layoutColumnsOrRowsDependantOnWindowsSize")
        });
        u === t.RowsOrColumnsDependantOnWindowSize && n.attr({selected: "selected"});
        r.append(n);
        y$.dom.gameTypeSettings.append(r);
        r.selectmenu();
        r.on("change", function (n) {
            var r = y$.userPreferences.get("layout"), t = n.target.value;
            t !== r && (y$.userPreferences.store("layout", t), i())
        });
        item = new y$.GUIsetting("arePopupsDraggable");
        y$.dom.gameTypeSettings.append(item.createHTML())
    }

    var t = {Rows: "Rows", Columns: "Columns", RowsOrColumnsDependantOnWindowSize: "RowsOrColumns"}, n = {
        action: function (n) {
            return y$.basegame.getImg("action" + n + ".png").addClass("action")
        }, book: function (n) {
            return y$.basegame.getImg("book" + n + ".png").addClass("book")
        }, income: function (n) {
            return y$.basegame.getImg("income" + n + ".png").addClass("book")
        }, card: function (n) {
            return y$.basegame.getImg("card" + n + ".png").addClass("card card" + n)
        }, cardSlot: function (t, i) {
            var u = $("<div/>", {"class": "cardSlot"}).append(n.card(t)), r;
            return t < 25 && u.append($("<span/>", {"class": "base"}).text("s")), i && (r = 0, [29, 35, 52, 53, 61, 65].includes(t) ? r = 1 : t == 40 ? r = 2 : [42, 44, 49].includes(t) ? r = 3 : t == 54 ? r = 4 : t == 56 ? r = 5 : t == 57 ? r = 6 : t == 58 ? r = 7 : t == 60 ? r = 8 : t == 63 ? r = 9 : t == 68 ? r = 10 : t == 69 && (r = 11), r > 0 && y$.basegame.addClickForHelp(u, {
                rules: "#effect" + r,
                appendInside: !0,
                addClasses: "help"
            })), u
        }, master: function (n) {
            return y$.basegame.getImg("master" + n + ".png").addClass("master")
        }, masterRules: function (n) {
            var t = $("<div/>", {"class": "masterDiv"});
            return y$.basegame.addRules({rules: "#master" + n, textEl: t}), t
        }, meeple: function (n, t) {
            return y$.basegame.getImg(n + y$.players.getColorIdx(t) + ".png").addClass(n)
        }, deck: function (n) {
            return $("<div/>", {"class": "cardSlot"}).append(y$.basegame.getImg("Deck" + n + ".png").addClass("card deck")).append($("<div>", {
                id: "addCards" + n,
                "class": "optional"
            }).append(y$.basegame.getImg("add_actioncards.png"))).append($("<span/>", {id: "num" + n, "class": "num"}))
        }, firstPlayer: function () {
            return y$.basegame.getImg("start.png").addClass("firstPlayer")
        }, token: function (n, t, i) {
            var u = $("<div/>", {"class": "tokenDiv"}), r;
            return n !== 0 && n !== 5 && n !== 8 && n !== 10 ? (r = y$.utils.getKey(n, y$.game.LocationTypes), u.append(y$.basegame.getImg(r + t + ".png").addClass("token " + r))) : u.append(y$.basegame.getImg({basic: "transparent.png"}).addClass("token none")), i && [1, 7, 9].includes(n) && y$.basegame.addClickForHelp(u, {
                rules: "#" + r.toLowerCase() + t,
                enableLinks: !0,
                appendInside: !0,
                addClasses: "help " + r
            }), i && t > 0 && [4, 6].includes(n) && y$.basegame.addClickForZoom(u, {
                appendInside: !0,
                addClasses: "zoom " + r
            }), u
        }
    };
    return y$.text.registerStrings([["layoutRows", "Zeilenlayout", "Row layout"], ["layoutColumns", "Spaltenlayout", "Column layout"], ["layoutColumnsOrRowsDependantOnWindowsSize", "Spalten- oder Zeilenlayout abhängig von Fenstergröße automatisch wählen", "Choose row or column layout automatically depending on window size"]]), {
        colors: ["blue", "red", "green", "yellow"],
        TRAVEL_TYPES: [0, 6, 2, 1, 2, 6, 7, 5, 5, 6, 1, 2, 6, 1, 3, 5, 1, 5, 1, 1, 6, 5, 10, 6, 6, 3, 2, 6, 2, 3, 6, 2, 1],
        TECHNOLOGY_TYPES: [0, 6, 5, 5, 4, 5, 9, 5, 6, 7, 6, 4, 5, 6, 9, 5, 7, 5, 4, 5, 6, 5, 6, 5, 7, 6, 9, 6, 5, 10, 5, 4, 6, 9, 7],
        WORK_TYPES: [0, 8, 8, 8, 8, 8, 8, 4, 8, 8, 8, 8, 9, 8, 8, 8, 10, 8, 8, 8, 7],
        LIB_SCORED: 9,
        initGame: r,
        renderGame: f,
        updateGame: o,
        createSettingsContent: a,
        render: n,
        getBonusInfo: h,
        getMasterInfo: s
    }
}();
y$.game.activate = function () {
    function i(n, t) {
        t.forEach(function (t) {
            y$.basegame.activateElement($("#technology" + t), function () {
                y$.service.doAction(n, t)
            }, {hoverText: n == y$.game.Actions.AdvanceTechnology ? y$.text.s.moveHere : y$.text.s.finishHere})
        });
        $("#Technology").append($("<div>", {
            id: "TechnologyValue",
            "class": "update actionValue"
        }).text(y$.text.get("ActionValue", [y$.data.public.ActionSpent, y$.data.public.ActionValue])))
    }

    function f(n, t) {
        t.forEach(function (t) {
            y$.basegame.activateElement($("#extra" + y$.data.onTurnIdx + "-" + t), function () {
                y$.service.doAction(n, t)
            }, {hoverText: y$.text.s.discardThis})
        })
    }

    function e(n, t) {
        y$.partial.inUse() || y$.partial.start(function (n) {
            return Number.isInteger(n)
        });
        y$.partial.done() || y$.Dialog.options({
            options: t.map(function (n, t) {
                return [t, y$.game.render.masterRules(n)]
            }),
            perform: function (n) {
                y$.partial.pushAndUpdate(t[n])
            },
            title: y$.text.s.doDraftMaster,
            addClasses: "draftMasters",
            draggable: y$.userPreferences.get("arePopupsDraggable")
        })
    }

    function o(n) {
        y$.basegame.activateElement($("#technology-enroll"), function () {
            y$.service.doAction(n)
        }, {hoverText: y$.text.s.enrollStudent})
    }

    function t(n, t) {
        t.forEach(function (t) {
            y$.basegame.activateElement($("#lib" + y$.data.onTurnIdx + "-" + t), function () {
                y$.service.doAction(n, t)
            }, {
                title: n == y$.game.Actions.MoveBookshelf ? y$.text.s.doMoveBookshelf : n == y$.game.Actions.DiscardIncome ? y$.text.s.discardThis : y$.text.s.doFillBookshelf,
                hoverText: y$.text.s.thisLocation
            })
        })
    }

    function s(n) {
        y$.basegame.activateElement($(".StudyBoard .cardSlot .action"), function () {
            y$.service.doAction(n)
        }, {hoverText: y$.text.s.increaseValue})
    }

    function h(n, t) {
        t.forEach(function (t) {
            y$.basegame.activateElement($("#addCards" + t), function () {
                y$.basegame.doConfirmedAction(!0, n, t)
            }, {hoverText: y$.text.s.openCards})
        })
    }

    function r(n, t) {
        t.forEach(function (t) {
            y$.basegame.activateElement($(".card" + t), function () {
                y$.service.doAction(n, t)
            }, {hoverText: n == y$.game.Actions.PlayCard ? y$.text.s.playThis : y$.text.s.removeThis})
        })
    }

    function c(n, t) {
        y$.Dialog.options({
            options: t.map(function (n, t) {
                return [t, y$.game.render.masterRules(n)]
            }),
            perform: function (i) {
                y$.service.doAction(n, t[i])
            },
            cancel: function (n) {
                y$.service.doAction(y$.game.Actions.Skip, t[n])
            },
            title: y$.text.s.doPlayMaster,
            addClasses: "draftMasters",
            draggable: y$.userPreferences.get("arePopupsDraggable")
        })
    }

    function l(n, t) {
        y$.partial.inUse() || y$.partial.start(function (n) {
            return Number.isInteger(n)
        });
        y$.partial.done() || t.forEach(function (n) {
            y$.basegame.activateElement($(".card" + n), function () {
                y$.partial.pushAndUpdate(n)
            }, {hoverText: y$.text.s.lockThis})
        })
    }

    function a(n, t) {
        y$.Dialog.options({
            options: t.map(function (n, t) {
                return [t, y$.game.render.income(n)]
            }), perform: function (i) {
                y$.service.doAction(n, t[i])
            }, title: y$.text.s.doSelectIncome, draggable: y$.userPreferences.get("arePopupsDraggable")
        })
    }

    function u(n, t) {
        y$.Dialog.options({
            options: t.map(function (n, t) {
                return [t, y$.game.render.action(n)]
            }),
            perform: function (i) {
                y$.service.doAction(n, t[i])
            },
            title: n == y$.game.Actions.SelectSymbol ? y$.text.s.doSelectSymbol : y$.text.s.doSelectExtraAction,
            draggable: y$.userPreferences.get("arePopupsDraggable")
        })
    }

    function v(n, t) {
        t.forEach(function (t) {
            y$.basegame.activateElement($(".StudyBoard #effect" + t), function () {
                y$.service.doAction(n, t)
            }, {hoverText: y$.text.s.takeCardEffect})
        })
    }

    function y(n, t) {
        t.forEach(function (t) {
            y$.basegame.activateElement($("#Level" + t[0] + " .card" + t[1]), function () {
                y$.service.doAction(n, t)
            }, {hoverText: y$.text.s.takeLesson})
        })
    }

    function n(n, t) {
        t.forEach(function (t) {
            y$.basegame.activateElement($("#travel" + t), function () {
                y$.service.doAction(n, t)
            }, {hoverText: n == y$.game.Actions.Travel ? y$.text.s.moveHere : y$.data.state == y$.game.States.PlaceCube ? y$.text.s.thisLocation : y$.text.s.finishHere})
        });
        $("#TravelMap").append($("<div>", {
            id: "TravelValue",
            "class": "update actionValue"
        }).text(y$.text.get("ActionValue", [y$.data.public.ActionSpent, y$.data.public.ActionValue])))
    }

    function p(n, t) {
        t.forEach(function (t) {
            y$.basegame.activateElement($("#work" + t), function () {
                y$.service.doAction(n, t)
            }, {hoverText: y$.text.s.moveHere})
        })
    }

    return {
        AdvanceTechnology: i,
        DiscardCard: r,
        DiscardFixed: f,
        DiscardIncome: t,
        DraftMaster: e,
        EnrollStudent: o,
        FillBookshelf: t,
        FinishMovement: i,
        IncreaseActionValue: s,
        MoveBookshelf: t,
        OpenCards: h,
        PlaceCube: n,
        PlayCard: r,
        PlayMaster: c,
        RoundEnd: l,
        SelectAncientLand: n,
        SelectIncome: a,
        SelectDevelopment: u,
        SelectLocation: n,
        SelectSymbol: u,
        SelectUniversity: n,
        TakeCardEffect: v,
        TakeLesson: y,
        Travel: n,
        Work: p
    }
}();
(function () {
    y$.game.registerStrings = function () {
        var n = [["log" + y$.game.Actions.AbandonFixed, "Entfernte das Ideenplättchen", "Abandoned the Development tile"], ["log" + y$.game.Actions.AbandonIncome, "Entfernte das Einkommensplättchen", "Abandoned the Income tile"], ["log" + y$.game.Actions.AdvanceTechnology, "Bewegte Studenten", "Advanced student"], ["log" + y$.game.Actions.BuyPotion, "Kaufte Trank", "Bought potion"], ["log" + y$.game.Actions.EnrollStudent, "Brachte einen Studenten ins Spiel", "Enrolled a student"], ["log" + y$.game.Actions.FillBookshelf, "Füllte Buchfeld", "Filled bookshelf"], ["log" + y$.game.Actions.FinishMovement, "Beendete Bewegung", "Finished movement"], ["log" + y$.game.Actions.IncreaseActionValue, "Erhöhte den Aktionswert", "Increased the Action value"], ["log" + y$.game.Actions.OpenCards, "Deckte 2 Karten auf", "Turned over 2 cards"], ["log" + y$.game.Actions.DiscardCard, "Entfernte Karte ⇒ %1", "Abandoned card ⇒ %1"], ["log" + y$.game.Actions.DiscardFixed, "Warf Ideenplättchen ab", "Discarded Development tile"], ["log" + y$.game.Actions.DiscardIncome, "Warf Einkommensplättchen ab", "Discarded Income tile"], ["log" + y$.game.Actions.PlaceCube, "Legte Würfel", "Placed cube"], ["log" + y$.game.Actions.PlayCard, "Spielte Karte ⇒ %1", "Played card ⇒ %1"], ["log" + y$.game.Actions.LockCard, "Legte Karte %1 unter das Studientableau", "Placed card %1 under Study board"], ["log" + y$.game.Actions.MoveBookshelf, "Wählte Regal zum leeren", "Selected bookshelf to clear"], ["log" + y$.game.Actions.PlayMaster, "Spielte Meister %1", "Played master %1"], ["log" + y$.game.Actions.BookshelfBonus, "Bekam Regal-Bonus", "Collected bookshelf bonus"], ["log" + y$.game.Actions.CityBonus, "Stadtbonus %1", "City bonus %1"], ["log" + y$.game.Actions.Invention, "Erfindung %1", "Invention %1"], ["log" + y$.game.Actions.Specialize, "Spezialisierung %1", "Specialization %1"], ["log" + y$.game.Actions.VillageBonus, "Dorfbonus %1", "Village bonus %1"], ["log" + y$.game.Actions.RoundIncome, "Rundeneinkommen", "Round income"], ["log" + y$.game.Actions.SelectIncome, "Wähle Einkommensplättchen", "Chose Income Tile"], ["log" + y$.game.Actions.SelectDevelopment, "Wähle Ideenplättchen", "Chose Development Tile"], ["log" + y$.game.Actions.SelectMaster, "Wählte Meister %1", "Selected master %1"], ["log" + y$.game.Actions.SelectSymbol, "Wählte Aktion ⇒ %1", "Chose action ⇒ %1"], ["log" + y$.game.Actions.SelectAncientLand, "Legte einen Reisewürfel auf eine Kulturstätte", "Placed a Travel cube on an AncientLand"], ["log" + y$.game.Actions.SelectUniversity, "Legte einen Reisewürfel auf eine Universität", "Placed a Travel cube on a University"], ["log" + y$.game.Actions.SelectLocation, "Platzierte einen Reisewürfel", "Placed a Travel cube"], ["log" + y$.game.Actions.Skip, "Passte die restlichen Aktionen", "Skipped further moves"], ["log" + y$.game.Actions.SkipBasicAction, "Konnte keine Karte spielen", "Could not play a card"], ["log" + y$.game.Actions.TakeCardEffect, "Aktivierte den Karteneffekt", "Activated card effect"], ["log" + y$.game.Actions.TakeLesson, "Nahm Lehrstunde Stufe %1 ⇒ %2", "Took level %1 lesson ⇒ %2"], ["log" + y$.game.Actions.Travel, "Reiste auf dem Spielplan", "Travelled on map"], ["log" + y$.game.Actions.Work, "Ging auf der Arbeitsleiste weiter", "Advanced on work track"], ["logEffect" + y$.game.ActionEffects.ActionCards, "%1 %2"], ["logEffect" + y$.game.ActionEffects.Bonus, ""], ["logEffect" + y$.game.ActionEffects.City, ""], ["logEffect" + y$.game.ActionEffects.Coins, "%1 %2"], ["logEffect" + y$.game.ActionEffects.Development, "%1"], ["logEffect" + y$.game.ActionEffects.Income, "%1"], ["logEffect" + y$.game.ActionEffects.Invention, ""], ["logEffect" + y$.game.ActionEffects.Master, "erreichte %1", "reached %1"], ["logEffect" + y$.game.ActionEffects.None, "n/a", "n/a"], ["logEffect" + y$.game.ActionEffects.Point, "%1 %2"], ["logEffect" + y$.game.ActionEffects.Potion, "%1 %2"], ["logEffect" + y$.game.ActionEffects.RoundIncome, "<br/> Rundeneinkommen ⇒ ", "<br/> Round income ⇒ "], ["logEffect" + y$.game.ActionEffects.Specialization, ""], ["logEffect" + y$.game.ActionEffects.Student, "Setzte ein %1", "Deployed %1"], ["logEffect" + y$.game.ActionEffects.Village, "sammelte %1", "collected %1"],];
        y$.text.registerStrings([["doAbandonFixed", "Werfe das neue Plättchen ab", "Abandon the new tile"], ["doAbandonIncome", "Werfe das neue Plättchen ab", "Abandon the new tile"], ["doAdvanceTechnology", "Auf dem Technologiebaum weitergehen", "Advance on the technology track"], ["doBuyPotion", "(Kaufe Trank)", "(Buy potion)"], ["doDiscardCard", "Wähle eine Karte, die aus dem Spiel entfernt werden soll", "Select a card to discard from the game"], ["doDiscardFixed", "Wähle das zusätzliche Plättchen, das ersetzt werden soll", "Select an Extra tile to replace"], ["doDiscardIncome", "Wähle das Einkommensplättchen, das ersetzt werden soll", "Select an Income tile to replace"], ["doDraftMaster", "Wähle eine Meisterkarte", "Select a master card"], ["doDoBasicAction", "Spiele eine Aktionskarte", "Play an action card"], ["doEnrollStudent", "(Bringe einen neuen Studenten ins Spiel)", "(Enroll a student)"], ["doFillBookshelf", "Wähle ein Buchfeld", "Select a bookshelf to fill"], ["doFinishMovement", "Beende die Bewegung", "Finish movement"], ["doIncreaseActionValue", "(Erhöhe Aktionswert)", "(Increase action value)"], ["doOpenCards", "(Decke 2 Aktionskarten auf)", "(Turn over 2 Action cards)"], ["doPlayCard", "Spiele eine Karte", "Play a card"], ["doPlaceCube", "Plaziere einen Reisewürfel", "Place a Travel cube"], ["doPlayMaster", "Spiele eine Meisterkarte", "Play a Master card"], ["doRoundEnd", "Wähle EINE Karte um sie unter dein Studientableau zu legen", "Choose ONE card to place it under your Study board"], ["doMoveBookshelf", "Wähle ein Regalplättchen, das bewegt werden soll", "Select a bookshelf to move to another position"], ["doSelectAncientLand", "Lege einen Reisewürfel auf eine Kulturstätte für 2 Münzen", "Place a Travel cube on an Ancient Land for 2 coins"], ["doSelectIncome", "Wähle ein Einkommensplättchen", "Chose an income tile"], ["doSelectDevelopment", "Wähle ein zusätzliches Aktionsplättchen", "Chose an Extra Action tile"], ["doSelectSymbol", "Wähle deine Basisaktion", "Chose your Basic Action"], ["doSelectUniversity", "Lege einen Reisewürfe auf eine Universität für 2 Münzen", "Place a Travel cube on a University for 2 coins"], ["doSkip", "Passe Aktion", "Skip action"], ["doSkipBasicAction", "Du hat keine Karte zum Ausspielen...", "You have no card to play..."], ["doTakeCardEffect", "Aktiviere den Karteneffekt", "Activate card effect"], ["doTakeLesson", "Nimm eine Lehrstunde", "Take a lesson"], ["doTravel", "Reise auf dem Spielplan", "Travel on the map"], ["doWork", "Auf der Arbeitsleiste weitergehen", "Advance on the work track"],]);
        y$.text.registerStrings([["discardThis", "Dieses Plättchen abwerfen", "Discard this tile"], ["openCards", "2 Karten aufdecken (-1 Münze)", "Turn over 2 cards (-1 coin)"], ["increaseValue", "Aktionswert erhöhen (-2 Münzen)", "Increase action value (-2 coins)"], ["enrollStudent", "Einen neuen Studenten ins Spiel bringen (-5 Münzen)", "Enroll a student (-5 coins)"], ["buyPotion", "Trank kaufen (-3 Münzen)", "Buy potion (-3 coins)"], ["lockThis", "Diese Karte unter das Studientableau legen", "Lock this card"], ["playThis", "Diese Karte spielen", "Play this card"], ["removeThis", "Entferne diese Karte", "Abandon this card"], ["takeCardEffect", "Den Karteneffekt aktivieren", "Activate the card effect"], ["takeLesson", "Diese Karte auf die Hand nehmen", "Add this card to your hand"], ["fillHere", "Dieses Feld füllen", "Fill this space"], ["moveHere", "Gehe hierhin", "Move here"], ["finishHere", "Beende hier", "Finish here"], ["thisLocation", "Wähle dieses Feld", "Chose this location"], ["bonusInfo", "Bonusplättchen von %1 gesammelt", "Bonus tokens collected by %1"], ["masterInfo", "Meister von %1", "Masters for %1"], ["skipAction", "Aktuelle Aktion beenden", "Finish current action"], ["noAction", "Keine Aktionskarte spielen", "Do not play an action card"],]);
        y$.text.registerStrings(n);
        y$.text.registerStrings([["aFixedBtn", "Entferne Plättchen", "Abandon tile"], ["aIncomeBtn", "Entferne Plättchen", "Abandon tile"], ["potionBtn", "Trank kaufen", "Buy potion"], ["skipBtn", "Passen", "Skip"], ["skipCardBtn", "Keine Karte", "No card"], ["finishMovementBtn", "Bewegung beenden", "Finish movement"], ["ActionValue", "Schritt %1/%2", "Step %1/%2"], ["MastersPlayed", "Gespielte Meister", "Masters played"], ["MastersOnHand", "Meisterkarten auf der Hand", "Master cards in hand"], ["finalscore", "<b>Endwertung %1<\/b><br/>Punkte: %2<br/>Meisterkarten: +%4<br/>Erreichte Ziele: +%5<br/><hr/>Gesamt: %3<hr/>", "<b>Final Score %1<\/b><br/>Points: %2<br/>Master cards: +%4<br/>Objectives reached: +%5<br/><hr/>Total: %3<hr/>"], ["setting_arePopupsDraggable", "Popups Fenster sind ziehbar / bewegbar<div class='label__sub_text'>Deaktiviere wenn du Probleme mit beim Klicken der Knöpfe eines Popup-Fensters hast. Du musst das <span class='emphasize'>Spielfenster neu laden<\/span> nachdem du diese Einstellung geändert hast! Du kannst das machen indem du 'F5' drückst oder dieses Spielfenster schliesst und neu öffnest<\/div>", "Popup windows are draggable<div class='label__sub_text'>Unset if you have issues clicking buttons on popup windows. You need to <span class='emphasize'>reload the game window<\/span> after changing this setting! You can do this by pressing 'F5' or closing and re-opening this game window<\/div>"],])
    };
    y$.log.HtmlEffect.game.finalScore = function (n) {
        return y$.text.get("finalscore", [y$.log.HtmlHeader.game.playerName(n[0]), n[1], n[2], n[3], n[4]])
    };
    y$.log.Action.game.move2Action = {
        DraftMaster: function (n) {
            return y$.log.PseudoAction(y$.game.Actions.SelectMaster, n, [])
        }, RoundEnd: function (n) {
            return y$.log.PseudoAction(y$.game.Actions.LockCard, n, [])
        }
    };
    y$.log.HtmlAction.game.processParams = {
        LockCard: function (n) {
            return [n.ActionParams ? y$.utils.picToHTML(y$.basegame.getImg("card" + n.ActionParams + ".png").addClass("card")) : ""]
        }, DiscardCard: function (n) {
            return [y$.utils.picToHTML(y$.game.render.card(n.ActionParams))]
        }, PlayCard: function (n) {
            return [y$.utils.picToHTML(y$.game.render.card(n.ActionParams))]
        }, PlayMaster: function (n) {
            return [n.ActionParams == null ? "" : y$.utils.picToHTML(y$.game.render.master(n.ActionParams))]
        }, SelectMaster: function (n) {
            return [n.ActionParams == null ? "" : y$.utils.picToHTML(y$.game.render.master(n.ActionParams))]
        }, SelectSymbol: function (n) {
            return [y$.utils.picToHTML(y$.game.render.action(n.ActionParams))]
        }, TakeLesson: function (n) {
            return [n.ActionParams[0], y$.utils.picToHTML(y$.basegame.getImg("card" + n.ActionParams[1] + ".png").addClass("card"))]
        }, CityBonus: function (n) {
            return [y$.utils.picToHTML(y$.game.render.token(y$.game.LocationTypes.City, n.ActionEffects[0].params))]
        }, Invention: function (n) {
            return [y$.utils.picToHTML(y$.game.render.token(y$.game.LocationTypes.Invention, n.ActionEffects[0].params))]
        }, Specialize: function (n) {
            return [y$.utils.picToHTML(y$.game.render.token(y$.game.LocationTypes.Specialize, n.ActionEffects[0].params))]
        }, VillageBonus: function (n) {
            return [y$.utils.picToHTML(y$.game.render.token(y$.game.LocationTypes.Bonus, n.ActionEffects[0].params))]
        }
    };
    y$.log.HtmlAction.game.getHtml.AddClickableImageWithText = function () {
        return $("<span>").append($("<span>").text("text: ")).append(y$.basegame.addClickForZoom(y$.basegame.getImg({basic: "ok.png"}), {
            image: "none",
            maximize: !1
        }))
    };
    y$.log.HtmlEffect.game.processParams = {
        ActionCards: function (n) {
            return [y$.utils.picToHTML(y$.basegame.getImg("card" + n.params[0][0] + ".png").addClass("card")), y$.utils.picToHTML(y$.basegame.getImg("card" + n.params[0][1] + ".png").addClass("card"))]
        }, Coins: function (n) {
            return [n.params[0] + "x", y$.utils.picToHTML(y$.basegame.getImg("coin.png").addClass("res"))]
        }, Development: function (n) {
            return [y$.utils.picToHTML(y$.game.render.action(n.params[0]))]
        }, Income: function (n) {
            return [y$.utils.picToHTML(y$.basegame.getImg("income" + n.params[0] + ".png").addClass("income"))]
        }, Master: function () {
            return [y$.utils.picToHTML(y$.basegame.getImg("rules/masterscroll.png").addClass("token master"))]
        }, Point: function (n) {
            return [n.params[0] + "x", y$.utils.picToHTML(y$.basegame.getImg("point.png").addClass("res"))]
        }, Potion: function (n) {
            return [n.params[0] + "x", y$.utils.picToHTML(y$.basegame.getImg("potion.png").addClass("res"))]
        }, Student: function (n) {
            return [y$.utils.picToHTML(y$.game.render.meeple("meeple", n.params[0]))]
        }, Village: function (n) {
            return [y$.utils.picToHTML(y$.game.render.token(y$.game.LocationTypes.Bonus, n.params[0]))]
        }
    }
})();
y$.animation.game.action = function () {
    return {}
}();
y$.animation.game.effect = function () {
    function n(n, t) {
        return y$.animation.moveFromTo(y$.dom.logo, $("#playerDataBasic" + t + " .dollar"), {
            obj: $("<span>").text("$"),
            timeFactor: 1.5,
            showFrom: !0
        })
    }

    return {GetDollar: n}
}();
$.extend(!0, y$.game, {
    Actions: {
        PlayCard: 10,
        SkipBasicAction: 11,
        SelectSymbol: 12,
        DiscardCard: 13,
        Skip: 15,
        SelectDevelopment: 16,
        SelectIncome: 17,
        SelectUniversity: 18,
        SelectAncientLand: 19,
        OpenCards: 20,
        IncreaseActionValue: 21,
        BuyPotion: 22,
        EnrollStudent: 23,
        TakeCardEffect: 24,
        PlaceCube: 25,
        FinishMovement: 26,
        VillageBonus: 27,
        Specialize: 28,
        Invention: 29,
        Work: 30,
        CityBonus: 31,
        BookshelfBonus: 32,
        Travel: 40,
        AdvanceTechnology: 50,
        TakeLesson: 60,
        FillBookshelf: 70,
        MoveBookshelf: 71,
        DiscardFixed: 46,
        AbandonFixed: 47,
        DiscardIncome: 48,
        AbandonIncome: 49,
        PlayMaster: 80,
        RoundIncome: 96,
        SelectMaster: 90,
        LockCard: 95
    },
    States: {
        DoActions: 10,
        SelectSymbol: 15,
        SelectIncome: 16,
        SelectDevelopment: 17,
        SelectCityBonus: 18,
        DoQuickActions: 20,
        Village: 21,
        Specialize: 22,
        Invention: 23,
        City: 24,
        Bookshelf: 25,
        PerformAction: 30,
        BonusTravel: 36,
        BonusEffect: 37,
        DiscardCard: 38,
        BonusLesson: 39,
        Master: 40,
        DraftMaster: 50,
        MoveBookshelf: 51,
        PlaceCube: 52,
        DiscardIncome: 53,
        DiscardFixed: 54,
        RoundEnd: 60,
        RoundIncome: 61
    },
    ActionEffects: {
        RoundStart: 0,
        RoundEnd: 1,
        FinalScoring: 2,
        ActionCards: 3,
        Coins: 4,
        Bonus: 5,
        Student: 6,
        Point: 7,
        Potion: 8,
        RoundIncome: 9,
        Income: 10,
        Development: 11,
        Specialization: 12,
        Objective: 13,
        Invention: 14,
        Master: 15,
        None: 16,
        City: 17,
        Village: 18
    },
    LocationTypes: {
        Start: 0,
        City: 1,
        University: 2,
        AncientLand: 3,
        Specialize: 4,
        Silver: 5,
        Bonus: 6,
        Objective: 7,
        Coin: 8,
        Invention: 9,
        Master: 10
    },
    ActionSymbols: {None: 0, Technology: 1, Library: 2, Work: 3, Travel: 4, Lesson: 5, Wildcard: 6}
});
(function (n) {
    n.Partial = function (t) {
        var i = this instanceof n.Partial ? this : Object.create(n.Partial.prototype);
        return i.done = t, i.pos = -1, i.undoStack = [], i
    };
    n.Partial.prototype.get = function () {
        return this.pos > -1 ? this.undoStack[this.pos] : []
    };
    n.Partial.prototype.getCopy = function () {
        return this.pos > -1 ? JSON.parse(JSON.stringify(this.undoStack[this.pos])) : []
    };
    n.Partial.prototype.push = function (n) {
        this.undoStack.splice(this.pos + 1);
        this.undoStack.push(n);
        ++this.pos
    };
    n.Partial.prototype.undo = function (n) {
        this.pos = n < 0 ? -1 : Math.max(this.pos - n, -1)
    };
    n.Partial.prototype.redo = function (n) {
        this.pos = n < 0 ? this.undoStack.length - 1 : Math.min(this.pos + n, this.undoStack.length - 1)
    };
    n.Partial.prototype.undoCount = function () {
        return this.pos + 1
    };
    n.Partial.prototype.redoCount = function () {
        return this.undoStack.length - 1 - this.pos
    };
    n.Partial.prototype.any = function (n) {
        return n ? this.undoStack.length > 0 : this.pos > -1
    };
    n.Partial.prototype.data = function () {
        return this.undoStack.slice(0)
    }
})(y$);
y$.partial = function () {
    function u() {
        n = undefined
    }

    function f(t) {
        n = new y$.Partial(t)
    }

    function e() {
        return n != null
    }

    function o() {
        var t = n != null && n.get();
        if ($.isFunction(n.done)) try {
            return n.done.apply(y$.game, [t])
        } catch (i) {
            y$.utils.logError(i, "Partial.complete")
        }
        return !1
    }

    function i() {
        y$.basegame.deactivateDisplay();
        y$.basegame.updateLogAndShowLatestGameState()
    }

    function s(t) {
        if (n == null) throw new Error("y$.partial.pushAndUpdate not available; call y$.partial.start first");
        n.push(t);
        i()
    }

    function r() {
        if (n == null) throw new Error("y$.partial.requestNext not available; call y$.partial.start first");
        y$.text.info();
        y$.service.getNextPartialDecisionData(n.get())
    }

    function h(t) {
        if (n == null) throw new Error("y$.partial.pushAndRequestNext not available; call y$.partial.start first");
        n.push(t);
        r()
    }

    function t(t) {
        return function (i) {
            if (n != null) {
                if ($.isFunction(n[t])) return n[t](i);
                throw new Error("No such function y$.Partial." + t);
            }
            throw new Error("y$.partial." + t + " not available; call y$.partial.start first");
        }
    }

    var n;
    return {
        reset: u,
        start: f,
        inUse: e,
        done: o,
        updateDisplay: i,
        pushAndUpdate: s,
        requestNext: r,
        pushAndRequestNext: h,
        get: t("get"),
        getCopy: t("getCopy"),
        push: t("push"),
        undo: t("undo"),
        redo: t("redo"),
        undoCount: t("undoCount"),
        redoCount: t("redoCount"),
        any: t("any"),
        data: t("data")
    }
}();