exports.methodErrors = (req, res) => {
  res.status(405).send({ msg: 'method not allowed' });
}
exports.routeError = (req, res) => {
  res.status(404).send({ msg: 'page not found' });
}







exports.customErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.message });
  else next(err);
}


