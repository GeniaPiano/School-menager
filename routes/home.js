const express = require('express');

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
    res.redirect('/school');
})

module.exports = {
    homeRouter,
}