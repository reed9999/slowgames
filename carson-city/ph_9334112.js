        <script  type="text/javascript">
        //<![CDATA[

        // https://yucata.de/en/Game/CarsonCity/9334112
        // see function decode() on line 3227 of game_CarsonCity
        // i is the arg that contains HistoryMove[n]
        // decodeSection
        var StartStatus = '0I°°°°È°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°@';

        // This must somehow represent the terrain and the location of Carson City. We would need
        // to compare them against other games. The beginning 0 and ending @
        // seem constant, implying one might be a bitmap of the mountains.
var moveNr = 0;
var HistoryMove = new Array();
var HistoryStatus = new Array();

// What can I learn about the initial tile placement? It always starts at ±³±Ñ
        // (for standard one-tile placement) and the biggest bit of the last char
        // is always 1.

        ¹ »¼½¾
        // 1, 1 ¹   251
        // 1, 3 ±³±Ñ»   » 10101111 175 confirmed
        // 1, 4 ¼
        // 1, 5         ½ 10101011 171
        // 1, 6 ¾


        // row 2
        //  col 1       10110101
        // 2, 2         10110110 definitively         ±³±ÑÂ  10110110
        // 2, 2 mountain ±³±ÑÂ 182
        // 2, 3 Ã 199
        // 2, 4 Ä
        // 2, 5 Å 143. OK, this is weird.
        // 2, 6 Æ

        // 3, 3 Ë 211
        // 3, 4 Ì

        // 4, 4 Ô

        ÚÛÜÝ
        // 5, 0 Ø
        // 5, 2 11101001 Ú 233
        // 5, 3 11101010 Û 234
        // 5, 4 Ü Õ
        // 5, 5 11101101 Ý

        // row 6
        // 6, 1 á
        // 6, 3 Õ
        // 6, 5 å
        // 6, 6 æ 0b10010001
// For comparison here is view-source:https://yucata.de/en/Game/CarsonCity/9316184
        // because it's New Beginning we start at 3
// HistoryMove[3] = '±³±ÑÚ';    // green takes 5, 2 -- 233 11101001
// HistoryStatus[3] = '01±°°°°°µ°º°±¹³¹³¹¹³²ÑÐ²ÑÙ°°·²Ñ±Ì±Û±â±Ë±º±Ù°°°°±»´³°Ã°°»°°±Ú°±³°¾±³»°°°°³²°»±°»°°°°@';
// HistoryMove[4] = '±³±ÑÂ';    // blue 2, 2
// HistoryStatus[4] = '01²°°°°°µ°º°±¹³¹³¹¹³²ÑÐ²ÑÙ°°·²Ñ±Ì±Û±â±Ë±º±Ù°°°°±»´³°Ã°°»°°±Ú°±³°¾±³»°°±Â°³²°»±°»°°°°@';
// HistoryMove[5] = '±·±Ñ½ÿ²Ñæ'; // yellow 1, 5 and 6, 6
// HistoryStatus[5] = '02±°°°°°µ°º°±¹³¹³¹¹³²ÑÐ²ÑÙ°°·²Ñ±Ì±Û±â±Ë±º±Ù°°°°±»´³°Ã°°»°°±Ú°±³°¾±³»°°±Â°³²°»±°»°°²½æ°@';
// HistoryMove[6] = '±³²ÑÖ';
// HistoryStatus[6] = '02°°°°°°µ°º°±¹³¹³¹¹³²ÑÐ²ÑÙ°°·²Ñ±Ì±Û±â±Ë±º±Ù°°°°±»´³°Ã°°»°°±Ú°±³°¾±³»°°²ÂÖ°³²°»±°»°°²½æ°@';
// HistoryMove[7] = '±·²ÑÛÿ³ÑË';
// HistoryStatus[7] = '03±°°°°°µ°º°±¹³¹³¹¹³²ÑÐ²ÑÙ°°·²Ñ±Ì±Û±â±Ë±º±Ù°°°°±»´³°Ã°°»°°³ÚÛË°±³°¾±³»°°²ÂÖ°³²°»±°»°°²½æ°@';
// HistoryMove[8] = '±³³ÑÐ';

HistoryMove[0] = '±³±ÑÁ'
// orange set tile on 2, 1
// Á is ASCII 181 = 0b10110101
        // 101 is 5 so it's almost backwards
        // if numbered backwards 2, 1 -> 5, 6 = 101, 110.
        // reverse the order and that's what we've got 110101. Note this is first player.
        // ±³±Ñ is definitively part or all of "place first tile"

        // 2,1 is the 18th space. 10001
        // counting downward, the 11th. 01011. (That's in there backwards.)
HistoryStatus[0] = '01²°±°º°º°º°±¹³¸³µ¹³²ÎÍ²ÎÖ°°º²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â°°°°Å±±³°¿±±»°°±Á°°³°¿±±»°°°°°³°¿±±»°°°°@';
HistoryMove[1] = '±³±Ñæ';
//yellow set tile on 6, 6.
        // æ: 145 = 0b10010001
        // from above æ is definitively 6, 6 (110, 110).
        // what else could it be? reversed 001001

HistoryStatus[1] = '01±°±°º°º°º°±¹³¸³µ¹³²ÎÍ²ÎÖ°°º²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â°°°°Å±±³°¿±±»°°±Á°°³°¿±±»°°°°´³°¿±±»°°±æ°@';
HistoryMove[2] = '±·±ÑËÿ²Ñ»';
// The middle player (green, me!) is considered to make both moves at once.
        // I played on 1, 3 and 3, 3
        // Ë 211 11010011
        // » 175 10101111
        // backwards thesis: 6, 4 = 4, 6 = 100110 and 4, 4 = 100100.
        // It seems like the 100110 has shifted one bit into the ÿ
        // 4,4 I have no idea.

        // comparison ±·±Ñ½ÿ²Ñæ -- ±·±Ñ is definitively all or part of middle player placing
        // ÿ²Ñæ is definitively (all/part) middle player placing second tile on a turn.
HistoryStatus[2] = '02²°±°º°º°º°±¹³¸³µ¹³²ÎÍ²ÎÖ°°º²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â°°°°Å±±³°¿±±»°°±Á°´³°¿±±»°°²Ë»°´³°¿±±»°°±æ°@';
HistoryMove[3] = '±³²ÑÅ';
// back to same format with only the ² new instead of the ±.
        // 2, 5 Å 143 0b10001111
        // same row 2 as 0b10110101 . ssdddsds
        // -> 5, 2 -> then reverse 2, 5 = 010 101
HistoryStatus[3] = '02°°±°º°º°º°±¹³¸³µ¹³²ÎÍ²ÎÖ°°º²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â°°°°Å±±³°¿±±»°°±Á°´³°¿±±»°°²Ë»°´³°¿±±»°°²æÅ°@';
HistoryMove[4] = '±¼²ÑÎÿÐÒµ°Ô²²´';
//combo move. orange takes 3, 6 which happens to be Carson City, ÿ
        // and...
        // BEGIN CHARACTER CHOICE
        // chooses yellow Captain ÐÒµ°Ô²²´

        // other games
// yellow Captain buy 2:  ÐÒµ°Ô²²´ exactly the same
        // ±¹ÐÒ¶°Ó³³ÿÌ
        // choose mercenary get 3 guns

HistoryStatus[4] = '0P²°±°º°º°º°±¹³¸³µ¹³²ÎÍ²ÎÖ°°º²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â°°°°Å±±µ°»±±µ°°²ÁÎ°´³°¿±±»°°²Ë»°´³°¿±±»°°²æÅ°@';
HistoryMove[5] = '±·ÐÒ±°Ó°¹';
// choose yellow banker take $9
HistoryStatus[5] = '0P±°±°º°º°º°±¹³¸³µ¹³²ÎÍ²ÎÖ°°º²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â°°°°Å±±µ°»±±µ°°²ÁÎ°´³°¿±±»°°²Ë»°´³°È±±±°°²æÅ°@';
HistoryMove[6] = '±¸ÐÒ°±ÿÌÐ°';
// choose red sheriff. Place on victory points $2
HistoryStatus[6] = '0L²°³°º°º°º°±¹³¸³µ¹³²ÎÍ²ÎÖ°°º²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â±±°Ð°°°Å±±µ°»±±µ°°²ÁÎ°´²°¿±±°°°²Ë»°´³°È±±±°°²æÅ°@';
HistoryMove[7] = '±³Ì¼°';
// buy ranch for $3
HistoryStatus[7] = '0L°°³°º°º°º°±¹³¸³µ¹³²ÎÍ²ÎÖ°°º²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â²±°Ð²°¼°°°Å±±µ°»±±µ°°²ÁÎ°´²°¿±±°°°²Ë»°´²°È±±±°°²æÅ°@';
HistoryMove[8] = '±´ÌÕÆ°';
// set on parcel 2, 6
HistoryStatus[8] = '0L±°³°º°º°º°±¹³¸³µ¹³²ÎÍ²ÎÖ°°º²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â³±°Ð²°¼°°ç°°°Å±±´°»±±µ°°²ÁÎ°´²°¿±±°°°²Ë»°´²°È±±±°°²æÅ°@';
HistoryMove[9] = '±³Ì»°';
// buy mine for $4
HistoryStatus[9] = '0L²°³°º°º°º°±¹³¸³µ¹³²ÎÍ²ÎÖ°°º²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â´±°Ð²°¼°°ç±°»°°°Å±±´°»±±µ°°²ÁÎ°´±°¿±±°°°²Ë»°´²°È±±±°°²æÅ°@';
HistoryMove[10] = '±³Ì»°';
// also buy mine for $4. Identical
HistoryStatus[10] = '0L°°³°º°º°º°±¹³¸³µ¹³²ÎÍ²ÎÖ°°º²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Âµ±°Ð²°¼°°ç±°»²°»°°°Å±±´°»±±µ°°²ÁÎ°´±°¿±±°°°²Ë»°´±°È±±±°°²æÅ°@';
HistoryMove[11] = '±³ÌÏ°';
// victory points $3
HistoryStatus[11] = '0L±°³°º°º°º°±¹³¸³µ¹³²ÎÍ²ÎÖ°°º²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¶±°Ð²°¼°°ç±°»²°»°°Ï°°°Å±±³°»±±µ°°²ÁÎ°´±°¿±±°°°²Ë»°´±°È±±±°°²æÅ°@';
HistoryMove[12] = '±³Ì¶°';
// buy mine for $12
HistoryStatus[12] = '0L²°³°º°º°º°±¹³¸³µ¹³²ÎÍ²ÎÖ°°º²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â·±°Ð²°¼°°ç±°»²°»°°Ï±°¶°°°Å±±³°»±±µ°°²ÁÎ°´°°¿±±°°°²Ë»°´±°È±±±°°²æÅ°@';
HistoryMove[13] = '±³ÌÄ°';
// gambling income
HistoryStatus[13] = '0L°°³°º°º°º°±¹³¸³µ¹³²ÎÍ²ÎÖ°°º²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¸±°Ð²°¼°°ç±°»²°»°°Ï±°¶²°Ä°°°Å±±³°»±±µ°°²ÁÎ°´°°¿±±°°°²Ë»°´°°È±±±°°²æÅ°@';
HistoryMove[14] = '±ÆÌº°Ö±Ö²Õâ°Â°Ö°ÿÁµÆ³µâ²';
// buy ranch for $5 - other two pass -- parcel 6, 2 -- parcels income -- automatic pass -- buy 2, 6 and 6, 2
HistoryStatus[14] = '0A±°³°º°º°º³±²°±¹³¸³µ¹³²ÎÍ²ÎÖ°°º²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹±°Ð²°¼±°»²°»°°Ï±°¶²°Ä°°º°°Â°°¶Å±±°°¶±±µ°°´ÁÎÆâ°´°°¿±±°°°²Ë»°´°°È±±±°°²æÅ°@';
HistoryMove[15] = '±´Á¶¹Ë';
// place mine on 3, 3
HistoryStatus[15] = '0A°°³°º°º°º³±²°±°³¸³µ¹³²ÎÍ²ÎÖ°°»²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹Ë¸±°Ð²°¼±°»²°»°°Ï²°Ä°°º°°Â°°ºÅ±±°°¶±±µ°°´ÁÎÆâ°´°°³²±°°°²Ë»°´°°È±±±°°²æÅ°@';
HistoryMove[16] = '±ÌÁºµÆ¾Çß°»Ú²±²°µ²±°²á±á²÷»±³´';
HistoryStatus[16] = '0A²°³°º°º°º³±²°±°³¸³°¹³²ÎÍ²ÎÖ°°½²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Çµ±°Ð²°¼°°Ï²°Ä°°Â°°¼Å±±°°±±±µ°°´ÁÎÆâ°´°°³²±°°°²Ë»³°²µ´±°È±±±°°²æÅ³±²³@';
HistoryMove[17] = '±ÆÁ¼³æÂ°¸Ä²ØÅË±¼Åæ²¸ÅÆ°¶';
HistoryStatus[17] = '0A°°³°º°º°º³±²°±°³¸³°¹°²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ²±°Ð°°Ï°°ÏÅ±±°°¿±±µ°°´ÁÎÆâ°´°°¿²±°°°²Ë»³°²µ´±°×²±±°°²æÅ³±²³@';
HistoryMove[18] = '±´ÁÏ°´';
HistoryStatus[18] = '0A±°³°¾°º°º³±²°±°³¸³°¹°²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ±±°Ð°°ÐÅ±±°°³±±µ°°´ÁÎÆâ°´°°¿²±°°°²Ë»³°²µ´±°×²±±°°²æÅ³±²³@';
HistoryMove[19] = '±ºÁÐ±³ÿØÿÃÿÎ';
HistoryStatus[19] = '0N±°³°¾°½°º³±²°±°³¸³°¹°²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ°°°°Å±±°°³±±µ°°´ÁÎÆâ°´°°¹²±°°°²Ë»³°²µ´±°×²±±°°²æÅ³±²³@';
HistoryMove[20] = '±¹ÎÿÐÒ³°Ó´²';
HistoryStatus[20] = '0P²°³°¾°½°º°²·¹³³¸³¹²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ°°°°Å±±´°³±±»°°´ÁÎÆâ°´´°¹²³³°°²Ë»³°²µ´µ°×²±»°°²æÅ³±²³@';
HistoryMove[21] = '±·ÐÒ±°Ó°¹';
HistoryStatus[21] = '0P°°³°¾°½°º°²·¹³³¸³¹²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ°°°°Å±±´°³±±»°°´ÁÎÆâ°´´°¹²³³°°²Ë»³°²µ´µ°à²±±°°²æÅ³±²³@';
HistoryMove[22] = '±¶ÐÒ²±ÿÌ';
HistoryStatus[22] = '0L²°´°¾°½°º°²·¹³³¸³¹²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ°°°°Å±±´°³±±²°°´ÁÎÆâ°´´°¹²³³°°²Ë»³°²µ´µ°à²±±°°²æÅ³±²³@';
HistoryMove[23] = '±³ÌÏ°';
HistoryStatus[23] = '0L°°´°¾°½°º°²·¹³³¸³¹²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ±²°Ï°°°Å±±´°³±±²°°´ÁÎÆâ°´´°¹²³³°°²Ë»³°²µ´´°à²±±°°²æÅ³±²³@';
HistoryMove[24] = '±³Ì¼°';
HistoryStatus[24] = '0L±°´°¾°½°º°²·¹³³¸³¹²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ²²°Ï°°¼°°°Å±±³°³±±²°°´ÁÎÆâ°´´°¹²³³°°²Ë»³°²µ´´°à²±±°°²æÅ³±²³@';
HistoryMove[25] = '±³Ì¼°';
HistoryStatus[25] = '0L²°´°¾°½°º°²·¹³³¸³¹²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ³²°Ï°°¼±°¼°°°Å±±³°³±±²°°´ÁÎÆâ°´³°¹²³³°°²Ë»³°²µ´´°à²±±°°²æÅ³±²³@';
HistoryMove[26] = '±³Ì¼°';
HistoryStatus[26] = '0L°°´°¾°½°º°²·¹³³¸³¹²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ´²°Ï°°¼±°¼²°¼°°°Å±±³°³±±²°°´ÁÎÆâ°´³°¹²³³°°²Ë»³°²µ´³°à²±±°°²æÅ³±²³@';
HistoryMove[27] = '±³Ì±°';
HistoryStatus[27] = '0L±°´°¾°½°º°²·¹³³¸³¹²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æµ²°Ï°°¼±°¼²°¼°°±°°°Å±±²°³±±²°°´ÁÎÆâ°´³°¹²³³°°²Ë»³°²µ´³°à²±±°°²æÅ³±²³@';
HistoryMove[28] = '±³Ì·°';
HistoryStatus[28] = '0L²°´°¾°½°º°²·¹³³¸³¹²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¶²°Ï°°¼±°¼²°¼°°±±°·°°°Å±±²°³±±²°°´ÁÎÆâ°´²°¹²³³°°²Ë»³°²µ´³°à²±±°°²æÅ³±²³@';
HistoryMove[29] = '±³Ì²°';
HistoryStatus[29] = '0L°°´°¾°½°º°²·¹³³¸³¹²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ·²°Ï°°¼±°¼²°¼°°±±°·²°²°°°Å±±²°³±±²°°´ÁÎÆâ°´²°¹²³³°°²Ë»³°²µ´²°à²±±°°²æÅ³±²³@';
HistoryMove[30] = '±´ÌÕÜ°';
HistoryStatus[30] = '0L±°´°¾°½°º°²·¹³³¸³¹²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¸²°Ï°°¼±°¼²°¼°°±±°·²°²°°ý°°°Å±±±°³±±²°°´ÁÎÆâ°´²°¹²³³°°²Ë»³°²µ´²°à²±±°°²æÅ³±²³@';
HistoryMove[31] = '±³Ì²°';
HistoryStatus[31] = '0L²°´°¾°½°º°²·¹³³¸³¹²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹²°Ï°°¼±°¼²°¼°°±±°·²°²°°ý±°²°°°Å±±±°³±±²°°´ÁÎÆâ°´±°¹²³³°°²Ë»³°²µ´²°à²±±°°²æÅ³±²³@';
HistoryMove[32] = '±³ÌÄ°';
HistoryStatus[32] = '0L°°´°¾°½°º°²·¹³³¸³¹²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æº²°Ï°°¼±°¼²°¼°°±±°·²°²°°ý±°²²°Ä°°°Å±±±°³±±²°°´ÁÎÆâ°´±°¹²³³°°²Ë»³°²µ´±°à²±±°°²æÅ³±²³@';
HistoryMove[33] = '±´ÌÕÇ°';
HistoryStatus[33] = '0L±°´°¾°½°º°²·¹³³¸³¹²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ»²°Ï°°¼±°¼²°¼°°±±°·²°²°°ý±°²²°Ä°°è°°°Å±±°°³±±²°°´ÁÎÆâ°´±°¹²³³°°²Ë»³°²µ´±°à²±±°°²æÅ³±²³@';
HistoryMove[34] = '±²Ì°';
HistoryStatus[34] = '0L²°´°¾°½°º±±²·¹³³¸³¹²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ»²°Ï°°¼±°¼²°¼°°±±°·²°²°°ý±°²²°Ä°°è°°°Å±±°°³±±²°°´ÁÎÆâ°´±°¹²³³°°²Ë»³°²µ´±°à²±±°°²æÅ³±²³@';
HistoryMove[35] = '±ËÌÕË´Ö°Ö²ÿÁ±°ß°²Ú²±²±±²²°±²±';
HistoryStatus[35] = '0A°°´°¾°½°º³±°²²·¹³³¸³¹²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹²°Ï°°¼±°¼²°¼±°·°°ý²°Ä°°è²°ì°°µÅ±±°°·±±²°°´ÁÎÆâ°´±°¹µ³³²°²Ë»³°²µ´±°à²±±°°²æÅ³±²³@';
HistoryMove[36] = '±·ÁµÇ´µÜ±';
HistoryStatus[36] = '0A±°´°¾°½°º³±°²²·¹³³¸³¹²ÎÍ²ÎÖ°°¾²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ·²°Ï°°¼±°¼²°¼±°·²°Ä²°ì°°·Å±±°°²±±²°°¶ÁÎÆâÇÜ°´±°¹µ³³²°²Ë»³°²µ´±°à²±±°°²æÅ³±²³@';
HistoryMove[37] = '±áÁ·¹»ß°¼Ú³±¶±µ°±°±²²±±á°¼ø¹Ä²ÆÅË²¶ÅË±¶Å»±¼ÅÆ°¶Åæ²¸';
HistoryStatus[37] = '0A²°´°¾°½°º³±°²²·°³³¸³°²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»±²°Ï°°ÏÅ±±±°¸±±²°°¶ÁÎÆâÇÜ³°±´´±°Ä¶³³²±¹²Ë»³°²µ´²°ò²±±°°²æÅ³±²³@';
HistoryMove[38] = '±¾ÁÏ²ÄÿØÛ²°²ÿÃÿÎ';
HistoryStatus[38] = '0N±°´°À°½°Î³±°²²·°³³¸³°²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»°°°°Å±±±°¸±±²±°¶ÁÎÆâÇÜ³°±´´±°Ä¶³³²±¹²Ë»³°²µ´²°¶²±±°°²æÅ³±²³@';
HistoryMove[39] = '±»ÎÙ±ÿÐÒ±°Ó°¹';
HistoryStatus[39] = '0P°°²°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»°°°°Å±±¶°¸±±»°°¶ÁÎÆâÇÜ³°±´´¶°Í³³±°±¹²Ë»³°²µ´·°¶²±»°°²æÅ³±²³@';
HistoryMove[40] = '±·ÐÒ¶±Ó³²';
HistoryStatus[40] = '0P²°²°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»°°°°Å±±¶°¸³±¶°°¶ÁÎÆâÇÜ³°±´´¶°Í³³±°±¹²Ë»³°²µ´·°¶²±»°°²æÅ³±²³@';
HistoryMove[41] = '±¸ÐÒ°±ÿÌÎ°';
HistoryStatus[41] = '0L±°µ°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»±²°Î°°°Å±±¶°¸³±¶°°¶ÁÎÆâÇÜ³°±´´¶°Í³³±°±¹²Ë»³°²µ´¶°¶²±°°°²æÅ³±²³@';
HistoryMove[42] = '±³Ì¸°';
HistoryStatus[42] = '0L°°µ°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»²²°Î±°¸°°°Å±±¶°¸³±¶°°¶ÁÎÆâÇÜ³°±´´µ°Í³³±°±¹²Ë»³°²µ´¶°¶²±°°°²æÅ³±²³@';
HistoryMove[43] = '±³ÌÍ°';
HistoryStatus[43] = '0L²°µ°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»³²°Î±°¸°°Í°°°Å±±µ°¸³±¶°°¶ÁÎÆâÇÜ³°±´´µ°Í³³±°±¹²Ë»³°²µ´¶°¶²±°°°²æÅ³±²³@';
HistoryMove[44] = '±´ÌÕä°';
HistoryStatus[44] = '0L±°µ°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»´²°Î±°¸°°Í²±µ°°°Å±±µ°¸³±¶°°¶ÁÎÆâÇÜ³°±´´µ°Í³³±°±¹²Ë»³°²µ´µ°¶²±°°°²æÅ³±²³@';
HistoryMove[45] = '±³Ì·°';
HistoryStatus[45] = '0L°°µ°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µ²°Î±°¸°°Í²±µ±°·°°°Å±±µ°¸³±¶°°¶ÁÎÆâÇÜ³°±´´´°Í³³±°±¹²Ë»³°²µ´µ°¶²±°°°²æÅ³±²³@';
HistoryMove[46] = '±³ÌÊ°';
HistoryStatus[46] = '0L²°µ°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»¶²°Î±°¸°°Í²±µ±°·°°Ê°°°Å±±´°¸³±¶°°¶ÁÎÆâÇÜ³°±´´´°Í³³±°±¹²Ë»³°²µ´µ°¶²±°°°²æÅ³±²³@';
HistoryMove[47] = '±³Ì¼°';
HistoryStatus[47] = '0L±°µ°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»·²°Î±°¸°°Í²±µ±°·°°Ê²°¼°°°Å±±´°¸³±¶°°¶ÁÎÆâÇÜ³°±´´´°Í³³±°±¹²Ë»³°²µ´´°¶²±°°°²æÅ³±²³@';
HistoryMove[48] = '±³ÌÎ°';
HistoryStatus[48] = '0L°°µ°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»¸²°Î±°¸°°Í²±µ±°·°°Ê²°¼±°Î°°°Å±±´°¸³±¶°°¶ÁÎÆâÇÜ³°±´´³°Í³³±°±¹²Ë»³°²µ´´°¶²±°°°²æÅ³±²³@';
HistoryMove[49] = '±³Ì±°';
HistoryStatus[49] = '0L²°µ°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»¹²°Î±°¸°°Í²±µ±°·°°Ê²°¼±°Î°°±°°°Å±±³°¸³±¶°°¶ÁÎÆâÇÜ³°±´´³°Í³³±°±¹²Ë»³°²µ´´°¶²±°°°²æÅ³±²³@';
HistoryMove[50] = '±³ÌÌ°';
HistoryStatus[50] = '0L±°µ°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»º²°Î±°¸°°Í²±µ±°·°°Ê²°¼±°Î°°±²°Ì°°°Å±±³°¸³±¶°°¶ÁÎÆâÇÜ³°±´´³°Í³³±°±¹²Ë»³°²µ´³°¶²±°°°²æÅ³±²³@';
HistoryMove[51] = '±³Ì²°';
HistoryStatus[51] = '0L°°µ°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»»²°Î±°¸°°Í²±µ±°·°°Ê²°¼±°Î°°±²°Ì±°²°°°Å±±³°¸³±¶°°¶ÁÎÆâÇÜ³°±´´²°Í³³±°±¹²Ë»³°²µ´³°¶²±°°°²æÅ³±²³@';
HistoryMove[52] = '±³ÌÂ°';
HistoryStatus[52] = '0L²°µ°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»¼²°Î±°¸°°Í²±µ±°·°°Ê²°¼±°Î°°±²°Ì±°²°°Â°°°Å±±²°¸³±¶°°¶ÁÎÆâÇÜ³°±´´²°Í³³±°±¹²Ë»³°²µ´³°¶²±°°°²æÅ³±²³@';
HistoryMove[53] = '±³ÌÄ°';
HistoryStatus[53] = '0L±°µ°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»½²°Î±°¸°°Í²±µ±°·°°Ê²°¼±°Î°°±²°Ì±°²°°Â²°Ä°°°Å±±²°¸³±¶°°¶ÁÎÆâÇÜ³°±´´²°Í³³±°±¹²Ë»³°²µ´²°¶²±°°°²æÅ³±²³@';
HistoryMove[54] = '±´ÌÕÞ°';
HistoryStatus[54] = '0L°°µ°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»¾²°Î±°¸°°Í²±µ±°·°°Ê²°¼±°Î°°±²°Ì±°²°°Â²°Ä±°ÿ°°°Å±±²°¸³±¶°°¶ÁÎÆâÇÜ³°±´´±°Í³³±°±¹²Ë»³°²µ´²°¶²±°°°²æÅ³±²³@';
HistoryMove[55] = '±³Ìº°';
HistoryStatus[55] = '0L²°µ°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»¿²°Î±°¸°°Í²±µ±°·°°Ê²°¼±°Î°°±²°Ì±°²°°Â²°Ä±°ÿ°°º°°°Å±±±°¸³±¶°°¶ÁÎÆâÇÜ³°±´´±°Í³³±°±¹²Ë»³°²µ´²°¶²±°°°²æÅ³±²³@';
HistoryMove[56] = '±³ÌË°';
HistoryStatus[56] = '0L±°µ°À°½°Î°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»À²°Î±°¸°°Í²±µ±°·°°Ê²°¼±°Î°°±²°Ì±°²°°Â²°Ä±°ÿ°°º²°Ë°°°Å±±±°¸³±¶°°¶ÁÎÆâÇÜ³°±´´±°Í³³±°±¹²Ë»³°²µ´±°¶²±°°°²æÅ³±²³@';
HistoryMove[57] = '±²Ì°';
HistoryStatus[57] = '0L°°µ°À°½°Î±±³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»À²°Î±°¸°°Í²±µ±°·°°Ê²°¼±°Î°°±²°Ì±°²°°Â²°Ä±°ÿ°°º²°Ë°°°Å±±±°¸³±¶°°¶ÁÎÆâÇÜ³°±´´±°Í³³±°±¹²Ë»³°²µ´±°¶²±°°°²æÅ³±²³@';
HistoryMove[58] = '±³Ì³°';
HistoryStatus[58] = '0L²°µ°À°½°Î±±³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»Á²°Î±°¸°°Í²±µ±°·°°Ê²°¼±°Î°°±²°Ì±°²°°Â²°Ä±°ÿ°°º²°Ë°°³°°°Å±±°°¸³±¶°°¶ÁÎÆâÇÜ³°±´´±°Í³³±°±¹²Ë»³°²µ´±°¶²±°°°²æÅ³±²³@';
HistoryMove[59] = '±¿Ì°Ö°ÿÁ±°²±³°µä±';
HistoryStatus[59] = '0A±°µ°À°½°Î³±²°³¶µ·³³¸³²ÎÍ²ÎÖ°°¿²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»½²°Î±°¸°°Í±°·°°Ê²°¼±°Î²°Ì°°Â²°Ä±°ÿ°°º²°Ë°°µÅ±±°°¼³´¶°°¶ÁÎÆâÇÜ³°±´´±°Í¶³±²±¹²Ë»³°²µ´±°µ²±°°°³æÅä³±²³@';
HistoryMove[60] = '±¿ÁµÞ²×Õ°·µÞ¾Ý¸ø·';
HistoryStatus[60] = '0A°°µ°À°½°Î³±²°³¶°°³³¸³³ÎÍÕ²ÎÖ°°Á²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ýº²°Î°°Í°°Ê²°¼±°Î²°Ì°°Â²°Ä°°º²°Ë°°ºÅ±±°°¼³´¶°°¶ÁÎÆâÇÜ³°±´´±°¹¶²±²²¹·³Ë»Þ³°²µ´±°µ²±°°°³æÅä³±²³@';
HistoryMove[61] = '±´Áº³Ü';
HistoryStatus[61] = '0A²°µ°À°½°Î³±²°³¶°°³°¸³³ÎÍÕ²ÎÖ°°Â²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü¹²°Î°°Í°°Ê²°¼±°Î²°Ì°°Â²°Ä²°Ë°°¼Å±±°°·´´¶°°¶ÁÎÆâÇÜ³°±´´±°¹¶²±²²¹·³Ë»Þ³°²µ´±°µ²±°°°³æÅä³±²³@';
HistoryMove[62] = '±ßÁ¼³äÂ°¼Ä²ÊÅË±¼Å»±¼ÅÞ±¹Åæ²¶Åä²¶ÅÆ°¶ÅÜ°¶Ê°³Ë²²Ì²²';
HistoryStatus[62] = '0A°°µ°Ã°½°Ò³±²°³¶°°³°¸°³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä³²°Î°°Í±°Î°°ÍÅ±±°°Ï´´¶°°¶ÁÎÆâÇÜ³°±´´±°Ú¶²±²²¹·³Ë»Þ³°²µ´±°Æ³±°°°³æÅä³±²³@';
HistoryMove[63] = '±ÄÁÍ°µß°ÎÚ²±¶±³²³±²Û°²';
HistoryStatus[63] = '0A±°µ°È°½°Õ³±²°³¶°°³°¸°³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä±±°Î°°ÎÅ±±°°¶´´¶°°¶ÁÎÆâÇÜ³°±´´±°Ú¶²±²²¹·³Ë»Þ³°²µ´²°Æ³±°°°³æÅä³±²³@';
HistoryMove[64] = '±¸ÁÎ±·ÿØÿÃ';
HistoryStatus[64] = '0C²°µ°È°Ä°Õ³±²°³¶°°³°¸°³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä°°°°Å±±°°¶´´¶°°¶ÁÎÆâÇÜ³°±´´±°¾¶²±²²¹·³Ë»Þ³°²µ´²°Æ³±°°°³æÅä³±²³@';
HistoryMove[65] = '±¶Ã²°²ÿÎ';
HistoryStatus[65] = '0N±°µ°È°Ä°Õ³±²°³¶°°³°¸°³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä°°°°Å±±°°¶´´¶°°¶ÁÎÆâÇÜ³°±´´±°¾¶²±²²¹·³Ë»Þ³°²µ´²°Ä³±°°°³æÅä³±²³@';
HistoryMove[66] = '±ºÎØ°Ù±ÿÐÒ²±';
HistoryStatus[66] = '0P²°³°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä°°°°Å±±µ°¶²´»°°¶ÁÎÆâÇÜ³°±´´¶°¾³²²°²¹·³Ë»Þ³°²µ´·°Ä³±»°°³æÅä³±²³@';
HistoryMove[67] = '±´ÐÒ°±';
HistoryStatus[67] = '0P°°³°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä°°°°Å±±µ°¶²´»°°¶ÁÎÆâÇÜ³°±´´¶°¾³²²°²¹·³Ë»Þ³°²µ´·°Ä³±°°°³æÅä³±²³@';
HistoryMove[68] = '±¹ÐÒ±°Ó°¹ÿÌ';
HistoryStatus[68] = '0L²°´°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä°°°°Å±±µ°¿²´±°°¶ÁÎÆâÇÜ³°±´´¶°¾³²²°²¹·³Ë»Þ³°²µ´·°Ä³±°°°³æÅä³±²³@';
HistoryMove[69] = '±³ÌÍ°';
HistoryStatus[69] = '0L°°´°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä±²°Í°°°Å±±µ°¿²´±°°¶ÁÎÆâÇÜ³°±´´¶°¾³²²°²¹·³Ë»Þ³°²µ´¶°Ä³±°°°³æÅä³±²³@';
HistoryMove[70] = '±³ÌÊ°';
HistoryStatus[70] = '0L±°´°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä²²°Í°°Ê°°°Å±±´°¿²´±°°¶ÁÎÆâÇÜ³°±´´¶°¾³²²°²¹·³Ë»Þ³°²µ´¶°Ä³±°°°³æÅä³±²³@';
HistoryMove[71] = '±´ÌÕÊ°';
HistoryStatus[71] = '0L²°´°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä³²°Í°°Ê±°ë°°°Å±±´°¿²´±°°¶ÁÎÆâÇÜ³°±´´µ°¾³²²°²¹·³Ë»Þ³°²µ´¶°Ä³±°°°³æÅä³±²³@';
HistoryMove[72] = '±³ÌÌ°';
HistoryStatus[72] = '0L°°´°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä´²°Í°°Ê±°ë²°Ì°°°Å±±´°¿²´±°°¶ÁÎÆâÇÜ³°±´´µ°¾³²²°²¹·³Ë»Þ³°²µ´µ°Ä³±°°°³æÅä³±²³@';
HistoryMove[73] = '±³Ì²°';
HistoryStatus[73] = '0L±°´°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³äµ²°Í°°Ê±°ë²°Ì°°²°°°Å±±³°¿²´±°°¶ÁÎÆâÇÜ³°±´´µ°¾³²²°²¹·³Ë»Þ³°²µ´µ°Ä³±°°°³æÅä³±²³@';
HistoryMove[74] = '±´ÌÕÖ°';
HistoryStatus[74] = '0L²°´°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä¶²°Í°°Ê±°ë²°Ì°°²±°÷°°°Å±±³°¿²´±°°¶ÁÎÆâÇÜ³°±´´´°¾³²²°²¹·³Ë»Þ³°²µ´µ°Ä³±°°°³æÅä³±²³@';
HistoryMove[75] = '±³Ì¹°';
HistoryStatus[75] = '0L°°´°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä·²°Í°°Ê±°ë²°Ì°°²±°÷²°¹°°°Å±±³°¿²´±°°¶ÁÎÆâÇÜ³°±´´´°¾³²²°²¹·³Ë»Þ³°²µ´´°Ä³±°°°³æÅä³±²³@';
HistoryMove[76] = '±³Ì¶°';
HistoryStatus[76] = '0L±°´°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä¸²°Í°°Ê±°ë²°Ì°°²±°÷²°¹°°¶°°°Å±±²°¿²´±°°¶ÁÎÆâÇÜ³°±´´´°¾³²²°²¹·³Ë»Þ³°²µ´´°Ä³±°°°³æÅä³±²³@';
HistoryMove[77] = '±³ÌÍ°';
HistoryStatus[77] = '0L²°´°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä¹²°Í°°Ê±°ë²°Ì°°²±°÷²°¹°°¶±°Í°°°Å±±²°¿²´±°°¶ÁÎÆâÇÜ³°±´´³°¾³²²°²¹·³Ë»Þ³°²µ´´°Ä³±°°°³æÅä³±²³@';
HistoryMove[78] = '±³ÌË°';
HistoryStatus[78] = '0L°°´°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³äº²°Í°°Ê±°ë²°Ì°°²±°÷²°¹°°¶±°Í²°Ë°°°Å±±²°¿²´±°°¶ÁÎÆâÇÜ³°±´´³°¾³²²°²¹·³Ë»Þ³°²µ´³°Ä³±°°°³æÅä³±²³@';
HistoryMove[79] = '±³ÌÂ°';
HistoryStatus[79] = '0L±°´°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä»²°Í°°Ê±°ë²°Ì°°²±°÷²°¹°°¶±°Í²°Ë°°Â°°°Å±±±°¿²´±°°¶ÁÎÆâÇÜ³°±´´³°¾³²²°²¹·³Ë»Þ³°²µ´³°Ä³±°°°³æÅä³±²³@';
HistoryMove[80] = '±³ÌÌ°';
HistoryStatus[80] = '0L²°´°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä¼²°Í°°Ê±°ë²°Ì°°²±°÷²°¹°°¶±°Í²°Ë°°Â±°Ì°°°Å±±±°¿²´±°°¶ÁÎÆâÇÜ³°±´´²°¾³²²°²¹·³Ë»Þ³°²µ´³°Ä³±°°°³æÅä³±²³@';
HistoryMove[81] = '±³Ì·°';
HistoryStatus[81] = '0L°°´°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä½²°Í°°Ê±°ë²°Ì°°²±°÷²°¹°°¶±°Í²°Ë°°Â±°Ì²°·°°°Å±±±°¿²´±°°¶ÁÎÆâÇÜ³°±´´²°¾³²²°²¹·³Ë»Þ³°²µ´²°Ä³±°°°³æÅä³±²³@';
HistoryMove[82] = '±³ÌÃ°';
HistoryStatus[82] = '0L±°´°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä¾²°Í°°Ê±°ë²°Ì°°²±°÷²°¹°°¶±°Í²°Ë°°Â±°Ì²°·°°Ã°°°Å±±°°¿²´±°°¶ÁÎÆâÇÜ³°±´´²°¾³²²°²¹·³Ë»Þ³°²µ´²°Ä³±°°°³æÅä³±²³@';
HistoryMove[83] = '±³Ì²°';
HistoryStatus[83] = '0L²°´°È°Ä°Õ°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä¿²°Í°°Ê±°ë²°Ì°°²±°÷²°¹°°¶±°Í²°Ë°°Â±°Ì²°·°°Ã±°²°°°Å±±°°¿²´±°°¶ÁÎÆâÇÜ³°±´´±°¾³²²°²¹·³Ë»Þ³°²µ´²°Ä³±°°°³æÅä³±²³@';
HistoryMove[84] = '±µÌÄ°Ö°';
HistoryStatus[84] = '0L±°´°È°Ä°Õ±°´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³äÀ²°Í°°Ê±°ë²°Ì°°²±°÷²°¹°°¶±°Í²°Ë°°Â±°Ì²°·°°Ã±°²²°Ä°°°Å±±°°¿²´±°°¶ÁÎÆâÇÜ³°±´´±°¾³²²°²¹·³Ë»Þ³°²µ´±°Ä³±°°°³æÅä³±²³@';
HistoryMove[85] = '±²Ì°';
HistoryStatus[85] = '0L²°´°È°Ä°Õ²°±´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³äÀ²°Í°°Ê±°ë²°Ì°°²±°÷²°¹°°¶±°Í²°Ë°°Â±°Ì²°·°°Ã±°²²°Ä°°°Å±±°°¿²´±°°¶ÁÎÆâÇÜ³°±´´±°¾³²²°²¹·³Ë»Þ³°²µ´±°Ä³±°°°³æÅä³±²³@';
HistoryMove[86] = '±ÃÌ°ÿÁß°²Ú²±³±´°²°³²±';
HistoryStatus[86] = '0A±°´°È°Ä°Õ³°±²´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä¾²°Í°°Ê±°ë²°Ì±°÷²°¹°°¶±°Í²°Ë°°Â±°Ì²°·°°Ã²°Ä°°µÅ±±±°¿²´±°°¶ÁÎÆâÇÜ³°±´´±°¾¶²²²²¹·³Ë»Þ³°²µ´±°Ä³±°°°³æÅä³±²³@';
HistoryMove[87] = '±·ÁµÊµµÖµ';
HistoryStatus[87] = '0A°°´°È°Ä°Õ³°±²´¹º³¹¶³¸³ÎÍÕ²ÎÖ°°Ã²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä¼²°Í°°Ê²°Ì²°¹°°¶±°Í²°Ë°°Â±°Ì²°·°°Ã²°Ä°°¶Å±±±°¿²´±°°¶ÁÎÆâÇÜ³°±´´±°´¶²²²²¹·µË»ÞÊÖ³°²µ´±°Ä³±°°°³æÅä³±²³@';
HistoryMove[88] = '±´Á¶¹Á';
HistoryStatus[88] = '0A²°´°È°Ä°Õ³°±²´°º³¹¶³¸³ÎÍÕ²ÎÖ°°Ä²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä¹Á»²°Í°°Ê²°Ì²°¹±°Í²°Ë°°Â±°Ì²°·°°Ã²°Ä°°·Å±±±°³³´±°°¶ÁÎÆâÇÜ³°±´´±°´¶²²²²¹·µË»ÞÊÖ³°²µ´±°Ä³±°°°³æÅä³±²³@';
HistoryMove[89] = '±·Á·öº¹¹Å';
HistoryStatus[89] = '0A±°´°È°Ä°Õ³°±²´°º³°¶³¸³ÎÍÕ²ÎÖ°°Å²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä¹Á¹Å¹²°Í°°Ê²°Ì±°Í²°Ë°°Â±°Ì°°Ã²°Ä°°¾Å±±±°³³´±°°¶ÁÎÆâÇÜ³°±´´±°´¶²²²²¹·µË»ÞÊÖ³°²µ´±°¾´±°°°³æÅä³±²³@';
HistoryMove[90] = '²ÿÁ½¹Ê½·Ö¾ÕÂ°¼Ã°¸Ä²×ÅÁ°¹ÅÆ°¹ÅÜ°µÅË±¼Å»±¼ÅÞ±ÅÅÊ±¹ÅÖ±¶Åæ²¶ÅÅ²¼Åä²¶Ê°³Ë²²ß°ÌÚ²±·±±²´Ó±³Û°²Ì±µß°ÍÚ²±·±¶²´²µÛ°²Í±¼ÿØÛ²±°ÿÃ';
HistoryStatus[90] = '0C²°´°Ë°Õ°Ý³°±²´°º³°¶³¸³ÎÍÕ²ÎÖ°°È²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä¹Á¹Å¹Ê·Ö²Õ°°°°Å±±±°Þ³´±°°¶ÁÎÆâÇÜ³°±´´±°´·²²³°µË»ÞÊÖ³°²µ´³°ß´±°°°³æÅä³±²³@';
HistoryMove[91] = '±¿Ã²°ÎÿÒ°¼·±º°²¶²';
HistoryStatus[91] = '0E²°´°Þ°ß°è³°±²´°º³°¶³¸³ÎÍÕ²ÎÖ°°È²Î±¼±â±Ã±¹±Ä±Ì±É±Í±Â¹ËµÆ²Ç³æ¹»µÞ²Ý³Ü³ä¹Á¹Å¹Ê·Ö²Õ°°°°Å±±±°Þ³´±°°¶ÁÎÆâÇÜ³°±´´±°´·²²³°µË»ÞÊÖ³°²µ´³°Á´±°°°³æÅä³±²³@';
var MoveCount = 92;

        var yucataGame = {};
		// Add the variables you need, if you need some additional variables to be set by the server
        //]]>
        </script>