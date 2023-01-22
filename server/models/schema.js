const mongoose = require("mongoose");

const codeTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  solution: {
    type: [String],
    required: true,
  },
  difficulty: {
    type: String,
    require: true,
  },
  mentorSocketId: {
    type: String,
    require: false,
  },
  description: {
    type: String,
    require: true,
  },
  blockPlaceholder: {
    type: String,
    require: true,
  },
});

const CodeTask = mongoose.model("code", codeTaskSchema);
module.exports = { CodeTask };
