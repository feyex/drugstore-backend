const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define collection and schema for Business
let Business = new Schema({
  drug_name: {
    type: String
  },
  quantity: {
    type: Number
  },
  price: {
    type: Number
  }
},{
    collection: 'drug'
});

module.exports = mongoose.model('Business', Business);