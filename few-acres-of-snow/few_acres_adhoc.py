"""I failed to commit changes from another computer. This file contains functions that
should be turned into methods."""

UK_CARDS = {
    None: 'Boston',
    '±': 'New Haven',
    None: 'New York',
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
    None: 'Fort Presqu\'île',
    None: 'Fort St. John',
    None: 'Fort Stanwix',
    None: 'Fort Venango',
    None: 'Fort William Henry',
    None: 'Gaspe',
    None: 'Halifax',
    None: 'Kennebec',
    None: 'Louisbourg',
    None: 'Oswego',
    None: 'Port Royal',
    None: 'Richmond',
    None: 'Tadoussac',
    None: 'Ticonderoga',
    None: 'Trois Rivieres',
    None: 'Michillimackinac',

    'ã': 'Rangers',

    # ° Gaspé
    # ² Montréal
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
    None: 'Fort Presqu\'île',
    None: 'Fort St. John',
    None: 'Fort Stanwix',
    None: 'Fort Venango',
    None: 'Fort William Henry',
    '°': 'Gaspé',
    None: 'Halifax',
    None: 'Kennebec',
    '±': 'Louisbourg',
    None: 'Oswego',
    '´': 'Port Royal',
    None: 'Richmond',
    'µ': 'Tadoussac',
    None: 'Ticonderoga',
    '¶': 'Trois Rivieres',
    '²': 'Montréal',
    '³': 'Quebec',
    None: 'Michillimackinac',

    'Ë': 'RegInf (free)',
    'Ì': 'Trader',
}

ACTIONS = {
    '¹': 'money from',
    '½': 'draft',
    '¼': 'piracy',
    '»': 'trade',
    '¾': 'discard',
    '¿': 'put into reserve',
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

def test():
    print(move_to_actions('»Ì°²¶,½Í', 'fr'))

if __name__ == "__main__":
    main()
    test()
