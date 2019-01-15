const mongoose = require('mongoose');
// const findOrCreate = require('mongoose-findorcreate');

const organisationSchema = mongoose.Schema({
  name: {type: String, required: true},
  members: [{
            userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            role: {type: String}
        }],
  votes: {type: [mongoose.Schema.Types.ObjectId], required: false, ref: 'Vote'}
});

// organisationSchema.plugin(findOrCreate);

module.exports = mongoose.model("Organisation", organisationSchema);