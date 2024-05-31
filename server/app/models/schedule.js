const mongoose = require('mongoose');

     const scheduleSchema = new mongoose.Schema({
       userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
       },
       date: {
         type: Date,
         required: true,
       },
       task: {
         type: String,
         required: true,
       },
     });

     const Schedule = mongoose.model('Schedule', scheduleSchema);

     module.exports = Schedule;
