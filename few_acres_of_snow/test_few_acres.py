"""Pytest-compatible classes and functions testing the Few Acres
classes"""
import pprint

from few_acres_of_snow.few_acres_classes import \
    FewAcresOfSnowAnalyzer, FewAcresOfSnowHistory
from few_acres_of_snow.test_moves import moves9575653_fr

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
    analyzer = FewAcresOfSnowAnalyzer(moves9575653_fr[:20])
    pprint.pprint(analyzer.iterate_through_moves())

def test3():
    # Trader: Gaspé, Montreal, Tadoussac = 33, 30, 23
    # s = '»Ì°²µ,½Ð'
    # Successful ambush by Rangers on free Reg Inf in reserve:
    s = '¶ãTË°'
    analyzer = FewAcresOfSnowAnalyzer(moves9575653_fr[:20])
    pprint.pprint(analyzer.move_to_actions(s))

def main():
    # test1()
    test2()
    test3()


if __name__ == "__main__":
    main()