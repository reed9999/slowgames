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

    @staticmethod
    def cards_dict():
        """Return a dict with card names and simple hints of their price/value"""
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
        # cards.update({i: 'lumberjack 3' for i in range(0, 6)})
        # cards.update({i: 'gold miner 4' for i in range(6, 12)})
        # cards.update({i: 'weaver 5' for i in range(12, 18)})
        # cards.update({i: 'trapper 6' for i in range(18, 24)})
        # cards.update({i: 'shipbuilder 7' for i in range(24, 30)})
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
        cards = __class__.cards_dict()
        if tup[0] in [5,]:
            object = __class__.move_str((tup[1], tup[2]))
        else:
            object = cards[tup[1]]
        return "{} {}".format(verbs[tup[0]], object)

    def break_into_rounds(self):
        pass

class PetersburgAnalyzer(object):
    def __init__(self, game_id=None, html=None, filename=None):
        self._game_id = game_id
        if html is None and game_id is not None:
            html = self.html_for_id(game_id)
        elif html is None and filename is not None:
            html = self.game_history_from_file(filename)
        self._history = PetersburgHistory(html)

    def diag(self):
        self._history.diag()

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