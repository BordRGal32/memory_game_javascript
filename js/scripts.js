var Space = {
    all: [],

    initialize: function(spaceId, spaceValue) {
        this.spaceId = spaceId
        this.spaceValue = spaceValue
        this.owned = " "
    },

    create: function(spaceId, spaceValue) {
        var space = Object.create(Space);
        space.initialize(spaceId, spaceValue)
        this.all.push(space)
        return space

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
