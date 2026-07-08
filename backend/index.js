const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const AuthRouter = require('./Routes/AuthRouter');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
    'mongodb://127.0.0.1:27017/jwtDB'
)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use('/auth', AuthRouter);

app.listen(8000, () => {
    console.log('Server running on 8000');
});