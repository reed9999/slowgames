"""Tests for Concordia parsing."""
import os

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
        # Not yet; first make a stub pass.
        # assert history.num_moves > 20, "Each example has at least 20 moves."


def main():
    pass


if __name__ == "__main__":
    main()