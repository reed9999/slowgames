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
        url = 'https://yucata.de/de/GameInfo/' + self._game
        # Better to use https://yucata.de/en/Ranking/Game/<game>
        try:
            response = requests.get(url)
        except TimeoutError as e:
            raise YucataOSError(wrapped_error=e, game=self._game)

        # lines = response.text.split(sep='<tr style="background-color:white;">')
        lines = response.text.split(sep='background-color:white')
        patt = 'User/([a-zA-Z0-9 ]*)"'
        return [re.search(patt, l).group(1) for l in lines if re.search(patt, l)]

    @staticmethod
    def user_id_for(name):
        url = 'https://yucata.de/de/Ranking/' + name
        text = requests.get(url).text
        try:
            # return re.search('UpdatePlayerRankingList\(([0-9]*)\)', text).group(1)
            return re.search('UpdatePlayerRanking', text).group(1)
        except:
            ## This might happen legitimately if the player is not found.
            # In our case, starting up, it's more likely a bad regex
            raise

    # Here's an example of the Ajax URL that I see by using developer tools.
    # This is for hotei11, a top Petersburg player.
    # https://yucata.de/data.jqdt?dataSource=RankingDetailsUser&UserID=188172&OppID=-1&
    #   GameType=-1&draw=1&columns%5B0%5D%5Bdata%5D=function&columns%5B0%5D%5Bname%5D=&
    #   columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false
    #   &columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&
    #   columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&
    #   columns%5B1%5D%5Bdata%5D=FinishedOnString&columns%5B1%5D%5Bname%5D=&
    #   columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=CustomGameName&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=Opponents&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=GameId&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=PointResult&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=25&search%5Bvalue%5D=&search%5Bregex%5D=false&_=1581302442930

    # Apparently nothing after GameType is necessary.

    # Originally get the ID by parsing: var profileId = 188172;  or var CurrentUserId = 188172;
    # Maybe different though? Rashtulla 339070 found by that number in the JS.
    def request_games_for(self, player):
        id = self.user_id_for(player)
        url = "https://yucata.de/data.jqdt?dataSource=RankingDetailsUser&UserID=" + id
        try:
            response = requests.get(url)
        except TimeoutError as e:
            raise YucataOSError(wrapped_error=e, game=self._game, state='for player')
        return response.text

    def find(self):
        top = self.request_top_players()
        for player in top:
            text = self.request_games_for(player)
            print(text)


def main():
    # GamesFinder('Snowdonia').find()       # ID 309
    GamesFinder('Petersburg').find()      # 27
    # GamesFinder('Delphi').find()          # 324
    # ['JimF', 'Uli', 'JayAnthony', 'kyoysc', 'LJenkins', 'mcdoomer', 'suet63', 'Minella',
    #  'BlauerKlaus', 'sto1']
    # ['hotei11', 'thekid', 'c4dancer', 'CroOm', 'texaswer', 'oelschlegel', 'Monash',
    #  'Ostrich', 'Chrissi', 'georgedim']
    # ['Stonecrusher', 'kyoysc', 'Hircine', 'peet', 'Pompkin', 'Tintin', 'November',
    #  'Alanna', 'vospe', 'Katzenfloh']
    # GamesFinder('RRR2').find()            # 142
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

