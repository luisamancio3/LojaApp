const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CarrinhoSchema = new Schema({
    itens : [
      {
        type: Schema.Types.ObjectId,
        ref: 'Item'
      }
    ]
});

module.exports = mongoose.model('Carrinho', CarrinhoSchema);