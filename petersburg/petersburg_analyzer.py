import requests
class PetersburgAnalyzer(object):
    def __init__(self, game_id=None, html=None, filename=None):
        self._game_id = game_id
        if html is not None:
            self._html = self.html_for_id(game_id)
        elif filename is not None:
            self._html = self.game_history_from_file(filename)
        else:
            self._html = html

    def diag(self):
        print(self._html)

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


if __name__ == "__main__":
    main()
