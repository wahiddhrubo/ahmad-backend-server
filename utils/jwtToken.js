const sendToken = (user, res, statusCode) => {
	const token = user.getJwtToken();

	const options = {
		expires: new Date(
			new Date().getTime() + process.env.COOKIE_EXPIRE * 24 * 60 * 60
		),
		httpOnly: true,
	};
	console.log(token);
	res.status(statusCode).cookie("token", token, options).json({
		success: true,
		token,
	});
};

module.exports = sendToken;
