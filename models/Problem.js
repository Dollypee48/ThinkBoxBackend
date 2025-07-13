const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const problemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    category: {
      type: String,
      enum: ["Personal", "Academic", "Business", "Other"],
      default: "Other",
    },
    notes: [noteSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);