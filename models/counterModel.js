const mongoose = require('mongoose')

const CounterSchema = new mongoose.Schema(
  {
    id: String,
    counter: Number,
    // bacteria_counter: Number,
    // yeasts_counter: Number,
    // molds_counter: Number,
  }
);

module.exports = mongoose.model('Counter', CounterSchema);