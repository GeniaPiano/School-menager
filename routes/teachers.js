const express = require ('express');

const teachersRouter = express.Router();

teachersRouter
    .get('/', (req, res) => {
        res.render('teachers/teachers')
    });


module.exports = {
    teachersRouter,
}