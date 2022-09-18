class Response {
    successResponse(res, statusCode = 200, message, data = []) {
        console.log("=== Sending ===", data);
        res.status(statusCode).send({
            status: 1,
            message: message,
            data: data
        });
    }
    errorResponse(res, statusCode = 400, errMessage, data = []) {
        res.status(statusCode).send({
            status: 0,
            message: errMessage,
            data: data
        });
    }
}

module.exports = new Response();

