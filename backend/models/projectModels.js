const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Team Member", "Manager"],
    default: "Team Member",
  },
  deadline: {
    type: Date,
  },
});

module.exports = mongoose.model("projects", projectSchema);
