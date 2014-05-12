$(document).ready(function() {
    //--------------------------
    // 2018 GAME - Just for fun
    //--------------------------
    
    // Variables touche du clavier
    KEY_DOWN	= 40;
    KEY_UP      = 38;
    KEY_LEFT	= 37;
    KEY_RIGHT	= 39;
    
    // Démarrer un nouveau jeu
    newGame();
    
    // Ecoute des actions clavier
    $(document).on('keyup', function(e) {
        if(Game) {
            if(e.keyCode == KEY_LEFT) {
                if(!moveLeft()) {
                    if(!checkIdSlotsAreFull()) {
                        addOneTile();
                    }
                    else {
                        endOfTheGame(false);
                    }
                }
                else {
                    addOneTile();
                }
            }
            if(e.keyCode == KEY_RIGHT) {
                if(!moveRight()) {
                    if(!checkIdSlotsAreFull()) {
                        addOneTile();
                    }
                    else {
                        endOfTheGame(false);
                    }
                }
                else {
                    addOneTile();
                }
            }
            if(e.keyCode == KEY_UP) {
                if(!moveUp()) {
                    if(!checkIdSlotsAreFull()) {
                        addOneTile();
                    }
                    else {
                        endOfTheGame(false);
                    }
                }
                else {
                    addOneTile();
                }
            }
            if(e.keyCode == KEY_DOWN) {
                if(!moveDown()) {
                    if(!checkIdSlotsAreFull()) {
                        addOneTile();
                    }
                    else {
                        endOfTheGame(false);
                    }
                }
                else {
                    addOneTile();
                }
            }
        }
    });
    
    function moveDown() {
        for(var i = 1; i < 17; i++) {
            if(i < 13) {
                if(parseInt(Grid[i]) !== 0) {
                    var newN = i + 4;
                    if(checkIfSlotIsFree(newN)) {
                        saveTilesPosition(i, newN, Grid[i]);
                        var result = true;
                    }
                    else {
                        if(parseInt(Grid[i]) === parseInt(Grid[newN])) {
                            mergeTiles(i, newN, Grid[i]);
                            var result = true;
                        }
                    }
                }
            }
        }
        if(result) {
            moveDown();
        }
        else {
            return false;
        }
    }
    
    function moveUp() {
        for(var i = 1; i < 17; i++) {
            if(i > 4) {
                if(parseInt(Grid[i]) !== 0) {
                    var newN = i - 4;
                    if(checkIfSlotIsFree(newN)) {
                        saveTilesPosition(i, newN, Grid[i]);
                        var result = true;
                    }
                    else {
                        if(parseInt(Grid[i]) === parseInt(Grid[newN])) {
                            mergeTiles(i, newN, Grid[i]);
                            var result = true;
                        }
                    }
                }
            }
        }
        if(result) {
            moveUp();
        }
        else {
            return false;
        }
    }
   
    function moveLeft() {
        for(var i = 1; i < 17; i++) {
            if(parseInt(i) === 1 || parseInt(i) === 5 || parseInt(i) === 9 || parseInt(i) === 13) {
                console.log('Already to the left side');
            }
            else {
                if(parseInt(Grid[i]) !== 0) {
                    var newN = i - 1;
                    if(checkIfSlotIsFree(newN)) {
                        saveTilesPosition(i, newN, Grid[i]);
                        var result = true;
                    }
                    else {
                        if(parseInt(Grid[i]) === parseInt(Grid[newN])) {
                            mergeTiles(i, newN, Grid[i]);
                            var result = true;
                        }
                    }
                }
            }
        }
        if(result) {
            moveLeft();
        }
        else {
            return false;
        }
    }
    
    function moveRight() {
        for(var i = 1; i < 17; i++) {
            if(parseInt(i) === 4 || parseInt(i) === 8 || parseInt(i) === 12 || parseInt(i) === 16) {
                console.log('Already to the right side');
            }
            else {
                if(parseInt(Grid[i]) !== 0) {
                    var newN = i + 1;
                    if(checkIfSlotIsFree(newN)) {
                        saveTilesPosition(i, newN, Grid[i]);
                        var result = true;
                    }
                    else {
                        if(parseInt(Grid[i]) === parseInt(Grid[newN])) {
                            mergeTiles(i, newN, Grid[i]);
                            var result = true;
                        }
                    }
                }
            }
        }
        if(result) {
            moveRight();
        }
        else {
            return false;
        }
    }
   
    function checkIdSlotsAreFull() {
        var result = true;
        for(var i = 1; i < 17; i++) {
            if(Grid[i] === 0) {
                result = false;
            }
        }
        return result;
    }
    
    function checkIfSlotIsFree(n) {
        var result = false;
        if(n < 17 && Grid[n] === 0) {
            return true;
        }
        return result;
    }
    
    function saveTilesPosition(i, nexti, v) {
        Grid[i] = 0;
        Grid[nexti] = v;
    }
    
    function mergeTiles(i, nexti, v) {
        Grid[i] = (parseInt(0));
        Grid[nexti] = (parseInt(v)) + (parseInt(v));
        addToScore(v);
        setAllTiles();
    }
    
    function addToScore(s) {
        var add = s * 10;
        Score = Score + add;
        $("#score").empty().append(Score);
        if(parseInt(s) === 2048) {
            endOfTheGame(true);
        }
    }
   
    function newGame() {
        initGrid();
        initTilesClass();
        initScore();
        initGame();
        setRandomTiles(2);
    }
    
    function endOfTheGame(state) {
        Game = false;
        if(state === true) {
            $(".end-game").empty().append("YOU WIN !!!").show();
        }
        else {
            $(".end-game").empty().append("YOU LOOSE :'(").show();
        }
    }
    
    function initTilesClass() {
        TilesClass = {
            2 : "one",
            4 : "two",
            8 : "three",
            16 : "four",
            32 : "five",
            64 : "six",
            128 : "seven",
            256 : "eight",
            512 : "nine",
            1024 : "ten",
            2048 : "eleven"
        };
    }
    
    function initGrid() {
        Grid = {
            1 : 0,
            2 : 0,
            3 : 0,
            4 : 0,
            5 : 0,
            6 : 0,
            7 : 0,
            8 : 0,
            9 : 0,
            10 : 0,
            11 : 0,
            12 : 0,
            13 : 0,
            14 : 0,
            15 : 0,
            16 : 0
        };
    }
    
    function initScore() {
        Score = 0;
    }
    
    function initGame() {
        Game = true;
    }
    
    function setRandomTiles(n) {
        for(var i = 0; i < n; i++) {
            var key = Math.floor((Math.random() * 16) + 1);
            var val = Math.floor((Math.random() * 100) + 1);
            if(Grid[key] !== 0) {
                setRandomTiles(n);
            }
            else {
                Grid[key] = getNewTileValue(val);
            }
        }
        setAllTiles();
    }
    
    function addOneTile() {
        var key = Math.floor((Math.random() * 16) + 1);
        var val = Math.floor((Math.random() * 100) + 1);
        if(Grid[key] !== 0) {
            addOneTile();
        }
        else {
            Grid[key] = getNewTileValue(val);
        }
        setAllTiles();
    }
    
    function getNewTileValue(v) {
        if(v < 90) {
            var value = 2;
        }
        else {
            var value = 4
        }
        return value;
    }
    
    function setAllTiles() {
        buildEmptyGrid();
        for(var i = 1; i < 17; i++) {
            if(Grid[i] !== 0) {
                $("#tile-" + i).addClass(TilesClass[Grid[i]]).attr('value', Grid[i]).empty().append(Grid[i]);
            }
        }
    }
    
    function buildEmptyGrid() {
        $(".game-wrapper").empty();
        for(var i = 1; i < 17; i++) {
            $(".game-wrapper").append('<div class="grid-slot" id="slot-' + i + '"><div class="tile" id="tile-' + i + '" value="0"></div></div>');
        }
    }
});