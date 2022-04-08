const fetch = require('cross-fetch');
const quotes = require('../controllers/quotes');

module.exports = class QuotesService {
    static getQuotes() {
        const programQuote = fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
            .then((programResp) => programQuote.json())
            .then((programParse) => ({
                author: programParse.author,
                content: programParse.en
            })
            );

        const futuramaQuote = fetch('https://futuramaapi.herokuapp.com/api/quotes/1')
            .then((futuramaResp) => futuramaResp.json())
            .then((futuramaParsed) => ({
                author: futuramaParsed[0].character,
                content: futuramaParsed.quote
            })
            );

        const randomQuote = fetch('https://api.quotable.io/random')
            .then((randomResp) => randomResp.json())
            .then((randomParsed) => ({
                author: randomParsed.author,
                content:randomParsed.content
            })
            );

        return Promise.all([
            programQuote,
            futuramaQuote,
            randomQuote
        ])
        .then((resp) => {
            const quote = resp.map((response) => response);

            return quote;
        });
    }
};