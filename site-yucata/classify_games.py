import re
import requests

class YucataOSError(OSError):
    def __init__(self, wrapped_error, game, state='top players'):
        self._wrapped_error = wrapped_error
        self._game = game
        self._state = state

class GamesFinder(object):
    def __init__(self, game):
        """

        :param game: Must correspond to the URL name (e.g. 'Delphi', 'Petersburg') on
        Yucata for the moment. Perhaps later there could be a lookup table.
        """
        self._game = game

    def request_top_players(self):
        url = 'https://yucata.de/de/GameInfo/' + self.
        # Better to use https://yucata.de/en/Ranking/Game/<game>
        try:
            response = requests.get(url)
        except TimeoutError as e:
            raise YucataOSError(wrapped_error=e, game=self._game)

        # lines = response.text.split(sep='<tr style="background-color:white;">')
        lines = response.text.split(sep='background-color:white')
        patt = 'User/([a-zA-Z0-9 ]*)"'
        return [re.search(patt, l).group(1) for l in lines if re.search(patt, l)]

    def request_games_for(self, player):
        url = 'https://yucata.de/de/Ranking/' + player
        try:
            response = requests.get(url)
        except TimeoutError as e:
            raise YucataOSError(wrapped_error=e, game=self._game, state='for player')

    def find(self):
        #print("NYI game={}".format(self._game))
        top = self.request_top_players()
        print(top)

def main():
    # GamesFinder('Snowdonia').find()
    # GamesFinder('Petersburg').find()
    # GamesFinder('Delphi').find()
    # ['JimF', 'Uli', 'JayAnthony', 'kyoysc', 'LJenkins', 'mcdoomer', 'suet63', 'Minella',
    #  'BlauerKlaus', 'sto1']
    # ['hotei11', 'thekid', 'c4dancer', 'CroOm', 'texaswer', 'oelschlegel', 'Monash',
    #  'Ostrich', 'Chrissi', 'georgedim']
    # ['Stonecrusher', 'kyoysc', 'Hircine', 'peet', 'Pompkin', 'Tintin', 'November',
    #  'Alanna', 'vospe', 'Katzenfloh']
    # GamesFinder('RRR2').find()
    # ['califax', 'Levster', 'tamihiko71b', 'Agentus', 'loulouulou', 'Gio1987', 'RobRdam',
    #  'oelschlegel', 'noblekenny', 'AndreasJ']


if __name__ == "__main__":
    main()


## EXPERIMENTS, dead code
def experiment():
    r = requests.get('https://yucata.de/en/Game/8000010')
    r10 = requests.get('https://yucata.de/en/Game/Oregon/8000010')
    r11 = requests.get('https://yucata.de/en/Game/Oregon/8000011')
    r12 = requests.get('https://yucata.de/en/Game/Oregon/8000012')

    print(r.text)
    print(r10.text)
    print(r11.text)
    print(r12.text)


# <div id="divRankingFilter" style="padding:10px;">Filter by game: <select id="selFilterGameType"><option value="-1">All games</option></select>&nbsp;and by opponent:&nbsp;<select id="selFilterOpponent"><option value="-1">All opponents</option></select></div>

