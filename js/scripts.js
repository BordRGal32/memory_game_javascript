var Space = {
    all: [],

    initialize: function(spaceId, spaceValue) {
        this.spaceId = spaceId;
        this.spaceValue = spaceValue;
        this.owned = " ";
    },

    create: function(spaceId, spaceValue) {
        var space = Object.create(Space);
        space.initialize(spaceId, spaceValue);
        this.all.push(space);
        return space;

    },

    find: function(spaceId) {
        var match = false
        Space.all.forEach(function(space) {
            if(space.spaceId === spaceId) {
                match = space;
            }
        })
        return match
    },

    matched: function(playerName) {
        this.owned = playerName;
    }
}

var Board = {
    initialize: function(dimension) {
        this.spaces = [];
        this.spaceNumber = dimension * dimension;
        this.dimension = dimension;
    },

    create: function(dimension) {
        var board = Object.create(Board)
        board.initialize(dimension);
        return board;
    },

    buildSpaces: function() {
        var alphabeticValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                                'N','O', 'P', 'Q', 'R', 'S', 'T','U', 'V', 'W', 'X', 'Y', 'Z', '!', '@', '#', '$', '%', '^', '&', '*', '()']
        var valueIndex = 0
        for(var i = 1; i <= this.spaceNumber; i += 2) {
            this.spaces.push(Space.create(i, alphabeticValues[valueIndex]))
            this.spaces.push(Space.create(i+1, alphabeticValues[valueIndex]))
            valueIndex += 1
        }
    },

    shuffleSpaces: function() {
        var counter = (this.spaces.length - 1);
        for(var i = 0; i <= this.spaces.length; i ++ ) {
            var index = Math.floor(Math.random() * counter);
            var temp = this.spaces[counter]
            this.spaces[counter] = this.spaces[index];
            this.spaces[index] = temp;
            counter -= 1;

        }
    }
}


var Game = {
    initialize: function(dimension, player1, player2) {
        this.playerOne = player1;
        this.playerTwo = player2;
        this.winner = " "
        this.whoseTurn = " "

    },

    create: function(dimension, player1, player2){
        var game = Object.create(Game)
        game.initialize(dimension, player1, player2)
        game.board = Board.create(dimension)
        game.board.buildSpaces();
        game.board.shuffleSpaces();
        return game;
    },

     whoStarts: function(){
        if (Math.random() <= 0.5) {
            this.whoseTurn = this.playerOne;
        } else {
            this.whoseTurn = this.playerTwo;
        }
    },

    switchTurn: function() {
        if(this.whoseTurn === this.playerOne) {
            this.whoseTurn = this.playerTwo;
        } else {
            this.whoseTurn = this.playerOne;
        }
    },

    isMatch: function(card1, card2) {
        var match = false;
        var card1 = Space.find(card1);
        var card2 = Space.find(card2);
        if (card1.spaceValue === card2.spaceValue) {
            match = true
            card1.matched(this.whoseTurn)
            card2.matched(this.whoseTurn)
        } else {
            this.switchTurn;
        }
        return match;
    },

    allSpacesOwned: function() {
        var emptySpace = true
        var playerOneCount = 0;
        var playerTwoCount = 0;
        var pOne = this.playerOne;
        var pTwo = this.playerTwo;
        Space.all.forEach(function(space){
            if( space.owned === " ") {
                emptySpace = false;
                return emptySpace;
            } else if( space.owned === pOne) {
                playerOneCount += 1;
            } else {
                playerTwoCount += 1;
            }
        })
        this.setWinner(playerOneCount, playerTwoCount);
        return emptySpace
    },

     setWinner: function(playerOneCount, playerTwoCount) {
        var temp = " "
        if(playerOneCount > playerTwoCount) {
            this.winner = this.playerOne;
            temp = this.playerOne
        } else if( playerTwoCount > playerOneCount) {
            this.winner = this.playerTwo;
            temp = this.playerTwo;
        } else {
            this.winner = "Cats Game";
        }
    }
}

$(document).ready(function() {
    var currentGame;
    var tempSpace = "empty";
    var tempCard;

    $("button#new-game-button").click(function() {
        $("button#new-game-button").hide();
        $("form#new-game-form").show();
        $("#game-between").show();
    });

    $("form#new-game-form").submit(function(event) {
        var playerOne = $("input#player1").val();
        var playerTwo = $("input#player2").val();
        var dimension = $("input#dimension-number").val();
        currentGame = Game.create(dimension, playerOne, playerTwo)
        currentGame.whoStarts();
        $("#current-player").show();
        $("#current-player").append("<p>"+ currentGame.whoseTurn + "</p>")
        $("form#new-game-form").hide();
        $("button#end-game").show();
        $("#player1-name").append("<p> Green: "+playerOne+"</p>")
        $("#player2-name").append("<p> Purple: "+playerTwo+"</p>")
        $("button#end-game").show();
        for (var i=0; i < (dimension); i ++) {
           $("table#game-board").append("<tr></tr>")
            for ( var j=0; j< (dimension); j++){
                var id = currentGame.board.spaces[(i*dimension) + j].spaceId
                $("tr").last().append("<td id = '" + id.toString() + "' class='card-back'></td>")
                $("table#game-board td").last().click(makeMove);
            }
        }
        event.preventDefault();
    });

    function makeMove() {
        var card = this
        var spaceId = this.id
        var value = Space.find(parseInt(spaceId)).spaceValue
        if(tempSpace === "empty" ) {
            tempSpace = spaceId
            tempCard = card
            $(card).append(value)
            console.log("Empty:" + currentGame.whoseTurn)
        } else {
            $(card).append(value)
            if(currentGame.isMatch(parseInt(tempSpace), parseInt(spaceId))) {
                matchFound(card);
                console.log("MATCH:" + currentGame.whoseTurn)
            } else {
                $(card).addClass('card-back').delay(100);
                $(tempCard).addClass('card-back').delay(100);
                console.log("NO MATCH:" + currentGame.whoseTurn)
                currentGame.switchTurn();
            }
        tempSpace = "empty"
        }

    }

    function matchFound(card) {
         if(currentGame.whoseTurn === currentGame.playerOne) {
            $(card).addClass('green')
            $(tempCard).addClass('green')
        } else {
            $(card).addClass('purple')
            $(tempCard).addClass('purple')
        }
     tryForWinner();
    }

    function tryForWinner() {
        if(currentGame.allSpacesOwned()) {
            $("#current-player").append(currentGame.winner)
            console.log("WINNER" +currentGame.winner)
        }
    }
})
