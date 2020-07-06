const mongoose = require("mongoose");

const Article = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    index: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  created_by: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "Administrator",
  },

  parent_model: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "",
  },

  parent_name: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "",
  },

  updated_at: {
    type: Date,
    default: Date.now,
  },

  updated_by: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "Administrador",
  },

  image: {
    type: String,
    trim: true,
    default: "",
  },

  title: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "",
  },

  author: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    default: "",
  },

  content: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Paragraph",
    },
  ],
});

module.exports = mongoose.model("Article", Article);
