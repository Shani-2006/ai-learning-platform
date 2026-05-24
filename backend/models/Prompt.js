const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  response: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Prompt", promptSchema);