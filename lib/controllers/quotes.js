const { Router } = require('express');
const QuotesService = require('../services/QuotesService');

module.exports = Router() 
    .get('/', (req, res, next) => {
        QuotesService.getQuotes()
            .then((quote) => res.send(quote))
            .catch((error) => next(error));
    });
