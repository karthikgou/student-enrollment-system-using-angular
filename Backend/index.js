const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const uri = "mongodb+srv://kbcfh:Password123@cluster0.9odtkgv.mongodb.net/web-development-project?retryWrites=true&w=majority";

const courseCatalog = require('./Models/courseCatalog')
const User = require('./Models/users')


// Use the bodyParser middleware to parse JSON data
app.use(bodyParser.json());

app.use(cors());
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

// Define the GET route for /filteredCourses
app.post('/filteredCourses', function(req, res) {

  const term = req.body.term;
  const courseName = req.body.courseName;
  const courseCode = req.body.courseCode;
  const instructorName = req.body.instructorName;
  const availableCourses = req.body.availableCourses;

  const query = {};

  if (term) {
    query.term = term;
  }

  if (courseName) {
    query.name = { $regex: courseName, $options: 'i' };
  }

  if (courseCode) {
    query.code = { $regex: courseCode, $options: 'i' };
  }

  if (instructorName) {
    query.instructor = { $regex: instructorName, $options: 'i' };
  }

  if (availableCourses) {
    query.available = availableCourses;
  }

  courseCatalog.find(query)
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(err);
  });
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
    res.send(result);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(err);
  });

});

app.post('/api/signup', async (req, res) => {
  const { fullname, email, password } = req.body;

  const user = await User.findOne({email: email}).exec();

  console.log(user);

  if(user) {
    // User already exists
    return res.status(409).send({ message: 'User already exists.' });
  }

  const newUser = new User({
    fullname,
    email,
    password,
  });

  newUser.save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if user with given email exists
  const user = await User.findOne({ email: email }).exec();

  if (!user) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }

  // Check if password matches
  const isMatch =  user.password === password;

  if (!isMatch) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }

  return res.status(200).send(user);
});


// Add a course to the user's cart
app.post('/api/addToCart', async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    // Check if the course is already in the user's cart
    const courseIndex = user.cart.findIndex(course => course._id.toString() === courseId);
    if (courseIndex !== -1) {
      return res.status(401).send({ message: 'Course is already in the cart' });
        }

    // Find the course by ID
    const course = await courseCatalog.findById(courseId);
    if (!course) throw new Error('Course not found');

    // Add the course to the user's cart
    user.cart.push(course);

    // Save the user
    await user.save();
    console.log('Course added to cart');
    return res.status(200).send({ message: 'Course added to cart' });

  } catch (error) {
    console.error(error);
  }
});

app.post('/api/getCart', async (req, res) => {
  const { userId} = req.body;
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');

      // Return the user's cart
      res.send(user.cart);
    } catch (error) {
      console.error(error);
    }
});

// POST route for enrolling in courses
app.post('/api/enroll', async (req, res) => {
  try {
    const userId = req.body.userId;
    const courseId = req.body.courseId;

    // Find the user by ID and populate the cart and enrolled courses
    const user = await User.findById(userId).populate('cart').populate('enrolledCourses');

    // Check if the user has the course in their enrolled courses
    const courseAlreadyEnrolled = user.enrolledCourses.find(course => course._id == courseId);

    if (courseAlreadyEnrolled) {
      // The user is already enrolled in the course
      return res.status(400).json({ message: 'User is already enrolled in this course' });
    }

    // Check if the user has the course in their cart
    const courseInCart = user.cart.find(course => course._id == courseId);

    if (!courseInCart) {
      // The course is not in the user's cart
      return res.status(404).json({ message: 'Course not found in cart' });
    }

    // Update the course's seats available
    const course = await courseCatalog.findById(courseId);

    if (!course) {
      // The course doesn't exist
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.seats_available === 0) {
      // No seats available for this course
      return res.status(404).json({ message: 'No seats available for this course' });
    }


    // Remove the course from the user's cart
    user.cart.pull(courseInCart._id);

    // Add the course to the user's enrolled courses
    user.enrolledCourses.push(courseInCart);

    
    course.seats_available--;

    // Save the user and course changes
    await user.save();
    await course.save();

    // Return a success message
    return res.status(200).json({ message: 'Course successfully enrolled' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// POST route for removing a course from the cart
app.post('/api/cart/remove', async (req, res) => {
  try {
    const userId = req.body.userId;
    const courseId = req.body.courseId;

    // Find the user by ID and populate the cart
    const user = await User.findById(userId).populate('cart');

    // Check if the user has the course in their cart
    const courseInCart = user.cart.find(course => course._id == courseId);

    if (!courseInCart) {
      // The course is not in the user's cart
      return res.status(404).json({ message: 'Course not found in cart' });
    }

    // Remove the course from the user's cart
    user.cart.pull(courseInCart._id);

    // Save the user's changes
    await user.save();

    // Return a success message
    return res.status(200).json({ message: 'Course successfully removed from cart' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/api/getEnrolledCourses', async (req, res) => {
  const { userId} = req.body;
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');

      // Return the user's cart
      res.send(user.enrolledCourses);
    } catch (error) {
      console.error(error);
    }
});



// Start the server
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});

module.exports = app;
