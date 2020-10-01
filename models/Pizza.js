const { Schema, model } = require('mongoose');
const moment = require('moment');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String,
        required: 'You need to provide a pizza name',
        trim: true
    },
    createdBy: {
        type: String,
        required: 'You have to tell the world your invention',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    size: {
        type: String,
        required: 'Tell us your pizza size',
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'], //enumerable - term in web dev referring to set of data
        default: 'Large'
    },
    toppings: [{
        type: Array
    }], //indicated an array as data type
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the model
module.exports = Pizza;