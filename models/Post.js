const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  sale: {
    type: Boolean,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
