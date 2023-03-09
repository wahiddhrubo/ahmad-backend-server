const Product = require("../models/product.js");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../utils/catchAsyncError.js");
const { searchAndFilterOptions } = require("../utils/apiOptions");

//CREATE A NEW PRODUCT
exports.createProduct = catchAsyncError(async (req, res, next) => {
	const product = await Product.create(req.body);
	res.status(201).json({
		success: true,
		product,
	});
});

//GET ALL PRODUCTS WITH CATEGORIES AND PAGINATION -- USERS
exports.getAllProduct = catchAsyncError(async (req, res) => {
	const { matchOptions, groupOptions, facet } = searchAndFilterOptions(
		req.query
	);

	const products = await Product.aggregate([
		{ $match: matchOptions },

		{ $facet: facet },
	]);

	res.status(201).json({
		success: true,
		products,
	});
});

//FETCH SINGLE PRODUCT
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
	let product = await Product.findById(req.params.id);
	if (!product) {
		return next(ErrorHandler("Product not found", 404, req, res));
	}

	res.status(201).json({
		success: true,
		product,
	});
});

//DELETE SINGLE PRODUCT
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
	let product = await Product.findById(req.params.id);
	if (!product) {
		return next(ErrorHandler("Product not found", 404, req, res));
	}
	await product.remove();

	res.status(201).json({
		success: true,
		message: "Product removed successfully",
	});
});
