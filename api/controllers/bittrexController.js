'use strict';
var log = require('../libs/log')(module);
const bittrex = require('node.bittrex.api');



exports.listenSocket = function (req, res) {
    bittrex.websockets.subscribe(['BTC-ETH'], function (data, client) {
        if (data.M === 'updateExchangeState') {
            data.A.forEach(function (data_for) {
                log.info(data_for['Buys']);
            });
        }
    });
};