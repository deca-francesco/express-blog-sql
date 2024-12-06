const loggerMiddleware = (req, res, next) => {

    const now = new Date().toISOString();

    console.error(`
        Date: ${now}
        Method: ${req.method}
        URL: ${req.url}
        `
    );
    
    // funzione che in assenza di res.send o res.json evita che la richiesta rimanga appesa
    next();
}





module.exports = loggerMiddleware;