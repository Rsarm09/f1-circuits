const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const circuitsRouter = require('./routers/circuits');

const cors = require('cors');
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/circuits', circuitsRouter);



app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT http://localhost:${PORT}/`)
})