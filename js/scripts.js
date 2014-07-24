var Space = {
    all: [],

    initialize: function(spaceId, spaceValue) {
        this.spaceId = spaceId;
        this.url = spaceValue;
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
        // var alphabeticValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                                // 'N','O', 'P', 'Q', 'R', 'S', 'T','U', 'V', 'W', 'X', 'Y', 'Z', '!', '@', '#', '$', '%', '^', '&', '*', '()']
        var alphabeticValues = [ 'images/ballon.jpg', 'images/bird_tree.jpg','images/apple.jpg','images/birdcage.jpg',
                                 'images/building.jpg', 'images/car.jpg', 'images/casino.jpg', 'images/city.jpg',
                                 'images/house.jpg', 'images/lake.jpg', 'images/monkey.jpg', 'images/polar-bear.jpg',
                                 'images/rainbow.jpg', 'images/tree.jpg', 'images/zebra.jpg', 'images/moon.jpg',
                                 'images/smurfs.jpg', 'images/leaves.jpg', 'images/globe.jpg', 'images/mirror.jpg',
                                 'images/butterfly.jpg', 'images/dragonfly.jpg', 'images/lavendar.jpg', 'images/field',
                                 'images/railroad.jpg', 'images/waterfall.jpg', 'images/island.jpg',, 'images/water.jpg',
                                 'images/ducati.jpg', 'images/beach.jpg', 'images/elephants.jpg', 'images/wolves.jpg',
                                 'images/soccer.jpg', 'images/sunflower.jpg', 'images/kitten.jpg', 'images/clock.jpg']
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
        if(player1 === '') {
             this.playerOne = 'PlayerOne'
        } else {
            this.playerOne = player1;
        }
        if(player2 === '') {
            this.playerTwo = 'PlayerTwo'
        } else {
            this.playerTwo = player2
        }
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

    playerMatches: function(player) {
        var count = 0
        Space.all.forEach(function(space) {
            if( space.owned === player) {
                count += 1
            }
        })
        return count/2
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
        currentGame = Game.create(2, playerOne, playerTwo)
        currentGame.whoStarts();
        $("#current-player").show();
        $("#player-name").append("<p>"+ currentGame.whoseTurn + "</p>")
        $("#player-name").show();
        $(".players").show();
        $("form#new-game-form").hide();
        $("button#end-game").show();
        $("#player1-name").append("<p>"+currentGame.playerOne+"</p>")
        $("#player2-name").append("<p>"+currentGame.playerTwo+"</p>")
        $("button#end-game").show();2
        for (var i=0; i < (2); i ++) {
           $("table#game-board").append("<tr></tr>")
            for ( var j=0; j< (2); j++){
                var id = currentGame.board.spaces[(i*2) + j].spaceId
                var url = currentGame.board.spaces[(i*2) + j].url
                $("tr").last().append("<td id = '" + id.toString() + "' class='card-back'></td>")
                $("table#game-board td").last().bind('click', makeMove);
            }
        }
        event.preventDefault();
    });

    function makeMove() {
        var spaceId = this.id
        if (this.id != 'owned') {
            console.log(Space.find(parseInt(spaceId)))
            var card = this
            var value = Space.find(parseInt(spaceId)).url;

            $(card).append("<img id='card-image' src= '"+ value +"' >");
            $(card).attr('class', 'no-background')
            if(tempSpace === "empty" ) {
                tempSpace = spaceId
                tempCard = card
            } else {
                $("table#game-board td").unbind('click')
                if(currentGame.isMatch(parseInt(tempSpace), parseInt(spaceId))) {
                    $("h3#match").show(1).delay(3000).hide(1);
                    matchFound(card)
                } else {
                    $("h3#no-match").show(1).delay(3000).hide(1);
                    flipCards(card);
                    currentGame.switchTurn();
                    $("#player-name").hide(1).delay(3000).show(1);
                    $("#player-name p").replaceWith("<p>"+ currentGame.whoseTurn + "</p>")
                }
            tempSpace = "empty"
            }
        }
    }


    function flipCards(card) {
         setTimeout(function() {
            $("td").bind('click', makeMove)
            $(card).text('')
            $(card).attr('class', 'card-back')
            $(tempCard).text('')
            $(tempCard).attr('class', 'card-back')
         }, 3000)
     }

    function matchFound(card) {
        $(card).attr('id', 'owned')
        $(tempCard).attr('id', 'owned')
        if(currentGame.whoseTurn === currentGame.playerOne) {
            $("#player1-matches").text("MATCHES: " + currentGame.playerMatches(currentGame.whoseTurn));
        } else {
            $("#player2-matches").text("MATCHES: " + currentGame.playerMatches(currentGame.whoseTurn));
        }
        setTimeout(function() {
        $("td").bind('click', makeMove)
        tryForWinner();
    }, 3000)

    }

    function tryForWinner() {
        if(currentGame.allSpacesOwned()) {
            $("#current-player").hide();
            $("#winner").show();
            $("#winner").append(currentGame.whoseTurn + "\n WINS!")
        }
    }
})
