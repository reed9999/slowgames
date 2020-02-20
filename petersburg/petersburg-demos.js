    // Just me messing around with Saint Petersburg history code.
    // Here's an example:
    /*
    https://yucata.de/de/Game/Petersburg/8473881
    https://yucata.de/en/Game/Petersburg/8473881
    */

    // The Yucata code is at
    // https://yucata.de/bundles/gamebasescripts
    // https://yucata.de/bundles/game_Petersburg

    // These could be constants, except that I like to paste the entire code into the console.
    var CARD_HEIGHT = 120 * 45 / 75;
    var CARD_WIDTH = 75 * CARD_HEIGHT / 120;
    var TINY_HEIGHT = 60;
    var TINY_WIDTH = 75 * TINY_HEIGHT / 120;


    var DASHBOARD;

    var listOfPlayerBoards = [[],[],[],[]];
    console.log("Starting execution. (This is a place to click through and see the code in DevTools.");

    function initNewUI() {
        //start by just iterating through and taking note of everything.
        // Later we'll add back in what's useful to game histories, store those things
        // and present them in a better format, and make the rest disappear.
        openCards = document.getElementById('opencards'); //note all lower
        root = openCards.parentElement;
        all = root.getElementsByTagName('*');
        for (e of all) {
            //e.style.display = 'none';
            e.style.display = 'inline';

        }
    }

    function initDashboard() {
// come back to some of these ideas, but I'm feeling bogged down.
        DASHBOARD = document.createElement('div');
        DASHBOARD.style.border = 'thick solid black';
        DASHBOARD.appendChild(document.createTextNode('dashboard'));
    }

    function exploration() {
        start = document.getElementById('playerCardsTabContainer');
//        nc = document.getElementById('newcards');
//        console.log(nc.style.position);
//        console.log(nc.parentElement.style.position);
//        nc.parentElement.style.position = 'relative';
//        console.log(nc.parentElement.innerHTML);
//        console.log(nc.parentElement.parentElement.style.position);
    }



    function displayLists() {
      mainParent = document.getElementById('playerCards1').parentElement;
      for (i=0; i<0; i++) {mainParent.appendChild(document.createTextNode("[]"));}

    }



    function displayNewUI(){
      initNewUI();

      nc = document.getElementById('newcards');
      oc = document.getElementById('oldcards');
      for (el of [nc, oc,]) {
        el.style.backgroundImage = 'none';
        el.style.height = TINY_HEIGHT + 'px';
        el.style.width = 8 * TINY_WIDTH + 'px'; //background image still not scaled though.
        i=0;
        for (c of el.children) {
          c.style.height = TINY_HEIGHT + 'px';
          c.style.width = TINY_WIDTH + 'px';
          c.style.left = i * TINY_WIDTH + 5 + 'px'; //or add an offset if oldcards
          c.style.position = 'static';
          i++;
        }

      }
      oc.style.left = nc.style.right;

      displayLists();
    }


    function modifyOneCard(element){
      number = numberFromCard(element);
      removeCard(element);  //or makeCardTiny
      return number;
    }

    function removeCard(element){
      element.parentNode.removeChild(element);
    }

    function makeCardTiny(element){
        number = numberFromCard(element);
        element.style.height = TINY_HEIGHT + 'px';
        element.style.width = TINY_HEIGHT + 'px';
        element.parentElement.appendChild(nodeForNumber(number));
        return number;
    }

    function nodeForNumber(cardNumber) {
        node = document.createElement("span")
    //    text = document.createTextNode("[" + number + "]");
        if (node) {
            text = document.createTextNode(cardNumber);https://yucata.de/en/Game/Petersburg/8643624
            node.style.display = 'inline-block';
            node.style.padding = '5px';
            node.style.border = '1px solid purple';
            node.appendChild(text)
        }
        return node;
    }

    function numberFromCard(element){
      // The English version has an en after Petersburg
      var patt = /.*\/netimages\/games\/Petersburg\/[en\/]*(.*)\.jpg/;
      if (element.src) {
        var match = element.src.match(patt);
        if (match) {
          id = match[1];
          try {
            card = CARDS[id]
            rv =
            `${card[1]}`;
    //         ${card[3]}r
    //         ${card[4]}r/${card[5]}p`;
            } catch (err) {
            rv = id;
            }
          return rv;
        }
      }
      return null;
    }

    function modifyCards(containerElement, containerHeight = 50, containerType='board'){
      // clone so that the removed element doesn't bump the others up, causing them to be missed.
      returnList = [];
      for (j=containerElement.childElementCount-1; j>=0; j--){
        child = containerElement.children[j];

        cardNumber = modifyOneCard(child);
        if(cardNumber) {
          // containerElement.parentElement.appendChild(document.createTextNode(cardNumber + "--"));
          returnList.push(cardNumber);
        }
      }
      // console.log(returnList);
      return returnList;
    }

    function makeOneBoardVisible(element, i) {
      const INTERVAL = CARD_HEIGHT;
      const HEIGHT = 29;
      element.style.display = 'inline';
      element.style.top = (i*INTERVAL+20) + "px";
      element.style.height = HEIGHT + "px";
      for (el of element.children) {
        listOfCardNumbers = modifyCards(el);
        listOfPlayerBoards[i] = listOfCardNumbers;
      }
    }

    function makeOneHandVisible(element, i) {
      const HAND_TOP = 250;
      const HAND_WIDTH = '200px';
      const X_INTERVAL = 150;
      const Y_INTERVAL = CARD_HEIGHT;  //For some reason we need to deduct this back out.
      element.style.display = 'inline';
      element.style.left = (i*X_INTERVAL + 20) + "px";
      element.style.width = HAND_WIDTH;
      element.style.top = HAND_TOP - i*Y_INTERVAL + "px";
      // console.log(element.style);
      for (el of element.children) {
        modifyCards(el, 50, 'hand');
      }
    }

    function makeBoardsVisible() {
        pc = []
        ph = []
        for (i = 0; i < 4; i++) {
          //Could also use a map statement to make this simpler.
          pc[i] = document.getElementById('playerCards' + (i + 1));
          makeOneBoardVisible(pc[i], i);
          ph[i] = document.getElementById('playerHand' + (i + 1));
          makeOneHandVisible(ph[i], i);
        }
        return pc;
    }

    function reorganize() {
        // Something about this setup isn't working now, and is making them all disappear.
//      makeBoardsVisible();
      // displayNewUI();
    }
    function go(i) {moveNr=i; InitBoard(); SetHistoryText();makeBoardsVisible();}

    function GoFirst(){go(0);}
    function GoBack(){moveNr>0&&moveNr--;InitBoard();SetHistoryText();makeBoardsVisible();}
    function GoNext(){
        moveNr<MoveCount&&moveNr++;
        InitBoard();
        SetHistoryText();
        reorganize();
    }
    function GoLast(){go(MoveCount);}

    //convenience elements

    function playerBoards() {
        return board.players;
    }
    cc = document.getElementById('playerOpenCards1').children[0]; //OpenCards first child of Cards
    hh = document.getElementById('playerHand2').children[0];

    // Note: The constant communication with the site is handled by e.socket.onmessage in gamebasescripts.

    CARDS = {
        1: ['W3', '...W3...', 'carpenter', 3, 3, 0],
        2: ['W4', 'Goldgräber', 'gold miner', 4, 3, 0],
        2: ['W5', 'Weber', 'weaver', 5, 3, 0],
        4: ['W6', 'Pelzjäger', 'fur trapper', 6, 3, 0],
        4: ['W7', 'Schiffbauer', 'shipbuilder', 7, 3, 0],
        7: ['BPUB', 'Schenke', 'pub', 1, "*", "*"],
        10: ['B1', 'Markt', 'market', 5, 0, 1],
        }

        // Junkyard


