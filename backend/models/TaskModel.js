const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      dueDate: {
        type: Date,
        required: true,
      },
      completed: {
        type: Boolean,
        default: false,
      }
});

const TaskModel = mongoose.model('Task', TaskSchema);

module.exports = TaskModel;