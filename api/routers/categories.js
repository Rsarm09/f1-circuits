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

categoriesRouter.post("/", (req, res) => {
    const {name} = req.body;

    const addCategorySQL = `INSERT INTO categories (name) VALUES (?)`;

    db.query(addCategorySQL, [name], (err, results) => {
        if(err) {
            console.error(err);
            return res.status(500).send("Database error occurred.");
        }

        res.json({message: 'Category added successfully', categoryId: results.insertId});
    });
});

module.exports = categoriesRouter;