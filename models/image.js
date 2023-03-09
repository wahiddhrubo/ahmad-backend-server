const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
	public_id: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Image", imageSchema);
