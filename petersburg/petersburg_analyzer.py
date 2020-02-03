import re
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
        self._history = []

    def diag(self):
        self.init_history_from_html()
        print(self._history)

    def html_for_id(self, game_id):
        url = "https://yucata.de/en/Game/Petersburg/{}".format(game_id)
        response = requests.get(url)
        return response.text

    def init_history_from_html(self):
        for line in self._html.split(';'):
            # There is a catch. A few move types have three numbers; when that happens,
            # we need to make the comma optional but drop it in the group
            m = re.match("\nHistoryMove.([0-9]*). = '([0-9]*),([0-9]*),?([0-9]*)?'", line)
            if m:
                assert len(self._history) == int(m.group(1)), "exp.: " + str(m.group(1))
                try:
                    tup = (int(m.group(2)), int(m.group(3)), int(m.group(4)))
                except ValueError:
                    tup = (int(m.group(2)), int(m.group(3)))
                self._history.append({'move': tup})
                continue

            m = re.match("\nHistoryStatus.([0-9]*). = '([0-9A-Z]*)'", line)
            if m:
                assert len(self._history) == int(m.group(1)) + 1
                self._history[-1]['status'] = str(m.group(2))

    @staticmethod
    def game_history_from_file(fn):
        with open(fn, 'r') as f:
            return f.read()


def main():
    a = PetersburgAnalyzer(filename='petersburg/tests/inputs/ph_9514605.js')
    a.diag()


if __name__ == "__main__":
    main()
