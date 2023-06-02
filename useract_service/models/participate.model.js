const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const participateSchema = new Schema({
  userid:{type:String, require: true},
  actid:[{type:String, require: true}]
});

const Participate = mongoose.model('participate', participateSchema);

module.exports = Participate;