const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const organisationSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  members: {type: Map, of: String, required: true}
});

organisationSchema.plugin(findOrCreate);

const Organisation = mongoose.model("Organisation", organisationSchema);

module.exports = Organisation;