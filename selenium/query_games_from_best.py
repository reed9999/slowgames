import logging
import re
import os
import time
from pprint import pprint as pp

from selenium import webdriver
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.select import Select


YUCATA = {
    'username_field': (By.NAME, "ctl00$ctl08$edtLogin"),
    'password_field': (By.NAME, "ctl00$ctl08$edtPassword"),
    'login_button': (By.NAME, "ctl00$ctl08$btnLogin"),
    'filter_game_type_select' : (By.ID, "selFilterGameType"),
    'player_games_table': (By.ID, "divPlayerRankingListTable"),
    }
GAME_URL_NAMES = [
        "Atoll",
        "SaintPetersburg2",
        "CarsonCity",
        "FewAcresOfSnow",
        "GroundFloor",
        "Rajas",
        "ClaimIt",
        ]

STOP_SHORT = 2

def main():
    driver = webdriver.Chrome()
    driver.get('http://yucata.de')

    uname = os.getenv("YUNAME")
    pw = os.getenv("YPW")
    if not pw:
        pw = input(f"Password not set; please input password for user {uname}.")
    log_in_to_yucata(driver, uname, pw)
    
    top_players_dict = {}
    for game in ["SaintPetersburg2"]: ### GAME_URL_NAMES:
        players = get_top_players(driver, game)
        top_players_dict[game] = players

    game_game_ids_dict = {}
    for game in ["SaintPetersburg2", ]:
        game_game_ids_dict[game] = []
        for player in top_players_dict[game]:
            pp(f"Games for player {player} game {game}")
            gg = get_player_games(driver, player, game)
            pp(f"for player {player} len {len(gg)}")
            game_game_ids_dict[game] += gg

    pp(game_game_ids_dict.keys())
    pp(game_game_ids_dict["SaintPetersburg2"][:10])
    # map(lambda x: get_and_save_game(driver, x), game_game_ids_dict["SaintPetersburg2"])
    for gid in game_game_ids_dict["SaintPetersburg2"]:
        get_and_save_game(driver, gid)


def log_in_to_yucata(driver, username: str, password: str):
    assert username and password
    uname = driver.find_element(*YUCATA["username_field"])
    pw = driver.find_element(*YUCATA["password_field"])
    uname.send_keys(username)
    pw.send_keys(password)
    login_button = driver.find_element(*YUCATA["login_button"])
    login_button.click()


def get_top_players(driver, game: str) -> list[str] | None:
    GAME_PAGE = f"https://www.yucata.de/en/GameInfo/{game}"
    driver.get(GAME_PAGE)
    try:
        tbl = driver.find_element(By.CLASS_NAME, "Ranking")
        row_strs = tbl.text.split("\n")
    except NoSuchElementException:
        print(f"Element not found in game {game}")
        return None
    rv: list[str] = []
    pattern = r"([a-zA-Z0-9]*) [0-9]{3,4}"
    for r in row_strs[1:]:
        match = re.search(pattern, r)
        if match:
            rv.append(match.group(1))
        else:
            raise RuntimeError(f"No match found in row string {r}")
    return rv


def get_player_games(driver, player, game):
    ids = {
        "Atoll": 38,
        "SaintPetersburg2": 359,
        }
    game_id = ids[game]
    driver.get(f"https://www.yucata.de/en/Ranking/{player}#game_{game_id}")

    time.sleep(0.5)
    games_tbl = driver.find_element(*YUCATA["player_games_table"])

    row_strs: list[str] = games_tbl.text.split("\n")[1:]
    logging.debug(f"len row_strs {len(row_strs)}")

    rv: list[str] = []
    pattern = r"([0-9]+) -{0,1}[0-9]+$"
    for r in row_strs:
        match = re.search(pattern, r)
        print(match)
        if match:
            rv.append(match.group(1))
            logging.debug(f"Added group to rv of len {len(rv)}")
        else:
            raise RuntimeError(f"No match found in row string {r}")
    return rv


def get_and_save_game(driver, game: str):
    logging.info(f"get and save {game}")
    driver.get(f"https://www.yucata.de/en/Game/{game}")
    # We need some time for the framework to load the page.
    # We could probably get away with less sleep if polling for 
    # readiness but this is OK for now.
    time.sleep(5)
    with open(f"game-{game}.html", "w") as outfile:
        outfile.write(driver.page_source)

def save_game_harness():
    driver = webdriver.Chrome()
    driver.get('http://yucata.de')

    uname = os.getenv("YUNAME")
    pw = os.getenv("YPW")
    log_in_to_yucata(driver, uname, pw)
    
    game_id = "15070689"
    get_and_save_game(driver, game_id)

if __name__ == "__main__":
    main()


