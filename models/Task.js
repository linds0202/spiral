const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    default: [''],
  },
  complete: {
    type: Boolean,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  timeWorked: {
    type: [Number],
    required: true,
    default: [0]
  },
  dueDate: {
    type: Date,
    required: false,
    default: Date.now,
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

module.exports = mongoose.model("Task", TaskSchema);
