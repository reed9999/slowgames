"""Ad hoc tests of the PetersburgAnalyzer and PetersburgHistory classes.
These functions were moved from the main code file into this templated test file and
are otherwise untested as tests."""
from petersburg.petersburg_analyzer import PetersburgHistory, PetersburgAnalyzer

def main():
    test_current_player()
    test_move_str()

def test_current_player():
    for input, result in [
        ((28, 28, 1), 1),
        ((28, 28, 0), 0),
        ((29, 28, 0), 1),
        ((30, 28, 0), 0),
        ((21, 19, 1), 1),
        ((27, 19, 1), 1),
        ((28, 19, 1), 0),
    ]:
        rv = PetersburgHistory.current_player_from(move_num=input[0],
                                                   round_first_move=input[1],
                                                   round_first_player=input[2])
        assert rv == result, "input: {} expected {} got {}".format(input, result, rv)
    try:
        _ = PetersburgHistory.current_player_from(28, 35, 1)
        assert False, "It should have thrown an error!"
    except AssertionError:
        # Good, threw the error.
        pass

def test_move_str():
    a = PetersburgAnalyzer(filename='petersburg/tests/inputs/ph_9514605.js')
    assert a.move_str((1, 0)) == 'bought lumberjack 3', a.move_str((1, 0))
    assert a.move_str((1, 15)) == 'bought Schäfer 5', a.move_str((1, 15))
    assert a.move_str((1, 9)) == 'bought Goldgrüber 4', a.move_str((1, 9))
    assert a.move_str((1, 13)) == 'bought Schäfer 5', a.move_str((1, 13))
    assert a.move_str((1, 12)) == 'bought Schäfer 5', a.move_str((1, 12))
    assert a.move_str((1, 24)) == 'bought Schiffbauer 7', a.move_str((1, 24))
    assert a.move_str((2, 54)) == 'took up Schenke 2:1', a.move_str((2, 54))
    assert a.move_str((2, 55)) == 'took up Schenke 2:1', a.move_str((2, 55))
    assert a.move_str((2, 32)) == 'took up Markt 1 5', a.move_str((2, 32))
    assert a.move_str((10, 1)) == 'passed', a.move_str((10, 1))
    assert a.move_str((5, 2, 70)) == 'used observatory -- took up card 70', a.move_str((5, 2, 70))
    # assert a.move_str((1, 0)) == 'bought lumberjack 3', a.move_str((1, 0))
    # assert a.move_str((1, 15)) == 'bought weaver 5', a.move_str((1, 15))


if __name__ == "__main__":
    main()