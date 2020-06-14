import os
import re
import requests

class YucataOSError(OSError):
    def __init__(self, wrapped_error, game, state='top players'):
        self._wrapped_error = wrapped_error
        self._game = game
        self._state = state

class GamesFinder(object):
    game_url_name = None    # override, e.g. Petersburg or FewAcresOfSnow
    output_dir = None       # eventually, derive this from game_url_name

    def __init__(self, game):
        """

        :param game: Must correspond to the URL name (e.g. 'Delphi', 'Petersburg') on
        Yucata for the moment. Perhaps later there could be a lookup table.
        """
        self._game = game

    def request_top_players(self):
        # url = 'https://yucata.de/de/GameInfo/' + self._game
        url = 'https://yucata.de/en/Ranking/Game/' + self._game
        try:
            response = requests.get(url)
        except TimeoutError as e:
            raise YucataOSError(wrapped_error=e, game=self._game)
        # For now let's just take the top 10. We should be able to change to 25, 50,
        # or 100 if we know how to hack the Javascript. See note at end.
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

    # Originally get the ID by parsing: var profileId = 188172;  or var CurrentUserId = 188172;
    # Maybe different though? Rashtulla 339070 found by that number in the JS.
    def request_games_for(self, player):
        id = self.user_id_for(player)
        # For a lengthier URL see the very bottom of this file
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

    def save_game(self, id):
        url = "https://yucata.de/en/Game/{}/{}".format(self.game_url_name, id)
        try:
            response = requests.get(url)
        except TimeoutError as e:
            raise YucataOSError(wrapped_error=e, game=self._game, state='for player')
        fn = os.path.join('..', self.output_dir, "game-{}.html".format(id))
        with open(fn, 'w') as f:
            f.write(response.text)

def main():
    # Below are some examples of games and the resulting list of top players.
    class Temp(GamesFinder):
        game_url_name = 'FewAcresOfSnow'
        output_dir = 'few_acres_of_snow'
    finder=Temp('FewAcresOfSnow')
    id = 9616498
    finder.save_game(id)

## EXPERIMENTS, dead code
def experiment():
    template = 'https://yucata.de/en/Game/Petersburg/{}'
    all_reqs = {id: requests.get(template.format(id)).text for id in ids}
    def quick_writer(tup):
        id, text = tup
        with open("petersburg/petersburg_game_{}.html".format(id), 'w') as f:
            print("writing {}--{}".format(id, text))
            f.write(text)
    list(map(quick_writer, all_reqs.items()))
    # print(list(map(lambda x: x, all_reqs.items())))
    # _ = [print(x) for x in all_reqs.items()]

if __name__ == "__main__":
    main()
    # experiment()


# <div id="divRankingFilter" style="padding:10px;">Filter by game: <select id="selFilterGameType"><option value="-1">All games</option></select>&nbsp;and by opponent:&nbsp;<select id="selFilterOpponent"><option value="-1">All opponents</option></select></div>

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



# NOTE ON CHANGING NUMBER OF TOP PLAYERS
        # then if you change the number of records, it calls
        #     function ku(n, t, r) {
        #         for (var u, o = t ? i.filter(t, n) : n, e = 0; (u = o[e]) != null; e++)
        #             r || u.nodeType !== 1 || i.cleanData(f(u)),
        #             u.parentNode && (r && i.contains(u.ownerDocument, u) && ci(f(u, "script")),
        #             u.parentNode.removeChild(u));
        #         return n
        #     }
    #     then this:
        # append: function() {
        #     return k(this, arguments, function(n) {
        #         if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
        #             var t = yu(this, n);
        #             t.appendChild(n)
        #         }
        #     })
        # },
        # This seems to be similar code: https://gist.github.com/jeppech/4541577

### Moved from main() -- lists of top players
    # GamesFinder('Snowdonia').find()       # ID 309
    # GamesFinder('Petersburg').find()      # 27
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
