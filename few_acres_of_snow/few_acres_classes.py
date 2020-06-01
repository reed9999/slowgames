# vim: set fileencoding=utf-8 :
"""History and Analyzer classes specific to A Few Acres of Snow

Use this link for all philip9999's AFAoS games (player ID: 404792):
https://yucata.de/data.jqdt?dataSource=RankingDetailsUser&UserID=404792&GameType=90&length=-1
or just use the UI from here (probably easier):
https://yucata.de/en/Ranking/philip9999

Earlier I thought something was changing under my feet. In
view-source:https://yucata.de/en/Game/FewAcresOfSnow/9547143
which became TEST_BED below, 4th move switched from
»Ì°²¶,½Í   to   ½Í,»Ì°²   which is almost switching the two.
"""

from enum import Enum
import logging
import pprint
import sys

logging.basicConfig(level=logging.INFO)
from game_analyzer import GameAnalyzer, GameHistory
from few_acres_of_snow.test_moves import moves9575653_fr

class FewAcresOfSnowHistory(GameHistory):
    pass

class FewAcresOfSnowAnalyzer(GameAnalyzer):
    # Redefine to be closer to how the JavaScript works.
    # See user-interface-notes.md or .md for a fuller explanation.
    def __init__(self, list_of_moves):
        self.game_type='FewAcresOfSnow'
        self.which_side = 'uk'
        self.move_number = 0
        self.moves_list = list_of_moves
        self.actions_list = []

    def relevant_side(self, reverse):
        reversal = {'uk': 'fr', 'fr': 'uk'}
        return reversal[self.which_side] if reverse else self.which_side

    def raid(self, predicate):
        s = "upon {target} by {subject} {extra}".format(
            target=predicate[0],
            subject=predicate[1],
            extra='<TODO: what happened?>',
        )
        return s

    def ambush(self, detail_code):
        """The Yucata Javascript deals with a lot of special cases.

        Because only one aggressor participates in an ambush, we can make
        assertions based on the length of the string. But I don't think this is
        needed because the 2nd char gives the outcome.

        Here's a pseudocode version of the JS:
        ```
                    i is the message string
                    o = 2nd char of the move code called r.
                    e = 2nd char of the move code.
                    i += CalcLocTitle(s, e);
                    add "(N)" to output if e (2nd char) is_neutral()
                    if move code .length === 3 and 3rd char is === "C"
                        then "No vulnerable card..."
                    if length === 4 && and 3rd card is "B"
                        "Ambush has been blocked by this card:",
                    add to the message string:
                        CalcLocTitle((s + 1) % 2, r.substr(3, 1))
                        append N if is_neutral

                    If the action is #35 for some reason different logic:
                        a === 35 && (f = Lang === 0 ? "freie Aktion, da geblockt" : "free action (ambush was blocked)",
                        i += "<br/><span style='color:green'><b>" + f + "<\/b><\/span>"));
                    If length === 5 && r.substr(2, 1) === "T" && (k = Decode(r, 4),
                        c = k === 0 ? "Reserve" : "Hand",
                        // something about IsRandomRule(15)
                        // basically it was successful
                        i += "<i>" + CalcLocTitle((s + 1) % 2, r.substr(3, 1)) + "<\/i>");
                    break;
        ```
        """
        # Prepare for data/string decoupling with an enum
        Outcome = Enum('Outcome', 'SUCCESS NO_TARGET BLOCKED UNKNOWN')
        outcome_char = detail_code[1]
        outcome_dict = {
            'B': Outcome.BLOCKED,
            'C': Outcome.NO_TARGET,
            'T': Outcome.SUCCESS,
        }
        try:
            outcome = outcome_dict[outcome_char]
        except KeyError:
            logging.error("I don't have an outcome for this character: {}".format(outcome_char))
            return Outcome.UNKNOWN, "Unknown outcome."
        
        aggressor = self.empire(detail_code[0])
        if outcome == Outcome.NO_TARGET:
            return "No vulnerable target for ambush by {}. Hand shown.".format(
                aggressor
            )
        if outcome == Outcome.BLOCKED:
            return "Ambush by {} blocked by {}".format(
                aggressor, self.calc_loc_title(detail_code[2])
            )
        assert outcome == Outcome.SUCCESS
        reserve_or_hand = self.decode(detail_code[3])
        return "Ambush by {} succeeded against {} (from {})".format(
            aggressor,
            self.calc_loc_title(detail_code[2], reverse=True),
            'reserve' if reserve_or_hand == 0 else 'hand'
        )


    def simple_cards(self, detail_code, ):
        cards_list, offset = {
            'uk': (self.UK_CARDS, 33),
            'fr': (self.FR_CARDS, 26)
        }[self.which_side]
        cards_strs = []
        for c in detail_code:
            try:
                proposed_str = self.calc_loc_title(c)
                logging.debug("ordinal {}; calc_loc_title returned {}".format(
                    ord(c), proposed_str))
                cards_strs.append(proposed_str)
            except IndexError:
                logging.warning("empire card not identified for {} -> {}".format(
                    ord(c), ord(c) - 176))
                reduced = ord(c) - 176
                logging.warning("Reduced {} should be location {}".format(
                    reduced, self.LOCATIONS[reduced]))
                cards_strs.append(self.LOCATIONS[reduced])
        return "; ".join(cards_strs)

    def simple_cards_old(self, detail_code, ):
        # This is purely because I haven't yet implemented the cards list for FR
        if self.which_side == 'uk':
            return self.simple_cards_new(detail_code)
        cards_dict = self.FR_CARDS   # given that uk now has a different function.
        cards = "; ".join([cards_dict[c] if c in cards_dict.keys()
                           else c for c in detail_code
                           ])
        return cards

    @staticmethod
    def location(char):
        return __class__.LOCATIONS[ord(char) - 176]

    def empire(self, a_char):
        if self.which_side == 'uk':
            offset = 33
            return self.UK_CARDS[ord(a_char) - 176 - offset]
        else:
            offset = 27 # or is this 26? Elsewhere seems to be 26
            return self.FR_CARDS[a_char]   #for now....

    def any_card(self, a_char):
        """This may be too fancy -- can we just concat LOCATIONS and the empire cards to one list?"""
        try:
            return self.location(a_char)
        except:
            return self.empire(a_char)

    def location_then_cards(self, detail_code):
        """For reinforce siege but I'll bet there are others. First the target
        location then cards played"""
        rv = self.location(detail_code[0]) + " -- cards: "
        rv += self.simple_cards(detail_code[1:])
        return rv

    def besiege(self, detail_code):
        """Besiege is notable because (like some others, perhaps Trader) all the detail is usually locations
        except for the military card, which can be either a location or an empire card. The transport can
        also on occasion be a an empire card. I don't know
        how the two are distinguished."""
        target = self.location(detail_code[0])
        launch = self.location(detail_code[1])
        transport = self.any_card(detail_code[2])
        military = self.any_card(detail_code[3])
        # This clearly can't be right because sometimes transport isn't a location.
        return "on {} from {}; transport is {}; military is {}.".format(target, launch, transport, military)

    def win_siege(self, detail_code):
        if detail_code == '0XX':
            return "No empire cards for the losing side to relinquish"
        return "TODO: figure out what this means: <{}>".format(detail_code)

    def merchant(self, detail):
        return "Merchant can't yet deal with {}".format(detail)
        rv = "; ".join([cards_dict[c] if c in cards_dict.keys()
                           else c for c in detail_code
                           ])


    UK_CARDS = [
        'Military leader',
        'Regular infantry',
        'Regular infantry',
        'Regular infantry',
        'Regular infantry',
        'Regular infantry',
        'Regular infantry',
        'Indian leader',
        'Home support',
        'Trader',
        'Bateaux',
        'Siege artillery',
        'Militia',
        'Militia',
        'Militia',
        'Ships',
        'Ships',
        'Settlers',
        'Rangers',
        'Fortification (red)',
        'Governor',
    ]

#    empTitles = [StrBateaux, StrFortification, StrGovernorString, StrHomeSupport, StrIndianLeader,
    #           StrMLeader, StrMilitia, StrRangers, StrInfantry, StrSettlers,
    # StrShips, StrArtillery, StrTrader, StrCoureurs, StrIntendant, StrNativesString, StrPriest],
    # Note that the order of this list is based on empDataFR (line 4868) which indexes into empTitles.
    FR_CARDS = [
        #Index into names array: 0, 8, 12, 13, 1, 2, 3 / 14 5 6 6 6 15 16 16 8 8 8 10 11 12
        'Bateaux',      # Not even in the deck in 2nd edition
        'Regular infantry (free)',
        'Trader',
        'Coureurs de Bois',
        'Fortification (blue)',
        'Governor',
        'Home support',
        'Intendant',
        'Military leader',
        'Militia',
        'Militia',
        'Militia',
        'Native Americans (blue)',
        'Priest',
        'Priest',
        'Regular infantry',
        'Regular infantry',
        'Regular infantry',
        'Ships',
        'Siege artillery',
        'Trader (drafted second one)',
        ]
    #     'Ê': 'Bateaux (huh?)',
    #
    #     'Ð': 'Home support',
    #     'Priest',
    #
    #     'Ë': 'RegInf (free)',
    #     'Ù': 'Regular infantry',
    #     'Ú': 'Regular infantry',
    #     'Û': 'Regular infantry',
    #     'Ò': 'Military leader',
    #
    #     'Ó': 'Militia',
    #     'Ö': '',
    #     'Ì': 'Trader',
    #
    # }

    ACTIONS = {
        # Following the order in game_FewAcresOfSnow
        0: ('settle', None,),
        1: ('develop', None,),
        2: ('fortify', None,),
        3: ('besiege', besiege,),
        4: ('reinforce siege', location_then_cards,),
        5: ('raid', raid,),
        36: ('raid', raid,),
        6: ('ambush', ambush,),
        35: ('ambush', ambush,),
        7: ('played Military Leader', None,),
        8: ('played Indian Leader/Priest', None,),
        9: ('money from', None,),
        10: ('merchant', merchant,),
        11: ('trade', None,),
        12: ('piracy', None,),
        13: ('draft', None,),
        14: ('discard', None,),
        38: ('discard', None,),
        15: ('put into reserve', None,),
        16: ('retrieve reserve', None,),
        17: ('govern', None,),
        18: ('use Intendant', None,),
        19: ('home support', None,),
        20: ('pass', None,),
        21: ('withrdaw from siege', None,),
        30: ('win a siege', win_siege,),
        35: ('free fur action', None,),  # special rules

        # From here is legacy junk, to help troubleshoot why I couldn't figure this out before.
        # '¶': 'successful ambush apparently. First card is protagonist;
        # third card is the card that was returned to the deck, e.g. Ë =
        # free French infantry.
        # the second (T) and fourth (°) are unclear to me.

        # '²': 'fortify (UK) or intendant (FR)', None, ),
        'Â': ('fortify (FR)', None,),
        '¶': ('successful ambush [see comments]', None,),
        'Î': ('opponent withdrew from siege', None,),
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
        "Cumberland",   #10
        "Deerfield",
        "Detroit",
        "Fort Beausejour",
        "Fort Duquesne",
        "Fort Frontenac",
        "Fort Halifax",
        "Fort Niagara",
        "Fort Presqu'Isle",
        "Fort St. John",
        "Fort Stanwix", #20
        "Fort Venango",
        "Fort William Henry",
        "Gaspe",
        "Halifax",
        "Kennebec",
        "Louisbourg",
        "Oswego",
        "Port Royal",
        "Richmond",
        "Tadoussac",    #30
        "Ticonderoga",
        "Trois Rivieres",
        "Montreal",
        "Quebec",
        "Michillimackinac",
    ]

    # In the Yucata JS the respective locDataEN and locDataFR structures
    # contain a lot more stuff, which we may eventually want to pull
    # out of there. For now it's just one more level of indirection in
    # getting the name of the location.

    # However... UK is the reference order so it's really simple.
    UK_LOCATION_INDICES = list(range(0, 33))

    FR_LOCATION_INDICES = [
        23, 26, 33, 34, 28,
        30, 32,  7,  9, 12,
        13, 14, 15, 16, 17,
        18, 19, 20, 21, 22,
        24, 25, 35, 27, 4,
        31
    ]

    NEUTRAL_CARDS = {
        'C': 'Native Americans',
        'D': 'Native Americans',
        'E': 'Native Americans',
        'F': 'Native Americans',
        'G': 'Native Americans',
        'H': 'Settlers',
        'I': 'Settlers',
    }

    def action_code_to_action(self, code):
        # action = ACTIONS[code[0]] if code[0] in .keys() else code[0]
        char_code0 = ord(code[0]) - 176
        if char_code0 in self.ACTIONS.keys():
            action, handler = self.ACTIONS[char_code0]
        else:
            action = code[0] + " -- " + str(char_code0)
            handler = None
        return "{action}: {detail}".format(
            action=action, detail=(handler(self, code[1:]) if handler else
                                   self.simple_cards(code[1:])))

    def move_to_actions(self, move):
        list_of_action_codes = move.split(',')
        return [self.action_code_to_action(ac) for ac in list_of_action_codes]

    def iterate_through_moves(self):
        for move in self.moves_list:
            self.which_side = ['uk', 'fr'][self.move_number % 2]
            self.actions_list.append((self.which_side, self.move_to_actions(move)))
            self.move_number += 1
        return self.actions_list

    def file_to_history(filename):
        pass

    def calc_loc_title(self, char, reverse=False):
        """This corresponds to the javascript function CalcLocTitle(n, t)
        """
        loc_indices = self.location_indices(reverse)
        if self.is_location_card(char, reverse):
            decoded = self.decode(char)
            return self.LOCATIONS[loc_indices[decoded]]
        elif self.is_neutral_card(char):
            return self.NEUTRAL_CARDS[char]
        else:
            return self.empire_cards(reverse)[self.decode(char) - self.offset()]

    @staticmethod
    def is_neutral_card(char):
        """Corresponds to javascript function IsNeutralCard"""
        return ord(char.upper()) in range(65, 74)

    def is_location_card(self, char, reverse=False):
        """This corresponds to the javascript
            function IsLocationCard(n, t)
        In truth the actual Yucata handling seems a bit clumsy (doing
        conversions in several functions; no single source of truth for
        offsets etc.) but probably shadowing it is helpful in reading their
        code.
        """
        if self.is_neutral_card(char):
            return False
        offset = {'uk': 33, 'fr': 26}[self.relevant_side(reverse)]
        return self.decode(char) in range(0, offset)

    @staticmethod
    def decode(string, index=0):
        """Corresponds to javascript Decode() function.

        :param string:
        :param index:
        :return:
        """
        return ord(string[index]) - 176

    # Three simple helpers, just to handle asymmetrical data uk/fr
    def empire_cards(self, reverse=False):
        """I don't think this has a JS analogue on Yucata but represents the
        recurring idiom:
        ```
        u = n === 0 ? empDataEN : empDataFR
        ```
        """
        return {
            'uk': self.UK_CARDS,
            'fr': self.FR_CARDS,
        }[self.relevant_side(reverse)]

    def location_indices(self, reverse=False):
        """Analogous to empire_cards(), just a helper method for a
        side-dependent variable.
        """
        return {'uk': self.UK_LOCATION_INDICES,
                    'fr': self.FR_LOCATION_INDICES
                    }[self.relevant_side(reverse)]

    def offset(self):
        """Analogous to empire_cards(), just a helper method for a
        side-dependent variable.
        """
        return {'uk': 33, 'fr': 26}[self.which_side]

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
    # https://www.yucata.de/en/Game/FewAcresOfSnow/9575653
    analyzer = FewAcresOfSnowAnalyzer(moves9575653_fr[:20])
    pprint.pprint(analyzer.iterate_through_moves())

def test3():
    # Trader: Gaspé, Montreal, Tadoussac = 33, 30, 23
    # s = '»Ì°²µ,½Ð'
    # Successful ambush by Rangers on free Reg Inf in reserve:
    s = '¶ãTË°'
    analyzer = FewAcresOfSnowAnalyzer(moves9575653_fr[:20])
    pprint.pprint(analyzer.move_to_actions(s))


if __name__ == "__main__":
    main()
    test3()


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

OLD_UK_CARDS = {

        'Ó': 'Regular infantry',
        'Õ': 'Regular infantry',
        'Ö': 'Regular infantry',
        'Ò': 'Regular infantry',
        'Ô': 'Regular infantry',
        'ã': 'Rangers',




        'Ø': 'Indian leader',
        'Ñ': 'Military leader',
        'Ý': 'Militia',
        'Þ': 'Militia',
        'å': 'Governor',
        'ä': 'Fortification (red)',

        'Ù': 'Home Support',

    }
