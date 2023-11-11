// Use this file for example JS that can be pasted into e.g. Chrome's Developer Tools.


function ShowPJRInfo(n, t, i, r, popupHeight = 480, slowness = 300) {
    (
        $("#cardInfoDiv").html(""),
            n !== 7 ?
                $("#cardInfoDiv").html(CreateCardInfo(n, t, i, r)) :
                $("#cardInfoDiv").html(CreatePointsInfo(t)),
            cardInfoVisible
    ) || (
        cardInfoVisible = !0, $("#cardInfoDiv").animate(
            {
                // At 50, barely pops up. Unclear how this works though; if the number is too low, it seems
                // like the first setting sticks, perhaps. We should disallow very low settings so the window doesn't get stuck.
                top: "-=" + popupHeight
            },
            slowness,
            function () {
            })
    )
}

ShowPJRInfo(2, 0, -1, -1, 480, 800)


// SLIGHTLY INTERESTING
// We can make the box print text.
function DoHelloWorld(n, t, i, r, popupHeight = 480, slowness = 300) {
    (
        $("#cardInfoDiv").html(""),
            n !== 7 ?
                $("#cardInfoDiv").html("Hello world") :
                $("#cardInfoDiv").html(CreatePointsInfo(t)),
            cardInfoVisible
    ) || (
        cardInfoVisible = !0, $("#cardInfoDiv").animate(
            {
                // At 50, barely pops up. Unclear how this works though; if the number is too low, it seems
                // like the first setting sticks, perhaps. We should disallow very low settings so the window doesn't get stuck.
                top: "-=" + popupHeight
            },
            slowness,
            function () {
            })
    )
}


function ShowBig(n, t, i, r,) {
    // $("#mainDiv").html(CreateCardInfo(n, t, i, r))
    $("#mainDiv").html("hello hello")
}

ShowBig(2, 0, -1, -1,)


// NOT INTERESTING
// This one doesn't really behave as expected. Where the previous one displayed Hellow world very large, this
// one won't put the CreateCardInfo there. It's just blank.
function AlsoBig(n, t, i, r, popupHeight = 480, slowness = 300) {
    (
        $("#mainDiv").html(""),
            n !== 7 ?
                $("#mainDiv").html(CreateCardInfo(n, t, i, r)) :
                $("#mainDiv").html(CreatePointsInfo(t)),
            cardInfoVisible
    ) || (
        cardInfoVisible = !0, $("#cardInfoDiv").animate(
            {
                // At 50, barely pops up. Unclear how this works though; if the number is too low, it seems
                // like the first setting sticks, perhaps. We should disallow very low settings so the window doesn't get stuck.
                top: "-=" + popupHeight
            },
            slowness,
            function () {
            })
    )
}

AlsoBig(2, 0, -1, -1,)


function PJRCreateCardInfo(n, t, i, r) {
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
        for (n === 1 && (e = GetSortedDeck(h), u += "<tr style='background-color:#D9C58A'>", u += "<td colspan='3' style='text-align:center'>" + StrSorted, u += "<\/td>", u += "<\/tr>"), f = 0; f < e.length; f++)
            o = e.substr(f, 1), a = IsNeutralCard(o) ? "#9DCC4D" : s === 0 ? "#EF9D77" : "#9DD7F2", u += "<tr style='background-color:" + a + "'>", u += "<td style='background-color:silver;text-align:right'><b>" + (f + 1) + ".<\/b><\/td>", u += "<td id='ciCard" + f + "'>", IsLocationCard(s, o) ? (l = Decode(e, f), u += locationData[b[l][0][2]][0]) : u += IsNeutralCard(o) ? empTitles[empDataN[GetNeutralIndex(o)][2]] : empTitles[y[GetEmpireIndex(s, o)][2]], u += "<\/td>", n === 4 && (u += "<td title='costs for drafting this card' style='cursor:default'>" + y[GetEmpireIndex(s, o)][3], u += "<\/td>"), u += "<\/tr>";
    for (
        u += "<\/table>",
            u += "<\/div>",
            u += " <img id='cInfoCardView' style='position:absolute;left:270px;top:70px;width:170px;height:263px;",
            u += "border:1px solid black' src='" + GameImagePath + "cards/back.jpg'/>",
            u += "<input id='closeCInfo' type='button' name='closeCI' value='" + StrClose + "'",
            u += " style='position:absolute;left:288px;top:364px;width:140px;padding:2px;font-size:14px'/>",
            // One little change...
            // $("#cardInfoDiv").append(u),
            $("#cardInfoDiv").append("<b>Hello from PJR</b>"),
            CustomOutput(u),
            $("#closeCInfo").click(function () {
                CloseCardInfo()
            }), p = "", f = 0; f < e.length; f++) o = e.substr(f, 1), IsNeutralCard(o) ? (l = o, p = "Neutral") : (l = Decode(e, f), p = s === 0 ? "British" : "French"), $("#ciCard" + f).mouseover(function (n, t) {
        return function () {
            ShowCardInfoCard(n, t)
        }
    }(l, p))
}

function CustomOutput(u) {
    console.log(u)
}

function ShowPJRInfo(n, t, i, r, popupHeight = 480, slowness = 300) {
    (
        $("#cardInfoDiv").html(""),
            n !== 7 ?
                $("#cardInfoDiv").html(PJRCreateCardInfo(n, t, i, r)) :
                $("#cardInfoDiv").html(CreatePointsInfo(t)),
            cardInfoVisible
    ) || (
        cardInfoVisible = !0, $("#cardInfoDiv").animate(
            {
                // At 50, barely pops up. Unclear how this works though; if the number is too low, it seems
                // like the first setting sticks, perhaps. We should disallow very low settings so the window doesn't get stuck.
                top: "-=" + popupHeight
            },
            slowness,
            function () {
            })
    )
}
