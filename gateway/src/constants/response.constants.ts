const ResponseConstants = {
  Common: {
    200: {
      error: false,
      code: "OK",
      statusCode: 200,
      message: "Request served successfully."
    },
    201: {
      error: false,
      code: "CREATED",
      statusCode: 201,
      message: "New item is created."
    },
    400: {
      error: true,
      code: "BAD_REQUEST",
      statusCode: 400,
      message: "The request does not conform with the expected schema."
    },
    401: {
      error: true,
      code: "UNAUTHORIZED",
      statusCode: 401,
      message: "This user is not authorized to perform this action."
    },
    404: {
      error: true,
      code: "NOT_FOUND",
      statusCode: 404,
      message: "Could not find the requested resource."
    },
    409: {
      error: true,
      code: "CONFLICT",
      statusCode: 409,
      message: "This resource already exists in the system."
    },
    500: {
      error: true,
      code: "INTERNAL_SERVER_ERROR",
      statusCode: 500,
      message: "Oops, Something went wrong!"
    }
  }
};

export default ResponseConstants;
