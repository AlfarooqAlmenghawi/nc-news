const SQLErrorHandler = (error, request, response, next) => {
  if (error.code === "22P02") {
    console.log("SQL ERROR");
    response.status(406).send({
      message: "Unknown endpoints are not acceptable on this platform.",
    });
  }
  next(error);
};

const customErrorhandler = (error, request, response, next) => {
  if (error.status && error.message) {
    console.log("CUSTOM ERROR");
    response.status(error.status).send({
      message: error.message,
    });
  }
  next(error);
};

module.exports = { SQLErrorHandler, customErrorhandler };