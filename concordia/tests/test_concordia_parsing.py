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
    def test_not_much(self, filename):
        full_fn = os.path.join(THIS_FILE_DIR, '..', 'games', filename)
        with open(full_fn, 'r') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
        assert soup is not None
        print(soup)

def main():
    pass


if __name__ == "__main__":
    main()