const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "backend error";
  const extraDetails = err.extraDetails || "error from backend";

  // console.error(
  //   `[${req.method}]  ${req.path} >> StatusCode:: ${status}, Message:${message} extraDetails  : ${extraDetails} `
  // );
  return res.status(status).json({ message, extraDetails });
};

module.exports = errorMiddleware;
