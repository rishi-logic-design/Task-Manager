const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const connectDB = require('./db/db');
connectDB();
const TaskRouter = require('./Routes/TaskRoutes');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json());
app.use("/tasks",TaskRouter);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});