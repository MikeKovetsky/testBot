'use strict';

const bittrex = require('node.bittrex.api');
bittrex.options({
    'apikey' : 'b8171d8903844ec6b275641bd5c5d36b',
    'apisecret' : 'SMI6R46G5YPQ5ED5',
});

exports.getSummaries = function () {
    bittrex.getmarketsummaries( function( data, err ) {
        if (err) {
            return console.error(err);
        }
        for( var i in data.result ) {
            bittrex.getticker( { market : data.result[i].MarketName }, function( ticker ) {
                console.log( ticker );
            });
        }
    });
};