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

## These handlers need to precede the actions using them.
def raid(predicate):
    s = "upon {target} by {subject} {extra}".format(
        target=predicate[0],
        subject=predicate[1],
        extra='<TODO: what happened?>',
    )

def ambush(detail_code):
    pass

# Forward "declaration" (i.e. assignment) lets us keep all the card lists together.
UK_CARDS, FR_CARDS = None, None

# More handlers, stacked this way because of dependencies.
def simple_cards(detail_code, which_side):
    cards_dict = {'uk': UK_CARDS, 'fr': FR_CARDS}[which_side.lower()]
    cards = "; ".join([cards_dict[c] if c in cards_dict.keys()
                       else c for c in detail_code
                       ])
    return cards


def location_then_cards(detail_code):
    """For reinforce siege but I'll bet there are others. First the target
    location then cards played"""
    rv = LOCATIONS[ord(detail_code[0]) - 176] + " -- cards:"
    rv += simple_cards(detail_code[1:], 'fr')
    return rv

def win_siege(detail_code):
    if detail_code == '0XX':
        return "No empire cards for the losing side to relinquish"
    return "TODO: <{}>".format(detail_code)

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

    'Ù': 'Home Support',

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
    'Ì': 'Trader',
    'Í': 'Coureurs de Bois',
    'Ñ': 'Intendant',
    'Î': 'Fortification (blue)',
    'Ê': 'Bateaux (huh?)',

    'Ð': 'Home support',
    'Ï': 'Governor',

    '×': 'Priest',

}

ACTIONS = {
    # Following the order in game_FewAcresOfSnow
    0: ('settle', None, ),
    1: ('develop', None, ),
    2: ('fortify', None, ),
    3: ('besiege', None, ),
    4: ('reinforce siege', location_then_cards, ),
    5: ('raid', None, ),
    36: ('raid', None, ),
    6: ('ambush', None, ),
    35: ('ambush', None, ),
    7: ('played Military Leader', None, ),
    8: ('played Indian Leader/Priest', None, ),
    9: ('money from', None, ),
    10: ('merchant', None, ),
    11: ('trade', None, ),
    12: ('piracy', None, ),
    13: ('draft', None, ),
    14: ('discard', None, ),
    38: ('discard', None, ),
    15: ('put into reserve', None, ),
    16: ('retrieve reserve', None, ),
    17: ('govern', None, ),
    18: ('use Intendant', None, ),
    19: ('home support', None, ),
    20: ('pass', None, ),
    21: ('withrdaw from siege', None, ),
    30: ('win a siege', win_siege, ),
    35: ('free fur action', None, ),  #special rules

    # From here is legacy junk, to help troubleshoot why I couldn't figure this out before.
    # '¶': 'successful ambush apparently. First card is protagonist;
    # third card is the card that was returned to the deck, e.g. Ë =
    # free French infantry.
    # the second (T) and fourth (°) are unclear to me.


    # '²': 'fortify (UK) or intendant (FR)', None, ),
    'Â': ('fortify (FR)', None, ),
    '¶': ('successful ambush [see comments]', None, ),
    'Î': ('opponent withdrew from siege', None, ),
}

LOCATIONS = [
    "Boston",
    "New Haven",
    "New York",
    "Norfolk",
    "Pemaquid",
    "Philadelphia",
    "St. Mary's",
    "Albany",
    "Baltimore",
    "Canso",
    "Cumberland",
    "Deerfield",
    "Detroit",
    "Fort Beausejour",
    "Fort Duquesne",
    "Fort Frontenac",
    "Fort Halifax",
    "Fort Niagara",
    "Fort Presqu'Isle",
    "Fort St. John",
    "Fort Stanwix",
    "Fort Venango",
    "Fort William Henry",
    "Gaspe",
    "Halifax",
    "Kennebec",
    "Louisbourg",
    "Oswego",
    "Port Royal",
    "Richmond",
    "Tadoussac",
    "Ticonderoga",
    "Trois Rivieres",
    "Montreal",
    "Quebec",
    "Michillimackinac",
]



def action_code_to_action(code, which_side):
    ## TODO - extract out the simplest handler, what I'm calling cards here,
    # to be a default handler.
    # action = ACTIONS[code[0]] if code[0] in ACTIONS.keys() else code[0]
    char_code0 = ord(code[0]) - 176
    if char_code0 in ACTIONS.keys():
        action, handler = ACTIONS[char_code0]
    else:
        action = code[0] + " -- " + str(char_code0)
        handler = None
    return "{action}: {detail}".format(
        action=action, detail=(handler(code[1:]) if handler else
                               simple_cards(code[1:], which_side)))

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

    for test in moves9575653_fr[:20]:
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
