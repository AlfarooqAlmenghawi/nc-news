const SQLErrorHandler = (error, request, response, next) => {
  // For undefined columns, usually from queries where there is a typo in the column.
  if (error.code === "42703") {
    response.status(400).send({ message: "Column doesn't exist." });
  }
  // For unknown endpoints
  if (error.code === "22P02") {
    response.status(406).send({
      message: "Unknown endpoints are not acceptable on this platform.",
    });
  }
  // the error.constraint === "comments_author_fkey" in the object checks what type of error it is, in this case it's an invalid username.
  else if (
    error.code === "23503" &&
    error.constraint === "comments_author_fkey"
  ) {
    response.status(406).send({
      message: "User doesn't exist.",
    });
  } else if (
    // the error.constraint === "comments_author_fkey" in the object checks what type of error it is, in this case it's an invalid article in the first place.
    error.code === "23503" &&
    error.constraint === "comments_article_id_fkey"
  ) {
    response.status(406).send({
      message: "Invalid article ID, so nowhere to post this comment.",
    });
  } else if (error.code === "23503") {
    response.status(400).send({
      message: "Unknown Error",
    });
  } // This occurs when there is a SQL NOT NULL violation, which occurs because client is sending an object that doesn't have the key that's the same name as the SQL table column, so the object sent from the client MUST be wrong.
  else if (error.code === "23502") {
    response.status(400).send({
      message: "Invalid object format.",
    });
  } else if (error.code === "23505") {
    response.status(400).send({
      message: "Violation of unique key constraint",
    });
  }
  next(error);
};

// const SQLErrorHandlerForNullValuesOrInvalidBodyFormatRequestedByTheClient = (
//   error,
//   request,
//   response,
//   next
// ) => {};

const customErrorhandler = (error, request, response, next) => {
  if (error.status && error.message) {
    response.status(error.status).send({
      message: error.message,
    });
  }
  next(error);
};

module.exports = {
  SQLErrorHandler,
  customErrorhandler,
};
