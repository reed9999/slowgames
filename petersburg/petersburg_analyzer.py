import requests
class PetersburgAnalyzer(object):
    def __init__(self, game_id=None, html=None):
        self._game_id = game_id
        self._html = html if html is not None else self.html_for_id(game_id)

    def diag(self):
        print(self._html)

    def html_for_id(self, game_id):
        url = "https://yucata.de/en/Game/Petersburg/{}".format(game_id)
        response = requests.get(url)
        return response.text


def main():
    a = PetersburgAnalyzer(9514605)
    a.diag()


if __name__ == "__main__":
    main()
