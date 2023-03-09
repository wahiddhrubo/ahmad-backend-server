const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	primaryImage: {
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
		},
	},
	gallery: [
		{
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
			},
		},
	],

	categories: {
		type: [String],
		required: true,
	},
	tags: {
		type: [String],
		required: true,
	},

	price: {
		type: Number,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	discountedPrice: {
		type: Number,
		required: true,
	},
	reviews: [{ type: mongoose.Schema.ObjectId, ref: "Review" }],
	created_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Product", productSchema);
