const mongoose = require('mongoose');
// const findOrCreate = require('mongoose-findorcreate');

const voteSchema = mongoose.Schema({
  name: {type: String, required: true, unique: false},
  description: {type: String, required: false, unique: false},
  endDate: {type: Date, required: true},
  votes: [{
    voter : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    vote : {type: Boolean, required: false}
    }],
    ended: {type: Boolean, required: true, default: false},
    created: {type: Date, required: true, default: Date.now()}
});

voteSchema.set('autoIndex', true);

// voteSchema.plugin(findOrCreate);

module.exports = mongoose.model("Vote", voteSchema);;