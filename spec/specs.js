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
