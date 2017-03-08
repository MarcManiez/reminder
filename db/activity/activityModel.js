const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true
  },

  times: {
    type: Number,
    required: true
  },

  period: {
    type: String,
    required: true
  },

  frequency: {
    type: String,
    required: true
  },

  cost: {
    type: Number,
    required: false,
    default: 0
  },

  satisfaction: {
    type: Number,
    required: true,
    default: 0
  },

  status: {
    type: Boolean,
    default: false
  },

  executionDate: {
    type: Date,
    default: null
  }

});

module.exports = mongoose.model('Activity', ActivitySchema);