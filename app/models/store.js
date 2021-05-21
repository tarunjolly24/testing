let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let StoreSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    createdAt: { type: Date, default: Date.now },
  },
);

module.exports = mongoose.model('store', StoreSchema);