'use strict';

const log = require('../libs/log')(module);
const bittrex = require('node.bittrex.api');

function _getCurrency(currencies, currencyTitle) {
    return currencies.find(currency => {
        return currency['Currency'] === currencyTitle;
    })
}

exports.getProfit = function (req, res) {
    bittrex.getmarkethistory({market : 'BTC-NEO'}, function (data) {
        const bittrexLastTrade = data['result'][0];
        bittrex.getcurrencies(function (data) {
            const currencies = data['result'];
            const bittrexNeoInfo = _getCurrency(currencies, 'NEO');
            res.send(bittrexNeoInfo);
        });
    });
};