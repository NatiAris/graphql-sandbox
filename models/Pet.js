const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
  name: String,
  species: String,
  breed: String,
  age: Number,
});

module.exports = mongoose.model('Pet', PetSchema);
