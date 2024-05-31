const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/scheduler', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(() => {
    console.log('MongoDB connected');
  }).catch(err => {
    console.error(err);
  });