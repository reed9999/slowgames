"""Classes to implement parsing and analysis of Concordia histories"""
# TODO retrofit once this package is ready, if I can ever get it
# installed!
from bs4 import BeautifulSoup

from game_controller import GameHistory

class ConcordiaHistory(GameHistory):
    def __init__(self, filename=None):
        self._moves = []
        with open(filename, 'r') as the_file:
            lines = the_file.readlines()
        self._moves = [self.move_from_line(line) for line in lines
                       if self.move_from_line(line) is not None]

    @property
    def num_moves(self):
        return len(self._moves)

    @staticmethod
    def move_from_line(line):
        return None



def main():
    pass


if __name__ == "__main__":
    main()