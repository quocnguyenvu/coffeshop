class Response {
  static success(res, data, status = 200) {
    return res.status(status).json({
      status: 'success',
      data,
    });
  }

  static error(res, err) {
    return res.json({
      status: 'failed',
      error: {
        message: err.message,
        type: err.type,
        errors: err.errors,
      },
    });
  }
}

module.exports = Response;
