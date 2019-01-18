const mongoose = require('mongoose');

const organisationSchema = mongoose.Schema({
  name: {type: String, required: true},
  members: [{
            user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            role: {type: String}
        }],
  votes: [{type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Vote'}]
});

module.exports = mongoose.model("Organisation", organisationSchema);