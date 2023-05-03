const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const bodyParser=require('body-parser');


const uri = "mongodb+srv://kbcfh:Password123@cluster0.9odtkgv.mongodb.net/web-development-project?retryWrites=true&w=majority";

const courseCatalog = require('./Models/courseCatalog')


app.use(bodyParser.json())


app.use(cors());
// Connect to the database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => console.error(err));


// Define the GET route for /courseist
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


// Define the GET route for /filteredCourses
app.post('/getCourseDetails', function(req, res) {

  const id = req.body.id;


  const query = {};

  if (id) {
    query._id = id;
  }



  courseCatalog.find(query)
  .then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(err);
  });

});

// Start the server
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
