const express = require('express');
const circuitsRouter = express.Router();

circuitsRouter.get('/', (req, res) => {
    res.send('Server is running!');
});

module.exports = circuitsRouter;