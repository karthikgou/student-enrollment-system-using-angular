const express = require('express');
const app = express();
const mongoose = require('mongoose');
const uri = "mongodb+srv://kbcfh:Password123@cluster0.9odtkgv.mongodb.net/web-development-project?retryWrites=true&w=majority";

const courseCatalog = require('./Models/courseCatalog')


// Connect to the database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => console.error(err));


// Define the GET route for /courselist
app.get('/courselist', async function(req, res) {
  try {
    // Aggregate the courses collection by term
    const results = await courseCatalog.aggregate([
      { $group: { _id: "$term", courses: { $push: "$$ROOT" } } }
    ]);

    // Send the results as a JSON response
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
