// Use this file for example JS that can be pasted into e.g. Chrome's Developer Tools.

function ShowPJRInfo(n, t, i, r, popupHeight = 480, slowness = 300) {
    ($("#cardInfoDiv").html(""),
        n !== 7
            ? $("#cardInfoDiv").html(CreateCardInfo(n, t, i, r))
            : $("#cardInfoDiv").html(CreatePointsInfo(t)),
        cardInfoVisible) ||
    ((cardInfoVisible = !0),
        $("#cardInfoDiv").animate(
            {
                // At 50, barely pops up. Unclear how this works though; if the number is too low, it seems
                // like the first setting sticks, perhaps. We should disallow very low settings so the window doesn't get stuck.
                top: "-=" + popupHeight,
            },
            slowness,
            function () {
            }
        ));
}

ShowPJRInfo(2, 0, -1, -1, 480, 800);

// SLIGHTLY INTERESTING
// We can make the box print text.
function DoHelloWorld(n, t, i, r, popupHeight = 480, slowness = 300) {
    ($("#cardInfoDiv").html(""),
        n !== 7
            ? $("#cardInfoDiv").html("Hello world")
            : $("#cardInfoDiv").html(CreatePointsInfo(t)),
        cardInfoVisible) ||
    ((cardInfoVisible = !0),
        $("#cardInfoDiv").animate(
            {
                // At 50, barely pops up. Unclear how this works though; if the number is too low, it seems
                // like the first setting sticks, perhaps. We should disallow very low settings so the window doesn't get stuck.
                top: "-=" + popupHeight,
            },
            slowness,
            function () {
            }
        ));
}

function ShowBig(n, t, i, r) {
    // $("#mainDiv").html(CreateCardInfo(n, t, i, r))
    $("#mainDiv").html("hello hello");
}

ShowBig(2, 0, -1, -1);

// NOT INTERESTING
// This one doesn't really behave as expected. Where the previous one displayed Hellow world very large, this
// one won't put the CreateCardInfo there. It's just blank.
function AlsoBig(n, t, i, r, popupHeight = 480, slowness = 300) {
    ($("#mainDiv").html(""),
        n !== 7
            ? $("#mainDiv").html(CreateCardInfo(n, t, i, r))
            : $("#mainDiv").html(CreatePointsInfo(t)),
        cardInfoVisible) ||
    ((cardInfoVisible = !0),
        $("#cardInfoDiv").animate(
            {
                // At 50, barely pops up. Unclear how this works though; if the number is too low, it seems
                // like the first setting sticks, perhaps. We should disallow very low settings so the window doesn't get stuck.
                top: "-=" + popupHeight,
            },
            slowness,
            function () {
            }
        ));
}

AlsoBig(2, 0, -1, -1);

function PJRCreateCardInfo(n, t, i, r) {
    // This is the function to create a mass of HTML from the card data in order to display it in the popup box.
    console.log(`n ${n}`);
    console.log(`t ${t}`);
    console.log(`i ${i}`);
    console.log(`r ${r}`);
    var h = t ? (UserIndex + 1) % 2 : UserIndex,
        e = "",
        c = "",
        v,
        w,
        p;
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
            Lang === 0
                ? ((v = r === 0 ? "(Brit. Spieler)" : "(Franz&ouml;s. Spieler)"),
                    (c = "Belagerungskarten " + v))
                : ((v = r === 0 ? "(British player)" : "(French player)"),
                    (c = "Siege cards " + v));
    }
    t && (c += " (" + StrOpponent + ")");
    var u = "",
        s = players[h].campaign,
        a = s === 0 ? "#EF9D77" : "#9DD7F2",
        b = s === 0 ? locDataEN : locDataFR,
        y = s === 0 ? empDataEN : empDataFR,
        o,
        l,
        f;
    const format1 =
        "<div style='position:absolute;top:70px;left:10px;width:240px;height:320px;border:1px solid black;overflow:auto;background-color:silver'>";
    const format2 = "<table border='1' cellpadding='4' style='width:100%'>";
    if (
        ((u += "<h2 align='center'>" + c + "</h2>"),
            // u += format1,
            // u += format2,
        e.length === 0)
    ) {
        console.log("I think this is the empty list text.");
        // u += "<tr style='background-color:" + a + "'><td><b>" + c + " " + StrIsEmpty + "<\/b><\/td><\/tr>";
        u +=
            "<div style='background-color:" +
            a +
            "'><b>" +
            c +
            " " +
            StrIsEmpty +
            "</b></div></br>";
    } else if (!IsHistory && ((n === 1 && t) || n === 5))
        // u += "<tr style='background-color:" + a + "'><td><b>" + StrHiddenInfo + "<\/b><br/>" + StrHiddenInfo2 + "<\/td><\/tr>";
        u +=
            "<tr style='background-color:" +
            a +
            "'><td><b> n === 1 && t || n === 5</b><br/>StrHiddenInfo" +
            StrHiddenInfo +
            "</b><br/>StrHiddenInfo2" +
            StrHiddenInfo2 +
            "</td></tr>";
    else if ((n === 1 && IsHistory) || n === 2) {
        for (
            w = 1,
                u += "<tr style='background-color:#D9C58A'>",
                u += "<td colspan='3' style='text-align:center'><b>" + StrTop + "</b>",
                u += "</td>",
                u += "</tr>",
                f = e.length - 1;
            f >= 0;
            f--
        )
            (o = e.substr(f, 1)),
                (a = IsNeutralCard(o) ? "#9DCC4D" : s === 0 ? "#EF9D77" : "#9DD7F2"),
                (u += "<tr style='background-color:" + a + "'>"),
                (u +=
                    "<td style='background-color:silver;text-align:right'><b>" +
                    w +
                    ".</b></td>"),
                (u += "<td id='ciCard" + f + "'>"),
                IsLocationCard(s, o)
                    ? ((l = Decode(e, f)), (u += locationData[b[l][0][2]][0]))
                    : (u += IsNeutralCard(o)
                        ? empTitles[empDataN[GetNeutralIndex(o)][2]]
                        : empTitles[y[GetEmpireIndex(s, o)][2]]),
                (u += "</td>"),
            n === 4 &&
            ((u +=
                "<td title='costs for drafting this card' style='cursor:default'>" +
                y[GetEmpireIndex(s, o)][3]),
                (u += "</td>")),
                (u += "</tr>"),
                w++;
        u += "<tr style='background-color:#D9C58A'>";
        u += "<td colspan='3' style='text-align:center'><b>" + StrBottom + "</b>";
        u += "</td>";
        u += "</tr>";
    } else
        for (
            n === 1 &&
            ((e = GetSortedDeck(h)),
                (u += "<tr style='background-color:#D9C58A'>"),
                (u += "<td colspan='3' style='text-align:center'>" + StrSorted),
                (u += "</td>"),
                (u += "</tr>")),
                f = 0;
            f < e.length;
            f++
        )
            (o = e.substr(f, 1)),
                (a = IsNeutralCard(o) ? "#9DCC4D" : s === 0 ? "#EF9D77" : "#9DD7F2"),
                (u += "<tr style='background-color:" + a + "'>"),
                (u +=
                    "<td style='background-color:silver;text-align:right'><b>" +
                    (f + 1) +
                    ".</b></td>"),
                (u += "<td id='ciCard" + f + "'>"),
                IsLocationCard(s, o)
                    ? ((l = Decode(e, f)), (u += locationData[b[l][0][2]][0]))
                    : (u += IsNeutralCard(o)
                        ? empTitles[empDataN[GetNeutralIndex(o)][2]]
                        : empTitles[y[GetEmpireIndex(s, o)][2]]),
                (u += "</td>"),
            n === 4 &&
            ((u +=
                "<td title='costs for drafting this card' style='cursor:default'>" +
                y[GetEmpireIndex(s, o)][3]),
                (u += "</td>")),
                (u += "</tr>");
    for (
        u += "</table>",
            u += "</div>",
            u +=
                " <img id='cInfoCardView' style='position:absolute;left:270px;top:70px;width:170px;height:263px;",
            u +=
                "border:1px solid black' src='" + GameImagePath + "cards/back.jpg'/>",
            u +=
                "<input id='closeCInfo' type='button' name='closeCI' value='" +
                StrClose +
                "'",
            u +=
                " style='position:absolute;left:288px;top:364px;width:140px;padding:2px;font-size:14px'/>",
            // One little change...
            // $("#cardInfoDiv").append(u),
            $("#cardInfoDiv").append("<b>Hello from PJR</b>"),
            CustomOutput(u),
            $("#closeCInfo").click(function () {
                CloseCardInfo();
            }),
            p = "",
            f = 0;
        f < e.length;
        f++
    )
        (o = e.substr(f, 1)),
            IsNeutralCard(o)
                ? ((l = o), (p = "Neutral"))
                : ((l = Decode(e, f)), (p = s === 0 ? "British" : "French")),
            $("#ciCard" + f).mouseover(
                (function (n, t) {
                    return function () {
                        ShowCardInfoCard(n, t);
                    };
                })(l, p)
            );
}

/*** PASTE IN FROM HERE ***/

function CustomOutput(u) {
    console.log(u);
}

function ShowPJRInfo(n, t, i, r, popupHeight = 480, slowness = 300) {
    console.log(`n is {n}`);
    ($("#cardInfoDiv").html(""),
        n !== 7
            ? $("#cardInfoDiv").html(PJRCreateCardInfo(n, t, i, r))
            : $("#cardInfoDiv").html(CreatePointsInfo(t)),
        cardInfoVisible) ||
    ((cardInfoVisible = !0),
        $("#cardInfoDiv").animate(
            {
                // At 50, barely pops up. Unclear how this works though; if the number is too low, it seems
                // like the first setting sticks, perhaps. We should disallow very low settings so the window doesn't get stuck.
                top: "-=" + popupHeight,
            },
            slowness,
            function () {
            }
        ));
}

// The above was pretty true to the original. Here's a stub to help figure the original out

function doLine309(o, e, f, l, p, s) {
    (o = e.substr(f, 1)),
        IsNeutralCard(o)
            ? ((l = o), (p = "Neutral"))
            : ((l = Decode(e, f)), (p = s === 0 ? "British" : "French")),
        $("#ciCard" + f).mouseover(
            (function (n, t) {
                return function () {
                    ShowCardInfoCard(n, t);
                };
            })(l, p)
        );
    return {o, l, p};
}

function doLine3161(
    oneWeirdChar,
    weirdString,
    sequence,
    cardNumber,
    whichSide,
    hereIsAlways1
) {
    (oneWeirdChar = weirdString.substr(sequence, 1)),
        IsNeutralCard(oneWeirdChar)
            ? ((cardNumber = oneWeirdChar), (whichSide = "Neutral"))
            : ((cardNumber = Decode(weirdString, sequence)),
                (whichSide = hereIsAlways1 === 0 ? "British" : "French")),
        $("#ciCard" + sequence).mouseover(
            (function (n, t) {
                return function () {
                    ShowCardInfoCard(n, t);
                };
            })(cardNumber, whichSide)
        );
    console.log(
        `********* [o, e, f, l, p, s] ${[
            oneWeirdChar,
            weirdString,
            sequence,
            cardNumber,
            whichSide,
            hereIsAlways1,
        ]}`
    );

    return {o: oneWeirdChar, l: cardNumber, p: whichSide};
}

function PJRCreateCardInfo(pile, isOpponent, i, r) {
    console.log(`n ${pile}`);
    console.log(`t ${isOpponent}`);
    console.log(`i ${i}`);
    console.log(`r ${r}`);

    var h = isOpponent ? (UserIndex + 1) % 2 : UserIndex,
        e = "",
        c = "",
        v,
        w,
        p;
    switch (pile) {
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
            Lang === 0
                ? ((v = r === 0 ? "(Brit. Spieler)" : "(Franz&ouml;s. Spieler)"),
                    (c = "Belagerungskarten " + v))
                : ((v = r === 0 ? "(British player)" : "(French player)"),
                    (c = "Siege cards " + v));
    }
    isOpponent && (c += " (" + StrOpponent + ")");
    var u = "",
        s = players[h].campaign,
        a = s === 0 ? "#EF9D77" : "#9DD7F2",
        b = s === 0 ? locDataEN : locDataFR,
        y = s === 0 ? empDataEN : empDataFR,
        o,
        l,
        f;

    function conditionForEmpty() {
        return (
            "<h2 align='center'>" + c + "</h2>",
                (u +=
                    "<div style='position:absolute;top:70px;left:10px;width:240px;height:320px;border:1px solid black;overflow:auto;background-color:silver'>"),
                (u += "<table border='1' cellpadding='4' style='width:100%'>"),
            e.length === 0
        );
    }

    if (conditionForEmpty())
        u +=
            "<tr style='background-color:" +
            a +
            "'><td><b>" +
            c +
            " " +
            StrIsEmpty +
            "</b></td></tr>";
    // else if (!IsHistory && (n === 1 && t || n === 5)) u +="<tr style='background-color:" + a + "'><td><b>" + StrHiddenInfo + "<\/b><br/>" + StrHiddenInfo2 + "<\/td><\/tr>";
    else if ((pile === 1 && IsHistory) || pile === 2) {
        console.log(
            `Apparently in the history OK or this is my hand OK case. n=${pile}`
        );
        console.log(`Hidden info: ${StrHiddenInfo} -- ${StrHiddenInfo2}`);
        for (
            w = 1,
                u += "<tr style='background-color:#D9C58A'>",
                u += "<td colspan='3' style='text-align:center'><b>" + StrTop + "</b>",
                u += "</td>",
                u += "</tr>",
                f = e.length - 1;
            f >= 0;
            f--
        )
            (o = e.substr(f, 1)),
                (a = IsNeutralCard(o) ? "#9DCC4D" : s === 0 ? "#EF9D77" : "#9DD7F2"),
                // u +="<tr style='background-color:" + a + "'>",
                // u +="<td style='background-color:silver;text-align:right'><b>" + w + ".<\/b><\/td>",
                (u += "<td id='ciCard" + f + "'>"),
                IsLocationCard(s, o)
                    ? ((l = Decode(e, f)), (u += locationData[b[l][0][2]][0]))
                    : (u += IsNeutralCard(o)
                        ? empTitles[empDataN[GetNeutralIndex(o)][2]]
                        : empTitles[y[GetEmpireIndex(s, o)][2]]),
                // u +="<\/td>", n === 4 && (u +="<td title='costs for drafting this card' style='cursor:default'>" + y[GetEmpireIndex(s, o)][3], u +="<\/td>"), u +="<\/tr>", w++;
                // u +="<tr style='background-color:#D9C58A'>";
                // u +="<td colspan='3' style='text-align:center'><b>" + StrBottom + "<\/b>";
                // u +="<\/td>";
                // u +="<\/tr>"

                // u = `<div>${Decode(e, f)}</div><div>${u}</div>`
                (u = `<div><br/><br/><br/><font size="30pt">${Decode(
                    e,
                    f
                )}</font><br/><br/><br/></div><div>${u}</div>`);
    } else
        for (
            pile === 1 &&
            ((e = GetSortedDeck(h)),
                (u += "<tr style='background-color:#D9C58A'>"),
                (u += "<td colspan='3' style='text-align:center'>" + StrSorted),
                (u += "</td>"),
                (u += "</tr>")),
                f = 0;
            f < e.length;
            f++
        )
            (o = e.substr(f, 1)),
                (a = IsNeutralCard(o) ? "#9DCC4D" : s === 0 ? "#EF9D77" : "#9DD7F2"),
                (u += "<tr style='background-color:" + a + "'>"),
                (u +=
                    "<td style='background-color:silver;text-align:right'><b>" +
                    (f + 1) +
                    ".</b></td>"),
                (u += "<td id='ciCard" + f + "'>"),
                IsLocationCard(s, o)
                    ? ((l = Decode(e, f)), (u += locationData[b[l][0][2]][0]))
                    : (u += IsNeutralCard(o)
                        ? empTitles[empDataN[GetNeutralIndex(o)][2]]
                        : empTitles[y[GetEmpireIndex(s, o)][2]]),
                (u += "</td>"),
            pile === 4 &&
            ((u +=
                "<td title='costs for drafting this card' style='cursor:default'>" +
                y[GetEmpireIndex(s, o)][3]),
                (u += "</td>")),
                (u += "</tr>");
    for (
        u += "</table>",
            u += "</div>",
            //
            u +=
                " <img id='cInfoCardView' style='position:absolute;left:270px;top:70px;width:170px;height:263px;",
            //
            u +=
                "border:1px solid black' src='" + GameImagePath + "cards/back.jpg'/>",
            // u += "<input id='closeCInfo' type='button' name='closeCI' value='" + StrClose + "'",
            // u += " style='position:absolute;left:288px;top:364px;width:140px;padding:2px;font-size:14px'/>",
            // One little change...
            $("#cardInfoDiv").append(u),
            // $("#cardInfoDiv").append("<b>Hello from PJR</b>"),
            CustomOutput(u),
            $("#closeCInfo").click(function () {
                CloseCardInfo();
            }),
            p = "",
            f = 0;
        f < e.length;
        f++
    ) {
        const __ret = doLine3161(o, e, f, l, p, s);
        o = __ret.o;
        l = __ret.l;
        p = __ret.p;
    }
}

const SELF = false,
    OPPONENT = true;
const RESERVE = 0,
    DECK = 1,
    DISCARD = 2,
    LOCATION = 3,
    EMPIRE = 4;
/** Then use it like this **/
ShowPJRInfo(EMPIRE, SELF, -1, -1);

/**
 * Example
 * n 3
 * VM1130:5 t false
 * VM1130:6 i -1
 * VM1130:7 r -1
 *
 */
/** and to dismiss **/
CloseCardInfo();

/**
 * TOP LEVEL
 */

function printHistory() {
    HistoryMove.forEach((weirdString, i) => {
        // I don't get what's the problem with the HistoryMove from index 0 here...
        if (i > 0) {
            // Keep in mind -- GetHistMoveCampaign() chooses based on move number.
            moveNr = i + 1;
            whichSide = GetHistMoveCampaign();
            console.log(`***** ${i} side: ${whichSide}*****`);
            console.log(textFromHistoryMove(weirdString, (i + 1) % 2));
            //   console.log(textFromHistoryStatus(HistoryStatus[i]));
        }
    });
}

function stripHtml(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

function textFromHistoryMove(hm, whichSide) {
    console.log(hm);
    [...hm].forEach((c, i) => {
            //   console.log(`Decoded char ${c} is ${Decode(hm, i)}`);
        }
    );
    console.log(`next action: ${strFromActionInt(Decode(hm[0]))}`);
    // return stripHtml(CreateLastMoveInfo(1, hm));
    return stripHtml(CreateLastMoveInfo(whichSide, hm));
}

function textFromHistoryStatus(hs) {
    // return stripHtml(CreateLastMoveInfo(0, hs));
//   console.log(`HISTORY STATUS: ${hs}`)
    return hs;
}

/** THE BEHEMOTH: Breaking it down */
// See CreateLastMoveInfo() on 3773
// Here is just the switch statement, munged into simpler text.

const Action = {
    SETTLE: "SETTLE",
    DEVELOP: "DEVELOP",
    MERCHANT: "MERCHANT",
    TRADER: "TRADER",
    FORTIFY: "FORTIFY",
    BEGIN_SIEGE: "BEGIN SIEGE",
}

function strFromActionInt(actionInt) {
    switch (actionInt) {
        case 0:
            return Action.SETTLE;
        case 1:
            return Action.DEVELOP;
        case 2:
            return Action.FORTIFY;
        case 3:
            return Action.BEGIN_SIEGE;
        case 10:
            return Action.MERCHANT;
        case 11:
            return Action.TRADER;
        // case 2:
        //     for (f = Lang === 0 ? "Gegner <b>befestigte einen Ort<\/b>" : "Opponent <b>fortified a location<\/b>", htmlToDisplay += f + ": <i>" + locationData[Decode(fullActionJumble, 1)][0] + "<\/i><br/>", actionPredicate = fullActionJumble.substr(2, fullActionJumble.length - 2), iLoc = 0; iLoc < actionPredicate.length; iLoc++) htmlToDisplay += " <i>", locationChar = fullActionJumble.substr(2 + iLoc, 1), htmlToDisplay += CalcLocTitle(s, locationChar), iLoc < actionPredicate.length - 1 && (htmlToDisplay += ","), htmlToDisplay += "<\/i>";
        //     break;
        // case 3:
        //     for (f = Lang === 0 ? "Gegner startete eine <span style='color:red'><b>Belagerung<\/b><\/span>" : "Opponent started a <span style='color:red'><b>Siege<\/b><\/span>", htmlToDisplay += f + ": <i>" + locationData[Decode(fullActionJumble, 1)][0] + "<\/i><br/>", actionPredicate = fullActionJumble.substr(2, fullActionJumble.length - 2), iLoc = 0; iLoc < actionPredicate.length; iLoc++) htmlToDisplay += " <i>", locationChar = fullActionJumble.substr(2 + iLoc, 1), htmlToDisplay += CalcLocTitle(s, locationChar), iLoc < actionPredicate.length - 1 && (htmlToDisplay += ","), htmlToDisplay += "<\/i>";
        //     break;
        // case 4:
        //     for (f = Lang === 0 ? "Gegner <span style='color:red'><b>verst&auml;rkte eine Bel.<\/b><\/span>" : "Opponent <span style='color:red'><b>reinforced a Siege<\/b><\/span>", htmlToDisplay += f + ": <i>" + locationData[Decode(fullActionJumble, 1)][0] + "<\/i><br/>", actionPredicate = fullActionJumble.substr(2, fullActionJumble.length - 2), iLoc = 0; iLoc < actionPredicate.length; iLoc++) htmlToDisplay += " <i>", locationChar = fullActionJumble.substr(2 + iLoc, 1), htmlToDisplay += CalcLocTitle(s, locationChar), iLoc < actionPredicate.length - 1 && (htmlToDisplay += ","), htmlToDisplay += "<\/i>";
        //     break;
        // case 5:
        // case 36:
        //     if (f = Lang === 0 ? "Gegner f&uuml;hrte <span style='color:red'><b>&Uuml;berfall<\/b><\/span> durch" : "Opponent performed a <span style='color:red'><b>Raid<\/b><\/span>", fullActionJumble.substr(fullActionJumble.length - 2, 1) == "R") {
        //         for (htmlToDisplay += f + ": <i>" + locationData[Decode(fullActionJumble, 1)][0] + "<\/i><br/>", locationChar = locationChar = fullActionJumble.substr(2, 1), f = Lang === 0 ? "Gespielte Karten:" : "Cards played:", htmlToDisplay += f, actionPredicate = fullActionJumble.substr(2, fullActionJumble.length - 4), iLoc = 0; iLoc < actionPredicate.length; iLoc++) htmlToDisplay += " <i>", locationChar = fullActionJumble.substr(2 + iLoc, 1), htmlToDisplay += CalcLocTitle(s, locationChar), IsNeutralCard(locationChar) && (htmlToDisplay += "&nbsp;<b>(N)<\/b>"), iLoc < actionPredicate.length - 1 && (htmlToDisplay += ","), htmlToDisplay += "<\/i>";
        //         htmlToDisplay += "<br/>";
        //         locationChar = fullActionJumble.substr(fullActionJumble.length - 1, 1);
        //         f = Lang === 0 ? "&Uuml;berfall wurde blockiert durch" : "Raid has been blocked by";
        //         htmlToDisplay += f + ":<br/><i>";
        //         htmlToDisplay += CalcLocTitle((s + 1) % 2, locationChar);
        //         IsNeutralCard(locationChar) && (htmlToDisplay += " <b>(N)<\/b>");
        //         htmlToDisplay += "<\/i>";
        //         actionInt === 36 && (f = Lang === 0 ? "freie Aktion, da geblockt" : "free action (raid was blocked)", htmlToDisplay += "<br/><span style='color:green'><b>" + f + "<\/b><\/span>")
        //     } else if (fullActionJumble.substr(fullActionJumble.length - 2, 1) != "B")
        //         for (htmlToDisplay += f + ": <i>" + locationData[Decode(fullActionJumble, 1)][0] + "<\/i><br/>", locationChar = locationChar = fullActionJumble.substr(2, 1), f = Lang === 0 ? "Gespielte Karten :" : "Cards played :", htmlToDisplay += f, actionPredicate = fullActionJumble.substr(2, fullActionJumble.length - 2), iLoc = 0; iLoc < actionPredicate.length; iLoc++) htmlToDisplay += " <i>", locationChar = fullActionJumble.substr(2 + iLoc, 1), htmlToDisplay += CalcLocTitle(s, locationChar), IsNeutralCard(locationChar) && (htmlToDisplay += "&nbsp;<b>(N)<\/b>"), iLoc < actionPredicate.length - 1 && (htmlToDisplay += ","), htmlToDisplay += "<\/i>";
        //     break;
        // case 6:
        // case 35:
        //     ({ f, htmlToDisplay, actionPredicate, locationChar, k, c } = handleAmbushAction(f, htmlToDisplay, actionPredicate, fullActionJumble, locationChar, s, actionInt, k, c));
        //     break;
        // case 7:
        //     for (f = Lang === 0 ? "Gegner spielte <span style='color:red'><b>Heerf&uuml;hrer<\/b><\/span>" : "Opponent played <span style='color:red'><b>Military Leader<\/b><\/span>",
        //             htmlToDisplay += f + ": <i>" + locationData[Decode(fullActionJumble, 1)][0] + "<\/i><br/>",
        //             actionPredicate = fullActionJumble.substr(2, fullActionJumble.length - 2),
        //             iLoc = 0; iLoc < actionPredicate.length; iLoc++)
        //         htmlToDisplay += " <i>",
        //             locationChar = fullActionJumble.substr(2 + iLoc, 1),
        //             htmlToDisplay += CalcLocTitle(s, locationChar),
        //         iLoc < actionPredicate.length - 1 && (htmlToDisplay += ","),
        //             htmlToDisplay += "<\/i>";
        //     break;
        // case 8:
        //     v = "";
        //     v = s === 0 ? Lang === 0 ? "Indian. F&uuml;hrer" : "Indian Leader" : Lang === 0 ? "Priester" : "Priest";
        //     f = Lang === 0 ? "Gegner spielte <span style='color:black'><b>" + v + "<\/b>.<\/span>" : "Opponent played <span style='color:black'><b>" + v + "<\/b>.<\/span>";
        //     htmlToDisplay += f;
        //     fullActionJumble.length === 5 && fullActionJumble.substr(2, 1) === "T" && (nt = Decode(fullActionJumble, 4),
        //         c = nt === 0 ? "Reserve" : "Hand",
        //         f = Lang === 0 ? " war erfolgreich! Karte (aus " + c + ") wurde vom Gegner genommen:<br/>" : " was successful! This card (from " + c + ") has been taken by opponent:<br/>",
        //         htmlToDisplay += "<br/>" + v + f,
        //         htmlToDisplay += "<i>" + CalcLocTitle((s + 1) % 2, fullActionJumble.substr(3, 1)) + "<\/i>",
        //     IsNeutralCard(fullActionJumble.substr(3, 1)) && (htmlToDisplay += " <b>(N)<\/b>"));
        //     fullActionJumble.length === 3 && fullActionJumble.substr(2, 1) === "C" && (f = Lang === 0 ? "Keine Zielkarte vorhanden: Gegner sah <b>Handkarten<\/b> ein." : "No vulnerable card: your <b>hand<\/b> has been revealed!",
        //         htmlToDisplay += "<br/>" + f);
        //     break;
        // case 9:
        //     for (f = Lang === 0 ? "Gegner nutzte Aktion <b>Einkommen<\/b>:" : "Opponent performed <b>money<\/b> action:",
        //             htmlToDisplay += f + "<br/>",
        //             actionPredicate = fullActionJumble.substr(1, fullActionJumble.length - 1),
        //             h = 0,
        //             iLoc = 0; iLoc < actionPredicate.length; iLoc++)
        //         htmlToDisplay += " <i>",
        //             locationChar = fullActionJumble.substr(1 + iLoc, 1),
        //         HasSymbol(s, 7, locationChar) && h++,
        //         HasSymbol(s, 8, locationChar) && (h += 2),
        //         HasSymbol(s, 9, locationChar) && (h += 3),
        //             htmlToDisplay += CalcLocTitle(s, locationChar),
        //             htmlToDisplay += "<\/i>";
        //     htmlToDisplay += " <b>(+" + h + ")<\/b><\/i>";
        //     break;
        // case 10:
        //     for (f = Lang === 0 ? "Gegner nutzte Aktion <b>Kaufmann<\/b>:" : "Opponent performed <b>merchant<\/b> action:",
        //             htmlToDisplay += f + "<br/>",
        //             actionPredicate = fullActionJumble.substr(1, fullActionJumble.length - 1),
        //             h = 0,
        //             iLoc = 0; iLoc < actionPredicate.length; iLoc++)
        //         htmlToDisplay += " <i>",
        //             locationChar = fullActionJumble.substr(1 + iLoc, 1),
        //         iLoc > 0 && (HasSymbol(s, 7, locationChar) && h++,
        //         HasSymbol(s, 8, locationChar) && (h += 2),
        //         HasSymbol(s, 9, locationChar) && (h += 3)),
        //             htmlToDisplay += CalcLocTitle(s, locationChar),
        //         iLoc < actionPredicate.length - 1 && (htmlToDisplay += ","),
        //             htmlToDisplay += "<\/i>";
        //     htmlToDisplay += " <b>(+" + h + ")<\/b>";
        //     break;
        // case 11:
        //     for (f = Lang === 0 ? "Gegner nutzte Aktion <b>H&auml;ndler<\/b>:" : "Opponent performed <b>trader<\/b> action:",
        //             htmlToDisplay += f + "<br/>",
        //             actionPredicate = fullActionJumble.substr(1, fullActionJumble.length - 1),
        //             h = 0,
        //             iLoc = 0; iLoc < actionPredicate.length; iLoc++)   // o is remainder of string; u is index
        //         htmlToDisplay += " <i>",
        //             locationChar = fullActionJumble.substr(1 + iLoc, 1), // e is the uth char of the remainder
        //         iLoc > 0 && (HasSymbol(s, 7, locationChar) && h++,
        //         HasSymbol(s, 8, locationChar) && (h += 2),
        //         HasSymbol(s, 9, locationChar) && (h += 3)),
        //             htmlToDisplay += CalcLocTitle(s, locationChar),
        //         iLoc < actionPredicate.length - 1 && (htmlToDisplay += ","),
        //             htmlToDisplay += "<\/i>";
        //     htmlToDisplay += " <b>(+" + (actionPredicate.length - 1) * 2 + ")<\/b>";
        //     break;
        case 12:
            return "perform PIRACY";
        // for (f = Lang === 0 ? "Gegner nutzte Aktion <b>Piraterie<\/b>:" : "Opponent performed <b>piracy<\/b> action:",
        //     htmlToDisplay += f + ":<br/>",
        //     actionPredicate = fullActionJumble.substr(1, fullActionJumble.length - 1),
        //     iLoc = 0; iLoc < actionPredicate.length; iLoc++)
        //         htmlToDisplay += " <i>",
        //         locationChar = fullActionJumble.substr(1 + iLoc, 1),
        //         htmlToDisplay += CalcLocTitle(s, locationChar),
        //         iLoc < actionPredicate.length - 1 && (htmlToDisplay += ","),
        //         htmlToDisplay += "<\/i>";
        //         htmlToDisplay += " <b>(+2)<\/b>";
        // break;

        // case 13:
        //     f = Lang === 0 ? "Gegner <b>nahm eine Imp.karte<\/b>" : "Opponent <b>drafted an empire card<\/b>";
        //     htmlToDisplay += f + ":<br/>";
        //     locationChar = fullActionJumble.substr(1, 1);
        //     htmlToDisplay += "<i>" + CalcLocTitle(s, locationChar) + "<\/i>";
        //     IsNeutralCard(locationChar) && (htmlToDisplay += " <b>(N)<\/b>");
        //     break;
        // case 14:
        // case 38:
        //     for (f = Lang === 0 ? "Gegner <b>warf Handkarten ab<\/b>" : "Opponent <b>discarded hand cards<\/b>", htmlToDisplay += f + ":<br/>", actionPredicate = fullActionJumble.substr(1, fullActionJumble.length - 1), iLoc = 0; iLoc < actionPredicate.length; iLoc++) htmlToDisplay += " <i>", locationChar = fullActionJumble.substr(1 + iLoc, 1), htmlToDisplay += CalcLocTitle(s, locationChar), iLoc < actionPredicate.length - 1 && (htmlToDisplay += ","), htmlToDisplay += "<\/i>";
        //     actionInt === 38 && (f = Lang === 0 ? "freie Aktion (Ort nicht kontrolliert)" : "free action (control was lost)", htmlToDisplay += "<br/><span style='color:green'><b>" + f + "<\/b><\/span>");
        //     break;
        // case 15:
        //     for (f = Lang === 0 ? "Gegner legte eine Karte in seine <b>Reserve<\/b>:" : "Opponent placed a card in his <b>reserve<\/b>:", htmlToDisplay += f + "<br/>", actionPredicate = fullActionJumble.substr(1, fullActionJumble.length - 1), iLoc = 0; iLoc < actionPredicate.length; iLoc++) htmlToDisplay += " <i>", locationChar = fullActionJumble.substr(1 + iLoc, 1), htmlToDisplay += CalcLocTitle(s, locationChar), iLoc < actionPredicate.length - 1 && (htmlToDisplay += ","), htmlToDisplay += "<\/i>";
        //     break;
        // case 16:
        //     for (f = Lang === 0 ? "Gegner <b>ruft Reserve ab<\/b>: (freie Aktion)" : "Opponent <b>retrieved his reserve<\/b>: (free action)", htmlToDisplay += f + "<br/>", actionPredicate = fullActionJumble.substr(1, fullActionJumble.length - 1), iLoc = 0; iLoc < actionPredicate.length; iLoc++) htmlToDisplay += " <i>", locationChar = fullActionJumble.substr(1 + iLoc, 1), htmlToDisplay += CalcLocTitle(s, locationChar), iLoc < actionPredicate.length - 1 && (htmlToDisplay += ","), htmlToDisplay += "<\/i>";
        //     break;
        // case 17:
        //     for (f = Lang === 0 ? "Gegner nutzte Aktion <b>Gouverneur<\/b>:" : "Opponent performed <b>Governor<\/b> action:", htmlToDisplay += f + "<br/>", actionPredicate = fullActionJumble.substr(1, fullActionJumble.length - 1), iLoc = 0; iLoc < actionPredicate.length; iLoc++) htmlToDisplay += " <i>", locationChar = fullActionJumble.substr(1 + iLoc, 1), htmlToDisplay += CalcLocTitle(s, locationChar), iLoc < actionPredicate.length - 1 && (htmlToDisplay += ","), htmlToDisplay += "<\/i>";
        //     break;
        // case 18:
        //     for (f = Lang === 0 ? "Gegner nutzte Aktion <b>Intendant<\/b>:" : "Opponent performed <b>Intendant<\/b> action:", htmlToDisplay += f + "<br/>", actionPredicate = fullActionJumble.substr(1, fullActionJumble.length - 1), iLoc = 0; iLoc < actionPredicate.length; iLoc++) htmlToDisplay += " <i>", locationChar = fullActionJumble.substr(1 + iLoc, 1), htmlToDisplay += CalcLocTitle(s, locationChar), iLoc < actionPredicate.length - 1 && (htmlToDisplay += ","), htmlToDisplay += "<\/i>", IsNeutralCard(locationChar) && (htmlToDisplay += " <b>(N)<\/b>");
        //     break;
        // case 19:
        //     f = Lang === 0 ? "Gegner nutzte Aktion <b>Heimatunterst&uuml;tzung<\/b>" : "Opponent performed <b>Home Support<\/b> action";
        //     htmlToDisplay += f + "<br/>";
        //     break;
        // case 20:
        //     f = Lang === 0 ? "Gegner <b>passte<\/b>." : "Opponent <b>passed<\/b>.";
        //     htmlToDisplay += f + "<br/>";
        //     break;
        // case 21:
        //     f = Lang === 0 ? "Gegner zog sich von <b>Belagerung<\/b> zur&uuml;ck:" : "Opponent performed <b>Withdraw<\/b> action:";
        //     htmlToDisplay += f + "<br/>";
        //     htmlToDisplay += locationData[Decode(fullActionJumble, 2)][0];
        //     fullActionJumble.length === 4 && fullActionJumble.substr(3, 1) !== "-" && (d = "", p = fullActionJumble.substr(3, 1), d = IsNeutralCard(p) ? empTitles[empDataN[GetNeutralIndex(p)][2]] + " (N)" : empTitles[tt[GetEmpireIndex(s, p)][2]], htmlToDisplay += "<br/><br/>", f = Lang === 0 ? "Gegner entfernte eine Belagerungskarte:<br/>" : "Opponent removed a siege card:<br/>", htmlToDisplay += f, htmlToDisplay += "<i>" + d + "<\/i>");
        //     break;
        // case 30:
        //     f = Lang === 0 ? "<b>Belagerung<\/b> wurde gewonnen." : "Opponent won a <b>Siege<\/b>.";
        //     htmlToDisplay += f + "<br/>";
        //     break;
        // case 37:
        //     f = Lang === 0 ? "Gegner nutzte freie Aktion <b>Felle<\/b>:" : "Opponent performed free <b>fur<\/b> action:";
        //     htmlToDisplay += f + "<br/>";
        //     locationChar = fullActionJumble.substr(1, 1);
        //     h = 1;
        //     htmlToDisplay += " <i>";
        //     htmlToDisplay += CalcLocTitle(s, locationChar);
        //     htmlToDisplay += " <\/i>";
        //     htmlToDisplay += " <b>(+" + h + ")<\/b>"
        default:
            return "CANNOT DETERMINE YET";
    }
}

/** STREAM OF CONSCIOUSNESS
 *
 // CreateLastMoveInfo args - turn one from my bad harness.
 n=0, t = '¼±´'
 // This is what drives the selection of location cards:
 // s = IsHistory ? GetHistMoveCampaign() : players[n].campaign,
 i is the incremental HTML built
 w = the split weird string (by comma); y is the iterator thru each.
 OS (choose sides) and FC (France adds Empire Card) are not releaseEvents.
 W might be if the siege settlement is counted as a move.

 key is a = Decode(r, 0)
 Decode '¼±´', 0 => 12


 **/