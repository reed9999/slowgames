"""I failed to commit changes from another computer. This file contains functions that
should be turned into methods.

Use this link for all philip9999's AFAoS games (player ID: 404792):
https://yucata.de/data.jqdt?dataSource=RankingDetailsUser&UserID=404792&GameType=90&length=-1
or just use the UI from here (probably easier):
https://yucata.de/en/Ranking/philip9999
"""

import pprint

UK_CARDS = {    #  å·»
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
    None: 'Fort Halifax',
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
    'Ð': 'Oswego (dead)',
    # '´': 'Port Royal',
    'Ì': 'Port Royal',
    'Ç': 'Port Royal (dead maybe)',
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
    # 'Ì': 'Trader',
    None: 'Trader',
    'Í': 'Coureurs de Bois',
    'Ñ': 'Intendant',
    'Î': 'Fortification (blue)',
    '´': 'Home support',
    'Ê': 'Bateaux (huh?)',

}

ACTIONS = {
    '¹': 'money from',
    '²': 'fortify (UK) or intendant (FR)',     #UK at least
    '½': 'draft',
    '¼': 'piracy',
    '»': 'trade',
    '¾': 'discard',
    '¿': 'put into reserve',
    'À': 'retrieve reserve',
    'º': 'merchant',
    '°': 'settle',
    '±': 'develop',
    '³': 'besiege',
    '´': 'play to siege',
    'µ': 'raid',
}

def action_code_to_action(code, which_side):
    cards_dict = {'uk': UK_CARDS, 'fr': FR_CARDS}[which_side.lower()]
    cards = "; ".join([cards_dict[c] if c in cards_dict.keys()
                       else c for c in code[1:]
                       ])
    action = ACTIONS[code[0]] if code[0] in ACTIONS.keys() else code[0]
    return "{action}: {cards}".format(action=action, cards=cards)

def move_to_actions(move, which_side):
    list_of_action_codes = move.split(',')
    return [action_code_to_action(ac, which_side) for ac in list_of_action_codes]

def file_to_history(filename):
    pass

def main():
    pass

TEST_BED = [
    # 9547143
    'º³µ²',
    '¼±´',
    'º³µ°,½Ó',
    '»Ì°²¶,½Í',
    '°È´³¶,¹²',
    '¿Ë,¹³',
    '³Ì°±Ó,½Õ',
    'ÀË,´ÌË,¾°µ¶',
    '´ÌÕ,´Ì±',
    '´Ì²,½Ú',
    '´Ì²,¹µ',
    '´Ì±,»Ì°',
    '´ÌÈ,±´´¶',
    '´Ì³,½Ù',
    'º³µ°,½Ö',
    '´ÌÚ,½Î',
    '´ÌÖ,¹µ',

    '¶DC,½Ò',
    'Î0LÍDB,±±±²,½å',
    'ÀÏ,ÁÏ°,ÃÐ,»Ì¶',
    '¿Ý,¾Ê',
    'µ´DÖRC,¹³',
    'ÃÙ,¸ØC,µÒãE',
    'ÃÐ,»Ì²¶,¿Ò',
]

TEST_BED_02 = [
    '°È°³¶',
    '¿Ë',
    'º±²µ,½ä',
    '¹¶,½Î',
    '±³³¶,±´´°',
    '¼±´,¹²',
    '°·²¶µ,¹°',
    '»Ì²,±Îµ³',
    '²ÈäÈ,½H',
    '²Ì´Î,¹¶',
    'ºÈ³,¾´',
    '»Ì°¶,½Í',
    '²·ä·,°»±¶°',
    '²Ò³Î,¼±´',
    '±»»H,±µµ²',
    '¼±´,»Ì²µ',
    '±±±°,¿ä',
    '²ÇÎ°,±Ð¶³',
    '±ÈÈ¶,½C',
    '²Ð¶Î,¹´',
    '±··H,¹³',
    '±Ç°³,»Ìµ',
    '±¶¶²,½D',
    '»Ì²µ,½Ó',
    '½Ñ,½å',
    '²ÊÎ±,º³¶',
    'ºÈ±°,¾´',
    'º´¶,½Ö',
    'º³µ»,½Ò',
    '²ÎÎµ,»Ì°',
    '°¹È°H,ÄP',
    '±Ê±³,¿Ó',
    '¹²,¿å',
    '±Ñ²³,¾°',
    '°Æ·¶,µÑCDRÖ,Àäå',
    '»Ìµ,ÄP',
    'Áå±´,¿Ñ',
    '¹¶,½Ñ',
    'ÁåÈ,¾Ò',
    '¾±,¾µ',
    'µÑCDR²,¹°',        ## Raid on Montreal with two natives, failing.
    'µ¹ÍRä,½I',
    '°Í³¶²,¾H',
    'Â²,²ÑÎ²',
    '¹µ,½Ý',
    '±Ì´³,»Ì°¶',
    '¹²,¹»',
    '¾I,¾Ì',
    '¿Ý,¾·',
    '¾Î,ÄP',
    '±ÍÍ°,¾å',
    '¾°,¾Ñ',
    '±¹¹µ,¿Ò',
    '°¿²µ,¹¶',
]
def test():
    players = ['uk', 'fr']
    current = 0
    for test in TEST_BED_02:
        print(players[current])
        for action in move_to_actions(test, players[current]):
            print("-- {}".format(action))
        current = (current + 1) % 2

if __name__ == "__main__":
    main()
    test()


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