module.exports = (req, res, next) => {
  const error = new Error("Resources Not Found. Please Enter A Valid Url.");
  error.status = 404;
  throw error;
};
