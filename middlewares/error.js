const boom = require('boom');

module.exports = (err, req, res, _next) => {
  if (boom.isBoom(err)) return res.status(err.output.statusCode).json(err.output.payload);

  console.error(err)

  res.status(500).json({ message: 'Algo deu errado', details: err.message, endpoint: `${req.method} ${req.path}`})
}