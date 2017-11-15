'use strict';

let RequestClient = require("reqclient").RequestClient;

let client = new RequestClient({
    baseUrl: "https://myapp.com/api/v1",
    cache: false,
    auth: {user: "admin", pass: "secret"}
});

module.exports = client;