const express = require ('express');

const scheduleRouter = express.Router();

scheduleRouter
    .get('/', (req, res) => {
        res.render('schedule/schedule')
    });


module.exports = {
    scheduleRouter,
}