const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

// Post Schema
const postSchmea = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  }
});

// Plugin TimeStamp
postSchmea.plugin(timestamps, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = mongoose.model('Post', postSchmea, 'posts');
