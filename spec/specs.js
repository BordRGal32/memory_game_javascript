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
            testBoard.spaces[0].spaceValue.should.equal('A')
            testBoard.spaces[1].spaceValue.should.equal('A')
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
