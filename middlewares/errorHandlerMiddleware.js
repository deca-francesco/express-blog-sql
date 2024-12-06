const errorHandlerMiddleware = (err, req, res, next) => {

  // console.log("Error: ", err.message);

  // stack trace dell'errore
  console.error(err.stack);

  res.status(500).send({
    message: "ERRORE DEL SERVER",
    error: err.message
  })
}


module.exports = errorHandlerMiddleware;