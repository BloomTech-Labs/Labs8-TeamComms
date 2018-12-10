const errorHandler = (err, req, res, next) => {
  switch (err.code) {
    case 400:
      res.status(400).send({
        success: false,
        title: "Bad Request",
        message: err.message,
        recovery: "Check inputs"
      });
      break;
    case 401:
      res.status(401).send({
        success: false,
        title: "Unauthorized",
        message: err.message,
        recovery: "Check credentials"
      });
      break;
    case 404:
      res.status(404).send({
        success: false,
        title: "Not Found",
        message: err.message,
        recovery: "See admin"
      });
      break;
    case 500:
      res.status(500).send({
        success: false,
        title: "Internal Server Error",
        message: err.message,
        recovery: "See admin"
      });
      break;
    case 502:
      res.status(502).send({
        success: false,
        title: "Backend service failure (data store failure)",
        message: err.message,
        recovery: "Please check database call"
      });
      break;
    default:
      res.status(500).send({
        success: false,
        title: "Internal Server Error",
        message: err.message,
        recovery: "See message"
      });
  }
};

module.exports = errorHandler;
