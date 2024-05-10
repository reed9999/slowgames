"""This functionality probably already exists in work I did in a
different branch and have neglected to merge in."""

# I haven't yet cleaned this up so it looks a lot like
# petersburg_analyzer.py


import pprint
import re
import requests


class GameHistory(object):
    pass


class Fw1GameHistory(GameHistory):
    """Represents one history of one game, e.g. one particular Saint Petersburg game.
    """
    def __init__(self, html):
        self._html = html
        self._moves = []
        if self._html:
            self.init_from_html()

    def diag(self):
        pprint.pprint([m['move_str'] for m in self._moves])

    def init_from_html(self):
        for line in self._html:
            m = re.match("\nHistoryMove.([0-9]*). = '(.*)'", line)
            if m:
                assert len(self._moves) == int(m.group(1)), "exp.: " + str(m.group(1))
                full_move_encoded = m.group(2)
                self._moves.append({
                    'move': full_move_encoded,
                    'move_str': self.move_str(tup),
                    'status': None,
                })
                continue

            m = re.match("\nHistoryStatus.([0-9]*). = '(.*)'", line)
            if m:
                assert len(self._moves) == int(m.group(1)) + 1
                self._moves[-1]['status'] = str(m.group(2))

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


class GameController(object):
    """
    Class to take the HTML downloaded by the Downloader class and turn
    it into a game history. Sort of a controller class hence the name change.
    Arguably a bit of overkill.
    """
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
        self._game_type = game_type

    @classmethod
        # Factory method
    def create_game_history_from_html(cls, html, game_type=None):
        return Fw1GameHistory(html)

    def diag(self):
        # self._history.diag()
        self._history.basic_report()

    def html(self):
        return self.html_for_type_and_id(self._game_type, self._game_id)

    @staticmethod
    def html_for_type_and_id(game_id):
        url = f"https://yucata.de/en/Game/{game}/{game_id}".format(game_id)

    def html_for_id(self, game_id):
        url = "https://yucata.de/en/Game/{}/{}".format(self.game_type, game_id)
        response = requests.get(url)
        return response.text

    @staticmethod
    def game_history_from_file(fn):
        with open(fn, 'r') as f:
            return f.read()
