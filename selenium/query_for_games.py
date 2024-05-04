import os
import time
from pprint import pformat, pprint as pp

from selenium import webdriver
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.common.by import By

UNAME = os.getenv("YUNAME")
PW = os.getenv("YPW")

YUCATA = {
    'username_field': (By.NAME, "ctl00$ctl08$edtLogin"),
    'password_field': (By.NAME, "ctl00$ctl08$edtPassword"),
    'login_button': (By.NAME, "ctl00$ctl08$btnLogin"),
    }

def main():
    driver = webdriver.Chrome()
    driver.get('http://yucata.de')
    log_in_to_yucata(driver, UNAME, PW)
    
    time.sleep(1)
    harvest_and_write_results(driver)



def harvest_and_write_results(driver):
    game_urls = harvest_urls(driver, 15061800, 15062000)
    pp(game_urls)
    with open("game_urls.json", "w") as outfile:
        outfile.write(pformat(game_urls))



def harvest_urls(driver, start=None, after_stop=None):
    game_urls = {}
    for i in range(start, after_stop):
    # https://www.yucata.de/en/Game/Rajas/15062745#page
        url = f"https://www.yucata.de/en/Game/{i}"
        try:
            driver.get(url)
            time.sleep(0.5)
            game_urls[i] = driver.current_url
        except WebDriverException:
            game_urls[i] = "ERROR: WebDriverException"

    return game_urls


def log_in_to_yucata(driver, username: str, password: str):
    uname = driver.find_element(*YUCATA["username_field"])
    pw = driver.find_element(*YUCATA["password_field"])
    uname.send_keys(UNAME)
    pw.send_keys(PW)
    login_button = driver.find_element(*YUCATA["login_button"])
    login_button.click()


def get_top_players(driver):
    GAME_PAGE = "https://www.yucata.de/en/GameInfo/FewAcresOfSnow"
    driver.get(GAME_PAGE)
    tbl = driver.find_element(By.CLASS_NAME, "Ranking")
    return tbl.text.split("\n")

FILTER = "selFilterGameType"

def get_player_games(driver, player, game):
	# Pretty messy - refactor this around
    PL = "https://www.yucata.de/en/Ranking/Fede"
    player = PL
    driver.get(player)
    pulldown = driver.find_element(By.ID, FILTER)
    return pulldown


if __name__ == "__main__":
    main()

