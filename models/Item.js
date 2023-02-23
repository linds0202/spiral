const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  inList: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  prices: [
    {
      price: {
        type: mongoose.Types.Decimal128,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", ItemSchema);
