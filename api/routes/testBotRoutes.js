'use strict';
module.exports = function(app) {
    const todoList = require('../controllers/testBotController');
    const bittrex = require('../controllers/bittrexController');
    const bot = require('../controllers/botController');

    app.route('/tasks')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);


    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);

    app.route('/bittrex/socket')
        .get(bittrex.listenSocket);

    app.route('/bot/profit')
        .get(bot.getProfit);

    app.route('/bot/interval')
        .get(bot.getIntervalProfit);
};
