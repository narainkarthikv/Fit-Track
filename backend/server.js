//I've provided the test database for learning purposes only. Please ensure it's used responsibly and not misused in any way.

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const uri = "mongodb+srv://narainkarthik812:dev-fittrack@mongod.87ibcef.mongodb.net/";

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

// Routes
const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/user');

app.use('/api/exercises', exercisesRouter);
app.use('/api/user', userRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

