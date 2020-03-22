# vim: set fileencoding=utf-8 :
"""I failed to commit changes from another computer. This file contains functions that
should be turned into methods.

From examining the JavaScript it becomes clear that the ASCII codes are offset by 176
then referenced in a huge JS case statement. See user-interface-notes.txt for more.

Use this link for all philip9999's AFAoS games (player ID: 404792):
https://yucata.de/data.jqdt?dataSource=RankingDetailsUser&UserID=404792&GameType=90&length=-1
or just use the UI from here (probably easier):
https://yucata.de/en/Ranking/philip9999

Earlier I thought something was changing under my feet. In
view-source:https://yucata.de/en/Game/FewAcresOfSnow/9547143
which became TEST_BED below, 4th move switched from
»Ì°²¶,½Í   to   ½Í,»Ì°²   which is almost switching the two.
"""

import pprint
import sys
print(sys.path)

from game_analyzer_adhoc import GameAnalyzer, GameHistory
from few_acres_of_snow.test_moves import moves9575653_fr

class FewAcresOfSnowHistory(GameHistory):
    pass

UK_CARDS = {
    '°': 'Boston',
    '±': 'New Haven',
    '²': 'New York',
    '³': 'Norfolk',
    '´': 'Pemaquid',
    'µ': 'Philadelphia',
    '¶': "St. Mary's",
    '·': 'Albany',
    None: 'Baltimore',
    '¹': 'Canso',
    None: 'Cumberland',
    '»': 'Deerfield',
    None: 'Detroit',
    None: 'Fort Beausejour',
    None: 'Fort Duquesne',
    None: 'Fort Frontenac',
    'À': 'Fort Halifax',
    None: 'Fort Niagara',
    None: 'Fort Presqu\'île',
    None: 'Fort St. John',
    None: 'Fort Stanwix',
    None: 'Fort Venango',
    'Æ': 'Fort William Henry',
    None: 'Gaspe',
    'È': 'Halifax',
    None: 'Kennebec',
    None: 'Louisbourg',
    None: 'Oswego',
    'Ì': 'Port Royal',
    'Í': 'Richmond',
    'Î': 'Tadoussac',
    None: 'Ticonderoga',
    None: 'Trois Rivieres',
    None: 'Michillimackinac',

    'Ó': 'Regular infantry',
    'Õ': 'Regular infantry',
    'Ö': 'Regular infantry',
    'Ò': 'Regular infantry',
    'Ô': 'Regular infantry',
    'ã': 'Rangers',

    'C': 'Native Americans',
    'D': 'Native Americans',
    'E': 'Native Americans',
    'F': 'Native Americans',
    'G': 'Native Americans',
    'H': 'Settlers',


    'Ø': 'Indian leader',
    'Ñ': 'Military leader',
    'Ý': 'Militia',
    'Þ': 'Militia',
    'å': 'Governor',
    'ä': 'Fortification (red)',

    # '´': 'Home support (UK) maybe',   ## Not most recent
    'Ù': 'home support',

}

FR_CARDS = {
    None: 'New Haven',
    None: 'Norfolk',
    None: 'Pemaquid',
    None: 'Philadelphia',
    None: "St. Mary's",
    None: 'Albany',
    None: 'Baltimore',
    None: 'Canso',
    None: 'Cumberland',
    None: 'Deerfield',
    None: 'Detroit',
    None: 'Fort Beausejour',
    None: 'Fort Duquesne',
    None: 'Fort Frontenac',
    None: 'Fort Halifax',
    None: 'Fort Niagara',
    '¿': "Fort Presqu'île",
    None: 'Fort St. John',
    None: 'Fort Stanwix',
    None: 'Fort Venango',
    None: 'Fort William Henry',
    '°': 'Gaspé',
    None: 'Halifax',
    None: 'Kennebec',
    '±': 'Louisbourg',
    None: 'Oswego',         # Ð old and suspect now HS
    '´': 'Port Royal',
    'Ç': 'Port Royal (sometimes?)',
    None: 'Richmond',
    'µ': 'Tadoussac',
    None: 'Ticonderoga',
    '¶': 'Trois Rivieres',
    '²': 'Montréal',
    '³': 'Quebec',
    None: 'Michillimackinac',

    'Ë': 'RegInf (free)',
    'Ù': 'Regular infantry',
    'Ú': 'Regular infantry',
    'Û': 'Regular infantry',
    'Ò': 'Military leader',

    'Ó': 'Militia',
    'Ö': 'Native Americans (blue)',
    'Ì': 'Trader/PR (siege)',
    'Í': 'Coureurs de Bois',
    'Ñ': 'Intendant',
    'Î': 'Fortification (blue)',
    'Ê': 'Bateaux (huh?)',

    'Ð': 'Home support',
    'Ï': 'Governor',

    '0': '[opponent w/draw] could mean UK siege or no card relinquished',

    '×': 'Priest',

}

ACTIONS = {
    0: 'settle',
    1: 'develop',
    2: 'fortify',
    3: 'besiege',
    4: 'reinforce siege',
    5: 'raid',
    # Following the order in game_FewAcresOfSnow
    36: 'raid',
    6: 'ambush',
    35: 'ambush',
    7: 'played Military Leader',
    8: 'played Indian Leader/Priest',
    9: 'money from',
    10: 'merchant',
    11: 'trade',
    12: 'piracy',
    13: 'draft',
    14: 'discard',
    38: 'discard',


    # '²': 'fortify (UK) or intendant (FR)',
    'Â': 'fortify (FR)',
    15: 'put into reserve',
    16: 'retrieve reserve',
    17: 'govern',
    18: 'use Intendant',
    19: 'home support',
    20: 'pass',
    21: 'withrdaw from siege',
    30: 'win a siege',
    35: 'free fur action',  #special rules
    # '¶': 'successful ambush apparently. First card is protagonist;
    # third card is the card that was returned to the deck, e.g. Ë =
    # free French infantry.
    # the second (T) and fourth (°) are unclear to me.
    '¶': 'successful ambush [see comments]',
    'Î': 'opponent withdrew from siege',
}

def raid(predicate):
    s = "upon {target} by {subject} {extra}".format(
        target=predicate[0],
        subject=predicate[1],
        extra='<TODO: what happened?>',
    )

def ambush(predicate):
    pass

# handlers for special actions. Perhaps this should be merged
# with the card dicts, except there shouldn't be too many.
# By default, we should just print out the names of the other cards.
FUNCTION_LOOKUP = {
    'µ': raid,
    '¶': ambush,
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
def action_code_to_action(code, which_side):
    cards_dict = {'uk': UK_CARDS, 'fr': FR_CARDS}[which_side.lower()]
    cards = "; ".join([cards_dict[c] if c in cards_dict.keys()
                       else c for c in code[1:]
                       ])
    # action = ACTIONS[code[0]] if code[0] in ACTIONS.keys() else code[0]
    char_code0 = ord(code[0]) - 176
    action = ACTIONS[char_code0] if char_code0 in ACTIONS.keys() else code[0] + str(char_code0)
    return "{action}: {cards}".format(action=action, cards=cards)

def move_to_actions(move, which_side):
    list_of_action_codes = move.split(',')
    return [action_code_to_action(ac, which_side) for ac in list_of_action_codes]

def file_to_history(filename):
    pass

def main():
    pass


def test1():
    players = ['uk', 'fr']
    i = 0
    try:
        with open('few_acres_of_snow/ph_9575653.js', 'r') as f:
            full_html = f.read()
    except:
        with open('ph_9575653.js', 'r') as f:
            full_html = f.read()

    history = FewAcresOfSnowHistory(full_html)
    print(history.basic_report())
    # print(["****" + ms for )

def test2():
    players = ['uk', 'fr']
    i = 0

    for test in moves9575653_fr:
        current = i % 2
        print("{}: move {}".format(players[current], i + 1))
        for action in move_to_actions(test, players[current]):
            print("-- {}".format(action))
        print()
        i += 1


if __name__ == "__main__":
    main()
    test2()


## FUN EXPLORATORY CODE
"""
// for France
function moo() {
HistoryStatus[1] = 
    '308°°²±°;²±²±±±±°°°°°°°°°°°°°°°°µ°°µ°µ°µ°µµ¶°;Ì,;°²°°--±±°°°°,12,±²´µ¶,,³,,°,,±°°°°,°°±²,;±²°°--±±°°°°,5,' + 
    x + x + ',,¶´±,,Ë,,±°°°°,°°±²,;';
    }
x='¿'; moo();
"""
