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
                                'N','O', 'P', 'Q', 'R', 'S', 'T','U', 'V', 'W', 'X', 'Y', 'Z']
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
