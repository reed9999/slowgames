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

"""
<select id="selFilterGameType"><  
"-1">All games</option><  
"301">7 Steps</option><  
"90">A Few Acres of Snow</option><  
"97">At the Gates of Loyang</option><  
"38">Atoll</option><  
"380">Bonfire</option><  
"321">Bruges</option><  
"63">Campaign Manager 2008</option><  
"85">Can't Stop</option><  
"98">Carson City</option><  
"332">Claim It</option><  
"372">Fields of Arle</option><  
"327">Ground Floor</option><  
"355">Hadara</option><  
"108">Jaipur</option><  
"20">Just 4 Fun</option><  
"56">Just 4 Fun Colours</option><  
"313">La Granja</option><  
"376">Newton</option><  
"366">On the Underground</option><  
"323">Rajas of the Ganges</option><  
"142">Russian Railroads</option><  
"359">Saint Petersburg</option><  
"405">Skymines</option><  
"309">Snowdonia</option><  
"345">Steamrollers</option><  
"49">Stone Age</option><  
"126">The Castles of Burgundy</option><  
"324">The Oracle of Delphi</option><  
"347">Transatlantic</option></select>
"""



def main():
    driver = webdriver.Chrome()
    driver.get('http://yucata.de')

    uname = os.getenv("YUNAME")
    pw = os.getenv("YPW")
    if not pw:
        pw = input(f"Password not set; please input password for user {uname}.")
    log_in_to_yucata(driver, uname, pw)
    
    top_players_dict = {}
    # For now only put one game in this list to avoid mixing output files.
    # We can consider more than one when we start sorting the output correctly
    current_games_considered = ["CarsonCity", ]
    for game in current_games_considered:
        players = get_top_players(driver, game)
        top_players_dict[game] = players

    game_game_ids_dict = {}
    for game in current_games_considered:
        game_game_ids_dict[game] = []
        for player in top_players_dict[game]:
            pp(f"Games for player {player} game {game}")
            gg = get_player_games(driver, player, game)
            pp(f"for player {player} len {len(gg)}")
            game_game_ids_dict[game] += gg

    # map(lambda x: get_and_save_game(driver, x), game_game_ids_dict["SaintPetersburg2"])
    for gid in game_game_ids_dict[current_games_considered[0]]:
        get_and_save_game(driver, gid, )


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
        "CarsonCity": 98,
        "Rajas": 323,
        "SaintPetersburg2": 359,
        "Transatlantic": 347,
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


