const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    description: {
      type: String,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User",
        //unique: true,
      },
    ],
    image: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Custom validator function to ensure unique elements in the likes array
PostSchema.path("likes").validate(function (value) {
  if (!Array.isArray(value)) {
    return true; // Ignore if it's not an array (could be empty or undefined)
  }

  // Convert the array to a Set to remove duplicates
  const uniqueLikes = new Set(value);

  return uniqueLikes.size === value.length; // The Set size should be equal to the array length if there are no duplicates
}, "Each user can only like a post once");

module.exports = mongoose.model("Item", Item);
