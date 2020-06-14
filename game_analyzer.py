"""This functionality probably already exists in work I did in a
different branch and have neglected to merge in."""

# I haven't yet cleaned this up so it looks a lot like
# petersburg_analyzer.py

import pprint
import re
import requests


class GameHistory(object):
    def __init__(self, html):
        self._html = html
        self._moves = []
        self.init_from_html()

    def diag(self):
        pprint.pprint([m['move_str'] for m in self._moves])

    def init_from_html(self):
        for line in self._html.split(';'):
            m = re.match("\nHistoryMove.([0-9]*). = '(.*)'", line)
            if m:
                assert len(self._moves) == int(m.group(1)), "exp.: " + str(m.group(1))
                tup = self.move_tuple_from_code(m.group(2))
                self._moves.append({
                    'move': tup,
                    'move_str': self.move_str(tup),
                })
                continue

            m = re.match("\nHistoryStatus.([0-9]*). = '(.*)'", line)
            if m:
                assert len(self._moves) == int(m.group(1)) + 1
                self._moves[-1]['status'] = str(m.group(2))

    @staticmethod
    def move_tuple_from_code(code):
        raise NotImplementedError

    @staticmethod
    def move_str(tup):
        raise NotImplementedError('implement in derived class.')

    def basic_report(self):
        num_players = 2     # TODO read from status
        break_moves = self.break_into_rounds()
        last_break = 0
        for i, move in enumerate(self._moves):
            assert type(i) == int, "Type of i is {}".format(type(i))
            assert type(self.starting_player_from_move(i)) == str
            print("Player {}".format(self.current_player_from(i,
                                                      last_break,
                                                      self.starting_player_from_move(i)
                                                              )))
            print("{}: {}".format(i, move['move_str']))
            print(self.starting_player_from_move(i))
            if i in break_moves:
                print(self.round_header_after(i))
                last_break = i


class GameDownloader(object):
    def __init__(self, game_type='Petersburg'):
        self._game_type = game_type or 'Petersburg'

    def html_for_id(self, game_id):
        url = f"https://yucata.de/en/Game/{self._game_type}/{game_id}"
        response = requests.get(url)
        return response.text



class GameAnalyzer(object):
    def __init__(self, game_id=None, html=None, filename=None,
                 game_type='Petersburg'):
        self._game_id = game_id
        if html is None and game_id is not None:
            html = self.html_for_type_and_id(game_type, game_id)
        elif html is None and filename is not None:
            html = self.game_history_from_file(filename)
        self._game_type = game_type or 'Petersburg'
        self._history = self.create_game_history_from_html(
            html, game_type=game_type)

    @classmethod
        # Factory method
    def create_game_history_from_html(cls, html, game_type=None):
        raise NotImplementedError
        return GameHistory(None)

    def diag(self):
        # self._history.diag()
        self._history.basic_report()

    def html(self):
        return self.html_for_type_and_id(self._game_type, self._game_id)

    @staticmethod
    def html_for_type_and_id(game_id):
        url = f"https://yucata.de/en/Game/{game}/{game_id}".format(game_id)
        response = requests.get(url)
        return response.text

    @staticmethod
    def game_history_from_file(fn):
        with open(fn, 'r') as f:
            return f.read()
