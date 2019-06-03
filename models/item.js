const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
  },
  preco: {
      type: Number,
      required: true
  },
  quantidade: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Item', ItemSchema);