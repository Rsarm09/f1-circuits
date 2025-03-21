const express = require('express');
const categoriesRouter = express.Router();
const db = require('../db');


categoriesRouter.get('/', (req, res) => {
    db.query(`SELECT * FROM categories`, (error, results) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
});

module.exports = categoriesRouter;