'use strict';

const log = require('../libs/log')(module);
const bittrex = require('node.bittrex.api');


exports.getProfit = function (req, res) {
    bittrex.getmarkethistory({market : 'BTC-NEO'}, function (data) {
        const lastTrade = data['result'][0];
        res.send(lastTrade);
    });
};