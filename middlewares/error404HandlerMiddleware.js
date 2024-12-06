const error404HandlerMiddleware = (req, res, next) => {
    res.status(404).send("404! Pagina non trovata!");
}


module.exports = error404HandlerMiddleware;