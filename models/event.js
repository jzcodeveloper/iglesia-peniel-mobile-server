const mongoose = require("mongoose");

const Event = new mongoose.Schema({
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

  title: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    required: true,
  },

  description: {
    type: String,
    trim: true,
    required: true,
  },

  place: {
    type: String,
    trim: true,
    maxlength: [255, "Too many characters"],
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  time: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Event", Event);
