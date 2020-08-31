"""Pytest-compatible classes and functions testing the Few Acres
classes"""
import pprint
import re
import time

import pytest

from few_acres_of_snow.few_acres_classes import \
    FewAcresOfSnowController, FewAcresOfSnowHistory
from few_acres_of_snow.tests.test_moves import moves9575653_fr
from site_yucata.classify_games import YucataDownloader


class TestFewAcresAnalyzer():
    pass

class TestFewAcresHistory():
    pass


def test_basic_report():
    try:
        with open('few_acres_of_snow/ph_9575653.js', 'r') as f:
            full_html = f.read()
    except:
        with open('ph_9575653.js', 'r') as f:
            full_html = f.read()

    history = FewAcresOfSnowHistory(full_html)
    print(history.basic_report())

def test_via_stdout(capsys):
    # https://www.yucata.de/en/Game/FewAcresOfSnow/9575653
    analyzer = FewAcresOfSnowController(moves_list=moves9575653_fr)
    all_moves = analyzer.iterate_through_moves()
    time.sleep(0.5)  # let the debugs finish before printing out
    for i in range(0, len(moves9575653_fr)):
        print(i)
        pprint.pprint(all_moves[i])
    captured = capsys.readouterr()
    patt = """84
\\('uk',
 \\["develop: St. Mary's; St. Mary's; Boston",
  'money from: New Haven',"""
    assert re.search(patt, captured.out, re.MULTILINE)

def test3():
    # Trader: Gaspé, Montreal, Tadoussac = 33, 30, 23
    # s = '»Ì°²µ,½Ð'
    # Successful ambush by Rangers on free Reg Inf in reserve:
    s = '¶ãTË°'
    analyzer = FewAcresOfSnowController(moves9575653_fr[:2])
    pprint.pprint(analyzer.move_to_actions(s))

def test_priest():
    code = '¸×TC±'
    analyzer = FewAcresOfSnowController(['°Í³¶µ,½Ø', code])
    pprint.pprint(analyzer.move_to_actions('°Í³¶µ,½Ø'))
    pprint.pprint(analyzer.move_to_actions(code))

def test_download_games():
    dl = YucataDownloader('FewAcresOfSnow')
    rv = dl.request_top_players()
    print(pprint.pformat(rv))


@pytest.mark.skip("Logged in interaction may not be possible without browser-driving.")
def test_get_my_id():
    id = YucataDownloader.user_id_for('philip9999')
    assert id == 5

def main():
    # test1()
    # test_priest()
    test_via_stdout()
    # test3()

    # TESTS OF DOWNLOADING GAMES
    # test_download_games()
    # test_get_my_id()



if __name__ == "__main__":
    main()