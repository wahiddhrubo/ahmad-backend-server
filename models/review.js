const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
	user: {
		type: String,
		required: [true, "Name is Required"],
	},
	comment: {
		type: String,
		required: [true, "Comment is Required"],
	},
	rating: {
		type: Number,
		required: [true, "Rating is Required"],
		min: 1,
		max: 5,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Review", reviewSchema);
