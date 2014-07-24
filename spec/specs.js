beforeEach(function() {
    Space.all = [];

});

describe("Space", function() {
    describe("initialize", function() {
        it("sets the initial attributes for an instance of space", function() {
            var testSpace = Object.create(Space);
            testSpace.initialize(1, 'A');
            testSpace.spaceId.should.equal(1)
            testSpace.spaceValue.should.equal('A')
            testSpace.owned.should.equal(" ")
        })
    })
    describe("create", function() {
        it("creates an initialized instance of Space", function() {
            var testSpace = Space.create(1, 'A')
            Space.isPrototypeOf(testSpace).should.equal(true)
        })
    })
    describe("find", function() {
        it("finds an instance of space given a spaceID", function() {
            var testSpace = Space.create(1,'A');
            Space.find(1).should.equal(Space.all[0])
            Space.find(2).should.equal(false)
        })
    })
    describe("matched", function() {
        it("marks a matched space with the players name", function() {
            var testSpace = Space.create(1, 'A');
            testSpace.matched("Tanya");
            Space.all[0].owned.should.equal("Tanya")
        })
    })
})


describe("Board", function(){
    describe("create", function() {
        it("creates an instance of Baord", function() {
            var testBoard = Board.create(10);
            Board.isPrototypeOf(testBoard).should.equal(true);
        })
    })
    describe("initialize", function(){
        it("initializes the attributes of Board", function() {
            var testBoard = Object.create(Board);
            testBoard.initialize(10);
            testBoard.spaces.should.eql([])
            testBoard.dimension.should.equal(10)
            testBoard.spaceNumber.should.equal(100)
        })
    })
   describe("buildSpaces", function() {
        it("populates a board with spaces", function() {
            var testBoard = Board.create(2)
            testBoard.buildSpaces();
            testBoard.spaces[0].spaceId.should.equal(1)
            testBoard.spaces[0].spaceValue.should.equal('images/ballon.jpg')
            testBoard.spaces[1].spaceValue.should.equal('images/ballon.jpg')
            testBoard.spaces[1].spaceId.should.equal(2)
            testBoard.spaces.length.should.equal(4)
        })
    })
    describe("shuffleSpaces", function() {
        it("shuffles the spaces array", function() {
            var testBoard = Board.create(10)
            testBoard.buildSpaces();
            testBoard.shuffleSpaces();
            testBoard.spaces.length.should.equal(100)
        })
    })
})

describe("Game", function() {
    describe("Create", function() {
        it("creates an instance of Game", function() {
            var testGame = Game.create(10, "Tanya", "Jack");
            Game.isPrototypeOf(testGame).should.equal(true)
        })
    })
    describe("switchTurn", function() {
        it("changes the current player", function() {
            var testGame = Game.create(10, "Tanya", "Jack");
            testGame.whoseTurn = "Tanya";
            testGame.switchTurn();
            testGame.whoseTurn.should.equal("Jack")
        })
    })
    describe("isMatch", function() {
        it("determines if two cards have the same value and marks space", function(){
            var testGame = Object.create(Game);
            testGame.board = Board.create(10);
            testGame.board.buildSpaces();
            testGame.player1 = "Tanya";
            testGame.player2 = "Steve";
            testGame.whoseTurn = "Tanya";
            testGame.isMatch(1,2).should.equal(true)
            testGame.isMatch(1,4).should.equal(false)
            Space.all[0].owned.should.equal("Tanya")
            Space.all[2].owned.should.equal(" ")
        })
    })

    describe("whoStarts", function() {
        it("lets a player go first", function () {
            var testGame = Object.create(Game);
            testGame.initialize(2, "Tanya", "Steve");
            testGame.whoStarts();
            testGame.whoseTurn.should.not.equal(" ")

        })
    })
    describe("allSpacesOwned", function() {
        it("returns false if there is an unmatched space", function () {
            var testGame = Game.create(2, "Tanya", "Steve");
            testGame.allSpacesOwned().should.equal(false)
        })
        it("returns true and sets Game.winner playerName when game is won", function(){
            var testGame = Game.create(2, 'Tanya', 'Steve');
            Space.all[0].matched('Tanya');
            Space.all[1].matched('Tanya');
            Space.all[2].matched('Tanya');
            Space.all[3].matched('Tanya');
            testGame.allSpacesOwned().should.equal(true)
            testGame.winner.should.equal("Tanya")
        })
        it("return returns true and sets Game.winner to cats game when game is tied", function() {
             var testGame = Game.create(2, 'Tanya', 'Steve');
            Space.all[0].matched('Tanya');
            Space.all[1].matched('Tanya');
            Space.all[2].matched('Steve');
            Space.all[3].matched('Steve');
            testGame.allSpacesOwned().should.equal(true)
            testGame.winner.should.equal("Cats Game")

        })
    })
    describe("playerMatches", function() {
        var testGame = Game.create(2, "Tanya", "Steve");
        Space.all[0].matched('Tanya');
        Space.all.matched('Tanya');
        testGame.playerMatches("Tanya").should.equal(1)
    })
})
