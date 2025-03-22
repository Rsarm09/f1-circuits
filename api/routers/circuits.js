const express = require('express');
const circuitsRouter = express.Router();
const db = require('../db');
const upload = require('../storage');


circuitsRouter.get('/', (req, res) => {

    const {category_id} = req.query;

    let sql = `
    SELECT circuits.*, categories.name AS category, categories.id AS category_id
    FROM circuits
    JOIN categories ON circuits.category_id = categories.id
    `;


    const queryParams = [];

    if (category_id) {
        const category_ids = Array.isArray(category_id) ? category_id : [category_id];

        const placeholders = category_ids.map(() => '?').join(', ');

        sql += ` WHERE categories.id IN (${placeholders})`;

        queryParams.push(...category_ids);
    }

    db.query(sql, queryParams, (error, results) => {
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

circuitsRouter.get('/:id', (req, res) => {

    const { id } = req.params;

    const sql = `
    SELECT circuits.*, categories.name AS category, categories.id AS category_id
    FROM circuits
    JOIN categories ON circuits.category_id = categories.id
    WHERE circuits.id = ?`;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error has ocurred');
        }

        console.log(results[0]);

        res.json(results[0]);
    });

});

circuitsRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM circuits WHERE id = ? LIMIT 1`;

    db.query(sql, [id], (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }

        res.json({message: "Circuit Deleted"});
    });
});

circuitsRouter.put('/:id', upload.single('image'), (req, res) => {
    const {id} = req.params;

    const { category_id, name, location, length_km, turns, description } = req.body;

    let updateCircuitSQL = `
    UPDATE circuits
    SET name = ?, location = ?, length_km = ?, turns = ?, description = ?, category_id = ?`;

    const queryParams = [name, location, length_km, turns, description, category_id];

    if (req.file) {
        updateCircuitSQL += `, image = ?`;
        queryParams.push(req.file.filename);
    }   

    updateCircuitSQL += `WHERE id = ? LIMIT 1`;
    queryParams.push(id);

    db.query(updateCircuitSQL, queryParams, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error ocurred');

        }

        res.json({message: 'Circuit updated Successfully'});
    });
});



module.exports = circuitsRouter;    