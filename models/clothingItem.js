const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const clothingItemSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The "name" field must be filled in'],
    minlength: [2, 'The minimum length of the "name" field is 2'],
    maxlength: [30, 'The maximum length of the "name" field is 30'],
  },
  weather: {
    type: String,
    required: [true, 'The "weather" field must be filled in'],
    enum: {
      values: ["hot", "warm", "cold"],
      message: 'The "weather" field must be one of: hot, warm, cold',
    },
  },
  imageUrl: {
    type: String,
    required: [true, 'The "imageUrl" field must be filled in'],
    validate: {
      validator: (value) => validator.isURL(value),
      message: "You must enter a valid URL.",
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("clothingItem", clothingItemSchema);
