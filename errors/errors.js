exports.methodErrors = (req, res) => {
  res.status(405).send({ msg: 'Method not allowed' });
}

exports.routeError = (req, res) => {
  res.status(404).send({ msg: 'Page not found' });
}

exports.psqlError = (err, req, res, next) => {
  const badRequestCode = {
    "22P02": { status: 400, msg: "Invalid syntax" },
    "23503": { status: 404, msg: "Article does not exist" },
    "42703": { status: 400, msg: "Column not found" }
  };
  if (badRequestCode[err.code])
    res
      .status(badRequestCode[err.code].status)
      .send({ msg: badRequestCode[err.code].msg || "Bad Request" });
  else next(err);
};

exports.customError = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
}

exports.serverError = (err, req, res, next) => {
  console.log(err)
  res.status(500).send({ msg: "Internal server error" });
};




