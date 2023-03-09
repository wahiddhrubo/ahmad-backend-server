const express = require("express");

const {
	getAllProduct,
	createProduct,
	getSingleProduct,
	deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/products").get(getAllProduct);
router.route("/products/new").post(createProduct);
router.route("/products/:id").get(getSingleProduct).delete(deleteProduct);

module.exports = router;
