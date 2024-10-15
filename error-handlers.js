const SQLErrorHandlerForUnknownEndPoints = (error, request, response, next) => {
  if (error.code === "22P02") {
    response.status(406).send({
      message: "Unknown endpoints are not acceptable on this platform.",
    });
  }
  next(error);
};

const SQLErrorHandlerForPostingInvalidUsernamesOrPostingToInvalidArticles = (
  error,
  request,
  response,
  next
) => {
  // the error.constraint === "comments_author_fkey" in the object checks what type of error it is, in this case it's an invalid username.
  if (error.code === "23503" && error.constraint === "comments_author_fkey") {
    response.status(406).send({
      message: "User doesn't exist.",
    });
  }
  // the error.constraint === "comments_author_fkey" in the object checks what type of error it is, in this case it's an invalid article in the first place.
  if (
    error.code === "23503" &&
    error.constraint === "comments_article_id_fkey"
  ) {
    response.status(406).send({
      message: "Invalid article ID, so nowhere to post this comment.",
    });
  }
  next(error);
};

const SQLErrorHandlerForNullValuesOrInvalidBodyFormatRequestedByTheClient = (
  error,
  request,
  response,
  next
) => {
  if (error.code === "23502") {
    response.status(400).send({
      message: "Invalid object format.",
    });
  }
  next(error);
};

const customErrorhandler = (error, request, response, next) => {
  if (error.status && error.message) {
    response.status(error.status).send({
      message: error.message,
    });
  }
  next(error);
};

module.exports = {
  SQLErrorHandlerForUnknownEndPoints,
  SQLErrorHandlerForPostingInvalidUsernamesOrPostingToInvalidArticles,
  SQLErrorHandlerForNullValuesOrInvalidBodyFormatRequestedByTheClient,
  customErrorhandler,
};
