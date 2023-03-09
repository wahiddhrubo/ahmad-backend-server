const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

const errorMiddleware = require("./middleware/error.js");

app.use(express.json());
app.use(cookieParser());

const products = require("./routes/productRoute.js");

app.use(
	cors({
		orgin: "*",
	})
);
app.use("/api/", products);

app.use(errorMiddleware);

module.exports = app;
