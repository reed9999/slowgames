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
      function () {}
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
      function () {}
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
      function () {}
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
      function () {}
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
  return { o, l, p };
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

  return { o: oneWeirdChar, l: cardNumber, p: whichSide };
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
      console.log(textFromHistoryMove(weirdString, (i + 1) % 2 ));
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
    [...hm].forEach( (c, i) => {
    //   console.log(`Decoded char ${c} is ${Decode(hm, i)}`);
     }
    );
    // return stripHtml(CreateLastMoveInfo(1, hm));
    return stripHtml(CreateLastMoveInfo(whichSide, hm));
  }

function textFromHistoryStatus(hs) {
  // return stripHtml(CreateLastMoveInfo(0, hs));
//   console.log(`HISTORY STATUS: ${hs}`)
  return hs;
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