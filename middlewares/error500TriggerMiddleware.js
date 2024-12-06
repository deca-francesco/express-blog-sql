const error500TriggerMiddleware = (req, res, next) => {
    throw new  Error('ERRORE! TUTTO ROTTO 💥');
}






module.exports = error500TriggerMiddleware;