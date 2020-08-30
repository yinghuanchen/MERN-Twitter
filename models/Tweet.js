const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    // 'users is the db table name'
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    // timestamps: true,
    type: Date,
    default: Date.now
  },
});

module.exports = Tweet = mongoose.model('tweet', TweetSchema);