"""Tests for Concordia parsing."""
import os

from bs4 import BeautifulSoup
import pytest

from concordia.concordia_classes import ConcordiaHistory

THIS_FILE_DIR = os.path.dirname(os.path.realpath(__file__))


class TestConcordiaParsing(object):
    @pytest.mark.parametrize('filename',
                             ['game-ccd55950.html'])
    def test_it_loads(self, filename):
        full_fn = os.path.join(THIS_FILE_DIR, '..', 'games', filename)
        history = ConcordiaHistory(filename=full_fn)
        assert history is not None
        assert history.num_moves > 20, "Each example has at least 20 moves."

    @pytest.mark.parametrize('filename',
                             ['game-ccd55950.html'])
    def test_read_a_line(self, filename):
        full_fn = os.path.join(THIS_FILE_DIR, '..', 'games', filename)
        with open(full_fn, 'r') as f:
            lines = f.readlines()
        history = ConcordiaHistory(filename=full_fn)
        print(lines[0:20])
        assert history.move_from_line(lines[17]) is not None

    @pytest.mark.parametrize('filename',
                             ['game-ccd55950.html'])
    def test_not_much(self, filename):
        # Leave this until we have a BS4 Quickstart-based test.
        full_fn = os.path.join(THIS_FILE_DIR, '..', 'games', filename)
        with open(full_fn, 'r') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
        history_table = soup.find_all('table', 'clHisto')
        print([str(x)[0:100] for x in history_table])
        assert len(history_table) > 0
        assert len(history_table) == 1

        all_th = [x.text for x in history_table[0].find_all('th')]
        all_td = [x.text for x in history_table[0].find_all('td')]
        assert all_th == ['', 'philip9999', 'Atroniclus']
        assert all_td[:10] == [
            '2020-08-29 at 20:05',
            'End of game - Scoring\n'
            '\n'
            '\n'
            'philip9999Atroniclus07114424334420168249001800120200147134',
            '',
            '0',
            '7',
            '',
            '1',
            '1',
            '',
            '44',
        ]
        assert all_td[50:55] == [
            'Move colonists',
            'Atroniclus2020-08-29 at 16:01',
            'Plays the card\xa0',
            'philip99992020-08-29 at 13:13',
            'Buys\xa0:\xa01\xa0Cost\xa0:\xa05'
              'Buys\xa0:\xa01\xa0Cost\xa0:\xa03',
    ]


def main():
    pass


if __name__ == "__main__":
    main()
