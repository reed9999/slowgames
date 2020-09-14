"""Pytest-compatible classes and functions testing the Few Acres
classes"""
import os
import pprint
import re
import time

import pytest

from few_acres_of_snow.few_acres_classes import \
    FewAcresOfSnowController, FewAcresOfSnowHistory
from few_acres_of_snow.tests.test_moves import moves9575653_fr, moves9547143
from game_controller import Fw1GameHistory
from site_yucata.classify_games import YucataDownloader

THIS_FILE_DIR = os.path.dirname(os.path.realpath(__file__))

# It's unclear whether we can ever automatically download games, or at least
# without some special tool like Selenium that preserves sessions long enough
# to enjoy my normal user access to player data.
TEST_DOWNLOADS = False
skip_login_test = pytest.mark.skipif(
    not TEST_DOWNLOADS, reason="Not running tests requiring login at present")


# FIXTURES
@pytest.fixture(params=[
    'few_acres_of_snow/games/2020/08/10348395.js',
    'few_acres_of_snow/games/2020/Q1/ph_9547143.js',
])
def game_history(request):
    with open(os.path.join(THIS_FILE_DIR, '..', '..', request.param)) as f:
        content_lines = f.readlines()
    return Fw1GameHistory(html=content_lines)


# STUB CLASSES; we might add tests here eventually, or might delete them.
class TestFewAcresAnalyzer():
    pass

class TestFewAcresHistory():
    pass


@skip_login_test
def test_get_my_id():
    id = YucataDownloader.user_id_for('philip9999')
    assert id == 5

@skip_login_test
def test_download_games():
    dl = YucataDownloader('FewAcresOfSnow')
    rv = dl.request_top_players()
    print(pprint.pformat(rv))

@pytest.mark.skip(msg="This doesn't do anything useful yet.")
def test_basic_report():
    fn = os.path.join(THIS_FILE_DIR, '..', 'games', '2020', 'Q1', 'ph_9575653.js')
    with open(fn, 'r') as f:
        full_html = f.read()

    history = FewAcresOfSnowHistory(full_html)
    # For now this part is broken
    # print(history.basic_report())
    assert history is not None


# @pytest.fixture()
# def foo():
#     return 'whatever'

def test_via_stdout(capsys, ):
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


def test_9547143(capsys):
    """This game is interesting mostly because I was convinced one of the moves
    had changed on the site (move 4). See site/user-interface-notes"""
    # https://www.yucata.de/en/Game/FewAcresOfSnow/9547143
    analyzer = FewAcresOfSnowController(moves_list=moves9547143)
    all_moves = analyzer.iterate_through_moves()
    time.sleep(0.5)  # let the debugs finish before printing out
    for i in range(0, len(moves9547143)):
        print(i)
        pprint.pprint(all_moves[i])
    captured = capsys.readouterr()
    with open ('__temp9547143.txt', 'w') as f:
        f.writelines(captured.out)

    patt = """0
\\('uk', \\['merchant: Using vessel Norfolk: .*"""
    assert re.search(patt, captured.out, re.MULTILINE)

    patt = """4
\\('uk',
 \\["settle: Halifax; Pemaquid; Norfolk; St. Mary's", 'money from: New York'\\]\\)
"""
#     patt = """4
# \\('uk',
# (.*)"""
    assert re.search(patt, captured.out, re.MULTILINE)

def test_param_fun(game_history, ):
    assert len(game_history) > 100
    assert len(game_history) < 200

## To help understand why the previous asserts show a len of 0.
def test_history_regex():
    # arbitrary from 10348395
    strs = [
        "HistoryMove[174] = '²·ä·,¾Ô';",
        "HistoryStatus[174] = '307°°²±°±²·;´±²±µ±±´°°²°´°²³°³³°°±°µ¸°¸±µ°¶°¶µ¶±;,;"
        "±²±±--±±°°°°,0,ÌÕÙÚµ,IÛËÝÜ,DÒ,Þ²´ÑÐGÖ±¶Ï×ÈÄ³ÎÔÍØF,,,±°°°°,°°±²,;°²³°--±±°°°°,"
        "5,×ÙÛ°¿,ÖÑÒÞ,³²ËØµC±å,Eãä·Ô,,,±°°°°,°°±²,;';",
        "HistoryMove[175] = '»Ìµ,¾Ú';",
    ]
    h = Fw1GameHistory(html=strs)
    h.init_from_html()
    assert len(h._html) == 3
    assert h.match_on_move(h._html[0]) is not None
    assert h.match_on_move(h._html[1]) is None
    assert h.match_on_status(h._html[1]) is not None
    assert h.match_on_move(h._html[2]) is not None
    assert len(h) == 3


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



def main():
    pass
    # test1()
    # test_priest()
    # test_via_stdout()
    # test3()

    # TESTS OF DOWNLOADING GAMES
    # test_download_games()
    # test_get_my_id()



if __name__ == "__main__":
    main()