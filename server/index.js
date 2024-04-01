const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser");
const connectToMongo = require('./db')
require('dotenv').config()



connectToMongo();
const app = express();
const port = process.env.PORT || 4000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use('/api/note', require('./routes/notes'))




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})