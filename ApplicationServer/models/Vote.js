const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const voteSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  endDate: {type: Date, required: true},
  voters: {type: [mongoose.Schema.Types.ObjectId], required: true, ref: 'User'},
  votes: {type: Map, of: String}
});

voteSchema.plugin(findOrCreate);

const Vote = mongoose.model("Organisation", voteSchema);

module.exports = Vote;