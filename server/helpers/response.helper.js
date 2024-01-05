class Response {
  static success(res, data, status = 200) {
    // console.log('Thành công');
    return res.status(status).json({
      status: 'success',
      data,
    });
  }

  static error(res, err) {
    // console.log('Thất bại');
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
