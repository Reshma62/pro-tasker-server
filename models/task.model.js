const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // This is the
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt to
);

const Task = mongoose.model("Task", dataSchema);

module.exports = Task;
