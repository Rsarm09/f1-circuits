const express = require('express');
const circuitsRouter = express.Router();
const db = require('../db');


circuitsRouter.get('/', (req, res) => {
    db.query(`SELECT * FROM circuits`, (error, results) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
});

module.exports = circuitsRouter;