const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment/moment');

// creating the userSchema
const thoughtSchema = new Schema({

    thoughtText: {
        type: String,
        unique: true,
        required: true,
        minLength: 1,
        maxLength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        get: formatDate
    },
    username: {
        type: String,
        required: true,
    },

    reactions: [reactionSchema]

},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }

);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Format date with moment.js
function formatDate (date) {
    return moment(date).format('MMMM Do, YYYY')
}

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;