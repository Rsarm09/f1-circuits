const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const circuitsRouter = require('./routers/circuits');
const categoriesRouter = require('./routers/categories');
const usersRouter = require('./routers/users');

const cors = require('cors');
const PORT = 3000;

//enable CORS
app.use(cors());

//parse data
app.use(bodyParser.json());

//link to images
app.use(express.static('public'));

//routers
app.use('/circuits', circuitsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);



app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT http://localhost:${PORT}/`)
})