const express = require('express');
const circuitsRouter = express.Router();
const db = require('../db');
const upload = require('../storage');


circuitsRouter.get('/', (req, res) => {

    const sql = `
    SELECT circuits.*, categories.name AS category, categories.id AS category_id
    FROM circuits
    JOIN categories ON circuits.category_id = categories.id
    `;


    db.query(sql, (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).send(error);
        }
        res.json(results);
    });
});


circuitsRouter.post('/', upload.single('image'), (req, res) => {

    const { category_id, name, location, length_km, turns, description } = req.body;

    const image = req.file.filename;

    const addCircuitSQL = `INSERT INTO circuits (category_id, name, location, length_km, turns, description, image ) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`

    db.query(addCircuitSQL, [category_id, name, location, length_km, turns, description, image], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error has ocurred');
        }

        res.json({message: 'Circuit added successfully'});
    });

});





module.exports = circuitsRouter;