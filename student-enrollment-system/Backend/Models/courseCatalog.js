const mongoose = require('mongoose');

// Define the course schema
const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  credits: {
    type: Number,
    required: true
  },
  prerequisites: {
    type: [String],
    default: []
  },
  available: {
    type: Boolean,
    default: true
  },
  fee: {
    type: Number,
    required: true
  },
  term: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  seats_available: {
    type: Number,
    required: true
  }
});


// Define the course model
module.exports= mongoose.model('courseCatalog', courseSchema);
