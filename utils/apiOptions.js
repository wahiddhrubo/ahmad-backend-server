exports.searchAndFilterOptions = function (queryStr) {
	const page = parseInt(queryStr.page) || 1;
	const limit = parseInt(queryStr.productPerPage) || 10;
	const name = queryStr.keyword || "";
	const cat = queryStr.categories || "";
	const tg = queryStr.tags || "";

	const skip = limit * (page - 1);

	this.matchOptions = {
		...(name && {
			name: {
				$regex: name,
				$options: "i",
			},
		}),
		...(cat && {
			categories: {
				$in: cat.split(","),
			},
		}),
		...(tg && {
			tags: {
				$in: tg.split(","),
			},
		}),
		// stock: {
		// 	$gte: parseInt(queryStr.minStock) || 1,
		// 	$lte: parseInt(queryStr.maxStock) || 2500,
		// },
		price: {
			$gte: parseInt(queryStr.minPrice) || 1,
			$lte: parseInt(queryStr.maxPrice) || 10000,
		},
	};

	this.groupOptions = {
		_id: "$_id",
		name: { $first: "$name" },
		stocks: { $max: "$stock" },
		category: { $first: "$categories" },
		tags: { $first: "$tags" },
		price: { $first: "$price" },
	};

	this.facet = {
		metadata: [{ $count: "numOfProducts" }],
		products: [{ $skip: skip }, { $limit: limit }],
	};

	return this;
};
