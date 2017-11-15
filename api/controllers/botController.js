'use strict';

const log = require('../libs/log')(module);
const bittrex = require('node.bittrex.api');
const client = require('../libs/client');

function _getCurrency(currencies, currencyTitle) {
    return currencies.find(currency => {
        return currency['Currency'] === currencyTitle;
    })
}

exports.getProfit = async function (req, res) {
    const pair = ['BTC', 'NEO'];
    const history = await client.get('https://bittrex.com/api/v1.1/public/getmarkethistory?market=' + pair[0] + '-' + pair[1]);
    const bittrexLastTrade = history['result'][0];
    const currencies = await client.get('https://bittrex.com/api/v1.1/public/getcurrencies');
    const bittrexNeoInfo = _getCurrency(currencies['result'], pair[1]);
    const kucoinNeoInfo = await client.get("https://api.kucoin.com/v1/market/open/coin-info?coin=" + pair[1]);
    res.send(kucoinNeoInfo);
};