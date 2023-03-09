const ErrorHandler = (message, statusCode, req, res) => {
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
    });
};

module.exports = ErrorHandler;
