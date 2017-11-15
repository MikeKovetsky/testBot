'use strict';
var log = require('../libs/log')(module);
const bittrex = require('node.bittrex.api');

bittrex.options({
    'apikey': 'b8171d8903844ec6b275641bd5c5d36b',
    'apisecret': 'SMI6R46G5YPQ5ED5',
});

exports.listenSocket = function (req, res) {
    bittrex.websockets.subscribe(['BTC-ETH'], function (data, client) {
        if (data.M === 'updateExchangeState') {
            data.A.forEach(function (data_for) {
                log.info(data_for['Buys']);
            });
        }
    });
};