const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: String,
  name: String,
  description: String,
  instructor: String,
  start_date: Date,
  end_date: Date,
  credits: Number,
  prerequisites: [String],
  available: Boolean,
  fee: Number,
  term: String,
  seats: Number,
  seats_available: Number
});


const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart: [courseSchema],
  enrolledCourses: [courseSchema]
});



// Define the course model
module.exports= mongoose.model('User', userSchema);
