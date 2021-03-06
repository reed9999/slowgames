"""Pre-parsed lists of moves for testing the FewAcresAnalyzer"""
# https://www.yucata.de/en/Game/FewAcresOfSnow/9575653
moves9575653_fr = [
    # """The sequence at the end is an example of how the move count handles the non-move
    # of withdrawing from a defensive siege, followed by the inability to settle.
    # Britain's entire move gets repeated before and after France's non-settlement.
    # ```
    # HistoryMove[82] = '±¶¶°,¹±,Å1Ì-';
    # HistoryStatus[82] = '308¶Ì²°°;²²²²²²²°²°°²°°°°³°°°°°°µ´°µ°°²µ°·µ¸°;,;°²±°--±±°°°°,12,Ûä,,,ãÍ¸HØ²åÙµIÈ³»¶°±,,,±°°°°,°±°³,;±²°±--±±°°°°,1,ÐÑÙÝE,,ÏÌ,C¶Î²×DÖÍµ±³ËÒÓ,,,±°°°°,°°±²,;±¶¶°,¹±,Å1Ì-';
    # HistoryMove[83] = 'WÌ';
    # HistoryStatus[83] = '308°°²°°;²²²²²²²°²°°²°°°°³°°°°°°µ´°µ°°²µ°·µ¸°;,;°²±°--±±°°°°,12,Ûä,,,ãÍ¸HØ²åÙµIÈ³»¶°±,,,±°°°°,°±°³,;±²°±--±±°°°°,1,ÐÑÙÝE,,ÏÌ,C¶Î²×DÖÍµ±³ËÒÓ,,,±°°°°,°°±²,;±¶¶°,¹±,Å1Ì-';
    # HistoryMove[84] = '±¶¶°,¹±,Å1Ì-';
    # HistoryStatus[84] = '308°°²°°;²²²²²²²°²°°²°°°°³°°°°°°µ´°µ°°²µ°·µ¸°;,;°²±°--±±°°°°,12,ÙÛä²H,,µÈ³°å¶IÍØ»¸±ã,,,,±°°°°,°±°³,;±²°±--±±°°°°,1,ÐÑÙÝE,,ÏÌ,C¶Î²×DÖÍµ±³ËÒÓ,,,±°°°°,°°±²,;';
    # HistoryMove[85] = 'ÄP,ÄP';
    # HistoryStatus[85] = '318°°²±°;²²²²²²²°²°°²°°°°³°°°°°°µ´°µ°°²µ°·µ¸°;,;°²±°--±±°°°°,12,ÙÛä²H,,µÈ³°å¶IÍØ»¸±ã,,,,±°°°°,°±°³,48;±²°±--±±±°°°,1,ÐÑÙÝE,,ÏÌ,C¶Î²×DÖÍµ±³ËÒÓ,,,±°°°°,°°±²,30;';
    # var MoveCount = 86;
    # ```

    '³Ì´³°',
    '´ÌË',
    '½Ô,½Ù',
    'Î0XX,»Ì°²µ,½Ð',    # win siege, Trade Gaspe, Mtl, Tad
    'º±²µ,½ã',
    '¼±´,¿Ë',
    '¶ãTË°,°À´¶',    # move 6 + 1
    '½Ë,½Í',    # move 7 + 1
    'ÃÙ,º³²µ,½C',    # move 8 + 1
    '½Î,ÃÐ,»Ì°²µ¶',    # move 9 + 1
    '¾À,µÒCR³',    # move 10 + 1
    'ÃÐ,¼±´,¾Ë°',    # move 12 (FR): Home support, piracy, discard.
    # FR cards: Trader, Coureurs, Mtl, Tad, 3 Riv.
    '°È°³µ,½D',    # move 12 + 1
    '»Ì²µ¶,½Ö',    # move 13 + 1 (FR): Trade, draft natives
    'ÃÙ,³Ì´±²,µÒãRÖ',    # move 15 (UK): Home support, besiege, raid
    '´ÌÎ,¾´°',    # move 15 + 1
    '±ÈÈ¶,½ä',    # move 16 + 1
    'Î0XX,ÃÐ,»Ì²µ¶,½Ñ',    # move 17 + 1
    'µÌãRÍ,µÌC',    # move 18 + 1
    '¼±³,¿Ë',    # move 19 + 1
    '¹³,¹±',    # move 20 + 1
    'ÃÐ,Â³,²ÒÎ³',    # move 21 + 1
    'ÃÙ,±´´µ,¹°',    # move 22 + 1
    '½×,½Ï',    # move 23 + 1
    '¿Ô,²ÀÀä',    # move 24 + 1
    '»Ìµ¶,½Ò',    # move 25 + 1
    'ÃÙ,¶ãBÖ,¶DTË°',    # move 26 + 1
    '½Ë,¾´°²',    # move 27 + 1
    '°ÍÃÐ³¶µ,½Ø',    # move 28 + 1
    'ÃÐ,¸×TC±,ÂÐ,ÃÐ',    # move 29 + 1
    '°ÌÈ²°,¾´',    # move 30 + 1
    '»Ìµ¶,½Ù',    # move 31 + 1
    '¹±,²ÈÈä',    # move 32 + 1
    '¿Ò,½Ý',    # move 33 + 1
    '¹²,¹³',    # move 34 + 1
    '¼±³,½Ó',    # move 35 + 1
    '¹µ,¹°',    # move 36 + 1
    '¶CBD,¿Ï',    # move 37 + 1
    '±ÌÌ¶,½Ö',    # move 38 + 1
    '¿Ë,¾µ',    # move 39 + 1
    '½å,¾´À',    # move 40 + 1
    '²ÐÎ¶,ÄP',    # move 41 + 1
    'ÃÙ,¹Í,²ÌÌä',    # move 42 + 1
    '¿Ù,¹³',    # move 43 + 1
    '¹³,¾À',    # move 44 + 1
    'ÃÐ,¸×C,¾´°',    # move 45 + 1
    '°»±¶µ,½E',    # move 46 + 1
    '¾Ý,¶ÍBã',    # move 47 + 1
    'Áå´,¿Ö',    # move 48 + 1
    '»Ì²,ÂÐ',    # move 49 + 1
    '¸ØC,ºÈ²°',    # move 50 + 1
    'ÃÐ,ÂÐ,ÃÐ,¶CBD',    # move 51 + 1
    '¹Í,½H',    # move 52 + 1
    '¸×C,º±¶',    # move 53 + 1
    'ÁåÀ,ºÌ±',    # move 54 + 1
    '¾°,¾Î',    # move 55 + 1
    '±»»µ,¶ãBÖ',    # move 56 + 1
    '¹²,¶ÍBE',    # move 57 + 1
    'ÃÙ,±³³°,¾È',    # move 58 + 1
    '¾´,¾Ý',    # move 59 + 1
    '¾È,¸ØC',    # move 60 + 1
    '»Ìµ,¸×TE±',    # move 61 + 1
    '±ÍÍ¶,½Û',    # move 62 + 1
    'ÀÒÏËÙ,³Ì±³Ù,·ÌÒ,´ÌË',    # move 63 + 1
    'ÀÔÖ,´ÌÖ,´ÌÔ',    # move 64 + 1
    'ÁÏ°´,¿Ý',    # move 65 + 1
    'Î1LË,°¸µ³H,¹²',    # move 66 + 1
    'ÃÐ,¹¶,¾Î',    # move 67 + 1
    'ÃÙ,ÁåÌ,¹»',    # move 68 + 1
    '¶ÍC,½Ë',    # move 69 + 1
    '±±±°,½I',    # move 70 + 1
    '¹²,¿Ó',    # move 71 + 1
    '¶ãBC,¹Í',    # move 72 + 1
    '¿Ò,¹¶',    # move 73 + 1
    '±¸¸H,¿Ö',    # move 74 + 1
    '¾Î,¹²',    # move 75 + 1
    '¸ØC,¿Ô',    # move 76 + 1
    '¸×TD±,¶ÖTÔ°',    # move 77 + 1
    '¹²,¾å',    # move 78 + 1
    '¶ÍTÖ°,¾µ',    # move 79 + 1
    'ÃÙ,±µµI,ºÈ³»',    # move 80 + 1
    '³Ì±³Ë,ÀÝÓÒ,·ÌÒ,´ÌÓ',    # move 81 + 1
    '±¶¶°,¹±,Å1Ì-',    # move 82 + 1
    'WÌ',    # move 83 + 1
    '±¶¶°,¹±,Å1Ì-',    # move 84 + 1
    'ÄP,ÄP',    # move 85 + 1
    ]




# older

TEST_BED = [
    # 9547143
    'º³µ²',
    '¼±´',
    'º³µ°,½Ó',
    # '»Ì°²¶,½Í', ## 4th move; See comment in header
    '½Í,»Ì°²', ## 4th move; See comment in header
    '°È´³¶,¹²',
    '¿Ë,¹³',
    '³Ì°±Ó,½Õ',
    'ÀË,´ÌË,¾°µ¶',
    '´ÌÕ,´Ì±',
    '´Ì²,½Ú',
    '´Ì²,¹µ',
    '´Ì±,»Ì°',
    '´ÌÈ,±´´¶',
    '´Ì³,½Ù',
    'º³µ°,½Ö',
    '´ÌÚ,½Î',
    '´ÌÖ,¹µ',

    '¶DC,½Ò',
    'Î0LÍDB,±±±²,½å',
    'ÀÏ,ÁÏ°,ÃÐ,»Ì¶',
    '¿Ý,¾Ê',
    'µ´DÖRC,¹³',
    'ÃÙ,¸ØC,µÒãE',
    'ÃÐ,»Ì²¶,¿Ò',
]

TEST_BED_02 = [
    # I believe this is the mellyagain game.
    # https://yucata.de/en/Game/FewAcresOfSnow/8945638
    '°È°³¶',
    '¿Ë',
    'º±²µ,½ä',
    '¹¶,½Î',
    '±³³¶,±´´°',
    '¼±´,¹²',   # piracy
    '°·²¶µ,¹°',
    '»Ì²,±Îµ³',
    '²ÈäÈ,½H',
    '²Ì´Î,¹¶',      ## Fortify PR;
    'ºÈ³,¾´',
    '»Ì°¶,½Í',
    '²·ä·,°»±¶°',
    '²Ò³Î,¼±´',
    '±»»H,±µµ²',
    '¼±´,»Ì²µ',
    '±±±°,¿ä',
    '²ÇÎ°,±Ð¶³',
    '±ÈÈ¶,½C',
    '²Ð¶Î,¹´',
    '±··H,¹³',
    '±Ç°³,»Ìµ',
    '±¶¶²,½D',
    '»Ì²µ,½Ó',
    '½Ñ,½å',
    '²ÊÎ±,º³¶',
    'ºÈ±°,¾´',
    'º´¶,½Ö',
    'º³µ»,½Ò',
    '²ÎÎµ,»Ì°',
    '°¹È°H,ÄP',
    '±Ê±³,¿Ó',
    '¹²,¿å',
    '±Ñ²³,¾°',
    '°Æ·¶,µÑCDRÖ,Àäå',
    '»Ìµ,ÄP',
    'Áå±´,¿Ñ',
    '¹¶,½Ñ',
    'ÁåÈ,¾Ò',
    '¾±,¾µ',
    'µÑCDR²,¹°',        ## Raid on Montreal with two natives, failing.
    'µ¹ÍRä,½I',
    '°Í³¶²,¾H',
    'Â²,²ÑÎ²',
    '¹µ,½Ý',
    '±Ì´³,»Ì°¶',
    '¹²,¹»',
    '¾I,¾Ì',
    '¿Ý,¾·',
    '¾Î,ÄP',
    '±ÍÍ°,¾å',
    '¾°,¾Ñ',
    '±¹¹µ,¿Ò',
    '°¿²µ,¹¶',
]
