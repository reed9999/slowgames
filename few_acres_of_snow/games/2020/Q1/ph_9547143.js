<script  type="text/javascript">
        // https://yucata.de/en/Game/FewAcresOfSnow/9547143
        // view-source:https://yucata.de/en/Game/FewAcresOfSnow/9547143
        // Philip was France. Feb 2020.

var StartStatus = '307°°±-°;²±²±±±±°°°°°°°°°°°°°°°°µ°°µ°µ°µ°µµ¶°;,;±°°°--±±°°°°,5,³±Ë´²,,µ¶°Ì,,,,±°°°°,°°±²,;°°°°--±±°°°°,12,°µ±²³,,´¶,,,,±°°°°,°°±²,;';
var moveNr = 0;
var HistoryMove = new Array();
var HistoryStatus = new Array();
HistoryMove[0] = 'º³µ²';
HistoryStatus[0] = '307°°±±°;²±²±±±±°°°°°°°°°°°°°°°°µ°°µ°µ°µ°µµ¶°;,;±²°°--±±°°°°,5,³±Ë´²,,µ¶°Ì,,,,±°°°°,°°±²,;°²°°--±±°°°°,18,°±³´¶,,²µ,,,,±°°°°,°°±²,;';
HistoryMove[1] = '¼±´';
HistoryStatus[1] = '307°°²°°;²±²±±±±°°°°°°°°°°°°°°°°µ°°µ°µ°µ°µµ¶°;,;±²°°--±±°°°°,7,ËÌ°²³,,µ¶,±´,,,±°°°°,°°±²,;°²°°--±±°°°°,16,°±³´¶,,²µ,,,,±°°°°,°°±²,;';
HistoryMove[2] = 'º³±°,½ã';
HistoryStatus[2] = '307°°²±°;²±²±±±±°°°°°°°°°°°°°°°°µ°°µ°µ°µ°µµ¶°;,;±²°°--±±°°°°,7,ËÌ°²³,,µ¶,±´,,,±°°°°,°°±²,;°²°°--±±°°°°,16,±²´µ¶,,ã³°,,,,±°°°°,°°±²,;';
HistoryMove[3] = '½Í,»Ì°²';
HistoryStatus[3] = '307°°²°°;²±²±±±±°°°°°°°°°°°°°°°°µ°°µ°µ°µ°µµ¶°;,;±²°°--±±°°°°,11,Ë³´µ¶,,²Í°±Ì,,,,±°°°°,°°±²,;°²°°--±±°°°°,16,±²´µ¶,,ã³°,,,,±°°°°,°°±²,;';
HistoryMove[4] = 'º±µ²,½Ù';
HistoryStatus[4] = '307°°²±°;²±²±±±±°°°°°°°°°°°°°°°°µ°°µ°µ°µ°µµ¶°;,;±²°°--±±°°°°,11,Ë³´µ¶,,²Í°±Ì,,,,±°°°°,°°±²,;°²°°--±±°°°°,17,ã°³´¶,,,±µ²Ù,,,±°°°°,°°±²,;';
HistoryMove[5] = '¿Ë,º´³';
HistoryStatus[5] = '307°°²°°;²±²±±±±°°°°°°°°°°°°°°°°µ°°µ°µ°µ°µµ¶°;,;±²°°--±±°°°°,13,Ì°±µ¶,Ë,²Í,´³,,,±°°°°,°°±²,;°²°°--±±°°°°,17,ã°³´¶,,,±µ²Ù,,,±°°°°,°°±²,;';
HistoryMove[6] = '°È´³¶,µÌã';
HistoryStatus[6] = '307°°²±°;²±²±±±±°°°°°°°°°°°°°°°°µ±°µ°°°µ°µµ¶°;,;±²°°--±±°°°°,13,Ì°±µ¶,Ë,²Í,´³,,,±°°°°,°°±²,;°²±°--±±°°°°,17,ã°²³È,,´µÙ±¶,,,,±°°°°,°°±²,;';
HistoryMove[7] = '»Ì°µ¶,½Ð';
HistoryStatus[7] = '307°°²°°;²±²±±±±°°°°°°°°°°°°°°°°µ±°µ°°°µ°µµ¶°;,;±²°°--±±°°°°,14,Í°±²µ,Ë,´Ì³Ð¶,,,,±°°°°,°°±²,;°²±°--±±°°°°,17,ã°²³È,,´µÙ±¶,,,,±°°°°,°°±²,;';
HistoryMove[8] = '°ÌÈ³²,½ä';
HistoryStatus[8] = '307°°²±°;²±²±±±±°°°°°°°°°°°°°°°°µ±°µ°±°µ°µµ¶°;,;±²°°--±±°°°°,14,Í°±²µ,Ë,´Ì³Ð¶,,,,±°°°°,°°±²,;°²±°--±±°°°°,17,Ùã°±¶,,´µ,È³²Ìä,,,±°°°°,°°±²,;';
HistoryMove[9] = '¹²,½Ó';
HistoryStatus[9] = '307°°²°°;²±²±±±±°°°°°°°°°°°°°°°°µ±°µ°±°µ°µµ¶°;,;±²°°--±±°°°°,13,Í°±µ¶,Ë,´Ì³Ð,²Ó,,,±°°°°,°°±²,;°²±°--±±°°°°,17,Ùã°±¶,,´µ,È³²Ìä,,,±°°°°,°°±²,;';
HistoryMove[10] = '°»±¶°,ÃÙ,±´´µ';
HistoryStatus[10] = '307°°²±°;²±²±²±±°°°°±°°°°°°°°°°°µ±°µ°±°µ°µµ¶°;,;±²°°--±±°°°°,13,Í°±µ¶,Ë,´Ì³Ð,²Ó,,,±°°°°,°°±²,;°²±°--±±°°°°,17,ã±²µÈ,,³°¶Ì»äÙ´,,,,±°°°°,°°±²,;';
HistoryMove[11] = '¿Í,¹¶';
HistoryStatus[11] = '307°°²°°;²±²±²±±°°°°±°°°°°°°°°°°µ±°µ°±°µ°µµ¶°;,;±²°°--±±°°°°,14,Ð°±³µ,ËÍ,´Ì,²Ó¶,,,±°°°°,°°±²,;°²±°--±±°°°°,17,ã±²µÈ,,³°¶Ì»äÙ´,,,,±°°°°,°°±²,;';
HistoryMove[12] = 'º±²µ,½Ü';
HistoryStatus[12] = '307°°²±°;²±²±²±±°°°°±°°°°°°°°°°°µ±°µ°±°µ°µµ¶°;,;±²°°--±±°°°°,14,Ð°±³µ,ËÍ,´Ì,²Ó¶,,,±°°°°,°°±²,;°²±°--±±°°°°,15,Ùãä´È,,³°¶Ì»,±²µÜ,,,±°°°°,°°±²,;';
HistoryMove[13] = 'ÃÐ,»Ì°µ,½Î';
HistoryStatus[13] = '307°°²°°;²±²±²±±°°°°±°°°°°°°°°°°µ±°µ°±°µ°µµ¶°;,;±²°°--±±°°°°,18,Ð°±³´,ËÍ,Ó²Ì¶Îµ,,,,±°°°°,°°±²,;°²±°--±±°°°°,15,Ùãä´È,,³°¶Ì»,±²µÜ,,,±°°°°,°°±²,;';
HistoryMove[14] = 'ÃÙ,²´´ä,°¸³°¶';
HistoryStatus[14] = '307°°²±°;²±²±´±±°±°°±°°°°°°°°°°°µ±°µ°±°µ°µµ¶°;,;±²°°--±±°°°°,18,Ð°±³´,ËÍ,Ó²Ì¶Îµ,,,,±°°°°,°°±²,;°²±°--±±°°°°,12,ã²»ÈÌ,,¸äµÙÜ¶°±´³,,,,±°°°°,°°±²,;';
HistoryMove[15] = 'ÃÐ,ÀËÍ,¶ÍC,»Ì°²';
HistoryStatus[15] = '307°°²°°;²±²±´±±°±°°±°°°°°°°°°°°µ±°µ°±°µ°µµ¶°;,;±²°°--±±°°°°,20,ËÓ±³´,,¶Îµ,ÐÍÌ°²,,,±°°°°,°°±²,;°²±°--±±°°°°,12,ã²»ÈÌ,,¸äµÙÜ¶°±´³,,,,±°°°°,°°±²,;';
HistoryMove[16] = '±ÌÌ²,½Ñ';
HistoryStatus[16] = '307°°²±°;²±²±´±±°±°°±°°°°°°°°°°°µ±°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,20,ËÓ±³´,,¶Îµ,ÐÍÌ°²,,,±°°°°,°°±²,;°²±°--±±°°°°,7,ã³´»È,,¸äµÙÜ¶°±,Ì²Ñ,,,±°°°°,°°±²,;';
HistoryMove[17] = '¼±³,¾´';
HistoryStatus[17] = '307°°²°°;²±²±´±±°±°°±°°°°°°°°°°°µ±°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,22,ËÎÓµ¶,,,ÐÍÌ°²±³´,,,±°°°°,°°±²,;°²±°--±±°°°°,5,ã³´»È,,¸äµÙÜ¶°±,Ì²Ñ,,,±°°°°,°°±²,;';
HistoryMove[18] = '¹»,¾´';
HistoryStatus[18] = '307°°²±°;²±²±´±±°±°°±°°°°°°°°°°°µ±°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,22,ËÎÓµ¶,,,ÐÍÌ°²±³´,,,±°°°°,°°±²,;°²±°--±±°°°°,7,ã°±³È,,¸äµÙÜ¶,Ì²Ñ»´,,,±°°°°,°°±²,;';
HistoryMove[19] = '½Ý,½Ö';
HistoryStatus[19] = '307°°²°°;²±²±´±±°±°°±°°°°°°°°°°°µ±°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,14,ËÎÓµ¶,,,ÐÍÌ°²±³´ÝÖ,,,±°°°°,°°±²,;°²±°--±±°°°°,7,ã°±³È,,¸äµÙÜ¶,Ì²Ñ»´,,,±°°°°,°°±²,;';
HistoryMove[20] = 'º³±°,½Ý';
HistoryStatus[20] = '307°°²±°;²±²±´±±°±°°±°°°°°°°°°°°µ±°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,14,ËÎÓµ¶,,,ÐÍÌ°²±³´ÝÖ,,,±°°°°,°°±²,;°²±°--±±°°°°,10,ÙÜã¶È,,¸äµ,Ì²Ñ»´³±°Ý,,,±°°°°,°°±²,;';
HistoryMove[21] = '¿Ë,¿Î';
HistoryStatus[21] = '307°°²°°;²±²±´±±°±°°±°°°°°°°°°°°µ±°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,14,ÌÓ²µ¶,ËÎ,ÍÐÖ³Ý±´°,,,,±°°°°,°°±²,;°²±°--±±°°°°,10,ÙÜã¶È,,¸äµ,Ì²Ñ»´³±°Ý,,,±°°°°,°°±²,;';
HistoryMove[22] = 'ÃÙ,²ÈÈä,±µµ¶';
HistoryStatus[22] = '307°°²±°;²±²±´²±°±°°±°°°°°°°°°°°µ³°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,14,ÌÓ²µ¶,ËÎ,ÍÐÖ³Ý±´°,,,,±°°°°,°°±²,;°²±°--±±°°°°,7,Üãä±¸,,´²ÌµÈÑ¶ÙÝ»°³,,,,±°°°°,°°±²,;';
HistoryMove[23] = '»Ì²µ¶,½Ù';
HistoryStatus[23] = '307°°²°°;²±²±´²±°±°°±°°°°°°°°°°°µ³°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,13,ÓÝ°±´,ËÎ,ÍÐÖ³,Ì²µ¶Ù,,,±°°°°,°°±²,;°²±°--±±°°°°,7,Üãä±¸,,´²ÌµÈÑ¶ÙÝ»°³,,,,±°°°°,°°±²,;';
HistoryMove[24] = '¿Ü,¹¸';
HistoryStatus[24] = '307°°²±°;²±²±´²±°±°°±°°°°°°°°°°°µ³°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,13,ÓÝ°±´,ËÎ,ÍÐÖ³,Ì²µ¶Ù,,,±°°°°,°°±²,;°²±°--±±°°°°,10,ãä°±³,Ü,´²ÌµÈÑ¶ÙÝ»,¸,,,±°°°°,°°±²,;';
HistoryMove[25] = '¾´°,¿Ý';
HistoryStatus[25] = '307°°²°°;²±²±´²±°±°°±°°°°°°°°°°°µ³°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,12,ÐÓÖ±³,ËÎÝ,Í,Ì²µ¶Ù´°,,,±°°°°,°°±²,;°²±°--±±°°°°,10,ãä°±³,Ü,´²ÌµÈÑ¶ÙÝ»,¸,,,±°°°°,°°±²,;';
HistoryMove[26] = '±³³°,¹±';
HistoryStatus[26] = '307°°²±°;²±²²´²±°±°°±°°°°°°°°°°°µ³°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,12,ÐÓÖ±³,ËÎÝ,Í,Ì²µ¶Ù´°,,,±°°°°,°°±²,;°²±°--±±°°°°,12,ÙÝãä»,Ü,´²ÌµÈÑ¶,¸³°±,,,±°°°°,°°±²,;';
HistoryMove[27] = 'ÀËÎÝ,³Ì±³Ý,¶ÖBã';
HistoryStatus[27] = '307°°²°°;²±²²´²±°±°°±°°°°°°°°°°°µ³°µ°²°µ°µµ¶°;,Ì;±²°°--±±°°°°,5,ËÍÎÐÓ,,,Ì²µ¶Ù´°±³Ö,,Ý,±°°°°,°°±²,;°²±°--±±°°°°,12,ÙÝä»,Ü,´²ÌµÈÑ¶,¸³°±ã,,,±°°°°,°°±²,;';
HistoryMove[28] = 'ÀÜ,´ÌÜ,´ÌÝ';
HistoryStatus[28] = '307°°²±°;²±²²´²±°±°°±°°°°°°°°°°°µ³°µ°²°µ°µµ¶°;,Ì;±²°°--±±°°°°,5,ËÍÎÐÓ,,,Ì²µ¶Ù´°±³Ö,,Ý,±°°°°,°°±²,;°²±°--±±°°°°,8,ÑÙä¶»,,´²ÌµÈ,¸³°±ã,,ÜÝ,±°°°°,°°±²,;';
HistoryMove[29] = '´ÌË,½Ò';
HistoryStatus[29] = '307°°²°°;²±²²´²±°±°°±°°°°°°°°°°°µ³°µ°²°µ°µµ¶°;,Ì;±²°°--±±°°°°,0,ÍÎÐÓ´,,³±°ÌµÖ¶Ò²Ù,,,ÝË,±°°°°,°°±²,;°²±°--±±°°°°,8,ÑÙä¶»,,´²ÌµÈ,¸³°±ã,,ÜÝ,±°°°°,°°±²,;';
HistoryMove[30] = 'ÃÙ,·ÌÑ,´Ìä,´Ì²';
HistoryStatus[30] = '307°°²±°;²±²²´²±°±°°±°°°°°°°°°°°µ³°µ°²°µ°µµ¶°;,Ì;±²°°--±±°°°°,0,ÍÎÐÓ´,,³±°ÌµÖ¶Ò²Ù,,,ÝË,±°°°°,°°±²,;°²±°--±±°°°°,8,´¶»ÈÌ,,µ,¸³°±ãÙ,,ÜÝÑä²,±°°°°,°°±²,;';
HistoryMove[31] = 'ÃÐ,¼±³,¶ÍC';
HistoryStatus[31] = '307°°²°°;²±²²´²±°±°°±°°°°°°°°°°°µ³°µ°²°µ°µµ¶°;,Ì;±²°°-Ë±±°°°°,2,ÎÓÙ°´,,ÌµÖ¶Ò²,Ð±³Í,,ÝË,±°°°°,°°±²,;°²±°--±±°°°°,6,´¶»ÈÌ,,µ,¸³°±ãÙ,,ÜÝÑä²,±°°°°,°°±²,;';
HistoryMove[32] = 'Î1LË,±»»¶,½å';
HistoryStatus[32] = '307°°²±°;²±²²´²±°±°°²°°°°°°°°°°°µ³°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,2,ÎÓÙ°´,,ÌµÖ¶Ò²,Ð±³ÍÝ,,,±°°°°,°°±²,;°²±°--±±°°°°,6,´µ¶ÈÌ,,ÙäÜ³åÝÑ»°±²¸ã,,,,±°°°°,°°±²,;';
HistoryMove[33] = '¿Ù,¾´';
HistoryStatus[33] = '307°°²°°;²±²²´²±°±°°²°°°°°°°°°°°µ³°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,2,ÎÒÓ°²,Ù,ÌµÖ¶,Ð±³ÍÝ´,,,±°°°°,°°±²,;°²±°--±±°°°°,6,´µ¶ÈÌ,,ÙäÜ³åÝÑ»°±²¸ã,,,,±°°°°,°°±²,;';
HistoryMove[34] = '±ÈÈ¶,¹µ';
HistoryStatus[34] = '307°°²±°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,2,ÎÒÓ°²,Ù,ÌµÖ¶,Ð±³ÍÝ´,,,±°°°°,°°±²,;°²±°--±±°°°°,9,ã²´¸Ì,,ÙäÜ³åÝÑ»°±,È¶µ,,,±°°°°,°°±²,;';
HistoryMove[35] = '¿Ò,¹²';
HistoryStatus[35] = '307°°²°°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,3,ÎÓÖ°¶,ÙÒ,Ìµ,Ð±³ÍÝ´²,,,±°°°°,°°±²,;°²±°--±±°°°°,9,ã²´¸Ì,,ÙäÜ³åÝÑ»°±,È¶µ,,,±°°°°,°°±²,;';
HistoryMove[36] = '¹¸,¾´';
HistoryStatus[36] = '307°°²±°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,3,ÎÓÖ°¶,ÙÒ,Ìµ,Ð±³ÍÝ´²,,,±°°°°,°°±²,;°²±°--±±°°°°,12,ã°±²Ì,,ÙäÜ³åÝÑ»,È¶µ¸´,,,±°°°°,°°±²,;';
HistoryMove[37] = '¶ÖC,¹¶';
HistoryStatus[37] = '307°°²°°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,3,ÌÎÓ°µ,ÙÒ,,Ð±³ÍÝ´²Ö¶,,,±°°°°,°°±²,;°²±°--±±°°°°,12,ã°±²Ì,,ÙäÜ³åÝÑ»,È¶µ¸´,,,±°°°°,°°±²,;';
HistoryMove[38] = '³ÊÌ²±,´Ê°';
HistoryStatus[38] = '307°°²±°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;Ê,;±²°°--±±°°°°,3,ÌÎÓ°µ,ÙÒ,,Ð±³ÍÝ´²Ö¶,,,±°°°°,°°±²,;°²±°--±±°°°°,12,ÑÝãå»,,ÙäÜ³,È¶µ¸´Ì²,±°,,±°°°°,°°±²,;';
HistoryMove[39] = '´ÊÎ,ÀÙÒ,´ÊÙ,·ÊÒ';
HistoryStatus[39] = '307°°²°°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;Ê,;±²°°--±±°°°°,1,ÌÓ°µ,,,Ð±³ÍÝ´²Ö¶,ÎÙÒ,,±°°°°,°°±²,;°²±°--±±°°°°,12,ÑÝãå»,,ÙäÜ³,È¶µ¸´Ì²,±°,,±°°°°,°°±²,;';
HistoryMove[40] = '´ÊÝ,¹»';
HistoryStatus[40] = '307°°²±°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;Ê,;±²°°--±±°°°°,1,ÌÓ°µ,,,Ð±³ÍÝ´²Ö¶,ÎÙÒ,,±°°°°,°°±²,;°²±°Ý-±±°°°°,14,ÑÜãå³,,Ùä,È¶µ¸´Ì²»,±°Ý,,±°°°°,°°±²,;';
HistoryMove[41] = 'Î0LÝ,»Ì°µ,½Ë';
HistoryStatus[41] = '307°°²°°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,5,ÐÓÖÝ³,,²´±µË¶°ÎÍÌÒÙ,,,,±°°°°,°°±²,;°²±°--±±°°°°,14,ÑÜãå³,,Ùä,È¶µ¸´Ì²»±°,,,±°°°°,°°±²,;';
HistoryMove[42] = '¿å,½Ý';
HistoryStatus[42] = '307°°²±°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,5,ÐÓÖÝ³,,²´±µË¶°ÎÍÌÒÙ,,,,±°°°°,°°±²,;°²±°--±±°°°°,12,ÑÜãä³,å,Ù,È¶µ¸´Ì²»±°Ý,,,±°°°°,°°±²,;';
HistoryMove[43] = 'ÃÐ,³Ì±³Ý,¶ÖBã';
HistoryStatus[43] = '307°°²°°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,Ì;±²°°--±±°°°°,1,ÒÓÙ²´,,µË¶°ÎÍÌ,Ð±³Ö,,Ý,±°°°°,°°±²,;°²±°--±±°°°°,12,ÑÜä³,å,Ù,È¶µ¸´Ì²»±°Ýã,,,±°°°°,°°±²,;';
HistoryMove[44] = '´ÌÜ,·ÌÑ,´Ìä';
HistoryStatus[44] = '307°°²±°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,Ì;±²°°--±±°°°°,1,ÒÓÙ²´,,µË¶°ÎÍÌ,Ð±³Ö,,Ý,±°°°°,°°±²,;°²±°--±±°°°°,9,Ù±³µ¶,å,°´Ý²¸»ÈÌã,,,ÜÑä,±°°°°,°°±²,;';
HistoryMove[45] = '´ÌÙ,·ÌÒ,¾´';
HistoryStatus[45] = '307°°²°°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,Ì;±²°°--±±°°°°,1,ÌÍÎÓ²,,µË¶°,Ð±³Ö´,,ÝÙÒ,±°°°°,°°±²,;°²±°--±±°°°°,9,Ù±³µ¶,å,°´Ý²¸»ÈÌã,,,ÜÑä,±°°°°,°°±²,;';
HistoryMove[46] = '´Ì±,´Ì³';
HistoryStatus[46] = '307°°²±°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,Ì;±²°°--±±°°°°,1,ÌÍÎÓ²,,µË¶°,Ð±³Ö´,,ÝÙÒ,±°°°°,°°±²,;°²±°--±±°°°°,9,Ùãµ¶Ì,å,°´Ý²¸»È,,,ÜÑä±³,±°°°°,°°±²,;';
HistoryMove[47] = '´ÌÓ,´Ì²';
HistoryStatus[47] = '307°°²°°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,Ì;±²°°--±±°°°°,1,ÌÍÎ°¶,,µË,Ð±³Ö´,,ÝÙÒÓ²,±°°°°,°°±²,;°²±°--±±°°°°,9,Ùãµ¶Ì,å,°´Ý²¸»È,,,ÜÑä±³,±°°°°,°°±²,;';
HistoryMove[48] = 'ÃÙ,´ÌÝ,´Ì°';
HistoryStatus[48] = '307°°²±°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,Ì;±²°°--±±°°°°,1,ÌÍÎ°¶,,µË,Ð±³Ö´,,ÝÙÒÓ²,±°°°°,°°±²,;°²±°--±±°°°°,9,ã´µ¶Ì,å,²¸»È,Ù,,ÜÑä±³Ý°,±°°°°,°°±²,;';
HistoryMove[49] = '»Ì°¶,¿Î';
HistoryStatus[49] = '307°°²°°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,Ì;±²°°-Ó±±°°°°,5,ËÍÖµ¶,Î,³Ì°´Ð±,,,ÝÙÒÓ²,±°°°°,°°±²,;°²±°--±±°°°°,9,ã´µ¶Ì,å,²¸»È,Ù,,ÜÑä±³Ý°,±°°°°,°°±²,;';
HistoryMove[50] = 'Î1LÓ,Àå,Áå´,¹µ';
HistoryStatus[50] = '307°°²±°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,5,ËÍÖµ¶,Î,³Ì°´Ð±,ÝÙÒ²,,,±°°°°,°°±²,;°²±°--±±°°°°,11,ã¶»ÈÌ,,²¸,ÙÜÑä±³Ý°åµ,,,±°°°°,°°±²,;';
HistoryMove[51] = '¶ÖC,¿Ë';
HistoryStatus[51] = '307°°²°°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,4,ÍÐ±µ¶,ÎË,³Ì°´,ÝÙÒ²Ö,,,±°°°°,°°±²,;°²±°--±±°°°°,11,ã¶»ÈÌ,,²¸,ÙÜÑä±³Ý°åµ,,,±°°°°,°°±²,;';
HistoryMove[52] = '¶ãBÍ,¹»';
HistoryStatus[52] = '307°°²±°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,4,Ð±µ¶,ÎË,³Ì°´,ÝÙÒ²ÖÍ,,,±°°°°,°°±²,;°²±°--±±°°°°,13,²¶¸ÈÌ,,,ÙÜÑä±³Ý°åµã»,,,±°°°°,°°±²,;';
HistoryMove[53] = 'ÃÐ,»Ì°µ¶,½Ñ';
HistoryStatus[53] = '307°°²°°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,10,Ì±³´µ,ÎË,°ÍÖÐÒÙÝ¶Ñ²,,,,±°°°°,°°±²,;°²±°--±±°°°°,13,²¶¸ÈÌ,,,ÙÜÑä±³Ý°åµã»,,,±°°°°,°°±²,;';
HistoryMove[54] = 'ºÈ¸,½G';
HistoryStatus[54] = '307°°²±°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¶°;,;±²°°--±±°°°°,10,Ì±³´µ,ÎË,°ÍÖÐÒÙÝ¶Ñ²,,,,±°°°°,°°±²,;°²±°--±±°°°°,16,Ñå²¶Ì,,ÝÜä°³±¸ÙµG»Èã,,,,±°°°°,°°±²,;';
HistoryMove[55] = 'ÀÎË,²ÒÎ³,»Ìµ';
HistoryStatus[55] = '307°°²°°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¸°;,;±²°°--±±°°°°,7,ËÑ±²´,,°ÍÖÐÒÙÝ¶,Î³Ìµ,,,±°°°°,°°±²,;°²±°--±±°°°°,16,Ñå²¶Ì,,ÝÜä°³±¸ÙµG»Èã,,,,±°°°°,°°±²,;';
HistoryMove[56] = '¿Ñ,¾å';
HistoryStatus[56] = '307°°²±°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¸°;,;±²°°--±±°°°°,7,ËÑ±²´,,°ÍÖÐÒÙÝ¶,Î³Ìµ,,,±°°°°,°°±²,;°²±°--±±°°°°,16,ã²¶ÈÌ,Ñ,ÝÜä°³±¸ÙµG»,å,,,±°°°°,°°±²,;';
HistoryMove[57] = '¿Ë,º±²';
HistoryStatus[57] = '307°°²°°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¸°;,;±²°°--±±°°°°,8,ÑÙÝ´¶,Ë,°ÍÖÐÒ,Î³Ìµ±²,,,±°°°°,°°±²,;°²±°--±±°°°°,16,ã²¶ÈÌ,Ñ,ÝÜä°³±¸ÙµG»,å,,,±°°°°,°°±²,;';
HistoryMove[58] = '¶ãTË°,¾È';
HistoryStatus[58] = '307°°²±°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¸°;,;±²°°--±±°°°°,8,ÑÙÝ´¶,,°ÍÖÐÒ,Î³Ìµ±²,,,±°°°°,°°±²,;°²±°--±±°°°°,16,²¶»ÌG,Ñ,ÝÜä°³±¸Ùµ,åãÈ,,,±°°°°,°°±²,;';
HistoryMove[59] = '¿Ý,¾¶´';
HistoryStatus[59] = '307°°²°°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¸°;,;±²°°--±±°°°°,7,ÐÑÒÖÙ,Ý,°Í,Î³Ìµ±²¶´,,,±°°°°,°°±²,;°²±°--±±°°°°,16,²¶»ÌG,Ñ,ÝÜä°³±¸Ùµ,åãÈ,,,±°°°°,°°±²,;';
HistoryMove[60] = '¶GBÖ,¹»';
HistoryStatus[60] = '307°°²±°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¸°;,;±²°°--±±°°°°,7,ÐÑÒÙ,Ý,°Í,Î³Ìµ±²¶´Ö,,,±°°°°,°°±²,;°²±°--±±°°°°,17,Ù²µ¶Ì,Ñ,ÝÜä°³±¸,åãÈG»,,,±°°°°,°°±²,;';
HistoryMove[61] = '¿Ò,½C';
HistoryStatus[61] = '307°°²°°;²±²²´²±°±°°²°°°°°°°°°°°µ´°µ°²°µ°µµ¸°;,;±²°°--±±°°°°,7,ÍÐÑÙ°,ÝÒ,,Î³Ìµ±²¶´ÖC,,,±°°°°,°°±²,;°²±°--±±°°°°,17,Ù²µ¶Ì,Ñ,ÝÜä°³±¸,åãÈG»,,,±°°°°,°°±²,;';
HistoryMove[62] = '°·²¶µ,ÃÙ,²ÌÌä';
HistoryStatus[62] = '307°°²±°;²±²²´²±±±°°²°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;,;±²°°--±±°°°°,7,ÍÐÑÙ°,ÝÒ,,Î³Ìµ±²¶´ÖC,,,±°°°°,°°±²,;°²±°--±±°°°°,14,ÜÝ±³¸,Ñ,°,åãÈG»²¶µ·ÙÌä,,,±°°°°,°°±²,;';
HistoryMove[63] = '¿Ù,½D';
HistoryStatus[63] = '307°°²°°;²±²²´²±±±°°²°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;,;±²°°--±±°°°°,7,ÍÐÑ°²,ÝÒÙ,CÎ³¶´±DÖµÌ,,,,±°°°°,°°±²,;°²±°--±±°°°°,14,ÜÝ±³¸,Ñ,°,åãÈG»²¶µ·ÙÌä,,,±°°°°,°°±²,;';
HistoryMove[64] = '¿Ý,¿Ü';
HistoryStatus[64] = '307°°²±°;²±²²´²±±±°°²°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;,;±²°°--±±°°°°,7,ÍÐÑ°²,ÝÒÙ,CÎ³¶´±DÖµÌ,,,,±°°°°,°°±²,;°²±°--±±°°°°,14,°±³¸È,ÑÝÜ,»²å·µGãÙÌä¶,,,,±°°°°,°°±²,;';
HistoryMove[65] = 'ÃÐ,µ»CÍ,ÂÐ,ÃÐ';
HistoryStatus[65] = '307°°²°°;²±²²´²±±±°°±°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;,;±²°±--±±°°°°,4,Î°±²³´¶,ÝÒÙ,DÖµÌ,CÍÑÐ,,,±°°°°,°°±²,;°²±°--±±°°°°,14,°±³¸È,ÑÝÜ,»²å·µGãÙÌä¶,,,,±°°°°,°°±²,;';
HistoryMove[66] = 'ÀÑÝÜ,³ÊÈ³Ü,·ÊÑ,´ÊÝ';
HistoryStatus[66] = '307°°²±°;²±²²´²±±±°°±°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;Ê,;±²°±--±±°°°°,4,Î°±²³´¶,ÝÒÙ,DÖµÌ,CÍÑÐ,,,±°°°°,°°±²,;°²±°--±±°°°°,8,ä°±¶¸,,»²å·µGãÙÌ,È³,ÜÑÝ,,±°°°°,°°±²,;';
HistoryMove[67] = 'ÀÝÒÙ,º³²¶,·ÊÒ,´ÊÝ';
HistoryStatus[67] = '307°°²°°;²±²²´²±±±°°±°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;Ê,;±²°±--±±°°°°,0,ÎÙ°±´,,DÖµÌ,CÍÑÐ³²¶,ÒÝ,,±°°°°,°°±²,;°²±°--±±°°°°,8,ä°±¶¸,,»²å·µGãÙÌ,È³,ÜÑÝ,,±°°°°,°°±²,;';
HistoryMove[68] = '±¸¸¶,´Ê±';
HistoryStatus[68] = '307°°²±°;²±²²´²±±²°°±°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;Ê,;±²°±--±±°°°°,0,ÎÙ°±´,,DÖµÌ,CÍÑÐ³²¶,ÒÝ,,±°°°°,°°±²,;°²±°--±±°°°°,8,Ùãä°Ì,,»²å·µG,È³¸¶,ÜÑÝ±,,±°°°°,°°±²,;';
HistoryMove[69] = '´ÊÙ,¾´';
HistoryStatus[69] = '307°°²°°;²±²²´²±±²°°±°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;Ê,;±²°±--±±°°°°,0,ÌÎ°±µ,,DÖ,CÍÑÐ³²¶´,ÒÝÙ,,±°°°°,°°±²,;°²±°--±±°°°°,8,Ùãä°Ì,,»²å·µG,È³¸¶,ÜÑÝ±,,±°°°°,°°±²,;';
HistoryMove[70] = 'ÃÙ,²»»ä,ÁåÌ';
HistoryStatus[70] = '307°°²±°;²±²²´²±±²°°³°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;Ê,;±²°±--±±°°°°,0,ÌÎ°±µ,,DÖ,CÍÑÐ³²¶´,ÒÝÙ,,±°°°°,°°±²,;°²±°Ý-±±°°°°,5,ã°²µG,,·,È³¸¶Ù»äå,ÜÑÝ±,,±°°°°,°°±²,;';
HistoryMove[71] = 'Î0LÝ,»Ì°µ,½Ï';
HistoryStatus[71] = '307°°²°°;²±²²´²±±²°°³°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;,;±²°±--±±°°°°,4,ÎÖ±²D,,Ð³Ý´¶Ìµ°ÏCÒÙÑÍ,,,,±°°°°,°°±²,;°²±°--±±°°°°,5,ã°²µG,,·,È³¸¶Ù»äåÜÑ±,,,±°°°°,°°±²,;';
HistoryMove[72] = '¹²,¹°';
HistoryStatus[72] = '307°°²±°;²±²²´²±±²°°³°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;,;±²°±--±±°°°°,4,ÎÖ±²D,,Ð³Ý´¶Ìµ°ÏCÒÙÑÍ,,,,±°°°°,°°±²,;°²±°--±±°°°°,11,Ùãµ·G,,È³¶Ñ»±ä¸²Üå°,,,,±°°°°,°°±²,;';
HistoryMove[73] = '¶DC,¿Î';
HistoryStatus[73] = '307°°²°°;²±²²´²±±²°°³°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;,;±²°±--±±°°°°,3,ÍÑÖ±²,Î,Ð³Ý´¶Ìµ°ÏCÒÙ,D,,,±°°°°,°°±²,;°²±°--±±°°°°,11,Ùãµ·G,,È³¶Ñ»±ä¸²Üå°,,,,±°°°°,°°±²,;';
HistoryMove[74] = '¶ãC,±··µ';
HistoryStatus[74] = '307°°²±°;²±²²´²±²²°°³°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;,;±²°±--±±°°°°,3,ÍÑÖ±²,Î,Ð³Ý´¶Ìµ°ÏCÒÙ,D,,,±°°°°,°°±²,;°²±°--±±°°°°,11,ÙÜå°G,,È³¶Ñ»±ä¸²,ã·µ,,,±°°°°,°°±²,;';
HistoryMove[75] = '¶ÖBG,¹²';
HistoryStatus[75] = '307°°²°°;²±²²´²±²²°°³°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;,;±²°±--±±°°°°,3,ÍÑÒÙ±,Î,Ð³Ý´¶Ìµ°ÏC,DÖ²,,,±°°°°,°°±²,;°²±°--±±°°°°,11,ÙÜå°,,È³¶Ñ»±ä¸²,ã·µG,,,±°°°°,°°±²,;';
HistoryMove[76] = 'ÃÙ,³ÊÈ³Ü,½Ý';
HistoryStatus[76] = '307°°²±°;²±²²´²±²²°°³°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;Ê,;±²°±--±±°°°°,3,ÍÑÒÙ±,Î,Ð³Ý´¶Ìµ°ÏC,DÖ²,,,±°°°°,°°±²,;°²±°--±±°°°°,6,å°²¶¸,,Ñ»±ä,ã·µGÙÈ³Ý,Ü,,±°°°°,°°±²,;';
HistoryMove[77] = '·ÊÒ,¶ÍC,´ÊÙ';
HistoryStatus[77] = '307°°²°°;²±²²´²±²²°°³°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;Ê,;±²°±--±±°°°°,3,ÏÑ°±C,Î,Ð³Ý´¶Ìµ,DÖ²Í,ÒÙ,,±°°°°,°°±²,;°²±°--±±°°°°,6,å°²¶¸,,Ñ»±ä,ã·µGÙÈ³Ý,Ü,,±°°°°,°°±²,;';
HistoryMove[78] = '±¶¶²,¹¸';
HistoryStatus[78] = '307°°²±°;²±²²´²²²²°°³°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;Ê,;±²°±--±±°°°°,3,ÏÑ°±C,Î,Ð³Ý´¶Ìµ,DÖ²Í,ÒÙ,,±°°°°,°°±²,;°²±°Ü-±±°°°°,9,äå°±»,,Ñ,ã·µGÙÈ³Ý¶²¸,Ü,,±°°°°,°°±²,;';
HistoryMove[79] = 'Î0LÜ,¿Ï,¾°';
HistoryStatus[79] = '307°°²°°;²±²²´²²²²°°³°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;,;±²°±--±±°°°°,3,ÌÑ±µC,ÎÏ,Ð³Ý´¶,DÖ²ÍÒÙ°,,,±°°°°,°°±²,;°²±°--±±°°°°,9,äå°±»,,Ñ,ã·µGÙÈ³Ý¶²¸,,,±°°°°,°°±²,;';
HistoryMove[80] = '±»»°,½Ü';
HistoryStatus[80] = '307°°²±°;²±²²´²²²²°°´°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;,;±²°±--±±°°°°,3,ÌÑ±µC,ÎÏ,Ð³Ý´¶,DÖ²ÍÒÙ°,,,±°°°°,°°±²,;°²±°--±±°°°°,1,ÑÙäå±,,·³ãÈ°²Ý»G¶µÜ¸,,,,±°°°°,°°±²,;';
HistoryMove[81] = '¶CC,»Ìµ';
HistoryStatus[81] = '317°°²°°;²±²²´²²²²°°´°°°°°°°°°°°µ´°µ°´°µ°µµ¸°;,;±²°±--±±±°°°,4,ÑÝ±´¶,ÎÏ,Ð³,DÖ²ÍÒÙ°CÌµ,,,±°°°°,°°±²,30;°²±°--±±°°°°,1,ÑÙäå±,,·³ãÈ°²Ý»G¶µÜ¸,,,,±°°°°,°°±²,56;';
var MoveCount = 82;

		var GlobalStatus = OrigStatus;
		var MovesDone = "";

        var StrWaitForNextTurn = '+++ Wait for your next turn +++';
		var StrGameOver = 'Game finished!';
	    var StrGameOverByGiveUp = 'Game finished: One player gave up!';
		var StrGameFromDB = 'Game from database';
		var StrPublisher = 'Click to open publisher website';

        var StrLoc0 = 'Boston';
        var StrLoc1 = 'New Haven';
        var StrLoc2 = 'New York';
        var StrLoc3 = 'Norfolk';
        var StrLoc4 = 'Pemaquid';
        var StrLoc5 = 'Philadelphia';
        var StrLoc6 = 'St. Mary\'s';
        var StrLoc7 = 'Albany';
        var StrLoc8 = 'Baltimore';
        var StrLoc9 = 'Canso';
        var StrLoc10 = 'Cumberland';
        var StrLoc11 = 'Deerfield';
        var StrLoc12 = 'Detroit';
        var StrLoc13 = 'Fort Beausejour';
        var StrLoc14 = 'Fort Duquesne';
        var StrLoc15 = 'Fort Frontenac';
        var StrLoc16 = 'Fort Halifax';
        var StrLoc17 = 'Fort Niagara';
        var StrLoc18 = 'Fort Presqu\'île';
        var StrLoc19 = 'Fort St. John';
        var StrLoc20 = 'Fort Stanwix';
        var StrLoc21 = 'Fort Venango';
        var StrLoc22 = 'Fort William Henry';
        var StrLoc23 = 'Gaspe';
        var StrLoc24 = 'Halifax';
        var StrLoc25 = 'Kennebec';
        var StrLoc26 = 'Louisbourg';
        var StrLoc27 = 'Oswego';
        var StrLoc28 = 'Port Royal';
        var StrLoc29 = 'Richmond';
        var StrLoc30 = 'Tadoussac';
        var StrLoc31 = 'Ticonderoga';
        var StrLoc32 = 'Trois Rivieres';
        var StrLoc33 = 'Montreal';
        var StrLoc34 = 'Quebec';
        var StrLoc35 = 'Michillimackinac';

        var StrSettle = 'Settle';
        var StrDevelop = 'Develop';
        var StrFortify = 'Fortify';
        var StrBesiege = 'Besiege';
        var StrReinforce = 'Reinforce a siege';
        var StrRaid = 'Raid';
        var StrAmbush = 'Ambush';
        var StrMLeader = 'Military leader';
        var StrPriest = 'Priest';

        var StrBateaux = 'Bateaux';
        var StrFortification = 'Fortification';
        var StrGovernorString = 'Governor';
        var StrHomeSupport = 'Home Support';
        var StrIndianLeader = 'Indian Leader';
        var StrMilitia = 'Militia';
        var StrRangers = 'Rangers';
        var StrInfantry = 'Regular Infantry';
        var StrSettlers = 'Settlers';
        var StrShips = 'Ships';
        var StrArtillery = 'Siege Artillery';
        var StrTrader = 'Trader';
        var StrCoureurs = 'Coureurs de Bois';
        var StrIntendant = 'Intendant';
        var StrNativesString = 'Native Americans';

        var StrSiegeAbbr = 'Siege';
        var StrActions = 'Actions';
        var StrFirstAction = 'Perform first action.';
        var StrSecondAction = 'Perform second action.';
        var StrFinishTurnFree = 'Finish your turn / free actions.';
        var StrPPreview = 'Points preview';
        var StrPPreviewO = 'Points preview (opponent)';
        var StrVPoints = 'Victory points';
        var StrCDPoints = 'Sum cube/disc points';
        var StrBPoints = 'Sum bonus points (locations)';
        var StrCPoints = 'Points for captured cubes';
        var StrDPoints = 'Points for captured discs';
        var StrCPointsInfo = '(2 pts/cube)';
        var StrDPointsInfo = '(4 pts/disc)';
        var StrLBonus = 'loc. bonus';

        var StrClose = 'Close';
        var StrCloseInfo = 'Close info above.';
        var StrRefillInfo = 'You have fewer than 5 cards in your hand. Please click the button below to draw new cards.';
        var StrDrawCards = 'Draw new cards';
        var StrWithdraw = 'Withdraw';
        var StrSurrender = 'Surrender';
        var StrMap = 'Map';
        var StrAvLocCards = 'Available location cards';
        var StrAvEmpCards = 'Available empire cards';
        var StrHandCards = 'Hand cards';
        var StrDiscardPile = 'Discard pile';
        var StrDrawingPile = 'Drawing pile';
        var StrIsEmpty = 'is empty!';
        var StrHiddenInfo = 'These cards are hidden!';
        var StrHiddenInfo2 = 'Information is available in history games only.';
        var StrDraftInfo = 'Click one card in order to place it onto your discard pile.';
        var StrNatives = 'Natives';
        var StrInf = 'Infantry';
        var StrArt = 'Artillery';
        var StrLocCard = 'Location card';
        var StrNatives2 = 'Native Am.';
        var StrOpponent = 'opponent';
        var StrOppHand = 'Opponent&rsquo;s hand cards';
        var StrOppHandInfo = 'Opponent has no vulnerable card in hand or reserve.';
        var StrOppHandInfo2 = 'Opponent has no Native Americans in hand or reserve.';
        var StrPriestSuccess = 'Priest action successful!';
        var StrILSuccess = 'Indian leader action successful!';
        var StrASuccess = 'Ambush successful!';
        var StrFrom = 'from';
        var StrOppCard = 'Opponent&rsquo;s card';
        var StrPlacedDiscard = 'is placed onto your discard pile.';
        var StrRaidBlocked = 'Raid has been blocked!';
        var StrRaidBlockInfo = 'Raid has been blocked by this card:';
        var StrAmbushBlocked = 'Ambush has been blocked!';
        var StrAmbushBlockInfo = 'Ambush has been blocked by this card:';
        var StrSiegeWon = 'You won a siege';
        var StrWonDef = 'You are the defender. Click the location to finish the siege.';
        var StrSiegeCheck = '++ Siege Check ++';
        var StrHide = 'Hide';
        var StrOppLostCardInfo = 'Opponent puts card back to the available empire cards:';
        var StrFinishTurn = 'Finish your turn.';
        var StrRefillFree = 'Refill hand / Use free act.';
        var StrTop = 'Top';
        var StrBottom = 'Bottom';
        var StrSorted = 'Sorted by internal index';
        var StrOppTurn = 'Opponent&rsquo;s turn.';
        var StrOppLastMove = 'Opponent&rsquo;s last move';
        var StrNewYorkSettled = 'You settled New York!';
        var StrBostonSettled = 'You settled Boston!';
        var StrQuebecSettled = 'You settled Quebec!';
        var StrDuquesneSettled = 'You settled Ft. Duquesne!';
        var StrChooseCard = 'Choose one card.';
        var StrAddStartCard = 'Add one empire card to the starting deck.';
        var StrConfirmDiscard = 'Scenario rule:\nDo you want to discard one card and draw a new one?\n\n(Click a hand card in order to discard it. A new card will be drawn immediately, no reset possible.)';
        var StrConfirmWithdraw = 'Warning:\nThis move cannot be reset because the information, whether or not your opponent will place a cube on the location, will be revealed.\n\nDo you want to continue?';
        var StrWithdrawCB = 'settle if opp. surrenders';
        var StrPreferVulnSiege = 'Prefer vulnerable card from Siege';
        var StrSelectSide = 'Your opponent created this scenario game (rules listed below) and wants you to choose your side. Please choose your campaign and finish the turn.';

        var s0 = 'PayReshuffling';
        var s1 = 'FortLouisbourg';
        var s2 = 'FtDuqesneWin';
        var s3 = 'VulnSiegeCard';
        var s4 = 'Rem3BritsRI';
        var s5 = 'FrSiegeDiscard';
        var s6 = 'ReserveLoc';
        var s7 = 'BrStartBateaux';
        var s8 = 'BlockAmbFree';
        var s9 = 'BlockRaidFree';
        var s10 = 'FortQuebec';
        var s11 = 'FreeFurAction';
        var s12 = 'NoDiscardCost';
        var s13 = 'FrStartEmpCard';
        var s14 = 'GovLocNoCtrl';
        var s15 = 'NativeSiege';
        var s16 = 'LtdSiegeStart';
        var s17 = 'RemLostLoc';
        var s18 = 'NoGovStartLoc';
        var s19 = 'NoGov';
        var s20 = 'ResLostLoc';
        var s21 = 'FrenchBateaux';
        var s22 = 'FirstEditionBat';
        var s23 = 'FirstEditionHS';
        var s24 = 'FirstEditionRaid';
        var s25 = 'PenalizeThinDeck';

        var Scen0 = 'Pay 1 coin when reshuffling your deck. (If you cannot, discard 2 cards after refilling the hand to 5.)';
        var Scen1 = 'One fortification disc in Louisbourg during setup.';
        var Scen2 = 'French instant win by building a city in Fort Duquesne.';
        var Scen3 = 'If you do not block an ambush, remove a vulnerable card from your hand, reserve or siege (in the last case, modify siege track accordingly).';
        var Scen4 = '3 Regular Infantry cards are removed from the British available Empire cards (they cannot be bought).';
        var Scen5 = 'French player can discard a card from hand and draw a new one whenever a siege is resolved (before taking any action).';
        var Scen6 = 'Location cards can be put in Reserve.';
        var Scen7 = 'British player adds &quot;Bateaux&quot; card to the starting deck.';
        var Scen8 = 'A blocked ambush is not considered an action.';
        var Scen9 = 'A blocked pillage is not considered an action.';
        var Scen10 = 'One fortification disc in Quebec during setup.';
        var Scen11 = 'Both players can play a card with a &quot;Fur&quot; as a free action to gain 1 coin.';
        var Scen12 = 'When you discard, you may discard how many cards you like (for free).';
        var Scen13 = 'French player adds any one card from the French Empire deck to the starting deck.';
        var Scen14 = 'If you put a location card back into the available cards, then you lose control of that location.';
        var Scen15 = 'Natives have a military power of 1 and can be used during sieges.';
        var Scen16 = 'British player cannot start a siege until the French player starts one OR Britain has 25 Victory Points.';
        var Scen17 = 'If you lose control of a location, you may remove its card from your hand as a free action.';
        var Scen18 = 'Governor may not be used on starting locations (unless they have been lost to raid or siege).';
        var Scen19 = 'The game is played without governor cards.';
        var Scen20 = 'Lost locations can be put in Reserve.';
        var Scen21 = 'French Bateaux card is available (but not part of the starting deck).';
        var Scen22 = 'French Bateaux card in starting deck (First-Edition-Rule - officially obsolete!)';
        var Scen23 = 'Home Support allows reshuffling (First-Edition-Rule - officially obsolete!)';
        var Scen24 = 'Raid distance: 1 per card (First-Edition-Rule - officially obsolete!)';
        var Scen25 = 'When the Draw pile runs out (by Home Support or normal refills of hand) do not shuffle the Discard pile until the very end of your turn as the final thing you do. If there are less cards available in the Draw pile than you are eligible for then you only draw as many as are available.';

        var StrOutdatedStatusString = 'An error occurred while saving the game status. The connection to the server might have been lost. Please check that you have only one game window open. Close all windows and reopen one. This should fix the issue.';

        </script>