'use strict';

const log = require('../libs/log')(module);
const bittrex = require('node.bittrex.api');
const client = require('../libs/client');
const SHA512 = require("crypto-js/sha512");

const BITTREX_API_KEY = 'b8171d8903844ec6b275641bd5c5d36b';
const BITTREX_API = 'https://bittrex.com/api/v1.1';
const KUCOIN_API = 'https://api.kucoin.com/v1';

bittrex.options({
    'apikey': BITTREX_API_KEY,
    'apisecret': 'SMI6R46G5YPQ5ED5',
});

function _getCurrency(currencies, currencyTitle) {
    return currencies.find(currency => {
        return currency['Currency'] === currencyTitle;
    })
}
// {
//     "KC-API-KEY": "5a0c6863323292218ac26b06",
//     "KC-API-NONCE" : new Date().getTime(),
//     "KC-API-SIGNATURE" : https://kucoinapidocs.docs.apiary.io/#introduction/authentication/signature-calculation
// }

exports.getProfit = async function (req, res) {
    const usdAmount = 100000;
    const [btcCurrencies, neoCurrencies, bittrexHistory] = await Promise.all([
        client.get(`${KUCOIN_API}/open/currencies?coins=BTC`),
        client.get(`${KUCOIN_API}/open/currencies?coins=NEO`),
        client.get(`${BITTREX_API}/public/getmarkethistory?market=BTC-NEO`)
    ]);
    const btcInUsd = btcCurrencies['data']['rates']['BTC']['USD'];
    const neoInUsd = neoCurrencies['data']['rates']['NEO']['USD'];
    const neoInBtc = neoInUsd / btcInUsd;
    const bittrexLastTrade = bittrexHistory['result'][0];
    const btcProfit = bittrexLastTrade["Price"] - neoInBtc;
    const totalProfit = btcProfit * usdAmount;
    console.log(totalProfit);
    res.json({totalProfit});
    // const bittrexCurrencies = await client.get(BITTREX_API + '/public/getcurrencies');
    // const pair = ['BTC', 'NEO'];
    // const bittrexNeoInfo = _getCurrency(currencies['result'], pair[1]);
    // const kucoinNeoInfo = await client.get(`${KUCOIN_API}/market/open/coin-info?coin=${pair[1]}`);
    // bittrex.getbalances( function( data, err ) {
    //     if (!data) {
    //         res.send('No balance found on Bittrex');
    //     } else {
    //         res.send(data);
    //     }
    // });
};