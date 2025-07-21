function createResponse(statusCode, message = "Success", data = null) {
    return {
        statusCode,
        message,
        data
    };
}

export default createResponse