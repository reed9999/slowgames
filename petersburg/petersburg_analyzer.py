import pprint
import re
import requests

class PetersburgHistory(object):
    def __init__(self, html):
        self._html = html
        self._moves = []
        self.init_from_html()

    def diag(self):
        pprint.pprint([m['move_str'] for m in self._moves])

    def init_from_html(self):
        for line in self._html.split(';'):
            # There is a catch. A few move types have three numbers; when that happens,
            # we need to make the comma optional but drop it in the group
            m = re.match("\nHistoryMove.([0-9]*). = '([0-9]*),([0-9]*),?([0-9]*)?'", line)
            if m:
                assert len(self._moves) == int(m.group(1)), "exp.: " + str(m.group(1))
                try:
                    tup = (int(m.group(2)), int(m.group(3)), int(m.group(4)))
                except ValueError:
                    tup = (int(m.group(2)), int(m.group(3)))
                self._moves.append({'move': tup})
                self._moves[-1]['move_str'] = self.move_str(tup)
                continue

            m = re.match("\nHistoryStatus.([0-9]*). = '([0-9A-Z]*)'", line)
            if m:
                assert len(self._moves) == int(m.group(1)) + 1
                self._moves[-1]['status'] = str(m.group(2))

    # card_info = [
    #     ('lumberjack 3', 'XX', cost, payout, points, 6 - 0, ))
    #     ('Goldgrüber 4', 'XX', cost, payout, points, 12 - 6, )
    #     ('Schäfer 5', 'XX', cost, payout, points, 18 - 12, )
    #     ('trapper 6', 'XX', cost, payout, points, 24 - 18, )
    #     ('Schiffbauer 7', 'XX', cost, payout, points, 30 - 24, )
    #     cards[30] = 'Zar und Zimmermann 8'
    # ('Markt 1 5', 'XX', cost, payout, points, 36 - 31, )
    # ('Zollhaus 2 8', 'XX', cost, payout, points, 41 - 36, )
    # ('Feuerwehr 3 11', 'XX', cost, payout, points, 44 - 41, )
    # ('Krankenhaus 4 14', 'XX', cost, payout, points, 47 - 44, )
    # ('Bibliothek 5 17', 'XX', cost, payout, points, 50 - 47, )
    # ('Krankenhaus 6 20', 'XX', cost, payout, points, 52 - 50, )
    # cards[52] = 'Akademie 7 23'
    # cards[53] = 'Pot. Dorf 2/6'
    # ('Schenke 2:1', 'XX', cost, payout, points, 56 - 54, )
    # cards.update({
    #     56: 'Lagerhaus 2',
    #     57: 'Sternwarte 6',
    #     58: 'Sternwarte 6',
    # })
    # ('Schreiber 1 4', 'XX', cost, payout, points, 65 - 59, )
    # ('Verwalter 2 7', 'XX', cost, payout, points, 70 - 65, )
    # ii = 70
    # j = ii + 5
    # ('Kontorist 3 10' for i in range(ii, j)})
    # ii = j
    # j = ii + 4
    # ('Sekretar 4 12' for i in range(ii, j)})
    # ii = j
    # j = ii + 3
    # ('Kontrolleur 4[1] 14' for i in range(ii, j)})
    # ii = j
    # j = ii + 2
    # ('Richter 5[2] 16' for i in range(ii, j)})
    # ii = j
    # j = ii + 2
    # ('Hofmeisterin 6[3] 18' for i in range(ii, j)})
    # ('Austauschkarte Nr. {}'.format(i) for i in range(j, 155)})
    #
    # ]
    @staticmethod
    def cards_dict_de():
        """Return a dict with card names and simple hints of their price/value in
        German. Obviously this is a pretty crude way to do this. Commented code above
        represents a better way."""
        cards = {}
        cards.update({i: 'lumberjack 3' for i in range(0, 6)})
        cards.update({i: 'Goldgrüber 4' for i in range(6, 12)})
        cards.update({i: 'Schäfer 5' for i in range(12, 18)})
        cards.update({i: 'trapper 6' for i in range(18, 24)})
        cards.update({i: 'Schiffbauer 7' for i in range(24, 30)})
        cards[30] = 'Zar und Zimmermann 8'
        cards.update({i: 'Markt 1 5' for i in range(31, 36)})
        cards.update({i: 'Zollhaus 2 8' for i in range(36, 41)})
        cards.update({i: 'Feuerwehr 3 11' for i in range(41, 44)})
        cards.update({i: 'Krankenhaus 4 14' for i in range(44, 47)})
        cards.update({i: 'Bibliothek 5 17' for i in range(47, 50)})
        cards.update({i: 'Krankenhaus 6 20' for i in range(50, 52)})
        cards[52] = 'Akademie 7 23'
        cards[53] = 'Pot. Dorf 2/6'
        cards.update({i: 'Schenke 2:1' for i in range(54, 56)})
        cards.update({
            56: 'Lagerhaus 2',
            57: 'Sternwarte 6',
            58: 'Sternwarte 6',
        })
        cards.update({i: 'Schreiber 1 4' for i in range(59, 65)})
        cards.update({i: 'Verwalter 2 7' for i in range(65, 70)})
        ii = 70
        j = ii + 5
        cards.update({i: 'Kontorist 3 10' for i in range(ii, j)})
        ii = j
        j = ii + 4
        cards.update({i: 'Sekretar 4 12' for i in range(ii, j)})
        ii = j
        j = ii + 3
        cards.update({i: 'Kontrolleur 4[1] 14' for i in range(ii, j)})
        ii = j
        j = ii + 2
        cards.update({i: 'Richter 5[2] 16' for i in range(ii, j)})
        ii = j
        j = ii + 2
        cards.update({i: 'Hofmeisterin 6[3] 18' for i in range(ii, j)})
        cards.update({i: 'Austauschkarte Nr. {}'.format(i) for i in range(j, 155)})
        return cards

    def cards_dict_en():
        """Return a dict with card names and simple hints of their price/value,
        in English"""
        cards = {}
        cards.update({i: 'lumberjack 3' for i in range(0, 6)})
        cards.update({i: 'gold miner 4' for i in range(6, 12)})
        cards.update({i: 'shepherd 5' for i in range(12, 18)})
        cards.update({i: 'trapper 6' for i in range(18, 24)})
        cards.update({i: 'shipbuilder 7' for i in range(24, 30)})
        cards[30] = 'Czar and carpenter 8'
        cards.update({i: 'market 1 5' for i in range(31, 36)})
        cards.update({i: 'tollhouse 2 8' for i in range(36, 41)})
        cards.update({i: 'fire station 3 11' for i in range(41, 44)})
        cards.update({i: 'hospital 4 14' for i in range(44, 47)})
        cards.update({i: 'library 5 17' for i in range(47, 50)})
        cards.update({i: 'hospital 6 20' for i in range(50, 52)})
        cards[52] = 'academy 7 23'
        cards[53] = 'Potemkin village 2/6'
        cards.update({i: 'Pub 2:1' for i in range(54, 56)})
        cards.update({
            56: 'Warehouse 2',
            57: 'Observatory 6',
            58: 'Observatory 6',
        })
        cards.update({i: 'Schreiber 1 4' for i in range(59, 65)})
        cards.update({i: 'Verwalter 2 7' for i in range(65, 70)})
        ii = 70
        j = ii + 5
        cards.update({i: 'Kontorist 3 10' for i in range(ii, j)})
        ii = j
        j = ii + 4
        cards.update({i: 'Sekretar 4 12' for i in range(ii, j)})
        ii = j
        j = ii + 3
        cards.update({i: 'Kontrolleur 4[1] 14' for i in range(ii, j)})
        ii = j
        j = ii + 2
        cards.update({i: 'Richter 5[2] 16' for i in range(ii, j)})
        ii = j
        j = ii + 2
        cards.update({i: 'Hofmeisterin 6[3] 18' for i in range(ii, j)})
        cards.update({i: 'Austauschkarte Nr. {}'.format(i) for i in range(j, 155)})
        return cards

    @staticmethod
    def move_str(tup):
        verbs = {
            1: 'bought',
            2: 'took up',
            3: 'played out (from hand)',
            5: 'used observatory --',
            10: 'passed',
        }
        if tup[0] in [10,]:
            return verbs[tup[0]]
        cards = __class__.cards_dict_en()
        if tup[0] in [5,]:
            object = __class__.move_str((tup[1], tup[2]))
        else:
            object = cards[tup[1]]
        return "{} {}".format(verbs[tup[0]], object)

    def break_into_rounds(self):
        # Apparently the 3rd char always tells the nature of the round (0=worker, etc.)
        last_move_of_each_round = [i for i in range(0, len(self._moves)) if i > 0 and
                           self._moves[i]['status'][2] !=
                           self._moves[i - 1]['status'][2]]
        return last_move_of_each_round

    def round_header_after(self, i):
        round_designation = int(self._moves[i]['status'][2])
        round_name = ['WORKER', 'BUILDING', 'ARISTO', 'UPGRADE'][round_designation]
        status = self._moves[i]['status']
        output = """
{round_name} ROUND
Status: {header}
        {w}
        {b}
        {a}
        {u}
        {footer}
-----
        """.format(round_name=round_name, header=status[0:8], w=status[8:39],
                   b=status[39:66], a=status[66:94], u=status[94:124], footer=status[124:])
        return output

    def starting_player_from_move(self, move_num):
        status = self._moves[move_num]['status']
        return status[int(status[2]) + 3]   #chars 3 thru 6 refer to respective round types


    def basic_report(self):
        num_players = 2     # TODO read from statusß
        break_moves = self.break_into_rounds()
        last_break = 0
        for i, move in enumerate(self._moves):
            print("Player {}".format(
                # Better: Have it remember state in member vars
                i - last_break + int(self.starting_player_from_move(last_break))
            )
            )
            print("{}: {}".format(i, move['move_str']))
            print(self.starting_player_from_move(i))
            if i in break_moves:
                print(self.round_header_after(i))
                last_break = i



class PetersburgAnalyzer(object):
    def __init__(self, game_id=None, html=None, filename=None):
        self._game_id = game_id
        if html is None and game_id is not None:
            html = self.html_for_id(game_id)
        elif html is None and filename is not None:
            html = self.game_history_from_file(filename)
        self._history = PetersburgHistory(html)

    def diag(self):
        # self._history.diag()
        self._history.basic_report()

    def html_for_id(self, game_id):
        url = "https://yucata.de/en/Game/Petersburg/{}".format(game_id)
        response = requests.get(url)
        return response.text

    @staticmethod
    def game_history_from_file(fn):
        with open(fn, 'r') as f:
            return f.read()


def main():
    a = PetersburgAnalyzer(filename='petersburg/tests/inputs/ph_9514605.js')
    a.diag()

def test_move_str():
    a = PetersburgAnalyzer(filename='petersburg/tests/inputs/ph_9514605.js')
    assert a.move_str((1, 0)) == 'bought lumberjack 3', a.move_str((1, 0))
    assert a.move_str((1, 15)) == 'bought Schäfer 5', a.move_str((1, 15))
    assert a.move_str((1, 9)) == 'bought Goldgrüber 4', a.move_str((1, 9))
    assert a.move_str((1, 13)) == 'bought Schäfer 5', a.move_str((1, 13))
    assert a.move_str((1, 12)) == 'bought Schäfer 5', a.move_str((1, 12))
    assert a.move_str((1, 24)) == 'bought Schiffbauer 7', a.move_str((1, 24))
    assert a.move_str((2, 54)) == 'took up Schenke 2:1', a.move_str((2, 54))
    assert a.move_str((2, 55)) == 'took up Schenke 2:1', a.move_str((2, 55))
    assert a.move_str((2, 32)) == 'took up Markt 1 5', a.move_str((2, 32))
    assert a.move_str((10, 1)) == 'passed', a.move_str((10, 1))
    assert a.move_str((5, 2, 70)) == 'used observatory -- took up card 70', a.move_str((5, 2, 70))
    # assert a.move_str((1, 0)) == 'bought lumberjack 3', a.move_str((1, 0))
    # assert a.move_str((1, 15)) == 'bought weaver 5', a.move_str((1, 15))


if __name__ == "__main__":
    main()
    # test_move_str()

# I haven't even gotten into the status yet. Some hints:
# Chars 0 to 7 show some sort of status.
# In particular char 2 indicates the kind of round. Why the other chars?
# In part appears to refer to the first player, maybe?

# 3011001A - first workers
# 3021001A - first building
# 3031001A - first aristos
# 3000110A - first upgrades
# 3010110A - second workers. Chars 3:7 appear to have reversed to show the alternation of
# rounds