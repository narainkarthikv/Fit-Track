const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri , {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/user');


app.use('/api/exercises', exercisesRouter);
app.use('/api/user', userRouter);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
