# General UI observations
The first interesting elements are naturally the top row indicators of things like fortresses left:
```html
<img id="fortDisc" alt="" src="/netimages/games/FewAcresOfSnow/fortDisc.png" ...>
```

Then a div called oppDiv with the opponent's dashboard. oppInfoDummy is the size of the discard pile, but naturally
we care more about the contents that appear when we click it.

We can go to Listeners (at the bottom) | click and see that this line 1 column 151358, or pretty line 4255.
arrayShuffle()
If I click I get an element called cardInfoDiv. This appears to be the name for Discard, Hand, etc.

Not sure the debugger is in the right place -- arrayShuffle looks like it just shuffles the cards. What about instead
go directly from https://yucata.de/bundles/game_FewAcresOfSnow?
See the bundle
SetHistoryMove() 3568
InitBoard() 3436
CancelMove() 3370
UserGiveUp() 3364


## Let's dig in the general bundle.
[https://yucata.de/bundles/gamebasescripts?v=ghzUIaYi8NYsbTVPWk0-nFQr2HGXK0MBBRn-6uF4rE41](here)
Actually it turns out InitBoard() is more often called from $(document).ready, line 804 of the HTML.


## A breakthrough about the extended ASCII characters

ShowLastMoveInfo() 3653 of beautified is probably more salient.
The big case statement at 3723 is where the weird characters are used.
Decode() is just return n.charCodeAt(t) - 176.
So there you go. That's the offset into this weird world.

Knowing the 176 offset, the case statement is easy to unwind. I'll just put it in the code.
Below I reproduce the intermediate-state conversion of the JavaScript switch/case into a Python dict, in order to
allow use of the German translations. But really we're fine without processing this for now.


## Trying to figure out empire cards
Note that empTitles empData and empDataN are the data about empire cards.
There are other functions about settlers and natives but frankly, aside from confirming natives
are C through G, they don't tell me much because they're so hard to debug.

empTitles on 4352 looks important. I believe the titles are set in the page itself, but knowing 
the order here probably refers to other things. grep empTitles site/game_FewAcresOfSnow.js|grep Decode is 
potentially useful. So is GetEmpireIndex. Apparently we deduct 176 from the ord(), then another 33 or 26 depending
on the player, and there we are.

Here's how it works. empDataEN column 2 is an index into empTitles. For example, row 0 is Military leader; row 1 begins
a series of 6 infantry; etc. MLead is 'Ñ'; ord('Ñ') is 209. Deduct 176 and 33, that gives 0. Row 0 points to
item 5 in the names. And there you go. Conveniently the order matches the order in the Empire Cards dialog
(assuming FR free infantry and trader are first, not sure which order) so no need for the last indexing.

### locationData and locData*
locationData() line 3980 refed on 3883 also interesting.

I think I made the fatal mistake of assuming that both UK and FR
would have the same location list. In fact it seems to also be 
derefenced in the same way via the fairly opaque locDataFR (4685) and
locDataEN. 

For example, let's say you want French location 2. 
Second record in locDataFR (4700) is:
```javascript
        [
            [2, 0, 33],
            [
                [0, 15, 19, 32]
            ],
            [0, 3, 6, 7]
        ],
```
The 33 in ```[2, 0, 33]``` points to locationData, line 4014, Montreal.
If decoded places are 23, 33, 30 then => Gaspe, Tadoussac, Mtl.

## and for location cards
`CalcLocTitle` is the function. See e.g. l 3845:
```javascript
i += CalcLocTitle(s, e),
```
i is the master string; s is unclear; e is the char corresponding to the card being
iterated through. 
# Trying to get interactive in the console

This didn't do much.

Wacky=CreateLastMoveInfo
function CreateLastMoveInfo (n, t) {
    console.log(n);
    console.log('--');
    console.log(t);
}

<div style='position:absolute;top:10px;left:10px;width:387px;height:170px;border:1px solid black;overflow:auto;background-color:silver;font-size:13px'><ul><li><br/><br/></li></ul></div><input id='closeLMInfo' type='button' name='closeLM' value='Close' style='position:absolute;left:142px;top:192px;width:140px;padding:2px;font-size:14px'/>"
Wacky("1", "1, 2, 3");
"<div style='position:absolute;top:10px;left:10px;width:387px;height:170px;border:1px solid black;overflow:auto;background-color:silver;font-size:13px'><ul><li><br/><br/></li><li><br/><br/></li><li><br/><br/></li></ul></div><input id='closeLMInfo' type='button' name='closeLM' value='Close' style='position:absolute;left:142px;top:192px;width:140px;padding:2px;font-size:14px'/>"






{
0:  ("<b>siedelte an einem Ort<\/b>" , "<b>settled a location<\/b>", ),
1:  ("<b>entwickelte einen Ort<\/b>" , "<b>developed a location<\/b>", ),
2:  ("<b>befestigte einen Ort<\/b>" , "<b>fortified a location" ),
3:  ("startete eine <span style='color:red'><b>Belagerung<\/b><\/span>" , "started a <span style='color:red'><b>Siege<\/b><\/span>", ),
4:  ("<span style='color:red'><b>verst&auml;rkte eine Bel.<\/b><\/span>" , "<span style='color:red'><b>reinforced a Siege<\/b><\/span>", ),
5:
36:
    ("Gegner f&uuml;hrte <span style='color:red'><b>&Uuml;berfall<\/b><\/span> durch" , "performed a <span style='color:red'><b>Raid<\/b><\/span>" ),ten :" : "Cards played :", ),
6:
35:
                    f = Lang === 0 ? "Gegner f&uuml;hrte <span style='color:red'><b>Hinterhalt<\/b><\/span> aus!" , "performed an <span style='color:red'><b>Ambush!<\/b><\/span>";
                    i += f + "<br/>";
                    o = r.substr(1, 1);
                    i += " <i>";
                    e = r.substr(1, 1);
                    i += CalcLocTitle(s, e);
                    i += "<\/i>";
                    IsNeutralCard(e) && (i += " <b>(N)<\/b>");
                    r.length === 3 && r.substr(2, 1) === "C" && (f = Lang === 0 ? "Keine Zielkarte: Handkarten wurden offengelegt!" : "No vulnerable card: your <b>hand<\/b> has been revealed!", i += "<br/>" + f);
                    r.length === 4 && r.substr(2, 1) === "B" && (f = Lang === 0 ? "&Uuml;berfall wurde geblockt durch:" : "Ambush has been blocked by this card:", i += "<br/>" + f + "<br/>", i += "<i>" + CalcLocTitle((s + 1) % 2, r.substr(3, 1)) + "<\/i>", IsNeutralCard(e) && (i += " <b>(N)<\/b>"), a === 35 && (f = Lang === 0 ? "freie Aktion, da geblockt" : "free action (ambush was blocked)", i += "<br/><span style='color:green'><b>" + f + "<\/b><\/span>"));
                    r.length === 5 && r.substr(2, 1) === "T" && (k = Decode(r, 4), c = k === 0 ? "Reserve" : "Hand", IsRandomRule(15) && k === 3 && (c = Lang === 0 ? "Belagerung" : "Siege"), f = Lang === 0 ? "&Uuml;berfall erfolgreich: Diese Karte (aus " + c + ") wurde zur&uuml;ckgelegt:" : "Ambush was successful! This card (from " + c + ") has been put back to your avail. cards:", i += "<br/>" + f + "<br/>", i += "<i>" + CalcLocTitle((s + 1) % 2, r.substr(3, 1)) + "<\/i>");
                    break;
7:  ("spielte <span style='color:red'><b>Heerf&uuml;hrer<\/b><\/span>" , "played <span style='color:red'><b>Military Leader<\/b><\/span>", ),
8:
                    v = "";
                    v = s === 0 ? Lang === 0 ? "Indian. F&uuml;hrer" : "Indian Leader" : Lang === 0 ? "Priester" : "Priest";
                    f = Lang === 0 ? "Gegner spielte <span style='color:black'><b>" + v + "<\/b>.<\/span>" , "played <span style='color:black'><b>" + v + "<\/b>.<\/span>";
                    i += f;
                    r.length === 5 && r.substr(2, 1) === "T" && (nt = Decode(r, 4), c = nt === 0 ? "Reserve" : "Hand", f = Lang === 0 ? " war erfolgreich! Karte (aus " + c + ") wurde vom Gegner genommen:<br/>" : " was successful! This card (from " + c + ") has been taken by opponent:<br/>", i += "<br/>" + v + f, i += "<i>" + CalcLocTitle((s + 1) % 2, r.substr(3, 1)) + "<\/i>", IsNeutralCard(r.substr(3, 1)) && (i += " <b>(N)<\/b>"));
                    r.length === 3 && r.substr(2, 1) === "C" && (f = Lang === 0 ? "Keine Zielkarte vorhanden: Gegner sah <b>Handkarten<\/b> ein." : "No vulnerable card: your <b>hand<\/b> has been revealed!", i += "<br/>" + f);
                    break;
9:  ("nutzte Aktion <b>Einkommen<\/b>:" , "performed <b>money<\/b> action:", i += f + "<br/>", o = r.substr(1, r.length - 1), h = 0, u = 0; u < o.length; u++) i += " <i>", e = r.substr(1 + u, 1), HasSymbol(s, 7, e) && h++, HasSymbol(s, 8, e) && (h += 2), HasSymbol(s, 9, e) && (h += 3), i += CalcLocTitle(s, e), i += "<\/i>";
                    i += " <b>(+" + h + ")<\/b><\/i>";
                    break;
10:  ("nutzte Aktion <b>Kaufmann<\/b>:" , "performed <b>merchant<\/b> action:", i += f + "<br/>", o = r.substr(1, r.length - 1), h = 0, u = 0; u < o.length; u++) i += " <i>", e = r.substr(1 + u, 1), u > 0 && (HasSymbol(s, 7, e) && h++, HasSymbol(s, 8, e) && (h += 2), HasSymbol(s, 9, e) && (h += 3)), i += CalcLocTitle(s, e), u < o.length - 1 && (i += ","), i += "<\/i>";
                    i += " <b>(+" + h + ")<\/b>";
                    break;
11:  ("nutzte Aktion <b>H&auml;ndler<\/b>:" , "performed <b>trader<\/b> action:", i += f + "<br/>", o = r.substr(1, r.length - 1), h = 0, u = 0; u < o.length; u++) i += " <i>", e = r.substr(1 + u, 1), u > 0 && (HasSymbol(s, 7, e) && h++, HasSymbol(s, 8, e) && (h += 2), HasSymbol(s, 9, e) && (h += 3)), i += CalcLocTitle(s, e), u < o.length - 1 && (i += ","), i += "<\/i>";
                    i += " <b>(+" + (o.length - 1) * 2 + ")<\/b>";
                    break;
12:  ("nutzte Aktion <b>Piraterie<\/b>:" , "performed <b>piracy<\/b> action:", i += f + ":<br/>", o = r.substr(1, r.length - 1), u = 0; u < o.length; u++) i += " <i>", e = r.substr(1 + u, 1), i += CalcLocTitle(s, e), u < o.length - 1 && (i += ","), i += "<\/i>";
                    i += " <b>(+2)<\/b>";
                    break;
13:
                    f = Lang === 0 ? "Gegner <b>nahm eine Imp.karte<\/b>" , "<b>drafted an empire card<\/b>";
                    i += f + ":<br/>";
                    e = r.substr(1, 1);
                    i += "<i>" + CalcLocTitle(s, e) + "<\/i>";
                    IsNeutralCard(e) && (i += " <b>(N)<\/b>");
                    break;
14:
38:  ("<b>warf Handkarten ab<\/b>" , "<b>discarded hand cards"),
                    a === 38 && (f = Lang === 0 ? "freie Aktion (Ort nicht kontrolliert)" : "free action (control was lost)", i += "<br/><span style='color:green'><b>" + f + "<\/b><\/span>");
                    break;
15:  ("legte eine Karte in seine <b>Reserve<\/b>:" , "placed a card in his <b>reserve<\/b>:", ),
16:  ("<b>ruft Reserve ab<\/b>: (freie Aktion)" , "<b>retrieved his reserve<\/b>: (free action)", ),
17:  ("nutzte Aktion <b>Gouverneur<\/b>:" , "performed <b>Governor<\/b> action:", ),
18:  ("nutzte Aktion <b>Intendant<\/b>:" , "performed <b>Intendant<\/b> action:", ),
19:
                    f = Lang === 0 ? "Gegner nutzte Aktion <b>Heimatunterst&uuml;tzung<\/b>" , "performed <b>Home Support<\/b> action";
                    i += f + "<br/>";
                    break;
20:
                    f = Lang === 0 ? "Gegner <b>passte<\/b>." , "<b>passed<\/b>.";
                    i += f + "<br/>";
                    break;
21:
                    f = Lang === 0 ? "Gegner zog sich von <b>Belagerung<\/b> zur&uuml;ck:" , "performed <b>Withdraw<\/b> action:";
                    i += f + "<br/>";
                    i += locationData[Decode(r, 2)][0];
                    r.length === 4 && r.substr(3, 1) !== "-" && (d = "", p = r.substr(3, 1), d = IsNeutralCard(p) ? empTitles[empDataN[GetNeutralIndex(p)][2]] + " (N)" : empTitles[tt[GetEmpireIndex(s, p)][2]], i += "<br/><br/>", f = Lang === 0 ? "Gegner entfernte eine Belagerungskarte:<br/>" , "removed a siege card:<br/>", ),
30:
                    f = Lang === 0 ? "<b>Belagerung<\/b> wurde gewonnen." , "won a <b>Siege<\/b>.";
                    i += f + "<br/>";
                    break;
37:
                    f = Lang === 0 ? "Gegner nutzte freie Aktion <b>Felle<\/b>:" , "performed free <b>fur<\/b> action:";
                    i += f + "<br/>";
                    e = r.substr(1, 1);
                    h = 1;
                    i += " <i>";
                    i += CalcLocTitle(s, e);
                    i += " <\/i>";
                    i += " <b>(+" + h + ")<\/b>"

    }


RAID_AND_AMBUSH_NOTES = """
These require more research.

RAID:
µÒCR³ - Attempted raid on Qbc (³) by natives (C) defended by location card (³).
µÒãRÖ - Attempted raid, unclear on where, by Rangers (ã), defended by natives (Ö)
µÌãRÍ - Attempted raid on Pt Royal (Ì) by Rangers defended by Coureurs (Í).
µÌC - Successful raid on Pt Royal by natives (C)

It could be that Ò is a UK code for Qbc. It seems to also be an infantry card, thus
the character could be recycled.

AMBUSH:
¶ãTË° - Ambush by Rangers (ã) took out free inf (Ë).
"""

INTENDANT_NOTES = """
²ÒÎ³ means intendant pulled out Quebec. No idea what ÒÎ mean here.
"""
