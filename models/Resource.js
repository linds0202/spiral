const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: ['']
  },
  tutorials: [
    {
      tutorial: {
        type: String,
        required: false,
      }
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

module.exports = mongoose.model("Resource", ResourceSchema);
