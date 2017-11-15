'use strict';

const log = require('../libs/log')(module);
const bittrex = require('node.bittrex.api');
const client = require('../libs/client');

function _getCurrency(currencies, currencyTitle) {
    return currencies.find(currency => {
        return currency['Currency'] === currencyTitle;
    })
}

const BITTREX_API = 'https://bittrex.com/api/v1.1/public';
const KUCOIN_API = 'https://api.kucoin.com/v1';

// {
//     "KC-API-KEY": "5a0c6863323292218ac26b06",
//     "KC-API-NONCE" : new Date().getTime(),
//     "KC-API-SIGNATURE" : https://kucoinapidocs.docs.apiary.io/#introduction/authentication/signature-calculation
// }

exports.getProfit = async function (req, res) {
    const pair = ['BTC', 'NEO'];
    const history = await client.get(`${BITTREX_API}/getmarkethistory?market=BTC-NEO`);
    const bittrexLastTrade = history['result'][0];
    const currencies = await client.get(BITTREX_API + '/getcurrencies');
    const bittrexNeoInfo = _getCurrency(currencies['result'], pair[1]);
    const kucoinNeoInfo = await client.get(`${KUCOIN_API}/market/open/coin-info?coin=${pair[1]}`);
    res.send(kucoinNeoInfo);
};