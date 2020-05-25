// beautified at https://beautifier.io/ version 1.10.3
function GameBoard() {
    this.scenario = -1;
    this.locations = "";
    this.neutralCards = "";
    this.numStockForts = 0;
    this.sieges = ["", ""];
    this.SetLocation = SetLocation;
    this.GetLocation = GetLocation;
    this.IsFortress = IsFortress;
    this.IsVillage = IsVillage;
    this.IsTown = IsTown;
    this.HasBonus = HasBonus;
    this.IsNeutral = IsNeutral;
    this.IsSieged = IsSieged;
    this.IsSiegeActive = IsSiegeActive;
    this.GetLocOwner = GetLocOwner;
    this.MustUseSettler = MustUseSettler;
    this.SetNumStockForts = SetNumStockForts;
    this.SetNeutralCards = SetNeutralCards;
    this.RemoveNeutralCard = RemoveNeutralCard;
    this.GetAvailNeutralCards = GetAvailNeutralCards;
    this.ShowLocMarkers = ShowLocMarkers;
    this.ShowLocRing = ShowLocRing;
    this.ShowSiegeData = ShowSiegeData;
    this.ShowSiegeMarker = ShowSiegeMarker;
    this.ShowSiegeTitles = ShowSiegeTitles;
    this.ShowSiegeCards = ShowSiegeCards;
    this.ShowWithdrawButton = ShowWithdrawButton;
    this.ShowWithdrawCheckBox = ShowWithdrawCheckBox;
    this.ShowVulnSiegeCheckBox = ShowVulnSiegeCheckBox;
    this.ShowGameBoard = ShowGameBoard;
    this.SaveGameBoard = SaveGameBoard
}

function SetLocation(n, t) {
    this.locations = UpdateCustomStatus(this.locations, n, Encode(t))
}

function GetLocation(n) {
    return Decode(this.locations, n)
}

function IsFortress(n) {
    var t = Decode(this.locations, n);
    return t === 3 || t === 4 || t === 7 || t === 8 ? !0 : !1
}

function HasBonus(n) {
    return locationData[n][3] > 0
}

function IsSieged(n) {
    for (var i = -1, t = 0; t < this.sieges.length; t++)
        if (this.sieges[t].length === 1 && (i = Decode(this.sieges[t], 0), n === i)) return !0;
    return !1
}

function IsSiegeActive(n) {
    return n !== 0 && n !== 1 ? !1 : this.sieges[n].length === 1
}

function GetLocOwner(n) {
    var t = Decode(this.locations, n);
    return t >= 1 && t <= 4 ? 0 : t >= 5 && t <= 8 ? 1 : -1
}

function IsVillage(n) {
    var t = Decode(this.locations, n);
    return t === 1 || t === 3 || t === 5 || t === 7 ? !0 : !1
}

function IsTown(n) {
    var t = Decode(this.locations, n);
    return t === 2 || t === 4 || t === 6 || t === 8 ? !0 : !1
}

function IsNeutral(n) {
    var t = Decode(this.locations, n);
    return t === 0
}

function MustUseSettler(n) {
    return locationData[n][4]
}

function SetNumStockForts() {
    for (var t = 12, n = 0; n < this.locations.length; n++) this.IsFortress(n) && t--;
    this.numStockForts = t >= 0 ? t : 0
}

function SetNeutralCards() {
    for (var r = "", i = !1, t, n = 0; n < empDataN.length; n++) {
        for (i = !1, t = 0; t < players.length; t++)(players[t].HasCard(empDataN[n][0], !0) || players[t].IsSiegeCard(empDataN[n][0])) && (i = !0);
        i || (r += empDataN[n][0])
    }
    this.neutralCards = r
}

function RemoveNeutralCard(n) {
    for (var i = "", t = 0; t < this.neutralCards.length; t++) this.neutralCards.substr(t, 1) !== n && (i += this.neutralCards.substr(t, 1));
    this.neutralCards = i
}

function SaveGameBoard() {
    this.locations.length !== 36 && alert("Error LocCheck: " + this.locations.length);
    SetBoardLocations(this.locations);
    SetSiegeData(0, this.sieges[0]);
    SetSiegeData(1, this.sieges[1])
}

function GetAvailNeutralCards(n) {
    var r = 0,
        t = "",
        i;
    switch (n) {
        case 0:
            for (i = 0; i < this.neutralCards.length; i++) t = this.neutralCards.substr(i, 1), (t === "A" || t === "B") && r++;
            break;
        case 1:
            for (i = 0; i < this.neutralCards.length; i++) t = this.neutralCards.substr(i, 1), (t === "C" || t === "D" || t === "E" || t === "F" || t === "G") && r++;
            break;
        case 2:
            for (i = 0; i < this.neutralCards.length; i++) t = this.neutralCards.substr(i, 1), (t === "H" || t === "I") && r++
    }
    return r
}

function ShowGameBoard() {
    var i;
    this.numStockForts > 0 ? $("#numForts").html(this.numStockForts) : ($("#numForts").css("display", "none"), $("#fortCross").css("visibility", "visible"));
    i = this.GetAvailNeutralCards(0);
    i <= 0 && $("#nFortNum").css("color", "#E20000");
    $("#nFortNum").html(i);
    i = this.GetAvailNeutralCards(1);
    i <= 0 && $("#nNativeNum").css("color", "#E20000");
    $("#nNativeNum").html(i);
    i = this.GetAvailNeutralCards(2);
    i <= 0 && $("#nSettlerNum").css("color", "#E20000");
    $("#nSettlerNum").html(i);
    var o = players[UserIndex].campaign,
        u = IsHistory ? 2 : players[UserIndex].map,
        s = ["Small", "Medium", "Large"],
        p = locNamesBackup === 0 ? "" : "X";
    $("#board").attr("src", GameImagePath + "map" + s[u] + p + o + ".jpg");
    for (var h = o === 0 ? locCoordEN : locCoordFR, f = -1, e = -1, c = -1, l = -1, a = "", v = "", r = -1, y = !1, n = "", t = 0; t < this.locations.length; t++) {
        if (n = Decode(this.locations, t), n >= 1 && n <= 8 && (y = n === 3 || n === 4 || n === 7 || n === 8, v = n === 1 || n === 3 || n === 5 || n === 7 ? "cube" : "disc", r = n === 1 || n === 3 || n === 5 || n === 7 ? 0 : 1, o = n >= 1 && n <= 4 ? 0 : 1, f = h[t][u][0 + r * 2], e = h[t][u][1 + r * 2], a = v + s[u] + o, CreateImage("token" + t, "absolute", 60 + t, e, f, -1, -1, "", GameImagePath + a + ".png?v=25", "tokenContainer", ""), gameBoard.IsSieged(t) && ShowSiegeSymbol(t, n, f, e, r), y)) {
            switch (u) {
                case 2:
                    c = r === 1 ? f - 1 : f - 8;
                    l = r === 1 ? e - 2 : e - 6
            }
            CreateImage("fort" + t, "absolute", 10 + t, l, c, -1, -1, "", GameImagePath + "fort5.png", "tokenContainer", "")
        }
        this.ShowLocMarkers(t)
    }
    this.ShowSiegeData()
}

function ShowSiegeSymbol(n, t, i, r, u) {
    var f = i,
        e = r;
    switch (u) {
        case 0:
            f = i - 6;
            e = r - 5;
            break;
        case 1:
            f = i;
            e = r
    }
    CreateImage("siegeMarker" + t, "absolute", 90 + n, e, f, -1, -1, "", GameImagePath + "siege.png?v=3", "tokenContainer", "")
}

function ShowLocationMarkers() {
    for (var n = 0; n < locationData.length; n++) gameBoard.ShowLocMarkers(n)
}

function ShowLocMarkers(n) {
    var t = IsHistory ? 0 : players[UserIndex].map,
        f = IsHistory && UserIndex < 0 ? players[0].campaign : players[UserIndex].campaign,
        i = f === 0 ? locCoordEN : locCoordFR,
        r = i[n][t][0],
        u = i[n][t][1];
    switch (t) {
        case 2:
            r -= 1;
            u += 1
    }
    CreateImage("locMarker" + n, "absolute", 1e3, u, r, 44, 43, "", GameImagePath + "space.gif", "locMarkerContainer", locStrings[n]);
    $("#locMarker" + n).mouseover(function(n) {
        return function() {
            ShowConnections(n)
        }
    }(n)).mouseout(function() {
        HideHovers()
    })
}

function ShowConnections(n) {
    HideHovers();
    for (var i = locationData[n][5], t = 0; t < i.length; t++) gameBoard.ShowLocRing(i[t], 3, !0)
}

function HideHovers() {
    $("#hoverContainer").html("")
}

function ShowLocRing(n, t, i) {
    var r = IsHistory ? 0 : players[UserIndex].map,
        s = IsHistory && UserIndex < 0 ? players[0].campaign : players[UserIndex].campaign,
        u = s === 0 ? locCoordEN : locCoordFR,
        f = u[n][r][0],
        e = u[n][r][1],
        o = "",
        h = i ? "hoverContainer" : "actionRingContainer";
    switch (r) {
        case 2:
            o = "ringLarge" + t;
            f -= 16;
            e -= 15
    }
    CreateImage("locRing" + n, "absolute", 400, e, f, -1, -1, "", GameImagePath + o + ".png", h, locationData[n][0])
}

function Player() {
    this.index = -1;
    this.campaign = -1;
    this.money = 0;
    this.map = -1;
    this.cardSize = -1;
    this.locNames = -1;
    this.activeCards = "";
    this.hand = "";
    this.reserve = "";
    this.deck = "";
    this.discardPile = "";
    this.locPile = "";
    this.empPile = "";
    this.autoAmbush = "";
    this.autoRaid = "";
    this.actions = 0;
    this.siegeCards = ["", ""];
    this.tokens = [0, 0];
    this.oppTokens = [0, 0];
    this.points = [0, 0];
    this.CalcLocPile = CalcLocPile;
    this.CalcEmpPile = CalcEmpPile;
    this.CalcNumTokens = CalcNumTokens;
    this.CalcPoints = CalcPoints;
    this.HasHandCard = HasHandCard;
    this.HasReserveCard = HasReserveCard;
    this.HasDeckCard = HasDeckCard;
    this.HasDiscardCard = HasDiscardCard;
    this.HasLocCard = HasLocCard;
    this.HasEmpCard = HasEmpCard;
    this.IsSiegeCard = IsSiegeCard;
    this.HasCard = HasCard;
    this.AddActiveCard = AddActiveCard;
    this.RemoveActiveCard = RemoveActiveCard;
    this.RemoveHandCards = RemoveHandCards;
    this.RemoveHandCard = RemoveHandCard;
    this.RemoveDiscardCard = RemoveDiscardCard;
    this.RemoveReserveCard = RemoveReserveCard;
    this.RemoveSiegeCard = RemoveSiegeCard;
    this.ClearActiveCards = ClearActiveCards;
    this.TakeLocCard = TakeLocCard;
    this.ShowHandCards = ShowHandCards;
    this.SortHandCards = SortHandCards;
    this.FocusHandCard = FocusHandCard;
    this.UnfocusHandCard = UnfocusHandCard;
    this.SavePlayer = SavePlayer
}

function AddActiveCard(n) {
    this.activeCards += n
}

function RemoveActiveCard(n) {
    for (var i = "", t = 0; t < this.activeCards.length; t++) this.activeCards.substr(t, 1) !== n && (i += this.activeCards.substr(t, 1));
    this.activeCards = i
}

function RemoveHandCard(n) {
    for (var i = "", t = 0; t < this.hand.length; t++) this.hand.substr(t, 1) !== n && (i += this.hand.substr(t, 1));
    this.hand = i
}

function RemoveDiscardCard(n) {
    for (var i = "", t = 0; t < this.discardPile.length; t++) this.discardPile.substr(t, 1) !== n && (i += this.discardPile.substr(t, 1));
    this.discardPile = i
}

function RemoveReserveCard(n) {
    for (var i = "", t = 0; t < this.reserve.length; t++) this.reserve.substr(t, 1) !== n && (i += this.reserve.substr(t, 1));
    this.reserve = i
}

function RemoveHandCards(n) {
    for (var u = "", f = "", r = !1, i, t = 0; t < this.hand.length; t++) {
        for (r = !1, i = 0; i < n.length; i++) f = n.substr(i, 1), this.hand.substr(t, 1) === f && (r = !0);
        r || (u += this.hand.substr(t, 1))
    }
    this.hand = u
}

function RemoveSiegeCard(n, t) {
    for (var r = "", i = 0; i < this.siegeCards[n].length; i++) this.siegeCards[n].substr(i, 1) !== t && (r += this.siegeCards[n].substr(i, 1));
    this.siegeCards[n] = r
}

function GetCardIDByLoc(n, t) {
    for (var r = n === 0 ? locDataEN : locDataFR, i = 0; i < r.length; i++)
        if (r[i][0][2] === t) return Encode(r[i][0][0]);
    return ""
}

function TakeLocCard(n) {
    for (var i = this.campaign === 0 ? locDataEN : locDataFR, r = "", u, t = 0; t < i.length; t++) i[t][0][2] === n && (r = Encode(i[t][0][0]));
    for (u = "", t = 0; t < this.locPile.length; t++) {
        if (this.locPile.substr(t, 1) === r) {
            this.discardPile += r;
            continue
        }
        u += this.locPile.substr(t, 1)
    }
    this.locPile = u
}

function ClearActiveCards() {
    this.activeCards = ""
}

function IsNeutralCard(n) {
    for (var i = ["A", "B", "C", "D", "E", "F", "G", "H", "I"], t = 0; t < i.length; t++)
        if (i[t] === n) return !0;
    return !1
}

function IsNativeCard(n, t) {
    if (IsNeutralCard(t)) {
        for (var r = ["C", "D", "E", "F", "G"], i = 0; i < r.length; i++)
            if (r[i] === t) return !0
    } else if (n === 1 && Decode(t, 0) === 38) return !0;
    return !1
}

function GetNeutralIndex(n) {
    for (var i = ["A", "B", "C", "D", "E", "F", "G", "H", "I"], t = 0; t < i.length; t++)
        if (i[t] === n) return t;
    return -1
}

function GetEmpireIndex(n, t) {
    var i = Decode(t, 0);
    return n === 0 ? i - 33 : i - 26
}

function CalcLocPile() {
    for (var i = this.campaign === 0 ? locDataEN : locDataFR, r = "", n = "", t = 0; t < i.length; t++) n = Encode(i[t][0][0]), this.HasHandCard(n) || this.HasReserveCard(n) || this.HasDeckCard(n) || this.HasDiscardCard(n) || this.IsSiegeCard(n) || (r += n);
    return r
}

function CalcEmpPile() {
    for (var t = this.campaign === 0 ? empDataEN : empDataFR, r = "", i = "", u = IsRandomRule(4), f = IsRandomRule(19), e = IsRandomRule(21), n = 0; n < t.length; n++)
        if ((e || t[n][0] !== 26 || this.campaign !== 1 || !(GetStatusStringVersion() >= 2)) && (!u || this.campaign !== 0 || t[n][0] !== 34 && t[n][0] !== 35 && t[n][0] !== 36)) {
            if (f) {
                if (t[n][0] === 53 && this.campaign === 0) continue;
                if (t[n][0] === 31 && this.campaign === 1) continue
            }
            i = Encode(t[n][0]);
            this.HasHandCard(i) || this.HasReserveCard(i) || this.HasDeckCard(i) || this.HasDiscardCard(i) || this.IsSiegeCard(i) || (r += i)
        } return r
}

function CalcNumTokens(n) {
    for (var t = -1, i = [0, 0], u, r = 0; r < gameBoard.locations.length; r++) {
        t = Decode(gameBoard.locations, r);
        switch (n) {
            case 0:
                (t === 1 + this.campaign * 4 || t === 3 + this.campaign * 4) && i[0]++;
                break;
            case 1:
                (t === 2 + this.campaign * 4 || t === 4 + this.campaign * 4) && i[1]++
        }
    }
    return (i[n] += players[(this.index + 1) % 2].oppTokens[n], u = [
        [18, 12],
        [18, 9]
    ][this.campaign][n] - i[n], u >= 0) ? u : 0
}

function CalcPoints(n) {
    var e = this.oppTokens[0] * 2,
        o = this.oppTokens[1] * 4,
        f = e + o;
    if (n) return f;
    for (var i = f, r = 0, t = -1, u = 0; u < locationData.length; u++)
        if (r = locationData[u][3], r > 0) {
            t = Decode(gameBoard.locations, u);
            switch (this.campaign) {
                case 0:
                    (t === 1 || t === 3) && (i += r);
                    (t === 2 || t === 4) && (i += r * 2);
                    break;
                case 1:
                    (t === 5 || t === 7) && (i += r);
                    (t === 6 || t === 8) && (i += r * 2)
            }
        } return !IsFirstFrenchSiege() && IsRandomRule(16) && this.campaign === 0 && i >= 25 && SetFirstFrenchSiege(), i
}

function HasHandCard(n) {
    for (var t = 0; t < this.hand.length; t++)
        if (this.hand.substr(t, 1) === n) return !0;
    return !1
}

function HasReserveCard(n) {
    for (var t = 0; t < this.reserve.length; t++)
        if (this.reserve.substr(t, 1) === n) return !0;
    return !1
}

function HasDeckCard(n) {
    for (var t = 0; t < this.deck.length; t++)
        if (this.deck.substr(t, 1) === n) return !0;
    return !1
}

function HasDiscardCard(n) {
    for (var t = 0; t < this.discardPile.length; t++)
        if (this.discardPile.substr(t, 1) === n) return !0;
    return !1
}

function HasLocCard(n) {
    for (var t = 0; t < this.locPile.length; t++)
        if (this.locPile.substr(t, 1) === n) return !0;
    return !1
}

function HasEmpCard(n) {
    for (var t = 0; t < this.empPile.length; t++)
        if (this.empPile.substr(t, 1) === n) return !0;
    return !1
}

function IsSiegeCard(n) {
    for (var i, t = 0; t < this.siegeCards.length; t++)
        for (i = 0; i < this.siegeCards[t].length; i++)
            if (this.siegeCards[t].substr(i, 1) === n) return !0;
    return !1
}

function HasCard(n, t) {
    return this.HasHandCard(n) || this.HasReserveCard(n) || this.HasDeckCard(n) || this.HasDiscardCard(n) ? !0 : t ? !1 : this.HasLocCard(n) || this.HasEmpCard(n) ? !0 : !1
}

function SortHandCards() {
    var r = ["", "", ""],
        u = ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
        n, t, i, f;
    switch (this.campaign) {
        case 0:
            for (n = 0; n < 33; n++)
                for (t = 0; t < this.hand.length; t++) i = this.hand.substr(t, 1), IsLocationCard(this.campaign, i) && Decode(this.hand, t) === n && (r[1] += i);
            for (n = 33; n < 54; n++)
                for (t = 0; t < this.hand.length; t++)
                    if (i = this.hand.substr(t, 1), IsEmpireCard(this.campaign, i)) {
                        if (IsNeutralCard(i)) continue;
                        Decode(this.hand, t) === n && (r[0] += i)
                    } for (n = 0; n < u.length; n++)
                for (t = 0; t < this.hand.length; t++) i = this.hand.substr(t, 1), i === u[n] && (r[2] += i);
            break;
        case 1:
            for (n = 0; n < 26; n++)
                for (t = 0; t < this.hand.length; t++) i = this.hand.substr(t, 1), IsLocationCard(this.campaign, i) && Decode(this.hand, t) === n && (r[1] += i);
            for (n = 26; n < 47; n++)
                for (t = 0; t < this.hand.length; t++)
                    if (i = this.hand.substr(t, 1), IsEmpireCard(this.campaign, i)) {
                        if (IsNeutralCard(i)) continue;
                        Decode(this.hand, t) === n && (r[0] += i)
                    } for (n = 0; n < u.length; n++)
                for (t = 0; t < this.hand.length; t++) i = this.hand.substr(t, 1), i === u[n] && (r[2] += i)
    }
    for (f = "", n = 0; n < r.length; n++) f += r[n];
    this.hand = f
}

function ShowHandCards(n) {
    var u = "",
        r = -1,
        t, o, s, h, f, i = IsHistory ? 1 : this.cardSize,
        e = i === 0 ? 140 : 103,
        c = i === 0 ? 136 : 108,
        l = i === 0 ? 172 : 131,
        a = i === 0 ? 135 : 100,
        v = i === 0 ? 170 : 129,
        y = i === 0 ? 263 : 200;
    for (this.SortHandCards(), t = 0; t < this.hand.length; t++) cardID = this.hand.substr(t, 1), h = i === 0 ? "" : "small/", o = IsCardActive(cardID) ? "H" : "", s = CheckLocValidity(this.campaign, cardID) ? "" : "X", f = "", IsNeutralCard(cardID) ? (u = "Neutral", r = cardID) : (u = this.campaign === 0 ? "British" : "French", r = Decode(this.hand, t), IsRandomRule(22) && r === 26 && this.campaign === 1 && (f = "F")), n ? ($("#handCard" + t).attr("src", GameImagePath + "cards/" + h + "card" + u + s + o + r + f + ".jpg?v=3").css("left", t * e + "px").css("width", v).css("height", y), $("#handHoverDummy" + t).css("left", t * e + "px").css("top", c + "px").css("width", l).css("height", a + "px")) : (CreateImage("handCard" + t, "absolute", 5 + t * 5, 6, t * e, v, y, "1px solid black", GameImagePath + "cards/" + h + "card" + u + s + o + r + f + ".jpg?v=3", "handDiv", ""), CreateImage("handHoverDummy" + t, "absolute", 7 + t * 5, c, t * e, l, a, "", GameImagePath + "space.gif", "handDiv", ""), $("#handHoverDummy" + t).mouseover(function(n, t) {
        return function() {
            FocusHandCard(n, t)
        }
    }(this.index, t)).mouseout(function(n) {
        return function() {
            UnfocusHandCard(n)
        }
    }(t)))
}

function FocusHandCard(n, t) {
    $("#handCard" + t).css("zIndex", 900 + t * 5);
    $("#handHoverDummy" + t).css("zIndex", 902 + t * 5);
    var i = players[n].hand.substr(t, 1);
    IsLocationCard(players[n].campaign, i) && HighlightCardLocations(players[n].campaign, Decode(i, 0))
}

function UnfocusHandCard(n) {
    $("#handCard" + n).css("zIndex", 5 + n * 5);
    $("#handHoverDummy" + n).css("zIndex", 7 + n * 5);
    $("#hoverContainer").html("")
}

function HighlightCardLocations(n, t) {
    var e = n === 0 ? locDataEN : locDataFR,
        o = e[t][0][2],
        f, i, r, u;
    for (ShowLocRing(o, 0, !0), f = e[t][1], i = "", r = 0; r < f.length; r++)
        for (i = f[r], u = 1; u < i.length; u++) ShowLocRing(i[u], 3, !0)
}

function SavePlayer() {
    SetPlayerMap(this.index, this.map);
    SetCardSizeFlag(this.index, this.cardSize);
    SetLocNamesFlag(this.index, this.locNames);
    SetNumOppTokens(this.index, 0, this.oppTokens[0]);
    SetNumOppTokens(this.index, 1, this.oppTokens[1]);
    SetMoney(this.index, this.money);
    SetHandCards(this.index, this.hand);
    SetReserve(this.index, this.reserve);
    SetDeck(this.index, this.deck);
    SetDiscardPile(this.index, this.discardPile);
    SetSiegeCards(this.index, 0, this.siegeCards[0]);
    SetSiegeCards(this.index, 1, this.siegeCards[1]);
    SetAutoSetting(this.index, 0, this.autoAmbush);
    SetAutoSetting(this.index, 1, this.autoRaid)
}

function SetupBoard() {
    gameBoard = new GameBoard;
    gameBoard.scenario = GetScenario();
    gameBoard.locations = GetBoardLocations();
    gameBoard.SetNumStockForts();
    gameBoard.sieges[0] = GetSiegeData(0);
    gameBoard.sieges[1] = GetSiegeData(1)
}

function SetupPlayers() {
    players = [];
    for (var t, n = 0; n < GameInfo.NumPlayers; n++) {
        for (players.push(new Player), players[n].index = n, players[n].campaign = GetCampaign(n), players[n].money = GetMoney(n), players[n].map = 2, players[n].cardSize = GetCardSizeFlag(n), players[n].locNames = GetLocNamesFlag(n), players[n].hand = GetHandCards(n), players[n].reserve = GetReserve(n), players[n].deck = GetDeck(n), players[n].discardPile = GetDiscardPile(n), players[n].autoAmbush = GetAutoSetting(n, 0), players[n].autoRaid = GetAutoSetting(n, 1), players[n].points[0] = players[n].CalcPoints(!1), players[n].points[1] = players[n].CalcPoints(!0), n === UserIndex && (cardSizeBackup = players[n].cardSize), n === UserIndex && (locNamesBackup = players[n].locNames), t = 0; t < 2; t++) players[n].siegeCards[t] = GetSiegeCards(n, t), players[n].oppTokens[t] = GetNumOppTokens(n, t);
        players[n].locPile = players[n].CalcLocPile();
        players[n].empPile = players[n].CalcEmpPile()
    }
    for (t = 0; t < 2; t++) players[0].tokens[t] = players[0].CalcNumTokens(t), players[1].tokens[t] = players[1].CalcNumTokens(t);
    gameBoard.SetNeutralCards();
    IsHistory && (cardSizeBackup = 1, locNamesBackup = 1)
}

function SetupGame() {
    SetupBoard();
    SetupPlayers()
}

function SaveGame() {
    if (!campaignSelectionActive) {
        for (var n = 0; n < players.length; n++) players[n].SavePlayer();
        gameBoard.SaveGameBoard()
    }
}

function ShowUI() {
    ShowBoard();
    ShowPlayers()
}

function ShowBoard() {
    HideBoard();
    gameBoard.ShowGameBoard()
}

function ShowPlayers() {
    HidePlayers();
    var n = IsHistory && UserIndex < 0 ? 0 : UserIndex,
        t = (n + 1) % GameInfo.NumPlayers;
    ShowMainPlayer(n);
    ShowOppPlayer(t)
}

function ShowMainPlayer(n) {
    if (FormatPlayerName("playerName", n, !1, !0), !campaignSelectionActive) {
        $("#playerMoney").html(players[n].money);
        $("#playerHand").html(players[n].hand.length);
        $("#playerReserve").html(players[n].reserve.length);
        $("#playerDeck").html(players[n].deck.length);
        $("#playerDiscard").html(players[n].discardPile.length);
        $("#playerLoc").html(players[n].locPile.length);
        $("#playerEmp").html(players[n].empPile.length);
        $("#playerCubes").html(players[n].tokens[0]);
        $("#playerDiscs").html(players[n].tokens[1]);
        $("#playerCollCubes").html(players[n].oppTokens[0]);
        $("#playerCollDiscs").html(players[n].oppTokens[1]);
        players[n].points[0] = players[n].CalcPoints(!1);
        players[n].points[1] = players[n].CalcPoints(!0);
        var t = players[n].points[0],
            i = players[n].points[1],
            r = players[n].points[0] - players[n].points[1];
        $("#playerPoints").html(t);
        $("#playerSinglePoints").html("(" + r + "/" + i + ")");
        $("#playerCubesPic").attr("src", GameImagePath + "cube" + players[n].campaign + ".png");
        $("#playerDiscsPic").attr("src", GameImagePath + "discSmall" + players[n].campaign + ".png");
        $("#playerCollCubesPic").attr("src", GameImagePath + "cube" + (players[n].campaign + 1) % 2 + ".png");
        $("#playerCollDiscsPic").attr("src", GameImagePath + "discSmall" + (players[n].campaign + 1) % 2 + ".png");
        players[n].ShowHandCards(!1)
    }
}

function ShowOppPlayer(n) {
    if (FormatPlayerName("oppName", n, !1, !0), !campaignSelectionActive) {
        $("#oppMoney").html(players[n].money);
        $("#oppHand").html(players[n].hand.length);
        $("#oppReserve").html(players[n].reserve.length);
        $("#oppDeck").html(players[n].deck.length);
        $("#oppDiscard").html(players[n].discardPile.length);
        $("#oppLoc").html(players[n].locPile.length);
        $("#oppEmp").html(players[n].empPile.length);
        $("#oppCubes").html(players[n].tokens[0]);
        $("#oppDiscs").html(players[n].tokens[1]);
        $("#oppCollCubes").html(players[n].oppTokens[0]);
        $("#oppCollDiscs").html(players[n].oppTokens[1]);
        players[n].points[0] = players[n].CalcPoints(!1);
        players[n].points[1] = players[n].CalcPoints(!0);
        var t = players[n].points[0],
            i = players[n].points[1],
            r = players[n].points[0] - players[n].points[1];
        $("#oppPoints").html(t);
        $("#oppSinglePoints").html("(" + r + "/" + i + ")");
        $("#oppCubesPic").attr("src", GameImagePath + "cube" + players[n].campaign + ".png");
        $("#oppDiscsPic").attr("src", GameImagePath + "discSmall" + players[n].campaign + ".png");
        $("#oppCollCubesPic").attr("src", GameImagePath + "cube" + (players[n].campaign + 1) % 2 + ".png");
        $("#oppCollDiscsPic").attr("src", GameImagePath + "discSmall" + (players[n].campaign + 1) % 2 + ".png")
    }
}

function HideBoard() {
    $("#numForts").html("");
    $("#nFortNum").css("color", "black");
    $("#nFortNum").html("");
    $("#nNativeNum").css("color", "black");
    $("#nNativeNum").html("");
    $("#nSettlerNum").css("color", "black");
    $("#nSettlerNum").html("");
    $("#tokenContainer").html("")
}

function HidePlayers() {
    $("#playerMoney").html("");
    $("#playerPoints").html("");
    $("#playerSinglePoints").html("");
    $("#playerHand").html("");
    $("#playerReserve").html("");
    $("#playerDeck").html("");
    $("#playerDiscard").html("");
    $("#playerLoc").html("");
    $("#playerEmp").html("");
    $("#playerCubes").html("");
    $("#playerDiscs").html("");
    $("#playerCollCubes").html("");
    $("#playerCollDiscs").html("");
    $("#oppMoney").html("");
    $("#oppPoints").html("");
    $("#oppSinglePoints").html("");
    $("#oppHand").html("");
    $("#oppReserve").html("");
    $("#oppDeck").html("");
    $("#oppDiscard").html("");
    $("#oppLoc").html("");
    $("#oppEmp").html("");
    $("#oppCubes").html("");
    $("#oppDiscs").html("");
    $("#oppCollCubes").html("");
    $("#oppCollDiscs").html("");
    $("#handDiv").html("")
}

function HideInfos() {}

function HideSelections() {}

function ClearAllDivContainers() {}

function ToggleHand() {
    handUp = handUp ? !1 : !0;
    var n = players[UserIndex].cardSize === 0 ? "160" : "97";
    handUp ? $("#handDiv").animate({
        top: "-=" + n
    }, 300, function() {}) : $("#handDiv").animate({
        top: "+=" + n
    }, 300, function() {})
}

function InitializeButtons() {
    if (IsHistory || $("#lmInfo").css("cursor", "pointer").unbind().click(function() {
            ShowLastMoveInfo()
        }), $("#actionBtn9").attr("disabled", !0).click(function() {
            ExecuteMoneyAction(9)
        }), $("#actionBtn10").attr("disabled", !0).click(function() {
            ExecuteMerchantAction(10)
        }), $("#actionBtn11").attr("disabled", !0).click(function() {
            ExecuteTraderAction(11)
        }), $("#actionBtn12").attr("disabled", !0).click(function() {
            ExecutePiracyAction(12)
        }), $("#actionBtn13").attr("disabled", !0).click(function() {
            ExecuteDraftAction(13)
        }), $("#actionBtn14").attr("disabled", !0).click(function() {
            ExecuteDiscardAction(14)
        }), $("#actionBtn15").attr("disabled", !0).click(function() {
            ExecuteReserveAction(15)
        }), $("#actionBtn16").attr("disabled", !0).click(function() {
            ExecuteFreeReserveAction(16)
        }), $("#actionBtn17").attr("disabled", !0).click(function() {
            ExecuteGovernorAction(17)
        }), $("#actionBtn18").attr("disabled", !0).click(function() {
            ExecuteIntendantAction(18)
        }), $("#actionBtn19").attr("disabled", !0).click(function() {
            ExecuteHomeSupportAction(19)
        }), $("#actionBtn20").attr("disabled", !0).click(function() {
            ExecutePassAction(20)
        }), campaignSelectionActive) {
        $("#handBtn").attr("disabled", !0);
        $("#infoBtn0").attr("disabled", !0);
        $("#infoBtn1").attr("disabled", !0);
        $("#infoBtn2").attr("disabled", !0);
        $("#infoBtn3").attr("disabled", !0);
        $("#infoBtn4").attr("disabled", !0);
        $("#mapBtn").attr("disabled", !0);
        $("#autoBtn").attr("disabled", !0);
        return
    }
    $("#handBtn").unbind().click(function() {
        ToggleHand()
    });
    $("#cardSizeBtn").unbind().click(function() {
        SwitchCardSize()
    });
    $("#locNameBtn").unbind().click(function() {
        SwitchLocNames()
    });
    $("#mapBtn").unbind().click(function() {
        SwitchMap()
    });
    $("#autoBtn").unbind().click(function() {
        ShowAutoOptions()
    });
    $("#mapBtn").attr("disabled", !0);
    (IsHistory || IsActive === "False") && $("#autoBtn").attr("disabled", !0);
    $("#pointsDummy").unbind().click(function() {
        ShowMainInfo(7, !1, -1, -1)
    });
    $("#oppPointsDummy").unbind().click(function() {
        ShowMainInfo(7, !0, -1, -1)
    });
    for (var n = 0; n < 6; n++) $("#oppInfoDummy" + n).unbind().click(function(n, t, i, r) {
        return function() {
            ShowMainInfo(n, t, i, r)
        }
    }(n, !0, -1, -1)), n < 5 && $("#infoBtn" + n).unbind().click(function(n, t, i, r) {
        return function() {
            ShowMainInfo(n, t, i, r)
        }
    }(n, !1, -1, -1));
    IsHistory && ($("#cardSizeBtn").attr("disabled", !0), $("#locNameBtn").attr("disabled", !0))
}

function SwitchCardSize() {
    if (!IsHistory) {
        var n = players[UserIndex].cardSize;
        players[UserIndex].cardSize = (n + 1) % 2;
        cardSizeBackup = players[UserIndex].cardSize;
        players[UserIndex].ShowHandCards(!0);
        switch (players[UserIndex].cardSize) {
            case 0:
                $("#handDiv").css("height", "298px");
                handUp && $("#handDiv").animate({
                    top: "-=63"
                }, 300, function() {});
                break;
            case 1:
                $("#handDiv").css("height", "235px");
                handUp && $("#handDiv").animate({
                    top: "+=63"
                }, 300, function() {})
        }
    }
}

function SwitchMap() {
    if (!IsHistory) {
        var n = players[UserIndex].map;
        players[UserIndex].map = (n + 1) % 3;
        ShowBoard()
    }
}

function SwitchLocNames() {
    var n;
    if (!IsHistory) {
        n = players[UserIndex].locNames;
        players[UserIndex].locNames = (n + 1) % 2;
        locNamesBackup = players[UserIndex].locNames;
        var t = players[UserIndex].locNames === 0 ? "" : "X",
            i = players[UserIndex].campaign,
            r = IsHistory ? 2 : players[UserIndex].map;
        $("#board").attr("src", GameImagePath + "map" + ["Small", "Medium", "Large"][r] + t + i + ".jpg")
    }
}

function ShowAutoOptions() {
    optionsVisible = optionsVisible ? !1 : !0;
    optionsVisible ? (InitOptionChecks(), handUp && ToggleHand(), $("#aOptDiv").animate({
        top: "-=480"
    }, 300, function() {}), $("#rOptDiv").animate({
        top: "-=480"
    }, 300, function() {})) : (handUp || ToggleHand(), $("#aOptDiv").animate({
        top: "+=480"
    }, 300, function() {}), $("#rOptDiv").animate({
        top: "+=480"
    }, 300, function() {}))
}

function InitOptionChecks() {
    for (var u = players[UserIndex].autoRaid, i = players[UserIndex].autoAmbush, t = Decode(i, 0), r, f, n = 0; n < 3; n++)
        if (t === n) {
            $("#ambushOpt" + n).attr("checked", !0);
            break
        } for (t = Decode(i, 3), n = 3; n < 5; n++)
        if (t === n - 3) {
            $("#ambushOpt" + n).attr("checked", !0);
            break
        } for (t = Decode(i, 4), n = 0; n < 2; n++)
        if (t === n) {
            $("#pilOpt" + n).attr("checked", !0);
            break
        } for (t = Decode(u, 0), n = 0; n < 2; n++)
        if (t === n) {
            $("#raidOpt" + n).attr("checked", !0);
            break
        } for (t = Decode(i, 1), r = players[UserIndex].campaign === 0 ? blockStringsA_EN : blockStringsA_FR, $("#aBlockString").html("#" + (t + 1) + ": " + r[t]), t = Decode(i, 2), f = players[UserIndex].campaign === 0 ? targetStringsA_EN : targetStringsA_FR, $("#aTargetString").html("#" + (t + 1) + ": " + f[t]), r = players[UserIndex].campaign === 0 ? blockStringsR_EN : blockStringsR_FR, n = 0; n < 3; n++) t = Decode(u, n + 1), $("#rBlockString" + n).html(n + 1 + ".: " + r[t])
}

function CheckOptions() {
    for (var n = 0; n < 3; n++) document.getElementById("ambushOpt" + n).checked && (players[UserIndex].autoAmbush = UpdateCustomStatus(players[UserIndex].autoAmbush, 0, Encode(n)));
    for (n = 3; n < 5; n++) document.getElementById("ambushOpt" + n).checked && (players[UserIndex].autoAmbush = UpdateCustomStatus(players[UserIndex].autoAmbush, 3, Encode(n - 3)));
    for (n = 0; n < 2; n++) document.getElementById("pilOpt" + n).checked && (players[UserIndex].autoAmbush = UpdateCustomStatus(players[UserIndex].autoAmbush, 4, Encode(n)));
    for (n = 0; n < 2; n++) document.getElementById("raidOpt" + n).checked && (players[UserIndex].autoRaid = UpdateCustomStatus(players[UserIndex].autoRaid, 0, Encode(n)))
}

function ChangeAmbushBlockOpt() {
    var t = players[UserIndex].campaign === 0 ? blockStringsA_EN : blockStringsA_FR,
        i = Decode(players[UserIndex].autoAmbush, 1),
        n = (i + 1) % t.length;
    players[UserIndex].autoAmbush = UpdateCustomStatus(players[UserIndex].autoAmbush, 1, Encode(n));
    $("#aBlockString").html("#" + (n + 1) + ": " + t[n])
}

function ChangeAmbushTargetOpt() {
    var t = players[UserIndex].campaign === 0 ? targetStringsA_EN : targetStringsA_FR,
        i = Decode(players[UserIndex].autoAmbush, 2),
        n = (i + 1) % t.length;
    players[UserIndex].autoAmbush = UpdateCustomStatus(players[UserIndex].autoAmbush, 2, Encode(n));
    $("#aTargetString").html("#" + (n + 1) + ": " + t[n])
}

function ChangeRaidBlock(n) {
    var i = players[UserIndex].campaign === 0 ? blockStringsR_EN : blockStringsR_FR,
        f = Decode(players[UserIndex].autoRaid, n + 1),
        t = (f + 1) % i.length,
        r, u;
    switch (n) {
        case 0:
            players[UserIndex].autoRaid = UpdateCustomStatus(players[UserIndex].autoRaid, n + 1, Encode(t));
            $("#rBlockString" + n).html(n + 1 + ".: " + i[t]);
            CheckPrioInUse(1, t);
            CheckPrioInUse(2, t);
            break;
        case 1:
            for (r = Decode(players[UserIndex].autoRaid, 1); t === r;) t = (t + 1) % i.length;
            players[UserIndex].autoRaid = UpdateCustomStatus(players[UserIndex].autoRaid, n + 1, Encode(t));
            $("#rBlockString" + n).html(n + 1 + ".: " + i[t]);
            CheckPrioInUse(2, t);
            break;
        case 2:
            for (r = Decode(players[UserIndex].autoRaid, 1), u = Decode(players[UserIndex].autoRaid, 2); t === r || t === u;) t = (t + 1) % i.length;
            players[UserIndex].autoRaid = UpdateCustomStatus(players[UserIndex].autoRaid, n + 1, Encode(t));
            $("#rBlockString" + n).html(n + 1 + ".: " + i[t])
    }
}

function CheckPrioInUse(n, t) {
    var o = players[UserIndex].campaign === 0 ? blockStringsR_EN : blockStringsR_FR,
        i = Decode(players[UserIndex].autoRaid, n + 1),
        u, f, e, r;
    switch (n) {
        case 1:
            for (u = Decode(players[UserIndex].autoRaid, 1), f = Decode(players[UserIndex].autoRaid, 3); i === u || i === f || i === t;) e = (i + 1) % o.length, i = e;
            break;
        case 2:
            for (u = Decode(players[UserIndex].autoRaid, 1), f = Decode(players[UserIndex].autoRaid, 2); i === u || i === f || i === t;) e = (i + 1) % o.length, i = e
    }
    for (players[UserIndex].autoRaid = UpdateCustomStatus(players[UserIndex].autoRaid, n + 1, Encode(i)), r = 1; r < 4; r++) flag = Decode(players[UserIndex].autoRaid, r), $("#rBlockString" + (r - 1)).html(r + ".: " + o[flag])
}

function CreateImage(n, t, i, r, u, f, e, o, s, h, c) {
    var l = $("<img>").css("position", t).css("left", u + "px").css("top", r + "px").css("zIndex", i).attr("id", n).attr("src", s);
    $("#" + h).append(l);
    f != -1 && $("#" + n).css("width", f + "px");
    e != -1 && $("#" + n).css("height", e + "px");
    o !== "" && $("#" + n).css("border", o);
    c !== "" && $("#" + n).attr("title", c)
}

function CreateDiv(n, t, i, r, u, f, e, o, s, h, c, l, a) {
    var v = $("<div>").css("position", t).css("left", f + "px").css("top", u + "px").css("width", e + "px").css("height", o + "px").css("zIndex", i).css("overflow", r).attr("id", n);
    $("#" + l).append(v);
    s !== "" && $("#" + n).css("backgroundColor", s);
    h !== "" && $("#" + n).css("color", h);
    c !== "" && $("#" + n).html(c);
    a !== "" && $("#" + n).attr("align", a)
}

function SetupSituationalUserInterface() {
    IsHistory ? (ShowInfoMessage(3, StrGameFromDB), ShowSiegeStatus()) : SetupActionInterface()
}

function SetupActionInterface() {
    var i = "",
        t = "",
        f = GetGamePhase(),
        c = GetMultiFuncFlag(),
        e;
    if (IsActive == "True") switch (f) {
        case 0:
        case 2:
            if (SetActivePlayer(UserIndex), e = GetNumActions(), e < c) e === 0 && (IsSiegeWon(0) || IsSiegeWon(1)) ? (EnableSiegeResolving(), ShowSiegeStatus(), ShowNumActions(), ShowInfoMessage(3, "<span style='color:red'>" + StrSiegeCheck + "<\/span>")) : (EnableHandCards(!1), EnableActions(!0), ShowGameInfo());
            else if (ShowGameInfo(), players[UserIndex].hand.length < 5 && !IsRandomRule(25)) ShowRefillHandButton();
            else {
                if (f === 2) {
                    EnableRefillDiscard();
                    SetResetButton(!1);
                    SetFinishButton(!1);
                    return
                }
                CheckIfSiegeLost();
                siegesLost[0] || siegesLost[1] || siegeLostVisible ? siegesLost[0] ? ShowSiegeCardSelection(0, !1) : ShowSiegeCardSelection(1, !1) : (SetFinishButton(!0), ShowInfoMessage(3, StrFinishTurn))
            }
            break;
        case 1:
            ShowInfoMessage(3, StrChooseCard);
            ExecuteDraftAction(39);
            break;
        case 3:
            ShowCampaignSelection();
            break;
        case 4:
            wonByHomeSurrender = !0;
            t = Lang === 0 ? "Ft. Duquesne verloren!" : "You lost Ft. Duquesne!";
            i = "<span style='color:red'><b>" + t + "<\/b><\/span>";
            ShowInfoMessage(2, i);
            ShowInfoMessage(3, StrFinishTurn);
            SetResetButton(!0);
            SetFinishButton(!0);
            SetGamePhase(0);
            break;
        case 6:
            t = Lang === 0 ? "Reaktion auf R&uuml;ckzug." : "Withdraw response.";
            i = "<span style='color:blue'><b>" + t + "<\/b><\/span>";
            ShowInfoMessage(2, i);
            try {
                t = Lang === 0 ? "Ausserplanmaessiger Zug:\nGegner zog sich von Belagerung zurueck. Klicke eine Handkarte mit Siedler-Symbol an, um sie zu spielen und zu siedeln." : "Out-of-turn-action:\nOpponent performed withdraw action. Click a card with settler symbol in order to settle, otherwise finish your turn.";
                alert(t)
            } catch (a) {}
            for (var o = players[UserIndex].hand, r = players[UserIndex].campaign, l = r === 0 ? locDataEN : locDataFR, u, s, h, n = 0; n < o.length; n++)
                if (u = o.substr(n, 1), HasSymbol(r, 4, u)) {
                    if (IsLocationCard(r, u) && (s = Decode(o, n), h = l[s][0][2], !IsLocCardValid(r, h))) continue;
                    $("#handCard" + n).click(function(n, t) {
                        return function() {
                            SettleWithdrawLocation(n, t)
                        }
                    }(n, u)).css("cursor", "pointer")
                } SetGamePhase(7);
            SetFinishButton(!0);
            break;
        default:
            alert("Unknown game phase (SAI): " + f);
            return
    } else IsGameOver() ? ShowGameOverInfo() : (ShowSiegeStatus(), ShowNumActions(), ShowInfoMessage(3, "<span style='color:red'>" + StrOppTurn + "<\/span>"))
}

function SettleWithdrawLocation(n, t) {
    var i = GetAntiCheatFlag();
    MovesDone = "W" + Encode(i) + t;
    players[UserIndex].RemoveHandCard(t);
    players[UserIndex].discardPile += t;
    gameBoard.SetLocation(i, 1 + players[UserIndex].campaign * 4);
    players[UserIndex].tokens[0]--;
    players[UserIndex].TakeLocCard(i);
    ShowUI();
    ShowInfoMessage(3, StrFinishTurn);
    SetResetButton(!0);
    SetFinishButton(!0)
}

function EnableHandCards(n) {
    for (var r = players[UserIndex].campaign, i = "", t = 0; t < players[UserIndex].hand.length; t++)(i = players[UserIndex].hand.substr(t, 1), !n || IsFreeActionCard(r, i)) && $("#handCard" + t).click(function(n, t) {
        return function() {
            ActivateHandCard(n, t)
        }
    }(t, i)).css("cursor", "pointer")
}

function IsFreeActionCard(n, t) {
    if (n === 0 && (Decode(t, 0) === 33 || Decode(t, 0) === 41) || n === 1 && (Decode(t, 0) === 34 || Decode(t, 0) === 32) || IsRandomRule(11) && IsLocationCard(n, t) && HasSymbol(n, 3, t)) return !0;
    if (IsRandomRule(17) && IsLocationCard(n, t)) {
        var i = n === 0 ? locDataEN : locDataFR,
            r = Decode(t, 0),
            u = i[r][0][2];
        if (gameBoard.GetLocOwner(u) !== n) return !0
    }
    return !1
}

function IsCardActive(n) {
    for (var i = players[UserIndex].activeCards, t = 0; t < i.length; t++)
        if (i.substr(t, 1) === n) return !0;
    return !1
}

function ActivateHandCard(n, t) {
    if (isGameValid && (!(GetNumActions() >= GetMultiFuncFlag()) || !(players[UserIndex].activeCards.length > 0))) {
        var r = "",
            i = -1,
            u = "";
        IsNeutralCard(t) ? (r = "Neutral", i = t) : (r = players[UserIndex].campaign === 0 ? "British" : "French", i = Decode(t, 0), IsRandomRule(22) && i === 26 && players[UserIndex].campaign === 1 && (u = "F"));
        var f = players[UserIndex].cardSize === 0 ? "" : "small/",
            e = CheckLocValidity(players[UserIndex].campaign, t) ? "" : "X",
            o = GameImagePath + "cards/" + f + "card" + r + e + "H" + i + u + ".jpg?v=3";
        players[UserIndex].AddActiveCard(t);
        EnableActions(!0);
        $("#handCard" + n).unbind();
        $("#handCard" + n).attr("src", o).click(function() {
            DeactivateHandCard(n, t)
        })
    }
}

function DeactivateHandCard(n, t) {
    if (isGameValid) {
        var r = "",
            i = -1,
            u = "";
        IsNeutralCard(t) ? (r = "Neutral", i = t) : (r = players[UserIndex].campaign === 0 ? "British" : "French", i = Decode(t, 0), IsRandomRule(22) && i === 26 && players[UserIndex].campaign === 1 && (u = "F"));
        var f = players[UserIndex].cardSize === 0 ? "" : "small/",
            e = CheckLocValidity(players[UserIndex].campaign, t) ? "" : "X",
            o = GameImagePath + "cards/" + f + "card" + r + e + i + u + ".jpg?v=3";
        players[UserIndex].RemoveActiveCard(t);
        EnableActions(GetNumActions() < GetMultiFuncFlag());
        $("#handCard" + n).unbind();
        $("#handCard" + n).attr("src", o).click(function() {
            ActivateHandCard(n, t)
        })
    }
}

function ShowGameInfo() {
    ShowSiegeStatus();
    ShowNumActions();
    ShowOrders()
}

function ShowSiegeStatus() {
    var n = "";
    n += "<span style='color:red;font-weight:bold'>" + StrSiegeAbbr + ": <\/span>";
    gameBoard.IsSiegeActive(0) ? (n += "<i>", n += locationData[Decode(gameBoard.sieges[0], 0)][0], n += "<\/i>") : n += IsRandomRule(16) && !IsFirstFrenchSiege() ? "<span style='color:black;font-weight:bolder'>XXX<\/span>" : "----";
    n += "&nbsp;&nbsp;&nbsp;";
    n += "<span style='color:blue;font-weight:bold'>" + StrSiegeAbbr + ": <\/span>";
    gameBoard.IsSiegeActive(1) ? (n += "<i>", n += locationData[Decode(gameBoard.sieges[1], 0)][0], n += "<\/i>") : n += IsRandomRule(16) && !IsFirstFrenchSiege() ? "<span style='color:black;font-weight:bolder'>XXX<\/span>" : "----";
    ShowInfoMessage(0, n)
}

function GetNumActions() {
    var n = 0,
        r = GetMovesDoneBackup(),
        i, t;
    if (r.length > 0)
        for (i = 0; i < r.split(",").length; i++) t = Decode(r.split(",")[i], 0), IsFreeAction(t) || t === 30 || t === 35 || t === 36 || n++;
    return n > 2 && (alert("Error: illegal numActions: " + n), n = 2), n
}

function ShowNumActions() {
    ShowInfoMessage(1, StrActions + ": " + GetNumActions() + "/" + GetMultiFuncFlag())
}

function ShowOrders() {
    switch (GetNumActions()) {
        case 0:
            ShowInfoMessage(3, StrFirstAction);
            break;
        case 1:
            var n = GetMultiFuncFlag() === 1 ? StrFinishTurnFree : StrSecondAction;
            ShowInfoMessage(3, n);
            break;
        case 2:
            ShowInfoMessage(3, StrFinishTurnFree)
    }
}

function ShowInfoMessage(n, t) {
    var i = "";
    switch (n) {
        case 0:
            i = document.getElementById("siegeInfo");
            break;
        case 1:
            i = document.getElementById("numActionInfo");
            break;
        case 2:
            i = document.getElementById("actionInfo");
            break;
        case 3:
            i = document.getElementById("orderInfo");
            break;
        default:
            return
    }
    i.innerHTML = "";
    i.innerHTML = t
}

function ShowGameOverInfo() {
    gamestatus.substr(1, 1) === "1" && ShowInfoMessage(3, StrGameOver)
}

function IsGameOver() {
    return gamestatus.substr(1, 1) !== "0" ? !0 : !1
}

function HasGivenUp() {
    return gamestatus.substr(1, 1) === "2" ? !0 : !1
}

function IsActionAvailable(n, t) {
    var r = players[UserIndex].campaign,
        a = (r + 1) % 2,
        o = r === 0 ? locDataEN : locDataFR,
        nt = r === 0 ? empDataEN : empDataFR,
        i = players[UserIndex].activeCards,
        v = players[UserIndex].money,
        u = "",
        f = -1,
        e, s, w, k, d, g, l;
    if (!t && n !== 14 && n !== 15 && n !== 17) return !1;
    switch (n) {
        case 0:
            if (i.length < 2 || i.length > 3 || players[UserIndex].tokens[0] <= 0) return !1;
            if (IsLocationCard(r, i.substr(0, 1))) {
                f = Decode(i, 0);
                var y = o[f][1],
                    h = "",
                    p = -1,
                    c = -1,
                    b = -1;
                for (e = 0; e < y.length; e++)
                    for (h = y[e], p = h[0], s = 1; s < h.length; s++)
                        if ((c = h[s], b = gameBoard.GetLocOwner(c), b !== a && (b !== r || players[UserIndex].HasLocCard(GetCardIDByLoc(r, c)))) && HasSymbol(r, p, i.substr(1, 1)))
                            if (locationData[c][4]) {
                                if (i.length === 3 && HasSymbol(r, 4, i.substr(2, 1))) return !0
                            } else if (i.length === 2) return !0
            }
            return !1;
        case 1:
            return i.length !== 2 ? !1 : IsLocationCard(r, i.substr(0, 1)) ? (f = Decode(i, 0), !HasSymbol(r, 4, i.substr(1, 1))) ? !1 : gameBoard.HasBonus(o[f][0][2]) ? gameBoard.GetLocOwner(o[f][0][2]) !== r ? !1 : gameBoard.IsVillage(o[f][0][2]) ? players[UserIndex].tokens[1] <= 0 ? !1 : !0 : !1 : !1 : !1;
        case 2:
            if (i.length !== 2 || gameBoard.numStockForts === 0 || players[UserIndex].money < 3 || !IsFortificationCard(r, i.substr(0, 1)) && !IsFortificationCard(r, i.substr(1, 1))) return !1;
            if (IsLocationCard(r, i.substr(0, 1))) return (f = Decode(i, 0), gameBoard.IsSieged(o[f][0][2])) ? !1 : !gameBoard.IsFortress(o[f][0][2]) && gameBoard.GetLocOwner(o[f][0][2]) === r ? !0 : !1;
            if (IsLocationCard(r, i.substr(1, 1))) {
                if (f = Decode(i, 1), gameBoard.IsSieged(o[f][0][2])) return !1;
                if (!gameBoard.IsFortress(o[f][0][2]) && gameBoard.GetLocOwner(o[f][0][2]) === r) return !0
            }
            return !1;
        case 3:
            if (i.length !== 3 || gameBoard.IsSiegeActive(r) || IsFortificationCard(r, i.substr(2, 1)) || r === 0 && Decode(i, 2) === 44 && v < 3 || r === 1 && Decode(i, 2) === 45 && v < 3 || IsRandomRule(16) && r === 0 && !IsFirstFrenchSiege() && players[UserIndex].points[0] < 25) return !1;
            if (IsLocationCard(r, i.substr(0, 1))) {
                f = Decode(i, 0);
                var a = (r + 1) % 2,
                    y = o[f][1],
                    h = "",
                    p = -1,
                    c = -1;
                for (e = 0; e < y.length; e++)
                    for (h = y[e], p = h[0], s = 1; s < h.length; s++)
                        if ((c = h[s], gameBoard.GetLocOwner(c) === a) && !gameBoard.IsSieged(c) && HasSymbol(r, p, i.substr(1, 1)) && (HasSymbol(r, 6, i.substr(2, 1)) || IsRandomRule(15) && IsNativeCard(r, i.substr(2, 1)) || locationData[c][2] > 0 && HasSymbol(r, 2, i.substr(2, 1)))) return !0
            }
            return !1;
        case 4:
            if (i.length !== 1 || r === 0 && Decode(i, 0) === 33 || r === 1 && Decode(i, 0) === 34 || r === 0 && Decode(i, 0) === 44 && v < 3 || r === 1 && Decode(i, 0) === 45 && v < 3 || (a = (r + 1) % 2, IsFortificationCard(r, i.substr(0, 1)) && !gameBoard.IsSiegeActive(a))) return !1;
            for (e = 0; e < 2; e++)
                if ((w = Decode(gameBoard.sieges[e], 0), gameBoard.IsSiegeActive(e)) && (validTarget = -1, validChecks = [], validChecks.push(w), CheckValidConns(r, w), IsHomeLoc(r, validTarget)) && (HasSymbol(r, 6, i.substr(0, 1)) || IsRandomRule(15) && IsNativeCard(r, i.substr(0, 1)) || locationData[w][2] > 0 && HasSymbol(r, 2, i.substr(0, 1)))) return !0;
            return !1;
        case 5:
            if (i.length === 0) return !1;
            for (k = 0, d = IsRandomRule(24) ? i.length : i.length + 1, e = 0; e < i.length; e++) {
                if ((u = i.substr(e, 1), !IsEmpireCard(r, u)) || !IsNeutralCard(u) && !nt[GetEmpireIndex(r, u)][6] || IsNeutralCard(u) && !empDataN[GetNeutralIndex(u)][6]) return !1;
                IsNativeCard(r, u) && k++
            }
            return players[UserIndex].money < k ? !1 : i.length === 1 && (r === 0 && Decode(i, 0) === 40 || r === 1 && (Decode(i, 0) === 39 || Decode(i, 0) === 40)) ? !1 : i.length === 2 && r === 1 && (Decode(i, 0) === 39 && Decode(i, 1) === 40 || Decode(i, 0) === 40 && Decode(i, 1) === 39) ? !1 : CanRaid(d, d);
        case 6:
            return i.length !== 1 ? !1 : (u = i.substr(0, 1), !IsEmpireCard(r, u)) ? !1 : !IsNeutralCard(u) && !nt[GetEmpireIndex(r, u)][7] ? !1 : IsNeutralCard(u) && !empDataN[GetNeutralIndex(u)][7] ? !1 : IsNativeCard(r, u) && players[UserIndex].money <= 0 ? !1 : !0;
        case 7:
            return i.length !== 1 ? !1 : !gameBoard.IsSiegeActive(0) && !gameBoard.IsSiegeActive(1) ? !1 : r === 0 && Decode(i, 0) === 33 ? !0 : r === 1 && Decode(i, 0) === 34 ? !0 : !1;
        case 8:
            return i.length !== 1 ? !1 : r === 0 && Decode(i, 0) === 40 ? !0 : r === 1 && (Decode(i, 0) === 39 || Decode(i, 0) === 40) ? !0 : !1;
        case 9:
            return i.length !== 1 || GetNumActions() >= GetMultiFuncFlag() ? !1 : (u = i.substr(0, 1), !IsLocationCard(r, u)) ? !1 : HasSymbol(r, 7, u) || HasSymbol(r, 8, u) || HasSymbol(r, 9, u) ? !0 : !1;
        case 10:
            if (i.length < 2 || i.length > 3 || !HasSymbol(r, 2, i.substr(0, 1))) return !1;
            for (e = 1; e < i.length; e++)
                if (u = i.substr(e, 1), !HasSymbol(r, 7, u) && !HasSymbol(r, 8, u) && !HasSymbol(r, 9, u)) return !1;
            return !0;
        case 11:
            if (!IsRandomRule(11) || i.length > 1) {
                if (i.length < 2 || r === 0 && Decode(i, 0) !== 42 || r === 1 && Decode(i, 0) !== 28 && Decode(i, 0) !== 46) return !1;
                for (e = 1; e < i.length; e++)
                    if ((u = i.substr(e, 1), !IsLocationCard(r, u)) || !HasSymbol(r, 3, u)) return !1
            } else if (i.length !== 1 || !IsRandomRule(11) || (u = i.substr(0, 1), !IsLocationCard(r, u)) || !HasSymbol(r, 3, u)) return !1;
            return !0;
        case 12:
            return r !== 1 ? !1 : i.length !== 2 ? !1 : Decode(i, 0) === 1 && HasSymbol(1, 2, i.substr(1, 1)) ? !0 : !1;
        case 13:
            return i.length === 0 && (players[UserIndex].empPile.length > 0 || gameBoard.neutralCards.length > 0);
        case 14:
            return i.length === 0 ? !1 : i.length === 1 && GetNumActions() >= GetMultiFuncFlag() ? r === 0 && (Decode(i, 0) === 41 || Decode(i, 0) === 33) ? !1 : r === 1 && (Decode(i, 0) === 32 || Decode(i, 0) === 34) ? !1 : IsRandomRule(17) && (u = i.substr(0, 1), IsLocationCard(r, u) && (f = Decode(u, 0), l = o[f][0][2], gameBoard.GetLocOwner(l) !== r)) ? !0 : !1 : i.length === 1 || players[UserIndex].money >= i.length - 1 || IsRandomRule(12);
        case 15:
            return i.length === 1 && GetNumActions() >= GetMultiFuncFlag() ? r === 0 && (Decode(i, 0) === 41 || Decode(i, 0) === 33) ? !1 : (r === 1 && (Decode(i, 0) === 32 || Decode(i, 0) === 34), !1) : (u = i.substr(0, 1), IsLocationCard(r, u) && (f = Decode(i, 0), l = o[f][0][2], !IsRandomRule(6) && !IsRandomRule(20) || IsRandomRule(20) && gameBoard.GetLocOwner(l) === r)) ? !1 : i.length === 1 && players[UserIndex].reserve.length < 5;
        case 16:
            return g = players[UserIndex].reserve.length, g > 0 && players[UserIndex].money >= g && i.length === 0;
        case 17:
            return i.length < 2 || i.length > 3 ? !1 : IsRandomRule(14) && (IsLocationCard(r, i.substr(1, 1)) && gameBoard.IsSieged(o[Decode(i, 1)][0][2]) || i.length === 3 && IsLocationCard(r, i.substr(2, 1)) && gameBoard.IsSieged(o[Decode(i, 2)][0][2])) ? !1 : IsRandomRule(18) && ((u = i.substr(1, 1), IsLocationCard(r, u) && (f = Decode(i, 1), l = o[f][0][2], o[f][0][1] === 0 && gameBoard.GetLocOwner(l) === r)) || i.length === 3 && (u = i.substr(2, 1), f = Decode(i, 2), l = o[f][0][2], IsLocationCard(r, u) && o[f][0][1] === 0 && gameBoard.GetLocOwner(l) === r)) ? !1 : r === 0 && Decode(i, 0) === 53 ? !0 : r === 1 && Decode(i, 0) === 31 ? !0 : !1;
        case 18:
            return players[UserIndex].campaign !== 1 ? !1 : i.length !== 1 || Decode(i, 0) !== 33 ? !1 : players[UserIndex].money < 2 || players[UserIndex].discardPile.length === 0 ? !1 : !0;
        case 19:
            if (i.length !== 1) return !1;
            if (IsRandomRule(23)) {
                if (players[UserIndex].deck.length + players[UserIndex].discardPile.length === 0) return !1
            } else if (players[UserIndex].deck.length === 0) return !1;
            return r === 0 && Decode(i, 0) === 41 ? !0 : r === 1 && Decode(i, 0) === 32 ? !0 : !1;
        case 20:
            return i.length === 0;
        case 21:
            return i.length === 0;
        default:
            return !1
    }
    return !1
}

function IsFreeAction(n) {
    return n === 7 || n === 16 || n === 19 || n === 21 || n === 37 || n === 38
}

function IsButtonAction(n) {
    return n >= 9 && n <= 21
}

function EnableActions(n) {
    DisableActions();
    for (var r = "", u = !1, f, e = players[UserIndex].campaign, o = ["Indian Leader", "Priest"], s = CheckLocValidity(e, players[UserIndex].activeCards), i, t = 0; t < 22; t++)
        if (IsActionAvailable(t, s) && (n || IsFreeAction(t)))
            if (IsButtonAction(t))
                if (t === 21)
                    for (i = 0; i < 2; i++) gameBoard.IsSiegeActive(i) && $("#withdrawBtn" + i).attr("disabled", !1);
                else $("#actionBtn" + t).attr("disabled", !1);
    else EnableMapAction(t), r += u ? ",&nbsp;" : "<b>" + StrMap + ": <\/b>", f = t !== 8 ? mapActionStrings[t] : o[e], r += "<i>" + f + "<\/i>", u = !0;
    ShowInfoMessage(2, r)
}

function DisableActions() {
    cardDrafted = !1;
    DisableMapActions();
    for (var t, n = 0; n < 22; n++)
        if (IsButtonAction(n))
            if (n === 21)
                for (t = 0; t < 2; t++) gameBoard.IsSiegeActive(t) && $("#withdrawBtn" + t).attr("disabled", !0);
            else $("#actionBtn" + n).attr("disabled", !0)
}

function IsLocationCard(n, t) {
    if (IsNeutralCard(t)) return !1;
    var i = Decode(t, 0);
    switch (n) {
        case 0:
            return i >= 0 && i <= 32;
        case 1:
            return i >= 0 && i <= 25;
        default:
            return !1
    }
}

function IsEmpireCard(n, t) {
    if (IsNeutralCard(t)) return !0;
    var i = Decode(t, 0);
    switch (n) {
        case 0:
            return i >= 33 && i <= 53;
        case 1:
            return i >= 26 && i <= 46;
        default:
            return !1
    }
}

function IsFortificationCard(n, t) {
    if (IsNeutralCard(t)) return t == "A" || t == "B" ? !0 : !1;
    switch (n) {
        case 0:
            if (Decode(t, 0) === 52) return !0;
            break;
        case 1:
            if (Decode(t, 0) === 30) return !0
    }
    return !1
}

function HasSymbol(n, t, i) {
    var u = "",
        f, r, e;
    if (IsLocationCard(n, i)) {
        for (f = n === 0 ? locDataEN : locDataFR, u = f[Decode(i, 0)][2], r = 0; r < u.length; r++)
            if (u[r] === t) return !0;
        return !1
    }
    if (IsEmpireCard(n, i)) {
        if (IsNeutralCard(i)) return empDataN[GetNeutralIndex(i)][10] === t ? !0 : !1;
        if (e = n === 0 ? empDataEN : empDataFR, e[GetEmpireIndex(n, i)][10] === t) return !0
    }
    return !1
}

function CalcNumMilitary(n, t) {
    var i = 0,
        f, r, u;
    if (IsNativeCard(n, t)) return 1;
    if (IsLocationCard(n, t)) return HasSymbol(n, 6, t) ? i++ : HasSymbol(n, 2, t) && i++, i;
    if (IsEmpireCard(n, t)) {
        if (IsNeutralCard(t)) return f = GetNeutralIndex(t), empDataN[f][10] == 6 && (i = empDataN[f][11]), i;
        r = n === 0 ? empDataEN : empDataFR;
        u = GetEmpireIndex(n, t);
        r[u][10] === 6 ? i = r[u][11] : r[u][10] === 2 && (i = r[u][11])
    }
    return i
}

function CanRaid(n, t) {
    for (var r = players[UserIndex].campaign, u = IsRandomRule(24), i = 0; i < gameBoard.locations.length; i++) gameBoard.IsSieged(i) || gameBoard.GetLocOwner(i) === r && (raidChecks = [], CheckRaid(t, n, i, u));
    return raidTargets.length > 0
}

function CheckRaid(n, t, i, r) {
    if (!(t <= 0)) {
        var f = locationData[i][5],
            e = (players[UserIndex].campaign + 1) % 2,
            u;
        for (raidChecks.push(i), u = 0; u < f.length; u++) gameBoard.IsFortress(f[u]) || IsRaidChecked(f[u]) || gameBoard.IsSieged(f[u]) && gameBoard.GetLocOwner(f[u]) !== e || (gameBoard.GetLocOwner(f[u]) !== e || t !== 1 && (r || n !== 2 || t !== 2) || IsRaidTargetChecked(f[u]) || gameBoard.IsSieged(f[u]) || raidTargets.push(f[u]), t > 1 && CheckRaid(n, t - 1, f[u], r));
        raidChecks.pop()
    }
}

function IsRaidChecked(n) {
    for (var t = 0; t < raidChecks.length; t++)
        if (raidChecks[t] === n) return !0;
    return !1
}

function IsRaidTargetChecked(n) {
    for (var t = 0; t < raidTargets.length; t++)
        if (raidTargets[t] === n) return !0;
    return !1
}

function CheckLocValidity(n, t) {
    if (t.length === 0) return !0;
    for (var e = n === 0 ? locDataEN : locDataFR, r, u, f, i = 0; i < t.length; i++)
        if ((r = t.substr(i, 1), IsLocationCard(n, r)) && (u = Decode(t, i), f = e[u][0][2], !IsLocCardValid(n, f))) return !1;
    return !0
}

function IsLocationControlled(n, t) {
    return gameBoard.GetLocOwner(t) === n
}

function IsLocCardValid(n, t) {
    return gameBoard.IsSieged(t) ? !1 : gameBoard.GetLocOwner(t) !== n ? !1 : IsHomeLoc(n, t) ? !0 : (validTarget = -1, validChecks = [], validChecks.push(t), CheckValidConns(n, t), IsHomeLoc(n, validTarget))
}

function CheckValidConns(n, t) {
    if (!IsHomeLoc(n, validTarget)) {
        for (var r = validCheckConns[t], i = 0; i < r.length; i++)
            if (IsHomeLoc(n, r[i])) {
                validTarget = r[i];
                return
            } for (i = 0; i < r.length; i++) IsValidChecked(r[i]) || gameBoard.GetLocOwner(r[i]) === n && (validChecks.push(r[i]), CheckValidConns(n, r[i]))
    }
}

function IsValidChecked(n) {
    for (var t = 0; t < validChecks.length; t++)
        if (validChecks[t] === n) return !0;
    return !1
}

function IsHomeLoc(n, t) {
    var i = n === 0 ? 0 : 34;
    return t === i
}

function CalcSiegeMarkerPos(n) {
    var t = Decode(gameBoard.sieges[n], 0),
        i = CalcLocStrength(t),
        r = CalcCardsStrength(n, !0),
        u = CalcCardsStrength(n, !1);
    return i - r + u
}

function CalcLocStrength(n) {
    var t = -1;
    return gameBoard.IsFortress(n) && (t -= 2), t - locationData[n][1]
}

function CalcCardsStrength(n, t) {
    var i = UserIndex >= 0 ? UserIndex : players[0].index,
        u = -1,
        f, e, r;
    for (u = n == players[i].campaign ? t ? (i + 1) % 2 : i : t ? i : (i + 1) % 2, f = 0, e = players[u].siegeCards[n], r = 0; r < e.length; r++) f += CalcNumMilitary(players[u].campaign, e.substr(r, 1));
    return f
}

function IsSiegeWon(n) {
    var i = players[UserIndex].campaign,
        t;
    if (!gameBoard.IsSiegeActive(n)) return !1;
    t = CalcSiegeMarkerPos(n);
    switch (n) {
        case 0:
            if (i === 0 && t >= 2 || i === 1 && t <= -1) return !0;
            break;
        case 1:
            if (i === 1 && t >= 2 || i === 0 && t <= -1) return !0
    }
    return !1
}

function IsHomeSiegeWon(n) {
    var i = players[(UserIndex + 1) % 2].campaign,
        t, r;
    if (!gameBoard.IsSiegeActive(n) || (t = Decode(gameBoard.sieges[n], 0), i === 0 && t !== 34)) return !1;
    if (i === 1)
        if (IsRandomRule(2)) {
            if (t !== 0 && t !== 2 && t !== 14 || players[(UserIndex + 1) % 2].tokens[0] === 0) return !1
        } else if (t !== 0 && t !== 2) return !1;
    r = CalcSiegeMarkerPos(n);
    switch (n) {
        case 0:
            if (i === 0 && r >= 2) return !0;
            break;
        case 1:
            if (i === 1 && r >= 2) return !0
    }
    return !1
}

function ShowSiegeData() {
    for (var i = IsHistory ? 2 : players[UserIndex].map, t = UserIndex >= 0 ? players[UserIndex].campaign : players[0].campaign, n = 0; n < 2; n++) this.IsSiegeActive(n) && (this.ShowSiegeMarker(n, i, t), this.ShowSiegeTitles(n, i, t), this.ShowSiegeCards(n, i, t), this.ShowWithdrawButton(n, i, t), n !== t || IsHistory || this.ShowWithdrawCheckBox(n, i, t), IsRandomRule(3) && !IsHistory && this.ShowVulnSiegeCheckBox(n, i, t))
}

function ShowWithdrawCheckBox(n, t, i) {
    var u, f, r;
    switch (t) {
        case 2:
            i === 0 ? (f = 324 - n * 62, u = 630 + n * 27, talign = "right") : (f = 778 + n * 62, u = 707 - n * 27, talign = "left")
    }
    CreateDiv("wdDiv", "absolute", 85, "hidden", f, u, 194, 20, "#D9C58A", "", "", "tokenContainer", talign);
    r = "<input id='cbxWithdraw' type='checkbox' name='withdrawCB' value='test' ";
    r += " style='position:absolute;left:0px;top:1px;z-index:20'/>";
    r += "<div id='wdText' style='position:absolute;left:20px;top:4px;width:172px;height:14px;overflow:hidden;";
    r += "font-size:11px;z-index:25;text-align:left'>";
    r += StrWithdrawCB;
    r += "<\/div>";
    $("#wdDiv").append(r);
    $("#cbxWithdraw").unbind().click(function() {
        SwitchDefenderWithdraw()
    });
    IsActive == "False" && $("#cbxWithdraw").attr("disabled", !0);
    GetWithdrawResponse(UserIndex) === 0 ? $("#cbxWithdraw").attr("checked", !0) : $("#cbxWithdraw").attr("checked", !1)
}

function SwitchDefenderWithdraw() {
    var n = document.getElementById("cbxWithdraw"),
        t = n.checked ? 0 : 1;
    SetWithdrawResponse(UserIndex, t)
}

function ShowVulnSiegeCheckBox(n, t, i) {
    var u, f, r;
    switch (t) {
        case 2:
            i === 0 ? (f = 335 - n * 142, u = 830 + n * 27, talign = "right") : (f = n === 0 ? 710 : 850, u = n === 0 ? 472 : 445, talign = "left")
    }
    CreateDiv("vulnSiegeDiv" + n, "absolute", 85, "hidden", f, u, 230, 20, "#D9C58A", "", "", "tokenContainer", talign);
    r = "<input id='cbxVulnSiege" + n + "' type='checkbox' name='vulnSiegeCB' value='test' ";
    r += " style='position:absolute;left:0px;top:1px;z-index:20'/>";
    r += "<div id='vulnSiegeText" + n + "' style='position:absolute;left:20px;top:4px;width:270px;height:14px;overflow:hidden;";
    r += "font-size:11px;z-index:25;text-align:left'>";
    r += StrPreferVulnSiege;
    r += "<\/div>";
    $("#vulnSiegeDiv" + n).append(r);
    $("#cbxVulnSiege" + n).unbind().click(function() {
        SwitchVulnSiegePrio(n)
    });
    IsActive == "False" && $("#cbxVulnSiege" + n).attr("disabled", !0);
    GetVulnSiegePrio(UserIndex, n) === 0 ? $("#cbxVulnSiege" + n).attr("checked", !1) : $("#cbxVulnSiege" + n).attr("checked", !0)
}

function SwitchVulnSiegePrio(n) {
    var t = document.getElementById("cbxVulnSiege" + n),
        i = t.checked ? 1 : 0;
    SetVulnSiegePrio(UserIndex, n, i)
}

function ShowWithdrawButton(n, t, i) {
    var r, u;
    switch (t) {
        case 2:
            i === 0 ? (u = 300 - n * 62, r = 735 + n * 27) : (u = 755 + n * 62, r = 706 - n * 27)
    }
    var f = n !== i,
        o = f ? StrSurrender : StrWithdraw,
        e = "<input id='withdrawBtn" + n + "' type='button' name='wdBtn" + n + "' value='" + o + "'";
    e += " style='position:absolute;left:" + r + "px;top:" + u + "px;width:90px;padding:0px;font-size:13px;z-index:520'/>";
    $("#tokenContainer").append(e);
    $("#withdrawBtn" + n).attr("disabled", !0).unbind().click(function() {
        ExecuteWithdrawAction(21, n, f)
    })
}

function ShowSiegeCards(n, t, i) {
    var r, u, e = ["", ""],
        f, o, s;
    switch (t) {
        case 2:
            i === 0 ? (u = 301 - n * 62, r = 630 + n * 27) : (u = 755 + n * 62, r = 799 - n * 27)
    }
    for (f = 0; f < players.length; f++) players[f].campaign === 0 ? e[0] = players[f].siegeCards[n] : e[1] = players[f].siegeCards[n];
    o = "<b>Br:<\/b> " + e[0].length;
    s = "<b>Fr:<\/b> " + e[1].length;
    CreateDiv("britsCards" + n, "absolute", 175, "hidden", u, r, 50, 22, "#D9C58A", "", o, "tokenContainer", "center");
    $("#britsCards" + n).css("fontSize", "13px");
    CreateImage("siegeDummyBr" + n, "absolute", 185, u, r, 50, 22, "", GameImagePath + "space.gif", "tokenContainer", "");
    $("#siegeDummyBr" + n).css("cursor", "pointer").click(function() {
        ShowMainInfo(6, !1, n, 0)
    });
    CreateDiv("frenchCards" + n, "absolute", 182, "hidden", u, r + 52, 50, 22, "#D9C58A", "", s, "tokenContainer", "center");
    $("#frenchCards" + n).css("fontSize", "13px");
    CreateImage("siegeDummyFr" + n, "absolute", 192, u, r + 52, 50, 22, "", GameImagePath + "space.gif", "tokenContainer", "");
    $("#siegeDummyFr" + n).css("cursor", "pointer").click(function() {
        ShowMainInfo(6, !1, n, 1)
    })
}

function ShowSiegeTitles(n, t, i) {
    var r, u, o = Decode(gameBoard.sieges[n], 0),
        f = "",
        e;
    switch (t) {
        case 2:
            i === 0 ? (u = 280 - n * 62, r = 630 + n * 27, f = "right") : (u = 734 + n * 62, r = 707 - n * 27, f = "left")
    }
    e = locationData[o][0];
    CreateDiv("siegeCity" + n, "absolute", 75, "hidden", u, r, 194, 20, "#D9C58A", "", e, "tokenContainer", f);
    $("#siegeCity" + n).css("fontSize", "12px").css("fontWeight", "bold")
}

function ShowSiegeMarker(n, t, i) {
    var u, e, r;
    switch (t) {
        case 2:
            i === 0 ? (u = 275 - n * 62, xValues = n === 0 ? [827, 880, 932, 985, 1038, 1091, 1143, 1195, 1247, 1299, 1352, 1405, 1457] : [1432, 1380, 1327, 1275, 1223, 1171, 1119, 1066, 1013, 961, 908, 855]) : (u = 730 + n * 62, xValues = n === 0 ? [648, 595, 542, 490, 438, 385, 332, 280, 229, 176, 123, 71, 19] : [44, 96, 148, 200, 252, 304, 357, 410, 463, 515, 567, 621])
    }
    var o = n === 0 ? -5 : -4,
        s = 7,
        f = CalcSiegeMarkerPos(n);
    if (!(f < o) && !(f > s))
        for (e = 0, r = o; r <= s; r++) {
            if (r === f) {
                CreateImage("siegeToken" + n, "absolute", 400 + n, u, xValues[e], -1, -1, "", GameImagePath + "siegeToken" + t + ".png?v=1", "tokenContainer", "");
                return
            }
            e++
        }
}

function CheckIfSiegeLost() {
    if (!siegeLostVisible)
        for (var i = players[UserIndex].campaign, t, n = 0; n < 2; n++)
            if (gameBoard.IsSiegeActive(n)) {
                t = CalcSiegeMarkerPos(n);
                switch (n) {
                    case 0:
                        CanLoseSiegeCard(n) && (i === 0 && t <= -1 && (siegesLost[0] = !0), i === 1 && t >= 2 && (siegesLost[0] = !0));
                        break;
                    case 1:
                        CanLoseSiegeCard(n) && (i === 1 && t <= -1 && (siegesLost[1] = !0), i === 0 && t >= 2 && (siegesLost[1] = !0))
                }
            }
}

function CanLoseSiegeCard(n) {
    for (var u = players[UserIndex].siegeCards[n], r = players[UserIndex].campaign, f = IsRandomRule(15), t, i = 0; i < u.length; i++)
        if ((t = u.substr(i, 1), !IsLocationCard(r, t) && (!IsNeutralCard(t) || IsFortificationCard(r, t))) || f && IsNativeCard(r, t)) return !0;
    return !1
}

function ShowSiegeCardSelection(n, t) {
    if (!siegeLostVisible) {
        siegeLostVisible = !0;
        siegesLost[n] = !1;
        $("#siegeLostDiv").html("");
        var i = "",
            e = players[UserIndex].siegeCards[n],
            f = players[UserIndex].campaign,
            l = f === 0 ? empDataEN : empDataFR,
            h = f === 0 ? "#EF9D77" : "#9DD7F2",
            a = Decode(gameBoard.sieges[n], 0),
            u, r, c = f === n ? !1 : !0,
            o = "",
            s = "";
        for (Lang === 0 ? (o = c ? "Du kapitulierst: " : "R&uuml;ckzug von Belagerung: ", s = t ? o : "Du verlierst eine Belagerung: ") : (o = c ? "surrender" : "withdraw from siege", s = t ? "You " + o + ": " : "You will lose a Siege: "), i += "<h3 align='center'>" + s + locationData[a][0] + "<\/h3>", i += t ? Lang === 0 ? "<p style='text-align:center'>Klicke eine Karte an, um sie zu entfernen.<\/p>" : "<p style='text-align:center'>Click one card, it will be removed.<\/p>" : Lang === 0 ? "<p style='text-align:center'>Klicke eine Karte an. Sie wird im n&auml;. Gegnerzug entfernt.<\/p>" : "<p style='text-align:center'>Click one card. It will be removed on your opponent&rsquo;s turn.<\/p>", i += "<div style='position:absolute;top:90px;left:10px;width:220px;height:300px;border:1px solid black;overflow:auto;background-color:silver'>", i += "<table border='1' cellpadding='4' style='width:100%'>", r = 0; r < e.length; r++)(u = e.substr(r, 1), IsLocationCard(f, u)) || (h = IsNeutralCard(u) ? "#9DCC4D" : f === 0 ? "#EF9D77" : "#9DD7F2", i += "<tr style='background-color:" + h + "'>", i += "<td id='slCard" + r + "'>", i += IsNeutralCard(u) ? empTitles[empDataN[GetNeutralIndex(u)][2]] : empTitles[l[GetEmpireIndex(f, u)][2]], i += "<\/td>", i += IsNeutralCard(u) ? "<td style='cursor:default;text-align:center' onmouseover='ShowSiegeLostCard(true,0," + f + ")' onmouseout='HideSiegeLostCard()'>" : "<td style='cursor:default;text-align:center' onmouseover='ShowSiegeLostCard(false," + Decode(e, r) + "," + f + ")' onmouseout='HideSiegeLostCard()'>", i += " <img id='slCardHelp" + r + "' src='" + BaseImagePath + "c/help.png'/>", i += "<\/td/>", i += "<\/tr>");
        for (i += "<\/table>", i += "<\/div>", i += " <img id='sLostCardView' style='position:absolute;left:250px;top:90px;width:170px;height:263px;", i += "border:1px solid black' src='" + GameImagePath + "cards/back.jpg'/>", $("#siegeLostDiv").append(i), r = 0; r < e.length; r++) u = e.substr(r, 1), $("#slCard" + r).css("cursor", "pointer").click(function(n, t, i) {
            return function() {
                LooseEmpireCard(n, t, i)
            }
        }(n, u, t));
        $("#siegeLostDiv").animate({
            top: "-=480"
        }, 300, function() {})
    }
}

function ShowSiegeLostCard(n, t, i) {
    if (n) $("#sLostCardView").attr("src", GameImagePath + "cards/cardNeutralA.jpg");
    else {
        var r = i === 0 ? "British" : "French";
        $("#sLostCardView").attr("src", GameImagePath + "cards/card" + r + t + ".jpg?v=2")
    }
}

function HideSiegeLostCard() {
    $("#sLostCardView").attr("src", GameImagePath + "cards/back.jpg")
}

function LooseEmpireCard(n, t, i) {
    siegeLostVisible && (siegeLostVisible = !1, SetLostSiegeCard(UserIndex, n, t), $("#siegeLostDiv").animate({
        top: "+=480"
    }, 300, function() {
        var e;
        if (i) {
            var r = Decode(gameBoard.sieges[n], 0),
                u = locationData[r][4],
                f = GetLostSiegeCard(UserIndex, n),
                t = n !== players[UserIndex].campaign;
            if (AddMovesDoneAction(Encode(21) + n + gameBoard.sieges[n].substr(0, 1) + f), FinishWithdraw(21, n, t), IsNeutralCard(f) ? gameBoard.SetNeutralCards() : players[UserIndex].empPile = players[UserIndex].CalcEmpPile(), wonByHomeSurrender && SetGamePhase(4), t && !u && (HandleAntiCheat(), !isGameValid)) {
                DisableActions();
                ShowUI();
                ShowInfoMessage(3, "<span style='color:red'><b>Re-open game window!<\/b><\/span>");
                return
            }
            if (wonByHomeSurrender) {
                SetGamePhase(0);
                return
            }
            if (t && u) {
                e = Lang === 0 ? "Dein Gegner muss entscheiden, ob er eine Karte mit Siedler-Symbol spielt, um den Ort zu besiedeln.\n\nBeende den Zug." : "Your opponent may decide whether or not to play a card with a settler symbol in order to settle the location.\n\nFinish your turn!";
                try {
                    alert(e)
                } catch (o) {}
                DisableActions();
                ShowUI();
                SetGamePhase(6);
                SetAntiCheatFlag(r);
                ShowInfoMessage(3, StrFinishTurn);
                SetResetButton(!0);
                SetFinishButton(!0);
                return
            }
            FinishAction(21)
        } else siegesLost[1] ? ShowSiegeCardSelection(1, !1) : SetFinishButton(!0)
    }))
}

function EnableSiegeResolving() {
    for (var t, n = 0; n < 2; n++)
        if (IsSiegeWon(n)) {
            ShowSiegeCheckInfo(n);
            t = Decode(gameBoard.sieges[n], 0);
            ShowLocRing(t, 0, !1);
            return
        }
}

function ShowSiegeCheckInfo(n) {
    var e, r;
    if (!siegeCheckVisible) {
        siegeCheckVisible = !0;
        $("#siegeCheckDiv").html("");
        var t = "",
            i = players[UserIndex].campaign,
            f = Decode(gameBoard.sieges[n], 0),
            s = i === 0 ? locDataEN : locDataFR,
            h = players[UserIndex].tokens[0] > 0,
            o = !1,
            c = locationData[f][4],
            u = "";
        if (h && i === n)
            if (c) {
                for (e = players[UserIndex].hand, r = 0; r < e.length; r++)
                    if (cardID = e.substr(r, 1), HasSymbol(i, 4, cardID)) {
                        if (IsLocationCard(i, cardID) && (cardIndex = Decode(e, r), locIndex = s[cardIndex][0][2], !IsLocCardValid(i, locIndex))) continue;
                        o = !0;
                        $("#handCard" + r).click(function(n, t, i) {
                            return function() {
                                PlaySiegeSettleCard(n, t, i)
                            }
                        }(r, n, cardID)).css("cursor", "pointer")
                    } u = o ? "Click one hand card that shows a settler symbol to settle the location. Click the button if you don&rsquo;t want to settle." : "You do not have a settler card. Click the button the button below to resolve the siege."
            } else u = "Click the location to place a cube (settle) or click the button if you don&rsquo;t want to settle!", $("#locMarker" + f).css("cursor", "pointer").click(function() {
                FinishSiege(n, !0)
            });
        else i !== n ? (u = StrWonDef, $("#locMarker" + f).css("cursor", "pointer").click(function() {
            HideSiegeInfo();
            FinishSiege(n, !1)
        })) : u = "No free cubes available. You may not settle!";
        t += "<h2 align='center'>" + StrSiegeWon + ": <i>" + locationData[f][0] + "<\/i><\/h2>";
        t += "<p style='text-align:center'>" + u + "<\/p>";
        i === n ? (t += "<input id='noSettle' type='button' name='nsb' value='Do not settle'", t += " style='position:absolute;left:250px;top:120px;width:150px;padding:1px;font-size:13px;z-index:20'/>", t += "<input id='hideSettle' type='button' name='hs' value='" + StrHide + "'", t += " style='position:absolute;left:60px;top:120px;width:150px;padding:1px;font-size:13px;z-index:20'/>") : (t += "<input id='hideSettle' type='button' name='hs' value='" + StrHide + "'", t += " style='position:absolute;left:160px;top:120px;width:150px;padding:1px;font-size:13px;z-index:20'/>");
        $("#siegeCheckDiv").append(t);
        $("#hideSettle").click(function() {
            HideSiegeInfo()
        });
        $("#noSettle").click(function() {
            HideSiegeInfo();
            FinishSiege(n, !1)
        });
        $("#siegeCheckDiv").css({
            top: "-=210"
        })
    }
}

function HideSiegeInfo() {
    siegeCheckVisible && (siegeCheckVisible = !1, $("#siegeCheckDiv").animate({
        top: "+=210"
    }, 300, function() {
        SetResetButton(!0)
    }))
}

function PlaySiegeSettleCard(n, t, i) {
    players[UserIndex].RemoveHandCard(i);
    players[UserIndex].discardPile += i;
    HideSiegeInfo();
    FinishSiege(t, !0)
}

function FinishWithdraw(n, t, i) {
    for (var r = (UserIndex + 1) % 2, u = Decode(gameBoard.sieges[t], 0), v = locationData[u][4], h = !1, y = GetLostSiegeCard(UserIndex, t), l = players[UserIndex].siegeCards[t], c, f, a, o, s, e = 0; e < l.length; e++) c = l.substr(e, 1), c !== y && (players[UserIndex].discardPile += c);
    if (SetLostSiegeCard(UserIndex, t, "-"), players[UserIndex].siegeCards[t] = "", players[r].discardPile += players[r].siegeCards[t], players[r].siegeCards[t] = "", gameBoard.sieges[t] = "", i && !(GetStatusStringVersion() < 3))
        if (f = gameBoard.GetLocation(u), f === 2 || f === 4 || f === 6 || f === 8 ? players[r].oppTokens[1]++ : players[r].oppTokens[0]++, players[r].tokens[0] < 1 || GetWithdrawResponse(r) !== 0 || v ? (gameBoard.SetLocation(u, 0), h = !1) : (gameBoard.SetLocation(u, 1 + players[r].campaign * 4), h = !0, players[r].tokens[0]--, players[r].TakeLocCard(u)), SetWithdrawResponse(r, 0), IsRandomRule(3) && (SetVulnSiegePrio(UserIndex, t, 0), SetVulnSiegePrio(r, t, 0)), a = players[UserIndex].campaign, a === 0) {
            if (u === 0 || u === 2 || IsRandomRule(2) && u === 14 && h) {
                wonByHomeSurrender = !0;
                DisableActions();
                players[UserIndex].ClearActiveCards();
                ShowUI();
                o = Lang === 0 ? "Heimatort verloren!" : "You lost a home location!";
                s = "<span style='color:red'><b>" + o + "<\/b><\/span>";
                ShowInfoMessage(2, s);
                ShowInfoMessage(3, StrFinishTurn);
                SetResetButton(!0);
                SetFinishButton(!0);
                return
            }
        } else if (u === 34) {
        wonByHomeSurrender = !0;
        DisableActions();
        players[UserIndex].ClearActiveCards();
        ShowUI();
        o = Lang === 0 ? "Heimatort verloren!" : "You lost a home location!";
        s = "<span style='color:red'><b>" + o + "<\/b><\/span>";
        ShowInfoMessage(2, s);
        ShowInfoMessage(3, StrFinishTurn);
        SetResetButton(!0);
        SetFinishButton(!0);
        return
    }
}

function FinishSiege(n, t) {
    var u = Encode(30) + n,
        e = Decode(gameBoard.sieges[n], 0),
        i = (UserIndex + 1) % 2,
        l = players[i].campaign,
        r, a, s, o, h, c, f, v;
    if (players[UserIndex].discardPile += players[UserIndex].siegeCards[n], players[UserIndex].siegeCards[n] = "", r = GetLostSiegeCard(i, n), SetLostSiegeCard(i, n, "-"), r !== -1) {
        u += "L" + r;
        a = l === 0 ? empDataEN : empDataFR;
        s = "";
        s = IsNeutralCard(r) ? empTitles[empDataN[GetNeutralIndex(r)][2]] + " (N)" : empTitles[a[GetEmpireIndex(l, r)][2]];
        try {
            alert(StrOppLostCardInfo + "\n\n" + s)
        } catch (y) {}
    } else u += "XX";
    for (c = players[i].siegeCards[n], o = 0; o < c.length; o++) h = c.substr(o, 1), h !== r && (players[i].discardPile += h);
    if (players[i].siegeCards[n] = "", gameBoard.sieges[n] = "", IsRandomRule(3) && (SetVulnSiegePrio(UserIndex, n, 0), SetVulnSiegePrio(i, n, 0)), IsNeutralCard(r) ? gameBoard.SetNeutralCards() : players[i].empPile = players[i].CalcEmpPile(), players[UserIndex].campaign === n && (f = gameBoard.GetLocation(e), f === 2 || f === 4 || f === 6 || f === 8 ? (players[UserIndex].oppTokens[1]++, u += "C") : (players[UserIndex].oppTokens[0]++, u += "D"), t ? (gameBoard.SetLocation(e, 1 + players[UserIndex].campaign * 4), players[UserIndex].tokens[0]--, players[UserIndex].TakeLocCard(e), u += "B") : (gameBoard.SetLocation(e, 0), u += "N")), AddMovesDoneAction(u), ShowUI(), players[UserIndex].campaign === 1 && IsRandomRule(5) && (HideActionRings(), v = window.confirm(StrConfirmDiscard), v)) {
        EnablePostSiegeDiscard();
        return
    }
    SetupActionInterface()
}

function EnableMapAction(n) {
    ClearRaidHovers();
    var r = players[UserIndex].campaign,
        a = (r + 1) % 2,
        s = r === 0 ? locDataEN : locDataFR,
        v = r === 0 ? empDataEN : empDataFR,
        u = players[UserIndex].activeCards,
        f = -1,
        t = -1,
        i, e;
    switch (n) {
        case 0:
            f = Decode(u, 0);
            var h = s[f][1],
                o = "",
                c = -1,
                l = -1;
            for (i = 0; i < h.length; i++)
                for (o = h[i], c = o[0], e = 1; e < o.length; e++)(t = o[e], l = gameBoard.GetLocOwner(t), l !== a && (l !== r || players[UserIndex].HasLocCard(GetCardIDByLoc(r, t)))) && HasSymbol(r, c, u.substr(1, 1)) && (locationData[t][4] ? u.length === 3 && HasSymbol(r, 4, u.substr(2, 1)) && (ShowLocRing(t, 0, !1), $("#locMarker" + t).css("cursor", "pointer").click(function(n, t) {
                    return function() {
                        SettleLocation(n, t)
                    }
                }(n, t))) : u.length === 2 && (ShowLocRing(t, 0, !1), $("#locMarker" + t).css("cursor", "pointer").click(function(n, t) {
                    return function() {
                        SettleLocation(n, t)
                    }
                }(n, t))));
            break;
        case 1:
            f = Decode(u, 0);
            t = s[f][0][2];
            ShowLocRing(t, 0, !1);
            $("#locMarker" + t).css("cursor", "pointer").click(function() {
                DevelopLocation(n, t)
            });
            break;
        case 2:
            f = IsLocationCard(r, u.substr(0, 1)) ? Decode(u, 0) : Decode(u, 1);
            t = s[f][0][2];
            ShowLocRing(t, 0, !1);
            $("#locMarker" + t).css("cursor", "pointer").click(function() {
                FortifyLocation(n, t)
            });
            break;
        case 3:
            f = Decode(u, 0);
            var h = s[f][1],
                o = "",
                c = -1,
                a = (r + 1) % 2;
            for (i = 0; i < h.length; i++)
                for (o = h[i], c = o[0], e = 1; e < o.length; e++)(t = o[e], gameBoard.GetLocOwner(t) === a) && HasSymbol(r, c, u.substr(1, 1)) && (HasSymbol(r, 6, u.substr(2, 1)) || IsRandomRule(15) && IsNativeCard(r, u.substr(2, 1)) || locationData[t][2] > 0 && HasSymbol(r, 2, u.substr(2, 1))) && (ShowLocRing(t, 0, !1), $("#locMarker" + t).css("cursor", "pointer").click(function(n, t) {
                    return function() {
                        BesiegeLocation(n, t)
                    }
                }(n, t)));
            break;
        case 4:
            for (i = 0; i < gameBoard.sieges.length; i++)
                if (gameBoard.sieges[i].length === 1) {
                    if (IsFortificationCard(r, u.substr(0, 1)) && i === r) continue;
                    if (t = Decode(gameBoard.sieges[i], 0), gameBoard.GetLocOwner(t) === r && (validTarget = -1, validChecks = [], validChecks.push(t), CheckValidConns(r, t), !IsHomeLoc(r, validTarget))) continue;
                    (HasSymbol(r, 6, u.substr(0, 1)) || IsRandomRule(15) && IsNativeCard(r, u.substr(0, 1)) || locationData[t][2] > 0 && HasSymbol(r, 2, u.substr(0, 1))) && (ShowLocRing(t, 0, !1), $("#locMarker" + t).css("cursor", "pointer").click(function(n, t, i) {
                        return function() {
                            ReinforceSiege(n, t, i)
                        }
                    }(n, t, i)))
                } break;
        case 5:
            for (i = 0; i < raidTargets.length; i++) ShowLocRing(raidTargets[i], 0, !1), $("#locMarker" + raidTargets[i]).css("cursor", "pointer").click(function(n, t) {
                return function() {
                    ExecuteRaid(n, t)
                }
            }(n, raidTargets[i]));
            break;
        case 6:
            ShowAmbushInfo(n);
            break;
        case 7:
            for (i = 0; i < gameBoard.sieges.length; i++) gameBoard.sieges[i].length === 1 && (t = Decode(gameBoard.sieges[i], 0), ShowLocRing(t, 0, !1), $("#locMarker" + t).css("cursor", "pointer").click(function(n, t, i) {
                return function() {
                    ReinforceSiege(n, t, i)
                }
            }(n, t, i)));
            break;
        case 8:
            ShowPriestInfo(n);
            break;
        default:
            alert("Unknown MapActionIndex: " + n);
            return
    }
}

function DisableMapActions() {
    HideHovers();
    HideActionRings();
    $("#ambushPriestInfo").css("visibility", "hidden").unbind();
    $("#oppPoints").css("display", "");
    $("#oppSinglePoints").css("display", "");
    $("#oppPointsDummy").css("display", "");
    $("#oppCollCubesPic").css("display", "");
    $("#oppCollCubes").css("display", "");
    $("#oppCollDiscsPic").css("display", "");
    $("#oppCollDiscs").css("display", "");
    raidChecks = [];
    raidTargets = [];
    ShowInfoMessage(2, "");
    for (var n = 0; n < locationData.length; n++) $("#locMarker" + n).unbind().css("cursor", "default"), $("#locMarker" + n).mouseover(function(n) {
        return function() {
            ShowConnections(n)
        }
    }(n)).mouseout(function() {
        HideHovers()
    })
}

function HideActionRings() {
    $("#actionRingContainer").html("")
}

function ClearRaidHovers() {
    HideHovers();
    for (var n = 0; n < locationData.length; n++) $("#locMarker" + n).unbind("mouseover").unbind("mouseout")
}

function SettleLocation(n, t) {
    var i, r;
    if (AddMovesDoneAction(Encode(n) + Encode(t) + players[UserIndex].activeCards), gameBoard.GetLocOwner(t) === -1 && (gameBoard.SetLocation(t, 1 + players[UserIndex].campaign * 4), players[UserIndex].tokens[0]--), players[UserIndex].RemoveHandCards(players[UserIndex].activeCards), players[UserIndex].discardPile += players[UserIndex].activeCards, players[UserIndex].TakeLocCard(t), HasSettledOppHome(t)) {
        oppHomeSettled = !0;
        i = "";
        switch (t) {
            case 0:
                i = StrBostonSettled;
                break;
            case 2:
                i = StrNewYorkSettled;
                break;
            case 14:
                i = StrDuquesneSettled;
                break;
            case 34:
                i = StrQuebecSettled
        }
        DisableActions();
        players[UserIndex].ClearActiveCards();
        ShowUI();
        r = "<span style='color:#005F0E'><b>" + i + "<\/b><\/span>";
        ShowInfoMessage(2, r);
        ShowInfoMessage(3, StrFinishTurn);
        SetResetButton(!0);
        SetFinishButton(!0);
        return
    }
    FinishAction(n)
}

function HasSettledOppHome(n) {
    switch (players[UserIndex].campaign) {
        case 0:
            return n === 34;
        case 1:
            return n === 0 || n === 2 || IsRandomRule(2) && n === 14
    }
    return !1
}

function DevelopLocation(n, t) {
    AddMovesDoneAction(Encode(n) + Encode(t) + players[UserIndex].activeCards);
    var i = gameBoard.GetLocation(t);
    gameBoard.SetLocation(t, i + 1);
    players[UserIndex].tokens[0]++;
    players[UserIndex].tokens[1]--;
    players[UserIndex].RemoveHandCards(players[UserIndex].activeCards);
    players[UserIndex].discardPile += players[UserIndex].activeCards;
    FinishAction(n)
}

function FortifyLocation(n, t) {
    AddMovesDoneAction(Encode(n) + Encode(t) + players[UserIndex].activeCards);
    var i = gameBoard.GetLocation(t);
    gameBoard.SetLocation(t, i + 2);
    gameBoard.numStockForts--;
    players[UserIndex].money -= 3;
    players[UserIndex].RemoveHandCards(players[UserIndex].activeCards);
    players[UserIndex].discardPile += players[UserIndex].activeCards;
    FinishAction(n)
}

function BesiegeLocation(n, t) {
    IsRandomRule(16) && players[UserIndex].campaign === 1 && (IsFirstFrenchSiege() || SetFirstFrenchSiege());
    AddMovesDoneAction(Encode(n) + Encode(t) + players[UserIndex].activeCards);
    var i = players[UserIndex].campaign;
    gameBoard.sieges[i] = Encode(t);
    players[UserIndex].campaign === 0 && Decode(players[UserIndex].activeCards, 2) === 44 && (players[UserIndex].money -= 3);
    players[UserIndex].campaign === 1 && Decode(players[UserIndex].activeCards, 2) === 45 && (players[UserIndex].money -= 3);
    players[UserIndex].siegeCards[i] += players[UserIndex].activeCards.substr(2, 1);
    players[UserIndex].RemoveHandCards(players[UserIndex].activeCards);
    players[UserIndex].discardPile += players[UserIndex].activeCards.substr(0, 2);
    FinishAction(n)
}

function ReinforceSiege(n, t, i) {
    AddMovesDoneAction(Encode(n) + Encode(t) + players[UserIndex].activeCards);
    players[UserIndex].siegeCards[i] += players[UserIndex].activeCards;
    players[UserIndex].RemoveHandCards(players[UserIndex].activeCards);
    players[UserIndex].campaign === 0 && Decode(players[UserIndex].activeCards, 0) === 44 && (players[UserIndex].money -= 3);
    players[UserIndex].campaign === 1 && Decode(players[UserIndex].activeCards, 0) === 45 && (players[UserIndex].money -= 3);
    FinishAction(n)
}

function ExecuteRaid(n, t) {
    players[UserIndex].autoRaid.length !== 0 && HandleRaidBlock(n, t)
}

function HandleRaidBlock(n, t) {
    var r = (UserIndex + 1) % 2,
        i = players[r].autoRaid,
        u, f;
    if (i.length > 0) {
        u = Decode(i, 0);
        f = i.substr(1, 3);
        switch (u) {
            case 0:
                HasRaidBlocker(r, t) ? PerformRaidBlock(n, f, t) : RaidLocation(n, t);
                break;
            case 1:
                RaidLocation(n, t)
        }
    }
}

function HasRaidBlocker(n, t) {
    for (var e = players[n].campaign === 0 ? locDataEN : locDataFR, f = players[n].hand, r = players[n].campaign, o = r === 0 ? empDataEN : empDataFR, i, u = 0; u < f.length; u++)
        if (i = f.substr(u, 1), IsLocationCard(r, i)) {
            if (e[Decode(f, u)][0][2] === t && (validTarget = -1, validChecks = [], validChecks.push(t), CheckValidConns(r, t), IsHomeLoc(r, validTarget))) return !0
        } else if (!IsNeutralCard(i) && o[GetEmpireIndex(r, i)][8] || IsNeutralCard(i) && empDataN[GetNeutralIndex(i)][8]) return !0;
    return !1
}

function PerformRaidBlock(n, t, i) {
    var f = (UserIndex + 1) % 2,
        e = CalcRaidBlocker(f, t, i),
        o = IsRandomRule(9) ? 36 : n,
        r, u;
    for (AddMovesDoneAction(Encode(o) + Encode(i) + players[UserIndex].activeCards + "R" + e), players[UserIndex].RemoveHandCards(players[UserIndex].activeCards), players[UserIndex].discardPile += players[UserIndex].activeCards, u = players[UserIndex].activeCards, r = 0; r < u.length; r++) IsNativeCard(players[UserIndex].campaign, u.substr(r, 1)) && players[UserIndex].money--;
    if (HandleAntiCheat(), !isGameValid) {
        DisableActions();
        ShowUI();
        ShowInfoMessage(3, "<span style='color:red'><b>Re-open game window!<\/b><\/span>");
        return
    }
    ShowRaidBlocker(f, n, e, i);
    FinishAction(n)
}

function CalcRaidBlocker(n, t, i) {
    var v = players[n].campaign === 0 ? locDataEN : locDataFR,
        h = players[n].hand,
        c = players[n].campaign,
        f = t,
        e = c === 0 ? blockCardsR_EN : blockCardsR_FR,
        u, a, s, r, o, l;
    for (e[1] = [], e[1].push(i), r = 0; r < e.length; r++) r !== Decode(f, 0) && r !== Decode(f, 1) && r !== Decode(f, 2) && (f += Encode(r));
    for (l = 0; l < f.length; l++)
        for (s = Decode(f, l), r = 0; r < e[s].length; r++)
            for (o = 0; o < h.length; o++)
                if (u = h.substr(o, 1), a = IsNeutralCard(u) ? u : Decode(h, o), s !== 1) {
                    if (a === e[s][r]) return players[n].RemoveHandCard(u), players[n].discardPile += u, u
                } else if (IsLocationCard(c, u) && v[Decode(h, o)][0][2] === e[s][r] && (validTarget = -1, validChecks = [], validChecks.push(i), CheckValidConns(c, i), IsHomeLoc(c, validTarget))) return players[n].RemoveHandCard(u), players[n].discardPile += u, u;
    return "X"
}

function ShowRaidBlocker(n, t, i) {
    var e, u, f, r;
    $("#oppResponseDiv").html("");
    oppResponseShown = !0;
    e = players[n].campaign;
    IsNeutralCard(i) ? (u = "Neutral", f = i) : (u = e === 0 ? "British" : "French", f = Decode(i, 0));
    r = "<h2 align='center'>" + StrRaidBlocked + "<\/h2>";
    r += "<p style='text-align:center'>" + StrRaidBlockInfo + "<\/p>";
    r += " <img id='oppCardView' style='position:absolute;left:146px;top:90px;width:170px;height:263px;";
    r += "border:1px solid black' src='" + GameImagePath + "cards/card" + u + f + ".jpg?v=2'/>";
    r += "<input id='closeAmbResp' type='button' name='closeAR' value='" + StrClose + "'";
    r += " style='position:absolute;left:164px;top:370px;width:140px;padding:2px;font-size:14px'/>";
    r += "<input id='closeAmbResp2' type='button' name='closeAR2' value='X'";
    r += " style='position:absolute;left:5px;top:5px;width:30px;font-size:12px'/>";
    $("#oppResponseDiv").append(r);
    $("#closeAmbResp").click(function() {
        CloseOppResponse()
    });
    $("#closeAmbResp2").click(function() {
        CloseOppResponse()
    });
    $("#oppResponseDiv").animate({
        top: "+=440"
    }, 300, function() {})
}

function RaidLocation(n, t) {
    AddMovesDoneAction(Encode(n) + Encode(t) + players[UserIndex].activeCards);
    players[UserIndex].RemoveHandCards(players[UserIndex].activeCards);
    players[UserIndex].discardPile += players[UserIndex].activeCards;
    for (var r = players[UserIndex].activeCards, i = 0; i < r.length; i++) IsNativeCard(players[UserIndex].campaign, r.substr(i, 1)) && players[UserIndex].money--;
    if (FinishRaid(n, t), HandleAntiCheat(), !isGameValid) {
        DisableActions();
        ShowInfoMessage(3, "<span style='color:red'><b>Re-open game window!<\/b><\/span>");
        return
    }
    FinishAction(n)
}

function FinishRaid(n, t) {
    var i = gameBoard.GetLocation(t);
    i === 2 || i === 4 || i === 6 || i === 8 ? (players[(UserIndex + 1) % 2].tokens[0] > 0 ? (players[(UserIndex + 1) % 2].tokens[0]--, gameBoard.SetLocation(t, i - 1)) : gameBoard.SetLocation(t, 0), players[UserIndex].oppTokens[1]++) : (gameBoard.SetLocation(t, 0), players[UserIndex].oppTokens[0]++)
}

function ShowAmbushInfo(n) {
    $("#oppPoints").css("display", "none");
    $("#oppSinglePoints").css("display", "none");
    $("#oppPointsDummy").css("display", "none");
    $("#oppCollCubesPic").css("display", "none");
    $("#oppCollCubes").css("display", "none");
    $("#oppCollDiscsPic").css("display", "none");
    $("#oppCollDiscs").css("display", "none");
    $("#ambushPriestInfo").attr("src", GameImagePath + "ambushEN0.jpg");
    $("#ambushPriestInfo").css("visibility", "visible").css("cursor", "pointer");
    $("#ambushPriestInfo").click(function() {
        ExecuteAmbush(n)
    })
}

function HideAmbushInfo() {
    $("#oppPoints").css("display", "");
    $("#oppSinglePoints").css("display", "");
    $("#oppPointsDummy").css("display", "");
    $("#oppCollCubesPic").css("display", "");
    $("#oppCollCubes").css("display", "");
    $("#oppCollDiscsPic").css("display", "");
    $("#oppCollDiscs").css("display", "");
    $("#ambushPriestInfo").attr("src", GameImagePath + "space.gif");
    $("#ambushPriestInfo").css("visibility", "hidden").css("cursor", "default");
    $("#ambushPriestInfo").unbind()
}

function ExecuteAmbush(n) {
    HideAmbushInfo();
    HandleAmbushResponse(n)
}

function HandleAmbushResponse(n) {
    var t = Encode(1) + Encode(0) + Encode(0) + Encode(0) + Encode(0);
    players[(UserIndex + 1) % 2].autoAmbush = t;
    HandleAmbushAutoResponse(n)
}

function HandleAmbushAutoResponse(n) {
    var t = (UserIndex + 1) % 2,
        i = players[t].autoAmbush,
        r = Decode(i, 0),
        u = Decode(i, 1),
        f = Decode(i, 2),
        e = Decode(i, 3);
    if (HasAmbushTarget(t)) switch (r) {
        case 2:
            PerformAmbushTarget(t, n, f, e);
            break;
        default:
            HasAmbushBlocker(t) ? PerformAmbushBlock(t, n, u) : PerformAmbushTarget(t, n, f, e)
    } else switch (r) {
        case 0:
            HasAmbushBlocker(t) ? PerformAmbushBlock(t, n, u) : PerformAmbushHand(t, n);
            break;
        default:
            PerformAmbushHand(t, n)
    }
}

function PerformAmbushBlock(n, t, i) {
    var r = CalcAmbushBlocker(n, i),
        u = IsRandomRule(8) ? 35 : t;
    if (AddMovesDoneAction(Encode(u) + players[UserIndex].activeCards + "B" + r), players[UserIndex].RemoveHandCards(players[UserIndex].activeCards), players[UserIndex].discardPile += players[UserIndex].activeCards, IsNativeCard(players[UserIndex].campaign, players[UserIndex].activeCards.substr(0, 1)) && players[UserIndex].money--, HandleAntiCheat(), !isGameValid) {
        DisableActions();
        ShowUI();
        ShowInfoMessage(3, "<span style='color:red'><b>Re-open game window!<\/b><\/span>");
        return
    }
    ShowAmbushBlocker(n, t, r);
    FinishAction(t)
}

function PerformAmbushTarget(n, t, i, r) {
    var u = CalcAmbushTarget(n, i, r);
    if (AddMovesDoneAction(Encode(t) + players[UserIndex].activeCards + "T" + Encode(u[0]) + Encode(u[1])), players[UserIndex].RemoveHandCards(players[UserIndex].activeCards), players[UserIndex].discardPile += players[UserIndex].activeCards, IsNativeCard(players[UserIndex].campaign, players[UserIndex].activeCards.substr(0, 1)) && players[UserIndex].money--, HandleAntiCheat(), !isGameValid) {
        DisableActions();
        ShowUI();
        ShowInfoMessage(3, "<span style='color:red'><b>Re-open game window!<\/b><\/span>");
        return
    }
    ShowAmbushTarget(n, t, u[0], u[1]);
    FinishAction(t)
}

function PerformAmbushHand(n, t) {
    if (AddMovesDoneAction(Encode(t) + players[UserIndex].activeCards + "C"), players[UserIndex].RemoveHandCards(players[UserIndex].activeCards), players[UserIndex].discardPile += players[UserIndex].activeCards, IsNativeCard(players[UserIndex].campaign, players[UserIndex].activeCards.substr(0, 1)) && players[UserIndex].money--, HandleAntiCheat(), !isGameValid) {
        DisableActions();
        ShowUI();
        ShowInfoMessage(3, "<span style='color:red'><b>Re-open game window!<\/b><\/span>");
        return
    }
    ShowOppHand(n, t);
    FinishAction(t)
}

function HasAmbushBlocker(n) {
    for (var u = players[n].hand, r = players[n].campaign, f = r === 0 ? empDataEN : empDataFR, t, i = 0; i < u.length; i++)
        if ((t = u.substr(i, 1), IsEmpireCard(r, t)) && (!IsNeutralCard(t) && f[GetEmpireIndex(r, t)][9] || IsNeutralCard(t) && empDataN[GetNeutralIndex(t)][9])) return !0;
    return !1
}

function HasAmbushTarget(n) {
    for (var f = players[n].campaign, e = f === 0 ? empDataEN : empDataFR, t, u, r, i = 0; i < 2; i++)
        for (u = i === 0 ? players[n].hand : players[n].reserve, r = 0; r < u.length; r++)
            if ((t = u.substr(r, 1), IsEmpireCard(f, t)) && (!IsNeutralCard(t) && e[GetEmpireIndex(f, t)][4] || IsNeutralCard(t) && empDataN[GetNeutralIndex(t)][4])) return !0;
    if (IsRandomRule(3))
        for (i = 0; i < players[n].siegeCards.length; i++)
            for (u = players[n].siegeCards[i], r = 0; r < u.length; r++)
                if ((t = u.substr(r, 1), IsEmpireCard(f, t)) && (!IsNeutralCard(t) && e[GetEmpireIndex(f, t)][4] || IsNeutralCard(t) && empDataN[GetNeutralIndex(t)][4])) return !0;
    return !1
}

function CalcAmbushBlocker(n, t) {
    for (var e = players[n].hand, h = players[n].campaign, o = h === 0 ? blockCardsA_EN[t] : blockCardsA_FR[t], i, s, f, u, r = 0; r < o.length; r++)
        for (f = 0; f < o[r].length; f++)
            for (u = 0; u < e.length; u++)
                if (i = e.substr(u, 1), s = IsNeutralCard(i) ? i : Decode(e, u), s === o[r][f]) return players[n].RemoveHandCard(i), players[n].discardPile += i, i;
    return "X"
}

function CalcAmbushTarget(n, t, i) {
    var s = [],
        a = players[n].hand,
        v = players[n].reserve,
        k = players[n].campaign,
        y = i === 0 ? [v, a] : [a, v],
        c = k === 0 ? targetCardsA_EN[t] : targetCardsA_FR[t],
        e, h, l, p = !1,
        r, u, o, f, w = GetVulnSiegePrio(n, 0),
        b = GetVulnSiegePrio(n, 1),
        d = [w, b];
    if (IsRandomRule(3) && (w === 1 || b === 1)) {
        for (u = 0; u < c.length; u++)
            for (o = 0; o < c[u].length; o++)
                for (r = 0; r < players[n].siegeCards.length; r++)
                    if (d[r] === 1)
                        for (e = players[n].siegeCards[r], f = 0; f < e.length; f++)
                            if (h = e.substr(f, 1), l = Decode(e, f), l === c[u][o]) return s.push(l), players[n].RemoveSiegeCard(r, h), s.push(2 + r), players[n].empPile += h, s;
        p = !0
    }
    for (u = 0; u < c.length; u++)
        for (o = 0; o < c[u].length; o++)
            for (r = 0; r < y.length; r++)
                for (e = y[r], f = 0; f < e.length; f++)
                    if (h = e.substr(f, 1), l = Decode(e, f), l === c[u][o]) return s.push(l), i === 0 && r === 0 || i === 1 && r === 1 ? (players[n].RemoveReserveCard(h), s.push(0)) : (players[n].RemoveHandCard(h), s.push(1)), players[n].empPile += h, s;
    if (IsRandomRule(3) && !p)
        for (u = 0; u < c.length; u++)
            for (o = 0; o < c[u].length; o++)
                for (r = 0; r < players[n].siegeCards.length; r++)
                    for (e = players[n].siegeCards[r], f = 0; f < e.length; f++)
                        if (h = e.substr(f, 1), l = Decode(e, f), l === c[u][o]) return s.push(l), players[n].RemoveSiegeCard(r, h), s.push(2 + r), players[n].empPile += h, s;
    return [-1, -1]
}

function ShowAmbushBlocker(n, t, i) {
    var e, u, f, r;
    $("#oppResponseDiv").html("");
    oppResponseShown = !0;
    e = players[n].campaign;
    IsNeutralCard(i) ? (u = "Neutral", f = i) : (u = e === 0 ? "British" : "French", f = Decode(i, 0));
    r = "<h2 align='center'>" + StrAmbushBlocked + "<\/h2>";
    r += "<p style='text-align:center'>" + StrAmbushBlockInfo + "<\/p>";
    r += " <img id='oppCardView' style='position:absolute;left:146px;top:90px;width:170px;height:263px;";
    r += "border:1px solid black' src='" + GameImagePath + "cards/card" + u + f + ".jpg?v=2'/>";
    r += "<input id='closeAmbResp' type='button' name='closeAR' value='" + StrClose + "'";
    r += " style='position:absolute;left:164px;top:370px;width:140px;padding:2px;font-size:14px'/>";
    r += "<input id='closeAmbResp2' type='button' name='closeAR2' value='X'";
    r += " style='position:absolute;left:5px;top:5px;width:30px;font-size:12px'/>";
    $("#oppResponseDiv").append(r);
    $("#closeAmbResp").click(function() {
        CloseOppResponse()
    });
    $("#closeAmbResp2").click(function() {
        CloseOppResponse()
    });
    $("#oppResponseDiv").animate({
        top: "+=440"
    }, 300, function() {})
}

function ShowAmbushTarget(n, t, i, r) {
    var u, e;
    if (i !== -1 && r !== -1) {
        $("#oppResponseDiv").html("");
        oppResponseShown = !0;
        var o = players[n].campaign,
            s = o === 0 ? "British" : "French",
            f = r === 0 ? "Reserve" : "Hand";
        IsRandomRule(15) && r === 3 && (f = Lang === 0 ? "Belagerung" : "Siege");
        u = "<h2 align='center'>" + StrASuccess + "<\/h2>";
        e = Lang === 0 ? "Eine Karte (aus " + f + ") wurde zur&uuml;ck zum Imp.vorrat gelegt." : "A card (from " + f + ") is placed back on your opponent&rsquo;s empire deck:";
        u += "<p style='text-align:center;font-size:12px'>" + e + "<\/p>";
        u += " <img id='oppCardView' style='position:absolute;left:146px;top:90px;width:170px;height:263px;";
        u += "border:1px solid black' src='" + GameImagePath + "cards/card" + s + i + ".jpg?v=2'/>";
        u += "<input id='closeAmbResp' type='button' name='closeAR' value='" + StrClose + "'";
        u += " style='position:absolute;left:164px;top:370px;width:140px;padding:2px;font-size:14px'/>";
        u += "<input id='closeAmbResp2' type='button' name='closeAR2' value='X'";
        u += " style='position:absolute;left:5px;top:5px;width:30px;font-size:12px'/>";
        $("#oppResponseDiv").append(u);
        $("#closeAmbResp").click(function() {
            CloseOppResponse()
        });
        $("#closeAmbResp2").click(function() {
            CloseOppResponse()
        });
        $("#oppResponseDiv").animate({
            top: "+=440"
        }, 300)
    }
}

function ShowOppHand(n, t) {
    $("#oppResponseDiv").html("");
    oppResponseShown = !0;
    var i = "",
        f = players[n].hand,
        e = players[n].campaign,
        s, h, c = e === 0 ? locDataEN : locDataFR,
        l = e === 0 ? empDataEN : empDataFR,
        u, o, r;
    for (i += "<h2 align='center'>" + StrOppHand + "<\/h2>", i += t === 6 ? "<p style='text-align:center'>" + StrOppHandInfo + "<\/p>" : "<p style='text-align:center'>" + StrOppHandInfo2 + "<\/p>", i += "<div style='position:absolute;top:90px;left:10px;width:200px;height:263px;border:1px solid black;overflow:auto;background-color:silver'>", i += "<table border='1' cellpadding='4' style='width:100%'>", r = 0; r < f.length; r++) u = f.substr(r, 1), h = IsNeutralCard(u) ? "#9DCC4D" : e === 0 ? "#EF9D77" : "#9DD7F2", i += "<tr style='background-color:" + h + "'>", i += "<td>", IsLocationCard(e, u) ? (o = Decode(f, r), i += locationData[c[o][0][2]][0]) : i += IsNeutralCard(u) ? empTitles[empDataN[GetNeutralIndex(u)][2]] : empTitles[l[GetEmpireIndex(e, u)][2]], i += "<\/td>", i += "<td id='oppCardHelp" + r + "'>", i += " <img src='" + BaseImagePath + "c/help.png'/>", i += "<\/td/>", i += "<\/tr>";
    for (i += "<\/table><\/div>", i += " <img id='oppCardView' style='position:absolute;left:245px;top:90px;width:170px;height:263px;", i += "border:1px solid black' src='" + GameImagePath + "cards/back.jpg'/>", i += "<input id='closeAmbResp' type='button' name='closeAR' value='" + StrClose + "'", i += " style='position:absolute;left:263px;top:370px;width:140px;padding:2px;font-size:14px'/>", i += "<input id='closeAmbResp2' type='button' name='closeAR2' value='X'", i += " style='position:absolute;left:5px;top:5px;width:30px;font-size:12px'/>", $("#oppResponseDiv").append(i), $("#closeAmbResp").click(function() {
            CloseOppResponse()
        }), $("#closeAmbResp2").click(function() {
            CloseOppResponse()
        }), r = 0; r < f.length; r++) u = f.substr(r, 1), IsNeutralCard(u) ? (o = u, s = "Neutral") : (o = Decode(f, r), s = e === 0 ? "British" : "French"), $("#oppCardHelp" + r).mouseover(function(n, t) {
        return function() {
            ShowOppCard(n, t)
        }
    }(o, s)).mouseout(function() {
        HideOppCard()
    });
    $("#oppResponseDiv").animate({
        top: "+=440"
    }, 300, function() {})
}

function ShowOppCard(n, t) {
    var i = "";
    IsRandomRule(22) && n === 26 && t === "French" && (i = "F");
    $("#oppCardView").attr("src", GameImagePath + "cards/card" + t + n + i + ".jpg?v=3")
}

function HideOppCard() {
    $("#oppCardView").attr("src", GameImagePath + "cards/back.jpg")
}

function CloseOppResponse() {
    $("#oppResponseDiv").animate({
        top: "-=440"
    }, 300, function() {});
    oppResponseShown = !1;
    FinishAction()
}

function ShowPriestInfo(n) {
    var t = players[UserIndex].campaign === 0 ? "EN" : "FR";
    $("#oppPoints").css("display", "none");
    $("#oppSinglePoints").css("display", "none");
    $("#oppPointsDummy").css("display", "none");
    $("#oppCollCubesPic").css("display", "none");
    $("#oppCollCubes").css("display", "none");
    $("#oppCollDiscsPic").css("display", "none");
    $("#oppCollDiscs").css("display", "none");
    $("#ambushPriestInfo").attr("src", GameImagePath + "priest" + t + ".jpg");
    $("#ambushPriestInfo").css("visibility", "visible").css("cursor", "pointer");
    $("#ambushPriestInfo").click(function() {
        ExecutePriest(n)
    })
}

function HidePriestInfo() {
    $("#oppPoints").css("display", "");
    $("#oppSinglePoints").css("display", "");
    $("#oppPointsDummy").css("display", "");
    $("#oppCollCubesPic").css("display", "");
    $("#oppCollCubes").css("display", "");
    $("#oppCollDiscsPic").css("display", "");
    $("#oppCollDiscs").css("display", "");
    $("#ambushPriestInfo").attr("src", GameImagePath + "space.gif");
    $("#ambushPriestInfo").css("visibility", "hidden").css("cursor", "default");
    $("#ambushPriestInfo").unbind()
}

function ExecutePriest(n) {
    HidePriestInfo();
    HandlePriestResponse(n)
}

function HandlePriestResponse(n) {
    HandlePriestAutoResponse(n)
}

function HandlePriestAutoResponse(n) {
    var t = (UserIndex + 1) % 2,
        i = players[t].autoAmbush,
        r = Decode(i, 4);
    HasPriestTarget(t) ? PerformPriestTarget(t, n, r) : PerformPriestHand(t, n)
}

function HasPriestTarget(n) {
    for (var f, u, i, r, t = 0; t < 2; t++)
        for (u = t === 0 ? players[n].hand : players[n].reserve, i = 0; i < u.length; i++)
            for (f = u.substr(i, 1), r = 0; r < priestTargetCards.length; r++)
                if (f === priestTargetCards[r]) return !0;
    return !1
}

function CalcPriestTarget(n, t) {
    for (var f = [], o = players[n].hand, s = players[n].reserve, h = t === 0 ? [s, o] : [o, s], c, e, r, u, i = 0; i < h.length; i++)
        for (e = h[i], l = 0; l < e.length; l++)
            for (r = e.substr(l, 1), u = 0; u < priestTargetCards.length; u++)
                if (r === priestTargetCards[u]) return f.push(r), c = i === t ? 0 : 1, f.push(c), t === 0 && i === 0 || t === 1 && i === 1 ? players[n].RemoveReserveCard(r) : players[n].RemoveHandCard(r), f;
    return [-1, -1]
}

function PerformPriestTarget(n, t, i) {
    var r = CalcPriestTarget(n, i);
    if (AddMovesDoneAction(Encode(t) + players[UserIndex].activeCards + "T" + r[0] + Encode(r[1])), players[UserIndex].RemoveHandCards(players[UserIndex].activeCards), players[UserIndex].discardPile += players[UserIndex].activeCards, players[UserIndex].discardPile += r[0], HandleAntiCheat(), !isGameValid) {
        DisableActions();
        ShowInfoMessage(3, "<span style='color:red'><b>Re-open game window!<\/b><\/span>");
        return
    }
    ShowPriestTarget(n, t, r[0], r[1]);
    FinishAction(t)
}

function PerformPriestHand(n, t) {
    if (AddMovesDoneAction(Encode(t) + players[UserIndex].activeCards + "C"), players[UserIndex].RemoveHandCards(players[UserIndex].activeCards), players[UserIndex].discardPile += players[UserIndex].activeCards, HandleAntiCheat(), !isGameValid) {
        DisableActions();
        ShowUI();
        ShowInfoMessage(3, "<span style='color:red'><b>Re-open game window!<\/b><\/span>");
        return
    }
    ShowOppHand(n, t);
    FinishAction(t)
}

function ShowPriestTarget(n, t, i, r) {
    if (!oppResponseShown && (oppResponseShown = !0, i !== -1 && r !== -1)) {
        $("#oppResponseDiv").html("");
        var f = players[UserIndex].campaign,
            e = f === 0 ? StrILSuccess : StrPriestSuccess,
            o = r === 0 ? "Reserve" : "Hand",
            u = "<h2 align='center'>" + e + "<\/h2>";
        u += "<p style='text-align:center;font-size:12px'>" + StrOppCard + " (" + StrFrom + " " + o + ") " + StrPlacedDiscard + "<\/p>";
        u += " <img id='oppCardView' style='position:absolute;left:146px;top:90px;width:170px;height:263px;";
        u += "border:1px solid black' src='" + GameImagePath + "cards/cardNeutral" + i + ".jpg'/>";
        u += "<input id='closePriestResp' type='button' name='closeAR' value='" + StrClose + "'";
        u += " style='position:absolute;left:164px;top:370px;width:140px;padding:2px;font-size:14px'/>";
        $("#oppResponseDiv").append(u);
        $("#closePriestResp").click(function() {
            CloseOppResponse()
        });
        $("#oppResponseDiv").animate({
            top: "+=440"
        }, 300, function() {})
    }
}

function ExecuteMoneyAction(n) {
    if (isGameValid) {
        AddMovesDoneAction(Encode(n) + players[UserIndex].activeCards);
        var t = players[UserIndex].activeCards.substr(0, 1),
            i = players[UserIndex].campaign;
        HasSymbol(i, 7, t) && players[UserIndex].money++;
        HasSymbol(i, 8, t) && (players[UserIndex].money += 2);
        HasSymbol(i, 9, t) && (players[UserIndex].money += 3);
        players[UserIndex].RemoveHandCards(players[UserIndex].activeCards);
        players[UserIndex].discardPile += players[UserIndex].activeCards;
        FinishAction(n)
    }
}

function ExecuteMerchantAction(n) {
    if (isGameValid) {
        AddMovesDoneAction(Encode(n) + players[UserIndex].activeCards);
        for (var r = players[UserIndex].campaign, u = players[UserIndex].activeCards, t, i = 1; i < u.length; i++) t = u.substr(i, 1), HasSymbol(r, 7, t) && players[UserIndex].money++, HasSymbol(r, 8, t) && (players[UserIndex].money += 2), HasSymbol(r, 9, t) && (players[UserIndex].money += 3);
        players[UserIndex].RemoveHandCards(players[UserIndex].activeCards);
        players[UserIndex].discardPile += players[UserIndex].activeCards;
        FinishAction(n)
    }
}

function ExecuteTraderAction(n) {
    if (isGameValid) {
        var t = players[UserIndex].activeCards.length === 1 ? 37 : n;
        AddMovesDoneAction(Encode(t) + players[UserIndex].activeCards);
        players[UserIndex].money += t === n ? (players[UserIndex].activeCards.length - 1) * 2 : 1;
        players[UserIndex].RemoveHandCards(players[UserIndex].activeCards);
        players[UserIndex].discardPile += players[UserIndex].activeCards;
        FinishAction(t)
    }
}

function ExecutePiracyAction(n) {
    if (isGameValid) {
        AddMovesDoneAction(Encode(n) + players[UserIndex].activeCards);
        var t = players[(UserIndex + 1) % 2].money;
        t >= 2 ? players[(UserIndex + 1) % 2].money -= 2 : t === 1 && (players[(UserIndex + 1) % 2].money = 0);
        players[UserIndex].money += 2;
        players[UserIndex].RemoveHandCards(players[UserIndex].activeCards);
        players[UserIndex].discardPile += players[UserIndex].activeCards;
        FinishAction(n)
    }
}

function ExecuteDraftAction(n) {
    isGameValid && (draftVisible = draftVisible ? !1 : !0, n === 39 ? ShowFrenchStartDraft() : ShowDraftInfo(n), draftVisible ? (DisableActions(), players[UserIndex].ClearActiveCards(), ShowUI(), gameBoard.IsSiegeActive(0) && $("#withdrawBtn0").attr("disabled", !0), gameBoard.IsSiegeActive(0) && $("#withdrawBtn1").attr("disabled", !0), $("#draftDiv").animate({
        top: "-=480"
    }, 300)) : $("#draftDiv").animate({
        top: "+=480"
    }, 300))
}

function ShowDraftInfo(n) {
    $("#draftDiv").html("");
    var t = "",
        r = players[UserIndex].empPile,
        f = players[UserIndex].campaign,
        e = f === 0 ? empDataEN : empDataFR,
        o = f === 0 ? "#EF9D77" : "#9DD7F2",
        u, i;
    for (t += "<h2 align='center'>" + StrAvEmpCards + "<\/h2>", t += "<p style='text-align:center'>" + StrDraftInfo + "<\/p>", t += "<div style='position:absolute;top:90px;left:10px;width:225px;height:300px;border:1px solid black;overflow:auto;background-color:silver'>", t += "<table border='1' cellpadding='3' style='width:100%'>", i = 0; i < r.length; i++) t += "<tr style='background-color:" + o + "'>", t += "<td id='draftCard" + i + "'>", u = r.substr(i, 1), t += empTitles[e[GetEmpireIndex(f, u)][2]], t += "<\/td>", t += "<td title='costs for drafting this card' style='cursor:default;text-align:center'>" + e[GetEmpireIndex(f, u)][3], t += "<\/td>", t += "<td style='cursor:default' style='text-align:center' onmouseover='ShowDraftCard(false," + Decode(r, i) + "," + f + ")' onmouseout='HideDraftCard()'>", t += " <img id='draftCardHelp" + i + "' src='" + BaseImagePath + "c/help.png'/>", t += "<\/td/>", t += "<\/tr>";
    for (r = gameBoard.neutralCards, i = 0; i < r.length; i++) t += "<tr style='background-color:#9DCC4D'>", t += "<td id='draftNCard" + i + "'>", u = r.substr(i, 1), t += empTitles[empDataN[GetNeutralIndex(u)][2]], t += "<\/td>", t += "<td title='costs for drafting this card' style='cursor:default;text-align:center'>" + empDataN[GetNeutralIndex(u)][3], t += "<\/td>", t += "<td id='nDraftHelp" + i + "' style='text-align:center'>", t += " <img id='draftNCardHelp" + i + "' src='" + BaseImagePath + "c/help.png'/>", t += "<\/td/>", t += "<\/tr>";
    for (t += "<\/table>", t += "<\/div>", t += " <img id='draftCardView' style='position:absolute;left:250px;top:90px;width:170px;height:263px;", t += "border:1px solid black' src='" + GameImagePath + "cards/back.jpg'/>", t += "<input id='closeDraftInfo' type='button' name='closeDRI' value='" + StrClose + "'", t += " style='position:absolute;left:268px;top:370px;width:140px;padding:2px;font-size:14px'/>", $("#draftDiv").append(t), $("#closeDraftInfo").click(function() {
            CloseDraftInfo()
        }), r = players[UserIndex].empPile, i = 0; i < r.length; i++) u = r.substr(i, 1), $("#draftCard" + i).css("cursor", "pointer").click(function(n, t, i) {
        return function() {
            DraftEmpireCard(n, t, i)
        }
    }(n, u, !1));
    for (r = gameBoard.neutralCards, i = 0; i < r.length; i++) u = r.substr(i, 1), $("#draftNCard" + i).css("cursor", "pointer").click(function(n, t, i) {
        return function() {
            DraftEmpireCard(n, t, i)
        }
    }(n, u, !0)), $("#nDraftHelp" + i).mouseover(function(n, t, i) {
        return function() {
            ShowDraftCard(n, t, i)
        }
    }(!0, u, f)).mouseout(function() {
        HideDraftCard()
    })
}

function ShowFrenchStartDraft() {
    $("#draftDiv").html("");
    var n = "",
        f = players[UserIndex].empPile,
        r = players[UserIndex].campaign,
        e = r === 0 ? empDataEN : empDataFR,
        h = r === 0 ? "#EF9D77" : "#9DD7F2",
        u, i, o, t, s = IsRandomRule(22);
    for (n += "<h2 align='center'>" + StrAvEmpCards + "<\/h2>", n += "<p style='text-align:center'>" + StrAddStartCard + "<\/p>", n += "<div style='position:absolute;top:90px;left:10px;width:220px;height:300px;border:1px solid black;overflow:auto;background-color:silver'>", n += "<table border='1' cellpadding='4' style='width:100%'>", t = 0; t < f.length; t++)(u = f.substr(t, 1), o = GetEmpireIndex(r, u), i = e[o][0], i !== 27 && i !== 28) && (i === 26 && s || (n += "<tr style='background-color:" + h + "'>", n += "<td id='draftCard" + t + "'>", n += empTitles[e[GetEmpireIndex(r, u)][2]], n += "<\/td>", n += "<td title='costs for drafting this card' style='cursor:default;text-align:center'>" + e[GetEmpireIndex(r, u)][3], n += "<\/td>", n += "<td style='cursor:default' style='text-align:center' onmouseover='ShowDraftCard(false," + Decode(f, t) + "," + r + ")' onmouseout='HideDraftCard()'>", n += " <img id='draftCardHelp" + t + "' src='" + BaseImagePath + "c/help.png'/>", n += "<\/td/>", n += "<\/tr>"));
    for (n += "<\/table>", n += "<\/div>", n += " <img id='draftCardView' style='position:absolute;left:250px;top:90px;width:170px;height:263px;", n += "border:1px solid black' src='" + GameImagePath + "cards/back.jpg'/>", $("#draftDiv").append(n), t = 0; t < f.length; t++)(u = f.substr(t, 1), o = GetEmpireIndex(r, u), i = e[o][0], i !== 27 && i !== 28) && (i === 26 && s || $("#draftCard" + t).css("cursor", "pointer").click(function(n) {
        return function() {
            BuildStartCards(n)
        }
    }(i)))
}

function ShowDraftCard(n, t, i) {
    if (n) $("#draftCardView").attr("src", GameImagePath + "cards/cardNeutral" + t + ".jpg");
    else {
        var r = i === 0 ? "British" : "French";
        $("#draftCardView").attr("src", GameImagePath + "cards/card" + r + t + ".jpg?v=2")
    }
}

function HideDraftCard() {}

function CloseDraftInfo() {
    draftVisible = !1;
    $("#draftDiv").animate({
        top: "+=480"
    }, 300, function() {
        $("#draftDiv").html("");
        FinishAction()
    })
}

function BuildStartCards(n) {
    if (draftVisible) {
        draftVisible = !1;
        $("#draftDiv").animate({
            top: "+=480"
        }, 300, function() {
            $("#draftDiv").html("")
        });
        for (var u = IsRandomRule(22) ? [0, 1, 2, 3, 4, 5, 6, 26, 27, 28, n] : [0, 1, 2, 3, 4, 5, 6, 27, 28, n], i = "", r = [], t = 0; t < u.length; t++) r.push(u[t]);
        for (r.shuffle(), t = 0; t < r.length; t++) i += Encode(r[t]);
        players[UserIndex].hand = i.substr(0, 5);
        players[UserIndex].deck = i.substr(5, i.length - 5);
        SetGamePhase(0);
        AddMovesDoneAction("FC" + Encode(n));
        ShowInfoMessage(3, StrFinishTurn);
        SetResetButton(!0);
        SetFinishButton(!0)
    }
}

function DraftEmpireCard(n, t, i) {
    if (!cardDrafted) {
        cardDrafted = !0;
        var f = players[UserIndex].campaign,
            u, r;
        if (i ? (u = empDataN, r = empDataN[GetNeutralIndex(t)][3]) : (u = f === 0 ? empDataEN : empDataFR, r = u[GetEmpireIndex(f, t)][3]), players[UserIndex].money >= r) players[UserIndex].money -= r;
        else try {
            Lang === 0 ? alert("Du musst " + r + " Geld fuer diese Karte zahlen.\nProblem: Du hast nur " + players[UserIndex].money + " Geld.\n\n/Brer Bear") : alert("You have to pay " + r + " money in order to draft this card.\nProblem: You have only " + players[UserIndex].money + " money.\n\n/Brer Bear");
            cardDrafted = !1;
            return
        } catch (e) {
            return
        }
        AddMovesDoneAction(Encode(n) + "" + t);
        players[UserIndex].discardPile += t;
        players[UserIndex].empPile = players[UserIndex].CalcEmpPile();
        gameBoard.SetNeutralCards();
        CloseDraftInfo()
    }
}

function ExecuteDiscardAction(n) {
    var t, i;
    if (isGameValid) {
        if (t = n, i = !1, IsRandomRule(17)) {
            var u = players[UserIndex].activeCards,
                f = players[UserIndex].activeCards.substr(0, 1),
                r = players[UserIndex].campaign;
            if (u.length === 1 && IsLocationCard(r, f)) {
                var e = r === 0 ? locDataEN : locDataFR,
                    o = Decode(players[UserIndex].activeCards, 0),
                    s = e[o][0][2];
                gameBoard.GetLocOwner(s) !== r && (t = 38, i = !0)
            }
        }
        AddMovesDoneAction(Encode(t) + players[UserIndex].activeCards);
        IsRandomRule(12) || i || (players[UserIndex].money -= players[UserIndex].activeCards.length - 1);
        players[UserIndex].RemoveHandCards(players[UserIndex].activeCards);
        players[UserIndex].discardPile += players[UserIndex].activeCards;
        FinishAction(t)
    }
}

function ExecuteReserveAction(n) {
    isGameValid && (AddMovesDoneAction(Encode(n) + players[UserIndex].activeCards), players[UserIndex].reserve += players[UserIndex].activeCards, players[UserIndex].RemoveHandCards(players[UserIndex].activeCards), FinishAction(n))
}

function ExecuteFreeReserveAction(n) {
    isGameValid && (AddMovesDoneAction(Encode(n) + players[UserIndex].reserve), players[UserIndex].hand += players[UserIndex].reserve, players[UserIndex].money -= players[UserIndex].reserve.length, players[UserIndex].reserve = "", refillVisible && players[UserIndex].hand.length >= 5 && (refillVisible = !1, HideRefillHandButton()), FinishAction(n))
}

function ExecuteGovernorAction(n) {
    var o;
    if (isGameValid) {
        AddMovesDoneAction(Encode(n) + players[UserIndex].activeCards);
        for (var f = players[UserIndex].activeCards, e = players[UserIndex].campaign, u = e === 0 ? locDataEN : locDataFR, t, i, r = 1; r < f.length; r++) t = f.substr(r, 1), i = Decode(f, r), IsLocationCard(e, t) ? (players[UserIndex].locPile += t, o = u[i][0][2], IsRandomRule(14) && gameBoard.GetLocOwner(o) === e && (gameBoard.IsVillage(u[i][0][2]) ? players[UserIndex].tokens[0]++ : gameBoard.IsTown(u[i][0][2]) && players[UserIndex].tokens[1]++, gameBoard.SetLocation(u[i][0][2], 0))) : IsNeutralCard(t) || (players[UserIndex].empPile += t);
        players[UserIndex].RemoveHandCards(players[UserIndex].activeCards);
        players[UserIndex].discardPile += players[UserIndex].activeCards.substr(0, 1);
        gameBoard.SetNeutralCards();
        FinishAction(n)
    }
}

function ExecuteIntendantAction(n) {
    isGameValid && (draftVisible = draftVisible ? !1 : !0, ShowIntendantInfo(n), draftVisible ? ($("#draftDiv").animate({
        top: "-=480"
    }, 300, function() {}), DisableActions(), ShowUI()) : $("#draftDiv").animate({
        top: "+=480"
    }, 300, function() {}))
}

function ShowIntendantInfo(n) {
    var e;
    $("#draftDiv").html("");
    var t = "",
        u = players[UserIndex].discardPile,
        f = players[UserIndex].campaign,
        o = f === 0 ? "British" : "French",
        s = f === 0 ? locDataEN : locDataFR,
        h = f === 0 ? empDataEN : empDataFR,
        r, i;
    for (t += "<h2 align='center'>Take one card from your discard pile<\/h2>", t += "<p style='text-align:center'>Click one card title to place that card in your hand.<\/p>", t += "<div style='position:absolute;top:90px;left:10px;width:200px;height:300px;border:1px solid black;overflow:auto;background-color:silver'>", t += "<table border='1' cellpadding='5' style='background-color:#D9C58A'>", i = 0; i < u.length; i++) t += "<tr>", t += "<td id='takeCard" + i + "'>", r = u.substr(i, 1), r = u.substr(i, 1), IsLocationCard(f, r) ? (cardIndex = Decode(u, i), t += locationData[s[cardIndex][0][2]][0]) : t += IsNeutralCard(r) ? empTitles[empDataN[GetNeutralIndex(r)][2]] : empTitles[h[GetEmpireIndex(f, r)][2]], t += "<\/td>", t += "<td id='intCardHelp" + i + "'>", t += " <img id='draftCardHelp" + i + "' src='" + BaseImagePath + "c/help.png'/>", t += "<\/td/>", t += "<\/tr>";
    for (t += "<\/table>", t += "<\/div>", t += " <img id='oppCardView' style='position:absolute;left:230px;top:90px;width:170px;height:263px;", t += "border:1px solid black' src='" + GameImagePath + "space.gif'/>", t += "<input id='closeIntInfo' type='button' name='closeDRI' value='close'", t += " style='position:absolute;left:248px;top:370px;width:140px;padding:2px;font-size:14px'/>", $("#draftDiv").append(t), $("#closeIntInfo").click(function() {
            CloseDraftInfo()
        }), e = !1, i = 0; i < u.length; i++) r = u.substr(i, 1), IsNeutralCard(r) ? (e = !0, cardIndex = r, o = "Neutral") : (e = !1, cardIndex = Decode(u, i), o = f === 0 ? "British" : "French"), $("#intCardHelp" + i).css("cursor", "default").mouseover(function(n, t) {
        return function() {
            ShowOppCard(n, t)
        }
    }(cardIndex, o)).mouseout(function() {
        HideOppCard()
    }), $("#takeCard" + i).css("cursor", "pointer").click(function(n, t, i) {
        return function() {
            TakeIntendantCard(n, t, i)
        }
    }(n, r, e))
}

function TakeIntendantCard(n, t) {
    AddMovesDoneAction(Encode(n) + "" + t);
    players[UserIndex].money -= 2;
    players[UserIndex].hand += t;
    players[UserIndex].RemoveDiscardCard(t);
    players[UserIndex].RemoveHandCards(players[UserIndex].activeCards);
    players[UserIndex].discardPile += players[UserIndex].activeCards;
    CloseDraftInfo()
}

function ExecuteHomeSupportAction(n) {
    if (IsRandomRule(23)) {
        ExecuteFirstEditionHomeSupport(n);
        return
    }
    if (isGameValid) {
        var t = players[UserIndex].deck;
        if (t.length > 3 ? (players[UserIndex].hand += t.substr(0, 3), players[UserIndex].deck = t.substr(3, t.length - 3)) : (players[UserIndex].hand += t, players[UserIndex].deck = ""), players[UserIndex].RemoveHandCards(players[UserIndex].activeCards), players[UserIndex].discardPile += players[UserIndex].activeCards, AddMovesDoneAction(Encode(n) + players[UserIndex].activeCards + ""), HandleAntiCheat(), !isGameValid) {
            ShowInfoMessage(3, "<span style='color:red'><b>Re-open game window!<\/b><\/span>");
            return
        }
        FinishAction(n)
    }
}

function ExecuteFirstEditionHomeSupport(n) {
    if (isGameValid) {
        for (var t = players[UserIndex].deck, u = players[UserIndex].discardPile, i = "", r = 0; r < 3; r++) {
            if (t.length === 0 && (ReshuffleDiscardPile(!1), t = players[UserIndex].deck, u = players[UserIndex].discardPile), t.length === 0) break;
            i += t.substr(t.length - 1, 1);
            t = t.length > 1 ? t.substr(0, t.length - 1) : ""
        }
        if (players[UserIndex].deck = t, players[UserIndex].hand += i, players[UserIndex].RemoveHandCards(players[UserIndex].activeCards), players[UserIndex].discardPile += players[UserIndex].activeCards, AddMovesDoneAction(Encode(n) + players[UserIndex].activeCards + i), HandleAntiCheat(), !isGameValid) {
            ShowInfoMessage(3, "<span style='color:red'><b>Re-open game window!<\/b><\/span>");
            return
        }
        FinishAction(n)
    }
}

function ReshuffleDiscardPile(n) {
    var u = players[UserIndex].discardPile,
        f = "",
        t = [],
        i, r;
    if (u.length === 0) f = "";
    else {
        for (i = 0; i < u.length; i++) t.push(u.substr(i, 1));
        for (t.shuffle(), r = 0; r < t.length; r++) f += t[r]
    }
    players[UserIndex].deck = f;
    players[UserIndex].discardPile = "";
    IsRandomRule(0) && n && (players[UserIndex].money >= 1 ? players[UserIndex].money -= 1 : SetGamePhase(2))
}

function ExecutePassAction(n) {
    isGameValid && (AddMovesDoneAction(Encode(n) + "P"), FinishAction(n))
}

function CanPlaySettlerCard(n) {
    for (var r = players[n].hand, i = players[n].campaign, o = i === 0 ? locDataEN : locDataFR, f, e, u, t = 0; t < r.length; t++)
        if (u = r.substr(t, 1), HasSymbol(i, 4, u)) {
            if (IsLocationCard(i, u) && (e = Decode(r, t), f = o[e][0][2], !IsLocCardValid(i, f))) continue;
            return !0
        } return !1
}

function ExecuteWithdrawAction(n, t, i) {
    var u = Decode(gameBoard.sieges[t], 0),
        r = locationData[u][4],
        f, e;
    if (i)
        if (GetStatusStringVersion() > 2) {
            if (!r && (f = window.confirm(StrConfirmWithdraw), !f)) return
        } else {
            try {
                Lang === 0 ? alert("Diese Aktion muss noch weitergehend getestet werden und ist daher momentan nicht verfuegbar.\n\n/Brer Bear") : alert("This action needs some more testing and is therefore not yet available.\n\n/Brer Bear")
            } catch (o) {}
            return
        } if (refillVisible && (HideRefillHandButton(), refillVisible = !1), CanLoseSiegeCard(t)) siegesLost[t] = !0, ShowSiegeCardSelection(t, !0);
    else {
        if (AddMovesDoneAction(Encode(n) + t + gameBoard.sieges[t].substr(0, 1) + "-"), FinishWithdraw(n, t, i), wonByHomeSurrender && SetGamePhase(4), i && !r && (HandleAntiCheat(), !isGameValid)) {
            DisableActions();
            ShowUI();
            ShowInfoMessage(3, "<span style='color:red'><b>Re-open game window!<\/b><\/span>");
            return
        }
        if (wonByHomeSurrender) {
            SetGamePhase(0);
            return
        }
        if (i && r) {
            e = Lang === 0 ? "Dein Gegner muss entscheiden, ob er eine Karte mit Siedler-Symbol spielt, um den Ort zu besiedeln.\n\nBeende den Zug." : "Your opponent may decide whether or not to play a card with a settler symbol in order to settle the location.\n\nFinish your turn!";
            try {
                alert(e)
            } catch (o) {}
            DisableActions();
            ShowUI();
            SetGamePhase(6);
            SetAntiCheatFlag(u);
            ShowInfoMessage(3, StrFinishTurn);
            SetResetButton(!0);
            SetFinishButton(!0);
            return
        }
        FinishAction(n)
    }
}

function FinishAction() {
    var t, i, n;
    if (DisableActions(), players[UserIndex].ClearActiveCards(), ShowUI(), ShowGameInfo(), t = GetMultiFuncFlag(), oppResponseShown) {
        n = "<span style='color:red'><b>" + StrCloseInfo + "<\/b><\/span>";
        ShowInfoMessage(3, n);
        return
    }
    if (i = GetNumActions(), i < t) EnableHandCards(!1), EnableActions(!0), SetResetButton(!0);
    else if (EnableHandCards(!0), EnableActions(!1), SetResetButton(!0), players[UserIndex].hand.length < 5 && (!IsRandomRule(25) || players[UserIndex].deck.length > 0)) {
        if (n = StrRefillFree, ShowInfoMessage(3, n), refillVisible) return;
        ShowRefillHandButton()
    } else CheckIfSiegeLost(), siegesLost[0] || siegesLost[1] || siegeLostVisible ? siegesLost[0] ? ShowSiegeCardSelection(0, !1) : ShowSiegeCardSelection(1, !1) : SetFinishButton(!0)
}

function ShowRefillHandButton() {
    refillVisible = !0;
    var n = "";
    n += "<p align='left'><i>" + StrRefillInfo + "<\/i><\/p>";
    n += "<input id='btnRefill' type='button' name='refillBtn' style='width:200px;padding:2px;font-size:14px' value='" + StrDrawCards + "'/>";
    $("#refillDiv").html(n);
    $("#refillDiv").animate({
        top: "-=250"
    }, 200, function() {
        $("#btnRefill").click(function() {
            PerformRefilling()
        })
    })
}

function HideRefillHandButton() {
    $("#refillDiv").animate({
        top: "+=250"
    }, 200, function() {
        refillVisible || $("#refillDiv").html("")
    })
}

function PerformRefilling() {
    refillVisible && (refillVisible = !1, RefillHand(), HideRefillHandButton())
}

function RefillHand() {
    for (var r = players[UserIndex].hand, n = players[UserIndex].deck, u = players[UserIndex].discardPile, i = "", t = 0; t < 5 - r.length; t++) {
        if (n.length !== 0 || IsRandomRule(25) || (ReshuffleDiscardPile(!0), n = players[UserIndex].deck, u = players[UserIndex].discardPile), n.length === 0) break;
        i += n.substr(n.length - 1, 1);
        n = n.length > 1 ? n.substr(0, n.length - 1) : ""
    }
    if (players[UserIndex].deck = n, players[UserIndex].hand += i, HandleAntiCheat(), !isGameValid) {
        ShowInfoMessage(3, "<span style='color:red'><b>Re-open game window!<\/b><\/span>");
        return
    }
    if (DisableActions(), ShowUI(), GetGamePhase() === 2) {
        EnableRefillDiscard();
        SetResetButton(!1);
        SetFinishButton(!1);
        return
    }
    ShowInfoMessage(3, StrFinishTurn);
    SetResetButton(!1);
    CheckIfSiegeLost();
    siegesLost[0] || siegesLost[1] || siegeLostVisible ? siegesLost[0] ? ShowSiegeCardSelection(0, !1) : ShowSiegeCardSelection(1, !1) : SetFinishButton(!0)
}

function EnableRefillDiscard() {
    var n;
    if (players[UserIndex].hand.length < 1) {
        PerformDiscardPenalty(!1, "");
        return
    }
    for (i = 0; i < players[UserIndex].hand.length; i++) n = players[UserIndex].hand.substr(i, 1), $("#handCard" + i).unbind(), $("#handCard" + i).click(function(n, t) {
        return function() {
            PerformDiscardPenalty(n, t)
        }
    }(!0, n)).css("cursor", "pointer");
    var t = 2 - penaltyCounter == 1 ? "" : "n",
        r = Lang === 0 ? "Wirf " + (2 - penaltyCounter) + " Karte" + t + " ab." : "Couldn&rsquo;t pay 1 coin: discard " + (2 - penaltyCounter),
        u = "<span style='color:red;font-size:11px'>" + r + "<\/span>";
    ShowInfoMessage(3, u)
}

function PerformDiscardPenalty(n, t) {
    if (n && (players[UserIndex].RemoveHandCard(t), players[UserIndex].discardPile += t, penaltyCounter++, penaltyCounter < 2)) {
        ShowUI();
        EnableRefillDiscard();
        return
    }
    SetGamePhase(0);
    ShowUI();
    ShowInfoMessage(3, StrFinishTurn);
    SetResetButton(!0);
    CheckIfSiegeLost();
    siegesLost[0] || siegesLost[1] || siegeLostVisible ? siegesLost[0] ? ShowSiegeCardSelection(0, !1) : ShowSiegeCardSelection(1, !1) : SetFinishButton(!0)
}

function EnablePostSiegeDiscard() {
    for (var t, i, r, n = 0; n < players[UserIndex].hand.length; n++) t = players[UserIndex].hand.substr(n, 1), $("#handCard" + n).unbind(), $("#handCard" + n).click(function(n) {
        return function() {
            PerformPostSiegeDiscard(n)
        }
    }(t)).css("cursor", "pointer");
    i = Lang === 0 ? "Wirf eine Karte ab." : "Discard one card.";
    r = "<span style='color:red;font-size:11px'>" + i + "<\/span>";
    ShowInfoMessage(3, r)
}

function PerformPostSiegeDiscard(n) {
    players[UserIndex].RemoveHandCard(n);
    players[UserIndex].discardPile += n;
    var t = players[UserIndex].deck;
    if (t.length === 0 && ReshuffleDiscardPile(!1), t.length > 0 && (players[UserIndex].hand += t.substr(t.length - 1, 1), t = t.length > 1 ? t.substr(0, t.length - 1) : "", players[UserIndex].deck = t, HandleAntiCheat(), !isGameValid)) {
        ShowInfoMessage(3, "<span style='color:red'><b>Re-open game window!<\/b><\/span>");
        return
    }
    ShowUI();
    SetupActionInterface()
}

function ShowMainInfo(n, t, i, r) {
    ($("#cardInfoDiv").html(""), n !== 7 ? $("#cardInfoDiv").html(CreateCardInfo(n, t, i, r)) : $("#cardInfoDiv").html(CreatePointsInfo(t)), cardInfoVisible) || (cardInfoVisible = !0, $("#cardInfoDiv").animate({
        top: "-=480"
    }, 300, function() {}))
}

function CreatePointsInfo(n) {
    var o = n ? (UserIndex + 1) % 2 : UserIndex,
        s = players[o].campaign === 0 ? "#EF9D77" : "#95D1ED",
        v = n ? StrPPreviewO : StrPPreview,
        t = "<h2 align='center'>" + v + "<\/h2>";
    t += "<div style='position:absolute;top:60px;left:10px;width:439px;height:290px;border:1px solid black;overflow:auto;background-color:silver'>";
    t += "<table border='1' cellpadding='4' style='width:100%'>";
    for (var h = players[o].oppTokens[0] * 2, c = players[o].oppTokens[1] * 4, l = h + c, e = 0, i, u, a = 0, r = -1, f = 0; f < locationData.length; f++)
        if (i = locationData[f][3], u = 0, i > 0) {
            r = Decode(gameBoard.locations, f);
            switch (players[o].campaign) {
                case 0:
                    (r === 1 || r === 3) && (e += i, u = i);
                    (r === 2 || r === 4) && (e += i * 2, u = i * 2);
                    break;
                case 1:
                    (r === 5 || r === 7) && (e += i, u = i);
                    (r === 6 || r === 8) && (e += i * 2, u = i * 2)
            }
            u > 0 && (t += "<tr style='background-color:" + s + "'><td>Bonus <b>" + locationData[f][0] + "<\/b>:<\/td><td>" + u + "<\/td><td>(" + StrLBonus + ": " + i + ")<\/td><\/tr>")
        } t += "<tr style='background-color:#D9C58A'><td>" + StrBPoints + ":<\/td><td colspan='2'><b>" + e + "<\/b><\/td><\/tr>";
    t += "<tr style='background-color:" + s + "'><td>" + StrCPoints + ":<\/td><td>" + h + "<\/td><td>" + StrCPointsInfo + "<\/td><\/tr>";
    t += "<tr style='background-color:" + s + "'><td>" + StrDPoints + ":<\/td><td>" + c + "<\/td><td>" + StrDPointsInfo + "<\/td><\/tr>";
    t += "<tr style='background-color:#D9C58A'><td>" + StrCDPoints + ":<\/td><td colspan='2'><b>" + l + "<\/b><\/td><\/tr>";
    a = l + e;
    t += "<tr style='background-color:#D9C58A'><td><b>" + StrVPoints + ":<\/b><\/td><td colspan='2'><b>" + a + "<\/b><\/td><\/tr>";
    t += "<\/table>";
    t += "<\/div>";
    t += "<input id='closeCInfo' type='button' name='closeCI' value='" + StrClose + "'";
    t += " style='position:absolute;left:168px;top:364px;width:140px;padding:2px;font-size:14px'/>";
    $("#cardInfoDiv").append(t);
    $("#closeCInfo").click(function() {
        CloseCardInfo()
    })
}

function CreateCardInfo(n, t, i, r) {
    var h = t ? (UserIndex + 1) % 2 : UserIndex,
        e = "",
        c = "",
        v, w, p;
    switch (n) {
        case 0:
            e = players[h].reserve;
            c = "Reserve";
            break;
        case 1:
            e = players[h].deck;
            c = "Deck (" + StrDrawingPile + ")";
            break;
        case 2:
            e = players[h].discardPile;
            c = StrDiscardPile;
            break;
        case 3:
            e = players[h].locPile;
            c = StrAvLocCards;
            break;
        case 4:
            e = players[h].empPile;
            c = StrAvEmpCards;
            break;
        case 5:
            e = players[h].hand;
            c = StrHandCards;
            break;
        case 6:
            h = r === players[h].campaign ? UserIndex : (UserIndex + 1) % 2;
            e = players[h].siegeCards[i];
            v = "";
            Lang === 0 ? (v = r === 0 ? "(Brit. Spieler)" : "(Franz&ouml;s. Spieler)", c = "Belagerungskarten " + v) : (v = r === 0 ? "(British player)" : "(French player)", c = "Siege cards " + v)
    }
    t && (c += " (" + StrOpponent + ")");
    var u = "",
        s = players[h].campaign,
        a = s === 0 ? "#EF9D77" : "#9DD7F2",
        b = s === 0 ? locDataEN : locDataFR,
        y = s === 0 ? empDataEN : empDataFR,
        o, l, f;
    if (u += "<h2 align='center'>" + c + "<\/h2>", u += "<div style='position:absolute;top:70px;left:10px;width:240px;height:320px;border:1px solid black;overflow:auto;background-color:silver'>", u += "<table border='1' cellpadding='4' style='width:100%'>", e.length === 0) u += "<tr style='background-color:" + a + "'><td><b>" + c + " " + StrIsEmpty + "<\/b><\/td><\/tr>";
    else if (!IsHistory && (n === 1 && t || n === 5)) u += "<tr style='background-color:" + a + "'><td><b>" + StrHiddenInfo + "<\/b><br/>" + StrHiddenInfo2 + "<\/td><\/tr>";
    else if (n === 1 && IsHistory || n === 2) {
        for (w = 1, u += "<tr style='background-color:#D9C58A'>", u += "<td colspan='3' style='text-align:center'><b>" + StrTop + "<\/b>", u += "<\/td>", u += "<\/tr>", f = e.length - 1; f >= 0; f--) o = e.substr(f, 1), a = IsNeutralCard(o) ? "#9DCC4D" : s === 0 ? "#EF9D77" : "#9DD7F2", u += "<tr style='background-color:" + a + "'>", u += "<td style='background-color:silver;text-align:right'><b>" + w + ".<\/b><\/td>", u += "<td id='ciCard" + f + "'>", IsLocationCard(s, o) ? (l = Decode(e, f), u += locationData[b[l][0][2]][0]) : u += IsNeutralCard(o) ? empTitles[empDataN[GetNeutralIndex(o)][2]] : empTitles[y[GetEmpireIndex(s, o)][2]], u += "<\/td>", n === 4 && (u += "<td title='costs for drafting this card' style='cursor:default'>" + y[GetEmpireIndex(s, o)][3], u += "<\/td>"), u += "<\/tr>", w++;
        u += "<tr style='background-color:#D9C58A'>";
        u += "<td colspan='3' style='text-align:center'><b>" + StrBottom + "<\/b>";
        u += "<\/td>";
        u += "<\/tr>"
    } else
        for (n === 1 && (e = GetSortedDeck(h), u += "<tr style='background-color:#D9C58A'>", u += "<td colspan='3' style='text-align:center'>" + StrSorted, u += "<\/td>", u += "<\/tr>"), f = 0; f < e.length; f++) o = e.substr(f, 1), a = IsNeutralCard(o) ? "#9DCC4D" : s === 0 ? "#EF9D77" : "#9DD7F2", u += "<tr style='background-color:" + a + "'>", u += "<td style='background-color:silver;text-align:right'><b>" + (f + 1) + ".<\/b><\/td>", u += "<td id='ciCard" + f + "'>", IsLocationCard(s, o) ? (l = Decode(e, f), u += locationData[b[l][0][2]][0]) : u += IsNeutralCard(o) ? empTitles[empDataN[GetNeutralIndex(o)][2]] : empTitles[y[GetEmpireIndex(s, o)][2]], u += "<\/td>", n === 4 && (u += "<td title='costs for drafting this card' style='cursor:default'>" + y[GetEmpireIndex(s, o)][3], u += "<\/td>"), u += "<\/tr>";
    for (u += "<\/table>", u += "<\/div>", u += " <img id='cInfoCardView' style='position:absolute;left:270px;top:70px;width:170px;height:263px;", u += "border:1px solid black' src='" + GameImagePath + "cards/back.jpg'/>", u += "<input id='closeCInfo' type='button' name='closeCI' value='" + StrClose + "'", u += " style='position:absolute;left:288px;top:364px;width:140px;padding:2px;font-size:14px'/>", $("#cardInfoDiv").append(u), $("#closeCInfo").click(function() {
            CloseCardInfo()
        }), p = "", f = 0; f < e.length; f++) o = e.substr(f, 1), IsNeutralCard(o) ? (l = o, p = "Neutral") : (l = Decode(e, f), p = s === 0 ? "British" : "French"), $("#ciCard" + f).mouseover(function(n, t) {
        return function() {
            ShowCardInfoCard(n, t)
        }
    }(l, p))
}

function ShowCardInfoCard(n, t) {
    var i = "";
    IsRandomRule(22) && n === 26 && t === "French" && (i = "F");
    $("#cInfoCardView").attr("src", GameImagePath + "cards/card" + t + n + i + ".jpg?v=3")
}

function HideCardInfoCard() {
    $("#cInfoCardView").attr("src", GameImagePath + "space.gif")
}

function CloseCardInfo() {
    cardInfoVisible = !1;
    $("#cardInfoDiv").animate({
        top: "+=480"
    }, 300, function() {
        $("#cardInfoDiv").html("")
    })
}

function GetSortedDeck(n) {
    for (var f = players[n].campaign, s = f === 0 ? locDataEN : locDataFR, h = f === 0 ? empDataEN : empDataFR, u = players[n].deck, e = "", t, r, o, i = 0; i < s.length; i++)
        for (t = 0; t < u.length; t++) r = u.substr(t, 1), IsLocationCard(f, r) && (o = Decode(u, t), s[i][0][0] === o && (e += r));
    for (i = 0; i < h.length; i++)
        for (t = 0; t < u.length; t++) r = u.substr(t, 1), IsEmpireCard(f, r) && !IsNeutralCard(r) && (o = Decode(u, t), h[i][0] === o && (e += r));
    for (i = 0; i < empDataN.length; i++)
        for (t = 0; t < u.length; t++) r = u.substr(t, 1), IsNeutralCard(r) && empDataN[i][0] === r && (e += r);
    return e
}

function GetStatusStringVersion() {
    return parseInt(gamestatus.substr(0, 1), 10)
}

function GetScenario() {
    return parseInt(gamestatus.substr(2, 1), 10)
}

function SetScenario(n) {
    (n === 4 || n === 5) && UpdateStatus(2, n.toString())
}

function GetGamePhase() {
    return Decode(gamestatus, 3)
}

function SetGamePhase(n) {
    UpdateStatus(3, Encode(n))
}

function GetAntiCheatFlag() {
    return Decode(gamestatus, 4)
}

function SetAntiCheatFlag(n) {
    UpdateStatus(4, Encode(n))
}

function GetMultiFuncFlag() {
    return Decode(gamestatus, 5)
}

function SetMultiFuncFlag(n) {
    UpdateStatus(5, Encode(n))
}

function GetActivePlayer() {
    return gamestatus.substr(6, 1) == "-" ? -1 : Decode(gamestatus, 6)
}

function SetActivePlayer(n) {
    UpdateStatus(6, Encode(n))
}

function IsFirstFrenchSiege() {
    return gamestatus.split(";")[0].length < 8 ? !1 : Decode(gamestatus, 7) === 1
}

function SetFirstFrenchSiege() {
    gamestatus.split(";")[0].length < 8 || UpdateStatus(7, Encode(1))
}

function GetRandomRules() {
    if (gamestatus.split(";")[0].length < 9) return "";
    var n = gamestatus.split(";")[0].length - 8;
    return n <= 0 ? "" : gamestatus.split(";")[0].substr(8, n)
}

function IsRandomRule(n) {
    if (GetStatusStringVersion() < 3) return !1;
    for (var i = GetRandomRules(), t = 0; t < i.length; t++)
        if (Decode(i, t) === n) return !0;
    return !1
}

function GetBoardLocations() {
    return gamestatus.split(";")[1]
}

function SetBoardLocations(n) {
    UpdateGroup(1, n)
}

function GetSiegeData(n) {
    return gamestatus.split(";")[2].split(",")[n]
}

function SetSiegeData(n, t) {
    UpdateSubGroup(2, n, t)
}

function GetCampaign(n) {
    return Decode(gamestatus.split(";")[3 + n].split(",")[0], 0)
}

function SetCampaign(n, t) {
    var i = UpdateCustomStatus(gamestatus.split(";")[3 + n].split(",")[0], 0, Encode(t));
    UpdateSubGroup(3 + n, 0, i)
}

function GetPlayerMap(n) {
    return Decode(gamestatus.split(";")[3 + n].split(",")[0], 1)
}

function SetPlayerMap(n, t) {
    var i = UpdateCustomStatus(gamestatus.split(";")[3 + n].split(",")[0], 1, Encode(t));
    UpdateSubGroup(3 + n, 0, i)
}

function GetNumOppTokens(n, t) {
    return Decode(gamestatus.split(";")[3 + n].split(",")[0], 2 + t)
}

function SetNumOppTokens(n, t, i) {
    var r = UpdateCustomStatus(gamestatus.split(";")[3 + n].split(",")[0], 2 + t, Encode(i));
    UpdateSubGroup(3 + n, 0, r)
}

function GetLostSiegeCard(n, t) {
    var i = gamestatus.split(";")[3 + n].split(",")[0].substr(4 + t, 1);
    return i == "-" ? -1 : i
}

function SetLostSiegeCard(n, t, i) {
    var r = UpdateCustomStatus(gamestatus.split(";")[3 + n].split(",")[0], 4 + t, i);
    UpdateSubGroup(3 + n, 0, r)
}

function GetCardSizeFlag(n) {
    return Decode(gamestatus.split(";")[3 + n].split(",")[0], 6)
}

function SetCardSizeFlag(n, t) {
    var i = UpdateCustomStatus(gamestatus.split(";")[3 + n].split(",")[0], 6, Encode(t));
    UpdateSubGroup(3 + n, 0, i)
}

function GetLocNamesFlag(n) {
    return Decode(gamestatus.split(";")[3 + n].split(",")[0], 7)
}

function SetLocNamesFlag(n, t) {
    var i = UpdateCustomStatus(gamestatus.split(";")[3 + n].split(",")[0], 7, Encode(t));
    UpdateSubGroup(3 + n, 0, i)
}

function SetWinnerFlag(n, t) {
    var i = UpdateCustomStatus(gamestatus.split(";")[3 + n].split(",")[0], 8, Encode(t));
    UpdateSubGroup(3 + n, 0, i)
}

function GetWithdrawResponse(n) {
    return gamestatus.split(";")[3 + n].split(",")[0].length < 10 ? 0 : Decode(gamestatus.split(";")[3 + n].split(",")[0], 9)
}

function SetWithdrawResponse(n, t) {
    if (!(gamestatus.split(";")[3 + n].split(",")[0].length < 10)) {
        var i = UpdateCustomStatus(gamestatus.split(";")[3 + n].split(",")[0], 9, Encode(t));
        UpdateSubGroup(3 + n, 0, i)
    }
}

function GetVulnSiegePrio(n, t) {
    return gamestatus.split(";")[3 + n].split(",")[0].length !== 12 ? 0 : t !== 0 && t !== 1 ? 0 : Decode(gamestatus.split(";")[3 + n].split(",")[0], 10 + t)
}

function SetVulnSiegePrio(n, t, i) {
    if (gamestatus.split(";")[3 + n].split(",")[0].length === 12 && (t === 0 || t === 1)) {
        var r = UpdateCustomStatus(gamestatus.split(";")[3 + n].split(",")[0], 10 + t, Encode(i));
        UpdateSubGroup(3 + n, 0, r)
    }
}

function GetMoney(n) {
    var t = gamestatus.split(";")[3 + n].split(",")[1];
    return parseInt(t, 10)
}

function SetMoney(n, t) {
    UpdateSubGroup(3 + n, 1, t.toString())
}

function GetHandCards(n) {
    return gamestatus.split(";")[3 + n].split(",")[2]
}

function SetHandCards(n, t) {
    UpdateSubGroup(3 + n, 2, t)
}

function GetReserve(n) {
    return gamestatus.split(";")[3 + n].split(",")[3]
}

function SetReserve(n, t) {
    UpdateSubGroup(3 + n, 3, t)
}

function GetDeck(n) {
    return gamestatus.split(";")[3 + n].split(",")[4]
}

function SetDeck(n, t) {
    UpdateSubGroup(3 + n, 4, t)
}

function GetDiscardPile(n) {
    return gamestatus.split(";")[3 + n].split(",")[5]
}

function SetDiscardPile(n, t) {
    UpdateSubGroup(3 + n, 5, t)
}

function GetSiegeCards(n, t) {
    return t < 0 || t > 1 ? "" : gamestatus.split(";")[3 + n].split(",")[6 + t]
}

function SetSiegeCards(n, t, i) {
    t < 0 || t > 1 || UpdateSubGroup(3 + n, 6 + t, i)
}

function GetAutoSetting(n, t) {
    return t < 0 || t > 1 ? "" : gamestatus.split(";")[3 + n].split(",")[8 + t]
}

function SetAutoSetting(n, t, i) {
    t < 0 || t > 1 || UpdateSubGroup(3 + n, 8 + t, i)
}

function SetPoints(n, t) {
    UpdateSubGroup(3 + n, 10, t.toString())
}

function GetMovesDoneBackup() {
    return gamestatus.split(";")[5]
}

function SetMovesDoneBackup(n) {
    UpdateGroup(5, n)
}

function AddMovesDoneAction(n) {
    var t = GetMovesDoneBackup(),
        i = t.length > 0 ? t + "," : t;
    i += n;
    SetMovesDoneBackup(i)
}

function UserGiveUp() {
    CancelMove();
    UpdateStatus(1, "2");
    SubmitForm()
}

function CancelMove() {
    ResetFlyInPos();
    optionsVisible = !1;
    draftVisible = !1;
    siegeLostVisible = !1;
    siegeCheckVisible = !1;
    oppResponseShown = !1;
    cardInfoVisible = !1;
    refillVisible = !1;
    lmVisible = !1;
    handUp = !0;
    cardDrafted = !1;
    oppHomeSettled = !1;
    wonByHomeSurrender = !1;
    penaltyCounter = 0;
    frenchStart = !1;
    campaignSelectionActive = !1;
    gameBoard = null;
    players = [];
    raidChecks = [];
    raidTargets = [];
    validChecks = [];
    validTarget = -1;
    siegesLost = [!1, !1];
    cardSizeBackup = 0;
    locNamesBackup = 0;
    ClearAllDivContainers();
    $("#actionBtn9").unbind();
    $("#actionBtn10").unbind();
    $("#actionBtn11").unbind();
    $("#actionBtn12").unbind();
    $("#actionBtn13").unbind();
    $("#actionBtn14").unbind();
    $("#actionBtn15").unbind();
    $("#actionBtn16").unbind();
    $("#actionBtn17").unbind();
    $("#actionBtn18").unbind();
    $("#actionBtn19").unbind();
    $("#actionBtn20").unbind();
    $("#mapBtn").unbind();
    $("#autoBtn").unbind();
    InitBoard()
}

function ResetFlyInPos() {
    optionsVisible && (handUp || ToggleHand(), $("#aOptDiv").animate({
        top: "+=480"
    }, 300, function() {}), $("#rOptDiv").animate({
        top: "+=480"
    }, 300, function() {}));
    draftVisible && $("#draftDiv").animate({
        top: "+=480"
    }, 300, function() {});
    cardInfoVisible && $("#cardInfoDiv").animate({
        top: "+=480"
    }, 300, function() {});
    refillVisible && $("#refillDiv").animate({
        top: "+=250"
    }, 200, function() {
        $("#refillDiv").html("")
    });
    siegeLostVisible && $("#siegeLostDiv").animate({
        top: "+=480"
    }, 300)
}

function InitBoard() {
    var n, i, r, u, f, t;
    if ((gamestatus = OrigStatus, MovesDone = "", UserIndex != OnTurnIndex && (IsActive = "False"), IsHistory && (LastMove = "", SetHistoryMove()), GetActivePlayer() === -1 && IsActive == "True" && (n = GetScenario(), n === 9 ? (campaignSelectionActive = !0, SetGamePhase(3)) : (SetActivePlayer(UserIndex), i = IsRandomRule(13) ? 1 : 0, (n === 2 || n === 8) && GetCampaign(UserIndex) !== i && (r = gamestatus.split(";")[3 + UserIndex], u = gamestatus.split(";")[3 + (UserIndex + 1) % 2], UpdateGroup(3 + UserIndex, u), UpdateGroup(3 + (UserIndex + 1) % 2, r)), IsRandomRule(22) && (empDataFR[0][1] = 0), IsRandomRule(13) && (frenchStart = !0, SetHandCards(UserIndex, ""), SetDeck(UserIndex, ""), SetGamePhase(1)))), ShowButtons(!0, !0), SetupGame(), ShowUI(), IsHistory || (f = document.getElementById("mapDiv"), f.scrollTop = 2e3), InitializeButtons(), SetupSituationalUserInterface(), t = GetRandomRules(), t.length > 0 && !campaignSelectionActive && ShowScenRules(t), !IsHistory) && IsActive == "True" && !lastMoveShown) {
        lastMoveShown = !0;
        try {
            ShowLastMoveInfo()
        } catch (e) {}
    }
}

function ShowCampaignSelection() {
    var t, i = GetRandomRules(),
        r = [Scen0, Scen1, Scen2, Scen3, Scen4, Scen5, Scen6, Scen7, Scen8, Scen9, Scen10, Scen11, Scen12, Scen13, Scen14, Scen15, Scen16, Scen17, Scen18, Scen19, Scen20, Scen21, Scen22, Scen23, Scen24, Scen25],
        n = "<p>" + StrSelectSide + "<\/p>",
        u = Lang === 0 ? "Briten" : "British",
        f = Lang === 0 ? "Franzosen" : "French";
    for (n += "<ul>", t = 0; t < i.length; t++) n += "<li>", n += r[Decode(i, t)], n += "<\/li>";
    n += "<\/ul>";
    n += "<br/><br/>";
    n += "<input id='selectBrits' type='button' name='selB' value='" + u + "' align='center'";
    n += " style='position:absolute;left:200px;top:310px;padding:1px;font-size:13px;width:120px;z-index:20'/>";
    n += "<input id='selectFrench' type='button' name='selF' value='" + f + "' align='center'";
    n += " style='position:absolute;left:340px;top:310px;padding:1px;font-size:13px;width:120px;z-index:20'/>";
    CreateDiv("sideSelDiv", "absolute", 900, "hidden", 60, 20, 680, 350, "#D9C58A", "", n, "boardContainer", "left");
    $("#sideSelDiv").css("border", "1px solid black").css("padding", "3px 3px 3px");
    $("#selectBrits").click(function() {
        ChooseSide(0)
    });
    $("#selectFrench").click(function() {
        ChooseSide(1)
    })
}

function ChooseSide(n) {
    var r = document.getElementById("boardContainer"),
        u = document.getElementById("sideSelDiv"),
        t, i;
    r.removeChild(u);
    GetCampaign(UserIndex) !== n && (t = gamestatus.split(";")[3 + UserIndex], i = gamestatus.split(";")[3 + (UserIndex + 1) % 2], UpdateGroup(3 + UserIndex, i), UpdateGroup(3 + (UserIndex + 1) % 2, t));
    AddMovesDoneAction("OS" + Encode(n));
    ShowInfoMessage(3, StrFinishTurn);
    ShowButtons(!1, !1)
}

function ShowScenRules(n) {
    for (var u = [s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20, s21, s22, s23, s24, s25], r = "", i, f, t = 0; t < n.length; t++) i = Decode(n, t), i >= 0 && i < u.length && (r += u[i], t < n.length - 1 && (r += ", "));
    f = Lang === 0 ? "Aktive Regeln:" : "Active Scenario Rules:";
    $("#scenRulesDiv").css("display", "").css("fontSize", "11px").draggable({
        distance: 30
    });
    $("#scenRulesDiv").css("cursor", "move").html("<b>" + f + "<\/b><br/>" + r)
}

function ShowButtons(n, t) {
    IsActive == "True" && (document.getElementById(BtnFinishTurnID).disabled = n, document.getElementById(BtnCancelMoveID).disabled = t)
}

function SetFinishButton(n) {
    IsActive == "True" && (document.getElementById(BtnFinishTurnID).disabled = !n)
}

function SetResetButton(n) {
    IsActive == "True" && (document.getElementById(BtnCancelMoveID).disabled = !n)
}

function FinishMove() {
    var n, r, t, u, i, f, e;
    if (!finishing) {
        finishing = !0;
        n = GetGamePhase();
        n === 2 && SetGamePhase(0);
        r = !1;
        t = -1;
        n !== 7 && (MovesDone = GetMovesDoneBackup());
        (n === 0 || n === 3) && SetMovesDoneBackup("");
        IsRandomRule(25) && n === 0 && players[UserIndex].deck.length === 0 && ReshuffleDiscardPile(!1);
        GetMultiFuncFlag() === 1 && players[UserIndex].campaign === 1 && n !== 6 && n !== 7 && (frenchStart || campaignSelectionActive || SetMultiFuncFlag(2));
        SaveGame();
        switch (n) {
            case 0:
                IsGameFinished() ? (UpdateStatus(1, "1"), r = !0) : t = (UserIndex + 1) % GameInfo.NumPlayers;
                break;
            case 1:
            case 6:
                t = (UserIndex + 1) % GameInfo.NumPlayers;
                break;
            case 2:
                t = (UserIndex + 1) % GameInfo.NumPlayers;
                break;
            case 3:
                u = IsRandomRule(13) ? 1 : 0;
                i = GetCampaign(UserIndex);
                t = i === u ? UserIndex : (UserIndex + 1) % GameInfo.NumPlayers;
                (i === 0 || i === 1) && SetScenario(4 + i);
                SetGamePhase(0);
                break;
            case 7:
                MovesDone.length === 0 && (MovesDone = "W" + Encode(GetAntiCheatFlag()));
                SetGamePhase(0);
                SetAntiCheatFlag(0);
                t = (UserIndex + 1) % GameInfo.NumPlayers;
                break;
            default:
                alert("Unknown game phase (FMV): " + n);
                return
        }
        r || (f = PlayerInfo[t].ID, e = document.getElementsByName("NextPlayer")[0], e.value = f);
        SubmitForm()
    }
}

function SubmitForm() {
    var n, t, i, r, u;
    if (!isGameValid) {
        try {
            alert(StrOutdatedStatusString)
        } catch (f) {}
        return
    }
    IsHistory || (n = document.getElementsByName("MoveInfo")[0], n.setAttribute("value", MovesDone), t = document.getElementsByName("NewStatus")[0], t.setAttribute("value", gamestatus), i = document.getElementsByName("lastSaveStatus")[0], i.setAttribute("value", lastSaveStatus), r = document.getElementById("frmGame"), u = document.getElementById("divPostback"), u.style.display = "", r.submit())
}

function IsGameFinished() {
    var t, i, n = (UserIndex + 1) % 2;
    return oppHomeSettled ? (SetWinnerFlag(UserIndex, 3), SetPoints(UserIndex, players[UserIndex].CalcPoints(!1)), SetPoints(n, players[n].CalcPoints(!1)), !0) : wonByHomeSurrender ? (SetWinnerFlag(n, 3), SetPoints(UserIndex, players[UserIndex].CalcPoints(!1)), SetPoints(n, players[n].CalcPoints(!1)), !0) : IsHomeSiegeWon(0) || IsHomeSiegeWon(1) ? (SetWinnerFlag(n, 3), SetPoints(UserIndex, players[UserIndex].CalcPoints(!1)), SetPoints(n, players[n].CalcPoints(!1)), !0) : gameBoard.IsSiegeActive(0) || gameBoard.IsSiegeActive(1) ? !1 : players[n].tokens[0] === 0 || players[n].tokens[1] === 0 ? (t = players[UserIndex].CalcPoints(!1), i = players[n].CalcPoints(!1), SetPoints(UserIndex, t), SetPoints(n, i), SetWinnerFlag(GetCampaignPlayer(1), 1), !0) : players[n].CalcPoints(!0) >= 12 ? (t = players[UserIndex].CalcPoints(!1), i = players[n].CalcPoints(!1), SetPoints(UserIndex, t), SetPoints(n, i), SetWinnerFlag(GetCampaignPlayer(1), 1), !0) : !1
}

function GetCampaignPlayer(n) {
    for (var t = 0; t < players.length; t++)
        if (players[t].campaign === n) return t
}

function SetHistoryMove() {
    moveNr === 0 ? (gamestatus = StartStatus, MovesDone = "") : (gamestatus = HistoryStatus[moveNr - 1], MovesDone = HistoryMove[moveNr - 1])
}

function HandleResize() {
    var i = GetWindowWidth(),
        r = GetWindowHeight(),
        n = document.getElementById("mainDiv"),
        t, e, u, f;
    if (n) {
        if (mainDivWidth = i >= 954 ? i - 2 : 952, mainDivHeight = r - 54 >= 580 ? r - 54 : 580, n.style.top = "20px", n.style.left = "0px", n.style.visibility = "visible", n.style.width = mainDivWidth + "px", n.style.height = mainDivHeight + "px", n = document.getElementById("mapDiv"), mapDivWidth = mainDivWidth - 3, mapDivHeight = mainDivHeight - 188, n.style.top = "46px", n.style.left = "0px", n.style.visibility = "visible", n.style.width = mapDivWidth + "px", n.style.height = mapDivHeight + "px", n = document.getElementById("oppDiv"), n.style.left = mapDivWidth - 660 + "px", n.style.width = "662px", n = document.getElementById("masterDiv"), n.style.left = "0px", n.style.width = mainDivWidth + "px", n.style.top = mainDivHeight - 140 + "px", n.style.height = "149px", n = document.getElementById("controlDiv"), n.style.left = mainDivWidth - 500 + "px", n.style.height = "140px", n.style.width = "502px", n = document.getElementById("aOptDiv"), n.style.left = mainDivWidth - 380 + "px", t = optionsVisible ? 610 : 130, n.style.top = mainDivHeight - t + "px", n = document.getElementById("rOptDiv"), n.style.left = mainDivWidth - 711 + "px", t = optionsVisible ? 610 : 130, n.style.top = mainDivHeight - t + "px", n = document.getElementById("draftDiv"), n.style.left = mainDivWidth - 490 + "px", t = draftVisible ? 610 : 130, n.style.top = mainDivHeight - t + "px", n = document.getElementById("cardInfoDiv"), n.style.left = mainDivWidth - 490 + "px", t = cardInfoVisible ? 610 : 130, n.style.top = mainDivHeight - t + "px", n = document.getElementById("refillDiv"), n.style.left = mainDivWidth - 290 + "px", t = refillVisible ? 380 : 130, n.style.top = mainDivHeight - t + "px", n = document.getElementById("siegeLostDiv"), n.style.left = mainDivWidth - 490 + "px", t = siegeLostVisible ? 610 : 130, n.style.top = mainDivHeight - t + "px", n = document.getElementById("siegeCheckDiv"), n.style.left = mainDivWidth - 490 + "px", t = siegeCheckVisible ? 340 : 130, n.style.top = mainDivHeight - t + "px", n = document.getElementById("oppResponseDiv"), n.style.left = mainDivWidth - 520 + "px", n = document.getElementById("lastMoveDiv"), n.style.left = mainDivWidth - 460 + "px", n = document.getElementById("handDiv"), n.style.left = "0px", handUp) try {
            e = cardSizeBackup === 0 ? 300 : 237;
            n.style.top = mainDivHeight - e + "px"
        } catch (o) {
            n.style.top = mainDivHeight - 300 + "px"
        } else n.style.top = mainDivHeight - 140 + "px";
        u = 875;
        n.style.width = u < mainDivWidth - 500 ? u + "px" : mainDivWidth - 500 + "px";
        f = 298;
        try {
            f = cardSizeBackup === 0 ? 298 : 235
        } catch (o) {}
        n.style.height = f + "px";
        SaveSize(i, r);
        FormatFooter()
    }
}

function Decode(n, t) {
    return n.charCodeAt(t) - 176
}

function Encode(n) {
    return String.fromCharCode(176 + n)
}

function UpdateStatus(n, t) {
    gamestatus = gamestatus.substr(0, n) + t + gamestatus.substr(n + t.length, gamestatus.length - n + t.length - 1)
}

function UpdateCustomStatus(n, t, i) {
    return n.substr(0, t) + i + n.substr(t + i.length, n.length - t + i.length - 1)
}

function UpdateGroup(n, t) {
    var i = gamestatus.split(";");
    i[n] = t;
    gamestatus = i.join(";")
}

function UpdateSubGroup(n, t, i) {
    var r = gamestatus.split(";"),
        f = gamestatus.split(";")[n],
        u = f.split(",");
    u[t] = i;
    r[n] = u.join(",");
    gamestatus = r.join(";")
}

function arrayShuffle() {
    for (var i, t, n = 0; n < this.length; n++) t = Math.floor(Math.random() * this.length), i = this[n], this[n] = this[t], this[t] = i
}

function numComparisonDesc(n, t) {
    return t - n
}

function HandleAntiCheat() {
    SaveGame();
    SetDBStatus();
    OrigStatus = gamestatus
}

function SetDBStatus() {
    return isGameValid ? ServiceSetDBStatusSecure(GameInfo.ID, GameInfo.PlayerOnTurn, gamestatus, lastSaveStatus) ? (lastSaveStatus = gamestatus, !0) : (isGameValid = !1, alert(StrOutdatedStatusString), !1) : !1
}

function GetLastMove(n) {
    for (var i = -1, t = 0; t < GameInfo.NumPlayers; t++)
        if (PlayerInfo[n].ID == LastMovesPID[t]) {
            i = t;
            break
        } return i == -1 ? null : LastMovesStatus[i]
}
0
function ShowLastMoveInfo() {
    if (!lmVisible) {
        lmVisible = !0;
        var t = (UserIndex + 1) % 2,
            n = IsHistory ? HistoryMove[moveNr - 1] : GetLastMove(t);
        n != null && n.length !== 0 && ($("#lastMoveDiv").html(CreateLastMoveInfo(t, n)), $("#closeLMInfo").click(function() {
            CloseLMInfo()
        }), $("#lastMoveDiv").animate({
            top: "+=422"
        }, 300, function() {}))
    }
}

function CreateLastMoveInfo(n, t) {
    var w = t.split(","),
        r, a, o, e, h, y, u, s = IsHistory ? GetHistMoveCampaign() : players[n].campaign,
        it = s === 0 ? locDataEN : locDataFR,
        tt = s === 0 ? empDataEN : empDataFR,
        f = "",
        i = "",
        g, b, l, k, v, nt, c, d, p;
    for (i += "<div style='position:absolute;top:10px;left:10px;width:387px;height:170px;border:1px solid black;overflow:auto;background-color:silver;font-size:13px'>", i += "<ul>", y = 0; y < w.length; y++)
        if (r = w[y], r.length !== 0) {
            if (w.length === 1) {
                if (r.length === 3) {
                    if (r.substr(0, 2) === "OS") {
                        f = Lang === 0 ? "Gegner hat seine Seite gew&auml;hlt:<\/br>" : "Opponent has chosen his side:<\/br>";
                        i += f;
                        i += "<b>";
                        g = Decode(r, 2);
                        b = "";
                        b = g === 0 ? Lang === 0 ? "Briten" : "British" : Lang === 0 ? "Franzosen" : "French";
                        i += b;
                        i += "<\/b>";
                        break
                    }
                    if (r.substr(0, 2) === "FC") {
                        f = Lang === 0 ? "Gegner (Franzose) hat eine Imperiumskarte zu seinem Startdeck hinzugef&uuml;gt:<\/br>" : "Opponent (French) added one empire card to his starting deck:<\/br>";
                        i += f;
                        i += "<b>";
                        e = r.substr(2, 1);
                        i += CalcLocTitle(s, e);
                        i += "<\/b>";
                        break
                    }
                    if (r.substr(0, 1) === "W") {
                        l = locationData[Decode(r, 1)][0];
                        f = Lang === 0 ? "<b>Au&szlig;erplanm&auml;&szlig;iger Gegnerzug:<\/b><br/><br/>" : "<b>Opponent&rsquo;s out-of-turn-action:<\/b><br/><br/>";
                        i += f;
                        f = Lang === 0 ? "Gegner hat eine Karte mit Siedlersymbol gespielt, um <i>" + l + "<\/i> zu besiedeln:<\/br>" : "Opponent played a card with settler symbol in order to settle <i>" + l + "<\/i>:<\/br>";
                        i += f;
                        i += "<b>";
                        e = r.substr(2, 1);
                        i += CalcLocTitle(s, e);
                        i += "<\/b>";
                        break
                    }
                }
                if (r.length === 2 && r.substr(0, 1) === "W") {
                    l = locationData[Decode(r, 1)][0];
                    f = Lang === 0 ? "<b>Au&szlig;erplanm&auml;&szlig;iger Gegnerzug:<\/b><br/><br/>" : "<b>Opponent&rsquo;s out-of-turn-action:<\/b><br/><br/>";
                    i += f;
                    f = Lang === 0 ? "Gegner hat keine Karte mit Siedlersymbol gespielt, um <i>" + l + "<\/i> zu besiedeln!<\/br>" : "Opponent did not play a card with settler symbol, and thus did not settle <i>" + l + "<\/i>!<\/br>";
                    i += f;
                    break
                }
            }
            a = Decode(r, 0);
            i += "<li>";
            switch (a) {
                case 0:
                    for (f = Lang === 0 ? "Gegner <b>siedelte an einem Ort<\/b>" : "Opponent <b>settled a location<\/b>", i += f + ": <i>" + locationData[Decode(r, 1)][0] + "<\/i><br/>", o = r.substr(2, r.length - 2), u = 0; u < o.length; u++) i += " <i>", e = r.substr(2 + u, 1), i += CalcLocTitle(s, e), u < o.length - 1 && (i += ","), i += "<\/i>";
                    break;
                case 1:
                    for (f = Lang === 0 ? "Gegner <b>entwickelte einen Ort<\/b>" : "Opponent <b>developed a location<\/b>", i += f + ": <i>" + locationData[Decode(r, 1)][0] + "<\/i><br/>", o = r.substr(2, r.length - 2), u = 0; u < o.length; u++) i += " <i>", e = r.substr(2 + u, 1), i += CalcLocTitle(s, e), u < o.length - 1 && (i += ","), i += "<\/i>";
                    break;
                case 2:
                    for (f = Lang === 0 ? "Gegner <b>befestigte einen Ort<\/b>" : "Opponent <b>fortified a location<\/b>", i += f + ": <i>" + locationData[Decode(r, 1)][0] + "<\/i><br/>", o = r.substr(2, r.length - 2), u = 0; u < o.length; u++) i += " <i>", e = r.substr(2 + u, 1), i += CalcLocTitle(s, e), u < o.length - 1 && (i += ","), i += "<\/i>";
                    break;
                case 3:
                    for (f = Lang === 0 ? "Gegner startete eine <span style='color:red'><b>Belagerung<\/b><\/span>" : "Opponent started a <span style='color:red'><b>Siege<\/b><\/span>", i += f + ": <i>" + locationData[Decode(r, 1)][0] + "<\/i><br/>", o = r.substr(2, r.length - 2), u = 0; u < o.length; u++) i += " <i>", e = r.substr(2 + u, 1), i += CalcLocTitle(s, e), u < o.length - 1 && (i += ","), i += "<\/i>";
                    break;
                case 4:
                    for (f = Lang === 0 ? "Gegner <span style='color:red'><b>verst&auml;rkte eine Bel.<\/b><\/span>" : "Opponent <span style='color:red'><b>reinforced a Siege<\/b><\/span>", i += f + ": <i>" + locationData[Decode(r, 1)][0] + "<\/i><br/>", o = r.substr(2, r.length - 2), u = 0; u < o.length; u++) i += " <i>", e = r.substr(2 + u, 1), i += CalcLocTitle(s, e), u < o.length - 1 && (i += ","), i += "<\/i>";
                    break;
                case 5:
                case 36:
                    if (f = Lang === 0 ? "Gegner f&uuml;hrte <span style='color:red'><b>&Uuml;berfall<\/b><\/span> durch" : "Opponent performed a <span style='color:red'><b>Raid<\/b><\/span>", r.substr(r.length - 2, 1) == "R") {
                        for (i += f + ": <i>" + locationData[Decode(r, 1)][0] + "<\/i><br/>", e = e = r.substr(2, 1), f = Lang === 0 ? "Gespielte Karten:" : "Cards played:", i += f, o = r.substr(2, r.length - 4), u = 0; u < o.length; u++) i += " <i>", e = r.substr(2 + u, 1), i += CalcLocTitle(s, e), IsNeutralCard(e) && (i += "&nbsp;<b>(N)<\/b>"), u < o.length - 1 && (i += ","), i += "<\/i>";
                        i += "<br/>";
                        e = r.substr(r.length - 1, 1);
                        f = Lang === 0 ? "&Uuml;berfall wurde blockiert durch" : "Raid has been blocked by";
                        i += f + ":<br/><i>";
                        i += CalcLocTitle((s + 1) % 2, e);
                        IsNeutralCard(e) && (i += " <b>(N)<\/b>");
                        i += "<\/i>";
                        a === 36 && (f = Lang === 0 ? "freie Aktion, da geblockt" : "free action (raid was blocked)", i += "<br/><span style='color:green'><b>" + f + "<\/b><\/span>")
                    } else if (r.substr(r.length - 2, 1) != "B")
                        for (i += f + ": <i>" + locationData[Decode(r, 1)][0] + "<\/i><br/>", e = e = r.substr(2, 1), f = Lang === 0 ? "Gespielte Karten :" : "Cards played :", i += f, o = r.substr(2, r.length - 2), u = 0; u < o.length; u++) i += " <i>", e = r.substr(2 + u, 1), i += CalcLocTitle(s, e), IsNeutralCard(e) && (i += "&nbsp;<b>(N)<\/b>"), u < o.length - 1 && (i += ","), i += "<\/i>";
                    break;
                case 6:
                case 35:
                    f = Lang === 0 ? "Gegner f&uuml;hrte <span style='color:red'><b>Hinterhalt<\/b><\/span> aus!" : "Opponent performed an <span style='color:red'><b>Ambush!<\/b><\/span>";
                    i += f + "<br/>";
                    o = r.substr(1, 1);
                    i += " <i>";
                    e = r.substr(1, 1);
                    i += CalcLocTitle(s, e);
                    i += "<\/i>";
                    IsNeutralCard(e) && (i += " <b>(N)<\/b>");
                    r.length === 3 && r.substr(2, 1) === "C" && (f = Lang === 0 ? "Keine Zielkarte: Handkarten wurden offengelegt!" : "No vulnerable card: your <b>hand<\/b> has been revealed!",
                    i += "<br/>" + f);
                    r.length === 4 && r.substr(2, 1) === "B" && (f = Lang === 0 ? "&Uuml;berfall wurde geblockt durch:" : "Ambush has been blocked by this card:",
                    i += "<br/>" + f + "<br/>",
                    i += "<i>" + CalcLocTitle((s + 1) % 2, r.substr(3, 1)) + "<\/i>",
                    IsNeutralCard(e) && (i += " <b>(N)<\/b>"),
                    a === 35 && (f = Lang === 0 ? "freie Aktion, da geblockt" : "free action (ambush was blocked)",
                    i += "<br/><span style='color:green'><b>" + f + "<\/b><\/span>"));
                    r.length === 5 && r.substr(2, 1) === "T" && (k = Decode(r, 4),
                    c = k === 0 ? "Reserve" : "Hand",
                    IsRandomRule(15) && k === 3 && (c = Lang === 0 ? "Belagerung" : "Siege"),
                    f = Lang === 0 ? "&Uuml;berfall erfolgreich: Diese Karte (aus " + c + ") wurde zur&uuml;ckgelegt:" : "Ambush was successful! This card (from " + c + ") has been put back to your avail. cards:",
                    i += "<br/>" + f + "<br/>",
                    i += "<i>" + CalcLocTitle((s + 1) % 2, r.substr(3, 1)) + "<\/i>");
                    break;
                case 7:
                    for (f = Lang === 0 ? "Gegner spielte <span style='color:red'><b>Heerf&uuml;hrer<\/b><\/span>" : "Opponent played <span style='color:red'><b>Military Leader<\/b><\/span>",
                    i += f + ": <i>" + locationData[Decode(r, 1)][0] + "<\/i><br/>",
                    o = r.substr(2, r.length - 2),
                    u = 0; u < o.length; u++)
                        i += " <i>",
                        e = r.substr(2 + u, 1),
                        i += CalcLocTitle(s, e),
                        u < o.length - 1 && (i += ","),
                        i += "<\/i>";
                    break;
                case 8:
                    v = "";
                    v = s === 0 ? Lang === 0 ? "Indian. F&uuml;hrer" : "Indian Leader" : Lang === 0 ? "Priester" : "Priest";
                    f = Lang === 0 ? "Gegner spielte <span style='color:black'><b>" + v + "<\/b>.<\/span>" : "Opponent played <span style='color:black'><b>" + v + "<\/b>.<\/span>";
                    i += f;
                    r.length === 5 && r.substr(2, 1) === "T" && (nt = Decode(r, 4),
                    c = nt === 0 ? "Reserve" : "Hand",
                    f = Lang === 0 ? " war erfolgreich! Karte (aus " + c + ") wurde vom Gegner genommen:<br/>" : " was successful! This card (from " + c + ") has been taken by opponent:<br/>",
                    i += "<br/>" + v + f,
                    i += "<i>" + CalcLocTitle((s + 1) % 2, r.substr(3, 1)) + "<\/i>",
                    IsNeutralCard(r.substr(3, 1)) && (i += " <b>(N)<\/b>"));
                    r.length === 3 && r.substr(2, 1) === "C" && (f = Lang === 0 ? "Keine Zielkarte vorhanden: Gegner sah <b>Handkarten<\/b> ein." : "No vulnerable card: your <b>hand<\/b> has been revealed!",
                    i += "<br/>" + f);
                    break;
                case 9:
                    for (f = Lang === 0 ? "Gegner nutzte Aktion <b>Einkommen<\/b>:" : "Opponent performed <b>money<\/b> action:",
                    i += f + "<br/>",
                    o = r.substr(1, r.length - 1),
                    h = 0,
                    u = 0; u < o.length; u++)
                        i += " <i>",
                        e = r.substr(1 + u, 1),
                        HasSymbol(s, 7, e) && h++,
                        HasSymbol(s, 8, e) && (h += 2),
                        HasSymbol(s, 9, e) && (h += 3),
                        i += CalcLocTitle(s, e),
                        i += "<\/i>";
                    i += " <b>(+" + h + ")<\/b><\/i>";
                    break;
                case 10:
                    for (f = Lang === 0 ? "Gegner nutzte Aktion <b>Kaufmann<\/b>:" : "Opponent performed <b>merchant<\/b> action:",
                    i += f + "<br/>",
                    o = r.substr(1, r.length - 1),
                    h = 0,
                    u = 0; u < o.length; u++)
                        i += " <i>",
                        e = r.substr(1 + u, 1),
                        u > 0 && (HasSymbol(s, 7, e) && h++,
                        HasSymbol(s, 8, e) && (h += 2),
                        HasSymbol(s, 9, e) && (h += 3)),
                        i += CalcLocTitle(s, e),
                        u < o.length - 1 && (i += ","),
                        i += "<\/i>";
                    i += " <b>(+" + h + ")<\/b>";
                    break;
                case 11:
                    for (f = Lang === 0 ? "Gegner nutzte Aktion <b>H&auml;ndler<\/b>:" : "Opponent performed <b>trader<\/b> action:",
                    i += f + "<br/>",
                    o = r.substr(1, r.length - 1),
                    h = 0,
                    u = 0; u < o.length; u++)   // o is remainder of string; u is index
                        i += " <i>",
                        e = r.substr(1 + u, 1), // e is the uth char of the remainder
                        u > 0 && (HasSymbol(s, 7, e) && h++,
                        HasSymbol(s, 8, e) && (h += 2),
                        HasSymbol(s, 9, e) && (h += 3)),
                        i += CalcLocTitle(s, e),
                        u < o.length - 1 && (i += ","),
                        i += "<\/i>";
                    i += " <b>(+" + (o.length - 1) * 2 + ")<\/b>";
                    break;
            case 12:
                for (f = Lang === 0 ? "Gegner nutzte Aktion <b>Piraterie<\/b>:" : "Opponent performed <b>piracy<\/b> action:",
                i += f + ":<br/>",
                o = r.substr(1, r.length - 1),
                u = 0; u < o.length; u++)
                    i += " <i>",
                    e = r.substr(1 + u, 1),
                    i += CalcLocTitle(s, e),
                    u < o.length - 1 && (i += ","),
                    i += "<\/i>";
                i += " <b>(+2)<\/b>";
                break;
                case 13:
                    f = Lang === 0 ? "Gegner <b>nahm eine Imp.karte<\/b>" : "Opponent <b>drafted an empire card<\/b>";
                    i += f + ":<br/>";
                    e = r.substr(1, 1);
                    i += "<i>" + CalcLocTitle(s, e) + "<\/i>";
                    IsNeutralCard(e) && (i += " <b>(N)<\/b>");
                    break;
                case 14:
                case 38:
                    for (f = Lang === 0 ? "Gegner <b>warf Handkarten ab<\/b>" : "Opponent <b>discarded hand cards<\/b>", i += f + ":<br/>", o = r.substr(1, r.length - 1), u = 0; u < o.length; u++) i += " <i>", e = r.substr(1 + u, 1), i += CalcLocTitle(s, e), u < o.length - 1 && (i += ","), i += "<\/i>";
                    a === 38 && (f = Lang === 0 ? "freie Aktion (Ort nicht kontrolliert)" : "free action (control was lost)", i += "<br/><span style='color:green'><b>" + f + "<\/b><\/span>");
                    break;
                case 15:
                    for (f = Lang === 0 ? "Gegner legte eine Karte in seine <b>Reserve<\/b>:" : "Opponent placed a card in his <b>reserve<\/b>:", i += f + "<br/>", o = r.substr(1, r.length - 1), u = 0; u < o.length; u++) i += " <i>", e = r.substr(1 + u, 1), i += CalcLocTitle(s, e), u < o.length - 1 && (i += ","), i += "<\/i>";
                    break;
                case 16:
                    for (f = Lang === 0 ? "Gegner <b>ruft Reserve ab<\/b>: (freie Aktion)" : "Opponent <b>retrieved his reserve<\/b>: (free action)", i += f + "<br/>", o = r.substr(1, r.length - 1), u = 0; u < o.length; u++) i += " <i>", e = r.substr(1 + u, 1), i += CalcLocTitle(s, e), u < o.length - 1 && (i += ","), i += "<\/i>";
                    break;
                case 17:
                    for (f = Lang === 0 ? "Gegner nutzte Aktion <b>Gouverneur<\/b>:" : "Opponent performed <b>Governor<\/b> action:", i += f + "<br/>", o = r.substr(1, r.length - 1), u = 0; u < o.length; u++) i += " <i>", e = r.substr(1 + u, 1), i += CalcLocTitle(s, e), u < o.length - 1 && (i += ","), i += "<\/i>";
                    break;
                case 18:
                    for (f = Lang === 0 ? "Gegner nutzte Aktion <b>Intendant<\/b>:" : "Opponent performed <b>Intendant<\/b> action:", i += f + "<br/>", o = r.substr(1, r.length - 1), u = 0; u < o.length; u++) i += " <i>", e = r.substr(1 + u, 1), i += CalcLocTitle(s, e), u < o.length - 1 && (i += ","), i += "<\/i>", IsNeutralCard(e) && (i += " <b>(N)<\/b>");
                    break;
                case 19:
                    f = Lang === 0 ? "Gegner nutzte Aktion <b>Heimatunterst&uuml;tzung<\/b>" : "Opponent performed <b>Home Support<\/b> action";
                    i += f + "<br/>";
                    break;
                case 20:
                    f = Lang === 0 ? "Gegner <b>passte<\/b>." : "Opponent <b>passed<\/b>.";
                    i += f + "<br/>";
                    break;
                case 21:
                    f = Lang === 0 ? "Gegner zog sich von <b>Belagerung<\/b> zur&uuml;ck:" : "Opponent performed <b>Withdraw<\/b> action:";
                    i += f + "<br/>";
                    i += locationData[Decode(r, 2)][0];
                    r.length === 4 && r.substr(3, 1) !== "-" && (d = "", p = r.substr(3, 1), d = IsNeutralCard(p) ? empTitles[empDataN[GetNeutralIndex(p)][2]] + " (N)" : empTitles[tt[GetEmpireIndex(s, p)][2]], i += "<br/><br/>", f = Lang === 0 ? "Gegner entfernte eine Belagerungskarte:<br/>" : "Opponent removed a siege card:<br/>", i += f, i += "<i>" + d + "<\/i>");
                    break;
                case 30:
                    f = Lang === 0 ? "<b>Belagerung<\/b> wurde gewonnen." : "Opponent won a <b>Siege<\/b>.";
                    i += f + "<br/>";
                    break;
                case 37:
                    f = Lang === 0 ? "Gegner nutzte freie Aktion <b>Felle<\/b>:" : "Opponent performed free <b>fur<\/b> action:";
                    i += f + "<br/>";
                    e = r.substr(1, 1);
                    h = 1;
                    i += " <i>";
                    i += CalcLocTitle(s, e);
                    i += " <\/i>";
                    i += " <b>(+" + h + ")<\/b>"
            }
            i += "<br/><br/><\/li>"
        } return i += "<\/ul><\/div>", i += "<input id='closeLMInfo' type='button' name='closeLM' value='" + StrClose + "'", i + " style='position:absolute;left:142px;top:192px;width:140px;padding:2px;font-size:14px'/>"
}

function CloseLMInfo() {
    $("#lastMoveDiv").animate({
        top: "-=422"
    }, 300, function() {
        $("#lastMoveDiv").html("");
        lmVisible = !1
    })
}

function CalcLocTitle(n, t) {
    var r = n === 0 ? locDataEN : locDataFR,
        u = n === 0 ? empDataEN : empDataFR,
        i = "";
    return IsLocationCard(n, t) ? (cardIndex = Decode(t, 0), i = locationData[r[cardIndex][0][2]][0]) : i = IsNeutralCard(t) ? empTitles[empDataN[GetNeutralIndex(t)][2]] : empTitles[u[GetEmpireIndex(n, t)][2]], i
}

function GetStartPlayerIndex() {
    for (var t = 0, n = 0; n < GameInfo.NumPlayers; n++)
        if (GameInfo.StartPlayer == PlayerInfo[n].ID) {
            t = n;
            break
        } return t
}

function GetHistMoveCampaign() {
    var n = GetStartPlayerIndex();
    return moveNr % 2 != 0 ? players[n].campaign : players[(n + 1) % 2].campaign
}
var gamestatus = "",
    lastSaveStatus = OrigStatus,
    isGameValid = !0,
    finishing = !1,
    gameBoard = null,
    players = [],
    raidChecks = [],
    raidTargets = [],
    validChecks = [],
    validTarget = -1,
    optionsVisible = !1,
    draftVisible = !1,
    siegeLostVisible = !1,
    siegeCheckVisible = !1,
    oppResponseShown = !1,
    cardInfoVisible = !1,
    refillVisible = !1,
    lmVisible = !1,
    handUp = !0,
    lastMoveShown = !1,
    siegesLost = [!1, !1],
    cardSizeBackup = 0,
    locNamesBackup = 0,
    cardDrafted = !1,
    oppHomeSettled = !1,
    wonByHomeSurrender = !1,
    penaltyCounter = 0,
    frenchStart = !1,
    campaignSelectionActive = !1,
    Britain = 0,
    France = 1,
    symbols = ["Bateaux", "Wagon", "Ship", "Fur", "Settler", "Ambush", "Military Strength", "Money", "Money", "Money"],
    mapActionStrings = [StrSettle, StrDevelop, StrFortify, StrBesiege, StrReinforce, StrRaid, StrAmbush, StrMLeader, StrPriest],
    locStrings = [StrLoc0, StrLoc1, StrLoc2, StrLoc3, StrLoc4, StrLoc5, StrLoc6, StrLoc7, StrLoc8, StrLoc9, StrLoc10, StrLoc11, StrLoc12, StrLoc13, StrLoc14, StrLoc15, StrLoc16, StrLoc17, StrLoc18, StrLoc19, StrLoc20, StrLoc21, StrLoc22, StrLoc23, StrLoc24, StrLoc25, StrLoc26, StrLoc27, StrLoc28, StrLoc29, StrLoc30, StrLoc31, StrLoc32, StrLoc33, StrLoc34, StrLoc35],
    locationData = [
        ["Boston", 1, 1, 2, !0, [11]],
        ["New&nbsp;Haven", 0, 1, 2, !0, [11]],
        ["New&nbsp;York", 1, 1, 2, !0, [7]],
        ["Norfolk", 0, 1, 2, !0, [29]],
        ["Pemaquid", 0, 1, 2, !0, [16]],
        ["Philadelphia", 0, 1, 2, !0, [10]],
        ["St.&nbsp;Mary&rsquo;s", 0, 1, 1, !0, [10]],
        ["Albany", 0, 0, 4, !0, [2, 20, 22]],
        ["Baltimore", 0, 1, 2, !0, [10]],
        ["Canso", 0, 1, 2, !0, [13]],
        ["Cumberland", 0, 0, 1, !0, [5, 6, 8, 14, 29]],
        ["Deerfield", 0, 0, 4, !0, [0, 1, 16, 22]],
        ["Detroit", 0, 0, 4, !0, [17, 18, 35]],
        ["Fort&nbsp;Beausejour", 0, 0, 0, !1, [9, 24, 28]],
        ["Fort&nbsp;Duquesne", 0, 0, 4, !1, [10, 21]],
        ["Fort&nbsp;Frontenac", 0, 0, 2, !1, [17, 27, 33]],
        ["Fort&nbsp;Halifax", 0, 0, 0, !1, [4, 11, 25]],
        ["Fort&nbsp;Niagara", 0, 0, 2, !1, [12, 15, 18, 27]],
        ["Fort&nbsp;Presqu&rsquo;Isle", 0, 0, 1, !1, [12, 17, 21]],
        ["Fort&nbsp;St.&nbsp;John", 0, 0, 0, !1, [31, 32, 33]],
        ["Fort&nbsp;Stanwix", 0, 0, 0, !1, [7, 27]],
        ["Fort&nbsp;Venango", 0, 0, 0, !1, [14, 18]],
        ["Fort&nbsp;William Henry", 0, 0, 0, !1, [7, 11, 31]],
        ["Gaspe", 0, 1, 1, !0, []],
        ["Halifax", 0, 1, 2, !0, [13]],
        ["Kennebec", 0, 0, 0, !1, [16, 34]],
        ["Louisbourg", 1, 1, 4, !0, []],
        ["Oswego", 0, 0, 2, !1, [15, 17, 20]],
        ["Port&nbsp;Royal", 0, 1, 3, !0, [13]],
        ["Richmond", 0, 0, 2, !0, [3, 10]],
        ["Tadoussac", 0, 1, 2, !0, []],
        ["Ticonderoga", 0, 0, 0, !1, [19, 22]],
        ["Trois&nbsp;Rivieres", 0, 0, 3, !0, [19, 33, 34]],
        ["Montreal", 1, 0, 4, !0, [15, 19, 32]],
        ["Quebec", 2, 1, 6, !0, [25, 32]],
        ["Michillimackinac", 0, 0, 2, !1, [12]]
    ],
    validCheckConns = [
        [1, 2, 3, 4, 5, 6, 8, 9, 13, 23, 24, 26, 28, 30, 32, 34],
        [0, 2, 3, 4, 5, 6, 8, 9, 13, 23, 24, 26, 28, 30, 32, 34, 11],
        [0, 1, 3, 4, 5, 6, 8, 9, 13, 23, 24, 26, 28, 30, 32, 34, 7],
        [0, 1, 2, 4, 5, 6, 8, 9, 13, 23, 24, 26, 28, 30, 32, 34, 29],
        [0, 1, 2, 3, 5, 6, 8, 9, 13, 23, 24, 26, 28, 30, 32, 34, 16],
        [0, 1, 2, 3, 4, 6, 8, 9, 13, 23, 24, 26, 28, 30, 32, 34],
        [0, 1, 2, 3, 4, 5, 8, 9, 13, 23, 24, 26, 28, 30, 32, 34, 10],
        [2, 20, 22],
        [0, 1, 2, 3, 4, 5, 6, 9, 13, 23, 24, 26, 28, 30, 32, 34],
        [0, 1, 2, 3, 4, 5, 6, 8, 13, 23, 24, 26, 28, 30, 32, 34],
        [6, 14],
        [1],
        [17, 18],
        [0, 1, 2, 3, 4, 5, 6, 8, 9, 23, 24, 26, 28, 30, 32, 34],
        [10, 21],
        [17, 27, 33],
        [4, 25],
        [12, 15, 18, 27],
        [12, 17, 21],
        [31, 32, 33],
        [7, 27],
        [14, 18],
        [7, 31],
        [0, 1, 2, 3, 4, 5, 6, 8, 9, 13, 24, 26, 28, 30, 32, 34],
        [0, 1, 2, 3, 4, 5, 6, 8, 9, 13, 23, 26, 28, 30, 32, 34],
        [16, 34],
        [0, 1, 2, 3, 4, 5, 6, 8, 9, 13, 23, 24, 28, 30, 32, 34],
        [15, 17, 20],
        [0, 1, 2, 3, 4, 5, 6, 8, 9, 13, 23, 24, 26, 30, 32, 34],
        [3],
        [0, 1, 2, 3, 4, 5, 6, 8, 9, 13, 23, 24, 26, 28, 32, 34],
        [19, 22],
        [0, 1, 2, 3, 4, 5, 6, 8, 9, 13, 23, 24, 26, 28, 30, 34, 33],
        [15, 19, 27, 32],
        [0, 1, 2, 3, 4, 5, 6, 8, 9, 13, 23, 24, 26, 28, 30, 32, 25],
        [12]
    ],
    locCoordEN = [
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [651, 771, 645, 767]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [519, 771, 513, 767]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [403, 751, 397, 747]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [63, 924, 57, 920]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [765, 703, 759, 699]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [302, 749, 296, 745]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [125, 811, 119, 807]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [524, 626, 518, 621]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [189, 739, 183, 734]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1316, 925, 1310, 920]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [102, 599, 97, 594]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [580, 682, 574, 677]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [59, 236, 53, 231]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1167, 769, 1161, 764]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [85, 499, 79, 494]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [475, 389, 469, 385]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [837, 642, 831, 637]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [295, 377, 289, 373]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [175, 372, 169, 368]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [705, 482, 699, 478]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [466, 536, 460, 532]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [156, 442, 150, 438]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [601, 585, 595, 581]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1329, 557, 1322, 550]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1139, 882, 1133, 877]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [872, 541, 866, 536]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1435, 908, 1429, 901]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [450, 455, 444, 452]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1043, 803, 1037, 799]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [30, 814, 24, 809]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1023, 410, 1017, 404]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [644, 543, 639, 539]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [786, 431, 781, 427]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [681, 435, 675, 430]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [868, 445, 862, 440]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [222, 1, 216, -2]
        ],
    ],
    locCoordFR = [
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [837, 245, 831, 241]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [970, 246, 964, 242]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1085, 264, 1079, 261]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1426, 92, 1420, 88]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [724, 314, 718, 310]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1187, 268, 1181, 264]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1364, 206, 1359, 202]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [966, 390, 960, 386]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1300, 277, 1294, 273]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [174, 92, 167, 87]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1387, 417, 1380, 412]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [909, 334, 903, 329]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1429, 780, 1424, 776]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [322, 247, 316, 243]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1404, 517, 1398, 513]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1014, 626, 1008, 621]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [652, 372, 646, 368]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1193, 637, 1188, 633]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1313, 642, 1307, 637]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [784, 533, 778, 529]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1022, 479, 1016, 474]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1332, 573, 1326, 569]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [888, 430, 882, 426]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [160, 461, 153, 456]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [350, 133, 344, 129]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [617, 473, 611, 469]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [54, 109, 48, 104]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1038, 560, 1032, 555]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [446, 214, 440, 210]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1459, 203, 1453, 199]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [466, 607, 460, 603]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [844, 473, 838, 469]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [703, 586, 696, 582]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [808, 582, 802, 578]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [621, 571, 614, 568]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1266, 1014, 1261, 1010]
        ],
    ],
    empTitles = [StrBateaux, StrFortification, StrGovernorString, StrHomeSupport, StrIndianLeader, StrMLeader, StrMilitia, StrRangers, StrInfantry, StrSettlers, StrShips, StrArtillery, StrTrader, StrCoureurs, StrIntendant, StrNativesString, StrPriest],
    locDataEN = [
        [
            [0, 0, 0],
            [
                [2, 2, 1, 4, 28, 24]
            ],
            [2, 4, 6, 9]
        ],
        [
            [1, 0, 1],
            [
                [0, 11],
                [2, 2, 0, 4]
            ],
            [2, 8]
        ],
        [
            [2, 0, 2],
            [
                [0, 7],
                [2, 5, 1, 0]
            ],
            [2, 4, 6, 9]
        ],
        [
            [3, 0, 3],
            [
                [0, 29],
                [2, 6, 8]
            ],
            [2, 8]
        ],
        [
            [4, 0, 4],
            [
                [0, 16],
                [2, 0, 1, 13, 28, 24]
            ],
            [3]
        ],
        [
            [5, 0, 5],
            [
                [2, 2, 1, 6, 8]
            ],
            [1, 4, 9]
        ],
        [
            [6, 0, 6],
            [
                [0, 29, 8, 10],
                [2, 3, 5]
            ],
            [0, 4]
        ],
        [
            [7, 1, 7],
            [
                [0, 22, 20, 2]
            ],
            [0, 3]
        ],
        [
            [8, 1, 8],
            [
                [0, 6],
                [2, 3, 5]
            ],
            [9]
        ],
        [
            [9, 1, 9],
            [
                [2, 24, 26, 28]
            ],
            [3]
        ],
        [
            [10, 1, 10],
            [
                [0, 6],
                [1, 14]
            ],
            []
        ],
        [
            [11, 1, 11],
            [
                [0, 1]
            ],
            [8]
        ],
        [
            [12, 1, 12],
            [
                [0, 35, 18]
            ],
            [3]
        ],
        [
            [13, 1, 13],
            [
                [2, 4, 28, 23, 24, 9]
            ],
            []
        ],
        [
            [14, 1, 14],
            [
                [0, 21],
                [1, 10]
            ],
            [0, 3]
        ],
        [
            [15, 1, 15],
            [
                [0, 33, 27, 17]
            ],
            [3]
        ],
        [
            [16, 1, 16],
            [
                [0, 4],
                [1, 25]
            ],
            []
        ],
        [
            [17, 1, 17],
            [
                [0, 15, 27, 18, 12]
            ],
            [3]
        ],
        [
            [18, 1, 18],
            [
                [0, 12, 17, 21]
            ],
            [3]
        ],
        [
            [19, 1, 19],
            [
                [0, 34, 31]
            ],
            [3]
        ],
        [
            [20, 1, 20],
            [
                [0, 27, 7]
            ],
            [0]
        ],
        [
            [21, 1, 21],
            [
                [0, 18, 14]
            ],
            [3]
        ],
        [
            [22, 1, 22],
            [
                [0, 31, 7]
            ],
            [0]
        ],
        [
            [23, 1, 23],
            [
                [2, 30, 26, 13]
            ],
            []
        ],
        [
            [24, 1, 24],
            [
                [2, 13, 28, 9, 26, 4]
            ],
            [2, 3]
        ],
        [
            [25, 1, 25],
            [],
            []
        ],
        [
            [26, 1, 26],
            [
                [2, 23, 30, 32, 34, 9, 24, 28, 13]
            ],
            []
        ],
        [
            [27, 1, 27],
            [
                [0, 15, 17, 20]
            ],
            [0, 3]
        ],
        [
            [28, 1, 28],
            [
                [2, 13, 24, 9, 4, 26]
            ],
            [2]
        ],
        [
            [29, 1, 29],
            [
                [0, 6, 3]
            ],
            [8]
        ],
        [
            [30, 1, 30],
            [
                [0, 34],
                [2, 23, 26]
            ],
            []
        ],
        [
            [31, 1, 31],
            [
                [0, 19, 22]
            ],
            [3]
        ],
        [
            [32, 1, 32],
            [
                [0, 34, 33, 19]
            ],
            [3]
        ]
    ],
    empDataEN = [
        [33, 1, 5, 5, !1, !0, !1, !1, !1, !1, 6, 1],
        [34, 1, 8, 7, !0, !1, !1, !1, !1, !1, 6, 2],
        [35, 1, 8, 7, !0, !1, !1, !1, !1, !1, 6, 2],
        [36, 1, 8, 7, !0, !1, !1, !1, !1, !1, 6, 2],
        [37, 1, 8, 7, !0, !1, !1, !1, !1, !1, 6, 2],
        [38, 1, 8, 7, !0, !1, !1, !1, !1, !1, 6, 2],
        [39, 1, 8, 7, !0, !1, !1, !1, !1, !1, 6, 2],
        [40, 1, 4, 2, !1, !1, !0, !1, !1, !1, -1, 0],
        [41, 1, 3, 5, !1, !0, !1, !1, !1, !1, -1, 0],
        [42, 1, 12, 0, !1, !1, !1, !1, !1, !1, -1, 0],
        [43, 1, 0, 0, !1, !1, !1, !1, !1, !1, 0, 1],
        [44, 1, 11, 8, !0, !1, !1, !1, !1, !1, 6, 3],
        [45, 1, 6, 2, !0, !1, !1, !1, !1, !1, 6, 1],
        [46, 1, 6, 2, !0, !1, !1, !1, !1, !1, 6, 1],
        [47, 1, 6, 2, !0, !1, !1, !1, !1, !1, 6, 1],
        [48, 1, 10, 6, !1, !1, !1, !1, !1, !1, 2, 1],
        [49, 1, 10, 6, !1, !1, !1, !1, !1, !1, 2, 1],
        [50, 1, 9, 5, !1, !1, !1, !1, !1, !1, 4, 1],
        [51, 1, 7, 5, !1, !1, !0, !0, !0, !0, 6, 1],
        [52, 1, 1, 0, !1, !1, !1, !1, !0, !1, 6, 1],
        [53, 1, 2, 0, !1, !1, !1, !1, !1, !1, -1, 0]
    ],
    locDataFR = [
        [
            [0, 0, 23],
            [
                [2, 13, 26, 30]
            ],
            [3]
        ],
        [
            [1, 0, 26],
            [
                [2, 9, 13, 23, 24, 28, 30, 32, 34]
            ],
            [2]
        ],
        [
            [2, 0, 33],
            [
                [0, 15, 19, 32]
            ],
            [0, 3, 6, 7]
        ],
        [
            [3, 0, 34],
            [
                [0, 25, 30, 32],
                [2, 23, 26]
            ],
            [2, 4, 6, 8]
        ],
        [
            [4, 0, 28],
            [
                [2, 4, 9, 13, 24, 26]
            ],
            [2, 7]
        ],
        [
            [5, 0, 30],
            [
                [0, 34],
                [2, 23, 26]
            ],
            [0, 3]
        ],
        [
            [6, 0, 32],
            [
                [0, 19, 33, 34]
            ],
            [0, 3, 7]
        ],
        [
            [7, 1, 7],
            [
                [0, 2, 20, 22]
            ],
            [0, 3]
        ],
        [
            [8, 1, 9],
            [
                [2, 24, 26, 28]
            ],
            [3]
        ],
        [
            [9, 1, 12],
            [
                [0, 18, 35]
            ],
            [0, 3]
        ],
        [
            [10, 1, 13],
            [
                [2, 4, 9, 23, 24, 28]
            ],
            [3]
        ],
        [
            [11, 1, 14],
            [
                [0, 21]
            ],
            [0, 3]
        ],
        [
            [12, 1, 15],
            [
                [0, 17, 27, 33]
            ],
            [0, 3]
        ],
        [
            [13, 1, 16],
            [0, 4],
            []
        ],
        [
            [14, 1, 17],
            [
                [0, 12, 15, 18, 27]
            ],
            [0, 3]
        ],
        [
            [15, 1, 18],
            [
                [0, 12, 17, 21]
            ],
            [0, 3]
        ],
        [
            [16, 1, 19],
            [
                [0, 31, 34]
            ],
            [0, 3]
        ],
        [
            [17, 1, 20],
            [
                [0, 7, 27]
            ],
            []
        ],
        [
            [18, 1, 21],
            [
                [0, 14, 18]
            ],
            [0, 3]
        ],
        [
            [19, 1, 22],
            [
                [0, 7, 31]
            ],
            [0]
        ],
        [
            [20, 1, 24],
            [
                [2, 4, 9, 13, 26, 28]
            ],
            [2, 3]
        ],
        [
            [21, 1, 25],
            [],
            []
        ],
        [
            [22, 1, 35],
            [
                [0, 12]
            ],
            [3]
        ],
        [
            [23, 1, 27],
            [
                [0, 15, 17, 20]
            ],
            [0, 3]
        ],
        [
            [24, 1, 4],
            [
                [0, 16],
                [2, 0, 13, 24, 28]
            ],
            [3]
        ],
        [
            [25, 1, 31],
            [
                [0, 19, 22]
            ],
            [0, 3]
        ]
    ],
    empDataFR = [
        [26, 1, 0, 0, !1, !1, !1, !1, !1, !1, 0, 1],
        [27, 0, 8, 0, !0, !1, !1, !1, !1, !1, 6, 2],
        [28, 0, 12, 0, !1, !1, !1, !1, !1, !1, -1, 0],
        [29, 1, 13, 0, !1, !1, !0, !0, !0, !0, 6, 1],
        [30, 1, 1, 0, !1, !1, !1, !1, !0, !1, 6, 1],
        [31, 1, 2, 0, !1, !1, !1, !1, !1, !1, -1, 0],
        [32, 1, 3, 5, !1, !0, !1, !1, !1, !1, -1, 0],
        [33, 1, 14, 0, !1, !1, !1, !1, !1, !1, -1, 0],
        [34, 1, 5, 5, !1, !0, !1, !1, !1, !1, 6, 1],
        [35, 1, 6, 2, !1, !1, !1, !1, !0, !0, 6, 1],
        [36, 1, 6, 2, !1, !1, !1, !1, !0, !0, 6, 1],
        [37, 1, 6, 2, !1, !1, !1, !1, !0, !0, 6, 1],
        [38, 1, 15, 0, !1, !1, !0, !0, !0, !0, -1, 0],
        [39, 1, 16, 2, !1, !1, !0, !1, !1, !1, -1, 0],
        [40, 1, 16, 2, !1, !1, !0, !1, !1, !1, -1, 0],
        [41, 1, 8, 7, !0, !1, !1, !1, !1, !1, 6, 2],
        [42, 1, 8, 7, !0, !1, !1, !1, !1, !1, 6, 2],
        [43, 1, 8, 7, !0, !1, !1, !1, !1, !1, 6, 2],
        [44, 1, 10, 6, !1, !1, !1, !1, !1, !1, 2, 1],
        [45, 1, 11, 8, !0, !1, !1, !1, !1, !1, 6, 3],
        [46, 1, 12, 0, !1, !1, !1, !1, !1, !1, -1, 0]
    ],
    empDataN = [
        ["A", 1, 1, 3, !1, !1, !1, !1, !0, !1, 6, 1],
        ["B", 1, 1, 3, !1, !1, !1, !1, !0, !1, 6, 1],
        ["C", 1, 15, 0, !1, !1, !0, !0, !0, !0, -1, 0],
        ["D", 1, 15, 0, !1, !1, !0, !0, !0, !0, -1, 0],
        ["E", 1, 15, 0, !1, !1, !0, !0, !0, !0, -1, 0],
        ["F", 1, 15, 0, !1, !1, !0, !0, !0, !0, -1, 0],
        ["G", 1, 15, 0, !1, !1, !0, !0, !0, !0, -1, 0],
        ["H", 1, 9, 7, !1, !1, !1, !1, !1, !1, 4, 1],
        ["I", 1, 9, 7, !1, !1, !1, !1, !1, !1, 4, 1]
    ],
    blockStringsA_EN = ["1.&nbsp;" + StrNatives2 + ", 2.&nbsp;Rangers", "1.&nbsp;Rangers, 2.&nbsp;" + StrNatives2],
    blockCardsA_EN = [
        [
            ["C", "D", "E", "F", "G"],
            [51]
        ],
        [
            [51],
            ["C", "D", "E", "F", "G"]
        ]
    ],
    blockStringsA_FR = ["1.&nbsp;" + StrNatives2 + ", 2.&nbsp;" + StrMilitia + ", 3.&nbsp;Courers", "1.&nbsp;" + StrNatives2 + ", 2.&nbsp;Coureurs, 3.&nbsp;" + StrMilitia, "1.&nbsp;Coureurs, 2.&nbsp;" + StrNatives2 + ", 3.&nbsp;" + StrMilitia, "1.&nbsp;Coureurs, 2.&nbsp;" + StrMilitia + ", 3.&nbsp;" + StrNatives2, "1.&nbsp;" + StrMilitia + ", 2.&nbsp;" + StrNatives2 + ", 3.&nbsp;Courers", "1.&nbsp;" + StrMilitia + ", 2.&nbsp;Coureurs, 3.&nbsp;" + StrNatives2, ],
    blockCardsA_FR = [
        [
            ["C", "D", "E", "F", "G", 38],
            [35, 36, 37],
            [29]
        ],
        [
            ["C", "D", "E", "F", "G", 38],
            [29],
            [35, 36, 37]
        ],
        [
            [29],
            ["C", "D", "E", "F", "G", 38],
            [35, 36, 37]
        ],
        [
            [29],
            [35, 36, 37],
            ["C", "D", "E", "F", "G", 38]
        ],
        [
            [35, 36, 37],
            ["C", "D", "E", "F", "G", 38],
            [29]
        ],
        [
            [35, 36, 37],
            [29],
            ["C", "D", "E", "F", "G", 38]
        ]
    ],
    targetStringsA_EN = ["1.&nbsp;" + StrMilitia + ", 2.&nbsp;" + StrInf + ", 3.&nbsp;" + StrArt, "1.&nbsp;" + StrMilitia + ", 2.&nbsp;" + StrArt + ", 3.&nbsp;" + StrInf, "1.&nbsp;" + StrInf + ", 2.&nbsp;" + StrMilitia + ", 3.&nbsp;" + StrArt, "1.&nbsp;" + StrInf + ", 2.&nbsp;" + StrArt + ", 3.&nbsp;" + StrMilitia, "1.&nbsp;" + StrArt + ", 2.&nbsp;" + StrMilitia + ", 3.&nbsp;" + StrInf, "1.&nbsp;" + StrArt + ", 2.&nbsp;" + StrInf + ", 3.&nbsp;" + StrMilitia],
    targetCardsA_EN = [
        [
            [45, 46, 47],
            [34, 35, 36, 37, 38, 39],
            [44]
        ],
        [
            [45, 46, 47],
            [44],
            [34, 35, 36, 37, 38, 39]
        ],
        [
            [34, 35, 36, 37, 38, 39],
            [45, 46, 47],
            [44]
        ],
        [
            [34, 35, 36, 37, 38, 39],
            [44],
            [45, 46, 47]
        ],
        [
            [44],
            [45, 46, 47],
            [34, 35, 36, 37, 38, 39]
        ],
        [
            [44],
            [34, 35, 36, 37, 38, 39],
            [45, 46, 47]
        ]
    ],
    targetStringsA_FR = ["1.&nbsp;" + StrInf + ", 2,&nbsp;" + StrArt, "1.&nbsp;" + StrArt + ", 2.&nbsp;" + StrInf],
    targetCardsA_FR = [
        [
            [27, 41, 42, 43],
            [45]
        ],
        [
            [45],
            [27, 41, 42, 43]
        ]
    ],
    blockStringsR_EN = [StrNativesString, StrLocCard, StrFortification, "Rangers"],
    blockCardsR_EN = [
        ["C", "D", "E", "F", "G"],
        [],
        [52, "A", "B"],
        [51]
    ],
    blockStringsR_FR = [StrNativesString, StrLocCard, StrFortification, StrMilitia, "Coureurs"],
    blockCardsR_FR = [
        ["C", "D", "E", "F", "G", 38],
        [],
        [30, "A", "B"],
        [35, 36, 37],
        [29]
    ],
    priestTargetCards = ["C", "D", "E", "F", "G"];
window.onresize = HandleResize;
Array.prototype.shuffle = arrayShuffle