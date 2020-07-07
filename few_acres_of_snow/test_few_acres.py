"""Pytest-compatible classes and functions testing the Few Acres
classes"""
import pprint

from few_acres_of_snow.few_acres_classes import \
    FewAcresOfSnowAnalyzer, FewAcresOfSnowHistory
from few_acres_of_snow.test_moves import moves9575653_fr
from game_analyzer import GameDownloader
from site_yucata.classify_games import YucataDownloader


class TestFewAcresAnalyzer():
    pass

class TestFewAcresHistory():
    pass


def test1():
    players = ['uk', 'fr']
    i = 0
    try:
        with open('few_acres_of_snow/ph_9575653.js', 'r') as f:
            full_html = f.read()
    except:
        with open('ph_9575653.js', 'r') as f:
            full_html = f.read()

    history = FewAcresOfSnowHistory(full_html)
    print(history.basic_report())
    # print(["****" + ms for )

def test2():
    # https://www.yucata.de/en/Game/FewAcresOfSnow/9575653
    global moves9575653_fr
    # moves9575653_fr = moves9575653_fr[82:]
    analyzer = FewAcresOfSnowAnalyzer(moves9575653_fr)
    all_moves = analyzer.iterate_through_moves()
    for i in range(0, len(moves9575653_fr)):
        print(i)
        pprint.pprint(all_moves[i])

def test3():
    # Trader: Gaspé, Montreal, Tadoussac = 33, 30, 23
    # s = '»Ì°²µ,½Ð'
    # Successful ambush by Rangers on free Reg Inf in reserve:
    s = '¶ãTË°'
    analyzer = FewAcresOfSnowAnalyzer(moves9575653_fr[:2])
    pprint.pprint(analyzer.move_to_actions(s))

def test_priest():
    code = '¸×TC±'
    analyzer = FewAcresOfSnowAnalyzer(['°Í³¶µ,½Ø', code])
    pprint.pprint(analyzer.move_to_actions('°Í³¶µ,½Ø'))
    pprint.pprint(analyzer.move_to_actions(code))

def test_download_games():
    dl = YucataDownloader('FewAcresOfSnow')
    rv = dl.request_top_players()
    print(pprint.pformat(rv))

def test_get_my_id():
    id = YucataDownloader.user_id_for('philip9999')
    assert id == 5

def main():
    test1()
    # test_priest()
    # test2()
    # test3()

    # TESTS OF DOWNLOADING GAMES
    # test_download_games()
    test_get_my_id()



if __name__ == "__main__":
    main()